# ORBE_CANON.md

**Estado:** propuesta canónica derivada del `main` auditado, sin modificar código.

## 1. Definición canónica

> **ORBE es el Experience Plane ciudadano y la frontera semántica que transforma una expresión humana en orientación, aclaración, confirmación o una intención estructurada. ORBE no autoriza ni ejecuta actos institucionales. Cuando existe una solicitud explícita de acción, entrega un `IntentEnvelope` a Context.OS. Context.OS decide política, consentimiento, ejecución y evidencia. La IA generativa es opcional y reemplazable.**

Esta definición respeta la regla: **Native first, AI optional, provider replaceable, evidence mandatory.**

## 2. Qué SÍ es canónico

### 2.1 Experience Plane
- `src/components/orbe/OrbeCitizen.tsx:L1-L105`
- `src/components/orbe/OrbeContextPilot.tsx:L1-L85`
- `src/hooks/useOrbeContextPilot.ts:L1-L80`

Responsabilidad:
- voz/texto;
- estados visibles listening/thinking/speaking/error;
- presentar aclaraciones y resultados;
- no conocer proveedores de IA ni reglas de autorización.

### 2.2 Semantic Boundary
- `shared/semantic/types.ts:L1-L90`
- `shared/semantic/registry.ts:L1-L150`
- `shared/semantic/contracts/publicWorksReport.ts:L1-L130`
- `src/orbe/metalinguistics.ts:L1-L240`
- `src/orbe/contextosBridge.ts:L1-L180`

Responsabilidad:
- normalizar texto;
- identificar tema/subject;
- distinguir acto de habla;
- pedir aclaración cuando el acto es ambiguo;
- pedir confirmación cuando existe incidente pero no solicitud explícita;
- construir el `IntentEnvelope` únicamente cuando corresponde;
- mantener continuidad de conversación para datos faltantes.

### 2.3 Context Control Plane
- `contextos/contracts.ts:L1-L170`
- `contextos/policyEngine.ts:L1-L180`
- `contextos/runtime.ts:L1-L330`
- `contextos/serviceCatalog.ts:L1-L65`
- `contextos/consent.ts`
- `contextos/evidence.ts:L1-L80`
- `contextos/adapters/*`

Responsabilidad:
- validar schema;
- resolver servicio;
- validar jurisdicción y propósito;
- exigir binding semántico a ORBE;
- decidir `ALLOW`, `DENY`, `REQUIRE_CLARIFICATION`, `REQUIRE_CONSENT`;
- validar consentimiento;
- garantizar idempotencia;
- ejecutar el adapter permitido;
- generar evidencia incluso para decisiones sin ejecución.

## 3. Qué NO es canónico como motor ORBE

### `docs/orbe/orbe.html`
Mapa/diagrama. No runtime.

### `docs/orbe/orbe-3d.html`
Navegación visual. No runtime.

### `docs/orbe/cop.html`
Herramienta de generación de contexto para cambios de software. No Context.OS.

### `useAuraChat.ts` + `/api/ai/chat`
Canal de conversación IA. Puede responder y enriquecer orientación, pero no debe producir autorización institucional, consentimientos válidos, `policyVersion`, `evidenceId` ni ejecutar adapters.

### Auditorías de agosto 14
Son evidencia histórica. No deben usarse como fotografía actual sin contrastarlas con `main`.

## 4. Relación ORBE ↔ Aura

La palabra “Aura” ha sido usada como si fuera ORBE completo. El código actual permite una separación mejor:

- **ORBE** = interfaz + semántica + protocolo hacia Context.OS.
- **Aura** = capacidad conversacional generativa opcional.

Aura puede vivir dentro de ORBE como una habilidad de orientación, pero **no es el núcleo de autoridad**.

## 5. Flujo canónico

```text
Ciudadano
  ↓ voz/texto
ORBE Experience Plane
  ↓
Semantic Registry + Metalinguistics
  ├─ INFORMATION_REQUEST → CHAT / orientación
  ├─ INCIDENT_ASSERTION → CONFIRM_ACTION
  ├─ AMBIGUOUS → ASK_INTENT
  └─ ACTION_REQUEST → IntentEnvelope
                         ↓
                      Context.OS
                         ↓
         policy + consent + service + evidence
                         ↓
          LAB_MOCK / SANDBOX / INSTITUTIONAL
```

## 6. Invariantes constitucionales

1. Una pregunta nunca debe convertirse en acción.
2. Una aseveración de incidente nunca debe convertirse en acción sin confirmación.
3. Una acción ORBE debe llevar procedencia semántica (`contractId`, `contractVersion`, `registryVersion`).
4. Context.OS rechaza el binding semántico incompleto o incompatible.
5. La IA no genera ni valida autoridad institucional.
6. No hay efecto administrativo cuando el modo es `LAB_MOCK`.
7. Cada decisión del runtime produce evidencia estructurada.
8. La carga ciudadana cruda y el contacto personal no se almacenan dentro del registro de evidencia actual.
9. `CHECKSUM_ONLY` es integridad de laboratorio, no firma institucional.
10. El canal de IA puede fallar sin que ORBE invente una ejecución.

## 7. Fuente de verdad por tema

| Tema | Fuente de verdad |
|---|---|
| Actos de habla | `shared/semantic/types.ts` |
| Relación acto → ruta | `shared/semantic/registry.ts` + contrato ACTIVE |
| Dominios/subjects activos | `shared/semantic/contracts/*` registrados en `registry.ts` |
| Envelope ORBE→Context.OS | `contextos/contracts.ts` |
| Construcción del envelope | `src/orbe/metalinguistics.ts` |
| Estado conversacional | `src/orbe/contextosBridge.ts` |
| Decisiones | `contextos/policyEngine.ts` |
| Servicios ejecutables | `contextos/serviceCatalog.ts` |
| Efecto técnico | adapter seleccionado |
| Evidencia | `contextos/evidence.ts` |
| UI piloto | `OrbeContextPilot.tsx` / `OrbeCitizen.tsx` |
| IA generativa | `useAuraChat.ts` + `/api/ai/chat` |

## 8. Regla para nueva funcionalidad

Una nueva capacidad operativa no debe añadirse como un `if` en `CitizenApp` ni como una instrucción al modelo. Debe ingresar, en orden, como:

1. contrato semántico versionado;
2. registro en el semantic registry;
3. descriptor de servicio en Context.OS;
4. policy y campos mínimos;
5. adapter con execution mode explícito;
6. pruebas de frontera metalingüística y policy;
7. UI/orientación.

Con eso ORBE escala por contratos, no por acumulación de prompts.
