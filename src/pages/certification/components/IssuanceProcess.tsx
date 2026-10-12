import { issuanceSteps } from '@/mocks/certifications';

export default function IssuanceProcess() {
  return (
    <section className="relative py-20 border-t border-slate-200 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">How a seal is issued</div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
            Earned on our side, not claimed on theirs.
          </h2>
          <p className="mt-4 text-slate-600 text-sm leading-relaxed">
            A certificate of analysis is not a badge you can upload and forget about. It runs through four gates before a
            seal exists, and it can be pulled at any gate after.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {issuanceSteps.map((s, i) => (
            <div key={s.title} className="relative bg-white rounded-2xl border border-slate-200 p-6">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 flex items-center justify-center rounded-xl bg-teal-50 border border-teal-100 text-teal-600">
                  <i className={`${s.icon} text-lg`}></i>
                </span>
                <span className="font-mono text-xs text-slate-400">Step {i + 1}</span>
              </div>
              <div className="mt-4 font-display font-bold text-slate-900 text-base leading-snug">{s.title}</div>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4">
          <i className="ri-alert-line text-amber-600 mt-0.5"></i>
          <p className="text-sm text-amber-900 leading-relaxed">
            If a certificate later fails, expires or is disputed, the seal is suspended or revoked and removed from the
            public registry. The mark is never quietly reinstated once it has been pulled.
          </p>
        </div>
      </div>
    </section>
  );
}