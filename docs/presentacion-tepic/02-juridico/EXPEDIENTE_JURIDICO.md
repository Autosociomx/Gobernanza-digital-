# Carpeta 02 — Expediente Jurídico

## 1. Objeto

Este documento identifica el marco jurídico que deberá ser revisado por las áreas competentes del Ayuntamiento de Tepic antes de cualquier implementación institucional.

**No constituye dictamen jurídico ni sustituye la opinión de la Consejería Jurídica Municipal.**

---

## 2. Marco normativo de referencia

El proyecto ha compilado una biblioteca legal con más de 100 ordenamientos verificados contra fuentes oficiales primarias (DOF, Cámara de Diputados, Congreso de Nayarit, transparenciafiscal.tepic.gob.mx, ordenjuridico.gob.mx).

| Ordenamiento | Fuente primaria | Estado de verificación | Interpretación aplicable |
|---|---|---|---|
| **CPEUM** — Art. 6, 25, 115 | diputados.gob.mx | VERIFICADO | Municipio libre, facultad reglamentaria, transparencia |
| **LNETB** — Ley Nacional para Eliminar Trámites Burocráticos | DOF 16-jul-2025 | VERIFICADO (vigencia) | Obligación de los 3 órdenes de gobierno. Artículos específicos requieren verificación por el área jurídica municipal contra el texto oficial |
| **Lineamientos del Modelo Nacional de Simplificación y Digitalización** | DOF 22-oct-2025 | VERIFICADO (publicación) | Arquitectura, catálogo nacional, identidad, interoperabilidad, AIR. Artículos específicos requieren verificación |
| **Ley de Gobierno Digital del Estado de Nayarit** — Arts. 2, 5, 6 | congresonayarit.gob.mx | VERIFICADO | Obliga a Ayuntamientos a implementar gobierno digital, expediente digital e interoperabilidad |
| **Ley de Hacienda Municipal del Estado de Nayarit** — Arts. 21, 22, 34 | ordenjuridico.gob.mx | VERIFICADO (nivel artículo) | Predial, catastro, formas de pago |
| **Ley de Ingresos Municipal de Tepic 2026** | transparenciafiscal.tepic.gob.mx | VERIFICADO | Derechos, predial, recaudación |
| **LGPDPPSO** — Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados | diputados.gob.mx | VERIFICADO | Protección de datos en entes públicos |
| **Ley de Firma Electrónica Avanzada** | diputados.gob.mx | VERIFICADO | Requisitos para firma electrónica en actos administrativos |
| **Ley Orgánica Municipal del Estado de Nayarit** | congresonayarit.gob.mx | VERIFICADO (general) | Atribuciones municipales; artículos específicos requieren verificación |
| **Bando de Policía y Buen Gobierno de Tepic** | Compilación normativa del Ayuntamiento | POR VERIFICAR | Facultades municipales; requiere texto vigente |
| **Reglamento Interior del Ayuntamiento de Tepic** | Compilación normativa del Ayuntamiento | POR VERIFICAR | Atribuciones de dependencias; requiere texto vigente |

**Consulta integral en:** `docs/marco/BIBLIOTECA_LEGAL.md` — contiene el listado completo con estados de verificación, fuentes primarias y análisis estratégico por dependencia municipal.

---

## 3. Principios jurídicos aplicables

La implementación, si el Ayuntamiento decide llevarla a cabo, deberá observar los siguientes principios:

- legalidad;
- competencia de la autoridad;
- protección de datos personales;
- seguridad de la información;
- transparencia;
- trazabilidad;
- archivo y conservación documental;
- accesibilidad;
- simplificación administrativa;
- interoperabilidad;
- neutralidad tecnológica.

---

## 4. Requisitos que requieren determinación institucional

Los siguientes elementos deberán ser determinados por las autoridades competentes del Ayuntamiento. El proponente tecnológico no tiene facultad para determinarlos.

### A. Fundamento del trámite

Identificar el instrumento jurídico municipal que crea, regula o sustenta la Constancia Municipal de Residencia.

**Fuentes sugeridas para consulta:**
- Bando de Policía y Buen Gobierno de Tepic
- Reglamento Interior del Ayuntamiento
- Compilación normativa oficial del Ayuntamiento de Tepic

### B. Competencia

Determinar qué unidad administrativa posee competencia para:

- recibir la solicitud;
- verificar información;
- resolver;
- firmar;
- notificar;
- conservar el expediente.

### C. Mejora regulatoria

Determinar si corresponde:

- AIR (Manifestación de Impacto Regulatorio);
- exención;
- actualización regulatoria;
- otro procedimiento previsto por la normativa aplicable.

El proponente tecnológico ha preparado una minuta AIR como insumo para el análisis del área competente. **La determinación final corresponde exclusivamente al Ayuntamiento.**

### D. Protección de datos

Determinar:

- responsable del tratamiento;
- finalidades;
- datos necesarios;
- base jurídica;
- aviso de privacidad;
- mecanismos ARCO;
- conservación;
- eliminación;
- transferencias;
- medidas de seguridad.

El proponente tecnológico ha preparado una minuta de aviso de privacidad como insumo. **Requiere revisión y publicación por la Unidad de Transparencia municipal.**

### E. Firma electrónica

Determinar el mecanismo jurídicamente válido para la emisión del documento administrativo.

**Atención:** El hash, QR o cualquier mecanismo técnico del prototipo no deberá presentarse como equivalente a una firma electrónica jurídicamente atribuible a un funcionario. El prototipo demuestra un flujo técnico (OTP + hash). La validez jurídica requiere el mecanismo que determine la autoridad competente conforme a la Ley de Firma Electrónica Avanzada.

### F. Interoperabilidad

Toda conexión con sistemas gubernamentales deberá realizarse únicamente después de obtener:

- autorización;
- convenio o instrumento correspondiente;
- credenciales;
- especificaciones técnicas;
- controles de seguridad;
- reglas de intercambio de información.

El prototipo actual NO tiene ninguna conexión con sistemas gubernamentales. Las conexiones a RENAPO, Catastro Tepic, SIAPA o cualquier otro sistema oficial son inexistentes y requerirán los instrumentos jurídicos que correspondan.

---

## 5. Análisis de competencias municipales para autorizar el piloto

**REQUIERE VERIFICACIÓN por el área jurídica del Ayuntamiento.**

| Acción | ¿Quién podría autorizarla? | Fundamento a verificar |
|---|---|---|
| Recibir y evaluar la propuesta | Cualquier área designada por el Ayuntamiento | Facultades de organización interna |
| Habilitar pruebas internas sin efectos jurídicos | Titular de la dependencia | Facultades administrativas |
| Digitalizar el formulario de solicitud | Titular de la dependencia o Cabildo (según la norma que regule el trámite) | Por determinar según el instrumento que regule el trámite |
| Usar CURP verificada en vez de documento físico para este trámite | Por determinar | Por determinar — LNETB como referencia |
| Eliminar requisito de comprobante de domicilio | Por determinar | Por determinar — LNETB como referencia |
| Emitir constancias con firma electrónica | Por determinar | Ley de Firma Electrónica Avanzada + normativa municipal |
| Operar el trámite digital como vía oficial | Por determinar | Puede requerir Acuerdo de Cabildo y/o publicación |

---

## 6. Regla de clasificación

Cada requisito en este expediente se clasifica con uno de los siguientes estados:

| Estado | Significado |
|---|---|
| **EXISTENTE** | El código, documento o funcionalidad existe y es verificable en el repositorio |
| **OPERATIVO EN DEMO** | Funciona en entorno de demostración o prueba |
| **PREPARADO** | Existe infraestructura o documentación base, pero no está implementado completamente |
| **HOJA DE RUTA** | Es una capacidad futura, planeada pero no iniciada |
| **REQUIERE VALIDACIÓN** | La autoridad competente debe revisarlo y determinarlo |
| **REQUIERE AUTORIZACIÓN** | Requiere un acto de autoridad (acuerdo, convenio, nombramiento) |

**Prohibido usar la palabra "CUMPLE" sin evidencia documental y técnica suficiente verificable por un tercero.**

---

## 7. Conclusión jurídica preliminar

El presente expediente únicamente permite identificar los requisitos que deberán ser evaluados por el Ayuntamiento.

**No constituye autorización, certificación, dictamen de cumplimiento ni reconocimiento de validez jurídica del prototipo.**

El prototipo demuestra una capacidad tecnológica.
La autoridad municipal determina la viabilidad administrativa.
El área jurídica determina los requisitos legales.
La autoridad competente determina la validez de los actos.

**Ninguna funcionalidad del prototipo sustituye esas competencias.**

---

*Documento preparado como insumo para la revisión del área jurídica del H. Ayuntamiento de Tepic.*
*No constituye dictamen jurídico. Las determinaciones finales corresponden exclusivamente a las autoridades competentes.*
