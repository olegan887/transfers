import { Language } from '../lib/routing';

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
  de: AirportRouteLocalized;
  pl: AirportRouteLocalized;
  fr: AirportRouteLocalized;
  el: AirportRouteLocalized;
  it: AirportRouteLocalized;
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

interface LocationGrammar {
  de: { nom: string; inLoc: string };
  pl: { nom: string; gen: string; acc: string; loc: string };
  fr: { nom: string; deFrom: string; aTo: string };
  el: { nom: string; fromGen: string; toAcc: string; inLoc: string };
  it: { nom: string; daFrom: string; aTo: string };
}

const LOCATION_GRAMMAR: Record<string, LocationGrammar> = {
  lca: {
    de: { nom: 'Flughafen Larnaka (LCA)', inLoc: 'am Flughafen Larnaka (LCA)' },
    pl: { nom: 'Lotnisko Larnaka (LCA)', gen: 'Lotniska Larnaka (LCA)', acc: 'Lotnisko Larnaka (LCA)', loc: 'Lotnisku Larnaka' },
    fr: { nom: 'Aéroport de Larnaca (LCA)', deFrom: "de l'aéroport de Larnaca (LCA)", aTo: "à l'aéroport de Larnaca (LCA)" },
    el: { nom: 'Αεροδρόμιο Λάρνακας (LCA)', fromGen: 'το Αεροδρόμιο Λάρνακας (LCA)', toAcc: 'το Αεροδρόμιο Λάρνακας (LCA)', inLoc: 'στο Αεροδρόμιο Λάρνακας' },
    it: { nom: 'Aeroporto di Larnaca (LCA)', daFrom: "dall'Aeroporto di Larnaca (LCA)", aTo: "all'Aeroporto di Larnaca (LCA)" },
  },
  pfo: {
    de: { nom: 'Flughafen Paphos (PFO)', inLoc: 'am Flughafen Paphos (PFO)' },
    pl: { nom: 'Lotnisko Pafos (PFO)', gen: 'Lotniska Pafos (PFO)', acc: 'Lotnisko Pafos (PFO)', loc: 'Lotnisku Pafos' },
    fr: { nom: 'Aéroport de Paphos (PFO)', deFrom: "de l'aéroport de Paphos (PFO)", aTo: "à l'aéroport de Paphos (PFO)" },
    el: { nom: 'Αεροδρόμιο Πάφου (PFO)', fromGen: 'το Αεροδρόμιο Πάφου (PFO)', toAcc: 'το Αεροδρόμιο Πάφου (PFO)', inLoc: 'στο Αεροδρόμιο Πάφου' },
    it: { nom: 'Aeroporto di Pafos (PFO)', daFrom: "dall'Aeroporto di Pafos (PFO)", aTo: "all'Aeroporto di Pafos (PFO)" },
  },
  limassol: {
    de: { nom: 'Limassol', inLoc: 'in Limassol' },
    pl: { nom: 'Limassol', gen: 'Limassol', acc: 'Limassol', loc: 'Limassol' },
    fr: { nom: 'Limassol', deFrom: 'de Limassol', aTo: 'à Limassol' },
    el: { nom: 'Λεμεσός', fromGen: 'τη Λεμεσό', toAcc: 'τη Λεμεσό', inLoc: 'στη Λεμεσό' },
    it: { nom: 'Limassol', daFrom: 'da Limassol', aTo: 'a Limassol' },
  },
  'paphos-city': {
    de: { nom: 'Paphos', inLoc: 'in Paphos' },
    pl: { nom: 'Pafos', gen: 'Pafos', acc: 'Pafos', loc: 'Pafos' },
    fr: { nom: 'Paphos', deFrom: 'de Paphos', aTo: 'à Paphos' },
    el: { nom: 'Πάφος', fromGen: 'την Πάφο', toAcc: 'την Πάφο', inLoc: 'στην Πάφο' },
    it: { nom: 'Pafos', daFrom: 'da Pafos', aTo: 'a Pafos' },
  },
  'larnaca-city': {
    de: { nom: 'Larnaka Stadt', inLoc: 'in Larnaka' },
    pl: { nom: 'Larnaka (Miasto)', gen: 'Larnaki', acc: 'Larnaki', loc: 'Larnace' },
    fr: { nom: 'Larnaca Ville', deFrom: 'de Larnaca', aTo: 'à Larnaca' },
    el: { nom: 'Λάρνακα (Πόλη)', fromGen: 'τη Λάρνακα', toAcc: 'τη Λάρνακα', inLoc: 'στη Λάρνακα' },
    it: { nom: 'Larnaca Città', daFrom: 'da Larnaca', aTo: 'a Larnaca' },
  },
  nicosia: {
    de: { nom: 'Nikosia', inLoc: 'in Nikosia' },
    pl: { nom: 'Nikozja', gen: 'Nikozji', acc: 'Nikozji', loc: 'Nikozji' },
    fr: { nom: 'Nicosie', deFrom: 'de Nicosie', aTo: 'à Nicosie' },
    el: { nom: 'Λευκωσία', fromGen: 'τη Λευκωσία', toAcc: 'τη Λευκωσία', inLoc: 'στη Λευκωσία' },
    it: { nom: 'Nicosia', daFrom: 'da Nicosia', aTo: 'a Nicosia' },
  },
  'ayia-napa': {
    de: { nom: 'Ayia Napa', inLoc: 'in Ayia Napa' },
    pl: { nom: 'Ayia Napa', gen: 'Ayia Napy', acc: 'Ayia Napy', loc: 'Ayia Napie' },
    fr: { nom: 'Ayia Napa', deFrom: "d'Ayia Napa", aTo: 'à Ayia Napa' },
    el: { nom: 'Αγία Νάπα', fromGen: 'την Αγία Νάπα', toAcc: 'την Αγία Νάπα', inLoc: 'στην Αγία Νάπα' },
    it: { nom: 'Ayia Napa', daFrom: 'da Ayia Napa', aTo: 'a Ayia Napa' },
  },
  protaras: {
    de: { nom: 'Protaras', inLoc: 'in Protaras' },
    pl: { nom: 'Protaras', gen: 'Protaras', acc: 'Protaras', loc: 'Protaras' },
    fr: { nom: 'Protaras', deFrom: 'de Protaras', aTo: 'à Protaras' },
    el: { nom: 'Πρωταράς', fromGen: 'τον Πρωταρά', toAcc: 'τον Πρωταρά', inLoc: 'στον Πρωταρά' },
    it: { nom: 'Protaras', daFrom: 'da Protaras', aTo: 'a Protaras' },
  },
  'coral-bay': {
    de: { nom: 'Coral Bay', inLoc: 'in Coral Bay' },
    pl: { nom: 'Coral Bay', gen: 'Coral Bay', acc: 'Coral Bay', loc: 'Coral Bay' },
    fr: { nom: 'Coral Bay', deFrom: 'de Coral Bay', aTo: 'à Coral Bay' },
    el: { nom: 'Coral Bay', fromGen: 'το Coral Bay', toAcc: 'το Coral Bay', inLoc: 'στο Coral Bay' },
    it: { nom: 'Coral Bay', daFrom: 'da Coral Bay', aTo: 'a Coral Bay' },
  },
  peyia: {
    de: { nom: 'Peyia', inLoc: 'in Peyia' },
    pl: { nom: 'Peyia', gen: 'Peyi', acc: 'Peyi', loc: 'Peyi' },
    fr: { nom: 'Peyia', deFrom: 'de Peyia', aTo: 'à Peyia' },
    el: { nom: 'Πέγεια', fromGen: 'την Πέγεια', toAcc: 'την Πέγεια', inLoc: 'στην Πέγεια' },
    it: { nom: 'Peyia', daFrom: 'da Peyia', aTo: 'a Peyia' },
  },
  polis: {
    de: { nom: 'Polis Chrysochous', inLoc: 'in Polis' },
    pl: { nom: 'Polis Chrysochous', gen: 'Polis', acc: 'Polis', loc: 'Polis' },
    fr: { nom: 'Polis Chrysochous', deFrom: 'de Polis', aTo: 'à Polis' },
    el: { nom: 'Πόλις Χρυσοχούς', fromGen: 'την Πόλη Χρυσοχούς', toAcc: 'την Πόλη Χρυσοχούς', inLoc: 'στην Πόλη Χρυσοχούς' },
    it: { nom: 'Polis Chrysochous', daFrom: 'da Polis', aTo: 'a Polis' },
  },
};

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
    basePrice: 160,
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

  // Align slug display direction accurately for routes where fromId/toId are swapped vs slug
  const fromLoc = LOCATION_GRAMMAR[seed.fromId] || LOCATION_GRAMMAR.limassol;
  const toLoc = LOCATION_GRAMMAR[seed.toId] || LOCATION_GRAMMAR.limassol;

  const enPickup = isAirportPickup
    ? `After collecting your luggage at ${seed.enFrom}, exit into the main Arrivals Hall. Your Limassol-based licensed driver will wait with a name board, help with bags, and drive you straight along the ${seed.highway} directly to your address in ${seed.enTo}.`
    : `Your Limassol-based chauffeur arrives at your hotel, villa, or apartment in ${seed.enFrom} 10 minutes early, loads your luggage, and drives you directly along the ${seed.highway} to ${seed.enTo} with zero intermediate stops.`;

  const ruPickup = isAirportPickup
    ? `После получения багажа в ${seed.ruFromGen} выйдите в центральный зал прилёта. Наш водитель из Лимассола встретит вас с табличкой с вашим именем, поможет с чемоданами и доставит по трассе ${seed.highway} прямо до адреса в ${seed.ruToLoc}.`
    : `Водитель нашей службы в Лимассоле приедет точно к вашему отелю, вилле или адресу в точке «${seed.ruFrom}», поможет с багажом и доставит по маршруту ${seed.highway} в ${seed.ruToAcc} без пересадок.`;

  const deFrom = fromLoc.de.nom;
  const deTo = toLoc.de.nom;
  const dePickup = isAirportPickup
    ? `Nach der Gepäckausgabe ${fromLoc.de.inLoc} gehen Sie in die Ankunftshalle. Ihr lizenzierter Fahrer aus Limassol wartet dort mit einem Namensschild auf Sie und bringt Sie direkt über die Autobahn ${seed.highway} zu Ihrer Adresse ${toLoc.de.inLoc}.`
    : `Ihr Chauffeur aus Limassol trifft 10 Minuten vor Abfahrt an Ihrem Hotel oder Ihrer Adresse ${fromLoc.de.inLoc} ein, verstaut Ihr Gepäck und fährt Sie ohne Umwege über die ${seed.highway} nach ${deTo}.`;

  const plFrom = fromLoc.pl.nom;
  const plTo = toLoc.pl.nom;
  const plPickup = isAirportPickup
    ? `Po odebraniu bagażu na ${fromLoc.pl.loc} wyjdź do hali przylotów. Licencjonowany kierowca z Limassol czeka tam z tabliczką imienną, pomaga z walizkami i dowozi Cię bezpośrednio trasą ${seed.highway} do ${plTo}.`
    : `Nasz kierowca z Limassol podjeżdża 10 minut wcześniej pod Twój hotel lub adres w ${fromLoc.pl.loc}, pomaga z bagażem i wiezie Cię bezpośrednio trasą ${seed.highway} do ${toLoc.pl.acc} bez przesiadek.`;

  const frFrom = fromLoc.fr.nom;
  const frTo = toLoc.fr.nom;
  const frPickup = isAirportPickup
    ? `Après avoir récupéré vos bagages, rejoignez le hall des arrivées ${fromLoc.fr.deFrom}. Votre chauffeur basé à Limassol vous attend avec une pancarte à votre nom et vous conduit directement via ${seed.highway} jusqu'à votre adresse ${toLoc.fr.aTo}.`
    : `Votre chauffeur basé à Limassol arrive 10 minutes avant l'heure prévue à votre hôtel ou villa ${fromLoc.fr.aTo}, charge vos bagages et vous conduit directement par ${seed.highway} ${toLoc.fr.aTo} sans arrêt intermédiaire.`;

  const elFrom = fromLoc.el.nom;
  const elTo = toLoc.el.nom;
  const elPickup = isAirportPickup
    ? `Αφού παραλάβετε τις αποσκευές σας ${fromLoc.el.inLoc}, βγείτε στην αίθουσα αφίξεων. Ο αδειούχος οδηγός μας από τη Λεμεσό θα σας περιμένει με ταμπέλα και θα σας μεταφέρει απευθείας μέσω ${seed.highway} στη διεύθυνσή σας ${toLoc.el.inLoc}.`
    : `Ο οδηγός μας από τη Λεμεσό φτάνει 10 λεπτά νωρίτερα στο ξενοδοχείο ή τη διεύθυνσή σας ${fromLoc.el.inLoc}, φορτώνει τις αποσκευές και σας μεταφέρει απευθείας μέσω ${seed.highway} προς ${toLoc.el.toAcc} χωρίς στάσεις.`;

  const itFrom = fromLoc.it.nom;
  const itTo = toLoc.it.nom;
  const itPickup = isAirportPickup
    ? `Dopo aver ritirato i bagagli, entra nella sala arrivi (${itFrom}). Il nostro autista con base a Limassol ti aspetterà con un cartello nominativo per accompagnarti direttamente lungo la ${seed.highway} fino al tuo indirizzo ${toLoc.it.aTo}.`
    : `Il nostro autista di Limassol arriva con 10 minuti di anticipo presso il tuo hotel o indirizzo ${fromLoc.it.aTo}, carica i bagagli e ti accompagna direttamente lungo la ${seed.highway} ${toLoc.it.aTo} senza fermate intermedie.`;

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
    de: {
      title: `Transfer ${deFrom} nach ${deTo} | Festpreis €${seed.basePrice}`,
      metaDescription: `Privater Transfer von ${deFrom} nach ${deTo} für fest €${seed.basePrice}. ~${seed.durationMin} Min. Direktfahrt über Limassol, 10 % Rabatt bei Hin- & Rückfahrt.`,
      h1: `Transfer ${deFrom} nach ${deTo}`,
      subtitle: `Direkte Privatfahrt (~${seed.durationMin} Min.) zwischen ${deFrom} und ${deTo} ab unserer Basis in Limassol — Festpreis €${seed.basePrice} pro Limousine.`,
      highlights: [
        `${seed.distanceKm} km Direktstrecke über ${seed.highway}`,
        isAirportPickup
          ? `Empfang mit Namensschild in der Ankunftshalle inkl. Flugverfolgung`
          : `Tür-zu-Tür-Abholung direkt am Hotel, der Villa oder Ihrer Adresse`,
        `Festpreis €${seed.basePrice} pro Limousine (bis 4 Passagiere & 3 Koffer)`,
        `10 % Sofortrabatt bei Buchung von Hin- und Rückfahrt`,
      ],
      pickupGuide: dePickup,
      faqs: [
        {
          q: `Was kostet ein privater Transfer von ${deFrom} nach ${deTo}?`,
          a: `Unser Festpreis zwischen ${deFrom} und ${deTo} beträgt €${seed.basePrice} pro Limousine (bis zu 4 Personen und 3 Koffer). Nachtfahrten (23:00–07:00) kosten +€10 Aufschlag.`,
        },
        {
          q: `Wie lange dauert die Fahrt?`,
          a: `Die Fahrzeit über die ${seed.highway} beträgt etwa ${seed.durationMin} Minuten (${seed.distanceKm} km).`,
        },
        {
          q: `Gilt der Tarif auch in die umgekehrte Richtung?`,
          a: `Ja, alle Strecken sind in beide Richtungen buchbar. Wählen Sie oben „Hin & Zurück“, um sofort 10 % Rabatt auf die Rückfahrt zu erhalten.`,
        },
      ],
    },
    pl: {
      title: `Transfer ${plFrom} – ${plTo} | Stała cena €${seed.basePrice}`,
      metaDescription: `Prywatny transfer z ${fromLoc.pl.gen} do ${toLoc.pl.acc} za €${seed.basePrice}. ~${seed.durationMin} min jazdy przez Limassol, 10% zniżki na powrót.`,
      h1: `Transfer ${plFrom} – ${plTo}`,
      subtitle: `Bezpośredni przejazd (~${seed.durationMin} min) prywatnym sedanem między ${plFrom} a ${plTo} z bazy w Limassol — stała cena €${seed.basePrice} za auto.`,
      highlights: [
        `${seed.distanceKm} km bezpośrednio trasą ${seed.highway} bez przesiadek`,
        isAirportPickup
          ? `Powitanie z tabliczką w hali przylotów i monitorowanie lotu gratis`
          : `Odbiór spod drzwi hotelu, willi lub dowolnego adresu`,
        `Stała cena €${seed.basePrice} za cały sedan (do 4 pasażerów i 3 walizek)`,
        `10% zniżki automatycznie przy rezerwacji w obie strony`,
      ],
      pickupGuide: plPickup,
      faqs: [
        {
          q: `Ile kosztuje transfer z ${fromLoc.pl.gen} do ${toLoc.pl.acc}?`,
          a: `Stała cena przejazdu między ${plFrom} a ${plTo} wynosi €${seed.basePrice} za cały samochód (do 4 osób i 3 walizek). W nocy (23:00–07:00) obowiązuje dopłata +€10.`,
        },
        {
          q: `Ile trwa podróż?`,
          a: `Przejazd trasą ${seed.highway} zajmuje około ${seed.durationMin} minut (${seed.distanceKm} km).`,
        },
        {
          q: `Czy można zamówić przejazd w drugą stronę lub powrotny?`,
          a: `Tak, trasa działa w obu kierunkach. Wybierz powyżej opcję „W obie strony”, aby uzyskać 10% zniżki na kurs powrotny.`,
        },
      ],
    },
    fr: {
      title: `Transfert ${frFrom} vers ${frTo} | Tarif fixe ${seed.basePrice} €`,
      metaDescription: `Réservez votre transfert privé ${fromLoc.fr.deFrom} ${toLoc.fr.aTo} pour ${seed.basePrice} € fixes. ~${seed.durationMin} min via Limassol, -10 % sur le retour.`,
      h1: `Transfert ${frFrom} – ${frTo}`,
      subtitle: `Trajet direct (~${seed.durationMin} min) en berline privée entre ${frFrom} et ${frTo} depuis notre base de Limassol — tarif fixe ${seed.basePrice} € par véhicule.`,
      highlights: [
        `${seed.distanceKm} km direct via ${seed.highway}`,
        isAirportPickup
          ? `Accueil avec pancarte en salle des arrivées et suivi de vol en direct`
          : `Prise en charge porte-à-porte à votre hôtel, villa ou adresse`,
        `Tarif fixe ${seed.basePrice} € par berline (jusqu’à 4 passagers & 3 valises)`,
        `10 % de remise immédiate en réservant l’aller-retour`,
      ],
      pickupGuide: frPickup,
      faqs: [
        {
          q: `Combien coûte un transfert privé ${fromLoc.fr.deFrom} ${toLoc.fr.aTo} ?`,
          a: `Notre tarif fixe est de ${seed.basePrice} € par berline (jusqu’à 4 passagers et 3 bagages). Les trajets de nuit (23h00–07h00) incluent un supplément de +10 €.`,
        },
        {
          q: `Quelle est la durée du trajet ?`,
          a: `Le trajet dure environ ${seed.durationMin} minutes (${seed.distanceKm} km) par ${seed.highway}.`,
        },
        {
          q: `Puis-je réserver dans l’autre sens ou en aller-retour ?`,
          a: `Oui, tous nos itinéraires fonctionnent dans les deux sens. Sélectionnez « Aller-retour » ci-dessus pour obtenir 10 % de remise sur le retour.`,
        },
      ],
    },
    el: {
      title: `Μεταφορά ${elFrom} – ${elTo} | Σταθερή τιμή €${seed.basePrice}`,
      metaDescription: `Ιδιωτική μεταφορά από ${fromLoc.el.fromGen} προς ${toLoc.el.toAcc} με €${seed.basePrice}. ~${seed.durationMin} λεπτά μέσω Λεμεσού, έκπτωση 10% επιστροφής.`,
      h1: `Μεταφορά ${elFrom} – ${elTo}`,
      subtitle: `Απευθείας ιδιωτική διαδρομή (~${seed.durationMin} λεπτά) μεταξύ ${elFrom} και ${elTo} από τη βάση μας στη Λεμεσό — σταθερή τιμή €${seed.basePrice}.`,
      highlights: [
        `${seed.distanceKm} χλμ απευθείας μέσω ${seed.highway}`,
        isAirportPickup
          ? `Υποδοχή με ταμπέλα στις αφίξεις και ζωντανή παρακολούθηση πτήσης`
          : `Παραλαβή από την πόρτα ξενοδοχείου, βίλας ή κατοικίας`,
        `Σταθερή τιμή €${seed.basePrice} ανά sedan (έως 4 επιβάτες & 3 βαλίτσες)`,
        `Άμεση έκπτωση 10% με κράτηση μετ’ επιστροφής`,
      ],
      pickupGuide: elPickup,
      faqs: [
        {
          q: `Πόσο κοστίζει η μεταφορά από ${fromLoc.el.fromGen} προς ${toLoc.el.toAcc};`,
          a: `Η σταθερή τιμή μας είναι €${seed.basePrice} ανά όχημα (έως 4 επιβάτες και 3 βαλίτσες). Για νυχτερινές διαδρομές (23:00–07:00) ισχύει τέλος +€10.`,
        },
        {
          q: `Πόση ώρα διαρκεί η διαδρομή;`,
          a: `Η διαδρομή μέσω ${seed.highway} διαρκεί περίπου ${seed.durationMin} λεπτά (${seed.distanceKm} χλμ).`,
        },
        {
          q: `Ισχύει η τιμή και για την αντίστροφη διαδρομή;`,
          a: `Ναι, όλες οι διαδρομές εκτελούνται και προς τις δύο κατευθύνσεις. Επιλέξτε «Μετ’ επιστροφής» στον υπολογιστή για έκπτωση 10% στην επιστροφή.`,
        },
      ],
    },
    it: {
      title: `Transfer ${itFrom} – ${itTo} | Tariffa fissa €${seed.basePrice}`,
      metaDescription: `Prenota un transfer privato ${fromLoc.it.daFrom} ${toLoc.it.aTo} a €${seed.basePrice}. ~${seed.durationMin} min via Limassol, sconto 10% sul ritorno.`,
      h1: `Transfer ${itFrom} – ${itTo}`,
      subtitle: `Corsa diretta (~${seed.durationMin} min) in berlina privata tra ${itFrom} e ${itTo} dalla nostra sede di Limassol — fisso €${seed.basePrice} a veicolo.`,
      highlights: [
        `${seed.distanceKm} km diretti lungo la ${seed.highway}`,
        isAirportPickup
          ? `Accoglienza con cartello agli arrivi e controllo volo in tempo reale`
          : `Ritiro privato porta a porta da hotel, ville o indirizzi`,
        `Prezzo fisso €${seed.basePrice} per berlina (fino a 4 passeggeri e 3 valigie)`,
        `Sconto immediato del 10% prenotando andata e ritorno`,
      ],
      pickupGuide: itPickup,
      faqs: [
        {
          q: `Quanto costa un transfer privato ${fromLoc.it.daFrom} ${toLoc.it.aTo}?`,
          a: `La nostra tariffa fissa tra ${itFrom} e ${itTo} è di €${seed.basePrice} per berlina (fino a 4 passeggeri e 3 valigie). Le corse notturne (23:00–07:00) prevedono +€10.`,
        },
        {
          q: `Quanto dura il viaggio?`,
          a: `Il tragitto lungo la ${seed.highway} dura circa ${seed.durationMin} minuti (${seed.distanceKm} km).`,
        },
        {
          q: `Posso prenotare nella direzione opposta o andata e ritorno?`,
          a: `Sì, tutte le tratte sono attive in entrambe le direzioni. Seleziona «Andata e ritorno» qui sopra per avere il 10% di sconto sul rientro.`,
        },
      ],
    },
  };
}

export const airportRoutes: AirportRoutePage[] = ROUTE_SEEDS.map(buildRoutePage);

export function getAirportRouteBySlug(slug: string): AirportRoutePage | undefined {
  return airportRoutes.find((r) => r.slug === slug);
}

export function getRouteContentForLanguage(
  route: AirportRoutePage,
  lang: Language
): AirportRouteLocalized {
  return route[lang] || route.en;
}
