# Inicio ciudadano

## Qué es
Pantalla principal del portal ciudadano: chat de Aura, hero de "Soberanía Digital", accesos rápidos.

## Estado
**Parcial — parte de la vista es real, parte es maqueta o tiene botones sin acción**

## Conexiones
| Con | Qué fluye |
|---|---|
| useAuraChat (hooks/useAuraChat.ts) | Chat conversacional real contra `/api/ai/chat`, sin function calling — en `main` este hook **no** tiene `onAccion`/`enableReportTool` (esa capacidad de que el chat ejecute una acción real, como registrar un reporte, existe en otra rama de trabajo pero no llegó aquí todavía) |
| Firestore `users/{uid}` (vía `setDoc`) | `updateProfile()` sí escribe cambios reales de perfil |

## Dónde vive
- Código: `src/components/CitizenApp.tsx` — función/componente `HomeView()`, líneas 1029-1378

## Cómo editarlo
- El chat de Aura (línea 268 del archivo completo) es real como conversación, pero **no** puede ejecutar acciones (a diferencia de lo que se documentó en una rama distinta del repositorio) — verificar con `grep onAccion src/hooks/useAuraChat.ts` antes de asumir esa capacidad.
- La tarjeta hero "Soberanía Digital" tiene `cursor-pointer` en el `div` exterior, pero solo el botón interior "Ver Manifiesto" tiene `onClick` real — afordancia engañosa a corregir.

## Pendientes
- Quitar `cursor-pointer` del `div` exterior de la tarjeta hero, o darle la misma acción que el botón interior.
