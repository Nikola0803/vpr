import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import BillingToggle, { type BillingCycle } from '@/components/base/BillingToggle';
import PricingRequestForm from '@/pages/pricing/components/PricingRequestForm';
import { tiers, overagePacks, comparisonGroups, pricingFaqs, roiStats, moneyBack } from '@/mocks/pricing';

function Cell({ value }: { value: string | boolean }) {
  if (value === true) return <i className="ri-check-line text-emerald-600 text-lg"></i>;
  if (value === false) return <i className="ri-subtract-line text-slate-400"></i>;
  return <span className="text-slate-800 text-sm">{value}</span>;
}

export default function Pricing() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const [selectedPlan, setSelectedPlan] = useState('');
  const requestRef = useRef<HTMLElement>(null);

  const scrollToRequest = (plan?: string) => {
    if (plan) setSelectedPlan(plan);
    requestRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />

      {/* HEADER */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        <div className="absolute inset-0 radial-glow"></div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium mb-6">
            <i className="ri-scales-3-line text-cyan-600"></i>
            <span className="text-slate-700">Every plan includes compliance screening and verified purchase badges</span>
          </div>
          <h1 className="font-display font-extrabold text-slate-900 text-[38px] md:text-6xl leading-[1.08] tracking-tight max-w-4xl mx-auto">
            Simple pricing.
            <span className="text-gradient-cyan"> No surprises.</span>
          </h1>
          <p className="mt-6 text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Request the plan that fits and our team sends you a secure payment link by email, no card needed up front.
            Star ratings, schema markup, and compliant review hosting are baked into every tier.
          </p>

          <div className="mt-8 flex justify-center">
            <BillingToggle value={billing} onChange={setBilling} />
          </div>
        </div>
      </section>

      {/* TIER CARDS */}
      <section className="relative pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
            {tiers.map((t) => {
              const isFree = t.monthly === 0;
              const price = billing === 'monthly' ? t.monthly : t.yearly;
              const save = isFree ? 0 : Math.round((1 - t.yearly / t.monthly) * 100);
              return (
                <div
                  key={t.id}
                  className={`relative bg-white rounded-2xl p-7 flex flex-col transition-all duration-300 ease-out hover:-translate-y-1 ${
                    t.popular
                      ? 'border border-teal-300 ring-1 ring-teal-200 md:-mt-4 md:mb-4'
                      : 'border border-slate-200'
                  }`}
                >
                  {t.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-teal-600 text-white text-[10px] font-mono uppercase tracking-widest">
                      Most popular
                    </div>
                  )}
                  <div className="font-display font-extrabold text-slate-900 text-2xl">{t.name}</div>

                  <div className="mt-5 flex items-end gap-1">
                    <span className="font-display font-extrabold text-slate-900 text-4xl">{isFree ? 'Free' : `$${price}`}</span>
                    <span className="text-slate-500 text-sm mb-1.5">{isFree ? 'forever' : '/mo'}</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500">
                    {isFree
                      ? 'No card required · basic listing'
                      : billing === 'monthly'
                        ? 'Billed monthly, cancel anytime'
                        : `Billed $${(t.yearly * 12).toLocaleString()} once per year`}
                  </div>
                  {billing === 'yearly' && !isFree && (
                    <div className="mt-2 inline-flex w-fit items-center gap-1 text-xs font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-2.5 py-1">
                      <i className="ri-arrow-down-line"></i>Save {save}% vs monthly
                    </div>
                  )}

                  <p className="mt-5 text-sm text-slate-600 leading-relaxed min-h-[60px]">{t.desc}</p>

                  {isFree ? (
                    <Link
                      to="/claim"
                      className="mt-6 whitespace-nowrap w-full text-center px-5 py-3 rounded-md text-sm font-semibold transition-all border text-slate-800 border-slate-200 hover:border-teal-400 hover:bg-teal-50"
                    >
                      {t.cta}
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => scrollToRequest(t.name)}
                      className={`mt-6 whitespace-nowrap w-full text-center px-5 py-3 rounded-md text-sm font-semibold transition-all border ${
                        t.popular
                          ? 'bg-teal-600 text-white border-teal-600 hover:bg-teal-700'
                          : 'text-slate-800 border-slate-200 hover:border-teal-400 hover:bg-teal-50'
                      }`}
                    >
                      {t.cta}
                    </button>
                  )}

                  <div className="mt-7 pt-5 border-t border-slate-200 space-y-3 flex-1">
                    {t.features.map((f) => (
                      <div key={f} className="flex items-start gap-2.5">
                        <i className="ri-checkbox-circle-fill text-teal-600 text-sm mt-0.5"></i>
                        <span className="text-sm text-slate-700 leading-snug">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-slate-600 font-mono">
            <i className="ri-shield-star-line text-emerald-600"></i>
            <span>{moneyBack}</span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span>Yearly billing saves up to 33%</span>
          </div>
        </div>
      </section>

      {/* ROI STRIP */}
      <section className="relative py-16 border-y border-slate-200 bg-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-3 gap-5">
          {roiStats.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-slate-200 p-7">
              <div className="font-display font-extrabold text-4xl text-gradient-cyan">{s.value}</div>
              <div className="mt-2 text-sm font-semibold text-slate-900">{s.label}</div>
              <div className="mt-1 text-xs text-slate-500">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ADD-ONS */}
      <section className="relative py-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="max-w-2xl mb-12">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">
              Packs that grow with you
            </div>
            <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
              Add-ons &amp; one-time packs
            </h2>
            <p className="mt-4 text-slate-600 text-sm">
              Hit a busy month? Top up instantly instead of jumping a whole tier. Packs are one-time and never expire.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {overagePacks.map((p) => (
              <div key={p.name} className="bg-white rounded-2xl border border-slate-200 p-6 flex items-center justify-between">
                <div>
                  <div className="font-display font-bold text-slate-900 text-base">{p.name}</div>
                  <div className="mt-1 text-sm text-teal-700 font-mono">{p.qty}</div>
                  <div className="mt-1 text-xs text-slate-500">{p.note}</div>
                </div>
                <div className="text-right">
                  <div className="font-display font-extrabold text-slate-900 text-2xl">{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON MATRIX */}
      <section className="relative py-24 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">
              Feature comparison
            </div>
            <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
              Every detail, side by side.
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <div className="min-w-[900px]">
                <div className="grid grid-cols-5 px-6 py-5 border-b border-slate-200 bg-slate-50">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500">Feature</div>
                  {tiers.map((t) => (
                    <div
                      key={t.id}
                      className={`text-[11px] font-mono uppercase tracking-widest ${
                        t.popular ? 'text-teal-700' : 'text-slate-600'
                      }`}
                    >
                      {t.name}
                    </div>
                  ))}
                </div>

                {comparisonGroups.map((g) => (
                  <div key={g.group}>
                    <div className="px-6 py-3 bg-teal-50/60 border-y border-slate-200">
                      <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-teal-700">{g.group}</span>
                    </div>
                    {g.rows.map((row, i) => (
                      <div
                        key={row.feature}
                        className={`grid grid-cols-5 px-6 py-4 items-center ${
                          i % 2 === 0 ? 'bg-transparent' : 'bg-slate-50'
                        } hover:bg-teal-50/40 transition-colors`}
                      >
                        <div className="text-sm text-slate-800 pr-4">{row.feature}</div>
                        <div><Cell value={row.free} /></div>
                        <div><Cell value={row.starter} /></div>
                        <div><Cell value={row.growth} /></div>
                        <div><Cell value={row.professional} /></div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="relative py-24 border-t border-slate-200">
        <div className="max-w-[900px] mx-auto px-6 md:px-10">
          <div className="text-center mb-12">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">Pricing FAQ</div>
            <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
              Questions vendors ask us first.
            </h2>
          </div>
          <div className="space-y-3">
            {pricingFaqs.map((f, i) => (
              <div key={f.q} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-sm font-semibold text-slate-900">{f.q}</span>
                  <i
                    className={`ri-add-line text-teal-600 text-lg transition-transform duration-300 ${
                      openFaq === i ? 'rotate-45' : ''
                    }`}
                  ></i>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 -mt-1">
                    <p className="text-sm text-slate-600 leading-relaxed">{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REQUEST FORM */}
      <PricingRequestForm
        sectionRef={requestRef}
        selectedPlan={selectedPlan}
        onSelectPlan={setSelectedPlan}
        billing={billing}
      />

      <Footer />
    </div>
  );
}