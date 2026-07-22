/**
 * Proxy de Netlify Functions para /api/ai/chat.
 *
 * netlify.toml solo publica dist/ como sitio estático — no ejecuta
 * server.ts. Sin esta función, el chat de Aura (useAuraChat.ts) siempre
 * caería al mensaje offline en el sitio desplegado. Replica exactamente
 * el handler de server.ts usando la misma lógica compartida
 * (src/shared/auraSystemPrompt.ts), para que ambos runtimes respondan
 * idéntico.
 *
 * Requiere GEMINI_API_KEY configurada en Netlify → Site settings →
 * Environment variables (paso manual, no automatizable desde el repo).
 */

import { GoogleGenAI } from '@google/genai';
import { buildAuraGenerateConfig } from '../../src/shared/auraSystemPrompt';

let aiClient: GoogleGenAI | null = null;
function getAI(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) throw new Error('GEMINI_API_KEY no configurada en las variables de entorno de Netlify.');
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: { headers: { 'User-Agent': 'aistudio-build' } },
    });
  }
  return aiClient;
}

export const handler = async (event: { httpMethod: string; body: string | null }) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Método no permitido' }) };
  }

  if (!process.env.GEMINI_API_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'GEMINI_API_KEY no configurada. Añádela en Netlify → Site settings → Environment variables.' }),
    };
  }

  try {
    const { message, context, useThinking, useMaps, useSearch } = JSON.parse(event.body || '{}');
    const ai = getAI();
    const { model, config, finalPrompt } = buildAuraGenerateConfig({ message, context, useThinking, useMaps, useSearch });

    const response = await ai.models.generateContent({
      model,
      contents: [{ role: 'user', parts: [{ text: finalPrompt }] }],
      config,
    });

    return { statusCode: 200, body: JSON.stringify({ response: response.text }) };
  } catch (error: any) {
    console.error('AI Assistant Error (Netlify Function):', error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message || 'Error procesando la solicitud de IA' }) };
  }
};
