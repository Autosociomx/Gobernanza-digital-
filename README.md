<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/2d0cecbc-0674-45dc-aadf-d5ea5c5b31d9

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Agentes Federales (datos abiertos del Gobierno Federal)

El módulo **Agentes Federales** (pestaña en el C5 Governance Hub) lanza agentes de IA **en paralelo** que consultan plataformas federales de datos abiertos y cruzan los resultados para detectar oportunidades para Nayarit y Tepic:

- **datos.gob.mx** (catálogo CKAN, sin clave)
- **DataMéxico** (Secretaría de Economía, sin clave)
- **INEGI** (indicadores oficiales — requiere `INEGI_API_TOKEN`, gratuito en inegi.org.mx > Desarrolladores)

Un agente **"CEO Digital"** sintetiza los hallazgos en un informe ejecutivo:

- Con `ANTHROPIC_API_KEY` configurada usa **Claude** (modelo por defecto `claude-sonnet-5`, ajustable con `ANTHROPIC_MODEL`).
- Sin ella, cae automáticamente a **Gemini** (usa la `GEMINI_API_KEY` existente).

**Seguridad:** todas las llamadas de IA se ejecutan en el servidor; ninguna API key se incluye en el bundle del navegador.
