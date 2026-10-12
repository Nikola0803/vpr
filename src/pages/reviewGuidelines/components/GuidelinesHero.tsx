import { Link } from 'react-router-dom';
import { guidelinesHero, guidelinesStats } from '@/mocks/reviewGuidelines';

export default function GuidelinesHero() {
  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute inset-0 radial-glow"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium mb-7">
          <i className="ri-file-shield-2-line text-teal-600"></i>
          <span className="text-slate-700">{guidelinesHero.eyebrow}</span>
        </div>

        <h1 className="font-display font-extrabold text-slate-900 text-[38px] md:text-6xl leading-[1.08] tracking-tight max-w-4xl mx-auto">
          {guidelinesHero.title}
          <span className="text-gradient-cyan"> {guidelinesHero.titleAccent}</span>
        </h1>

        <p className="mt-7 text-slate-600 max-w-3xl mx-auto leading-relaxed">{guidelinesHero.lead}</p>

        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/verification"
            className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
          >
            <i className="ri-shield-check-line"></i>
            {guidelinesHero.primaryCta}
          </Link>
          <Link
            to="/write-review"
            className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-700 glass glass-hover flex items-center justify-center gap-2"
          >
            <i className="ri-star-line"></i>
            {guidelinesHero.secondaryCta}
          </Link>
        </div>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {guidelinesStats.map((s) => (
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
      </div>
    </section>
  );
}