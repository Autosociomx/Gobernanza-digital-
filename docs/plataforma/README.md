# Documentación de plataforma — SOATM

**Nayarit Digital / ConnectX / SOATM** · Documentación de producto · v1.0

Este directorio documenta el ecosistema como **plataforma de infraestructura
pública** — la forma en que se documenta Android, Kubernetes o AWS — en vez de
como tesis académica o mazo de pitch. No sustituye ni duplica
`docs/orbe/modulos/` (que sigue siendo la fuente única por módulo, regla "un
círculo = un módulo = un archivo"); lo que hace es añadir la capa de
arquitectura de plataforma y traducir cada módulo a un nombre de componente
SOATM, con su estado verificado en código.

## Índice

1. [`01-VISION-PRODUCTO.md`](./01-VISION-PRODUCTO.md) — qué es SOATM, qué
   problema resuelve, alcance actual vs. visión.
2. [`02-ARQUITECTURA-SISTEMA.md`](./02-ARQUITECTURA-SISTEMA.md) — los 10
   componentes de la plataforma (Kernel, Identity, Data Bus, AI Engine,
   Digital Twin, Analytics, Citizen, Developer Platform, Security,
   Governance).
3. [`03-DOCUMENTACION-FUNCIONAL.md`](./03-DOCUMENTACION-FUNCIONAL.md) — índice
   de los módulos reales, con el mapeo de nombres coloquiales al nombre y
   archivo verdadero.
4. [`04-ARQUITECTURA-DATOS.md`](./04-ARQUITECTURA-DATOS.md) — entidades,
   catálogos, identidad, eventos y auditoría, tal como existen hoy.
5. [`05-MANUAL-DESARROLLADORES.md`](./05-MANUAL-DESARROLLADORES.md) — APIs,
   autenticación, y qué falta para integrar.
6. [`06-LIBRO-BLANCO.md`](./06-LIBRO-BLANCO.md) — visión estratégica, casos de
   uso y contexto internacional.

## Regla de honestidad de estos documentos

Se reutiliza — sin inventar una escala nueva — la regla ya establecida en
`docs/marco/MARCO_CUMPLIMIENTO_LNETB.md`: cuatro etiquetas y ninguna otra,
**Operativo / Operativo en demo / Preparado / Hoja de ruta**, siempre con el
archivo que lo demuestra. Donde una pieza no encaja limpio en esas cuatro
etiquetas (una maqueta visual con datos fijos, o código construido pero no
enlazado en `src/App.tsx`), el documento lo dice explícitamente en vez de
forzar la etiqueta más favorable. Ver el cierre de "Prohibido declarar
'Cumple' a secas sin poder señalar archivo y flujo que lo demuestre" en ese
mismo documento.

## Panel de revisión de esta entrega — "Parlamento de las Sillas"

A petición del equipo, esta serie de 6 documentos pasó por un panel de
revisión de 5 sillas (independiente del `Gabinete de 15 Especialistas` de
`docs/agentes/GABINETE_ESPECIALISTAS.md`, que gobierna el repositorio en
general, no esta entrega puntual):

| Silla | Qué revisó | Qué exige |
|---|---|---|
| Arquitecto de Plataforma | `02` y `04` | Mismo nombre de componente, mismos límites de responsabilidad, sin contradicciones entre ambos documentos |
| Ingeniero de Seguridad | `04` y `05` | Ningún acceso descrito que `firestore.rules`/`storage.rules` no permitan realmente |
| Redactor Técnico / Politólogo | `01` y `06` | Ninguna frase sin evidencia verificable en código o documento existente |
| Diseño de Marca | los 6 documentos | Un componente SOATM = un nombre, siempre; nunca dos nombres para lo mismo |
| Desarrollador externo (onboarding) | `05` | Léelo como quien nunca vio el repo: señala qué falta para integrar un módulo nuevo |

Es una pasada editorial sobre esta entrega, no un mecanismo de código ni un
proceso permanente del repositorio.
