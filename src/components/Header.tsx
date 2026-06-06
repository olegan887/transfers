import React, { useState, useEffect } from 'react';
import { Car, Menu, X, MessageCircle, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { getLinkPath } from '../lib/utils';
import Logo from './Logo';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'ru' ? 'en' : 'ru');
  };

  const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (typeof (window as any).gtag_report_conversion === 'function') {
      // Don't pass URL so it doesn't redirect, the anchor tag will handle the navigation
      (window as any).gtag_report_conversion();
    }
  };

  return (
    <>
      <div className="w-full bg-yellow-400 text-black border-b-2 border-black py-2.5 text-center text-xs sm:text-sm font-bold tracking-wide z-[60] relative">
        {language === 'ru' 
          ? '🔥 СПЕЦПРЕДЛОЖЕНИЕ: Скидка 10% при бронировании трансфера туда-обратно!' 
          : '🔥 SPECIAL OFFER: Get 10% OFF when you book a round-trip transfer!'}
      </div>
      <header 
        className={`absolute top-10 md:top-12 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-300 ${
          isScrolled ? 'translate-y-0' : 'translate-y-2'
        }`}
      >
      <div className={`transition-all duration-300 rounded-2xl px-6 py-3 flex items-center justify-between ${
        isScrolled ? 'bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]' : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-2">
          <a href={getLinkPath('/')} className="hover:opacity-90 transition-opacity">
            <Logo />
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href={getLinkPath('/#destinations')} className="text-sm font-bold text-black hover:text-yellow-500 transition-colors">{t('nav.destinations')}</a>
          <a href={getLinkPath('/#features')} className="text-sm font-bold text-black hover:text-yellow-500 transition-colors">{t('nav.features')}</a>
          <a href={getLinkPath('/blog')} className="text-sm font-bold text-black hover:text-yellow-500 transition-colors">{t('nav.blog')}</a>
          
          <div className="flex items-center gap-4 ml-2 pl-6 border-l-2 border-black">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-bold tracking-wider text-black hover:text-yellow-500 transition-colors"
            >
              <Globe className="w-4 h-4" />
              {language === 'ru' ? 'EN' : 'RU'}
            </button>
            <a 
              href="https://wa.me/35796867289" 
              target="_blank" 
              rel="noopener noreferrer" 
              onClick={handleWhatsAppClick}
              className="brutal-btn px-4 py-2 text-sm"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              WhatsApp
            </a>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-3 sm:gap-4">
          <a 
            href="https://wa.me/35796867289" 
            target="_blank" 
            rel="noopener noreferrer" 
            onClick={handleWhatsAppClick}
            className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-[#25D366] text-white rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-xs font-bold tracking-wider text-black hover:text-yellow-500"
          >
            <Globe className="w-4 h-4" />
            <span className="hidden sm:inline">{language === 'ru' ? 'EN' : 'RU'}</span>
            <span className="sm:hidden">{language === 'ru' ? 'EN' : 'RU'}</span>
          </button>
          <button 
            className="p-1 sm:p-2 text-black hover:text-yellow-500"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full left-0 right-0 mt-4 bg-white border-2 border-black rounded-2xl overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          >
            <nav className="flex flex-col p-2">
              <a href={getLinkPath('/#destinations')} className="py-4 px-6 text-black hover:bg-yellow-100 rounded-xl transition-colors font-bold" onClick={() => setMobileMenuOpen(false)}>{t('nav.destinations')}</a>
              <a href={getLinkPath('/#features')} className="py-4 px-6 text-black hover:bg-yellow-100 rounded-xl transition-colors font-bold" onClick={() => setMobileMenuOpen(false)}>{t('nav.features')}</a>
              <a href={getLinkPath('/blog')} className="py-4 px-6 text-black hover:bg-yellow-100 rounded-xl transition-colors font-bold" onClick={() => setMobileMenuOpen(false)}>{t('nav.blog')}</a>
              <div className="p-4 mt-2">
                <a 
                  href="https://wa.me/35796867289" 
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
          </motion.div>
        )}
      </AnimatePresence>
      </header>
    </>
  );
}
