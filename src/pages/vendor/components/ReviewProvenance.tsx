import { Link } from 'react-router-dom';

const sources = ['Storefront', 'Google', 'Trustpilot', 'Reddit', 'Forums', 'This platform'];

export default function ReviewProvenance() {
  return (
    <section className="relative pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="glass rounded-2xl p-6 md:p-7">
          <div className="flex flex-col lg:flex-row lg:items-center gap-6">
            <div className="flex items-start gap-4 flex-1">
              <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/30 flex items-center justify-center">
                <i className="ri-git-merge-line text-xl text-cyan-700"></i>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-display font-bold text-slate-900 text-lg tracking-tight">
                    One unified review stream
                  </span>
                  <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-teal-600/10 text-teal-700 border border-teal-600/25">
                    De-duplicated
                  </span>
                </div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed max-w-3xl">
                  These reviews are gathered from every platform this company sells and is discussed on - its own
                  storefront, Google, Trustpilot, Reddit and industry forums - then merged into a single, trustworthy
                  record by our review-migration engine. Each entry is matched to one real, unique buyer, so no customer
                  is ever counted twice and nothing synthetic ever makes it through.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {sources.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-600"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:w-64 shrink-0 lg:border-l lg:border-slate-200 lg:pl-6 space-y-2.5">
              {[
                { i: 'ri-user-star-line', t: 'Unique buyers only' },
                { i: 'ri-fingerprint-line', t: 'Order-linked & sealed' },
                { i: 'ri-scales-3-line', t: 'No repeats, no bot posts' },
              ].map((r) => (
                <div key={r.t} className="flex items-center gap-2.5 text-xs text-slate-700">
                  <i className={`${r.i} text-teal-600`}></i>
                  {r.t}
                </div>
              ))}
              <Link
                to="/migration"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-700 hover:text-cyan-800 pt-1 whitespace-nowrap"
              >
                How review migration works <i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}