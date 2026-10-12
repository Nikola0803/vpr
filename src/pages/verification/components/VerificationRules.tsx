import { verificationRequired, verificationRejected } from '@/mocks/verification';

export default function VerificationRules() {
  return (
    <section className="relative py-24 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">
            What has to be true
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
            Required to publish. Forbidden, always.
          </h2>
          <p className="mt-5 text-slate-600">
            The left column is what every single review must clear. The right is the list of things we will never allow,
            no matter who asks.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Required */}
          <div className="glass rounded-2xl p-7 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500/10 border border-emerald-500/25">
                <i className="ri-check-double-line text-lg text-emerald-600"></i>
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-emerald-600">Required</div>
                <h3 className="font-display font-bold text-slate-900 text-lg">Every published review</h3>
              </div>
            </div>
            <ul className="space-y-3">
              {verificationRequired.map((r) => (
                <li
                  key={r.label}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                >
                  <span className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-white border border-slate-200">
                    <i className={`${r.icon} text-base text-emerald-600`}></i>
                  </span>
                  <span className="text-sm text-slate-700">{r.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Rejected */}
          <div className="glass rounded-2xl p-7 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-rose-500/10 border border-rose-500/25">
                <i className="ri-forbid-2-line text-lg text-rose-600"></i>
              </div>
              <div>
                <div className="text-[11px] font-mono uppercase tracking-[0.16em] text-rose-600">Never allowed</div>
                <h3 className="font-display font-bold text-slate-900 text-lg">Rejected, in every case</h3>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {verificationRejected.map((r) => (
                <div key={r.title} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <div className="w-9 h-9 flex items-center justify-center rounded-lg bg-white border border-slate-200">
                    <i className={`${r.icon} text-base text-rose-600`}></i>
                  </div>
                  <div className="mt-3 text-sm font-semibold text-slate-900 leading-snug">{r.title}</div>
                  <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}