export type BillingCycle = 'monthly' | 'yearly';

interface Props {
  value: BillingCycle;
  onChange: (value: BillingCycle) => void;
  saveLabel?: string;
  className?: string;
}

export default function BillingToggle({ value, onChange, saveLabel = 'Save 60%', className = '' }: Props) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1">
        {(['monthly', 'yearly'] as BillingCycle[]).map((cycle) => {
          const active = value === cycle;
          return (
            <button
              key={cycle}
              type="button"
              onClick={() => onChange(cycle)}
              className={`whitespace-nowrap px-5 py-2 rounded-full text-sm font-semibold capitalize transition-all ${
                active ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cycle}
            </button>
          );
        })}
      </div>
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
        <i className="ri-price-tag-3-line"></i>
        Billed yearly {saveLabel}
      </span>
    </div>
  );
}