import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '@/components/feature/Navbar';
import Footer from '@/components/feature/Footer';
import ClaimStepper from '@/pages/claim/components/ClaimStepper';
import StepFind from '@/pages/claim/components/StepFind';
import StepVerify, { type VerifyMethod } from '@/pages/claim/components/StepVerify';
import StepDetails, { type Details } from '@/pages/claim/components/StepDetails';
import StepReview from '@/pages/claim/components/StepReview';
import SubmitStoreForm from '@/pages/claim/components/SubmitStoreForm';
import { useAuth } from '@/context/AuthContext';
import type { Vendor } from '@/mocks/vendors';

const steps = ['Find listing', 'Verify ownership', 'Company details', 'Review'];

const benefits = [
  { icon: 'ri-shield-check-line', title: 'Own your reviews', desc: 'Your feedback stream, hosted and indexed on your terms.' },
  { icon: 'ri-flask-line', title: 'COA vault', desc: 'Attach HPLC lab certificates to the exact reviewed batch.' },
  { icon: 'ri-code-s-slash-line', title: 'Embeds that convert', desc: 'Drop trust badges on any storefront in minutes.' },
];

export default function ClaimVendor() {
  const { user, claimVendor } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [mode, setMode] = useState<'claim' | 'submit'>('claim');
  const [selected, setSelected] = useState<Vendor | null>(null);
  const [method, setMethod] = useState<VerifyMethod>('dns');
  const [verified, setVerified] = useState(false);
  const [details, setDetails] = useState<Details>({ contact: '', email: '', role: '', phone: '', plan: 'Growth' });
  const [submitted, setSubmitted] = useState(false);
  const [reference] = useState(() => `CLM-${Math.floor(1000 + Math.random() * 9000)}`);

  const detailsValid = details.contact.trim().length > 1 && details.email.includes('@');

  const handleSubmit = async () => {
    if (!selected) return;
    if (!user) {
      navigate('/signin');
      return;
    }
    await claimVendor(selected.slug);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">
      <Navbar />

      {/* HEADER */}
      <section className="relative pt-32 pb-10 overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div className="relative max-w-[1100px] mx-auto px-6 md:px-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-medium mb-6">
            <i className="ri-store-3-line text-teal-600"></i>
            <span className="text-slate-600">Directory listings are curated manually for now</span>
          </div>
          <h1 className="font-display font-extrabold text-slate-900 text-[34px] md:text-5xl leading-[1.1] tracking-tight max-w-3xl">
            Claim your vendor portal
          </h1>
          <p className="mt-4 text-slate-500 max-w-2xl leading-relaxed">
            Take ownership of your store profile, review stream, and Certificate of Analysis vault. Verification keeps
            the directory trustworthy for every researcher sourcing compounds.
          </p>
        </div>
      </section>

      {/* BODY */}
      <section className="relative pb-24">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8">
          <div>
            {mode === 'claim' && submitted ? (
              <div className="glass rounded-2xl p-8 md:p-10 text-center">
                <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center bg-emerald-50 border border-emerald-200">
                  <i className="ri-shield-check-fill text-4xl text-emerald-600"></i>
                </div>
                <h2 className="mt-6 font-display font-extrabold text-slate-900 text-2xl">Claim submitted</h2>
                <p className="mt-3 text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  We&apos;re processing verification for <span className="font-semibold text-slate-700">{selected?.name}</span>.
                  You&apos;ll get portal access as soon as it clears, usually within one business day.
                </p>

                <div className="mt-6 inline-block text-left rounded-xl border border-slate-200 bg-slate-50 p-5">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-2">Claim reference</div>
                  <div className="space-y-1.5 font-mono text-xs">
                    <div className="text-slate-500">Reference: <span className="text-teal-700">{reference}</span></div>
                    <div className="text-slate-500">Store: <span className="text-slate-800">{selected?.domain}</span></div>
                    <div className="text-slate-500">Method: <span className="text-slate-800">{method === 'dns' ? 'DNS TXT record' : method === 'email' ? 'Domain email' : 'Business document'}</span></div>
                    <div className="text-slate-500">Status: <span className="text-amber-600">Pending review</span></div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
                  <Link
                    to="/dashboard"
                    className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                  >
                    Open Vendor Dashboard
                  </Link>
                  <Link
                    to="/vendors"
                    className="whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold text-slate-700 border border-slate-200 hover:border-teal-400 transition-colors"
                  >
                    Back to Directory
                  </Link>
                </div>
              </div>
            ) : (
              <div className="glass rounded-2xl p-6 md:p-8">
                <div className="mb-8 flex justify-center">
                  <div className="glass rounded-full p-1 inline-flex">
                    {([
                      { k: 'claim', l: 'Claim existing listing', i: 'ri-store-2-line' },
                      { k: 'submit', l: 'Submit a new store', i: 'ri-add-circle-line' },
                    ] as const).map((tab) => (
                      <button
                        key={tab.k}
                        type="button"
                        onClick={() => setMode(tab.k)}
                        className={`px-4 py-2.5 rounded-full text-[11px] sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 ${
                          mode === tab.k ? 'bg-teal-600 text-white' : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        <i className={tab.i}></i>{tab.l}
                      </button>
                    ))}
                  </div>
                </div>

                {mode === 'claim' ? (
                  <>
                    <ClaimStepper step={step} steps={steps} />

                    <div className="mt-8">
                  {step === 1 && (
                    <>
                      <StepFind selected={selected} onSelect={setSelected} />
                      <div className="mt-7 flex justify-end">
                        <button
                          type="button"
                          disabled={!selected}
                          onClick={() => setStep(2)}
                          className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold transition-colors ${
                            selected ? 'text-white bg-teal-600 hover:bg-teal-700' : 'text-slate-400 bg-slate-100 cursor-not-allowed'
                          }`}
                        >
                          Continue <i className="ri-arrow-right-line ml-1"></i>
                        </button>
                      </div>
                    </>
                  )}

                  {step === 2 && selected && (
                    <>
                      <StepVerify
                        vendor={selected}
                        method={method}
                        onMethod={(m) => {
                          setMethod(m);
                          setVerified(false);
                        }}
                        verified={verified}
                        onVerify={() => setVerified(true)}
                      />
                      <div className="mt-7 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="whitespace-nowrap px-5 py-3 rounded-full text-sm font-semibold text-slate-600 border border-slate-200 hover:border-teal-400 transition-colors"
                        >
                          <i className="ri-arrow-left-line mr-1"></i>Back
                        </button>
                        <button
                          type="button"
                          disabled={!verified}
                          onClick={() => setStep(3)}
                          className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold transition-colors ${
                            verified ? 'text-white bg-teal-600 hover:bg-teal-700' : 'text-slate-400 bg-slate-100 cursor-not-allowed'
                          }`}
                        >
                          Continue <i className="ri-arrow-right-line ml-1"></i>
                        </button>
                      </div>
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <StepDetails details={details} onChange={setDetails} />
                      <div className="mt-7 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => setStep(2)}
                          className="whitespace-nowrap px-5 py-3 rounded-full text-sm font-semibold text-slate-600 border border-slate-200 hover:border-teal-400 transition-colors"
                        >
                          <i className="ri-arrow-left-line mr-1"></i>Back
                        </button>
                        <button
                          type="button"
                          disabled={!detailsValid}
                          onClick={() => setStep(4)}
                          className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-semibold transition-colors ${
                            detailsValid ? 'text-white bg-teal-600 hover:bg-teal-700' : 'text-slate-400 bg-slate-100 cursor-not-allowed'
                          }`}
                        >
                          Continue <i className="ri-arrow-right-line ml-1"></i>
                        </button>
                      </div>
                    </>
                  )}

                  {step === 4 && selected && (
                    <StepReview
                      vendor={selected}
                      method={method}
                      details={details}
                      authed={Boolean(user)}
                      onBack={() => setStep(3)}
                      onSubmit={handleSubmit}
                    />
                  )}
                    </div>
                  </>
                ) : (
                  <SubmitStoreForm />
                )}
              </div>
            )}
          </div>

          {/* ASIDE */}
          <aside className="space-y-5 lg:sticky lg:top-24 self-start">
            <div className="glass rounded-2xl p-6">
              <div className="text-[11px] font-mono uppercase tracking-[0.18em] text-teal-700 mb-4">What you unlock</div>
              <div className="space-y-4">
                {benefits.map((b) => (
                  <div key={b.title} className="flex gap-3">
                    <div className="w-9 h-9 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                      <i className={`${b.icon} text-teal-700`}></i>
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-900">{b.title}</div>
                      <div className="text-xs text-slate-500 mt-1 leading-relaxed">{b.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {!user && (
              <div className="glass rounded-2xl p-6">
                <div className="text-sm font-semibold text-slate-900">You&apos;re browsing signed out</div>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Create a company account to submit a claim and unlock the vendor portal.
                </p>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    to="/register"
                    className="w-full text-center whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
                  >
                    Create Company Account
                  </Link>
                  <Link
                    to="/signin"
                    className="w-full text-center whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-medium text-slate-700 border border-slate-200 hover:border-teal-400 transition-colors"
                  >
                    I already have an account
                  </Link>
                </div>
              </div>
            )}
          </aside>
        </div>
      </section>

      <Footer />
    </div>
  );
}