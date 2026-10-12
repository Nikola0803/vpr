import { useState } from 'react';
import { Link } from 'react-router-dom';
import BillingToggle, { type BillingCycle } from '@/components/base/BillingToggle';
import { migrationFees, migrationPricingNotes, getMigrationFee } from '@/mocks/migration';
import { tiers } from '@/mocks/pricing';

const SLIDER_MIN = 1;
const SLIDER_MAX = 5000;

export default function MigrationPricing() {
  const [billing, setBilling] = useState<BillingCycle>('yearly');
  const [reviewCount, setReviewCount] = useState(120);

  const clampCount = (value: number) => {
    if (!Number.isFinite(value)) return SLIDER_MIN;
    return Math.min(SLIDER_MAX, Math.max(SLIDER_MIN, Math.floor(value)));
  };

  const activeFee = getMigrationFee(reviewCount);

  const scrollToRequest = () => {
    requestAnimationFrame(() => {
      const el = document.getElementById('request');
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <section id="pricing" className="relative py-24 border-t border-slate-200 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* One-time fee */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">
            Review Migration pricing
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
            One-time rescue fee. Nothing hidden.
          </h2>
          <p className="mt-5 text-slate-600">
            Migration is a flat, one-time payment based on how many reviews we are rescuing. No subscription required to
            move your history, and free technical setup is always included.
          </p>
        </div>

        {/* Live estimate control */}
        <div className="mb-8 rounded-2xl border border-slate-200 bg-slate-50 p-6 md:p-7">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-5">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-2">
                Estimate your fee
              </div>
              <div className="font-display font-bold text-slate-900 text-lg leading-snug">
                How many reviews are you rescuing?
              </div>
              <p className="mt-1.5 text-xs text-slate-500">
                Drag the slider or type your archive size, the matching tier lights up automatically.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={SLIDER_MIN}
                  max={SLIDER_MAX}
                  step={1}
                  value={reviewCount}
                  aria-label="Number of reviews to migrate"
                  onChange={(e) => setReviewCount(clampCount(Number(e.target.value)))}
                  className="flex-1 accent-teal-600 cursor-pointer"
                />
                <input
                  type="number"
                  min={SLIDER_MIN}
                  max={SLIDER_MAX}
                  value={reviewCount}
                  aria-label="Number of reviews to migrate"
                  onChange={(e) => setReviewCount(clampCount(Number(e.target.value)))}
                  className="w-24 shrink-0 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                />
              </div>
              <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                <span className="inline-flex items-center gap-2 rounded-full bg-teal-600 text-white px-3.5 py-1.5 text-xs font-semibold whitespace-nowrap">
                  <i className="ri-price-tag-3-line"></i>
                  Estimated rescue fee: ${activeFee.price}
                </span>
                <span className="text-xs text-slate-600">
                  for {reviewCount.toLocaleString()} reviews &middot; {activeFee.range}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {migrationFees.map((f, i) => {
            const highlight = i === migrationFees.length - 1;
            const active = f.range === activeFee.range;
            return (
              <Link
                key={f.range}
                to={`/migration?range=${encodeURIComponent(f.range)}#request`}
                onClick={scrollToRequest}
                aria-label={`Choose the ${f.range} tier, $${f.price} one-time`}
                className={`relative rounded-2xl p-6 flex flex-col cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 ${
                  active
                    ? 'border border-teal-500 ring-2 ring-teal-200'
                    : highlight
                      ? 'border border-teal-300 ring-1 ring-teal-200'
                      : 'border border-slate-200'
                } bg-white`}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-teal-600 text-white text-[10px] font-mono uppercase tracking-widest">
                    Best value
                  </div>
                )}
                <div className="flex items-start justify-between gap-2">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-teal-50 border border-teal-200">
                    <i className={`${f.icon} text-xl text-teal-700`}></i>
                  </div>
                  <span
                    className={`shrink-0 text-[9px] font-mono uppercase tracking-widest px-2 py-1 rounded-full border transition-colors ${
                      active ? 'bg-teal-600 border-teal-600 text-white' : 'bg-teal-50 border-teal-200 text-teal-700'
                    }`}
                  >
                    Est. rescue fee
                  </span>
                </div>
                <div className="mt-5 font-display font-extrabold text-slate-900 text-4xl">${f.price}</div>
                <div className="mt-1 text-xs font-mono uppercase tracking-wider text-teal-700">one-time payment</div>
                <div className="mt-4 text-sm font-semibold text-slate-900">{f.range}</div>
                <p className="mt-1.5 text-xs text-slate-500 leading-relaxed flex-1">{f.note}</p>
                {active && (
                  <div className="mt-4 inline-flex w-fit items-center gap-1.5 text-[11px] font-mono text-teal-700 bg-teal-50 border border-teal-200 rounded-full px-2.5 py-1">
                    <i className="ri-focus-3-line"></i>
                    Your estimate &middot; {reviewCount.toLocaleString()} reviews
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
          {migrationPricingNotes.map((n) => (
            <span key={n} className="flex items-center gap-2 text-xs text-slate-600">
              <i className="ri-checkbox-circle-fill text-teal-600"></i>
              {n}
            </span>
          ))}
        </div>

        {/* Ongoing plans */}
        <div className="mt-20 border-t border-slate-200 pt-16">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
            <div className="max-w-2xl">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">
                Keep it running
              </div>
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
                Want new reviews collected automatically?
              </h2>
              <p className="mt-4 text-slate-600 text-sm">
                Add a plan for the automated order-success emails, verified collection and on-site display. Flip to
                yearly and the price drops hard.
              </p>
            </div>
            <div className="self-start lg:self-auto">
              <BillingToggle value={billing} onChange={setBilling} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {tiers.map((t) => {
              const price = billing === 'monthly' ? t.monthly : t.yearly;
              const save = Math.round((1 - t.yearly / t.monthly) * 100);
              return (
                <div
                  key={t.id}
                  className={`relative rounded-2xl p-6 flex flex-col bg-white transition-all duration-300 ease-out hover:-translate-y-1 ${
                    t.popular ? 'border border-teal-300 ring-1 ring-teal-200' : 'border border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="font-display font-extrabold text-slate-900 text-xl">{t.name}</div>
                    {t.popular && (
                      <span className="px-2.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-[10px] font-mono uppercase tracking-widest text-teal-700">
                        Popular
                      </span>
                    )}
                  </div>
                  <div className="mt-4 flex items-end gap-1">
                    <span className="font-display font-extrabold text-slate-900 text-3xl">${price}</span>
                    <span className="text-slate-500 text-sm mb-1">/mo</span>
                  </div>
                  <div className="mt-1.5 text-xs text-slate-500">
                    {billing === 'monthly'
                      ? 'Billed monthly'
                      : `Billed $${(t.yearly * 12).toLocaleString()}/yr`}
                  </div>
                  {billing === 'yearly' && (
                    <div className="mt-2 inline-flex w-fit items-center gap-1 text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                      <i className="ri-arrow-down-line"></i>Save {save}%
                    </div>
                  )}
                  <ul className="mt-5 space-y-2 flex-1">
                    {t.features.slice(0, 5).map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-slate-600">
                        <i className="ri-check-line text-teal-600 mt-0.5"></i>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/register"
                    className={`mt-6 whitespace-nowrap w-full text-center px-5 py-2.5 rounded-md text-sm font-semibold transition-colors border ${
                      t.popular
                        ? 'bg-teal-600 text-white border-teal-600 hover:bg-teal-700'
                        : 'text-slate-800 border-slate-200 hover:border-teal-400 hover:bg-teal-50'
                    }`}
                  >
                    Choose {t.name}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              to="/migration#request"
              className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center gap-2"
            >
              <i className="ri-archive-drawer-line"></i>
              Start my migration
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}