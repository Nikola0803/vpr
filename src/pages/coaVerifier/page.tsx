import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import RuoCompliance from '@/components/feature/RuoCompliance';
import VerifierHero from '@/pages/coaVerifier/components/VerifierHero';
import VerifyTool from '@/pages/coaVerifier/components/VerifyTool';
import WhatWeDetect from '@/pages/coaVerifier/components/WhatWeDetect';
import HowItWorks from '@/pages/coaVerifier/components/HowItWorks';
import VerifierFaq from '@/pages/coaVerifier/components/VerifierFaq';

export default function CoaVerifier() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />
      <VerifierHero />
      <VerifyTool />
      <WhatWeDetect />
      <HowItWorks />
      <RuoCompliance />
      <VerifierFaq />

      {/* CTA */}
      <section className="relative py-24 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="relative glass rounded-3xl overflow-hidden p-12 md:p-16 text-center">
            <div className="absolute inset-0 grid-bg opacity-30"></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-teal-500/15 blur-3xl"></div>
            <div className="relative max-w-2xl mx-auto">
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
                Never trust a certificate you have not checked.
              </h2>
              <p className="mt-5 text-slate-700">
                Run any COA through COA Verifier in seconds — or list your own tamper-free documents in the verified
                directory.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <a
                  href="#verify"
                  className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
                >
                  <i className="ri-shield-check-line"></i>
                  Verify a COA now
                </a>
                <Link
                  to="/claim"
                  className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-800 glass glass-hover flex items-center justify-center gap-2"
                >
                  <i className="ri-store-3-line"></i>
                  List your store
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