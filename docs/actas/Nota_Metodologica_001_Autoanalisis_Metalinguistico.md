# Nota Metodológica 001 — Auto-análisis metalingüístico de la sesión SOATM

**Tipo de documento:** nota de método (no es Acta — no requiere votación; es insumo para el debate del Parlamento de las Sillas y del Gabinete de Especialistas).
**Fecha:** 2026-08-01
**Autor:** sesión de trabajo Claude Code sobre `Gobernanza-digital-`
**Objeto:** no analiza la arquitectura SOATM en sí, sino **el método con el que se está construyendo y verificando** — el vocabulario que se usa, la disciplina de revisión, los patrones que se repiten — para que ese método se pueda enseñar, repetir y mejorar.

---

## 1. Metalingüística: cómo el lenguaje mismo construye (o debilita) gobernanza

En este proyecto el lenguaje no es decorativo: es el mecanismo de confianza. Tres observaciones concretas:

**a) Dos ejes de vocabulario que coexisten a propósito, y eso es correcto.**
`docs/plataforma/` usa las etiquetas de cumplimiento LNETB (`Operativo` / `Operativo en demo` / `Preparado` / `Hoja de ruta`) — responden "¿esto cumple la ley?". El registro `docs/marco/modulos/INDICE.json` usa otro eje (`real` / `parcial` / `maqueta` / `riesgo`) — responde "¿esto existe en el código?". Son preguntas distintas sobre los mismos módulos. El riesgo metalingüístico no es tener dos vocabularios, es que alguien los confunda como si fueran el mismo. Por eso ambos documentos deben seguir declarando explícitamente `$schema_nota` / la nota equivalente que diga "esto no es lo mismo que aquello".

**b) Un mismo nombre institucional usado en dos sentidos distintos es un riesgo real.**
"Parlamento de las Sillas" designa formalmente la cámara de 3 asientos (GROQ/Gemini/Claude) que **vota** decisiones (`docs/agentes/GABINETE_ESPECIALISTAS.md`). Pero `docs/plataforma/README.md` reutilizó la misma frase para una revisión editorial de 5 asientos, ad hoc, sin voto vinculante. Si el nombre de un órgano de decisión se presta para actos que no tienen esa autoridad, el nombre deja de servir como señal de "esto sí se votó formalmente". Recomendación: reservar "Parlamento de las Sillas" estrictamente para la cámara de 3, y nombrar distinto cualquier revisión ad hoc (p. ej. "mesa de revisión editorial").

**c) El lenguaje de la interfaz es, literalmente, el mecanismo de honestidad.**
El hallazgo más importante de la revisión de PR #37 no fue de código, fue de lenguaje: se cambió el nombre de la firmante (`C. GERALDINE PONCE MÉNDEZ` → `LA PRESIDENCIA MUNICIPAL DE TEPIC`), pero las frases que declaran validez jurídica y técnica real («Verificación por Blockchain Municipal: Bloque Validado SHA-256», «homologada con RENAPO», «validez jurídica federal ante SEP, Bancos, Fiscalía») siguen intactas describiendo un sistema simulado como si fuera real. El problema no está en la lógica del componente — está en que el texto que ve el ciudadano afirma algo que el código no hace. Esto confirma el patrón que ya rige otras partes del proyecto (banners "⚠ Vista demostrativa — datos simulados"): **la honestidad de una vista se decide en el texto, no en el motor.**

---

## 2. Aprendizaje: lo que funcionó bien en esta sesión (lo bueno)

1. **Verificar antes de afirmar.** Dos fichas del registro (`home.md`, `services.md`, `obras.md`) contenían afirmaciones falsas heredadas de trabajo hecho en otra rama. Se detectaron y corrigieron no por relectura, sino por `grep`/`git show origin/main:<archivo>` directo contra el código real — y se documentó la corrección en vez de sobrescribirla en silencio (mismo patrón que la "lección metodológica" ya existente en el proyecto).
2. **No aceptar la descripción de un PR al pie de la letra.** La descripción de PR #37 decía "corrección institucional". Era cierta a medias: corrigió la exposición del nombre real, pero no tocó las funciones (`handleGenerate`, `handleVerifyOnScreen`, `startStressTest`) que simulan validez legal. Solo se detectó leyendo el cuerpo de las funciones, no el resumen del commit.
3. **Higiene de git bajo edición concurrente.** Con otra sesión trabajando en paralelo sobre el mismo repositorio (ramas que cambiaban de estado entre dos `fetch` consecutivos), la regla que evitó pérdida de trabajo fue simple: siempre `fetch` antes de confiar en el estado local; reconciliar con `cherry-pick`/`reset --hard` solo contra una referencia recién traída, nunca contra memoria de un estado anterior.
4. **Construir la herramienta real en vez de una simulación de la herramienta.** Cuando se pidió explícitamente "hazlo nativo, no una skill de chat", se construyó un Artifact HTML interactivo real (COP Mirror) — y se fue honesto sobre el único límite técnico real (una página estática no puede disparar una sesión de Claude Code) en vez de simular esa función.

---

## 3. Cómo estructurarlo y mejorarlo de aquí en adelante

| Área | Estado actual | Mejora propuesta |
|---|---|---|
| Verificación de fichas de módulo | manual, ad hoc | script `scripts/verificar-modulos.mjs` (ya en backlog de Acta 004) que compare `archivo`/`lineas` de cada ficha contra el código real y falle en CI si diverge |
| Auto-análisis metodológico | esta nota, primera de su tipo | fijar una plantilla reutilizable de 3 secciones (Metalingüística / Aprendizaje / Estructura y mejora) en `docs/actas/notas-metodologicas/`, para no reinventar el formato cada vez |
| Nombre "Parlamento de las Sillas" | usado en 2 sentidos | actualizar `docs/plataforma/README.md` para renombrar su revisión editorial de 5 asientos y dejar el nombre exclusivo a la cámara de 3 |
| Hallazgo de validez legal simulada en `MunicipalLettersView.tsx` | nombre corregido, mecánica de fondo intacta | pendiente de acta/voto: ¿se agrega un banner honesto ("simulación — sin validez jurídica real"), se conecta a un backend real, o se retira del alcance público mientras tanto? |

---

## Próximo paso

Esta nota es insumo, no decisión. Corresponde llevarla al debate ya solicitado con el Parlamento de las Sillas / Gabinete de Especialistas junto con el hallazgo de PR #37, y resolver en la misma sesión los puntos 2–4 pendientes de Acta 004.
