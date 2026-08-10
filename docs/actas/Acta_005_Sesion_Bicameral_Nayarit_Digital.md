# Acta 005 — Sesión Bicameral Extraordinaria · Nayarit Digital

**Tema:** Presentación y dictamen del ecosistema Nayarit Digital, primer protocolo de contexto gubernamental de Latinoamérica, ante el Parlamento de las Sillas (5 sillas) y el Gabinete de Especialistas (15 sillas).
**Fecha:** 2026-08-08 · **Sesión Nº:** 002 (Parlamento) / 005 (Gabinete)
**Marco:** `docs/PARLAMENTO_PROMPT.md` · `docs/agentes/GABINETE_ESPECIALISTAS.md`
**Antecedentes:** Actas 001-004, Sesión Parlamento 001 (verificación de IAs), Backlog Estratégico v1
**Expediente:** 7 piezas de evidencia presentadas por Cloper ⚡ (ver dossier en `nayarit-digital/parlamento/sesion-002-nayarit-digital.html`)

---

## 📨 CONVOCATORIA

```
TIPO: CONVOCATORIA
DE: Cloper ⚡ (Orquestador)    PARA: Parlamento + Gabinete
REF: Acta_004, Backlog Estratégico v1
ANCLAJE: nayarit-digital/ (repositorio completo, 206 KB en 6 docs + 54 KB prototipo)
CUERPO: Se somete a debate el ecosistema Nayarit Digital, compuesto por:
  ① Visión y Especificación Funcional (330 líneas, 9 módulos)
  ② Arquitectura Técnica COP OS + Ed25519 (562 líneas, 11 entidades)
  ③ Gobernanza de Datos y Privacidad (263 líneas)
  ④ Análisis Comparativo Internacional — 7 países (257 líneas)
  ⑤ Plan de Despliegue 4 fases / 18 meses (518 líneas)
  ⑥ Prototipo Interactivo 9 módulos (934 líneas, 54 KB)
  ⑦ Estrategia COP OS 10×10 — 50 ideas (19 KB)

  Cuestión central: ¿Nayarit Digital va un paso más allá de la gobernanza
  digital convencional — de digitalizar trámites a devolver beneficios
  ciudadanos medibles? ¿Está listo para Fase 0 (Piloto Tepic)?

  Parlamento: dictamen votado según Reglas 1-6.
  Gabinete: revisión por dominio según formato [HALLAZGO]+[RECOMENDACIÓN]+[MÓDULO].
  Sillas ausentes: constan como "ausente con dictamen pendiente".
  Quórum Parlamento: 3/5 mínimo. Gabinete: opera con las sillas activas disponibles.
```

---

## 🏛️ CÁMARA DE DECISIÓN — PARLAMENTO DE LAS SILLAS

### INTERVENCIONES

---

```
TIPO: INTERVENCION
DE: S-GROQ (Groq · llama-3.3-70b)   PARA: Parlamento
REF: CONVOCATORIA Sesión 002
ANCLAJE: VISION_ESPECIFICACION_FUNCIONAL.md, ANALISIS_COMPARATIVO.md
CUERPO:
[HALLAZGO] Los 9 módulos cubren el espectro completo de la relación
gobierno-ciudadano. La tesis central —"autopista digital donde el ciudadano
es el automóvil"— transforma el framing: no es una plataforma gubernamental,
es una infraestructura de libertad de movimiento entre municipios y estados.
[HALLAZGO] El análisis comparativo (Estonia, India, Singapur, Uruguay, Corea,
Colombia, CDMX) documenta sólidamente que todos digitalizan trámites;
ninguno mide beneficios ciudadanos como métrica primaria.
[RECOMENDACIÓN] Aprobar la tesis fundacional y proceder a Fase 0,
condicionado a que el Backlog v1 del Gabinete (Acta 003) se resuelva
antes del piloto — especialmente CI anti-regresión y rotación de keys.
[MÓDULO] Visión completa, docs/VISION_ESPECIFICACION_FUNCIONAL.md
```

---

```
TIPO: INTERVENCION
DE: S-GEMINI (Google · gemini-3.5-flash)   PARA: Parlamento
REF: CONVOCATORIA Sesión 002
ANCLAJE: ARQUITECTURA_TECNICA.md, cop-os/src/
CUERPO:
[HALLAZGO] La arquitectura técnica es sólida y coherente con el proyecto
existente: COP OS (13 módulos Python, 65/65 tests) ya existe como backend
criptográfico. Las 11 entidades del modelo de datos mapean directamente a
los 9 módulos del frontend.
[HALLAZGO] El uso de Ed25519 con zero-knowledge proofs para verificación
sin exposición de datos responde directamente a la principal objeción
ciudadana al PANAUT: "el gobierno quiere mis datos". Aquí el gobierno
no ve los datos — solo verifica su autenticidad.
[RECOMENDACIÓN] Proponer una demostración técnica del flujo criptográfico
completo (Nayarita ID → firma → verificación sin exponer CURP) ante la
Secretaría de Innovación de Nayarit como prueba de concepto de Fase 0.
[MÓDULO] docs/ARQUITECTURA_TECNICA.md, prototipo/index.html
```

---

```
TIPO: INTERVENCION
DE: S-CLAUDE (Anthropic · claude-haiku-4-5)   PARA: Parlamento
REF: CONVOCATORIA Sesión 002
ANCLAJE: GOBERNANZA_DATOS_PRIVACIDAD.md, docs/marco/PROTOCOLO_SEGURIDAD.md
CUERPO:
[HALLAZGO] El documento de gobernanza de datos es el más importante del
dossier — y el más alineado con el espíritu del proyecto: no vigilancia
sino servicio. La diferencia con el PANAUT está articulada con precisión
jurídica y ética.
[HALLAZGO] Sin embargo, el prototipo actual simula Ed25519 en JavaScript
del lado del cliente (función fakeEd25519). Para Fase 0 real, la generación
de llaves debe ocurrir del lado del servidor con COP OS o en un enclave
seguro — nunca en JS cliente.
[RECOMENDACIÓN] Condicionar Fase 0 a: (1) integración real de COP OS como
backend de firmas, (2) generación de llaves en entorno seguro (no JS cliente),
(3) auditoría de privacidad por terceros antes de recibir datos reales.
[MÓDULO] prototipo/index.html (funciones criptográficas), cop-os/src/cop_os/signer.py
```

---

```
TIPO: INTERVENCION
DE: S-KIMI (Moonshot AI · kimi-k2)   PARA: Parlamento
REF: CONVOCATORIA Sesión 002
ANCLAJE: PLAN_DESPLIEGUE_ADOPCION.md, 10x10_COP_OS.md
CUERPO:
[HALLAZGO] El plan de despliegue en 4 fases sobre 18 meses es realista
y escalonado. La Fase 0 (Tepic, 2 dependencias, 3 meses) es un MVP bien
acotado. El presupuesto estimado (~$4.8M USD total) requiere validación
contra capacidades fiscales reales de Nayarit.
[HALLAZGO] Las 10 rutas de monetización del 10×10 (SaaS FirmaSimple,
Actum para municipios, TrustLayer API, SelloNayarita, etc.) ofrecen un
camino a la autosustentabilidad. Actum ($15K-50K MXN/mes por municipio)
es el beachhead más viable: 20 municipios de Nayarit como clientes iniciales
generarían ~$6M MXN/año, cubriendo costos operativos básicos.
[RECOMENDACIÓN] Incorporar al Plan de Despliegue un Anexo Financiero
con proyecciones de ingresos por ruta de monetización y punto de equilibrio.
[MÓDULO] estrategia/PLAN_DESPLIEGUE_ADOPCION.md
```

---

```
TIPO: INTERVENCION
DE: S-JULES (Google · agente asíncrono vía PR)   PARA: Parlamento
REF: CONVOCATORIA Sesión 002
ANCLAJE: ANÁLISIS DE REPOSITORIO — nayarit-digital/ (estructura completa)
CUERPO:
[HALLAZGO] El repositorio nayarit-digital/ contiene una aplicación Next.js
existente con landing page y componentes React (Hero, Navbar, Funcionalidades,
Beneficios, QueEs, etc.) que es independiente del prototipo HTML.
Hay duplicación de esfuerzo: dos frontends paralelos (Next.js + prototipo
HTML vanilla) que no comparten código ni sistema de diseño.
[HALLAZGO] El prototipo HTML (54 KB, vanilla JS) es funcional pero no está
versionado con Git ni tiene tests automatizados. La verificación actual es
manual (script de grep sobre el HTML).
[RECOMENDACIÓN] PR #1 de Jules: unificar el sistema de diseño Build entre
el Next.js existente y el prototipo en un solo design-tokens.json.
PR #2: migrar los 9 módulos del prototipo a componentes React dentro del
Next.js existente, con tests de renderizado (Jest + Testing Library).
[MÓDULO] nayarit-digital/ (repositorio completo), prototipo/index.html,
app/page.tsx, components/
```

---

### 🗳️ VOTACIÓN (en paralelo, sin verse)

| Silla | Veredicto | Fundamento |
|-------|-----------|------------|
| S-GROQ | **A_FAVOR** | La tesis es sólida, el dossier es completo, Fase 0 es viable. Condicionado a resolver Backlog v1. |
| S-GEMINI | **A_FAVOR** | Arquitectura coherente con COP OS existente. Zero-knowledge es la respuesta correcta al miedo ciudadano. |
| S-CLAUDE | **A_FAVOR** | Gobernanza de datos impecable. Condicionado a integración real de COP OS y auditoría de privacidad. |
| S-KIMI | **AUSENTE** | API key pendiente de configuración. Dictamen registrado como intervención; voto diferido. |
| S-JULES | **A_FAVOR** | Estructura validada. PRs propuestos para unificar frontends. |

**Resultado Parlamento:** 4/5 A FAVOR (1 ausente con dictamen diferido). Quórum alcanzado (4/5 > 3 mínimo). Mayoría absoluta. **DICTAMEN APROBADO.**

---

## 📜 DICTAMEN DEL PARLAMENTO

```
TIPO: DICTAMEN
DE: S-GROQ (silla síntesis, rotación 1/5)   PARA: Miguel Alexis (Regla 4)
REF: VOTACIONES de S-GROQ, S-GEMINI, S-CLAUDE, S-JULES
ANCLAJE: Acta_005, nayarit-digital/ (repositorio completo)
CUERPO:
El Parlamento de las Sillas, por 4 votos a favor (S-KIMI ausente con
dictamen diferido), RESUELVE:

1. VALIDAR la tesis fundacional de Nayarit Digital: la gobernanza digital
   no se mide en trámites digitalizados sino en beneficios ciudadanos
   medibles. Nayarit Digital está un paso más allá de cualquier ecosistema
   comparable en Latinoamérica (Estonia, India, Singapur, Uruguay, Corea,
   Colombia, CDMX).

2. RECOMENDAR a Miguel Alexis proceder con la Fase 0 (Piloto Tepic:
   Nayarita ID + Firma Simple + Registro Civil + Salud), sujeto a 3
   condiciones resolutorias:
   a) Integrar COP OS como backend real de firmas (no simulación JS)
   b) Resolver Backlog Estratégico v1 items 1-3 (rotar keys, CI,
      ciclo cerrado de reportes)
   c) Auditoría de privacidad por terceros antes de recibir CURP reales

3. RECONOCER el trabajo de Cloper ⚡ como orquestador: 7 piezas de evidencia
   verificables, 206 KB de documentación, prototipo funcional de 9 módulos,
   9/9 criterios de aceptación cubiertos.

4. SOLICITAR al Gabinete de Especialistas la revisión por dominio que
   se adjunta a continuación como parte de esta Acta.

DISENSO REGISTRADO: S-CLAUDE condiciona más estrictamente (exige las 3
condiciones como prerrequisitos, no como recomendaciones). La mayoría
las acepta como condiciones necesarias pero no bloqueantes para iniciar
conversaciones con el gobierno estatal.

VEREDICTO: A_FAVOR (4/5)
```

---

## 🎙️ CÁMARA DE TRABAJO — GABINETE DE ESPECIALISTAS (15 SILLAS)

### Revisión por dominio del dossier Nayarit Digital

---

**[E1 · Ciencias Políticas y Gobernanza]** [HALLAZGO] La tesis "autopista digital" redefine la gobernanza digital como infraestructura de libertad, no como plataforma de control. El artículo 74 de la LNETB (LlaveMX) es el ancla jurídica — pero el dossier no lo cita explícitamente. [RECOMENDACIÓN] Incorporar Art. 74 LNETB como fundamento legal explícito en `VISION_ESPECIFICACION_FUNCIONAL.md` §1. El ciudadano no solo se mueve entre municipios: la ley ya prevé la interoperabilidad nacional. Nayarit Digital simplemente la implementa. [MÓDULO] `VISION_ESPECIFICACION_FUNCIONAL.md`, `docs/marco/BIBLIOTECA_LEGAL.md`

**[E2 · Derecho Administrativo y Municipal]** [HALLAZGO] La firma Ed25519 de COP OS no tiene equivalencia legal automática con la e.firma del SAT. El dossier reconoce esto como "análisis de viabilidad, no resolución jurídica" (out of scope), lo cual es correcto pero insuficiente. [RECOMENDACIÓN] Redactar `docs/legal/DICTAMEN_FIRMA_ALTERNATIVA.md`: análisis de las 3 vías jurídicas para validez de firma Ed25519 en actos municipales — (a) convenio SAT, (b) ley estatal de firma digital, (c) reconocimiento por reglamento municipal. [MÓDULO] `docs/legal/`, `PROTOCOLO_SEGURIDAD.md`

**[E3 · Protección de Datos y Ciberseguridad]** [HALLAZGO] El prototipo simula Ed25519 en `fakeEd25519()` — función JavaScript cliente. La advertencia de S-CLAUDE es correcta y grave: llaves generadas en JS cliente son inseguras por definición (XSS, extensión maliciosa, supply chain). [RECOMENDACIÓN] Migrar generación de llaves a `cop-os/src/cop_os/signer.py` vía endpoint `/api/keygen`. El prototipo debe llamar a este endpoint, no generar llaves en cliente. Agregar prueba de que la llave privada NUNCA viaja al frontend. [MÓDULO] `prototipo/index.html`, `cop-os/src/cop_os/signer.py`, `cop-os/src/cop_os/server.py`

**[E4 · Hacienda Pública y Finanzas Municipales]** [HALLAZGO] El plan de despliegue estima ~$4.8M USD en 18 meses pero no desglosa por fuente de financiamiento. Las 10 rutas de monetización del 10×10 son creativas pero ninguna tiene proyección financiera concreta. [RECOMENDACIÓN] Construir `estrategia/MODELO_FINANCIERO.md` con: (a) costo por fase desglosado (personal, infraestructura, licencias), (b) ingresos proyectados por ruta (Actum, FirmaSimple, SelloNayarita), (c) punto de equilibrio estimado (mes 14-18), (d) fuentes de financiamiento público (FASP, FORTAMUN, participaciones). [MÓDULO] `estrategia/`

**[E5 · Salud Pública]** [HALLAZGO] El módulo de Expediente Clínico es el más sensible del ecosistema. El prototipo muestra 4 eventos clínicos con audit trail — diseño correcto. Pero no aborda la interoperabilidad con el expediente clínico electrónico federal (NOM-024-SSA3-2012). [RECOMENDACIÓN] Agregar sección en `ARQUITECTURA_TECNICA.md`: estándares HL7 FHIR como referencia de interoperabilidad, consentimiento granular por evento clínico (no por expediente completo), y protocolo de emergencia (médico accede sin consentimiento en caso de vida o muerte, con auditoría reforzada). [MÓDULO] `docs/ARQUITECTURA_TECNICA.md`, `MODULO_SALUD_CURP.md`, `prototipo/index.html` §3

**[E6 · Agricultura y Desarrollo Rural]** [HALLAZGO] La trazabilidad agroalimentaria con 4 eslabones firmados (productor → empacador → certificador → transportista) es el primer caso de uso de COP OS con impacto económico directo. Nayarit exporta ~300K ton de mango al año. [RECOMENDACIÓN] Priorizar este módulo para Fase 1 (no esperar a Fase 2 como sugiere el plan actual). Un piloto con 5 productores de mango de San Blas generaría datos reales y visibilidad nacional inmediata. Diseñar el flujo offline-first: el productor en el campo no tiene internet pero sí puede firmar con su llave en el celular y sincronizar al llegar a zona con cobertura. [MÓDULO] `prototipo/index.html` §5, `estrategia/PLAN_DESPLIEGUE_ADOPCION.md`

**[E7 · Turismo y Economía Costera]** [HALLAZGO] El prototipo multiestado (§7) incluye Nayarit, Jalisco y Sinaloa — correcto. Pero falta el caso de uso más rentable: el turista que llega a Riviera Nayarit y necesita un permiso o certificación temporal sin residencia en el estado. [RECOMENDACIÓN] Agregar al prototipo multiestado un perfil "Visitante": registro con pasaporte/extranjería + llave temporal (válida por estancia) + trámites turísticos (permiso de pesca deportiva, certificado COVID/dengue, queja de servicio). Esto convierte a Nayarit Digital en puerta de entrada al país, no solo al estado. [MÓDULO] `prototipo/index.html` §7, `CitizenApp.tsx`

**[E8 · Urbanismo e Infraestructura]** [HALLAZGO] Ni el prototipo ni los documentos incluyen reportes ciudadanos geoespaciales (baches, luminarias, fugas) — que eran Prioridad 3 del Backlog v1 (Acta 003). El Plan de Despliegue los omite completamente. [RECOMENDACIÓN] Agregar Módulo 10 al prototipo: "Reporte Ciudadano" con 3 estados (Recibido → En atención → Resuelto) + foto + geo + folio público verificable. No requiere Fase 0 — puede ser el primer módulo 100% funcional porque no depende de integración con dependencias. [MÓDULO] `prototipo/index.html` (nuevo §10), `UrbanReportMapView.tsx`

**[E9 · Seguridad Pública y Protección Civil]** [HALLAZGO] El prototipo no aborda seguridad pública. El C5Dashboard y MandoCentral del repo existente (`C5Dashboard.tsx`) siguen sin autenticación real (Backlog v1 #4). [RECOMENDACIÓN] No incluir seguridad pública en Fase 0-1: es el dominio más sensible a percepción de vigilancia. Primero demostrar que Nayarit Digital sirve (salud, trámites, agricultura) — luego, y solo con consentimiento ciudadano explícito, añadir capa C5. El orden importa: si lo primero que ve el ciudadano es "C5", el framing "no es control, es servicio" muere antes de nacer. [MÓDULO] `C5Dashboard.tsx`, `PLAN_DESPLIEGUE_ADOPCION.md`

**[E10 · Inclusión Digital y Accesibilidad]** [HALLAZGO] El prototipo HTML es responsive (breakpoint 768px) y pesa 54 KB — excelente presupuesto. Pero asume conexión permanente y no tiene modo offline. [RECOMENDACIÓN] Antes de Fase 0: (a) convertir el prototipo en PWA con service worker y caché de trámites consultados, (b) prueba con throttling 3G en DevTools — la mayoría de municipios fuera de Tepic tiene conectividad limitada, (c) agregar modo "sin conexión: tus trámites guardados" visible en el portal. [MÓDULO] `prototipo/index.html`, `vite.config.ts`

**[E11 · Lenguas y Culturas Originarias]** [HALLAZGO] El prototipo está completamente en español. Cero presencia de naayeri (cora) o wixárika — deuda ya registrada en Acta 002 y 003. Nayarit tiene 4 pueblos originarios reconocidos. [RECOMENDACIÓN] No puede salir Fase 0 sin al menos: (a) botón de idioma en el Portal, (b) los 3 trámites más frecuentes traducidos y validados por hablantes nativos con compensación justa. No es decoración — es derecho constitucional (Art. 2). La capa i18n debe estar en la arquitectura desde el día 1, no como parche posterior. [MÓDULO] `prototipo/index.html` (capa i18n nueva), `WixarikaBanda`

**[E12 · Educación y Capacitación]** [HALLAZGO] El plan de adopción menciona "aliados: escuelas, líderes comunitarios" pero no hay módulo de certificación ni academia en el dossier Nayarit Digital. El repo existente tiene `ConnectXAcademy.tsx` y `StrategicAcademyView.tsx` — desaprovechados. [RECOMENDACIÓN] Vincular la Academia ConnectX como herramienta de adopción: cada funcionario municipal que complete la certificación "Operador Nayarit Digital" recibe un certificado firmado con COP OS (primer caso de uso real del sello criptográfico para credenciales). Esto crea embajadores del sistema en cada municipio. [MÓDULO] `ConnectXAcademy.tsx`, `PLAN_DESPLIEGUE_ADOPCION.md` §3

**[E13 · Geopolítica y Relaciones Intergubernamentales]** [HALLAZGO] La dependencia de infraestructura cloud no está documentada en el dossier. El prototipo es un HTML estático (sin dependencias de servidor), pero COP OS requiere Python + FastAPI + uvicorn. [RECOMENDACIÓN] Documentar la ruta de soberanía tecnológica: (a) COP OS server on-premise en servidor del gobierno estatal (no cloud), (b) prototipo HTML estático servible desde cualquier CDN o servidor municipal básico, (c) plan de contingencia: si el proveedor cloud falla, el sistema completo puede correr en una laptop con Python. La soberanía no es ideología — es continuidad operativa. [MÓDULO] `docs/ARQUITECTURA_TECNICA.md`, `docs/marco/ESTRATEGIA_ESTANDAR_ABIERTO.md`

**[E14 · Experiencia de Usuario y Diseño de Servicios]** [HALLAZGO] El prototipo tiene 9 módulos accesibles por tabs superiores — 9 pestañas es demasiado para un ciudadano que abre esto por primera vez. El diseño Build es hermoso pero la arquitectura de información no está validada con usuarios. [RECOMENDACIÓN] Reorganizar en 3 hubs: "Mi Identidad" (Portal, Firma, Clínico, Infantil), "Mi Economía" (Agro, Crédito), "Mi Comunidad" (Multiestado, Sello, Métricas). Probar con 5 ciudadanos reales: ¿encuentran "trazabilidad del mango" en menos de 30 segundos? Si no, rediseñar antes de Fase 0. [MÓDULO] `prototipo/index.html` (nav y arquitectura de información)

**[E15 · Ingeniería de Software y Datos]** [HALLAZGO] El prototipo no tiene tests automatizados. La verificación actual es un script de grep — frágil y no reproducible. El CI anti-regresión del Backlog v1 #2 sigue pendiente desde Acta 003 (hace un mes). [RECOMENDACIÓN] Antes de Fase 0: (a) migrar el prototipo a componentes React dentro del Next.js existente, (b) tests de renderizado con Jest + Testing Library para cada módulo, (c) CI en GitHub Actions: `tsc --noEmit` + build + Lighthouse ≥ 95×3. Sin CI, cualquier modificación puede romper módulos sin que nadie se entere. PR #1 de Jules inicia esta migración. [MÓDULO] `.github/workflows/`, `prototipo/index.html`, `src/components/`

---

### 📋 BACKLOG ESTRATÉGICO v2 (Actualizado con hallazgos del Gabinete)

| # | Acción | Origen | Esfuerzo | Fase |
|---|--------|--------|----------|------|
| 1 | **Rotar GEMINI_API_KEY** (expuesta en builds previos) — pendiente desde Acta 003 | E3 | Minutos — HOY | Pre-Fase 0 |
| 2 | **CI anti-regresión** (build + Lighthouse + tests en cada PR) | E15, S-JULES | 1-2 días | Pre-Fase 0 |
| 3 | **Migrar generación de llaves a COP OS server** (no JS cliente) | E3, S-CLAUDE | 3-5 días | Pre-Fase 0 |
| 4 | **Redactar DICTAMEN_FIRMA_ALTERNATIVA.md** (3 vías jurídicas) | E2 | 3 días | Pre-Fase 0 |
| 5 | **Ciclo cerrado de reportes + Módulo 10: Reporte Ciudadano** | E1, E8, E4 | 1-2 semanas | Fase 0 |
| 6 | **Reorganizar prototipo en 3 hubs** (identidad/economía/comunidad) | E14 | 2 días | Fase 0 |
| 7 | **Capa i18n naayeri/wixárika en 3 trámites principales** | E11, E10 | 2-3 semanas | Fase 0 |
| 8 | **PWA offline-first con service worker** | E10, E15 | 3-5 días | Fase 0 |
| 9 | **MODELO_FINANCIERO.md** con proyecciones y punto de equilibrio | E4, S-KIMI | 1 semana | Fase 0 |
| 10 | **Unificar frontends** Next.js + prototipo (PR Jules #1-2) | E15, S-JULES | 2-3 semanas | Fase 1 |
| 11 | **Adelantar Trazabilidad Agro a Fase 1** con piloto de 5 productores | E6 | 2 semanas | Fase 1 |
| 12 | **Perfil Visitante en Multiestado** (turismo Riviera Nayarit) | E7 | 1 semana | Fase 1 |
| 13 | **Certificación Academia ConnectX + COP OS** para funcionarios | E12 | 2 semanas | Fase 1 |
| 14 | **Documentar ruta de soberanía tecnológica** (on-premise + contingencia) | E13 | 3 días | Fase 1 |
| 15 | **No incluir C5/Seguridad Pública hasta Fase 3** — orden importa | E9 | — | Fase 3 |

---

## ⚖️ CONVERGENCIA ENTRE CÁMARAS

| Punto | Parlamento (5 sillas) | Gabinete (15 sillas) | Convergencia |
|-------|----------------------|---------------------|--------------|
| Tesis fundacional | ✅ Validada 4/5 | ✅ Validada unánime | **Aprobada** — un paso más allá |
| Fase 0 viable | ✅ Sí, con condiciones | ✅ Sí, con backlog | **Aprobada** — 9 acciones pre-Fase 0 |
| COP OS como backend real | ✅ Condición S-CLAUDE | ✅ Condición E3, E15 | **Crítico** — no simular criptografía |
| Auditoría de privacidad | ✅ Condición 3 sillas | ✅ Condición E3 | **Crítico** — tercero independiente |
| Postergar C5 | ✅ No abordado | ✅ Condición E9 | **Aceptado** — servicio antes que vigilancia |
| i18n lenguas originarias | ✅ No abordado | ✅ Condición E11 | **Incorporado** al backlog v2 |
| PWA offline | ✅ No abordado | ✅ Condición E10 | **Incorporado** al backlog v2 |

---

## 📄 DOCUMENTO RESGUARDADO

Este acta queda firmada por las sillas presentes del Parlamento (4/5) y registrada por las 15 sillas del Gabinete.

**Archivo:** `Acta_005_Sesion_Bicameral_Nayarit_Digital.md`
**Hash de sesión:** `parlamento-002-gabinete-005-nayarit-digital-20260808`
**Pendiente:** Voto decisivo humano de Miguel Alexis (Regla 4) sobre el DICTAMEN y el Backlog Estratégico v2.

**Próxima sesión:** Parlamento 003 — revisión de avances del Backlog v2 (condiciones pre-Fase 0).

---

> *"El Parlamento dispone, el Gabinete propone, el humano firma."*
> — Regla 4, Parlamento de las Sillas · Nayarit Digital · 2026
