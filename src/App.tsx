import React, { Suspense, lazy, useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Features from './components/Features';
import ContactForm from './components/ContactForm';
import AirportFaqAndReviews from './components/AirportFaqAndReviews';
import Footer from './components/Footer';
import CookieConsent from './components/CookieConsent';
import { LanguageProvider } from './i18n/LanguageContext';
import { DataProvider } from './context/DataContext';
import { WHATSAPP_NUMBER, ENABLE_EXIT_INTENT_POPUP } from './config';
import { initDeferredAnalytics, reportContactClick, trackPageView } from './lib/analytics';
import { normalizePathname, parseRoute } from './lib/routing';
import { useDocumentMeta } from './hooks/useDocumentMeta';

const SuccessPage = lazy(() => import('./components/SuccessPage'));
const BlogList = lazy(() => import('./components/BlogList'));
const BlogPost = lazy(() => import('./components/BlogPost'));
const RouteLandingPage = lazy(() => import('./components/RouteLandingPage'));
const RoutesIndexPage = lazy(() => import('./components/RoutesIndexPage'));
const HubLandingPage = lazy(() => import('./components/HubLandingPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const ContactPage = lazy(() => import('./components/ContactPage'));
const LegalPage = lazy(() => import('./components/LegalPage'));
const WidgetBuilderPage = lazy(() => import('./components/WidgetBuilderPage'));
const EmbedCalculator = lazy(() => import('./components/EmbedCalculator'));
const NotFoundPage = lazy(() => import('./components/NotFoundPage'));
const ExitIntentPopup = lazy(() => import('./components/ExitIntentPopup'));

interface AppProps {
  initialPath?: string;
  initialSearch?: string;
}

function AppContent({ initialPath, initialSearch }: AppProps) {
  const [locationState, setLocationState] = useState(() => {
    if (typeof window !== 'undefined') {
      return {
        pathname: window.location.pathname,
        search: window.location.search,
      };
    }
    return {
      pathname: initialPath || '/',
      search: initialSearch || '',
    };
  });

  useEffect(() => {
    const handleLocationChange = () => {
      setLocationState({
        pathname: window.location.pathname,
        search: window.location.search,
      });
    };

    // Intercept same-origin internal anchor clicks for instant SPA transitions while keeping real <a href> URLs
    const handleDocumentClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
        return;
      }
      const target = (e.target as HTMLElement | null)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href');
      if (!href || target.target === '_blank' || target.hasAttribute('download')) return;
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      const url = new URL(href, window.location.origin);
      if (url.origin !== window.location.origin) return;

      // Pure hash on current page
      if (normalizePathname(url.pathname) === normalizePathname(window.location.pathname) && url.hash) {
        return;
      }

      e.preventDefault();
      window.history.pushState({}, '', url.pathname + url.search + url.hash);
      window.dispatchEvent(new PopStateEvent('popstate'));

      if (url.hash) {
        window.setTimeout(() => {
          const el = document.querySelector(url.hash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 50);
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    document.addEventListener('click', handleDocumentClick);
    const cleanupAnalytics = initDeferredAnalytics();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      document.removeEventListener('click', handleDocumentClick);
      cleanupAnalytics();
    };
  }, []);

  useDocumentMeta(locationState.pathname, locationState.search);

  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    trackPageView(`${locationState.pathname}${locationState.search}`);
  }, [locationState.pathname, locationState.search]);

  const [prefillRoute, setPrefillRoute] = useState({ from: '', to: '' });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(locationState.search || window.location.search);
    setPrefillRoute({
      from: params.get('from') || '',
      to: params.get('to') || '',
    });
  }, [locationState.search]);

  const parsed = parseRoute(locationState.pathname, locationState.search);

  if (parsed.view === 'success') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <SuccessPage />
      </Suspense>
    );
  }

  if (parsed.view === 'embed') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-white" />}>
        <EmbedCalculator />
      </Suspense>
    );
  }

  const renderContent = () => {
    if (parsed.view === 'widget') {
      return (
        <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
          <WidgetBuilderPage />
        </Suspense>
      );
    }
    if (parsed.view === 'routes-index') {
      return (
        <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
          <RoutesIndexPage />
        </Suspense>
      );
    }
    if (parsed.view === 'route' && parsed.slug) {
      return (
        <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
          <RouteLandingPage slug={parsed.slug} />
        </Suspense>
      );
    }
    if (parsed.view === 'hub-lca') {
      return (
        <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
          <HubLandingPage hubId="lca" />
        </Suspense>
      );
    }
    if (parsed.view === 'hub-pfo') {
      return (
        <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
          <HubLandingPage hubId="pfo" />
        </Suspense>
      );
    }
    if (parsed.view === 'hub-limassol') {
      return (
        <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
          <HubLandingPage hubId="limassol" />
        </Suspense>
      );
    }
    if (parsed.view === 'blog-list') {
      return (
        <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
          <BlogList />
        </Suspense>
      );
    }
    if (parsed.view === 'blog-post' && parsed.slug) {
      return (
        <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
          <BlogPost slug={parsed.slug} />
        </Suspense>
      );
    }
    if (parsed.view === 'about') {
      return (
        <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
          <AboutPage />
        </Suspense>
      );
    }
    if (parsed.view === 'contact') {
      return (
        <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
          <ContactPage />
        </Suspense>
      );
    }
    if (parsed.view === 'privacy') {
      return (
        <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
          <LegalPage type="privacy" />
        </Suspense>
      );
    }
    if (parsed.view === 'terms') {
      return (
        <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
          <LegalPage type="terms" />
        </Suspense>
      );
    }
    if (parsed.view === 'not-found') {
      return (
        <Suspense fallback={<div className="min-h-[60vh] bg-white" />}>
          <NotFoundPage />
        </Suspense>
      );
    }
    return (
      <main>
        <Hero defaultFrom={prefillRoute.from} defaultTo={prefillRoute.to} />
        <Destinations />
        <Features />
        <ContactForm />
        <AirportFaqAndReviews />
      </main>
    );
  };

  return (
    <div className="min-h-screen font-sans text-black selection:bg-yellow-400 selection:text-black relative">
      <Header currentPath={locationState.pathname} />
      {renderContent()}
      <Footer currentPath={locationState.pathname} />

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          reportContactClick('whatsapp');
        }}
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      <CookieConsent />
      {ENABLE_EXIT_INTENT_POPUP && (
        <Suspense fallback={null}>
          <ExitIntentPopup />
        </Suspense>
      )}
    </div>
  );
}

export default function App({ initialPath, initialSearch }: AppProps = {}) {
  const initialLang = parseRoute(
    typeof window !== 'undefined' ? window.location.pathname : initialPath || '/',
    typeof window !== 'undefined' ? window.location.search : initialSearch || ''
  ).lang;

  return (
    <LanguageProvider initialLanguage={initialLang}>
      <DataProvider>
        <AppContent initialPath={initialPath} initialSearch={initialSearch} />
      </DataProvider>
    </LanguageProvider>
  );
}
