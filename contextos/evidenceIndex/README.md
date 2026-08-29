# Evidence Index v0.1

Índice determinístico de fuentes para Context.OS y CodeLens.

## Límite de autoridad

- Recibe contenido ya obtenido por un adaptador autorizado.
- No lee disco, no abre red, no usa credenciales y no persiste.
- Devuelve metadatos y checksum; no retiene ni devuelve el contenido crudo.
- `CHECKSUM_ONLY` detecta cambios frente a una entrada conocida; no equivale a firma, sello de tiempo ni prueba frente a un atacante con escritura.
- `buildEvidenceIndex(...).index` es compatible con `evaluateCandidate(candidate, index)`.

## Ingesta permitida v0.1

`loadAllowlistedRepositoryEvidence(root, commit)` es el único lector local de
esta versión. Su lista vive en `allowlist.ts`, tiene tres documentos concretos y
no recibe rutas, patrones, URLs ni credenciales desde el modelo. Resuelve la
ruta real y rechaza enlaces simbólicos que salgan del checkout. El contenido
sólo pasa a `buildEvidenceIndex`; no se devuelve desde ese constructor ni se
persiste aquí.

El `commit` debe aportarlo el custodio como versión inmutable. Context.OS aún
debe autorizar la ejecución y persistir los metadatos. Fuentes externas y
lectura arbitraria continúan fuera de alcance.
