export type Language = 'en' | 'ru' | 'de' | 'pl' | 'fr' | 'el' | 'it';

export const CORE_LANGUAGES: Language[] = ['en', 'ru', 'de', 'pl', 'fr', 'el', 'it'];
export const BLOG_LANGUAGES: ('en' | 'ru')[] = ['en', 'ru'];

export const MULTILINGUAL_BLOG_SLUGS = [
  'larnaca-paphos-airport-to-limassol-transfer-guide',
  'paphos-airport-to-ayia-napa-protaras-nicosia-transfer',
  'cyprus-night-airport-transfer-flight-delays-guide',
  'cyprus-taxi-transfer-prices-2026-guide',
  'larnaca-vs-paphos-airport-which-to-choose',
  'cyprus-airport-transfer-with-kids-luggage-guide',
] as const;

export const NOINDEX_BLOG_SLUGS = [
  'driving-in-cyprus-tips',
  'cyprus-for-digital-nomads',
  'best-seafood-restaurants-paphos',
  'shopping-in-cyprus-guide',
  'cyprus-nightlife-guide',
  'akamas-peninsula-adventure-guide',
  'lefkara-village-guide',
  'cyprus-for-couples-romantic-spots',
  'golfing-in-cyprus-best-courses',
  'cyprus-history-overview',
  'traveling-to-cyprus-in-winter-guide',
  'cyprus-festivals-events-2026',
  'best-spas-in-cyprus-guide',
  'cyprus-for-solo-travelers-guide',
  'scuba-diving-cyprus-zenobia-wreck',
  'cyprus-real-estate-for-tourists-guide',
  'public-transport-in-cyprus-guide',
  'hidden-gems-of-cyprus-guide',
] as const;

export function isNoindexBlogSlug(slug?: string): boolean {
  if (!slug) return false;
  return (NOINDEX_BLOG_SLUGS as readonly string[]).includes(slug);
}

export const LANGUAGE_LABELS: Record<Language, { code: string; native: string; bcp47: string }> = {
  en: { code: 'EN', native: 'English', bcp47: 'en-GB' },
  ru: { code: 'RU', native: 'Русский', bcp47: 'ru-RU' },
  de: { code: 'DE', native: 'Deutsch', bcp47: 'de-DE' },
  pl: { code: 'PL', native: 'Polski', bcp47: 'pl-PL' },
  fr: { code: 'FR', native: 'Français', bcp47: 'fr-FR' },
  el: { code: 'EL', native: 'Ελληνικά', bcp47: 'el-GR' },
  it: { code: 'IT', native: 'Italiano', bcp47: 'it-IT' },
};

export type RouteView =
  | 'home'
  | 'routes-index'
  | 'route'
  | 'hub-lca'
  | 'hub-pfo'
  | 'hub-limassol'
  | 'blog-list'
  | 'blog-post'
  | 'about'
  | 'contact'
  | 'privacy'
  | 'terms'
  | 'widget'
  | 'embed'
  | 'success'
  | 'not-found';

export interface ParsedRoute {
  lang: Language;
  view: RouteView;
  slug?: string;
  cleanPath: string;
}

export const SITE_URL = 'https://cyprus-airport-transfer.co';

const PREFIXED_LANGUAGES: Exclude<Language, 'en'>[] = ['ru', 'de', 'pl', 'fr', 'el', 'it'];

export function normalizePathname(pathname: string): string {
  if (!pathname) return '/';
  let clean = pathname.split('?')[0].split('#')[0];
  if (!clean.startsWith('/')) clean = `/${clean}`;
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean;
}

export function isBlogView(view: RouteView): boolean {
  return view === 'blog-list' || view === 'blog-post';
}

export function isMultilingualBlogSlug(slug?: string): boolean {
  if (!slug) return false;
  return (MULTILINGUAL_BLOG_SLUGS as readonly string[]).includes(slug);
}

export function parseRoute(pathname: string, search = ''): ParsedRoute {
  const clean = normalizePathname(pathname);
  const params = new URLSearchParams(search);

  let detectedLang: Language = 'en';
  let subPath = clean;

  for (const prefixLang of PREFIXED_LANGUAGES) {
    if (clean === `/${prefixLang}` || clean.startsWith(`/${prefixLang}/`)) {
      detectedLang = prefixLang;
      subPath = clean.replace(new RegExp(`^/${prefixLang}`), '') || '/';
      break;
    }
  }

  const prefix = detectedLang === 'en' ? '' : `/${detectedLang}`;

  const hasSuccess =
    params.has('direct_success') ||
    params.has('session_id') ||
    subPath === '/success';

  if (hasSuccess) {
    return { lang: detectedLang, view: 'success', cleanPath: `${prefix}/success/` };
  }

  if (subPath === '/widget') {
    return { lang: detectedLang, view: 'widget', cleanPath: `${prefix}/widget/` };
  }

  if (subPath === '/embed') {
    return { lang: detectedLang, view: 'embed', cleanPath: `${prefix}/embed/` };
  }

  if (subPath === '/about') {
    return { lang: detectedLang, view: 'about', cleanPath: `${prefix}/about/` };
  }

  if (subPath === '/contact') {
    return { lang: detectedLang, view: 'contact', cleanPath: `${prefix}/contact/` };
  }

  if (subPath === '/privacy-policy') {
    return { lang: detectedLang, view: 'privacy', cleanPath: `${prefix}/privacy-policy/` };
  }

  if (subPath === '/terms') {
    return { lang: detectedLang, view: 'terms', cleanPath: `${prefix}/terms/` };
  }

  if (subPath === '/larnaca-airport-transfer') {
    return { lang: detectedLang, view: 'hub-lca', cleanPath: `${prefix}/larnaca-airport-transfer/` };
  }

  if (subPath === '/paphos-airport-transfer') {
    return { lang: detectedLang, view: 'hub-pfo', cleanPath: `${prefix}/paphos-airport-transfer/` };
  }

  if (subPath === '/limassol-transfers') {
    return { lang: detectedLang, view: 'hub-limassol', cleanPath: `${prefix}/limassol-transfers/` };
  }

  if (subPath === '/routes') {
    return { lang: detectedLang, view: 'routes-index', cleanPath: `${prefix}/routes/` };
  }

  if (subPath.startsWith('/routes/')) {
    const slug = subPath.replace('/routes/', '').trim();
    if (slug && !slug.includes('/')) {
      return { lang: detectedLang, view: 'route', slug, cleanPath: `${prefix}/routes/${slug}/` };
    }
  }

  // Blog index is localized across all 7 languages (DE/PL/FR/EL/IT display the 7-language guides)
  if (subPath === '/blog') {
    return {
      lang: detectedLang,
      view: 'blog-list',
      cleanPath: `${prefix}/blog/`,
    };
  }

  if (subPath.startsWith('/blog/')) {
    const slug = subPath.replace('/blog/', '').trim();
    if (slug && !slug.includes('/')) {
      if (isMultilingualBlogSlug(slug)) {
        return {
          lang: detectedLang,
          view: 'blog-post',
          slug,
          cleanPath: `${prefix}/blog/${slug}/`,
        };
      }
      // Legacy 34 articles stay EN & RU only
      const blogLang: 'en' | 'ru' = detectedLang === 'ru' ? 'ru' : 'en';
      return {
        lang: blogLang,
        view: 'blog-post',
        slug,
        cleanPath: blogLang === 'ru' ? `/ru/blog/${slug}/` : `/blog/${slug}/`,
      };
    }
  }

  if (subPath === '/' || subPath === '/index.html') {
    return {
      lang: detectedLang,
      view: 'home',
      cleanPath: detectedLang === 'en' ? '/' : `/${detectedLang}/`,
    };
  }

  return {
    lang: detectedLang,
    view: 'not-found',
    cleanPath: clean,
  };
}

export function buildLocalizedPath(view: RouteView, lang: Language, slug?: string): string {
  // Legacy blog posts stay EN/RU; multilingual flagship posts & blog index support all 7 languages
  if (view === 'blog-post' && !isMultilingualBlogSlug(slug)) {
    const blogPrefix = lang === 'ru' ? '/ru' : '';
    return slug ? `${blogPrefix}/blog/${slug}/` : `${blogPrefix}/blog/`;
  }

  const prefix = lang === 'en' ? '' : `/${lang}`;

  switch (view) {
    case 'home':
    case 'not-found':
      return lang === 'en' ? '/' : `/${lang}/`;
    case 'routes-index':
      return `${prefix}/routes/`;
    case 'route':
      return slug ? `${prefix}/routes/${slug}/` : `${prefix}/routes/`;
    case 'hub-lca':
      return `${prefix}/larnaca-airport-transfer/`;
    case 'hub-pfo':
      return `${prefix}/paphos-airport-transfer/`;
    case 'hub-limassol':
      return `${prefix}/limassol-transfers/`;
    case 'blog-list':
      return `${prefix}/blog/`;
    case 'blog-post':
      return slug ? `${prefix}/blog/${slug}/` : `${prefix}/blog/`;
    case 'about':
      return `${prefix}/about/`;
    case 'contact':
      return `${prefix}/contact/`;
    case 'privacy':
      return `${prefix}/privacy-policy/`;
    case 'terms':
      return `${prefix}/terms/`;
    case 'widget':
      return `${prefix}/widget/`;
    case 'embed':
      return `${prefix}/embed/`;
    case 'success':
      return `${prefix}/success/`;
  }
}

export function getAlternatePaths(
  pathname: string,
  search = ''
): Partial<Record<Language, string>> {
  const parsed = parseRoute(pathname, search);

  if (
    parsed.view === 'not-found' ||
    parsed.view === 'embed' ||
    parsed.view === 'success' ||
    (parsed.view === 'blog-post' && isNoindexBlogSlug(parsed.slug))
  ) {
    return {};
  }

  if (parsed.view === 'blog-post' && !isMultilingualBlogSlug(parsed.slug)) {
    return {
      en: buildLocalizedPath(parsed.view, 'en', parsed.slug),
      ru: buildLocalizedPath(parsed.view, 'ru', parsed.slug),
    };
  }

  const map: Partial<Record<Language, string>> = {};

  for (const lang of CORE_LANGUAGES) {
    map[lang] = buildLocalizedPath(parsed.view, lang, parsed.slug);
  }

  return map;
}

export function switchLanguagePath(pathname: string, targetLang: Language, search = ''): string {
  const parsed = parseRoute(pathname, search);
  if (parsed.view === 'not-found') {
    return buildLocalizedPath('home', targetLang);
  }
  if (
    parsed.view === 'blog-post' &&
    !isMultilingualBlogSlug(parsed.slug) &&
    targetLang !== 'en' &&
    targetLang !== 'ru'
  ) {
    // Redirect from a legacy EN/RU-only article to the target language's localized guides index
    return buildLocalizedPath('blog-list', targetLang);
  }
  return buildLocalizedPath(parsed.view, targetLang, parsed.slug);
}
