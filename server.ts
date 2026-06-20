import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import Database from "better-sqlite3";
import { GoogleGenAI } from "@google/genai";
import Stripe from "stripe";

// Initialize AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Initialize Stripe (graceful no-op if key missing)
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-05-28.basil" })
  : null;

// Initialize Database
const db = new Database("government_data.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    contact_email TEXT
  )
`);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Stripe webhook must receive raw body BEFORE express.json()
  app.post("/api/payments/webhook", express.raw({ type: "application/json" }), (req, res) => {
    if (!stripe) return res.status(200).json({ received: true });

    const sig = req.headers["stripe-signature"] as string;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) return res.json({ received: true });

    try {
      const event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);

      if (event.type === "payment_intent.succeeded") {
        const intent = event.data.object as Stripe.PaymentIntent;
        console.log(`✅ Pago exitoso | ${intent.metadata.tramite} | $${(intent.amount / 100).toFixed(2)} MXN | ${intent.id}`);
      }

      res.json({ received: true });
    } catch (err: any) {
      console.error("Stripe webhook error:", err.message);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  });

  app.use(express.json());

  // Load System Prompt from public/CONNECTX_SYSTEM_PROMPT.md
  let systemPrompt = "Eres ConnectX. Experto en administración municipal y gobernanza digital de Tepic. Tono: Institucional, extremadamente breve y directo. Objetivo: Soluciones pragmáticas de infraestructura y transparencia. Siempre incluye un 'Siguiente paso' y usa el idioma solicitado.";
  
  try {
    const promptPath = path.join(process.cwd(), 'public', 'CONNECTX_SYSTEM_PROMPT.md');
    const fileContent = await fs.readFile(promptPath, 'utf-8');
    if (fileContent.trim()) {
      systemPrompt = fileContent;
    }
  } catch (error) {
    console.warn("Could not read CONNECTX_SYSTEM_PROMPT.md, using default fallback.", error);
  }

  // API routes
  app.get("/api/departments", (req, res) => {
    const stmt = db.prepare("SELECT * FROM departments");
    res.json(stmt.all());
  });

  app.post("/api/departments", (req, res) => {
    const { name, description, contact_email } = req.body;
    const stmt = db.prepare("INSERT INTO departments (name, description, contact_email) VALUES (?, ?, ?)");
    const info = stmt.run(name, description, contact_email);
    res.json({ id: info.lastInsertRowid });
  });

  app.delete("/api/departments/:id", (req, res) => {
    const { id } = req.params;
    const stmt = db.prepare("DELETE FROM departments WHERE id = ?");
    stmt.run(id);
    res.json({ success: true });
  });

  app.put("/api/departments/:id", (req, res) => {
    const { id } = req.params;
    const { name, description, contact_email } = req.body;
    const stmt = db.prepare("UPDATE departments SET name = ?, description = ?, contact_email = ? WHERE id = ?");
    stmt.run(name, description, contact_email, id);
    res.json({ success: true });
  });

  // ── Stripe Payment Intents ────────────────────────────────────

  // Create Payment Intent → returns clientSecret for Stripe.js
  app.post("/api/payments/intent", async (req, res) => {
    if (!stripe) {
      return res.status(503).json({
        error: "STRIPE_SECRET_KEY no configurada. Añádela en Settings > Secrets."
      });
    }

    const { amount, tramite, referencia, ciudadanoId, ciudadanoNombre } = req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: "Monto inválido." });
    }

    try {
      const intent = await stripe.paymentIntents.create({
        amount: Math.round(Number(amount) * 100), // centavos MXN
        currency: "mxn",
        metadata: {
          tramite: tramite || "Trámite Municipal",
          referencia: referencia || "",
          ciudadanoId: ciudadanoId || "anonymous",
          ciudadanoNombre: ciudadanoNombre || "",
          sistema: "NayaritDigital-ConnectX",
        },
        automatic_payment_methods: { enabled: true },
      });

      res.json({
        clientSecret: intent.client_secret,
        paymentIntentId: intent.id,
        amount: intent.amount / 100,
      });
    } catch (err: any) {
      console.error("Stripe intent error:", err.message);
      res.status(400).json({ error: err.message });
    }
  });

  // Get Payment Intent status
  app.get("/api/payments/:intentId", async (req, res) => {
    if (!stripe) return res.status(503).json({ error: "Stripe no configurado." });

    try {
      const intent = await stripe.paymentIntents.retrieve(req.params.intentId);
      res.json({
        status: intent.status,
        amount: intent.amount / 100,
        metadata: intent.metadata,
      });
    } catch (err: any) {
      res.status(404).json({ error: "Pago no encontrado." });
    }
  });

  // AI Assistant Endpoint
  app.post("/api/ai/chat", async (req, res) => {
    const { message, context } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY no configurada. Por favor, añádela en Settings > Secrets." 
      });
    }

    try {
      const finalPrompt = context ? `${context}\n\nPregunta del usuario: ${message}` : message;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
        config: {
          systemInstruction: systemPrompt,
        },
      });
      
      res.json({ response: response.text });
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      res.status(500).json({ error: error.message || "Error procesando la solicitud de IA" });
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
