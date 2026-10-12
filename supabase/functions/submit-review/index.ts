// Public review intake: runs the Research-Use-Only language screen server-side,
// seals the review with a proof hash, optionally stores attached lab evidence,
// and writes the result with the service role (clients can never write directly).
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const admin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const HARD_PATTERNS: RegExp[] = [
  /\b(mg\/kg|dosage|dose|dosing|inject|injecting|injection|injected|subq|subcutaneous)\b/i,
  /\b(my (dose|cycle|protocol)|i (took|injected|used|started taking)|personal use|for myself)\b/i,
  /\b(weight loss|fat loss|how much should i|for humans?|patients?)\b/i,
];

const SOFT_PATTERNS: RegExp[] = [
  /\b(i (felt|feel|noticed|saw results)|before and after|my body|works great for me|helped me|my results)\b/i,
];

interface ScreenResult {
  body: string;
  status: 'published' | 'removed';
  flags: string[];
}

function screenRuo(input: string): ScreenResult {
  const sentences: string[] = input
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const kept: string[] = [];
  const flags = new Set<string>();

  for (const sentence of sentences) {
    if (HARD_PATTERNS.some((p) => p.test(sentence))) {
      flags.add('removed');
      continue;
    }
    if (SOFT_PATTERNS.some((p) => p.test(sentence))) {
      flags.add('blurred');
      kept.push('[content blurred by the Research Use Only language screen]');
      continue;
    }
    kept.push(sentence);
  }

  const body = kept.join(' ').trim();
  const scrubbed = body.replace(/\[content blurred[^\]]*\]/gi, '').trim();
  return { body, status: scrubbed.length < 15 ? 'removed' : 'published', flags: [...flags] };
}

function anonymize(input: unknown): string {
  const s = String(input ?? '').trim();
  if (!s) return 'Anonymous Researcher';
  const local = s.includes('@') ? s.split('@')[0] : s;
  const parts = local.split(/[._\-\s]+/).filter(Boolean);
  if (parts.length === 0) return 'Anonymous Researcher';
  const first = parts[0].charAt(0).toUpperCase();
  const last = parts[parts.length - 1].charAt(0).toUpperCase();
  return parts.length > 1 ? `${first}*** ${last}.` : `${first}***`;
}

function makeHash(seed: string): string {
  let h1 = 2166136261;
  let h2 = 5381;
  for (let i = 0; i < seed.length; i += 1) {
    h1 ^= seed.charCodeAt(i);
    h1 = Math.imul(h1, 16777619);
    h2 = ((h2 << 5) + h2 + seed.charCodeAt(i)) >>> 0;
  }
  const a = (h1 >>> 0).toString(16).padStart(8, '0');
  const b = h2.toString(16).padStart(8, '0');
  return `0x${a.slice(0, 4)}…${b.slice(0, 4)}`;
}

function safeFileName(raw: unknown, fallbackExt = '.pdf'): string {
  let name = String(raw ?? '').toLowerCase().replace(/[^a-z0-9._-]/g, '-').replace(/-+/g, '-');
  name = name.replace(/^[-.]+/, '');
  if (!name) name = `evidence${fallbackExt}`;
  if (!name.includes('.')) name = `${name}${fallbackExt}`;
  return name.slice(-60);
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let payload: Record<string, unknown>;
  try {
    payload = await req.json();
  } catch {
    return json({ error: 'Invalid JSON body' }, 400);
  }

  const action = String(payload.action ?? 'create');
  const vendorSlug = String(payload.vendorSlug ?? '').trim();

  if (action === 'presign') {
    if (!vendorSlug) return json({ error: 'Missing vendor' }, 400);
    const path = `reviews/${vendorSlug}/${crypto.randomUUID()}-${safeFileName(payload.fileName)}`;
    const { data, error } = await admin.storage.from('private').createSignedUploadUrl(path);
    if (error || !data) return json({ error: error?.message ?? 'Could not prepare upload' }, 500);
    return json({ path: data.path, token: data.token });
  }

  const rating = Number(payload.rating ?? 0);
  const rawBody = String(payload.body ?? '').trim();
  if (!vendorSlug) return json({ error: 'Missing vendor' }, 400);
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) return json({ error: 'Rating must be 1-5' }, 400);
  if (rawBody.length < 10) return json({ error: 'Review is too short' }, 400);
  if (rawBody.length > 2000) return json({ error: 'Review is too long' }, 400);

  const screened = screenRuo(rawBody);
  if (screened.status === 'removed') {
    return json({ status: 'removed', message: 'Your review was flagged by the Research Use Only language screen and was not published.' }, 200);
  }

  const author = anonymize(payload.authorName ?? payload.email);
  const compound = payload.compound ? String(payload.compound).slice(0, 80) : null;
  const orderRef = payload.orderRef ? String(payload.orderRef).slice(0, 40) : null;
  const attachmentPath = payload.attachmentPath ? String(payload.attachmentPath).slice(0, 200) : null;
  const proofHash = makeHash(`${vendorSlug}${author}${rawBody}${rating}${Date.now()}`);

  const { data, error } = await admin
    .from('vendor_reviews')
    .insert({
      vendor_slug: vendorSlug,
      author,
      order_ref: orderRef,
      proof_hash: proofHash,
      rating,
      compound,
      verified_buyer: Boolean(payload.verifiedBuyer) && Boolean(orderRef),
      has_lab: Boolean(payload.hasLab) || Boolean(attachmentPath),
      body: screened.body,
      reply: null,
      reply_by: null,
      ruo_status: 'published',
      status: 'pending',
      ruo_flags: screened.flags,
      attachment_path: attachmentPath,
    })
    .select('id, author, order_ref, proof_hash, rating, compound, verified_buyer, has_lab, body, reply, reply_by, ruo_status, created_at')
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({
    status: 'pending',
    review: data,
    message: 'Your review was received and is pending moderation before it appears publicly.',
  });
});
