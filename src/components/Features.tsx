import React from 'react';
import { ShieldCheck, Clock, CreditCard, ThumbsUp, Luggage, Plane } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Plane className="w-8 h-8 text-white" />,
      title: t('features.f1Title'),
      description: t('features.f1Desc'),
      className: "md:col-span-2 bg-gradient-to-br from-blue-900/40 to-black"
    },
    {
      icon: <Clock className="w-8 h-8 text-white" />,
      title: t('features.f2Title'),
      description: t('features.f2Desc'),
      className: "md:col-span-1 bg-white/5"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-white" />,
      title: t('features.f3Title'),
      description: t('features.f3Desc'),
      className: "md:col-span-1 bg-white/5"
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-white" />,
      title: t('features.f4Title'),
      description: t('features.f4Desc'),
      className: "md:col-span-1 bg-white/5"
    },
    {
      icon: <Luggage className="w-8 h-8 text-white" />,
      title: t('features.f5Title'),
      description: t('features.f5Desc'),
      className: "md:col-span-1 bg-white/5"
    },
    {
      icon: <ThumbsUp className="w-8 h-8 text-white" />,
      title: t('features.f6Title'),
      description: t('features.f6Desc'),
      className: "md:col-span-3 bg-gradient-to-r from-white/5 via-blue-900/20 to-white/5"
    }
  ];

  return (
    <section id="features" className="py-32 relative">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">
            {t('features.title')}
          </h2>
          <p className="text-lg text-white/60 font-light">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl mx-auto auto-rows-[minmax(250px,auto)]">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`p-8 rounded-[2rem] border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between group overflow-hidden relative ${feature.className}`}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-8 bg-white/10 border border-white/10 group-hover:scale-110 transition-transform duration-500 relative z-10">
                {feature.icon}
              </div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                <p className="text-white/60 leading-relaxed font-light">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
