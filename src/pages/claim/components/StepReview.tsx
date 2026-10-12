import type { Vendor } from '@/mocks/vendors';
import type { VerifyMethod } from '@/pages/claim/components/StepVerify';
import type { Details } from '@/pages/claim/components/StepDetails';

interface StepReviewProps {
  vendor: Vendor;
  method: VerifyMethod;
  details: Details;
  authed: boolean;
  onBack: () => void;
  onSubmit: () => void;
}

const methodLabel: Record<VerifyMethod, string> = {
  dns: 'DNS TXT record',
  email: 'Team email on domain',
  doc: 'Business registration document',
};

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3 border-b border-slate-100 last:border-0">
      <span className="text-xs text-slate-500">{label}</span>
      <span className="text-sm font-medium text-slate-900 text-right">{value || '-'}</span>
    </div>
  );
}

export default function StepReview({ vendor, method, details, authed, onBack, onSubmit }: StepReviewProps) {
  return (
    <div>
      <h2 className="font-display font-bold text-slate-900 text-xl">Review &amp; submit your claim</h2>
      <p className="mt-1 text-sm text-slate-500">
        We&apos;ll transfer portal access to your account once verification clears, usually within one business day.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
        <div className="flex items-center gap-4">
          <span className="w-12 h-12 rounded-xl flex items-center justify-center font-display font-extrabold text-white bg-gradient-to-br from-teal-500 to-emerald-500">
            {vendor.init}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-slate-900">{vendor.name}</span>
              {vendor.verified && <i className="ri-verified-badge-fill text-emerald-600 text-sm"></i>}
            </div>
            <div className="mt-1 text-xs text-slate-500 font-mono">{vendor.domain}</div>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 px-5 py-2">
        <Row label="Verification method" value={methodLabel[method]} />
        <Row label="Contact" value={details.contact} />
        <Row label="Role" value={details.role} />
        <Row label="Work email" value={details.email} />
        <Row label="Plan interest" value={details.plan} />
      </div>

      {!authed && (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <i className="ri-lock-line text-amber-600 mt-0.5"></i>
          <p className="text-xs text-amber-800 leading-relaxed">
            You need a company account to submit a claim. We&apos;ll save your details and take you to sign in.
          </p>
        </div>
      )}

      <div className="mt-7 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="whitespace-nowrap px-5 py-3 rounded-full text-sm font-semibold text-slate-600 border border-slate-200 hover:border-teal-400 transition-colors"
        >
          <i className="ri-arrow-left-line mr-1"></i>Back
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center gap-2"
        >
          <i className={authed ? 'ri-shield-check-line' : 'ri-login-box-line'}></i>
          {authed ? 'Submit claim' : 'Sign in & submit'}
        </button>
      </div>
    </div>
  );
}