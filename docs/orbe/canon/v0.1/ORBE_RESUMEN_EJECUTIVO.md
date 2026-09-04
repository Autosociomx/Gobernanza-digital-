# ORBE — Resumen ejecutivo de consolidación

**Repositorio:** `Autosociomx/Gobernanza-digital-`  
**Base auditada:** `main` @ `afb75910bc631d9714fd797cc950550f45f8c7b9`  
**Fecha:** 3 de septiembre de 2026

## 1. ¿Cuál debe ser la versión canónica de ORBE?

La versión canónica ya no debe definirse por los HTML de `docs/orbe`, por Aura ni por un prompt del modelo.

Debe definirse por cuatro capas:

1. **Experience Plane:** `OrbeCitizen` + `OrbeContextPilot` + `useOrbeContextPilot`.
2. **Semantic Boundary:** `shared/semantic/*` + `src/orbe/metalinguistics.ts` + `src/orbe/contextosBridge.ts`.
3. **Context Control Plane:** `contextos/contracts.ts`, policy, runtime, service catalog, consent, adapters, evidence.
4. **AI opcional:** `useAuraChat` + `/api/ai/chat`, exclusivamente para conversación/orientación mientras no atraviese la misma frontera de políticas.

En una frase:

> **ORBE escucha y comprende; Context.OS decide; el adapter ejecuta dentro de su modo; Evidence registra; la IA puede ayudar, pero no gobierna.**

## 2. ¿Qué está realmente construido?

Para un vertical slice de **reporte de bache/luminaria en laboratorio**, ya existe:

- UI voz + fallback de texto;
- normalización de lenguaje;
- tres actos de habla operativos más ambigüedad/other;
- confirmación de aseveraciones antes de actuar;
- aclaración de ubicación;
- construcción de `IntentEnvelope` versionado;
- binding semántico contrato/versión/registry;
- Context.OS con cuatro decisiones;
- validación de consentimiento;
- idempotencia por request ID;
- service catalog;
- adapter LAB_MOCK;
- evidencia SHA-256 minimizada;
- servidor HTTP LAB;
- cliente HTTP y feature flag;
- tests del bridge para pregunta, afirmación, acción, negación, ambigüedad y continuidad.

## 3. ¿Qué porcentaje falta?

Un solo porcentaje sería engañoso, así que se separa por objetivo:

| Objetivo | Estimación auditiva |
|---|---:|
| Vertical slice bache/luminaria demostrable en LAB | **≈80–85% construido** |
| ORBE municipal multipropósito | **≈45–55% construido** |
| ORBE institucional con efectos reales | **≈25–35% construido** |

Estas cifras son estimaciones de madurez arquitectónica, no métricas de LOC ni certificaciones.

La diferencia existe porque el núcleo es sólido, pero hoy solo hay un contrato semántico activo y el único adapter está deliberadamente limitado a `LAB_MOCK`.

## 4. Mayor corrección al prompt maestro v0.1

El prompt contiene referencias que no corresponden al `main` actual:

- no se localizó `/api/v1/orbe/route`;
- el endpoint actual es `/api/contextos/v0.1/execute`;
- no se verificó la taxonomía activa de seis nombres `URBAN_REPORT/PAYMENT/...`;
- no se localizó `ORBE_SYSTEM_PROMPT.md`;
- el bridge semántico nuevo apareció y fue endurecido después de varias auditorías del 14 de agosto.

Por tanto, ejecutar el prompt v0.1 sin esta corrección habría producido una “consolidación” basada parcialmente en una versión anterior.

## 5. Brecha mínima de máximo impacto

**Poner el vertical slice actual en un runtime LAB accesible fuera de localhost y probarlo extremo a extremo.**

Hoy:

- el puente está apagado por defecto;
- el runtime URL por defecto es `127.0.0.1:3011`;
- el servidor declara `executionMode: LAB_MOCK` y `authority: NONE`.

Eso es perfecto para una demostración honesta. Solo falta convertirlo en una demo reproducible.

## 6. Decisión recomendada

Congelar temporalmente la arquitectura de ORBE y hacer tres cosas antes de expandir:

1. declarar formalmente el canon descrito arriba;
2. desplegar y probar el slice bache/luminaria;
3. después agregar **un segundo contrato LOW risk**, no seis intents a la vez.

Así el proyecto avanza de “muchos módulos interesantes” a una plataforma verificable donde cada capacidad nueva entra por contrato, policy, adapter y evidencia.
