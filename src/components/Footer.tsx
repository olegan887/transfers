import React, { useState, useEffect } from 'react';
import { MessageCircle, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { WHATSAPP_NUMBER } from '../config';
import { buildLocalizedPath } from '../lib/routing';
import { airportRoutes } from '../data/routes';
import LegalModal from './LegalModal';
import Logo from './Logo';

export default function Footer() {
  const { t, language } = useLanguage();
  const [year, setYear] = useState(2026);
  const [legalModal, setLegalModal] = useState<{ isOpen: boolean; type: 'terms' | 'privacy' }>({
    isOpen: false,
    type: 'terms',
  });

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const openLegal = (e: React.MouseEvent, type: 'terms' | 'privacy') => {
    e.preventDefault();
    setLegalModal({ isOpen: true, type });
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
            <h4 className="text-black font-black mb-5 uppercase tracking-wider text-sm bg-yellow-400 inline-block px-2.5 py-1 border-2 border-black">
              {t('footer.routes')}
            </h4>
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
            <h4 className="text-black font-black mb-5 uppercase tracking-wider text-sm bg-yellow-400 inline-block px-2.5 py-1 border-2 border-black">
              {t('footer.nav')}
            </h4>
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
                  href={buildLocalizedPath('widget', language)}
                  className="hover:text-yellow-600 transition-colors"
                >
                  {t('nav.widget')}
                </a>
              </li>
              <li>
                <a
                  href={language === 'ru' ? '/ru/rss.xml' : '/rss.xml'}
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
            <h4 className="text-black font-black mb-5 uppercase tracking-wider text-sm bg-yellow-400 inline-block px-2.5 py-1 border-2 border-black">
              {t('footer.contacts')}
            </h4>
            <ul className="space-y-3 text-sm font-bold mb-6">
              <li>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
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

        <div className="pt-6 border-t-4 border-black text-xs text-center flex flex-col md:flex-row justify-between items-center gap-4 font-bold">
          <p>
            &copy; {year} Cyprus Airport Transfer .co. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={(e) => openLegal(e, 'privacy')}
              className="hover:text-yellow-600 transition-colors uppercase"
            >
              {t('footer.privacy')}
            </button>
            <button
              type="button"
              onClick={(e) => openLegal(e, 'terms')}
              className="hover:text-yellow-600 transition-colors uppercase"
            >
              {t('footer.terms')}
            </button>
          </div>
        </div>
      </div>

      {legalModal.isOpen && (
        <LegalModal
          isOpen={legalModal.isOpen}
          type={legalModal.type}
          onClose={() => setLegalModal({ ...legalModal, isOpen: false })}
        />
      )}
    </footer>
  );
}
