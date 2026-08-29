# Plan Maestro Estratégico

## Qué es
Plan de implementación (pilares político, aplicación y ciudadano), tablero de integraciones de datos abiertos, cronograma por fases y un "simulador de estrés" animado.

## Estado
**Maqueta — la interfaz existe, corre sobre datos generados en el navegador, sin servicio detrás**

Verificado en el código (auditoría Bloque 7):
- Cero imports de `firebase/firestore`, cero `fetch(`.
- El simulador usa `Math.random()` y `setTimeout` (`runStressTest`, líneas ~71-93): no consulta ningún sistema; latencia, concurrencia y bitácora son inventadas en el cliente.
- El tablero de "Integración de Datos Abiertos" es un arreglo literal y ya declara honestamente `No conectado` en PNT, Datos.gob.mx y SAT.
- Los pilares y el cronograma son texto literal y ya llevan marcas de "propuesta".

## Conexiones
| Con | Qué fluye |
|---|---|
| CitizenApp | Se monta como vista `strategic_plan` (`src/components/CitizenApp.tsx:391`) |
| strategic_academy | Comparte el discurso de blueprint estratégico |

## Dónde vive
- Código: `src/components/MasterStrategicPlan.tsx` — función/componente `MasterStrategicPlan()`, líneas 1-345

## Cómo editarlo
- El simulador es puramente visual: si algún día se quiere una prueba de carga real, no debe vivir en la app ciudadana sino en un pipeline con resultados publicados.
- Al editar los pilares, mantener la marca "(propuesta)" en todo lo que no tenga código detrás.

## Pendientes
- Ninguna de las integraciones de datos abiertos está conectada.
- No existe flujo de aprobación del plan dentro del sistema; la aprobación real ocurre en Cabildo/convenio y se documenta en `docs/actas/`.

## Bitácora de auditoría
- **2026-08 (Bloque 7).** El botón "Aprobar Plan de Operaciones" era un `alert()` que afirmaba haber aprobado y "sincronizado con el Nodo de Gobernanza": ahora es un toggle con estado real (`planRevisado`) que marca el plan como revisado solo en la sesión y explica dónde ocurre la aprobación de verdad.
- **2026-08 (Bloque 7).** Se añadió `<DemoDataBadge>` en el simulador, se le renombró "Simulador de Estrés (animación)" y se reescribieron las líneas de bitácora (`[SYS]`/`[SUCCESS]` → `[SIM]`) para que no se lean como telemetría real; el cierre ya no dice "Sistema Robusto".
- **2026-08 (Bloque 7).** *Corrección técnica.* La bitácora renderizaba `new Date()` en cada repintado, así que todas las líneas mostraban la hora actual en lugar de la de su evento; ahora cada entrada guarda su propia hora (`{hora, texto}`).
