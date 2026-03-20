/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { MessageCircle } from 'lucide-react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Destinations from './components/Destinations';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import SuccessPage from './components/SuccessPage';
import SeoArticle from './components/SeoArticle';
import CookieConsent from './components/CookieConsent';
import BlogList from './components/BlogList';
import BlogPost from './components/BlogPost';
import { LanguageProvider } from './i18n/LanguageContext';
import { DataProvider } from './context/DataContext';

export default function App() {
  const [currentPath, setCurrentPath] = useState('');

  useEffect(() => {
    setCurrentPath(window.location.pathname);
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
    return (
      <LanguageProvider>
        <DataProvider>
          <SuccessPage />
        </DataProvider>
      </LanguageProvider>
    );
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
        <Features />
        <Destinations />
        <ContactForm />
        <SeoArticle />
      </main>
    );
  };

  return (
    <LanguageProvider>
      <DataProvider>
        <div className="min-h-screen bg-[#050505] font-sans text-white selection:bg-white/20 selection:text-white relative">
          <Header />
          {renderContent()}
          <Footer />
          
          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/35796867289"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (typeof (window as any).gtag_report_conversion === 'function') {
                (window as any).gtag_report_conversion();
              }
            }}
            className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-lg shadow-[#25D366]/30 hover:scale-110 transition-transform duration-300"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle className="w-7 h-7" />
          </a>
          
          <CookieConsent />
        </div>
      </DataProvider>
    </LanguageProvider>
  );
}

