import { useState } from 'react';

const widgetTypes = [
  { id: 'float', name: 'Floating Trust Badge', desc: 'Fixed corner badge, always visible.', icon: 'ri-pushpin-2-line' },
  { id: 'inline', name: 'Inline Grid Carousel', desc: 'Embedded review grid on product pages.', icon: 'ri-layout-grid-line' },
  { id: 'sidebar', name: 'Sidebar Micro-Card', desc: 'Compact score card for sidebars.', icon: 'ri-layout-right-line' },
  { id: 'checkout', name: 'Checkout Trust Bar', desc: 'Thin verified strip above checkout CTA.', icon: 'ri-shopping-bag-3-line' },
];

const widgetThemes = [
  { id: 'obsidian', name: 'Obsidian', bg: '#07090E', fg: '#FFFFFF', accent: '#0EA5E9' },
  { id: 'graphite', name: 'Graphite', bg: '#141B2D', fg: '#E2E8F0', accent: '#14B8A6' },
  { id: 'ivory', name: 'Ivory', bg: '#F8FAFC', fg: '#0F172A', accent: '#0EA5E9' },
  { id: 'mint', name: 'Clinical Mint', bg: '#ECFDF5', fg: '#064E3B', accent: '#10B981' },
];

export default function EmbedStudio() {
  const [type, setType] = useState('inline');
  const [themeId, setThemeId] = useState('obsidian');
  const [showScore, setShowScore] = useState(true);
  const [showCount, setShowCount] = useState(true);
  const [copied, setCopied] = useState(false);

  const theme = widgetThemes.find((t) => t.id === themeId) || widgetThemes[0];
  const snippet = `<div data-vpr-widget="${type}" data-theme="${themeId}" data-vendor="evlv-peptides" data-score="${showScore}" data-count="${showCount}"></div>\n<script async src="https://cdn.verifiedpeptidereviews.com/embed.v4.min.js"></script>`;

  const copy = () => {
    navigator.clipboard?.writeText(snippet).catch(() => undefined);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-5">
      <div className="glass rounded-2xl p-6">
        <div className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-5">
          <i className="ri-code-s-slash-line text-cyan-600"></i>Embed Code Generator Studio
        </div>

        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3">Widget Type</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {widgetTypes.map((w) => (
            <button
              key={w.id}
              onClick={() => setType(w.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                type === w.id ? 'bg-cyan-500/10 border-cyan-500/40' : 'bg-slate-50 border-slate-200 hover:border-cyan-500/30'
              }`}
            >
              <i className={`${w.icon} text-lg ${type === w.id ? 'text-cyan-700' : 'text-slate-600'}`}></i>
              <div className="mt-2 text-sm font-semibold text-slate-900">{w.name}</div>
              <div className="mt-0.5 text-xs text-slate-500">{w.desc}</div>
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3">Color Theme</div>
        <div className="flex flex-wrap gap-2 mb-6">
          {widgetThemes.map((t) => (
            <button
              key={t.id}
              onClick={() => setThemeId(t.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                themeId === t.id ? 'border-cyan-500/40 bg-cyan-500/10' : 'border-slate-200 hover:border-cyan-500/30'
              }`}
            >
              <span className="w-4 h-4 rounded" style={{ backgroundColor: t.bg, border: `2px solid ${t.accent}` }}></span>
              <span className="text-xs text-slate-700">{t.name}</span>
            </button>
          ))}
        </div>

        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-3">Elements</div>
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setShowScore(!showScore)}
            className={`px-3 py-2 rounded-lg text-xs border transition-all ${
              showScore ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-800' : 'border-slate-200 text-slate-600'
            }`}
          >
            Star Score
          </button>
          <button
            onClick={() => setShowCount(!showCount)}
            className={`px-3 py-2 rounded-lg text-xs border transition-all ${
              showCount ? 'bg-cyan-500/15 border-cyan-500/40 text-cyan-800' : 'border-slate-200 text-slate-600'
            }`}
          >
            Review Count
          </button>
        </div>

        <div className="relative rounded-xl bg-slate-50 border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500">Embed Snippet</span>
            <button
              onClick={copy}
              className="whitespace-nowrap text-[11px] font-mono px-2.5 py-1 rounded-md bg-cyan-500/15 text-cyan-700 border border-cyan-500/30 hover:bg-cyan-500/25 transition-all"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-[11px] font-mono text-teal-700 whitespace-pre-wrap break-all leading-relaxed">{snippet}</pre>
          <div className="mt-3 text-[10px] font-mono text-slate-500">
            &lt;14KB gzipped · async loaded · zero layout shift
          </div>
        </div>
      </div>

      {/* PREVIEW */}
      <div className="glass rounded-2xl p-6">
        <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-4">Live Preview</div>
        <div className="rounded-xl overflow-hidden border border-slate-200" style={{ backgroundColor: theme.bg }}>
          <div className="p-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${theme.accent}22` }}>
                <i className="ri-shield-check-fill" style={{ color: theme.accent }}></i>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: theme.fg, opacity: 0.6 }}>
                Verified by VPR
              </span>
            </div>
            {showScore && (
              <div className="mt-4 flex items-center gap-2">
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <i key={n} className="ri-star-fill text-sm" style={{ color: n <= 5 ? '#10B981' : '#475569' }}></i>
                  ))}
                </div>
                <span className="font-mono font-bold text-sm" style={{ color: theme.fg }}>4.9</span>
              </div>
            )}
            {showCount && (
              <div className="mt-1 text-[11px] font-mono" style={{ color: theme.fg, opacity: 0.6 }}>
                3,821 verified reviews
              </div>
            )}
            <div className="mt-4 h-px" style={{ backgroundColor: `${theme.fg}22` }}></div>
            <div className="mt-3 text-[10px] font-mono" style={{ color: theme.fg, opacity: 0.45 }}>
              BPC-157 · COA batch KP-BPC-2409 verified
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs text-slate-500">
          Preview updates live as you change widget type, theme, and elements above.
        </div>
      </div>
    </div>
  );
}