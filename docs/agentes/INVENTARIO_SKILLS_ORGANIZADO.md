# INVENTARIO Y ORGANIZACIÓN DE SKILLS — AutoClaw / SOATM

**Fecha:** 13 agosto 2026
**Objetivo:** Clasificar los 36 skills (30 managed + 6 nuevos soatm-*) por ejecutabilidad, para activar los que funcionan y corregir el código/página para presentación.

---

## Clasificación por ejecutabilidad

### 🟢 EJECUTABLES AHORA (locales, sin dependencias externas)

| Skill | Área | Acción concreta para este proyecto |
|---|---|---|
| **soatm-code-audit** | Ingeniería | Auditar build, deuda, huérfanos, bundle |
| **soatm-ux-review** | UX/Accesibilidad | Revisar primera impresión, tipografía, flujo |
| **soatm-security-review** | Seguridad | Keys expuestas, firestore.rules, datos |
| **soatm-legal-compliance** | Derecho | Afirmaciones LNETB sostenibles |
| **soatm-finanzas** | Hacienda | Trazabilidad de pagos |
| **soatm-gabinete-plenaria** | Orquestación | Lanzar comisiones del Gabinete |
| **aesthetic-preset-library** | Diseño | Paleta/estilos visuales |
| **autoclaw-design-capability** | Diseño | Diseño UI/UX, prototipos |
| **autoclaw-design-capability_noqa** | Diseño | Diseño (variante) |
| **infinite-canvas-output** | Presentación | Canvas/visualizaciones |
| **pptx-swarm** | Presentación | Generar PPT para el Ayuntamiento |
| **memory** | Memoria | Continuidad entre sesiones |
| **hermes-evolution** | Evolución | Auto-mejora del agente |
| **find-skills** | Meta | Descubrir skills aplicables |
| **skill-creator** | Meta | Crear nuevos skills |
| **1password** | Infra | Gestión de secretos |
| **autoclaw-im-cron** | Automatización | Recordatorios/cron |

### 🟡 REQUIEREN INTERNET/BÚSQUEDA (ejecutables si hay red)

| Skill | Área | Nota |
|---|---|---|
| **pol-radar-legislativo** | Legislación | Monitorea LNETB/DOF — requiere web |
| **gov-intel-opensource** | Gobierno abierto | APIs/datos gobierno — requiere web |
| **competitor-intel** | Competencia | Proveedores govtech — requiere web |
| **pol-intel-municipal** | Actores | Fichas de funcionarios — requiere web |
| **pol-audit-territorial** | Territorio | Digitalización por municipio — requiere web |
| **municipal-procurement** | Contrataciones | Licitaciones — requiere web |
| **oceanos-azules-hunter** | Mercados | Océanos azules — requiere web |
| **citizen-sentiment** | Ciudadanía | Quejas reales — requiere web |
| **llavemx-connector** | Identidad | Integración LlaveMX — requiere web |
| **deep-research** | Investigación | Multi-búsqueda — requiere web |
| **website-builder** | Web | Construir sitios — requiere web |

> ⚠️ En este entorno `tools.web.search` y `tools.web.fetch` están **deshabilitados** (`enabled: false` en config). Los skills 🟡 no pueden ejecutarse vía web nativa; requieren `autoglm-browser-agent` (que a su vez necesita config manual).

### 🔴 REQUIEREN CONFIG/CREDENCIALES EXTERNAS (no ejecutables ahora)

| Skill | Qué falta |
|---|---|
| alipay-authenticate-wallet | Credenciales Alipay |
| alipay-payment-skill | Credenciales Alipay |
| autoglm-browser-agent-intel | `config.json` manual (browser, extension) |
| autoglm-file-upload | Config AutoGLM |
| autoglm-generate-image-seedream | API Seedream |
| autoglm-image-recognition | API AutoGLM |
| feishu-cron-reminder | Feishu (Lark) credenciales |
| whatsapp-citizen-portal | WhatsApp Business API |

---

## Plan de activación por fases

### FASE 1 — Ejecutar los 6 soatm-* (YA en curso)

- ✅ soatm-code-audit, soatm-ux-review → dictámenes entregados (Acta 005)
- 🔄 soatm-security-review (E3) + soatm-finanzas (E4) → en ejecución ahora
- ⏳ soatm-legal-compliance → ejecutar tras E2 (Acta 005 cubrió parte)

### FASE 2 — Corrección del código con base en dictámenes

Aplicar el Backlog del Acta 005 + hallazgos E3/E4:
1. Reescribir landing con lenguaje honesto (E2)
2. Hero con acción concreta (E14)
3. Quitar afirmaciones de validez jurídica en constancias (E3)
4. Rotar/retirar firebase key expuesta (E3)
5. Envolver ErrorBoundary + router (E15)
6. Limpiar clúster huérfano (E15)

### FASE 3 — Presentación (cuando haya red/config)

- pptx-swarm → deck para el Ayuntamiento
- aesthetic-preset-library → pulir estilos
- infinite-canvas-output → visualización del flujo

### FASE 4 — Inteligencia externa (cuando haya red)

- Los 11 skills 🟡 en batería: radar legislativo, gov-intel, competencia, actores, etc.

---

## Resumen numérico

| Clasificación | Cantidad | Skills |
|---|---|---|
| 🟢 Ejecutables ahora | 17 | 6 soatm + 11 locales |
| 🟡 Requieren internet | 11 | inteligencia + research + web |
| 🔴 Requieren config | 8 | alipay/autoglm/feishu/whatsapp |
| **Total** | **36** | |

---

*Inventario de skills — 13 agosto 2026*
*Prioridad de Miguel: corregir código/página para presentarla.*
