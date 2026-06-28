import express, { Request, Response, NextFunction } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import Database from "better-sqlite3";
import { GoogleGenAI } from "@google/genai";
import Stripe from "stripe";

// ─── Initialize AI (server-side only — clave NUNCA va al cliente) ─────────────
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: { headers: { "User-Agent": "aistudio-build" } },
});

// ─── Initialize Stripe ─────────────────────────────────────────────────────────
let stripeClient: Stripe | null = null;
function getStripe(): Stripe | null {
  if (!stripeClient && process.env.STRIPE_SECRET_KEY) {
    stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
  return stripeClient;
}

// ─── Initialize SQLite ─────────────────────────────────────────────────────────
const db = new Database("government_data.db");
db.exec(`
  CREATE TABLE IF NOT EXISTS departments (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    name          TEXT NOT NULL CHECK(length(name) <= 200),
    description   TEXT CHECK(length(description) <= 1000),
    contact_email TEXT CHECK(length(contact_email) <= 254)
  )
`);

// ─── Validation helpers ────────────────────────────────────────────────────────
function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

function isValidString(val: unknown, max = 500): val is string {
  return typeof val === "string" && val.trim().length > 0 && val.length <= max;
}

// SEC-3: Middleware de autenticación básica (Firebase ID token)
// TODO Sprint 2: instalar firebase-admin y verificar token criptográficamente:
//   npm install firebase-admin
//   import { auth as adminAuth } from './firebaseAdmin';
//   const decoded = await adminAuth.verifyIdToken(token);
function requireAuth(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split("Bearer ")[1];
  if (!token) {
    res.status(401).json({ error: "Token de autenticación requerido." });
    return;
  }
  // Verificación criptográfica pendiente (Sprint 2 — firebase-admin)
  next();
}

// ─── Simple in-memory rate limiter (SEC-3) ─────────────────────────────────────
// Sprint 2: reemplazar con express-rate-limit para producción.
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
function rateLimit(maxReqs: number, windowMs: number) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const ip = req.ip ?? "unknown";
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetAt) {
      rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
      next();
      return;
    }
    if (record.count >= maxReqs) {
      res.status(429).json({ error: "Demasiadas solicitudes. Intenta más tarde." });
      return;
    }
    record.count++;
    next();
  };
}

// ─── Server bootstrap ──────────────────────────────────────────────────────────
async function startServer() {
  const app = express();
  const PORT = 3000;

  // SEC-3: Límite de tamaño de body + headers de seguridad básicos
  app.use(express.json({ limit: "10kb" }));
  app.use((_req: Request, res: Response, next: NextFunction) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // ─── Load system prompt ──────────────────────────────────────────────────────
  let systemPrompt =
    "Eres ConnectX. Experto en administración municipal y gobernanza digital de Tepic. " +
    "Tono: Institucional, extremadamente breve y directo. " +
    "Objetivo: Soluciones pragmáticas de infraestructura y transparencia. " +
    "Siempre incluye un 'Siguiente paso' y usa el idioma solicitado.";

  try {
    const promptPath = path.join(process.cwd(), "public", "CONNECTX_SYSTEM_PROMPT.md");
    const fileContent = await fs.readFile(promptPath, "utf-8");
    if (fileContent.trim()) systemPrompt = fileContent;
  } catch {
    console.warn("CONNECTX_SYSTEM_PROMPT.md no encontrado, usando fallback.");
  }

  // ─── Departments CRUD ────────────────────────────────────────────────────────
  app.get("/api/departments", (_req, res) => {
    res.json(db.prepare("SELECT * FROM departments").all());
  });

  app.post("/api/departments", (req, res) => {
    const { name, description, contact_email } = req.body ?? {};

    if (!isValidString(name, 200)) {
      res.status(400).json({ error: "Campo 'name' requerido (máx. 200 caracteres)." });
      return;
    }
    if (contact_email && !isValidEmail(contact_email)) {
      res.status(400).json({ error: "Formato de email inválido." });
      return;
    }

    const info = db
      .prepare("INSERT INTO departments (name, description, contact_email) VALUES (?, ?, ?)")
      .run(
        name.trim(),
        isValidString(description, 1000) ? description.trim() : null,
        contact_email?.trim() ?? null,
      );
    res.status(201).json({ id: info.lastInsertRowid });
  });

  app.put("/api/departments/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) { res.status(400).json({ error: "ID inválido." }); return; }

    const { name, description, contact_email } = req.body ?? {};
    if (!isValidString(name, 200)) {
      res.status(400).json({ error: "Campo 'name' requerido (máx. 200 caracteres)." });
      return;
    }
    if (contact_email && !isValidEmail(contact_email)) {
      res.status(400).json({ error: "Formato de email inválido." });
      return;
    }

    db.prepare("UPDATE departments SET name = ?, description = ?, contact_email = ? WHERE id = ?")
      .run(
        name.trim(),
        isValidString(description, 1000) ? description.trim() : null,
        contact_email?.trim() ?? null,
        id,
      );
    res.json({ success: true });
  });

  app.delete("/api/departments/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (isNaN(id)) { res.status(400).json({ error: "ID inválido." }); return; }
    db.prepare("DELETE FROM departments WHERE id = ?").run(id);
    res.json({ success: true });
  });

  // ─── AI Chat (rate-limited, clave server-side) ───────────────────────────────
  app.post(
    "/api/ai/chat",
    rateLimit(15, 60_000), // 15 req/min por IP
    async (req: Request, res: Response) => {
      if (!process.env.GEMINI_API_KEY) {
        res.status(500).json({ error: "GEMINI_API_KEY no configurada en el servidor." });
        return;
      }

      const { message, context } = req.body ?? {};
      if (!isValidString(message, 4000)) {
        res.status(400).json({ error: "Campo 'message' requerido (máx. 4000 caracteres)." });
        return;
      }

      try {
        const finalPrompt = context && isValidString(context, 8000)
          ? `${context}\n\nPregunta del usuario: ${message}`
          : message;

        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents: [{ role: "user", parts: [{ text: finalPrompt }] }],
          config: { systemInstruction: systemPrompt },
        });

        res.json({ response: response.text });
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Error procesando solicitud de IA";
        console.error("AI Chat Error:", msg);
        res.status(500).json({ error: msg });
      }
    },
  );

  // ─── Payment Intent (SEC-3: requiere auth) ───────────────────────────────────
  app.post(
    "/api/create-payment-intent",
    requireAuth,
    rateLimit(5, 60_000), // 5 pagos/min por IP
    async (req: Request, res: Response) => {
      const stripe = getStripe();
      if (!stripe) { res.status(500).json({ error: "Stripe no configurado." }); return; }

      const { amount, currency } = req.body ?? {};
      const parsedAmount = Number(amount);
      if (!Number.isInteger(parsedAmount) || parsedAmount < 100 || parsedAmount > 10_000_000) {
        res.status(400).json({ error: "Monto inválido (mín. 1 MXN, máx. 100,000 MXN)." });
        return;
      }

      try {
        const paymentIntent = await stripe.paymentIntents.create({
          amount: parsedAmount,
          currency: (typeof currency === "string" && /^[a-z]{3}$/.test(currency))
            ? currency
            : "mxn",
        });
        res.json({ clientSecret: paymentIntent.client_secret });
      } catch (error: unknown) {
        const msg = error instanceof Error ? error.message : "Error creando pago";
        console.error("Stripe Error:", msg);
        res.status(500).json({ error: msg });
      }
    },
  );

  // ─── Vite / Static serving ───────────────────────────────────────────────────
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => res.sendFile(path.join(distPath, "index.html")));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
