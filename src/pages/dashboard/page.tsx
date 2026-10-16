import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import KpiRow from '@/pages/dashboard/components/KpiRow';
import InviteEngine from '@/pages/dashboard/components/InviteEngine';
import EmbedStudio from '@/pages/dashboard/components/EmbedStudio';
import RatingBadgeStudio from '@/pages/dashboard/components/RatingBadgeStudio';
import CoaVault from '@/pages/dashboard/components/CoaVault';
import CertificationStatus from '@/pages/dashboard/components/CertificationStatus';
import QuickActions from '@/pages/dashboard/components/QuickActions';
import { useAuth } from '@/context/AuthContext';
import { vendors } from '@/mocks/vendors';

const navItems = [
  { id: 'overview', label: 'Overview', icon: 'ri-dashboard-3-line' },
  { id: 'invites', label: 'Review Invites', icon: 'ri-send-plane-line' },
  { id: 'embeds', label: 'Embed Studio', icon: 'ri-code-s-slash-line' },
  { id: 'badge', label: 'Rating Badge', icon: 'ri-award-line' },
  { id: 'coa', label: 'COA Vault', icon: 'ri-flask-line' },
];

const sections: Record<string, { title: string; desc: string }> = {
  overview: { title: 'Executive Overview', desc: 'Your trust performance at a glance across the last 30 days.' },
  invites: { title: 'Automated Invitation Engine', desc: 'Import orders, connect storefronts, and scale your review collection.' },
  embeds: { title: 'Embed Code Generator Studio', desc: 'Build conversion-boosting widgets and copy production-ready snippets.' },
  badge: { title: 'Featured Rating Badge', desc: 'One snippet, unique to your brand - your live score and stars, ready to paste anywhere.' },
  coa: { title: 'HPLC Lab Management Vault', desc: 'Upload lab certificates, assign batches, and link them to reviews.' },
};

export default function Dashboard() {
  const [active, setActive] = useState('overview');
  const { user, ready } = useAuth();
  const meta = sections[active];

  if (!ready) {
    return <div className="min-h-screen bg-white" />;
  }
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  const claimed = user.vendorSlug ? vendors.find((v) => v.slug === user.vendorSlug) : undefined;
  const portalName = claimed?.name || user.company || user.name;
  const portalDomain = claimed?.domain || 'connect your store';
  const portalSlug = claimed?.slug || user.vendorSlug || 'evlv-peptides';

  const goToSection = (id: string) => {
    setActive(id);
    requestAnimationFrame(() => {
      document.getElementById('portal-panel')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-20"></div>
        <div className="absolute inset-0 radial-glow opacity-60"></div>
        <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                <Link to="/" className="hover:text-cyan-700">Home</Link>
                <i className="ri-arrow-right-s-line"></i>
                <span className="text-slate-700">Vendor Portal</span>
              </div>
              <h1 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
                {portalName}
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
                <span className="text-slate-600 font-mono">{portalDomain}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/rate/demo"
                className="whitespace-nowrap px-4 py-2.5 rounded-md text-sm font-medium text-slate-800 glass glass-hover flex items-center gap-2"
              >
                <i className="ri-eye-line"></i>Preview Review Flow
              </Link>
              <button
                type="button"
                onClick={() => goToSection('invites')}
                className="cursor-pointer whitespace-nowrap px-4 py-2.5 rounded-md text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-teal-500 border border-cyan-400/30 transition-all"
              >
                Invite Researchers
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative pb-10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <QuickActions onNavigate={goToSection} />
        </div>
      </section>

      <section id="portal-panel" className="relative pb-24 scroll-mt-24">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          <aside className="lg:sticky lg:top-24 self-start">
            <div className="glass rounded-2xl p-2 space-y-1">
              {navItems.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setActive(n.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    active === n.id
                      ? 'bg-cyan-500/15 text-cyan-700 border border-cyan-500/30'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <i className={`${n.icon} text-base`}></i>
                  {n.label}
                </button>
              ))}
            </div>

            <div className="glass rounded-2xl p-5 mt-5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">Invite Quota</div>
              <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full rounded-full bg-slate-200" style={{ width: '0%' }}></div>
              </div>
              <div className="mt-2 text-xs text-slate-500 italic">
                Available after store connection
              </div>
              <button className="mt-4 w-full whitespace-nowrap text-xs font-semibold px-3 py-2.5 rounded-md border border-cyan-500/30 text-cyan-700 hover:bg-cyan-500/10 transition-all">
                Buy Overage Pack
              </button>
            </div>

            <CertificationStatus vendorSlug={portalSlug} />
          </aside>

          <div>
            {/* Demo data notice */}
            <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 flex items-start gap-3">
              <i className="ri-test-tube-line text-amber-600 text-base mt-0.5 shrink-0"></i>
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-semibold">This is a preview dashboard.</span> All metrics, charts, and data shown below are sample figures — not your real account data. Connect your store and complete onboarding to start seeing live numbers.
              </p>
            </div>

            <div className="mb-6">
              <h2 className="font-display font-bold text-slate-900 text-2xl tracking-tight">{meta.title}</h2>
              <p className="mt-1 text-sm text-slate-600">{meta.desc}</p>
            </div>

            {active === 'overview' && <KpiRow />}
            {active === 'invites' && <InviteEngine />}
            {active === 'embeds' && <EmbedStudio />}
            {active === 'badge' && <RatingBadgeStudio vendorSlug={portalSlug} />}
            {active === 'coa' && <CoaVault vendorSlug={portalSlug} />}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}