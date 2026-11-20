import { getBidirectional } from '../lib/utils';
import { Language } from '../lib/routing';

export interface LocalizedLocation {
  id: string;
  name: Record<Language, string>;
  type: 'airport' | 'city';
}

export const locations: LocalizedLocation[] = [
  {
    id: 'lca',
    type: 'airport',
    name: {
      en: 'Larnaca Airport (LCA)',
      ru: 'Аэропорт Ларнака (LCA)',
      de: 'Flughafen Larnaka (LCA)',
      pl: 'Lotnisko Larnaka (LCA)',
      fr: 'Aéroport de Larnaca (LCA)',
      el: 'Αεροδρόμιο Λάρνακας (LCA)',
      it: 'Aeroporto di Larnaca (LCA)',
    },
  },
  {
    id: 'pfo',
    type: 'airport',
    name: {
      en: 'Paphos Airport (PFO)',
      ru: 'Аэропорт Пафос (PFO)',
      de: 'Flughafen Paphos (PFO)',
      pl: 'Lotnisko Pafos (PFO)',
      fr: 'Aéroport de Paphos (PFO)',
      el: 'Αεροδρόμιο Πάφου (PFO)',
      it: 'Aeroporto di Pafos (PFO)',
    },
  },
  {
    id: 'ayia-napa',
    type: 'city',
    name: {
      en: 'Ayia Napa',
      ru: 'Айя-Напа',
      de: 'Ayia Napa',
      pl: 'Ayia Napa',
      fr: 'Ayia Napa',
      el: 'Αγία Νάπα',
      it: 'Ayia Napa',
    },
  },
  {
    id: 'protaras',
    type: 'city',
    name: {
      en: 'Protaras',
      ru: 'Протарас',
      de: 'Protaras',
      pl: 'Protaras',
      fr: 'Protaras',
      el: 'Πρωταράς',
      it: 'Protaras',
    },
  },
  {
    id: 'limassol',
    type: 'city',
    name: {
      en: 'Limassol',
      ru: 'Лимассол',
      de: 'Limassol',
      pl: 'Limassol',
      fr: 'Limassol',
      el: 'Λεμεσός',
      it: 'Limassol',
    },
  },
  {
    id: 'larnaca-city',
    type: 'city',
    name: {
      en: 'Larnaca (City)',
      ru: 'Ларнака (Город)',
      de: 'Larnaka (Stadt)',
      pl: 'Larnaka (Miasto)',
      fr: 'Larnaca (Ville)',
      el: 'Λάρνακα (Πόλη)',
      it: 'Larnaca (Città)',
    },
  },
  {
    id: 'paphos-city',
    type: 'city',
    name: {
      en: 'Paphos (City)',
      ru: 'Пафос (Город)',
      de: 'Paphos (Stadt)',
      pl: 'Pafos (Miasto)',
      fr: 'Paphos (Ville)',
      el: 'Πάφος (Πόλη)',
      it: 'Pafos (Città)',
    },
  },
  {
    id: 'nicosia',
    type: 'city',
    name: {
      en: 'Nicosia',
      ru: 'Никосия',
      de: 'Nikosia',
      pl: 'Nikozja',
      fr: 'Nicosie',
      el: 'Λευκωσία',
      it: 'Nicosia',
    },
  },
  {
    id: 'coral-bay',
    type: 'city',
    name: {
      en: 'Coral Bay',
      ru: 'Корал Бэй',
      de: 'Coral Bay',
      pl: 'Coral Bay',
      fr: 'Coral Bay',
      el: 'Coral Bay',
      it: 'Coral Bay',
    },
  },
  {
    id: 'peyia',
    type: 'city',
    name: {
      en: 'Peyia',
      ru: 'Пейя',
      de: 'Peyia',
      pl: 'Peyia',
      fr: 'Peyia',
      el: 'Πέγεια',
      it: 'Peyia',
    },
  },
  {
    id: 'polis',
    type: 'city',
    name: {
      en: 'Polis',
      ru: 'Полис',
      de: 'Polis',
      pl: 'Polis',
      fr: 'Polis',
      el: 'Πόλις Χρυσοχούς',
      it: 'Polis',
    },
  },
];

export const vehicles: Array<{
  id: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
  pax: number;
  bags: number;
  image: string;
  multiplier: number;
}> = [
  {
    id: 'sedan',
    name: {
      en: 'Comfortable Sedan',
      ru: 'Комфортабельный седан',
      de: 'Komfort-Limousine',
      pl: 'Komfortowy sedan',
      fr: 'Berline confortable',
      el: 'Άνετο Sedan',
      it: 'Berlina confortevole',
    },
    description: {
      en: 'Mercedes E-Class, Opel Insignia, Toyota Camry or similar',
      ru: 'Mercedes E-Class, Opel Insignia, Toyota Camry или аналогичный',
      de: 'Mercedes E-Klasse, Opel Insignia, Toyota Camry oder ähnlich',
      pl: 'Mercedes Klasy E, Opel Insignia, Toyota Camry lub podobny',
      fr: 'Mercedes Classe E, Opel Insignia, Toyota Camry ou similaire',
      el: 'Mercedes E-Class, Opel Insignia, Toyota Camry ή παρόμοιο',
      it: 'Mercedes Classe E, Opel Insignia, Toyota Camry o simile',
    },
    pax: 4,
    bags: 3,
    image: '/images/sedan.webp',
    multiplier: 1,
  },
];

// Active fixed prices in EUR synced with Google Sheets (Limassol base & cross-island routes)
export const basePrices: Record<string, Record<string, number>> = {
  lca: {
    limassol: 75,
    'paphos-city': 135,
    pfo: 140,
    'coral-bay': 150,
    peyia: 155,
    polis: 180,
  },
  pfo: {
    limassol: 75,
    'larnaca-city': 135,
    lca: 140,
    nicosia: 150,
    'ayia-napa': 180,
    protaras: 190,
  },
  limassol: {
    lca: 75,
    pfo: 75,
    'paphos-city': 75,
    'larnaca-city': 75,
    'coral-bay': 110,
    peyia: 115,
    'ayia-napa': 115,
    nicosia: 120,
  },
  'larnaca-city': {
    limassol: 75,
    pfo: 135,
    'paphos-city': 140,
    'coral-bay': 160,
    peyia: 160,
    polis: 200,
  },
  'paphos-city': {
    lca: 135,
    limassol: 75,
    'larnaca-city': 140,
    nicosia: 150,
    'ayia-napa': 180,
    protaras: 190,
  },
  'coral-bay': {
    lca: 150,
    limassol: 110,
    'larnaca-city': 160,
    nicosia: 170,
    'ayia-napa': 190,
    protaras: 200,
  },
  peyia: {
    lca: 160,
    limassol: 115,
    'larnaca-city': 160,
    nicosia: 170,
    'ayia-napa': 200,
    protaras: 200,
  },
  polis: {
    lca: 200,
    'larnaca-city': 200,
  },
};

export interface RouteItem {
  from: string;
  to: string;
  price: number;
  available: boolean;
}

// Default 9 popular active cards rendered immediately (matches live Google Sheets table order)
export const DEFAULT_FEATURED_ROUTES: RouteItem[] = [
  { from: 'lca', to: 'paphos-city', price: 135, available: true },
  { from: 'pfo', to: 'limassol', price: 75, available: true },
  { from: 'pfo', to: 'larnaca-city', price: 135, available: true },
  { from: 'limassol', to: 'paphos-city', price: 75, available: true },
  { from: 'limassol', to: 'lca', price: 75, available: true },
  { from: 'pfo', to: 'nicosia', price: 150, available: true },
  { from: 'pfo', to: 'ayia-napa', price: 180, available: true },
  { from: 'limassol', to: 'ayia-napa', price: 115, available: true },
  { from: 'lca', to: 'coral-bay', price: 150, available: true },
];

export function getPrice(from: string, to: string, vehicleId: string): number | null {
  const basePrice = getBidirectional(basePrices, from, to);
  if (!basePrice) return null;

  const vehicle = vehicles.find((v) => v.id === vehicleId);
  if (!vehicle) return null;

  return Math.round(basePrice * vehicle.multiplier);
}

// Realistic travel times in minutes
const routeTimes: Record<string, Record<string, number>> = {
  lca: {
    limassol: 50,
    'paphos-city': 90,
    pfo: 85,
    'coral-bay': 100,
    peyia: 105,
    polis: 120,
    'larnaca-city': 15,
    nicosia: 40,
    'ayia-napa': 45,
    protaras: 50,
  },
  pfo: {
    limassol: 45,
    'larnaca-city': 90,
    lca: 85,
    nicosia: 100,
    'ayia-napa': 120,
    protaras: 130,
    'paphos-city': 20,
    'coral-bay': 35,
    peyia: 40,
    polis: 50,
  },
  limassol: {
    'paphos-city': 45,
    'larnaca-city': 50,
    'ayia-napa': 75,
    protaras: 80,
    nicosia: 60,
    'coral-bay': 60,
    peyia: 65,
    polis: 75,
  },
  'larnaca-city': {
    'paphos-city': 90,
    'coral-bay': 100,
    peyia: 105,
    polis: 120,
  },
  'paphos-city': {
    nicosia: 100,
    'ayia-napa': 120,
    protaras: 130,
  },
  'coral-bay': {
    nicosia: 115,
    'ayia-napa': 130,
    protaras: 140,
  },
  peyia: {
    nicosia: 120,
    'ayia-napa': 135,
    protaras: 145,
  },
};

export function getRouteTime(from: string, to: string): number {
  const time = getBidirectional(routeTimes, from, to);
  return time !== null ? time : 60;
}
