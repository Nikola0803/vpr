import { useEffect, useState } from 'react';

const BEFORE = {
  domain: 'generic-peptides.com',
  status: 'Unverified store',
  points: [
    'Buyers can\u2019t tell you apart from the rest',
    'Shoppers hesitate before they order',
    'No proof when someone searches your name',
  ],
};

const AFTER = {
  domain: 'yourstore.com',
  status: 'Verified & promoted',
  points: [
    'More buyers find and choose your store',
    'More of your visitors turn into orders',
    'Instantly trusted when they look you up',
  ],
};

const LIFTS = [
  { icon: 'ri-user-add-line', value: '+212%', label: 'More buyers' },
  { icon: 'ri-shopping-bag-3-line', value: '+38%', label: 'Conversion lift' },
  { icon: 'ri-shield-star-line', value: '4.8\u2605', label: 'Trust when searched' },
];

export default function PromotionPanel() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const id = setInterval(() => setPulse((p) => !p), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[32px] bg-gradient-to-br from-teal-500/10 via-cyan-500/[0.06] to-transparent blur-2xl pointer-events-none"></div>

      <div className="relative glass rounded-3xl p-6 md:p-7">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-900 text-white">
              <i className="ri-rocket-2-line text-lg"></i>
            </span>
            <div>
              <div className="text-sm font-semibold text-slate-900">What vendors get when verified</div>
              <div className="text-[11px] font-mono text-slate-400">Your store, before &amp; after</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-emerald-600">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse-grid"></span>
            Live
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* BEFORE */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-slate-400">
              <i className="ri-close-circle-line text-rose-400"></i>
              Unverified
            </div>

            <div className="mt-3.5 flex items-center gap-2.5">
              <span className="w-9 h-9 shrink-0 rounded-lg bg-slate-200 text-slate-500 flex items-center justify-center">
                <i className="ri-store-2-line"></i>
              </span>
              <div className="text-xs font-semibold text-slate-500 truncate">{BEFORE.domain}</div>
            </div>

            <div className="mt-4 space-y-2.5">
              {BEFORE.points.map((t) => (
                <div key={t} className="flex items-start gap-2 text-[11px] text-slate-500">
                  <i className="ri-subtract-line text-slate-300 mt-0.5 shrink-0"></i>
                  <span className="leading-snug">{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* AFTER */}
          <div
            className={`relative rounded-2xl border p-4 transition-all duration-700 ${
              pulse ? 'border-teal-300 bg-teal-50/90' : 'border-teal-200 bg-teal-50/50'
            }`}
          >
            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-teal-700">
              <i className="ri-checkbox-circle-line text-teal-600"></i>
              Verified &amp; promoted
            </div>

            <div className="mt-3.5 flex items-center gap-2.5">
              <span className="w-9 h-9 shrink-0 rounded-lg bg-white border border-teal-200 text-teal-600 flex items-center justify-center">
                <i className="ri-shield-check-line"></i>
              </span>
              <div className="text-xs font-semibold text-slate-900 truncate">{AFTER.domain}</div>
            </div>

            <div className="mt-4 space-y-2.5">
              {AFTER.points.map((t) => (
                <div key={t} className="flex items-start gap-2 text-[11px] font-medium text-slate-700">
                  <i className="ri-check-line text-teal-600 mt-0.5 shrink-0"></i>
                  <span className="leading-snug">{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 pt-5 border-t border-slate-200">
          <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-3">
            Measured lift after verification
          </div>
          <div className="grid grid-cols-3 gap-2">
            {LIFTS.map((l) => (
              <div key={l.label} className="flex flex-col gap-1.5">
                <div className="flex items-center gap-1.5">
                  <i className={`${l.icon} text-teal-600 text-sm`}></i>
                  <span className="font-display font-extrabold text-slate-900 text-base md:text-lg leading-none">
                    {l.value}
                  </span>
                </div>
                <span className="text-[10px] text-slate-500 leading-snug">{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center gap-2 text-[11px] font-mono text-slate-500">
          <i className="ri-lock-2-line text-teal-600"></i>
          Every verified store gets the seal, promoted visibility &amp; the promo engine
        </div>
      </div>
    </div>
  );
}