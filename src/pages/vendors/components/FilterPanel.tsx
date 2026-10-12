import { allCompounds, allRegions } from '@/mocks/vendors';

export interface Filters {
  search: string;
  minScore: number;
  publicCoa: boolean;
  thirdPartyLab: boolean;
  qrVerify: boolean;
  region: string;
  compounds: string[];
}

export const defaultFilters: Filters = {
  search: '',
  minScore: 0,
  publicCoa: false,
  thirdPartyLab: false,
  qrVerify: false,
  region: 'All',
  compounds: [],
};

interface Props {
  filters: Filters;
  onChange: (f: Filters) => void;
  resultCount: number;
}

function Toggle({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  icon: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg border text-sm transition-all ${
        active
          ? 'bg-cyan-500/10 border-cyan-500/40 text-cyan-800'
          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-cyan-500/30'
      }`}
    >
      <span className="flex items-center gap-2">
        <i className={`${icon} text-sm`}></i>
        {label}
      </span>
      <span
        className={`w-4 h-4 rounded flex items-center justify-center border ${
          active ? 'bg-cyan-500 border-cyan-500' : 'border-slate-300'
        }`}
      >
        {active && <i className="ri-check-line text-[10px] text-slate-900"></i>}
      </span>
    </button>
  );
}

export default function FilterPanel({ filters, onChange, resultCount }: Props) {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <aside className="lg:sticky lg:top-24 space-y-5">
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
            <i className="ri-filter-3-line text-cyan-600"></i>Filters
          </div>
          <button
            onClick={() => onChange(defaultFilters)}
            className="text-xs text-slate-600 hover:text-cyan-700 whitespace-nowrap"
          >
            Reset
          </button>
        </div>

        <div className="relative">
          <i className="ri-search-2-line absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm"></i>
          <input
            value={filters.search}
            onChange={(e) => set({ search: e.target.value })}
            placeholder="Vendor name or keyword"
            className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-cyan-500/50"
          />
        </div>

        <div className="mt-5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">Minimum Trust Score</div>
          <div className="flex gap-2">
            {[0, 4.0, 4.5, 4.7].map((s) => (
              <button
                key={s}
                onClick={() => set({ minScore: s })}
                className={`flex-1 px-2 py-2 rounded-lg text-xs font-mono border transition-all ${
                  filters.minScore === s
                    ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-800'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-cyan-500/30'
                }`}
              >
                {s === 0 ? 'All' : `${s}+`}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">Testing &amp; COA Transparency</div>
          <Toggle label="Public Batch COAs" icon="ri-file-shield-2-line" active={filters.publicCoa} onClick={() => set({ publicCoa: !filters.publicCoa })} />
          <Toggle label="Third-Party Lab Verified" icon="ri-flask-line" active={filters.thirdPartyLab} onClick={() => set({ thirdPartyLab: !filters.thirdPartyLab })} />
          <Toggle label="QR Code Verification" icon="ri-qr-code-line" active={filters.qrVerify} onClick={() => set({ qrVerify: !filters.qrVerify })} />
        </div>

        <div className="mt-5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">Shipping &amp; Geography</div>
          <div className="space-y-2">
            {['All', ...allRegions].map((r) => (
              <button
                key={r}
                onClick={() => set({ region: r })}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all ${
                  filters.region === r
                    ? 'bg-teal-500/10 border-teal-500/40 text-teal-800'
                    : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-teal-500/30'
                }`}
              >
                {r === 'All' ? 'All Regions' : r}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">Compound Availability</div>
          <div className="flex flex-wrap gap-1.5">
            {allCompounds.map((c) => {
              const active = filters.compounds.includes(c);
              return (
                <button
                  key={c}
                  onClick={() =>
                    set({
                      compounds: active
                        ? filters.compounds.filter((x) => x !== c)
                        : [...filters.compounds, c],
                    })
                  }
                  className={`text-[11px] font-mono px-2.5 py-1.5 rounded-md border transition-all ${
                    active
                      ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-cyan-500/30'
                  }`}
                >
                  {c}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="glass rounded-2xl p-5 flex items-center justify-between">
        <span className="text-sm text-slate-600">Matching vendors</span>
        <span className="font-display font-extrabold text-slate-900 text-xl">{resultCount}</span>
      </div>
    </aside>
  );
}