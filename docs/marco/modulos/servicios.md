# Servicios Públicos

## Qué es
KPIs de servicios públicos y tabla de tickets/reportes ciudadanos, con exportación a CSV.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
| Con | Qué fluye |
|---|---|
| Servicios y Reportes (CitizenApp) | Es la contraparte ciudadana — los reportes que ahí se generan deberían alimentar esta tabla |

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `ServiciosView()`, líneas 418-513

- `docs/orbe/modulos/SERVICIOS_PUBLICOS.md`

## Cómo editarlo
- KPIs (líneas 438-442) y la tabla completa de tickets (478-482) son arreglos estáticos.
- El botón "Exportar CSV" (líneas 421-427, 457-464) solo hace `setTimeout` y muestra un `alert()` de éxito — no genera ningún archivo.
- Para hacerlo real: conectar la tabla a `reportesCiudadanosService.ts` (ya usado por el chat de Aura en CitizenApp) y generar el CSV de verdad a partir de esos datos.

## Pendientes
- "Exportar CSV" es un botón con éxito simulado — no produce archivo alguno.
- La tabla de tickets no lee de la misma fuente que los reportes ciudadanos reales.
