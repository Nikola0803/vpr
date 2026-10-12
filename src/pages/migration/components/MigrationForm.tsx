import { useEffect, useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { integrationMethods, sourcePlatforms, migrationFees } from '@/mocks/migration';

const SUBMIT_ADDR = 'https://readdy.ai/api/form/dap40rnd3mjnincc3uf0';

export default function MigrationForm() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [formError, setFormError] = useState('');
  const [integrations, setIntegrations] = useState<string[]>([]);
  const [charCount, setCharCount] = useState(0);
  const [feeRange, setFeeRange] = useState('');
  const [submittedEmail, setSubmittedEmail] = useState('');
  const [submittedFee, setSubmittedFee] = useState<{ range: string; price: number } | null>(null);
  const [quoteRef, setQuoteRef] = useState('');

  const [searchParams] = useSearchParams();
  const rangeParam = searchParams.get('range');

  useEffect(() => {
    if (rangeParam && migrationFees.some((f) => f.range === rangeParam)) {
      setFeeRange(rangeParam);
    }
  }, [rangeParam]);

  const selectedFee = migrationFees.find((f) => f.range === feeRange);

  const toggleIntegration = (name: string) => {
    setIntegrations((prev) => (prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting') return;
    setFormError('');

    const form = event.currentTarget;
    const payload = new FormData(form);
    const honeypot = String(payload.get('website_alt') || '').trim();

    if (honeypot) {
      setStatus('success');
      setSubmittedFee(selectedFee ? { range: selectedFee.range, price: selectedFee.price } : null);
      setQuoteRef(`MR-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
      form.reset();
      setIntegrations([]);
      setCharCount(0);
      setFeeRange('');
      return;
    }

    payload.delete('website_alt');
    payload.delete('integrations');
    integrations.forEach((n) => payload.append('integrations', n));

    const submittedEmailValue = String(payload.get('email') || '').trim();

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
      setSubmittedFee(selectedFee ? { range: selectedFee.range, price: selectedFee.price } : null);
      setQuoteRef(`MR-${Math.random().toString(36).slice(2, 7).toUpperCase()}`);
      form.reset();
      setIntegrations([]);
      setCharCount(0);
      setFeeRange('');
    } catch {
      setStatus('error');
      setFormError('Network error, please check your connection and try again.');
    }
  };

  return (
    <section id="request" className="relative py-24 border-t border-slate-200 bg-slate-50 scroll-mt-24">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">
              Start your migration
            </div>
            <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
              Tell us what to rescue.
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">
              Share your store and where your reviews live now. A migration engineer reviews it and gets back to you with
              a migration plan, usually within one business day.
            </p>

            <div className="mt-8 space-y-4">
              {[
                { icon: 'ri-shield-keyhole-line', t: 'Read-only source access', d: 'We never post, edit or delete anything at the source.' },
                { icon: 'ri-lock-2-line', t: 'Your data stays yours', d: 'Full export available at any time, in open formats.' },
                { icon: 'ri-customer-service-2-line', t: 'Free integration support', d: 'Included with every package, no hidden setup fees.' },
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
                    Migration request received
                  </h3>
                  <p className="mt-3 text-sm text-slate-600 max-w-md leading-relaxed">
                    A migration engineer is reviewing your store. Watch your inbox for a migration plan and next steps,
                    usually within one business day.
                  </p>
                  <p className="mt-2 text-xs text-slate-500">
                    A confirmation receipt goes to{' '}
                    <span className="font-mono text-slate-700">{submittedEmail || 'the email you provided'}</span>.
                  </p>

                  {submittedFee && (
                    <div className="mt-6 w-full max-w-sm rounded-xl border border-teal-200 bg-teal-50/70 px-4 py-3.5 flex items-center justify-between gap-4 text-left">
                      <div className="min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-teal-700">
                          Your one-time quote
                        </div>
                        <div className="text-xs text-slate-600">{submittedFee.range}</div>
                        {quoteRef && (
                          <div className="mt-0.5 text-[10px] font-mono text-slate-400">Quote ref {quoteRef}</div>
                        )}
                      </div>
                      <div className="shrink-0 font-display font-extrabold text-2xl text-slate-900">
                        ${submittedFee.price}
                      </div>
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setStatus('idle');
                      setSubmittedFee(null);
                      setQuoteRef('');
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
                      <span className="text-xs font-semibold text-slate-700">Reviews live on now *</span>
                      <select
                        name="source_platform"
                        required
                        defaultValue=""
                        className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                      >
                        <option value="" disabled>
                          Select a source platform
                        </option>
                        {sourcePlatforms.map((p) => (
                          <option key={p.name} value={p.name}>
                            {p.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <label className="block">
                    <span className="text-xs font-semibold text-slate-700">Roughly how many reviews? *</span>
                    <select
                      name="review_count"
                      required
                      value={feeRange}
                      onChange={(e) => setFeeRange(e.target.value)}
                      className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
                    >
                      <option value="" disabled>
                        Select a range
                      </option>
                      {migrationFees.map((f) => (
                        <option key={f.range} value={f.range}>
                          {f.range}
                        </option>
                      ))}
                    </select>
                  </label>

                  {selectedFee && (
                    <div className="flex items-center gap-3 rounded-xl border border-teal-200 bg-teal-50/70 px-4 py-3.5">
                      <div className="w-10 h-10 shrink-0 rounded-lg bg-white border border-teal-200 flex items-center justify-center">
                        <i className={`${selectedFee.icon} text-lg text-teal-700`}></i>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-mono uppercase tracking-widest text-teal-700">
                          One-time migration fee
                        </div>
                        <div className="text-xs text-slate-600 leading-relaxed">{selectedFee.note}</div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-display font-extrabold text-2xl text-slate-900 leading-none">
                          ${selectedFee.price}
                        </div>
                        <div className="mt-1 text-[10px] font-mono uppercase tracking-wider text-teal-700">
                          one-time
                        </div>
                      </div>
                    </div>
                  )}

                  <div>
                    <span className="text-xs font-semibold text-slate-700">How do you want to display them?</span>
                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {integrationMethods.map((m) => {
                        const active = integrations.includes(m.name);
                        return (
                          <button
                            key={m.name}
                            type="button"
                            onClick={() => toggleIntegration(m.name)}
                            className={`whitespace-nowrap inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium border transition-colors ${
                              active
                                ? 'bg-teal-600 border-teal-600 text-white'
                                : 'bg-white border-slate-200 text-slate-600 hover:border-teal-400'
                            }`}
                          >
                            <i className={active ? 'ri-check-line' : `${m.icon}`}></i>
                            {m.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <label className="block">
                    <span className="text-xs font-semibold text-slate-700">Anything we should know?</span>
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={500}
                      onChange={(e) => setCharCount(e.target.value.length)}
                      placeholder="Deadline, custom storefront, previous removals, special requirements…"
                      className="mt-1.5 w-full rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none"
                    />
                    <span className="mt-1 block text-right text-[11px] font-mono text-slate-400">{charCount}/500</span>
                  </label>

                  <input
                    type="text"
                    name="website_alt"
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
                        Request my migration
                      </>
                    )}
                  </button>
                  <p className="text-center text-[11px] text-slate-400">
                    Read-only access. We never modify your existing reviews at the source.
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