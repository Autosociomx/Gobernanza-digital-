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

## Pendiente sin resolver — módulo Gabinete (C5Dashboard.tsx)

`GabineteView` en `src/components/C5Dashboard.tsx` (línea ~1271, módulo
`activeModule === 'gabinete'`) muestra nombres reales (Geraldine Ponce,
Alejandro Galván, Blanca Simancas, Carlos Robles) con KPIs inventados
(84% aprobación, etc.) y fotos de stock de Unsplash presentadas como
fotografías oficiales. El asistente de IA también saluda por nombre real.

`src/components/TesisCienciaPolitica.tsx` (no importado en ningún lado,
código muerto pero presente en el repo) presenta a Geraldine Ponce como
candidata a gobernadora 2027 con datos personales.

**Decisión pendiente del propietario del proyecto**: si los nombres son
autorizados por las personas reales, o si deben genericizarse antes de
cualquier demo externa o publicación del repositorio. Ver conversación
del 2026-07-13. **Bloquea la publicación del repositorio como código
abierto** hasta que se resuelva (ver PROTOCOLO_SEGURIDAD.md §7).
