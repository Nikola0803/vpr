import { Link } from 'react-router-dom';
import { promoBanner } from '@/mocks/coaVerifier';

export default function CoaVerifierPromo() {
  return (
    <section className="relative pb-16">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="relative rounded-3xl overflow-hidden border border-teal-200 bg-gradient-to-br from-teal-50 via-white to-cyan-50/60 p-8 md:p-10">
          <div className="absolute inset-0 grid-bg opacity-20"></div>
          <div className="absolute -top-20 -right-16 w-72 h-72 rounded-full bg-cyan-500/10 blur-3xl"></div>
          <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex items-start gap-5 max-w-2xl">
              <div className="w-14 h-14 shrink-0 rounded-2xl bg-gradient-to-br from-cyan-500/25 to-teal-500/15 border border-cyan-500/30 flex items-center justify-center">
                <i className="ri-fingerprint-line text-2xl text-teal-700"></i>
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-teal-600 text-white text-[10px] font-mono uppercase tracking-widest">
                  <i className="ri-sparkling-2-line"></i>
                  {promoBanner.eyebrow}
                </div>
                <h2 className="mt-3 font-display font-extrabold text-slate-900 text-2xl md:text-3xl tracking-tight leading-snug">
                  {promoBanner.title}
                </h2>
                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{promoBanner.desc}</p>
              </div>
            </div>
            <Link
              to="/coa-verifier"
              className="whitespace-nowrap shrink-0 px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
            >
              <i className="ri-upload-cloud-2-line"></i>
              {promoBanner.cta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}