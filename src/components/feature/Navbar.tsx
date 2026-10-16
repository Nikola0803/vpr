import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Logo from '@/components/feature/Logo';

const baseLinks = [
  { to: '/vendors', label: 'Directory' },
  { to: '/certification', label: 'Certification' },
  { to: '/coa-verifier', label: 'COA Verifier' },
  { to: '/migration', label: 'Review Migration' },
  { to: '/seo', label: 'SEO' },
  { to: '/blog', label: 'Blog' },
  { to: '/pricing', label: 'Pricing' },
];

const SCAM_ALERT_LINK = { to: '/scam-alerts', label: 'Scam Alerts' };

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) setMenu(false);
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const links = user ? [...baseLinks, { to: '/dashboard', label: 'Dashboard' }] : baseLinks;
  const primary = user
    ? { to: user.role === 'vendor' ? '/dashboard' : '/vendors', label: user.role === 'vendor' ? 'Vendor Dashboard' : 'Browse Directory' }
    : { to: '/rate/demo', label: 'Submit a Review' };

  return (
    <header
      className={`fixed top-9 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'bg-white/85 backdrop-blur-xl border-b border-slate-200/80' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3.5 py-2 text-sm font-medium rounded-full transition-all whitespace-nowrap ${
                pathname === l.to
                  ? 'text-teal-700 bg-teal-50'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            to={SCAM_ALERT_LINK.to}
            className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-full transition-all whitespace-nowrap ${
              pathname === SCAM_ALERT_LINK.to
                ? 'bg-red-100 text-red-700'
                : 'bg-red-50 text-red-600 hover:bg-red-100'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            {SCAM_ALERT_LINK.label}
          </Link>
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          {!user ? (
            <>
              <Link
                to="/claim"
                className="text-slate-600 hover:text-slate-900 text-sm font-medium whitespace-nowrap px-3 py-2"
              >
                Claim a Store
              </Link>
              <Link to="/signin" className="text-slate-600 hover:text-slate-900 text-sm font-medium whitespace-nowrap px-3 py-2">
                Sign In
              </Link>
              <Link
                to={primary.to}
                className="whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
              >
                {primary.label}
                <i className="ri-star-line ml-1.5"></i>
              </Link>
            </>
          ) : (
            <>
              <div ref={menuRef} className="relative">
                <button
                  onClick={() => setMenu(!menu)}
                  className="flex items-center gap-2 rounded-full border border-slate-200 pl-1 pr-3 py-1.5 hover:border-teal-400 transition-colors"
                  aria-label="Account menu"
                >
                  <span className="w-7 h-7 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-white text-xs font-bold flex items-center justify-center">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm text-slate-700 max-w-[110px] truncate">{user.name}</span>
                  <i className="ri-arrow-down-s-line text-slate-400"></i>
                </button>

                {menu && (
                  <div className="absolute right-0 mt-2 w-56 rounded-xl bg-white border border-slate-200 p-2 shadow-lg shadow-slate-900/5">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <div className="text-sm text-slate-900 font-medium truncate">{user.name}</div>
                      <div className="text-xs text-slate-400 truncate">{user.email}</div>
                      <div className="mt-1.5 text-[10px] font-mono uppercase tracking-wider text-teal-700">
                        {user.role === 'vendor' ? 'Company account' : 'Researcher account'}
                      </div>
                    </div>
                    <Link
                      to="/dashboard"
                      onClick={() => setMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 rounded-md hover:bg-slate-100"
                    >
                      <i className="ri-dashboard-3-line"></i>Vendor Dashboard
                    </Link>
                    <Link
                      to="/claim"
                      onClick={() => setMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 rounded-md hover:bg-slate-100"
                    >
                      <i className="ri-store-3-line"></i>Claim a store
                    </Link>
                    <Link
                      to="/migration#request"
                      onClick={() => setMenu(false)}
                      className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 rounded-md hover:bg-slate-100"
                    >
                      <i className="ri-archive-drawer-line"></i>Migrate my reviews
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setMenu(false);
                      }}
                      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-amber-700 rounded-md hover:bg-slate-100"
                    >
                      <i className="ri-logout-box-r-line"></i>Sign Out
                    </button>
                  </div>
                )}
              </div>

              <Link
                to={primary.to}
                className="whitespace-nowrap px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-teal-600 hover:bg-teal-700 transition-colors"
              >
                {primary.label}
              </Link>
            </>
          )}
        </div>

        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center rounded-md border border-slate-200 text-slate-700"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <i className={open ? 'ri-close-line text-xl' : 'ri-menu-line text-xl'}></i>
        </button>
      </div>

      {open && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-6 py-4 space-y-2">
          {user && (
            <div className="px-3 py-2 mb-1 border-b border-slate-100">
              <div className="text-sm text-slate-900 font-medium truncate">{user.name}</div>
              <div className="text-xs text-slate-400">
                {user.role === 'vendor' ? 'Company account' : 'Researcher account'}
              </div>
            </div>
          )}
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to={SCAM_ALERT_LINK.to}
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-md"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            {SCAM_ALERT_LINK.label}
          </Link>
          <Link
            to={primary.to}
            onClick={() => setOpen(false)}
            className="block w-full text-center mt-2 px-4 py-2.5 rounded-full text-sm font-semibold text-white bg-teal-600"
          >
            {primary.label}
          </Link>
          {!user ? (
            <>
              <Link
                to="/claim"
                onClick={() => setOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-full text-sm font-medium text-slate-700 border border-slate-200"
              >
                Claim a Store
              </Link>
              <Link
                to="/signin"
                onClick={() => setOpen(false)}
                className="block w-full text-center px-4 py-2.5 rounded-full text-sm font-medium text-slate-700 border border-slate-200"
              >
                Sign In
              </Link>
            </>
          ) : (
            <button
              onClick={() => {
                signOut();
                setOpen(false);
              }}
              className="block w-full text-center px-4 py-2.5 rounded-full text-sm font-medium text-amber-700 border border-slate-200"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </header>
  );
}