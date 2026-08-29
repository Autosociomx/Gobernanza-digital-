# Nodo de Transparencia (Interoperabilidad)

## Qué es
Panel del C5 que muestra endpoints de transparencia, trazabilidad inter-institucional y un log tipo blockchain municipal.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
| Con | Qué fluye |
|---|---|
| Gabinete | Referencia cruzada de auditoría institucional (visual, no conectada) |

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `InteroperabilidadView()`, líneas 243-332


## Cómo editarlo
- Todo el contenido son arreglos estáticos declarados dentro de la función — no hay servicio que tocar todavía.
- Para hacerlo real: crear un servicio en `src/services/` que lea un log de auditoría real y sustituir los arreglos de las líneas 279-284 (endpoints) y 311-317 (hashes).

## Verificado (auditoría 2026-08, bloque 4)
- Confirmado maqueta: cero `firebase/firestore`, `fetch(` o import de servicio en el rango; los endpoints, estados "Sincronizado", latencias y hashes SHA256 son literales del código (`C5Dashboard.tsx:280`, `:312`).
- Aplicado: `<DemoDataBadge>` en `C5Dashboard.tsx:252` declarando que toda la telemetría es simulada.
- Corregido: `C5Dashboard.tsx:307` decía "Muestreo en tiempo real de Mensajes de Datos sellados criptográficamente"; ahora dice que es un ejemplo ilustrativo.

## Pendientes
- Conectar a una fuente real de trazabilidad institucional — hoy es 100% maqueta visual.
