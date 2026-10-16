import { useEffect, useRef, useState, type DragEvent, type FormEvent } from 'react';
import { verifyCoa, type CoaReport } from '@/pages/coaVerifier/api';
import { verifierPromises } from '@/mocks/coaVerifier';
import ReportView from '@/pages/coaVerifier/components/ReportView';
import { supabase } from '@/lib/supabase';

const ACCEPTED = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 12 * 1024 * 1024;

const ANALYSIS_STAGES = [
  'Reading the document structure…',
  'Scanning typography and font consistency…',
  'Checking for editing and splice artifacts…',
  'Cross-checking metadata and timestamps…',
  'Reading the laboratory identity…',
  'Reviewing signatures, stamps and values…',
  'Compiling your forensic report…',
];

type Status = 'idle' | 'submitting' | 'analyzing' | 'done' | 'error';

function readAsBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result || '');
      const comma = result.indexOf(',');
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.onerror = () => reject(new Error('Could not read the file.'));
    reader.readAsDataURL(file);
  });
}

function prettySize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function VerifyTool() {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState('');
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [report, setReport] = useState<CoaReport | null>(null);
  const [error, setError] = useState('');
  const [stage, setStage] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (status !== 'analyzing') return;
    setStage(0);
    const id = setInterval(() => setStage((s) => Math.min(s + 1, ANALYSIS_STAGES.length - 1)), 2200);
    return () => clearInterval(id);
  }, [status]);

  const pickFile = (f: File | null | undefined) => {
    setFileError('');
    if (!f) return;
    if (!ACCEPTED.includes(f.type)) {
      setFileError('Unsupported file type - upload a PDF, JPG, PNG or WEBP.');
      return;
    }
    if (f.size > MAX_BYTES) {
      setFileError('That file is too large - 12MB maximum.');
      return;
    }
    setFile(f);
    setError('');
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    pickFile(e.dataTransfer.files?.[0]);
  };

  const reset = () => {
    setFile(null);
    setFileError('');
    setReport(null);
    setError('');
    setStatus('idle');
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting' || status === 'analyzing') return;
    setError('');

    const form = event.currentTarget;
    const email = String(new FormData(form).get('email') || '').trim().toLowerCase();
    const honeypot = String(new FormData(form).get('website_alt') || '').trim();
    if (honeypot) return;

    if (!email || !email.includes('@')) {
      setError('Enter a valid email address.');
      return;
    }

    if (!file) {
      setFileError('Add a Certificate of Analysis to verify first.');
      return;
    }

    setStatus('submitting');
    try {
      // Capture email - fire-and-forget, never block the analysis.
      supabase.from('coa_leads').insert({ email }).then(() => {}).catch(() => {});

      // Run the forensic analysis.
      setStatus('analyzing');
      const base64 = await readAsBase64(file);
      const result = await verifyCoa({
        data: base64,
        mediaType: file.type,
        fileName: file.name,
      });
      setReport(result);
      setStatus('done');
    } catch (e) {
      setStatus('error');
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    }
  };

  const busy = status === 'submitting' || status === 'analyzing';

  return (
    <section id="verify" className="relative py-20 border-t border-slate-200 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* LEFT */}
        <div className="lg:col-span-5">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">Run a check</div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
            Upload a COA. Get a forensic verdict.
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Drop in any Certificate of Analysis and our AI examiner inspects it for the fingerprints of tampering. One
            email unlocks unlimited checks - no card, no cost.
          </p>

          <div className="mt-8 space-y-4">
            {verifierPromises.map((p) => (
              <div key={p.text} className="flex items-start gap-3">
                <div className="w-10 h-10 shrink-0 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                  <i className={`${p.icon} text-lg text-teal-700`}></i>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed pt-2">{p.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT - TOOL */}
        <div className="lg:col-span-7">
          <div className="glass rounded-2xl p-6 md:p-8">
            {status === 'done' && report && file ? (
              <ReportView report={report} fileName={file.name} onReset={reset} />
            ) : busy ? (
              <div className="py-10">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/30 flex items-center justify-center">
                    <i className="ri-fingerprint-line text-3xl text-cyan-700 animate-pulse"></i>
                  </div>
                  <h3 className="mt-6 font-display font-extrabold text-slate-900 text-xl tracking-tight">
                    {status === 'submitting' ? 'Unlocking COA Verifier…' : 'Analysing your document…'}
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">This usually takes under 20 seconds.</p>
                </div>
                <div className="mt-8 max-w-md mx-auto space-y-3">
                  {ANALYSIS_STAGES.map((s, i) => {
                    const done = i < stage;
                    const active = i === stage;
                    return (
                      <div
                        key={s}
                        className={`flex items-center gap-3 text-sm transition-opacity ${
                          done || active ? 'opacity-100' : 'opacity-40'
                        }`}
                      >
                        {done ? (
                          <i className="ri-checkbox-circle-fill text-emerald-500"></i>
                        ) : active ? (
                          <i className="ri-loader-4-line animate-spin text-cyan-600"></i>
                        ) : (
                          <i className="ri-circle-line text-slate-300"></i>
                        )}
                        <span className={done ? 'text-slate-500' : 'text-slate-700'}>{s}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <form id="coa-verifier-form" onSubmit={handleSubmit} className="space-y-5">
                {/* Dropzone */}
                <div
                  onClick={() => inputRef.current?.click()}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragging(true);
                  }}
                  onDragLeave={() => setDragging(false)}
                  onDrop={onDrop}
                  className={`rounded-2xl border-2 border-dashed px-6 py-10 text-center cursor-pointer transition-colors ${
                    dragging ? 'border-teal-500 bg-teal-50/70' : 'border-slate-200 bg-slate-50 hover:border-teal-400'
                  }`}
                >
                  <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.webp,application/pdf,image/jpeg,image/png,image/webp"
                    className="hidden"
                    onChange={(e) => pickFile(e.target.files?.[0])}
                  />
                  {file ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-white border border-teal-200 flex items-center justify-center">
                        <i className="ri-file-shield-2-line text-2xl text-teal-700"></i>
                      </div>
                      <div className="text-sm font-semibold text-slate-900 break-all px-4">{file.name}</div>
                      <div className="text-xs text-slate-500 font-mono">{prettySize(file.size)}</div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          reset();
                        }}
                        className="mt-1 text-xs font-medium text-rose-600 hover:text-rose-700 whitespace-nowrap"
                      >
                        <i className="ri-delete-bin-line mr-1"></i>Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
                        <i className="ri-upload-cloud-2-line text-2xl text-teal-700"></i>
                      </div>
                      <div className="text-sm font-semibold text-slate-900">
                        Drop your Certificate of Analysis here
                      </div>
                      <div className="text-xs text-slate-500">
                        or <span className="text-teal-700 font-semibold">browse files</span> · 12MB max
                      </div>
                      <div className="mt-2 text-[11px] text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1 inline-block">
                        Upload the original PDF for full binary forensics - image scans skip metadata analysis
                      </div>
                    </div>
                  )}
                </div>

                {fileError && (
                  <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 flex items-start gap-2">
                    <i className="ri-error-warning-line mt-0.5"></i>
                    <span>{fileError}</span>
                  </div>
                )}

                {/* Email gate */}
                <label className="block">
                  <span className="text-xs font-semibold text-slate-700">Your email *</span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@lab.com"
                    className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                  />
                  <span className="mt-1.5 block text-[11px] text-slate-400 leading-relaxed">
                    Unlocks unlimited free checks. We send the occasional note about new verification tools and
                    industry trust news - one-click unsubscribe, never sold or shared.
                  </span>
                </label>

                <input
                  type="text"
                  name="website_alt"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  readOnly
                  className="hp-field-9471"
                />

                {status === 'error' && error && (
                  <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 flex items-start gap-2">
                    <i className="ri-error-warning-line mt-0.5"></i>
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={busy}
                  className="whitespace-nowrap w-full px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  <i className="ri-shield-check-line"></i>
                  Verify this document
                </button>
                <p className="text-center text-[11px] text-slate-400">
                  Your document is analysed then discarded. It is never published or shared.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}