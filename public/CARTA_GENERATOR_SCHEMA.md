# ConnectX — Esquema Metalingüístico de Generación de Cartas Institucionales

## Propósito

Este documento es el **molde estructural** que permite al sistema de IA de ConnectX regenerar cartas institucionales calibradas para cualquier destinatario, municipio o momento político. No es una plantilla de texto — es la gramática de persuasión que subyace a cada carta.

---

## 1. Arquitectura de la carta: cinco capas invariantes

Toda carta institucional de ConnectX, independientemente del destinatario, sigue esta secuencia de capas. Lo que cambia entre cartas es el **contenido de cada capa**, no el orden.

```
[CAPA 1: ANCLAJE]       → ¿Desde dónde le hablas?
[CAPA 2: ESPEJO]        → ¿Qué ve el destinatario de sí mismo?
[CAPA 3: PRUEBA SOCIAL] → ¿Qué ya existe y funciona?
[CAPA 4: PROPUESTA]     → ¿Qué resuelves exactamente para él/ella?
[CAPA 5: PUENTE]        → ¿Cuál es el siguiente paso de baja fricción?
```

---

## 2. Arquetipos de destinatario y sus marcos de valor

El sistema debe identificar el arquetipo del destinatario antes de generar cualquier carta. El arquetipo determina el **lenguaje de valor** de cada capa.

| Arquetipo | Marco de valor dominante | Dolor primario | Motivación real |
| :--- | :--- | :--- | :--- |
| **Funcionario Ejecutivo** (presidente/a municipal, síndico/a) | Cumplimiento legal + recaudación | Incumplir la ley / perder presupuesto | Legitimidad institucional |
| **Lideresa/Líder Social** | Justicia ciudadana + territorio | Ser irrelevante / quedar fuera | Impacto real en su gente |
| **Director Técnico** (informática, tesorería) | Eficiencia + integración | Sistemas que no hablan entre sí | Control y trazabilidad |
| **Actor Político** (regidor/a, diputado/a) | Visibilidad + narrativa | No tener historia que contar | Capital político medible |
| **Aliado de Prensa** | Exclusividad + datos | Publicar lo que todos publican | La primicia verificable |

---

## 3. Matriz de capas por arquetipo

### CAPA 1 — ANCLAJE (¿desde dónde hablas?)

| Arquetipo | Tipo de anclaje | Ejemplo de apertura |
| :--- | :--- | :--- |
| Funcionario Ejecutivo | Marco legal / normativo | "En el marco de los mandatos de la LNETB…" |
| Lideresa Social | Marco de valores compartidos | "Un Tepic más digital es un Tepic más justo." |
| Director Técnico | Marco de problema técnico conocido | "La fricción entre sistemas en silos genera pérdidas operativas…" |
| Actor Político | Marco de oportunidad histórica | "Pocas decisiones definen una administración…" |
| Aliado de Prensa | Marco de exclusividad informativa | "Antes de hacerlo público, queremos que usted lo vea primero…" |

### CAPA 2 — ESPEJO (¿qué ve el destinatario de sí mismo?)

Esta capa refleja la identidad y trayectoria del destinatario. Su función es crear **reconocimiento emocional** antes de cualquier propuesta.

- Regla: nunca mencionar el producto aquí.
- Regla: usar adjetivos que el destinatario usaría para describirse.
- Regla: la frase debe terminar con una apertura implícita hacia la propuesta.

| Arquetipo | Frase espejo tipo |
| :--- | :--- |
| Funcionario Ejecutivo | "Su administración ha asumido responsabilidades sin margen para la improvisación…" |
| Lideresa Social | "Quienes han construido trayectorias de servicio genuino desde la trinchera comprenden que la tecnología solo tiene valor cuando transforma vidas concretas…" |
| Director Técnico | "Quienes administran infraestructura pública saben que la deuda técnica se acumula silenciosamente…" |
| Actor Político | "Su posición le permite convertir una decisión técnica en un hito político verificable…" |

### CAPA 3 — PRUEBA SOCIAL (¿qué ya existe?)

Esta capa ancla la propuesta en **realidad verificable**, no en promesas futuras. Los datos son los mismos para todos los arquetipos; lo que cambia es el encuadre.

**Datos fijos actuales de ConnectX:**
- 2,400 ciudadanos registrados
- $4.2 millones de pesos recaudados
- Módulos operativos: MercadoVivo, MostradorPro, ConnectX Triage, Faro Fiscal

| Arquetipo | Encuadre de los datos |
| :--- | :--- |
| Funcionario Ejecutivo | "…gestionando $4.2M MXN en recaudación de manera transparente y trazable." |
| Lideresa Social | "…2,400 ciudadanos activos, sin intermediarios ni filas burocráticas." |
| Director Técnico | "…API en producción con 2,400 usuarios concurrentes y cero incidentes de seguridad." |
| Actor Político | "…resultados que ya pueden nombrarse: 2,400 vecinos atendidos, $4.2M de recaudación recuperada." |

### CAPA 4 — PROPUESTA (¿qué resuelves exactamente?)

Esta capa presenta los módulos de ConnectX **sólo como solución al dolor primario del arquetipo**. Nunca se listan todos los módulos — sólo los relevantes.

| Arquetipo | Módulos a presentar | Razón |
| :--- | :--- | :--- |
| Funcionario Ejecutivo | MercadoVivo, MostradorPro, ConnectX Triage | Recaudación + cumplimiento LNETB |
| Lideresa Social | Faro Fiscal, ConnectX Triage, Asistente IA | Transparencia + salud + acceso |
| Director Técnico | APIs de integración, Firestore, arquitectura de interoperabilidad | Eliminar silos técnicos |
| Actor Político | Faro Fiscal, Trazabilidad de Obras | Historia política con datos |

### CAPA 5 — PUENTE (siguiente paso de baja fricción)

La CTA nunca puede generar fricción. La regla es: **el paso que se propone debe ser más fácil que no darlo**.

| Arquetipo | CTA tipo |
| :--- | :--- |
| Funcionario Ejecutivo | "Reunión de trabajo con demostración en vivo." |
| Lideresa Social | "Sesión estratégica personal en el espacio y momento que prefiera." |
| Director Técnico | "Revisión técnica de la arquitectura (documento de 3 páginas adjunto)." |
| Actor Político | "Acceso anticipado al tablero Faro Fiscal con datos del municipio." |

---

## 4. Variables de inyección para el sistema de IA

Cuando el sistema genera una nueva carta, debe resolver estas variables antes de construir cualquier capa:

```yaml
CARTA_VARS:
  destinatario:
    nombre: ""
    cargo: ""
    arquetipo: ""          # uno de los 5 arquetipos definidos
    municipio: ""
    estado: ""

  contexto_politico:
    momento: ""            # ej: "5 días antes del vencimiento legal", "primera reunión"
    presion_activa: ""     # ej: "incumplimiento LNETB", "campaña electoral 2027"
    oportunidad: ""        # ej: "cambio de administración", "presupuesto Q3 disponible"

  datos_connectx:
    ciudadanos_registrados: 2400
    recaudacion_mxn: 4200000
    modulos_activos: ["MercadoVivo", "MostradorPro", "ConnectX Triage", "Faro Fiscal"]
    modulos_a_presentar: []  # selección basada en arquetipo

  firmante:
    nombre: "Miguel Alexis Pérez Aguilar"
    cargo: "Director General"
    empresa: "ConnectX Servicios S.A. de C.V."
    ciudad: "Tepic, Nayarit"
```

---

## 5. Instrucciones de generación para el sistema de IA

```
SISTEMA: Eres el redactor institucional de ConnectX.

TAREA: Generar una carta calibrada para el destinatario especificado.

PROCESO:
1. Lee las CARTA_VARS y determina el arquetipo del destinatario.
2. Para cada una de las 5 CAPAS, selecciona el marco correspondiente al arquetipo.
3. Inyecta las variables de contexto político en CAPA 1 y CAPA 5.
4. Inyecta los datos de ConnectX con el encuadre correcto del arquetipo en CAPA 3.
5. Lista solo los módulos relevantes para el dolor primario del arquetipo en CAPA 4.
6. Tono: institucional y directo para Funcionario/Director Técnico.
         valorativo y territorial para Lideresa Social y Actor Político.
7. Extensión: máximo 400 palabras de cuerpo. Sin relleno. Sin preámbulos.

RESTRICCIONES:
- Nunca mencionar el nombre del producto en CAPA 2.
- Nunca listar más de 3 módulos en CAPA 4.
- La CTA de CAPA 5 debe ser una sola acción concreta, no una lista.
- Siempre incluir la fecha real del día de generación.
```

---

## 6. Registro de cartas generadas

| Fecha | Destinatario | Arquetipo | Versión | Contexto político | Estado |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 2026-06-29 | Blanca Simancas | Funcionario Ejecutivo | v1.0 | Piloto 90 días / presión LNETB | Enviada |
| 2026-06-29 | Leticia Araiza | Lideresa Social | v1.0 | Aliada fundacional / campaña 2027 | Enviada |

---

*Este documento es parte del sistema de inteligencia institucional de ConnectX. Actualizar el registro cada vez que se genere una nueva carta.*
