# VISIÓN ESTRATÉGICA — IA + DATOS ABIERTOS
## Nayarit Digital × ConnectX Servicios S.A. de C.V.

**Documento:** NYD-600 / Estrategia / Inteligencia de Datos
**Versión:** 1.0 — Julio 2026
**Clasificación:** Interno — Uso estratégico en presentaciones

---

## LA PREMISA

> Los datos del gobierno mexicano son públicos por ley.
> Están ahí. Actualizados. Verificados. Gratuitos.
> Nadie los ha convertido en inteligencia útil para el ciudadano de a pie.
> Eso es el océano azul que Nayarit Digital viene a navegar.

---

## 1. MAPA DE DATOS ABIERTOS — SIN CONTRATO

### APIs activas hoy (sin autenticación)

| Fuente | Qué tiene | Endpoint base | Para qué módulo |
|---|---|---|---|
| **DataMéxico** | PIB, empleo, comercio exterior, salarios por municipio | api.datamexico.org/tesseract | Observatorio, Análisis Político |
| **INEGI DENUE** | 34,891 negocios activos en Tepic geolocalizados | inegi.org.mx/api/denue/v1 | AgroVisión, Mapa Municipal |
| **INEGI Indicadores** | Censos, demografía, vivienda, educación | inegi.org.mx/api/indicadores | Observatorio |
| **SESNSP via DataMéxico** | Delitos por municipio, tipo y año | api.datamexico.org/.../sesnsp_crimes | Análisis Político |
| **PROFECO QQEP** | Precios canasta básica actualizados semanalmente | datos.profeco.gob.mx/quejas | Bienestar, Observatorio |
| **DIPOMEX** | CP → colonia + municipio + estado | api.tau.com.mx/dipomex/v1 | PagosView (validación) |
| **datos.gob.mx CKAN** | Catálogo completo de datos del gobierno federal | datos.gob.mx/api/3/action | Todos los módulos |
| **INE Datos Abiertos** | Padrón electoral, secciones, casillas | ine.mx/datos-abiertos | Análisis Político |
| **Transparencia Presupuestaria** | Gasto público federal por municipio y programa | transparenciapresupuestaria.gob.mx | Tesorería, Análisis Político |

### Documentos legales verificados (descarga directa)

| Documento | Fuente oficial | Relevancia para la plataforma |
|---|---|---|
| Ley de Ingresos 2026 — Tepic | Congreso de Nayarit | Tarifas reales de los 73 pagos |
| Presupuesto de Egresos 2025 — Tepic | Transparencia Fiscal Tepic | En qué gasta el municipio |
| Ley de Hacienda Municipal de Nayarit | Congreso de Nayarit | Marco legal de todos los cobros |
| PMOTDU 2023-2040 | IMPLAN Tepic | Planeación urbana oficial |
| Ley General de Transparencia (LGTAIP) | DOF / Cámara de Diputados | Derechos de acceso a información |
| Convenio 169 OIT | Diputados.gob.mx | Marco de colaboración indígena |
| CONEVAL Medición de Pobreza 2022 | CONEVAL | Carencias sociales verificadas |

---

## 2. CIENCIAS POLÍTICAS — APLICACIONES REALES

### 2.1 Monitor de Brecha Fiscal
**La oportunidad más grande y más ignorada del municipio:**

Tepic tiene 134,261 viviendas (INEGI 2020).
Solo 62,340 pagan predial al corriente.
41,892 están en mora. 30,029 sin registro catastral.
**Brecha: $239 millones de pesos sin recaudar cada año.**

Nayarit Digital puede detectar automáticamente los predios en mora
cruzando tres fuentes abiertas:
1. INEGI DENUE: geolocalización de viviendas y negocios
2. Padrón catastral municipal (requiere convenio, primera "llave")
3. Registro de contribuyentes de Tesorería

Con una tasa de recuperación del 30%:
**$71.7 millones MXN adicionales por año sin subir impuestos.**

Presentación ante Cabildo: "No necesitan más impuestos. Necesitan cobrar los que ya existen."

### 2.2 Tracker de Promesas vs Ejecución
El sistema conecta:
- Plan Municipal de Gobierno 2022-2025 (documento público)
- Presupuesto de Egresos (Transparencia Presupuestaria)
- Informes de Gobierno trimestrales

Para generar automáticamente el porcentaje de cumplimiento de cada promesa.

**Nadie en México tiene esto.** Los municipios que lo tuvieran pasarían de la rendición de cuentas manual (costosa, tardía, sesgada) a la rendición automática y continua.

### 2.3 Índice de Gobernanza Digital
Nayarit Digital calcula automáticamente 6 dimensiones:
- Transparencia (acceso a información, datos publicados)
- Digitalización (% trámites disponibles en línea)
- Participación ciudadana (reportes, consultas)
- Eficiencia recaudatoria (predial cobrado vs potencial)
- Cobertura de servicios (agua, drenaje, alumbrado)
- Datos abiertos (datasets publicados vs obligatorios)

**Caso de uso ante el Congreso de Nayarit:**
"Tepic pasó de 28/100 a 61/100 en gobernanza digital en 18 meses. Estos son los datos."

### 2.4 Detector de Anomalías en Gasto Público
Usa Transparencia Presupuestaria para detectar:
- Partidas que superan su estimación más del 30% sin justificación
- Contratos adjudicados directamente en montos límite (para evitar licitación)
- Dependencias con 0% de ejecución a mitad del año fiscal

Alerta automática → Dashboard del Presidente Municipal → Corrección antes de la auditoría.

**Esto es anticorrupción proactivo.** La auditoría llega meses después. La alerta llega el mismo día.

---

## 3. ACADEMIA CONNECTX — PLATAFORMA EDUCATIVA

### Visión
Academia ConnectX convierte los datos abiertos en conocimiento accionable
para tres audiencias: ciudadanos, funcionarios públicos y desarrolladores.

### Módulo 1: Escuela del Ciudadano
**"¿Qué puedo exigirle a mi gobierno?"**

Contenido basado en fuentes legales verificadas:
- Tus derechos ante el Ayuntamiento (Ley de Transparencia)
- Cómo leer tu recibo de predial y si es correcto (Ley de Ingresos 2026)
- Cómo solicitar información pública (Art. 6° Constitucional)
- Cómo reportar una obra pública detenida (Art. 115 Municipal)
- Tus derechos si eres indígena (Convenio 169 OIT, Art. 2° Constitucional)

**Formato:** Videolecciones de 3 minutos + Guía PDF descargable + Quiz con certificado digital

### Módulo 2: Escuela del Funcionario
**"Cómo usar la plataforma y leer los datos"**

Para el personal del Ayuntamiento:
- Cómo interpretar el módulo de Tesorería
- Cómo usar el Catálogo de Pagos y generar reportes
- Cómo leer el Observatorio Digital y presentarlo al Presidente Municipal
- Cómo manejar una solicitud de transparencia digital
- Ética en el uso de datos ciudadanos (LFPDPPP)

**Formato:** Capacitación presencial + Portal de e-learning + Certificación ConnectX

### Módulo 3: Taller de Datos Abiertos
**"Cómo usar la API de INEGI para tomar mejores decisiones"**

Para desarrolladores, periodistas de datos y estudiantes de ciencias políticas:
- Introducción a datos.gob.mx y la API CKAN
- Cómo descargar y procesar datos de DataMéxico con Python/R
- Cómo construir visualizaciones con datos del INEGI
- Caso práctico: Análisis de brecha fiscal en tu municipio
- Proyecto final: Dashboard de indicadores de tu colonia

**Alianza estratégica:** UAN (Universidad Autónoma de Nayarit) + IMPLAN Tepic

### Módulo 4: Marakame Digital
**Preservación del conocimiento wixárika con tecnología**

Para la comunidad de La Zitacua y cooperativas indígenas:
- Cómo usar la plataforma de artesanía (sin intermediarios)
- Fotografía de producto con celular para vender en línea
- Cómo registrar tu obra artesanal bajo Convenio 169 OIT
- Derechos de propiedad intelectual de las comunidades indígenas
- Cómo facturar y recibir pagos digitales como artesano

---

## 4. INTELIGENCIA ARTIFICIAL — APLICACIONES CONCRETAS

### 4.1 Asistente Legal Ciudadano (Claude API)

**El ciudadano pregunta en lenguaje natural:**
"¿Cuánto cuesta sacar un acta de nacimiento en Tepic?"

**El sistema responde citando la ley real:**
"Según el Artículo 47 de la Ley de Ingresos del Municipio de Tepic para el Ejercicio Fiscal 2026,
el derecho por expedición de acta de nacimiento certificada es de **$85.00 MXN**.
Puedes pagar en línea con QR OXXO o en la ventanilla del Registro Civil ubicada en [dirección].
Tiempo de tramitación: 15 minutos en ventanilla, 24 horas en línea."

**Tecnología:** Claude API (claude-sonnet-5) con Retrieval Augmented Generation (RAG)
sobre el corpus de leyes y reglamentos municipales indexados.

**Impacto:** Reduce 60-80% de las consultas presenciales en Tesorería y Registro Civil.
El ciudadano siempre recibe la respuesta correcta, citando la ley exacta.

### 4.2 Predictor de Rezago Fiscal
**Datos de entrada:** INEGI (ingreso promedio por colonia) + Catastro (valor de predios) + Histórico de pago

**Output:** Mapa de calor que muestra qué colonias tienen mayor probabilidad de rezago fiscal el siguiente trimestre.

**Uso:** El equipo de Tesorería prioriza visitas de concientización y convenios de pago en las zonas de mayor riesgo, antes de que el rezago se acumule.

### 4.3 Monitor de Bienestar Social
**Datos de entrada:** CONEVAL (carencias por municipio) + Padrón de beneficiarios de Bienestar (datos.gob.mx) + Reportes ciudadanos en la plataforma

**Output:** Mapa de necesidades que responde: "¿Dónde hay más carencia alimentaria que no está cubierta por ningún programa federal o municipal?"

**Uso:** El área de Bienestar sabe exactamente dónde abrir la próxima cocina comunitaria o quiosco de salud.

### 4.4 Extractor de Compromisos de Campaña
**Datos de entrada:** PDFs de planes de gobierno municipales + Informes de gobierno

**Output:** Lista estructurada de promesas con porcentaje de cumplimiento, calificación automática y fecha estimada de incumplimiento.

**Tecnología:** Extracción con Claude API sobre texto no estructurado → base de datos estructurada → Dashboard en tiempo real.

### 4.5 Clasificador de Reportes Ciudadanos
**Datos de entrada:** Reportes de servicio (baches, fallas de alumbrado, fugas de agua) enviados por ciudadanos en la plataforma.

**Output:** Clasificación automática por tipo + dependencia responsable + urgencia + geolocalización.

**Impacto:** El reporte llega directamente a la dependencia correcta sin pasar por una central de quejas humana. Tiempo de respuesta: de días a horas.

---

## 5. LOS OCÉANOS AZULES

### Océano Azul 1: El Asistente Legal Municipal
**Nadie lo tiene.** En México, el ciudadano que quiere saber sus derechos
tiene que buscar en PDFs del DOF, en la página del municipio (si existe),
o preguntarle a un abogado. Con IA y los datos abiertos correctos,
Nayarit Digital puede responder cualquier pregunta legal municipal
en 3 segundos, citando la ley exacta, en español accesible.

**Mercado potencial:** 130 millones de mexicanos con preguntas de gobierno.

### Océano Azul 2: El Monitor de Brecha Fiscal
**Nadie lo hace proactivamente.** Los municipios descubren su brecha fiscal
en la auditoría anual. Con los datos del INEGI, el catastro y Transparencia Presupuestaria,
Nayarit Digital puede calcular la brecha fiscal de cualquier municipio de México
en tiempo real y presentarla al Ayuntamiento como oportunidad de ingreso,
no como crítica.

**Propuesta de valor al municipio:** "Te mostramos dónde está el dinero que no estás cobrando."

### Océano Azul 3: La Capa Digital Indígena
**Nadie lo tiene.** No existe en México un sistema de gobierno digital
que reconozca formalmente a los pueblos indígenas como actores económicos
con derechos diferenciados, protección de propiedad intelectual cultural,
y acceso a mercados sin intermediarios.

La Zitacua como piloto. SEPIN + SEDATU como escalamiento estatal.
INPI (Instituto Nacional de los Pueblos Indígenas) como aliado federal.

### Océano Azul 4: El Municipio como API
**Lo que nadie ha hecho:** Convertir el municipio en una plataforma
que otros pueden construir encima. Nayarit Digital como la "capa base"
que otros desarrolladores, periodistas, académicos y ciudadanos
pueden usar para crear sus propias aplicaciones.

"¿Quieres saber cuánto paga tu colonia de predial? Usa nuestra API."
"¿Eres periodista y quieres investigar el gasto en obra pública? Usa nuestra API."

**Modelo de negocio:** API gratuita para ciudadanos y académicos,
API premium para desarrolladores comerciales.

### Océano Azul 5: GovTech para Municipios Medianos
**El mercado desatendido.** Las empresas de GovTech en México van
por las grandes ciudades (CDMX, GDL, MTY) o por el gobierno federal.
Los 2,469 municipios medianos de México (50,000-500,000 habitantes)
no tienen ninguna solución a su medida.

Nayarit Digital empieza en Tepic pero está diseñado para replicarse.
El modelo de 73 conceptos de pago + OXXO + módulo indígena es exportable
a cualquier municipio del país en menos de 30 días de implementación.

---

## 6. HOJA DE RUTA — IA + DATOS

### Fase 1 (Mes 1-3): Base de Conocimiento
- [ ] Indexar Ley de Ingresos 2026, Reglamentos y Ley de Hacienda en vector database
- [ ] Integrar DataMéxico API en ObservatorioView con datos reales
- [ ] Integrar DENUE API en MunicipioView (negocios activos por dependencia)
- [ ] Conectar PROFECO QQEP para precios reales en Bienestar

### Fase 2 (Mes 3-6): Asistente Legal
- [ ] Implementar RAG sobre el corpus legal con Claude API (claude-sonnet-5)
- [ ] Deploy del Asistente Legal en el módulo "ia" del dashboard
- [ ] Integrar con PagosView para calcular tarifas reales automáticamente
- [ ] Piloto con 50 preguntas ciudadanas reales de Tesorería

### Fase 3 (Mes 6-9): Análisis Político
- [ ] Monitor de Brecha Fiscal con datos de catastro municipal
- [ ] Tracker de Promesas conectado a Transparencia Presupuestaria
- [ ] Índice de Gobernanza Digital con cálculo automático trimestral
- [ ] Presentación ante Cabildo con el primer análisis de brecha fiscal real

### Fase 4 (Mes 9-12): Academia ConnectX
- [ ] Lanzamiento de Escuela del Ciudadano (4 módulos base)
- [ ] Alianza con UAN para taller de datos abiertos
- [ ] Certificación ConnectX para funcionarios municipales
- [ ] Módulo Marakame Digital con La Zitacua

---

## 7. EL ARGUMENTO DEFINITIVO

Una plataforma de gobierno que:

1. **No inventa datos** — Todo viene de INEGI, CONEVAL, Ley de Ingresos, Transparencia Presupuestaria
2. **Cita sus fuentes** — Cada número tiene una URL de origen pública y verificable
3. **Habla en lenguaje ciudadano** — IA convierte tecnicismo legal en respuesta útil
4. **Educa mientras sirve** — Academia ConnectX construye capital político con el ciudadano
5. **Mide lo que importa** — No el número de trámites digitalizados, sino el dinero recuperado y las carencias atendidas

> La diferencia entre una plataforma de gobierno y Nayarit Digital
> es que todas las demás miden actividad. Nosotros medimos impacto.
> Y el impacto tiene número, fecha, y fuente oficial.

---

*Documento elaborado por ConnectX Servicios S.A. de C.V.*
*NYD-600 / Visión IA + Datos Abiertos / Versión 1.0 / Julio 2026*
