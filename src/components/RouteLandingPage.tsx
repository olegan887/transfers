import React, { useEffect, useState } from 'react';
import { ArrowRight, CheckCircle2, Clock, MapPin, ChevronDown, Plane } from 'lucide-react';
import { getAirportRouteBySlug, airportRoutes, getRouteContentForLanguage } from '../data/routes';
import {
  getLoadedRouteEnrichment,
  isRouteDetailsLoaded,
  loadRouteDetails,
} from '../data/routeDetails';
import { useLanguage } from '../i18n/LanguageContext';
import { buildLocalizedPath, Language } from '../lib/routing';
import BookingWidget from './BookingWidget';

interface CompareCopy {
  heading: string;
  colService: string;
  colCost: string;
  colTime: string;
  colDetails: string;
  rowPrivateTitle: string;
  rowPrivateDetails: string;
  rowTaxiTitle: string;
  rowTaxiDetails: string;
  rowBusTitle: string;
  rowBusCost: string;
  rowBusDetails: string;
  roundTripLabel: string;
  nightLabel: string;
  hubLcaLabel: string;
  hubPfoLabel: string;
  hubLimassolLabel: string;
}

const COMPARE_COPY: Record<Language, CompareCopy> = {
  en: {
    heading: 'Private Transfer vs. Metered Taxi vs. Public Bus',
    colService: 'Transport Option',
    colCost: 'Total Cost (1–4 Pax)',
    colTime: 'Travel Time',
    colDetails: 'Pickup, Luggage & Night Rules',
    rowPrivateTitle: 'Private Sedan (Pre-Booked)',
    rowPrivateDetails: 'Door-to-door 24/7, up to 4 pax & 3 suitcases, +€10 flat night (23:00–07:00)',
    rowTaxiTitle: 'Metered Rank Taxi',
    rowTaxiDetails: 'Taximeter Tariff 1/2 + extra fees for luggage (>12 kg), waiting & holidays',
    rowBusTitle: 'Public / Intercity Bus',
    rowBusCost: 'Low per-seat ticket (paid per person)',
    rowBusDetails: 'Hub-to-hub station stops with luggage transfers; no overnight departures',
    roundTripLabel: 'Round Trip −10%',
    nightLabel: 'flat night',
    hubLcaLabel: 'All Larnaca Airport (LCA) Routes',
    hubPfoLabel: 'All Paphos Airport (PFO) Routes',
    hubLimassolLabel: 'All Limassol Transfers',
  },
  ru: {
    heading: 'Индивидуальный трансфер vs Такси по счётчику vs Автобус',
    colService: 'Способ поездки',
    colCost: 'Стоимость (1–4 чел.)',
    colTime: 'Время в пути',
    colDetails: 'Подача, багаж и ночной тариф',
    rowPrivateTitle: 'Частный седан (Фикс)',
    rowPrivateDetails: 'От двери до двери 24/7, до 4 мест и 3 чемоданов, фикс +€10 ночью (23:00–07:00)',
    rowTaxiTitle: 'Такси со стоянки (по счётчику)',
    rowTaxiDetails: 'Счётчик Тариф 1/2 + доплаты за чемоданы (>12 кг), трафик и праздники',
    rowBusTitle: 'Междугородний автобус',
    rowBusCost: 'Билет за каждого пассажира',
    rowBusDetails: 'Только между автостанциями с пересадкой с чемоданами; ночью не ходит',
    roundTripLabel: 'Туда-обратно −10%',
    nightLabel: 'ночь фикс',
    hubLcaLabel: 'Все маршруты Аэропорта Ларнака (LCA)',
    hubPfoLabel: 'Все маршруты Аэропорта Пафос (PFO)',
    hubLimassolLabel: 'Все трансферы из Лимассола',
  },
  de: {
    heading: 'Privattransfer vs. Taxameter-Taxi vs. Linienbus',
    colService: 'Option',
    colCost: 'Gesamtpreis (1–4 Pers.)',
    colTime: 'Fahrzeit',
    colDetails: 'Abholung, Gepäck & Nachtregel',
    rowPrivateTitle: 'Privat-Limousine (Festpreis)',
    rowPrivateDetails: 'Tür-zu-Tür 24/7, bis 4 Pers. & 3 Koffer, pauschal +€10 nachts (23:00–07:00)',
    rowTaxiTitle: 'Taxi mit Taxameter',
    rowTaxiDetails: 'Tarif 1/2 je km plus Zuschläge für Gepäck (>12 kg), Wartezeit & Feiertage',
    rowBusTitle: 'Linien- / Überlandbus',
    rowBusCost: 'Einzelticket je Reisendem',
    rowBusDetails: 'Umstieg an Fernbushaltestellen mit Koffern; keine Nachtfahrten',
    roundTripLabel: 'Hin & Zurück −10 %',
    nightLabel: 'pauschal nachts',
    hubLcaLabel: 'Alle Strecken Flughafen Larnaka (LCA)',
    hubPfoLabel: 'Alle Strecken Flughafen Paphos (PFO)',
    hubLimassolLabel: 'Alle Transfers ab Limassol',
  },
  pl: {
    heading: 'Prywatny transfer vs Taksówka z licznikiem vs Autobus',
    colService: 'Opcja transportu',
    colCost: 'Koszt (1–4 os.)',
    colTime: 'Czas jazdy',
    colDetails: 'Odbiór, bagaż i taryfa nocna',
    rowPrivateTitle: 'Prywatny sedan (Stała cena)',
    rowPrivateDetails: 'Pod drzwi 24/7, do 4 os. i 3 walizek, stałe +€10 nocą (23:00–07:00)',
    rowTaxiTitle: 'Taksówka z postoju (licznik)',
    rowTaxiDetails: 'Taryfa 1/2 za km oraz dopłaty za bagaż (>12 kg), korki i święta',
    rowBusTitle: 'Autobus międzymiastowy',
    rowBusCost: 'Bilet płatny za osobę',
    rowBusDetails: 'Przesiadki między dworcami z bagażem; brak kursów nocnych',
    roundTripLabel: 'W obie strony −10%',
    nightLabel: 'nocą płasko',
    hubLcaLabel: 'Wszystkie trasy Lotnisko Larnaka (LCA)',
    hubPfoLabel: 'Wszystkie trasy Lotnisko Pafos (PFO)',
    hubLimassolLabel: 'Wszystkie transfery z Limassol',
  },
  fr: {
    heading: 'Transfert privé vs Taxi au compteur vs Bus public',
    colService: 'Option',
    colCost: 'Coût total (1–4 pers.)',
    colTime: 'Durée',
    colDetails: 'Prise en charge, bagages & nuit',
    rowPrivateTitle: 'Berline privée (Tarif fixe)',
    rowPrivateDetails: 'Porte-à-porte 24h/24, 4 pax & 3 valises, forfait +10 € la nuit (23h–07h)',
    rowTaxiTitle: 'Taxi au compteur',
    rowTaxiDetails: 'Tarif 1/2 au km + suppléments bagages (>12 kg), trafic et jours fériés',
    rowBusTitle: 'Bus interurbain',
    rowBusCost: 'Billet individuel par passager',
    rowBusDetails: 'Arrêts aux gares routières avec changements ; pas de bus de nuit',
    roundTripLabel: 'Aller-retour −10 %',
    nightLabel: 'forfait nuit',
    hubLcaLabel: 'Tous trajets Aéroport Larnaca (LCA)',
    hubPfoLabel: 'Tous trajets Aéroport Paphos (PFO)',
    hubLimassolLabel: 'Tous transferts Limassol',
  },
  el: {
    heading: 'Ιδιωτική μεταφορά vs Ταξί με ταξίμετρο vs Λεωφορείο',
    colService: 'Επιλογή μεταφοράς',
    colCost: 'Συνολικό κόστος (1–4 άτ.)',
    colTime: 'Χρόνος διαδρομής',
    colDetails: 'Παραλαβή, αποσκευές & νύχτα',
    rowPrivateTitle: 'Ιδιωτικό Sedan (Σταθερή τιμή)',
    rowPrivateDetails: 'Πόρτα-πόρτα 24/7, έως 4 άτομα & 3 βαλίτσες, ενιαίο +€10 νύχτα (23:00–07:00)',
    rowTaxiTitle: 'Ταξί πιάτσας με ταξίμετρο',
    rowTaxiDetails: 'Ταρίφα 1/2 ανά χλμ + έξτρα χρέωση για αποσκευές (>12 kg), κίνηση & αργίες',
    rowBusTitle: 'Υπεραστικό λεωφορείο',
    rowBusCost: 'Χαμηλό εισιτήριο ανά επιβάτη',
    rowBusDetails: 'Μόνο μεταξύ σταθμών με μετεπιβίβαση αποσκευών· χωρίς νυχτερινά',
    roundTripLabel: 'Μετ’ επιστροφής −10%',
    nightLabel: 'νύχτα σταθερά',
    hubLcaLabel: 'Όλες οι διαδρομές Αερ. Λάρνακας (LCA)',
    hubPfoLabel: 'Όλες οι διαδρομές Αερ. Πάφου (PFO)',
    hubLimassolLabel: 'Όλες οι μεταφορές Λεμεσού',
  },
  it: {
    heading: 'Transfer privato vs Taxi a tassametro vs Bus pubblico',
    colService: 'Opzione di viaggio',
    colCost: 'Costo totale (1–4 pax)',
    colTime: 'Durata',
    colDetails: 'Ritiro, bagagli e regola notturna',
    rowPrivateTitle: 'Berlina privata (Tariffa fissa)',
    rowPrivateDetails: 'Porta a porta 24/7, fino a 4 pax e 3 valigie, +€10 fissi di notte (23:00–07:00)',
    rowTaxiTitle: 'Taxi a tassametro',
    rowTaxiDetails: 'Tariffa 1/2 a km + extra per bagagli (>12 kg), traffico e festivi',
    rowBusTitle: 'Bus interurbano pubblico',
    rowBusCost: 'Biglietto economico a passeggero',
    rowBusDetails: 'Fermate alle stazioni con cambi valigia; nessuna corsa notturna',
    roundTripLabel: 'Andata/Ritorno −10%',
    nightLabel: 'notte fisso',
    hubLcaLabel: 'Tutte le tratte Aeroporto Larnaca (LCA)',
    hubPfoLabel: 'Tutte le tratte Aeroporto Paphos (PFO)',
    hubLimassolLabel: 'Tutti i transfer da Limassol',
  },
};

interface RouteLandingPageProps {
  slug: string;
}

export default function RouteLandingPage({ slug }: RouteLandingPageProps) {
  const { language, t } = useLanguage();
  const route = getAirportRouteBySlug(slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [, setDetailsTick] = useState(0);

  useEffect(() => {
    let active = true;
    if (!isRouteDetailsLoaded(language)) {
      loadRouteDetails(language).then(() => {
        if (active) setDetailsTick((v) => v + 1);
      });
    }
    return () => {
      active = false;
    };
  }, [language]);

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
  const enrichment = getLoadedRouteEnrichment(route.slug, language);
  const allFaqs = [...content.faqs, ...(enrichment?.extraFaqs || [])];
  const comp = COMPARE_COPY[language] || COMPARE_COPY.en;
  const homeHref = buildLocalizedPath('home', language);
  const routesHref = buildLocalizedPath('routes-index', language);
  const parentHubView =
    route.category === 'LCA' ? 'hub-lca' : route.category === 'PFO' ? 'hub-pfo' : 'hub-limassol';
  const parentHubLabel =
    route.category === 'LCA'
      ? comp.hubLcaLabel
      : route.category === 'PFO'
      ? comp.hubPfoLabel
      : comp.hubLimassolLabel;
  const returnPrice = Math.round(route.basePrice * 2 * 0.9);
  const meterMin = Math.round(3.8 + route.distanceKm * 0.95);
  const meterMax = Math.round(4.8 + route.distanceKm * 1.15 + 15);
  const taxiMaxDur = route.durationMin + 15;
  const busMinDur = Math.round(route.durationMin * 1.8);
  const busMaxDur = Math.round(route.durationMin * 2.4);
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

      {/* Unique Route Enrichment (Top Commercial Routes) */}
      {enrichment && (
        <section className="py-14 bg-white border-b-4 border-black">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="max-w-4xl mb-8">
              <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-4">
                {enrichment.overviewHeading}
              </h2>
              <div className="space-y-4 text-gray-800 font-medium leading-relaxed text-base">
                {enrichment.overviewParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-yellow-400 border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-lg font-black text-black uppercase tracking-tight mb-4">
                  {enrichment.dropOffHeading}
                </h3>
                <ul className="space-y-2.5">
                  {enrichment.dropOffAreas.map((area, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base font-bold text-black">
                      <MapPin className="w-4 h-4 shrink-0 mt-1 text-black" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
                <h3 className="text-lg font-black text-black uppercase tracking-tight mb-4">
                  {enrichment.tipsHeading}
                </h3>
                <ul className="space-y-3">
                  {enrichment.tips.map((tip, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-gray-800">
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-1 text-black" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Transport Comparison Table */}
      <section className="py-14 bg-gray-50 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-black text-black uppercase tracking-tight mb-6">
            {comp.heading}
          </h2>
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black text-white text-xs font-black uppercase">
                  <th className="py-3.5 px-4">{comp.colService}</th>
                  <th className="py-3.5 px-4">{comp.colCost}</th>
                  <th className="py-3.5 px-4">{comp.colTime}</th>
                  <th className="py-3.5 px-4">{comp.colDetails}</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-black text-sm">
                <tr className="bg-yellow-50 font-bold">
                  <td className="py-3.5 px-4 font-black text-black">{comp.rowPrivateTitle}</td>
                  <td className="py-3.5 px-4 tabular-nums">
                    €{route.basePrice} ({comp.roundTripLabel}: €{returnPrice})
                  </td>
                  <td className="py-3.5 px-4 tabular-nums">
                    ~{route.durationMin} {t('common.min')}
                  </td>
                  <td className="py-3.5 px-4">{comp.rowPrivateDetails}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-black text-black">{comp.rowTaxiTitle}</td>
                  <td className="py-3.5 px-4 tabular-nums">
                    ~€{meterMin}–€{meterMax}
                  </td>
                  <td className="py-3.5 px-4 tabular-nums">
                    ~{route.durationMin}–{taxiMaxDur} {t('common.min')}
                  </td>
                  <td className="py-3.5 px-4">{comp.rowTaxiDetails}</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-black text-black">{comp.rowBusTitle}</td>
                  <td className="py-3.5 px-4">{comp.rowBusCost}</td>
                  <td className="py-3.5 px-4 tabular-nums">
                    ~{busMinDur}–{busMaxDur} {t('common.min')}
                  </td>
                  <td className="py-3.5 px-4">{comp.rowBusDetails}</td>
                </tr>
              </tbody>
            </table>
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
            {allFaqs.map((faq, idx) => {
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

      {/* Related Airport Routes Internal Linking */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <h2 className="text-2xl font-black text-black uppercase tracking-tight">
              {t('routeDetail.relatedTitle')}
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={buildLocalizedPath(parentHubView, language)}
                className="font-black text-sm underline hover:text-yellow-600"
              >
                {parentHubLabel}
              </a>
              <a href={routesHref} className="font-black text-sm underline hover:text-yellow-600">
                {t('routeDetail.viewAllRoutes')}
              </a>
            </div>
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
