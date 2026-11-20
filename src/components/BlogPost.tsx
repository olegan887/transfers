import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { blogPosts } from '../data/blog';
import { airportRoutes } from '../data/routes';
import { buildLocalizedPath } from '../lib/routing';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';

interface BlogPostProps {
  slug: string;
}

export default function BlogPost({ slug }: BlogPostProps) {
  const { language, t } = useLanguage();
  const post = blogPosts.find((p) => p.slug === slug);
  const homeHref = buildLocalizedPath('home', language);
  const blogHref = buildLocalizedPath('blog-list', language);

  if (!post) {
    return (
      <main className="min-h-[75vh] flex items-center justify-center bg-white text-black px-4">
        <div className="text-center bg-white border-4 border-black p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-5xl font-black mb-4 uppercase bg-red-400 inline-block px-4 py-2 border-4 border-black">
            404
          </h1>
          <p className="text-xl font-bold mb-6">
            {language === 'ru' ? 'Статья не найдена' : 'Article not found'}
          </p>
          <a href={blogHref} className="brutal-btn inline-block px-8 py-3 text-base uppercase">
            {t('blog.backToBlog')}
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="py-12 md:py-16 bg-white min-h-screen">
      <article className="container mx-auto px-4 max-w-3xl">
        <nav aria-label="Breadcrumb" className="mb-6 text-xs sm:text-sm font-bold text-gray-700 flex flex-wrap items-center gap-2">
          <a href={homeHref} className="hover:text-black underline">
            {language === 'ru' ? 'Главная' : 'Home'}
          </a>
          <span aria-hidden="true">/</span>
          <a href={blogHref} className="hover:text-black underline">
            {t('nav.blog')}
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-black line-clamp-1">{post.title[language]}</span>
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
            {post.title[language]}
          </h1>
          <div className="border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] overflow-hidden aspect-[4/3] bg-gray-100">
            <img
              src={post.image}
              alt={post.title[language]}
              width={800}
              height={600}
              className="w-full h-full object-cover"
            />
          </div>
        </header>

        <div className="prose prose-lg max-w-none text-black font-medium prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-black prose-a:font-bold prose-a:underline prose-p:leading-relaxed bg-white border-4 border-black p-6 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {post.content[language]}
        </div>

        {/* Internal Link Block to Active Routes */}
        <section className="mt-12 bg-yellow-400 border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-black text-black uppercase mb-3">
            {language === 'ru'
              ? 'Забронировать трансфер на Кипре (LCA, PFO и Лимассол)'
              : 'Book a Fixed-Price Cyprus Transfer (LCA, PFO & Limassol)'}
          </h2>
          <p className="text-sm font-bold text-black mb-4">
            {language === 'ru'
              ? 'Выберите популярный маршрут и зафиксируйте стоимость поездки онлайн:'
              : 'Choose a direct route below to view fixed prices and book online:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {airportRoutes
              .filter((r) =>
                [
                  'larnaca-airport-to-limassol',
                  'paphos-airport-to-limassol',
                  'larnaca-airport-to-paphos',
                  'limassol-to-ayia-napa',
                ].includes(r.slug)
              )
              .map((r) => (
              <a
                key={r.slug}
                href={buildLocalizedPath('route', language, r.slug)}
                className="bg-white border-2 border-black px-3.5 py-2.5 flex items-center justify-between text-xs sm:text-sm font-black hover:bg-black hover:text-white transition-colors"
              >
                <span>{r[language].h1}</span>
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
