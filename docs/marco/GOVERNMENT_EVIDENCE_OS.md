# Government Evidence OS — Gobernanza Digital como Memoria Institucional Verificable

**Nayarit Digital · ConnectX** · Documento de visión estratégica, 2026-08-26
**Estado: 🔵 Propuesta — sin código, sin piloto, sin dataset todavía.** Ninguna afirmación de este documento debe leerse como capacidad existente del sistema. Cuando algo de esto se implemente, debe registrarse en `docs/marco/modulos/` con evidencia archivo:línea, igual que el resto del proyecto.

---

## 1. De dónde nació esta idea

La conversación comenzó con una pregunta aparentemente ajena a gobierno: si era posible auditar casinos en línea utilizando reglas, leyes, estándares técnicos, licencias y evidencia pública para determinar qué tan verificable era su operación.

La conclusión importante no fue el casino. Fue descubrir un patrón general:

> **Regla → obligación → actor responsable → evidencia → discrepancia → resultado → trazabilidad.**

En lugar de confiar en lo que una organización afirma sobre sí misma, un sistema podría recopilar las obligaciones aplicables y contrastarlas con evidencia verificable.

Después apareció una pregunta inevitable: ¿por qué no aplicar exactamente ese mismo principio al gobierno? Ahí surgió esta línea para Gobernanza Digital.

## 2. La idea central

Gobernanza Digital no debería limitarse a digitalizar trámites, crear asistentes o modernizar sistemas gubernamentales. También puede convertirse en una infraestructura capaz de:

> **reconstruir, preservar y consultar la memoria institucional del gobierno a través de diferentes administraciones.**

La premisa: los políticos cambian, las administraciones cambian, los partidos cambian — la memoria institucional no debería desaparecer con ellos.

## 3. Qué NO se busca construir

No se busca desarrollar: un sistema para calificar si un político es "bueno" o "malo"; un índice de honestidad; una plataforma partidista; propaganda; una herramienta electoral; un detector automático de corrupción; una IA que determine culpabilidad.

**Incorrecto** — `Honestidad del presidente municipal: 43/100.` No existe una forma objetiva de medir eso.

**Correcto** — `Transparencia documental: 43/100 conforme a 18 criterios públicos y reproducibles.` Eso puede comprobarse.

## 4. Principio de neutralidad institucional

La afiliación política puede guardarse como dato histórico, pero nunca debe participar en las fórmulas de evaluación. La unidad principal de análisis no es *PRI / PAN / Morena / MC / persona*. La unidad es *municipio / institución / administración / proyecto / servicio / obligación*.

```
Municipio de Tepic
Administración 2014–2017
Administración 2017–2021
Administración 2021–2024
Administración 2024–2027
```

La pregunta no es "¿qué partido gobernó mejor?" sino "¿cómo cambió el desempeño institucional de Tepic durante diferentes periodos?"

## 5. Qué se podría medir

En lugar de una calificación política única, distintas dimensiones verificables:

- **Cumplimiento normativo** — qué obligaciones legales correspondían a la institución y cuáles cuentan con evidencia de cumplimiento.
- **Transparencia documental** — qué información debía publicarse, cuál estaba disponible, actualizada y verificable.
- **Ejecución presupuestaria** — qué presupuesto fue aprobado, modificado, comprometido, pagado y ejecutado.
- **Contratación pública** — licitaciones, adjudicaciones, proveedores, competencia, concentración y modificaciones.
- **Evidencia física** — si obras o infraestructura reportadas pueden comprobarse mediante documentación, fotografías, ubicación y otras fuentes.
- **Atención ciudadana** — tiempo de respuesta, resolución y trazabilidad de servicios.
- **Cumplimiento de compromisos** — qué anunció oficialmente una administración y cuál fue el resultado comprobable.
- **Continuidad institucional** — qué proyectos recibió una administración y qué hizo con ellos.
- **Consistencia narrativa-evidencia** — qué afirmó públicamente una institución frente a lo que puede verificarse documentalmente.

## 6. Una separación fundamental

```
PROMESA ≠ OBLIGACIÓN LEGAL ≠ PRESUPUESTO AUTORIZADO ≠ ACCIÓN REPORTADA ≠ RESULTADO VERIFICADO
```

Un gobierno puede anunciar algo que todavía no está contratado; puede contratarlo y no ejecutarlo; ejecutarlo parcialmente; concluirlo; o recibirlo prácticamente terminado de la administración anterior. El sistema debe preservar estas diferencias, no aplanarlas.

## 7. La gran pregunta institucional

Para cada administración: **¿qué recibió** (proyectos heredados, infraestructura, compromisos, obligaciones, deuda, contratos activos, presupuesto disponible), **qué prometió** (Plan Municipal de Desarrollo, programas, anuncios, metas), **qué recibió de presupuesto** (aprobado, fondos estatales/federales, convenios, modificaciones), **qué contrató** (empresa, modalidad, monto, objeto, plazo, modificaciones), **qué ejecutó** (avance físico/financiero, pagos, entregables), y **qué dejó** (proyectos concluidos/pendientes/suspendidos/cancelados, nuevos compromisos)?

Resumida: **¿qué recibió esta administración, qué hizo durante su periodo y qué entregó a la siguiente?**

## 8. Continuidad entre administraciones

```
Proyecto X
├── Administración A: diseña, presupuesta, contrata, ejecuta 42%
├── Administración B: recibe 42%, modifica, ejecuta hasta 78%
└── Administración C: recibe 78%, concluye
```

No se atribuye la obra completamente a A, B o C — se identifica como **proyecto de continuidad interadministrativa**. Esto revela qué gobiernos continúan proyectos heredados y cuáles pierden continuidad al cambiar de administración. Eso no es análisis partidista: es **madurez institucional**.

## 9. Índice de Continuidad Institucional

Métrica propia, ejemplo: *Administración X recibió 24 proyectos heredados — 14 concluidos, 4 continuados, 3 modificados con justificación, 1 cancelado formalmente, 2 sin continuidad verificable.* Comparable entre administraciones, revela si el gobierno funciona como institución o si cada cambio político provoca un reinicio.

## 10. Reconstrucción histórica

Empezar por administraciones ya concluidas: el ciclo ya terminó y existe presupuesto, contratos, informes, cuentas públicas, auditorías posteriores y resultados visibles hoy. La IA actual permite procesar volúmenes de PDFs, presupuestos, contratos, gacetas, planes municipales, informes, auditorías y bases públicas que hace una década habrían requerido equipos humanos enormes.

## 11. El problema de los nombres políticos

Una administración llama a un programa "Rescate Vial"; la siguiente "Calles para Todos"; la siguiente "Transformación Urbana" — pero pueden ser esencialmente lo mismo. Se necesita separar:

```
NOMBRE POLÍTICO → CLASIFICACIÓN INSTITUCIONAL NEUTRAL
"Calles para Todos" / "Rescate Vial" / "Renovación Urbana" → Infraestructura vial → Rehabilitación → Repavimentación
```

Esto permite comparar periodos de veinte años aunque cambien los nombres.

## 12. Metalingüística aplicada

No para manipular — para comprender cómo cambia el lenguaje gubernamental. Frases como "Renovación histórica del centro" se descomponen en elementos comprobables: acción, ubicación, periodo, monto, dependencia, proyecto, contrato, resultado. Después se busca evidencia. La función es quitarle la capa retórica al lenguaje y encontrar el objeto administrativo real.

## 13. Neuropolítica como herramienta forense

Analizar comunicación política, no para influir electoralmente sino para estudiar: apropiación de mérito, promesa presentada como resultado, presupuesto anunciado como si fuera gasto ejecutado, obra contratada presentada como terminada, cambio de nombre de programas, lenguaje de ruptura con administraciones anteriores, repetición de anuncios, desplazamiento de responsabilidad.

El resultado es **consistencia entre narrativa y evidencia**. Ejemplo — declaración: *"Construimos 50 kilómetros de calles."* Resultado del motor: *37.2 km verificados documentalmente, 8.3 km con documentación pero sin evidencia física suficiente, 4.5 km no localizados con las fuentes consultadas.*

Nunca concluir automáticamente "mintió". La conclusión correcta: **"La evidencia localizada permite verificar 74.4% de la afirmación hasta la fecha de corte."**

## 14. Evidencia física

Contrastar estado documental (lo que los documentos afirman) contra estado físico (lo que actualmente puede verificarse):

| Documento | Evidencia actual |
|---|---|
| Concluido | Existe y opera |
| Concluido | Existe parcialmente |
| Concluido | No localizado |
| En proceso | Actualmente concluido |
| Suspendido | Continúa sin terminar |

## 15. Mapa histórico

Interfaz territorial con línea temporal: el ciudadano selecciona 2015 y ve las obras de ese periodo; mueve la línea a 2020 y observa qué ocurrió con ellas; la mueve a 2026 y conoce su condición actual. Las obras permanecen como objetos históricos; los gobiernos cambian alrededor de ellas.

## 16. Calidad de evidencia

No todas las fuentes tienen el mismo peso — niveles: **A** documento oficial + contrato + evidencia física; **B** documento oficial verificable; **C** base pública institucional; **D** comunicación oficial; **E** fuente periodística; **F** reporte ciudadano no corroborado. Las conclusiones dicen "Evidencia: Alta" o "Evidencia insuficiente para determinar el estado" — esto evita que la IA transforme una hipótesis en un hecho.

## 17. Procedencia

Cada afirmación conserva el lugar exacto de donde salió:

```
fact_id: TEPIC-OBRA-2017-0432
claim: Presupuesto autorizado $14,820,000
source: Presupuesto de Egresos 2017
page: 184
authority: Ayuntamiento
retrieved: 2026-08-25
confidence: A
```

La trazabilidad es parte de la arquitectura, no una nota al pie agregada después. Esto ya es consistente con la disciplina VERIFICADO/POR VERIFICAR de `docs/marco/BIBLIOTECA_LEGAL.md` y con el patrón `EvidenceRecord` que ya existe, a escala de laboratorio, en `contextos/evidence.ts`.

## 18. Arquitectura de capas propuesta

No construir "una IA" primero — construir capas:

1. **Evidence Lake** — repositorio de documentos originales (PDFs, contratos, presupuestos, cuentas públicas, fotografías, informes, gacetas, auditorías, bases estructuradas).
2. **Ingestion Engine** — descarga, extrae texto, clasifica, identifica fechas/dependencias/empresas/montos/proyectos/ubicaciones.
3. **Ontología gubernamental** — define qué significa cada cosa (Entidad, Administración, Dependencia, Programa, Proyecto, Obra, Contrato, Proveedor, Presupuesto, Pago, Auditoría, Ubicación, Compromiso, Evidencia, Resultado). Sin ontología hay miles de documentos; con ontología hay conocimiento.
4. **Temporal Knowledge Graph** — conecta Municipio → Administración → Proyecto → Contrato → Proveedor → Presupuesto → Pago → Evidencia → Auditoría → Resultado, cada elemento con fecha.
5. **Semantic Matching** — la IA propone relaciones entre elementos con nombres distintos (p. ej. "Rehabilitación Avenida Insurgentes" ≈ "Modernización corredor Insurgentes") pero no las convierte automáticamente en verdad.
6. **Rule Engine** — leyes, obligaciones y metodología: *si existe obligación X y aplica al municipio Y, entonces buscar evidencia Z*; produce cumplido / parcialmente verificable / incumplimiento documentado / no determinable / no aplica.
7. **Verification Engine** — contrasta Norma vs. Declaración vs. Presupuesto vs. Contrato vs. Evidencia vs. Resultado; aquí aparecen las discrepancias.
8. **Audit Log** — nada importante desaparece; si un dato cambia, se versiona con explicación del cambio, protegiendo al sistema y a las instituciones evaluadas.

## 19. Relación con Context.OS

El grafo puede contener millones de relaciones. Context.OS determinaría qué información es relevante para la pregunta concreta — p. ej., ante "¿qué pasó con el parque anunciado en 2017?", recuperar administración, proyecto, contratos, presupuesto, modificaciones, auditorías y evidencia 2026, y preparar el contexto. Esto es una extensión natural del pipeline que ya existe en `contextos/runtime.ts` (IntentEnvelope → Policy → Consent → Adapter → EvidenceRecord), no un sistema aparte.

## 20. Relación con ORBE

ORBE sería la experiencia: el ciudadano pregunta "¿quién construyó este puente?" y ORBE responde con administración de inicio, porcentaje documentado, administración que concluyó, más botones "ver evidencia / ver presupuesto / ver contratos / ver línea del tiempo".

## 21–23. Empaquetado del producto

Arquitectura híbrida, no una sola cosa. **Producto principal: web app pública** (sin instalación, funciona en móvil y escritorio, indexable, con mapas, líneas de tiempo, fichas históricas, fuentes, visualización de evidencia). Interfaz recomendada: buscador ("¿qué quieres investigar?"), mapa geolocalizado, línea temporal 2010–2026, ficha de administración, expediente de proyecto, comparador administración A vs. B bajo los mismos indicadores, y "Preguntar a ORBE" en lenguaje natural.

**La IA no sería el producto.** El activo real es el grafo institucional + la evidencia histórica + la metodología; la IA es la interfaz para usar ese conocimiento:

```
DATOS + GRAFO + METODOLOGÍA + EVIDENCIA → IA → ORBE
```

## 24–25. Participación ciudadana, con cuidado

No se recomienda un foro inicialmente — introduce opiniones, polarización, acusaciones, moderación, campañas partidistas e información falsa, contaminando justamente lo que se busca proteger. En su lugar, un botón "Aportar evidencia" (fotografía, ubicación, documento, fecha, descripción) que entra como **"Evidencia ciudadana no verificada"**, corroborable después — estructurada como aportar evidencia, no como publicar opinión.

## 26–27. Producto de investigación y API

**Research Workbench** para periodistas, investigadores, funcionarios, universidades y organizaciones civiles, con consultas avanzadas (proveedores con contratos en tres administraciones distintas, obras con ampliaciones superiores al 30%, proyectos anunciados sin contrato localizado). Después, una **Government Evidence API** (`GET /project/:id/history`, `/administration/:period/projects`, `/provider/:id/contracts`, `/municipality/:id/continuity`) que convierte la plataforma en infraestructura para otros sistemas.

## 28. Modelo de producto

```
                     GOVERNMENT EVIDENCE OS
            ┌─────────────────┬─────────────────┐
        Ciudadano        Investigador       Gobierno
           ORBE            Workbench        Compliance
            └─────────────────┼─────────────────┘
                        Evidence Graph
```

## 29. Diferenciador estratégico

Muchos sistemas ayudan al gobierno a administrar. El diferencial propuesto: **reconstruir cómo ha funcionado el gobierno a través del tiempo** — no solo qué está haciendo ahora, sino qué recibió → qué hizo → qué entregó.

## 30–32. Primer piloto propuesto

No intentar México entero. Empezar con **Tepic, tres administraciones consecutivas, un dominio inicial: obra pública** (tiene dinero, contratos, ubicaciones, fotografías, resultados físicos — relativamente verificable). Dataset por administración: Plan Municipal de Desarrollo, informes de gobierno, presupuestos, cuentas públicas, programa anual de obra, contratos, licitaciones, proveedores, auditorías, fotografías, ubicación, evidencia física actual. MVP: seleccionar una administración y mostrar obras anunciadas, contratos identificados, presupuesto localizado, concluidas verificablemente, transferidas a la siguiente administración, sin evidencia suficiente — y comparar entre administraciones.

**Nota de alineación con el repositorio**: este piloto usaría exactamente la misma disciplina que ya existe en `docs/marco/BIBLIOTECA_LEGAL.md` (VERIFICADO / POR VERIFICAR / PENDIENTE PDF) y en `docs/marco/modulos/INDICE.json` (estado de completitud con evidencia archivo:línea) — no requiere inventar un nuevo estándar de honestidad, solo aplicar el que el proyecto ya usa a un dominio de datos históricos en vez de código.

## 33. El aprendizaje central

La digitalización gubernamental normalmente se piensa desde el presente hacia adelante ("¿cómo debería funcionar el gobierno?"). Este proyecto agrega otra dirección: "¿cómo ha funcionado realmente?" Juntas: **cómo debe funcionar + cómo funcionó realmente → cómo debemos diseñarlo.**

## 34. Cinco preguntas para pensar como arquitecto de Gobernanza Digital

1. ¿Cuál es el objeto? (no "el gobierno" — algo concreto: obra, contrato, trámite, hospital, calle)
2. ¿Qué relaciones tiene? (quién lo autorizó, pagó, contrató, ejecutó)
3. ¿Qué tiempo tiene? (cuándo nació, cambió, quién lo recibió, quién lo terminó)
4. ¿Qué evidencia existe? (documento, foto, contrato, auditoría)
5. ¿Qué puede afirmarse realmente? (hecho, hipótesis, inconsistencia, evidencia insuficiente)

La última pregunta es probablemente la más importante de todas.

## 35. Filosofía central

No construir una máquina para encontrar corrupción. Construir **una máquina para encontrar evidencia**. A veces demostrará una irregularidad; a veces demostrará que un gobierno sí cumplió; a veces simplemente dirá "no contamos con evidencia suficiente". Eso es neutralidad.

## 36. Nombres conceptuales candidatos (sin decidir marca)

- **Memoria Institucional Verificable** — describe la función pública.
- **Archivo Vivo de Gobernanza** — describe la dimensión histórica.
- **Government Evidence OS** — describe la arquitectura tecnológica.
- **Public Evidence Graph** — describe la infraestructura de datos.

Probablemente terminen siendo componentes distintos, no nombres competidores.

## 37. Cómo encaja con la arquitectura canónica existente

```
GOBERNANZA DIGITAL
├── ID.mx — Identidad
├── Context.OS — Contexto y permisos
├── ORBE — Experiencia ciudadana
└── GOVERNMENT EVIDENCE OS (propuesto)
    ├── Archivo Vivo
    ├── Knowledge Graph
    ├── Rule Engine
    ├── Temporal Engine
    ├── Evidence Engine
    └── Audit Engine
```

ID.mx sabe quién. Context.OS sabe qué contexto puede utilizarse. Government Evidence OS sabría qué ocurrió y qué evidencia existe. ORBE permite preguntarlo. Esto es coherente con la separación de capas ya descrita en `docs/marco/NOTA_DE_CONTEXTO_PARA_CLAUDE.md` — Government Evidence OS sería una quinta capa, no un reemplazo de ninguna existente.

## 38. Visión final (escenario ilustrativo, no implementado)

Un ciudadano frente a una obra abre ORBE, toma una fotografía, pregunta "¿qué es esto?". El sistema respondería con proyecto, presupuesto original, contratista, administración de inicio, estado al cambio de administración, administración siguiente, terminación documentada, última evidencia registrada — y un enlace "ver historia completa". Eso sería gobernanza digital convertida en memoria.

## 39. Lo más importante

La ventaja estratégica no sería el modelo de IA más poderoso — los modelos cambiarán constantemente. La ventaja sería **haber reconstruido años de contexto institucional que nadie más estructuró**. Ese dataset puede tardar meses o años en reproducirse; la IA es reemplazable, el conocimiento acumulado no.

## 40. La tesis

> **Gobernanza Digital no sólo debe ayudar al Estado a funcionar mejor mañana. También debe ser capaz de reconstruir cómo funcionó ayer, conservar esa memoria y utilizarla para tomar mejores decisiones hoy.**

Y la regla que mantiene todo neutral:

> **No confiar. No desconfiar. Verificar.**

---

## Recomendación de empaquetado (si se decide avanzar)

Web app pública primero, IA como interfaz y no como producto central. La web necesitaría mapa, línea del tiempo, buscador, fichas por administración/proyecto y fuentes. ORBE se montaría encima como copiloto conversacional. El núcleo real sería el **grafo temporal de evidencia**, porque ese es el activo difícil de copiar.

## Pendiente antes de cualquier código

Este documento es visión, no plan de ejecución. Antes de escribir una sola línea de `Evidence Lake`/`Ingestion Engine`/etc., falta decidir (ver `docs/marco/PENDIENTES_AUDITORIA_2026-08.md` para el formato de "pendiente" que ya usa el proyecto):

- si el piloto de Tepic/obra pública es el punto de partida aceptado, o se prefiere otro dominio/municipio;
- de dónde sale el dataset inicial (fuentes primarias ya identificadas en `docs/presentacion-tepic/05_MARCO_JURIDICO/fuentes-primarias/`, o un esfuerzo de recopilación nuevo);
- quién define y mantiene la ontología gubernamental (capa 3) — es la pieza de la que depende todo lo demás;
- cómo se gobierna la clasificación neutral de programas (§11) para que no se vuelva, ella misma, una fuente de sesgo editorial.
