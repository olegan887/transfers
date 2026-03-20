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
import { LanguageProvider } from './i18n/LanguageContext';
import { DataProvider } from './context/DataContext';

export default function App() {
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (window.location.pathname === '/success') {
      setIsSuccess(true);
    }
  }, []);

  if (isSuccess) {
    return (
      <LanguageProvider>
        <DataProvider>
          <SuccessPage />
        </DataProvider>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <DataProvider>
        <div className="min-h-screen bg-[#050505] font-sans text-white selection:bg-white/20 selection:text-white relative">
          <Header />
          <main>
            <Hero />
            <Features />
            <Destinations />
            <ContactForm />
            <SeoArticle />
          </main>
          <Footer />
          
          {/* Floating WhatsApp Button */}
          <a
            href="https://wa.me/35796867289"
            target="_blank"
            rel="noopener noreferrer"
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

