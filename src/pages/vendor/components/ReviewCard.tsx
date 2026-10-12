import { useState } from 'react';
import type { VendorReview } from '@/mocks/vendorReviews';

export default function ReviewCard({ review: r }: { review: VendorReview }) {
  const [expanded, setExpanded] = useState(false);
  const long = r.body.length > 160;

  return (
    <div className="glass rounded-2xl p-6 glass-hover">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-900">{r.author}</span>
            <span className="text-[11px] font-mono text-slate-500">(Verified Order {r.order})</span>
          </div>
          <div className="mt-1 flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <i key={n} className={`${n <= r.rating ? 'ri-star-fill text-emerald-600' : 'ri-star-line text-slate-300'} text-xs`}></i>
              ))}
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">{r.compound}</span>
            <span className="text-[11px] text-slate-500">{r.date}</span>
          </div>
        </div>

        <div className="group relative">
          <div className="px-2.5 py-1.5 rounded-md bg-cyan-500/10 border border-cyan-500/30 text-cyan-700 text-[10px] font-mono flex items-center gap-1.5 cursor-help">
            <i className="ri-fingerprint-line"></i>Cryptographic Proof
          </div>
          <div className="absolute right-0 top-full mt-2 w-64 glass rounded-lg p-3 text-[11px] font-mono text-slate-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-30">
            Hash: <span className="text-cyan-700">{r.hash}</span>
            <br />Sealed: {r.ts}
            <br />Status: <span className="text-emerald-600">Immutable</span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        {r.verifiedBuyer && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 border border-emerald-500/25 flex items-center gap-1">
            <i className="ri-verified-badge-line"></i>Verified Buyer
          </span>
        )}
        {r.hasLab && (
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-700 border border-cyan-500/25 flex items-center gap-1">
            <i className="ri-flask-line"></i>With HPLC Proof
          </span>
        )}
      </div>

      <p className={`mt-4 text-sm text-slate-700 leading-relaxed ${!expanded && long ? 'line-clamp-3' : ''}`}>
        {r.body}
      </p>
      {long && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 text-xs font-medium text-cyan-700 hover:text-cyan-200 whitespace-nowrap"
        >
          {expanded ? 'Show less' : 'Read full review'}
        </button>
      )}

      {r.reply && (
        <div className="mt-4 ml-4 pl-4 border-l-2 border-cyan-500/30">
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-cyan-600">
            <i className="ri-verified-badge-line"></i>Verified Vendor Official Reply
          </div>
          <p className="mt-2 text-xs text-slate-600 leading-relaxed">{r.reply}</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-5 h-5 rounded-full bg-teal-500/20 border border-teal-500/30 flex items-center justify-center text-[9px] font-bold text-teal-700">
              {(r.replyBy || 'V').charAt(0)}
            </div>
            <span className="text-[10px] text-slate-500">{r.replyBy || 'Vendor Team'} · Vendor Team</span>
          </div>
        </div>
      )}
    </div>
  );
}