import { type MouseEvent } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { migrationHero, migrationStats } from '@/mocks/migration';

export default function MigrationHero() {
  const { pathname } = useLocation();

  const scrollToForm = (event: MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/migration') return;
    const target = document.getElementById('request');
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    window.history.replaceState(null, '', '/migration#request');
  };

  return (
    <section className="relative pt-36 pb-20 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-30"></div>
      <div className="absolute inset-0 radial-glow"></div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10 text-center">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium mb-7">
          <i className="ri-shield-check-line text-teal-600"></i>
          <span className="text-slate-700">{migrationHero.eyebrow}</span>
        </div>

        <h1 className="font-display font-extrabold text-slate-900 text-[38px] md:text-6xl leading-[1.08] tracking-tight max-w-4xl mx-auto">
          {migrationHero.title}
          <span className="text-gradient-cyan"> {migrationHero.titleAccent}</span>
        </h1>

        <p className="mt-7 text-slate-600 max-w-3xl mx-auto leading-relaxed">{migrationHero.lead}</p>

        <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
          <Link
            to="/migration#request"
            className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            onClick={scrollToForm}
          >
            <i className="ri-archive-drawer-line"></i>
            {migrationHero.primaryCta}
          </Link>
          <Link
            to="/migration#integrations"
            className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-700 glass glass-hover flex items-center justify-center gap-2"
          >
            <i className="ri-plug-line"></i>
            {migrationHero.secondaryCta}
          </Link>
        </div>

        <Link
          to="/verification"
          className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-teal-700 hover:text-teal-800"
        >
          <i className="ri-shield-check-line"></i>
          See exactly how every migrated review is verified
        </Link>

        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {migrationStats.map((s) => (
            <div key={s.label} className="glass rounded-2xl px-5 py-6 text-left">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-slate-100 ${s.accent}`}>
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