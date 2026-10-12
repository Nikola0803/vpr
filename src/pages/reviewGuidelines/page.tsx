import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import RuoCompliance from '@/components/feature/RuoCompliance';
import GuidelinesHero from '@/pages/reviewGuidelines/components/GuidelinesHero';
import OneRule from '@/pages/reviewGuidelines/components/OneRule';
import VerificationSteps from '@/pages/reviewGuidelines/components/VerificationSteps';
import RejectionRules from '@/pages/reviewGuidelines/components/RejectionRules';
import GuidelinesFaq from '@/pages/reviewGuidelines/components/GuidelinesFaq';

export default function ReviewGuidelines() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />
      <GuidelinesHero />
      <OneRule />
      <VerificationSteps />
      <RejectionRules />
      <RuoCompliance />
      <GuidelinesFaq />

      {/* CTA */}
      <section className="relative py-24 border-t border-slate-200">
        <div className="max-w-[1400px] mx-auto px-6 md:px-10">
          <div className="relative glass rounded-3xl overflow-hidden p-12 md:p-16 text-center">
            <div className="absolute inset-0 grid-bg opacity-30"></div>
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-teal-500/15 blur-3xl"></div>
            <div className="relative max-w-2xl mx-auto">
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
                Everyone gets a voice. Proof gets the badge.
              </h2>
              <p className="mt-5 text-slate-700">
                Got a verified order behind you? Your honest take earns the Verified Buyer badge — five stars or one. No
                order? You can still post, clearly labeled unverified. Either way, a human moderates every review before
                it goes live.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  to="/write-review"
                  className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                >
                  Write a review
                </Link>
                <Link
                  to="/vendors"
                  className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-800 glass glass-hover"
                >
                  Browse verified vendors
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