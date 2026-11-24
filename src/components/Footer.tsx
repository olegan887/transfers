import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, MapPin, Globe } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { WHATSAPP_NUMBER } from '../config';
import {
  buildLocalizedPath,
  CORE_LANGUAGES,
  LANGUAGE_LABELS,
  switchLanguagePath,
  Language,
} from '../lib/routing';
import { airportRoutes } from '../data/routes';
import { reportContactClick } from '../lib/analytics';
import Logo from './Logo';

interface FooterProps {
  currentPath?: string;
}

export default function Footer({ currentPath }: FooterProps = {}) {
  const { t, language, setLanguage } = useLanguage();
  const [year, setYear] = useState(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const activePath = currentPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/');

  const handleLanguageLinkClick = (e: React.MouseEvent, langCode: Language) => {
    e.preventDefault();
    setLanguage(langCode);
  };

  const homeHref = buildLocalizedPath('home', language);
  const topFooterSlugs = [
    'larnaca-airport-to-limassol',
    'paphos-airport-to-limassol',
    'larnaca-airport-to-paphos',
    'paphos-airport-to-larnaca-city',
    'limassol-to-paphos',
    'limassol-to-nicosia',
  ];
  const topFooterRoutes = topFooterSlugs
    .map((s) => airportRoutes.find((r) => r.slug === s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <footer className="bg-white text-black py-16 border-t-4 border-black relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-5">
            <a href={homeHref} className="inline-block">
              <Logo />
            </a>
            <p className="text-sm leading-relaxed font-bold text-gray-800">{t('footer.desc')}</p>
            <span className="bg-black text-white px-3 py-1.5 font-black text-xs inline-block">
              {t('footer.returnOffer')}
            </span>
          </div>

          <div>
            <p className="text-black font-black mb-5 uppercase tracking-wider text-sm bg-yellow-400 inline-block px-2.5 py-1 border-2 border-black">
              {t('footer.routes')}
            </p>
            <ul className="space-y-2.5 text-sm font-bold">
              {topFooterRoutes.map((route) => (
                <li key={route.slug}>
                  <a
                    href={buildLocalizedPath('route', language, route.slug)}
                    className="hover:text-yellow-600 transition-colors"
                  >
                    {route[language].h1} (€{route.basePrice})
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-black font-black mb-5 uppercase tracking-wider text-sm bg-yellow-400 inline-block px-2.5 py-1 border-2 border-black">
              {t('footer.nav')}
            </p>
            <ul className="space-y-3 text-sm font-bold">
              <li>
                <a href={`${homeHref}#destinations`} className="hover:text-yellow-600 transition-colors">
                  {t('nav.destinations')}
                </a>
              </li>
              <li>
                <a
                  href={buildLocalizedPath('routes-index', language)}
                  className="hover:text-yellow-600 transition-colors"
                >
                  {t('nav.routes')}
                </a>
              </li>
              <li>
                <a href={`${homeHref}#features`} className="hover:text-yellow-600 transition-colors">
                  {t('nav.features')}
                </a>
              </li>
              <li>
                <a
                  href={buildLocalizedPath('blog-list', language)}
                  className="hover:text-yellow-600 transition-colors"
                >
                  {t('nav.blog')}
                </a>
              </li>
              <li>
                <a
                  href={buildLocalizedPath('about', language)}
                  className="hover:text-yellow-600 transition-colors"
                >
                  {t('nav.about')}
                </a>
              </li>
              <li>
                <a
                  href={buildLocalizedPath('contact', language)}
                  className="hover:text-yellow-600 transition-colors"
                >
                  {t('nav.contact')}
                </a>
              </li>
              <li>
                <a
                  href={buildLocalizedPath('widget', language)}
                  className="hover:text-yellow-600 transition-colors"
                >
                  {t('nav.widget')}
                </a>
              </li>
              <li>
                <a
                  href={language === 'en' ? '/rss.xml' : `/${language}/rss.xml`}
                  className="hover:text-yellow-600 transition-colors"
                >
                  RSS / JSON Feed
                </a>
              </li>
              <li>
                <a href={`${homeHref}#faq`} className="hover:text-yellow-600 transition-colors">
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-black font-black mb-5 uppercase tracking-wider text-sm bg-yellow-400 inline-block px-2.5 py-1 border-2 border-black">
              {t('footer.contacts')}
            </p>
            <ul className="space-y-3 text-sm font-bold mb-6">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => reportContactClick('whatsapp')}
                  className="flex items-center gap-2.5 hover:text-[#25D366] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  <span>WhatsApp (+357 96 867289)</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@cyprus-airport-transfer.co"
                  className="flex items-center gap-2.5 hover:text-yellow-600 transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>info@cyprus-airport-transfer.co</span>
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cyprus</span>
              </li>
            </ul>

            <p className="text-xs font-bold text-gray-700 mb-3">{t('footer.paymentDesc')}</p>
            <div className="flex gap-2">
              <div className="w-12 h-7 bg-white border-2 border-black flex items-center justify-center text-[10px] font-black">
                VISA
              </div>
              <div className="w-12 h-7 bg-white border-2 border-black flex items-center justify-center text-[10px] font-black">
                MC
              </div>
              <div className="w-16 h-7 bg-white border-2 border-black flex items-center justify-center text-[10px] font-black">
                STRIPE
              </div>
            </div>
          </div>
        </div>

        <nav
          aria-label="Languages"
          className="mb-8 pt-6 border-t-2 border-black flex flex-wrap items-center justify-center md:justify-start gap-2"
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-black uppercase tracking-wider text-black mr-2">
            <Globe className="w-4 h-4 shrink-0" />
            <span>Languages:</span>
          </span>
          {CORE_LANGUAGES.map((langCode) => {
            const info = LANGUAGE_LABELS[langCode];
            const isActive = langCode === language;
            const href = switchLanguagePath(activePath, langCode);
            return (
              <a
                key={langCode}
                href={href}
                hrefLang={langCode}
                aria-current={isActive ? 'page' : undefined}
                onClick={(e) => handleLanguageLinkClick(e, langCode)}
                className={`px-2.5 py-1 text-xs font-black border-2 border-black rounded-lg transition-colors ${
                  isActive
                    ? 'bg-yellow-400 text-black'
                    : 'bg-white text-black hover:bg-yellow-100'
                }`}
              >
                {info.code} · {info.native}
              </a>
            );
          })}
        </nav>

        <div className="pt-6 border-t-4 border-black text-xs text-center flex flex-col md:flex-row justify-between items-center gap-4 font-bold">
          <p>
            &copy; {year} Cyprus Airport Transfer .co. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <a
              href={buildLocalizedPath('privacy', language)}
              className="hover:text-yellow-600 transition-colors uppercase"
            >
              {t('footer.privacy')}
            </a>
            <a
              href={buildLocalizedPath('terms', language)}
              className="hover:text-yellow-600 transition-colors uppercase"
            >
              {t('footer.terms')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
