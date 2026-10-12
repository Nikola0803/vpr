import { kpis, velocity } from '@/mocks/dashboard';

const accentMap: Record<string, string> = {
  cyan: 'text-cyan-600 bg-cyan-500/10 border-cyan-500/25',
  teal: 'text-teal-600 bg-teal-500/10 border-teal-500/25',
  emerald: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/25',
};

export default function KpiRow() {
  const maxReviews = Math.max(...velocity.map((v) => v.reviews));

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div key={k.label} className="glass rounded-2xl p-5 glass-hover">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${accentMap[k.accent]}`}>
                <i className={`${k.icon} text-lg`}></i>
              </div>
              {k.up && (
                <span className="text-[11px] font-mono px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center gap-1">
                  <i className="ri-arrow-up-line"></i>{k.delta}
                </span>
              )}
            </div>
            <div className="mt-4 flex items-end gap-1">
              <span className="font-display font-extrabold text-slate-900 text-3xl tracking-tight">{k.value}</span>
              {k.suffix && <span className="text-slate-500 text-sm mb-1">{k.suffix}</span>}
            </div>
            <div className="mt-1 text-xs text-slate-400">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <div className="text-sm font-semibold text-slate-900">Review Collection Velocity</div>
            <div className="text-xs text-slate-500">Last 30 days · reviews received vs invites sent</div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-sm bg-cyan-500"></span>Reviews
            </span>
            <span className="flex items-center gap-1.5 text-slate-700">
              <span className="w-2.5 h-2.5 rounded-sm bg-teal-500/50"></span>Invites
            </span>
          </div>
        </div>
        <div className="h-48 flex items-end gap-2 md:gap-4">
          {velocity.map((v) => (
            <div key={v.day} className="flex-1 flex flex-col items-center gap-1.5 group">
              <div className="w-full h-full flex items-end justify-center gap-1">
                <div
                  className="w-1/2 rounded-t bg-gradient-to-t from-cyan-600 to-cyan-400 transition-all group-hover:from-cyan-500 group-hover:to-cyan-300"
                  style={{ height: `${(v.reviews / maxReviews) * 100}%` }}
                  title={`${v.reviews} reviews`}
                ></div>
                <div
                  className="w-1/2 rounded-t bg-teal-500/40 group-hover:bg-teal-500/60 transition-all"
                  style={{ height: `${(v.invites / 410) * 100}%` }}
                  title={`${v.invites} invites`}
                ></div>
              </div>
              <span className="text-[9px] font-mono text-slate-400 whitespace-nowrap">{v.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}