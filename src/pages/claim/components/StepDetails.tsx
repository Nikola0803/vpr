export interface Details {
  contact: string;
  email: string;
  role: string;
  phone: string;
  plan: string;
}

interface StepDetailsProps {
  details: Details;
  onChange: (d: Details) => void;
}

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-400 transition-colors';

export default function StepDetails({ details, onChange }: StepDetailsProps) {
  const set = (patch: Partial<Details>) => onChange({ ...details, ...patch });

  return (
    <div>
      <h2 className="font-display font-bold text-slate-900 text-xl">Tell us about your company</h2>
      <p className="mt-1 text-sm text-slate-500">
        This becomes your admin contact for the vendor portal, review replies, and billing.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="claim-contact" className="block text-xs font-medium text-slate-500 mb-2">Full name</label>
          <input
            id="claim-contact"
            value={details.contact}
            onChange={(e) => set({ contact: e.target.value })}
            placeholder="Dr. Sarah Whitfield"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="claim-role" className="block text-xs font-medium text-slate-500 mb-2">Role at company</label>
          <input
            id="claim-role"
            value={details.role}
            onChange={(e) => set({ role: e.target.value })}
            placeholder="Operations Manager"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="claim-email" className="block text-xs font-medium text-slate-500 mb-2">Work email</label>
          <input
            id="claim-email"
            type="email"
            value={details.email}
            onChange={(e) => set({ email: e.target.value })}
            placeholder="sarah@yourstore.com"
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="claim-phone" className="block text-xs font-medium text-slate-500 mb-2">Phone (optional)</label>
          <input
            id="claim-phone"
            value={details.phone}
            onChange={(e) => set({ phone: e.target.value })}
            placeholder="+1 (614) 555-0134"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="claim-plan" className="block text-xs font-medium text-slate-500 mb-2">Plan you&apos;re interested in</label>
        <select
          id="claim-plan"
          value={details.plan}
          onChange={(e) => set({ plan: e.target.value })}
          className={inputClass}
        >
          {['Free', 'Starter', 'Growth', 'Professional', 'Not sure yet'].map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
    </div>
  );
}