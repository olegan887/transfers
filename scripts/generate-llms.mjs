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
  `- [${r.enFrom} <-> ${r.enTo} Transfer (€${r.basePrice})](${SITE_URL}/routes/${r.slug}/): Fixed €${r.basePrice} per sedan (~${r.durationMin} min, ${r.distanceKm} km via ${r.highway}) | [RU](${SITE_URL}/ru/routes/${r.slug}/) | [DE](${SITE_URL}/de/routes/${r.slug}/) | [PL](${SITE_URL}/pl/routes/${r.slug}/) | [FR](${SITE_URL}/fr/routes/${r.slug}/) | [EL](${SITE_URL}/el/routes/${r.slug}/) | [IT](${SITE_URL}/it/routes/${r.slug}/)`;

const content = `# Cyprus Airport Transfers (Limassol Base)

> Fixed-price private sedan transfers in Cyprus operated 24/7 from Limassol, serving Larnaca Airport (LCA), Paphos Airport (PFO), and direct intercity routes through Limassol. Core booking pages and all 30 routes are available in 7 languages: English, Russian, German, Polish, French, Greek, and Italian.

- Fleet: Mercedes E-Class, Opel Insignia, Toyota Camry sedans (up to 4 passengers & 3 suitcases per car; groups of 5+ arranged via WhatsApp).
- Pricing: Fixed €75–€200 per sedan, +€10 flat night tariff (23:00–07:00), 10% automatic discount on round-trip bookings, optional €20 Stripe deposit or 100% cash/card to driver.
- Office Base: The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cyprus (34.6899 N, 33.0682 E).
- Contact: +357 96 867289 | info@cyprus-airport-transfer.co | 24/7 Arrivals Meet & Greet with live flight tracking.

## Main Pages & Language Editions

- [Cyprus Airport Transfers — Home (EN)](${SITE_URL}/): Online fare calculator, instant booking, and overview of Limassol, LCA & PFO transfers.
- [Cyprus Airport Transfers — Главная (RU)](${SITE_URL}/ru/): Калькулятор стоимости трансфера, онлайн-бронирование и тарифы из Лимассола, Ларнаки (LCA) и Пафоса (PFO).
- [Zypern Flughafentransfer — Startseite (DE)](${SITE_URL}/de/): Festpreise ab Limassol, Flughafen Larnaka (LCA) und Paphos (PFO).
- [Transfery lotniskowe Cypr — Strona główna (PL)](${SITE_URL}/pl/): Prywatne transfery ze stałą ceną z Limassol, LCA i PFO.
- [Transferts Aéroport Chypre — Accueil (FR)](${SITE_URL}/fr/): Tarifs fixes depuis Limassol, aéroport de Larnaca (LCA) et Paphos (PFO).
- [Μεταφορές Αεροδρομίου Κύπρος — Αρχική (EL)](${SITE_URL}/el/): Ιδιωτικές μεταφορές σταθερής τιμής από Λεμεσό, LCA και PFO.
- [Transfer Aeroporto Cipro — Home (IT)](${SITE_URL}/it/): Transfer privati a tariffa fissa da Limassol, Larnaca (LCA) e Paphos (PFO).
- [All 30 Active Transfer Routes (EN)](${SITE_URL}/routes/): Filterable directory of all serviced airport and intercity routes with fixed EUR rates.
- [Larnaca Airport (LCA) Transfers Hub](${SITE_URL}/larnaca-airport-transfer/): Dedicated arrivals guide, fixed fares west to Limassol (€75), Paphos (€135), Coral Bay (€150), Peyia (€160) & Polis (€180) ([RU](${SITE_URL}/ru/larnaca-airport-transfer/) | [DE](${SITE_URL}/de/larnaca-airport-transfer/) | [PL](${SITE_URL}/pl/larnaca-airport-transfer/) | [FR](${SITE_URL}/fr/larnaca-airport-transfer/) | [EL](${SITE_URL}/el/larnaca-airport-transfer/) | [IT](${SITE_URL}/it/larnaca-airport-transfer/)).
- [Paphos Airport (PFO) Transfers Hub](${SITE_URL}/paphos-airport-transfer/): Fixed sedans east to Limassol (€75), Larnaca (€135), LCA (€140), Nicosia (€150), Ayia Napa (€180) & Protaras (€190) ([RU](${SITE_URL}/ru/paphos-airport-transfer/) | [DE](${SITE_URL}/de/paphos-airport-transfer/) | [PL](${SITE_URL}/pl/paphos-airport-transfer/) | [FR](${SITE_URL}/fr/paphos-airport-transfer/) | [EL](${SITE_URL}/el/paphos-airport-transfer/) | [IT](${SITE_URL}/it/paphos-airport-transfer/)).
- [Limassol Transfers Hub](${SITE_URL}/limassol-transfers/): Dispatch base at The Oval, Krinou 3; fixed €75 transfers to both LCA & PFO plus intercity sedans island-wide ([RU](${SITE_URL}/ru/limassol-transfers/) | [DE](${SITE_URL}/de/limassol-transfers/) | [PL](${SITE_URL}/pl/limassol-transfers/) | [FR](${SITE_URL}/fr/limassol-transfers/) | [EL](${SITE_URL}/el/limassol-transfers/) | [IT](${SITE_URL}/it/limassol-transfers/)).
- [All 30 Routes — DE / PL / FR / EL / IT / RU](${SITE_URL}/de/routes/): Localized route directories available under [DE](${SITE_URL}/de/routes/), [PL](${SITE_URL}/pl/routes/), [FR](${SITE_URL}/fr/routes/), [EL](${SITE_URL}/el/routes/), [IT](${SITE_URL}/it/routes/), and [RU](${SITE_URL}/ru/routes/).
- [About Cyprus Airport Transfers](${SITE_URL}/about/): Limassol dispatch base, licensed sedan fleet, pricing rules & operational boundaries ([RU](${SITE_URL}/ru/about/) | [DE](${SITE_URL}/de/about/) | [PL](${SITE_URL}/pl/about/) | [FR](${SITE_URL}/fr/about/) | [EL](${SITE_URL}/el/about/) | [IT](${SITE_URL}/it/about/)).
- [Contact 24/7 Dispatch](${SITE_URL}/contact/): WhatsApp (+357 96 867289), phone, email & custom 5+ passenger inquiries ([RU](${SITE_URL}/ru/contact/) | [DE](${SITE_URL}/de/contact/) | [PL](${SITE_URL}/pl/contact/) | [FR](${SITE_URL}/fr/contact/) | [EL](${SITE_URL}/el/contact/) | [IT](${SITE_URL}/it/contact/)).
- [Privacy Policy](${SITE_URL}/privacy-policy/) & [Terms of Service](${SITE_URL}/terms/): Booking, 24-hour free cancellation & GDPR data policy.
- [WhatsApp Dispatch (+357 96 867289)](https://wa.me/35796867289): Direct 24/7 booking support, child seats, and 5+ passenger inquiries.
- [Free Website Calculator Widget (EN)](${SITE_URL}/widget/): Self-serve HTML iframe fare calculator in all 7 languages for Cyprus hotels, villas, and travel blogs.
- [RSS 2.0 Feeds (EN / RU / DE / PL / FR / EL / IT)](${SITE_URL}/rss.xml): Automated syndication feeds for Cyprus travel guides and fixed transfer routes ([RU](${SITE_URL}/ru/rss.xml), [DE](${SITE_URL}/de/rss.xml), [PL](${SITE_URL}/pl/rss.xml), [FR](${SITE_URL}/fr/rss.xml), [EL](${SITE_URL}/el/rss.xml), [IT](${SITE_URL}/it/rss.xml)).
- [JSON Feed 1.1 (EN)](${SITE_URL}/feed.json): Machine-readable feed of routes and articles.
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

## Flagship Travel Guides (All 7 Languages: EN / RU / DE / PL / FR / EL / IT)

- [Larnaca (LCA) & Paphos (PFO) Airport to Limassol Transfer Guide (€75)](${SITE_URL}/blog/larnaca-paphos-airport-to-limassol-transfer-guide/): Fixed €75 sedan fares, −10% round-trip savings, vs metered taxi & shuttle bus | [RU](${SITE_URL}/ru/blog/larnaca-paphos-airport-to-limassol-transfer-guide/) | [DE](${SITE_URL}/de/blog/larnaca-paphos-airport-to-limassol-transfer-guide/) | [PL](${SITE_URL}/pl/blog/larnaca-paphos-airport-to-limassol-transfer-guide/) | [FR](${SITE_URL}/fr/blog/larnaca-paphos-airport-to-limassol-transfer-guide/) | [EL](${SITE_URL}/el/blog/larnaca-paphos-airport-to-limassol-transfer-guide/) | [IT](${SITE_URL}/it/blog/larnaca-paphos-airport-to-limassol-transfer-guide/)
- [Paphos Airport (PFO) to Ayia Napa, Protaras, Nicosia & Larnaca Guide](${SITE_URL}/blog/paphos-airport-to-ayia-napa-protaras-nicosia-transfer/): Direct cross-island transfers via Limassol (€135–€190 fixed) + reverse LCA → Paphos/Coral Bay | [RU](${SITE_URL}/ru/blog/paphos-airport-to-ayia-napa-protaras-nicosia-transfer/) | [DE](${SITE_URL}/de/blog/paphos-airport-to-ayia-napa-protaras-nicosia-transfer/) | [PL](${SITE_URL}/pl/blog/paphos-airport-to-ayia-napa-protaras-nicosia-transfer/) | [FR](${SITE_URL}/fr/blog/paphos-airport-to-ayia-napa-protaras-nicosia-transfer/) | [EL](${SITE_URL}/el/blog/paphos-airport-to-ayia-napa-protaras-nicosia-transfer/) | [IT](${SITE_URL}/it/blog/paphos-airport-to-ayia-napa-protaras-nicosia-transfer/)
- [Late-Night Cyprus Airport Transfers & Flight Delays Guide (LCA & PFO)](${SITE_URL}/blog/cyprus-night-airport-transfer-flight-delays-guide/): Flat +€10 night tariff (23:00–07:00), free flight delay waiting, night bus gaps & 24/7 dispatch | [RU](${SITE_URL}/ru/blog/cyprus-night-airport-transfer-flight-delays-guide/) | [DE](${SITE_URL}/de/blog/cyprus-night-airport-transfer-flight-delays-guide/) | [PL](${SITE_URL}/pl/blog/cyprus-night-airport-transfer-flight-delays-guide/) | [FR](${SITE_URL}/fr/blog/cyprus-night-airport-transfer-flight-delays-guide/) | [EL](${SITE_URL}/el/blog/cyprus-night-airport-transfer-flight-delays-guide/) | [IT](${SITE_URL}/it/blog/cyprus-night-airport-transfer-flight-delays-guide/)
- [Cyprus Taxi & Airport Transfer Prices 2026: Fixed-Fare Guide](${SITE_URL}/blog/cyprus-taxi-transfer-prices-2026-guide/): Official Tariff 1/2 meters vs fixed sedan rates (€75–€190), night rule (+€10) & −10% return | [RU](${SITE_URL}/ru/blog/cyprus-taxi-transfer-prices-2026-guide/) | [DE](${SITE_URL}/de/blog/cyprus-taxi-transfer-prices-2026-guide/) | [PL](${SITE_URL}/pl/blog/cyprus-taxi-transfer-prices-2026-guide/) | [FR](${SITE_URL}/fr/blog/cyprus-taxi-transfer-prices-2026-guide/) | [EL](${SITE_URL}/el/blog/cyprus-taxi-transfer-prices-2026-guide/) | [IT](${SITE_URL}/it/blog/cyprus-taxi-transfer-prices-2026-guide/)
- [Larnaca (LCA) vs Paphos (PFO) Airport: Which Should You Fly Into?](${SITE_URL}/blog/larnaca-vs-paphos-airport-which-to-choose/): Driving times, resort distances & fixed transfer costs across Cyprus | [RU](${SITE_URL}/ru/blog/larnaca-vs-paphos-airport-which-to-choose/) | [DE](${SITE_URL}/de/blog/larnaca-vs-paphos-airport-which-to-choose/) | [PL](${SITE_URL}/pl/blog/larnaca-vs-paphos-airport-which-to-choose/) | [FR](${SITE_URL}/fr/blog/larnaca-vs-paphos-airport-which-to-choose/) | [EL](${SITE_URL}/el/blog/larnaca-vs-paphos-airport-which-to-choose/) | [IT](${SITE_URL}/it/blog/larnaca-vs-paphos-airport-which-to-choose/)
- [Cyprus Airport Transfers with Kids & Heavy Luggage: Car Seats & Trunk Space](${SITE_URL}/blog/cyprus-airport-transfer-with-kids-luggage-guide/): Free baby/booster seats, 4 passengers & 3 suitcase boot limit, strollers & villa pickups | [RU](${SITE_URL}/ru/blog/cyprus-airport-transfer-with-kids-luggage-guide/) | [DE](${SITE_URL}/de/blog/cyprus-airport-transfer-with-kids-luggage-guide/) | [PL](${SITE_URL}/pl/blog/cyprus-airport-transfer-with-kids-luggage-guide/) | [FR](${SITE_URL}/fr/blog/cyprus-airport-transfer-with-kids-luggage-guide/) | [EL](${SITE_URL}/el/blog/cyprus-airport-transfer-with-kids-luggage-guide/) | [IT](${SITE_URL}/it/blog/cyprus-airport-transfer-with-kids-luggage-guide/)

## Blog Indexes & Extended Guides

- [Cyprus Travel Guides & Blog (EN)](${SITE_URL}/blog/): Airport arrival tips, resort guides, and fare breakdowns | Localized indexes: [RU](${SITE_URL}/ru/blog/) | [DE](${SITE_URL}/de/blog/) | [PL](${SITE_URL}/pl/blog/) | [FR](${SITE_URL}/fr/blog/) | [EL](${SITE_URL}/el/blog/) | [IT](${SITE_URL}/it/blog/)
- [Cyprus Taxi & Transfer Price Guide](${SITE_URL}/blog/taxi-costs-in-cyprus/): Fixed EUR transfer rates, night tariff rules, and round-trip savings.
- [Larnaca Airport (LCA) to Paphos Guide](${SITE_URL}/blog/larnaca-airport-to-paphos-transfer/): Route overview via Limassol (€135 fixed sedan rate).
- [Private Transfer vs Local Taxi in Cyprus](${SITE_URL}/blog/private-transfer-vs-taxi-cyprus/): Why fixed pre-booked transfers beat airport rank meters.
- [How to Choose an Airport Transfer in Cyprus](${SITE_URL}/blog/how-to-choose-airport-transfer-cyprus/): Comparing fixed-price private transfers, flight tracking, and intercity buses.
`;

fs.writeFileSync(outPath, content, 'utf-8');
console.log(`Generated public/llms.txt with ${routes.length} active routes across 7 core languages.`);
