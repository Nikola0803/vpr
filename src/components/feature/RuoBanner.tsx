import { Link } from 'react-router-dom';

export default function RuoBanner() {
  return (
    <div className="fixed top-0 inset-x-0 z-[60] h-9 bg-teal-700 text-white">
      <Link
        to="/verification"
        className="h-full max-w-[1400px] mx-auto px-4 md:px-10 flex items-center justify-center gap-2 text-[11px] font-mono uppercase tracking-[0.14em]"
      >
        <i className="ri-shield-star-line text-emerald-300"></i>
        <span className="truncate">
          Research Use Only &middot; AI screens every review for non-RUO language
        </span>
        <span className="hidden sm:inline-flex items-center gap-1 text-emerald-200 whitespace-nowrap">
          How it works <i className="ri-arrow-right-line"></i>
        </span>
      </Link>
    </div>
  );
}