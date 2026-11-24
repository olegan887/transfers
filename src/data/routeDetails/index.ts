import type { Language } from '../../lib/routing';
import type { RouteDetailsMap, RouteEnrichmentLocalized } from './types';

export type { RouteDetailsMap, RouteEnrichmentLocalized };

const cache: Partial<Record<Language, RouteDetailsMap>> = {};

export function getLoadedRouteEnrichment(
  slug: string,
  lang: Language
): RouteEnrichmentLocalized | undefined {
  const dict = cache[lang] || cache.en;
  return dict?.[slug];
}

export function isRouteDetailsLoaded(lang: Language): boolean {
  return Boolean(cache[lang]);
}

export async function loadRouteDetails(lang: Language): Promise<RouteDetailsMap> {
  if (cache[lang]) return cache[lang]!;
  let mod: { default: RouteDetailsMap };
  switch (lang) {
    case 'ru':
      mod = await import('./ru');
      break;
    case 'de':
      mod = await import('./de');
      break;
    case 'pl':
      mod = await import('./pl');
      break;
    case 'fr':
      mod = await import('./fr');
      break;
    case 'el':
      mod = await import('./el');
      break;
    case 'it':
      mod = await import('./it');
      break;
    case 'en':
    default:
      mod = await import('./en');
      break;
  }
  cache[lang] = mod.default;
  return mod.default;
}
