import { Link } from 'react-router-dom';
import type { Vendor } from '@/mocks/vendors';
import VendorLogo from '@/components/feature/VendorLogo';

interface Props {
  vendor: Vendor;
}

function TrustChip({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs text-slate-700 bg-white/70 border border-slate-200 rounded-full px-3 py-1">
      <i className={`${icon} text-teal-600`}></i>
      {label}
    </span>
  );
}

export default function FeaturedVendorBanner({ vendor: v }: Props) {
  return (
    <div className="relative mb-5 rounded-2xl border-2 border-teal-300 bg-gradient-to-br from-teal-50 via-white to-emerald-50 overflow-hidden shadow-[0_4px_24px_-8px_rgba(20,184,166,0.25)]">
      {/* Subtle grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      {/* Top label bar */}
      <div className="relative bg-teal-600 px-5 sm:px-6 py-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <i className="ri-award-fill text-amber-300 text-sm"></i>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white">
            Editor&apos;s Pick: Top-rated US supplier
          </span>
        </div>
        <span className="hidden sm:inline text-[11px] text-teal-200">
          Sponsored placement
        </span>
      </div>

      <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5 p-5 sm:p-6">
        {/* Logo + identity */}
        <div className="flex items-center gap-4 shrink-0">
          <VendorLogo
            name={v.name}
            init={v.init}
            logo={v.logo}
            logoDark={v.logoDark}
            logoBg={v.logoBg}
            brand={v.brand}
            verified={v.verified}
            boxClass="w-20 h-14"
            imgClass="max-h-8 max-w-[68px]"
          />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                to={`/vendors/${v.slug}`}
                className="font-display font-bold text-slate-900 text-xl leading-tight hover:text-teal-700 transition-colors"
              >
                {v.name}
              </Link>
              <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border border-teal-300 bg-teal-50 text-teal-700">
                Featured
              </span>
              {v.verified && (
                <span className="text-[10px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-full border border-emerald-300 bg-emerald-50 text-emerald-700 flex items-center gap-1">
                  <i className="ri-shield-check-fill"></i>Verified
                </span>
              )}
            </div>
            <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                {[1,2,3,4,5].map((n) => (
                  <i key={n} className={`${n <= Math.round(v.score) ? 'ri-star-fill text-amber-400' : 'ri-star-line text-slate-300'} text-sm`}></i>
                ))}
                <span className="font-semibold text-slate-800 ml-1">{v.score.toFixed(1)}</span>
              </span>
              <span>{v.reviews.toLocaleString()} verified reviews</span>
              <span className="hidden sm:inline flex items-center gap-1">
                <i className="ri-map-pin-line"></i>{v.country}
              </span>
            </div>
          </div>
        </div>

        {/* Trust chips */}
        <div className="flex flex-wrap gap-2 sm:ml-2">
          {v.publicCoa && <TrustChip icon="ri-file-shield-2-fill" label="COA Live" />}
          {v.thirdPartyLab && <TrustChip icon="ri-flask-line" label="3rd-Party Lab" />}
          {v.qrVerify && <TrustChip icon="ri-qr-code-line" label="QR Verify" />}
          {v.compounds.slice(0, 4).map((c) => (
            <span key={c} className="text-xs text-slate-600 bg-white/80 border border-teal-100 rounded-full px-3 py-1">
              {c}
            </span>
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:ml-auto shrink-0">
          <Link
            to={`/vendors/${v.slug}`}
            className="whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center justify-center gap-1.5 shadow-sm"
          >
            <i className="ri-chat-3-line"></i>Read reviews
          </Link>
          <a
            href={`https://${v.domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="whitespace-nowrap px-5 py-2.5 rounded-lg text-sm font-semibold text-teal-700 border border-teal-200 hover:border-teal-400 hover:bg-teal-50 transition-colors flex items-center justify-center gap-1.5 bg-white/90"
          >
            Visit store<i className="ri-external-link-line"></i>
          </a>
        </div>
      </div>

      {/* Disclosure */}
      <div className="px-5 sm:px-6 pb-3 text-[11px] text-slate-400">
        <Link to="/sponsorship" className="underline hover:text-teal-600 transition-colors">
          How sponsorship works
        </Link>
        {' '}· Rankings and scores remain editorially independent.
      </div>
    </div>
  );
}
