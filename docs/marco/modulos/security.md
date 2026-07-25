# Centro de Seguridad

## Qué es
Descargar mis datos y eliminar mi cuenta — con borrado real en Firestore.

## Estado
**Real — conectado a Firestore/API, verificado en el código**

## Conexiones
| Con | Qué fluye |
|---|---|
| Firestore: users, expediente_unico, tramites, puntos | Lecturas y borrados reales |
| Firebase Auth | `user.delete()` real |

## Dónde vive
- Código: `src/components/CitizenApp.tsx` — función/componente `SecurityCenterView()`, líneas 1909-2126


## Cómo editarlo
- Es un patrón de referencia — cualquier flujo similar (ej. portabilidad de datos de otro módulo) debería copiar esta estructura, no reinventarla.

## Pendientes
- Ninguno detectado — es de los módulos más sólidos del repositorio junto con Parlamento.
