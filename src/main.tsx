import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { normalizePathname, parseRoute } from './lib/routing';
import { loadTranslation } from './i18n/localeLoader';
import { loadRouteDetails } from './data/routeDetails';
import './index.css';

async function bootstrap() {
  const parsed = parseRoute(window.location.pathname, window.location.search);
  await loadTranslation(parsed.lang);
  if (parsed.view === 'route') {
    await loadRouteDetails(parsed.lang);
  }

  const rootElement = document.getElementById('root')!;
  const ssrPath = rootElement.getAttribute('data-ssr-path');
  const currentPath = normalizePathname(window.location.pathname);
  const hasBookingCallbackParams =
    window.location.search.includes('session_id=') ||
    window.location.search.includes('direct_success=');

  const canHydrate =
    rootElement.firstElementChild !== null &&
    ssrPath !== null &&
    normalizePathname(ssrPath) === currentPath &&
    !hasBookingCallbackParams;

  if (canHydrate) {
    hydrateRoot(
      rootElement,
      <StrictMode>
        <App />
      </StrictMode>
    );
  } else {
    if (rootElement.childNodes.length > 0) {
      rootElement.innerHTML = '';
    }
    createRoot(rootElement).render(
      <StrictMode>
        <App />
      </StrictMode>
    );
  }
}

bootstrap();
