# Obras Nayarit — Monitoreo cívico de obra pública

Módulo de auditoría cívica del Protocolo de Gobernanza Digital AI. Da seguimiento
periódico a las obras de infraestructura pública en el estado de Nayarit y conserva
cada consulta como evidencia verificable dentro del portal.

## Objetivo

- Consultar de forma periódica las fuentes oficiales y de prensa sobre el avance
  de las obras públicas en Nayarit.
- Registrar cada consulta en una bitácora de evidencia con fecha, hallazgos y
  fuentes, de modo que el historial del repositorio funcione como registro
  auditable (quién consultó, cuándo y qué se encontró).

## Estructura

| Ruta | Contenido |
|---|---|
| `datos/obras.json` | Registro estructurado de las obras monitoreadas y su último estado conocido |
| `evidencia/` | Bitácora: un reporte fechado (`AAAA-MM-DD-reporte.md`) por cada consulta periódica |

## Fuentes consultadas

- **SICT** (Secretaría de Infraestructura, Comunicaciones y Transportes): sala de prensa — https://www.gob.mx/sict/archivo/prensa
- **Proyectos México** (cartera oficial de inversión): https://www.proyectosmexico.gob.mx
- **ComprasMX** (licitaciones y contratos federales): https://comprasmx.buengobierno.gob.mx
- **DOF** (Diario Oficial de la Federación, convocatorias y concesiones): https://www.dof.gob.mx
- **Secretaría de Infraestructura de Nayarit** (obra estatal): https://sop.nayarit.gob.mx
- Prensa local y nacional como fuente complementaria, siempre citada por URL.

Nota operativa: el entorno de consulta automatizada no siempre puede leer las
páginas de `gob.mx` directamente (bloqueos al tráfico automatizado), por lo que
parte de la evidencia se obtiene vía resultados de búsqueda y prensa que cita
las fuentes oficiales. Cada reporte indica qué fuentes se pudieron verificar.

## Cadencia

Consulta semanal programada (lunes por la mañana, hora de Nayarit). Cada corrida
actualiza `datos/obras.json` y agrega un reporte nuevo en `evidencia/`.
