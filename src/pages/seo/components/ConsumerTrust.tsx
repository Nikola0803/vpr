import { Link } from 'react-router-dom';
import { consumerTrust } from '@/mocks/seo';

export default function ConsumerTrust() {
  return (
    <section className="relative py-24 border-t border-slate-200 bg-slate-50">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="relative glass rounded-3xl overflow-hidden p-10 md:p-14">
          <div className="absolute inset-0 grid-bg opacity-20"></div>
          <div className="absolute -top-24 right-0 w-[500px] h-[400px] rounded-full bg-teal-500/10 blur-3xl"></div>

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 items-start">
            <div>
              <div className="text-[11px] font-mono uppercase tracking-[0.22em] text-teal-600 mb-3">
                {consumerTrust.eyebrow}
              </div>
              <h2 className="font-display font-extrabold text-slate-900 text-3xl md:text-4xl tracking-tight leading-[1.1]">
                {consumerTrust.title}
              </h2>
              <p className="mt-5 text-slate-600 leading-relaxed">{consumerTrust.lead}</p>
              <p className="mt-5 text-sm text-slate-700">
                {consumerTrust.note}{' '}
                <Link to="/verification" className="text-cyan-700 hover:text-cyan-200 font-medium whitespace-nowrap">
                  Learn more about our verification process →
                </Link>
              </p>
            </div>

            <div className="space-y-4">
              {consumerTrust.items.map((c) => (
                <div key={c.title} className="glass rounded-2xl p-5 flex gap-4">
                  <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-teal-500/20 to-cyan-500/20 border border-teal-500/25">
                    <i className={`${c.icon} text-lg text-teal-700`}></i>
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900 text-sm">{c.title}</div>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}