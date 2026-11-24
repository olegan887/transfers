import fs from 'fs';
import path from 'path';
import { blogPosts } from '../src/data/blog';
import { airportRoutes, getRouteContentForLanguage } from '../src/data/routes';
import { CORE_LANGUAGES, isNoindexBlogSlug, Language, SITE_URL } from '../src/lib/routing';

const publicDir = path.resolve(process.cwd(), 'public');

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface FeedMeta {
  localeTag: string;
  rssTitle: string;
  rssDesc: string;
  jsonTitle: string;
  jsonDesc: string;
  guideCategory: string;
  routeCategory: string;
  readAction: string;
}

const FEED_META: Record<Language, FeedMeta> = {
  en: {
    localeTag: 'en-US',
    rssTitle: 'Cyprus Airport Transfers — Limassol, LCA & PFO Rates & Travel Guides',
    rssDesc:
      'Fixed-price Cyprus airport & intercity transfer rates from Limassol (starting at €75) and practical travel guides for Larnaca (LCA) & Paphos (PFO).',
    jsonTitle: 'Cyprus Airport Transfers (EN) — Routes & Travel Guides',
    jsonDesc:
      'Fixed-price private sedan transfers from Limassol, Larnaca Airport (LCA) & Paphos Airport (PFO).',
    guideCategory: 'Cyprus Travel Guide',
    routeCategory: 'Fixed-Price Route',
    readAction: 'View fixed rate & book →',
  },
  ru: {
    localeTag: 'ru-RU',
    rssTitle: 'Cyprus Airport Transfers — Тарифы из Лимассола (LCA/PFO) и статьи о Кипре',
    rssDesc:
      'Официальная лента фиксированных тарифов трансфера по Кипру (от €75), маршрутов из аэропортов Ларнаки и Пафоса и полезных гидов для туристов.',
    jsonTitle: 'Cyprus Airport Transfers (RU) — Трансферы и гиды',
    jsonDesc:
      'Фиксированные цены трансферов из Лимассола, аэропортов Ларнаки (LCA) и Пафоса (PFO).',
    guideCategory: 'Гид по Кипру',
    routeCategory: 'Фиксированный тариф',
    readAction: 'Рассчитать и забронировать →',
  },
  de: {
    localeTag: 'de-DE',
    rssTitle: 'Cyprus Airport Transfers (DE) — Festpreise & Reiseführer Larnaka/Paphos',
    rssDesc:
      'Feste Preise für private Flughafentransfers ab Limassol, Larnaka (LCA) und Paphos (PFO) sowie aktuelle Zypern-Ratgeber.',
    jsonTitle: 'Cyprus Airport Transfers (DE) — Strecken & Ratgeber',
    jsonDesc:
      'Private Limousinen-Transfers ab Limassol, Flughafen Larnaka (LCA) und Paphos (PFO).',
    guideCategory: 'Zypern-Ratgeber',
    routeCategory: 'Festpreisstrecke',
    readAction: 'Festpreis prüfen & buchen →',
  },
  pl: {
    localeTag: 'pl-PL',
    rssTitle: 'Cyprus Airport Transfers (PL) — Stałe ceny z LCA/PFO i poradniki',
    rssDesc:
      'Oficjalny kanał stałych cen transferów z Limassol, lotnisk Larnaka (LCA) i Pafos (PFO) oraz przewodniki po Cyprze.',
    jsonTitle: 'Cyprus Airport Transfers (PL) — Trasy i poradniki',
    jsonDesc:
      'Prywatne transfery sedanem w stałej cenie z Limassol, lotniska Larnaka (LCA) i Pafos (PFO).',
    guideCategory: 'Przewodnik po Cyprze',
    routeCategory: 'Stała cena trasy',
    readAction: 'Sprawdź cenę i zarezerwuj →',
  },
  fr: {
    localeTag: 'fr-FR',
    rssTitle: 'Cyprus Airport Transfers (FR) — Tarifs fixes LCA/PFO & Guides Chypre',
    rssDesc:
      'Tarifs fixes de transferts privés depuis Limassol, Larnaca (LCA) et Paphos (PFO) et guides pratiques pour votre arrivée à Chypre.',
    jsonTitle: 'Cyprus Airport Transfers (FR) — Trajets & Guides',
    jsonDesc:
      'Transferts privés en berline à tarif fixe depuis Limassol, Larnaca (LCA) et Paphos (PFO).',
    guideCategory: 'Guide Chypre',
    routeCategory: 'Trajet à tarif fixe',
    readAction: 'Voir le tarif fixe et réserver →',
  },
  el: {
    localeTag: 'el-CY',
    rssTitle: 'Cyprus Airport Transfers (EL) — Σταθερές τιμές LCA/PFO & Οδηγοί Κύπρου',
    rssDesc:
      'Επίσημη ροή σταθερών τιμών μεταφοράς από Λεμεσό, αεροδρόμια Λάρνακας (LCA) και Πάφου (PFO) και ταξιδιωτικοί οδηγοί Κύπρου.',
    jsonTitle: 'Cyprus Airport Transfers (EL) — Διαδρομές & Οδηγοί',
    jsonDesc:
      'Ιδιωτικές μεταφορές σταθερής τιμής από Λεμεσό, Λάρνακα (LCA) και Πάφο (PFO).',
    guideCategory: 'Οδηγός Κύπρου',
    routeCategory: 'Διαδρομή σταθερής τιμής',
    readAction: 'Δείτε την τιμή και κάντε κράτηση →',
  },
  it: {
    localeTag: 'it-IT',
    rssTitle: 'Cyprus Airport Transfers (IT) — Tariffe fisse LCA/PFO e Guide Cipro',
    rssDesc:
      'Feed ufficiale con tariffe fisse per transfer aeroportuali da Limassol, Larnaca (LCA) e Paphos (PFO) e guide pratiche su Cipro.',
    jsonTitle: 'Cyprus Airport Transfers (IT) — Tratte e Guide',
    jsonDesc:
      'Transfer privati in berlina a tariffa fissa da Limassol, Larnaca (LCA) e Paphos (PFO).',
    guideCategory: 'Guida Cipro',
    routeCategory: 'Tratta a tariffa fissa',
    readAction: 'Verifica prezzo fisso e prenota →',
  },
};

interface FeedItem {
  id: string;
  url: string;
  title: string;
  summary: string;
  dateIso: string;
  image: string;
  imageLength: number;
  imageType: string;
  category: string;
}

function getLocalImageMeta(imagePath: string): { length: number; type: string } {
  if (!imagePath || imagePath.startsWith('http')) {
    return { length: 0, type: 'image/webp' };
  }
  const rel = imagePath.replace(/^\/+/, '');
  const fullPath = path.join(publicDir, rel);
  let length = 0;
  try {
    length = fs.statSync(fullPath).size;
  } catch {
    length = 0;
  }
  const ext = path.extname(rel).toLowerCase();
  const type =
    ext === '.jpg' || ext === '.jpeg'
      ? 'image/jpeg'
      : ext === '.png'
      ? 'image/png'
      : 'image/webp';
  return { length, type };
}

function buildItems(lang: Language): FeedItem[] {
  const prefix = lang === 'en' ? '' : `/${lang}`;
  const meta = FEED_META[lang];

  const filteredPosts = blogPosts.filter((post) => {
    if (isNoindexBlogSlug(post.slug)) return false;
    return post.supportedLanguages
      ? post.supportedLanguages.includes(lang)
      : lang === 'en' || lang === 'ru';
  });

  const blogItems: FeedItem[] = filteredPosts.map((post) => {
    const url = `${SITE_URL}${prefix}/blog/${post.slug}/?utm_source=rss&utm_medium=syndication`;
    const image = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;
    const imgMeta = getLocalImageMeta(post.image);
    return {
      id: `${SITE_URL}${prefix}/blog/${post.slug}/`,
      url,
      title: post.title[lang] || post.title.en,
      summary: post.excerpt[lang] || post.excerpt.en,
      dateIso: new Date(`${post.date}T08:00:00Z`).toISOString(),
      image,
      imageLength: imgMeta.length,
      imageType: imgMeta.type,
      category: meta.guideCategory,
    };
  });

  const routeItems: FeedItem[] = airportRoutes.map((route, idx) => {
    const baseDate = new Date('2026-06-01T08:00:00Z');
    baseDate.setDate(baseDate.getDate() - idx);
    const url = `${SITE_URL}${prefix}/routes/${route.slug}/?utm_source=rss&utm_medium=syndication`;
    const image = route.image.startsWith('http') ? route.image : `${SITE_URL}${route.image}`;
    const imgMeta = getLocalImageMeta(route.image);
    const localized = getRouteContentForLanguage(route, lang);
    return {
      id: `${SITE_URL}${prefix}/routes/${route.slug}/`,
      url,
      title: `${localized.h1} — €${route.basePrice}`,
      summary: `${localized.subtitle} (${route.distanceKm} km, ~${route.durationMin} min).`,
      dateIso: baseDate.toISOString(),
      image,
      imageLength: imgMeta.length,
      imageType: imgMeta.type,
      category: meta.routeCategory,
    };
  });

  return [...blogItems, ...routeItems].sort(
    (a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime()
  );
}

function renderRssXml(lang: Language, items: FeedItem[]): string {
  const meta = FEED_META[lang];
  const prefix = lang === 'en' ? '' : `/${lang}`;
  const selfUrl = `${SITE_URL}${prefix}/rss.xml`;
  const homeUrl = `${SITE_URL}${prefix}/`;

  const xmlItems = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.id)}</guid>
      <pubDate>${new Date(item.dateIso).toUTCString()}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <description>${escapeXml(
        `${item.summary} <a href="${item.url}">${meta.readAction}</a>`
      )}</description>${
        item.imageLength > 0
          ? `\n      <enclosure url="${escapeXml(item.image)}" length="${item.imageLength}" type="${escapeXml(item.imageType)}" />`
          : ''
      }
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(meta.rssTitle)}</title>
    <link>${escapeXml(homeUrl)}</link>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(meta.rssDesc)}</description>
    <language>${meta.localeTag}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${xmlItems}
  </channel>
</rss>
`;
}

function renderJsonFeed(lang: Language, items: FeedItem[]) {
  const meta = FEED_META[lang];
  const prefix = lang === 'en' ? '' : `/${lang}`;
  return {
    version: 'https://jsonfeed.org/version/1.1',
    title: meta.jsonTitle,
    home_page_url: `${SITE_URL}${prefix}/`,
    feed_url: `${SITE_URL}${prefix}/feed.json`,
    language: lang,
    description: meta.jsonDesc,
    items: items.map((item) => ({
      id: item.id,
      url: item.url,
      title: item.title,
      content_text: item.summary,
      summary: item.summary,
      image: item.image,
      date_published: item.dateIso,
      tags: [item.category, 'Cyprus', 'Airport Transfer'],
    })),
  };
}

const summaryCounts: string[] = [];

for (const lang of CORE_LANGUAGES) {
  const outDir = lang === 'en' ? publicDir : path.join(publicDir, lang);
  fs.mkdirSync(outDir, { recursive: true });
  const items = buildItems(lang);

  fs.writeFileSync(path.join(outDir, 'rss.xml'), renderRssXml(lang, items), 'utf-8');
  fs.writeFileSync(
    path.join(outDir, 'feed.json'),
    JSON.stringify(renderJsonFeed(lang, items), null, 2),
    'utf-8'
  );
  summaryCounts.push(`${lang.toUpperCase()}:${items.length}`);
}

console.log(`Generated RSS 2.0 & JSON Feeds across 7 languages (${summaryCounts.join(', ')}).`);
