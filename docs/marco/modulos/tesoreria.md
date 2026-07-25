# Tesorería Digital

## Qué es
Recaudación semanal, pagos digitales y trámites activos del municipio, con gráfica de área.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
| Con | Qué fluye |
|---|---|
| Servicios Públicos | Comparten el mismo panel de indicadores municipales |
| Tesorería y Trámites (CitizenApp) | Es la contraparte ciudadana de este mismo dominio |

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `TesoreriaView()`, líneas 297-364

- `docs/orbe/modulos/TESORERIA.md` (alias de equipo: "Faro Fiscal", según `docs/plataforma/03-DOCUMENTACION-FUNCIONAL.md`)

## Cómo editarlo
- Los datos de recaudación (líneas 298-306) y las tarjetas de estadística (316-320) son arreglos estáticos — no hay import de ningún servicio en este archivo.
- Para hacerlo real: agregar un servicio que agregue datos de la colección de pagos en Firestore, y sustituir los arreglos por su resultado.

## Pendientes
- Conectar a una agregación real de Firestore/BigQuery de la recaudación — hoy es maqueta visual completa.
