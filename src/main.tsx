import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import { normalizePathname } from './lib/routing';
import './index.css';

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
