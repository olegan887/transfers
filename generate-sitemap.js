import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogFilePath = path.join(__dirname, 'src', 'data', 'blog.tsx');
const sitemapPath = path.join(__dirname, 'public', 'sitemap.xml');

const blogContent = fs.readFileSync(blogFilePath, 'utf-8');

const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
const dateRegex = /date:\s*['"]([^'"]+)['"]/g;

const slugs = [];
const dates = [];

let match;
while ((match = slugRegex.exec(blogContent)) !== null) {
  slugs.push(match[1]);
}

while ((match = dateRegex.exec(blogContent)) !== null) {
  dates.push(match[1]);
}

const baseUrl = 'https://cyprus-airport-transfer.co';

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

for (let i = 0; i < slugs.length; i++) {
  const slug = slugs[i];
  const date = dates[i] || new Date().toISOString().split('T')[0];
  sitemap += `  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
}

sitemap += `</urlset>`;

fs.writeFileSync(sitemapPath, sitemap);
console.log('Sitemap generated successfully!');
