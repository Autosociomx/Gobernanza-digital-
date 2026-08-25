# Observatorio Digital

## Qué es
KPIs estratégicos, pestañas de estrategia, gráficas, mapa de calor, y generación de reporte estratégico 2026.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
_Sin conexiones registradas todavía._

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `ObservatorioView()`, líneas 1085-1455 (rango creció tras la auditoría de 2026-08-25)

## Cómo editarlo
- `citizenData`, `worksData`, `oceanData` y los KPIs siguen siendo arreglos estáticos declarados en el archivo — no hay import de servicio. Ahora lleva `<DemoDataBadge />` explícito.
- Los dos botones de reporte ("Generar Reporte Estratégico 2026" y "Desbloquear Estrategia Barrio") comparten `handleReport`, que antes solo hacía `setTimeout` + `alert()` sin producir nada. Ahora arma un archivo de texto real con los datos en pantalla, lo descarga, y lo anota en una lista visible de "reportes generados en esta sesión" (estado real de React) — el mismo patrón aplicado en Agrovisión.
- La etiqueta "LIVE" de la gráfica de adopción se cambió por "EJEMPLO".

## Auditoría 2026-08-25 — corregido
- `handleReport` pasó de "no cambia nada, solo alerta" a "descarga un documento real con aviso de que los datos son de ejemplo y no oficiales" — el hallazgo insignia de "acción no-funcional" de esta ronda de auditoría.

## Pendientes
- Persistir los reportes generados en un servicio real en vez de solo descargarlos al dispositivo.
- Es la vista más grande del panel, enteramente sobre datos de ejemplo — candidata prioritaria si se va a mostrar en un demo con público externo.
