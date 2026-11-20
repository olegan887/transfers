import { useEffect } from 'react';
import { getPageSeo } from '../lib/seo';

function upsertMeta(selector: string, attrName: 'name' | 'property', attrVal: string, content: string) {
  let el = document.querySelector(selector) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrVal);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(selector: string, attrs: Record<string, string>) {
  let el = document.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link');
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el!.setAttribute(k, v));
}

/**
 * Dynamically synchronizes title, description, canonical, hreflang, OG/Twitter tags, and JSON-LD schema.
 */
export function useDocumentMeta(pathname: string, search = '') {
  useEffect(() => {
    const seo = getPageSeo(pathname, search);

    document.documentElement.lang = seo.lang === 'ru' ? 'ru' : 'en';
    document.title = seo.title;

    upsertMeta('meta[name="description"]', 'name', 'description', seo.description);
    upsertMeta('meta[name="robots"]', 'name', 'robots', seo.robots);
    upsertMeta('meta[property="og:title"]', 'property', 'og:title', seo.title);
    upsertMeta('meta[property="og:description"]', 'property', 'og:description', seo.description);
    upsertMeta('meta[property="og:type"]', 'property', 'og:type', seo.ogType);
    upsertMeta('meta[property="og:url"]', 'property', 'og:url', seo.canonicalUrl);
    upsertMeta('meta[property="og:image"]', 'property', 'og:image', seo.ogImage);
    upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', seo.title);
    upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', seo.description);
    upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', seo.ogImage);

    upsertLink('link[rel="canonical"]', { rel: 'canonical', href: seo.canonicalUrl });
    upsertLink('link[rel="alternate"][hreflang="en"]', { rel: 'alternate', hreflang: 'en', href: seo.enUrl });
    upsertLink('link[rel="alternate"][hreflang="ru"]', { rel: 'alternate', hreflang: 'ru', href: seo.ruUrl });
    upsertLink('link[rel="alternate"][hreflang="x-default"]', { rel: 'alternate', hreflang: 'x-default', href: seo.enUrl });

    let jsonLdEl = document.getElementById('seo-json-ld') as HTMLScriptElement | null;
    if (!jsonLdEl) {
      jsonLdEl = document.createElement('script');
      jsonLdEl.id = 'seo-json-ld';
      jsonLdEl.type = 'application/ld+json';
      document.head.appendChild(jsonLdEl);
    }
    jsonLdEl.textContent = JSON.stringify(seo.jsonLd);
  }, [pathname, search]);
}
