import React from 'react';
import { useLanguage } from '../i18n/LanguageContext';

export default function SeoArticle() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-4 border-t-4 border-black">
      <div className="container mx-auto px-4">
        {/* Visually hidden but accessible to screen readers and search engines */}
        <div className="sr-only">
          <h2>Cyprus Airport Transfers: Paphos (PFO) and Larnaca (LCA)</h2>
          <p>{t('seo.article')}</p>
        </div>
        
        {/* Subtle visible version to avoid search engine penalties for hidden text */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] leading-relaxed text-black font-bold">
            {t('seo.article')}
          </p>
        </div>
      </div>
    </section>
  );
}
