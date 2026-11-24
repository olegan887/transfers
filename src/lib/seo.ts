import {
  airportRoutes,
  getAirportRouteBySlug,
  getRouteContentForLanguage,
  type RouteFaqItem,
} from '../data/routes';
import type { BlogPost } from '../data/blog';
import { globalAirportFaqs } from '../data/seoContent';
import { getLoadedTranslation, loadTranslation } from '../i18n/localeLoader';
import type { HubConfig, HubId, HubLocalizedContent } from '../data/hubPages';
import {
  buildLocalizedPath,
  CORE_LANGUAGES,
  getAlternatePaths,
  isNoindexBlogSlug,
  Language,
  parseRoute,
  SITE_URL,
} from './routing';

export const OG_LOCALE_MAP: Record<Language, string> = {
  en: 'en_GB',
  ru: 'ru_RU',
  de: 'de_DE',
  pl: 'pl_PL',
  fr: 'fr_FR',
  el: 'el_GR',
  it: 'it_IT',
};

export interface SeoMetadata {
  lang: Language;
  title: string;
  description: string;
  canonicalUrl: string;
  alternates: Partial<Record<Language, string>>;
  xDefaultUrl: string;
  ogType: 'website' | 'article';
  ogImage: string;
  ogLocale: string;
  ogLocaleAlternates: string[];
  rssUrl: string;
  jsonFeedUrl: string;
  robots: string;
  jsonLd: Record<string, any> | null;
}

const DEFAULT_OG_IMAGE = `${SITE_URL}/og-cover.jpg`;
const RASTER_LOGO = {
  '@type': 'ImageObject',
  url: `${SITE_URL}/logo.png`,
  width: 512,
  height: 512,
};

interface LocalizedSeoCopy {
  orgName: string;
  orgDesc: string;
  homeTitle: string;
  homeDesc: string;
  offerCatalogName: string;
  routesIndexTitle: string;
  routesIndexDesc: string;
  routesIndexCollectionName: string;
  widgetTitle: string;
  widgetDesc: string;
  widgetAppName: string;
  embedTitle: string;
  embedDesc: string;
  successTitle: string;
  successDesc: string;
  blogListTitle: string;
  blogListDesc: string;
  blogName: string;
  aboutTitle: string;
  aboutDesc: string;
  contactTitle: string;
  contactDesc: string;
  privacyTitle: string;
  privacyDesc: string;
  termsTitle: string;
  termsDesc: string;
  blogNotFoundTitle: string;
  notFoundTitle: string;
  notFoundDesc: string;
}

const SEO_COPY: Record<Language, LocalizedSeoCopy> = {
  en: {
    orgName: 'Cyprus Airport Transfers (Limassol, LCA & PFO)',
    orgDesc:
      'Fixed-price private transfers based in Limassol serving Larnaca Airport (LCA), Paphos Airport (PFO), and intercity Cyprus routes. 24/7 arrivals meet & greet and live flight tracking.',
    homeTitle: 'Cyprus Transfers: Limassol, Larnaca (LCA) & Paphos (PFO) Airport Taxi 24/7',
    homeDesc:
      'Fixed-price private transfers based in Limassol: Larnaca Airport (LCA), Paphos Airport (PFO), Paphos, Nicosia, Ayia Napa & Protaras. From €75, 10% off return.',
    offerCatalogName: 'Cyprus Airport & Intercity Transfer Rates (Limassol, LCA & PFO)',
    routesIndexTitle: 'All Cyprus Transfer Routes & Prices (Limassol, LCA & PFO)',
    routesIndexDesc:
      'All 30 active fixed-price transfer routes operated from Limassol: Larnaca Airport (LCA), Paphos Airport (PFO), Limassol, Paphos, Coral Bay, Nicosia, Ayia Napa, and Protaras.',
    routesIndexCollectionName: 'Cyprus Airport & Intercity Transfer Routes',
    widgetTitle: 'Free Cyprus Airport Transfer Calculator Widget for Websites & Hotels',
    widgetDesc:
      'Embed a free instant Cyprus airport transfer fare calculator (LCA, PFO & Limassol) on your hotel, villa rental, or travel blog in 60 seconds.',
    widgetAppName: 'Cyprus Airport Transfer Fare Calculator Widget',
    embedTitle: 'Cyprus Airport Transfer Fare Calculator Widget',
    embedDesc:
      'Instant fixed-price fare calculator for Larnaca (LCA), Paphos (PFO), and Limassol transfers.',
    successTitle: 'Booking Confirmed | Cyprus Airport Transfers',
    successDesc: 'Your Cyprus airport transfer booking confirmation details.',
    blogListTitle: 'Cyprus Airport Transfer Blog & Travel Guides | LCA & PFO Tips',
    blogListDesc:
      'Helpful Cyprus travel guides: getting from Larnaca (LCA) and Paphos (PFO) airports, fixed transfer rates, night arrival rules, and resort comparisons.',
    blogName: 'Cyprus Airport Transfers Blog',
    aboutTitle: 'About Us | Limassol Base & Fleet Standards — Cyprus Airport Transfers',
    aboutDesc:
      'Learn about our Limassol dispatch office (The Oval, Krinou 3), licensed Mercedes/Opel/Toyota sedans, fixed EUR tariffs, 24/7 flight tracking, and 30 active Cyprus routes.',
    contactTitle: 'Contact 24/7 Limassol Dispatch | WhatsApp, Phone & Booking Support',
    contactDesc:
      'Contact Cyprus Airport Transfers 24/7 via WhatsApp (+357 96 867289), phone, or email for 5+ group quotes, child seats, flight changes, and Limassol pickup support.',
    privacyTitle: 'Privacy Policy & GDPR Notice | Cyprus Airport Transfers',
    privacyDesc:
      'How Cyprus Airport Transfers collects, protects, and processes booking details and Stripe payments in compliance with EU/Cyprus GDPR standards.',
    termsTitle: 'Terms of Service & Cancellation Policy | Cyprus Airport Transfers',
    termsDesc:
      'Booking terms, fixed EUR rates, +€10 night tariff (23:00–07:00), free 24-hour cancellation rules, and sedan luggage limits for Cyprus Airport Transfers.',
    blogNotFoundTitle: 'Article Not Found | Cyprus Airport Transfers',
    notFoundTitle: '404 — Page Not Found | Cyprus Airport Transfers',
    notFoundDesc: 'The requested page or transfer route could not be found.',
  },
  ru: {
    orgName: 'Cyprus Airport Transfers — Лимассол, LCA и PFO',
    orgDesc:
      'Индивидуальные трансферы из Лимассола и аэропортов Ларнаки (LCA) и Пафоса (PFO) по всему Кипру по фиксированным ценам. Встреча с табличкой 24/7, бесплатное отслеживание рейсов.',
    homeTitle: 'Трансфер на Кипре: Лимассол, аэропорты Ларнаки (LCA) и Пафоса (PFO) 24/7',
    homeDesc:
      'Индивидуальные трансферы с базой в Лимассоле: аэропорты Ларнака (LCA) и Пафос (PFO), Пафос, Никосия, Айя-Напа и Протарас. Фиксированные цены от €75, -10% обратно.',
    offerCatalogName: 'Тарифы на трансфер по Кипру (Лимассол, LCA и PFO)',
    routesIndexTitle: 'Все маршруты трансфера по Кипру (LCA, PFO, Лимассол) | Тарифы',
    routesIndexDesc:
      'Все 30 доступных маршрутов трансфера с базы в Лимассоле: аэропорты Ларнака (LCA) и Пафос (PFO), Лимассол, Пафос, Никосия, Айя-Напа, Протарас и Корал Бэй с фиксированными тарифами.',
    routesIndexCollectionName: 'Все маршруты трансфера по Кипру',
    widgetTitle: 'Бесплатный виджет расчёта трансфера на Кипре для сайтов и отелей',
    widgetDesc:
      'Установите бесплатный онлайн-калькулятор цен такси из аэропортов Ларнаки (LCA) и Пафоса (PFO) на сайт отеля, виллы или блога о Кипре за 1 минуту.',
    widgetAppName: 'Виджет расчёта стоимости трансфера по Кипру',
    embedTitle: 'Калькулятор трансфера по Кипру (Виджет) | Cyprus Airport Transfers',
    embedDesc: 'Мгновенный расчёт фиксированной стоимости трансфера из аэропортов LCA и PFO.',
    successTitle: 'Бронирование подтверждено | Cyprus Airport Transfers',
    successDesc: 'Статус и подтверждение вашего бронирования трансфера из аэропортов Кипра.',
    blogListTitle: 'Блог о путешествиях и трансферах на Кипре | Cyprus Airport Transfers',
    blogListDesc:
      'Полезные гиды для туристов на Кипре: как добраться из аэропортов Ларнака и Пафос, ночной тариф, межгородские маршруты и сравнение с такси.',
    blogName: 'Блог Cyprus Airport Transfers',
    aboutTitle: 'О компании | База в Лимассоле и автопарк — Cyprus Airport Transfers',
    aboutDesc:
      'Информация о диспетчерской службе в Лимассоле (The Oval, Krinou 3), автопарке седанов, фиксированных тарифах от €75, отслеживании рейсов 24/7 и 30 маршрутах по Кипру.',
    contactTitle: 'Контакты 24/7 | WhatsApp, телефон и диспетчерская в Лимассоле',
    contactDesc:
      'Свяжитесь с Cyprus Airport Transfers круглосуточно по WhatsApp (+357 96 867289), телефону или email по вопросам групп от 5 человек, детских кресел и рейсов.',
    privacyTitle: 'Политика конфиденциальности (GDPR) | Cyprus Airport Transfers',
    privacyDesc:
      'Правила обработки персональных данных бронирования и безопасных платежей Stripe в сервисе Cyprus Airport Transfers в соответствии с GDPR.',
    termsTitle: 'Договор оферты и условия отмены | Cyprus Airport Transfers',
    termsDesc:
      'Условия заказа трансферов на Кипре: фиксированные цены, ночной тариф +€10 (23:00–07:00), бесплатная отмена за 24 часа и нормы багажа.',
    blogNotFoundTitle: 'Статья не найдена | Cyprus Airport Transfers',
    notFoundTitle: '404 — Страница не найдена | Cyprus Airport Transfers',
    notFoundDesc: 'Запрошенная страница или маршрут трансфера не найдены.',
  },
  de: {
    orgName: 'Cyprus Airport Transfers (Limassol, LCA & PFO)',
    orgDesc:
      'Private Flughafentransfers zum Festpreis ab Limassol zu den Flughäfen Larnaka (LCA) und Paphos (PFO) sowie inselweit auf Zypern. 24/7 Empfang mit Namensschild und Flugverfolgung.',
    homeTitle: 'Zypern Transfer: Limassol, Flughafen Larnaka (LCA) & Paphos (PFO) 24/7',
    homeDesc:
      'Private Festpreis-Transfers ab Limassol: Flughafen Larnaka (LCA), Paphos (PFO), Nikosia, Ayia Napa & Protaras. Ab €75, 10 % Rabatt auf Rückfahrt.',
    offerCatalogName: 'Zypern Transferpreise & Strecken (Limassol, LCA & PFO)',
    routesIndexTitle: 'Alle Zypern-Transferstrecken & Festpreise (LCA, PFO, Limassol)',
    routesIndexDesc:
      'Alle 30 aktiven Festpreis-Transferstrecken ab Limassol: Flughafen Larnaka (LCA), Flughafen Paphos (PFO), Paphos, Coral Bay, Nikosia, Ayia Napa und Protaras.',
    routesIndexCollectionName: 'Alle Transferstrecken auf Zypern',
    widgetTitle: 'Kostenloses Zypern-Transfer-Rechner Widget für Hotels & Websites',
    widgetDesc:
      'Binden Sie unseren kostenlosen Festpreis-Rechner für Larnaka (LCA), Paphos (PFO) und Limassol in 60 Sekunden auf Ihrer Hotel- oder Urlaubswebsite ein.',
    widgetAppName: 'Zypern Transfer-Preisrechner Widget',
    embedTitle: 'Zypern Transfer-Rechner Widget | Cyprus Airport Transfers',
    embedDesc: 'Sofortiger Festpreisrechner für Flughafentransfers ab LCA, PFO & Limassol.',
    successTitle: 'Buchung bestätigt | Cyprus Airport Transfers',
    successDesc: 'Bestätigung und Details Ihres gebuchten Zypern-Flughafentransfers.',
    blogListTitle: 'Zypern Transfer-Blog & Ratgeber für Larnaka (LCA) & Paphos (PFO)',
    blogListDesc:
      'Aktuelle Reiseführer für Zypern: Festpreise ab Flughafen Larnaka (LCA) und Paphos (PFO) nach Limassol, Ayia Napa, Protaras & Regeln für Nachtankünfte.',
    blogName: 'Cyprus Airport Transfers Blog (DE)',
    aboutTitle: 'Über uns | Basis Limassol & Flotte — Cyprus Airport Transfers',
    aboutDesc:
      'Alles über unseren Standort in Limassol (The Oval, Krinou 3), klimatisierte Limousinen, garantierte EUR-Festpreise, 24/7 Flugverfolgung und 30 aktive Strecken.',
    contactTitle: 'Kontakt 24/7 Limassol | WhatsApp, Telefon & Support',
    contactDesc:
      'Erreichen Sie Cyprus Airport Transfers rund um die Uhr über WhatsApp (+357 96 867289), Telefon oder E-Mail für Gruppen ab 5 Personen, Kindersitze und Flug-Updates.',
    privacyTitle: 'Datenschutzerklärung (DSGVO) | Cyprus Airport Transfers',
    privacyDesc:
      'Informationen zur DSGVO-konformen Verarbeitung von Buchungsdaten und sicheren Stripe-Zahlungen bei Cyprus Airport Transfers.',
    termsTitle: 'Allgemeine Geschäftsbedingungen (AGB) | Cyprus Airport Transfers',
    termsDesc:
      'Buchungs- und Stornobedingungen: EUR-Festpreise, +€10 Nachttarif (23:00–07:00), kostenlose Stornierung bis 24 Std. vor Abholung und Gepäckgrenzen.',
    blogNotFoundTitle: 'Artikel nicht gefunden | Cyprus Airport Transfers',
    notFoundTitle: '404 — Seite nicht gefunden | Cyprus Airport Transfers',
    notFoundDesc: 'Die angeforderte Seite oder Transferstrecke wurde nicht gefunden.',
  },
  pl: {
    orgName: 'Cyprus Airport Transfers (Limassol, LCA i PFO)',
    orgDesc:
      'Prywatne transfery w stałej cenie z bazy w Limassol na lotniska Larnaka (LCA) i Pafos (PFO) oraz trasy międzymiastowe na Cyprze. Powitanie 24/7 i śledzenie lotu.',
    homeTitle: 'Transfery Cypr: Limassol, Lotnisko Larnaka (LCA) i Pafos (PFO) 24/7',
    homeDesc:
      'Prywatne transfery ze stałą ceną z Limassol: Lotnisko Larnaka (LCA), Pafos (PFO), Nikozja, Ayia Napa i Protaras. Od €75, -10% na powrót.',
    offerCatalogName: 'Cennik transferów na Cyprze (Limassol, LCA i PFO)',
    routesIndexTitle: 'Wszystkie trasy i ceny transferów na Cyprze (LCA, PFO, Limassol)',
    routesIndexDesc:
      'Wszystkie 30 aktywnych tras ze stałą ceną z bazy w Limassol: Lotnisko Larnaka (LCA), Pafos (PFO), Coral Bay, Nikozja, Ayia Napa i Protaras.',
    routesIndexCollectionName: 'Wszystkie trasy transferowe na Cyprze',
    widgetTitle: 'Darmowy widżet kalkulatora transferów na Cyprze dla hoteli i blogów',
    widgetDesc:
      'Osadź bezpłatny kalkulator stałych cen taxi z lotnisk Larnaka (LCA) i Pafos (PFO) na stronie hotelu, willi lub blogu w 60 sekund.',
    widgetAppName: 'Widżet kalkulatora transferów Cypr',
    embedTitle: 'Kalkulator transferu na Cyprze | Cyprus Airport Transfers',
    embedDesc: 'Natychmiastowy kalkulator cen z lotnisk LCA, PFO oraz Limassol.',
    successTitle: 'Rezerwacja potwierdzona | Cyprus Airport Transfers',
    successDesc: 'Potwierdzenie i szczegóły Twojego transferu lotniskowego na Cyprze.',
    blogListTitle: 'Blog o transferach na Cyprze i poradniki z lotnisk LCA & PFO',
    blogListDesc:
      'Praktyczne przewodniki po Cyprze: dojazd z lotnisk Larnaka (LCA) i Pafos (PFO) do Limassol, Ayia Napa i Protaras, taryfa nocna oraz porównanie cen.',
    blogName: 'Blog Cyprus Airport Transfers (PL)',
    aboutTitle: 'O nas | Baza w Limassol i flota — Cyprus Airport Transfers',
    aboutDesc:
      'Poznaj nasze biuro dyspozytorskie w Limassol (The Oval, Krinou 3), flotę sedanów, stałe ceny w EUR, śledzenie lotów 24/7 i 30 obsługiwanych tras na Cyprze.',
    contactTitle: 'Kontakt 24/7 | WhatsApp, telefon i wsparcie z Limassol',
    contactDesc:
      'Skontaktuj się z Cyprus Airport Transfers przez WhatsApp (+357 96 867289), telefon lub e-mail w sprawie grup 5+, fotelików i zmian lotów.',
    privacyTitle: 'Polityka prywatności (RODO) | Cyprus Airport Transfers',
    privacyDesc:
      'Zasady przetwarzania danych rezerwacji i bezpiecznych płatności Stripe w Cyprus Airport Transfers zgodnie z unijnym RODO.',
    termsTitle: 'Regulamin świadczenia usług | Cyprus Airport Transfers',
    termsDesc:
      'Warunki rezerwacji i anulacji: stałe stawki EUR, taryfa nocna +€10 (23:00–07:00), darmowe odwołanie do 24 godz. i limity bagażu.',
    blogNotFoundTitle: 'Nie znaleziono artykułu | Cyprus Airport Transfers',
    notFoundTitle: '404 — Nie znaleziono strony | Cyprus Airport Transfers',
    notFoundDesc: 'Szukana strona lub trasa transferu nie została znaleziona.',
  },
  fr: {
    orgName: 'Cyprus Airport Transfers (Limassol, LCA & PFO)',
    orgDesc:
      'Transferts privés à tarif fixe basés à Limassol desservant les aéroports de Larnaca (LCA), Paphos (PFO) et toute l’île de Chypre. Accueil 24/7 avec suivi de vol.',
    homeTitle: 'Transfert Chypre : Limassol, Aéroport Larnaca (LCA) & Paphos (PFO) 24/7',
    homeDesc:
      'Transferts privés à prix fixe depuis Limassol : Aéroport Larnaca (LCA), Paphos (PFO), Nicosie, Ayia Napa & Protaras. Dès €75, −10 % aller-retour.',
    offerCatalogName: 'Tarifs transferts aéroport Chypre (Limassol, LCA & PFO)',
    routesIndexTitle: 'Tous les trajets & tarifs de transfert à Chypre (LCA, PFO, Limassol)',
    routesIndexDesc:
      'Les 30 itinéraires actifs à prix fixe opérés depuis Limassol : Larnaca (LCA), Paphos (PFO), Coral Bay, Nicosie, Ayia Napa et Protaras.',
    routesIndexCollectionName: 'Tous les itinéraires de transfert à Chypre',
    widgetTitle: 'Widget calculateur de transfert Chypre gratuit pour hôtels & sites',
    widgetDesc:
      'Intégrez un calculateur de tarifs fixes Larnaca (LCA), Paphos (PFO) et Limassol sur votre site d’hôtel, villa ou blog voyage en 60 secondes.',
    widgetAppName: 'Widget Calculateur Transfert Chypre',
    embedTitle: 'Calculateur Transfert Chypre | Cyprus Airport Transfers',
    embedDesc: 'Calculateur de tarif fixe immédiat depuis LCA, PFO et Limassol.',
    successTitle: 'Réservation confirmée | Cyprus Airport Transfers',
    successDesc: 'Détails et confirmation de votre transfert aéroport à Chypre.',
    blogListTitle: 'Blog Transferts Chypre & Guides Aéroports Larnaca (LCA) / Paphos (PFO)',
    blogListDesc:
      'Guides pratiques pour vos arrivées à Chypre : tarifs fixes depuis Larnaca (LCA) et Paphos (PFO) vers Limassol, Ayia Napa, Protaras et transferts de nuit.',
    blogName: 'Blog Cyprus Airport Transfers (FR)',
    aboutTitle: 'À propos | Base de Limassol & Flotte — Cyprus Airport Transfers',
    aboutDesc:
      'Découvrez notre centre opérationnel à Limassol (The Oval, Krinou 3), nos berlines climatisées, tarifs fixes en EUR, suivi de vol 24/7 et nos 30 trajets actifs.',
    contactTitle: 'Contact 24/7 | WhatsApp, téléphone & dispatch Limassol',
    contactDesc:
      'Contactez Cyprus Airport Transfers 24/7 via WhatsApp (+357 96 867289), téléphone ou e-mail pour groupes 5+, sièges auto et retards de vol.',
    privacyTitle: 'Politique de confidentialité (RGPD) | Cyprus Airport Transfers',
    privacyDesc:
      'Traitement des données de réservation et sécurité des paiements Stripe chez Cyprus Airport Transfers conformément au RGPD européen.',
    termsTitle: 'Conditions générales & Annulation | Cyprus Airport Transfers',
    termsDesc:
      'Modalités de réservation : tarifs fixes EUR, forfait nuit +10 € (23h00–07h00), annulation gratuite jusqu’à 24 h avant départ et capacité bagages.',
    blogNotFoundTitle: 'Article introuvable | Cyprus Airport Transfers',
    notFoundTitle: '404 — Page introuvable | Cyprus Airport Transfers',
    notFoundDesc: 'La page ou l’itinéraire de transfert demandé est introuvable.',
  },
  el: {
    orgName: 'Cyprus Airport Transfers (Λεμεσός, LCA & PFO)',
    orgDesc:
      'Ιδιωτικές μεταφορές σταθερής τιμής με βάση τη Λεμεσό για τα αεροδρόμια Λάρνακας (LCA) και Πάφου (PFO) και όλη την Κύπρο. Υποδοχή 24/7 και παρακολούθηση πτήσης.',
    homeTitle: 'Μεταφορές Κύπρος: Λεμεσός, Αεροδρόμιο Λάρνακας (LCA) & Πάφου (PFO) 24/7',
    homeDesc:
      'Ιδιωτικά ταξί σταθερής τιμής από Λεμεσό: Αεροδρόμιο Λάρνακας (LCA), Πάφος (PFO), Λευκωσία, Αγία Νάπα & Πρωταράς. Από €75, −10% μετ’ επιστροφής.',
    offerCatalogName: 'Τιμοκατάλογος μεταφορών Κύπρου (Λεμεσός, LCA & PFO)',
    routesIndexTitle: 'Όλες οι διαδρομές & τιμές μεταφοράς στην Κύπρο (LCA, PFO, Λεμεσός)',
    routesIndexDesc:
      'Και οι 30 ενεργές διαδρομές σταθερής τιμής από τη βάση μας στη Λεμεσό: Λάρνακα (LCA), Πάφος (PFO), Κόλπος Κοραλλιών, Λευκωσία, Αγία Νάπα και Πρωταράς.',
    routesIndexCollectionName: 'Όλες οι διαδρομές μεταφοράς στην Κύπρο',
    widgetTitle: 'Δωρεάν Widget υπολογισμού μεταφοράς Κύπρου για ξενοδοχεία & site',
    widgetDesc:
      'Ενσωματώστε δωρεάν τον υπολογιστή σταθερών τιμών από LCA, PFO και Λεμεσό στην ιστοσελίδα του ξενοδοχείου ή της βίλας σας σε 1 λεπτό.',
    widgetAppName: 'Widget Υπολογισμού Μεταφοράς Κύπρου',
    embedTitle: 'Υπολογιστής Μεταφοράς Κύπρου | Cyprus Airport Transfers',
    embedDesc: 'Άμεσος υπολογισμός σταθερής τιμής από Λάρνακα (LCA), Πάφο (PFO) και Λεμεσό.',
    successTitle: 'Η κράτηση επιβεβαιώθηκε | Cyprus Airport Transfers',
    successDesc: 'Επιβεβαίωση και στοιχεία της κράτησής σας στην Κύπρο.',
    blogListTitle: 'Οδηγοί Μεταφορών Κύπρου & Αεροδρομίων Λάρνακας (LCA) / Πάφου (PFO)',
    blogListDesc:
      'Χρήσιμοι οδηγοί για Κύπρο: σταθερές τιμές από LCA και PFO προς Λεμεσό, Αγία Νάπα, Πρωταρά, Λευκωσία και κανόνες νυχτερινών αφίξεων.',
    blogName: 'Blog Cyprus Airport Transfers (EL)',
    aboutTitle: 'Σχετικά με εμάς | Βάση Λεμεσού & Στόλος — Cyprus Airport Transfers',
    aboutDesc:
      'Γνωρίστε το γραφείο μας στη Λεμεσό (The Oval, Krinou 3), τον στόλο sedan, τις σταθερές χρεώσεις σε EUR, την παρακολούθηση πτήσεων 24/7 και τις 30 διαδρομές μας.',
    contactTitle: 'Επικοινωνία 24/7 | WhatsApp, τηλέφωνο & βάση Λεμεσού',
    contactDesc:
      'Επικοινωνήστε με το Cyprus Airport Transfers όλο το 24ωρο στο WhatsApp (+357 96 867289), τηλεφωνικά ή μέσω email για παρέες 5+, παιδικά καθίσματα και πτήσεις.',
    privacyTitle: 'Πολιτική Απορρήτου (GDPR) | Cyprus Airport Transfers',
    privacyDesc:
      'Πώς προστατεύουμε τα στοιχεία κράτησης και τις πληρωμές μέσω Stripe στο Cyprus Airport Transfers σύμφωνα με τον κανονισμό GDPR.',
    termsTitle: 'Όροι Χρήσης & Πολιτική Ακύρωσης | Cyprus Airport Transfers',
    termsDesc:
      'Όροι κράτησης, σταθερές τιμές EUR, νυχτερινό τέλος +€10 (23:00–07:00), δωρεάν ακύρωση 24 ώρες πριν και όρια αποσκευών.',
    blogNotFoundTitle: 'Το άρθρο δεν βρέθηκε | Cyprus Airport Transfers',
    notFoundTitle: '404 — Η σελίδα δεν βρέθηκε | Cyprus Airport Transfers',
    notFoundDesc: 'Η σελίδα ή η διαδρομή μεταφοράς που ζητήσατε δεν βρέθηκε.',
  },
  it: {
    orgName: 'Cyprus Airport Transfers (Limassol, LCA & PFO)',
    orgDesc:
      'Transfer privati a tariffa fissa con base a Limassol per gli aeroporti di Larnaca (LCA), Paphos (PFO) e tutta Cipro. Accoglienza 24/7 con monitoraggio del volo.',
    homeTitle: 'Transfer Cipro: Limassol, Aeroporto Larnaca (LCA) & Paphos (PFO) 24/7',
    homeDesc:
      'Transfer privati a prezzo fisso da Limassol: Aeroporto Larnaca (LCA), Paphos (PFO), Nicosia, Ayia Napa & Protaras. Da €75, −10% sul ritorno.',
    offerCatalogName: 'Tariffe transfer aeroportuali Cipro (Limassol, LCA & PFO)',
    routesIndexTitle: 'Tutte le tratte e tariffe transfer a Cipro (LCA, PFO, Limassol)',
    routesIndexDesc:
      'Tutte le 30 tratte attive a tariffa fissa operate da Limassol: Aeroporto di Larnaca (LCA), Paphos (PFO), Coral Bay, Nicosia, Ayia Napa e Protaras.',
    routesIndexCollectionName: 'Tutte le tratte transfer a Cipro',
    widgetTitle: 'Widget calcolatore transfer Cipro gratuito per hotel & siti web',
    widgetDesc:
      'Aggiungi gratuitamente un calcolatore di tariffe fisse Larnaca (LCA), Paphos (PFO) e Limassol sul tuo sito di hotel, villa o blog di viaggi.',
    widgetAppName: 'Widget Calcolatore Transfer Cipro',
    embedTitle: 'Calcolatore Transfer Cipro | Cyprus Airport Transfers',
    embedDesc: 'Calcolo immediato della tariffa fissa da LCA, PFO e Limassol.',
    successTitle: 'Prenotazione confermata | Cyprus Airport Transfers',
    successDesc: 'Conferma e dettagli della tua prenotazione transfer a Cipro.',
    blogListTitle: 'Blog Transfer Cipro & Guide Aeroporti Larnaca (LCA) e Paphos (PFO)',
    blogListDesc:
      'Guide pratiche per Cipro: tariffe fisse da Larnaca (LCA) e Paphos (PFO) a Limassol, Ayia Napa, Protaras, Nicosia e regole per arrivi notturni.',
    blogName: 'Blog Cyprus Airport Transfers (IT)',
    aboutTitle: 'Chi siamo | Sede di Limassol & Flotta — Cyprus Airport Transfers',
    aboutDesc:
      'Scopri la nostra base operativa di Limassol (The Oval, Krinou 3), le berline climatizzate, le tariffe fisse EUR, il controllo voli 24/7 e le 30 tratte attive.',
    contactTitle: 'Contatti 24/7 | WhatsApp, telefono e centrale Limassol',
    contactDesc:
      'Contatta Cyprus Airport Transfers 24/7 su WhatsApp (+357 96 867289), telefono o email per gruppi 5+, seggiolini e modifiche volo.',
    privacyTitle: 'Privacy Policy & Informativa GDPR | Cyprus Airport Transfers',
    privacyDesc:
      'Come Cyprus Airport Transfers tutela i dati di prenotazione e i pagamenti sicuri con Stripe nel rispetto del regolamento europeo GDPR.',
    termsTitle: 'Termini di servizio & Cancellazioni | Cyprus Airport Transfers',
    termsDesc:
      'Condizioni contrattuali: tariffe fisse EUR, supplemento notturno +€10 (23:00–07:00), cancellazione gratuita fino a 24 ore prima e limiti bagagli.',
    blogNotFoundTitle: 'Articolo non trovato | Cyprus Airport Transfers',
    notFoundTitle: '404 — Pagina non trovata | Cyprus Airport Transfers',
    notFoundDesc: 'La pagina o la tratta transfer richiesta non è stata trovata.',
  },
};

function getBaseTaxiServiceSchema(lang: Language) {
  const copy = SEO_COPY[lang] || SEO_COPY.en;
  return {
    '@type': 'LocalBusiness',
    additionalType: 'https://schema.org/TaxiService',
    '@id': `${SITE_URL}/#organization`,
    name: copy.orgName,
    description: copy.orgDesc,
    url: `${SITE_URL}/`,
    logo: RASTER_LOGO,
    image: DEFAULT_OG_IMAGE,
    telephone: '+35796867289',
    email: 'info@cyprus-airport-transfer.co',
    priceRange: '€75 - €200',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Cash, Credit Card, Visa, Mastercard, Stripe',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'The Oval, Krinou 3, Agios Athanasios',
      addressLocality: 'Limassol',
      postalCode: '4103',
      addressCountry: 'CY',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 34.6899,
      longitude: 33.0682,
    },
    hasMap:
      'https://www.google.com/maps/search/?api=1&query=The+Oval,+Krinou+3,+Agios+Athanasios,+4103+Limassol,+Cyprus',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      'https://wa.me/35796867289',
      'https://www.google.com/maps/search/?api=1&query=The+Oval,+Krinou+3,+Agios+Athanasios,+4103+Limassol,+Cyprus',
    ],
    areaServed: [
      { '@type': 'Airport', name: 'Larnaca International Airport (LCA)' },
      { '@type': 'Airport', name: 'Paphos International Airport (PFO)' },
      { '@type': 'City', name: 'Limassol' },
      { '@type': 'City', name: 'Paphos' },
      { '@type': 'City', name: 'Larnaca' },
      { '@type': 'City', name: 'Nicosia' },
      { '@type': 'City', name: 'Ayia Napa' },
      { '@type': 'City', name: 'Protaras' },
      { '@type': 'Place', name: 'Coral Bay' },
      { '@type': 'Place', name: 'Peyia' },
      { '@type': 'Place', name: 'Polis Chrysochous' },
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+35796867289',
      contactType: 'customer service',
      url: 'https://wa.me/35796867289',
      availableLanguage: ['English', 'Russian', 'German', 'Polish', 'French', 'Greek', 'Italian'],
    },
  };
}

function buildLocaleAndFeedMeta(
  activeLang: Language,
  alternates: Partial<Record<Language, string>>
) {
  const prefix = activeLang === 'en' ? '' : `/${activeLang}`;
  const ogLocale = OG_LOCALE_MAP[activeLang] || OG_LOCALE_MAP.en;
  const ogLocaleAlternates = (Object.keys(alternates) as Language[])
    .filter((code) => code !== activeLang && Boolean(alternates[code]))
    .map((code) => OG_LOCALE_MAP[code]);
  return {
    ogLocale,
    ogLocaleAlternates,
    rssUrl: `${SITE_URL}${prefix}/rss.xml`,
    jsonFeedUrl: `${SITE_URL}${prefix}/feed.json`,
  };
}

export interface HubSeoData {
  cfg: HubConfig;
  loc: HubLocalizedContent;
}

function buildPageSeo(
  pathname: string,
  search = '',
  loadedBlogPosts?: BlogPost[],
  extraRouteFaqs?: RouteFaqItem[],
  hubData?: HubSeoData
): SeoMetadata {
  const parsed = parseRoute(pathname, search);
  const { lang, view, slug } = parsed;
  const rawAlternates = getAlternatePaths(pathname, search);

  const alternates: Partial<Record<Language, string>> = {};
  (Object.entries(rawAlternates) as [Language, string][]).forEach(([code, relPath]) => {
    if (relPath) {
      alternates[code] = `${SITE_URL}${relPath}`;
    }
  });

  const hasAlternates = Object.keys(alternates).length > 0;
  const xDefaultUrl = hasAlternates ? alternates.en || `${SITE_URL}/` : '';
  const canonicalUrl =
    view === 'not-found'
      ? ''
      : alternates[lang] || `${SITE_URL}${buildLocalizedPath(view, lang, slug)}`;
  const copy = SEO_COPY[lang] || SEO_COPY.en;
  const trans = getLoadedTranslation(lang);
  const localeAndFeed = buildLocaleAndFeedMeta(lang, alternates);

  if (view === 'not-found') {
    return {
      lang,
      title: copy.notFoundTitle,
      description: copy.notFoundDesc,
      canonicalUrl: '',
      alternates: {},
      xDefaultUrl: '',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ...buildLocaleAndFeedMeta(lang, {}),
      robots: 'noindex, follow',
      jsonLd: null,
    };
  }

  if (view === 'success') {
    return {
      lang,
      title: copy.successTitle,
      description: copy.successDesc,
      canonicalUrl,
      alternates,
      xDefaultUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ...localeAndFeed,
      robots: 'noindex, nofollow',
      jsonLd: null,
    };
  }

  if (view === 'embed') {
    return {
      lang,
      title: copy.embedTitle,
      description: copy.embedDesc,
      canonicalUrl,
      alternates,
      xDefaultUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ...localeAndFeed,
      robots: 'noindex, follow',
      jsonLd: null,
    };
  }

  if (view === 'widget') {
    const homeUrl = `${SITE_URL}${buildLocalizedPath('home', lang)}`;
    return {
      lang,
      title: copy.widgetTitle,
      description: copy.widgetDesc,
      canonicalUrl,
      alternates,
      xDefaultUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ...localeAndFeed,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          getBaseTaxiServiceSchema(lang),
          {
            '@type': 'WebApplication',
            name: copy.widgetAppName,
            applicationCategory: 'TravelApplication',
            operatingSystem: 'All',
            offers: {
              '@type': 'Offer',
              price: '0',
              priceCurrency: 'EUR',
            },
            url: canonicalUrl,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: trans.common.home,
                item: homeUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: trans.nav.widget,
                item: canonicalUrl,
              },
            ],
          },
        ],
      },
    };
  }

  if (view === 'route') {
    const route = slug ? getAirportRouteBySlug(slug) : undefined;
    if (route) {
      const content = getRouteContentForLanguage(route, lang);
      const combinedFaqs = [...content.faqs, ...(extraRouteFaqs || [])];
      const homeUrl = `${SITE_URL}${buildLocalizedPath('home', lang)}`;
      const routesUrl = `${SITE_URL}${buildLocalizedPath('routes-index', lang)}`;
      return {
        lang,
        title: content.title,
        description: content.metaDescription,
        canonicalUrl,
        alternates,
        xDefaultUrl,
        ogType: 'website',
        ogImage: `${SITE_URL}${route.image}`,
        ...localeAndFeed,
        robots: 'index, follow',
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': [
            getBaseTaxiServiceSchema(lang),
            {
              '@type': 'Service',
              name: content.h1,
              description: content.metaDescription,
              serviceType: route.airportCode ? 'Airport Transfer' : 'Private Intercity Transfer',
              provider: { '@id': `${SITE_URL}/#organization` },
              url: canonicalUrl,
              offers: {
                '@type': 'Offer',
                price: String(route.basePrice),
                priceCurrency: 'EUR',
                availability: 'https://schema.org/InStock',
                url: canonicalUrl,
              },
            },
            {
              '@type': 'FAQPage',
              mainEntity: combinedFaqs.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: faq.a,
                },
              })),
            },
            {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: trans.common.home,
                  item: homeUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: trans.common.allRoutes,
                  item: routesUrl,
                },
                {
                  '@type': 'ListItem',
                  position: 3,
                  name: content.h1,
                  item: canonicalUrl,
                },
              ],
            },
          ],
        },
      };
    }

    return {
      lang,
      title: copy.notFoundTitle,
      description: copy.notFoundDesc,
      canonicalUrl: '',
      alternates: {},
      xDefaultUrl: '',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ...buildLocaleAndFeedMeta(lang, {}),
      robots: 'noindex, follow',
      jsonLd: null,
    };
  }

  if (
    (view === 'hub-lca' || view === 'hub-pfo' || view === 'hub-limassol') &&
    hubData
  ) {
    const { cfg, loc } = hubData;
    const homeUrl = `${SITE_URL}${buildLocalizedPath('home', lang)}`;
    const routesUrl = `${SITE_URL}${buildLocalizedPath('routes-index', lang)}`;
    const hubOffers = cfg.routeSlugs
      .map((routeSlug) => {
        const r = getAirportRouteBySlug(routeSlug);
        if (!r) return null;
        return {
          '@type': 'Offer',
          name: getRouteContentForLanguage(r, lang).h1,
          price: String(r.basePrice),
          priceCurrency: 'EUR',
          url: `${SITE_URL}${buildLocalizedPath('route', lang, r.slug)}`,
        };
      })
      .filter((item): item is NonNullable<typeof item> => item !== null);

    return {
      lang,
      title: loc.seoTitle,
      description: loc.metaDescription,
      canonicalUrl,
      alternates,
      xDefaultUrl,
      ogType: 'website',
      ogImage: `${SITE_URL}${cfg.image}`,
      ...localeAndFeed,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          getBaseTaxiServiceSchema(lang),
          {
            '@type': 'CollectionPage',
            name: loc.h1,
            description: loc.metaDescription,
            url: canonicalUrl,
            mainEntity: {
              '@type': 'OfferCatalog',
              name: loc.tableTitle,
              itemListElement: hubOffers,
            },
          },
          {
            '@type': 'FAQPage',
            mainEntity: loc.faqs.map((faq) => ({
              '@type': 'Question',
              name: faq.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: faq.a,
              },
            })),
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: trans.common.home,
                item: homeUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: trans.common.allRoutes,
                item: routesUrl,
              },
              {
                '@type': 'ListItem',
                position: 3,
                name: loc.breadcrumb,
                item: canonicalUrl,
              },
            ],
          },
        ],
      },
    };
  }

  if (view === 'routes-index') {
    const homeUrl = `${SITE_URL}${buildLocalizedPath('home', lang)}`;
    return {
      lang,
      title: copy.routesIndexTitle,
      description: copy.routesIndexDesc,
      canonicalUrl,
      alternates,
      xDefaultUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ...localeAndFeed,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          getBaseTaxiServiceSchema(lang),
          {
            '@type': 'CollectionPage',
            name: copy.routesIndexCollectionName,
            url: canonicalUrl,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: trans.common.home,
                item: homeUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: trans.common.allRoutes,
                item: canonicalUrl,
              },
            ],
          },
        ],
      },
    };
  }

  // Blog index supports all 7 languages (showing 37 articles on EN/RU, 3 localized flagship guides on DE/PL/FR/EL/IT)
  if (view === 'blog-list') {
    const homeUrl = `${SITE_URL}${buildLocalizedPath('home', lang)}`;
    return {
      lang,
      title: copy.blogListTitle,
      description: copy.blogListDesc,
      canonicalUrl,
      alternates,
      xDefaultUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ...localeAndFeed,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Blog',
            name: copy.blogName,
            inLanguage: lang,
            url: canonicalUrl,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: trans.common.home,
                item: homeUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: trans.nav.blog,
                item: canonicalUrl,
              },
            ],
          },
        ],
      },
    };
  }

  if (view === 'about') {
    const homeUrl = `${SITE_URL}${buildLocalizedPath('home', lang)}`;
    return {
      lang,
      title: copy.aboutTitle,
      description: copy.aboutDesc,
      canonicalUrl,
      alternates,
      xDefaultUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ...localeAndFeed,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          getBaseTaxiServiceSchema(lang),
          {
            '@type': 'AboutPage',
            name: copy.aboutTitle,
            description: copy.aboutDesc,
            url: canonicalUrl,
            mainEntity: { '@id': `${SITE_URL}/#organization` },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: trans.common.home,
                item: homeUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: trans.nav.about,
                item: canonicalUrl,
              },
            ],
          },
        ],
      },
    };
  }

  if (view === 'contact') {
    const homeUrl = `${SITE_URL}${buildLocalizedPath('home', lang)}`;
    return {
      lang,
      title: copy.contactTitle,
      description: copy.contactDesc,
      canonicalUrl,
      alternates,
      xDefaultUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ...localeAndFeed,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          getBaseTaxiServiceSchema(lang),
          {
            '@type': 'ContactPage',
            name: copy.contactTitle,
            description: copy.contactDesc,
            url: canonicalUrl,
            mainEntity: { '@id': `${SITE_URL}/#organization` },
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: trans.common.home,
                item: homeUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: trans.nav.contact,
                item: canonicalUrl,
              },
            ],
          },
        ],
      },
    };
  }

  if (view === 'privacy' || view === 'terms') {
    const homeUrl = `${SITE_URL}${buildLocalizedPath('home', lang)}`;
    const isPrivacy = view === 'privacy';
    const pageTitle = isPrivacy ? copy.privacyTitle : copy.termsTitle;
    const pageDesc = isPrivacy ? copy.privacyDesc : copy.termsDesc;
    const crumbName = isPrivacy ? trans.legal.privacyTitle : trans.legal.termsTitle;
    return {
      lang,
      title: pageTitle,
      description: pageDesc,
      canonicalUrl,
      alternates,
      xDefaultUrl,
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ...localeAndFeed,
      robots: 'index, follow',
      jsonLd: {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'WebPage',
            name: pageTitle,
            description: pageDesc,
            url: canonicalUrl,
          },
          {
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: trans.common.home,
                item: homeUrl,
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: crumbName,
                item: canonicalUrl,
              },
            ],
          },
        ],
      },
    };
  }

  if (view === 'blog-post' && slug) {
    const post = loadedBlogPosts?.find((p) => p.slug === slug);
    const activeLang: Language = post?.supportedLanguages?.includes(lang)
      ? lang
      : lang === 'ru'
      ? 'ru'
      : 'en';
    const activeTrans = getLoadedTranslation(activeLang);
    const activeCopy = SEO_COPY[activeLang] || SEO_COPY.en;
    const homeUrl = `${SITE_URL}${buildLocalizedPath('home', activeLang)}`;
    const blogUrl = `${SITE_URL}${buildLocalizedPath('blog-list', activeLang)}`;

    if (post) {
      const postTitle = post.title[activeLang] || post.title.en;
      const postExcerpt = post.excerpt[activeLang] || post.excerpt.en;
      const meta = post.seoMeta?.[activeLang];
      const postFaqs = post.faqs?.[activeLang] || [];
      const postImage = post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`;

      if (isNoindexBlogSlug(post.slug)) {
        return {
          lang: activeLang,
          title: meta?.title || `${postTitle} | Cyprus Airport Transfers`,
          description: meta?.description || postExcerpt,
          canonicalUrl,
          alternates: {},
          xDefaultUrl: '',
          ogType: 'article',
          ogImage: postImage,
          ...buildLocaleAndFeedMeta(activeLang, {}),
          robots: 'noindex, follow',
          jsonLd: null,
        };
      }

      const aboutUrl = `${SITE_URL}${buildLocalizedPath('about', activeLang)}`;
      const graph: Record<string, any>[] = [
        {
          '@type': 'BlogPosting',
          headline: postTitle,
          description: meta?.description || postExcerpt,
          ...(meta?.keywords?.length ? { keywords: meta.keywords.join(', ') } : {}),
          datePublished: post.date,
          dateModified: post.date,
          image: postImage,
          inLanguage: activeLang,
          mainEntityOfPage: canonicalUrl,
          author: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'Cyprus Airport Transfers',
            url: aboutUrl,
          },
          publisher: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'Cyprus Airport Transfers',
            url: `${SITE_URL}/`,
            logo: RASTER_LOGO,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: activeTrans.common.home,
              item: homeUrl,
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: activeTrans.nav.blog,
              item: blogUrl,
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: postTitle,
              item: canonicalUrl,
            },
          ],
        },
      ];

      if (postFaqs.length > 0) {
        graph.push({
          '@type': 'FAQPage',
          mainEntity: postFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        });
      }

      return {
        lang: activeLang,
        title: meta?.title || `${postTitle} | Cyprus Airport Transfers`,
        description: meta?.description || postExcerpt,
        canonicalUrl,
        alternates,
        xDefaultUrl,
        ogType: 'article',
        ogImage: postImage,
        ...buildLocaleAndFeedMeta(activeLang, alternates),
        robots: 'index, follow',
        jsonLd: {
          '@context': 'https://schema.org',
          '@graph': graph,
        },
      };
    }

    return {
      lang: activeLang,
      title: activeCopy.blogNotFoundTitle,
      description: '',
      canonicalUrl: '',
      alternates: {},
      xDefaultUrl: '',
      ogType: 'website',
      ogImage: DEFAULT_OG_IMAGE,
      ...buildLocaleAndFeedMeta(activeLang, {}),
      robots: 'noindex, follow',
      jsonLd: null,
    };
  }

  // Default: Home Page (all 7 languages)
  return {
    lang,
    title: copy.homeTitle,
    description: copy.homeDesc,
    canonicalUrl,
    alternates,
    xDefaultUrl,
    ogType: 'website',
    ogImage: DEFAULT_OG_IMAGE,
    ...localeAndFeed,
    robots: 'index, follow',
    jsonLd: {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          name: 'Cyprus Airport Transfers',
          url: `${SITE_URL}/`,
          inLanguage: CORE_LANGUAGES,
        },
        {
          ...getBaseTaxiServiceSchema(lang),
          hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: copy.offerCatalogName,
            itemListElement: airportRoutes.map((route) => ({
              '@type': 'Offer',
              name: getRouteContentForLanguage(route, lang).h1,
              price: String(route.basePrice),
              priceCurrency: 'EUR',
              url: `${SITE_URL}${buildLocalizedPath('route', lang, route.slug)}`,
            })),
          },
        },
        {
          '@type': 'FAQPage',
          mainEntity: globalAirportFaqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q[lang] || faq.q.en,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a[lang] || faq.a.en,
            },
          })),
        },
      ],
    },
  };
}

export async function getPageSeoAsync(pathname: string, search = ''): Promise<SeoMetadata> {
  const parsed = parseRoute(pathname, search);
  await loadTranslation(parsed.lang);

  if (parsed.view === 'blog-post' && parsed.slug) {
    await loadTranslation('ru');
    const { blogPosts } = await import('../data/blog');
    return buildPageSeo(pathname, search, blogPosts);
  }
  if (parsed.view === 'route' && parsed.slug) {
    const { loadRouteDetails, getLoadedRouteEnrichment } = await import('../data/routeDetails');
    await loadRouteDetails(parsed.lang);
    const enrichment = getLoadedRouteEnrichment(parsed.slug, parsed.lang);
    return buildPageSeo(pathname, search, undefined, enrichment?.extraFaqs);
  }
  if (
    parsed.view === 'hub-lca' ||
    parsed.view === 'hub-pfo' ||
    parsed.view === 'hub-limassol'
  ) {
    const hubId: HubId =
      parsed.view === 'hub-lca' ? 'lca' : parsed.view === 'hub-pfo' ? 'pfo' : 'limassol';
    const { getHubConfig, getHubLocalized } = await import('../data/hubPages');
    const cfg = getHubConfig(hubId);
    const loc = getHubLocalized(hubId, parsed.lang);
    return buildPageSeo(pathname, search, undefined, undefined, { cfg, loc });
  }
  return buildPageSeo(pathname, search);
}
