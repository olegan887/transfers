import type { FlagshipPostDefinition } from './flagshipBlogPosts';

export const EXTRA_FLAGSHIP_DEFINITIONS: FlagshipPostDefinition[] = [
  {
    id: 'flagship-4',
    slug: 'cyprus-taxi-transfer-prices-2026-guide',
    date: '2026-11-24',
    image: '/images/airport-transfer.webp',
    locales: {
      en: {
        title: 'Cyprus Taxi & Airport Transfer Prices 2026: Complete Fixed-Fare Guide',
        seoTitle: 'Cyprus Taxi & Airport Transfer Prices 2026 | Fixed EUR Tariff Guide',
        metaDescription:
          '2026 Cyprus taxi & private airport transfer rates from LCA (€75–€180) and PFO (€75–€190). Compare official Tariff 1/2 meters vs fixed sedan fares, night rules (+€10) & -10% return.',
        excerpt:
          'How Cyprus airport taxi meters work in 2026 vs pre-booked fixed EUR sedan fares across Larnaca (LCA), Paphos (PFO), Limassol, Nicosia, Ayia Napa, and Polis.',
        focusKeywords: [
          'Cyprus taxi prices 2026',
          'Cyprus airport transfer cost',
          'Larnaca taxi tariff',
          'Paphos airport transfer price',
          'fixed rate taxi Cyprus',
        ],
        intro:
          'Landing in Cyprus without knowing local taxi tariffs can turn a 50-minute coastal ride into an unpredictable metered bill. In 2026, regulated street and airport rank taxis apply daytime Tariff 1 and elevated nighttime Tariff 2 (20:30–06:00), plus flag-fall, waiting time, and per-baggage extras—while pre-booked Limassol private transfers lock one all-inclusive price per sedan before you board your flight.',
        sections: [
          {
            heading: '1. Official Cyprus Metered Taxis vs Pre-Booked Fixed Sedan Transfers',
            paragraphs: [
              'At Larnaca (LCA) and Paphos (PFO) rank queues, drivers switch to Tariff 2 at 20:30 in the evening—much earlier than late summer charter arrivals. Any highway slowdown through Limassol bypass roadworks, terminal pickup waiting, or extra suitcases adds onto the meter.',
              'By contrast, pre-booking a Mercedes E-Class, Opel Insignia, or Toyota Camry sedan sets the final EUR rate upfront for up to 4 passengers and 3 suitcases, including Arrivals Hall meet-and-greet and automated flight delay tracking.',
            ],
            bullets: [
              'Larnaca Airport (LCA) ↔ Limassol: €75 fixed daytime (€85 night 23:00–07:00)',
              'Paphos Airport (PFO) ↔ Limassol: €75 fixed daytime (€85 night 23:00–07:00)',
              'LCA ↔ Paphos / PFO: €135–€140 fixed per sedan along the A5, A1, and A6',
              'Round-trip booking discount: automatic -10% across the entire return fare',
            ],
          },
          {
            heading: '2. Night Rate Rules, Stripe Deposit & Operational Zones',
            paragraphs: [
              'Unlike metered cabs that raise per-kilometer billing between 20:30 and 06:00, our night rule applies a transparent flat +€10 per vehicle strictly for pickups between 23:00 and 07:00—so early-evening flights landing at 21:15 still pay the standard daytime tariff.',
              'Reservation takes a €20 Stripe deposit online (card, Apple Pay, or Google Pay), with the remaining balance settled directly with your chauffeur. From our Limassol base at The Oval, Krinou 3, we focus on Limassol, west coast resorts from LCA, and east coast / capital routes from PFO—avoiding short intra-district hops inside Larnaca or Paphos.',
            ],
          },
        ],
        fareTableTitle: '2026 Fixed Private Sedan Tariff Snapshot (Up to 4 Passengers)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'A5 → A1 (~50 min, 67 km)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'B6 → A6 (~45 min, 63 km)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5 → A1 → A6 (~90 min, 130 km)' },
          { routeSlug: 'larnaca-airport-to-paphos-airport', highwayNote: 'A5 → A1 → A6 (~85 min, 127 km)' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 → A1 (~105 min, 143 km)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6 → A1 → A5 → A3 (~125 min, 175 km)' },
        ],
        conclusionTitle: 'Lock Your 2026 Cyprus Fare Before Landing',
        conclusion:
          'Avoid surprise evening Tariff 2 surcharges and queue delays. Reserve your private sedan with €20 deposit, automatic flight monitoring, and guaranteed fixed EUR pricing.',
        ctaLabel: 'Calculate & Book Your Fixed Fare',
        ctaHrefSlug: 'larnaca-airport-to-limassol',
        faqsTitle: '2026 Cyprus Transfer Pricing FAQ',
        faqs: [
          {
            q: 'Is the quoted €75–€190 fare per person or per car?',
            a: 'All prices are fixed per private sedan for up to 4 passengers and 3 standard suitcases—never per seat.',
          },
          {
            q: 'When does the night surcharge start in Cyprus?',
            a: 'Our private transfers apply a flat +€10 night fee only between 23:00 and 07:00, whereas metered rank taxis switch to higher Tariff 2 at 20:30.',
          },
          {
            q: 'Are highway tolls or luggage fees extra?',
            a: 'Cyprus motorways have no toll booths, and standard luggage plus child seats are included in the pre-booked price.',
          },
          {
            q: 'How do I save 10% on a Cyprus airport return transfer?',
            a: 'Select Round trip in our booking calculator—10% is automatically deducted from the combined return tariff.',
          },
        ],
      },
      ru: {
        title: 'Цены на такси и трансферы на Кипре 2026: полный гид по фиксированным тарифам',
        seoTitle: 'Цены на такси и трансферы на Кипре 2026 | Фиксированные тарифы EUR',
        metaDescription:
          'Актуальные цены 2026 на трансфер из аэропортов Ларнаки (€75–€180) и Пафоса (€75–€190). Сравнение счётчика (Тариф 1/2) и фиксированного седана, ночная доплата +€10 и скидка -10% туда-обратно.',
        excerpt:
          'Как работают счётчики такси на Кипре в 2026 году и почему фиксированный частный трансфер из Ларнаки (LCA), Пафоса (PFO) и Лимассола выгоднее очереди у терминала.',
        focusKeywords: [
          'цены такси Кипр 2026',
          'стоимость трансфера Ларнака Лимассол',
          'такси аэропорт Пафос цены',
          'фиксированный тариф такси Кипр',
        ],
        intro:
          'Прилёт на Кипр без знания местных тарифов часто заканчивается завышенным чеком по счётчику. В 2026 году обычные такси переходят на ночной повышенный Тариф 2 уже с 20:30, добавляя плату за посадку, багаж и ожидание в пробках. Предзаказ частного седана фиксирует точную сумму в евро ещё до вылета.',
        sections: [
          {
            heading: '1. Счётчик аэропорта против фиксированной ставки за машину',
            paragraphs: [
              'На стоянках LCA и PFO итоговый чек зависит от времени суток, трафика на объездной Лимассола и количества чемоданов. При позднем рейсе или объезде дорожных работ сумма по счётчику легко превышает предзаказ на 20–30%.',
              'В нашем парке (Mercedes E-Class, Opel Insignia, Toyota Camry) вы платите фиксированную ставку за весь автомобиль (до 4 пассажиров и 3 крупных чемоданов) со встречей с табличкой в зале прилёта и бесплатным отслеживанием задержек рейса.',
            ],
            bullets: [
              'Аэропорт Ларнака (LCA) ↔ Лимассол: €75 днём (€85 ночью 23:00–07:00)',
              'Аэропорт Пафос (PFO) ↔ Лимассол: €75 днём (€85 ночью 23:00–07:00)',
              'LCA ↔ Пафос / аэропорт PFO: €135–€140 без скрытых надбавок',
              'Заказ туда-обратно сразу снижает общую цену на 10%',
            ],
          },
          {
            heading: '2. Ночное правило (+€10), предоплата €20 и зоны покрытия',
            paragraphs: [
              'Ночная надбавка у нас составляет строго +€10 к машине и действует с 23:00 до 07:00—вечерние рейсы в 21:00–22:30 идут по базовому дневному тарифу. Для брони достаточно депозита €20 онлайн через Stripe, остаток передаётся водителю.',
              'База расположена в Лимассоле (The Oval, Krinou 3), поэтому мы выполняем все маршруты Лимассола, западного побережья из LCA и востока/Никосии из PFO, но не берём короткие поездки внутри Ларнаки или самого Пафоса.',
            ],
          },
        ],
        fareTableTitle: 'Сводка фиксированных тарифов 2026 (до 4 пассажиров)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'A5 → A1 (~50 мин, 67 км)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'B6 → A6 (~45 мин, 63 км)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5 → A1 → A6 (~90 мин, 130 км)' },
          { routeSlug: 'larnaca-airport-to-paphos-airport', highwayNote: 'A5 → A1 → A6 (~85 мин, 127 км)' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 → A1 (~105 мин, 143 км)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6 → A1 → A5 → A3 (~125 мин, 175 км)' },
        ],
        conclusionTitle: 'Зафиксируйте стоимость поездки до вылета',
        conclusion:
          'Забронируйте седан по прозрачной цене без счётчика: депозит €20, бесплатное ожидание рейса и скидка -10% при заказе обратного пути.',
        ctaLabel: 'Рассчитать и забронировать трансфер',
        ctaHrefSlug: 'larnaca-airport-to-limassol',
        faqsTitle: 'Частые вопросы о ценах 2026',
        faqs: [
          {
            q: 'Цена €75–€190 указана за одного пассажира или за машину?',
            a: 'Все тарифы указаны за целый частный седан вместимостью до 4 пассажиров и 3 больших чемоданов.',
          },
          {
            q: 'Со скольких часов действует ночной тариф?',
            a: 'У нас плоская доплата +€10 действует только с 23:00 до 07:00, тогда как счётчики городского такси переходят на ночной тариф уже в 20:30.',
          },
          {
            q: 'Нужно ли доплачивать за платные дороги или детские кресла?',
            a: 'На Кипре нет платных автомагистралей, а детские кресла и багаж входят в стоимость при указании в заказе.',
          },
          {
            q: 'Как получить скидку 10% на обратную дорогу?',
            a: 'Выберите режим «Туда и обратно» в калькуляторе—система автоматически применит скидку 10% к общему маршруту.',
          },
        ],
      },
      de: {
        title: 'Zypern Taxi- & Flughafentransfer-Preise 2026: Kompletter Festpreis-Guide',
        seoTitle: 'Zypern Taxi & Flughafentransfer Preise 2026 | Festpreis-Guide',
        metaDescription:
          'Aktuelle Zypern Transfer-Preise 2026 ab LCA (€75–€180) & PFO (€75–€190). Vergleich Taxameter Tarif 1/2 vs. Festpreis-Limousine, +€10 Nachtregel & 10 % Hin/Rück-Rabatt.',
        excerpt:
          'Wie zyprische Taxameter 2026 rechnen und warum ein vorab gebuchter Festpreis-Transfer ab Larnaca (LCA), Paphos (PFO) und Limassol günstiger und planbarer ist.',
        focusKeywords: [
          'Zypern Taxi Preise 2026',
          'Flughafentransfer Larnaca Kosten',
          'Paphos Taxi Festpreis',
          'Transfer Limassol Preis',
        ],
        intro:
          'Wer ohne Tarifkenntnis am Flughafen Larnaca oder Paphos ins nächste Warteschlangen-Taxi steigt, zahlt oft deutlich mehr als nötig. Bereits ab 20:30 Uhr greift auf Zypern der teurere Nachttarif 2 im Taxameter plus Gepäck- und Startzuschläge—während vorab gebuchte Limousinen einen verbindlichen Festpreis in EUR garantieren.',
        sections: [
          {
            heading: '1. Taxameter am Terminal vs. vorab garantierter Festpreis',
            paragraphs: [
              'Reguläre Flughafentaxis rechnen streng nach Kilometer, Wartezeit und Tageszeit. Verzögerungen rund um Limassol oder abendliche Charterankünfte nach 20:30 Uhr treiben den Betrag spürbar nach oben.',
              'Mit unseren Limousinen (Mercedes E-Klasse, Opel Insignia, Toyota Camry) zahlen Sie einen festen Fahrzeugpreis für bis zu 4 Personen und 3 Koffer inklusive Namensschild in der Ankunftshalle und automatischer Flugverfolgung.',
            ],
            bullets: [
              'Flughafen Larnaca (LCA) ↔ Limassol: €75 Tagpreis (€85 Nacht 23:00–07:00)',
              'Flughafen Paphos (PFO) ↔ Limassol: €75 Tagpreis (€85 Nacht 23:00–07:00)',
              'LCA ↔ Paphos / PFO: €135–€140 pauschal über die Autobahnen A5/A1/A6',
              'Hin- und Rückfahrt gemeinsam buchen = automatisch 10 % Preisnachlass',
            ],
          },
          {
            heading: '2. Transparente Nachtregel (+€10), €20 Anzahlung & Einzugsgebiet',
            paragraphs: [
              'Unser pauschaler Nachtzuschlag beträgt nur +€10 pro Auto und gilt ausschließlich für Abholungen zwischen 23:00 und 07:00 Uhr. Die Reservierung erfolgt mit €20 Stripe-Anzahlung online, der Rest wird beim Fahrer beglichen.',
              'Von unserer Basis im The Oval (Krinou 3, Limassol) decken wir Limassol, den Westen ab LCA sowie den Osten und Nikosia ab PFO ab—reine Kurzstrecken innerhalb von Larnaca oder Paphos bieten wir nicht an.',
            ],
          },
        ],
        fareTableTitle: 'Festpreis-Übersicht 2026 pro Limousine (bis 4 Personen)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'A5 → A1 (~50 Min., 67 km)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'B6 → A6 (~45 Min., 63 km)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5 → A1 → A6 (~90 Min., 130 km)' },
          { routeSlug: 'larnaca-airport-to-paphos-airport', highwayNote: 'A5 → A1 → A6 (~85 Min., 127 km)' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 → A1 (~105 Min., 143 km)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6 → A1 → A5 → A3 (~125 Min., 175 km)' },
        ],
        conclusionTitle: 'Festpreis vor dem Abflug sichern',
        conclusion:
          'Sparen Sie sich Taxameter-Risiken und Terminal-Wartezeiten. Buchen Sie Ihre Limousine mit €20 Anzahlung und -10 % Hin- und Rückfahrtsrabatt.',
        ctaLabel: 'Festpreis berechnen & buchen',
        ctaHrefSlug: 'larnaca-airport-to-limassol',
        faqsTitle: 'Häufige Fragen zu Zypern Transfer-Preisen 2026',
        faqs: [
          {
            q: 'Gelten die genannten €75–€190 pro Person oder pro Fahrzeug?',
            a: 'Immer pro privater Limousine für bis zu 4 Fahrgäste und 3 große Koffer.',
          },
          {
            q: 'Ab wann fällt der Nachtzuschlag an?',
            a: 'Bei uns gilt die Pauschale von +€10 erst ab 23:00 bis 07:00 Uhr—Taxameter schalten bereits um 20:30 Uhr auf Tarif 2.',
          },
          {
            q: 'Fallen auf Zypern Autobahngebühren oder Gepäckzuschläge an?',
            a: 'Nein, Zyperns Autobahnen sind mautfrei und normales Reisegepäck sowie Kindersitze sind inklusive.',
          },
          {
            q: 'Wie erhalte ich 10 % Rabatt auf die Rückfahrt?',
            a: 'Wählen Sie im Rechner „Hin & Zurück“—die Ermäßigung wird sofort berechnet.',
          },
        ],
      },
      pl: {
        title: 'Ceny taxi i transferów na Cyprze 2026: kompletny cennik stałych stawek',
        seoTitle: 'Ceny Taxi i Transferów na Cyprze 2026 | Stałe Stawki EUR',
        metaDescription:
          'Cennik transferów lotniskowych na Cyprze 2026 z LCA (€75–€180) i PFO (€75–€190). Taksometr taryfa 1/2 vs stała cena za sedan, dopłata nocna +€10 i -10% w obie strony.',
        excerpt:
          'Jak działają cypryjskie taksometry w 2026 roku i ile kosztuje prywatny transfer ze stałą ceną z Larnaki (LCA), Pafos (PFO) i Limassolu.',
        focusKeywords: [
          'ceny taxi Cypr 2026',
          'transfer lotnisko Larnaka cena',
          'Pafos Limassol taxi koszt',
          'stała cena transfer Cypr',
        ],
        intro:
          'Podróż z lotniska na Cyprze bez znajomości lokalnych stawek może skończyć się wysokim rachunkiem z taksometru. Już od godziny 20:30 obowiązuje droższa taryfa nocna 2 oraz dopłaty bagażowe, podczas gdy prywatny transfer rezerwowany online gwarantuje jedną niezmienną cenę w euro.',
        sections: [
          {
            heading: '1. Taksometr na postoju czy prywatny sedan ze stałą ceną',
            paragraphs: [
              'Na postojach pod terminalami LCA i PFO cena rośnie przy każdym korku lub późnym lądowaniu po 20:30. Kierowca dolicza również opłatę początkową i bagaż.',
              'W naszym przedpłaconym transferze (Mercedes E-Class, Opel Insignia, Toyota Camry) płacisz stałą kwotę za całe auto do 4 pasażerów i 3 walizek—ze spotkaniem w hali przylotów i monitorowaniem lotu.',
            ],
            bullets: [
              'Lotnisko Larnaka (LCA) ↔ Limassol: €75 w dzień (€85 w nocy 23:00–07:00)',
              'Lotnisko Pafos (PFO) ↔ Limassol: €75 w dzień (€85 w nocy 23:00–07:00)',
              'LCA ↔ Pafos / PFO: €135–€140 stałej stawki autostradami A5, A1 i A6',
              'Rezerwacja tam i z powrotem automatycznie obniża cenę o 10%',
            ],
          },
          {
            heading: '2. Zasada nocna (+€10), zaliczka €20 i strefy działania',
            paragraphs: [
              'Nocna dopłata wynosi zawsze równe +€10 za kurs i dotyczy wyłącznie odbiorów między 23:00 a 07:00. Rezerwację potwierdzasz zaliczką €20 przez Stripe, a resztę płacisz kierowcy.',
              'Operując z Limassolu (The Oval, Krinou 3), obsługujemy trasy Limassolu, zachodni Cypr z LCA oraz wschód i Nikozję z PFO—bez krótkich lokalnych kursów wewnątrz Larnaki czy Pafos.',
            ],
          },
        ],
        fareTableTitle: 'Wybrane stałe stawki transferów na Cyprze 2026',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'A5 → A1 (~50 min, 67 km)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'B6 → A6 (~45 min, 63 km)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5 → A1 → A6 (~90 min, 130 km)' },
          { routeSlug: 'larnaca-airport-to-paphos-airport', highwayNote: 'A5 → A1 → A6 (~85 min, 127 km)' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 → A1 (~105 min, 143 km)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6 → A1 → A5 → A3 (~125 min, 175 km)' },
        ],
        conclusionTitle: 'Zarezerwuj stałą cenę przed wylotem',
        conclusion:
          'Uniknij taryfy nocnej od 20:30 i kolejek na lotnisku. Zablokuj cenę w EUR zaliczką €20 i odbierz -10% przy rezerwacji powrotu.',
        ctaLabel: 'Oblicz i zarezerwuj stałą cenę',
        ctaHrefSlug: 'larnaca-airport-to-limassol',
        faqsTitle: 'Pytania o ceny transferów na Cyprze 2026',
        faqs: [
          {
            q: 'Czy stawki €75–€190 dotyczą osoby czy całego samochodu?',
            a: 'Zawsze całego prywatnego sedana dla maksymalnie 4 pasażerów i 3 dużych walizek.',
          },
          {
            q: 'Od której godziny liczy się dopłata nocna?',
            a: 'U nas stałe +€10 obowiązuje od 23:00 do 07:00, podczas gdy taksówki miejskie włączają droższą taryfę już o 20:30.',
          },
          {
            q: 'Czy na Cyprze są płatne autostrady?',
            a: 'Nie, autostrady są bezpłatne, a bagaż standardowy i foteliki dziecięce są wliczone w cenę.',
          },
          {
            q: 'Jak skorzystać ze zniżki 10% w obie strony?',
            a: 'Wybierz opcję „W obie strony” w kalkulatorze rezerwacji—rabat naliczy się od razu.',
          },
        ],
      },
      fr: {
        title: 'Tarifs Taxi et Transfert Aéroport Chypre 2026 : Guide des Prix Fixes',
        seoTitle: 'Prix Taxi & Transfert Aéroport Chypre 2026 | Tarifs Fixes EUR',
        metaDescription:
          'Grille tarifaire 2026 des transferts privés depuis Larnaca (€75–€180) et Paphos (€75–€190). Compteur Tarif 1/2 vs berline prix fixe, forfait nuit +10 € et -10 % aller-retour.',
        excerpt:
          'Comprendre les compteurs de taxi à Chypre en 2026 et comparer avec les tarifs fixes en berline privée depuis Larnaca (LCA), Paphos (PFO) et Limassol.',
        focusKeywords: [
          'prix taxi Chypre 2026',
          'tarif transfert aéroport Larnaca',
          'coût taxi Paphos Limassol',
          'transfert prix fixe Chypre',
        ],
        intro:
          'Prendre un taxi au compteur à l’arrivée à Larnaca ou Paphos réserve souvent des surprises : dès 20h30, le tarif de nuit (Tarif 2) s’applique avec suppléments bagages et prise en charge. Réserver une berline privée bloque un prix tout compris en euros avant même le décollage.',
        sections: [
          {
            heading: '1. Compteur officiel à la borne vs berline privée à tarif garanti',
            paragraphs: [
              'Aux bornes des aéroports LCA et PFO, le moindre ralentissement autoroutier autour de Limassol ou une arrivée après 20h30 fait grimper le compteur rapidement.',
              'Nos Mercedes Classe E, Opel Insignia et Toyota Camry proposent un tarif unique par voiture (jusqu’à 4 passagers et 3 valises), accueil nominatif en salle d’arrivée et suivi automatique du vol.',
            ],
            bullets: [
              'Aéroport Larnaca (LCA) ↔ Limassol : 75 € de jour (85 € la nuit 23h00–07h00)',
              'Aéroport Paphos (PFO) ↔ Limassol : 75 € de jour (85 € la nuit 23h00–07h00)',
              'LCA ↔ Paphos / PFO : 135 €–140 € fixes via A5, A1 et A6',
              'Réservation aller-retour = remise automatique de -10 % sur le total',
            ],
          },
          {
            heading: '2. Forfait nuit (+10 €), acompte Stripe 20 € et zones desservies',
            paragraphs: [
              'Notre supplément de nuit est un forfait fixe de +10 € appliqué uniquement entre 23h00 et 07h00. Un acompte de 20 € en ligne valide le chauffeur ; le solde se règle à l’arrivée.',
              'Basés à Limassol (The Oval, Krinou 3), nous assurons Limassol, la côte ouest depuis LCA et la côte est / Nicosie depuis PFO, sans trajets courts intra-urbains à Larnaca ou Paphos.',
            ],
          },
        ],
        fareTableTitle: 'Aperçu des tarifs fixes 2026 par berline (jusqu’à 4 passagers)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'A5 → A1 (~50 min, 67 km)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'B6 → A6 (~45 min, 63 km)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5 → A1 → A6 (~90 min, 130 km)' },
          { routeSlug: 'larnaca-airport-to-paphos-airport', highwayNote: 'A5 → A1 → A6 (~85 min, 127 km)' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 → A1 (~105 min, 143 km)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6 → A1 → A5 → A3 (~125 min, 175 km)' },
        ],
        conclusionTitle: 'Bloquez votre tarif 2026 avant d’embarquer',
        conclusion:
          'Évitez la file d’attente et le tarif de nuit dès 20h30. Réservez votre berline fixe avec 20 € d’acompte et -10 % aller-retour.',
        ctaLabel: 'Calculer & réserver mon tarif fixe',
        ctaHrefSlug: 'larnaca-airport-to-limassol',
        faqsTitle: 'Questions sur les tarifs Chypre 2026',
        faqs: [
          {
            q: 'Les prix de 75 €–190 € s’entendent-ils par personne ou par voiture ?',
            a: 'Toujours par berline privée pour 4 passagers et 3 grandes valises maximum.',
          },
          {
            q: 'À quelle heure commence le supplément nuit ?',
            a: 'Forfait fixe +10 € entre 23h00 et 07h00 chez nous, alors que les taxis de rue passent en Tarif 2 dès 20h30.',
          },
          {
            q: 'Y a-t-il des péages autoroutiers ou frais de bagages ?',
            a: 'Les autoroutes chypriotes sont gratuites et bagages ou rehausseurs sont inclus.',
          },
          {
            q: 'Comment profiter des -10 % sur le retour ?',
            a: 'Sélectionnez Aller-Retour dans le calculateur pour déduire automatiquement 10 %.',
          },
        ],
      },
      el: {
        title: 'Τιμές Ταξί & Μεταφοράς Αεροδρομίου Κύπρος 2026: Πλήρης Οδηγός Σταθερών Τιμών',
        seoTitle: 'Τιμές Ταξί & Μεταφοράς Κύπρος 2026 | Σταθερές Τιμές EUR',
        metaDescription:
          'Τιμοκατάλογος 2026 από Λάρνακα LCA (€75–€180) και Πάφο PFO (€75–€190). Σύγκριση ταξιμέτρου Τιμολογίου 1/2 με σταθερό σεντάν, νυχτερινό +€10 & -10% με επιστροφή.',
        excerpt:
          'Πώς λειτουργούν τα ταξίμετρα στην Κύπρο το 2026 και γιατί το προκρατημένο ιδιωτικό σεντάν από LCA, PFO και Λεμεσό συμφέρει.',
        focusKeywords: [
          'τιμές ταξί Κύπρος 2026',
          'κόστος μεταφοράς Λάρνακα Λεμεσός',
          'ταξί αεροδρόμιο Πάφος τιμή',
          'σταθερή τιμή μεταφοράς Κύπρος',
        ],
        intro:
          'Η άφιξη στην Κύπρο χωρίς γνώση των τοπικών χρεώσεων συχνά οδηγεί σε ακριβό λογαριασμό ταξιμέτρου. Το 2026 τα ταξί πιάτσας εφαρμόζουν αυξημένο νυχτερινό Τιμολόγιο 2 από τις 20:30, συν εκκίνηση και αποσκευές—ενώ το προκρατημένο σεντάν κλειδώνει μία σταθερή τιμή EUR.',
        sections: [
          {
            heading: '1. Ταξίμετρο Αεροδρομίου έναντι Σταθερής Τιμής Οχήματος',
            paragraphs: [
              'Στις ουρές των LCA και PFO, τυχόν κίνηση στον περιφερειακό Λεμεσού ή απογευματινή άφιξη μετά τις 20:30 αυξάνουν σημαντικά τη χρέωση ανά χιλιόμετρο.',
              'Με τα Mercedes E-Class, Opel Insignia και Toyota Camry μας πληρώνετε ένα σταθερό ποσό ανά όχημα (έως 4 επιβάτες και 3 βαλίτσες) με υποδοχή στην αίθουσα αφίξεων και παρακολούθηση πτήσης.',
            ],
            bullets: [
              'Αεροδρόμιο Λάρνακας (LCA) ↔ Λεμεσός: €75 ημέρα (€85 νύχτα 23:00–07:00)',
              'Αεροδρόμιο Πάφου (PFO) ↔ Λεμεσός: €75 ημέρα (€85 νύχτα 23:00–07:00)',
              'LCA ↔ Πάφος / PFO: €135–€140 σταθερά μέσω A5, A1 και A6',
              'Κράτηση με επιστροφή = αυτόματη έκπτωση -10% στο σύνολο',
            ],
          },
          {
            heading: '2. Νυχτερινός Κανόνας (+€10), Προκαταβολή €20 & Ζώνες Εξυπηρέτησης',
            paragraphs: [
              'Η νυχτερινή επιβάρυνση είναι σταθερή +€10 ανά όχημα αυστηρά μεταξύ 23:00 και 07:00. Η κράτηση γίνεται online με €20 προκαταβολή Stripe και εξόφληση στον οδηγό.',
              'Με έδρα τη Λεμεσό (The Oval, Krinou 3), καλύπτουμε Λεμεσό, δυτική Κύπρο από LCA και ανατολική/Λευκωσία από PFO—χωρίς σύντομες τοπικές διαδρομές εντός Λάρνακας ή Πάφου.',
            ],
          },
        ],
        fareTableTitle: 'Ενδεικτικός Πίνακας Σταθερών Τιμών 2026 (έως 4 επιβάτες)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'A5 → A1 (~50 λεπτά, 67 χλμ)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'B6 → A6 (~45 λεπτά, 63 χλμ)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5 → A1 → A6 (~90 λεπτά, 130 χλμ)' },
          { routeSlug: 'larnaca-airport-to-paphos-airport', highwayNote: 'A5 → A1 → A6 (~85 λεπτά, 127 χλμ)' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 → A1 (~105 λεπτά, 143 χλμ)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6 → A1 → A5 → A3 (~125 λεπτά, 175 χλμ)' },
        ],
        conclusionTitle: 'Κλειδώστε τη Σταθερή Τιμή σας για το 2026',
        conclusion:
          'Αποφύγετε ουρές και βραδινό Τιμολόγιο 2. Κάντε κράτηση με €20 προκαταβολή και έκπτωση -10% με επιστροφή.',
        ctaLabel: 'Υπολογισμός & Κράτηση Τιμής',
        ctaHrefSlug: 'larnaca-airport-to-limassol',
        faqsTitle: 'Συχνές Ερωτήσεις Τιμών 2026',
        faqs: [
          {
            q: 'Οι τιμές €75–€190 είναι ανά άτομο ή ανά αυτοκίνητο;',
            a: 'Πάντα ανά ιδιωτικό σεντάν για έως 4 επιβάτες και 3 μεγάλες βαλίτσες.',
          },
          {
            q: 'Πότε ξεκινά η νυχτερινή χρέωση;',
            a: 'Στις μεταφορές μας +€10 ισχύει μόνο 23:00–07:00, ενώ τα ταξί δρόμου χρεώνουν νυχτερινό από τις 20:30.',
          },
          {
            q: 'Υπάρχουν διόδια ή έξτρα χρέωση αποσκευών;',
            a: 'Όχι, οι αυτοκινητόδρομοι στην Κύπρο είναι δωρεάν και οι αποσκευές με παιδικά καθίσματα περιλαμβάνονται.',
          },
          {
            q: 'Πώς παίρνω έκπτωση 10% στην επιστροφή;',
            a: 'Επιλέξτε Μετ’ επιστροφής στον υπολογιστή τιμής για αυτόματη έκπτωση.',
          },
        ],
      },
      it: {
        title: 'Prezzi Taxi e Transfer Aeroporto Cipro 2026: Guida alle Tariffe Fisse',
        seoTitle: 'Prezzi Taxi & Transfer Cipro 2026 | Guida Tariffe Fisse EUR',
        metaDescription:
          'Listino prezzi 2026 per transfer da Larnaca LCA (€75–€180) e Paphos PFO (€75–€190). Confronto tassametro Tariffa 1/2 vs berlina fissa, supplemento notte +€10 e -10% A/R.',
        excerpt:
          'Come funziona il tassametro a Cipro nel 2026 e perché conviene prenotare una berlina privata a prezzo fisso da Larnaca (LCA), Paphos (PFO) e Limassol.',
        focusKeywords: [
          'prezzi taxi Cipro 2026',
          'costo transfer aeroporto Larnaca',
          'taxi Paphos Limassol prezzo',
          'tariffa fissa transfer Cipro',
        ],
        intro:
          'Salire su un taxi a tassametro appena atterrati a Larnaca o Paphos può riservare sorprese: già alle 20:30 scatta la Tariffa 2 notturna più supplementi per bagagli e attesa. Prenotare una berlina privata blocca invece il prezzo finale in euro prima di partire.',
        sections: [
          {
            heading: '1. Tassametro aeroportuale vs tariffa fissa garantita per berlina',
            paragraphs: [
              'Alle piazzole di LCA e PFO, traffico sulla tangenziale di Limassol o atterraggi serali dopo le 20:30 aumentano sensibilmente il conto.',
              'Con le nostre Mercedes Classe E, Opel Insignia e Toyota Camry paghi una quota fissa ad auto (fino a 4 passeggeri e 3 valigie) con cartello in sala arrivi e monitoraggio volo.',
            ],
            bullets: [
              'Aeroporto Larnaca (LCA) ↔ Limassol: €75 giorno (€85 notte 23:00–07:00)',
              'Aeroporto Paphos (PFO) ↔ Limassol: €75 giorno (€85 notte 23:00–07:00)',
              'LCA ↔ Paphos / PFO: €135–€140 fissi sulle autostrade A5, A1 e A6',
              'Prenotazione andata e ritorno = sconto automatico del 10%',
            ],
          },
          {
            heading: '2. Regola notturna (+€10), acconto €20 Stripe e aree coperte',
            paragraphs: [
              'Il supplemento notturno è fisso a +€10 per veicolo solo tra le 23:00 e le 07:00. Si conferma con €20 su Stripe online e il saldo si versa all’autista.',
              'Dalla base di Limassol (The Oval, Krinou 3) copriamo Limassol, la costa ovest da LCA e l’est / Nicosia da PFO, evitando brevi corse locali dentro Larnaca o Paphos.',
            ],
          },
        ],
        fareTableTitle: 'Tabella Tariffe Fisse 2026 per Berlina (fino a 4 passeggeri)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'A5 → A1 (~50 min, 67 km)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'B6 → A6 (~45 min, 63 km)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'A5 → A1 → A6 (~90 min, 130 km)' },
          { routeSlug: 'larnaca-airport-to-paphos-airport', highwayNote: 'A5 → A1 → A6 (~85 min, 127 km)' },
          { routeSlug: 'paphos-airport-to-nicosia', highwayNote: 'A6 → A1 (~105 min, 143 km)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'A6 → A1 → A5 → A3 (~125 min, 175 km)' },
        ],
        conclusionTitle: 'Blocca il Tuo Prezzo Fisso 2026 Prima del Volo',
        conclusion:
          'Evita code e Tariffa 2 serale: prenota con €20 di acconto, volo monitorato e -10% su andata e ritorno.',
        ctaLabel: 'Calcola e Prenota Tariffa Fissa',
        ctaHrefSlug: 'larnaca-airport-to-limassol',
        faqsTitle: 'FAQ sui Prezzi Transfer Cipro 2026',
        faqs: [
          {
            q: 'I prezzi €75–€190 sono a persona o per auto?',
            a: 'Sempre per berlina privata fino a 4 passeggeri e 3 valigie grandi.',
          },
          {
            q: 'Quando scatta il supplemento notturno?',
            a: 'Solo +€10 fissi dalle 23:00 alle 07:00, mentre i taxi a tassametro passano a Tariffa 2 già alle 20:30.',
          },
          {
            q: 'Ci sono pedaggi autostradali o extra bagagli?',
            a: 'Nessun pedaggio sulle autostrade cipriote; bagagli standard e seggiolini sono inclusi.',
          },
          {
            q: 'Come ottengo lo sconto 10% sul ritorno?',
            a: 'Seleziona Andata e Ritorno nel calcolatore per applicare subito il -10%.',
          },
        ],
      },
    },
  },
  {
    id: 'flagship-5',
    slug: 'larnaca-vs-paphos-airport-which-to-choose',
    date: '2026-11-24',
    image: '/images/larnaca-route.webp',
    locales: {
      en: {
        title: 'Larnaca (LCA) vs Paphos (PFO) Airport: Which Should You Fly Into?',
        seoTitle: 'Larnaca vs Paphos Airport: Driving Times, Transfer Prices & Best Choice',
        metaDescription:
          'Compare Larnaca (LCA) vs Paphos (PFO) airports for Limassol, Paphos, Ayia Napa & Nicosia: exact highway times, fixed €75–€190 transfer prices, and flight arrival tips.',
        excerpt:
          'Not sure whether to book flights to Larnaca (LCA) or Paphos (PFO)? Compare transfer distances, highway times, and fixed sedan prices to every major Cyprus resort.',
        focusKeywords: [
          'Larnaca vs Paphos airport',
          'best airport for Limassol Cyprus',
          'LCA vs PFO transfer cost',
          'Paphos or Larnaca for holiday',
        ],
        intro:
          'Cyprus has two international gateways along its southern coast: Larnaca Airport (LCA) on the eastern side and Paphos Airport (PFO) in the west. Choosing the right terminal cuts highway driving time by up to 90 minutes and lowers your private transfer cost significantly—especially for families landing late.',
        sections: [
          {
            heading: '1. Quick Winner by Destination: Limassol, Paphos, Nicosia & East Coast',
            paragraphs: [
              'If your hotel or office is in Limassol, both airports work remarkably well! PFO sits 63 km west (45 minutes along the B6 and A6 past Aphrodite’s Rock), while LCA sits 67 km east (50 minutes via the A5 and A1)—and both cost the exact same fixed €75 daytime sedan tariff.',
              'For Paphos, Coral Bay, Peyia, or Polis resorts, flying directly into PFO saves over an hour compared to landing at LCA (€135–€180 cross-island transfer). Conversely, LCA is far closer to Nicosia and Ayia Napa / Protaras (€180–€190 when coming from PFO).',
            ],
            bullets: [
              'Limassol Marina, Germasogeia & Agios Tychonas: Tie! €75 from either LCA or PFO (45–50 min)',
              'Paphos, Coral Bay, Peyia & Polis: Fly into PFO; or pre-book direct LCA highway transfer (€135–€180)',
              'Nicosia, Larnaca City, Ayia Napa & Protaras: Fly into LCA whenever flight times match',
              'Multi-flight groups split across airports: we connect LCA ↔ PFO directly for €140 fixed',
            ],
          },
          {
            heading: '2. Flight Schedules, Airlines & Late-Night Arrivals',
            paragraphs: [
              'Larnaca Airport (LCA) operates round-the-clock scheduled legacy carriers and year-round hubs across Europe and the Middle East, whereas Paphos (PFO) shines for seasonal direct holiday charters and Ryanair/EasyJet routes into western Cyprus.',
              'Even if the cheapest airline ticket forces you to land at the opposite end of the island, a nonstop private transfer avoids waiting 2 hours for coastal shuttle buses and takes you door-to-door along toll-free motorways.',
            ],
          },
        ],
        fareTableTitle: 'LCA vs PFO Fixed Private Transfer Comparison (2026)',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'LCA → Limassol (50 min, 67 km)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'PFO → Limassol (45 min, 63 km)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'LCA → Paphos Town (90 min, 130 km)' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'PFO → Larnaca City (85 min, 127 km)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'LCA → Coral Bay (100 min, 142 km)' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'PFO → Protaras (135 min, 185 km)' },
        ],
        conclusionTitle: 'Book the Best Flight & Pair It with a Direct Transfer',
        conclusion:
          'Whichever runway works best for your airline schedule, reserve a private sedan to bridge LCA or PFO smoothly to your hotel or villa.',
        ctaLabel: 'Compare Routes & Reserve Online',
        ctaHrefSlug: 'larnaca-airport-to-paphos',
        faqsTitle: 'LCA vs PFO Airport FAQ',
        faqs: [
          {
            q: 'Which airport is closer to Limassol—Larnaca or Paphos?',
            a: 'They are nearly equidistant: Paphos Airport (63 km, ~45 min) and Larnaca Airport (67 km, ~50 min), both at a fixed €75 daytime sedan fare.',
          },
          {
            q: 'What if I fly into Larnaca (LCA) for a hotel in Paphos or Coral Bay?',
            a: 'We operate direct nonstop sedans from LCA to Paphos (€135), Coral Bay (€150), Peyia (€160), and Polis (€180) with zero bus changes.',
          },
          {
            q: 'Do you drive between Larnaca Airport and Paphos Airport directly?',
            a: 'Yes—LCA ↔ PFO transfers run 24/7 for €140 fixed daytime (~85 min, 127 km).',
          },
          {
            q: 'Which airport has fewer night delays on public transport?',
            a: 'Public intercity buses drop sharply after evening hours at both airports, making pre-booked transfers essential between 22:00 and 07:00 (+€10 flat night rate).',
          },
        ],
      },
      ru: {
        title: 'Аэропорт Ларнака (LCA) или Пафос (PFO): куда выгоднее лететь?',
        seoTitle: 'Ларнака или Пафос: какой аэропорт Кипра выбрать и стоимость трансфера',
        metaDescription:
          'Сравнение аэропортов Ларнака (LCA) и Пафос (PFO) для поездок в Лимассол, Пафос, Айя-Напу и Никосию: время в пути, цены €75–€190 и советы при ночных рейсах.',
        excerpt:
          'Разбираем, в какой аэропорт Кипра лучше брать билеты—LCA или PFO—исходя из вашего курорта, времени дороги по трассе и фиксированных цен трансфера.',
        focusKeywords: [
          'Ларнака или Пафос какой аэропорт лучше',
          'ближайший аэропорт к Лимассолу',
          'трансфер Ларнака Пафос цена',
        ],
        intro:
          'На юге Кипра работают два международных аэропорта: Ларнака (LCA) ближе к востоку и Пафос (PFO) на западе. Правильный выбор терминала экономит до 1,5 часов дороги и делает трансфер заметно дешевле.',
        sections: [
          {
            heading: '1. Лучший выбор под каждый курорт Кипра',
            paragraphs: [
              'Для Лимассола подходят оба аэропорта практически одинаково: от Пафоса 63 км (~45 мин по B6 и A6 мимо Петра-ту-Ромиу), от Ларнаки 67 км (~50 мин по A5 и A1). Дневной тариф до Лимассола из обоих равен €75.',
              'Для Пафоса, Корал-Бэй, Пейи и Полиса удобнее прилетать в PFO (трансфер из Ларнаки займёт 90–120 мин и €135–€180). Для Айя-Напы, Протараса и Никосии логичнее выбирать LCA (дорога из PFO стоит €150–€190).',
            ],
            bullets: [
              'Лимассол: ничья — ровно €75 и 45–50 минут как от LCA, так и от PFO',
              'Запад (Пафос, Корал-Бэй, Полис): ближе PFO, но из LCA везём без пересадок (€135–€180)',
              'Восток и центр (Никосия, Айя-Напа, Протарас): ближе LCA',
              'Прямая стыковка между терминалами LCA ↔ PFO: €140 за седан',
            ],
          },
          {
            heading: '2. Когда билеты дешевле в «дальний» аэропорт',
            paragraphs: [
              'Часто разница в цене авиабилетов или удобство прямого рейса заставляют лететь в Ларнаку с отелем в Пафосе (или наоборот). В этом случае частный седан по скоростной бесплатной магистрали избавляет от утомительных пересадок на автобусах Kapnos.',
              'Даже при ночном прилёте доплата фиксированная (+€10 с 23:00 до 07:00), а встреча в зале прилёта работает круглосуточно.',
            ],
          },
        ],
        fareTableTitle: 'Сравнение расстояния и тарифов LCA и PFO',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'LCA → Лимассол (50 мин, 67 км)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'PFO → Лимассол (45 мин, 63 км)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'LCA → Пафос (90 мин, 130 км)' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'PFO → Ларнака (85 мин, 127 км)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'LCA → Корал-Бэй (100 мин, 142 км)' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'PFO → Протарас (135 мин, 185 км)' },
        ],
        conclusionTitle: 'Летите удобным рейсом—дорогу берём на себя',
        conclusion:
          'Какой бы аэропорт вы ни выбрали, прямой фиксированный трансфер довезёт до отеля без ожидания автобуса и переплат.',
        ctaLabel: 'Выбрать маршрут и узнать цену',
        ctaHrefSlug: 'larnaca-airport-to-paphos',
        faqsTitle: 'Частые вопросы: Ларнака vs Пафос',
        faqs: [
          {
            q: 'Какой аэропорт ближе к Лимассолу?',
            a: 'Оба почти на одном расстоянии: Пафос ~45 мин (63 км), Ларнака ~50 мин (67 км). Цена одинаковая — €75 днём.',
          },
          {
            q: 'Везёте ли вы из аэропорта Ларнаки в Пафос, Корал-Бэй и Полис?',
            a: 'Да, прямые индивидуальные трансферы 24/7: Пафос €135, Корал-Бэй €150, Пейя €160, Полис €180.',
          },
          {
            q: 'Есть ли прямой трансфер между аэропортами LCA и PFO?',
            a: 'Да, фиксированная цена €140 днём, время в пути около 85 минут (127 км).',
          },
          {
            q: 'Ходят ли автобусы между аэропортами ночью?',
            a: 'Ночью между LCA и PFO прямых автобусов нет—надёжнее заранее забронировать седан (+€10 с 23:00 до 07:00).',
          },
        ],
      },
      de: {
        title: 'Flughafen Larnaca (LCA) vs. Paphos (PFO): Welcher ist besser für Ihren Urlaub?',
        seoTitle: 'Larnaca oder Paphos Flughafen? Fahrtzeiten & Transferpreise im Vergleich',
        metaDescription:
          'LCA vs. PFO für Limassol, Paphos, Ayia Napa & Nikosia: Fahrzeiten, direkte Transferpreise (€75–€190) und Entscheidungshilfe bei günstigen Flugzeiten.',
        excerpt:
          'Welcher Zielflughafen auf Zypern passt am besten zu Ihrem Hotel? Alle Distanzen, Autobahnen und Festpreise von Larnaca (LCA) und Paphos (PFO).',
        focusKeywords: [
          'Larnaca oder Paphos Flughafen',
          'Flughafen für Limassol Zypern',
          'Transfer LCA vs PFO Kosten',
        ],
        intro:
          'Auf Zypern landen die meisten Flüge entweder im Osten in Larnaca (LCA) oder im Westen in Paphos (PFO). Je nach Urlaubsort spart die passende Flughafenwahl bis zu 90 Minuten Autobahnfahrt.',
        sections: [
          {
            heading: '1. Welcher Flughafen passt zu welcher Region?',
            paragraphs: [
              'Für Limassol liegen beide Terminals ideal in der Mitte: Paphos liegt 63 km westlich (ca. 45 Min.), Larnaca 67 km östlich (ca. 50 Min.). Unser Festpreis nach Limassol beträgt ab beiden €75 am Tag.',
              'Nach Paphos, Coral Bay, Peyia oder Polis ist PFO am kürzesten (ab LCA €135–€180). Für Ayia Napa, Protaras oder Nikosia empfiehlt sich LCA (ab PFO €150–€190).',
            ],
            bullets: [
              'Limassol: Unentschieden! €75 und 45–50 Minuten ab LCA wie PFO',
              'Westküste (Paphos, Coral Bay, Polis): PFO kürzer; direkte LCA-Fahrt €135–€180',
              'Ostküste & Nikosia: LCA näher; direkte PFO-Fahrt €135–€190',
              'Direktverbindung zwischen beiden Terminals LCA ↔ PFO: €140 pauschal',
            ],
          },
          {
            heading: '2. Günstiger Flug in den anderen Flughafen?',
            paragraphs: [
              'Oft passen die Flugtage ab Deutschland oder Österreich besser zu Larnaca, obwohl das Resort bei Paphos liegt. Unsere Direkttransfers ohne Busumstieg bringen Sie durchgehend auf mautfreien Autobahnen direkt vor die Hoteltür.',
            ],
          },
        ],
        fareTableTitle: 'Direktvergleich: Fahrtzeit & Festpreis ab LCA und PFO',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'LCA → Limassol (50 Min., 67 km)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'PFO → Limassol (45 Min., 63 km)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'LCA → Paphos (90 Min., 130 km)' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'PFO → Larnaca (85 Min., 127 km)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'LCA → Coral Bay (100 Min., 142 km)' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'PFO → Protaras (135 Min., 185 km)' },
        ],
        conclusionTitle: 'Passende Verbindung direkt online reservieren',
        conclusion:
          'Wählen Sie die beste Flugverbindung—wir holen Sie in beiden Flughäfen pünktlich mit Festpreis-Garantie ab.',
        ctaLabel: 'Route prüfen & Transfer buchen',
        ctaHrefSlug: 'larnaca-airport-to-paphos',
        faqsTitle: 'FAQ: Larnaca vs. Paphos Flughafen',
        faqs: [
          {
            q: 'Welcher Flughafen liegt näher an Limassol?',
            a: 'Beide sind fast gleich weit entfernt: PFO ca. 45 Min. (63 km) und LCA ca. 50 Min. (67 km)—beide für €75.',
          },
          {
            q: 'Fahren Sie von Larnaca direkt nach Paphos oder Coral Bay?',
            a: 'Ja, rund um die Uhr nonstop für €135 (Paphos) bzw. €150 (Coral Bay).',
          },
          {
            q: 'Gibt es einen Direkttransfer zwischen LCA und PFO?',
            a: 'Ja, für feste €140 in rund 85 Minuten.',
          },
          {
            q: 'Fahren nachts Busse zwischen Ost- und Westküste?',
            a: 'Nachts gibt es keine direkten Busverbindungen; unser Nachttarif kostet nur +€10 (23:00–07:00).',
          },
        ],
      },
      pl: {
        title: 'Lotnisko Larnaka (LCA) czy Pafos (PFO): które wybrać na wakacje na Cyprze?',
        seoTitle: 'Larnaka czy Pafos: które lotnisko na Cyprze wybrać i ile kosztuje transfer',
        metaDescription:
          'Porównanie lotnisk Larnaka (LCA) i Pafos (PFO) dla Limassolu, Pafos, Ayia Napy i Nikozji: czasy przejazdu, stałe ceny €75–€190 i wskazówki dla nocnych lotów.',
        excerpt:
          'Sprawdź odległości, czas jazdy autostradą i stałe ceny transferów z lotnisk LCA i PFO do głównych kurortów Cypru.',
        focusKeywords: [
          'Larnaka czy Pafos lotnisko',
          'najbliższe lotnisko do Limassol',
          'transfer Larnaka Pafos cena',
        ],
        intro:
          'Wybór między Larnaką (LCA) na wschodzie a Pafos (PFO) na zachodzie wyspy potrafi skrócić dojazd do hotelu nawet o 90 minut. Sprawdź, które lotnisko najlepiej pasuje do Twojego regionu.',
        sections: [
          {
            heading: '1. Które lotnisko do jakiego kurortu?',
            paragraphs: [
              'Dla Limassolu oba lotniska są równie wygodne: z Pafos jedziesz 45 minut (63 km), z Larnaki 50 minut (67 km), a cena w obu kierunkach to dokładnie €75 w dzień.',
              'Do Pafos, Coral Bay i Polis krótsza droga prowadzi z PFO (z LCA €135–€180). Do Ayia Napy, Protaras i Nikozji bliżej z LCA (z PFO €150–€190).',
            ],
            bullets: [
              'Limassol: remis — €75 i 45–50 minut zarówno z LCA, jak i z PFO',
              'Zachód (Pafos, Coral Bay, Polis): bliżej PFO; z LCA jedziemy bez przesiadek (€135–€180)',
              'Wschód i stolica (Ayia Napa, Protaras, Nikozja): bliżej LCA',
              'Bezpośredni przejazd między lotniskami LCA ↔ PFO: €140 za sedan',
            ],
          },
          {
            heading: '2. Gdy tańsze bilety lecą na drugie lotnisko',
            paragraphs: [
              'Wiele lotów z Polski ląduje w Pafos lub Larnace niezależnie od lokalizacji hotelu. Bezpośredni prywatny transfer bezpłatnymi autostradami pozwala uniknąć przesiadek autobusowych, zwłaszcza późnym wieczorem (+€10 w nocy 23:00–07:00).',
            ],
          },
        ],
        fareTableTitle: 'Porównanie tras i stałych stawek LCA vs PFO',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'LCA → Limassol (50 min, 67 km)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'PFO → Limassol (45 min, 63 km)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'LCA → Pafos (90 min, 130 km)' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'PFO → Larnaka (85 min, 127 km)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'LCA → Coral Bay (100 min, 142 km)' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'PFO → Protaras (135 min, 185 km)' },
        ],
        conclusionTitle: 'Dobierz lot i zamów wygodny przejazd',
        conclusion:
          'Niezależnie od wybranego lotniska odbierzemy Cię bezpośrednio w hali przylotów z gwarancją stałej ceny.',
        ctaLabel: 'Sprawdź trasę i zarezerwuj',
        ctaHrefSlug: 'larnaca-airport-to-paphos',
        faqsTitle: 'Pytania o wybór lotniska LCA lub PFO',
        faqs: [
          {
            q: 'Które lotnisko jest bliżej Limassolu?',
            a: 'Pafos (63 km, ~45 min) i Larnaka (67 km, ~50 min) leżą niemal w równej odległości—oba kosztują €75.',
          },
          {
            q: 'Czy wozicie bezpośrednio z Larnaki do Pafos lub Coral Bay?',
            a: 'Tak, całą dobę bez przesiadek: Pafos €135, Coral Bay €150, Peyia €160, Polis €180.',
          },
          {
            q: 'Ile kosztuje transfer między lotniskami LCA i PFO?',
            a: 'Stała stawka dzienna wynosi €140 za cały sedan (około 85 minut jazdy).',
          },
          {
            q: 'Czy w nocy kursują autobusy między wschodem a zachodem?',
            a: 'Nie ma bezpośrednich kursów nocnych—prywatny przejazd kosztuje tylko +€10 w godzinach 23:00–07:00.',
          },
        ],
      },
      fr: {
        title: 'Aéroport de Larnaca (LCA) ou Paphos (PFO) : lequel choisir à Chypre ?',
        seoTitle: 'Larnaca vs Paphos Aéroport : temps de route et tarifs transferts',
        metaDescription:
          'Comparatif Larnaca (LCA) vs Paphos (PFO) pour Limassol, Paphos, Ayia Napa et Nicosie : durées autoroutières, prix fixes 75 €–190 € et conseils vols tardifs.',
        excerpt:
          'Quel aéroport choisir pour votre séjour à Chypre ? Comparez les distances, temps de parcours et tarifs fixes depuis LCA et PFO.',
        focusKeywords: [
          'aéroport Larnaca ou Paphos',
          'quel aéroport pour Limassol',
          'transfert LCA PFO tarif',
        ],
        intro:
          'Chypre compte deux aéroports au sud : Larnaca (LCA) à l’est et Paphos (PFO) à l’ouest. Choisir le bon terminal réduit le trajet routier jusqu’à 90 minutes.',
        sections: [
          {
            heading: '1. Le meilleur aéroport selon votre destination',
            paragraphs: [
              'Pour Limassol, les deux aéroports se valent : PFO est à 63 km (45 min) et LCA à 67 km (50 min), pour le même tarif fixe de 75 € en journée.',
              'Vers Paphos, Coral Bay, Peyia ou Polis, privilégiez PFO (ou réservez un transfert direct depuis LCA pour 135 €–180 €). Vers Ayia Napa, Protaras ou Nicosie, choisissez LCA.',
            ],
            bullets: [
              'Limassol : égalité parfaite — 75 € et 45–50 minutes depuis LCA ou PFO',
              'Côte ouest (Paphos, Coral Bay, Polis) : PFO plus proche ; direct depuis LCA à 135 €–180 €',
              'Côte est & Nicosie : LCA plus proche ; direct depuis PFO à 135 €–190 €',
              'Liaison directe entre terminaux LCA ↔ PFO : 140 € fixe',
            ],
          },
          {
            heading: '2. Quand le vol le moins cher arrive à l’autre bout de l’île',
            paragraphs: [
              'Si vos billets atterrissent à Larnaca pour un séjour à Paphos (ou inversement), notre berline directe évite les correspondances en navette et relie l’hôtel par autoroute gratuite, y compris de nuit (+10 € entre 23h00 et 07h00).',
            ],
          },
        ],
        fareTableTitle: 'Comparatif temps et tarifs fixes LCA vs PFO',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'LCA → Limassol (50 min, 67 km)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'PFO → Limassol (45 min, 63 km)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'LCA → Paphos (90 min, 130 km)' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'PFO → Larnaca (85 min, 127 km)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'LCA → Coral Bay (100 min, 142 km)' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'PFO → Protaras (135 min, 185 km)' },
        ],
        conclusionTitle: 'Reliez directement l’aéroport de votre choix',
        conclusion:
          'Quel que soit votre terminal d’atterrissage, réservez votre transfert porte-à-porte à tarif bloqué.',
        ctaLabel: 'Comparer et réserver',
        ctaHrefSlug: 'larnaca-airport-to-paphos',
        faqsTitle: 'FAQ : Larnaca vs Paphos',
        faqs: [
          {
            q: 'Quel aéroport est le plus proche de Limassol ?',
            a: 'Paphos (63 km, ~45 min) et Larnaca (67 km, ~50 min) sont quasi équidistants, tous deux à 75 €.',
          },
          {
            q: 'Assurez-vous des trajets directs LCA → Paphos ou Coral Bay ?',
            a: 'Oui 24h/24 sans escale : Paphos 135 €, Coral Bay 150 €, Peyia 160 €, Polis 180 €.',
          },
          {
            q: 'Proposez-vous un transfert direct entre LCA et PFO ?',
            a: 'Oui, à 140 € fixe en journée (~85 minutes pour 127 km).',
          },
          {
            q: 'Y a-t-il des bus directs la nuit entre les deux côtes ?',
            a: 'Non ; notre berline privée assure toute arrivée nocturne avec un forfait de +10 € (23h00–07h00).',
          },
        ],
      },
      el: {
        title: 'Αεροδρόμιο Λάρνακας (LCA) ή Πάφου (PFO): Ποιο να Επιλέξετε;',
        seoTitle: 'Λάρνακα vs Πάφος Αεροδρόμιο: Χρόνοι Οδήγησης & Τιμές Μεταφοράς',
        metaDescription:
          'Σύγκριση LCA και PFO για Λεμεσό, Πάφο, Αγία Νάπα & Λευκωσία: χρόνοι διαδρομής, σταθερές τιμές €75–€190 και επιλογές για νυχτερινές πτήσεις.',
        excerpt:
          'Ποιο αεροδρόμιο της Κύπρου συμφέρει ανάλογα με τον προορισμό σας; Δείτε αποστάσεις, αυτοκινητόδρομους και σταθερές τιμές.',
        focusKeywords: [
          'αεροδρόμιο Λάρνακας ή Πάφου',
          'πλησιέστερο αεροδρόμιο Λεμεσός',
          'μεταφορά LCA PFO τιμή',
        ],
        intro:
          'Η Κύπρος διαθέτει δύο διεθνή αεροδρόμια στο νότιο τμήμα της: τη Λάρνακα (LCA) ανατολικά και την Πάφο (PFO) δυτικά. Η σωστή επιλογή μειώνει τον χρόνο οδήγησης έως και 90 λεπτά.',
        sections: [
          {
            heading: '1. Καλύτερη Επιλογή ανά Προορισμό',
            paragraphs: [
              'Για τη Λεμεσό και τα δύο αεροδρόμια είναι σχεδόν ίδια: από Πάφο 63 χλμ (~45 λεπτά) και από Λάρνακα 67 χλμ (~50 λεπτά), με ίδια σταθερή τιμή €75.',
              'Για Πάφο, Coral Bay, Πέγεια και Πόλη επιλέξτε PFO (από LCA €135–€180). Για Αγία Νάπα, Πρωταρά ή Λευκωσία προτιμήστε LCA (από PFO €150–€190).',
            ],
            bullets: [
              'Λεμεσός: Ισοπαλία — €75 και 45–50 λεπτά από LCA ή PFO',
              'Δυτική Κύπρος (Πάφος, Coral Bay, Πόλη): πιο κοντά στο PFO, απευθείας από LCA €135–€180',
              'Ανατολή & Λευκωσία: πιο κοντά στο LCA, απευθείας από PFO €135–€190',
              'Απευθείας σύνδεση αεροδρομίων LCA ↔ PFO: €140 σταθερά',
            ],
          },
          {
            heading: '2. Όταν η Πτήση Φτάνει στο Άλλο Αεροδρόμιο',
            paragraphs: [
              'Όταν οι ώρες πτήσεων επιβάλλουν άφιξη στην αντίθετη πλευρά του νησιού, η απευθείας ιδιωτική μεταφορά αποφεύγει τις μετεπιβιβάσεις λεωφορείων, με σταθερό νυχτερινό +€10 (23:00–07:00).',
            ],
          },
        ],
        fareTableTitle: 'Σύγκριση Χρόνων & Τιμών LCA έναντι PFO',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'LCA → Λεμεσός (50 λεπτά, 67 χλμ)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'PFO → Λεμεσός (45 λεπτά, 63 χλμ)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'LCA → Πάφος (90 λεπτά, 130 χλμ)' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'PFO → Λάρνακα (85 λεπτά, 127 χλμ)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'LCA → Coral Bay (100 λεπτά, 142 χλμ)' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'PFO → Πρωταράς (135 λεπτά, 185 χλμ)' },
        ],
        conclusionTitle: 'Κλείστε Απευθείας Μεταφορά από Όποιο Αεροδρόμιο Φτάνετε',
        conclusion:
          'Όποια πύλη εισόδου κι αν επιλέξετε, ο οδηγός μας σάς περιμένει στις αφίξεις με σταθερή τιμή.',
        ctaLabel: 'Σύγκριση & Κράτηση Διαδρομής',
        ctaHrefSlug: 'larnaca-airport-to-paphos',
        faqsTitle: 'Ερωτήσεις: Λάρνακα ή Πάφος',
        faqs: [
          {
            q: 'Ποιο αεροδρόμιο είναι πιο κοντά στη Λεμεσό;',
            a: 'Και τα δύο απέχουν σχεδόν το ίδιο: Πάφος ~45 λεπτά (63 χλμ) και Λάρνακα ~50 λεπτά (67 χλμ) προς €75.',
          },
          {
            q: 'Εκτελείτε απευθείας δρομολόγια από LCA προς Πάφο και Coral Bay;',
            a: 'Ναι 24/7 χωρίς στάσεις: Πάφος €135, Coral Bay €150, Πέγεια €160, Πόλη €180.',
          },
          {
            q: 'Υπάρχει απευθείας μεταφορά μεταξύ LCA και PFO;',
            a: 'Ναι, σταθερά €140 σε περίπου 85 λεπτά (127 χλμ).',
          },
          {
            q: 'Υπάρχουν νυχτερινά λεωφορεία μεταξύ των δύο πλευρών;',
            a: 'Όχι απευθείας τη νύχτα· η προκράτηση σεντάν έχει μόνο +€10 χρέωση 23:00–07:00.',
          },
        ],
      },
      it: {
        title: 'Aeroporto di Larnaca (LCA) o Paphos (PFO): Quale Scegliere a Cipro?',
        seoTitle: 'Larnaca vs Paphos Aeroporto: Tempi di Guida e Prezzi Transfer',
        metaDescription:
          'Confronto Larnaca (LCA) vs Paphos (PFO) per Limassol, Paphos, Ayia Napa e Nicosia: tempi autostradali, tariffe fisse €75–€190 e consigli sui voli serali.',
        excerpt:
          'Meglio volare su Larnaca (LCA) o Paphos (PFO)? Confrontiamo distanze, tempi di guida e tariffe fisse per ogni località di Cipro.',
        focusKeywords: [
          'aeroporto Larnaca o Paphos',
          'miglior aeroporto per Limassol',
          'transfer LCA PFO prezzi',
        ],
        intro:
          'Cipro offre due scali internazionali a sud: Larnaca (LCA) a est e Paphos (PFO) a ovest. Scegliere lo scalo giusto fa risparmiare fino a 90 minuti di autostrada.',
        sections: [
          {
            heading: '1. Il Vincitore per Ogni Destinazione',
            paragraphs: [
              'Per Limassol entrambi gli aeroporti si equivalgono: PFO dista 63 km (45 min) e LCA 67 km (50 min), con tariffa identica di €75 di giorno.',
              'Per Paphos, Coral Bay, Peyia o Polis conviene atterrare a PFO (da LCA si spendono €135–€180). Per Ayia Napa, Protaras o Nicosia è più vicino LCA (da PFO €150–€190).',
            ],
            bullets: [
              'Limassol: parità assoluta — €75 e 45–50 minuti da LCA o PFO',
              'Costa ovest (Paphos, Coral Bay, Polis): più vicino PFO; diretto da LCA €135–€180',
              'Costa est e Nicosia: più vicino LCA; diretto da PFO €135–€190',
              'Collegamento diretto tra terminal LCA ↔ PFO: €140 fissi',
            ],
          },
          {
            heading: '2. Quando il Volo Conveniente Arriva sull’Altra Costa',
            paragraphs: [
              'Se i biglietti migliori atterrano all’estremità opposta, un transfer privato senza cambi in autobus porta dritti in hotel su autostrade senza pedaggi, anche di notte (+€10 dalle 23:00 alle 07:00).',
            ],
          },
        ],
        fareTableTitle: 'Confronto Tempi e Tariffe Fisse LCA vs PFO',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'LCA → Limassol (50 min, 67 km)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'PFO → Limassol (45 min, 63 km)' },
          { routeSlug: 'larnaca-airport-to-paphos', highwayNote: 'LCA → Paphos (90 min, 130 km)' },
          { routeSlug: 'paphos-airport-to-larnaca-city', highwayNote: 'PFO → Larnaca (85 min, 127 km)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'LCA → Coral Bay (100 min, 142 km)' },
          { routeSlug: 'paphos-airport-to-protaras', highwayNote: 'PFO → Protaras (135 min, 185 km)' },
        ],
        conclusionTitle: 'Prenota il Transfer Diretto dal Tuo Scalo',
        conclusion:
          'Qualunque aeroporto scelgano le compagnie aeree, ti aspettiamo agli arrivi con tariffa fissa garantita.',
        ctaLabel: 'Confronta Tratte e Prenota',
        ctaHrefSlug: 'larnaca-airport-to-paphos',
        faqsTitle: 'FAQ: Larnaca vs Paphos',
        faqs: [
          {
            q: 'Quale aeroporto è più vicino a Limassol?',
            a: 'Sono quasi equidistanti: Paphos ~45 min (63 km) e Larnaca ~50 min (67 km), entrambi a €75.',
          },
          {
            q: 'Effettuate tratte dirette da LCA a Paphos o Coral Bay?',
            a: 'Sì 24/7 senza soste: Paphos €135, Coral Bay €150, Peyia €160, Polis €180.',
          },
          {
            q: 'Quanto costa spostarsi direttamente tra LCA e PFO?',
            a: 'La tariffa fissa diurna è €140 per berlina (~85 minuti, 127 km).',
          },
          {
            q: 'Ci sono bus diretti notturni tra le due coste?',
            a: 'No: di notte conviene prenotare in anticipo la berlina (+€10 fisso tra le 23:00 e le 07:00).',
          },
        ],
      },
    },
  },
  {
    id: 'flagship-6',
    slug: 'cyprus-airport-transfer-with-kids-luggage-guide',
    date: '2026-11-24',
    image: '/images/paphos-route.webp',
    locales: {
      en: {
        title: 'Cyprus Airport Transfers with Kids & Heavy Luggage: Car Seats & Trunk Space',
        seoTitle: 'Cyprus Airport Transfer with Child Seats & Luggage | Practical Family Guide',
        metaDescription:
          'Traveling to Cyprus with children and suitcases? Free baby & booster seats, real sedan boot limits (up to 4 passengers & 3 suitcases), strollers & beach gear checklist.',
        excerpt:
          'Everything families need to know before booking a Cyprus airport taxi: child seat laws, real trunk measurements across our sedans, foldable buggies, and night arrival tips.',
        focusKeywords: [
          'Cyprus airport transfer with child seat',
          'taxi with baby seat Larnaca Paphos',
          'Cyprus transfer luggage capacity',
          'family transfer Limassol',
        ],
        intro:
          'Flying to Cyprus with toddlers, car seats, strollers, and family suitcases makes standing in a sunny outdoor rank queue—or waiting at an airport bus curb—exhausting. Before you book, verify exact seating rules and realistic sedan trunk limits so everything fits smoothly at pickup.',
        sections: [
          {
            heading: '1. Free Child Seats & Cyprus Booster Regulations',
            paragraphs: [
              'Cyprus road safety rules require age-appropriate child restraints for young passengers. Street rank taxis rarely carry clean rear-facing baby seats or ISOFIX-ready boosters on standby without prior arrangement.',
              'When booking with us, specify your children’s ages or weight in the notes field—we provide appropriate baby seats or booster cushions free of charge and pre-install them before meeting you in the Arrivals Hall.',
            ],
            bullets: [
              'Infant & child seats (0–4 yrs) and high/low boosters (4–11 yrs) included at €0 extra',
              'Driver meets you right past baggage claim—no hauling luggage across outdoor parking lots',
              'Complimentary flight delay monitoring if family connections run late',
              'Direct climate-controlled door-to-door drop at hotel lobby or private villa gate',
            ],
          },
          {
            heading: '2. Honest Sedan Capacity: Up to 4 Passengers & 3 Large Suitcases',
            paragraphs: [
              'Our executive fleet consists of spacious Mercedes E-Class, Opel Insignia, and Toyota Camry sedans. Each sedan safely seats up to 4 passengers plus 3 standard large suitcases (up to 23 kg) and cabin backpacks.',
              'Compact umbrella strollers or travel buggies typically slide next to the 3 suitcases; if you are traveling with oversized double prams, hard bike boxes, kitesurfing bags, or 4+ full-size trunks, message us on WhatsApp (+357 96 867289) before booking so we verify exact boot clearance.',
            ],
          },
        ],
        fareTableTitle: 'Popular Fixed-Price Family Routes Across Cyprus',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Family resorts in Limassol (€75, 50 min)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Short hop from PFO to Limassol (€75, 45 min)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'Direct family villas in Coral Bay (€150, 100 min)' },
          { routeSlug: 'larnaca-airport-to-polis', highwayNote: 'Peaceful Latchi & Polis stays (€180, 120 min)' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'Family beaches & WaterWorld (€115, 75 min)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'Nonstop PFO → Ayia Napa (€180, 125 min)' },
        ],
        conclusionTitle: 'Stress-Free Family Arrival from Plane to Villa',
        conclusion:
          'Add your child seat request when reserving, pay just €20 Stripe deposit, and step straight into a cool pre-fitted sedan at LCA or PFO.',
        ctaLabel: 'Book Family Transfer with Child Seat',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'Family & Luggage Transfer FAQ',
        faqs: [
          {
            q: 'Do you charge extra for baby or booster seats?',
            a: 'No—child and booster seats are completely free when requested during online booking.',
          },
          {
            q: 'How many suitcases fit in your sedans?',
            a: 'Up to 3 standard large suitcases plus hand luggage, alongside up to 4 passengers.',
          },
          {
            q: 'Can we fit a foldable baby stroller in the trunk?',
            a: 'Yes, compact foldable strollers fit easily alongside family suitcases; please mention wide double buggies beforehand.',
          },
          {
            q: 'What if our flight with kids arrives after midnight?',
            a: 'Your driver tracks your flight number automatically and meets you inside the Arrivals Hall (+€10 flat night fee applies 23:00–07:00).',
          },
        ],
      },
      ru: {
        title: 'Трансфер на Кипре с детьми и багажом: автокресла и вместимость салона',
        seoTitle: 'Трансфер на Кипре с детским креслом и багажом | Памятка для семьи',
        metaDescription:
          'Перелёт на Кипр с детьми и чемоданами: бесплатные автокресла и бустеры, реальная вместимость седана (до 4 пассажиров и 3 чемоданов), коляски и ночные рейсы.',
        excerpt:
          'Всё о поездке с детьми из аэропортов Ларнаки (LCA) и Пафоса (PFO): бесплатные детские кресла, объём багажника, провоз колясок и встреча в зале прилёта.',
        focusKeywords: [
          'трансфер Кипр детское кресло',
          'такси аэропорт Ларнака с ребенком',
          'вместимость багажа трансфер Кипр',
        ],
        intro:
          'Путешествие с детьми, чемоданами и коляской делает ожидание на солнце у остановки или в очереди на такси утомительным. Заранее уточните правила перевозки детей и реальный объём багажника, чтобы посадка в машину прошла за 2 минуты.',
        sections: [
          {
            heading: '1. Бесплатные детские кресла и бустеры по закону Кипра',
            paragraphs: [
              'На Кипре дети обязаны ехать в удерживающем кресле или бустере по возрасту и росту. Случайные машины у терминала почти никогда не возят с собой подходящее кресло для малышей.',
              'При бронировании у нас просто укажите возраст ребёнка в комментарии—водитель заранее установит чистое автокресло или бустер совершенно бесплатно и встретит вас с табличкой сразу после выдачи багажа.',
            ],
            bullets: [
              'Автокресла (0–4 года) и бустеры (4–11 лет) предоставляются бесплатно (€0)',
              'Встреча с табличкой в кондиционированном зале прилёта, помощь с тележкой',
              'Бесплатное отслеживание рейса при задержке вылета',
              'Доставка прямо к ресепшн отеля или воротам виллы',
            ],
          },
          {
            heading: '2. Честная вместимость седана: до 4 человек и 3 чемодана',
            paragraphs: [
              'Наш парк—бизнес-седаны Mercedes E-Class, Opel Insignia и Toyota Camry. Багажник рассчитан на 3 крупных чемодана (до 23 кг каждый) плюс ручную кладь в салоне, при посадке до 4 пассажиров.',
              'Складная прогулочная коляска легко помещается поверх чемоданов; если у вас двойная коляска, велочехол или более 3 больших чемоданов, напишите в WhatsApp (+357 96 867289) до оплаты, чтобы мы подтвердили размещение.',
            ],
          },
        ],
        fareTableTitle: 'Популярные семейные маршруты по фиксированной цене',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Отели Лимассола из LCA (€75, 50 мин)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Быстрый путь из PFO в Лимассол (€75, 45 мин)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'Виллы в Корал-Бэй (€150, 100 мин)' },
          { routeSlug: 'larnaca-airport-to-polis', highwayNote: 'Семейный отдых в Полисе (€180, 120 мин)' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'Пляжи и аквапарк Айя-Напы (€115, 75 мин)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'Прямой переезд PFO → Айя-Напа (€180, 125 мин)' },
        ],
        conclusionTitle: 'Спокойное начало отпуска с детьми',
        conclusion:
          'Укажите нужное автокресло в форме заказа, внесите депозит €20 и садитесь сразу в охлаждённый салон без очереди.',
        ctaLabel: 'Заказать трансфер с креслом',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'Вопросы семей о багаже и креслах',
        faqs: [
          {
            q: 'Нужно ли доплачивать за детское кресло или бустер?',
            a: 'Нет, автокресла и бустеры предоставляются бесплатно при указании в заказе.',
          },
          {
            q: 'Сколько чемоданов реально входит в седан?',
            a: 'До 3 стандартных крупных чемоданов и ручная кладь для группы до 4 пассажиров.',
          },
          {
            q: 'Поместится ли детская коляска?',
            a: 'Да, компактная складная коляска входит вместе с чемоданами; о больших колясках для двойни лучше предупредить заранее.',
          },
          {
            q: 'Что если ночной рейс с ребёнком задержится?',
            a: 'Мы отслеживаем рейс по номеру и ждём бесплатно; с 23:00 до 07:00 действует плоская ночная доплата +€10.',
          },
        ],
      },
      de: {
        title: 'Zypern Flughafentransfer mit Kindern & viel Gepäck: Kindersitze & Kofferraum',
        seoTitle: 'Zypern Transfer mit Kindersitz & Gepäck | Familien-Ratgeber',
        metaDescription:
          'Familienurlaub auf Zypern: kostenlose Baby- & Kindersitze, reale Limousinen-Kapazität (bis 4 Personen & 3 Koffer), Buggy-Checkliste und Nachtankunft.',
        excerpt:
          'Worauf Familien bei der Transfer-Buchung ab LCA und PFO achten sollten: kostenlose Kindersitze, echte Kofferraummaße und entspannte Ankunft.',
        focusKeywords: [
          'Zypern Flughafentransfer Kindersitz',
          'Taxi Larnaca Babyschale',
          'Zypern Transfer Gepäck Koffer',
        ],
        intro:
          'Mit Kindern, Kofferwagen und Buggy am Flughafen in der Taxi-Schlange zu warten, kostet unnötig Nerven. Prüfen Sie vorab Kindersitz-Optionen und Kofferraumgröße, damit am Ankunftstor alles reibungslos klappt.',
        sections: [
          {
            heading: '1. Kostenlose Baby- und Kindersitze inklusive',
            paragraphs: [
              'Auf Zypern gilt die Kindersitzpflicht—spontane Flughafentaxis haben passende Schalen oder Sitzerhöhungen jedoch selten griffbereit.',
              'Geben Sie bei der Online-Buchung einfach das Alter der Kinder an: Wir stellen Baby- und Kindersitze kostenlos (€0) und montieren sie vorab vor der Abholung in der Ankunftshalle.',
            ],
            bullets: [
              'Babyschalen (0–4 Jahre) und Sitzerhöhungen (4–11 Jahre) gratis enthalten',
              'Persönlicher Empfang direkt nach der Gepäckausgabe mit Namensschild',
              'Automatische Flugverfolgung bei Verspätungen ohne Aufpreis',
              'Klimatisierte Fahrt direkt bis vor Hotelrezeption oder Villentor',
            ],
          },
          {
            heading: '2. Ehrliche Kofferraum-Kapazität: bis 4 Fahrgäste & 3 Koffer',
            paragraphs: [
              'Unsere Mercedes E-Klasse, Opel Insignia und Toyota Camry Limousinen bieten Platz für maximal 4 Personen, 3 große Hartschalenkoffer (bis 23 kg) und Handgepäck.',
              'Ein zusammenklappbarer Reisebuggy findet problemlos Platz; bei Zwillingswagen, Fahrradkoffern oder Übergepäck schreiben Sie uns bitte kurz vorab per WhatsApp (+357 96 867289).',
            ],
          },
        ],
        fareTableTitle: 'Beliebte Familien-Strecken mit Festpreis',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Familienhotels in Limassol (€75, 50 Min.)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Kurze Fahrt PFO → Limassol (€75, 45 Min.)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'Villen in Coral Bay (€150, 100 Min.)' },
          { routeSlug: 'larnaca-airport-to-polis', highwayNote: 'Ruhiger Urlaub in Polis (€180, 120 Min.)' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'Strände & WaterWorld (€115, 75 Min.)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'Nonstop PFO → Ayia Napa (€180, 125 Min.)' },
        ],
        conclusionTitle: 'Entspannt vom Gate bis ans Urlaubsziel',
        conclusion:
          'Wählen Sie im Buchungsformular den gewünschten Kindersitz aus, leisten €20 Anzahlung und starten sofort gekühlt in den Urlaub.',
        ctaLabel: 'Familientransfer mit Kindersitz buchen',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'FAQ für Familien & Gepäck',
        faqs: [
          {
            q: 'Kosten Baby- oder Kindersitze extra?',
            a: 'Nein, bei Voranmeldung im Buchungsformular sind sie komplett kostenlos.',
          },
          {
            q: 'Wie viel Gepäck passt in eine Limousine?',
            a: 'Bis zu 3 große Koffer plus Handgepäck für maximal 4 Passagiere.',
          },
          {
            q: 'Passt ein faltbarer Buggy zusätzlich hinein?',
            a: 'Ja, ein kompakter Reisebuggy passt neben den Koffern hinein; bei Doppelwagen fragen Sie uns bitte vorab.',
          },
          {
            q: 'Was passiert bei späten Familienflügen nach 23 Uhr?',
            a: 'Wir warten bei jeder Verspätung gratis mit Namensschild; zwischen 23:00 und 07:00 fällt pauschal +€10 Nachtgebühr an.',
          },
        ],
      },
      pl: {
        title: 'Transfer z lotniska na Cyprze z dziećmi i bagażem: foteliki i pojemność',
        seoTitle: 'Transfer Cypr z Fotelikiem Dziecięcym i Bagażem | Poradnik Rodzinny',
        metaDescription:
          'Podróż na Cypr z dziećmi: bezpłatne foteliki i podkładki, realna pojemność sedana (do 4 pasażerów i 3 walizek), wózki i odbiór nocny.',
        excerpt:
          'Praktyczny przewodnik dla rodzin lądujących w Larnace (LCA) i Pafos (PFO): darmowe foteliki, limit bagażnika i szybki odbiór z hali przylotów.',
        focusKeywords: [
          'transfer Cypr fotelik dziecięcy',
          'taxi lotnisko Larnaka z dzieckiem',
          'bagaż transfer Cypr walizki',
        ],
        intro:
          'Podróż z małymi dziećmi, walizkami i wózkiem wymaga pewnego transportu od razu po przylocie. Sprawdź bezpłatne opcje fotelików i rzeczywistą przestrzeń naszych sedanów przed rezerwacją.',
        sections: [
          {
            heading: '1. Darmowe foteliki i podkładki zgodnie z prawem Cypru',
            paragraphs: [
              'Na Cyprze dzieci muszą podróżować w fotelikach dobranych do wagi i wzrostu, czego zwykłe taksówki na postoju często nie zapewniają od ręki.',
              'Wpisz wiek dziecka w uwagach do rezerwacji—kierowca bezpłatnie zamontuje czysty fotelik lub podstawkę jeszcze przed wyjściem z hali przylotów.',
            ],
            bullets: [
              'Foteliki (0–4 lata) i podstawki (4–11 lat) zawsze w cenie (€0)',
              'Odbiór imienny w klimatyzowanym terminalu bez dźwigania bagaży na parking',
              'Darmowe monitorowanie opóźnień lotu',
              'Dowóz pod same drzwi hotelu lub bramy willi',
            ],
          },
          {
            heading: '2. Uczciwy limit auta: do 4 osób i 3 duże walizki',
            paragraphs: [
              'Flota (Mercedes E-Class, Opel Insignia, Toyota Camry) mieści komfortowo do 4 pasażerów, 3 duże walizki rejestrowane i plecaki podręczne.',
              'Składana spacerówka parasolka mieści się obok bagażu; w przypadku wózka podwójnego lub sprzętu sportowego napisz na WhatsApp (+357 96 867289) przed opłatą.',
            ],
          },
        ],
        fareTableTitle: 'Popularne rodzinne trasy w stałej cenie',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Rodzinne hotele Limassol (€75, 50 min)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Szybki dojazd PFO → Limassol (€75, 45 min)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'Wille Coral Bay z LCA (€150, 100 min)' },
          { routeSlug: 'larnaca-airport-to-polis', highwayNote: 'Spokojny wypoczynek Polis (€180, 120 min)' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'Plaże i park wodny Ayia Napa (€115, 75 min)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'Bez przesiadek PFO → Ayia Napa (€180, 125 min)' },
        ],
        conclusionTitle: 'Spokojny początek rodzinnych wakacji',
        conclusion:
          'Podaj wiek dzieci przy rezerwacji, wpłać €20 zaliczki i wsiądź bezpośrednio do schłodzonego auta.',
        ctaLabel: 'Zamów transfer z fotelikiem',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'FAQ dla rodzin z dziećmi',
        faqs: [
          {
            q: 'Czy fotelik dziecięcy jest dodatkowo płatny?',
            a: 'Nie, foteliki i podkładki są w 100% bezpłatne po zgłoszeniu w formularzu.',
          },
          {
            q: 'Ile walizek zmieści się do sedana?',
            a: 'Maksymalnie 3 duże walizki i bagaż podręczny dla maksymalnie 4 podróżnych.',
          },
          {
            q: 'Czy wózek dziecięcy zmieści się w bagażniku?',
            a: 'Tak, kompaktowa składana spacerówka mieści się obok walizek; większe wózki prosimy zgłosić wcześniej.',
          },
          {
            q: 'Co jeśli lot z dziećmi przyleci po 23:00?',
            a: 'Śledzimy lot za darmo i czekamy w terminalu; od 23:00 do 07:00 doliczane jest stałe +€10 za kurs.',
          },
        ],
      },
      fr: {
        title: 'Transfert Aéroport Chypre en Famille : Sièges Enfants & Coffre Berline',
        seoTitle: 'Transfert Chypre avec Siège Bébé & Bagages | Guide Famille',
        metaDescription:
          'Voyager à Chypre avec enfants : sièges bébé et rehausseurs offerts, capacité réelle (4 passagers & 3 valises), poussettes pliables et arrivées nocturnes.',
        excerpt:
          'Tout savoir avant de réserver un transfert familial depuis Larnaca (LCA) ou Paphos (PFO) : sièges auto gratuits, volume réel du coffre et accueil terminal.',
        focusKeywords: [
          'transfert Chypre siège bébé',
          'taxi aéroport Larnaca famille',
          'capacité coffre transfert Chypre',
        ],
        intro:
          'Voyager avec enfants, poussette et grandes valises rend les files de taxis ou les navettes routières éprouvantes. Vérifiez nos sièges gratuits et l’espace réel de nos berlines avant l’embarquement.',
        sections: [
          {
            heading: '1. Sièges bébé et rehausseurs fournis gratuitement',
            paragraphs: [
              'La loi chypriote impose un siège adapté à l’âge et au poids de chaque enfant, rarement disponible à la volée à la borne de l’aéroport.',
              'Indiquez l’âge des enfants lors de la réservation : nous installons gratuitement (0 €) le siège ou rehausseur adapté et vous accueillons directement avec panneau nominatif après la livraison bagages.',
            ],
            bullets: [
              'Sièges bébé (0–4 ans) et rehausseurs (4–11 ans) inclus sans supplément',
              'Accueil climatisé en salle d’arrivée et aide aux bagages',
              'Suivi du vol en direct en cas de retard',
              'Dépose directe devant la réception ou la villa',
            ],
          },
          {
            heading: '2. Capacité transparente : 4 passagers et 3 grandes valises',
            paragraphs: [
              'Nos Mercedes Classe E, Opel Insignia et Toyota Camry accueillent jusqu’à 4 personnes, 3 grandes valises (23 kg) et sacs cabine.',
              'Une poussette canne pliante se glisse aisément dans le coffre ; pour une poussette double ou du matériel volumineux, contactez-nous sur WhatsApp (+357 96 867289) au préalable.',
            ],
          },
        ],
        fareTableTitle: 'Trajets familiaux populaires à prix fixe',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Hôtels famille Limassol (75 €, 50 min)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Trajet court PFO → Limassol (75 €, 45 min)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'Villas familiales Coral Bay (150 €, 100 min)' },
          { routeSlug: 'larnaca-airport-to-polis', highwayNote: 'Séjours calmes à Polis (180 €, 120 min)' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'Plages & parc WaterWorld (115 €, 75 min)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'Direct PFO → Ayia Napa (180 €, 125 min)' },
        ],
        conclusionTitle: 'Des vacances sereines dès la sortie d’avion',
        conclusion:
          'Précisez le siège enfant souhaité lors de la réservation (acompte 20 €) et montez dans une berline fraîche prête à partir.',
        ctaLabel: 'Réserver un transfert famille',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'FAQ Familles & Bagages',
        faqs: [
          {
            q: 'Les sièges bébé et rehausseurs sont-ils payants ?',
            a: 'Non, ils sont fournis gratuitement sur simple mention lors de la commande.',
          },
          {
            q: 'Combien de valises tient une berline ?',
            a: 'Jusqu’à 3 grandes valises en soute plus bagages à main, pour 4 passagers maximum.',
          },
          {
            q: 'Une poussette pliante passe-t-elle dans le coffre ?',
            a: 'Oui, les poussettes compactes entrent avec les valises ; signalez les modèles doubles avant de réserver.',
          },
          {
            q: 'Que se passe-t-il si le vol atterrit après 23h00 ?',
            a: 'Suivi de vol gratuit et accueil garanti (+10 € forfait nuit entre 23h00 et 07h00).',
          },
        ],
      },
      el: {
        title: 'Μεταφορά Αεροδρομίου στην Κύπρο με Παιδιά & Αποσκευές: Καθίσματα & Χώρος',
        seoTitle: 'Μεταφορά Κύπρος με Παιδικό Κάθισμα & Αποσκευές | Οικογενειακός Οδηγός',
        metaDescription:
          'Ταξιδεύετε στην Κύπρο με παιδιά; Δωρεάν βρεφικά & παιδικά καθίσματα, πραγματική χωρητικότητα σεντάν (έως 4 άτομα & 3 βαλίτσες), καρότσια & νυχτερινή άφιξη.',
        excerpt:
          'Όσα χρειάζεται κάθε οικογένεια πριν κλείσει μεταφορά από Λάρνακα (LCA) ή Πάφο (PFO): δωρεάν παιδικά καθίσματα, χώρος αποσκευών και υποδοχή.',
        focusKeywords: [
          'μεταφορά Κύπρος παιδικό κάθισμα',
          'ταξί Λάρνακα βρεφικό κάθισμα',
          'χωρητικότητα αποσκευών μεταφορά Κύπρος',
        ],
        intro:
          'Η αναμονή στην ουρά των ταξί με μικρά παιδιά, καρότσι και βαλίτσες κουράζει αμέσως μετά την πτήση. Ενημερωθείτε εκ των προτέρων για τα παιδικά καθίσματα και τον χώρο του πορτ-μπαγκάζ.',
        sections: [
          {
            heading: '1. Δωρεάν Βρεφικά Καθίσματα & Booster βάσει Νομοθεσίας',
            paragraphs: [
              'Στην Κύπρο τα παιδιά υποχρεούνται να ταξιδεύουν σε κατάλληλο κάθισμα ασφαλείας, κάτι που σπάνια διαθέτουν άμεσα τα ταξί της πιάτσας.',
              'Αναφέρετε την ηλικία των παιδιών κατά την κράτηση και ο οδηγός μας τοποθετεί δωρεάν (€0) το κατάλληλο κάθισμα πριν σας συναντήσει στην αίθουσα αφίξεων.',
            ],
            bullets: [
              'Βρεφικά καθίσματα (0–4 ετών) και booster (4–11 ετών) χωρίς χρέωση',
              'Υποδοχή ακριβώς έξω από τον ιμάντα αποσκευών με πινακίδα ονόματος',
              'Δωρεάν παρακολούθηση καθυστέρησης πτήσης',
              'Άμεση κλιματιζόμενη διαδρομή ως την πόρτα του ξενοδοχείου ή της βίλας',
            ],
          },
          {
            heading: '2. Πραγματική Χωρητικότητα: έως 4 Επιβάτες & 3 Μεγάλες Βαλίτσες',
            paragraphs: [
              'Τα Mercedes E-Class, Opel Insignia και Toyota Camry φιλοξενούν άνετα έως 4 επιβάτες, 3 μεγάλες βαλίτσες και χειραποσκευές.',
              'Ένα πτυσσόμενο καρότσι χωρά δίπλα στις βαλίτσες· για διπλό καρότσι ή αθλητικό εξοπλισμό στείλτε μήνυμα στο WhatsApp (+357 96 867289) πριν την κράτηση.',
            ],
          },
        ],
        fareTableTitle: 'Δημοφιλείς Οικογενειακές Διαδρομές με Σταθερή Τιμή',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Οικογενειακά θέρετρα Λεμεσού (€75, 50 λεπτά)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Γρήγορα από PFO στη Λεμεσό (€75, 45 λεπτά)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'Βίλες στο Coral Bay (€150, 100 λεπτά)' },
          { routeSlug: 'larnaca-airport-to-polis', highwayNote: 'Ήσυχες διακοπές στην Πόλη (€180, 120 λεπτά)' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'Παραλίες & WaterWorld (€115, 75 λεπτά)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'Απευθείας PFO → Αγία Νάπα (€180, 125 λεπτά)' },
        ],
        conclusionTitle: 'Άνετη Οικογενειακή Άφιξη από το Αεροπλάνο στη Βίλα',
        conclusion:
          'Ζητήστε το παιδικό σας κάθισμα στην κράτηση (€20 προκαταβολή) και επιβιβαστείτε αμέσως σε δροσερό σεντάν.',
        ctaLabel: 'Κράτηση με Παιδικό Κάθισμα',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'Ερωτήσεις Οικογενειών & Αποσκευών',
        faqs: [
          {
            q: 'Χρεώνετε επιπλέον για παιδικό κάθισμα ή booster;',
            a: 'Όχι, παρέχονται εντελώς δωρεάν εφόσον ζητηθούν κατά την online κράτηση.',
          },
          {
            q: 'Πόσες βαλίτσες χωράνε στο σεντάν;',
            a: 'Έως 3 μεγάλες κανονικές βαλίτσες και χειραποσκευές για έως 4 επιβάτες.',
          },
          {
            q: 'Χωράει πτυσσόμενο παιδικό καρότσι;',
            a: 'Ναι, ένα πτυσσόμενο καρότσι χωρά δίπλα στις βαλίτσες· ενημερώστε μας εκ των προτέρων για διπλά καρότσια.',
          },
          {
            q: 'Τι ισχύει αν φτάσουμε με παιδιά μετά τα μεσάνυχτα;',
            a: 'Παρακολουθούμε την πτήση δωρεάν και σας περιμένουμε εντός αιθούσης (+€10 σταθερά 23:00–07:00).',
          },
        ],
      },
      it: {
        title: 'Transfer Aeroporto a Cipro con Bambini e Bagagli: Seggiolini e Bagagliaio',
        seoTitle: 'Transfer Cipro con Seggiolino Auto & Bagagli | Guida per Famiglie',
        metaDescription:
          'In viaggio a Cipro con bambini? Seggiolini e rialzi gratis, capienza reale berlina (4 passeggeri e 3 valigie), passeggini pieghevoli e arrivi notturni.',
        excerpt:
          'Cosa sapere prima di prenotare un transfer in famiglia a Larnaca (LCA) o Paphos (PFO): seggiolini gratuiti, dimensioni del baule e ritiro veloce.',
        focusKeywords: [
          'transfer Cipro seggiolino bambini',
          'taxi aeroporto Larnaca neonati',
          'capienza bagagli transfer Cipro',
        ],
        intro:
          'Viaggiare con bambini, passeggino e valigie rende scomode le code ai taxi o le attese agli shuttle bus. Verificare seggiolini e capienza reale del baule garantisce una partenza immediata dagli arrivi.',
        sections: [
          {
            heading: '1. Seggiolini e Rialzi Omologati Inclusi Senza Costi',
            paragraphs: [
              'A Cipro i bambini devono viaggiare su seggiolini idonei per legge, raramente disponibili al volo sui taxi di piazza.',
              'Indica età e peso dei bambini nelle note di prenotazione: montiamo gratuitamente (€0) ovetto, seggiolino o alzabimbo prima di accoglierti col cartello nella sala arrivi.',
            ],
            bullets: [
              'Seggiolini (0–4 anni) e rialzi (4–11 anni) inclusi gratis',
              'Accoglienza climatizzata subito dopo i nastri bagagli',
              'Monitoraggio gratuito di eventuali ritardi del volo',
              'Arrivo diretto davanti alla hall o al cancello della villa',
            ],
          },
          {
            heading: '2. Capienza Reale della Berlina: fino a 4 Passeggeri e 3 Valigie',
            paragraphs: [
              'Le nostre Mercedes Classe E, Opel Insignia e Toyota Camry ospitano fino a 4 passeggeri, 3 valigie grandi (23 kg) e zaini a mano.',
              'Un passeggino leggero pieghevole entra accanto ai bagagli; per passeggini gemellari o attrezzature sportive ingombranti scrivici su WhatsApp (+357 96 867289) prima di confermare.',
            ],
          },
        ],
        fareTableTitle: 'Tratte Familiari Più Richieste a Prezzo Fisso',
        fareTableMode: 'standard',
        fareRows: [
          { routeSlug: 'larnaca-airport-to-limassol', highwayNote: 'Resort per famiglie a Limassol (€75, 50 min)' },
          { routeSlug: 'paphos-airport-to-limassol', highwayNote: 'Tratta breve PFO → Limassol (€75, 45 min)' },
          { routeSlug: 'larnaca-airport-to-coral-bay', highwayNote: 'Ville a Coral Bay (€150, 100 min)' },
          { routeSlug: 'larnaca-airport-to-polis', highwayNote: 'Relax familiare a Polis (€180, 120 min)' },
          { routeSlug: 'limassol-to-ayia-napa', highwayNote: 'Spiagge & WaterWorld (€115, 75 min)' },
          { routeSlug: 'paphos-airport-to-ayia-napa', highwayNote: 'Diretto PFO → Ayia Napa (€180, 125 min)' },
        ],
        conclusionTitle: 'Arrivo Sereno dall’Aereo alla Villa',
        conclusion:
          'Richiedi il seggiolino al momento della prenotazione (acconto €20) e sali subito su una berlina fresca pronta a partire.',
        ctaLabel: 'Prenota Transfer con Seggiolino',
        ctaHrefSlug: 'paphos-airport-to-limassol',
        faqsTitle: 'FAQ Famiglie e Bagagli',
        faqs: [
          {
            q: 'I seggiolini per bambini prevedono costi extra?',
            a: 'No, ovetti e rialzi sono gratuiti se richiesti al momento della prenotazione.',
          },
          {
            q: 'Quante valigie entrano in berlina?',
            a: 'Fino a 3 valigie grandi da stiva più bagagli a mano per massimo 4 persone.',
          },
          {
            q: 'Ci sta un passeggino pieghevole nel baule?',
            a: 'Sì, i passeggini compatti entrano insieme alle valigie; avvisaci prima per modelli gemellari.',
          },
          {
            q: 'Cosa succede se il volo con bambini atterra dopo mezzanotte?',
            a: 'Tracciamo il volo gratuitamente e attendiamo in sala arrivi (+€10 fissi nella fascia 23:00–07:00).',
          },
        ],
      },
    },
  },
];
