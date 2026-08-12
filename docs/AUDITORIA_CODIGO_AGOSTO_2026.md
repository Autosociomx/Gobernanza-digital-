# AUDITORÍA DE CÓDIGO — Gobernanza-digital-

**Fecha:** 12 agosto 2026
**Método:** Inspección directa del repositorio: 50 archivos TS/TSX, 11,579 líneas totales

---

## 1. ARQUITECTURA REAL

### Navegación: useState hardcodeado

El `App.tsx` (99 líneas) define 5 vistas fijas con `useState<ViewType>`:

```
landing → PlatformLanding (352 líneas)
c5 → C5Dashboard (1,629 líneas)
citizen → CitizenApp (2,126 líneas) ← la más pesada
dev → DeveloperChecklist (199 líneas)
executive → ExecutiveFolder (291 líneas)
```

**Hallazgo:** No hay router (react-router). La navegación es con `setCurrentView()`. Soporta deep linking vía `?view=c5&modulo=agrovision`. Correcto para un MVP/demo.

### Componentes huérfanos

| Componente | Líneas | Referencias externas | Estado |
|---|---|---|---|
| `CitizenOS.tsx` | 173 | 0 | 🟠 Huérfano — nunca usado |
| `DepartmentManager.tsx` | 146 | 0 | 🟠 Huérfano — tiene CRUD real (Firebase) |
| `ErrorBoundary.tsx` | ? | 0 | 🟠 Huérfano — no envuelve ningún componente |
| `MandoCentral.tsx` | 333 | 0 | 🟠 Huérfano — dashboard de riesgos con IA |
| `ModularBrain.tsx` | 238 | 0 | 🟠 Huérfano — orquestador de módulos |
| `SovereignMap.tsx` | 410 | 1 | 🟡 Solo referenciado con `lazy()` — nunca cargado |
| `TesisCienciaPolitica.tsx` | 520 | 0 | 🟠 Huérfano — el más grande de los no usados |

**Total: 7 componentes muertos (~1,800+ líneas) que compilan pero nunca se renderizan.**

### Componentes con referencias reales

| Componente | Líneas | Quién lo usa |
|---|---|---|
| `AuraCertificationSeal` | — | 5 referencias (componente decorativo) |
| `NayaritMap` | — | 2 referencias (CitizenApp) |
| `SaludNayaritID` | 966 | CitizenApp |
| `MunicipalLettersView` | 759 | CitizenApp |
| `ParlamentoView` | — | CitizenApp |
| `NotificationView` | — | CitizenApp |
| `ConnectXAcademy` | 161 | ExecutiveFolder |
| `SystemAuditView` | 291 | ExecutiveFolder |
| `StrategicAcademyView` | 223 | ExecutiveFolder |

---

## 2. DEPENDENCIAS Y STACK REAL

| Capa | Tecnología | Estado |
|---|---|---|
| Frontend | React 19, TypeScript 5.8, Vite 6, Tailwind 4 | 🟢 Moderno |
| Animaciones | motion (Framer Motion) 12 | 🟢 |
| Mapas | @vis.gl/react-google-maps, Leaflet (implícito) | 🟢 |
| Gráficas | Recharts 3 | 🟢 |
| QR/Códigos | qrcode.react, html5-qrcode, jsbarcode | 🟢 |
| PDF | jspdf 4 | 🟢 |
| IA | @google/genai (Gemini) | 🟢 |
| OCR | tesseract.js 7 | 🟢 |
| Pagos | Stripe 22 (server.ts) | 🟡 Solo sandbox |
| BD | better-sqlite3 (server), Firebase 12 (cliente) | 🟢 |
| Markdown | react-markdown 10 | 🟢 |
| Carrusel | swiper 12 | 🟢 |

**35 dependencias de producción, 4 dev. Stack moderno y bien elegido.**

---

## 3. DEUDA TÉCNICA ENCONTRADA

### Severidad ALTA

| # | Hallazgo | Ubicación |
|---|---|---|
| A1 | 7 componentes huérfanos (~1,800 líneas) | `CitizenOS`, `DepartmentManager`, `ErrorBoundary`, `MandoCentral`, `ModularBrain`, `SovereignMap`, `TesisCienciaPolitica` |
| A2 | `SovereignMap` importado con `lazy()` pero nunca navegado | `App.tsx` línea de import no existe |
| A3 | `AuraCertificationSeal` usado 5 veces pero es puramente decorativo (ya documentado en contra-auditoría) | `src/components/AuraCertificationSeal.tsx` |
| A4 | `useAuraVoice.ts` documenta que cora y wixárika no funcionan pero el componente sigue ofreciendo esas opciones en UI | `src/hooks/useAuraVoice.ts` |

### Severidad MEDIA

| # | Hallazgo | Ubicación |
|---|---|---|
| M1 | 39 ocurrencias de "mock" — datos simulados en dashboards | `C5Dashboard.tsx`, `MandoCentral.tsx` |
| M2 | 7 ocurrencias de "simulado" — pagos, notificaciones, IA | `CitizenApp.tsx` |
| M3 | 13 TODOs sin resolver | Distribuidos |
| M4 | Navegación con `useState` — no escala más allá de 5-7 vistas | `App.tsx` |
| M5 | `PlatformLanding.tsx` (352 líneas) — mezcla lógica de 3 KPIs duros con diseño visual. Debe separarse en datos vs presentación |

### Severidad BAJA

| # | Hallazgo |
|---|---|
| B1 | Sin tests (0 archivos `*.test.ts` o `*.spec.ts`) |
| B2 | Sin CI/CD pipeline documentado (solo `netlify.toml` para deploy) |
| B3 | Sin linting configurado (no `.eslintrc`, no `prettier.config`) |
| B4 | `FirebaseProvider.tsx` envuelve la app pero el `ErrorBoundary` huérfano no lo usa |

---

## 4. KPIs EN LA LANDING — AUDITORÍA DE VERACIDAD

| KPI mostrado en PlatformLanding | Realidad en el código | Veredicto |
|---|---|---|
| "18 Módulos de Servicios" | `ModularBrain.tsx` (huérfano) lista módulos. Los 30 archivos en `docs/marco/modulos/` son documentación, no código funcional | 🟡 Inflado — los módulos son conceptuales, no operativos |
| "100+ Pagos Municipales" | Stripe solo en sandbox. `server.ts` (241 líneas) tiene endpoint `/api/create-payment-intent`. 0 pagos reales procesados | 🟡 Inflado — 0 pagos reales |
| "Soberanía Tecnológica" | Stack open source real (React, Express, SQLite). Sin embargo el concepto es difuso sin métrica | 🟡 Marketing |
| "Simplificación Regulatoria" | El expediente documental es sólido. La landing no cita evidencia | 🟡 Bien intencionado, sin sustento visible |
| "Identidad LlaveMx" | El prototipo valida CURP sintácticamente. LlaveMX es el sistema federal de la ATDT — el sistema no está conectado | 🔴 Inflado — sugiere integración que no existe |
| "Piloto: Tepic" | Verdadero — el piloto está documentado | 🟢 Correcto |

---

## 5. RECOMENDACIONES

### Inmediatas (antes de presentar a Tepic)

1. **Eliminar o esconder los KPIs inflados** de la landing: "100+ Pagos", "18 Módulos", "Identidad LlaveMx"
2. **Quitar "LlaveMx"** de los badges — sustituir por "CURP verificada" que sí es cierto
3. **Integrar los 7 componentes huérfanos** en la navegación o eliminarlos del bundle
4. **Envolver la app en ErrorBoundary** — actualmente no se usa

### Mediano plazo

5. Migrar `useState` a React Router para escalar
6. Separar datos mock de componentes de presentación
7. Agregar tests unitarios (Vitest ya está instalado)
8. Configurar ESLint + Prettier

### Estratégicas

9. **Ciudadano real ve 5 vistas hardcodeadas.** La landing habla de 18 módulos pero solo 4 son navegables. Alinear discurso con realidad.
10. **La primera impresión es la landing.** Los KPIs actuales son peligrosos para una auditoría municipal. Simplificar a lo demostrable.

---

## 6. ESTADO CONSOLIDADO

| Área | Nota |
|---|---|
| Código frontend | 🟢 Bien escrito, TypeScript estricto, lazy loading, accesibilidad básica |
| Código backend | 🟡 Funcional pero mínimo (241 líneas, sin endpoints del trámite) |
| Arquitectura de navegación | 🟡 Funciona para MVP, no escala |
| Componentes huérfanos | 🔴 7 componentes sin usar (~15% del código) |
| KPIs en landing | 🔴 4 de 6 inflados o sin evidencia |
| Deuda técnica | 🟡 13 TODOs, 39 mocks, 0 tests |
| Stack tecnológico | 🟢 Moderno, bien elegido |

---

*Auditoría de código — 12 agosto 2026*
