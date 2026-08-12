# CONTRA-AUDITORÍA JURÍDICO-TÉCNICA
## Revisión del Dictamen LNETB — Piloto Tepic

**Fecha:** 11 Agosto 2026
**Repositorio fuente real:** `Gobernanza-digital-/` (workspace)
**Método:** Inspección directa de código fuente, documentación y estructura del repositorio

---

## A. ERRORES EN EL DICTAMEN ANTERIOR

### Error #1: El 92.5% es INSOSTENIBLE

| Análisis | Resultado |
|---|---|
| **Origen del 92.5%** | No se encuentra metodología, fórmula ni universo de obligaciones en ningún documento del repositorio |
| **¿De dónde salió?** | No es reproducible. Es una cifra sin respaldo matemático |
| **Veredicto** | 🔴 **ELIMINAR.** Sustituir por matriz sin porcentaje |

El propio `MARCO_CUMPLIMIENTO_LNETB.md` del repositorio establece una regla explícita: 
> "Prohibido declarar 'Cumple' a secas sin poder señalar archivo y flujo que lo demuestre."
> "Todo estado se declara con: Operativo / Operativo en demo / Preparado / Hoja de ruta."

El 92.5% contradice esta regla interna del proyecto.

### Error #2: OrbeCentralView.tsx y UniversalOrderNav.tsx NO EXISTEN

| Afirmación anterior | Realidad | Veredicto |
|---|---|---|
| "Orbe Central IA con voz multilingüe (Español, Cora, Wixarika)" en `OrbeCentralView.tsx` | El archivo `OrbeCentralView.tsx` **no existe** en el repositorio. El componente de voz (`useAuraVoice.ts`) documenta explícitamente: "cora y wixárika no tienen voz nativa" y "siempre usa es-MX" | 🔴 **Incorrecta** |
| "UniversalOrderNav.tsx con 5 carpetas" | El archivo `UniversalOrderNav.tsx` **no existe**. La navegación se implementa con `useState<ViewType>` básico en `App.tsx` con 5 vistas hardcodeadas | 🔴 **Incorrecta** |

**Verificación de código:**
- `App.tsx`: navegación con `useState` + `VALID_VIEWS = ['landing', 'c5', 'citizen', 'dev', 'executive']`
- `useAuraVoice.ts`: `const VOICE_LOCALE = 'es-MX'` — "cora y wixárika no tienen voz nativa"
- Búsqueda `find -name "OrbeCentralView*"` y `find -name "UniversalOrderNav*"` → **sin resultados**

### Error #3: AuraCertificationSeal NO es un sello criptográfico

| Afirmación anterior | Realidad | Veredicto |
|---|---|---|
| "Sello Digital, Hash SHA-256 y QR de autenticidad" | `AuraCertificationSeal.tsx` es un **componente decorativo**: gradiente CSS + 3 estrellas + texto "Certificación Aura v2.6" + ícono Award. **Cero criptografía.** No genera hash, no genera QR, no verifica nada | 🔴 **Incorrecta** |

**El código completo del componente:**
```tsx
<div className="...">
  <Star className="... fill-yellow-300" />  // ícono decorativo
  <Star className="... fill-yellow-300" />  // ícono decorativo
  <Star className="... fill-yellow-300" />  // ícono decorativo
  <span>Certificación Aura v2.6</span>      // texto hardcodeado
  <Award className="..." />                 // ícono decorativo
</div>
```

Esto no es un sello criptográfico. Es un badge visual. No debe presentarse como mecanismo de autenticidad documental.

### Error #4: server.ts NO es un "Nodo de Interoperabilidad" gubernamental

| Afirmación anterior | Realidad | Veredicto |
|---|---|---|
| "API Gateway para Catastro, SIAPA y Registro Civil" | El `server.ts` implementa: (1) CRUD de `departments` en SQLite, (2) endpoint `/api/ai/chat` con Gemini, (3) Stripe payments. **Cero endpoints** para catastro, SIAPA o registro civil. Búsqueda textual: "RENAPO", "catastro", "SIAPA" → 0 resultados | 🔴 **Incorrecta** |

### Error #5: "Conexión RENAPO / SAT" clasificada incorrectamente

| Afirmación anterior | Realidad | Veredicto |
|---|---|---|
| "🟠 Prototipo / Simulación Sintáctica" | No existe simulación siquiera. En el server.ts no hay endpoint de validación CURP. En el frontend no se encontró validación de CURP conectada a API alguna. La única mención de CURP está en documentación (`MODULO_SALUD_CURP.md`) | ⚫ **Debe ser 🔴 Inexistente** — ni siquiera hay simulación |

### Error #6: "Firma FIEL Funcionario" clasificada incorrectamente

| Afirmación anterior | Realidad | Veredicto |
|---|---|---|
| "🟠 Requiere Asignación Institucional" con "Generación de Hash SHA-256 local" | No se encontró ningún código que genere hash SHA-256 para firma de documentos. El `AuraCertificationSeal` no es un mecanismo de firma. El `server.ts` no tiene endpoints de firma. | ⚫ **Debe ser 🔴 Inexistente** |

---

## B. AFIRMACIONES QUE SÍ SE PUEDEN SOSTENER (con evidencia)

### B.1 — Arquitectura serverless + backend funcional

| Afirmación | Evidencia |
|---|---|
| Backend Express operativo | `server.ts`: Express + SQLite + Google Gemini AI + Stripe. Comando `npm run dev` funciona |
| Base de datos SQLite funcional | Tabla `departments` creada en `server.ts` línea ~35 |
| IA integrada (Gemini) | `@google/genai` en `server.ts`, endpoint `/api/ai/chat` |
| Stripe para pagos | `stripe` SDK en `server.ts`, endpoint `/api/create-payment-intent` |
| Firebase configurado | `src/firebase.ts`, `firebase-applet-config.json`, `firestore.rules`, `storage.rules` |

### B.2 — Frontend funcional con code-splitting

| Afirmación | Evidencia |
|---|---|
| 5 vistas lazy-loaded | `App.tsx`: landing, C5, citizen, dev, executive con `React.lazy()` |
| 30+ componentes | `src/components/` con CitizenApp, C5Dashboard, DeveloperChecklist, ExecutiveFolder, etc. |

### B.3 — Biblioteca legal real y verificada

| Afirmación | Evidencia |
|---|---|
| Marco jurídico documentado | `docs/marco/BIBLIOTECA_LEGAL.md`: 100+ ordenamientos con estatus VERIFICADO/POR VERIFICAR, fuentes primarias y análisis estratégico |
| Sistema de estados honesto | `MARCO_CUMPLIMIENTO_LNETB.md`: 4 estados (Operativo/Operativo en demo/Preparado/Hoja de ruta), prohibición explícita de "Cumple" sin evidencia |

### B.4 — Protocolo de seguridad documentado

| Afirmación | Evidencia |
|---|---|
| Protocolo de secretos | `PROTOCOLO_SEGURIDAD.md`: reglas para API keys, historial de incidentes, guardia de regresiones |
| Guardia CI automatizada | `.github/workflows/guardia-regresiones.yml` y `scripts/verificar-regresiones.mjs` |

### B.5 — Netlify + Firebase infraestructura

| Afirmación | Evidencia |
|---|---|
| Deploy configurado | `netlify.toml` con headers de seguridad (HSTS, X-Frame-Options, nosniff) |
| HTTPS forzado | Configurado en `netlify.toml` |

---

## C. AFIRMACIONES QUE DEBEN ELIMINARSE O CORREGIRSE

| # | Afirmación | Problema | Corrección |
|---|---|---|---|
| 1 | "92.5% de cumplimiento LNETB" | Sin metodología, sin fórmula, sin universo de obligaciones | Eliminar. Usar solo matriz de estados |
| 2 | "OrbeCentralView.tsx con voz multilingüe" | No existe el archivo; la voz es solo español | Eliminar referencia a archivo inexistente. Corregir: "Web Speech API en español" |
| 3 | "UniversalOrderNav.tsx" | No existe el archivo | Eliminar. Describir la navegación real (App.tsx con useState) |
| 4 | "Sello Digital SHA-256 y QR" en AuraCertificationSeal | El componente es decorativo, no criptográfico | Eliminar la afirmación. Describir como "badge visual decorativo" |
| 5 | "API Gateway para Catastro, SIAPA y Registro Civil" | No existe en server.ts | Eliminar. server.ts tiene departments CRUD + AI + Stripe, no interoperabilidad gubernamental |
| 6 | "Firma FIEL / HSM / Vault" | No existe código de firma criptográfica | Eliminar. No hay infraestructura de firma electrónica |
| 7 | "Conexión RENAPO (simulación)" | Ni siquiera hay simulación | Eliminar. Estado real: Inexistente |
| 8 | "WCAG 2.1 AA verificado" | Solo un `role="status"` encontrado. Sin evidencia de auditoría WCAG | Corregir a: "WCAG no verificado. Accesibilidad básica implementada (atributos aria mínimos)" |
| 9 | "Lighthouse Accessibility 100" | No se encontró evidencia de prueba Lighthouse | Eliminar o proporcionar evidencia (screenshot/reporte) |
| 10 | "Dictamen de Certificación" | No existe como documento formal | El dictamen del prompt anterior es una autoevaluación del propio sistema, no un dictamen externo |

---

## D. REQUISITOS JURÍDICOS PENDIENTES

| # | Requisito | Fundamento | Estado real | Qué falta |
|---|---|---|---|---|
| D1 | Fundamento legal del trámite de Constancia de Residencia | Reglamento/Bando municipal | 🔵 NO VERIFICADO | El Ayuntamiento debe identificar el instrumento normativo que crea/sustenta el trámite |
| D2 | Acuerdo de Cabildo para operación del piloto | Ley Orgánica Municipal de Nayarit | 🔴 NO EXISTE | Aprobación formal del Ayuntamiento |
| D3 | Determinación AIR vs Exención | Arts. 35-38 LNETB | 🔵 NO VERIFICADO | El área de mejora regulatoria municipal debe determinarlo |
| D4 | Aviso de Privacidad publicado | LGPDPPSO | 🔴 NO EXISTE | Redactar y publicar conforme al artículo correspondiente de la LGPDPPSO |
| D5 | Designación de funcionario firmante | Reglamento Interior del Ayuntamiento | 🔴 NO EXISTE | El Ayuntamiento debe designar al servidor público autorizado |
| D6 | Registro en Catálogo Nacional de Trámites | LNETB Art. 75 | 🔴 NO EXISTE | Inscribir el trámite cuando esté operativo |

---

## E. REQUISITOS TECNOLÓGICOS PENDIENTES

| # | Requisito | Estado real | Qué falta |
|---|---|---|---|
| E1 | Backend del trámite de Constancia de Residencia | 🔴 NO EXISTE | server.ts no tiene endpoints de trámites. Hay que construirlos |
| E2 | Verificación de CURP contra fuente oficial | 🔴 NO EXISTE | Sin conexión a RENAPO, sin endpoint de validación CURP en server.ts |
| E3 | Firma electrónica con validez jurídica | 🔴 NO EXISTE | Sin infraestructura PKI, sin e.firma, sin HSM |
| E4 | QR de verificación conectado a backend | 🔴 NO EXISTE | El QR del prototipo en `constancia-residencia/index.html` contiene datos estáticos |
| E5 | Expediente digital persistente | 🟡 Firebase/Firestore configurado | Implementar esquema de expediente en Firestore con trazabilidad |
| E6 | Interoperabilidad con Catastro/SIAPA | 🔴 NO EXISTE | Sin endpoints, sin convenios, sin conexiones |
| E7 | Modo offline (Service Worker) | 🔴 NO EXISTE | No se encontró Service Worker registrado |
| E8 | Tests automatizados | 🟡 Existe 1 test (`infrastructureService.test.ts`) | Cobertura insuficiente |

---

## F. REQUISITOS INSTITUCIONALES PENDIENTES

| # | Requisito | Quién | Estado |
|---|---|---|---|
| F1 | Convenio de colaboración Ayuntamiento-Proponente | Ayuntamiento de Tepic | 🔴 No existe |
| F2 | Convenio de interoperabilidad con RENAPO | SEGOB/RENAPO + Ayuntamiento | 🔴 No existe |
| F3 | Convenio con SIAPA para consulta de cuentas | SIAPA Tepic + Ayuntamiento | 🔴 No existe |
| F4 | Acceso a catastro municipal | Dirección de Catastro Tepic | 🔴 No existe |
| F5 | Capacitación de funcionarios | Ayuntamiento | 🔴 No realizada |

---

## G. ANÁLISIS DE LOS 5 NIVELES (Regla 4)

Aplicando la distinción obligatoria de 5 niveles a los componentes principales:

| Componente | N1 (Código) | N2 (Funciona) | N3 (Integrado) | N4 (Autorizado) | N5 (Fundamento) |
|---|---|---|---|---|---|
| **Frontend React SPA** | ✅ | ✅ | ✅ (deployed) | N/A (público) | N/A |
| **server.ts Express** | ✅ | ✅ (local) | ❌ (sin deploy) | ❌ | ❌ |
| **Stripe (pagos)** | ✅ | ✅ (API) | 🟡 (sandbox?) | ❌ (requiere autorización municipal) | ❌ |
| **Gemini AI** | ✅ | ✅ | ✅ (API key) | ❌ (sin convenio) | N/A |
| **Firebase** | ✅ | ✅ | ✅ | ❌ (sin datos reales) | ❌ |
| **Validación CURP** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Firma electrónica** | ❌ | ❌ | ❌ | ❌ | ❌ |
| **Interoperabilidad** | ❌ | ❌ | ❌ | ❌ | ❌ |

**Conclusión:** El sistema alcanza Nivel 2 (código que funciona) en varios componentes. **Ningún componente alcanza Niveles 3-5** para funcionalidades con relevancia jurídica (identidad, firma, interoperabilidad).

---

## H. AUDITORÍA DE FIRMA (Regla 5)

**¿Qué hace actualmente el sistema?**
- Nada. No se encontró código de firma electrónica, generación de hash SHA-256 con propósito de firma, ni infraestructura PKI en el repositorio.

**¿Qué demuestra técnicamente?**
- Demuestra que puede hacer llamadas a APIs externas (Gemini, Stripe). Eso es todo.

**¿Qué NO demuestra jurídicamente?**
- No demuestra capacidad de firma electrónica. No demuestra autenticidad documental. No demuestra no repudio.

**¿Qué mecanismo oficial sería necesario?**
- e.firma (SAT) o mecanismo equivalente reconocido por la Ley de Firma Electrónica Avanzada y LNETB Art. 67.

**¿Quién tendría facultad para firmar?**
- El funcionario municipal designado por el Ayuntamiento.

**¿Qué infraestructura tendría que proporcionar la autoridad?**
- Certificados digitales, HSM o token criptográfico, software de firma.

**Conclusión obligatoria:**
> **¿El mecanismo actual puede producir una resolución jurídicamente atribuible a una autoridad?**
> 
> **NO.** No existe ningún mecanismo de firma electrónica en el código actual.

---

## I. AUDITORÍA DE INTEROPERABILIDAD (Regla 6)

| Integración | Estado real | Evidencia |
|---|---|---|
| **RENAPO (CURP)** | 🔴 Inexistente | Sin endpoint, sin SDK, sin simulación siquiera |
| **Catastro Tepic** | 🔴 Inexistente | Sin endpoint, sin conexión |
| **SIAPA Tepic** | 🔴 Inexistente | Sin endpoint, sin conexión |
| **Registro Civil** | 🔴 Inexistente | Sin endpoint, sin conexión |
| **SAT (e.firma)** | 🔴 Inexistente | Sin endpoint, sin SDK |
| **Gemini (Google AI)** | 🟢 Producción real | `@google/genai` en server.ts con API key |
| **Stripe** | 🟡 Configurado, pendiente de verificar si es sandbox o producción | SDK en server.ts, requiere STRIPE_SECRET_KEY |
| **Firebase** | 🟢 Producción real | Configuración completa en `src/firebase.ts` |

**Conclusión:**
> **"Nodo de Interoperabilidad" es una descripción incorrecta.** El servidor Express tiene integración con servicios cloud comerciales (Google AI, Stripe, Firebase). No tiene NINGUNA integración con sistemas gubernamentales mexicanos. La interoperabilidad gubernamental es CERO.

---

## J. AUDITORÍA DE CURP (Regla 7)

| Pregunta | Respuesta |
|---|---|
| ¿Qué papel jurídico tiene CURP? | Identificador único de población (LNETB Art. 66). Es el elemento central del modelo de identidad digital |
| ¿Qué función desempeña en el sistema? | **Ninguna.** No se encontró validación de CURP en el código fuente (ni sintáctica ni contra RENAPO) |
| ¿Cómo se valida? | **No se valida.** |
| ¿Contra qué fuente? | **Ninguna.** |
| ¿Quién autoriza la consulta? | **Nadie** — no hay consulta |
| ¿Qué mecanismo de interoperabilidad corresponde? | Servicio de consulta de CURP de RENAPO, previo convenio con SEGOB |

**Conclusión:**
> **"Validación sintáctica CURP con Regex" también es una afirmación sin respaldo.** No se encontró regex de validación CURP en `server.ts` ni en los componentes del frontend. La biblioteca legal menciona CURP como llave conceptual, pero no hay implementación.

---

## K. AUDITORÍA DE EXPEDIENTE ELECTRÓNICO (Regla 8)

| Elemento | Estado | Evidencia |
|---|---|---|
| Creación | ❌ | Sin endpoint de creación de expediente en server.ts |
| Identificación | ❌ | Sin identificador único |
| Documentos | ❌ | Sin almacenamiento de documentos del trámite |
| Versiones | ❌ | Sin versionado |
| Metadatos | ❌ | Sin metadatos |
| Integridad (hash) | ❌ | Sin cadena de hash |
| Firma | ❌ | Sin firma |
| Trazabilidad | 🟡 | Firestore está configurado pero sin esquema de expediente |
| Conservación | ❌ | Sin política de retención |
| Auditoría | ❌ | Sin logs de acceso |

**Conclusión:**
> **No existe expediente electrónico.** Firebase/Firestore está configurado como plataforma pero no tiene implementado el esquema de expediente. El `MARCO_CUMPLIMIENTO_LNETB.md` lo clasifica como "Operativo en demo" — pero en rigor, sin esquema de datos ni endpoints, está más cerca de "Preparado" (plataforma lista, sin implementación).

---

## L. AUDITORÍA DE ACCESIBILIDAD (Regla 11)

| Criterio | Estado | Evidencia |
|---|---|---|
| WCAG verificado | 🔴 NO VERIFICADO | Sin auditoría, sin reporte Lighthouse, sin screenshot |
| Contraste AA | 🔵 NO VERIFICABLE | La paleta declarada no ha sido evaluada |
| Navegación por teclado | 🔵 NO VERIFICABLE | Sin pruebas documentadas |
| Lector de pantalla | 🔵 NO VERIFICABLE | Sin pruebas con NVDA/JAWS/VoiceOver |
| Atributos aria | 🟡 Mínimo | Un `role="status"` y `aria-live="polite"` en App.tsx |
| Lenguas originarias | 🔴 NO IMPLEMENTADO | `useAuraVoice.ts` explícitamente: "cora y wixárika no tienen voz nativa" |
| Texto alternativo | 🔵 NO VERIFICABLE | Sin auditoría |

**Conclusión:**
> **"WCAG 2.1 AA verificado" y "Lighthouse Accessibility 100" son afirmaciones sin evidencia.** No se encontró ningún reporte de auditoría de accesibilidad en el repositorio. El código tiene accesibilidad básica (algunos atributos aria) pero no está verificado.

---

## M. AUDITORÍA DE AIR (Regla 12)

| Pregunta | Respuesta |
|---|---|
| ¿Qué autoridad determina si existe AIR? | El sujeto obligado (Ayuntamiento de Tepic), a través de su área de mejora regulatoria, conforme a los Lineamientos del Modelo Nacional |
| ¿La digitalización requiere AIR? | Depende. Si no se crean nuevas obligaciones ni costos, puede aplicar exención (Art. 36 LNETB). Si se modifica el procedimiento administrativo, podría requerirse |
| ¿Quién lo determina? | Exclusivamente el Ayuntamiento |
| ¿Qué documento debe presentarse? | AIR conforme al Art. 38 LNETB o solicitud de exención conforme al Art. 36 y Lineamientos |

**Conclusión:**
> **NO se puede afirmar que el trámite está exento.** Solo el Ayuntamiento puede determinarlo. La minuta AIR preparada en el expediente es una herramienta de apoyo, no una determinación oficial.

---

## N. ATAQUE ADVERSARIAL — 25 Objeciones Clave

| # | Objeción | Fundamento | Riesgo | Respuesta / Acción correctiva |
|---|---|---|---|---|
| 1 | "No hay convenio con el Ayuntamiento" | Sin personalidad jurídica para operar | ALTO | Firmar convenio antes de cualquier piloto |
| 2 | "No existe trámite digital — es una maqueta" | server.ts sin endpoints de trámite | CRÍTICO | Construir endpoints del trámite en server.ts |
| 3 | "La CURP no se verifica contra RENAPO" | LNETB Art. 66 | ALTO | Integrar cuando el Ayuntamiento obtenga el convenio |
| 4 | "No hay firma electrónica — el sello Aura es decorativo" | Ley de Firma Electrónica Avanzada | CRÍTICO | Implementar e.firma cuando el Ayuntamiento autorice |
| 5 | "92.5% es un número inventado" | Sin metodología | ALTO | Eliminar el porcentaje; usar solo matriz de estados |
| 6 | "OrbeCentralView.tsx no existe" | Afirmación falsa | MEDIO | Corregir documentación |
| 7 | "El server.ts no es un nodo de interoperabilidad" | Sin conexiones gubernamentales | ALTO | Rediseñar con conectores reales cuando haya convenios |
| 8 | "Lenguas originarias no implementadas" | useAuraVoice.ts solo español | MEDIO | Traducir interfaz (texto); la voz seguirá en español |
| 9 | "WCAG/Lighthouse no verificado" | Sin evidencia de auditoría | MEDIO | Realizar auditoría WCAG con herramienta |
| 10 | "No hay expediente digital implementado" | Firestore configurado pero sin esquema | ALTO | Implementar esquema en Firestore |
| 11 | "Datos en Firebase (Google Cloud — infraestructura extranjera)" | Soberanía de datos | MEDIO | Plan de migración cuando se requiera |
| 12 | "Gemini API key expuesta en historial de git" | PROTOCOLO_SEGURIDAD.md lo documenta | ALTO | Rotar llave (acción pendiente documentada) |
| 13 | "No hay notificaciones formales (SMS/email jurídico)" | Requisito de notificación administrativa | MEDIO | Implementar canal de notificación con acuse |
| 14 | "Sin plan de continuidad operativa" | Requisito de seguridad | MEDIO | Documentar plan de contingencia |
| 15 | "Sin separación de ambientes dev/prod" | Buenas prácticas | BAJO | Configurar entornos separados |
| 16 | "Sin pentest realizado" | Requisito de seguridad | MEDIO | Realizar antes de producción |
| 17 | "Sin capacitación de funcionarios" | Requisito operativo | MEDIO | Incluir en plan de implementación |
| 18 | "La constancia generada no tiene validez jurídica" | Sin firma de autoridad competente | CRÍTICO | Conectar firma institucional |
| 19 | "No hay registro en Catálogo Nacional de Trámites" | LNETB Art. 75 | MEDIO | Registrar cuando el trámite esté operativo |
| 20 | "Sin política de retención/eliminación de datos" | LGPDPPSO | ALTO | Definir períodos de conservación |
| 21 | "Stripe no está autorizado por Tesorería municipal" | Ley de Ingresos | ALTO | Autorización de Tesorería antes de aceptar pagos reales |
| 22 | "No hay mecanismo de impugnación para el ciudadano" | Debido proceso | ALTO | Informar sobre recursos administrativos |
| 23 | "Sin código de conducta para funcionarios con acceso al sistema" | Buen gobierno | MEDIO | Documentar procedimientos |
| 24 | "El QR del prototipo no verifica contra backend" | Sin endpoint de verificación | MEDIO | Conectar QR a endpoint real |
| 25 | "No hay SLA con el municipio" | Compromiso de servicio | MEDIO | Definir niveles de servicio |

---

## O. RESULTADO FINAL — CUATRO LISTAS

### 🟢 PUEDE HACERSE AHORA

- Seguir desarrollando el frontend y backend como prototipo de laboratorio
- Completar el expediente regulatorio con las correcciones de esta contra-auditoría
- Corregir todas las afirmaciones falsas o sin evidencia en la documentación
- Rotar la llave de Gemini (acción pendiente documentada en PROTOCOLO_SEGURIDAD.md)
- Implementar el esquema de expediente en Firestore
- Construir los endpoints de trámite en server.ts
- Realizar auditoría WCAG con herramienta automatizada

### 🟡 REQUIERE VALIDACIÓN

- Eliminar el 92.5% y sustituir por matriz de estados (Operativo/Operativo en demo/Preparado/Hoja de ruta)
- Verificar si la "conexión RENAPO" existe al menos como simulación (no se encontró evidencia)
- Determinar si Stripe está en modo sandbox o producción
- Validar que todos los archivos referenciados en la documentación existen realmente

### 🟠 REQUIERE AUTORIZACIÓN INSTITUCIONAL

- Acuerdo de Cabildo para el piloto
- Convenio con RENAPO para consulta CURP
- Designación de funcionario firmante con e.firma
- Autorización de Tesorería para usar Stripe como canal de pago
- Publicación del Aviso de Privacidad
- Determinación AIR vs Exención
- Registro en Catálogo Nacional de Trámites

### 🔴 NO DEBE HACERSE TODAVÍA

- Procesar datos personales reales de ciudadanos (sin aviso de privacidad ni autorización)
- Emitir constancias con pretensión de validez jurídica (sin firma oficial ni fundamento)
- Presentar el sistema como "certificado" o "aprobado" ante ninguna autoridad
- Afirmar cumplimiento de artículos de la LNETB sin evidencia verificable
- Conectar a sistemas gubernamentales reales sin convenio firmado
- Aceptar pagos reales sin autorización de Tesorería

---

## RESPUESTA FINAL

**¿QUÉ DOCUMENTOS, AUTORIZACIONES, INTEGRACIONES, CAMBIOS TECNOLÓGICOS Y VALIDACIONES JURÍDICAS SON INDISPENSABLES PARA QUE EL PROYECTO PUEDA SER PRESENTADO FORMALMENTE COMO PROPUESTA DE PILOTO MUNICIPAL?**

### Indispensable para la presentación formal:

1. **Corregir la documentación** — Eliminar el 92.5%, nombres de archivos inexistentes (OrbeCentralView, UniversalOrderNav), y afirmaciones sin evidencia (WCAG 100, sello criptográfico, interoperabilidad gubernamental)
2. **Expediente regulatorio honesto** — Usar el sistema de 4 estados del MARCO_CUMPLIMIENTO_LNETB.md (Operativo/Operativo en demo/Preparado/Hoja de ruta) — nunca "Cumple" sin evidencia
3. **Prototipo funcional demostrable** — El frontend React existe y funciona; el server.ts con Gemini y Stripe existe y funciona localmente. Eso es suficiente para una presentación como laboratorio
4. **Claridad sobre lo que NO existe** — Ser explícito: no hay conexión a RENAPO, no hay firma electrónica, no hay interoperabilidad gubernamental, no hay WCAG verificado, no hay lenguas originarias funcionales

### Indispensable ANTES del piloto con datos reales:

5. **Acuerdo de Cabildo** autorizando el piloto
6. **Aviso de Privacidad** publicado conforme a LGPDPPSO
7. **Backend del trámite** implementado en server.ts
8. **Mecanismo de identidad** — al menos validación sintáctica de CURP con algoritmo RENAPO documentado
9. **Mecanismo de firma** — al menos OTP + hash con trazabilidad (como demostración; la e.firma real requiere convenio SAT)

### Lo que NO es indispensable para la presentación (puede ser hoja de ruta):

- Conexión real a RENAPO (requiere convenio SEGOB — meses)
- e.firma del SAT (requiere convenio — meses)
- Interoperabilidad con Catastro/SIAPA (requiere autorización municipal)
- Accesibilidad WCAG completa (requiere auditoría externa)
- Certificación de seguridad (requiere pentest)

---

*Contra-auditoría completada. No se emite porcentaje de cumplimiento. No se declara "certificado". No se declara "listo para producción".*
