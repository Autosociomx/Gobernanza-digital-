# ORBE_INVENTARIO.md

**Repositorio auditado:** `Autosociomx/Gobernanza-digital-`  
**Rama:** `main`  
**HEAD observado:** `afb75910bc631d9714fd797cc950550f45f8c7b9` (2026-08-29)  
**Fecha de auditoría:** 2026-09-03  
**Método:** auditoría estática del repositorio conectado a GitHub. No se ejecutaron tests ni se modificó código.

## 1. Resultado de inventario

La versión `main` contiene dos generaciones de ORBE que conviven:

1. **Generación documental / Aura**: `docs/orbe/*`, `CitizenApp.tsx`, `useAuraChat.ts`, `useAuraVoice.ts`. Describe ORBE como núcleo agéntico y ofrece conversación general con IA.
2. **Generación semántica / Context.OS**: `shared/semantic/*`, `src/orbe/*`, `contextos/*`. Implementa una frontera determinista entre conversación y acción institucional de laboratorio.

La segunda generación es más reciente y debe considerarse la referencia técnica para cualquier consolidación.

## 2. Matriz de artefactos

| Artefacto | Tipo | Estado | Rol real | Dependencias / conexión | Clasificación |
|---|---|---|---|---|---|
| `docs/orbe/README.md` | documentación | vigente como mapa | Mapa modular; define `orbe.html`, `cop.html`, `orbe-3d.html` y módulos | `modulos.json`, `docs/orbe/modulos/*` | complementario; no runtime |
| `docs/orbe/orbe.html` | HTML estático | existente | diagrama-espejo de módulos | docs/modulos | referencia visual |
| `docs/orbe/orbe-3d.html` | HTML estático | existente | navegador visual hacia pantallas reales cuando existen | `modulos.json`, rutas web | referencia visual |
| `docs/orbe/cop.html` | HTML estático | existente | herramienta para generar contexto/prompt COP 1.0 | IA opcional | herramienta de desarrollo, no Context.OS |
| `docs/orbe/modulos/ORBE_NUCLEO.md` | documentación | existente | definición conceptual de ORBE/Aura | docs/orbe | conservar, pero alinear al canon técnico |
| `src/components/CitizenApp.tsx` | frontend React | activo | portal ciudadano; contiene experiencia Aura general | `useAuraChat`, `useAuraVoice` | vigente, no canon semántico |
| `src/hooks/useAuraChat.ts` | hook frontend | activo | cliente de `/api/ai/chat`; contexto de página como texto | `server.ts` | IA opcional / orientación |
| `src/hooks/useAuraVoice.ts` | hook frontend | activo | voz compartida | Web Speech / navegador | reutilizable por ORBE |
| `src/components/orbe/OrbeCitizen.tsx` | frontend React | activo bajo piloto | UI push-to-talk desacoplada del motor | callbacks del hook | canónico Experience Plane |
| `src/components/orbe/OrbeContextPilot.tsx` | frontend React | activo con feature flag | superficie del piloto ORBE + Context.OS | `useOrbeContextPilot`, runtime client | canónico para demo LAB |
| `src/hooks/useOrbeContextPilot.ts` | hook frontend | activo con feature flag | une voz/texto con `processCitizenUtterance()` | bridge + runtime client | canónico para demo LAB |
| `src/orbe/metalinguistics.ts` | lógica TS | activo | normalización, interpretación de acto de habla y construcción de `IntentEnvelope` | registro semántico + contracts Context.OS | **canon ORBE** |
| `src/orbe/contextosBridge.ts` | lógica TS | activo | máquina de estados CHAT/CLARIFY/RUNTIME/CANCELLED/ERROR | metalingüística + Context.OS executor | **canon ORBE→Context.OS** |
| `src/orbe/__tests__/contextosBridge.test.ts` | tests | existente | especifica frontera pregunta / aseveración / acción | runtime LAB | evidencia ejecutable de intención del diseño |
| `shared/semantic/types.ts` | contrato TS | activo | taxonomía de actos de habla, rutas y contrato semántico | Context.OS `RiskLevel` | **canon semántico** |
| `shared/semantic/registry.ts` | runtime TS | activo | registro y validación de contratos semánticos | contracts semánticos | **canon semántico** |
| `shared/semantic/contracts/publicWorksReport.ts` | contrato TS | ACTIVE v0.1.0 | único contrato semántico activo verificado | registry + service catalog | **canon de dominio actual** |
| `contextos/contracts.ts` | contrato TS | activo | `IntentEnvelope`, decisiones, consent, evidence, runtime response | todo Context.OS | **canon de frontera** |
| `contextos/policyEngine.ts` | política | activo v0.2 | jurisdicción, propósito, campos, subjects, consentimiento, binding semántico | service catalog | **canon de autorización** |
| `contextos/runtime.ts` | runtime | activo LAB | valida, resuelve servicio, aplica policy, consentimiento, idempotencia, adapter, evidencia | adapters/evidence/catalog | **canon Control Plane** |
| `contextos/serviceCatalog.ts` | catálogo | activo | registra un servicio de obras públicas | semantic contract | canónico, cobertura limitada |
| `contextos/adapters/publicWorksReportAdapter.ts` | adapter | activo | acepta solo `LAB_MOCK`, bache/luminaria | service descriptor | LAB, no institucional |
| `contextos/evidence.ts` | evidencia | activo | registro minimizado + SHA-256 | canonical hash | vigente; `CHECKSUM_ONLY` |
| `contextos/labServer.ts` | servidor Express | activo local | `/api/contextos/v0.1/health`, `/api/contextos/v0.1/execute` | runtime factory | LAB local |
| `src/services/contextosRuntimeClient.ts` | cliente HTTP | activo bajo flag | llama `/api/contextos/v0.1/execute`; valida shape de respuesta | LAB server | canónico cliente Context.OS |
| `src/App.tsx` | router frontend | activo | monta `CitizenApp` + `OrbeContextPilot` en vista ciudadana | feature flag interno del pilot | prueba de alcanzabilidad |
| `.env.example` | configuración | vigente | puente apagado por defecto; runtime en loopback | Vite + lab server | brecha de despliegue |
| `docs/auditoria-orbe/*` | auditorías históricas | 2026-08-14 aprox. | fotografía previa de madurez y correcciones | código anterior | evidencia histórica; revisar antes de citar como estado actual |
| `ORBE_SYSTEM_PROMPT.md` | referido por prompt v0.1 | **no localizado en main** | — | — | no verificable / referencia desactualizada |
| `/api/v1/orbe/route` | referido por prompt v0.1 | **no localizado en main** | — | — | sustituido de facto por `/api/contextos/v0.1/execute` |
| `URBAN_REPORT`, `PAYMENT`, `PROCEDURE`, `HEALTH`, `EDUCATION_SUPPORT`, `HUMAN_HANDOFF` | taxonomía referida por prompt v0.1 | **no localizada como taxonomía activa** | — | — | no usar como canon sin recuperar su fuente |

## 3. Evidencia por rutas inspeccionadas

Rangos de referencia del `main` auditado:

- `src/orbe/metalinguistics.ts:L1-L240`: interpretación semántica, extracción de ubicación y `IntentEnvelope`.
- `src/orbe/contextosBridge.ts:L1-L180`: máquina de estados conversación → Context.OS.
- `shared/semantic/types.ts:L1-L90`: actos de habla y rutas.
- `shared/semantic/registry.ts:L1-L150`: validación del registro y vínculo acto→ruta.
- `shared/semantic/contracts/publicWorksReport.ts:L1-L130`: contrato activo de obras públicas.
- `contextos/contracts.ts:L1-L170`: contrato de frontera completo.
- `contextos/policyEngine.ts:L1-L180`: decisiones y binding semántico.
- `contextos/runtime.ts:L1-L330`: validación, idempotencia, policy, adapter y evidencia.
- `contextos/serviceCatalog.ts:L1-L65`: único servicio registrado y `LAB_MOCK`.
- `contextos/adapters/publicWorksReportAdapter.ts:L1-L75`: bloqueo explícito fuera de laboratorio.
- `contextos/evidence.ts:L1-L80`: `CHECKSUM_ONLY`, SHA-256 y minimización.
- `src/services/contextosRuntimeClient.ts:L1-L90`: endpoint real y feature flag.
- `contextos/labServer.ts:L1-L70`: servidor local y `authority: NONE`.
- `src/App.tsx:L1-L105`: montaje del piloto en vista ciudadana.
- `src/hooks/useAuraChat.ts:L1-L90`: conversación IA independiente de Context.OS.
- `docs/orbe/README.md:L1-L125`: mapa conceptual y naturaleza de los HTML.

## 4. Fecha / evolución relevante

- Las auditorías antiguas de `docs/auditoria-orbe/*` están fechadas alrededor del **14 de agosto de 2026**.
- `src/orbe/metalinguistics.ts` recibió cambios el **20 de agosto de 2026**, incluyendo commits con mensajes `align ORBE semantics and confirmations with runtime` y `route ORBE through hardened semantic registry`.
- El `main` observado cierra en `afb75910...` del **29 de agosto de 2026**.

Esto explica por qué parte de la documentación de auditoría y el prompt maestro v0.1 ya describen una fotografía anterior al canon semántico actualmente presente.

## 5. Hallazgos de duplicación y contradicción

### D1. Dos superficies conversacionales
`CitizenApp` usa Aura (`useAuraChat`) para conversación general y `App.tsx` monta además `OrbeContextPilot` cuando el feature flag está activo. Esto puede producir dos superficies de conversación con semánticas distintas.

**Decisión recomendada:** no eliminar ninguna todavía; declarar roles:
- Aura = conversación/IA opcional.
- ORBE = experiencia ciudadana + frontera semántica de acción.

### D2. Documentación dice “núcleo agéntico”; código nuevo desacopla autoridad
`docs/orbe/README.md` todavía presenta ORBE/Aura como núcleo agéntico. El componente `OrbeCitizen.tsx`, en cambio, declara explícitamente que no conoce Gemini, Firebase, trámites ni Context.OS y recibe callbacks.

**Decisión recomendada:** actualizar la descripción conceptual, no el código.

### D3. Seis intenciones antiguas vs un contrato semántico activo
El prompt v0.1 afirma seis intenciones. En el registro semántico actual solo existe un contrato ACTIVE: `report_public_infrastructure_issue`, con dos subjects: `bache` y `luminaria`.

**Decisión recomendada:** el registry es fuente de verdad. Los seis nombres históricos no deben reaparecer como “implementados”.

### D4. Endpoint antiguo vs endpoint actual
No se encontró `/api/v1/orbe/route`. El cliente vigente usa `/api/contextos/v0.1/execute`.

### D5. “Fallback local” no equivale a ejecución local segura
`useAuraChat` tiene fallback conversacional cuando el backend falla. El puente ORBE→Context.OS no ejecuta localmente si Context.OS está caído; retorna error seguro. Esa diferencia debe conservarse: no conviene inventar ejecución offline para acciones.

## 6. Conclusión de inventario

El repositorio ya contiene un **vertical slice coherente** de ORBE → Context.OS para reportes de bache/luminaria. La consolidación no requiere reescribirlo. Requiere declarar ese slice como canon, degradar la documentación antigua a referencia/histórico donde corresponda y evitar que Aura o los HTML sean interpretados como motores de autorización.
