# PLAN DE TRABAJO — DEL PROTOTIPO A PRODUCCIÓN
## Nayarit Digital × H. Ayuntamiento de Tepic

**Documento:** NYD-400 / Operaciones / Plan Post-Contrato
**Versión:** 1.0 — Julio 2026
**Propósito:** Lo que sigue después de que se firma el primer convenio.
**Custodio:** ConnectX Servicios S.A. de C.V. — Bóveda de Jordan

---

## PREMISA CRÍTICA

El prototipo existe. El diseño es correcto. La visión es diferenciada.
Lo que convierte un prototipo en producción no es más código —
son **tres llaves** que solo se abren con un convenio firmado:

1. **Acceso a datos oficiales** del municipio (padrones, catastro, usuarios de agua)
2. **Alta como proveedor** en Tesorería para procesar pagos reales
3. **Credenciales de API** de Llave MX, Conekta y sistemas internos del Ayuntamiento

Sin esas tres llaves, podemos agregar 100 módulos más al dashboard
y seguiremos siendo demo. Con esas tres llaves, el primer pago real
puede procesarse en menos de 30 días.

---

## ANTES DE FIRMAR — Lista de verificación (hoy)

### Lo que debes llevar a la reunión

- [ ] Demo de la plataforma funcionando en celular (no solo laptop)
- [ ] `ACUERDO_COLABORACION_WIXARIKA.md` impreso y firmado por ConnectX
- [ ] `PLAN_ESTRATEGICO_ZITACUA.md` como propuesta de piloto comunitario
- [ ] Este documento como hoja de ruta de implementación
- [ ] Propuesta económica (tarifa mensual o % de recaudación recuperada)
- [ ] Seguro de responsabilidad civil profesional (o carta compromiso de contratarlo)

### Lo que necesitas que el municipio te entregue al firmar

- [ ] **Oficio de autorización** de acceso a datos de catastro y padrón fiscal
- [ ] **Nombre del enlace de TI** del Ayuntamiento — la persona que abre puertas técnicas
- [ ] **Copia de Ley de Ingresos 2026** con tarifas vigentes (para cargar en PagosView real)
- [ ] **Acceso de solo lectura** al sistema de catastro municipal actual (cualquier formato)
- [ ] **Fecha de primer pago de prueba** — el predial de un predio piloto

### Lo que el convenio debe decir explícitamente

- Nayarit Digital es proveedor de servicios tecnológicos, no concesionario de recaudación
- Los fondos de los pagos pasan por la Tesorería Municipal, no por ConnectX
- ConnectX cobra por el servicio de plataforma, no por porcentaje de recaudación (*salvo acuerdo alternativo específico*)
- Datos del ciudadano son propiedad del municipio — ConnectX los procesa pero no los posee
- SLA mínimo: 99% de disponibilidad en horario hábil (lunes a sábado 8am-8pm)

---

## FASE 0 — DÍA DEL CONTRATO
**Objetivo:** Salir con tres cosas en la mano

1. **Convenio firmado** con vigencia mínima de 12 meses
2. **Oficio de acceso a datos** — aunque sea para catastro básico (nombre, dirección, valor)
3. **Fecha del primer pago real** — un predial de prueba con ciudadano real

Si sales con esas tres cosas, el proyecto está desbloqueado.
Si solo sale el convenio sin el oficio, marca fecha límite de 15 días para el oficio.

---

## FASE 1 — DÍAS 1 A 7: ENCENDER EL MOTOR
**Objetivo:** Tres sistemas reales arriba antes del día 8

### Día 1-2: Alta de proveedores de pago
- [ ] Crear cuenta en **Conekta** (conekta.com) — requiere: RFC, CLABE, acta constitutiva
  - Tiempo de aprobación: 3-5 días hábiles
  - Integración: SDK JavaScript + webhook en Firebase Functions
  - Lo que habilita: OXXO Pay real (el ciudadano paga en cualquier OXXO)
- [ ] Crear cuenta de respaldo en **OpenPay** (openpay.mx) — mismo proceso
  - Tenerlo listo por si Conekta tiene demoras

### Día 2-3: Producción de Firebase
- [ ] Crear proyecto Firebase **PRODUCCIÓN** separado del demo
- [ ] Habilitar Authentication con email/password + Google Sign-In
- [ ] Configurar Firestore con reglas de seguridad reales
- [ ] Configurar Firebase Functions para webhooks de Conekta
- [ ] Variables de entorno: `VITE_FIREBASE_API_KEY` real en Netlify
- [ ] Activar Firebase App Check (previene bots y abuso de API)

### Día 3-5: Solicitud de Llave MX
- [ ] Registrar a ConnectX en **CEDN** (Centro de Gobierno Digital):
  cedn.gob.mx → Registro de Proveedores Tecnológicos
- [ ] Solicitar `CLIENT_ID` de OAuth 2.0 para Llave MX
  - Tiempo de aprobación: 10-20 días hábiles
  - Sin esto: el login sigue siendo con email/password propio (funciona, pero sin CURP verificado)
- [ ] Mientras llega: configurar login propio con verificación de teléfono SMS (Firebase Phone Auth)

### Día 5-7: Carga de datos reales
- [ ] Recibir CSV/Excel del catastro municipal del enlace de TI
- [ ] Script de carga a Firestore: RFC + nombre + dirección + valor catastral + adeudo predial
  - Aunque sea 100 predios de prueba del colonia piloto
- [ ] Actualizar PagosView: reemplazar montos fijos por cálculo real basado en valor catastral

**Entregable de Fase 1:** Sistema con auth real + Conekta conectado + predios reales cargados

---

## FASE 2 — DÍAS 8 A 30: EL PRIMER PESO REAL
**Objetivo:** Un ciudadano real paga un pago real en un OXXO real de Tepic

### Semana 2 (Días 8-14)
- [ ] **Primer pago de prueba** con el enlace del municipio como ciudadano
  - Selecciona su predio en la plataforma
  - Genera QR OXXO (Conekta devuelve referencia real)
  - Va a OXXO, paga
  - Webhook confirma a Firebase
  - Dashboard del ciudadano muestra recibo
  - Dashboard del Ayuntamiento muestra ingreso
- [ ] Documentar el flujo completo en video (para presentaciones futuras)
- [ ] Corregir cualquier fricción que aparezca en la prueba

### Semana 3 (Días 15-21)
- [ ] Abrir a **5 ciudadanos piloto** — empleados del Ayuntamiento o vecinos cercanos
- [ ] Activar los 3 pagos de mayor volumen en Tepic:
  1. Predial urbano
  2. Agua potable (requiere convenio con COAPATAP — proceso paralelo)
  3. Infracciones de tránsito
- [ ] Primer reporte de recaudación digital para Presidencia Municipal

### Semana 4 (Días 22-30)
- [ ] Sistema de soporte básico: WhatsApp Business + correo de soporte
- [ ] Manual de usuario ciudadano (PDF de 2 páginas + video de 90 segundos)
- [ ] Capacitación de 2-3 personas del Ayuntamiento en el dashboard
- [ ] Primer nota de prensa: "Tepic lanza el primer catálogo digital de pagos municipales"

**Entregable de Fase 2:** 5+ pagos reales procesados · Primer reporte oficial · Video del flujo completo

---

## FASE 3 — DÍAS 31 A 90: LANZAMIENTO PÚBLICO
**Objetivo:** Tepic tiene el catálogo de pagos más completo de un municipio mediano en México

### Mes 2 (Días 31-60)
- [ ] Lanzamiento suave: anuncio en redes del Ayuntamiento
- [ ] Habilitar los 11 pagos del catálogo inicial en modo real
- [ ] Integrar COAPATAP (agua) si el convenio está firmado
- [ ] Activar módulo La Zitacua: primeros 15 artesanos con perfil real
- [ ] Primeras ventas de artesanía wixárika a través de la plataforma
- [ ] Solicitar reunión con SEPIN (Secretaría de Pueblos Indígenas de Nayarit)
  — mostrar La Zitacua como caso activo

### Mes 3 (Días 61-90)
- [ ] Presentación formal ante Cabildo del H. Ayuntamiento de Tepic
  — con métricas reales: montos recaudados, número de pagos, tiempo promedio
- [ ] Primer informe de brecha fiscal detectada (si hay acceso a catastro completo):
  "Detectamos X predios con posible cambio de uso de suelo no declarado"
- [ ] Propuesta de expansión: activar los 73 conceptos del catálogo completo
- [ ] Primer acercamiento con Gobierno del Estado de Nayarit (Fase Estatal)
- [ ] Activar Llave MX si ya llegaron las credenciales del CEDN

**Entregable de Fase 3:** 30+ pagos en catálogo activo · Primer mes de métricas reales · Presentación ante Cabildo

---

## FASE 4 — MESES 3 A 12: CONSOLIDACIÓN Y EXPANSIÓN
**Objetivo:** Nayarit Digital es la infraestructura digital del Ayuntamiento de Tepic

### Trimestre 2 (Meses 4-6)
- [ ] 50+ conceptos de pago activos (de los 73 del catálogo)
- [ ] TepicVisión: integración de primera capa de datos INEGI/AGEB con slider de años
- [ ] CatastroVisión v1: alertas de cambio de uso de suelo con imagen Sentinel-2
- [ ] Módulo de Bienestar: registro de beneficiarios geolocalizados activo
- [ ] Convenio firmado con municipio de Xalisco (primer municipio de expansión)

### Trimestre 3 (Meses 7-9)
- [ ] Fase Estatal: convenio con Secretaría de Finanzas de Nayarit
  — tenencia, placas, actas del Registro Civil en el catálogo
- [ ] La Zitacua: 4 webinars realizados · 30+ artesanos con ventas activas
- [ ] Presentación ante SEDATU: "La capa digital de la Ciudad de las Artes Indígenas"
- [ ] Segunda nota de prensa estatal / federal

### Trimestre 4 (Meses 10-12)
- [ ] 73 conceptos del catálogo completo activos
- [ ] 3+ municipios en la plataforma (Tepic + Xalisco + uno más)
- [ ] Contrato de mantenimiento anual renovado
- [ ] Presentación ante Congreso de Nayarit como modelo para replicación estatal

---

## LOS TRES ESCENARIOS — Bueno, Malo, Peor

### LO BUENO — Probabilidad 30%
El Ayuntamiento firma, asigna presupuesto en el mismo mes, el enlace de TI coopera activamente, los datos de catastro llegan en formato CSV en menos de 7 días.

**Timeline:** Primer pago real en 15 días. Lanzamiento público en 45 días.

**Señales de que estás en este escenario:** El presidente municipal menciona la plataforma en su siguiente conferencia de prensa. El enlace de TI responde mensajes el mismo día.

### LO MALO — Probabilidad 50%
El Ayuntamiento firma pero el presupuesto está "en revisión". El enlace de TI pide un documento formal para cada acceso. Los datos de catastro están en un sistema legacy de los años 90 que nadie sabe exportar.

**Timeline:** Primer pago real en 45-60 días. Lanzamiento público en 90 días.

**Cómo manejarlo:**
- No esperar el catastro completo: cargar manualmente los 100 predios de la colonia piloto desde una hoja de Excel
- No esperar el presupuesto formal: operar con el acuerdo firmado como garantía y facturar mes a mes
- No esperar al enlace de TI: ir directamente con el Tesorero Municipal para el acceso a datos fiscales
- Documentar cada obstáculo por escrito — protege a ConnectX y presiona al municipio a cumplir

### LO PEOR — Probabilidad 20%
El acuerdo se firma pero llega un cambio de administración o de prioridades. El presupuesto no se libera en este ejercicio fiscal. El proyecto queda en "pause indefinido".

**Cómo prevenirlo ANTES de que ocurra:**
- Incluir en el convenio un pago inicial (aunque sea simbólico: $5,000-$10,000 MXN) antes de entregar acceso completo al código fuente
- Firmar antes del 15 de agosto — después del Informe de Gobierno, los presupuestos se congelan
- Tener un Plan B listo: si el municipio frena, el piloto de La Zitacua puede funcionar independientemente como tienda de artesanía
- No depender de un solo contrato para la viabilidad del proyecto

**Si ocurre de todas formas:**
- Activar inmediatamente el módulo de artesanía de La Zitacua como generador de ingresos independiente
- Presentar el caso ante la Secretaría de Pueblos Indígenas de Nayarit como proyecto cultural
- Usar el convenio firmado (aunque pausado) como referencia en la siguiente presentación con otro municipio

---

## EL MAPA DE INTEGRACIONES

Estas son las conexiones técnicas que desbloquean cada parte del sistema:

| Conexión | Qué habilita | Quién la da | Tiempo estimado |
|---|---|---|---|
| **Conekta OXXO Pay** | Pagos reales en efectivo en toda la red OXXO | Conekta.com (privado) | 3-5 días hábiles |
| **Firebase Producción** | Auth real, base de datos real, webhooks | Google Cloud (auto) | 1 día |
| **Llave MX CLIENT_ID** | Login con CURP verificado por el gobierno | CEDN (gobierno federal) | 10-20 días hábiles |
| **Catastro Municipal** | Predios, valores, adeudos reales | Enlace de TI del Ayuntamiento | 7-30 días (depende del municipio) |
| **COAPATAP API/CSV** | Adeudos de agua reales | Dirección de COAPATAP | 15-45 días (requiere convenio aparte) |
| **Sentinel-2 / GEE** | Imágenes satelitales históricas | Google Earth Engine (gratis) | Inmediato tras registro |
| **INEGI DENUE API** | Mapa de negocios geolocalizados | api.datamexico.org (público) | Inmediato |
| **Marco Geoestadístico INEGI** | Polígonos de AGEBs de Tepic | descarga.inegi.org.mx (público) | Inmediato |
| **Secretaría de Finanzas Nayarit** | Tenencia, placas, RC estatales | Convenio estatal | 3-6 meses |

---

## REGLA DE ORO

> El producto más valioso que ConnectX puede entregar en los primeros 90 días no es el catálogo de 73 pagos.
> Es el **primer recibo oficial** — el PDF con folio del Ayuntamiento de Tepic, el nombre del ciudadano,
> el concepto pagado, la fecha y el monto — generado por Nayarit Digital.
>
> Ese PDF es la prueba de que el sistema funciona.
> Ese PDF es el argumento de venta para el siguiente municipio.
> Ese PDF vale más que 1,000 slides de presentación.

---

*Documento elaborado por ConnectX Servicios S.A. de C.V.*
*NYD-400 / Plan Post-Contrato / Versión 1.0 / Julio 2026*
*Validar términos legales con abogado corporativo antes de firmar el convenio municipal.*
