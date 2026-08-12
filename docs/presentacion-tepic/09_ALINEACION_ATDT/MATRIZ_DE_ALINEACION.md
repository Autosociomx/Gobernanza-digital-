# MATRIZ DE ALINEACIÓN CON EL MODELO NACIONAL (ATDT)

> ⚠️ **ALINEACIÓN, NO CERTIFICACIÓN.** Este documento muestra cómo la propuesta se relaciona con los requisitos del Modelo Nacional. La certificación de cumplimiento solo puede emitirla la autoridad competente.

---

## Fuentes

- **LNETB** — DOF 16-jul-2025
- **Lineamientos del Modelo Nacional de Simplificación y Digitalización** — DOF 22-oct-2025
- **ATDT** — Agencia de Transformación Digital y Telecomunicaciones (coordinadora nacional)

---

## Principios del Modelo Nacional ↔ Propuesta Tepic

| Principio (LNETB Art. 34) | Cómo se aborda | Estado |
|---|---|---|
| **Simplificación administrativa** | Reducción de 3-4 requisitos a 1 (CURP verificada). Eliminación de visitas presenciales | 🟡 Preparado — depende de validación municipal |
| **Digitalización integral** | Flujo punta a punta: identidad → solicitud → validación → resolución → notificación | 🟡 Demo funcional — sin integraciones reales |
| **No duplicidad** | Consulta interoperable en vez de solicitar comprobantes (catastro, SIAPA) | 🔴 Diseñado, no implementado |
| **Interoperabilidad** | Arquitectura de conectores documentada para RENAPO, catastro, SIAPA, SAT | 🔴 Cero conexiones reales |
| **Gratuidad** | Sin costo para el ciudadano (salvo derechos legales según Ley de Ingresos) | 🔵 Por verificar costo en Ley de Ingresos |
| **Accesibilidad universal** | Diseño responsive, atributos aria básicos. WCAG no verificado | 🔴 No verificado |
| **Seguridad jurídica** | Trazabilidad de eventos, QR de verificación. Firma pendiente | 🟡 Parcial — sin firma avanzada |
| **Neutralidad tecnológica** | Stack open source (React, Express, PostgreSQL). Sin lock-in de proveedor | 🟢 Cumplido |

---

## Componentes del Modelo Nacional ↔ Propuesta Tepic

| Componente Modelo Nacional | Referencia | Propuesta Tepic | Estado |
|---|---|---|---|
| **Catálogo Nacional de Trámites** | Lineamientos | Trámite identificado; clave nacional por verificar | 🔵 Por verificar |
| **Identidad Digital (CURP)** | Art. 66 LNETB | Validación sintáctica en prototipo; conexión RENAPO pendiente | 🟡 Demo |
| **Firma Electrónica** | Art. 67 LNETB | OTP demostrativo; e.firma no implementada | 🔴 No existe |
| **Expediente Ciudadano Único** | Art. 68 LNETB | Diseñado, Firestore configurado; sin implementación | 🟡 Preparado |
| **Ventanilla Única Digital** | Art. 69 LNETB | Portal React con 5 vistas; 1 trámite modelado | 🟡 Preparado |
| **Interoperabilidad** | Art. 71 LNETB | Conectores diseñados; cero implementados | 🔴 No existe |
| **AIR / Mejora Regulatoria** | Arts. 35-38 LNETB | Minuta AIR preparada; determinación pendiente | 🔵 Por verificar |
| **Código Abierto** | Art. 91 LNETB | Repositorio GitHub público (privado actualmente) | 🟡 Preparado |
| **Estándares Abiertos** | Art. 92 LNETB | JSON, REST, HTTPS, QR, OAuth2 | 🟢 Cumplido |
| **Protección de Datos** | LGPDPPSO | Minuta aviso de privacidad; no publicado | 🟡 Preparado |
| **Archivo y Conservación** | Ley de Archivos | No documentado aún | 🔴 Pendiente |
| **Indicadores** | Lineamientos | KPIs definidos; sin línea base real | 🟡 Preparado |

---

## Resumen de alineación

| Nivel | Cantidad |
|---|---|
| 🟢 Cumplido / Verificado | 2 (neutralidad, estándares abiertos) |
| 🟡 Preparado / Demo | 6 (simplificación, digitalización, expediente, ventanilla, código abierto, indicadores) |
| 🔴 No existe / Pendiente | 3 (interoperabilidad, firma, archivo) |
| 🔵 Por verificar | 3 (catálogo, AIR, costo) |

**Total: 12 de 14 componentes del Modelo Nacional están alineados en algún grado. 3 requieren acción institucional del Ayuntamiento.**

---

## Lo que la ATDT requiere de los municipios

Con base en los Lineamientos del Modelo Nacional (DOF 22-oct-2025) y mesas de trabajo ATDT:

| Requisito ATDT para municipios | Estado Tepic |
|---|---|
| Inventario de trámites en Catálogo Nacional | 🔵 No verificado |
| Plan municipal de simplificación | 🟡 Este expediente es la base |
| Designación de enlace ATDT | 🔴 Pendiente |
| AIR por trámite (o exención) | 🟡 Minuta preparada |
| Reporte de avances trimestral | 🔴 Pendiente |
| Portal de trámites digital | 🟡 Prototipo |

---

*Documento elaborado como parte del expediente de presentación institucional — Agosto 2026*
