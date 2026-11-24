import type { Language } from '../lib/routing';
import { en, type TranslationDict } from './locales/en';

export type { TranslationDict };

const cache: Partial<Record<Language, TranslationDict>> = { en };

export function getLoadedTranslation(lang: Language): TranslationDict {
  return cache[lang] || en;
}

export function isTranslationLoaded(lang: Language): boolean {
  return Boolean(cache[lang]);
}

export async function loadTranslation(lang: Language): Promise<TranslationDict> {
  if (cache[lang]) return cache[lang]!;
  let mod: { default: TranslationDict };
  switch (lang) {
    case 'ru':
      mod = await import('./locales/ru');
      break;
    case 'de':
      mod = await import('./locales/de');
      break;
    case 'pl':
      mod = await import('./locales/pl');
      break;
    case 'fr':
      mod = await import('./locales/fr');
      break;
    case 'el':
      mod = await import('./locales/el');
      break;
    case 'it':
      mod = await import('./locales/it');
      break;
    default:
      return en;
  }
  cache[lang] = mod.default;
  return mod.default;
}
