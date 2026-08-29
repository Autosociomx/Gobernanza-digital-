# Validación ATDT / LNETB — 2026-08-25

**Rol asumido para este ejercicio:** revisor alineado con la Agencia de Transformación Digital y Telecomunicaciones (ATDT, coordinadora nacional del Modelo Nacional de Simplificación y Digitalización) y con la lógica de vigilancia de cumplimiento de la LNETB. **Esto es una validación técnica, no una certificación** — igual que ya advierte `docs/presentacion-tepic/09_ALINEACION_ATDT/MATRIZ_DE_ALINEACION.md`, la certificación solo puede emitirla la autoridad competente.

**Método:** cruzar la matriz de alineación ATDT y la Biblioteca Legal (ambas ya existentes en el repositorio, con su propia disciplina VERIFICADO/POR VERIFICAR/PROPUESTA) contra la evidencia de código levantada en las dos rondas de auditoría de coherencia del 2026-08-25 (ver historial de commits de la rama `claude/audit-work-coherence-optimization-xt47am`, PR #54, y `docs/marco/PENDIENTES_AUDITORIA_2026-08.md`). No se releyó legislación nueva — se usa la ya citada en `docs/marco/BIBLIOTECA_LEGAL.md` y `docs/presentacion-tepic/05_MARCO_JURIDICO/`.

## Veredicto general

**La matriz de alineación ya existente es honesta y sigue siendo, en lo esencial, correcta.** No se encontró ninguna fila que sobrevendiera una capacidad frente al código real — al contrario, la auditoría de código confirmó de forma independiente los mismos huecos que la matriz ya declaraba (interoperabilidad cero, firma electrónica inexistente, catálogo nacional sin verificar). Esto es un dato relevante en sí mismo: la disciplina de honestidad del proyecto (semáforo 🟢🟡🔴🔵) resiste una auditoría externa, no es solo una promesa.

Dos filas de la matriz **deberían actualizarse hacia arriba** por trabajo hecho en esta auditoría (no estaban mal, están desactualizadas); ninguna fila necesita corregirse hacia abajo.

## Filas a actualizar (mejora real, con evidencia)

| Fila de la matriz | Estado citado (previo) | Estado real hoy | Evidencia |
|---|---|---|---|
| Expediente Ciudadano Único (Art. 68 LNETB) | 🟡 "Diseñado, Firestore configurado; sin implementación" | 🟡 Preparado, con escritura real — el expediente empieza a existir de verdad, aunque sin validez oficial | `CitizenApp.tsx` (`TesoreriaYTramitesView`, `solicitarTramite`) escribe solicitudes reales en Firestore (`tramites`), con lectura, listado y cancelación real por ciudadano — ya no es solo diseño |
| Ventanilla Única Digital (Art. 69 LNETB) | 🟡 "Portal React con 5 vistas; 1 trámite modelado" | 🟡 4 trámites con flujo de solicitud real de punta a punta (UI → Firestore → listado) | Los 4 botones de Ventanilla Única (licencia, permiso, uso de suelo, actas) antes no tenían `onClick`; ahora ejecutan el flujo completo — ver commit `58bea0b` |

Ninguna de las dos pasa a 🟢: sigue sin ser un trámite con validez jurídica (no hay firma electrónica avanzada ni conexión institucional que reciba la solicitud) — el ascenso es de "diseño/maqueta" a "función real sobre expediente propio", no de "función real" a "trámite oficial".

## Filas confirmadas sin cambio (la matriz ya lo decía bien)

| Fila | Estado citado | Confirmado por auditoría de código |
|---|---|---|
| Interoperabilidad (Art. 71 LNETB) | 🔴 Cero conexiones reales | Confirmado — `InteroperabilidadView` es telemetría 100% inventada; `src/services/` no tiene ninguna llamada a un dominio `.gob.mx`; `MunicipalLettersView.tsx` declara explícitamente "Sin conexión" a RENAPO/SAT/PNT |
| Firma Electrónica (Art. 67 LNETB) | 🔴 No existe | Confirmado — el hash de Cartas Municipales ahora es SHA-256 real (íntegro), pero un hash no es una firma con llave de autoridad ni tiene efecto de no-repudio; el propio código ya lo dice en la UI tras esta auditoría |
| Identidad Digital / CURP (Art. 66 LNETB) | 🟡 Validación sintáctica, RENAPO pendiente | Confirmado — el OCR de `ProfileView` extrae CURP con una expresión regular (validación de forma, no de existencia); cero llamadas a RENAPO en todo el repositorio |
| Neutralidad tecnológica | 🟢 Cumplido — "sin lock-in de proveedor" | **Matizar, no corregir**: cierto para el control plane (`contextos/`+`shared/semantic/`, confirmado sin dependencias de Gemini/OpenAI/Anthropic por grep), pero la capa de experiencia (Aura/ORBE) sí depende estructuralmente de `@google/genai` y de Firebase (Auth/Firestore/Storage) — no hay adaptador que permita cambiar de proveedor de IA o de base de datos sin reescribir código. Recomendación: bajar esta fila a 🟡 o precisar que la neutralidad aplica solo al control plane, no a toda la plataforma |
| Accesibilidad universal | 🔴 No verificado (WCAG) | Matizado por evidencia nueva: el deploy preview de Netlify del PR #54 reportó Lighthouse Accessibility 100 — pero es una auditoría de una sola página, generada por Netlify, no un proceso reproducible en el repositorio ni en CI. No sube a 🟢; se mantiene 🔴 con la nota de que ya existe una señal externa positiva, no solo ausencia de evidencia (decisión del propietario del repositorio: degradar la fila 7 de `MARCO_CUMPLIMIENTO_LNETB.md` a "Hoja de ruta" hasta que sea un proceso propio y repetible) |

## Sobre la Biblioteca Legal

`docs/marco/BIBLIOTECA_LEGAL.md` mantiene con disciplina la separación VERIFICADO / POR VERIFICAR / PENDIENTE PDF — no se encontró ninguna cita que la auditoría de código pudiera desmentir, porque la Biblioteca Legal describe el **fundamento jurídico de cada módulo**, no el estado de implementación (ese es el trabajo de `docs/marco/modulos/INDICE.json` y `MARCO_CUMPLIMIENTO_LNETB.md`). Los dos documentos son complementarios y no se contradicen — vale la pena dejarlo dicho explícitamente porque un lector externo podría confundir "la ley ya lo ordena" (Biblioteca Legal) con "el sistema ya lo hace" (Índice de módulos): son afirmaciones distintas y el repositorio ya las separa bien, esta validación solo lo confirma.

## Lo que la ATDT pediría a Tepic (checklist de la matriz) — sin cambios

La sección "Lo que la ATDT requiere de los municipios" de `MATRIZ_DE_ALINEACION.md` (inventario en Catálogo Nacional, designación de enlace ATDT, AIR por trámite, reporte trimestral) son acciones institucionales del Ayuntamiento, no del código — quedan igual que estaban, correctamente fuera del alcance de esta auditoría técnica.

## Conclusión

Esta validación no encontró afirmaciones falsas en la matriz de alineación ATDT ni en la Biblioteca Legal — el hallazgo es, en todo caso, que el código se movió un poco más cerca de lo que la matriz ya aspiraba a describir. Se recomienda: (1) aplicar las dos actualizaciones de la tabla de arriba directamente en `MATRIZ_DE_ALINEACION.md` cuando el equipo lo revise, y (2) mantener la práctica de re-auditar esta matriz cada vez que se toque código de trámites, identidad o interoperabilidad, para que no vuelva a quedarse atrás del código (el mismo problema que ya se encontró y corrigió en `docs/auditoria-orbe/ESTADO_MADUREZ_TECNOLOGICA.md` respecto a Context.OS).
