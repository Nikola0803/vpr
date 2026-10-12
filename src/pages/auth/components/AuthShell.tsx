import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/components/feature/Logo';

interface AuthShellProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}

const trustPoints = [
  { icon: 'ri-shield-star-line', text: 'Immune to mainstream arbitrary bans' },
  { icon: 'ri-flask-line', text: 'Direct HPLC / COA batch linking' },
  { icon: 'ri-rocket-2-line', text: 'Embeds that never slow your checkout' },
];

export default function AuthShell({ eyebrow, title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-25"></div>
      <div className="absolute inset-0 radial-glow opacity-70"></div>

      <div className="relative min-h-screen max-w-[1400px] mx-auto px-6 md:px-10 py-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="hidden lg:flex flex-col justify-center">
          <Link to="/" className="w-max">
            <Logo />
          </Link>

          <h2 className="mt-10 font-display font-extrabold text-slate-900 text-4xl xl:text-5xl leading-[1.08] tracking-tight max-w-lg">
            The un-bannable trust standard for research chemical vendors.
          </h2>
          <p className="mt-5 text-slate-600 max-w-md leading-relaxed">
            Cryptographically verified reviews, HPLC certificate linking, and conversion-boosting embeds, all on your
            own domain, permanently.
          </p>

          <div className="mt-10 space-y-4">
            {trustPoints.map((f) => (
              <div key={f.text} className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg glass flex items-center justify-center">
                  <i className={`${f.icon} text-cyan-600`}></i>
                </div>
                <span className="text-sm text-slate-700">{f.text}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 glass rounded-2xl p-5 max-w-md">
            <div className="font-mono text-[11px] uppercase tracking-widest text-slate-500 mb-2">Live trust ledger</div>
            <div className="font-mono text-sm text-emerald-600">2,817,204 reviews sealed</div>
            <div className="font-mono text-sm text-cyan-700 mt-1">0 compliant reviews removed</div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto glass rounded-3xl p-8 md:p-10">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600">{eyebrow}</div>
          <h1 className="mt-3 font-display font-extrabold text-slate-900 text-3xl tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-slate-600 leading-relaxed">{subtitle}</p>
          <div className="mt-8">{children}</div>
          <div className="mt-6 text-sm text-slate-600">{footer}</div>
        </div>
      </div>
    </div>
  );
}