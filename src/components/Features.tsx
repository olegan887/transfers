import React from 'react';
import { ShieldCheck, Clock, CreditCard, ThumbsUp, Luggage, Plane } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export default function Features() {
  const { t } = useLanguage();

  const features = [
    {
      icon: <Plane className="w-7 h-7" />,
      title: t('features.f1Title'),
      description: t('features.f1Desc'),
    },
    {
      icon: <Clock className="w-7 h-7" />,
      title: t('features.f2Title'),
      description: t('features.f2Desc'),
    },
    {
      icon: <CreditCard className="w-7 h-7" />,
      title: t('features.f3Title'),
      description: t('features.f3Desc'),
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: t('features.f4Title'),
      description: t('features.f4Desc'),
    },
    {
      icon: <Luggage className="w-7 h-7" />,
      title: t('features.f5Title'),
      description: t('features.f5Desc'),
    },
    {
      icon: <ThumbsUp className="w-7 h-7" />,
      title: t('features.f6Title'),
      description: t('features.f6Desc'),
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative bg-white overflow-hidden">
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight mb-3">
            {t('features.title')}
          </h2>
          <p className="text-base md:text-lg text-gray-700 font-medium">
            {t('features.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div key={index} className="brutal-card bg-white p-6 md:p-7 flex flex-col group">
              <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 bg-yellow-400 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-black">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xl font-black text-black mb-2.5 uppercase tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-gray-800 font-medium leading-relaxed text-base">
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
