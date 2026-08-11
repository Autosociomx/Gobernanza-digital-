# TABLA DE MIGRACIÓN DOCUMENTAL
## De la estructura actual a la nueva estructura orientada a problema → solución → evidencia

**Fecha:** 11 agosto 2026
**Objeto:** Mapear los 88 archivos .md existentes en `docs/` a la nueva estructura de 12 carpetas con la lógica de 7 preguntas obligatorias y ficha estándar. Sin mover físicamente archivos aún. Esta tabla es la auditoría previa a la reingeniería documental.

---

## Nueva Estructura (12 carpetas)

```
docs/presentacion-tepic/
│
├── 00_INDICE_MAESTRO/
├── 01_PROBLEMA_PUBLICO/
├── 02_TRAMITE_PRIORIZADO/
├── 03_REINGENIERIA_Y_SIMPLIFICACION/
├── 04_SOLUCION_DIGITAL/
├── 05_MARCO_JURIDICO/
├── 06_EVIDENCIA_TECNICA/
├── 07_GOBERNANZA_E_INSTITUCIONALIZACION/
├── 08_PILOTO_TEPIC/
├── 09_CUMPLIMIENTO_ATDT/
├── 10_RIESGOS_Y_CONTRAAUDITORIA/
└── 11_INSTRUMENTOS_INSTITUCIONALES/
```

### Las 7 preguntas obligatorias de cada carpeta

1. ¿Cuál es el problema público?
2. ¿A quién afecta?
3. ¿Qué obligación o necesidad institucional existe?
4. ¿Qué solución proponemos?
5. ¿Qué evidencia tenemos hoy?
6. ¿Qué falta para implementarla oficialmente?
7. ¿Quién tiene que autorizar o producir lo pendiente?

---

## TABLA DE MIGRACIÓN

### CARPETA 00 — ÍNDICE MAESTRO

| # | Archivo origen | Contenido real | Nuevo nombre | Ficha 7 preguntas | Estado actual |
|---|---|---|---|---|---|
| 00.1 | `presentacion-tepic/README.md` | Resumen ejecutivo y mapa del paquete actual | `README.md` | Sí — ya contiene resumen ejecutivo | 🟢 Reutilizar |
| 00.2 | *NUEVO* | — | `RESUMEN_EJECUTIVO.md` | Sí (problema, propuesta, solicitud) | 🔴 Crear |
| 00.3 | *NUEVO* | — | `MAPA_DEL_EXPEDIENTE.md` | No (es índice) | 🔴 Crear |
| 00.4 | *NUEVO* | — | `MATRIZ_DE_TRAZABILIDAD_GENERAL.md` | Sí (cruce norma-artículo-evidencia) | 🔴 Crear a partir de `AUDITORIA_TRAZABILIDAD_NORMATIVA.md` |

### CARPETA 01 — PROBLEMA PÚBLICO

| # | Archivo origen | Contenido real | Nuevo nombre | Ficha 7 preguntas | Estado |
|---|---|---|---|---|---|
| 01.1 | `expediente-regulatorio/diagnostico.md` | Diagnóstico del prototipo, naturaleza, roles | `DIAGNOSTICO_DEL_PROBLEMA.md` | ✅ Cubre 1,2,3 parcialmente | 🟡 Adaptar |
| 01.2 | *NUEVO* | — | `CARGA_BUROCRATICA_ACTUAL.md` | Sí (¿cuánto cuesta hoy al ciudadano y al municipio?) | 🔴 Crear |
| 01.3 | `presentacion-tepic/04-reingenieria/REINGENIERIA.md` | AS-IS parcial con formato de levantamiento | `EXPERIENCIA_CIUDADANA_AS_IS.md` | ✅ Cubre 1,2 parcialmente | 🟡 Extraer sección AS-IS |
| 01.4 | *NUEVO* | — | `EVIDENCIA_DEL_PROBLEMA.md` | Sí (datos duros, fuentes verificables) | 🔴 Crear |

### CARPETA 02 — TRÁMITE PRIORIZADO

| # | Archivo origen | Contenido real | Nuevo nombre | Ficha 7 preguntas | Estado |
|---|---|---|---|---|---|
| 02.1 | `presentacion-tepic/01-propuesta/PROPUESTA_LABORATORIO_TEPIC.md` | Sección del trámite piloto | `FICHA_TECNICA_TRAMITE.md` | ✅ Cubre 1,3,4 | 🟡 Extraer y adaptar |
| 02.2 | `presentacion-tepic/02-juridico/EXPEDIENTE_JURIDICO.md` | Sección A: Fundamento del trámite | `FUNDAMENTO_DEL_TRAMITE.md` | ✅ Cubre 3 | 🟡 Extraer sección A |
| 02.3 | *NUEVO* | — | `ACTORES_INSTITUCIONALES.md` | Sí (¿quién interviene y con qué facultad?) | 🔴 Crear |
| 02.4 | `presentacion-tepic/04-reingenieria/REINGENIERIA.md` | Formato de levantamiento de requisitos | `REQUISITOS_ACTUALES.md` | ✅ Cubre 1,5 | 🟡 Extraer formato |
| 02.5 | *NUEVO* | — | `FUENTES_OFICIALES.md` | Sí (¿dónde está publicado el trámite?) | 🔴 Crear — apunta a Biblioteca Legal |

### CARPETA 03 — REINGENIERÍA Y SIMPLIFICACIÓN

| # | Archivo origen | Contenido real | Nuevo nombre | Ficha 7 preguntas | Estado |
|---|---|---|---|---|---|
| 03.1 | `presentacion-tepic/04-reingenieria/REINGENIERIA.md` | AS-IS completo | `PROCESO_AS_IS.md` | ✅ Cubre 1,2,5 | 🟡 Extraer sección AS-IS |
| 03.2 | `presentacion-tepic/04-reingenieria/REINGENIERIA.md` | TO-BE propuesto | `PROCESO_TO_BE_PROPUESTO.md` | ✅ Cubre 4 | 🟡 Extraer sección TO-BE |
| 03.3 | `presentacion-tepic/04-reingenieria/REINGENIERIA.md` | Matriz de eliminación de requisitos | `MATRIZ_REQUISITO_POR_REQUISITO.md` | ✅ Cubre 4,5,6,7 | 🟡 Extraer y fortalecer con artículos concretos |
| 03.4 | `expediente-regulatorio/datos-personales.md` | Datos recabados, minimización | `MATRIZ_DATOS_Y_DOCUMENTOS.md` | ✅ Cubre 5,6 | 🟡 Adaptar |
| 03.5 | `expediente-regulatorio/simplificacion.md` | Metas y cálculos de reducción | `ANALISIS_DE_CARGAS.md` | ✅ Cubre 5 | 🟡 Adaptar — marcar como proyecciones |
| 03.6 | `presentacion-tepic/04-reingenieria/REINGENIERIA.md` | Indicadores propuestos | `INDICADORES_PROPUESTOS.md` | ✅ Cubre 5 | 🟡 Extraer |

### CARPETA 04 — SOLUCIÓN DIGITAL

| # | Archivo origen | Contenido real | Nuevo nombre | Ficha 7 preguntas | Estado |
|---|---|---|---|---|---|
| 04.1 | `presentacion-tepic/01-propuesta/PROPUESTA_LABORATORIO_TEPIC.md` | Propuesta completa | `PROPUESTA_DE_SOLUCION.md` | ✅ Cubre 4 | 🟡 Adaptar |
| 04.2 | `presentacion-tepic/03-tecnico/EXPEDIENTE_TECNICO.md` | Arquitectura real | `ARQUITECTURA_FUNCIONAL.md` | ✅ Cubre 5 | 🟡 Separar funcional de técnica |
| 04.3 | `expediente-regulatorio/arquitectura.md` + `plataforma/02-ARQUITECTURA-SISTEMA.md` | Diagramas, stack, modelo de datos | `ARQUITECTURA_TECNICA.md` | ✅ Cubre 5 | 🟢 Fusionar |
| 04.4 | `presentacion-tepic/04-reingenieria/REINGENIERIA.md` | TO-BE flujo | `FLUJO_DIGITAL_DEL_TRAMITE.md` | ✅ Cubre 4 | 🟡 Extraer |
| 04.5 | `presentacion-tepic/03-tecnico/EXPEDIENTE_TECNICO.md` | Sección identidad (CURP) | `IDENTIDAD_DIGITAL.md` | ✅ Cubre 4,5,6 | 🟡 Extraer con honestidad |
| 04.6 | `presentacion-tepic/03-tecnico/EXPEDIENTE_TECNICO.md` + `marco/MODULO_SALUD_CURP.md` | Expediente/Firestore | `EXPEDIENTE_DIGITAL.md` | ✅ Cubre 4,5,6 | 🟡 Fusionar |
| 04.7 | `presentacion-tepic/03-tecnico/EXPEDIENTE_TECNICO.md` | Sección firma | `FIRMA_Y_AUTENTICIDAD.md` | ✅ Cubre 4,5,6 | 🟡 Extraer — CLARO que no existe |
| 04.8 | `expediente-regulatorio/interoperabilidad.md` | Diseño de conectores (sin conexiones) | `INTEROPERABILIDAD.md` | ✅ Cubre 4,5,6 | 🟡 Adaptar |

### CARPETA 05 — MARCO JURÍDICO

| # | Archivo origen | Contenido real | Nuevo nombre | Ficha 7 preguntas | Estado |
|---|---|---|---|---|---|
| 05.1 | `AUDITORIA_TRAZABILIDAD_NORMATIVA.md` | Trazabilidad de las 11 normas del paquete | `MATRIZ_NORMA_ARTICULO_EVIDENCIA.md` | ✅ Cubre 3,5,6 | 🟢 Casi listo — completar cadenas |
| 05.2 | *NUEVO* | — | `FUNDAMENTO_CONSTITUCIONAL.md` | Sí (CPEUM 6, 25, 115) | 🔴 Extraer de Biblioteca Legal |
| 05.3 | *NUEVO* | — | `LNETB.md` | Sí (artículo por artículo aplicable) | 🔴 Crear a partir de `MARCO_CUMPLIMIENTO_LNETB.md` |
| 05.4 | *NUEVO* | — | `LINEAMIENTOS_MODELO_NACIONAL.md` | Sí (requisitos específicos) | 🔴 Crear |
| 05.5 | *NUEVO* | — | `NORMATIVA_ESTATAL.md` | Sí (Ley Gobierno Digital, Hacienda, Orgánica Municipal) | 🔴 Extraer de Biblioteca Legal |
| 05.6 | *NUEVO* | — | `NORMATIVA_MUNICIPAL.md` | Sí (Bando, Reglamento Interior, Ley de Ingresos) | 🔴 Crear — marcar POR VERIFICAR |
| 05.7 | `expediente-regulatorio/datos-personales.md` + parte de `PROTOCOLO_SEGURIDAD.md` | Aviso, ARCO, minimización | `PROTECCION_DE_DATOS.md` | ✅ Cubre 3,6,7 | 🟢 Fusionar |
| 05.8 | *NUEVO* | — | `ARCHIVO_Y_CONSERVACION.md` | Sí (Ley de Archivos, plazos) | 🔴 Crear |

### CARPETA 06 — EVIDENCIA TÉCNICA

| # | Archivo origen | Contenido real | Nuevo nombre | Ficha 7 preguntas | Estado |
|---|---|---|---|---|---|
| 06.1 | `presentacion-tepic/03-tecnico/EXPEDIENTE_TECNICO.md` | Inventario real del repo | `INVENTARIO_REAL_DEL_REPOSITORIO.md` | ✅ Cubre 5 | 🟢 Reutilizar |
| 06.2 | *NUEVO* | — | `MATRIZ_CODIGO_FUNCIONALIDAD.md` | Sí (archivo → funcionalidad → estado) | 🔴 Crear |
| 06.3 | *NUEVO* | — | `EVIDENCIA_DEMO.md` | Sí (screenshots, URLs, flujo grabado) | 🔴 Crear |
| 06.4 | `PROTOCOLO_SEGURIDAD.md` | Seguridad documentada | `SEGURIDAD.md` | ✅ Cubre 5,6 | 🟢 Reutilizar |
| 06.5 | *NUEVO* | — | `ACCESIBILIDAD.md` | Sí (WCAG — honesto: no verificado) | 🔴 Crear |
| 06.6 | `netlify.toml` + `firebase-applet-config.json` | Infraestructura real | `INFRAESTRUCTURA.md` | ✅ Cubre 5 | 🔴 Crear |
| 06.7 | `presentacion-tepic/03-tecnico/EXPEDIENTE_TECNICO.md` | Sección "Lo que NO existe" | `LIMITACIONES_CONOCIDAS.md` | ✅ Cubre 6 | 🟢 Extraer |

### CARPETA 07 — GOBERNANZA E INSTITUCIONALIZACIÓN

| # | Archivo origen | Contenido real | Nuevo nombre | Ficha 7 preguntas | Estado |
|---|---|---|---|---|---|
| 07.1 | *NUEVO* | — | `MODELO_DE_GOBERNANZA.md` | Sí (¿quién decide qué?) | 🔴 Crear |
| 07.2 | `presentacion-tepic/01-propuesta/PROPUESTA_LABORATORIO_TEPIC.md` | Roles proponente vs Ayuntamiento | `ROLES_Y_RESPONSABILIDADES.md` | ✅ Cubre 7 | 🟡 Extraer y formalizar |
| 07.3 | *NUEVO* | — | `RESPONSABILIDADES_DEL_AYUNTAMIENTO.md` | Sí (lista concreta) | 🔴 Crear |
| 07.4 | *NUEVO* | — | `RESPONSABILIDADES_DEL_PROPONENTE.md` | Sí (lista concreta) | 🔴 Crear |
| 07.5 | *NUEVO* | — | `CONVENIOS_REQUERIDOS.md` | Sí (RENAPO, SAT, SIAPA, Catastro) | 🔴 Crear |
| 07.6 | `presentacion-tepic/02-juridico/EXPEDIENTE_JURIDICO.md` | Sección competencias | `AUTORIZACIONES_REQUERIDAS.md` | ✅ Cubre 6,7 | 🟡 Extraer |
| 07.7 | *NUEVO* | — | `PLAN_DE_TRANSFERENCIA.md` | Sí (del proponente al Ayuntamiento) | 🔴 Crear |

### CARPETA 08 — PILOTO TEPIC

| # | Archivo origen | Contenido real | Nuevo nombre | Ficha 7 preguntas | Estado |
|---|---|---|---|---|---|
| 08.1 | `presentacion-tepic/01-propuesta/PROPUESTA_LABORATORIO_TEPIC.md` | Propuesta de piloto | `PROPUESTA_DE_PILOTO.md` | ✅ Cubre 4 | 🟡 Adaptar |
| 08.2 | *NUEVO* | — | `OBJETIVOS.md` | Sí | 🔴 Crear |
| 08.3 | *NUEVO* | — | `ALCANCE.md` | Sí | 🔴 Crear |
| 08.4 | `expediente-regulatorio/plan-piloto.md` | Etapas A→F | `FASES_DE_IMPLEMENTACION.md` | ✅ Cubre 4,6 | 🟢 Reutilizar |
| 08.5 | *NUEVO* | — | `SANDBOX.md` | Sí (entorno controlado sin efectos jurídicos) | 🔴 Crear |
| 08.6 | *NUEVO* | — | `PLAN_DE_PRUEBAS.md` | Sí | 🔴 Crear |
| 08.7 | *NUEVO* | — | `DATOS_DE_PRUEBA.md` | Sí (CURP sintéticas, CP válidos) | 🔴 Crear |
| 08.8 | *NUEVO* | — | `CRITERIOS_GO_NO_GO.md` | Sí (checklist antes de cada etapa) | 🔴 Crear |

### CARPETA 09 — CUMPLIMIENTO ATDT

| # | Archivo origen | Contenido real | Nuevo nombre | Ficha 7 preguntas | Estado |
|---|---|---|---|---|---|
| 09.1 | *NUEVO* — basado en `MARCO_CUMPLIMIENTO_LNETB.md` | Matriz contra Modelo Nacional | `MATRIZ_MODELO_NACIONAL.md` | ✅ Cubre 3,5 | 🔴 Crear |
| 09.2 | *NUEVO* | — | `PRINCIPIOS_DE_SIMPLIFICACION.md` | Sí | 🔴 Crear |
| 09.3 | *NUEVO* | — | `DIGITALIZACION_END_TO_END.md` | Sí | 🔴 Crear |
| 09.4 | *NUEVO* | — | `INTEROPERABILIDAD.md` (enfoque ATDT) | Sí | 🔴 Crear |
| 09.5 | *NUEVO* | — | `IDENTIDAD_DIGITAL.md` (enfoque ATDT) | Sí | 🔴 Crear |
| 09.6 | *NUEVO* | — | `EXPEDIENTE_DIGITAL.md` (enfoque ATDT) | Sí | 🔴 Crear |
| 09.7 | *NUEVO* | — | `INDICADORES.md` (estándar nacional) | Sí | 🔴 Crear |
| 09.8 | *NUEVO* | — | `MATRIZ_ATDT_TEPIC.md` | Sí (cruce obligaciones ATDT vs capacidades Tepic) | 🔴 Crear |

### CARPETA 10 — RIESGOS Y CONTRA-AUDITORÍA

| # | Archivo origen | Contenido real | Nuevo nombre | Ficha 7 preguntas | Estado |
|---|---|---|---|---|---|
| 10.1 | *NUEVO* | — | `MATRIZ_DE_RIESGOS.md` | Sí (jurídicos, técnicos, operativos, políticos) | 🔴 Crear |
| 10.2 | `contra-auditoria-lnetb-2026-08-11.md` | Corrección de errores, 25 objeciones | `CONTRA_AUDITORIA_LNETB.md` | ✅ Cubre 5,6 | 🟢 Reutilizar |
| 10.3 | *NUEVO* | — | `OBJECIONES_ADVERSARIALES.md` | Sí (100+ objeciones que la autoridad podría hacer) | 🔴 Crear a partir de sección N de la contra-auditoría |
| 10.4 | `contra-auditoria-lnetb-2026-08-11.md` | Hallazgos de brechas | `BRECHAS.md` | ✅ Cubre 6 | 🟢 Extraer |
| 10.5 | `PLAN_TRABAJO_POST_CONTRA_AUDITORIA.md` | 12 tareas priorizadas P0-P2 | `PLAN_DE_MITIGACION.md` | ✅ Cubre 6,7 | 🟢 Reutilizar |

### CARPETA 11 — INSTRUMENTOS INSTITUCIONALES

| # | Archivo origen | Contenido real | Nuevo nombre | Ficha 7 preguntas | Estado |
|---|---|---|---|---|---|
| 11.1 | *NUEVO* | — | `PROYECTO_CONVENIO.md` | Sí (borrador de convenio Ayuntamiento-Proponente) | 🔴 Crear |
| 11.2 | *NUEVO* | — | `PROYECTO_PUNTO_DE_ACUERDO.md` | Sí (borrador para Cabildo) | 🔴 Crear |
| 11.3 | `expediente-regulatorio/impacto-regulatorio.md` | Minuta AIR | `FICHA_AIR_O_EXENCION.md` | ✅ Cubre 3,6,7 | 🟢 Reutilizar |
| 11.4 | `expediente-regulatorio/datos-personales.md` | Minuta aviso de privacidad | `AVISO_DE_PRIVACIDAD.md` | ✅ Cubre 3,6,7 | 🟢 Reutilizar |
| 11.5 | *NUEVO* | — | `DESIGNACION_FUNCIONARIO.md` | Sí (formato para designación de firmante) | 🔴 Crear |
| 11.6 | *NUEVO* | — | `PLAN_DE_CAPACITACION.md` | Sí | 🔴 Crear |

---

## RESUMEN DE LA MIGRACIÓN

| Carpeta nueva | Archivos a crear | Archivos a reutilizar/adaptar de existentes | Total |
|---|---|---|---|
| 00 Índice Maestro | 3 | 1 | 4 |
| 01 Problema Público | 2 | 2 | 4 |
| 02 Trámite Priorizado | 3 | 2 | 5 |
| 03 Reingeniería | 0 | 6 | 6 |
| 04 Solución Digital | 0 | 8 | 8 |
| 05 Marco Jurídico | 6 | 2 | 8 |
| 06 Evidencia Técnica | 5 | 2 | 7 |
| 07 Gobernanza | 6 | 1 | 7 |
| 08 Piloto Tepic | 7 | 1 | 8 |
| 09 Cumplimiento ATDT | 8 | 0 | 8 |
| 10 Riesgos | 3 | 2 | 5 |
| 11 Instrumentos | 4 | 2 | 6 |
| **TOTAL** | **47** | **29** | **76** |

---

## ESTADO ACTUAL DE CADA DOCUMENTO EXISTENTE

Los 88 archivos .md existentes se clasifican así:

| Uso en la nueva estructura | Cantidad |
|---|---|
| 🟢 Se reutiliza directamente (sin cambios) | 12 |
| 🟡 Se adapta (extraer sección, fusionar, fortalecer) | 17 |
| 🔴 Se crea nuevo (no existe equivalente) | 47 |
| ⚪ Se mantiene donde está (interno, no migra) | 59 |

**Nota sobre los 59 que no migran:** Son documentación interna del proyecto (actas del Gabinete, módulos del orbe, documentación de plataforma, skills de Claude, contexto interno). Estos archivos se conservan en sus ubicaciones actuales. Solo migran a `presentacion-tepic/` los documentos relevantes para el Ayuntamiento.

---

## Siguiente paso recomendado

1. **Primero:** Descargar PDFs oficiales de las fuentes primarias faltantes y archivarlos en `docs/marco/fuentes-primarias/`
2. **Segundo:** Crear las 12 carpetas vacías con su README.md (plantilla de ficha estándar)
3. **Tercero:** Migrar los 29 documentos reutilizables (copiar + adaptar, no mover)
4. **Cuarto:** Redactar los 47 documentos nuevos priorizando: Marco Jurídico → Instrumentos → Piloto → Gobernanza
5. **Quinto:** Auditoría final de citas legales contra PDFs archivados

**No se moverá ningún archivo de su ubicación actual hasta completar la migración y verificar que la nueva estructura funciona.**

---

*Tabla de migración generada como auditoría previa — no se han movido archivos físicamente.*
