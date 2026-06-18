import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";
import { GoogleGenerativeAI, SchemaType } from "@google/generative-ai";

// Initialize AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Load System Prompt from public/CONNECTX_SYSTEM_PROMPT.md
  let systemPrompt = "Eres el Consultor Senior de ConnectX para Geraldine Ponce. Posees un Doctorado en Ciencia Política y una Maestría en Desarrollo Urbano y Tecnologías de la Información. Tu tono es institucional, profundamente analítico, tecnológico y pragmático. Eres multilingüe: hablas español perfecto y entiendes/respondes en Cora y Wixárika para garantizar la inclusión total en Tepic. No solo asistes, asesoras en gobernanza digital, optimización de recaudación y bienestar ciudadano mediante la trazabilidad de datos de Google Cloud. Tus respuestas son breves pero con alta densidad estratégica.";
  
  try {
    const promptPath = path.join(process.cwd(), 'public', 'CONNECTX_SYSTEM_PROMPT.md');
    const fileContent = await fs.readFile(promptPath, 'utf-8');
    if (fileContent.trim()) {
      systemPrompt = fileContent;
    }
  } catch (error) {
    console.warn("Could not read CONNECTX_SYSTEM_PROMPT.md, using default fallback.", error);
  }

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
      
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction: systemPrompt,
      });

      const result = await model.generateContent(finalPrompt);
      
      res.json({ response: result.response.text() });
    } catch (error: any) {
      console.error("AI Assistant Error:", error);
      res.status(500).json({ error: error.message || "Error procesando la solicitud de IA" });
    }
  });

  // AI Risk Analysis Endpoint
  app.post("/api/ai/analyze-risks", async (req, res) => {
    const { departments, logs } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY no configurada."
      });
    }

    try {
      const prompt = `
        IDENTIDAD: Actúa como el G-Agente CX, el Oráculo de Gobernanza Digital de Élite y Auditor Forense de Grado Industrial.
        MISIÓN: Realizar un análisis exhaustivo de la infraestructura de datos gubernamentales para garantizar la soberanía digital y la integridad sistémica.

        CONTEXTO OPERATIVO:
        - 48 Dependencias Gubernamentales bajo monitoreo.
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

        REQUERIMIENTOS DE SALIDA:
        Responde estrictamente en formato JSON con la siguiente estructura técnica:
        {
          "score": (número 0-100, donde 100 es riesgo crítico),
          "level": "LOW" | "MEDIUM" | "HIGH" | "CRITICAL",
          "findings": ["hallazgo estratégico 1", "hallazgo estratégico 2"],
          "recommendations": ["acción táctica 1", "acción táctica 2"],
          "anomaliesDetected": boolean,
          "summary": "resumen ejecutivo de alto nivel",
          "strategicOutlook": "proyección estratégica a largo plazo",
          "sovereigntyIndex": (número 0-100, donde 100 es soberanía total),
          "governanceMaturity": "INITIAL" | "DEVELOPING" | "OPTIMIZED" | "ELITE"
        }
      `;

      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema: {
            type: SchemaType.OBJECT,
            properties: {
              score: { type: SchemaType.NUMBER },
              level: { type: SchemaType.STRING, enum: ["LOW", "MEDIUM", "HIGH", "CRITICAL"] },
              findings: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
              recommendations: { type: SchemaType.ARRAY, items: { type: SchemaType.STRING } },
              anomaliesDetected: { type: SchemaType.BOOLEAN },
              summary: { type: SchemaType.STRING },
              strategicOutlook: { type: SchemaType.STRING },
              sovereigntyIndex: { type: SchemaType.NUMBER },
              governanceMaturity: { type: SchemaType.STRING, enum: ["INITIAL", "DEVELOPING", "OPTIMIZED", "ELITE"] }
            },
            required: ["score", "level", "findings", "recommendations", "anomaliesDetected", "summary", "strategicOutlook", "sovereigntyIndex", "governanceMaturity"]
          }
        }
      });

      const result = await model.generateContent(prompt);
      res.json(JSON.parse(result.response.text()));
    } catch (error: any) {
      console.error("AI Risk Analysis Error:", error);
      res.status(500).json({ error: error.message || "Error procesando el análisis de riesgos" });
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
