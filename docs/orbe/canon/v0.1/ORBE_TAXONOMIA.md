# ORBE_TAXONOMIA.md

## 1. Problema encontrado

El prompt maestro v0.1 mezclaba dos niveles distintos:

- **actos de habla**: pregunta, afirmación de incidente, solicitud de acción;
- **dominios o capacidades**: PAYMENT, HEALTH, PROCEDURE, etc.;
- **mecanismos de salida**: HUMAN_HANDOFF.

Esas categorías no pertenecen a la misma taxonomía. El código nuevo ya corrige gran parte del problema separando acto, ruta, dominio, intent y subject.

## 2. Taxonomía canónica observada

### Nivel A — Speech act
Fuente: `shared/semantic/types.ts:L1-L25`.

- `INFORMATION_REQUEST`
- `INCIDENT_ASSERTION`
- `ACTION_REQUEST`
- `AMBIGUOUS`
- `OTHER`

### Nivel B — Semantic route
Fuente: `shared/semantic/types.ts:L20-L30` y validación en `shared/semantic/registry.ts`.

- `CHAT`
- `CONFIRM_ACTION`
- `ASK_INTENT`
- `CONTEXTOS`

Regla rígida actual:

| Speech act | Ruta |
|---|---|
| `INFORMATION_REQUEST` | `CHAT` |
| `INCIDENT_ASSERTION` | `CONFIRM_ACTION` |
| `ACTION_REQUEST` | `CONTEXTOS` |
| `AMBIGUOUS` | `ASK_INTENT` |
| `OTHER` | `CHAT` |

## 3. Nivel C — Domain

El dominio identifica la familia institucional. Solo uno está verificado como ACTIVE hoy:

- `public_works`

Los dominios futuros deben ser contratos independientes, no enums pegados a la UI.

Candidatos conceptuales, **no declarados como implementados**:

- `payments`
- `procedures`
- `health`
- `education`
- `social_services`
- `civil_registry`
- `business_licensing`
- `human_support`

## 4. Nivel D — Intent name

Intent activo verificado:

- `report_public_infrastructure_issue`

Un intent expresa la operación, no el tema genérico.

Ejemplos futuros correctos de nomenclatura:

- `request_property_tax_balance`
- `start_residency_certificate_guidance`
- `request_human_support`

Estos ejemplos son propuesta de diseño, no estado del repositorio.

## 5. Nivel E — Subject

En el contrato activo:

- `pothole` → runtime `bache`
- `streetlight` → runtime `luminaria`

El subject refina un intent sin crear seis sistemas paralelos.

## 6. Nivel F — Slots

El contrato `publicWorksReport` exige:

- `intent.subject`
- `data.description`
- `data.location`

La ausencia de un slot no debe resolverse con “intuición” de la IA: Context.OS devuelve `REQUIRE_CLARIFICATION` y el bridge conserva el estado.

## 7. Nivel G — Risk

El contrato semántico ya incorpora `riskLevel`:

- `LOW`
- `MEDIUM`
- `HIGH`
- `CRITICAL`

El dominio de obras públicas actual es `LOW`.

Una expansión a salud, identidad, pagos o protección digital debe diseñarse con policies separadas; no debe reutilizar por comodidad la policy de obras públicas.

## 8. Nivel H — Human handoff

`HUMAN_HANDOFF` no debe ser tratado como un dominio equivalente a PAYMENT o HEALTH.

Recomendación canónica:

- modelarlo como **ruta/capability transversal**, por ejemplo `ESCALATE_TO_HUMAN`, o como intent explícito `request_human_support` dentro de un dominio apropiado;
- conservar evidencia de por qué ocurrió la escalación;
- no dejar a la IA decidir si una acción obligatoria se “resuelve” sin humano cuando la policy exija intervención.

## 9. Taxonomía futura propuesta

```text
Utterance
 ├─ speechAct
 ├─ semanticContractId/version
 ├─ domain
 ├─ intent.name
 ├─ subject
 ├─ slots
 ├─ confidence
 └─ riskLevel
       ↓
route
 ├─ CHAT
 ├─ ASK_INTENT
 ├─ CONFIRM_ACTION
 └─ CONTEXTOS
```

## 10. Estado de los seis nombres del prompt v0.1

| Nombre v0.1 | Estado en main | Tratamiento recomendado |
|---|---|---|
| `URBAN_REPORT` | no localizado como enum/intent activo | sustituir conceptualmente por contrato `public_works` / `report_public_infrastructure_issue` |
| `PAYMENT` | no localizado como contrato activo | futuro domain + intents específicos |
| `PROCEDURE` | no localizado como contrato activo | demasiado genérico; dividir por operación |
| `HEALTH` | no localizado como contrato semántico activo ORBE | tratar como domain de mayor riesgo |
| `EDUCATION_SUPPORT` | no localizado como contrato activo | futuro domain/intents |
| `HUMAN_HANDOFF` | no localizado como taxonomía activa | transversal, no peer de los dominios |

## 11. Regla de expansión

No ampliar primero el número de palabras clave. Ampliar primero el número de **contratos versionados** con tests adversariales de:

- pregunta vs acción;
- negación;
- afirmación ambigua;
- referencias deícticas (“aquí”, “mi casa”);
- multi-intención;
- cambio de intención durante una aclaración;
- consentimiento;
- jurisdiction mismatch;
- semantic contract mismatch.
