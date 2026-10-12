import { howItWorksSteps } from '@/mocks/coaVerifier';

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 border-t border-slate-200 scroll-mt-20">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">How it works</div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
            Three steps. Under twenty seconds.
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            No account, no card, no install. Drop a document in, add your email once, and read the report.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {howItWorksSteps.map((s, i) => (
            <div key={s.step} className="relative glass rounded-2xl p-7">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <i className={`${s.icon} text-2xl text-cyan-700`}></i>
                </div>
                <span className="font-display font-extrabold text-4xl text-slate-100 leading-none">{s.step}</span>
              </div>
              <h3 className="mt-6 font-display font-bold text-slate-900 text-lg leading-snug">{s.title}</h3>
              <p className="mt-2.5 text-sm text-slate-500 leading-relaxed">{s.desc}</p>
              {i < howItWorksSteps.length - 1 && (
                <i className="hidden lg:flex ri-arrow-right-line absolute top-1/2 -right-3.5 -translate-y-1/2 text-slate-300"></i>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}