import React, { useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { blogPosts } from '../data/blog';
import { ArrowLeft, Calendar } from 'lucide-react';

interface BlogPostProps {
  slug: string;
}

export default function BlogPost({ slug }: BlogPostProps) {
  const { language, t } = useLanguage();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title[language]} | Cyprus Airport Transfers`;
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', post.excerpt[language]);
      }
    }
  }, [post, language]);

    if (!post) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="absolute top-10 right-1/4 w-32 h-32 border-8 border-black transform rotate-45" />
            <div className="absolute bottom-10 left-10 w-40 h-40 bg-yellow-400 rounded-full" />
          </div>
          <div className="text-center bg-white border-4 border-black p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 relative z-10">
            <h1 className="text-6xl font-black mb-4 uppercase tracking-tighter bg-red-400 inline-block px-4 py-2 border-4 border-black transform rotate-2">404</h1>
            <p className="text-xl font-bold mb-8">Article not found</p>
            <a href="/blog" className="brutal-btn inline-block px-8 py-4 text-xl uppercase">
              {t('blog.backToBlog')}
            </a>
          </div>
        </div>
      );
    }

    return (
      <article className="py-32 relative min-h-screen bg-white overflow-hidden">
        {/* Background Doodles */}
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border-8 border-black rounded-full" />
          <div className="absolute top-40 right-20 w-24 h-24 bg-yellow-400 transform rotate-12" />
          <div className="absolute bottom-40 left-1/4 w-40 h-40 border-8 border-black transform -rotate-12" />
        </div>

        <div className="container mx-auto px-4 relative z-10 max-w-3xl">
          <a 
            href="/blog" 
            className="inline-flex items-center text-black font-bold hover:text-yellow-500 mb-8 transition-colors bg-white border-2 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform -rotate-1"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('blog.backToBlog')}
          </a>

          <div className="mb-12">
            <div className="flex items-center gap-2 text-black font-bold text-sm mb-6 bg-yellow-400 border-2 border-black px-3 py-1 w-fit shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(post.date).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-black mb-8 leading-tight tracking-tighter uppercase">
              <span className="bg-white border-4 border-black px-4 py-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] inline-block transform -rotate-1">
                {post.title[language]}
              </span>
            </h1>
            <div className="border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden aspect-video mb-12 bg-white">
              <img 
                src={post.image} 
                alt={post.title[language]} 
                className="w-full h-full object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
              />
            </div>
          </div>

          <div className="prose prose-lg max-w-none text-black font-medium prose-headings:font-black prose-headings:uppercase prose-headings:tracking-tight prose-a:text-black prose-a:font-bold prose-a:underline prose-a:decoration-4 prose-a:decoration-yellow-400 hover:prose-a:bg-yellow-400 prose-p:leading-relaxed prose-li:font-medium bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {post.content[language]}
          </div>
        </div>
      </article>
    );
}
