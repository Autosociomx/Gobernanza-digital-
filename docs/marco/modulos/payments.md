# Tesorería y Trámites (ciudadano)

## Qué es
Flujo de pago "QR Mágico" y Ventanilla Única de trámites (licencias, permisos, uso de suelo, actas).

## Estado
**Riesgo — el pago sigue siendo 100% simulado; la Ventanilla Única de trámites ya registra solicitudes reales**

## Conexiones
| Con | Qué fluye |
|---|---|
| tesoreria (C5) | Contraparte del panel municipal |
| server.ts /api/create-payment-intent | Endpoint real de Stripe, pero **nada en esta vista lo llama** — sigue sin usarse |
| Firestore: colección `tramites` | Escritura y lectura reales de solicitudes de Ventanilla Única |

## Dónde vive
- Código: `src/components/CitizenApp.tsx` — función/componente `TesoreriaYTramitesView()`. **Corrección de rango**: INDICE.json asignaba L1553-1624, pero el flujo de pago completo (con el código de autorización simulado) vive en el cuerpo principal de `CitizenApp`, no en esta función — ver nota para Bloque 9/`INDICE.json`.

## Auditoría 2026-08-25 — corregido
- El pago con tarjeta mostraba "¡Pago Exitoso!" con un código de autorización **inventado** ("889210-XC") que parecía real. Ahora dice explícitamente "SIMULADO — no se generó ningún cargo real" y "MONTO SIMULADO". El endpoint real de Stripe (`/api/create-payment-intent`) sigue sin cablearse — es una decisión de negocio (cuenta comercial real), documentada como pendiente, no como bug de código.
- Los 4 botones de Ventanilla Única (Licencia de Funcionamiento, Permiso de Construcción, Uso de Suelo, Actas del Registro Civil) no tenían `onClick`. Ahora cada uno abre sus requisitos declarados y, al confirmar, registra la solicitud de verdad en Firestore (`tramites`), con lista de "mis solicitudes registradas" y opción de cancelar. Un `<DemoDataBadge />` aclara que el registro es real pero NO es un trámite oficial ante el municipio (sin firma electrónica avanzada ni validez ante autoridades).

## Pendientes
- Integrar una pasarela de pago real (cablear `/api/create-payment-intent` o retirar el endpoint si no hay plan de usarlo) — decisión de negocio, fuera de alcance de esta ronda.
- La referencia de pago OXXO se sigue calculando 100% en el cliente y no se envía a ningún backend — no tratar este flujo como un cobro real todavía.
