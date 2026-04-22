import React from 'react';
import { ArrowRight } from 'lucide-react';
import { locations, getRouteTime } from '../data/pricing';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';

export default function Destinations() {
  const { language, t } = useLanguage();
  const { routes, getBasePrice, loading } = useData();

  const getLocationName = (id: string) => {
    const loc = locations.find(l => l.id === id);
    return loc ? loc.name[language] : id;
  };

  // Filter routes to only show available ones and limit to 9 for the UI
  const displayRoutes = routes
    .filter(route => route.available && getBasePrice(route.from, route.to) !== null)
    .slice(0, 9);

  // Fallback to default routes if the spreadsheet is empty or loading
  const fallbackRoutes = [
    { from: 'lca', to: 'ayia-napa', price: 55, time: 45 },
    { from: 'lca', to: 'protaras', price: 65, time: 50 },
    { from: 'lca', to: 'limassol', price: 65, time: 50 },
    { from: 'lca', to: 'larnaca-city', price: 25, time: 15 },
    { from: 'lca', to: 'paphos-city', price: 130, time: 90 },
    { from: 'lca', to: 'nicosia', price: 60, time: 40 },
    { from: 'lca', to: 'coral-bay', price: 145, time: 100 },
    { from: 'lca', to: 'peyia', price: 150, time: 105 },
    { from: 'lca', to: 'polis', price: 160, time: 120 }
  ];

  const routesToShow = displayRoutes.length > 0 ? displayRoutes : fallbackRoutes;

  return (
    <section id="destinations" className="py-12 relative bg-yellow-400 border-b-4 border-black overflow-hidden">
      {/* Background Doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 right-10 w-40 h-40 border-8 border-black transform rotate-45" />
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-white rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 border-8 border-black rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-4 tracking-tighter uppercase inline-block bg-white px-6 py-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            {t('destinations.title')}
          </h2>
          <p className="text-lg text-black font-bold mt-4 bg-white inline-block px-4 py-2 border-2 border-black transform -rotate-1">
            {t('destinations.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {loading ? (
            [...Array(6)].map((_, index) => (
              <div 
                key={`skeleton-${index}`} 
                className="brutal-card bg-white p-5 flex flex-col justify-between min-h-[160px] animate-pulse"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-16 h-6 bg-gray-200 border-2 border-black"></div>
                    <div className="w-20 h-6 bg-gray-200 border-2 border-black"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="w-32 h-6 bg-gray-200"></div>
                    <div className="w-48 h-8 bg-gray-200"></div>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between pt-4 border-t-4 border-black">
                  <div className="w-24 h-6 bg-gray-200 border-2 border-black"></div>
                  <div className="w-28 h-10 bg-gray-200 border-2 border-black"></div>
                </div>
              </div>
            ))
          ) : (
            routesToShow.map((route, index) => {
              const fromName = getLocationName(route.from);
              const toName = getLocationName(route.to);
              const price = getBasePrice(route.from, route.to) || route.price;
              const time = getRouteTime(route.from, route.to);

              return (
                <div 
                  key={index} 
                  className="brutal-card bg-white p-5 flex flex-col justify-between min-h-[160px] group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="text-[10px] font-black text-black tracking-[0.1em] uppercase bg-yellow-400 px-2 py-1 border-2 border-black">
                        {t('destinations.time', { t: time })}
                      </div>
                      <div className="bg-black text-white px-3 py-1 font-black text-xs border-2 border-black transform rotate-2">
                        {t('destinations.from', { p: price })}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-lg md:text-xl font-bold text-gray-600 flex items-center gap-2">
                        {fromName}
                        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-black stroke-[3px]" />
                      </div>
                      <div className="text-xl md:text-2xl font-black text-black tracking-tight uppercase group-hover:text-yellow-500 transition-colors duration-200">
                        {toName}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between pt-4 border-t-4 border-black">
                    <span className="text-black text-[10px] sm:text-xs font-black uppercase tracking-widest bg-green-400 px-2 py-1 border-2 border-black transform -rotate-2">
                      {language === 'ru' ? '-10% ОБРАТНО' : '-10% RETURN'}
                    </span>
                    <button 
                      onClick={() => {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="brutal-btn px-4 py-2 text-sm uppercase"
                    >
                      {t('destinations.order')}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
