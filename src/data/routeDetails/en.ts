import type { RouteDetailsMap } from './types';

const en: RouteDetailsMap = {
  'larnaca-airport-to-limassol': {
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
  'paphos-airport-to-limassol': {
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
  'larnaca-airport-to-paphos': {
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
  'paphos-airport-to-larnaca-city': {
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
  'paphos-airport-to-ayia-napa': {
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
  'paphos-airport-to-protaras': {
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
  'paphos-airport-to-nicosia': {
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
  'larnaca-airport-to-coral-bay': {
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
  'larnaca-airport-to-paphos-airport': {
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
  'limassol-to-paphos': {
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
  'larnaca-airport-to-peyia': {
    overviewHeading: 'Larnaca Airport (LCA) to Peyia: Coast-to-Hills Transfer (€160)',
    overviewParagraphs: [
      'Peyia sits above Coral Bay along limestone terraces overlooking western Cyprus, 152 km from Larnaca Airport (LCA). After crossing the southern highway spine (A5, A1, and A6 via Limassol), your driver follows the coastal B7 past Paphos and climbs directly onto the E701 hillside lanes to your villa or resort in ~105 minutes.',
      'Reaching Upper Peyia by bus requires two or three separate changes through Paphos and steep walks with suitcases. A fixed €160 private sedan drops up to 4 guests and 3 large bags right inside your driveway.',
    ],
    dropOffHeading: 'Peyia Districts Included in Fixed Rate',
    dropOffAreas: [
      'Upper Peyia Village Square & Hillside Villas',
      'Cap St Georges Hotel & Resort',
      'Agios Georgios & Sea Caves Road',
      'Lower Peyia & Coral Bay Ridge',
      'Akoursos & Kathikas Turnoff',
    ],
    tipsHeading: 'Booking Tips for Peyia Villa Arrivals',
    tips: [
      'Hillside villas often have unmarked side lanes—send your Google Maps pin via WhatsApp (+357 96 867289) after booking.',
      'Night landings between 23:00 and 07:00 add only a flat +€10 night supplement (€170 total).',
      'Select Round trip to save 10% on the return transfer back to Larnaca Airport (€288 daytime total).',
    ],
    extraFaqs: [
      {
        q: 'Does €160 cover Cap St Georges Hotel and Upper Peyia hillside villas?',
        a: 'Yes, the €160 daytime fixed rate covers Lower Peyia, Upper Peyia village, Cap St Georges Resort, and residential hillside villas.',
      },
      {
        q: 'How long does it take from Larnaca Airport to Peyia?',
        a: 'Expect approximately 105 minutes (152 km) via A5, A1, A6, and coastal E701 with no bus changes.',
      },
    ],
  },
  'larnaca-airport-to-polis': {
    overviewHeading: 'Larnaca Airport (LCA) to Polis & Latchi: Across Cyprus to Akamas (€180)',
    overviewParagraphs: [
      'Located on the northwestern Chrysochous Bay beside the Akamas Peninsula, Polis and Latchi Harbour lie 170 km from Larnaca Airport (LCA). Following the A5, A1, and A6 through Limassol to Paphos, our route winds north along the scenic B7 mountain road past Stroumbi and Kathikas, arriving in roughly 120 minutes.',
      'Public transit to Polis requires three separate legs (airport bus to Limassol or Larnaca, intercity bus to Paphos, and rural route 645 north over the hills), making a direct €180 private sedan invaluable after a flight.',
    ],
    dropOffHeading: 'Polis Chrysochous & Latchi Drop-Off Zones',
    dropOffAreas: [
      'Latchi Harbour, Marina & Anassa Resort',
      'Polis Chrysochous Town & Boutique Hotels',
      'Prodromi & Neo Chorio (Akamas Edge)',
      'Baths of Aphrodite Coastal Road',
      'Argaka & Gialia Beachfront Villas',
    ],
    tipsHeading: 'Practical Advice for LCA → Polis Travelers',
    tips: [
      'Rural road B7 through Stroumbi includes gentle mountain bends; our sedans offer climate control and steady highway suspension.',
      'Night arrivals (23:00–07:00) pay only +€10 flat over €180 (€190 total), avoiding impossible overnight bus gaps.',
      'Share boat-charter timing or hotel check-in details in comments so we coordinate smoothly.',
    ],
    extraFaqs: [
      {
        q: 'Are Latchi Marina and Neo Chorio covered in the €180 Larnaca to Polis rate?',
        a: 'Yes, Polis town center, Latchi Harbour, Anassa Resort, Neo Chorio, and Argaka coastal villas are all served for €180.',
      },
      {
        q: 'Is there any direct bus from Larnaca Airport to Polis Chrysochous?',
        a: 'No direct airport link exists; taking buses takes 4+ hours with multiple changes, compared to ~120 minutes door-to-door by private sedan.',
      },
    ],
  },
  'limassol-to-larnaca-city': {
    overviewHeading: 'Limassol to Larnaca City Transfer: Fast A1 & A5 Link (€75)',
    overviewParagraphs: [
      'Moving between Limassol’s business districts and Larnaca’s Finikoudes waterfront or Mackenzie Beach takes ~50 minutes (70 km) east via the A1 and A5 motorways through Kofinou.',
      'Whether heading to maritime offices, seaside dining, or a multi-stop coastal holiday, our Limassol-based chauffeur picks you up 10 minutes early at any Limassol address for a fixed €75 per car.',
    ],
    dropOffHeading: 'Larnaca City Drop-Off Locations',
    dropOffAreas: [
      'Finikoudes Promenade & Europe Square',
      'Mackenzie Beach Restaurants & Suites',
      'Larnaca Marina & Saint Lazarus Quarter',
      'Dhekelia Road & Oroklini Coastal Strip',
      'Livadia & Larnaca Salt Lake Access',
    ],
    tipsHeading: 'Intercity Tips Between Limassol and Larnaca',
    tips: [
      'Save 10% on the return trip (€135 total round trip by day) when planning a same-day meeting or beach day.',
      'Up to 4 adults and 3 large suitcases travel comfortably for the exact same €75 flat sedan rate.',
      'Drivers confirm pickup 10 minutes ahead directly at Limassol Marina, The Oval, or residential gates.',
    ],
    extraFaqs: [
      {
        q: 'Does €75 apply both from Limassol to Larnaca City and from Larnaca City back to Limassol?',
        a: 'Yes, the route runs identically in both directions for €75 by day (+€10 night supplement from 23:00 to 07:00).',
      },
      {
        q: 'How long does Limassol to Finikoudes in Larnaca take?',
        a: 'Approximately 50 minutes along the A1 and A5 highways (70 km) with zero stops.',
      },
    ],
  },
  'limassol-to-coral-bay': {
    overviewHeading: 'Limassol to Coral Bay Transfer: Coastal Escape in ~60 Min (€110)',
    overviewParagraphs: [
      'Swap Limassol’s waterfront for Coral Bay’s sheltered sandy crescent in roughly 60 minutes (82 km) along the scenic A6 highway and coastal B7 northwest of Paphos.',
      'Because Coral Bay sits north of Paphos city center, public intercity buses drop you far away in town—whereas our €110 private sedan brings couples and families directly to their beachfront resort or villa gate.',
    ],
    dropOffHeading: 'Coral Bay Resort & Villa Zones Covered',
    dropOffAreas: [
      'Coral Bay Beachfront & Coral Beach Hotel',
      'Corallia Bay & Maa-Palaeokastro',
      'Coral Bay Dining & Resort Strip',
      'Potima Bay & Kissonerga Approach',
      'Lower Pegeia Coastal Villas',
    ],
    tipsHeading: 'Tips for Day Trips & Split-Stay Transfers',
    tips: [
      'Book a same-day or weekend return in one form to get 10% off the return leg (€198 total round trip by day).',
      'Complimentary child and booster seats fit easily in the sedan for family beach trips.',
      'Include your beach hotel or villa pin in the booking notes for exact gate drop-off.',
    ],
    extraFaqs: [
      {
        q: 'Is Coral Beach Hotel included in the €110 Limassol to Coral Bay rate?',
        a: 'Yes, Coral Beach Hotel, Corallia Bay, and all resorts along the Coral Bay Strip are covered at €110.',
      },
      {
        q: 'Can I book a same-day round trip from Limassol to Coral Bay?',
        a: 'Yes, select Round trip in the calculator to apply an automatic 10% return discount (€198 daytime total).',
      },
    ],
  },
  'limassol-to-peyia': {
    overviewHeading: 'Limassol to Peyia Private Transfer: Direct to Paphos Hills (€115)',
    overviewParagraphs: [
      'Travelling from Limassol to residential Peyia or the coastal Cap St Georges strip takes around 65 minutes (86 km) west via the A6 highway past Kourion and up the E701 coastal hills.',
      'With zero need to transfer from Limassol buses to Paphos local shuttles uphill, our fixed €115 door-to-door sedan carries all bags straight to your porch.',
    ],
    dropOffHeading: 'Peyia Drop-Off Areas Served',
    dropOffAreas: [
      'Peyia Village Center & Square',
      'Cap St Georges Hotel & Resort',
      'Sea Caves & Agios Georgios Villas',
      'Upper Peyia Panorama Lanes',
      'Vikla & Coral Bay Border Villas',
    ],
    tipsHeading: 'Tips for Traveling from Limassol to Peyia',
    tips: [
      'Sending a Google Maps link for private Peyia villa estates ensures direct gate-to-gate arrival.',
      'Up to 4 passengers and 3 suitcases share the flat €115 daytime sedan rate (+€10 from 23:00 to 07:00).',
      'Returning to Limassol? Lock in −10% on the return trip when booking round trip (€207 daytime total).',
    ],
    extraFaqs: [
      {
        q: 'How long is the drive from Limassol to Peyia or Cap St Georges?',
        a: 'Approximately 65 minutes (86 km) along the A6 coastal highway and E701.',
      },
      {
        q: 'Does €115 cover Sea Caves villas as well as Peyia center?',
        a: 'Yes, Peyia village, hillside residential roads, Cap St Georges, and Sea Caves villas are covered in the €115 fare.',
      },
    ],
  },
  'limassol-to-ayia-napa': {
    overviewHeading: 'Limassol to Ayia Napa Private Transfer: 75-Min East Coast Run (€115)',
    overviewParagraphs: [
      'Going from Limassol to Cyprus’s white-sand bays in Ayia Napa takes ~75 minutes (112 km) straight along the A1, A5, and A3 motorways past Larnaca.',
      'Instead of navigating multi-hub intercity coaches around Larnaca, groups of up to 4 travelers pay a single flat €115 per vehicle straight to Nissi Beach, Makronissos, or Ayia Napa Marina.',
    ],
    dropOffHeading: 'Ayia Napa Resorts & Beaches Covered',
    dropOffAreas: [
      'Nissi Beach & Nissi Avenue Hotels',
      'Ayia Napa Marina & Ayia Thekla',
      'Makronissos & Landa Beach',
      'Ayia Napa Harbour & Square',
      'Grecian Bay & Sculpture Park Road',
    ],
    tipsHeading: 'Planning Your Limassol → Ayia Napa Trip',
    tips: [
      'Summer traffic near Nissi Avenue builds late afternoon—morning pickups make the 75-min run effortless.',
      'Return same-night or end-of-weekend with 10% off the return leg (€207 total round trip by day).',
      'Group of 5+ beachgoers? Message us on WhatsApp (+357 96 867289) before booking.',
    ],
    extraFaqs: [
      {
        q: 'How much does a private car from Limassol to Nissi Beach cost?',
        a: 'The fixed daytime rate is €115 per sedan (up to 4 passengers & 3 suitcases), or €207 total round trip.',
      },
      {
        q: 'Do you pick up late at night for return rides from Ayia Napa to Limassol?',
        a: 'Yes, 24/7 pickups operate in both directions with only a +€10 flat night tariff between 23:00 and 07:00.',
      },
    ],
  },
  'limassol-to-nicosia': {
    overviewHeading: 'Limassol to Nicosia Private Transfer: Capital Business Corridor (€120)',
    overviewParagraphs: [
      'Connecting Limassol’s financial towers with Nicosia’s government ministries, embassies, and universities, the 84 km northbound drive up the A1 motorway takes around 60 minutes.',
      'Designed for executives, embassy visitors, and families, our fixed €120 sedan picks up from Limassol offices or hotels and drops straight at your Nicosia entrance without parking hassle.',
    ],
    dropOffHeading: 'Key Drop-Off Districts in Nicosia',
    dropOffAreas: [
      'Eleftheria Square & Old City Pedestrian Access',
      'Engomi (Embassies & Universities)',
      'Strovolos & Acropolis Corporate Quarter',
      'Center Hotels (Landmark / Cleopatra / Hilton)',
      'Aglantzia & University of Cyprus Campus',
    ],
    tipsHeading: 'Business & Commute Tips for A1 Northbound',
    tips: [
      'Allow a 15-minute buffer if arriving in Nicosia between 07:45 and 09:00 on weekdays.',
      'Pre-book a round trip for full-day meetings to receive 10% off the return ride (€216 total by day).',
      'Stripe card payments generate an email confirmation suitable for corporate expense claims.',
    ],
    extraFaqs: [
      {
        q: 'Can you wait or arrange a same-day return from Nicosia back to Limassol?',
        a: 'Yes, schedule your exact return time using Round trip to automatically get 10% off the return leg (€216 daytime total).',
      },
      {
        q: 'Does €120 include embassies in Engomi and campuses in Aglantzia?',
        a: 'Yes, central Nicosia, Engomi, Strovolos, Aglantzia, and Latsia are all included in the flat €120 fare.',
      },
    ],
  },
  'larnaca-city-to-paphos': {
    overviewHeading: 'Larnaca City to Paphos: Direct Two-Coast Hotel Transfer (€140)',
    overviewParagraphs: [
      'Traveling between Larnaca’s Finikoudes promenade and Paphos resorts is seamless along the 138 km A5, A1, and A6 highway corridor via Limassol, taking ~90 minutes door-to-door.',
      'Ideal for travelers splitting their Cyprus stay across east and west coasts, our €140 private sedan loads up to 4 travelers and 3 large bags right at your Larnaca reception.',
    ],
    dropOffHeading: 'Paphos Drop-Off Destinations',
    dropOffAreas: [
      'Kato Paphos Harbour & Coastal Resorts',
      'Tombs of the Kings Road',
      'Elysium, Annabelle & Almyra Hotels',
      'Universal & Upper Ktima Quarter',
      'Yeroskipou Beachfront',
    ],
    tipsHeading: 'Hotel-Change Transfer Advice',
    tips: [
      'Mid-day pickups matching hotel check-out (11:00–12:00) avoid morning rush around Limassol exits.',
      'Short coffee or restroom stops along the highway past Limassol can be requested free of charge.',
      'Pay just €20 deposit via Stripe online and settle the €120 balance with your driver upon arrival.',
    ],
    extraFaqs: [
      {
        q: 'How does Larnaca City to Paphos differ from Larnaca Airport (LCA) to Paphos?',
        a: 'City pickups include hotels along Finikoudes, Mackenzie Beach, and Dhekelia Road for €140 (138 km, ~90 min), while LCA Airport pickups cost €135.',
      },
      {
        q: 'Can you transport 3 full-size suitcases on hotel moves between coasts?',
        a: 'Yes, each sedan fits up to 4 passengers and 3 standard suitcases; contact us on WhatsApp if bringing extra trunks.',
      },
    ],
  },
  'larnaca-city-to-coral-bay': {
    overviewHeading: 'Larnaca City to Coral Bay: Seamless East-to-West Villa Move (€160)',
    overviewParagraphs: [
      'Moving from a Larnaca city stay to a western beach villa in Coral Bay covers 150 km across A5, A1, and A6 via Limassol before reaching B7 north of Paphos in roughly 100 minutes.',
      'Skip unloading suitcases across city bus depots; our fixed €160 sedan takes your family straight from Finikoudes or Oroklini into your Coral Bay driveway.',
    ],
    dropOffHeading: 'Coral Bay & Pegeia Coastal Zones',
    dropOffAreas: [
      'Coral Bay Main Strip & Beach',
      'Coral Beach Hotel & Spa',
      'Corallia Bay & Maa-Palaeokastro',
      'Potima & Kissonerga Seafront',
      'Sea Caves Road Villas',
    ],
    tipsHeading: 'Smooth Multi-Stop Holiday Transfers',
    tips: [
      'Send your Coral Bay villa GPS pin alongside your Larnaca hotel name for exact door-to-door routing.',
      'Complimentary child seats can be requested in advance in booking notes.',
      'Booking a round trip brings 10% off the return transfer (€288 daytime total).',
    ],
    extraFaqs: [
      {
        q: 'Do you pick up from Mackenzie Beach or Oroklini in Larnaca for Coral Bay?',
        a: 'Yes, any hotel or apartment in Finikoudes, Mackenzie, central Larnaca, or Oroklini / Dhekelia Road is covered at €160.',
      },
      {
        q: 'How long is the direct drive from Larnaca City to Coral Bay?',
        a: 'Approximately 100 minutes (150 km) nonstop via Limassol and Paphos.',
      },
    ],
  },
  'larnaca-city-to-peyia': {
    overviewHeading: 'Larnaca City to Peyia: Direct Highway & Hilltop Transfer (€160)',
    overviewParagraphs: [
      'From Larnaca seafront apartments to Peyia’s panoramic villa hills takes around 105 minutes (155 km) via the A5, A1, and A6 expressways past Limassol and up the E701.',
      'Our fixed €160 rate keeps luggage secure in one private sedan instead of juggling long-haul coaches plus local hilltop taxis in Paphos.',
    ],
    dropOffHeading: 'Peyia Drop-Off Areas Covered',
    dropOffAreas: [
      'Upper Peyia Village & Town Square',
      'Cap St Georges Hotel & Resort',
      'Peyia Hillside Villas',
      'Sea Caves & Agios Georgios',
      'Lower Peyia (Coral Bay Access)',
    ],
    tipsHeading: 'Planning Your Move from Larnaca to Peyia',
    tips: [
      'Provide Google Maps coordinates for quiet hillside villa cul-de-sacs in Peyia.',
      'Request booster or infant seats free during checkout for family relocations.',
      'Only +€10 flat supplement applies if departing overnight between 23:00 and 07:00.',
    ],
    extraFaqs: [
      {
        q: 'Is Cap St Georges included in the €160 Larnaca City to Peyia price?',
        a: 'Yes, Peyia village, hillside villas, Sea Caves, and Cap St Georges Hotel are all included.',
      },
      {
        q: 'What is the capacity for luggage on this cross-island transfer?',
        a: 'Each private sedan accommodates up to 4 passengers and 3 full-size suitcases.',
      },
    ],
  },
  'larnaca-city-to-polis': {
    overviewHeading: 'Larnaca City to Polis & Latchi: Island-Wide Door-to-Door Sedan (€200)',
    overviewParagraphs: [
      'Travelling directly from Larnaca city to Polis Chrysochous and Latchi Marina on the Akamas peninsula saves half a day of rural bus waits. The 175 km route takes A5, A1, and A6 via Limassol before ascending the scenic B7 mountain corridor in ~120 minutes.',
      'For €200 fixed per vehicle, drivers collect directly from Larnaca hotels or residences and deliver you straight to Latchi boat moorings, Anassa Resort, or Polis accommodations.',
    ],
    dropOffHeading: 'Polis Chrysochous & Akamas Areas',
    dropOffAreas: [
      'Latchi Harbour & Marina Villas',
      'Anassa Resort & Baths of Aphrodite Road',
      'Polis Town Center',
      'Prodromi & Neo Chorio',
      'Argaka Coastal Villas',
    ],
    tipsHeading: 'Tips for Long Island Crossings to Polis',
    tips: [
      'Feel free to ask your driver for a quick coffee break near Limassol or Paphos along the 2-hour journey.',
      'Reserve with €20 online deposit or full card payment; 24-hour advance cancellations are free.',
      'Booking Round trip reduces your return journey by 10% (€360 total round trip by day).',
    ],
    extraFaqs: [
      {
        q: 'Does €200 cover Latchi Harbour and Neo Chorio as well as Polis town?',
        a: 'Yes, Polis, Prodromi, Latchi Marina, Anassa Resort, Neo Chorio, and Argaka are included for €200.',
      },
      {
        q: 'Can we make a short rest stop along the way from Larnaca to Polis?',
        a: 'Yes, brief highway service-station stops near Limassol can be requested with your driver at no extra fee.',
      },
    ],
  },
  'nicosia-to-paphos': {
    overviewHeading: 'Nicosia to Paphos Private Transfer: Capital to Coast (€150)',
    overviewParagraphs: [
      'Linking Cyprus’s inland capital with western beaches and resorts, the 148 km route takes the A1 motorway south to Limassol and heads west along the A6 coastal highway into Paphos in ~100 minutes.',
      'At €150 fixed per sedan, diplomats, business travelers, and weekenders enjoy doorstep pickup anywhere in Nicosia with zero bus-terminal transfers.',
    ],
    dropOffHeading: 'Destination Districts in Paphos',
    dropOffAreas: [
      'Kato Paphos Harbour & Coastal Promenade',
      'Elysium, Annabelle & Almyra Resorts',
      'Tombs of the Kings Road',
      'Ktima Old City Center',
      'Chloraka & Yeroskipou Resorts',
    ],
    tipsHeading: 'Practical Tips for Nicosia ↔ Paphos',
    tips: [
      'For addresses inside Old City Nicosia pedestrian streets, drivers meet right beside Eleftheria Square or vehicle-accessible lanes.',
      'Schedule a Round trip for weekend breaks to get 10% off the return ride back to Nicosia (€270 daytime total).',
      'Free cancellation up to 24 hours ahead keeps weekend plans flexible.',
    ],
    extraFaqs: [
      {
        q: 'How long is a private sedan transfer from Nicosia to Kato Paphos?',
        a: 'Approximately 100 minutes (148 km) southbound via A1 and westbound along A6 through Limassol.',
      },
      {
        q: 'Does €150 apply to Engomi and Strovolos pickups in Nicosia?',
        a: 'Yes, pickups across Engomi, Strovolos, Aglantzia, Latsia, and central Nicosia cost €150 fixed.',
      },
    ],
  },
  'ayia-napa-to-paphos': {
    overviewHeading: 'Ayia Napa to Paphos Transfer: Coast-to-Coast Resort Link (€180)',
    overviewParagraphs: [
      'Combining eastern party beaches with western UNESCO heritage sites is simple with a direct 178 km transfer along the A3, A5, A1, and A6 highways via Limassol (~120 minutes).',
      'Instead of losing half a vacation day switching buses in Larnaca and Limassol with holiday suitcases, our €180 fixed sedan picks you up at Nissi Beach and drops you right at your Paphos hotel.',
    ],
    dropOffHeading: 'Popular Drop-Off Points in Paphos',
    dropOffAreas: [
      'Kato Paphos & Archaeological Harbour',
      'Tombs of the Kings & Seafront Hotels',
      'Yeroskipou Luxury Resorts',
      'Chloraka Beachfront Villas',
      'Universal & Upper Paphos',
    ],
    tipsHeading: 'Tips for Resort-to-Resort Travel',
    tips: [
      'Morning departures around 10:30–11:30 fit hotel check-out schedules seamlessly in both resorts.',
      'All vehicles accommodate up to 4 passengers and 3 full-size bags with strong climate control.',
      'Request complimentary child seats or a quick highway coffee stop anytime.',
    ],
    extraFaqs: [
      {
        q: 'How much does a private transfer between Ayia Napa and Paphos cost?',
        a: 'The fixed daytime sedan price is €180 in either direction (+€10 flat between 23:00 and 07:00).',
      },
      {
        q: 'Can you pick up from Makronissos or Ayia Thekla resorts?',
        a: 'Yes, Nissi Beach, Makronissos, Ayia Thekla, central Ayia Napa, and Cape Greco road resorts are all included.',
      },
    ],
  },
  'protaras-to-paphos': {
    overviewHeading: 'Protaras to Paphos Transfer: Fig Tree Bay to West Coast (€190)',
    overviewParagraphs: [
      'Traveling between Cyprus’s calm eastern bays in Protaras and Paphos’s historic harbor spans 188 km across the A3, A5, A1, and A6 expressways via Limassol (~130 minutes).',
      'With zero direct public bus linking Protaras to Paphos, families especially benefit from a spacious climate-controlled sedan at €190 fixed—including complimentary child seats.',
    ],
    dropOffHeading: 'Paphos Zones Covered from Protaras',
    dropOffAreas: [
      'Kato Paphos Harbour Resorts',
      'Tombs of the Kings Strip',
      'Yeroskipou Family Resorts',
      'Chloraka & Kissonerga Road',
      'Ktima Center',
    ],
    tipsHeading: 'Advice for Families Switching Coasts',
    tips: [
      'Mention infant or booster seat needs in your checkout comments for pre-installed family safety.',
      'Include your Pernera, Kapparis, or Fig Tree Bay villa pin if staying off the main resort strip.',
      'Only a +€10 flat supplement applies during overnight hours (23:00–07:00).',
    ],
    extraFaqs: [
      {
        q: 'Does €190 apply equally from Fig Tree Bay, Pernera, and Kapparis to Paphos?',
        a: 'Yes, all Protaras neighborhoods (Fig Tree Bay, Pernera, Kapparis, Konnos Bay) share the €190 fixed rate.',
      },
      {
        q: 'How long is the direct drive from Protaras to Paphos?',
        a: 'Roughly 130 minutes (188 km) nonstop via Limassol motorways.',
      },
    ],
  },
  'coral-bay-to-nicosia': {
    overviewHeading: 'Coral Bay to Nicosia Private Transfer: Beach Villa to Capital (€170)',
    overviewParagraphs: [
      'Connecting Coral Bay’s coastal resort strip to Cyprus’s capital city covers 162 km via coastal B7, A6 through Limassol, and northbound A1 into Nicosia in ~115 minutes.',
      'Ideal for diplomats, visiting consultants, or families splitting beach and city stays, our €170 fixed sedan collects directly at your villa driveway.',
    ],
    dropOffHeading: 'Nicosia Drop-Off Areas Covered',
    dropOffAreas: [
      'Central Nicosia & Eleftheria Square',
      'Engomi Diplomatic & University Quarter',
      'Strovolos & Acropolis Business Zone',
      'Old City Hotel Access Points',
      'Aglantzia & Latsia',
    ],
    tipsHeading: 'Travel Tips for Coral Bay → Nicosia',
    tips: [
      'Send your Coral Bay villa Google Maps pin in comments so your chauffeur arrives right on time.',
      'For morning Nicosia meetings, add 15 minutes for weekday capital approach traffic on A1.',
      'Reserve Round trip for 10% off the return ride back to Coral Bay (€306 daytime total).',
    ],
    extraFaqs: [
      {
        q: 'Can drivers collect directly from Sea Caves or Corallia Bay villas for Nicosia?',
        a: 'Yes, Coral Bay, Corallia Bay, and Sea Caves villas are covered in the €170 fixed sedan fare.',
      },
      {
        q: 'How long does it take from Coral Bay to central Nicosia?',
        a: 'Typically 115 minutes (162 km) via Limassol and Kofinou.',
      },
    ],
  },
  'coral-bay-to-ayia-napa': {
    overviewHeading: 'Coral Bay to Ayia Napa Transfer: Direct Two-Resort Crossing (€190)',
    overviewParagraphs: [
      'Linking western Cyprus’s Coral Bay sands with eastern Cyprus’s Nissi Beach, the 192 km highway journey follows B7, A6, A1, A5, and A3 via Limassol in ~130 minutes.',
      'Public buses require three or four separate legs with beach luggage across cities; our fixed €190 private sedan turns the full island move into a relaxed two-hour ride.',
    ],
    dropOffHeading: 'Ayia Napa Resorts Covered',
    dropOffAreas: [
      'Nissi Beach & Sandy Bay Strip',
      'Makronissos & Landa Beach',
      'Ayia Napa Harbour & Town Square',
      'Grecian Bay Beachfront',
      'Ayia Thekla & Ayia Napa Marina',
    ],
    tipsHeading: 'Smooth Coast-to-Coast Move Tips',
    tips: [
      'Timing pickup around 11:00 aligns cleanly with villa check-out in Coral Bay and hotel check-in in Ayia Napa.',
      'Drivers gladly make a brief highway refreshment break near Limassol upon request.',
      'Each sedan takes up to 4 passengers and 3 full suitcases; ask on WhatsApp for 5+ guests.',
    ],
    extraFaqs: [
      {
        q: 'How much does a private car from Coral Bay to Ayia Napa cost?',
        a: 'Our fixed daytime sedan rate is €190 per vehicle either way (+€10 night rate from 23:00 to 07:00).',
      },
      {
        q: 'Are there any extra luggage charges for 3 large suitcases?',
        a: 'No—up to 3 standard suitcases and 4 passengers travel with zero luggage surcharges.',
      },
    ],
  },
  'coral-bay-to-protaras': {
    overviewHeading: 'Coral Bay to Protaras Transfer: Villa-to-Resort Island Crossing (€200)',
    overviewParagraphs: [
      'Crossing Cyprus from Coral Bay in the west to Fig Tree Bay and Protaras in the far east covers 202 km via B7, A6, A1, A5, and A3 in roughly 140 minutes.',
      'For €200 fixed per car, families travel door-to-door with climate control, pre-installed child seats if needed, and zero luggage hauling across multiple bus hubs.',
    ],
    dropOffHeading: 'Protaras Drop-Off Locations',
    dropOffAreas: [
      'Fig Tree Bay & Central Strip',
      'Pernera Hotels & Coastal Villas',
      'Kapparis & Malama Bay',
      'Konnos Bay Hotels',
      'Sunrise Beach Resorts',
    ],
    tipsHeading: 'Tips for the 202 km Cross-Island Drive',
    tips: [
      'Specify complimentary infant or booster seats during checkout so they arrive fitted.',
      'Short coffee breaks along the Limassol or Larnaca highway sections are available anytime.',
      'Share both villa Google Maps pins if travelling between private rentals.',
    ],
    extraFaqs: [
      {
        q: 'Does €200 include Pernera and Kapparis as well as Fig Tree Bay?',
        a: 'Yes, Fig Tree Bay, Pernera, Kapparis, Konnos Bay, and central Protaras are all included for €200.',
      },
      {
        q: 'How long is the direct drive between Coral Bay and Protaras?',
        a: 'Approximately 140 minutes (202 km) via Cyprus’s southern motorway spine.',
      },
    ],
  },
  'peyia-to-nicosia': {
    overviewHeading: 'Peyia to Nicosia Private Transfer: Western Hills to Capital (€170)',
    overviewParagraphs: [
      'Residents and guests staying in Peyia or Cap St Georges reach central Nicosia in ~120 minutes (168 km) descending E701 to Paphos and running east/north via A6 and A1 through Limassol.',
      'Avoid steep uphill walks and multiple rural bus schedules—our fixed €170 private sedan picks you up right at your villa gate.',
    ],
    dropOffHeading: 'Nicosia Districts Covered from Peyia',
    dropOffAreas: [
      'Central Nicosia & Eleftheria Square',
      'Engomi (Universities & Embassies)',
      'Strovolos & Acropolis Business District',
      'Hilton / Landmark Hotel Area',
      'Aglantzia & Latsia',
    ],
    tipsHeading: 'Booking Tips for Peyia → Nicosia',
    tips: [
      'Paste a Google Maps pin in booking comments for hillside villa driveways.',
      'Reserve Round trip for 10% savings on the journey back to Peyia (€306 daytime total).',
      'Pay just €20 deposit via Stripe or settle in full online with free 24-hour cancellation.',
    ],
    extraFaqs: [
      {
        q: 'Do you pick up at Cap St Georges Resort in Peyia for Nicosia trips?',
        a: 'Yes, Cap St Georges Resort, Upper Peyia villas, and Sea Caves pickups all cost €170 fixed.',
      },
      {
        q: 'How fast is the journey from Peyia to Engomi or central Nicosia?',
        a: 'Roughly 120 minutes (168 km) directly via A6 and A1 motorways.',
      },
    ],
  },
  'peyia-to-ayia-napa': {
    overviewHeading: 'Peyia to Ayia Napa Transfer: Full-Island Resort Connection (€200)',
    overviewParagraphs: [
      'Connecting Peyia’s western cliffs with Ayia Napa’s eastern beach bays spans 198 km along the E701, A6, A1, A5, and A3 highways (~135 minutes).',
      'For €200 flat per sedan, groups of up to 4 people skip four tedious bus transfers and ride seamlessly door-to-door across southern Cyprus.',
    ],
    dropOffHeading: 'Ayia Napa Drop-Off Zones Covered',
    dropOffAreas: [
      'Nissi Beach & Resort Strip',
      'Makronissos & Landa Beach',
      'Ayia Napa Harbour & Town Center',
      'Grecian Bay Hotels',
      'Ayia Thekla & Marina District',
    ],
    tipsHeading: 'Long-Distance Island Transfer Tips',
    tips: [
      'Share your villa coordinates in Peyia via WhatsApp (+357 96 867289) for smooth pickup.',
      'Complimentary highway comfort stops near Limassol can be requested anytime during the drive.',
      'Need two cars for 5+ travelers? Message us beforehand on WhatsApp.',
    ],
    extraFaqs: [
      {
        q: 'Does the €200 Peyia to Ayia Napa fare operate in both directions?',
        a: 'Yes, pickups from Peyia → Ayia Napa and Ayia Napa → Peyia share the same €200 fixed daytime tariff.',
      },
      {
        q: 'What is included in the flat €200 price?',
        a: 'Up to 4 passengers, 3 standard suitcases, private climate-controlled sedan, and door-to-door highway transport.',
      },
    ],
  },
  'peyia-to-protaras': {
    overviewHeading: 'Peyia to Protaras Transfer: Cyprus Coast-to-Coast Sedan (€200)',
    overviewParagraphs: [
      'Traveling between Peyia in the northwest and Protaras’s Fig Tree Bay in the east is Cyprus’s longest direct resort transfer—208 km covered in ~145 minutes via E701, A6, A1, A5, and A3.',
      'Our fixed €200 rate per vehicle makes split-coast villa holidays straightforward for families and small groups—without bus timetables or metered taxi shocks.',
    ],
    dropOffHeading: 'Protaras Areas Served from Peyia',
    dropOffAreas: [
      'Fig Tree Bay & Protaras Strip',
      'Pernera Beach & Resorts',
      'Kapparis & Malama Coast',
      'Konnos Bay & Cape Greco',
      'Sunrise Beach Area',
    ],
    tipsHeading: 'Tips for Your 208 km Coast-to-Coast Ride',
    tips: [
      'Include child seat ages in comments so seats are fitted before our driver arrives in Peyia.',
      'Optional 5-minute coffee or fuel stop near Limassol or Larnaca is always included free.',
      'Between 23:00 and 07:00, only a flat +€10 night supplement is added (€210 total).',
    ],
    extraFaqs: [
      {
        q: 'How much does a private transfer from Peyia to Fig Tree Bay or Pernera cost?',
        a: 'It is a fixed €200 per sedan in either direction during daytime hours (+€10 night supplement 23:00–07:00).',
      },
      {
        q: 'How many bags can fit for a two-week two-coast holiday?',
        a: 'Standard sedan capacity is up to 4 passengers and 3 full-size suitcases; contact us via WhatsApp if you travel with oversized gear.',
      },
    ],
  },
};

export default en;
