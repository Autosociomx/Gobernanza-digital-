# MCP · soatm-docs

**Estatus:** operativo · servidor propio, dentro de este repositorio.
**Código:** `mcp/soatm-docs.ts` (~620 líneas, TypeScript, sin estado).
**Alcance:** **solo lectura** sobre `docs/`.

---

## 1. Qué es

Servidor MCP que expone el marco documental del SOATM a los asistentes de IA
que trabajan en este repositorio. La motivación es concreta: el marco normativo
y documental **es parte del producto, no ornamento** (`CLAUDE.md` §1), pero un
agente que llega en frío no sabe que existen dos registros de módulos con
vocabularios distintos, ni que una cita legal solo se afirma en público si está
en estatus VERIFICADO. Este servidor pone esas reglas del lado de la
herramienta, no de la buena memoria de quien pregunta.

Sobre el nombre: el snippet original decía `soatm-api`. Se llama `soatm-docs`
porque no expone la API — no toca `server.ts`, ni la tabla `departments` de
SQLite, ni Stripe, ni Gemini. Nombrar una cosa por lo que hace es la misma
regla del semáforo aplicada a la configuración.

## 2. Qué NO hace (por diseño)

- **No escribe ni borra nada.** No hay una sola herramienta de escritura.
- **No sale a la red.** Cero llamadas HTTP, cero llaves de API.
- **No lee fuera de `docs/`.** Toda ruta pasa por `resolverRutaDocs()`, que
  resuelve contra la raíz del repo y rechaza cualquier cosa que no caiga dentro
  de `docs/`. `leer_doc` con `../server.ts` devuelve error, no el archivo.
- **No autoriza ningún acto administrativo.** Es un lector de documentos.
- **No entra al build.** `vite build` no lo toca y `dist/server.cjs` tampoco.
  Es herramienta de desarrollo.

## 3. Configuración

Registrado en `.mcp.json` en la raíz (alcance de proyecto):

```json
"soatm-docs": {
  "command": "npx",
  "args": ["tsx", "mcp/soatm-docs.ts"]
}
```

Requiere haber corrido `npm ci` (usa `tsx`, `@modelcontextprotocol/sdk` y `zod`,
los tres como `devDependencies`). Transporte stdio.

> **No lo arranques con `npm run`.** npm escribe el banner del script en
> stdout, que es justo el canal del protocolo MCP, y la sesión se rompe. Para
> una prueba manual: `npx tsx mcp/soatm-docs.ts`.

Las rutas se resuelven desde la ubicación del propio archivo, no desde el
directorio de trabajo, así que funciona sin importar desde dónde se lance.

## 4. Herramientas

| Herramienta | Qué devuelve |
|---|---|
| `listar_modulos` | Los módulos de uno o ambos registros, con filtro por superficie y estado |
| `ficha_modulo` | Ficha completa de un módulo + su entrada de índice (archivo y líneas del código) |
| `contrastar_registros` | Cruce de los dos registros y **contradicciones de estado** |
| `citas_legales` | `BIBLIOTECA_LEGAL.md` como filas estructuradas, filtrable por estatus |
| `buscar_docs` | Búsqueda de texto en `docs/`, insensible a acentos; devuelve `ruta:línea` |
| `leer_doc` | Un documento completo o un rango de líneas |
| `glosario` | El Glosario Oficial completo |

Todas están anotadas `readOnlyHint: true` y `openWorldHint: false`.

### Los dos registros, sin elegir uno en silencio

`CLAUDE.md` §5 obliga a señalar las contradicciones entre
`docs/marco/modulos/INDICE.json` (29 módulos reales del código, eje
completitud) y `docs/orbe/modulos.json` (9 módulos conceptuales, eje madurez)
en vez de resolverlas por cuenta propia. `contrastar_registros` lo hace
mecánicamente:

- **El vínculo entre registros no se adivina por parecido de nombre.** Se toma
  de la referencia textual que cada ficha de código hace al archivo de la ficha
  del Orbe. Si la ficha no lo declara, no hay vínculo.
- Marca contradicción cuando el Orbe declara `piloto` o más sobre código en
  `maqueta` o `riesgo` (el discurso adelanta al código), y cuando el código
  está en `real` mientras el Orbe sigue en `propuesta` o `disenado` (el
  registro conceptual va atrasado).
- Lista aparte los módulos del Orbe que ninguna ficha de código referencia, con
  la advertencia de que eso no prueba ausencia de código: prueba que la ficha
  no lo dice.

Hoy detecta una: el código de `salud` está en `real` mientras el Orbe declara
`tepictu-salud` como `disenado` — la misma discrepancia que
`docs/marco/modulos/salud.md` ya señala en prosa.

### Estatus legal: la categoría intermedia

`citas_legales` no suaviza el texto de la biblioteca. Una fila que dice
`VERIFICADO (general; arts. específicos POR VERIFICAR)` **no** se reporta como
VERIFICADO: se clasifica como **VERIFICADO CON RESERVAS**, y la salida siempre
incluye el texto original del estatus junto a la clasificación. Las categorías
son `VERIFICADO`, `VERIFICADO CON RESERVAS`, `POR VERIFICAR`, `PENDIENTE` y
`SIN ESTATUS`. Cada respuesta repite la regla de citación del Glosario §9.

Esto sigue siendo un lector: que una cita salga como VERIFICADO significa que
**la biblioteca** la tiene verificada, no que el servidor haya comprobado nada
contra el DOF. La verificación es humana y contra fuente primaria.

## 5. Material interno

`buscar_docs` y `leer_doc` alcanzan `docs/interno/`, que está en el repositorio
pero fuera del build público. Los resultados de ahí salen marcados
`[INTERNO — no se difunde]`. La marca es un recordatorio, no un control de
acceso: quien tiene el repo tiene los archivos.

## 6. Dependencias añadidas

`@modelcontextprotocol/sdk` y `zod`, ambas como `devDependencies`. No entran al
bundle del navegador ni al servidor de producción.
