# CONTEXTO MAESTRO — Proyecto Gobernanza Digital ConnectX
**Repositorio:** `Autosociomx/Gobernanza-digital-`
**Fecha de última actualización:** 30 de junio de 2026
**Estado:** Producción activa · Piloto municipal Tepic, Nayarit

---

## 1. IDENTIDAD DEL PROYECTO

### Empresa
**ConnectX Servicios S.A. de C.V.**
- Tepic, Nayarit, México
- contacto@connectx.mx
- Director General: **Miguel Alexis Pérez Aguilar**

### Producto
**Nayarit Digital** — El sistema operativo municipal de Tepic.
No es una app de campaña ni un portal web más. Es la infraestructura operativa completa que permite al municipio cumplir con la Ley Nacional para Eliminar Trámites Burocráticos (LNETB, DOF 16-VII-2025) y digitalizar su operación de gobierno.

### Visión política
Validar la gestión de **Geraldine Ponce** (candidata a Gobernadora 2027) mediante trazabilidad absoluta, inteligencia artificial y digitalización operativa. Escalar de Tepic a los 20 municipios de Nayarit y convertirse en el modelo de referencia estatal.

---

## 2. DATOS OPERATIVOS ACTUALES

| Métrica | Valor |
|---|---|
| Ciudadanos registrados | **2,400** |
| Recaudación procesada | **$4,200,000 MXN** |
| Módulos operativos | **13 (C5) + 2 (Citizen app)** |
| Idiomas de atención | **3 (español, Cora, Wixárika)** |
| Disponibilidad | **24/7** |
| Infraestructura | Google Cloud / Firebase (Firestore, Auth, Functions) |
| Cumplimiento LNETB activo | **~88% (→ 100% en 30 días)** |

---

## 3. MARCO LEGAL

### Ley principal
**Ley Nacional para Eliminar Trámites Burocráticos (LNETB)**
DOF 16 de julio de 2025

El H. Ayuntamiento de Tepic es **Sujeto Obligado** (Art. 3, XXXIV).

### Artículos críticos y su cobertura en ConnectX

| Artículo | Obligación | Cobertura ConnectX |
|---|---|---|
| Art. 3, XXXIV | Municipio como Sujeto Obligado | ✅ Transversal |
| Art. 12 | Autoridad Municipal de Simplificación | ⚠️ Panel técnico listo; designación pendiente (Cabildo) |
| Arts. 14–15 | Enlace de Simplificación + métricas | ⚠️ Módulo Métricas listo; designación pendiente |
| Art. 13, XIII–XVIII | Ventanillas Digitales + Atención Ciudadana | ✅ Operativo |
| Arts. 51–54 | Catálogo de trámites en Portal Ciudadano Único | 🔄 75% registrado |
| Art. 74 | Integración Llave MX (SSO nacional) | 🔄 OAuth PKCE implementado; pendiente CLIENT_ID ante CEDN |
| Art. 91 + Trans. XVI | Código fuente al Repositorio Nacional | ✅ Propiedad municipal; sin vendor lock-in |

### Leyes complementarias
- LGPDP — Ley General de Protección de Datos Personales (ConnectX como procesador)
- Ley General de Transparencia — Observatorio Digital cumple datos abiertos
- Derechos lingüísticos — Asistente IA en español, Cora y Wixárika
- OMS 2026 / CIE-11 — Salud Inteligente

### Plazos fatales vencidos (urgencia del municipio)
- Trans. XIV: Autoridad de Simplificación → venció enero 2026
- Trans. XV: Enlace de Simplificación → venció febrero 2026
- Trans. XVI: Reporte de código fuente → venció febrero 2026

**Este es el argumento de presión legal que abre la puerta al Ayuntamiento.**

---

## 4. ARQUITECTURA DEL ECOSISTEMA

### Stack técnico
- **Frontend:** React 18 + TypeScript + Vite + TailwindCSS + Framer Motion
- **Backend:** Firebase (Firestore, Auth, Cloud Functions)
- **IA:** Gemini (Vertex AI) para Asistente Ciudadano y Triaje
- **Mapas:** Google Maps Platform
- **Auth legal:** Llave MX (OAuth 2.0 PKCE) — en proceso de activación
- **Pagos:** En integración

### Los 13 módulos del C5 (panel de gobierno)

| ID | Módulo | Función |
|---|---|---|
| tesoreria | Tesorería Digital | Predial, agua, licencias, multas en línea |
| obras | Trazabilidad de Obras | Contratos, avance físico, alertas de retraso |
| servicios | Servicios Públicos | Reportes ciudadanos con GPS y seguimiento |
| salud | Salud Inteligente — Nayarit ID | Triaje IA, CIE-11, operación offline |
| bienestar | Bienestar Social | Gestión DIF, becas, apoyos |
| gabinete | Gabinete en Tiempo Real | Panel ejecutivo tipo C5 |
| ia | Asistente IA | Chat 24/7, trilingüe, ejecuta acciones |
| agrovision | Agrovisión 3D | Alertas agrícolas, datos para B2B |
| observatorio | Observatorio Digital | Datos abiertos públicos en tiempo real |
| metricas | Métricas Integrales | IMDM mensual (Índice de Madurez Digital) |
| parlamento | Parlamento Municipal | Foros ciudadanos live en Firebase |
| analisis_politico | Análisis Estratégico | Inteligencia política y territorial |
| interoperabilidad | Nodo Transparencia | Bus hacia dependencias estatales |
| **lnetb** | **Cumplimiento LNETB** | **Dashboard legal artículo por artículo** |
| **tramites** | **Inventario de Trámites** | **Catálogo Arts. 51-54 LNETB** |

### Aplicación ciudadana (CitizenApp)
Tabs de navegación actual:
```
Inicio | Trámites | Pagos | Redes | Mi NayaritID
```

Vistas disponibles:
- **Home** — Portal unificado con accesos rápidos
- **Trámites** — Catálogo de 14 trámites con detalle, requisitos, botón "Iniciar en línea"
- **Pagos** — Tesorería Digital (predial, agua, licencias, multas)
- **Redes** — Redes ciudadanas y comités
- **Mi NayaritID** — Identidad digital del ciudadano
- **Transparencia LNETB** — Métricas, estatus de digitalización, código fuente, Llave MX
- **Parlamento** — Foros en tiempo real
- **Servicios** — Reportes urbanos GPS, triaje salud
- **Auditoría** — Mystery Shopper de infraestructura
- **Notificaciones** — Buzón ciudadano

---

## 5. ESTRATEGIA COMERCIAL Y POLÍTICA

### Modelo de negocio
1. **B2G (SaaS Municipal):** Municipios pagan licenciamiento por módulos.
2. **B2B (API de Insights):** Micro-APIs de datos territoriales anonimizados para aseguradoras, agroindustria, fintechs.

### Escalera de valor (Fases)
| Fase | Nombre | Alcance | Indicador |
|---|---|---|---|
| 1 (2026) | Trámite Digital Tepic | Módulos piloto | 60% de trámites en línea |
| 2 (2027) | Gobierno Digital Tepic | Ecosistema completo | IMDM > 68 puntos |
| 3 (2028) | Expansión municipal | 3 municipios Nayarit | Observatorio Digital lanzado |
| 4 (2029) | Inteligencia Territorial | 10+ municipios | Dataset público estatal |
| 5 (2031+) | Modelo Nacional | Replicación en otros estados | Adoptado por CONAGO |

### Actores clave
| Actor | Rol | Relación con ConnectX |
|---|---|---|
| **Blanca Simancas** | Presidenta Municipal Encargada, Tepic | Tomadora de decisión técnica/legal. Carta enviada: Piloto 90 días. |
| **Hugo Galván Araiza** | Secretario del Ayuntamiento | CC en el requerimiento LNETB. Custodio de los acuerdos de Cabildo. |
| **Leticia Araiza** | Lideresa social y estratega política | Aliada fundacional. Carta enviada: Gobernanza ciudadana. |
| **Geraldine Ponce** | Candidata a Gobernadora 2027 | Activo político. ConnectX valida su gestión con datos. |

---

## 6. DOCUMENTOS CLAVE EN EL REPOSITORIO

| Archivo | Ubicación | Propósito |
|---|---|---|
| `CONTEXTO.md` | `/` (raíz) | Este archivo. Contexto maestro del proyecto. |
| `CONTEXTO_MASTER_CLAUDE.md` | `public/` | System prompt para arquitectura técnica (Claude/GPT) |
| `CONNECTX_SYSTEM_PROMPT.md` | `public/` | System prompt del asistente IA ConnectX |
| `CONNECTX_ECOSISTEMA_LEGAL.md` | `public/` | Mapa completo de módulos + cumplimiento LNETB artículo por artículo |
| `NAYARIT_DIGITAL_V2.md` | `public/` | Propuesta de política pública + arquitectura técnica |
| `CARTA_BLANCA_SIMANCAS.md` | `public/` | Carta ejecutiva → Presidenta Municipal (Piloto 90 días) |
| `CARTA_LETICIA_ARAIZA.md` | `public/` | Carta estratégica → Lideresa social (Aliada fundacional) |
| `CARTA_GENERATOR_SCHEMA.md` | `public/` | Esquema metalingüístico para generar nuevas cartas con IA |

---

## 7. INSTRUCCIONES PARA LA IA (CLAUDE / GPT)

Cuando se trabaje con este repositorio, seguir estas reglas:

1. **Fuente de verdad legal:** `CONNECTX_ECOSISTEMA_LEGAL.md` — no inventar artículos ni porcentajes.
2. **Fuente de verdad técnica:** el código en `src/` — no prometer módulos que no existen en `C5Dashboard.tsx` o `CitizenApp.tsx`.
3. **Datos operativos fijos:** 2,400 ciudadanos · $4.2M MXN · 13 módulos C5. Actualizarlos solo si el equipo de ConnectX los modifica aquí.
4. **Argumento legal central siempre disponible:**
   > *"La LNETB ya obliga al municipio. ConnectX no es un gasto: es el mecanismo para no incumplir. Ningún municipio de Nayarit supera el 20% de cumplimiento. ConnectX lleva a Tepic al 88% desde el día 1."*
5. **Para generar nuevas cartas:** consultar `CARTA_GENERATOR_SCHEMA.md` — identifica el arquetipo del destinatario y construye las 5 capas (Anclaje → Espejo → Prueba Social → Propuesta → Puente).
6. **Para explicar el ecosistema a cualquier audiencia:** ajustar la profundidad según el arquetipo (ciudadano → beneficios concretos; funcionario → módulos + % cumplimiento; técnico → Firebase + API Gateway).
7. **Rama de desarrollo activa:** `claude/connectx-municipal-letters-gjg5ui`

---

## 8. PASO PENDIENTE MÁS URGENTE

**Registrar la plataforma ante la CEDN (Coordinación de Estrategia Digital Nacional) para obtener el `CLIENT_ID` oficial de Llave MX.**

- El código OAuth PKCE ya está implementado en `src/services/llaveMXService.ts`
- Solo falta el `CLIENT_ID` que se obtiene registrando la plataforma en: `https://llavemx.gob.mx/desarrolladores`
- Tiempo estimado: 3–5 días hábiles
- Con este paso, el cumplimiento LNETB pasa de 88% a **100%**

---

*ConnectX Servicios S.A. de C.V. · Tepic, Nayarit · 2026*
