# 🤖 Cyprus Airport Transfers - Developer AI Guide & Handover Manual

This document provides a highly detailed, technical explanation of the architecture, data flows, core integrations, and custom UX safeguards implemented in the Cyprus Airport Transfers project (`cyprus-airport-transfer.co`). It is designed to allow any AI coding agent or system to immediately understand the project state, maintain dependencies, and extend features without breaking existing infrastructure.

---

## 📅 System Configuration & Core Credentials

*   **App Domain:** `cyprus-airport-transfer.co`
*   **Active Google Apps Script Web App URL:** 
    `https://script.google.com/macros/s/AKfycbyRfIswYifcjHxMtoTJidzftEvVEJkOv-8kPowYGckT21gXiLkXY2OE4v6_FG278Jlp/exec`
*   **Active Telegram Bot Configurations (baked into Apps Script):**
    *   `TELEGRAM_BOT_TOKEN`: `8715085806:AAGOT47PlW6y_t8MMnIQzJN84zXqZ8itwTY`
    *   `TELEGRAM_CHAT_ID`: `8529666732`
*   **Third-Party Analytics IDs:**
    *   Google Analytics (gtag): `AW-17973746217`
    *   Microsoft Clarity: `vzu4kcc9x2`

---

## 🏗️ Technical Architecture: Full-Stack Hybrid Model

The application uses an **Express + React (TypeScript/Vite)** full-stack architecture running behind an Nginx reverse proxy on port `3000`. 

```
               ┌────────────────────────┐
               │    React Frontend      │
               │  (Brutalist Elements)  │
               └───────────┬────────────┘
                           │
             ┌─────────────┴─────────────┐
             │       /api Proxy          │  (Prevents CORS & Ad-Blockers)
             ▼                           ▼
  ┌────────────────────┐       ┌────────────────────┐
  │   Express Server   │       │ Google Apps Script │
  │    (server.ts)     │       │     Web App        │
  └──────────┬─────────┘       └─────────┬──────────┘
             │                           │
             ▼                           ▼
     ┌──────────────┐             ┌──────────────┐
     │  Stripe API  │             │ Google Sheet │
     │  (Checkout)  │             │  (Database)  │
     └──────────────┘             └──────┬───────┘
                                         │
                                         ▼
                                  ┌──────────────┐
                                  │ Telegram Bot │
                                  └──────────────┘
```

1.  **React Desktop & Mobile Frontend:** Houses user search, car selection, checkout drawer, user language settings, and client-side pricing fallback.
2.  **Express API Proxy Router (`server.ts`):** Handles requests for Stripe creation and bridges communication with the Google Sheet database using server-side endpoint proxies.
3.  **Google Web App Engine (Google Sheets + Apps Script):** Operates as a fast, light, relational-bypass backend that manages:
    *   Caching dynamic pricing schemas and available locations.
    *   Recording user search inquiries, checkout leads, and completed orders.
    *   Integrating directly with the Telegram Bot API (`UrlFetchApp.fetch`) for real-time dispatching.

---

## 🔌 Core Utilities & Anti-Failure Workarounds

### 🛡️ 1. Double-Layer Bypass Proxying (`safeFetchGoogleScript`)
In standard client-side deployments, fetching Google Apps Script Web Apps (`script.google.com/macros/...`) directly from the browser is prone to:
*   **Ad-blockers/Privacy Shield Blocks:** Brave Shields and chrome extensions often block Google Macro endpoints under global network filters.
*   **Preflight CORS Limitations:** Browser standard preflight operations (`OPTIONS`) fail on standard CORS settings during custom JSON requests.

**The Solution:**
All Apps Script fetches are managed by `safeFetchGoogleScript` in `src/lib/utils.ts`. 
*   **Primary Attempt:** Fetches through `/api/google-proxy`. The Express proxy inserts the target URL in the header `X-Google-Script-Url`. Since it is server-to-server, all headers are preserved, and ad-blockers are completely bypassed.
*   **Secondary Fallback:** If the Express backend is unresponsive, it automatically drops back to a direct fetch. It formats the POST data as `text/plain` to circumvent browser CORS preflight blocks.

### 📱 2. High-Fidelity iOS Safari CSS Fixes
To prevent the visual regressions common to standard forms on mobile devices, the following layout attributes are enforced:
*   **Form Auto-Zoom Prevention:** All input text fonts inside `src/index.css` or component file markup are capped at **minimum 16px (`text-base`)**. iOS Safari forces a layout zoom behavior if fields have `text-xs` or `text-sm`, breaking desktop proportions.
*   **Vertical Centering on Native Types:** Date/Time controls in iOS Safari render inconsistently. Custom reset utility classes inside `src/index.css` force vertical alignment via standard flexboxes.
*   **Input Rigid-Height Formatting:** All input fields use explicit classes like `h-12` or `h-14` instead of arbitrary top/bottom padding to assure standard alignment and eliminate micro-flickering.
*   **Form Validation UX Focus:** During submittal of an invalid form, a custom validity handler checks elements, places immediate `.focus()`, pauses temporarily, and runs `.scrollIntoView({ behavior: 'smooth' })`. This assures native browser tooltips successfully display across custom styled components.

---

## 🔄 Dynamic Flows & Booking Sequences

### 🟢 A. Loading Application Data
```
App Mounted ──► DataContext ──► safeFetchGoogleScript ──► /api/google-proxy ──► Apps Script (doGet)
                                                                                    │
                                                                                    ▼
App UI Instantiated ◄── Local JSON Parsed (Prices & Blocked Dates) ◄── Google Sheets Source
```
*   If the database connection fails, the application automatically handles failure gracefully by reverting to internal fallback data defined in `src/data/pricing.ts`.

### 🟡 B. Real-Time Lead Collection
The application proactively preserves conversion metrics by registering user activities as **Leads**:
*   **Searched Route Event:** Fired inside `BookingWidget.tsx` right when a user hits "Search".
*   **Initiated Checkout Event:** Fired inside `CheckoutModal.tsx` when a visitor completes their selection and pulls up the modal drawer.
*   **Abandoned Modal Event:** Triggered on user exit of the Checkout Drawer before completion, retaining phone/name details.

### 🔴 C. Unified Stripe Checkout Process
1.  User enters credentials in the `CheckoutModal` and hits **"Confirm Booking"**.
2.  `CheckoutModal` invokes `/api/google-proxy` with `action: 'create_stripe_session'`.
3.  The request reaches **Google Apps Script**, which makes a secure server-side call to `https://api.stripe.com/v1/checkout/sessions` utilizing the script key property `STRIPE_SECRET_KEY`.
4.  Apps Script passes back the final Stripe checkout URL.
5.  Frontend redirects the visitor directly to Stripe's payment layout.
6.  Upon accomplishment, Stripe directs the client back to `/success?session_id={CHECKOUT_SESSION_ID}`:
    *   `SuccessPage.tsx` takes the query parameter `session_id`.
    *   It requests Apps Script with `action: 'verify_stripe_session'`.
    *   Apps Script queries Stripe securely via the backend key, logs the receipt in Google Sheets, registers the record, updates the status to **PAID**, and fires off an automated **Telegram Notification** to the active channel.

---

## 🗃️ Script Deployment Setup (`google-apps-script.js`)

The full Apps Script source is maintained within the workspace in `/google-apps-script.js` so it can be copied directly into the sheet extension container:

1.  Open target sheet.
2.  Go to `Extensions` ──► `Apps Script`. 
3.  Paste the contents of `/google-apps-script.js`.
4.  Access **Project Settings (Gear icon ⚙️)** and append:
    *   `Property: STRIPE_SECRET_KEY`
    *   `Value: <your-stripe-live-or-test-secret-key>`
5.  Deploy as **Web App**:
    *   Execute As: **Me**
    *   Who has access: **Anyone**
6.  *CRITICAL:* Copy the newly produced web macro exec URL and configure it in `src/config.ts` under `DEFAULT_GOOGLE_SCRIPT_URL`, or use the gear panel inside the development build to override the address immediately.

---

## 📂 Key Source Code Maps
*   `/server.ts` – Full-stack Node API proxy rules, test order bypass logs, Express config.
*   `/google-apps-script.js` – Google sheet row layouts, Stripe webhook processors, and Telegram notification functions.
*   `/src/lib/utils.ts` – Safe fetch wrapper with browser ad-blocking proxy routing.
*   `/src/config.ts` – Defaults configuration mappings.
*   `/src/context/DataContext.tsx` – High-level dynamic state wrapper.
*   `/src/components/CheckoutModal.tsx` – Address auto-completer, checkout validation, lead generation engines.
*   `/src/components/SuccessPage.tsx` – Dynamic validation and conversion tracking scripts.
