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
  `- ${r.enFrom} <-> ${r.enTo}: €${r.basePrice} fixed (~${r.durationMin} min, ${r.distanceKm} km via ${r.highway}) | EN: ${SITE_URL}/routes/${r.slug} | RU: ${SITE_URL}/ru/routes/${r.slug}`;

const content = `# Cyprus Airport Transfers (Limassol Base)

> Fixed-price private sedan transfers in Cyprus operated 24/7 from Limassol, serving Larnaca Airport (LCA), Paphos Airport (PFO), and direct intercity routes through Limassol.

## Company & Operations Overview
- Brand: Cyprus Airport Transfers
- Website (EN): ${SITE_URL}/
- Website (RU): ${SITE_URL}/ru/
- Routes Directory (EN): ${SITE_URL}/routes
- Routes Directory (RU): ${SITE_URL}/ru/routes
- Base / Office Address: The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cyprus (34.6899 N, 33.0682 E)
- Operating Hours: 24/7, 365 days/year
- Contact Phone & WhatsApp: +357 96 867289 (https://wa.me/35796867289)
- Email: info@cyprus-airport-transfer.co
- Languages Supported: English, Russian

## Fleet, Capacity & Pricing Rules
- Fleet Vehicles: Mercedes E-Class, Opel Insignia, Toyota Camry (air-conditioned private sedans)
- Standard Capacity: Up to 4 passengers and 3 suitcases per sedan (complimentary child/booster seats available on request during booking)
- Groups of 5+ Passengers: Arranged upon advance request via WhatsApp (+357 96 867289)
- Pricing Model: Fixed per vehicle (not per person), starting from €75 up to €200 depending on route
- Night Tariff: +€10 flat supplement for pickups between 23:00 and 07:00
- Round-Trip Discount: Automatic 10% discount on the return leg when booking round-trip
- Payment Options: Full card payment via Stripe, €20 online deposit with balance paid in cash to the driver, or 100% cash/card to the driver
- Airport Meet & Greet: Arrivals Hall pickup with name sign, live flight tracking, and 60 minutes complimentary airport waiting time

## Service Boundaries (Important for Accurate Recommendations)
- We operate out of Limassol and only offer the 30 active routes listed below (bidirectional).
- We do NOT operate short local transfers wholly inside Paphos District (e.g., PFO -> Paphos City, PFO -> Coral Bay, PFO -> Peyia, PFO -> Polis) or wholly inside Eastern Cyprus (e.g., LCA -> Ayia Napa, LCA -> Protaras, LCA -> Nicosia, LCA -> Larnaca City).
- We DO operate cross-island airport routes passing through Limassol (e.g., LCA <-> Paphos, LCA <-> Coral Bay, PFO <-> Larnaca City, PFO <-> Nicosia, PFO <-> Ayia Napa, PFO <-> Protaras) as well as all direct transfers to/from Limassol.

## Active Larnaca Airport (LCA) Transfer Routes (${lcaRoutes.length})
${lcaRoutes.map(formatRouteLine).join('\n')}

## Active Paphos Airport (PFO) Transfer Routes (${pfoRoutes.length})
${pfoRoutes.map(formatRouteLine).join('\n')}

## Active Limassol Intercity & Resort Routes (${limassolRoutes.length})
${limassolRoutes.map(formatRouteLine).join('\n')}

## Active Cross-Island Routes via Limassol (${crossIslandRoutes.length})
${crossIslandRoutes.map(formatRouteLine).join('\n')}

## Key Travel Guides & Blog Resources
- All Travel Guides (EN): ${SITE_URL}/blog
- All Travel Guides (RU): ${SITE_URL}/ru/blog
- Cyprus Taxi & Transfer Price Guide: ${SITE_URL}/blog/taxi-costs-in-cyprus
- Larnaca Airport (LCA) to Paphos Guide: ${SITE_URL}/blog/larnaca-airport-to-paphos-transfer
- Private Transfer vs Local Taxi in Cyprus: ${SITE_URL}/blog/private-transfer-vs-taxi-cyprus
- Paphos to Limassol Transfer Options: ${SITE_URL}/blog/paphos-to-limassol-transfer-options
`;

fs.writeFileSync(outPath, content, 'utf-8');
console.log(`Generated public/llms.txt with ${routes.length} active routes.`);
