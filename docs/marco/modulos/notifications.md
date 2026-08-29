# Notificaciones

## Qué es
Pestaña de notificaciones del ciudadano.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

Verificado el 2026-08-25: el archivo completo son 37 líneas, sin `useState`, sin `useEffect`, sin importar `firebase/firestore` y sin ninguna llamada a red. Es un `.map()` sobre un arreglo literal.

## Conexiones
_Sin conexiones registradas todavía._

## Dónde vive
- Código: `src/components/NotificationView.tsx` — función/componente `NotificationView()`, líneas 1-37


## Cómo editarlo
- 3 notificaciones hardcodeadas (líneas 18-21) — cualquier usuario ve exactamente las mismas, siempre.
- La vista ya lleva `<DemoDataBadge />` visible arriba de la lista (línea 15). No quitarlo mientras no exista una colección real detrás.
- Único control interactivo: el botón "volver" (`onBack`), que sí funciona. No hay botones muertos: las tarjetas no son clicables y no pretenden serlo.
- El punto de color "no leído" viene del literal `unread` del arreglo; no hay estado de lectura persistido, así que nunca cambia.

## Pendientes
- Construir una colección real de notificaciones por usuario — hoy es 100% estático.
- El texto de ejemplo "Aprovecha 15% de descuento antes del 31 de Junio" es un dato inventado (y junio tiene 30 días). Sustituirlo al conectar la fuente real, o antes si el módulo se demuestra en vivo.
