<div align="center">

# Nayarit Digital
### Estándar de Gobernanza Digital Municipal para México

**Desarrollado por [ConnectX Servicios S.A. de C.V.](mailto:conectx@nayaritdigital.mx) · Piloto: Municipio de Tepic, Nayarit · 2026**

[![Deploy](https://api.netlify.com/api/v1/badges/5f7b2f46-d573-414c-b522-b799302b7158/deploy-status)](https://tepic.netlify.app)
![Version](https://img.shields.io/badge/versión-1.0.0--tepic-2a5faf)
![Stack](https://img.shields.io/badge/stack-React%2018%20%2B%20TypeScript%20%2B%20Firebase-0d7a57)
![Licencia](https://img.shields.io/badge/licencia-propietaria-c9920a)
![Datos](https://img.shields.io/badge/datos-INEGI%20%7C%20CONEVAL%20%7C%20PEF%202026-475569)

</div>

---

## ¿Qué es Nayarit Digital?

Nayarit Digital es una plataforma de gobernanza digital municipal de ciclo completo: conecta datos oficiales federales en tiempo real, digitaliza trámites, detecta fondos federales no reclamados y entrega al gobierno municipal un panel ejecutivo con inteligencia artificial integrada.

No es un CMS. No es un portal de trámites. Es el sistema nervioso digital de un municipio.

**Caso piloto:** Municipio de Tepic, Nayarit — población 380,249 habitantes (INEGI 2020), posición actual **#847 de 2,469 municipios** en índice de gobernanza digital. Meta en 18 meses: **Top 47 nacional**.

---

## El problema que resuelve

| Problema | Magnitud | Fuente |
|---|---|---|
| Impuesto predial sin cobrar en Tepic | **$239,000,000 MXN/año** | INEGI Censo 2020 · Ley de Ingresos 2026 |
| Fondos federales disponibles sin solicitar | **$86,900,000 MXN** | PEF 2026 · DOF · datos.gob.mx |
| Trámites municipales sin digitalizar | **73 trámites** | Catálogo Nacional de Trámites Municipales |
| Tiempo ciudadano perdido en filas | **510,000 horas/año** | Estimación ConnectX sobre datos INEGI |
| Posición nacional en gobernanza digital | **#847 de 2,469** | Índice ConnectX Q3 2026 |

**Potencial financiero total año 1: $274,200,000 MXN** entre recuperación fiscal, fondos federales y ahorro operativo.

---

## Demo en vivo

🔗 **[tepic.netlify.app](https://tepic.netlify.app)** — plataforma completa en ambiente demo

La plataforma opera sin credenciales reales en modo demostración. Todos los datos del Observatorio son consultas reales a APIs oficiales (INEGI, DataMéxico, DENUE).

---

## Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                    NAYARIT DIGITAL v1.0                     │
├──────────────┬──────────────────────────┬───────────────────┤
│  Portal      │  C5 Dashboard Municipal  │  Portal           │
│  Ciudadano   │  (Panel Ejecutivo IA)    │  Empresarial      │
│  CitizenApp  │                          │                   │
├──────────────┴──────────────────────────┴───────────────────┤
│              Capa de Módulos Especializados                  │
│  Observatorio · Cazador · Pagos · Patrimonio · Auditoría    │
│  Análisis Político · Academia · Parlamento · Mapa           │
├─────────────────────────────────────────────────────────────┤
│              Capa de Datos Abiertos (openData.ts)           │
│  INEGI API · DataMéxico · DENUE · DIPOMEX · PROFECO         │
│  PEF 2026 · DOF · datos.gob.mx CKAN · CONEVAL              │
├────────────────────┬────────────────────────────────────────┤
│  Firebase Auth     │  Vite + React 18 + TypeScript          │
│  (modo demo        │  TailwindCSS · Recharts · Lucide        │
│   sin credenciales)│  jsPDF · QRCode · Tesseract.js         │
└────────────────────┴────────────────────────────────────────┘
```

### Stack técnico

| Capa | Tecnología |
|---|---|
| Frontend | React 18 + TypeScript + Vite |
| Estilos | TailwindCSS + sistema de diseño propio |
| Gráficas | Recharts (BarChart, PieChart, RadarChart) |
| Iconos | Lucide React |
| Autenticación | Firebase Auth (Google + Email) |
| IA | Gemini API (resúmenes) + Claude API (asistente legal) |
| Pagos | Stripe + QR OXXO Pay |
| PDF | jsPDF + html2canvas |
| OCR | Tesseract.js |
| Mapas | React Google Maps |
| Deploy | Netlify (CI/CD desde `main`) |

---

## Módulos

### Panel Ejecutivo — C5 Municipal

| Módulo | Descripción | Datos en vivo |
|---|---|---|
| **Observatorio de Datos** | KPIs municipales con APIs INEGI/DataMéxico. Población, densidad, crimen, vivienda, pobreza. | ✅ INEGI · DataMéxico |
| **Cazador de Oportunidades Federales** | Detecta convocatorias del PEF 2026 disponibles para el municipio. Score IA por convocatoria. Brecha entre fondos disponibles y captados. | ✅ PEF 2026 · DOF |
| **Análisis Político** | Brecha fiscal, promesas de campaña, indicadores de gobernanza, casos de uso IA, conexión a APIs abiertas. | ✅ CONEVAL · INEGI |
| **Pagos Municipales** | 73 conceptos del catálogo Ley de Ingresos 2026. Genera órdenes OXXO Pay QR. | Pendiente Conekta |
| **Patrimonio / Nayarit Originario** | Portal cultural wixárika + mapa de comunidades indígenas + Marakame Digital + convenio INPI $3.5M. | ✅ INPI |
| **Auditoría de Acciones** | Log inmutable de acciones con timestamp, usuario y descripción para cumplimiento ASF/INAI. | ✅ Local |
| **Parlamento Municipal** | Seguimiento de sesiones de Cabildo, votaciones, acuerdos y minutas. | ✅ Local |
| **Mapa Municipal** | Geo-referenciación de servicios, reportes ciudadanos y unidades económicas DENUE. | ✅ DENUE |
| **Academia ConnectX** | Módulos de certificación digital para servidores públicos. Niveles Bronce / Plata / Oro. | ✅ Local |

### Portal Ciudadano

| Módulo | Descripción |
|---|---|
| **Trámites en línea** | 73 trámites municipales: pagos, licencias, actas, permisos |
| **Asistente Legal IA** | Respuestas sobre trámites, derechos y programas sociales basadas en Ley de Ingresos 2026 y reglamentos municipales |
| **Reporte Ciudadano** | Geo-reporte de incidencias (alumbrado, baches, agua) con seguimiento verificable |
| **Precios Canasta Básica** | Integración PROFECO — actualización semanal por colonia |

---

## Fuentes de datos oficiales

Todos los datos provienen de APIs gubernamentales mexicanas sin intermediarios:

| Dataset | Fuente | Tipo | Endpoint |
|---|---|---|---|
| Población y vivienda | INEGI Censo 2020 | REST JSON | `api.inegi.org.mx/data/v2` |
| Indicadores económicos | DataMéxico (SE) | GraphQL | `datamexico.org/api/data` |
| Unidades económicas | DENUE | REST JSON | `api.inegi.org.mx/data/v2/denue` |
| Códigos postales | DIPOMEX (Correos MX) | REST | `api-sepomex.hckdrk.mx` |
| Convocatorias federales | datos.gob.mx | CKAN API | `datos.gob.mx/busca/api` |
| Precios canasta | PROFECO | REST | API pública PROFECO |
| Fondos federales | PEF 2026 | DOF | Publicación oficial |

---

## Marco legal

La plataforma implementa cumplimiento nativo con:

| Ley / Norma | Aplicación |
|---|---|
| **LGTAIP** — Ley General de Transparencia | Portal de transparencia, publicación de información obligatoria |
| **LNETB** — DOF 16-VII-2025 | Notificaciones electrónicas con valor legal, acuse digital |
| **Ley de Ingresos Tepic 2026** | Catálogo completo de 73 conceptos de cobro |
| **Convenio 169 OIT** | Consulta indígena documentada y trazable — Nayarit Originario |
| **Ramo 33 — FISM / FORTAMUN** | Seguimiento de aplicación de fondos federales |
| **ASF** — Auditoría Superior de la Federación | Log de auditoría con trazabilidad completa |

---

## Documentos estratégicos

Los documentos estratégicos del proyecto están disponibles en `/public`:

| Documento | Descripción |
|---|---|
| [`NYD-700`](public/PROPUESTA_CONECTX_TEPIC.html) | Propuesta Estratégica Ejecutiva — análisis financiero completo, trayectoria #847→#47 |
| [`NYD-600`](public/VISION_IA_DATOS_ABIERTOS.md) | Visión IA y Datos Abiertos — APIs, casos de uso, Academia ConnectX, roadmap |
| [`NYD-500`](public/MANUAL_PLATAFORMA.md) | Manual de Operaciones — arquitectura, módulos, integraciones, soporte |
| [`NYD-400`](public/PLAN_TRABAJO_POST_CONTRATO.md) | Plan de Trabajo Post-Contrato — fases, escenarios, mapa de integraciones |
| [`Zitacua`](public/PLAN_ESTRATEGICO_ZITACUA.md) | Plan Estratégico Piloto La Zitacua — comunidades indígenas, 4 fases |
| [`Acuerdo Wixárika`](public/ACUERDO_COLABORACION_WIXARIKA.md) | Convenio de colaboración cultural con comunidades wixáritari |

---

## Instalación local

```bash
# Clonar el repositorio
git clone https://github.com/autosociomx/gobernanza-digital-.git
cd gobernanza-digital-

# Instalar dependencias
npm install

# Configurar variables de entorno (opcional — la plataforma opera en modo demo sin ellas)
cp .env.example .env.local
# Editar .env.local con tus credenciales

# Iniciar servidor de desarrollo
npm run dev
```

### Variables de entorno

```env
# Firebase (opcional — demo mode activo sin estas variables)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=

# IA (opcional)
VITE_GEMINI_API_KEY=
VITE_CLAUDE_API_KEY=

# Pagos (opcional)
VITE_STRIPE_PUBLIC_KEY=
VITE_CONEKTA_PUBLIC_KEY=
```

> **Nota:** Sin variables de entorno la plataforma opera en **modo demo** completo con datos simulados pero funcionales. Ninguna credencial es necesaria para explorar todos los módulos.

---

## Replicación para otros municipios

Nayarit Digital está diseñado para ser replicable. Para adaptar la plataforma a otro municipio:

1. **Fork** este repositorio
2. Actualizar las constantes en `src/services/openData.ts` con el CVE del municipio objetivo
3. Reemplazar el catálogo de trámites en `src/components/dashboard/PagosView.tsx` con la Ley de Ingresos local
4. Configurar Firebase con las credenciales del municipio
5. Deploy en Netlify — CI/CD automático desde `main`

Los módulos de Observatorio, Cazador de Oportunidades y Análisis Político funcionan con cualquier municipio solo cambiando el CVE INEGI.

---

## Trayectoria del proyecto

```
Q3 2026  ████████████░░░░░░░  Lanzamiento piloto Tepic — posición #847
Q4 2026  ██████████████████░  #1 en Nayarit (20 municipios) — 73 trámites digitales
Q1 2027  ████████████████████ Top 250 Nacional — $124M FISM en gestión
Q2 2027  ████████████████████ Top 150 Nacional — $71.7M predial recuperado
Q3 2027  ████████████████████ Top 47 Nacional — modelo replicado en 5 estados
```

---

## Contacto

**ConnectX Servicios S.A. de C.V.**
Plataforma de Gobernanza Digital Municipal

- 📧 Propuestas institucionales: coordinacion@connectx.mx
- 🌐 Demostración ejecutiva: [tepic.netlify.app](https://tepic.netlify.app)
- 📄 Propuesta completa: [NYD-700](public/PROPUESTA_CONECTX_TEPIC.html)

Para municipios interesados en adoptar la plataforma, contactar directamente para evaluación sin costo.

---

<div align="center">

**Nayarit Digital** es un proyecto de [ConnectX Servicios S.A. de C.V.](mailto:coordinacion@connectx.mx)

*Construido con datos oficiales mexicanos · Desplegado en producción · Auditable y replicable*

![Mexico](https://img.shields.io/badge/🇲🇽-Hecho%20en%20México-006847)

</div>
