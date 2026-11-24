import React from 'react';
import { ArrowRight, MapPin, BookOpen } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { buildLocalizedPath, Language } from '../lib/routing';

const NOT_FOUND_COPY: Record<
  Language,
  {
    title: string;
    message: string;
    homeBtn: string;
    routesBtn: string;
    blogBtn: string;
  }
> = {
  en: {
    title: 'Page Not Found',
    message: 'The transfer route or page you requested does not exist or has moved.',
    homeBtn: 'Back to Home',
    routesBtn: 'All 30 Transfer Routes',
    blogBtn: 'Travel Guides',
  },
  ru: {
    title: 'Страница не найдена',
    message: 'Запрошенный маршрут или страница не существуют либо были перемещены.',
    homeBtn: 'На главную',
    routesBtn: 'Все 30 маршрутов',
    blogBtn: 'Блог и гиды',
  },
  de: {
    title: 'Seite nicht gefunden',
    message: 'Die angeforderte Transferstrecke oder Seite existiert nicht oder wurde verschoben.',
    homeBtn: 'Zur Startseite',
    routesBtn: 'Alle 30 Strecken',
    blogBtn: 'Ratgeber',
  },
  pl: {
    title: 'Nie znaleziono strony',
    message: 'Szukana trasa transferu lub strona nie istnieje albo została przeniesiona.',
    homeBtn: 'Strona główna',
    routesBtn: 'Wszystkie 30 tras',
    blogBtn: 'Poradniki',
  },
  fr: {
    title: 'Page introuvable',
    message: 'L’itinéraire ou la page demandée n’existe pas ou a été déplacée.',
    homeBtn: 'Accueil',
    routesBtn: 'Les 30 trajets',
    blogBtn: 'Guides',
  },
  el: {
    title: 'Η σελίδα δεν βρέθηκε',
    message: 'Η διαδρομή ή η σελίδα που ζητήσατε δεν υπάρχει ή έχει μετακινηθεί.',
    homeBtn: 'Αρχική',
    routesBtn: 'Όλες οι 30 διαδρομές',
    blogBtn: 'Οδηγοί',
  },
  it: {
    title: 'Pagina non trovata',
    message: 'La tratta o la pagina richiesta non esiste o è stata spostata.',
    homeBtn: 'Torna alla Home',
    routesBtn: 'Tutte le 30 tratte',
    blogBtn: 'Guide',
  },
};

export default function NotFoundPage() {
  const { language } = useLanguage();
  const copy = NOT_FOUND_COPY[language] || NOT_FOUND_COPY.en;

  return (
    <main className="py-20 md:py-28 bg-white min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-xl w-full bg-white border-4 border-black p-8 md:p-10 text-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="inline-block bg-yellow-400 border-4 border-black px-5 py-2 mb-5 text-4xl md:text-5xl font-black tracking-tight">
          404
        </div>
        <h1 className="text-2xl md:text-4xl font-black text-black uppercase tracking-tight mb-4">
          {copy.title}
        </h1>
        <p className="text-base md:text-lg font-medium text-gray-700 mb-8">{copy.message}</p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <a
            href={buildLocalizedPath('home', language)}
            className="brutal-btn px-6 py-3 text-sm uppercase"
          >
            <span>{copy.homeBtn}</span>
            <ArrowRight className="w-4 h-4 ml-2" />
          </a>
          <a
            href={buildLocalizedPath('routes-index', language)}
            className="brutal-btn brutal-btn-white px-5 py-3 text-sm uppercase"
          >
            <MapPin className="w-4 h-4 mr-2" />
            <span>{copy.routesBtn}</span>
          </a>
          <a
            href={buildLocalizedPath('blog-list', language)}
            className="brutal-btn brutal-btn-white px-5 py-3 text-sm uppercase"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            <span>{copy.blogBtn}</span>
          </a>
        </div>
      </div>
    </main>
  );
}
