# Acta 004 — Parlamento de las Sillas · Sesión sobre el COP Mirror y el Registro de Módulos

**Tema:** Revisión del registro `docs/marco/modulos/` y la herramienta "COP Mirror" (espejo de edición de tepic.netlify.app), construidos en esta sesión de trabajo. Propuestas para que dejen de leerse como maqueta de demostración y pasen a ser instrumento real de atención municipal SOATM.
**Fecha:** 2026-07-24 · **Marco:** `docs/agentes/GABINETE_ESPECIALISTAS.md` (cámara de decisión, 3 sillas) · **Rama:** `claude/modulos-registro-espejo`
**Formato:** intervención + voto en paralelo + síntesis (comisión de 3, no plenaria de 15 — no convoca al Gabinete completo porque el tema es una entrega puntual, no una revisión integral del proyecto).

---

### 🎙️ INTERVENCIONES

**[Silla GROQ · Ingeniería pragmática]**
[HALLAZGO] El registro (`INDICE.json` + 29 fichas) se mantiene a mano. En cuanto alguien mueva una función de línea en `C5Dashboard.tsx` o `CitizenApp.tsx` — que ya pasó una vez esta sesión al re-verificar contra `main` fresco — el archivo:línea de una ficha queda desactualizado sin que nada lo detecte. Un registro que miente en silencio es peor que no tener registro.
[RECOMENDACIÓN] Un script de CI (`scripts/verificar-modulos.mjs`, mismo patrón que el ya existente `scripts/verificar-regresiones.mjs`) que, en cada PR, confirme que la función nombrada en cada ficha (`InteroperabilidadView`, `TesoreriaView`, etc.) sigue existiendo dentro del rango de línea declarado. Si no coincide, falla el build — no una advertencia, un bloqueo.
[MÓDULO] `docs/marco/modulos/INDICE.json`, nuevo `scripts/verificar-modulos.mjs`.

**[Silla Gemini · Producto y experiencia de uso]**
[HALLAZGO] El grafo con dos anillos comunica bien la arquitectura para quien ya sabe qué es el COP Mirror. Pero un funcionario municipal que abre el enlace por primera vez ve un lienzo vacío y no sabe qué hacer con el botón "Generar paquete de contexto" — no hay ejemplo de uso ni instrucción de a dónde pegarlo. Es la misma brecha que llevó a rediseñar el saludo de Aura en el C5: una herramienta correcta por dentro, muda por fuera.
[RECOMENDACIÓN] Al abrir el Mirror, pre-seleccionar un módulo de ejemplo (idealmente `salud`, el único con estado "real" en el panel C5) con una nota visible: "así se ve un módulo ya resuelto" — y una línea de instrucción fija: "copia este texto y pégalo en tu conversación con el asistente de desarrollo del proyecto."
[MÓDULO] Artifact `cop-mirror.html` (onboarding de primer uso).

**[Silla Claude · Rigor, verificación y seguridad]**
[HALLAZGO] Dos problemas distintos. Primero: el nombre "COP Mirror" y el vocabulario "Context Operating Protocol" vienen del prototipo ajeno que inspiró esta herramienta — no tienen ningún anclaje en la identidad SOATM/Nayarit Digital, y un instrumento para "atención real del municipio digitalizado" no debería cargar la jerga de un prototipo que nadie en el municipio vio. Segundo, más serio: la herramienta vive en un Artifact que por defecto es privado, pero el archivo `municipal_letters.md` que expone documenta con el nombre real de la Presidenta Municipal un hallazgo de riesgo (firma y hash simulados) — si este enlace se comparte ampliamente sin decidir esto primero, se repite el mismo tipo de exposición que ya se corrigió una vez este proyecto (repo público, jul-2026).
[RECOMENDACIÓN] (1) Renombrar la herramienta a un nombre en español anclado a la identidad del proyecto — propuesta: **"Sala de Máquinas SOATM"** — y quitar toda referencia a "COP"/"Context Operating Protocol" del texto visible. (2) No ampliar la distribución del enlace del Artifact más allá del equipo técnico hasta decidir, con el autor, si el hallazgo de `municipal_letters` se redacta (sin nombre propio) en la vista pública o si este panel completo se integra a la app real detrás de autenticación de funcionario — la misma discusión que ya está pendiente para el propio módulo de Cartas Municipales.
[MÓDULO] Artifact `cop-mirror.html` (nombre y copy), `docs/marco/modulos/municipal_letters.md`.

---

### 🗳️ VOTACIÓN

| Silla | Voto sobre la arquitectura (grafo + registro + generador de contexto) | Condición |
|---|---|---|
| GROQ | A favor | Verificación automática en CI antes de confiar en el registro para trabajo real |
| Gemini | A favor, con reserva | Onboarding de primer uso pendiente de iterar |
| Claude | A favor de la arquitectura; en contra de ampliar su distribución tal cual | Resolver nombre y exposición del hallazgo de `municipal_letters` primero |

**Resultado: 3/3 a favor de la arquitectura de fondo.** Ninguna silla pide rehacerla — las tres piden condiciones antes de que deje de ser "lo que construimos en la sesión" y pase a ser "lo que usa el municipio".

---

### 📋 BACKLOG RESULTANTE (priorizado, solo lo dicho por las sillas)

| # | Acción | Origen | Esfuerzo |
|---|---|---|---|
| 1 | Redactar (quitar nombre propio) o decidir el destino del hallazgo de `municipal_letters` antes de compartir el enlace más ampliamente | Claude | Minutos (redactar) a horas (si se integra a la app real) |
| 2 | Renombrar la herramienta y quitar vocabulario "COP"/protocolo del texto visible | Claude | Minutos |
| 3 | Script de verificación automática de `docs/marco/modulos/` en CI | GROQ | ~1 día |
| 4 | Módulo de ejemplo pre-seleccionado + instrucción de uso al abrir la herramienta | Gemini | 1–2 horas |

---

### 📄 DOCUMENTO RESGUARDADO
Este acta queda firmada conceptualmente por las 3 sillas del Parlamento y archivada como:
`docs/actas/Acta_004_Parlamento_Sillas_COP_Mirror.md`

**Pendiente de voto decisivo humano (Miguel Alexis):** decidir el punto 1 del backlog (qué hacer con el hallazgo de `municipal_letters` antes de ampliar la distribución) — las tres sillas coinciden en que no es una decisión técnica, es una decisión sobre a quién se le muestra qué.
