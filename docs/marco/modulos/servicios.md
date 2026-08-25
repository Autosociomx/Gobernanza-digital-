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
- Código: `src/components/C5Dashboard.tsx` — función/componente `ServiciosView()`, líneas 544-649 (los tickets viven ahora en `TICKETS_SERVICIOS`, líneas 532-537)

- `docs/orbe/modulos/SERVICIOS_PUBLICOS.md`

## Cómo editarlo
- Los KPIs (líneas 578-582) siguen siendo un arreglo estático dentro de la vista.
- Los tickets se movieron a la constante `TICKETS_SERVICIOS` (`C5Dashboard.tsx:532`) porque ahora la tabla y el exportador leen de la misma fuente: cambiar ahí cambia las dos cosas a la vez.
- Para hacerlo real: sustituir `TICKETS_SERVICIOS` por `reportesCiudadanosService.ts` (ya usado por el chat de Aura en CitizenApp); el exportador CSV no necesita cambios, toma lo que la vista muestre.

## Verificado (auditoría 2026-08, bloque 4)
- Estado: **maqueta con acción real**. Los datos siguen siendo de ejemplo, pero la única acción de la vista ya funciona.
- Reparado: `handleExport` (`C5Dashboard.tsx:555`) era `setTimeout` + `alert('Reporte CSV generado exitosamente. Se ha enviado una copia al correo institucional.')` — no generaba archivo y afirmaba un envío de correo inexistente. Ahora arma el CSV (con BOM y escape de comillas, `campoCsv` en `:540`), lo descarga con `descargarArchivo` (`:83`) y confirma dentro de la UI (`:601`), sin `alert()` y sin prometer correo.
- Aplicado: `<DemoDataBadge>` en `C5Dashboard.tsx:572`.
- Corregido: el encabezado de la tabla decía "Flujo de Reportes en Tiempo Real" sobre un arreglo fijo; ahora dice "Flujo de Reportes".

## Pendientes
- La tabla de tickets no lee de la misma fuente que los reportes ciudadanos reales.
- Los KPIs de la parte superior siguen siendo cifras fijas.
