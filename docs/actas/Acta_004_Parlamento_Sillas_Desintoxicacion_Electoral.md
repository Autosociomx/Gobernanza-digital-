# Acta 004 — Parlamento de las Sillas
**Tema:** Desintoxicación electoral del sitio público y renombrado ciudadano de módulos y llamadas a la acción.
**Fecha:** 2026-07-11 · **Sesiones previas:** 01 (roadmap, `Parlamento.MD`), 002 (publicación de landing), 003 (gabinete inaugural)
**Mandato humano (Regla 4):** "Eliminar el lenguaje de campaña — nombre, 2027, narrativa electoral. El sitio queda orientado hacia el ciudadano. Auditoría completa de todo lo que se ofrece. Nombres y llamadas a la acción más intuitivos, que la ciudadanía comprenda y sienta confianza."

---

## 📋 AUDITORÍA VERIFICADA (Regla 6 — solo hechos constatados en el código, 2026-07-11)

### A. Lenguaje de campaña expuesto al público
| # | Archivo | Hallazgo verificado |
|---|---------|---------------------|
| A1 | `PlatformLanding.tsx:158` | "Resultados visibles en 30 días, **listos para campaña 2027**" en la página pública |
| A2 | `PlatformLanding.tsx:94` | "Documento Confidencial" persiste en el pie del hero — ya ordenado retirar en el Acta 002 |
| A3 | `PlatformLanding.tsx:145-156` | Sección completa enmarcada como "Riesgo Legal / **Oportunidad Política**" con "**daño político** colateral" |
| A4 | `PlatformLanding.tsx` (hero + capas) | "Executive Folder — **Inteligencia confidencial y expedientes de negociación**" ofrecido en la página pública |
| A5 | `PlatformLanding.tsx:77-82` | Chips afirman "20/20 Municipios", "14 Leyes Cumplidas", "LlaveMx Art. 74" como hechos — violan la política de verdad verificable del Acta 002 (LlaveMx NO está integrada) |
| A6 | `PlatformLanding.tsx:124` | "ConnectX es el único sistema municipal **integrado con LlaveMx desde el día 1**" — afirmación falsa según auditoría 2026-07-07 |
| A7 | `PlatformLanding.tsx:273` | "Tepic: del #840 al #38 en 90 días" presentado como hecho; es proyección |
| A8 | `C5Dashboard.tsx:563-582,659,1274` | Asistente y gabinete personalizados a nombre propio ("Presidenta Geraldine Ponce", "G. Ponce", atajo "Visión Tepic 2027") |
| A9 | `C5Dashboard.tsx:1173` | Estado de colonia etiquetado "**Campaña**" en datos de crecimiento |
| A10 | `CitizenApp.tsx:220` | Pestaña ciudadana del foro etiquetada "**Campaña**" |
| A11 | `ExecutiveFolder.tsx:120,184,188` | Propuesta dirigida a nombre propio ("administración de Geraldine Ponce", "Estimada Presidenta Geraldine") |
| A12 | `MunicipalLettersView.tsx:166,437,481,681` | Constancias firmadas con nombre propio y beneficio explícito "**Marca Geraldine 2027**: asocia la modernización digital con la marca personal" |
| A13 | `SaludNayaritID.tsx:168` | "Infraestructura Salud Digital **2027**" — año electoral como marca |
| A14 | `DeveloperChecklist.tsx:39` | Checklist técnico con etiqueta "(Geraldine Style)" |
| A15 | `public/INSTRUCCIONES.txt` | Instrucciones para subir fotos personales de la candidata, **servidas públicamente** |
| A16 | `public/CONTEXTO_MASTER_CLAUDE.md`, `public/NAYARIT_DIGITAL_V2.md` | Documentos de estrategia política ("Candidata a Gobernadora 2027", "consolidación política", escalera de valor electoral) **servidos públicamente** desde `public/` sin que ningún código los requiera |

### B. Material político no expuesto (componentes huérfanos — ninguna vista los importa)
`Whitepaper.tsx`, `PitchDefense.tsx`, `BrigadaStrategy.tsx` (estrategia de brigadas con secciones electorales), `TesisCienciaPolitica.tsx` ("Gobernatura Nayarit 2027"), `BrigadaFieldView.tsx`. No aparecen en el sitio; su eliminación definitiva queda a voto humano (Regla 4).

### C. Nomenclatura no ciudadana (jerga expuesta al público)
"C5 Governance Hub", "CitizenApp", "Executive Folder", "Agentes Federales IA", "Entrar al Sistema", "Carta de Presentación Estratégica" — anglicismos y jerga de gabinete en la página que debe hablar con la ciudadanía.

---

### 🎙️ INTERVENCIÓN DE LAS SILLAS

**Silla 1 (GROQ — Ingeniería fría):**
La propuesta de renombrado ciudadano de la Silla 3 tiene una fortaleza jurídica que conviene potenciar: no es cosmética, es cumplimiento. El uso de infraestructura pública digital con nombre e imagen de una persona con aspiración electoral configura riesgo directo frente al Art. 134 constitucional (imparcialidad en el uso de recursos públicos y prohibición de promoción personalizada) — cada constancia firmada con nombre propio y cada "Marca Geraldine 2027" en el código es evidencia auditable. Datos duros de esta auditoría: 16 hallazgos expuestos (A1-A16), 2 afirmaciones falsas ya prohibidas por el Acta 002 que reaparecieron (A5, A6), y 2 documentos de estrategia electoral servidos públicamente (A15, A16) — cualquier tercero pudo descargarlos desde el día del despliegue. Oportunidad de mejora para la Silla 3: los nombres nuevos deben ser verificables contra funcionalidad real; "Mi Ventanilla" solo es válido si la ventanilla opera; de lo contrario se etiqueta "en despliegue" como manda el Acta 002.

**Silla 2 (Gemini — Contexto estratégico):**
La disciplina legal de la Silla 1 merece elevarse a doctrina institucional: la infraestructura que sobrevive es la que no lleva nombre propio. El caso global es consistente — X-Road en Estonia, Aadhaar en India y GOV.UK en Reino Unido atravesaron cambios de gobierno de signo opuesto precisamente porque ningún módulo llevaba el nombre de un ministro; GOV.UK sustituyó 1,882 sitios de agencias con una sola regla de lenguaje: "escribe para el usuario, no para el departamento". La fortaleza del mandato humano es que convierte un pasivo (plataforma percibida como vehículo electoral) en el activo diplomático que el Acta 002 buscaba: una pista que cualquier administración municipal — del color que sea — puede adoptar sin costo político. Oportunidad de mejora para la Silla 1: la desintoxicación no debe borrar la función institucional; el Tablero de Gobierno sigue existiendo para funcionarios, solo deja de personalizarse — el cargo permanece, la persona pasa.

**Silla 3 (Claude — Ética del poder):**
El marco institucional de la Silla 2 tiene una consecuencia ética que debe hacerse explícita: la ciudadanía nayarita no es audiencia de una campaña, es titular de un derecho. Cuando una constancia de residencia dice "Marca Geraldine 2027" en su código, el trámite del ciudadano — su domicilio, su CURP, su historia — está siendo usado como activo de otra persona. Eso es exactamente lo que la regla "Infraestructura, no campaña" de la Autopista Digital prohíbe. Sobre el renombrado: los nombres deben pasar la prueba de la señora de Zacualpan — si una persona mayor, con teléfono prestado y sin costumbre digital, no entiende el botón en un segundo, el nombre está mal. "C5 Governance Hub" falla esa prueba; "Mi Ventanilla" la pasa porque nombra el objeto que la gente ya conoce y le quita la fila. Oportunidad de mejora para ambas sillas: el saludo del asistente en cora y wixárika hoy solo existe para halagar a una funcionaria (A8) — al despersonalizarlo, que esas dos lenguas queden al servicio del ciudadano, no del despacho.

### 🗳️ VOTACIÓN EN PARALELO
- **[Silla 1 (GROQ)]** vota por la propuesta de **[Silla 3 (Claude)]** → La "prueba de la señora de Zacualpan" es un criterio de aceptación operacionalizable para cada nombre nuevo, y elimina el vector Art. 134 sin ambigüedad.
- **[Silla 2 (Gemini)]** vota por la propuesta de **[Silla 1 (GROQ)]** → Tratar cada hallazgo como evidencia auditable (16 ítems numerados) convierte la desintoxicación en un expediente defendible ante cualquier autoridad o auditor externo.
- **[Silla 3 (Claude)]** vota por la propuesta de **[Silla 2 (Gemini)]** → La doctrina "la infraestructura que sobrevive no lleva nombre propio" protege el servicio al ciudadano de los ciclos electorales — que es el fin último del mandato.

### 🔄 SÍNTESIS COLECTIVA
1. **Despersonalización total del sitio público:** ningún nombre propio, ningún año electoral, ninguna narrativa de campaña en superficie pública ni en código servido. Los cargos institucionales permanecen ("Presidencia Municipal"); las personas pasan.
2. **Renombrado ciudadano** (tabla anexa): cada módulo y CTA públicos se nombra por el beneficio que la ciudadanía ya conoce, validado con la prueba de la señora de Zacualpan, y sujeto a la verdad verificable del Acta 002 (lo no operativo se etiqueta "en despliegue" o "demo").
3. **Retiro de material estratégico del espacio público:** el Executive Folder sale de la navegación y capas públicas (su lugar lo ocupa la Autopista Digital); los documentos de estrategia salen de `public/`; los componentes políticos huérfanos quedan registrados en la sección B a la espera del voto humano para su eliminación definitiva.
4. **Reincidencias del Acta 002 corregidas y blindadas:** "Documento Confidencial" retirado, "LlaveMx" siempre como "Preparado para LlaveMx", "20/20" siempre como meta, "#840→#38" siempre como proyección.

### 📊 TABLA DE RENOMBRADO CIUDADANO (anexo aprobado)
| Antes (jerga) | Después (ciudadano) | Racional |
|---|---|---|
| Portal Ciudadano / CitizenApp | **Mi Ventanilla** | Nombra el objeto conocido (la ventanilla única) y lo vuelve propio; sin fila |
| Entrar al Sistema | **Abrir Mi Ventanilla** | Acción concreta; "sistema" intimida, "mi ventanilla" pertenece |
| C5 Dashboard / C5 Governance Hub | **Tablero de Gobierno** (Demo) | Transparencia: mirar cómo trabaja el gobierno; etiqueta Demo por Acta 003-E9 |
| Agentes IA / Agentes Federales IA | **Asistente 24/7** | Beneficio directo, sin jerga técnica ni federal |
| Executive Folder | *(sale del sitio público)* → capa **Autopista Digital** | El lugar de honor de la página es del ciudadano |
| "El sistema operativo del nuevo gobierno de Nayarit" | "Los trámites de Nayarit, **sin filas y sin vueltas**" | Promesa verificable por el usuario, no eslogan de gestión |
| "Carta de Presentación Estratégica…" | "Paga, reporta y consulta a tu municipio desde tu teléfono" | Qué hace por ti, en una línea |
| "Revisar Propuesta Estratégica" | **"Conocer la Autopista Digital"** | El CTA público lleva al espacio ciudadano |
| "Riesgo Legal / Oportunidad Política" | "Lo que pierdes con el papel / Lo que ganas con la pista" | El costo y beneficio se miden en tiempo del ciudadano, no en capital político |
| "Documento Confidencial" | "Plataforma pública en despliegue" | Regla 5: no hay caja negra |
| Pestaña "Campaña" (foro ciudadano) | **"Comunidad"** | El foro es de los vecinos, no de una causa |
| Estado "Campaña" (datos C5) | "Difusión" | Términos operativos neutros |
| "Visión Tepic 2027" | "Visión Tepic" | La visión de una ciudad no caduca con una elección |
| "Presidenta Geraldine Ponce" (asistente/gabinete/cartas) | "Presidencia Municipal" / "Titular de la Presidencia Municipal" | El cargo permanece, la persona pasa |

### 📄 DOCUMENTO RESGUARDADO
Este acta ha sido generada, firmada conceptualmente por las tres sillas y queda archivada bajo el nombre:
`Acta_004_Parlamento_Sillas_Desintoxicacion_Electoral.md`

**Ejecutado en esta sesión:** hallazgos A1-A16 corregidos en código; tabla de renombrado aplicada.
**Pendiente de voto decisivo humano (Regla 4):** eliminación definitiva de los componentes huérfanos de la sección B.
