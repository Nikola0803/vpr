import type { Role } from '@/context/AuthContext';

interface RoleSelectProps {
  value: Role;
  onChange: (role: Role) => void;
}

const options = [
  { id: 'customer' as const, label: 'Researcher', icon: 'ri-user-line', note: 'Browse & write reviews' },
  { id: 'vendor' as const, label: 'Company', icon: 'ri-building-4-line', note: 'Claim & manage a store' },
];

export default function RoleSelect({ value, onChange }: RoleSelectProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {options.map((o) => {
        const active = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o.id)}
            className={`text-left rounded-xl p-4 border transition-all duration-200 ${
              active ? 'border-cyan-500/50 bg-cyan-500/10' : 'border-slate-200 bg-slate-50 hover:border-slate-300'
            }`}
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${
                active ? 'bg-gradient-to-br from-cyan-500 to-teal-500 text-slate-900' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <i className={`${o.icon} text-base`}></i>
            </div>
            <div className="text-sm font-semibold text-slate-900">{o.label}</div>
            <div className="text-xs text-slate-500 mt-0.5">{o.note}</div>
          </button>
        );
      })}
    </div>
  );
}