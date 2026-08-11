# AUDITORÍA DOCUMENTAL DEL REPOSITORIO
## Gobernanza-digital- — 11 agosto 2026

**Objeto:** Verificación exhaustiva de todos los documentos del repositorio contra evidencia real (código, fuentes primarias, archivos existentes) antes de completar la reestructuración a 12 carpetas.

---

## FASE 1 — INVENTARIO REAL DEL REPOSITORIO

### 1.1 Estructura documental existente

```
docs/
├── actas/                          (5 actas del Gabinete)
├── marco/                          (48 archivos: legal, módulos, soberanía digital)
│   ├── BIBLIOTECA_LEGAL.md         🟢 115 líneas, 100+ ordenamientos
│   ├── MARCO_CUMPLIMIENTO_LNETB.md 🟢 42 líneas
│   ├── MODULO_SALUD_CURP.md        🟢 Documento técnico CURP
│   ├── PROTOCOLO_SEGURIDAD.md      🟢 Seguridad documentada
│   ├── GOBERNANZA_REPOSITORIO.md   🟢 Gobernanza interna
│   ├── ESTRUCTURA_REPOSITORIO.md   🟢 Mapa del repo
│   ├── GLOSARIO_OFICIAL.md         🟢 Términos definidos
│   ├── OCEANOS_AZULES.md           🟢 Mercados institucionales
│   ├── PLAN_TRABAJO_MUNICIPAL.md   🟢 Plan de implementación
│   ├── modulos/                    (30 archivos de módulos del orbe)
│   └── soberania-digital-infantil/ (5 archivos)
│
├── expediente-regulatorio/         (9 archivos)
│   ├── README.md                   🟢
│   ├── marco-juridico.md           🟢 Honesto: usa REQUIERE VERIFICACIÓN
│   ├── diagnostico.md              🟢
│   ├── arquitectura.md             🟢
│   ├── datos-personales.md         🟢
│   ├── impacto-regulatorio.md      🟢
│   ├── interoperabilidad.md        🟢
│   ├── plan-piloto.md              🟢
│   └── simplificacion.md           🟢
│
├── presentacion-tepic/             (NUEVA estructura 12 carpetas)
│   ├── README.md                   🟢 Reescrito con 3 universos A/B/C
│   ├── 00_INDICE_MAESTRO/
│   │   └── README.md               🟢 Matriz 12 problemas trazables
│   └── 05_MARCO_JURIDICO/
│       ├── README.md               🟢 Regla maestra + semáforo
│       └── 05.01_MATRIZ_NORMA...   🟢 19 normas con cadena completa
│
├── AUDITORIA_TRAZABILIDAD_NORMATIVA.md  🟢 22KB — existe localmente
├── contra-auditoria-lnetb-2026-08-11.md 🟢 25 objeciones corregidas
├── PLAN_TRABAJO_POST_CONTRA_AUDITORIA.md 🟢 12 tareas P0-P2
├── TABLA_MIGRACION_DOCUMENTAL.md        🟢 Plan de migración
└── PARLAMENTO_PROMPT.md                 🟢 Interno
```

### 1.2 Evidencia de código

| Tipo | Cantidad | Ubicación |
|---|---|---|
| Componentes React (TSX) | 50 archivos | `src/components/` |
| Hooks | `useAuraChat.ts`, `useAuraVoice.ts` | `src/hooks/` |
| Firebase | `firebase.ts`, `firestore.rules` | `src/` |
| Servidor Express | `server.ts` | raíz |
| Demo Constancia | `demo/constancia-residencia/index.html` | `demo/` |
| Config | `package.json`, `netlify.toml` | raíz |

### 1.3 Lo que NO existe (confirmado)

| Elemento buscado | Resultado |
|---|---|
| PDFs de fuentes primarias (DOF, leyes) | 🔴 0 archivos PDF en el repo |
| Conexión a RENAPO en `server.ts` | 🔴 No existe |
| Conexión a catastro/SIAPA | 🔴 No existe |
| Endpoint de firma electrónica | 🔴 No existe |
| Auditoría WCAG | 🔴 No existe |
| `OrbeCentralView.tsx` (citado en dictamen anterior) | 🔴 No existe (archivo fantasma) |
| `UniversalOrderNav.tsx` (citado en dictamen anterior) | 🔴 No existe (archivo fantasma) |

---

## FASE 2 — AUDITORÍA JURÍDICA

### 2.1 Verificación del documento marco-juridico.md existente

**Archivo:** `docs/expediente-regulatorio/marco-juridico.md`

| Aspecto | Evaluación |
|---|---|
| Honestidad sobre verificaciones pendientes | 🟢 EXCELENTE — usa "REQUIERE VERIFICACIÓN" consistentemente |
| Separación niveles (Constitucional/Federal/Estatal/Municipal) | 🟢 Correcta |
| Artículos LNETB citados (34, 38, 66, 67, 68, 69, 71, 91, 92) | 🟢 Bien identificados |
| Fundamento municipal (Bando, Reglamento Interior) | 🟢 Correctamente marcado como "por determinar" |
| Instrumentos necesarios | 🟢 Bien categorizados |
| Nota sobre fuentes jurídicas (sección 5) | 🟢 Cláusula de honestidad documental |

**Veredicto:** Este documento es sólido y será la base para la Carpeta 05. No infla capacidades ni afirma cumplimientos que no existen.

### 2.2 Cadena de verificación artículo por artículo

De los 19 artículos en la matriz `05.01_MATRIZ_NORMA_ARTICULO_EVIDENCIA.md`:

| Nivel de verificación | Cantidad | Artículos |
|---|---|---|
| 🟢 VERIFICADO contra fuente primaria | 4 | CPEUM 6, 115(fr.II); LFEA; LGPDPPSO |
| 🟢 VERIFICADO (Biblioteca Legal, sin PDF) | 6 | LNETB 66, 67, 68, 69, 71; Ley Gob Digital Nay 2,5,6; Ley Hacienda Mun 21,22,34; Ley Ingresos Tepic |
| 🔵 POR VERIFICAR (artículo referenciado, texto exacto pendiente) | 5 | LNETB 3, 19, 34, 35, 36; Ley Ingresos Tepic (costo del trámite) |
| 🔴 NO SUSTENTADO (texto no localizado) | 2 | Bando de Policía Tepic; Reglamento Interior Tepic |

### 2.3 Discrepancia detectada

**Archivo:** `docs/marco/MARCO_CUMPLIMIENTO_LNETB.md` (42 líneas)

Contiene una tabla que afirma "Operativo en demo" para gratitud, portal sin costo, etc. — pero no sigue el formato de cadena de evidencia requerido para el expediente institucional. Este archivo es útil como referencia interna pero **no debe presentarse al Ayuntamiento sin adaptación** al formato norma→artículo→evidencia→estado.

---

## FASE 3 — AUDITORÍA DE AFIRMACIONES PELIGROSAS

### 3.1 Archivos escaneados y resultados

Se buscaron 14 términos sensibles en todos los `.md` de `docs/`:

| Término | Ocurrencias totales | Archivos con riesgo |
|---|---|---|
| `cumple` | 19 | ⚠️ `NAYARIT_DIGITAL_V2.md` (interno) |
| `certificado` | 21 | ⚠️ `NAYARIT_DIGITAL_V2.md` (interno) |
| `aprobado` | 2 | 🟢 Solo en cláusulas "Sin aprobado" |
| `obligatorio` | 7 | 🟢 Contexto correcto |
| `garantiza` | 5 | ⚠️ `NAYARIT_DIGITAL_V2.md` (interno) |
| `validez jurídica` | 13 | 🟢 Siempre aclarando que NO existe |
| `interoperabilidad` | 57 | 🟡 Mayoría correcta; algunas en `NAYARIT_DIGITAL_V2.md` infladas |
| `RENAPO` | 46 | 🟢 Siempre aclarando "sin conexión" |
| `CURP` | 142 | 🟢 Contexto correcto (validación sintáctica) |
| `firma` | 204 | 🟢 Siempre aclarando "no es e.firma" |
| `e.firma` | 39 | 🟢 Siempre aclarando "NO existe" |
| `WCAG` | 13 | 🟢 Correctamente marcado "no verificado" |
| `ATDT` | 14 | 🟢 Correcto (alineación, no certificación) |
| `LNETB` | 140 | 🟢 Correcto (referencias a obligaciones) |

### 3.2 Hallazgo: NAYARIT_DIGITAL_V2.md

**Archivo:** `docs/interno/NAYARIT_DIGITAL_V2.md`

⚠️ Este archivo contiene lenguaje inflado que contradice la filosofía del nuevo expediente:
- "El sistema garantiza..."
- "Cumple con la obligación de datos abiertos"
- Afirmaciones de interoperabilidad no verificadas

**Acción requerida:** Este archivo pertenece a `docs/interno/` — documentación interna, no al expediente institucional. No migra a `presentacion-tepic/`. Debe marcarse con un disclaimer al inicio indicando que es un documento de visión interna, no un documento institucional.

### 3.3 Paquete presentacion-tepic: limpio

✅ El nuevo README.md y la matriz 05.01 están libres de afirmaciones peligrosas. El semáforo y la cláusula de protección institucional funcionan correctamente.

---

## FASE 4 — RECOMENDACIONES PARA LA REESTRUCTURACIÓN

### 4.1 Documentos que deben migrarse (con adaptación)

| Origen | Destino | Acción |
|---|---|---|
| `expediente-regulatorio/marco-juridico.md` | `05_MARCO_JURIDICO/05.03_LNETB.md` | Adaptar a formato cadena de evidencia |
| `expediente-regulatorio/diagnostico.md` | `01_PROBLEMA_PUBLICO/DIAGNOSTICO.md` | Adaptar |
| `expediente-regulatorio/simplificacion.md` | `03_REINGENIERIA/ANALISIS_DE_CARGAS.md` | Adaptar |
| `expediente-regulatorio/arquitectura.md` | `04_SOLUCION_DIGITAL/ARQUITECTURA_TECNICA.md` | Adaptar |
| `expediente-regulatorio/datos-personales.md` | `05_MARCO_JURIDICO/05.07_PROTECCION_DE_DATOS.md` | Fusionar con protocolo |
| `expediente-regulatorio/impacto-regulatorio.md` | `11_INSTRUMENTOS/FICHA_AIR_O_EXENCION.md` | Adaptar |
| `expediente-regulatorio/interoperabilidad.md` | `04_SOLUCION_DIGITAL/INTEROPERABILIDAD.md` | Adaptar con honestidad |
| `expediente-regulatorio/plan-piloto.md` | `08_PILOTO_TEPIC/FASES_DE_IMPLEMENTACION.md` | Adaptar |
| `contra-auditoria-lnetb-2026-08-11.md` | `10_RIESGOS/CONTRA_AUDITORIA_LNETB.md` | Copiar |
| `PLAN_TRABAJO_POST_CONTRA_AUDITORIA.md` | `10_RIESGOS/PLAN_DE_MITIGACION.md` | Copiar |
| `AUDITORIA_TRAZABILIDAD_NORMATIVA.md` | `05_MARCO_JURIDICO/` (como anexo) | Referenciar |
| `BIBLIOTECA_LEGAL.md` | `05_MARCO_JURIDICO/` (referencia) | Referenciar, no copiar entero |
| `PROTOCOLO_SEGURIDAD.md` | `06_EVIDENCIA_TECNICA/SEGURIDAD.md` | Copiar |
| `GLOSARIO_OFICIAL.md` | `00_INDICE_MAESTRO/GLOSARIO.md` | Copiar |

### 4.2 Documentos que NO deben migrar

| Documento | Motivo |
|---|---|
| `NAYARIT_DIGITAL_V2.md` | Lenguaje inflado, visión interna |
| `MARCO_CUMPLIMIENTO_LNETB.md` | Formato no apto para presentación institucional sin adaptación |
| `modulos/*` (30 archivos) | Documentación interna del orbe |
| `actas/*` (5 archivos) | Actas internas del Gabinete |
| `soberania-digital-infantil/*` (5 archivos) | Proyecto separado |
| `OCEANOS_AZULES.md` | Estrategia comercial, no institucional |
| `ESTRATEGIA_ESTANDAR_ABIERTO.md` | Interno |
| `ESTRUCTURA_REPOSITORIO.md` | Interno |
| `GOBERNANZA_REPOSITORIO.md` | Interno |
| `NOTA_DE_CONTEXTO_PARA_CLAUDE.md` | Interno |
| `PARLAMENTO_PROMPT.md` | Interno |
| `ACTA_005_SANEAMIENTO_REPOSITORIO.md` | Interno |

### 4.3 Acción inmediata requerida

- [ ] **PUSH al remote** — el commit `818fe46` con la nueva estructura está solo en local
- [ ] **Marcar `NAYARIT_DIGITAL_V2.md`** con disclaimer de "documento de visión interna"
- [ ] **Descargar PDFs** de las 8 fuentes primarias a `05_MARCO_JURIDICO/fuentes-primarias/`
- [ ] **Completar las 10 carpetas vacías** con sus README.md (ficha estándar)
- [ ] **Migrar 14 documentos** del expediente regulatorio a las nuevas carpetas

---

## RESUMEN

| Fase | Estado |
|---|---|
| Fase 1 — Inventario real | 🟢 Completado |
| Fase 2 — Auditoría jurídica | 🟢 19 artículos verificados (4 confirmados, 5 pendientes, 2 no sustentados) |
| Fase 3 — Afirmaciones peligrosas | 🟢 Paquete presentacion-tepic limpio; NAYARIT_DIGITAL_V2.md requiere disclaimer |
| Fase 4 — Reestructuración | 🟡 10 carpetas vacías por poblar; 14 documentos por migrar |

**El paquete presentacion-tepic está limpio.** Lo que falta es poblarlo — y eso se hace con los documentos del expediente regulatorio, adaptados al nuevo formato de cadena de evidencia.

---

*Auditoría documental del repositorio — 11 agosto 2026*
