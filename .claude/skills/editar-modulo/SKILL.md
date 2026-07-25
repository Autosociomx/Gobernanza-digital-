---
name: editar-modulo
description: "Usa esta skill cuando el usuario quiera editar, mejorar, revisar o aterrizar un módulo específico de Nayarit Digital / SOATM por su nombre (por ejemplo 'edita Bienestar Social', 'quiero mejorar Agrovisión', 'arregla Tesorería', 'revisa el módulo de Gabinete', 'aterricemos Observatorio'). También úsala si el usuario menciona el diagrama-espejo de tepic.netlify.app y quiere entrar a un módulo concreto de ahí. NO uses esta skill para cambios que abarcan todo el repositorio, la arquitectura general, o varios módulos a la vez — es para trabajo acotado a un único módulo."
---

# Editar un módulo — espejo de edición de tepic.netlify.app

Esta skill resuelve un problema concreto: el usuario no debería tener que re-explicar en cada
sesión qué archivo, qué líneas, qué servicios y qué falta de un módulo — eso ya está registrado.
Tu trabajo es leerlo, no volver a descubrirlo, y editar **solo** ese módulo.

## Paso 1 — Ubicar el módulo

Lee `docs/marco/modulos/INDICE.json`. Busca por `id` o por coincidencia flexible de `nombre`
contra lo que el usuario dijo (acentos, mayúsculas y alias coloquiales no deben bloquear el match —
por ejemplo "agrovision", "Agrovisión", "agro visión 3d" deben resolver al mismo `id: "agrovision"`).

Si hay ambigüedad real (dos módulos con nombres parecidos, o el usuario nombra algo que no está en
el índice), pregunta antes de adivinar — no edites el módulo equivocado.

## Paso 2 — Leer solo la ficha de ese módulo

Lee `docs/marco/modulos/<id>.md`. Ahí está todo el contexto que normalmente habría que pedir:

- **Qué es** y **Estado** (real / parcial / maqueta / riesgo — ver `estados_validos` en `INDICE.json`)
- **Conexiones** — qué otros módulos o servicios tocan esto
- **Dónde vive** — archivo y rango de línea exacto (algunos módulos son un archivo propio; otros
  son una función dentro de un archivo compartido como `C5Dashboard.tsx` o `CitizenApp.tsx`)
- **Cómo editarlo** — notas concretas ya levantadas (qué es estático, qué CTA está muerta, qué
  botón simula éxito sin hacer nada real)
- **Pendientes** — lo que falta, ya identificado

No es necesario que el usuario repita nada de esto. Si el usuario da contexto adicional (p. ej.
"quiero que el botón de exportar sí genere el CSV"), combínalo con la ficha, no lo sustituyas.

## Paso 3 — Leer solo el código de ese rango

Usa el archivo y las líneas exactas de "Dónde vive". Si el archivo es compartido por varios módulos
(`C5Dashboard.tsx` y `CitizenApp.tsx` lo son — cada uno tiene ~10+ funciones de vista adentro),
**lee con Read usando `offset`/`limit` acotado al rango de esa ficha**, no el archivo completo, y al
editar usa `Edit` con anclas de texto que caigan dentro de ese rango — nunca una reescritura amplia
que pueda arrastrar otra vista del mismo archivo.

## Paso 4 — Higiene de rama

`docs/marco/modulos/INDICE.json` está verificado contra `origin/main` — es la fuente de verdad de lo
que hoy sirve `tepic.netlify.app`. Antes de editar:

```bash
git fetch origin main
git checkout -b <nombre-de-rama-descriptivo> origin/main
```

No apiles el cambio sobre una rama de trabajo distinta (p. ej. una rama de tesis/investigación) salvo
que el usuario lo pida explícitamente — el propósito de este flujo es que el módulo editado se pueda
llevar a un PR limpio contra `main`.

## Paso 5 — Cerrar el ciclo

Si el cambio resuelve algo de la lista de "Pendientes" o cambia el "Estado" del módulo (por ejemplo,
de `maqueta` a `parcial` o `real`), actualiza esa ficha (`docs/marco/modulos/<id>.md`) y la entrada
correspondiente en `INDICE.json` en el mismo cambio — el registro solo sirve si se mantiene honesto.

## Nota sobre módulos ya cubiertos por `docs/orbe/`

Algunos módulos (Tesorería, Obras, Servicios Públicos, Bienestar, Salud/Expediente Familiar, Aura)
ya tienen además una ficha más antigua en `docs/orbe/modulos/*.md` y, en algunos casos, un alias
coloquial documentado en `docs/plataforma/03-DOCUMENTACION-FUNCIONAL.md`. La ficha de
`docs/marco/modulos/` es la que tiene el archivo:línea verificado más reciente — si hay una
contradicción de estado entre ambas, señálasela al usuario en vez de elegir una en silencio.
