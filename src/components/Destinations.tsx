import React from 'react';
import { ArrowRight } from 'lucide-react';
import { locations, getRouteTime, DEFAULT_FEATURED_ROUTES } from '../data/pricing';
import { airportRoutes } from '../data/routes';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';
import { buildLocalizedPath, Language } from '../lib/routing';

const HUB_PILL_LABELS: Record<Language, { lca: string; pfo: string; limassol: string }> = {
  en: {
    lca: 'Larnaca Airport (LCA) Hub',
    pfo: 'Paphos Airport (PFO) Hub',
    limassol: 'Limassol Transfers Hub',
  },
  ru: {
    lca: 'Аэропорт Ларнака (LCA)',
    pfo: 'Аэропорт Пафос (PFO)',
    limassol: 'Лимассол (Все рейсы)',
  },
  de: {
    lca: 'Flughafen Larnaka (LCA)',
    pfo: 'Flughafen Paphos (PFO)',
    limassol: 'Limassol Hub',
  },
  pl: {
    lca: 'Lotnisko Larnaka (LCA)',
    pfo: 'Lotnisko Pafos (PFO)',
    limassol: 'Hub Limassol',
  },
  fr: {
    lca: 'Hub Larnaca (LCA)',
    pfo: 'Hub Paphos (PFO)',
    limassol: 'Hub Limassol',
  },
  el: {
    lca: 'Αεροδρόμιο Λάρνακας (LCA)',
    pfo: 'Αεροδρόμιο Πάφου (PFO)',
    limassol: 'Κόμβος Λεμεσού',
  },
  it: {
    lca: 'Hub Larnaca (LCA)',
    pfo: 'Hub Paphos (PFO)',
    limassol: 'Hub Limassol',
  },
};

export default function Destinations() {
  const { language, t } = useLanguage();
  const { routes, getBasePrice } = useData();

  const getLocationName = (id: string) => {
    const loc = locations.find((l) => l.id === id);
    return loc ? loc.name[language] : id;
  };

  // Show active featured routes (LCA, PFO & Limassol hub routes)
  const rawRoutes = routes && routes.length > 0 ? routes : DEFAULT_FEATURED_ROUTES;
  const activeRoutes = rawRoutes.filter((route) => route.available !== false);
  const routesToShow = (
    activeRoutes.length > 0 ? activeRoutes : DEFAULT_FEATURED_ROUTES
  ).slice(0, 9);

  const findLandingSlug = (from: string, to: string): string | null => {
    const match = airportRoutes.find(
      (r) => (r.fromId === from && r.toId === to) || (r.fromId === to && r.toId === from)
    );
    return match ? match.slug : null;
  };

  return (
    <section
      id="destinations"
      className="py-16 relative bg-yellow-400 border-y-4 border-black overflow-hidden"
    >
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4 tracking-tight uppercase inline-block bg-white px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {t('destinations.title')}
          </h2>
          <p className="text-base md:text-lg text-black font-bold mt-2">
            {t('destinations.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {routesToShow.map((route, index) => {
            const fromName = getLocationName(route.from);
            const toName = getLocationName(route.to);
            const price = getBasePrice(route.from, route.to) || route.price;
            const time = getRouteTime(route.from, route.to);
            const landingSlug = findLandingSlug(route.from, route.to);
            const targetHref = landingSlug
              ? buildLocalizedPath('route', language, landingSlug)
              : buildLocalizedPath('routes-index', language);

            return (
              <div
                key={`${route.from}-${route.to}-${index}`}
                className="brutal-card bg-white p-5 flex flex-col justify-between min-h-[175px] group"
              >
                <div>
                  <div className="flex justify-between items-start mb-4 gap-2">
                    <span className="text-xs font-bold text-gray-700 tabular-nums">
                      {t('destinations.time', { t: time })}
                    </span>
                    <span className="bg-black text-white px-3 py-1 font-black text-sm border-2 border-black tabular-nums">
                      {t('destinations.from', { p: price })}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="text-base md:text-lg font-bold text-gray-700 flex items-center gap-2">
                      <span>{fromName}</span>
                      <ArrowRight className="w-4 h-4 text-black shrink-0" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-black tracking-tight uppercase">
                      {toName}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between pt-4 border-t-2 border-black gap-3">
                  <span className="text-black text-xs font-extrabold uppercase tracking-wide">
                    {t('destinations.roundTripShort')}
                  </span>
                  <a href={targetHref} className="brutal-btn px-4 py-2 text-xs sm:text-sm uppercase">
                    <span>{t('destinations.order')}</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-10 mb-5">
          {(
            [
              ['hub-lca', (HUB_PILL_LABELS[language] || HUB_PILL_LABELS.en).lca],
              ['hub-pfo', (HUB_PILL_LABELS[language] || HUB_PILL_LABELS.en).pfo],
              ['hub-limassol', (HUB_PILL_LABELS[language] || HUB_PILL_LABELS.en).limassol],
            ] as const
          ).map(([view, label]) => (
            <a
              key={view}
              href={buildLocalizedPath(view, language)}
              className="px-4 py-2 bg-white border-2 border-black text-xs sm:text-sm font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-black hover:text-white transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        <div className="text-center">
          <a
            href={buildLocalizedPath('routes-index', language)}
            className="brutal-btn brutal-btn-white px-6 py-3 text-sm sm:text-base uppercase"
          >
            <span>{t('destinations.allRoutes')}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}
