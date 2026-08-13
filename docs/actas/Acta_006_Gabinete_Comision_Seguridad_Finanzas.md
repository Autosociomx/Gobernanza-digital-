# Acta_006_Gabinete_Comision_Seguridad_Finanzas.md

## Acta 006 — Gabinete de Especialistas · Comisión
**Tema:** Auditoría de seguridad (E3) y trazabilidad de pagos (E4)
**Sillas convocadas:** E3 (CISO/Datos) · E4 (Hacienda Pública)
**Modalidad:** Comisión (2 sillas)
**Fecha:** 13 agosto 2026

---

## 🎙️ INTERVENCIONES

### E3 · CISO / Protección de Datos (LGPDPPSO)

**Confirmación de hallazgos previos (agravados):**
- `firebase-applet-config.json` con `apiKey` real `AIzaSy…s8I4`, trackeado en git y presente en **14 blobs** de la historia (desde commit `82de345`, 03-ago). Purga exige reescribir historia.
- `MunicipalLettersView.tsx:157` afirma "CERTIFICA Y HACE CONSTAR", "RENAPO cruzado mediante PNT" y "validez plena LFEA Nayarit" — pero el "hash" es `Math.random()`, el folio es `Math.random()`, la verificación es `setTimeout` con texto prefabricado, y el "stress test" imprime logs simulados de RENAPO/SAT/AES-256/blockchain.

**[HALLAZGO CRÍTICO 1]** Config Firebase completa commiteada e importada por `firebase.ts` (`import firebaseConfig from '../firebase-applet-config.json'`). Expone projectId, appId, apiKey, firestoreDatabaseId (`ai-studio-…`), storageBucket, messagingSenderId. Clave declarada **comprometida**.
[RECOMENDACIÓN] Rotar apiKey en consola + restringir por dominio; quitar el JSON de git; reescribir historia (filter-repo/BFG); mover a `VITE_FIREBASE_*` en build.
[MÓDULO] `firebase-applet-config.json` · `src/firebase.ts` · `.gitignore`

**[HALLAZGO CRÍTICO 2]** `firestore.rules` permite `get: if isAuthenticated()` en `perfiles_salud/{curp}`. Cualquier cuenta Google (login sin whitelist de dominio) lee el perfil de salud completo de cualquier ciudadano con solo conocer el CURP (identificador deducible). Violación de confidencialidad de datos de salud (NOM-024-SSA3, art. 64 LGPDPPSO).
[RECOMENDACIÓN] Restringir get al titular o `isAdmin()`; whitelist de dominio institucional en login; política de retención/borrado.
[MÓDULO] `firestore.rules` · `src/firebase.ts`

**[HALLAZGO ALTA 1]** `storage.rules` apunta a `(default)` pero el proyecto usa base con nombre propio (`ai-studio-…`). `perfilExiste()` siempre falso → control de acceso de Storage inválido.
[RECOMENDACIÓN] Apuntar reglas a la base real; validar con emulador; auditar bucket de producción.
[MÓDULO] `storage.rules` · `firebase-applet-config.json`

**[HALLAZGO ALTA 2]** PDF con "Firma Electrónica Avanzada con validez jurídica plena", "Sello Digital", "Blockchain Municipal: Bloque Validado SHA-256", QR a `nayarit.gob.mx/verify` — todo apócrifo. Constituye materialmente **falsedad documental** y posible usurpación de funciones públicas.
[RECOMENDACIÓN] Desactivar descarga PDF hasta emisor real; leyenda "prototipo sin validez oficial"; eliminar RENAPO/PNT/blockchain/LFEA; QR/hash → identificador de trazabilidad no jurídico.
[MÓDULO] `MunicipalLettersView.tsx`

---

### E4 · Hacienda Pública (LGCG)

**[HALLAZGO 1]** `/api/create-payment-intent` (`server.ts:198-216`) crea PaymentIntent pero NO hay webhook `payment_intent.succeeded`, ni `constructEvent`, ni folio, ni partida de ingreso, ni conciliación. Un cobro puede completarse en Stripe sin registro municipal. Violación LGCG (registro al devengarse).
[RECOMENDACIÓN] Webhook con `constructEvent` + folio oficial + partida de ingreso + conciliación diaria.
[MÓDULO] `server.ts`

**[HALLAZGO 2]** `STRIPE_SECRET_KEY` vacía en `.env` → `getStripe()` retorna null, endpoint siempre 500. Frontend nunca llama al endpoint: el "pago digital" es **código muerto**. Modo test/prod indeterminado.
[RECOMENDACIÓN] Definir ambiente (sk_test/sk_live) o eliminar endpoint hasta flujo real.
[MÓDULO] `server.ts` · `.env.example`

**[HALLAZGO 3]** `MunicipalLettersView.tsx` emite "Constancia de No Adeudo Municipal" que certifica "al corriente de obligaciones fiscales… Impuesto Predial… agua potable" SIN consultar Tesorería/catastro real. Certificación fiscal apócrifa.
[RECOMENDACIÓN] Desactivar hasta integración con Tesorería; leyenda "sin validez fiscal".
[MÓDULO] `MunicipalLettersView.tsx`

---

## 📋 BACKLOG ESTRATÉGICO (Top 5, sin ideas nuevas)

1. **[E3 CRÍTICO] Rotar y retirar `firebase-applet-config.json` del repo** — clave expuesta en 14 blobs. *(impacto crítico, esfuerzo medio)*
2. **[E3 CRÍTICO] Cerrar `firestore.rules` de `perfiles_salud`** — hoy cualquier autenticado lee datos de salud. *(impacto crítico, esfuerzo bajo)*
3. **[E2+E3+E4] Desactivar emisión de constancias con validez jurídica/fiscal falsa** en `MunicipalLettersView.tsx` — riesgo de falsedad documental. *(impacto crítico, esfuerzo medio)*
4. **[E3 ALTA] Corregir `storage.rules` (base `(default)` → real)** — control de acceso de Storage inválido. *(impacto alto, esfuerzo bajo)*
5. **[E4] Definir/eliminar la pasarela Stripe huérfana** — cobro sin registro contable. *(impacto alto, esfuerzo medio)*

---

## 📄 DOCUMENTO RESGUARDADO

`docs/actas/Acta_006_Gabinete_Comision_Seguridad_Finanzas.md`

---

*Acta de comisión del Gabinete de Especialistas — 13 agosto 2026*
*Voto humano decisivo: Miguel Alexis Pérez Aguilar.*
