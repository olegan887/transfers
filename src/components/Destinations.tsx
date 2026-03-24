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
    <section id="destinations" className="py-32 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">
            {t('destinations.title')}
          </h2>
          <p className="text-lg text-white/60 font-light">
            {t('destinations.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {routesToShow.map((route, index) => {
            const fromName = getLocationName(route.from);
            const toName = getLocationName(route.to);
            const price = getBasePrice(route.from, route.to) || route.price;
            const time = getRouteTime(route.from, route.to);

            return (
              <div 
                key={index} 
                className="group rounded-[2rem] overflow-hidden glass-panel hover:border-white/20 transition-all duration-500 p-8 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase">
                      {t('destinations.time', { t: time })}
                    </div>
                    <div className="bg-white/10 text-white px-4 py-1.5 rounded-full font-bold text-sm">
                      {t('destinations.from', { p: price })}
                    </div>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="text-xl md:text-2xl font-medium text-white/70 flex items-center gap-2">
                      {fromName}
                      <ArrowRight className="w-5 h-5 md:w-6 md:h-6 opacity-50" />
                    </div>
                    <div className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                      {toName}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-green-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest bg-green-500/10 px-2 py-1 rounded-md">
                    {language === 'ru' ? '-10% ОБРАТНО' : '-10% RETURN'}
                  </span>
                  <button 
                    onClick={() => {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="text-white hover:text-blue-400 font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 group/btn"
                  >
                    {t('destinations.order')}
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
