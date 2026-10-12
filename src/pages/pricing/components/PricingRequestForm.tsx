import { useState, type FormEvent, type RefObject } from 'react';
import { tiers } from '@/mocks/pricing';
import type { BillingCycle } from '@/components/base/BillingToggle';

const SUBMIT_ADDR = 'https://readdy.ai/api/form/daqp3g95p1p9qir6kcg0';

const planOptions = [...tiers.map((t) => ({ id: t.id, name: t.name })), { id: 'unsure', name: 'Not sure yet' }];

interface Props {
  sectionRef: RefObject<HTMLElement | null>;
  selectedPlan: string;
  onSelectPlan: (plan: string) => void;
  billing: BillingCycle;
}

export default function PricingRequestForm({ sectionRef, selectedPlan, onSelectPlan, billing }: Props) {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [submittedPlan, setSubmittedPlan] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;
    setFormError('');

    const form = event.currentTarget;
    const payload = new FormData(form);
    const honeypot = String(payload.get('company_alt') || '').trim();

    payload.delete('company_alt');

    if (honeypot) {
      setStatus('success');
      setSubmittedPlan(String(payload.get('plan') || ''));
      form.reset();
      setCharCount(0);
      return;
    }

    const submittedEmailValue = String(payload.get('email') || '').trim();
    const submittedPlanValue = String(payload.get('plan') || '').trim();

    setStatus('submitting');
    try {
      const response = await fetch(SUBMIT_ADDR, {
        method: 'POST',
        body: payload,
      });
      const responseText = await response.text();
      let parsed: any = null;
      try {
        parsed = JSON.parse(responseText);
      } catch {
        parsed = null;
      }

      const code = parsed?.code;
      const serverMsg =
        parsed?.meta?.message || parsed?.message || parsed?.meta?.detail || responseText || '';

      const failed =
        !response.ok ||
        code !== 'OK' ||
        /spam/i.test(String(serverMsg)) ||
        /form data is spam/i.test(responseText);

      if (failed) {
        setStatus('error');
        setFormError(serverMsg || 'Something went wrong while sending your request. Please try again.');
        return;
      }

      setStatus('success');
      setSubmittedEmail(submittedEmailValue);
      setSubmittedPlan(submittedPlanValue);
      form.reset();
      setCharCount(0);
    } catch {
      setStatus('error');
      setFormError('Network error, please check your connection and try again.');
    }
  };

  return (
    <section ref={sectionRef} id="request" className="relative py-24 border-t border-slate-200 bg-slate-50 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">
              Request your plan
            </div>
            <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
              Tell us about your store.
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              Pick the plan that fits and share a few details. Our team reviews your store, then sends you a secure payment
              link by email, usually within one business day. No card details needed up front.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: 'ri-message-2-line', t: 'You submit a request', d: 'Choose a plan and tell us about your storefront.' },
                { icon: 'ri-file-list-3-line', t: 'We review and confirm fit', d: 'A specialist checks your setup and answers questions.' },
                { icon: 'ri-secure-payment-line', t: 'You get a payment link', d: 'A secure, plan-matched link lands in your inbox.' },
              ].map((r) => (
                <div key={r.t} className="flex items-start gap-3">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-white border border-slate-200 flex items-center justify-center">
                    <i className={`${r.icon} text-lg text-teal-700`}></i>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{r.t}</div>
                    <div className="text-sm text-slate-500 leading-relaxed">{r.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="glass rounded-2xl p-6 md:p-8">
              {status === 'success' ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center">
                    <i className="ri-check-line text-3xl text-white"></i>
                  </div>
                  <h3 className="mt-6 font-display font-extrabold text-slate-900 text-2xl tracking-tight">
                    Request received
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 max-w-md leading-relaxed">
                    Our team is reviewing your store. Watch your inbox, we&apos;ll reply with a payment link for your plan,
                    usually within one business day.
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    A confirmation receipt goes to{' '}
                    <span className="font-mono text-slate-700">{submittedEmail || 'the email you provided'}</span>.
                  </p>

                  {submittedPlan && (
                    <div className="mt-6 w-full max-w-sm rounded-xl border border-teal-200 bg-teal-50/70 px-4 py-3.5 flex items-center justify-between gap-4 text-left">
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-teal-700">
                          Plan requested
                        </div>
                        <div className="text-xs text-slate-600">Billed {billing}</div>
                      </div>
                      <div className="shrink-0 font-display font-extrabold text-xl text-slate-900">
                        {submittedPlan}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setStatus('idle');
                      setSubmittedPlan('');
                    }}
                    className="mt-7 whitespace-nowrap px-6 py-3 rounded-md text-sm font-semibold text-slate-700 glass glass-hover"
                  >
                    Submit another request
                  </button>
                </div>
              ) : (
                <form data-readdy-form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">Store / company name *</span>
                      <input
                        name="store_name"
                        required
                        placeholder="Adonis Research"
                        className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">Website *</span>
                      <input
                        name="website"
                        required
                        placeholder="https://yourstore.com"
                        className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">Work email *</span>
                      <input
                        name="email"
                        type="email"
                        required
                        placeholder="you@yourstore.com"
                        className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                      />
                    </label>
                    <label className="block">
                      <span className="text-xs font-semibold text-slate-700">Plan you&apos;re interested in *</span>
                      <select
                        name="plan"
                        required
                        value={selectedPlan}
                        onChange={(e) => onSelectPlan(e.target.value)}
                        className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                      >
                        <option value="" disabled>
                          Select a plan
                        </option>
                        {planOptions.map((p) => (
                          <option key={p.id} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-xs font-semibold text-slate-700">Billing preference</span>
                    <select
                      name="billing_preference"
                      defaultValue={billing === 'yearly' ? 'Yearly' : 'Monthly'}
                      className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="Monthly">Monthly</option>
                      <option value="Yearly">Yearly (save up to 60%)</option>
                    </select>
                  </label>

                  <label className="block">
                    <span className="text-xs font-semibold text-slate-700">Anything we should know?</span>
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={500}
                      onChange={(e) => setCharCount(e.target.value.length)}
                      placeholder="Number of stores, current review platform, storefront type, questions…"
                      className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none"
                    />
                    <span className="mt-1 block text-right text-[11px] font-mono text-slate-400">{charCount}/500</span>
                  </label>

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
                    <div className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 flex items-start gap-2">
                      <i className="ri-error-warning-line mt-0.5"></i>
                      <span>{formError}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="whitespace-nowrap w-full px-6 py-3.5 rounded-md text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {status === 'submitting' ? (
                      <>
                        <i className="ri-loader-4-line animate-spin"></i>
                        Sending request…
                      </>
                    ) : (
                      <>
                        <i className="ri-send-plane-line"></i>
                        Request my payment link
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400">
                    No card needed now. We reply by email with a secure payment link.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}