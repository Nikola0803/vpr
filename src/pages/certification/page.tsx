import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import CertificationSeal from '@/components/feature/CertificationSeal';
import { certEligibleTiers } from '@/mocks/certifications';
import { useCertifications } from '@/hooks/useCertifications';
import CertHero from '@/pages/certification/components/CertHero';
import GradeCards from '@/pages/certification/components/GradeCards';
import IssuanceProcess from '@/pages/certification/components/IssuanceProcess';
import VerifyLookup from '@/pages/certification/components/VerifyLookup';
import CertRegistry from '@/pages/certification/components/CertRegistry';
import CertFaq from '@/pages/certification/components/CertFaq';

export default function Certification() {
  const { certifications, loading, error, reload } = useCertifications();
  const activeCount = certifications.filter((c) => c.status === 'active').length;

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />

      <CertHero activeCount={activeCount} loading={loading} />
      <GradeCards />
      <IssuanceProcess />
      <VerifyLookup certifications={certifications} loading={loading} />
      <CertRegistry certifications={certifications} loading={loading} error={error} onRetry={reload} />

      {/* SEAL KIT / ELIGIBILITY */}
      <section className="relative py-20 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">The seal kit</div>
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
                Put the mark where researchers look first.
              </h2>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                Once a seal is approved, certified vendors receive a seal kit: a storefront-ready badge, a backlink that
                points straight back to this registry, and a plain-language line explaining exactly what the seal proves.
                Every badge resolves to the live certificate, so it can never outlive the certification behind it.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {certEligibleTiers.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-teal-200 bg-teal-50 text-teal-700"
                  >
                    {t} plan eligible
                  </span>
                ))}
                <span className="text-[11px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-full border border-slate-200 bg-slate-50 text-slate-500">
                  Approval still required
                </span>
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/pricing"
                  className="whitespace-nowrap px-6 py-3 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                >
                  See eligible plans
                </Link>
                <Link
                  to="/claim"
                  className="whitespace-nowrap px-6 py-3 rounded-md text-sm font-semibold text-slate-800 border border-slate-200 hover:border-teal-400 hover:bg-teal-50 transition-all"
                >
                  Claim your store
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-7 md:p-8">
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-5">
                What the badge resolves to
              </div>
              <div className="space-y-3">
                <CertificationSeal grade="true_coa_verified" size="lg" certId="VPR-TCOA-2026-0412" />
                <CertificationSeal grade="ruo_verified" size="lg" certId="VPR-RUO-2026-0627" />
              </div>
              <div className="mt-6 pt-5 border-t border-slate-200 space-y-3">
                {[
                  { i: 'ri-links-line', t: 'Backlink to this registry', d: 'One click from any storefront footer to the live certificate.' },
                  { i: 'ri-refresh-line', t: 'Auto-expiring proof', d: 'If the certification lapses, the badge stops resolving.' },
                  { i: 'ri-file-text-line', t: 'Plain-language disclosure', d: 'The seal always states what it does and does not prove.' },
                ].map((r) => (
                  <div key={r.t} className="flex items-start gap-3">
                    <span className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-white border border-slate-200 text-teal-600">
                      <i className={`${r.i} text-base`}></i>
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{r.t}</div>
                      <div className="text-xs text-slate-500 leading-snug mt-0.5">{r.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CertFaq />

      {/* CTA */}
      <section className="relative py-24 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="relative glass rounded-3xl overflow-hidden p-12 md:p-16 text-center">
            <div className="absolute inset-0 grid-bg opacity-30"></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-teal-500/15 blur-3xl"></div>
            <div className="relative max-w-2xl mx-auto">
              <div className="flex justify-center mb-6">
                <CertificationSeal grade="true_coa_verified" size="lg" />
              </div>
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
                Trust you can look up, not just look at.
              </h2>
              <p className="mt-5 text-slate-700">
                Earn the seal, display it where it counts, and let every researcher confirm it in one click. That is the
                whole standard.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  to="/claim"
                  className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                >
                  Apply for certification
                </Link>
                <a
                  href="#verify"
                  className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-800 glass glass-hover"
                >
                  Verify a seal
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}