import { useMemo, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import CompanyPicker from '@/pages/rate/components/CompanyPicker';
import { publicVendors, type Vendor } from '@/mocks/vendors';
import { supabase } from '@/lib/supabase';

interface RatingState {
  purity: number;
  shipping: number;
  support: number;
}

const criteria = [
  { key: 'purity', label: 'Product Purity & Efficacy', desc: 'Did the compound match the stated purity and your expectations?', icon: 'ri-test-tube-line' },
  { key: 'shipping', label: 'Shipping Speed & Packaging', desc: 'Was it discreet, protected, and delivered on time?', icon: 'ri-truck-line' },
  { key: 'support', label: 'Researcher Support', desc: 'How responsive and helpful was the vendor?', icon: 'ri-customer-service-2-line' },
] as const;

function StarPicker({ value, onChange }: { value: number; onChange: (n: number) => void }) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex items-center gap-1.5" onMouseLeave={() => setHover(0)}>
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onMouseEnter={() => setHover(n)}
          onClick={() => onChange(n)}
          aria-label={`${n} stars`}
          className="w-9 h-9 flex items-center justify-center"
        >
          <i
            className={`${
              n <= (hover || value) ? 'ri-star-fill text-emerald-500' : 'ri-star-line text-slate-300'
            } text-2xl transition-colors`}
          ></i>
        </button>
      ))}
      <span className="ml-2 text-sm font-mono text-slate-500">{(hover || value) || '-'} / 5</span>
    </div>
  );
}

export default function RateReview() {
  const { orderHash } = useParams();
  const [searchParams] = useSearchParams();
  const requestedVendor = searchParams.get('vendor');
  const [step, setStep] = useState(1);
  const [vendor, setVendor] = useState<Vendor>(
    publicVendors.find((v) => v.slug === requestedVendor) || publicVendors[0],
  );
  const [orderRef, setOrderRef] = useState(orderHash || '');
  const [displayName, setDisplayName] = useState('');
  const [ratings, setRatings] = useState<RatingState>({ purity: 0, shipping: 0, support: 0 });
  const [body, setBody] = useState('');
  const [compound, setCompound] = useState('BPC-157 · 5mg');
  const [evidenceFile, setEvidenceFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [ruoNotice, setRuoNotice] = useState('');
  const [sealedHash, setSealedHash] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const hash = useMemo(() => {
    const seed = `${orderRef}${vendor.slug}${body.length}${ratings.purity}${ratings.shipping}${ratings.support}`;
    let h = 0;
    for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) % 0xffffff;
    const hex = h.toString(16).padStart(6, '0');
    return `0x${hex}…${(h * 7 % 0xffff).toString(16).padStart(4, '0')}`;
  }, [orderRef, vendor, body, ratings]);

  const average = ((ratings.purity + ratings.shipping + ratings.support) / 3).toFixed(1);
  const canProceed = ratings.purity > 0 && ratings.shipping > 0 && ratings.support > 0;
  const steps = ['Choose Company', 'Rate Experience', 'Written Feedback'];

  const reset = () => {
    setSubmitted(false);
    setStep(1);
    setRatings({ purity: 0, shipping: 0, support: 0 });
    setBody('');
    setEvidenceFile(null);
    setSubmitError('');
    setRuoNotice('');
    setSealedHash('');
    setOrderRef(orderHash || '');
    setDisplayName('');
  };

  const sealReview = async () => {
    setSubmitting(true);
    setSubmitError('');
    setRuoNotice('');
    try {
      let attachmentPath: string | null = null;
      if (evidenceFile) {
        const presign = await supabase.functions.invoke('submit-review', {
          body: { action: 'presign', vendorSlug: vendor.slug, fileName: evidenceFile.name },
        });
        const token = presign.data?.token as string | undefined;
        const path = presign.data?.path as string | undefined;
        if (presign.error || !token || !path) {
          throw new Error(presign.error?.message || 'Could not prepare the evidence upload.');
        }
        const upload = await supabase.storage.from('private').uploadToSignedUrl(path, token, evidenceFile);
        if (upload.error) throw upload.error;
        attachmentPath = path;
      }

      const overallRating = Math.max(1, Math.round((ratings.purity + ratings.shipping + ratings.support) / 3));
      const trimmedRef = orderRef.trim();
      const { data, error } = await supabase.functions.invoke('submit-review', {
        body: {
          action: 'create',
          vendorSlug: vendor.slug,
          rating: overallRating,
          body,
          compound,
          orderRef: trimmedRef || null,
          verifiedBuyer: trimmedRef.length > 0,
          authorName: displayName.trim() || null,
          hasLab: Boolean(evidenceFile),
          attachmentPath,
        },
      });
      if (error) throw error;
      if (data?.status === 'removed') {
        setRuoNotice(
          (data.message as string) ||
            'Your review was flagged by the Research Use Only language screen and was not published.',
        );
        return;
      }
      setSealedHash((data?.review?.proof_hash as string) || hash);
      setSubmitted(true);
    } catch (e) {
      setSubmitError(
        e instanceof Error ? e.message : 'Something went wrong while sealing your review. Please try again.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />

      <div className="max-w-[900px] mx-auto px-6 md:px-10 pt-32 pb-24">
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-6">
          <Link to="/" className="hover:text-teal-700">Home</Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="text-slate-600">Submit a Review</span>
        </div>

        <div className="max-w-2xl">
          <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-700">Public review intake</div>
          <h1 className="mt-3 font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight">
            Leave a review
          </h1>
          <p className="mt-3 text-sm text-slate-500 leading-relaxed">
            Pick the company you&apos;re reviewing and share your experience. Submissions are screened and held for
            moderation before they go live. Add an order reference to earn the Verified Buyer badge - it&apos;s optional.
          </p>
        </div>

        {/* COMPANY + TOKEN */}
        <div className="mt-8 glass rounded-2xl p-6">
          <div className="flex items-center justify-between gap-3 mb-3">
            <div className="text-sm font-semibold text-slate-900 flex items-center gap-2">
              <i className="ri-store-3-line text-teal-600"></i>Which company are you reviewing?
            </div>
            <div className="text-right hidden sm:block">
              <div className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Order ref</div>
              <div className="font-mono text-xs text-slate-600">{orderRef.trim() ? `#${orderRef}` : 'Optional'}</div>
            </div>
          </div>
          <CompanyPicker value={vendor} onChange={setVendor} />
          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-slate-50 border border-slate-200 px-3.5 py-2.5">
            <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">Live verification token</span>
            <span className="font-mono text-xs text-teal-700">{hash}</span>
          </div>
        </div>

        {/* STEPPER */}
        {!submitted && (
          <div className="mt-8 flex items-center justify-center">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center">
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono border transition-all ${
                      step > i + 1
                        ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
                        : step === i + 1
                        ? 'bg-teal-50 border-teal-400 text-teal-700'
                        : 'border-slate-200 text-slate-400'
                    }`}
                  >
                    {step > i + 1 ? <i className="ri-check-line"></i> : i + 1}
                  </div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider ${step === i + 1 ? 'text-teal-700' : 'text-slate-400'}`}>
                    {s}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className={`w-12 md:w-24 h-px mx-2 mb-5 ${step > i + 1 ? 'bg-emerald-300' : 'bg-slate-200'}`}></div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 glass rounded-2xl p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-6">
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-amber-50 border border-amber-200">
                <i className="ri-time-line text-4xl text-amber-600"></i>
              </div>
              <h2 className="mt-6 font-display font-extrabold text-slate-900 text-2xl">Review Submitted for Moderation</h2>
              <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto">
                Thanks for reviewing <span className="font-semibold text-slate-700">{vendor.name}</span>. Your submission has
                been sealed with a verification hash and is now queued for review - it will appear publicly once approved.
              </p>
              <div className="mt-6 inline-block text-left rounded-xl bg-slate-50 border border-slate-200 p-5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">Cryptographic Proof</div>
                <div className="space-y-1.5 font-mono text-xs">
                  <div className="text-slate-500">Hash: <span className="text-teal-700">{sealedHash || hash}</span></div>
                  <div className="text-slate-500">Company: <span className="text-slate-800">{vendor.name}</span></div>
                  <div className="text-slate-500">Order: <span className="text-slate-800">{orderRef.trim() ? `#${orderRef}` : 'Not provided'}</span></div>
                  <div className="text-slate-500">Status: <span className="text-amber-600">Pending moderation</span></div>
                </div>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                <Link
                  to={`/vendors/${vendor.slug}`}
                  className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                >
                  View {vendor.name}
                </Link>
                <button
                  onClick={reset}
                  className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold text-slate-700 border border-slate-200 hover:border-teal-400 transition-colors"
                >
                  Submit Another Review
                </button>
              </div>
            </div>
          ) : step === 2 ? (
            <div>
              <h2 className="font-display font-bold text-slate-900 text-xl">How was your experience with {vendor.name}?</h2>
              <p className="mt-1 text-sm text-slate-500">Rate each category independently, the vendor can&apos;t see this until you submit.</p>
              <div className="mt-7 space-y-4">
                {criteria.map((c) => (
                  <div key={c.key} className="rounded-xl bg-slate-50 border border-slate-200 p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-teal-50 border border-teal-200 text-teal-700 shrink-0">
                        <i className={`${c.icon} text-lg`}></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-semibold text-slate-900">{c.label}</div>
                        <div className="text-xs text-slate-500 mt-0.5">{c.desc}</div>
                        <div className="mt-3">
                          <StarPicker value={ratings[c.key]} onChange={(n) => setRatings({ ...ratings, [c.key]: n })} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-slate-500">
                  Average score: <span className="font-mono text-slate-900">{average}</span> / 5.0
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="whitespace-nowrap px-5 py-3 rounded-full text-sm font-semibold text-slate-600 border border-slate-200 hover:border-teal-400 transition-colors"
                  >
                    <i className="ri-arrow-left-line mr-1"></i>Back
                  </button>
                  <button
                    disabled={!canProceed}
                    onClick={() => setStep(3)}
                    className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold transition-colors ${
                      canProceed ? 'text-white bg-teal-600 hover:bg-teal-700' : 'text-slate-400 bg-slate-100 cursor-not-allowed'
                    }`}
                  >
                    Continue <i className="ri-arrow-right-line ml-1"></i>
                  </button>
                </div>
              </div>
            </div>
          ) : step === 3 ? (
            <div>
              <h2 className="font-display font-bold text-slate-900 text-xl">Tell us more</h2>
              <p className="mt-1 text-sm text-slate-500">Detailed reviews help fellow researchers make safer sourcing decisions.</p>

              <div className="mt-6">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Compound Purchased</label>
                <select
                  value={compound}
                  onChange={(e) => setCompound(e.target.value)}
                  className="mt-2 w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 outline-none focus:border-teal-400"
                >
                  {['BPC-157 · 5mg', 'Tirzepatide · 10mg', 'GHK-Cu · 50mg', 'TB-500 · 5mg', 'Retatrutide · 5mg'].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Your Review</label>
                  <span className="text-[11px] font-mono text-slate-400">{body.length} / 500</span>
                </div>
                <textarea
                  value={body}
                  maxLength={500}
                  onChange={(e) => setBody(e.target.value.slice(0, 500))}
                  rows={5}
                  placeholder="Purity results, reconstitution clarity, shipping time, support responsiveness…"
                  className="mt-2 w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-400 resize-none"
                ></textarea>
              </div>

              <div className="mt-5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-500">Attach Lab Evidence (optional)</label>
                <label className="mt-2 block rounded-xl border-2 border-dashed border-slate-200 hover:border-teal-400 bg-slate-50 p-6 text-center cursor-pointer transition-colors">
                  <input
                    type="file"
                    accept=".pdf,.png,.jpg,.jpeg"
                    className="hidden"
                    onChange={(e) => setEvidenceFile(e.target.files?.[0] ?? null)}
                  />
                  <i className="ri-attachment-2 text-2xl text-teal-600"></i>
                  <div className="mt-2 text-sm text-slate-700">Upload a COA, HPLC result, or lab report &mdash; PDF, JPG, or PNG</div>
                  <div className="mt-1 text-xs text-slate-400">Optional. Reviews with proof earn a &quot;Lab Verified&quot; badge and rank higher.</div>
                </label>
                {evidenceFile && (
                  <div className="mt-3 flex items-center gap-3 px-3 py-2.5 rounded-lg bg-teal-50 border border-teal-200">
                    <i className="ri-file-pdf-2-line text-rose-500"></i>
                    <span className="text-xs font-mono text-slate-700 flex-1 truncate">{evidenceFile.name}</span>
                    <button
                      type="button"
                      onClick={() => setEvidenceFile(null)}
                      className="text-[10px] font-mono text-slate-500 hover:text-rose-600"
                    >
                      Remove
                    </button>
                    <span className="text-[10px] font-mono text-emerald-600">Ready</span>
                  </div>
                )}
              </div>

              <div className="mt-5 rounded-xl bg-slate-50 border border-slate-200 p-5">
                <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">Will be sealed as</div>
                <div className="font-mono text-xs text-teal-700">{hash}</div>
              </div>

              {ruoNotice && (
                <div className="mt-5 flex items-start gap-2 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3 text-xs text-amber-800">
                  <i className="ri-shield-flash-line mt-0.5"></i>
                  <span>{ruoNotice}</span>
                </div>
              )}
              {submitError && (
                <div className="mt-5 flex items-start gap-2 rounded-xl bg-rose-50 border border-rose-200 px-4 py-3 text-xs text-rose-700">
                  <i className="ri-error-warning-line mt-0.5"></i>
                  <span>{submitError}</span>
                </div>
              )}

              <div className="mt-7 flex items-center justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="whitespace-nowrap px-5 py-3 rounded-full text-sm font-semibold text-slate-600 border border-slate-200 hover:border-teal-400 transition-colors"
                >
                  <i className="ri-arrow-left-line mr-1"></i>Back
                </button>
                <button
                  onClick={sealReview}
                  disabled={submitting || body.trim().length < 10}
                  className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold text-white transition-colors flex items-center gap-2 ${
                    submitting || body.trim().length < 10
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-teal-600 hover:bg-teal-700'
                  }`}
                >
                  {submitting ? (
                    <>
                      <i className="ri-loader-4-line animate-spin"></i>Screening &amp; sealing…
                    </>
                  ) : (
                    <>
                      <i className="ri-fingerprint-line"></i>Seal My Review
                    </>
                  )}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2 className="font-display font-bold text-slate-900 text-xl">Confirm your company</h2>
              <p className="mt-1 text-sm text-slate-500">
                Reviews are permanently tied to the company you select, so double-check it before continuing.
              </p>

              <div className="mt-6 flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 p-5">
                <div className="w-14 h-14 rounded-xl flex items-center justify-center font-display font-extrabold text-white text-lg bg-gradient-to-br from-teal-500 to-emerald-500">
                  {vendor.init}
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-slate-900 truncate">{vendor.name}</span>
                    {vendor.verified && <i className="ri-verified-badge-fill text-emerald-600 text-sm"></i>}
                  </div>
                  <div className="mt-1 text-xs text-slate-500 font-mono flex flex-wrap gap-x-3">
                    <span>{vendor.domain}</span>
                    <span>{vendor.country}</span>
                    <span>{vendor.reviews.toLocaleString()} reviews</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
                    Order reference <span className="text-slate-400">(optional)</span>
                  </div>
                  {orderRef.trim() && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center gap-1">
                      <i className="ri-verified-badge-line"></i>Will be verified
                    </span>
                  )}
                </div>
                <input
                  value={orderRef}
                  onChange={(e) => setOrderRef(e.target.value)}
                  placeholder="e.g. #EV-12904 - leave blank to post unverified"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm font-mono text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-400"
                />
                <p className="mt-2 text-xs text-slate-400">No order? No problem - you can still post. Adding a reference earns the Verified Buyer badge.</p>
              </div>

              <div className="mt-5 rounded-xl border border-slate-200 p-5">
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">Display name <span className="text-slate-400">(optional)</span></div>
                <input
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Shown as &quot;A*** M.&quot; - leave blank to stay anonymous"
                  className="w-full bg-white border border-slate-200 rounded-lg px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-400"
                />
              </div>

              <div className="mt-7 flex items-center justify-end">
                <button
                  onClick={() => setStep(2)}
                  className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                >
                  Confirm &amp; Continue <i className="ri-arrow-right-line ml-1"></i>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
          <i className="ri-lock-2-line"></i>
          Your review is anonymized and screened before publishing. Vendors cannot edit or delete an approved review.
        </div>
      </div>
    </div>
  );
}