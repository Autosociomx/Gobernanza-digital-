# AUDITORÍA QA — Gobernanza Digital / ConnectX
## Agente de Verificación Independiente · Estado real del sistema

> **Metodología:** Revisión de código fuente, TypeScript check, análisis de 
> dependencias, verificación de variables de entorno y flujos de datos.
> Sin suposiciones. Solo lo que está en el código.

---

## SEMÁFORO GENERAL

| Capa | Estado | Crítico |
|------|--------|---------|
| UI / Frontend React | 🟡 PARCIAL | No |
| Backend Express + SQLite | 🟡 PARCIAL | No |
| IA (Gemini API) | 🔴 BLOQUEADO | **SÍ** |
| Firebase / Firestore | 🟡 CONFIGURADO | No |
| Google Maps | 🔴 BLOQUEADO | No |
| TypeScript (lint) | 🔴 FALLA | No |
| Deploy / Producción | 🔴 NO HECHO | **SÍ** |
| Seguridad básica | 🟡 RIESGO LEVE | No |

---

## BLOQUE 1 · CRÍTICOS — Bloquean funcionalidad core

### ❌ C-01 · GEMINI_API_KEY no configurada
**Archivo:** `server.ts:66` · `.env.example`  
**Síntoma:** El endpoint `/api/ai/chat` devuelve HTTP 500 con mensaje:  
`"GEMINI_API_KEY no configurada. Por favor, añádela en Settings > Secrets."`  
**Impacto:** El asistente IA — pieza central del ecosistema — no funciona.  
**Fix:** En Google AI Studio → Settings → Secrets → añadir `GEMINI_API_KEY`  
**Prioridad:** INMEDIATA

---

### ❌ C-02 · Chat UI no conecta al backend
**Archivo:** `src/components/GeraldineLanding.tsx:107-116`  
**Síntoma:** La función `handleSend()` usa un `setTimeout` con respuesta mock.  
Nunca llama a `/api/ai/chat`. El chat es decorativo, no funcional.  
**Impacto:** El ciudadano escribe y recibe siempre la misma respuesta genérica.  
**Fix:** Reemplazar mock por `fetch('/api/ai/chat', {method:'POST', body:...})`  
**Prioridad:** ALTA

---

### ❌ C-03 · System prompt genérico — no usa CONNECTX-CORE
**Archivo:** `server.ts:78-81`  
**Síntoma:** El endpoint `/api/ai/chat` tiene un system instruction inline 
genérico ("Consultor Senior"). No usa el prompt maestro CONNECTX_SYSTEM_PROMPT.md  
**Impacto:** El modelo no tiene el marco de ciencia política, los perfiles 
ciudadanos, ni los patrones PNL definidos.  
**Fix:** Cargar el contenido de CONNECTX_SYSTEM_PROMPT.md como system instruction  
**Prioridad:** ALTA

---

### ❌ C-04 · No hay deploy a producción
**Situación:** La app corre en Google AI Studio (entorno de desarrollo).  
No existe configuración de Cloud Run, Vercel, ni Firebase Hosting.  
**Impacto:** La app es inaccesible para ciudadanos reales. Lentitud porque 
corre en modo dev sin bundle optimization.  
**Fix:** `npm run build` + deploy a Cloud Run o Vercel  
**Prioridad:** ALTA para ir a producción

---

## BLOQUE 2 · ALTOS — Degradan funcionalidad

### ⚠️ A-01 · TypeScript lint falla (19+ errores)
**Archivos:** `server.ts`, `src/App.tsx` y todos los componentes  
**Causa:** `tsconfig.json` no incluye `"types": ["node"]`.  
El compilador trata server.ts como código browser.  
**Impacto:** `npm run lint` falla. En Google AI Studio no afecta runtime 
(Vite ignora errores de tipo), pero es señal de deuda técnica.  
**Fix:** Añadir `"types": ["node"]` al tsconfig  
**Prioridad:** MEDIA (no bloquea en AI Studio)

---

### ⚠️ A-02 · Google Maps API Key no configurada
**Archivo:** `src/components/NayaritMap.tsx`  
**Síntoma:** El componente NayaritMap es un stub — solo muestra un placeholder.  
La key `GOOGLE_MAPS_PLATFORM_KEY` está vacía en `.env.example`  
**Impacto:** La funcionalidad de trazabilidad geográfica no existe aún.  
**Fix:** Configurar key en Google Cloud Console + añadir a Secrets en AI Studio

---

### ⚠️ A-03 · Firebase API Key expuesta en repositorio
**Archivo:** `firebase-applet-config.json`  
**Situación:** El `apiKey` de Firebase está hardcodeado y committeado:  
`"apiKey": "AIzaSyAvHmKWfb_IikrvLYdLBH5WUQFse_1s8I4"`  
**Riesgo real:** Las Firebase API keys son públicas por diseño — 
el acceso real lo controlan las `firestore.rules`.  
**Verificar:** Que `firestore.rules` tenga reglas estrictas (no `allow read, write: if true`)  
**Fix corto plazo:** Mover config a variables de entorno. Revisar Firestore rules.

---

### ⚠️ A-04 · government_data.db no está en .gitignore
**Archivo:** `.gitignore`  
**Síntoma:** Si SQLite genera el archivo, se committeará con datos de gobierno.  
**Fix:** Añadir `government_data.db` al .gitignore  
**Prioridad:** INMEDIATA (prevención)

---

## BLOQUE 3 · MEDIOS — Deuda técnica acumulada

### 🟡 M-01 · 6 componentes huérfanos sin usar
**Archivos no importados en ningún componente activo:**
```
src/components/CitizenOS.tsx
src/components/DepartmentManager.tsx
src/components/MandoCentral.tsx
src/components/ModularBrain.tsx
src/components/SovereignMap.tsx
src/components/TesisCienciaPolitica.tsx
```
**Impacto:** El bundle de producción los incluirá innecesariamente.  
**Acción:** Eliminar o integrar. No dejarlos flotando.

---

### 🟡 M-02 · ErrorBoundary existe pero no protege la app
**Archivo:** `src/components/ErrorBoundary.tsx`  
**Situación:** El componente está creado pero `src/main.tsx` no lo usa.  
**Impacto:** Un error en cualquier componente derrumba toda la app sin mensaje.  
**Fix:** Envolver `<App />` en `<ErrorBoundary>` en main.tsx

---

### 🟡 M-03 · ExecutiveFolder no genera PDF real
**Archivo:** `src/components/ExecutiveFolder.tsx`  
**Situación:** `jsPDF` está instalado pero el botón hace `alert()` con mensaje  
explicativo en lugar de generar el documento.  
**Impacto:** Feature prometida que no existe aún.

---

### 🟡 M-04 · C5Dashboard chat no conecta a IA
**Archivo:** `src/components/C5Dashboard.tsx`  
**Situación:** El chat del dashboard gobierno tampoco conecta al endpoint real.  
Mismo problema que C-02 pero en la vista de funcionarios.

---

### 🟡 M-05 · No hay validación de variables de entorno al arrancar
**Archivo:** `server.ts`  
**Situación:** El servidor arranca aunque `GEMINI_API_KEY` esté vacía.  
El error solo aparece cuando alguien hace una petición al chat.  
**Fix:** Validar al inicio y loggear advertencia clara.

---

## BLOQUE 4 · BAJOS — Polish y mejoras futuras

| ID | Descripción | Archivo |
|----|-------------|---------|
| B-01 | No hay página 404 para rutas desconocidas | `server.ts` |
| B-02 | No hay rate limiting en `/api/ai/chat` (costo de API) | `server.ts` |
| B-03 | No hay autenticación en endpoints `/api/departments` | `server.ts` |
| B-04 | `metadata.json` no documenta la versión actual | `metadata.json` |
| B-05 | NayaritMap es stub sin datos reales de colonias | `NayaritMap.tsx` |
| B-06 | No hay tests unitarios en ningún componente | — |
| B-07 | No hay CI/CD pipeline configurado | — |

---

## BLOQUE 5 · CHECKLIST DE VERIFICACIÓN ANTES DE DEMO

Usa esto antes de mostrar el sistema a alguien:

```
PRE-DEMO CHECKLIST
══════════════════

ENTORNO
  [ ] GEMINI_API_KEY configurada en AI Studio Secrets
  [ ] App corriendo sin errores en consola del navegador
  [ ] Endpoint /api/ai/chat responde (probar con curl o Postman)

FUNCIONALIDAD MÍNIMA VIABLE
  [ ] Landing carga con animaciones Ojos de Dios
  [ ] Botón "Terminal de Acceso" abre dropdown
  [ ] Navegación entre las 5 vistas funciona
  [ ] Chat envía mensaje y recibe respuesta de Gemini (no mock)
  [ ] C5 Dashboard muestra KPIs y actividad reciente
  [ ] Citizen App muestra categorías y reportes de ejemplo

DATOS Y SEGURIDAD
  [ ] Firestore rules NO son "allow read, write: if true"
  [ ] government_data.db está en .gitignore
  [ ] No hay console.log con datos sensibles

RENDIMIENTO
  [ ] Página principal carga en menos de 3 segundos
  [ ] Chat responde en menos de 5 segundos
  [ ] Sin errores en consola de navegador

MOBILE
  [ ] Landing es legible en pantalla de 375px
  [ ] Botones son tocables (mínimo 44x44px)
  [ ] Chat es usable en móvil
```

---

## BLOQUE 6 · PLAN DE ACCIÓN PRIORIZADO

```
SPRINT 1 — Esta semana (lo mínimo para funcionar de verdad)
═══════════════════════════════════════════════════════════
  [1] Configurar GEMINI_API_KEY en AI Studio Secrets
  [2] Conectar ChatIA al endpoint real /api/ai/chat  
  [3] Cargar CONNECTX-CORE como system instruction del servidor
  [4] Añadir government_data.db a .gitignore
  [5] Verificar reglas de Firestore

SPRINT 2 — Siguiente semana (calidad de código)
═══════════════════════════════════════════════
  [6] Fix tsconfig para eliminar errores TypeScript
  [7] Envolver App con ErrorBoundary
  [8] Eliminar o integrar componentes huérfanos
  [9] Añadir validación de env vars al startup del servidor

SPRINT 3 — Para el demo ejecutivo (features completas)
══════════════════════════════════════════════════════
  [10] Implementar generación real de PDF en ExecutiveFolder
  [11] Conectar C5Dashboard chat a IA
  [12] Configurar Google Maps para NayaritMap
  [13] Build + deploy a Cloud Run / Vercel
  [14] Rate limiting en endpoints de IA
```

---

## VEREDICTO FINAL

**El sistema tiene buenas bases y arquitectura correcta.**  
No es humo: el código existe, los componentes funcionan visualmente,  
Firebase está conectado, el servidor Express está bien estructurado  
y el endpoint de IA está implementado correctamente.

**El problema principal es que las piezas no están conectadas entre sí.**  
La UI no habla con el backend. El backend no usa el prompt maestro.  
El sistema no está desplegado para usuarios reales.

**Estimado para tener un MVP funcional real: 4-6 horas de trabajo enfocado.**  
Empezando por C-01, C-02 y C-03 en ese orden.

---

*Auditoría generada: 2026-06-13*  
*Repositorio: Autosociomx/Gobernanza-digital-*  
*Branch: claude/google-id-studio-review-h6rt6y*
