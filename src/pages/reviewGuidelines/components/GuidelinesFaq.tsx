import { useState } from 'react';
import { guidelinesFaq } from '@/mocks/reviewGuidelines';

export default function GuidelinesFaq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-24 border-t border-slate-200 bg-gradient-to-b from-transparent to-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">
            Straight answers
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
            The questions everyone asks.
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {guidelinesFaq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className="glass rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-slate-900 text-base">{f.q}</span>
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