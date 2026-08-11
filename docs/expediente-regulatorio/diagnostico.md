# CARPETA 01 — DIAGNÓSTICO

## Laboratorio Piloto de Simplificación y Digitalización Municipal
### Municipio de Tepic, Nayarit — Constancia de Residencia

**Versión:** 1.0 — Borrador para presentación institucional
**Fecha:** Agosto 2026
**Proponente tecnológico:** Miguel Alexis Pérez Aguilar / AutosocioMX
**Sujeto obligado potencial:** H. Ayuntamiento de Tepic, Nayarit

---

## 1. Naturaleza del Proyecto

### 1.1 Lo que ES este proyecto

Un **laboratorio piloto de simplificación y digitalización** que demuestra, con un solo trámite municipal (Constancia de Residencia), cómo podría implementarse en Tepic el Modelo Nacional de Simplificación y Digitalización establecido por la Ley Nacional para Eliminar Trámites Burocráticos (LNETB), publicada en el DOF el 16 de julio de 2025, y sus Lineamientos del Modelo Nacional, publicados el 22 de octubre de 2025.

### 1.2 Lo que NO ES este proyecto

- ❌ No es un sistema gubernamental autorizado ni en operación
- ❌ No pretende sustituir unilateralmente los sistemas oficiales del municipio
- ❌ No tiene acceso a bases de datos oficiales (RENAPO, catastro, SIAPA, SAT)
- ❌ No utiliza datos personales reales de ciudadanos
- ❌ No emite resoluciones con efectos jurídicos vinculantes

### 1.3 Roles claramente diferenciados

| Rol | Responsable | Funciones |
|---|---|---|
| **Proponente tecnológico** | Miguel Alexis Pérez Aguilar | Desarrolla prototipo, arquitectura, UX, documentación, propuesta |
| **Sujeto obligado (potencial)** | H. Ayuntamiento de Tepic | Determina trámites, requisitos, competencia, responsables, decisiones |
| **Áreas municipales** | Secretaría del Ayuntamiento, Oficialía de Padrón y Registro, etc. | Validan datos, procedimientos, reglas de negocio |
| **Autoridad competente** | Presidente Municipal / Secretario del Ayuntamiento | Emite resoluciones, firma actos administrativos |
| **Infraestructura oficial** | Sistemas municipales, estatales y federales | Conecta fuentes de datos y mecanismos de identidad |

---

## 2. Contexto Nacional

### 2.1 Marco normativo vigente

- **LNETB** — Publicada en el DOF el 16 de julio de 2025. Establece la obligación de los tres órdenes de gobierno de implementar el Modelo Nacional de Simplificación y Digitalización.
- **Lineamientos del Modelo Nacional** — Publicados el 22 de octubre de 2025. Definen la arquitectura, estándares, catálogo nacional de trámites, identidad digital, interoperabilidad y AIR.
- **ATDT (Agencia de Transformación Digital y Telecomunicaciones)** — Autoridad coordinadora del Modelo Nacional. Reporta mesas de trabajo directas con estados y municipios para implementación.

### 2.2 Meta nacional de simplificación

La política nacional de simplificación y digitalización establece metas de reducción de trámites, requisitos, tiempos y costos, así como el aumento de la proporción de trámites realizados en línea.

### 2.3 Posición de Nayarit en gobierno digital

El estado de Nayarit se encuentra en una posición de oportunidad para mejorar sus indicadores de gobierno digital. La meta aspiracional del proyecto es contribuir a que Nayarit avance significativamente en los rankings nacionales de digitalización gubernamental.

---

## 3. Trámite Seleccionado para el Piloto

### 3.1 Constancia Municipal de Residencia

**Justificación de la selección:**

1. **Alto volumen** — Es uno de los trámites más solicitados en cualquier municipio
2. **Baja complejidad jurídica** — No requiere pago de derechos en muchos casos
3. **Demostrabilidad** — Permite probar TODO el ciclo: identidad → domicilio → interoperabilidad → firma → resolución → notificación → expediente
4. **Replicabilidad** — El modelo es directamente replicable a otros trámites municipales
5. **Bajo riesgo** — Un error en este trámite tiene consecuencias limitadas comparado con trámites como licencias de construcción o permisos de giro

### 3.2 Características del trámite

| Atributo | Descripción |
|---|---|
| **Nombre** | Constancia Municipal de Residencia |
| **Objeto** | Acreditar el domicilio de una persona dentro del municipio de Tepic |
| **Sujeto obligado** | H. Ayuntamiento de Tepic |
| **Población objetivo** | Ciudadanos residentes en el municipio de Tepic |
| **Uso típico** | Trámites escolares, laborales, bancarios, programas sociales |

---

## 4. Estado Actual del Prototipo (Agosto 2026)

### 4.1 Lo que EXISTE y FUNCIONA

| Componente | Estado | Tecnología |
|---|---|---|
| Landing page / Portal conceptual | ✅ Funcional | React + Vite + Framer Motion |
| Módulo de transporte (RutaViva) | ✅ Funcional | Vanilla JS + Leaflet + Supabase |
| Módulo de triaje salud (ConectaX Salud) | ✅ Funcional | Vanilla JS + Netlify Functions + Claude API |
| Infraestructura serverless | ✅ Funcional | Netlify Functions + Supabase (PostgreSQL) |
| GPS en tiempo real | ✅ Funcional | Geolocation API + Supabase Realtime |
| Dashboard conceptual C5 | ✅ Parcial | React + Recharts (datos mock) |

### 4.2 Lo que FALTA para el piloto institucional

| Componente | Estado | Prioridad |
|---|---|---|
| Flujo de trámite (Constancia de Residencia) | ❌ No existe | CRÍTICA |
| Verificación de identidad (CURP) | ❌ Solo captura visual | CRÍTICA |
| Firma electrónica | ❌ No existe | CRÍTICA |
| Expediente digital con trazabilidad | ❌ No existe | CRÍTICA |
| Resolución digital | ❌ No existe | CRÍTICA |
| Notificación electrónica | ❌ No existe | ALTA |
| Indicadores y métricas | ❌ Solo declarativos | ALTA |
| Documentación AIR/exención | ❌ No existe | CRÍTICA |
| Aviso de privacidad | ❌ No existe | CRÍTICA |
| Pruebas de accesibilidad | ❌ No realizadas | MEDIA |
| Plan de contingencia | ❌ No existe | MEDIA |

---

## 5. Objetivos del Laboratorio Piloto

### 5.1 Objetivo general

Demostrar, mediante un prototipo funcional y un expediente regulatorio completo, que el Municipio de Tepic puede implementar el Modelo Nacional de Simplificación y Digitalización para la Constancia de Residencia, reduciendo requisitos, tiempos y costos, y habilitando la digitalización punta a punta, cuando el Ayuntamiento adopte institucionalmente el proyecto y habilite las conexiones oficiales.

### 5.2 Objetivos específicos

1. Documentar el marco jurídico aplicable al trámite
2. Mapear el proceso actual (AS-IS) con datos reales del municipio
3. Diseñar la reingeniería del proceso (TO-BE) con metas de simplificación
4. Construir prototipo funcional del trámite digital
5. Preparar expediente AIR/exención
6. Diseñar arquitectura de interoperabilidad (sin conexiones reales aún)
7. Documentar medidas de protección de datos y seguridad
8. Establecer indicadores con línea base y meta
9. Elaborar plan piloto en 6 etapas (A→F)
10. Entregar dictamen de preparación para implementación

---

## 6. Meta de Simplificación Propuesta

| Indicador | Antes estimado | Meta propuesta | Reducción |
|---|---|---|---|
| Requisitos documentales | Por determinar (levantamiento municipal) | ≤2 | ≥50% |
| Tiempo total del trámite | Por determinar | ≤10 min digital | ≥50% |
| Visitas presenciales | Por determinar | 0 | 100% |
| Interacciones con funcionarios | Por determinar | 0 | 100% |
| Costo para el ciudadano | Por determinar | $0 (gratuito) | ≥50% |
| Tiempo de resolución | Por determinar | ≤24 h hábiles | ≥50% |

*Nota: Los valores "antes" deben ser determinados por el Ayuntamiento mediante levantamiento del proceso real. Los valores presentados aquí son metas aspiracionales demostrables con el prototipo.*

---

## 7. Próximos Pasos Inmediatos

1. ✅ Completar expediente regulatorio (Carpetas 01–15)
2. ✅ Construir prototipo funcional de Constancia de Residencia
3. ⬜ Validar con el Ayuntamiento de Tepic el levantamiento del trámite real
4. ⬜ Ajustar el prototipo con datos reales del municipio
5. ⬜ Presentar institucionalmente al Ayuntamiento
6. ⬜ Obtener autorización para piloto controlado (Etapa C)

---

*Documento elaborado como parte del Laboratorio Piloto Tepic — Nayarit Digital · ConnectX*
*Agosto 2026*
