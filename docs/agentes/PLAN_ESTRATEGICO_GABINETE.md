# 📋 Plan Estratégico del Gabinete — 15 planes a 30/60/90 días

> Cada especialista del Gabinete tiene un plan propio para mejorar Nayarit Digital,
> anclado a módulos reales del repositorio y alineado al Backlog Estratégico v1 (Acta 003).
> **Regla de lectura:** lo marcado *(fase 2)* no existe aún y no se anuncia públicamente hasta existir.
> Ratificación humana: Miguel Alexis (Regla 4).

---

## E1 · Ciencias Políticas y Gobernanza
- **Objetivo:** que cada interacción ciudadana sea verificable → legitimidad medible.
- **0–30 días:** definir el estándar de folio público (formato, consulta sin login) junto con E4 y E8.
- **31–60 días:** publicar la página "Consulta tu folio" en CitizenApp; convertir el whitepaper en carta compromiso ciudadana con plazos por trámite.
- **61–90 días:** primer informe público de cumplimiento (reportes recibidos vs. resueltos, con datos reales, aunque sean pocos).
- **Métrica:** % de trámites con folio consultable = 100% de los trámites Prioridad 1.

## E2 · Derecho Administrativo y Municipal
- **Objetivo:** blindaje jurídico total de lo publicado y del expediente de entrega.
- **0–30 días:** crear `docs/legal/EXPEDIENTE_ART91.md` (qué se entrega, formato, acta de recepción); revisión trimestral de afirmaciones de la landing contra el código (heredera de la Auditoría 2026-07-07).
- **31–60 días:** aviso de privacidad específico por trámite (no genérico) en CitizenApp; matriz LNETB artículo × estado (cumplido / en proceso / hoja de ruta).
- **61–90 días:** dictamen de viabilidad del convenio LlaveMx con E13.
- **Métrica:** cero afirmaciones públicas sin respaldo verificable.

## E3 · Protección de Datos y Ciberseguridad
- **Objetivo:** presunción de brecha como método permanente.
- **0–30 días:** ✅ rotación de GEMINI_API_KEY (hecha); pruebas de `firestore.rules` con el emulador de Firebase; inventario de datos personales (qué se guarda, dónde, quién lee).
- **31–60 días:** roles y autenticación real sobre `LoginView.tsx` (con E9); política de retención y borrado.
- **61–90 días:** simulacro de incidente documentado (qué se hace si se filtra un dato, quién avisa a quién).
- **Métrica:** 100% de reglas de Firestore con prueba; cero keys en el cliente (verificado por CI de E15).

## E4 · Hacienda Pública y Finanzas Municipales
- **Objetivo:** que ningún peso digital entre sin folio ni conciliación.
- **0–30 días:** webhook `payment_intent.succeeded` de Stripe en `server.ts` que genere recibo con folio verificable ANTES de habilitar cobro real.
- **31–60 días:** reporte de conciliación diaria exportable (CSV) por concepto del catálogo; mapa concepto→partida de ingreso.
- **61–90 días:** piloto de cobro real con UN concepto de bajo riesgo (ej. constancia simple) de punta a punta.
- **Métrica:** 100% de pagos con folio; diferencia de conciliación = $0.

## E5 · Salud Pública
- **Objetivo:** SaludNayaritID útil sin convertirse en riesgo de datos clínicos.
- **0–30 días:** auditoría de qué campos guarda hoy `SaludNayaritID.tsx`; recortar a identificación + agenda (minimización).
- **31–60 días:** flujo de citas/campañas (vacunación, jornadas) sin historial clínico; lenguaje llano validado con E14.
- **61–90 días:** propuesta de convenio con la Secretaría de Salud estatal como requisito previo a cualquier dato clínico *(fase 2)*.
- **Métrica:** cero datos clínicos almacenados sin base legal y cifrado.

## E6 · Agricultura y Desarrollo Rural
- **Objetivo:** diseñar el módulo rural SIN anunciarlo hasta que exista.
- **0–30 días:** mapa de los 5 trámites municipales más pedidos por productores (constancias de productor, permisos de quema controlada, certificaciones locales).
- **31–60 días:** prototipo en papel + prueba con 5 productores reales de un municipio piloto; requisito offline-first documentado con E10.
- **61–90 días:** especificación completa del módulo padrón/ventanilla lista para desarrollo *(fase 2)*.
- **Métrica:** especificación validada por productores, no por escritorio.

## E7 · Turismo y Economía Costera
- **Objetivo:** vertical turística sobre el catálogo existente, sin construir módulos nuevos.
- **0–30 días:** etiquetar en el catálogo de CitizenApp los trámites de prestadores (licencias de funcionamiento, anuencias, permisos de eventos).
- **31–60 días:** landing interna "Ventanilla del Prestador Turístico" que filtre esos trámites; costos y plazos visibles.
- **61–90 días:** piloto con la asociación de hoteleros/restauranteros de un municipio costero; medir recaudación digital del segmento.
- **Métrica:** 5–10 trámites turísticos identificables y completables en línea.

## E8 · Urbanismo e Infraestructura
- **Objetivo:** cerrar el ciclo del reporte ciudadano (pendiente desde Acta 001).
- **0–30 días:** los 3 estados (Recibido → En atención → Resuelto) con marca de tiempo en `infrastructureService.ts` y visibles en `UrbanReportMapView.tsx`.
- **31–60 días:** folio público por reporte (estándar de E1); notificación al ciudadano en cada cambio de estado.
- **61–90 días:** mapa público de reportes resueltos (sin datos personales) como pieza de transparencia.
- **Métrica:** tiempo mediano Recibido→Resuelto publicado mensualmente.

## E9 · Seguridad Pública y Protección Civil
- **Objetivo:** ni un dato operativo real en el C5 sin control de acceso.
- **0–30 días:** rotular C5Dashboard y MandoCentral como DEMO en la interfaz; diseño de roles (ciudadano/funcionario/admin) con E3.
- **31–60 días:** implementación de roles sobre `LoginView.tsx` + registro de acceso en el log de auditoría inmutable.
- **61–90 días:** protocolo de protección civil (quién ve qué durante una emergencia) documentado y probado en simulacro.
- **Métrica:** 100% de accesos al C5 autenticados y registrados antes de cargar datos reales.

## E10 · Inclusión Digital y Accesibilidad
- **Objetivo:** que el presupuesto de rendimiento sea ley, no memoria.
- **0–30 días:** presupuesto en CI con E15 (entry ≤ 250 kB, Lighthouse ≥ 95×3); prueba con celular gama baja y datos limitados.
- **31–60 días:** manifest + service worker → CitizenApp instalable como PWA con consulta de folios en caché.
- **61–90 días:** prueba de accesibilidad con usuarios reales (lector de pantalla, navegación por teclado, adultos mayores) junto con E14.
- **Métrica:** Lighthouse ≥ 95×3 en cada PR (bloqueante); primer trámite completable en un teléfono de $2,000.

## E11 · Lenguas y Culturas Originarias
- **Objetivo:** pagar la deuda del Acta 002 — bilingüismo funcional, no decorativo.
- **0–30 días:** capa i18n técnica (es como base); contacto con hablantes de naayeri y wixárika con presupuesto de pago justo por traducción.
- **31–60 días:** los 5 trámites Prioridad 1 traducidos y validados en comunidad; botón de idioma en el PRIMER paso del flujo.
- **61–90 días:** glosario público es/naayeri/wixárika de términos de gobierno como bien cultural abierto.
- **Métrica:** trámites Prioridad 1 completables de punta a punta en las 3 lenguas.

## E12 · Educación y Capacitación
- **Objetivo:** que el doble sello (ConnectX + Sindicato) resista auditoría.
- **0–30 días:** currícula pública de la Academia en `ConnectXAcademy.tsx` (módulos, horas, evaluación).
- **31–60 días:** registro de certificados con folio verificable (mismo patrón de E1/E4/E8 — un solo sistema de folios para todo).
- **61–90 días:** primera generación certificada con lista pública de folios; convenio sindical documentado.
- **Métrica:** 100% de certificados consultables por folio; cero certificados sin currícula pública.

## E13 · Geopolítica y Relaciones Intergubernamentales
- **Objetivo:** soberanía = rutas de salida documentadas, no discursos.
- **0–30 días:** `docs/SOBERANIA_TECNOLOGICA.md`: dependencias actuales (Firebase, Gemini, hosting) con su ruta de salida cada una; lección AI Studio como caso de estudio.
- **31–60 días:** gestión del convenio LlaveMx (Art. 74) como trámite intergubernamental con E2 — con oficio, no solo con código.
- **61–90 días:** estrategia de presentación a los 20 municipios (orden, argumento por municipio, convenio marco tipo).
- **Métrica:** cada dependencia crítica con plan B escrito y probado (exportación de datos verificada).

## E14 · Experiencia de Usuario y Diseño de Servicios
- **Objetivo:** primer trámite en menos tiempo que la fila.
- **0–30 días:** prueba de usabilidad con 5 personas (incluyendo mayores de 50) sobre el trámite de pago; medir pasos y minutos.
- **31–60 días:** rediseño de los cuellos detectados; lenguaje llano en todas las pantallas de CitizenApp (fuera burocratés).
- **61–90 días:** métricas anónimas de embudo (paso alcanzado, sin datos personales) para medir abandono real.
- **Métrica:** trámite Prioridad 1 completable en ≤ 5 minutos por un usuario primerizo.

## E15 · Ingeniería de Software y Datos
- **Objetivo:** institucionalizar la lección AI Studio — nada se pierde dos veces.
- **0–30 días:** GitHub Actions en cada PR: `tsc --noEmit` + build + presupuesto entry ≤ 250 kB + Lighthouse CI ≥ 95×3 (Backlog #2, siguiente en ejecución).
- **31–60 días:** entorno de staging separado de producción; script de verificación del expediente Art. 91 (el repo compila desde cero en máquina limpia).
- **61–90 días:** tablero de salud técnica (build, deps desactualizadas, tamaño de bundle) visible en DeveloperChecklist.
- **Métrica:** cero regresiones que lleguen a `main`; toda migración externa pasa por PR revisado.

---

## 🔗 Convergencias (donde varios planes se tocan)

| Pieza común | Especialistas | Qué es |
|---|---|---|
| **Sistema único de folios verificables** | E1, E4, E8, E12 | Un solo mecanismo para reportes, recibos y certificados — se construye una vez, sirve cuatro veces |
| **Roles y autenticación** | E3, E9 | Prerrequisito para datos reales en C5 y pagos |
| **CI anti-regresión** | E15, E10 | El candado que protege el trabajo de todos los demás |
| **Pruebas con usuarios reales** | E14, E10, E11, E6 | Ciudadanos, no escritorios, validan cada flujo |
| **Marco de convenios** | E2, E13 | LlaveMx y Secretaría de Salud se ganan con oficios, no solo con código |

**Orden de ejecución sugerido (deriva del Backlog v1):** CI (E15) → folios (E1/E4/E8/E12) → roles (E3/E9) → i18n (E11) → verticales (E7, E6 fase 2).
