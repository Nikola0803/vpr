import { useState } from 'react';
import { verifierFaqs } from '@/mocks/coaVerifier';

export default function VerifierFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 border-t border-slate-200 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-4">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">Questions</div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight leading-[1.1]">
            COA Verifier, answered.
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Everything you need to know before you upload a certificate — including exactly what this tool can and cannot
            promise.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-3">
          {verifierFaqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-slate-900">{f.q}</span>
                  <i
                    className={`${isOpen ? 'ri-subtract-line' : 'ri-add-line'} text-teal-700 text-lg shrink-0`}
                  ></i>
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 -mt-1">
                    <p className="text-sm text-slate-600 leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}