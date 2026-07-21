# COMPLIANCE.md — Matriz de Cumplimiento Normativo

**SOATM — Sistema Operativo para la Autonomía Tecnológica Municipal**
Primera implementación: **Nayarit Digital (Tepic, Nayarit)**

Este documento es el puente entre el lenguaje jurídico y el lenguaje técnico del
repositorio: para cada obligación legal aplicable responde qué exige la ley (con
artículo exacto, cotejado contra el texto oficial), qué componente del sistema la
atiende, y cómo se prueba. Está escrito para ser leído por la ATDT, un
ayuntamiento, la ASF o un desarrollador — con el mismo texto para todos.

## Regla de honestidad de estados

Cada renglón declara uno de cuatro estados, y ninguno otro (regla heredada de
`docs/marco/MARCO_CUMPLIMIENTO_LNETB.md`):

- **Operativo** — funciona hoy y puede demostrarse en vivo.
- **Operativo en demo** — funciona en el entorno de demostración; faltan convenio o datos reales del municipio.
- **Preparado** — el código o la estructura existen; falta una credencial, lineamiento o convenio externo.
- **Hoja de ruta** — planeado; no existe aún.

Está prohibido declarar "Cumple" a secas sin poder señalar el archivo y el flujo
que lo demuestran. Una sola afirmación desmentible tira la credibilidad de las
diez verdaderas.

## A. Ley Nacional para Eliminar Trámites Burocráticos (LNETB, DOF 16-jul-2025)

Texto cotejado íntegro contra el PDF oficial de la Cámara de Diputados (114 artículos).

| Fundamento (verificado) | Qué exige | Componente que lo atiende | Cómo se prueba | Estado |
|---|---|---|---|---|
| Art. 3, fracc. XXXIV | El municipio es Sujeto Obligado de toda la ley | Alcance del sistema completo | Texto de la ley; `docs/marco/MARCO_CUMPLIMIENTO_LNETB.md` | Fundamento, no requisito |
| Arts. 12–15 y Transitorios 14º–15º | Autoridad Municipal de Simplificación y Enlace (nivel Director General); plazos vencidos en ene–feb 2026 | Decisión institucional del Ayuntamiento — fuera del software; el repositorio aporta el marco documental para el acuerdo de cabildo | Acuerdo de cabildo publicado (cuando exista) | Hoja de ruta (no depende del código) |
| Arts. 51–54 | Registro de todos los trámites en el Portal Ciudadano Único; ningún requisito no registrado es exigible; contenido mínimo con descripción en lenguaje ciudadano (54-V) | Catálogo de trámites y pagos de la App Ciudadana (`src/components/CitizenApp.tsx`); asistente Aura como guía en lenguaje ciudadano | Flujo en demo; inventario en formato del Art. 54 en elaboración | Operativo en demo |
| Arts. 64 y 74 | Llave MX como mecanismo nacional de autenticación; toda plataforma digital de trámites debe integrar su inicio de sesión único | Arquitectura de identidad modular (Firebase Auth hoy: Google + sesión anónima; identidad de salud ligada a CURP — el mismo identificador al que Llave MX se asocia por ley) | `src/firebase.ts`, `src/services/saludPerfilService.ts`; adaptador de Llave MX pendiente de lineamientos ATDT y vía institucional | Preparado |
| Art. 91 y Transitorio 16º | Compartir el código fuente al Repositorio Nacional de Tecnología Pública, a través de la Autoridad Local | Este repositorio completo, bajo licencia AGPL-3.0; checklist de apertura documentado | `README.md`, `ARCHITECTURE.md`, `docs/marco/ESTRATEGIA_ESTANDAR_ABIERTO.md`, `docs/marco/PROTOCOLO_SEGURIDAD.md` §7 | Preparado (entrega formal pendiente de que exista la Autoridad Local municipal) |

## B. Ley de Gobierno Digital para el Estado de Nayarit (P.O. 13-jun-2022)

Texto cotejado íntegro contra el PDF oficial del Congreso del Estado (55 artículos).

| Fundamento (verificado) | Qué exige | Componente que lo atiende | Cómo se prueba | Estado |
|---|---|---|---|---|
| Art. 2, fracc. IV | Los Ayuntamientos son sujetos de la ley estatal | Alcance del sistema | Texto de la ley | Fundamento |
| Art. 24 | El Ayuntamiento establece su política digital municipal y celebra convenios con sectores social y privado | Fundamento del despliegue municipal y del vehículo contractual | Texto de la ley; marco en `docs/marco/` | Fundamento |
| Art. 48, fracc. IV | Derecho vigente del ciudadano a la **captura única**: lo ya entregado vale para trámites subsecuentes | Perfil de Salud ligado a CURP (existe aunque la persona no tenga cuenta), expediente con documentos, registro asistido por personal con código | `src/services/saludPerfilService.ts`, `firestore.rules`, `docs/marco/MODULO_SALUD_CURP.md` | Operativo en demo |
| Art. 23, fracc. III | Protección de datos personales conforme a la LGPDPPSO en portales transaccionales | Consentimiento revocable del paciente + bitácora de acceso inmutable + principio de necesidad de saber | 35/35 pruebas de reglas contra el emulador real de Firestore, documentadas en `docs/marco/MODULO_SALUD_CURP.md` | Operativo en demo (seguridad verificada empíricamente) |

## C. Protección de datos y calidad (transversal)

| Fundamento | Qué exige | Componente | Cómo se prueba | Estado |
|---|---|---|---|---|
| LGPDPPSO | Consentimiento, trazabilidad de acceso, minimización | `consentimientoActivo` solo modificable por el titular; bitácora `accesos` inmutable y visible solo para el paciente; el personal que sube un documento no conserva lectura | `firestore.rules` + suites de pruebas del emulador (35/35) | Operativo en demo |
| Accesibilidad (referencia WCAG 2.1 AA) | Canal digital usable por todas las personas | Interfaz auditada; lenguas español / náayeri (cora) / wixárika | Lighthouse 99 / **100** / 100 / 100 en despliegue de producción, auditado en cada Pull Request | Operativo (verificado) |
| Seguridad de la información | Cabeceras, llaves fuera del cliente | `netlify.toml` (HSTS, nosniff, X-Frame-Options); llave de IA solo en servidor | `server.ts`, `docs/marco/PROTOCOLO_SEGURIDAD.md` | Operativo |

## Mapa institucional del repositorio

El repositorio conserva la estructura estándar de un proyecto de software (la que
la propia Fábrica de Software de la ATDT usa en sus repositorios: el código en
`src/`, la configuración en la raíz) porque el Artículo 91 pide precisamente el
código fuente utilizable — pero se navega institucionalmente así:

| Expediente institucional | Dónde vive |
|---|---|
| Marcos normativos y su traducción técnica | `docs/marco/` (este archivo es el índice-puente) |
| Arquitectura y decisiones de diseño | `ARCHITECTURE.md` |
| Módulos y su documentación por dominio | `docs/marco/MODULO_SALUD_CURP.md`, `docs/marco/AURA_ASISTENTE_AGENTIVO.md` |
| Código fuente (Art. 91) | `src/`, `server.ts`, `firestore.rules`, `storage.rules` |
| Evidencia verificable | Suites de pruebas de reglas (35/35, emulador real), auditoría Lighthouse por Pull Request, Guardia de regresiones (`scripts/verificar-regresiones.mjs`) |
| Gobernanza del repositorio | `docs/marco/GOBERNANZA_REPOSITORIO.md`, `docs/marco/PROTOCOLO_SEGURIDAD.md` |

## Nota de identidad

**SOATM** es el nombre del estándar — la arquitectura reutilizable que cualquier
municipio puede implementar conforme al esquema de reutilización del Repositorio
Nacional de Tecnología Pública. **Nayarit Digital** es su primera implementación,
en Tepic. Un municipio que adopte el sistema no "copia a Tepic": implementa un
estándar documentado, con esta matriz como su punto de partida de auditoría.

---

Revisión: este documento se actualiza con cada cambio normativo o de módulo, y su
matriz es la canónica (la tabla previa de `docs/marco/MARCO_CUMPLIMIENTO_LNETB.md`
queda subordinada a ésta). Última revisión: 18 de julio de 2026, con los textos
primarios de la LNETB y la Ley de Gobierno Digital de Nayarit cotejados íntegros.
