# Aura como asesora de la plataforma — reportes reales + rediseño

**Nayarit Digital / ConnectX** · Documento técnico-operativo · v1.0

## El problema que resuelve

Aura respondía preguntas, pero no podía actuar: si un ciudadano describía un
bache o una luminaria fundida en el chat, lo único que podía hacer era
explicarle que fuera al módulo de reportes — el chat no vivía conectado con
el resto del ecosistema. Y el encabezado del chat exponía nombres técnicos
internos ("Thinking Mode", "Maps Grounding", "Search Grounding") como si
fueran botones para el ciudadano final, sin explicar qué hacían.

## Función real: `reportar_incidencia`

Aura ahora puede registrar un reporte ciudadano real (bache, luminaria,
falla de agua) durante la conversación, usando function calling de Gemini:

1. El ciudadano describe el problema y confirma que quiere reportarlo.
2. Gemini decide invocar `reportar_incidencia` (definida en `server.ts`) en
   vez de solo responder texto.
3. El servidor **no escribe a Firestore** — no hay credenciales de Firebase
   Admin en este proyecto. En vez de eso regresa la acción al cliente
   (`{ response, accion: { tipo, args } }`).
4. El cliente (`useAuraChat` + `onAccion` en `CitizenApp.tsx`) hace la
   escritura real con la sesión de Firebase ya autenticada del ciudadano,
   usando `src/services/reportesCiudadanosService.ts`, bajo las mismas
   reglas de seguridad que tendría un formulario.
5. **Si la escritura falla, el mensaje optimista del servidor se descarta**
   y se muestra un aviso honesto en su lugar — nunca se le dice al
   ciudadano que algo quedó registrado si en realidad no se guardó.

La función solo se ofrece en modo normal (no se puede combinar con Maps
Grounding, Search Grounding, ni Thinking Mode en la misma llamada a
Gemini). El system prompt (`public/CONNECTX_SYSTEM_PROMPT.md`) instruye a
Aura a usarla solo cuando el ciudadano confirme que quiere reportar algo,
no para preguntas generales.

## Modelo de datos: `reportes_ciudadanos`

Cada reporte (`origen: 'chat_aura' | 'formulario'`, para trazabilidad, no
cambia permisos):

- Lo crea el propio ciudadano (`uid` = su sesión), siempre con
  `estado: 'nuevo'` — no puede crearlo ya "resuelto" para saltarse la cola.
- Solo el autor o personal con rol editor/admin pueden leerlo.
- Solo personal editor/admin puede cambiar su estado.

**Verificado con `@firebase/rules-unit-testing` contra el emulador real**:
8 casos nuevos, 35/35 en total junto con las pruebas de salud y citas ya
existentes — creación por el autor, bloqueo de suplantación de `uid`,
bloqueo de saltarse el estado inicial, lectura restringida al autor o
personal, y que el ciudadano no pueda cambiar el estado de su propio
reporte.

## Guía de trámites (sin inventar datos)

El system prompt ahora instruye a Aura a explicar la secuencia real de
pasos para un trámite (a qué pestaña ir, qué va a encontrar ahí) **sin
inventar montos en pesos** — el monto exacto ya se muestra en pantalla
cuando el ciudadano entra a "Pagos y Trámites", y Aura debe remitir ahí en
vez de adivinar una cifra. Esto evita fabricar datos mientras el
ecosistema no tenga todavía un catálogo real y completo de trámites
conectado al chat.

## Rediseño del encabezado del chat

Se reemplazaron las tres píldoras con nombres técnicos internos y la
píldora de voz suelta por: un botón de voz siempre visible (el más usado,
con `aria-pressed` y `aria-label` reales) y un botón único de "Más
opciones" que abre un menú con lenguaje humano y una frase de qué hace
cada modo ("Pensar a fondo", "Buscar en mapas", "Buscar en internet"),
siguiendo el principio de *transparencia de capacidades* y *divulgación
progresiva* de las guías de diseño de interfaces de IA de 2026 — no
esconder qué puede hacer el asistente, pero tampoco exponer nombres de
implementación interna como si fueran la interfaz.

## Pendiente / fuera de alcance de este cambio

- Los tres botones estáticos "Auditoría de Luminaria/Bacheo/Falla
  Hídrica" en el módulo de Servicios siguen sin estar conectados a
  `reportes_ciudadanos` — quedan igual que antes de este cambio. Conectarlos
  es una extensión natural y pequeña si se quiere después.
- No existe todavía un catálogo real y completo de trámites/pagos
  conectado al chat (el que se mencionó en un contexto de otra sesión vive
  en una rama distinta, nunca fusionada a `main`) — por eso Aura remite a
  la pantalla real en vez de inventar montos.
