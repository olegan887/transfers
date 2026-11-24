import type { RouteDetailsMap } from './types';

const fr: RouteDetailsMap = {
  'larnaca-airport-to-limassol': {
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
  'paphos-airport-to-limassol': {
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
  'larnaca-airport-to-paphos': {
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
  'paphos-airport-to-larnaca-city': {
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
  'paphos-airport-to-ayia-napa': {
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
  'paphos-airport-to-protaras': {
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
  'paphos-airport-to-nicosia': {
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
  'larnaca-airport-to-coral-bay': {
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
  'larnaca-airport-to-paphos-airport': {
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
  'limassol-to-paphos': {
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
  'larnaca-airport-to-peyia': {
    overviewHeading: 'Aéroport de Larnaca (LCA) vers Peyia : des plages aux collines (160 €)',
    overviewParagraphs: [
      'Peyia surplombe Coral Bay sur les hauteurs calcaires de l’ouest chypriote, à 152 km de Larnaca (LCA). Après les autoroutes A5, A1 et A6 via Limassol et Paphos, la route monte par la B7 et la E701 jusqu’à votre villa ou hôtel en ~105 minutes.',
      'En bus public, l’accès au haut de Peyia exige deux à trois correspondances et une montée raide avec les valises. Notre berline à 160 € fixes dépose jusqu’à 4 voyageurs et 3 bagages devant votre portail.',
    ],
    dropOffHeading: 'Secteurs desservis à Peyia au tarif fixe',
    dropOffAreas: [
      'Haut-Peyia (village et villas panoramiques)',
      'Cap St Georges Hotel & Resort',
      'Agios Georgios et Sea Caves',
      'Bas-Peyia et crête de Coral Bay',
      'Vers Akoursos et Kathikas',
    ],
    tipsHeading: 'Conseils pour les arrivées à LCA vers Peyia',
    tips: [
      'Les villas sur les collines manquent parfois de numéros de rue : envoyez votre position Google Maps sur WhatsApp (+357 96 867289).',
      'Entre 23h00 et 07h00, seul un supplément fixe de +10 € s’ajoute (170 € au total).',
      'Choisissez Aller-retour pour économiser 10 % sur le retour vers Larnaca (288 € en journée).',
    ],
    extraFaqs: [
      {
        q: 'Le tarif de 160 € couvre-t-il le Cap St Georges Hotel et le haut de Peyia ?',
        a: 'Oui, le forfait jour de 160 € inclut Bas-Peyia, le village de Haut-Peyia, Cap St Georges et les villas Sea Caves.',
      },
      {
        q: 'Combien de temps dure le trajet Larnaca (LCA) → Peyia ?',
        a: 'Comptez environ 105 minutes (152 km) via A5, A1, A6 et E701 sans changement.',
      },
    ],
  },
  'larnaca-airport-to-polis': {
    overviewHeading: 'Aéroport de Larnaca (LCA) vers Polis & Latchi : cap sur Akamas (180 €)',
    overviewParagraphs: [
      'Situés face à la baie de Chrysochous près de la péninsule d’Akamas, Polis et le port de Latchi se trouvent à 170 km de Larnaca (LCA). Après Limassol et Paphos (A5, A1, A6), la route B7 traverse les collines de Stroumbi et Kathikas pour arriver en ~120 minutes.',
      'Les bus nécessitent trois correspondances (aéroport → Limassol → Paphos → ligne rurale 645) : notre berline à 180 € fixes devient indispensable dès la sortie du vol.',
    ],
    dropOffHeading: 'Zones couvertes autour de Polis & Latchi',
    dropOffAreas: [
      'Port de Latchi, marina et Anassa Resort',
      'Centre de Polis Chrysochous',
      'Prodromi et Neo Chorio (porte d’Akamas)',
      'Route des Bains d’Aphrodite',
      'Villas côtières d’Argaka et Gialia',
    ],
    tipsHeading: 'Conseils pour le trajet LCA → Polis',
    tips: [
      'La route B7 après Paphos comporte quelques virages de montagne ; nos berlines climatisées garantissent un trajet reposant.',
      'La nuit (23h00–07h00), seul un forfait de +10 € s’applique aux 180 € de base (190 € au total).',
      'Indiquez le nom exact de l’hôtel ou du port de Latchi lors de votre réservation.',
    ],
    extraFaqs: [
      {
        q: 'La marina de Latchi, Anassa Resort et Neo Chorio sont-ils compris dans les 180 € ?',
        a: 'Oui : Polis, Latchi Harbour, Anassa Resort, Neo Chorio et Argaka sont inclus sans supplément.',
      },
      {
        q: 'Existe-t-il un bus direct entre l’aéroport de Larnaca et Polis ?',
        a: 'Aucun bus direct n’existe : il faut plus de 4 heures avec changements contre ~120 minutes en véhicule privé.',
      },
    ],
  },
  'limassol-to-larnaca-city': {
    overviewHeading: 'Limassol vers Larnaca Ville : liaison rapide A1 & A5 (75 €)',
    overviewParagraphs: [
      'Relier le front de mer de Limassol à Finikoudes ou Mackenzie Beach à Larnaca prend ~50 minutes (70 km) vers l’est par les autoroutes A1 et A5 via Kofinou.',
      'Pour un rendez-vous ou une étape hôtelière, votre chauffeur basé à Limassol arrive 10 minutes à l’avance devant votre adresse pour 75 € fixes par voiture.',
    ],
    dropOffHeading: 'Secteurs desservis à Larnaca Ville',
    dropOffAreas: [
      'Promenade Finikoudes et Place de l’Europe',
      'Mackenzie Beach (restaurants et hôtels)',
      'Marina de Larnaca et quartier Saint-Lazare',
      'Route de Dhekelia et Oroklini',
      'Livadia et Lac Salé',
    ],
    tipsHeading: 'Astuces entre Limassol et Larnaca',
    tips: [
      'L’option Aller-retour réduit le trajet retour de 10 % (135 € au total en journée).',
      'Jusqu’à 4 voyageurs et 3 grandes valises voyagent au même tarif fixe de 75 €.',
      'Prise en charge ponctuelle depuis Limassol Marina, The Oval ou tout hôtel côtier.',
    ],
    extraFaqs: [
      {
        q: 'Le retour Larnaca Ville → Limassol coûte-t-il aussi 75 € ?',
        a: 'Oui, les deux sens sont au même tarif fixe de 75 € le jour (+10 € entre 23h00 et 07h00).',
      },
      {
        q: 'Combien de temps dure le trajet Limassol – Finikoudes ?',
        a: 'Environ 50 minutes (70 km) d’une traite par autoroute.',
      },
    ],
  },
  'limassol-to-coral-bay': {
    overviewHeading: 'Limassol vers Coral Bay : escapade côtière en ~60 min (110 €)',
    overviewParagraphs: [
      'Rejoignez les plages de sable de Coral Bay au nord de Paphos depuis Limassol en ~60 minutes (82 km) via l’A6 puis la route côtière B7/E701.',
      'Puisque les autocars s’arrêtent au centre de Paphos, notre berline à 110 € vous dépose directement devant votre hôtel ou votre villa.',
    ],
    dropOffHeading: 'Secteurs couverts à Coral Bay',
    dropOffAreas: [
      'Plage de Coral Bay et Coral Beach Hotel',
      'Corallia Bay et Maa-Palaeokastro',
      'Coral Bay Strip (hôtels et restaurants)',
      'Potima Bay et Kissonerga',
      'Villas du littoral de Bas-Pegeia',
    ],
    tipsHeading: 'Conseils pour excursions ou changements d’hôtel',
    tips: [
      'Réservez l’aller-retour en journée ou week-end pour 10 % de remise sur le retour (198 € en journée).',
      'Des rehausseurs et sièges enfants gratuits sont prêts sur demande.',
      'Partagez un lien Google Maps si vous séjournez dans une villa privée.',
    ],
    extraFaqs: [
      {
        q: 'Le Coral Beach Hotel & Resort est-il inclus dans les 110 € ?',
        a: 'Oui, Coral Beach Hotel, Corallia Bay et tout Coral Bay Strip sont inclus.',
      },
      {
        q: 'Peut-on réserver un aller-retour dans la journée entre Limassol et Coral Bay ?',
        a: 'Oui, cochez Aller-retour pour profiter automatiquement de −10 % sur le trajet retour (198 € de jour).',
      },
    ],
  },
  'limassol-to-peyia': {
    overviewHeading: 'Transfert privé Limassol – Peyia : accès direct aux collines (115 €)',
    overviewParagraphs: [
      'De Limassol à Peyia ou au complexe Cap St Georges, la route côtière A6 puis la montée E701 durent environ 65 minutes (86 km).',
      'Sans correspondance à la gare routière de Paphos, notre berline à 115 € achemine toute la famille et les bagages au pied de la villa.',
    ],
    dropOffHeading: 'Zones couvertes à Peyia',
    dropOffAreas: [
      'Centre du village et place de Peyia',
      'Cap St Georges Hotel & Resort',
      'Villas de Sea Caves et Agios Georgios',
      'Quartiers panoramiques de Haut-Peyia',
      'Secteur limite Coral Bay / Vikla',
    ],
    tipsHeading: 'Conseils pour Limassol → Peyia',
    tips: [
      'Un point GPS Google Maps garantit l’arrivée exacte devant votre villa.',
      'Le forfait de 115 € couvre tout le véhicule (4 personnes, 3 valises ; +10 € la nuit 23h–07h).',
      'Avec l’aller-retour, bénéficiez de −10 % sur le retour (207 € de jour).',
    ],
    extraFaqs: [
      {
        q: 'Combien de temps dure Limassol → Peyia ou Cap St Georges ?',
        a: 'Environ 65 minutes (86 km) via l’A6 et la E701.',
      },
      {
        q: 'Les villas de Sea Caves sont-elles incluses dans les 115 € ?',
        a: 'Oui, village de Peyia, Cap St Georges et Sea Caves sont compris.',
      },
    ],
  },
  'limassol-to-ayia-napa': {
    overviewHeading: 'Transfert privé Limassol – Ayia Napa : 75 min vers la côte est (115 €)',
    overviewParagraphs: [
      'De Limassol aux eaux turquoise de Nissi Beach et Makronissos à Ayia Napa, la liaison autoroutière A1, A5 et A3 via Larnaca prend ~75 minutes (112 km).',
      'Pour 115 € fixes par berline (jusqu’à 4 personnes), évitez les changements de bus à Larnaca.',
    ],
    dropOffHeading: 'Plages et hôtels d’Ayia Napa',
    dropOffAreas: [
      'Nissi Beach et hôtels de Nissi Avenue',
      'Marina d’Ayia Napa et Ayia Thekla',
      'Makronissos et Landa Beach',
      'Port et centre d’Ayia Napa',
      'Baie de Grecian Bay',
    ],
    tipsHeading: 'Préparer Limassol → Ayia Napa',
    tips: [
      'En haute saison, les départs matinaux fluidifient l’accès vers Nissi Avenue.',
      'L’aller-retour offre −10 % sur le retour vers Limassol (207 € en journée).',
      'Pour 5 passagers ou plus, écrivez-nous avant sur WhatsApp (+357 96 867289).',
    ],
    extraFaqs: [
      {
        q: 'Quel est le prix d’une voiture privée Limassol – Nissi Beach ?',
        a: '115 € fixes de jour par berline (jusqu’à 4 voyageurs & 3 valises), ou 207 € l’aller-retour.',
      },
      {
        q: 'Assurez-vous le retour de nuit d’Ayia Napa vers Limassol ?',
        a: 'Oui, 24h/24 avec un seul supplément nuit de +10 € entre 23h00 et 07h00.',
      },
    ],
  },
  'limassol-to-nicosia': {
    overviewHeading: 'Transfert privé Limassol – Nicosie : liaison capitale (120 €)',
    overviewParagraphs: [
      'Entre le pôle économique de Limassol et les ministères, ambassades et universités de Nicosie, l’autoroute A1 file plein nord sur 84 km en ~60 minutes.',
      'Pour 120 € fixes, votre chauffeur vous prend devant vos bureaux ou votre hôtel sans souci de stationnement dans la capitale.',
    ],
    dropOffHeading: 'Quartiers desservis à Nicosie',
    dropOffAreas: [
      'Place Eleftheria et accès vieille ville',
      'Engomi (ambassades et campus)',
      'Strovolos et quartier d’affaires Acropolis',
      'Hôtels du centre (Landmark / Hilton)',
      'Aglantzia et Université de Chypre',
    ],
    tipsHeading: 'Conseils pour rendez-vous d’affaires sur l’A1',
    tips: [
      'En semaine entre 07h45 et 09h00, comptez 15 minutes de marge à l’entrée de Nicosie.',
      'L’aller-retour dans la journée débloque −10 % sur le retour (216 € de jour).',
      'Le reçu Stripe facilite vos notes de frais professionnelles.',
    ],
    extraFaqs: [
      {
        q: 'Puis-je réserver un aller-retour dans la même journée entre Limassol et Nicosie ?',
        a: 'Oui, choisissez Aller-retour pour profiter automatiquement de −10 % sur le retour (216 € de jour).',
      },
      {
        q: 'Le forfait 120 € inclut-il Engomi et Aglantzia ?',
        a: 'Oui : centre-ville, Engomi, Strovolos, Aglantzia et Latsia sont tous inclus.',
      },
    ],
  },
  'larnaca-city-to-paphos': {
    overviewHeading: 'Larnaca Ville vers Paphos : changement d’hôtel sans stress (140 €)',
    overviewParagraphs: [
      'Entre Finikoudes ou Mackenzie Beach à Larnaca et les hôtels côtiers de Paphos, les 138 km par A5, A1 et A6 via Limassol s’effectuent en ~90 minutes porte-à-porte.',
      'Idéal pour un séjour combiné est-ouest : pour 140 €, nos berlines prennent en charge jusqu’à 4 personnes et 3 valises directement à votre réception.',
    ],
    dropOffHeading: 'Zones de destination à Paphos',
    dropOffAreas: [
      'Port de Kato Paphos et stations balnéaires',
      'Avenue des Tombeaux des Rois',
      'Hôtels Elysium, Annabelle & Almyra',
      'Quartier Universal et ville haute Ktima',
      'Hôtels de Yeroskipou',
    ],
    tipsHeading: 'Conseils pour vos transferts d’hôtel à hôtel',
    tips: [
      'Les départs vers 11h00–12h00 coïncident parfaitement avec les horaires de check-out.',
      'Un arrêt rapide sur l’aire de Limassol est gratuit sur demande.',
      'Réglez seulement 20 € d’acompte par Stripe et le solde (120 €) au chauffeur sur place.',
    ],
    extraFaqs: [
      {
        q: 'Quelle différence entre Larnaca Ville (140 €) et Larnaca Aéroport (135 €) ?',
        a: 'Le départ ville à 140 € couvre tous les hôtels de Finikoudes, Mackenzie et Dhekelia Road.',
      },
      {
        q: 'Trois grandes valises tiennent-elles pour un transfert inter-hôtels ?',
        a: 'Oui, chaque berline accueille 4 passagers et 3 valises de taille standard sans supplément.',
      },
    ],
  },
  'larnaca-city-to-coral-bay': {
    overviewHeading: 'Larnaca Ville vers Coral Bay : direct d’est en ouest en villa (160 €)',
    overviewParagraphs: [
      'D’un hôtel de Larnaca aux criques de Coral Bay, la traversée de 150 km via A5, A1, A6 et B7 prend environ 100 minutes.',
      'Pour 160 € fixes par berline, votre famille évite les manipulations de valises dans les gares routières.',
    ],
    dropOffHeading: 'Secteurs couverts à Coral Bay',
    dropOffAreas: [
      'Coral Bay Strip et plage centrale',
      'Coral Beach Hotel & Spa',
      'Corallia Bay & Maa-Palaeokastro',
      'Littoral de Potima & Kissonerga',
      'Villas de la route de Sea Caves',
    ],
    tipsHeading: 'Astuces pour Larnaca → Coral Bay',
    tips: [
      'Joignez le nom d’hôtel à Larnaca et la localisation Google Maps de votre villa.',
      'Sièges enfants gratuits installés avant départ sur demande.',
      'Aller-retour à −10 % sur le trajet retour (288 € de jour).',
    ],
    extraFaqs: [
      {
        q: 'Prenez-vous en charge à Mackenzie Beach et Oroklini vers Coral Bay ?',
        a: 'Oui, Finikoudes, Mackenzie, le centre et Dhekelia Road / Oroklini coûtent 160 €.',
      },
      {
        q: 'Combien de temps dure le trajet direct Larnaca Ville → Coral Bay ?',
        a: 'Environ 100 minutes (150 km) sans arrêt via Limassol.',
      },
    ],
  },
  'larnaca-city-to-peyia': {
    overviewHeading: 'Larnaca Ville vers Peyia : transfert direct sur les hauteurs (160 €)',
    overviewParagraphs: [
      'Relier les appartements du littoral de Larnaca aux collines de Peyia prend ~105 minutes (155 km) par A5, A1, A6 et E701.',
      'Notre forfait de 160 € remplace avantageusement les correspondances de bus et la course finale en taxi local depuis Paphos.',
    ],
    dropOffHeading: 'Zones couvertes à Peyia',
    dropOffAreas: [
      'Place et centre du village de Peyia',
      'Cap St Georges Hotel & Resort',
      'Villas sur les collines de Haut-Peyia',
      'Sea Caves & Agios Georgios',
      'Bas-Peyia au-dessus de Coral Bay',
    ],
    tipsHeading: 'Conseils pour votre venue à Peyia',
    tips: [
      'Partagez un lien Google Maps pour localiser sans erreur les villas de colline.',
      'Rehausseurs ou sièges bébé offerts si précisés dans les commentaires.',
      'Supplément nuit de +10 € uniquement de 23h00 à 07h00.',
    ],
    extraFaqs: [
      {
        q: 'Le Cap St Georges Hotel est-il compris dans les 160 € depuis Larnaca Ville ?',
        a: 'Oui, tout Peyia y compris Cap St Georges et Sea Caves est inclus dans les 160 €.',
      },
      {
        q: 'Quelle capacité de bagages sur cette longue distance ?',
        a: 'Jusqu’à 4 voyageurs et 3 grandes valises par berline.',
      },
    ],
  },
  'larnaca-city-to-polis': {
    overviewHeading: 'Larnaca Ville vers Polis & Latchi : porte-à-porte complet (200 €)',
    overviewParagraphs: [
      'Rejoignez Polis Chrysochous et la marina de Latchi aux portes d’Akamas depuis Larnaca en ~120 minutes (175 km) par A5, A1, A6 via Limassol puis la route B7.',
      'Pour 200 € fixes par véhicule, vous atteignez directement Anassa Resort ou les embarcadères de Latchi sans trois changements de bus.',
    ],
    dropOffHeading: 'Zones autour de Polis & Latchi',
    dropOffAreas: [
      'Port de Latchi & villas côtières',
      'Anassa Resort & Bains d’Aphrodite',
      'Centre de Polis Chrysochous',
      'Prodromi & Neo Chorio',
      'Plages d’Argaka',
    ],
    tipsHeading: 'Conseils pour traverser l’île en 2 heures',
    tips: [
      'Demandez sans frais une halte café vers Limassol ou Paphos.',
      'Acompte de 20 € en ligne via Stripe et annulation gratuite jusqu’à 24 h avant.',
      'Remise de 10 % sur le trajet retour en réservant l’aller-retour (360 € de jour).',
    ],
    extraFaqs: [
      {
        q: 'Les 200 € incluent-ils le port de Latchi et Neo Chorio ?',
        a: 'Oui : Polis, Prodromi, Latchi, Anassa Resort, Neo Chorio et Argaka sans aucun supplément.',
      },
      {
        q: 'Peut-on faire une pause rapide pendant le trajet vers Polis ?',
        a: 'Oui, un arrêt détente vers Limassol est toujours gratuit sur demande.',
      },
    ],
  },
  'nicosia-to-paphos': {
    overviewHeading: 'Transfert privé Nicosie – Paphos : de la capitale à la mer (150 €)',
    overviewParagraphs: [
      'De Nicosie aux plages de Paphos, les 148 km descendent par l’A1 jusqu’à Limassol puis filent plein ouest sur l’A6 en ~100 minutes.',
      'À 150 € fixes la voiture, diplomates et voyageurs du week-end profitent d’un service direct sans attente en gare.',
    ],
    dropOffHeading: 'Quartiers couverts à Paphos',
    dropOffAreas: [
      'Port de Kato Paphos & promenade',
      'Elysium, Annabelle & Almyra Resorts',
      'Tombs of the Kings Road',
      'Ville haute Ktima',
      'Chloraka & Yeroskipou',
    ],
    tipsHeading: 'Conseils pour Nicosie ↔ Paphos',
    tips: [
      'Dans la vieille ville piétonne de Nicosie, le rendez-vous se fait place Eleftheria.',
      'Pour un week-end, l’aller-retour bénéficie de −10 % au retour (270 € de jour).',
      'Annulation gratuite jusqu’à 24 h avant le départ.',
    ],
    extraFaqs: [
      {
        q: 'Combien de temps dure Nicosie → Kato Paphos ?',
        a: 'Environ 100 minutes (148 km) via l’A1 et l’A6 par Limassol.',
      },
      {
        q: 'Le tarif 150 € s’applique-t-il depuis Engomi et Strovolos ?',
        a: 'Oui, Engomi, Strovolos, Aglantzia, Latsia et le centre coûtent 150 €.',
      },
    ],
  },
  'ayia-napa-to-paphos': {
    overviewHeading: 'Transfert Ayia Napa – Paphos : d’une côte à l’autre (180 €)',
    overviewParagraphs: [
      'Relier les plages de sable blanc d’Ayia Napa au port historique de Paphos prend ~120 minutes (178 km) sur A3, A5, A1 et A6 via Limassol.',
      'Au lieu de perdre une demi-journée avec vos bagages en bus, voyagez directement pour 180 € fixes de Nissi Beach à votre hôtel à Paphos.',
    ],
    dropOffHeading: 'Zones couvertes à Paphos',
    dropOffAreas: [
      'Kato Paphos & Parc Archéologique',
      'Hôtels de Tombs of the Kings',
      'Resorts de Yeroskipou',
      'Villas côtières à Chloraka',
      'Universal & Haut-Paphos',
    ],
    tipsHeading: 'Conseils entre deux stations balnéaires',
    tips: [
      'Un départ entre 10h30 et 11h30 cadre idéalement avec les check-out/check-in hôteliers.',
      'Habitacle climatisé pour 4 passagers et 3 valises.',
      'Sièges auto gratuits et halte autoroutière inclus sur demande.',
    ],
    extraFaqs: [
      {
        q: 'Combien coûte un transfert privé Ayia Napa ↔ Paphos ?',
        a: '180 € fixes en journée dans les deux sens (+10 € entre 23h00 et 07h00).',
      },
      {
        q: 'Prenez-vous aussi à Makronissos et Ayia Thekla ?',
        a: 'Oui : Nissi Beach, Makronissos, Ayia Thekla, le centre et Cape Greco sont inclus.',
      },
    ],
  },
  'protaras-to-paphos': {
    overviewHeading: 'Transfert Protaras – Paphos : de Fig Tree Bay vers l’ouest (190 €)',
    overviewParagraphs: [
      'Des eaux calmes de Protaras à la côte ouest de Paphos, les 188 km via A3, A5, A1 et A6 prennent ~130 minutes.',
      'En l’absence de bus direct, les familles apprécient le confort de notre berline à 190 € avec sièges enfants fournis gratuitement.',
    ],
    dropOffHeading: 'Secteurs de Paphos depuis Protaras',
    dropOffAreas: [
      'Port de Kato Paphos',
      'Avenue Tombs of the Kings',
      'Resorts familiaux à Yeroskipou',
      'Chloraka & Kissonerga',
      'Centre-ville Ktima',
    ],
    tipsHeading: 'Conseils aux familles changeant de côte',
    tips: [
      'Précisez l’âge des enfants pour installer gratuitement les sièges adaptés.',
      'Ajoutez un point Google Maps pour les villas de Pernera ou Kapparis.',
      'Tarif nuit unique de +10 € entre 23h00 et 07h00.',
    ],
    extraFaqs: [
      {
        q: 'Les 190 € valent-ils aussi au départ de Pernera et Kapparis ?',
        a: 'Oui, tout Protaras (Fig Tree Bay, Pernera, Kapparis, Konnos Bay) est à 190 €.',
      },
      {
        q: 'Quelle est la durée directe Protaras → Paphos ?',
        a: 'Environ 130 minutes (188 km) par autoroute via Limassol.',
      },
    ],
  },
  'coral-bay-to-nicosia': {
    overviewHeading: 'Transfert privé Coral Bay – Nicosie : de la plage à la capitale (170 €)',
    overviewParagraphs: [
      'Depuis votre villa à Coral Bay jusqu’au cœur de Nicosie, comptez ~115 minutes (162 km) via B7, A6 par Limassol et A1 plein nord.',
      'Pour 170 € fixes par véhicule, évitez les gares routières avec vos bagages.',
    ],
    dropOffHeading: 'Secteurs desservis à Nicosie',
    dropOffAreas: [
      'Centre & Place Eleftheria',
      'Engomi (ambassades & universités)',
      'Strovolos & Acropolis',
      'Accès routiers vieille ville',
      'Aglantzia & Latsia',
    ],
    tipsHeading: 'Conseils Coral Bay → Nicosie',
    tips: [
      'Transmettez le pin Google Maps de la villa pour un accueil précis.',
      'Prévoyez 15 minutes de marge les matins de semaine à l’approche de Nicosie.',
      'Aller-retour avec −10 % sur le trajet retour (306 € de jour).',
    ],
    extraFaqs: [
      {
        q: 'Prenez-vous aux villas Sea Caves et Corallia Bay vers Nicosie ?',
        a: 'Oui, Coral Bay, Corallia Bay et Sea Caves sont à 170 € fixes.',
      },
      {
        q: 'Combien de temps dure Coral Bay → Nicosie centre ?',
        a: 'Environ 115 minutes (162 km) via Limassol et Kofinou.',
      },
    ],
  },
  'coral-bay-to-ayia-napa': {
    overviewHeading: 'Transfert Coral Bay – Ayia Napa : relier les plus belles plages (190 €)',
    overviewParagraphs: [
      'Reliez les criques de Coral Bay au sable blanc de Nissi Beach en ~130 minutes (192 km) via B7, A6, A1, A5 et A3 par Limassol.',
      'Épargnez-vous quatre changements de bus pour 190 € fixes tout compris.',
    ],
    dropOffHeading: 'Zones couvertes à Ayia Napa',
    dropOffAreas: [
      'Nissi Beach & Sandy Bay',
      'Makronissos & Landa Beach',
      'Port et centre d’Ayia Napa',
      'Grecian Bay',
      'Ayia Thekla & Marina',
    ],
    tipsHeading: 'Astuces de traversée est-ouest',
    tips: [
      'Un départ à 11h00 coïncide idéalement avec la remise des clés.',
      'Pause café près de Limassol possible gratuitement en chemin.',
      'Jusqu’à 4 voyageurs et 3 valises ; écrivez sur WhatsApp dès 5 personnes.',
    ],
    extraFaqs: [
      {
        q: 'Quel est le tarif privé entre Coral Bay et Ayia Napa ?',
        a: '190 € fixes le jour dans les deux sens (+10 € de nuit entre 23h00 et 07h00).',
      },
      {
        q: 'Y a-t-il des frais pour 3 grandes valises ?',
        a: 'Non, jusqu’à 3 valises standards et 4 passagers sont inclus sans supplément.',
      },
    ],
  },
  'coral-bay-to-protaras': {
    overviewHeading: 'Transfert Coral Bay – Protaras : liaison côtière directe (200 €)',
    overviewParagraphs: [
      'De Coral Bay à Fig Tree Bay à Protaras, les 202 km via B7, A6, A1, A5 et A3 prennent ~140 minutes.',
      'À 200 € fixes par berline, voyagez en famille avec climatisation et sièges enfants gratuits sans aucune correspondance.',
    ],
    dropOffHeading: 'Secteurs à Protaras',
    dropOffAreas: [
      'Fig Tree Bay & artère principale',
      'Pernera (hôtels et villas)',
      'Kapparis & baie de Malama',
      'Konnos Bay',
      'Sunrise Beach',
    ],
    tipsHeading: 'Conseils pour cette liaison de 202 km',
    tips: [
      'Signalez vos besoins de rehausseurs lors de la commande.',
      'Courte halte possible à Limassol ou Larnaca sur simple demande.',
      'Partagez les coordonnées Google Maps entre deux locations privées.',
    ],
    extraFaqs: [
      {
        q: 'Pernera et Kapparis sont-ils inclus dans les 200 € vers Protaras ?',
        a: 'Oui, Fig Tree Bay, Pernera, Kapparis, Konnos Bay et le centre sont compris.',
      },
      {
        q: 'Quelle est la durée directe Coral Bay → Protaras ?',
        a: 'Environ 140 minutes (202 km) par le réseau autoroutier sud.',
      },
    ],
  },
  'peyia-to-nicosia': {
    overviewHeading: 'Transfert privé Peyia – Nicosie : des hauteurs à la capitale (170 €)',
    overviewParagraphs: [
      'Depuis Peyia et Cap St Georges, comptez ~120 minutes (168 km) en descendant vers Paphos puis par les autoroutes A6 et A1 via Limassol jusqu’à Nicosie.',
      'Prise en charge à 170 € fixes au portail de votre maison sans marche en côte avec valises.',
    ],
    dropOffHeading: 'Quartiers à Nicosie depuis Peyia',
    dropOffAreas: [
      'Centre & Place Eleftheria',
      'Engomi (universités & ambassades)',
      'Strovolos & Acropolis',
      'Secteur Landmark / Hilton',
      'Aglantzia & Latsia',
    ],
    tipsHeading: 'Conseils pour Peyia → Nicosie',
    tips: [
      'Indiquez la position Google Maps si la villa n’a pas de numéro de rue.',
      'L’aller-retour réduit le retour de 10 % (306 € de jour).',
      'Acompte Stripe de 20 € et annulation gratuite 24 h avant.',
    ],
    extraFaqs: [
      {
        q: 'Prenez-vous directement au Cap St Georges Resort pour Nicosie ?',
        a: 'Oui, Cap St Georges, Haut-Peyia et Sea Caves sont tous au tarif fixe de 170 €.',
      },
      {
        q: 'Combien de temps de Peyia vers Engomi ou le centre de Nicosie ?',
        a: 'Environ 120 minutes (168 km) par les autoroutes A6 et A1.',
      },
    ],
  },
  'peyia-to-ayia-napa': {
    overviewHeading: 'Transfert Peyia – Ayia Napa : traversée complète de l’île (200 €)',
    overviewParagraphs: [
      'Relier les falaises de Peyia aux plages d’Ayia Napa représente 198 km sur E701, A6, A1, A5 et A3 (~135 minutes).',
      'Pour 200 € fixes par berline, jusqu’à 4 personnes rejoignent directement leur hôtel sans quatre changements de bus.',
    ],
    dropOffHeading: 'Zones desservies à Ayia Napa',
    dropOffAreas: [
      'Nissi Beach & zone hôtelière',
      'Makronissos & Landa Beach',
      'Port et centre d’Ayia Napa',
      'Grecian Bay',
      'Ayia Thekla & Marina',
    ],
    tipsHeading: 'Conseils pour ce grand trajet',
    tips: [
      'Transmettez le point GPS de votre villa à Peyia par WhatsApp (+357 96 867289).',
      'Halte détente gratuite possible près de Limassol.',
      'Dès 5 voyageurs, contactez-nous au préalable sur WhatsApp.',
    ],
    extraFaqs: [
      {
        q: 'Les 200 € s’appliquent-ils aussi au retour Ayia Napa → Peyia ?',
        a: 'Oui, tarif identique de 200 € le jour dans les deux sens (+10 € de 23h00 à 07h00).',
      },
      {
        q: 'Que comprend exactement ce forfait de 200 € ?',
        a: 'La berline climatisée privée porte-à-porte jusqu’à 4 passagers et 3 valises standards.',
      },
    ],
  },
  'peyia-to-protaras': {
    overviewHeading: 'Transfert Peyia – Protaras : la plus longue traversée côtière (200 €)',
    overviewParagraphs: [
      'Entre Peyia au nord-ouest et Fig Tree Bay à Protaras à l’est, les 208 km par E701, A6, A1, A5 et A3 prennent ~145 minutes.',
      'Pour 200 € fixes par voiture, les familles changent aisément de côte entre villa et complexe balnéaire.',
    ],
    dropOffHeading: 'Secteurs à Protaras depuis Peyia',
    dropOffAreas: [
      'Fig Tree Bay & artère principale',
      'Plages et hôtels de Pernera',
      'Kapparis & Malama',
      'Konnos Bay & Cape Greco',
      'Secteur Sunrise Beach',
    ],
    tipsHeading: 'Conseils pour les 208 km d’ouest en est',
    tips: [
      'Mentionnez l’âge des enfants pour préparer gratuitement les sièges auto.',
      'Pause café de 5 minutes vers Limassol ou Larnaca offerte sur demande.',
      'De nuit (23h00–07h00), seul un forfait de +10 € s’ajoute (210 € au total).',
    ],
    extraFaqs: [
      {
        q: 'Combien coûte Peyia → Fig Tree Bay ou Pernera en véhicule privé ?',
        a: '200 € fixes le jour par berline dans les deux sens (+10 € la nuit de 23h00 à 07h00).',
      },
      {
        q: 'Le coffre suffit-il pour deux semaines de vacances en famille ?',
        a: 'La berline accepte 4 personnes et 3 grandes valises ; contactez-nous sur WhatsApp pour bagages hors format.',
      },
    ],
  },
};

export default fr;
