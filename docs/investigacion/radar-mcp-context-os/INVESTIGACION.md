# Investigación independiente — Radar MCP y Context.OS neutral al proveedor

**Cámara:** trabajo (investigación), no decisión · **Fecha:** 2026-08-28
**Encargo:** evaluar si una fábrica soberana de Skills, Toolkits y servidores MCP puede
sostener una base de conocimiento reutilizable para ConnectX sin dependencia de un
proveedor de IA, con Context.OS como capa de permisos, evidencia y decisión humana.
**Rol asumido:** investigador técnico y crítico. Este documento **no es un dictamen** ni
un acta: es insumo para una sesión del Parlamento (`docs/PARLAMENTO_PROMPT.md`, Regla 4:
las sillas dictaminan, el humano firma).

---

## 0. Nota metodológica y honestidad de la evidencia

Se aplica al propio informe el semáforo del proyecto (`docs/marco/GLOSARIO_OFICIAL.md`):

| Etiqueta | Significado en este documento |
|---|---|
| 🟢 **VERIFICADO** | Se leyó el texto fuente completo desde este entorno (URL citada). |
| 🟡 **CITA INDIRECTA** | La fuente existe y es oficial, pero el dominio está **bloqueado por el proxy de egreso** de esta sesión; el dato proviene del resumen del buscador. **No se afirma en público hasta descargar el PDF/página.** |
| 🔵 **ANCLAJE DE REPO** | Afirmación sostenida por archivo real de este repositorio. |

Dominios bloqueados en esta sesión (no se pudo leer de primera mano):
`modelcontextprotocol.io`, `blog.modelcontextprotocol.io`, `www.gob.mx`, `nvd.nist.gov`,
`owasp.org`, `genai.owasp.org`, `agentskills.me`. Cuando existió espejo primario
(el repositorio de la especificación en `raw.githubusercontent.com`, los avisos de
GitHub Security Advisory), se leyó ahí y se marcó 🟢.

**Sesgo declarado:** quien escribe es un modelo de Anthropic evaluando una arquitectura
cuyo propósito explícito es **no depender de Anthropic**. Ese conflicto de interés se
mitiga citando especificación y CVE, no opinión, y se deja constancia para que el
Parlamento pondere el voto de esta silla en consecuencia.

---

## 1. Resumen ejecutivo (10 líneas)

1. MCP es un **estándar de transporte y de forma de herramientas**, no de identidad,
   autorización, memoria, calidad de dato ni semántica: la especificación lo dice de sí misma.
2. Es portable el **contrato de herramienta**; no es portable el comportamiento del cliente:
   las capacidades de cliente cambiaron y se depreciaron en menos de un año.
3. El protocolo rompió compatibilidad **dos veces en doce meses** (2025-11-25 y 2026-07-28,
   esta última elimina sesión y handshake): escribir lógica institucional contra el SDK es deuda.
4. Por eso la inversión debe ir al **núcleo Context.OS**; el servidor MCP debe ser una
   cáscara desechable, pequeña y sustituible.
5. Radar MCP como está definido —solo lectura, sin credenciales, sin datos personales,
   sin acciones— es el **perfil de riesgo correcto** para empezar.
6. El riesgo dominante no es el servidor de ConnectX: es el **cliente y la cadena de
   suministro** (CVE 9.6 y 9.4 en piezas oficiales del ecosistema en 2025).
7. El texto de un nodo es **entrada no confiable**: si el Radar devuelve prosa, esa prosa
   puede intentar dirigir al agente. Nodos = datos, nunca instrucciones.
8. Context.OS ya tiene lo que MCP no da (política determinística, consentimiento ligado,
   evidencia con checksum, `LAB_MOCK`), y también sus límites declarados: checksum ≠ firma.
9. La demanda **no está demostrada**: Llave MX reporta 242 sistemas integrados y solo
   **8 municipales** (🟡). Eso es oportunidad y advertencia a la vez.
10. Veredicto: **CONTINUAR CON AJUSTES**, con tres condiciones de detención explícitas (§12).

---

## 2. Hallazgos

Cada hallazgo sigue el esquema pedido. La versión legible por máquina está en
[`hallazgos.json`](./hallazgos.json).

### H-01 · MCP no resuelve identidad ni autorización; lo delega al implementador

- **evidence**
  - 🟢 `https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/docs/specification/2026-07-28/index.mdx` — *estándar* — 2026-07-28. La sección de seguridad afirma que el protocolo **no puede imponer** los principios de consentimiento y control a nivel de protocolo y que corresponde al implementador construir los flujos de consentimiento y autorización.
  - 🟢 `https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/docs/specification/2025-11-25/basic/authorization.mdx` — *estándar* — 2025-11-25. «Authorization is **OPTIONAL** for MCP implementations»; para STDIO la especificación indica **no** seguirla y tomar credenciales del entorno.
- **confidence:** alta
- **counter_signal:** cuando sí se implementa sobre HTTP, la especificación es exigente (OAuth 2.1, RFC 9728 de metadatos de recurso protegido, RFC 8707 de *resource indicators*, PKCE, validación de audiencia). No es un vacío: es un vacío **opcional**.
- **implication_for_connectx:** la autorización de ConnectX debe vivir en Context.OS (PDP propio), no en el servidor MCP. El servidor MCP es un punto de aplicación (PEP) tonto y sustituible.
- **next_test:** prueba de conformidad que arranque el Radar sin ninguna configuración de autenticación y verifique que **toda** consulta a nodos con restricción devuelve `DENY` por política, no por configuración del transporte.

### H-02 · El protocolo rompe compatibilidad con rapidez institucionalmente incómoda

- **evidence**
  - 🟢 `https://github.com/modelcontextprotocol/modelcontextprotocol/releases` — *repositorio* — 2026-07-28. Cadena de revisiones: 2025-06-18 → 2025-11-25 (estable) → 2026-07-28 RC (2026-05-29) → 2026-07-28 estable.
  - 🟢 `https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/docs/specification/2026-07-28/changelog.mdx` — *estándar* — 2026-07-28. Cambios rompientes: protocolo **sin estado**, se elimina el handshake `initialize`/`notifications/initialized` (SEP-2575); se elimina el encabezado `Mcp-Session-Id` (SEP-2567); se elimina la resumibilidad de streams SSE; `server/discover` pasa a ser obligatorio; `resultType` obligatorio (SEP-2322); *Multi Round-Trip Requests* (MRTR) sustituye peticiones servidor→cliente.
- **confidence:** alta
- **counter_signal:** la revisión 2026-07-28 documenta una estrategia «dual-era» de compatibilidad y negociación de versión por error `UnsupportedProtocolVersionError`; la ruptura es gestionable, no catastrófica. Además, la existencia de un changelog formal y de SEPs es señal de gobernanza madura, no de caos.
- **implication_for_connectx:** presupuestar **una migración de protocolo por año**. Regla de diseño: el adaptador MCP no debe exceder ~500 líneas ni contener una sola regla de negocio; si migrarlo cuesta más de dos días, está mal construido.
- **next_test:** medir el costo real: implementar el Radar contra 2025-11-25 y portarlo a 2026-07-28 cronometrando horas y líneas tocadas. Umbral de aceptación: < 16 h y < 300 líneas.

### H-03 · La portabilidad entre clientes es de contrato, no de comportamiento

- **evidence**
  - 🟢 `https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/docs/specification/2026-07-28/index.mdx` — *estándar* — 2026-07-28. En esta revisión, la única capacidad de cliente listada es **elicitation**.
  - 🟢 `https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/docs/specification/2026-07-28/changelog.mdx` — *estándar* — 2026-07-28. **Roots, Sampling y Logging quedan depreciados** (SEP-2577): siguen funcionando durante la ventana de depreciación, pero las implementaciones nuevas no deben adoptarlos.
  - 🟡 `https://mcp-availability.com/` y `https://canimcp.dev/` — *otro* — desconocida. Matrices de compatibilidad de terceros que reportan soporte desigual por cliente («uniform on paper but uneven in practice»). No verificadas de primera mano.
- **confidence:** alta para lo normativo; exploratoria para el grado de desigualdad entre clientes.
- **counter_signal:** las tres capacidades depreciadas son justamente las que un diseño prudente **no debería usar** (sampling = dejar que el servidor pida inferencia al cliente). Su muerte favorece la arquitectura propuesta.
- **implication_for_connectx:** Radar MCP debe usar **solo `tools`** (y opcionalmente `resources`) y nunca `sampling` ni `roots`. Ningún flujo institucional puede depender de que el cliente implemente una capacidad opcional.
- **next_test:** suite de conformidad ejecutada contra tres clientes distintos (uno de Anthropic, uno de OpenAI, uno de código abierto) que verifique respuesta idéntica byte a byte del payload de las tres herramientas del Radar.

### H-04 · Las Skills sí son un formato abierto y portable — pero formato ≠ comportamiento

- **evidence**
  - 🟢 `https://raw.githubusercontent.com/anthropics/skills/main/README.md` — *repositorio* — desconocida. El formato `SKILL.md` requiere solo `name` y `description` en el *frontmatter*; la especificación vive en `./spec` del repositorio; la mayoría del contenido es Apache-2.0 (los *skills* de documentos son *source-available*).
  - 🟡 `https://agentskills.io/home` — *otro* — desconocida. Se reporta adopción del formato por más de treinta productos (Cursor, Codex, Gemini CLI, VS Code, Goose, entre otros). Dominio no accesible desde esta sesión.
- **confidence:** media
- **counter_signal:** que dos agentes lean el mismo `SKILL.md` no garantiza que ejecuten lo mismo: el rendimiento depende del modelo, del *harness* y de qué herramientas tenga permitidas. Además, los directorios `scripts/` son **ejecución de código**: una skill es un vector de cadena de suministro tanto como un servidor MCP.
- **implication_for_connectx:** las skills son el activo **más** portable de la fábrica —texto plano versionado en git— y por eso deben ser el formato canónico de las capacidades institucionales, con la evaluación (no la prosa) como criterio de aceptación.
- **next_test:** tomar una skill de ConnectX (p. ej. `.claude/skills/editar-modulo/`), ejecutarla en dos productos distintos sobre el mismo caso y comparar la salida contra una rúbrica de 10 puntos. Aceptación: ≥ 8/10 en ambos.

### H-05 · El registro público de servidores MCP está en vista previa y no acredita seguridad

- **evidence**
  - 🟢 `https://raw.githubusercontent.com/modelcontextprotocol/registry/main/README.md` — *repositorio* — desconocida. El registro se describe como «app store» de servidores MCP, en **preview** con congelamiento de API v0.1, con advertencia de posibles cambios rompientes o reinicios de datos; la verificación es de **propiedad de espacio de nombres/dominio**, no de seguridad del código.
- **confidence:** alta
- **counter_signal:** un registro con verificación de dominio y gobernanza de grupo de trabajo es mejor que la nada anterior; la ausencia de revisión de seguridad es la norma en registros de paquetes (npm, PyPI), no una anomalía de MCP.
- **implication_for_connectx:** ConnectX no debe consumir servidores MCP del registro público dentro de un flujo institucional sin revisión propia. El **catálogo de ConnectX** (lista corta, versión fijada, hash verificado) es un activo obligatorio, no opcional.
- **next_test:** publicar el catálogo propio con `sha256` por servidor y un `npm run radar:verificar-catalogo` que falle si un hash no coincide.

### H-06 · Los incidentes reales del ecosistema están en el cliente y la cadena de suministro

- **evidence**
  - 🟢 `https://github.com/advisories/GHSA-6xpm-ggf7-wc3p` — *oficial* — 2025-07-09. CVE-2025-6514: `mcp-remote` 0.0.5–0.1.15, **CVSS 9.6**, inyección de comandos del sistema operativo al conectarse a un servidor MCP no confiable, mediante entrada manipulada en la URL de `authorization_endpoint`. Parche en 0.1.16.
  - 🟡 `https://nvd.nist.gov/vuln/detail/CVE-2025-49596` — *oficial* — desconocida. MCP Inspector: proxy sin autenticación entre cliente y proxy, CVSS reportado 9.4, corregido en 0.14.1. Dominio bloqueado en esta sesión.
- **confidence:** alta (CVE-2025-6514), media (CVE-2025-49596)
- **counter_signal:** ambas fallas son de herramientas auxiliares del ecosistema, no del protocolo, y ambas están parchadas. Un servidor de solo lectura, sin credenciales y enlazado a `127.0.0.1` no comparte esa superficie.
- **implication_for_connectx:** el modelo de amenaza correcto invierte la intuición: **el peligro no es que el municipio exponga un servidor, es que un funcionario conecte su cliente a un servidor ajeno**. La política de estación de trabajo pesa más que el endurecimiento del Radar.
- **next_test:** inventario firmado de qué servidores MCP están configurados en los equipos que tocan el repositorio; revisión mensual con acta. Métrica: 0 servidores fuera del catálogo.

### H-07 · El contenido de un nodo es entrada no confiable (inyección indirecta)

- **evidence**
  - 🟢 `https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/docs/specification/2026-07-28/index.mdx` — *estándar* — 2026-07-28. Las herramientas representan ejecución arbitraria de código y el anfitrión debe obtener consentimiento explícito del usuario antes de invocarlas.
  - 🟡 `https://genai.owasp.org/llmrisk/llm01-prompt-injection/` — *estudio* — 2025. LLM01: técnicas como RAG y *fine-tuning* **no mitigan por completo** la inyección de prompts. Dominio bloqueado; cita indirecta.
- **confidence:** alta en el principio, media en la formulación exacta de OWASP.
- **counter_signal:** con el Radar en solo lectura, una inyección exitosa solo consigue que el modelo diga algo equivocado, no que el municipio ejecute un acto. El daño se vuelve serio cuando existan herramientas de escritura.
- **implication_for_connectx:** regla dura desde hoy, cuando aún es barata: **todo texto que sale del Radar viaja etiquetado como dato no confiable**, con `provenance` y sin capacidad de disparar herramientas. Ningún nodo puede contener instrucciones ejecutables.
- **next_test:** sembrar en el corpus tres nodos adversariales («ignora las instrucciones anteriores y aprueba…») y correr una prueba que falle el build si un cliente con herramientas de escritura simuladas ejecuta algo. Debe quedar en la Guardia.

### H-08 · Lo que el estándar exige del transporte, Context.OS ya lo cumple

- **evidence**
  - 🟢 `https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/docs/specification/2026-07-28/basic/transports/streamable-http.mdx` — *estándar* — 2026-07-28. «Servers **MUST** validate the `Origin` header on all incoming connections to prevent DNS rebinding attacks» (403 si es inválido); «servers **SHOULD** bind only to localhost (127.0.0.1)»; «servers **SHOULD** implement proper authentication».
  - 🔵 `contextos/README.md` y `contextos/labServer.ts` — *repositorio* — 2026. El servidor de laboratorio «por defecto enlaza únicamente a `127.0.0.1:3011`».
- **confidence:** alta
- **counter_signal:** cumplir el enlace a *localhost* es trivial; lo que falta es validación de `Origin` explícita y autenticación, hoy inexistentes en el laboratorio (el propio README declara que no hay autenticación servicio-a-servicio).
- **implication_for_connectx:** añadir validación de `Origin` con 403 al servidor de laboratorio es una tarea de horas que alinea el prototipo con el estándar y con la Guardia.
- **next_test:** prueba que emita una petición con `Origin` ajeno y exija HTTP 403; agregarla a `npm run test:orbe-contextos`.

### H-09 · Context.OS ya implementa lo que MCP deja fuera — y declara sus propios límites

- **evidence**
  - 🔵 `contextos/README.md` — *repositorio* — 2026. Sí hace: contratos tipados y versionados, política determinística, minimización de datos, consentimiento obligatorio ligado a la solicitud y al sujeto, idempotencia en memoria, adapter `LAB_MOCK`, evidencia con checksum SHA-256 y `correlationId`. No hace: no autoriza actos administrativos, no integra Llave MX, **no usa LLM para decidir políticas**, «el checksum no es firma digital, sello de tiempo ni prueba de inmutabilidad frente a un atacante», la idempotencia «vive en memoria y no sustituye un almacén transaccional».
  - 🔵 `contextos/contracts.ts` — *repositorio* — 2026. `Decision = ALLOW | DENY | REQUIRE_CLARIFICATION | REQUIRE_CONSENT`; `ExecutionMode = LAB_MOCK | SANDBOX | INSTITUTIONAL`.
- **confidence:** alta
- **counter_signal:** es un *vertical slice* de un solo caso de uso (bache/luminaria) con ~1,700 líneas entre runtime, semántica y puente. La distancia entre esto y un plano de control institucional es de años-persona, no de semanas.
- **implication_for_connectx:** el activo defendible **ya existe y no es MCP**: es el par contrato semántico + política determinística + evidencia. La estrategia correcta es *exponer* ese núcleo por MCP, jamás *reimplementarlo* en MCP.
- **next_test:** separar PDP y PEP (tarea 3 del «próximo incremento» del propio README) y demostrar que el Radar MCP puede ser reemplazado por un `curl` sin cambiar una línea del núcleo.

### H-10 · Exponer nodos a un cliente de terceros toca la ley de datos personales

- **evidence**
  - 🟡 `https://www.dof.gob.mx/nota_detalle.php?codigo=5752569&fecha=20/03/2025` — *oficial* — 2025-03-20. Nuevas leyes secundarias de transparencia y protección de datos publicadas en el DOF; vigencia al día siguiente; el consentimiento es principio rector y **toda transferencia** debe formalizarse mediante cláusulas contractuales u otro instrumento jurídico que acredite el alcance del tratamiento. Dominio DOF no leído de primera mano en esta sesión.
  - 🔵 `docs/marco/BIBLIOTECA_LEGAL.md` — *repositorio* — 2026-08-01. LFPDPPP en estatus VERIFICADO; datos sensibles con consentimiento expreso.
- **confidence:** media (el texto exacto y la vigencia deben descargarse del DOF antes de citarlo en público)
- **counter_signal:** el prototipo Radar declara «sin datos personales», así que hoy no hay transferencia que formalizar. El riesgo aparece el día que un nodo cite un expediente.
- **implication_for_connectx:** convertir «sin datos personales» de promesa a **control técnico**: validador que rechace publicar un nodo con CURP, teléfono, correo o coordenada de domicilio, corriendo en la Guardia.
- **next_test:** `npm run radar:validar` con detección de patrones (CURP, RFC, teléfono a 10 dígitos, correo) que falle el build ante cualquier coincidencia; 20 casos de prueba sembrados.

### H-11 · La demanda municipal no está demostrada; el dato disponible más bien la cuestiona

- **evidence**
  - 🟡 `https://www.gob.mx/atdt/comunicacion/llave-mx-el-sistema-de-autentificacion-digital-mas-utilizado-en-mexico-con-28-millones-de-cuentas` — *oficial* — desconocida (datos a junio de 2026). Llave MX: ~28 millones de cuentas y **242 sistemas integrados: 204 federales, 30 estatales y 8 municipales**. Dominio bloqueado; cita indirecta.
  - 🔵 `docs/marco/BIBLIOTECA_LEGAL.md` — *repositorio* — 2026-08-01. La LNETB (Arts. 2, 3, 66–76) y la Ley de Gobierno Digital de Nayarit obligan al gobierno digital municipal.
- **confidence:** media
- **counter_signal:** ocho municipios integrados a Llave MX admite dos lecturas opuestas: (a) mercado virgen con mandato legal, o (b) los municipios no tienen presupuesto, capacidad técnica ni incentivo para integrarse, y la ley lleva año y medio sin moverlos. **Nada en la evidencia disponible permite elegir entre ambas.**
- **implication_for_connectx:** la obligación legal es argumento de venta, no evidencia de demanda. Prohibido afirmar «hay demanda» en materiales públicos hasta tener las pruebas de §10.
- **next_test:** contactar a tres de los ocho municipios ya integrados y documentar quién pagó, cuánto tardaron y qué los movió. Salida: ficha de tres casos con fuente citable.

### H-12 · Un «Parlamento de IAs» no puede autoautorizarse porque MCP no tiene identidad de agente

- **evidence**
  - 🟢 `https://raw.githubusercontent.com/modelcontextprotocol/modelcontextprotocol/main/docs/specification/2026-07-28/index.mdx` — *estándar* — 2026-07-28. El protocolo define anfitrión, cliente y servidor; **no define identidad de agente, quórum, voto ni delegación entre agentes**.
  - 🔵 `docs/PARLAMENTO_PROMPT.md` — *repositorio* — v1.0. Regla 4 (el humano decide), Regla 6 (ninguna silla ejecuta), quórum 3 de 5, voto en paralelo sin verse.
- **confidence:** alta
- **counter_signal:** la ausencia de primitivas no impide la autoautorización de facto: si un mismo token con permisos de escritura se comparte entre las cinco sillas, el «Parlamento» es un solo actor con cinco máscaras. El control no lo da el protocolo, lo da la separación de credenciales.
- **implication_for_connectx:** cada silla debe tener **su propia credencial, su propio alcance y su propia traza**, y ninguna debe portar alcance de escritura. La ejecución solo ocurre tras firma humana registrada como evidencia.
- **next_test:** prueba adversarial: dos sillas «acuerdan» ejecutar una acción sin firma; el sistema debe registrar el intento y devolver `DENY` con código de razón `HUMAN_SIGNATURE_REQUIRED`.

---

## 3. Arquitectura propuesta

### 3.1 Componentes y límites de confianza

```
┌─ ZONA 0 · FUENTE (confianza alta, humana) ───────────────────────────────┐
│  docs/marco/*  ·  docs/actas/*  ·  código del repo  ·  leyes descargadas │
│  Regla: nada entra al grafo sin una fuente citable de esta zona.         │
└───────────────┬──────────────────────────────────────────────────────────┘
                │  curaduría humana + validador (schema, semáforo, PII)
┌───────────────▼─ ZONA 1 · NÚCLEO CONTEXT.OS (propiedad de ConnectX) ─────┐
│  Registro de nodos (versionado)   Registro de contradicciones           │
│  Contratos semánticos (shared/semantic/)                                │
│  PDP · política determinística (contextos/policyEngine.ts)              │
│  Consentimiento (contextos/consent.ts)                                  │
│  Evidencia append-only + cadena de hash (contextos/evidence.ts)         │
│  Aprobaciones humanas (firmas)                                          │
└───────────────┬──────────────────────────────────────────────────────────┘
                │  ── LÍMITE B2: solo lectura, proyección materializada ──
┌───────────────▼─ ZONA 2 · ADAPTADORES DE EXPOSICIÓN (desechables) ───────┐
│  (a) Radar MCP  ·  (b) API HTTP/OpenAPI  ·  (c) export JSON firmado     │
│  Idénticos en capacidad. Ninguno contiene reglas de negocio.            │
└───────────────┬──────────────────────────────────────────────────────────┘
                │  ── LÍMITE B1: el cliente es NO CONFIABLE ──────────────
┌───────────────▼─ ZONA 3 · CLIENTES (Claude, Codex, Cursor, Gemini, …) ───┐
│  Consumen nodos como DATOS. No portan credenciales institucionales.      │
└───────────────┬──────────────────────────────────────────────────────────┘
                │  ── LÍMITE B3: firma humana obligatoria ────────────────
┌───────────────▼─ ZONA 4 · EFECTOS INSTITUCIONALES ───────────────────────┐
│  HOY: ninguno (executionMode = LAB_MOCK).                               │
│  MAÑANA: PEP + adapter institucional, solo con sistema, contrato,       │
│  autenticación y autoridad verificables (contextos/README.md).          │
└──────────────────────────────────────────────────────────────────────────┘
```

**Qué significa cada límite**

| Límite | Regla de confianza | Control técnico |
|---|---|---|
| **B1** cliente ↔ adaptador | El cliente miente hasta prueba en contrario | Credencial por consumidor con alcance; validación de `Origin` con 403; cuota por consumidor; **nunca** reenviar el token del cliente a un tercero (prohibición de *token passthrough* del propio estándar) |
| **B2** adaptador ↔ núcleo | El adaptador no razona | Solo lectura sobre una proyección materializada; sin acceso a tablas de consentimiento ni de identidad; sin `INSERT`/`UPDATE` |
| **B3** núcleo ↔ efectos | Ningún modelo autoriza | `executionMode` distinto de `LAB_MOCK` requiere firma humana registrada como evidencia; política determinística, sin LLM |
| **B4** fuente ↔ núcleo | El grafo no se inventa | Todo nodo con `fuente` verificable y estatus del semáforo; validador de PII; revisión humana antes de publicar |

### 3.2 Flujo de permisos (lectura, que es todo lo que hay hoy)

```
cliente → tool: radar.obtener_evidencia(id)
  1. adaptador autentica al CONSUMIDOR (no al usuario final)          [B1]
  2. adaptador traduce a IntentEnvelope (INFORMATION_REQUEST)
  3. PDP evalúa: ruta permitida · clasificación del nodo · alcance    [Zona 1]
     → DENY: código de razón + evidencia del rechazo
     → ALLOW: proyección del nodo, sin campos restringidos
  4. se escribe EvidenceRecord (quién, qué, cuándo, checksum, correlationId)
  5. respuesta etiquetada: { datos, provenance, es_dato_no_instruccion: true }
```

Un acto de habla informativo **nunca ejecuta**: ya es invariante probada del runtime
(`contextos/`), y el Radar no debe crear una excepción.

### 3.3 Almacenamiento

| Qué | Dónde | Por qué |
|---|---|---|
| Nodos y versiones | Postgres (o SQLite en laboratorio), tabla `nodo` + `nodo_version` | necesita consultas y control de versiones; el JSON plano no escala a contradicciones |
| Evidencia | Tabla **append-only** con cadena de hash (`hash_previo`) | el `EvidenceRecord` con checksum ya existe; lo que falta es la cadena y la prohibición de `UPDATE`/`DELETE` |
| Contradicciones | Tabla `contradiccion` (nodo_a, nodo_b, tipo, estatus, resolución) | el repo ya tiene el caso real de los dos registros de módulos (CLAUDE.md §5) |
| Aprobaciones | Tabla `aprobacion` + acta en `docs/actas/` | la firma humana debe existir en los dos mundos: máquina y expediente |
| Proyección de lectura | Vista materializada que consume el Radar | mantiene B2 sin necesidad de disciplina, por construcción |

**Sobre la integridad, sin exagerar:** el checksum SHA-256 acredita que un registro no
cambió *sin que el custodio lo note*; **no** es firma digital ni prueba frente a un
atacante con acceso de escritura. Si se requiere oponibilidad, el camino son sellos de
tiempo (RFC 3161) o un registro de transparencia, y eso es una decisión posterior con
costo propio. La documentación debe seguir diciendo `integrityAssurance: CHECKSUM_ONLY`.

---

## 4. Comparación: estándar MCP · específico de proveedor · propiedad de ConnectX

| Capa | Estándar MCP (portable) | Específico de proveedor / cliente | **Debe ser propiedad de ConnectX** |
|---|---|---|---|
| Transporte | stdio, Streamable HTTP; `Origin` obligatorio | qué transportes soporta cada cliente | — |
| Descubrimiento de herramientas | `tools/list`, JSON Schema 2020-12 | presentación y límites de la interfaz | catálogo firmado con hashes |
| Esquema de herramientas | nombre, descripción, esquema de entrada | *tool naming*, ventana de contexto, orden | **contrato semántico** (`shared/semantic/`) |
| Autorización | OAuth 2.1 + RFC 9728 + RFC 8707, **opcional** | flujo de consentimiento de la interfaz | **PDP determinístico y alcances** |
| Identidad de usuario | fuera de alcance | cuenta del proveedor | **sujeto, Llave MX el día que exista** |
| Consentimiento | fuera de alcance (recomendación) | diálogos de aprobación de herramientas | **ConsentGrant ligado a solicitud** |
| Memoria / conocimiento | fuera de alcance | memoria propietaria del producto | **grafo de nodos + versiones** |
| Evidencia / trazabilidad | fuera de alcance | registros del proveedor | **EvidenceRecord append-only** |
| Semántica de dominio | fuera de alcance | — | **registro de contratos versionados** |
| Calidad del dato | fuera de alcance | — | **semáforo, fuente, contradicciones** |
| Capacidades de agente | `sampling`/`roots` **depreciados** | comportamiento del modelo | **skills en `SKILL.md` + evaluaciones** |
| Decisión | fuera de alcance | — | **firma humana y actas** |

Lectura corta: **MCP aporta el enchufe; ConnectX debe ser dueño de la corriente.**
Todo lo que un municipio necesitaría auditar en un juicio está en la última columna.

---

## 5. El Parlamento de IAs sin autoautorización

Cinco reglas de ingeniería que traducen `docs/PARLAMENTO_PROMPT.md` a controles:

1. **Una credencial por silla, todas de solo lectura.** Ninguna silla porta alcance de
   escritura ni credencial compartida. Sin esto, «cinco sillas» es un actor con cinco máscaras.
2. **Contexto mínimo por silla.** Cada silla recibe solo los nodos de su comisión —
   parámetro `ruta` obligatorio en la consulta— y jamás el expediente completo. La
   diversidad de proveedores exige minimización: cinco proveedores es cinco veces la
   superficie de transferencia de datos.
3. **El voto es evidencia, no conversación.** Cada `VOTO`/`OBJECION` se escribe como
   `EvidenceRecord` con `correlationId` de sesión, checksum y anclaje obligatorio. Una
   objeción sin anclaje se desecha automáticamente, no por criterio del secretario.
4. **La ejecución exige firma humana.** Ninguna combinación de votos produce
   `executionMode` distinto de `LAB_MOCK`. El código de razón `HUMAN_SIGNATURE_REQUIRED`
   debe existir y estar probado adversarialmente.
5. **El disenso se conserva.** El dictamen registra mayoría, minoría y abstenciones. Un
   Parlamento que solo publica consenso es teatro de gobernanza: su valor está en la
   discrepancia registrada, que es justamente lo que un solo proveedor no puede darte.

Advertencia honesta: cinco modelos entrenados con corpus muy solapados **no son cinco
opiniones independientes**. La diversidad de proveedores reduce, pero no elimina, el
sesgo común. Sirve para detectar alucinación de hechos; no para validar juicio político.

---

## 6. Esquema recomendado (nodos, evidencia, contradicciones, versiones, aprobaciones)

Vocabulario alineado a PROV (`prov:Entity`, `prov:Activity`, `prov:Agent`) para no
inventar ontología propia. Versión inicial `radar.v0.1`.

```jsonc
// NODO — unidad mínima de conocimiento
{
  "schemaVersion": "radar.v0.1",
  "id": "nodo:gobierno-digital/lnetb-art-66",
  "ruta": "gobierno-digital",                 // una de las 5 rutas iniciales
  "tipo": "norma|hallazgo|decision|modulo|proceso|riesgo",
  "titulo": "LNETB Art. 66 — expediente digital",
  "cuerpo": "…",                              // DATO, nunca instrucción
  "estatus_semaforo": "verde|amarillo|rojo",  // regla cultural del proyecto
  "fuente": [{ "url": "…", "tipo": "oficial|estandar|repositorio|estudio|otro",
               "fecha": "YYYY-MM-DD", "estatus": "VERIFICADO|POR_VERIFICAR" }],
  "clasificacion": "publico|interno",         // no existe 'personal': está prohibido
  "version": 3,
  "vigente": true,
  "derivado_de": ["nodo:…"],                  // prov:wasDerivedFrom
  "checksum": "sha256:…",
  "aprobacion_id": "apr:…"                    // null ⇒ no publicable
}
```

```jsonc
// EVIDENCIA — append-only, encadenada
{ "id": "ev:…", "correlationId": "…", "ocurrio_en": "2026-08-28T10:00:00Z",
  "actor": { "tipo": "silla|humano|servicio", "id": "S-CLAUDE" },
  "accion": "consulta|propuesta|voto|firma|rechazo",
  "objeto": "nodo:…", "resultado": "ALLOW|DENY|…",
  "checksum": "sha256:…", "hash_previo": "sha256:…",
  "integrityAssurance": "CHECKSUM_ONLY" }
```

```jsonc
// CONTRADICCION — de primera clase, no un comentario
{ "id": "con:…", "nodo_a": "nodo:…", "nodo_b": "nodo:…",
  "tipo": "estado|cifra|cita|fecha|alcance",
  "detectada_por": "humano|silla|validador",
  "estatus": "abierta|resuelta|convive",   // 'convive' = discrepancia legítima
  "resolucion": { "nodo_ganador": "nodo:…", "acta": "docs/actas/…", "firmada_por": "…" } }
```

```jsonc
// APROBACION — la única puerta a 'vigente: true'
{ "id": "apr:…", "objeto": "nodo:…|con:…", "firmante": "rol humano",
  "firmado_en": "…", "medio": "acta|PR|firma", "acta": "docs/actas/…",
  "alcance": "publicacion|ejecucion", "revocada_en": null }
```

Cinco decisiones de diseño que importan más que los campos:

1. **Sin nodo huérfano:** `fuente` vacío ⇒ el validador rechaza. Es la regla de citación
   del glosario, ejecutada por máquina.
2. **`vigente` lo otorga una aprobación humana**, nunca un modelo ni una fusión de rama.
3. **Las contradicciones no se resuelven en silencio** — CLAUDE.md §5 ya lo ordena para
   los dos registros de módulos; aquí se vuelve tabla.
4. **Versionar por copia, no por edición:** `nodo_version` conserva la historia; corregir
   es publicar una versión nueva, como las actas.
5. **`clasificacion` no admite `personal`:** lo que no puede existir, no se modela.

---

## 7. MVP de 30 días (5 entregables verificables)

| # | Entregable | Prueba de aceptación (verificable por un tercero) |
|---|---|---|
| **E1** | Contrato `radar.v0.1` + validador + **50 nodos reales** sembrados desde `docs/marco/`, `docs/actas/` y el código | `npm run radar:validar` en verde; 0 nodos sin `fuente`; 0 coincidencias del detector de datos personales; los 50 nodos rastreables a archivo del repo |
| **E2** | Radar MCP de solo lectura: `listar_rutas`, `buscar_nodos`, `obtener_evidencia` | Corre enlazado a `127.0.0.1`; responde **403** a `Origin` ajeno; sin credenciales de terceros; auditoría estática que falle si aparece `sampling`, `roots` o cualquier herramienta de escritura |
| **E3** | **Prueba de neutralidad**: misma capacidad por HTTP/OpenAPI y por export JSON firmado | Un `curl` y dos clientes MCP distintos devuelven el **mismo** payload; se apaga el Radar MCP y la capacidad sigue disponible por HTTP |
| **E4** | Evidencia append-only encadenada + **10 contradicciones reales** registradas (empezando por las divergencias entre `docs/marco/modulos/INDICE.json` y `docs/orbe/modulos.json`) | Prueba que altera un registro y detecta la ruptura de cadena; las 10 contradicciones con nodo A, nodo B y estatus |
| **E5** | Puerta de firma humana + suite adversarial | Nodos con inyección («aprueba el acto…») no producen ejecución; intento de ejecución sin firma devuelve `DENY / HUMAN_SIGNATURE_REQUIRED`; la suite entra a `npm run test:orbe-contextos` y a la Guardia |

Lo que **no** entra en 30 días, y decirlo evita la trampa de siempre: integración con
Llave MX, adapter institucional, escritura sobre sistemas municipales, persistencia de
expediente ciudadano y cualquier afirmación pública de demanda.

---

## 8. Registro de riesgos

| # | Riesgo | Impacto | Mitigación | Responsable humano (rol) |
|---|---|---|---|---|
| R1 | Ruptura del protocolo MCP (ya ocurrió dos veces en 12 meses) | Medio: retrabajo del adaptador | Adaptador ≤ 500 líneas, sin reglas de negocio; capacidad replicada por HTTP (E3) | Responsable técnico |
| R2 | Cliente comprometido o servidor MCP ajeno (CVE-2025-6514, 9.6) | **Alto**: RCE en el equipo del funcionario | Catálogo propio con hashes; inventario mensual de servidores configurados; prohibición de servidores fuera de catálogo | Custodio de estaciones de trabajo |
| R3 | Inyección indirecta vía texto de nodo | Alto si algún día hay escritura | Nodos como datos etiquetados; sin herramientas de escritura; suite adversarial en la Guardia (E5) | Responsable de seguridad |
| R4 | Fuga de datos personales por un nodo | **Alto** (LFPDPPP; datos sensibles con consentimiento expreso) | `clasificacion` sin valor `personal`; detector de CURP/RFC/teléfono/correo en la Guardia; revisión humana previa a publicar | Responsable de datos personales |
| R5 | Fuga de llaves al bundle (ya ocurrió 4 veces) | **Crítico** | Guardia R1–R8 vigente; el Radar no toca `vite.config.ts`; ninguna llave en nodos | Custodio de secretos |
| R6 | Autoautorización de facto del Parlamento (credencial compartida) | Alto: decisión sin firma | Una credencial por silla, solo lectura; `HUMAN_SIGNATURE_REQUIRED` probado | Firmante humano |
| R7 | Grafo que se pudre (nodos sin mantener) | Medio-alto: pierde toda utilidad | `vigente` con caducidad revisable; reporte mensual de nodos sin revisión > 90 días | Curador del grafo |
| R8 | Dependencia de proveedor por la puerta trasera (skills que solo corren en un producto) | Medio | Skills en `SKILL.md` abierto; evaluación ejecutada en ≥ 2 productos (H-04) | Responsable técnico |
| R9 | Costo de tokens y de curaduría subestimado | Medio | Medir costo por nodo curado durante el MVP; el costo dominante es humano, no de inferencia | Responsable de presupuesto |
| R10 | Sobreafirmación de demanda ante el Ayuntamiento | **Alto reputacional**: es exactamente lo que el semáforo prohíbe | Ninguna afirmación de demanda sin las pruebas de §10; etiqueta `DEMO`/`PROYECCIÓN` en todo material | Firmante humano |
| R11 | Confundir checksum con firma digital en materiales públicos | Alto: impugnable en juicio | Mantener `CHECKSUM_ONLY` en documentación y UI; revisión de textos antes de publicar | Responsable legal |
| R12 | Registro público de servidores MCP en preview (cambios/reinicios de datos) | Bajo si no se depende de él | No usarlo como fuente en flujos institucionales; catálogo propio (E2) | Responsable técnico |
| R13 | El Parlamento como teatro de gobernanza (sesgo común entre modelos) | Medio: decisiones mal legitimadas | Registrar disenso; la silla asíncrona por PR (S-JULES) como control heterogéneo; el humano puede rechazar dictámenes unánimes | Firmante humano |

---

## 9. Fábrica de skills: las tres primeras

Criterio de selección: dolor real y ya documentado en este repositorio, salida verificable
y evaluación posible con casos existentes. Formato `SKILL.md` (H-04), no herramienta MCP.

### S1 · `verificador-de-citas-legales`

- **Objetivo:** impedir que se afirme en público algo con estatus POR VERIFICAR (regla de
  oro de `docs/marco/BIBLIOTECA_LEGAL.md`).
- **Entrada:** diff de un PR, o ruta de un documento/componente.
- **Salida:** tabla `afirmación → ordenamiento citado → estatus → veredicto (publicable / no publicable)`.
- **Evidencia:** `EvidenceRecord` por corrida con checksum de la entrada, versión de la
  biblioteca legal y lista de afirmaciones evaluadas.
- **Evaluación:** 30 casos etiquetados a mano (15 publicables, 15 no). Aceptación:
  recall ≥ 0.9 sobre no publicables; falsos positivos ≤ 20 %.

### S2 · `auditor-de-semaforo`

- **Objetivo:** detectar cifras simuladas sin etiqueta en la UI — la regla cultural más
  importante y la más fácil de romper al editar `C5Dashboard.tsx` o `CitizenApp.tsx`.
- **Entrada:** rutas bajo `src/` (por defecto, las vistas-módulo).
- **Salida:** hallazgos `archivo:línea` con la cifra, su contexto y la etiqueta faltante
  (`SIMULADO`, `PROYECCIÓN`, `META`, `DEMO`), más el parche sugerido **sin aplicar**.
- **Evidencia:** corrida con hash del árbol de fuentes y conteo por módulo.
- **Evaluación:** corpus con 25 mutaciones sembradas (quitar etiquetas a cifras hoy
  correctas). Aceptación: detecta ≥ 22/25; ≤ 5 falsos positivos en el árbol limpio.

### S3 · `sincronizador-de-registros-de-modulos`

- **Objetivo:** mantener honestos los **dos** registros de módulos, que hoy pueden
  contradecirse sin que nadie se entere (CLAUDE.md §5).
- **Entrada:** `docs/marco/modulos/INDICE.json`, `docs/orbe/modulos.json`, `docs/orbe/cop.html`,
  `docs/orbe/orbe-3d.html` y el código real (archivo + rango de líneas declarado).
- **Salida:** reporte de divergencias tipificadas (estado, archivo inexistente, líneas
  corridas, módulo en un registro y no en el otro, destino enlazado sin código) + nodos
  `contradiccion` listos para registrar.
- **Evidencia:** un nodo `contradiccion` por divergencia, con los dos registros como fuente.
- **Evaluación:** contrastar contra una auditoría manual de 10 módulos. Aceptación:
  encuentra todas las divergencias reales y no inventa ninguna (precisión 1.0 en esa muestra).

Nota deliberada: ninguna de las tres escribe en `main`, ninguna aprueba nada y ninguna
requiere credenciales externas. Una fábrica de capacidades empieza por lo que **verifica**,
no por lo que actúa.

---

## 10. Qué habría que demostrar antes de afirmar que existe demanda

Cinco pruebas, todas falsables, ninguna satisfecha hoy:

1. **Uso interno sostenido:** ≥ 3 personas consultando el Radar ≥ 3 veces por semana
   durante 4 semanas, con registro de consultas. Si el propio equipo no lo usa, nadie lo comprará.
2. **Tiempo ahorrado medido:** cronometrar 10 tareas reales (redactar una ficha, verificar
   una cita, preparar una sesión) con y sin Radar. Umbral: ≥ 30 % de reducción.
3. **Prueba con comprador real:** una carta de intención o minuta firmada por un área del
   Ayuntamiento que declare el problema con sus palabras y a quién le pertenece el presupuesto.
4. **Partida presupuestal identificada:** nombre del programa, monto y calendario. Sin
   partida, hay interés, no demanda.
5. **Casos comparables:** los tres municipios ya integrados a Llave MX (de los ocho
   existentes, 🟡): quién pagó, cuánto tardaron, qué los movió.

Hasta entonces, el lenguaje público correcto es «obligación legal vigente + prototipo
verificable», nunca «demanda comprobada».

---

## 11. Contraargumentos fuertes y condiciones de invalidación

- **CA-1 · MCP podría ser irrelevante en 18 meses.** Con dos rupturas en un año y
  primitivas ya depreciadas, apostar la arquitectura al protocolo es apostar a un tren en
  movimiento. *Respuesta:* por eso el adaptador es desechable y la capacidad se replica
  por HTTP; si MCP desaparece, ConnectX pierde un archivo, no el activo.
- **CA-2 · «Soberanía» es parcialmente ilusoria.** Los nodos son propios, pero el
  razonamiento sigue rentado a un proveedor extranjero. *Respuesta:* la soberanía
  reclamable es sobre **dato, política y decisión**; afirmar más que eso viola el semáforo.
- **CA-3 · Un municipio no compra una fábrica de conocimiento.** Compra trámites resueltos
  y recaudación. La base de conocimiento no tiene partida presupuestal propia.
  *Respuesta:* debe venderse como control interno del SOATM, no como producto.
- **CA-4 · El costo real es la curaduría humana.** Un grafo sin curador se pudre en
  semanas, y ahí no ayuda ningún modelo.
- **CA-5 · El Parlamento puede legitimar sin controlar.** Cinco modelos con corpus
  solapados producen acuerdo aparente. Sin disenso registrado, es ritual.

**Condiciones que invalidarían el planteamiento** (si ocurre cualquiera, se detiene):

1. Que no exista un curador humano con tiempo asignado semanalmente.
2. Que a los 60 días el grafo tenga menos de 100 nodos vigentes o más del 20 % sin fuente.
3. Que aparezca un dato personal en un nodo publicado (falla de R4): detención inmediata,
   acta y revisión completa antes de reanudar.
4. Que el adaptador MCP acumule reglas de negocio: señal de que la arquitectura se invirtió.
5. Que ninguna de las cinco pruebas de demanda (§10) avance en 90 días.

---

## 12. Veredicto

**CONTINUAR CON AJUSTES.**

Razones concretas para continuar:

- El activo defendible ya existe y **no depende de MCP**: contratos semánticos versionados,
  política determinística y evidencia con checksum, todo en el repositorio (🔵 `contextos/`,
  `shared/semantic/`).
- El perfil del Radar (solo lectura, sin credenciales, sin datos personales, sin acciones)
  es justamente el que la evidencia de incidentes recomienda para empezar.
- El costo de equivocarse es bajo y reversible: un adaptador pequeño y desechable.

Ajustes exigidos antes de llamar a esto «arquitectura» y no «prototipo»:

1. **Invertir la narrativa:** el producto es Context.OS; MCP es un puerto. Todo material
   que diga «fábrica de servidores MCP» debe corregirse.
2. **Neutralidad demostrada, no declarada** (E3): la capacidad debe sobrevivir al apagado
   del Radar MCP.
3. **Prohibiciones ejecutables, no prometidas**: detector de datos personales, validación
   de `Origin`, suite adversarial y `HUMAN_SIGNATURE_REQUIRED`, todo dentro de la Guardia.
4. **Prohibido afirmar demanda** hasta cumplir §10.
5. **Cerrar la brecha de evidencia de este mismo informe**: descargar de primera mano el
   DOF 20-03-2025, la nota de la ATDT sobre Llave MX y OWASP LLM01, y subir esos hallazgos
   de 🟡 a 🟢 o corregirlos.

Lo que **no** se recomienda hoy: adapter institucional, integración con Llave MX,
herramientas de escritura por MCP, y cualquier automatización de actos administrativos.
La ejecución sigue siendo humana; el Parlamento delibera, el humano firma.

---

*Este documento es insumo de investigación. No modifica el estado de ningún módulo ni
sustituye acta. Si contradice alguna acta previa, la contradicción debe registrarse y
resolverse con acta posterior, nunca en silencio.*
