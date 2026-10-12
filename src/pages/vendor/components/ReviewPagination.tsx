interface ReviewPaginationProps {
  page: number;
  totalPages: number;
  total: number;
  start: number;
  end: number;
  onChange: (page: number) => void;
}

// Build a compact page list (e.g. 1 … 5 [6] 7 … 81) so long review streams do not
// render one button per page.
function pageWindow(current: number, total: number): (number | '…')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const out: (number | '…')[] = [];
  const push = (value: number | '…') => {
    if (out[out.length - 1] !== value) out.push(value);
  };

  push(1);
  if (current > 3) push('…');
  for (let p = Math.max(2, current - 1); p <= Math.min(total - 1, current + 1); p += 1) {
    push(p);
  }
  if (current < total - 2) push('…');
  push(total);
  return out;
}

export default function ReviewPagination({ page, totalPages, total, start, end, onChange }: ReviewPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = pageWindow(page, totalPages);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
      <span className="text-xs font-mono text-slate-500">
        Showing {start}–{end} of {total.toLocaleString()} reviews
      </span>

      <div className="flex items-center gap-1.5 flex-wrap justify-center">
        <button
          type="button"
          onClick={() => onChange(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
          className="w-9 h-9 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 transition-all cursor-pointer hover:border-cyan-500/40 hover:text-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-600"
        >
          <i className="ri-arrow-left-s-line"></i>
        </button>

        {pages.map((p, idx) =>
          p === '…' ? (
            <span
              key={`gap-${idx}`}
              className="w-9 h-9 flex items-center justify-center text-xs font-semibold text-slate-400"
            >
              …
            </span>
          ) : (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
              className={`w-9 h-9 rounded-md border text-xs font-semibold transition-all cursor-pointer ${
                p === page
                  ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-700'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-cyan-500/40 hover:text-cyan-700'
              }`}
            >
              {p}
            </button>
          ),
        )}

        <button
          type="button"
          onClick={() => onChange(page + 1)}
          disabled={page === totalPages}
          aria-label="Next page"
          className="w-9 h-9 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-600 transition-all cursor-pointer hover:border-cyan-500/40 hover:text-cyan-700 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-slate-200 disabled:hover:text-slate-600"
        >
          <i className="ri-arrow-right-s-line"></i>
        </button>
      </div>
    </div>
  );
}