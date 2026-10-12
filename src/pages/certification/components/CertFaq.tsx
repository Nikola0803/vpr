import { useState } from 'react';
import { certFaqs } from '@/mocks/certifications';

export default function CertFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-20 border-t border-slate-200 bg-slate-50">
      <div className="max-w-[900px] mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">Certification FAQ</div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
            The questions that keep it honest.
          </h2>
        </div>
        <div className="space-y-3">
          {certFaqs.map((f, i) => (
            <div key={f.q} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-sm font-semibold text-slate-900">{f.q}</span>
                <i
                  className={`ri-add-line text-teal-600 text-lg transition-transform duration-300 ${
                    open === i ? 'rotate-45' : ''
                  }`}
                ></i>
              </button>
              {open === i && (
                <div className="px-6 pb-5 -mt-1">
                  <p className="text-sm text-slate-600 leading-relaxed">{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}