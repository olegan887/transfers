import { airportRoutes, getAirportRouteBySlug } from '../data/routes';
import { blogPosts } from '../data/blog';
import { globalAirportFaqs, passengerReviews } from '../data/seoContent';
import {
  buildLocalizedPath,
  getAlternatePaths,
  Language,
  parseRoute,
  SITE_URL,
} from './routing';

export interface SeoMetadata {
  lang: Language;
  title: string;
  description: string;
  canonicalUrl: string;
  enUrl: string;
  ruUrl: string;
  ogType: 'website' | 'article';
  ogImage: string;
  robots: string;
  jsonLd: Record<string, any>;
}

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-cover.jpg`;

function getBaseTaxiServiceSchema(lang: Language) {
  return {
    '@type': 'TaxiService',
    '@id': `${SITE_URL}/#organization`,
    name: lang === 'ru' ? 'Cyprus Airport Transfers — Лимассол, LCA и PFO' : 'Cyprus Airport Transfers (Limassol, LCA & PFO)',
    description:
      lang === 'ru'
        ? 'Индивидуальные трансферы из Лимассола и аэропортов Ларнаки (LCA) и Пафоса (PFO) по всему Кипру по фиксированным ценам. Встреча с табличкой 24/7, бесплатное отслеживание рейсов.'
        : 'Fixed-price private transfers based in Limassol serving Larnaca Airport (LCA), Paphos Airport (PFO), and intercity Cyprus routes. 24/7 arrivals meet & greet and live flight tracking.',
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.svg`,
    image: DEFAULT_OG_IMAGE,
    telephone: '+35796867289',
    email: 'info@cyprus-airport-transfer.co',
    priceRange: '€75 - €200',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'The Oval, Krinou 3, Agios Athanasios',
      addressLocality: 'Limassol',
      postalCode: '4103',
      addressCountry: 'CY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.6899,
      longitude: 33.0682,
    },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=The+Oval,+Krinou+3,+Agios+Athanasios,+4103+Limassol,+Cyprus',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      'https://wa.me/35796867289',
      'https://www.google.com/maps/search/?api=1&query=The+Oval,+Krinou+3,+Agios+Athanasios,+4103+Limassol,+Cyprus',
    ],
    areaServed: [
      { '@type': 'Airport', name: 'Larnaca International Airport (LCA)' },
      { '@type': 'Airport', name: 'Paphos International Airport (PFO)' },
      { '@type': 'City', name: 'Limassol' },
      { '@type': 'City', name: 'Paphos' },
      { '@type': 'City', name: 'Larnaca' },
      { '@type': 'City', name: 'Nicosia' },
      { '@type': 'City', name: 'Ayia Napa' },
      { '@type': 'City', name: 'Protaras' },
      { '@type': 'Place', name: 'Coral Bay' },
      { '@type': 'Place', name: 'Peyia' },
      { '@type': 'Place', name: 'Polis Chrysochous' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+35796867289',
      contactType: 'customer service',
      url: 'https://wa.me/35796867289',
      availableLanguage: ['English', 'Russian'],
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: String(passengerReviews.length),
      bestRating: '5',
      worstRating: '1',
    },
    review: passengerReviews.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewBody: r.text[lang],
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(r.rating),
        bestRating: '5',
        worstRating: '1',
      },
    })),
  };
}

export function getPageSeo(pathname: string, search = ''): SeoMetadata {
  const parsed = parseRoute(pathname, search);
  const { lang, view, slug } = parsed;
  const alternates = getAlternatePaths(pathname, search);
  const enUrl = `${SITE_URL}${alternates.en}`;
  const ruUrl = `${SITE_URL}${alternates.ru}`;
  const canonicalUrl = lang === 'ru' ? ruUrl : enUrl;

  if (view === 'success') {
    return {
      lang,
      title: lang === 'ru' ? 'Бронирование подтверждено | Cyprus Airport Transfers' : 'Booking Confirmed | Cyprus Airport Transfers',
      description:
        lang === 'ru'
          ? 'Статус и подтверждение вашего бронирования трансфера из аэропортов Кипра.'
          : 'Your Cyprus airport transfer booking confirmation details.',
      canonicalUrl,
      enUrl,
      ruUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'noindex, nofollow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [getBaseTaxiServiceSchema(lang)],
      },
    };
  }

  if (view === 'route' && slug) {
    const route = getAirportRouteBySlug(slug);
    if (route) {
      const content = route[lang];
      const homeUrl = `${SITE_URL}${buildLocalizedPath('home', lang)}`;
      const routesUrl = `${SITE_URL}${buildLocalizedPath('routes-index', lang)}`;
      return {
        lang,
        title: content.title,
        description: content.metaDescription,
        canonicalUrl,
        enUrl,
        ruUrl,
        ogType: 'website',
        ogImage: `${SITE_URL}${route.image}`,
        robots: 'index, follow',
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            getBaseTaxiServiceSchema(lang),
            {
              '@type': 'Service',
              name: content.h1,
              description: content.metaDescription,
              serviceType: route.airportCode ? 'Airport Transfer' : 'Private Intercity Transfer',
              provider: { '@id': `${SITE_URL}/#organization` },
              url: canonicalUrl,
              offers: {
                '@type': 'Offer',
                price: String(route.basePrice),
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: canonicalUrl,
              },
            },
            {
              '@type': 'FAQPage',
              mainEntity: content.faqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: lang === 'ru' ? 'Главная' : 'Home',
                  item: homeUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: lang === 'ru' ? 'Все маршруты' : 'All Routes',
                  item: routesUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: content.h1,
                  item: canonicalUrl,
                },
              ],
            },
          ],
        },
      };
    }
  }

  if (view === 'routes-index') {
    const homeUrl = `${SITE_URL}${buildLocalizedPath('home', lang)}`;
    return {
      lang,
      title:
        lang === 'ru'
          ? 'Все маршруты трансфера по Кипру (LCA, PFO, Лимассол) | Тарифы'
          : 'All Cyprus Transfer Routes & Prices (Limassol, LCA & PFO)',
      description:
        lang === 'ru'
          ? 'Все 30 доступных маршрутов трансфера с базы в Лимассоле: аэропорты Ларнака (LCA) и Пафос (PFO), Лимассол, Пафос, Никосия, Айя-Напа, Протарас и Корал Бэй с фиксированными тарифами.'
          : 'All 30 active fixed-price transfer routes operated from Limassol: Larnaca Airport (LCA), Paphos Airport (PFO), Limassol, Paphos, Coral Bay, Nicosia, Ayia Napa, and Protaras.',
      canonicalUrl,
      enUrl,
      ruUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          getBaseTaxiServiceSchema(lang),
          {
            '@type': 'CollectionPage',
            name: lang === 'ru' ? 'Все маршруты трансфера по Кипру' : 'Cyprus Airport & Intercity Transfer Routes',
            url: canonicalUrl,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: lang === 'ru' ? 'Главная' : 'Home',
                item: homeUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: lang === 'ru' ? 'Все маршруты' : 'All Routes',
                item: canonicalUrl,
              },
            ],
          },
        ],
      },
    };
  }

  if (view === 'blog-list') {
    const homeUrl = `${SITE_URL}${buildLocalizedPath('home', lang)}`;
    return {
      lang,
      title:
        lang === 'ru'
          ? 'Блог о путешествиях и трансферах на Кипре | Cyprus Airport Transfers'
          : 'Cyprus Airport Transfer Blog & Travel Guides | LCA & PFO Tips',
      description:
        lang === 'ru'
          ? 'Полезные гиды для туристов на Кипре: как добраться из аэропортов Ларнака и Пафос, сравнение такси и автобусов, советы по курортам.'
          : 'Helpful Cyprus travel guides: getting from Larnaca (LCA) and Paphos (PFO) airports, taxi vs bus comparisons, and resort arrival tips.',
      canonicalUrl,
      enUrl,
      ruUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Blog',
            name: lang === 'ru' ? 'Блог Cyprus Airport Transfers' : 'Cyprus Airport Transfers Blog',
            url: canonicalUrl,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: lang === 'ru' ? 'Главная' : 'Home',
                item: homeUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: lang === 'ru' ? 'Блог' : 'Blog',
                item: canonicalUrl,
              },
            ],
          },
        ],
      },
    };
  }

  if (view === 'blog-post' && slug) {
    const post = blogPosts.find((p) => p.slug === slug);
    const homeUrl = `${SITE_URL}${buildLocalizedPath('home', lang)}`;
    const blogUrl = `${SITE_URL}${buildLocalizedPath('blog-list', lang)}`;
    if (post) {
      const postImage = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;
      return {
        lang,
        title: `${post.title[lang]} | Cyprus Airport Transfers`,
        description: post.excerpt[lang],
        canonicalUrl,
        enUrl,
        ruUrl,
        ogType: 'article',
        ogImage: postImage,
        robots: 'index, follow',
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            {
              '@type': 'BlogPosting',
              headline: post.title[lang],
              description: post.excerpt[lang],
              datePublished: post.date,
              dateModified: post.date,
              image: postImage,
              inLanguage: lang,
              mainEntityOfPage: canonicalUrl,
              author: {
                '@type': 'Organization',
                name: 'Cyprus Airport Transfers',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Cyprus Airport Transfers',
                logo: {
                  '@type': 'ImageObject',
                  url: `${SITE_URL}/logo.svg`,
                },
              },
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: lang === 'ru' ? 'Главная' : 'Home',
                  item: homeUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: lang === 'ru' ? 'Блог' : 'Blog',
                  item: blogUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: post.title[lang],
                  item: canonicalUrl,
                },
              ],
            },
          ],
        },
      };
    }

    return {
      lang,
      title: lang === 'ru' ? 'Статья не найдена | Cyprus Airport Transfers' : 'Article Not Found | Cyprus Airport Transfers',
      description: '',
      canonicalUrl,
      enUrl,
      ruUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      robots: 'noindex, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [getBaseTaxiServiceSchema(lang)],
      },
    };
  }

  // Default: Home Page (EN or RU)
  const homeTitle =
    lang === 'ru'
      ? 'Трансфер на Кипре: Лимассол, аэропорты Ларнаки (LCA) и Пафоса (PFO) 24/7'
      : 'Cyprus Transfers: Limassol, Larnaca (LCA) & Paphos (PFO) Airport Taxi 24/7';
  const homeDesc =
    lang === 'ru'
      ? 'Индивидуальные трансферы с базой в Лимассоле: аэропорты Ларнака (LCA) и Пафос (PFO), Пафос, Никосия, Айя-Напа и Протарас. Фиксированные цены от €75, -10% обратно.'
      : 'Fixed-price private transfers based in Limassol: Larnaca Airport (LCA), Paphos Airport (PFO), Paphos, Nicosia, Ayia Napa & Protaras. From €75, 10% off return.';

  return {
    lang,
    title: homeTitle,
    description: homeDesc,
    canonicalUrl,
    enUrl,
    ruUrl,
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: 'Cyprus Airport Transfers',
          url: `${SITE_URL}/`,
          inLanguage: ['en', 'ru'],
        },
        {
          ...getBaseTaxiServiceSchema(lang),
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name:
              lang === 'ru'
                ? 'Тарифы на трансфер по Кипру (Лимассол, LCA и PFO)'
                : 'Cyprus Airport & Intercity Transfer Rates (Limassol, LCA & PFO)',
            itemListElement: airportRoutes.map((route) => ({
              '@type': 'Offer',
              name: route[lang].h1,
              price: String(route.basePrice),
              priceCurrency: 'EUR',
              url: `${SITE_URL}${buildLocalizedPath('route', lang, route.slug)}`,
            })),
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: globalAirportFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q[lang],
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a[lang],
            },
          })),
        },
      ],
    },
  };
}
