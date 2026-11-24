import { Language } from '../lib/routing';
import type { RouteFaqItem } from './routes';

export interface RouteEnrichmentLocalized {
  overviewHeading: string;
  overviewParagraphs: string[];
  dropOffHeading: string;
  dropOffAreas: string[];
  tipsHeading: string;
  tips: string[];
  extraFaqs: RouteFaqItem[];
}

type MultiLangRouteEnrichment = Record<Language, RouteEnrichmentLocalized>;

const ROUTE_ENRICHMENT: Record<string, MultiLangRouteEnrichment> = {
  'larnaca-airport-to-limassol': {
    en: {
      overviewHeading: 'Larnaca Airport (LCA) to Limassol: Highway Route & Local Context',
      overviewParagraphs: [
        'Leaving Larnaca International Airport (LCA), your chauffeur bypasses Larnaca Salt Lake via the A3 link and joins the A5 and A1 motorways westbound through Kofinou directly into Limassol. Because our dispatch base operates out of Agios Athanasios in Limassol, we position vehicles ahead of your scheduled touchdown and adjust automatically for early or delayed flights.',
        'While the Kapnos Airport Shuttle drops passengers at the Agios Georgios Havouzas station outside the beachfront zone—requiring a second local taxi with luggage—a pre-booked private sedan takes you curb-to-curb to your hotel lobby, Limassol Marina berth, or residential gate for a fixed €75.',
      ],
      dropOffHeading: 'Key Drop-Off Zones in Limassol',
      dropOffAreas: [
        'Limassol Marina & Old Town',
        'Germasogeia Tourist Area',
        'Agios Tychonas Beachfront Resorts',
        'Agios Athanasios & Mesa Geitonia',
        'Zakaki & City of Dreams Resort',
      ],
      tipsHeading: 'Practical Tips for LCA Arrivals',
      tips: [
        'Exit baggage claim through the glass sliding doors straight into the main Arrivals Hall, where your driver holds a clearly printed name board.',
        'Late landings between 23:00 and 07:00 carry a flat +€10 night supplement instead of metered Tariff 2 surges.',
        'Book both legs together for an automatic 10% return discount (€135 total round trip by day) or travel with 5+ guests by messaging us on WhatsApp first.',
      ],
      extraFaqs: [
        {
          q: 'Why choose a private sedan over the Kapnos shuttle from LCA to Limassol?',
          a: 'Kapnos stops only at fixed roadside hubs and stops running overnight, whereas our €75 private sedan drops up to 4 passengers and 3 suitcases directly at your Limassol address 24/7.',
        },
        {
          q: 'Where in Limassol is covered by the fixed €75 rate?',
          a: 'The €75 rate covers all Limassol districts including Limassol Marina, Germasogeia, Agios Tychonas, Old Town, Agios Athanasios, and Zakaki with zero zone surcharges.',
        },
      ],
    },
    ru: {
      overviewHeading: 'Аэропорт Ларнака (LCA) — Лимассол: маршрут и нюансы поездки',
      overviewParagraphs: [
        'Сразу после выезда из аэропорта Ларнаки (LCA) автомобиль проходит вдоль Солёного озера по развязке A3 и выходит на скоростную трассу A5, переходящую у Кофину в магистраль A1 до самого Лимассола. Поскольку наш автопарк базируется в Агиос Афанасиос в Лимассоле, диспетчеры заранее отслеживают ваш рейс и подают машину точно к посадке.',
        'Автобусы Kapnos высаживают пассажиров только на станции Havouzas у выезда на трассу, откуда с чемоданами всё равно приходится брать городское такси. Индивидуальный седан за фиксированные €75 доставляет вас прямо к стойке отеля, марине Лимассола или шлагбауму апартаментов без пересадок.',
      ],
      dropOffHeading: 'Основные районы высадки в Лимассоле',
      dropOffAreas: [
        'Limassol Marina и Старый город',
        'Туристическая зона Гермасойя',
        'Отели побережья Агиос Тихонас',
        'Агиос Афанасиос и Меса Гитония',
        'Закаки и курорт City of Dreams',
      ],
      tipsHeading: 'Полезные советы по прилёту в LCA',
      tips: [
        'После ленты выдачи багажа выходите через центральные стеклянные двери в общий зал прилёта — водитель ждёт с именной табличкой.',
        'При посадке с 23:00 до 07:00 добавляется только фиксированный ночной тариф +€10, без счётчика.',
        'При бронировании пути туда-обратно сразу срабатывает скидка 10% на обратную дорогу (€135 за обе поездки днём), а для компаний 5+ человек напишите в WhatsApp.',
      ],
      extraFaqs: [
        {
          q: 'Чем индивидуальный трансфер удобнее шаттла Kapnos из Ларнаки в Лимассол?',
          a: 'Шаттл привозит лишь на автостанцию на объездной и не ходит глубокой ночью, а наш седан за €75 везёт до 4 человек и 3 чемоданов круглосуточно прямо до адреса в Лимассоле.',
        },
        {
          q: 'Все ли районы Лимассола входят в базовый тариф €75?',
          a: 'Да: Лимассол Марина, Старый порт, Гермасойя, Агиос Тихонас, Агиос Афанасиос и Закаки обслуживаются без доплат за район.',
        },
      ],
    },
    de: {
      overviewHeading: 'Flughafen Larnaka (LCA) nach Limassol: Strecke & Ankunftshinweise',
      overviewParagraphs: [
        'Vom Flughafen Larnaka (LCA) führt die Fahrt vorbei am Salzsee über die A3 auf die Autobahnen A5 und A1 über Kofinou direkt nach Limassol. Da sich unser Stützpunkt in Agios Athanasios in Limassol befindet, verfolgen wir Ihren Flug live und halten die Limousine unabhängig von Verspätungen bereit.',
        'Der Kapnos-Flughafenshuttle hält nur am Rand der Stadt an der Station Havouzas, sodass Urlauber mit Koffern ein zweites Taxi benötigen. Unsere private Fahrt zum Festpreis von €75 bringt Sie direkt vor Ihr Hotel, zur Limassol Marina oder zu Ihrer Ferienwohnung.',
      ],
      dropOffHeading: 'Wichtige Zielgebiete in Limassol',
      dropOffAreas: [
        'Limassol Marina & Altstadt',
        'Touristenviertel Germasogeia',
        'Küstenhotels in Agios Tychonas',
        'Agios Athanasios & Mesa Geitonia',
        'Zakaki & City of Dreams Resort',
      ],
      tipsHeading: 'Praktische Tipps für die Ankunft am LCA',
      tips: [
        'Nach der Gepäckausgabe gehen Sie durch die Ausgangstüren in die zentrale Ankunftshalle; dort erwartet Sie Ihr Fahrer mit Namensschild.',
        'Bei Ankünften zwischen 23:00 und 07:00 Uhr gilt lediglich eine pauschale Nachtgebühr von +€10 statt steigender Taxameter-Preise.',
        'Buchen Sie Hin- und Rückfahrt gemeinsam für automatisch 10 % Rabatt auf die Rückfahrt (€135 gesamt tagsüber) oder schreiben Sie uns bei 5+ Personen per WhatsApp.',
      ],
      extraFaqs: [
        {
          q: 'Warum ist ein Privattransfer praktischer als der Kapnos-Bus nach Limassol?',
          a: 'Der Bus endet an einer Außenstation und pausiert nachts, während unsere Limousine für fest €75 rund um die Uhr bis zu 4 Gäste mit 3 Koffern bis vor die Haustür fährt.',
        },
        {
          q: 'Gilt der Festpreis von €75 für jedes Hotel in Limassol?',
          a: 'Ja, alle Viertel inklusive Limassol Marina, Germasogeia, Agios Tychonas, Altstadt und Zakaki sind im €75-Tarif enthalten.',
        },
      ],
    },
    pl: {
      overviewHeading: 'Lotnisko Larnaka (LCA) – Limassol: trasa i wskazówki na przylot',
      overviewParagraphs: [
        'Po wyjeździe z lotniska w Larnace (LCA) kierowca mija Słone Jezioro trasą A3 i wjeżdża na autostrady A5 oraz A1 przez Kofinou prosto do Limassol. Ponieważ nasza baza mieści się w Agios Athanasios w Limassol, na bieżąco monitorujemy Twój lot i dopasowujemy odbiór do faktycznego lądowania.',
        'Autobus Kapnos zatrzymuje się wyłącznie przy stacji Havouzas na obrzeżach miasta, co oznacza przesiadkę z bagażem do lokalnej taksówki. Prywatny sedan za stałe €75 dowozi Cię bezpośrednio pod hotel, marinę lub apartament w całym Limassol.',
      ],
      dropOffHeading: 'Popularne dzielnice docelowe w Limassol',
      dropOffAreas: [
        'Limassol Marina i Stare Miasto',
        'Dzielnica turystyczna Germasogeia',
        'Kurorty nadmorskie Agios Tychonas',
        'Agios Athanasios i Mesa Geitonia',
        'Zakaki i resort City of Dreams',
      ],
      tipsHeading: 'Praktyczne porady po przylocie na LCA',
      tips: [
        'Po odebraniu bagażu przejdź przez szklane drzwi do głównej hali przylotów, gdzie kierowca czeka z tabliczką imienną.',
        'Dla przylotów w godzinach 23:00–07:00 obowiązuje wyłącznie stała dopłata nocna +€10 bez naliczania taryf kilometrowych.',
        'Zamów przejazd w obie strony, aby od razu zyskać 10% zniżki na powrót (€135 w dzień za komplet), a dla grupy 5+ osób napisz na WhatsApp.',
      ],
      extraFaqs: [
        {
          q: 'Czym prywatny transfer z LCA do Limassol różni się od autobusu Kapnos?',
          a: 'Autobus dowozi tylko do punktu na obrzeżach i nie kursuje późną nocą, a nasz prywatny sedan za €75 zabiera do 4 pasażerów i 3 walizki pod sam adres o dowolnej porze.',
        },
        {
          q: 'Czy cena €75 obejmuje wszystkie hotele w Limassol?',
          a: 'Tak, stawka €75 obejmuje bez dopłat Limassol Marina, Germasogeię, Agios Tychonas, centrum i Zakaki.',
        },
      ],
    },
    fr: {
      overviewHeading: "Aéroport de Larnaca (LCA) à Limassol : itinéraire et repères locaux",
      overviewParagraphs: [
        "En quittant l'aéroport international de Larnaca (LCA), votre chauffeur contourne le lac salé via l'A3 puis emprunte les autoroutes A5 et A1 via Kofinou jusqu'à Limassol. Comme notre flotte opère depuis Agios Athanasios à Limassol, votre vol est suivi en direct pour ajuster la prise en charge à l'atterrissage réel.",
        "Alors que la navette Kapnos dépose ses passagers à l'arrêt périphérique Havouzas — obligeant à reprendre un taxi avec les valises — notre berline privée à 75 € fixes vous dépose directement devant votre hôtel, la Marina de Limassol ou votre résidence.",
      ],
      dropOffHeading: 'Principales zones desservies à Limassol',
      dropOffAreas: [
        'Limassol Marina et Vieille Ville',
        'Zone touristique de Germasogeia',
        "Hôtels côtiers d'Agios Tychonas",
        'Agios Athanasios et Mesa Geitonia',
        'Zakaki et City of Dreams Resort',
      ],
      tipsHeading: "Conseils pratiques à l'arrivée à LCA",
      tips: [
        "Après le retrait des bagages, traversez les portes vitrées vers le hall principal des arrivées : votre chauffeur vous y attend avec un panneau nominatif.",
        'Les arrivées de nuit entre 23h00 et 07h00 ajoutent uniquement un forfait fixe de +10 € sans majoration au compteur.',
        "Réservez l'aller-retour ensemble pour profiter de −10 % sur le retour (135 € au total en journée), ou contactez-nous sur WhatsApp pour 5 passagers et plus.",
      ],
      extraFaqs: [
        {
          q: 'Pourquoi préférer un transfert privé à la navette Kapnos vers Limassol ?',
          a: "La navette Kapnos s'arrête en périphérie et ne circule pas tard la nuit, tandis que notre berline à 75 € vous dépose porte-à-porte 24h/24 (jusqu'à 4 passagers et 3 valises).",
        },
        {
          q: 'Tous les quartiers de Limassol sont-ils inclus dans le tarif de 75 € ?',
          a: "Oui, Limassol Marina, Germasogeia, Agios Tychonas, le centre historique et Zakaki sont inclus sans supplément de zone.",
        },
      ],
    },
    el: {
      overviewHeading: 'Αεροδρόμιο Λάρνακας (LCA) – Λεμεσός: Διαδρομή & τοπικές λεπτομέρειες',
      overviewParagraphs: [
        'Βγαίνοντας από το αεροδρόμιο Λάρνακας (LCA), ο οδηγός ακολουθεί τον περιφερειακό A3 γύρω από την Αλυκή και μπαίνει στους αυτοκινητόδρομους A5 και A1 μέσω Κοφίνου κατευθείαν για Λεμεσό. Με τη βάση μας στον Άγιο Αθανάσιο Λεμεσού, παρακολουθούμε την πτήση σας ζωντανά ώστε το όχημα να σας περιμένει εγκαίρως.',
        'Το λεωφορείο Kapnos σταματά μόνο στον κόμβο Αγίου Γεωργίου Χαβούζας εκτός παραλιακού μετώπου, απαιτώντας δεύτερο ταξί με αποσκευές. Το ιδιωτικό μας sedan με σταθερή τιμή €75 σάς μεταφέρει απευθείας στην είσοδο του ξενοδοχείου, στη Μαρίνα Λεμεσού ή στο διαμέρισμά σας.',
      ],
      dropOffHeading: 'Κύριες περιοχές παράδοσης στη Λεμεσό',
      dropOffAreas: [
        'Μαρίνα Λεμεσού & Παλιά Πόλη',
        'Τουριστική περιοχή Γερμασόγειας',
        'Παραλιακά ξενοδοχεία Αγίου Τύχωνα',
        'Άγιος Αθανάσιος & Μέσα Γειτονιά',
        'Ζακάκι & City of Dreams Resort',
      ],
      tipsHeading: 'Χρήσιμες συμβουλές για αφίξεις στο LCA',
      tips: [
        'Μετά την παραλαβή αποσκευών, περάστε στην κεντρική αίθουσα αφίξεων όπου σας περιμένει ο οδηγός με ταμπέλα ονόματος.',
        'Για αφίξεις μεταξύ 23:00 και 07:00 ισχύει μόνο ενιαίο νυχτερινό τέλος +€10, χωρίς χρέωση ταξίμετρου.',
        'Κλείστε μετ’ επιστροφής για αυτόματη έκπτωση 10% στην επιστροφή (€135 σύνολο την ημέρα) ή στείλτε μας στο WhatsApp για παρέες 5+ ατόμων.',
      ],
      extraFaqs: [
        {
          q: 'Γιατί να επιλέξω ιδιωτικό μεταφορικό μέσο αντί του Kapnos προς Λεμεσό;',
          a: 'Το Kapnos σταματά σε περιφερειακό σταθμό και δεν έχει μεταμεσονύκτια δρομολόγια, ενώ με €75 σάς παραδίδουμε 24/7 στην πόρτα σας (έως 4 άτομα & 3 βαλίτσες).',
        },
        {
          q: 'Καλύπτονται όλες οι συνοικίες της Λεμεσού με τα €75;',
          a: 'Ναι, η τιμή €75 καλύπτει Μαρίνα Λεμεσού, Γερμασόγεια, Άγιο Τύχωνα, Παλιά Πόλη, Άγιο Αθανάσιο και Ζακάκι χωρίς έξτρα χρέωση ζώνης.',
        },
      ],
    },
    it: {
      overviewHeading: 'Aeroporto di Larnaca (LCA) – Limassol: percorso e dettagli locali',
      overviewParagraphs: [
        "Uscendo dall'aeroporto internazionale di Larnaca (LCA), l'autista costeggia il Lago Salato lungo la A3 e imbocca le autostrade A5 e A1 via Kofinou direttamente fino a Limassol. Con la nostra sede operativa ad Agios Athanasios (Limassol), monitoriamo il volo in tempo reale garantendo l'attesa anche in caso di ritardo.",
        "Mentre la navetta Kapnos ferma solo all'hub periferico di Havouzas obbligando a prendere un secondo taxi con le valigie, la nostra berlina privata a €75 fissi ti accompagna porta a porta davanti al tuo hotel, a Limassol Marina o al tuo appartamento.",
      ],
      dropOffHeading: 'Principali zone di arrivo a Limassol',
      dropOffAreas: [
        'Limassol Marina e Città Vecchia',
        'Area turistica di Germasogeia',
        'Resort sul lungomare di Agios Tychonas',
        'Agios Athanasios e Mesa Geitonia',
        'Zakaki e City of Dreams Resort',
      ],
      tipsHeading: "Consigli pratici per gli arrivi a LCA",
      tips: [
        'Ritirati i bagagli, esci nella sala arrivi principale dove il nostro autista attende con un cartello con il tuo nome.',
        'Per atterraggi tra le 23:00 e le 07:00 si applica solo un supplemento fisso notturno di +€10, senza scatti del tassametro.',
        'Prenota andata e ritorno insieme per ottenere subito il 10% di sconto sul rientro (€135 totali di giorno) o scrivici su WhatsApp per gruppi di 5+ persone.',
      ],
      extraFaqs: [
        {
          q: 'Perché conviene il transfer privato rispetto allo shuttle Kapnos per Limassol?',
          a: 'Kapnos ferma in periferia e sospende le corse notturne, mentre la nostra berlina a €75 porta fino a 4 passeggeri e 3 valigie direttamente a destinazione 24/7.',
        },
        {
          q: 'La tariffa fissa di €75 copre tutta Limassol?',
          a: 'Sì, include senza supplementi Limassol Marina, Germasogeia, Agios Tychonas, il centro storico, Agios Athanasios e Zakaki.',
        },
      ],
    },
  },

  'paphos-airport-to-limassol': {
    en: {
      overviewHeading: 'Paphos Airport (PFO) to Limassol: Quick Coastal Drive Along A6',
      overviewParagraphs: [
        'Paphos Airport (PFO) sits southeast of Paphos city, making the trip east to Limassol surprisingly fast: a short feeder road via the B6 connects straight onto the A6 coastal motorway past Petra tou Romiou (Aphrodite’s Rock) and Kourion, reaching Limassol in roughly 45 minutes.',
        'Because PFO operates a compact single terminal and public intercity airport buses run on a sparse timetable—with no overnight connections—many travelers choose a pre-booked sedan (€75 fixed) for immediate departure once bags come off the belt.',
      ],
      dropOffHeading: 'Popular Drop-Off Destinations in Limassol',
      dropOffAreas: [
        'Zakaki & City of Dreams Mediterranean',
        'Limassol Marina & Old Port',
        'Molos Promenade & Neapolis',
        'Germasogeia & Potamos tis Germasogeias',
        'Agios Tychonas, Four Seasons & Amara Strip',
      ],
      tipsHeading: 'Smooth Arrival Tips at PFO Terminal',
      tips: [
        'Customs and baggage reclaim at Paphos are compact; your driver meets you right outside the single Arrivals exit with your name sign.',
        'Evening flights landing after 21:00 often miss the last public bus to Limassol; our drivers operate 24/7 with a flat +€10 night fee from 23:00 to 07:00.',
        'Need child seats or two cars for 5+ travelers? Add seat notes in checkout or contact us on WhatsApp before departure.',
      ],
      extraFaqs: [
        {
          q: 'Are there late-night buses from Paphos Airport to Limassol?',
          a: 'No, regular intercity shuttle services stop in the evening. Pre-booking a €75 private transfer guarantees 24/7 pickup directly from PFO Arrivals (+€10 between 23:00 and 07:00).',
        },
        {
          q: 'Does the driver take the scenic motorway past Aphrodite’s Rock?',
          a: 'Yes, the direct 63 km route follows the A6 highway past Petra tou Romiou and Kourion straight into western Limassol and the coastal hotel strip.',
        },
      ],
    },
    ru: {
      overviewHeading: 'Аэропорт Пафос (PFO) — Лимассол: быстрый маршрут по трассе A6',
      overviewParagraphs: [
        'Аэропорт Пафоса (PFO) расположен к юго-востоку от города, благодаря чему дорога в сторону Лимассола занимает всего около 45 минут (63 км). По трассе B6 автомобиль сразу выезжает на прибрежную магистраль A6 мимо скалы Афродиты (Петра ту Ромиу) и древнего Куриона прямо к западному въезду в Лимассол.',
        'В PFO компактный одноэтажный терминал, но расписание междугородних автобусов в Лимассол очень редкое и полностью прерывается к ночи. Индивидуальный седан за фиксированные €75 позволяет уехать к отелю без ожидания и пересадок в любое время суток.',
      ],
      dropOffHeading: 'Куда мы привозим пассажиров в Лимассоле',
      dropOffAreas: [
        'Закаки и курорт City of Dreams Mediterranean',
        'Лимассол Марина и Старый порт',
        'Набережная Молос и Неаполис',
        'Гермасойя и Потамос Гермасояс',
        'Агиос Тихонас (Four Seasons, Amara)',
      ],
      tipsHeading: 'Практические советы для прилетающих в Пафос',
      tips: [
        'Проход паспортного контроля и выдача багажа в PFO занимают немного времени — сразу за выходом в зал прилёта вас встретит водитель с табличкой.',
        'После 21:00 уехать в Лимассол на общественном автобусе проблематично; наши трансферы работают 24/7 (доплата +€10 действует только с 23:00 до 07:00).',
        'Укажите потребность в детском кресле при бронировании, а для компаний от 5 пассажиров напишите в WhatsApp.',
      ],
      extraFaqs: [
        {
          q: 'Ходят ли ночные автобусы из аэропорта Пафос в Лимассол?',
          a: 'Нет, общественный транспорт прекращает рейсы вечером. Предварительный трансфер за €75 (+€10 с 23:00 до 07:00) гарантирует подачу автомобиля к любому ночному рейсу.',
        },
        {
          q: 'Через какие места проходит дорога из PFO в Лимассол?',
          a: 'Прямой 63-километровый маршрут идёт по скоростной прибрежной трассе A6 мимо Петра ту Ромиу (скалы Афродиты) и района Курион без заезда в центр Пафоса.',
        },
      ],
    },
    de: {
      overviewHeading: 'Flughafen Paphos (PFO) nach Limassol: Direkte Küstenautobahn A6',
      overviewParagraphs: [
        'Der Flughafen Paphos (PFO) liegt südöstlich der Stadt Richtung Limassol — ideal für eine kurze Anreise von ca. 45 Minuten (63 km). Über die Zufahrt B6 geht es direkt auf die Küstenautobahn A6 vorbei an Petra tou Romiou (Felsen der Aphrodite) und Kourion in den Westen Limassols.',
        'Da das kompakte Terminal in Paphos abends kaum noch an den Linienbusverkehr angebunden ist, bietet unser Festpreis-Transfer für €75 pro Limousine eine zuverlässige Tür-zu-Tür-Lösung direkt nach der Gepäckausgabe.',
      ],
      dropOffHeading: 'Wichtige Zielgebiete in Limassol',
      dropOffAreas: [
        'Zakaki & City of Dreams Mediterranean',
        'Limassol Marina & Alter Hafen',
        'Promenade Molos & Neapolis',
        'Germasogeia & Strandhotels',
        'Agios Tychonas (Four Seasons / Amara)',
      ],
      tipsHeading: 'Tipps für Ihre Ankunft am Flughafen Paphos (PFO)',
      tips: [
        'Am übersichtlichen Terminal in Paphos erreichen Sie nach dem Gepäckband sofort die Ausgangshalle, wo Ihr Chauffeur mit Namensschild wartet.',
        'Bei späten Ankünften fahren keine Überlandbusse mehr nach Limassol; wir fahren rund um die Uhr (+€10 Nachttarif zwischen 23:00 und 07:00 Uhr).',
        'Kindersitze können bei der Buchung angegeben werden; Gruppen ab 5 Personen erhalten auf Wunsch per WhatsApp ein Angebot.',
      ],
      extraFaqs: [
        {
          q: 'Gibt es nachts Busse vom Flughafen Paphos nach Limassol?',
          a: 'Nein, die Shuttlebusse fahren abends nicht mehr. Unser privater Transfer für €75 (+€10 zwischen 23:00 und 07:00 Uhr) bedient alle Ankünfte rund um die Uhr.',
        },
        {
          q: 'Fährt das Fahrzeug direkt über die A6 nach Limassol?',
          a: 'Ja, die 63 km lange Direktroute folgt der B6 und der Autobahn A6 vorbei am Felsen der Aphrodite (Petra tou Romiou) direkt nach Limassol.',
        },
      ],
    },
    pl: {
      overviewHeading: 'Lotnisko Pafos (PFO) – Limassol: szybka trasa nadmorska A6',
      overviewParagraphs: [
        'Lotnisko w Pafos (PFO) leży na południowy wschód od miasta, dzięki czemu dojazd do Limassol jest wyjątkowo sprawny i trwa około 45 minut (63 km). Kierowca wyjeżdża drogą B6 na autostradę A6, mijając Skałę Afrodyty (Petra tou Romiou) oraz Kourion.',
        'Ze względu na mały, wygodny terminal w Pafos odprawa idzie szybko, jednak autobusy do Limassol nie kursują późnym wieczorem ani w nocy. Prywatny sedan za €75 gwarantuje natychmiastowy odbiór i bezpośredni podjazd pod hotel lub apartament.',
      ],
      dropOffHeading: 'Główne strefy dowozu w Limassol',
      dropOffAreas: [
        'Zakaki i City of Dreams Mediterranean',
        'Limassol Marina i Stary Port',
        'Promenada Molos i Neapolis',
        'Germasogeia i hotele przy plaży',
        'Agios Tychonas (strefa Four Seasons / Amara)',
      ],
      tipsHeading: 'Wskazówki po przylocie na lotnisko PFO',
      tips: [
        'Po wyjściu ze strefy odbioru bagażu od razu trafisz do hali przylotów, gdzie czeka kierowca z tabliczką imienną.',
        'Wieczorne loty często lądują już po ostatnim autobusie do Limassol; u nas między 23:00 a 07:00 obowiązuje tylko stała dopłata +€10.',
        'Foteliki dziecięce zamówisz w formularzu rezerwacji, a dla 5+ pasażerów napisz wcześniej na WhatsApp.',
      ],
      extraFaqs: [
        {
          q: 'Czy w nocy kursują autobusy z lotniska Pafos do Limassol?',
          a: 'Nie, połączenia autobusowe kończą się wieczorem. Prywatny transfer za €75 (+€10 w godzinach 23:00–07:00) realizujemy całodobowo pod każdy lot.',
        },
        {
          q: 'Którędy prowadzi trasa z lotniska PFO do Limassol?',
          a: 'Przejazd 63 km odbywa się bezpośrednio przez B6 i autostradę A6 w pobliżu Petra tou Romiou prosto do dzielnic nadmorskich Limassol.',
        },
      ],
    },
    fr: {
      overviewHeading: "Aéroport de Paphos (PFO) vers Limassol : trajet rapide par la côte A6",
      overviewParagraphs: [
        "L'aéroport de Paphos (PFO) se situe au sud-est de la ville en direction de Limassol, ce qui ramène la durée du trajet à environ 45 minutes (63 km). Votre chauffeur rejoint rapidement l'autoroute côtière A6 par la B6 en longeant Petra tou Romiou (le rocher d'Aphrodite) et Kourion.",
        "Le terminal unique de PFO permet de sortir rapidement après les bagages, mais les navettes publiques vers Limassol s'arrêtent en soirée. Notre berline privée au tarif fixe de 75 € vous assure un départ immédiat vers votre hébergement à toute heure.",
      ],
      dropOffHeading: 'Zones les plus demandées à Limassol',
      dropOffAreas: [
        'Zakaki & City of Dreams Mediterranean',
        'Limassol Marina et Vieux-Port',
        'Promenade de Molos et Neapolis',
        'Germasogeia (zone hôtelière)',
        'Agios Tychonas (secteur Four Seasons / Amara)',
      ],
      tipsHeading: "Conseils pratiques à l'arrivée à PFO",
      tips: [
        "À la sortie de la salle des bagages de Paphos, votre chauffeur vous attend directement dans l'unique hall des arrivées avec votre nom.",
        'Pas de bus de nuit vers Limassol : notre service roule 24h/24 avec un seul supplément fixe de +10 € entre 23h00 et 07h00.',
        'Indiquez vos besoins de sièges enfants lors de la réservation, ou contactez-nous via WhatsApp pour les groupes de 5 voyageurs et plus.',
      ],
      extraFaqs: [
        {
          q: "Existe-t-il des bus de nuit de l'aéroport de Paphos vers Limassol ?",
          a: "Non, les bus interurbains cessent de circuler le soir. Réserver votre berline à 75 € (+10 € de 23h00 à 07h00) garantit une prise en charge 24/7.",
        },
        {
          q: 'Quel itinéraire est suivi entre PFO et Limassol ?',
          a: "Le trajet direct de 63 km emprunte la B6 puis l'autoroute A6 près du rocher d'Aphrodite (Petra tou Romiou) directement vers Limassol.",
        },
      ],
    },
    el: {
      overviewHeading: 'Αεροδρόμιο Πάφου (PFO) – Λεμεσός: Ταχεία διαδρομή μέσω A6',
      overviewParagraphs: [
        'Το Αεροδρόμιο Πάφου (PFO) βρίσκεται νοτιοανατολικά της Πάφου προς τη Λεμεσό, κάνοντας τη διαδρομή περίπου 45 λεπτά (63 χλμ). Από τον δρόμο B6 το όχημα βγαίνει κατευθείαν στον παραλιακό αυτοκινητόδρομο A6 περνώντας κοντά από την Πέτρα του Ρωμιού και το Κούριο.',
        'Παρότι ο τερματικός σταθμός της Πάφου είναι μικρός και γρήγορος στην έξοδο, τα λεωφορεία για Λεμεσό είναι αραιά και σταματούν το βράδυ. Με σταθερή τιμή €75 έχετε άμεση ιδιωτική μεταφορά 24/7 μέχρι την είσοδο του ξενοδοχείου σας.',
      ],
      dropOffHeading: 'Δημοφιλή σημεία παράδοσης στη Λεμεσό',
      dropOffAreas: [
        'Ζακάκι & City of Dreams Mediterranean',
        'Μαρίνα Λεμεσού & Παλιό Λιμάνι',
        'Παραλιακός Μόλος & Νεάπολη',
        'Γερμασόγεια (τουριστική ζώνη)',
        'Άγιος Τύχωνας (Four Seasons & Amara)',
      ],
      tipsHeading: 'Συμβουλές άφιξης στον τερματικό σταθμό PFO',
      tips: [
        'Βγαίνοντας από τον χώρο αποσκευών στην Πάφο, ο οδηγός σάς υποδέχεται ακριβώς στην έξοδο αφίξεων με ταμπέλα ονόματος.',
        'Σε βραδινές πτήσεις δεν υπάρχουν υπεραστικά λεωφορεία προς Λεμεσό· εξυπηρετούμε όλο το 24ωρο (+€10 νυχτερινό τέλος 23:00–07:00).',
        'Ζητήστε παιδικό κάθισμα στη φόρμα κράτησης ή επικοινωνήστε στο WhatsApp αν είστε 5+ επιβάτες.',
      ],
      extraFaqs: [
        {
          q: 'Υπάρχουν νυχτερινά λεωφορεία από το αεροδρόμιο Πάφου προς Λεμεσό;',
          a: 'Όχι, τα λεωφορεία σταματούν το βράδυ. Με προκράτηση €75 (+€10 μεταξύ 23:00 και 07:00) έχετε εγγυημένη παραλαβή όλο το 24ωρο.',
        },
        {
          q: 'Ποια διαδρομή ακολουθεί το όχημα από το PFO προς τη Λεμεσό;',
          a: 'Η απευθείας διαδρομή 63 χλμ περνά μέσω B6 και αυτοκινητόδρομου A6 κοντά στην Πέτρα του Ρωμιού κατευθείαν στη δυτική και παραλιακή Λεμεσό.',
        },
      ],
    },
    it: {
      overviewHeading: 'Aeroporto di Paphos (PFO) – Limassol: percorso veloce lungo la A6',
      overviewParagraphs: [
        "L'aeroporto di Paphos (PFO) si trova a sud-est della città in direzione Limassol: in soli circa 45 minuti (63 km) l'autista imbocca il raccordo B6 e prosegue lungo l'autostrada costiera A6 passando vicino a Petra tou Romiou (Roccia di Afrodite) e Kourion.",
        'Il terminal unico di Paphos è rapido da attraversare, ma i collegamenti pubblici serali per Limassol sono assenti. Con la tariffa fissa di €75 parti subito verso il tuo hotel senza code ai taxi.',
      ],
      dropOffHeading: 'Principali aree servite a Limassol',
      dropOffAreas: [
        'Zakaki e City of Dreams Mediterranean',
        'Limassol Marina e Porto Vecchio',
        'Lungomare Molos e Neapolis',
        'Germasogeia e fascia alberghiera',
        'Agios Tychonas (area Four Seasons / Amara)',
      ],
      tipsHeading: "Consigli utili all'arrivo al terminal PFO",
      tips: [
        "Superato il ritiro bagagli di Paphos, troverai l'autista con cartello nominativo subito nell'unica sala arrivi.",
        'Per voli serali non ci sono autobus interurbani per Limassol; operiamo 24/7 con supplemento notturno fisso di +€10 dalle 23:00 alle 07:00.',
        'Indica eventuali seggiolini nella prenotazione o scrivici su WhatsApp per gruppi da 5 o più passeggeri.',
      ],
      extraFaqs: [
        {
          q: "Ci sono autobus notturni dall'aeroporto di Paphos a Limassol?",
          a: 'No, gli autobus pubblici terminano le corse la sera. Prenotando il transfer privato a €75 (+€10 tra le 23:00 e le 07:00) hai il ritiro garantito 24/7.',
        },
        {
          q: 'Che strada si percorre da PFO a Limassol?',
          a: 'Il tragitto diretto di 63 km segue la B6 e la A6 superando Petra tou Romiou fino ai quartieri costieri di Limassol.',
        },
      ],
    },
  },

  'larnaca-airport-to-paphos': {
    en: {
      overviewHeading: 'Larnaca Airport (LCA) to Paphos: Direct Cross-Island Route (€135)',
      overviewParagraphs: [
        'Many international airlines fly exclusively into Larnaca Airport (LCA) even when your accommodation is in Paphos. Because Cyprus has no railway and no direct public bus between Larnaca Airport and Paphos—forcing bus passengers to transfer through Larnaca city or Limassol—a pre-booked private sedan covering the 135 km motorway corridor (A5, A1, and A6 via Limassol) saves roughly two hours with luggage.',
        'If anyone in your group needs a quick coffee or restroom break halfway past Limassol, just let your driver know at pickup; short comfort stops along the highway are included within your fixed €135 fare.',
      ],
      dropOffHeading: 'Paphos Districts Included in Fixed Rate',
      dropOffAreas: [
        'Kato Paphos Harbour & Coastal Resorts',
        'Tombs of the Kings Road',
        'Universal & Paphos Old Town (Ktima)',
        'Chloraka & Coastal Villas',
        'Yeroskipou Beachfront Hotels',
      ],
      tipsHeading: 'Planning Your LCA → Paphos Transfer',
      tips: [
        'Direct travel time is ~90 minutes on open highway with zero shuttle transfers.',
        'Pre-pay a €20 Stripe deposit online or settle in cash/card with the driver upon reaching your Paphos hotel.',
        'Booking a round trip reduces the return fare by 10%, bringing both journeys to €243 total during daytime hours.',
      ],
      extraFaqs: [
        {
          q: 'Is there a direct bus from Larnaca Airport to Paphos?',
          a: 'No direct airport shuttle links LCA to Paphos. Travelers using buses must change at Larnaca or Limassol, taking 2.5 to 3.5 hours versus ~90 minutes by €135 private sedan.',
        },
        {
          q: 'Can we ask for a quick comfort stop near Limassol?',
          a: 'Yes, brief comfort or coffee stops at a highway service station near Limassol can be requested directly with your driver at no extra charge.',
        },
      ],
    },
    ru: {
      overviewHeading: 'Аэропорт Ларнака (LCA) — Пафос: прямой трансфер через остров (€135)',
      overviewParagraphs: [
        'Значительная часть международных рейсов прилетает в Ларнаку (LCA), даже если ваш отель или вилла находятся в Пафосе. Прямого автобуса из аэропорта Ларнаки в Пафос не существует: поездка с пересадками в центре Ларнаки или Лимассоле занимает 2,5–3,5 часа. Наш частный седан проходит 135 км по магистралям A5, A1 и A6 всего за ~90 минут от двери до двери.',
        'Фиксированный тариф €135 действует для всего автомобиля (до 4 человек и 3 чемоданов). По пути при желании можно попросить водителя о короткой остановке на кофе или отдых в районе Лимассола.',
      ],
      dropOffHeading: 'Популярные зоны высадки в Пафосе',
      dropOffAreas: [
        'Набережная Като Пафос и гавань',
        'Район Гробницы Королей (Tombs of the Kings)',
        'Юниверсал и верхний город Ктима',
        'Хлорака и прибрежные виллы',
        'Курортные отели Ероскипу',
      ],
      tipsHeading: 'Советы для маршрута Ларнака — Пафос',
      tips: [
        'Экономия времени по сравнению с автобусами и пересадками составляет от 1,5 до 2 часов.',
        'Можно внести предоплату €20 через Stripe онлайн, а оставшуюся сумму передать водителю в Пафосе.',
        'Заказывайте сразу путь туда и обратно: с 10% скидкой на возврат обе поездки днём обойдутся в €243.',
      ],
      extraFaqs: [
        {
          q: 'Есть ли прямой автобус из аэропорта Ларнака в Пафос?',
          a: 'Нет, прямых автобусов между LCA и Пафосом нет — требуется пересадка в городе. Прямой седан за €135 довезёт за ~90 минут без пересадок.',
        },
        {
          q: 'Можно ли сделать короткую остановку в дороге по пути в Пафос?',
          a: 'Да, при длительном переезде через Лимассол водитель без доплат остановится на пару минут у заправочного комплекса на трассе.',
        },
      ],
    },
    de: {
      overviewHeading: 'Flughafen Larnaka (LCA) nach Paphos: Direktfahrt über die Autobahn (€135)',
      overviewParagraphs: [
        'Viele Flüge landen in Larnaka (LCA), obwohl das Urlaubsziel im Westen bei Paphos liegt. Eine direkte Busverbindung vom Flughafen Larnaka nach Paphos existiert nicht — Umsteiger brauchen meist 2,5 bis 3,5 Stunden. Unsere Privatfahrt über die Autobahnen A5, A1 und A6 vorbei an Limassol dauert nur rund 90 Minuten (135 km).',
        'Im Festpreis von €135 für die gesamte Limousine sind bis zu 4 Passagiere, 3 Koffer sowie ein kurzer Zwischenstopp für Kaffee oder eine Pause unterwegs auf Wunsch inbegriffen.',
      ],
      dropOffHeading: 'Abgedeckte Viertel in Paphos',
      dropOffAreas: [
        'Kato Paphos Hafen & Strandhotels',
        'Tombs of the Kings Road',
        'Universal & Altstadt Ktima',
        'Chloraka & Küstenvillen',
        'Resorts in Yeroskipou',
      ],
      tipsHeading: 'Tipps für die Strecke LCA → Paphos',
      tips: [
        'Mit dem Privatwagen sparen Sie gegenüber dem mehrfachen Busumstieg rund 90–120 Minuten Reisezeit.',
        'Sie können online lediglich €20 via Stripe anzahlen und den Restbetrag bei Ankunft in Paphos beim Fahrer begleichen.',
        'Bei Hin- und Rückbuchung sinkt der Gesamtpreis tagsüber durch 10 % Rückfahrtrabatt auf €243.',
      ],
      extraFaqs: [
        {
          q: 'Fährt ein Direktbus vom Flughafen Larnaka nach Paphos?',
          a: 'Nein, vom LCA gibt es keinen Direktbus nach Paphos. Mit dem öffentlichen Nahverkehr muss man umsteigen; unser privater Transfer fährt in ca. 90 Minuten durch (€135).',
        },
        {
          q: 'Ist unterwegs auf Wunsch eine kurze Rast möglich?',
          a: 'Ja, sagen Sie dem Fahrer einfach vor Abfahrt Bescheid, falls Sie bei Limassol kurz anhalten möchten — ohne Aufpreis.',
        },
      ],
    },
    pl: {
      overviewHeading: 'Lotnisko Larnaka (LCA) – Pafos: bezpośredni przejazd autostradą (€135)',
      overviewParagraphs: [
        'Wiele połączeń lotniczych ląduje w Larnace (LCA), nawet jeśli nocleg masz w Pafos. Między lotniskiem w Larnace a Pafos nie ma bezpośredniego autobusu — podróż komunikacją wymaga przesiadki i zajmuje 2,5–3,5 godziny. Prywatny sedan pokonuje 135 km trasami A5, A1 i A6 przez Limassol w około 90 minut.',
        'Stała opłata €135 dotyczy całego pojazdu (do 4 pasażerów i 3 walizek). Na życzenie kierowca może zatrzymać się na krótką przerwę w okolicach Limassol bez dodatkowych opłat.',
      ],
      dropOffHeading: 'Obsługiwane dzielnice w Pafos',
      dropOffAreas: [
        'Port Kato Pafos i hotele przy plaży',
        'Aleja Grobowców Królewskich (Tombs of the Kings)',
        'Dzielnica Universal i górne miasto Ktima',
        'Chloraka i wille nadmorskie',
        'Kurorty w Yeroskipou',
      ],
      tipsHeading: 'Wskazówki na trasę Larnaka – Pafos',
      tips: [
        'Przejazd bez przesiadek oszczędza blisko 2 godziny w porównaniu z autobusami.',
        'Rezerwując online możesz wpłacić jedynie €20 zaliczki przez Stripe, a resztę uregulować u kierowcy w Pafos.',
        'Zamawiając od razu kurs powrotny, płacisz €243 w dzień za obie strony dzięki 10% zniżce na powrót.',
      ],
      extraFaqs: [
        {
          q: 'Czy z lotniska w Larnace odjeżdża bezpośredni autobus do Pafos?',
          a: 'Nie, autobusy wymagają przesiadki w centrum Larnaki lub Limassol. Bezpośredni transfer za €135 trwa około 90 minut.',
        },
        {
          q: 'Czy podczas podróży do Pafos możliwy jest krótki postój?',
          a: 'Tak, na życzenie kierowca może zatrzymać się na kilka minut przy stacji na trasie koło Limassol bez dopłat.',
        },
      ],
    },
    fr: {
      overviewHeading: "Aéroport de Larnaca (LCA) vers Paphos : liaison directe est-ouest (135 €)",
      overviewParagraphs: [
        "De nombreux vols atterrissent à Larnaca (LCA) pour des séjours situés à Paphos. Aucun bus direct ne relie l'aéroport LCA à Paphos : les transports publics imposent une correspondance pour 2h30 à 3h30 de trajet. En berline privée (A5, A1 et A6 via Limassol), les 135 km s'effectuent en ~90 minutes.",
        "Le tarif fixe de 135 € couvre tout le véhicule jusqu'à 4 passagers et 3 bagages, avec possibilité de demander une courte pause café ou toilettes sur l'aire autoroutière de Limassol.",
      ],
      dropOffHeading: 'Secteurs desservis à Paphos',
      dropOffAreas: [
        'Port de Kato Paphos et zone hôtelière',
        'Avenue des Tombeaux des Rois',
        'Quartier Universal et ville haute Ktima',
        'Chloraka et villas du littoral',
        'Hôtels de Yeroskipou',
      ],
      tipsHeading: 'Préparer votre transfert LCA → Paphos',
      tips: [
        'Vous gagnez environ deux heures sur les correspondances de bus tout en voyageant porte-à-porte.',
        'Payez simplement un acompte de 20 € par Stripe en ligne et le solde à votre arrivée à Paphos.',
        "Avec l'option aller-retour (−10 % sur le retour), les deux trajets de jour reviennent à 243 € au total.",
      ],
      extraFaqs: [
        {
          q: "Y a-t-il un bus direct entre l'aéroport de Larnaca et Paphos ?",
          a: "Non, il faut changer de bus en ville (2h30 à 3h30 au total). Notre berline à 135 € relie directement l'aéroport à votre adresse en ~90 minutes.",
        },
        {
          q: 'Peut-on faire une courte pause en chemin près de Limassol ?',
          a: 'Oui, un bref arrêt détente en station autoroutière est tout à fait possible sans frais supplémentaires.',
        },
      ],
    },
    el: {
      overviewHeading: 'Αεροδρόμιο Λάρνακας (LCA) – Πάφος: Απευθείας διαδρομή (€135)',
      overviewParagraphs: [
        'Πολλές διεθνείς πτήσεις προσγειώνονται στη Λάρνακα (LCA) ακόμη κι όταν το ξενοδοχείο σας βρίσκεται στην Πάφο. Καθώς δεν υπάρχει απευθείας λεωφορείο από το αεροδρόμιο LCA προς την Πάφο —με αποτέλεσμα 2,5–3,5 ώρες με αλλαγή λεωφορείου— η ιδιωτική μεταφορά 135 χλμ μέσω A5, A1 και A6 διαρκεί περίπου 90 λεπτά.',
        'Η σταθερή χρέωση €135 αφορά όλο το όχημα (έως 4 επιβάτες & 3 βαλίτσες), ενώ αν επιθυμείτε σύντομη στάση ξεκούρασης κοντά στη Λεμεσό αρκεί να το αναφέρετε στον οδηγό.',
      ],
      dropOffHeading: 'Περιοχές παράδοσης στην Πάφο',
      dropOffAreas: [
        'Λιμανάκι Κάτω Πάφου & παραλιακή ζώνη',
        'Λεωφόρος Τάφων των Βασιλέων',
        'Συνοικία Universal & Κτήμα',
        'Χλώρακα & παραθαλάσσιες βίλες',
        'Ξενοδοχεία Γεροσκήπου',
      ],
      tipsHeading: 'Συμβουλές για τη διαδρομή LCA → Πάφος',
      tips: [
        'Κερδίζετε έως 2 ώρες σε σύγκριση με τα υπεραστικά λεωφορεία με ανταπόκριση.',
        'Μπορείτε να δώσετε €20 προκαταβολή με κάρτα μέσω Stripe και το υπόλοιπο στον οδηγό στην Πάφο.',
        'Με κράτηση μετ’ επιστροφής (έκπτωση 10% στην επιστροφή) οι δύο διαδρομές ημέρας κοστίζουν €243 συνολικά.',
      ],
      extraFaqs: [
        {
          q: 'Υπάρχει απευθείας λεωφορείο από το αεροδρόμιο Λάρνακας στην Πάφο;',
          a: 'Όχι, χρειάζεται αλλαγή λεωφορείου στη Λάρνακα ή τη Λεμεσό (2,5–3,5 ώρες). Το ιδιωτικό μας όχημα (€135) φτάνει σε ~90 λεπτά.',
        },
        {
          q: 'Μπορούμε να κάνουμε μια μικρή στάση στη διαδρομή;',
          a: 'Ναι, μια σύντομη στάση για καφέ ή τουαλέτα σε σταθμό εξυπηρέτησης κοντά στη Λεμεσό παρέχεται χωρίς έξτρα χρέωση.',
        },
      ],
    },
    it: {
      overviewHeading: 'Aeroporto di Larnaca (LCA) – Paphos: tratta diretta (€135)',
      overviewParagraphs: [
        'Molti voli internazionali atterrano a Larnaca (LCA) anche per chi soggiorna a Paphos. Non essendoci autobus diretti dallo scalo LCA a Paphos — con tempi di 2,5–3,5 ore e cambi con i bagagli — la berlina privata lungo i 135 km autostradali A5, A1 e A6 via Limassol copre la distanza in circa 90 minuti.',
        'La tariffa fissa di €135 include l’intero veicolo (fino a 4 passeggeri e 3 valigie) e, su richiesta, una breve sosta caffè lungo il tratto autostradale di Limassol senza extra.',
      ],
      dropOffHeading: 'Zone di destinazione a Paphos',
      dropOffAreas: [
        'Porto di Kato Paphos e hotel costieri',
        'Tombs of the Kings Road',
        'Quartiere Universal e città alta Ktima',
        'Chloraka e ville sul mare',
        'Resort di Yeroskipou',
      ],
      tipsHeading: 'Consigli per il transfer LCA → Paphos',
      tips: [
        'Risparmi quasi due ore rispetto ai pullman pubblici ed eviti cambi con le valigie.',
        'Puoi versare un piccolo acconto di €20 online via Stripe e saldare il resto all’arrivo a Paphos.',
        'Prenotando andata e ritorno insieme (-10% sul rientro) il totale diurno è €243.',
      ],
      extraFaqs: [
        {
          q: 'Esiste un autobus diretto tra aeroporto di Larnaca e Paphos?',
          a: 'No, occorre cambiare linea in città impiegando 2,5–3,5 ore. Il nostro transfer diretto (€135) impiega circa 90 minuti.',
        },
        {
          q: 'Possiamo chiedere una breve pausa vicino a Limassol?',
          a: 'Certamente, una sosta rapida in area di servizio lungo l’autostrada è inclusa senza costi aggiuntivi.',
        },
      ],
    },
  },

  'paphos-airport-to-larnaca-city': {
    en: {
      overviewHeading: 'Paphos Airport (PFO) to Larnaca City: Direct Cross-Coast Transfer (€135)',
      overviewParagraphs: [
        'Budget carriers frequently make Paphos Airport (PFO) the smartest flight option even when staying in Larnaca City or along the Dhekelia Bay coastline. Instead of catching two separate buses across the island, our Limassol-based driver takes you straight east along the A6, A1, and A5 motorways in ~90 minutes (132 km).',
        'You travel directly to Finikoudes hotels, Mackenzie seafront apartments, or Dhekelia Road resorts for a locked €135 per sedan—with zero luggage fees or traffic taximeter creep.',
      ],
      dropOffHeading: 'Larnaca City & Coastal Drop-Off Areas',
      dropOffAreas: [
        'Finikoudes Promenade & City Center',
        'Mackenzie Beach Apartments',
        'Larnaca Marina & Ermou Quarter',
        'Dhekelia Road (Oroklini) Resorts',
        'Livadia & Pervolia Road Access',
      ],
      tipsHeading: 'Key Notes for PFO → Larnaca Travelers',
      tips: [
        'Send your Larnaca apartment pin or hotel name in the booking comment for doorstep drop-off.',
        'For arrivals between 23:00 and 07:00, only a flat +€10 night rate applies (€145 total).',
        'If flying home out of LCA instead of PFO, keep our direct LCA ↔ Larnaca/Limassol rates handy in the booking calculator.',
      ],
      extraFaqs: [
        {
          q: 'How long does it take from Paphos Airport to Finikoudes in Larnaca?',
          a: 'Under normal highway conditions on the A6, A1, and A5 via Limassol, arrival at Finikoudes takes approximately 90 minutes (132 km).',
        },
        {
          q: 'Does €135 include Dhekelia Road and Mackenzie Beach?',
          a: 'Yes, central Larnaca, Finikoudes, Mackenzie, Livadia, and Dhekelia Road hotels are covered in the fixed €135 fare.',
        },
      ],
    },
    ru: {
      overviewHeading: 'Аэропорт Пафос (PFO) — Ларнака (город): прямой переезд за ~90 минут (€135)',
      overviewParagraphs: [
        'Нередко билеты до аэропорта Пафоса (PFO) оказываются заметно дешевле даже для отдыха в Ларнаке. Вместо двух автобусных пересадок с чемоданами через Лимассол наш водитель доставляет вас на восток по трассам A6, A1 и A5 ровно за ~90 минут (132 км).',
        'Фиксированная цена €135 распространяется на весь автомобиль (до 4 человек и 3 чемоданов) до набережной Финикудес, пляжа Маккензи или отелей Декелии.',
      ],
      dropOffHeading: 'Зоны высадки в Ларнаке и окрестностях',
      dropOffAreas: [
        'Променад Финикудес и центр Ларнаки',
        'Район пляжа Маккензи',
        'Марина Ларнаки и квартал Эрму',
        'Курортная полоса Декелия / Ороклини',
        'Ливадия и прибрежные апартаменты',
      ],
      tipsHeading: 'Что учесть на маршруте PFO — Ларнака',
      tips: [
        'Укажите точный адрес или название отеля в Ларнаке в комментарии к заказу.',
        'Ночной тариф +€10 действует только при посадке с 23:00 до 07:00 (€145 итого).',
        'Если вы улетаете домой уже из аэропорта Ларнаки, обратный вылет удобно комбинировать с нашими тарифами из LCA.',
      ],
      extraFaqs: [
        {
          q: 'Сколько ехать из аэропорта Пафоса до набережной Финикудес в Ларнаке?',
          a: 'По скоростным трассам A6, A1 и A5 через Лимассол поездка занимает около 90 минут (132 км) без заезда в центры попутных городов.',
        },
        {
          q: 'Входит ли дорога Декелия (Ороклини) и пляж Маккензи в €135?',
          a: 'Да, центр Ларнаки, Финикудес, Маккензи, Ливадия и отели вдоль Dhekelia Road обслуживаются по единому тарифу €135.',
        },
      ],
    },
    de: {
      overviewHeading: 'Flughafen Paphos (PFO) nach Larnaka Stadt: Direkter Inseltransfer (€135)',
      overviewParagraphs: [
        'Günstige Flugverbindungen landen häufig in Paphos (PFO), auch wenn das Hotel an der Ostküste in Larnaka liegt. Statt mit mehreren Bussen quer über die Insel zu fahren, bringt Sie unser Chauffeur über A6, A1 und A5 in ca. 90 Minuten (132 km) direkt ans Ziel.',
        'Der Festpreis von €135 gilt für die gesamte Limousine bis zur Finikoudes-Promenade, zum Mackenzie Beach oder in die Resorts entlang der Dhekelia Road.',
      ],
      dropOffHeading: 'Zielgebiete in Larnaka Stadt',
      dropOffAreas: [
        'Finikoudes-Promenade & Zentrum',
        'Mackenzie Beach Apartments',
        'Marina Larnaka & Einkaufsviertel',
        'Dhekelia Road & Oroklini',
        'Livadia & Küstenresorts',
      ],
      tipsHeading: 'Hinweise für Reisende von PFO nach Larnaka',
      tips: [
        'Geben Sie Hotelnamen oder Google-Maps-Link Ihres Apartments direkt bei der Buchung an.',
        'Nachtankünfte zwischen 23:00 und 07:00 Uhr kosten lediglich +€10 Aufschlag (€145 gesamt).',
        'Ideal auch bei Gabelflügen (Hinflug nach Paphos, Rückflug ab Larnaka LCA).',
      ],
      extraFaqs: [
        {
          q: 'Wie lange dauert die Fahrt vom Flughafen Paphos zur Finikoudes-Promenade?',
          a: 'Über die Autobahnen A6, A1 und A5 dauert die Fahrt etwa 90 Minuten (132 km) ohne Zwischenstopps.',
        },
        {
          q: 'Sind Dhekelia Road und Mackenzie Beach im Festpreis von €135 enthalten?',
          a: 'Ja, das gesamte Stadtgebiet von Larnaka einschließlich Mackenzie, Livadia und Oroklini / Dhekelia Road ist abgedeckt.',
        },
      ],
    },
    pl: {
      overviewHeading: 'Lotnisko Pafos (PFO) – Larnaka (Miasto): szybki transfer przez wyspę (€135)',
      overviewParagraphs: [
        'Tanie loty często przylatują do Pafos (PFO), nawet jeśli urlop spędzasz w Larnace. Zamiast łączyć autobusy przez Limassol z ciężkim bagażem, pokonasz 132 km autostradami A6, A1 i A5 bezpośrednio w około 90 minut.',
        'Stała cena €135 za cały sedan obejmuje dowóz pod hotele przy promenadzie Finikoudes, apartamenty przy Mackenzie Beach oraz kurorty przy Dhekelia Road.',
      ],
      dropOffHeading: 'Popularne strefy dowozu w Larnace',
      dropOffAreas: [
        'Promenada Finikoudes i centrum',
        'Plaża Mackenzie (Mackenzie Beach)',
        'Marina w Larnace i ulica Ermou',
        'Dhekelia Road i Oroklini',
        'Livadia',
      ],
      tipsHeading: 'Wskazówki na trasę PFO → Larnaka',
      tips: [
        'Podaj w uwagach nazwę hotelu lub dokładny adres apartamentu w Larnace.',
        'Między 23:00 a 07:00 doliczana jest wyłącznie płaska opłata nocna +€10 (€145 łącznie).',
        'Świetna opcja przy rezerwacji lotów open-jaw (przylot na PFO, powrót z Larnaki).',
      ],
      extraFaqs: [
        {
          q: 'Ile trwa przejazd z lotniska Pafos na promenadę Finikoudes?',
          a: 'Autostradami A6, A1 i A5 przez Limassol podróż zajmuje około 90 minut (132 km).',
        },
        {
          q: 'Czy stawka €135 obejmuje też Dhekelia Road i Mackenzie Beach?',
          a: 'Tak, cena €135 obejmuje centrum Larnaki, Finikoudes, Mackenzie, Livadię oraz strefę Dhekelia Road.',
        },
      ],
    },
    fr: {
      overviewHeading: 'Aéroport de Paphos (PFO) vers Larnaca Ville : traversée directe (135 €)',
      overviewParagraphs: [
        "Lorsque votre vol atterrit à Paphos (PFO) mais que votre séjour est prévu à Larnaca, nos berlines rejoignent directement la côte est via les autoroutes A6, A1 et A5 en ~90 minutes (132 km), évitant les correspondances longues en autobus.",
        "Le tarif fixe de 135 € s'applique pour l'ensemble du véhicule jusqu'à la promenade Finikoudes, la plage Mackenzie ou les hôtels de la route de Dhekelia.",
      ],
      dropOffHeading: 'Quartiers desservis à Larnaca',
      dropOffAreas: [
        'Promenade Finikoudes & Centre',
        'Mackenzie Beach',
        'Marina de Larnaca & Rue Ermou',
        'Route de Dhekelia / Oroklini',
        'Livadia',
      ],
      tipsHeading: 'Conseils pour votre trajet PFO → Larnaca',
      tips: [
        "Précisez le nom exact de votre hôtel ou l'adresse complète dans les notes de réservation.",
        'Les arrivées de nuit (23h00–07h00) impliquent un supplément unique de +10 € (145 € au total).',
        "Solution idéale si votre vol aller arrive à PFO et votre vol retour repart de l'aéroport LCA.",
      ],
      extraFaqs: [
        {
          q: "Combien de temps faut-il entre l'aéroport de Paphos et Finikoudes ?",
          a: 'Comptez environ 90 minutes (132 km) par autoroute via Limassol sans arrêt intermédiaire.',
        },
        {
          q: 'Mackenzie Beach et Dhekelia Road sont-ils compris dans les 135 € ?',
          a: 'Oui, Finikoudes, Mackenzie, Livadia et les hôtels de Dhekelia Road sont couverts par ce tarif fixe.',
        },
      ],
    },
    el: {
      overviewHeading: 'Αεροδρόμιο Πάφου (PFO) – Πόλη Λάρνακας: Απευθείας διαδρομή (€135)',
      overviewParagraphs: [
        'Όταν η πτήση σας προσγειώνεται στην Πάφο (PFO) αλλά η διαμονή σας βρίσκεται στη Λάρνακα, η απευθείας μεταφορά μέσω A6, A1 και A5 (132 χλμ) καλύπτει το νησί σε περίπου 90 λεπτά χωρίς ταλαιπωρία με διπλά λεωφορεία.',
        'Η σταθερή τιμή €135 ανά όχημα σάς αφήνει ακριβώς στις Φοινικούδες, στην παραλία Μακένζι ή στα ξενοδοχεία της οδού Δεκέλειας.',
      ],
      dropOffHeading: 'Περιοχές παράδοσης στη Λάρνακα',
      dropOffAreas: [
        'Παραλιακό μέτωπο Φοινικούδες & Κέντρο',
        'Περιοχή παραλίας Μακένζι',
        'Μαρίνα Λάρνακας & Ερμού',
        'Δρόμος Δεκέλειας / Ορόκλινη',
        'Λιβάδια',
      ],
      tipsHeading: 'Συμβουλές για τη διαδρομή PFO → Λάρνακα',
      tips: [
        'Σημειώστε το όνομα του ξενοδοχείου ή τον ακριβή σύνδεσμο διεύθυνσης κατά την κράτηση.',
        'Για αφίξεις μεταξύ 23:00 και 07:00 προστίθεται μόνο σταθερό νυχτερινό τέλος +€10 (€145 τελική).',
        'Βολική λύση και για ταξίδια με άφιξη στην Πάφο και αναχώρηση από το αεροδρόμιο Λάρνακας (LCA).',
      ],
      extraFaqs: [
        {
          q: 'Πόση ώρα διαρκεί το ταξίδι από το αεροδρόμιο Πάφου στις Φοινικούδες;',
          a: 'Περίπου 90 λεπτά (132 χλμ) μέσω των αυτοκινητόδρομων A6, A1 και A5 διά μέσου Λεμεσού.',
        },
        {
          q: 'Περιλαμβάνονται το Μακένζι και η Δεκέλεια στη τιμή €135;',
          a: 'Ναι, Φοινικούδες, Μακένζι, Λιβάδια και η περιοχή Δεκέλειας/Ορόκλινης καλύπτονται χωρίς επιπλέον χρέωση.',
        },
      ],
    },
    it: {
      overviewHeading: 'Aeroporto di Paphos (PFO) – Larnaca Città: transfer diretto (€135)',
      overviewParagraphs: [
        'Molti voli economici atterrano a Paphos (PFO) anche per chi alloggia sulla costa di Larnaca. Evitando due cambi di autobus attraverso l’isola, la nostra berlina percorre i 132 km lungo A6, A1 e A5 via Limassol in circa 90 minuti.',
        'La tariffa bloccata di €135 vale per tutta l’auto fino al lungomare di Finikoudes, a Mackenzie Beach o ai resort lungo Dhekelia Road.',
      ],
      dropOffHeading: 'Zone di arrivo servite a Larnaca',
      dropOffAreas: [
        'Lungomare Finikoudes e Centro',
        'Mackenzie Beach',
        'Marina di Larnaca e zona Ermou',
        'Dhekelia Road / Oroklini',
        'Livadia',
      ],
      tipsHeading: 'Consigli pratici per PFO → Larnaca',
      tips: [
        'Inserisci il nome dell’hotel o l’indirizzo esatto dell’appartamento nelle note della prenotazione.',
        'Dalle 23:00 alle 07:00 si aggiunge solo la tariffa notturna fissa di +€10 (€145 totali).',
        'Ottima scelta anche per biglietti multi-tratta con arrivo a Paphos e ripartenza da Larnaca.',
      ],
      extraFaqs: [
        {
          q: 'Quanto tempo serve dall’aeroporto di Paphos a Finikoudes?',
          a: 'Il percorso autostradale via Limassol dura circa 90 minuti (132 km) senza fermate intermedie.',
        },
        {
          q: 'Mackenzie Beach e Dhekelia Road sono compresi nei €135?',
          a: 'Sì, tutta l’area urbana di Larnaca incluse Finikoudes, Mackenzie, Livadia e Dhekelia Road rientra nella tariffa fissa.',
        },
      ],
    },
  },

  'paphos-airport-to-ayia-napa': {
    en: {
      overviewHeading: 'Paphos Airport (PFO) to Ayia Napa: Direct West-to-East Sedan (€180)',
      overviewParagraphs: [
        'Flying into Paphos Airport (PFO) for a beach holiday in Ayia Napa is common thanks to seasonal European flights into PFO. Public transit across the entire southern coast requires multiple bus changes lasting four hours or longer, while our direct A6, A1, and A3 highway transfer covers all 175 km in around 2 hours.',
        'Our Limassol dispatch base sits midway between Paphos and Ayia Napa, keeping pickups punctual even on late-night or rescheduled charter arrivals.',
      ],
      dropOffHeading: 'Ayia Napa Resort Drop-Off Zones',
      dropOffAreas: [
        'Nissi Beach & Adams Beach Strip',
        'Makronissos & Landa Beach',
        'Ayia Napa Harbour & Square',
        'Grecian Bay & Glyki Nero Beach',
        'Ayia Thekla Villas & Marina Area',
      ],
      tipsHeading: 'Comfort Tips for Long Coast-to-Coast Transfers',
      tips: [
        'All sedans comfortably carry 4 adults plus 3 large suitcases with full climate control—essential in peak summer heat.',
        'Night landings (23:00–07:00) pay only +€10 flat over the €180 day fare (€190 total).',
        'Traveling with 5+ friends or family? Send us a quick WhatsApp message with flight details and bag count.',
      ],
      extraFaqs: [
        {
          q: 'How do travelers get from Paphos Airport to Ayia Napa without changing buses?',
          a: 'There is no direct public bus across the island. A pre-booked private sedan is the fastest direct way—covering the 175 km in ~120 minutes for a fixed €180.',
        },
        {
          q: 'Do you drop off at Ayia Thekla and Makronissos resorts?',
          a: 'Yes, Ayia Thekla, Makronissos, Nissi Beach, central Ayia Napa, and Cape Greco hotels are all included in the €180 rate.',
        },
      ],
    },
    ru: {
      overviewHeading: 'Аэропорт Пафос (PFO) — Айя-Напа: прямой трансфер с запада на восток (€180)',
      overviewParagraphs: [
        'Многие сезонные рейсы прилетают в Пафос (PFO), даже если отпуск запланирован на пляжах Айя-Напы. Добираться через весь остров на автобусах с пересадками приходится 4+ часа, тогда как наш прямой автомобиль по скоростным трассам A6, A1 и A3 преодолевает 175 км примерно за 2 часа.',
        'База в Лимассоле расположена ровно на середине пути между Пафосом и Айя-Напой, что позволяет оперативно подавать машину под любой ночной или перенесённый рейс.',
      ],
      dropOffHeading: 'Куда мы доставляем в Айя-Напе',
      dropOffAreas: [
        'Пляж Нисси Бич и отели первой линии',
        'Макронисос и Ланда Бич',
        'Гавань и центр Айя-Напы',
        'Греческий залив (Grecian Bay)',
        'Виллы Айя-Текла и Марина Айя-Напы',
      ],
      tipsHeading: 'Советы для комфортной поездки через остров',
      tips: [
        'Седаны вмещают до 4 пассажиров и 3 чемоданов и оснащены эффективным кондиционером для жаркого лета.',
        'Для ночных прилётов (23:00–07:00) действует единая доплата +€10 к тарифу €180 (€190 итого).',
        'Если вы летите группой 5+ человек, заранее напишите в WhatsApp номер рейса и количество багажа.',
      ],
      extraFaqs: [
        {
          q: 'Как добраться из аэропорта Пафоса в Айя-Напу без пересадок?',
          a: 'Прямого автобуса по этому маршруту нет. Индивидуальный трансфер за фиксированные €180 доставляет вас напрямую за ~120 минут.',
        },
        {
          q: 'Охватывает ли тариф €180 районы Айя-Текла и Макронисос?',
          a: 'Да, все отели и виллы от Айя-Теклы и Макронисоса до Нисси Бич, центра и района Каво Греко включены в цену.',
        },
      ],
    },
    de: {
      overviewHeading: 'Flughafen Paphos (PFO) nach Ayia Napa: Direktfahrt von West nach Ost (€180)',
      overviewParagraphs: [
        'Viele Ferienflieger landen in Paphos (PFO), auch wenn das Hotel am Nissi Beach in Ayia Napa liegt. Mit öffentlichen Bussen dauert die Fahrt quer über Zypern durch mehrfaches Umsteigen vier Stunden und länger — unsere klimatisierte Limousine schafft die 175 km über A6, A1 und A3 in ca. 120 Minuten.',
        'Da unsere Disposition auf halber Strecke in Limassol liegt, bleibt die Abholung auch bei verspäteten oder nächtlichen Charterflügen absolut pünktlich.',
      ],
      dropOffHeading: 'Beliebte Zielzonen in Ayia Napa',
      dropOffAreas: [
        'Nissi Beach & Küstenresorts',
        'Makronissos & Landa Beach',
        'Hafen & Zentrum von Ayia Napa',
        'Grecian Bay',
        'Villen in Ayia Thekla & Marina',
      ],
      tipsHeading: 'Tipps für die Inseldurchquerung nach Ayia Napa',
      tips: [
        'Alle Fahrzeuge bieten Platz für bis zu 4 Gäste plus 3 große Koffer bei angenehmer Klimatisierung.',
        'Nachtankünfte (23:00–07:00 Uhr) kosten lediglich +€10 Aufschlag auf die €180 Tagespauschale (€190 gesamt).',
        'Gruppen ab 5 Personen erhalten auf WhatsApp vorab gerne ein passendes Fahrzeugangebot.',
      ],
      extraFaqs: [
        {
          q: 'Gibt es eine direkte Busverbindung von Paphos Airport nach Ayia Napa?',
          a: 'Nein, mit dem Bus ist mindestens ein Umstieg nötig (oft über 4 Stunden). Unser privater Transfer bringt Sie direkt in rund 2 Stunden für fest €180 ans Ziel.',
        },
        {
          q: 'Sind Ayia Thekla und Makronissos im €180-Tarif enthalten?',
          a: 'Ja, sämtliche Strandhotels und Villen von Ayia Thekla über Makronissos und Nissi Beach bis Grecian Bay sind inklusive.',
        },
      ],
    },
    pl: {
      overviewHeading: 'Lotnisko Pafos (PFO) – Ayia Napa: bezpośredni transfer przez wyspę (€180)',
      overviewParagraphs: [
        'Wiele bezpośrednich lotów z Europy ląduje w Pafos (PFO), nawet jeśli Twój hotel znajduje się w Ayia Napie. Przejazd autobusami przez cały Cypr z przesiadkami trwa ponad 4 godziny, podczas gdy prywatny sedan trasami A6, A1 i A3 pokonuje 175 km w około 2 godziny.',
        'Nasza baza w Limassol leży w połowie tej trasy, dlatego punktualnie odbieramy pasażerów z każdego nocnego lub opóźnionego rejsu.',
      ],
      dropOffHeading: 'Obsługiwane dzielnice w Ayia Napie',
      dropOffAreas: [
        'Nissi Beach i hotele przy plaży',
        'Makronissos i Landa Beach',
        'Port i centrum Ayia Napy',
        'Zatoka Grecian Bay',
        'Wille w Ayia Thekla i okolice Mariny',
      ],
      tipsHeading: 'Praktyczne uwagi przed długą trasą PFO → Ayia Napa',
      tips: [
        'W aucie mieszczą się wygodnie 4 osoby i 3 duże walizki przy w pełni sprawnej klimatyzacji.',
        'W nocy (23:00–07:00) doliczana jest tylko stała stawka +€10 (€190 łącznie).',
        'Dla grupy 5+ podróżnych skontaktuj się z nami wcześniej na WhatsApp.',
      ],
      extraFaqs: [
        {
          q: 'Jak najlepiej dotrzeć z lotniska Pafos do Ayia Napy bez przesiadek?',
          a: 'Autobusy wymagają przesiadek i zajmują ponad 4 godziny. Prywatny sedan za stałe €180 pokonuje trasę bezpośrednio w około 120 minut.',
        },
        {
          q: 'Czy w cenie €180 mieszczą się też Ayia Thekla i Makronissos?',
          a: 'Tak, wszystkie hotele od Ayia Thekli i Makronissos po Nissi Beach, centrum oraz Grecian Bay są objęte jedną ceną.',
        },
      ],
    },
    fr: {
      overviewHeading: "Aéroport de Paphos (PFO) vers Ayia Napa : traversée directe de l'île (180 €)",
      overviewParagraphs: [
        "De nombreux vols européens atterrissent à Paphos (PFO) pour des vacances à Ayia Napa. En transports publics, il faut compter plus de 4 heures et plusieurs correspondances, alors que notre berline emprunte les autoroutes A6, A1 et A3 sur 175 km en environ 2 heures.",
        "Notre base de Limassol se trouve à mi-chemin entre Paphos et Ayia Napa, garantissant une attente ponctuelle même sur les vols charters retardés ou nocturnes.",
      ],
      dropOffHeading: 'Zones desservies à Ayia Napa',
      dropOffAreas: [
        'Nissi Beach et complexes côtiers',
        'Makronissos et Landa Beach',
        "Port et centre d'Ayia Napa",
        'Grecian Bay',
        'Villas à Ayia Thekla & Marina',
      ],
      tipsHeading: 'Conseils pour le trajet PFO → Ayia Napa',
      tips: [
        "La berline accueille 4 passagers et 3 grandes valises dans un habitacle climatisé.",
        'Tarif nuit unique de +10 € entre 23h00 et 07h00 (190 € au total).',
        'Pour 5 passagers ou plus, écrivez-nous simplement sur WhatsApp avant le départ.',
      ],
      extraFaqs: [
        {
          q: "Existe-t-il un moyen direct sans changement de Paphos Airport à Ayia Napa ?",
          a: "Aucun bus direct ne traverse l'île. Notre transfert privé à 180 € fixes assure la liaison directe porte-à-porte en ~120 minutes.",
        },
        {
          q: 'Ayia Thekla et Makronissos sont-ils inclus dans les 180 € ?',
          a: 'Oui, toutes les zones hôtelières d’Ayia Thekla à Grecian Bay via Nissi Beach sont comprises.',
        },
      ],
    },
    el: {
      overviewHeading: 'Αεροδρόμιο Πάφου (PFO) – Αγία Νάπα: Απευθείας διαδρομή (€180)',
      overviewParagraphs: [
        'Πολλές ευρωπαϊκές πτήσεις φτάνουν στην Πάφο (PFO) για διακοπές στην Αγία Νάπα. Με τα δημόσια λεωφορεία η διαδρομή από άκρη σε άκρη απαιτεί αλλαγές και πάνω από 4 ώρες, ενώ με το ιδιωτικό μας sedan μέσω A6, A1 και A3 (175 χλμ) φτάνετε σε περίπου 2 ώρες.',
        'Η έδρα μας στη Λεμεσό βρίσκεται στο μέσο της διαδρομής, εξασφαλίζοντας έγκαιρη παραλαβή ακόμα και σε νυχτερινές πτήσεις.',
      ],
      dropOffHeading: 'Ζώνες παράδοσης στην Αγία Νάπα',
      dropOffAreas: [
        'Nissi Beach & παραλιακά ξενοδοχεία',
        'Μακρόνησος & Landa Beach',
        'Λιμάνι & κέντρο Αγίας Νάπας',
        'Κόλπος Grecian Bay',
        'Βίλες Αγίας Θέκλας & Μαρίνα',
      ],
      tipsHeading: 'Χρήσιμες συμβουλές για PFO → Αγία Νάπα',
      tips: [
        'Τα οχήματα χωρούν άνετα έως 4 επιβάτες και 3 μεγάλες αποσκευές με πλήρη κλιματισμό.',
        'Για νυχτερινές αφίξεις (23:00–07:00) προστίθεται μόνο +€10 στην τιμή ημέρας (€190 σύνολο).',
        'Για 5+ ταξιδιώτες επικοινωνήστε μαζί μας στο WhatsApp πριν την πτήση.',
      ],
      extraFaqs: [
        {
          q: 'Υπάρχει απευθείας μεταφορά από το αεροδρόμιο Πάφου στην Αγία Νάπα;',
          a: 'Δεν υπάρχει απευθείας λεωφορείο. Ο ιδιωτικός μας οδηγός καλύπτει τα 175 χλμ απευθείας σε ~120 λεπτά με σταθερή τιμή €180.',
        },
        {
          q: 'Καλύπτονται η Αγία Θέκλα και η Μακρόνησος με €180;',
          a: 'Ναι, από την Αγία Θέκλα και τη Μακρόνησο μέχρι το Nissi Beach και το κέντρο της Αγίας Νάπας ισχύει η ίδια τιμή.',
        },
      ],
    },
    it: {
      overviewHeading: 'Aeroporto di Paphos (PFO) – Ayia Napa: transfer diretto (€180)',
      overviewParagraphs: [
        'Molti voli europei atterrano a Paphos (PFO) per soggiorni sulla costa orientale di Ayia Napa. Con i mezzi pubblici la traversata richiede oltre 4 ore e vari cambi, mentre la nostra berlina privata lungo A6, A1 e A3 copre i 175 km direttamente in circa 2 ore.',
        'Operando da Limassol a metà percorso tra le due coste, garantiamo puntualità anche su arrivi notturni o voli charter riprogrammati.',
      ],
      dropOffHeading: 'Zone coperte ad Ayia Napa',
      dropOffAreas: [
        'Nissi Beach e fascia alberghiera',
        'Makronissos e Landa Beach',
        'Porto e centro di Ayia Napa',
        'Grecian Bay',
        'Ville di Ayia Thekla e Marina',
      ],
      tipsHeading: 'Consigli utili per la tratta PFO → Ayia Napa',
      tips: [
        'Ogni berlina accoglie comodamente 4 passeggeri e 3 valigie grandi con aria condizionata efficiente.',
        'La tariffa notturna tra le 23:00 e le 07:00 aggiunge soltanto +€10 fissi (€190 totali).',
        'Per gruppi di 5 o più viaggiatori contattaci prima su WhatsApp.',
      ],
      extraFaqs: [
        {
          q: 'Come raggiungere Ayia Napa da Paphos Airport senza cambiare autobus?',
          a: 'Non ci sono bus diretti tra le due città. Il nostro transfer privato copre i 175 km porta a porta in circa 120 minuti a €180 fissi.',
        },
        {
          q: 'Ayia Thekla e Makronissos rientrano nei €180?',
          a: 'Sì, tutta la zona da Ayia Thekla e Makronissos fino a Nissi Beach e Grecian Bay è compresa nella tariffa.',
        },
      ],
    },
  },

  'paphos-airport-to-protaras': {
    en: {
      overviewHeading: 'Paphos Airport (PFO) to Protaras & Fig Tree Bay: Direct Sedan (€190)',
      overviewParagraphs: [
        'Protaras sits along Cyprus’s far eastern coastline around Fig Tree Bay, Pernera, and Kapparis—185 km from Paphos Airport (PFO). Rather than navigating multiple bus timetables after landing, our direct highway route (A6, A1, and A3 via Limassol) brings families and couples straight to their villa or beachfront hotel in ~130 minutes.',
        'At €190 fixed per vehicle (up to 4 passengers and 3 full-size suitcases), you get uninterrupted door-to-door comfort plus free child seats upon request.',
      ],
      dropOffHeading: 'Protaras & Paralimni Coastal Drop-Off Areas',
      dropOffAreas: [
        'Fig Tree Bay & Protaras Central Strip',
        'Pernera Hotels & Coastal Villas',
        'Kapparis Bay & Malama Beach',
        'Konnos Bay & Cape Greco Approach',
        'Green Bay & Sunrise Beach',
      ],
      tipsHeading: 'Tips for Families Heading to Protaras from PFO',
      tips: [
        'Specify rear-facing infant seats or booster seats in your booking comment so they arrive pre-installed.',
        'Night arrivals (23:00–07:00) carry only the flat +€10 night supplement (€200 total).',
        'Share a hotel name or Airbnb Google Maps link if staying tucked into Pernera or Kapparis villa lanes.',
      ],
      extraFaqs: [
        {
          q: 'Do you drive straight to Pernera and Kapparis villas near Protaras?',
          a: 'Yes, our €190 fixed fare includes direct doorstep drop-off throughout Protaras, Fig Tree Bay, Pernera, Kapparis, and Konnos Bay.',
        },
        {
          q: 'Are child seats available for the 2-hour drive from PFO to Protaras?',
          a: 'Yes, child and booster seats can be requested free of charge during booking for safe family travel along the motorway.',
        },
      ],
    },
    ru: {
      overviewHeading: 'Аэропорт Пафос (PFO) — Протарас и Fig Tree Bay: прямой трансфер (€190)',
      overviewParagraphs: [
        'Курорт Протарас на крайнем востоке Кипра (бухта Fig Tree Bay, Пернера и Каппарис) расположен в 185 км от аэропорта Пафоса (PFO). Вместо долгой дороги с пересадками на автобусах мы везём напрямую по магистралям A6, A1 и A3 через Лимассол примерно за 130 минут.',
        'Фиксированная стоимость €190 за весь автомобиль (до 4 пассажиров и 3 чемоданов) особенно удобна для семей с детьми — детские кресла предоставляются бесплатно по запросу при бронировании.',
      ],
      dropOffHeading: 'Районы высадки в Протарасе и окрестностях',
      dropOffAreas: [
        'Бухта Fig Tree Bay и центр Протараса',
        'Пернера и береговые виллы',
        'Каппарис и пляж Малама',
        'Залив Коннос (Konnos Bay)',
        'Sunrise Beach и Green Bay',
      ],
      tipsHeading: 'Советы семьям по маршруту PFO — Протарас',
      tips: [
        'Укажите возраст ребёнка в комментарии к заказу, чтобы водитель заранее установил подходящее кресло или бустер.',
        'В ночное время (23:00–07:00) действует только доплата +€10 (€200 за машину).',
        'Для уединённых вилл в Пернере и Каппарисе отправьте точную точку Google Maps.',
      ],
      extraFaqs: [
        {
          q: 'Довозите ли вы прямо до вилл в Пернере и Каппарисе?',
          a: 'Да, единая цена €190 покрывает весь Протарас, Fig Tree Bay, Пернеру, Каппарис и бухту Коннос до двери виллы или отеля.',
        },
        {
          q: 'Можно ли заказать детское кресло на двухчасовую дорогу из Пафоса?',
          a: 'Да, просто укажите это при оформлении заказа — детское кресло или бустер подготовим бесплатно.',
        },
      ],
    },
    de: {
      overviewHeading: 'Flughafen Paphos (PFO) nach Protaras & Fig Tree Bay: Direktfahrt (€190)',
      overviewParagraphs: [
        'Protaras mit der Fig Tree Bay, Pernera und Kapparis liegt ganz im Osten Zyperns — rund 185 km vom Flughafen Paphos (PFO) entfernt. Über die Autobahnen A6, A1 und A3 vorbei an Limassol bringt Sie unsere private Limousine ohne Umstieg in etwa 130 Minuten direkt vor Ihre Unterkunft.',
        'Der Festpreis von €190 gilt pro Fahrzeug (bis zu 4 Gäste, 3 Koffer). Kindersitze für die rund zweistündige Küstenfahrt montieren wir auf Wunsch kostenlos vorab.',
      ],
      dropOffHeading: 'Zielzonen rund um Protaras',
      dropOffAreas: [
        'Fig Tree Bay & Zentrum Protaras',
        'Pernera Strandhotels & Villen',
        'Kapparis & Malama Beach',
        'Konnos Bay Richtung Cape Greco',
        'Sunrise Beach',
      ],
      tipsHeading: 'Tipps für Familien auf dem Weg nach Protaras',
      tips: [
        'Tragen Sie benötigte Babyschalen oder Sitzerhöhungen einfach im Kommentarfeld bei der Buchung ein.',
        'Zwischen 23:00 und 07:00 Uhr gilt lediglich die Pauschale von +€10 Nachttarif (€200 gesamt).',
        'Für Ferienvillen in Nebenstraßen von Pernera oder Kapparis empfiehlt sich ein Google-Maps-Pin.',
      ],
      extraFaqs: [
        {
          q: 'Gilt der Preis von €190 auch für Villen in Pernera und Kapparis?',
          a: 'Ja, Protaras Zentrum, Fig Tree Bay, Pernera, Kapparis und Konnos Bay werden zum selben Festpreis angefahren.',
        },
        {
          q: 'Können Kindersitze vorab bestellt werden?',
          a: 'Ja, vermerken Sie einfach die gewünschte Anzahl und das Alter bei der Buchung.',
        },
      ],
    },
    pl: {
      overviewHeading: 'Lotnisko Pafos (PFO) – Protaras i Fig Tree Bay: prosto na wschód (€190)',
      overviewParagraphs: [
        'Protaras z zatoką Fig Tree Bay, Pernerą i Kapparis leży na wschodnim krańcu Cypru — 185 km od lotniska w Pafos (PFO). Zamiast przesiadek autobusowych oferujemy bezpośredni przejazd autostradami A6, A1 i A3 przez Limassol w około 130 minut.',
        'Stała stawka €190 obejmuje cały sedan dla maksymalnie 4 pasażerów i 3 dużych walizek. Foteliki dziecięce na dwugodzinną trasę montujemy bezpłatnie na życzenie.',
      ],
      dropOffHeading: 'Obsługiwane miejsca wokół Protaras',
      dropOffAreas: [
        'Fig Tree Bay i centrum Protaras',
        'Pernera (hotele i wille)',
        'Kapparis i Malama Beach',
        'Zatoka Konnos Bay',
        'Sunrise Beach i Green Bay',
      ],
      tipsHeading: 'Porady dla rodzin na trasie PFO → Protaras',
      tips: [
        'W uwagach do rezerwacji wpisz potrzebę fotelika lub podstawki dla dziecka.',
        'Nocne przyloty (23:00–07:00) wiążą się tylko ze stałą dopłatą +€10 (€200 razem).',
        'Przy wynajmie willi w Pernerze lub Kapparis warto dołączyć pinezkę z Google Maps.',
      ],
      extraFaqs: [
        {
          q: 'Czy kierowca dowozi również do willi w Pernerze i Kapparis?',
          a: 'Tak, cena €190 obejmuje dowóz pod drzwi w całym Protaras, Fig Tree Bay, Pernerze, Kapparis i Konnos Bay.',
        },
        {
          q: 'Czy dostępne są foteliki dziecięce na trasę do Protaras?',
          a: 'Tak, foteliki przygotowujemy bez dodatkowych opłat po zaznaczeniu tego w formularzu zamówienia.',
        },
      ],
    },
    fr: {
      overviewHeading: 'Aéroport de Paphos (PFO) vers Protaras & Fig Tree Bay : trajet direct (190 €)',
      overviewParagraphs: [
        "Protaras (Fig Tree Bay, Pernera et Kapparis) se trouve à l'extrémité orientale de Chypre, à 185 km de l'aéroport de Paphos (PFO). Nos berlines relient directement PFO à la côte est par les autoroutes A6, A1 et A3 via Limassol en ~130 minutes, sans aucune correspondance.",
        "Pour 190 € fixes par voiture (jusqu'à 4 voyageurs et 3 valises), vous bénéficiez d'un accueil personnalisé et de sièges enfants gratuits sur demande préalable.",
      ],
      dropOffHeading: 'Zones desservies à Protaras',
      dropOffAreas: [
        'Fig Tree Bay & centre de Protaras',
        'Pernera (hôtels et villas)',
        'Kapparis & Malama Beach',
        'Baie de Konnos (Konnos Bay)',
        'Sunrise Beach & Green Bay',
      ],
      tipsHeading: 'Conseils aux familles pour Protaras',
      tips: [
        'Précisez vos besoins en rehausseur ou siège bébé dans le champ commentaire.',
        'Tarif nuit forfaitaire : seulement +10 € entre 23h00 et 07h00 (200 € au total).',
        'Pour les villas situées à Pernera ou Kapparis, partagez si possible un lien Google Maps.',
      ],
      extraFaqs: [
        {
          q: 'Desservez-vous aussi Pernera et Kapparis au tarif de 190 € ?',
          a: 'Oui, Protaras, Fig Tree Bay, Pernera, Kapparis et Konnos Bay sont inclus dans le forfait de 190 €.',
        },
        {
          q: 'Peut-on réserver des sièges auto enfants pour cette longue route ?',
          a: "Oui, ils sont fournis sans supplément lorsqu'ils sont demandés lors de la réservation.",
        },
      ],
    },
    el: {
      overviewHeading: 'Αεροδρόμιο Πάφου (PFO) – Πρωταράς & Fig Tree Bay: Απευθείας (€190)',
      overviewParagraphs: [
        'Ο Πρωταράς (Fig Tree Bay, Περνέρα και Κάππαρης) απέχει 185 χλμ από το Αεροδρόμιο Πάφου (PFO). Αποφεύγοντας τις πολύωρες αλλαγές λεωφορείων, το ιδιωτικό μας sedan διασχίζει τους αυτοκινητόδρομους A6, A1 και A3 μέσω Λεμεσού σε περίπου 130 λεπτά.',
        'Η σταθερή τιμή €190 ανά όχημα (έως 4 άτομα & 3 βαλίτσες) περιλαμβάνει παράδοση στην είσοδο του ξενοδοχείου ή της βίλας και δωρεάν παιδικά καθίσματα κατόπιν αιτήματος.',
      ],
      dropOffHeading: 'Περιοχές παράδοσης στον Πρωταρά',
      dropOffAreas: [
        'Fig Tree Bay & κέντρο Πρωταρά',
        'Περνέρα (ξενοδοχεία & βίλες)',
        'Κάππαρης & παραλία Μαλάμα',
        'Κόλπος Κόννου (Konnos Bay)',
        'Sunrise Beach & Green Bay',
      ],
      tipsHeading: 'Συμβουλές για οικογένειες προς Πρωταρά',
      tips: [
        'Αναφέρετε την ηλικία των παιδιών στα σχόλια κράτησης για προεγκατεστημένο παιδικό κάθισμα.',
        'Σε αφίξεις 23:00–07:00 προστίθεται μόνο σταθερό νυχτερινό τέλος +€10 (€200 τελική τιμή).',
        'Για απομονωμένες βίλες σε Περνέρα και Κάππαρη βοηθά να μας στείλετε το στίγμα στο Google Maps.',
      ],
      extraFaqs: [
        {
          q: 'Καλύπτει η τιμή €190 την Περνέρα και τον Κάππαρη;',
          a: 'Ναι, ολόκληρος ο Πρωταράς, το Fig Tree Bay, η Περνέρα, ο Κάππαρης και ο Κόλπος Κόννου περιλαμβάνονται στα €190.',
        },
        {
          q: 'Διαθέτετε παιδικά καθίσματα για τη 2ωρη διαδρομή από PFO;',
          a: 'Ναι, παρέχονται δωρεάν εφόσον το σημειώσετε κατά την κράτηση.',
        },
      ],
    },
    it: {
      overviewHeading: 'Aeroporto di Paphos (PFO) – Protaras & Fig Tree Bay: transfer (€190)',
      overviewParagraphs: [
        'Protaras, con Fig Tree Bay, Pernera e Kapparis, si trova sulla costa più orientale a 185 km dall’aeroporto di Paphos (PFO). Evitando più cambi in autobus, percorriamo le autostrade A6, A1 e A3 via Limassol direttamente fino al tuo alloggio in circa 130 minuti.',
        'La tariffa fissa di €190 per berlina (fino a 4 passeggeri e 3 valigie) include il servizio porta a porta e seggiolini per bambini gratuiti su richiesta.',
      ],
      dropOffHeading: 'Zone servite a Protaras',
      dropOffAreas: [
        'Fig Tree Bay e centro di Protaras',
        'Pernera (hotel e ville)',
        'Kapparis e Malama Beach',
        'Konnos Bay',
        'Sunrise Beach e Green Bay',
      ],
      tipsHeading: 'Consigli per famiglie verso Protaras',
      tips: [
        'Indica eventuali seggiolini o rialzi nelle note al momento della prenotazione.',
        'Tra le 23:00 e le 07:00 è previsto solo il supplemento fisso notturno di +€10 (€200 totali).',
        'Per ville nelle strade interne di Pernera o Kapparis è utile condividere il pin Google Maps.',
      ],
      extraFaqs: [
        {
          q: 'La tariffa di €190 vale anche per Pernera e Kapparis?',
          a: 'Sì, Protaras, Fig Tree Bay, Pernera, Kapparis e Konnos Bay sono tutti inclusi nei €190 fissi.',
        },
        {
          q: 'Fornite seggiolini per bambini per il tragitto da PFO a Protaras?',
          a: 'Sì, gratuitamente su richiesta in fase di prenotazione.',
        },
      ],
    },
  },

  'paphos-airport-to-nicosia': {
    en: {
      overviewHeading: 'Paphos Airport (PFO) to Nicosia: Direct Transfer to Cyprus’s Capital (€150)',
      overviewParagraphs: [
        'Business visitors, university students, and diplomats landing at Paphos Airport (PFO) need a straightforward link inland to Nicosia. Our route takes the A6 east to Limassol and heads north along the A1 motorway past Kofinou straight into the capital in roughly 100 minutes (145 km).',
        'Public shuttle frequency between PFO and Nicosia is limited and drops only at peripheral terminals. With a fixed €150 private sedan, you arrive directly at your hotel, embassy, or central Old City pedestrian checkpoint without hauling luggage across town.',
      ],
      dropOffHeading: 'Key Drop-Off Districts in Nicosia',
      dropOffAreas: [
        'Walled Old City & Ledra Street / Eleftheria Square',
        'Engomi (Universities & Embassies)',
        'Strovolos & Acropolis Business District',
        'Nicosia City Center Hotels (Hilton / Landmark area)',
        'Latsia & Aglantzia',
      ],
      tipsHeading: 'Practical Tips for PFO → Nicosia Travel',
      tips: [
        'If your accommodation sits inside the pedestrian lanes near Ledra Street, we arrange drop-off at the nearest car access square.',
        'Morning weekday arrivals approaching Nicosia between 07:30 and 09:00 can face short entry queues on the A1; plan meetings accordingly.',
        'Receipts/confirmations from your online booking make business expense reimbursement straightforward.',
      ],
      extraFaqs: [
        {
          q: 'Can you drop passengers at the Ledra Street crossing or Old City hotels in Nicosia?',
          a: 'Yes, drivers deliver you right up to Eleftheria Square or the nearest vehicle-accessible drop-off point beside Old City hotels and crossings.',
        },
        {
          q: 'Does the €150 rate cover Engomi and Strovolos as well as central Nicosia?',
          a: 'Yes, Nicosia center, Engomi, Strovolos, Aglantzia, and Latsia are all included in the fixed €150 sedan fare.',
        },
      ],
    },
    ru: {
      overviewHeading: 'Аэропорт Пафос (PFO) — Никосия: прямой трансфер в столицу (€150)',
      overviewParagraphs: [
        'Для деловых поездок, учёбы и посещения посольств из аэропорта Пафоса (PFO) в Никосию удобнее всего прямой выезд по магистралям A6 через Лимассол и далее на север по скоростной A1 мимо Кофину. Дорога длиной 145 км занимает около 100 минут без пересадок.',
        'В отличие от редких междугородних шаттлов, останавливающихся на въезде в столицу, фиксированный тариф €150 включает подачу прямо к отелю, университетам Энгоми или границе пешеходного Старого города.',
      ],
      dropOffHeading: 'Основные районы Никосии в маршруте',
      dropOffAreas: [
        'Старый город, площадь Элефтерия и улица Ледра',
        'Энгоми (кампусы университетов и посольства)',
        'Строволос и деловой квартал Акрополис',
        'Деловые отели центра (район Landmark)',
        'Лация и Агландзия',
      ],
      tipsHeading: 'Полезно знать при поездке PFO — Никосия',
      tips: [
        'Если адрес в Старом городе находится в пешеходной зоне, водитель подвезёт максимально близко к удобному выходу к улице Ледра.',
        'В будни с 07:30 до 09:00 на въезде в Никосию со стороны A1 возможен плотный трафик — закладывайте небольшой запас перед встречами.',
        'Онлайн-подтверждение и оплата по карте удобны для командировочной отчётности.',
      ],
      extraFaqs: [
        {
          q: 'Подвозите ли вы к улице Ледра и границе Старого города Никосии?',
          a: 'Да, автомобиль подъезжает прямо к площади Элефтерия или ближайшей разрешённой точке высадки рядом с пешеходной зоной.',
        },
        {
          q: 'Входят ли Энгоми и Строволос в стоимость €150?',
          a: 'Да, центр Никосии, Энгоми, Строволос, Агландзия и Лация обслуживаются по единой цене €150 за машину.',
        },
      ],
    },
    de: {
      overviewHeading: 'Flughafen Paphos (PFO) nach Nikosia: Direkter Transfer in die Hauptstadt (€150)',
      overviewParagraphs: [
        'Geschäftsreisende, Studierende und Diplomaten gelangen vom Flughafen Paphos (PFO) über die A6 bis Limassol und anschließend nordwärts über die A1 direkt nach Nikosia (145 km in ca. 100 Minuten).',
        'Statt am Stadtrand aus einem Shuttlebus umzusteigen, fährt Sie unsere Limousine für fest €150 unmittelbar zu Hotels im Zentrum, nach Engomi oder an die Altstadtgrenze.',
      ],
      dropOffHeading: 'Abgedeckte Stadtteile in Nikosia',
      dropOffAreas: [
        'Altstadt, Eleftheria Square & Ledra Street',
        'Engomi (Universitäten & Botschaften)',
        'Strovolos & Acropolis Business District',
        'Zentrale Business-Hotels',
        'Latsia & Aglantzia',
      ],
      tipsHeading: 'Tipps für die Fahrt nach Nikosia',
      tips: [
        'Bei Zielen in der Fußgängerzone der Altstadt erfolgt der Ausstieg am nächstgelegenen Zufahrtspunkt.',
        'Werktags zwischen 07:30 und 09:00 Uhr staut sich die A1-Einfahrt gelegentlich leicht — planen Sie vor Terminen etwas Puffer ein.',
        'Buchungsbelege eignen sich problemlos für Spesenabrechnungen.',
      ],
      extraFaqs: [
        {
          q: 'Bringt der Fahrer Gäste bis nahe an die Ledra Street in der Altstadt?',
          a: 'Ja, wir setzen Sie direkt am Eleftheria Square oder an der nächstgelegenen Zufahrt zur Fußgängerzone ab.',
        },
        {
          q: 'Deckt der €150-Preis auch Engomi und Strovolos ab?',
          a: 'Ja, neben dem Zentrum sind Engomi, Strovolos, Aglantzia und Latsia komplett abgedeckt.',
        },
      ],
    },
    pl: {
      overviewHeading: 'Lotnisko Pafos (PFO) – Nikozja: bezpośredni przejazd do stolicy (€150)',
      overviewParagraphs: [
        'Podróżni biznesowi i studenci przylatujący do Pafos (PFO) docierają do Nikozji autostradami A6 przez Limassol i dalej na północ trasą A1 — 145 km zajmuje około 100 minut bez przesiadek.',
        'Zamiast wysiadać na peryferyjnym dworcu autobusowym, prywatnym sedanem za €150 dojeżdżasz prosto pod hotel, kampus w Engomi lub wejście na starówkę.',
      ],
      dropOffHeading: 'Dzielnice Nikozji objęte trasą',
      dropOffAreas: [
        'Stare Miasto, Plac Eleftheria i Ledra Street',
        'Engomi (uczelnie i ambasady)',
        'Strovolos i biznesowy Acropolis',
        'Hotele w centrum Nikozji',
        'Latsia i Aglantzia',
      ],
      tipsHeading: 'Wskazówki dla trasy PFO → Nikozja',
      tips: [
        'Dla adresów przy deptaku Ledra Street wysiadka odbywa się na najbliższym dostępnym placu dla aut.',
        'W dni robocze między 07:30 a 09:00 wjazd do Nikozji od A1 bywa wolniejszy — warto uwzględnić zapas przed spotkaniem.',
        'Potwierdzenie płatności online wygodnie służy do rozliczeń delegacji.',
      ],
      extraFaqs: [
        {
          q: 'Czy kierowca dowozi w pobliże ulicy Ledra w Nikozji?',
          a: 'Tak, podwozimy pod Plac Eleftheria lub najbliższy możliwy dojazd samochodowy na Starym Mieście.',
        },
        {
          q: 'Czy stawka €150 obejmuje Engomi i Strovolos?',
          a: 'Tak, centrum Nikozji, Engomi, Strovolos, Latsia i Aglantzia mieszczą się w stałej cenie €150.',
        },
      ],
    },
    fr: {
      overviewHeading: 'Aéroport de Paphos (PFO) vers Nicosie : liaison directe vers la capitale (150 €)',
      overviewParagraphs: [
        "Depuis l'aéroport de Paphos (PFO), la route vers Nicosie suit l'autoroute A6 jusqu'à Limassol puis remonte vers le nord par l'A1 sur 145 km (~100 minutes), offrant la liaison la plus fluide pour les séjours professionnels, universitaires ou diplomatiques.",
        "Au lieu de déposer les passagers à un terminal périphérique, notre berline à 150 € fixes vous conduit directement devant votre hôtel du centre, à Engomi ou à l'entrée de la vieille ville.",
      ],
      dropOffHeading: 'Quartiers desservis à Nicosie',
      dropOffAreas: [
        'Vieille ville, Place Eleftheria & Rue Ledra',
        'Engomi (universités & ambassades)',
        'Strovolos & quartier d’affaires Acropolis',
        'Hôtels du centre-ville',
        'Latsia & Aglantzia',
      ],
      tipsHeading: 'Conseils pour le transfert PFO → Nicosie',
      tips: [
        "Si votre hébergement est dans la zone piétonne de la rue Ledra, la dépose s'effectue au point d'accès véhicule le plus proche.",
        'En semaine de 07h30 à 09h00, prévoyez une petite marge à l’entrée de Nicosie sur l’A1.',
        'Vos reçus de réservation en ligne facilitent les notes de frais.',
      ],
      extraFaqs: [
        {
          q: 'Déposez-vous près de la rue Ledra et du centre historique de Nicosie ?',
          a: "Oui, jusqu'à la place Eleftheria ou l'accès routier immédiat de la vieille ville.",
        },
        {
          q: 'Engomi et Strovolos sont-ils compris dans les 150 € ?',
          a: 'Oui, le centre, Engomi, Strovolos, Latsia et Aglantzia sont couverts au tarif fixe de 150 €.',
        },
      ],
    },
    el: {
      overviewHeading: 'Αεροδρόμιο Πάφου (PFO) – Λευκωσία: Απευθείας στην πρωτεύουσα (€150)',
      overviewParagraphs: [
        'Για επαγγελματικά ταξίδια, φοιτητές και διπλωματικές αποστολές από το Αεροδρόμιο Πάφου (PFO), η διαδρομή μέσω A6 προς Λεμεσό και βόρεια μέσω A1 (145 χλμ) οδηγεί στη Λευκωσία σε περίπου 100 λεπτά.',
        'Με σταθερή τιμή €150 ανά sedan φτάνετε κατευθείαν στο ξενοδοχείο σας, στην Έγκωμη ή στα όρια της παλιάς πόλης, αποφεύγοντας τις απομακρυσμένες στάσεις λεωφορείων.',
      ],
      dropOffHeading: 'Περιοχές εξυπηρέτησης στη Λευκωσία',
      dropOffAreas: [
        'Εντός τειχών Παλιά Πόλη, Πλατεία Ελευθερίας & Λήδρας',
        'Έγκωμη (Πανεπιστήμια & Πρεσβείες)',
        'Στρόβολος & Ακρόπολη',
        'Κεντρικά ξενοδοχεία Λευκωσίας',
        'Λατσιά & Αγλαντζιά',
      ],
      tipsHeading: 'Χρήσιμες επισημάνσεις για PFO → Λευκωσία',
      tips: [
        'Για πεζοδρομημένες διευθύνσεις κοντά στη Λήδρας, η αποβίβαση γίνεται στο πλησιέστερο προσβάσιμο σημείο.',
        'Τις καθημερινές 07:30–09:00 η είσοδος της Λευκωσίας από τον A1 έχει αυξημένη κίνηση — υπολογίστε μικρό περιθώριο.',
        'Η online επιβεβαίωση διευκολύνει τη λογιστική κάλυψη επαγγελματικών μετακινήσεων.',
      ],
      extraFaqs: [
        {
          q: 'Μπορείτε να μας αφήσετε κοντά στην οδό Λήδρας και στην Πλατεία Ελευθερίας;',
          a: 'Ναι, ο οδηγός φτάνει στην Πλατεία Ελευθερίας ή στο πιο κοντινό σημείο οδικής πρόσβασης στην παλιά πόλη.',
        },
        {
          q: 'Καλύπτονται η Έγκωμη και ο Στρόβολος στα €150;',
          a: 'Ναι, το κέντρο, η Έγκωμη, ο Στρόβολος, τα Λατσιά και η Αγλαντζιά περιλαμβάνονται στην τιμή €150.',
        },
      ],
    },
    it: {
      overviewHeading: 'Aeroporto di Paphos (PFO) – Nicosia: transfer diretto nella capitale (€150)',
      overviewParagraphs: [
        'Per viaggi di lavoro, studio o diplomatici dall’aeroporto di Paphos (PFO), il collegamento più rapido per Nicosia segue la A6 verso Limassol per poi salire a nord lungo la A1 in circa 100 minuti (145 km).',
        'Con la tariffa fissa di €150 eviti le fermate periferiche delle navette e arrivi direttamente davanti a hotel centrali, università di Engomi o ai margini della città vecchia.',
      ],
      dropOffHeading: 'Quartieri coperti a Nicosia',
      dropOffAreas: [
        'Città Vecchia, Piazza Eleftheria & Ledra Street',
        'Engomi (università e ambasciate)',
        'Strovolos & distretto Acropolis',
        'Hotel del centro',
        'Latsia & Aglantzia',
      ],
      tipsHeading: 'Consigli per la tratta PFO → Nicosia',
      tips: [
        'Se il tuo hotel è nella zona pedonale vicino a Ledra Street, ti accompagniamo al punto d’accesso veicolare più vicino.',
        'Nei giorni feriali tra le 07:30 e le 09:00 considera qualche minuto di margine in ingresso sulla A1.',
        'La ricevuta di prenotazione online semplifica i rimborsi aziendali.',
      ],
      extraFaqs: [
        {
          q: 'Arrivate vicino a Ledra Street e alla Città Vecchia di Nicosia?',
          a: 'Sì, accompagniamo fino a Piazza Eleftheria o al più vicino punto carrozzabile.',
        },
        {
          q: 'La tariffa di €150 include anche Engomi e Strovolos?',
          a: 'Sì, centro di Nicosia, Engomi, Strovolos, Latsia e Aglantzia sono tutti inclusi.',
        },
      ],
    },
  },

  'larnaca-airport-to-coral-bay': {
    en: {
      overviewHeading: 'Larnaca Airport (LCA) to Coral Bay: Door-to-Villa Coastal Route (€150)',
      overviewParagraphs: [
        'Coral Bay and the surrounding Pegeia hillside are famed for private holiday villas and sandy coves northwest of Paphos, 148 km from Larnaca Airport (LCA). After passing Limassol and Paphos on the A5, A1, and A6, our drivers continue northwest along the coastal B7/E701 straight into your villa driveway in ~100 minutes.',
        'Because many Coral Bay villas sit on quiet residential cul-de-sacs with self check-in key boxes, getting a direct sedan drop-off beats hauling bags off a city bus plus two local taxis.',
      ],
      dropOffHeading: 'Coral Bay & Pegeia Drop-Off Areas',
      dropOffAreas: [
        'Coral Bay Strip & Coral Beach Hotel Area',
        'Maa-Palaeokastro & Corallia Bay',
        'Pegeia (Peyia) Hillside Villas',
        'Sea Caves & Agios Georgios Harbour',
        'Kissonerga Coastal Road Access',
      ],
      tipsHeading: 'Villa Arrival Tips for Coral Bay Guests',
      tips: [
        'If your villa uses a Google Maps pin rather than a street number, paste the coordinates or send them via WhatsApp after booking.',
        'Late landings between 23:00 and 07:00 add only +€10 night fee (€160 total), and your driver helps locate dark villa gates smoothly.',
        'Add return booking for a 10% return discount (€270 total round trip during daytime hours).',
      ],
      extraFaqs: [
        {
          q: 'Can the driver find a private holiday villa in Coral Bay or Sea Caves at night?',
          a: 'Yes! Share your villa name or Google Maps link via checkout comments or WhatsApp (+357 96 867289) so our driver navigates directly to your gate.',
        },
        {
          q: 'Is Corallia Bay and Sea Caves included in the €150 Coral Bay rate?',
          a: 'Yes, Coral Bay central strip, Corallia Bay, Maa-Palaeokastro, and Sea Caves villas are covered within €150.',
        },
      ],
    },
    ru: {
      overviewHeading: 'Аэропорт Ларнака (LCA) — Корал Бэй: трансфер прямо к вилле (€150)',
      overviewParagraphs: [
        'Курорт Корал Бэй и холмы Пейи к северо-западу от Пафоса ценят за песчаные бухты и уединённые виллы. Расстояние от аэропорта Ларнаки (LCA) составляет 148 км: пройдя магистрали A5, A1 и A6 мимо Лимассола и Пафоса, водитель сворачивает на прибрежную дорогу B7/E701 и подвозит вас к воротам виллы примерно за 100 минут.',
        'Для вилл с самостоятельным заселением через кейбокс прямой трансфер за €150 за машину избавляет от поиска вечернего такси в Пафосе с чемоданами.',
      ],
      dropOffHeading: 'Зоны высадки в Корал Бэй и Пейе',
      dropOffAreas: [
        'Главная улица Coral Bay Strip и Coral Beach Hotel',
        'Бухта Кораллия (Corallia Bay) и Маа-Палеокастро',
        'Виллы на склонах Пейи (Pegeia Hills)',
        'Морские пещеры (Sea Caves) и гавань Агиос Георгиос',
        'Побережье Киссонерга',
      ],
      tipsHeading: 'Советы для гостей вилл в Корал Бэй',
      tips: [
        'Если у виллы нет точного номера дома, просто пришлите ссылку или координаты Google Maps в комментарий или в WhatsApp.',
        'В ночное время (23:00–07:00) добавляется лишь +€10 к тарифу €150 (€160 итого), водитель поможет найти нужный заезд.',
        'Бронирование туда-обратно снижает стоимость обратного пути на 10% (€270 днём за обе поездки).',
      ],
      extraFaqs: [
        {
          q: 'Сможет ли водитель найти частную виллу в Корал Бэй или районе Sea Caves ночью?',
          a: 'Да! Пришлите название виллы или точку Google Maps в заказе либо в WhatsApp (+357 96 867289), и мы доставим вас прямо к воротам.',
        },
        {
          q: 'Входит ли район Sea Caves и пляж Corallia Bay в цену €150?',
          a: 'Да, центральная улица Coral Bay, бухта Кораллия и виллы Sea Caves обслуживаются за фиксированные €150.',
        },
      ],
    },
    de: {
      overviewHeading: 'Flughafen Larnaka (LCA) nach Coral Bay: Direkt bis zur Ferienvilla (€150)',
      overviewParagraphs: [
        'Coral Bay und die umliegende Region Pegeia nordwestlich von Paphos sind berühmt für ruhige Ferienvillen und Sandbuchten — 148 km vom Flughafen Larnaka (LCA). Nach A5, A1 und A6 über Limassol folgt Ihr Fahrer der Küstenstraße B7/E701 in etwa 100 Minuten bis vor Ihr Tor.',
        'Gerade bei Villen mit spätem Check-in per Schlüsselbox spart der direkte Festpreis-Transfer für €150 das mühsame Umsteigen mit Koffern.',
      ],
      dropOffHeading: 'Zielgebiete in Coral Bay & Umgebung',
      dropOffAreas: [
        'Coral Bay Strip & Coral Beach Hotel',
        'Corallia Bay & Maa-Palaeokastro',
        'Hangvillen in Pegeia',
        'Sea Caves & Agios Georgios Hafen',
        'Küstenabschnitt Kissonerga',
      ],
      tipsHeading: 'Tipps für Villa-Gäste auf dem Weg nach Coral Bay',
      tips: [
        'Schicken Sie bei Villen ohne Hausnummer einfach die Google-Maps-Koordinaten im Kommentar oder per WhatsApp.',
        'Späte Landungen zwischen 23:00 und 07:00 Uhr kosten nur +€10 Nachtzuschlag (€160 gesamt).',
        'Hin- und Rückfahrt ergeben tagsüber dank 10 % Rückfahrtrabatt €270 komplett.',
      ],
      extraFaqs: [
        {
          q: 'Findet der Chauffeur abgelegene Villen in Coral Bay oder bei den Sea Caves nachts?',
          a: 'Ja, senden Sie einfach den Villennamen oder Google-Maps-Pin vorab per WhatsApp (+357 96 867289).',
        },
        {
          q: 'Sind Corallia Bay und Sea Caves im €150-Festpreis inbegriffen?',
          a: 'Ja, Coral Bay Strip, Corallia Bay und Sea Caves werden zum festen Preis von €150 bedient.',
        },
      ],
    },
    pl: {
      overviewHeading: 'Lotnisko Larnaka (LCA) – Coral Bay: transfer prosto pod willę (€150)',
      overviewParagraphs: [
        'Coral Bay i okolice Pegei słyną z piaszczystych zatok oraz prywatnych willi na północny zachód od Pafos, 148 km od lotniska w Larnace (LCA). Po przejechaniu A5, A1 i A6 przez Limassol kierowca kieruje się trasą B7/E701 wzdłuż wybrzeża i dowozi Cię w około 100 minut.',
        'W przypadku willi z nocnym zameldowaniem na skrytkę na klucze przejazd za stałe €150 eliminuje stres szukania taksówek po nocy.',
      ],
      dropOffHeading: 'Strefy docelowe w Coral Bay',
      dropOffAreas: [
        'Coral Bay Strip i rejon Coral Beach Hotel',
        'Corallia Bay i Maa-Palaeokastro',
        'Wille na wzgórzach Pegeia',
        'Sea Caves i przystań Agios Georgios',
        'Wybrzeże Kissonerga',
      ],
      tipsHeading: 'Porady przy wynajmie willi w Coral Bay',
      tips: [
        'Gdy willa nie ma numeru ulicy, prześlij współrzędne Google Maps w uwagach lub na WhatsApp.',
        'W nocy (23:00–07:00) obowiązuje jedynie stała dopłata +€10 (€160 łącznie).',
        'Przy zamówieniu powrotu działa 10% zniżki na kurs powrotny (€270 w dzień w obie strony).',
      ],
      extraFaqs: [
        {
          q: 'Czy kierowca bez problemu trafi nocą pod prywatną willę w Coral Bay lub Sea Caves?',
          a: 'Tak — podaj w uwagach nazwę willi albo wyślij pinezkę Google Maps na WhatsApp (+357 96 867289).',
        },
        {
          q: 'Czy Corallia Bay i Sea Caves mieszczą się w cenie €150?',
          a: 'Tak, cała strefa Coral Bay, Corallia Bay oraz Sea Caves wchodzi w podstawową stawkę €150.',
        },
      ],
    },
    fr: {
      overviewHeading: 'Aéroport de Larnaca (LCA) vers Coral Bay : accès direct en villa (150 €)',
      overviewParagraphs: [
        "Coral Bay et les hauteurs de Pegeia, réputés pour leurs villas de vacances au nord-ouest de Paphos, se trouvent à 148 km de Larnaca (LCA). Après les autoroutes A5, A1 et A6 via Limassol, votre chauffeur longe la B7/E701 pour vous déposer en ~100 minutes devant votre portail.",
        "Pour les villas équipées d'une boîte à clés, le tarif fixe de 150 € par voiture vous évite de multiples correspondances nocturnes avec vos bagages.",
      ],
      dropOffHeading: 'Secteurs couverts autour de Coral Bay',
      dropOffAreas: [
        'Coral Bay Strip & Coral Beach Hotel',
        'Corallia Bay & Maa-Palaeokastro',
        'Villas sur les hauteurs de Pegeia',
        'Grottes marines (Sea Caves) & Agios Georgios',
        'Littoral de Kissonerga',
      ],
      tipsHeading: 'Conseils pour votre arrivée en villa à Coral Bay',
      tips: [
        'Si votre villa ne possède pas de numéro de rue précis, transmettez un lien Google Maps via WhatsApp.',
        "La nuit (23h00–07h00), seul un forfait de +10 € s'ajoute (160 € au total).",
        "L'aller-retour bénéficie de −10 % sur le trajet retour (270 € en journée).",
      ],
      extraFaqs: [
        {
          q: 'Le chauffeur trouve-t-il facilement une villa isolée à Coral Bay ou Sea Caves ?',
          a: 'Oui, indiquez le nom de la villa ou envoyez sa position Google Maps sur WhatsApp (+357 96 867289).',
        },
        {
          q: 'Corallia Bay et Sea Caves sont-ils inclus dans les 150 € ?',
          a: 'Oui, le secteur central de Coral Bay, Corallia Bay et Sea Caves sont inclus.',
        },
      ],
    },
    el: {
      overviewHeading: 'Αεροδρόμιο Λάρνακας (LCA) – Coral Bay: Απευθείας στην πόρτα της βίλας (€150)',
      overviewParagraphs: [
        'Το Coral Bay και η περιοχή της Πέγειας βορειοδυτικά της Πάφου φημίζονται για τις παραθεριστικές βίλες και τις αμμουδιές τους, σε απόσταση 148 χλμ από τη Λάρνακα (LCA). Μετά τους A5, A1 και A6 μέσω Λεμεσού, συνεχίζουμε παραλιακά από τη B7/E701 φτάνοντας σε ~100 λεπτά.',
        'Για βίλες με αυτόματο check-in και lockbox, η σταθερή τιμή €150 ανά όχημα σάς γλιτώνει από νυχτερινές μετεπιβιβάσεις.',
      ],
      dropOffHeading: 'Περιοχές εξυπηρέτησης στο Coral Bay',
      dropOffAreas: [
        'Κεντρικός δρόμος Coral Bay & Coral Beach Hotel',
        'Κόλπος Corallia & Μάα-Παλαιόκαστρο',
        'Βίλες Πέγειας',
        'Θαλασσινές Σπηλιές (Sea Caves) & Άγιος Γεώργιος',
        'Παραλιακή Κισσόνεργας',
      ],
      tipsHeading: 'Συμβουλές άφιξης σε βίλες στο Coral Bay',
      tips: [
        'Αν η βίλα δεν έχει αριθμό δρόμου, στείλτε μας το στίγμα Google Maps στα σχόλια ή στο WhatsApp.',
        'Για αφίξεις 23:00–07:00 προστίθεται μόνο σταθερό τέλος +€10 (€160 τελική).',
        'Με κράτηση μετ’ επιστροφής ισχύει −10% έκπτωση στην επιστροφή (€270 σύνολο την ημέρα).',
      ],
      extraFaqs: [
        {
          q: 'Μπορεί ο οδηγός να βρει ιδιωτική βίλα στο Coral Bay ή στις Θαλασσινές Σπηλιές τη νύχτα;',
          a: 'Ναι, στείλτε το όνομα της βίλας ή τη θέση στο Google Maps μέσω WhatsApp (+357 96 867289).',
        },
        {
          q: 'Περιλαμβάνονται το Corallia Bay και τα Sea Caves στα €150;',
          a: 'Ναι, ολόκληρη η ζώνη Coral Bay, Corallia Bay και Sea Caves εξυπηρετείται με €150.',
        },
      ],
    },
    it: {
      overviewHeading: 'Aeroporto di Larnaca (LCA) – Coral Bay: transfer diretto in villa (€150)',
      overviewParagraphs: [
        'Coral Bay e le colline di Pegeia a nord-ovest di Paphos sono note per ville private e baie sabbiose a 148 km da Larnaca (LCA). Superate Limassol e Paphos su A5, A1 e A6, proseguiamo lungo la costiera B7/E701 fino al cancello della tua villa in circa 100 minuti.',
        'Per gli arrivi in autonomia con cassetta delle chiavi, il transfer fisso da €150 evita di dover cercare taxi locali a tarda ora con le valigie.',
      ],
      dropOffHeading: 'Zone coperte a Coral Bay',
      dropOffAreas: [
        'Coral Bay Strip & zona Coral Beach Hotel',
        'Corallia Bay & Maa-Palaeokastro',
        'Ville collinari a Pegeia',
        'Sea Caves & porticciolo di Agios Georgios',
        'Costa di Kissonerga',
      ],
      tipsHeading: 'Consigli per l’arrivo in villa a Coral Bay',
      tips: [
        'Se la villa non ha numero civico, invia la posizione Google Maps nelle note o su WhatsApp.',
        'Tra le 23:00 e le 07:00 si applica solo il supplemento fisso di +€10 (€160 totali).',
        'Prenotando andata e ritorno risparmi il 10% sul rientro (€270 di giorno totali).',
      ],
      extraFaqs: [
        {
          q: 'L’autista riesce a trovare facilmente una villa privata a Coral Bay o Sea Caves di notte?',
          a: 'Sì, condividendo il nome della villa o il pin Google Maps su WhatsApp (+357 96 867289).',
        },
        {
          q: 'Corallia Bay e Sea Caves rientrano nei €150 fissi?',
          a: 'Sì, Coral Bay Strip, Corallia Bay e Sea Caves sono compresi nella tariffa da €150.',
        },
      ],
    },
  },

  'larnaca-airport-to-paphos-airport': {
    en: {
      overviewHeading: 'Larnaca Airport (LCA) to Paphos Airport (PFO): Curb-to-Curb Inter-Airport Link (€140)',
      overviewParagraphs: [
        'Travelers dealing with separate self-transfer tickets, flight diversions, or airline schedule changes frequently need a fast link between Cyprus’s two main airports. Our direct 128 km highway run along the A5, A1, and A6 via Limassol connects LCA Arrivals and PFO Departures in roughly 85 minutes.',
        'Because missed connections carry heavy rebooking costs, we offer a fixed €140 door-to-door sedan with real-time inbound flight tracking and immediate curb drop-off right outside your departure terminal.',
      ],
      dropOffHeading: 'Terminal Connections Covered (Both Ways)',
      dropOffAreas: [
        'LCA Arrivals Hall → PFO Departures Curbside',
        'PFO Arrivals Hall → LCA Departures Level',
        'Airline Crew & Flight Diversion Transfers',
        'Split-Ticket Baggage Re-Check Schedules',
        'Limassol Mid-Point Drop or Break (Optional)',
      ],
      tipsHeading: 'Recommended Connection Buffer Times',
      tips: [
        'Allow at least 3.5 to 4 hours between scheduled inbound landing and onward departure to cover baggage reclaim, ~85 min driving, and security screening.',
        'Include both flight numbers when booking so our Limassol dispatchers monitor delays proactively.',
        'Need late-night airport linking? Between 23:00 and 07:00 a flat +€10 night fee applies (€150 total).',
      ],
      extraFaqs: [
        {
          q: 'How much connection time should I leave between LCA landing and PFO takeoff?',
          a: 'We recommend at least 3.5 to 4 hours total: ~30 minutes for deplaning and bags, ~85 minutes for the highway transfer, and 90–120 minutes for check-in and security at the second airport.',
        },
        {
          q: 'Does the €140 rate also work from Paphos Airport (PFO) to Larnaca Airport (LCA)?',
          a: 'Yes, all inter-airport transfers operate in both directions (LCA ↔ PFO) at the same fixed €140 daytime rate.',
        },
      ],
    },
    ru: {
      overviewHeading: 'Аэропорт Ларнака (LCA) — Аэропорт Пафос (PFO): стыковка за ~85 минут (€140)',
      overviewParagraphs: [
        'При покупке раздельных билетов через два аэропорта Кипра или переносе рейса между Ларнакой (LCA) и Пафосом (PFO) важна точная по времени стыковка. Наш прямой автомобиль проходит 128 км по трассам A5, A1 и A6 через Лимассол примерно за 85 минут.',
        'Фиксированная цена €140 за весь седан включает встречу с табличкой в зале прилёта первого аэропорта и высадку прямо у входа в зону вылета второго терминала.',
      ],
      dropOffHeading: 'Варианты стыковок между терминалами',
      dropOffAreas: [
        'Прилёт Ларнака (LCA) → Вылет Пафос (PFO)',
        'Прилёт Пафос (PFO) → Вылет Ларнака (LCA)',
        'Перевозка экипажей и трансфер при уходе рейса на запасной',
        'Самостоятельные стыковки с получением багажа',
        'Краткая остановка в Лимассоле при необходимости',
      ],
      tipsHeading: 'Рекомендуемый запас времени между рейсами',
      tips: [
        'Закладывайте минимум 3,5–4 часа между посадкой и следующим вылетом: на багаж, 85 минут трассы и предполетный контроль.',
        'Укажите номера обоих рейсов в комментарии, чтобы диспетчеры в Лимассоле отслеживали прилёт в реальном времени.',
        'Ночная стыковка с 23:00 до 07:00 добавляет только фиксированные +€10 (€150 итого).',
      ],
      extraFaqs: [
        {
          q: 'Сколько времени лучше заложить на пересадку между LCA и PFO?',
          a: 'Рекомендуем минимум 3,5–4 часа: около 30 минут на выход с багажом, ~85 минут в дороге и запас перед регистрацией во втором терминале.',
        },
        {
          q: 'Действует ли тариф €140 в обратную сторону из PFO в LCA?',
          a: 'Да, межаэропортовый трансфер выполняется в обоих направлениях (LCA ↔ PFO) по одной фиксированной цене €140.',
        },
      ],
    },
    de: {
      overviewHeading: 'Flughafen Larnaka (LCA) nach Flughafen Paphos (PFO): Direktverbindung (€140)',
      overviewParagraphs: [
        'Bei getrennten Flugtickets, Flugplanänderungen oder Umleitungen zwischen Larnaka (LCA) und Paphos (PFO) verbindet unsere Limousine beide Terminals über A5, A1 und A6 vorbei an Limassol in ca. 85 Minuten (128 km).',
        'Für fest €140 erwarten wir Sie mit Namensschild in der Ankunftshalle und setzen Sie direkt vor dem Abflugterminal des zweiten Flughafens wieder ab.',
      ],
      dropOffHeading: 'Abgedeckte Terminal-Verbindungen',
      dropOffAreas: [
        'Ankunft Larnaka (LCA) → Abflug Paphos (PFO)',
        'Ankunft Paphos (PFO) → Abflug Larnaka (LCA)',
        'Transfers bei Flugumleitungen & Crew-Fahrten',
        'Selbst gebuchte Umsteigeverbindungen mit Gepäck',
        'Optionaler kurzer Zwischenstopp in Limassol',
      ],
      tipsHeading: 'Empfohlener Zeitpuffer zwischen den Flügen',
      tips: [
        'Planen Sie zwischen geplanter Landung und Weiterflug mindestens 3,5 bis 4 Stunden für Gepäck, ~85 Min. Fahrt und Sicherheitskontrolle ein.',
        'Geben Sie beide Flugnummern bei der Buchung an, damit unser Team in Limassol Ankünfte live mitverfolgt.',
        'Zwischen 23:00 und 07:00 Uhr kommt lediglich +€10 Nachtzuschlag hinzu (€150 gesamt).',
      ],
      extraFaqs: [
        {
          q: 'Wie viel Umsteigezeit sollte man zwischen LCA und PFO einplanen?',
          a: 'Mindestens 3,5 bis 4 Stunden: rund 30 Minuten für Gepäck, ca. 85 Minuten Autobahnfahrt sowie rechtzeitiges Einchecken am Zielterminal.',
        },
        {
          q: 'Gilt der Festpreis von €140 auch umgekehrt von PFO nach LCA?',
          a: 'Ja, der Transfer zwischen beiden Flughäfen kostet in beide Richtungen einheitlich €140 am Tag.',
        },
      ],
    },
    pl: {
      overviewHeading: 'Lotnisko Larnaka (LCA) – Lotnisko Pafos (PFO): transfer między terminalami (€140)',
      overviewParagraphs: [
        'Przy osobno kupionych biletach lub przekierowaniu lotu między Larnaką (LCA) a Pafos (PFO) liczy się każda minuta. Nasz bezpośredni przejazd autostradami A5, A1 i A6 przez Limassol trwa około 85 minut (128 km).',
        'Za stałe €140 kierowca odbiera Cię z hali przylotów i wysadza prosto pod wejściem do odlotów drugiego lotniska.',
      ],
      dropOffHeading: 'Obsługiwane kierunki między lotniskami',
      dropOffAreas: [
        'Przyloty LCA → Odloty PFO',
        'Przyloty PFO → Odloty LCA',
        'Obsługa przekierowań i załóg lotniczych',
        'Przesiadki self-transfer z nadanym bagażem',
        'Opcjonalny postój po drodze w Limassol',
      ],
      tipsHeading: 'Ile czasu zostawić między lotami?',
      tips: [
        'Bezpieczne minimum między lądowaniem a kolejnym odlotem to 3,5–4 godziny (bagaż, ~85 min jazdy oraz kontrola bezpieczeństwa).',
        'Wpisz oba numery lotów podczas rezerwacji — śledzimy status przylotu na bieżąco.',
        'W godzinach nocnych (23:00–07:00) obowiązuje tylko dopłata +€10 (€150 łącznie).',
      ],
      extraFaqs: [
        {
          q: 'Ile zapasu czasowego zaplanować przy przesiadce LCA ↔ PFO?',
          a: 'Zalecamy minimum 3,5–4 godziny, co daje spokojny zapas na odbiór bagażu, 85 minut jazdy autostradą oraz odprawę.',
        },
        {
          q: 'Czy stawka €140 obowiązuje też w relacji PFO → LCA?',
          a: 'Tak, przejazd między lotniskami kosztuje dokładnie tyle samo (€140) w obie strony.',
        },
      ],
    },
    fr: {
      overviewHeading: 'Aéroport de Larnaca (LCA) à Paphos (PFO) : liaison inter-aéroports (140 €)',
      overviewParagraphs: [
        "En cas de billets séparés ou de déroutement entre Larnaca (LCA) et Paphos (PFO), notre berline relie les deux aéroports via A5, A1 et A6 par Limassol en ~85 minutes (128 km).",
        "Pour un forfait de 140 €, le chauffeur vous accueille dès la sortie des arrivées et vous dépose au pied du terminal des départs du second aéroport.",
      ],
      dropOffHeading: 'Liaisons entre terminaux couvertes',
      dropOffAreas: [
        'Arrivées LCA → Départs PFO',
        'Arrivées PFO → Départs LCA',
        'Transferts équipages & vols déroutés',
        'Correspondances individuelles avec bagages',
        'Halte rapide possible à Limassol',
      ],
      tipsHeading: 'Délai conseillé entre deux vols',
      tips: [
        "Prévoyez au moins 3h30 à 4h entre l'atterrissage et le décollage suivant (bagages, ~85 min de route et contrôles).",
        'Indiquez les deux numéros de vol afin que notre équipe suive votre arrivée en direct.',
        'En horaire nocturne (23h00–07h00), seul le supplément fixe de +10 € s’applique (150 €).',
      ],
      extraFaqs: [
        {
          q: 'Quel temps de correspondance prévoir entre LCA et PFO ?',
          a: "Nous recommandons un minimum de 3h30 à 4 heures pour récupérer les bagages, rouler ~85 minutes et passer la sûreté à l'autre terminal.",
        },
        {
          q: 'Le tarif de 140 € vaut-il aussi de Paphos (PFO) vers Larnaca (LCA) ?',
          a: 'Oui, la liaison entre les deux aéroports s’effectue dans les deux sens au même tarif fixe de 140 €.',
        },
      ],
    },
    el: {
      overviewHeading: 'Αεροδρόμιο Λάρνακας (LCA) – Αεροδρόμιο Πάφου (PFO): Σύνδεση τερματικών (€140)',
      overviewParagraphs: [
        'Όταν συνδέετε ξεχωριστά εισιτήρια ή συμβεί εκτροπή πτήσης μεταξύ Λάρνακας (LCA) και Πάφου (PFO), καλύπτουμε τα 128 χλμ μέσω A5, A1 και A6 (διά μέσου Λεμεσού) σε περίπου 85 λεπτά.',
        'Με σταθερή τιμή €140 σάς παραλαμβάνουμε στις αφίξεις και σάς αφήνουμε ακριβώς στην είσοδο αναχωρήσεων του άλλου αεροδρομίου.',
      ],
      dropOffHeading: 'Καλυπτόμενες συνδέσεις τερματικών',
      dropOffAreas: [
        'Αφίξεις Λάρνακας (LCA) → Αναχωρήσεις Πάφου (PFO)',
        'Αφίξεις Πάφου (PFO) → Αναχωρήσεις Λάρνακας (LCA)',
        'Μεταφορά πληρωμάτων & εκτροπών πτήσεων',
        'Αυτοτελείς ανταποκρίσεις με παραλαβή αποσκευών',
        'Προαιρετική στάση στη Λεμεσό',
      ],
      tipsHeading: 'Συνιστώμενος χρόνος ανταπόκρισης',
      tips: [
        'Αφήστε τουλάχιστον 3,5–4 ώρες ανάμεσα στην προσγείωση και την επόμενη πτήση (αποσκευές, ~85 λεπτά δρόμος και έλεγχος).',
        'Σημειώστε και τους δύο αριθμούς πτήσης ώστε να παρακολουθούμε τυχόν καθυστέρηση.',
        'Τη νύχτα (23:00–07:00) προστίθεται μόνο σταθερό τέλος +€10 (€150 τελική).',
      ],
      extraFaqs: [
        {
          q: 'Πόση ώρα χρειάζεται ανάμεσα σε πτήσεις στο LCA και στο PFO;',
          a: 'Συνιστούμε 3,5 με 4 ώρες συνολικά για αποσκευές, ~85 λεπτά διαδρομής και check-in.',
        },
        {
          q: 'Ισχύει το €140 και από Πάφο (PFO) προς Λάρνακα (LCA);',
          a: 'Ναι, η σύνδεση των δύο αεροδρομίων κοστίζει σταθερά €140 και προς τις δύο κατευθύνσεις.',
        },
      ],
    },
    it: {
      overviewHeading: 'Aeroporto di Larnaca (LCA) – Aeroporto di Paphos (PFO): collegamento diretto (€140)',
      overviewParagraphs: [
        'In caso di coincidenze con biglietti separati o dirottamenti fra Larnaca (LCA) e Paphos (PFO), colleghiamo i due scali in circa 85 minuti (128 km) lungo A5, A1 e A6 passando per Limassol.',
        'A €140 fissi l’autista ti accoglie agli arrivi del primo aeroporto e ti accompagna direttamente davanti alle partenze del secondo.',
      ],
      dropOffHeading: 'Collegamenti tra terminal disponibili',
      dropOffAreas: [
        'Arrivi LCA → Partenze PFO',
        'Arrivi PFO → Partenze LCA',
        'Transfer per equipaggi e voli dirottati',
        'Coincidenze autonome con ritiro bagagli',
        'Breve sosta su richiesta a Limassol',
      ],
      tipsHeading: 'Margine consigliato tra un volo e l’altro',
      tips: [
        'Calcola almeno 3,5–4 ore tra atterraggio e decollo successivo per ritiro bagagli, ~85 min di viaggio e controlli.',
        'Inserisci entrambi i numeri di volo in prenotazione per il monitoraggio in tempo reale.',
        'In fascia notturna (23:00–07:00) si aggiunge solo il supplemento fisso di +€10 (€150 totali).',
      ],
      extraFaqs: [
        {
          q: 'Quanto tempo serve per cambiare aeroporto tra LCA e PFO?',
          a: 'Consigliamo almeno 3,5–4 ore complessive tra sbarco, ~85 minuti in autostrada e controlli al secondo terminal.',
        },
        {
          q: 'I €140 valgono anche da Paphos Airport a Larnaca Airport?',
          a: 'Sì, il collegamento inter-aeroporto è bidirezionale alla medesima tariffa fissa di €140.',
        },
      ],
    },
  },

  'limassol-to-paphos': {
    en: {
      overviewHeading: 'Limassol to Paphos Private Transfer: 45-Minute Coastal Link (€75)',
      overviewParagraphs: [
        'Whether moving hotels mid-holiday, attending business meetings, or heading west for an afternoon at Kato Paphos Harbour, the 68 km drive along the A6 coastal highway takes ~45 minutes past Kourion and Petra tou Romiou (Aphrodite’s Rock).',
        'Our Limassol-based sedan collects you directly from any hotel, office, or Marina berth 10 minutes early for €75 fixed—or €135 total if you book a same-day or future return trip with our automatic 10% round-trip discount.',
      ],
      dropOffHeading: 'Popular Drop-Off Points in Paphos',
      dropOffAreas: [
        'Kato Paphos Harbour & Archaeological Park',
        'Elysium, Annabelle & Almyra Resort Strip',
        'Tombs of the Kings Avenue',
        'Paphos Old Town (Ktima) & Town Hall',
        'Universal & Paphos Harbour Promenade',
      ],
      tipsHeading: 'Day-Trip & Hotel-Change Tips',
      tips: [
        'Book outbound and evening return together for an automatic 10% return saving (€135 total for up to 4 people—often comparable to four single intercity tickets plus local taxis).',
        'Drivers pick you up right outside hotel lobbies, private residences, or Limassol offices such as The Oval and Marina.',
        'Travelling with strollers or golf bags? Mention trunk items in booking comments so we assign the most spacious sedan.',
      ],
      extraFaqs: [
        {
          q: 'Can I book a same-day round trip between Limassol and Paphos?',
          a: 'Yes! Select Round trip in our booking widget and set both pickup times; the return ride automatically gets 10% off (€135 total by day).',
        },
        {
          q: 'Does the €75 rate apply in both directions (Limassol → Paphos and Paphos → Limassol)?',
          a: 'Yes, private door-to-door transfers cost €75 either way during daytime hours (+€10 between 23:00 and 07:00).',
        },
      ],
    },
    ru: {
      overviewHeading: 'Лимассол — Пафос: прямой междугородний трансфер за ~45 минут (€75)',
      overviewParagraphs: [
        'Переезд между отелями, деловая встреча или однодневная прогулка к гавани Като Пафос занимают по прибрежной магистрали A6 всего около 45 минут (68 км) мимо Куриона и Петра ту Ромиу (скалы Афродиты).',
        'Водитель из Лимассола заберёт вас от дома, офиса или лобби отеля без заезда на автовокзал. Стоимость €75 в одну сторону, а при заказе сразу туда и обратно в тот же или другой день — €135 с учётом скидки 10% на обратную дорогу.',
      ],
      dropOffHeading: 'Ключевые точки высадки в Пафосе',
      dropOffAreas: [
        'Гавань Като Пафос и Археологический парк',
        'Побережье отелей Elysium, Annabelle и Almyra',
        'Улица Гробницы Королей',
        'Верхний город Ктима и центр Пафоса',
        'Район Юниверсал и набережная',
      ],
      tipsHeading: 'Советы для деловых и курортных поездок',
      tips: [
        'Для поездки одним днём сразу выбирайте «Туда и обратно» — €135 на компанию до 4 человек выгоднее череды городских такси от автостанции.',
        'Возможна подача в деловой центр Лимассола (включая район The Oval и Limassol Marina) точно к назначенному часу.',
        'Если везёте детскую коляску или гольф-сумку, отметьте это в комментарии к заказу.',
      ],
      extraFaqs: [
        {
          q: 'Можно ли заказать поездку Лимассол — Пафос туда и обратно одним днём?',
          a: 'Да, выберите «Туда и обратно» и укажите время возвращения — обратный рейс сразу посчитается со скидкой 10% (€135 днём за обе дороги).',
        },
        {
          q: 'Стоит ли трансфер из Пафоса в Лимассол столько же?',
          a: 'Да, маршрут работает в обе стороны по фиксированному тарифу €75 днём (+€10 с 23:00 до 07:00).',
        },
      ],
    },
    de: {
      overviewHeading: 'Limassol nach Paphos Privattransfer: In ca. 45 Minuten an der Küste entlang (€75)',
      overviewParagraphs: [
        'Ob Hotelwechsel, Geschäftstermin oder Tagesausflug zum Hafen von Kato Paphos: Die 68 km über die Küstenautobahn A6 vorbei an Kourion und Petra tou Romiou sind in nur rund 45 Minuten zurückgelegt.',
        'Für fest €75 holt Sie Ihr Fahrer aus Limassol direkt am Hoteleingang, Büro oder Apartment ab — als Hin- und Rückfahrt inklusive 10 % Rückfahrtrabatt beträgt der Gesamtpreis tagsüber €135.',
      ],
      dropOffHeading: 'Beliebte Zielpunkte in Paphos',
      dropOffAreas: [
        'Hafen Kato Paphos & Archäologischer Park',
        'Resorts Elysium, Annabelle & Almyra',
        'Tombs of the Kings Avenue',
        'Altstadt Ktima & Stadtzentrum',
        'Viertel Universal & Hafenpromenade',
      ],
      tipsHeading: 'Tipps für Tagesausflüge & Hotelwechsel',
      tips: [
        'Buchen Sie Hin- und Rückfahrt gemeinsam für €135 gesamt — ideal für bis zu 4 Personen ohne Warten auf Regionalbusse.',
        'Abholungen ab Business-Adressen in Limassol (wie The Oval oder Marina) erfolgen auf die Minute pünktlich.',
        'Geben Sie Kinderwagen oder Golfgepäck im Kommentarfeld an, damit wir den passenden Kofferraum einplanen.',
      ],
      extraFaqs: [
        {
          q: 'Kann ich Limassol ↔ Paphos für einen Tagesausflug hin und zurück buchen?',
          a: 'Ja, bei Buchung von Hin- & Rückfahrt gewähren wir automatisch 10 % Rabatt auf die Rückfahrt (€135 gesamt tagsüber).',
        },
        {
          q: 'Gilt der Preis von €75 in beide Richtungen?',
          a: 'Ja, Limassol → Paphos sowie Paphos → Limassol kosten tagsüber jeweils €75 (+€10 von 23:00 bis 07:00 Uhr).',
        },
      ],
    },
    pl: {
      overviewHeading: 'Limassol – Pafos prywatny transfer: 45 minut wybrzeżem (€75)',
      overviewParagraphs: [
        'Zmiana hotelu w trakcie urlopu, spotkanie biznesowe czy wycieczka do portu Kato Pafos: 68 km wzdłuż autostrady A6 obok Kourion i Skały Afrodyty trwa około 45 minut.',
        'Kierowca odbiera Cię spod hotelu, biura czy mariny w Limassol za stałe €75, a rezerwując od razu kurs powrotny tego samego dnia lub później, płacisz €135 w dzień z 10% zniżką na powrót.',
      ],
      dropOffHeading: 'Najczęstsze miejsca wysiadki w Pafos',
      dropOffAreas: [
        'Port Kato Pafos i Park Archeologiczny',
        'Hotele Elysium, Annabelle i Almyra',
        'Tombs of the Kings Avenue',
        'Stare miasto Ktima i centrum',
        'Universal i nadmorska promenada',
      ],
      tipsHeading: 'Praktyczne porady na trasę Limassol – Pafos',
      tips: [
        'Przy jednodniowym wypadzie opcja „W obie strony” (€135 za maksymalnie 4 osoby) oszczędza czas na dojazdach z dworca.',
        'Odbieramy punktualnie spod dowolnego hotelu lub biurowca w Limassol (np. okolice The Oval czy Limassol Marina).',
        'Jeśli zabierasz wózek dziecięcy lub torby golfowe, wspomnij o tym przy rezerwacji.',
      ],
      extraFaqs: [
        {
          q: 'Czy mogę zarezerwować wycieczkę Limassol – Pafos w obie strony jednego dnia?',
          a: 'Tak, po wyborze przejazdu w obie strony powrót automatycznie otrzymuje 10% zniżki (€135 w dzień za całość).',
        },
        {
          q: 'Czy cena €75 działa również z Pafos do Limassol?',
          a: 'Tak, obie relacje kosztują €75 w dzień (+€10 w godzinach 23:00–07:00).',
        },
      ],
    },
    fr: {
      overviewHeading: 'Transfert privé Limassol – Paphos : 45 minutes par la côte (75 €)',
      overviewParagraphs: [
        "Pour un changement d'hôtel, un rendez-vous d'affaires ou une escapade au port de Kato Paphos, les 68 km le long de l'A6 (via Kourion et le rocher d'Aphrodite) prennent environ 45 minutes.",
        "Votre chauffeur vous prend en charge devant votre hôtel, bureau ou résidence à Limassol pour 75 € fixes — ou 135 € l'aller-retour dans la journée grâce aux −10 % automatiques sur le retour.",
      ],
      dropOffHeading: 'Points de dépose fréquents à Paphos',
      dropOffAreas: [
        'Port de Kato Paphos & Parc Archéologique',
        'Secteur hôtels Elysium, Annabelle & Almyra',
        'Avenue des Tombeaux des Rois',
        'Ville haute Ktima & centre-ville',
        'Quartier Universal & front de mer',
      ],
      tipsHeading: "Conseils pour l'aller-retour ou le changement d'hôtel",
      tips: [
        "Réservez l'aller-retour ensemble (135 € au total jusqu'à 4 personnes) pour éviter les temps d'attente en gare routière.",
        'Prise en charge ponctuelle depuis les quartiers d’affaires de Limassol (The Oval, Marina).',
        'Signalez une poussette ou un sac de golf en commentaire pour prévoir le coffre adapté.',
      ],
      extraFaqs: [
        {
          q: 'Puis-je réserver un aller-retour dans la même journée entre Limassol et Paphos ?',
          a: "Oui, sélectionnez l'option Aller-retour : la course retour profite d'office de −10 % (135 € en journée).",
        },
        {
          q: 'Le tarif de 75 € est-il identique de Paphos vers Limassol ?',
          a: 'Oui, la course coûte 75 € dans les deux sens (+10 € de nuit entre 23h00 et 07h00).',
        },
      ],
    },
    el: {
      overviewHeading: 'Λεμεσός – Πάφος Ιδιωτική Μεταφορά: 45 λεπτά μέσω A6 (€75)',
      overviewParagraphs: [
        'Είτε αλλάζετε ξενοδοχείο, είτε έχετε επαγγελματικό ραντεβού ή ημερήσια βόλτα στο λιμανάκι της Κάτω Πάφου, τα 68 χλμ στον παραλιακό A6 (μέσω Κουρίου και Πέτρας του Ρωμιού) διαρκούν μόλις ~45 λεπτά.',
        'Με σταθερή τιμή €75 παραλαμβάνεστε από την πόρτα σας στη Λεμεσό — ή με €135 συνολικά αν κλείσετε αυθημερόν μετ’ επιστροφής (έκπτωση 10% στην επιστροφή).',
      ],
      dropOffHeading: 'Δημοφιλή σημεία παράδοσης στην Πάφο',
      dropOffAreas: [
        'Λιμανάκι Κάτω Πάφου & Αρχαιολογικό Πάρκο',
        'Ξενοδοχεία Elysium, Annabelle & Almyra',
        'Λεωφόρος Τάφων των Βασιλέων',
        'Κέντρο Κτήματος Πάφου',
        'Περιοχή Universal & παραλιακός πεζόδρομος',
      ],
      tipsHeading: 'Συμβουλές για ημερήσια εκδρομή ή μετακόμιση ξενοδοχείου',
      tips: [
        'Με επιλογή μετ’ επιστροφής (€135 σύνολο για έως 4 άτομα) αποφεύγετε τα τοπικά ταξί από τους σταθμούς.',
        'Παραλαβή στην ώρα σας από τη Μαρίνα Λεμεσού, ξενοδοχεία και επαγγελματικά κέντρα (π.χ. The Oval).',
        'Ενημερώστε μας στα σχόλια αν μεταφέρετε καρότσι ή τσάντες γκολφ.',
      ],
      extraFaqs: [
        {
          q: 'Μπορώ να κλείσω αυθημερόν μετ’ επιστροφής Λεμεσός – Πάφος;',
          a: 'Ναι, επιλέγοντας «Μετ’ επιστροφής» στον υπολογιστή έχετε αυτόματα −10% στην επιστροφή (€135 ημέρας).',
        },
        {
          q: 'Ισχύουν τα €75 και από Πάφο προς Λεμεσό;',
          a: 'Ναι, η τιμή είναι €75 και στις δύο κατευθύνσεις (+€10 νυχτερινό 23:00–07:00).',
        },
      ],
    },
    it: {
      overviewHeading: 'Transfer privato Limassol – Paphos: 45 minuti lungo la costa (€75)',
      overviewParagraphs: [
        'Che si tratti di un cambio hotel, un incontro di lavoro o una gita al porto di Kato Paphos, i 68 km sull’autostrada A6 oltre Kourion e Petra tou Romiou si coprono in circa 45 minuti.',
        'Per €75 fissi il nostro autista ti preleva davanti a qualsiasi hotel, ufficio o marina di Limassol — oppure €135 totali prenotando anche il rientro in giornata con il 10% di sconto.',
      ],
      dropOffHeading: 'Punti di arrivo richiesti a Paphos',
      dropOffAreas: [
        'Porto di Kato Paphos & Parco Archeologico',
        'Hotel Elysium, Annabelle & Almyra',
        'Tombs of the Kings Avenue',
        'Città Vecchia Ktima & centro',
        'Quartiere Universal & lungomare',
      ],
      tipsHeading: 'Consigli per gite in giornata e cambi hotel',
      tips: [
        'Prenotando andata e ritorno (€135 totali fino a 4 persone) viaggi porta a porta senza attese in autostazione.',
        'Ritiro puntuale presso zone direzionali di Limassol come The Oval o Limassol Marina.',
        'Segnala passeggini o sacche da golf nelle note per preparare il bagagliaio ideale.',
      ],
      extraFaqs: [
        {
          q: 'Posso prenotare andata e ritorno in giornata tra Limassol e Paphos?',
          a: 'Sì, selezionando Andata e ritorno ottieni subito il 10% di sconto sul rientro (€135 totali di giorno).',
        },
        {
          q: 'La tariffa di €75 vale anche da Paphos verso Limassol?',
          a: 'Sì, €75 fissi in entrambe le direzioni (+€10 dalle 23:00 alle 07:00).',
        },
      ],
    },
  },
};

export function getRouteEnrichment(
  slug: string,
  lang: Language
): RouteEnrichmentLocalized | undefined {
  const entry = ROUTE_ENRICHMENT[slug];
  if (!entry) return undefined;
  return entry[lang] || entry.en;
}
