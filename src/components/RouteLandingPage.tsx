import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, MapPin, ChevronDown, Plane } from 'lucide-react';
import { getAirportRouteBySlug, airportRoutes, getRouteContentForLanguage } from '../data/routes';
import { useLanguage } from '../i18n/LanguageContext';
import { buildLocalizedPath } from '../lib/routing';
import BookingWidget from './BookingWidget';

interface RouteLandingPageProps {
  slug: string;
}

export default function RouteLandingPage({ slug }: RouteLandingPageProps) {
  const { language, t } = useLanguage();
  const route = getAirportRouteBySlug(slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!route) {
    return (
      <main className="py-24 bg-white min-h-[70vh] flex items-center justify-center px-4">
        <div className="max-w-lg w-full bg-white border-4 border-black p-8 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-4xl font-black uppercase mb-4">404</h1>
          <p className="text-lg font-bold mb-6">{t('routeDetail.notFound')}</p>
          <a
            href={buildLocalizedPath('routes-index', language)}
            className="brutal-btn px-6 py-3 uppercase text-sm"
          >
            {t('routeDetail.allAirportRoutes')}
          </a>
        </div>
      </main>
    );
  }

  const content = getRouteContentForLanguage(route, language);
  const homeHref = buildLocalizedPath('home', language);
  const routesHref = buildLocalizedPath('routes-index', language);
  const returnPrice = Math.round(route.basePrice * 2 * 0.9);
  const relatedRoutes = route.relatedSlugs
    .map((s) => getAirportRouteBySlug(s))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <main className="bg-white">
      {/* Breadcrumbs & Route Hero */}
      <section className="pt-8 pb-12 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-xs sm:text-sm font-bold text-gray-700 flex flex-wrap items-center gap-2">
            <a href={homeHref} className="hover:text-black underline">
              {t('common.home')}
            </a>
            <span aria-hidden="true">/</span>
            <a href={routesHref} className="hover:text-black underline">
              {t('common.allRoutes')}
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-black">{content.h1}</span>
          </nav>

          <div className="max-w-4xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400 border-2 border-black text-xs font-black uppercase mb-4">
              {route.airportCode ? <Plane className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
              <span>
                {route.airportCode || t('routeDetail.limassolIntercity')} · {t('routeDetail.fixedRate')} €
                {route.basePrice}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tight leading-tight mb-4 text-balance">
              {content.h1}
            </h1>

            <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed mb-6">
              {content.subtitle}
            </p>

            {/* Key Route Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white border-2 border-black p-3.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-xs font-bold text-gray-600 uppercase">
                  {t('routeDetail.oneWay')}
                </div>
                <div className="text-2xl font-black text-black tabular-nums">€{route.basePrice}</div>
              </div>
              <div className="bg-yellow-400 border-2 border-black p-3.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-xs font-bold text-black uppercase">
                  {t('routeDetail.roundTrip')}
                </div>
                <div className="text-2xl font-black text-black tabular-nums">€{returnPrice}</div>
              </div>
              <div className="bg-white border-2 border-black p-3.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-xs font-bold text-gray-600 uppercase">
                  {t('routeDetail.travelTime')}
                </div>
                <div className="text-2xl font-black text-black tabular-nums">
                  ~{route.durationMin} {t('common.min')}
                </div>
              </div>
              <div className="bg-white border-2 border-black p-3.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-xs font-bold text-gray-600 uppercase">
                  {t('routeDetail.distance')}
                </div>
                <div className="text-2xl font-black text-black tabular-nums">
                  {route.distanceKm} {t('common.km')}
                </div>
              </div>
            </div>
          </div>

          <BookingWidget defaultFrom={route.fromId} defaultTo={route.toId} />
        </div>
      </section>

      {/* Route Details & Arrivals Pickup Guide */}
      <section className="py-14 bg-yellow-400 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-7 bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-5">
                  {route.fromId === 'lca' || route.fromId === 'pfo'
                    ? t('routeDetail.arrivalsPickupTitle', { code: route.airportCode || '' })
                    : t('routeDetail.doorPickupTitle')}
                </h2>
                <p className="text-base text-gray-800 font-medium leading-relaxed mb-6">
                  {content.pickupGuide}
                </p>

                <ul className="space-y-3">
                  {content.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 font-bold text-black text-sm sm:text-base">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-black mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5 border-t-2 border-black flex flex-wrap gap-4 text-xs sm:text-sm font-bold text-gray-700">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-black" />
                  {t('routeDetail.nightHours')}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-black" />
                  {t('routeDetail.doorToDoor')}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-white border-4 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col">
              <img
                src={route.image}
                alt={content.h1}
                width={800}
                height={600}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="w-full h-64 lg:h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Route-Specific FAQ */}
      <section className="py-14 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-8 text-center">
            {t('routeDetail.faqTitle')}
          </h2>

          <div className="space-y-4">
            {content.faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl overflow-hidden"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-black text-black text-base md:text-lg hover:bg-yellow-50 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-gray-800 font-medium leading-relaxed border-t border-gray-200">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Airport Routes Internal Linking */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">
              {t('routeDetail.relatedTitle')}
            </h2>
            <a href={routesHref} className="font-black text-sm underline hover:text-yellow-600">
              {t('routeDetail.viewAllRoutes')}
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(relatedRoutes.length > 0 ? relatedRoutes : airportRoutes.slice(0, 3)).map((rel) => {
              const relContent = getRouteContentForLanguage(rel, language);
              return (
                <a
                  key={rel.slug}
                  href={buildLocalizedPath('route', language, rel.slug)}
                  className="brutal-card bg-white p-5 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-3">
                      <span>{rel.airportCode || t('routeDetail.cyprus')}</span>
                      <span className="bg-black text-white px-2.5 py-0.5 font-black tabular-nums">
                        €{rel.basePrice}
                      </span>
                    </div>
                    <h3 className="text-lg font-black text-black group-hover:text-yellow-600 transition-colors mb-2">
                      {relContent.h1}
                    </h3>
                  </div>
                  <div className="pt-3 border-t-2 border-black flex items-center justify-between text-xs font-black uppercase">
                    <span className="tabular-nums">
                      ~{rel.durationMin} {t('common.min')}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      {t('routeDetail.book')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
