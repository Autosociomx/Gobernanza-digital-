# Aura vs ORBE — convención operativa P0

**Estado:** vigente para ORBE P0 v0.2.  
**Base:** canon congelado en `docs/orbe/canon/v0.1/`.

## Regla corta

> **Aura orienta. ORBE encuadra una posible acción. Context.OS autoriza o rechaza. El adapter ejecuta dentro de su modo. Evidence registra.**

## Aura

Aura es una capacidad conversacional generativa opcional.

Puede:
- explicar;
- orientar;
- resumir información;
- conversar con contexto de página;
- ayudar al ciudadano a comprender opciones.

No puede:
- autorizar una acción institucional;
- decidir una policy;
- emitir un consentimiento válido;
- producir un `policyVersion` con autoridad;
- emitir un `evidenceId` válido de Context.OS;
- ejecutar un adapter;
- declarar que una acción administrativa fue realizada.

La implementación conversacional actual vive principalmente en `src/hooks/useAuraChat.ts` y `/api/ai/chat`. Ese canal es reemplazable y no forma parte de la frontera de autoridad de ORBE.

## ORBE

ORBE es la interfaz ciudadana y frontera semántica que decide si una expresión debe permanecer como orientación, requerir aclaración o confirmación, o convertirse en un `IntentEnvelope` para Context.OS.

Puede:
- aceptar voz o texto;
- clasificar mediante el registro semántico nativo;
- mantener estado de aclaración;
- impedir que preguntas o aseveraciones se conviertan en acción automática;
- entregar un `IntentEnvelope` versionado a Context.OS;
- presentar la respuesta y la evidencia devuelta por Context.OS.

No puede:
- autodeclarar autoridad institucional;
- saltarse policy o consentimiento;
- inventar identidad autenticada;
- sustituir el resultado del runtime por una inferencia de modelo.

## Context.OS

Context.OS sigue siendo la frontera de control. Evalúa jurisdicción, purpose, binding semántico, campos mínimos, consentimiento e idempotencia, selecciona el servicio/adaptador y produce evidencia.

En P0 el único modo permitido es `LAB_MOCK` y la autoridad declarada es `NONE`.

## Convención visible en la interfaz

La superficie ORBE debe mostrar permanentemente:

- `ORBE · acción trazable · Context.OS`;
- que Aura es orientación/conversación;
- `LAB_MOCK`;
- `authority: NONE`;
- que no existe efecto administrativo;
- que cualquier folio o evidencia es exclusivamente de laboratorio y no constituye resolución oficial.

Cuando Context.OS devuelve evidencia, ORBE muestra un recibo con `evidenceId`, SHA-256, policy version, estado y, cuando existe, folio LAB.

## Independencia de proveedor

El vertical slice ORBE → Context.OS no requiere `/api/ai/chat` ni `GEMINI_API_KEY` para interpretar y ejecutar el contrato semántico de obras públicas.

La clasificación de pregunta, aseveración, acción y ambigüedad vive en `shared/semantic/*` + `src/orbe/*`. El runtime vive en `contextos/*`.

Por tanto, una caída de Aura puede degradar la orientación generativa, pero no debe impedir que ORBE continúe el flujo nativo bache/luminaria mientras Context.OS esté disponible.

## Verificación P0

La suite `npm run test:orbe-p0-e2e` se ejecuta sin proveedor generativo y prueba por HTTP el bridge, `labServer`, runtime, policy, adapter y Evidence. El build del frontend también se realiza sin que una llave Gemini viaje al bundle.

Esto prueba independencia del proveedor para el vertical slice P0. No equivale a afirmar que toda la aplicación ciudadana sea independiente de todos los servicios externos.
