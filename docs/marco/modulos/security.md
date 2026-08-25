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
- Código: `src/components/CitizenApp.tsx` — función/componente `SecurityCenterView()`, líneas 1909-2126 (rango creció tras la auditoría de 2026-08-25)

## Auditoría 2026-08-25 — corregido
- El toggle "Autenticación Biométrica" empezaba en `true` sin persistir nada — un adorno. Ahora lee y guarda de verdad una preferencia (`biometricPreferred`) en el documento del usuario en Firestore; el texto aclara que WebAuthn (la biometría real) todavía no está implementado, esto solo guarda la preferencia.
- "Verificación en Dos Pasos: Configurado" y "Nivel de Privacidad: Máximo" eran afirmaciones falsas — ninguna de las dos existe. Ahora dicen "No implementado (demo)" y "Sin política publicada".
- "Sesiones Activas" sugería un inventario de dispositivos que no existe — ahora dice "Sesión Actual" y muestra solo el dispositivo/navegador presente, con nota de que no hay inventario remoto todavía.

## Pendientes
- Ninguno bloqueante detectado — sigue siendo de los módulos más sólidos del repositorio junto con Parlamento.
