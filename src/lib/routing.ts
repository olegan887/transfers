export type Language = 'en' | 'ru' | 'de' | 'pl' | 'fr' | 'el' | 'it';

export const CORE_LANGUAGES: Language[] = ['en', 'ru', 'de', 'pl', 'fr', 'el', 'it'];
export const BLOG_LANGUAGES: ('en' | 'ru')[] = ['en', 'ru'];

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
  | 'blog-list'
  | 'blog-post'
  | 'widget'
  | 'embed'
  | 'success';

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
    return { lang: detectedLang, view: 'success', cleanPath: `${prefix}/success` };
  }

  if (subPath === '/widget') {
    return { lang: detectedLang, view: 'widget', cleanPath: `${prefix}/widget` };
  }

  if (subPath === '/embed') {
    return { lang: detectedLang, view: 'embed', cleanPath: `${prefix}/embed` };
  }

  if (subPath === '/routes') {
    return { lang: detectedLang, view: 'routes-index', cleanPath: `${prefix}/routes` };
  }

  if (subPath.startsWith('/routes/')) {
    const slug = subPath.replace('/routes/', '').trim();
    if (slug) {
      return { lang: detectedLang, view: 'route', slug, cleanPath: clean };
    }
  }

  // Blog is strictly EN & RU only
  if (subPath === '/blog') {
    const blogLang: 'en' | 'ru' = detectedLang === 'ru' ? 'ru' : 'en';
    return {
      lang: blogLang,
      view: 'blog-list',
      cleanPath: blogLang === 'ru' ? '/ru/blog' : '/blog',
    };
  }

  if (subPath.startsWith('/blog/')) {
    const slug = subPath.replace('/blog/', '').trim();
    if (slug) {
      const blogLang: 'en' | 'ru' = detectedLang === 'ru' ? 'ru' : 'en';
      return {
        lang: blogLang,
        view: 'blog-post',
        slug,
        cleanPath: blogLang === 'ru' ? `/ru/blog/${slug}` : `/blog/${slug}`,
      };
    }
  }

  return {
    lang: detectedLang,
    view: 'home',
    cleanPath: detectedLang === 'en' ? '/' : `/${detectedLang}`,
  };
}

export function buildLocalizedPath(view: RouteView, lang: Language, slug?: string): string {
  // Blog routes stay in EN or RU (fallback non-RU languages to EN /blog)
  if (isBlogView(view)) {
    const blogPrefix = lang === 'ru' ? '/ru' : '';
    return view === 'blog-list' ? `${blogPrefix}/blog` : `${blogPrefix}/blog/${slug || ''}`;
  }

  const prefix = lang === 'en' ? '' : `/${lang}`;

  switch (view) {
    case 'home':
      return lang === 'en' ? '/' : `/${lang}/`;
    case 'routes-index':
      return `${prefix}/routes`;
    case 'route':
      return `${prefix}/routes/${slug || ''}`;
    case 'widget':
      return `${prefix}/widget`;
    case 'embed':
      return `${prefix}/embed`;
    case 'success':
      return `${prefix}/success`;
  }
}

export function getAlternatePaths(
  pathname: string,
  search = ''
): Partial<Record<Language, string>> & { en: string; ru: string } {
  const parsed = parseRoute(pathname, search);

  if (isBlogView(parsed.view)) {
    return {
      en: buildLocalizedPath(parsed.view, 'en', parsed.slug),
      ru: buildLocalizedPath(parsed.view, 'ru', parsed.slug),
    };
  }

  const map: Partial<Record<Language, string>> & { en: string; ru: string } = {
    en: buildLocalizedPath(parsed.view, 'en', parsed.slug),
    ru: buildLocalizedPath(parsed.view, 'ru', parsed.slug),
  };

  for (const lang of CORE_LANGUAGES) {
    map[lang] = buildLocalizedPath(parsed.view, lang, parsed.slug);
  }

  return map;
}

export function switchLanguagePath(pathname: string, targetLang: Language, search = ''): string {
  const parsed = parseRoute(pathname, search);
  if (isBlogView(parsed.view) && targetLang !== 'en' && targetLang !== 'ru') {
    // When switching to DE/PL/FR/EL/IT while reading the blog, navigate to that language's core homepage
    return buildLocalizedPath('home', targetLang);
  }
  return buildLocalizedPath(parsed.view, targetLang, parsed.slug);
}
