export type Language = 'en' | 'ru';

export type RouteView =
  | 'home'
  | 'routes-index'
  | 'route'
  | 'blog-list'
  | 'blog-post'
  | 'success';

export interface ParsedRoute {
  lang: Language;
  view: RouteView;
  slug?: string;
  cleanPath: string;
}

export const SITE_URL = 'https://cyprus-airport-transfer.co';

export function normalizePathname(pathname: string): string {
  if (!pathname) return '/';
  let clean = pathname.split('?')[0].split('#')[0];
  if (!clean.startsWith('/')) clean = `/${clean}`;
  if (clean.length > 1 && clean.endsWith('/')) {
    clean = clean.slice(0, -1);
  }
  return clean;
}

export function parseRoute(pathname: string, search = ''): ParsedRoute {
  const clean = normalizePathname(pathname);
  const params = new URLSearchParams(search);

  const isRu = clean === '/ru' || clean.startsWith('/ru/');
  const lang: Language = isRu ? 'ru' : 'en';
  const subPath = isRu ? clean.replace(/^\/ru/, '') || '/' : clean;

  const hasSuccess =
    params.has('direct_success') ||
    params.has('session_id') ||
    subPath === '/success';

  if (hasSuccess) {
    return { lang, view: 'success', cleanPath: isRu ? '/ru/success' : '/success' };
  }

  if (subPath === '/routes') {
    return { lang, view: 'routes-index', cleanPath: isRu ? '/ru/routes' : '/routes' };
  }

  if (subPath.startsWith('/routes/')) {
    const slug = subPath.replace('/routes/', '').trim();
    if (slug) {
      return { lang, view: 'route', slug, cleanPath: clean };
    }
  }

  if (subPath === '/blog') {
    return { lang, view: 'blog-list', cleanPath: isRu ? '/ru/blog' : '/blog' };
  }

  if (subPath.startsWith('/blog/')) {
    const slug = subPath.replace('/blog/', '').trim();
    if (slug) {
      return { lang, view: 'blog-post', slug, cleanPath: clean };
    }
  }

  return { lang, view: 'home', cleanPath: isRu ? '/ru' : '/' };
}

export function buildLocalizedPath(view: RouteView, lang: Language, slug?: string): string {
  const prefix = lang === 'ru' ? '/ru' : '';

  switch (view) {
    case 'home':
      return lang === 'ru' ? '/ru/' : '/';
    case 'routes-index':
      return `${prefix}/routes`;
    case 'route':
      return `${prefix}/routes/${slug || ''}`;
    case 'blog-list':
      return `${prefix}/blog`;
    case 'blog-post':
      return `${prefix}/blog/${slug || ''}`;
    case 'success':
      return `${prefix}/success`;
  }
}

export function getAlternatePaths(pathname: string, search = ''): { en: string; ru: string } {
  const parsed = parseRoute(pathname, search);
  return {
    en: buildLocalizedPath(parsed.view, 'en', parsed.slug),
    ru: buildLocalizedPath(parsed.view, 'ru', parsed.slug),
  };
}

export function switchLanguagePath(pathname: string, targetLang: Language, search = ''): string {
  const parsed = parseRoute(pathname, search);
  return buildLocalizedPath(parsed.view, targetLang, parsed.slug);
}
