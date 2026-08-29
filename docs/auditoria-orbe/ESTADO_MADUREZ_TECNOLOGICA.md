# Estado de madurez tecnológica — HOY

**Fecha:** 2026-08-14 · **Rama:** main · **Repositorio:** Autosociomx/Gobernanza-digital-

**Identidad del proyecto:** Prototipo tecnológico desarrollado por el equipo ConnectX (fundador/originador: Miguel Alexis Pérez Aguilar, AutosocioMX). Se presenta para evaluación técnica e institucional. **No** es un sistema oficial del Gobierno de Nayarit ni del Ayuntamiento de Tepic. Nayarit Digital es el caso de aplicación/piloto propuesto; el gobierno es un potencial usuario/evaluador, no el propietario.

> Separación visual honesta entre lo que existe, lo que es prototipo y lo que es arquitectura. No se presenta el ORBE como productivo.

---

## Leyenda

- 🟢 **Construido y verificable** (existe en código, se puede compilar/ejecutar)
- 🟡 **Prototipo / parcial** (existe pero limitado, sin validación completa)
- 🔵 **Propuesta / diseñado** (documentado, no implementado)
- 🔴 **No existe / pendiente** (bloqueante para producción)

---

## Madurez por capa

| Capa | Estado | Detalle verificable |
|---|---|---|
| 🟢 Prototipo ORBE (interfaz ciudadana) | 🟢 | `src/components/CitizenApp.tsx` — FAB de chat + pestañas |
| 🟢 Agente conversacional (Aura) | 🟢 | `useAuraChat.ts` + `server.ts:/api/ai/chat` (Gemini) |
| 🟢 Voz en español | 🟢 | `useAuraVoice.ts` (Web Speech API, es-MX) |
| 🟢 Arquitectura de módulos (documental) | 🟢 | `docs/orbe/` + `modulos.json` |
| 🟡 UX ciudadana | 🟡 | tipografía 8–11px, FAB no es el orbe, sin accesibilidad |
| 🟡 Modelo de interoperabilidad | 🟡 | diseñado, cero endpoints gubernamentales |
| 🟡 Integración futura con identidad nacional | 🟡 | Llave MX/SINISI = propuesta, login real Google |
| 🟡 Context.OS (vertical slice de laboratorio) | 🟡 | `contextos/` + `shared/semantic/` (1194 líneas): pipeline real IntentEnvelope→Policy→Consent→Adapter→EvidenceRecord con checksum SHA-256, construido en PRs #49/#50 (posteriores a la fecha original de este documento, 2026-08-14). Marcado `LAB_MOCK`, sin efectos institucionales, apagado por defecto (`VITE_CONTEXTOS_BRIDGE_ENABLED=false`) — no es lo mismo que un Context.OS productivo, pero ya no es "solo arquitectura" |
| 🔵 Bus de eventos productivo | 🔵 | "en diseño" (`ORBE_NUCLEO.md`) |
| 🔴 Integraciones institucionales reales | 🔴 | sin RENAPO/SAT/catastro/SIAPA |
| 🔴 Validación de lenguas originarias | 🔴 | strings hardcodeados sin validar |
| 🔴 Certificaciones institucionales | 🔴 | eliminadas (P0) — nunca existieron |

---

## Declaración de propósito del piloto

> El objetivo del piloto **no es demostrar que todo está terminado**. Es demostrar que la arquitectura puede **integrarse, validarse y escalarse** sobre la infraestructura pública existente.

---

## Arquitectura propuesta (no productiva)

```
          CIUDADANO
              │
            ID.mx          ← capa de identidad (propuesta: Llave MX + Llave Infantil)
        identidad / expediente
              │
       ┌──────▼──────┐
       │    ORBE     │   ← prototipo de interfaz ciudadana (hoy: FAB de chat)
       │  interfaz   │
       └──────┬──────┘
              │
            AURA           ← agente conversacional (real: Gemini + voz es-MX)
       agente conversacional
              │
       ┌──────▼──────┐
       │ Context.OS  │   ← capa de interoperabilidad (propuesta: hoy COP 1.0 + getPageContext)
       │ interoperab.│
       └──────┬──────┘
              │
 ┌────────────┼────────────┐
 ▼            ▼            ▼
SALUD      MUNICIPIO    SERVICIOS
 │            │            │
TRIAGE     TRÁMITES    BENEFICIOS
```

**Nota de honestidad (actualizada 2026-08-25):** `ID.mx` sigue siendo un **nombre de arquitectura futura** — no existe como código; lo real hoy sigue siendo Google OAuth. `Context.OS` ya no encaja en esa misma frase: desde los PR #49/#50 existe un vertical slice de laboratorio real en `contextos/` + `shared/semantic/` (ver fila de la tabla arriba) — sigue sin ser productivo, pero afirmar "no existe como código" ya no es exacto. El ORBE sigue siendo una **interfaz ciudadana prototipo**, no un orquestador productivo.

---
*Documento vivo. Se actualiza conforme se valida cada capa. Última corrección: auditoría de coherencia 2026-08-25 (ver `docs/marco/PENDIENTES_AUDITORIA_2026-08.md`).*
