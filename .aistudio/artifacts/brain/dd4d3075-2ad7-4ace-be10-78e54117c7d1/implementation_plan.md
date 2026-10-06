# Limassol Relocation, SEO Routes & Night Surcharge Implementation Plan

Transition Cyprus Airport Transfers to its new Limassol headquarters at The Oval skyscraper, overhaul SEO metadata and landing page copy to prioritize key Limassol and Larnaca routes, and implement an automatic nighttime surcharge (+€10 per night leg between 23:00 and 07:00) with a transparent badge and price breakdown.

## User Review & Critical Decisions

> [!IMPORTANT]
> The following decisions were clarified and confirmed in Phase 1:
> - **Limassol Skyscraper Address**: The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cyprus.
> - **Night Surcharge Application**: Evaluated per leg (+€10 if outbound pickup is between 23:00 and 07:00, and +€10 if return trip is between 23:00 and 07:00).
> - **Night Tariff Presentation**: Clear, transparent night tariff indicator badge with an itemized price breakdown in both the booking search results and checkout modal.

---

## 1. Overview & Core Concept

- **What It Does**:
  - Updates the primary company address across the site and structured search data (Schema.org JSON-LD) to the landmark business skyscraper in Limassol (The Oval).
  - Enhances SEO tags (`<title>`, `<meta name="description">`, keywords, OpenGraph, Schema.org, and bilingual SEO article texts) to comprehensively index and highlight all Limassol routes, especially Limassol ⇄ Larnaca Airport (LCA), Limassol ⇄ Larnaca City, and bidirectional transfers.
  - Adds a dynamic nighttime pricing engine: rides booked between 11:00 PM (23:00) and 7:00 AM (07:00) receive a +€10 surcharge per night trip, with explicit UI badges, itemized line items, and synchronized backend payload transmission.
- **Target Audience / Persona**: Travelers, business professionals, expats, and tourists arriving at or departing from Larnaca and Paphos airports to/from Limassol and other Cypriot destinations.
- **Key Value**: Accurate physical presence in Limassol, improved search engine visibility for high-volume Limassol–Larnaca queries, and fair pricing compensation for drivers during unsocial night hours with complete customer transparency.

---

## 2. User Experience & Visual Design

### Key User Flows

1. **Viewing Company Location**:
   - Visitors scrolling to the footer or inspecting contact information see the official address: `The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cyprus` alongside direct WhatsApp and email contacts.
2. **Selecting Transfer Time (Booking Widget)**:
   - When a user inputs a pickup time or return time between 23:00 and 07:00, the widget dynamically detects the night window.
   - When prices are calculated, a distinct neo-brutalist night tariff badge (`🌙 Ночной тариф (23:00 – 07:00): +€10` / `🌙 Night Tariff (23:00 – 07:00): +€10`) appears in the vehicle card.
   - An itemized line shows how the total is formed: `Base fare + Night surcharge (+€10 / +€20) - 10% round-trip discount (if applicable) = Total`.
3. **Checkout Modal**:
   - The selected order summary clearly displays the night tariff line item before payment or deposit choice.
   - Order comments sent to the booking system and Google Sheets specify whether the outbound, return, or both legs included the night tariff.

### Visual Identity & Theme

- **Aesthetic Direction**: Neo-brutalist high-contrast visual design consistent with the existing brand (bold black borders `border-2` and `border-4`, crisp shadows `shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`, energetic yellow accents `#FACC15`, and clear typography).
- **Color Palette & Accents**:
  - Night Tariff Badge: Deep obsidian with yellow/amber accents (`bg-neutral-900 text-yellow-400 border-2 border-black font-black`).
  - Cards: Crisp white container cards on soft patterned backgrounds.
- **Typography & Hierarchy**:
  - High-contrast sans-serif headings with balanced text wrapping.
  - Tabular numerals (`font-mono tabular-nums` or bold numbers) for transparent price addition.

---

## 3. Key Product Decisions & Trade-Offs

- **Decision 1: Per-Leg Night Surcharge**:
  - *Chosen Approach*: Inspect both the outbound time and the return trip time independently. If the customer flies out at night (e.g. 02:00) and returns during daytime (e.g. 14:00), only +€10 is added. If both legs are at night, +€20 is added.
  - *Why*: Perfectly aligns with driver compensation realities and user fairness.
  - *Alternatives Considered*: Flat €10 fee per entire booking (disadvantages drivers on round trips where both legs are during graveyard hours).
- **Decision 2: Limassol Business Landmark**:
  - *Chosen Approach*: "The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cyprus" — Cyprus' premier iconic coastal business tower in central Limassol.
  - *Why*: Prestigious, instantly recognizable skyscraper address that elevates trustworthiness.
- **Decision 3: SEO Architecture**:
  - *Chosen Approach*: Update `<head>` metadata in `index.html`, dynamic title/description handlers in `src/App.tsx`, Schema.org TaxiService metadata with Limassol focus, and bilingual rich text in `src/components/SeoArticle.tsx` and `src/i18n/translations.ts`.
  - *Featured Destinations*: Update `DEFAULT_FEATURED_ROUTES` in `src/data/pricing.ts` to spotlight Limassol ⇄ Larnaca Airport, Limassol ⇄ Larnaca City, and Limassol ⇄ Paphos as top featured cards.

---

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                          User Interface                                │
│                                                                        │
│   ┌───────────────────────────┐      ┌─────────────────────────────┐   │
│   │   index.html & App.tsx    │      │         Footer.tsx          │   │
│   │  - SEO Title & Meta tags  │      │  - The Oval, Limassol Addr  │   │
│   │  - Schema.org (Limassol)  │      │  - Contact & Legal Mirrors  │   │
│   └─────────────┬─────────────┘      └─────────────────────────────┘   │
│                 │                                                      │
│   ┌─────────────▼──────────────────────────────────────────────────┐   │
│   │                     BookingWidget.tsx                          │   │
│   │  - calculatePrice(from, to, time, returnTime, isRoundTrip)     │   │
│   │  - isNightTime(time) helper: h >= 23 || h < 7                  │   │
│   │  - Night fee calculation: outbound (+€10) + return (+€10)      │   │
│   │  - Night tariff badge & itemized breakdown display             │   │
│   └─────────────────────────────┬──────────────────────────────────┘   │
│                                 │                                      │
│   ┌─────────────────────────────▼──────────────────────────────────┐   │
│   │                     CheckoutModal.tsx                          │   │
│   │  - Displays final price with itemized night tariff line        │   │
│   │  - Sends night fee details in booking comment & metadata       │   │
│   └─────────────────────────────┬──────────────────────────────────┘   │
└─────────────────────────────────┼──────────────────────────────────────┘
                                  ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        Backend & Integration                           │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │  server.ts (/api/create-checkout-session & /api/log-lead)      │   │
│   │  - Records night fee surcharge in comments & Stripe session   │   │
│   │  - Syncs to Google Sheets booking log with full route details  │   │
│   └────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

### Data Model & Pricing Logic

```ts
// Helper function in src/lib/dateUtils.ts (or pricing.ts):
export function isNightTime(timeStr: string): boolean {
  if (!timeStr) return false;
  const [h] = timeStr.split(':').map(Number);
  return h >= 23 || h < 7;
}

export function calculateNightSurcharge(
  time: string,
  isRoundTrip: boolean,
  returnTime?: string
): { totalNightFee: number; outboundIsNight: boolean; returnIsNight: boolean } {
  const outboundIsNight = isNightTime(time);
  const returnIsNight = isRoundTrip && returnTime ? isNightTime(returnTime) : false;
  
  let totalNightFee = 0;
  if (outboundIsNight) totalNightFee += 10;
  if (returnIsNight) totalNightFee += 10;
  
  return { totalNightFee, outboundIsNight, returnIsNight };
}
```

### Affected Files & Scope of Work

1. `src/lib/dateUtils.ts`: Add `isNightTime` and `calculateNightSurcharge` functions.
2. `src/data/pricing.ts`: Update `DEFAULT_FEATURED_ROUTES` so Limassol ⇄ Larnaca Airport, Limassol ⇄ Larnaca City, and Limassol ⇄ Paphos take center stage.
3. `src/i18n/translations.ts`:
   - Add translation strings for night tariff badge, night fee breakdown, and Limassol-focused article text.
   - Comprehensive Russian and English SEO articles describing routes: Limassol to Larnaca Airport, Limassol to Larnaca City, Larnaca Airport to Limassol, Limassol to Paphos Airport, etc.
4. `src/components/Footer.tsx`: Update office location to The Oval, Krinou 3, Agios Athanasios, 4103 Limassol, Cyprus.
5. `index.html`: Update title, meta description, keywords, OpenGraph/Twitter cards, and Schema.org TaxiService structured data with Limassol address and routes.
6. `src/App.tsx`: Synchronize runtime page title and meta description fallback.
7. `src/components/BookingWidget.tsx`: Integrate night tariff calculation, UI badge, price breakdown, and pass night fee data to `CheckoutModal`.
8. `src/components/CheckoutModal.tsx`: Render night tariff breakdown in summary and append night tariff details to Google Sheets and Stripe order comments.
