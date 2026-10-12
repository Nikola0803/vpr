import { competitorMatrix } from '@/mocks/seo';

const headers = ['Verified Peptide Reviews', 'Trustpilot', 'Reviews.io', 'Google', 'Facebook'];

function tone(value: string) {
  const v = value.toLowerCase();
  if (
    v.startsWith('yes') ||
    v.includes('none, you own') ||
    v.includes('native') ||
    v.includes('built-in') ||
    v.includes('self-hosted') ||
    v.includes('built for it')
  ) {
    return 'text-emerald-600';
  }
  if (v.includes('risk') || v === 'high' || v.includes('hostile')) return 'text-amber-600';
  if (v === 'no') return 'text-slate-500';
  return 'text-slate-700';
}

export default function CompetitorMatrix() {
  return (
    <section className="relative py-24 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-700 mb-3">Comparison</div>
          <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight">
            Verified Peptide Reviews vs. Trustpilot, Reviews.io, Google &amp; Facebook
          </h2>
        </div>

        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <div className="min-w-[860px]">
              <div className="grid grid-cols-6 px-6 py-5 border-b border-slate-200 bg-slate-50">
                <div className="text-[11px] font-mono uppercase tracking-widest text-slate-500">Feature</div>
                {headers.map((h, i) => (
                  <div
                    key={h}
                    className={`text-[11px] font-mono uppercase tracking-widest ${
                      i === 0 ? 'text-cyan-700' : 'text-slate-600'
                    }`}
                  >
                    {h}
                  </div>
                ))}
              </div>

              {competitorMatrix.map((row, i) => (
                <div
                  key={row.feature}
                  className={`grid grid-cols-6 px-6 py-4 items-center ${
                    i % 2 === 0 ? 'bg-transparent' : 'bg-slate-50'
                  } hover:bg-cyan-500/[0.03] transition-colors`}
                >
                  <div className="text-sm text-slate-800 pr-4">{row.feature}</div>
                  <div className="text-sm font-medium text-emerald-700 pr-4">{row.us}</div>
                  <div className={`text-sm pr-4 ${tone(row.trustpilot)}`}>{row.trustpilot}</div>
                  <div className={`text-sm pr-4 ${tone(row.reviewsio)}`}>{row.reviewsio}</div>
                  <div className={`text-sm pr-4 ${tone(row.google)}`}>{row.google}</div>
                  <div className={`text-sm ${tone(row.facebook)}`}>{row.facebook}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}