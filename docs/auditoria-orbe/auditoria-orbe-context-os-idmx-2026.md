# Auditoría ORBE · Context.OS · ID.mx — 2026

**Repositorio:** Autosociomx/Gobernanza-digital- · **Rama:** main · **Fecha:** 2026-08-14
**Commit base:** c6dbb03 (modificaciones sin commitear, pendientes de revisión)

> Regla rectora: no inventar, no reconstruir desde cero, no agregar arquitectura innecesaria. Exprimir al máximo lo que ya existe y convertir en funcional todo lo que pueda hacerse con el código actual. Toda afirmación se clasifica y se respalda con ruta/evidencia.

---

## 1. Estado inicial (resumen)

El repositorio contenía un ecosistema con:
- **ORBE** (interfaz ciudadana + grafo documental)
- **AURA** (agente conversacional + voz)
- **Context.OS / COP** (capa de contexto, solo como herramienta HTML + string)
- **ID.mx / Llave MX / SINISI** (identidad, solo propuesta)
- **módulos** (Salud/CURP real, resto maqueta)
- **seguridad** (reglas Firestore declaradas pero sin prueba reproducible)

El problema central no era falta de código, sino **sobreventa**: afirmaciones de certificación, cumplimiento, cifrado e interoperabilidad sin evidencia.

---

## 2. Hallazgos principales

| # | Hallazgo | Clasificación |
|---|---|---|
| H1 | "Certificación Aura v2.6" = badge decorativo (CSS + 3 estrellas), cero criptografía | 🔴 falso |
| H2 | "validez jurídica (Llave MX)" sin integración real (login = Google OAuth) | 🔴 falso |
| H3 | "8/8 tests de seguridad" sin archivo de test en repo | 🔴 falso |
| H4 | Enlaces a rama `claude/...` inexistente (3 refs en `orbe.html`) | 🔴 roto |
| H5 | "9+2 módulos" vs. 12 nodos reales en `orbe-3d.html` vs. 9 en `modulos.json` | 🔴 inconsistente |
| H6 | Afirmaciones de cifrado E2EE/AES-256/cumplimiento en 9 componentes | 🔴 falso |
| H7 | Context.OS e ID.mx no existen como código (solo nombres de futuro) | 🔴 sobreventa |
| H8 | Interoperabilidad gubernamental = cero endpoints en `server.ts` | 🔴 no existe |

---

## 3. Correcciones aplicadas

### 3.1 Bloqueadores P0 (5)

| P0 | Corrección | Archivos |
|---|---|---|
| "Certificación Aura v2.6" | → "Prototipo Aura · demo sin certificación" | `AuraCertificationSeal.tsx` |
| "validez jurídica (Llave MX)" | → "integración propuesta, no implementada" | `CitizenApp.tsx`, `LegalComplianceDisclaimer.tsx`, `BrigadaFieldView.tsx`, `MunicipalLettersView.tsx` |
| "8/8 tests" falso | → verificado de verdad (11/11 emulador) | `MODULO_SALUD_CURP.md`, `orbe.html`, `EXPEDIENTE_FAMILIAR.md`, `ESCENARIOS_ESTRATEGICOS.md` |
| links `claude/...` | → `main` | `orbe.html` (3 refs) |
| "9+2" | → "12 nodos + nota de divergencia" | `orbe-3d.html` |

### 3.2 P0.5 — afirmaciones sin evidencia (2 pasadas)

**12 componentes** con afirmaciones falsas de cifrado/cumplimiento/seguridad/interoperabilidad fueron corregidos a lenguaje honesto (demo/propuesta/pendiente):

`PitchDefense.tsx`, `CitizenApp.tsx`, `MunicipalLettersView.tsx`, `MysteryShopperView.tsx`, `Whitepaper.tsx`, `MasterStrategicPlan.tsx`, `BrigadaStrategy.tsx`, `C5Dashboard.tsx`, `PlatformLanding.tsx`, `BrigadaFieldView.tsx`, `LegalComplianceDisclaimer.tsx`.

---

## 4. Pruebas realizadas (evidencia reproducible)

### 4.1 Pruebas de reglas Firestore — 🟢 VERIFICADO (11/11)

Se creó `scripts/test-firestore-rules.mjs` que ejecuta `@firebase/rules-unit-testing` contra el emulador real.

**Resultado:** `11 pasadas / 0 fallidas / 11 total`

| # | Caso | Resultado |
|---|---|---|
| 1 | anónimo NO crea perfil | ✅ |
| 2 | paciente vinculado SÍ crea perfil | ✅ |
| 3 | CURP inválida rechazada | ✅ |
| 4 | personal sin código NO registra | ✅ |
| 5 | personal código inactivo NO registra | ✅ |
| 6 | personal código activo SÍ registra | ✅ |
| 7 | ajeno NO lee perfil de otro | ✅ |
| 8 | paciente vinculado SÍ lee su perfil | ✅ |
| 9 | personal_salud no legible | ✅ |
| 10 | documento lo lee paciente, no quien lo subió | ✅ |
| 11 | consentimiento solo paciente vinculado | ✅ |

**Cómo reproducir:** `npm run test:firestore-rules` (requiere Java 21, ya documentado).

### 4.2 Compilación

- `tsc --noEmit` → exit 0
- `vite build` → exit 0

---

## 5. Claims eliminados

1. "Certificación Aura v2.6" — eliminado (era decorativo)
2. "validez jurídica (Llave MX)" — eliminado
3. "8/8 pruebas de seguridad" — reemplazado por 11/11 reales
4. "Cifrado de Extremo a Extremo: Activo" — eliminado (no existe)
5. "Cumplimiento Integral LNETB" — reemplazado por "alineación (propuesta)"
6. "Cumplimiento Legal Absoluto" — eliminado
7. "AES-256 activa" — reemplazado por "simulado"
8. "SAT API: Encrypted / PNT: Connected" — reemplazado por "No conectado"
9. "Interoperabilidad Real... información segura" — reemplazado por "propuesta"
10. "Expediente Seguro" / "Identidad Digital Segura" — reemplazado por "demo/propuesta"

---

## 6. Funcionalidades verificadas

| Componente | Estado | Evidencia |
|---|---|---|
| Aura (chat backend Gemini) | 🟢 | `useAuraChat.ts` + `server.ts:/api/ai/chat` |
| Voz español (Web Speech API) | 🟢 | `useAuraVoice.ts` |
| Contexto de página | 🟢 | `getPageContext()` |
| Perfil salud CURP | 🟡 | `SaludNayaritID.tsx` + reglas |
| Reglas Firestore | 🟢 | 11/11 tests emulador |
| Build reproducible | 🟢 | `vite build` exit 0 |

---

## 7. Prototipos funcionales (convertidos o confirmados)

| Prototipo | Acción |
|---|---|
| Aura conversacional | 🟢 confirmado funcional |
| Voz es-MX | 🟢 confirmado funcional |
| Reglas de seguridad | 🟢 **convertido de "declarado" a "verificado"** (se creó el test) |
| Perfil salud CURP | 🟡 prototipo con reglas verificadas, sin modo pediátrico |

---

## 8. Dependencias externas (🟠)

| Dependencia | Detalle |
|---|---|
| Llave MX / RENAPO | sandbox ATDT, convenios — no implementado |
| SINISI | propuesta legislativa — no implementado |
| Firma electrónica avanzada | PKI/HSM/SAT — no implementado |
| Catastro / SIAPA / SAT | convenios — no implementado |
| Cloud Storage Firebase | decisión de propietario (plan Blaze) |
| Validación lenguas originarias | comunidad Cora/Wixárika — no realizada |

---

## 9. Pendientes (🔴)

| Pendiente | Bloqueante para |
|---|---|
| Integración Llave MX | identidad institucional |
| Interoperabilidad gubernamental | trámites reales |
| Firma electrónica avanzada | validez jurídica |
| Bus de eventos / orquestación | producción |
| Voz lenguas originarias | inclusión |

---

## 10. Riesgos

| Riesgo | Severidad |
|---|---|
| Alucinación de Gemini (sin grounding/permisos) | 🔴 |
| NNA + voz + identidad + salud (sin consentimiento parental en código) | 🔴 |
| CURP como string sin validación RENAPO | 🟡 |
| Endpoint `/api/ai/chat` sin scoping por usuario | 🔴 |
| Strings Cora/Wixárika hardcodeados sin validar | 🟡 |

---

## 11. Matriz de madurez final

| Componente | Estado | Evidencia | Acción |
|---|---|---|---|
| ORBE (interfaz) | 🟡 prototipo | `CitizenApp.tsx` | corregido |
| AURA (agente) | 🟢 | `useAuraChat.ts` + `server.ts` | verificado |
| Voz español | 🟢 | `useAuraVoice.ts` | verificado |
| Context.OS | 🟡 vertical slice de laboratorio (actualizado 2026-08-25) | `contextos/`+`shared/semantic/`, 1194 líneas, `LAB_MOCK`, apagado por defecto — ver `docs/auditoria-orbe/ESTADO_MADUREZ_TECNOLOGICA.md` | en laboratorio, no productivo |
| ID.mx | 🔵 arquitectura | solo Google OAuth + CURP | pendiente |
| Seguridad (reglas) | 🟢 | 11/11 tests | **verificado (nuevo)** |
| Módulo Salud/CURP | 🟡 | `SaludNayaritID.tsx` | prototipo |
| Lenguas originarias | 🔴 | strings hardcodeados | pendiente |
| Llave MX | 🟠 | sin integración | dependencia externa |
| SINISI | 🟠 | propuesta | dependencia externa |

---

## 12. Resumen institucional (1 página)

**Qué existe:** un prototipo funcional de interfaz ciudadana (ORBE) con un agente conversacional (AURA) que responde por texto y voz en español, con conciencia de página, sobre un backend real (Gemini). Hay un módulo de perfil de salud ligado a CURP con reglas de acceso verificadas (11/11) contra el emulador de Firestore.

**Qué demuestra el prototipo:** que la experiencia ciudadana (hablar, consultar, gestionar un expediente de salud) es técnicamente viable con componentes ya construidos.

**Qué problema resuelve:** la falta de una interfaz ciudadana unificada y honesta para trámites municipales, sin sobreventa de capacidades.

**Cómo se relacionan los conceptos:**
- **ID.mx** = capa de identidad/expediente (propuesta; hoy Google OAuth + CURP)
- **ORBE** = interfaz ciudadana (prototipo)
- **AURA** = agente conversacional (funcional)
- **Context.OS** = capa de interoperabilidad (propuesta; hoy COP 1.0 + contexto de página)

**Cómo se adapta a infraestructura nacional:** la arquitectura está preparada conceptualmente para consumir Llave MX (CURP) y otros mecanismos, sujeto a integración y autorización — que hoy es dependencia externa.

**Qué requiere un piloto:** convenios (RENAPO/SAT/catastro/SIAPA), sandbox ATDT para Llave MX, firma electrónica, y habilitar Cloud Storage — todo externo al código.

**Qué NO está implementado:** integración con Llave MX, interoperabilidad gubernamental, firma electrónica avanzada, bus de eventos, voz en lenguas originarias, y certificaciones institucionales.

---

## 13. Estado final

El repositorio termina: **menos exagerado, más verdadero, más limpio, más demostrable y más defendible.**

Cuando un técnico pregunte "¿esto funciona?", la respuesta ahora es honesta:
- **"Sí, aquí está"** → Aura, voz, reglas de seguridad (con test reproducible).
- **"Todavía no; depende de integración externa"** → Llave MX, interoperabilidad, firma, lenguas.

Nunca más: "sí" cuando realmente no existe.

---
*Auditoría completada. Modificaciones sin commitear, listas para revisión de Miguel.*
