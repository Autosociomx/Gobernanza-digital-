# Auditoría del trabajo acumulado en ChatGPT

**Carril B** del `PROTOCOLO_TRI_IA.md` · Procedimiento vigente desde el 5 de septiembre de 2026

---

## 1. Qué se puede y qué no

**No existe forma de que Claude lea los hilos de ChatGPT.** No hay API de
historial, no hay conector, y ningún proveedor expone la memoria de otro. Quien
diga lo contrario está inventando.

**Lo que sí existe** es la exportación oficial que ChatGPT entrega al titular de
la cuenta. Ese archivo sí se puede auditar, y para eso está
`scripts/auditar-export-chatgpt.mjs`.

## 2. Procedimiento (una sola vez, lo hace el director)

1. En `chatgpt.com` → **Ajustes** → **Controles de datos** → **Exportar datos**.
2. Llega un correo con un ZIP. Dentro viene `conversations.json` (todo el
   historial) junto con `chat.html` y adjuntos.
3. Colocar `conversations.json` en `docs/interno/importaciones/`.
   **Esa carpeta está ignorada por git**: la exportación contiene conversación
   personal y el repositorio prohíbe datos personales reales (regla dura 9).
4. Correr:

```bash
node scripts/auditar-export-chatgpt.mjs
```

Produce, en la misma carpeta ignorada:

- `INVENTARIO_CHATGPT.md` — cuántos hilos hay, de qué fechas, qué volumen,
  qué temas del proyecto toca cada uno y cuáles no tienen relación.
- `inventario-chatgpt.json` — el mismo inventario, legible por máquina.

Para ver el detalle de un tema:

```bash
node scripts/auditar-export-chatgpt.mjs --tema salud
node scripts/auditar-export-chatgpt.mjs --tema tesorería
```

## 3. Qué hace Claude con ese inventario

Una vez existe el inventario, la auditoría deja de ser adivinanza y se vuelve
trabajo verificable:

1. **Cotejo con el repositorio.** Por cada tema con volumen alto en ChatGPT, se
   revisa si ya existe en `docs/` o en el código. Tres resultados posibles:
   - **Ya está** → no se toca; se anota la equivalencia.
   - **Existe pero contradice** → se señala la contradicción al director. No se
     elige una versión en silencio (misma regla que rige los dos registros de
     módulos).
   - **No está** → candidato a integrarse, vía Buzón y PR.
2. **Extracción dirigida.** Para los hilos que valga la pena rescatar, el
   director los abre en ChatGPT y pide la síntesis con la plantilla del Buzón,
   citando el `CONTEXTO_ID` vigente. No se copia el hilo crudo al repositorio.
3. **Semáforo.** Todo lo que entre se clasifica: 🔴 se elimina, 🟡 se etiqueta
   como SIMULADO / PROYECCIÓN / META, 🟢 se exhibe. Las citas legales solo se
   integran si están VERIFICADAS en `docs/marco/BIBLIOTECA_LEGAL.md`.
4. **Constancia.** Lo integrado se anota en `BITACORA_SINCRONIA.md`.

## 4. Alternativa sin exportación

Si la exportación tarda o no se quiere hacer, el rescate se puede hacer hilo por
hilo, con costo de tiempo: en cada hilo relevante de ChatGPT, pedirle que
produzca su entrega con la plantilla de `BUZON/PLANTILLA_ENTREGA.md` y pegar el
resultado aquí. Sirve, pero no da inventario ni permite detectar duplicados,
que es justo el problema que se quiere resolver.

## 5. Nota sobre la memoria de Claude

Este repositorio también tiene disponible la capacidad de importar un export de
memoria de otro asistente hacia la memoria de Claude. Es distinto de esta
auditoría y **no la sustituye**: la memoria de Claude no es el repositorio, y en
este proyecto la fuente de verdad es el repositorio. Lo que deba perdurar se
escribe en `docs/`, no en la memoria de una sesión.
