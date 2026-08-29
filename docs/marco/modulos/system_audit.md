# Auditoría de Sistema

## Qué es
Sondeo real de salud del sistema — prueba colecciones de Firestore con `getDocs`.

## Estado
**Real — conectado a Firestore/API, verificado en el código**

Verificado el 2026-08-25: `runAudit()` ejecuta `getDocs(query(collection(db, col.name), limit(10)))` contra 5 colecciones reales — `users`, `tramites`, `expediente_unico`, `puntos`, `auditorias_ciudadanas` — y reporta el error real de Firestore (incluido `permission-denied`) cuando falla. Los resultados no están precocinados.

## Conexiones
| Con | Qué fluye |
|---|---|
| auditoria (Mystery Shopper) | Sondea `auditorias_ciudadanas`, la colección que escribe ese módulo |
| canjes | Sondea `puntos`, la colección que lee y decrementa Canjes |

## Dónde vive
- Código: `src/components/SystemAuditView.tsx` — función/componente `SystemAuditView()`, líneas 1-291


## Cómo editarlo
- Sondeos reales contra Firestore — extender agregando más colecciones al arreglo `collections` (líneas 47-54), no inventando resultados.
- Dos usos de `Math.random()`/`setTimeout` son cosméticos y no fabrican resultados: la línea 58 genera el `id` de React de cada entrada del log, y la línea 119 es un retardo de 600 ms para que el progreso sea legible. No confundirlos con datos simulados.

## Pendientes
- El sondeo depende de las reglas de `firestore.rules`: si la persona que audita no tiene lectura sobre una colección, el módulo reporta "unhealthy" por permisos, no porque la colección esté rota. La UI distingue el caso en el log, pero la tarjeta de estado no.
