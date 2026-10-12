import { migrationSteps } from '@/mocks/migration';

export default function MigrationSteps() {
  return (
    <section className="relative py-24 border-t border-slate-200 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">
            How migration works
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
            Four steps from fragile to un-deletable.
          </h2>
          <p className="mt-5 text-slate-600">
            No exports to wrangle, no downtime, and your live storefront never notices a thing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
          {migrationSteps.map((s) => (
            <div key={s.n} className="relative glass glass-hover rounded-2xl p-6 flex flex-col">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-500/25">
                  <i className={`${s.icon} text-xl text-teal-700`}></i>
                </div>
                <span className="font-mono text-2xl font-bold text-slate-200">{s.n}</span>
              </div>
              <h3 className="mt-5 font-display font-bold text-slate-900 text-base leading-snug">{s.title}</h3>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed flex-1">{s.desc}</p>
              <div className="mt-5 pt-4 border-t border-slate-200">
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-teal-600 px-2 py-1 rounded bg-teal-500/10 border border-teal-500/20">
                  {s.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}