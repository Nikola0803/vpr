import { supportPoints } from '@/mocks/migration';

export default function SupportIncluded() {
  return (
    <section className="relative py-24 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="relative glass rounded-3xl overflow-hidden p-8 md:p-12">
          <div className="absolute inset-0 grid-bg opacity-30"></div>
          <div className="absolute -top-24 right-0 w-[420px] h-[320px] rounded-full bg-teal-500/10 blur-3xl"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-4">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-600 mb-3">
                Support included
              </div>
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight leading-[1.12]">
                Free technical support with every package.
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed">
                Migration and integration should not be a project you have to staff. Every plan ships with hands-on help
                to get your reviews verified, displayed and indexed, at no extra cost.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {supportPoints.map((s) => (
                <div key={s.title} className="rounded-2xl bg-white border border-slate-200 p-6">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-teal-500/20 to-emerald-500/10 border border-teal-500/25">
                    <i className={`${s.icon} text-lg text-teal-700`}></i>
                  </div>
                  <h3 className="mt-4 font-display font-bold text-slate-900 text-base leading-snug">{s.title}</h3>
                  <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}