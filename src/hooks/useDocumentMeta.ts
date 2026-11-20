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
 * Dynamically synchronizes title, description, canonical, hreflang alternates, OG/Twitter tags, and JSON-LD schema.
 */
export function useDocumentMeta(pathname: string, search = '') {
  useEffect(() => {
    const seo = getPageSeo(pathname, search);

    document.documentElement.lang = seo.lang;
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

    // Remove existing hreflang links cleanly so blog routes don't keep unused DE/PL/FR/EL/IT alternates
    document.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove());

    const canonicalEl = document.querySelector('link[rel="canonical"]');
    const insertHreflang = (hreflang: string, href: string) => {
      const linkEl = document.createElement('link');
      linkEl.rel = 'alternate';
      linkEl.setAttribute('hreflang', hreflang);
      linkEl.href = href;
      if (canonicalEl && canonicalEl.parentNode) {
        canonicalEl.parentNode.insertBefore(linkEl, canonicalEl.nextSibling);
      } else {
        document.head.appendChild(linkEl);
      }
    };

    insertHreflang('x-default', seo.xDefaultUrl);
    Object.entries(seo.alternates)
      .reverse()
      .forEach(([code, href]) => {
        if (href) insertHreflang(code, href);
      });

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
