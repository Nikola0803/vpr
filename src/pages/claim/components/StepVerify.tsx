import type { Vendor } from '@/mocks/vendors';

export type VerifyMethod = 'dns' | 'email' | 'doc';

interface StepVerifyProps {
  vendor: Vendor;
  method: VerifyMethod;
  onMethod: (m: VerifyMethod) => void;
  verified: boolean;
  onVerify: () => void;
}

const methods: { id: VerifyMethod; label: string; note: string; icon: string }[] = [
  { id: 'dns', label: 'DNS TXT record', note: 'Fastest, usually verified within minutes', icon: 'ri-server-line' },
  { id: 'email', label: 'Team email on domain', note: 'Confirm a mailbox on your store domain', icon: 'ri-mail-check-line' },
  { id: 'doc', label: 'Business registration', note: 'Upload a document we can cross-check', icon: 'ri-file-shield-2-line' },
];

export default function StepVerify({ vendor, method, onMethod, verified, onVerify }: StepVerifyProps) {
  const token = `vpr-verify-${vendor.slug.slice(0, 8)}-8f2a`;

  return (
    <div>
      <h2 className="font-display font-bold text-slate-900 text-xl">Verify you own {vendor.name}</h2>
      <p className="mt-1 text-sm text-slate-500">
        We confirm control of <span className="font-mono text-slate-700">{vendor.domain}</span> before transferring portal
        access. Choose the method that&apos;s easiest for you.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {methods.map((m) => {
          const active = method === m.id;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onMethod(m.id)}
              className={`text-left rounded-xl border p-4 transition-colors ${
                active ? 'border-teal-400 bg-teal-50' : 'border-slate-200 bg-white hover:border-teal-300'
              }`}
            >
              <i className={`${m.icon} text-lg ${active ? 'text-teal-700' : 'text-slate-400'}`}></i>
              <div className="mt-2 text-sm font-semibold text-slate-900">{m.label}</div>
              <div className="mt-0.5 text-xs text-slate-500">{m.note}</div>
            </button>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
        {method === 'dns' && (
          <div>
            <div className="text-sm font-semibold text-slate-900">Add this TXT record to your DNS</div>
            <p className="mt-1 text-xs text-slate-500">
              Create a TXT record on the root domain with the value below, then click verify.
            </p>
            <div className="mt-4 flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3">
              <code className="font-mono text-xs text-teal-700 break-all">{token}</code>
              <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 whitespace-nowrap">TXT · @</span>
            </div>
          </div>
        )}
        {method === 'email' && (
          <div>
            <div className="text-sm font-semibold text-slate-900">Confirm a mailbox on your domain</div>
            <p className="mt-1 text-xs text-slate-500">
              We&apos;ll send a one-time code to an address at <span className="font-mono text-slate-700">@{vendor.domain}</span>.
              Reply or click the code to confirm ownership.
            </p>
            <div className="mt-4 rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm font-mono text-slate-700">
              owner@{vendor.domain}
            </div>
          </div>
        )}
        {method === 'doc' && (
          <div>
            <div className="text-sm font-semibold text-slate-900">Upload a business document</div>
            <p className="mt-1 text-xs text-slate-500">
              A registration certificate, reseller license, or invoice showing your store name and domain.
            </p>
            <div className="mt-4 rounded-lg border-2 border-dashed border-slate-200 bg-white p-6 text-center">
              <i className="ri-upload-cloud-2-line text-2xl text-teal-600"></i>
              <div className="mt-2 text-sm text-slate-700">Drop a PDF or image here</div>
              <div className="mt-1 text-xs text-slate-400">Max 10MB · reviewed within one business day</div>
            </div>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          {verified ? (
            <span className="inline-flex items-center gap-2 text-sm font-medium text-emerald-600">
              <i className="ri-shield-check-fill"></i>Ownership verified
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>Awaiting verification
            </span>
          )}
          <button
            type="button"
            onClick={onVerify}
            disabled={verified}
            className={`whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              verified ? 'text-emerald-700 bg-emerald-50 border border-emerald-200 cursor-default' : 'text-white bg-teal-600 hover:bg-teal-700'
            }`}
          >
            {verified ? 'Verified' : method === 'dns' ? 'Run DNS check' : method === 'email' ? 'Send code' : 'Submit document'}
          </button>
        </div>
      </div>
    </div>
  );
}