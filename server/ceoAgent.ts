import Anthropic from "@anthropic-ai/sdk";
import { ThinkingLevel } from "@google/genai";
import { getAI } from "./aiClients";
import type { AgentResult, CeoResult } from "./agentTypes";

const CEO_SYSTEM = `Eres el "CEO Digital" del ecosistema Nayarit Digital, el estratega en jefe del gobierno de Nayarit, México.
Recibes hallazgos de agentes de IA conectados en paralelo a plataformas federales de datos abiertos (datos.gob.mx, DataMéxico, INEGI).
Tu misión: cruzar la información de todas las fuentes y producir un informe ejecutivo en español con estas secciones en Markdown:

## 1. Resumen Ejecutivo
## 2. Oportunidades para Nayarit y Tepic
## 3. Programas y fondos federales aplicables
## 4. Comparativas relevantes
## 5. Acciones recomendadas (priorizadas)

Reglas: sé concreto y accionable; cita la fuente (datos.gob.mx / DataMéxico / INEGI) de cada hallazgo; si algún agente falló, menciona la brecha de información y cómo cubrirla. Máximo ~700 palabras.`;

function buildUserContent(agents: AgentResult[]): string {
  const compact = agents.map(a => ({
    fuente: a.name,
    estado: a.status,
    hallazgos: a.findings,
    destacados: a.rawHighlights,
    error: a.error,
  }));
  return `Resultados de los agentes federales (ejecutados en paralelo):\n${JSON.stringify(compact, null, 2)}`;
}

async function synthesizeWithGemini(userContent: string): Promise<CeoResult> {
  const ai = getAI();
  const model = 'gemini-3.1-pro-preview';
  const response = await ai.models.generateContent({
    model,
    contents: [{ role: 'user', parts: [{ text: userContent }] }],
    config: {
      systemInstruction: CEO_SYSTEM,
      thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
    },
  });
  return { status: 'done', provider: 'gemini', model, report: response.text };
}

export async function runCeoSynthesis(agents: AgentResult[]): Promise<CeoResult> {
  const userContent = buildUserContent(agents);
  let anthropicError: string | undefined;

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      const client = new Anthropic();
      const model = process.env.ANTHROPIC_MODEL || 'claude-sonnet-5';
      const msg = await client.messages.create({
        model,
        max_tokens: 4096,
        system: CEO_SYSTEM,
        messages: [{ role: 'user', content: userContent }],
      });
      const report = msg.content.filter(b => b.type === 'text').map(b => b.text).join('');
      return { status: 'done', provider: 'claude', model, report };
    } catch (error: any) {
      anthropicError = `Claude no disponible (${error?.message ?? 'error desconocido'}); se usó Gemini como respaldo.`;
      console.warn('[agentes] CEO Claude falló, usando fallback Gemini:', error?.message);
    }
  }

  const result = await synthesizeWithGemini(userContent);
  return anthropicError ? { ...result, error: anthropicError } : result;
}
