# AUDITORÍA DE CAPACIDADES Y LEGADO DE SKILLS

**Fecha:** 13 agosto 2026
**Objetivo:** Determinar qué arquitectura de agentes es más fuerte, dónde están los huecos, y cómo construir un legado de skills que beneficie al proyecto SOATM/ConnectX.

---

## 1. LOS DOS SISTEMAS (no compiten, se complementan)

### Sistema A — Gabinete de Especialistas (15 agentes de dominio)

| Aspecto | Estado |
|---|---|
| Ubicación | `docs/agentes/GABINETE_ESPECIALISTAS.md` |
| Naturaleza | Roles de dominio con prompt base + reglas de gobernanza |
| Formato | Un solo archivo markdown de 11,764 bytes |
| Ejecutabilidad | 🔴 NO ejecutable — es documentación, no skills |
| Fortaleza | Expertise sectorial profunda + reglas de verificación (anclaje al código, formato HALLAZGO/RECOMENDACIÓN/MÓDULO, anti-ego) |
| Proveedores | 5 (Groq, Gemini, Claude, Kimi, Jules) con rotación anti-bloqueo |

**Los 15 especialistas:**

| # | Dominio | Vigila (archivos reales) |
|---|---|---|
| E1 | Ciencias Políticas | `TesisCienciaPolitica.tsx`, `Whitepaper.tsx` |
| E2 | Derecho Administrativo | `LegalComplianceDisclaimer.tsx`, `ConsentGate` |
| E3 | Protección de Datos/CISO | `firestore.rules`, `server.ts`, `LoginView.tsx` |
| E4 | Hacienda Pública | Pagos, Stripe, `CanjesView.tsx` |
| E5 | Salud Pública | `SaludNayaritID.tsx` |
| E6 | Agricultura y Rural | Módulo agrícola (fase 2) |
| E7 | Turismo Costero | Permisos turísticos |
| E8 | Urbanismo | `UrbanReportMapView.tsx`, `NayaritMap.tsx` |
| E9 | Seguridad Pública | `C5Dashboard.tsx`, `MandoCentral.tsx` |
| E10 | Inclusión Digital | Accesibilidad, Lighthouse, bundle |
| E11 | Lenguas Originarias | `WixarikaBanda`, cora/wixárika |
| E12 | Educación | `ConnectXAcademy.tsx` |
| E13 | Geopolítica | LlaveMx, convenios, dependencia cloud |
| E14 | UX / Diseño | `CitizenApp.tsx`, `CitizenOS.tsx`, `PlatformLanding.tsx` |
| E15 | Ingeniería Software | Build, CI, `package.json`, deuda técnica |

### Sistema B — Skills OpenClaw (30 skills instalados)

| Aspecto | Estado |
|---|---|
| Ubicación | `~/.openclaw-autoclaw/skills/<nombre>/SKILL.md` |
| Naturaleza | Procedimientos ejecutables con descripción para descubrimiento |
| Formato | Un archivo por skill, con frontmatter (name, description, metadata) |
| Ejecutabilidad | 🟢 Ejecutable — el agente principal los invoca con `read` y los sigue |
| Fortaleza | Descubribles, versionables, reutilizables, compartibles |

**Los 30 skills por categoría:**

| Categoría | Skills | Cantidad |
|---|---|---|
| **Dominio SOATM** (inteligencia) | citizen-sentiment, competitor-intel, gov-intel-opensource, llavemx-connector, municipal-procurement, oceanos-azules-hunter, pol-audit-territorial, pol-intel-municipal, pol-radar-legislativo, whatsapp-citizen-portal | 10 |
| **Diseño/UI** | aesthetic-preset-library, autoclaw-design-capability, autoclaw-design-capability_noqa, infinite-canvas-output | 4 |
| **Browser/Web** | autoglm-browser-agent-intel, website-builder | 2 |
| **AutoGLM media** | autoglm-file-upload, autoglm-generate-image-seedream, autoglm-image-recognition | 3 |
| **Pagos Alipay** | alipay-authenticate-wallet, alipay-payment-skill | 2 |
| **Docs/PDF/PPT** | pptx-swarm | 1 |
| **Memoria/Evolución** | memory, hermes-evolution | 2 |
| **Cron/Reminders** | autoclaw-im-cron, feishu-cron-reminder | 2 |
| **Infra** | 1password, find-skills, skill-creator | 3 |

---

## 2. EL DESEQUILIBRIO (hallazgo principal)

### Matriz de cobertura

| Capacidad | ¿Cubierta por skill? | ¿Cubierta por Gabinete? |
|---|---|---|
| Inteligencia de competencia | ✅ competitor-intel | — |
| Inteligencia de gobierno abierto | ✅ gov-intel-opensource | — |
| Radar legislativo LNETB | ✅ pol-radar-legislativo | E2 parcial |
| Actores políticos municipales | ✅ pol-intel-municipal | — |
| Auditoría territorial | ✅ pol-audit-territorial | — |
| Mercados vacíos (océanos azules) | ✅ oceanos-azules-hunter | — |
| Contrataciones municipales | ✅ municipal-procurement | — |
| Sentimiento ciudadano | ✅ citizen-sentiment | — |
| Conexión LlaveMX | ✅ llavemx-connector | E13 parcial |
| Portal WhatsApp | ✅ whatsapp-citizen-portal | — |
| **Calidad de código / build** | ❌ | ✅ E15 |
| **Deuda técnica / refactor** | ❌ | ✅ E15 |
| **UX / diseño de servicios** | ⚠️ autoclaw-design (genérico) | ✅ E14 |
| **Accesibilidad / inclusión** | ❌ | ✅ E10 |
| **Ciberseguridad / datos** | ❌ | ✅ E3 |
| **Derecho administrativo LNETB** | ⚠️ pol-radar (legislativo, no aplicación) | ✅ E2 |
| **Hacienda / finanzas** | ❌ | ✅ E4 |
| **Salud / agricultura / turismo / urbanismo** | ❌ | ✅ E5-E8 |

### Conclusión del hallazgo

> **Los skills cubren el 100% de la inteligencia externa. El Gabinete cubre el 100% de la ejecución del producto. Pero la ejecución del producto NO está en formato skill — está congelada en un markdown que nadie ejecuta.**

Esto significa: hoy, cuando quiero mejorar el código, NO tengo un skill de "auditoría de deuda técnica" o "revisión UX gov.uk" que invocar. Lo hago "a mano" (como hice la auditoría de código ayer). El conocimiento de E15 y E14 existe, pero no está accesible como procedimiento.

---

## 3. ¿CUÁL ES MÁS FUERTE?

### Veredicto técnico

| Sistema | Para qué es más fuerte |
|---|---|
| **Skills OpenClaw** | **Ejecución** — son el mecanismo nativo. Lo que no está en skill, no se ejecuta de forma reproducible. |
| **Gabinete 15** | **Conocimiento** — captura expertise de dominio que ningún skill genérico tiene. |

**La respuesta no es "uno u otro". Es:** el Gabinete tiene el conocimiento, pero le falta la forma ejecutable. Los skills tienen la forma, pero les falta el conocimiento de dominio del Gabinete.

### Lo que hay que hacer

Convertir el **conocimiento del Gabinete** en **skills ejecutables**, sin perder las reglas de gobernanza (anclaje al código, anti-ego, formato de intervención).

---

## 4. PROPUESTA DE LEGADO DE SKILLS

### Principio rector

> **No convertir los 15 especialistas en 15 skills uno-a-uno.** Eso duplicaría el problema (15 skills difíciles de mantener). En su lugar, agrupar por **capacidad ejecutable** que el agente principal pueda invocar.

### Los skills que SÍ faltan (para crear)

| # | Skill propuesto | Absorbe del Gabinete | Qué ejecuta |
|---|---|---|---|
| 1 | **soatm-code-audit** | E15 | Auditoría de código: build, deuda técnica, componentes huérfanos, tests, bundle size |
| 2 | **soatm-ux-review** | E14 + E10 | Revisión UX estilo gov.uk: pasos/minutos, accesibilidad, bundle, completable sin mouse |
| 3 | **soatm-security-review** | E3 | Auditoría de seguridad: firestore.rules, keys expuestas, minimización de datos LGPDPPSO |
| 4 | **soatm-legal-compliance** | E2 | Verificación LNETB artículo por artículo contra código (distinguir cumplido/en proceso/hoja de ruta) |
| 5 | **soatm-finanzas** | E4 | Trazabilidad de pagos: folio verificable, conciliación, partida de ingreso |
| 6 | **soatm-gabinete-plenaria** | Reglas del Gabinete | Orquesta la sesión plenaria: lanza N sillas como sub-agentes con su prompt base, produce acta en `docs/actas/` |

### Los skills que ya existen y se conectan al legado

Los 10 skills de dominio (pol-radar, gov-intel, etc.) se quedan como están — cubren la inteligencia externa. Solo hay que **referenciarlos desde un índice maestro**.

### Lo que NO hay que hacer

- ❌ No crear 15 skills uno-a-uno (mantenimiento inviable)
- ❌ No borrar el Gabinete (es la fuente de verdad del conocimiento de dominio)
- ❌ No duplicar los 10 skills de inteligencia ya existentes

---

## 5. PLAN DE EJECUCIÓN (3 fases)

### Fase 1 — Índice maestro de capacidades

Crear `docs/agentes/INDICE_CAPACIDADES.md` que mapee:
- Los 15 especialistas → qué skill ejecuta su conocimiento
- Los 30 skills → qué capacidad cubren
- Los huecos → qué falta crear

### Fase 2 — Crear los 6 skills faltantes

Usar `skill_workshop` (acción `create`) para los 6 skills propuestos. Cada uno con:
- `name` + `description` (≤160 bytes) para descubrimiento
- Prompt base heredado del especialista correspondiente
- Reglas de verificación (anclaje al código, formato HALLAZGO/RECOMENDACIÓN)
- Output en `docs/` con nombre verificable

### Fase 3 — Primera plenaria real

Ejecutar `soatm-gabinete-plenaria` lanzando 3 sillas (E2 Derecho, E14 UX, E15 Ingeniería) sobre el hallazgo más urgente: componentes huérfanos + KPIs inflados. Producir acta `docs/actas/Acta_006_...md`.

---

## 6. DECISIÓN QUE NECESITO DE MIGUEL

Antes de ejecutar, necesito decidir juntos:

1. **¿Convertir 6 skills o los 15 uno-a-uno?** (recomiendo 6 agrupados)
2. **¿Los skills van a `~/.openclaw-autoclaw/skills/` (instalados, ejecutables) o a `docs/agentes/` (proyecto, versionados)?** (recomiendo: ejecutables en skills, fuente de verdad en docs)
3. **¿Arrancamos con la plenaria de 3 sillas (E2+E14+E15) o esperamos a tener los 6 skills?**

---

*Auditoría de capacidades — 13 agosto 2026*
