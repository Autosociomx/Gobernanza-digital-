# Canjes

## Qué es
Canje de puntos ciudadanos por beneficios.

## Estado
**Real — conectado a Firestore/API, verificado en el código**

## Conexiones
| Con | Qué fluye |
|---|---|
| Firestore: canjes/{uid}/lista | Escritura real vía addDoc — canje de puntos persistido por usuario |

## Dónde vive
- Código: `src/components/CanjesView.tsx` — función/componente `CanjesView()`, líneas 1-130


## Cómo editarlo
- CRUD real sobre Firestore — seguir el mismo patrón para cambios de reglas de canje.

## Pendientes
_Ninguno registrado._
