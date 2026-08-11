# CARPETA 02 — MARCO JURÍDICO

## Laboratorio Piloto Tepic — Constancia de Residencia

---

## 1. Jerarquía Normativa Aplicable

### 1.1 Nivel Constitucional

| Artículo | Contenido relevante |
|---|---|
| **Art. 6° Constitucional** | Derecho de acceso a las tecnologías de la información y comunicación |
| **Art. 25 Constitucional** | Rectoría del Estado en el desarrollo nacional, incluyendo la innovación tecnológica |
| **Art. 115 Constitucional** | Municipio libre — bases de la administración pública municipal. Fracción II: facultad de los ayuntamientos para aprobar bandos de policía y gobierno, reglamentos, circulares y disposiciones administrativas |
| **Art. 134 Constitucional** | Principios de eficiencia, eficacia, economía, transparencia y honradez en el manejo de recursos públicos |

### 1.2 Nivel Federal

| Ordenamiento | Fecha | Relevancia para el piloto |
|---|---|---|
| **Ley Nacional para Eliminar Trámites Burocráticos (LNETB)** | DOF 16-jul-2025 | Marco principal: obliga a los 3 órdenes de gobierno a implementar el Modelo Nacional de Simplificación y Digitalización |
| **Lineamientos del Modelo Nacional de Simplificación y Digitalización** | DOF 22-oct-2025 | Definen arquitectura, estándares, catálogo nacional, identidad digital, interoperabilidad, AIR |
| **Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (LGPDPPSO)** | Vigente | Marco de protección de datos para entes públicos |
| **Ley de Firma Electrónica Avanzada** | Vigente | Marco para firma electrónica en actos administrativos |
| **Ley Federal de Procedimiento Administrativo** | Vigente | Supletoria en procedimientos administrativos |

### 1.3 Nivel Estatal (Nayarit)

| Ordenamiento | Relevancia |
|---|---|
| **Ley de Gobierno Digital del Estado de Nayarit** | Marco estatal de digitalización — REQUIERE VERIFICACIÓN de estatus y contenido específico |
| **Constitución Política del Estado de Nayarit** | Bases del municipio libre en el estado |
| **Ley Orgánica Municipal del Estado de Nayarit** | Atribuciones municipales — REQUIERE VERIFICACIÓN de artículos específicos |

### 1.4 Nivel Municipal (Tepic)

| Ordenamiento | Relevancia |
|---|---|
| **Bando de Policía y Buen Gobierno de Tepic** | Facultades del Ayuntamiento — REQUIERE VERIFICACIÓN |
| **Reglamento Interior del Ayuntamiento de Tepic** | Atribuciones de dependencias — REQUIERE VERIFICACIÓN |
| **Ley de Ingresos Municipal de Tepic** | Derechos y costos de trámites — REQUIERE VERIFICACIÓN |

---

## 2. Artículos LNETB Directamente Aplicables al Piloto

### 2.1 Principios generales (Art. 34 LNETB)

| Principio | Aplicación en el piloto |
|---|---|
| Simplificación administrativa | Reducción de requisitos y pasos del trámite |
| Digitalización integral | Trámite 100% digital |
| No duplicidad de información | Consulta vs. captura de datos |
| Interoperabilidad | Diseño de conectores (sin conexión real hasta autorización) |
| Gratuidad | Sin costo para el ciudadano (salvo derechos legales) |
| Accesibilidad universal | Diseño inclusivo, lenguas originarias |
| Seguridad jurídica | Trazabilidad, firma, expediente |
| Neutralidad tecnológica | Estándares abiertos, sin lock-in de proveedor |

### 2.2 Identidad digital (Art. 66 LNETB)

**Qué exige:** Mecanismo único de identidad digital para ciudadanos, utilizando la CURP como elemento central.

**Estado en el prototipo:** 
- Desarrollo: Validación sintáctica de CURP
- Piloto institucional: Deberá conectarse al mecanismo oficial que determine la autoridad competente
- No se simulará una conexión a RENAPO que no existe

### 2.3 Firma electrónica (Art. 67 LNETB)

**Qué exige:** Firma electrónica como mecanismo de autenticación de actos administrativos.

**Estado en el prototipo:**
- Desarrollo: QR + hash + timestamp (demostración técnica)
- Piloto institucional: El Ayuntamiento determinará el mecanismo jurídico de firma (e.firma u otro reconocido)

### 2.4 Expediente ciudadano único (Art. 68 LNETB)

**Qué exige:** Repositorio único de documentos y trámites por ciudadano.

**Estado en el prototipo:** Se construirá expediente digital con trazabilidad completa: identidad → solicitud → validaciones → resolución → firma → notificación → auditoría.

### 2.5 Ventanilla única digital (Art. 69 LNETB)

**Qué exige:** Punto único de acceso digital a trámites y servicios.

**Estado en el prototipo:** El prototipo demuestra el concepto de ventanilla única para el trámite piloto. La ventanilla municipal completa requiere adopción institucional.

### 2.6 Interoperabilidad (Art. 71 LNETB)

**Qué exige:** Comunicación entre sistemas de los tres órdenes de gobierno.

**Estado en el prototipo:**
- Se diseña la arquitectura de conectores
- Se documentan las fuentes oficiales y los fundamentos de cada conexión
- Las conexiones reales requieren convenios/autorizaciones del Ayuntamiento

### 2.7 Manifestación de Impacto Regulatorio — AIR (Art. 38 LNETB)

**Qué exige:** Análisis previo a la emisión de regulaciones que impongan cargas administrativas.

**Estado en el prototipo:** Se prepara minuta AIR para que el área competente del Ayuntamiento determine si el trámite propuesto requiere AIR completo o procede exención (Arts. 35-36).

### 2.8 Código abierto (Art. 91 LNETB) y Estándares abiertos (Art. 92)

**Qué exige:** Repositorio público de código y uso de estándares abiertos.

**Estado en el prototipo:** 
- Código alojado en GitHub (repo público)
- Stack open source (HTML/CSS/JS vanilla, React MIT, Supabase, PostgreSQL)
- Estándares: JSON, REST, OAuth2, HTTPS, QR

---

## 3. Fundamento Municipal de la Constancia de Residencia

### 3.1 Base jurídica

**REQUIERE VERIFICACIÓN por el Ayuntamiento de Tepic:**

- ¿Existe reglamento o acuerdo que regule específicamente la emisión de constancias de residencia?
- ¿Qué artículo del Bando de Policía o Reglamento Interior faculta al Ayuntamiento a emitir constancias?
- ¿La constancia es un acto administrativo reglado (debe emitirse si se cumplen requisitos) o discrecional?
- ¿Existe fundamento en la Ley Orgánica Municipal del Estado de Nayarit?

**Fuentes a consultar:**
- Bando de Policía y Buen Gobierno de Tepic (vigente)
- Reglamento Interior del Ayuntamiento de Tepic
- Ley Orgánica Municipal del Estado de Nayarit
- Ley de Ingresos Municipal de Tepic (para determinar si tiene costo)

### 3.2 Autoridad competente (por determinar)

| Elemento | Determinación |
|---|---|
| **Autoridad emisora** | Por determinar (Presidente Municipal / Secretario del Ayuntamiento / Oficial del Registro Civil Municipal) |
| **Unidad administrativa** | Por determinar (Secretaría del Ayuntamiento / Oficialía de Padrón y Registro) |
| **Funcionario firmante** | Por determinar |
| **Fundamento de la competencia** | Por determinar (Bando / Reglamento Interior / Ley Orgánica) |

---

## 4. Instrumentos Jurídicos Necesarios para el Piloto

### 4.1 Instrumentos existentes (requieren verificación)

- [ ] Bando de Policía y Buen Gobierno de Tepic
- [ ] Reglamento Interior del Ayuntamiento
- [ ] Ley de Ingresos Municipal
- [ ] Acuerdos del Ayuntamiento sobre trámites digitales

### 4.2 Instrumentos a crear (si no existen)

| Instrumento | Tipo | Contenido |
|---|---|---|
| Acuerdo de Piloto de Simplificación | Acuerdo de Ayuntamiento | Autoriza el laboratorio piloto, designa responsables, establece alcance |
| Lineamientos de Trámites Digitales | Acuerdo/Reglamento | Define reglas para trámites digitales en el municipio |
| Convenio de Interoperabilidad | Convenio | Con RENAPO, SAT, catastro, SIAPA — cuando aplique |
| Aviso de Privacidad | Documento público | Conforme a LGPDPPSO |

---

## 5. Notas sobre Fuentes Jurídicas

⚠️ **Todos los artículos, fracciones e incisos citados en este documento requieren verificación contra el texto vigente publicado en el Diario Oficial de la Federación (DOF), la Gaceta Oficial del Estado de Nayarit y el Periódico Oficial del Municipio de Tepic.**

La referencia a la LNETB publicada el 16 de julio de 2025 y a los Lineamientos del Modelo Nacional publicados el 22 de octubre de 2025 debe verificarse contra los textos oficiales.

Las referencias a ordenamientos estatales y municipales requieren confirmación por parte de la autoridad competente.

---

*Documento elaborado como parte del Laboratorio Piloto Tepic — Nayarit Digital · ConnectX*
*Agosto 2026*
