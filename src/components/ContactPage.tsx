import React from 'react';
import { MessageCircle, Phone, Mail, MapPin, ExternalLink, Info } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { buildLocalizedPath, Language } from '../lib/routing';
import { WHATSAPP_NUMBER } from '../config';
import { reportContactClick } from '../lib/analytics';
import ContactForm from './ContactForm';

interface ContactPageCopy {
  breadcrumb: string;
  badge: string;
  h1: string;
  lead: string;
  whatsappTitle: string;
  whatsappDesc: string;
  phoneTitle: string;
  phoneDesc: string;
  emailTitle: string;
  emailDesc: string;
  officeTitle: string;
  officeMaps: string;
  bestForHeading: string;
  bestForItems: string[];
}

const CONTACT_COPY: Record<Language, ContactPageCopy> = {
  en: {
    breadcrumb: 'Contact',
    badge: '24/7 Limassol Dispatch',
    h1: 'Contact Cyprus Airport Transfers',
    lead: 'Reach our Limassol dispatchers directly via WhatsApp, phone, email, or the inquiry form below for custom quotes, flight updates, and pickup coordination.',
    whatsappTitle: 'WhatsApp 24/7 Dispatch',
    whatsappDesc: 'Fastest channel for flight changes & 5+ group quotes',
    phoneTitle: 'Direct Phone Line',
    phoneDesc: 'Call +357 96 867289 any time of day or night',
    emailTitle: 'Booking Support Email',
    emailDesc: 'Receipts, hotel/villa coordinates & advance schedules',
    officeTitle: 'Limassol Dispatch Office',
    officeMaps: 'Open in Google Maps',
    bestForHeading: 'When to Message Our Dispatch Team Directly',
    bestForItems: [
      'Group transfers for 5+ passengers needing larger vehicles or two sedans.',
      'Complimentary infant, child, or booster seat age specifications.',
      'Last-minute flight number updates or gate delays at LCA / PFO.',
      'Google Maps pin or lockbox arrival instructions for Coral Bay, Peyia & coastal villas.',
    ],
  },
  ru: {
    breadcrumb: 'Контакты',
    badge: 'Диспетчерская 24/7 в Лимассоле',
    h1: 'Контакты Cyprus Airport Transfers',
    lead: 'Свяжитесь с нашей командой в Лимассоле по WhatsApp, телефону, email или через форму обратной связи ниже для расчёта нестандартных поездок и уточнения деталей.',
    whatsappTitle: 'WhatsApp 24/7',
    whatsappDesc: 'Быстрый ответ по переносу рейсов и компаниям 5+ человек',
    phoneTitle: 'Телефон диспетчера',
    phoneDesc: 'Круглосуточная линия +357 96 867289',
    emailTitle: 'Email поддержки',
    emailDesc: 'Подтверждения, адреса вилл и предварительные заявки',
    officeTitle: 'База в Лимассоле',
    officeMaps: 'Открыть в Google Картах',
    bestForHeading: 'С какими вопросами удобнее написать напрямую',
    bestForItems: [
      'Трансферы для групп от 5 пассажиров (согласование доп. мест или двух авто).',
      'Запрос бесплатных детских кресел и бустеров под возраст ребёнка.',
      'Уточнение номера задержанного рейса при посадке в Ларнаке (LCA) или Пафосе (PFO).',
      'Координаты Google Maps и инструкции по заселению в виллы Корал Бэй, Пейи и Протараса.',
    ],
  },
  de: {
    breadcrumb: 'Kontakt',
    badge: '24/7 Disposition Limassol',
    h1: 'Kontakt — Cyprus Airport Transfers',
    lead: 'Erreichen Sie unser Team in Limassol rund um die Uhr per WhatsApp, Telefon, E-Mail oder über das Kontaktformular weiter unten.',
    whatsappTitle: 'WhatsApp 24/7',
    whatsappDesc: 'Schnellster Weg bei Flugänderungen & Gruppen ab 5 Personen',
    phoneTitle: 'Telefon-Hotline',
    phoneDesc: 'Rund um die Uhr erreichbar unter +357 96 867289',
    emailTitle: 'Support per E-Mail',
    emailDesc: 'Buchungsbelege, Villen-Koordinaten & Sonderwünsche',
    officeTitle: 'Standort Limassol',
    officeMaps: 'In Google Maps öffnen',
    bestForHeading: 'Wobei wir direkt weiterhelfen',
    bestForItems: [
      'Gruppenanfragen ab 5 Personen vorab per WhatsApp abstimmen.',
      'Kostenlose Babyschalen oder Kindersitze passend zum Alter anfragen.',
      'Flugnummern-Updates oder geänderte Ankunftszeiten in LCA / PFO melden.',
      'Google-Maps-Pins für Ferienvillen in Coral Bay, Pegeia oder Protaras teilen.',
    ],
  },
  pl: {
    breadcrumb: 'Kontakt',
    badge: 'Dyspozytornia 24/7 w Limassol',
    h1: 'Kontakt — Cyprus Airport Transfers',
    lead: 'Skontaktuj się z naszym zespołem w Limassol przez WhatsApp, telefon, e-mail lub formularz poniżej w sprawie grup, fotelików i zmian lotów.',
    whatsappTitle: 'WhatsApp 24/7',
    whatsappDesc: 'Najszybszy kontakt przy zmianach lotu i grupach 5+ osób',
    phoneTitle: 'Telefon całodobowy',
    phoneDesc: 'Zadzwoń o dowolnej porze: +357 96 867289',
    emailTitle: 'Adres e-mail',
    emailDesc: 'Potwierdzenia rezerwacji, pinezki willi i zapytania',
    officeTitle: 'Biuro w Limassol',
    officeMaps: 'Otwórz w Google Maps',
    bestForHeading: 'Kiedy warto napisać bezpośrednio do dyspozytora',
    bestForItems: [
      'Przejazdy dla 5+ pasażerów wymagające indywidualnego dopasowania aut.',
      'Dobór darmowych fotelików dziecięcych i podkładek przed przyjazdem.',
      'Aktualizacja opóźnionego numeru lotu na lotniskach LCA oraz PFO.',
      'Przekazanie lokalizacji Google Maps do willi w Coral Bay, Peyi czy Protaras.',
    ],
  },
  fr: {
    breadcrumb: 'Contact',
    badge: 'Dispatch 24/7 à Limassol',
    h1: 'Contacter Cyprus Airport Transfers',
    lead: 'Joignez nos répartiteurs basés à Limassol par WhatsApp, téléphone, e-mail ou via le formulaire ci-dessous.',
    whatsappTitle: 'WhatsApp 24/7',
    whatsappDesc: 'Réponse immédiate pour changements de vol & groupes 5+',
    phoneTitle: 'Ligne téléphonique',
    phoneDesc: 'Appelez le +357 96 867289 à toute heure',
    emailTitle: 'E-mail support',
    emailDesc: 'Reçus, coordonnées GPS de villas & demandes spécifiques',
    officeTitle: 'Bureau de Limassol',
    officeMaps: 'Ouvrir dans Google Maps',
    bestForHeading: 'Quand nous écrire directement',
    bestForItems: [
      'Groupes de 5 voyageurs et plus nécessitant un devis sur mesure.',
      'Précisions sur les sièges bébé et rehausseurs gratuits.',
      'Mises à jour de dernière minute sur votre numéro de vol LCA / PFO.',
      'Lien Google Maps et code portail pour villas à Coral Bay, Pegeia ou Protaras.',
    ],
  },
  el: {
    breadcrumb: 'Επικοινωνία',
    badge: 'Συντονισμός 24/7 στη Λεμεσό',
    h1: 'Επικοινωνία — Cyprus Airport Transfers',
    lead: 'Επικοινωνήστε απευθείας με τη βάση μας στη Λεμεσό μέσω WhatsApp, τηλεφώνου, email ή της φόρμας παρακάτω.',
    whatsappTitle: 'WhatsApp 24/7',
    whatsappDesc: 'Άμεση απάντηση για αλλαγές πτήσεων & παρέες 5+ ατόμων',
    phoneTitle: 'Τηλεφωνική Γραμμή',
    phoneDesc: 'Καλέστε στο +357 96 867289 όλο το 24ωρο',
    emailTitle: 'Email Υποστήριξης',
    emailDesc: 'Αποδείξεις, συντεταγμένες βίλας & προκρατήσεις',
    officeTitle: 'Γραφείο Λεμεσού',
    officeMaps: 'Άνοιγμα στο Google Maps',
    bestForHeading: 'Πότε να μας στείλετε μήνυμα απευθείας',
    bestForItems: [
      'Μεταφορές για ομάδες 5+ επιβατών για έγκαιρη οργάνωση οχημάτων.',
      'Αιτήματα για δωρεάν παιδικά καθίσματα και ανυψωτικά (boosters).',
      'Αλλαγές ώρας ή αριθμού πτήσης στα αεροδρόμια Λάρνακας (LCA) και Πάφου (PFO).',
      'Στίγμα Google Maps για βίλες σε Coral Bay, Πέγεια και Πρωταρά.',
    ],
  },
  it: {
    breadcrumb: 'Contatti',
    badge: 'Centrale Operativa 24/7 Limassol',
    h1: 'Contatta Cyprus Airport Transfers',
    lead: 'Scrivi o chiama la nostra sede di Limassol via WhatsApp, telefono, email oppure utilizza il modulo dedicato qui sotto.',
    whatsappTitle: 'WhatsApp 24/7',
    whatsappDesc: 'Canale più rapido per cambi volo e gruppi 5+ persone',
    phoneTitle: 'Telefono Diretto',
    phoneDesc: 'Attivo 24 ore su 24 al +357 96 867289',
    emailTitle: 'Email Assistenza',
    emailDesc: 'Ricevute, posizione ville e richieste speciali',
    officeTitle: 'Sede di Limassol',
    officeMaps: 'Apri su Google Maps',
    bestForHeading: 'Quando contattare direttamente la centrale',
    bestForItems: [
      'Trasferimenti per gruppi di 5 o più passeggeri con preventivo dedicato.',
      'Indicazione dell’età dei bambini per preparare gratuitamente i seggiolini adatti.',
      'Aggiornamenti dell’ultimo minuto sul numero di volo per LCA / PFO.',
      'Condivisione pin Google Maps per ville a Coral Bay, Pegeia o Protaras.',
    ],
  },
};

export default function ContactPage() {
  const { language, t } = useLanguage();
  const copy = CONTACT_COPY[language] || CONTACT_COPY.en;
  const homeHref = buildLocalizedPath('home', language);
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

          <div className="max-w-4xl mb-10">
            <span className="inline-block px-3 py-1 bg-yellow-400 border-2 border-black text-xs font-black uppercase mb-4">
              {copy.badge}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tight mb-4">
              {copy.h1}
            </h1>
            <p className="text-base sm:text-lg text-gray-800 font-medium leading-relaxed">
              {copy.lead}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => reportContactClick('whatsapp')}
              className="brutal-card bg-yellow-400 p-5 flex flex-col justify-between group"
            >
              <div>
                <MessageCircle className="w-7 h-7 text-black mb-3" />
                <h2 className="text-lg font-black text-black uppercase mb-1">{copy.whatsappTitle}</h2>
                <p className="text-xs font-bold text-black/80 mb-3">{copy.whatsappDesc}</p>
              </div>
              <span className="text-sm font-black text-black underline">+357 96 867289</span>
            </a>

            <a
              href="tel:+35796867289"
              className="brutal-card bg-white p-5 flex flex-col justify-between"
            >
              <div>
                <Phone className="w-7 h-7 text-black mb-3" />
                <h2 className="text-lg font-black text-black uppercase mb-1">{copy.phoneTitle}</h2>
                <p className="text-xs font-medium text-gray-700 mb-3">{copy.phoneDesc}</p>
              </div>
              <span className="text-sm font-black text-black underline">+357 96 867289</span>
            </a>

            <a
              href="mailto:info@cyprus-airport-transfer.co"
              className="brutal-card bg-white p-5 flex flex-col justify-between"
            >
              <div>
                <Mail className="w-7 h-7 text-black mb-3" />
                <h2 className="text-lg font-black text-black uppercase mb-1">{copy.emailTitle}</h2>
                <p className="text-xs font-medium text-gray-700 mb-3">{copy.emailDesc}</p>
              </div>
              <span className="text-sm font-black text-black underline break-all">
                info@cyprus-airport-transfer.co
              </span>
            </a>

            <div className="brutal-card bg-white p-5 flex flex-col justify-between">
              <div>
                <MapPin className="w-7 h-7 text-black mb-3" />
                <h2 className="text-lg font-black text-black uppercase mb-1">{copy.officeTitle}</h2>
                <p className="text-xs font-bold text-gray-800 mb-3">
                  The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cyprus
                </p>
              </div>
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-black text-black underline hover:text-yellow-600"
              >
                <span>{copy.officeMaps}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-gray-50 border-4 border-black p-6 shadow-[5px_5px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-black shrink-0" />
              <h2 className="text-lg font-black text-black uppercase">{copy.bestForHeading}</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-sm font-medium text-gray-800">
              {copy.bestForItems.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span aria-hidden="true" className="font-black text-black">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <ContactForm />
    </main>
  );
}
