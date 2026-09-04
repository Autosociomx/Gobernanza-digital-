# Auditoría ORBE — Corrección P0/P0.5 + Context.OS/ID.mx

> **SNAPSHOT HISTÓRICO — 14 de agosto de 2026.** Los documentos de este directorio fechados `2026-08-14` describen el estado observado en esa fecha y **no deben citarse como fotografía vigente**. El canon posterior queda congelado en `docs/orbe/canon/v0.1/` contra `main` @ `afb75910bc631d9714fd797cc950550f45f8c7b9`. Esta advertencia aplica, en particular, a `INFORME_CORRECCION_P0_P05.md`, `AUDITORIA_CONTEXTOS_IDMX.md`, `ESTADO_MADUREZ_TECNOLOGICA.md`, `CIERRE_AUDITORIA_FINAL.md`, `PITCH_INSTITUCIONAL.md` y `auditoria-orbe-context-os-idmx-2026.md`.

Directorio que documenta la conversión del ORBE en una demo técnicamente honesta.

## Índice

| Archivo | Contenido |
|---|---|
| [`INFORME_CORRECCION_P0_P05.md`](./INFORME_CORRECCION_P0_P05.md) | Corrección aplicada de los 5 P0 + P0.5, con rastro archivo por archivo |
| [`AUDITORIA_CONTEXTOS_IDMX.md`](./AUDITORIA_CONTEXTOS_IDMX.md) | Segunda auditoría: qué son realmente Context.OS e ID.mx (10 preguntas) |
| [`ESTADO_MADUREZ_TECNOLOGICA.md`](./ESTADO_MADUREZ_TECNOLOGICA.md) | Hoja de madurez 🟢🟡🔵🔴 + arquitectura propuesta |
| [`PITCH_INSTITUCIONAL.md`](./PITCH_INSTITUCIONAL.md) | Documento de posición para presentación institucional |
| [`auditoria-orbe-context-os-idmx-2026.md`](./auditoria-orbe-context-os-idmx-2026.md) | **Auditoría final consolidada** del snapshot histórico (estado inicial, hallazgos, correcciones, pruebas, matriz de madurez, resumen institucional) |

## Novedad: pruebas de seguridad reproducibles

Se convirtió el claim falso "8/8 tests" en evidencia real: `scripts/test-firestore-rules.mjs` ejecuta 11 casos contra el emulador de Firestore (**11/11 pasan**). Correr con `npm run test:firestore-rules` (requiere Java 21).

## Estado de las correcciones

- [x] P0-1 "Certificación Aura v2.6" eliminada
- [x] P0-2 "Validez jurídica (Llave MX)" eliminada
- [x] P0-3 "8/8 tests" eliminada (sin prueba reproducible)
- [x] P0-4 Links `claude/...` → `main`
- [x] P0-5 "9+2" → 12 nodos + nota de divergencia
- [x] P0.5 Términos críticos sin evidencia → corregidos o retirados

## Verificación

- `tsc --noEmit` → exit 0 (compila limpio)
- `grep` → sin residuos de "Certificación Aura", "validez jurídica (Llave", "8/8", "blob/claude"

---
*Los cambios de código documentados aquí corresponden al snapshot histórico indicado arriba; cualquier estado actual debe verificarse contra el canon y la rama vigente.*
