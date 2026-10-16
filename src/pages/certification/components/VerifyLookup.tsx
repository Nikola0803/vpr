import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Certification } from '@/mocks/certifications';
import { gradeMeta } from '@/mocks/certifications';
import { findCertification, formatCertDate, certStatusLabel } from '@/hooks/useCertifications';
import CertificationSeal from '@/components/feature/CertificationSeal';

interface Props {
  certifications: Certification[];
  loading: boolean;
}

export default function VerifyLookup({ certifications, loading }: Props) {
  const [query, setQuery] = useState('');
  const [submitted, setSubmitted] = useState<string | null>(null);

  const result = useMemo(
    () => (submitted ? findCertification(certifications, submitted) : null),
    [certifications, submitted],
  );

  const examples = certifications.filter((c) => c.status === 'active').slice(0, 3);

  const run = (value: string) => {
    const v = value.trim();
    if (!v) return;
    setQuery(v);
    setSubmitted(v);
  };

  return (
    <section id="verify" className="relative py-20 border-t border-slate-200 scroll-mt-28">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 items-start">
          <div className="lg:sticky lg:top-28">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">Verify a seal</div>
            <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
              Look it up before you trust it.
            </h2>
            <p className="mt-4 text-slate-600 text-sm leading-relaxed">
              Every seal binds to a certificate ID, and every seal we have ever issued lives in this registry. Type an ID,
              a vendor name or a domain slug and you will get the grade, the issuing laboratory and the date it was last
              reviewed. No match means no valid seal.
            </p>

            <div className="mt-6">
              <label htmlFor="cert-lookup" className="block text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                Certificate ID or vendor
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  id="cert-lookup"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') run(query);
                  }}
                  placeholder="e.g. VPR-TCOA-2026-0412"
                  className="flex-1 px-4 py-3 rounded-md border border-slate-200 bg-white text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-400/50 focus:border-teal-400 transition-all"
                />
                <button
                  onClick={() => run(query)}
                  className="whitespace-nowrap px-5 py-3 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="ri-search-line"></i>Verify
                </button>
              </div>

              {examples.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Try</span>
                  {examples.map((c) => (
                    <button
                      key={c.cert_id}
                      onClick={() => run(c.cert_id)}
                      className="text-[11px] font-mono px-2.5 py-1 rounded-full border border-slate-200 bg-white text-slate-600 hover:border-teal-400 hover:text-teal-700 transition-all"
                    >
                      {c.cert_id}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="min-h-[280px]">
            {loading ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-8 animate-pulse">
                <div className="h-4 w-40 rounded bg-slate-200/70"></div>
                <div className="mt-4 h-6 w-56 rounded bg-slate-200/60"></div>
                <div className="mt-4 h-3 w-full rounded bg-slate-200/50"></div>
              </div>
            ) : !submitted ? (
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 md:p-10 text-center">
                <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-2xl bg-white border border-slate-200 text-slate-400">
                  <i className="ri-qr-scan-2-line text-2xl"></i>
                </div>
                <div className="mt-4 font-display font-bold text-slate-900">Awaiting a certificate ID</div>
                <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
                  Enter a certificate ID or vendor name to see its live certification status straight from the registry.
                </p>
              </div>
            ) : !result ? (
              <div className="rounded-2xl border border-rose-200 bg-rose-50 p-8 md:p-10">
                <div className="flex items-center gap-3">
                  <span className="w-11 h-11 flex items-center justify-center rounded-xl bg-rose-100 text-rose-600">
                    <i className="ri-close-circle-line text-xl"></i>
                  </span>
                  <div>
                    <div className="font-display font-bold text-rose-900">No valid seal found</div>
                    <div className="text-xs font-mono text-rose-700/80 mt-0.5">“{submitted}”</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-rose-900/90 leading-relaxed">
                  Nothing in the registry matches that certificate ID or vendor. That means there is no active seal to
                  verify. If a vendor is showing this mark, treat it as unverified and report it to us.
                </p>
              </div>
            ) : (
              <div
                className={`rounded-2xl border p-7 md:p-8 ${
                  result.status === 'active' ? 'border-emerald-200 bg-white' : 'border-amber-200 bg-amber-50/60'
                }`}
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <CertificationSeal
                    grade={result.grade}
                    status={result.status}
                    size="lg"
                  />
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border whitespace-nowrap ${
                      result.status === 'active'
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-700'
                        : 'border-amber-300 bg-amber-50 text-amber-700'
                    }`}
                  >
                    {certStatusLabel(result.status)}
                  </span>
                </div>

                <div className="mt-5">
                  <div className="font-display font-extrabold text-slate-900 text-xl">{result.vendor_name}</div>
                  <div className="mt-1 text-xs font-mono text-slate-500">
                    {result.cert_id} · {gradeMeta[result.grade].label}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                  <Field label="Issuing laboratory" value={result.coa_lab ?? '-'} icon="ri-flask-line" />
                  <Field label="Verified batch" value={result.coa_batch_no ?? '-'} icon="ri-qr-code-line" />
                  <Field label="Compound" value={result.coa_compound ?? '-'} icon="ri-test-tube-line" />
                  <Field label="Issued" value={formatCertDate(result.issued_at)} icon="ri-calendar-check-line" />
                  <Field label="Last reviewed" value={formatCertDate(result.last_reviewed_at)} icon="ri-refresh-line" />
                  <Field label="Valid until" value={formatCertDate(result.expires_at)} icon="ri-shield-check-line" />
                </div>

                {result.status !== 'active' && (
                  <div className="mt-5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                    <i className="ri-shield-flash-line mr-1.5"></i>
                    {result.status === 'suspended'
                      ? 'This seal is suspended pending a certificate dispute.'
                      : `This seal was revoked on ${formatCertDate(result.revoked_at)}.`}
                    {result.revoke_reason ? ` ${result.revoke_reason}` : ''}
                  </div>
                )}

                {result.status === 'active' && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    <Link
                      to={`/vendors/${result.vendor_slug}`}
                      className="whitespace-nowrap px-4 py-2.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center gap-2"
                    >
                      <i className="ri-store-3-line"></i>View vendor profile
                    </Link>
                    {result.notes && (
                      <span className="flex items-center text-xs text-slate-500 max-w-md leading-snug">
                        <i className="ri-information-line mr-1.5 text-slate-400"></i>
                        {result.notes}
                      </span>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div>
      <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
        <i className={icon}></i>
        {label}
      </div>
      <div className="mt-1 text-sm text-slate-800 font-medium">{value}</div>
    </div>
  );
}