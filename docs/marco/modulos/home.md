# Inicio ciudadano

## Qué es
Pantalla principal del portal ciudadano: chat de Aura, hero de "Soberanía Digital", accesos rápidos.

## Estado
**Parcial — parte de la vista es real, parte es maqueta o tiene botones sin acción**

## Conexiones
| Con | Qué fluye |
|---|---|
| useAuraChat con onAccion | El chat real puede registrar un reporte ciudadano durante la conversación misma |

## Dónde vive
- Código: `src/components/CitizenApp.tsx` — función/componente `HomeView()`, líneas 1029-1378

## Cómo editarlo
- El chat de Aura es real y es la integración de IA más sólida del repositorio — no tocar su lógica de `onAccion` sin revisar `src/services/`.
- La cifra "Soberanía: 98.4%" ahora lleva la coletilla "· cifra ilustrativa" en vez de presentarse como una medición.
- La tarjeta de obra en curso ("Reencarpetamiento San Juan: 65% de avance") ahora lleva `<DemoDataBadge />` aclarando que la obra, el porcentaje y el presupuesto son de ejemplo.

## Auditoría 2026-08-25 — corregido
- La tarjeta hero "Soberanía Digital" tenía `cursor-pointer` en el `div` exterior pero solo el botón interior "Ver Manifiesto" tenía acción real — afordancia engañosa ya corregida (se quitó el `cursor-pointer` del contenedor).

## Pendientes
- Ninguno bloqueante detectado en esta ronda.
