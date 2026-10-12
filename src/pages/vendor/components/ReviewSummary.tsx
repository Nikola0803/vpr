import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Vendor } from '@/mocks/vendors';
import { getVendorAiSummary } from '@/pages/vendor/utils/vendorProfile';

export default function ReviewSummary({ vendor }: { vendor: Vendor }) {
  const [expanded, setExpanded] = useState(false);
  const [vote, setVote] = useState<'yes' | 'no' | null>(null);
  const summary = getVendorAiSummary(vendor);

  return (
    <section className="relative pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="glass rounded-2xl p-6 md:p-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-500/20 to-teal-500/10 border border-cyan-500/30 flex items-center justify-center">
                <i className="ri-robot-2-line text-xl text-cyan-700"></i>
              </div>
              <div>
                <div className="font-display font-bold text-slate-900 text-lg tracking-tight flex items-center gap-2">
                  Review summary
                  <span className="text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-700 border border-cyan-500/25">
                    AI
                  </span>
                </div>
                <div className="text-xs text-slate-500">Created with AI, based on recent reviews</div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-400 flex items-center gap-1.5">
              <i className="ri-refresh-line"></i>
              Updated weekly
            </span>
          </div>

          <p
            className={`mt-5 text-sm text-slate-700 leading-relaxed whitespace-pre-line ${
              expanded ? '' : 'line-clamp-4'
            }`}
          >
            {summary}
          </p>

          <button
            onClick={() => setExpanded((v) => !v)}
            className="mt-2.5 text-xs font-semibold text-cyan-700 hover:text-cyan-800 whitespace-nowrap flex items-center gap-1"
          >
            {expanded ? 'See less' : 'See more'}
            <i className={expanded ? 'ri-arrow-up-s-line' : 'ri-arrow-down-s-line'}></i>
          </button>

          <div className="mt-6 pt-5 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            {vote === null ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-700">Was this summary helpful?</span>
                <button
                  onClick={() => setVote('yes')}
                  aria-label="Yes, this summary was helpful"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-emerald-400 hover:text-emerald-600 transition-colors"
                >
                  <i className="ri-thumb-up-line"></i>
                </button>
                <button
                  onClick={() => setVote('no')}
                  aria-label="No, this summary was not helpful"
                  className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-600 hover:border-rose-400 hover:text-rose-600 transition-colors"
                >
                  <i className="ri-thumb-down-line"></i>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-emerald-700">
                <i className="ri-checkbox-circle-line"></i>
                Thanks. Your feedback helps improve these summaries.
              </div>
            )}

            <Link
              to="/verification"
              className="text-xs font-medium text-slate-500 hover:text-cyan-700 flex items-center gap-1.5 whitespace-nowrap"
            >
              <i className="ri-information-line"></i>
              How summaries and reviews are verified
            </Link>
          </div>

          <p className="mt-3 text-[11px] text-slate-400 leading-relaxed">
            AI-generated from recent verified reviews and may not reflect every individual experience. Summaries never
            edit, hide or replace the underlying reviews.
          </p>
        </div>
      </div>
    </section>
  );
}