# 📚 Project Knowledge Base: Cyprus Airport Transfers

## 1. Project Overview
- **Name:** Cyprus Airport Transfers
- **Domain:** `cyprus-airport-transfer.co`
- **Purpose:** A web application for booking taxi and transfer services from Cyprus airports (Paphos PFO, Larnaca LCA) to various destinations (Limassol, Ayia Napa, Paphos City, etc.).
- **Key Features:** Route selection, pricing calculation, address autocomplete, secure Stripe checkout, multi-language support (i18n), and analytics tracking.

## 2. Tech Stack
- **Frontend:** React 19, TypeScript, Vite
- **Backend/Server:** Node.js with Express (`server.ts` handles API and Vite middleware)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion (`motion/react`)
- **Icons:** Lucide React
- **Date Handling:** `date-fns`

## 3. External Integrations & APIs
- **Stripe:** Used for payment processing.
  - *Frontend:* `@stripe/stripe-js`
  - *Backend:* `stripe` Node SDK
- **Google Maps:** Used for address autocomplete in the checkout form.
  - *Library:* `react-google-autocomplete`
  - *Note:* Currently uses the legacy Places API (throws a console warning about `google.maps.places.Autocomplete` deprecation in 2025, but remains functional).
- **Google Sheets & Apps Script (Backend Database & Logic):**
  - The project uses a Google Apps Script deployed as a Web App (`VITE_GOOGLE_SCRIPT_URL`) to act as a lightweight database and CRM.
  - **GET Requests (`DataContext.tsx`):** Fetches dynamic pricing, available routes, and blocked dates/times from the Google Sheet.
  - **POST Requests (`server.ts`):** When a Stripe payment succeeds (or a test order is placed), the server sends the order payload to the Apps Script.
  - **Telegram Bot:** The Google Apps Script is responsible for instantly forwarding new orders to a Telegram chat via the Telegram Bot API (`UrlFetchApp.fetch`).
- **Analytics & Tracking:**
  - Google Analytics (gtag) - ID: `AW-17973746217`
  - Microsoft Clarity - ID: `vzu4kcc9x2`
  - Google Ads Conversion tracking on successful purchases.

## 4. Environment Variables (`.env`)
Required keys for local development and production:
- `GEMINI_API_KEY`: For AI Studio / Gemini integrations.
- `APP_URL`: The hosted URL of the application.
- `STRIPE_SECRET_KEY`: Stripe backend secret key.
- `VITE_STRIPE_PUBLISHABLE_KEY`: Stripe frontend public key.
- `STRIPE_WEBHOOK_SECRET`: For verifying Stripe webhook events.
- `VITE_GOOGLE_MAPS_API_KEY`: Google Maps API key for address autocomplete.

## 5. Key Components & Architecture
- **`src/components/BookingWidget.tsx`:** The main search and booking form (From, To, Date, Time, Passengers).
- **`src/components/CheckoutModal.tsx`:** The modal where users enter personal details (Name, Email, Phone, Flight Number, Address) and proceed to Stripe payment.
- **`src/components/ContactForm.tsx`:** Form for user inquiries.
- **`src/components/SuccessPage.tsx`:** Handles the post-payment redirect, verifies the Stripe session, and triggers conversion analytics.
- **`src/context/DataContext.tsx`:** Global state management (likely handles pricing, routes, etc.).
- **`src/i18n/LanguageContext.tsx`:** Handles multi-language translations.

## 6. Design System & UI/UX Quirks
- **Aesthetic:** "Brutalist" design. Uses heavy borders, high contrast, bold typography, and distinct hover states.
- **Global CSS (`src/index.css`):** Contains custom utility classes like `.brutal-input`, `.brutal-btn`, `.brutal-card`.
- **iOS / Safari Optimizations (CRITICAL):**
  - **Input Heights:** Inputs use fixed heights (e.g., `h-12`, `h-14`) instead of vertical padding (`py-X`) to prevent layout shifts and jumping on iOS Safari.
  - **Auto-Zoom Prevention:** All input fields must have a font size of at least `16px` (`text-base`) to prevent iPhones from automatically zooming in when focusing on an input.
  - **Form Validation UX:** Custom `handleInvalid` functions are used on forms. When a user submits an incomplete form, the code explicitly calls `focus()` on the first invalid element, followed by a slight delay and `scrollIntoView()`. This ensures the native browser validation tooltip ("Please fill out this field") appears correctly on mobile devices.
  - **Date/Time Inputs:** Custom CSS ensures `input[type="date"]` and `input[type="time"]` text is vertically centered (`display: flex; align-items: center;`) on iOS.

## 7. Scripts (`package.json`)
- `npm run dev`: Starts the Express server with Vite middleware (`tsx server.ts`).
- `npm run build`: Generates the sitemap (`node generate-sitemap.js`) and builds the Vite frontend.
- `npm run start`: Runs the production Express server.

## 8. Known Warnings
- **Google Maps Autocomplete:** "As of March 1st, 2025, google.maps.places.Autocomplete is not available to new customers..." - This is a known warning from the `react-google-autocomplete` library. It does not break functionality for existing keys, but a future migration to `PlaceAutocompleteElement` may be required if the library is not updated.
