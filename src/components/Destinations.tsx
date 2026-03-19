import React from 'react';
import { ArrowRight } from 'lucide-react';
import { basePrices, locations } from '../data/pricing';
import { useLanguage } from '../i18n/LanguageContext';

const popularRoutes = [
  {
    fromId: 'pfo',
    toId: 'limassol',
    price: basePrices['pfo']['limassol'],
    time: 45
  },
  {
    fromId: 'lca',
    toId: 'paphos-city',
    price: basePrices['lca']['paphos-city'],
    time: 90
  },
  {
    fromId: 'pfo',
    toId: 'paphos-city',
    price: basePrices['pfo']['paphos-city'],
    time: 25
  },
  {
    fromId: 'pfo',
    toId: 'larnaca-city',
    price: basePrices['pfo']['larnaca-city'],
    time: 85
  },
  {
    fromId: 'lca',
    toId: 'limassol',
    price: basePrices['lca']['limassol'],
    time: 45
  },
  {
    fromId: 'pfo',
    toId: 'peyia',
    price: basePrices['pfo']['peyia'],
    time: 35
  },
  {
    fromId: 'pfo',
    toId: 'coral-bay',
    price: basePrices['pfo']['coral-bay'],
    time: 30
  },
  {
    fromId: 'pfo',
    toId: 'polis',
    price: basePrices['pfo']['polis'],
    time: 55
  }
];

export default function Destinations() {
  const { language, t } = useLanguage();

  const getLocationName = (id: string) => {
    const loc = locations.find(l => l.id === id);
    return loc ? loc.name[language] : id;
  };

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
          {popularRoutes.map((route, index) => {
            const fromName = getLocationName(route.fromId);
            const toName = getLocationName(route.toId);

            return (
              <div 
                key={index} 
                className="group rounded-[2rem] overflow-hidden glass-panel hover:border-white/20 transition-all duration-500 p-8 flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-xs font-semibold text-white/40 tracking-[0.2em] uppercase">
                      {t('destinations.time', { t: route.time })}
                    </div>
                    <div className="bg-white/10 text-white px-4 py-1.5 rounded-full font-bold text-sm">
                      {t('destinations.from', { p: route.price })}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="text-white/40 text-sm font-medium flex items-center gap-2">
                      {fromName}
                      <ArrowRight className="w-3 h-3 opacity-50" />
                    </div>
                    <div className="text-3xl font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                      {toName}
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-between pt-6 border-t border-white/5">
                  <span className="text-white/30 text-xs font-medium uppercase tracking-widest">Premium Transfer</span>
                  <button className="text-white hover:text-blue-400 font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2 group/btn">
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
