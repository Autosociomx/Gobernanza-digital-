# DIAGNÓSTICO DEL PROBLEMA

## Laboratorio Piloto de Simplificación y Digitalización Municipal
### Municipio de Tepic, Nayarit — Constancia de Residencia

---

## Naturaleza del Proyecto

### Lo que ES

Un **laboratorio piloto de simplificación y digitalización** que demuestra, con un solo trámite municipal (Constancia de Residencia), cómo podría implementarse en Tepic el Modelo Nacional de Simplificación y Digitalización.

### Lo que NO ES

- No es un sistema gubernamental autorizado
- No sustituye sistemas oficiales del municipio
- No tiene acceso a bases de datos oficiales (RENAPO, catastro, SIAPA)
- No utiliza datos personales reales de ciudadanos
- No emite resoluciones con efectos jurídicos vinculantes

### Roles claramente diferenciados

| Rol | Responsable |
|---|---|
| **Proponente tecnológico** | Desarrolla prototipo, arquitectura, documentación |
| **Sujeto obligado** | H. Ayuntamiento de Tepic — determina trámites, requisitos, responsables |
| **Autoridad competente** | Presidente Municipal / Secretario del Ayuntamiento — firma resoluciones |

---

## Contexto Nacional

La **LNETB** (DOF 16-jul-2025) y los **Lineamientos del Modelo Nacional** (DOF 22-oct-2025) establecen la obligación de los tres órdenes de gobierno de implementar el Modelo Nacional. La **ATDT** coordina mesas de trabajo directas con estados y municipios.

---

## Trámite Seleccionado: Constancia Municipal de Residencia

| Atributo | Descripción |
|---|---|
| **Nombre** | Constancia Municipal de Residencia |
| **Objeto** | Acreditar el domicilio de una persona en Tepic |
| **Sujeto obligado** | H. Ayuntamiento de Tepic |
| **Justificación** | Alto volumen, baja complejidad jurídica, demuestra el ciclo completo, replicable |

---

## Carga burocrática estimada (por verificar con el Ayuntamiento)

| Indicador | Estimación | Estado |
|---|---|---|
| Visitas presenciales | 2 (información + entrega) | 🔵 POR VERIFICAR |
| Documentos requeridos | 3–4 (INE, comprobante, CURP, solicitud) | 🔵 POR VERIFICAR |
| Tiempo total ciudadano | 2–4 horas | 🔵 POR VERIFICAR |
| Tiempo de resolución | 1–3 días hábiles | 🔵 POR VERIFICAR |
| Costo del trámite | $0–150 MXN según Ley de Ingresos | 🔵 POR VERIFICAR |

⚠️ **Todas las cifras son estimaciones de laboratorio.** El Ayuntamiento debe proporcionar los datos reales del trámite vigente mediante levantamiento del proceso.

---

## Lo que existe hoy en el repositorio

| Componente | Estado |
|---|---|
| Prototipo funcional del flujo digital | 🟢 `demo/constancia-residencia/index.html` |
| Validación sintáctica CURP (algoritmo RENAPO) | 🟢 Demo |
| Flujo OTP demostrativo | 🟢 Demo |
| Expediente regulatorio (9 docs) | 🟢 Completo |
| Biblioteca legal verificada (100+ ordenamientos) | 🟢 Completa |
| Contra-auditoría LNETB | 🟢 Completa |

---

## Lo que NO existe hoy

- Conexión a RENAPO, catastro, SIAPA
- Firma electrónica avanzada
- Expediente digital en producción
- Autorización del Ayuntamiento
- Datos reales del trámite municipal

---

*Documento adaptado del expediente regulatorio original — Agosto 2026*
