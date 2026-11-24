import React, { useState } from 'react';
import { ArrowRight, MapPin, Plane } from 'lucide-react';
import { airportRoutes, getRouteContentForLanguage, RouteCategory } from '../data/routes';
import { useLanguage } from '../i18n/LanguageContext';
import { buildLocalizedPath, Language } from '../lib/routing';

const HUB_STRIP_LABELS: Record<
  Language,
  { heading: string; lca: string; pfo: string; limassol: string }
> = {
  en: {
    heading: 'Main Transfer Hubs',
    lca: 'Larnaca Airport (LCA) Hub',
    pfo: 'Paphos Airport (PFO) Hub',
    limassol: 'Limassol Base Hub',
  },
  ru: {
    heading: 'Главные хабы трансфера',
    lca: 'Аэропорт Ларнака (LCA)',
    pfo: 'Аэропорт Пафос (PFO)',
    limassol: 'Лимассол (База)',
  },
  de: {
    heading: 'Haupt-Transfer-Hubs',
    lca: 'Flughafen Larnaka (LCA)',
    pfo: 'Flughafen Paphos (PFO)',
    limassol: 'Limassol Basis-Hub',
  },
  pl: {
    heading: 'Główne huby transferowe',
    lca: 'Lotnisko Larnaka (LCA)',
    pfo: 'Lotnisko Pafos (PFO)',
    limassol: 'Baza w Limassol',
  },
  fr: {
    heading: 'Pôles principaux de transfert',
    lca: 'Aéroport Larnaca (LCA)',
    pfo: 'Aéroport Paphos (PFO)',
    limassol: 'Base de Limassol',
  },
  el: {
    heading: 'Κύριοι κόμβοι μεταφοράς',
    lca: 'Αεροδρόμιο Λάρνακας (LCA)',
    pfo: 'Αεροδρόμιο Πάφου (PFO)',
    limassol: 'Βάση Λεμεσού',
  },
  it: {
    heading: 'Hub principali di transfer',
    lca: 'Aeroporto Larnaca (LCA)',
    pfo: 'Aeroporto Paphos (PFO)',
    limassol: 'Sede di Limassol',
  },
};

export default function RoutesIndexPage() {
  const { language, t } = useLanguage();
  const [filter, setFilter] = useState<'ALL' | RouteCategory>('ALL');

  const filtered =
    filter === 'ALL'
      ? airportRoutes
      : airportRoutes.filter((r) => r.category === filter);

  const homeHref = buildLocalizedPath('home', language);

  return (
    <main className="py-12 md:py-16 bg-white min-h-screen">
      <div className="container mx-auto px-4 max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2">
          <a href={homeHref} className="hover:text-black underline">
            {t('common.home')}
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-black">{t('common.allRoutes')}</span>
        </nav>

        <div className="max-w-3xl mb-10">
          <h1 className="text-3xl sm:text-5xl font-black text-black uppercase tracking-tight mb-4">
            {t('routesPage.h1')}
          </h1>
          <p className="text-base sm:text-lg text-gray-800 font-medium">
            {t('routesPage.subtitle')}
          </p>
        </div>

        {/* 3 Commercial Hub Cards */}
        <div className="mb-8">
          <div className="text-xs font-black uppercase tracking-wider text-gray-600 mb-3">
            {(HUB_STRIP_LABELS[language] || HUB_STRIP_LABELS.en).heading}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(
              [
                {
                  view: 'hub-lca' as const,
                  label: (HUB_STRIP_LABELS[language] || HUB_STRIP_LABELS.en).lca,
                  price: '€75–€180',
                },
                {
                  view: 'hub-pfo' as const,
                  label: (HUB_STRIP_LABELS[language] || HUB_STRIP_LABELS.en).pfo,
                  price: '€75–€190',
                },
                {
                  view: 'hub-limassol' as const,
                  label: (HUB_STRIP_LABELS[language] || HUB_STRIP_LABELS.en).limassol,
                  price: '€75–€120',
                },
              ]
            ).map((hub) => (
              <a
                key={hub.view}
                href={buildLocalizedPath(hub.view, language)}
                className="bg-yellow-400 border-2 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform flex items-center justify-between gap-3"
              >
                <div>
                  <div className="font-black text-black text-sm sm:text-base">{hub.label}</div>
                  <div className="text-xs font-bold text-black/80 tabular-nums">{hub.price}</div>
                </div>
                <ArrowRight className="w-4 h-4 shrink-0 text-black" />
              </a>
            ))}
          </div>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {(
            [
              { id: 'ALL', label: t('routesPage.filterAll', { n: airportRoutes.length }) },
              { id: 'LCA', label: t('routesPage.filterLca') },
              { id: 'PFO', label: t('routesPage.filterPfo') },
              { id: 'LIMASSOL', label: t('routesPage.filterLimassol') },
              { id: 'INTERCITY', label: t('routesPage.filterIntercity') },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setFilter(tab.id)}
              className={`px-4 py-2 text-sm font-black border-2 border-black rounded-lg transition-colors ${
                filter === tab.id
                  ? 'bg-yellow-400 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-black hover:bg-gray-100'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((route) => {
            const content = getRouteContentForLanguage(route, language);
            return (
              <a
                key={route.slug}
                href={buildLocalizedPath('route', language, route.slug)}
                className="brutal-card bg-white overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="h-44 border-b-2 border-black overflow-hidden bg-gray-100">
                    <img
                      src={route.image}
                      alt={content.h1}
                      width={800}
                      height={600}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-black text-black">
                        {route.airportCode ? (
                          <Plane className="w-3.5 h-3.5" />
                        ) : (
                          <MapPin className="w-3.5 h-3.5" />
                        )}
                        {route.airportCode || t('routesPage.intercity')} · {route.distanceKm} {t('common.km')}
                      </span>
                      <span className="bg-black text-white px-2.5 py-1 text-sm font-black tabular-nums">
                        €{route.basePrice}
                      </span>
                    </div>
                    <h2 className="text-xl font-black text-black group-hover:text-yellow-600 transition-colors mb-2 leading-snug">
                      {content.h1}
                    </h2>
                    <p className="text-sm text-gray-700 font-medium line-clamp-2">
                      {content.subtitle}
                    </p>
                  </div>
                </div>
                <div className="px-5 py-3.5 border-t-2 border-black bg-yellow-50 flex items-center justify-between text-xs font-black uppercase">
                  <span className="tabular-nums">~{route.durationMin} {t('common.min')}</span>
                  <span className="inline-flex items-center gap-1">
                    {t('routesPage.viewRouteBook')}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </main>
  );
}
