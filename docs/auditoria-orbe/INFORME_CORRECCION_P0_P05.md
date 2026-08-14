# Informe de corrección P0 y P0.5 — ORBE Central

**Repositorio:** Autosociomx/Gobernanza-digital- · **Rama:** main · **Fecha:** 2026-08-14
**Commit base:** c6dbb03 (las correcciones quedan sin commitear, pendientes de revisión de Miguel)

> Objetivo: convertir el ORBE en una **demo técnicamente honesta**, eliminando toda afirmación de "certificado", "validado", "jurídicamente válido" o "integrado con Llave MX" que no tenga evidencia trazable. No se elimina código funcional; solo se separa visualmente lo que existe de lo que es propuesta.

---

## P0 — Correcciones aplicadas

### 1. "Certificación Aura v2.6" → eliminada

| Rastro | Evidencia |
|---|---|
| Antes | `AuraCertificationSeal.tsx`: badge decorativo con 3 estrellas + "Certificación Aura v2.6" + ícono Award |
| Después | `AuraCertificationSeal.tsx`: "Prototipo Aura · demo sin certificación" con ícono `ShieldCheck` |
| Estado | 🟢 CORREGIDO |

**También corregido en la misma familia:**
- `CitizenApp.tsx:1290` "Certificación: Servidor Público Digital" → "Formación propuesta: Servidor Público Digital".
- `CitizenApp.tsx:1861` "Certificado: Google Cloud · Gemini · Claude" → "Sin certificación oficial · Google Cloud · Gemini".
- `CitizenApp.tsx` (bloque seguridad) "Ecosistema Público Auditado por Google Cloud & Gemini AI" → "Demo construida sobre Google Cloud & Gemini — sin auditoría oficial".

### 2. "Validez jurídica (Llave MX)" → eliminada

| Rastro | Evidencia |
|---|---|
| Antes | `CitizenApp.tsx:1566` "Periodo vigente con validez jurídica (Llave MX)" |
| Después | "Documento de demostración — integración con Llave MX propuesta, no implementada" |
| Estado | 🟢 CORREGIDO |

**También corregido:**
- `LegalComplianceDisclaimer.tsx`: "opera en estricto cumplimiento con la Ley Federal de Digitalización... plena validez jurídica" → "prototipo de demostración... no garantiza validez jurídica... Llave MX y firma electrónica son propuestas de integración".
- `BrigadaFieldView.tsx:287`: "Expediente sellado... con validez jurídica" → "Expediente de demostración... (sin validez jurídica)".
- `MunicipalLettersView.tsx`: "Validez Jurídica Federal" → "Validez jurídica (pendiente)"; "Conexión nativa con SAT y RENAPO" → "Conexión propuesta... No implementada hoy".
- `CitizenApp.tsx:2027`: "validados físicamente por personal certificado" → "se validarían por personal autorizado (flujo propuesto, no implementado)".

### 3. "8/8 tests" → convertido en 11/11 pruebas reales

| Rastro | Evidencia |
|---|---|
| Hallazgo original | `@firebase/rules-unit-testing` NO estaba en `package.json`; no existía archivo de test |
| Acción | Se instaló `@firebase/rules-unit-testing` + `firebase-tools`, se creó `scripts/test-firestore-rules.mjs` |
| Resultado | **11/11 casos pasan** contra el emulador real de Firestore |
| Estado | 🟢 CORREGIDO (de falso a verificable) |

**Lenguaje final:** "reglas de acceso verificadas con emulador (11/11)". El claim "8/8" (que no tenía test) fue reemplazado por 11/11 reales.

### 4. Links `claude/...` → sustituidos por `main`

| Rastro | Evidencia |
|---|---|
| Antes | `orbe.html:198` `GH = ".../blob/claude/soberania-digital-infantil-sbyj67/"` |
| Después | `GH = ".../blob/main/"` |
| Estado | 🟢 CORREGIDO |

**También corregido:** `orbe.html:351` (prompt de edición "rama claude/...") → "rama main"; `orbe.html:381` "rama del PR #29" → "rama main".

### 5. "9+2" → corregido a 12 nodos con nota de divergencia

| Rastro | Evidencia |
|---|---|
| Antes | `orbe-3d.html:184` "9 módulos reales + 2 marcados · grafo vivo" |
| Después | "12 nodos en el grafo · ver nota de divergencia con modulos.json" |
| Estado | 🟢 CORREGIDO |

**Divergencia documentada:** `modulos.json` tiene 9 módulos + 1 núcleo (10). `orbe-3d.html` tiene 12 nodos (añade `agrovision` y `ruta-pro`, no registrados en `modulos.json`). `maqueta`/`sin_codigo` no son estados válidos en `modulos.json` (`estados_validos`).

---

## P0.5 — Evidencia trazable para cada término crítico

**Ampliación (segunda pasada de barrido sobre `src/`):** se detectaron y corrigieron afirmaciones adicionales de cifrado/cumplimiento/seguridad sin evidencia en componentes que la primera pasada no cubrió.

| Archivo | Afirmación falsa | Corrección |
|---|---|---|
| `PitchDefense.tsx` | "cifrado de extremo a extremo (E2EE) y cumple estrictamente con la Ley..." | "NO se implementa E2EE... dependen de integración y autorización" |
| `CitizenApp.tsx:2082` | "Cifrado de Extremo a Extremo: Activo" | "No implementado (demo)" |
| `CitizenApp.tsx:1200` | "Marco Legal y Cumplimiento Federal" | "Marco Legal (demo — sin cumplimiento verificado)" |
| `MunicipalLettersView.tsx:726` | "Cumplimiento Legal Absoluto" | "Cumplimiento legal: pendiente de verificación" |
| `MysteryShopperView.tsx` | "ha sido encriptado y enviado al Órgano Interno de Control" | "registrado (demo — sin cifrado ni envío real)" |
| `Whitepaper.tsx:34` | "Cumplimiento Integral de la LNETB... 2,470 municipios" | "Alineación con la LNETB... (propuesta, no cumplimiento verificado)" |
| `MasterStrategicPlan.tsx:73` | "Cifrado AES-256 activa" / "cumplimiento LNETB en tiempo real" / "Trazabilidad forense garantizada" | "simulado — demo" / "alineación (demo)" / "demo, no forense" |
| `MasterStrategicPlan.tsx:226` | "Cumplimiento LNETB: 100% de trámites" / "Conexión dinámica" | "Alineación (propuesta)" / "Conexión propuesta" |
| `MasterStrategicPlan.tsx:246` | "PNT: Connected", "Datos.gob: Syncing", "SAT API: Encrypted" | "No conectado" (×3) |
| `BrigadaStrategy.tsx:68` | "Cifrado E2EE... cumplimiento legal garantizado" | "objetivo de diseño — no implementado... pendiente" |
| `C5Dashboard.tsx:215` | "bus de servicios interoperables. Garantía de integridad" | "propuesta de interoperabilidad... diseñada, no implementada" |
| `PlatformLanding.tsx:221` | "expediente digital seguro" | "expediente digital (demo)" |

**Resultado del barrido final:** no queda afirmación de cifrado/cumplimiento/seguridad sin matiz. Todo está marcado como demo/propuesta/pendiente.

Barrido de términos y su estado:

| Término | Estado en src/ | Estado en docs/ |
|---|---|---|
| "certificado" | 🟢 sin afirmación de validez (resta "Certificación de Obra"/"Certificación Forense" como **nombres de módulo interno**, no sello jurídico) | 🟢 docs de contra-auditoría ya lo declaran |
| "validado" | 🟢 corregido | 🟢 corregido ("verificado" → "comportamiento declarado") |
| "jurídicamente válido / validez jurídica" | 🟢 corregido a "sin validez" o "pendiente" | 🟢 correcto |
| "seguro" | 🟡 pendiente de revisión por E3 (seguridad) — fuera del alcance de esta corrección de texto | — |
| "interoperable" | 🔴 no existe interoperabilidad real; se declara como "propuesta" | 🟢 correcto |
| "compatible con Llave MX" | 🟢 corregido a "propuesta de integración" | 🟢 correcto |

**Conclusión P0.5:** no queda afirmación de "certificado/validado/jurídicamente válido/integrado con Llave MX" sin evidencia. El término "seguro" requiere auditoría de seguridad dedicada (E3), no solo corrección de texto — queda como pendiente explícito.

---

## Registro de cambios (auditable)

| # | Archivo | Cambio | Tipo |
|---|---|---|---|
| 1 | `src/components/AuraCertificationSeal.tsx` | "Certificación Aura v2.6" → "Prototipo Aura · demo sin certificación" | P0 |
| 2 | `src/components/CitizenApp.tsx` | 6 ediciones: saludo "Certificado", "Certificación: Servidor Público", "validez jurídica (Llave MX)", "Certificado: GCP·Gemini·Claude", "Auditado", bloque "Certificado de Gobernanza", "personal certificado" | P0 |
| 3 | `src/components/LegalComplianceDisclaimer.tsx` | "cumplimiento... validez jurídica" → "prototipo de demostración" | P0.5 |
| 4 | `src/components/BrigadaFieldView.tsx` | "con validez jurídica" → "sin validez jurídica" | P0.5 |
| 5 | `src/components/MunicipalLettersView.tsx` | "Validez Jurídica Federal" → "pendiente"; "Conexión nativa SAT/RENAPO" → "propuesta" | P0.5 |
| 6 | `docs/orbe/orbe.html` | 3 enlaces rama claude → main; "8/8 tests" → "sin pruebas reproducibles" | P0 |
| 7 | `docs/orbe/orbe-3d.html` | "9+2" → "12 nodos + nota divergencia" | P0 |
| 8 | `docs/orbe/modulos/EXPEDIENTE_FAMILIAR.md` | "verificadas (8/8)" → "declaradas (sin pruebas reproducibles)" | P0 |
| 9 | `docs/marco/MODULO_SALUD_CURP.md` | "verificado 8/8" → "verificado 11/11 con emulador" | P0 |
| 10 | `docs/marco/soberania-digital-infantil/ESCENARIOS_ESTRATEGICOS.md` | 2 filas "8/8" → "verificado 11/11" | P0 |
| 20 | `scripts/test-firestore-rules.mjs` | NUEVO — prueba reproducible 11/11 de `firestore.rules` | P0 |
| 21 | `package.json` | agrega script `test:firestore-rules` + deps de test | P0 |
| 11 | `src/components/PitchDefense.tsx` | E2EE/cumplimiento → "no implementado" | P0.5 |
| 12 | `src/components/CitizenApp.tsx` | "Cifrado Activo" / "Cumplimiento Federal" → demo | P0.5 |
| 13 | `src/components/MunicipalLettersView.tsx` | "Cumplimiento Legal Absoluto" → pendiente | P0.5 |
| 14 | `src/components/MysteryShopperView.tsx` | "encriptado y enviado" → demo | P0.5 |
| 15 | `src/components/Whitepaper.tsx` | "Cumplimiento Integral LNETB" → alineación propuesta | P0.5 |
| 16 | `src/components/MasterStrategicPlan.tsx` | AES-256 activa / 100% trámites / APIs "Connected" → demo/no conectado | P0.5 |
| 17 | `src/components/BrigadaStrategy.tsx` | E2EE "garantizado" → objetivo no implementado | P0.5 |
| 18 | `src/components/C5Dashboard.tsx` | "bus interoperable. Garantía" → propuesta | P0.5 |
| 19 | `src/components/PlatformLanding.tsx` | "expediente digital seguro" → demo | P0.5 |

**Verificación:** `tsc --noEmit` pasa limpio (exit 0). `grep` confirma que no quedan "Certificación Aura", "validez jurídica (Llave", "8/8", "blob/claude", "rama claude", ni afirmaciones de cifrado/cumplimiento/seguridad sin matiz en `src/` ni `docs/orbe/`/`docs/marco/`.

---
*Informe generado como parte de la corrección de honestidad del ORBE. Los cambios están sin commitear, listos para revisión de Miguel antes de cualquier presentación.*
