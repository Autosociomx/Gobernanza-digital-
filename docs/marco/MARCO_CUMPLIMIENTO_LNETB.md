# Marco de Cumplimiento — Ley Nacional de Simplificación y Digitalización

**Nayarit Digital / ConnectX** · Documento normativo del repositorio · v1.0

Este documento mapea cada requisito del marco legal aplicable contra el lugar
del repositorio donde se cumple. Es el documento que se entrega cuando un
ayuntamiento, la ASF o el INAI pregunten "¿y esto dónde está?".

## Tabla de cumplimiento

| # | Requisito legal | Fundamento | Dónde se cumple en el repositorio | Estado |
|---|---|---|---|---|
| 1 | Digitalización de trámites municipales | Ley Nacional de Simplificación y Digitalización (Arts. 25 y 73 CPEUM) | Ventanilla única en `src/components/CitizenApp.tsx`; catálogo de pagos municipales | Operativo en demo |
| 2 | Identidad digital federal | Art. 74 LNETB (LlaveMx) | Integración de identidad en el flujo ciudadano | Preparado |
| 3 | Protección de datos personales (sector público) | LGPDPPSO | Consentimiento explícito previo al uso de datos (`ConsentGate`), registro verificable | Operativo |
| 4 | Interoperabilidad con sistemas federales | LNETB · CURP/RFC/datos.gob.mx | Módulo de conexión federal del C5; servicios en `src/services/` | Operativo en demo |
| 5 | Expediente ciudadano único | LNETB | Expediente digital con folio en CitizenApp | Operativo en demo |
| 6 | Trazabilidad para fiscalización | ASF / SFP | Registro de operaciones y auditoría en el C5; pagos con validación en servidor | Operativo |
| 7 | Accesibilidad universal | WCAG 2.1 AA (referencia técnica) | Lighthouse Accessibility 100 verificado con tres versiones del auditor; contraste AA en toda la paleta | Verificado |
| 8 | Inclusión de lenguas originarias | Derechos lingüísticos de los pueblos indígenas | Selector español / náayeri (cora) / wixárika en el C5; sección Pueblos Originarios | Operativo parcial |
| 9 | Fondos para infraestructura indígena | FAISPIAM | Integración en el módulo de tesorería con trazabilidad | Operativo en demo |
| 10 | Seguridad de la información | Buenas prácticas (referencia: cabeceras OWASP) | `netlify.toml` (HSTS, X-Frame-Options, nosniff); llaves solo en servidor; ver `PROTOCOLO_SEGURIDAD.md` | Operativo |
| 11 | Gratuidad y no discriminación del canal digital | LNETB | Portal sin costo ni registro obligatorio para consultar; pago en efectivo vía OXXO para población no bancarizada | Operativo en demo |

## Regla de honestidad de estados

Todo estado se declara con una de cuatro etiquetas y ninguna otra:

- **Operativo** — funciona hoy y puede demostrarse en vivo
- **Operativo en demo** — funciona en el entorno de demostración; falta convenio/datos reales del municipio
- **Preparado** — el código existe; falta la credencial o convenio externo (p. ej. LlaveMx)
- **Hoja de ruta** — planeado con fecha; no existe aún

Prohibido declarar "Cumple" a secas sin poder señalar archivo y flujo que lo
demuestre. Esta regla existe porque una sola afirmación desmentible en la mesa
tira la credibilidad de las diez verdaderas.

## Revisión

Este marco se revisa en cada sesión del Gabinete de Especialistas
(`docs/agentes/GABINETE_ESPECIALISTAS.md`) y cada vez que cambie la
legislación aplicable. Los cambios quedan asentados en actas (`docs/actas/`).
