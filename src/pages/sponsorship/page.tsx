import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { Link } from 'react-router-dom';

const WHAT_IT_DOES = [
  {
    icon: 'ri-layout-top-line',
    title: 'Featured banner placement',
    body: 'Your vendor profile appears in a clearly marked "Featured" banner above the main directory grid on /vendors. All visitors see it, across every filter and sort state.',
  },
  {
    icon: 'ri-star-line',
    title: 'Highlighted profile page',
    body: 'Your /vendors profile carries a featured badge so researchers immediately know you are an active participant on the platform.',
  },
  {
    icon: 'ri-mail-send-line',
    title: 'Newsletter inclusion',
    body: 'Featured vendors receive a mention in the weekly digest sent to our subscriber list.',
  },
];

const WHAT_IT_CANNOT_DO = [
  'Change your trust score or review ratings',
  'Remove or suppress negative reviews',
  'Affect your position in ranked search results',
  'Buy a certification or verification seal',
  'Override editorial decisions about coverage or scoring',
  'Add fake or unverified reviews to your profile',
];

const FAQS = [
  {
    q: 'Who owns VPR?',
    a: 'VPR (Verified Peptide Reviews) is owned by TDS Studios. EVLV Peptides and Warrior Distributions are also operated under TDS Studios. All such relationships are disclosed on those vendor profiles and on this page. VPR operates with full editorial independence: no TDS Studios brand receives a higher trust score or special treatment in reviews.',
  },
  {
    q: 'Does a sponsorship affect my trust score?',
    a: 'No. Trust scores are calculated from verified review data only. Sponsorship has zero effect on scores, ranking in filtered results, or certification status.',
  },
  {
    q: 'How is the "Featured" label different from "Verified"?',
    a: '"Verified" means your vendor passed our COA audit and third-party lab check. "Featured" means you have a paid placement. A vendor can be featured without being verified, and verified without being featured.',
  },
  {
    q: 'Can I cancel?',
    a: 'Yes. Sponsorships run month-to-month. Cancel any time and the banner is removed at the end of your billing period.',
  },
  {
    q: 'How do I apply?',
    a: 'Use the contact form below or email us directly. We review every applicant against our editorial standards before accepting a sponsorship.',
  },
];

export default function Sponsorship() {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />

      {/* HERO */}
      <section className="relative pt-32 pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-25" />
        <div className="absolute inset-0 radial-glow" />
        <div className="relative max-w-[900px] mx-auto px-6 md:px-10">
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium mb-5">
            <i className="ri-eye-line text-teal-600"></i>
            <span className="text-slate-700">Full transparency on how this works</span>
          </div>
          <h1 className="font-display font-extrabold text-slate-900 text-[34px] md:text-5xl leading-[1.1] tracking-tight">
            How sponsorship works on VPR
          </h1>
          <p className="mt-5 text-slate-600 max-w-2xl text-lg leading-relaxed">
            Sponsorship is paid placement. It puts your vendor in front of researchers browsing the directory. It cannot buy trust, fake reviews, or a higher score. Here is exactly what you get, and what you do not.
          </p>
        </div>
      </section>

      {/* OWNERSHIP DISCLOSURE */}
      <section className="max-w-[900px] mx-auto px-6 md:px-10 mb-14">
        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 flex gap-4">
          <i className="ri-information-line text-2xl text-amber-600 shrink-0 mt-0.5"></i>
          <div>
            <div className="font-semibold text-slate-800 mb-1">Ownership disclosure</div>
            <p className="text-sm text-slate-700 leading-relaxed">
              VPR is owned by TDS Studios. EVLV Peptides and Warrior Distributions are also operated under TDS Studios and are current sponsors of this platform. This relationship is disclosed on each of their vendor profiles. All review data, trust scores, and editorial coverage remain independent of ownership or sponsorship status.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT IT DOES */}
      <section className="max-w-[900px] mx-auto px-6 md:px-10 mb-16">
        <h2 className="font-display font-bold text-slate-900 text-2xl mb-8">What sponsorship includes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {WHAT_IT_DOES.map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 flex items-center justify-center mb-4">
                <i className={`${item.icon} text-teal-600 text-lg`}></i>
              </div>
              <div className="font-semibold text-slate-800 mb-2">{item.title}</div>
              <p className="text-sm text-slate-600 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT IT CANNOT DO */}
      <section className="max-w-[900px] mx-auto px-6 md:px-10 mb-16">
        <h2 className="font-display font-bold text-slate-900 text-2xl mb-6">What sponsorship cannot do</h2>
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
          <ul className="space-y-3">
            {WHAT_IT_CANNOT_DO.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-700">
                <i className="ri-close-circle-line text-rose-500 shrink-0 mt-0.5"></i>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* HOW RATINGS STAY INDEPENDENT */}
      <section className="max-w-[900px] mx-auto px-6 md:px-10 mb-16">
        <div className="rounded-2xl border border-teal-200 bg-teal-50 p-6 md:p-8 flex flex-col md:flex-row gap-6">
          <div className="shrink-0 flex items-start justify-center md:justify-start">
            <div className="w-14 h-14 rounded-2xl bg-white border border-teal-200 flex items-center justify-center">
              <i className="ri-shield-star-line text-teal-600 text-2xl"></i>
            </div>
          </div>
          <div>
            <h3 className="font-display font-bold text-slate-800 text-xl mb-3">How ratings stay independent</h3>
            <p className="text-sm text-slate-700 leading-relaxed mb-3">
              Trust scores are calculated purely from verified buyer reviews. A review is verified against an order record or a cryptographic purchase hash. No review can be submitted without that anchor.
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Sponsored vendors are subject to the same moderation rules as everyone else. If a review is flagged as fake, it is removed regardless of sponsorship status. If a sponsored vendor receives a pattern of negative reviews, their score drops. Sponsorship provides placement, not immunity.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-[900px] mx-auto px-6 md:px-10 mb-16">
        <h2 className="font-display font-bold text-slate-900 text-2xl mb-8">Common questions</h2>
        <div className="space-y-4">
          {FAQS.map((item) => (
            <div key={item.q} className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="font-semibold text-slate-800 mb-2">{item.q}</div>
              <p className="text-sm text-slate-600 leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-[900px] mx-auto px-6 md:px-10 mb-20">
        <div className="rounded-2xl bg-slate-900 p-8 md:p-10 text-center">
          <h2 className="font-display font-bold text-white text-2xl mb-3">Interested in a featured placement?</h2>
          <p className="text-slate-400 mb-6 text-sm max-w-lg mx-auto leading-relaxed">
            Sponsorships are reviewed against our editorial standards before approval. We only accept vendors who meet our baseline trust threshold.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/claim"
              className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-500 transition-colors flex items-center gap-2"
            >
              <i className="ri-store-3-line"></i>Claim your vendor listing
            </Link>
            <a
              href="mailto:hello@verifiedpeptidereviews.com"
              className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold text-slate-300 border border-slate-700 hover:border-slate-500 hover:text-white transition-colors flex items-center gap-2"
            >
              <i className="ri-mail-line"></i>Contact us
            </a>
          </div>
          <p className="mt-5 text-xs text-slate-500">
            Already listed?{' '}
            <Link to="/pricing" className="text-teal-400 hover:text-teal-300 underline transition-colors">
              View plan pricing
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
