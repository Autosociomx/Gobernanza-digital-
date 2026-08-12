# ÍNDICE MAESTRO DE CAPACIDADES

**Sistema Operativo del Legado — Nayarit Digital / SOATM**
**Fecha:** 13 agosto 2026

---

## Visión

> Convertir el conocimiento de dominio (Gabinete de 15 especialistas) en capacidades ejecutables (skills), para que AutoClaw sea el brazo derecho de Miguel: cada acción suma inteligencia, capacidades y formas de entrenar a la IA.

---

## Los 3 sistemas y cómo se conectan

```
┌─────────────────────────────────────────────────────────────┐
│                    PARLAMENTO (5 sillas)                     │
│        Groq · Gemini · Claude · Kimi · Jules                │
│              Cámara de DECISIÓN (votación)                   │
└──────────────────────────┬──────────────────────────────────┘
                           │ dictamen
┌──────────────────────────▼──────────────────────────────────┐
│               GABINETE (15 especialistas)                    │
│              E1–E15 · Cámara de TRABAJO                      │
│      Conocimiento de dominio (la fuente de verdad)           │
└──────────────────────────┬──────────────────────────────────┘
                           │ se ejecuta vía
┌──────────────────────────▼──────────────────────────────────┐
│                 SKILLS EJECUTABLES (OpenClaw)                │
│      30 existentes + 6 nuevos (soatm-*)                     │
│      Procedimientos que el agente principal invoca           │
└─────────────────────────────────────────────────────────────┘
                           │
                           ▼
                 MIGUEL (voto humano decisivo)
```

---

## Mapa: Especialista → Skill ejecutable

| Especialista | Dominio | Skill que lo ejecuta | Estado |
|---|---|---|---|
| E1 | Ciencia Política | *(inteligencia: pol-intel-municipal)* | 🟡 parcial |
| E2 | Derecho Administrativo | **soatm-legal-compliance** | 🟡 propuesta |
| E3 | CISO / Datos | **soatm-security-review** | 🟡 propuesta |
| E4 | Hacienda | **soatm-finanzas** | 🟡 propuesta |
| E5 | Salud | *(no hay skill aún)* | ⚪ hueco |
| E6 | Agricultura | *(no hay skill aún)* | ⚪ hueco |
| E7 | Turismo | *(oceanos-azules-hunter parcial)* | ⚪ hueco |
| E8 | Urbanismo | *(no hay skill aún)* | ⚪ hueco |
| E9 | Seguridad Pública | *(soatm-security-review parcial)* | ⚪ hueco |
| E10 | Inclusión Digital | **soatm-ux-review** | 🟡 propuesta |
| E11 | Lenguas Originarias | *(no hay skill aún)* | ⚪ hueco |
| E12 | Educación | *(no hay skill aún)* | ⚪ hueco |
| E13 | Geopolítica | *(llavemx-connector parcial)* | ⚪ hueco |
| E14 | UX / Diseño | **soatm-ux-review** | 🟡 propuesta |
| E15 | Ingeniería Software | **soatm-code-audit** | 🟡 propuesta |

**Orquestación transversal:** `soatm-gabinete-plenaria` (ejecuta las sillas como sub-agentes).

---

## Los 30 skills existentes (inteligencia externa)

| Skill | Cubre |
|---|---|
| pol-radar-legislativo | Cambios LNETB, DOF, Congreso |
| gov-intel-opensource | APIs y datos abiertos gobierno MX |
| competitor-intel | Competencia govtech |
| pol-intel-municipal | Fichas de actores |
| pol-audit-territorial | Digitalización por municipio |
| municipal-procurement | Licitaciones y contratos |
| oceanos-azules-hunter | Mercados institucionales vacíos |
| citizen-sentiment | Quejas ciudadanas reales |
| llavemx-connector | Preparación integración LlaveMX |
| whatsapp-citizen-portal | Canal WhatsApp ciudadano |
| + 20 de soporte | Diseño, browser, media, pagos, docs, memoria |

---

## Los 6 skills nuevos (ejecución del producto)

| Skill | Propuesta ID | Hereda |
|---|---|---|
| soatm-code-audit | soatm-code-audit-20260812-81267a9fd7 | E15 |
| soatm-ux-review | soatm-ux-review-20260812-e19d37ed24 | E14 + E10 |
| soatm-security-review | soatm-security-review-20260812-f3f15c1058 | E3 |
| soatm-legal-compliance | soatm-legal-compliance-20260812-26721516be | E2 |
| soatm-finanzas | soatm-finanzas-20260812-ae9dea3be0 | E4 |
| soatm-gabinete-plenaria | soatm-gabinete-plenaria-20260812-14afeba187 | Reglas del Gabinete |

**Estado:** 🟡 pendientes de aprobación (vía skill_workshop apply).

---

## Huecos detectados (próximas fases)

Los siguientes especialistas aún no tienen skill ejecutable:

| Especialista | Por qué aún no | Cuándo crearlo |
|---|---|---|
| E5 Salud | `SaludNayaritID.tsx` existe pero no es prioridad del piloto Tepic | Fase 2 (post-piloto Constancia) |
| E6 Agricultura | Módulo no existe aún (candidato fase 2) | Fase 2 |
| E7 Turismo | Recaudación costera, no prioridad piloto | Fase 2 |
| E8 Urbanismo | `UrbanReportMapView` existe, secundario | Fase 2 |
| E9 Seguridad | C5 es interno, no se presenta a Tepic aún | Fase 2 |
| E11 Lenguas | Deuda registrada, requiere validación con hablantes | Fase 3 |
| E12 Educación | `ConnectXAcademy` no es parte del piloto | Fase 3 |
| E13 Geopolítica | llavemx-connector ya cubre lo esencial | Fase 3 |

---

## Principio de evolución

> **Cada acción tiene su reacción.** Cada skill ejecutado produce un output en `docs/` (acta, auditoría, revisión). Ese output alimenta la memoria (`memory/`), entrena a la IA, y suma una capacidad verificable al legado. Nada se ejecuta "a ciegas" — todo deja huella.

---

*Índice maestro de capacidades — 13 agosto 2026*
*Votación humana decisiva: Miguel Alexis Pérez Aguilar*
