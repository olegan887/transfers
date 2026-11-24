import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Features from './components/Features';
import ContactForm from './components/ContactForm';
import AirportFaqAndReviews from './components/AirportFaqAndReviews';
import Footer from './components/Footer';
import SuccessPage from './components/SuccessPage';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import RouteLandingPage from './components/RouteLandingPage';
import RoutesIndexPage from './components/RoutesIndexPage';
import WidgetBuilderPage from './components/WidgetBuilderPage';
import EmbedCalculator from './components/EmbedCalculator';
import NotFoundPage from './components/NotFoundPage';
import CookieConsent from './components/CookieConsent';
import ExitIntentPopup from './components/ExitIntentPopup';
import { LanguageProvider } from './i18n/LanguageContext';
import { DataProvider } from './context/DataContext';
import { WHATSAPP_NUMBER, ENABLE_EXIT_INTENT_POPUP } from './config';
import { initDeferredAnalytics, reportConversion } from './lib/analytics';
import { normalizePathname, parseRoute } from './lib/routing';
import { useDocumentMeta } from './hooks/useDocumentMeta';

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
    return <SuccessPage />;
  }

  if (parsed.view === 'embed') {
    return <EmbedCalculator />;
  }

  const renderContent = () => {
    if (parsed.view === 'widget') {
      return <WidgetBuilderPage />;
    }
    if (parsed.view === 'routes-index') {
      return <RoutesIndexPage />;
    }
    if (parsed.view === 'route' && parsed.slug) {
      return <RouteLandingPage slug={parsed.slug} />;
    }
    if (parsed.view === 'blog-list') {
      return <BlogList />;
    }
    if (parsed.view === 'blog-post' && parsed.slug) {
      return <BlogPost slug={parsed.slug} />;
    }
    if (parsed.view === 'not-found') {
      return <NotFoundPage />;
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
          reportConversion();
        }}
        className="fixed bottom-5 right-5 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-150"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>

      <CookieConsent />
      {ENABLE_EXIT_INTENT_POPUP && <ExitIntentPopup />}
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
