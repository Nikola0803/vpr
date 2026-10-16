import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface FakeCoa {
  id: string;
  company: string | null;
  product: string | null;
  verdict: string;
  confidence: number | null;
  headline: string | null;
  created_at: string;
}

export default function ShameWall() {
  const [rows, setRows] = useState<FakeCoa[]>([]);

  useEffect(() => {
    supabase
      .from('fake_coas')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)
      .then(({ data }) => { if (data) setRows(data); });
  }, []);

  if (rows.length === 0) return null;

  function timeAgo(iso: string): string {
    const diff = Date.now() - new Date(iso).getTime();
    const m = Math.floor(diff / 60000);
    if (m < 60) return `${m}m ago`;
    const h = Math.floor(m / 60);
    if (h < 24) return `${h}h ago`;
    return `${Math.floor(h / 24)}d ago`;
  }

  const redditText = (r: FakeCoa) =>
    `Fake COA caught by COA Verifier - ${r.company ?? 'Unknown company'}${r.product ? ` (${r.product})` : ''}: "${r.headline ?? r.verdict}" - https://www.verifiedpeptidereviews.com/verify`;

  return (
    <section className="py-16 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200 flex items-center justify-center">
            <i className="ri-spy-line text-rose-600 text-base"></i>
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-xl tracking-tight">
            Proven Fake COAs
          </h2>
          <span className="ml-1 text-xs font-mono bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">
            {rows.length} caught
          </span>
        </div>
        <p className="text-sm text-slate-500 mb-6 ml-11">
          Every document our AI flagged as tampered. Share to Reddit to warn the community.
        </p>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <th className="text-left px-4 py-3">Company / Lab</th>
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-left px-4 py-3">Finding</th>
                <th className="text-left px-4 py-3">Confidence</th>
                <th className="text-left px-4 py-3">Caught</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr
                  key={r.id}
                  className={`border-b border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                >
                  <td className="px-4 py-3 font-semibold text-slate-800">
                    {r.company ?? <span className="text-slate-400 font-normal">Unknown</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {r.product ?? <span className="text-slate-400">-</span>}
                  </td>
                  <td className="px-4 py-3 text-slate-600 max-w-xs truncate" title={r.headline ?? ''}>
                    {r.headline ?? r.verdict}
                  </td>
                  <td className="px-4 py-3">
                    {r.confidence != null ? (
                      <span className="font-mono text-rose-600 font-semibold">{r.confidence}%</span>
                    ) : (
                      <span className="text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-xs font-mono whitespace-nowrap">
                    {timeAgo(r.created_at)}
                  </td>
                  <td className="px-4 py-3">
                    <a
                      href={`https://reddit.com/submit?title=${encodeURIComponent(redditText(r))}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-orange-600 hover:text-orange-700 whitespace-nowrap flex items-center gap-1"
                    >
                      <i className="ri-reddit-line"></i> Reddit
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
