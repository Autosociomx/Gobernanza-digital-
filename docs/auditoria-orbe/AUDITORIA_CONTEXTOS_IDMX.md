# Auditoría Context.OS e ID.mx — evidencia trazable

**Repositorio:** Autosociomx/Gobernanza-digital- · **Rama:** main · **Fecha:** 2026-08-14

> Esta es la **segunda auditoría**, específica de los dos conceptos que Miguel introdujo en la conversación: **Context.OS** (capa de interoperabilidad/orquestación de contexto) e **ID.mx** (capa de identidad). Responde las 10 preguntas clave con evidencia de archivo/ruta.

---

## Respuesta a las 10 preguntas

### 1. ¿Qué código constituye realmente Context.OS?

**🔴 No existe un componente ni servicio llamado "Context.OS".**

Lo único que se aproxima es:

| Elemento | Archivo | Qué es realmente |
|---|---|---|
| **COP 1.0** (Context Operating Protocol) | `docs/orbe/cop.html` | Herramienta HTML estática de **generación de prompts** para editar módulos. NO es runtime, NO es un sistema operativo de contexto |
| `useAuraChat.ts` (getPageContext) | `src/hooks/useAuraChat.ts` | Arma una **cadena de texto** de contexto de página (pestaña, nombre, idioma, conexión) y la manda al backend |
| `server.ts` `/api/ai/chat` | `server.ts` | Recibe `message` + `context` (string) y lo pasa a Gemini. **No hay orquestación de contexto entre módulos** |

**Conclusión:** "Context.OS" es un **nombre de marca/futuro**, no código. El mecanismo real hoy es `getPageContext()` → string → Gemini. No hay bus, no hay grafo de contexto en runtime, no hay interoperabilidad.

### 2. ¿Qué quedó de COP?

| Aspecto | Estado | Evidencia |
|---|---|---|
| COP como estándar | 🔵 propuesta | `cop.html:840` lo llama "COP 1.0 (Context Operating Protocol)" |
| COP como tool de desarrollo | 🟢 funciona (HTML estático) | `cop.html` genera un bloque de contexto para pegar en una IA |
| COP como runtime productivo | 🔴 no existe | no hay servidor que consuma COP; es un prompt-generator de frontend |

**Conclusión:** COP sobrevive como **herramienta interna de documentación/gobernanza**, no como capa de sistema. Es correcto: no debe presentarse como componente productivo.

### 3. ¿Qué es realmente ID.mx en el repositorio?

**🔴 No existe.** `grep -i "id.mx|idmx"` devuelve **cero resultados** en `docs/`, `src/`, `public/`.

Lo que existe en su lugar:

| Concepto real | Archivo | Estado |
|---|---|---|
| Login Google OAuth | `src/firebase.ts:68` `signInWithPopup(auth, googleProvider)` | 🟢 funcional |
| "Llave e Identidad (Llave MX + Llave Infantil)" | `docs/orbe/modulos/LLAVE_IDENTIDAD.md` | 🔵 propuesta |
| SINISI | `docs/marco/soberania-digital-infantil/` | 🔵 propuesta legislativa |
| CURP como campo | `SaludNayaritID.tsx` (colección `perfiles_salud`) | 🟡 string sin validación RENAPO |

**Conclusión:** "ID.mx" es un **nombre de marca/futuro** para la capa de identidad. Hoy la identidad real es **Google OAuth + CURP como campo de texto**. No hay integración con Llave MX ni con RENAPO.

### 4. ¿Qué partes son funcionales?

| Componente | Funcionalidad real | Evidencia |
|---|---|---|
| Aura (chat) | 🟢 conversación vía Gemini | `useAuraChat.ts` + `server.ts:/api/ai/chat` |
| Aura (voz) | 🟢 español (Web Speech API) | `useAuraVoice.ts` |
| Perfil de salud CURP | 🟡 parcial (reglas sin test) | `SaludNayaritID.tsx` |
| Pagos | 🟠 demo (Stripe backend, UI con datos fijos) | `server.ts:/api/create-payment-intent` + `CitizenApp.tsx` |
| Departments CRUD | 🟢 funcional (SQLite) | `server.ts:/api/departments` |
| Pulso Nayarit | 🟡 código backend, sin URL pública | `pulso-nayarit/` |

### 5. ¿Qué partes son arquitectura (propuesta)?

| Concepto | Estado | Evidencia |
|---|---|---|
| Orquestación de módulos | 🔵 diseño | `ORBE_NUCLEO.md`: "orquestación de eventos... en diseño" |
| Bus de eventos | 🔵 pendiente | `ORBE_NUCLEO.md`: "Definir el bus de eventos formal" |
| Context.OS | 🔵 nombre de futuro | sin código |
| ID.mx | 🔵 nombre de futuro | sin código |
| Llave MX / SINISI | 🔵 propuesta | `LLAVE_IDENTIDAD.md`, `soberania-digital-infantil/` |
| Interoperabilidad gubernamental | 🔵 diseñado, cero implementado | `server.ts` sin endpoints gubernamentales |

### 6. ¿Qué puede interoperar actualmente?

**🔴 Nada con sistemas institucionales externos.**

`server.ts` expone solo 8 endpoints, todos internos:
```
GET  /api/departments
POST /api/departments
DELETE /api/departments/:id
PUT  /api/departments/:id
POST /api/ai/chat
POST /api/ai/risk-analysis
POST /api/create-payment-intent
GET  * (SPA)
```

No hay ningún endpoint a RENAPO, SAT, catastro, SIAPA, ni Llave MX. El único "interoperabilidad" es Firebase (auth/firestore/storage) y Supabase (pulso-nayarit). **La interoperabilidad gubernamental es cero.**

### 7. ¿Qué falta para conectarlo con un sistema externo?

1. **Convenios/autorizaciones** con RENAPO, SAT, catastro, SIAPA, ATDT.
2. **Endpoints de integración** (hoy `server.ts` no tiene ninguno gubernamental).
3. **Sandbox de Llave MX** (ATDT) para identidad.
4. **Capa de permisos/scoping** en `/api/ai/chat` (hoy acepta cualquier `message`+`context` sin autorización por usuario).
5. **Firma electrónica avanzada** (PKI, certificados, HSM) — hoy solo OTP demostrativo.

### 8. ¿Qué puede demostrarse con una prueba reproducible?

| Prueba | Reproducible hoy | Evidencia |
|---|---|---|
| Build compila | ✅ | `npm run build` / `tsc --noEmit` = exit 0 |
| Aura responde vía backend | ✅ (si `GEMINI_API_KEY` configurada) | `server.ts:/api/ai/chat` |
| Voz español | ✅ en Chrome/Edge | `useAuraVoice.ts` |
| Departments CRUD | ✅ | `server.ts` + SQLite |
| **Reglas Firestore (8/8)** | 🔴 NO reproducible | sin test en repo |
| **Interoperabilidad** | 🔴 NO | sin endpoints |
| **Llave MX** | 🔴 NO | sin integración |

### 9. ¿Qué puede entregarse como repositorio?

✅ Lo que puede entregarse como **código verificable**:
- El frontend completo (`src/`), el backend (`server.ts`), el grafo documental (`docs/orbe/`), el expediente (`docs/presentacion-tepic/`), la auditoría (`docs/auditoria-orbe/`), y `pulso-nayarit/`.

🔴 Lo que **NO** puede entregarse como "hecho":
- Certificaciones, integraciones institucionales, pruebas de seguridad reproducibles.

### 10. ¿Qué debe quedar protegido como propiedad intelectual de ConnectaX?

| Activo | Tipo de protección sugerida |
|---|---|
| **SINISI** (diseño de identidad infantil, doble anonimato, token) | 🔐 Diseño/arquitectura — registrar antes de publicar |
| **COP 1.0** (metodología de contexto) | 🔐 Metodología — proteger como know-how |
| **Modelo de negocio** (licenciamiento B2G, fases) | 🔐 `NAYARIT_DIGITAL_V2.md` — confidencial |
| **Código fuente** | 🔐 licencia explícita (hoy no declarada) |
| **Datos de piloto** | 🔐 del municipio, no de ConnectaX |

**Recomendación:** definir una licencia explícita en el repo (hoy no hay `LICENSE` verificable) y marcar `docs/interno/` como confidencial.

---

## Dictamen de Context.OS e ID.mx

| Concepto | Veredicto |
|---|---|
| Context.OS | 🔴 **NO EXISTE como código.** Solo "COP 1.0" como tool HTML + `getPageContext()` como string. Nombre de futuro. |
| ID.mx | 🔴 **NO EXISTE como código.** Identidad real = Google OAuth + CURP string. Nombre de futuro. |
| COP | 🟢 herramienta interna de documentación, no runtime. |
| Interoperabilidad real | 🔴 cero (solo Firebase/Supabase internos). |

**Conclusión:** ni Context.OS ni ID.mx deben presentarse como algo construido. Deben presentarse como **nombres de arquitectura futura** sobre componentes reales: Aura (chat/voz) es real, COP es una tool de documentación, y la identidad real es Google OAuth. Cualquier presentación que diga "tenemos Context.OS" o "tenemos ID.mx" es tan falsa como la "Certificación Aura v2.6" que acabamos de eliminar.

---
*Auditoría documental. No se ejecutó prueba de penetración ni integración con sistemas externos.*
