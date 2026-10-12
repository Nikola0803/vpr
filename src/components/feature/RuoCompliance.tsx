import { ruoIntro, ruoActions, ruoGuarantees, ruoStats, ruoChips } from '@/mocks/compliance';

const toneStyles: Record<string, { ring: string; icon: string }> = {
  rose: { ring: 'bg-rose-500/10 border-rose-500/25', icon: 'text-rose-600' },
  amber: { ring: 'bg-amber-500/10 border-amber-500/25', icon: 'text-amber-600' },
  cyan: { ring: 'bg-cyan-500/10 border-cyan-500/25', icon: 'text-cyan-700' },
  emerald: { ring: 'bg-emerald-500/10 border-emerald-500/25', icon: 'text-emerald-600' },
};

export default function RuoCompliance({ variant = 'full' }: { variant?: 'full' | 'compact' }) {
  if (variant === 'compact') {
    return (
      <section className="relative py-16 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="relative glass rounded-2xl overflow-hidden p-6 md:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="absolute -top-16 right-10 w-64 h-40 rounded-full bg-teal-500/10 blur-3xl"></div>
            <div className="relative flex items-start gap-4 max-w-3xl">
              <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-teal-500/20 to-emerald-500/10 border border-teal-500/25">
                <i className="ri-shield-star-line text-xl text-teal-700"></i>
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-1.5">
                  {ruoIntro.eyebrow}
                </div>
                <h3 className="font-display font-extrabold text-slate-900 text-xl md:text-2xl tracking-tight">
                  Research Use Only. No exceptions.
                </h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{ruoIntro.short}</p>
              </div>
            </div>
            <div className="relative flex flex-wrap gap-2 shrink-0">
              {ruoChips.map((c) => (
                <span
                  key={c}
                  className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 whitespace-nowrap"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-24 border-t border-slate-200 bg-gradient-to-b from-transparent to-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="relative glass rounded-3xl overflow-hidden p-8 md:p-12">
          <div className="absolute inset-0 grid-bg opacity-30"></div>
          <div className="absolute -top-24 right-0 w-[420px] h-[320px] rounded-full bg-teal-500/10 blur-3xl"></div>
          <div className="absolute -bottom-24 left-0 w-[380px] h-[300px] rounded-full bg-emerald-500/10 blur-3xl"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">
                {ruoIntro.eyebrow}
              </div>
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
                {ruoIntro.title}
                <span className="block text-gradient-cyan mt-2">{ruoIntro.titleAccent}</span>
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed">{ruoIntro.lead}</p>

              <ul className="mt-8 space-y-3">
                {ruoGuarantees.map((g) => (
                  <li key={g} className="flex items-start gap-3">
                    <span className="w-6 h-6 mt-0.5 shrink-0 flex items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-500/25">
                      <i className="ri-check-line text-xs text-emerald-600"></i>
                    </span>
                    <span className="text-sm text-slate-700 leading-relaxed">{g}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ruoActions.map((a, i) => {
                  const tone = toneStyles[a.tone];
                  return (
                    <div key={a.title} className="rounded-2xl bg-white border border-slate-200 p-6 glass-hover">
                      <div className="flex items-center justify-between">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${tone.ring}`}>
                          <i className={`${a.icon} text-lg ${tone.icon}`}></i>
                        </div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">
                          0{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-5 font-display font-bold text-slate-900 text-base leading-snug">{a.title}</h3>
                      <p className="mt-2 text-sm text-slate-600 leading-relaxed">{a.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="relative mt-8 pt-8 border-t border-slate-200 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {ruoStats.map((s) => (
              <div key={s.label} className="rounded-2xl bg-white border border-slate-200 p-5">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-slate-100">
                  <i className={`${s.icon} text-lg text-teal-700`}></i>
                </div>
                <div className="mt-3 font-display font-extrabold text-lg text-slate-900 tracking-tight">{s.value}</div>
                <div className="mt-1 text-[11px] text-slate-500 leading-relaxed">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}