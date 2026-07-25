# Nodo de Transparencia (Interoperabilidad)

## Qué es
Panel del C5 que muestra endpoints de transparencia, trazabilidad inter-institucional y un log tipo blockchain municipal.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
| Con | Qué fluye |
|---|---|
| Gabinete | Referencia cruzada de auditoría institucional (visual, no conectada) |

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `InteroperabilidadView()`, líneas 209-296


## Cómo editarlo
- Todo el contenido son arreglos estáticos declarados dentro de la función — no hay servicio que tocar todavía.
- Para hacerlo real: crear un servicio en `src/services/` que lea un log de auditoría real y sustituir los arreglos de las líneas 243-248 y 275-280.

## Pendientes
- Conectar a una fuente real de trazabilidad institucional — hoy es 100% maqueta visual.
