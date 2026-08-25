# Redes Ciudadanas

## Qué es
Comités y redes ciudadanas, con mapa de comités y registro externo.

## Estado
**Parcial — parte de la vista es real (Firestore), parte sigue siendo datos de ejemplo**

## Conexiones
| Con | Qué fluye |
|---|---|
| Firestore: colección de redes/comités | Lectura real de comités y conteo de miembros declarados |
| Firestore: `registros_externos` | Escritura real de invitaciones de registro externo |
| NayaritMap | Mapa real con marcadores de los comités que tienen coordenadas guardadas |

## Dónde vive
- Código: `src/components/CitizenApp.tsx` — función/componente `RedesCiudadanasView()`, líneas 1410-1552 (rango creció tras la auditoría de 2026-08-25)

## Auditoría 2026-08-25 — corregido
- "Ver Mapa" no tenía `onClick` — ahora abre/cierra un mapa real (`NayaritMap`) con los comités que tienen coordenadas en Firestore, aclarando cuántos de los comités totales aparecen.
- "Unirme al Comité" ahora es un toggle real (unirse/salir) con estado de guardado visible.
- "Comenzar Registro Externo" no tenía `onClick` — ahora abre un formulario real (nombre, teléfono, colonia) que escribe en Firestore como invitación pendiente, con una lista de "personas que registraste" y opción de eliminar. El texto aclara que esto NO crea una Nayarit ID ni da de alta a nadie ante ninguna autoridad.
- Las cifras "Miembros en Tepic: 2,410" y "Metas Alcanzadas: 94%" (fijas) se sustituyeron por sumas reales de los comités en Firestore, con nota de que los comités semilla tienen conteos de ejemplo.

## Pendientes
- Los comités semilla en Firestore siguen teniendo datos de ejemplo (conteos de miembros, coordenadas) — reales en mecanismo, no en contenido todavía.
