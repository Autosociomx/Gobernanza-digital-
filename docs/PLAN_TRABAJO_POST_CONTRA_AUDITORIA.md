# PLAN DE TRABAJO — CORRECCIONES POST-CONTRA-AUDITORÍA
## Gobernanza Digital Tepic · Lo que está en nuestras manos

**Fecha:** 11 Agosto 2026
**Alcance:** Solo lo técnico y documental que NO depende de permisos del Ayuntamiento
**Fuente:** Contra-auditoría → `docs/contra-auditoria-lnetb-2026-08-11.md`

---

## 🔴 BLOQUE 1: CORRECCIONES URGENTES — Afirmaciones falsas que hay que eliminar

Estas son cosas que el código actual contradice directamente. No se puede presentar el proyecto a nadie mientras sigan en la documentación.

### 1.1 — Eliminar el "92.5%" de todos lados

| Qué | Dónde | Acción |
|---|---|---|
| "92.5% de cumplimiento LNETB" | `DeveloperChecklist.tsx` y cualquier presentación | Reemplazar por matriz de 4 estados del `MARCO_CUMPLIMIENTO_LNETB.md` |
| La metodología no existe, la fórmula no existe | — | No inventar una — simplemente no usar porcentajes |

**Regla de reemplazo:** Usar SOLO los 4 estados que ya definiste en `MARCO_CUMPLIMIENTO_LNETB.md`:
- **Operativo** — funciona hoy, demostrable en vivo
- **Operativo en demo** — funciona en entorno de demostración, falta convenio/datos reales
- **Preparado** — el código existe, falta credencial/convenio externo
- **Hoja de ruta** — planeado, no existe aún

### 1.2 — Corregir referencias a archivos inexistentes

| Afirmación falsa | Realidad | Corrección |
|---|---|---|
| `OrbeCentralView.tsx` | No existe | El frontend tiene `PlatformLanding.tsx` + `useAuraVoice.ts` + `useAuraChat.ts`. Describir la arquitectura real |
| `UniversalOrderNav.tsx` | No existe | La navegación está en `App.tsx` con `useState<ViewType>` + `VALID_VIEWS`. Describirla como "navegación por estado con lazy loading" |

### 1.3 — Reclasificar AuraCertificationSeal

| Afirmación falsa | Realidad | Corrección |
|---|---|---|
| "Sello Digital, Hash SHA-256 y QR de autenticidad" | Es un badge decorativo: gradiente CSS + 3 estrellas + texto "Certificación Aura v2.6" + ícono Award | Reclasificar como "Badge visual de marca — no es un mecanismo criptográfico" |

### 1.4 — Corregir descripción de server.ts

| Afirmación falsa | Realidad | Corrección |
|---|---|---|
| "API Gateway para Catastro, SIAPA y Registro Civil" | server.ts tiene: departments CRUD, Gemini AI chat, Gemini risk analysis, Stripe payments | Describir correctamente: "API server con IA (Gemini), pagos (Stripe) y base de datos local (SQLite)" |

### 1.5 — Corregir estatus de interoperabilidad gubernamental

| Afirmación falsa | Realidad | Corrección |
|---|---|---|
| "Conexión RENAPO — 🟠 Prototipo / Simulación Sintáctica" | No existe código de validación CURP en server.ts ni en frontend. grep('validarCURP') → 0 resultados | Cambiar a: 🔴 Inexistente |
| "Firma FIEL Funcionario — 🟠 Requiere Asignación Institucional" | No existe código de firma ni generación de hash para documentos | Cambiar a: 🔴 Inexistente |

## 🟡 BLOQUE 2: IMPLEMENTACIONES TÉCNICAS — Lo que SÍ podemos construir

### 2.1 — Validación sintáctica de CURP en el servidor

**Estado actual:** No existe. Cero código de validación CURP.
**Qué hacer:** Implementar endpoint `/api/identidad/validar-curp` en `server.ts` con:
- Regex de formato CURP (4 letras + 6 dígitos + H/M + 5 letras + dígito verificador)
- Validación de entidad federativa (catálogo de 32 entidades)
- Validación de fecha de nacimiento
- Algoritmo de dígito verificador RENAPO (18 caracteres)
- Respuesta: `{ valida: true/false, datos: { sexo, entidad, fechaNac }, tipo: 'sintactica' }`

**Archivos a modificar:** `server.ts` (agregar endpoint)
**Tiempo estimado:** 1 hora

### 2.2 — Endpoint del trámite Constancia de Residencia

**Estado actual:** Solo existe el frontend HTML demostrativo en `gobernanza-digitalcx/modulos/tramites/constancia-residencia/`. No hay backend.
**Qué hacer:** Implementar endpoints en `server.ts`:

```
POST /api/tramites/constancia-residencia/iniciar
  → recibe CURP → valida sintaxis → crea registro → devuelve folio

POST /api/tramites/constancia-residencia/validar-domicilio  
  → recibe folio + CP → valida rango Tepic (63000-63519) → actualiza estado

POST /api/tramites/constancia-residencia/firmar
  → recibe folio + OTP → verifica código → marca como firmado

GET /api/tramites/constancia-residencia/estado/:folio
  → devuelve estado actual + trazabilidad

GET /api/tramites/constancia-residencia/descargar/:folio
  → genera PDF/JSON con datos + hash + QR de verificación
```

**Tabla SQLite nueva:** `tramites_constancia_residencia`
**Tiempo estimado:** 3-4 horas

### 2.3 — Generación de hash SHA-256 + QR con verificación real

**Estado actual:** El QR del prototipo frontend contiene datos estáticos embebidos. No verifica contra backend.
**Qué hacer:**
1. Endpoint `GET /api/verificar/:hash` que reciba el hash y devuelva los datos del trámite
2. El QR en el frontend apunta a `https://tepic.netlify.app/verificar?hash=ABC123`
3. Página de verificación pública que muestra: folio, nombre, domicilio, fecha, firma, hash

**Tiempo estimado:** 2 horas

### 2.4 — Esquema de expediente digital en Firestore

**Estado actual:** Firestore está configurado pero sin esquema de expediente.
**Qué hacer:** Definir e implementar colecciones:

```
expedientes/{curp_hash}/
  ├── datos_basicos: { nombre_hash, entidad, sexo }
  ├── tramites/{folio}/
  │     ├── solicitud: { tipo, fecha, estado }
  │     ├── documentos: []
  │     ├── resolucion: { fecha, resultado, firmante }
  │     └── eventos[]: { timestamp, tipo, descripcion, usuario_id, hash_anterior }
  └── auditoria/{eventoId}: { timestamp, accion, usuario, ip }
```

**Reglas Firestore:** Solo el titular (curp_hash) puede leer. Solo funcionarios pueden escribir.

**Tiempo estimado:** 3-4 horas

### 2.5 — Mecanismo de firma simple (OTP + hash)

**Estado actual:** El prototipo frontend tiene un OTP hardcodeado (123456).
**Qué hacer:**
1. Endpoint `POST /api/auth/otp/solicitar` → genera código aleatorio de 6 dígitos, lo almacena con TTL de 10 min
2. Endpoint `POST /api/auth/otp/verificar` → valida código, devuelve token de sesión temporal
3. Endpoint `POST /api/tramites/.../firmar` → requiere token OTP válido + genera hash SHA-256 del documento

**Nota importante en documentación:** "Este mecanismo demuestra el flujo técnico de firma. NO constituye firma electrónica avanzada con validez jurídica plena. La e.firma oficial requiere convenio con el SAT y será implementada cuando el Ayuntamiento lo autorice."

**Tiempo estimado:** 2-3 horas

### 2.6 — Auditoría WCAG automatizada

**Estado actual:** "Lighthouse Accessibility 100" declarado sin evidencia.
**Qué hacer:**
1. Ejecutar Lighthouse en todas las vistas (landing, C5, citizen, dev, executive)
2. Tomar screenshots de los resultados
3. Documentar hallazgos reales (no inventar números)
4. Corregir issues encontrados (atributos aria faltantes, contraste, etc.)
5. Guardar reportes en `docs/auditoria/accesibilidad/`

**Tiempo estimado:** 3-4 horas

### 2.7 — Rotar llave de Gemini

**Estado actual:** Documentado en `PROTOCOLO_SEGURIDAD.md`: "la llave de Gemini fue expuesta al bundle en cuatro ocasiones... el historial de git conserva los valores expuestos. Rotar = generar llave nueva y revocar la anterior."

**Qué hacer:**
1. Generar nueva API key en Google AI Studio
2. Revocar la anterior
3. Actualizar `.env` local
4. Verificar que la guardia de regresiones pasa

**Tiempo estimado:** 15 minutos

## 🟢 BLOQUE 3: MEJORAS DOCUMENTALES — Para llegar impecables a la reunión

### 3.1 — Un solo documento de cumplimiento LNETB

**Estado actual:** Disperso entre `MARCO_CUMPLIMIENTO_LNETB.md`, `DeveloperChecklist.tsx`, `BIBLIOTECA_LEGAL.md`, y la contra-auditoría.
**Qué hacer:** Crear `docs/presentacion/MATRIZ_LNETB_TEPIC.md`:
- Una tabla por artículo aplicable
- SOLO los 4 estados honestos
- Columna "Evidencia" con archivo y línea de código
- Columna "Depende de" (Nosotros / Ayuntamiento / Estado / Federación)
- Sin porcentajes. Sin "92.5%". Sin "certificado".

### 3.2 — One-pager ejecutivo para el Ayuntamiento

**Qué hacer:** Crear `docs/presentacion/ONE_PAGER_TEPIC.md` — máximo 1 página:
- Qué es el laboratorio (3 líneas)
- Qué problema resuelve (3 líneas)
- Qué demostramos hoy (5 bullets con checkmarks de lo que SÍ funciona)
- Qué necesitamos del Ayuntamiento (5 bullets claros)
- Próximos pasos (3 bullets)

### 3.3 — Documentar lo que NO existe (igual de importante)

**Qué hacer:** Crear `docs/presentacion/LO_QUE_FALTA.md`:
- Lista honesta de todo lo que el sistema NO tiene hoy
- Separado en: "Depende de nosotros" vs "Depende del Ayuntamiento" vs "Depende de convenios externos"
- Esto genera confianza — demuestra que no estamos ocultando nada

### 3.4 — Actualizar DeveloperChecklist.tsx

**Qué hacer:** El componente actual de 20 fases debe reflejar los hallazgos de la contra-auditoría:
- Eliminar referencias a archivos inexistentes
- Estados reales (no "cumple" donde no hay evidencia)
- Incluir enlaces a la contra-auditoría

---

## 📋 ORDEN DE EJECUCIÓN

| # | Tarea | Bloque | Prioridad | Tiempo | Depende de |
|---|---|---|---|---|---|
| 1 | Rotar llave Gemini | 2 | 🔴 P0 | 15 min | — |
| 2 | Implementar validación CURP en server.ts | 2 | 🟠 P1 | 1 h | — |
| 3 | Endpoints del trámite en server.ts | 2 | 🟠 P1 | 4 h | #2 |
| 4 | Hash + QR con verificación | 2 | 🟠 P1 | 2 h | #3 |
| 5 | Firma simple OTP en server.ts | 2 | 🟡 P2 | 3 h | #3 |
| 6 | Esquema expediente Firestore | 2 | 🟡 P2 | 4 h | — |
| 7 | Auditoría WCAG automatizada | 2 | 🟡 P2 | 4 h | — |
| 8 | Matriz LNETB unificada | 3 | 🟠 P1 | 2 h | — |
| 9 | One-pager ejecutivo | 3 | 🟠 P1 | 1 h | #8 |
| 10 | Documento "Lo que falta" | 3 | 🟡 P2 | 1 h | — |
| 11 | Actualizar DeveloperChecklist | 3 | 🟡 P2 | 2 h | #1-7 |
| 12 | Corregir afirmaciones falsas en componentes | 1 | 🔴 P0 | 2 h | — |

**Tiempo total estimado:** ~26 horas de trabajo
**Entregable final:** Repositorio listo para presentación institucional con:
- Backend funcional del trámite (server.ts)
- Documentación honesta y verificable
- Cero afirmaciones falsas
- Claridad absoluta sobre qué depende de nosotros y qué del Ayuntamiento

---

## ⚡ ARRANQUE INMEDIATO

Si te parece, empiezo AHORA con:

1. **Rotar la llave Gemini** (15 min)
2. **Endpoint de validación CURP** en server.ts
3. **Endpoints del trámite** Constancia de Residencia

Y voy commiteando al repo. ¿Ok?
