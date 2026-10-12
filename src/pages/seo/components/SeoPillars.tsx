import { seoPillars } from '@/mocks/seo';

export default function SeoPillars() {
  return (
    <section className="relative py-24 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">
            Built-in SEO engine
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
            Six ways reviews compound your rankings.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {seoPillars.map((p) => (
            <div key={p.title} className="glass glass-hover rounded-2xl p-6 flex flex-col">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-teal-500/20 border border-cyan-500/25">
                <i className={`${p.icon} text-xl text-cyan-700`}></i>
              </div>
              <h3 className="mt-5 font-display font-bold text-slate-900 text-lg tracking-tight">{p.title}</h3>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed flex-1">{p.desc}</p>
              <div className="mt-5 pt-4 border-t border-slate-200">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-teal-600 px-2 py-1 rounded bg-teal-500/10 border border-teal-500/20">
                  {p.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}