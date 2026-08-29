# Evidence Index v0.1

Índice determinístico de fuentes para Context.OS y CodeLens.

## Límite de autoridad

- Recibe contenido ya obtenido por un adaptador autorizado.
- No lee disco, no abre red, no usa credenciales y no persiste.
- Devuelve metadatos y checksum; no retiene ni devuelve el contenido crudo.
- `CHECKSUM_ONLY` detecta cambios frente a una entrada conocida; no equivale a firma, sello de tiempo ni prueba frente a un atacante con escritura.
- `buildEvidenceIndex(...).index` es compatible con `evaluateCandidate(candidate, index)`.

## Próximo incremento

Un adaptador de ingestión explícito y revisable podrá leer una lista permitida de documentos del repositorio, aportar su contenido a este módulo y persistir los registros mediante Context.OS. No debe añadirse lectura arbitraria de rutas ni descarga de fuentes externas.
