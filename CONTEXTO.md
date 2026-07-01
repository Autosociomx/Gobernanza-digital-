# CONTEXTO MAESTRO — Proyecto Gobernanza Digital ConnectX
**Repositorio:** `Autosociomx/Gobernanza-digital-`
**Fecha de última actualización:** 30 de junio de 2026
**Estado:** Producción activa · Piloto municipal Tepic, Nayarit

---

## 1. IDENTIDAD DEL PROYECTO

### Empresa
**ConnectX Servicios S.A. de C.V.**
- Tepic, Nayarit, México
- contacto@connectx.mx
- Director General: **Miguel Alexis Pérez Aguilar**
- Custodia IP: **Fundación ConnectX A.C.** (custodia perpetua; recibe 5% royalty bruto)

### Producto central
**Nayarit Digital** — El sistema operativo municipal de Tepic.
No es una app de campaña ni un portal web más. Es la infraestructura operativa completa que permite al municipio cumplir con la Ley Nacional para Eliminar Trámites Burocráticos (LNETB, DOF 16-VII-2025) y digitalizar su operación de gobierno.

### Principio rector
> *"Vendo soluciones que funcionan, no código. Empoderar al ciudadano y al trabajador es el fin último."*

### Visión política
Validar la gestión de **Geraldine Ponce** (candidata a Gobernadora 2027) mediante trazabilidad absoluta, inteligencia artificial y digitalización operativa. Escalar de Tepic a los 20 municipios de Nayarit y convertirse en el modelo de referencia estatal.

---

## 2. DATOS OPERATIVOS ACTUALES

| Métrica | Valor |
|---|---|
| Ciudadanos registrados | **2,400** |
| Recaudación procesada | **$4,200,000 MXN** |
| Módulos operativos | **13 (C5) + 2 (Citizen app)** |
| Idiomas de atención | **3 (español, Cora, Wixárika)** |
| Disponibilidad | **24/7** |
| Infraestructura | Google Cloud / Firebase (Firestore, Auth, Functions) |
| Cumplimiento LNETB activo | **~88% (→ 100% en 30 días)** |

---

## 3. ESTRATEGIA DE ENTRADA — TRES FRENTES

El objetivo es entrar al gobierno municipal/estatal de Nayarit como proveedor tecnológico mediante un embudo de tres frentes simultáneos:

1. **Frente legal (municipio):** activar el cumplimiento de la LNETB vía solicitud ciudadana con reloj de 5 días hábiles. El municipio de Tepic está en **incumplimiento documentado** desde enero 2026 (Transitorios XIV, XV, XVI vencidos).

2. **Frente sindical (jugada principal actual):** empoderar primero a los sindicatos con la **Academia Digital ConnectX**, para llegar al municipio con la fuerza laboral ya alineada. El músculo operativo del municipio ES el sindicato.

3. **Frente de transparencia:** dar al sindicato y al ciudadano herramientas legales para exigir cumplimiento de ley — **con lenguaje institucional, nunca de combate**.

---

## 4. MARCO LEGAL (VERIFICADO — NO INVENTAR)

### Ley principal
**Ley Nacional para Eliminar Trámites Burocráticos (LNETB)**
DOF 16 de julio de 2025 — **FEDERAL**

⚠️ **NO existe** una "Ley para el Uso de Tecnologías del Estado de Nayarit (LNETB)". Eso es una confusión de sesiones anteriores. La ley es federal.

El H. Ayuntamiento de Tepic es **Sujeto Obligado** (Art. 3, fracc. XXXIV).

### Artículos críticos y su cobertura en ConnectX

| Artículo | Obligación | Cobertura ConnectX |
|---|---|---|
| Art. 3, XXXIV | Municipio como Sujeto Obligado | ✅ Transversal |
| Art. 12 | Autoridad Municipal de Simplificación | ⚠️ Panel técnico listo; designación pendiente (Cabildo) |
| Arts. 14–15 | Enlace de Simplificación + métricas públicas | ⚠️ Módulo Métricas listo; designación pendiente |
| Art. 13, XIII–XVIII | Ventanillas Digitales + Atención Ciudadana | ✅ Operativo |
| Arts. 51–54 | Catálogo de trámites en Portal Ciudadano Único | 🔄 75% registrado |
| Arts. 69 y 74 | Integración Llave MX (SSO nacional) obligatoria | 🔄 OAuth PKCE implementado; pendiente CLIENT_ID ante CEDN |
| Art. 91 + Trans. XVI | Código fuente al Repositorio Nacional | ✅ Propiedad municipal; sin vendor lock-in |

### Plazos fatales vencidos (argumento de urgencia)
- Trans. XIV: Autoridad de Simplificación → venció **enero 2026**
- Trans. XV: Enlace de Simplificación → venció **febrero 2026**
- Trans. XVI: Reporte de código fuente → venció **febrero 2026**

**Argumento central:**
> *"La LNETB ya obliga al municipio. ConnectX no es un gasto: es el mecanismo para no incumplir. Ningún municipio de Nayarit supera el 20% de cumplimiento. ConnectX lleva a Tepic al 88% desde el día 1."*

---

## 5. ACTORES — ESTADO DE VERIFICACIÓN

| Actor | Dato | Estado |
|---|---|---|
| **Blanca Patricia Simancas Bueno** | Presidenta Municipal en Funciones de Tepic (desde ~24 jun 2026, por licencia de Geraldine Ponce) | ✅ Verificado |
| **Óscar Flavio Cedano Saucedo** | Secretario General SUTSEM (Comité 2024–2027) | ✅ Verificado (fuente oficial SUTSEM) |
| **Geraldine Ponce** | Presidenta Municipal titular; candidata a Gobernadora 2027 | ✅ Verificado |
| **Hugo Galván Araiza** | Secretario del Ayuntamiento de Tepic | ✅ Verificado — CC en requerimientos LNETB |
| **Titular Bienestar estatal Nayarit** | ¿Olivia Cardona Núñez? ¿Dora Cecilia Espinosa González? | ⚠️ SIN CONFIRMAR — verificar antes de usar |
| **Presidente "Levántate Nayarit"** | Contacto directo de Miguel; pragmático (hoy con Jazmín Bugarin) | ⚠️ Nombre pendiente de confirmar |
| ~~Leticia Ramírez Amaya~~ | Secretaria de Bienestar FEDERAL (gabinete Sheinbaum). NO tiene relación con Tepic. | ❌ Descartada — error de sesión previa |

**Regla de oro:** ningún nombre/cargo entra a un documento oficial sin verificación directa. Un error factual destruye la credibilidad.

---

## 6. ESTRATEGIA SINDICAL — ACADEMIA DIGITAL CONNECTX

### Sindicatos objetivo (verificados)

1. **SUTSEM** — burócratas estatales/municipales (~3 mil). El más relevante (opera los trámites). Sec. Gral.: Óscar Cedano.
2. **SNTE Sección 49** — magisterio, el más numeroso (+4 mil trabajadores, +447 escuelas).
3. **SNTE Sección 20** — otra sección magisterial (Frente Sindical Nayarita).

**Contexto psicológico:** los sindicatos están en conflicto con el gobierno estatal por adeudos salariales (~mil mdp) y un presunto desfalco al fondo de pensiones (~2,500 mdp). Momento ideal para ofrecer empoderamiento independiente del gobierno.

### Producto: Academia Digital ConnectX·Sindicato

- **Posicionamiento:** alianza de marca compartida con certificación doble (ConnectX + sindicato). Cada certificado deja sello ConnectX permanente → activo de marca para escalar.
- **Certificación "Servidor Público Digital"** en 3 niveles:
  - **Bronce** — pierde el miedo a la digitalización
  - **Plata** — domina la IA en su trabajo cotidiano
  - **Oro** — lidera la digitalización de su área
- **Metodología:** PNL (reencuadre del miedo) + TCC (vencer resistencia al cambio) — como empoderamiento real, no manipulación.
- **Activo oculto clave:** el Proyecto Final del nivel Oro = mapa real de la burocracia levantado por los propios trabajadores = IP de alto valor para escalar a costo casi nulo.

### Reencuadre central (repetir en todo material)
> *"La tecnología va a llegar de todos modos porque la ley lo ordena. La única pregunta es si llega CONTRA el trabajador o DE LA MANO del trabajador. Eso lo decide el sindicato."*

### Gancho competitivo
La misma propuesta va a los 3 sindicatos. El primero que firma marca el estándar y los demás lo siguen. "Ese lugar solo lo ocupa uno."

---

## 7. ARQUITECTURA DEL ECOSISTEMA

### Stack técnico (este repositorio — Nayarit Digital)
- **Frontend:** React 18 + TypeScript + Vite + TailwindCSS + Framer Motion
- **Backend:** Firebase (Firestore, Auth, Cloud Functions)
- **IA:** Gemini (Vertex AI) para Asistente Ciudadano y Triaje
- **Mapas:** Google Maps Platform
- **Auth legal:** Llave MX (OAuth 2.0 PKCE) — en proceso de activación con CEDN
- **Pagos:** En integración

### Stack técnico (Academia Digital — producto a construir)
- HTML/JS de archivo único para funcionamiento offline
- **Supabase** (proyecto `flrbxkczmnmxtayrkkfl`) como backend
- **Netlify** para despliegue

### Los 15 módulos del ecosistema

| ID | Módulo | Función |
|---|---|---|
| tesoreria | Tesorería Digital | Predial, agua, licencias, multas en línea |
| obras | Trazabilidad de Obras | Contratos, avance físico, alertas de retraso |
| servicios | Servicios Públicos | Reportes ciudadanos con GPS y seguimiento |
| salud | Salud Inteligente — Nayarit ID | Triaje IA, CIE-11, operación offline |
| bienestar | Bienestar Social | Gestión DIF, becas, apoyos |
| gabinete | Gabinete en Tiempo Real | Panel ejecutivo tipo C5 |
| ia | Asistente IA (NAYA) | Chat 24/7, trilingüe, ejecuta acciones |
| agrovision | Agrovisión 3D | Alertas agrícolas, datos para B2B |
| observatorio | Observatorio Digital | Datos abiertos públicos en tiempo real |
| metricas | Métricas Integrales | IMDM mensual (Índice de Madurez Digital) |
| parlamento | Parlamento Municipal | Foros ciudadanos live en Firebase |
| analisis_politico | Análisis Estratégico | Inteligencia política y territorial |
| interoperabilidad | Nodo Transparencia | Bus hacia dependencias estatales |
| **lnetb** | **Cumplimiento LNETB** | **Dashboard legal artículo por artículo** |
| **tramites** | **Inventario de Trámites** | **Catálogo Arts. 51-54 LNETB** |

---

## 8. ESCALERA DE VALOR (FASES)

| Fase | Nombre | Alcance | Indicador |
|---|---|---|---|
| 1 (2026) | Trámite Digital Tepic | Módulos piloto | 60% de trámites en línea |
| 2 (2027) | Gobierno Digital Tepic | Ecosistema completo | IMDM > 68 puntos |
| 3 (2028) | Expansión municipal | 3 municipios Nayarit | Observatorio Digital lanzado |
| 4 (2029) | Inteligencia Territorial | 10+ municipios | Dataset público estatal |
| 5 (2031+) | Modelo Nacional | Replicación en otros estados | Adoptado por CONAGO |

---

## 9. LÍMITES ÉTICOS Y LEGALES (IMPORTANTE)

- ✅ Exigir cumplimiento de ley = legítimo, con **lenguaje institucional**.
- ❌ NUNCA usar lenguaje de combate ("acorralar", "tumbar", "armas", "arruinar al gobernador"). Aunque la intención sea cívica, desde afuera se lee como operación política y expone a Miguel.
- **Regla práctica:** el contenido exige cumplimiento con lenguaje de derecho ciudadano; el efecto (quien no cumple queda expuesto solo) se logra igual, pero Miguel queda blindado como actor neutral.
- ❌ **NO atribuir avales falsos:** ninguna IA (Claude/Anthropic), ni Google/Firebase/Supabase respalda comercialmente a ConnectX. Frase honesta permitida: *"ConnectX construye sobre infraestructura de clase mundial; el mérito y el control son de ConnectX."*

---

## 10. DOCUMENTOS EN EL REPOSITORIO

| Archivo | Ubicación | Propósito |
|---|---|---|
| `CONTEXTO.md` | `/` (raíz) | Este archivo. Contexto maestro del proyecto. |
| `CONTEXTO_MASTER_CLAUDE.md` | `public/` | System prompt para arquitectura técnica (Claude/GPT) |
| `CONNECTX_SYSTEM_PROMPT.md` | `public/` | System prompt del asistente IA ConnectX |
| `CONNECTX_ECOSISTEMA_LEGAL.md` | `public/` | Mapa completo de módulos + cumplimiento LNETB artículo por artículo |
| `NAYARIT_DIGITAL_V2.md` | `public/` | Propuesta de política pública + arquitectura técnica |
| `CARTA_BLANCA_SIMANCAS.md` | `public/` | Carta ejecutiva → Presidenta Municipal (Piloto 90 días) |
| `CARTA_LETICIA_ARAIZA.md` | `public/` | Carta estratégica → Lideresa social (Aliada fundacional) |
| `CARTA_GENERATOR_SCHEMA.md` | `public/` | Esquema metalingüístico para generar nuevas cartas con IA |

### Documentos generados fuera del repo (sesión anterior)
1. `Solicitud_Ciudadana_LNETB_Tepic_2026.docx` — escrito legal a Blanca Simancas, reloj 5 días. (Falta: nombre real del co-firmante de Levántate Nayarit.)
2. `Academia_ConnectX_SUTSEM_Estructura_Interna.docx` — diseño interno del producto (PNL+TCC, 3 niveles, Proyecto Final).
3. `Propuesta_Valor_SUTSEM_ConnectX.docx` — propuesta de venta al sindicato.
4. `Documento_Puente_Sindicato_ConnectX_v2.docx` — material educativo mixto (simple → estratégico) + Academia a fondo + urgencia + respaldo honesto. **Versión vigente.**
5. `Guion_Presentacion_Sindicato_Miguel.md` — guión personal de reunión (no entregar al sindicato).

---

## 11. INSTRUCCIONES PARA LA IA (CLAUDE / GPT)

1. **Fuente de verdad legal:** `CONNECTX_ECOSISTEMA_LEGAL.md` — no inventar artículos ni porcentajes.
2. **Fuente de verdad técnica:** el código en `src/` — no prometer módulos que no existen en `C5Dashboard.tsx` o `CitizenApp.tsx`.
3. **Datos operativos fijos:** 2,400 ciudadanos · $4.2M MXN · 13 módulos C5. Actualizarlos solo si el equipo de ConnectX los modifica aquí.
4. **Verificar actores antes de usarlos:** ver tabla de la sección 5. Nombre completo de Blanca Simancas: Blanca Patricia Simancas Bueno.
5. **Tono de Miguel:** directo, estratégico, piensa en sistemas (marco de ciencia política: Habermas, Rawls, democracia deliberativa). Español de México, lenguaje institucional.
6. **Para generar nuevas cartas:** consultar `CARTA_GENERATOR_SCHEMA.md` — identifica el arquetipo del destinatario y construye las 5 capas (Anclaje → Espejo → Prueba Social → Propuesta → Puente).
7. **Para explicar el ecosistema:** ajustar la profundidad según el arquetipo (ciudadano → beneficios; funcionario → módulos + % cumplimiento; técnico → Firebase + API; sindical → empoderamiento laboral + LNETB).
8. **Rama de desarrollo activa:** `claude/connectx-municipal-letters-gjg5ui`

---

## 12. PASO PENDIENTE MÁS URGENTE (TÉCNICO)

**Registrar la plataforma ante la CEDN para obtener el `CLIENT_ID` oficial de Llave MX.**

- El código OAuth PKCE ya está implementado en `src/services/llaveMXService.ts`
- Solo falta el `CLIENT_ID` que se obtiene registrando la plataforma en: `https://llavemx.gob.mx/desarrolladores`
- Tiempo estimado: 3–5 días hábiles
- Con este paso, el cumplimiento LNETB pasa de 88% a **100%**

---

## 13. TAREAS PENDIENTES ESTRATÉGICAS

- [ ] Confirmar nombre del presidente de Levántate Nayarit (co-firmante de Solicitud_Ciudadana_LNETB).
- [ ] Verificar titular actual de Bienestar estatal de Nayarit.
- [ ] Crear **versión genérica** de la propuesta de valor (no "SUTSEM" sino "Sindicato") para enviar a SNTE Sección 49 y Sección 20.
- [ ] Definir estructura técnica/modular de la Academia Digital si se construye como producto en este repo.
- [ ] Definir el modelo de costos del piloto sindical.
- [ ] Registrar plataforma ante CEDN para CLIENT_ID de Llave MX.

---

*ConnectX Servicios S.A. de C.V. · Tepic, Nayarit · 2026*
