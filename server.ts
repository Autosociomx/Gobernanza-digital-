import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import Database from "better-sqlite3";
import { GoogleGenAI } from "@google/genai";

// Validate required env vars at startup
if (!process.env.GEMINI_API_KEY) {
  console.warn("⚠️  ADVERTENCIA: GEMINI_API_KEY no configurada. El asistente IA no funcionará.");
  console.warn("   → En Google AI Studio: Settings > Secrets > añadir GEMINI_API_KEY");
}

// Load CONNECTX-CORE system prompt from file
const SYSTEM_PROMPT_PATH = path.join(process.cwd(), "public", "CONNECTX_SYSTEM_PROMPT.md");
let CONNECTX_SYSTEM_INSTRUCTION = "";
try {
  const raw = fs.readFileSync(SYSTEM_PROMPT_PATH, "utf-8");
  // Extract only the code blocks (the actual prompt content, not the markdown headers)
  const blocks = raw.match(/```[\s\S]*?```/g) || [];
  CONNECTX_SYSTEM_INSTRUCTION = blocks
    .map(b => b.replace(/^```\w*\n?/, "").replace(/\n?```$/, ""))
    .join("\n\n---\n\n");
  console.log(`✅ CONNECTX-CORE system prompt cargado (${CONNECTX_SYSTEM_INSTRUCTION.length} chars)`);
} catch {
  // Fallback to inline prompt if file not found
  CONNECTX_SYSTEM_INSTRUCTION = `Eres CONECTX-CORE, el motor de inteligencia cívica del Sistema Operativo de Gobernanza Digital de Nayarit Digital. Sirves al ciudadano, no a la burocracia. Tu tono es cálido, directo y profesional. Respondes en español. Nunca uses lenguaje burocrático. Primero valida la emoción del ciudadano, luego ofrece la solución concreta.`;
  console.warn("⚠️  No se encontró CONNECTX_SYSTEM_PROMPT.md — usando prompt de respaldo.");
}

// Initialize AI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

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

  // AI Assistant Endpoint
  app.post("/api/ai/chat", async (req, res) => {
    const { message } = req.body;
    
    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: "GEMINI_API_KEY no configurada. Por favor, añádela en Settings > Secrets." 
      });
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-1.5-flash",
        contents: [{ role: "user", parts: [{ text: message }] }],
        config: {
          systemInstruction: CONNECTX_SYSTEM_INSTRUCTION,
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
