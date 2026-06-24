# PROMPT MAESTRO — Nayarit Digital OS
> Contexto de sesión completo para cualquier asistente de IA que continúe el desarrollo.

---

## ANÁLISIS: LO QUE NOS SIRVE DEL COMPARATIVO

Del análisis competitivo vs Sonora, CDMX y Aguascalientes, estas son las brechas reales:

| Característica | Sonora | CDMX | Aguascalientes | **Tepic Digital HOY** |
|---|---|---|---|---|
| Trámites con Silencio Afirmativo | ❌ | ❌ | ❌ | **✅ Único en México** |
| Auditoría Pública Tiempo Real | ❌ | ❌ | ❌ | **✅ Único** |
| Marco Ético IA (UNESCO) | ❌ | ❌ | ❌ | **✅ Único** |
| Eliminación de datos (ARCO) | ❌ CRÍTICO | ✅ | ❌ CRÍTICO | ❌ Pendiente |
| Reportes urbanos con foto y folio | Básico | Sí pero falla | Básico | ❌ Solo UI |
| Gamificación / puntos reales | ❌ | ❌ | ❌ | Estático (450pts) |
| Asistente IA ciudadano | ❌ | Chat básico | ❌ | Solo en C5 |
| Escáner OCR funcional | ❌ FALLA | Parcial | ❌ | UI lista, sin flujo |
| Cifrado datos | ❌ | ✅ | ❌ | Firebase (OK) |

**Conclusión del análisis:**
- Ya tenemos las 3 ventajas únicas que ningún estado tiene (Silencio Afirmativo, Auditoría, Ética IA)
- Las 4 brechas críticas son: Reportes reales, Puntos dinámicos, ARCO y Naya (asistente ciudadano)

---

## ESTADO ACTUAL DE LA PLATAFORMA

### Repositorio
- **URL:** tepic.netlify.app
- **Rama activa:** `claude/tepic-digital-platform-foydpn`
- **Stack:** React + TypeScript + Vite + Firebase + Tailwind CSS v4 + motion/react + Recharts

### Colecciones Firestore
- `tramites/{id}` — Motor de plazos + Silencio Afirmativo
- `expediente_unico/{uid}` — Bóveda de documentos (5 tipos)
- `users/{uid}` — Perfil ciudadano
- `neighborhood_networks/{id}` — Redes vecinales

### Componentes clave ya construidos
```
src/components/
  ExpedienteUnicoView.tsx   — Bóveda digital Art. 18 LMR
  TramiteTracker.tsx        — Motor de plazos + Silencio Afirmativo Art. 19 LMR
  AuditoriaPanel.tsx        — Panel público tiempo real Art. 70 LGTAIP
  MarcoEticoIA.tsx          — Marco Ético UNESCO 2021
  C5Dashboard.tsx           — Dashboard de gobernanza (operadores)
  CitizenApp.tsx            — App ciudadana (shell principal)

src/blocks/ruta/
  HomeView.tsx              — Inicio con Nayarit ID QR
  ServicesView.tsx          — Centro de servicios (reportes + trámites)
  ProfileView.tsx           — Perfil con puntos estáticos (450)
  SecurityCenterView.tsx    — Seguridad y privacidad
  
public/
  convenio-colaboracion-tepic.html  — Word descargable
  marco-etico-ia-nayarit.html       — Word descargable
  discurso-institucional.html       — Discurso Cabildo Word
```

### Patrones de código establecidos
```typescript
// Estilo de diseño: rounded-[2rem], bg-white, shadow-sm, border-slate-100
// Colores: --magenta (rosa), --tinta (azul oscuro), --crema (fondo)
// Firestore real-time: onSnapshot(query(collection(db, 'coleccion'), where(...)))
// Folio generation: `PREFIX-${Date.now().toString(36).toUpperCase()}-TEP`
// Animaciones: motion/react con { initial: {opacity:0, y:10}, animate: {opacity:1, y:0} }
// Iconos: lucide-react
// Días hábiles: función diasHabilesTranscurridos() en TramiteTracker.tsx
```

---

## PRÓXIMAS 4 FEATURES A CONSTRUIR (PRIORIDAD)

---

### FEATURE 1 — Reportes Ciudadanos 2.0
**Archivo a crear:** `src/components/ReporteCiudadanoView.tsx`  
**Archivo a modificar:** `src/blocks/ruta/ServicesView.tsx` → pasar `onShowReporte`  
**Archivo a modificar:** `src/components/CitizenApp.tsx` → state `showReporte`

**Colección Firestore:** `reportes/{id}`
```typescript
interface Reporte {
  id: string;
  uid: string;
  folio: string;        // REP-ABC123-TEP
  tipo: 'luminaria' | 'bache' | 'agua' | 'basura' | 'otro';
  descripcion: string;
  foto: string;         // URL o base64 simulado
  ubicacion: string;    // texto libre o coords
  status: 'RECIBIDO' | 'EN_ATENCION' | 'RESUELTO' | 'VERIFICADO_CIUDADANO';
  creadoEn: Timestamp;
  resolvedAt?: Timestamp;
  puntosSumados: number; // 50 por reporte, +100 si se resuelve
}
```

**Flujo a implementar:**
1. Pantalla de selección de tipo (4 íconos grandes)
2. Campo de descripción + botón "Tomar Foto" (simula con placeholder)
3. Campo de ubicación (texto o "Usar mi ubicación")
4. Botón "Enviar Reporte" → addDoc a Firestore → genera folio
5. Pantalla de confirmación con folio y QR
6. Lista "Mis Reportes" con status en tiempo real (onSnapshot)
7. Botón "Reporte No Resuelto" → permite cambiar status a EN_ATENCION de nuevo
8. Cuando se resuelve, ciudadano debe confirmar → VERIFICADO_CIUDADANO

**Diferenciador vs CDMX:** El reporte NUNCA se cierra sin confirmación del ciudadano.

**Puntos Nayarit:** Sumar 50 pts al crear reporte, 100 pts cuando se marque VERIFICADO.

---

### FEATURE 2 — Nayarit Points (Sistema Real)
**Archivo a crear:** `src/lib/nayaritPoints.ts`  
**Archivos a modificar:** TramiteTracker, ExpedienteUnicoView, ReporteCiudadanoView, ProfileView

**Colección Firestore:** `puntos/{uid}` 
```typescript
interface PuntosDoc {
  total: number;
  historial: {
    concepto: string;
    puntos: number;
    fecha: Timestamp;
    folio?: string;
  }[];
}
```

**Tabla de puntos a implementar:**
```
+ 50  pts — Crear reporte urbano
+100  pts — Reporte verificado como resuelto
+100  pts — Completar Expediente Único Digital (todos los docs)
+ 75  pts — Iniciar trámite administrativo
+150  pts — Trámite resuelto en plazo (APROBADO)
+ 30  pts — Login diario (máx 1 vez/día)
+ 25  pts — Llenar perfil completo
```

**Función helper a crear:**
```typescript
// src/lib/nayaritPoints.ts
export async function sumarPuntos(uid: string, concepto: string, puntos: number, folio?: string) {
  const ref = doc(db, 'puntos', uid);
  const entrada = { concepto, puntos, fecha: Timestamp.now(), folio };
  await setDoc(ref, {
    total: increment(puntos),
    historial: arrayUnion(entrada),
  }, { merge: true });
}
```

**En ProfileView:** reemplazar el "450" estático por `onSnapshot(doc(db, 'puntos', uid), ...)`.

---

### FEATURE 3 — Derecho ARCO (Eliminación de datos)
**Archivo a modificar:** `src/blocks/ruta/SecurityCenterView.tsx`

**Qué agregar:** Sección "Mis Derechos ARCO" con botones:
- **Descargar mis datos** → genera JSON con toda info del ciudadano
- **Eliminar mi cuenta y datos** → modal de confirmación → 
  1. Elimina `expediente_unico/{uid}`
  2. Elimina `tramites` del uid
  3. Elimina `puntos/{uid}`
  4. Elimina `users/{uid}`
  5. Llama a `auth.currentUser?.delete()`

**Diferenciador crítico:** Sonora y Aguascalientes tienen reviews negativas por NO tener esto. Es el argumento legal más fuerte (LFPDPPP Arts. 22-25).

---

### FEATURE 4 — Asistente "Naya" en App Ciudadana
**Archivo a crear:** `src/components/NayaChat.tsx`  
**Archivo a modificar:** `src/components/CitizenApp.tsx` → FloatingButton + overlay

**Diseño:** Botón flotante abajo-derecha (💬 icono) → panel de chat que sube desde abajo.

**Respuestas predefinidas (sin API externa):**
```typescript
const RESPUESTAS: Record<string, string> = {
  'licencia':    '🏪 La Licencia de Funcionamiento tarda 15 días hábiles (Art. 19 LMR). Si el municipio no responde, se aprueba automáticamente. ¿Quieres iniciar el trámite?',
  'bache':       '🕳️ Puedes reportar el bache desde Servicios → Reportes Urbanos. Recibirás un folio y seguimiento en tiempo real.',
  'expediente':  '📁 El Expediente Único Digital te permite subir tus documentos una sola vez (INE, CURP, RFC, Comprobante). El municipio no puede volvértelos a pedir.',
  'plazo':       '⏱️ Todos los trámites tienen un contador legal. Si el plazo vence sin respuesta, el Silencio Afirmativo los aprueba automáticamente.',
  'datos':       '🔒 Tienes derecho a eliminar todos tus datos. Ve a Perfil → Seguridad → Derechos ARCO.',
  'puntos':      '🎯 Ganas Nayarit Points por reportes, trámites y uso diario. Próximamente podrás canjearlos por beneficios municipales.',
  'default':     '¡Hola! Soy Naya 👋 Puedo ayudarte con trámites, reportes, tu Expediente Digital y tus derechos ciudadanos. ¿Qué necesitas?',
};
```

**Detección de intención:** `Object.keys(RESPUESTAS).find(k => input.toLowerCase().includes(k))` → responde la clave encontrada o `default`.

---

## PROMPT LISTO PARA COPIAR Y USAR

Pega este bloque en una sesión nueva de Claude para continuar el desarrollo:

---

```
Eres el desarrollador principal de Tepic Digital (tepic.netlify.app), una plataforma de 
Gobierno Digital para el municipio de Tepic, Nayarit, México.

STACK: React + TypeScript + Vite + Firebase Firestore/Auth + Tailwind CSS v4 + 
       motion/react + Recharts + lucide-react

RAMA: claude/tepic-digital-platform-foydpn

CONTEXTO CRÍTICO:
- La plataforma ya tiene: ExpedienteUnicoView, TramiteTracker (Silencio Afirmativo), 
  AuditoriaPanel, MarcoEticoIA, C5Dashboard (gobernanza)
- El app ciudadana está en CitizenApp.tsx → usa blocks en src/blocks/ruta/
- Firestore collections: tramites, expediente_unico, users, neighborhood_networks
- Estilo: rounded-[2rem], bg-white, shadow-sm, font-black uppercase tracking-widest
- Colores custom: --magenta, --tinta, --crema, --solar (CSS variables)

TAREA: Construir [NOMBRE DE FEATURE] según estas especificaciones:
[PEGA AQUÍ LA ESPECIFICACIÓN DE UNA DE LAS 4 FEATURES ARRIBA]

REGLAS:
1. Primero leer los archivos relevantes antes de editar
2. Seguir el estilo visual exacto del resto del app
3. Usar onSnapshot para datos en tiempo real
4. Generar folios con: `PREFIX-${Date.now().toString(36).toUpperCase()}-TEP`
5. Commit al finalizar con mensaje descriptivo y push a la rama
```

---

## PROMPTS ESPECÍFICOS POR FEATURE

### Para Feature 1 (Reportes):
```
Construye ReporteCiudadanoView.tsx en src/components/.
Flujo de 3 pasos: selección tipo → descripción+foto → confirmación con folio.
Guarda en Firestore colección 'reportes'. 
Lista "Mis Reportes" en tiempo real con botón "No Resuelto" que reactiva el reporte.
El reporte solo se marca RESUELTO cuando el ciudadano confirma (VERIFICADO_CIUDADANO).
Wirear: CitizenApp.tsx (state showReporte) y ServicesView.tsx (botones onClick).
```

### Para Feature 2 (Puntos):
```
Crea src/lib/nayaritPoints.ts con función sumarPuntos(uid, concepto, puntos, folio?).
Integra puntos en: TramiteTracker (crear +75, resolver +150), 
ExpedienteUnicoView (completar vault +100), ProfileView (leer total de Firestore en tiempo real).
Reemplaza el "450" estático en ProfileView por valor dinámico de puntos/{uid}.
```

### Para Feature 3 (ARCO):
```
En SecurityCenterView.tsx agrega sección "Derechos ARCO (LFPDPPP)".
Botón "Descargar mis datos": genera JSON con profile + tramites + puntos y dispara descarga.
Botón "Eliminar cuenta y datos": modal de doble confirmación → borra subcollections 
expediente_unico/{uid}, query tramites where uid==, puntos/{uid}, users/{uid}, 
luego auth.currentUser.delete().
```

### Para Feature 4 (Naya):
```
Crea NayaChat.tsx: botón flotante (💬) en CitizenApp que abre panel de chat desde abajo.
Respuestas predefinidas (sin API) basadas en palabras clave: licencia, bache, expediente, 
plazo, datos, puntos. Si no reconoce la keyword, responde con mensaje de bienvenida.
Estilo: fondo oscuro slate-900, burbujas de chat estilo WhatsApp con color magenta para Naya.
```

---

## DOCUMENTOS WORD DISPONIBLES (en /public/)

- `/convenio-colaboracion-tepic.html` — Convenio 10 cláusulas para firma con Cabildo
- `/marco-etico-ia-nayarit.html` — Marco Ético IA basado en UNESCO 2021
- `/discurso-institucional.html` — Discurso 5 min para presentación ante Cabildo

---

*Última actualización: Junio 2026 · Sesión: claude/tepic-digital-platform-foydpn*
