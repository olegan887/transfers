export interface RouteFaqItem {
  q: string;
  a: string;
}

export interface AirportRouteLocalized {
  title: string;
  metaDescription: string;
  h1: string;
  subtitle: string;
  highlights: string[];
  pickupGuide: string;
  faqs: RouteFaqItem[];
}

export type RouteCategory = 'LCA' | 'PFO' | 'LIMASSOL' | 'INTERCITY';

export interface AirportRoutePage {
  slug: string;
  fromId: string;
  toId: string;
  category: RouteCategory;
  airportCode?: 'LCA' | 'PFO';
  distanceKm: number;
  durationMin: number;
  basePrice: number;
  image: string;
  relatedSlugs: string[];
  en: AirportRouteLocalized;
  ru: AirportRouteLocalized;
}

interface RouteSeed {
  slug: string;
  fromId: string;
  toId: string;
  distanceKm: number;
  durationMin: number;
  basePrice: number;
  enFrom: string;
  enTo: string;
  ruFrom: string;
  ruFromGen: string;
  ruToAcc: string;
  ruToLoc: string;
  highway: string;
  image: string;
  relatedSlugs: string[];
}

const ROUTE_SEEDS: RouteSeed[] = [
  // === 1. Larnaca Airport (LCA) Active Routes ===
  {
    slug: 'larnaca-airport-to-limassol',
    fromId: 'lca',
    toId: 'limassol',
    distanceKm: 67,
    durationMin: 50,
    basePrice: 75,
    enFrom: 'Larnaca Airport (LCA)',
    enTo: 'Limassol',
    ruFrom: 'Аэропорт Ларнака (LCA)',
    ruFromGen: 'аэропорта Ларнаки (LCA)',
    ruToAcc: 'Лимассол',
    ruToLoc: 'Лимассоле',
    highway: 'A5 & A1',
    image: '/images/limassol-route.webp',
    relatedSlugs: ['paphos-airport-to-limassol', 'larnaca-airport-to-paphos', 'limassol-to-larnaca-city'],
  },
  {
    slug: 'larnaca-airport-to-paphos',
    fromId: 'lca',
    toId: 'paphos-city',
    distanceKm: 135,
    durationMin: 90,
    basePrice: 135,
    enFrom: 'Larnaca Airport (LCA)',
    enTo: 'Paphos',
    ruFrom: 'Аэропорт Ларнака (LCA)',
    ruFromGen: 'аэропорта Ларнаки (LCA)',
    ruToAcc: 'Пафос',
    ruToLoc: 'Пафосе',
    highway: 'A5, A1 & A6 via Limassol',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['larnaca-airport-to-coral-bay', 'limassol-to-paphos', 'larnaca-airport-to-limassol'],
  },
  {
    slug: 'larnaca-airport-to-paphos-airport',
    fromId: 'lca',
    toId: 'pfo',
    distanceKm: 128,
    durationMin: 85,
    basePrice: 140,
    enFrom: 'Larnaca Airport (LCA)',
    enTo: 'Paphos Airport (PFO)',
    ruFrom: 'Аэропорт Ларнака (LCA)',
    ruFromGen: 'аэропорта Ларнаки (LCA)',
    ruToAcc: 'аэропорт Пафос (PFO)',
    ruToLoc: 'аэропорту Пафос',
    highway: 'A5, A1 & A6 via Limassol',
    image: '/images/airport-transfer.webp',
    relatedSlugs: ['larnaca-airport-to-limassol', 'paphos-airport-to-limassol', 'larnaca-airport-to-paphos'],
  },
  {
    slug: 'larnaca-airport-to-coral-bay',
    fromId: 'lca',
    toId: 'coral-bay',
    distanceKm: 148,
    durationMin: 100,
    basePrice: 150,
    enFrom: 'Larnaca Airport (LCA)',
    enTo: 'Coral Bay',
    ruFrom: 'Аэропорт Ларнака (LCA)',
    ruFromGen: 'аэропорта Ларнаки (LCA)',
    ruToAcc: 'Корал Бэй',
    ruToLoc: 'Корал Бэй',
    highway: 'A5, A1 & A6 via Limassol',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['larnaca-airport-to-paphos', 'larnaca-airport-to-peyia', 'limassol-to-coral-bay'],
  },
  {
    slug: 'larnaca-airport-to-peyia',
    fromId: 'lca',
    toId: 'peyia',
    distanceKm: 152,
    durationMin: 105,
    basePrice: 155,
    enFrom: 'Larnaca Airport (LCA)',
    enTo: 'Peyia',
    ruFrom: 'Аэропорт Ларнака (LCA)',
    ruFromGen: 'аэропорта Ларнаки (LCA)',
    ruToAcc: 'Пейю',
    ruToLoc: 'Пейе',
    highway: 'A5, A1 & A6 via Limassol',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['larnaca-airport-to-coral-bay', 'larnaca-airport-to-polis', 'limassol-to-peyia'],
  },
  {
    slug: 'larnaca-airport-to-polis',
    fromId: 'lca',
    toId: 'polis',
    distanceKm: 170,
    durationMin: 120,
    basePrice: 180,
    enFrom: 'Larnaca Airport (LCA)',
    enTo: 'Polis Chrysochous',
    ruFrom: 'Аэропорт Ларнака (LCA)',
    ruFromGen: 'аэропорта Ларнаки (LCA)',
    ruToAcc: 'Полис и Лачи',
    ruToLoc: 'Полисе и Лачи',
    highway: 'A5, A1 & A6 via Limassol',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['larnaca-airport-to-peyia', 'larnaca-airport-to-paphos', 'larnaca-city-to-polis'],
  },

  // === 2. Paphos Airport (PFO) Active Routes ===
  {
    slug: 'paphos-airport-to-limassol',
    fromId: 'pfo',
    toId: 'limassol',
    distanceKm: 63,
    durationMin: 45,
    basePrice: 75,
    enFrom: 'Paphos Airport (PFO)',
    enTo: 'Limassol',
    ruFrom: 'Аэропорт Пафос (PFO)',
    ruFromGen: 'аэропорта Пафоса (PFO)',
    ruToAcc: 'Лимассол',
    ruToLoc: 'Лимассоле',
    highway: 'A6 coastal highway',
    image: '/images/limassol-route.webp',
    relatedSlugs: ['larnaca-airport-to-limassol', 'limassol-to-paphos', 'paphos-airport-to-larnaca-city'],
  },
  {
    slug: 'paphos-airport-to-larnaca-city',
    fromId: 'pfo',
    toId: 'larnaca-city',
    distanceKm: 132,
    durationMin: 90,
    basePrice: 135,
    enFrom: 'Paphos Airport (PFO)',
    enTo: 'Larnaca City',
    ruFrom: 'Аэропорт Пафос (PFO)',
    ruFromGen: 'аэропорта Пафоса (PFO)',
    ruToAcc: 'Ларнаку',
    ruToLoc: 'Ларнаке',
    highway: 'A6, A1 & A5 via Limassol',
    image: '/images/larnaca-route.webp',
    relatedSlugs: ['paphos-airport-to-limassol', 'larnaca-airport-to-paphos-airport', 'paphos-airport-to-ayia-napa'],
  },
  {
    slug: 'paphos-airport-to-nicosia',
    fromId: 'pfo',
    toId: 'nicosia',
    distanceKm: 145,
    durationMin: 100,
    basePrice: 150,
    enFrom: 'Paphos Airport (PFO)',
    enTo: 'Nicosia',
    ruFrom: 'Аэропорт Пафос (PFO)',
    ruFromGen: 'аэропорта Пафоса (PFO)',
    ruToAcc: 'Никосию',
    ruToLoc: 'Никосии',
    highway: 'A6 & A1 via Limassol',
    image: '/images/airport-transfer.webp',
    relatedSlugs: ['paphos-airport-to-limassol', 'limassol-to-nicosia', 'nicosia-to-paphos'],
  },
  {
    slug: 'paphos-airport-to-ayia-napa',
    fromId: 'pfo',
    toId: 'ayia-napa',
    distanceKm: 175,
    durationMin: 120,
    basePrice: 180,
    enFrom: 'Paphos Airport (PFO)',
    enTo: 'Ayia Napa',
    ruFrom: 'Аэропорт Пафос (PFO)',
    ruFromGen: 'аэропорта Пафоса (PFO)',
    ruToAcc: 'Айя-Напу',
    ruToLoc: 'Айя-Напе',
    highway: 'A6, A1 & A3 via Limassol',
    image: '/images/larnaca-route.webp',
    relatedSlugs: ['paphos-airport-to-protaras', 'paphos-airport-to-limassol', 'limassol-to-ayia-napa'],
  },
  {
    slug: 'paphos-airport-to-protaras',
    fromId: 'pfo',
    toId: 'protaras',
    distanceKm: 185,
    durationMin: 130,
    basePrice: 190,
    enFrom: 'Paphos Airport (PFO)',
    enTo: 'Protaras',
    ruFrom: 'Аэропорт Пафос (PFO)',
    ruFromGen: 'аэропорта Пафоса (PFO)',
    ruToAcc: 'Протарас',
    ruToLoc: 'Протарасе',
    highway: 'A6, A1 & A3 via Limassol',
    image: '/images/larnaca-route.webp',
    relatedSlugs: ['paphos-airport-to-ayia-napa', 'paphos-airport-to-larnaca-city', 'protaras-to-paphos'],
  },

  // === 3. Limassol Base Intercity & Resort Routes ===
  {
    slug: 'limassol-to-paphos',
    fromId: 'limassol',
    toId: 'paphos-city',
    distanceKm: 68,
    durationMin: 45,
    basePrice: 75,
    enFrom: 'Limassol',
    enTo: 'Paphos',
    ruFrom: 'Лимассол',
    ruFromGen: 'Лимассола',
    ruToAcc: 'Пафос',
    ruToLoc: 'Пафосе',
    highway: 'A6 highway',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['paphos-airport-to-limassol', 'limassol-to-coral-bay', 'limassol-to-larnaca-city'],
  },
  {
    slug: 'limassol-to-larnaca-city',
    fromId: 'larnaca-city',
    toId: 'limassol',
    distanceKm: 70,
    durationMin: 50,
    basePrice: 75,
    enFrom: 'Larnaca City',
    enTo: 'Limassol',
    ruFrom: 'Ларнака (Город)',
    ruFromGen: 'Ларнаки',
    ruToAcc: 'Лимассол',
    ruToLoc: 'Лимассоле',
    highway: 'A5 & A1 highway',
    image: '/images/limassol-route.webp',
    relatedSlugs: ['larnaca-airport-to-limassol', 'limassol-to-ayia-napa', 'limassol-to-paphos'],
  },
  {
    slug: 'limassol-to-coral-bay',
    fromId: 'coral-bay',
    toId: 'limassol',
    distanceKm: 82,
    durationMin: 60,
    basePrice: 110,
    enFrom: 'Limassol',
    enTo: 'Coral Bay',
    ruFrom: 'Лимассол',
    ruFromGen: 'Лимассола',
    ruToAcc: 'Корал Бэй',
    ruToLoc: 'Корал Бэй',
    highway: 'A6 coastal highway',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['limassol-to-paphos', 'limassol-to-peyia', 'larnaca-airport-to-coral-bay'],
  },
  {
    slug: 'limassol-to-peyia',
    fromId: 'peyia',
    toId: 'limassol',
    distanceKm: 86,
    durationMin: 65,
    basePrice: 115,
    enFrom: 'Limassol',
    enTo: 'Peyia',
    ruFrom: 'Лимассол',
    ruFromGen: 'Лимассола',
    ruToAcc: 'Пейю',
    ruToLoc: 'Пейе',
    highway: 'A6 highway',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['limassol-to-coral-bay', 'limassol-to-paphos', 'larnaca-airport-to-peyia'],
  },
  {
    slug: 'limassol-to-ayia-napa',
    fromId: 'limassol',
    toId: 'ayia-napa',
    distanceKm: 112,
    durationMin: 75,
    basePrice: 115,
    enFrom: 'Limassol',
    enTo: 'Ayia Napa',
    ruFrom: 'Лимассол',
    ruFromGen: 'Лимассола',
    ruToAcc: 'Айя-Напу',
    ruToLoc: 'Айя-Напе',
    highway: 'A1, A5 & A3 highway',
    image: '/images/larnaca-route.webp',
    relatedSlugs: ['limassol-to-larnaca-city', 'paphos-airport-to-ayia-napa', 'limassol-to-nicosia'],
  },
  {
    slug: 'limassol-to-nicosia',
    fromId: 'nicosia',
    toId: 'limassol',
    distanceKm: 84,
    durationMin: 60,
    basePrice: 120,
    enFrom: 'Limassol',
    enTo: 'Nicosia',
    ruFrom: 'Лимассол',
    ruFromGen: 'Лимассола',
    ruToAcc: 'Никосию',
    ruToLoc: 'Никосии',
    highway: 'A1 highway',
    image: '/images/limassol-route.webp',
    relatedSlugs: ['larnaca-airport-to-limassol', 'paphos-airport-to-nicosia', 'nicosia-to-paphos'],
  },

  // === 4. Cross-Island Routes Passing Through Limassol ===
  {
    slug: 'larnaca-city-to-paphos',
    fromId: 'larnaca-city',
    toId: 'paphos-city',
    distanceKm: 138,
    durationMin: 90,
    basePrice: 140,
    enFrom: 'Larnaca City',
    enTo: 'Paphos',
    ruFrom: 'Ларнака (Город)',
    ruFromGen: 'Ларнаки',
    ruToAcc: 'Пафос',
    ruToLoc: 'Пафосе',
    highway: 'A5, A1 & A6 via Limassol',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['larnaca-airport-to-paphos', 'larnaca-city-to-coral-bay', 'limassol-to-paphos'],
  },
  {
    slug: 'larnaca-city-to-coral-bay',
    fromId: 'larnaca-city',
    toId: 'coral-bay',
    distanceKm: 150,
    durationMin: 100,
    basePrice: 160,
    enFrom: 'Larnaca City',
    enTo: 'Coral Bay',
    ruFrom: 'Ларнака (Город)',
    ruFromGen: 'Ларнаки',
    ruToAcc: 'Корал Бэй',
    ruToLoc: 'Корал Бэй',
    highway: 'A5, A1 & A6 via Limassol',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['larnaca-city-to-paphos', 'larnaca-airport-to-coral-bay', 'larnaca-city-to-peyia'],
  },
  {
    slug: 'larnaca-city-to-peyia',
    fromId: 'larnaca-city',
    toId: 'peyia',
    distanceKm: 155,
    durationMin: 105,
    basePrice: 160,
    enFrom: 'Larnaca City',
    enTo: 'Peyia',
    ruFrom: 'Ларнака (Город)',
    ruFromGen: 'Ларнаки',
    ruToAcc: 'Пейю',
    ruToLoc: 'Пейе',
    highway: 'A5, A1 & A6 via Limassol',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['larnaca-city-to-coral-bay', 'larnaca-city-to-polis', 'larnaca-airport-to-peyia'],
  },
  {
    slug: 'larnaca-city-to-polis',
    fromId: 'larnaca-city',
    toId: 'polis',
    distanceKm: 175,
    durationMin: 120,
    basePrice: 200,
    enFrom: 'Larnaca City',
    enTo: 'Polis Chrysochous',
    ruFrom: 'Ларнака (Город)',
    ruFromGen: 'Ларнаки',
    ruToAcc: 'Полис и Лачи',
    ruToLoc: 'Полисе',
    highway: 'A5, A1 & A6 via Limassol',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['larnaca-airport-to-polis', 'larnaca-city-to-peyia', 'larnaca-city-to-paphos'],
  },
  {
    slug: 'nicosia-to-paphos',
    fromId: 'nicosia',
    toId: 'paphos-city',
    distanceKm: 148,
    durationMin: 100,
    basePrice: 150,
    enFrom: 'Nicosia',
    enTo: 'Paphos',
    ruFrom: 'Никосия',
    ruFromGen: 'Никосии',
    ruToAcc: 'Пафос',
    ruToLoc: 'Пафосе',
    highway: 'A1 & A6 via Limassol',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['paphos-airport-to-nicosia', 'limassol-to-nicosia', 'coral-bay-to-nicosia'],
  },
  {
    slug: 'ayia-napa-to-paphos',
    fromId: 'ayia-napa',
    toId: 'paphos-city',
    distanceKm: 178,
    durationMin: 120,
    basePrice: 180,
    enFrom: 'Ayia Napa',
    enTo: 'Paphos',
    ruFrom: 'Айя-Напа',
    ruFromGen: 'Айя-Напы',
    ruToAcc: 'Пафос',
    ruToLoc: 'Пафосе',
    highway: 'A3, A5, A1 & A6 via Limassol',
    image: '/images/larnaca-route.webp',
    relatedSlugs: ['paphos-airport-to-ayia-napa', 'protaras-to-paphos', 'limassol-to-ayia-napa'],
  },
  {
    slug: 'protaras-to-paphos',
    fromId: 'protaras',
    toId: 'paphos-city',
    distanceKm: 188,
    durationMin: 130,
    basePrice: 190,
    enFrom: 'Protaras',
    enTo: 'Paphos',
    ruFrom: 'Протарас',
    ruFromGen: 'Протараса',
    ruToAcc: 'Пафос',
    ruToLoc: 'Пафосе',
    highway: 'A3, A5, A1 & A6 via Limassol',
    image: '/images/larnaca-route.webp',
    relatedSlugs: ['paphos-airport-to-protaras', 'ayia-napa-to-paphos', 'coral-bay-to-protaras'],
  },
  {
    slug: 'coral-bay-to-nicosia',
    fromId: 'coral-bay',
    toId: 'nicosia',
    distanceKm: 162,
    durationMin: 115,
    basePrice: 170,
    enFrom: 'Coral Bay',
    enTo: 'Nicosia',
    ruFrom: 'Корал Бэй',
    ruFromGen: 'Корал Бэй',
    ruToAcc: 'Никосию',
    ruToLoc: 'Никосии',
    highway: 'A6 & A1 via Limassol',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['nicosia-to-paphos', 'limassol-to-coral-bay', 'peyia-to-nicosia'],
  },
  {
    slug: 'coral-bay-to-ayia-napa',
    fromId: 'coral-bay',
    toId: 'ayia-napa',
    distanceKm: 192,
    durationMin: 130,
    basePrice: 190,
    enFrom: 'Coral Bay',
    enTo: 'Ayia Napa',
    ruFrom: 'Корал Бэй',
    ruFromGen: 'Корал Бэй',
    ruToAcc: 'Айя-Напу',
    ruToLoc: 'Айя-Напе',
    highway: 'A6, A1, A5 & A3 via Limassol',
    image: '/images/larnaca-route.webp',
    relatedSlugs: ['coral-bay-to-protaras', 'ayia-napa-to-paphos', 'limassol-to-coral-bay'],
  },
  {
    slug: 'coral-bay-to-protaras',
    fromId: 'coral-bay',
    toId: 'protaras',
    distanceKm: 202,
    durationMin: 140,
    basePrice: 200,
    enFrom: 'Coral Bay',
    enTo: 'Protaras',
    ruFrom: 'Корал Бэй',
    ruFromGen: 'Корал Бэй',
    ruToAcc: 'Протарас',
    ruToLoc: 'Протарасе',
    highway: 'A6, A1, A5 & A3 via Limassol',
    image: '/images/larnaca-route.webp',
    relatedSlugs: ['coral-bay-to-ayia-napa', 'protaras-to-paphos', 'peyia-to-protaras'],
  },
  {
    slug: 'peyia-to-nicosia',
    fromId: 'peyia',
    toId: 'nicosia',
    distanceKm: 168,
    durationMin: 120,
    basePrice: 170,
    enFrom: 'Peyia',
    enTo: 'Nicosia',
    ruFrom: 'Пейя',
    ruFromGen: 'Пейи',
    ruToAcc: 'Никосию',
    ruToLoc: 'Никосии',
    highway: 'A6 & A1 via Limassol',
    image: '/images/paphos-route.webp',
    relatedSlugs: ['coral-bay-to-nicosia', 'limassol-to-peyia', 'larnaca-airport-to-peyia'],
  },
  {
    slug: 'peyia-to-ayia-napa',
    fromId: 'peyia',
    toId: 'ayia-napa',
    distanceKm: 198,
    durationMin: 135,
    basePrice: 200,
    enFrom: 'Peyia',
    enTo: 'Ayia Napa',
    ruFrom: 'Пейя',
    ruFromGen: 'Пейи',
    ruToAcc: 'Айя-Напу',
    ruToLoc: 'Айя-Напе',
    highway: 'A6, A1, A5 & A3 via Limassol',
    image: '/images/larnaca-route.webp',
    relatedSlugs: ['peyia-to-protaras', 'coral-bay-to-ayia-napa', 'limassol-to-peyia'],
  },
  {
    slug: 'peyia-to-protaras',
    fromId: 'peyia',
    toId: 'protaras',
    distanceKm: 208,
    durationMin: 145,
    basePrice: 200,
    enFrom: 'Peyia',
    enTo: 'Protaras',
    ruFrom: 'Пейя',
    ruFromGen: 'Пейи',
    ruToAcc: 'Протарас',
    ruToLoc: 'Протарасе',
    highway: 'A6, A1, A5 & A3 via Limassol',
    image: '/images/larnaca-route.webp',
    relatedSlugs: ['peyia-to-ayia-napa', 'coral-bay-to-protaras', 'protaras-to-paphos'],
  },
];

function toRussianNominative(acc: string): string {
  const map: Record<string, string> = {
    'Лимассол': 'Лимассол',
    'Пафос': 'Пафос',
    'аэропорт Пафос (PFO)': 'Аэропорт Пафос (PFO)',
    'Корал Бэй': 'Корал Бэй',
    'Пейю': 'Пейя',
    'Полис и Лачи': 'Полис и Лачи',
    'Ларнаку': 'Ларнака',
    'Никосию': 'Никосия',
    'Айя-Напу': 'Айя-Напа',
    'Протарас': 'Протарас',
  };
  return map[acc] || acc;
}

function buildRoutePage(seed: RouteSeed): AirportRoutePage {
  const isLca = seed.fromId === 'lca' || seed.toId === 'lca';
  const isPfo = seed.fromId === 'pfo' || seed.toId === 'pfo';
  const isLimassol = seed.fromId === 'limassol' || seed.toId === 'limassol';

  const airportCode: 'LCA' | 'PFO' | undefined =
    seed.fromId === 'lca' ? 'LCA' : seed.fromId === 'pfo' ? 'PFO' : isLca ? 'LCA' : isPfo ? 'PFO' : undefined;

  const category: RouteCategory =
    seed.fromId === 'lca' || seed.toId === 'lca'
      ? 'LCA'
      : seed.fromId === 'pfo' || seed.toId === 'pfo'
        ? 'PFO'
        : isLimassol
          ? 'LIMASSOL'
          : 'INTERCITY';

  const isAirportPickup = seed.fromId === 'lca' || seed.fromId === 'pfo';
  const ruToNom = toRussianNominative(seed.ruToAcc);

  const enPickup = isAirportPickup
    ? `After collecting your luggage at ${seed.enFrom}, exit into the main Arrivals Hall. Your Limassol-based licensed driver will wait with a name board, help with bags, and drive you straight along the ${seed.highway} directly to your address in ${seed.enTo}.`
    : `Your Limassol-based chauffeur arrives at your hotel, villa, or apartment in ${seed.enFrom} 10 minutes early, loads your luggage, and drives you directly along the ${seed.highway} to ${seed.enTo} with zero intermediate stops.`;

  const ruPickup = isAirportPickup
    ? `После получения багажа в ${seed.ruFromGen} выйдите в центральный зал прилёта. Наш водитель из Лимассола встретит вас с табличкой с вашим именем, поможет с чемоданами и доставит по трассе ${seed.highway} прямо до адреса в ${seed.ruToLoc}.`
    : `Водитель нашей службы в Лимассоле приедет точно к вашему отелю, вилле или адресу в точке «${seed.ruFrom}», поможет с багажом и доставит по маршруту ${seed.highway} в ${seed.ruToAcc} без пересадок.`;

  return {
    slug: seed.slug,
    fromId: seed.fromId,
    toId: seed.toId,
    category,
    airportCode,
    distanceKm: seed.distanceKm,
    durationMin: seed.durationMin,
    basePrice: seed.basePrice,
    image: seed.image,
    relatedSlugs: seed.relatedSlugs,
    en: {
      title: `${seed.enFrom} to ${seed.enTo} Taxi & Transfer | Fixed €${seed.basePrice}`,
      metaDescription: `Book a private fixed-price transfer from ${seed.enFrom} to ${seed.enTo} for €${seed.basePrice}. ~${seed.durationMin}-min door-to-door ride via Limassol, 10% off return.`,
      h1: `${seed.enFrom} to ${seed.enTo} Transfer`,
      subtitle: `Direct ~${seed.durationMin}-minute private sedan transfer between ${seed.enFrom} and ${seed.enTo} (operated from our Limassol base) — fixed €${seed.basePrice} per car.`,
      highlights: [
        `${seed.distanceKm} km direct route via ${seed.highway}`,
        isAirportPickup
          ? `Arrivals Hall meet & greet at ${seed.enFrom} with live flight tracking`
          : `Door-to-door private pickup from any hotel, villa, or address`,
        `Fixed €${seed.basePrice} per sedan (up to 4 passengers & 3 suitcases)`,
        `10% instant discount when booking a round-trip transfer`,
      ],
      pickupGuide: enPickup,
      faqs: [
        {
          q: `How much does a private transfer from ${seed.enFrom} to ${seed.enTo} cost?`,
          a: `Our fixed rate between ${seed.enFrom} and ${seed.enTo} is €${seed.basePrice} per sedan (up to 4 passengers and 3 bags). Night rides (23:00–07:00) include a +€10 night tariff.`,
        },
        {
          q: `How long does the journey take?`,
          a: `Travel time is approximately ${seed.durationMin} minutes (${seed.distanceKm} km) along the ${seed.highway}.`,
        },
        {
          q: `Can I book this route in the opposite direction or round-trip?`,
          a: `Yes! All routes work in both directions. Select "Round trip" in the booking widget above to automatically receive 10% off your return journey.`,
        },
      ],
    },
    ru: {
      title: `Трансфер ${seed.ruFrom} — ${ruToNom} | Фиксированная цена €${seed.basePrice}`,
      metaDescription: `Частный трансфер и такси из ${seed.ruFromGen} в ${seed.ruToAcc} за €${seed.basePrice}. ~${seed.durationMin} минут в пути через Лимассол, фиксированный тариф, скидка 10% обратно.`,
      h1: `Трансфер ${seed.ruFrom} — ${ruToNom}`,
      subtitle: `Прямая поездка (~${seed.durationMin} мин) в обе стороны между точками «${seed.ruFrom}» и «${ruToNom}» от нашей базы в Лимассоле — фиксированно €${seed.basePrice}.`,
      highlights: [
        `${seed.distanceKm} км по скоростной трассе ${seed.highway} без пересадок`,
        isAirportPickup
          ? `Встреча с табличкой в зале прилёта и отслеживание рейса бесплатно`
          : `Подача авто точно к двери отеля, виллы или апартаментов`,
        `Фиксированная цена €${seed.basePrice} за весь седан (до 4 мест и 3 чемоданов)`,
        `Скидка 10% при заказе обратного трансфера в одном бронировании`,
      ],
      pickupGuide: ruPickup,
      faqs: [
        {
          q: `Сколько стоит трансфер из ${seed.ruFromGen} в ${seed.ruToAcc}?`,
          a: `Фиксированная стоимость поездки составляет €${seed.basePrice} за весь автомобиль (до 4 пассажиров и 3 чемоданов). В ночное время с 23:00 до 07:00 действует доплата +€10.`,
        },
        {
          q: `Сколько времени занимает дорога?`,
          a: `Дорога по трассе ${seed.highway} занимает около ${seed.durationMin} минут (${seed.distanceKm} км).`,
        },
        {
          q: `Действует ли тариф в обратную сторону?`,
          a: `Да, маршрут работает в обоих направлениях. Выберите режим «Туда и обратно» в калькуляторе выше, чтобы сразу получить скидку 10% на обратный путь.`,
        },
      ],
    },
  };
}

export const airportRoutes: AirportRoutePage[] = ROUTE_SEEDS.map(buildRoutePage);

export function getAirportRouteBySlug(slug: string): AirportRoutePage | undefined {
  return airportRoutes.find((r) => r.slug === slug);
}
