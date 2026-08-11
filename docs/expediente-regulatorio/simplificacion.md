# CARPETA 05 — PROPUESTA DE SIMPLIFICACIÓN

## Constancia de Residencia — Tepic

---

## 1. Diagnóstico del Trámite Actual

### 1.1 Proceso AS-IS (documentado por el Ayuntamiento)

> ⚠️ Los datos a continuación son **estimaciones para demostración del laboratorio**. El Ayuntamiento debe proporcionar los datos reales del trámite vigente.

```
CIUDADANO                        AYUNTAMIENTO
    │                                  │
    │  1. Acude a la oficina           │
    ├──────────────────────────────────►
    │                                  │  2. Le indican requisitos
    │◄──────────────────────────────────┤
    │                                  │
    │  3. Reúne documentos:            │
    │  - Identificación oficial        │
    │  - Comprobante de domicilio      │
    │  - Copia de CURP                 │
    │  - Solicitud por escrito         │
    │                                  │
    │  4. Regresa con documentos       │
    ├──────────────────────────────────►
    │                                  │  5. Revisa documentos
    │                                  │  6. Captura datos
    │                                  │  7. Valida información
    │                                  │  8. Pago (si aplica)
    │                                  │  9. Firma de funcionario
    │                                  │  10. Genera constancia
    │                                  │
    │  11. Recoge constancia           │
    │◄──────────────────────────────────┤
```

### 1.2 Datos del proceso actual (estimados para laboratorio)

| Indicador | Estimación | Fuente |
|---|---|---|
| Visitas presenciales | 2 (información + entrega) | Observación de trámites similares en municipios |
| Documentos requeridos | 3–4 | Estimación conservadora |
| Funcionarios involucrados | 2–3 | Recepción, validación, firma |
| Tiempo total ciudadano | 2–4 horas (incluyendo traslados y esperas) | Estimación |
| Tiempo de resolución | 1–3 días hábiles | Estimación |
| Copias requeridas | 2–3 | Estimación |
| Costo (traslados, copias) | ~$50–100 MXN | Estimación |
| Costo del trámite | $0–150 MXN (según Ley de Ingresos) | REQUIERE VERIFICACIÓN |

---

## 2. Propuesta TO-BE — Trámite Digital

### 2.1 Proceso simplificado

```
CIUDADANO (celular/computadora)       SISTEMA + AYUNTAMIENTO
    │                                       │
    │  1. Abre portal web/móvil             │
    │  2. Ingresa CURP                      │
    ├───────────────────────────────────────►
    │                                       │  3. Valida CURP sintácticamente
    │                                       │  4. [PILOTO] Consulta RENAPO
    │                                       │
    │  5. Confirma domicilio                │
    ├───────────────────────────────────────►
    │                                       │  6. [PILOTO] Valida contra catastro/SIAPA
    │                                       │  7. Reglas de negocio automáticas
    │                                       │
    │  8. Firma con OTP                     │
    ├───────────────────────────────────────►
    │                                       │  9. Genera constancia
    │                                       │  10. Firma de autoridad
    │                                       │  11. Almacena en expediente digital
    │                                       │
    │  12. Recibe notificación              │
    │◄───────────────────────────────────────┤
    │  Descarga constancia (PDF + QR)       │
```

### 2.2 Metas de simplificación

| Indicador | Antes | Propuesta | Reducción |
|---|---|---|---|
| Documentos solicitados | 3–4 | CURP (validación) | -75% |
| Copias requeridas | 2–3 | 0 | -100% |
| Visitas al Ayuntamiento | 2 | 0 | -100% |
| Tiempo ciudadano | 2–4 h | <10 min | -95% |
| Tiempo de resolución | 1–3 días | <24 h (meta: inmediato con reglas automáticas) | -80%+ |
| Funcionarios requeridos | 2–3 | 1 (firma autoridad) | -66% |
| Interacciones humanas | 3–5 | 0–1 | -80% |
| Costo ciudadano (traslados) | ~$50–100 | $0 | -100% |

---

## 3. Matriz de Eliminación de Requisitos

| Requisito actual | Fundamento | ¿Quién lo posee? | ¿Eliminable? | Sustitución |
|---|---|---|---|---|
| Identificación oficial | REQUIERE VERIFICACIÓN | INE / SEGOB | ✅ Sí | CURP verificada como identidad digital (Art. 66 LNETB) |
| Comprobante de domicilio | REQUIERE VERIFICACIÓN | Catastro / SIAPA / CFE | ✅ Sí | Consulta interoperable al padrón municipal |
| Copia de CURP | REQUIERE VERIFICACIÓN | RENAPO | ✅ Sí | CURP verificada electrónicamente — no se requiere copia |
| Solicitud por escrito | REQUIERE VERIFICACIÓN | — | ✅ Sí | Formulario digital con firma electrónica |
| Pago de derechos | REQUIERE VERIFICACIÓN (Ley de Ingresos) | Tesorería | ⚠️ Según Ley de Ingresos | Si existe costo, integrar pago en línea |

### Nota crítica
> **No se elimina ningún requisito por comodidad tecnológica. Cada eliminación debe estar fundamentada en: (1) la fuente oficial que ya posee el dato, (2) la autorización del Ayuntamiento para consultar esa fuente, (3) el fundamento jurídico que permite la simplificación.**

---

## 4. Evidencia de Simplificación para el Expediente

| Evidencia | Formato | Estado |
|---|---|---|
| Mapa de proceso AS-IS | Diagrama | ✅ Incluido |
| Mapa de proceso TO-BE | Diagrama | ✅ Incluido |
| Matriz de requisitos eliminados | Tabla | ✅ Incluida |
| Cálculo de reducción de cargas | Tabla | ✅ Incluido |
| Prototipo funcional | HTML/CSS/JS | ✅ Construido |
| Datos reales del trámite | Levantamiento municipal | ⬜ Pendiente — requiere Ayuntamiento |

---

*Documento elaborado como parte del Laboratorio Piloto Tepic — Nayarit Digital · ConnectX*
*Agosto 2026*
