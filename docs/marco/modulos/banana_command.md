# Banana Command Center

## Qué es
Panel de mando temático adicional del portal ciudadano.

## Estado
**Maqueta — la interfaz existe, corre sobre datos de ejemplo, sin servicio detrás**

## Conexiones
| Con | Qué fluye |
|---|---|
| AuraCertificationSeal | Componente compartido con `strategic_academy`, `strategic_plan` y `municipal_letters` — mismo sello decorativo de certificación en los 4 |

## Dónde vive
- Código: `src/components/BananaCommandCenter.tsx` — función/componente `BananaCommandCenter()`, líneas 1-113


## Cómo editarlo
- Contiene botones de "éxito" simulado (alert tras `setTimeout`) detectados en la auditoría de CTAs — revisar cada acción antes de mostrarlo como funcional.

## Pendientes
- Auditar cada botón de este archivo — quedó marcado en el barrido general de "éxito simulado" sin haberse revisado a detalle todavía.
