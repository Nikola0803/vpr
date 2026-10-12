import { threatPoints } from '@/mocks/migration';

export default function ThreatSection() {
  return (
    <section className="relative py-24 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-amber-600 mb-3">
              The risk you are running today
            </div>
            <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
              Reviews you do not host are reviews you do not own.
            </h2>
            <p className="mt-6 text-slate-600 leading-relaxed">
              Every review sitting on Trustpilot, Reviews.io, Google or Facebook is one policy change away from
              disappearing. When a hosted platform decides a review comes down, you lose the proof, the ranking, and the
              trust, permanently. Migration moves that history somewhere no one else controls.
            </p>

            <div className="mt-8 glass rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center">
                  <i className="ri-alert-line text-xl text-amber-600"></i>
                </div>
                <div className="text-sm font-semibold text-slate-900">Removal is irreversible</div>
              </div>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                Hosted platforms rarely offer a restore path or export guarantee. If a review is deleted before it is
                migrated, it is gone for good, no appeal, no backup.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {threatPoints.map((p) => (
              <div key={p.title} className="glass glass-hover rounded-2xl p-6 flex flex-col">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-amber-500/15 to-rose-500/10 border border-amber-500/25">
                  <i className={`${p.icon} text-xl text-amber-700`}></i>
                </div>
                <h3 className="mt-5 font-display font-bold text-slate-900 text-base leading-snug">{p.title}</h3>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed flex-1">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}