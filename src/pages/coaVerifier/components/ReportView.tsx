import { useState } from 'react';
import type { CoaReport, CheckStatus, Verdict } from '@/pages/coaVerifier/api';
import { supabase } from '@/lib/supabase';

const verdictConfig: Record<
  Verdict,
  { label: string; icon: string; wrap: string; accent: string; bar: string }
> = {
  authentic: {
    label: 'Authentic',
    icon: 'ri-shield-check-fill',
    wrap: 'border-emerald-200 bg-emerald-50',
    accent: 'text-emerald-700',
    bar: 'bg-emerald-500',
  },
  minor_concerns: {
    label: 'Minor concerns',
    icon: 'ri-error-warning-fill',
    wrap: 'border-amber-200 bg-amber-50',
    accent: 'text-amber-700',
    bar: 'bg-amber-500',
  },
  suspicious: {
    label: 'Suspicious',
    icon: 'ri-alert-fill',
    wrap: 'border-orange-200 bg-orange-50',
    accent: 'text-orange-700',
    bar: 'bg-orange-500',
  },
  tampered: {
    label: 'Likely tampered',
    icon: 'ri-close-circle-fill',
    wrap: 'border-rose-200 bg-rose-50',
    accent: 'text-rose-700',
    bar: 'bg-rose-500',
  },
  inconclusive: {
    label: 'Inconclusive',
    icon: 'ri-question-fill',
    wrap: 'border-slate-200 bg-slate-100',
    accent: 'text-slate-600',
    bar: 'bg-slate-400',
  },
};

const statusConfig: Record<CheckStatus, { icon: string; tone: string }> = {
  pass: { icon: 'ri-check-line', tone: 'text-emerald-600 bg-emerald-50 border-emerald-200' },
  warn: { icon: 'ri-error-warning-line', tone: 'text-amber-600 bg-amber-50 border-amber-200' },
  fail: { icon: 'ri-close-line', tone: 'text-rose-600 bg-rose-50 border-rose-200' },
  na: { icon: 'ri-subtract-line', tone: 'text-slate-400 bg-slate-100 border-slate-200' },
};

export default function ReportView({
  report,
  fileName,
  onReset,
}: {
  report: CoaReport;
  fileName: string;
  onReset: () => void;
}) {
  const v = verdictConfig[report.verdict];
  const [reportOpen, setReportOpen] = useState(false);
  const [reportCompany, setReportCompany] = useState(report.company ?? '');
  const [reportProduct, setReportProduct] = useState(report.product ?? '');
  const [reportDone, setReportDone] = useState(false);

  const submitReport = () => {
    if (!reportCompany.trim()) return;
    supabase.from('flagged_coas').insert({
      file_name: report.product ? `${report.product} COA` : 'Submitted COA',
      compound: reportProduct.trim() || report.product || null,
      vendor_name: reportCompany.trim(),
      verdict: report.verdict as 'suspicious' | 'tampered',
      confidence: report.confidence,
      status: 'pending',
    }).then(() => {}).catch(() => {});
    setReportDone(true);
  };

  return (
    <div className="space-y-5">
      {/* Verdict banner */}
      <div className={`rounded-2xl border p-6 ${v.wrap}`}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 shrink-0 rounded-xl bg-white border border-black/5 flex items-center justify-center">
            <i className={`${v.icon} text-2xl ${v.accent}`}></i>
          </div>
          <div className="min-w-0">
            <div className={`text-[11px] font-mono uppercase tracking-[0.18em] ${v.accent}`}>Verdict · {v.label}</div>
            <div className="mt-1.5 font-display font-extrabold text-slate-900 text-xl leading-snug">
              {report.headline}
            </div>
            <div className="mt-1 text-xs text-slate-500 truncate">{fileName}</div>
          </div>
        </div>

        <div className="mt-5">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="text-slate-600">Analysis confidence</span>
            <span className="font-mono text-slate-900">{report.confidence}%</span>
          </div>
          <div className="h-2 rounded-full bg-white/70 overflow-hidden">
            <div className={`h-full rounded-full ${v.bar}`} style={{ width: `${report.confidence}%` }}></div>
          </div>
        </div>

        {report.summary && <p className="mt-5 text-sm text-slate-700 leading-relaxed">{report.summary}</p>}

        {report.recommendation && (
          <p className="mt-3 text-xs text-slate-500 italic leading-relaxed">{report.recommendation}</p>
        )}
      </div>

      {/* Binary evidence - hard facts from PDF binary, not AI opinion */}
      {report.forensicFlags && report.forensicFlags.length > 0 && (
        <div className="rounded-2xl border border-rose-300 bg-rose-50 p-5">
          <div className="flex items-center gap-2 mb-3">
            <i className="ri-bug-2-fill text-rose-600 text-base"></i>
            <span className="text-sm font-bold text-rose-800 uppercase tracking-wide">Binary evidence - cannot be faked</span>
          </div>
          <ul className="space-y-2">
            {report.forensicFlags.map((flag, i) => {
              const label = flag.includes('ModDate') || flag.includes('ModDate') || flag.match(/edited after/i)
                ? 'DATE MISMATCH'
                : flag.match(/content stream/i)
                ? 'OVERLAY LAYERS'
                : flag.match(/metadata/i)
                ? 'METADATA STRIPPED'
                : 'FLAG';
              return (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="shrink-0 mt-0.5 text-[10px] font-black bg-rose-600 text-white px-1.5 py-0.5 rounded tracking-widest">
                    {label}
                  </span>
                  <span className="text-sm text-rose-900 leading-snug">{flag}</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Forensic checks - compact; detail only on warn/fail */}
      {report.checks.length > 0 && (
        <div className="glass rounded-2xl p-5">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
            <i className="ri-file-search-line text-cyan-600"></i>Forensic checks
          </div>
          <div className="space-y-2">
            {report.checks.map((c) => {
              const s = statusConfig[c.status] ?? statusConfig.na;
              const showDetail = (c.status === 'warn' || c.status === 'fail') && c.detail;
              return (
                <div key={c.id || c.label} className="flex items-start gap-2.5">
                  <span className={`w-6 h-6 shrink-0 rounded border flex items-center justify-center ${s.tone}`}>
                    <i className={`${s.icon} text-xs`}></i>
                  </span>
                  <div className="min-w-0 pt-0.5">
                    <span className="text-sm text-slate-800">{c.label}</span>
                    {showDetail && <p className="text-xs text-slate-500 leading-snug mt-0.5">{c.detail}</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          type="button"
          onClick={onReset}
          className="whitespace-nowrap px-6 py-3 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center justify-center gap-2"
        >
          <i className="ri-restart-line"></i>Verify another document
        </button>
      </div>

      {/* Report as fake - available on any non-authentic result */}
      {report.verdict !== 'authentic' && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          {reportDone ? (
            <div className="flex items-center gap-2 text-sm text-emerald-700 font-semibold">
              <i className="ri-checkbox-circle-fill"></i> Reported - thanks for helping the community.
            </div>
          ) : reportOpen ? (
            <div className="space-y-3">
              <div className="text-sm font-semibold text-slate-800">Who is selling this product?</div>
              <input
                type="text"
                placeholder="Vendor / brand name (e.g. Align Biosciences)"
                value={reportCompany}
                onChange={(e) => setReportCompany(e.target.value)}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
              />
              <input
                type="text"
                placeholder="Product name (optional)"
                value={reportProduct}
                onChange={(e) => setReportProduct(e.target.value)}
                className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-400/20"
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={submitReport}
                  disabled={!reportCompany.trim()}
                  className="px-4 py-2 rounded-md text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 disabled:opacity-50 transition-colors"
                >
                  Add to shame wall
                </button>
                <button
                  type="button"
                  onClick={() => setReportOpen(false)}
                  className="px-4 py-2 rounded-md text-sm font-semibold text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setReportOpen(true)}
              className="flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-700"
            >
              <i className="ri-spy-line"></i> Report this as a fake COA
            </button>
          )}
        </div>
      )}

      <p className="text-[11px] text-slate-400 leading-relaxed">
        COA Verifier is an assistive screening layer, not a legal certification. A clean result means no tampering
        signals were spotted in this pass - it is not a guarantee of authenticity.
      </p>
    </div>
  );
}