# Trazabilidad de Obras

## Qué es
Mapa de obras públicas y alertas de infraestructura del municipio.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
| Con | Qué fluye |
|---|---|
| infrastructureService.ts | Existe el servicio real, pero **no** lo usa `C5Dashboard.tsx` — lo importan `CitizenApp.tsx` (línea 63, `getMasterRegistry`) y el componente huérfano `SovereignMap.tsx`. Corrección sobre una versión anterior de esta ficha que decía, sin haberlo verificado, que C5Dashboard ya lo consumía en Salud — no es cierto: `C5Dashboard.tsx` solo importa `citasSaludService`/`saludPerfilService` |

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `ObrasView()`, líneas 365-417
- `docs/orbe/modulos/OBRAS.md` (alias de equipo: "Carreteras Inteligentes")
- `src/services/infrastructureService.ts` — servicio real ya construido, usado en `CitizenApp.tsx`, no conectado aquí

## Cómo editarlo
- Las coordenadas de obras (líneas 383-387) y la lista de alertas (395-398) son arreglos estáticos.
- Para hacerlo real: importar `infrastructureService.ts` (`getMasterRegistry`, ya usado en `CitizenApp.tsx:63,131`) y sustituir los arreglos por su resultado filtrado por tipo de activo relevante a obras.

## Pendientes
- Conectar esta vista al servicio de infraestructura real que ya existe — es la brecha más barata de cerrar de todo el panel C5.
