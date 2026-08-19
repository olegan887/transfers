import express from "express";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

dotenv.config();

const DEFAULT_GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyRfIswYifcjHxMtoTJidzftEvVEJkOv-8kPowYGckT21gXiLkXY2OE4v6_FG278Jlp/exec';

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeClient) {
    const key = process.env.STRIPE_SECRET_KEY;
    if (!key) {
      throw new Error('STRIPE_SECRET_KEY environment variable is required');
    }
    stripeClient = new Stripe(key, {
      apiVersion: '2023-10-16' as any,
    });
  }
  return stripeClient;
}

function cleanUrl(url: string): string {
  return url.trim().replace(/^["']|["']$/g, '');
}

function getGoogleScriptUrl(customUrl?: string): string {
  const envUrl = process.env.VITE_GOOGLE_SCRIPT_URL;
  const rawUrl = customUrl || envUrl || DEFAULT_GOOGLE_SCRIPT_URL;
  return cleanUrl(rawUrl);
}

interface OrderPayload {
  name: string;
  phone: string;
  email: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  passengers: string | number;
  vehicle: string;
  price: number;
  type: string;
  comments: string;
}

function buildOrderComments(
  paymentMode: string,
  totalPrice: number,
  flightNumber?: string,
  address?: string,
  comment?: string,
  isRoundTrip?: boolean | string,
  returnDate?: string,
  returnTime?: string,
  sessionId?: string,
  isTest: boolean = false
): string {
  const remaining = totalPrice - 20;
  const paymentStr = paymentMode === 'deposit'
    ? `Deposit €20 paid, remaining €${remaining} in cash`
    : 'Full amount paid';
  
  const header = isTest ? '[TEST ORDER] ' : '';
  const roundTripStr = (isRoundTrip === true || isRoundTrip === 'true')
    ? ` | ROUND TRIP: Return on ${returnDate} at ${returnTime}`
    : '';
  
  return `${header}Payment: ${paymentStr} | Flight: ${flightNumber || 'N/A'} | Address: ${address || 'N/A'}${comment ? ` / ${comment}` : ''}${roundTripStr} | Stripe Session: ${sessionId || 'N/A'}`;
}

function buildOrderPayload(bookingData: any, price: number, vehicleName: string, comments: string): OrderPayload {
  return {
    name: bookingData.name,
    phone: `${bookingData.phone} (${bookingData.messenger})`,
    email: bookingData.email || '',
    pickup: bookingData.fromName,
    dropoff: bookingData.toName,
    date: bookingData.date,
    time: bookingData.time,
    passengers: bookingData.pax,
    vehicle: vehicleName,
    price: price,
    type: (bookingData.isRoundTrip === true || bookingData.isRoundTrip === 'true') 
      ? 'Round Trip (В обе стороны)' 
      : 'One Way (В одну сторону)',
    comments: comments
  };
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Safe CORS Configuration allowing all origins to prevent preview/iframe CORS failures
  app.use(cors({
    origin: (origin, callback) => {
      callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Google-Script-Url", "X-Script-Url"],
    credentials: true
  }));

  // Stripe webhook must use raw body, so it comes BEFORE express.json()
  app.post("/api/webhook", express.raw({ type: "application/json" }), async (req, res) => {
    const stripe = getStripe();
    const sig = req.headers["stripe-signature"];
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;

    try {
      if (!sig || !endpointSecret) {
        console.warn("Webhook warning: Missing signature or secret");
        res.status(400).send("Missing signature or secret");
        return;
      }
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err: any) {
      console.error("Webhook Error:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;

      if (metadata) {
        console.log("Payment successful for session:", session.id);
        
        try {
          const GOOGLE_SCRIPT_URL = getGoogleScriptUrl();
          
          // Reconstruct bookingData mapping from metadata
          const bookingData = {
            name: metadata.name,
            phone: metadata.phone,
            messenger: metadata.messenger,
            email: metadata.email || '',
            fromName: metadata.fromName,
            toName: metadata.toName,
            date: metadata.date,
            time: metadata.time,
            pax: metadata.pax,
            isRoundTrip: metadata.isRoundTrip === 'true'
          };
          
          const price = Number(metadata.totalPrice) || (session.amount_total ? session.amount_total / 100 : 0);
          
          // Call with specialized record_stripe_order action to enforce deduplication on Apps Script side
          const comments = buildOrderComments(
            metadata.paymentMode,
            price,
            metadata.flightNumber,
            metadata.address,
            metadata.comment,
            metadata.isRoundTrip,
            metadata.returnDate,
            metadata.returnTime,
            session.id
          );
          
          const orderPayload = buildOrderPayload(bookingData, price, metadata.vehicleName, comments);

          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'record_stripe_order',
              session: {
                id: session.id,
                metadata: {
                  ...metadata,
                  comments: comments,
                  price: price.toString()
                }
              },
              ...orderPayload
            }),
          });
          console.log("Successfully sent order to Google Sheets from webhook with deduplication action");
        } catch (error) {
          console.error("Error sending order to Google Sheets from webhook:", error);
        }
      }
    }

    res.json({ received: true });
  });

  app.use(express.json());

  // API routes FIRST
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  const handleProxy = async (req: express.Request, res: express.Response) => {
    try {
      if (req.method === "OPTIONS") {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Google-Script-Url, X-Script-Url");
        return res.status(204).end();
      }

      let targetHeader = req.headers["x-script-url"] || req.headers["x-google-script-url"] || req.query.script_url;
      const sParam = req.query.s;
      if (sParam && typeof sParam === "string") {
        try {
          targetHeader = Buffer.from(sParam, "base64").toString("utf8");
        } catch (e) {
          // ignore
        }
      }

      const GOOGLE_SCRIPT_URL = getGoogleScriptUrl(targetHeader as string);

      let urlObject = new URL(GOOGLE_SCRIPT_URL);

      if (req.method === "GET") {
        urlObject.searchParams.set("t", Date.now().toString());
        for (const [key, val] of Object.entries(req.query)) {
          if (key !== "script_url" && key !== "s") {
            urlObject.searchParams.set(key, val as string);
          }
        }

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 6000);

          const response = await fetch(urlObject.toString(), {
            method: "GET",
            redirect: "follow",
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            return res.json(data);
          } else {
            const text = await response.text();
            try {
              return res.json(JSON.parse(text));
            } catch {
              return res.send(text);
            }
          }
        } catch (fetchError: any) {
          console.warn("Google Apps Script proxy GET fallback:", fetchError.message);
          return res.json({
            result: "success",
            routes: [],
            blocked: [],
            fallback: true
          });
        }
      } else if (req.method === "POST") {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 8000);

          const response = await fetch(urlObject.toString(), {
            method: "POST",
            headers: {
              "Content-Type": "text/plain;charset=utf-8",
            },
            body: JSON.stringify(req.body),
            redirect: "follow",
            signal: controller.signal
          });
          clearTimeout(timeoutId);

          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            return res.json(data);
          } else {
            const text = await response.text();
            try {
              return res.json(JSON.parse(text));
            } catch {
              return res.send(text);
            }
          }
        } catch (fetchError: any) {
          console.warn("Google Apps Script proxy POST fallback:", fetchError.message);
          return res.json({
            result: "success",
            fallback: true
          });
        }
      } else {
        return res.status(405).json({ error: "Method Not Allowed" });
      }
    } catch (error: any) {
      console.warn("Google proxy caught error, sending fallback:", error?.message);
      return res.json({ result: "success", routes: [], blocked: [], fallback: true });
    }
  };

  app.all("/api/google-proxy", handleProxy);
  app.all("/api/sync-data", handleProxy);

  app.post("/api/log-lead", async (req, res) => {
    try {
      const leadData = req.body;
      const GOOGLE_SCRIPT_URL = getGoogleScriptUrl();

      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'log_lead',
          ...leadData
        }),
      });
      res.json({ success: true });
    } catch (error) {
      console.error("Error logging lead to Google Sheets:", error);
      res.status(500).json({ error: "Failed to log lead" });
    }
  });

  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { bookingData, price, vehicleName } = req.body;

      // TEST MODE BYPASS (Only allowed in non-production environments)
      if (process.env.NODE_ENV !== 'production' && bookingData.name === 'TEST 0709') {
        console.log("Test mode activated. Bypassing Stripe.");
        const GOOGLE_SCRIPT_URL = getGoogleScriptUrl();

        const comments = buildOrderComments(
          bookingData.paymentMode,
          price,
          bookingData.flightNumber,
          bookingData.address,
          bookingData.comment,
          bookingData.isRoundTrip,
          bookingData.returnDate,
          bookingData.returnTime,
          'test_bypass',
          true
        );

        const payload = buildOrderPayload(bookingData, price, vehicleName, comments);

        try {
          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          console.log("Successfully sent TEST order to Google Sheets");
        } catch (error) {
          console.error("Error sending TEST order to Google Sheets:", error);
        }

        return res.json({ id: 'test_session', url: `${req.headers.origin}/?session_id=test_session` });
      }

      const stripe = getStripe();

      const amountToPay = bookingData.paymentMode === 'deposit' ? 20 : price;

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `Transfer: ${bookingData.fromName} to ${bookingData.toName}`,
                description: `${vehicleName} | Date: ${bookingData.date} | Time: ${bookingData.time} | Pax: ${bookingData.pax}${bookingData.paymentMode === 'deposit' ? ` (Deposit, remaining €${price - 20} in cash)` : ''}`,
              },
              unit_amount: amountToPay * 100, // Stripe expects amounts in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
        customer_email: bookingData.email || undefined,
        metadata: {
          from: bookingData.from || '',
          to: bookingData.to || '',
          fromName: bookingData.fromName || '',
          toName: bookingData.toName || '',
          vehicleName: vehicleName || '',
          date: bookingData.date || '',
          time: bookingData.time || '',
          pax: bookingData.pax?.toString() || '',
          isRoundTrip: bookingData.isRoundTrip ? 'true' : 'false',
          returnDate: bookingData.returnDate || '',
          returnTime: bookingData.returnTime || '',
          name: bookingData.name || '',
          phone: bookingData.phone || '',
          messenger: bookingData.messenger || '',
          email: bookingData.email || '',
          flightNumber: bookingData.flightNumber || '',
          address: bookingData.address || '',
          comment: bookingData.comment || '',
          paymentMode: bookingData.paymentMode || '',
          totalPrice: price?.toString() || '',
        }
      });

      res.json({ id: session.id, url: session.url });
    } catch (error: any) {
      console.error('Stripe error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/verify-session", async (req, res) => {
    try {
      const { sessionId } = req.body;
      const stripe = getStripe();
      const session = await stripe.checkout.sessions.retrieve(sessionId);

      if (session.payment_status === 'paid') {
        res.json({ success: true, metadata: session.metadata, amount: session.amount_total });
      } else {
        res.json({ success: false, status: session.payment_status });
      }
    } catch (error: any) {
      console.error('Verify session error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
