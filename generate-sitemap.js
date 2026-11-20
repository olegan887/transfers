import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogFilePath = path.join(__dirname, 'src', 'data', 'blog.tsx');
const routesFilePath = path.join(__dirname, 'src', 'data', 'routes.ts');
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');

const blogContent = fs.readFileSync(blogFilePath, 'utf-8');
const routesContent = fs.readFileSync(routesFilePath, 'utf-8');

const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const dateRegex = /date:\s*['"]([^'"]+)['"]/g;

const routeSlugs = [];
let match;
while ((match = slugRegex.exec(routesContent)) !== null) {
  routeSlugs.push(match[1]);
}

slugRegex.lastIndex = 0;
const blogSlugs = [];
const blogDates = [];
while ((match = slugRegex.exec(blogContent)) !== null) {
  blogSlugs.push(match[1]);
}
while ((match = dateRegex.exec(blogContent)) !== null) {
  blogDates.push(match[1]);
}

const baseUrl = 'https://cyprus-airport-transfer.co';
const today = new Date().toISOString().split('T')[0];

const CORE_LANGS = ['en', 'ru', 'de', 'pl', 'fr', 'el', 'it'];
const BLOG_LANGS = ['en', 'ru'];

function buildCorePath(subPath, lang) {
  if (lang === 'en') return subPath;
  if (subPath === '/') return `/${lang}/`;
  return `/${lang}${subPath}`;
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

// Free Embeddable Calculator Widget Builder (7 core languages)
sitemap += buildMultiLangEntries('/widget', CORE_LANGS, today, 'monthly', '0.7');

// Blog Index Pages (EN & RU only)
sitemap += buildMultiLangEntries('/blog', BLOG_LANGS, today, 'weekly', '0.8');

// Blog Articles (EN & RU only)
for (let i = 0; i < blogSlugs.length; i++) {
  const slug = blogSlugs[i];
  const date = blogDates[i] || today;
  sitemap += buildMultiLangEntries(`/blog/${slug}`, BLOG_LANGS, date, 'monthly', '0.7');
}

sitemap += `</urlset>\n`;

fs.writeFileSync(sitemapPath, sitemap);
const totalCore = (3 + routeSlugs.length) * CORE_LANGS.length;
const totalBlog = (1 + blogSlugs.length) * BLOG_LANGS.length;
console.log(
  `Sitemap generated successfully! (${totalCore} core URLs across 7 languages + ${totalBlog} EN/RU blog URLs = ${totalCore + totalBlog} total URLs)`
);
