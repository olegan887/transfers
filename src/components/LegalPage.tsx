import React from 'react';
import { Shield, FileText, ArrowRight, Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { buildLocalizedPath, Language } from '../lib/routing';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

interface OperatorBlockCopy {
  controllerHeading: string;
  controllerNote: string;
  otherLegalLabel: string;
  contactLabel: string;
}

const OPERATOR_COPY: Record<Language, OperatorBlockCopy> = {
  en: {
    controllerHeading: 'Operator & Data Controller',
    controllerNote:
      'Operated by Cyprus Airport Transfers from The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cyprus. Questions regarding bookings, cancellations, or GDPR data requests can be sent directly to our Limassol office.',
    otherLegalLabel: 'Read also:',
    contactLabel: 'Contact Support',
  },
  ru: {
    controllerHeading: 'Оператор сервиса и контроллер данных',
    controllerNote:
      'Сервис Cyprus Airport Transfers работает из офиса в Лимассоле: The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cyprus. По вопросам бронирований, возвратов и обработки персональных данных (GDPR) обращайтесь напрямую к нам.',
    otherLegalLabel: 'См. также:',
    contactLabel: 'Связаться с нами',
  },
  de: {
    controllerHeading: 'Betreiber & Verantwortlicher (DSGVO)',
    controllerNote:
      'Betrieben von Cyprus Airport Transfers, The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Zypern. Fragen zu Buchungen, Stornierungen oder Datenschutzanfragen richten Sie bitte direkt an unser Büro.',
    otherLegalLabel: 'Siehe auch:',
    contactLabel: 'Kontakt',
  },
  pl: {
    controllerHeading: 'Operator i administrator danych (RODO)',
    controllerNote:
      'Usługę świadczy Cyprus Airport Transfers z biura w Limassol: The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cypr. W sprawach rezerwacji, zwrotów oraz RODO prosimy o kontakt z naszym biurem.',
    otherLegalLabel: 'Zobacz również:',
    contactLabel: 'Kontakt',
  },
  fr: {
    controllerHeading: 'Opérateur & Responsable du traitement (RGPD)',
    controllerNote:
      'Service exploité par Cyprus Airport Transfers depuis The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Chypre. Pour toute demande liée à une réservation ou à vos données personnelles, contactez directement notre équipe.',
    otherLegalLabel: 'Voir aussi :',
    contactLabel: 'Nous contacter',
  },
  el: {
    controllerHeading: 'Φορέας Λειτουργίας & Υπεύθυνος Επεξεργασίας (GDPR)',
    controllerNote:
      'Λειτουργεί από το Cyprus Airport Transfers με έδρα The Oval, Krinou 3, Άγιος Αθανάσιος, 4103 Λεμεσός, Κύπρος. Για θέματα κρατήσεων, ακυρώσεων ή προσωπικών δεδομένων επικοινωνήστε μαζί μας.',
    otherLegalLabel: 'Δείτε επίσης:',
    contactLabel: 'Επικοινωνία',
  },
  it: {
    controllerHeading: 'Operatore & Titolare del trattamento (GDPR)',
    controllerNote:
      'Operato da Cyprus Airport Transfers con sede in The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cipro. Per domande su prenotazioni, rimborsi o diritti GDPR contatta direttamente i nostri uffici.',
    otherLegalLabel: 'Vedi anche:',
    contactLabel: 'Contatti',
  },
};

export default function LegalPage({ type }: LegalPageProps) {
  const { language, t } = useLanguage();
  const title = type === 'privacy' ? t('legal.privacyTitle') : t('legal.termsTitle');
  const body = type === 'privacy' ? t('legal.privacyBody') : t('legal.termsBody');
  const homeHref = buildLocalizedPath('home', language);
  const siblingType = type === 'privacy' ? 'terms' : 'privacy';
  const siblingHref = buildLocalizedPath(siblingType, language);
  const siblingTitle = siblingType === 'privacy' ? t('legal.privacyTitle') : t('legal.termsTitle');
  const contactHref = buildLocalizedPath('contact', language);
  const op = OPERATOR_COPY[language] || OPERATOR_COPY.en;

  const lines = body
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <main className="py-12 md:py-16 bg-white min-h-[75vh]">
      <div className="container mx-auto px-4 max-w-4xl">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 text-xs sm:text-sm font-bold text-gray-700 flex flex-wrap items-center gap-2"
        >
          <a href={homeHref} className="hover:text-black underline">
            {t('common.home')}
          </a>
          <span aria-hidden="true">/</span>
          <span className="text-black">{title}</span>
        </nav>

        <header className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-400 border-2 border-black text-xs font-black uppercase mb-4">
            {type === 'privacy' ? <Shield className="w-4 h-4" /> : <FileText className="w-4 h-4" />}
            <span>Cyprus Airport Transfers</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-black uppercase tracking-tight">
            {title}
          </h1>
        </header>

        <article className="bg-white border-4 border-black p-6 md:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-10">
          {lines.map((line, idx) =>
            /^\d+\.\s/.test(line) ? (
              <h2
                key={idx}
                className="text-xl font-black text-black uppercase tracking-tight mt-6 mb-2 first:mt-0"
              >
                {line}
              </h2>
            ) : (
              <p key={idx} className="text-gray-800 font-medium leading-relaxed mb-3 last:mb-0">
                {line}
              </p>
            )
          )}
        </article>

        <section className="bg-yellow-400 border-4 border-black p-6 md:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <h2 className="text-xl font-black text-black uppercase tracking-tight mb-3">
            {op.controllerHeading}
          </h2>
          <p className="text-sm sm:text-base font-bold text-black leading-relaxed mb-5">
            {op.controllerNote}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm font-bold mb-6">
            <div className="bg-white border-2 border-black p-3 flex items-start gap-2">
              <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
              <span>The Oval, Krinou 3, 4103 Limassol, Cyprus</span>
            </div>
            <div className="bg-white border-2 border-black p-3 flex items-center gap-2">
              <Phone className="w-4 h-4 shrink-0" />
              <span>+357 96 867289</span>
            </div>
            <div className="bg-white border-2 border-black p-3 flex items-center gap-2">
              <Mail className="w-4 h-4 shrink-0" />
              <a href="mailto:info@cyprus-airport-transfer.co" className="underline break-all">
                info@cyprus-airport-transfer.co
              </a>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a href={contactHref} className="brutal-btn px-5 py-2.5 text-xs uppercase inline-flex items-center gap-2">
              <span>{op.contactLabel}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
            <span className="text-xs font-black uppercase text-black">
              {op.otherLegalLabel}{' '}
              <a href={siblingHref} className="underline hover:bg-white px-1 py-0.5">
                {siblingTitle}
              </a>
            </span>
          </div>
        </section>
      </div>
    </main>
  );
}
