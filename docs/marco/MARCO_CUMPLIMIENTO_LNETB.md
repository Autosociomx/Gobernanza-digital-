# Marco de Cumplimiento — Ley Nacional de Simplificación y Digitalización

**Nayarit Digital / ConnectX** · Documento normativo del repositorio · v1.0

Este documento mapea cada requisito del marco legal aplicable contra el lugar
del repositorio donde se cumple. Es el documento que se entrega cuando un
ayuntamiento, la ASF o el INAI pregunten "¿y esto dónde está?".

## Tabla de cumplimiento

**Actualizada 2026-08-25** tras una auditoría exhaustiva de los 29 módulos de código contra este documento. Las filas 2, 3, 4, 7 y 9 estaban sobrevendidas respecto a lo que el código realmente hace, verificado con evidencia archivo:línea — corregidas abajo. Historial de la versión anterior de esta tabla: `git log -p -- docs/marco/MARCO_CUMPLIMIENTO_LNETB.md`.

| # | Requisito legal | Fundamento | Dónde se cumple en el repositorio | Estado |
|---|---|---|---|---|
| 1 | Digitalización de trámites municipales | Ley Nacional de Simplificación y Digitalización (Arts. 25 y 73 CPEUM) | Ventanilla única en `src/components/CitizenApp.tsx` (`TesoreriaYTramitesView`, líneas 1793-1992): las 4 solicitudes de trámite ya se registran en Firestore (colección `tramites`), con listado y cancelación reales | Operativo en demo |
| 2 | Identidad digital federal | Art. 74 LNETB (LlaveMx) | No existe integración de código con Llave MX (confirmado, cero referencias fuera de docs/marketing); la identidad hoy es Firebase Auth (Google OAuth) como puente, documentado así en `docs/orbe/modulos/LLAVE_IDENTIDAD.md` | Hoja de ruta |
| 3 | Protección de datos personales (sector público) | LGPDPPSO | No existe ningún componente ni función llamada `ConsentGate` en el repositorio (grep confirmado, cero resultados) — la referencia se retira de esta fila. Lo real y acotado: un booleano `consentimientoActivo` en `src/services/saludPerfilService.ts`, que gate-a el acceso al expediente de salud únicamente | Operativo parcial (solo módulo de salud) |
| 4 | Interoperabilidad con sistemas federales | LNETB · CURP/RFC/datos.gob.mx | El "Nodo de Transparencia" del C5 (`InteroperabilidadView`, líneas 243-332) es telemetría simulada (endpoints y hashes decorativos), ahora declarada así en la propia UI. `src/services/` no tiene ninguna llamada a un dominio `.gob.mx`. `MunicipalLettersView.tsx` declara explícitamente "Sin conexión" a RENAPO/SAT/PNT | Hoja de ruta (simulado en demo, cero integración real) |
| 5 | Expediente ciudadano único | LNETB | Expediente digital con folio en CitizenApp, respaldado por escritura real en Firestore (`tramites`, `reportes_ciudadanos`) | Operativo en demo |
| 6 | Trazabilidad para fiscalización | ASF / SFP | Registro de operaciones y auditoría en el C5 (`SystemAuditView`, confirmado real contra 5 colecciones de Firestore); el pago con tarjeta sigue siendo simulado, ya declarado como tal en la UI (ver fila 1 y `docs/marco/modulos/payments.md`) | Operativo parcial |
| 7 | Accesibilidad universal | WCAG 2.1 AA (referencia técnica) | Sin evidencia reproducible: no hay configuración de Lighthouse, ni paso de accesibilidad en CI (`.github/workflows/guardia-regresiones.yml`), ni reporte en el repositorio. El propio `docs/contra-auditoria-lnetb-2026-08-11.md` ya señalaba esta misma ausencia de evidencia | Hoja de ruta |
| 8 | Inclusión de lenguas originarias | Derechos lingüísticos de los pueblos indígenas | Selector de 3 saludos (español / náayeri-cora / wixárika) dentro del chat del Asistente IA del panel de **gobierno** (`C5Dashboard.tsx`, `IAView`) — no es un sistema de i18n ni cubre la app ciudadana; la síntesis de voz siempre es es-MX (`useAuraVoice.ts`) | Operativo parcial (alcance mínimo) |
| 9 | Fondos para infraestructura indígena | FAISPIAM | Cero menciones de "FAISPIAM" en el código real de tesorería (`C5Dashboard.tsx`, `TesoreriaView`, líneas 333-425) — la afirmación de integración vivía solo en copy de marketing (`PlatformLanding.tsx`, `StrategicAcademyView.tsx`), ya corregido a "propuesta" en ambos archivos | Hoja de ruta |
| 10 | Seguridad de la información | Buenas prácticas (referencia: cabeceras OWASP) | `netlify.toml` (HSTS, X-Frame-Options, nosniff); llaves solo en servidor; ver `PROTOCOLO_SEGURIDAD.md` | Operativo |
| 11 | Gratuidad y no discriminación del canal digital | LNETB | Portal sin costo ni registro obligatorio para consultar. El pago en efectivo vía OXXO genera una referencia 100% client-side que no se envía a ningún backend todavía; el flujo demo no llega a completar un cobro real | Operativo en demo (referencia no validable por caja/banco) |

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
