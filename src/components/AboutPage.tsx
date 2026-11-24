import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Car,
  ShieldCheck,
  Clock,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { buildLocalizedPath, Language } from '../lib/routing';
import { WHATSAPP_NUMBER } from '../config';
import { reportContactClick } from '../lib/analytics';

interface AboutCopy {
  breadcrumb: string;
  badge: string;
  h1: string;
  lead: string;
  whoHeading: string;
  whoBody: string[];
  fleetHeading: string;
  fleetItems: string[];
  pricingHeading: string;
  pricingItems: string[];
  coverageHeading: string;
  coverageBody: string;
  boundariesNote: string;
  napHeading: string;
  addressLabel: string;
  phoneLabel: string;
  emailLabel: string;
  hoursLabel: string;
  hoursValue: string;
  mapsCta: string;
  routesCta: string;
  contactCta: string;
}

const ABOUT_COPY: Record<Language, AboutCopy> = {
  en: {
    breadcrumb: 'About Us',
    badge: 'Limassol Dispatch Base · 24/7',
    h1: 'About Cyprus Airport Transfers',
    lead: 'Private fixed-price sedan transfers operated directly out of Limassol across Larnaca Airport (LCA), Paphos Airport (PFO), and Cyprus intercity corridors.',
    whoHeading: 'Who We Are & Our Limassol Dispatch Base',
    whoBody: [
      'Cyprus Airport Transfers coordinates scheduled airport pickups and direct door-to-door transfers from our Limassol dispatch office at The Oval, Krinou 3, Agios Athanasios, 4103 Limassol.',
      'Positioned centrally along Cyprus’s A1 and A6 highway spine, our licensed chauffeurs cover both international terminals (LCA and PFO) with live flight monitoring, Arrivals Hall meet & greet, and clear fixed EUR rates agreed before you travel.',
    ],
    fleetHeading: 'Fleet & Passenger Standards',
    fleetItems: [
      'Modern air-conditioned sedans: Mercedes E-Class, Opel Insignia, and Toyota Camry.',
      'Licensed capacity of up to 4 passengers and 3 full-size suitcases per sedan.',
      'Complimentary child and booster seats installed ahead of pickup upon request.',
      'Groups of 5+ passengers coordinated promptly via WhatsApp (+357 96 867289) before travel.',
    ],
    pricingHeading: 'Transparent Pricing & Flight-Tracking Policy',
    pricingItems: [
      'Fixed €75–€200 sedan fares across all 30 active routes—never metered or surge priced.',
      'Flat +€10 night supplement only for pickups between 23:00 and 07:00.',
      'Automatic 10% discount on the return leg when booking a round trip.',
      'Pay a €20 Stripe card deposit or full amount online, or cash/card to the driver; free cancellation up to 24 hours before pickup.',
    ],
    coverageHeading: 'Service Coverage & Operational Boundaries',
    coverageBody:
      'We serve 30 active bidirectional routes connecting Limassol, Larnaca Airport (LCA), Paphos Airport (PFO), Paphos City, Coral Bay, Peyia, Polis, Nicosia, Larnaca City, Ayia Napa, and Protaras across 7 booking languages (EN, RU, DE, PL, FR, EL, IT).',
    boundariesNote:
      'Operational focus: because all vehicles dispatch from Limassol, we do not accept short local rides wholly inside Paphos District (e.g. PFO → Paphos City/Coral Bay/Peyia/Polis) or wholly inside Eastern Cyprus (e.g. LCA → Ayia Napa/Protaras/Nicosia/Larnaca City).',
    napHeading: 'Verified Operator Details (NAP)',
    addressLabel: 'Office Base',
    phoneLabel: 'Phone / WhatsApp',
    emailLabel: 'Email',
    hoursLabel: 'Dispatch Hours',
    hoursValue: '24/7 (365 days · flight tracking included)',
    mapsCta: 'Open on Google Maps',
    routesCta: 'View All 30 Fixed Routes',
    contactCta: 'Contact Dispatch',
  },
  ru: {
    breadcrumb: 'О нас',
    badge: 'База в Лимассоле · 24/7',
    h1: 'О службе Cyprus Airport Transfers',
    lead: 'Индивидуальные трансферы по Кипру по фиксированным тарифам с базой в Лимассоле: аэропорты Ларнака (LCA), Пафос (PFO) и междугородние маршруты.',
    whoHeading: 'Кто мы и где расположена база',
    whoBody: [
      'Служба Cyprus Airport Transfers организует круглосуточные встречи в аэропортах и прямые поездки от двери до двери из нашего диспетчерского центра в Лимассоле по адресу The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cyprus.',
      'Центральное расположение между двумя аэропортами на магистралях A1 и A6 позволяет нам оперативно обслуживать рейсы в Ларнаку (LCA) и Пафос (PFO) с бесплатным отслеживанием посадки, встречей с табличкой в зале прилёта и заранее известной ценой в евро.',
    ],
    fleetHeading: 'Автопарк и стандарты обслуживания',
    fleetItems: [
      'Современные седаны с климат-контролем: Mercedes E-Class, Opel Insignia и Toyota Camry.',
      'Комфортная вместимость каждого седана — до 4 пассажиров и 3 полноразмерных чемоданов.',
      'Бесплатные детские кресла и бустеры устанавливаются заранее по комментарию к заказу.',
      'Для компаний от 5 пассажиров согласуем подходящий транспорт заранее через WhatsApp (+357 96 867289).',
    ],
    pricingHeading: 'Прозрачные тарифы и правила',
    pricingItems: [
      'Фиксированные цены €75–€200 за автомобиль на всех 30 активных маршрутах — никаких счётчиков и скрытых надбавок.',
      'Единый ночной тариф +€10 действует только с 23:00 до 07:00 независимо от дистанции.',
      'Автоматическая скидка 10% на обратную дорогу при оформлении поездки туда и обратно.',
      'Предоплата €20 через Stripe, полная оплата картой или расчёт с водителем; бесплатная отмена за 24 часа до подачи.',
    ],
    coverageHeading: 'География маршрутов и границы сервиса',
    coverageBody:
      'Мы выполняем 30 двусторонних маршрутов, связывающих Лимассол, аэропорт Ларнаки (LCA), аэропорт Пафоса (PFO), Пафос, Корал Бэй, Пейю, Полис, Никосию, Ларнаку, Айя-Напу и Протарас на 7 языках.',
    boundariesNote:
      'Важное ограничение: так как автопарк базируется в Лимассоле, мы не выполняем короткие локальные поездки внутри округа Пафос (PFO → Пафос/Корал Бэй/Пейя/Полис) и внутри восточного побережья (LCA → Айя-Напа/Протарас/Никосия/Ларнака).',
    napHeading: 'Реквизиты и контакты оператора',
    addressLabel: 'Офис',
    phoneLabel: 'Телефон / WhatsApp',
    emailLabel: 'Email',
    hoursLabel: 'Режим работы',
    hoursValue: '24/7 без выходных (отслеживание рейсов)',
    mapsCta: 'Открыть в Google Картах',
    routesCta: 'Все 30 маршрутов и цены',
    contactCta: 'Связаться с диспетчером',
  },
  de: {
    breadcrumb: 'Über uns',
    badge: 'Standort Limassol · 24/7',
    h1: 'Über Cyprus Airport Transfers',
    lead: 'Private Festpreis-Transfers direkt ab unserer Basis in Limassol zu den Flughäfen Larnaka (LCA), Paphos (PFO) und inselweiten Zielen.',
    whoHeading: 'Wer wir sind & unser Standort in Limassol',
    whoBody: [
      'Cyprus Airport Transfers koordiniert geplante Flughafenabholungen und Tür-zu-Tür-Transfers von unserer Disposition in The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Zypern.',
      'Durch die zentrale Lage an den Autobahnen A1 und A6 erreichen unsere Fahrer sowohl Larnaka (LCA) als auch Paphos (PFO) zuverlässig mit Live-Flugverfolgung, Empfang mit Namensschild und garantierten Festpreisen.',
    ],
    fleetHeading: 'Fahrzeugflotte & Qualitätsstandards',
    fleetItems: [
      'Klimatisierte Limousinen: Mercedes E-Class, Opel Insignia und Toyota Camry.',
      'Zugelassen für bis zu 4 Passagiere und 3 große Koffer pro Fahrzeug.',
      'Kostenlose Kindersitze und Sitzerhöhungen auf Anfrage vorab montiert.',
      'Gruppen ab 5 Personen werden flexibel über WhatsApp (+357 96 867289) organisiert.',
    ],
    pricingHeading: 'Festpreise, Flugverfolgung & Stornierung',
    pricingItems: [
      'Feste Preise von €75–€200 auf allen 30 aktiven Strecken — kein Taxameter.',
      'Pauschaler Nachtzuschlag von +€10 nur für Fahrten zwischen 23:00 und 07:00 Uhr.',
      'Automatisch 10 % Rabatt auf die Rückfahrt bei Hin- und Rückbuchung.',
      '€20 Stripe-Anzahlung oder Komplettzahlung online bzw. beim Fahrer; kostenlose Stornierung bis 24 Std. vorher.',
    ],
    coverageHeading: 'Einsatzgebiet & Servicegrenzen',
    coverageBody:
      'Wir bedienen 30 aktive Strecken in beiden Richtungen rund um Limassol, LCA, PFO, Paphos, Coral Bay, Peyia, Polis, Nikosia, Larnaka, Ayia Napa und Protaras in 7 Sprachen.',
    boundariesNote:
      'Hinweis zum Einsatzgebiet: Da unsere Flotte ab Limassol startet, führen wir keine kurzen Lokal-Transfers innerhalb von Paphos (z. B. PFO → Paphos/Coral Bay) oder innerhalb Ostzyperns (z. B. LCA → Ayia Napa/Protaras/Nikosia/Larnaka) durch.',
    napHeading: 'Verifizierte Unternehmensdaten (NAP)',
    addressLabel: 'Büro-Adresse',
    phoneLabel: 'Telefon / WhatsApp',
    emailLabel: 'E-Mail',
    hoursLabel: 'Erreichbarkeit',
    hoursValue: '24/7 rund um die Uhr inkl. Flugverfolgung',
    mapsCta: 'In Google Maps öffnen',
    routesCta: 'Alle 30 Festpreis-Strecken',
    contactCta: 'Kontakt aufnehmen',
  },
  pl: {
    breadcrumb: 'O nas',
    badge: 'Baza w Limassol · 24/7',
    h1: 'O Cyprus Airport Transfers',
    lead: 'Prywatne transfery w stałej cenie realizowane z bazy w Limassol na lotniska Larnaka (LCA), Pafos (PFO) oraz trasy międzymiastowe na Cyprze.',
    whoHeading: 'Kim jesteśmy i gdzie mieści się nasza baza',
    whoBody: [
      'Cyprus Airport Transfers organizuje odbiory z lotnisk oraz bezpośrednie przejazdy pod adres klienta z biura dyspozytorskiego w Limassol przy The Oval, Krinou 3, Agios Athanasios, 4103 Limassol.',
      'Centralne położenie przy autostradach A1 i A6 pozwala sprawnie obsługiwać przyloty w Larnace (LCA) i Pafos (PFO) z monitoringiem lotów na żywo, powitaniem z tabliczką i z góry znaną ceną w EUR.',
    ],
    fleetHeading: 'Flota i standard podróży',
    fleetItems: [
      'Komfortowe klimatyzowane sedany: Mercedes E-Class, Opel Insignia oraz Toyota Camry.',
      'Do 4 pasażerów i 3 dużych walizek w każdym samochodzie.',
      'Bezpłatne foteliki dziecięce i podkładki montowane przed kursem na życzenie.',
      'Dla grup 5+ pasażerów indywidualna wycena i organizacja na WhatsApp (+357 96 867289).',
    ],
    pricingHeading: 'Przejrzyste ceny i zasady rezerwacji',
    pricingItems: [
      'Stałe stawki €75–€200 na wszystkich 30 aktywnych trasach — zero taksometrów i ukrytych opłat.',
      'Stała dopłata nocna +€10 wyłącznie w godzinach 23:00–07:00.',
      'Automatyczne 10% zniżki na kurs powrotny przy zamówieniu obu stron razem.',
      'Zaliczka €20 przez Stripe, pełna płatność online lub u kierowcy; bezpłatne odwołanie do 24 godz. przed odbiorem.',
    ],
    coverageHeading: 'Zasięg tras i zasady obsługi',
    coverageBody:
      'Obsługujemy 30 dwukierunkowych tras łączących Limassol, LCA, PFO, Pafos, Coral Bay, Peyię, Polis, Nikozję, Larnakę, Ayia Napę i Protaras w 7 językach.',
    boundariesNote:
      'Zakres działania: ponieważ nasza flota wyjeżdża z Limassol, nie realizujemy krótkich lokalnych kursów wewnątrz regionu Pafos (np. PFO → Pafos/Coral Bay) ani wewnątrz wschodniej części wyspy (np. LCA → Ayia Napa/Protaras/Nikozja/Larnaka).',
    napHeading: 'Dane rejestrowe i kontaktowe (NAP)',
    addressLabel: 'Siedziba',
    phoneLabel: 'Telefon / WhatsApp',
    emailLabel: 'E-mail',
    hoursLabel: 'Godziny pracy',
    hoursValue: '24/7 przez cały rok ze śledzeniem lotów',
    mapsCta: 'Otwórz w Google Maps',
    routesCta: 'Zobacz wszystkie 30 tras',
    contactCta: 'Kontakt z dyspozytorem',
  },
  fr: {
    breadcrumb: 'À propos',
    badge: 'Base à Limassol · 24/7',
    h1: 'À propos de Cyprus Airport Transfers',
    lead: 'Transferts privés à tarif fixe opérés directement depuis Limassol vers les aéroports de Larnaca (LCA), Paphos (PFO) et les trajets interurbains.',
    whoHeading: 'Qui sommes-nous & notre base de Limassol',
    whoBody: [
      'Cyprus Airport Transfers assure des accueils personnalisés en aéroport et des trajets porte-à-porte depuis notre centre de Limassol situé à The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Chypre.',
      "Grâce à cette position centrale sur l'axe autoroutier A1/A6, nos chauffeurs desservent aussi bien Larnaca (LCA) que Paphos (PFO) avec suivi de vol en temps réel, pancarte nominative et prix fixes en EUR.",
    ],
    fleetHeading: 'Notre flotte & standards de service',
    fleetItems: [
      'Berlines climatisées récentes : Mercedes E-Class, Opel Insignia et Toyota Camry.',
      'Capacité maximale de 4 passagers et 3 grandes valises par véhicule.',
      'Sièges bébé et rehausseurs fournis gratuitement sur demande.',
      'Pour les groupes de 5 passagers ou plus, contactez-nous au préalable sur WhatsApp (+357 96 867289).',
    ],
    pricingHeading: 'Politique tarifaire & annulation',
    pricingItems: [
      'Tarifs fixes de 75 € à 200 € sur les 30 itinéraires actifs — sans compteur ni supplément caché.',
      'Forfait nuit unique de +10 € uniquement pour les départs entre 23h00 et 07h00.',
      "Remise automatique de 10 % sur le retour lors d'une réservation aller-retour.",
      'Acompte Stripe de 20 € ou paiement complet en ligne / au chauffeur ; annulation gratuite jusqu’à 24 h avant la prise en charge.',
    ],
    coverageHeading: 'Zone couverte & limites opérationnelles',
    coverageBody:
      'Nous opérons 30 itinéraires bidirectionnels reliant Limassol, LCA, PFO, Paphos, Coral Bay, Peyia, Polis, Nicosie, Larnaca, Ayia Napa et Protaras en 7 langues.',
    boundariesNote:
      "Périmètre : notre flotte étant basée à Limassol, nous n'assurons pas les petits trajets locaux exclusivement dans le district de Paphos (ex. PFO → Paphos/Coral Bay) ni dans l'est (ex. LCA → Ayia Napa/Protaras/Nicosie/Larnaca).",
    napHeading: "Coordonnées vérifiées de l'opérateur (NAP)",
    addressLabel: 'Adresse',
    phoneLabel: 'Téléphone / WhatsApp',
    emailLabel: 'E-mail',
    hoursLabel: 'Horaires',
    hoursValue: '24h/24 et 7j/7 avec suivi des vols',
    mapsCta: 'Ouvrir dans Google Maps',
    routesCta: 'Voir les 30 itinéraires fixes',
    contactCta: 'Contacter le dispatch',
  },
  el: {
    breadcrumb: 'Σχετικά με εμάς',
    badge: 'Βάση Λεμεσού · 24/7',
    h1: 'Σχετικά με το Cyprus Airport Transfers',
    lead: 'Ιδιωτικές μεταφορές σταθερής τιμής με βάση τη Λεμεσό για τα αεροδρόμια Λάρνακας (LCA), Πάφου (PFO) και διαδρομές σε όλη την Κύπρο.',
    whoHeading: 'Ποιοι είμαστε & η βάση μας στη Λεμεσό',
    whoBody: [
      'Το Cyprus Airport Transfers συντονίζει προγραμματισμένες παραλαβές αεροδρομίου και απευθείας μεταφορές από το γραφείο συντονισμού μας στη διεύθυνση The Oval, Krinou 3, Άγιος Αθανάσιος, 4103 Λεμεσός.',
      'Με κεντρική θέση στον άξονα A1/A6 εξυπηρετούμε άμεσα τόσο τη Λάρνακα (LCA) όσο και την Πάφο (PFO) με ζωντανή παρακολούθηση πτήσης, υποδοχή με ταμπέλα και προκαθορισμένες τιμές σε ευρώ.',
    ],
    fleetHeading: 'Στόλος & προδιαγραφές ασφαλείας',
    fleetItems: [
      'Σύγχρονα κλιματιζόμενα sedan: Mercedes E-Class, Opel Insignia και Toyota Camry.',
      'Χωρητικότητα έως 4 επιβάτες και 3 κανονικές βαλίτσες ανά όχημα.',
      'Δωρεάν παιδικά καθίσματα κατόπιν αιτήματος κατά την κράτηση.',
      'Για παρέες 5+ ατόμων επικοινωνήστε μαζί μας εκ των προτέρων στο WhatsApp (+357 96 867289).',
    ],
    pricingHeading: 'Διαφανείς χρεώσεις & όροι',
    pricingItems: [
      'Σταθερές τιμές €75–€200 και στις 30 ενεργές διαδρομές — χωρίς ταξίμετρο.',
      'Ενιαίο νυχτερινό τέλος +€10 μόνο για παραλαβές από 23:00 έως 07:00.',
      'Αυτόματη έκπτωση 10% στην επιστροφή σε κρατήσεις μετ’ επιστροφής.',
      'Προκαταβολή €20 μέσω Stripe, εξόφληση online ή στον οδηγό· δωρεάν ακύρωση έως 24 ώρες πριν.',
    ],
    coverageHeading: 'Κάλυψη διαδρομών & όρια λειτουργίας',
    coverageBody:
      'Εκτελούμε 30 αμφίδρομες διαδρομές μεταξύ Λεμεσού, LCA, PFO, Πάφου, Coral Bay, Πέγειας, Πόλης Χρυσοχούς, Λευκωσίας, Λάρνακας, Αγίας Νάπας και Πρωταρά σε 7 γλώσσες.',
    boundariesNote:
      'Σημείωση κάλυψης: επειδή η βάση μας βρίσκεται στη Λεμεσό, δεν αναλαμβάνουμε σύντομες τοπικές μεταφορές αποκλειστικά εντός Πάφου (π.χ. PFO → Πάφος/Coral Bay) ή εντός ανατολικής Κύπρου (π.χ. LCA → Αγία Νάπα/Πρωταράς/Λευκωσία).',
    napHeading: 'Επαληθευμένα στοιχεία εταιρείας',
    addressLabel: 'Έδρα',
    phoneLabel: 'Τηλέφωνο / WhatsApp',
    emailLabel: 'Email',
    hoursLabel: 'Ωράριο',
    hoursValue: '24/7 όλο τον χρόνο με έλεγχο πτήσης',
    mapsCta: 'Προβολή στο Google Maps',
    routesCta: 'Δείτε όλες τις 30 διαδρομές',
    contactCta: 'Επικοινωνία',
  },
  it: {
    breadcrumb: 'Chi siamo',
    badge: 'Sede di Limassol · 24/7',
    h1: 'Chi siamo — Cyprus Airport Transfers',
    lead: 'Transfer privati in berlina a tariffa fissa operati dalla nostra base di Limassol per Larnaca (LCA), Paphos (PFO) e tratte interurbane.',
    whoHeading: 'Chi siamo e la nostra sede a Limassol',
    whoBody: [
      'Cyprus Airport Transfers coordina accoglienze in aeroporto e transfer porta a porta dalla sede operativa di Limassol presso The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cipro.',
      'Grazie alla posizione centrale sulle autostrade A1 e A6 raggiungiamo puntualmente sia Larnaca (LCA) sia Paphos (PFO) con monitoraggio voli in tempo reale, cartello agli arrivi e prezzi fissi in euro.',
    ],
    fleetHeading: 'Flotta e standard per i passeggeri',
    fleetItems: [
      'Berline climatizzate moderne: Mercedes E-Class, Opel Insignia e Toyota Camry.',
      'Fino a 4 passeggeri e 3 valigie grandi per veicolo.',
      'Seggiolini e rialzi per bambini inclusi gratuitamente su richiesta.',
      'Per gruppi da 5 o più persone organizza la corsa su misura via WhatsApp (+357 96 867289).',
    ],
    pricingHeading: 'Tariffe chiare e cancellazione flessibile',
    pricingItems: [
      'Prezzi bloccati da €75 a €200 su tutte le 30 tratte attive — niente tassametro.',
      'Supplemento notturno fisso di +€10 solo tra le 23:00 e le 07:00.',
      'Sconto automatico del 10% sul ritorno prenotando andata e ritorno insieme.',
      'Acconto €20 con Stripe oppure saldo online o all’autista; cancellazione gratuita fino a 24 ore prima.',
    ],
    coverageHeading: 'Aree coperte e limiti operativi',
    coverageBody:
      'Operiamo 30 tratte bidirezionali collegando Limassol, LCA, PFO, Paphos, Coral Bay, Peyia, Polis, Nicosia, Larnaca, Ayia Napa e Protaras in 7 lingue.',
    boundariesNote:
      'Ambito operativo: partendo da Limassol, non effettuiamo brevi corse locali interne al solo distretto di Paphos (es. PFO → Paphos/Coral Bay) né interne alla sola Cipro est (es. LCA → Ayia Napa/Protaras/Nicosia/Larnaca).',
    napHeading: 'Dati verificati operatore (NAP)',
    addressLabel: 'Sede Operativa',
    phoneLabel: 'Telefono / WhatsApp',
    emailLabel: 'Email',
    hoursLabel: 'Orari',
    hoursValue: '24/7 tutto l’anno con monitoraggio voli',
    mapsCta: 'Apri su Google Maps',
    routesCta: 'Vedi tutte le 30 tratte',
    contactCta: 'Contattaci',
  },
};

export default function AboutPage() {
  const { language, t } = useLanguage();
  const copy = ABOUT_COPY[language] || ABOUT_COPY.en;
  const homeHref = buildLocalizedPath('home', language);
  const routesHref = buildLocalizedPath('routes-index', language);
  const contactHref = buildLocalizedPath('contact', language);
  const mapsUrl =
    'https://www.google.com/maps/search/?api=1&query=The+Oval,+Krinou+3,+Agios+Athanasios,+4103+Limassol,+Cyprus';

  return (
    <main className="bg-white">
      <section className="py-12 md:py-16 border-b-4 border-black bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <nav
            aria-label="Breadcrumb"
            className="mb-6 text-xs sm:text-sm font-bold text-gray-700 flex flex-wrap items-center gap-2"
          >
            <a href={homeHref} className="hover:text-black underline">
              {t('common.home')}
            </a>
            <span aria-hidden="true">/</span>
            <span className="text-black">{copy.breadcrumb}</span>
          </nav>

          <div className="max-w-4xl">
            <span className="inline-block px-3 py-1 bg-yellow-400 border-2 border-black text-xs font-black uppercase mb-4">
              {copy.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tight mb-5">
              {copy.h1}
            </h1>
            <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed">
              {copy.lead}
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 bg-yellow-400 border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7 bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">
              {copy.whoHeading}
            </h2>
            <div className="space-y-4 text-gray-800 font-medium leading-relaxed">
              {copy.whoBody.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          <aside className="lg:col-span-5 bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-xl font-black text-black uppercase tracking-tight mb-5">
              {copy.napHeading}
            </h2>
            <dl className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0 text-black mt-0.5" />
                <div>
                  <dt className="font-black uppercase text-xs text-gray-600">{copy.addressLabel}</dt>
                  <dd className="font-bold text-black">
                    The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cyprus
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 shrink-0 text-black mt-0.5" />
                <div>
                  <dt className="font-black uppercase text-xs text-gray-600">{copy.phoneLabel}</dt>
                  <dd className="font-bold text-black">
                    <a
                      href={`https://wa.me/${WHATSAPP_NUMBER}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => reportContactClick('whatsapp')}
                      className="underline hover:text-yellow-600"
                    >
                      +357 96 867289
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 shrink-0 text-black mt-0.5" />
                <div>
                  <dt className="font-black uppercase text-xs text-gray-600">{copy.emailLabel}</dt>
                  <dd className="font-bold text-black">
                    <a href="mailto:info@cyprus-airport-transfer.co" className="underline hover:text-yellow-600">
                      info@cyprus-airport-transfer.co
                    </a>
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 shrink-0 text-black mt-0.5" />
                <div>
                  <dt className="font-black uppercase text-xs text-gray-600">{copy.hoursLabel}</dt>
                  <dd className="font-bold text-black">{copy.hoursValue}</dd>
                </div>
              </div>
            </dl>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 brutal-btn w-full py-2.5 text-xs uppercase flex items-center justify-center gap-2"
            >
              <span>{copy.mapsCta}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </aside>
        </div>
      </section>

      <section className="py-14 bg-white border-b-4 border-black">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="inline-flex items-center gap-2 mb-4">
              <Car className="w-6 h-6 text-black" />
              <h2 className="text-xl font-black text-black uppercase tracking-tight">
                {copy.fleetHeading}
              </h2>
            </div>
            <ul className="space-y-3">
              {copy.fleetItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-gray-800">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-black mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="inline-flex items-center gap-2 mb-4">
              <ShieldCheck className="w-6 h-6 text-black" />
              <h2 className="text-xl font-black text-black uppercase tracking-tight">
                {copy.pricingHeading}
              </h2>
            </div>
            <ul className="space-y-3">
              {copy.pricingItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base font-medium text-gray-800">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-black mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-4">
              {copy.coverageHeading}
            </h2>
            <p className="text-gray-800 font-medium leading-relaxed mb-4">{copy.coverageBody}</p>
            <p className="text-sm font-bold text-black bg-yellow-100 border-2 border-black p-4 mb-6">
              {copy.boundariesNote}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={routesHref} className="brutal-btn px-6 py-3 text-sm uppercase inline-flex items-center gap-2">
                <span>{copy.routesCta}</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={contactHref}
                className="px-6 py-3 text-sm font-black uppercase bg-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-yellow-400 transition-colors inline-flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                <span>{copy.contactCta}</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
