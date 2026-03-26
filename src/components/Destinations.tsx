import React from 'react';
import { ArrowRight } from 'lucide-react';
import { locations, getRouteTime } from '../data/pricing';
import { useLanguage } from '../i18n/LanguageContext';
import { useData } from '../context/DataContext';

export default function Destinations() {
  const { language, t } = useLanguage();
  const { routes, getBasePrice } = useData();

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
    <section id="destinations" className="py-32 relative bg-white border-b-4 border-black overflow-hidden">
      {/* Background Doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 right-10 w-40 h-40 border-8 border-black transform rotate-45" />
        <div className="absolute bottom-10 left-20 w-32 h-32 bg-yellow-400 rounded-full" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 border-8 border-black rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 tracking-tighter uppercase inline-block bg-yellow-400 px-6 py-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            {t('destinations.title')}
          </h2>
          <p className="text-xl text-black font-bold mt-8 bg-white inline-block px-4 py-2 border-2 border-black transform -rotate-1">
            {t('destinations.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {routesToShow.map((route, index) => {
            const fromName = getLocationName(route.from);
            const toName = getLocationName(route.to);
            const price = getBasePrice(route.from, route.to) || route.price;
            const time = getRouteTime(route.from, route.to);

            return (
              <div 
                key={index} 
                className="brutal-card bg-white p-8 flex flex-col justify-between min-h-[220px] group"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-xs font-black text-black tracking-[0.2em] uppercase bg-yellow-400 px-2 py-1 border-2 border-black">
                      {t('destinations.time', { t: time })}
                    </div>
                    <div className="bg-black text-white px-4 py-1.5 font-black text-sm border-2 border-black transform rotate-2">
                      {t('destinations.from', { p: price })}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-xl md:text-2xl font-bold text-gray-600 flex items-center gap-2">
                      {fromName}
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 text-black stroke-[3px]" />
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-black tracking-tight uppercase group-hover:text-yellow-500 transition-colors duration-200">
                      {toName}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-6 border-t-4 border-black">
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
          })}
        </div>
      </div>
    </section>
  );
}
