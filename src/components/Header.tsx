import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, MessageCircle, Globe, ChevronDown, Check } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { WHATSAPP_NUMBER } from '../config';
import { reportContactClick } from '../lib/analytics';
import {
  buildLocalizedPath,
  CORE_LANGUAGES,
  LANGUAGE_LABELS,
  switchLanguagePath,
  Language,
} from '../lib/routing';
import Logo from './Logo';

interface HeaderProps {
  currentPath?: string;
}

export default function Header({ currentPath: propPath }: HeaderProps = {}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [clientPath, setClientPath] = useState(() =>
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const { language, setLanguage, t } = useLanguage();
  const currentPath = propPath ?? clientPath;

  useEffect(() => {
    const syncPath = () => {
      setClientPath(window.location.pathname);
    };
    syncPath();

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(event.target as Node)
      ) {
        setLangMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLangMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('popstate', syncPath);
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', syncPath);
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelectLanguage = (e: React.MouseEvent, targetLang: Language) => {
    e.preventDefault();
    e.stopPropagation();
    setLanguage(targetLang);
    setLangMenuOpen(false);
    setMobileMenuOpen(false);
  };

  const handleWhatsAppClick = () => {
    reportContactClick('whatsapp');
  };

  const homeHref = buildLocalizedPath('home', language);
  const routesHref = buildLocalizedPath('routes-index', language);
  const blogHref = buildLocalizedPath('blog-list', language);
  const destinationsHref = `${homeHref}#destinations`;
  const featuresHref = `${homeHref}#features`;

  return (
    <>
      <div className="w-full bg-yellow-400 text-black border-b-2 border-black py-2 text-center text-xs sm:text-sm font-bold tracking-wide z-[60] relative px-4">
        {t('hero.promoBanner')}
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
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-5 lg:gap-6">
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

            <div className="flex items-center gap-3 ml-1 pl-4 border-l-2 border-black shrink-0">
              {/* 7-Language Dropdown Switcher */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  type="button"
                  onClick={() => setLangMenuOpen((prev) => !prev)}
                  aria-expanded={langMenuOpen}
                  aria-haspopup="menu"
                  aria-label={`Select language (${LANGUAGE_LABELS[language].native})`}
                  className="flex items-center gap-1.5 text-xs font-black tracking-wider text-black hover:bg-yellow-100 transition-colors whitespace-nowrap py-1.5 px-2.5 border-2 border-black rounded-lg bg-white"
                >
                  <Globe className="w-4 h-4 shrink-0" />
                  <span>{LANGUAGE_LABELS[language].code}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-150 ${
                      langMenuOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {langMenuOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 mt-2 w-48 bg-white border-2 border-black rounded-xl shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] py-1.5 z-50"
                  >
                    {CORE_LANGUAGES.map((langCode) => {
                      const info = LANGUAGE_LABELS[langCode];
                      const isActive = langCode === language;
                      const href = switchLanguagePath(currentPath, langCode);
                      return (
                        <a
                          key={langCode}
                          href={href}
                          role="menuitem"
                          hrefLang={langCode}
                          onClick={(e) => handleSelectLanguage(e, langCode)}
                          className={`flex items-center justify-between px-3.5 py-2 text-xs font-bold transition-colors ${
                            isActive
                              ? 'bg-yellow-400 text-black font-black'
                              : 'text-black hover:bg-yellow-100'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="font-black w-6">{info.code}</span>
                            <span>{info.native}</span>
                          </span>
                          {isActive && <Check className="w-3.5 h-3.5 shrink-0" />}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>

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
              onClick={() => setMobileMenuOpen(true)}
              aria-label={`Select language (${LANGUAGE_LABELS[language].native})`}
              className="flex items-center gap-1 text-xs font-black tracking-wider text-black border-2 border-black rounded-lg px-2 py-1.5 bg-white"
            >
              <Globe className="w-4 h-4" />
              <span>{LANGUAGE_LABELS[language].code}</span>
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
                className="py-3 px-4 text-black hover:bg-yellow-100 rounded-xl transition-colors font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.destinations')}
              </a>
              <a
                href={routesHref}
                className="py-3 px-4 text-black hover:bg-yellow-100 rounded-xl transition-colors font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.routes')}
              </a>
              <a
                href={featuresHref}
                className="py-3 px-4 text-black hover:bg-yellow-100 rounded-xl transition-colors font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.features')}
              </a>
              <a
                href={blogHref}
                className="py-3 px-4 text-black hover:bg-yellow-100 rounded-xl transition-colors font-bold"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('nav.blog')}
              </a>

              {/* Mobile 7-Language Selector Grid */}
              <div className="px-3 py-3 mt-1 border-t-2 border-black">
                <div className="grid grid-cols-4 gap-1.5">
                  {CORE_LANGUAGES.map((langCode) => {
                    const info = LANGUAGE_LABELS[langCode];
                    const isActive = langCode === language;
                    const href = switchLanguagePath(currentPath, langCode);
                    return (
                      <a
                        key={langCode}
                        href={href}
                        hrefLang={langCode}
                        onClick={(e) => handleSelectLanguage(e, langCode)}
                        className={`py-2 px-2 text-center rounded-lg border-2 border-black text-xs font-black transition-colors ${
                          isActive
                            ? 'bg-yellow-400 text-black'
                            : 'bg-white text-black hover:bg-gray-100'
                        }`}
                        title={info.native}
                      >
                        {info.code}
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="p-3 pt-1">
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
