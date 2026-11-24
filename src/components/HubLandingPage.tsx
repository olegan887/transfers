import React, { useState } from 'react';
import { ArrowRight, ChevronDown, Clock, MapPin, Plane, ShieldCheck } from 'lucide-react';
import { getHubConfig, getHubLocalized, HubId } from '../data/hubPages';
import { getAirportRouteBySlug, getRouteContentForLanguage } from '../data/routes';
import { useLanguage } from '../i18n/LanguageContext';
import { buildLocalizedPath, Language } from '../lib/routing';
import BookingWidget from './BookingWidget';

interface HubLandingPageProps {
  hubId: HubId;
}

interface HubUiCopy {
  from75: string;
  meetGreet: string;
  nightFlat: string;
  roundTrip: string;
  colRoute: string;
  colOneWay: string;
  colRoundTrip: string;
  colMetrics: string;
  colAction: string;
  bookBtn: string;
  compOption: string;
  compCost: string;
  compDuration: string;
  compPickup: string;
  compNight: string;
  viewAllRoutes: string;
}

const HUB_UI_COPY: Record<Language, HubUiCopy> = {
  en: {
    from75: 'From €75 fixed',
    meetGreet: '24/7 Arrivals Meet & Greet',
    nightFlat: '+€10 flat night (23:00–07:00)',
    roundTrip: '−10% Round Trip',
    colRoute: 'Direct Route',
    colOneWay: 'One Way',
    colRoundTrip: 'Round Trip (−10%)',
    colMetrics: 'Distance & Time',
    colAction: 'Booking',
    bookBtn: 'Details & Book',
    compOption: 'Transfer Option',
    compCost: 'Typical Cost',
    compDuration: 'Travel Time',
    compPickup: 'Pickup & Luggage',
    compNight: 'Night Policy',
    viewAllRoutes: 'All 30 Cyprus Routes →',
  },
  ru: {
    from75: 'От €75 фикс',
    meetGreet: 'Встреча с табличкой 24/7',
    nightFlat: '+€10 ночью (23:00–07:00)',
    roundTrip: '−10% туда-обратно',
    colRoute: 'Маршрут',
    colOneWay: 'В одну сторону',
    colRoundTrip: 'Туда-обратно (−10%)',
    colMetrics: 'Дистанция и время',
    colAction: 'Бронирование',
    bookBtn: 'Подробнее',
    compOption: 'Вариант поездки',
    compCost: 'Стоимость',
    compDuration: 'Время в пути',
    compPickup: 'Подача и багаж',
    compNight: 'Ночной тариф',
    viewAllRoutes: 'Все 30 маршрутов Кипра →',
  },
  de: {
    from75: 'Ab €75 Festpreis',
    meetGreet: '24/7 Empfang mit Schild',
    nightFlat: '+€10 pauschal nachts',
    roundTrip: '−10 % Hin & Zurück',
    colRoute: 'Direktstrecke',
    colOneWay: 'Einfach',
    colRoundTrip: 'Hin & Zurück (−10 %)',
    colMetrics: 'Distanz & Zeit',
    colAction: 'Buchung',
    bookBtn: 'Details & Buchen',
    compOption: 'Transportart',
    compCost: 'Preisrahmen',
    compDuration: 'Fahrzeit',
    compPickup: 'Abholung & Gepäck',
    compNight: 'Nachtregelung',
    viewAllRoutes: 'Alle 30 Zypern-Strecken →',
  },
  pl: {
    from75: 'Od €75 stała cena',
    meetGreet: 'Powitanie 24/7 na hali',
    nightFlat: '+€10 nocą (23:00–07:00)',
    roundTrip: '−10% w obie strony',
    colRoute: 'Trasa bezpośrednia',
    colOneWay: 'W 1 stronę',
    colRoundTrip: 'W 2 strony (−10%)',
    colMetrics: 'Dystans i czas',
    colAction: 'Rezerwacja',
    bookBtn: 'Szczegóły',
    compOption: 'Opcja przejazdu',
    compCost: 'Koszt',
    compDuration: 'Czas jazdy',
    compPickup: 'Odbiór i bagaż',
    compNight: 'Taryfa nocna',
    viewAllRoutes: 'Wszystkie 30 tras Cypr →',
  },
  fr: {
    from75: 'Dès 75 € fixes',
    meetGreet: 'Accueil pancarte 24/7',
    nightFlat: '+10 € nuit (23h–07h)',
    roundTrip: '−10 % Aller-retour',
    colRoute: 'Itinéraire direct',
    colOneWay: 'Aller simple',
    colRoundTrip: 'Aller-retour (−10 %)',
    colMetrics: 'Distance & durée',
    colAction: 'Réservation',
    bookBtn: 'Voir & Réserver',
    compOption: 'Option de transport',
    compCost: 'Tarif',
    compDuration: 'Durée',
    compPickup: 'Prise en charge',
    compNight: 'Tarif nuit',
    viewAllRoutes: 'Les 30 trajets Chypre →',
  },
  el: {
    from75: 'Από €75 σταθερά',
    meetGreet: 'Υποδοχή 24/7 με ταμπέλα',
    nightFlat: '+€10 νύχτα (23:00–07:00)',
    roundTrip: '−10% Μετ’ επιστροφής',
    colRoute: 'Διαδρομή',
    colOneWay: 'Απλή',
    colRoundTrip: 'Μετ’ επιστροφής (−10%)',
    colMetrics: 'Απόσταση & χρόνος',
    colAction: 'Κράτηση',
    bookBtn: 'Λεπτομέρειες',
    compOption: 'Επιλογή μεταφοράς',
    compCost: 'Κόστος',
    compDuration: 'Διάρκεια',
    compPickup: 'Παραλαβή & αποσκευές',
    compNight: 'Νυχτερινό τέλος',
    viewAllRoutes: 'Όλες οι 30 διαδρομές →',
  },
  it: {
    from75: 'Da €75 fissi',
    meetGreet: 'Accoglienza 24/7',
    nightFlat: '+€10 notte (23:00–07:00)',
    roundTrip: '−10% Andata/Ritorno',
    colRoute: 'Tratta diretta',
    colOneWay: 'Solo andata',
    colRoundTrip: 'Andata/Ritorno (−10%)',
    colMetrics: 'Distanza e durata',
    colAction: 'Prenota',
    bookBtn: 'Dettagli',
    compOption: 'Opzione di viaggio',
    compCost: 'Costo tipico',
    compDuration: 'Tempo di guida',
    compPickup: 'Ritiro e bagagli',
    compNight: 'Regola notturna',
    viewAllRoutes: 'Tutte le 30 tratte Cipro →',
  },
};

export default function HubLandingPage({ hubId }: HubLandingPageProps) {
  const { language, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const hub = getHubConfig(hubId);
  const content = getHubLocalized(hubId, language);
  const ui = HUB_UI_COPY[language] || HUB_UI_COPY.en;

  const homeHref = buildLocalizedPath('home', language);
  const routesHref = buildLocalizedPath('routes-index', language);
  const hubRoutes = hub.routeSlugs
    .map((slug) => getAirportRouteBySlug(slug))
    .filter((r): r is NonNullable<typeof r> => Boolean(r));

  return (
    <main className="bg-white">
      {/* Breadcrumbs & Hero + Instant Calculator */}
      <section className="pt-8 pb-12 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-xs sm:text-sm font-bold text-gray-700 flex flex-wrap items-center gap-2"
          >
            <a href={homeHref} className="hover:text-black underline">
              {t('common.home')}
            </a>
            <span aria-hidden="true">/</span>
            <a href={routesHref} className="hover:text-black underline">
              {t('common.allRoutes')}
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-black">{content.breadcrumb}</span>
          </nav>

          <div className="max-w-4xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400 border-2 border-black text-xs font-black uppercase mb-4">
              {hubId === 'limassol' ? <MapPin className="w-4 h-4" /> : <Plane className="w-4 h-4" />}
              <span>{content.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tight leading-tight mb-4 text-balance">
              {content.h1}
            </h1>

            <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed mb-6">
              {content.subtitle}
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm font-black uppercase">
              <div className="bg-yellow-400 border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                {ui.from75}
              </div>
              <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                {ui.meetGreet}
              </div>
              <div className="bg-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                {ui.nightFlat}
              </div>
              <div className="bg-black text-white border-2 border-black p-3 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                {ui.roundTrip}
              </div>
            </div>
          </div>

          <BookingWidget defaultFrom={hub.defaultFrom} defaultTo={hub.defaultTo} />
        </div>
      </section>

      {/* Fixed-Price Fare Table for This Hub */}
      <section className="py-14 bg-yellow-400 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-6">
            {content.tableTitle}
          </h2>

          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black text-white text-xs font-black uppercase">
                  <th className="py-3.5 px-4">{ui.colRoute}</th>
                  <th className="py-3.5 px-4">{ui.colOneWay}</th>
                  <th className="py-3.5 px-4">{ui.colRoundTrip}</th>
                  <th className="py-3.5 px-4">{ui.colMetrics}</th>
                  <th className="py-3.5 px-4 text-right">{ui.colAction}</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black text-sm">
                {hubRoutes.map((route) => {
                  const rLoc = getRouteContentForLanguage(route, language);
                  const rtPrice = Math.round(route.basePrice * 2 * 0.9);
                  const href = buildLocalizedPath('route', language, route.slug);
                  return (
                    <tr key={route.slug} className="hover:bg-yellow-50 transition-colors">
                      <td className="py-3.5 px-4 font-black text-black">
                        <a href={href} className="underline hover:text-yellow-700">
                          {rLoc.h1}
                        </a>
                      </td>
                      <td className="py-3.5 px-4 font-black tabular-nums">€{route.basePrice}</td>
                      <td className="py-3.5 px-4 font-bold tabular-nums text-gray-800">€{rtPrice}</td>
                      <td className="py-3.5 px-4 font-medium text-gray-700 tabular-nums">
                        {route.distanceKm} {t('common.km')} · ~{route.durationMin} {t('common.min')}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <a
                          href={href}
                          className="inline-flex items-center gap-1 px-3 py-1.5 bg-yellow-400 border-2 border-black font-black text-xs uppercase hover:bg-white transition-colors"
                        >
                          <span>{ui.bookBtn}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Local Terminal / Dispatch Pickup Guide & Comparison Table */}
      <section className="py-14 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
            <div className="lg:col-span-7 bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-4">
                  {content.guideHeading}
                </h2>
                <div className="space-y-4 text-gray-800 font-medium leading-relaxed mb-6">
                  {content.guideParagraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                </div>
              </div>
              <p className="text-xs sm:text-sm font-bold text-black bg-yellow-100 border-2 border-black p-4">
                {content.boundariesNote}
              </p>
            </div>

            <div className="lg:col-span-5 bg-white border-4 border-black overflow-hidden shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <img
                src={hub.image}
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

          <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-5">
            {content.comparisonHeading}
          </h2>
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black text-white text-xs font-black uppercase">
                  <th className="py-3 px-4">{ui.compOption}</th>
                  <th className="py-3 px-4">{ui.compCost}</th>
                  <th className="py-3 px-4">{ui.compDuration}</th>
                  <th className="py-3 px-4">{ui.compPickup}</th>
                  <th className="py-3 px-4">{ui.compNight}</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black text-sm">
                {content.comparisonRows.map((row, idx) => (
                  <tr key={idx} className={idx === 0 ? 'bg-yellow-50 font-bold' : ''}>
                    <td className="py-3 px-4 font-black text-black">{row.option}</td>
                    <td className="py-3 px-4 tabular-nums">{row.cost}</td>
                    <td className="py-3 px-4">{row.duration}</td>
                    <td className="py-3 px-4">{row.pickup}</td>
                    <td className="py-3 px-4">{row.nightRule}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Hub FAQs (SSR DOM parity enabled) */}
      <section className="py-14 bg-gray-50 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-8 text-center">
            {content.faqsHeading}
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
                  <div
                    aria-hidden={!isOpen}
                    className={
                      isOpen
                        ? 'px-5 pb-5 pt-1 text-gray-800 font-medium leading-relaxed border-t border-gray-200'
                        : 'hidden'
                    }
                  >
                    {faq.a}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Cross-Hub Navigation */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <h2 className="text-xl font-black text-black uppercase tracking-tight">
              {content.siblingHeading}
            </h2>
            <a href={routesHref} className="font-black text-sm underline hover:text-yellow-600">
              {ui.viewAllRoutes}
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {hub.siblingHubs.map((sibId) => {
              const sibCfg = getHubConfig(sibId);
              const sibLoc = getHubLocalized(sibId, language);
              return (
                <a
                  key={sibId}
                  href={buildLocalizedPath(sibCfg.view, language)}
                  className="brutal-card bg-yellow-400 p-6 flex items-center justify-between gap-4 group"
                >
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-black uppercase text-black/80 mb-1">
                      {sibId === 'limassol' ? (
                        <ShieldCheck className="w-4 h-4" />
                      ) : (
                        <Clock className="w-4 h-4" />
                      )}
                      <span>{sibLoc.badge}</span>
                    </div>
                    <div className="text-lg sm:text-xl font-black text-black group-hover:underline">
                      {sibLoc.shortLabel}
                    </div>
                  </div>
                  <ArrowRight className="w-6 h-6 shrink-0 text-black group-hover:translate-x-1 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
