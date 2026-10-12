// Review moderation queue: lists reviews awaiting a decision and flips them
// to published or rejected. Runs with the service role (clients can never
// write to vendor_reviews directly) and is gated behind the MODERATION_KEY
// passphrase so the endpoint cannot be abused by the public.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-moderation-key',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const admin = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

const LIST_COLUMNS =
  'id, vendor_slug, author, order_ref, proof_hash, rating, compound, verified_buyer, has_lab, body, attachment_path, created_at, status, ruo_flags';

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

interface QueueRow {
  id: number;
  vendor_slug: string;
  author: string;
  order_ref: string | null;
  proof_hash: string;
  rating: number;
  compound: string | null;
  verified_buyer: boolean;
  has_lab: boolean;
  body: string;
  attachment_path: string | null;
  created_at: string;
  status: string;
  ruo_flags: unknown;
}

async function signAttachments(rows: QueueRow[]) {
  const paths = rows
    .map((r) => r.attachment_path)
    .filter((p): p is string => Boolean(p));
  const signed: Record<string, string> = {};
  if (paths.length === 0) return signed;

  const { data } = await admin.storage.from('private').createSignedUrls(paths, 3600);
  for (const u of data ?? []) {
    if (u.path && u.signedUrl) signed[u.path] = u.signedUrl;
  }
  return signed;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    payload = {};
  }

  const expected = Deno.env.get('MODERATION_KEY') ?? '';
  const provided = String(req.headers.get('x-moderation-key') ?? payload.key ?? '');

  if (!expected) return json({ error: 'Moderation is not configured.' }, 500);
  if (!provided || provided !== expected) return json({ error: 'Invalid passphrase.' }, 401);

  const action = String(payload.action ?? 'list');

  if (action === 'list') {
    const { data, error } = await admin
      .from('vendor_reviews')
      .select(LIST_COLUMNS)
      .in('status', ['pending', 'rejected'])
      .order('created_at', { ascending: false })
      .limit(200);
    if (error) return json({ error: error.message }, 500);

    const rows = (data as QueueRow[] | null) ?? [];
    const signed = await signAttachments(rows);
    const withUrls = rows.map((r) => ({
      ...r,
      attachmentUrl: r.attachment_path ? signed[r.attachment_path] ?? null : null,
    }));

    return json({
      pending: withUrls.filter((r) => r.status === 'pending'),
      rejected: withUrls.filter((r) => r.status === 'rejected'),
    });
  }

  if (action === 'approve' || action === 'reject') {
    const ids = Array.isArray(payload.ids)
      ? (payload.ids as unknown[]).map((n) => Number(n)).filter((n) => Number.isFinite(n))
      : [];
    if (ids.length === 0) return json({ error: 'No reviews selected.' }, 400);

    const status = action === 'approve' ? 'published' : 'rejected';
    const { data, error } = await admin
      .from('vendor_reviews')
      .update({ status, moderated_at: new Date().toISOString() })
      .in('id', ids)
      .select('id, status');
    if (error) return json({ error: error.message }, 500);

    return json({ updated: data ?? [] });
  }

  return json({ error: 'Unknown action' }, 400);
});
