# CARPETA 14 — PLAN PILOTO

## Constancia de Residencia — Tepic

---

## 1. Estrategia de Implementación por Etapas

El piloto se implementará en 6 etapas progresivas (A→F), desde laboratorio interno sin efectos jurídicos hasta producción limitada y escalamiento.

---

## ETAPA A — LABORATORIO INTERNO ✅

**Estado:** COMPLETADA (Agosto 2026)

**Objetivo:** Construir prototipo funcional demostrativo.

**Actividades completadas:**

| Actividad | Estado | Entregable |
|---|---|---|
| Diseño de UX del trámite | ✅ | Flujo 5 pasos con progreso visual |
| Validación sintáctica CURP | ✅ | Algoritmo RENAPO implementado |
| Firma simple (OTP) | ✅ | Demostración funcional |
| Resolución digital simulada | ✅ | Constancia + QR + hash |
| Expediente digital (trazabilidad) | ✅ | 5 eventos registrados por trámite |
| Comparativa AS-IS vs TO-BE | ✅ | Tabla de simplificación |
| Documentación del expediente | ✅ | Carpetas 01–15 |
| Arquitectura de referencia | ✅ | Diagrama + stack tecnológico |
| Modelo de datos | ✅ | Esquema Supabase/PostgreSQL |

**Entregables:** Prototipo HTML funcional + 15 carpetas del expediente regulatorio.

**Sin efectos jurídicos.** No utiliza datos reales. No conectado a fuentes oficiales.

---

## ETAPA B — PRUEBA CON USUARIOS (⬜ Pendiente)

**Duración estimada:** 2 semanas

**Objetivo:** Validar la experiencia de usuario con ciudadanos reales usando datos controlados.

**Actividades:**

- [ ] Seleccionar 5–10 ciudadanos voluntarios (pueden ser empleados municipales)
- [ ] Crear cuentas de prueba con CURP de prueba (no datos reales)
- [ ] Ejecutar el flujo completo con cada usuario
- [ ] Registrar: tiempo de completado, errores, puntos de fricción, comentarios
- [ ] Encuesta de satisfacción post-tramite (escala 1–5)
- [ ] Iterar el diseño con base en feedback

**Métricas a recabar:**

| Métrica | Meta | Real |
|---|---|---|
| Tiempo promedio de completado | <10 min | — |
| Tasa de abandono | <10% | — |
| Errores de usuario | <2 por trámite | — |
| Satisfacción | ≥4.5/5 | — |

**Entregable:** Reporte de usabilidad con hallazgos y mejoras implementadas.

---

## ETAPA C — PILOTO INSTITUCIONAL (⬜ Pendiente)

**Duración estimada:** 1–2 meses

**Objetivo:** Obtener autorización formal del Ayuntamiento para operar el piloto.

**Hito crítico:** El Ayuntamiento debe aprobar formalmente el piloto.

**Actividades:**

- [ ] Presentar el expediente completo al Ayuntamiento (Carpetas 01–15 + prototipo funcional)
- [ ] Identificar al área responsable dentro del Ayuntamiento (Secretaría, Oficialía)
- [ ] Designar al funcionario autorizado para firma de resoluciones
- [ ] Validar el fundamento jurídico del trámite con el área legal
- [ ] Determinar requisitos reales del trámite (levantamiento municipal)
- [ ] Determinar si se requiere AIR o procede exención
- [ ] Obtener Acuerdo de Ayuntamiento que autorice el piloto
- [ ] Habilitar infraestructura: hosting, base de datos, DNS
- [ ] Configurar ambiente de piloto (separado de producción)
- [ ] Capacitar a funcionarios involucrados
- [ ] Publicar aviso de privacidad

**Entregable:** Acuerdo de Ayuntamiento autorizando el piloto.

---

## ETAPA D — PRODUCCIÓN LIMITADA (⬜ Pendiente)

**Duración estimada:** 2–3 semanas

**Objetivo:** Operar el trámite real con ciudadanos reales durante un período controlado.

**Condiciones previas obligatorias:**

- [ ] Acuerdo de Ayuntamiento vigente
- [ ] Aviso de privacidad publicado
- [ ] Infraestructura en producción
- [ ] Funcionario firmante designado y capacitado
- [ ] Mecanismo de contingencia definido
- [ ] Canal de soporte para ciudadanos habilitado

**Alcance limitado:**

| Parámetro | Valor |
|---|---|
| Trámites | Solo Constancia de Residencia |
| Volumen | Máximo 50 trámites/día (controlado) |
| Usuarios | Residentes de Tepic (CP 63000–63519) |
| Duración | Mínimo 2 semanas |
| Supervisión | Monitoreo diario por el equipo técnico |

**Métricas a monitorear:**

| Métrica | Meta |
|---|---|
| Trámites completados exitosamente | ≥95% |
| Tiempo promedio de resolución | <4 horas hábiles |
| Errores del sistema | 0 críticos |
| Quejas/incidentes | <5% de trámites |
| Uso del canal de soporte | Documentar frecuencia y tipo |

---

## ETAPA E — EVALUACIÓN (⬜ Pendiente)

**Duración estimada:** 30 días

**Evaluaciones:**

| Día | Evaluación |
|---|---|
| Día 30 | Evaluación inicial del piloto |
| Día 60 | Evaluación intermedia |
| Día 90 | Evaluación final y decisión de escalamiento |

**Instrumentos de evaluación:**

- [ ] Matriz de cumplimiento LNETB (post-piloto)
- [ ] Encuesta de satisfacción ciudadana
- [ ] Entrevistas con funcionarios involucrados
- [ ] Auditoría de seguridad (pentest básico)
- [ ] Revisión de indicadores vs. metas

**Criterios de éxito:**

| Criterio | Umbral |
|---|---|
| Cumplimiento LNETB | ≥80% de artículos aplicables |
| Satisfacción ciudadana | ≥4.0/5 |
| Tiempo de resolución | <24 horas |
| Disponibilidad del sistema | ≥99.5% |
| Incidentes de seguridad | 0 graves |

---

## ETAPA F — ESCALAMIENTO (⬜ Pendiente)

**Objetivo:** Extender el modelo a un segundo trámite.

**Trámites candidatos para escalamiento:**

| Trámite | Prioridad | Justificación |
|---|---|---|
| Constancia de No Adeudo Predial | Alta | Complemento natural, mismo patrón |
| Licencia de Funcionamiento Comercial | Media | Alto volumen, mayor complejidad |
| Permiso de Construcción | Media | Impacto económico, requiere más validaciones |
| Acta de Nacimiento (copia certificada) | Media | Conexión con Registro Civil |

**Proceso de escalamiento:**
1. Seleccionar segundo trámite con base en resultados del piloto
2. Repetir FASES 1–5 con el nuevo trámite
3. Reutilizar arquitectura, identidad, expediente y firma
4. Tiempo estimado de desarrollo: 50% menos que el primer trámite

---

## 2. Cronograma Resumen

```
AGO 2026  │  SEP 2026  │  OCT 2026  │  NOV 2026  │  DIC 2026  │  ENE 2027
──────────┼────────────┼────────────┼────────────┼────────────┼───────────
 ETAPA A  │ ETAPA B    │ ETAPA C                 │ ETAPA D    │ ETAPA E
 (hecho)  │ (usuarios) │ (institucional)         │ (prod.)    │ (eval.)
          │            │                         │            │
          │            │ PRESENTACIÓN            │            │
          │            │ AL AYUNTAMIENTO          │            │
```

---

## 3. Equipo Requerido

| Rol | Responsable | Dedicación estimada |
|---|---|---|
| **Líder de proyecto** | Proponente tecnológico | 50% durante piloto |
| **Desarrollador frontend** | Proponente tecnológico | Incluido |
| **Desarrollador backend** | Proponente tecnológico | Incluido |
| **Enlace jurídico** | Área jurídica del Ayuntamiento | 10% durante Etapa C |
| **Enlace administrativo** | Secretaría del Ayuntamiento | 10% durante Etapa C |
| **Funcionario firmante** | Por designar | Según volumen de trámites |
| **Soporte a ciudadanos** | Por designar | Según demanda |

---

## 4. Riesgos del Piloto

| Riesgo | Probabilidad | Impacto | Mitigación |
|---|---|---|---|
| El Ayuntamiento no autoriza el piloto | Media | Alto | Presentar propuesta como laboratorio, no como sistema terminado |
| Falta de fundamento jurídico del trámite | Baja | Alto | Levantamiento jurídico en Etapa C |
| Resistencia de funcionarios | Media | Medio | Capacitación, mostrar beneficios (menos carga de trabajo) |
| Ciudadanos sin acceso a internet | Alta | Medio | Asistencia digital (kiosco en Ayuntamiento) + modo offline |
| Fallas técnicas en producción | Baja | Alto | Ambiente de piloto separado, plan de contingencia |
| Problemas con RENAPO/Interoperabilidad | Alta | Medio | Iniciar sin interoperabilidad real; el Ayuntamiento gestiona los convenios |

---

*Documento elaborado como parte del Laboratorio Piloto Tepic — Nayarit Digital · ConnectX*
*Agosto 2026*
