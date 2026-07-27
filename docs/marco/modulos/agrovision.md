# Agrovisión 3D

## Qué es
Visualización NDVI, precios de mercado agrícola, y generación de certificado de producción.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
_Verificado contra el código (imports del archivo): no importa ningún servicio ni componente compartido con otro módulo. Aislado por diseño, no por documentación pendiente._

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `AgrovisionView()`, líneas 1001-1084

- Alias de equipo: "AgroVisión 3D" (`docs/plataforma/03-DOCUMENTACION-FUNCIONAL.md` — marcado hoja de ruta, "Octane 3D Engine" es texto decorativo, no un motor 3D real)

## Cómo editarlo
- Todos los valores NDVI y de mercado (líneas 1071-1076) son estáticos.
- El botón "Generar Certificado de Producción" hace `setTimeout` y muestra éxito simulado — nada se genera ni se guarda.

## Pendientes
- Conectar a una fuente real de datos satelitales/NDVI.
- "Generar Certificado de Producción" no genera ni persiste ningún documento — es el botón más engañoso de este módulo.
