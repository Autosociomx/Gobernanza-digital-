# ConectaX Salud — Triaje Médico Digital

> **Migrado de Claude API → Gemini (Google AI Studio)** · Julio 2026

Antes: `claude-haiku-4-5` vía Anthropic SDK en Netlify Function.
Ahora: `gemini-2.0-flash` vía `@google/genai` en endpoint unificado `/api/ai/triage`.

## Qué cambió

| Antes | Ahora |
|---|---|
| `apps/salud/netlify/functions/triage.mjs` | `server.ts → /api/ai/triage` |
| Dependencia: `@anthropic-ai/sdk` | Dependencia: `@google/genai` (ya existente) |
| Modelo: `claude-haiku-4-5` | Modelo: `gemini-2.0-flash` |
| Deploy separado en Netlify | Mismo deploy de Gobernanza Digital |

## Por qué

- Una sola API key (Gemini) para todo el ecosistema
- Sin costo adicional de Anthropic
- El frontend de ConectaX Salud (index.html) se sirve como ruta estática
- El endpoint `/api/ai/triage` usa el mismo `getAI()` que Aura, risk-analysis, etc.
