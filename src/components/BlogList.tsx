import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { blogPosts } from '../data/blog';
import { buildLocalizedPath } from '../lib/routing';
import { ArrowRight } from 'lucide-react';

export default function BlogList() {
  const { language, t } = useLanguage();
  const blogLang: 'en' | 'ru' = language === 'ru' ? 'ru' : 'en';
  const homeHref = buildLocalizedPath('home', blogLang);

  return (
    <main className="py-14 md:py-20 relative min-h-screen bg-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <nav aria-label="Breadcrumb" className="mb-8 text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2">
          <a href={homeHref} className="hover:text-black underline">
            {t('common.home')}
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-black">{t('nav.blog')}</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto mb-14">
          <h1 className="text-4xl md:text-6xl font-black text-black mb-5 uppercase tracking-tight bg-yellow-400 inline-block px-6 py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            {t('blog.title')}
          </h1>
          <p className="text-lg md:text-xl text-gray-800 font-bold mt-4">{t('blog.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {blogPosts.map((post) => (
            <a
              key={post.id}
              href={buildLocalizedPath('blog-post', blogLang, post.slug)}
              className="group bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200 flex flex-col"
            >
              <div className="h-48 overflow-hidden border-b-4 border-black relative bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title[blogLang]}
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="text-xs font-bold text-gray-600 mb-2 tabular-nums">
                  {post.date}
                </div>
                <h2 className="text-xl font-black text-black mb-3 tracking-tight leading-snug group-hover:text-yellow-600 transition-colors">
                  {post.title[blogLang]}
                </h2>
                <p className="text-gray-800 text-sm font-medium mb-6 flex-1">
                  {post.excerpt[blogLang]}
                </p>
                <div className="brutal-btn w-full py-2.5 text-sm flex items-center justify-center">
                  <span>{t('blog.readMore')}</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
