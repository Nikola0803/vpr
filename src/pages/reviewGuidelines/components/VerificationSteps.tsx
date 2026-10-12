import { verificationSteps } from '@/mocks/reviewGuidelines';

export default function VerificationSteps() {
  return (
    <section className="relative py-24 border-t border-slate-200 bg-gradient-to-b from-transparent to-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">
            How a review gets verified
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
            Four checks before a review earns the badge.
          </h2>
          <p className="mt-5 text-slate-600">
            Unverified reviews skip straight to moderation. To carry the Verified Buyer badge, a review clears all four
            of these gates — fail one, and the badge is refused.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {verificationSteps.map((s, i) => (
            <div key={s.title} className="glass rounded-2xl p-6 glass-hover">
              <div className="flex items-center justify-between">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-gradient-to-br from-teal-500/20 to-emerald-500/10 border border-teal-500/25">
                  <i className={`${s.icon} text-lg text-teal-700`}></i>
                </div>
                <span className="text-[11px] font-mono uppercase tracking-widest text-slate-300">
                  0{i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display font-bold text-slate-900 text-base leading-snug">{s.title}</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}