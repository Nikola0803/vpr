import { Link } from 'react-router-dom';
import { tiers, moneyBack } from '@/mocks/pricing';

export default function SeoPricing() {
  return (
    <section className="relative py-24 border-t border-slate-200 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-6">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">Pricing</div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
            Simple pricing. No surprises.
          </h2>
          <p className="mt-5 text-slate-600 leading-relaxed">
            Every plan includes compliance screening and verified purchase badges. No contracts. Cancel any time.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-mono">
            <i className="ri-price-tag-3-line text-emerald-600"></i>
            <span className="text-slate-700">Save up to 60% with yearly billing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
          {tiers.map((t) => (
            <div
              key={t.id}
              className={`relative glass rounded-2xl p-7 flex flex-col transition-all duration-275 ease-out hover:-translate-y-1 ${
                t.popular
                  ? 'border-cyan-500/50 ring-1 ring-teal-500/40 md:-mt-4 md:mb-4'
                  : 'glass-hover'
              }`}
            >
              {t.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-900 text-[10px] font-mono uppercase tracking-widest">
                  Most popular
                </div>
              )}
              <div className="font-display font-extrabold text-slate-900 text-2xl">{t.name}</div>

              <div className="mt-5 flex items-end gap-2">
                <span className="font-display font-extrabold text-slate-900 text-4xl">${t.monthly}</span>
                <span className="text-slate-500 text-sm mb-1.5">/mo</span>
              </div>
              <div className="mt-2 text-xs text-slate-500">
                or <span className="text-emerald-700 font-semibold">${t.yearly}/mo</span> billed yearly
              </div>

              <p className="mt-5 text-sm text-slate-600 leading-relaxed min-h-[60px]">{t.desc}</p>

              <Link
                to="/register"
                className={`mt-6 whitespace-nowrap w-full text-center px-5 py-3 rounded-md text-sm font-semibold transition-all border ${
                  t.popular
                    ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-slate-900 border-cyan-400/30'
                    : 'text-slate-800 border-slate-200 hover:border-cyan-500/40 hover:bg-cyan-500/5'
                }`}
              >
                {t.cta}
              </Link>

              <div className="mt-7 pt-5 border-t border-slate-200 space-y-3 flex-1">
                {t.features.map((f) => (
                  <div key={f} className="flex items-start gap-2.5">
                    <i className="ri-checkbox-circle-fill text-cyan-600 text-sm mt-0.5"></i>
                    <span className="text-sm text-slate-700 leading-snug">{f}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-slate-600 font-mono">
          <i className="ri-shield-star-line text-emerald-600"></i>
          {moneyBack}
        </div>
      </div>
    </section>
  );
}