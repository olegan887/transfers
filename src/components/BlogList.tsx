import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { blogPosts } from '../data/blog';
import { ArrowRight, Calendar } from 'lucide-react';

export default function BlogList() {
  const { language, t } = useLanguage();

  useEffect(() => {
    document.title = `${t('blog.title')} | Cyprus Airport Transfers`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('blog.subtitle'));
    }
  }, [language, t]);

  return (
    <section className="py-32 relative min-h-screen bg-[#050505]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tighter">
            {t('blog.title')}
          </h1>
          <p className="text-lg text-white/60 font-light">
            {t('blog.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {blogPosts.map((post) => (
            <a 
              key={post.id} 
              href={`/blog/${post.slug}`}
              className="group rounded-[2rem] overflow-hidden glass-panel hover:border-white/20 transition-all duration-500 flex flex-col"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title[language]} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-white/40 text-xs mb-4">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(post.date).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <h2 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                  {post.title[language]}
                </h2>
                <p className="text-white/60 text-sm mb-8 flex-1">
                  {post.excerpt[language]}
                </p>
                <div className="flex items-center text-white text-sm font-bold uppercase tracking-wider group-hover:text-blue-400 transition-colors">
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
