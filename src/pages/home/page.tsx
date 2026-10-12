import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import VendorLogo from '@/components/feature/VendorLogo';
import RuoCompliance from '@/components/feature/RuoCompliance';
import CoaVerifierPromo from '@/components/feature/CoaVerifierPromo';
import Hero from '@/pages/home/components/Hero';
import StatStrip from '@/pages/home/components/StatStrip';
import { featureCards, visibleFeaturedVendors, testimonialReviews, compareRows } from '@/mocks/home';

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <i
          key={n}
          className={`${n <= rating ? 'ri-star-fill text-emerald-600' : 'ri-star-line text-slate-300'} text-sm`}
        ></i>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-700 font-sans">
      <Navbar />

      <Hero />

      {/* STAT STRIP */}
      <section className="relative pb-16">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <StatStrip />
        </div>
      </section>

      {/* COA VERIFIER PROMO */}
      <CoaVerifierPromo />

      {/* FEATURE GRID */}
      <section className="relative pt-10 pb-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="max-w-3xl">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">
                Built to obliterate legacy bloat
              </div>
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
                Everything mainstream platforms won't do.
                <span className="block mt-3 text-xl md:text-3xl text-slate-400 font-bold tracking-tight">
                  Enterprise trust tooling. Priced to scale.
                </span>
              </h2>
            </div>
            <Link
              to="/pricing"
              className="whitespace-nowrap self-start md:self-auto px-5 py-3 rounded-md text-sm font-semibold text-cyan-700 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all flex items-center gap-2"
            >
              Compare pricing
              <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {featureCards.map((f, i) => (
              <div key={f.tag} className="group glass rounded-2xl p-8 glass-hover relative overflow-hidden">
                <div className="absolute -right-16 -top-16 w-40 h-40 rounded-full bg-cyan-500/10 blur-3xl group-hover:bg-cyan-500/20 transition-all"></div>
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/30 text-cyan-700">
                      <i className={`${f.icon} text-2xl`}></i>
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                      0{i + 1} / 03
                    </span>
                  </div>
                  <div className="mt-6 text-[11px] font-mono uppercase tracking-[0.18em] text-cyan-600">{f.tag}</div>
                  <h3 className="mt-2 font-display font-bold text-slate-900 text-xl leading-snug">{f.title}</h3>
                  <p className="mt-3 text-sm text-slate-500 leading-relaxed">{f.desc}</p>
                  <div className="mt-6 pt-5 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-emerald-600 font-mono">{f.stat}</span>
                    <i className="ri-arrow-right-up-line text-slate-400 group-hover:text-cyan-700 transition-colors"></i>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED VENDORS */}
      <section className="relative py-24 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">
                Top audited vendors this month
              </div>
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
                Verified. Ranked. <span className="text-gradient-cyan">Un-censorable.</span>
              </h2>
            </div>
            <Link
              to="/vendors"
              className="text-sm font-medium text-slate-600 hover:text-cyan-700 whitespace-nowrap flex items-center gap-2"
            >
              View full directory <i className="ri-arrow-right-line"></i>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
            {visibleFeaturedVendors.map((v) => (
              <div key={v.slug} className="glass rounded-2xl p-6 glass-hover group flex flex-col">
                <div className="flex items-start justify-between">
                  <VendorLogo
                    name={v.name}
                    init={v.name.split(' ').map((w) => w[0]).slice(0, 2).join('')}
                    logo={v.logo}
                    logoDark={v.logoDark}
                    logoBg={v.logoBg}
                    boxClass="w-20 h-14"
                    imgClass="max-h-8 max-w-[64px]"
                    textClass="text-lg"
                  />
                  {v.verified && (
                    <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-[10px] font-mono uppercase tracking-wider">
                      <i className="ri-shield-check-fill"></i>Verified
                    </div>
                  )}
                </div>
                <div className="mt-5">
                  <div className="font-display font-bold text-slate-900 text-base">{v.name}</div>
                  <div className="mt-1 text-xs text-slate-400 flex items-center gap-1.5">
                    <i className="ri-map-pin-line"></i>{v.country}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <StarRow rating={Math.round(v.score)} />
                  <div className="text-sm">
                    <span className="font-mono font-semibold text-slate-900">{v.score.toFixed(1)}</span>
                    <span className="text-slate-400 text-xs ml-1">/ 5.0</span>
                  </div>
                </div>
                <div className="mt-2 text-[11px] text-slate-400 font-mono">
                  {v.reviews.toLocaleString()} verified reviews
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {v.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-600"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 pt-5 border-t border-slate-200 flex items-center justify-between gap-2">
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider flex items-center gap-1 ${
                      v.coa ? 'text-emerald-600' : 'text-slate-400'
                    }`}
                  >
                    <i className={v.coa ? 'ri-file-shield-2-fill' : 'ri-file-shield-2-line'}></i>
                    {v.coa ? 'COA Vault Live' : 'No COA Vault'}
                  </span>
                  <Link
                    to={`/vendors/${v.slug}`}
                    className="whitespace-nowrap text-xs font-semibold text-cyan-700 hover:text-cyan-800 flex items-center gap-1"
                  >
                    Profile <i className="ri-arrow-right-line"></i>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVIEWS STREAM */}
      <section className="relative py-24 border-t border-slate-200 bg-gradient-to-b from-transparent to-slate-50">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-600 mb-3">
                Live cryptographic review stream
              </div>
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
                Every review is hashed, timestamped, and permanently sealed.
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {testimonialReviews.map((r) => (
              <div key={r.order} className="glass rounded-2xl p-6 glass-hover flex flex-col">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{r.author}</div>
                    <div className="text-[11px] font-mono text-slate-400">Order {r.order}</div>
                  </div>
                  <div className="group relative">
                    <div className="px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 text-[10px] font-mono flex items-center gap-1 cursor-help">
                      <i className="ri-fingerprint-line"></i>Cryptographic Proof
                    </div>
                    <div className="absolute right-0 top-full mt-2 w-64 glass rounded-lg p-3 text-[11px] font-mono text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                      Hash: <span className="text-cyan-700">{r.hash}</span>
                      <br />Verified · Immutable · Sealed
                    </div>
                  </div>
                </div>
                <div className="mt-3 flex items-center gap-3">
                  <StarRow rating={r.rating} />
                  <span className="text-[11px] font-mono text-slate-500">{r.compound}</span>
                </div>
                <p className="mt-4 text-sm text-slate-600 leading-relaxed flex-1">{r.body}</p>
                <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
                  <span className="text-slate-400">{r.date} · {r.vendor}</span>
                  <button className="text-cyan-700 hover:text-cyan-800 flex items-center gap-1">
                    <i className="ri-file-shield-2-line"></i>COA
                  </button>
                </div>
                <div className="mt-3 rounded-lg bg-slate-100 border border-slate-200 p-3">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-cyan-600 mb-1 flex items-center gap-1">
                    <i className="ri-verified-badge-line"></i>Verified Vendor Official Reply
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Appreciate the detailed feedback, batch COA is uploaded to your order history. Reach out anytime.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RuoCompliance />

      {/* COMPARE TABLE */}
      <section className="relative py-24 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">
              Head-to-head breakdown
            </div>
            <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
              Why vendors are migrating in bulk.
            </h2>
            <p className="mt-5 text-slate-500">
              Direct feature-by-feature comparison versus the two most common platforms peptide vendors are escaping.
            </p>
          </div>

          <div className="glass rounded-2xl overflow-hidden">
            <div className="grid grid-cols-4 px-6 py-5 border-b border-slate-200 bg-slate-50">
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Capability</div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-cyan-700 flex items-center gap-2">
                <i className="ri-shield-check-fill"></i>Verified Peptide Reviews
              </div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400">PepReviewPro</div>
              <div className="text-[11px] font-mono uppercase tracking-widest text-slate-400">Trustpilot</div>
            </div>
            {compareRows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-4 px-6 py-5 items-center ${
                  i % 2 === 0 ? 'bg-transparent' : 'bg-slate-50'
                } hover:bg-cyan-500/[0.03] transition-colors`}
              >
                <div className="text-sm text-slate-700 font-medium">{row.feature}</div>
                <div className="text-sm text-cyan-700 font-semibold flex items-center gap-2">
                  <i className="ri-check-double-line text-emerald-600"></i>{row.vpr}
                </div>
                <div className="text-sm text-slate-500">{row.pep}</div>
                <div className="text-sm text-slate-500">{row.trust}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="relative glass rounded-3xl overflow-hidden p-12 md:p-16">
            <div className="absolute inset-0 grid-bg opacity-30"></div>
            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-cyan-500/15 blur-3xl"></div>
            <div className="absolute -bottom-24 -left-10 w-96 h-96 rounded-full bg-teal-500/15 blur-3xl"></div>
            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
              <div className="max-w-2xl">
                <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-emerald-600 mb-3">
                  White-glove migration included
                </div>
                <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
                  Move your entire review history off Trustpilot in 72 hours.
                </h2>
                <p className="mt-5 text-slate-600 max-w-xl">
                  Our migration team ports historical reviews, preserves star ratings, and issues cryptographic hashes
                  retroactively. Zero downtime on your storefront. Zero lost social proof.
                </p>
              </div>
              <div className="flex flex-col gap-3 min-w-[240px]">
                <Link
                  to="/dashboard"
                  className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-teal-500 transition-all border border-cyan-400/30 flex items-center justify-center gap-2"
                >
                  Start Free 14-Day Trial
                </Link>
                <Link
                  to="/pricing"
                  className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-700 border border-slate-200 hover:border-cyan-500/40 transition-all flex items-center justify-center gap-2"
                >
                  See Pricing Tiers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}