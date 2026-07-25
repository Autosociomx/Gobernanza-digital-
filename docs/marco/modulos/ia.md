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
- Código: `src/components/C5Dashboard.tsx` — función/componente `IAView()`, líneas 774-1000

- `docs/marco/AURA_ASISTENTE_AGENTIVO.md`
- `docs/orbe/modulos/ORBE_NUCLEO.md`

## Cómo editarlo
- El chat en sí es real — cualquier cambio de comportamiento del asistente va en `public/CONNECTX_SYSTEM_PROMPT.md` o en `server.ts`, no en este archivo.
- El botón "Consultar Auditoría Google Cloud" no tiene `onClick` — decorativo.
- Las barras de "Eficacia del Sistema" (líneas 976-1001) son porcentajes fijos, no una medición real.

## Pendientes
- "Consultar Auditoría Google Cloud" es una CTA muerta — enlazar a Cloud Logging real o quitar el botón.
- Las barras de eficacia deberían calcularse de datos reales o marcarse explícitamente como ilustrativas.
