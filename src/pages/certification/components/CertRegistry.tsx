import { Link } from 'react-router-dom';
import type { Certification } from '@/mocks/certifications';
import { gradeMeta } from '@/mocks/certifications';
import { formatCertDate, certStatusLabel } from '@/hooks/useCertifications';
import CertificationSeal from '@/components/feature/CertificationSeal';

interface Props {
  certifications: Certification[];
  loading: boolean;
  error: string | null;
  onRetry: () => void;
}

export default function CertRegistry({ certifications, loading, error, onRetry }: Props) {
  const ordered = [...certifications].sort((a, b) => {
    if (a.status !== b.status) return a.status === 'active' ? -1 : 1;
    if (a.grade !== b.grade) return a.grade === 'true_coa_verified' ? -1 : 1;
    return a.vendor_name.localeCompare(b.vendor_name);
  });

  return (
    <section className="relative py-20 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div className="max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">Public registry</div>
            <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
              Every seal we have ever issued.
            </h2>
            <p className="mt-4 text-slate-600 text-sm leading-relaxed">
              A living record of the vendors currently holding a certification. It grows and shrinks with the compliance
              desk, and nothing is hidden from it.
            </p>
          </div>
          <div className="text-xs font-mono text-slate-500 whitespace-nowrap">
            {loading ? 'Syncing…' : `${certifications.filter((c) => c.status === 'active').length} active · ${certifications.length} total`}
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="rounded-2xl border border-slate-200 bg-white p-6 animate-pulse">
                <div className="h-8 w-44 rounded bg-slate-200/70"></div>
                <div className="mt-4 h-4 w-32 rounded bg-slate-200/60"></div>
                <div className="mt-3 h-3 w-full rounded bg-slate-200/50"></div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="rounded-2xl border border-amber-200 bg-slate-50 p-12 text-center">
            <i className="ri-error-warning-line text-3xl text-amber-500"></i>
            <div className="mt-3 text-sm text-slate-700">We couldn&apos;t load the certification registry.</div>
            <div className="mt-1 text-xs text-slate-500">{error}</div>
            <button
              onClick={onRetry}
              className="mt-4 whitespace-nowrap px-4 py-2 rounded-md text-xs font-semibold text-teal-700 border border-teal-400/40 hover:bg-teal-50 transition-all"
            >
              <i className="ri-refresh-line mr-1"></i>Retry
            </button>
          </div>
        ) : ordered.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
            <i className="ri-award-line text-3xl text-slate-400"></i>
            <div className="mt-3 text-sm text-slate-600">No certifications are on record yet.</div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {ordered.map((c) => (
              <div
                key={c.id}
                className={`rounded-2xl border p-6 flex flex-col ${
                  c.status === 'active' ? 'border-slate-200 bg-white' : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <CertificationSeal grade={c.grade} status={c.status} size="md" />
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full border whitespace-nowrap ${
                      c.status === 'active'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
                        : 'border-amber-200 bg-amber-50 text-amber-700'
                    }`}
                  >
                    {certStatusLabel(c.status)}
                  </span>
                </div>

                <Link
                  to={`/vendors/${c.vendor_slug}`}
                  className="mt-5 font-display font-bold text-slate-900 text-base hover:text-teal-700 transition-colors"
                >
                  {c.vendor_name}
                </Link>
                <div className="mt-1 text-[11px] font-mono text-slate-500">{c.cert_id}</div>

                <div className="mt-4 space-y-2 text-xs">
                  <Row label="Laboratory" value={c.coa_lab ?? '-'} icon="ri-flask-line" />
                  <Row label="Batch" value={c.coa_batch_no ?? '-'} icon="ri-qr-code-line" />
                  <Row label="Last reviewed" value={formatCertDate(c.last_reviewed_at)} icon="ri-refresh-line" />
                </div>

                <p className="mt-4 text-xs text-slate-500 leading-relaxed flex-1">{gradeMeta[c.grade].proves}</p>

                <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Issued {formatCertDate(c.issued_at)}
                  </span>
                  <Link
                    to={`/vendors/${c.vendor_slug}`}
                    className="whitespace-nowrap text-xs font-semibold text-teal-700 hover:text-teal-800 flex items-center gap-1"
                  >
                    Profile<i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function Row({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <span className="text-slate-500 flex items-center gap-1.5">
        <i className={`${icon} text-slate-400`}></i>
        {label}
      </span>
      <span className="text-slate-800 font-medium truncate">{value}</span>
    </div>
  );
}