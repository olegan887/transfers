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

function buildUrlEntry(enPath, ruPath, lastmod, changefreq, priority) {
  const enUrl = `${baseUrl}${enPath}`;
  const ruUrl = `${baseUrl}${ruPath}`;

  const makeBlock = (loc) => `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
    <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
    <xhtml:link rel="alternate" hreflang="ru" href="${ruUrl}" />
    <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
  </url>\n`;

  return makeBlock(enUrl) + makeBlock(ruUrl);
}

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
`;

// Homepages
sitemap += buildUrlEntry('/', '/ru/', today, 'weekly', '1.0');

// Routes Directory Pages
sitemap += buildUrlEntry('/routes', '/ru/routes', today, 'weekly', '0.9');

// Dedicated LCA & PFO Airport Route Landing Pages
for (const slug of routeSlugs) {
  sitemap += buildUrlEntry(`/routes/${slug}`, `/ru/routes/${slug}`, today, 'weekly', '0.9');
}

// Blog Index Pages
sitemap += buildUrlEntry('/blog', '/ru/blog', today, 'weekly', '0.8');

// Blog Articles
for (let i = 0; i < blogSlugs.length; i++) {
  const slug = blogSlugs[i];
  const date = blogDates[i] || today;
  sitemap += buildUrlEntry(`/blog/${slug}`, `/ru/blog/${slug}`, date, 'monthly', '0.7');
}

sitemap += `</urlset>\n`;

fs.writeFileSync(sitemapPath, sitemap);
console.log(
  `Sitemap generated successfully! (${routeSlugs.length} route pairs + ${blogSlugs.length} blog pairs)`
);
