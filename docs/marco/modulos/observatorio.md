# Observatorio Digital

## Qué es
KPIs estratégicos, pestañas de estrategia, gráficas, mapa de calor, y generación de reporte estratégico 2026.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
_Verificado contra el código (imports del archivo): no importa ningún servicio ni componente compartido con otro módulo. Aislado por diseño, no por documentación pendiente._

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `ObservatorioView()`, líneas 1085-1455


## Cómo editarlo
- `citizenData`, `worksData`, `oceanData` y los KPIs son arreglos estáticos declarados en el archivo — no hay import de servicio.
- Los botones "Generar Reporte Estratégico 2026" y "Desbloquear Estrategia Barrio" comparten `handleReport`, que solo hace `setTimeout` + `alert()` — no producen ningún reporte real.

## Pendientes
- Ambos botones de generación de reporte son éxito simulado — mismo patrón que Agrovisión y Servicios.
- Es la vista más grande del panel (370 líneas) enteramente sobre datos de ejemplo — candidata prioritaria si se va a mostrar en un demo con público externo.
