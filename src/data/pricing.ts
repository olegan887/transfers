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
    description: { ru: 'Mercedes E-Class, Toyota Camry или аналогичный', en: 'Mercedes E-Class, Toyota Camry or similar' },
    pax: 4,
    bags: 3,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&q=80&w=600&h=400',
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
    'paphos-city': 35,
    'nicosia': 140,
    'coral-bay': 45,
    'peyia': 50,
    'polis': 65,
  }
};

export function getPrice(from: string, to: string, vehicleId: string): number | null {
  let basePrice = null;
  
  if (basePrices[from] && basePrices[from][to]) {
    basePrice = basePrices[from][to];
  } else if (basePrices[to] && basePrices[to][from]) {
    basePrice = basePrices[to][from];
  }

  if (!basePrice) return null;

  const vehicle = vehicles.find(v => v.id === vehicleId);
  if (!vehicle) return null;

  return Math.round(basePrice * vehicle.multiplier);
}
