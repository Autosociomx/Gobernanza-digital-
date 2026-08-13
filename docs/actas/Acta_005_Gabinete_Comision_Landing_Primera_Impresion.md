# Acta_005_Gabinete_Comision_Landing_Primera_Impresion.md

## Acta 005 — Gabinete de Especialistas · Comisión
**Tema:** Auditoría de la primera impresión (landing + navegación) y sus afirmaciones públicas
**Sillas convocadas:** E2 (Derecho Administrativo) · E14 (UX/Diseño) · E15 (Ingeniería de Software)
**Modalidad:** Comisión (3 sillas) — dictamen por intervención paralela
**Fecha:** 13 agosto 2026
**Regla aplicada:** neutralización del ego + anclaje al código + formato [HALLAZGO]/[RECOMENDACIÓN]/[MÓDULO]

---

## 🎙️ INTERVENCIONES

### E2 · Derecho Administrativo (9 hallazgos)

**[HALLAZGO 1]** El subtítulo del hero declara "El canal digital **oficial** del municipio de Tepic". "Oficial" es una calificación jurídica que exige acto de autoridad. En el expediente la autoridad emisora, unidad y firmante están "Por determinar". No existe bando, reglamento ni acuerdo de Cabildo que invista al canal como oficial.
[RECOMENDACIÓN] Sustituir por "prototipo piloto presentado al Ayuntamiento de Tepic".
[MÓDULO] `PlatformLanding.tsx` (~línea 81)

**[HALLAZGO 2]** Badge "CURP **Verificada** · Algoritmo RENAPO" sugiere conexión a RENAPO inexistente. La verificación es solo sintáctica (dígito verificador); el propio expediente la marca 🟡 Demo "sin conexión a RENAPO".
[RECOMENDACIÓN] "Validación sintáctica de CURP (dígito verificador)".
[MÓDULO] `PlatformLanding.tsx` (~línea 92)

**[HALLAZGO 3]** Badge "Trámite Digital **Punta a Punta**" contradice la matriz: firma electrónica (TEP-004) y verificación pública (TEP-006) están 🔴 NO EXISTE.
[RECOMENDACIÓN] "Prototipo de flujo digital (sin firma electrónica ni verificación pública habilitadas)".
[MÓDULO] `PlatformLanding.tsx` (~línea 95)

**[HALLAZGO 4]** Badge "Stack **100% Open Source**" es falso: `package.json` declara Firebase, Google GenAI, Google Maps, Stripe — proveedores propietarios. `firebase.ts` usa GoogleAuthProvider.
[RECOMENDACIÓN] "Núcleo en estándares abiertos (React/Express/SQLite); dependencias de nube en revisión".
[MÓDULO] `PlatformLanding.tsx` (~línea 94)

**[HALLAZGO 5]** Cita normativa imprecisa: "LNETB (Arts. 2 y 3) exige Portal Ciudadano Único, Llave MX, Expediente Digital, Repositorio Nacional". Llave MX y Portal provienen de la política ATDT/Lineamientos, no del texto de los Arts. 2 y 3.
[RECOMENDACIÓN] Reformular a fuente genérica verificable sin atribuir contenido específico a artículos sin texto oficial.
[MÓDULO] `PlatformLanding.tsx` (~línea 133)

**[HALLAZGO 6]** Tarjeta "Gobernanza y Transparencia" afirma en presente "acuse digital **firmado** y auditable". La firma electrónica está 🔴 NO EXISTE (sin PKI, sin HSM, sin firmante).
[RECOMENDACIÓN] Redactar en hoja de ruta: "diseñado para generar acuse con firma electrónica una vez designado firmante".
[MÓDULO] `PlatformLanding.tsx` (~línea 144)

**[HALLAZGO 7]** "Preparado para federación con LlaveMx, **asegurando** que los datos estén protegidos" — el verbo "asegurando" es garantía jurídica sin respaldo; LlaveMx está en desarrollo y RENAPO requiere convenio.
[RECOMENDACIÓN] "Diseñado para integrarse a LlaveMx cuando la ATDT lo habilite".
[MÓDULO] `PlatformLanding.tsx` (~línea 151)

**[HALLAZGO 8]** "Expediente único digital que **elimina** el requisito de entregar papeles duplicados" — el expediente está 🟡 Preparado, no implementado; "elimina" describe un resultado no materializado.
[RECOMENDACIÓN] "Expediente único como objetivo para eliminar duplicados".
[MÓDULO] `PlatformLanding.tsx` (~línea 182)

**[HALLAZGO 9]** "14 módulos de atención, tesorería y auditoría" — el arreglo real de `C5Dashboard.tsx` lista 13 entradas.
[RECOMENDACIÓN] Corregir la cifra a la real o eliminar el número concreto.
[MÓDULO] `C5Dashboard.tsx` / `PlatformLanding.tsx`

---

### E14 · UX / Diseño de Servicios (hallazgos priorizados por primera impresión)

**[HALLAZGO 1]** Única puerta de entrada a trámites es "Iniciar con Google". No hay login con CURP, correo/contraseña ni modo invitado. El ciudadano de 60 años sin cuenta Google choca con pared muerta en el primer clic. La landing promete "Portal Ciudadano Único, Llave MX" pero el código solo importa `GoogleAuthProvider`.
[RECOMENDACIÓN] Autenticación CURP + correo/teléfono y flujo "trámite como invitado" para la Constancia.
[MÓDULO] `LoginView.tsx` + `firebase.ts`

**[HALLAZGO 2]** El botón "Iniciar Trámite" no inicia ningún trámite: navega a la app y cae en login. El trámite real está enterrado en `home` como tarjeta "Cartas Municipales" mezclada con marketing ("Plan Maestro 2026", "Blueprint Estratégico").
[RECOMENDACIÓN] Deep-link directo al trámite (`?view=citizen&tab=municipal_letters` ya soportado) y reordenar home.
[MÓDULO] `PlatformLanding.tsx` (54, 103) + `CitizenApp.tsx` (HomeView)

**[HALLAZGO 3]** El hero (`min-h-[95vh]`) es 100% marketing. Ningún servicio concreto visible sin scroll. Los primeros 10 segundos son retórica, no utilidad.
[RECOMENDACIÓN] Incluir above-the-fold la acción #1: "Tramita tu Constancia — 3 pasos, ~10 min" con botón directo.
[MÓDULO] `PlatformLanding.tsx`

**[HALLAZGO 4]** Lenguaje burocrático/técnico en pantalla: "Soberanía Digital en Evolución", "Protocolo SSS-2026", "Gobernanza Dinámica", "Liquidar Pago Pendiente", "Gestión de Poder Digital". Un adulto mayor no lo traduce a acción.
[RECOMENDACIÓN] Lenguaje llano: "Tu Constancia", "Pagar predial", "Reportar un bache", "Estado de tu trámite".
[MÓDULO] `CitizenApp.tsx` (HomeView + ServiciosYReportesView)

**[HALLAZGO 5]** Tipografía ilegible: decenas de `text-[8px]`–`text-[11px]` (99 en CitizenApp, 16 en landing). WCAG 1.4.4 incumplido.
[RECOMENDACIÓN] Mínimo 14–16px para texto funcional; nunca <12px; eliminar `tracking-widest` en párrafos.
[MÓDULO] `CitizenApp.tsx` + `PlatformLanding.tsx`

**[HALLAZGO 6+]** "Todo flujo completable sin mouse" no se cumple; accesibilidad de teclado y foco sin auditar.
[RECOMENDACIÓN] Auditoría de navegación por teclado + focus management en modales.
[MÓDULO] `CitizenApp.tsx` (flujos de trámite)

---

### E15 · Ingeniería de Software (hallazgos con comando + salida)

**[HALLAZGO 1 — ALTA]** Navegación sin router: `useState<ViewType>` hardcodeado, sin `react-router`. El deep-link (`?view=`) se lee una sola vez y `setCurrentView` nunca escribe `history.pushState` → botón atrás roto, URL no refleja vista. `citizenTab`/`citizenAction` tipados `any`.
[RECOMENDACIÓN] Migrar a react-router o sincronizar con history.pushState.
[MÓDULO] `src/App.tsx`

**[HALLAZGO 2 — ALTA]** `ErrorBoundary` existe pero no envuelve ningún árbol. Única referencia es su propia declaración. Un error en `C5Dashboard`/`CitizenApp` (lazy) desmonta toda la app sin fallback.
[RECOMENDACIÓN] Envolver el árbol en `main.tsx`/`App.tsx` con `<ErrorBoundary>`.
[MÓDULO] `src/main.tsx` / `src/App.tsx` / `src/components/ErrorBoundary.tsx`

**[HALLAZGO 3 — MEDIA]** Clúster muerto de 7 archivos (~1,900 LOC): CitizenOS, DepartmentManager, ErrorBoundary, MandoCentral, ModularBrain, SovereignMap, TesisCienciaPolitica con 0 referencias (SovereignMap solo alcanzable desde MandoCentral, también huérfano).
[RECOMENDACIÓN] Integrar a navegación o eliminar; hoy son superficie de mantenimiento y riesgo de regresión.
[MÓDULO] `src/components/` (7 archivos)

**[HALLAZGO 4 — MEDIA]** Servicios muertos en cadena: `citizenService` (solo CitizenOS), `departmentService` (solo MandoCentral + DepartmentManager), `aiRiskService` (solo MandoCentral) — todos huérfanos.
[RECOMENDACIÓN] Eliminar o reintegrar junto con sus consumidores.
[MÓDULO] `src/services/`

---

## 📋 BACKLOG ESTRATÉGICO (Top 5, sin ideas nuevas)

1. **[E2+E14] Reescribir afirmaciones de la landing** — eliminar "oficial", "CURP verificada·RENAPO", "punta a punta", "100% open source", "acuse firmado", "asegurando". Pasar a lenguaje de hoja de ruta verificado. *(impacto alto, esfuerzo bajo)*
2. **[E14] Hero con acción concreta above-the-fold** — "Tramita tu Constancia — 3 pasos" con deep-link directo, fuera el marketing. *(impacto alto, esfuerzo medio)*
3. **[E14] Autenticación por CURP + modo invitado** — quitar la pared de "solo Google" para el ciudadano. *(impacto alto, esfuerzo alto)*
4. **[E15] Envolver la app en ErrorBoundary + migrar navegación a router/history** — eliminar botón atrás roto y crash sin fallback. *(impacto alto, esfuerzo medio)*
5. **[E15] Eliminar/reintegrar clúster huérfano (7 componentes + 3 services, ~1,900 LOC)** — reducir deuda y superficie de auditoría. *(impacto medio, esfuerzo medio)*

---

## 📄 DOCUMENTO RESGUARDADO

`docs/actas/Acta_005_Gabinete_Comision_Landing_Primera_Impresion.md`

---

*Acta de comisión del Gabinete de Especialistas — 13 agosto 2026*
*Voto humano decisivo para priorizar Backlog: Miguel Alexis Pérez Aguilar.*
