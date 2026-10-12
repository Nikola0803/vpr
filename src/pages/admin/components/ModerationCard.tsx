import { publicVendors } from '@/mocks/vendors';
import { timeAgo } from '@/hooks/useVendorReviews';
import type { QueueReview } from '@/pages/admin/api';

interface ModerationCardProps {
  review: QueueReview;
  busy: boolean;
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

function vendorName(slug: string) {
  return publicVendors.find((v) => v.slug === slug)?.name ?? slug;
}

export default function ModerationCard({ review, busy, onApprove, onReject }: ModerationCardProps) {
  return (
    <article className="glass rounded-2xl p-5 md:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-display font-bold text-slate-900">{vendorName(review.vendor_slug)}</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              Pending
            </span>
            {review.verified_buyer && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                <i className="ri-verified-badge-line"></i>Verified Buyer
              </span>
            )}
            {review.has_lab && (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 border border-teal-200 flex items-center gap-1">
                <i className="ri-flask-line"></i>Lab Proof
              </span>
            )}
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] text-slate-500 font-mono">
            <span className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <i
                  key={n}
                  className={n <= review.rating ? 'ri-star-fill text-emerald-500' : 'ri-star-line text-slate-300'}
                ></i>
              ))}
              <span className="ml-1 text-slate-600">{review.rating}/5</span>
            </span>
            <span>· {review.compound || 'General'}</span>
            <span>· {review.author}</span>
            <span>· {timeAgo(review.created_at)}</span>
            {review.order_ref && <span>· #{review.order_ref}</span>}
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-slate-700 leading-relaxed">{review.body}</p>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {review.attachmentUrl ? (
          <a
            href={review.attachmentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-teal-700 hover:text-teal-600 flex items-center gap-1.5 whitespace-nowrap"
          >
            <i className="ri-file-pdf-2-line"></i>View attached lab proof
          </a>
        ) : review.has_lab ? (
          <span className="text-xs text-slate-400 flex items-center gap-1.5">
            <i className="ri-file-warning-line"></i>No file attached
          </span>
        ) : null}
        <span className="text-[10px] font-mono text-slate-400">Proof hash: {review.proof_hash}</span>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-end gap-3">
        <button
          type="button"
          disabled={busy}
          onClick={() => onReject(review.id)}
          className={`whitespace-nowrap px-4 py-2.5 rounded-md text-sm font-semibold border transition-colors ${
            busy ? 'text-slate-300 border-slate-200 cursor-not-allowed' : 'text-amber-700 border-amber-300 hover:bg-amber-50'
          }`}
        >
          <i className="ri-close-line mr-1"></i>Reject
        </button>
        <button
          type="button"
          disabled={busy}
          onClick={() => onApprove(review.id)}
          className={`whitespace-nowrap px-4 py-2.5 rounded-md text-sm font-semibold text-white transition-colors flex items-center gap-1.5 ${
            busy ? 'bg-slate-300 cursor-not-allowed' : 'bg-teal-600 hover:bg-teal-700'
          }`}
        >
          {busy ? (
            <>
              <i className="ri-loader-4-line animate-spin"></i>Working…
            </>
          ) : (
            <>
              <i className="ri-check-line"></i>Approve &amp; Publish
            </>
          )}
        </button>
      </div>
    </article>
  );
}