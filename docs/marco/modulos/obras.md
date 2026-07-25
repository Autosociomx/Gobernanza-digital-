# Trazabilidad de Obras

## Qué es
Mapa de obras públicas y alertas de infraestructura del municipio.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
| Con | Qué fluye |
|---|---|
| infrastructureService.ts | Existe el servicio real (usado por C5Dashboard en el módulo Salud y por CitizenApp), pero esta vista todavía no lo consume |

## Dónde vive
- Código: `src/components/C5Dashboard.tsx` — función/componente `ObrasView()`, líneas 365-417

- `docs/orbe/modulos/OBRAS.md` (alias de equipo: "Carreteras Inteligentes")
- `src/services/infrastructureService.ts` — servicio real ya construido, preparado pero no conectado aquí

## Cómo editarlo
- Las coordenadas de obras (líneas 383-387) y la lista de alertas (395-398) son arreglos estáticos.
- Para hacerlo real: importar `infrastructureService.ts` (ya existe y funciona en otras vistas) y sustituir los arreglos por `getMasterRegistry()` filtrado por tipo de activo relevante a obras.

## Pendientes
- Conectar esta vista al servicio de infraestructura real que ya existe — es la brecha más barata de cerrar de todo el panel C5.
