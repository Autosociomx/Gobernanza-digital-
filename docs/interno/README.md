# ⚠️ Material interno — NO publicar

Los documentos de esta carpeta son **estrategia interna del proyecto**
(contexto político, modelo de negocio, planes de fase). Clasificación:
**Interno** según `docs/marco/GOBERNANZA_REPOSITORIO.md` §5.

Reglas:

1. **Nunca** deben estar en `public/` — todo lo que está en `public/` se
   sirve en el sitio web y cualquier persona puede descargarlo. Estos
   archivos estuvieron expuestos en producción hasta julio de 2026; la
   Guardia de regresiones ahora bloquea que regresen ahí.
2. **Antes de publicar el repositorio como código abierto**, esta carpeta
   completa debe eliminarse — y como el historial de git conserva todo,
   la publicación debe hacerse como *snapshot limpio en un repositorio
   nuevo*, no abriendo este repositorio (ver
   `docs/marco/PROTOCOLO_SEGURIDAD.md` §7).
3. La prueba para decidir si algo va aquí: *¿lo puede leer un periodista
   sin dañar al proyecto?* Si la respuesta es no, es interno.
