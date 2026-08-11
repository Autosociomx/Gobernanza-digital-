# Carpeta 03 — Expediente Técnico
## Laboratorio Piloto Tepic

---

## 1. Arquitectura del prototipo (lo que existe hoy)

```
┌──────────────────────────────────────────────────────┐
│  CIUDADANO (celular / tableta / computadora)         │
│  Navegador web — sin instalar apps                   │
└──────────────────────┬───────────────────────────────┘
                       │ HTTPS
┌──────────────────────▼───────────────────────────────┐
│  CDN (Netlify)                                       │
│  • React SPA con 30+ componentes                     │
│  • 5 vistas lazy-loaded (code-splitting)             │
│  • HSTS, CSP, X-Frame-Options, nosniff               │
└──────────────────────┬───────────────────────────────┘
                       │ /api/*
┌──────────────────────▼───────────────────────────────┐
│  SERVIDOR (Express.ts)                               │
│  • Gemini AI (chat + risk analysis)                  │
│  • Stripe (pagos)                                    │
│  • SQLite (departments CRUD)                         │
│  • En desarrollo local — no deployado aún            │
└──────────────────────┬───────────────────────────────┘
                       │
┌──────────────────────▼───────────────────────────────┐
│  FIREBASE / FIRESTORE                                │
│  • Configurado pero sin esquema de expediente        │
│  • Auth con Google (configurado, sin uso en trámites)│
│  • Storage configurado (perfil de salud)             │
└──────────────────────────────────────────────────────┘
```

## 2. Stack tecnológico

| Capa | Tecnología | Licencia | Nota |
|---|---|---|---|
| **Frontend** | React 19 + TypeScript + Vite 6 | MIT | Code-splitting con lazy loading |
| **UI** | Tailwind CSS 4 + Motion (Framer) | MIT | Paleta accesible documentada |
| **Backend** | Express 4 + TypeScript | MIT | APIs REST documentadas |
| **IA** | Google Gemini (genai SDK) | Comercial | API key en servidor, nunca en bundle |
| **Pagos** | Stripe | Comercial | En servidor, validación server-side |
| **Base de datos** | SQLite (better-sqlite3) + Firestore | Open source / Comercial | Local + cloud |
| **Gráficas** | Recharts | MIT | Dashboard C5 |
| **QR / Códigos** | qrcode.react + jsbarcode + html5-qrcode | MIT | Lectura y generación |
| **PDF** | jspdf | MIT | Generación de constancias |
| **OCR** | tesseract.js | Apache 2.0 | Lectura de documentos |
| **Mapas** | Leaflet (RutaViva) / @react-google-maps (legacy) | BSD / Comercial | Migración a OSM en proceso |
| **Hosting** | Netlify (frontend) + pendiente definir (backend) | Comercial | Plan de migración documentado |
| **CI/CD** | GitHub Actions + Netlify auto-deploy | Open source / Comercial | Guardia de regresiones automatizada |

## 3. Seguridad

### Lo que ya existe (🟢)

| Control | Evidencia |
|---|---|
| HTTPS forzado | `netlify.toml` — HSTS 2 años |
| Headers de seguridad | X-Frame-Options: DENY, X-Content-Type-Options: nosniff, Referrer-Policy, Permissions-Policy |
| API keys en servidor | Prohibición de keys en bundle (documentada en PROTOCOLO_SEGURIDAD.md) |
| Guardia CI automatizada | `.github/workflows/guardia-regresiones.yml` — verifica keys, headers, code-splitting |
| Validación server-side de pagos | Stripe — el navegador nunca decide el monto |
| Lazy loading | Code-splitting — el visitante no descarga módulos que no usa |

### Lo que falta (🔴)

| Control | Plan |
|---|---|
| Autenticación de usuarios | Firebase Auth está configurado pero sin implementar en flujo de trámites |
| RBAC / roles | Sin implementar en endpoints de trámite |
| Rate limiting | Sin implementar |
| Pentest | No realizado |
| Backups verificados | Firestore tiene backups — no se ha probado restauración |

## 4. Lo que el sistema NO tiene hoy

Aclaración explícita para evitar malentendidos en la presentación:

| ❌ No existe | Estado real |
|---|---|
| Conexión a RENAPO | Sin endpoint, sin SDK, sin simulación |
| Conexión a Catastro Tepic | Sin endpoint, sin convenio |
| Conexión a SIAPA | Sin endpoint, sin convenio |
| Conexión a SAT (e.firma) | Sin endpoint, sin SDK, sin HSM |
| Firma electrónica avanzada | Sin infraestructura criptográfica |
| Expediente digital en producción | Firestore configurado pero sin esquema implementado |
| Service Worker / PWA offline | Sin implementar |
| Notificaciones (SMS/email jurídico) | Sin implementar |
| Lenguas originarias funcionales | Voz solo español; sin traducción de interfaz |

## 5. Plan de construcción (dependencias técnicas)

Lo que está en nuestras manos construir SIN permisos del Ayuntamiento:

```
SEMANA 1-2                    SEMANA 3-4
─────────────                 ─────────────
✅ Validación CURP            ✅ Endpoints del trámite
   (sintáctica, server.ts)       (iniciar, validar, firmar, estado)

✅ OTP / firma simple         ✅ Hash SHA-256 + QR verificable
   (demostración del flujo)      (con endpoint de verificación)

✅ Esquema expediente         ✅ Página de verificación pública
   (Firestore collections)       (escaneo de QR → datos reales)
```

Lo que requiere permisos:

```
🔴 Conexión RENAPO           → Convenio SEGOB/Ayuntamiento
🔴 e.firma SAT               → Convenio SAT/Ayuntamiento
🔴 Catastro/SIAPA            → Autorización municipal
🔴 Stripe en producción      → Autorización Tesorería
🔴 Datos personales reales   → Aviso de privacidad publicado
```

---

*Documento preparado como parte del expediente de presentación institucional.*
*Las capacidades técnicas declaradas corresponden al código existente en el repositorio.*
