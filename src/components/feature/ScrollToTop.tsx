import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Resets the scroll position to the top whenever the route changes.
 * When the URL contains a hash (e.g. /migration#request), it scrolls to the
 * matching section instead, so in-page anchor links actually land on target.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = decodeURIComponent(hash.replace(/^#/, ''));
      if (id) {
        // Wait for the target section to be painted before scrolling.
        const raf = requestAnimationFrame(() => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
          }
        });
        return () => cancelAnimationFrame(raf);
      }
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    return undefined;
  }, [pathname, hash]);

  return null;
}