// COA Verifier — server-side AI document forensics using Gemini 1.5 Flash.
// The API key lives ONLY in Backend Secrets and is never exposed to the browser.

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent';
const MAX_BYTES = 12 * 1024 * 1024;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const ALLOWED_MEDIA = new Set(['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

const SYSTEM_PROMPT = `You are "COA Verifier", a forensic document analyst specialising in Certificates of Analysis (COAs) and HPLC lab reports used in the research-chemical industry.

Assess whether the submitted document shows signs of being tampered with, fabricated or digitally altered. Examine it the way a document-forensics examiner would:

- Template & structure integrity: does the layout read like a genuine lab document, or are elements misaligned, stretched or pasted in?
- Typography consistency: differences in font, size, weight, kerning or baseline inside the same field or text block (a classic sign of edited text).
- Digital editing artifacts: regions with different compression, sharpness, noise or background colour; hard rectangular seams; cloned or smudged areas; halo edges around text or numbers.
- Metadata & timestamp coherence: creation/modification dates, producer tools, revision markers, expiry dates and internal date logic.
- Laboratory identity: plausible lab name, address, contact, accreditation references, sample/analysis IDs and consistent branding.
- Signature / stamp integrity: stamps or signatures that are misaligned, low-resolution, clipped, or inconsistent with the rest of the document's quality.
- Data consistency: purity values, units, decimals, totals, method references and instrument names that are internally consistent and plausible.

Be calibrated and honest. Only raise a concern you can actually point to. If the document is low quality, cropped or incomplete, say so rather than over-claiming.

Respond with ONLY a single JSON object and nothing else, using exactly this shape:
{
  "verdict": "authentic" | "minor_concerns" | "suspicious" | "tampered" | "inconclusive",
  "confidence": <integer 0-100>,
  "headline": "<one short sentence verdict>",
  "summary": "<2-4 sentence plain-language explanation>",
  "checks": [
    { "id": "structure", "label": "Template & structure integrity", "status": "pass" | "warn" | "fail" | "na", "detail": "<what you observed>" },
    { "id": "typography", "label": "Typography & font consistency", "status": "...", "detail": "..." },
    { "id": "artifacts", "label": "Digital editing artifacts", "status": "...", "detail": "..." },
    { "id": "metadata", "label": "Metadata & timestamp coherence", "status": "...", "detail": "..." },
    { "id": "lab_identity", "label": "Laboratory identity & contact", "status": "...", "detail": "..." },
    { "id": "signature", "label": "Signature / stamp integrity", "status": "...", "detail": "..." },
    { "id": "data", "label": "Data consistency (values & units)", "status": "...", "detail": "..." }
  ],
  "signals": ["<specific observation>", "..."],
  "recommendation": "<what the reviewer should do next>"
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
  };
}

function describeGeminiError(status: number, body: string): string {
  if (status === 400) return 'The document could not be read by the verification engine. Try a cleaner scan.';
  if (status === 401 || status === 403) return 'The verifier AI key is not authorised. Please update the Gemini API key.';
  if (status === 404) return 'The verification model was not found. The model name may need updating.';
  if (status === 429) return 'The verification engine is busy right now. Please try again in a moment.';
  if (status === 503) return 'The verification engine is temporarily unavailable. Please try again shortly.';
  if (/quota/i.test(body)) return 'The daily verification quota has been reached. Try again tomorrow.';
  return `The verification engine could not complete the analysis (status ${status}). Please try again shortly.`;
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: CORS });
  if (req.method !== 'POST') return json({ error: 'Method not allowed' }, 405);

  if (!GEMINI_API_KEY) {
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

  const requestBody = {
    systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents: [{
      role: 'user',
      parts: [
        { inlineData: { mimeType: mediaType, data } },
        { text: `Analyse this Certificate of Analysis ("${fileName}") for signs of tampering or fabrication. Return ONLY the JSON object described in your instructions.` },
      ],
    }],
    generationConfig: {
      temperature: 0.1,
      maxOutputTokens: 2500,
      responseMimeType: 'application/json',
    },
  };

  try {
    const aiRes = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const aiText = await aiRes.text();

    if (!aiRes.ok) {
      console.error('gemini_error', aiRes.status, aiText.slice(0, 500));
      return json(
        { error: 'engine_error', message: describeGeminiError(aiRes.status, aiText) },
        502,
      );
    }

    let aiData: { candidates?: { content?: { parts?: { text?: string }[] } }[] };
    try {
      aiData = JSON.parse(aiText);
    } catch {
      return json({ error: 'engine_error', message: 'The verification engine returned an unreadable result.' }, 502);
    }

    const text = (aiData.candidates?.[0]?.content?.parts ?? [])
      .map((p) => p.text ?? '')
      .join('\n')
      .trim();

    const parsed = extractJson(text);
    if (!parsed) {
      return json(
        { error: 'engine_error', message: 'The verification engine returned an unreadable result. Please try again.' },
        502,
      );
    }

    return json({ ok: true, report: normalizeReport(parsed), analyzedAt: new Date().toISOString() });
  } catch (e) {
    console.error('verify_coa_failure', e);
    return json(
      { error: 'engine_error', message: 'Something went wrong while analysing the document. Please try again.' },
      500,
    );
  }
});
