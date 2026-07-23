# 02 · Arquitectura del sistema — los 10 componentes SOATM

**Nayarit Digital / ConnectX / SOATM** · Documento de arquitectura · v1.0

Cada fila es un componente de plataforma con nombre estable. Regla de
nomenclatura (Silla de Diseño de Marca): **un componente, un nombre, siempre**
— si dos partes del código hacen algo parecido, se documenta cuál es el
componente real y cuál es duplicado/huérfano, nunca se le da el mismo nombre
a ambos.

Etiquetas de estado: mismas cuatro de `MARCO_CUMPLIMIENTO_LNETB.md`
(**Operativo / Operativo en demo / Preparado / Hoja de ruta**), con nota
explícita cuando la pieza no encaja limpio en ninguna.

## SOATM Kernel

**Qué hace**: orquesta — no almacena. Enruta eventos y conversación entre los
demás componentes a través de un único núcleo agéntico llamado **Aura**.

**Dónde vive**: `docs/orbe/modulos/ORBE_NUCLEO.md`; código en `src/App.tsx`,
`src/services/`, endpoints de IA en `server.ts`.

**Estado**: **Preparado, parcial** — Aura funciona como agente conversacional
unificado (ver SOATM AI Engine), pero el **bus de eventos formal** entre
módulos que el propio documento del núcleo lista como pendiente **no existe
todavía**: hoy la integración entre módulos (p. ej. "un reporte con costo
genera un pago en Tesorería") es acoplamiento punto a punto en la UI, no un
bus de eventos real. `ModularBrain.tsx` y `CitizenOS.tsx`, que
`ORBE_NUCLEO.md` cita como código de este componente, tienen **cero
referencias en `App.tsx`** — código muerto o superado, no el kernel activo.

## SOATM Identity

**Qué hace**: identidad ciudadana y del vínculo tutor-menor; puerta de
consentimiento para cualquier módulo que toque datos de una persona.

**Dónde vive**: `docs/orbe/modulos/LLAVE_IDENTIDAD.md`; identidad de adulto
vía Firebase (`src/firebase.ts`, `src/components/LoginView.tsx`); identidad
de salud ligada a CURP en `src/services/saludPerfilService.ts` y
`firestore.rules` (`perfiles_salud/{curp}`).

**Estado**: **mixto, documentar ambas mitades por separado**:
- CURP adulto/familiar → **Operativo en demo** (piloto Tepic funcionando,
  reglas de acceso reales en `firestore.rules`).
- Llave Infantil / identidad de menor con doble anonimato (SINISI) →
  **Hoja de ruta** — propuesta legislativa completa en
  `docs/marco/soberania-digital-infantil/`, **cero código**.

## SOATM Data Bus

**Qué hace**: en la visión, el canal de eventos formal por el que los
componentes se enteran de lo que pasa en otros sin acoplarse directo (p. ej.
Servicios Públicos → Tesorería cuando un reporte tiene costo).

**Dónde vive**: mencionado como pendiente en `docs/orbe/modulos/ORBE_NUCLEO.md`
("Definir el bus de eventos formal entre círculos").

**Estado**: **Hoja de ruta — no implementado.** Esto se documenta aparte del
Kernel a propósito: la ausencia de un bus real es la brecha arquitectónica
más citada en la propia documentación existente, y darle nombre propio
("SOATM Data Bus: Hoja de ruta") es más honesto que enterrarla como nota al
pie del Kernel.

## SOATM AI Engine

**Qué hace**: el motor conversacional e inferencial compartido. Un único
endpoint de servidor que todos los módulos reutilizan en vez de crear cada
uno su propio cliente de IA.

**Dónde vive**: `server.ts` → `/api/ai/chat` (conversación general, con modos
`useThinking`/`useMaps`/`useSearch`) y `/api/ai/risk-analysis` (análisis
estructurado con JSON schema); hooks `src/hooks/useAuraChat.ts`,
`src/hooks/useAuraVoice.ts`; consumido por `C5Dashboard.tsx` (vista de
Asistente IA) y directamente por el chat de triaje en `SaludNayaritID.tsx`.

**Estado**: **Operativo.** Es, junto con SOATM Citizen, el componente mejor
verificado del ecosistema: la llave `GEMINI_API_KEY` vive solo en el
servidor (`getAI()` en `server.ts`), nunca en el navegador — regla reforzada
por la Guardia de regresiones en CI (`scripts/verificar-regresiones.mjs`,
regla R2: ningún archivo bajo `src/` puede crear su propio cliente
`GoogleGenAI`).

## SOATM Digital Twin

**Qué hace**: en la visión, la representación viva del territorio —
infraestructura, obras y activos geolocalizados, editable y auditable.

**Dónde vive**: `src/components/SovereignMap.tsx` (editor de activos sobre
Google Maps: roles ingeniero/conductor, dibujo de polilíneas para vialidades)
y `src/services/infrastructureService.ts` (modelo `InfrastructureAsset`:
`ROAD`, `BRIDGE`, `SCHOOL`, `HEALTH_CENTER`, `WATER_INFRA`, `ENERGY`,
`SECURITY`).

**Estado**: **Preparado, pero huérfano** — el código existe y es funcional,
pero solo se monta desde `src/components/MandoCentral.tsx`, que no está
importado en ninguna parte de `src/App.tsx`. Es decir: **no es alcanzable
desde la aplicación que corre en producción hoy**, aunque el componente esté
terminado. `NayaritMap.tsx` sí está conectado (dentro de Obras/Reportes
Urbanos), pero es un mapa de consulta simple, no el gemelo digital editable.

## SOATM Analytics

**Qué hace**: en la visión, tableros de inteligencia territorial —
fiscal/tesorería, agroindustria, riesgo — para el gabinete de gobierno.

**Dónde vive**: `src/components/C5Dashboard.tsx` → `TesoreriaView()` (métrica
"Transparencia Fiscal 94 %") y `AgrovisionView()` ("Octane 3D Engine").

**Estado**: **Hoja de ruta, presentada hoy como maqueta visual** — ambos
paneles muestran cifras fijas escritas en el componente, sin servicio,
colección ni pipeline de datos detrás. `docs/orbe/modulos/TESORERIA.md` ya lo
marca correctamente como "Diseñado"; este documento lo hace explícito también
a nivel de plataforma para que nadie lo presente como analítica en vivo.

## SOATM Citizen

**Qué hace**: el portal único del ciudadano — todo trámite, reporte,
expediente y programa social en una sola cuenta.

**Dónde vive**: `src/components/CitizenApp.tsx`, ruta `'citizen'` en
`src/App.tsx`. Agrega ~15 subfeatures: expediente de salud
(`SaludNayaritID.tsx`), reportes urbanos, canjes/recompensas, academia
ConnectX, auditoría ciudadana (mystery shopper), cartas municipales,
notificaciones.

**Estado**: **Operativo en demo** — es el componente más completo y más
activamente enrutado de todo el ecosistema.

## SOATM Developer Platform

**Qué hace**: en la visión, SDK, documentación y sandbox para que un tercero
(otro municipio, un proveedor) integre un módulo nuevo sobre SOATM sin
reescribir identidad ni seguridad.

**Dónde vive**: no existe como tal. `src/components/DeveloperChecklist.tsx`
es una lista de verificación de despliegue (Lighthouse, metadatos, code
splitting), no un SDK ni una plataforma de integración para terceros.

**Estado**: **Hoja de ruta — no existe hoy.** Ver `05-MANUAL-DESARROLLADORES.md`
para el detalle de qué API real sí puede consumirse hoy sin SDK.

## SOATM Security

**Qué hace**: reglas de acceso, protección de secretos, y guardia automática
contra regresiones de seguridad.

**Dónde vive**: `firestore.rules` (378 líneas, ~40 funciones/reglas —
identidad, consentimiento de salud, bitácora de accesos), `storage.rules`,
`docs/marco/PROTOCOLO_SEGURIDAD.md`, `scripts/verificar-regresiones.mjs` +
`.github/workflows/guardia-regresiones.yml`.

**Estado**: **Operativo**, con una salvedad documentada que hay que cargar:
`docs/marco/MODULO_SALUD_CURP.md` declara "27/27" pruebas de reglas de
Firestore verificadas con `@firebase/rules-unit-testing` contra el emulador.
**Se buscó ese archivo de pruebas en el árbol de trabajo, en `main` y en las
27 ramas remotas del repositorio, y no existe en ninguna** — tampoco la
dependencia `@firebase/rules-unit-testing` está en `package.json` hoy. Las
reglas en sí (`firestore.rules`) sí existen y sí se pueden auditar
manualmente; lo que no es reproducible hoy es la afirmación "27/27
verificadas". Se documenta aquí en vez de repetir la cifra sin poder
señalarla, siguiendo la propia regla de honestidad de
`MARCO_CUMPLIMIENTO_LNETB.md`.

## SOATM Governance

**Qué hace**: el proceso de gobernanza *del repositorio y del desarrollo* —
quién decide, quién revisa, qué se documenta en acta.

**Dónde vive**: `docs/marco/GOBERNANZA_REPOSITORIO.md`,
`docs/agentes/GABINETE_ESPECIALISTAS.md`, `docs/actas/`.

**Estado**: **Operativo** como proceso — pero es importante no confundirlo
con una feature de la plataforma en tiempo de ejecución: es gobernanza de
cómo se construye SOATM, no un componente que un ciudadano o un desarrollador
externo consuma.

---

*Este documento fue revisado por la Silla de Arquitectura de Plataforma
(coherencia con `04-ARQUITECTURA-DATOS.md`) y la Silla de Diseño de Marca
(un nombre por componente) — ver `docs/plataforma/README.md`.*
