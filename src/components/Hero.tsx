import React from 'react';
import BookingWidget from './BookingWidget';
import { useLanguage } from '../i18n/LanguageContext';
import { Star, ShieldCheck, Clock } from 'lucide-react';

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative pt-10 pb-16 md:pt-14 md:pb-24 overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        <div className="max-w-4xl mx-auto text-center mb-10 md:mb-12">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 mb-6 text-xs sm:text-sm font-bold text-black">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Clock className="w-4 h-4 text-black" />
              {language === 'ru' ? 'Подача 24/7 по прилёту' : '24/7 Airport Pickup'}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <ShieldCheck className="w-4 h-4 text-black" />
              {language === 'ru' ? 'Фиксированный тариф EUR' : 'Fixed EUR Rates'}
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-black mb-5 md:mb-6 tracking-tight leading-[1.08] uppercase text-balance">
            <span className="bg-black text-yellow-400 px-4 py-1 inline-block mb-2">
              {t('hero.title1')}
            </span>{' '}
            <br className="hidden sm:inline" />
            <span className="bg-yellow-400 text-black px-4 py-1 inline-block border-2 border-black">
              {t('hero.title2')}
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-black max-w-2xl mx-auto font-medium leading-relaxed">
            {t('hero.subtitle')}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-7">
            <a
              href="#reviews"
              className="inline-flex items-center gap-3 bg-white border-2 border-black px-4 py-2 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-50 transition-colors"
            >
              <div className="flex items-center gap-0.5 text-yellow-400" aria-hidden="true">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current stroke-black stroke-[1.5px]" />
                ))}
              </div>
              <span className="text-sm text-black font-bold tabular-nums">
                {language === 'ru'
                  ? '4.9/5 · Более 10 000 поездок из LCA и PFO'
                  : '4.9/5 · 10,000+ LCA & PFO airport transfers'}
              </span>
            </a>

            <span className="bg-black text-white px-3.5 py-2 text-xs sm:text-sm font-bold border-2 border-black">
              {language === 'ru'
                ? 'Скидка 10% на обратный трансфер'
                : '10% OFF round-trip bookings'}
            </span>
          </div>
        </div>

        <div className="w-full">
          <BookingWidget />
        </div>
      </div>
    </section>
  );
}
