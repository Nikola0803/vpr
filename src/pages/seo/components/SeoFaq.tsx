import { useState } from 'react';
import { seoFaqs } from '@/mocks/seo';

export default function SeoFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 border-t border-slate-200">
      <div className="max-w-[900px] mx-auto px-6 md:px-10">
        <div className="text-center mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">FAQ</div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
            Frequently asked questions
          </h2>
        </div>

        <div className="space-y-3">
          {seoFaqs.map((f, i) => (
            <div key={f.q} className="glass rounded-xl overflow-hidden glass-hover">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-sm font-semibold text-slate-900">{f.q}</span>
                <i
                  className={`ri-add-line text-cyan-600 text-lg transition-transform duration-300 ${
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