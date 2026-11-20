import React, { useState } from 'react';
import { ChevronDown, Star, ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { globalAirportFaqs, passengerReviews } from '../data/seoContent';
import { airportRoutes, getRouteContentForLanguage } from '../data/routes';
import { buildLocalizedPath } from '../lib/routing';

export default function AirportFaqAndReviews() {
  const { language, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <>
      {/* Verified Passenger Reviews */}
      <section id="reviews" className="py-16 bg-white border-t-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight mb-3">
              {t('reviewsSection.title')}
            </h2>
            <p className="text-base md:text-lg text-gray-700 font-medium">
              {t('reviewsSection.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {passengerReviews.map((review) => (
              <article
                key={review.id}
                className="brutal-card bg-white p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div
                      role="img"
                      className="flex items-center gap-0.5 text-yellow-400"
                      aria-label={t('common.starsLabel', { n: review.rating })}
                    >
                      {[...Array(review.rating)].map((_, idx) => (
                        <Star
                          key={idx}
                          aria-hidden="true"
                          className="w-4 h-4 fill-current stroke-black stroke-[1.5px]"
                        />
                      ))}
                    </div>
                    <span className="text-xs font-bold text-gray-600 tabular-nums">
                      {review.date}
                    </span>
                  </div>
                  <p className="text-black font-medium leading-relaxed mb-5">
                    &ldquo;{review.text[language] || review.text.en}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t-2 border-black">
                  <div className="font-black text-black text-sm">{review.author}</div>
                  <div className="text-xs font-bold text-gray-700 mt-0.5">
                    {review.route[language] || review.route.en}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Transfers FAQ + Internal Route Directory Links */}
      <section id="faq" className="py-16 bg-gray-50 border-t-4 border-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-black text-black uppercase tracking-tight mb-3">
              {t('reviewsSection.faqTitle')}
            </h2>
            <p className="text-base text-gray-700 font-medium">
              {t('reviewsSection.faqSubtitle')}
            </p>
          </div>

          <div className="space-y-4">
            {globalAirportFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-black text-black text-base md:text-lg hover:bg-yellow-50 transition-colors"
                  >
                    <span>{faq.q[language] || faq.q.en}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-gray-800 font-medium leading-relaxed border-t border-gray-200">
                      {faq.a[language] || faq.a.en}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Clean Internal Links to All 30 Active Route Pages */}
          <div className="mt-14 bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
              <h3 className="text-xl font-black text-black uppercase tracking-tight">
                {t('reviewsSection.all30Title')}
              </h3>
              <a
                href={buildLocalizedPath('routes-index', language)}
                className="text-xs sm:text-sm font-black underline hover:text-yellow-600"
              >
                {t('reviewsSection.filterByDir')}
              </a>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {airportRoutes.map((route) => {
                const label = getRouteContentForLanguage(route, language)
                  .h1.replace(/^(Transfer |Трансфер |Transfert |Μεταφορά )/i, '')
                  .replace(/ Transfer$/i, '');
                return (
                  <a
                    key={route.slug}
                    href={buildLocalizedPath('route', language, route.slug)}
                    className="flex items-center justify-between px-3.5 py-2.5 border-2 border-black rounded-lg hover:bg-yellow-400 transition-colors font-bold text-sm text-black"
                  >
                    <span>{label}</span>
                    <span className="inline-flex items-center gap-1 font-black tabular-nums shrink-0 ml-2">
                      €{route.basePrice}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
