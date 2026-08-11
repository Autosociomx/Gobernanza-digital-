# 04 — SOLUCIÓN DIGITAL

## Ficha estándar

| Campo | Respuesta |
|---|---|
| **Problema** | Se necesita un sistema que demuestre técnicamente cómo se implementaría el trámite digital punta a punta |
| **Afectados** | El Ayuntamiento (como operador futuro) y los ciudadanos (como usuarios finales) |
| **Obligación/Necesidad** | LNETB Arts. 66-71: identidad digital, firma, expediente, ventanilla única, interoperabilidad |
| **Propuesta** | Prototipo funcional que demuestra el flujo, con arquitectura documentada y componentes reutilizables |
| **Evidencia** | `demo/constancia-residencia/index.html` (prototipo), `src/` (50 componentes React), `server.ts` (backend Express) |
| **Brecha** | Sin conexiones a fuentes gubernamentales. Sin firma electrónica avanzada. Sin expediente en producción |
| **Responsable** | Proponente tecnológico (desarrollo) + Ayuntamiento (autorizaciones, convenios, designaciones) |
| **Fundamento** | Arquitectura documentada en `server.ts`, `src/App.tsx`, `netlify.toml` |
| **Estado** | 🟡 Preparado — frontend funcional, backend general, demo del trámite específico lista |
| **Evidencia física** | Repositorio GitHub: `Autosociomx/Gobernanza-digital-` |

## Contenido

| Archivo | Contenido |
|---|---|
| `PROPUESTA_DE_SOLUCION.md` | Descripción de la solución propuesta |
| `ARQUITECTURA_FUNCIONAL.md` | Diagrama funcional: componentes, flujos, usuarios |
| `ARQUITECTURA_TECNICA.md` | Stack: React+TypeScript, Express, SQLite, Firestore, Gemini AI, Stripe |
| `FLUJO_DIGITAL_DEL_TRAMITE.md` | Paso a paso del trámite en el prototipo |
| `IDENTIDAD_DIGITAL.md` | Validación CURP: lo que existe (sintáctico) y lo que falta (RENAPO) |
| `EXPEDIENTE_DIGITAL.md` | Diseño del expediente digital (Firestore, no implementado en producción) |
| `FIRMA_Y_AUTENTICIDAD.md` | OTP demostrativo vs. e.firma requerida |
| `INTEROPERABILIDAD.md` | Conectores diseñados, cero implementados |
