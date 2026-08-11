# Carpeta 05 — Índice de Anexos

## Objetivo

Este documento identifica la documentación de respaldo disponible en el repositorio y distingue entre documentación existente y documentación que deberá producirse posteriormente.

**Regla: no incluir un documento en la sección "Anexos existentes" si no existe físicamente en el repositorio.**

---

## Anexos existentes

Verificados por inspección directa del repositorio `Gobernanza-digital-/` al 11-ago-2026.

| ID | Documento | Ubicación | Tipo | Estado | Utilidad para el Ayuntamiento |
|---|---|---|---|---|---|
| A-01 | Biblioteca Legal | `docs/marco/BIBLIOTECA_LEGAL.md` | Jurídico | 100+ ordenamientos con estatus VERIFICADO / POR VERIFICAR | Marco normativo completo por dependencia municipal |
| A-02 | Marco de Cumplimiento LNETB | `docs/marco/MARCO_CUMPLIMIENTO_LNETB.md` | Cumplimiento | Matriz con 4 estados honestos de clasificación | Metodología para evaluar cumplimiento sin porcentajes falsos |
| A-03 | Protocolo de Seguridad | `docs/marco/PROTOCOLO_SEGURIDAD.md` | Seguridad | Documentado con historial de incidentes | Reglas de secretos, guardia CI, respuesta a incidentes |
| A-04 | Plan de Trabajo Municipal | `docs/marco/PLAN_TRABAJO_MUNICIPAL.md` | Estrategia | Por dependencia (Catastro, Tesorería, Obras, etc.) | Océanos azules: oportunidades de simplificación detectadas |
| A-05 | Glosario Oficial | `docs/marco/GLOSARIO_OFICIAL.md` | Normativo | Vocabulario y estados de módulo | Reglas de comunicación institucional |
| A-06 | Estrategia Estándar Abierto | `docs/marco/ESTRATEGIA_ESTANDAR_ABIERTO.md` | Gobernanza | Licencia AGPL-3.0 | Independencia de proveedor |
| A-07 | Gobernanza del Repositorio | `docs/marco/GOBERNANZA_REPOSITORIO.md` | Gobernanza | Reglas del repositorio | Control de versiones y contribuciones |
| A-08 | Estructura del Repositorio | `docs/marco/ESTRUCTURA_REPOSITORIO.md` | Técnico | Organización de archivos | Mapa del proyecto |
| A-09 | Acta de Saneamiento | `docs/marco/ACTA_005_SANEAMIENTO_REPOSITORIO.md` | Gobernanza | Acciones de limpieza | Historial de organización |
| A-10 | Visión de Producto | `docs/plataforma/01-VISION-PRODUCTO.md` | Estrategia | Visión del ecosistema ConnectX | Contexto general del proyecto |
| A-11 | Arquitectura del Sistema | `docs/plataforma/02-ARQUITECTURA-SISTEMA.md` | Técnico | Documentación de arquitectura | Diseño técnico |
| A-12 | Documentación Funcional | `docs/plataforma/03-DOCUMENTACION-FUNCIONAL.md` | Técnico | Funcionalidades por módulo | Capacidades del sistema |
| A-13 | Arquitectura de Datos | `docs/plataforma/04-ARQUITECTURA-DATOS.md` | Técnico | Modelos de datos | Esquemas y relaciones |
| A-14 | Manual de Desarrolladores | `docs/plataforma/05-MANUAL-DESARROLLADORES.md` | Técnico | Guía de desarrollo | Para el área de sistemas |
| A-15 | Libro Blanco | `docs/plataforma/06-LIBRO-BLANCO.md` | Técnico | Documento técnico completo | Referencia técnica integral |
| A-16 | Módulo Salud + CURP | `docs/marco/MODULO_SALUD_CURP.md` | Funcional | Diseño del perfil de salud ligado a CURP | Modelo de identidad y consentimiento |
| A-17 | Contra-Auditoría LNETB | `docs/contra-auditoria-lnetb-2026-08-11.md` | Auditoría | Corrección de errores en documentación anterior | Honestidad metodológica |
| A-18 | Plan de Trabajo Post-Auditoría | `docs/PLAN_TRABAJO_POST_CONTRA_AUDITORIA.md` | Plan | 12 tareas priorizadas P0-P2 | Ruta de trabajo inmediata |
| A-19 | Protocolo SINISI | `docs/marco/soberania-digital-infantil/` | Jurídico | Protección de identidad de menores | Cumplimiento LGDNNA |
| A-20 | Nota de Contexto | `docs/marco/NOTA_DE_CONTEXTO_PARA_CLAUDE.md` | Interno | Contexto del proyecto | Referencia |
| A-21 | Océanos Azules | `docs/marco/OCEANOS_AZULES.md` | Estrategia | Mercados institucionales | Oportunidades de expansión |
| A-22 | Plan de Trabajo Parlamento | `docs/marco/PLAN_TRABAJO_MUNICIPAL.md` | Estrategia | Idem A-04 | Idem A-04 |
| A-23 | Actas del Gabinete | `docs/actas/Acta_003_*.md`, `Acta_004_*.md` | Gobernanza | Sesiones del Gabinete de Especialistas | Trazabilidad de decisiones |
| A-24 | Gabinete de Especialistas | `docs/agentes/GABINETE_ESPECIALISTAS.md` | Gobernanza | Composición del equipo | Contexto institucional |
| A-25 | CI/CD — Guardia de Regresiones | `.github/workflows/guardia-regresiones.yml` | Técnico | Automatización de verificación | Seguridad del código |
| A-26 | Script de Verificación | `scripts/verificar-regresiones.mjs` | Técnico | Verificación pre-push | Control de calidad |
| A-27 | Reglas Firestore | `firestore.rules` | Seguridad | Control de acceso a datos | Protección de datos |
| A-28 | Reglas Storage | `storage.rules` | Seguridad | Control de acceso a archivos | Protección de datos |
| A-29 | Configuración Netlify | `netlify.toml` | Infraestructura | Headers de seguridad (HSTS, CSP, X-Frame) | Seguridad del sitio |
| A-30 | Schema.sql (RutaViva) | `rutaviva/schema.sql` | Base de datos | Esquema Supabase para GPS | Ejemplo de modelo de datos |
| A-31 | CONNECTX_SYSTEM_PROMPT.md | `public/CONNECTX_SYSTEM_PROMPT.md` | IA | Prompt del sistema ConnectX | Configuración del asistente IA |
| A-32 | Pulso Nayarit | `pulso-nayarit/` | Módulo | Sistema de monitoreo de sentimiento | Transparencia y participación |
| A-33 | Documentación Orbe | `docs/orbe/` | Arquitectura | Documentación del núcleo Orbe Central | Arquitectura conceptual |

---

## Documentos pendientes

Los siguientes documentos NO existen actualmente en el repositorio. Deberán ser producidos cuando el Ayuntamiento determine la viabilidad del piloto.

| ID | Documento | Tipo | Depende de |
|---|---|---|---|
| P-01 | Convenio Ayuntamiento–Proponente | Jurídico | Decisión del Ayuntamiento |
| P-02 | Acuerdo de Cabildo para piloto | Jurídico | Cabildo de Tepic |
| P-03 | Determinación AIR / Exención | Jurídico | Área de mejora regulatoria municipal |
| P-04 | Aviso de Privacidad publicado | Jurídico | Unidad de Transparencia municipal |
| P-05 | Designación de funcionario firmante | Administrativo | Ayuntamiento |
| P-06 | Convenio de interoperabilidad (RENAPO) | Jurídico | SEGOB + Ayuntamiento |
| P-07 | Convenio de interoperabilidad (SAT) | Jurídico | SAT + Ayuntamiento |
| P-08 | Autorización de Catastro Municipal | Administrativo | Dirección de Catastro Tepic |
| P-09 | Autorización de SIAPA | Administrativo | SIAPA Tepic |
| P-10 | Autorización de Tesorería (Stripe/pagos) | Administrativo | Tesorería Municipal |
| P-11 | Dictamen institucional de seguridad | Técnico | Área de seguridad / C5 |
| P-12 | Auditoría de accesibilidad (WCAG) | Técnico | Proponente + validador externo |
| P-13 | Protocolo de operación del piloto | Operativo | Ayuntamiento + Proponente |
| P-14 | Plan de capacitación de funcionarios | Operativo | Ayuntamiento + Proponente |
| P-15 | Levantamiento del proceso AS-IS real | Administrativo | Funcionarios responsables del trámite |
| P-16 | Reporte de pruebas con usuarios (Etapa B) | Técnico | Proponente tecnológico |

---

## Evidencia primaria

Cuando un anexo contenga afirmaciones jurídicas, deberá citar la fuente primaria correspondiente. La Biblioteca Legal (`BIBLIOTECA_LEGAL.md`) mantiene el registro de fuentes verificadas con su estatus (VERIFICADO / POR VERIFICAR) y la fecha de consulta.

---

*Documento preparado como índice de evidencia para el H. Ayuntamiento de Tepic.*
*Solo se listan documentos que existen físicamente en el repositorio.*
*Agosto 2026*
