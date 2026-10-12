import { useEffect, useState } from 'react';
import { statStrip } from '@/mocks/home';

function CountUp({ end, duration = 1800 }: { end: string; duration?: number }) {
  const numeric = parseFloat(end.replace(/[^\d.]/g, '')) || 0;
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let raf = 0;
    const step = (t: number) => {
      if (start === null) start = t;
      const p = Math.min((t - start) / duration, 1);
      setVal(numeric * (0.15 + 0.85 * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [numeric, duration]);
  if (end.includes('%')) return <>{val.toFixed(1)}%</>;
  return <>{Math.floor(val).toLocaleString()}</>;
}

export default function StatStrip() {
  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="grid grid-cols-2 lg:grid-cols-4">
        {statStrip.map((s, i) => (
          <div
            key={s.label}
            className={`relative px-5 py-5 md:px-7 md:py-6 flex items-center gap-3.5 ${
              i >= 2 ? 'border-t border-slate-200 lg:border-t-0' : ''
            } ${i % 2 === 1 ? 'border-l border-slate-200' : ''} ${
              i === 2 ? 'lg:border-l lg:border-slate-200' : ''
            }`}
          >
            <div
              className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center bg-slate-100 ${s.accent}`}
            >
              <i className={`${s.icon} text-lg`}></i>
            </div>
            <div className="min-w-0">
              <div className="font-display font-extrabold text-slate-900 text-xl md:text-2xl tracking-tight leading-none">
                <CountUp end={s.value} />
              </div>
              <div className="text-[11px] text-slate-500 mt-1.5 leading-snug">{s.label}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}