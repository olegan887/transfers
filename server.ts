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
          let GOOGLE_SCRIPT_URL = process.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxwwfZI69flEry9JRACIu-M48fAA2C9A_oBDfumPaZTwp8NEd6yeSwOYcIHNv7yNEZI/exec';
          GOOGLE_SCRIPT_URL = GOOGLE_SCRIPT_URL.trim().replace(/^["']|["']$/g, '');

          const payload = {
            name: metadata.name,
            phone: `${metadata.phone} (${metadata.messenger})`,
            email: '', 
            pickup: metadata.fromName,
            dropoff: metadata.toName,
            date: metadata.date,
            time: metadata.time,
            passengers: metadata.pax,
            vehicle: metadata.vehicleName,
            price: Number(metadata.totalPrice) || (session.amount_total ? session.amount_total / 100 : 0),
            type: metadata.isRoundTrip === 'true' ? 'Round Trip (В обе стороны)' : 'One Way (В одну сторону)',
            comments: `Payment: ${metadata.paymentMode === 'deposit' ? `Deposit €20 paid, remaining €${Number(metadata.totalPrice) - 20} in cash` : 'Full amount paid'} | Flight: ${metadata.flightNumber || 'N/A'} | Address: ${metadata.address}${metadata.comment ? ` / ${metadata.comment}` : ''}${metadata.isRoundTrip === 'true' ? ` | ROUND TRIP: Return on ${metadata.returnDate} at ${metadata.returnTime}` : ''} | Stripe Session: ${session.id}`
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

  app.post("/api/log-lead", async (req, res) => {
    try {
      const leadData = req.body;
      let GOOGLE_SCRIPT_URL = process.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxwwfZI69flEry9JRACIu-M48fAA2C9A_oBDfumPaZTwp8NEd6yeSwOYcIHNv7yNEZI/exec';
      GOOGLE_SCRIPT_URL = GOOGLE_SCRIPT_URL.trim().replace(/^["']|["']$/g, '');

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

      // TEST MODE BYPASS
      if (bookingData.name === 'TEST 0709') {
        console.log("Test mode activated. Bypassing Stripe.");
        let GOOGLE_SCRIPT_URL = process.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbxwwfZI69flEry9JRACIu-M48fAA2C9A_oBDfumPaZTwp8NEd6yeSwOYcIHNv7yNEZI/exec';
        GOOGLE_SCRIPT_URL = GOOGLE_SCRIPT_URL.trim().replace(/^["']|["']$/g, '');

        const payload = {
          name: bookingData.name,
          phone: `${bookingData.phone} (${bookingData.messenger})`,
          email: '', 
          pickup: bookingData.fromName,
          dropoff: bookingData.toName,
          date: bookingData.date,
          time: bookingData.time,
          passengers: bookingData.pax,
          vehicle: vehicleName,
          price: price,
          type: bookingData.isRoundTrip ? 'Round Trip (В обе стороны)' : 'One Way (В одну сторону)',
          comments: `[TEST ORDER] Payment: ${bookingData.paymentMode === 'deposit' ? `Deposit €20 paid, remaining €${price - 20} in cash` : 'Full amount paid'} | Flight: ${bookingData.flightNumber || 'N/A'} | Address: ${bookingData.address}${bookingData.comment ? ` / ${bookingData.comment}` : ''}${bookingData.isRoundTrip ? ` | ROUND TRIP: Return on ${bookingData.returnDate} at ${bookingData.returnTime}` : ''} | Stripe Session: test_bypass`
        };

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

        return res.json({ id: 'test_session', url: `${req.headers.origin}/success?session_id=test_session` });
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
        success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
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
