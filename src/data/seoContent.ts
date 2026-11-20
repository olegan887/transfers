import { Language } from '../lib/routing';

export interface ReviewItem {
  id: string;
  author: string;
  route: Record<Language, string>;
  date: string;
  rating: number;
  text: Record<Language, string>;
}

export interface GlobalFaqItem {
  q: Record<Language, string>;
  a: Record<Language, string>;
}

export const passengerReviews: ReviewItem[] = [
  {
    id: 'r1',
    author: 'Elena K.',
    route: {
      en: 'Larnaca Airport (LCA) → Limassol',
      ru: 'Аэропорт Ларнака (LCA) → Лимассол',
      de: 'Flughafen Larnaka (LCA) → Limassol',
      pl: 'Lotnisko Larnaka (LCA) → Limassol',
      fr: 'Aéroport de Larnaca (LCA) → Limassol',
      el: 'Αεροδρόμιο Λάρνακας (LCA) → Λεμεσός',
      it: 'Aeroporto di Larnaca (LCA) → Limassol',
    },
    date: '2026-10-12',
    rating: 5,
    text: {
      en: 'Flight landed 45 minutes late at night. Our Limassol-based driver tracked it automatically, met us with a sign inside LCA arrivals, and drove us straight to Limassol Marina in a spotless sedan for €75 + €10 night rate as quoted.',
      ru: 'Рейс задержался на 45 минут поздно вечером. Водитель из Лимассола сам отследил посадку, встретил с табличкой в зале прилёта Ларнаки и довёз до Лимассол Марины на чистом седане. Цена €75 + €10 ночной тариф — ровно как в калькуляторе.',
      de: 'Unser Flug landete nachts mit 45 Minuten Verspätung. Der Fahrer aus Limassol verfolgte den Flug automatisch, empfing uns mit Namensschild in LCA und fuhr uns direkt zur Limassol Marina für exakt €75 + €10 Nachttarif.',
      pl: 'Samolot wylądował w nocy z 45-minutowym opóźnieniem. Kierowca z Limassol automatycznie śledził lot, czekał z tabliczką w hali przylotów LCA i zawiózł nas do Limassol Marina za dokładnie €75 + €10 taryfy nocnej.',
      fr: 'Notre vol a atterri avec 45 minutes de retard la nuit. Le chauffeur basé à Limassol a suivi le vol, nous a accueillis avec une pancarte à LCA et conduits directement à la Marina pour 75 € + 10 € de tarif nuit.',
      el: 'Η πτήση μας προσγειώθηκε νύχτα με 45 λεπτά καθυστέρηση. Ο οδηγός μας από τη Λεμεσό την παρακολούθησε αυτόματα, μας περίμενε με ταμπέλα στις αφίξεις LCA και μας μετέφερε στη Μαρίνα Λεμεσού με 75€ + 10€ νυχτερινό τιμολόγιο.',
      it: 'Il volo è atterrato di notte con 45 minuti di ritardo. Il nostro autista di Limassol lo ha monitorato in tempo reale, ci ha accolto agli arrivi LCA e portati alla Marina per 75€ + 10€ di tariffa notturna.',
    },
  },
  {
    id: 'r2',
    author: 'Marcus & Hannah W.',
    route: {
      en: 'Paphos Airport (PFO) → Limassol',
      ru: 'Аэропорт Пафос (PFO) → Лимассол',
      de: 'Flughafen Paphos (PFO) → Limassol',
      pl: 'Lotnisko Pafos (PFO) → Limassol',
      fr: 'Aéroport de Paphos (PFO) → Limassol',
      el: 'Αεροδρόμιο Πάφου (PFO) → Λεμεσός',
      it: 'Aeroporto di Pafos (PFO) → Limassol',
    },
    date: '2026-09-28',
    rating: 5,
    text: {
      en: 'Booked round trip between Paphos Airport and our hotel in Limassol with two child seats. Both seats were already installed, cold water waiting in the car, and we saved 10% on the return leg back to PFO.',
      ru: 'Заказывали трансфер туда-обратно между аэропортом Пафос и отелем в Лимассоле с двумя детскими креслами. Кресла уже стояли в машине, в салоне была холодная вода, а на обратную дорогу сработала скидка 10%.',
      de: 'Hin- und Rückfahrt zwischen Flughafen Paphos und unserem Hotel in Limassol mit zwei Kindersitzen gebucht. Beide Sitze waren schon montiert, kaltes Wasser lag bereit und für den Rückweg gab es 10 % Rabatt.',
      pl: 'Zarezerwowaliśmy przejazd w obie strony między lotniskiem Pafos a hotelem w Limassol z dwoma fotelikami. Foteliki były już zamontowane, w aucie czekała zimna woda, a na powrót naliczono 10% zniżki.',
      fr: 'Aller-retour réservé entre l’aéroport de Paphos et notre hôtel à Limassol avec deux sièges auto. Les deux étaient déjà installés, avec de l’eau fraîche à bord et 10 % de remise sur le trajet retour.',
      el: 'Κλείσαμε μεταφορά μετ’ επιστροφής από το αεροδρόμιο Πάφου προς το ξενοδοχείο μας στη Λεμεσό με δύο παιδικά καθίσματα. Ήταν ήδη τοποθετημένα, με κρύο νερό στο όχημα και έκπτωση 10% στην επιστροφή.',
      it: 'Prenotato andata e ritorno tra l’aeroporto di Pafos e il nostro hotel a Limassol con due seggiolini. Entrambi erano già installati, acqua fresca a bordo e sconto del 10% sul ritorno.',
    },
  },
  {
    id: 'r3',
    author: 'Dmitry S.',
    route: {
      en: 'Larnaca Airport (LCA) → Paphos',
      ru: 'Аэропорт Ларнака (LCA) → Пафос',
      de: 'Flughafen Larnaka (LCA) → Paphos',
      pl: 'Lotnisko Larnaka (LCA) → Pafos',
      fr: 'Aéroport de Larnaca (LCA) → Paphos',
      el: 'Αεροδρόμιο Λάρνακας (LCA) → Πάφος',
      it: 'Aeroporto di Larnaca (LCA) → Pafos',
    },
    date: '2026-10-24',
    rating: 5,
    text: {
      en: 'Paid a €20 deposit online via Stripe and the rest in cash upon arrival in Paphos. Much faster and calmer than changing buses via Limassol with three suitcases. Driver contacted us on WhatsApp before takeoff.',
      ru: 'Внёс депозит €20 картой через Stripe, остаток отдал водителю в Пафосе (€135 итог). Гораздо быстрее и спокойнее автобусов с пересадками. Водитель написал в WhatsApp ещё до нашего вылета.',
      de: '20 € Anzahlung online über Stripe bezahlt und den Rest bei Ankunft in Paphos bar entrichtet. Viel schneller als Umsteigen mit drei Koffern. Der Fahrer schrieb uns schon vor dem Abflug per WhatsApp.',
      pl: 'Wpłaciłem 20 € zaliczki przez Stripe online, a resztę gotówką po dotarciu do Pafos. Znacznie szybciej i wygodniej niż przesiadki autobusowe z trzema walizkami. Kierowca odezwał się na WhatsApp przed odlotem.',
      fr: 'Acompte de 20 € réglé en ligne via Stripe et le solde en espèces à l’arrivée à Paphos. Bien plus rapide que les changements de bus avec trois valises. Le chauffeur nous a contactés sur WhatsApp avant le décollage.',
      el: 'Πλήρωσα 20€ προκαταβολή online μέσω Stripe και το υπόλοιπο μετρητά στην Πάφο. Πολύ πιο γρήγορα και ήρεμα από τα λεωφορεία με τρεις βαλίτσες. Ο οδηγός μάς έστειλε στο WhatsApp πριν την απογείωση.',
      it: 'Pagato un acconto di 20€ online via Stripe e il saldo in contanti all’arrivo a Pafos. Molto più veloce e comodo degli autobus con tre valigie. L’autista ci ha scritto su WhatsApp prima del decollo.',
    },
  },
];

export const globalAirportFaqs: GlobalFaqItem[] = [
  {
    q: {
      en: 'Which routes and airports in Cyprus do you cover?',
      ru: 'Какие аэропорты и маршруты по Кипру вы обслуживаете?',
      de: 'Welche Flughäfen und Strecken auf Zypern bedienen Sie?',
      pl: 'Jakie lotniska i trasy na Cyprze obsługujecie?',
      fr: 'Quels aéroports et itinéraires à Chypre desservez-vous ?',
      el: 'Ποια αεροδρόμια και διαδρομές στην Κύπρο καλύπτετε;',
      it: 'Quali aeroporti e tratte a Cipro coprite?',
    },
    a: {
      en: 'Our fleet is based in Limassol and operates 24/7 private transfers across the island via Limassol: to/from Larnaca Airport (LCA) and Paphos Airport (PFO), as well as intercity rides connecting Limassol, Paphos, Coral Bay, Peyia, Polis, Larnaca, Nicosia, Ayia Napa, and Protaras.',
      ru: 'Наша база расположена в Лимассоле, откуда мы выполняем круглосуточные трансферы по острову через Лимассол: из/в аэропорты Ларнаки (LCA) и Пафоса (PFO), а также междугородние поездки между Лимассолом, Пафосом, Корал Бэй, Пейей, Полисом, Ларнакой, Никосией, Айя-Напой и Протарасом.',
      de: 'Unsere Flotte startet von unserer Basis in Limassol und fährt rund um die Uhr über Limassol zu den Flughäfen Larnaka (LCA) und Paphos (PFO) sowie zu Zielen wie Paphos, Coral Bay, Peyia, Polis, Larnaka, Nikosia, Ayia Napa und Protaras.',
      pl: 'Nasza baza znajduje się w Limassol, skąd realizujemy całodobowe prywatne transfery na lotniska Larnaka (LCA) i Pafos (PFO) oraz przejazdy międzymiastowe łączące Limassol, Pafos, Coral Bay, Peyię, Polis, Larnakę, Nikozję, Ayia Napę i Protaras.',
      fr: 'Notre flotte est basée à Limassol et assure des transferts privés 24/7 vers les aéroports de Larnaca (LCA) et Paphos (PFO), ainsi que des liaisons entre Limassol, Paphos, Coral Bay, Peyia, Polis, Larnaca, Nicosie, Ayia Napa et Protaras.',
      el: 'Η βάση μας βρίσκεται στη Λεμεσό και εκτελούμε 24ωρες ιδιωτικές μεταφορές μέσω Λεμεσού από/προς τα αεροδρόμια Λάρνακας (LCA) και Πάφου (PFO), καθώς και διαδρομές προς Πάφο, Coral Bay, Πέγεια, Πόλις, Λάρνακα, Λευκωσία, Αγία Νάπα και Πρωταρά.',
      it: 'La nostra flotta ha sede a Limassol ed effettua transfer privati 24/7 attraverso Limassol da/per gli aeroporti di Larnaca (LCA) e Pafos (PFO), oltre a collegamenti verso Pafos, Coral Bay, Peyia, Polis, Larnaca, Nicosia, Ayia Napa e Protaras.',
    },
  },
  {
    q: {
      en: 'Is the quoted transfer price really fixed?',
      ru: 'Цена поездки действительно фиксированная?',
      de: 'Ist der angezeigte Transferpreis wirklich ein Festpreis?',
      pl: 'Czy podana cena transferu jest naprawdę stała?',
      fr: 'Le tarif affiché est-il vraiment fixe et garanti ?',
      el: 'Είναι η αναγραφόμενη τιμή της μεταφοράς πραγματικά σταθερή;',
      it: 'La tariffa indicata nel calcolatore è davvero fissa?',
    },
    a: {
      en: 'Yes. The fare shown in our calculator is final per vehicle (up to 4 passengers and 3 suitcases). There are never extra charges for airport parking, highway traffic, or flight delays. Only rides scheduled between 23:00 and 07:00 include a transparent +€10 night tariff.',
      ru: 'Да. Стоимость в калькуляторе окончательная за весь автомобиль (до 4 пассажиров и 3 чемоданов). Нет никаких скрытых доплат за парковку в аэропорту, пробки или задержку рейса. Для поездок в ночное время (23:00–07:00) сразу отображается ночной тариф +€10.',
      de: 'Ja. Der im Rechner angezeigte Preis gilt fest pro Limousine (bis zu 4 Passagiere und 3 Koffer) ohne Zuschläge für Parken, Stau oder Flugverspätung. Nur Fahrten zwischen 23:00 und 07:00 Uhr beinhalten einen klaren Nachttarif von +10 €.',
      pl: 'Tak. Kwota w kalkulatorze jest ostateczna za cały samochód (do 4 pasażerów i 3 walizek) bez dopłat za parking, korki czy opóźnienie lotu. Jedynie przejazdy w nocy (23:00–07:00) mają przejrzystą dopłatę +10 €.',
      fr: 'Oui. Le tarif affiché s’applique par véhicule (jusqu’à 4 passagers et 3 valises), sans aucun supplément pour le parking, les embouteillages ou un retard de vol. Seuls les trajets entre 23h00 et 07h00 incluent un tarif nuit transparent de +10 €.',
      el: 'Ναι. Η τιμή στον υπολογιστή είναι τελική ανά όχημα (έως 4 επιβάτες και 3 βαλίτσες), χωρίς κρυφές χρεώσεις για πάρκινγκ, κίνηση ή καθυστέρηση πτήσης. Μόνο για διαδρομές 23:00–07:00 ισχύει διαφανές νυχτερινό τέλος +10€.',
      it: 'Sì. La tariffa mostrata è definitiva per veicolo (fino a 4 passeggeri e 3 valigie), senza extra per parcheggio, traffico o ritardi aerei. Solo le corse tra le 23:00 e le 07:00 prevedono un supplemento notturno trasparente di +10€.',
    },
  },
  {
    q: {
      en: 'Where will the driver meet me at Larnaca (LCA) or Paphos (PFO) Airport?',
      ru: 'Где именно водитель встретит меня в аэропорту Ларнаки (LCA) или Пафоса (PFO)?',
      de: 'Wo erwartet mich der Fahrer am Flughafen Larnaka (LCA) oder Paphos (PFO)?',
      pl: 'Gdzie dokładnie kierowca spotka się ze mną na lotnisku Larnaka (LCA) lub Pafos (PFO)?',
      fr: 'Où le chauffeur m’attendra-t-il à l’aéroport de Larnaca (LCA) ou Paphos (PFO) ?',
      el: 'Πού ακριβώς θα με συναντήσει ο οδηγός στο αεροδρόμιο Λάρνακας (LCA) ή Πάφου (PFO);',
      it: 'Dove mi incontrerà l’autista all’aeroporto di Larnaca (LCA) o Pafos (PFO)?',
    },
    a: {
      en: 'After collecting your luggage and passing customs, walk into the main Arrivals Hall. Your driver will be waiting right at the exit holding a sign with your full name and will also message you on WhatsApp or Telegram.',
      ru: 'После получения багажа и выхода в общий зал прилёта ваш водитель будет ждать вас у центрального выхода с именной табличкой и заранее напишет в WhatsApp или Telegram.',
      de: 'Nach der Gepäckausgabe und dem Zoll gehen Sie in die Ankunftshalle. Ihr Fahrer wartet direkt am Ausgang mit einem Namensschild auf Sie und kontaktiert Sie vorab per WhatsApp oder Telegram.',
      pl: 'Po odebraniu bagażu i przejściu kontroli wyjdź do głównej hali przylotów. Kierowca będzie czekał tuż przy wyjściu z tabliczką z Twoim nazwiskiem i napisze wcześniej na WhatsApp lub Telegram.',
      fr: 'Après avoir récupéré vos bagages, rejoignez le hall principal des arrivées. Votre chauffeur vous attendra à la sortie avec une pancarte à votre nom et vous écrira au préalable sur WhatsApp ou Telegram.',
      el: 'Αφού παραλάβετε τις αποσκευές σας, βγείτε στην κεντρική αίθουσα αφίξεων. Ο οδηγός θα σας περιμένει ακριβώς στην έξοδο με ταμπέλα με το όνομά σας και θα επικοινωνήσει μαζί σας μέσω WhatsApp ή Telegram.',
      it: 'Dopo aver ritirato i bagagli, entra nella sala principale degli arrivi. Il tuo autista ti aspetterà proprio all’uscita con un cartello nominativo e ti contatterà in anticipo su WhatsApp o Telegram.',
    },
  },
  {
    q: {
      en: 'What happens if my flight arrives late?',
      ru: 'Что делать, если мой самолёт задерживается?',
      de: 'Was passiert, wenn mein Flug Verspätung hat?',
      pl: 'Co się stanie, jeśli mój lot się opóźni?',
      fr: 'Que se passe-t-il si mon vol a du retard ?',
      el: 'Τι συμβαίνει αν η πτήση μου έχει καθυστέρηση;',
      it: 'Cosa succede se il mio volo è in ritardo?',
    },
    a: {
      en: 'Include your flight number during checkout and we monitor your arrival in real time. If your plane is delayed, we automatically shift your pickup time and wait for you free of charge.',
      ru: 'Укажите номер рейса при оформлении заказа — мы отслеживаем посадку в реальном времени. При задержке самолёта время подачи машины сдвигается автоматически и без доплат за ожидание.',
      de: 'Geben Sie bei der Buchung einfach Ihre Flugnummer an – wir überwachen die Ankunft in Echtzeit. Bei Verspätung wird die Abholzeit automatisch und kostenlos angepasst.',
      pl: 'Podaj numer lotu podczas rezerwacji, a będziemy śledzić przylot na żywo. W razie opóźnienia godzina odbioru przesuwa się automatycznie i bez żadnych dopłat za oczekiwanie.',
      fr: 'Indiquez votre numéro de vol lors de la réservation et nous suivons votre atterrissage en direct. En cas de retard, la prise en charge est ajustée automatiquement et sans frais supplémentaires.',
      el: 'Συμπληρώστε τον αριθμό πτήσης κατά την κράτηση και παρακολουθούμε την άφιξη σε πραγματικό χρόνο. Σε περίπτωση καθυστέρησης, η ώρα παραλαβής προσαρμόζεται αυτόματα χωρίς καμία χρέωση αναμονής.',
      it: 'Inserisci il numero di volo durante la prenotazione: monitoriamo l’arrivo in tempo reale. In caso di ritardo, l’orario di ritiro viene aggiornato automaticamente senza costi di attesa.',
    },
  },
  {
    q: {
      en: 'How do I get the 10% round-trip discount and can I pay a €20 deposit?',
      ru: 'Как получить скидку 10% на обратный путь и можно ли оплатить только депозит?',
      de: 'Wie erhalte ich 10 % Hin- und Rückfahrtrabatt und kann ich 20 € anzahlen?',
      pl: 'Jak uzyskać 10% zniżki na powrót i czy mogę wpłacić 20 € zaliczki?',
      fr: 'Comment obtenir les 10 % de remise aller-retour et puis-je verser 20 € d’acompte ?',
      el: 'Πώς παίρνω έκπτωση 10% μετ’ επιστροφής και μπορώ να πληρώσω 20€ προκαταβολή;',
      it: 'Come ottengo lo sconto del 10% A/R e posso pagare solo 20€ di acconto?',
    },
    a: {
      en: 'Select "Round trip" in the booking calculator to apply an automatic 10% discount on your return leg. At checkout via Stripe, you can choose to pay either the full fare online or a €20 deposit now with the remainder paid in cash to your driver.',
      ru: 'Переключите калькулятор в режим «Туда и обратно» — скидка 10% применится автоматически. При оплате через Stripe можно оплатить всю сумму сразу или внести депозит €20 онлайн, а остаток передать водителю наличными.',
      de: 'Wählen Sie im Rechner „Hin & Zurück“, um automatisch 10 % Rabatt auf die Rückfahrt zu erhalten. An der Kasse über Stripe zahlen Sie wahlweise den Gesamtbetrag oder nur 20 € Anzahlung online und den Rest bar beim Fahrer.',
      pl: 'Wybierz opcję „W obie strony” w kalkulatorze, aby automatycznie naliczyć 10% zniżki na powrót. W Stripe możesz zapłacić całą kwotę od razu lub wpłacić 20 € zaliczki online, a resztę gotówką kierowcy.',
      fr: 'Sélectionnez « Aller-retour » dans le calculateur pour appliquer automatiquement 10 % de remise au retour. Lors du paiement Stripe, choisissez de régler la totalité en ligne ou un acompte de 20 € et le solde en espèces au chauffeur.',
      el: 'Επιλέξτε «Μετ’ επιστροφής» στον υπολογιστή για αυτόματη έκπτωση 10% στην επιστροφή. Στο ταμείο Stripe μπορείτε να εξοφλήσετε όλο το ποσό ή να δώσετε προκαταβολή 20€ online και το υπόλοιπο μετρητά στον οδηγό.',
      it: 'Seleziona "Andata e ritorno" nel calcolatore per applicare automaticamente il 10% di sconto sul rientro. Al checkout Stripe puoi saldare subito l’intero importo o versare 20€ di acconto online e il resto in contanti all’autista.',
    },
  },
  {
    q: {
      en: 'Do you provide child car seats and boosters?',
      ru: 'Предоставляете ли вы детские автокресла и бустеры?',
      de: 'Stellen Sie Kindersitze und Sitzerhöhungen bereit?',
      pl: 'Czy zapewniacie foteliki dziecięce i podstawki?',
      fr: 'Fournissez-vous des sièges auto et rehausseurs pour enfants ?',
      el: 'Παρέχετε παιδικά καθίσματα αυτοκινήτου και ανυψωτικά;',
      it: 'Fornite seggiolini auto per bambini e rialzi?',
    },
    a: {
      en: 'Yes. Mention the number of children and their ages in the booking comment field so we prepare the appropriate baby seat or booster before pickup.',
      ru: 'Да. Укажите количество детей и их возраст в комментарии при оформлении бронирования, чтобы мы заранее установили подходящее автокресло или бустер.',
      de: 'Ja. Geben Sie einfach die Anzahl und das Alter der Kinder im Kommentarfeld bei der Buchung an, damit wir den passenden Kindersitz vorbereiten.',
      pl: 'Tak. Wpisz liczbę dzieci i ich wiek w polu uwag podczas rezerwacji, abyśmy zamontowali odpowiedni fotelik lub podstawkę przed odbiorem.',
      fr: 'Oui. Indiquez le nombre d’enfants et leur âge dans le champ commentaire lors de la réservation afin que nous installions le siège adapté avant votre arrivée.',
      el: 'Ναι. Αναφέρετε τον αριθμό και την ηλικία των παιδιών στα σχόλια της κράτησης ώστε να ετοιμάσουμε το κατάλληλο κάθισμα πριν την παραλαβή.',
      it: 'Sì. Indica il numero e l’età dei bambini nelle note della prenotazione in modo da preparare il seggiolino o rialzo adatto prima del ritiro.',
    },
  },
];
