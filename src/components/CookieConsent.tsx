import React, { useState, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import LegalModal from './LegalModal';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'terms' | 'privacy' }>({
    isOpen: false,
    type: 'privacy',
  });
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 2500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted');
    setIsVisible(false);
  };

  return (
    <>
      {isVisible && (
        <div className="fixed bottom-0 left-0 right-0 z-[90] p-4 md:p-6 pointer-events-none">
          <div className="max-w-4xl mx-auto bg-white border-4 border-black p-4 md:p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] pointer-events-auto flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <div className="flex-1 text-sm text-black font-bold leading-relaxed">
              {t('cookie.text')}
              <button
                type="button"
                onClick={() => setLegalModal({ isOpen: true, type: 'privacy' })}
                className="text-black bg-yellow-400 px-1.5 py-0.5 border-2 border-black hover:bg-white transition-colors underline"
              >
                {t('cookie.link')}
              </button>
              .
            </div>
            <button
              type="button"
              onClick={acceptCookies}
              className="brutal-btn w-full md:w-auto whitespace-nowrap px-7 py-2.5 text-sm uppercase"
            >
              {t('cookie.button')}
            </button>
          </div>
        </div>
      )}

      {legalModal.isOpen && (
        <LegalModal
          isOpen={legalModal.isOpen}
          type={legalModal.type}
          onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
        />
      )}
    </>
  );
}
