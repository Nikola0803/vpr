import { Link } from 'react-router-dom';
import CertificationSeal from '@/components/feature/CertificationSeal';
import { useCertifications, formatCertDate } from '@/hooks/useCertifications';

export default function CertificationStatus({ vendorSlug }: { vendorSlug: string }) {
  const { certifications, loading, error, reload } = useCertifications(vendorSlug);
  const cert = certifications[0];

  return (
    <div className="glass rounded-2xl p-5 mt-5">
      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3 flex items-center justify-between">
        Certification
        <i className="ri-award-line text-teal-600"></i>
      </div>

      {loading ? (
        <div className="h-20 rounded-lg bg-slate-100 animate-pulse"></div>
      ) : error ? (
        <div className="text-xs text-slate-600">
          Couldn&apos;t load status.
          <button onClick={reload} className="ml-1 text-teal-700 font-semibold hover:text-teal-800">
            Retry
          </button>
        </div>
      ) : cert ? (
        <>
          <CertificationSeal grade={cert.grade} status={cert.status} size="md" linked />
          <div className="mt-3 space-y-1.5 text-[11px]">
            <Row label="Certificate" value={cert.cert_id} mono />
            <Row label="Reviewed" value={formatCertDate(cert.last_reviewed_at)} />
            <Row label="Valid until" value={formatCertDate(cert.expires_at)} />
          </div>
          <p className="mt-3 text-[10px] text-slate-500 leading-relaxed">
            Managed by our compliance desk. Suspended or revoked the moment a certificate lapses, fails or is disputed.
          </p>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm text-slate-700">
            <i className="ri-shield-line text-slate-400"></i>Not yet certified
          </div>
          <p className="mt-2 text-[11px] text-slate-500 leading-relaxed">
            Submit your batch certificate of analysis for review. Approval is a manual compliance decision on our side, never
            automatic with a plan.
          </p>
          <Link
            to="/certification"
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 hover:text-teal-800"
          >
            Apply for certification<i className="ri-arrow-right-line"></i>
          </Link>
        </>
      )}
    </div>
  );
}

function Row({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-slate-500">{label}</span>
      <span className={`text-slate-800 truncate ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
}