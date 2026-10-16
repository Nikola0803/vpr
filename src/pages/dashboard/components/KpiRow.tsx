const kpiDefs = [
  { label: 'Net Trust Score', suffix: '/5.0', icon: 'ri-shield-star-line', accent: 'cyan' },
  { label: 'Reviews Collected (30d)', suffix: '', icon: 'ri-chat-check-line', accent: 'teal' },
  { label: 'Invite Conversion Rate', suffix: '', icon: 'ri-mail-send-line', accent: 'emerald' },
  { label: 'Active Embed Impressions', suffix: '', icon: 'ri-code-s-slash-line', accent: 'cyan' },
];

const accentMap: Record<string, string> = {
  cyan: 'text-cyan-600 bg-cyan-500/10 border-cyan-500/25',
  teal: 'text-teal-600 bg-teal-500/10 border-teal-500/25',
  emerald: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/25',
};

export default function KpiRow() {
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiDefs.map((k) => (
          <div key={k.label} className="glass rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center border ${accentMap[k.accent]}`}>
                <i className={`${k.icon} text-lg`}></i>
              </div>
            </div>
            <div className="mt-4 flex items-end gap-1">
              <span className="font-display font-extrabold text-slate-300 text-3xl tracking-tight">--</span>
              {k.suffix && <span className="text-slate-400 text-sm mb-1">{k.suffix}</span>}
            </div>
            <div className="mt-1 text-xs text-slate-400">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div>
            <div className="text-sm font-semibold text-slate-900">Review Collection Velocity</div>
            <div className="text-xs text-slate-500">Last 30 days - reviews received vs invites sent</div>
          </div>
        </div>
        <div className="h-48 flex items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50">
          <div className="text-center">
            <i className="ri-bar-chart-2-line text-3xl text-slate-300"></i>
            <p className="mt-2 text-sm text-slate-400">No data yet</p>
            <p className="mt-1 text-xs text-slate-400">Connect your store to start collecting reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
}
