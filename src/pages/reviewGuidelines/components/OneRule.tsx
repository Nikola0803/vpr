import { oneRule } from '@/mocks/reviewGuidelines';

interface Tier {
  id: string;
  label: string;
  title: string;
  icon: string;
  points: string[];
}

function TierCard({ tier }: { tier: Tier }) {
  const verified = tier.id === 'verified';
  const box = verified ? 'bg-emerald-500/10 border-emerald-500/25' : 'bg-slate-100 border-slate-200';
  const iconColor = verified ? 'text-emerald-600' : 'text-slate-600';
  const tag = verified ? 'text-emerald-600' : 'text-slate-500';

  return (
    <div className="glass rounded-2xl p-7 md:p-8">
      <div className="flex items-center justify-between">
        <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${box}`}>
          <i className={`${tier.icon} text-lg ${iconColor}`}></i>
        </div>
        <span className={`text-[11px] font-mono uppercase tracking-[0.16em] ${tag}`}>{tier.label}</span>
      </div>
      <h3 className="mt-5 font-display font-bold text-slate-900 text-xl">{tier.title}</h3>
      <ul className="mt-5 space-y-3">
        {tier.points.map((p) => (
          <li key={p} className="flex items-start gap-3">
            <span className="w-6 h-6 mt-0.5 shrink-0 flex items-center justify-center rounded-md bg-slate-100 border border-slate-200">
              <i className="ri-check-line text-xs text-teal-700"></i>
            </span>
            <span className="text-sm text-slate-700 leading-relaxed">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function OneRule() {
  return (
    <section className="relative py-24 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-3">
            {oneRule.eyebrow}
          </div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
            {oneRule.title}
            <span className="block mt-3 text-2xl md:text-3xl text-gradient-cyan tracking-tight">
              {oneRule.titleAccent}
            </span>
          </h2>
          <p className="mt-5 text-slate-600">{oneRule.lead}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {oneRule.tiers.map((t) => (
            <TierCard key={t.id} tier={t} />
          ))}
        </div>

        <div className="mt-6 relative glass rounded-2xl overflow-hidden p-7 md:p-9 text-center">
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[520px] h-[240px] rounded-full bg-teal-500/10 blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/25 text-[11px] font-mono uppercase tracking-[0.16em] text-teal-700 mb-4">
              <i className="ri-equalizer-line"></i>
              {oneRule.punchLead}
            </div>
            <p className="font-display font-bold text-slate-900 text-lg md:text-2xl leading-snug max-w-3xl mx-auto">
              {oneRule.punch}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}