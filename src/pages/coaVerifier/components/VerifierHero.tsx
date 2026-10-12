import { Link } from 'react-router-dom';
import { verifierHero, verifierStats } from '@/mocks/coaVerifier';

export default function VerifierHero() {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://readdy.ai/api/search-image?query=Abstract%20forensic%20document%20scan%20visual%2C%20soft%20teal%20and%20emerald%20gradient%20light%20background%2C%20translucent%20data%20grid%20and%20magnifier%20geometry%2C%20minimal%20editorial%20style%2C%20very%20light%20and%20airy%2C%20clean%20negative%20space%2C%20no%20text&width=1920&height=1080&seq=coa-verifier-hero-01&orientation=landscape"
          alt="Abstract forensic document verification background with teal and emerald tones"
          title="COA Verifier - AI Certificate of Analysis verification"
          className="w-full h-full object-cover object-top opacity-[0.14]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/80 to-white"></div>
      </div>
      <div className="absolute inset-0 grid-bg opacity-25"></div>
      <div className="absolute inset-0 radial-glow"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium mb-7">
          <i className="ri-fingerprint-line text-cyan-600"></i>
          <span className="text-slate-700">{verifierHero.eyebrow}</span>
        </div>

        <h1 className="font-display font-extrabold text-slate-900 text-[38px] md:text-6xl leading-[1.08] tracking-tight max-w-4xl mx-auto">
          {verifierHero.title}
          <span className="text-gradient-cyan"> {verifierHero.titleAccent}</span>
        </h1>

        <p className="mt-7 text-slate-600 max-w-3xl mx-auto leading-relaxed">{verifierHero.lead}</p>

        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="#verify"
            className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
          >
            <i className="ri-upload-cloud-2-line"></i>
            {verifierHero.primaryCta}
          </a>
          <a
            href="#how-it-works"
            className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-700 glass glass-hover flex items-center justify-center gap-2"
          >
            <i className="ri-play-circle-line"></i>
            {verifierHero.secondaryCta}
          </a>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {verifierStats.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-5 py-6 text-left">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 text-teal-700">
                <i className={`${s.icon} text-xl`}></i>
              </div>
              <div className="mt-4 font-display font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">
                {s.value}
              </div>
              <div className="mt-1 text-xs text-slate-500 leading-relaxed">{s.label}</div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs text-slate-400 max-w-2xl mx-auto">
          Prefer the directory? <Link to="/vendors" className="text-teal-700 font-semibold hover:text-teal-800">Browse verified vendors</Link> and open any HPLC / COA vault.
        </p>
      </div>
    </section>
  );
}