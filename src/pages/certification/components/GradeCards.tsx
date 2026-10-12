import { gradeMeta, gradeOrder } from '@/mocks/certifications';
import CertificationSeal from '@/components/feature/CertificationSeal';

export default function GradeCards() {
  return (
    <section className="relative py-20 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">The two grades</div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
            What each seal actually proves.
          </h2>
          <p className="mt-4 text-slate-600 text-sm leading-relaxed">
            There is no mystery tier and no fine print. Each grade maps to a fixed, checkable standard, and the top grade
            can only be reached by clearing the one below it first.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {gradeOrder.map((key, idx) => {
            const g = gradeMeta[key];
            return (
              <div
                key={g.key}
                className={`rounded-2xl border p-7 md:p-8 flex flex-col ${
                  idx === 0 ? 'border-emerald-200 bg-emerald-50/40' : 'border-slate-200 bg-white'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <CertificationSeal grade={g.key} size="lg" />
                  <span
                    className={`text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full border whitespace-nowrap ${
                      idx === 0
                        ? 'border-amber-300/70 bg-amber-50 text-amber-700'
                        : 'border-slate-200 bg-slate-50 text-slate-500'
                    }`}
                  >
                    {idx === 0 ? 'Top grade' : 'Baseline'}
                  </span>
                </div>

                <div className="mt-5 font-display font-bold text-slate-900 text-lg">{g.tagline}</div>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{g.blurb}</p>

                <div className="mt-6 pt-5 border-t border-slate-200/80">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3">
                    Requirements
                  </div>
                  <ul className="space-y-2.5">
                    {g.criteria.map((c) => (
                      <li key={c} className="flex items-start gap-2.5">
                        <i className="ri-checkbox-circle-fill text-teal-600 text-sm mt-0.5"></i>
                        <span className="text-sm text-slate-700 leading-snug">{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 rounded-xl bg-slate-900/[0.03] border border-slate-200 px-4 py-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">
                    In one line
                  </div>
                  <div className="text-sm text-slate-800">{g.proves}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}