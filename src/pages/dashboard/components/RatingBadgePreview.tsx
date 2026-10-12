export const VPR_LOGO =
  'https://storage.helloreaddy.io/project_files/854b3747-006c-42e1-abd2-bcba4d069e28/0db37104-9f71-4c1f-8bfe-839afcb46169_compressed_exec-98d44e0c-a1a0-473f-822f-be22d2493962.webp';

export interface BadgeConfig {
  mode: 'light' | 'dark' | 'auto';
  accent: string;
  layout: 'stacked' | 'inline' | 'compact';
  radius: 'rounded' | 'soft' | 'square';
  stars: boolean;
  label: boolean;
  count: boolean;
  domain: boolean;
}

interface BadgePreviewProps {
  brand: string;
  score: number;
  reviews: number;
  domain: string;
  config: BadgeConfig;
}

export function ratingLabel(score: number): string {
  if (score >= 4.8) return 'Highest Safety Rating';
  if (score >= 4.6) return 'Excellent Trust Rating';
  if (score >= 4.4) return 'Strong Trust Rating';
  return 'Verified Trust Rating';
}

function palette(mode: BadgeConfig['mode']) {
  const dark = mode === 'dark';
  return {
    dark,
    bg: dark ? '#0B0F17' : '#FFFFFF',
    fg: dark ? '#FFFFFF' : '#0F172A',
    muted: dark ? 'rgba(255,255,255,0.58)' : 'rgba(15,23,42,0.58)',
    border: dark ? 'rgba(255,255,255,0.12)' : 'rgba(15,23,42,0.10)',
    surface: dark ? 'rgba(255,255,255,0.05)' : 'rgba(15,23,42,0.03)',
  };
}

function radiusPx(radius: BadgeConfig['radius'], compact: boolean) {
  if (compact) return '999px';
  if (radius === 'square') return '2px';
  if (radius === 'soft') return '8px';
  return '14px';
}

function VprLogo({ height = 34 }: { height?: number }) {
  return (
    <span
      className="inline-flex items-center justify-center shrink-0 overflow-hidden"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: Math.max(4, height * 0.16),
        padding: Math.max(3, height * 0.12),
        border: '1px solid rgba(15,23,42,0.08)',
      }}
    >
      <img
        src={VPR_LOGO}
        alt="VerifiedPeptideReviews verified badge logo"
        title="VerifiedPeptideReviews · Real reviews. Better research."
        className="object-contain block"
        style={{ height }}
      />
    </span>
  );
}

function StarRow({ filled, color, muted, size = 14 }: { filled: number; color: string; muted: string; size?: number }) {
  return (
    <div className="flex gap-0.5" aria-hidden="true">
      {[1, 2, 3, 4, 5].map((n) => (
        <i
          key={n}
          className={`${n <= filled ? 'ri-star-fill' : 'ri-star-line'}`}
          style={{ color: n <= filled ? color : muted, fontSize: size }}
        ></i>
      ))}
    </div>
  );
}

export default function RatingBadgePreview({ brand, score, reviews, domain, config }: BadgePreviewProps) {
  const p = palette(config.mode);
  const filled = Math.max(1, Math.min(5, Math.round(score)));
  const borderRadius = radiusPx(config.radius, config.layout === 'compact');

  // COMPACT PILL
  if (config.layout === 'compact') {
    return (
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 border"
        style={{ backgroundColor: p.bg, borderColor: p.border, borderRadius }}
      >
        <VprLogo height={20} />
        {config.stars && <StarRow filled={filled} color={config.accent} muted={p.muted} size={12} />}
        <span className="font-mono text-[11px] font-semibold" style={{ color: p.fg }}>
          {score.toFixed(1)}
        </span>
        {config.count && (
          <span className="font-mono text-[10px]" style={{ color: p.muted }}>
            · {reviews.toLocaleString()}
          </span>
        )}
      </div>
    );
  }

  // INLINE BAR
  if (config.layout === 'inline') {
    return (
      <div
        className="flex items-center gap-3 px-4 py-3 border flex-wrap"
        style={{ backgroundColor: p.bg, borderColor: p.border, borderRadius }}
      >
        <VprLogo height={28} />
        {config.stars && <StarRow filled={filled} color={config.accent} muted={p.muted} />}
        <span className="font-mono text-xs font-semibold" style={{ color: p.fg }}>
          {score.toFixed(1)} / 5
        </span>
        {config.label && (
          <span className="text-xs font-semibold" style={{ color: p.fg }}>
            {ratingLabel(score)}
          </span>
        )}
        {config.count && (
          <span className="font-mono text-[11px]" style={{ color: p.muted }}>
            · {reviews.toLocaleString()} reviews
          </span>
        )}
        {config.domain && (
          <>
            <span className="hidden sm:block h-4 w-px" style={{ backgroundColor: p.border }}></span>
            <span className="flex items-center gap-1 font-mono text-[10px]" style={{ color: p.muted }}>
              {domain}
              <i className="ri-arrow-right-up-line"></i>
            </span>
          </>
        )}
      </div>
    );
  }

  // STACKED CARD (default)
  return (
    <div className="px-5 py-5 border" style={{ backgroundColor: p.bg, borderColor: p.border, borderRadius }}>
      <div className="flex items-center gap-2.5">
        <VprLogo height={40} />
        <div className="text-[10px] font-mono uppercase tracking-[0.18em]" style={{ color: p.muted }}>
          Featured Review Rating
        </div>
      </div>

      {config.stars && (
        <div className="mt-4">
          <StarRow filled={filled} color={config.accent} muted={p.muted} size={15} />
        </div>
      )}

      {config.label && (
        <div className="mt-1.5 font-display font-bold text-sm" style={{ color: p.fg }}>
          {ratingLabel(score)}
        </div>
      )}

      {(
        <div className="mt-1 font-mono text-[11px]" style={{ color: p.muted }}>
          {score.toFixed(1)} / 5{config.count ? ` · ${reviews.toLocaleString()} reviews` : ''}
        </div>
      )}

      {config.domain && (
        <>
          <div className="mt-4 h-px" style={{ backgroundColor: p.border }}></div>
          <div className="mt-3 flex items-center gap-1 font-mono text-[10px]" style={{ color: p.muted }}>
            {domain}
            <i className="ri-arrow-right-up-line"></i>
          </div>
        </>
      )}
    </div>
  );
}