import { useMemo, useState } from 'react';
import { publicVendors, type Vendor } from '@/mocks/vendors';

interface StepFindProps {
  selected: Vendor | null;
  onSelect: (v: Vendor) => void;
}

export default function StepFind({ selected, onSelect }: StepFindProps) {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return publicVendors;
    return publicVendors.filter((v) =>
      `${v.name} ${v.domain} ${v.country} ${v.compounds.join(' ')}`.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div>
      <h2 className="font-display font-bold text-slate-900 text-xl">Find your store listing</h2>
      <p className="mt-1 text-sm text-slate-500">
        Search the directory by store name, domain, or compound. Select the listing that belongs to you.
      </p>

      <div className="mt-6 relative">
        <i className="ri-search-2-line absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by store name, domain, or compound (e.g. BPC-157)"
          className="w-full rounded-xl border border-slate-200 bg-white pl-11 pr-4 py-3.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-400"
        />
      </div>

      <div className="mt-2 text-xs text-slate-400 font-mono">
        {results.length} {results.length === 1 ? 'listing' : 'listings'} matched
      </div>

      <div className="mt-4 space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
        {results.map((v) => {
          const active = selected?.slug === v.slug;
          return (
            <button
              key={v.slug}
              type="button"
              onClick={() => onSelect(v)}
              className={`w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-colors ${
                active ? 'border-teal-400 bg-teal-50' : 'border-slate-200 bg-white hover:border-teal-300 hover:bg-slate-50'
              }`}
            >
              <span className="w-11 h-11 rounded-lg flex items-center justify-center font-display font-extrabold text-white bg-gradient-to-br from-teal-500 to-emerald-500 shrink-0">
                {v.init}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900 truncate">{v.name}</span>
                  {v.verified && <i className="ri-verified-badge-fill text-emerald-600 text-sm"></i>}
                </span>
                <span className="mt-1 flex flex-wrap gap-x-3 text-xs text-slate-500 font-mono">
                  <span>{v.domain}</span>
                  <span>{v.country}</span>
                  <span>{v.reviews.toLocaleString()} reviews</span>
                </span>
              </span>
              <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center border ${active ? 'bg-teal-600 border-teal-600 text-white' : 'border-slate-300 text-transparent'}`}>
                <i className="ri-check-line text-xs"></i>
              </span>
            </button>
          );
        })}
        {results.length === 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-8 text-center">
            <i className="ri-search-eye-line text-2xl text-slate-400"></i>
            <div className="mt-3 text-sm text-slate-600">No listing found for “{query}”.</div>
          </div>
        )}
      </div>

      <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4 flex gap-3">
        <i className="ri-information-line text-teal-600 mt-0.5"></i>
        <p className="text-xs text-slate-500 leading-relaxed">
          Vendors are curated by hand during our onboarding phase. Not listed yet? Finish the claim and our team will
          create a verified listing for your store.
        </p>
      </div>
    </div>
  );
}