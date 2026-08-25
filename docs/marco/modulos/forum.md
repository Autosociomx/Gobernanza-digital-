# Parlamento (tab ciudadano)

## Qué es
Mismo foro parlamentario municipal, accesible desde la app ciudadana.

## Estado
**Real — conectado a Firestore, verificado en el código**

Es literalmente el mismo componente que `parlamento`: mismo archivo, misma colección `forum_threads`, mismas escrituras (`addDoc`/`updateDoc`/`deleteDoc`) y la misma suscripción en vivo con `onSnapshot`. La única diferencia es la entrada: aquí se monta con la prop `onBack` (para volver al inicio de la CitizenApp) y en el C5 se monta sin ella.

## Conexiones
| Con | Qué fluye |
|---|---|
| parlamento (C5) | Mismo componente y misma colección: un hilo publicado desde la app ciudadana aparece en el panel de gobierno y viceversa |
| CitizenApp | Se monta como vista `forum` (`src/components/CitizenApp.tsx:379`) |
| firestore.rules | `forum_threads` (líneas 273-281) |

## Dónde vive
- Código: `src/components/dashboard/ParlamentoView.tsx` — función/componente `ParlamentoView()`, líneas 1-539

## Cómo editarlo
- Ver ficha `parlamento.md` — es el mismo archivo y el mismo componente; cualquier cambio afecta a las dos superficies a la vez (ciudadana y de gobierno). Verificar siempre en ambas.

## Pendientes
- Los mismos de `parlamento.md`. Relevante para esta superficie: el ciudadano sin sesión iniciada puede llenar el formulario, pero la regla de Firestore rechazará la escritura — falta bloquear o avisar antes.

## Bitácora de auditoría
- **2026-08 (Bloque 7).** Verificado que las dos entradas de `INDICE.json` (`parlamento` y `forum`) apuntan al mismo componente y comparten estado real en Firestore. Las correcciones aplicadas (borrado solo para el autor, fin del autor ficticio "Juan Pérez", guardas de fecha, aviso de no-moderación) rigen igual en esta superficie; el detalle está en `parlamento.md`.
