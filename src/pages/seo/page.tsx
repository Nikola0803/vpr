import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import SeoPillars from '@/pages/seo/components/SeoPillars';
import HostComparison from '@/pages/seo/components/HostComparison';
import CompetitorMatrix from '@/pages/seo/components/CompetitorMatrix';
import SeoPricing from '@/pages/seo/components/SeoPricing';
import SeoTestimonials from '@/pages/seo/components/SeoTestimonials';
import ConsumerTrust from '@/pages/seo/components/ConsumerTrust';
import SeoFaq from '@/pages/seo/components/SeoFaq';
import { seoIntro } from '@/mocks/seo';
import { moneyBack } from '@/mocks/pricing';

export default function Seo() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-36 pb-20 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30"></div>
        <div className="absolute inset-0 radial-glow"></div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium mb-7">
            <i className="ri-google-line text-cyan-600"></i>
            <span className="text-slate-700">{seoIntro.eyebrow}</span>
          </div>

          <h1 className="font-display font-extrabold text-slate-900 text-[38px] md:text-6xl leading-[1.08] tracking-tight max-w-4xl mx-auto">
            {seoIntro.title}
            <span className="text-gradient-cyan"> {seoIntro.titleAccent}</span>
          </h1>

          <p className="mt-7 text-slate-600 max-w-3xl mx-auto leading-relaxed">{seoIntro.lead}</p>

          <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
            <Link
              to="/register"
              className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-teal-500 border border-cyan-400/30 transition-all"
            >
              Claim Your Vendor Portal
            </Link>
            <Link
              to="/vendors"
              className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-800 glass glass-hover"
            >
              Explore Verified Directory
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {[
              { value: '35%', label: 'CTR lift with star ratings' },
              { value: '48,300', label: 'reviews indexed on-domain' },
              { value: '100%', label: 'schema markup automated' },
            ].map((s) => (
              <div key={s.label} className="glass rounded-2xl px-6 py-5">
                <div className="font-display font-extrabold text-3xl text-gradient-cyan">{s.value}</div>
                <div className="mt-1 text-xs text-slate-600">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SeoPillars />
      <HostComparison />
      <CompetitorMatrix />
      <SeoPricing />
      <SeoTestimonials />
      <ConsumerTrust />
      <SeoFaq />

      {/* CTA */}
      <section className="relative py-24 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="relative glass rounded-3xl overflow-hidden p-12 md:p-16 text-center">
            <div className="absolute inset-0 grid-bg opacity-30"></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-cyan-500/15 blur-3xl"></div>
            <div className="relative max-w-2xl mx-auto">
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
                Stop renting your reputation.
              </h2>
              <p className="mt-5 text-slate-700">
                Your reviews. Your domain. Your payment processing, protected. No more surprise removals.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  to="/register"
                  className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-teal-500 border border-cyan-400/30 transition-all"
                >
                  Get started
                </Link>
                <Link
                  to="/pricing"
                  className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-800 glass glass-hover"
                >
                  See Full Pricing
                </Link>
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-slate-600 font-mono">
                <span>No contracts. Cancel any time.</span>
                <span className="text-slate-400">·</span>
                <span>{moneyBack}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}