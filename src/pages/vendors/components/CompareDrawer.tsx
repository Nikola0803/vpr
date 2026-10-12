import { Link } from 'react-router-dom';
import type { Vendor } from '@/mocks/vendors';

interface Props {
  vendors: Vendor[];
  onRemove: (slug: string) => void;
  onClear: () => void;
}

const rows: { label: string; key: keyof Vendor; suffix?: string }[] = [
  { label: 'Trust Score', key: 'score', suffix: ' / 5.0' },
  { label: 'Verified Reviews', key: 'reviews' },
  { label: 'Purity Rating', key: 'purity', suffix: ' / 5.0' },
  { label: 'Shipping Rating', key: 'shipping', suffix: ' / 5.0' },
  { label: 'Support Rating', key: 'support', suffix: ' / 5.0' },
  { label: 'Avg Ship Time', key: 'avgShipDays', suffix: ' days' },
  { label: 'Response Rate', key: 'responseRate', suffix: '%' },
];

export default function CompareDrawer({ vendors, onRemove, onClear }: Props) {
  if (vendors.length === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-4 pb-4">
      <div className="max-w-[1400px] mx-auto glass rounded-2xl border-cyan-500/30 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
            <i className="ri-scales-3-line text-cyan-600"></i>
            Compare Mode
            <span className="text-xs font-mono text-slate-500">({vendors.length}/3)</span>
          </div>
          <button onClick={onClear} className="text-xs text-slate-600 hover:text-cyan-700 whitespace-nowrap">
            Clear all
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[560px] border-collapse">
            <thead>
              <tr>
                <th className="text-left px-5 py-3 text-[11px] font-mono uppercase tracking-wider text-slate-500 w-40">
                  Metric
                </th>
                {vendors.map((v) => (
                  <th key={v.slug} className="px-5 py-3 text-left">
                    <div className="flex items-center justify-between gap-2">
                      <Link to={`/vendors/${v.slug}`} className="text-sm font-semibold text-slate-900 hover:text-cyan-700 whitespace-nowrap">
                        {v.name}
                      </Link>
                      <button
                        onClick={() => onRemove(v.slug)}
                        aria-label="Remove"
                        className="w-6 h-6 flex items-center justify-center rounded text-slate-500 hover:text-rose-500"
                      >
                        <i className="ri-close-line"></i>
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.label} className={i % 2 === 0 ? '' : 'bg-slate-50'}>
                  <td className="px-5 py-2.5 text-xs text-slate-600">{r.label}</td>
                  {vendors.map((v) => {
                    const raw = v[r.key];
                    const val = typeof raw === 'number' ? raw.toLocaleString() : String(raw);
                    return (
                      <td key={v.slug} className="px-5 py-2.5 text-sm font-mono text-slate-900">
                        {val}
                        {r.suffix || ''}
                      </td>
                    );
                  })}
                </tr>
              ))}
              <tr>
                <td className="px-5 py-2.5 text-xs text-slate-600">COA Transparency</td>
                {vendors.map((v) => (
                  <td key={v.slug} className="px-5 py-2.5">
                    <span
                      className={`text-[11px] font-mono px-2 py-1 rounded-md ${
                        v.publicCoa ? 'bg-emerald-500/10 text-emerald-600' : 'bg-slate-100 text-slate-500'
                      }`}
                    >
                      {v.publicCoa ? 'Public COA Vault' : 'Private'}
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-5 py-2.5 text-xs text-slate-600">Region</td>
                {vendors.map((v) => (
                  <td key={v.slug} className="px-5 py-2.5 text-sm text-slate-800">
                    {v.region}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}