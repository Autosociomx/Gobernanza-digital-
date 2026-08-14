# Pitch institucional — Prototipo de interfaz ciudadana del ecosistema ConnectaX

**Para:** Ayuntamiento de Tepic · Gobierno del Estado de Nayarit · ATDT · autoridades de protección de datos · autoridades de NNA
**Fecha:** 2026-08-14 · **Versión:** demo técnicamente honesta

> Principio rector: **no prometemos sistemas terminados.** Presentamos lo que existe, lo que falta, y cómo se integra con la infraestructura nacional.

---

## 1. Arquitectura (lo que proponemos)

Una interfaz ciudadana (**ORBE**) que conecta al ciudadano con un agente conversacional (**Aura**) y, en una capa futura de interoperabilidad (**Context.OS**), con los servicios municipales — todo sobre una capa de identidad (**ID.mx**).

```
CIUDADANO → ID.mx → ORBE (interfaz) → AURA (agente) → Context.OS (interop) → SALUD / MUNICIPIO / SERVICIOS
```

**Qué es real vs. qué es propuesta:**

| Capa | Estado hoy | Verificación |
|---|---|---|
| ORBE (interfaz ciudadana) | 🟢 prototipo | `CitizenApp.tsx` |
| AURA (agente + voz) | 🟢 demo (español) | `useAuraChat.ts` + `useAuraVoice.ts` + `server.ts` |
| ID.mx (identidad) | 🔵 propuesta | login real = Google OAuth; Llave MX = propuesta |
| Context.OS (interoperabilidad) | 🔵 propuesta | COP 1.0 (tool) + `getPageContext()`; sin endpoints |

## 2. Código (lo que existe en el repositorio)

- **Frontend:** React 19 + TypeScript + Vite + Tailwind. Compila limpio (`tsc --noEmit` = exit 0).
- **Backend:** `server.ts` (Express) — endpoints internos: `departments` CRUD, `/api/ai/chat`, `/api/ai/risk-analysis`, `/api/create-payment-intent`.
- **Datos:** Firebase (auth/firestore/storage) + Supabase (pulso-nayarit) + SQLite (departments).
- **Grafo documental:** `docs/orbe/` con `modulos.json` (índice).

## 3. Demo (lo que se puede mostrar hoy)

1. **Aura conversacional** responde con contexto de página (pestaña, idioma, conexión) vía Gemini.
2. **Voz en español** (reconocimiento + síntesis) con Web Speech API.
3. **Perfil de salud ligado a CURP** (reglas de acceso declaradas, sin pruebas reproducibles).
4. **Pagos** (demo con Stripe backend, datos de demostración).

## 4. Lo que ya funciona

| Capacidad | Estado |
|---|---|
| Chat con IA (backend real) | 🟢 |
| Voz español (navegador) | 🟢 |
| Contexto de página | 🟢 |
| Build reproducible | 🟢 |
| Arquitectura modular documentada | 🟢 |

## 5. Lo que falta

| Brecha | Bloqueante para |
|---|---|
| Integración Llave MX (hoy Google OAuth) | identidad institucional |
| Interoperabilidad (RENAPO/SAT/catastro/SIAPA) | trámites reales |
| Firma electrónica avanzada (hoy OTP demo) | validez jurídica |
| Pruebas de reglas Firestore reproducibles | seguridad auditable |
| Voz en lenguas originarias (hoy es-MX + strings sin validar) | inclusión |
| Bus de eventos / orquestación | productivo |

## 6. Integración con la infraestructura nacional

- **Llave MX** (CURP, Art. 74 LNETB): propuesta de integración vía sandbox ATDT — **no implementada**.
- **Portal Ciudadano Único / Repositorio Nacional** (ATDT): alineación propuesta.
- **LNETB** (DOF 16-jul-2025): el proyecto se **alinea** a la obligación de simplificación/digitalización; **no declara cumplimiento**.
- **Ley de Gobierno Digital de Nayarit** (Arts. 2, 5, 6): obliga a municipios; fundamento estatal verificado.

## 7. Piloto de 90 días (propuesta)

| Fase | Semanas | Entregable |
|---|---|---|
| Fase 1 — Convenios y autorizaciones | 1–2 | Acuerdos con municipio + ATDT |
| Fase 2 — Trámite priorizado (Constancia de Residencia) | 3–6 | Flujo simplificado con un solo trámite real |
| Fase 3 — Identidad (Llave MX sandbox) | 6–8 | Prueba de autenticación federada |
| Fase 4 — Evaluación AIR | 9–12 | Informe de impacto regulatorio |

**Meta del piloto:** demostrar que la arquitectura **integra, valida y escala** sobre infraestructura pública existente — no que todo está terminado.

---

## Líneas de presentación (honestas)

✅ "Tenemos un **prototipo funcional** que demuestra la experiencia ciudadana."
✅ "Tenemos una **arquitectura propuesta** de interoperabilidad."
✅ "Tenemos **componentes tecnológicos construidos**."
✅ "Tenemos una **visión de integración** con Llave MX."

❌ "Ya estamos integrados con Llave MX."
❌ "Tenemos certificación."
❌ "Tenemos 8/8 pruebas de seguridad."
❌ "ORBE ya es un orquestador institucional productivo."

---
*Documento de posición. No constituye una oferta vinculante ni una declaración de cumplimiento normativo. Requiere validación con responsables técnicos, jurídicos y de TIC antes de presentar ante cualquier autoridad.*
