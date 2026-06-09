import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { blogPosts } from '../data/blog';
import { getLinkPath } from '../lib/utils';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { ArrowRight, Calendar } from 'lucide-react';

export default function BlogList() {
  const { language, t } = useLanguage();

  useDocumentMeta(
    `${t('blog.title')} | Cyprus Airport Transfers`,
    t('blog.subtitle')
  );

  return (
    <section className="py-32 relative min-h-screen bg-white overflow-hidden">
      {/* Background Doodles */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 border-8 border-black rounded-full" />
        <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-400 transform rotate-12" />
        <div className="absolute bottom-40 left-1/4 w-40 h-40 border-8 border-black transform -rotate-12" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-7xl font-black text-black mb-6 uppercase tracking-tighter bg-yellow-400 inline-block px-6 py-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-2">
            {t('blog.title')}
          </h1>
          <p className="text-xl text-black font-bold mt-8 bg-white border-2 border-black inline-block px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
            {t('blog.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <a 
              key={post.id} 
              href={getLinkPath(`/blog/${post.slug}`)}
              className="group bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:-translate-x-1 transition-all duration-200 flex flex-col"
            >
              <div className="h-48 overflow-hidden border-b-4 border-black relative">
                <img 
                  src={post.image} 
                  alt={post.title[language]} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter grayscale group-hover:grayscale-0"
                />
                <div className="absolute top-4 right-4 bg-yellow-400 border-2 border-black px-3 py-1 text-black font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform rotate-2">
                  {new Date(post.date).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h2 className="text-2xl font-black text-black mb-4 uppercase tracking-tight leading-tight group-hover:text-yellow-500 transition-colors">
                  {post.title[language]}
                </h2>
                <p className="text-black font-medium mb-8 flex-1">
                  {post.excerpt[language]}
                </p>
                <div className="brutal-btn w-full py-3 text-sm flex items-center justify-center">
                  {t('blog.readMore')}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
