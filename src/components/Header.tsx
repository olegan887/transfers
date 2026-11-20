import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { WHATSAPP_NUMBER } from '../config';
import { reportConversion } from '../lib/analytics';
import { buildLocalizedPath } from '../lib/routing';
import Logo from './Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  const handleWhatsAppClick = () => {
    reportConversion();
  };

  const homeHref = buildLocalizedPath('home', language);
  const routesHref = buildLocalizedPath('routes-index', language);
  const blogHref = buildLocalizedPath('blog-list', language);
  const destinationsHref = `${homeHref}#destinations`;
  const featuresHref = `${homeHref}#features`;

  return (
    <>
      <div className="w-full bg-yellow-400 text-black border-b-2 border-black py-2 text-center text-xs sm:text-sm font-bold tracking-wide z-[60] relative px-4">
        {language === 'ru'
          ? 'Спецпредложение: скидка 10% при бронировании трансфера туда-обратно'
          : 'Special Offer: 10% OFF when you book a round-trip airport transfer'}
      </div>
      <header
        className={`sticky top-3 mx-auto w-[95%] max-w-6xl z-50 transition-all duration-200 ${
          isScrolled ? 'translate-y-0' : 'translate-y-1'
        }`}
      >
        <div
          className={`transition-all duration-200 rounded-2xl px-4 sm:px-6 py-3 flex items-center justify-between gap-4 ${
            isScrolled
              ? 'bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
              : 'bg-white/95 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
          }`}
        >
          <a href={homeHref} className="hover:opacity-90 transition-opacity shrink-0">
            <Logo />
          </a>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6">
            <a
              href={destinationsHref}
              className="text-sm font-bold text-black hover:text-yellow-600 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav.destinations')}
            </a>
            <a
              href={routesHref}
              className="text-sm font-bold text-black hover:text-yellow-600 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav.routes')}
            </a>
            <a
              href={featuresHref}
              className="text-sm font-bold text-black hover:text-yellow-600 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav.features')}
            </a>
            <a
              href={blogHref}
              className="text-sm font-bold text-black hover:text-yellow-600 transition-colors whitespace-nowrap shrink-0"
            >
              {t('nav.blog')}
            </a>

            <div className="flex items-center gap-4 ml-2 pl-5 border-l-2 border-black shrink-0">
              <button
                type="button"
                onClick={toggleLanguage}
                aria-label={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
                className="flex items-center gap-1.5 text-xs font-black tracking-wider text-black hover:text-yellow-600 transition-colors whitespace-nowrap py-1.5 px-2 border-2 border-black rounded-lg bg-white"
              >
                <Globe className="w-4 h-4" />
                {language === 'ru' ? 'EN' : 'RU'}
              </button>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
                className="brutal-btn px-4 py-2 text-sm whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                WhatsApp
              </a>
            </div>
          </nav>

          {/* Mobile Menu Controls */}
          <div className="md:hidden flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleWhatsAppClick}
              aria-label="WhatsApp"
              className="flex items-center justify-center w-9 h-9 bg-[#25D366] text-white rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
            <button
              type="button"
              onClick={toggleLanguage}
              aria-label={language === 'ru' ? 'Switch to English' : 'Переключить на русский'}
              className="flex items-center gap-1 text-xs font-black tracking-wider text-black border-2 border-black rounded-lg px-2 py-1.5 bg-white"
            >
              <Globe className="w-4 h-4" />
              <span>{language === 'ru' ? 'EN' : 'RU'}</span>
            </button>
            <button
              type="button"
              aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileMenuOpen}
              className="p-2 text-black hover:text-yellow-600"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-3 bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <nav aria-label="Mobile navigation" className="flex flex-col p-2">
              <a
                href={destinationsHref}
                className="py-3.5 px-5 text-black hover:bg-yellow-100 rounded-xl transition-colors font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.destinations')}
              </a>
              <a
                href={routesHref}
                className="py-3.5 px-5 text-black hover:bg-yellow-100 rounded-xl transition-colors font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.routes')}
              </a>
              <a
                href={featuresHref}
                className="py-3.5 px-5 text-black hover:bg-yellow-100 rounded-xl transition-colors font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.features')}
              </a>
              <a
                href={blogHref}
                className="py-3.5 px-5 text-black hover:bg-yellow-100 rounded-xl transition-colors font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.blog')}
              </a>
              <div className="p-3 mt-1">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleWhatsAppClick}
                  className="brutal-btn w-full py-3 text-base"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  WhatsApp
                </a>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
