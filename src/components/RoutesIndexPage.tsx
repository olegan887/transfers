import React, { useState } from 'react';
import { ArrowRight, MapPin, Plane } from 'lucide-react';
import { airportRoutes, RouteCategory } from '../data/routes';
import { useLanguage } from '../i18n/LanguageContext';
import { buildLocalizedPath } from '../lib/routing';

export default function RoutesIndexPage() {
  const { language } = useLanguage();
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
            {language === 'ru' ? 'Главная' : 'Home'}
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-black">
            {language === 'ru' ? 'Все маршруты' : 'All Routes'}
          </span>
        </nav>

        <div className="max-w-3xl mb-10">
          <h1 className="text-3xl sm:text-5xl font-black text-black uppercase tracking-tight mb-4">
            {language === 'ru'
              ? 'Все доступные маршруты трансфера по Кипру'
              : 'Cyprus Airport & Intercity Transfer Routes'}
          </h1>
          <p className="text-base sm:text-lg text-gray-800 font-medium">
            {language === 'ru'
              ? 'Мы базируемся в Лимассоле и выполняем прямые поездки из/в аэропорты Ларнаки (LCA) и Пафоса (PFO), а также междугородние трансферы через Лимассол по фиксированным ценам.'
              : 'Based in Limassol, we operate direct fixed-price transfers to and from Larnaca Airport (LCA), Paphos Airport (PFO), Limassol, and intercity resorts across Cyprus.'}
          </p>
        </div>

        {/* Interactive Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {(
            [
              { id: 'ALL', label: language === 'ru' ? `Все маршруты (${airportRoutes.length})` : `All Routes (${airportRoutes.length})` },
              { id: 'LCA', label: language === 'ru' ? 'Аэропорт Ларнака (LCA)' : 'Larnaca Airport (LCA)' },
              { id: 'PFO', label: language === 'ru' ? 'Аэропорт Пафос (PFO)' : 'Paphos Airport (PFO)' },
              { id: 'LIMASSOL', label: language === 'ru' ? 'Из / в Лимассол' : 'Limassol Intercity' },
              { id: 'INTERCITY', label: language === 'ru' ? 'Другие города' : 'Other Resorts' },
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
            const content = route[language];
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
                        {route.airportCode || (language === 'ru' ? 'Межгород' : 'Intercity')} · {route.distanceKm} km
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
                  <span className="tabular-nums">~{route.durationMin} min</span>
                  <span className="inline-flex items-center gap-1">
                    {language === 'ru' ? 'Рассчитать и заказать' : 'View Route & Book'}
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
