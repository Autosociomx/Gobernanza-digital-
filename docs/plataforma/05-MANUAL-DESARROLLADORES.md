# 05 · Manual para desarrolladores

**Nayarit Digital / ConnectX / SOATM** · Documento de integración · v1.0

Este manual documenta lo que un desarrollador puede consumir **hoy**, sin
esperar a ningún componente de la sección "Hoja de ruta". Léelo asumiendo que
nunca viste el repo — si algo aquí no alcanza para integrar un módulo nuevo,
está anotado explícitamente en la última sección.

## APIs reales — todo vive en `server.ts` (Express)

No hay API pública versionada ni SDK (ver "Qué no existe todavía"). Estos son
los 5 endpoints reales, todos servidos desde el mismo proceso Express:

| Método y ruta | Qué hace | Notas |
|---|---|---|
| `GET /api/departments` | Lista dependencias | Backed por SQLite (`better-sqlite3`), tabla `departments` — **no** es Firestore; es un almacén local separado usado solo por este endpoint |
| `POST /api/departments` | Crea una dependencia | Sentencias preparadas (`?` placeholders) — sin inyección SQL |
| `PUT /api/departments/:id` | Actualiza una dependencia | ídem |
| `DELETE /api/departments/:id` | Borra una dependencia | ídem |
| `POST /api/ai/chat` | Conversación con el SOATM AI Engine (Aura) | Body: `{ message, context?, useThinking?, useMaps?, useSearch? }`. Requiere `GEMINI_API_KEY` en el servidor; responde 500 con mensaje claro si falta |
| `POST /api/ai/risk-analysis` | Análisis estructurado de riesgo/gobernanza | Body: `{ departments?, logs? }`; responde JSON validado contra un `responseSchema` fijo (score, level, findings, recommendations, sovereigntyIndex, governanceMaturity) |
| `POST /api/create-payment-intent` | Crea un Payment Intent de Stripe | Body: `{ amount, currency? }` (`amount` en centavos); responde 500 si `STRIPE_SECRET_KEY` no está configurada |

**Regla de seguridad que todo endpoint nuevo debe respetar** (de
`docs/marco/PROTOCOLO_SEGURIDAD.md`): ninguna llave (`GEMINI_API_KEY`,
`STRIPE_SECRET_KEY`) sale de `server.ts`; el navegador nunca crea su propio
cliente de IA o de pagos. La Guardia de CI (`scripts/verificar-regresiones.mjs`)
falla el build si detecta lo contrario.

## Autenticación y autorización

- **Identidad de usuario**: Firebase Auth, inicializado en `src/firebase.ts`,
  UI en `src/components/LoginView.tsx`.
- **Reglas de acceso a datos**: `firestore.rules` — roles `admin` / `editor`
  / `viewer` / `citizen` (colección `users`), más el caso especial de
  `perfiles_salud` que usa códigos de personal (`personal_salud/{codigo}`)
  en vez de roles de cuenta, para permitir registro asistido sin cuenta
  propia (ver `04-ARQUITECTURA-DATOS.md`).
- **No hay autenticación de servicio-a-servicio** para los endpoints de
  `server.ts` (`/api/departments`, `/api/ai/*`, `/api/create-payment-intent`)
  más allá de que el servidor corre en el mismo origen que sirve el
  frontend — no hay API keys ni tokens para consumidores externos todavía.

## Cómo correr el proyecto localmente

```bash
npm install
cp .env.example .env   # completar GEMINI_API_KEY / STRIPE_SECRET_KEY si se van a probar esos endpoints
npm run dev             # tsx server.ts — sirve Vite en modo middleware + las rutas de Express
npm run lint             # tsc --noEmit — no hay linter de estilo configurado, solo chequeo de tipos
node scripts/verificar-regresiones.mjs   # guardia de regresiones, igual que en CI
```

**No existe `npm test`** — no hay ningún framework de pruebas instalado en
esta rama ni en `main` (ni Vitest, ni Jest, ni Playwright). Sí existe trabajo
de pruebas (Vitest + un primer suite en `src/lib/__tests__/validation.test.ts`)
en la rama remota sin fusionar `claude/autosocio-governance-update-8taacm` —
mencionado aquí porque es exactamente el tipo de brecha que este manual
existe para no esconder.

## Qué no existe todavía (no lo asumas al integrar)

- **SDK o librería cliente**: cero. Cualquier integración hoy es HTTP directo
  a los 5 endpoints de arriba.
- **API pública versionada**: no hay `/v1/`, no hay contrato de
  compatibilidad hacia atrás declarado.
- **Bus de eventos entre módulos** (SOATM Data Bus): no existe; no hay
  webhooks ni suscripción a eventos de otros módulos.
- **Pruebas automatizadas de reglas de Firestore**: `MODULO_SALUD_CURP.md`
  documenta 27/27 casos verificados con `@firebase/rules-unit-testing`, pero
  ese archivo de pruebas no existe en el repositorio hoy (ver
  `02-ARQUITECTURA-SISTEMA.md`, SOATM Security) — no lo tomes como
  regresión-safe sin volver a correrlo tú mismo.
- **Autenticación de servicio para integraciones externas** (otro municipio,
  un proveedor): no hay convenio técnico, API key de terceros, ni sandbox —
  esto es exactamente lo que "SOATM Developer Platform: Hoja de ruta"
  significa en `02-ARQUITECTURA-SISTEMA.md`.

---

*Este documento fue revisado por la Silla de Desarrollador Externo — leído
como onboarding de alguien que nunca vio el repo (`docs/plataforma/README.md`).*
