import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, Language } from './translations';
import { parseRoute, switchLanguagePath } from '../lib/routing';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLanguage(explicit?: Language): Language {
  if (explicit) return explicit;
  if (typeof window !== 'undefined') {
    return parseRoute(window.location.pathname, window.location.search).lang;
  }
  return 'en';
}

export const LanguageProvider: React.FC<{ children: React.ReactNode; initialLanguage?: Language }> = ({
  children,
  initialLanguage,
}) => {
  const [language, setLanguage] = useState<Language>(() => getInitialLanguage(initialLanguage));

  // Keep language synchronized with browser history navigation (back/forward)
  useEffect(() => {
    const syncFromUrl = () => {
      const urlLang = parseRoute(window.location.pathname, window.location.search).lang;
      setLanguage(urlLang);
    };
    window.addEventListener('popstate', syncFromUrl);
    return () => window.removeEventListener('popstate', syncFromUrl);
  }, []);

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_language', lang);
      document.documentElement.lang = lang === 'ru' ? 'ru' : 'en';

      const targetPath = switchLanguagePath(window.location.pathname, lang, window.location.search);
      const currentPathWithSearch = window.location.pathname + window.location.search;
      if (targetPath !== currentPathWithSearch) {
        window.history.pushState({}, '', targetPath);
        window.dispatchEvent(new PopStateEvent('popstate'));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language === 'ru' ? 'ru' : 'en';
    }
  }, [language]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const keys = key.split('.');
      let value: any = translations[language];

      for (const k of keys) {
        if (value === undefined || value === null) {
          return key;
        }
        value = value[k];
      }

      let result = value !== undefined && value !== null ? value : key;

      if (params && typeof result === 'string') {
        Object.entries(params).forEach(([k, v]) => {
          result = result.replaceAll(`{${k}}`, String(v));
        });
      }

      return result;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
};
