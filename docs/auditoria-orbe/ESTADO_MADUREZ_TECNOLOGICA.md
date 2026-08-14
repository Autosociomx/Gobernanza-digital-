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

**Nota de honestidad:** `ID.mx` y `Context.OS` son **nombres de arquitectura futura**. No existen como código. Lo real hoy es: Google OAuth (identidad) y `getPageContext()` + COP 1.0 (contexto). El ORBE es una **interfaz ciudadana prototipo**, no un orquestador productivo.

---
*Documento vivo. Se actualiza conforme se valida cada capa.*
