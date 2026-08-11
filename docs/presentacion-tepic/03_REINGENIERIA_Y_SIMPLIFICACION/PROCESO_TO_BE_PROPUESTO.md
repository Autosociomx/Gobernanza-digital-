# PROCESO TO-BE PROPUESTO

## Constancia de Residencia — Flujo Digital

---

## Diagrama del proceso simplificado

```
CIUDADANO (celular/computadora)       SISTEMA + AYUNTAMIENTO
    │                                       │
    │  1. Abre portal web/móvil             │
    │  2. Ingresa CURP                      │
    ├───────────────────────────────────────►
    │                                       │  3. Valida CURP sintácticamente
    │                                       │  4. [FUTURO] Consulta RENAPO
    │                                       │     (requiere convenio/autorización)
    │                                       │
    │  5. Confirma domicilio                │
    ├───────────────────────────────────────►
    │                                       │  6. [FUTURO] Valida contra catastro/SIAPA
    │                                       │     (requiere convenio/autorización)
    │                                       │  7. Reglas de negocio automáticas
    │                                       │
    │  8. Firma con OTP (demostrativo)      │
    ├───────────────────────────────────────►
    │                                       │  9. Genera constancia
    │                                       │  10. [FUTURO] Firma de autoridad
    │                                       │      (requiere designación de firmante)
    │                                       │  11. Almacena en expediente digital
    │                                       │
    │  12. Recibe notificación              │
    │◄───────────────────────────────────────┤
    │  Descarga constancia (PDF + QR)       │
```

---

## Metas de simplificación (proyecciones)

| Indicador | Estimación AS-IS | Propuesta TO-BE | Reducción proyectada |
|---|---|---|---|
| Documentos solicitados | 3–4 🔵 | CURP (validación automática) | -75% |
| Copias requeridas | 2–3 🔵 | 0 | -100% |
| Visitas al Ayuntamiento | 2 🔵 | 0 | -100% |
| Tiempo ciudadano | 2–4 h 🔵 | <10 min | -95% |
| Tiempo de resolución | 1–3 días 🔵 | <24 h | -80%+ |
| Funcionarios requeridos | 2–3 🔵 | 1 (firma autoridad) | -66% |
| Costo ciudadano (traslados) | ~$50–100 MXN 🔵 | $0 | -100% |

🔵 **Todos los valores AS-IS son estimaciones de laboratorio. Requieren verificación con datos reales del Ayuntamiento.**

---

## Matriz de eliminación de requisitos

| Requisito actual | ¿Quién lo posee? | ¿Eliminable? | Sustitución | Fundamento |
|---|---|---|---|---|
| Identificación oficial (INE) | INE / SEGOB | ✅ Sí | CURP verificada como identidad digital | LNETB Art. 66 |
| Comprobante de domicilio | Catastro / SIAPA / CFE | ✅ Sí | Consulta interoperable al padrón municipal | LNETB Art. 19, 71 |
| Copia de CURP | RENAPO | ✅ Sí | CURP verificada electrónicamente | LNETB Art. 66 |
| Solicitud por escrito | — | ✅ Sí | Formulario digital con firma electrónica | LNETB Art. 67 |
| Pago de derechos | Tesorería | ⚠️ Según Ley de Ingresos | Si existe costo, pago en línea | Ley de Ingresos Tepic 2026 🔵 |

> **No se elimina ningún requisito por comodidad tecnológica.** Cada eliminación debe estar fundamentada en: (1) fuente oficial que ya posee el dato, (2) autorización del Ayuntamiento, (3) fundamento jurídico.

---

## Lo que el prototipo demuestra hoy

| Paso del TO-BE | Estado en demo |
|---|---|
| Ingreso de CURP con validación sintáctica | 🟢 Funcional |
| Confirmación de domicilio | 🟢 Funcional (captura manual) |
| Firma con OTP | 🟢 Demostrativo (no es e.firma) |
| Generación de constancia + QR | 🟢 Funcional |
| Expediente digital (trazabilidad) | 🟢 5 eventos registrados |
| Consulta RENAPO | 🔴 No implementado |
| Validación contra catastro/SIAPA | 🔴 No implementado |
| Firma de autoridad | 🔴 No implementado |

---

*Documento adaptado del expediente regulatorio original — Agosto 2026*
