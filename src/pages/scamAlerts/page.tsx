import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import { supabase } from '@/lib/supabase';

/* ─── Types ─────────────────────────────────────────────────────────────── */

interface FlaggedCoa {
  id: string;
  file_name: string;
  compound: string | null;
  vendor_name: string | null;
  verdict: 'suspicious' | 'tampered';
  confidence: number;
  submitted_at: string;
}

interface FlaggedVendor {
  id: string;
  vendor_name: string;
  website: string | null;
  category: 'fake_coa' | 'no_delivery' | 'bait_switch' | 'underdosed' | 'counterfeit' | 'other';
  description: string | null;
  submitted_at: string;
}

/* ─── Config ─────────────────────────────────────────────────────────────── */

const coaVerdict = {
  tampered:  { label: 'Tampered',  cls: 'bg-red-50 text-red-700 border-red-200',    icon: 'ri-close-circle-fill' },
  suspicious:{ label: 'Suspicious',cls: 'bg-amber-50 text-amber-700 border-amber-200', icon: 'ri-error-warning-fill' },
};

const vendorCategory = {
  fake_coa:    { label: 'Fake COA',       cls: 'bg-red-50 text-red-700 border-red-200',       icon: 'ri-file-damage-line' },
  no_delivery: { label: 'No Delivery',    cls: 'bg-orange-50 text-orange-700 border-orange-200', icon: 'ri-truck-line' },
  bait_switch: { label: 'Bait & Switch',  cls: 'bg-purple-50 text-purple-700 border-purple-200', icon: 'ri-swap-line' },
  underdosed:  { label: 'Underdosed',     cls: 'bg-amber-50 text-amber-700 border-amber-200',  icon: 'ri-flask-line' },
  counterfeit: { label: 'Counterfeit',    cls: 'bg-rose-50 text-rose-700 border-rose-200',     icon: 'ri-spy-line' },
  other:       { label: 'Reported',       cls: 'bg-slate-100 text-slate-600 border-slate-200', icon: 'ri-flag-line' },
};

/* ─── Appeal modal ───────────────────────────────────────────────────────── */

function AppealModal({ table, id, onClose }: { table: 'flagged_coas' | 'flagged_vendors'; id: string; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const submit = async () => {
    if (!email.includes('@') || reason.trim().length < 10) return;
    setLoading(true);
    await supabase.from(table).update({
      status: 'appealed',
      appeal_email: email,
      appeal_reason: reason,
      appealed_at: new Date().toISOString(),
    }).eq('id', id);
    setLoading(false);
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 w-full max-w-md shadow-2xl">
        {done ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 border border-teal-200 flex items-center justify-center mx-auto">
              <i className="ri-checkbox-circle-line text-3xl text-teal-600"></i>
            </div>
            <h3 className="mt-4 font-semibold text-slate-900 text-lg">Appeal submitted</h3>
            <p className="mt-2 text-sm text-slate-500">We review every appeal within 48 hours and will contact you at the email provided.</p>
            <button onClick={onClose} className="mt-6 w-full px-4 py-2.5 rounded-md text-sm font-medium border border-slate-200 hover:bg-slate-50">Close</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-slate-900">Appeal this listing</h3>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><i className="ri-close-line text-xl"></i></button>
            </div>
            <p className="text-xs text-slate-500 mb-5">Believe this is an error? Submit your contact details and explanation. Our team reviews every appeal within 48 hours.</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Your email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com"
                  className="w-full rounded-md bg-slate-50 border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Reason for appeal</label>
                <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3}
                  placeholder="Explain why this listing is incorrect. Provide supporting evidence where possible (original lab portal URL, order confirmation, report number)."
                  className="w-full rounded-md bg-slate-50 border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 resize-none" />
              </div>
            </div>
            <button onClick={submit} disabled={loading || !email.includes('@') || reason.trim().length < 10}
              className="mt-5 w-full px-4 py-3 rounded-md text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-teal-500 border border-cyan-400/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? <><i className="ri-loader-4-line animate-spin mr-1.5"></i>Submitting…</> : 'Submit appeal'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */

export default function PeptideScams() {
  const [tab, setTab] = useState<'coas' | 'vendors'>('vendors');
  const [coas, setCoas] = useState<FlaggedCoa[]>([]);
  const [vendors, setVendors] = useState<FlaggedVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [appeal, setAppeal] = useState<{ table: 'flagged_coas' | 'flagged_vendors'; id: string } | null>(null);

  useEffect(() => {
    Promise.all([
      supabase.from('flagged_coas').select('id,file_name,compound,vendor_name,verdict,confidence,submitted_at').eq('status','confirmed').order('submitted_at',{ascending:false}),
      supabase.from('flagged_vendors').select('id,vendor_name,website,category,description,submitted_at').eq('status','confirmed').order('submitted_at',{ascending:false}),
    ]).then(([c, v]) => {
      setCoas((c.data as FlaggedCoa[]) ?? []);
      setVendors((v.data as FlaggedVendor[]) ?? []);
      setLoading(false);
    });
  }, []);

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />
      {appeal && <AppealModal table={appeal.table} id={appeal.id} onClose={() => setAppeal(null)} />}

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-14 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(239,68,68,0.07) 0%, transparent 70%)' }}></div>
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-semibold text-red-600 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            Community-reported · Human-reviewed · Appeal available
          </div>
          <h1 className="font-display font-extrabold text-slate-900 text-4xl md:text-5xl tracking-tight">
            Peptide Scam Registry
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
            Two public registries — fabricated lab certificates and fraudulent vendors — curated by the research community and confirmed by our moderation team.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link to="/coa-verifier" className="whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-semibold text-slate-900 bg-gradient-to-r from-cyan-500 to-teal-500 border border-cyan-400/30">
              <i className="ri-shield-check-line mr-1.5"></i>Verify a COA
            </Link>
            <Link to="/vendors" className="whitespace-nowrap px-5 py-2.5 rounded-full text-sm font-medium text-slate-600 border border-slate-200 hover:border-slate-300">
              Browse vetted vendors
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stat strip ── */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { icon: 'ri-file-damage-line', color: 'text-red-500',   label: 'Fake COAs confirmed',   value: String(coas.length || 0) },
            { icon: 'ri-store-2-line',     color: 'text-orange-500', label: 'Scam vendors confirmed', value: String(vendors.length || 0) },
            { icon: 'ri-shield-check-line',color: 'text-teal-500',   label: 'Vetted vendors',         value: '51+' },
            { icon: 'ri-scales-line',      color: 'text-cyan-500',   label: 'Appeals resolved',       value: '—' },
          ].map(s => (
            <div key={s.label} className="glass rounded-2xl p-5 text-center">
              <i className={`${s.icon} text-2xl ${s.color}`}></i>
              <div className="mt-2 font-display font-extrabold text-slate-900 text-2xl">{s.value}</div>
              <div className="text-[11px] text-slate-400 mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Tab switcher ── */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 pb-24">
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            onClick={() => setTab('vendors')}
            className={`rounded-2xl border p-5 text-left transition-all ${
              tab === 'vendors'
                ? 'border-orange-300 bg-orange-50/60 shadow-sm'
                : 'border-slate-200 hover:border-orange-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tab === 'vendors' ? 'bg-orange-100' : 'bg-slate-100'}`}>
                <i className={`ri-store-2-line text-xl ${tab === 'vendors' ? 'text-orange-600' : 'text-slate-500'}`}></i>
              </div>
              {vendors.length > 0 && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">{vendors.length}</span>
              )}
            </div>
            <div className={`font-semibold text-base ${tab === 'vendors' ? 'text-slate-900' : 'text-slate-600'}`}>Scam Vendors</div>
            <div className="text-xs text-slate-400 mt-0.5">Vendors reported for fraud, no-delivery, or counterfeit products</div>
          </button>

          <button
            onClick={() => setTab('coas')}
            className={`rounded-2xl border p-5 text-left transition-all ${
              tab === 'coas'
                ? 'border-red-300 bg-red-50/60 shadow-sm'
                : 'border-slate-200 hover:border-red-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tab === 'coas' ? 'bg-red-100' : 'bg-slate-100'}`}>
                <i className={`ri-file-damage-line text-xl ${tab === 'coas' ? 'text-red-600' : 'text-slate-500'}`}></i>
              </div>
              {coas.length > 0 && (
                <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-red-100 text-red-700">{coas.length}</span>
              )}
            </div>
            <div className={`font-semibold text-base ${tab === 'coas' ? 'text-slate-900' : 'text-slate-600'}`}>Fake COAs</div>
            <div className="text-xs text-slate-400 mt-0.5">Certificates of analysis with confirmed signs of tampering or fabrication</div>
          </button>
        </div>

        {/* ── Scam Vendors list ── */}
        {tab === 'vendors' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display font-bold text-slate-900 text-xl">Scam Vendor Reports</h2>
                <p className="text-xs text-slate-400 mt-0.5">Vendors confirmed by moderators as operating fraudulently</p>
              </div>
              <span className="text-xs text-slate-400 font-mono">{vendors.length} confirmed</span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20"><i className="ri-loader-4-line animate-spin text-2xl text-slate-300"></i></div>
            ) : vendors.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50/40 p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto">
                  <i className="ri-store-2-line text-3xl text-orange-400"></i>
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">No confirmed vendor reports</h3>
                <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">Submitted reports sit in a moderation queue before appearing here. Know a scam vendor? Report them through the COA verifier or contact us.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {vendors.map(v => {
                  const cat = vendorCategory[v.category];
                  return (
                    <div key={v.id} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-orange-200 transition-colors">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center">
                        <i className={`${cat.icon} text-lg text-orange-500`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-sm font-bold text-slate-900">{v.vendor_name}</span>
                          <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${cat.cls}`}>{cat.label}</span>
                        </div>
                        {v.website && (
                          <div className="text-xs font-mono text-slate-400 truncate">{v.website}</div>
                        )}
                        {v.description && (
                          <div className="text-xs text-slate-500 mt-1 line-clamp-2">{v.description}</div>
                        )}
                        <div className="text-[11px] text-slate-400 mt-1.5 flex items-center gap-1">
                          <i className="ri-calendar-line"></i>Flagged {fmt(v.submitted_at)}
                        </div>
                      </div>
                      <button
                        onClick={() => setAppeal({ table: 'flagged_vendors', id: v.id })}
                        className="shrink-0 whitespace-nowrap text-xs font-medium px-3.5 py-2 rounded-lg border border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-700 transition-all"
                      >
                        <i className="ri-scales-line mr-1"></i>Appeal
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ── Fake COAs list ── */}
        {tab === 'coas' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-display font-bold text-slate-900 text-xl">Fake COA Reports</h2>
                <p className="text-xs text-slate-400 mt-0.5">Documents flagged by AI forensics and confirmed by a human reviewer</p>
              </div>
              <span className="text-xs text-slate-400 font-mono">{coas.length} confirmed</span>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20"><i className="ri-loader-4-line animate-spin text-2xl text-slate-300"></i></div>
            ) : coas.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-red-200 bg-red-50/40 p-12 text-center">
                <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto">
                  <i className="ri-file-damage-line text-3xl text-red-400"></i>
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">No confirmed fake COAs yet</h3>
                <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">AI-flagged documents wait in the moderation queue before going public. Got a suspicious COA? Run it through the free verifier.</p>
                <Link to="/coa-verifier" className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-full text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 transition-all">
                  <i className="ri-upload-cloud-2-line"></i>Verify a COA
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {coas.map(c => {
                  const verd = coaVerdict[c.verdict];
                  return (
                    <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-red-200 transition-colors">
                      <div className="w-11 h-11 shrink-0 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center">
                        <i className={`${verd.icon} text-lg text-red-500`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${verd.cls}`}>{verd.label}</span>
                          <span className="text-[11px] font-mono text-slate-400">{c.confidence}% confidence</span>
                        </div>
                        <div className="text-sm font-semibold text-slate-900 truncate">{c.file_name}</div>
                        <div className="flex flex-wrap gap-3 mt-1 text-xs text-slate-400">
                          {c.compound && <span><i className="ri-flask-line mr-1"></i>{c.compound}</span>}
                          {c.vendor_name && <span><i className="ri-store-2-line mr-1"></i>{c.vendor_name}</span>}
                          <span><i className="ri-calendar-line mr-1"></i>Flagged {fmt(c.submitted_at)}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => setAppeal({ table: 'flagged_coas', id: c.id })}
                        className="shrink-0 whitespace-nowrap text-xs font-medium px-3.5 py-2 rounded-lg border border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-700 transition-all"
                      >
                        <i className="ri-scales-line mr-1"></i>Appeal
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </section>

      {/* ── How it works ── */}
      <section className="border-t border-slate-100 bg-slate-50/60 py-16">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10">
          <h2 className="font-display font-bold text-slate-900 text-xl mb-8">How a listing is confirmed</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { n: '01', icon: 'ri-upload-cloud-2-line', t: 'Submitted', b: 'A researcher reports through the COA verifier or submits a vendor complaint directly.' },
              { n: '02', icon: 'ri-robot-line',          t: 'AI analysis', b: 'For COAs: binary forensics, typography checks, and visual artifact detection.' },
              { n: '03', icon: 'ri-eye-2-line',          t: 'Human review', b: 'Every submission is reviewed by a VPR moderator. Nothing is auto-published.' },
              { n: '04', icon: 'ri-flag-2-fill',         t: 'Public listing', b: 'Confirmed reports go live. Any named party can appeal at any time.' },
            ].map(s => (
              <div key={s.n} className="glass rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[10px] font-mono text-slate-400">{s.n}</span>
                  <i className={`${s.icon} text-lg text-red-400`}></i>
                </div>
                <div className="text-sm font-semibold text-slate-900 mb-1">{s.t}</div>
                <div className="text-xs text-slate-500 leading-relaxed">{s.b}</div>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-xs text-amber-800 leading-relaxed max-w-2xl">
            <i className="ri-information-line mr-1.5"></i>
            <strong>Disclaimer:</strong> Listings represent AI-assisted forensic analysis or community reports reviewed by human moderators — not legal findings. Any party may appeal. VPR reserves the right to update or remove any listing based on new evidence.
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
