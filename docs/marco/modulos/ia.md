# Asistente IA (Aura, vista de gobierno)

## Qué es
Chat de Aura para el funcionario municipal — reporte de eficiencia, estatus de recaudación, y acceso a auditoría.

## Estado
**Real — conectado a Firestore/API, verificado en el código**

## Conexiones
| Con | Qué fluye |
|---|---|
| useAuraChat / useAuraVoice | Motor real compartido con CitizenApp |
| server.ts /api/ai/chat | Backend real, function calling de Gemini |

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `IAView()`, líneas 774-1000 (rango creció tras la auditoría de 2026-08-25, ver nota abajo)

- `docs/marco/AURA_ASISTENTE_AGENTIVO.md`
- `docs/orbe/modulos/ORBE_NUCLEO.md`

## Cómo editarlo
- El chat en sí es real — cualquier cambio de comportamiento del asistente va en `public/CONNECTX_SYSTEM_PROMPT.md` o en `server.ts`, no en este archivo.
- El selector de idioma (es/cora/wixarika) NO es un sistema de internacionalización — solo cambia el saludo inicial del asistente. La conversación y la voz (`useAuraVoice.ts`) siguen siempre en español. El texto junto al selector ahora lo dice explícitamente.
- Las barras de "Eficacia del Sistema" siguen siendo porcentajes fijos; ahora llevan una nota visible ("Cifras ilustrativas... no hay telemetría conectada") en vez de presentarse como medición.

## Auditoría 2026-08-25 — corregido
- El botón "Consultar Auditoría Google Cloud" no tenía `onClick` y prometía una auditoría inexistente. Ahora despliega, dentro de la misma vista, qué se registra realmente de la conversación (viaja a `/api/ai/chat`, vive solo en memoria de la pestaña) y qué no (no hay bitácora persistente ni integración con Cloud Logging).
- El encabezado "GOBERNANZA DATA-DRIVEN · COBERTURA TOTAL" se cambió por "ASISTENTE CONVERSACIONAL · RESPONDE EN ESPAÑOL".
- El "Reporte Algorítmico" con una cifra de impacto inventada ("eliminando el 100% de la opacidad...") se sustituyó por un texto de ejemplo explícitamente marcado como tal.

## Pendientes
- Las barras de eficacia deberían calcularse de datos reales o mantenerse como ilustrativas de forma permanente (ya están marcadas).
- El saludo en español del asistente sigue dirigiéndose a "Presidenta Geraldine Ponce" (nombre real) — no se tocó en esta ronda; decisión pendiente del propietario del repositorio, igual que el resto del contenido con nombres reales.
