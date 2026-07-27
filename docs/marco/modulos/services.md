# Servicios y Reportes (ciudadano)

## Qué es
Reporte manual de incidencias (luminaria, bacheo, falla hídrica), seguimiento de recolección de basura, y acceso a Mystery Shopper.

## Estado
**Parcial — parte de la vista es real, parte es maqueta o tiene botones sin acción**

## Conexiones
| Con | Qué fluye |
|---|---|
| UrbanReportMapView.tsx | Mapa de Google Maps (`@vis.gl/react-google-maps`) — solo visualización, sin `addDoc`/`onSnapshot`, no escribe reportes |
| MysteryShopperView | Ya está correctamente enlazado desde aquí |

## Dónde vive
- Código: `src/components/CitizenApp.tsx` — función/componente `ServiciosYReportesView()`, líneas 1625-1741

## Cómo editarlo
- Los 3 botones de reporte manual (Auditoría de Luminaria / Bacheo / Falla Hídrica) no tienen `onClick`. No existe todavía en `main` ningún servicio de reportes ciudadanos (`reportesCiudadanosService.ts` no existe en este árbol) — hay que construirlo desde cero (colección Firestore + función `crearReporte`), no solo conectarlos a algo ya hecho.
- "Seguimiento Recolección Basura" (RoutePro) tampoco tiene `onClick`.
- El botón "Programa Mystery Shopper" sí navega correctamente — no tocar ese patrón, es la referencia correcta.

## Pendientes
- 3 CTAs muertas de reporte manual — requieren construir un servicio de reportes ciudadanos nuevo (no existe aún en `main`), con su colección de Firestore y reglas de seguridad.
- 1 CTA muerta de seguimiento de RoutePro.
