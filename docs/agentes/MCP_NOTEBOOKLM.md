# MCP · NotebookLM

**Estatus:** instalado a nivel proyecto · herramienta de desarrollo, **no** parte
del producto desplegado.
**Fecha de alta:** 27 de agosto de 2026.
**Fuente:** https://github.com/PleasePrompto/notebooklm-mcp (MIT), paquete npm
`notebooklm-mcp`, versión fijada **2.0.0**.

---

## 1. Qué es y para qué lo queremos

Servidor MCP que expone Google NotebookLM a los asistentes de IA que trabajan
en este repositorio (Claude Code, Cursor, Codex). No usa una API oficial:
automatiza un Chrome real con Patchright contra la interfaz web de NotebookLM.

El uso previsto aquí es documental, no operativo: cargar en un notebook la
LNETB, la Ley de Gobierno Digital de Nayarit, los reglamentos municipales de
Tepic y las actas del proyecto, y luego preguntar contra ese corpus con
respuestas citadas a la fuente. Es decir, apoyo para
`docs/marco/BIBLIOTECA_LEGAL.md` y para el expediente regulatorio.

**No autoriza nada.** Lo que devuelva NotebookLM es material de trabajo. Una
cita legal solo pasa a `BIBLIOTECA_LEGAL.md` cuando alguien la verifica contra
el texto oficial publicado y la marca como VERIFICADO. Ver la regla de citación
en `docs/marco/GLOSARIO_OFICIAL.md`.

## 2. Configuración

Vive en `.mcp.json` en la raíz del repositorio (alcance de proyecto: se comparte
con quien clone el repo, y Claude Code pide aprobación la primera vez):

```json
{
  "mcpServers": {
    "notebooklm": {
      "command": "npx",
      "args": ["-y", "notebooklm-mcp@2.0.0"],
      "env": { "NOTEBOOKLM_AI_MARKER": "true" }
    }
  }
}
```

- **Versión fijada a `2.0.0`** a propósito, no `@latest`: el servidor depende de
  la maquetación de un sitio web de terceros y una versión nueva puede cambiar
  comportamiento sin aviso. Para actualizar: cambiar el número aquí, en un
  commit, con prueba de que sigue funcionando.
- **`NOTEBOOKLM_AI_MARKER=true`** deja el prefijo de "contenido generado por IA"
  en las respuestas. Es el default del paquete y aquí además es obligatorio:
  corresponde a la etiqueta 🟡 del semáforo de honestidad de datos
  (`CLAUDE.md` §3).

Otras variables útiles (`HEADLESS`, `ANSWER_TIMEOUT_MS`, `NOTEBOOKLM_PROFILE`,
`NOTEBOOKLM_ACCOUNT`) están documentadas en el README del proyecto original.

## 3. Primer uso: autenticación con Google

El servidor arranca sin credenciales, pero cualquier herramienta que toque
NotebookLM necesita una sesión de Google iniciada:

1. Pedirle al asistente que ejecute la herramienta `setup_auth`.
2. Se abre un Chrome **visible**; hay que completar el login a mano (hasta 10
   minutos de margen).
3. Las cookies quedan en el perfil local de Chrome del servidor:
   - Linux: `~/.local/share/notebooklm-mcp/chrome_profile/`
   - macOS: `~/Library/Application Support/notebooklm-mcp/chrome_profile/`
   - Windows: `%APPDATA%\notebooklm-mcp\chrome_profile\`
4. Para cambiar de cuenta: `re_auth` (borra las cookies anteriores).
   Para borrar todo lo que dejó en disco: `cleanup_data`.

**Esto solo se puede hacer en una máquina con escritorio.** En un servidor Linux
headless el login inicial requiere `xvfb-run`; en las sesiones remotas de Claude
Code (contenedor efímero, sin navegador interactivo) el servidor arranca pero
`setup_auth` no se puede completar. Ahí el MCP queda declarado y sin sesión.

## 4. Advertencias

- **No hay almacén cifrado de credenciales.** El aislamiento es por directorio
  de perfil. La cuenta de Google que se use queda con sesión abierta en ese
  perfil, en claro, en el disco de quien lo instaló. Usar una cuenta de trabajo
  del proyecto, nunca una cuenta personal con más alcance del necesario.
- **Ningún dato personal real sube a NotebookLM** — aplica la regla 9 de
  `CLAUDE.md` igual que en el repositorio. Documentos normativos, sí; padrones,
  expedientes ciudadanos o cualquier PII, no.
- **Depende de una interfaz web ajena.** Si Google cambia NotebookLM, esto se
  rompe. No construir nada del producto encima.
- **No toca el build.** No entra en `dist/`, no lo revisa la Guardia
  (`scripts/verificar-regresiones.mjs`) y no altera Lighthouse. Es
  herramienta de escritorio del equipo.

## 5. Herramientas que expone (perfil `full`, 20)

| Grupo | Herramientas |
|---|---|
| Consulta | `ask_question` |
| Fuentes y audio | `add_source`, `generate_audio`, `get_audio_status`, `download_audio` |
| Biblioteca local | `add_notebook`, `list_notebooks`, `get_notebook`, `select_notebook`, `update_notebook`, `remove_notebook`, `search_notebooks`, `get_library_stats` |
| Sesiones | `list_sessions`, `close_session`, `reset_session` |
| Sistema | `get_health`, `setup_auth`, `re_auth`, `cleanup_data` |

Con `NOTEBOOKLM_PROFILE=minimal` o `=standard` se reduce la superficie a
consulta y biblioteca.

---

El otro servidor MCP registrado en `.mcp.json` es `soatm-docs`, propio de este
repositorio y de solo lectura sobre `docs/` — ver `docs/agentes/MCP_SOATM_DOCS.md`.
