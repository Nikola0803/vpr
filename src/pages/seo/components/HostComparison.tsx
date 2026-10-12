import { hostComparison } from '@/mocks/seo';

export default function HostComparison() {
  return (
    <section className="relative py-24 border-t border-slate-200 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">
            {hostComparison.eyebrow}
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
            {hostComparison.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="glass rounded-2xl p-8 border-slate-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
                <i className="ri-cloud-line text-xl text-slate-600"></i>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-slate-500">
                Reviews.io &amp; Trustpilot
              </div>
            </div>
            <p className="text-slate-600 leading-relaxed">{hostComparison.them}</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-amber-600">
              <i className="ri-arrow-right-down-line"></i>
              SEO benefit leaves your domain
            </div>
          </div>

          <div className="relative glass rounded-2xl p-8 border-cyan-500/40">
            <div className="absolute -top-3 left-8 px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-900 text-[10px] font-mono uppercase tracking-widest">
              Verified Peptide Reviews
            </div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-500 flex items-center justify-center">
                <i className="ri-shield-check-line text-xl text-slate-900"></i>
              </div>
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-cyan-700">Self-hosted reviews</div>
            </div>
            <p className="text-slate-800 leading-relaxed">{hostComparison.us}</p>
            <div className="mt-6 flex items-center gap-2 text-xs font-mono text-emerald-600">
              <i className="ri-check-double-line"></i>
              SEO value stays with you
            </div>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-5">
          {hostComparison.points.map((p) => (
            <div key={p.title} className="glass glass-hover rounded-2xl p-6 flex gap-4">
              <div className="w-11 h-11 rounded-xl glass flex items-center justify-center shrink-0">
                <i className={`${p.icon} text-lg text-teal-700`}></i>
              </div>
              <div>
                <div className="font-semibold text-slate-900 text-sm">{p.title}</div>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}