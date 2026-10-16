import { rejectionRules } from '@/mocks/reviewGuidelines';

export default function RejectionRules() {
  return (
    <section className="relative py-24 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-rose-600 mb-3">
            Rejected automatically
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
            What never makes it through.
          </h2>
          <p className="mt-5 text-slate-600">
            Every submission is moderated by a human before it publishes. These specific cases fail on sight - no partial
            credit, no exceptions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rejectionRules.map((r) => (
            <div key={r.title} className="glass rounded-2xl p-6 glass-hover flex items-start gap-4">
              <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center bg-rose-500/10 border border-rose-500/25">
                <i className={`${r.icon} text-lg text-rose-600`}></i>
              </div>
              <div>
                <h3 className="font-display font-bold text-slate-900 text-base leading-snug">{r.title}</h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{r.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}