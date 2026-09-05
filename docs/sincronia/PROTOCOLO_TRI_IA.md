# Protocolo de Sincronía Tri-IA

**Nayarit Digital · ConnectX · SOATM** · v1.0 · 5 de septiembre de 2026
**Ámbito:** cómo trabajan juntas Claude Code, ChatGPT y el Gemini de Google AI Studio
sobre este proyecto sin pisarse, sin duplicarse y sin perder el hilo entre sesiones.

---

## 1. El problema que resuelve

El proyecto se desarrolla hoy en tres inteligencias a la vez. Cada una acumuló
trabajo real y ninguna puede leer la memoria de las otras:

| Dónde | Qué se acumuló ahí | Qué ve del repositorio |
|---|---|---|
| **Claude Code** | Ingeniería del repo, la Guardia, `docs/marco/`, Context.OS Runtime, fichas de módulo | Todo el repositorio, en vivo |
| **ChatGPT** | Estrategia, narrativa, análisis normativo, borradores largos | Nada, salvo lo que se pegue o suba en el chat |
| **Google AI Studio (Gemini)** | 80+ proyectos "Build", prototipos de UI, iteración visual rápida | Solo los archivos del proyecto Build abierto |

De ahí salen las tres fallas que ya ocurrieron y están documentadas:

1. **Trabajo duplicado** — la misma pieza se piensa dos veces, con dos criterios.
2. **Contradicción de estado** — una IA afirma como hecho lo que en otra es propuesta.
3. **Regresión por desfase** — un push desde AI Studio sobre una copia vieja
   reintrodujo la llave de Gemini en el bundle público. Cuatro veces
   (`docs/marco/PROTOCOLO_SEGURIDAD.md`).

El objetivo **no** es fundir las tres en una. Es que las tres marchen sobre el
mismo estado de hechos, cada una en lo que hace mejor, con un punto único donde
se integra lo que producen.

## 2. El principio

> **El repositorio es el único plano de contexto compartido.
> Lo que no está aquí, no existe para las demás inteligencias.**

No hay memoria compartida entre proveedores y no la va a haber: no existe un
canal técnico que conecte la memoria de ChatGPT con la de Claude o con la de
Gemini. Lo que sí existe es un repositorio git que las tres pueden leer —
Claude directamente, las otras dos por documento generado. Así que la sincronía
no se hace con integraciones: se hace con **artefactos versionados**.

Corolario operativo: una decisión que solo vive en un chat **no es una decisión
del proyecto**. Se vuelve real cuando queda en el repositorio.

## 3. Los tres carriles

Cada inteligencia tiene jurisdicción declarada. No es jerarquía, es división del
trabajo con una sola puerta de entrada al código.

### Carril A · Ingeniería y gobernanza — **Claude Code**

- **Jurisdicción:** el repositorio completo, ramas y PRs, la Guardia de
  regresiones, `docs/marco/`, `contextos/` y `shared/semantic/`, fichas de módulo.
- **Es el único carril que escribe en `main`**, siempre vía rama + PR.
- **Deber:** integrar lo que llega de los otros dos carriles, verificarlo contra
  las reglas duras y dejar constancia en la bitácora.

### Carril B · Estrategia, redacción y análisis — **ChatGPT**

- **Jurisdicción:** narrativa institucional, expediente regulatorio, análisis
  normativo, borradores largos, guiones de presentación, investigación.
- **No toca código directamente.** Entrega documentos al Buzón.
- **Por qué:** es donde ya está el volumen de trabajo estratégico, y es trabajo
  que no requiere ver el árbol de archivos para ser útil.

### Carril C · Prototipado y UI — **Gemini / Google AI Studio**

- **Jurisdicción:** los proyectos "Build", exploración visual, prototipos de
  pantalla, pruebas rápidas de una idea antes de invertir ingeniería.
- **Restricción dura:** **ningún push directo de AI Studio a `main`.** Lo que
  salga de AI Studio entra como entrega al Buzón y lo integra el Carril A.
  Esta regla no es burocracia: es la causa raíz documentada de las cuatro fugas
  de llave y de varios borrados de `netlify.toml` y `robots.txt`.
- Las skills `aistudio-code-lab` y `aistudio-design-lab` operan este carril
  desde Claude Code cuando hay un Chrome autenticado con la cuenta del director.

### Lo que ningún carril puede hacer

- Afirmar en público una cita legal que no esté VERIFICADA en `docs/marco/BIBLIOTECA_LEGAL.md`.
- Publicar una cifra simulada sin etiqueta (SIMULADO / PROYECCIÓN / META / DEMO).
- Meter una llave de API en código de navegador.
- Dar por hecho algo que solo existe en su propio hilo de conversación.

## 4. Los artefactos de sincronía

Cuatro piezas, todas en `docs/sincronia/`:

| Artefacto | Qué es | Quién lo produce |
|---|---|---|
| `CONTEXTO_PORTATIL.md` | Briefing completo del proyecto y su estado. Se **sube como archivo** al Proyecto de ChatGPT y se pega en el AI Studio que corresponda. | Generado por `scripts/generar-contexto.mjs` |
| `CONTEXTO_BREVE.md` | El mismo contexto condensado (~3 mil caracteres) para campos de instrucciones con límite. | Generado por el mismo script |
| `contexto.json` | Manifiesto legible por máquina: `contexto_id`, commit, estado de la Guardia, conteos de módulos y citas. | Generado por el mismo script |
| `BUZON/` | Entradas de los carriles B y C, con plantilla obligatoria. | ChatGPT / AI Studio, vía el director |
| `BITACORA_SINCRONIA.md` | Qué se integró, de dónde vino, con qué `CONTEXTO_ID`. | Carril A |

Los tres primeros **no se editan a mano**. Se edita su fuente y se regeneran:

```bash
npm run contexto             # regenera el paquete
npm run contexto:verificar   # falla si lo que está en disco quedó desfasado
```

## 5. El `CONTEXTO_ID` — el mecanismo que hace que marchen al mismo paso

Cada generación produce un identificador con esta forma:

```
CTX-20260905-d5a78aa-66059164
     │        │        └─ hash SHA-256 (8) del contenido de las fuentes de contexto
     │        └────────── commit corto del repositorio
     └─────────────────── fecha de generación
```

Reglas, y son las que sostienen todo el protocolo:

1. **Toda entrega de ChatGPT o AI Studio cita el `CONTEXTO_ID` sobre el que trabajó.**
   Sin ese dato la entrega no se integra: no hay forma de saber sobre qué estado
   del proyecto razonó.
2. Si el `CONTEXTO_ID` de la entrega **no coincide** con el vigente, la entrega
   está *desfasada*: el Carril A la reevalúa contra el estado actual antes de
   integrarla, y lo hace constar en la bitácora.
3. El `CONTEXTO_ID` cambia cuando cambia cualquiera de las fuentes declaradas en
   el script (`CLAUDE.md`, glosario, nota de contexto, protocolo de seguridad,
   gobernanza, biblioteca legal, los dos registros de módulos, este protocolo).
   Un cambio cosmético en otra parte del repositorio no invalida el contexto.

Es el mismo principio que ya usa el proyecto para la evidencia del Context.OS
Runtime: un checksum que prueba sobre qué se trabajó. **No es firma digital ni
prueba de inmutabilidad** — es trazabilidad de contexto, nada más.

## 6. El ciclo de sincronía

Se corre al cerrar un bloque de trabajo, al abrir uno nuevo, o cuando cambie
cualquiera de las fuentes de contexto:

```
1. REGENERAR    npm run contexto                    (Carril A)
2. DISTRIBUIR   subir CONTEXTO_PORTATIL.md al Proyecto de ChatGPT
                pegar CONTEXTO_BREVE.md en el AI Studio que se vaya a usar
3. TRABAJAR     cada carril en su jurisdicción, citando el CONTEXTO_ID
4. ENTREGAR     los carriles B y C dejan su paquete en docs/sincronia/BUZON/
                con la plantilla
5. INTEGRAR     el Carril A verifica, integra vía rama + PR, corre la Guardia,
                y anota en BITACORA_SINCRONIA.md
```

Paso 5 sin excepciones: Guardia + `npm run lint` + `npx vite build` en verde
antes de dar por integrada cualquier entrega.

## 7. Alta de cada carril (una sola vez)

**ChatGPT.** Crear un Proyecto llamado *Nayarit Digital · SOATM*. En sus
instrucciones, pegar `CONTEXTO_BREVE.md`. En sus archivos, subir
`CONTEXTO_PORTATIL.md` (y, si se quiere profundidad normativa,
`docs/marco/BIBLIOTECA_LEGAL.md` y `docs/marco/GLOSARIO_OFICIAL.md`).
Todo el trabajo estratégico ocurre dentro de ese Proyecto, no en chats sueltos.

**Google AI Studio.** En cada proyecto Build que forme parte del ecosistema,
agregar `CONTEXTO_BREVE.md` como archivo del proyecto y referirlo en la primera
instrucción al Gemini integrado. Antes de exportar cualquier cambio hacia este
repositorio, la salida pasa por el Buzón.

**Claude Code.** Ya está: lee `CLAUDE.md` y el repositorio completo. Su tarea
adicional es mantener el ciclo vivo — regenerar, integrar y bitacorear.

## 8. Qué NO hace este protocolo

Se declara explícitamente para que nadie lo lea de más:

- **No conecta las memorias.** Ninguna de las tres IAs ve el historial de las
  otras. Lo único compartido es lo que el ciclo escribe en el repositorio.
- **No sincroniza en tiempo real.** La sincronía es por evento (paso 1 del ciclo),
  no continua.
- **No importa automáticamente el historial de ChatGPT.** Eso requiere una
  exportación manual del director; el procedimiento está en `AUDITORIA_CHATGPT.md`.
- **No autoriza actos administrativos**, igual que el resto del laboratorio.
- **No sustituye al Parlamento ni al Gabinete** (`docs/agentes/`). Aquellos
  deciden y dictaminan; esto solo garantiza que las tres inteligencias decidan
  sobre los mismos hechos.

## 9. Relación con lo que ya existe

- **COP 1.0** (`docs/orbe/cop.html`) sigue vigente y no se toca: es el bloque de
  **intención por módulo** que se genera antes de un cambio concreto. El Contexto
  Portátil es el bloque de **estado global** del proyecto. Se usan juntos: primero
  el contexto, luego el COP del módulo que se va a tocar.
- **Parlamento de las Sillas** (`Parlamento.MD`, `docs/PARLAMENTO_PROMPT.md`) —
  cámara de decisión multiproveedor. Este protocolo le da a cada silla el mismo
  expediente.
- **Gabinete de Especialistas** (`docs/agentes/GABINETE_ESPECIALISTAS.md`) —
  cámara de trabajo por dominio.
- **Actas** (`docs/actas/`) — el registro institucional. La bitácora de sincronía
  no las sustituye: alimenta la siguiente acta.

---

*Este protocolo es un documento vivo del carril de gobernanza. Se corrige con
versiones posteriores, nunca borrando la anterior.*
