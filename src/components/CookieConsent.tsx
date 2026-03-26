import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import LegalModal from './LegalModal';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'terms' | 'privacy' }>({
    isOpen: false,
    type: 'privacy'
  });
  const { language } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      // Small delay to not show immediately on load
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  const content = {
    en: {
      text: 'We use cookies and similar technologies to help personalize content, tailor and measure ads, and provide a better experience. By clicking accept, you agree to this, as outlined in our ',
      link: 'Privacy Policy',
      button: 'Accept All'
    },
    ru: {
      text: 'Мы используем файлы cookie для персонализации контента, настройки рекламы и улучшения пользовательского опыта. Нажимая «Принять», вы соглашаетесь с нашей ',
      link: 'Политикой конфиденциальности',
      button: 'Принять все'
    }
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6 pointer-events-none"
          >
            <div className="max-w-4xl mx-auto bg-white border-4 border-black p-4 md:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] pointer-events-auto flex flex-col md:flex-row items-center gap-4 md:gap-8 transform -rotate-1">
              <div className="flex-1 text-sm text-black font-bold leading-relaxed">
                {content[language].text}
                <button 
                  onClick={() => setLegalModal({ isOpen: true, type: 'privacy' })}
                  className="text-black bg-yellow-400 px-1 border-2 border-black hover:bg-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
                  {content[language].link}
                </button>.
              </div>
              <button
                onClick={acceptCookies}
                className="brutal-btn w-full md:w-auto whitespace-nowrap px-8 py-3 text-sm uppercase"
              >
                {content[language].button}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <LegalModal 
        isOpen={legalModal.isOpen} 
        type={legalModal.type} 
        onClose={() => setLegalModal({ ...legalModal, isOpen: false })} 
      />
    </>
  );
}
