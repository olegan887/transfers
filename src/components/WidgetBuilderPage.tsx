import React, { useEffect, useMemo, useState } from 'react';
import { Code2, Copy, Check, Rss, ExternalLink } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { getLoadedTranslation, isTranslationLoaded, loadTranslation } from '../i18n/localeLoader';
import { locations, getPrice } from '../data/pricing';
import {
  CORE_LANGUAGES,
  LANGUAGE_LABELS,
  Language,
  SITE_URL,
  buildLocalizedPath,
} from '../lib/routing';
import EmbedCalculator, { EmbedTheme } from './EmbedCalculator';

export default function WidgetBuilderPage() {
  const { language, t } = useLanguage();
  const [widgetLang, setWidgetLang] = useState<Language>(language);
  const [widgetTheme, setWidgetTheme] = useState<EmbedTheme>('brutal');
  const [defaultFrom, setDefaultFrom] = useState('lca');
  const [defaultTo, setDefaultTo] = useState('limassol');
  const [widthMode, setWidthMode] = useState<'responsive' | 'compact'>('responsive');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [, setLocaleTick] = useState(0);

  useEffect(() => {
    let active = true;
    if (!isTranslationLoaded(widgetLang)) {
      loadTranslation(widgetLang).then(() => {
        if (active) setLocaleTick((v) => v + 1);
      });
    }
    return () => {
      active = false;
    };
  }, [widgetLang]);

  const availableDestinations = useMemo(() => {
    return locations.filter(
      (loc) => loc.id !== defaultFrom && getPrice(defaultFrom, loc.id, 'sedan') !== null
    );
  }, [defaultFrom]);

  const handleFromChange = (nextFrom: string) => {
    setDefaultFrom(nextFrom);
    const valid = locations.filter(
      (loc) => loc.id !== nextFrom && getPrice(nextFrom, loc.id, 'sedan') !== null
    );
    if (valid.length > 0 && !valid.some((v) => v.id === defaultTo)) {
      setDefaultTo(valid[0].id);
    }
  };

  const embedPath = buildLocalizedPath('embed', widgetLang);
  const embedSrc = `${SITE_URL}${embedPath}?from=${encodeURIComponent(defaultFrom)}&to=${encodeURIComponent(
    defaultTo
  )}&theme=${widgetTheme}`;
  const maxWidthStyle = widthMode === 'compact' ? 'max-width:380px;' : 'max-width:100%;';
  const widgetTrans = getLoadedTranslation(widgetLang);

  const embedSnippet = `<div style="${maxWidthStyle}margin:0 auto;">
  <iframe src="${embedSrc}" width="100%" height="445" style="border:0;overflow:hidden;border-radius:14px;" loading="lazy" title="${widgetTrans.embed.title}"></iframe>
  <p style="margin:6px 0 0;font-size:12px;text-align:center;font-family:sans-serif;">
    <a href="${SITE_URL}${buildLocalizedPath('home', widgetLang)}?utm_source=widget&utm_medium=embed" target="_blank" rel="noopener nofollow">Cyprus Airport Transfers</a>
  </p>
</div>`;

  const feedUrls = [
    {
      id: 'rss-en',
      label: 'RSS 2.0 Feed (English)',
      url: `${SITE_URL}/rss.xml`,
    },
    {
      id: 'rss-ru',
      label: 'RSS 2.0 Feed (Русский)',
      url: `${SITE_URL}/ru/rss.xml`,
    },
    {
      id: 'json-en',
      label: 'JSON Feed 1.1 (English)',
      url: `${SITE_URL}/feed.json`,
    },
    {
      id: 'json-ru',
      label: 'JSON Feed 1.1 (Русский)',
      url: `${SITE_URL}/ru/feed.json`,
    },
  ];

  const handleCopy = (key: string, text: string) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).catch(() => {});
    }
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 2500);
  };

  return (
    <main className="py-12 md:py-16 bg-white min-h-[75vh]">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-xs sm:text-sm font-bold text-gray-700 flex items-center gap-2"
        >
          <a href={buildLocalizedPath('home', language)} className="hover:underline">
            {t('common.home')}
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-black">{t('widgetPage.breadcrumb')}</span>
        </nav>

        {/* Page Hero */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400 border-2 border-black text-black font-black text-xs uppercase mb-4">
            <Code2 className="w-4 h-4" />
            {t('widgetPage.badge')}
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-black uppercase tracking-tight mb-4">
            {t('widgetPage.h1')}
          </h1>
          <p className="text-base md:text-lg text-gray-700 font-medium max-w-3xl">
            {t('widgetPage.desc')}
          </p>
        </div>

        {/* Configurator + Live Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-14">
          {/* Controls & Embed Code */}
          <div className="lg:col-span-7 brutal-card bg-white p-6 md:p-8 space-y-6">
            <h2 className="text-xl font-black text-black uppercase tracking-tight">
              {t('widgetPage.step1')}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="builder-lang"
                  className="block text-xs font-black uppercase text-gray-600 mb-1.5"
                >
                  {t('widgetPage.widgetLang')}
                </label>
                <select
                  id="builder-lang"
                  value={widgetLang}
                  onChange={(e) => setWidgetLang(e.target.value as Language)}
                  className="w-full px-3 py-2.5 text-sm font-bold text-black bg-white border-2 border-black rounded-lg"
                >
                  {CORE_LANGUAGES.map((code) => (
                    <option key={code} value={code}>
                      {LANGUAGE_LABELS[code].code} — {LANGUAGE_LABELS[code].native}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-black uppercase text-gray-600 mb-1.5">
                  {t('widgetPage.visualTheme')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setWidgetTheme('brutal')}
                    className={`py-2.5 px-3 border-2 border-black font-black text-xs uppercase rounded-lg transition-colors ${
                      widgetTheme === 'brutal'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    {t('widgetPage.brandYellow')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setWidgetTheme('light')}
                    className={`py-2.5 px-3 border-2 border-black font-black text-xs uppercase rounded-lg transition-colors ${
                      widgetTheme === 'light'
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    {t('widgetPage.minimalLight')}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="builder-from"
                  className="block text-xs font-black uppercase text-gray-600 mb-1.5"
                >
                  {t('widgetPage.defaultPickup')}
                </label>
                <select
                  id="builder-from"
                  value={defaultFrom}
                  onChange={(e) => handleFromChange(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm font-bold text-black bg-white border-2 border-black rounded-lg"
                >
                  {locations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name[language]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="builder-to"
                  className="block text-xs font-black uppercase text-gray-600 mb-1.5"
                >
                  {t('widgetPage.defaultDropoff')}
                </label>
                <select
                  id="builder-to"
                  value={defaultTo}
                  onChange={(e) => setDefaultTo(e.target.value)}
                  className="w-full px-3 py-2.5 text-sm font-bold text-black bg-white border-2 border-black rounded-lg"
                >
                  {availableDestinations.map((loc) => (
                    <option key={loc.id} value={loc.id}>
                      {loc.name[language]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-black uppercase text-gray-600 mb-1.5">
                {t('widgetPage.containerWidth')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setWidthMode('responsive')}
                  className={`py-2 px-3 border-2 border-black font-black text-xs uppercase rounded-lg transition-colors ${
                    widthMode === 'responsive'
                      ? 'bg-black text-yellow-400'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {t('widgetPage.widthResponsive')}
                </button>
                <button
                  type="button"
                  onClick={() => setWidthMode('compact')}
                  className={`py-2 px-3 border-2 border-black font-black text-xs uppercase rounded-lg transition-colors ${
                    widthMode === 'compact'
                      ? 'bg-black text-yellow-400'
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  {t('widgetPage.widthCompact')}
                </button>
              </div>
            </div>

            <div className="pt-2 border-t-2 border-black">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                <h3 className="text-base font-black text-black uppercase">
                  {t('widgetPage.step2')}
                </h3>
                <button
                  type="button"
                  onClick={() => handleCopy('embed', embedSnippet)}
                  className="brutal-btn px-4 py-2 text-xs"
                >
                  {copiedKey === 'embed' ? (
                    <>
                      <Check className="w-4 h-4 mr-1.5" />
                      {t('widgetPage.copied')}
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-1.5" />
                      {t('widgetPage.copyCode')}
                    </>
                  )}
                </button>
              </div>
              <pre className="p-3.5 bg-gray-900 text-yellow-300 text-xs rounded-xl border-2 border-black overflow-x-auto whitespace-pre-wrap break-all font-mono">
                {embedSnippet}
              </pre>
            </div>
          </div>

          {/* Live Preview */}
          <div className="lg:col-span-5 bg-gray-50 border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-black uppercase tracking-wider text-black bg-yellow-400 px-2.5 py-1 border-2 border-black">
                {t('widgetPage.livePreview')}
              </span>
              <a
                href={embedSrc}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-black underline hover:text-yellow-600"
              >
                {t('widgetPage.openStandalone')}
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
            <EmbedCalculator
              isPreview
              previewLang={widgetLang}
              previewTheme={widgetTheme}
              previewFrom={defaultFrom}
              previewTo={defaultTo}
            />
          </div>
        </div>

        {/* RSS 2.0 & JSON Feeds Section */}
        <section className="brutal-card bg-yellow-50 p-6 md:p-8">
          <div className="flex items-start gap-3 mb-5">
            <div className="p-2.5 bg-yellow-400 border-2 border-black rounded-xl shrink-0">
              <Rss className="w-5 h-5 text-black" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-black text-black uppercase tracking-tight">
                {t('widgetPage.rssTitle')}
              </h2>
              <p className="text-sm font-medium text-gray-700 mt-1">{t('widgetPage.rssDesc')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {feedUrls.map((feed) => (
              <div
                key={feed.id}
                className="bg-white border-2 border-black rounded-xl p-3.5 flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="text-xs font-black text-black uppercase">{feed.label}</div>
                  <a
                    href={feed.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-gray-600 hover:underline truncate block mt-0.5"
                  >
                    {feed.url}
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy(feed.id, feed.url)}
                  className="px-3 py-1.5 bg-black text-yellow-400 text-xs font-black rounded-lg shrink-0 hover:bg-gray-800 transition-colors"
                >
                  {copiedKey === feed.id ? t('widgetPage.copiedShort') : t('widgetPage.copy')}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
