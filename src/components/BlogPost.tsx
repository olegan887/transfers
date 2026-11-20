import React, { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { blogPosts } from '../data/blog';
import { airportRoutes, getRouteContentForLanguage } from '../data/routes';
import { buildLocalizedPath, Language } from '../lib/routing';
import { ArrowLeft, ArrowRight, Calendar, ChevronDown } from 'lucide-react';

interface BlogPostProps {
  slug: string;
}

const BLOG_UI_COPY: Record<
  Language,
  {
    notFound: string;
    faqTitle: string;
    routesTitle: string;
    routesSubtitle: string;
  }
> = {
  en: {
    notFound: 'Article not found',
    faqTitle: 'Frequently Asked Questions',
    routesTitle: 'Book a Fixed-Price Cyprus Transfer (LCA, PFO & Limassol)',
    routesSubtitle: 'Choose a direct route below to view fixed prices and book online:',
  },
  ru: {
    notFound: 'Статья не найдена',
    faqTitle: 'Частые вопросы (FAQ)',
    routesTitle: 'Забронировать трансфер на Кипре (LCA, PFO и Лимассол)',
    routesSubtitle: 'Выберите популярный маршрут и зафиксируйте стоимость поездки онлайн:',
  },
  de: {
    notFound: 'Artikel nicht gefunden',
    faqTitle: 'Häufig gestellte Fragen (FAQ)',
    routesTitle: 'Zypern-Flughafentransfer zum Festpreis buchen (LCA, PFO & Limassol)',
    routesSubtitle: 'Wählen Sie eine direkte Strecke für Festpreise und Online-Buchung:',
  },
  pl: {
    notFound: 'Nie znaleziono artykułu',
    faqTitle: 'Najczęstsze pytania (FAQ)',
    routesTitle: 'Zarezerwuj transfer na Cyprze w stałej cenie (LCA, PFO i Limassol)',
    routesSubtitle: 'Wybierz popularną trasę poniżej, aby zobaczyć cenę i zarezerwować online:',
  },
  fr: {
    notFound: 'Article introuvable',
    faqTitle: 'Questions fréquentes (FAQ)',
    routesTitle: 'Réserver un transfert à tarif fixe à Chypre (LCA, PFO & Limassol)',
    routesSubtitle: 'Sélectionnez un trajet direct pour consulter le tarif fixe et réserver :',
  },
  el: {
    notFound: 'Το άρθρο δεν βρέθηκε',
    faqTitle: 'Συχνές ερωτήσεις (FAQ)',
    routesTitle: 'Κράτηση μεταφοράς σταθερής τιμής στην Κύπρο (LCA, PFO & Λεμεσός)',
    routesSubtitle: 'Επιλέξτε μια απευθείας διαδρομή παρακάτω για τιμή και online κράτηση:',
  },
  it: {
    notFound: 'Articolo non trovato',
    faqTitle: 'Domande frequenti (FAQ)',
    routesTitle: 'Prenota un transfer a Cipro a prezzo fisso (LCA, PFO & Limassol)',
    routesSubtitle: 'Scegli una tratta diretta per visualizzare il prezzo fisso e prenotare online:',
  },
};

export default function BlogPost({ slug }: BlogPostProps) {
  const { language, t } = useLanguage();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const post = blogPosts.find((p) => p.slug === slug);
  const activeLang: Language = post
    ? post.supportedLanguages?.includes(language)
      ? language
      : language === 'ru'
      ? 'ru'
      : 'en'
    : language;

  const ui = BLOG_UI_COPY[activeLang] || BLOG_UI_COPY.en;
  const homeHref = buildLocalizedPath('home', activeLang);
  const blogHref = buildLocalizedPath('blog-list', activeLang);

  if (!post) {
    return (
      <main className="min-h-[75vh] flex items-center justify-center bg-white text-black px-4">
        <div className="text-center bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-5xl font-black mb-4 uppercase bg-red-400 inline-block px-4 py-2 border-4 border-black">
            404
          </h1>
          <p className="text-xl font-bold mb-6">{ui.notFound}</p>
          <a href={blogHref} className="brutal-btn inline-block px-8 py-3 text-base uppercase">
            {t('blog.backToBlog')}
          </a>
        </div>
      </main>
    );
  }

  const postTitle = post.title[activeLang] || post.title.en;
  const postContent = post.content[activeLang] || post.content.en;
  const postFaqs = post.faqs?.[activeLang] || post.faqs?.en || [];

  return (
    <main className="py-12 md:py-16 bg-white min-h-screen">
      <article className="container mx-auto px-4 max-w-3xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-xs sm:text-sm font-bold text-gray-700 flex flex-wrap items-center gap-2"
        >
          <a href={homeHref} className="hover:text-black underline">
            {t('common.home')}
          </a>
          <span aria-hidden="true">/</span>
          <a href={blogHref} className="hover:text-black underline">
            {t('nav.blog')}
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-black line-clamp-1">{postTitle}</span>
        </nav>

        <a
          href={blogHref}
          className="inline-flex items-center text-black font-bold hover:bg-yellow-100 mb-6 transition-colors bg-white border-2 border-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-sm"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('blog.backToBlog')}
        </a>

        <header className="mb-10">
          <div className="flex items-center gap-2 text-gray-700 font-bold text-sm mb-4 tabular-nums">
            <Calendar className="w-4 h-4 text-black" />
            <time dateTime={post.date}>{post.date}</time>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-6 leading-tight tracking-tight uppercase">
            {postTitle}
          </h1>
          <div className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden aspect-[4/3] bg-gray-100">
            <img
              src={post.image}
              alt={postTitle}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        <div className="prose prose-lg max-w-none text-black font-medium prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-black prose-a:font-bold prose-a:underline prose-p:leading-relaxed bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {postContent}
        </div>

        {/* Structured FAQ Accordion matching FAQPage Schema.org JSON-LD */}
        {postFaqs.length > 0 && (
          <section className="mt-12" aria-labelledby="blog-faq-heading">
            <h2
              id="blog-faq-heading"
              className="text-2xl sm:text-3xl font-black text-black uppercase tracking-tight mb-5"
            >
              {ui.faqTitle}
            </h2>
            <div className="space-y-4">
              {postFaqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div
                    key={faq.q}
                    className="bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full px-5 py-4 flex items-center justify-between gap-4 text-left font-black text-black text-base hover:bg-yellow-50 transition-colors"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 pt-2 border-t-2 border-black text-gray-800 text-sm sm:text-base font-medium leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* Internal Link Block to Active Routes */}
        <section className="mt-12 bg-yellow-400 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-black text-black uppercase mb-3">{ui.routesTitle}</h2>
          <p className="text-sm font-bold text-black mb-4">{ui.routesSubtitle}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {airportRoutes
              .filter((r) =>
                [
                  'larnaca-airport-to-limassol',
                  'paphos-airport-to-limassol',
                  'larnaca-airport-to-paphos',
                  'paphos-airport-to-ayia-napa',
                ].includes(r.slug)
              )
              .map((r) => (
                <a
                  key={r.slug}
                  href={buildLocalizedPath('route', activeLang, r.slug)}
                  className="bg-white border-2 border-black px-3.5 py-2.5 flex items-center justify-between text-xs sm:text-sm font-black hover:bg-black hover:text-white transition-colors"
                >
                  <span>{getRouteContentForLanguage(r, activeLang).h1}</span>
                  <span className="inline-flex items-center gap-1 ml-2 shrink-0 tabular-nums">
                    €{r.basePrice}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </a>
              ))}
          </div>
        </section>
      </article>
    </main>
  );
}
