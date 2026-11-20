import fs from 'fs';
import path from 'path';

const SITE_URL = 'https://cyprus-airport-transfer.co';
const routesPath = path.resolve(process.cwd(), 'src/data/routes.ts');
const outPath = path.resolve(process.cwd(), 'public/llms.txt');

const routesRaw = fs.readFileSync(routesPath, 'utf-8');

const routeRegex =
  /slug:\s*'([^']+)'[\s\S]*?fromId:\s*'([^']+)'[\s\S]*?toId:\s*'([^']+)'[\s\S]*?distanceKm:\s*(\d+)[\s\S]*?durationMin:\s*(\d+)[\s\S]*?basePrice:\s*(\d+)[\s\S]*?enFrom:\s*'([^']+)'[\s\S]*?enTo:\s*'([^']+)'[\s\S]*?highway:\s*'([^']+)'/g;

const routes = [];
let match;
while ((match = routeRegex.exec(routesRaw)) !== null) {
  routes.push({
    slug: match[1],
    fromId: match[2],
    toId: match[3],
    distanceKm: Number(match[4]),
    durationMin: Number(match[5]),
    basePrice: Number(match[6]),
    enFrom: match[7],
    enTo: match[8],
    highway: match[9],
  });
}

const lcaRoutes = routes.filter((r) => r.fromId === 'lca' || r.toId === 'lca');
const pfoRoutes = routes.filter((r) => r.fromId === 'pfo' || r.toId === 'pfo');
const limassolRoutes = routes.filter(
  (r) =>
    r.fromId !== 'lca' &&
    r.toId !== 'lca' &&
    r.fromId !== 'pfo' &&
    r.toId !== 'pfo' &&
    (r.fromId === 'limassol' || r.toId === 'limassol')
);
const crossIslandRoutes = routes.filter(
  (r) =>
    r.fromId !== 'lca' &&
    r.toId !== 'lca' &&
    r.fromId !== 'pfo' &&
    r.toId !== 'pfo' &&
    r.fromId !== 'limassol' &&
    r.toId !== 'limassol'
);

const formatRouteLine = (r) =>
  `- [${r.enFrom} <-> ${r.enTo} Transfer (€${r.basePrice})](${SITE_URL}/routes/${r.slug}): Fixed €${r.basePrice} per sedan (~${r.durationMin} min, ${r.distanceKm} km via ${r.highway}) | [Russian version](${SITE_URL}/ru/routes/${r.slug})`;

const content = `# Cyprus Airport Transfers (Limassol Base)

> Fixed-price private sedan transfers in Cyprus operated 24/7 from Limassol, serving Larnaca Airport (LCA), Paphos Airport (PFO), and direct intercity routes through Limassol.

- Fleet: Mercedes E-Class, Opel Insignia, Toyota Camry sedans (up to 4 passengers & 3 suitcases per car; groups of 5+ arranged via WhatsApp).
- Pricing: Fixed €75–€200 per sedan, +€10 flat night tariff (23:00–07:00), 10% automatic discount on round-trip bookings, optional €20 Stripe deposit or 100% cash/card to driver.
- Office Base: The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cyprus (34.6899 N, 33.0682 E).
- Contact: +357 96 867289 | info@cyprus-airport-transfer.co | 24/7 Arrivals Meet & Greet with live flight tracking.

## Main Pages & Booking

- [Cyprus Airport Transfers — Home (EN)](${SITE_URL}/): Online fare calculator, instant booking, and overview of Limassol, LCA & PFO transfers.
- [Cyprus Airport Transfers — Главная (RU)](${SITE_URL}/ru/): Калькулятор стоимости трансфера, онлайн-бронирование и тарифы из Лимассола, Ларнаки (LCA) и Пафоса (PFO).
- [All 30 Active Transfer Routes (EN)](${SITE_URL}/routes): Filterable directory of all serviced airport and intercity routes with fixed EUR rates.
- [Все 30 маршрутов трансфера (RU)](${SITE_URL}/ru/routes): Полный каталог доступных направлений с фиксированными тарифами.
- [WhatsApp Dispatch (+357 96 867289)](https://wa.me/35796867289): Direct 24/7 booking support, child seats, and 5+ passenger inquiries.
- [Google Maps Office Location (Limassol)](https://www.google.com/maps/search/?api=1&query=The+Oval,+Krinou+3,+Agios+Athanasios,+4103+Limassol,+Cyprus): Dispatch office in Agios Athanasios, Limassol.

## Service Boundaries

- We operate out of Limassol and strictly serve the 30 active bidirectional routes listed below.
- We do NOT operate short local transfers wholly inside Paphos District (PFO -> Paphos City, PFO -> Coral Bay, PFO -> Peyia, PFO -> Polis) or wholly inside Eastern Cyprus (LCA -> Ayia Napa, LCA -> Protaras, LCA -> Nicosia, LCA -> Larnaca City).
- We DO operate cross-island airport routes passing through Limassol (LCA <-> Paphos, LCA <-> Coral Bay, PFO <-> Larnaca City, PFO <-> Nicosia, PFO <-> Ayia Napa, PFO <-> Protaras) plus all direct Limassol transfers.

## Larnaca Airport (LCA) Routes (${lcaRoutes.length})

${lcaRoutes.map(formatRouteLine).join('\n')}

## Paphos Airport (PFO) Routes (${pfoRoutes.length})

${pfoRoutes.map(formatRouteLine).join('\n')}

## Limassol Intercity & Resort Routes (${limassolRoutes.length})

${limassolRoutes.map(formatRouteLine).join('\n')}

## Cross-Island Routes via Limassol (${crossIslandRoutes.length})

${crossIslandRoutes.map(formatRouteLine).join('\n')}

## Travel Guides & Blog

- [Cyprus Travel Guides & Blog (EN)](${SITE_URL}/blog): Airport arrival tips, resort guides, and fare breakdowns.
- [Блог и гиды по Кипру (RU)](${SITE_URL}/ru/blog): Полезные статьи о трансферах, курортах и ценах на такси на Кипре.
- [Cyprus Taxi & Transfer Price Guide](${SITE_URL}/blog/taxi-costs-in-cyprus): Fixed EUR transfer rates, night tariff rules, and round-trip savings.
- [Larnaca Airport (LCA) to Paphos Guide](${SITE_URL}/blog/larnaca-airport-to-paphos-transfer): Route overview via Limassol (€135 fixed sedan rate).
- [Private Transfer vs Local Taxi in Cyprus](${SITE_URL}/blog/private-transfer-vs-taxi-cyprus): Why fixed pre-booked transfers beat airport rank meters.
- [Paphos to Limassol Transfer Options](${SITE_URL}/blog/paphos-to-limassol-transfer-options): Comparison of €75 private sedan vs intercity bus.
`;

fs.writeFileSync(outPath, content, 'utf-8');
console.log(`Generated public/llms.txt with ${routes.length} active routes.`);
