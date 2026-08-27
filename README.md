# Protocolo de Gobernanza Digital AI

Aplicación de Gobernanza Digital y Portal Ciudadano — SOATM de Tepic (Nayarit Digital / ConnectX). Este repositorio es la fuente de verdad del proyecto: código, marco legal, expediente de presentación institucional y auditorías conviven aquí, no solo el producto.

Estado real del código (auditado 2026-08-25): `docs/marco/modulos/INDICE.json` — 29 módulos verificados uno por uno contra el código.

## Producto

- [**Orbe Central — mapa modular del ecosistema**](./docs/orbe/README.md) — Un círculo = un módulo = un archivo. Índice de todos los círculos (Llave e Identidad, Expediente Familiar, TEPICTU Salud, Tesorería, Obras, Servicios Públicos, Bienestar, Pulso, Protección Digital) con registro `modulos.json` legible por máquina. Herramientas visuales: `docs/orbe/orbe.html`, `orbe-3d.html`, `cop.html`.
- [**Pulso Nayarit**](./pulso-nayarit/README.md) — Auditoría cívica open source: preferencia electoral ciudadana en tiempo real con libro mayor auditable. Backend Supabase/Postgres real y verificado (ver `docs/marco/PENDIENTES_AUDITORIA_2026-08.md` — aislado de la app principal, sin URL pública todavía).
- [**Soberanía Digital Infantil (SINISI)**](./docs/marco/soberania-digital-infantil/README.md) — Propuesta federal: identidad digital soberana para niñas, niños y adolescentes sobre la infraestructura de las Becas Benito Juárez.
- **Context.OS (laboratorio)** — [`contextos/`](./contextos/README.md) + `shared/semantic/`: vertical slice real (no productivo) del control plane de contexto — IntentEnvelope → Policy → Consent → Adapter → EvidenceRecord. Apagado por defecto (`VITE_CONTEXTOS_BRIDGE_ENABLED`).

## Marco normativo y gobernanza (`docs/marco/`)

Todo documento de gobernanza vive aquí — es público y forma parte del producto, no un anexo interno.

- [`BIBLIOTECA_LEGAL.md`](./docs/marco/BIBLIOTECA_LEGAL.md) — base normativa citada artículo por artículo (CPEUM, LNETB, leyes estatales de Nayarit, NOMs), con estatus VERIFICADO / POR VERIFICAR por cada cita.
- [`MARCO_CUMPLIMIENTO_LNETB.md`](./docs/marco/MARCO_CUMPLIMIENTO_LNETB.md) — 11 renglones de cumplimiento contra la Ley Nacional para Eliminar Trámites Burocráticos, con evidencia archivo:línea (corregido 2026-08-25 tras auditoría).
- [`GLOSARIO_OFICIAL.md`](./docs/marco/GLOSARIO_OFICIAL.md) — vocabulario y regla de citación pública.
- [`ESTRUCTURA_REPOSITORIO.md`](./docs/marco/ESTRUCTURA_REPOSITORIO.md) — árbol canónico y reglas de rama/commit (Acta 005).
- [`PROTOCOLO_SEGURIDAD.md`](./docs/marco/PROTOCOLO_SEGURIDAD.md), [`NOTA_DE_CONTEXTO_PARA_CLAUDE.md`](./docs/marco/NOTA_DE_CONTEXTO_PARA_CLAUDE.md), [`OCEANOS_AZULES.md`](./docs/marco/OCEANOS_AZULES.md), [`PLAN_TRABAJO_MUNICIPAL.md`](./docs/marco/PLAN_TRABAJO_MUNICIPAL.md), [`ESTRATEGIA_ESTANDAR_ABIERTO.md`](./docs/marco/ESTRATEGIA_ESTANDAR_ABIERTO.md).
- [`docs/marco/modulos/`](./docs/marco/modulos/INDICE.json) — una ficha por módulo con estado, ley que lo sustenta y qué parte opera con datos reales.
- [`PENDIENTES_AUDITORIA_2026-08.md`](./docs/marco/PENDIENTES_AUDITORIA_2026-08.md) — pendientes de negocio/legal encontrados en la auditoría de código, cada uno con qué falta y dónde retomarlo.
- [`GOVERNMENT_EVIDENCE_OS.md`](./docs/marco/GOVERNMENT_EVIDENCE_OS.md) — 🔵 propuesta (sin código todavía): quinta capa de la arquitectura, memoria institucional verificable a través de administraciones (grafo temporal de evidencia, no un índice de honestidad política).
- [`ESTUDIO_CONNECTX.md`](./docs/marco/ESTUDIO_CONNECTX.md) — 🔵 propuesta: carta de aprendizaje compartido para formar ciudadanos y trabajadores burocráticos en gobernanza digital, IA y programación, usando el SOATM como terreno de práctica.

## Expediente de presentación institucional (Tepic)

Preparado para entrega a autoridad municipal/estatal — mismo estándar de honestidad que el resto del repositorio (VERIFICADO / POR VERIFICAR / PROPUESTA).

- [`docs/presentacion-tepic/`](./docs/presentacion-tepic/README.md) — expediente completo en 11 secciones: `00_INDICE_MAESTRO`, `01_PROBLEMA_PUBLICO`, `02_TRAMITE_PRIORIZADO`, `03_REINGENIERIA_Y_SIMPLIFICACION`, `04_SOLUCION_DIGITAL`, `05_MARCO_JURIDICO` (matriz norma-artículo-evidencia + fuentes primarias en PDF del DOF), `06_EVIDENCIA_TECNICA`, `07_GOBERNANZA_E_INSTITUCIONALIZACION`, `08_PILOTO_TEPIC`, `09_ALINEACION_ATDT`, `10_RIESGOS_Y_CONTRAAUDITORIA`, `11_INSTRUMENTOS_INSTITUCIONALES`.
- [`09_ALINEACION_ATDT/MATRIZ_DE_ALINEACION.md`](./docs/presentacion-tepic/09_ALINEACION_ATDT/MATRIZ_DE_ALINEACION.md) — alineación con el Modelo Nacional de Simplificación y Digitalización de la Agencia de Transformación Digital y Telecomunicaciones (ATDT): 12 de 14 componentes alineados en algún grado, 3 pendientes de acción institucional. Validado contra el código el 2026-08-25 — ver `docs/marco/VALIDACION_ATDT_LNETB_2026-08-25.md`.
- [`docs/expediente-regulatorio/`](./docs/expediente-regulatorio/README.md) — diagnóstico, marco jurídico, impacto regulatorio, interoperabilidad, simplificación y plan piloto como paquete independiente para el Análisis de Impacto Regulatorio (AIR).
- [`docs/investigacion/INVESTIGACION_ATDT_AIR.md`](./docs/investigacion/INVESTIGACION_ATDT_AIR.md) — investigación de fondo sobre el AIR y la ATDT; `REPORTE_DESCARGA_FUENTES_PRIMARIAS.md` documenta qué fuentes oficiales ya se descargaron.
- [`docs/fuentes-oficiales-y-alineacion/`](./docs/fuentes-oficiales-y-alineacion/README.md) — fuentes oficiales citables y su alineación.

## Auditorías

El repositorio se audita a sí mismo de forma recurrente — esta no es la primera vez ni será la última.

- [`docs/marco/VALIDACION_ATDT_LNETB_2026-08-25.md`](./docs/marco/VALIDACION_ATDT_LNETB_2026-08-25.md) — validación más reciente (rol ATDT + autoridad LNETB) de la matriz de alineación y la biblioteca legal contra el código real.
- [`docs/PENDIENTES_AUDITORIA_2026-08.md`](./docs/marco/PENDIENTES_AUDITORIA_2026-08.md) y el historial de commits `fix(...)`/`docs(...)` de la auditoría de coherencia 2026-08-25 (29 módulos + LNETB, con corrección de código).
- [`docs/contra-auditoria-lnetb-2026-08-11.md`](./docs/contra-auditoria-lnetb-2026-08-11.md) y [`PLAN_TRABAJO_POST_CONTRA_AUDITORIA.md`](./docs/PLAN_TRABAJO_POST_CONTRA_AUDITORIA.md).
- [`AUDITORIA_CODIGO_AGOSTO_2026.md`](./docs/AUDITORIA_CODIGO_AGOSTO_2026.md), [`AUDITORIA_DOCUMENTAL_DEL_REPOSITORIO.md`](./docs/AUDITORIA_DOCUMENTAL_DEL_REPOSITORIO.md), [`AUDITORIA_TRAZABILIDAD_NORMATIVA.md`](./docs/AUDITORIA_TRAZABILIDAD_NORMATIVA.md).
- [`docs/auditoria-orbe/`](./docs/auditoria-orbe/README.md) — auditoría específica de ORBE, Context.OS e ID.mx, con matriz de madurez tecnológica.

## Gobernanza interna del equipo

- [`docs/actas/`](./docs/actas/) — actas del Gabinete de Especialistas (decisiones formales, ej. Acta 005 que fija la estructura del repositorio).
- [`docs/agentes/`](./docs/agentes/) — inventario y auditoría de capacidades de los agentes/skills usados en el proyecto.
- [`docs/laboratorio-municipal/`](./docs/laboratorio-municipal/README.md) — laboratorio de pruebas municipales.
- `docs/interno/` — uso interno, marcado explícitamente como no público (ver `docs/marco/ESTRUCTURA_REPOSITORIO.md`, regla 6).

## Visión de producto y arquitectura

- [`docs/plataforma/`](./docs/plataforma/README.md) — `01-VISION-PRODUCTO`, `02-ARQUITECTURA-SISTEMA`, `03-DOCUMENTACION-FUNCIONAL`, `04-ARQUITECTURA-DATOS`, `05-MANUAL-DESARROLLADORES`, `06-LIBRO-BLANCO`.

## Código

- `src/` — app React 19 + TypeScript + Vite 6 + Tailwind 4 (`components/`, `hooks/`, `services/`, `lib/`).
- `server.ts` — backend Express (SQLite, Gemini, Stripe).
- `contextos/` + `shared/semantic/` — Context.OS, laboratorio (ver arriba).
- `pulso-nayarit/` — submódulo con su propio backend Supabase.
- `scripts/verificar-regresiones.mjs` — la Guardia de regresiones; corre en CI antes de cada entrega.

## Antes de contribuir

```bash
npm ci
node scripts/preparar-config.mjs   # genera firebase-applet-config.json de ejemplo si falta
npx tsc --noEmit
npx vitest run
npx vite build
node scripts/verificar-regresiones.mjs
```

Reglas de honestidad, ramas y commits: `docs/marco/ESTRUCTURA_REPOSITORIO.md` y `docs/marco/GLOSARIO_OFICIAL.md`.
