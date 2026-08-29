# Banana Command Center

## Qué es
Biblioteca abierta de los prompts que rigen al asistente Aura: se leen en pantalla y se copian al portapapeles.

## Estado
**Parcial — la función que ofrece sí se ejecuta (copiar al portapapeles), pero el contenido es estático y no hay servicio detrás**

Verificado en el código (auditoría Bloque 7):
- Cero imports de `firebase/firestore`, cero `fetch(`: los tres prompts son un arreglo literal en el propio componente (líneas 12-31).
- `navigator.clipboard.writeText` sí funciona; el `setTimeout` solo revierte el ícono de copiado a los 2 s.
- Los prompts mostrados son texto versionado en el repositorio, no una configuración viva del modelo: editar aquí no cambia el comportamiento de Aura en tiempo de ejecución.

## Conexiones
| Con | Qué fluye |
|---|---|
| CitizenApp | Se monta como vista `banana_command` (`src/components/CitizenApp.tsx:389`) |
| ia (Asistente Aura) | Documenta los prompts de gobernanza del asistente, sin leerlos ni escribirlos programáticamente |

## Dónde vive
- Código: `src/components/BananaCommandCenter.tsx` — función/componente `BananaCommandCenter()`, líneas 1-154

## Cómo editarlo
- Los prompts se editan en el arreglo `prompts` (líneas 12-31).
- Para hacerlo real habría que leer los prompts de la misma fuente que consume el asistente (hoy no hay tal fuente compartida) y persistir las propuestas ciudadanas en una colección revisable.

## Pendientes
- Los borradores que escribe la persona viven solo en memoria de la sesión: no hay canal de envío ni revisión.
- No existe la "actualización en caliente de protocolos" que prometía el copy anterior; cambiar un prompt exige un cambio de código revisado.

## Bitácora de auditoría
- **2026-08 (Bloque 7).** El botón "Sugerir Optimización" era un `alert()` de éxito falso ("enviada al centro de datos"): se sustituyó por un formulario con estado real (`sugerencia`/`borradores`) que guarda borradores locales, los lista y permite copiarlos, diciendo explícitamente que no se envían a ningún servidor.
- **2026-08 (Bloque 7).** El copy afirmaba "actualizaciones en caliente de los protocolos"; se reescribió describiendo lo que realmente ocurre (texto versionado, cambio de código revisado). De paso se corrigió el `**ConnectX**` en Markdown que se renderizaba con asteriscos literales.
