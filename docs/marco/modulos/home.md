# Inicio ciudadano

## Qué es
Pantalla principal del portal ciudadano: chat de Aura, hero de "Soberanía Digital", accesos rápidos.

## Estado
**Parcial — parte de la vista es real, parte es maqueta o tiene botones sin acción**

## Conexiones
| Con | Qué fluye |
|---|---|
| useAuraChat con onAccion | El chat real puede registrar un reporte ciudadano (`reportesCiudadanosService.crearReporte`) durante la conversación misma |

## Dónde vive
- Código: `src/components/CitizenApp.tsx` — función/componente `HomeView()`, líneas 1029-1378


## Cómo editarlo
- El chat de Aura (líneas ~275-293 del archivo completo) es real y es la integración de IA más sólida del repositorio — no tocar su lógica de `onAccion` sin revisar `reportesCiudadanosService.ts`.
- La tarjeta hero "Soberanía Digital" tiene `cursor-pointer` en el `div` exterior, pero solo el botón interior "Ver Manifiesto" tiene `onClick` real — afordancia engañosa a corregir.

## Pendientes
- Quitar `cursor-pointer` del `div` exterior de la tarjeta hero, o darle la misma acción que el botón interior.
