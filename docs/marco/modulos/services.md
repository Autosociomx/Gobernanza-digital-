# Servicios y Reportes (ciudadano)

## Qué es
Reporte manual de incidencias (luminaria, bacheo, falla hídrica), seguimiento de recolección de basura, y acceso a Mystery Shopper.

## Estado
**Parcial — parte de la vista es real, parte es maqueta o tiene botones sin acción**

## Conexiones
| Con | Qué fluye |
|---|---|
| reportesCiudadanosService.ts | Ya usado por el chat de Aura — estos botones deberían llamar al mismo servicio |
| MysteryShopperView | Ya está correctamente enlazado desde aquí |

## Dónde vive
- Código: `src/components/CitizenApp.tsx` — función/componente `ServiciosYReportesView()`, líneas 1625-1741


## Cómo editarlo
- Los 3 botones de reporte manual (Auditoría de Luminaria / Bacheo / Falla Hídrica) no tienen `onClick` — deberían invocar `crearReporte()` de `reportesCiudadanosService.ts`, igual que ya hace el chat de Aura.
- "Seguimiento Recolección Basura" (RoutePro) tampoco tiene `onClick`.
- El botón "Programa Mystery Shopper" sí navega correctamente — no tocar ese patrón, es la referencia correcta.

## Pendientes
- 3 CTAs muertas de reporte manual — la forma más barata de arreglarlas es reutilizar `crearReporte()`, ya probado por el chat.
- 1 CTA muerta de seguimiento de RoutePro.
