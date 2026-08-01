# Biblioteca Legal — Nayarit Digital · ConnectX

> Regla de oro (Glosario Oficial): **solo se cita públicamente lo que está en estatus VERIFICADO**.
> Lo POR VERIFICAR se usa internamente pero nunca se afirma en público hasta confirmar texto y vigencia.
> Fuentes primarias de referencia: DOF (dof.gob.mx), Cámara de Diputados (diputados.gob.mx/LeyesBiblio), SIL (sil.gobernacion.gob.mx), Periódico Oficial del Estado de Nayarit.

Última revisión: 2026-08-01.

---

## 0. Núcleo transversal (el SOATM)

| Ordenamiento | Qué ordena | Estatus |
|---|---|---|
| CPEUM Art. 6 | Transparencia y acceso a la información pública | VERIFICADO |
| CPEUM Art. 115 | Facultades municipales: agua, drenaje, alumbrado, calles, mercados, rastros, panteones, limpieza | VERIFICADO |
| LNETB (federal) Arts. 2, 3, 66–76 | Eliminación de trámites, Llave MX (Art. 3, fr. XVIII), Portal Ciudadano Único (fr. XXV), expediente digital, repositorio | VERIFICADO |
| Ley de Gobierno Digital del Estado de Nayarit Arts. 2, 5, 6 | Obliga a los Ayuntamientos al gobierno digital; expediente digital e interoperabilidad; simplificación administrativa | VERIFICADO |
| LGDNNA Arts. 101 Bis y 101 Bis 3 | Derecho a la identidad de niñas, niños y adolescentes (base de la Llave Infantil) | VERIFICADO |
| LFPDPPP | Datos personales en posesión de sujetos obligados; datos sensibles exigen consentimiento expreso | VERIFICADO |
| Reforma constitucional dic-2024 (transparencia) | Extinción del INAI; funciones pasan a la Secretaría Anticorrupción y Buen Gobierno | VERIFICADO (estudiar la transición) |

## 1. Salud (módulo Salud Inteligente)

| Ordenamiento | Qué ordena | Estatus |
|---|---|---|
| Ley General de Salud | Marco sanitario general; jurisdicciones sanitarias | VERIFICADO |
| **NOM-024-SSA3-2012** | Sistemas de información de registro electrónico para la salud (expediente clínico electrónico, consentimiento, accesos) | PENDIENTE PDF (citada internamente) |
| LFPDPPP (datos de salud = sensibles) | Consentimiento expreso, ARCO, aviso de privacidad | VERIFICADO |
| Patrón propio implementado | Búsqueda por CURP + consentimiento del paciente + bitácora de accesos sellada (módulo Salud ya opera sobre Firestore real) | VERIFICADO (código) |

## 2. Agricultura (módulo Agrovisión 3D)

| Ordenamiento | Qué ordena | Estatus |
|---|---|---|
| Ley de Desarrollo Rural Sustentable (DOF 07-12-2001) | Art. 137–138: Sistema Nacional de Información para el Desarrollo Rural — la información rural es **de interés público** y el Estado debe difundirla al nivel municipal. Art. 140: padrón único de beneficiarios con **CURP** (misma clave que Nayarit ID). Arts. 164–168: sustentabilidad, carga animal, tecnificación del riego | VERIFICADO (diputados.gob.mx/LeyesBiblio/pdf/LDRS.pdf) |
| Ley Federal de Sanidad Vegetal (DOF 05-01-1994) | Prevención y control de plagas; SENASICA como autoridad | VERIFICADO |
| Programas SADER vigentes | Producción para el Bienestar, Fertilizantes para el Bienestar, Precios de Garantía, Sembrando Vida — requieren padrón con CURP | VERIFICADO (nombres de programa; reglas de operación anuales POR VERIFICAR cada año) |
| Ley de Aguas Nacionales | Riego, concesiones, CONAGUA (módulo futuro: riego) | VERIFICADO (general) |
| Ley Agraria / RAN | Registro Agrario Nacional: cédulas de inscripción de ejidos y comunidades (módulo futuro: certeza parcelaria digital) | VERIFICADO (general; arts. específicos POR VERIFICAR) |

**Lectura estratégica:** la LDRS Art. 138 dice que la información rural es interés público y el Estado debe ponerla al alcance del productor. Agrovisión 3D no es un lujo: es la ejecución municipal de esa obligación — NDVI, humedad y precios al alcance del productor con su CURP.

## 3. Ganadería (extensión de Agrovisión — módulo Ganado)

| Ordenamiento | Qué ordena | Estatus |
|---|---|---|
| **Ley Federal de Sanidad Animal** (DOF 25-07-2007, reformada 21-05-2024) | Diagnóstico, prevención, control y erradicación de enfermedades animales; bienestar animal (Arts. 22–23); buenas prácticas pecuarias; regula sacrificio y procesamiento. Autoridad: SADER/SENASICA | VERIFICADO |
| Padrón Ganadero Nacional (PGN) y Clave UPP | Base: Ley Federal de Sanidad Animal, Título IV, Cap. I, Arts. 56 y 58 (+ LDRS Art. 32 fr. V). Alta y actualización de la Unidad de Producción Pecuaria; inventario ganadero; trámite gratuito ante la dirección municipal de ganadería | VERIFICADO |
| SINIIGA | Sistema Nacional de Identificación Individual de Ganado (aretes/trazabilidad animal), operado por SENASICA | VERIFICADO (sistema; fundamento NOM específico POR VERIFICAR) |
| Ley de Organizaciones Ganaderas | Asociaciones ganaderas locales y su registro (contraparte organizada para el piloto ganadero) | VERIFICADO (general) |
| NOM-009-ZOO-1994 | Procesamiento sanitario de productos cárnicos (rastros) | VERIFICADO (citada en reglamentos municipales de rastro) |
| NOM-033-ZOO-1995 | Sacrificio humanitario de animales | VERIFICADO (idem) |
| NOM-051-ZOO-1995 | Trato humanitario en la movilización de animales | VERIFICADO (citada en iniciativa SIL 2025-11) |
| NOM-194-SSA1-2004 | Productos cárnicos en establecimientos (SSA/COFEPRIS) | VERIFICADO (idem) |
| Reforma CPEUM dic-2024 (bienestar animal) | Arts. 3, 4 y 73: el bienestar animal es mandato constitucional; faculta al Congreso una Ley General de Bienestar, Cuidado y Protección Animal | VERIFICADO (seguir la ley general cuando se expida) |
| Ley Ganadera del Estado de Nayarit | Marco estatal ganadero (marcas, fierros, guías de tránsito) | PENDIENTE PDF — conseguir texto vigente |

**Lectura estratégica:** la Clave UPP + SINIIGA + guías de tránsito son un sistema de identidad y trazabilidad **animal** que el Estado federal ya obliga — el módulo Ganado de ConnectX es la ventanilla municipal digital de ese sistema: alta en PGN desde el celular del productor, inventario con georreferencia, guías de movilización con folio sellado (mismo patrón que el Nodo de Transparencia).

## 4. Servicios de uso frecuente ciudadano (mapa de oportunidad)

| Trámite/servicio | Base normativa | Módulo SOATM | Estatus de la cita |
|---|---|---|---|
| Actas de nacimiento/matrimonio/defunción | Ley General de Población + Código Civil del Estado de Nayarit (Registro Civil) | Registro Civil digital | VERIFICADO (general) |
| CURP | RENAPO / Ley General de Población | Identidad (Nayarit ID la usa como llave) | VERIFICADO |
| Predial y catastro | Código Fiscal del Estado de Nayarit + Ley de Hacienda Municipal de Tepic + CPEUM 115 fr. IV | Tesorería Digital | VERIFICADO (general) |
| Agua potable y drenaje | Ley de Aguas Nacionales + reglamento del organismo operador municipal (CPEUM 115 fr. I) | Servicios / Tesorería | VERIFICADO (general) |
| Licencias de funcionamiento | CPEUM 115 fr. VI + Ley de Desarrollo Urbano del Estado de Nayarit | Ventanilla de licencias | VERIFICADO (general) |
| Rastro municipal | CPEUM 115 fr. III + reglamento municipal de rastro + NOM-009-ZOO-1994 / NOM-033-ZOO-1995 / NOM-194-SSA1-2004 | Módulo Ganado (punto de convergencia con el ciudadano) | VERIFICADO |
| Limpieza pública / basura | CPEUM 115 + NOM-083-SEMARNAT-2003 (separación y manejo de RSU) | Servicios Públicos | VERIFICADO |
| Alumbrado, baches, calles | CPEUM 115 | Servicios Públicos (reporte con folio — ya demo) | VERIFICADO |
| Tránsito y movilidad | Ley de Movilidad y Seguridad Vial del Estado de Nayarit | Módulo futuro | POR VERIFICAR (nombre exacto y vigencia) |
| Protección civil | Ley General de Protección Civil (2012) + ley estatal | C5 / alertas | VERIFICADO (general) |
| DIF y asistencia social | Ley de Asistencia Social (federal/estatal) | Bienestar Social | VERIFICADO (general) |
| Bienestar animal doméstico | Reforma CPEUM dic-2024 + Código Penal estatal (maltrato) | Módulo futuro (censo/clínica veterinaria municipal) | VERIFICADO (reforma constitucional) |

## 5. Pendientes de la biblioteca (conseguir PDF oficial)

- [ ] NOM-024-SSA3-2012 (texto completo, DOF)
- [ ] Iniciativa 18 Bis (PDF del SIL — la descarga Miguel desde su red)
- [ ] Presupuesto de Egresos de Tepic 2026
- [ ] Plan Nacional de Desarrollo 2025–2030
- [ ] Ley Ganadera del Estado de Nayarit (texto vigente)
- [ ] Ley de Desarrollo Rural Sustentable del Estado de Nayarit o equivalente estatal (POR VERIFICAR existencia y nombre exacto)
- [ ] Ley de Movilidad y Seguridad Vial de Nayarit (nombre/vigencia)
- [ ] Reglamento de Rastro del Municipio de Tepic
- [ ] Legislación de armonización de Nayarit con la LNETB

---

*Cada módulo del SOATM tiene su ley. La ley ya lo ordena; el código ya lo ejecuta; la bitácora ya lo comprueba.*
