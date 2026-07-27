# Auditoría de Sistema

## Qué es
Sondeo real de salud del sistema — prueba colecciones de Firestore con `getDocs`.

## Estado
**Real — conectado a Firestore/API, verificado en el código**

## Conexiones
| Con | Qué fluye |
|---|---|
| Firestore: users, tramites, expediente_unico, puntos, auditorias_ciudadanas | Sondeo real de estas 5 colecciones con `query(..., limit(10))` — las mismas 4 primeras que usa Centro de Seguridad (`security`) |
| security (CitizenApp) | Ambas leen/verifican las mismas colecciones (users, tramites, expediente_unico, puntos) |

## Dónde vive
- Código: `src/components/SystemAuditView.tsx` — función/componente `SystemAuditView()`, líneas 1-291


## Cómo editarlo
- Sondeos reales contra Firestore — extender agregando más colecciones a la lista de prueba, no inventando resultados.

## Pendientes
_Ninguno registrado._
