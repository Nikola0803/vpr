import { StrictMode } from 'react'
import './i18n'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// SPA deep-link recovery: if the host bounced a cold/shared link (e.g.
// /vendors/evlv-peptides) to the app root via 404.html with a ?spa_redirect=
// param, restore the original route before React Router mounts so the correct
// page renders instead of the homepage.
;(function restoreDeepLink() {
  try {
    const params = new URLSearchParams(window.location.search);
    const target = params.get('spa_redirect');
    if (target) {
      window.history.replaceState(null, '', target);
    }
  } catch {
    // no-op: fall back to default routing
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
