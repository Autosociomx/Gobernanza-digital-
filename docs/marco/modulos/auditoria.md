# Mystery Shopper

## Qué es
Formulario de auditoría ciudadana tipo "comprador misterioso" sobre trámites municipales.

## Estado
**Real — conectado a Firestore/API, verificado en el código**

Verificado el 2026-08-25: `addDoc(collection(db, 'auditorias_ciudadanas'), {...})` con `serverTimestamp()` — escritura genuina, sin datos hardcodeados ni `setTimeout` simulando el envío.

## Conexiones
| Con | Qué fluye |
|---|---|
| services (CitizenApp) | Se llega aquí desde el botón "Programa Mystery Shopper", correctamente enlazado |
| system_audit | `SystemAuditView` sondea la colección `auditorias_ciudadanas` que escribe este módulo |

## Dónde vive
- Código: `src/components/MysteryShopperView.tsx` — función/componente `MysteryShopperView()`, líneas 1-266


## Cómo editarlo
- Firestore real (`addDoc`) — seguir el mismo patrón.
- El folio se calcula una sola vez en `handleSubmit()` y se guarda en el estado `folioGuardado` para poder mostrar **el mismo folio** que quedó en la base. No volver a calcularlo en el render: `Date.now()` cambia y se le mostraría a la persona un folio inexistente (ese era el bug corregido).
- La validación de campos clave usa `alert()` — funcional pero tosco; sustituirlo por validación en línea es una mejora pendiente, no un defecto de veracidad.

## Pendientes
- No existe pantalla de consulta por folio: la persona recibe un folio que hoy no puede usar para rastrear nada. La UI ya lo advierte.
- No hay remisión automática al Órgano Interno de Control. El texto del encabezado y el de la pantalla de éxito ya lo declaran; no reintroducir la afirmación de que "activa protocolos de revisión del OIC" mientras no exista el canal.
- El campo libre `comentarios` puede contener datos personales aunque la denuncia sea anónima; falta definir política de retención y quién lee la colección.
