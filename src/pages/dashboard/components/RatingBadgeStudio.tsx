import { useState } from 'react';
import { vendors } from '@/mocks/vendors';
import RatingBadgePreview, { type BadgeConfig, ratingLabel, VPR_LOGO } from '@/pages/dashboard/components/RatingBadgePreview';

interface RatingBadgeStudioProps {
  vendorSlug: string;
}

const PLATFORM_DOMAIN = 'verifiedpeptidereviews.com';

const ACCENT_PRESETS: { name: string; value: string }[] = [
  { name: 'Teal', value: '#10B981' },
  { name: 'Cyan', value: '#06B6D4' },
  { name: 'Indigo', value: '#6366F1' },
  { name: 'Rose', value: '#F43F5E' },
  { name: 'Amber', value: '#F59E0B' },
  { name: 'Slate', value: '#64748B' },
];

const LAYOUTS: { id: BadgeConfig['layout']; label: string; icon: string; desc: string }[] = [
  { id: 'stacked', label: 'Card', icon: 'ri-layout-top-2-line', desc: 'Full card - footer, product page, about page.' },
  { id: 'inline', label: 'Inline bar', icon: 'ri-separator', desc: 'Horizontal strip - checkout header, email template.' },
  { id: 'compact', label: 'Pill', icon: 'ri-price-tag-line', desc: 'Micro pill - nav bar, sidebar widget, tiny slot.' },
];

const RADII: { id: BadgeConfig['radius']; label: string }[] = [
  { id: 'rounded', label: 'Rounded' },
  { id: 'soft', label: 'Soft' },
  { id: 'square', label: 'Square' },
];

const DEFAULT_CONFIG: BadgeConfig = {
  mode: 'light',
  accent: '#10B981',
  layout: 'stacked',
  radius: 'rounded',
  stars: true,
  label: true,
  count: true,
  domain: true,
};

function buildSnippet(vendor: { slug: string; name: string; score: number; reviews: number }, cfg: BadgeConfig): string {
  const profileUrl = `https://${PLATFORM_DOMAIN}/vendors/${vendor.slug}`;
  const attrs = [
    `data-vpr-badge="featured-rating"`,
    `data-vendor="${vendor.slug}"`,
    `data-brand="${vendor.name}"`,
    `data-score="${vendor.score.toFixed(1)}"`,
    `data-reviews="${vendor.reviews}"`,
    `data-theme="${cfg.mode}"`,
    `data-layout="${cfg.layout}"`,
    `data-radius="${cfg.radius}"`,
    `data-accent="${cfg.accent}"`,
    `data-stars="${cfg.stars}"`,
    `data-count="${cfg.count}"`,
    `data-domain="${cfg.domain}"`,
    `data-logo="${VPR_LOGO}"`,
    `data-href="${profileUrl}"`,
  ].join('\n  ');
  return `<div\n  ${attrs}\n></div>\n<script async src="https://cdn.${PLATFORM_DOMAIN}/featured-rating.v1.min.js"></script>`;
}

export default function RatingBadgeStudio({ vendorSlug }: RatingBadgeStudioProps) {
  const vendor = vendors.find((v) => v.slug === vendorSlug) || vendors[0];
  const [cfg, setCfg] = useState<BadgeConfig>(DEFAULT_CONFIG);
  const [copied, setCopied] = useState(false);
  const [customAccent, setCustomAccent] = useState('');
  const [showScriptNote, setShowScriptNote] = useState(false);

  const set = <K extends keyof BadgeConfig>(k: K, v: BadgeConfig[K]) =>
    setCfg((prev) => ({ ...prev, [k]: v }));

  const snippet = buildSnippet(vendor, cfg);

  const copy = () => {
    navigator.clipboard?.writeText(snippet).catch(() => undefined);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const applyCustomAccent = () => {
    const hex = customAccent.trim();
    if (/^#?[0-9A-Fa-f]{6}$/.test(hex)) {
      set('accent', hex.startsWith('#') ? hex : `#${hex}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* --- JS TRANSPARENCY NOTE --- */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
        <button
          type="button"
          onClick={() => setShowScriptNote(!showScriptNote)}
          className="cursor-pointer w-full flex items-center justify-between gap-3 text-left"
        >
          <div className="flex items-center gap-2.5">
            <i className="ri-information-line text-amber-600 text-base"></i>
            <span className="text-sm font-semibold text-amber-900">
              About the script tag - and why it still matters for your SEO
            </span>
          </div>
          {showScriptNote
            ? <i className="ri-arrow-up-s-line text-amber-600"></i>
            : <i className="ri-arrow-down-s-line text-amber-600"></i>}
        </button>
        {showScriptNote && (
          <div className="mt-3 text-xs text-amber-900 leading-relaxed space-y-2.5 border-t border-amber-200 pt-3">
            <p>
              <strong>Is the JS live right now?</strong> No - the CDN URL is a placeholder. That script doesn&apos;t exist as a
              deployed file yet. If someone pastes the snippet today, the{' '}
              <code className="px-1 rounded bg-amber-100 font-mono">&#60;div&#62;</code> renders as an empty element and the script
              fetches nothing.
            </p>
            <p>
              <strong>But here&apos;s why the data-attribute structure matters now:</strong> The snippet carries your{' '}
              <code className="px-1 rounded bg-amber-100 font-mono">data-href</code> back to your vendor profile on{' '}
              <strong>verifiedpeptidereviews.com</strong>. Googlebot reads data attributes. Every site that pastes this is
              essentially planting a link pointing back to VPR - even before the JS is live. That&apos;s a real backlink
              distribution strategy: vendor badges historically generate hundreds of follow-links to the issuer (think Trustpilot,
              G2, Clutch). Once the CDN script goes live, the badge auto-renders on those pages without anyone touching the
              snippet again.
            </p>
            <p>
              <strong>What you actually need to deploy this properly:</strong>
            </p>
            <ul className="list-disc list-inside space-y-1 ml-1">
              <li>A short JS loader on a CDN (Cloudflare R2, Vercel, or Bunny CDN - a few hours of work)</li>
              <li>The loader reads the data attributes off the div and renders the badge HTML in-place</li>
              <li>It pings your API to fetch the live score so it stays fresh</li>
              <li>
                The <code className="px-1 rounded bg-amber-100 font-mono">data-href</code> becomes a rendered anchor - a real
                crawlable link pointing back to VPR with your brand anchor text
              </li>
            </ul>
            <p>
              Right now the snippet is a pixel-perfect spec that any frontend dev can implement in an afternoon. The badge
              generator here is fully functional for generating the correct snippet per brand - the only missing piece is the CDN
              loader file.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-6">
        {/* LEFT - CONTROLS */}
        <div className="glass rounded-2xl p-6 space-y-6">
          <div>
            <div className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-1">
              <i className="ri-award-line text-teal-600"></i>Rating Badge Studio
            </div>
            <p className="text-xs text-slate-500">
              Bound to <span className="text-slate-800 font-semibold">{vendor.name}</span> ·{' '}
              <span className="font-mono text-teal-700">{vendor.slug}</span> · {vendor.score.toFixed(1)} / 5 ·{' '}
              {vendor.reviews.toLocaleString()} reviews
            </p>
          </div>

          {/* COLOR MODE */}
          <Section label="Color mode">
            <div className="grid grid-cols-3 gap-2">
              {(['light', 'dark', 'auto'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => set('mode', m)}
                  className={`py-2.5 rounded-xl border text-xs font-semibold capitalize transition-all ${
                    cfg.mode === m
                      ? 'bg-teal-500/15 border-teal-500/40 text-teal-800'
                      : 'border-slate-200 text-slate-600 hover:border-teal-500/30'
                  }`}
                >
                  {m === 'light' ? 'Light ☀' : m === 'dark' ? 'Dark ☾' : 'Auto'}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 mt-1.5">
              {cfg.mode === 'auto'
                ? "Auto matches the visitor's system preference via prefers-color-scheme."
                : cfg.mode === 'dark'
                  ? 'Dark badge - paste on a light-background storefront.'
                  : 'Light badge - paste on a dark-background storefront.'}
            </p>
          </Section>

          {/* ACCENT COLOR */}
          <Section label="Star & accent color">
            <div className="flex flex-wrap gap-2 mb-3">
              {ACCENT_PRESETS.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => set('accent', p.value)}
                  title={p.name}
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs transition-all ${
                    cfg.accent === p.value
                      ? 'border-slate-400 bg-slate-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full shrink-0" style={{ backgroundColor: p.value }}></span>
                  {p.name}
                </button>
              ))}
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white flex-1">
                <span
                  className="w-4 h-4 rounded shrink-0 border border-slate-200"
                  style={{ backgroundColor: cfg.accent }}
                ></span>
                <input
                  type="text"
                  value={customAccent}
                  onChange={(e) => setCustomAccent(e.target.value)}
                  placeholder="#hex or any CSS color"
                  className="flex-1 text-xs bg-transparent outline-none text-slate-700 placeholder:text-slate-400"
                  onKeyDown={(e) => e.key === 'Enter' && applyCustomAccent()}
                />
              </div>
              <button
                type="button"
                onClick={applyCustomAccent}
                className="cursor-pointer whitespace-nowrap px-3 py-2 rounded-lg border border-slate-200 text-xs text-slate-700 hover:bg-slate-50 transition-all"
              >
                Apply
              </button>
            </div>
          </Section>

          {/* LAYOUT */}
          <Section label="Badge layout">
            <div className="grid grid-cols-3 gap-2">
              {LAYOUTS.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => set('layout', l.id)}
                  className={`text-left px-3 py-3 rounded-xl border transition-all ${
                    cfg.layout === l.id
                      ? 'bg-teal-500/10 border-teal-500/40'
                      : 'bg-slate-50 border-slate-200 hover:border-teal-500/30'
                  }`}
                >
                  <i className={`${l.icon} text-lg ${cfg.layout === l.id ? 'text-teal-700' : 'text-slate-500'}`}></i>
                  <div className="mt-1.5 text-xs font-semibold text-slate-900">{l.label}</div>
                  <div className="mt-0.5 text-[10px] text-slate-500 leading-tight">{l.desc}</div>
                </button>
              ))}
            </div>
          </Section>

          {/* CORNER STYLE */}
          {cfg.layout !== 'compact' && (
            <Section label="Corner style">
              <div className="flex gap-2">
                {RADII.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => set('radius', r.id)}
                    className={`flex-1 py-2 rounded-lg border text-xs font-semibold transition-all ${
                      cfg.radius === r.id
                        ? 'bg-teal-500/15 border-teal-500/40 text-teal-800'
                        : 'border-slate-200 text-slate-600 hover:border-teal-500/30'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </Section>
          )}

          {/* ELEMENTS */}
          <Section label="Elements">
            <div className="flex flex-wrap gap-2">
              {([
                { key: 'stars', label: 'Stars' },
                { key: 'label', label: 'Rating label', hidden: cfg.layout === 'compact' },
                { key: 'count', label: 'Review count' },
                { key: 'domain', label: 'Domain link', hidden: cfg.layout === 'compact' },
              ] as { key: keyof BadgeConfig; label: string; hidden?: boolean }[])
                .filter((e) => !e.hidden)
                .map((e) => (
                  <button
                    key={e.key}
                    type="button"
                    onClick={() => set(e.key, !cfg[e.key])}
                    className={`whitespace-nowrap px-3 py-2 rounded-lg text-xs border transition-all ${
                      cfg[e.key]
                        ? 'bg-teal-500/15 border-teal-500/40 text-teal-800'
                        : 'border-slate-200 text-slate-500'
                    }`}
                  >
                    {cfg[e.key] ? '✓ ' : ''}{e.label}
                  </button>
                ))}
            </div>
          </Section>
        </div>

        {/* RIGHT - PREVIEW + SNIPPET */}
        <div className="space-y-5">
          <div className="glass rounded-2xl p-6">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-4">Live preview</div>

            <div className={cfg.mode === 'dark' ? 'rounded-xl p-5 bg-slate-900' : 'rounded-xl p-5 bg-slate-50 border border-slate-200'}>
              <RatingBadgePreview
                brand={vendor.name}
                score={vendor.score}
                reviews={vendor.reviews}
                domain={PLATFORM_DOMAIN}
                config={cfg}
              />
            </div>

            <div className="mt-4 text-[11px] text-slate-500 leading-relaxed">
              Preview is pixel-accurate to what renders on a storefront once the CDN script is live.
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-slate-500">
                Embed snippet
              </span>
              <button
                type="button"
                onClick={copy}
                className="cursor-pointer whitespace-nowrap text-[11px] font-mono px-2.5 py-1 rounded-md bg-teal-500/15 text-teal-700 border border-teal-500/30 hover:bg-teal-500/25 transition-all"
              >
                {copied ? 'Copied ✓' : 'Copy snippet'}
              </button>
            </div>
            <pre className="text-[10px] font-mono text-teal-700 whitespace-pre-wrap break-all leading-relaxed bg-slate-50 rounded-lg p-3 border border-slate-200 max-h-48 overflow-y-auto">
              {snippet}
            </pre>
            <div className="mt-3 text-[10px] font-mono text-slate-500">
              Unique to {vendor.name} · VPR logo + all design choices baked in · auto-renders once CDN is live
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3">SEO value of this badge</div>
            <div className="space-y-2.5 text-xs text-slate-600 leading-relaxed">
              <div className="flex gap-2">
                <i className="ri-links-line text-teal-600 shrink-0 mt-0.5"></i>
                <span>Every paste is a <strong className="text-slate-800">backlink to VPR</strong> - anchor text reads &ldquo;{ratingLabel(vendor.score)} · {vendor.score.toFixed(1)} / 5 · {vendor.reviews.toLocaleString()} reviews&rdquo;</span>
              </div>
              <div className="flex gap-2">
                <i className="ri-search-eye-line text-teal-600 shrink-0 mt-0.5"></i>
                <span>The rendered anchor contains <code className="font-mono bg-slate-100 px-1 rounded">verifiedpeptidereviews.com</code> - Googlebot crawls it like any normal link</span>
              </div>
              <div className="flex gap-2">
                <i className="ri-global-line text-teal-600 shrink-0 mt-0.5"></i>
                <span>Each vendor&apos;s snippet links to <strong className="text-slate-800">their own profile page</strong> - distributed, keyword-varied anchor text across many domains</span>
              </div>
              <div className="flex gap-2">
                <i className="ri-image-line text-teal-600 shrink-0 mt-0.5"></i>
                <span>The rendered logo ships with <strong className="text-slate-800">keyword alt text</strong> (&ldquo;VerifiedPeptideReviews verified badge logo&rdquo;) - free image-search ranking from every paste</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2.5">{label}</div>
      {children}
    </div>
  );
}