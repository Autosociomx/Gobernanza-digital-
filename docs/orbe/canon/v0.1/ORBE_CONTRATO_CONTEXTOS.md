# ORBE_CONTRATO_CONTEXTOS.md

## 1. Frontera canónica

El contrato real está definido en `contextos/contracts.ts:L1-L170`. ORBE no entrega texto libre a un “agente de gobierno”; entrega un `IntentEnvelope` versionado.

## 2. Request mínimo

```ts
interface IntentEnvelope {
  schemaVersion: 'contextos.v0.1';
  requestId: string;
  occurredAt: string;
  channel: 'orbe' | 'web' | 'api';
  actor: {
    type: 'citizen';
    subjectId?: string;
    authenticated?: boolean;
  };
  jurisdiction: {
    country: 'MX';
    state: string;
    municipality: string;
  };
  intent: {
    name: string;
    subject?: string;
    confidence?: number;
    semanticContractId?: string;
    semanticContractVersion?: string;
    semanticRegistryVersion?: string;
  };
  purpose: string;
  data: {
    description?: string;
    location?: { lat?: number; lng?: number; address?: string; landmark?: string };
    contact?: { name?: string; phone?: string; email?: string };
  };
}
```

Para canal `orbe`, la policy exige el binding semántico completo cuando corresponde al servicio registrado.

## 3. Campos que ORBE puede producir

Fuente principal: `src/orbe/metalinguistics.ts:L1-L240`.

- `schemaVersion`
- `requestId`
- `occurredAt`
- `channel = orbe`
- `actor.type = citizen`
- `actor.subjectId` y `authenticated` solo si vienen del contexto confiable de sesión
- `jurisdiction`, tomada del contrato semántico activo
- `intent.name`
- `intent.subject`
- `intent.confidence`
- `semanticContractId`
- `semanticContractVersion`
- `semanticRegistryVersion`
- `purpose`
- `data.description`
- `data.location` cuando se obtiene de la expresión o aclaración

## 4. Campos que ORBE NO debe inventar

- identidad verificada;
- autenticación;
- consentimiento válido;
- `policyVersion`;
- `evidenceId`;
- hash;
- autoridad institucional;
- `executionMode`;
- `externalReference` institucional;
- resolución oficial.

## 5. Decisiones de Context.OS

Fuente: `contextos/contracts.ts` + `contextos/policyEngine.ts:L1-L180`.

- `ALLOW`
- `DENY`
- `REQUIRE_CLARIFICATION`
- `REQUIRE_CONSENT`

El runtime las traduce a estados de respuesta:

| Policy | Runtime status típico | Acción de ORBE |
|---|---|---|
| `ALLOW` + adapter acepta | `EXECUTED` | informar resultado y carácter LAB/SANDBOX/INSTITUTIONAL |
| `REQUIRE_CLARIFICATION` | `NEEDS_INPUT` | pedir únicamente los campos faltantes |
| `REQUIRE_CONSENT` sin grant válido | `NEEDS_CONSENT` | explicar alcance y solicitar/derivar a mecanismo de consentimiento |
| `DENY` | `DENIED` | informar que no se ejecutó |
| fallo adapter/runtime | `ERROR` | mensaje seguro; no afirmar ejecución |

## 6. Responsabilidades ORBE

1. Interpretar el acto de habla.
2. Evitar convertir información o aseveraciones en acción.
3. Pedir confirmación explícita cuando haga falta.
4. Recolectar aclaraciones semánticas/datos mínimos.
5. Mantener correlation/request id durante la continuación.
6. Enviar un envelope versionado.
7. Presentar el resultado de Context.OS sin elevar su autoridad.

## 7. Responsabilidades Context.OS

1. Validación básica del envelope.
2. Resolución de `ServiceDescriptor`.
3. Jurisdicción permitida.
4. Purpose permitido.
5. Binding de contrato/versión/registry.
6. Campos obligatorios.
7. Subjects permitidos.
8. Consentimiento.
9. Idempotencia.
10. Selección y ejecución de adapter.
11. Evidencia.

## 8. Consentimiento: brecha concreta

La policy soporta `REQUIRE_CONSENT` y el runtime valida un `ConsentGrant`. Sin embargo, `BridgePendingState` actualmente solo representa:

- `CONFIRM_ACTION`
- `LOCATION`

No existe un estado de continuación `CONSENT` en el bridge auditado. Por tanto:

- el sistema sabe **detectar** que se requiere consentimiento;
- el contrato sabe **validarlo**;
- la UI/bridge todavía no muestra un flujo completo para emitir/adjuntar el grant y reintentar la misma intención.

Esto es una brecha P1, no un fallo del vertical slice actual, porque el constructor de ORBE no inserta contacto por defecto.

## 9. Evidencia

`contextos/evidence.ts:L1-L80` produce un `EvidenceRecord` con:

- `evidenceId`;
- `correlationId`;
- `createdAt`;
- `eventType`;
- procedencia semántica;
- decisión y `policyVersion`;
- resultado del adapter cuando existe;
- minimización declarada;
- `integrityAssurance = CHECKSUM_ONLY`;
- `sha256`.

Incluso las respuestas policy-only generan evidencia.

## 10. Execution modes

El contrato contempla:

- `LAB_MOCK`
- `SANDBOX`
- `INSTITUTIONAL`

El único servicio registrado verificado usa `LAB_MOCK`, y su adapter rechaza cualquier modo distinto. Es una barrera correcta, no una carencia a “saltarse”.

## 11. Endpoint real

El cliente vigente llama:

`POST /api/contextos/v0.1/execute`

No se encontró `/api/v1/orbe/route` en `main`.

## 12. Regla de seguridad para IA

Una IA generativa puede proponer una interpretación o una respuesta informativa, pero un resultado de modelo nunca sustituye:

- semantic contract versionado;
- policy evaluation;
- consentimiento;
- service descriptor;
- adapter mode;
- evidence record.
