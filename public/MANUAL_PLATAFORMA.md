# MANUAL DE OPERACIONES DE LA PLATAFORMA
## Nayarit Digital — ConnectX Servicios S.A. de C.V.

**Documento:** NYD-500 / Operaciones / Manual de Plataforma
**Versión:** 1.0 — Julio 2026
**Custodio:** ConnectX Servicios S.A. de C.V. — Jordan Pérez Aguilar, Director General
**Audiencia:** Equipo ConnectX · Personal del Ayuntamiento · Soporte técnico

---

## ÍNDICE

1. [Arquitectura General](#1-arquitectura-general)
2. [Módulos del Dashboard](#2-módulos-del-dashboard)
3. [Flujo de Usuario Ciudadano](#3-flujo-de-usuario-ciudadano)
4. [Flujo de Usuario Municipal](#4-flujo-de-usuario-municipal)
5. [Catálogo de Pagos — Cómo Agregar Conceptos](#5-catálogo-de-pagos--cómo-agregar-conceptos)
6. [Integración OXXO Pay (Conekta)](#6-integración-oxxo-pay-conekta)
7. [Autenticación — Demo vs. Producción](#7-autenticación--demo-vs-producción)
8. [Variables de Entorno](#8-variables-de-entorno)
9. [Deployment — Cómo Publicar Cambios](#9-deployment--cómo-publicar-cambios)
10. [Guía de Demo para Presentaciones](#10-guía-de-demo-para-presentaciones)
11. [Preguntas Frecuentes del Ayuntamiento](#11-preguntas-frecuentes-del-ayuntamiento)
12. [Incidentes y Soporte](#12-incidentes-y-soporte)
13. [Hoja de Ruta Técnica](#13-hoja-de-ruta-técnica)

---

## 1. ARQUITECTURA GENERAL

### Stack tecnológico

| Capa | Tecnología | Versión | Propósito |
|---|---|---|---|
| Frontend | React + TypeScript | 18 / 5.x | UI del dashboard |
| Build | Vite | 5.x | Compilación y dev server |
| Estilos | TailwindCSS | 3.x | Diseño responsivo |
| Iconos | Lucide React | latest | Iconografía consistente |
| Auth | Firebase Authentication | v9 | Login con email/Google |
| Base de datos | Firebase Firestore | v9 | Datos en tiempo real |
| Hosting | Netlify | — | CDN global + deploy automático |
| Dominio | tepic.netlify.app | — | Producción actual |
| Repositorio | GitHub (autosociomx) | — | Control de versiones |

### Flujo de datos actual (modo demo)

```
Usuario → Firebase Auth (demo) → C5Dashboard → Módulo seleccionado
                                                        ↓
                                              Datos hardcodeados en
                                              cada componente (.tsx)
```

### Flujo de datos objetivo (producción)

```
Usuario → Firebase Auth (real) → C5Dashboard → Módulo seleccionado
                                                        ↓
                                              Firestore / APIs reales
                                              (Catastro, Conekta, etc.)
```

### Estructura de archivos clave

```
src/
├── components/
│   ├── C5Dashboard.tsx          ← Contenedor principal, routing de módulos
│   ├── LandingPage.tsx          ← Página de entrada / login
│   └── dashboard/
│       ├── PagosView.tsx        ← Catálogo Único de Pagos + OXXO QR
│       ├── MunicipioView.tsx    ← Mapa de 16 dependencias municipales
│       ├── PatrimonioView.tsx   ← Nayarit Originario + La Zitacua
│       ├── TesoreriaView.tsx    ← Panel de finanzas municipales
│       ├── AuditoriaView.tsx    ← Registro de auditoría en tiempo real
│       ├── BienestarView.tsx    ← Módulo de beneficiarios
│       ├── ServiciosView.tsx    ← Servicios ciudadanos
│       ├── ObservatorioView.tsx ← Observatorio de datos
│       ├── MetricasView.tsx     ← Métricas de la plataforma
│       └── [otros módulos...]
public/
├── PLAN_ESTRATEGICO_ZITACUA.md  ← Estrategia piloto La Zitacua
├── PLAN_TRABAJO_POST_CONTRATO.md← Plan post-firma de convenio
├── ACUERDO_COLABORACION_WIXARIKA.md ← Marco de colaboración indígena
└── MANUAL_PLATAFORMA.md         ← Este documento
```

---

## 2. MÓDULOS DEL DASHBOARD

### Tabla de módulos activos

| ID | Nombre en UI | Componente | Estado | Datos |
|---|---|---|---|---|
| `tesoreria` | Tesorería Municipal | TesoreriaView | Demo | Hardcoded |
| `pagos` | Catálogo Único de Pagos | PagosView | Demo | Hardcoded |
| `municipio` | Mapa Municipal Digital | MunicipioView | Demo | Hardcoded |
| `obras` | Obras Públicas | ObrasView | Demo | Hardcoded |
| `servicios` | Servicios Ciudadanos | ServiciosView | Demo | Hardcoded |
| `salud` | Servicios de Salud | SaludView | Demo | Hardcoded |
| `bienestar` | Módulo de Bienestar | BienestarView | Demo | Hardcoded |
| `patrimonio` | Nayarit Originario | PatrimonioView | Demo | Hardcoded |
| `ia` | Asistente IA | IAView | Demo | — |
| `agrovision` | AgroVisión | AgrovisionView | Demo | Hardcoded |
| `observatorio` | Observatorio de Datos | ObservatorioView | Demo | Hardcoded |
| `metricas` | Métricas de Plataforma | MetricasView | Demo | Hardcoded |
| `analisis_politico` | Análisis Político | AnalisisPoliticoView | Demo | Hardcoded |
| `auditoria` | Auditoría en Tiempo Real | AuditoriaView | Demo | Simulado |
| `gabinete` | Gestión de Gabinete | GabineteView | Demo | Hardcoded |
| `interoperabilidad` | Interoperabilidad | InteroperabilidadView | Demo | Hardcoded |
| `parlamento` | Parlamento Digital | ParlamentoView | Demo | Hardcoded |

### Cómo agregar un módulo nuevo

1. **Crear componente** en `src/components/dashboard/NuevoModuloView.tsx`
   ```tsx
   export function NuevoModuloView() {
     return <div className="p-6">...</div>;
   }
   ```

2. **Agregar al tipo** en `C5Dashboard.tsx`:
   ```typescript
   type ModuleType = '...' | 'nuevo_modulo';
   ```

3. **Agregar al arreglo de módulos**:
   ```typescript
   { id: 'nuevo_modulo', name: 'Nombre en UI', icon: IconName, color: 'text-blue-400', bg: 'bg-blue-400/10' }
   ```

4. **Agregar import** y render condicional:
   ```typescript
   import { NuevoModuloView } from './dashboard/NuevoModuloView';
   // ...
   {activeModule === 'nuevo_modulo' && <NuevoModuloView />}
   ```

5. **Compilar y verificar**: `npm run build` — revisar que no hay errores de TypeScript.

---

## 3. FLUJO DE USUARIO CIUDADANO

### Acceso actual (demo)

```
1. Abre tepic.netlify.app
2. Pantalla de login — ingresa cualquier email y contraseña
   (en modo demo, no se valida contra Firebase real)
3. Entra al dashboard C5
4. Selecciona "Catálogo Único de Pagos" (ícono de tarjeta morado)
5. Busca su concepto de pago (ej. "Predial Urbano")
6. Click en "Generar QR OXXO"
7. Modal muestra:
   - Referencia de 18 dígitos (generada localmente, no real)
   - Instrucciones para pagar en OXXO
   - QR visual (placeholder — no scaneable para pago real)
```

### Acceso objetivo (producción)

```
1. Abre tepic.nayaritdigital.mx (dominio personalizado)
2. Pantalla de login — opción "Iniciar con Llave MX" (CURP verificado)
   o email/contraseña verificado por Firebase real
3. Sistema carga su expediente: predios registrados, adeudos, historial
4. Selecciona concepto de pago
5. Genera QR OXXO via Conekta → referencia real de 18 dígitos
6. Paga en OXXO → webhook confirma a Firebase en < 30 segundos
7. Recibe PDF oficial con folio del Ayuntamiento de Tepic
```

---

## 4. FLUJO DE USUARIO MUNICIPAL

### Perfil: Funcionario del Ayuntamiento

El dashboard tiene dos perfiles lógicos (por implementar en producción):

**Perfil Ciudadano** — solo ve sus propios trámites y pagos
**Perfil Funcionario** — ve el dashboard completo con métricas de recaudación

### Módulos relevantes para funcionarios

| Módulo | Para qué sirve |
|---|---|
| **Tesorería** | Ver recaudación del día, semana, mes en tiempo real |
| **Catálogo de Pagos** | Gestionar conceptos habilitados, ver pagos procesados |
| **Mapa Municipal** | Estado de integración de cada dependencia |
| **Auditoría** | Log de todas las transacciones y eventos del sistema |
| **Métricas** | KPIs de uso de la plataforma |
| **Bienestar** | Gestión de beneficiarios georreferenciados |

### Capacitación recomendada para personal del Ayuntamiento

**Sesión 1 (2 horas):** Navegación del dashboard — cómo acceder, cambiar módulos, leer KPIs
**Sesión 2 (2 horas):** Módulo de Tesorería — cómo interpretar los datos de recaudación
**Sesión 3 (1 hora):** Módulo de Auditoría — cómo leer el log y qué hacer ante un evento inusual
**Sesión 4 (1 hora):** Proceso de soporte — cómo reportar un problema a ConnectX

---

## 5. CATÁLOGO DE PAGOS — CÓMO AGREGAR CONCEPTOS

### Estructura de un pago en PagosView.tsx

```typescript
interface Pago {
  id: string;           // identificador único snake_case
  nombre: string;       // nombre oficial del concepto
  descripcion: string;  // descripción breve para el ciudadano
  dependencia: string;  // dependencia responsable
  monto: string;        // monto o rango (ej: "$1,200 – $8,500 anuales")
  periodicidad: string; // cuándo se paga (Anual, Mensual, Por evento, etc.)
  status: 'disponible' | 'proximo';
  icon: LucideIcon;     // ícono de lucide-react
  color: string;        // clase de TailwindCSS (ej: "text-amber-400")
  categoria: 'municipal' | 'estatal';
  tag?: string;         // etiqueta opcional (ej: "PRIORITARIO", "NUEVO")
}
```

### Cómo agregar un pago nuevo

1. Abrir `src/components/dashboard/PagosView.tsx`
2. En el arreglo `PAGOS`, agregar al final del grupo correspondiente:

```typescript
{
  id: 'licencia_anuncio',
  nombre: 'Licencia para Anuncio Comercial',
  descripcion: 'Autorización para instalar anuncios en vía pública o establecimiento',
  dependencia: 'Desarrollo Económico y Turismo',
  monto: '$800 – $3,500',
  periodicidad: 'Anual',
  status: 'disponible',
  icon: Megaphone,
  color: 'text-orange-400',
  categoria: 'municipal',
},
```

3. Asegurarse de que el ícono esté importado en los imports de lucide-react al inicio del archivo.

### Los 73 conceptos de pago por categoría

**Impuestos (8 conceptos)**
1. Predial Urbano · 2. Predial Rústico · 3. Traslado de Dominio · 4. Plusvalía por Obra Pública · 5. ISN Municipal · 6. Actividades Mercantiles · 7. Diversiones Públicas · 8. Juegos Permitidos

**Derechos (45 conceptos)**
- Agua y Alcantarillado (5): Servicio de agua · Reconexión · Tomas nuevas · Alcantarillado · Análisis de agua
- Registro Civil (8): Actas de nacimiento · Matrimonio · Defunción · Divorcios · Reconocimiento · Fe de vida · Copias certificadas · Apostillas
- Catastro (6): Certificados catastrales · Actualización de valor · Constancias · Alineamientos · Fusiones · Subdivisiones
- Obras y Desarrollo Urbano (8): Licencias de construcción · Uso de suelo · Prórroga de licencia · Demolición · Regularización · Ampliaciones · Constancias de terminación · Dictamen de impacto
- Tránsito (7): Infracciones · Licencias de conducir · Placas · Remisión · Corralón · Traslado de vehículos · Peritos de tránsito
- Seguridad Pública (4): Certificado de no antecedentes · Peritajes · Custodia · Servicios especiales
- Ecología (4): Aprovechamiento forestal · Estudios de impacto · Podas · Tala de árboles
- Otros Derechos (3): Panteones · Rastro municipal · Mercados y tianguis

**Contribuciones de Mejoras (3 conceptos)**
1. Pavimentación · 2. Banquetas y guarniciones · 3. Alumbrado público

**Productos (7 conceptos)**
1. Venta de bases de licitación · 2. Arrendamiento de inmuebles · 3. Concesiones de mercados · 4. Publicidad en espacios municipales · 5. Servicios del Almacén · 6. Derechos de autor municipales · 7. Venta de vehículos en desuso

**Aprovechamientos (10 conceptos)**
1. Multas administrativas · 2. Recargos · 3. Gastos de ejecución · 4. Indemnizaciones por daños a bienes · 5. Donaciones · 6. Subsidios recuperables · 7. Rezagos de ejercicios anteriores · 8. Sanciones urbanísticas · 9. Reintegros · 10. Otros aprovechamientos

---

## 6. INTEGRACIÓN OXXO PAY (CONEKTA)

### Estado actual (demo)

El modal de OXXO en `PagosView.tsx` genera una referencia simulada:
```typescript
const ref = `TEP${Date.now().toString().slice(-12)}` // NO ES UNA REFERENCIA REAL
```

El QR mostrado es un placeholder visual — **no es escaneable para pago real**.

### Qué se necesita para hacerlo real

**Paso 1 — Cuenta Conekta:**
- RFC de ConnectX Servicios S.A. de C.V.
- CLABE bancaria (CLABE interbancaria de 18 dígitos)
- Acta constitutiva
- Tiempo de aprobación: 3-5 días hábiles
- URL: conekta.com → Crear cuenta de empresa

**Paso 2 — Instalar SDK:**
```bash
npm install conekta
```

**Paso 3 — Firebase Function para crear cargo:**
```typescript
// functions/src/createOxxoCharge.ts
import * as conekta from 'conekta';

exports.createOxxoCharge = functions.https.onCall(async (data, context) => {
  conekta.api_key = process.env.CONEKTA_PRIVATE_KEY;
  
  const order = await conekta.Order.create({
    currency: 'MXN',
    customer_info: {
      name: data.nombreCiudadano,
      email: data.emailCiudadano,
      phone: data.telefonoCiudadano,
    },
    line_items: [{
      name: data.nombreConcepto,
      unit_price: data.montoEnCentavos,
      quantity: 1,
    }],
    charges: [{
      payment_method: {
        type: 'oxxo_cash',
        expires_at: Math.floor(Date.now() / 1000) + (3 * 24 * 60 * 60), // 3 días
      }
    }]
  });
  
  return {
    referencia: order.charges[0].payment_method.reference,
    expiresAt: order.charges[0].payment_method.expires_at,
  };
});
```

**Paso 4 — Webhook para confirmar pago:**
```typescript
// functions/src/conektaWebhook.ts
exports.conektaWebhook = functions.https.onRequest(async (req, res) => {
  const event = req.body;
  
  if (event.type === 'charge.paid') {
    const referencia = event.data.object.payment_method.reference;
    
    // Actualizar Firestore: pago confirmado
    await admin.firestore()
      .collection('pagos')
      .doc(referencia)
      .update({ status: 'pagado', paidAt: admin.firestore.FieldValue.serverTimestamp() });
    
    // Generar PDF de recibo (ver sección de recibos)
  }
  
  res.status(200).send('ok');
});
```

**Paso 5 — Registrar webhook en Conekta:**
Dashboard Conekta → Webhooks → Agregar URL:
`https://[tu-region]-[tu-proyecto].cloudfunctions.net/conektaWebhook`

---

## 7. AUTENTICACIÓN — DEMO VS. PRODUCCIÓN

### Cómo funciona el modo demo

En `src/main.tsx` o `src/firebase.ts`:
```typescript
const isDemoMode = !import.meta.env.VITE_FIREBASE_API_KEY || 
                    import.meta.env.VITE_FIREBASE_API_KEY === 'demo';
```

**Modo demo:** Cualquier email/contraseña permite el acceso. No hay validación real.
**Modo producción:** Firebase Authentication verifica credenciales reales.

### Variables necesarias para producción

En Netlify → Site configuration → Environment variables:
```
VITE_FIREBASE_API_KEY=AIza...
VITE_FIREBASE_AUTH_DOMAIN=tu-proyecto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=tu-proyecto
VITE_FIREBASE_STORAGE_BUCKET=tu-proyecto.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abc123
```

### Llave MX (cuando esté disponible)

Llave MX es el sistema SSO del gobierno federal. El ciudadano usa su CURP + NIP para autenticarse. Para integrarlo se necesita:

1. `CLIENT_ID` obtenido en cedn.gob.mx → Registro de Proveedores Tecnológicos
2. Implementar flujo OAuth 2.0 con PKCE (no es difícil — 3-4 días de desarrollo)
3. Redirect URI registrado: `https://tepic.nayaritdigital.mx/auth/callback`

El beneficio: el ciudadano no necesita crear una cuenta nueva. Su identidad digital del gobierno funciona directamente.

---

## 8. VARIABLES DE ENTORNO

### Archivo `.env.local` para desarrollo

```bash
# Firebase
VITE_FIREBASE_API_KEY=demo
VITE_FIREBASE_AUTH_DOMAIN=demo
VITE_FIREBASE_PROJECT_ID=demo
VITE_FIREBASE_STORAGE_BUCKET=demo
VITE_FIREBASE_MESSAGING_SENDER_ID=demo
VITE_FIREBASE_APP_ID=demo

# Cuando lleguen:
# VITE_CONEKTA_PUBLIC_KEY=key_xxx
# VITE_LLAVE_MX_CLIENT_ID=xxx
```

**IMPORTANTE:** Nunca subir `.env` o `.env.local` a GitHub. Están en `.gitignore`.

### Variables en Netlify (producción)

Netlify → Site → Configuration → Environment variables

Agregar cada variable manualmente. Los cambios se aplican en el siguiente deploy.

---

## 9. DEPLOYMENT — CÓMO PUBLICAR CAMBIOS

### Flujo automático (recomendado)

```
1. Editar código localmente
2. git add <archivos>
3. git commit -m "descripción del cambio"
4. git push origin <rama>
5. Netlify detecta el push y despliega automáticamente
6. En 1-2 minutos el cambio está en tepic.netlify.app
```

### Verificar el deploy

- Netlify → Deploys → ver el último deploy
- Si el deploy falla: revisar los logs de build en Netlify
- Error más común: TypeScript error o import faltante

### Ambientes

| Ambiente | URL | Rama | Uso |
|---|---|---|---|
| Producción | tepic.netlify.app | main | Presentaciones con clientes |
| Preview | deploy-preview-XX--tepic.netlify.app | feature branches | Revisión antes de merge |
| Local | localhost:5173 | cualquiera | Desarrollo |

### Comandos locales

```bash
npm run dev     # servidor de desarrollo (localhost:5173)
npm run build   # compilar para producción (carpeta dist/)
npm run preview # previsualizar el build de producción localmente
```

---

## 10. GUÍA DE DEMO PARA PRESENTACIONES

### Preparación antes de la reunión

- [ ] Probar la plataforma en celular (no solo laptop) — la mayoría de funcionarios verán en móvil
- [ ] Asegurarse de estar en WiFi estable o tener datos 4G
- [ ] Tener la URL lista: **tepic.netlify.app**
- [ ] Practicar el flujo de pago OXXO 2 veces antes de la reunión
- [ ] Desactivar notificaciones del celular/computadora

### Flujo de demo recomendado (10 minutos)

**Minuto 1-2: Entrada al sistema**
- Abrir tepic.netlify.app
- Login con email demo: `demo@tepic.gob.mx` / contraseña: cualquiera
- "Así entraría un ciudadano de Tepic — con su email o con su CURP si está registrado en el gobierno federal"

**Minuto 3-4: Visión general**
- Mostrar el dashboard principal con todos los módulos
- "Esto es el sistema nervioso digital del Ayuntamiento — cada módulo es una dependencia"
- Click en "Mapa Municipal Digital" (Landmark azul)
- "Estas son las 16 dependencias del municipio. 12 ya están integradas en la plataforma"

**Minuto 5-7: El pago (momento clave)**
- Click en "Catálogo Único de Pagos" (tarjeta morada)
- "Aquí están los 73 conceptos de pago del municipio de Tepic en una sola pantalla"
- Buscar "Predial" en el buscador
- Click en "Generar QR OXXO" del Predial Urbano
- "El ciudadano toma una foto de este QR, va a cualquier OXXO de Tepic, y paga sin necesidad de cuenta bancaria"
- Mostrar los 4 pasos del modal

**Minuto 8-9: La diferenciación**
- Click en "Nayarit Originario" (hoja verde)
- Tab "La Zitacua"
- "Esta es nuestra propuesta para los artesanos wixáritari — un módulo de comercio justo digital que ningún otro sistema de gobierno tiene"

**Minuto 10: El cierre**
- "Lo que ve hoy es el prototipo. Lo que sigue después de firmar el convenio es cargar los datos reales del catastro, conectar Conekta para pagos reales, y en 30 días el primer ciudadano de Tepic puede pagar su predial en el OXXO de la esquina"

### Preguntas frecuentes durante la demo

**"¿Está conectado a nuestros sistemas?"**
> "Todavía no — eso es exactamente lo que se habilita con el convenio. El sistema está listo para recibir los datos. Lo que falta es el acceso oficial al catastro y las credenciales de Conekta."

**"¿Qué pasa si OXXO no confirma el pago?"**
> "Conekta tiene un SLA del 99.9% en sus webhooks. Si hay un problema, el sistema tiene un proceso de reconciliación manual y el ciudadano puede reportarlo al soporte."

**"¿Es seguro? ¿Quién guarda los datos?"**
> "Los datos del ciudadano son propiedad del municipio. ConnectX los procesa pero no los posee. Usamos Firebase de Google con encriptación AES-256 en tránsito y en reposo."

**"¿Cuánto cuesta?"**
> "Eso lo definimos en el convenio — tenemos modelo de cuota mensual fija o porcentaje de recaudación recuperada. Lo que es seguro es que el costo de la plataforma es menor al costo de cobrar predial en ventanilla."

---

## 11. PREGUNTAS FRECUENTES DEL AYUNTAMIENTO

### Para el área de Tesorería

**¿El dinero pasa por ConnectX?**
No. Los pagos de ciudadanos van directamente a la cuenta de la Tesorería Municipal a través de Conekta. ConnectX cobra por el servicio de plataforma, no por los pagos.

**¿Cómo sé cuánto se ha recaudado?**
El módulo de Tesorería muestra en tiempo real los pagos procesados. También se genera un reporte diario en PDF.

**¿Qué pasa con los comprobantes fiscales?**
El sistema genera recibos digitales con folio del Ayuntamiento. Los CFDI se generan a través de un PAC certificado por el SAT (PAC por definir en el convenio).

### Para el área de TI del Ayuntamiento

**¿Qué formato necesitan los datos del catastro?**
CSV, Excel, o cualquier base de datos exportable. Con datos mínimos: RFC/CURP del propietario, nombre, dirección del predio, valor catastral, adeudo actual.

**¿Necesitan acceso a nuestros sistemas internos?**
No necesitamos acceso en vivo. Un CSV actualizado mensualmente es suficiente para comenzar.

**¿Qué tan seguido se actualiza la información?**
Tan seguido como nos envíen datos. Idealmente: adeudos en tiempo real vía API, catastro mensual.

### Para la Presidencia Municipal

**¿Cuánto tiempo tarda en implementarse?**
Con datos del catastro disponibles: 30 días para el primer pago real. 90 días para el catálogo completo activo.

**¿Qué municipios más lo tienen?**
Ninguno en Nayarit. A nivel nacional, los más cercanos son Zapopan (Jalisco) e Irapuato (Guanajuato), pero sin módulo de pagos en efectivo ni módulo indígena.

---

## 12. INCIDENTES Y SOPORTE

### Niveles de incidente

| Nivel | Descripción | Tiempo de respuesta |
|---|---|---|
| **P1 — Crítico** | Plataforma caída completamente | < 1 hora |
| **P2 — Alto** | Módulo de pagos no funciona | < 4 horas |
| **P3 — Medio** | Error en una pantalla específica | < 24 horas |
| **P4 — Bajo** | Mejora o pregunta | Siguiente sprint |

### Canales de soporte

- **WhatsApp Business:** +52 311 XXX XXXX (P1 y P2)
- **Email:** soporte@nayaritdigital.mx
- **Portal:** tepic.netlify.app/soporte (por implementar)

### Checklist de diagnóstico rápido

Si la plataforma no carga:
1. Verificar status de Netlify: netlify.statuspage.io
2. Verificar status de Firebase: status.firebase.google.com
3. Verificar si hay un deploy en progreso en el panel de Netlify
4. Si todo está verde: revisar logs de la consola del navegador (F12)

---

## 13. HOJA DE RUTA TÉCNICA

### Próximas 4 semanas (post-contrato)

| Semana | Tarea | Responsable |
|---|---|---|
| 1 | Crear proyecto Firebase Producción | ConnectX TI |
| 1 | Abrir cuenta Conekta + OpenPay (respaldo) | Jordan / Legal |
| 1 | Registrar ConnectX en CEDN para Llave MX | Jordan |
| 2 | Recibir y cargar datos de catastro municipal | Enlace TI Ayuntamiento |
| 2 | Configurar variables de entorno en Netlify producción | ConnectX TI |
| 2-3 | Primer pago real de prueba (predial piloto) | Ambos equipos |
| 3-4 | Capacitación de 3 personas del Ayuntamiento | ConnectX |
| 4 | Primera nota de prensa | Comunicación Social |

### Deuda técnica conocida

- PagosView: OXXO QR es placeholder — requiere integración real con Conekta
- AuditoriaView: eventos son simulados — requiere Firebase Functions real
- TesoreriaView: KPIs son hardcoded — requieren conexión a Firestore
- Login: modo demo permite cualquier credencial — requiere Firebase Auth real
- PDF de recibo: no existe aún — requiere diseño + biblioteca de generación PDF

### Funcionalidades futuras (Fase 3-4)

- **TepicVisión**: slider de imágenes satelitales históricas (Landsat/Sentinel-2 via GEE)
- **CatastroVisión**: detección de cambio de uso de suelo con IA
- **Llave MX SSO**: login con CURP verificado por el gobierno
- **Notificaciones SMS**: recordatorio de vencimiento de predial
- **App móvil**: versión PWA instalable en Android/iOS
- **Módulo COAPATAP**: adeudos de agua en tiempo real

---

## GLOSARIO

| Término | Significado |
|---|---|
| **Conekta** | Procesador de pagos mexicano — habilita OXXO Pay y tarjetas |
| **Firebase** | Plataforma de Google para auth, base de datos y hosting |
| **Firestore** | Base de datos NoSQL en tiempo real de Firebase |
| **Llave MX** | Sistema SSO del gobierno federal — login con CURP |
| **CEDN** | Centro de Gobierno Digital — otorga las credenciales de Llave MX |
| **PAC** | Proveedor Autorizado de Certificación — genera CFDI (facturas electrónicas) |
| **OXXO Pay** | Sistema de pagos en efectivo en tiendas OXXO — sin banco |
| **CLABE** | Clave Bancaria Estandarizada — 18 dígitos para transferencias bancarias |
| **Catastro** | Registro de propiedades inmuebles del municipio |
| **Predial** | Impuesto anual sobre propiedades inmuebles |
| **COAPATAP** | Comisión de Agua Potable y Alcantarillado de Tepic |
| **IMPLAN** | Instituto Municipal de Planeación Urbana de Tepic |
| **Webhook** | Notificación HTTP automática cuando ocurre un evento (ej: pago confirmado) |
| **SLA** | Service Level Agreement — compromiso de disponibilidad del sistema |
| **GEE** | Google Earth Engine — plataforma de análisis de imágenes satelitales |
| **DENUE** | Directorio Estadístico Nacional de Unidades Económicas (INEGI) |
| **LFDA** | Ley Federal de Derechos de Autor |
| **LNETB** | Ley de Negociaciones en Línea y Tecnologías para los Bienes (o Ley equivalente) |
| **Wixáritari** | Pueblo indígena conocido como Huichol — nombre correcto en su idioma |
| **La Zitacua** | Colonia de Tepic donde reside una comunidad wixáritari urbana |

---

*Documento elaborado por ConnectX Servicios S.A. de C.V.*
*NYD-500 / Manual de Plataforma / Versión 1.0 / Julio 2026*
*Actualizar este documento con cada versión mayor de la plataforma.*
