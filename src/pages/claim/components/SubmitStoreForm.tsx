import { useState, type FormEvent } from 'react';
import { supabase } from '@/lib/supabase';

const FORM_ID = 'vendor-store-submission';

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-400 transition-colors';

const planOptions = ['Free', 'Starter', 'Growth', 'Professional', 'Not sure yet'];

type Status = 'idle' | 'submitting' | 'success' | 'error';

export default function SubmitStoreForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    // Anti-spam honeypot: real people never fill this. If it has a value, act
    // exactly like a normal success without sending anything upstream.
    const honeypot = String(formData.get('company_alt') ?? '').trim();
    if (honeypot) {
      setStatus('success');
      setError('');
      form.reset();
      return;
    }

    setStatus('submitting');
    setError('');

    try {
      const { error: dbError } = await supabase.from('vendor_claims').insert({
        store_name:   String(formData.get('store_name')   ?? '').trim(),
        store_domain: String(formData.get('store_domain') ?? '').trim(),
        country:      String(formData.get('country')      ?? '').trim() || null,
        compounds:    String(formData.get('compounds')    ?? '').trim() || null,
        contact_name: String(formData.get('contact_name') ?? '').trim(),
        role:         String(formData.get('role')         ?? '').trim() || null,
        email:        String(formData.get('email')        ?? '').trim(),
        phone:        String(formData.get('phone')        ?? '').trim() || null,
        plan:         String(formData.get('plan')         ?? 'Free').trim(),
        notes:        String(formData.get('notes')        ?? '').trim() || null,
      });

      if (dbError) throw new Error(dbError.message);

      // Fire-and-forget: notify office@verifiedpeptidereviews.com via edge function.
      // Non-critical: a failure here does not block the success state for the vendor.
      supabase.functions.invoke('notify-vendor-claim', {
        body: {
          store_name:   String(formData.get('store_name')   ?? '').trim(),
          store_domain: String(formData.get('store_domain') ?? '').trim(),
          country:      String(formData.get('country')      ?? '').trim(),
          compounds:    String(formData.get('compounds')    ?? '').trim(),
          contact_name: String(formData.get('contact_name') ?? '').trim(),
          role:         String(formData.get('role')         ?? '').trim(),
          email:        String(formData.get('email')        ?? '').trim(),
          phone:        String(formData.get('phone')        ?? '').trim(),
          plan:         String(formData.get('plan')         ?? 'Free').trim(),
          notes:        String(formData.get('notes')        ?? '').trim(),
        },
      }).catch(() => {});

      setStatus('success');
      setError('');
      form.reset();
    } catch (e) {
      setStatus('error');
      setError(e instanceof Error ? e.message : 'We could not submit your store right now. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className="text-center py-4">
        <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-emerald-50 border border-emerald-200">
          <i className="ri-store-3-fill text-4xl text-emerald-600"></i>
        </div>
        <h2 className="mt-6 font-display font-extrabold text-slate-900 text-2xl">Store submitted</h2>
        <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
          Thanks - our curation team will review your store and, if it clears, publish your listing. Basic listings are
          free and include up to 10 verified reviews.
        </p>
        <button
          type="button"
          onClick={() => setStatus('idle')}
          className="mt-8 whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
        >
          Submit another store
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display font-bold text-slate-900 text-xl">Submit a new store</h2>
      <p className="mt-1 text-sm text-slate-500">
        Not in the directory yet? Send us your store details and our team will review it for a listing. No card required.
      </p>

      <form
        id={FORM_ID}
        onSubmit={handleSubmit}
        className="mt-6 space-y-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="sub-store-name" className="block text-xs font-medium text-slate-500 mb-2">
              Store name <span className="text-teal-600">*</span>
            </label>
            <input
              id="sub-store-name"
              name="store_name"
              required
              placeholder="EVLV Peptides"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="sub-store-domain" className="block text-xs font-medium text-slate-500 mb-2">
              Store website / domain <span className="text-teal-600">*</span>
            </label>
            <input
              id="sub-store-domain"
              name="store_domain"
              required
              placeholder="yourstore.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="sub-country" className="block text-xs font-medium text-slate-500 mb-2">
              Country / region
            </label>
            <input
              id="sub-country"
              name="country"
              placeholder="United States"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="sub-compounds" className="block text-xs font-medium text-slate-500 mb-2">
              Compounds you carry
            </label>
            <input
              id="sub-compounds"
              name="compounds"
              placeholder="BPC-157, Tirzepatide, TB-500"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="sub-contact" className="block text-xs font-medium text-slate-500 mb-2">
              Contact full name <span className="text-teal-600">*</span>
            </label>
            <input
              id="sub-contact"
              name="contact_name"
              required
              placeholder="Dr. Sarah Whitfield"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="sub-role" className="block text-xs font-medium text-slate-500 mb-2">
              Role at company
            </label>
            <input
              id="sub-role"
              name="role"
              placeholder="Operations Manager"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="sub-email" className="block text-xs font-medium text-slate-500 mb-2">
              Work email <span className="text-teal-600">*</span>
            </label>
            <input
              id="sub-email"
              name="email"
              type="email"
              required
              placeholder="sarah@yourstore.com"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="sub-phone" className="block text-xs font-medium text-slate-500 mb-2">
              Phone (optional)
            </label>
            <input
              id="sub-phone"
              name="phone"
              placeholder="+1 (614) 555-0134"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="sub-plan" className="block text-xs font-medium text-slate-500 mb-2">
            Plan you&apos;re interested in
          </label>
          <select id="sub-plan" name="plan" defaultValue="Free" className={inputClass}>
            {planOptions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
          <p className="mt-2 text-xs text-slate-400">
            The Free listing includes basic profile data and up to 10 verified reviews.
          </p>
        </div>

        <div>
          <label htmlFor="sub-notes" className="block text-xs font-medium text-slate-500 mb-2">
            Anything else we should know?
          </label>
          <textarea
            id="sub-notes"
            name="notes"
            rows={4}
            maxLength={500}
            placeholder="Tell us about your testing, shipping, or why researchers should trust your store."
            className={`${inputClass} resize-none`}
          ></textarea>
          <p className="mt-2 text-xs text-slate-400">Maximum 500 characters</p>
        </div>

        {/* Anti-spam honeypot - hidden via a non-inline stylesheet rule */}
        <input
          type="text"
          name="company_alt"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          readOnly
          className="hp-field-9471"
        />

        {status === 'error' && (
          <div className="flex items-start gap-3 rounded-xl border border-rose-200 bg-rose-50 p-4">
            <i className="ri-error-warning-line text-rose-600 mt-0.5"></i>
            <p className="text-xs text-rose-800 leading-relaxed">{error}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-400">
            Basic listings are free. We review every submission by hand.
          </p>
          <button
            type="submit"
            disabled={status === 'submitting'}
            className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold transition-colors flex items-center gap-2 ${
              status === 'submitting'
                ? 'text-slate-400 bg-slate-100 cursor-not-allowed'
                : 'text-white bg-teal-600 hover:bg-teal-700'
            }`}
          >
            {status === 'submitting' ? (
              <>
                <i className="ri-loader-4-line animate-spin"></i>Submitting
              </>
            ) : (
              <>
                <i className="ri-send-plane-line"></i>Submit store
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}