# Canjes

## Qué es
Canje de puntos ciudadanos por beneficios.

## Estado
**Real — conectado a Firestore/API, verificado en el código**

Verificado el 2026-08-25: `onSnapshot(doc(db, 'puntos', user.uid))` lee el saldo en vivo; `addDoc(collection(db, 'canjes/{uid}/lista'))` registra el canje; `updateDoc(..., { total: increment(-b.cost) })` descuenta los puntos de verdad. El saldo mostrado no es un número inventado.

## Conexiones
| Con | Qué fluye |
|---|---|
| profile | Se entra a Canjes desde `ProfileView` (`onGoToCanjes`) |
| system_audit | La colección `puntos` que este módulo decrementa es una de las 5 que sondea la Auditoría de Sistema |

## Dónde vive
- Código: `src/components/CanjesView.tsx` — función/componente `CanjesView()`, líneas 1-130


## Cómo editarlo
- CRUD real sobre Firestore — seguir el mismo patrón para cambios de reglas de canje.
- El catálogo `beneficios` (líneas 25-30) sí está hardcodeado: los 4 beneficios y sus costos viven en el código, no en Firestore. El *saldo* y el *canje* son reales; el *catálogo* no. Moverlo a una colección es el siguiente paso natural.

## Pendientes
- **Descuento no atómico (riesgo de canje gratis).** En `handleCanjear()` (líneas 43-56) el `addDoc` del canje ocurre antes del `updateDoc` que descuenta puntos, y el `updateDoc` lleva un `.catch(async () => {})` vacío que se traga el error. Si el descuento falla (reglas, documento inexistente, red), el canje queda creado y los puntos no se descuentan, sin que nadie se entere. Corrección propuesta: usar `runTransaction` para leer saldo, descontar y registrar en una sola operación; como mínimo, dejar de silenciar ese `catch`.
- Los beneficios ("Descuento 10% predial", "Entrada Utopías Nayarit") no están respaldados por ningún convenio verificado: el código genera un `code` de canje que ninguna ventanilla puede validar hoy.
