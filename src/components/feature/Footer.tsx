import { Link } from 'react-router-dom';
import Logo from '@/components/feature/Logo';
import CertificationSeal from '@/components/feature/CertificationSeal';

export default function Footer() {
  const cols = [
    {
      title: 'Platform',
      links: [
        { label: 'Vendor Directory', to: '/vendors' },
        { label: 'Pricing', to: '/pricing' },
        { label: 'SEO & Search Visibility', to: '/seo' },
        { label: 'Review Migration', to: '/migration' },
        { label: 'Claim Vendor Portal', to: '/claim' },
        { label: 'Dashboard', to: '/dashboard' },
      ],
    },
    {
      title: 'Trust Layer',
      links: [
        { label: 'Certification Standard', to: '/certification' },
        { label: 'COA Verifier', to: '/coa-verifier' },
        { label: 'Verify a Seal', to: '/certification#verify' },
        { label: 'How Verification Works', to: '/verification' },
        { label: 'HPLC COA Vault', to: '/vendors' },
        { label: 'Cryptographic Ledger', to: '/' },
        { label: 'Review Guidelines', to: '/review-guidelines' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog & Guides', to: '/blog' },
        { label: 'Review Migration', to: '/migration' },
        { label: 'Custom & Headless Setup', to: '/migration#integrations' },
        { label: 'WordPress Plugin', to: '/migration#integrations' },
        { label: 'Third-Party Platforms', to: '/migration#integrations' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', to: '/' },
        { label: 'Contact Support', to: '/' },
        { label: 'Terms of Service', to: '/' },
        { label: 'Privacy Policy', to: '/' },
      ],
    },
  ];

  return (
    <footer className="relative mt-24 border-t border-teal-100 bg-teal-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-10 mb-10 border-b border-teal-100">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5">
            <span className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold whitespace-nowrap">
              Certified under our standard
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <CertificationSeal grade="true_coa_verified" size="md" />
              <CertificationSeal grade="ruo_verified" size="md" />
            </div>
          </div>
          <Link
            to="/certification"
            className="whitespace-nowrap text-xs font-semibold text-teal-700 hover:text-teal-800 transition-colors flex items-center gap-1.5"
          >
            <i className="ri-shield-star-line"></i>Verify a seal
            <i className="ri-arrow-right-line"></i>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-5 text-sm text-slate-600 leading-relaxed max-w-sm">
              The un-bannable trust standard for independent research chemical vendors. Cryptographically verified reviews.
              Directly linked HPLC lab certificates. Zero arbitrary censorship.
            </p>
            <div className="mt-5 flex items-center gap-2 text-xs text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse-grid"></span>
              ALL SYSTEMS OPERATIONAL · v4.2.1
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold mb-4">{c.title}</div>
              <ul className="space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="text-sm text-slate-600 hover:text-teal-700 transition-colors">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-teal-100 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            © 2026 Verified Peptide Reviews. All reviews are cryptographically hashed & permanently archived.
          </div>
          <div className="flex items-center gap-3">
            {['ri-twitter-x-line', 'ri-github-line', 'ri-linkedin-fill', 'ri-discord-line'].map((i) => (
              <a
                key={i}
                href="#"
                aria-label="Social profile"
                className="w-9 h-9 flex items-center justify-center rounded-md bg-white border border-teal-100 text-slate-500 hover:text-teal-700 hover:border-teal-300 transition-colors"
              >
                <i className={`${i} text-base`}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}