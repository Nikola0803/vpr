import { sourcePlatforms, whatMigrates } from '@/mocks/migration';

export default function SourcePlatforms() {
  return (
    <section className="relative py-24 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">
            Where we migrate from
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
            Bring history in from anywhere.
          </h2>
          <p className="mt-5 text-slate-600">
            Connect a supported platform in one click, or hand us an export from any other source. We handle the messy
            parts so nothing gets left behind.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sourcePlatforms.map((p) => (
            <div key={p.name} className="glass glass-hover rounded-2xl p-5 flex flex-col items-start">
              <div className="w-11 h-11 rounded-xl glass flex items-center justify-center">
                <i className={`${p.icon} text-xl text-teal-700`}></i>
              </div>
              <div className="mt-4 text-sm font-semibold text-slate-900">{p.name}</div>
              <div className="mt-1 text-xs text-slate-500 leading-relaxed">{p.note}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 glass rounded-2xl p-8">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="lg:max-w-xs shrink-0">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-teal-600 mb-2">
                What comes across
              </div>
              <h3 className="font-display font-bold text-slate-900 text-xl leading-snug">
                Every detail preserved, nothing recreated.
              </h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                We migrate the full review object so your archive is a faithful copy, not a re-typed approximation.
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
              {whatMigrates.map((w) => (
                <div key={w.label} className="rounded-xl bg-slate-50 border border-slate-200 p-4">
                  <div className="w-8 h-8 flex items-center justify-center rounded-lg bg-white border border-slate-200">
                    <i className={`${w.icon} text-base text-teal-700`}></i>
                  </div>
                  <div className="mt-3 text-xs font-medium text-slate-700 leading-snug">{w.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}