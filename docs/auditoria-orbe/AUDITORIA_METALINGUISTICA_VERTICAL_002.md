# Auditoría metalingüística — ORBE → Context.OS Vertical 002

**Fecha:** 2026-08-19  
**Estado:** ingeniería de laboratorio  
**Alcance:** convertir lenguaje ciudadano en intención estructurada sin delegar autoridad ni policy a un LLM.

## 1. Hallazgo central

Antes del Vertical 002, la ruta de voz de la App Ciudadana terminaba directamente en el chat IA. Eso confunde dos clases de interacción que deben mantenerse separadas:

1. **orientación conversacional**: preguntar, explorar, entender;
2. **acto operativo solicitado**: pedir que el sistema prepare o ejecute una acción permitida.

Una frase sobre un trámite o problema público no constituye automáticamente una orden de ejecución.

## 2. Modelo metalingüístico adoptado

El bridge analiza cuatro niveles antes de formar un `IntentEnvelope`.

### 2.1 Nivel locutivo — qué fue dicho

Detecta el objeto semántico explícito. En Vertical 002 sólo existen dos subjects:

- `pothole` — bache/hoyo/pavimento roto;
- `streetlight` — luminaria/lámpara/alumbrado/poste de luz.

Si el objeto no pertenece al dominio registrado, el bridge no inventa un servicio.

### 2.2 Nivel ilocutivo — qué acto realiza la persona al decirlo

Se distinguen:

- `INFORMATION_REQUEST`
- `ACTION_REQUEST`
- `INCIDENT_ASSERTION`
- `AMBIGUOUS`
- `OTHER`

Ejemplos:

| Frase | Acto | Ruta |
|---|---|---|
| “¿Cómo reporto un bache?” | INFORMATION_REQUEST | CHAT |
| “Quiero reportar un bache” | ACTION_REQUEST | CONTEXT.OS |
| “Hay un bache en mi calle” | INCIDENT_ASSERTION | CONFIRM_ACTION |
| “Bache” | AMBIGUOUS | ASK_INTENT |

Regla constitucional: **una afirmación no se convierte en una orden**.

### 2.3 Nivel pragmático — qué presuposiciones son seguras

El sistema no debe inferir silenciosamente:

- que “mi casa” equivale a la dirección registrada del perfil;
- que “aquí” es una geolocalización autorizada;
- que mencionar teléfono/correo implica permiso para compartirlo;
- que describir un problema equivale a querer crear un reporte;
- que el ciudadano conoce la autoridad competente;
- que una intención detectada tiene efectos jurídicos.

### 2.4 Nivel perlocutivo — qué efecto podría producir la interpretación

Cuanto mayor sea el efecto posible, mayor debe ser la exigencia de confirmación, política, consentimiento y autoridad.

En Vertical 002 el efecto máximo permitido es `LAB_MOCK`. Por diseño:

- no se crea orden municipal;
- no se asigna presupuesto;
- no se modifica un padrón;
- no se registra una sanción;
- no se genera un acto administrativo.

## 3. Deixis y contexto

Expresiones como:

- “aquí”;
- “afuera de mi casa”;
- “por mi casa”;

son referencias deícticas que dependen del contexto físico del hablante. El bridge no las transforma en una dirección ni consulta automáticamente el perfil.

Si Context.OS requiere ubicación, ORBE pregunta por un dato concreto.

Esto implementa **minimización por defecto**: no usar un dato personal disponible sólo porque técnicamente puede consultarse.

## 4. Memoria conversacional permitida

El bridge conserva exclusivamente el estado mínimo necesario para cerrar el acto actual:

- `CONFIRM_ACTION`: existe un incidente descrito pero falta voluntad explícita de ejecutar;
- `LOCATION`: existe una solicitud explícita pero falta ubicación concreta.

La siguiente frase se interpreta en función de ese estado.

Ejemplo:

```text
Ciudadano: “Quiero reportar una luminaria que no sirve.”
ORBE:      “Necesito una ubicación concreta.”
Ciudadano: “Avenida Insurgentes esquina con Jacarandas.”
```

La tercera frase no se vuelve a clasificar como una nueva intención; completa el slot pendiente.

## 5. Modalidad epistémica

ORBE debe diferenciar:

- `sé` / evidencia verificada;
- `interpreto` / clasificación semántica;
- `necesito confirmar` / ambigüedad pragmática;
- `no sé` / dato ausente;
- `no puedo` / restricción de política o autoridad.

No debe usar lenguaje de certeza institucional cuando sólo posee inferencia lingüística.

## 6. Modalidad de autoridad

Frases prohibidas en LAB:

- “Tu reporte ya fue enviado al Ayuntamiento.”
- “La cuadrilla ya fue asignada.”
- “El municipio resolverá el bache.”

Frase permitida:

> “Preparé el reporte en modo laboratorio. No es una orden municipal oficial ni produce efectos administrativos.”

El lenguaje de salida forma parte de la seguridad del sistema.

## 7. Arquitectura resultante

```text
VOZ / TEXTO
    |
    v
METALINGUISTIC INTERPRETER
    |-- objeto semántico
    |-- acto de habla
    |-- ambigüedad
    |-- deixis
    |
    +--> CHAT              (información)
    |
    +--> CONFIRMATION      (afirmación sin directiva)
    |
    +--> Context.OS        (directiva explícita)
              |
              v
        Policy / Consent
              |
              v
           Adapter
              |
              v
          Evidence
```

El intérprete no reemplaza a Context.OS. Sólo determina si existe base lingüística suficiente para presentar una solicitud al Control Plane.

## 8. Riesgos detectados

### R1 — Sobre-ejecución por keyword

**Problema:** detectar “bache” y ejecutar.

**Mitigación:** separar objeto semántico de fuerza ilocutiva.

### R2 — Uso implícito de datos personales

**Problema:** resolver “mi casa” usando perfil/domicilio almacenado.

**Mitigación:** deixis no verificable produce `REQUIRE_CLARIFICATION`.

### R3 — LLM como árbitro de autoridad

**Problema:** pedir al modelo que decida si “suena como” una orden válida.

**Mitigación:** routing determinístico antes del LLM.

### R4 — Pérdida de contexto entre turnos

**Problema:** interpretar una dirección de seguimiento como nueva consulta.

**Mitigación:** estado conversacional mínimo tipado.

### R5 — Lenguaje que sobrevende el resultado

**Problema:** una simulación puede parecer operación institucional.

**Mitigación:** respuesta canónica con disclaimer de `LAB_MOCK`.

## 9. Límites de v0.2

Esta capa todavía no resuelve:

- polisemia compleja;
- negación avanzada;
- ironía;
- correferencias largas;
- conversaciones de múltiples servicios simultáneos;
- español/cora/wixárika con equivalencia lingüística validada;
- NLU estadístico o embeddings;
- clasificación de riesgo basada en contenido libre;
- integración institucional real.

No se debe ocultar esta limitación detrás de un LLM.

## 10. Criterio de aceptación del Vertical 002

El vertical se considera funcional en laboratorio cuando:

1. una pregunta informativa nunca alcanza el Runtime;
2. una afirmación de incidente exige confirmación;
3. una solicitud explícita forma `IntentEnvelope`;
4. la ubicación deíctica no se inventa;
5. una aclaración completa el estado pendiente;
6. Context.OS conserva la decisión final de policy;
7. el resultado declara `LAB_MOCK` y `authority=NONE`;
8. la evidencia no almacena payload personal crudo.

## 11. Próxima evolución

Después de cerrar este vertical, la siguiente frontera no es “hacer a ORBE más inteligente” de forma abstracta.

Debe ser crear un **Semantic Contract Registry** versionado:

`utterance -> speech act -> intent -> service -> policy -> evidence`

Eso permitirá añadir servicios sin convertir el código conversacional en una colección de `if/else` y regex imposibles de gobernar.
