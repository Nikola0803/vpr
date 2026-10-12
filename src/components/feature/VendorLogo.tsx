interface VendorLogoProps {
  name: string;
  init: string;
  logo?: string;
  logoDark?: boolean;
  /** Optional custom tile background (tailwind classes) used behind a real logo image. */
  logoBg?: string;
  /** Placeholder tile gradient, used only until a real logo image is dropped into the vendor data. */
  brand?: string;
  boxClass?: string;
  imgClass?: string;
  textClass?: string;
  verified?: boolean;
}

export default function VendorLogo({
  name,
  init,
  logo,
  logoDark = false,
  logoBg,
  brand = 'from-teal-500 to-emerald-500',
  boxClass = 'w-12 h-12',
  imgClass = 'max-h-7 max-w-[46px]',
  textClass = 'text-base',
  verified = false,
}: VendorLogoProps) {
  const surface = logo
    ? logoBg ?? (logoDark ? 'bg-slate-900' : 'bg-white border border-slate-200')
    : `bg-gradient-to-br ${brand}`;

  return (
    <div className={`relative shrink-0 ${boxClass}`}>
      <div className={`w-full h-full rounded-xl flex items-center justify-center overflow-hidden ${surface}`}>
        {logo ? (
          <img src={logo} alt={`${name} logo`} title={`${name} logo`} className={`object-contain ${imgClass}`} />
        ) : (
          <span className={`font-display font-extrabold text-white tracking-tight ${textClass}`}>{init}</span>
        )}
      </div>
      {verified && (
        <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-white flex items-center justify-center">
          <i className="ri-verified-badge-fill text-emerald-500 text-sm"></i>
        </span>
      )}
    </div>
  );
}