import type { Vendor } from '@/mocks/vendors';
import { getVendorAbout, getVendorFacts } from '@/pages/vendor/utils/vendorProfile';

export default function AboutCompany({ vendor }: { vendor: Vendor }) {
  const facts = getVendorFacts(vendor);

  return (
    <section className="relative pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="glass rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">
            <div>
              <div className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                <i className="ri-building-2-line text-cyan-600"></i>
                About {vendor.name}
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{getVendorAbout(vendor)}</p>
              <p className="mt-4 text-sm text-slate-600 leading-relaxed">
                This profile is maintained by the vendor and cross-checked against order records, published lab
                documentation and reviewer activity. Company details are re-verified every quarter and can be reported by
                any buyer.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2">
                {vendor.compounds.map((c) => (
                  <span
                    key={c}
                    className="text-[11px] font-mono px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 self-start">
              {facts.map((f) => (
                <div key={f.label} className="rounded-xl bg-slate-50 border border-slate-200 px-3.5 py-3">
                  <div className="w-7 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center">
                    <i className={`${f.icon} text-sm text-cyan-700`}></i>
                  </div>
                  <div className="mt-2 text-[10px] font-mono uppercase tracking-wider text-slate-500">{f.label}</div>
                  <div className="mt-0.5 text-xs font-semibold text-slate-900 leading-snug">{f.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}