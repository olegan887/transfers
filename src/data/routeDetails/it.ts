import type { RouteDetailsMap } from './types';

const it: RouteDetailsMap = {
  'larnaca-airport-to-limassol': {
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
  'paphos-airport-to-limassol': {
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
  'larnaca-airport-to-paphos': {
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
  'paphos-airport-to-larnaca-city': {
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
  'paphos-airport-to-ayia-napa': {
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
  'paphos-airport-to-protaras': {
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
  'paphos-airport-to-nicosia': {
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
  'larnaca-airport-to-coral-bay': {
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
  'larnaca-airport-to-paphos-airport': {
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
  'limassol-to-paphos': {
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
  'larnaca-airport-to-peyia': {
    overviewHeading: 'Aeroporto di Larnaca (LCA) – Peyia: dalla costa alle colline (€160)',
    overviewParagraphs: [
      'Peyia domina Coral Bay sui terrazzamenti calcarei dell’ovest cipriota, a 152 km da Larnaca (LCA). Superate Limassol e Paphos lungo A5, A1 e A6, saliamo lungo la B7 e la E701 fino al cancello della tua villa in ~105 minuti.',
      'Con i mezzi pubblici servirebbero due o tre cambi a Paphos e faticose salite con le valigie. Con €160 fissi una berlina porta fino a 4 passeggeri e 3 valigie direttamente a destinazione.',
    ],
    dropOffHeading: 'Zone di Peyia incluse nella tariffa fissa',
    dropOffAreas: [
      'Peyia alta (piazza del borgo e ville collinari)',
      'Cap St Georges Hotel & Resort',
      'Agios Georgios & Sea Caves',
      'Peyia bassa verso Coral Bay',
      'Bivi Akoursos & Kathikas',
    ],
    tipsHeading: 'Consigli per gli arrivi LCA → Peyia',
    tips: [
      'Molte ville collinari non hanno numero civico: condividi il pin Google Maps su WhatsApp (+357 96 867289).',
      'Tra le 23:00 e le 07:00 si applica solo +€10 notturno fisso (€170 totali).',
      'Prenota andata e ritorno per risparmiare il 10% sul rientro (€288 totali di giorno).',
    ],
    extraFaqs: [
      {
        q: 'I €160 coprono Cap St Georges Hotel e le ville alte di Peyia?',
        a: 'Sì, la tariffa diurna fissa di €160 copre Peyia bassa/alta, Cap St Georges Resort e Sea Caves.',
      },
      {
        q: 'Quanto dura il transfer dall’aeroporto di Larnaca a Peyia?',
        a: 'Circa 105 minuti (152 km) lungo A5, A1, A6 ed E701 senza cambi.',
      },
    ],
  },
  'larnaca-airport-to-polis': {
    overviewHeading: 'Aeroporto di Larnaca (LCA) – Polis & Latchi: verso l’Akamas (€180)',
    overviewParagraphs: [
      'Affacciati sulla baia nord-occidentale di Chrysochous accanto all’Akamas, Polis e il porticciolo di Latchi distano 170 km da Larnaca (LCA). Dopo A5, A1 e A6 via Limassol, saliamo sulla panoramica B7 attraverso Stroumbi e Kathikas in ~120 minuti.',
      'In autobus occorrono tre tratte separate (aeroporto → Limassol → Paphos → linea rurale 645), rendendo preziosa una berlina privata a €180 fissi.',
    ],
    dropOffHeading: 'Zone servite a Polis & Latchi',
    dropOffAreas: [
      'Porto di Latchi, marina & Anassa Resort',
      'Centro di Polis Chrysochous',
      'Prodromi & Neo Chorio (porta dell’Akamas)',
      'Strada per i Bagni di Afrodite',
      'Ville costiere ad Argaka & Gialia',
    ],
    tipsHeading: 'Consigli per LCA → Polis',
    tips: [
      'La statale B7 dopo Paphos presenta dolci curve collinari; le nostre berline offrono climatizzazione e guida fluida.',
      'Di notte (23:00–07:00) si aggiunge soltanto +€10 ai €180 (€190 totali).',
      'Specifica il nome dell’hotel o della marina di Latchi nelle note di prenotazione.',
    ],
    extraFaqs: [
      {
        q: 'Marina di Latchi, Anassa Resort e Neo Chorio sono compresi nei €180?',
        a: 'Sì, Polis, Latchi Harbour, Anassa Resort, Neo Chorio e Argaka rientrano nei €180.',
      },
      {
        q: 'Esiste un bus diretto da Larnaca Airport a Polis Chrysochous?',
        a: 'No, in pullman servono oltre 4 ore con più cambi contro ~120 minuti in transfer privato.',
      },
    ],
  },
  'limassol-to-larnaca-city': {
    overviewHeading: 'Limassol – Larnaca Città: collegamento rapido A1 & A5 (€75)',
    overviewParagraphs: [
      'Collegare gli uffici di Limassol al lungomare di Finikoudes o Mackenzie Beach a Larnaca richiede ~50 minuti (70 km) via A1 e A5 attraverso Kofinou.',
      'Il nostro autista di Limassol arriva 10 minuti prima al tuo indirizzo per €75 fissi a berlina.',
    ],
    dropOffHeading: 'Zone servite a Larnaca Città',
    dropOffAreas: [
      'Lungomare Finikoudes & Piazza Europa',
      'Mackenzie Beach (ristoranti e appartamenti)',
      'Marina di Larnaca & zona San Lazzaro',
      'Dhekelia Road & Oroklini',
      'Livadia & Lago Salato',
    ],
    tipsHeading: 'Consigli per Limassol ↔ Larnaca',
    tips: [
      'Prenotando andata e ritorno ottieni −10% sul rientro (€135 di giorno totali).',
      'Fino a 4 passeggeri e 3 grandi valigie viaggiano allo stesso prezzo fisso di €75.',
      'Ritiro puntuale da Limassol Marina, The Oval o qualsiasi hotel sul mare.',
    ],
    extraFaqs: [
      {
        q: 'I €75 valgono sia da Limassol a Larnaca Città che al ritorno?',
        a: 'Sì, €75 fissi di giorno in entrambe le direzioni (+€10 tra le 23:00 e le 07:00).',
      },
      {
        q: 'Quanto dura Limassol – Finikoudes a Larnaca?',
        a: 'Circa 50 minuti (70 km) diretti lungo A1 e A5.',
      },
    ],
  },
  'limassol-to-coral-bay': {
    overviewHeading: 'Transfer Limassol – Coral Bay: gita al mare in ~60 min (€110)',
    overviewParagraphs: [
      'Raggiungi da Limassol l’insenatura sabbiosa di Coral Bay a nord di Paphos in circa 60 minuti (82 km) lungo la A6 e la costiera B7/E701.',
      'Mentre gli autobus si fermano in centro a Paphos, la nostra berlina a €110 ti accompagna direttamente in spiaggia o davanti al cancello della villa.',
    ],
    dropOffHeading: 'Zone coperte a Coral Bay',
    dropOffAreas: [
      'Spiaggia Coral Bay & Coral Beach Hotel',
      'Corallia Bay & Maa-Palaeokastro',
      'Coral Bay Strip',
      'Baia di Potima & Kissonerga',
      'Ville costiere a Pegeia bassa',
    ],
    tipsHeading: 'Consigli per escursioni e cambi hotel',
    tips: [
      'Scegli Andata e ritorno per −10% sul rientro in giornata o weekend (€198 totali).',
      'Seggiolini gratuiti per famiglie su richiesta in prenotazione.',
      'Condividi il pin Google Maps in caso di villa privata.',
    ],
    extraFaqs: [
      {
        q: 'Il Coral Beach Hotel & Resort è compreso nei €110 da Limassol?',
        a: 'Sì, Coral Beach Hotel, Corallia Bay e tutta Coral Bay Strip sono inclusi.',
      },
      {
        q: 'Si può prenotare andata e ritorno in giornata tra Limassol e Coral Bay?',
        a: 'Sì, selezionando Andata e ritorno risparmi il 10% sul rientro (€198 di giorno).',
      },
    ],
  },
  'limassol-to-peyia': {
    overviewHeading: 'Transfer privato Limassol – Peyia: diretto in collina (€115)',
    overviewParagraphs: [
      'Da Limassol a Peyia o al resort Cap St Georges si impiegano circa 65 minuti (86 km) lungo la A6 e la salita E701.',
      'Eviti ogni cambio autobus a Paphos con le valigie grazie al prezzo fisso di €115 porta a porta.',
    ],
    dropOffHeading: 'Zone di Peyia servite',
    dropOffAreas: [
      'Centro villaggio & piazza Peyia',
      'Cap St Georges Hotel & Resort',
      'Ville Sea Caves & Agios Georgios',
      'Strade panoramiche Peyia alta',
      'Fascia Coral Bay / Vikla',
    ],
    tipsHeading: 'Consigli per Limassol → Peyia',
    tips: [
      'Un pin Google Maps assicura l’arrivo esatto davanti al cancello.',
      'La tariffa €115 copre fino a 4 passeggeri e 3 valigie (+€10 notturno 23:00–07:00).',
      'Con l’opzione Andata/Ritorno risparmi il 10% sul rientro (€207 di giorno).',
    ],
    extraFaqs: [
      {
        q: 'Quanto dura Limassol → Peyia o Cap St Georges?',
        a: 'Circa 65 minuti (86 km) lungo A6 ed E701.',
      },
      {
        q: 'Le ville di Sea Caves rientrano nei €115 da Limassol?',
        a: 'Sì, Peyia, Cap St Georges e Sea Caves sono interamente inclusi.',
      },
    ],
  },
  'limassol-to-ayia-napa': {
    overviewHeading: 'Transfer privato Limassol – Ayia Napa: 75 min verso est (€115)',
    overviewParagraphs: [
      'Da Limassol alle spiagge bianche di Nissi Beach e Makronissos ad Ayia Napa servono ~75 minuti (112 km) diretti su A1, A5 e A3.',
      'Senza cambi alle stazioni di Larnaca, fino a 4 passeggeri pagano €115 fissi per l’intera berlina.',
    ],
    dropOffHeading: 'Spiagge e hotel ad Ayia Napa',
    dropOffAreas: [
      'Nissi Beach & hotel su Nissi Avenue',
      'Ayia Napa Marina & Ayia Thekla',
      'Makronissos & Landa Beach',
      'Porto & centro di Ayia Napa',
      'Baia di Grecian Bay',
    ],
    tipsHeading: 'Consigli per Limassol → Ayia Napa',
    tips: [
      'In estate le partenze mattutine evitano il traffico pomeridiano lungo Nissi Avenue.',
      'Sconto 10% automatico sul rientro prenotando andata e ritorno (€207 di giorno).',
      'Per 5+ passeggeri contattaci prima su WhatsApp (+357 96 867289).',
    ],
    extraFaqs: [
      {
        q: 'Quanto costa un’auto privata da Limassol a Nissi Beach?',
        a: '€115 fissi di giorno a berlina (fino a 4 pax e 3 valigie) oppure €207 andata/ritorno.',
      },
      {
        q: 'Effettuate anche rientri notturni da Ayia Napa a Limassol?',
        a: 'Sì, 24 ore su 24 (+€10 fissi tra le 23:00 e le 07:00).',
      },
    ],
  },
  'limassol-to-nicosia': {
    overviewHeading: 'Transfer privato Limassol – Nicosia: diretto nella capitale (€120)',
    overviewParagraphs: [
      'Collegando la zona finanziaria di Limassol a ministeri, ambasciate e atenei di Nicosia, gli 84 km verso nord sulla A1 richiedono ~60 minuti.',
      'A €120 fissi parti puntuale sotto l’ufficio, Limassol Marina o hotel senza pensieri di parcheggio.',
    ],
    dropOffHeading: 'Quartieri serviti a Nicosia',
    dropOffAreas: [
      'Piazza Eleftheria & accesso Città Vecchia',
      'Engomi (ambasciate e università)',
      'Strovolos & area uffici Acropolis',
      'Hotel centrali (zona Landmark / Hilton)',
      'Aglantzia & campus Università di Cipro',
    ],
    tipsHeading: 'Consigli per viaggi di lavoro sulla A1',
    tips: [
      'Nei giorni feriali tra le 07:45 e le 09:00 considera 15 minuti di margine in ingresso città.',
      'Andata e ritorno in giornata garantiscono il 10% di sconto sul ritorno (€216 di giorno).',
      'Le ricevute di pagamento Stripe semplificano i rimborsi spese.',
    ],
    extraFaqs: [
      {
        q: 'Posso prenotare andata e ritorno in giornata da Limassol a Nicosia?',
        a: 'Sì, selezionando Andata e ritorno il rientro costa il 10% in meno (€216 totali di giorno).',
      },
      {
        q: 'I €120 comprendono le ambasciate a Engomi e Aglantzia?',
        a: 'Sì, centro, Engomi, Strovolos, Aglantzia e Latsia rientrano tutti nei €120.',
      },
    ],
  },
  'larnaca-city-to-paphos': {
    overviewHeading: 'Larnaca Città – Paphos: cambio hotel fra due coste (€140)',
    overviewParagraphs: [
      'Tra gli hotel di Finikoudes o Mackenzie Beach a Larnaca e i resort di Paphos i 138 km su A5, A1 e A6 via Limassol scorrono in ~90 minuti porta a porta.',
      'Ideale per vacanze su due coste: a €140 carichiamo le valigie davanti alla reception a Larnaca e ti lasciamo al nuovo hotel a Paphos.',
    ],
    dropOffHeading: 'Destinazioni a Paphos',
    dropOffAreas: [
      'Porto Kato Paphos & lungomare',
      'Tombs of the Kings Road',
      'Hotel Elysium, Annabelle & Almyra',
      'Universal & Città Alta Ktima',
      'Spiaggia di Yeroskipou',
    ],
    tipsHeading: 'Consigli per spostamenti tra hotel',
    tips: [
      'La partenza verso le 11:00–12:00 coincide con i check-out evitando il traffico mattutino.',
      'Su richiesta breve sosta caffè vicino a Limassol senza sovrapprezzo.',
      'Acconto €20 online via Stripe e saldo (€120) all’autista all’arrivo.',
    ],
    extraFaqs: [
      {
        q: 'Che differenza c’è tra partenza da Larnaca Città (€140) e Aeroporto LCA (€135)?',
        a: 'La partenza città (€140) include hotel su Finikoudes, Mackenzie Beach e Dhekelia Road.',
      },
      {
        q: 'Entrano 3 valigie grandi cambiando hotel fra le due città?',
        a: 'Sì, fino a 4 passeggeri e 3 valigie grandi rientrano nello standard senza supplementi.',
      },
    ],
  },
  'larnaca-city-to-coral-bay': {
    overviewHeading: 'Larnaca Città – Coral Bay: transfer diretto in villa (€160)',
    overviewParagraphs: [
      'Da un hotel di Larnaca alle baie sabbiose di Coral Bay si percorrono 150 km su A5, A1, A6 e B7 in circa 100 minuti.',
      'Per €160 fissi tutta la famiglia viaggia direttamente senza trasbordi ai terminal.',
    ],
    dropOffHeading: 'Zone di Coral Bay',
    dropOffAreas: [
      'Coral Bay Strip & spiaggia principale',
      'Coral Beach Hotel & Spa',
      'Corallia Bay & Maa-Palaeokastro',
      'Potima & Kissonerga',
      'Ville strada Sea Caves',
    ],
    tipsHeading: 'Consigli per Larnaca → Coral Bay',
    tips: [
      'Invia il nome dell’hotel a Larnaca e il pin Google Maps della villa a Coral Bay.',
      'Seggiolini per bambini inclusi gratuitamente se indicati in prenotazione.',
      'Sconto 10% sul rientro scegliendo Andata/Ritorno (€288 di giorno).',
    ],
    extraFaqs: [
      {
        q: 'Partite anche da Mackenzie Beach e Oroklini per Coral Bay?',
        a: 'Sì, centro Larnaca, Finikoudes, Mackenzie e Oroklini / Dhekelia Road costano €160.',
      },
      {
        q: 'Quanto dura la corsa diretta da Larnaca a Coral Bay?',
        a: 'Circa 100 minuti (150 km) via Limassol e Paphos.',
      },
    ],
  },
  'larnaca-city-to-peyia': {
    overviewHeading: 'Larnaca Città – Peyia: diretto verso le colline ovest (€160)',
    overviewParagraphs: [
      'Dal lungomare di Larnaca alle ville panoramiche di Peyia servono ~105 minuti (155 km) lungo A5, A1, A6 ed E701.',
      'Il prezzo fisso di €160 evita la combinazione scomoda di pullman interurbani e taxi locali in salita.',
    ],
    dropOffHeading: 'Zone coperte a Peyia',
    dropOffAreas: [
      'Centro borgo & piazza Peyia',
      'Cap St Georges Hotel & Resort',
      'Ville a Peyia alta',
      'Sea Caves & Agios Georgios',
      'Peyia bassa',
    ],
    tipsHeading: 'Consigli per raggiungere Peyia',
    tips: [
      'Fornisci il link Google Maps per raggiungere facilmente ingressi in collina.',
      'Seggiolini gratuiti su richiesta nelle note.',
      'Solo +€10 di supplemento notturno fra le 23:00 e le 07:00.',
    ],
    extraFaqs: [
      {
        q: 'I €160 da Larnaca Città includono il Cap St Georges Resort?',
        a: 'Sì, tutta l’area di Peyia inclusi Cap St Georges e Sea Caves rientra nei €160.',
      },
      {
        q: 'Quanti bagagli sono consentiti?',
        a: 'Fino a 4 passeggeri e 3 valigie grandi nella stessa berlina.',
      },
    ],
  },
  'larnaca-city-to-polis': {
    overviewHeading: 'Larnaca Città – Polis & Latchi: da est a Akamas porta a porta (€200)',
    overviewParagraphs: [
      'Da Larnaca a Polis Chrysochous e al porticciolo di Latchi ai confini dell’Akamas si attraversano 175 km su A5, A1, A6 e B7 in ~120 minuti.',
      'Per €200 fissi arrivi davanti a barche, Anassa Resort o hotel di Polis evitando tre cambi di autobus.',
    ],
    dropOffHeading: 'Zone di Polis & Latchi',
    dropOffAreas: [
      'Porto Latchi & ville sul mare',
      'Anassa Resort & Bagni di Afrodite',
      'Centro Polis Chrysochous',
      'Prodromi & Neo Chorio',
      'Argaka',
    ],
    tipsHeading: 'Consigli per il tragitto di 2 ore',
    tips: [
      'Puoi chiedere gratuitamente una breve pausa caffè presso Limassol o Paphos.',
      'Acconto online €20 con Stripe; cancellazione gratuita entro 24 ore.',
      'Con Andata e ritorno risparmi il 10% sul rientro (€360 di giorno).',
    ],
    extraFaqs: [
      {
        q: 'Latchi Harbour e Neo Chorio sono inclusi nei €200 da Larnaca?',
        a: 'Sì, Polis, Prodromi, Latchi, Anassa Resort, Neo Chorio e Argaka senza extra.',
      },
      {
        q: 'È possibile fare una breve sosta strada facendo?',
        a: 'Certamente, una pausa rapida vicino a Limassol è sempre gratuita.',
      },
    ],
  },
  'nicosia-to-paphos': {
    overviewHeading: 'Transfer privato Nicosia – Paphos: dalla capitale al mare (€150)',
    overviewParagraphs: [
      'Dalla capitale cipriota alle spiagge di Paphos si scende sulla A1 fino a Limassol per poi proseguire a ovest sulla A6: 148 km in ~100 minuti.',
      'Per €150 fissi a berlina raggiungi la costa porta a porta senza attese in autostazione.',
    ],
    dropOffHeading: 'Zone servite a Paphos',
    dropOffAreas: [
      'Porto Kato Paphos & lungomare',
      'Resort Elysium, Annabelle & Almyra',
      'Tombs of the Kings Road',
      'Città Alta Ktima',
      'Chloraka & Yeroskipou',
    ],
    tipsHeading: 'Consigli per Nicosia ↔ Paphos',
    tips: [
      'Nella zona pedonale del centro storico di Nicosia il punto d’incontro è Piazza Eleftheria.',
      'Per un weekend prenota Andata e ritorno con −10% sul rientro (€270 di giorno).',
      'Cancellazione gratuita fino a 24 ore prima della partenza.',
    ],
    extraFaqs: [
      {
        q: 'Quanto tempo richiede Nicosia → Kato Paphos?',
        a: 'Circa 100 minuti (148 km) via A1 e A6 passando per Limassol.',
      },
      {
        q: 'I €150 valgono anche partendo da Engomi o Strovolos?',
        a: 'Sì, centro, Engomi, Strovolos, Aglantzia e Latsia sono tutti a €150 fissi.',
      },
    ],
  },
  'ayia-napa-to-paphos': {
    overviewHeading: 'Transfer Ayia Napa – Paphos: collegamento diretto fra le coste (€180)',
    overviewParagraphs: [
      'Unisci le spiagge di Ayia Napa ai siti UNESCO di Paphos in ~120 minuti (178 km) lungo A3, A5, A1 e A6 via Limassol.',
      'Per €180 fissi vai direttamente da Nissi Beach al tuo hotel di Paphos senza cambi in autobus.',
    ],
    dropOffHeading: 'Zone di destinazione a Paphos',
    dropOffAreas: [
      'Kato Paphos & Parco Archeologico',
      'Tombs of the Kings',
      'Resort di Yeroskipou',
      'Ville costiere a Chloraka',
      'Universal & Paphos alta',
    ],
    tipsHeading: 'Consigli per il cambio località',
    tips: [
      'Partire intorno alle 10:30–11:30 si abbina al meglio a check-out e check-in.',
      'Berlina climatizzata fino a 4 persone e 3 grandi valigie.',
      'Seggiolini gratuiti e breve sosta presso Limassol inclusi su richiesta.',
    ],
    extraFaqs: [
      {
        q: 'Quanto costa un transfer privato tra Ayia Napa e Paphos?',
        a: '€180 fissi di giorno in entrambe le direzioni (+€10 dalle 23:00 alle 07:00).',
      },
      {
        q: 'Ritirate anche da Makronissos e Ayia Thekla?',
        a: 'Sì, Nissi Beach, Makronissos, Ayia Thekla, centro e Cape Greco sono compresi.',
      },
    ],
  },
  'protaras-to-paphos': {
    overviewHeading: 'Transfer Protaras – Paphos: da Fig Tree Bay all’ovest (€190)',
    overviewParagraphs: [
      'Dalle acque serene di Protaras al porto storico di Paphos i 188 km su A3, A5, A1 e A6 richiedono ~130 minuti.',
      'Senza autobus diretti fra le due località, le famiglie scelgono la berlina fissa da €190 con seggiolini inclusi.',
    ],
    dropOffHeading: 'Zone coperte a Paphos',
    dropOffAreas: [
      'Porto di Kato Paphos',
      'Tombs of the Kings Avenue',
      'Resort familiari di Yeroskipou',
      'Chloraka & Kissonerga',
      'Centro Ktima',
    ],
    tipsHeading: 'Consigli per famiglie in viaggio',
    tips: [
      'Indica l’età dei bambini per avere seggiolini già montati gratuitamente.',
      'Aggiungi un pin Google Maps se alloggi in villa a Pernera o Kapparis.',
      'Supplemento notturno unico di +€10 tra le 23:00 e le 07:00.',
    ],
    extraFaqs: [
      {
        q: 'I €190 valgono anche partendo da Pernera e Kapparis?',
        a: 'Sì, Fig Tree Bay, Pernera, Kapparis, Konnos Bay e il centro costano €190.',
      },
      {
        q: 'Quanto dura la corsa diretta da Protaras a Paphos?',
        a: 'Circa 130 minuti (188 km) sulle autostrade meridionali.',
      },
    ],
  },
  'coral-bay-to-nicosia': {
    overviewHeading: 'Transfer privato Coral Bay – Nicosia: dalla villa alla capitale (€170)',
    overviewParagraphs: [
      'Dalle ville di Coral Bay al centro di Nicosia servono ~115 minuti (162 km) via B7, A6 attraverso Limassol e A1 verso nord.',
      'Per €170 fissi eviti trasbordi con i bagagli alla stazione di Paphos.',
    ],
    dropOffHeading: 'Zone servite a Nicosia',
    dropOffAreas: [
      'Centro & Piazza Eleftheria',
      'Engomi (ambasciate e atenei)',
      'Strovolos & Acropolis',
      'Accessi Città Vecchia',
      'Aglantzia & Latsia',
    ],
    tipsHeading: 'Consigli per Coral Bay → Nicosia',
    tips: [
      'Invia il pin Google Maps della villa per arrivare davanti al cancello.',
      'Al mattino nei feriali aggiungi 15 minuti per l’ingresso in città sulla A1.',
      'Andata e ritorno offre il 10% di sconto sul rientro (€306 di giorno).',
    ],
    extraFaqs: [
      {
        q: 'Ritirate anche da Sea Caves e Corallia Bay per Nicosia?',
        a: 'Sì, Coral Bay, Corallia Bay e Sea Caves rientrano nei €170 fissi.',
      },
      {
        q: 'Quanto dura Coral Bay → Nicosia centro?',
        a: 'Circa 115 minuti (162 km) via Limassol e Kofinou.',
      },
    ],
  },
  'coral-bay-to-ayia-napa': {
    overviewHeading: 'Transfer Coral Bay – Ayia Napa: collegamento tra spiagge (€190)',
    overviewParagraphs: [
      'Collega Coral Bay a Nissi Beach in ~130 minuti (192 km) via B7, A6, A1, A5 e A3 passando per Limassol.',
      'Eviti quattro cambi di pullman pagando una tariffa unica di €190 per l’auto.',
    ],
    dropOffHeading: 'Zone di Ayia Napa',
    dropOffAreas: [
      'Nissi Beach & Sandy Bay',
      'Makronissos & Landa Beach',
      'Porto & centro Ayia Napa',
      'Grecian Bay',
      'Ayia Thekla & Marina',
    ],
    tipsHeading: 'Consigli per attraversare l’isola',
    tips: [
      'Partire verso le 11:00 si abbina al check-out dalla villa e al check-in in hotel.',
      'Sosta caffè veloce vicino a Limassol gratuita su richiesta.',
      'Fino a 4 passeggeri e 3 valigie; gruppi di 5+ persone su WhatsApp.',
    ],
    extraFaqs: [
      {
        q: 'Quanto costa un’auto privata Coral Bay – Ayia Napa?',
        a: '€190 fissi di giorno in entrambe le direzioni (+€10 notturno 23:00–07:00).',
      },
      {
        q: 'Ci sono extra per 3 valigie grandi?',
        a: 'No, fino a 3 valigie standard e 4 persone sono sempre inclusi.',
      },
    ],
  },
  'coral-bay-to-protaras': {
    overviewHeading: 'Transfer Coral Bay – Protaras: traversata est-ovest (€200)',
    overviewParagraphs: [
      'Da Coral Bay fino a Fig Tree Bay a Protaras si coprono 202 km su B7, A6, A1, A5 e A3 in ~140 minuti.',
      'Per €200 fissi le famiglie viaggiano porta a porta con aria condizionata e seggiolini inclusi senza cambi bus.',
    ],
    dropOffHeading: 'Zone di Protaras',
    dropOffAreas: [
      'Fig Tree Bay & viale centrale',
      'Pernera (hotel e ville)',
      'Kapparis & Malama Bay',
      'Konnos Bay',
      'Sunrise Beach',
    ],
    tipsHeading: 'Consigli per la tratta di 202 km',
    tips: [
      'Indica eventuali seggiolini nelle note al momento della prenotazione.',
      'Breve sosta a Limassol o Larnaca sempre gratuita su richiesta.',
      'Condividi entrambi i pin Google Maps fra due affitti privati.',
    ],
    extraFaqs: [
      {
        q: 'Pernera e Kapparis rientrano nei €200 per Protaras?',
        a: 'Sì, Fig Tree Bay, Pernera, Kapparis, Konnos Bay e il centro sono compresi.',
      },
      {
        q: 'Quanto dura Coral Bay → Protaras?',
        a: 'Circa 140 minuti (202 km) lungo la dorsale autostradale sud.',
      },
    ],
  },
  'peyia-to-nicosia': {
    overviewHeading: 'Transfer privato Peyia – Nicosia: dalle colline alla capitale (€170)',
    overviewParagraphs: [
      'Da Peyia e Cap St Georges verso il centro di Nicosia servono ~120 minuti (168 km) scendendo sulla E701 e imboccando A6 e A1 via Limassol.',
      'Ritiro a €170 fissi davanti al cancello senza discese ripide a piedi.',
    ],
    dropOffHeading: 'Zone di Nicosia da Peyia',
    dropOffAreas: [
      'Centro & Piazza Eleftheria',
      'Engomi (università e ambasciate)',
      'Strovolos & Acropolis',
      'Zona Landmark / Hilton',
      'Aglantzia & Latsia',
    ],
    tipsHeading: 'Consigli per Peyia → Nicosia',
    tips: [
      'Incolla un pin Google Maps se la villa non ha numero civico.',
      'Andata e ritorno dà il 10% di sconto sul rientro (€306 di giorno).',
      'Acconto Stripe €20 e cancellazione gratuita entro 24 ore.',
    ],
    extraFaqs: [
      {
        q: 'Ritirate anche al Cap St Georges Resort per andare a Nicosia?',
        a: 'Sì, Cap St Georges, Peyia alta e Sea Caves costano €170 fissi.',
      },
      {
        q: 'Quanto tempo si impiega da Peyia a Engomi o Nicosia centro?',
        a: 'Circa 120 minuti (168 km) tramite le autostrade A6 e A1.',
      },
    ],
  },
  'peyia-to-ayia-napa': {
    overviewHeading: 'Transfer Peyia – Ayia Napa: collegamento completo dell’isola (€200)',
    overviewParagraphs: [
      'Dalle scogliere di Peyia alle spiagge di Ayia Napa si percorrono 198 km lungo E701, A6, A1, A5 e A3 (~135 minuti).',
      'Per €200 fissi fino a 4 ospiti evitano quattro cambi d’autobus e viaggiano direttamente porta a porta.',
    ],
    dropOffHeading: 'Zone coperte ad Ayia Napa',
    dropOffAreas: [
      'Nissi Beach & fascia hotel',
      'Makronissos & Landa Beach',
      'Porto & centro di Ayia Napa',
      'Grecian Bay',
      'Ayia Thekla & Marina',
    ],
    tipsHeading: 'Consigli per il lungo tragitto',
    tips: [
      'Invia il pin Google Maps della villa di Peyia su WhatsApp (+357 96 867289).',
      'Sosta rapida gratuita vicino a Limassol su richiesta.',
      'Per gruppi di 5+ persone scrivici prima su WhatsApp.',
    ],
    extraFaqs: [
      {
        q: 'I €200 valgono anche al ritorno da Ayia Napa a Peyia?',
        a: 'Sì, tariffa fissa €200 di giorno in entrambe le direzioni (+€10 23:00–07:00).',
      },
      {
        q: 'Cosa include la tariffa di €200?',
        a: 'Berlina privata climatizzata porta a porta fino a 4 passeggeri e 3 valigie grandi.',
      },
    ],
  },
  'peyia-to-protaras': {
    overviewHeading: 'Transfer Peyia – Protaras: la tratta costiera più lunga di Cipro (€200)',
    overviewParagraphs: [
      'Tra Peyia a nord-ovest e Fig Tree Bay a Protaras a est i 208 km lungo E701, A6, A1, A5 e A3 richiedono ~145 minuti.',
      'Con €200 fissi a veicolo le famiglie si spostano facilmente dalla villa al resort senza orari di pullman o tassametri.',
    ],
    dropOffHeading: 'Zone di Protaras servite da Peyia',
    dropOffAreas: [
      'Fig Tree Bay & corso principale',
      'Spiagge e hotel di Pernera',
      'Kapparis & Malama',
      'Konnos Bay & Cape Greco',
      'Zona Sunrise Beach',
    ],
    tipsHeading: 'Consigli per i 208 km da ovest a est',
    tips: [
      'Indica l’età dei bimbi per montare gratuitamente i seggiolini adatti.',
      'Breve pausa caffè di 5 minuti presso Limassol o Larnaca inclusa gratis.',
      'Tra le 23:00 e le 07:00 si applica solo +€10 notturno (€210 totali).',
    ],
    extraFaqs: [
      {
        q: 'Quanto costa un transfer privato da Peyia a Fig Tree Bay o Pernera?',
        a: '€200 fissi di giorno a berlina in entrambe le direzioni (+€10 notturno 23:00–07:00).',
      },
      {
        q: 'C’è abbastanza spazio per i bagagli di una vacanza di due settimane?',
        a: 'Una berlina trasporta 4 passeggeri e 3 valigie grandi; contattaci su WhatsApp per attrezzature speciali.',
      },
    ],
  },
};

export default it;
