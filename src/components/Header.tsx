import React, { useState, useEffect } from 'react';
import { Car, Menu, X, Phone, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

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

  return (
    <header 
      className={`absolute top-4 md:top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50 transition-all duration-500 ${
        isScrolled ? 'translate-y-0' : 'translate-y-2'
      }`}
    >
      <div className={`transition-all duration-500 rounded-full px-6 py-3 flex items-center justify-between ${
        isScrolled ? 'glass-panel shadow-2xl shadow-black/50' : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-2">
          <img src="/logo1.png" alt="Cyprus Airport Transfer" className="h-16 md:h-24 object-contain" />
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#destinations" className="text-sm font-medium text-white/70 hover:text-white transition-colors">{t('nav.destinations')}</a>
          <a href="#features" className="text-sm font-medium text-white/70 hover:text-white transition-colors">{t('nav.features')}</a>
          
          <div className="flex items-center gap-4 ml-2 pl-6 border-l border-white/10">
            <button 
              onClick={toggleLanguage}
              className="flex items-center gap-1 text-xs font-semibold tracking-wider text-white/70 hover:text-white transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              {language === 'ru' ? 'EN' : 'RU'}
            </button>
            <a href="tel:+35799123456" className="flex items-center gap-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-colors">
              <Phone className="w-3.5 h-3.5" />
              +357 99 123 456
            </a>
          </div>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <button 
            onClick={toggleLanguage}
            className="flex items-center gap-1 text-xs font-semibold tracking-wider text-white/70 hover:text-white"
          >
            <Globe className="w-4 h-4" />
            {language === 'ru' ? 'EN' : 'RU'}
          </button>
          <button 
            className="p-2 text-white/70 hover:text-white"
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
            className="md:hidden absolute top-full left-0 right-0 mt-4 glass-panel rounded-3xl overflow-hidden shadow-2xl"
          >
            <nav className="flex flex-col p-2">
              <a href="#destinations" className="py-4 px-6 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>{t('nav.destinations')}</a>
              <a href="#features" className="py-4 px-6 text-white/80 hover:text-white hover:bg-white/5 rounded-xl transition-colors font-medium" onClick={() => setMobileMenuOpen(false)}>{t('nav.features')}</a>
              <div className="p-4 mt-2">
                <a href="tel:+35799123456" className="flex items-center justify-center gap-2 bg-white text-black py-3 rounded-xl font-semibold">
                  <Phone className="w-4 h-4" />
                  +357 99 123 456
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
