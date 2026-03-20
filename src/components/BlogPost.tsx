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
      <div className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <p className="text-white/60 mb-8">Article not found</p>
          <a href="/blog" className="px-6 py-3 bg-white text-black font-bold rounded-xl hover:bg-white/90 transition-colors">
            {t('blog.backToBlog')}
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="py-32 relative min-h-screen bg-[#050505]">
      <div className="container mx-auto px-4 relative z-10 max-w-3xl">
        <a 
          href="/blog" 
          className="inline-flex items-center text-white/60 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('blog.backToBlog')}
        </a>

        <div className="mb-12">
          <div className="flex items-center gap-2 text-blue-400 text-sm mb-6">
            <Calendar className="w-4 h-4" />
            <span>{new Date(post.date).toLocaleDateString(language === 'ru' ? 'ru-RU' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
            {post.title[language]}
          </h1>
          <div className="rounded-3xl overflow-hidden aspect-video mb-12">
            <img 
              src={post.image} 
              alt={post.title[language]} 
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="prose prose-invert prose-lg max-w-none prose-headings:text-white prose-a:text-blue-400 hover:prose-a:text-blue-300">
          {post.content[language]}
        </div>
      </div>
    </article>
  );
}
