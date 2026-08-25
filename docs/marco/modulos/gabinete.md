# Gabinete en Tiempo Real

## Qué es
Tarjetas de funcionarios del gabinete municipal con KPIs individuales y botón de auditoría.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
| Con | Qué fluye |
|---|---|
| Interoperabilidad | Referencia visual cruzada de auditoría institucional |

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `GabineteView()`, líneas 1518-1629

## Cómo editarlo
- Los 4 funcionarios y sus KPIs/tiempos de respuesta/proyectos siguen siendo un arreglo hardcodeado con nombres reales.
- El botón "Auditar Funcionario" era un `div` con estilos de botón sin `onClick` — decorativo. Ahora es un botón real que despliega una ficha explicando qué sí puede consultarse hoy de esa persona.

## Auditoría 2026-08-25 — corregido (revisado con el propietario del repositorio)
- Las 4 fotografías eran de banco de imágenes (Unsplash) atribuidas como si fueran el retrato real de cada funcionario — se retiraron y se sustituyeron por iniciales.
- "Auditar Funcionario" ahora funciona: al abrirse, declara explícitamente "No hay expediente de auditoría conectado a esta persona" y que el KPI, tiempo de respuesta y número de proyectos "son valores de ejemplo, no mediciones".
- Se consultó explícitamente al propietario del repositorio sobre este cambio (nombres reales + datos inventados) antes de aplicarlo; decidió mantener la corrección de fotos/honestidad sin tocar los nombres.

## Pendientes
- Los nombres y KPIs de funcionarios siguen siendo datos de ejemplo sobre personas reales — sigue siendo la decisión más sensible del módulo si se va a mostrar en un demo público, aunque ya no aparenta más certeza de la que tiene.
