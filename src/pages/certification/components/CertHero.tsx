import { Link } from 'react-router-dom';
import CertificationSeal from '@/components/feature/CertificationSeal';

interface Props {
  activeCount: number;
  loading: boolean;
}

export default function CertHero({ activeCount, loading }: Props) {
  return (
    <section className="relative pt-32 pb-16 overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25"></div>
      <div className="absolute inset-0 radial-glow"></div>
      <div className="relative max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-grid"></span>
          <span className="text-slate-700">
            {loading ? 'Loading the live registry…' : `${activeCount} certified vendors on the public registry`}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-10 items-center">
          <div>
            <h1 className="font-display font-extrabold text-slate-900 text-[36px] md:text-5xl leading-[1.08] tracking-tight max-w-2xl">
              The certification researchers can actually verify.
            </h1>
            <p className="mt-5 text-slate-600 max-w-xl leading-relaxed">
              Anyone can print a badge. We issue two, and both are earned, reviewed by a human on our side, and pulled the
              moment a certificate stops holding up. Every seal carries a public certificate ID you can look up right here.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <a
                href="#verify"
                className="whitespace-nowrap px-6 py-3 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center gap-2"
              >
                <i className="ri-search-eye-line"></i>Verify a seal
              </a>
              <Link
                to="/pricing"
                className="whitespace-nowrap px-6 py-3 rounded-md text-sm font-semibold text-slate-800 border border-slate-200 hover:border-teal-400 hover:bg-teal-50 transition-all"
              >
                How vendors qualify
              </Link>
            </div>

            <div className="mt-9 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
              {[
                { v: '2', l: 'Grades issued', i: 'ri-medal-line' },
                { v: '100%', l: 'Human-reviewed', i: 'ri-user-follow-line' },
                { v: 'Public', l: 'Certificate IDs', i: 'ri-qr-code-line' },
                { v: 'Revocable', l: 'Any time', i: 'ri-shield-flash-line' },
              ].map((s) => (
                <div key={s.l}>
                  <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 text-teal-600">
                    <i className={`${s.i} text-base`}></i>
                  </div>
                  <div className="mt-2 font-display font-extrabold text-slate-900 text-xl">{s.v}</div>
                  <div className="text-[11px] text-slate-500 leading-tight">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="glass rounded-2xl p-6 md:p-8">
              <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-5">
                The two marks we issue
              </div>
              <div className="space-y-4">
                <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4">
                  <CertificationSeal grade="true_coa_verified" size="lg" />
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    Batch certificate matched to an independent laboratory report and the vials on sale.
                  </p>
                </div>
                <div className="rounded-xl border border-teal-200 bg-teal-50/60 p-4">
                  <CertificationSeal grade="ruo_verified" size="lg" />
                  <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                    The full review stream clears the Research Use Only language screen.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}