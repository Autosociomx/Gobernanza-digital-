# Gabinete en Tiempo Real

## Qué es
Tarjetas de funcionarios del gabinete municipal con KPIs individuales y botón de auditoría.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
| Con | Qué fluye |
|---|---|
| Interoperabilidad | Referencia visual cruzada de auditoría institucional |

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `GabineteView()`, líneas 1518-1629


## Cómo editarlo
- Los 4 funcionarios y sus KPIs/tiempos de respuesta/proyectos (líneas 1539-1584) son un arreglo hardcodeado con nombres reales.
- El botón "Auditar Funcionario" es un `div` con estilos de botón pero sin `onClick` — decorativo.

## Pendientes
- "Auditar Funcionario" es una CTA muerta — enlazar a `SystemAuditView`/un registro de auditoría real, o quitar el botón.
- Los nombres y KPIs de funcionarios son datos de muestra — verificar si deben ser reales antes de un demo público, dado que usan nombres reales.
