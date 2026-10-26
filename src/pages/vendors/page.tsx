import { useMemo, useState } from 'react';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { publicVendors } from '@/mocks/vendors';
import { useCertifications, activeCertMap } from '@/hooks/useCertifications';
import VendorCard from '@/pages/vendors/components/VendorCard';
import FilterPanel, { defaultFilters, type Filters } from '@/pages/vendors/components/FilterPanel';
import CompareDrawer from '@/pages/vendors/components/CompareDrawer';
import FeaturedVendorBanner from '@/pages/vendors/components/FeaturedVendorBanner';

export default function Vendors() {
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [compare, setCompare] = useState<string[]>([]);
  const [sort, setSort] = useState<'score' | 'reviews' | 'ship'>('score');
  const { certifications } = useCertifications();
  const certMap = useMemo(() => activeCertMap(certifications), [certifications]);

  const sponsored = useMemo(() => publicVendors.find((v) => v.sponsored), []);

  const results = useMemo(() => {
    const list = publicVendors.filter((v) => {
      if (filters.search && !`${v.name} ${v.domain} ${v.compounds.join(' ')}`.toLowerCase().includes(filters.search.toLowerCase()))
        return false;
      if (v.score < filters.minScore) return false;
      if (filters.publicCoa && !v.publicCoa) return false;
      if (filters.thirdPartyLab && !v.thirdPartyLab) return false;
      if (filters.qrVerify && !v.qrVerify) return false;
      if (filters.region !== 'All' && v.region !== filters.region) return false;
      if (filters.compounds.length > 0 && !filters.compounds.some((c) => v.compounds.includes(c))) return false;
      return true;
    });
    return [...list].sort((a, b) => {
      if (sort === 'score') {
        // Hand-picked leaders surface first (in curated rank order), then everyone else by trust score.
        const ra = a.rank ?? Number.POSITIVE_INFINITY;
        const rb = b.rank ?? Number.POSITIVE_INFINITY;
        if (ra !== rb) return ra - rb;
        return b.score - a.score;
      }
      if (sort === 'reviews') return b.reviews - a.reviews;
      return a.avgShipDays - b.avgShipDays;
    });
  }, [filters, sort]);

  const toggleCompare = (slug: string) => {
    setCompare((prev) => {
      if (prev.includes(slug)) return prev.filter((s) => s !== slug);
      if (prev.length >= 3) return [...prev.slice(1), slug];
      return [...prev, slug];
    });
  };

  const compareVendors = compare
    .map((slug) => publicVendors.find((v) => v.slug === slug))
    .filter((v): v is (typeof publicVendors)[number] => Boolean(v));

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans pb-40">
      <Navbar />

      {/* HEADER */}
      <section className="relative pt-32 pb-12 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25"></div>
        <div className="absolute inset-0 radial-glow"></div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-grid"></span>
            <span className="text-slate-700">{publicVendors.length} audited vendors · 1,240 COAs indexed</span>
          </div>
          <h1 className="font-display font-extrabold text-slate-900 text-[34px] md:text-5xl leading-[1.1] tracking-tight max-w-3xl">
            The verified directory of independent research chemical vendors.
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl">
            Filter by trust score, COA transparency, testing depth, geography, and compound availability. Select up to three
            vendors to run a live side-by-side comparison.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="relative pb-20">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8">
          <FilterPanel filters={filters} onChange={setFilters} resultCount={results.length} />

          <div>
            <div className="glass rounded-xl px-5 py-3.5 mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-slate-600">
                Showing <span className="text-slate-900 font-semibold">{results.length}</span> of {publicVendors.length} vendors
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Sort by</span>
                <div className="glass rounded-full p-1 flex">
                  {[
                    { k: 'score', l: 'Trust' },
                    { k: 'reviews', l: 'Volume' },
                    { k: 'ship', l: 'Ship' },
                  ].map((o) => (
                    <button
                      key={o.k}
                      onClick={() => setSort(o.k as typeof sort)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                        sort === o.k ? 'bg-cyan-500/20 text-cyan-700' : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {o.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {sponsored && <FeaturedVendorBanner vendor={sponsored} />}

            {results.length === 0 ? (
              <div className="glass rounded-2xl p-16 text-center">
                <i className="ri-search-eye-line text-4xl text-slate-400"></i>
                <div className="mt-4 font-display font-bold text-slate-900 text-lg">No vendors match those filters</div>
                <p className="mt-2 text-sm text-slate-600">Try widening your trust score or clearing compound tags.</p>
                <button
                  onClick={() => setFilters(defaultFilters)}
                  className="mt-5 whitespace-nowrap px-5 py-2.5 rounded-md text-sm font-semibold text-cyan-700 border border-cyan-500/30 hover:bg-cyan-500/10 transition-all"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {results.map((v) => (
                  <VendorCard key={v.slug} vendor={v} selected={compare.includes(v.slug)} onToggle={toggleCompare} cert={certMap[v.slug]} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />

      <CompareDrawer
        vendors={compareVendors}
        onRemove={(slug) => setCompare((p) => p.filter((s) => s !== slug))}
        onClear={() => setCompare([])}
      />
    </div>
  );
}