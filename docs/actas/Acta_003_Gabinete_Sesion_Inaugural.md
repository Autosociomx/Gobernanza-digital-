# Acta 003 — Gabinete de Especialistas · Sesión Inaugural
**Tema:** Revisión integral de lo construido en Nayarit Digital y Backlog Estratégico v1.
**Fecha:** 2026-07-07 · **Marco:** `docs/agentes/GABINETE_ESPECIALISTAS.md` · **Antecedentes:** Actas 001 (roadmap) y 002 (publicación de landing)

---

### 🎙️ INTERVENCIONES

**[E1 · Ciencias Políticas]** [HALLAZGO] Existe módulo de tesis política (`TesisCienciaPolitica.tsx`) y whitepaper, pero el ciudadano no puede verificar el estado de nada que solicita. [RECOMENDACIÓN] Convertir la trazabilidad de reportes en contrato ciudadano visible: cada trámite/reporte con folio público consultable sin iniciar sesión. [MÓDULO] `CitizenApp.tsx`, `citizenService.ts`.

**[E2 · Derecho]** [HALLAZGO] ConsentGate y páginas legales fueron restauradas (jul-2026) con corrección LGPDPPSO; el expediente de entrega de código (Art. 91 LNETB) no existe como proceso documentado. [RECOMENDACIÓN] Crear `docs/legal/EXPEDIENTE_ART91.md`: qué se entrega, en qué formato, con qué acta de recepción — listo para Oficialía de Partes. [MÓDULO] `docs/legal/`.

**[E3 · Datos y Ciberseguridad]** [HALLAZGO] La key de Gemini viajó en builds del cliente hasta el Acta 002; toda key expuesta alguna vez se presume comprometida. Las `firestore.rules` (8.6 KB) no tienen pruebas. [RECOMENDACIÓN] **Rotar la GEMINI_API_KEY hoy mismo** en Google AI Studio y agregar pruebas de reglas con el emulador de Firebase. [MÓDULO] `firestore.rules`, consola de Google.

**[E4 · Hacienda]** [HALLAZGO] Stripe está integrado en `server.ts` (`/api/create-payment-intent`) pero sin webhook de confirmación: un pago puede cobrarse sin registro municipal del lado del servidor. [RECOMENDACIÓN] Webhook `payment_intent.succeeded` que emita recibo con folio verificable antes de habilitar cobro real; conciliación diaria exportable. [MÓDULO] `server.ts`, catálogo de pagos.

**[E5 · Salud]** [HALLAZGO] `SaludNayaritID.tsx` existe como credencial digital. [RECOMENDACIÓN] Principio de minimización: la credencial identifica y agenda, pero NO almacena diagnósticos ni historial clínico hasta contar con base legal, cifrado y convenio con la Secretaría de Salud estatal. [MÓDULO] `SaludNayaritID.tsx`.

**[E6 · Agricultura]** [HALLAZGO] No existe módulo agrícola; 20 municipios incluyen zonas productoras (tabaco, mango, caña, pesca) con conectividad intermitente. [RECOMENDACIÓN] Candidato fase 2: padrón de productores + ventanilla de constancias municipales, offline-first. No se anuncia en la landing hasta existir. [MÓDULO] nuevo, fase 2.

**[E7 · Turismo]** [HALLAZGO] El catálogo de trámites no distingue al prestador turístico, sector de mayor derrama (Riviera Nayarit). [RECOMENDACIÓN] Etiquetar en el catálogo existente los 5–10 trámites de prestadores (licencias de funcionamiento, anuencias) como vertical visible: recaudación rápida sin construir módulos nuevos. [MÓDULO] `CitizenApp.tsx` (catálogo).

**[E8 · Urbanismo]** [HALLAZGO] `UrbanReportMapView.tsx` y mapas existen, pero el ciclo del reporte no muestra estados. [RECOMENDACIÓN] Implementar los 3 estados (Recibido → En atención → Resuelto) con marca de tiempo — ya era Prioridad del Acta 001 y sigue abierto. [MÓDULO] `UrbanReportMapView.tsx`, `infrastructureService.ts`.

**[E9 · Seguridad Pública]** [HALLAZGO] `C5Dashboard.tsx` y `MandoCentral.tsx` son accesibles desde la landing sin autenticación real por roles. [RECOMENDACIÓN] Antes de cargar datos operativos reales: roles (ciudadano/funcionario/administrador) sobre `LoginView.tsx` + registro de acceso en el log de auditoría. Mientras tanto, rotular el dashboard como DEMO. [MÓDULO] `LoginView.tsx`, `C5Dashboard.tsx`.

**[E10 · Inclusión Digital]** [HALLAZGO] Acta 002 restauró entry de 221 kB y accesibilidad 100; no hay modo instalable ni tolerancia a red intermitente. [RECOMENDACIÓN] Convertir CitizenApp en PWA (manifest + service worker) con consulta de folios en caché: el celular con datos limitados es el dispositivo mayoritario. [MÓDULO] `vite.config.ts`, `public/`.

**[E11 · Lenguas Originarias]** [HALLAZGO] La banda wixárika es reconocimiento estético; ningún flujo se completa en naayeri o wixárika (deuda registrada, Acta 002). [RECOMENDACIÓN] Capa i18n con los 5 trámites Prioridad 1 traducidos y validados por hablantes con pago justo; botón de idioma visible en el primer paso, no escondido. [MÓDULO] `CitizenApp.tsx`, nueva capa i18n.

**[E12 · Educación]** [HALLAZGO] `ConnectXAcademy.tsx` y el doble sello (ConnectX + Sindicato) existen como concepto de certificación. [RECOMENDACIÓN] Registro público de certificados con folio verificable (mismo patrón que E1/E4) y currícula publicada; sin registro consultable, el doble sello no resiste auditoría. [MÓDULO] `ConnectXAcademy.tsx`.

**[E13 · Geopolítica]** [HALLAZGO] Dependencia triple de un solo grupo proveedor (Firebase + Gemini + AI Studio) — y AI Studio ya demostró capacidad de pisar trabajo (jul-2026). [RECOMENDACIÓN] Documentar ruta de salida por dependencia (`docs/SOBERANIA_TECNOLOGICA.md`): exportación de datos Firebase, IA multi-proveedor vía el patrón del Gabinete, y despliegue en al menos dos hosts. La hoja de ruta LlaveMx (Art. 74) se gestiona como convenio, no solo como código. [MÓDULO] `docs/`.

**[E14 · UX]** [HALLAZGO] La landing comunica a decisores; el flujo ciudadano de primer trámite no está medido en pasos ni minutos. [RECOMENDACIÓN] Prueba de 5 usuarios (mayores de 50 incluidos) sobre el trámite de pago: si tarda más que la fila, se rediseña antes de anunciar. Cero analítica invasiva: métricas anónimas de pasos completados. [MÓDULO] `CitizenApp.tsx`.

**[E15 · Ingeniería]** [HALLAZGO] Build sin errores y Lighthouse restaurado (Acta 002), pero nada impide otra regresión: no hay CI. [RECOMENDACIÓN] GitHub Actions en cada PR: `tsc --noEmit` + build + presupuesto (entry ≤ 250 kB) + Lighthouse CI ≥ 95×3. La lección AI Studio se institucionaliza como pipeline, no como memoria. [MÓDULO] `.github/workflows/`.

---

### 📋 BACKLOG ESTRATÉGICO v1 (Top 5, impacto/esfuerzo)

| # | Acción | Origen | Esfuerzo |
|---|--------|--------|----------|
| 1 | **Rotar GEMINI_API_KEY** (expuesta en builds previos) | E3 | Minutos — HOY |
| 2 | **CI anti-regresión** (build + presupuesto + Lighthouse en cada PR) | E15, E10 | 1 día |
| 3 | **Ciclo cerrado de reportes + folios públicos verificables** (patrón común: reportes, pagos, certificados) | E1, E8, E4, E12 | 1–2 semanas |
| 4 | **Roles y autenticación real antes de datos operativos** (+ rotular DEMO mientras tanto) | E9, E3 | 1 semana |
| 5 | **i18n naayeri/wixárika en trámites Prioridad 1** (deuda Acta 002) | E11, E14 | 2–3 semanas, con comunidad |

Candidatos fase 2 registrados (no publicables aún): módulo agrícola (E6), vertical turística sobre catálogo existente (E7), PWA offline (E10), expediente Art. 91 y ruta de soberanía (E2, E13).

### 📄 DOCUMENTO RESGUARDADO
Este acta queda firmada conceptualmente por las 15 sillas del Gabinete y archivada como:
`Acta_003_Gabinete_Sesion_Inaugural.md`

**Pendiente de voto decisivo humano (Miguel Alexis):** ratificar el Backlog v1 y autorizar la comisión que ejecute el punto 2 (CI).
