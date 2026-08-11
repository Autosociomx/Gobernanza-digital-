# CARPETA 08 — ARQUITECTURA TECNOLÓGICA

## Laboratorio Piloto Tepic — Constancia de Residencia

---

## 1. Principios de Arquitectura

| Principio | Implementación |
|---|---|
| **Serverless first** | Netlify Functions — sin servidores que administrar, escala a cero cuando no hay uso |
| **Offline-capable** | Service Worker para funcionalidad básica sin conexión |
| **API-first** | Toda la lógica de negocio expuesta como APIs documentadas |
| **Zero-trust security** | Cada request autenticado y autorizado independientemente |
| **Event sourcing** | Cada acción genera un evento inmutable en el expediente digital |
| **Estándares abiertos** | JSON, REST, OAuth2, JWT, HTTPS, QR, PDF/A |
| **Neutralidad tecnológica** | Sin dependencia de proveedor único; todo migrable |
| **Mobile-first** | Diseñado para el ciudadano en celular, funcional en desktop |

---

## 2. Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                        CIUDADANO                                 │
│          (celular Android/iOS, tableta, computadora)             │
│              Navegador web — sin instalar apps                   │
└────────────────────────────┬────────────────────────────────────┘
                             │  HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                    CDN (Netlify / Alternativa)                   │
│                                                                  │
│  • Frontend estático (HTML/CSS/JS vanilla o React)               │
│  • Service Worker (offline cache)                                │
│  • Assets optimizados (gzip, cache headers)                      │
│  • Headers de seguridad (CSP, X-Frame, HSTS)                     │
└────────────────────────────┬────────────────────────────────────┘
                             │  API calls (HTTPS)
                             ▼
┌─────────────────────────────────────────────────────────────────┐
│                  API GATEWAY (Netlify Functions)                  │
│                                                                  │
│  /api/tramites/constancia-residencia                             │
│    ├── POST   /iniciar         → valida CURP, crea solicitud     │
│    ├── POST   /validar-domicilio → consulta catastro/SIAPA       │
│    ├── POST   /firmar          → OTP → firma simple              │
│    ├── GET    /estado/:folio   → consulta estado del trámite     │
│    ├── POST   /resolver        → funcionario emite resolución    │
│    └── GET    /descargar/:folio → PDF con QR de verificación     │
│                                                                  │
│  /api/identidad                                                 │
│    └── POST   /verificar-curp   → validación CURP (→ RENAPO)     │
│                                                                  │
│  /api/expediente                                                │
│    ├── GET    /:curp           → consultar expediente            │
│    └── GET    /:curp/eventos   → trazabilidad completa           │
└────────────────────────────┬────────────────────────────────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
┌─────────────────┐ ┌──────────────┐ ┌──────────────────┐
│   SUPABASE      │ │  RENAPO      │ │  CATASTRO /      │
│   (PostgreSQL)  │ │  (Identidad) │ │  SIAPA (Dom.)    │
│                 │ │              │ │                  │
│ • expedientes   │ │ [PILOTO:     │ │ [PILOTO:         │
│ • usuarios      │ │  conexión    │ │  conexión        │
│ • eventos       │ │  pendiente]  │ │  pendiente]      │
│ • documentos    │ │              │ │                  │
│ • auditoría     │ │              │ │                  │
└─────────────────┘ └──────────────┘ └──────────────────┘
```

---

## 3. Stack Tecnológico

| Capa | Tecnología | Justificación | Alternativa migrable |
|---|---|---|---|
| **Frontend** | HTML5/CSS3/JS (vanilla) o React | Carga rápida, sin dependencias pesadas | Vue, Svelte, Angular |
| **CDN/Hosting** | Netlify | Serverless, CDN global, $0 inicial | Vercel, Cloudflare Pages, servidor propio |
| **Backend API** | Netlify Functions (Node.js) | Sin servidor, escala automática | AWS Lambda, Cloudflare Workers, servidor Express |
| **Base de datos** | Supabase (PostgreSQL) | Open source, realtime, $0 inicial | PostgreSQL propio, MySQL, MongoDB |
| **Autenticación** | Supabase Auth + OTP | JWT nativo, multifactor | Auth0, Firebase Auth |
| **Almacenamiento** | Supabase Storage | S3-compatible, integrado con DB | AWS S3, MinIO (self-hosted) |
| **Firma electrónica** | OTP + hash SHA256 + timestamp | Demostración lab → migrar a e.firma | e.firma SAT, FIEL |
| **QR** | qrcode.js (MIT) | Biblioteca open source | Cualquier generador QR |
| **Mapas** | Leaflet (open source) / OpenStreetMap | Sin dependencia de Google | Mapbox, Google Maps |
| **Notificaciones** | Supabase Realtime + email | Push nativo en DB | Twilio, SendGrid, WhatsApp API |
| **Monitoreo** | Netlify Analytics + Supabase logs | Incluido en plataforma | Grafana, Datadog |

---

## 4. Modelo de Datos (Supabase)

### 4.1 Tabla: `solicitudes`

```sql
CREATE TABLE solicitudes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  folio VARCHAR(20) UNIQUE NOT NULL,
  curp VARCHAR(18) NOT NULL,
  curp_hash VARCHAR(64) NOT NULL, -- SHA256 de CURP (no almacenar CURP en texto plano)
  nombre_hash VARCHAR(64),
  calle VARCHAR(200),
  colonia VARCHAR(100),
  codigo_postal VARCHAR(5),
  estado VARCHAR(20) DEFAULT 'pendiente', -- pendiente, validando, resuelto, rechazado
  funcionario_id UUID,
  resolucion TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ,
  notified_at TIMESTAMPTZ
);
```

### 4.2 Tabla: `eventos_expediente`

```sql
CREATE TABLE eventos_expediente (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  solicitud_id UUID REFERENCES solicitudes(id),
  tipo VARCHAR(30) NOT NULL, -- identidad, domicilio, firma, resolucion, notificacion
  descripcion TEXT,
  metadata JSONB,
  usuario_id UUID,
  ip_address INET,
  user_agent TEXT,
  hash_anterior VARCHAR(64),
  hash_nuevo VARCHAR(64),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### 4.3 Tabla: `usuarios`

```sql
CREATE TABLE usuarios (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  curp_hash VARCHAR(64),
  rol VARCHAR(20) DEFAULT 'ciudadano', -- ciudadano, funcionario, admin, auditor
  nombre VARCHAR(200),
  telefono VARCHAR(15),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## 5. Seguridad por Diseño

| Control | Implementación |
|---|---|
| **Cifrado en tránsito** | HTTPS (TLS 1.3) — forzado vía HSTS |
| **Cifrado en reposo** | PostgreSQL con TDE (Supabase) + column-level encryption para datos sensibles |
| **CURP** | NUNCA almacenada en texto plano — solo hash SHA256 |
| **Autenticación** | JWT con expiración + refresh tokens + OTP para acciones sensibles |
| **Autorización** | Row-Level Security (RLS) en PostgreSQL por rol |
| **Auditoría** | Todo evento registrado en `eventos_expediente` (inmutable) |
| **Rate limiting** | Netlify Functions + Supabase RLS policies |
| **CORS** | Configurado a orígenes autorizados |
| **CSP** | Content Security Policy restrictiva |
| **Secretos** | Variables de entorno en Netlify/Supabase — nunca en código |

---

## 6. Plan de Migración (sin lock-in)

| Componente | Cómo migrar | Tiempo estimado |
|---|---|---|
| Frontend → otro hosting | Copiar archivos estáticos a nuevo CDN | < 1 hora |
| Netlify Functions → otro serverless | El código es Node.js estándar — ejecutable en cualquier plataforma | < 1 día |
| Supabase → PostgreSQL propio | pg_dump + pg_restore (PostgreSQL estándar) | < 4 horas |
| Supabase Auth → otro IdP | Migrar usuarios vía API | < 1 día |
| Supabase Storage → S3/MinIO | Copiar objetos vía API | < 4 horas |

---

*Documento elaborado como parte del Laboratorio Piloto Tepic — Nayarit Digital · ConnectX*
*Agosto 2026*
