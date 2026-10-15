// COA Verifier — server-side AI forensics using Claude Haiku (cheapest with vision).
// The API key lives ONLY in Edge Function Secrets and is never exposed to the browser.

const ANTHROPIC_API_KEY = Deno.env.get('ANTHROPIC_API_KEY');
const ANTHROPIC_WORKSPACE_ID = Deno.env.get('ANTHROPIC_WORKSPACE_ID');
const ANTHROPIC_URL = 'https://api.anthropic.com/v1/messages';
const MODEL = 'claude-haiku-5-5';
const MAX_BYTES = 12 * 1024 * 1024;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const ALLOWED_MEDIA = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

function parsePdfDate(raw: string): string {
  const m = raw.match(/D:(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
  return m ? `${m[1]}-${m[2]}-${m[3]} ${m[4]}:${m[5]}:${m[6]}` : raw;
}

async function extractPdfForensics(base64Data: string): Promise<string> {
  try {
    const binary = atob(base64Data);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);

    let creationDate = '';
    let modDate = '';
    let producer = '';

    // Search raw bytes for ASCII metadata fields (works on uncompressed sections)
    const rawText = new TextDecoder('latin1').decode(bytes);
    const m1 = rawText.match(/\/CreationDate\s*\(([^)]+)\)/);
    const m2 = rawText.match(/\/ModDate\s*\(([^)]+)\)/);
    const m3 = rawText.match(/\/Producer\s*\(([^)]+)\)/);
    if (m1) creationDate = m1[1];
    if (m2) modDate = m2[1];
    if (m3) producer = m3[1];

    // Try decompressing FlateDecode streams to find metadata stored compressed
    if (!creationDate || !modDate) {
      let pos = 0;
      while (pos < bytes.length - 10) {
        // Find 'stream' keyword
        let streamStart = -1;
        for (let i = pos; i < bytes.length - 8; i++) {
          if (bytes[i] === 115 && bytes[i+1] === 116 && bytes[i+2] === 114 &&
              bytes[i+3] === 101 && bytes[i+4] === 97 && bytes[i+5] === 109) {
            if (bytes[i+6] === 10) { streamStart = i + 7; pos = i + 1; break; }
            if (bytes[i+6] === 13 && bytes[i+7] === 10) { streamStart = i + 8; pos = i + 1; break; }
          }
        }
        if (streamStart === -1) break;

        // Find 'endstream'
        let endStream = -1;
        for (let i = streamStart; i < bytes.length - 9; i++) {
          if (bytes[i]===101&&bytes[i+1]===110&&bytes[i+2]===100&&bytes[i+3]===115&&
              bytes[i+4]===116&&bytes[i+5]===114&&bytes[i+6]===101&&bytes[i+7]===97&&bytes[i+8]===109) {
            endStream = i; break;
          }
        }
        if (endStream === -1) break;

        const streamData = bytes.slice(streamStart, endStream);
        try {
          const ds = new DecompressionStream('deflate');
          const writer = ds.writable.getWriter();
          const reader = ds.readable.getReader();
          const chunks: Uint8Array[] = [];
          await Promise.all([
            writer.write(streamData).then(() => writer.close()),
            (async () => { while (true) { const { done, value } = await reader.read(); if (done) break; if (value) chunks.push(value); } })(),
          ]);
          const total = chunks.reduce((a, c) => a + c.length, 0);
          const dec = new Uint8Array(total);
          let off = 0; for (const c of chunks) { dec.set(c, off); off += c.length; }
          const t = new TextDecoder('latin1').decode(dec);
          if (!creationDate) { const mm = t.match(/\/CreationDate\s*\(([^)]+)\)/); if (mm) creationDate = mm[1]; }
          if (!modDate) { const mm = t.match(/\/ModDate\s*\(([^)]+)\)/); if (mm) modDate = mm[1]; }
          if (!producer) { const mm = t.match(/\/Producer\s*\(([^)]+)\)/); if (mm) producer = mm[1]; }
          if (creationDate && modDate) break;
        } catch { /* not deflate */ }

        pos = endStream + 9;
      }
    }

    const lines: string[] = [];
    if (creationDate) lines.push(`Created: ${parsePdfDate(creationDate)}`);
    if (modDate) lines.push(`Last modified: ${parsePdfDate(modDate)}`);
    if (producer) lines.push(`Producer tool: ${producer}`);

    const isBrowserPdf = /skia|pdfium|chromium|chrome|wkhtmltopdf|headless/i.test(producer);
    if (creationDate && modDate && creationDate !== modDate && !isBrowserPdf) {
      lines.push('FORENSIC FLAG: CreationDate ≠ ModDate — the PDF was edited after it was originally generated.');
    }
    if (isBrowserPdf) {
      lines.push('Note: Browser-generated PDF (Skia/PDF or similar) — date forensics not applicable; focus on content.')
    }

    // Multiple content streams per page = overlaid edits
    const contentsMatches = [...rawText.matchAll(/\/Contents\s*\[([^\]]+)\]/g)];
    for (const cm of contentsMatches) {
      const refs = (cm[1].match(/\d+ 0 R/g) || []).length;
      if (refs > 1) {
        lines.push(`FORENSIC FLAG: Page has ${refs} separate content streams — text or values were likely overlaid using a PDF editor.`);
      }
    }

    if (!creationDate && !modDate) lines.push('FORENSIC FLAG: No creation or modification metadata found. Legitimate lab report software always embeds this. Absence strongly suggests the PDF was re-exported or metadata was stripped to hide editing history.');

    return '[PDF FORENSICS]\n' + lines.join('\n') + '\n[END]';
  } catch {
    return '[PDF FORENSICS: extraction error]';
  }
}

const SYSTEM_PROMPT = `You are "COA Verifier", a forensic document analyst specialising in Certificates of Analysis (COAs) and HPLC lab reports used in the research-chemical industry.

Assess whether the submitted document shows signs of being tampered with, fabricated or digitally altered. Examine it the way a document-forensics examiner would:

- Template & structure integrity: does the layout read like a genuine lab document, or are elements misaligned, stretched or pasted in?
- Typography consistency: differences in font, size, weight, kerning or baseline inside the same field or text block (a classic sign of edited text).
- Digital editing artifacts: regions with different compression, sharpness, noise or background colour; hard rectangular seams; cloned or smudged areas; halo edges around text or numbers.
- Metadata & timestamp coherence: creation/modification dates, producer tools, revision markers, expiry dates and internal date logic.
- Laboratory identity: plausible lab name, address, contact, accreditation references, sample/analysis IDs and consistent branding.
- Signature / stamp integrity: stamps or signatures that are misaligned, low-resolution, clipped, or inconsistent with the rest of the document's quality.
- Data consistency: purity values, units, decimals, totals, method references and instrument names that are internally consistent and plausible.

Be direct and blunt. If the evidence points to tampering, say so — do not soften it with "may", "could", "warrant verification" or similar hedges. People are using this to decide whether to trust a compound in their body; they need a clear answer, not diplomatic language.

Rules for date forensics (apply these strictly):
- Only compare CreationDate vs ModDate. Do NOT compare PDF dates against the analysis date written inside the document — labs often generate the PDF days or weeks after the analysis.
- If the Producer is a browser engine (Skia/PDF, pdfium, Chrome, wkhtmltopdf, Headless Chrome, PDFium): this means the lab portal generates PDFs via browser print. CreationDate = ModDate = download time is completely normal. Do NOT flag these on date gaps alone — focus only on content/visual forensics.
- If the Producer is native lab software (LabWare, LIMS, Adobe Acrobat, etc.): CreationDate and ModDate should match or be within a few days. A gap over 30 days is suspicious; over 60 days is tampered.
- Multiple content streams on a single page means text or data was overlaid using a PDF editor — call it tampered.
- No metadata at all: suspicious, but not tampered on its own.

A [PDF FORENSICS] block will be provided alongside the document. Treat it as hard binary evidence — it cannot be faked by editing the visible content. When a FORENSIC FLAG is present, set verdict to "tampered" or "suspicious" (never "authentic" or "minor_concerns") and explain exactly what the flag means in plain language in the summary and signals.

Keep everything short. One sentence per field. No hedging, no repetition.

Respond with ONLY a single JSON object:
{
  "verdict": "authentic" | "minor_concerns" | "suspicious" | "tampered" | "inconclusive",
  "confidence": <integer 0-100>,
  "headline": "<one sentence — state the verdict plainly>",
  "summary": "<2 sentences max — lead with the strongest finding>",
  "checks": [
    { "id": "structure", "label": "Template & structure integrity", "status": "pass" | "warn" | "fail" | "na", "detail": "<one short phrase — what you saw, nothing else>" },
    { "id": "typography", "label": "Typography & font consistency", "status": "...", "detail": "..." },
    { "id": "artifacts", "label": "Digital editing artifacts", "status": "...", "detail": "..." },
    { "id": "metadata", "label": "Metadata & timestamp coherence", "status": "...", "detail": "..." },
    { "id": "lab_identity", "label": "Laboratory identity & contact", "status": "...", "detail": "..." },
    { "id": "signature", "label": "Signature / stamp integrity", "status": "...", "detail": "..." },
    { "id": "data", "label": "Data consistency (values & units)", "status": "...", "detail": "..." }
  ],
  "signals": ["<one short fact>", "<one short fact>"],
  "recommendation": "<one sentence — what to do next>",
  "company": "<VENDOR or BRAND selling this product — not the lab — or null>",
  "product": "<compound name, or null>"
}
Always include all seven checks. Use "na" only when the document genuinely lacks that element.`;

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...CORS, 'Content-Type': 'application/json' },
  });
}

function extractJson(text: string): Record<string, unknown> | null {
  if (!text) return null;
  let cleaned = text.trim();
  cleaned = cleaned.replace(/^```(?:json)?/i, '').replace(/```$/i, '').trim();
  const start = cleaned.indexOf('{');
  const end = cleaned.lastIndexOf('}');
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return JSON.parse(cleaned.slice(start, end + 1)) as Record<string, unknown>;
  } catch {
    return null;
  }
}

const VALID_STATUS = new Set(['pass', 'warn', 'fail', 'na']);
const VALID_VERDICT = new Set(['authentic', 'minor_concerns', 'suspicious', 'tampered', 'inconclusive']);

function normalizeReport(raw: Record<string, unknown>) {
  const verdict = VALID_VERDICT.has(String(raw.verdict)) ? String(raw.verdict) : 'inconclusive';
  const confidence = Math.max(0, Math.min(100, Math.round(Number(raw.confidence) || 0)));
  const checks = Array.isArray(raw.checks)
    ? (raw.checks as Record<string, unknown>[]).map((c) => ({
        id: String(c.id ?? ''),
        label: String(c.label ?? 'Check'),
        status: VALID_STATUS.has(String(c.status)) ? String(c.status) : 'na',
        detail: String(c.detail ?? ''),
      }))
    : [];
  const signals = Array.isArray(raw.signals)
    ? (raw.signals as unknown[]).map((s) => String(s)).filter(Boolean)
    : [];
  return {
    verdict,
    confidence,
    headline: String(raw.headline ?? 'Analysis complete'),
    summary: String(raw.summary ?? ''),
    checks,
    signals,
    recommendation: String(raw.recommendation ?? ''),
    company: raw.company != null && String(raw.company) !== 'null' ? String(raw.company) : null,
    product: raw.product != null && String(raw.product) !== 'null' ? String(raw.product) : null,
  };
}

function describeAnthropicError(status: number, body: string): string {
  if (status === 400) return 'The document could not be read by the verification engine. Try a cleaner scan.';
  if (status === 401) return 'The verifier AI key is not authorised. Please update the API key.';
  if (status === 403) return 'The verifier AI key does not have permission to run this analysis.';
  if (status === 429) return 'The verification engine is busy right now. Please try again in a moment.';
  if (status === 529) return 'The verification engine is temporarily overloaded. Please try again shortly.';
  if (/quota|credit/i.test(body)) return 'The verification account has reached its usage limit. Please check your plan.';
  return `The verification engine could not complete the analysis (status ${status}). Please try again shortly.`;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  if (!ANTHROPIC_API_KEY) {
    return json(
      { error: 'engine_unconfigured', message: 'The verification engine is not configured yet. Please try again later.' },
      503,
    );
  }

  let payload: Record<string, unknown> = {};
  try {
    payload = await req.json();
  } catch {
    return json({ error: 'invalid_body', message: 'The request could not be read.' }, 400);
  }

  const data = typeof payload.data === 'string' ? payload.data : '';
  const mediaType = typeof payload.mediaType === 'string' ? payload.mediaType : '';
  const fileName = (typeof payload.fileName === 'string' ? payload.fileName : 'document').slice(0, 200);

  if (!data) return json({ error: 'missing_file', message: 'No document was provided.' }, 400);
  if (!ALLOWED_MEDIA.has(mediaType)) {
    return json({ error: 'unsupported_type', message: 'Only PDF, JPG, PNG or WEBP documents are supported.' }, 415);
  }

  const approxBytes = Math.floor((data.length * 3) / 4);
  if (approxBytes > MAX_BYTES) {
    return json({ error: 'too_large', message: 'The document is too large — 12MB maximum.' }, 413);
  }

  // Claude uses different content block types for PDFs vs images.
  const contentBlock = mediaType === 'application/pdf'
    ? { type: 'document', source: { type: 'base64', media_type: mediaType, data } }
    : { type: 'image', source: { type: 'base64', media_type: mediaType, data } };

  const forensics = mediaType === 'application/pdf' ? await extractPdfForensics(data) : '';
  const forensicFlags = forensics
    .split('\n')
    .filter((l) => l.startsWith('FORENSIC FLAG:'))
    .map((l) => l.replace('FORENSIC FLAG: ', '').trim());

  const requestBody = {
    model: MODEL,
    max_tokens: 8000,
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: [
          contentBlock,
          ...(forensics ? [{ type: 'text', text: forensics }] : []),
          { type: 'text', text: `Analyse this Certificate of Analysis ("${fileName}") for signs of tampering or fabrication. Return ONLY the JSON object described in your instructions.` },
        ],
      },
    ],
  };

  try {
    const aiRes = await fetch(ANTHROPIC_URL, {
      method: 'POST',
      headers: {
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'pdfs-2024-09-25',
        ...(ANTHROPIC_WORKSPACE_ID ? { 'anthropic-workspace-id': ANTHROPIC_WORKSPACE_ID } : {}),
        'content-type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const aiText = await aiRes.text();

    if (!aiRes.ok) {
      console.error('anthropic_error', aiRes.status, aiText.slice(0, 500));
      return json(
        { error: 'engine_error', message: describeAnthropicError(aiRes.status, aiText) },
        502,
      );
    }

    let aiData: { content?: { type: string; text?: string }[] };
    try {
      aiData = JSON.parse(aiText);
    } catch {
      return json({ error: 'engine_error', message: 'The verification engine returned an unreadable result.' }, 502);
    }

    const text = (aiData.content ?? [])
      .filter((c) => c.type === 'text')
      .map((c) => c.text ?? '')
      .join('\n')
      .trim();

    const parsed = extractJson(text);
    if (!parsed) {
      return json(
        { error: 'engine_error', message: 'The verification engine returned an unreadable result. Please try again.' },
        502,
      );
    }

    return json({ ok: true, report: normalizeReport(parsed), forensicFlags, analyzedAt: new Date().toISOString() });
  } catch (e) {
    console.error('verify_coa_failure', e);
    return json(
      { error: 'engine_error', message: 'Something went wrong while analysing the document. Please try again.' },
      500,
    );
  }
});
