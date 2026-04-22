import React from 'react';
import { ShieldCheck, Clock, CreditCard, ThumbsUp, Luggage, Plane } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Plane className="w-7 h-7" />,
      title: t('features.f1Title'),
      description: t('features.f1Desc')
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: t('features.f2Title'),
      description: t('features.f2Desc')
    },
    {
      icon: <CreditCard className="w-7 h-7" />,
      title: t('features.f3Title'),
      description: t('features.f3Desc')
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: t('features.f4Title'),
      description: t('features.f4Desc')
    },
    {
      icon: <Luggage className="w-7 h-7" />,
      title: t('features.f5Title'),
      description: t('features.f5Desc')
    },
    {
      icon: <ThumbsUp className="w-7 h-7" />,
      title: t('features.f6Title'),
      description: t('features.f6Desc')
    }
  ];

  return (
    <section id="features" className="py-32 relative bg-white border-y-4 border-black overflow-hidden">
      {/* Background Doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-8 border-black rounded-full" />
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-black transform rotate-12" />
        <div className="absolute top-1/2 left-1/4 w-20 h-20 border-8 border-black transform -rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="brutal-card bg-white p-8 flex flex-col group"
            >
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6 bg-yellow-400 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black transition-all duration-200">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-2xl font-black text-black mb-4 uppercase tracking-tight">{feature.title}</h3>
                <p className="text-black font-medium leading-relaxed text-lg">
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
