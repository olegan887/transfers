import React from 'react';
import { Users, CarFront } from 'lucide-react';
import { vehicles } from '../data/pricing';
import { useLanguage } from '../i18n/LanguageContext';

export default function Fleet() {
  const { language, t } = useLanguage();

  return (
    <section id="fleet" className="py-32 relative bg-slate-900">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tighter">
            {t('fleet.title')}
          </h2>
          <p className="text-lg text-slate-400 font-normal">
            {t('fleet.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {vehicles.map((vehicle) => (
            <div 
              key={vehicle.id} 
              className="bg-slate-800 border border-slate-700 shadow-sm hover:shadow-xl hover:border-indigo-500/50 hover:-translate-y-1 rounded-[2rem] overflow-hidden transition-all duration-500 group"
            >
              <div className="h-48 overflow-hidden bg-slate-900 relative">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-800 to-transparent z-10" />
                <img 
                  src={vehicle.image} 
                  alt={vehicle.name[language]} 
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="p-6 relative z-20 -mt-8">
                <h3 className="text-2xl font-bold mb-2 text-white tracking-tight">{vehicle.name[language]}</h3>
                <p className="text-slate-400 text-sm mb-6 min-h-[40px] font-light">
                  {vehicle.description[language]}
                </p>
                
                <div className="flex items-center justify-between text-slate-300 border-t border-slate-700 pt-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-sm">{t('booking.upToPax', { n: vehicle.pax })}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CarFront className="w-4 h-4 text-slate-400" />
                    <span className="font-medium text-sm">{t('booking.upToBags', { n: vehicle.bags })}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
