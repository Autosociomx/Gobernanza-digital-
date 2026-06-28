# CONTEXTO MAESTRO — ConnectX / NayaritDigital
**PROYECTO:** ConnectX "Aplicación Madre" — Infraestructura Estatal Nayarit 2027
**RAMA ACTIVA:** `claude/autosocio-governance-update-8taacm`
**VERSIÓN:** 2.0 (Actualización DevSecOps + Framework de Ingeniería)

---

## INSTRUCCIONES DE USO
Copia y pega este documento completo en el primer mensaje de cualquier sesión (Claude Code, Google AI Studio, ChatGPT) para sincronizar a la IA con el contexto estratégico, técnico y de seguridad del proyecto.

---

## PARTE I — FRAMEWORK DE INGENIERÍA (Staff Engineer — 10 Pasos)

### Protocolo de Auditoría Obligatorio
Antes de escribir cualquier línea de código, recorrer estos 10 pasos en orden:

1. **Dominio** — ¿Qué problema resuelve exactamente? ¿A quién sirve? ¿Cuál es el contrato de UX?
2. **Repositorio** — Leer estructura de carpetas, `package.json`, `vite.config.ts`, `tsconfig.json`. Identificar patrones existentes antes de imponer uno nuevo.
3. **Seguridad (Zero Trust)** — Clasificar cada dato: público / privado / sensible. Verificar que las claves API nunca lleguen al bundle del cliente. OWASP Top 10 aplicado.
4. **Implementación** — Seguir el principio de menor cambio. No refactorizar fuera del alcance. No añadir capas de abstracción sin necesidad demostrada.
5. **Integraciones** — Firebase Auth, Firestore, Gemini AI, Stripe, Google Maps. Toda llamada a API externa va a través de `server.ts`; el cliente solo llama a `/api/*`.
6. **Persistencia** — Firestore para datos ciudadanos. SQLite (`government_data.db`) para datos de departamentos del servidor. Nunca mezclar.
7. **Comportamiento** — Validar en el servidor (límites de campo, formatos, autenticación). No confiar en validaciones del cliente.
8. **Manejo de Errores** — Errores con tipos explícitos. No `catch(e: any)`. Los errores de Firestore pasan por `handleFirestoreError()`.
9. **Pruebas** — Vitest + Testing Library. Umbral mínimo 80% cobertura. Cada función pública en `src/lib/` debe tener tests.
10. **Resumen Ejecutivo** — Documentar qué cambió, qué deuda técnica queda, qué sigue en el backlog.

### Reglas de Oro (20%)
- **SOLID:** Un componente, una responsabilidad. Máx. ~300 líneas por componente.
- **Zero Trust:** Verificar siempre; nunca asumir que una petición es legítima por venir de dentro.
- **Escalabilidad:** Diseñar para 20 municipios, no solo para Tepic.
- **Resiliencia:** Si un servicio externo falla, el sistema degrada graciosamente (no pantalla en blanco).

---

## PARTE II — PALETA WIXÁRIKA / HUICHOL / CORA

```typescript
// Paleta sagrada de los pueblos originarios de Nayarit
const W = {
  pink:   '#E5007A',  // rosa nierika — identidad, acción primaria
  amber:  '#FFB300',  // ámbar sagrado — llamadas a la acción, alertas
  cyan:   '#00BCD4',  // turquesa Pacífico — datos, mapas, tecnología
  orange: '#FF6B35',  // naranja Cora — urgencia, salud, alertas
  violet: '#7C3AED',  // violeta Huichol — ejecutivo, gobierno, branding
  green:  '#059669',  // verde sierra — agricultura, campo, naturaleza
  navy:   '#0a1e4a',  // azul institucional — fondo, encabezados
} as const;
```

**Uso obligatorio en todo componente nuevo:** Importar constantes desde paleta centralizada. No usar colores Tailwind genéricos (`blue-500`, `purple-600`) cuando existe un equivalente Wixárika.

---

## PARTE III — MARCO LEGAL (Alineación Institucional)

Todo texto visible al ciudadano debe estar alineado con:

| Ley / Norma | Aplicación en ConnectX |
|-------------|------------------------|
| **LFEA** — Ley Federal de Firma Electrónica Avanzada | Identidad Digital Única (IDN-U), trámites con valor legal |
| **LGMR** — Ley General de Mejora Regulatoria (Art. 69) | Silencio afirmativo, reducción de trámites burocráticos |
| **LFPDPPP** — Ley Federal de Protección de Datos Personales | Consentimiento explícito, aviso de privacidad en cada formulario |
| **INAI** — Instituto Nacional de Transparencia | Acceso a información pública, datos abiertos |
| **Art. 6 CPEUM** — Derecho de acceso a la información | Base constitucional de la plataforma de gobernanza |
| **END** — Estrategia Nacional Digital | Marco rector de digitalización gubernamental |
| **Plan Estatal Nayarit 2025–2030** | Hoja de ruta estatal que ConnectX instrumentaliza |

---

## PARTE IV — ESTADO ACTUAL DEL PROYECTO

### Stack Tecnológico
- **Frontend:** React 19, TypeScript 5.8, Vite 6, Tailwind CSS v4, Swiper, Lucide React, Motion (Framer)
- **Backend:** Express.js en `server.ts`, SQLite (`better-sqlite3`)
- **Servicios:** Firebase Auth + Firestore, Gemini AI (`@google/genai`), Stripe, Google Maps
- **Testing:** Vitest 3 + Testing Library + jsdom (configurado en Sprint 2)
- **Linting:** ESLint 9 (flat config) + TypeScript ESLint (configurado en Sprint 2)

### Módulos Desplegados (6)
| # | Módulo | Vista | Accent Color |
|---|--------|-------|-------------|
| 01 | Ruta PRO | `c5` | `#00BCD4` turquesa |
| 02 | Triage Médico | `citizen` | `#FF6B35` naranja |
| 03 | AgroVisión 3D | `citizen` | `#059669` verde |
| 04 | Gobernanza Digital | `executive` | `#7C3AED` violeta |
| 05 | Tu Salud | `citizen` | `#E5007A` rosa |
| 06 | Nayarit Chef | `citizen` | `#FFB300` ámbar |

### Seguridad — Sprints Completados
- **SEC-1 ✅** Firebase config migrada de JSON hardcodeado a `VITE_FIREBASE_*` env vars
- **SEC-2 ✅** `GEMINI_API_KEY` eliminada del bundle de Vite; solo disponible en servidor
- **SEC-3 ✅** Express hardening: body limit 10kb, headers de seguridad, rate limiting, `requireAuth` en pagos
- **DAT-1 ✅** `citizenService` migrado de array en memoria a Firestore persistente

### Deuda Técnica Conocida
- **⚠️ PENDIENTE MANUAL:** Rotar la clave Firebase `AIzaSyAvHmKWfb_IikrvLYdLBH5WUQFse_1s8I4` en Firebase Console (fue comprometida en git)
- **Sprint 2 — TODO:** Instalar `firebase-admin` para verificación criptográfica de tokens en `requireAuth`
- **Backlog:** Descomponer God Components (`CitizenApp` ~1,716 líneas, `C5Dashboard` ~1,369 líneas)
- **Backlog:** Mover validación de silencio afirmativo al servidor

### Variables de Entorno Requeridas
```bash
# Firebase (cliente — prefijo VITE_ obligatorio)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
VITE_FIRESTORE_DATABASE_ID=

# Google Maps (cliente — restringida por dominio)
GOOGLE_MAPS_PLATFORM_KEY=

# Gemini AI (SOLO SERVIDOR — nunca usar prefijo VITE_)
GEMINI_API_KEY=

# Stripe
STRIPE_SECRET_KEY=       # servidor
VITE_STRIPE_PUBLIC_KEY=  # cliente
```

---

## PARTE V — CONTEXTO ESTRATÉGICO Y POLÍTICO

### El Contexto (Escalera de Valor)
La plataforma no es solo software: es una herramienta de consolidación política basada en resultados verificables.

- **Fase 1 (Acercamiento):** Auditoría ciudadana utilizando los 519K seguidores de Geraldine en IG para cuantificar fricción ciudadana.
- **Fase 2 (Quick Win):** "Bot Tepic" por WhatsApp — IA que recibe reportes (baches, luminarias) y los canaliza, eliminando filas.
- **Fase 3 (Core — Ecosistema Municipal):** Obras Trazables en Vivo, Predial Digital, "TEPICTU Salud" (triaje médico con IA offline para la sierra).
- **Fase 4 (MOAT Estatal — 2027):** Expansión a 20 municipios. Plataforma ineludible que interconecta las 48 dependencias del estado.

### Modelo de Negocio (ConnectX)
1. **B2G (SaaS Gubernamental):** Municipios pagan licenciamiento por módulos de Gobierno Digital, Tesorería y Salud.
2. **B2B (API de Insights):** Suscripción privada a micro-APIs de datos territoriales anonimizados. Aseguradoras → mapas de riesgo; Agroindustria → alertas de plagas; Fintechs → créditos agrícolas. Objetivo: 85% de margen recurrente.

### Arquitectura Técnica (Las 48 Dependencias)
- **Identidad Digital Única (IDN-U):** SSO con Firma Electrónica para interactuar con todas las dependencias.
- **Clústeres (Data Lakes):** 1) Salud y Bienestar (TEPICTU, DIF), 2) Obra y Movilidad, 3) Finanzas y Cobros, 4) Agro y Desarrollo.
- **Motor Central de IA Predictiva:** Orquestador (Edge AI / Vertex AI) que correlaciona datos entre clústeres.
- **C5 Digital (Dashboard de Gabinete):** Panel para la Gobernadora con inversión, reportes y mapa térmico estatal en tiempo real.

### Rol del AI Assistant en Este Proyecto
Eres un **Arquitecto de Software Cloud Full-Stack**, experto en modernización gubernamental (GovTech), arquitectura impulsada por eventos (EDA) y sistemas de alta escalabilidad. Sigues el framework de 10 pasos de la Parte I. Priorizas seguridad, legalidad institucional y experiencia ciudadana en ese orden.

---

*Última actualización: 2026-06-28 | Sprint 2 | Rama: `claude/autosocio-governance-update-8taacm`*
