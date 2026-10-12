import { Link } from 'react-router-dom';

interface QuickActionsProps {
  onNavigate: (id: string) => void;
}

export default function QuickActions({ onNavigate }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Link
        to="/migration#request"
        className="group relative overflow-hidden rounded-2xl p-5 flex items-start gap-4 bg-teal-50 border border-teal-200 hover:border-teal-400 transition-colors"
      >
        <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-teal-500/10 blur-2xl"></div>
        <div className="relative w-11 h-11 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-teal-500 to-emerald-500 text-white">
          <i className="ri-archive-drawer-line text-lg"></i>
        </div>
        <div className="relative">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900">Migrate my reviews</span>
            <span className="text-[9px] font-mono uppercase tracking-widest text-teal-700 bg-white border border-teal-200 px-1.5 py-0.5 rounded">
              Rescue
            </span>
          </div>
          <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
            Move your review history off hosted platforms onto your own domain before it can be deleted.
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-teal-700">
            Start a migration request
            <i className="ri-arrow-right-line transition-transform group-hover:translate-x-0.5"></i>
          </span>
        </div>
      </Link>

      <button
        type="button"
        onClick={() => onNavigate('invites')}
        className="glass glass-hover rounded-2xl p-5 flex items-start gap-4 text-left"
      >
        <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/25 text-cyan-700">
          <i className="ri-send-plane-line text-lg"></i>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">Invite researchers</div>
          <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
            Connect your store and let order-success automation request reviews for you.
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-cyan-700">
            Open invite engine
            <i className="ri-arrow-right-line"></i>
          </span>
        </div>
      </button>

      <button
        type="button"
        onClick={() => onNavigate('embeds')}
        className="glass glass-hover rounded-2xl p-5 flex items-start gap-4 text-left"
      >
        <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center bg-gradient-to-br from-emerald-500/20 to-teal-500/10 border border-emerald-500/25 text-emerald-700">
          <i className="ri-code-s-slash-line text-lg"></i>
        </div>
        <div>
          <div className="text-sm font-semibold text-slate-900">Embed reviews</div>
          <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
            Generate widgets with schema markup so reviews and star ratings show on your site.
          </p>
          <span className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700">
            Open embed studio
            <i className="ri-arrow-right-line"></i>
          </span>
        </div>
      </button>
    </div>
  );
}