# Redes Ciudadanas

## Qué es
Comités y redes ciudadanas, con mapa de comités y registro externo.

## Estado
**Parcial — parte de la vista es real, parte es maqueta o tiene botones sin acción**

## Conexiones
| Con | Qué fluye |
|---|---|
| Firestore: neighborhood_networks | Lectura real vía `onSnapshot`, con auto-siembra si la colección está vacía |

## Dónde vive
- Código: `src/components/CitizenApp.tsx` — función/componente `RedesCiudadanasView()`, líneas 1410-1552


## Cómo editarlo
- "Ver Mapa" y "Comenzar Registro Externo" no tienen `onClick` — CTAs muertas.

## Pendientes
- "Ver Mapa" — sin acción; conectar a un mapa real de comités.
- "Comenzar Registro Externo" — sin acción; conectar a un flujo real de referido/registro.
