import { getBidirectional } from '../lib/utils';

export const locations = [
  { id: 'lca', name: { ru: 'Аэропорт Ларнака (LCA)', en: 'Larnaca Airport (LCA)' }, type: 'airport' },
  { id: 'pfo', name: { ru: 'Аэропорт Пафос (PFO)', en: 'Paphos Airport (PFO)' }, type: 'airport' },
  { id: 'ayia-napa', name: { ru: 'Айя-Напа', en: 'Ayia Napa' }, type: 'city' },
  { id: 'protaras', name: { ru: 'Протарас', en: 'Protaras' }, type: 'city' },
  { id: 'limassol', name: { ru: 'Лимассол', en: 'Limassol' }, type: 'city' },
  { id: 'larnaca-city', name: { ru: 'Ларнака (Город)', en: 'Larnaca (City)' }, type: 'city' },
  { id: 'paphos-city', name: { ru: 'Пафос (Город)', en: 'Paphos (City)' }, type: 'city' },
  { id: 'nicosia', name: { ru: 'Никосия', en: 'Nicosia' }, type: 'city' },
  { id: 'coral-bay', name: { ru: 'Корал Бэй', en: 'Coral Bay' }, type: 'city' },
  { id: 'peyia', name: { ru: 'Пейя', en: 'Peyia' }, type: 'city' },
  { id: 'polis', name: { ru: 'Полис', en: 'Polis' }, type: 'city' },
];

export const vehicles = [
  {
    id: 'sedan',
    name: { ru: 'Комфортабельный седан', en: 'Comfortable Sedan' },
    description: { 
      ru: 'Mercedes E-Class, Opel Insignia, Toyota Camry или аналогичный', 
      en: 'Mercedes E-Class, Opel Insignia, Toyota Camry or similar' 
    },
    pax: 4,
    bags: 3,
    image: '/src/assets/images/opel_insignia_grey_1791299648321.jpg',
    multiplier: 1,
  },
];

// Base prices in EUR for Economy class
export const basePrices: Record<string, Record<string, number>> = {
  'lca': {
    'ayia-napa': 55,
    'protaras': 65,
    'limassol': 65,
    'larnaca-city': 25,
    'paphos-city': 130,
    'nicosia': 60,
    'coral-bay': 145,
    'peyia': 150,
    'polis': 160,
  },
  'pfo': {
    'ayia-napa': 160,
    'protaras': 170,
    'limassol': 70,
    'larnaca-city': 130,
    'paphos-city': 40,
    'nicosia': 140,
    'coral-bay': 45,
    'peyia': 50,
    'polis': 65,
  },
  'limassol': {
    'paphos-city': 70,
    'larnaca-city': 50,
    'ayia-napa': 75,
    'protaras': 80,
    'nicosia': 60,
    'coral-bay': 60,
    'peyia': 65,
    'polis': 75,
  }
};

export interface RouteItem {
  from: string;
  to: string;
  price: number;
  available: boolean;
}

// Default 9 popular cards rendered instantly without waiting for network (matches order from table)
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

  const vehicle = vehicles.find(v => v.id === vehicleId);
  if (!vehicle) return null;

  return Math.round(basePrice * vehicle.multiplier);
}


// Realistic travel times in minutes
const routeTimes: Record<string, Record<string, number>> = {
  'lca': {
    'ayia-napa': 45,
    'protaras': 50,
    'limassol': 50,
    'larnaca-city': 15,
    'paphos-city': 90,
    'nicosia': 40,
    'coral-bay': 100,
    'peyia': 105,
    'polis': 120,
  },
  'pfo': {
    'ayia-napa': 120,
    'protaras': 130,
    'limassol': 45,
    'larnaca-city': 90,
    'paphos-city': 20,
    'nicosia': 100,
    'coral-bay': 35,
    'peyia': 40,
    'polis': 50,
  },
  'limassol': {
    'paphos-city': 45,
    'larnaca-city': 50,
    'ayia-napa': 75,
    'protaras': 80,
    'nicosia': 60,
    'coral-bay': 60,
    'peyia': 65,
    'polis': 75,
  },
  'nicosia': {
    'paphos-city': 100,
    'ayia-napa': 60,
    'protaras': 65,
    'coral-bay': 115,
    'peyia': 120,
    'polis': 130,
  }
};

export function getRouteTime(from: string, to: string): number {
  const time = getBidirectional(routeTimes, from, to);
  return time !== null ? time : 45; // Default fallback
}

