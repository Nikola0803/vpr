import { seoTestimonials } from '@/mocks/seo';

export default function SeoTestimonials() {
  return (
    <section className="relative py-24 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="max-w-2xl mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">From Vendors</div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
            They stopped losing reviews. Here&apos;s what they say.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {seoTestimonials.map((t) => (
            <figure key={t.name} className="glass glass-hover rounded-2xl p-7 flex flex-col">
              <div className="flex items-center gap-1 text-cyan-600 mb-5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <i key={i} className="ri-star-fill text-sm"></i>
                ))}
              </div>
              <blockquote className="text-sm text-slate-700 leading-relaxed flex-1">“{t.quote}”</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-slate-200 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-slate-900 text-sm bg-gradient-to-br from-cyan-500/80 to-teal-500/80">
                  {t.init}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-500">{t.role}</div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}