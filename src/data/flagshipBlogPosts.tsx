import React from 'react';
import { Language, CORE_LANGUAGES, buildLocalizedPath } from '../lib/routing';
import { getAirportRouteBySlug, getRouteContentForLanguage } from './routes';
import { EXTRA_FLAGSHIP_DEFINITIONS } from './flagshipBlogPostsExtra';

export interface BlogFaqItem {
  q: string;
  a: string;
}

export interface FlagshipBlogMeta {
  title: string;
  description: string;
  keywords: string[];
}

export interface FlagshipSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface FlagshipFareRowSpec {
  routeSlug: string;
  highwayNote: string;
}

export interface LocalizedFlagshipContent {
  title: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  focusKeywords: string[];
  intro: string;
  sections: FlagshipSection[];
  fareTableTitle: string;
  fareTableMode: 'standard' | 'night';
  fareRows: FlagshipFareRowSpec[];
  conclusionTitle: string;
  conclusion: string;
  ctaLabel: string;
  ctaHrefSlug: string;
  faqsTitle: string;
  faqs: BlogFaqItem[];
}

export interface FlagshipPostDefinition {
  id: string;
  slug: string;
  date: string;
  image: string;
  locales: Record<Language, LocalizedFlagshipContent>;
}

const TABLE_HEADERS: Record<
  Language,
  {
    route: string;
    oneWay: string;
    roundTrip: string;
    dayFare: string;
    nightFare: string;
    metrics: string;
    highway: string;
    action: string;
    book: string;
    min: string;
    km: string;
  }
> = {
  en: {
    route: 'Transfer Route',
    oneWay: 'One Way (Sedan)',
    roundTrip: 'Round Trip (−10%)',
    dayFare: 'Day Rate (07:01–22:59)',
    nightFare: 'Night Rate (23:00–07:00)',
    metrics: 'Distance & Time',
    highway: 'Highway',
    action: 'Online Rate',
    book: 'Book →',
    min: 'min',
    km: 'km',
  },
  ru: {
    route: 'Маршрут трансфера',
    oneWay: 'В одну сторону',
    roundTrip: 'Туда-обратно (−10%)',
    dayFare: 'Днём (07:01–22:59)',
    nightFare: 'Ночью (23:00–07:00)',
    metrics: 'Расстояние и время',
    highway: 'Трасса',
    action: 'Заказать',
    book: 'Выбрать →',
    min: 'мин',
    km: 'км',
  },
  de: {
    route: 'Transferstrecke',
    oneWay: 'Einfache Fahrt',
    roundTrip: 'Hin & Zurück (−10%)',
    dayFare: 'Tagtarif (07:01–22:59)',
    nightFare: 'Nachttarif (23:00–07:00)',
    metrics: 'Distanz & Fahrzeit',
    highway: 'Autobahn',
    action: 'Festpreis',
    book: 'Buchen →',
    min: 'Min.',
    km: 'km',
  },
  pl: {
    route: 'Trasa transferu',
    oneWay: 'W jedną stronę',
    roundTrip: 'W obie strony (−10%)',
    dayFare: 'Taryfa dzienna (07:01–22:59)',
    nightFare: 'Taryfa nocna (23:00–07:00)',
    metrics: 'Dystans i czas',
    highway: 'Trasa',
    action: 'Rezerwacja',
    book: 'Wybierz →',
    min: 'min',
    km: 'km',
  },
  fr: {
    route: 'Itinéraire',
    oneWay: 'Aller simple',
    roundTrip: 'Aller-retour (−10%)',
    dayFare: 'Tarif jour (07:01–22:59)',
    nightFare: 'Tarif nuit (23:00–07:00)',
    metrics: 'Distance & durée',
    highway: 'Autoroute',
    action: 'Tarif en ligne',
    book: 'Réserver →',
    min: 'min',
    km: 'km',
  },
  el: {
    route: 'Διαδρομή μεταφοράς',
    oneWay: 'Απλή μετάβαση',
    roundTrip: 'Μετ’ επιστροφής (−10%)',
    dayFare: 'Ημερήσια (07:01–22:59)',
    nightFare: 'Νυχτερινή (23:00–07:00)',
    metrics: 'Απόσταση & διάρκεια',
    highway: 'Αυτοκινητόδρομος',
    action: 'Κράτηση',
    book: 'Επιλογή →',
    min: 'λεπτά',
    km: 'χλμ',
  },
  it: {
    route: 'Tratta transfer',
    oneWay: 'Solo andata',
    roundTrip: 'Andata e ritorno (−10%)',
    dayFare: 'Tariffa giorno (07:01–22:59)',
    nightFare: 'Tariffa notte (23:00–07:00)',
    metrics: 'Distanza e durata',
    highway: 'Autostrada',
    action: 'Tariffa online',
    book: 'Prenota →',
    min: 'min',
    km: 'km',
  },
};

function renderFlagshipJsx(lang: Language, doc: LocalizedFlagshipContent): React.ReactNode {
  const th = TABLE_HEADERS[lang];

  return (
    <>
      <p>{doc.intro}</p>

      {doc.sections.map((section, sIdx) => (
        <React.Fragment key={sIdx}>
          <h2>{section.heading}</h2>
          {section.paragraphs.map((p, pIdx) => (
            <p key={pIdx}>{p}</p>
          ))}
          {section.bullets && section.bullets.length > 0 && (
            <ul>
              {section.bullets.map((b, bIdx) => (
                <li key={bIdx}>{b}</li>
              ))}
            </ul>
          )}
        </React.Fragment>
      ))}

      <h2>{doc.fareTableTitle}</h2>
      <div className="not-prose my-6 overflow-x-auto border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
        <table className="w-full text-left border-collapse text-xs sm:text-sm">
          <thead>
            <tr className="bg-yellow-400 border-b-4 border-black text-black font-black uppercase">
              <th className="p-3 border-r-2 border-black">{th.route}</th>
              <th className="p-3 border-r-2 border-black whitespace-nowrap">
                {doc.fareTableMode === 'night' ? th.dayFare : th.oneWay}
              </th>
              <th className="p-3 border-r-2 border-black whitespace-nowrap">
                {doc.fareTableMode === 'night' ? th.nightFare : th.roundTrip}
              </th>
              <th className="p-3 border-r-2 border-black whitespace-nowrap">{th.metrics}</th>
              <th className="p-3 border-r-2 border-black hidden md:table-cell">{th.highway}</th>
              <th className="p-3 text-right whitespace-nowrap">{th.action}</th>
            </tr>
          </thead>
          <tbody>
            {doc.fareRows.map((row, idx) => {
              const route = getAirportRouteBySlug(row.routeSlug);
              if (!route) return null;
              const localized = getRouteContentForLanguage(route, lang);
              const routeTitle = localized.h1
                .replace(/^(Transfer |Трансфер |Transfert |Μεταφορά )/i, '')
                .replace(/ Transfer$/i, '');
              const roundTripTotal = Math.round(route.basePrice * 2 * 0.9);
              const nightTotal = route.basePrice + 10;
              const href = buildLocalizedPath('route', lang, route.slug);

              return (
                <tr
                  key={route.slug}
                  className={`border-b-2 border-black last:border-b-0 ${
                    idx % 2 === 1 ? 'bg-gray-50' : 'bg-white'
                  }`}
                >
                  <td className="p-3 border-r-2 border-black font-black text-black">
                    <a href={href} className="hover:underline">
                      {routeTitle}
                    </a>
                  </td>
                  <td className="p-3 border-r-2 border-black font-black text-black tabular-nums whitespace-nowrap">
                    €{route.basePrice}
                  </td>
                  <td className="p-3 border-r-2 border-black font-black text-black tabular-nums whitespace-nowrap">
                    {doc.fareTableMode === 'night' ? `€${nightTotal}` : `€${roundTripTotal}`}
                  </td>
                  <td className="p-3 border-r-2 border-black font-bold text-gray-800 tabular-nums whitespace-nowrap">
                    {route.distanceKm} {th.km} · ~{route.durationMin} {th.min}
                  </td>
                  <td className="p-3 border-r-2 border-black font-medium text-gray-700 hidden md:table-cell">
                    {row.highwayNote}
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <a
                      href={href}
                      className="inline-block px-2.5 py-1 bg-black text-yellow-400 font-black text-xs uppercase border border-black hover:bg-yellow-400 hover:text-black transition-colors"
                    >
                      {th.book}
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <h2>{doc.conclusionTitle}</h2>
      <p>{doc.conclusion}</p>
      <p>
        <a href={buildLocalizedPath('route', lang, doc.ctaHrefSlug)}>
          <strong>{doc.ctaLabel}</strong>
        </a>
      </p>
    </>
  );
}

const FLAGSHIP_DEFINITIONS: FlagshipPostDefinition[] = [
  // =========================================================================
  // ARTICLE 1: LARNACA (LCA) & PAPHOS (PFO) AIRPORT TO LIMASSOL TRANSFERS
  // =========================================================================
  {
    id: 'flagship-limassol-lca-pfo',
    slug: 'larnaca-paphos-airport-to-limassol-transfer-guide',
    date: '2026-11-18',
    image: '/images/limassol-route.webp',
    locales: {
      en: {
        title: 'Larnaca (LCA) & Paphos (PFO) Airport to Limassol Transfer Guide (€75 Fixed)',
        seoTitle: 'Larnaca & Paphos Airport to Limassol Transfer (€75 Fixed)',
        metaDescription:
          'Compare Larnaca (LCA) & Paphos (PFO) Airport to Limassol transfers: €75 fixed sedan price, 45–50 min highway times, 10% round-trip discount & 24/7 meet and greet.',
        excerpt:
          'Full 2026 comparison of fixed private transfers (€75), airport rank taxis, and buses from Larnaca (LCA) and Paphos (PFO) directly to Limassol hotels & villas.',
        focusKeywords: [
          'larnaca airport to limassol transfer',
          'paphos airport to limassol taxi price',
          'limassol airport transfer fixed rate',
          'lca to limassol private taxi',
          'pfo to limassol transfer time',
          'limassol airport shuttle vs private car',
        ],
        intro:
          'Limassol is Cyprus’s cosmopolitan hub for five-star beachfront resorts, business districts, and the DP World cruise terminal — situated almost midway between the island’s two international gateways: Larnaca Airport (LCA) to the east and Paphos Airport (PFO) to the west. Because our fleet is permanently stationed in Limassol, both airports are rapid 45-to-50-minute direct highway transfers.',
        sections: [
          {
            heading: '1. Larnaca Airport (LCA) vs. Paphos Airport (PFO) to Limassol',
            paragraphs: [
              'Most international flights land at Larnaca International Airport (LCA), 67 km east of Limassol along the A5 and A1 expressways (~50 minutes door to door). Low-cost and seasonal European routes frequently arrive at Paphos International Airport (PFO), 63 km west along the A6 coastal highway (~45 minutes).',
              'Unlike coastal shuttles that circle multiple tourist villages or metered taxis charging extra per suitcase and minute in traffic, our Limassol-based private sedan rate is identically fixed at €75 per vehicle from either LCA or PFO (covering up to 4 passengers and 3 full-size suitcases).',
            ],
            bullets: [
              'Larnaca Airport (LCA) → Limassol: 67 km · ~50 min · €75 fixed (€135 round-trip)',
              'Paphos Airport (PFO) → Limassol: 63 km · ~45 min · €75 fixed (€135 round-trip)',
              'Round-trip automatic discount: −10% off the total fare on both directions',
              'Fleet comfort: Mercedes E-Class, Opel Insignia, and Toyota Camry sedans with bottled water',
            ],
          },
          {
            heading: '2. Private Transfer vs. Airport Rank Taxi vs. Express Bus',
            paragraphs: [
              'At Larnaca and Paphos arrivals, green/white Airport Limousine Express buses run primarily during daytime hours and drop passengers only at designated highway stops (such as Agios Georgios Havouzas or Old Hospital), requiring a second local taxi to reach Amathus, Tourist Area, or Marina hotels.',
              'Standard airport rank taxis calculate fares by distance meter plus luggage supplements and highway waiting charges. Pre-booking online locks in your exact €75 rate in EUR, assigns a driver tracking your live flight code, and includes inside arrivals meet & greet with a name sign.',
            ],
            bullets: [
              'Private Sedan (€75): Door-to-door drop-off at any Limassol hotel, villa, Marina, or City of Dreams resort',
              'Payment flexibility: Pay full amount online via Stripe or reserve with a €20 deposit (remaining €55 cash/card to driver)',
              'Flight delay protection: Free waiting time regardless of airline schedule changes',
              'Night tariff rule: A flat +€10 night supplement applies strictly between 23:00 and 07:00',
            ],
          },
          {
            heading: '3. Where Our Drivers Drop Off in Limassol & Beyond',
            paragraphs: [
              'Whether you are staying in the eastern hotel belt (Amathus, Parekklisia, Parklane, Four Seasons, St. Raphael), central Germasogeia, Limassol Marina, the Old Town, or western Zakaki / Lady’s Mile, there is no zone-splitting surcharge within Limassol (€75 covers the city). From Limassol, we also dispatch fixed intercity transfers to Nicosia (€120), Ayia Napa (€115), and Paphos (€75).',
            ],
          },
        ],
        fareTableTitle: '2026 Limassol, Larnaca (LCA) & Paphos (PFO) Fixed Transfer Rates',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'A5 & A1 Expressway' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'A6 Coastal Highway' },
          { routeSlug: 'limassol-to-larnaca-city', highwayNote: 'A1 & A5 Highway' },
          { routeSlug: 'limassol-to-paphos', highwayNote: 'A6 Highway' },
          { routeSlug: 'limassol-to-nicosia', highwayNote: 'A1 Highway' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'A1, A5 & A3 Highway' },
        ],
        conclusionTitle: 'Lock In Your Fixed €75 Limassol Transfer Online',
        conclusion:
          'Avoid taxi queues at Arrivals and unpredictable meters. Reserve your Limassol transfer at least 24 hours ahead (with free cancellation up to 24 hours before pickup) and save 10% instantly when booking round trip.',
        ctaLabel: 'Book Larnaca Airport (LCA) → Limassol for €75 →',
        ctaHrefSlug: 'larnaca-airport-to-limassol',
        faqsTitle: 'Frequently Asked Questions: Limassol Airport Transfers',
        faqs: [
          {
            q: 'How much is a private transfer from Larnaca Airport (LCA) or Paphos Airport (PFO) to Limassol?',
            a: 'Both Larnaca Airport (LCA) to Limassol and Paphos Airport (PFO) to Limassol cost a flat €75 per private sedan for up to 4 passengers and 3 suitcases. Booking a round trip cuts the price by 10% to €135 total.',
          },
          {
            q: 'How long does it take to drive from LCA or PFO to Limassol?',
            a: 'From Paphos Airport (PFO) to Limassol takes roughly 45 minutes (63 km via the A6). From Larnaca Airport (LCA) to Limassol takes around 50 minutes (67 km via the A5/A1).',
          },
          {
            q: 'Is the €75 rate per person or per car?',
            a: 'It is strictly per private sedan (not per seat), accommodating up to 4 passengers and 3 standard suitcases with zero luggage surcharges.',
          },
          {
            q: 'What happens if my flight to Larnaca or Paphos arrives late?',
            a: 'We monitor your flight number live. Your driver adjusts pickup time automatically and waits inside the arrivals hall with a name board at zero extra delay cost.',
          },
        ],
      },
      ru: {
        title: 'Трансфер из аэропортов Ларнаки (LCA) и Пафоса (PFO) в Лимассол — фикс €75',
        seoTitle: 'Трансфер Ларнака и Пафос — Лимассол: цена €75, время в пути',
        metaDescription:
          'Как добраться из аэропорта Ларнаки (LCA) и Пафоса (PFO) в Лимассол: фиксированный трансфер €75 за седан, 45–50 минут по трассе, встреча с табличкой и скидка 10% туда-обратно.',
        excerpt:
          'Подробное сравнение трансфера за €75, такси по счётчику и шаттлов из аэропортов Ларнаки (LCA) и Пафоса (PFO) до отелей и вилл Лимассола.',
        focusKeywords: [
          'трансфер аэропорт ларнака лимассол',
          'такси пафос аэропорт лимассол цена',
          'как добраться из ларнаки в лимассол',
          'индивидуальный трансфер лимассол 2026',
          'аэропорт пафос лимассол сколько ехать',
          'трансфер кипр фиксированная цена',
        ],
        intro:
          'Лимассол — деловой и курортный центр Кипра, расположенный ровно посередине между двумя международными аэропортами острова: Ларнакой (LCA) на востоке и Пафосом (PFO) на западе. Поскольку наша база находится непосредственно в Лимассоле, подача и поездка из обоих аэропортов занимают всего 45–50 минут без лишних кругов по курортам.',
        sections: [
          {
            heading: '1. Маршруты из Ларнаки (LCA) и Пафоса (PFO) в Лимассол: точные цифры',
            paragraphs: [
              'Большинство регулярных рейсов прибывает в аэропорт Ларнаки (LCA) — 67 км по скоростным трассам A5 и A1, около 50 минут до отеля или марины Лимассола. Из аэропорта Пафоса (PFO) дорога по трассе A6 занимает 63 км (~45 минут).',
              'Главное преимущество нашей базы в Лимассоле — единая фиксированная цена €75 за весь седан (до 4 пассажиров и 3 чемоданов) из любого из двух аэропортов. Это не цена за кресло, а стоимость всей индивидуальной машины.',
            ],
            bullets: [
              'Ларнака (LCA) ↔ Лимассол: 67 км · ~50 мин · €75 в одну сторону (€135 туда-обратно)',
              'Пафос (PFO) ↔ Лимассол: 63 км · ~45 мин · €75 в одну сторону (€135 туда-обратно)',
              'Автоматическая скидка −10% при оформлении поездки туда и обратно',
              'Комфортные седаны Mercedes E-Class, Opel Insignia, Toyota Camry с прохладной водой в салоне',
            ],
          },
          {
            heading: '2. Трансфер vs такси на стойке аэропорта vs автобус Limassol Airport Express',
            paragraphs: [
              'Междугородний автобус из LCA или PFO стоит дёшево на одного человека, но высаживает пассажиров на трассе (у старой больницы или развязки Агиос Георгиос), откуда с чемоданами всё равно приходится искать городское такси до Аматуса, Гермасойи или Закаки. Ночью и поздним вечером рейсовых автобусов в Лимассол нет.',
              'Обычное такси на выходе из терминала везёт по счётчику с доплатой за чемоданы, простой в пробках и посадку. Предзаказ онлайн фиксирует сумму €75 заранее — без сюрпризов по прилёту.',
            ],
            bullets: [
              'Доставка от двери до двери: любые отели Лимассола, апартаменты у Марины, Parklane, Four Seasons, City of Dreams',
              'Удобная оплата: 100% онлайн картой через Stripe либо депозит €20 сейчас и €55 наличными водителю',
              'Бесплатное ожидание при задержке рейса: водитель отслеживает номер рейса онлайн',
              'Прозрачный ночной тариф: с 23:00 до 07:00 добавляется фиксированно +€10 к поездке',
            ],
          },
          {
            heading: '3. Междугородние поездки из Лимассола по всему Кипру',
            paragraphs: [
              'Помимо аэропортов, мы выполняем прямые междугородние трансферы из Лимассола в Пафос (€75), центр Ларнаки (€75), Никосию (€120) и Айя-Напу (€115). Водитель забирает вас точно у подъезда виллы, офиса или терминала круизного порта DP World Limassol.',
            ],
          },
        ],
        fareTableTitle: 'Таблица фиксированных цен на трансферы Лимассол — LCA — PFO (2026)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Трассы A5 и A1' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Трасса A6' },
          { routeSlug: 'limassol-to-larnaca-city', highwayNote: 'Трассы A1 и A5' },
          { routeSlug: 'limassol-to-paphos', highwayNote: 'Трасса A6' },
          { routeSlug: 'limassol-to-nicosia', highwayNote: 'Трасса A1' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'Трассы A1, A5 и A3' },
        ],
        conclusionTitle: 'Забронируйте трансфер в Лимассол по цене €75 заранее',
        conclusion:
          'Оформите заявку минимум за 24 часа до вылета (доступна бесплатная отмена за 24 часа до подачи), чтобы водитель ждал вас с именной табличкой сразу после паспортного контроля.',
        ctaLabel: 'Заказать трансфер Ларнака (LCA) → Лимассол за €75 →',
        ctaHrefSlug: 'larnaca-airport-to-limassol',
        faqsTitle: 'Частые вопросы о трансфере в Лимассол',
        faqs: [
          {
            q: 'Сколько стоит такси из аэропорта Ларнаки или Пафоса до Лимассола?',
            a: 'Фиксированная цена индивидуального седана из аэропорта Ларнаки (LCA) и из аэропорта Пафоса (PFO) в Лимассол составляет €75 за всю машину (до 4 человек и 3 чемоданов). При заказе туда-обратно действует скидка 10% — €135 за обе поездки.',
          },
          {
            q: 'Сколько времени занимает дорога до отеля в Лимассоле?',
            a: 'Из аэропорта Пафоса (PFO) — около 45 минут (63 км по A6), из аэропорта Ларнаки (LCA) — около 50 минут (67 км по A5 и A1).',
          },
          {
            q: 'Цена €75 указана за одного пассажира или за весь автомобиль?',
            a: 'Это полная стоимость за весь автомобиль (седан вмещает до 4 пассажиров и 3 больших чемодана). Доплат за багаж или кондиционер нет.',
          },
          {
            q: 'Можно ли оплатить только депозит при бронировании?',
            a: 'Да, вы можете оплатить всю сумму онлайн картой через Stripe или внести фиксированный депозит €20, а остаток €55 отдать водителю после поездки.',
          },
        ],
      },
      de: {
        title: 'Flughafentransfer Larnaka (LCA) & Paphos (PFO) nach Limassol (€75 Festpreis)',
        seoTitle: 'Transfer Larnaka & Paphos nach Limassol (€75 Festpreis)',
        metaDescription:
          'Larnaka (LCA) & Paphos (PFO) Flughafen nach Limassol Transfer für feste €75 je Limousine. 45–50 Min. Fahrzeit, 10 % Hin-&-Zurück-Rabatt & Flugverfolgung.',
        excerpt:
          'Alle Fakten zu Preisen, Fahrzeiten und Ankunft am Flughafen: Warum der €75 Festpreis-Transfer ab Larnaka (LCA) und Paphos (PFO) nach Limassol die stressfreiste Wahl ist.',
        focusKeywords: [
          'flughafen larnaka nach limassol transfer',
          'paphos flughafen limassol taxi kosten',
          'zypern flughafentransfer limassol festpreis',
          'transfer lca limassol dauer',
          'taxi paphos nach limassol preis',
        ],
        intro:
          'Limassol liegt strategisch genau in der Mitte zwischen den beiden internationalen Flughäfen Zyperns: Larnaka (LCA) im Osten und Paphos (PFO) im Westen. Da unsere Flotte direkt in Limassol stationiert ist, profitieren Urlauber an beiden Flughäfen von kurzen Wegen (45–50 Minuten) und einem einheitlichen Festpreis.',
        sections: [
          {
            heading: '1. Larnaka (LCA) vs. Paphos (PFO) nach Limassol im Überblick',
            paragraphs: [
              'Die meisten Linienflüge aus Deutschland, Österreich und der Schweiz landen in Larnaka (LCA) — 67 km östlich von Limassol (ca. 50 Minuten über A5 und A1). Charter- und Ferienflieger steuern häufig Paphos (PFO) an — 63 km westlich entlang der A6 (ca. 45 Minuten).',
              'Statt Taxameter-Risiko oder Umsteigen am Busbahnhof gilt bei uns für beide Strecken derselbe verbindliche Pauschalpreis von €75 pro Limousine (bis 4 Personen und 3 Koffer).',
            ],
            bullets: [
              'Flughafen Larnaka (LCA) ↔ Limassol: 67 km · ca. 50 Min. · €75 (€135 Hin & Zurück)',
              'Flughafen Paphos (PFO) ↔ Limassol: 63 km · ca. 45 Min. · €75 (€135 Hin & Zurück)',
              '10 % Sofortrabatt auf die Rückfahrt bei direkter Hin-&-Rück-Buchung',
              'Komfortable Limousinen (Mercedes E-Class, Opel Insignia, Toyota Camry) inkl. Wasser',
            ],
          },
          {
            heading: '2. Privattransfer vs. Flughafentaxi vs. Expressbus',
            paragraphs: [
              'Der Airport-Expressbus hält in Limassol lediglich an Autobahn-Haltestellen – mit Gepäck ist anschließend fast immer ein zusätzliches Stadttaxi bis nach Amathus, Germasogeia oder zur Marina nötig. Reguläre Flughafentaxis fahren hingegen nach Taxameter plus Gepäck- und Wartezuschlägen.',
              'Mit unserer Online-Reservierung steht Ihr Chauffeur mit Namensschild in der Ankunftshalle bereit und bringt Sie ohne Zwischenstopps bis vor Ihr Hotel oder Apartment.',
            ],
            bullets: [
              'Tür-zu-Tür-Service zu allen Resorts in Limassol (Four Seasons, Parklane, Amara, City of Dreams, Marina)',
              'Flexible Zahlung: Gesamtbetrag per Stripe oder €20 Anzahlung vorab (€55 beim Fahrer)',
              'Kostenlose Wartezeit bei Flugverspätung durch Live-Flugnummernprüfung',
              'Nachttarif: Zwischen 23:00 und 07:00 Uhr gilt lediglich ein fester Zuschlag von +€10 pro Fahrt',
            ],
          },
        ],
        fareTableTitle: 'Festpreise 2026 ab Limassol, Larnaka (LCA) & Paphos (PFO)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'A5 & A1 Autobahn' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'A6 Küstenautobahn' },
          { routeSlug: 'limassol-to-larnaca-city', highwayNote: 'A1 & A5 Autobahn' },
          { routeSlug: 'limassol-to-paphos', highwayNote: 'A6 Autobahn' },
          { routeSlug: 'limassol-to-nicosia', highwayNote: 'A1 Autobahn' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'A1, A5 & A3 Autobahn' },
        ],
        conclusionTitle: 'Jetzt Limassol-Transfer zum €75 Festpreis sichern',
        conclusion:
          'Buchen Sie mindestens 24 Stunden vor Abflug online (kostenlose Stornierung bis 24 Stunden vorher) und starten Sie entspannt in Ihren Zypern-Urlaub.',
        ctaLabel: 'Larnaka Flughafen (LCA) → Limassol für €75 buchen →',
        ctaHrefSlug: 'larnaca-airport-to-limassol',
        faqsTitle: 'Häufige Fragen zum Transfer nach Limassol',
        faqs: [
          {
            q: 'Was kostet ein Privattransfer von Larnaka (LCA) oder Paphos (PFO) nach Limassol?',
            a: 'Beide Strecken kosten pauschal €75 pro Limousine (bis 4 Passagiere und 3 Koffer). Bei Hin- und Rückbuchung reduziert sich der Gesamtpreis dank 10 % Rabatt auf €135.',
          },
          {
            q: 'Wie lange dauert die Fahrt nach Limassol?',
            a: 'Ab Paphos (PFO) sind Sie in ca. 45 Minuten (63 km) und ab Larnaka (LCA) in rund 50 Minuten (67 km) direkt an Ihrer Unterkunft.',
          },
          {
            q: 'Fallen bei verspätetem Flug zusätzliche Wartegebühren an?',
            a: 'Nein. Wir verfolgen Ihre Flugnummer in Echtzeit – Ihr Fahrer wartet bei Verspätungen kostenfrei.',
          },
          {
            q: 'Kann ich vorab nur eine Anzahlung leisten?',
            a: 'Ja, neben der Komplettzahlung per Stripe können Sie bequem €20 anzahlen und den Restbetrag beim Fahrer begleichen.',
          },
        ],
      },
      pl: {
        title: 'Transfer z lotnisk Larnaka (LCA) i Pafos (PFO) do Limassol — stała cena €75',
        seoTitle: 'Transfer Larnaka i Pafos do Limassol (€75 stała cena)',
        metaDescription:
          'Prywatny transfer z lotniska Larnaka (LCA) i Pafos (PFO) do Limassol za stałe €75 za auto. Czas jazdy 45–50 min, 10% zniżki na powrót i powitanie z tabliczką.',
        excerpt:
          'Kompleksowy poradnik 2026: porównanie prywatnego transferu (€75), taksówek lotniskowych i autobusów z lotnisk Larnaka (LCA) i Pafos (PFO) do hoteli w Limassol.',
        focusKeywords: [
          'transfer lotnisko larnaka limassol cena',
          'pafos limassol taxi koszt',
          'cypr transfer z lotniska limassol',
          'jak dojechac z pafos do limassol',
          'lotnisko larnaka limassol autobus czy taxi',
        ],
        intro:
          'Limassol to turystyczne i biznesowe serce Cypru położone niemal w równej odległości między dwoma międzynarodowymi portami lotniczymi wyspy: Larnaką (LCA) na wschodzie oraz Pafos (PFO) na zachodzie. Nasza baza mieści się w Limassol, dzięki czemu z obu lotnisk docierasz na miejsce bezpośrednio w 45–50 minut.',
        sections: [
          {
            heading: '1. Lotnisko Larnaka (LCA) vs Pafos (PFO) – trasy do Limassol',
            paragraphs: [
              'Z Larnaki (LCA) do Limassol trasa liczy 67 km autostradami A5 i A1 (ok. 50 minut). Z lotniska w Pafos (PFO), popularnego wśród połączeń z Polski, jedzie się 63 km nadmorską trasą A6 (ok. 45 minut).',
              'Bez względu na to, na którym lotnisku lądujesz, obowiązuje u nas jedna, przejrzysta stawka ryczałtowa €75 za cały sedan (do 4 pasażerów i 3 dużych walizek) — bez licznika i ukrytych opłat.',
            ],
            bullets: [
              'Lotnisko Larnaka (LCA) ↔ Limassol: 67 km · ~50 min · €75 (€135 w obie strony)',
              'Lotnisko Pafos (PFO) ↔ Limassol: 63 km · ~45 min · €75 (€135 w obie strony)',
              'Rabat −10% naliczany automatycznie przy rezerwacji w obie strony',
              'Komfortowe limuzyny Mercedes E-Class, Opel Insignia i Toyota Camry z wodą w cenie',
            ],
          },
          {
            heading: '2. Prywatny transfer vs taksówka na postoju vs autobus Express',
            paragraphs: [
              'Autobusy lotniskowe zatrzymują się wyłącznie na wybranych przystankach przy trasie szybkiego ruchu, co z walizkami oznacza konieczność zamawiania kolejnej taksówki do hoteli w Amathus, Germasogeia czy okolicy Mariny. Z kolei taksówki pod terminalem naliczają opłaty z taksometru powiększone o dopłaty za bagaż.',
              'Rezerwując online z wyprzedzeniem, masz zagwarantowaną cenę €75, kierowcę czekającego w hali przylotów z tabliczką z nazwiskiem oraz bezpłatne monitorowanie opóźnień lotu.',
            ],
            bullets: [
              'Odbiór i dowóz pod same drzwi hotelu lub willi w całym Limassol',
              'Elastyczna płatność: całość przez Stripe albo zaliczka €20 online i €55 gotówką kierowcy',
              'Taryfa nocna: w godzinach 23:00–07:00 doliczana jest wyłącznie stała dopłata +€10',
            ],
          },
        ],
        fareTableTitle: 'Cennik stałych transferów Limassol — LCA — PFO (2026)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Autostrady A5 i A1' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Autostrada A6' },
          { routeSlug: 'limassol-to-larnaca-city', highwayNote: 'Autostrady A1 i A5' },
          { routeSlug: 'limassol-to-paphos', highwayNote: 'Autostrada A6' },
          { routeSlug: 'limassol-to-nicosia', highwayNote: 'Autostrada A1' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'Trasy A1, A5 i A3' },
        ],
        conclusionTitle: 'Zarezerwuj transfer do Limassol za stałe €75',
        conclusion:
          'Złóż rezerwację co najmniej 24 godziny przed przylotem (z bezpłatnym odwołaniem do 24 h przed kursem) i oszczędź 10% przy rezerwacji kursu powrotnego.',
        ctaLabel: 'Zarezerwuj Pafos (PFO) → Limassol za €75 →',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'Najczęstsze pytania o transfer do Limassol',
        faqs: [
          {
            q: 'Ile kosztuje transfer z lotniska Pafos lub Larnaka do Limassol?',
            a: 'Zarówno trasa Pafos (PFO) – Limassol, jak i Larnaka (LCA) – Limassol kosztują dokładnie €75 za cały samochód (do 4 pasażerów i 3 walizek). W obie strony cena wynosi €135.',
          },
          {
            q: 'Ile trwa przejazd z lotniska do Limassol?',
            a: 'Z lotniska Pafos jedzie się ok. 45 minut (63 km), a z lotniska Larnaka ok. 50 minut (67 km) bezpośrednią autostradą.',
          },
          {
            q: 'Czy cena €75 obowiązuje za osobę czy za całe auto?',
            a: 'Cena dotyczy całego prywatnego samochodu dla maksymalnie 4 osób — bez dodatkowych opłat za walizki.',
          },
          {
            q: 'Co w przypadku opóźnienia mojego samolotu?',
            a: 'Śledzimy numer Twojego lotu na żywo i dopasowujemy czas odbioru bez żadnych dopłat za oczekiwanie.',
          },
        ],
      },
      fr: {
        title: 'Transfert Aéroport Larnaca (LCA) & Paphos (PFO) vers Limassol (€75 Fixe)',
        seoTitle: 'Transfert Larnaca & Paphos vers Limassol (€75 Tarif Fixe)',
        metaDescription:
          'Transfert privé Larnaca (LCA) & Paphos (PFO) vers Limassol à €75 fixe par berline. 45–50 min sur autoroute, −10 % aller-retour et accueil pancarte 24/7.',
        excerpt:
          'Guide 2026 pour rejoindre Limassol depuis les aéroports de Larnaca (LCA) et Paphos (PFO) : tarif fixe €75, durée du trajet et comparatif taxi / navette.',
        focusKeywords: [
          'transfert aeroport larnaca limassol',
          'taxi paphos aeroport limassol prix',
          'navette larnaca limassol horaire',
          'transfert prive chypre limassol tarif',
          'combien coute un taxi larnaca limassol',
        ],
        intro:
          'Stationnée au cœur de Limassol, notre flotte relie à égale vitesse les deux aéroports internationaux de Chypre : Larnaca (LCA) à l’est et Paphos (PFO) à l’ouest. Profitez d’un transfert direct sans arrêt en 45 à 50 minutes à un tarif unique transparent.',
        sections: [
          {
            heading: '1. Rejoindre Limassol depuis Larnaca (LCA) ou Paphos (PFO)',
            paragraphs: [
              'Depuis l’aéroport de Larnaca (LCA), comptez 67 km via les autoroutes A5 et A1 (environ 50 minutes). Depuis Paphos (PFO), la route côtière A6 parcourt 63 km en près de 45 minutes.',
              'Quel que soit votre terminal d’arrivée, le tarif fixe par berline (jusqu’à 4 passagers et 3 valises) reste strictement identique : €75 l’aller simple, ou €135 l’aller-retour avec la remise de 10 %.',
            ],
            bullets: [
              'Aéroport de Larnaca (LCA) ↔ Limassol : 67 km · ~50 min · €75 (€135 A/R)',
              'Aéroport de Paphos (PFO) ↔ Limassol : 63 km · ~45 min · €75 (€135 A/R)',
              'Suivi de vol en direct et accueil nominatif dans le hall des arrivées',
              'Berlines climatisées (Mercedes Classe E, Opel Insignia, Toyota Camry) avec eau fraîche',
            ],
          },
          {
            heading: '2. Transfert privé vs taxi au compteur vs bus express',
            paragraphs: [
              'Les navettes aéroportuaires déposent uniquement en bordure d’autoroute et ne circulent pas tard la nuit. Les taxis de station facturent au compteur avec suppléments bagages et attente.',
              'En réservant en ligne, votre tarif de €75 est garanti avant le départ avec possibilité de régler un simple acompte de €20 via Stripe (solde de €55 au chauffeur). Un forfait nuit fixe de +€10 s’applique uniquement entre 23h00 et 07h00.',
            ],
          },
        ],
        fareTableTitle: 'Tarifs fixes 2026 depuis Limassol, Larnaca (LCA) & Paphos (PFO)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Autoroutes A5 & A1' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Autoroute côtière A6' },
          { routeSlug: 'limassol-to-larnaca-city', highwayNote: 'Autoroutes A1 & A5' },
          { routeSlug: 'limassol-to-paphos', highwayNote: 'Autoroute A6' },
          { routeSlug: 'limassol-to-nicosia', highwayNote: 'Autoroute A1' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'A1, A5 & A3' },
        ],
        conclusionTitle: 'Réservez votre transfert Limassol à €75 en ligne',
        conclusion:
          'Planifiez votre prise en charge au moins 24 h à l’avance (annulation gratuite jusqu’à 24 h avant le trajet) et économisez 10 % sur votre retour.',
        ctaLabel: 'Réserver Larnaca (LCA) → Limassol à €75 →',
        ctaHrefSlug: 'larnaca-airport-to-limassol',
        faqsTitle: 'Questions fréquentes — Transferts Limassol',
        faqs: [
          {
            q: 'Quel est le prix fixe entre Larnaca (LCA) ou Paphos (PFO) et Limassol ?',
            a: 'Le tarif est de €75 par berline (jusqu’à 4 personnes et 3 valises) pour LCA comme pour PFO, soit €135 en aller-retour avec −10 %.',
          },
          {
            q: 'Le prix inclut-il l’attente si mon avion a du retard ?',
            a: 'Oui, nous suivons votre numéro de vol en direct et l’attente en cas de retard est entièrement gratuite.',
          },
          {
            q: 'Puis-je payer seulement un acompte lors de la réservation ?',
            a: 'Oui, vous pouvez payer la totalité par carte via Stripe ou verser un acompte de €20 et régler €55 en espèces au chauffeur.',
          },
          {
            q: 'Quel supplément s’applique la nuit ?',
            a: 'Uniquement +€10 forfaitaires pour les trajets effectués entre 23h00 et 07h00.',
          },
        ],
      },
      el: {
        title: 'Μεταφορά από Αεροδρόμιο Λάρνακας (LCA) & Πάφου (PFO) στη Λεμεσό (€75)',
        seoTitle: 'Μεταφορά Λάρνακα & Πάφος – Λεμεσός (€75 Σταθερή Τιμή)',
        metaDescription:
          'Ιδιωτική μεταφορά από τα αεροδρόμια Λάρνακας (LCA) και Πάφου (PFO) προς Λεμεσό με €75 σταθερή τιμή. Διάρκεια 45–50 λεπτά, έκπτωση 10% επιστροφής & 24/7 υποδοχή.',
        excerpt:
          'Οδηγός 2026 για τη διαδρομή από τα αεροδρόμια Λάρνακας (LCA) και Πάφου (PFO) στη Λεμεσό: σταθερή χρέωση €75 ανά όχημα, χρόνοι οδήγησης και σύγκριση με ταξί.',
        focusKeywords: [
          'μεταφορα αεροδρομιο λαρνακας λεμεσος τιμη',
          'ταξι παφος αεροδρομιο λεμεσος',
          'ιδιωτικη μεταφορα λεμεσος κυπρος',
          'ποσο κοστιζει το ταξι λαρνακα λεμεσος',
          'μεταφορα απο αεροδρομιο κυπρος',
        ],
        intro:
          'Η Λεμεσός βρίσκεται ακριβώς στο κέντρο ανάμεσα στα δύο διεθνή αεροδρόμια της Κύπρου — τη Λάρνακα (LCA) στα ανατολικά και την Πάφο (PFO) στα δυτικά. Με βάση τον στόλο μας στη Λεμεσό, προσφέρουμε άμεσες μεταφορές πόρτα-πόρτα σε 45–50 λεπτά με ενιαία σταθερή τιμή.',
        sections: [
          {
            heading: '1. Αεροδρόμιο Λάρνακας (LCA) vs Πάφου (PFO) προς Λεμεσό',
            paragraphs: [
              'Από το Αεροδρόμιο Λάρνακας (LCA) η διαδρομή μέσω των αυτοκινητοδρόμων A5 και A1 είναι 67 χλμ (~50 λεπτά). Από το Αεροδρόμιο Πάφου (PFO) μέσω του A6 η απόσταση είναι 63 χλμ (~45 λεπτά).',
              'Και οι δύο διαδρομές έχουν σταθερή τιμή €75 ανά ιδιωτικό sedan (έως 4 επιβάτες και 3 βαλίτσες), χωρίς ταξίμετρο ή χρέωση ανά αποσκευή.',
            ],
            bullets: [
              'Λάρνακα (LCA) ↔ Λεμεσός: 67 χλμ · ~50 λεπτά · €75 (€135 μετ’ επιστροφής)',
              'Πάφος (PFO) ↔ Λεμεσός: 63 χλμ · ~45 λεπτά · €75 (€135 μετ’ επιστροφής)',
              'Αυτόματη έκπτωση 10% στην κράτηση μετ’ επιστροφής',
              'Άνετα sedan Mercedes E-Class, Opel Insignia και Toyota Camry με δωρεάν νερό',
            ],
          },
          {
            heading: '2. Ιδιωτική μεταφορά vs Ταξί πιάτσας vs Λεωφορείο',
            paragraphs: [
              'Τα λεωφορεία express σταματούν μόνο σε κεντρικούς κόμβους του αυτοκινητοδρόμου και δεν εξυπηρετούν μεταμεσονύχτιες αφίξεις. Αντίθετα, τα συμβατικά ταξί χρεώνουν με ταξίμετρο συν επιπλέον τέλη αποσκευών και καθυστέρησης.',
              'Με online κράτηση ο οδηγός σας περιμένει στις αφίξεις με ταμπέλα ονόματος, παρακολουθεί την πτήση δωρεάν και προσφέρει επιλογή προκαταβολής €20 μέσω Stripe (υπόλοιπο €55 στον οδηγό). Για διαδρομές μεταξύ 23:00–07:00 ισχύει σταθερό νυχτερινό τέλος +€10.',
            ],
          },
        ],
        fareTableTitle: 'Σταθερές τιμές 2026: Λεμεσός, Λάρνακα (LCA) & Πάφος (PFO)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Αυτοκινητόδρομοι A5 & A1' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Αυτοκινητόδρομος A6' },
          { routeSlug: 'limassol-to-larnaca-city', highwayNote: 'Αυτοκινητόδρομοι A1 & A5' },
          { routeSlug: 'limassol-to-paphos', highwayNote: 'Αυτοκινητόδρομος A6' },
          { routeSlug: 'limassol-to-nicosia', highwayNote: 'Αυτοκινητόδρομος A1' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'A1, A5 & A3' },
        ],
        conclusionTitle: 'Κλείστε τώρα τη μεταφορά σας στη Λεμεσό με €75',
        conclusion:
          'Κάντε κράτηση τουλάχιστον 24 ώρες νωρίτερα (με δωρεάν ακύρωση έως 24 ώρες πριν) και επωφεληθείτε από 10% έκπτωση στο ταξίδι επιστροφής.',
        ctaLabel: 'Κράτηση Λάρνακα (LCA) → Λεμεσός με €75 →',
        ctaHrefSlug: 'larnaca-airport-to-limassol',
        faqsTitle: 'Συχνές ερωτήσεις για τη μεταφορά στη Λεμεσό',
        faqs: [
          {
            q: 'Πόσο κοστίζει η μεταφορά από το αεροδρόμιο Λάρνακας ή Πάφου στη Λεμεσό;',
            a: 'Η τιμή είναι €75 ανά ιδιωτικό sedan (έως 4 επιβάτες και 3 βαλίτσες) τόσο από LCA όσο και από PFO, ή €135 μετ’ επιστροφής (−10%).',
          },
          {
            q: 'Υπάρχει χρέωση αν καθυστερήσει η πτήση μου;',
            a: 'Όχι, παρακολουθούμε την πτήση σας ζωντανά και η αναμονή είναι εντελώς δωρεάν.',
          },
          {
            q: 'Πόση ώρα διαρκεί η διαδρομή;',
            a: 'Περίπου 45 λεπτά από το Αεροδρόμιο Πάφου (63 χλμ) και περίπου 50 λεπτά από το Αεροδρόμιο Λάρνακας (67 χλμ).',
          },
          {
            q: 'Μπορώ να δώσω μόνο προκαταβολή online;',
            a: 'Ναι, μπορείτε να εξοφλήσετε €20 μέσω Stripe κατά την κράτηση και τα υπόλοιπα €55 στον οδηγό.',
          },
        ],
      },
      it: {
        title: 'Transfer Aeroporto Larnaca (LCA) & Paphos (PFO) a Limassol (€75 Fisso)',
        seoTitle: 'Transfer Larnaca & Paphos per Limassol (€75 Tariffa Fissa)',
        metaDescription:
          'Transfer privato da Larnaca (LCA) e Paphos (PFO) a Limassol a €75 fissi per auto. 45–50 min in autostrada, −10% andata e ritorno e accoglienza 24/7.',
        excerpt:
          'Guida 2026 per raggiungere Limassol dagli aeroporti di Larnaca (LCA) e Paphos (PFO): tariffa fissa €75 a berlina, tempi di percorrenza e confronto con taxi e bus.',
        focusKeywords: [
          'transfer aeroporto larnaca limassol prezzo',
          'taxi paphos aeroporto limassol',
          'trasferimento privato limassol cipro',
          'come arrivare da larnaca a limassol',
          'prezzo taxi aeroporto cipro limassol',
        ],
        intro:
          'Limassol sorge in posizione centrale tra i due aeroporti internazionali di Cipro: Larnaca (LCA) a est e Paphos (PFO) a ovest. Con la nostra base operativa direttamente a Limassol, garantiamo collegamenti diretti di 45–50 minuti a tariffa fissa trasparente.',
        sections: [
          {
            heading: '1. Da Larnaca (LCA) o Paphos (PFO) a Limassol: tempi e costi',
            paragraphs: [
              'Dall’Aeroporto di Larnaca (LCA) la corsa misura 67 km lungo le autostrade A5 e A1 (~50 minuti). Dall’Aeroporto di Paphos (PFO) la tratta costiera lungo la A6 dura ~45 minuti per 63 km.',
              'Per entrambi gli scali la nostra tariffa fissa è di €75 per berlina privata (fino a 4 passeggeri e 3 valigie), senza costi extra per traffico o bagagli.',
            ],
            bullets: [
              'Larnaca (LCA) ↔ Limassol: 67 km · ~50 min · €75 (€135 andata e ritorno)',
              'Paphos (PFO) ↔ Limassol: 63 km · ~45 min · €75 (€135 andata e ritorno)',
              'Sconto immediato del 10% prenotando andata e ritorno',
              'Berline Mercedes Classe E, Opel Insignia e Toyota Camry climatizzate con acqua fresca',
            ],
          },
          {
            heading: '2. Transfer privato vs taxi a tassametro vs navetta Express',
            paragraphs: [
              'Gli autobus express fermano solo lungo svincoli autostradali esterni e non operano nelle ore notturne. I taxi in aeroporto applicano il tassametro con supplementi bagagli.',
              'Con la prenotazione online l’autista ti attende agli arrivi con cartello nominativo, monitora il volo gratuitamente e puoi versare un semplice acconto di €20 su Stripe (€55 al conducente). Tra le 23:00 e le 07:00 è previsto un supplemento notturno fisso di +€10.',
            ],
          },
        ],
        fareTableTitle: 'Tariffe fisse 2026: Limassol, Larnaca (LCA) & Paphos (PFO)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Autostrade A5 & A1' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Autostrada costiera A6' },
          { routeSlug: 'limassol-to-larnaca-city', highwayNote: 'Autostrade A1 & A5' },
          { routeSlug: 'limassol-to-paphos', highwayNote: 'Autostrada A6' },
          { routeSlug: 'limassol-to-nicosia', highwayNote: 'Autostrada A1' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'A1, A5 & A3' },
        ],
        conclusionTitle: 'Prenota il tuo transfer a Limassol per €75 fissi',
        conclusion:
          'Blocca il prezzo online almeno 24 ore prima del volo (cancellazione gratuita fino a 24 ore prima) e risparmia il 10% sul viaggio di ritorno.',
        ctaLabel: 'Prenota Larnaca (LCA) → Limassol a €75 →',
        ctaHrefSlug: 'larnaca-airport-to-limassol',
        faqsTitle: 'Domande frequenti sui transfer per Limassol',
        faqs: [
          {
            q: 'Quanto costa il transfer privato da Larnaca (LCA) o Paphos (PFO) a Limassol?',
            a: 'Il prezzo fisso è €75 a berlina (fino a 4 passeggeri e 3 valigie) da entrambi gli aeroporti, oppure €135 andata e ritorno con il 10% di sconto.',
          },
          {
            q: 'L’attesa per ritardo volo è gratuita?',
            a: 'Sì, monitoriamo il tuo volo in tempo reale e l’autista attende senza costi aggiuntivi.',
          },
          {
            q: 'Quanto dura il tragitto fino a Limassol?',
            a: 'Circa 45 minuti dall’Aeroporto di Paphos (63 km) e circa 50 minuti da Larnaca (67 km).',
          },
          {
            q: 'Posso prenotare con un piccolo acconto?',
            a: 'Sì, puoi pagare online l’acconto di €20 con Stripe e saldare i restanti €55 direttamente all’autista.',
          },
        ],
      },
    },
  },

  // =========================================================================
  // ARTICLE 2: PAPHOS AIRPORT (PFO) TO AYIA NAPA, PROTARAS, LARNACA & NICOSIA
  // =========================================================================
  {
    id: 'flagship-pfo-cross-island',
    slug: 'paphos-airport-to-ayia-napa-protaras-nicosia-transfer',
    date: '2026-11-19',
    image: '/images/larnaca-route.webp',
    locales: {
      en: {
        title: 'Paphos Airport (PFO) to Ayia Napa, Protaras, Nicosia & Larnaca Fixed Transfers',
        seoTitle: 'Paphos Airport to Ayia Napa, Protaras & Nicosia Transfer Prices',
        metaDescription:
          'Direct fixed-rate transfers from Paphos Airport (PFO) to Ayia Napa (€180), Protaras (€190), Nicosia (€150) & Larnaca (€135) via Limassol. No bus changes.',
        excerpt:
          'Landed at Paphos (PFO) for a holiday in Ayia Napa, Protaras, Larnaca, or Nicosia? See exact fixed car fares, highway durations, and why direct transfers beat 3-bus journeys.',
        focusKeywords: [
          'paphos airport to ayia napa transfer',
          'paphos to protaras taxi price',
          'paphos airport to nicosia transfer',
          'paphos airport to larnaca taxi cost',
          'cross island transfer cyprus',
          'larnaca airport to coral bay transfer',
        ],
        intro:
          'Many travelers fly into Paphos International Airport (PFO) on budget European routes even when their hotel or villa is located on the opposite side of Cyprus — in Ayia Napa, Protaras, Larnaca, or Nicosia. Because there are zero direct intercity buses from Paphos Airport to Eastern Cyprus or Nicosia, a pre-booked direct sedan turns an exhausting multi-stop transit into one smooth highway ride via Limassol.',
        sections: [
          {
            heading: '1. Why Paphos Airport (PFO) Cross-Island Public Transit Takes 3–4 Hours',
            paragraphs: [
              'If you rely on public buses after landing at Paphos (PFO), you must first take local Bus 612 or 613 into Paphos Harbour/Karavella Station, switch to an Intercity bus toward Limassol or Larnaca, and then board a third local OSEA bus (101/102/711) to reach Ayia Napa or Protaras — taking up to 4 hours with suitcases.',
              'With our Limassol dispatch hub positioned halfway across the A6/A1/A5/A3 highway corridor, we run continuous non-stop door-to-door sedans straight between PFO and eastern resorts.',
            ],
            bullets: [
              'Paphos Airport (PFO) → Larnaca City: 132 km · ~90 min · €135 fixed (€243 round-trip)',
              'Paphos Airport (PFO) → Nicosia: 145 km · ~100 min · €150 fixed (€270 round-trip)',
              'Paphos Airport (PFO) → Ayia Napa: 175 km · ~120 min · €180 fixed (€324 round-trip)',
              'Paphos Airport (PFO) → Protaras: 185 km · ~130 min · €190 fixed (€342 round-trip)',
            ],
          },
          {
            heading: '2. Reverse Cross-Island Transfers from Larnaca (LCA) to West Cyprus',
            paragraphs: [
              'Flying into Larnaca (LCA) while staying in western resorts works identically in reverse along our Limassol corridor: LCA → Paphos Town (€135), LCA → Paphos Airport (€140), LCA → Coral Bay (€150), LCA → Peyia (€155), and LCA → Polis Chrysochous (€180). For 3 to 4 passengers sharing one vehicle, the fixed per-car rate often compares favorably with renting a car plus fuel and one-way drop fees.',
            ],
          },
        ],
        fareTableTitle: '2026 Cross-Island Fixed Transfer Rates via Limassol',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 & A5 via Limassol' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 & A1 via Limassol' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 & A3' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'A6, A1, A5 & A3' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 & A6 via Limassol' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 & A6 via Limassol' },
        ],
        conclusionTitle: 'Book a Non-Stop Cross-Island Cyprus Sedan',
        conclusion:
          'Save hours of bus transfers after your flight. Pre-book your Paphos Airport cross-island ride online with €20 deposit support, flight tracking, and 10% automatic savings on round trips.',
        ctaLabel: 'Book Paphos Airport (PFO) → Ayia Napa (€180) →',
        ctaHrefSlug: 'paphos-airport-to-ayia-napa',
        faqsTitle: 'FAQ: Paphos Airport Cross-Island & East Coast Transfers',
        faqs: [
          {
            q: 'How much is a direct taxi from Paphos Airport (PFO) to Ayia Napa or Protaras?',
            a: 'Our fixed private sedan fare from Paphos Airport (PFO) is €180 to Ayia Napa (175 km, ~120 min) and €190 to Protaras (185 km, ~130 min) for up to 4 passengers and 3 bags.',
          },
          {
            q: 'Is there a direct bus from Paphos Airport to Ayia Napa, Protaras, or Nicosia?',
            a: 'No. Public buses require 2 to 3 separate transfers via Paphos town and Larnaca or Limassol, often taking 3 to 4 hours and shutting down at night.',
          },
          {
            q: 'Do you also run Larnaca Airport (LCA) to Paphos and Coral Bay transfers?',
            a: 'Yes — LCA to Paphos costs a fixed €135, LCA to Coral Bay €150, and LCA to Peyia €155 via our Limassol corridor.',
          },
          {
            q: 'Can we stop briefly on the way between Paphos and Ayia Napa?',
            a: 'Yes, a quick 5–10 minute refreshment stop at a highway service station near Limassol can be requested directly with your driver at no extra fee.',
          },
        ],
      },
      ru: {
        title: 'Трансфер из аэропорта Пафоса (PFO) в Айя-Напу, Протарас, Никосию и Ларнаку',
        seoTitle: 'Трансфер Пафос (PFO) — Айя-Напа, Протарас, Никосия: цены',
        metaDescription:
          'Прямые трансферы из аэропорта Пафоса (PFO) через Лимассол: Ларнака €135, Никосия €150, Айя-Напа €180, Протарас €190. Без пересадок на 3 автобусах.',
        excerpt:
          'Прилетаете в Пафос (PFO), а отель в Айя-Напе, Протарасе, Ларнаке или Никосии? Точные цены за машину, время в пути через Лимассол и сравнение с автобусами.',
        focusKeywords: [
          'трансфер аэропорт пафос айя напа',
          'пафос протарас такси цена',
          'из аэропорта пафоса в никосию',
          'трансфер пафос ларнака стоимость',
          'межгород кипр через лимассол',
          'ларнака корал бэй трансфер',
        ],
        intro:
          'Многие лоукостеры и чартеры прилетают именно в аэропорт Пафоса (PFO), хотя отель забронирован на другом конце острова — в Айя-Напе, Протарасе, Ларнаке или столице Никосии. Прямых автобусов из аэропорта Пафоса на восток Кипра и в Никосию не существует, поэтому заранее заказанный трансфер экономит до 2–3 часов дороги.',
        sections: [
          {
            heading: '1. Почему дорога на автобусах из PFO на восток занимает до 4 часов',
            paragraphs: [
              'Чтобы добраться общественным транспортом из аэропорта Пафоса до Айя-Напы или Протараса, туристам с чемоданами приходится делать две-три пересадки: сначала автобус 612/613 до центра Пафоса, затем междугородний Intercity до Ларнаки или Лимассола и только потом местный маршрут OSEA 101/102.',
              'Благодаря нашему расположению в Лимассоле мы выполняем прямые беспересадочные рейсы на седане по скоростной связке трасс A6 → A1 → A5 → A3 ровно по фиксированному тарифу.',
            ],
            bullets: [
              'Пафос (PFO) → Центр Ларнаки: 132 км · ~90 мин · €135 (€243 туда-обратно)',
              'Пафос (PFO) → Никосия: 145 км · ~100 мин · €150 (€270 туда-обратно)',
              'Пафос (PFO) → Айя-Напа: 175 км · ~120 мин · €180 (€324 туда-обратно)',
              'Пафос (PFO) → Протарас: 185 км · ~130 мин · €190 (€342 туда-обратно)',
            ],
          },
          {
            heading: '2. Обратные дальние маршруты из аэропорта Ларнаки (LCA) на запад острова',
            paragraphs: [
              'Мы так же регулярно возим гостей при прилёте в Ларнаку (LCA) в обратном направлении через Лимассол: Ларнака (LCA) → Пафос (€135), LCA → Аэропорт Пафоса (€140), LCA → Корал Бэй (€150), LCA → Пейя (€155) и LCA → Полис (€180). Для семьи или компании из 3–4 человек это быстрее и выгоднее аренды авто с возвратом в другом городе.',
            ],
          },
        ],
        fareTableTitle: 'Тарифы на дальние и кросс-островные маршруты через Лимассол',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 и A5 через Лимассол' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 и A1 через Лимассол' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 и A3' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'A6, A1, A5 и A3' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 и A6 через Лимассол' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 и A6 через Лимассол' },
        ],
        conclusionTitle: 'Зафиксируйте цену на дальний трансфер из PFO онлайн',
        conclusion:
          'Не теряйте первый день отпуска на пересадках с багажом. Бронируйте прямой седан минимум за 24 часа со скидкой 10% при заказе туда-обратно или депозитом €20.',
        ctaLabel: 'Заказать Пафос (PFO) → Айя-Напа за €180 →',
        ctaHrefSlug: 'paphos-airport-to-ayia-napa',
        faqsTitle: 'Частые вопросы о дальних трансферах из Пафоса',
        faqs: [
          {
            q: 'Сколько стоит прямой трансфер из аэропорта Пафоса в Айя-Напу или Протарас?',
            a: 'Фиксированная цена за седан (до 4 пассажиров и 3 чемоданов) из PFO до Айя-Напы составляет €180 (175 км, ~2 часа), до Протараса — €190 (185 км, ~2 ч 10 мин).',
          },
          {
            q: 'Ходит ли прямой автобус из аэропорта Пафоса в Айя-Напу или Никосию?',
            a: 'Нет, прямого автобусного сообщения нет — потребуются минимум 2–3 пересадки через центр Пафоса и Ларнаку/Лимассол.',
          },
          {
            q: 'Возите ли вы в обратном направлении — из Ларнаки (LCA) в Пафос и Корал Бэй?',
            a: 'Да, мы выполняем все дальние маршруты через Лимассол: Ларнака (LCA) → Пафос стоит €135, до Корал Бэй — €150, до Пейи — €155.',
          },
          {
            q: 'Входит ли короткая остановка в пути в стоимость?',
            a: 'Да, по просьбе водитель бесплатно сделает короткую 5–10 минутную остановку на трассе у Лимассола.',
          },
        ],
      },
      de: {
        title: 'Flughafen Paphos (PFO) nach Ayia Napa, Protaras, Nikosia & Larnaka Transfers',
        seoTitle: 'Transfer Paphos (PFO) nach Ayia Napa, Protaras & Nikosia',
        metaDescription:
          'Direkte Festpreis-Transfers ab Flughafen Paphos (PFO) über Limassol: Larnaka €135, Nikosia €150, Ayia Napa €180, Protaras €190. Ohne Umsteigen.',
        excerpt:
          'Flug nach Paphos (PFO), aber Hotel in Ayia Napa, Protaras, Larnaka oder Nikosia? Alle Festpreise, Fahrzeiten über Limassol und Bus-Vergleich.',
        focusKeywords: [
          'paphos flughafen nach ayia napa transfer',
          'taxi paphos nach protaras preis',
          'paphos flughafen nikosia transfer',
          'paphos nach larnaka flughafentransfer',
          'zypern inseltransfer festpreis',
        ],
        intro:
          'Viele günstige Ferienflüge aus Deutschland landen in Paphos (PFO), während beliebte Urlaubsorte wie Ayia Napa, Protaras, Larnaka oder die Hauptstadt Nikosia am anderen Ende Zyperns liegen. Da es ab dem Flughafen Paphos keine direkten Fernbusse in den Osten gibt, spart ein privater Direkttransfer bis zu 3 Stunden Reisezeit.',
        sections: [
          {
            heading: '1. Öffentlicher Bus vs. Direktfahrt über die Insel (Limassol-Korridor)',
            paragraphs: [
              'Mit dem Linienbus benötigen Reisende nach Ayia Napa oder Protaras zwei bis drei Umstiege über Paphos-Stadt und Larnaka oder Limassol – inklusive Wartezeit oft fast 4 Stunden.',
              'Unsere in Limassol ansässigen Limousinen fahren Sie direkt über das Autobahnnetz A6–A1–A5–A3 ohne Umsteigen bis vor Ihr Resort.',
            ],
            bullets: [
              'Paphos (PFO) ↔ Larnaka Stadt: 132 km · ~90 Min. · €135 (€243 Hin & Zurück)',
              'Paphos (PFO) ↔ Nikosia: 145 km · ~100 Min. · €150 (€270 Hin & Zurück)',
              'Paphos (PFO) ↔ Ayia Napa: 175 km · ~120 Min. · €180 (€324 Hin & Zurück)',
              'Paphos (PFO) ↔ Protaras: 185 km · ~130 Min. · €190 (€342 Hin & Zurück)',
            ],
          },
          {
            heading: '2. Gegenrichtung: Ab Larnaka (LCA) nach Paphos & Coral Bay',
            paragraphs: [
              'Umgekehrt bieten wir dieselben Nonstop-Langstrecken ab Flughafen Larnaka (LCA) über Limassol an den Westen: LCA → Paphos (€135), LCA → Coral Bay (€150), LCA → Peyia (€155) und LCA → Polis (€180).',
            ],
          },
        ],
        fareTableTitle: 'Festpreise für Querinsel-Transfers über Limassol (2026)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 & A5 via Limassol' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 & A1 via Limassol' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 & A3' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'A6, A1, A5 & A3' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 & A6 via Limassol' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 & A6 via Limassol' },
        ],
        conclusionTitle: 'Komfortable Langstrecke ohne Umsteigen buchen',
        conclusion:
          'Sichern Sie Ihren Festpreis ab Paphos (PFO) oder Larnaka (LCA) vorab online mit 10 % Hin-&-Rück-Rabatt und optionaler €20 Anzahlung.',
        ctaLabel: 'Paphos (PFO) → Ayia Napa (€180) buchen →',
        ctaHrefSlug: 'paphos-airport-to-ayia-napa',
        faqsTitle: 'FAQ: Fern-Transfers ab Flughafen Paphos (PFO)',
        faqs: [
          {
            q: 'Was kostet ein Transfer von Paphos (PFO) nach Ayia Napa oder Protaras?',
            a: 'Der Festpreis pro Limousine (bis 4 Personen) beträgt €180 nach Ayia Napa (ca. 120 Min.) und €190 nach Protaras (ca. 130 Min.).',
          },
          {
            q: 'Gibt es einen direkten Bus ab Paphos Flughafen nach Ayia Napa?',
            a: 'Nein, Sie müssten mehrmals in Paphos und Limassol/Larnaka umsteigen.',
          },
          {
            q: 'Fahren Sie auch Larnaka (LCA) nach Coral Bay oder Paphos?',
            a: 'Ja: LCA nach Paphos kostet €135, nach Coral Bay €150 und nach Peyia €155.',
          },
          {
            q: 'Ist auf der langen Fahrt eine kurze Pause möglich?',
            a: 'Selbstverständlich hält Ihr Fahrer auf Wunsch kostenfrei für 5–10 Minuten an einer Raststätte bei Limassol.',
          },
        ],
      },
      pl: {
        title: 'Transfer z lotniska Pafos (PFO) do Ayia Napa, Protaras, Nikozji i Larnaki',
        seoTitle: 'Transfer Pafos (PFO) – Ayia Napa, Protaras, Nikozja: ceny',
        metaDescription:
          'Bezpośredni transfer z lotniska Pafos (PFO) przez Limassol: Larnaka €135, Nikozja €150, Ayia Napa €180, Protaras €190. Bez przesiadek w autobusach.',
        excerpt:
          'Lądujesz w Pafos (PFO), a Twój hotel jest w Ayia Napa, Protaras, Larnace lub Nikozji? Sprawdź stałe ceny, czas jazdy i uniknij 4-godzinnej podróży z przesiadkami.',
        focusKeywords: [
          'transfer pafos ayia napa cena',
          'lotnisko pafos protaras taxi',
          'transfer pafos larnaka koszt',
          'pafos nikozja prywatny transfer',
          'larnaka coral bay transfer cypr',
        ],
        intro:
          'Wiele popularnych lotów z Polski ląduje na lotnisku w Pafos (PFO), nawet gdy turyści rezerwują hotele we wschodniej części Cypru — w Ayia Napa, Protaras lub Larnace. Z PFO nie kursują bezpośrednie autobusy na wschód wyspy ani do Nikozji, dlatego prywatny kurs przez Limassol jest najszybszym rozwiązaniem.',
        sections: [
          {
            heading: '1. Dlaczego autobus z PFO na wschód wyspy trwa nawet 4 godziny',
            paragraphs: [
              'Podróż komunikacją miejską wymaga 2–3 przesiadek z bagażami (najpierw autobus do centrum Pafos, potem Intercity do Larnaki lub Limassol, a następnie lokalny OSEA do Ayia Napa i Protaras).',
              'Nasi kierowcy z Limassol jadą bez żadnych postojów autostradami A6, A1, A5 i A3 prosto pod hotel w stałej cenie za auto.',
            ],
            bullets: [
              'Pafos (PFO) ↔ Larnaka (Miasto): 132 km · ~90 min · €135 (€243 w obie strony)',
              'Pafos (PFO) ↔ Nikozja: 145 km · ~100 min · €150 (€270 w obie strony)',
              'Pafos (PFO) ↔ Ayia Napa: 175 km · ~120 min · €180 (€324 w obie strony)',
              'Pafos (PFO) ↔ Protaras: 185 km · ~130 min · €190 (€342 w obie strony)',
            ],
          },
          {
            heading: '2. Kursy z Larnaki (LCA) do Pafos i Coral Bay w drugą stronę',
            paragraphs: [
              'Realizujemy również przejazdy z Larnaki (LCA) na zachód Cypru przez Limassol: LCA → Pafos (€135), LCA → Coral Bay (€150), LCA → Peyia (€155) oraz LCA → Polis (€180).',
            ],
          },
        ],
        fareTableTitle: 'Stałe ceny dalekich transferów przez Limassol (2026)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 i A5 przez Limassol' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 i A1 przez Limassol' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 i A3' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'A6, A1, A5 i A3' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 i A6 przez Limassol' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 i A6 przez Limassol' },
        ],
        conclusionTitle: 'Zarezerwuj bezpośredni przejazd z Pafos lub Larnaki',
        conclusion:
          'Zyskaj 10% rabatu w obie strony i zarezerwuj stałą stawkę online z zaliczką €20.',
        ctaLabel: 'Zarezerwuj Pafos (PFO) → Ayia Napa (€180) →',
        ctaHrefSlug: 'paphos-airport-to-ayia-napa',
        faqsTitle: 'FAQ: Długie trasy z lotniska Pafos (PFO)',
        faqs: [
          {
            q: 'Ile kosztuje transfer z Pafos (PFO) do Ayia Napa lub Protaras?',
            a: 'Stała cena za cały sedan (do 4 osób) wynosi €180 do Ayia Napa (~120 min) i €190 do Protaras (~130 min).',
          },
          {
            q: 'Czy z lotniska Pafos jedzie bezpośredni autobus do Ayia Napa?',
            a: 'Nie — podróż komunikacją wymaga co najmniej dwóch przesiadek.',
          },
          {
            q: 'Czy obsługujecie trasę odwrotną z Larnaki (LCA) do Coral Bay?',
            a: 'Tak: Larnaka (LCA) – Pafos kosztuje €135, a Larnaka (LCA) – Coral Bay €150.',
          },
          {
            q: 'Czy kierowca może zatrzymać się na krótką przerwę w trasie?',
            a: 'Tak, krótki postój na stacji w okolicy Limassol jest całkowicie bezpłatny na życzenie pasażera.',
          },
        ],
      },
      fr: {
        title: 'Transfert Aéroport Paphos (PFO) vers Ayia Napa, Protaras, Nicosie & Larnaca',
        seoTitle: 'Transfert Paphos (PFO) vers Ayia Napa, Protaras & Nicosie',
        metaDescription:
          'Transferts directs à prix fixe depuis l’aéroport de Paphos (PFO) via Limassol : Larnaca €135, Nicosie €150, Ayia Napa €180, Protaras €190.',
        excerpt:
          'Vous atterrissez à Paphos (PFO) pour séjourner à Ayia Napa, Protaras, Larnaca ou Nicosie ? Découvrez les tarifs fixes directs et comparez avec les correspondances en bus.',
        focusKeywords: [
          'transfert paphos ayia napa tarif',
          'taxi aeroport paphos protaras prix',
          'transfert paphos larnaca chypre',
          'aeroport paphos nicosie taxi',
          'larnaca coral bay transfert prive',
        ],
        intro:
          'De nombreux vols européens atterrissent à Paphos (PFO) alors que les vacanciers séjournent à l’est de Chypre (Ayia Napa, Protaras, Larnaca) ou à Nicosie. Aucun bus direct ne relie PFO à ces destinations : notre berline privée vous évite 3 correspondances et 4 heures de trajet.',
        sections: [
          {
            heading: '1. Trajets directs Paphos (PFO) → Côte Est & Capitale via Limassol',
            paragraphs: [
              'Grâce au réseau autoroutier A6, A1, A5 et A3 passant par notre base de Limassol, nos trajets longue distance restent rapides et facturés à un prix fixe garanti par véhicule (jusqu’à 4 passagers).',
            ],
            bullets: [
              'Paphos (PFO) ↔ Larnaca Ville : 132 km · ~90 min · €135 (€243 A/R)',
              'Paphos (PFO) ↔ Nicosie : 145 km · ~100 min · €150 (€270 A/R)',
              'Paphos (PFO) ↔ Ayia Napa : 175 km · ~120 min · €180 (€324 A/R)',
              'Paphos (PFO) ↔ Protaras : 185 km · ~130 min · €190 (€342 A/R)',
            ],
          },
          {
            heading: '2. Liaisons inverses depuis Larnaca (LCA) vers l’ouest de Chypre',
            paragraphs: [
              'En sens inverse via Limassol, nous assurons les trajets Larnaca (LCA) → Paphos (€135), Coral Bay (€150), Peyia (€155) et Polis (€180).',
            ],
          },
        ],
        fareTableTitle: 'Tarifs fixes traversée de Chypre via Limassol (2026)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 & A5 via Limassol' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 & A1 via Limassol' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 & A3' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'A6, A1, A5 & A3' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 & A6 via Limassol' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 & A6 via Limassol' },
        ],
        conclusionTitle: 'Réservez votre trajet longue distance sans correspondance',
        conclusion:
          'Bloquez votre berline privée en ligne avec −10 % en aller-retour et suivi de vol inclus.',
        ctaLabel: 'Réserver Paphos (PFO) → Ayia Napa (€180) →',
        ctaHrefSlug: 'paphos-airport-to-ayia-napa',
        faqsTitle: 'FAQ : Trajets longue distance depuis Paphos (PFO)',
        faqs: [
          {
            q: 'Quel est le prix entre l’aéroport de Paphos et Ayia Napa ou Protaras ?',
            a: '€180 pour Ayia Napa (~120 min) et €190 pour Protaras (~130 min) en berline privée jusqu’à 4 personnes.',
          },
          {
            q: 'Existe-t-il un bus direct Paphos – Ayia Napa ?',
            a: 'Non, il faut combiner deux à trois bus via Paphos et Larnaca ou Limassol.',
          },
          {
            q: 'Desservez-vous aussi Larnaca (LCA) → Paphos et Coral Bay ?',
            a: 'Oui : €135 pour Paphos et €150 pour Coral Bay par l’autoroute via Limassol.',
          },
          {
            q: 'Peut-on faire une pause café sur ce long trajet ?',
            a: 'Oui, une courte pause de 5 à 10 minutes près de Limassol est gratuite sur simple demande.',
          },
        ],
      },
      el: {
        title: 'Μεταφορά από Αεροδρόμιο Πάφου (PFO) σε Αγία Νάπα, Πρωταρά & Λευκωσία',
        seoTitle: 'Μεταφορά Πάφος (PFO) – Αγία Νάπα, Πρωταράς, Λευκωσία (€150–€190)',
        metaDescription:
          'Απευθείας μεταφορά από το Αεροδρόμιο Πάφου (PFO) μέσω Λεμεσού: Λάρνακα €135, Λευκωσία €150, Αγία Νάπα €180, Πρωταράς €190. Χωρίς μετεπιβιβάσεις.',
        excerpt:
          'Προσγειώνεστε στην Πάφο (PFO) με προορισμό την Αγία Νάπα, τον Πρωταρά, τη Λάρνακα ή τη Λευκωσία; Δείτε τις σταθερές τιμές και αποφύγετε τα πολύωρα λεωφορεία.',
        focusKeywords: [
          'μεταφορα παφος αγια ναπα τιμη',
          'ταξι αεροδρομιο παφου πρωταρας',
          'παφος αεροδρομιο λευκωσια μεταφορα',
          'μεταφορα παφος λαρνακα κοστος',
          'λαρνακα αεροδρομιο κολπος κοραλλιων',
        ],
        intro:
          'Πολλές πτήσεις χαμηλού κόστους προσγειώνονται στην Πάφο (PFO) ενώ οι ταξιδιώτες διαμένουν στην ανατολική Κύπρο (Αγία Νάπα, Πρωταράς, Λάρνακα) ή τη Λευκωσία. Καθώς δεν υπάρχει απευθείας λεωφορείο, η ιδιωτική μεταφορά μέσω Λεμεσού είναι η πιο άνετη επιλογή.',
        sections: [
          {
            heading: '1. Απευθείας διαδρομές από Πάφο (PFO) σε όλη την Κύπρο μέσω Λεμεσού',
            paragraphs: [
              'Αντί για 2–3 αλλαγές λεωφορείων και 3–4 ώρες ταλαιπωρία με βαλίτσες, οι οδηγοί μας σας μεταφέρουν απευθείας από το PFO στον προορισμό σας μέσω του αυτοκινητοδρόμου A6–A1–A5–A3.',
            ],
            bullets: [
              'Πάφος (PFO) ↔ Λάρνακα (Πόλη): 132 χλμ · ~90 λεπτά · €135 (€243 μετ’ επιστροφής)',
              'Πάφος (PFO) ↔ Λευκωσία: 145 χλμ · ~100 λεπτά · €150 (€270 μετ’ επιστροφής)',
              'Πάφος (PFO) ↔ Αγία Νάπα: 175 χλμ · ~120 λεπτά · €180 (€324 μετ’ επιστροφής)',
              'Πάφος (PFO) ↔ Πρωταράς: 185 χλμ · ~130 λεπτά · €190 (€342 μετ’ επιστροφής)',
            ],
          },
          {
            heading: '2. Αντίστροφες διαδρομές από Λάρνακα (LCA) προς Δυτική Κύπρο',
            paragraphs: [
              'Καλύπτουμε επίσης απευθείας διαδρομές από το Αεροδρόμιο Λάρνακας (LCA) προς Πάφο (€135), Κόλπο Κοραλλιών (€150), Πέγεια (€155) και Πόλη Χρυσοχούς (€180).',
            ],
          },
        ],
        fareTableTitle: 'Τιμοκατάλογος διαδρομών από άκρη σε άκρη μέσω Λεμεσού (2026)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 & A5 μέσω Λεμεσού' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 & A1 μέσω Λεμεσού' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 & A3' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'A6, A1, A5 & A3' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 & A6 μέσω Λεμεσού' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 & A6 μέσω Λεμεσού' },
        ],
        conclusionTitle: 'Κλείστε απευθείας υπεραστικό ταξί στην Κύπρο',
        conclusion:
          'Εξοικονομήστε 10% σε κρατήσεις μετ’ επιστροφής και ταξιδέψτε άνετα χωρίς καθυστερήσεις.',
        ctaLabel: 'Κράτηση Πάφος (PFO) → Αγία Νάπα (€180) →',
        ctaHrefSlug: 'paphos-airport-to-ayia-napa',
        faqsTitle: 'Συχνές ερωτήσεις για μακρινές διαδρομές από Πάφο',
        faqs: [
          {
            q: 'Πόσο κοστίζει η μεταφορά από Πάφο (PFO) προς Αγία Νάπα ή Πρωταρά;',
            a: 'Η σταθερή τιμή ανά sedan είναι €180 για Αγία Νάπα (~120 λεπτά) και €190 για Πρωταρά (~130 λεπτά).',
          },
          {
            q: 'Υπάρχει απευθείας λεωφορείο PFO – Αγία Νάπα;',
            a: 'Όχι, απαιτούνται πολλαπλές αλλαγές λεωφορείων μέσω Πάφου και Λάρνακας ή Λεμεσού.',
          },
          {
            q: 'Εκτελείτε και μεταφορές από Λάρνακα (LCA) προς Πάφο και Κόλπο Κοραλλιών;',
            a: 'Ναι, Λάρνακα – Πάφος κοστίζει €135 και Λάρνακα – Κόλπος Κοραλλιών €150.',
          },
          {
            q: 'Μπορούμε να κάνουμε μια σύντομη στάση στη διαδρομή;',
            a: 'Ναι, μια στάση 5–10 λεπτών κοντά στη Λεμεσό παρέχεται δωρεάν κατόπιν συνεννόησης με τον οδηγό.',
          },
        ],
      },
      it: {
        title: 'Transfer Aeroporto Paphos (PFO) a Ayia Napa, Protaras, Nicosia & Larnaca',
        seoTitle: 'Transfer Paphos (PFO) per Ayia Napa, Protaras & Nicosia',
        metaDescription:
          'Transfer diretti a prezzo fisso da Paphos (PFO) via Limassol: Larnaca €135, Nicosia €150, Ayia Napa €180, Protaras €190. Nessun cambio bus.',
        excerpt:
          'Atterri a Paphos (PFO) con hotel a Ayia Napa, Protaras, Larnaca o Nicosia? Tariffe fisse dirette, durate e confronto con i collegamenti in autobus.',
        focusKeywords: [
          'transfer paphos ayia napa prezzo',
          'taxi aeroporto paphos protaras',
          'paphos nicosia transfer privato',
          'da paphos a larnaca costo taxi',
          'larnaca coral bay transfer cipro',
        ],
        intro:
          'Molti voli europei atterrano a Paphos (PFO) anche per soggiorni sulla costa orientale di Cipro — Ayia Napa, Protaras, Larnaca — o a Nicosia. Non esistendo autobus diretti dall’aeroporto di Paphos verso est, una berlina privata via Limassol evita 3 cambi e fino a 4 ore di viaggio.',
        sections: [
          {
            heading: '1. Tratte dirette da Paphos (PFO) attraverso Cipro via Limassol',
            paragraphs: [
              'Lungo le autostrade A6, A1, A5 e A3 colleghiamo direttamente Paphos con tutta l’isola a tariffa fissa per berlina (fino a 4 passeggeri).',
            ],
            bullets: [
              'Paphos (PFO) ↔ Larnaca Città: 132 km · ~90 min · €135 (€243 A/R)',
              'Paphos (PFO) ↔ Nicosia: 145 km · ~100 min · €150 (€270 A/R)',
              'Paphos (PFO) ↔ Ayia Napa: 175 km · ~120 min · €180 (€324 A/R)',
              'Paphos (PFO) ↔ Protaras: 185 km · ~130 min · €190 (€342 A/R)',
            ],
          },
          {
            heading: '2. Tratte inverse da Larnaca (LCA) verso Paphos e Coral Bay',
            paragraphs: [
              'Garantiamo gli stessi transfer diretti dall’Aeroporto di Larnaca (LCA) verso ovest: LCA → Paphos (€135), Coral Bay (€150), Peyia (€155) e Polis (€180).',
            ],
          },
        ],
        fareTableTitle: 'Tariffe fisse interurbane via Limassol (2026)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 & A5 via Limassol' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 & A1 via Limassol' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 & A3' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'A6, A1, A5 & A3' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 & A6 via Limassol' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 & A6 via Limassol' },
        ],
        conclusionTitle: 'Prenota la tua corsa diretta senza cambi',
        conclusion:
          'Blocca online la berlina per 1–4 persone con sconto del 10% andata/ritorno e acconto di soli €20.',
        ctaLabel: 'Prenota Paphos (PFO) → Ayia Napa (€180) →',
        ctaHrefSlug: 'paphos-airport-to-ayia-napa',
        faqsTitle: 'FAQ: Transfer lunghi da Paphos (PFO)',
        faqs: [
          {
            q: 'Quanto costa il transfer privato da Paphos (PFO) ad Ayia Napa o Protaras?',
            a: 'La tariffa fissa per berlina (fino a 4 passeggeri) è €180 per Ayia Napa (~120 min) e €190 per Protaras (~130 min).',
          },
          {
            q: 'Esiste un autobus diretto da Paphos Aeroporto ad Ayia Napa?',
            a: 'No, occorrono 2 o 3 cambi via Paphos centro e Limassol o Larnaca.',
          },
          {
            q: 'Effettuate anche Larnaca (LCA) – Paphos e Coral Bay?',
            a: 'Sì: LCA – Paphos costa €135 e LCA – Coral Bay €150.',
          },
          {
            q: 'È possibile fare una breve sosta durante il viaggio?',
            a: 'Sì, una sosta di 5–10 minuti lungo l’autostrada vicino a Limassol è gratuita su richiesta.',
          },
        ],
      },
    },
  },

  // =========================================================================
  // ARTICLE 3: LATE-NIGHT AIRPORT TRANSFERS & FLIGHT DELAYS AT LCA & PFO
  // =========================================================================
  {
    id: 'flagship-night-delays-guide',
    slug: 'cyprus-night-airport-transfer-flight-delays-guide',
    date: '2026-11-20',
    image: '/images/paphos-route.webp',
    locales: {
      en: {
        title: 'Late-Night Cyprus Airport Transfers & Delayed Flights at LCA & PFO (24/7 Guide)',
        seoTitle: 'Night Airport Transfers Cyprus: LCA & PFO Flight Delay Rules',
        metaDescription:
          'Landing late at Larnaca (LCA) or Paphos (PFO)? Learn the +€10 flat night tariff (23:00–07:00), free flight delay waiting, night bus gaps & 24/7 pickup rules.',
        excerpt:
          'Everything you need to know about late-night landings (23:00–07:00) at Larnaca and Paphos airports: exact +€10 night supplement, free flight tracking, and 24/7 pickup.',
        focusKeywords: [
          'late night taxi larnaca airport',
          'night transfer paphos airport',
          'cyprus airport taxi night tariff',
          'flight delay airport transfer cyprus',
          '24/7 taxi limassol larnaca airport',
          'bus from larnaca airport at night',
        ],
        intro:
          'Dozens of flights from London, Berlin, Warsaw, Paris, Athens, and Milan touch down at Larnaca (LCA) and Paphos (PFO) between 22:30 and 04:30. Arriving after midnight changes your transport options dramatically: airport shuttle buses stop running overnight, car rental desks frequently close or charge out-of-hours fees, and rank taxis add nighttime meter tariffs.',
        sections: [
          {
            heading: '1. Exact Night Tariff Rules (23:00–07:00): Just +€10 Flat per Trip',
            paragraphs: [
              'Many Cyprus airport transfer brokers quietly hide late-night multipliers (+25% to +35%) until checkout. Our night pricing policy is completely transparent and flat island-wide: pickups scheduled between 23:00 and 07:00 carry a simple +€10 flat fee per one-way trip (or +€20 if both outbound and return legs are between 23:00 and 07:00).',
              'If your flight is booked to land at 22:00 (Day Rate €75 to Limassol) and gets delayed past 23:00, our flight-tracking guarantee keeps your pre-booked fixed fare honored with free waiting time inside Arrivals.',
            ],
            bullets: [
              'Night tariff hours: strictly 23:00 to 07:00 (+€10 flat per ride)',
              'Daytime hours: 07:01 to 22:59 (€0 extra fee)',
              'Example LCA / PFO → Limassol: €75 daytime · €85 night rate (1–4 pax sedan)',
              'Zero extra waiting fees if your airline is delayed or baggage reclaim takes longer',
            ],
          },
          {
            heading: '2. Why Pre-Booking Matters for Night Arrivals (18–24h Notice & Urgent Dispatch)',
            paragraphs: [
              'Are there night buses from Larnaca or Paphos airports? Between roughly 23:00 and 05:30, intercity and airport-express services pause almost entirely across Cyprus. Relying on last-minute walk-up taxis in peak summer or 02:00 arrivals can mean long terminal queues or inflated rates.',
              'Our online calculator accepts scheduled bookings at least 18–24 hours ahead (with instant confirmation via Stripe full payment or €20 deposit). Need an urgent night car inside 18 hours? Message our 24/7 Limassol dispatch directly on WhatsApp (+357 96 867289).',
            ],
          },
        ],
        fareTableTitle: '2026 Day vs. Late-Night Airport Transfer Comparison (EUR Fixed)',
        fareTableMode: 'night',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'A5 & A1 Express' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'A6 Coastal Highway' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 & A6 via Limassol' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 & A5 via Limassol' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 & A6 via Limassol' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 & A3' },
        ],
        conclusionTitle: 'Touch Down at Any Hour with a Guaranteed Chauffeur',
        conclusion:
          'Even at 03:30 AM after a delayed flight, your licensed driver meets you right outside Baggage Claim with a name sign and chilled water. Pre-book online now.',
        ctaLabel: 'Book 24/7 Paphos (PFO) → Limassol Transfer →',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'FAQ: Night Airport Transfers & Flight Delays in Cyprus',
        faqs: [
          {
            q: 'What is the night tariff surcharge at Larnaca and Paphos airports?',
            a: 'A flat +€10 night supplement applies to rides between 23:00 and 07:00 (+€20 total if both outbound and return transfers fall within night hours).',
          },
          {
            q: 'Do you charge extra if my night flight is delayed by 1–2 hours?',
            a: 'No. Simply enter your flight number during checkout — we track your arrival live and hold your driver inside the arrivals hall free of charge.',
          },
          {
            q: 'Can I book a transfer less than 18 hours before landing?',
            a: 'Online calendar bookings require at least 18–24 hours advance notice. For urgent same-day or last-minute pickups, contact our 24/7 WhatsApp desk (+357 96 867289) for immediate dispatch.',
          },
          {
            q: 'Are buses available from LCA or PFO at 01:00 or 03:00 AM?',
            a: 'Intercity and Airport Express bus routes largely stop overnight, making a pre-booked fixed transfer or taxi the only reliable door-to-door option.',
          },
        ],
      },
      ru: {
        title: 'Ночной трансфер на Кипре и задержки рейсов в Ларнаке (LCA) и Пафосе (PFO)',
        seoTitle: 'Ночной трансфер Кипр (LCA и PFO): тариф +€10, задержки рейса',
        metaDescription:
          'Прилёт ночью в Ларнаку (LCA) или Пафос (PFO)? Прозрачный ночной тариф +€10 (23:00–07:00), бесплатное ожидание при задержке рейса и правила 24/7 подачи.',
        excerpt:
          'Что делать при позднем прилёте в аэропорты Кипра (23:00–07:00): точные правила ночного тарифа +€10, почему не ходят ночные автобусы и как работает отслеживание задержки.',
        focusKeywords: [
          'ночной трансфер аэропорт ларнака',
          'такси пафос аэропорт ночью цена',
          'ночной тариф такси кипр',
          'задержка рейса трансфер ларнака пафос',
          'как уехать из аэропорта ларнаки ночью',
          'круглосуточный трансфер лимассол',
        ],
        intro:
          'Значительная часть рейсов в Ларнаку (LCA) и Пафос (PFO) прилетает глубоким вечером или ночью — с 22:30 до 04:30 утра. Ночной прилёт на Кипр имеет важные нюансы: междугородние автобусы и шаттлы на ночь прекращают работу, пункты проката авто нередко берут доплату за выдачу ключей после 22:00, а обычные такси на стоянке включают ночной счётчик.',
        sections: [
          {
            heading: '1. Честный ночной тариф (23:00–07:00): фиксированно +€10 за поездку',
            paragraphs: [
              'В отличие от агрегаторов с плавающей ночной наценкой до +35%, у нас действует простая и единая для всего острова доплата: ровно +€10 за поездку в ночной интервал с 23:00 до 07:00 (или +€20, если и подача по прилёту, и обратный выезд в аэропорт выпадают на ночь).',
              'Таким образом, ночной трансфер Ларнака (LCA) → Лимассол или Пафос (PFO) → Лимассол обойдётся ровно в €85 за весь седан вместо дневных €75.',
            ],
            bullets: [
              'Ночной интервал: строго с 23:00 до 07:00 (+€10 за поездку)',
              'Дневной тариф: с 07:01 до 22:59 (доплата €0)',
              'Бесплатное отслеживание рейса: если самолёт задержался на 1–3 часа, доплаты за ожидание нет',
              'Встреча внутри терминала с табличкой сразу у выхода из зоны багажа',
            ],
          },
          {
            heading: '2. За сколько нужно бронировать и что делать при срочном вылете',
            paragraphs: [
              'Междугородние автобусы на Кипре не работают в глубокие ночные часы, поэтому машину лучше закрепить заранее. Через онлайн-форму сайта заказы принимаются минимум за 18–24 часа (доступна бесплатная отмена за 24 часа и депозит €20 через Stripe).',
              'Если трансфер нужен срочно менее чем за 18 часов до прилёта — просто напишите дежурному диспетчеру в Лимассоле в WhatsApp (+357 96 867289), мы работаем круглосуточно.',
            ],
          },
        ],
        fareTableTitle: 'Сравнение дневных и ночных цен трансфера (23:00–07:00)',
        fareTableMode: 'night',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Трассы A5 и A1' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Трасса A6' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 и A6 через Лимассол' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 и A5 через Лимассол' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 и A6 через Лимассол' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 и A3' },
        ],
        conclusionTitle: 'Спокойная встреча даже в 03:00 ночи',
        conclusion:
          'Укажите номер рейса при оформлении — мы проконтролируем посадку в реальном времени, встретим с табличкой и доставим до дверей отеля без ночных переплат по счётчику.',
        ctaLabel: 'Заказать ночной/дневной трансфер Пафос (PFO) → Лимассол →',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'Частые вопросы о ночном трансфере и задержке рейса',
        faqs: [
          {
            q: 'Сколько составляет ночная доплата за трансфер на Кипре?',
            a: 'Фиксированно +€10 к стоимости поездки в промежуток с 23:00 до 07:00 (или +€20, если обе поездки туда и обратно ночные).',
          },
          {
            q: 'Придётся ли доплачивать за простой, если рейс задержали?',
            a: 'Нет. Мы отслеживаем статус рейса по номеру в реальном времени — водитель бесплатно дождётся вашей фактической посадки.',
          },
          {
            q: 'Можно ли уехать из Ларнаки или Пафоса ночью на автобусе?',
            a: 'Поздней ночью (примерно с 23:00 до 05:30) междугородние автобусы между аэропортами и курортами не курсируют.',
          },
          {
            q: 'Что делать, если до поездки осталось меньше 18 часов?',
            a: 'Онлайн-календарь открыт за 18–24 часа, а срочный заказ на сегодня или ближайшую ночь мы принимаем мгновенно в WhatsApp (+357 96 867289).',
          },
        ],
      },
      de: {
        title: 'Zypern Nachttransfer & Flugverspätungen ab Larnaka (LCA) und Paphos (PFO)',
        seoTitle: 'Nachttransfer Zypern (LCA & PFO): +€10 Tarif & Flugverspätung',
        metaDescription:
          'Späte Landung in Larnaka (LCA) oder Paphos (PFO)? Fester +€10 Nachttarif (23:00–07:00), kostenlose Wartezeit bei Verspätung & 24/7 Abholung.',
        excerpt:
          'Alle Regeln für Nachtankünfte zwischen 23:00 und 07:00 Uhr auf Zypern: +€10 Nachtzuschlag ohne versteckte Gebühren, Live-Flugüberwachung und Bus-Auszeiten.',
        focusKeywords: [
          'nachttransfer flughafen larnaka',
          'taxi paphos flughafen nachts kosten',
          'zypern flughafentransfer verspätung',
          'nachttarif taxi zypern 23 uhr',
          '24/7 transfer limassol flughafen',
        ],
        intro:
          'Viele Urlaubsflüge landen zwischen 22:30 und 04:00 Uhr in Larnaka (LCA) oder Paphos (PFO). Nachts fahren auf Zypern jedoch kaum noch Überlandbusse, Mietwagenschalter verlangen teure Spätgebühren und reguläre Flughafentaxis erhöhen den Nachttarif.',
        sections: [
          {
            heading: '1. Transparenter Nachttarif (23:00–07:00): Pauschal nur +€10 pro Fahrt',
            paragraphs: [
              'Zwischen 23:00 und 07:00 Uhr fällt bei uns lediglich eine feste Nachtpauschale von +€10 pro Strecke an (oder +€20 bei zwei Nachtfahrten). So kostet Larnaka (LCA) → Limassol nachts exakt €85 statt €75 tagsüber — ohne Überraschungen.',
              'Bei Flugverspätung verfolgen wir Ihre Maschine in Echtzeit. Ihr Fahrer wartet am Ausgang der Gepäckhalle völlig kostenlos auf Sie.',
            ],
            bullets: [
              'Nachtzeit: exakt 23:00 – 07:00 Uhr (+€10 je Fahrt)',
              'Tageszeit: 07:01 – 22:59 Uhr (€0 Aufpreis)',
              'Keine zusätzlichen Wartegebühren bei Flugverspätung oder Passkontrolle',
              'Online-Buchung 18–24 Std. vorab (Eilanfragen per WhatsApp +357 96 867289)',
            ],
          },
        ],
        fareTableTitle: 'Tages- vs. Nachttarife ab LCA & PFO (2026)',
        fareTableMode: 'night',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'A5 & A1 Autobahn' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'A6 Küstenautobahn' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 & A6 via Limassol' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 & A5 via Limassol' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 & A6 via Limassol' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 & A3' },
        ],
        conclusionTitle: 'Stressfreie Ankunft rund um die Uhr',
        conclusion:
          'Geben Sie bei der Buchung einfach Ihre Flugnummer an – ob um 14:00 Uhr oder um 03:30 Uhr nachts, Ihr Chauffeur empfängt Sie pünktlich mit Namensschild.',
        ctaLabel: '24/7 Transfer Paphos (PFO) → Limassol buchen →',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'FAQ: Nachttransfers & Verspätungen auf Zypern',
        faqs: [
          {
            q: 'Wie hoch ist der Nachtzuschlag auf Zypern?',
            a: 'Für Abholungen zwischen 23:00 und 07:00 Uhr gilt ein fester Zuschlag von +€10 pro Fahrt.',
          },
          {
            q: 'Kostet eine Flugverspätung in der Nacht extra?',
            a: 'Nein, durch unsere Live-Flugverfolgung wartet Ihr Chauffeur kostenfrei in der Ankunftshalle.',
          },
          {
            q: 'Fahren nach 23:00 Uhr noch Flughafenbusse?',
            a: 'Überland- und Expressbusse pausieren in der Regel spät abends bis in die frühen Morgenstunden.',
          },
          {
            q: 'Was tun bei kurzfristiger Buchung unter 18 Stunden?',
            a: 'Schreiben Sie unserem 24/7-Team einfach direkt über WhatsApp (+357 96 867289).',
          },
        ],
      },
      pl: {
        title: 'Nocny transfer na Cyprze i opóźnienia lotów (Larnaka LCA / Pafos PFO)',
        seoTitle: 'Nocny transfer Cypr (LCA i Pafos PFO): taryfa +€10, opóźnienia',
        metaDescription:
          'Przylot w nocy do Larnaki (LCA) lub Pafos (PFO)? Stała dopłata nocna +€10 (23:00–07:00), darmowe czekanie na opóźniony samolot i odbiór 24/7.',
        excerpt:
          'Wszystko o nocnych lądowaniach na Cyprze między 23:00 a 07:00: stała stawka nocna +€10, brak autobusów w nocy oraz bezpłatne monitorowanie lotu.',
        focusKeywords: [
          'nocny transfer larnaka limassol',
          'taxi pafos lotnisko w nocy cena',
          'cypr taryfa nocna transfer',
          'opozniony lot transfer z lotniska cypr',
          'autobusy w nocy larnaka pafos',
        ],
        intro:
          'Wiele lotów z Polski ląduje w Larnace (LCA) lub Pafos (PFO) późnym wieczorem albo w środku nocy. Po godzinie 23:00 autobusy międzymiastowe przestają kursować, wypożyczalnie doliczają opłaty za nocne wydanie kluczyków, a taksówki pod terminalem włączają droższą taryfę.',
        sections: [
          {
            heading: '1. Przejrzysta taryfa nocna (23:00–07:00): stałe +€10 do kursu',
            paragraphs: [
              'Między 23:00 a 07:00 do bazowej ceny za samochód doliczane jest jedynie ryczałtowe +€10 za kurs (lub +€20 przy obu kursach nocnych). Oznacza to, że przejazd LCA/PFO – Limassol w nocy kosztuje równo €85 zamiast €75 w dzień.',
              'Monitorujemy numer Twojego lotu na żywo — w razie opóźnienia kierowca czeka w hali przylotów bez żadnych dodatkowych opłat.',
            ],
            bullets: [
              'Godziny nocne: 23:00 – 07:00 (+€10 za kurs)',
              'Godziny dzienne: 07:01 – 22:59 (€0 dopłaty)',
              'Rezerwacja online z min. 18–24 h wyprzedzenia (pilne kursy przez WhatsApp +357 96 867289)',
            ],
          },
        ],
        fareTableTitle: 'Porównanie cen dziennych i nocnych z LCA i PFO (2026)',
        fareTableMode: 'night',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Autostrady A5 i A1' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Autostrada A6' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 i A6 przez Limassol' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 i A5 przez Limassol' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 i A6 przez Limassol' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 i A3' },
        ],
        conclusionTitle: 'Bezpieczny odbiór o każdej porze dnia i nocy',
        conclusion:
          'Podaj numer lotu podczas zamówienia — nawet przy lądowaniu o 03:00 nad ranem kierowca powita Cię z tabliczką od razu po odbiorze bagażu.',
        ctaLabel: 'Zarezerwuj transfer 24/7 Pafos (PFO) → Limassol →',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'FAQ: Nocne transfery i opóźnienia lotów na Cyprze',
        faqs: [
          {
            q: 'Ile wynosi dopłata nocna z lotnisk LCA i PFO?',
            a: 'Stała dopłata +€10 za kurs obowiązuje wyłącznie między 23:00 a 07:00.',
          },
          {
            q: 'Czy płacę dodatkowo, jeśli samolot ma opóźnienie?',
            a: 'Nie — śledzimy status lotu i kierowca czeka bezpłatnie.',
          },
          {
            q: 'Czy w nocy kursują autobusy z lotniska do Limassol lub Pafos?',
            a: 'Większość połączeń autobusowych przerywa kursowanie od ok. 23:00 do wczesnego rana.',
          },
          {
            q: 'Jak zamówić przejazd poniżej 18 godzin przed przylotem?',
            a: 'Napisz bezpośrednio na nasz całodobowy WhatsApp (+357 96 867289).',
          },
        ],
      },
      fr: {
        title: 'Transfert de nuit à Chypre & retards de vol à Larnaca (LCA) et Paphos (PFO)',
        seoTitle: 'Transfert nuit Chypre (LCA & PFO) : tarif +€10 & vol retardé',
        metaDescription:
          'Arrivée de nuit à Larnaca (LCA) ou Paphos (PFO) ? Supplément nuit fixe +€10 (23h00–07h00), attente vol retardé gratuite et prise en charge 24/7.',
        excerpt:
          'Tout savoir sur les arrivées nocturnes (23h00–07h00) à Chypre : tarif nuit fixe +€10 sans surprise, suivi de vol en direct et absence de bus de nuit.',
        focusKeywords: [
          'transfert nuit aeroport larnaca',
          'taxi paphos aeroport nuit prix',
          'tarif nuit taxi chypre',
          'vol retarde transfert aeroport chypre',
          'bus nuit aeroport larnaca limassol',
        ],
        intro:
          'De nombreux vols européens atterrissent après 22h30 à Larnaca (LCA) ou Paphos (PFO). La nuit, les bus interurbains cessent de circuler, les agences de location facturent des frais d’ouverture tardive et les compteurs des taxis passent au tarif majoré.',
        sections: [
          {
            heading: '1. Tarif de nuit transparent (23h00–07h00) : +€10 forfaitaires',
            paragraphs: [
              'Entre 23h00 et 07h00, un unique supplément fixe de +€10 s’ajoute par trajet (+€20 si aller et retour sont de nuit). Un trajet LCA ou PFO → Limassol passe ainsi de €75 en journée à €85 la nuit.',
              'Si votre vol accuse du retard, notre suivi en temps réel garantit une attente gratuite du chauffeur dans le hall des arrivées.',
            ],
            bullets: [
              'Plage horaire nuit : 23h00 à 07h00 (+€10 fixes)',
              'Plage horaire jour : 07h01 à 22h59 (€0 de supplément)',
              'Réservation en ligne 18–24h avant (demandes urgentes sur WhatsApp +357 96 867289)',
            ],
          },
        ],
        fareTableTitle: 'Comparatif tarifs jour et nuit depuis LCA & PFO (2026)',
        fareTableMode: 'night',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Autoroutes A5 & A1' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Autoroute côtière A6' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 & A6 via Limassol' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 & A5 via Limassol' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 & A6 via Limassol' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 & A3' },
        ],
        conclusionTitle: 'Atterrissez sereinement à toute heure à Chypre',
        conclusion:
          'Indiquez votre numéro de vol en ligne : de jour comme à 03h00 du matin, votre berline vous attend avec accueil nominatif.',
        ctaLabel: 'Réserver Paphos (PFO) → Limassol 24/7 →',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'FAQ : Transferts de nuit & retards d’avion à Chypre',
        faqs: [
          {
            q: 'Quel est le supplément de nuit à LCA et PFO ?',
            a: 'Un forfait fixe de +€10 par trajet s’applique uniquement entre 23h00 et 07h00.',
          },
          {
            q: 'L’attente en cas de vol retardé la nuit est-elle facturée ?',
            a: 'Non, l’attente suite au suivi du vol est 100 % gratuite.',
          },
          {
            q: 'Y a-t-il des bus après 23h00 depuis les aéroports de Chypre ?',
            a: 'Non, la quasi-totalité des bus interurbains s’arrêtent la nuit jusqu’au matin.',
          },
          {
            q: 'Comment réserver à moins de 18 heures du décollage ?',
            a: 'Contactez directement notre centrale WhatsApp 24/7 au +357 96 867289.',
          },
        ],
      },
      el: {
        title: 'Νυχτερινή μεταφορά Κύπρος & καθυστερήσεις πτήσεων σε Λάρνακα (LCA) και Πάφο (PFO)',
        seoTitle: 'Νυχτερινή Μεταφορά Κύπρος (LCA/PFO): +€10 Τέλος & Καθυστερήσεις',
        metaDescription:
          'Άφιξη βράδυ σε Λάρνακα (LCA) ή Πάφο (PFO); Σταθερό νυχτερινό τέλος +€10 (23:00–07:00), δωρεάν αναμονή καθυστέρησης πτήσης & 24/7 παραλαβή.',
        excerpt:
          'Οδηγός νυχτερινών αφίξεων (23:00–07:00) στα αεροδρόμια Κύπρου: διαφανής χρέωση +€10, ζωντανός έλεγχος πτήσης και απουσία νυχτερινών λεωφορείων.',
        focusKeywords: [
          'νυχτερινη μεταφορα αεροδρομιο λαρνακας',
          'ταξι παφος νυχτα τιμη',
          'νυχτερινο ταριφ ταξι κυπρος',
          'καθυστερηση πτησης μεταφορα κυπρος',
          '24ωρο ταξι λεμεσος αεροδρομιο',
        ],
        intro:
          'Πολλές πτήσεις προσγειώνονται μετά τις 22:30 στη Λάρνακα (LCA) και την Πάφο (PFO). Τη νύχτα τα υπεραστικά λεωφορεία σταματούν τα δρομολόγια και τα συμβατικά ταξί χρεώνουν αυξημένο νυχτερινό ταξίμετρο.',
        sections: [
          {
            heading: '1. Σταθερό νυχτερινό τέλος (23:00–07:00): μόνο +€10 ανά διαδρομή',
            paragraphs: [
              'Μεταξύ 23:00 και 07:00 προστίθεται μόνο σταθερό τέλος +€10 ανά μεταφορά (ή +€20 εάν και οι δύο διαδρομές είναι νυχτερινές). Έτσι, η διαδρομή LCA/PFO → Λεμεσός κοστίζει €85 τη νύχτα αντί €75 την ημέρα.',
              'Ελέγχουμε ζωντανά την πτήση σας ώστε η αναμονή σε περίπτωση καθυστέρησης να είναι εντελώς δωρεάν.',
            ],
            bullets: [
              'Νυχτερινό ωράριο: 23:00 – 07:00 (+€10 σταθερά)',
              'Ημερήσιο ωράριο: 07:01 – 22:59 (€0 επιπλέον)',
              'Κράτηση online 18–24 ώρες πριν (επείγοντα αιτήματα στο WhatsApp +357 96 867289)',
            ],
          },
        ],
        fareTableTitle: 'Σύγκριση ημερήσιων & νυχτερινών τιμών από LCA & PFO (2026)',
        fareTableMode: 'night',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Αυτοκινητόδρομοι A5 & A1' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Αυτοκινητόδρομος A6' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 & A6 μέσω Λεμεσού' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 & A5 μέσω Λεμεσού' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 & A6 μέσω Λεμεσού' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 & A3' },
        ],
        conclusionTitle: 'Ασφαλής παραλαβή όλο το 24ωρο',
        conclusion:
          'Δηλώστε τον κωδικό πτήσης σας online — ακόμη και στις 03:30 π.μ., ο οδηγός σας περιμένει στις αφίξεις με ταμπέλα ονόματος.',
        ctaLabel: 'Κράτηση 24/7 Πάφος (PFO) → Λεμεσός →',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'FAQ: Νυχτερινές μεταφορές & καθυστερήσεις πτήσεων',
        faqs: [
          {
            q: 'Πόσο είναι το νυχτερινό τέλος στα αεροδρόμια Λάρνακας και Πάφου;',
            a: 'Ισχύει σταθερή επιβάρυνση +€10 ανά διαδρομή αυστηρά μεταξύ 23:00 και 07:00.',
          },
          {
            q: 'Υπάρχει χρέωση αν καθυστερήσει η πτήση μου το βράδυ;',
            a: 'Όχι, η αναμονή λόγω καθυστέρησης πτήσης είναι 100% δωρεάν.',
          },
          {
            q: 'Υπάρχουν λεωφορεία μετά τις 23:00 από τα αεροδρόμια;',
            a: 'Τα περισσότερα υπεραστικά λεωφορεία διακόπτουν τη λειτουργία τους κατά τη διάρκεια της νύχτας.',
          },
          {
            q: 'Πώς κλείνω ταξί σε λιγότερο από 18 ώρες;',
            a: 'Στείλτε μας μήνυμα στο 24ωρο WhatsApp (+357 96 867289) για άμεση αποστολή οχήματος.',
          },
        ],
      },
      it: {
        title: 'Transfer notturni a Cipro & ritardi volo a Larnaca (LCA) e Paphos (PFO)',
        seoTitle: 'Transfer Notturno Cipro (LCA & PFO): +€10 & Ritardi Volo',
        metaDescription:
          'Arrivo di notte a Larnaca (LCA) o Paphos (PFO)? Supplemento notturno fisso +€10 (23:00–07:00), attesa gratuita per ritardi e ritiro 24/7.',
        excerpt:
          'Guida agli arrivi notturni (23:00–07:00) negli aeroporti di Cipro: tariffa notte fissa +€10, monitoraggio volo gratuito e assenza di bus notturni.',
        focusKeywords: [
          'transfer notturno aeroporto larnaca',
          'taxi paphos aeroporto notte prezzo',
          'tariffa notturna taxi cipro',
          'ritardo volo transfer cipro',
          'autobus notte aeroporto larnaca limassol',
        ],
        intro:
          'Molti voli europei atterrano dopo le 22:30 a Larnaca (LCA) o Paphos (PFO). Nelle ore notturne gli autobus interurbani sospendono le corse, gli autonoleggi applicano extra di apertura e i taxi in aeroporto aumentano il tassametro.',
        sections: [
          {
            heading: '1. Supplemento notturno fisso (23:00–07:00): solo +€10 a tratta',
            paragraphs: [
              'Tra le 23:00 e le 07:00 si applica esclusivamente una quota fissa di +€10 per corsa (+€20 se sia l’andata che il ritorno sono notturni). Così Larnaca o Paphos → Limassol costa €85 di notte anziché €75 di giorno.',
              'Monitoriamo il tuo volo in tempo reale: anche in caso di ritardo aereo l’attesa agli arrivi resta gratuita.',
            ],
            bullets: [
              'Fascia notturna: 23:00 – 07:00 (+€10 fissi)',
              'Fascia diurna: 07:01 – 22:59 (€0 extra)',
              'Prenotazione online 18–24h prima (richieste urgenti su WhatsApp +357 96 867289)',
            ],
          },
        ],
        fareTableTitle: 'Confronto tariffe giorno e notte da LCA & PFO (2026)',
        fareTableMode: 'night',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Autostrade A5 & A1' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Autostrada costiera A6' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5, A1 & A6 via Limassol' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'A6, A1 & A5 via Limassol' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'A5, A1 & A6 via Limassol' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6, A1, A5 & A3' },
        ],
        conclusionTitle: 'Atterraggio sereno a qualsiasi ora del giorno o della notte',
        conclusion:
          'Inserisci il codice volo durante la prenotazione: anche alle 03:30 di notte il tuo autista ti accoglierà agli arrivi con cartello nominativo.',
        ctaLabel: 'Prenota Paphos (PFO) → Limassol 24/7 →',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'FAQ: Transfer notturni e ritardi volo a Cipro',
        faqs: [
          {
            q: 'A quanto ammonta il supplemento notturno a Larnaca e Paphos?',
            a: 'Si applicano +€10 fissi a tratta esclusivamente tra le 23:00 e le 07:00.',
          },
          {
            q: 'Devo pagare un extra se il mio volo notturno ritarda?',
            a: 'No, il monitoraggio volo in tempo reale include l’attesa gratuita in aeroporto.',
          },
          {
            q: 'Ci sono autobus dopo le 23:00 dagli aeroporti di Cipro?',
            a: 'Quasi tutti i collegamenti bus interurbani si fermano nelle ore notturne fino al mattino.',
          },
          {
            q: 'Come prenoto con meno di 18 ore di anticipo?',
            a: 'Scrivici subito sul nostro WhatsApp attivo 24/7 (+357 96 867289) per un invio immediato.',
          },
        ],
      },
    },
  },
];

const ALL_FLAGSHIP_DEFINITIONS: FlagshipPostDefinition[] = [
  ...FLAGSHIP_DEFINITIONS,
  ...EXTRA_FLAGSHIP_DEFINITIONS,
];

export const FLAGSHIP_BLOG_SLUGS = ALL_FLAGSHIP_DEFINITIONS.map((d) => d.slug);

export const flagshipBlogPosts = ALL_FLAGSHIP_DEFINITIONS.map((def) => {
  const title = {} as Record<Language, string>;
  const excerpt = {} as Record<Language, string>;
  const content = {} as Record<Language, React.ReactNode>;
  const seoMeta = {} as Record<Language, FlagshipBlogMeta>;
  const faqs = {} as Record<Language, BlogFaqItem[]>;

  for (const lang of CORE_LANGUAGES) {
    const loc = def.locales[lang];
    title[lang] = loc.title;
    excerpt[lang] = loc.excerpt;
    content[lang] = renderFlagshipJsx(lang, loc);
    seoMeta[lang] = {
      title: loc.seoTitle,
      description: loc.metaDescription,
      keywords: loc.focusKeywords,
    };
    faqs[lang] = loc.faqs;
  }

  return {
    id: def.id,
    slug: def.slug,
    date: def.date,
    image: def.image,
    isMultilingual: true,
    supportedLanguages: CORE_LANGUAGES,
    title,
    excerpt,
    content,
    seoMeta,
    faqs,
  };
});
