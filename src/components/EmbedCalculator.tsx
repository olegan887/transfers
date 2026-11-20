import React, { useEffect, useMemo, useState } from 'react';
import { ArrowRight, CarFront, Clock, ArrowLeftRight } from 'lucide-react';
import { locations, getPrice, getRouteTime } from '../data/pricing';
import { airportRoutes } from '../data/routes';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { Language, SITE_URL, buildLocalizedPath } from '../lib/routing';

export type EmbedTheme = 'brutal' | 'light';

interface EmbedCalculatorProps {
  isPreview?: boolean;
  previewLang?: Language;
  previewTheme?: EmbedTheme;
  previewFrom?: string;
  previewTo?: string;
}

export default function EmbedCalculator({
  isPreview = false,
  previewLang,
  previewTheme,
  previewFrom,
  previewTo,
}: EmbedCalculatorProps) {
  const { language } = useLanguage();
  const activeLang: Language = previewLang || language;
  const activeTrans = translations[activeLang] || translations.en;
  const te = activeTrans.embed;

  const [from, setFrom] = useState(previewFrom || 'lca');
  const [to, setTo] = useState(previewTo || 'limassol');
  const [theme, setTheme] = useState<EmbedTheme>(previewTheme || 'brutal');
  const [isRoundTrip, setIsRoundTrip] = useState(false);

  // Sync controlled preview props when inside WidgetBuilderPage
  useEffect(() => {
    if (!isPreview) return;
    if (previewFrom) setFrom(previewFrom);
    if (previewTo) setTo(previewTo);
    if (previewTheme) setTheme(previewTheme);
  }, [isPreview, previewFrom, previewTo, previewTheme]);

  // Read standalone iframe query params safely on client mount (avoids SSR hydration mismatch)
  useEffect(() => {
    if (isPreview || typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const qFrom = params.get('from');
    const qTo = params.get('to');
    const qTheme = params.get('theme');
    if (qFrom && locations.some((l) => l.id === qFrom)) setFrom(qFrom);
    if (qTo && locations.some((l) => l.id === qTo)) setTo(qTo);
    if (qTheme === 'light' || qTheme === 'brutal') setTheme(qTheme);
  }, [isPreview]);

  // Available destinations that have a valid fixed price from `from`
  const availableDestinations = useMemo(() => {
    return locations.filter((loc) => loc.id !== from && getPrice(from, loc.id, 'sedan') !== null);
  }, [from]);

  // Auto-correct `to` if user switches `from` to an origin where previous `to` isn't serviced
  useEffect(() => {
    if (availableDestinations.length > 0 && !availableDestinations.some((d) => d.id === to)) {
      setTo(availableDestinations[0].id);
    }
  }, [availableDestinations, to]);

  const oneWayPrice = getPrice(from, to, 'sedan');
  const finalPrice = oneWayPrice
    ? isRoundTrip
      ? Math.round(oneWayPrice * 1.9)
      : oneWayPrice
    : null;
  const durationMin = getRouteTime(from, to);

  const matchedRoute = useMemo(() => {
    return airportRoutes.find(
      (r) => (r.fromId === from && r.toId === to) || (r.fromId === to && r.toId === from)
    );
  }, [from, to]);

  const targetBookUrl = matchedRoute
    ? `${SITE_URL}${buildLocalizedPath('route', activeLang, matchedRoute.slug)}?utm_source=widget&utm_medium=embed`
    : `${SITE_URL}${buildLocalizedPath('home', activeLang)}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}&utm_source=widget&utm_medium=embed`;

  const brandHomeUrl = `${SITE_URL}${buildLocalizedPath('home', activeLang)}?utm_source=widget&utm_medium=embed`;

  const isBrutal = theme === 'brutal';

  const cardShellClass = isBrutal
    ? 'bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl'
    : 'bg-white border border-gray-200 shadow-md rounded-2xl';

  const headerBgClass = isBrutal
    ? 'bg-yellow-400 border-b-2 border-black text-black'
    : 'bg-gray-900 border-b border-gray-800 text-white';

  const selectClass = isBrutal
    ? 'w-full px-3 py-2.5 text-sm font-bold text-black bg-white border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400'
    : 'w-full px-3 py-2.5 text-sm font-semibold text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900';

  const ctaClass = isBrutal
    ? 'w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] rounded-lg transition-all'
    : 'w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-black hover:bg-gray-800 text-white font-bold text-sm rounded-lg transition-all';

  return (
    <div className={isPreview ? 'w-full' : 'min-h-screen bg-transparent p-2 sm:p-3 flex items-start justify-center'}>
      <div className={`w-full max-w-md overflow-hidden ${cardShellClass}`}>
        {/* Compact Widget Header */}
        <div className={`px-4 py-3 flex items-center justify-between gap-2 ${headerBgClass}`}>
          <div className="flex items-center gap-2">
            <CarFront className="w-5 h-5 shrink-0" />
            <span className="font-black text-sm uppercase tracking-tight">{te.title}</span>
          </div>
          <span
            className={`text-[11px] font-black px-2 py-0.5 rounded ${
              isBrutal ? 'bg-black text-yellow-400' : 'bg-yellow-400 text-black'
            }`}
          >
            24/7
          </span>
        </div>

        {/* Route Form */}
        <div className="p-4 space-y-3.5">
          <div>
            <label
              htmlFor={isPreview ? 'preview-from' : 'embed-from'}
              className="block text-[11px] font-black uppercase tracking-wider text-gray-600 mb-1"
            >
              {te.pickup}
            </label>
            <select
              id={isPreview ? 'preview-from' : 'embed-from'}
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className={selectClass}
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name[activeLang]}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor={isPreview ? 'preview-to' : 'embed-to'}
              className="block text-[11px] font-black uppercase tracking-wider text-gray-600 mb-1"
            >
              {te.dropoff}
            </label>
            <select
              id={isPreview ? 'preview-to' : 'embed-to'}
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className={selectClass}
            >
              {availableDestinations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name[activeLang]}
                </option>
              ))}
            </select>
          </div>

          {/* Round-trip toggle */}
          <button
            type="button"
            onClick={() => setIsRoundTrip((prev) => !prev)}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors ${
              isRoundTrip
                ? isBrutal
                  ? 'bg-yellow-100 border-2 border-black text-black'
                  : 'bg-gray-100 border border-gray-900 text-gray-900'
                : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span className="inline-flex items-center gap-1.5">
              <ArrowLeftRight className="w-3.5 h-3.5" />
              {te.roundTrip}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[11px] font-black ${
                isRoundTrip ? 'bg-black text-yellow-400' : 'bg-gray-200 text-gray-700'
              }`}
            >
              {isRoundTrip ? te.on : te.off}
            </span>
          </button>

          {/* Price Result */}
          {finalPrice !== null ? (
            <div
              className={`p-3.5 rounded-xl ${
                isBrutal ? 'bg-gray-50 border-2 border-black' : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-[11px] font-bold uppercase text-gray-500">
                    {isRoundTrip ? te.fareRoundTrip : te.fareOneWay}
                  </div>
                  <div className="text-3xl font-black text-black tabular-nums leading-tight mt-0.5">
                    €{finalPrice}
                  </div>
                </div>
                <div className="text-right text-xs font-bold text-gray-700 space-y-0.5">
                  <div className="inline-flex items-center gap-1 justify-end">
                    <Clock className="w-3.5 h-3.5" />~{durationMin} {activeTrans.common.min}
                  </div>
                  <div>{te.capacity}</div>
                </div>
              </div>
              <p className="text-[11px] text-gray-600 font-medium mt-2">{te.note}</p>
            </div>
          ) : (
            <div className="p-3 bg-gray-100 rounded-lg text-xs font-bold text-gray-700">
              {te.unavailable}
            </div>
          )}

          <a
            href={targetBookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={ctaClass}
          >
            <span>{te.bookBtn}</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <div className="pt-1 text-center text-[11px] font-bold text-gray-500">
            {te.poweredBy}
            <a
              href={brandHomeUrl}
              target="_blank"
              rel="noopener"
              className="text-black underline hover:text-yellow-600"
            >
              Cyprus Airport Transfers
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
