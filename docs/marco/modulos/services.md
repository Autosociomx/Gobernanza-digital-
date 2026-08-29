# Servicios y Reportes (ciudadano)

## Qué es
Reporte manual de incidencias (luminaria, bacheo, falla hídrica), seguimiento de recolección de basura, y acceso a Mystery Shopper.

## Estado
**Parcial — el reporte manual ya es real (Firestore); RoutePro sigue siendo horario de ejemplo, ahora declarado como tal**

## Conexiones
| Con | Qué fluye |
|---|---|
| Firestore: colección `reportes_ciudadanos` | Escritura y lectura reales de reportes ciudadanos |
| MysteryShopperView | Ya estaba correctamente enlazado desde aquí |

## Dónde vive
- Código: `src/components/CitizenApp.tsx` — función/componente `ServiciosYReportesView()`, líneas 1625-1741 (rango creció tras la auditoría de 2026-08-25)

## Auditoría 2026-08-25 — corregido
- Los 3 botones de reporte manual (Auditoría de Luminaria / Bacheo / Falla Hídrica) no tenían `onClick`. Ahora cada uno abre un formulario real (descripción + ubicación GPS opcional) que escribe en Firestore (`reportes_ciudadanos`), con lista de "mis reportes" y opción de eliminar. El texto aclara que aún no hay despacho automático a una cuadrilla municipal ni carga de fotografía.
- "Seguimiento Recolección Basura" (RoutePro) no tenía `onClick`. Ahora despliega un horario de ejemplo con `<DemoDataBadge />` explícito de que no hay GPS en vivo conectado a ninguna unidad — antes decía "Visibilidad GPS en tiempo real" sin que existiera.

## Pendientes
- RoutePro sigue sin conexión real a GPS de unidades — el horario mostrado es de ejemplo, ya declarado como tal.
