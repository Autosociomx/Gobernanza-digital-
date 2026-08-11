# FASES DE IMPLEMENTACIÓN DEL PILOTO

## Constancia de Residencia — Tepic

---

## Estrategia: 6 etapas progresivas (A→F)

Cada etapa tiene criterios GO/NO-GO antes de avanzar. **Ninguna etapa avanza sin cumplir las condiciones previas.**

---

## ETAPA A — LABORATORIO INTERNO 🟢 COMPLETADA (Agosto 2026)

**Objetivo:** Construir prototipo funcional demostrativo sin efectos jurídicos.

| Actividad | Estado |
|---|---|
| Diseño de UX del trámite | ✅ 5 pasos con progreso visual |
| Validación sintáctica CURP | ✅ Algoritmo RENAPO |
| Firma OTP demostrativa | ✅ NO es firma electrónica |
| Resolución digital simulada | ✅ Constancia + QR + hash |
| Expediente digital (trazabilidad) | ✅ 5 eventos por trámite |
| Comparativa AS-IS vs TO-BE | ✅ Tabla de simplificación |
| Expediente regulatorio | ✅ 15 documentos |

---

## ETAPA B — PRUEBA CON USUARIOS (⬜ Pendiente)

**Duración:** ~2 semanas | **Condición:** Etapa A completada ✅

**Objetivo:** Validar experiencia de usuario con datos controlados.

- [ ] Seleccionar 5–10 voluntarios
- [ ] Crear cuentas con CURP de prueba
- [ ] Ejecutar flujo completo con cada usuario
- [ ] Medir: tiempo, errores, satisfacción
- [ ] Iterar diseño con base en feedback

**Métrica clave:** Tiempo promedio <10 min, satisfacción ≥4.5/5

### GO/NO-GO para Etapa C
- [ ] ≥80% usuarios completan en <10 min
- [ ] ≥4.0/5 satisfacción
- [ ] 0 errores críticos

---

## ETAPA C — PILOTO INSTITUCIONAL (⬜ Pendiente)

**Duración:** ~1–2 meses | **Condición:** Etapa B completada + autorización del Ayuntamiento

⚠️ **HITO CRÍTICO:** El Ayuntamiento debe aprobar formalmente el piloto.

- [ ] Presentar expediente completo al Ayuntamiento
- [ ] Identificar área responsable (Secretaría / Oficialía)
- [ ] Designar funcionario firmante
- [ ] Validar fundamento jurídico del trámite con área legal
- [ ] Determinar requisitos reales del trámite
- [ ] Determinar si se requiere AIR o procede exención
- [ ] Obtener Acuerdo de Ayuntamiento autorizando el piloto
- [ ] Habilitar infraestructura de piloto
- [ ] Publicar aviso de privacidad

### GO/NO-GO para Etapa D
- [ ] Acuerdo de Ayuntamiento vigente
- [ ] Aviso de privacidad publicado
- [ ] Funcionario firmante designado
- [ ] Infraestructura de piloto lista
- [ ] Capacitación completada

---

## ETAPA D — PRODUCCIÓN LIMITADA (⬜ Pendiente)

**Duración:** ~2–3 semanas | **Alcance:** Máx. 50 trámites/día, solo Constancia de Residencia, solo CP Tepic

**Métricas a monitorear:**
- Trámites completados exitosamente ≥95%
- Tiempo promedio de resolución <4 horas hábiles
- 0 errores críticos

---

## ETAPA E — EVALUACIÓN (⬜ Pendiente)

**Duración:** ~90 días | Evaluaciones: Día 30, Día 60, Día 90

**Criterios de éxito:**
- Cumplimiento LNETB ≥80% de artículos aplicables
- Satisfacción ciudadana ≥4.0/5
- Tiempo de resolución <24 horas
- Disponibilidad del sistema ≥99.5%
- 0 incidentes de seguridad graves

---

## ETAPA F — ESCALAMIENTO (⬜ Pendiente)

**Objetivo:** Extender a un segundo trámite.

**Candidatos:** Constancia de No Adeudo Predial, Licencia de Funcionamiento, Permiso de Construcción

---

## Cronograma visual

```
AGO 2026 │ SEP 2026  │  OCT 2026  │  NOV 2026  │  DIC 2026  │  ENE 2027
─────────┼───────────┼────────────┼────────────┼────────────┼───────────
 ETAPA A │ ETAPA B   │ ETAPA C                 │ ETAPA D    │ ETAPA E
 🟢      │ (usuarios)│ (institucional)         │ (prod.)    │ (eval.)
         │           │                         │            │
         │           │ 🔴 PRESENTACIÓN         │            │
         │           │    AL AYUNTAMIENTO       │            │
```

---

## Riesgos del piloto

| Riesgo | Impacto | Mitigación |
|---|---|---|
| Ayuntamiento no autoriza | Alto | Presentar como laboratorio, no como sistema terminado |
| Falta de fundamento jurídico | Alto | Levantamiento jurídico en Etapa C |
| Resistencia de funcionarios | Medio | Capacitación, mostrar beneficios |
| Ciudadanos sin internet | Medio | Kiosco + modo offline |
| Fallas técnicas | Alto | Ambiente de piloto separado, plan de contingencia |
| Sin convenios RENAPO/SAT | Medio | Iniciar sin interoperabilidad real |

---

*Documento adaptado del expediente regulatorio original — Agosto 2026*
