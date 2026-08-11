# Carpeta 04 — Expediente de Reingeniería Administrativa

## 1. Objetivo

Analizar el proceso administrativo seleccionado y comparar el procedimiento actual con una alternativa digital propuesta.

**Los resultados del modelo TO-BE son proyecciones que deberán ser validadas por el Ayuntamiento.**

---

## 2. Trámite piloto

**Constancia Municipal de Residencia**

---

## 3. Modelo AS-IS — REQUIERE LEVANTAMIENTO MUNICIPAL

Los datos que se presentan a continuación deben ser documentados con los funcionarios responsables del trámite. No deben usarse estimaciones del proponente tecnológico como datos oficiales.

### Formato de levantamiento

| Campo | Valor (completar por el Ayuntamiento) |
|---|---|
| Nombre oficial del trámite | |
| Fundamento jurídico (norma, artículo) | |
| Dependencia responsable | |
| Requisitos actuales (lista completa) | |
| Documentos solicitados (tipo y cantidad) | |
| Visitas necesarias (número y motivo) | |
| Unidades administrativas que intervienen | |
| Tiempo total del trámite (horas/días) | |
| Tiempo promedio de resolución | |
| Costo del trámite (derechos) | |
| Costo para el ciudadano (traslados, copias) | |
| Puntos de captura de datos (quién captura qué, dónde) | |
| Validaciones (quién valida, contra qué fuente) | |
| Firmas requeridas (quién firma, qué documento) | |
| Medio de notificación actual | |
| Método de archivo y conservación | |
| Causas de rechazo más frecuentes | |
| Volumen mensual/anual de trámites | |

---

## 4. Modelo TO-BE propuesto

Flujo potencial rediseñado. Cada etapa marcada con 🔴 requiere determinación institucional antes de poder implementarse.

```
1. Identificación del ciudadano
   → CURP (validación sintáctica en prototipo)
   → 🔴 Verificación contra fuente oficial (requiere autorización)

2. Solicitud digital
   → Formulario web/móvil (🟢 prototipo funcional)
   → Sin papel, sin desplazamiento

3. Validación de información
   → Automatizada (reglas de negocio programables)
   → 🔴 Reglas definitivas requieren validación del Ayuntamiento

4. Consulta de fuentes oficiales autorizadas
   → 🔴 Catastro, SIAPA, RENAPO (requieren convenio/autorización)

5. Integración del expediente
   → 🟡 Infraestructura Firestore configurada
   → 🔴 Esquema de expediente requiere implementación

6. Revisión administrativa
   → 🔴 Requiere designación de funcionario responsable

7. Resolución
   → Automática para casos que cumplan todas las reglas
   → 🔴 Criterios de resolución requieren definición del Ayuntamiento

8. Firma institucional
   → Prototipo: OTP (demostración del flujo)
   → 🔴 Mecanismo jurídico de firma requiere determinación de la autoridad

9. Emisión
   → PDF + QR (🟢 prototipo funcional)
   → 🔴 QR de verificación requiere conexión a backend autorizado

10. Notificación
    → 🔴 Canal de notificación requiere definición (SMS, email, buzón)

11. Consulta/verificación
    → 🟡 Diseñado (consulta por folio)
    → 🔴 Requiere backend en producción

12. Conservación documental
    → 🔴 Política de retención requiere definición del Ayuntamiento
```

---

## 5. Regla fundamental

**Ninguna reducción deberá presentarse como ahorro real hasta que exista medición del procedimiento actual y validación institucional.**

Por tanto: "reducción potencial" no significa "reducción oficialmente comprobada".

---

## 6. Indicadores propuestos

Estos indicadores deberán ser medidos antes (línea base) y después (resultados) de la implementación, si el Ayuntamiento decide llevarla a cabo.

| Indicador | Unidad | AS-IS | TO-BE (meta) | Método de medición |
|---|---|---|---|---|
| Tiempo promedio de resolución | Horas/días | Por medir | Por definir | Diferencia entre fecha de solicitud y fecha de resolución |
| Número de visitas | Unidades | Por medir | 0 | Registro de interacciones presenciales |
| Número de documentos solicitados | Unidades | Por medir | ≤2 | Catálogo de requisitos |
| Número de capturas repetidas | Unidades | Por medir | 0 | Trazabilidad de datos en el expediente |
| Costo administrativo por trámite | Pesos | Por medir | Por definir | Tiempo de funcionarios × costo hora |
| Consumo de papel | Hojas | Por medir | 0 | Conteo físico (AS-IS) |
| Porcentaje de solicitudes digitales | % | 0% | ≥80% | Solicitudes digitales / total |
| Satisfacción ciudadana | Escala 1-5 | Por medir | ≥4.0 | Encuesta post-trámite |
| Incidencias del sistema | Unidades | — | Por definir | Registro de errores |
| Disponibilidad del sistema | % | — | ≥99.5% | Monitoreo de uptime |

---

## 7. Matriz comparativa

| Indicador | AS-IS | TO-BE | Evidencia |
|---|---|---|---|
| Visitas | Por medir | Meta: 0 | Requiere levantamiento municipal |
| Documentos | Por medir | Meta: ≤2 | Requiere validación jurídica de cada eliminación |
| Tiempo total | Por medir | Meta: <10 min | Requiere medición AS-IS real |
| Papel | Por medir | Meta: 0 hojas | Requiere conteo físico AS-IS |
| Capturas duplicadas | Por medir | Meta: 0 | Requiere trazabilidad del proceso actual |
| Resolución digital | No determinada | Propuesta | Requiere firma institucional |
| Costo ciudadano | Por medir | Meta: $0 traslados | Requiere encuesta de costo actual |

---

## 8. Matriz de simplificación de requisitos

**Cada eliminación propuesta requiere validación jurídica del Ayuntamiento. No se elimina ningún requisito por conveniencia tecnológica.**

| Requisito actual | ¿Quién ya lo posee? | Sustitución propuesta | Fundamento de referencia | Estado |
|---|---|---|---|---|
| Identificación oficial (INE) | INE / SEGOB | CURP verificada electrónicamente | LNETB como referencia | REQUIERE VALIDACIÓN |
| Comprobante de domicilio | Catastro / SIAPA / CFE | Consulta a fuente oficial autorizada | LNETB como referencia | REQUIERE AUTORIZACIÓN |
| Copia de CURP | RENAPO | Verificación electrónica | LNETB como referencia | REQUIERE VALIDACIÓN |
| Solicitud en papel | — | Formulario digital con mecanismo de verificación | Principio de digitalización | REQUIERE VALIDACIÓN |

---

## 9. Resultado esperado

La reingeniería deberá demostrar —si el Ayuntamiento decide implementarla— no solamente que el trámite puede digitalizarse, sino que la digitalización:

- reduce cargas administrativas;
- mantiene controles jurídicos;
- protege derechos de los ciudadanos;
- conserva trazabilidad completa;
- mejora tiempos de respuesta;
- evita duplicidad de información;
- mantiene la responsabilidad de la autoridad.

---

## 10. Validación requerida

El proceso AS-IS y el proceso TO-BE deberán ser revisados conjuntamente con los servidores públicos responsables del trámite **antes** de convertirse en especificación institucional.

El Ayuntamiento deberá:

1. Validar o corregir el proceso AS-IS documentado
2. Revisar cada simplificación propuesta en el TO-BE
3. Confirmar la viabilidad jurídica de cada eliminación de requisito
4. Determinar si se requiere AIR o procede exención
5. Aprobar el proceso TO-BE antes de cualquier implementación

---

*Documento preparado como insumo para la revisión de las áreas responsables del H. Ayuntamiento de Tepic.*
*Las reducciones presentadas son metas potenciales, no resultados oficialmente comprobados.*
