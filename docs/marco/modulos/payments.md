# Tesorería y Trámites (ciudadano)

## Qué es
Flujo de pago "QR Mágico" y Ventanilla Única de trámites (licencias, permisos, uso de suelo, actas).

## Estado
**Riesgo — simula un resultado que podría confundirse con uno real (pago, documento oficial, verificación)**

## Conexiones
| Con | Qué fluye |
|---|---|
| tesoreria (C5) | Contraparte del panel municipal |
| be_pay /api/create-payment-intent | Endpoint real de Stripe, pero el flujo de referencia es simulado del lado del cliente |

## Dónde vive
- Código: `src/components/CitizenApp.tsx` — función/componente `TesoreriaYTramitesView()`, líneas 1553-1624


## Cómo editarlo
- La referencia de pago (`generatePaymentRef`) se calcula 100% en el cliente (SHA-256 de curp+servicio+timestamp+random) y nunca se registra en un backend validable por caja o banco — no tratar este flujo como un cobro real todavía.
- El pago con tarjeta simula éxito con `setTimeout` y un código de autorización fabricado.
- Los 4 botones de Ventanilla Única (Licencia de Funcionamiento, Permiso de Construcción, Uso de Suelo, Actas) no tienen `onClick`.

## Pendientes
- Integrar una pasarela de pago real o, como mínimo, una referencia emitida y persistida por el backend antes de demostrar este flujo como "pagar de verdad".
- 4 CTAs muertas en Ventanilla Única — ninguna abre su formulario de trámite.
