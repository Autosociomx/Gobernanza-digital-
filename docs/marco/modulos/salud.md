# Salud Inteligente — Nayarit ID

## Qué es
Cola de citas en tiempo real y búsqueda de expediente de urgencias por CURP, con flujo de acceso de emergencia auditado.

## Estado
**Real — conectado a Firestore/API, verificado en el código**

## Conexiones
| Con | Qué fluye |
|---|---|
| citasSaludService.ts | Cola de citas real |
| saludPerfilService.ts | Búsqueda y registro de acceso al expediente |
| Aura / Asistente IA | Puede citarse desde el chat |

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `SaludView()`, líneas 514-773

- `docs/marco/MODULO_SALUD_CURP.md`
- `docs/orbe/modulos/EXPEDIENTE_FAMILIAR.md`
- `docs/orbe/modulos/TEPICTU_SALUD.md` (nota: ese doc dice "diseñado", pero el triaje ROJO/AMARILLO/VERDE ya está implementado dentro de `SaludNayaritID.tsx` — discrepancia ya señalada en `docs/plataforma/03-DOCUMENTACION-FUNCIONAL.md`)

## Cómo editarlo
- Es el único módulo del panel C5 con servicios reales de por medio — cualquier cambio de datos debe pasar por `citasSaludService.ts`/`saludPerfilService.ts`, nunca por un arreglo local nuevo.
- El "Mapa de Calor" de alertas de salud pública (líneas 746-783, dentro de esta misma vista) sí es decorativo/estático — no confundirlo con el resto del módulo, que es real.

## Pendientes
- Separar visualmente el "Mapa de Calor" (maqueta) del resto de la vista (real) para no prestarle credibilidad que no tiene.
