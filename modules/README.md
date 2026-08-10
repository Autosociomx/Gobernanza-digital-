# ConectaX — Visión del Ecosistema

Migrado desde `gobernanza-digitalcx/docs/`.

## Módulos

| Módulo | Endpoint | Estado |
|---|---|---|
| **ConectaX Salud** | `/api/ai/triage` | ✅ Migrado a Gemini |
| **ConectaX Trámites** | (pendiente) | 📋 Roadmap |
| **ConectaX Educación** | (pendiente) | 📋 Roadmap |
| **ConectaX Seguridad** | (pendiente) | 📋 Roadmap |

## Frontends

- `modules/conectax-salud/index.html` — SPA de triaje médico (HTML/CSS/JS vanilla)

## Stack unificado

```
Ciudadano → Frontend estático (CDN/Netlify)
           → /api/ai/triage (server.ts, Gemini)
           → Respuesta JSON con CIE-11
```
