import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

type ScanRow = {
  id: string;
  file_name: string;
  verdict: string;
  confidence: number | null;
  headline: string | null;
  company: string | null;
  product: string | null;
  scanned_at: string;
};

function getSessionId(): string {
  try {
    return localStorage.getItem('vpr_session_id') ?? '';
  } catch {
    return '';
  }
}

function verdictMeta(verdict: string): { label: string; icon: string; bg: string; text: string; dot: string } {
  switch (verdict) {
    case 'authentic':
      return { label: 'Authentic', icon: 'ri-shield-check-fill', bg: 'bg-emerald-50 border-emerald-200', text: 'text-emerald-800', dot: 'bg-emerald-500' };
    case 'minor_concerns':
      return { label: 'Minor Concerns', icon: 'ri-alert-fill', bg: 'bg-amber-50 border-amber-200', text: 'text-amber-800', dot: 'bg-amber-500' };
    case 'suspicious':
      return { label: 'Suspicious', icon: 'ri-spam-2-fill', bg: 'bg-rose-50 border-rose-200', text: 'text-rose-800', dot: 'bg-rose-500' };
    case 'tampered':
      return { label: 'Tampered', icon: 'ri-close-circle-fill', bg: 'bg-rose-50 border-rose-200', text: 'text-rose-800', dot: 'bg-rose-500' };
    default:
      return { label: 'Inconclusive', icon: 'ri-question-fill', bg: 'bg-slate-100 border-slate-200', text: 'text-slate-600', dot: 'bg-slate-400' };
  }
}

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export default function ScanLibrary() {
  const [scans, setScans] = useState<ScanRow[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchScans() {
    const sessionId = getSessionId();
    if (!sessionId) {
      setLoading(false);
      return;
    }
    const { data } = await supabase
      .from('coa_scans')
      .select('*')
      .eq('session_id', sessionId)
      .order('scanned_at', { ascending: false })
      .limit(50);
    setScans((data as ScanRow[]) ?? []);
    setLoading(false);
  }

  useEffect(() => {
    fetchScans();
    const onSaved = () => fetchScans();
    window.addEventListener('vpr:scan-saved', onSaved);
    return () => window.removeEventListener('vpr:scan-saved', onSaved);
  }, []);

  if (loading) return null;
  if (scans.length === 0) return null;

  return (
    <section className="relative py-16 border-t border-slate-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-cyan-600 mb-1">Your session</div>
            <h2 className="font-display font-extrabold text-slate-900 text-2xl tracking-tight">Scan History</h2>
          </div>
          <span className="text-xs text-slate-400">{scans.length} scan{scans.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scans.map((scan) => {
            const meta = verdictMeta(scan.verdict);
            const isPass = scan.verdict === 'authentic' || scan.verdict === 'minor_concerns';
            const isFail = scan.verdict === 'suspicious' || scan.verdict === 'tampered';
            return (
              <div
                key={scan.id}
                className={`rounded-xl border p-4 flex flex-col gap-2 ${meta.bg}`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${meta.dot}`}></span>
                    <span className="text-xs font-mono text-slate-500 truncate">{scan.file_name}</span>
                  </div>
                  <span className={`shrink-0 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${meta.text} ${isPass ? 'bg-emerald-100' : isFail ? 'bg-rose-100' : 'bg-slate-200'}`}>
                    <i className={meta.icon}></i>
                    {meta.label}
                  </span>
                </div>

                {scan.headline && (
                  <p className={`text-xs leading-relaxed ${meta.text}`}>{scan.headline}</p>
                )}

                <div className="flex items-center justify-between mt-auto pt-1 gap-3 flex-wrap">
                  <div className="flex items-center gap-3">
                    {scan.company && (
                      <span className="text-[11px] text-slate-500 truncate max-w-[120px]">{scan.company}</span>
                    )}
                    {scan.confidence != null && (
                      <span className="text-[11px] font-mono text-slate-400">{scan.confidence}% confidence</span>
                    )}
                  </div>
                  <span className="text-[11px] text-slate-400 whitespace-nowrap">{formatDate(scan.scanned_at)}</span>
                </div>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-[11px] text-slate-400">
          History is stored per browser session. Clear your browser data to reset it.
        </p>
      </div>
    </section>
  );
}
