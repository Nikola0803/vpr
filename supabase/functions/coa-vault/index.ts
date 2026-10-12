// Vendor COA vault: issues signed upload URLs and commits batch certificate
// metadata using the service role so clients never write to the tables directly.
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

function safeFileName(raw: unknown): string {
  let name = String(raw ?? '').toLowerCase().replace(/[^a-z0-9._-]/g, '-').replace(/-+/g, '-');
  name = name.replace(/^[-.]+/, '');
  if (!name) name = 'coa.pdf';
  if (!name.includes('.')) name = `${name}.pdf`;
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

  const action = String(payload.action ?? 'commit');
  const vendorSlug = String(payload.vendorSlug ?? '').trim();
  if (!vendorSlug) return json({ error: 'Missing vendor' }, 400);

  if (action === 'presign') {
    const fileName = safeFileName(payload.fileName);
    const path = `coa/${vendorSlug}/${crypto.randomUUID()}-${fileName}`;
    const { data, error } = await admin.storage.from('private').createSignedUploadUrl(path);
    if (error || !data) return json({ error: error?.message ?? 'Could not prepare upload' }, 500);
    return json({ path: data.path, token: data.token });
  }

  if (action === 'sign') {
    const filePath = String(payload.filePath ?? '').trim();
    if (!filePath) return json({ error: 'Missing file path' }, 400);
    const { data, error } = await admin.storage.from('private').createSignedUrl(filePath, 3600);
    if (error || !data) return json({ error: error?.message ?? 'Could not sign file' }, 500);
    return json({ url: data.signedUrl });
  }

  const batchNo = String(payload.batchNo ?? '').trim();
  const compound = String(payload.compound ?? '').trim();
  if (!batchNo || !compound) return json({ error: 'Batch number and compound are required' }, 400);

  const { data, error } = await admin
    .from('coa_batches')
    .insert({
      vendor_slug: vendorSlug,
      batch_no: batchNo.slice(0, 60),
      compound: compound.slice(0, 80),
      purity: payload.purity ? String(payload.purity).slice(0, 20) : null,
      lab: payload.lab ? String(payload.lab).slice(0, 80) : null,
      batch_date: payload.batchDate ? String(payload.batchDate).slice(0, 40) : null,
      file_path: payload.filePath ? String(payload.filePath).slice(0, 240) : null,
      file_name: payload.fileName ? String(payload.fileName).slice(0, 120) : null,
      status: 'Pending',
    })
    .select('id, vendor_slug, batch_no, compound, purity, lab, linked_reviews, batch_date, status, file_path, file_name, created_at')
    .single();

  if (error) return json({ error: error.message }, 500);
  return json({ batch: data });
});
