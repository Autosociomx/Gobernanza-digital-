# Acta 005 — Auditoría y Saneamiento del Repositorio Público

**Parlamento de las Sillas · Nayarit Digital · ConnectX**
Fecha: 2026-08-01 · Sesión extraordinaria convocada a petición del director del proyecto.
Asunto: auditoría integral de las 37 pull requests y 36 ramas del repositorio público, con criterio de auditoría externa (diputación, prensa, academia).

> **Principio rector de esta sesión:** *"En gobernanza digital, todo lo comprobamos con hechos."* El historial del repositorio es un hecho público. No se oculta: se explica, se clasifica y se profesionaliza. Borrar la historia sería contradecir nuestra propia frase escudo; curarla y gobernarla es demostrarla.

---

## 1. Dictamen general

El repositorio muestra **7 eras** claramente distinguibles. Un auditor externo (un diputado o un periodista) no leerá 37 PRs una por una: leerá los títulos en 3 minutos y formará una impresión. Esta tabla es exactamente lo que vería, con la impresión que se llevaría y la defensa factual que tenemos.

| Era | PRs | Periodo | Qué ve el auditor | Impresión | Defensa con hechos |
|---|---|---|---|---|---|
| **I. Fundación técnica** | 1–2 | jun 12–13 | Utilidades y preview HTML | Neutra | — |
| **II. Era electoral-personal** | 3, 4, 6 | jun 14–19 | "config del candidato", "reunión Galván", "foto oficial de Geraldine Ponce" | ⚠ **Riesgo alto**: parece un proyecto de campaña | El proyecto nació explorando; la desintoxicación está documentada y fechada (Acta 004, PRs 23 y 37). La corrección es pública y verificable — eso es madurez, no ocultamiento |
| **III. Consolidación de plataforma** | 5, 7–14 | jun 19–jul 2 | C5/CitizenApp modulares, QR Mágico, Expediente Único, cumplimiento LNETB, piloto La Zitacua | 🟢 Buena: trabajo técnico serio | Es la espina dorsal del SOATM |
| **IV. Profesionalización** | 15–22 | jul 4–11 | Lighthouse 99→100, llaves fuera del bundle, Acta 002… y un "Presidential Ranking" (PR 15) | 🟡 Buena con un residuo electoral | PR 15 es anterior a la desintoxicación; el patrón posterior (23, 26, 37) muestra la corrección |
| **V. Desintoxicación y marco normativo** | 23–26 | jul 11–13 | "desintoxicación electoral (Acta 004)", guardia CI anti-regresiones, fix de estrategia interna filtrada | 🟢 Excelente: el proyecto se autoaudita y corrige | Es nuestra mejor evidencia: nadie nos señaló; nosotros mismos detectamos y corregimos |
| **VI. Plataforma viva** | 27–33 | jul 14–25 | Aura con voz, Perfil de Salud CURP, Portal de Citas, Pulso Nayarit, SINISI, SOATM documentado, 29 módulos | 🟢 Muy buena: módulos reales, no promesas | Portal de Citas opera sobre Firestore real |
| **VII. Era institucional** | 34–37 | jul 27–ago 1 | Obras con bitácora cívica, Parlamento de Sillas, recorrido ciudadano, **corrección institucional integral + Biblioteca Legal** | 🟢 La impresión que queremos dejar | Es el estado actual de `main` |

**Conclusión del dictamen:** el repositorio cuenta una historia defensible — un proyecto que exploró, se equivocó en lo electoral-personal, se autoauditó (Acta 004) y llegó a un estándar institucional verificable. La defensa no es negar las eras II y IV: es mostrar la corrección fechada. *"Todo lo comprobamos con hechos — incluidos nuestros errores y su corrección."*

## 2. Estado real de las PRs

- **Fusionadas recientes:** #36 (recorrido ciudadano) y **#37 (corrección institucional + Biblioteca Legal)** — ya en `main` (merge commits `cee067c` y `ab3faa1`).
- **Cerradas sin fusión:** la mayoría de las históricas (1–33). Su contenido útil ya fue absorbido por `main` en iteraciones posteriores o quedó desechado. GitHub conserva sus diffs bajo `refs/pull/*` — no se pierde nada al limpiar ramas.
- **Abiertas y viejas (requieren decisión):**
  - **PR #24** (jul 12): portales + Autopista Digital + Parlamento + ConnectX AI de voz. Base obsoleta (19 días); la mayoría ya está en `main` por otras vías. **Recomendación: cerrar con comentario de archivo.**
  - **PR #34** (jul 27): módulo Obras Nayarit, monitoreo cívico con bitácora de evidencia. Concepto valioso y alineado con la era institucional. **Recomendación: conservar la rama, reabrir evaluación contra `main` actual; si entra, entra rehecho sobre la base nueva.**
  - **PR #35** (jul 30): ampliación de sillas (Kimi + Jules) y Acta 004. Es documentación de gobernanza del propio proyecto. **Recomendación: revisar contra `main`; si es solo docs, fusionar — el Parlamento debe quedar constituido en el repo, no en una rama huérfana.**

## 3. Estado real de las ramas (36)

| Clasificación | Ramas | Acción |
|---|---|---|
| **Protegida** | `main` | Activar protección de rama (Settings → Branches): exigir PR + revisión; nadie empuja directo |
| **Trabajo vigente** | `fix/correccion-institucional-soatm` | Ya fusionada → archivar (borrable tras respaldar nota en esta Acta). El trabajo nuevo nace de ramas nuevas |
| **Con PR abierta** | `claude/nayarit-obras-portal-jk43ml` (#34), `feat/ampliacion-sillas-kimi-jules` (#35), `claude/bahia-digital-m3y72p` (#24) | Conservar hasta decidir cada PR (§2) |
| **Por identificar** | `contexto` | Revisar contenido antes de cualquier borrado |
| **Obsoletas de sesión (~28)** | `claude/app-skeleton-sti3i0`, `claude/autosocio-governance-update-8taacm`, `claude/citizen-experience-architecture-71owsj`, `claude/connectx-backend-architecture-w6khgu`, `claude/connectx-municipal-letters-gjg5ui`, `claude/digital-governance-data-review-g2gryy`, `claude/digital-governance-status-h97ieu`, `claude/google-ai-studio-update-r4y6hy`, `claude/google-id-studio-review-h6rt6y`, `claude/modulos-registro-espejo`, `claude/nayarit-digital-agents-vfugsg`, `claude/nayarit-digital-blocks-sv6sxm`, `claude/nayarit-digital-optimization-ozoqjs`, `claude/nayarit-digital-pitch-rjwebq`, `claude/nayarit-governor-candidates-egujsj`, `claude/nayarit-payments-catalog-2vlc55`, `claude/new-session-kmxbhc`, `claude/new-session-thuf83`, `claude/pulso-nayarit-dashboard-jq56i2`, `claude/restore-deleted-modules`, `claude/reunion-galvan-page-kmd6t2`, `claude/ruta-pro-sales-funnel-o4uzqi`, `claude/soberania-digital-infantil-sbyj67`, `claude/tepic-digital-platform-foydpn`, `claude/test-coverage-analysis-hvhn2p`, `claude/token-savings-skkqlo`, `feat/ui-soatm-landing-15931076076735347948`, `feature/national-infra-proposal-4542353386850613400`, `fix/ai-diagnosis-refactor-11833134063095069162` | **Candidatas a borrado** (sus PRs están cerradas y sus diffs sobreviven en `refs/pull/*`). Requiere voto del director — es destructivo |

## 4. Estándar de gobernanza del repositorio (a partir de esta Acta)

Para que el repo resista lectura de diputación, prensa y academia, queda adoptado:

1. **Convención de ramas:** `feat/…` (módulos), `fix/…` (correcciones), `docs/…` (marco y actas), `chore/…` (mantenimiento). Sin ramas con nombres de personas, sesiones ni asistentes de IA.
2. **Conventional Commits** (ya en uso desde la corrección institucional): `fix(ámbito): …`, `docs(marco): …`, `feat(módulo): …`.
3. **Plantilla de PR** con lista de honestidad: ¿cifras simuladas etiquetadas? ¿citas legales verificadas contra la Biblioteca Legal? ¿sin nombres de políticos en componentes públicos? ¿Guardia + tsc + build en verde?
4. **Protección de `main`:** toda fusión vía PR; nada de empujes directos.
5. **Las Actas del Parlamento viven en `docs/marco/`** — la gobernanza del proyecto es pública y forma parte del producto.
6. **Regla de la era VII:** todo trabajo nuevo nace del `main` institucional; ninguna rama revive contenido de las eras II–IV sin pasar por el filtro del Glosario Oficial.

## 5. Votos pendientes del director

- [ ] Voto 1: cerrar PR #24 con comentario de archivo.
- [ ] Voto 2: destino de PR #34 (Obras Nayarit) — rehacer sobre `main` o cerrar.
- [ ] Voto 3: destino de PR #35 (sillas/Acta 004) — fusionar docs o cerrar.
- [ ] Voto 4: autorización de borrado de las ~28 ramas obsoletas (§3) y de `fix/correccion-institucional-soatm` ya fusionada.
- [ ] Voto 5: activar protección de `main` (acción manual en Settings de GitHub).

---

*El historial es un hecho. La gobernanza del historial también. Firmado digitalmente por las sillas del Parlamento y el director del proyecto.*
