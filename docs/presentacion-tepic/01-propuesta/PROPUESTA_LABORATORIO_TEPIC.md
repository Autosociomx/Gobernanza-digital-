# Propuesta de Laboratorio Municipal de Simplificación y Digitalización
## Municipio de Tepic, Nayarit — Agosto 2026

**Proponente tecnológico:** Miguel Alexis Pérez Aguilar · AutosocioMX
**Proyecto:** Nayarit Digital · ConnectX — SOATM
**Documento:** Presentación institucional para el H. Ayuntamiento de Tepic

---

## 1. Propósito de este documento

Presentar ante el H. Ayuntamiento de Tepic una **propuesta de laboratorio de simplificación y digitalización municipal**, acompañada del prototipo tecnológico, el expediente jurídico y la documentación técnica necesaria para que la autoridad pueda:

1. Conocer el alcance real del prototipo (lo que existe y lo que no)
2. Evaluar su viabilidad jurídica, técnica y administrativa
3. Determinar, dentro de sus facultades, si procede adoptarlo como piloto institucional

---

## 2. Lo que ES esta propuesta

| 🟢 DEMOSTRADO | 🟡 PROPUESTO | 🔴 DEPENDE DE AUTORIDAD |
|---|---|---|
| Un prototipo funcional de laboratorio que demuestra el flujo completo de un trámite digital (Constancia de Residencia) | Una arquitectura para implementar el Modelo Nacional de Simplificación y Digitalización en un municipio | La validación jurídica de requisitos, la autorización de trámites, la conexión a fuentes oficiales |
| Un servidor backend operativo (Express + SQLite + Gemini AI + Stripe) | Una hoja de ruta para 13 dependencias municipales | La designación de funcionarios firmantes |
| Una biblioteca legal con 100+ ordenamientos verificados contra fuentes oficiales | Conectores de interoperabilidad documentados (sin conexiones reales aún) | Los convenios con RENAPO, SAT, SIAPA |
| Un protocolo de seguridad documentado con guardia CI automatizada | Un plan de implementación en 6 etapas | El Acuerdo de Cabildo que autorice el piloto |

---

## 3. Lo que NO ES esta propuesta

- ❌ No es un sistema gubernamental autorizado ni en operación
- ❌ No está conectado a RENAPO, SAT, catastro, SIAPA ni ninguna fuente oficial
- ❌ No emite documentos con validez jurídica
- ❌ No tiene firma electrónica avanzada (e.firma)
- ❌ No utiliza datos personales reales de ciudadanos
- ❌ No pretende sustituir unilateralmente los sistemas municipales
- ❌ No es una plataforma "certificada" ni "aprobada" conforme a la LNETB

---

## 4. El problema

Los ciudadanos de Tepic enfrentan trámites municipales que requieren:
- Múltiples visitas presenciales al Ayuntamiento
- Documentos impresos que otras dependencias ya poseen
- Tiempos de espera de días para trámites simples
- Costos de traslado, copias y tiempo no productivo

Para el Ayuntamiento, el proceso actual implica:
- Captura manual de datos con errores
- Sin trazabilidad de quién hizo qué y cuándo
- Archivos en papel sin respaldo digital
- Sin indicadores de eficiencia

---

## 5. El marco normativo que ya obliga al municipio

La **Ley Nacional para Eliminar Trámites Burocráticos (LNETB)**, publicada en el DOF el 16 de julio de 2025, establece obligaciones para los tres órdenes de gobierno:

- **Eliminar** trámites innecesarios y requisitos duplicados
- **Digitalizar** integralmente los trámites que permanezcan
- **No solicitar** documentos que el propio gobierno ya posee
- **Implementar** identidad digital, expediente único, ventanilla única e interoperabilidad
- **Simplificar** antes de digitalizar

Los **Lineamientos del Modelo Nacional**, publicados el 22 de octubre de 2025, detallan la arquitectura técnica y regulatoria para cumplir estas obligaciones.

La **Ley de Gobierno Digital del Estado de Nayarit** (Arts. 2, 5 y 6) obliga expresamente a los Ayuntamientos a implementar gobierno digital, expediente electrónico e interoperabilidad.

**El municipio ya tiene la obligación legal. Esta propuesta ofrece una herramienta para cumplirla.**

---

## 6. La propuesta: Laboratorio Piloto de un solo trámite

### Trámite demostrador: Constancia Municipal de Residencia

**Por qué este trámite:**
- Alto volumen — se solicita frecuentemente para trámites escolares, laborales y bancarios
- Baja complejidad jurídica — no requiere pago de derechos en la mayoría de los casos
- Demostrabilidad — permite probar el ciclo completo: identidad → domicilio → firma → resolución → notificación → expediente
- Bajo riesgo — un error tiene consecuencias limitadas

### Lo que el prototipo demuestra hoy (🟢)

1. Validación de CURP (sintáctica, algoritmo RENAPO)
2. Verificación de domicilio en Tepic (rango de códigos postales)
3. Firma electrónica simple (OTP como demostración del concepto)
4. Generación de constancia digital con QR verificable
5. Expediente de trazabilidad con 5 eventos registrados por trámite
6. Comparativa AS-IS vs TO-BE con metas de simplificación

### Lo que el Ayuntamiento necesitaría habilitar (🔴)

1. Designar la dependencia responsable del trámite
2. Validar los requisitos reales y su fundamento jurídico
3. Determinar si se requiere AIR o procede exención
4. Designar al funcionario autorizado para firmar
5. Autorizar las conexiones a fuentes oficiales (cuando se requieran)

---

## 7. Meta de simplificación propuesta

| Indicador | Situación actual (estimada) | Meta propuesta con el piloto | Reducción |
|---|---|---|---|
| Requisitos documentales | 3–4 documentos | ≤2 (CURP verificada digitalmente) | ≥50% |
| Visitas presenciales | 2 al Ayuntamiento | 0 | 100% |
| Tiempo del ciudadano | 2–4 horas (traslados, esperas) | <10 minutos | >95% |
| Copias requeridas | 2–3 | 0 | 100% |
| Tiempo de resolución | 1–3 días hábiles | <24 horas (meta: inmediato) | >80% |

*Nota: los valores de la situación actual deben ser confirmados por el Ayuntamiento mediante levantamiento del proceso real.*

---

## 8. Lo que pedimos al Ayuntamiento

1. **Recibir esta propuesta** y designar un enlace institucional para analizarla
2. **Revisar el expediente jurídico** (Carpeta 02) y validar o corregir el fundamento del trámite
3. **Determinar** si la propuesta es viable jurídica y administrativamente
4. **Si procede**, aprobar un piloto controlado (sin efectos jurídicos inicialmente) mediante el instrumento que corresponda (Acuerdo de Cabildo o acto administrativo del titular)

---

## 9. Próximos pasos propuestos

| Paso | Responsable | Tiempo estimado |
|---|---|---|
| 1. Presentación formal al Ayuntamiento | Proponente tecnológico | Por agendar |
| 2. Revisión del expediente por área jurídica | Ayuntamiento | 2–4 semanas |
| 3. Levantamiento del trámite real | Ayuntamiento + Proponente | 1–2 semanas |
| 4. Ajustes al prototipo con datos reales | Proponente tecnológico | 2–3 semanas |
| 5. Determinación AIR/exención | Área de mejora regulatoria | Según procedimiento |
| 6. Piloto controlado (Etapa C) | Ayuntamiento + Proponente | 1–2 meses |
| 7. Evaluación y decisión de escalamiento | Ayuntamiento | 30/60/90 días |

---

## 10. Documentos que acompañan esta propuesta

Este documento es la **Carpeta 01** de un expediente completo de 5 carpetas:

| Carpeta | Contenido | Ubicación |
|---|---|---|
| **01 — Propuesta** | Este documento | `docs/presentacion-tepic/01-propuesta/` |
| **02 — Expediente Jurídico** | Fundamento del trámite, marco LNETB, análisis de competencias, AIR | `docs/presentacion-tepic/02-juridico/` |
| **03 — Expediente Técnico** | Arquitectura, stack, seguridad, modelo de datos, infraestructura | `docs/presentacion-tepic/03-tecnico/` |
| **04 — Reingeniería** | AS-IS vs TO-BE, matriz de simplificación, justificación jurídica de cada eliminación | `docs/presentacion-tepic/04-reingenieria/` |
| **05 — Anexos** | Contra-auditoría LNETB, biblioteca legal verificada, protocolo de seguridad | `docs/presentacion-tepic/05-anexos/` |

---

*Documento preparado como propuesta tecnológica para el H. Ayuntamiento de Tepic.*
*No constituye un sistema gubernamental autorizado. No tiene efectos jurídicos.*
*Agosto 2026 · Nayarit Digital · ConnectX · SOATM*
