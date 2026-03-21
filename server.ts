import express from "express";
import { createServer as createViteServer } from "vite";
import Stripe from "stripe";
import dotenv from "dotenv";
import path from "path";
import cors from "cors";

dotenv.config();

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

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());

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
          let GOOGLE_SCRIPT_URL = process.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycby6Z_J5r00-EsbLlNZ3OlQFi_RNTU8eVOOTWTMFx4aIN_nBVt-743oxAmYLLBwmxKo/exec';
          GOOGLE_SCRIPT_URL = GOOGLE_SCRIPT_URL.trim().replace(/^["']|["']$/g, '');

          const payload = {
            name: metadata.name,
            phone: metadata.phone,
            email: '', 
            pickup: metadata.fromName,
            dropoff: metadata.toName,
            date: metadata.date,
            time: metadata.time,
            passengers: metadata.pax,
            vehicle: metadata.vehicleName,
            price: session.amount_total ? session.amount_total / 100 : 0,
            comments: `Flight: ${metadata.flightNumber || 'N/A'} | Address: ${metadata.address} | Stripe Session: ${session.id}`
          };

          await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          console.log("Successfully sent order to Google Sheets from webhook");
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

  app.post("/api/create-checkout-session", async (req, res) => {
    try {
      const { bookingData, price, vehicleName } = req.body;
      const stripe = getStripe();

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'eur',
              product_data: {
                name: `Transfer: ${bookingData.fromName} to ${bookingData.toName}`,
                description: `${vehicleName} | Date: ${bookingData.date} | Time: ${bookingData.time} | Pax: ${bookingData.pax}`,
              },
              unit_amount: price * 100, // Stripe expects amounts in cents
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
        metadata: {
          from: bookingData.from,
          to: bookingData.to,
          fromName: bookingData.fromName,
          toName: bookingData.toName,
          vehicleName: vehicleName,
          date: bookingData.date,
          time: bookingData.time,
          pax: bookingData.pax,
          name: bookingData.name,
          phone: bookingData.phone,
          flightNumber: bookingData.flightNumber,
          address: bookingData.address,
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
