import { Link } from 'react-router-dom';
import { integrationMethods } from '@/mocks/migration';

export default function IntegrationMethods() {
  return (
    <section id="integrations" className="relative py-24 border-t border-slate-200 bg-slate-50 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">
              Verification & display integrations
            </div>
            <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
              Show your rescued reviews anywhere you sell.
            </h2>
            <p className="mt-5 text-slate-600">
              Pick the integration that fits your stack. Every one verifies purchases, screens for compliance, and
              outputs schema markup, and every package includes free technical support to get it live.
            </p>
          </div>
          <div className="glass rounded-xl px-5 py-4 flex items-center gap-3 self-start md:self-auto">
            <div className="w-10 h-10 rounded-lg bg-teal-500/10 border border-teal-500/25 flex items-center justify-center">
              <i className="ri-customer-service-2-line text-lg text-teal-700"></i>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Setup support included</div>
              <div className="text-xs text-slate-500">No dev required for most stores</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {integrationMethods.map((m) => (
            <div
              key={m.name}
              className={`glass glass-hover rounded-2xl p-7 flex flex-col relative overflow-hidden ${
                m.featured ? 'border-teal-500/40' : ''
              }`}
            >
              {m.featured && (
                <div className="absolute top-5 right-5 px-2.5 py-1 rounded-full bg-teal-600 text-white text-[10px] font-mono uppercase tracking-widest">
                  Included
                </div>
              )}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-teal-500/20 to-cyan-500/10 border border-teal-500/25">
                <i className={`${m.icon} text-xl text-teal-700`}></i>
              </div>
              <div className="mt-5 text-[10px] font-mono uppercase tracking-[0.16em] text-cyan-600">{m.tag}</div>
              <h3 className="mt-1.5 font-display font-bold text-slate-900 text-lg leading-snug">{m.name}</h3>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed flex-1">{m.desc}</p>
              <ul className="mt-5 space-y-2">
                {m.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 text-xs text-slate-600">
                    <i className="ri-check-line text-teal-600 mt-0.5"></i>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/migration#request"
            className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center gap-2"
          >
            <i className="ri-tools-line"></i>
            Request free integration help
          </Link>
          <Link
            to="/pricing"
            className="whitespace-nowrap px-6 py-3.5 rounded-md text-sm font-semibold text-slate-700 glass glass-hover flex items-center gap-2"
          >
            Compare what's included
          </Link>
        </div>
      </div>
    </section>
  );
}