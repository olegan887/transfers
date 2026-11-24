import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogFilePath = path.join(__dirname, 'src', 'data', 'blog.tsx');
const flagshipBlogFilePath = path.join(__dirname, 'src', 'data', 'flagshipBlogPosts.tsx');
const routesFilePath = path.join(__dirname, 'src', 'data', 'routes.ts');
const routingFilePath = path.join(__dirname, 'src', 'lib', 'routing.ts');
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');

const blogContent = fs.readFileSync(blogFilePath, 'utf-8');
const flagshipContent = fs.readFileSync(flagshipBlogFilePath, 'utf-8');
const routesContent = fs.readFileSync(routesFilePath, 'utf-8');
const routingContent = fs.readFileSync(routingFilePath, 'utf-8');

const noindexMatch = routingContent.match(/NOINDEX_BLOG_SLUGS\s*=\s*\[([\s\S]*?)\]/);
const noindexBlogSlugs = new Set();
if (noindexMatch) {
  const itemRegex = /['"]([^'"]+)['"]/g;
  let itemMatch;
  while ((itemMatch = itemRegex.exec(noindexMatch[1])) !== null) {
    noindexBlogSlugs.add(itemMatch[1]);
  }
}

const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const dateRegex = /date:\s*['"]([^'"]+)['"]/g;
const flagshipPairRegex = /^\s*slug:\s*['"]([^'"]+)['"]\s*,\s*\r?\n\s*date:\s*['"]([^'"]+)['"]/gm;

const routeSlugs = [];
let match;
while ((match = slugRegex.exec(routesContent)) !== null) {
  routeSlugs.push(match[1]);
}

const flagshipArticles = [];
while ((match = flagshipPairRegex.exec(flagshipContent)) !== null) {
  flagshipArticles.push({ slug: match[1], date: match[2] });
}

slugRegex.lastIndex = 0;
const legacyBlogSlugs = [];
const legacyBlogDates = [];
while ((match = slugRegex.exec(blogContent)) !== null) {
  legacyBlogSlugs.push(match[1]);
}
while ((match = dateRegex.exec(blogContent)) !== null) {
  legacyBlogDates.push(match[1]);
}

// Pair dates before filtering out noindex stubs so dates stay aligned
const indexedLegacyArticles = legacyBlogSlugs
  .map((slug, idx) => ({ slug, date: legacyBlogDates[idx] || today }))
  .filter((item) => !noindexBlogSlugs.has(item.slug));

const baseUrl = 'https://cyprus-airport-transfer.co';
const today = new Date().toISOString().split('T')[0];

const CORE_LANGS = ['en', 'ru', 'de', 'pl', 'fr', 'el', 'it'];
const LEGACY_BLOG_LANGS = ['en', 'ru'];

function buildCorePath(subPath, lang) {
  const normalized = subPath === '/' ? '/' : subPath.endsWith('/') ? subPath : `${subPath}/`;
  if (lang === 'en') return normalized;
  if (normalized === '/') return `/${lang}/`;
  return `/${lang}${normalized}`;
}

function buildMultiLangEntries(subPath, langs, lastmod, changefreq, priority) {
  const urls = langs.map((lang) => ({
    lang,
    url: `${baseUrl}${buildCorePath(subPath, lang)}`,
  }));
  const xDefaultUrl = urls.find((u) => u.lang === 'en')?.url || urls[0].url;

  const altLinks =
    urls
      .map((u) => `    <xhtml:link rel="alternate" hreflang="${u.lang}" href="${u.url}" />`)
      .join('\n') + `\n    <xhtml:link rel="alternate" hreflang="x-default" href="${xDefaultUrl}" />`;

  return urls
    .map(
      (u) => `  <url>
    <loc>${u.url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
${altLinks}
  </url>\n`
    )
    .join('');
}

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

// Homepages (7 core languages)
sitemap += buildMultiLangEntries('/', CORE_LANGS, today, 'weekly', '1.0');

// Routes Directory Pages (7 core languages)
sitemap += buildMultiLangEntries('/routes', CORE_LANGS, today, 'weekly', '0.9');

// Dedicated Route Landing Pages (7 core languages x 30 routes)
for (const slug of routeSlugs) {
  sitemap += buildMultiLangEntries(`/routes/${slug}`, CORE_LANGS, today, 'weekly', '0.9');
}

// Dedicated Trust & Legal Pages (7 core languages)
sitemap += buildMultiLangEntries('/about', CORE_LANGS, today, 'monthly', '0.8');
sitemap += buildMultiLangEntries('/contact', CORE_LANGS, today, 'monthly', '0.8');
sitemap += buildMultiLangEntries('/privacy-policy', CORE_LANGS, today, 'yearly', '0.4');
sitemap += buildMultiLangEntries('/terms', CORE_LANGS, today, 'yearly', '0.4');

// Free Embeddable Calculator Widget Builder (7 core languages)
sitemap += buildMultiLangEntries('/widget', CORE_LANGS, today, 'monthly', '0.7');

// Blog Index Pages (all 7 languages)
sitemap += buildMultiLangEntries('/blog', CORE_LANGS, today, 'weekly', '0.8');

// Flagship Multilingual SEO Articles (all 7 languages)
for (const article of flagshipArticles) {
  sitemap += buildMultiLangEntries(
    `/blog/${article.slug}`,
    CORE_LANGS,
    article.date || today,
    'weekly',
    '0.8'
  );
}

// Indexed Legacy Blog Articles (EN & RU only)
for (const article of indexedLegacyArticles) {
  sitemap += buildMultiLangEntries(
    `/blog/${article.slug}`,
    LEGACY_BLOG_LANGS,
    article.date,
    'monthly',
    '0.7'
  );
}

sitemap += `</urlset>\n`;

fs.writeFileSync(sitemapPath, sitemap);
const totalCore = (7 + routeSlugs.length) * CORE_LANGS.length;
const totalFlagshipBlog = (1 + flagshipArticles.length) * CORE_LANGS.length;
const totalLegacyBlog = indexedLegacyArticles.length * LEGACY_BLOG_LANGS.length;
console.log(
  `Sitemap generated successfully! (${totalCore} core URLs + ${totalFlagshipBlog} 7-lang blog URLs + ${totalLegacyBlog} EN/RU legacy blog URLs = ${totalCore + totalFlagshipBlog + totalLegacyBlog} total URLs)`
);
