import { detectChecks } from '@/mocks/coaVerifier';

export default function WhatWeDetect() {
  return (
    <section className="relative py-24 border-t border-slate-200 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-3xl mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">
            What COA Verifier looks for
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
            The fingerprints of a faked certificate.
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Fabricated lab documents almost always leave a trace. Our engine runs the same seven forensic passes an
            experienced examiner would - then explains every finding in plain language.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {detectChecks.map((c) => (
            <div key={c.title} className="glass rounded-2xl p-6 glass-hover">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/30 flex items-center justify-center">
                <i className={`${c.icon} text-xl text-cyan-700`}></i>
              </div>
              <h3 className="mt-5 font-display font-bold text-slate-900 text-base leading-snug">{c.title}</h3>
              <p className="mt-2.5 text-sm text-slate-500 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}