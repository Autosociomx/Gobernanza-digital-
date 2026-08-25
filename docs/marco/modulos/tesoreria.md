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
- Código: `src/components/C5Dashboard.tsx` — función/componente `TesoreriaView()`, líneas 333-402

- `docs/orbe/modulos/TESORERIA.md` (alias de equipo: "Faro Fiscal", según `docs/plataforma/03-DOCUMENTACION-FUNCIONAL.md`)

## Cómo editarlo
- Los datos de recaudación (líneas 334-342) y las tarjetas de estadística (356-360) son arreglos estáticos — no hay import de ningún servicio para este módulo.
- Para hacerlo real: agregar un servicio que agregue datos de la colección de pagos en Firestore, y sustituir los arreglos por su resultado.

## Verificado (auditoría 2026-08, bloque 4)
- Confirmado maqueta: sin `firestore`/`fetch(`/servicio en el rango; `const data = [...]` en `C5Dashboard.tsx:334` y tarjetas literales en `:356`.
- No tenía autoetiqueta. Aplicado: `<DemoDataBadge>` en `C5Dashboard.tsx:351`.
- Sin acciones muertas: la vista no tiene ningún botón.

## Pendientes
- Conectar a una agregación real de Firestore/BigQuery de la recaudación — hoy es maqueta visual completa.
