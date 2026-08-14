# Auditoría ORBE — Corrección P0/P0.5 + Context.OS/ID.mx

Directorio que documenta la conversión del ORBE en una demo técnicamente honesta.

## Índice

| Archivo | Contenido |
|---|---|
| [`INFORME_CORRECCION_P0_P05.md`](./INFORME_CORRECCION_P0_P05.md) | Corrección aplicada de los 5 P0 + P0.5, con rastro archivo por archivo |
| [`AUDITORIA_CONTEXTOS_IDMX.md`](./AUDITORIA_CONTEXTOS_IDMX.md) | Segunda auditoría: qué son realmente Context.OS e ID.mx (10 preguntas) |
| [`ESTADO_MADUREZ_TECNOLOGICA.md`](./ESTADO_MADUREZ_TECNOLOGICA.md) | Hoja de madurez 🟢🟡🔵🔴 + arquitectura propuesta |
| [`PITCH_INSTITUCIONAL.md`](./PITCH_INSTITUCIONAL.md) | Documento de posición para presentación institucional |
| [`auditoria-orbe-context-os-idmx-2026.md`](./auditoria-orbe-context-os-idmx-2026.md) | **Auditoría final consolidada** (estado inicial, hallazgos, correcciones, pruebas, matriz de madurez, resumen institucional) |

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
*Los cambios de código están sin commitear, pendientes de revisión de Miguel.*
