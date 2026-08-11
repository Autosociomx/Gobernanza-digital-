# 📦 EXPEDIENTE DE PRESENTACIÓN INSTITUCIONAL
## Laboratorio Municipal de Simplificación y Digitalización
### H. Ayuntamiento de Tepic, Nayarit — Agosto 2026

**Proyecto:** Nayarit Digital · ConnectX — SOATM
**Proponente tecnológico:** Miguel Alexis Pérez Aguilar · AutosocioMX
**Objeto:** Propuesta técnica y documental para evaluación institucional

---

## ⚠️ CLÁUSULA DE PROTECCIÓN

> El presente expediente constituye una propuesta técnica y documental para evaluación institucional. No constituye autorización, certificación, dictamen jurídico, acto administrativo ni reconocimiento de cumplimiento por parte del Ayuntamiento de Tepic.

---

## 🚦 Semáforo de evidencia (aplica a todo el expediente)

| 🟢 VERIFICADO | 🟡 PREPARADO / DEMO | 🔵 POR VERIFICAR | 🟠 REQUIERE AUTORIZACIÓN | 🔴 NO EXISTE |
|---|---|---|---|---|
| Evidencia primaria o técnica comprobable | Diseño, prototipo o demo funcional | Requiere confirmación con fuente oficial o autoridad | Depende de autorización institucional | No implementado actualmente |

**Sin porcentajes. Sin "certificado". Sin "aprobado". Sin "cumple".**

---

## 📋 Contenido del expediente

| Carpeta | Propósito | Para quién |
|---|---|---|
| **[00_INDICE_MAESTRO](00_INDICE_MAESTRO/README.md)** | Mapa del expediente + matriz de trazabilidad general (12 problemas → obligación → solución → evidencia → brecha → responsable) | Presidencia · Secretaría |
| **[01_PROBLEMA_PUBLICO](01_PROBLEMA_PUBLICO/)** | Diagnóstico: ¿qué problema resolvemos, a quién afecta, con qué evidencia? | Todas las áreas |
| **[02_TRAMITE_PRIORIZADO](02_TRAMITE_PRIORIZADO/)** | Ficha del trámite piloto: Constancia de Residencia · fundamento · actores · requisitos actuales | Dependencia responsable |
| **[03_REINGENIERIA](03_REINGENIERIA_Y_SIMPLIFICACION/)** | AS-IS vs TO-BE · matriz requisito por requisito · análisis de cargas · indicadores | Mejora Regulatoria · Área responsable |
| **[04_SOLUCION_DIGITAL](04_SOLUCION_DIGITAL/)** | Arquitectura funcional y técnica · flujo digital · identidad · expediente · firma · interoperabilidad | Tecnologías · C5 · Sistemas |
| **[05_MARCO_JURIDICO](05_MARCO_JURIDICO/README.md)** | 🏛️ Corazón del expediente: 19 normas con cadena artículo → fuente primaria → evidencia → estado | Jurídico · Transparencia |
| **[06_EVIDENCIA_TECNICA](06_EVIDENCIA_TECNICA/)** | Inventario real del repositorio · matriz código/funcionalidad · limitaciones conocidas | Tecnologías · Auditoría |
| **[07_GOBERNANZA](07_GOBERNANZA_E_INSTITUCIONALIZACION/)** | Roles y responsabilidades · qué es del Ayuntamiento y qué del proponente · convenios requeridos | Jurídico · Presidencia |
| **[08_PILOTO_TEPIC](08_PILOTO_TEPIC/)** | Propuesta de piloto · fases A→F · sandbox · criterios GO/NO-GO | Todas las áreas |
| **[09_ALINEACION_ATDT](09_ALINEACION_ATDT/)** | Alineación con el Modelo Nacional · principios · indicadores · matriz ATDT-Tepic | Mejora Regulatoria · ATDT |
| **[10_RIESGOS](10_RIESGOS_Y_CONTRAAUDITORIA/)** | Matriz de riesgos · contra-auditoría LNETB · 25 objeciones adversariales · plan de mitigación | Contraloría · Jurídico |
| **[11_INSTRUMENTOS](11_INSTRUMENTOS_INSTITUCIONALES/)** | Borradores: convenio · punto de acuerdo · ficha AIR/exención · aviso de privacidad · designación | Jurídico · Secretaría |

---

## ⚡ RESUMEN EJECUTIVO (3 minutos)

### El problema
Los ciudadanos de Tepic realizan visitas presenciales y presentan documentos físicos para trámites municipales simples — papeles que otras dependencias del propio municipio ya poseen.

### La ley ya obliga
La LNETB (DOF 16-jul-2025), los Lineamientos del Modelo Nacional (DOF 22-oct-2025) y la Ley de Gobierno Digital de Nayarit (Arts. 2, 5, 6) establecen obligaciones de simplificación, digitalización, identidad digital e interoperabilidad para los municipios mexicanos. **El municipio de Tepic ya es sujeto obligado.**

### La propuesta
Un laboratorio piloto con **un solo trámite** (Constancia Municipal de Residencia) para demostrar, en entorno controlado y sin efectos jurídicos, cómo podría implementarse el Modelo Nacional en Tepic. Si el Ayuntamiento lo valida y autoriza, el modelo se replica a otros trámites.

### Lo que existe hoy (🟢)
- **Frontend React** funcional con 30+ componentes y 5 vistas (code-splitting)
- **Infraestructura backend** (Express + SQLite + Gemini AI + Stripe) para capacidades generales — sin endpoints específicos del trámite de Constancia de Residencia aún
- **Prototipo de demostración** del flujo digital completo (validación CURP, OTP, constancia con QR) en `demo/constancia-residencia/`
- **Biblioteca legal** con 100+ ordenamientos verificados contra fuentes oficiales primarias
- **Protocolo de seguridad** documentado con guardia CI automatizada
- **Contra-auditoría LNETB** que corrigió afirmaciones inexactas de documentación anterior

### Lo que NO existe hoy (🔴)
- Conexión a RENAPO, Catastro Tepic, SIAPA o cualquier fuente gubernamental
- Firma electrónica avanzada (solo OTP demostrativo en prototipo)
- Expediente digital implementado en producción
- Autorización del Ayuntamiento
- Datos personales reales de ciudadanos
- WCAG verificado · lenguas originarias funcionales

### Lo que solicitamos al Ayuntamiento
1. Recibir y revisar este expediente
2. Designar un enlace institucional
3. Determinar la viabilidad jurídica y administrativa del piloto
4. Si procede, aprobar el piloto mediante el instrumento que corresponda

---

## 🧩 Los tres universos del expediente

| A. EVIDENCIA EXISTENTE | B. PROPUESTA | C. SOLO PUEDE PRODUCIRLA LA AUTORIDAD |
|---|---|---|
| Código fuente | Proceso TO-BE | Acuerdo de Cabildo |
| Biblioteca jurídica | Interoperabilidad futura | Fundamento municipal definitivo |
| Arquitectura documentada | Identidad digital (diseño) | Designación de funcionario firmante |
| Protocolo de seguridad | Expediente digital (diseño) | Convenios (RENAPO, SAT, SIAPA) |
| Contra-auditoría | Modelo de gobernanza | Determinación AIR/exención |
| Prototipos demo | Plan de piloto | Aviso de privacidad publicado |
| Infraestructura (servidor, BD) | Arquitectura de conectores | Accesos a sistemas oficiales |

**Nunca mezclar A, B y C. Cada afirmación debe declarar a qué universo pertenece.**

---

## 📊 Estado consolidado del proyecto

| Área | Estado |
|---|---|
| Repositorio y evidencia técnica | 🟢 Verificado internamente |
| Documentación técnica | 🟢 Existe |
| Expediente regulatorio | 🟢 Existe (9 docs) |
| Biblioteca jurídica | 🟢 100+ ordenamientos con estatus |
| Contra-auditoría LNETB | 🟢 Completada |
| Paquete presentación Tepic | 🟢 Estructura 12 carpetas creada |
| Matriz jurídica artículo → evidencia | 🟢 19 normas con cadena trazable |
| Fuentes primarias (PDFs) | 🔴 No descargadas aún (carpeta creada) |
| Verificación artículo por artículo | 🟡 4 verificados / 6 por verificar / 2 no sustentados |
| Integraciones gubernamentales | 🔴 No existentes |
| Firma institucional | 🔴 Pendiente |
| Autorización municipal | 🔴 Pendiente |
| Datos reales | 🔴 No utilizar todavía |
| Piloto institucional | ⚪ Por determinar por el Ayuntamiento |

---

*Agosto 2026 · Nayarit Digital · ConnectX · SOATM*
*Repositorio: Autosociomx/Gobernanza-digital-*
