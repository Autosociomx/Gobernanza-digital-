# Bienestar Social

## Qué es
Vista de integración de padrones de bienestar social.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
_Sin conexiones registradas todavía._

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `BienestarView()`, líneas 1456-1477

- `docs/orbe/modulos/BIENESTAR.md`

## Cómo editarlo
- Sigue sin ningún botón ni acción — es texto descriptivo. La pastilla decía "Sincronizando padrones..." de forma permanente, sugiriendo un proceso en curso que nunca existió; ahora dice "Integración pendiente — ningún padrón conectado" y lleva `<DemoDataBadge />`.
- Es el módulo más corto del panel: construirlo de verdad implica empezar prácticamente desde cero, no editar algo existente.

## Auditoría 2026-08-25 — corregido
- Se retiró la afirmación falsa de sincronización en curso ("no está pasando nada" ahora se ve como "no está pasando nada").

## Pendientes
- Construir la integración real al padrón único que la copia ya describe — hoy no existe ninguna acción ni dato real.
