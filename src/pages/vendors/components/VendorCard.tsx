import { Link, useNavigate } from 'react-router-dom';
import type { Vendor } from '@/mocks/vendors';
import type { Certification } from '@/mocks/certifications';
import VendorLogo from '@/components/feature/VendorLogo';

interface Props {
  vendor: Vendor;
  selected: boolean;
  onToggle: (slug: string) => void;
  cert?: Certification;
}

function Stars({ value, size = 'text-xs' }: { value: number; size?: string }) {
  const rounded = Math.round(value);
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <i
          key={n}
          className={`${n <= rounded ? 'ri-star-fill text-amber-500' : 'ri-star-line text-slate-300'} ${size}`}
        ></i>
      ))}
    </div>
  );
}

export default function VendorCard({ vendor: v, selected, onToggle, cert }: Props) {
  const navigate = useNavigate();
  const openProfile = () => navigate(`/vendors/${v.slug}`);

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={openProfile}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openProfile();
        }
      }}
      className={`group relative bg-white rounded-2xl border p-5 flex flex-col cursor-pointer transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(15,23,42,0.25)] ${
        selected ? 'border-teal-400 ring-1 ring-teal-300/60' : 'border-slate-200'
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <VendorLogo
          name={v.name}
          init={v.init}
          logo={v.logo}
          logoDark={v.logoDark}
          logoBg={v.logoBg}
          brand={v.brand}
          verified={v.verified}
          boxClass="w-16 h-12"
          imgClass="max-h-7 max-w-[52px]"
        />
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(v.slug);
          }}
          aria-label="Add to compare"
          title="Add to compare"
          className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-lg border text-sm transition-all ${
            selected
              ? 'bg-teal-600 border-teal-600 text-white'
              : 'border-slate-200 text-slate-500 hover:border-teal-400 hover:text-teal-700'
          }`}
        >
          <i className={selected ? 'ri-check-line' : 'ri-scales-3-line'}></i>
        </button>
      </div>

      {/* Identity */}
      <div className="mt-4">
        <Link
          to={`/vendors/${v.slug}`}
          className="font-display font-bold text-slate-900 text-base leading-tight hover:text-teal-700 transition-colors block truncate"
        >
          {v.name}
        </Link>
        <div className="mt-1 text-xs text-slate-400 flex items-center gap-1.5">
          <i className="ri-map-pin-line"></i>
          {v.country}
        </div>
      </div>

      {/* Clean review line */}
      <div className="mt-4 flex items-center justify-between">
        <Stars value={v.score} size="text-sm" />
        <div className="text-sm">
          <span className="font-mono font-semibold text-slate-900">{v.score.toFixed(1)}</span>
          <span className="text-slate-400 text-xs ml-1">/ 5.0</span>
        </div>
      </div>
      <div className="mt-1.5 text-[11px] text-slate-400 font-mono">
        {v.reviews.toLocaleString()} verified reviews
      </div>

      {/* Outcome story - mirrors the homepage: more buyers / conversions / trust */}
      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500">
        <span className="flex items-center gap-1">
          <i className="ri-user-add-line text-teal-600"></i>
          More buyers
        </span>
        <span className="text-slate-200">|</span>
        <span className="flex items-center gap-1">
          <i className="ri-shopping-bag-3-line text-teal-600"></i>
          More conversions
        </span>
        <span className="text-slate-200">|</span>
        <span className="flex items-center gap-1">
          <i className="ri-shield-star-line text-teal-600"></i>
          More trust
        </span>
      </div>

      {/* Trust chips */}
      <div className="mt-4 flex flex-wrap gap-1.5">
        {cert && cert.status === 'active' && (
          <span
            title={cert.cert_id}
            className="text-[10px] font-mono px-2 py-1 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center gap-1"
          >
            <i className="ri-shield-check-fill"></i>True COA Verified
          </span>
        )}
        {v.planTier === 'free' && (
          <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-600 flex items-center gap-1">
            <i className="ri-price-tag-3-line"></i>Free · Basic data
          </span>
        )}
        <span
          className={`text-[10px] font-mono px-2 py-1 rounded-md border flex items-center gap-1 ${
            v.publicCoa ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-slate-50 border-slate-200 text-slate-400'
          }`}
        >
          <i className={v.publicCoa ? 'ri-file-shield-2-fill' : 'ri-file-shield-2-line'}></i>
          {v.publicCoa ? 'COA Live' : 'No COA'}
        </span>
        {v.thirdPartyLab && (
          <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-700 flex items-center gap-1">
            <i className="ri-flask-line"></i>3rd-Party Lab
          </span>
        )}
        {v.qrVerify && (
          <span className="text-[10px] font-mono px-2 py-1 rounded-md bg-slate-50 border border-slate-200 text-slate-600 flex items-center gap-1">
            <i className="ri-qr-code-line"></i>QR Verify
          </span>
        )}
      </div>

      {/* Footer actions */}
      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
        <Link
          to={`/vendors/${v.slug}`}
          className="flex-1 whitespace-nowrap text-center px-3 py-2 rounded-lg text-xs font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors flex items-center justify-center gap-1.5"
        >
          <i className="ri-chat-3-line"></i>Read reviews
        </Link>
        <a
          href={`https://${v.domain}`}
          target="_blank"
          rel="noopener noreferrer nofollow"
          onClick={(e) => e.stopPropagation()}
          className="whitespace-nowrap px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 border border-slate-200 hover:border-teal-400 hover:text-teal-700 transition-colors flex items-center gap-1.5"
        >
          Store<i className="ri-external-link-line"></i>
        </a>
      </div>
    </div>
  );
}