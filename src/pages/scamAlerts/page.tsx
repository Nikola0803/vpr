import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
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
  tampered:   { label: 'Tampered',   cls: 'bg-red-50 text-red-700 border-red-200',    icon: 'ri-close-circle-fill' },
  suspicious: { label: 'Suspicious', cls: 'bg-amber-50 text-amber-700 border-amber-200', icon: 'ri-error-warning-fill' },
};

const vendorCategory = {
  fake_coa:    { label: 'Fake COA',      cls: 'bg-red-50 text-red-700 border-red-200',        icon: 'ri-file-damage-line' },
  no_delivery: { label: 'No Delivery',   cls: 'bg-orange-50 text-orange-700 border-orange-200', icon: 'ri-truck-line' },
  bait_switch: { label: 'Bait & Switch', cls: 'bg-purple-50 text-purple-700 border-purple-200', icon: 'ri-swap-line' },
  underdosed:  { label: 'Underdosed',    cls: 'bg-amber-50 text-amber-700 border-amber-200',   icon: 'ri-flask-line' },
  counterfeit: { label: 'Counterfeit',   cls: 'bg-rose-50 text-rose-700 border-rose-200',      icon: 'ri-spy-line' },
  other:       { label: 'Reported',      cls: 'bg-slate-100 text-slate-600 border-slate-200',  icon: 'ri-flag-line' },
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
            <p className="text-xs text-slate-500 mb-5">Believe this is an error? Our team reviews every appeal within 48 hours.</p>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Your email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@company.com"
                  className="w-full rounded-md bg-slate-50 border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 mb-1.5">Reason for appeal</label>
                <textarea value={reason} onChange={e => setReason(e.target.value)} rows={3}
                  placeholder="Why is this listing incorrect? Include any evidence — lab portal URL, order confirmation, report number."
                  className="w-full rounded-md bg-slate-50 border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 resize-none" />
              </div>
            </div>
            <button onClick={submit} disabled={loading || !email.includes('@') || reason.trim().length < 10}
              className="mt-5 w-full px-4 py-3 rounded-md text-sm font-semibold bg-gradient-to-r from-cyan-500 to-teal-500 text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? <><i className="ri-loader-4-line animate-spin mr-1.5"></i>Submitting…</> : 'Submit appeal'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Report Vendor modal ────────────────────────────────────────────────── */

function ReportVendorModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({ vendor_name: '', website: '', category: 'other', description: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const valid = form.vendor_name.trim().length >= 2
    && form.description.trim().length >= 20
    && form.email.includes('@');

  const submit = async () => {
    if (!valid) return;
    setLoading(true);
    setError('');
    const { error: err } = await supabase.from('flagged_vendors').insert({
      vendor_name: form.vendor_name.trim(),
      website: form.website.trim() || null,
      category: form.category,
      description: form.description.trim(),
      submitted_by_email: form.email.trim(),
      status: 'pending',
    });
    setLoading(false);
    if (err) { setError('Submission failed. Please try again.'); return; }
    setDone(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl border border-slate-200 p-6 w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        {done ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-2xl bg-orange-50 border border-orange-200 flex items-center justify-center mx-auto">
              <i className="ri-checkbox-circle-line text-3xl text-orange-500"></i>
            </div>
            <h3 className="mt-4 font-bold text-slate-900 text-xl">Report received</h3>
            <p className="mt-2 text-sm text-slate-500 max-w-xs mx-auto">Our moderation team reviews every report within 24–48 hours. If confirmed, it will appear on the public registry. We'll contact you at the email provided.</p>
            <div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-left">
              <p className="text-xs font-semibold text-slate-600 mb-2">What happens next</p>
              <ol className="text-xs text-slate-500 space-y-1 list-decimal list-inside">
                <li>Moderator reviews your submission + any evidence</li>
                <li>If confirmed, vendor is publicly listed</li>
                <li>Vendor can appeal — we notify you of the outcome</li>
              </ol>
            </div>
            <button onClick={onClose} className="mt-5 w-full px-4 py-2.5 rounded-md text-sm font-medium border border-slate-200 hover:bg-slate-50">Close</button>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="font-bold text-slate-900 text-lg">Report a scam vendor</h3>
                <p className="text-xs text-slate-400 mt-0.5">Goes to moderation queue · Not published automatically</p>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600 ml-4 shrink-0"><i className="ri-close-line text-xl"></i></button>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-700 leading-relaxed">
              <i className="ri-information-line mr-1.5"></i>
              <strong>Include as much evidence as possible.</strong> Order confirmations, tracking numbers, lab report links, screenshots. The more detail you provide, the faster we can confirm.
            </div>

            <div className="mt-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Vendor name <span className="text-red-500">*</span></label>
                  <input type="text" value={form.vendor_name} onChange={e => set('vendor_name', e.target.value)} placeholder="e.g. PeptidesXYZ"
                    className="w-full rounded-md bg-slate-50 border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Website / URL</label>
                  <input type="url" value={form.website} onChange={e => set('website', e.target.value)} placeholder="https://..."
                    className="w-full rounded-md bg-slate-50 border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Violation type <span className="text-red-500">*</span></label>
                  <select value={form.category} onChange={e => set('category', e.target.value)}
                    className="w-full rounded-md bg-slate-50 border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30">
                    <option value="fake_coa">Fake COA / Lab report</option>
                    <option value="no_delivery">No delivery / ghost vendor</option>
                    <option value="bait_switch">Bait & switch product</option>
                    <option value="underdosed">Underdosed / low purity</option>
                    <option value="counterfeit">Counterfeit / rebranded</option>
                    <option value="other">Other fraud</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                  What happened? <span className="text-red-500">*</span>
                  <span className="font-normal text-slate-400 ml-1">({form.description.trim().length}/20 min)</span>
                </label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4}
                  placeholder="Describe what happened in detail. Include order numbers, tracking info, lab results, timestamps, or anything else that can help us verify this report."
                  className="w-full rounded-md bg-slate-50 border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30 resize-none" />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Your email <span className="text-red-500">*</span></label>
                <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com"
                  className="w-full rounded-md bg-slate-50 border border-slate-200 px-3 py-2.5 text-sm focus:outline-none focus:border-orange-400/60 focus:ring-1 focus:ring-orange-400/30" />
                <p className="text-[11px] text-slate-400 mt-1">Used only for follow-up on your report. Never published.</p>
              </div>
            </div>

            {error && <p className="mt-3 text-xs text-red-600 bg-red-50 rounded-md px-3 py-2">{error}</p>}

            <button onClick={submit} disabled={loading || !valid}
              className="mt-5 w-full px-4 py-3 rounded-md text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 transition-all disabled:opacity-40 disabled:cursor-not-allowed">
              {loading ? <><i className="ri-loader-4-line animate-spin mr-1.5"></i>Submitting…</> : <><i className="ri-flag-2-fill mr-1.5"></i>Submit report</>}
            </button>
            <p className="text-[11px] text-slate-400 text-center mt-2">Goes to moderation queue · Not visible to the public until reviewed</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ─── Main page ──────────────────────────────────────────────────────────── */

export default function PeptideScams() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [tab, setTab] = useState<'coas' | 'vendors'>(() =>
    searchParams.get('tab') === 'coas' ? 'coas' : 'vendors'
  );
  const [coas, setCoas] = useState<FlaggedCoa[]>([]);
  const [vendors, setVendors] = useState<FlaggedVendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [appeal, setAppeal] = useState<{ table: 'flagged_coas' | 'flagged_vendors'; id: string } | null>(null);
  const [reportModal, setReportModal] = useState(false);

  const switchTab = (t: 'coas' | 'vendors') => {
    setTab(t);
    setSearchParams({ tab: t }, { replace: true });
  };

  useEffect(() => {
    Promise.all([
      supabase.from('flagged_coas').select('id,file_name,compound,vendor_name,verdict,confidence,submitted_at')
        .eq('status', 'confirmed').order('confidence', { ascending: false }),
      supabase.from('flagged_vendors').select('id,vendor_name,website,category,description,submitted_at')
        .eq('status', 'confirmed').order('submitted_at', { ascending: false }),
    ]).then(([c, v]) => {
      setCoas((c.data as FlaggedCoa[]) ?? []);
      setVendors((v.data as FlaggedVendor[]) ?? []);
      setLoading(false);
    });
  }, []);

  const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans flex flex-col">
      <Navbar />
      {appeal && <AppealModal table={appeal.table} id={appeal.id} onClose={() => setAppeal(null)} />}
      {reportModal && <ReportVendorModal onClose={() => setReportModal(false)} />}

      {/* ── Hero ── */}
      <section className="relative pt-36 pb-10 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-10"></div>
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(239,68,68,0.09) 0%, transparent 65%)' }}></div>
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-200 text-xs font-semibold text-red-600 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            Community-reported · AI-verified · Human-reviewed · Appeal available
          </div>
          <h1 className="font-display font-extrabold text-slate-900 text-4xl md:text-5xl lg:text-6xl tracking-tight">
            Peptide Scam Registry
          </h1>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto">
            The community-run wall of shame for fake lab certificates and fraudulent vendors. Every listing passes AI forensics and human review before going public.
          </p>

          {/* ── Stat strip ── */}
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {[
              { icon: 'ri-file-damage-line', color: 'text-red-500',    label: 'Fake COAs',       value: loading ? '…' : String(coas.length) },
              { icon: 'ri-store-2-line',     color: 'text-orange-500', label: 'Scam Vendors',    value: loading ? '…' : String(vendors.length) },
              { icon: 'ri-shield-check-line',color: 'text-teal-500',   label: 'Vetted Vendors',  value: '51+' },
              { icon: 'ri-eye-2-line',       color: 'text-cyan-500',   label: 'Human-Reviewed',  value: '100%' },
            ].map(s => (
              <div key={s.label} className="glass rounded-2xl p-4 text-center">
                <i className={`${s.icon} text-xl ${s.color}`}></i>
                <div className="mt-1.5 font-display font-extrabold text-slate-900 text-2xl">{s.value}</div>
                <div className="text-[11px] text-slate-400 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tab switcher ── */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 w-full">
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => switchTab('vendors')}
            className={`rounded-2xl border p-5 text-left transition-all ${
              tab === 'vendors' ? 'border-orange-300 bg-orange-50/70 shadow-sm' : 'border-slate-200 hover:border-orange-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tab === 'vendors' ? 'bg-orange-100' : 'bg-slate-100'}`}>
                <i className={`ri-store-2-line text-xl ${tab === 'vendors' ? 'text-orange-600' : 'text-slate-500'}`}></i>
              </div>
              <div className="flex items-center gap-2">
                {vendors.length > 0 && <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">{vendors.length}</span>}
                {tab === 'vendors' && <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>}
              </div>
            </div>
            <div className={`font-bold text-base ${tab === 'vendors' ? 'text-slate-900' : 'text-slate-600'}`}>Scam Vendors</div>
            <div className="text-xs text-slate-400 mt-0.5">No-delivery ghosts, bait & switch, counterfeit, underdosed</div>
          </button>

          <button onClick={() => switchTab('coas')}
            className={`rounded-2xl border p-5 text-left transition-all ${
              tab === 'coas' ? 'border-red-300 bg-red-50/70 shadow-sm' : 'border-slate-200 hover:border-red-200 bg-white'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${tab === 'coas' ? 'bg-red-100' : 'bg-slate-100'}`}>
                <i className={`ri-file-damage-line text-xl ${tab === 'coas' ? 'text-red-600' : 'text-slate-500'}`}></i>
              </div>
              <div className="flex items-center gap-2">
                {coas.length > 0 && <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-red-100 text-red-700">{coas.length}</span>}
                {tab === 'coas' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>}
              </div>
            </div>
            <div className={`font-bold text-base ${tab === 'coas' ? 'text-slate-900' : 'text-slate-600'}`}>Fake COAs</div>
            <div className="text-xs text-slate-400 mt-0.5">Lab certificates with confirmed tampering or fabrication — AI + human verified</div>
          </button>
        </div>
      </section>

      {/* ── Scam Vendors tab ── */}
      {tab === 'vendors' && (
        <section className="max-w-[1100px] mx-auto px-6 md:px-10 w-full mt-6 pb-16">
          {/* Submit CTA */}
          <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 p-6 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                  <span className="text-xs font-bold text-orange-600 uppercase tracking-wide">Help protect the community</span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">Burned by a vendor?</h3>
                <p className="text-sm text-slate-500 mt-0.5">Submit a report with evidence. Goes to our moderation queue — never auto-published.</p>
              </div>
              <button onClick={() => setReportModal(true)}
                className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 shadow-sm hover:shadow-md transition-all whitespace-nowrap">
                <i className="ri-flag-2-fill"></i>Report a vendor
              </button>
            </div>

            <div className="mt-5 grid grid-cols-2 md:grid-cols-4 gap-2">
              {[
                { icon: 'ri-truck-line',      label: 'No Delivery' },
                { icon: 'ri-file-damage-line',label: 'Fake COA' },
                { icon: 'ri-flask-line',       label: 'Underdosed' },
                { icon: 'ri-swap-line',        label: 'Bait & Switch' },
              ].map(c => (
                <button key={c.label} onClick={() => setReportModal(true)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/70 border border-orange-100 text-xs text-slate-600 hover:border-orange-300 transition-all">
                  <i className={`${c.icon} text-orange-500`}></i>{c.label}
                </button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-orange-200/70">
              <p className="text-xs font-semibold text-slate-600 mb-2">What makes a strong report?</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { icon: 'ri-receipt-line',        t: 'Order confirmation',      b: 'Order ID, date, amount paid' },
                  { icon: 'ri-image-line',           t: 'Screenshots / photos',    b: 'Product, packaging, results' },
                  { icon: 'ri-external-link-line',   t: 'Lab report links',        b: 'Portal URLs if available' },
                ].map(s => (
                  <div key={s.t} className="flex items-start gap-2 p-3 rounded-lg bg-white/60 border border-orange-100">
                    <i className={`${s.icon} text-orange-400 mt-0.5 shrink-0`}></i>
                    <div>
                      <div className="text-xs font-semibold text-slate-700">{s.t}</div>
                      <div className="text-[11px] text-slate-400">{s.b}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Registry */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-slate-900 text-xl">Confirmed Scam Vendors</h2>
              <p className="text-xs text-slate-400 mt-0.5">Reviewed by a VPR moderator · Any party may appeal</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">{vendors.length} entries</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20"><i className="ri-loader-4-line animate-spin text-2xl text-slate-300"></i></div>
          ) : vendors.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50/40 p-14 text-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mx-auto">
                <i className="ri-store-2-line text-3xl text-orange-400"></i>
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">Registry is empty</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">Submitted reports sit in moderation before appearing here. Be the first to submit a report if you've been scammed.</p>
              <button onClick={() => setReportModal(true)} className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-full text-sm font-medium border border-orange-200 text-orange-600 hover:bg-orange-50 transition-all">
                <i className="ri-flag-2-fill"></i>Submit a report
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {vendors.map(v => {
                const cat = vendorCategory[v.category];
                return (
                  <div key={v.id} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row sm:items-start gap-4 hover:border-orange-200 transition-colors">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-orange-50 border border-orange-100 flex items-center justify-center mt-0.5">
                      <i className={`${cat.icon} text-lg text-orange-500`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-slate-900">{v.vendor_name}</span>
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${cat.cls}`}>{cat.label}</span>
                      </div>
                      {v.website && <div className="text-xs font-mono text-slate-400 truncate">{v.website}</div>}
                      {v.description && <div className="text-xs text-slate-500 mt-1.5 leading-relaxed line-clamp-3">{v.description}</div>}
                      <div className="text-[11px] text-slate-400 mt-2 flex items-center gap-1">
                        <i className="ri-calendar-line"></i>Flagged {fmt(v.submitted_at)}
                      </div>
                    </div>
                    <button onClick={() => setAppeal({ table: 'flagged_vendors', id: v.id })}
                      className="shrink-0 whitespace-nowrap text-xs font-medium px-3.5 py-2 rounded-lg border border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-700 transition-all">
                      <i className="ri-scales-line mr-1"></i>Appeal
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ── Fake COAs tab ── */}
      {tab === 'coas' && (
        <section className="max-w-[1100px] mx-auto px-6 md:px-10 w-full mt-6 pb-16">
          {/* Pipeline explainer */}
          <div className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-rose-50 p-6 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs font-bold text-red-600 uppercase tracking-wide">AI-verified pipeline</span>
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">How fake COAs end up here</h3>
            <p className="text-sm text-slate-500 mb-5">Every listing was submitted through our COA Verifier, passed AI forensic analysis, and was confirmed by a human moderator.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
              {[
                { n: '01', icon: 'ri-upload-cloud-2-line', t: 'Upload', b: 'Researcher uploads a suspicious PDF through the COA Verifier' },
                { n: '02', icon: 'ri-robot-line',           t: 'AI Forensics', b: 'Binary metadata, typography, pixel artifacts, and visual editing checks' },
                { n: '03', icon: 'ri-eye-2-line',           t: 'Human Review', b: 'A VPR moderator confirms the AI findings before publishing' },
                { n: '04', icon: 'ri-flag-2-fill',          t: 'Public Wall', b: 'Confirmed fakes go live. Any vendor can appeal at any time.' },
              ].map(s => (
                <div key={s.n} className="bg-white/70 rounded-xl border border-red-100 p-3">
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[10px] font-mono text-slate-400">{s.n}</span>
                    <i className={`${s.icon} text-base text-red-400`}></i>
                  </div>
                  <div className="text-xs font-bold text-slate-800 mb-0.5">{s.t}</div>
                  <div className="text-[11px] text-slate-500 leading-relaxed">{s.b}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-red-200/70">
              <div>
                <p className="text-sm font-semibold text-slate-700">Have a suspicious COA?</p>
                <p className="text-xs text-slate-500">Upload it to the free verifier — if flagged, it enters our review queue automatically.</p>
              </div>
              <Link to="/coa-verifier"
                className="shrink-0 flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-500 to-rose-500 shadow-sm hover:shadow-md transition-all whitespace-nowrap">
                <i className="ri-shield-check-line"></i>Verify a COA
              </Link>
            </div>
          </div>

          {/* Registry */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-display font-bold text-slate-900 text-xl">Confirmed Fake COAs</h2>
              <p className="text-xs text-slate-400 mt-0.5">Sorted by forensic confidence · Any party may appeal</p>
            </div>
            <span className="text-xs text-slate-400 font-mono">{coas.length} entries</span>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20"><i className="ri-loader-4-line animate-spin text-2xl text-slate-300"></i></div>
          ) : coas.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-red-200 bg-red-50/40 p-14 text-center">
              <div className="w-16 h-16 rounded-2xl bg-red-100 flex items-center justify-center mx-auto">
                <i className="ri-file-damage-line text-3xl text-red-400"></i>
              </div>
              <h3 className="mt-4 font-semibold text-slate-900">Registry is empty</h3>
              <p className="mt-2 text-sm text-slate-500 max-w-sm mx-auto">AI-flagged documents wait in the moderation queue before going public. Got a suspicious COA? Upload it for analysis.</p>
              <Link to="/coa-verifier" className="inline-flex items-center gap-2 mt-5 px-4 py-2.5 rounded-full text-sm font-medium border border-red-200 text-red-600 hover:bg-red-50 transition-all">
                <i className="ri-upload-cloud-2-line"></i>Verify a COA
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {coas.map(c => {
                const verd = coaVerdict[c.verdict];
                return (
                  <div key={c.id} className="rounded-2xl border border-slate-200 bg-white p-5 flex flex-col sm:flex-row sm:items-start gap-4 hover:border-red-200 transition-colors">
                    <div className="w-11 h-11 shrink-0 rounded-xl bg-red-50 border border-red-100 flex items-center justify-center mt-0.5">
                      <i className={`${verd.icon} text-lg text-red-500`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full border ${verd.cls}`}>{verd.label}</span>
                        <span className="text-[11px] font-mono font-bold text-slate-600">{c.confidence}% confidence</span>
                      </div>
                      <div className="text-sm font-semibold text-slate-900 truncate">{c.file_name}</div>
                      <div className="flex flex-wrap gap-3 mt-1.5 text-xs text-slate-400">
                        {c.compound && <span><i className="ri-flask-line mr-1"></i>{c.compound}</span>}
                        {c.vendor_name && <span><i className="ri-store-2-line mr-1"></i>{c.vendor_name}</span>}
                        <span><i className="ri-calendar-line mr-1"></i>Flagged {fmt(c.submitted_at)}</span>
                      </div>
                    </div>
                    <button onClick={() => setAppeal({ table: 'flagged_coas', id: c.id })}
                      className="shrink-0 whitespace-nowrap text-xs font-medium px-3.5 py-2 rounded-lg border border-slate-200 text-slate-500 hover:border-amber-300 hover:text-amber-700 transition-all">
                      <i className="ri-scales-line mr-1"></i>Appeal
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      )}

      {/* ── Legal disclaimer ── */}
      <div className="max-w-[1100px] mx-auto px-6 md:px-10 w-full pb-12">
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-xs text-amber-800 leading-relaxed">
          <i className="ri-information-line mr-1.5"></i>
          <strong>Disclaimer:</strong> Listings represent AI-assisted forensic analysis or community reports reviewed by human moderators — not legal findings. Any named party may appeal at any time. VPR reserves the right to update or remove any listing based on new evidence.
        </div>
      </div>

      <div className="flex-1"></div>
      <Footer />
    </div>
  );
}
