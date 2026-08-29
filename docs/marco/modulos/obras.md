# Trazabilidad de Obras

## Qué es
Mapa del registro maestro de infraestructura del estado y alertas derivadas del estado de cada activo.

## Estado
**Real — conectado a Firestore, verificado en el código (auditoría 2026-08)**

## Conexiones
| Con | Qué fluye |
|---|---|
| infrastructureService.ts | `getMasterRegistry()` — activos de la colección `infrastructure`: ubicación, estado, responsable, IUN, índice de integridad |
| SovereignMap / CitizenApp | Consumen el mismo servicio y la misma colección, así que ven el mismo padrón de obras |

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `ObrasView()`, líneas 426-531 (helpers de color/etiqueta de estado en 403-418)

- `docs/orbe/modulos/OBRAS.md` (alias de equipo: "Carreteras Inteligentes")
- `src/services/infrastructureService.ts` — servicio que alimenta esta vista
- `src/services/__tests__/infrastructureService.test.ts` — pruebas del servicio

## Cómo editarlo
- La vista ya no contiene obras escritas a mano: los marcadores y las alertas se calculan a partir de `getMasterRegistry()` (`C5Dashboard.tsx:434`, `:442-452`).
- Para cambiar qué se muestra hay que tocar los datos en Firestore (colección `infrastructure`) o el servicio, no este archivo.
- Los colores y etiquetas de estado se mapean en `COLOR_POR_ESTADO` / `ETIQUETA_ESTADO` (`C5Dashboard.tsx:403-418`); si se agrega un `AssetStatus` nuevo al servicio, hay que agregarlo también ahí (hay respaldo por defecto, no truena).

## Verificado (auditoría 2026-08, bloque 4)
- Antes: maqueta. Tres marcadores inventados ("Obra Principal Centro", "Frente de Trabajo Norte", "Reporte Crítico"), tres alertas inventadas ("Retraso Crítico: Puente Insurgentes") y un contador fijo de "42 en proceso".
- Ahora: `getMasterRegistry()` importado en `C5Dashboard.tsx:43` y consumido en `:434`, con estados de carga, error y vacío. El contador muestra el número real de activos registrados (`:483`).
- Las alertas son los activos con `status` `CRITICAL` o `RISK` (`C5Dashboard.tsx:452`), con IUN, municipio, responsable e índice de integridad reales.
- Se corrigió la copia "Monitoreo en tiempo real": es una lectura bajo demanda, con botón "Actualizar" (`C5Dashboard.tsx:462`), no un stream.
- Sin `DemoDataBadge`: ya no hay datos de muestra en esta vista.

## Pendientes
- `getMasterRegistry()` atrapa sus propios errores y devuelve `[]` (`infrastructureService.ts:66-69`), así que un fallo de permisos se ve igual que "no hay obras". Convendría que propague el error para poder distinguirlos.
- La colección `infrastructure` puede estar vacía en un entorno nuevo; `seedInfrastructure()` existe pero solo lo llama `SovereignMap`, no esta vista.
- El mapa usa `defaultCenter` (`NayaritMap.tsx:38`), así que no se recentra sobre los activos que llegan después de montar.
