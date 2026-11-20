import fs from 'fs';
import path from 'path';
import { blogPosts } from '../src/data/blog';
import { airportRoutes } from '../src/data/routes';

const SITE_URL = 'https://cyprus-airport-transfer.co';
const publicDir = path.resolve(process.cwd(), 'public');
const ruPublicDir = path.join(publicDir, 'ru');

fs.mkdirSync(ruPublicDir, { recursive: true });

function escapeXml(str: string): string {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

interface FeedItem {
  id: string;
  url: string;
  title: string;
  summary: string;
  dateIso: string;
  image: string;
  category: string;
}

function buildItems(lang: 'en' | 'ru'): FeedItem[] {
  const prefix = lang === 'ru' ? '/ru' : '';

  const blogItems: FeedItem[] = blogPosts.map((post) => {
    const url = `${SITE_URL}${prefix}/blog/${post.slug}?utm_source=rss&utm_medium=syndication`;
    const image = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;
    return {
      id: `${SITE_URL}${prefix}/blog/${post.slug}`,
      url,
      title: post.title[lang],
      summary: post.excerpt[lang],
      dateIso: new Date(`${post.date}T08:00:00Z`).toISOString(),
      image,
      category: lang === 'ru' ? 'Гид по Кипру' : 'Cyprus Travel Guide',
    };
  });

  const routeItems: FeedItem[] = airportRoutes.map((route, idx) => {
    const baseDate = new Date('2026-06-01T08:00:00Z');
    baseDate.setDate(baseDate.getDate() - idx);
    const url = `${SITE_URL}${prefix}/routes/${route.slug}?utm_source=rss&utm_medium=syndication`;
    const image = route.image.startsWith('http') ? route.image : `${SITE_URL}${route.image}`;
    return {
      id: `${SITE_URL}${prefix}/routes/${route.slug}`,
      url,
      title: `${route[lang].h1} — €${route.basePrice}`,
      summary: `${route[lang].subtitle} (${route.distanceKm} km, ~${route.durationMin} min).`,
      dateIso: baseDate.toISOString(),
      image,
      category: lang === 'ru' ? 'Фиксированный тариф' : 'Fixed-Price Route',
    };
  });

  return [...blogItems, ...routeItems].sort(
    (a, b) => new Date(b.dateIso).getTime() - new Date(a.dateIso).getTime()
  );
}

function renderRssXml(lang: 'en' | 'ru', items: FeedItem[]): string {
  const isRu = lang === 'ru';
  const selfUrl = isRu ? `${SITE_URL}/ru/rss.xml` : `${SITE_URL}/rss.xml`;
  const homeUrl = isRu ? `${SITE_URL}/ru/` : `${SITE_URL}/`;
  const title = isRu
    ? 'Cyprus Airport Transfers — Тарифы из Лимассола (LCA/PFO) и статьи о Кипре'
    : 'Cyprus Airport Transfers — Limassol, LCA & PFO Rates & Travel Guides';
  const description = isRu
    ? 'Официальная лента фиксированных тарифов трансфера по Кипру (от €75), маршрутов из аэропортов Ларнаки и Пафоса и полезных гидов для туристов.'
    : 'Fixed-price Cyprus airport & intercity transfer rates from Limassol (starting at €75) and practical travel guides for Larnaca (LCA) & Paphos (PFO).';

  const xmlItems = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.url)}</link>
      <guid isPermaLink="true">${escapeXml(item.id)}</guid>
      <pubDate>${new Date(item.dateIso).toUTCString()}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <description>${escapeXml(
        `${item.summary} <a href="${item.url}">${isRu ? 'Рассчитать и забронировать →' : 'View fixed rate & book →'}</a>`
      )}</description>
      <enclosure url="${escapeXml(item.image)}" type="image/webp" />
    </item>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(title)}</title>
    <link>${escapeXml(homeUrl)}</link>
    <atom:link href="${escapeXml(selfUrl)}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(description)}</description>
    <language>${isRu ? 'ru-RU' : 'en-US'}</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${xmlItems}
  </channel>
</rss>
`;
}

function renderJsonFeed(lang: 'en' | 'ru', items: FeedItem[]) {
  const isRu = lang === 'ru';
  return {
    version: 'https://jsonfeed.org/version/1.1',
    title: isRu
      ? 'Cyprus Airport Transfers (RU) — Трансферы и гиды'
      : 'Cyprus Airport Transfers (EN) — Routes & Travel Guides',
    home_page_url: isRu ? `${SITE_URL}/ru/` : `${SITE_URL}/`,
    feed_url: isRu ? `${SITE_URL}/ru/feed.json` : `${SITE_URL}/feed.json`,
    language: isRu ? 'ru' : 'en',
    description: isRu
      ? 'Фиксированные цены трансферов из Лимассола, аэропортов Ларнаки (LCA) и Пафоса (PFO).'
      : 'Fixed-price private sedan transfers from Limassol, Larnaca Airport (LCA) & Paphos Airport (PFO).',
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

const enItems = buildItems('en');
const ruItems = buildItems('ru');

fs.writeFileSync(path.join(publicDir, 'rss.xml'), renderRssXml('en', enItems), 'utf-8');
fs.writeFileSync(path.join(ruPublicDir, 'rss.xml'), renderRssXml('ru', ruItems), 'utf-8');
fs.writeFileSync(path.join(publicDir, 'feed.json'), JSON.stringify(renderJsonFeed('en', enItems), null, 2), 'utf-8');
fs.writeFileSync(path.join(ruPublicDir, 'feed.json'), JSON.stringify(renderJsonFeed('ru', ruItems), null, 2), 'utf-8');

console.log(`Generated RSS 2.0 & JSON Feeds (${enItems.length} EN items, ${ruItems.length} RU items).`);
