import { useState } from 'react';
import { Link } from 'react-router-dom';
import PromotionPanel from '@/pages/home/components/PromotionPanel';
import { compounds, visibleFeaturedVendors } from '@/mocks/home';

export default function Hero() {
  const [query, setQuery] = useState('');
  const [showSuggest, setShowSuggest] = useState(false);
  const suggestions = query
    ? [...compounds, ...visibleFeaturedVendors.map((v) => v.name)]
        .filter((s) => s.toLowerCase().includes(query.toLowerCase()))
        .slice(0, 6)
    : [];

  return (
    <section className="relative pt-32 pb-14 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40"></div>
      <div className="absolute inset-0 radial-glow"></div>
      <div className="absolute -top-10 right-0 w-[720px] h-[720px] rounded-full bg-cyan-500/[0.07] blur-3xl pointer-events-none"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
          {/* LEFT */}
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-grid"></span>
              <span className="text-slate-600">The Decentralized Trust Standard for Research Chemical Vendors</span>
            </div>

            <h1 className="mt-6 font-display font-extrabold text-slate-900 text-[34px] md:text-[46px] xl:text-[56px] leading-[1.05] tracking-tight">
              Real reviews for
              <span className="block text-gradient-cyan">research peptide vendors.</span>
              <span className="block mt-3 text-xl md:text-2xl xl:text-3xl font-bold tracking-normal text-slate-500">
                Anyone can post. Order-backed reviews get verified.
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-slate-500 leading-relaxed">
              Every review is moderated before it publishes. No order needed to have your say - attach one and you earn
              the Verified Buyer badge, the reviews people actually trust.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                to="/write-review"
                className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
              >
                <i className="ri-star-line"></i>
                Write a Review
              </Link>
              <Link
                to="/vendors"
                className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-700 glass glass-hover flex items-center justify-center gap-2"
              >
                <i className="ri-search-eye-line"></i>
                Explore Verified Directory
              </Link>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.16em] text-slate-500">
              <i className="ri-shield-star-line text-teal-600"></i>
              Research Use Only &middot; AI screens every review for non-RUO language
            </div>

            {/* SEARCH */}
            <div className="mt-8 relative max-w-lg">
              <div className="glass rounded-2xl p-2 flex items-center gap-2 border border-slate-200">
                <div className="w-10 h-10 flex items-center justify-center text-cyan-600">
                  <i className="ri-search-2-line text-lg"></i>
                </div>
                <input
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setShowSuggest(true);
                  }}
                  onFocus={() => setShowSuggest(true)}
                  onBlur={() => setTimeout(() => setShowSuggest(false), 150)}
                  placeholder="Search vendors, domains or compounds…"
                  className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                />
                <button className="whitespace-nowrap px-4 py-2.5 rounded-lg text-sm font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-900 transition-colors">
                  Search
                </button>
              </div>
              {showSuggest && suggestions.length > 0 && (
                <div className="absolute z-30 left-0 right-0 mt-2 glass rounded-xl overflow-hidden border border-slate-200">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      className="w-full flex items-center justify-between px-5 py-3 text-left text-sm hover:bg-slate-100 transition-colors"
                      onMouseDown={() => setQuery(s)}
                    >
                      <span className="flex items-center gap-3">
                        <i className="ri-arrow-right-up-line text-cyan-600"></i>
                        <span className="text-slate-700">{s}</span>
                      </span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                        {visibleFeaturedVendors.some((v) => v.name === s) ? 'Vendor' : 'Compound'}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <PromotionPanel />
        </div>
      </div>
    </section>
  );
}