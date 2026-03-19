/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Destinations from './components/Destinations';
import Footer from './components/Footer';
import SuccessPage from './components/SuccessPage';
import SeoArticle from './components/SeoArticle';
import { LanguageProvider } from './i18n/LanguageContext';

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
        <SuccessPage />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#050505] font-sans text-white selection:bg-white/20 selection:text-white">
        <Header />
        <main>
          <Hero />
          <Features />
          <Destinations />
          <SeoArticle />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}

