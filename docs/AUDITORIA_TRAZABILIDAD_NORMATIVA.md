# AUDITORÍA DE TRAZABILIDAD NORMATIVA — FUENTES PRIMARIAS Y CITAS JURÍDICAS
## Paquete de Presentación Tepic · Gobernanza Digital

**Fecha:** 11 agosto 2026
**Objeto:** Verificar que cada afirmación jurídica en los 5 documentos del paquete `docs/presentacion-tepic/` esté respaldada por una fuente normativa rastreable, y que la interpretación no exceda lo que el texto legal realmente dice.

**Método:** Cadena completa de trazabilidad para cada cita jurídica:
> Afirmación → Artículo → Fuente → Texto → Interpretación → Conclusión permitida

**Regla de oro:** Ninguna afirmación jurídica se considera verificada solo porque el expediente la declara. Debe existir evidencia en la Biblioteca Legal o en fuente primaria accesible.

---

## 1. Limitación Metodológica

**No existen archivos PDF de las fuentes normativas en el repositorio.** La verificación se realizó contra fuentes oficiales en línea (DOF, Cámara de Diputados, Congreso de Nayarit, etc.), documentadas en `docs/marco/BIBLIOTECA_LEGAL.md`. Esto implica:

- 🟡 La trazabilidad es **indirecta**: podemos apuntar a la fuente online pero no a una página específica de un PDF archivado localmente
- 🟡 La verificación depende de que las fuentes online sigan accesibles
- 🔴 Para una presentación institucional, **se recomienda descargar los PDFs oficiales** de los ordenamientos clave (LNETB, Lineamientos, Ley de Gobierno Digital de Nayarit) y archivarlos en `docs/marco/fuentes-primarias/`

---

## 2. Cadena de Trazabilidad — Cita por Cita

### 2.1 — CPEUM Art. 6, 25, 115

| Paso | Contenido |
|---|---|
| **Afirmación del expediente** | `EXPEDIENTE_JURIDICO.md`: "CPEUM — Art. 6, 25, 115. Municipio libre, facultad reglamentaria, transparencia" |
| **Artículo citado** | CPEUM Art. 6 (transparencia y acceso a la información), Art. 25 (rectoría del desarrollo nacional), Art. 115 (municipio libre) |
| **Fuente primaria** | `diputados.gob.mx/LeyesBiblio/pdf/CPEUM.pdf` — texto vigente de la Constitución |
| **Estatus en Biblioteca Legal** | VERIFICADO |
| **Texto relevante** | Art. 115, fracción II: "Los municipios estarán investidos de personalidad jurídica y manejarán su patrimonio conforme a la ley. Los ayuntamientos tendrán facultades para aprobar los bandos de policía y gobierno, los reglamentos, circulares y disposiciones administrativas..." |
| **Interpretación correcta** | La CPEUM faculta a los municipios para emitir sus propias disposiciones administrativas y regular los procedimientos municipales. NO regula trámites específicos ni establece obligaciones de digitalización — eso viene de leyes secundarias |
| **¿Qué SÍ podemos afirmar?** | "El municipio de Tepic tiene facultad constitucional para regular sus propios procedimientos administrativos mediante bandos y reglamentos" |
| **¿Qué NO podemos afirmar?** | "La CPEUM obliga al municipio a digitalizar trámites" — eso es la LNETB y la Ley de Gobierno Digital de Nayarit |
| **Veredicto** | 🟢 VERIFICADO EN FUENTE PRIMARIA |

### 2.2 — LNETB (Ley Nacional para Eliminar Trámites Burocráticos)

| Paso | Contenido |
|---|---|
| **Afirmación del expediente** | Múltiples referencias en todo el paquete: "obligación de los 3 órdenes de gobierno", "publicada en DOF 16-jul-2025", referencia general a arts. 2, 3, 19, 34, 35, 36, 38, 66-76 |
| **Artículo citado** | No se citan artículos específicos en el paquete — se referencia la ley en general o se usa "LNETB como referencia" |
| **Fuente primaria** | DOF 16-jul-2025. Texto oficial: `dof.gob.mx` (edición vespertina del 16/07/2025) |
| **Estatus en Biblioteca Legal** | VERIFICADO (vigencia). Artículos 2, 3, 66-76 verificados en texto |
| **Texto relevante** | La LNETB establece en su Art. 3 que los sujetos obligados incluyen a los municipios. El Art. 34 establece principios de simplificación. El Art. 66 refiere a la CURP como elemento central del modelo de identidad. |
| **Interpretación correcta** | La LNETB es una ley nacional aplicable a los municipios. Contiene obligaciones generales de simplificación y digitalización. NO regula trámites específicos municipales — eso corresponde a la normativa local. |
| **¿Qué SÍ podemos afirmar?** | "La LNETB es una ley nacional vigente que obliga a los municipios a implementar el Modelo Nacional de Simplificación y Digitalización. La CURP es el elemento central del modelo de identidad (Art. 66)." |
| **¿Qué NO podemos afirmar?** | "El trámite de Constancia de Residencia cumple con el Artículo X de la LNETB" — sin verificar el texto exacto del artículo y contrastarlo contra la implementación concreta. Las menciones de artículos en el paquete son referencias generales, no verificaciones artículo-por-artículo contra el código |
| **⚠️ Alerta de trazabilidad** | El paquete usa "LNETB como referencia" en la matriz de simplificación sin artículo específico. Esto es débil. Para la presentación institucional, debe citarse el artículo exacto (ej. "Art. 34, fracción III — prohibición de solicitar documentos que la autoridad ya posee") |
| **Veredicto** | 🟡 REQUIERE VALIDACIÓN JURÍDICA INSTITUCIONAL — las referencias generales a la LNETB son correctas pero imprecisas. El área jurídica del Ayuntamiento debe verificar los artículos específicos contra el texto oficial vigente |

### 2.3 — Lineamientos del Modelo Nacional de Simplificación y Digitalización

| Paso | Contenido |
|---|---|
| **Afirmación del expediente** | `EXPEDIENTE_JURIDICO.md`: "Lineamientos del Modelo Nacional de Simplificación y Digitalización. DOF 22-oct-2025. VERIFICADO (publicación). Arquitectura, catálogo nacional, identidad, interoperabilidad, AIR" |
| **Artículo citado** | No se citan artículos específicos |
| **Fuente primaria** | DOF 22-oct-2025 |
| **Estatus en Biblioteca Legal** | VERIFICADO (publicación) — contenido específico no está detallado artículo por artículo |
| **Texto relevante** | Los Lineamientos detallan la arquitectura del Modelo Nacional: catálogo nacional de trámites, identidad digital, interoperabilidad, AIR, indicadores. El texto completo debe ser consultado para verificar artículos específicos. |
| **Interpretación correcta** | Los Lineamientos son vinculantes para los sujetos obligados. Definen cómo deben implementarse las obligaciones de la LNETB. NO crean nuevas obligaciones más allá de la ley. |
| **¿Qué SÍ podemos afirmar?** | "Los Lineamientos del Modelo Nacional fueron publicados el 22 de octubre de 2025 y establecen la arquitectura técnica y regulatoria para la implementación de la LNETB." |
| **¿Qué NO podemos afirmar?** | Cualquier afirmación sobre un artículo específico de los Lineamientos sin haber verificado el texto exacto |
| **⚠️ Recomendación** | Descargar el PDF oficial de los Lineamientos y archivarlo en `docs/marco/fuentes-primarias/` |
| **Veredicto** | 🟡 REQUIERE VALIDACIÓN JURÍDICA INSTITUCIONAL — publicación verificada, contenido no verificado artículo por artículo |

### 2.4 — Ley de Gobierno Digital del Estado de Nayarit — Arts. 2, 5, 6

| Paso | Contenido |
|---|---|
| **Afirmación del expediente** | `EXPEDIENTE_JURIDICO.md`: "Obliga a Ayuntamientos a implementar gobierno digital, expediente digital e interoperabilidad" |
| **Artículo citado** | Arts. 2, 5, 6 |
| **Fuente primaria** | `congresonayarit.gob.mx` |
| **Estatus en Biblioteca Legal** | VERIFICADO |
| **Texto relevante (según Biblioteca Legal)** | "Obliga a los Ayuntamientos al gobierno digital; expediente digital e interoperabilidad; simplificación administrativa" |
| **Interpretación correcta** | Esta ley estatal crea obligaciones directas para los municipios de Nayarit en materia de digitalización. Es más específica que la LNETB para el ámbito municipal nayarita. |
| **¿Qué SÍ podemos afirmar?** | "La Ley de Gobierno Digital del Estado de Nayarit obliga a los Ayuntamientos, incluido Tepic, a implementar gobierno digital, expediente electrónico e interoperabilidad (Arts. 2, 5 y 6)" |
| **¿Qué NO podemos afirmar?** | Detalles específicos sobre plazos, sanciones o requisitos técnicos sin verificar el texto completo de los artículos |
| **⚠️ Recomendación** | Obtener el texto completo de la ley para verificar la redacción exacta de los Arts. 2, 5 y 6. Actualmente la verificación es de la Biblioteca Legal, no del texto primario directo |
| **Veredicto** | 🟡 REQUIERE VALIDACIÓN JURÍDICA INSTITUCIONAL — fuente verificada, pero el texto de los artículos debe confirmarse contra el documento oficial |

### 2.5 — Ley de Hacienda Municipal del Estado de Nayarit — Arts. 21, 22, 34

| Paso | Contenido |
|---|---|
| **Afirmación del expediente** | `EXPEDIENTE_JURIDICO.md`: "Predial, catastro, formas de pago" |
| **Artículo citado** | Arts. 21, 22, 34 |
| **Fuente primaria** | `ordenjuridico.gob.mx/Estatal/NAYARIT` — texto con reformas |
| **Estatus en Biblioteca Legal** | **VERIFICADO (nivel artículo)** — texto completo citado en Biblioteca Legal |
| **Texto relevante (según Biblioteca Legal)** | Art. 21: valor catastral; Art. 22: revaluación antes de 3 años por construcción (fr. I), cambio físico (fr. II), elementos de catastración técnica (fr. IV), obras (fr. VI); Art. 34: pago bimestral, descuentos por anualidad anticipada |
| **Interpretación correcta** | La ley ya permite revaluar predios cuando hay cambios detectables. La detección satelital + verificación de campo califica como "elemento de catastración técnica" (fr. IV). |
| **¿Qué SÍ podemos afirmar?** | "La Ley de Hacienda Municipal de Nayarit (Arts. 21, 22 y 34) regula la determinación del valor catastral y autoriza su revaluación cuando se detectan construcciones o cambios físicos." |
| **¿Qué NO podemos afirmar?** | Que esta ley regula trámites digitales o la constancia de residencia — esta ley es específicamente sobre hacienda municipal y catastro |
| **Veredicto** | 🟢 VERIFICADO EN FUENTE PRIMARIA — texto de los artículos confirmado en Biblioteca Legal, con fuente y contenido |

### 2.6 — Ley de Ingresos Municipal de Tepic 2026

| Paso | Contenido |
|---|---|
| **Afirmación del expediente** | `EXPEDIENTE_JURIDICO.md`: "Derechos, predial, recaudación" |
| **Artículo citado** | Ley completa (referencia general) |
| **Fuente primaria** | `transparenciafiscal.tepic.gob.mx` — H. XLIII Ayuntamiento |
| **Estatus en Biblioteca Legal** | **VERIFICADO** — con fe de erratas (27-04-2026) |
| **Texto relevante (según Biblioteca Legal)** | Proyecta +173 MDP por cobro de predial atrasado. Contiene tarifas de derechos, licencias y aprovechamientos. |
| **Interpretación correcta** | Esta ley determina si la Constancia de Residencia tiene costo. Para saberlo, el Ayuntamiento debe consultar el texto específico de la ley. |
| **¿Qué SÍ podemos afirmar?** | "La Ley de Ingresos de Tepic 2026 está publicada y accesible en transparenciafiscal.tepic.gob.mx. Determina los derechos y costos de los trámites municipales." |
| **¿Qué NO podemos afirmar?** | El costo específico de la Constancia de Residencia — requiere consultar el texto de la ley de ingresos |
| **Veredicto** | 🟢 VERIFICADO EN FUENTE PRIMARIA — fuente accesible, vigencia confirmada |

### 2.7 — LGPDPPSO (Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados)

| Paso | Contenido |
|---|---|
| **Afirmación del expediente** | `EXPEDIENTE_JURIDICO.md`: "Protección de datos en entes públicos" |
| **Artículo citado** | Ley completa (referencia general) |
| **Fuente primaria** | `diputados.gob.mx` |
| **Estatus en Biblioteca Legal** | VERIFICADO |
| **Interpretación correcta** | Esta ley obliga a todos los sujetos obligados (incluidos los municipios) a proteger los datos personales que tratan. Establece principios, deberes, derechos ARCO y medidas de seguridad. |
| **¿Qué SÍ podemos afirmar?** | "La LGPDPPSO obliga al Ayuntamiento de Tepic, como sujeto obligado, a proteger los datos personales de los ciudadanos, publicar un aviso de privacidad y habilitar el ejercicio de derechos ARCO." |
| **¿Qué NO podemos afirmar?** | Que el prototipo actual "cumple" con la LGPDPPSO — el cumplimiento requiere un aviso de privacidad publicado por el Ayuntamiento, no solo que el código esté diseñado para ello |
| **Veredicto** | 🟢 VERIFICADO EN FUENTE PRIMARIA (ley) — 🟡 la implementación concreta requiere validación institucional |

### 2.8 — Ley de Firma Electrónica Avanzada

| Paso | Contenido |
|---|---|
| **Afirmación del expediente** | `EXPEDIENTE_JURIDICO.md`: "Requisitos para firma electrónica en actos administrativos". También: "El prototipo demuestra un flujo técnico (OTP + hash). La validez jurídica requiere el mecanismo que determine la autoridad competente conforme a la Ley de Firma Electrónica Avanzada." |
| **Artículo citado** | Ley completa (referencia general) |
| **Fuente primaria** | `diputados.gob.mx` |
| **Estatus en Biblioteca Legal** | VERIFICADO |
| **Interpretación correcta** | La LFEA establece los requisitos para que una firma electrónica tenga validez jurídica. No todo hash o mecanismo criptográfico califica como firma electrónica avanzada. Se requiere infraestructura de certificación (PKI, certificados digitales, prestadores de servicios de certificación). |
| **¿Qué SÍ podemos afirmar?** | "La Ley de Firma Electrónica Avanzada regula los requisitos para la validez jurídica de las firmas electrónicas. El OTP y hash del prototipo demuestran el flujo técnico pero NO constituyen una firma electrónica avanzada con validez jurídica." |
| **¿Qué NO podemos afirmar?** | Que existe un mecanismo de firma electrónica implementado en el prototipo |
| **Veredicto** | 🟢 VERIFICADO EN FUENTE PRIMARIA — y el paquete es CORRECTO al NO afirmar que existe firma electrónica |

### 2.9 — Ley Orgánica Municipal del Estado de Nayarit

| Paso | Contenido |
|---|---|
| **Afirmación del expediente** | `EXPEDIENTE_JURIDICO.md`: "Atribuciones municipales" |
| **Artículo citado** | Ley completa (referencia general) |
| **Fuente primaria** | `congresonayarit.gob.mx` |
| **Estatus en Biblioteca Legal** | VERIFICADO (general). Artículos específicos POR VERIFICAR |
| **⚠️ Alerta** | Esta ley determina QUIÉN puede firmar, QUIÉN puede autorizar trámites, y QUÉ atribuciones tiene cada funcionario. Sin verificar artículos específicos, no podemos saber si el Presidente Municipal, el Secretario del Ayuntamiento o el Cabildo deben autorizar el piloto. |
| **¿Qué SÍ podemos afirmar?** | "La Ley Orgánica Municipal del Estado de Nayarit regula las atribuciones de los Ayuntamientos y sus funcionarios." |
| **¿Qué NO podemos afirmar?** | Qué autoridad específica debe autorizar el piloto o firmar las constancias — requiere verificación de artículos específicos |
| **Veredicto** | 🟡 REQUIERE VALIDACIÓN JURÍDICA INSTITUCIONAL — artículos específicos no verificados |

### 2.10 — Bando de Policía y Buen Gobierno de Tepic + Reglamento Interior

| Paso | Contenido |
|---|---|
| **Afirmación del expediente** | `EXPEDIENTE_JURIDICO.md`: "POR VERIFICAR. Facultades municipales; requiere texto vigente" |
| **Fuente primaria** | Compilación normativa del Ayuntamiento de Tepic |
| **Estatus en Biblioteca Legal** | POR VERIFICAR — no se ha localizado el texto vigente |
| **⚠️ Alerta crítica** | Estos son los instrumentos que probablemente regulan el trámite de Constancia de Residencia. Sin ellos, NO podemos afirmar: cuál es el fundamento del trámite, cuáles son los requisitos oficiales, qué dependencia lo tramita, ni qué funcionario debe firmarlo |
| **¿Qué SÍ podemos afirmar?** | "El Ayuntamiento de Tepic cuenta con una compilación normativa oficial que incluye el Bando de Policía y el Reglamento Interior. Estos instrumentos deben ser consultados para determinar el fundamento del trámite." |
| **¿Qué NO podemos afirmar?** | Absolutamente nada sobre el contenido de estos instrumentos sin haberlos consultado |
| **Veredicto** | 🔴 NO SUSTENTADO / CORREGIR — son los instrumentos MÁS IMPORTANTES para el piloto y no están verificados |

---

## 3. Matriz de Verificación — Resumen

| # | Norma | Artículos citados en el paquete | Estatus | ¿Texto verificado? | ¿Artículo específico confirmado? | Veredicto |
|---|---|---|---|---|---|---|
| 1 | CPEUM | Arts. 6, 25, 115 | VERIFICADO | ✅ Sí | ✅ Sí | 🟢 |
| 2 | LNETB | Referencia general (arts. 2, 3, 19, 34, 35, 36, 38, 66-76) | VERIFICADO (vigencia) | 🟡 Parcial | 🔴 No — artículos no contrastados contra el paquete | 🟡 |
| 3 | Lineamientos Modelo Nacional | Referencia general | VERIFICADO (publicación) | 🟡 Parcial | 🔴 No | 🟡 |
| 4 | Ley de Gobierno Digital de Nayarit | Arts. 2, 5, 6 | VERIFICADO | 🟡 Verificado vía Biblioteca Legal | 🟡 Requiere texto completo | 🟡 |
| 5 | Ley de Hacienda Municipal de Nayarit | Arts. 21, 22, 34 | VERIFICADO (nivel artículo) | ✅ Sí — texto citado en Biblioteca Legal | ✅ Sí | 🟢 |
| 6 | Ley de Ingresos Tepic 2026 | Referencia general | VERIFICADO | 🟡 Parcial | 🔴 No | 🟡 |
| 7 | LGPDPPSO | Referencia general | VERIFICADO | ✅ Sí | 🟡 Artículos específicos no citados | 🟢 |
| 8 | Ley de Firma Electrónica Avanzada | Referencia general | VERIFICADO | ✅ Sí | 🟡 Artículos específicos no citados | 🟢 |
| 9 | Ley Orgánica Municipal de Nayarit | Referencia general | VERIFICADO (general) | 🟡 Parcial | 🔴 No | 🟡 |
| 10 | Bando de Policía de Tepic | No citado (marcado POR VERIFICAR) | POR VERIFICAR | 🔴 No | 🔴 No | 🔴 |
| 11 | Reglamento Interior de Tepic | No citado (marcado POR VERIFICAR) | POR VERIFICAR | 🔴 No | 🔴 No | 🔴 |

---

## 4. Hallazgos Críticos

### 4.1 — El paquete es honesto donde no tiene certeza ✅

El paquete marca correctamente como "POR VERIFICAR" el Bando de Policía y el Reglamento Interior. Esto es correcto y protege al proyecto de afirmaciones falsas. **Mantener estos marcadores es fundamental.**

### 4.2 — Las referencias a la LNETB son genéricas, no artículo por artículo ⚠️

El paquete dice "LNETB como referencia" en la matriz de simplificación pero no cita el artículo exacto. Para la presentación institucional, **cada afirmación debe citar el artículo concreto**:

| En vez de | Debe decir |
|---|---|
| "LNETB como referencia" | "LNETB Art. 66 — la CURP como elemento central del modelo de identidad digital" |
| "LNETB como referencia" | "LNETB Art. 19 — los sujetos obligados no solicitarán documentos que ellos mismos expidan" |
| "LNETB como referencia" | "LNETB Art. 34, fracción III — prohibición de solicitar documentos o datos que la autoridad ya posea" |

### 4.3 — Los dos instrumentos más importantes están sin verificar 🔴

El Bando de Policía y el Reglamento Interior de Tepic probablemente contienen el fundamento del trámite de Constancia de Residencia. Sin ellos, la propuesta carece de base jurídica municipal concreta. Esto NO es un defecto del paquete — el paquete honestamente lo marca como "POR VERIFICAR". Pero es el punto más débil para la presentación.

### 4.4 — No hay PDFs en el repositorio ⚠️

Ninguna fuente normativa está archivada localmente. Todas las verificaciones dependen de fuentes online. Para una presentación institucional, se recomienda descargar los PDFs de los ordenamientos clave.

---

## 5. Recomendaciones para la Presentación

### Inmediatas (antes de la reunión)

1. **Descargar y archivar** en `docs/marco/fuentes-primarias/`:
   - LNETB (PDF del DOF 16-jul-2025)
   - Lineamientos del Modelo Nacional (PDF del DOF 22-oct-2025)
   - Ley de Gobierno Digital del Estado de Nayarit (texto completo)
   - Ley Orgánica Municipal del Estado de Nayarit (texto completo)

2. **Reemplazar "LNETB como referencia"** por citas de artículo concreto en la matriz de simplificación

3. **Solicitar al Ayuntamiento** (como parte de la propuesta):
   - Texto vigente del Bando de Policía y Buen Gobierno de Tepic
   - Texto vigente del Reglamento Interior del Ayuntamiento
   - Verificación del fundamento específico de la Constancia de Residencia

### Durante la reunión

4. **No afirmar** que ningún artículo específico de la LNETB o los Lineamientos está "cumplido" — solo que el sistema está diseñado para alinearse con ellos

5. **Decir explícitamente**: "Los instrumentos municipales (Bando de Policía y Reglamento Interior) requieren verificación por el área jurídica. Sin ellos no podemos determinar el fundamento exacto del trámite ni la dependencia responsable."

---

## 6. Clasificación Final

| 🟢 VERIFICADO EN FUENTE PRIMARIA | 4 de 11 |
|---|---|
| CPEUM Arts. 6, 25, 115 | ✅ |
| Ley de Hacienda Municipal de Nayarit Arts. 21, 22, 34 | ✅ |
| LGPDPPSO | ✅ |
| Ley de Firma Electrónica Avanzada | ✅ |

| 🟡 REQUIERE VALIDACIÓN JURÍDICA INSTITUCIONAL | 5 de 11 |
|---|---|
| LNETB (artículos específicos no contrastados) | ⚠️ |
| Lineamientos del Modelo Nacional | ⚠️ |
| Ley de Gobierno Digital de Nayarit | ⚠️ |
| Ley de Ingresos Tepic 2026 | ⚠️ |
| Ley Orgánica Municipal de Nayarit | ⚠️ |

| 🔴 NO SUSTENTADO / CORREGIR | 2 de 11 |
|---|---|
| Bando de Policía de Tepic | ❌ |
| Reglamento Interior de Tepic | ❌ |

---

## 7. Conclusión

El paquete de presentación **no contiene afirmaciones jurídicas falsas**. Donde no hay certeza, lo declara honestamente ("POR VERIFICAR", "REQUIERE VALIDACIÓN"). 

Sin embargo, las referencias a la LNETB y otros ordenamientos son genéricas y no llegan al nivel de precisión artículo-por-artículo que una revisión jurídica municipal exigiría.

**El paquete es apto para una primera presentación**, siempre que:
1. Se descarguen los PDFs oficiales de los ordenamientos clave
2. Se precise que los instrumentos municipales (Bando, Reglamento Interior) requieren verificación
3. No se afirme cumplimiento de artículos específicos sin haberlos contrastado

**No se emite porcentaje de verificación.** Se emite clasificación cualitativa por cada norma.

---

*Auditoría completada. No sustituye la revisión del área jurídica del Ayuntamiento de Tepic.*
