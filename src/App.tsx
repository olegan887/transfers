import { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Destinations from './components/Destinations';
import Features from './components/Features';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import SuccessPage from './components/SuccessPage';
import SeoArticle from './components/SeoArticle';
import CookieConsent from './components/CookieConsent';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import ExitIntentPopup from './components/ExitIntentPopup';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';
import { DataProvider } from './context/DataContext';
import { WHATSAPP_NUMBER } from './config';
import { reportConversion } from './lib/analytics';

function AppContent() {
  const [currentPath, setCurrentPath] = useState('');

  const handleLocationChange = () => {
    let path = window.location.pathname;
    
    // Strip trailing slashes for consistency
    if (path.endsWith('/') && path.length > 1) {
      path = path.slice(0, -1);
    }
    
    const params = new URLSearchParams(window.location.search);
    const hasSuccess = params.has('direct_success') || params.has('session_id') || path.endsWith('/success');
    
    if (hasSuccess) {
      setCurrentPath('/success');
    } else if (path.endsWith('/blog')) {
      setCurrentPath('/blog');
    } else if (path.includes('/blog/')) {
      const match = path.match(/\/blog\/(.+)$/);
      if (match) {
        setCurrentPath(`/blog/${match[1]}`);
      } else {
        setCurrentPath('/');
      }
    } else {
      setCurrentPath('/');
    }
  };

  useEffect(() => {
    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    if (currentPath === '/' || currentPath === '/#destinations' || currentPath === '/#features') {
      document.title = 'Cyprus Airport Transfers | Taxi Paphos & Larnaca';
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', 'Reliable airport transfers in Cyprus. Book a taxi from Paphos (PFO) or Larnaca (LCA) to Limassol, Paphos City, Ayia Napa. Fixed prices, comfortable cars.');
      }
    }
  }, [currentPath]);

  if (currentPath === '/success') {
    return <SuccessPage />;
  }

  const renderContent = () => {
    if (currentPath === '/blog') {
      return <BlogList />;
    }
    if (currentPath.startsWith('/blog/')) {
      const slug = currentPath.replace('/blog/', '');
      return <BlogPost slug={slug} />;
    }
    return (
      <main>
        <Hero />
        <Destinations />
        <Features />
        <ContactForm />
        <SeoArticle />
      </main>
    );
  };

  return (
    <div className="min-h-screen font-sans text-black selection:bg-yellow-400 selection:text-black relative">
      <Header />
      {renderContent()}
      <Footer />
      
      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => {
          reportConversion();
        }}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
      </a>
      
      <CookieConsent />
      <ExitIntentPopup />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </LanguageProvider>
  );
}
