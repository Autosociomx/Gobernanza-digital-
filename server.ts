import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import Database from "better-sqlite3";
import Anthropic from "@anthropic-ai/sdk";
import Stripe from "stripe";

// Motor de IA institucional: Claude (Anthropic).
// claude-opus-4-8 es el modelo recomendado para cargas de trabajo de gobernanza:
// razonamiento profundo, análisis de riesgos y asistencia ciudadana multilingüe.
const CLAUDE_MODEL = "claude-opus-4-8";

let aiClient: Anthropic | null = null;
function getAI() {
  if (!aiClient) {
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) {
      throw new Error("ANTHROPIC_API_KEY no configurada. Por favor, añádela en Settings > Secrets.");
    }
    aiClient = new Anthropic({ apiKey: key });
  }
  return aiClient;
}

function extractText(response: Anthropic.Message): string {
  return response.content
    .filter((block): block is Anthropic.TextBlock => block.type === "text")
    .map((block) => block.text)
    .join("\n");
}

// Ubicación de referencia para búsquedas web contextualizadas.
const TEPIC_LOCATION = {
  type: "approximate" as const,
  city: "Tepic",
  region: "Nayarit",
  country: "MX",
  timezone: "America/Mazatlan",
};

// Esquema estricto para el análisis de riesgos de gobernanza.
// Con salida estructurada, Claude garantiza JSON válido conforme a este contrato.
const RISK_ANALYSIS_SCHEMA = {
  type: "object" as const,
  properties: {
    score: { type: "number", description: "Riesgo global 0-100, donde 100 es riesgo crítico" },
    level: { type: "string", enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
    findings: { type: "array", items: { type: "string" }, description: "Hallazgos estratégicos" },
    recommendations: { type: "array", items: { type: "string" }, description: "Acciones tácticas" },
    anomaliesDetected: { type: "boolean" },
    summary: { type: "string", description: "Resumen ejecutivo de alto nivel" },
    strategicOutlook: { type: "string", description: "Proyección estratégica a largo plazo" },
    sovereigntyIndex: { type: "number", description: "Índice de Soberanía Digital 0-100" },
    governanceMaturity: { type: "string", enum: ["INITIAL", "DEVELOPING", "OPTIMIZED", "ELITE"] },
  },
  required: [
    "score",
    "level",
    "findings",
    "recommendations",
    "anomaliesDetected",
    "summary",
    "strategicOutlook",
    "sovereigntyIndex",
    "governanceMaturity",
  ],
  additionalProperties: false,
};

// Initialize Stripe
let stripeClient: Stripe | null = null;
function getStripe() {
    if (!stripeClient && process.env.STRIPE_SECRET_KEY) {
        stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);
    }
    return stripeClient;
}

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

  // AI Assistant Endpoint — impulsado por Claude (Anthropic)
  app.post("/api/ai/chat", async (req, res) => {
    const { message, context, useThinking, useMaps, useSearch } = req.body;

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        error: "ANTHROPIC_API_KEY no configurada. Por favor, añádela en Settings > Secrets."
      });
    }

    try {
      const finalPrompt = context ? `${context}\n\nPregunta del usuario: ${message}` : message;
      const ai = getAI();

      const response = await ai.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 16000,
        system: systemPrompt,
        messages: [{ role: "user", content: finalPrompt }],
        // Razonamiento adaptativo: Claude decide cuánto pensar según la complejidad.
        ...(useThinking
          ? { thinking: { type: "adaptive" as const }, output_config: { effort: "high" as const } }
          : {}),
        // Búsqueda web con contexto geográfico de Tepic (cubre consultas de mapas y actualidad).
        ...(useSearch || useMaps
          ? {
              tools: [
                {
                  type: "web_search_20260209" as const,
                  name: "web_search" as const,
                  user_location: TEPIC_LOCATION,
                },
              ],
            }
          : {}),
      });

      res.json({ response: extractText(response) });
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      res.status(500).json({ error: error.message || "Error procesando la solicitud de IA" });
    }
  });

  // Análisis de Riesgos de Gobernanza — se ejecuta en el servidor para que la
  // credencial de IA nunca llegue al navegador del ciudadano.
  app.post("/api/ai/risk-analysis", async (req, res) => {
    const { departments, logs } = req.body;

    if (!process.env.ANTHROPIC_API_KEY) {
      return res.status(500).json({
        error: "ANTHROPIC_API_KEY no configurada. Por favor, añádela en Settings > Secrets."
      });
    }

    try {
      const prompt = `
      IDENTIDAD: Actúa como el G-Agente CX, el Oráculo de Gobernanza Digital de Élite y Auditor Forense de Grado Industrial.
      MISIÓN: Realizar un análisis exhaustivo de la infraestructura de datos gubernamentales para garantizar la soberanía digital y la integridad sistémica.

      CONTEXTO OPERATIVO:
      - Dependencias del Municipio de Tepic, Nayarit bajo monitoreo.
      - Registros de auditoría inmutables.

      DATOS DE ENTRADA (DEPENDENCIAS):
      ${JSON.stringify(departments, null, 2)}

      DATOS DE ENTRADA (LOGS DE AUDITORÍA):
      ${JSON.stringify(logs, null, 2)}

      DIRECTIVAS DE ANÁLISIS:
      1. Evaluar la coherencia estratégica de las misiones de las dependencias.
      2. Detectar anomalías en la frecuencia y tipo de operaciones (CREATE, UPDATE, DELETE).
      3. Identificar riesgos de colusión o manipulación de datos mediante patrones de acceso.
      4. Calcular el Índice de Soberanía Digital basado en la integridad y trazabilidad de los datos.
      5. Determinar la Madurez de Gobernanza (INITIAL, DEVELOPING, OPTIMIZED, ELITE).

      Responde en español, con hallazgos y recomendaciones accionables para funcionarios municipales.
      `;

      const ai = getAI();
      const response = await ai.messages.create({
        model: CLAUDE_MODEL,
        max_tokens: 16000,
        thinking: { type: "adaptive" },
        output_config: {
          format: { type: "json_schema", schema: RISK_ANALYSIS_SCHEMA },
        },
        messages: [{ role: "user", content: prompt }],
      });

      res.json(JSON.parse(extractText(response)));
    } catch (error: any) {
      console.error("AI Risk Analysis Error:", error);
      res.status(500).json({ error: error.message || "Error procesando el análisis de riesgos" });
    }
  });

  // Payment Intent Route
  app.post("/api/create-payment-intent", async (req, res) => {
    const { amount, currency } = req.body;
    const stripe = getStripe();
    if (!stripe) {
      return res.status(500).json({ error: "Stripe no configurado." });
    }

    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // amount in cents
        currency: currency || 'mxn',
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
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
