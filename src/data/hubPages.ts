import type { Language, RouteView } from '../lib/routing';
import type { RouteFaqItem } from './routes';

export type HubId = 'lca' | 'pfo' | 'limassol';

export interface HubComparisonRow {
  option: string;
  cost: string;
  duration: string;
  pickup: string;
  nightRule: string;
}

export interface HubLocalizedContent {
  seoTitle: string;
  metaDescription: string;
  breadcrumb: string;
  badge: string;
  h1: string;
  subtitle: string;
  tableTitle: string;
  guideHeading: string;
  guideParagraphs: string[];
  boundariesNote: string;
  comparisonHeading: string;
  comparisonRows: HubComparisonRow[];
  faqsHeading: string;
  faqs: RouteFaqItem[];
  siblingHeading: string;
  shortLabel: string;
}

export interface HubConfig {
  id: HubId;
  view: Extract<RouteView, 'hub-lca' | 'hub-pfo' | 'hub-limassol'>;
  defaultFrom: string;
  defaultTo: string;
  image: string;
  routeSlugs: string[];
  siblingHubs: HubId[];
  locales: Record<Language, HubLocalizedContent>;
}

export const HUB_PAGES: Record<HubId, HubConfig> = {
  lca: {
    id: 'lca',
    view: 'hub-lca',
    defaultFrom: 'lca',
    defaultTo: 'limassol',
    image: '/images/larnaca-route.webp',
    routeSlugs: [
      'larnaca-airport-to-limassol',
      'larnaca-airport-to-paphos',
      'larnaca-airport-to-paphos-airport',
      'larnaca-airport-to-coral-bay',
      'larnaca-airport-to-peyia',
      'larnaca-airport-to-polis',
    ],
    siblingHubs: ['pfo', 'limassol'],
    locales: {
      en: {
        seoTitle: 'Larnaca Airport (LCA) Taxi & Private Transfers 24/7 | Fixed €75–€180',
        metaDescription:
          'Pre-booked private transfers from Larnaca International Airport (LCA) to Limassol (€75), Paphos (€135), Coral Bay (€150), Peyia (€160) & Polis (€180). 24/7 meet & greet.',
        breadcrumb: 'Larnaca Airport (LCA) Transfers',
        badge: 'Larnaca Airport (LCA) Hub · Fixed EUR',
        h1: 'Larnaca Airport (LCA) Private Transfers & Taxi',
        subtitle:
          'Skip airport rank queues and Kapnos hub transfers. Direct private sedan pickups from LCA Arrivals Hall to Limassol (€75), Paphos (€135), Paphos Airport (€140), Coral Bay (€150), Peyia (€160), and Polis (€180).',
        tableTitle: 'All Active Fixed-Price Routes from Larnaca Airport (LCA)',
        guideHeading: 'Arrivals Hall Pickup at LCA & Comparison with Kapnos / Rank Taxis',
        guideParagraphs: [
          'After clearing passport control and collecting suitcases in Larnaca International Airport (LCA), walk straight through the main sliding doors into the Arrivals Hall where your Limassol-based chauffeur waits holding a name board. Live flight numbers are tracked automatically so delays incur zero waiting fees.',
          'Unlike the Kapnos shuttle bus (which drops passengers at highway roadside stations outside hotel zones) or airport rank taxis running Tariff 1/2 meters plus baggage surcharges, our pre-booked Mercedes E-Class, Opel Insignia, and Toyota Camry sedans deliver up to 4 passengers and 3 suitcases door-to-door along the A3, A5, A1, and A6 highways.',
        ],
        boundariesNote:
          'Service focus: our Limassol-based fleet operates LCA transfers westwards to Limassol, Paphos, PFO Airport, Coral Bay, Peyia, and Polis. We do not operate short local rides wholly inside Eastern Cyprus (such as LCA → Larnaca City, Ayia Napa, Protaras, or Nicosia).',
        comparisonHeading: 'Larnaca Airport (LCA) Transfer Options Compared',
        comparisonRows: [
          {
            option: 'Private Sedan (Fixed Pre-Booked)',
            cost: '€75–€180 fixed per car (up to 4 pax)',
            duration: '50–120 min nonstop',
            pickup: 'Arrivals Hall name sign + door-to-door',
            nightRule: 'Flat +€10 (23:00–07:00)',
          },
          {
            option: 'LCA Terminal Rank Taxi',
            cost: '~€90–€240+ metered + extras',
            duration: '50–120 min (traffic-dependent)',
            pickup: 'Outdoor rank queue',
            nightRule: 'Higher Tariff 2 per-km rate (20:30–06:00)',
          },
          {
            option: 'Kapnos / Intercity Bus',
            cost: '~€9–€20 per person',
            duration: '1.5–3.5 hours with transfers',
            pickup: 'Curb shuttle; drops at hub stations only',
            nightRule: 'No direct night connections west to Paphos',
          },
        ],
        faqsHeading: 'Larnaca Airport (LCA) Transfer FAQs',
        faqs: [
          {
            q: 'Where does my driver wait at Larnaca Airport (LCA)?',
            a: 'Your driver meets you directly inside the main Arrivals Hall right after baggage claim with a printed name sign and monitors your flight arrival in real time.',
          },
          {
            q: 'How much is a fixed transfer from Larnaca Airport to Limassol?',
            a: 'The daytime rate from Larnaca Airport (LCA) to any address in Limassol (Marina, Germasogeia, Agios Tychonas, Zakaki) is a fixed €75 per sedan (+€10 between 23:00 and 07:00).',
          },
          {
            q: 'Do you cover Larnaca Airport to Paphos, Coral Bay, Peyia, and Polis?',
            a: 'Yes! We run direct highway transfers via Limassol to Paphos (€135), PFO Airport (€140), Coral Bay (€150), Peyia (€160), and Polis Chrysochous (€180).',
          },
          {
            q: 'Why does the calculator exclude LCA → Ayia Napa, Protaras, or Larnaca City?',
            a: 'Because our drivers dispatch from Limassol, we concentrate on westbound/cross-island LCA routes rather than short eastern hops wholly inside Larnaca or Famagusta districts.',
          },
        ],
        siblingHeading: 'Explore Other Cyprus Transfer Hubs',
        shortLabel: 'Larnaca Airport (LCA) Transfers',
      },
      ru: {
        seoTitle: 'Трансфер из аэропорта Ларнаки (LCA) 24/7 | Фиксированно €75–€180',
        metaDescription:
          'Заказ частного трансфера и такси из аэропорта Ларнаки (LCA) в Лимассол (€75), Пафос (€135), Корал Бэй (€150), Пейю (€160) и Полис (€180). Встреча с табличкой.',
        breadcrumb: 'Аэропорт Ларнака (LCA)',
        badge: 'Хаб аэропорта Ларнака (LCA) · Фикс в EUR',
        h1: 'Трансферы из аэропорта Ларнака (LCA)',
        subtitle:
          'Прямая подача седана в зал прилёта LCA без очередей и пересадок с шаттла Kapnos: Лимассол (€75), Пафос (€135), аэропорт Пафоса (€140), Корал Бэй (€150), Пейя (€160) и Полис (€180).',
        tableTitle: 'Все активные фиксированные маршруты из аэропорта Ларнака (LCA)',
        guideHeading: 'Встреча в зале прилёта Ларнаки и сравнение с Kapnos / обычным такси',
        guideParagraphs: [
          'После паспортного контроля и получения багажа в аэропорту Ларнаки (LCA) выходите через раздвижные двери в центральный зал прилёта — там вас встречает водитель нашей лимассольской службы с именной табличкой. Рейс отслеживается онлайн, поэтому ожидание при задержке бесплатно.',
          'Шаттл Kapnos доезжает только до развязок на трассе (после чего всё равно нужно ловить городское такси), а стояночные такси считают поездку по счётчику с ночным тарифом и доплатами за чемоданы. Наш Mercedes E-Class, Opel Insignia или Toyota Camry везёт до 4 пассажиров и 3 чемоданов прямо до двери по фиксированной цене.',
        ],
        boundariesNote:
          'Границы маршрутов: поскольку база расположена в Лимассоле, из LCA мы выполняем западные и межрегиональные рейсы в Лимассол, Пафос, PFO, Корал Бэй, Пейю и Полис. Короткие локальные поездки внутри восточной части Кипра (LCA → Ларнака город, Айя-Напа, Протарас, Никосия) не обслуживаются.',
        comparisonHeading: 'Сравнение способов уехать из аэропорта Ларнаки (LCA)',
        comparisonRows: [
          {
            option: 'Индивидуальный седан (Фикс)',
            cost: '€75–€180 за весь автомобиль (до 4 чел.)',
            duration: '50–120 мин без пересадок',
            pickup: 'Встреча в зале с табличкой до адреса',
            nightRule: 'Фиксированно +€10 (23:00–07:00)',
          },
          {
            option: 'Такси со стоянки у терминала LCA',
            cost: '~€90–€240+ по счётчику + доплаты',
            duration: '50–120 мин (зависит от пробок)',
            pickup: 'Очередь на выходе из терминала',
            nightRule: 'Повышенный Тариф 2 за каждый км (20:30–06:00)',
          },
          {
            option: 'Автобус Kapnos / Intercity',
            cost: '~€9–€20 с пассажира',
            duration: '1,5–3,5 часа с пересадками',
            pickup: 'Только между автостанциями',
            nightRule: 'Прямых ночных рейсов на Пафос нет',
          },
        ],
        faqsHeading: 'Частые вопросы по аэропорту Ларнаки (LCA)',
        faqs: [
          {
            q: 'Где именно водитель встречает пассажиров в аэропорту Ларнака (LCA)?',
            a: 'Внутри общего зала прилёта сразу на выходе из зоны получения багажа с табличкой с вашим именем; рейс отслеживается в реальном времени.',
          },
          {
            q: 'Сколько стоит фиксированный трансфер Ларнака (LCA) — Лимассол?',
            a: 'Днём стоимость составляет €75 за весь седан в любой район Лимассола (Марина, Гермасойя, Агиос Тихонас, Закаки), ночью с 23:00 до 07:00 добавляется ровно +€10.',
          },
          {
            q: 'Возите ли вы из Ларнаки в Пафос, Корал Бэй, Пейю и Полис?',
            a: 'Да, это наши регулярные маршруты через Лимассол: Пафос (€135), аэропорт PFO (€140), Корал Бэй (€150), Пейя (€160) и Полис/Лачи (€180).',
          },
          {
            q: 'Почему нет маршрутов LCA → Айя-Напа, Протарас или город Ларнака?',
            a: 'Наша служба базируется в Лимассоле, поэтому мы не принимаем заказы на короткие поездки целиком внутри восточного региона.',
          },
        ],
        siblingHeading: 'Другие основные хабы трансфера',
        shortLabel: 'Аэропорт Ларнака (LCA)',
      },
      de: {
        seoTitle: 'Flughafen Larnaka (LCA) Transfer & Taxi 24/7 | Festpreis €75–€180',
        metaDescription:
          'Privater Transfer ab Flughafen Larnaka (LCA) nach Limassol (€75), Paphos (€135), Coral Bay (€150), Peyia (€160) & Polis (€180). Empfang in der Ankunftshalle 24/7.',
        breadcrumb: 'Flughafen Larnaka (LCA)',
        badge: 'LCA Airport Hub · Festpreise EUR',
        h1: 'Flughafen Larnaka (LCA) Privattransfer & Taxi',
        subtitle:
          'Ohne Umstieg ab Ankunftshalle LCA: Limassol (€75), Paphos (€135), Flughafen Paphos (€140), Coral Bay (€150), Peyia (€160) und Polis (€180) zum garantierten Festpreis.',
        tableTitle: 'Alle aktiven Festpreis-Strecken ab Flughafen Larnaka (LCA)',
        guideHeading: 'Abholung im Terminal Larnaka & Vergleich mit Bus/Taxameter',
        guideParagraphs: [
          'Nach Passkontrolle und Gepäckausgabe am Flughafen Larnaka (LCA) gehen Sie durch die Glastüren in die zentrale Ankunftshalle, wo Ihr Fahrer aus Limassol mit Namensschild wartet. Flugverspätungen werden live überwacht.',
          'Anders als beim Kapnos-Shuttle mit Halt an Außenstationen oder Taxametern mit Nacht- und Gepäckzuschlägen fahren unsere Limousinen (Mercedes E-Class, Opel Insignia, Toyota Camry) bis zu 4 Gäste mit 3 Koffern direkt vor die Haustür.',
        ],
        boundariesNote:
          'Einsatzbereich: Ab Larnaka (LCA) fahren wir westwärts nach Limassol, Paphos, PFO, Coral Bay, Peyia und Polis. Kurze lokale Fahrten innerhalb Ostzyperns (z. B. LCA → Larnaka Stadt, Ayia Napa, Protaras, Nikosia) werden nicht bedient.',
        comparisonHeading: 'Flughafen Larnaka (LCA): Transportmöglichkeiten im Vergleich',
        comparisonRows: [
          {
            option: 'Privater Festpreis-Transfer',
            cost: '€75–€180 pro Limousine (bis 4 Pers.)',
            duration: '50–120 Min. nonstop',
            pickup: 'Namensschild in der Halle + Haustür',
            nightRule: 'Pauschal +€10 (23:00–07:00)',
          },
          {
            option: 'Terminal-Taxi mit Taxameter',
            cost: 'ca. €90–€240+ inkl. Zuschläge',
            duration: '50–120 Min.',
            pickup: 'Warteschlange am Ausgang',
            nightRule: 'Höherer Nachttarif 2 pro km (20:30–06:00)',
          },
          {
            option: 'Kapnos-Shuttle / Linienbus',
            cost: 'ca. €9–€20 pro Person',
            duration: '1,5–3,5 Std. mit Umstieg',
            pickup: 'Nur Stationen am Stadtrand',
            nightRule: 'Keine Nachtbusse bis Paphos',
          },
        ],
        faqsHeading: 'FAQ zum Transfer ab Flughafen Larnaka (LCA)',
        faqs: [
          {
            q: 'Wo treffe ich den Fahrer am Flughafen Larnaka (LCA)?',
            a: 'Direkt in der zentralen Ankunftshalle hinter dem Zoll/Gepäckband mit Namensschild; wir verfolgen Ihren Flug automatisch.',
          },
          {
            q: 'Was kostet der Festpreis von LCA nach Limassol?',
            a: 'Tagsüber €75 pro Fahrzeug in alle Stadtteile Limassols; zwischen 23:00 und 07:00 Uhr gilt lediglich ein pauschaler Nachtaufschlag von +€10.',
          },
          {
            q: 'Fahren Sie auch nach Paphos, Coral Bay, Peyia und Polis?',
            a: 'Ja: Paphos (€135), Paphos Airport (€140), Coral Bay (€150), Peyia (€160) und Polis (€180) direkt über Limassol.',
          },
          {
            q: 'Warum gibt es keine kurzen Fahrten von LCA nach Ayia Napa oder Protaras?',
            a: 'Unser Standort liegt zentral in Limassol; deshalb konzentrieren wir uns ab LCA auf westliche und inselweite Langstrecken.',
          },
        ],
        siblingHeading: 'Weitere Zypern-Transfer-Hubs',
        shortLabel: 'Flughafen Larnaka (LCA)',
      },
      pl: {
        seoTitle: 'Lotnisko Larnaka (LCA) Transfer i Taxi 24/7 | Stała cena €75–€180',
        metaDescription:
          'Prywatny transfer z lotniska Larnaka (LCA) do Limassol (€75), Pafos (€135), Coral Bay (€150), Peyi (€160) i Polis (€180). Powitanie na hali przylotów 24/7.',
        breadcrumb: 'Lotnisko Larnaka (LCA)',
        badge: 'Hub Lotnisko Larnaka (LCA) · Stałe EUR',
        h1: 'Transfer z lotniska Larnaka (LCA) — Stała cena',
        subtitle:
          'Bezpośredni odbiór spod hali przylotów LCA bez przesiadek w autobusach Kapnos: Limassol (€75), Pafos (€135), Lotnisko Pafos (€140), Coral Bay (€150), Peyia (€160) i Polis (€180).',
        tableTitle: 'Wszystkie aktywne trasy w stałej cenie z lotniska Larnaka (LCA)',
        guideHeading: 'Odbiór w hali przylotów LCA oraz porównanie z Kapnos i taksówką',
        guideParagraphs: [
          'Po odebraniu walizek na lotnisku Larnaka (LCA) wyjdź przez główne drzwi na halę przylotów — kierowca z Limassol czeka z tabliczką imienną. Lot śledzony jest na bieżąco, więc ewentualne opóźnienia nie generują opłat.',
          'Autobusy Kapnos kończą bieg na węzłach poza centrami kurortów, a taksówki z postoju naliczają taryfę kilometrową oraz dopłaty za bagaż. Nasze sedany (Mercedes E-Class, Opel Insignia, Toyota Camry) zabierają do 4 pasażerów i 3 walizek w cenie stałej pod sam hotel.',
        ],
        boundariesNote:
          'Zakres usług: z lotniska LCA realizujemy trasy na zachód do Limassol, Pafos, PFO, Coral Bay, Peyi i Polis. Nie wykonujemy krótkich kursów wewnątrz wschodniego Cypru (LCA → miasto Larnaka, Ayia Napa, Protaras, Nikozja).',
        comparisonHeading: 'Porównanie opcji przejazdu z lotniska Larnaka (LCA)',
        comparisonRows: [
          {
            option: 'Prywatny sedan (Stała cena)',
            cost: '€75–€180 za auto (do 4 osób)',
            duration: '50–120 min bez przesiadek',
            pickup: 'Tabliczka w hali przylotów + adres',
            nightRule: 'Płaskie +€10 (23:00–07:00)',
          },
          {
            option: 'Taksówka z postoju LCA',
            cost: 'ok. €90–€240+ wg licznika',
            duration: '50–120 min (zależnie od ruchu)',
            pickup: 'Kolejka przed wyjściem',
            nightRule: 'Wyższa Taryfa 2 za km (20:30–06:00)',
          },
          {
            option: 'Bus Kapnos / Intercity',
            cost: 'ok. €9–€20 za osobę',
            duration: '1,5–3,5 godz. z przesiadkami',
            pickup: 'Tylko główne przystanki przelotowe',
            nightRule: 'Brak nocnych kursów na zachód',
          },
        ],
        faqsHeading: 'Najczęstsze pytania — Lotnisko Larnaka (LCA)',
        faqs: [
          {
            q: 'Gdzie dokładnie spotkam kierowcę po przylocie do Larnaki (LCA)?',
            a: 'W głównej hali przylotów tuż po wyjściu ze strefy bagażowej — kierowca trzyma wyraźną tabliczkę imienną i monitoruje status lotu.',
          },
          {
            q: 'Ile kosztuje transfer z lotniska Larnaka do Limassol?',
            a: 'W dzień obowiązuje stała stawka €75 za cały samochód niezależnie od dzielnicy Limassol; w nocy (23:00–07:00) dopłata wynosi jedynie +€10.',
          },
          {
            q: 'Czy kursujecie z LCA także do Pafos, Coral Bay, Peyi i Polis?',
            a: 'Tak: Pafos (€135), lotnisko PFO (€140), Coral Bay (€150), Peyia (€160) oraz Polis (€180) bezpośrednio przez Limassol.',
          },
          {
            q: 'Dlaczego kalkulator nie obejmuje przejazdów LCA → Ayia Napa czy Protaras?',
            a: 'Ponieważ stacjonujemy w Limassol, obsługujemy kierunki zachodnie i międzymiastowe zamiast krótkich kursów w ramach wschodniej części wyspy.',
          },
        ],
        siblingHeading: 'Pozostałe główne huby na Cyprze',
        shortLabel: 'Lotnisko Larnaka (LCA)',
      },
      fr: {
        seoTitle: 'Transfert Aéroport Larnaca (LCA) 24/7 | Tarif fixe 75 €–180 €',
        metaDescription:
          'Transfert privé depuis Larnaca (LCA) vers Limassol (75 €), Paphos (135 €), Coral Bay (150 €), Peyia (160 €) et Polis (180 €). Accueil avec pancarte 24/7.',
        breadcrumb: 'Aéroport de Larnaca (LCA)',
        badge: 'Hub Aéroport Larnaca (LCA) · Prix fixe EUR',
        h1: 'Transferts privés depuis Larnaca (LCA)',
        subtitle:
          "Évitez files d'attente et correspondances Kapnos : prise en charge directe au hall des arrivées LCA vers Limassol (75 €), Paphos (135 €), aéroport PFO (140 €), Coral Bay (150 €), Peyia (160 €) et Polis (180 €).",
        tableTitle: 'Tous les trajets actifs à tarif fixe depuis Larnaca (LCA)',
        guideHeading: 'Accueil en salle des arrivées LCA & comparatif bus / taxi',
        guideParagraphs: [
          'Dès la sortie du retrait des bagages à Larnaca (LCA), avancez dans le hall public des arrivées : notre chauffeur basé à Limassol vous y attend avec une pancarte nominative et suit votre vol en direct.',
          'Contrairement à la navette Kapnos qui dépose en périphérie ou aux taxis au compteur majorés la nuit et pour les valises, nos berlines (Mercedes E-Class, Opel Insignia, Toyota Camry) assurent le porte-à-porte jusqu’à 4 passagers et 3 bagages.',
        ],
        boundariesNote:
          'Périmètre : au départ de LCA, nous opérons vers Limassol, Paphos, PFO, Coral Bay, Peyia et Polis. Nous n’assurons pas les trajets courts internes à l’est (LCA → Larnaca Ville, Ayia Napa, Protaras ou Nicosie).',
        comparisonHeading: 'Comparatif des transports au départ de Larnaca (LCA)',
        comparisonRows: [
          {
            option: 'Berline privée à prix fixe',
            cost: '75 €–180 € par voiture (jusqu’à 4 pers.)',
            duration: '50–120 min sans arrêt',
            pickup: 'Pancarte aux arrivées + porte-à-porte',
            nightRule: 'Forfait +10 € (23h00–07h00)',
          },
          {
            option: 'Taxi compteur de l’aéroport',
            cost: '~90 €–240 €+ selon compteur',
            duration: '50–120 min',
            pickup: 'File extérieure du terminal',
            nightRule: 'Tarif nuit 2 majoré au km (20h30–06h00)',
          },
          {
            option: 'Navette Kapnos / Bus public',
            cost: '~9 €–20 € par voyageur',
            duration: '1h30–3h30 avec correspondances',
            pickup: 'Stations routières uniquement',
            nightRule: 'Pas de bus directs la nuit vers Paphos',
          },
        ],
        faqsHeading: 'Questions fréquentes — Aéroport de Larnaca (LCA)',
        faqs: [
          {
            q: 'Où retrouve-t-on le chauffeur à l’aéroport de Larnaca (LCA) ?',
            a: 'Juste après la sortie des bagages dans le hall principal des arrivées avec votre nom affiché sur une pancarte ; le vol est suivi en direct.',
          },
          {
            q: 'Combien coûte le trajet LCA → Limassol en berline privée ?',
            a: 'Le forfait jour est de 75 € par véhicule vers tous les quartiers de Limassol (+10 € fixes entre 23h00 et 07h00).',
          },
          {
            q: 'Desservez-vous Paphos, Coral Bay, Peyia et Polis depuis Larnaca ?',
            a: 'Oui : Paphos (135 €), aéroport PFO (140 €), Coral Bay (150 €), Peyia (160 €) et Polis (180 €).',
          },
          {
            q: 'Pourquoi les petits trajets LCA → Ayia Napa ou Larnaca Ville sont-ils exclus ?',
            a: 'Notre base étant à Limassol, nous couvrons exclusivement les axes vers Limassol et l’ouest de Chypre depuis LCA.',
          },
        ],
        siblingHeading: 'Autres pôles de transfert à Chypre',
        shortLabel: 'Aéroport Larnaca (LCA)',
      },
      el: {
        seoTitle: 'Μεταφορά Αεροδρόμιο Λάρνακας (LCA) 24/7 | Σταθερά €75–€180',
        metaDescription:
          'Ιδιωτικές μεταφορές από το Αεροδρόμιο Λάρνακας (LCA) προς Λεμεσό (€75), Πάφο (€135), Coral Bay (€150), Πέγεια (€160) & Πόλις (€180). Υποδοχή 24/7.',
        breadcrumb: 'Αεροδρόμιο Λάρνακας (LCA)',
        badge: 'Κόμβος Λάρνακας (LCA) · Σταθερό EUR',
        h1: 'Μεταφορές Αεροδρομίου Λάρνακας (LCA)',
        subtitle:
          'Χωρίς ουρές και αλλαγές λεωφορείων Kapnos: απευθείας παραλαβή από τις Αφίξεις LCA για Λεμεσό (€75), Πάφο (€135), Αεροδρόμιο Πάφου (€140), Coral Bay (€150), Πέγεια (€160) και Πόλις (€180).',
        tableTitle: 'Όλες οι ενεργές διαδρομές σταθερής τιμής από LCA',
        guideHeading: 'Υποδοχή στις αφίξεις Λάρνακας & σύγκριση με λεωφορείο / ταξίμετρο',
        guideParagraphs: [
          'Αφού παραλάβετε τις αποσκευές σας στο αεροδρόμιο Λάρνακας (LCA), βγείτε στην κεντρική αίθουσα αφίξεων όπου σάς περιμένει ο οδηγός μας από τη Λεμεσό με ταμπέλα ονόματος. Παρακολουθούμε την πτήση ζωντανά χωρίς χρέωση καθυστέρησης.',
          'Το λεωφορείο Kapnos σταματά σε περιφερειακούς κόμβους, ενώ τα ταξί της πιάτσας χρησιμοποιούν ταξίμετρο με προσαυξήσεις. Τα sedan μας (Mercedes E-Class, Opel Insignia, Toyota Camry) μεταφέρουν έως 4 άτομα και 3 βαλίτσες στην πόρτα σας με σταθερή τιμή.',
        ],
        boundariesNote:
          'Όρια εξυπηρέτησης: από το LCA εκτελούμε διαδρομές δυτικά προς Λεμεσό, Πάφο, PFO, Coral Bay, Πέγεια και Πόλις. Δεν αναλαμβάνουμε σύντομες τοπικές μεταφορές εντός ανατολικής Κύπρου (LCA → πόλη Λάρνακας, Αγία Νάπα, Πρωταράς, Λευκωσία).',
        comparisonHeading: 'Σύγκριση επιλογών μεταφοράς από Αεροδρόμιο Λάρνακας (LCA)',
        comparisonRows: [
          {
            option: 'Ιδιωτικό Sedan (Σταθερή τιμή)',
            cost: '€75–€180 ανά όχημα (έως 4 άτομα)',
            duration: '50–120 λεπτά απευθείας',
            pickup: 'Ταμπέλα στις αφίξεις + πόρτα-πόρτα',
            nightRule: 'Ενιαίο +€10 (23:00–07:00)',
          },
          {
            option: 'Ταξί πιάτσας με ταξίμετρο',
            cost: '~€90–€240+ (ταξίμετρο + έξτρα)',
            duration: '50–120 λεπτά',
            pickup: 'Αναμονή έξω από τον σταθμό',
            nightRule: 'Αυξημένο νυχτερινό ανά χλμ (20:30–06:00)',
          },
          {
            option: 'Λεωφορείο Kapnos / Intercity',
            cost: '~€9–€20 ανά άτομο',
            duration: '1,5–3,5 ώρες με αλλαγές',
            pickup: 'Μόνο σε σταθμούς',
            nightRule: 'Χωρίς νυχτερινά δρομολόγια προς Πάφο',
          },
        ],
        faqsHeading: 'Συχνές ερωτήσεις για Αεροδρόμιο Λάρνακας (LCA)',
        faqs: [
          {
            q: 'Πού με περιμένει ο οδηγός στο Αεροδρόμιο Λάρνακας (LCA);',
            a: 'Μέσα στην κεντρική αίθουσα αφίξεων αμέσως μετά την έξοδο αποσκευών με ταμπέλα στο όνομά σας.',
          },
          {
            q: 'Πόσο κοστίζει η μεταφορά Λάρνακα (LCA) – Λεμεσός;',
            a: 'Η σταθερή ημερήσια χρέωση είναι €75 για όλο το sedan σε κάθε περιοχή της Λεμεσού (+€10 νυχτερινό τέλος 23:00–07:00).',
          },
          {
            q: 'Εξυπηρετείτε από Λάρνακα προς Πάφο, Coral Bay, Πέγεια και Πόλις;',
            a: 'Ναι: Πάφος (€135), Αεροδρόμιο Πάφου (€140), Coral Bay (€150), Πέγεια (€160) και Πόλις Χρυσοχούς (€180).',
          },
          {
            q: 'Γιατί δεν εμφανίζονται διαδρομές LCA → Αγία Νάπα ή Πρωταράς;',
            a: 'Επειδή εδρεύουμε στη Λεμεσό, εστιάζουμε στις διαδρομές προς Λεμεσό και δυτική Κύπρο.',
          },
        ],
        siblingHeading: 'Άλλοι βασικοί κόμβοι μεταφοράς στην Κύπρο',
        shortLabel: 'Αεροδρόμιο Λάρνακας (LCA)',
      },
      it: {
        seoTitle: 'Transfer Aeroporto di Larnaca (LCA) 24/7 | Prezzo fisso €75–€180',
        metaDescription:
          'Transfer privato dall’aeroporto di Larnaca (LCA) a Limassol (€75), Paphos (€135), Coral Bay (€150), Peyia (€160) e Polis (€180). Accoglienza 24/7 agli arrivi.',
        breadcrumb: 'Aeroporto di Larnaca (LCA)',
        badge: 'Hub Aeroporto Larnaca (LCA) · Tariffe fisse',
        h1: 'Transfer privati dall’Aeroporto di Larnaca (LCA)',
        subtitle:
          'Evita code e cambi navetta Kapnos: accoglienza diretta agli arrivi LCA verso Limassol (€75), Paphos (€135), Aeroporto PFO (€140), Coral Bay (€150), Peyia (€160) e Polis (€180).',
        tableTitle: 'Tutte le tratte attive a tariffa fissa da Larnaca (LCA)',
        guideHeading: 'Accoglienza agli arrivi LCA e confronto con bus / tassametro',
        guideParagraphs: [
          'Ritirati i bagagli allo scalo di Larnaca (LCA), esci nella sala arrivi principale dove l’autista di Limassol attende con cartello nominativo. Monitoriamo il volo in diretta senza costi per ritardi.',
          'Diversamente dallo shuttle Kapnos che ferma su snodi esterni o dai taxi a tassametro con supplementi notturni e valigie, le nostre berline (Mercedes E-Class, Opel Insignia, Toyota Camry) portano fino a 4 passeggeri e 3 bagagli direttamente a destinazione.',
        ],
        boundariesNote:
          'Ambito operativo: da LCA serviamo tratte verso ovest (Limassol, Paphos, PFO, Coral Bay, Peyia e Polis). Non operiamo corse brevi interne a Cipro est (LCA → Larnaca Città, Ayia Napa, Protaras, Nicosia).',
        comparisonHeading: 'Confronto opzioni di transfer da Larnaca (LCA)',
        comparisonRows: [
          {
            option: 'Berlina privata a tariffa fissa',
            cost: '€75–€180 per auto (fino a 4 pax)',
            duration: '50–120 min diretti',
            pickup: 'Cartello in sala arrivi + porta a porta',
            nightRule: '+€10 fisso (23:00–07:00)',
          },
          {
            option: 'Taxi a tassametro al terminal',
            cost: '~€90–€240+ a tassametro',
            duration: '50–120 min',
            pickup: 'Coda esterna arrivi',
            nightRule: 'Tariffa 2 maggiorata a km (20:30–06:00)',
          },
          {
            option: 'Navetta Kapnos / Bus pubblico',
            cost: '~€9–€20 a persona',
            duration: '1,5–3,5 ore con cambi',
            pickup: 'Solo stazioni esterne',
            nightRule: 'Nessuna corsa notturna per Paphos',
          },
        ],
        faqsHeading: 'FAQ sui transfer da Aeroporto di Larnaca (LCA)',
        faqs: [
          {
            q: 'Dove incontro l’autista all’aeroporto di Larnaca (LCA)?',
            a: 'Direttamente nella sala arrivi principale subito dopo l’uscita bagagli con il tuo nome sul cartello; il volo è monitorato in tempo reale.',
          },
          {
            q: 'Quanto costa il transfer da LCA a Limassol?',
            a: 'La tariffa diurna è €75 fissi a berlina per tutta Limassol (+€10 fissi di notte tra le 23:00 e le 07:00).',
          },
          {
            q: 'Coprite anche Paphos, Coral Bay, Peyia e Polis da Larnaca?',
            a: 'Sì: Paphos (€135), Aeroporto PFO (€140), Coral Bay (€150), Peyia (€160) e Polis (€180).',
          },
          {
            q: 'Perché non offrite brevi tratte LCA → Ayia Napa o Larnaca Città?',
            a: 'Operando da Limassol concentriamo la flotta sulle tratte verso Limassol e la costa occidentale.',
          },
        ],
        siblingHeading: 'Altri hub principali a Cipro',
        shortLabel: 'Aeroporto Larnaca (LCA)',
      },
    },
  },

  pfo: {
    id: 'pfo',
    view: 'hub-pfo',
    defaultFrom: 'pfo',
    defaultTo: 'limassol',
    image: '/images/paphos-route.webp',
    routeSlugs: [
      'paphos-airport-to-limassol',
      'paphos-airport-to-larnaca-city',
      'larnaca-airport-to-paphos-airport',
      'paphos-airport-to-nicosia',
      'paphos-airport-to-ayia-napa',
      'paphos-airport-to-protaras',
    ],
    siblingHubs: ['lca', 'limassol'],
    locales: {
      en: {
        seoTitle: 'Paphos Airport (PFO) Taxi & Private Transfers 24/7 | Fixed €75–€190',
        metaDescription:
          'Pre-booked private transfers from Paphos Airport (PFO) to Limassol (€75), Larnaca (€135), LCA Airport (€140), Nicosia (€150), Ayia Napa (€180) & Protaras (€190).',
        breadcrumb: 'Paphos Airport (PFO) Transfers',
        badge: 'Paphos Airport (PFO) Hub · Fixed EUR',
        h1: 'Paphos Airport (PFO) Private Transfers & Taxi',
        subtitle:
          'Direct 24/7 sedans from PFO’s compact terminal straight along the A6 coastal highway: Limassol (€75), Larnaca City (€135), Larnaca Airport (€140), Nicosia (€150), Ayia Napa (€180), and Protaras (€190).',
        tableTitle: 'All Active Fixed-Price Routes from Paphos Airport (PFO)',
        guideHeading: 'Meeting Your Driver at Paphos Airport & Beating Evening Bus Gaps',
        guideParagraphs: [
          'Paphos International Airport (PFO) operates a single ground-level terminal southeast of Paphos city, putting your exit directly facing Limassol-bound highways. Your chauffeur awaits right outside the single Arrivals gate with a name sign, bypassing unpredictable terminal taxi negotiations.',
          'Because intercity buses out of PFO stop in the evening and never run direct to Ayia Napa, Protaras, or Nicosia late at night, a pre-booked fixed-price sedan eliminates hours of waiting or hotel detours.',
        ],
        boundariesNote:
          'Service focus: our Limassol fleet handles PFO connections eastwards to Limassol, Larnaca City, LCA Airport, Nicosia, Ayia Napa, and Protaras. We do not accept short local hops wholly inside Paphos District (such as PFO → Paphos Harbour, Coral Bay, Peyia, or Polis).',
        comparisonHeading: 'Paphos Airport (PFO) Transport Options Compared',
        comparisonRows: [
          {
            option: 'Private Sedan (Fixed Pre-Booked)',
            cost: '€75–€190 fixed per car (up to 4 pax)',
            duration: '45–130 min direct A6/A1',
            pickup: 'Terminal Arrivals meet & greet',
            nightRule: 'Flat +€10 (23:00–07:00)',
          },
          {
            option: 'PFO Rank Taxi',
            cost: '~€90–€260+ metered/negotiated',
            duration: '45–135 min',
            pickup: 'Terminal rank outside gate',
            nightRule: 'Higher night meter + luggage fees',
          },
          {
            option: 'Airport Intercity Shuttle Bus',
            cost: '~€10–€25 per person (multiple tickets)',
            duration: '1.5–4.5 hours with changes',
            pickup: 'Roadside stops only',
            nightRule: 'No evening/night service to Limassol or east',
          },
        ],
        faqsHeading: 'Paphos Airport (PFO) Transfer FAQs',
        faqs: [
          {
            q: 'How fast is the drive from Paphos Airport (PFO) to Limassol?',
            a: 'Via the B6 link and A6 coastal motorway past Petra tou Romiou, arrival in Limassol takes ~45 minutes (63 km) for a fixed €75 per sedan.',
          },
          {
            q: 'Do you drive from Paphos Airport to Ayia Napa, Protaras, and Nicosia?',
            a: 'Yes! Direct cross-island sedans operate 24/7 via Limassol to Nicosia (€150), Ayia Napa (€180), Protaras (€190), Larnaca City (€135), and LCA Airport (€140).',
          },
          {
            q: 'What if my budget flight into Paphos lands after 23:00?',
            a: 'All flights are tracked live; night pickups between 23:00 and 07:00 carry only a flat +€10 supplement per leg.',
          },
          {
            q: 'Why does the calculator omit PFO → Paphos Town or Coral Bay?',
            a: 'Because our drivers dispatch from Limassol, we serve eastbound/cross-island PFO routes rather than short local hops within Paphos District.',
          },
        ],
        siblingHeading: 'Explore Other Cyprus Transfer Hubs',
        shortLabel: 'Paphos Airport (PFO) Transfers',
      },
      ru: {
        seoTitle: 'Трансфер из аэропорта Пафоса (PFO) 24/7 | Фиксированно €75–€190',
        metaDescription:
          'Частный трансфер из аэропорта Пафоса (PFO) в Лимассол (€75), Ларнаку (€135), аэропорт LCA (€140), Никосию (€150), Айя-Напу (€180) и Протарас (€190).',
        breadcrumb: 'Аэропорт Пафос (PFO)',
        badge: 'Хаб аэропорта Пафос (PFO) · Фикс в EUR',
        h1: 'Трансферы из аэропорта Пафос (PFO)',
        subtitle:
          'Круглосуточная встреча в терминале PFO и прямой выезд на трассу A6 без ожидания вечерних автобусов: Лимассол (€75), Ларнака (€135), аэропорт LCA (€140), Никосия (€150), Айя-Напа (€180) и Протарас (€190).',
        tableTitle: 'Все активные фиксированные маршруты из аэропорта Пафос (PFO)',
        guideHeading: 'Встреча в аэропорту Пафос (PFO) и отсутствие вечерних автобусов',
        guideParagraphs: [
          'Международный аэропорт Пафоса (PFO) расположен к юго-востоку от города — прямо на выезде на скоростную трассу A6 в сторону Лимассола. После получения багажа в компактном одноуровневом терминале водитель ждёт с табличкой на выходе из зоны прилёта.',
          'Вечерние и ночные междугородние автобусы из PFO не ходят, а прямых рейсов в Айя-Напу, Протарас или Никосию нет вовсе. Фиксированный трансфер доставляет до 4 пассажиров и 3 чемоданов прямо к отелю или вилле без пересадок и торга у стойки такси.',
        ],
        boundariesNote:
          'Границы маршрутов: из PFO мы возим на восток — в Лимассол, Ларнаку, аэропорт LCA, Никосию, Айя-Напу и Протарас. Короткие локальные поездки внутри округа Пафос (PFO → гавань Пафоса, Корал Бэй, Пейя, Полис) не выполняются.',
        comparisonHeading: 'Сравнение вариантов трансфера из аэропорта Пафоса (PFO)',
        comparisonRows: [
          {
            option: 'Индивидуальный седан (Фикс)',
            cost: '€75–€190 за автомобиль (до 4 мест)',
            duration: '45–130 мин напрямую по A6/A1',
            pickup: 'Встреча с табличкой в зале прилёта',
            nightRule: 'Единая доплата +€10 (23:00–07:00)',
          },
          {
            option: 'Местное такси у терминала PFO',
            cost: '~€90–€260+ по счётчику / договорное',
            duration: '45–135 мин',
            pickup: 'Стоянка за выходом',
            nightRule: 'Ночной счётчик + доплаты за багаж',
          },
          {
            option: 'Шаттлы и междугородние автобусы',
            cost: '~€10–€25 за 1 пассажира',
            duration: '1,5–4,5 часа с пересадками',
            pickup: 'Остановки без подвоза к отелям',
            nightRule: 'Вечером и ночью рейсов нет',
          },
        ],
        faqsHeading: 'Частые вопросы по аэропорту Пафоса (PFO)',
        faqs: [
          {
            q: 'Сколько времени занимает дорога из аэропорта Пафоса в Лимассол?',
            a: 'Около 45 минут (63 км) по скоростной прибрежной магистрали A6 мимо скалы Афродиты (Петра ту Ромиу); фиксированная цена — €75.',
          },
          {
            q: 'Есть ли прямые трансферы из Пафоса в Айя-Напу, Протарас и Никосию?',
            a: 'Да, круглосуточно через Лимассол: Никосия (€150), Айя-Напа (€180), Протарас (€190), Ларнака город (€135) и аэропорт LCA (€140).',
          },
          {
            q: 'Сколько стоит встреча ночного лоукост-рейса после 23:00?',
            a: 'К любому дневному тарифу добавляется только фиксированные +€10 (с 23:00 до 07:00); ожидание при задержке самолёта бесплатно.',
          },
          {
            q: 'Почему нет коротких поездок из PFO в центр Пафоса или Корал Бэй?',
            a: 'Наш автопарк базируется в Лимассоле и специализируется на трансферах в Лимассол и на восток острова.',
          },
        ],
        siblingHeading: 'Другие основные хабы трансфера',
        shortLabel: 'Аэропорт Пафос (PFO)',
      },
      de: {
        seoTitle: 'Flughafen Paphos (PFO) Transfer & Taxi 24/7 | Festpreis €75–€190',
        metaDescription:
          'Privater Transfer ab Flughafen Paphos (PFO) nach Limassol (€75), Larnaka (€135), LCA (€140), Nikosia (€150), Ayia Napa (€180) & Protaras (€190).',
        breadcrumb: 'Flughafen Paphos (PFO)',
        badge: 'PFO Airport Hub · Festpreise EUR',
        h1: 'Flughafen Paphos (PFO) Privattransfer & Taxi',
        subtitle:
          '24/7 Direktanbindung über die Küstenautobahn A6: Limassol (€75), Larnaka (€135), Flughafen LCA (€140), Nikosia (€150), Ayia Napa (€180) & Protaras (€190).',
        tableTitle: 'Alle aktiven Festpreis-Strecken ab Flughafen Paphos (PFO)',
        guideHeading: 'Abholung am Flughafen Paphos & Alternativen bei Nachtflügen',
        guideParagraphs: [
          'Der Flughafen Paphos (PFO) liegt südöstlich der Stadt direkt an der Ausfahrt zur Küstenautobahn A6 nach Limassol. Am übersichtlichen Terminal erwartet Sie Ihr Fahrer mit Namensschild direkt am Ausgang.',
          'Da abends keine Fernbusse nach Limassol, Nikosia, Ayia Napa oder Protaras mehr fahren, vermeiden Sie mit unserer Festpreis-Limousine stundenlange Wartezeiten und Umwege.',
        ],
        boundariesNote:
          'Hinweis zum Einsatzbereich: Ab PFO fahren wir ostwärts nach Limassol, Larnaka, LCA, Nikosia, Ayia Napa und Protaras. Kurze Lokalstrecken innerhalb von Paphos (PFO → Paphos Stadt/Coral Bay/Peyia/Polis) bieten wir nicht an.',
        comparisonHeading: 'Flughafen Paphos (PFO): Optionen im Vergleich',
        comparisonRows: [
          {
            option: 'Privater Festpreis-Transfer',
            cost: '€75–€190 pro Fahrzeug (bis 4 Pers.)',
            duration: '45–130 Min. nonstop',
            pickup: 'Empfang in der Ankunftshalle',
            nightRule: 'Pauschal +€10 (23:00–07:00)',
          },
          {
            option: 'PFO Terminal-Taxi',
            cost: 'ca. €90–€260+ (Taxameter)',
            duration: '45–135 Min.',
            pickup: 'Warteschlange am Terminal',
            nightRule: 'Nachttarif 2 + Gepäckzuschläge',
          },
          {
            option: 'Linienbus / Shuttle',
            cost: 'ca. €10–€25 pro Person',
            duration: '1,5–4,5 Std. mit Umstieg',
            pickup: 'Haltestellen abseits der Hotels',
            nightRule: 'Kein Nachtbetrieb ostwärts',
          },
        ],
        faqsHeading: 'FAQ zum Transfer ab Flughafen Paphos (PFO)',
        faqs: [
          {
            q: 'Wie schnell fährt man vom Flughafen Paphos nach Limassol?',
            a: 'Über B6 und A6 vorbei an Petra tou Romiou in ca. 45 Minuten (63 km) für fest €75 pro Limousine.',
          },
          {
            q: 'Fahren Sie von PFO auch nach Ayia Napa, Protaras und Nikosia?',
            a: 'Ja, rund um die Uhr über Limassol nach Nikosia (€150), Ayia Napa (€180), Protaras (€190), Larnaka (€135) und LCA (€140).',
          },
          {
            q: 'Was gilt bei späten Ankünften nach 23:00 Uhr in Paphos?',
            a: 'Wir überwachen Ihren Flug kostenlos; zwischen 23:00 und 07:00 Uhr gilt lediglich +€10 pauschaler Nachtaufschlag.',
          },
          {
            q: 'Warum sind Lokalstrecken wie PFO → Coral Bay nicht buchbar?',
            a: 'Unsere Flotte startet ab Limassol und übernimmt ab PFO Fahrten Richtung Limassol und Ostzypern.',
          },
        ],
        siblingHeading: 'Weitere Zypern-Transfer-Hubs',
        shortLabel: 'Flughafen Paphos (PFO)',
      },
      pl: {
        seoTitle: 'Lotnisko Pafos (PFO) Transfer i Taxi 24/7 | Stała cena €75–€190',
        metaDescription:
          'Prywatny transfer z lotniska Pafos (PFO) do Limassol (€75), Larnaki (€135), lotniska LCA (€140), Nikozji (€150), Ayia Napy (€180) i Protaras (€190).',
        breadcrumb: 'Lotnisko Pafos (PFO)',
        badge: 'Hub Lotnisko Pafos (PFO) · Stałe EUR',
        h1: 'Transfer z lotniska Pafos (PFO) — Stała cena',
        subtitle:
          'Odbiór 24/7 prosto z terminalu PFO trasą A6: Limassol (€75), Larnaka (€135), Lotnisko LCA (€140), Nikozja (€150), Ayia Napa (€180) i Protaras (€190).',
        tableTitle: 'Wszystkie aktywne trasy w stałej cenie z lotniska Pafos (PFO)',
        guideHeading: 'Odbiór na lotnisku Pafos i przejazd bez wieczornych luk w rozkładzie',
        guideParagraphs: [
          'Lotnisko w Pafos (PFO) leży na południowy wschód od miasta, przy samej drodze prowadzącej na autostradę A6 w kierunku Limassol. Kierowca czeka z tabliczką imienną zaraz za wyjściem z małego terminalu.',
          'Autobusy międzymiastowe z PFO kończą kursowanie wieczorem i nie jadą bezpośrednio do Ayia Napy czy Protaras. Rezerwując nasz sedan w stałej cenie, ruszasz spod hali przylotów bezpośrednio pod swój hotel.',
        ],
        boundariesNote:
          'Zakres działania: z PFO realizujemy przejazdy na wschód do Limassol, Larnaki, LCA, Nikozji, Ayia Napy oraz Protaras. Nie wykonujemy krótkich kursów w obrębie dystryktu Pafos (PFO → centrum Pafos/Coral Bay/Peyia/Polis).',
        comparisonHeading: 'Porównanie opcji transportu z lotniska Pafos (PFO)',
        comparisonRows: [
          {
            option: 'Prywatny sedan (Stała cena)',
            cost: '€75–€190 za samochód (do 4 os.)',
            duration: '45–130 min bezpośrednio A6/A1',
            pickup: 'Tabliczka na przylotach + pod drzwi',
            nightRule: 'Stałe +€10 (23:00–07:00)',
          },
          {
            option: 'Taksówka z postoju PFO',
            cost: 'ok. €90–€260+ (licznik)',
            duration: '45–135 min',
            pickup: 'Postój przed terminalem',
            nightRule: 'Wyższa taryfa nocna + bagaż',
          },
          {
            option: 'Autobusy lotniskowe',
            cost: 'ok. €10–€25 za pasażera',
            duration: '1,5–4,5 godz. z przesiadkami',
            pickup: 'Główne węzły przelotowe',
            nightRule: 'Brak nocnych połączeń na wschód',
          },
        ],
        faqsHeading: 'Najczęstsze pytania — Lotnisko Pafos (PFO)',
        faqs: [
          {
            q: 'Ile trwa przejazd z lotniska Pafos do Limassol?',
            a: 'Około 45 minut (63 km) trasą A6 w pobliżu Petra tou Romiou za stałe €75 za auto.',
          },
          {
            q: 'Czy organizujecie transfery z PFO do Ayia Napy, Protaras i Nikozji?',
            a: 'Tak, całodobowo przez Limassol: Nikozja (€150), Ayia Napa (€180), Protaras (€190), Larnaka (€135) i lotnisko LCA (€140).',
          },
          {
            q: 'Jak wygląda nocny odbiór na PFO po 23:00?',
            a: 'Śledzimy lot bezpłatnie, a między 23:00 a 07:00 doliczana jest wyłącznie stała dopłata +€10.',
          },
          {
            q: 'Dlaczego kalkulator nie zawiera krótkich tras PFO → Coral Bay czy miasto Pafos?',
            a: 'Nasza baza znajduje się w Limassol, dlatego z PFO obsługujemy trasy do Limassol i wschodniej części wyspy.',
          },
        ],
        siblingHeading: 'Pozostałe główne huby na Cyprze',
        shortLabel: 'Lotnisko Pafos (PFO)',
      },
      fr: {
        seoTitle: 'Transfert Aéroport Paphos (PFO) 24/7 | Tarif fixe 75 €–190 €',
        metaDescription:
          'Transfert privé depuis Paphos (PFO) vers Limassol (75 €), Larnaca (135 €), aéroport LCA (140 €), Nicosie (150 €), Ayia Napa (180 €) et Protaras (190 €).',
        breadcrumb: 'Aéroport de Paphos (PFO)',
        badge: 'Hub Aéroport Paphos (PFO) · Prix fixe EUR',
        h1: 'Transferts privés depuis Paphos (PFO)',
        subtitle:
          'Départs directs 24/7 par la côte A6 : Limassol (75 €), Larnaca Ville (135 €), aéroport LCA (140 €), Nicosie (150 €), Ayia Napa (180 €) et Protaras (190 €).',
        tableTitle: 'Tous les trajets actifs à tarif fixe depuis Paphos (PFO)',
        guideHeading: 'Prise en charge à PFO & absences de bus en soirée',
        guideParagraphs: [
          "L'aéroport de Paphos (PFO) se situe au sud-est de la ville face à l'accès autoroutier A6 vers Limassol. Dès votre sortie de l'unique terminal, votre chauffeur vous accueille avec votre pancarte nominative.",
          'Les bus interurbains cessent de circuler en soirée sans aucune liaison directe vers Ayia Napa, Protaras ou Nicosie : notre berline à prix fixe vous dépose directement à votre hôtel à toute heure.',
        ],
        boundariesNote:
          "Périmètre : depuis PFO, nous desservons Limassol, Larnaca Ville, LCA, Nicosie, Ayia Napa et Protaras. Les trajets courts exclusivement locaux dans le district de Paphos (PFO → Paphos, Coral Bay, Peyia, Polis) ne sont pas pris en charge.",
        comparisonHeading: 'Comparatif des transports depuis Paphos (PFO)',
        comparisonRows: [
          {
            option: 'Berline privée à tarif fixe',
            cost: '75 €–190 € par voiture (4 pax)',
            duration: '45–130 min directs via A6/A1',
            pickup: 'Accueil en salle des arrivées',
            nightRule: 'Forfait +10 € (23h00–07h00)',
          },
          {
            option: 'Taxi du terminal PFO',
            cost: '~90 €–260 €+ au compteur',
            duration: '45–135 min',
            pickup: 'Station extérieure PFO',
            nightRule: 'Majoration tarif nuit 2 + bagages',
          },
          {
            option: 'Bus / navettes publiques',
            cost: '~10 €–25 € par personne',
            duration: '1h30–4h30 avec changements',
            pickup: 'Arrêts routiers sans hôtels',
            nightRule: 'Aucun bus de nuit vers l’est',
          },
        ],
        faqsHeading: 'Questions fréquentes — Aéroport de Paphos (PFO)',
        faqs: [
          {
            q: 'Combien de temps faut-il entre Paphos Airport et Limassol ?',
            a: 'Environ 45 minutes (63 km) par l’autoroute A6 près de Petra tou Romiou pour 75 € fixes par berline.',
          },
          {
            q: 'Desservez-vous Ayia Napa, Protaras et Nicosie depuis PFO ?',
            a: 'Oui, 24h/24 via Limassol : Nicosie (150 €), Ayia Napa (180 €), Protaras (190 €), Larnaca (135 €) et LCA (140 €).',
          },
          {
            q: 'Quel supplément s’applique pour un vol atterrissant après 23h00 à PFO ?',
            a: 'Seulement +10 € fixes entre 23h00 et 07h00 ; attente gratuite grâce au suivi de vol.',
          },
          {
            q: 'Pourquoi les trajets PFO → centre de Paphos ou Coral Bay ne figurent-ils pas ici ?',
            a: 'Notre base étant à Limassol, nous concentrons nos liaisons PFO vers Limassol et l’est de l’île.',
          },
        ],
        siblingHeading: 'Autres pôles de transfert à Chypre',
        shortLabel: 'Aéroport Paphos (PFO)',
      },
      el: {
        seoTitle: 'Μεταφορά Αεροδρόμιο Πάφου (PFO) 24/7 | Σταθερά €75–€190',
        metaDescription:
          'Ιδιωτικές μεταφορές από το Αεροδρόμιο Πάφου (PFO) προς Λεμεσό (€75), Λάρνακα (€135), Αεροδρόμιο LCA (€140), Λευκωσία (€150), Αγία Νάπα (€180) & Πρωταρά (€190).',
        breadcrumb: 'Αεροδρόμιο Πάφου (PFO)',
        badge: 'Κόμβος Πάφου (PFO) · Σταθερό EUR',
        h1: 'Μεταφορές Αεροδρομίου Πάφου (PFO)',
        subtitle:
          'Απευθείας ιδιωτικές μεταφορές 24/7 μέσω παραλιακού A6: Λεμεσός (€75), Πόλη Λάρνακας (€135), Αεροδρόμιο LCA (€140), Λευκωσία (€150), Αγία Νάπα (€180) και Πρωταράς (€190).',
        tableTitle: 'Όλες οι ενεργές διαδρομές σταθερής τιμής από PFO',
        guideHeading: 'Παραλαβή στο Αεροδρόμιο Πάφου (PFO) & νυχτερινά δρομολόγια',
        guideParagraphs: [
          'Το Αεροδρόμιο Πάφου (PFO) βρίσκεται νοτιοανατολικά της πόλης με άμεση πρόσβαση στον A6 προς Λεμεσό. Αμέσως μετά τις αποσκευές σάς περιμένει ο οδηγός μας με ταμπέλα ονόματος.',
          'Το βράδυ δεν υπάρχουν υπεραστικά λεωφορεία για Λεμεσό, Λευκωσία, Αγία Νάπα ή Πρωταρά — με σταθερή προκράτηση αποφεύγετε αναμονή και αλλαγές λεωφορείων.',
        ],
        boundariesNote:
          'Όρια εξυπηρέτησης: από το PFO εκτελούμε διαδρομές ανατολικά προς Λεμεσό, Λάρνακα, LCA, Λευκωσία, Αγία Νάπα και Πρωταρά. Δεν αναλαμβάνουμε σύντομες τοπικές μεταφορές εντός επαρχίας Πάφου (PFO → Πάφος/Coral Bay/Πέγεια/Πόλις).',
        comparisonHeading: 'Σύγκριση επιλογών μεταφοράς από Αεροδρόμιο Πάφου (PFO)',
        comparisonRows: [
          {
            option: 'Ιδιωτικό Sedan (Σταθερή τιμή)',
            cost: '€75–€190 ανά όχημα (έως 4 άτομα)',
            duration: '45–130 λεπτά μέσω A6/A1',
            pickup: 'Υποδοχή στις αφίξεις PFO',
            nightRule: 'Ενιαίο +€10 (23:00–07:00)',
          },
          {
            option: 'Ταξί πιάτσας PFO',
            cost: '~€90–€260+ (ταξίμετρο)',
            duration: '45–135 λεπτά',
            pickup: 'Εξωτερική πιάτσα',
            nightRule: 'Νυχτερινό ανά χλμ + αποσκευές',
          },
          {
            option: 'Υπεραστικό λεωφορείο',
            cost: '~€10–€25 ανά άτομο',
            duration: '1,5–4,5 ώρες με αλλαγές',
            pickup: 'Κεντρικές στάσεις',
            nightRule: 'Χωρίς βραδινά δρομολόγια ανατολικά',
          },
        ],
        faqsHeading: 'Συχνές ερωτήσεις για Αεροδρόμιο Πάφου (PFO)',
        faqs: [
          {
            q: 'Πόσο διαρκεί η μεταφορά από το PFO στη Λεμεσό;',
            a: 'Περίπου 45 λεπτά (63 χλμ) μέσω B6 και A6 κοντά στην Πέτρα του Ρωμιού με σταθερή τιμή €75.',
          },
          {
            q: 'Εκτελείτε μεταφορές από Πάφο σε Αγία Νάπα, Πρωταρά και Λευκωσία;',
            a: 'Ναι, 24/7 μέσω Λεμεσού: Λευκωσία (€150), Αγία Νάπα (€180), Πρωταράς (€190), Λάρνακα (€135) και LCA (€140).',
          },
          {
            q: 'Τι ισχύει αν φτάνει η πτήση μου στο PFO μετά τις 23:00;',
            a: 'Παρακολουθούμε την πτήση δωρεάν και ισχύει μόνο ενιαίο νυχτερινό τέλος +€10 (23:00–07:00).',
          },
          {
            q: 'Γιατί δεν προσφέρονται σύντομες τοπικές διαδρομές PFO → Coral Bay ή Πάφος;',
            a: 'Επειδή εδρεύουμε στη Λεμεσό, εξυπηρετούμε από το PFO τη Λεμεσό και την ανατολική Κύπρο.',
          },
        ],
        siblingHeading: 'Άλλοι βασικοί κόμβοι μεταφοράς στην Κύπρο',
        shortLabel: 'Αεροδρόμιο Πάφου (PFO)',
      },
      it: {
        seoTitle: 'Transfer Aeroporto di Paphos (PFO) 24/7 | Prezzo fisso €75–€190',
        metaDescription:
          'Transfer privato da Paphos Airport (PFO) a Limassol (€75), Larnaca (€135), Aeroporto LCA (€140), Nicosia (€150), Ayia Napa (€180) e Protaras (€190).',
        breadcrumb: 'Aeroporto di Paphos (PFO)',
        badge: 'Hub Aeroporto Paphos (PFO) · Tariffe fisse',
        h1: 'Transfer privati dall’Aeroporto di Paphos (PFO)',
        subtitle:
          'Corsa diretta 24/7 sulla costiera A6: Limassol (€75), Larnaca (€135), Aeroporto LCA (€140), Nicosia (€150), Ayia Napa (€180) e Protaras (€190).',
        tableTitle: 'Tutte le tratte attive a tariffa fissa da Paphos (PFO)',
        guideHeading: 'Accoglienza a Paphos Airport e collegamenti serali garantiti',
        guideParagraphs: [
          'L’aeroporto di Paphos (PFO) si trova a sud-est della città lungo l’uscita autostradale A6 verso Limassol. All’uscita dall’unico terminal l’autista ti accoglie con cartello nominativo.',
          'Poiché gli autobus interurbani sospendono le corse di sera e non raggiungono direttamente Ayia Napa, Protaras o Nicosia, la nostra berlina fissa ti evita attese notturne e cambi valigia.',
        ],
        boundariesNote:
          'Ambito operativo: da PFO operiamo verso est (Limassol, Larnaca, LCA, Nicosia, Ayia Napa e Protaras). Non effettuiamo brevi corse locali interne al distretto di Paphos (PFO → Paphos/Coral Bay/Peyia/Polis).',
        comparisonHeading: 'Confronto opzioni di transfer da Paphos (PFO)',
        comparisonRows: [
          {
            option: 'Berlina privata a prezzo fisso',
            cost: '€75–€190 a veicolo (fino a 4 pax)',
            duration: '45–130 min diretti via A6/A1',
            pickup: 'Cartello agli arrivi PFO + porta a porta',
            nightRule: '+€10 fisso (23:00–07:00)',
          },
          {
            option: 'Taxi al terminal PFO',
            cost: '~€90–€260+ a tassametro',
            duration: '45–135 min',
            pickup: 'Posteggio esterno terminal',
            nightRule: 'Tariffa notturna 2 + bagagli',
          },
          {
            option: 'Bus / Navette interurbane',
            cost: '~€10–€25 a persona',
            duration: '1,5–4,5 ore con cambi',
            pickup: 'Fermate stradali senza hotel',
            nightRule: 'Nessuna corsa notturna verso est',
          },
        ],
        faqsHeading: 'FAQ sui transfer da Aeroporto di Paphos (PFO)',
        faqs: [
          {
            q: 'Quanto si impiega dall’aeroporto di Paphos a Limassol?',
            a: 'Circa 45 minuti (63 km) su B6 e A6 oltre Petra tou Romiou al prezzo bloccato di €75.',
          },
          {
            q: 'Collegate Paphos Airport con Ayia Napa, Protaras e Nicosia?',
            a: 'Sì, 24/7 via Limassol: Nicosia (€150), Ayia Napa (€180), Protaras (€190), Larnaca (€135) e LCA (€140).',
          },
          {
            q: 'Come funziona un arrivo notturno a PFO dopo le 23:00?',
            a: 'Monitoraggio volo gratuito e supplemento notturno fisso di +€10 (23:00–07:00).',
          },
          {
            q: 'Perché non ci sono brevi corse PFO → Coral Bay o Paphos centro?',
            a: 'Partendo da Limassol dedichiamo le tratte PFO ai collegamenti verso Limassol e la costa est.',
          },
        ],
        siblingHeading: 'Altri hub principali a Cipro',
        shortLabel: 'Aeroporto Paphos (PFO)',
      },
    },
  },

  limassol: {
    id: 'limassol',
    view: 'hub-limassol',
    defaultFrom: 'limassol',
    defaultTo: 'lca',
    image: '/images/limassol-route.webp',
    routeSlugs: [
      'larnaca-airport-to-limassol',
      'paphos-airport-to-limassol',
      'limassol-to-paphos',
      'limassol-to-larnaca-city',
      'limassol-to-coral-bay',
      'limassol-to-peyia',
      'limassol-to-ayia-napa',
      'limassol-to-nicosia',
    ],
    siblingHubs: ['lca', 'pfo'],
    locales: {
      en: {
        seoTitle: 'Limassol Transfers & Airport Taxi 24/7 | LCA €75 · PFO €75 · Intercity',
        metaDescription:
          'Local Limassol dispatch base (The Oval, Krinou 3): private transfers to Larnaca Airport (€75), Paphos Airport (€75), Paphos (€75), Larnaca (€75), Ayia Napa (€115) & Nicosia (€120).',
        breadcrumb: 'Limassol Transfers Hub',
        badge: 'Limassol Dispatch Base · The Oval',
        h1: 'Limassol Private Transfers & Airport Taxi Hub',
        subtitle:
          'Dispatched directly from Agios Athanasios, Limassol: fixed €75 airport runs to both LCA and PFO, plus nonstop intercity rides to Paphos (€75), Larnaca City (€75), Coral Bay (€110), Peyia (€115), Ayia Napa (€115), and Nicosia (€120).',
        tableTitle: 'All Active Fixed-Price Routes from Limassol',
        guideHeading: '10-Minute Early Pickup Across Limassol Hotels, Marina & Business Towers',
        guideParagraphs: [
          'With our operations office located at The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, our chauffeurs reach Limassol Marina, Germasogeia, Agios Tychonas beachfront resorts, and Zakaki within minutes—always arriving 10 minutes early to help load luggage.',
          'Because Limassol sits almost halfway between Larnaca International Airport (67 km east) and Paphos International Airport (63 km west), both airport transfers share an identical fixed €75 daytime sedan rate (€135 round trip with our automatic 10% return discount).',
        ],
        boundariesNote:
          'Return & round-trip tip: all 8 Limassol routes run identically in both directions. Choose Round trip in the calculator above to unlock 10% off your return ride back to Limassol.',
        comparisonHeading: 'Limassol Airport & Intercity Transfer Comparison',
        comparisonRows: [
          {
            option: 'Limassol Private Sedan (Fixed)',
            cost: '€75 airport / €75–€120 intercity',
            duration: '45–75 min door-to-door',
            pickup: 'Hotel, Marina, villa or office 10 min early',
            nightRule: 'Flat +€10 (23:00–07:00)',
          },
          {
            option: 'Local Metered Street Taxi',
            cost: '~€85–€160+ metered + extras',
            duration: '45–80 min',
            pickup: 'On-demand rank / phone dispatch',
            nightRule: 'Tariff 2 per-km meter surcharge (20:30–06:00)',
          },
          {
            option: 'Kapnos / Intercity Bus',
            cost: '~€4–€12 per passenger',
            duration: '1.5–2.5 hours via Havouzas / Old Port',
            pickup: 'Requires taxi to/from highway station',
            nightRule: 'Very early departures require private car',
          },
        ],
        faqsHeading: 'Limassol Transfers & Airport Pickup FAQs',
        faqs: [
          {
            q: 'Where is your Limassol transfer service based?',
            a: 'Our dispatch base is at The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, serving all Limassol hotels, Limassol Marina, Germasogeia, Agios Tychonas, and Zakaki 24/7.',
          },
          {
            q: 'Does a transfer from Limassol cost €75 to both Larnaca (LCA) and Paphos (PFO) airports?',
            a: 'Yes! Daytime sedan transfers from Limassol to LCA (67 km) and PFO (63 km) are both fixed at €75 (+€10 flat night rate between 23:00 and 07:00).',
          },
          {
            q: 'How early should I schedule Limassol departure pickup for my flight?',
            a: 'We generally suggest departing Limassol 3 hours before international takeoff (around 50 min to LCA or 45 min to PFO, plus 2 hours airport buffer).',
          },
          {
            q: 'Do you cover intercity rides from Limassol to Nicosia, Paphos, and Ayia Napa?',
            a: 'Yes: direct door-to-door sedans run 24/7 to Paphos (€75), Larnaca City (€75), Coral Bay (€110), Peyia (€115), Ayia Napa (€115), and Nicosia (€120).',
          },
        ],
        siblingHeading: 'Explore Cyprus Airport Transfer Hubs',
        shortLabel: 'Limassol Transfers Hub',
      },
      ru: {
        seoTitle: 'Трансфер и такси из Лимассола 24/7 | LCA €75 · PFO €75 · Межгород',
        metaDescription:
          'База в Лимассоле (The Oval, Krinou 3): трансфер в аэропорт Ларнака €75, Пафос PFO €75, город Пафос €75, Ларнака €75, Айя-Напа €115, Никосия €120.',
        breadcrumb: 'Лимассол (База)',
        badge: 'Диспетчерская в Лимассоле · The Oval',
        h1: 'Трансферы и такси из Лимассола 24/7',
        subtitle:
          'Прямая подача с нашей базы в Агиос Афанасиос (Лимассол): оба аэропорта LCA и PFO по €75, а также межгород в Пафос (€75), Ларнаку (€75), Корал Бэй (€110), Пейю (€115), Айя-Напу (€115) и Никосию (€120).',
        tableTitle: 'Все активные фиксированные маршруты из Лимассола',
        guideHeading: 'Подача за 10 минут до времени к отелям, Марине и бизнес-центрам Лимассола',
        guideParagraphs: [
          'Наш диспетчерский офис находится по адресу The Oval, Krinou 3, Agios Athanasios, 4103 Limassol. Водитель подаёт седан за 10 минут до назначенного времени к Лимассол Марине, курортам Агиос Тихонас, в Гермасойю или Закаки и помогает с багажом.',
          'Лимассол расположен посередине между аэропортами Ларнаки (67 км на восток) и Пафоса (63 км на запад), поэтому оба аэропортовых маршрута стоят одинаково — €75 днём (или €135 за обе стороны с учётом скидки 10% на возврат).',
        ],
        boundariesNote:
          'Выгоднее туда-обратно: все 8 лимассольских направлений работают в обе стороны, а выбор опции «Туда и обратно» автоматически даёт скидку 10% на обратный путь.',
        comparisonHeading: 'Сравнение вариантов трансфера из Лимассола',
        comparisonRows: [
          {
            option: 'Частный седан из Лимассола (Фикс)',
            cost: '€75 аэропорты / €75–€120 межгород',
            duration: '45–75 мин от подъезда до двери',
            pickup: 'Подача к дому, отелю или офису за 10 мин',
            nightRule: 'Фикс +€10 (23:00–07:00)',
          },
          {
            option: 'Уличное такси по счётчику',
            cost: '~€85–€160+ по счётчику',
            duration: '45–80 мин',
            pickup: 'Стоянка или вызов диспетчера',
            nightRule: 'Ночной Тариф 2 за километр (20:30–06:00)',
          },
          {
            option: 'Автобусы Kapnos / Intercity',
            cost: '~€4–€12 за 1 билет',
            duration: '1,5–2,5 часа через станцию Havouzas',
            pickup: 'Нужно добираться до автостанции на такси',
            nightRule: 'На ранние вылеты автобусы не подходят',
          },
        ],
        faqsHeading: 'Частые вопросы о трансферах из Лимассола',
        faqs: [
          {
            q: 'Где находится ваша диспетчерская база в Лимассоле?',
            a: 'Наш офис расположен в центре The Oval, Krinou 3, Agios Athanasios, 4103 Limassol; обслуживаем все районы от Марины и Гермасойи до Агиос Тихонас и Закаки.',
          },
          {
            q: 'Стоит ли дорога из Лимассола €75 в оба аэропорта — и в Ларнаку, и в Пафос?',
            a: 'Да: в дневное время оба аэропортовых направления (LCA 67 км и PFO 63 км) стоят €75 за седан (+€10 с 23:00 до 07:00).',
          },
          {
            q: 'За сколько часов до вылета лучше выезжать из Лимассола?',
            a: 'Оптимально заказывать машину за 3 часа до международного вылета: около 45–50 минут на дорогу и около 2 часов запаса в терминале.',
          },
          {
            q: 'Выполняете ли вы междугородние поездки из Лимассола в Никосию, Пафос и Айя-Напу?',
            a: 'Да: круглосуточно от двери до двери в Пафос (€75), Ларнаку (€75), Корал Бэй (€110), Пейю (€115), Айя-Напу (€115) и Никосию (€120).',
          },
        ],
        siblingHeading: 'Хабы аэропортов Ларнака и Пафос',
        shortLabel: 'Лимассол (все направления)',
      },
      de: {
        seoTitle: 'Limassol Transfer & Flughafentaxi 24/7 | LCA €75 · PFO €75',
        metaDescription:
          'Zentrale Basis in Limassol (The Oval, Krinou 3): Festpreis €75 nach Larnaka (LCA) & Paphos (PFO), Paphos Stadt €75, Larnaka €75, Ayia Napa €115 & Nikosia €120.',
        breadcrumb: 'Limassol Transfers',
        badge: 'Basis Limassol · The Oval, Krinou 3',
        h1: 'Limassol Privattransfers & Flughafentaxi-Hub',
        subtitle:
          'Direkt ab Agios Athanasios (Limassol): Festpreis €75 zu beiden Flughäfen (LCA & PFO) sowie nach Paphos (€75), Larnaka (€75), Coral Bay (€110), Peyia (€115), Ayia Napa (€115) und Nikosia (€120).',
        tableTitle: 'Alle aktiven Festpreis-Strecken ab Limassol',
        guideHeading: 'Abholung 10 Minuten vor Abfahrt an Hotels, Marina & Büros in Limassol',
        guideParagraphs: [
          'Von unserem Büro in The Oval, Krinou 3, Agios Athanasios erreichen unsere Fahrer Limassol Marina, Germasogeia, Agios Tychonas und Zakaki in wenigen Minuten und stehen 10 Minuten vor Abfahrt bereit.',
          'Da Limassol genau zwischen Larnaka (67 km östlich) und Paphos (63 km westlich) liegt, kosten beide Flughafentransfers tagsüber einheitlich €75 (€135 gesamt mit 10 % Rückfahrtrabatt).',
        ],
        boundariesNote:
          'Tipp: Alle 8 Strecken ab Limassol gelten in beide Richtungen — bei Buchung von Hin- und Rückfahrt sparen Sie automatisch 10 % auf die Rückfahrt.',
        comparisonHeading: 'Limassol Transfer-Optionen im Vergleich',
        comparisonRows: [
          {
            option: 'Privat-Limousine ab Limassol',
            cost: '€75 Flughafen / €75–€120 Inselweit',
            duration: '45–75 Min. direkt',
            pickup: 'Abholung an Hotel, Marina oder Büro',
            nightRule: 'Pauschal +€10 (23:00–07:00)',
          },
          {
            option: 'Straßentaxi nach Taxameter',
            cost: 'ca. €85–€160+ inkl. Zuschläge',
            duration: '45–80 Min.',
            pickup: 'Taxi-Stand oder telefonisch',
            nightRule: 'Tarif 2 pro km (20:30–06:00)',
          },
          {
            option: 'Kapnos-Shuttle / Überlandbus',
            cost: 'ca. €4–€12 pro Person',
            duration: '1,5–2,5 Std. via Station Havouzas',
            pickup: 'Zusatzfahrt zum Busknoten nötig',
            nightRule: 'Nicht geeignet für frühe Abflüge',
          },
        ],
        faqsHeading: 'FAQ zu Transfers ab Limassol',
        faqs: [
          {
            q: 'Wo befindet sich Ihr Standort in Limassol?',
            a: 'The Oval, Krinou 3, Agios Athanasios, 4103 Limassol — mit schneller Anfahrt zu Marina, Altstadt, Germasogeia, Agios Tychonas und Zakaki.',
          },
          {
            q: 'Kosten Transfers ab Limassol nach LCA und PFO wirklich jeweils €75?',
            a: 'Ja, tagsüber gilt der Festpreis €75 sowohl für Larnaka (67 km) als auch für Paphos (63 km); nachts (23:00–07:00) kommen +€10 hinzu.',
          },
          {
            q: 'Wann sollte ich in Limassol zum Flughafen abfahren?',
            a: 'Empfohlen werden ca. 3 Stunden vor Abflug (ca. 45–50 Min. Autobahnfahrt plus 2 Std. Check-in/Sicherheit).',
          },
          {
            q: 'Fahren Sie ab Limassol auch nach Nikosia, Ayia Napa und Paphos?',
            a: 'Ja: rund um die Uhr Tür-zu-Tür nach Paphos (€75), Larnaka (€75), Coral Bay (€110), Peyia (€115), Ayia Napa (€115) und Nikosia (€120).',
          },
        ],
        siblingHeading: 'Flughafen-Transfer-Hubs entdecken',
        shortLabel: 'Limassol Transfers',
      },
      pl: {
        seoTitle: 'Transfery Limassol i Taxi na Lotniska 24/7 | LCA €75 · PFO €75',
        metaDescription:
          'Baza w Limassol (The Oval, Krinou 3): stałe ceny na lotnisko Larnaka €75, lotnisko Pafos €75, do Pafos €75, Larnaki €75, Ayia Napy €115 i Nikozji €120.',
        breadcrumb: 'Transfery z Limassol',
        badge: 'Baza w Limassol · The Oval',
        h1: 'Transfery prywatne z Limassol i na lotniska 24/7',
        subtitle:
          'Bezpośredni wyjazd z Agios Athanasios (Limassol): oba lotniska LCA i PFO po €75 oraz trasy międzymiastowe do Pafos (€75), Larnaki (€75), Coral Bay (€110), Peyi (€115), Ayia Napy (€115) i Nikozji (€120).',
        tableTitle: 'Wszystkie aktywne trasy w stałej cenie z Limassol',
        guideHeading: 'Odbiór 10 minut przed czasem w hotelach, marinie i biurach Limassol',
        guideParagraphs: [
          'Z naszej bazy przy The Oval, Krinou 3, Agios Athanasios kierowcy w kilka minut docierają do Limassol Marina, Germasogeii, hoteli w Agios Tychonas i Zakaki — zawsze podjeżdżając 10 minut wcześniej.',
          'Ponieważ Limassol leży w połowie drogi między Larnaką (67 km) a Pafos (63 km), przejazdy na oba lotniska kosztują tyle samo: €75 w dzień (lub €135 w obie strony z 10% zniżką na powrót).',
        ],
        boundariesNote:
          'Wskazówka: wszystkie 8 tras z Limassol działa w obie strony; wybierając wariant „W obie strony”, automatycznie zyskujesz 10% rabatu na powrót.',
        comparisonHeading: 'Porównanie opcji podróży z Limassol',
        comparisonRows: [
          {
            option: 'Prywatny sedan z Limassol (Stała cena)',
            cost: '€75 lotniska / €75–€120 miasta',
            duration: '45–75 min spod drzwi do drzwi',
            pickup: 'Podjazd 10 min wcześniej pod adres',
            nightRule: 'Stałe +€10 (23:00–07:00)',
          },
          {
            option: 'Miejska taksówka z licznikiem',
            cost: 'ok. €85–€160+ wg licznika',
            duration: '45–80 min',
            pickup: 'Postój lub telefon',
            nightRule: 'Taryfa nocna 2 za km (20:30–06:00)',
          },
          {
            option: 'Autobus Kapnos / Intercity',
            cost: 'ok. €4–€12 za bilet',
            duration: '1,5–2,5 godz. przez węzeł Havouzas',
            pickup: 'Konieczny dojazd taxi na stację',
            nightRule: 'Brak kursów na wczesne wyloty',
          },
        ],
        faqsHeading: 'Pytania o transfery z Limassol',
        faqs: [
          {
            q: 'Gdzie mieści się siedziba w Limassol?',
            a: 'Przy The Oval, Krinou 3, Agios Athanasios, 4103 Limassol — obsługujemy Marinę, Germasogeię, Agios Tychonas i Zakaki całą dobę.',
          },
          {
            q: 'Czy wyjazd z Limassol kosztuje €75 zarówno na LCA, jak i na PFO?',
            a: 'Tak, w dzień przejazdy na oba lotniska kosztują równo €75 za cały sedan (+€10 między 23:00 a 07:00).',
          },
          {
            q: 'Z jakim wyprzedzeniem zamówić odbiór z Limassol przed wylotem?',
            a: 'Zazwyczaj 3 godziny przed odlotem międzynarodowym (ok. 45–50 min jazdy autostradą plus 2 godz. na odprawę).',
          },
          {
            q: 'Czy kursujecie z Limassol do Nikozji, Ayia Napy i Pafos?',
            a: 'Tak: Pafos (€75), Larnaka (€75), Coral Bay (€110), Peyia (€115), Ayia Napa (€115) oraz Nikozja (€120) pod sam adres.',
          },
        ],
        siblingHeading: 'Sprawdź huby lotnisk Larnaka i Pafos',
        shortLabel: 'Transfery Limassol',
      },
      fr: {
        seoTitle: 'Transferts Limassol & Taxi Aéroports 24/7 | LCA 75 € · PFO 75 €',
        metaDescription:
          'Base à Limassol (The Oval, Krinou 3) : tarifs fixes Larnaca LCA (75 €), Paphos PFO (75 €), Paphos (75 €), Larnaca (75 €), Ayia Napa (115 €) & Nicosie (120 €).',
        breadcrumb: 'Transferts Limassol',
        badge: 'Base de Limassol · The Oval',
        h1: 'Transferts privés depuis Limassol & Aéroports 24/7',
        subtitle:
          'Départ depuis Agios Athanasios (Limassol) : 75 € fixes vers les deux aéroports (LCA & PFO), plus trajets directs vers Paphos (75 €), Larnaca (75 €), Coral Bay (110 €), Peyia (115 €), Ayia Napa (115 €) et Nicosie (120 €).',
        tableTitle: 'Tous les trajets actifs à prix fixe au départ de Limassol',
        guideHeading: 'Prise en charge 10 min en avance devant hôtels, Marina et bureaux',
        guideParagraphs: [
          'Depuis notre bureau situé à The Oval, Krinou 3, Agios Athanasios, nos chauffeurs rejoignent en quelques minutes Limassol Marina, Germasogeia, Agios Tychonas et Zakaki, avec une arrivée 10 minutes avant l’horaire prévu.',
          'Située à mi-distance entre Larnaca (67 km) et Paphos (63 km), Limassol bénéficie du même tarif unique de 75 € vers les deux aéroports (135 € aller-retour en journée avec −10 % sur le retour).',
        ],
        boundariesNote:
          'Astuce aller-retour : nos 8 liaisons depuis Limassol fonctionnent dans les deux sens avec −10 % automatiques sur le trajet retour.',
        comparisonHeading: 'Comparatif des trajets au départ de Limassol',
        comparisonRows: [
          {
            option: 'Berline privée depuis Limassol',
            cost: '75 € aéroports / 75 €–120 € villes',
            duration: '45–75 min porte-à-porte',
            pickup: 'Devant hôtel, Marina ou bureau (10 min avant)',
            nightRule: 'Forfait +10 € (23h00–07h00)',
          },
          {
            option: 'Taxi local au compteur',
            cost: '~85 €–160 €+ compteur',
            duration: '45–80 min',
            pickup: 'Station ou appel local',
            nightRule: 'Tarif nuit 2 majoré au km (20h30–06h00)',
          },
          {
            option: 'Navette Kapnos / Bus public',
            cost: '~4 €–12 € par billet',
            duration: '1h30–2h30 via station Havouzas',
            pickup: 'Taxi requis jusqu’à la station routière',
            nightRule: 'Peu adapté aux départs matinaux',
          },
        ],
        faqsHeading: 'FAQ — Transferts depuis Limassol',
        faqs: [
          {
            q: 'Où est basée votre équipe à Limassol ?',
            a: 'À The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, desservant 24h/24 la Marina, Germasogeia, Agios Tychonas et Zakaki.',
          },
          {
            q: 'Le tarif depuis Limassol est-il de 75 € pour LCA et PFO ?',
            a: 'Oui, en journée les deux transferts aéroport (Larnaca 67 km et Paphos 63 km) sont fixés à 75 € (+10 € la nuit entre 23h00 et 07h00).',
          },
          {
            q: 'Combien de temps avant mon vol dois-je partir de Limassol ?',
            a: 'Nous conseillons un départ 3 heures avant le décollage international (~45–50 min de trajet + 2 h à l’aéroport).',
          },
          {
            q: 'Assurez-vous aussi Nicosie, Ayia Napa et Paphos depuis Limassol ?',
            a: 'Oui : Paphos (75 €), Larnaca (75 €), Coral Bay (110 €), Peyia (115 €), Ayia Napa (115 €) et Nicosie (120 €).',
          },
        ],
        siblingHeading: 'Voir les hubs aéroports Larnaca & Paphos',
        shortLabel: 'Transferts Limassol',
      },
      el: {
        seoTitle: 'Μεταφορές Λεμεσός & Ταξί Αεροδρομίου 24/7 | LCA €75 · PFO €75',
        metaDescription:
          'Βάση στη Λεμεσό (The Oval, Krinou 3): σταθερές τιμές για Αεροδρόμιο Λάρνακας €75, Πάφου PFO €75, Πάφο €75, Λάρνακα €75, Αγία Νάπα €115 & Λευκωσία €120.',
        breadcrumb: 'Μεταφορές Λεμεσός',
        badge: 'Έδρα Λεμεσού · The Oval',
        h1: 'Ιδιωτικές Μεταφορές & Ταξί Αεροδρομίου Λεμεσού',
        subtitle:
          'Απευθείας από τον Άγιο Αθανάσιο (Λεμεσός): €75 προς τα δύο αεροδρόμια (LCA & PFO) και υπεραστικές μεταφορές σε Πάφο (€75), Λάρνακα (€75), Coral Bay (€110), Πέγεια (€115), Αγία Νάπα (€115) και Λευκωσία (€120).',
        tableTitle: 'Όλες οι ενεργές διαδρομές σταθερής τιμής από Λεμεσό',
        guideHeading: 'Άφιξη 10 λεπτά νωρίτερα σε ξενοδοχεία, Μαρίνα και γραφεία Λεμεσού',
        guideParagraphs: [
          'Με έδρα το The Oval, Krinou 3, Άγιος Αθανάσιος, 4103 Λεμεσός, οι οδηγοί μας φτάνουν άμεσα σε Μαρίνα Λεμεσού, Γερμασόγεια, Άγιο Τύχωνα και Ζακάκι, 10 λεπτά πριν από την ώρα αναχώρησης.',
          'Επειδή η Λεμεσός απέχει σχεδόν εξίσου από τη Λάρνακα (67 χλμ) και την Πάφο (63 χλμ), και τα δύο αεροδρόμια κοστίζουν €75 την ημέρα (€135 μετ’ επιστροφής με έκπτωση 10% στην επιστροφή).',
        ],
        boundariesNote:
          'Συμβουλή επιστροφής: και οι 8 διαδρομές της Λεμεσού ισχύουν αμφίδρομα — επιλέξτε «Μετ’ επιστροφής» για αυτόματη έκπτωση 10% στην επιστροφή.',
        comparisonHeading: 'Σύγκριση επιλογών μετακίνησης από Λεμεσό',
        comparisonRows: [
          {
            option: 'Ιδιωτικό Sedan Λεμεσού (Σταθερό)',
            cost: '€75 αεροδρόμια / €75–€120 πόλεις',
            duration: '45–75 λεπτά πόρτα-πόρτα',
            pickup: 'Άφιξη 10 λεπτά νωρίτερα στη διεύθυνση',
            nightRule: 'Ενιαίο +€10 (23:00–07:00)',
          },
          {
            option: 'Τοπικό ταξί με ταξίμετρο',
            cost: '~€85–€160+ (ταξίμετρο)',
            duration: '45–80 λεπτά',
            pickup: 'Πιάτσα ή κλήση',
            nightRule: 'Νυχτερινή χρέωση ανά χλμ (20:30–06:00)',
          },
          {
            option: 'Λεωφορεία Kapnos / Intercity',
            cost: '~€4–€12 ανά εισιτήριο',
            duration: '1,5–2,5 ώρες μέσω Χαβούζας',
            pickup: 'Απαιτεί ταξί έως τον σταθμό',
            nightRule: 'Ακατάλληλο για πολύ πρωινές πτήσεις',
          },
        ],
        faqsHeading: 'Συχνές ερωτήσεις για μεταφορές από Λεμεσό',
        faqs: [
          {
            q: 'Πού βρίσκεται η βάση σας στη Λεμεσό;',
            a: 'Στο The Oval, Krinou 3, Άγιος Αθανάσιος, 4103 Λεμεσός, καλύπτοντας 24/7 Μαρίνα, Γερμασόγεια, Άγιο Τύχωνα και Ζακάκι.',
          },
          {
            q: 'Κοστίζει €75 από Λεμεσό τόσο προς Λάρνακα (LCA) όσο και προς Πάφο (PFO);',
            a: 'Ναι, την ημέρα και τα δύο αεροδρόμια (LCA 67 χλμ, PFO 63 χλμ) κοστίζουν €75 (+€10 τη νύχτα 23:00–07:00).',
          },
          {
            q: 'Πόση ώρα πριν την πτήση να κλείσω αναχώρηση από Λεμεσό;',
            a: 'Συνιστούμε 3 ώρες πριν από διεθνή αναχώρηση (~45–50 λεπτά οδήγησης + 2 ώρες στο αεροδρόμιο).',
          },
          {
            q: 'Καλύπτετε διαδρομές από Λεμεσό προς Λευκωσία, Αγία Νάπα και Πάφο;',
            a: 'Ναι: Πάφος (€75), Λάρνακα (€75), Coral Bay (€110), Πέγεια (€115), Αγία Νάπα (€115) και Λευκωσία (€120).',
          },
        ],
        siblingHeading: 'Δείτε τους κόμβους αεροδρομίων LCA & PFO',
        shortLabel: 'Μεταφορές Λεμεσός',
      },
      it: {
        seoTitle: 'Transfer Limassol & Taxi Aeroporti 24/7 | LCA €75 · PFO €75',
        metaDescription:
          'Sede operativa a Limassol (The Oval, Krinou 3): tariffe fisse Larnaca LCA €75, Paphos PFO €75, Paphos €75, Larnaca €75, Ayia Napa €115 & Nicosia €120.',
        breadcrumb: 'Transfer Limassol',
        badge: 'Base di Limassol · The Oval',
        h1: 'Transfer privati e Taxi Aeroporti da Limassol 24/7',
        subtitle:
          'In partenza da Agios Athanasios (Limassol): €75 fissi verso entrambi gli aeroporti (LCA e PFO) e collegamenti diretti per Paphos (€75), Larnaca (€75), Coral Bay (€110), Peyia (€115), Ayia Napa (€115) e Nicosia (€120).',
        tableTitle: 'Tutte le tratte attive a tariffa fissa da Limassol',
        guideHeading: 'Ritiro con 10 minuti d’anticipo presso hotel, Marina e uffici a Limassol',
        guideParagraphs: [
          'Dalla sede presso The Oval, Krinou 3, Agios Athanasios raggiungiamo rapidamente Limassol Marina, Germasogeia, Agios Tychonas e Zakaki arrivando con 10 minuti di anticipo rispetto all’orario concordato.',
          'Trovandosi a metà strada fra Larnaca (67 km) e Paphos (63 km), Limassol gode della stessa tariffa fissa diurna di €75 verso entrambi gli aeroporti (€135 totali andata e ritorno con lo sconto del 10%).',
        ],
        boundariesNote:
          'Consiglio sul rientro: tutte le 8 tratte di Limassol operano in entrambe le direzioni e applicano lo sconto automatico del 10% prenotando andata e ritorno.',
        comparisonHeading: 'Confronto opzioni di trasporto da Limassol',
        comparisonRows: [
          {
            option: 'Berlina privata da Limassol (Fisso)',
            cost: '€75 aeroporti / €75–€120 intercity',
            duration: '45–75 min porta a porta',
            pickup: 'Ritiro sotto hotel, Marina o ufficio',
            nightRule: '+€10 fisso (23:00–07:00)',
          },
          {
            option: 'Taxi locale a tassametro',
            cost: '~€85–€160+ a tassametro',
            duration: '45–80 min',
            pickup: 'Posteggio o chiamata',
            nightRule: 'Tariffa 2 a km (20:30–06:00)',
          },
          {
            option: 'Navetta Kapnos / Bus pubblico',
            cost: '~€4–€12 a biglietto',
            duration: '1,5–2,5 ore via stazione Havouzas',
            pickup: 'Serve un taxi per l’hub stradale',
            nightRule: 'Scomodo per voli mattutini o notturni',
          },
        ],
        faqsHeading: 'FAQ sui transfer da Limassol',
        faqs: [
          {
            q: 'Dove si trova la vostra sede operativa a Limassol?',
            a: 'Presso The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, coprendo 24/7 Marina, Germasogeia, Agios Tychonas e Zakaki.',
          },
          {
            q: 'Il prezzo da Limassol è davvero €75 sia per Larnaca (LCA) che per Paphos (PFO)?',
            a: 'Sì, di giorno entrambi gli aeroporti (67 km LCA, 63 km PFO) costano €75 fissi a berlina (+€10 notturni dalle 23:00 alle 07:00).',
          },
          {
            q: 'Quanto prima del volo conviene partire da Limassol?',
            a: 'Consigliamo di partire 3 ore prima del decollo internazionale (~45–50 minuti in autostrada più 2 ore in aeroporto).',
          },
          {
            q: 'Collegate Limassol anche a Nicosia, Ayia Napa e Paphos?',
            a: 'Sì: corse porta a porta 24/7 per Paphos (€75), Larnaca (€75), Coral Bay (€110), Peyia (€115), Ayia Napa (€115) e Nicosia (€120).',
          },
        ],
        siblingHeading: 'Esplora gli hub aeroportuali LCA e PFO',
        shortLabel: 'Transfer Limassol',
      },
    },
  },
};

export function getHubConfig(hubId: HubId): HubConfig {
  return HUB_PAGES[hubId];
}

export function getHubLocalized(hubId: HubId, lang: Language): HubLocalizedContent {
  const cfg = HUB_PAGES[hubId];
  return cfg.locales[lang] || cfg.locales.en;
}
