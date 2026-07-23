# 03 · Documentación funcional — módulos reales y sus alias

**Nayarit Digital / ConnectX / SOATM** · Documento funcional · v1.0

Este documento **no reescribe** cada módulo — cada uno sigue teniendo su
único archivo fuente en `docs/orbe/modulos/` (regla "un círculo = un módulo =
un archivo" de `docs/orbe/README.md`). Lo que aporta es el mapeo entre (a)
los nombres coloquiales que el equipo usa al hablar del proyecto, muchos de
ellos con errores de transcripción de voz, y (b) el nombre real, el archivo
fuente y el componente SOATM (`02-ARQUITECTURA-SISTEMA.md`) al que
pertenecen.

## Tabla de alias → módulo real

| Alias usado por el equipo | Módulo real | Componente SOATM | Estado | Fuente |
|---|---|---|---|---|
| "Faro Fiscal" | Tesorería Digital | SOATM Analytics | Hoja de ruta (maqueta visual) | `docs/orbe/modulos/TESORERIA.md`; `C5Dashboard.tsx` → `TesoreriaView()` |
| "TeCuID" | Expediente Digital Familiar (CURP) | SOATM Identity + Citizen | Operativo en demo (adulto/familiar); Hoja de ruta (variante infantil) | `docs/orbe/modulos/EXPEDIENTE_FAMILIAR.md`; `src/services/saludPerfilService.ts` |
| "Crash Médico" | TEPICTU Salud (triaje IA, protocolo Manchester) | SOATM AI Engine + Citizen | Operativo en demo — construido dentro de `SaludNayaritID.tsx`, aunque `docs/orbe/modulos/TEPICTU_SALUD.md` todavía lo marca como "Diseñado" (doc desactualizado, ver nota abajo) | `src/components/SaludNayaritID.tsx` |
| "AgroVisión 3D" | Agrovisión 3D (panel de monitoreo agrícola) | SOATM Analytics | Hoja de ruta (maqueta visual, "Octane 3D Engine" es texto decorativo) | `C5Dashboard.tsx` → `AgrovisionView()` |
| "Carreteras Inteligentes" | Trazabilidad de Obras | SOATM Digital Twin | Preparado, huérfano (no enlazado en `App.tsx`) | `docs/orbe/modulos/OBRAS.md`; `src/services/infrastructureService.ts` |
| "Gemelo Digital" | SovereignMap (editor de infraestructura) | SOATM Digital Twin | Preparado, huérfano | `src/components/SovereignMap.tsx` |
| "Motor Cognitivo" | Aura / Motor Central de IA | SOATM AI Engine | Operativo | `server.ts` (`/api/ai/chat`, `/api/ai/risk-analysis`); `docs/orbe/modulos/ORBE_NUCLEO.md` |
| "Portal Ciudadano" | CitizenApp | SOATM Citizen | Operativo en demo | `src/components/CitizenApp.tsx` |

**Nota sobre TEPICTU/"Crash Médico"**: existe una discrepancia real entre
documentación y código que vale la pena señalar aquí en vez de esconder:
`docs/orbe/modulos/TEPICTU_SALUD.md` dice "pendiente de implementación como
módulo propio", pero el triaje con niveles ROJO/AMARILLO/VERDE (protocolo
Manchester) sí está implementado — solo que **dentro** del componente de
Expediente Familiar (`SaludNayaritID.tsx`) en vez de como módulo
independiente. La función existe; el módulo formal separado, no. Corregir el
estado en `docs/orbe/modulos/TEPICTU_SALUD.md` queda fuera del alcance de
esta entrega (ver "Pendientes" abajo).

## Índice de los 9 módulos del Orbe (sin alias, tal como viven en `docs/orbe/`)

| Módulo | Estado (según su propio archivo) | Archivo fuente |
|---|---|---|
| Llave e Identidad (Llave MX + Llave Infantil) | Propuesta aterrizada | `docs/orbe/modulos/LLAVE_IDENTIDAD.md` |
| Expediente Digital Familiar | Piloto Tepic funcionando | `docs/orbe/modulos/EXPEDIENTE_FAMILIAR.md` |
| TEPICTU Salud | Diseñado *(ver nota de discrepancia arriba)* | `docs/orbe/modulos/TEPICTU_SALUD.md` |
| Tesorería Digital | Diseñado | `docs/orbe/modulos/TESORERIA.md` |
| Trazabilidad de Obras | Diseñado | `docs/orbe/modulos/OBRAS.md` |
| Servicios Públicos Inteligente | Diseñado | `docs/orbe/modulos/SERVICIOS_PUBLICOS.md` |
| Bienestar Social | Diseñado | `docs/orbe/modulos/BIENESTAR.md` |
| Pulso Nayarit | Backend desplegado | `docs/orbe/modulos/PULSO_NAYARIT.md` |
| Protección Digital | Propuesta aterrizada | `docs/orbe/modulos/PROTECCION_DIGITAL.md` |

## Código construido pero huérfano (no alcanzable desde `App.tsx`)

Además de `SovereignMap.tsx`/`MandoCentral.tsx` (ya cubierto arriba), estos
componentes existen en `src/components/` con cero referencias en
`src/App.tsx` — construidos en algún momento, luego superados o
desconectados sin limpiar:

- `ModularBrain.tsx`, `CitizenOS.tsx` — versiones previas del núcleo/portal,
  reemplazadas por `App.tsx` + `CitizenApp.tsx`.
- `DepartmentManager.tsx` — gestión de dependencias, sin ruta activa.
- `TesisCienciaPolitica.tsx` — el pitch de estrategia política/financiera
  (fuera de alcance de esta documentación de producto — ver
  `06-LIBRO-BLANCO.md` §"Qué se excluye").
- `ErrorBoundary.tsx` — ni siquiera está montado en `src/main.tsx`.

No se recomienda borrarlos en esta entrega (es un cambio de código, fuera del
alcance "solo documentación" acordado); se listan aquí para que quien lea
`03` sepa que "el archivo existe" no es lo mismo que "el módulo está vivo".

## Pendientes de este documento

- [ ] Actualizar el estado de `docs/orbe/modulos/TEPICTU_SALUD.md` para
      reflejar que el triaje sí está implementado (dentro de
      `SaludNayaritID.tsx`), no como módulo propio — cambio de código/doc
      fuera de este PR, dejarlo como seguimiento.
- [ ] Decidir si `SovereignMap`/`MandoCentral` se conectan a `App.tsx` o se
      retiran — decisión de producto, no de documentación.
