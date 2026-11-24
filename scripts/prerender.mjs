import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const ssrDir = path.join(rootDir, 'dist-ssr');

const CORE_LANGS = ['en', 'ru', 'de', 'pl', 'fr', 'el', 'it'];
const LEGACY_BLOG_LANGS = ['en', 'ru'];

function escapeHtmlAttr(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escapeHtmlText(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function extractRouteSlugs() {
  const routesContent = fs.readFileSync(path.join(rootDir, 'src', 'data', 'routes.ts'), 'utf-8');
  const slugs = [];
  const regex = /slug:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = regex.exec(routesContent)) !== null) {
    slugs.push(m[1]);
  }
  return slugs;
}

function extractFlagshipBlogSlugs() {
  const flagshipContent = fs.readFileSync(
    path.join(rootDir, 'src', 'data', 'flagshipBlogPosts.tsx'),
    'utf-8'
  );
  const slugs = [];
  const regex = /^\s*slug:\s*['"]([^'"]+)['"]\s*,\s*\r?\n\s*date:/gm;
  let m;
  while ((m = regex.exec(flagshipContent)) !== null) {
    slugs.push(m[1]);
  }
  return slugs;
}

function extractLegacyBlogSlugs() {
  const blogContent = fs.readFileSync(path.join(rootDir, 'src', 'data', 'blog.tsx'), 'utf-8');
  const slugs = [];
  const regex = /slug:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = regex.exec(blogContent)) !== null) {
    slugs.push(m[1]);
  }
  return slugs;
}

function buildHreflangBlock(seo) {
  const entries = Object.entries(seo.alternates || {}).filter(([, href]) => Boolean(href));
  if (entries.length === 0) {
    return '';
  }
  const lines = entries.map(
    ([code, href]) =>
      `    <link rel="alternate" hreflang="${escapeHtmlAttr(code)}" href="${escapeHtmlAttr(href)}" />`
  );
  if (seo.xDefaultUrl) {
    lines.push(
      `    <link rel="alternate" hreflang="x-default" href="${escapeHtmlAttr(seo.xDefaultUrl)}" />`
    );
  }
  return lines.join('\n');
}

function injectHeadTags(template, seo) {
  let html = template;

  html = html.replace(/<html lang="[^"]*">/, `<html lang="${escapeHtmlAttr(seo.lang)}">`);
  html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtmlText(seo.title)}</title>`);
  html = html.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtmlAttr(seo.description)}" />`
  );
  html = html.replace(
    /<meta name="robots" content="[^"]*"\s*\/?>/,
    `<meta name="robots" content="${escapeHtmlAttr(seo.robots)}" />`
  );
  if (seo.canonicalUrl) {
    html = html.replace(
      /<link rel="canonical" href="[^"]*"\s*\/?>/,
      `<link rel="canonical" href="${escapeHtmlAttr(seo.canonicalUrl)}" />`
    );
  } else {
    html = html.replace(/\s*<link rel="canonical" href="[^"]*"\s*\/?>/, '');
  }

  const hreflangHtml = buildHreflangBlock(seo);
  html = html.replace(
    /<!--seo-hreflang-start-->[\s\S]*?<!--seo-hreflang-end-->/,
    hreflangHtml
  );

  html = html.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtmlAttr(seo.title)}" />`
  );
  html = html.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtmlAttr(seo.description)}" />`
  );
  html = html.replace(
    /<meta property="og:type" content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${escapeHtmlAttr(seo.ogType)}" />`
  );
  if (seo.canonicalUrl) {
    html = html.replace(
      /<meta property="og:url" content="[^"]*"\s*\/?>/,
      `<meta property="og:url" content="${escapeHtmlAttr(seo.canonicalUrl)}" />`
    );
  } else {
    html = html.replace(/\s*<meta property="og:url" content="[^"]*"\s*\/?>/, '');
  }
  html = html.replace(
    /<meta property="og:image" content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${escapeHtmlAttr(seo.ogImage)}" />`
  );

  html = html.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtmlAttr(seo.title)}" />`
  );
  html = html.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtmlAttr(seo.description)}" />`
  );
  html = html.replace(
    /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${escapeHtmlAttr(seo.ogImage)}" />`
  );

  if (seo.jsonLd) {
    const safeJsonLd = JSON.stringify(seo.jsonLd).replace(/<\/script>/gi, '<\\/script>');
    html = html.replace(
      /<script id="seo-json-ld" type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script id="seo-json-ld" type="application/ld+json">${safeJsonLd}</script>`
    );
  } else {
    html = html.replace(
      /\s*<script id="seo-json-ld" type="application\/ld\+json">[\s\S]*?<\/script>/,
      ''
    );
  }

  return html;
}

async function runPrerender() {
  const templatePath = path.join(distDir, 'index.html');
  const template = fs.readFileSync(templatePath, 'utf-8');

  const serverEntryPath = pathToFileURL(path.join(ssrDir, 'entry-server.js')).href;
  const { render } = await import(serverEntryPath);

  // Prerender dedicated noindex 404.html for GitHub Pages fallback
  const notFoundRendered = render('/404.html');
  let notFoundHtml = injectHeadTags(template, notFoundRendered.seo);
  notFoundHtml = notFoundHtml.replace(
    '<div id="root"><!--app-html--></div>',
    `<div id="root" data-ssr-path="/404.html">${notFoundRendered.html}</div>`
  );
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

  const routeSlugs = extractRouteSlugs();
  const flagshipBlogSlugs = extractFlagshipBlogSlugs();
  const legacyBlogSlugs = extractLegacyBlogSlugs();

  const pathsToRender = [
    // Core site in 7 languages: en, ru, de, pl, fr, el, it
    ...CORE_LANGS.map((l) => (l === 'en' ? '/' : `/${l}/`)),
    ...CORE_LANGS.map((l) => (l === 'en' ? '/routes/' : `/${l}/routes/`)),
    ...CORE_LANGS.map((l) => (l === 'en' ? '/widget/' : `/${l}/widget/`)),
    ...CORE_LANGS.map((l) => (l === 'en' ? '/embed/' : `/${l}/embed/`)),
    ...CORE_LANGS.map((l) => (l === 'en' ? '/success/' : `/${l}/success/`)),
    ...routeSlugs.flatMap((slug) =>
      CORE_LANGS.map((l) => (l === 'en' ? `/routes/${slug}/` : `/${l}/routes/${slug}/`))
    ),
    // Blog index + 3 flagship articles in all 7 languages
    ...CORE_LANGS.map((l) => (l === 'en' ? '/blog/' : `/${l}/blog/`)),
    ...flagshipBlogSlugs.flatMap((slug) =>
      CORE_LANGS.map((l) => (l === 'en' ? `/blog/${slug}/` : `/${l}/blog/${slug}/`))
    ),
    // Legacy blog articles strictly EN & RU only
    ...legacyBlogSlugs.flatMap((slug) =>
      LEGACY_BLOG_LANGS.map((l) => (l === 'en' ? `/blog/${slug}/` : `/${l}/blog/${slug}/`))
    ),
  ];

  for (const urlPath of pathsToRender) {
    const { html, seo } = render(urlPath);
    let pageHtml = injectHeadTags(template, seo);
    pageHtml = pageHtml.replace(
      '<div id="root"><!--app-html--></div>',
      `<div id="root" data-ssr-path="${escapeHtmlAttr(urlPath)}">${html}</div>`
    );

    const normalized = urlPath.replace(/^\/+|\/+$/g, '');
    const outFile = normalized
      ? path.join(distDir, normalized, 'index.html')
      : path.join(distDir, 'index.html');

    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, pageHtml, 'utf-8');
  }

  // Copy updated sitemap.xml if generated in public
  const publicSitemap = path.join(rootDir, 'public', 'sitemap.xml');
  if (fs.existsSync(publicSitemap)) {
    fs.copyFileSync(publicSitemap, path.join(distDir, 'sitemap.xml'));
  }

  // Remove temporary SSR build artifacts
  fs.rmSync(ssrDir, { recursive: true, force: true });

  console.log(`SSG prerendering complete: ${pathsToRender.length} static HTML pages generated.`);
}

runPrerender().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
