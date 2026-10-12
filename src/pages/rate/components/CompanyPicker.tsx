import { useEffect, useRef, useState } from 'react';
import { publicVendors, type Vendor } from '@/mocks/vendors';

interface Props {
  value: Vendor;
  onChange: (v: Vendor) => void;
}

export default function CompanyPicker({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const results = publicVendors.filter((v) =>
    `${v.name} ${v.domain} ${v.compounds.join(' ')}`.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-left hover:border-teal-400 transition-colors"
      >
        <span className="w-11 h-11 rounded-lg flex items-center justify-center font-display font-extrabold text-white bg-gradient-to-br from-teal-500 to-emerald-500 shrink-0">
          {value.init}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-sm font-semibold text-slate-900 truncate">{value.name}</span>
          <span className="mt-0.5 flex items-center gap-1.5 text-xs text-slate-500">
            <i className="ri-verified-badge-fill text-emerald-600"></i>
            <span className="truncate">{value.domain}</span>
          </span>
        </span>
        <span className="shrink-0 flex items-center gap-2">
          <span className="hidden sm:inline text-[11px] font-medium text-teal-700 bg-teal-50 px-2 py-1 rounded-full">
            Change
          </span>
          <i className={`ri-arrow-down-s-line text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}></i>
        </span>
      </button>

      {open && (
        <div className="absolute z-40 mt-2 w-full rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="p-2.5 border-b border-slate-100">
            <div className="relative">
              <i className="ri-search-2-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm"></i>
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search verified vendors…"
                className="w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-400"
              />
            </div>
          </div>
          <div className="max-h-72 overflow-y-auto py-1">
            {results.map((v) => {
              const active = v.slug === value.slug;
              return (
                <button
                  key={v.slug}
                  type="button"
                  onClick={() => {
                    onChange(v);
                    setOpen(false);
                    setQ('');
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors ${
                    active ? 'bg-teal-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <span className="w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br from-teal-500 to-emerald-500 shrink-0">
                    {v.init}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-slate-900 truncate">{v.name}</span>
                    <span className="block text-[11px] text-slate-500 font-mono truncate">{v.domain}</span>
                  </span>
                  {v.verified && <i className="ri-verified-badge-fill text-emerald-600 text-sm"></i>}
                  {active && <i className="ri-check-line text-teal-600"></i>}
                </button>
              );
            })}
            {results.length === 0 && (
              <div className="px-4 py-6 text-center text-sm text-slate-500">
                No vendor matches “{q}”.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}