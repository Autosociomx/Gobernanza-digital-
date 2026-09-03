# ORBE_BRECHAS.md

## Resumen

El repositorio no está en fase “crear ORBE desde cero”. Está en fase **hacer reproducible y consolidar un vertical slice ya coherente**.

## P0 — bloqueos para una demo en vivo reproducible

### P0.1 Runtime solo local / puente apagado por defecto
**Evidencia:** `src/services/contextosRuntimeClient.ts:L1-L90`, `.env.example`.

- `VITE_CONTEXTOS_BRIDGE_ENABLED=false` por defecto.
- URL por defecto `http://127.0.0.1:3011`.
- `contextos/labServer.ts` escucha en loopback por defecto.

**Impacto:** una app pública no puede demostrar el flujo real ORBE→Context.OS sin configuración/despliegue adicional.

**Corrección mínima:** desplegar el runtime LAB en un entorno accesible y configurar explícitamente URL/orígenes/feature flag. Mantener `LAB_MOCK` y `authority: NONE`.

### P0.2 Falta una prueba E2E reproducible del recorrido completo
Hay tests unitarios muy útiles del bridge, pero la auditoría estática no encontró evidencia de un test browser/E2E que pruebe:

`Citizen UI → HTTP client → labServer → ContextOSRuntime → adapter → evidence → UI`.

**Corrección mínima:** un smoke test automatizado del vertical slice, sin expandir dominios.

### P0.3 Ambigüedad visible entre Aura y ORBE
`CitizenApp` ya tiene una experiencia Aura y `App.tsx` puede montar además el piloto ORBE.

**Impacto:** el usuario puede ver dos “asistentes” y no saber cuál orienta y cuál inicia una acción.

**Corrección mínima:** una convención UI/documental clara. No hace falta borrar código todavía.

## P1 — brechas funcionales importantes

### P1.1 Continuación de consentimiento incompleta en el bridge
Context.OS detecta y valida consentimiento, pero `contextosBridge.ts` no conserva un estado `CONSENT` ni adjunta un `ConsentGrant` en una continuación.

### P1.2 Cobertura semántica de un solo servicio
El registry y service catalog contienen únicamente obras públicas: bache/luminaria.

**No corregir creando seis enums.** El siguiente paso correcto es un segundo contrato LOW risk con sus tests y policy.

### P1.3 Recibo de evidencia poco visible al ciudadano
El response incluye `evidence`, pero el mensaje ciudadano prioriza el folio de laboratorio. No existe, en el piloto auditado, una vista explícita del `evidenceId`, policy version y hash.

### P1.4 Multi-intención
La selección actual encuentra un subject/contract y acto de habla. No se verificó una política explícita para una frase con dos operaciones incompatibles o dos dominios simultáneos.

## P2 — madurez técnica / institucional

### P2.1 `CHECKSUM_ONLY`
SHA-256 detecta alteración del registro, pero no demuestra por sí solo firma, custodia externa, no repudio ni anclaje temporal institucional.

### P2.2 Adapter solo `LAB_MOCK`
Correcto para el estado actual. El siguiente escalón debe ser `SANDBOX`, no `INSTITUTIONAL` directo.

### P2.3 Identidad y autenticación institucional
`subjectId`/`authenticated` existen en el envelope, pero ORBE no debe autodeclararlos. Para efectos reales se necesita un proveedor de identidad institucional y vínculo de sesión confiable.

### P2.4 Auditoría operacional
Faltan, para producción, observabilidad, retention, reglas de acceso, rotación de claves, threat model y procedimientos de incidente adecuados al runtime real.

## P3 — deuda documental

### P3.1 Endpoint desactualizado en el prompt maestro
`/api/v1/orbe/route` no corresponde al `main` auditado.

### P3.2 Taxonomía de seis intenciones no verificable
Los nombres `URBAN_REPORT`, `PAYMENT`, `PROCEDURE`, `HEALTH`, `EDUCATION_SUPPORT`, `HUMAN_HANDOFF` no forman el registro activo actual.

### P3.3 `ORBE_SYSTEM_PROMPT.md` no localizado
Debe eliminarse de listas de “artefactos conocidos” o recuperarse desde su branch/commit original antes de atribuirle autoridad.

### P3.4 Auditorías de agosto 14 son históricas
Conservarlas, pero marcarlas como snapshot. El semantic registry de agosto 20 cambió la arquitectura materialmente.

## La brecha más pequeña que más valor aporta

**Desplegar el vertical slice actual en un runtime LAB accesible y reproducible, habilitar el feature flag y demostrar un caso bache/luminaria extremo a extremo con evidencia.**

Por qué:

1. no requiere inventar nueva arquitectura;
2. valida que ORBE y Context.OS realmente se hablen fuera del entorno local;
3. produce una demo institucionalmente honesta;
4. crea una base para agregar contratos uno por uno;
5. revela problemas de CORS, deployment, correlation, UI y evidence sin mezclar otros dominios.

## Orden recomendado

1. **P0 deployment LAB + smoke E2E.**
2. **P0 unificación de lenguaje/UI Aura vs ORBE.**
3. **P1 evidencia visible.**
4. **P1 flujo de consentimiento completo.**
5. **P1 segundo contrato semántico LOW risk.**
6. **P2 adapter SANDBOX.**
7. **P2 identidad institucional.**
8. **P2 firma/anclaje de evidencia según necesidad jurídica.**

## Qué NO hacer ahora

- no integrar otro proveedor de IA como prioridad;
- no convertir Aura en autorizador;
- no saltar de `LAB_MOCK` a producción;
- no añadir seis intents en un switch de frontend;
- no refactorizar Evidence OS para “resolver” esta consolidación;
- no borrar documentación histórica sin conservar trazabilidad.
