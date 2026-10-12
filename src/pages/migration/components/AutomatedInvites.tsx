import { useState } from 'react';
import { orderAutomation } from '@/mocks/migration';

export default function AutomatedInvites() {
  const { delay, threshold } = orderAutomation;
  const [selectedDelay, setSelectedDelay] = useState(delay.default);
  const [bar, setBar] = useState(4);

  return (
    <section className="relative py-24 border-t border-slate-200 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Headline + flow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6">
            <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">
              {orderAutomation.eyebrow}
            </div>
            <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-5xl tracking-tight leading-[1.1]">
              {orderAutomation.title}
            </h2>
            <p className="mt-5 text-slate-600 leading-relaxed">{orderAutomation.lead}</p>

            <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {orderAutomation.points.map((p) => (
                <li key={p} className="flex items-start gap-2.5 text-sm text-slate-700">
                  <i className="ri-checkbox-circle-fill text-teal-600 mt-0.5"></i>
                  <span className="leading-relaxed">{p}</span>
                </li>
              ))}
            </ul>

            <div className="mt-6 flex items-start gap-3 rounded-xl border border-teal-200 bg-teal-50/70 p-4">
              <i className="ri-shield-check-line text-teal-700 text-lg mt-0.5"></i>
              <p className="text-xs text-teal-900 leading-relaxed">
                These are your customers, not ours. Every address is used once to invite a review, sent from your brand with a one-click opt-out. We never buy, sell, rent or share your customer list, and we never contact anyone who did not order from you.
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-7">
              <div className="space-y-4">
                {orderAutomation.steps.map((s, i) => (
                  <div key={s.title} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-11 h-11 shrink-0 rounded-xl flex items-center justify-center bg-teal-50 border border-teal-200">
                        <i className={`${s.icon} text-lg text-teal-700`}></i>
                      </div>
                      {i < orderAutomation.steps.length - 1 && <span className="w-px flex-1 my-1 bg-slate-200"></span>}
                    </div>
                    <div className="pb-1">
                      <div className="text-sm font-semibold text-slate-900">{s.title}</div>
                      <p className="mt-1 text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Email preview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-amber-300"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-300"></span>
                <span className="ml-2 text-[11px] font-mono text-slate-400">Inbox · auto-sent {selectedDelay}</span>
              </div>
              <div className="pt-4">
                <div className="text-xs text-slate-400 font-mono">noreply@yourstore.com</div>
                <div className="mt-1 text-sm font-semibold text-slate-900">
                  Your order #8291-A44F shipped, how was it?
                </div>
                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  Hi Max, your BPC-157 order just arrived. Share a verified review and help other researchers buy with
                  confidence.
                </p>
                <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-teal-600 text-white text-xs font-semibold">
                  <i className="ri-star-line"></i>
                  Write my verified review
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2 text-[10px] font-mono text-slate-400">
                  <i className="ri-lock-2-line"></i>
                  Sent by yourstore.com · one request · unsubscribe
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Config cards */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Delay */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-teal-50 border border-teal-200">
              <i className="ri-time-line text-xl text-teal-700"></i>
            </div>
            <h3 className="mt-5 font-display font-bold text-slate-900 text-lg leading-snug">{delay.title}</h3>
            <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{delay.desc}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {delay.options.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setSelectedDelay(opt)}
                  className={`whitespace-nowrap px-3.5 py-2 rounded-full text-xs font-medium border transition-colors ${
                    selectedDelay === opt
                      ? 'bg-teal-600 border-teal-600 text-white'
                      : 'bg-white border-slate-200 text-slate-600 hover:border-teal-400'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-500 flex items-center gap-1.5">
              <i className="ri-information-line text-teal-600"></i>
              {delay.hint}
            </p>
          </div>

          {/* Threshold routing */}
          <div className="bg-white rounded-2xl border border-slate-200 p-7">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-teal-50 border border-teal-200">
              <i className="ri-git-branch-line text-xl text-teal-700"></i>
            </div>
            <h3 className="mt-5 font-display font-bold text-slate-900 text-lg leading-snug">{threshold.title}</h3>
            <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">{threshold.desc}</p>

            <div className="mt-5">
              <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mb-2">
                Publish reviews at or above
              </div>
              <div className="flex gap-2">
                {[3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setBar(n)}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-sm font-semibold border transition-colors ${
                      bar === n
                        ? 'bg-teal-600 border-teal-600 text-white'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-teal-400'
                    }`}
                  >
                    {n}
                    <i className="ri-star-fill text-amber-400 text-xs"></i>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <i className="ri-checkbox-circle-fill text-emerald-600 text-lg mt-0.5"></i>
                <div>
                  <div className="text-sm font-semibold text-emerald-800">
                    {threshold.accept.title} ({bar}–5 stars)
                  </div>
                  <p className="mt-0.5 text-xs text-emerald-700 leading-relaxed">{threshold.accept.desc}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <i className="ri-customer-service-2-line text-amber-600 text-lg mt-0.5"></i>
                <div>
                  <div className="text-sm font-semibold text-amber-800">
                    {threshold.recover.title} (below {bar} stars)
                  </div>
                  <p className="mt-0.5 text-xs text-amber-700 leading-relaxed">{threshold.recover.desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}