import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import VerificationHero from '@/pages/verification/components/VerificationHero';
import VerificationPipeline from '@/pages/verification/components/VerificationPipeline';
import VerificationRules from '@/pages/verification/components/VerificationRules';
import VerificationIndependence from '@/pages/verification/components/VerificationIndependence';
import VerificationFaq from '@/pages/verification/components/VerificationFaq';
import RuoCompliance from '@/components/feature/RuoCompliance';

export default function Verification() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />
      <VerificationHero />
      <VerificationPipeline />
      <VerificationRules />
      <VerificationIndependence />
      <RuoCompliance />
      <VerificationFaq />

      {/* CTA */}
      <section className="relative py-24 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="relative glass rounded-3xl overflow-hidden p-12 md:p-16 text-center">
            <div className="absolute inset-0 grid-bg opacity-30"></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-teal-500/15 blur-3xl"></div>
            <div className="relative max-w-2xl mx-auto">
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
                Real reviews, kept forever.
              </h2>
              <p className="mt-5 text-slate-700">
                Whether you are a researcher checking a vendor or a vendor collecting verified feedback, verification is the
                foundation everything else is built on.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  to="/rate/demo"
                  className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                >
                  Submit a Review
                </Link>
                <Link
                  to="/migration"
                  className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-800 glass glass-hover"
                >
                  Migrate existing reviews
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