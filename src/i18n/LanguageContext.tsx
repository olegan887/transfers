import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getLoadedTranslation, isTranslationLoaded, loadTranslation } from './localeLoader';
import { parseRoute, switchLanguagePath, type Language } from '../lib/routing';

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
  const [localeTick, setLocaleTick] = useState(0);

  useEffect(() => {
    let active = true;
    if (!isTranslationLoaded(language)) {
      loadTranslation(language).then(() => {
        if (active) setLocaleTick((v) => v + 1);
      });
    }
    return () => {
      active = false;
    };
  }, [language]);

  // Keep language synchronized with browser history navigation (back/forward)
  useEffect(() => {
    let active = true;
    const syncFromUrl = async () => {
      const urlLang = parseRoute(window.location.pathname, window.location.search).lang;
      if (!isTranslationLoaded(urlLang)) {
        await loadTranslation(urlLang);
      }
      if (active) setLanguage(urlLang);
    };
    window.addEventListener('popstate', syncFromUrl);
    return () => {
      active = false;
      window.removeEventListener('popstate', syncFromUrl);
    };
  }, []);

  const handleSetLanguage = useCallback(async (lang: Language) => {
    if (!isTranslationLoaded(lang)) {
      await loadTranslation(lang);
    }
    setLanguage(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('app_language', lang);
      document.documentElement.lang = lang;

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
      document.documentElement.lang = language;
    }
  }, [language]);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const keys = key.split('.');
      let value: any = getLoadedTranslation(language);

      for (const k of keys) {
        if (value === undefined || value === null) {
          value = undefined;
          break;
        }
        value = value[k];
      }

      if (value === undefined || value === null) {
        let fallback: any = getLoadedTranslation('en');
        for (const k of keys) {
          if (fallback === undefined || fallback === null) return key;
          fallback = fallback[k];
        }
        value = fallback !== undefined && fallback !== null ? fallback : key;
      }

      let result = String(value);

      if (params) {
        Object.entries(params).forEach(([k, v]) => {
          result = result.replaceAll(`{${k}}`, String(v));
        });
      }

      return result;
    },
    [language, localeTick]
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
