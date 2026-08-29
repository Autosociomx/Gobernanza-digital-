# Agrovisión 3D

## Qué es
Visualización NDVI, precios de mercado agrícola, y generación de certificado de producción.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
_Sin conexiones registradas todavía._

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `AgrovisionView()`, líneas 1001-1084

- Alias de equipo: "AgroVisión 3D" (`docs/plataforma/03-DOCUMENTACION-FUNCIONAL.md` — marcado hoja de ruta, "Octane 3D Engine" es texto decorativo, no un motor 3D real)

## Cómo editarlo
- Todos los valores NDVI y de mercado siguen siendo estáticos (ahora en la constante `MERCADO_AGRO`). Lleva `<DemoDataBadge />` visible explicando esto.
- "Generar Certificado de Producción" dejó de ser un éxito simulado sin efecto: ahora arma un archivo real con los datos en pantalla, lo descarga, y lo anota en una lista de "certificados descargados en esta sesión" (estado real de React). El propio texto aclara que no se persiste en ningún servicio ni bitácora institucional todavía.

## Auditoría 2026-08-25 — corregido
- El botón de certificado pasó de "no hace nada real" a "produce un archivo real, aunque sin validez oficial ni persistencia" — mismo criterio aplicado en Observatorio.

## Pendientes
- Conectar a una fuente real de datos satelitales/NDVI.
- Persistir el certificado generado en un servicio real en vez de solo descargarlo al dispositivo.
