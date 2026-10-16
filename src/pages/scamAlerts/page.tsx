import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { supabase } from '@/lib/supabase';

interface FlaggedEntry {
  id: string;
  file_name: string;
  compound: string | null;
  vendor_name: string | null;
  verdict: 'suspicious' | 'tampered';
  confidence: number;
  submitted_at: string;
  status: string;
}

const verdictStyle = {
  tampered: { label: 'Tampered', cls: 'bg-red-50 text-red-700 border-red-200' },
  suspicious: { label: 'Suspicious', cls: 'bg-amber-50 text-amber-700 border-amber-200' },
};

function AppealModal({ entry, onClose }: { entry: FlaggedEntry; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!email.includes('@') || reason.trim().length < 10) return;
    setLoading(true);
    await supabase
      .from('flagged_coas')
      .update({ status: 'appealed', appeal_email: email, appeal_reason: reason, appealed_at: new Date().toISOString() })
      .eq('id', entry.id);
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 w-full max-w-md shadow-xl">
        {done ? (
          <div className="text-center py-4">
            <i className="ri-checkbox-circle-line text-4xl text-teal-600"></i>
            <h3 className="mt-3 font-semibold text-slate-900">Appeal submitted</h3>
            <p className="mt-1 text-sm text-slate-500">We will review this within 48 hours and contact you at the email provided.</p>
            <button onClick={onClose} className="mt-5 w-full px-4 py-2.5 rounded-md text-sm font-medium border border-slate-200 hover:bg-slate-50">Close</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900">Appeal this listing</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><i className="ri-close-line text-xl"></i></button>
            </div>
            <p className="text-xs text-slate-500 mb-4">If you believe this document was incorrectly flagged, submit your contact details and explanation. Our team reviews every appeal within 48 hours.</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Your email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-md bg-slate-50 border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1">Reason for appeal</label>
                <textarea
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  rows={3}
                  placeholder="Explain why this document is legitimate and provide any supporting evidence (e.g. original lab portal URL, report number)."
                  className="w-full rounded-md bg-slate-50 border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50 resize-none"
                />
              </div>
            </div>
            <button
              onClick={submit}
              disabled={loading || !email.includes('@') || reason.trim().length < 10}
              className="mt-4 w-full px-4 py-2.5 rounded-md text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-teal-500 border border-cyan-400/30 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? <><i className="ri-loader-4-line animate-spin mr-1.5"></i>Submitting…</> : 'Submit appeal'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function ScamAlerts() {
  const [entries, setEntries] = useState<FlaggedEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [appealTarget, setAppealTarget] = useState<FlaggedEntry | null>(null);

  useEffect(() => {
    supabase
      .from('flagged_coas')
      .select('id, file_name, compound, vendor_name, verdict, confidence, submitted_at, status')
      .eq('status', 'confirmed')
      .order('submitted_at', { ascending: false })
      .then(({ data }) => {
        setEntries((data as FlaggedEntry[]) ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />

      {appealTarget && <AppealModal entry={appealTarget} onClose={() => setAppealTarget(null)} />}

      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(239,68,68,0.06) 0%, transparent 70%)' }}></div>
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-semibold text-red-600 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            Community-submitted · Admin-reviewed · Appeal available
          </div>
          <h1 className="font-display font-extrabold text-slate-900 text-4xl md:text-5xl tracking-tight leading-tight">
            Flagged COA Registry
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            Certificates of analysis flagged by our AI verifier and confirmed by a human reviewer as showing signs of tampering or fabrication. Every listing can be appealed.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/coa-verifier"
              className="whitespace-nowrap px-5 py-3 rounded-full text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-teal-500 border border-cyan-400/30"
            >
              <i className="ri-shield-check-line mr-1.5"></i>Verify a COA
            </Link>
            <a
              href="#how-it-works"
              className="whitespace-nowrap px-5 py-3 rounded-full text-sm font-medium text-slate-600 border border-slate-200 hover:border-slate-300"
            >
              How listings work
            </a>
          </div>
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pb-8">
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: 'ri-file-search-line', label: 'COAs submitted', value: '—', sub: 'Via verifier tool' },
            { icon: 'ri-eye-line', label: 'Under review', value: '—', sub: 'Awaiting admin' },
            { icon: 'ri-flag-2-line', label: 'Confirmed flags', value: String(entries.length || '0'), sub: 'Publicly listed' },
          ].map(s => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <i className={`${s.icon} text-2xl text-red-500`}></i>
              <div className="mt-2 font-display font-extrabold text-slate-900 text-3xl">{s.value}</div>
              <div className="text-xs font-semibold text-slate-700 mt-0.5">{s.label}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pb-24">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-display font-bold text-slate-900 text-xl">Confirmed Reports</h2>
          <span className="text-xs text-slate-400 font-mono">{entries.length} listing{entries.length !== 1 ? 's' : ''}</span>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <i className="ri-loader-4-line animate-spin text-2xl text-slate-300"></i>
          </div>
        ) : entries.length === 0 ? (
          <div className="glass rounded-2xl p-12 text-center">
            <i className="ri-shield-check-line text-4xl text-teal-400"></i>
            <h3 className="mt-4 font-semibold text-slate-900 text-lg">No confirmed reports yet</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">
              All AI-flagged submissions are pending human review before appearing here. Check back soon, or submit a suspicious COA through the verifier.
            </p>
            <Link to="/coa-verifier" className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-full text-sm font-medium border border-slate-200 hover:border-cyan-400 text-slate-700 transition-all">
              <i className="ri-upload-cloud-2-line"></i>Upload a COA to verify
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {entries.map(e => {
              const v = verdictStyle[e.verdict];
              return (
                <div key={e.id} className="glass rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${v.cls}`}>{v.label}</span>
                      <span className="text-[11px] font-mono text-slate-400">{e.confidence}% confidence</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-900 truncate">{e.file_name}</div>
                    <div className="flex flex-wrap gap-3 mt-1 text-xs text-slate-500">
                      {e.compound && <span><i className="ri-flask-line mr-1"></i>{e.compound}</span>}
                      {e.vendor_name && <span><i className="ri-store-2-line mr-1"></i>{e.vendor_name}</span>}
                      <span><i className="ri-calendar-line mr-1"></i>{new Date(e.submitted_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setAppealTarget(e)}
                    className="shrink-0 whitespace-nowrap text-xs font-medium px-3 py-2 rounded-md border border-slate-200 text-slate-600 hover:border-amber-400 hover:text-amber-700 transition-all"
                  >
                    <i className="ri-scales-line mr-1"></i>Appeal
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section id="how-it-works" className="border-t border-slate-100 bg-slate-50/50 py-16">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <h2 className="font-display font-bold text-slate-900 text-xl mb-8">How a document gets listed</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
            {[
              { step: '01', icon: 'ri-upload-cloud-2-line', title: 'Submitted', body: 'A researcher uploads a COA through the free verifier tool, entering their email to unlock the report.' },
              { step: '02', icon: 'ri-robot-line', title: 'AI analysis', body: 'The document is scanned for binary forensic flags, typography anomalies, and visual editing artifacts.' },
              { step: '03', icon: 'ri-eye-2-line', title: 'Human review', body: 'Flagged documents are queued for a VPR moderator. Nothing goes public on AI verdict alone.' },
              { step: '04', icon: 'ri-flag-2-fill', title: 'Public listing', body: 'Confirmed cases appear here with the verdict, compound, and vendor. Any party can appeal at any time.' },
            ].map(s => (
              <div key={s.step} className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono text-slate-400">{s.step}</span>
                  <i className={`${s.icon} text-lg text-red-500`}></i>
                </div>
                <div className="text-sm font-semibold text-slate-900 mb-1">{s.title}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{s.body}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-xs text-amber-800 leading-relaxed max-w-2xl">
            <i className="ri-information-line mr-1.5"></i>
            <strong>Disclaimer:</strong> Listings represent AI-assisted forensic analysis reviewed by human moderators. They are not legal findings. Vendors are encouraged to appeal any listing they believe is incorrect. VPR reserves the right to remove or update any listing based on new evidence.
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
