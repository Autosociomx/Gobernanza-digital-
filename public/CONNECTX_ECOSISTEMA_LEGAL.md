# ConnectX — Ecosistema Digital y Cumplimiento Legal
## Documento de referencia para explicaciones institucionales, cartas y sistema de IA

> Este archivo es la fuente de verdad sobre cómo funciona ConnectX y cómo cumple con la Ley de Gobierno Digital y Firma Electrónica del Estado de Nayarit. Toda explicación pública, carta institucional o respuesta del asistente IA debe derivarse de este documento.

---

## 1. Qué es ConnectX (en una oración)

ConnectX es la infraestructura operativa digital del municipio: una plataforma única que conecta al ciudadano con todos los servicios de gobierno —pagos, reportes, salud, obras, transparencia— desde cualquier dispositivo, con trazabilidad legal completa y sin filas.

---

## 2. La arquitectura: cómo funciona

ConnectX no es una app. Es un **ecosistema de 13 módulos interconectados** que comparten una base de datos común (Firebase/Firestore), una identidad ciudadana única (Nayarit ID) y un API Gateway central.

```
CIUDADANO
    │
    ▼
[NAYARIT ID — Identidad Digital Única]
    │   CURP / teléfono / firma táctil
    │
    ▼
[API GATEWAY — Bus de Interoperabilidad]
    │
    ├──► TESORERÍA DIGITAL         → Predial, agua, licencias, multas
    ├──► TRAZABILIDAD DE OBRAS     → Contratos, avance físico, fotos
    ├──► SERVICIOS PÚBLICOS        → Baches, luminarias, fugas con GPS
    ├──► SALUD INTELIGENTE         → Triaje IA, CIE-11, derivación médica
    ├──► BIENESTAR SOCIAL          → Becas, apoyos, programas DIF
    ├──► PARLAMENTO MUNICIPAL      → Foros ciudadanos en tiempo real
    ├──► ASISTENTE IA              → Chat 24/7 en español, Cora y Wixárika
    ├──► AGROVISIÓN 3D             → Alertas de plagas, riesgo territorial
    ├──► OBSERVATORIO DIGITAL      → Datos abiertos y tableros públicos
    ├──► MÉTRICAS INTEGRALES       → Índice de Madurez Digital Municipal
    ├──► GABINETE EN TIEMPO REAL   → Panel de control para el ejecutivo
    ├──► ANÁLISIS ESTRATÉGICO      → Inteligencia política y territorial
    └──► NODO TRANSPARENCIA        → Interoperabilidad con dependencias estatales
```

### Principio de funcionamiento

Todos los módulos comparten tres elementos:

| Elemento compartido | Función |
| :--- | :--- |
| **Nayarit ID** | Una sola cuenta ciudadana (CURP o teléfono) da acceso a todos los servicios |
| **Firestore en tiempo real** | Cualquier acción en un módulo es visible en los demás inmediatamente |
| **Folio Criptográfico** | Cada transacción genera un identificador único con valor de notificación oficial |

---

## 3. Los 13 módulos: qué hace cada uno

### 3.1 Tesorería Digital
Permite pagar predial, agua, licencias de funcionamiento y multas 100% en línea, desde cualquier dispositivo. Genera líneas de captura, recibos fiscales electrónicos y envía recordatorios automáticos por WhatsApp. La recaudación queda registrada en tiempo real en el tablero del Gabinete.

### 3.2 Trazabilidad de Obras
Cada obra pública tiene una ficha única: contrato, empresa contratista, monto total, fechas de inicio y entrega, fotos de avance semanales y porcentaje real ejecutado. Si hay retraso o sobrecosto, el sistema genera una alerta automática para el área técnica y para el panel del Gabinete.

### 3.3 Servicios Públicos Inteligente
Los ciudadanos reportan baches, luminarias fundidas, fugas de agua o basura acumulada por WhatsApp, web o app, con foto y geolocalización GPS. La IA clasifica el reporte, lo asigna a la dependencia correcta y notifica al ciudadano de cada cambio de estado: Recibido → Asignado → En proceso → Resuelto.

### 3.4 Salud Inteligente — Nayarit ID
Sistema de triaje médico con inteligencia artificial. El ciudadano describe sus síntomas y el sistema —con codificación CIE-11 y cumplimiento OMS 2026— determina el nivel de urgencia y deriva al servicio correcto: atención en casa, centro de salud u hospital. Opera sin conexión a internet para colonias con mala señal.

### 3.5 Bienestar Social
Panel para trabajadores del DIF y coordinadores de programas sociales. Gestiona beneficiarios, despensas, becas y apoyos. Se alimenta automáticamente de los casos detectados por Salud Inteligente (brotes, desnutrición) y de reportes de Servicios Públicos (adultos mayores sin agua).

### 3.6 Parlamento Municipal
Foro ciudadano en tiempo real sobre Firebase. Los vecinos abren hilos de discusión por categoría: Seguridad Vecinal, Redes de Apoyo, Propuestas de Colonia, General. Los comentarios y propuestas quedan registrados y son visibles para los funcionarios.

### 3.7 Asistente IA Ciudadano
Chat disponible 24/7 que responde en español, lengua Cora y lengua Wixárika. Puede ejecutar acciones directamente: "Paga mi predial", "Reporta un bache en mi calle", "¿En qué va la obra del puente?". Es la interfaz única de todos los módulos — el ciudadano no necesita saber a qué área pertenece su necesidad.

### 3.8 Agrovisión 3D
Inteligencia territorial para el sector agro. Genera alertas de plagas, mapas climáticos de riesgo y datos de desarrollo productivo por zona. Sus datos son la base del modelo B2B de ConnectX hacia aseguradoras y sector agroindustrial.

### 3.9 Observatorio Digital
Portal público alimentado en tiempo real. Visualiza: mapa de calor de reportes ciudadanos por colonia, tablero de obra pública con avance físico y financiero, recaudación por tipo de impuesto y zona, tendencias de síntomas de salud (anonimizadas) e indicadores de desempeño municipal. Cualquier ciudadano, periodista o académico puede consultarlo.

### 3.10 Métricas Integrales
Calcula el Índice de Madurez Digital Municipal (IMDM) de Tepic: un puntaje de 0 a 100 actualizado mensualmente con datos reales de la plataforma. Línea base estimada de Tepic sin ConnectX: 22 puntos. Meta a 12 meses con ConnectX: 68 puntos.

### 3.11 Gabinete en Tiempo Real
Panel de control ejecutivo para la Presidenta Municipal o Gobernadora. Muestra inversión, reportes activos, recaudación y mapa térmico estatal desde un iPad. Es el equivalente digital de un C5 municipal.

### 3.12 Análisis Estratégico
Módulo de inteligencia política y territorial. Cruza datos de todos los módulos para generar alertas estratégicas, análisis de impacto por colonia y proyecciones para la toma de decisiones.

### 3.13 Nodo Transparencia (Interoperabilidad)
Bus de servicios que conecta a ConnectX con las dependencias estatales. Permite que el Municipio de Tepic interopere con las 48 dependencias del Estado de Nayarit sin intermediarios ni trámites en papel. Es el módulo que activa el cumplimiento de la obligación legal de interoperabilidad.

---

## 4. Cumplimiento de la LNETB — Ley Nacional para Eliminar Trámites Burocráticos (DOF 16-VII-2025)

La LNETB es de observancia obligatoria para el H. Ayuntamiento de Tepic como Sujeto Obligado (Art. 3, XXXIV). ConnectX cubre sus obligaciones de la siguiente manera:

| Artículo LNETB | Obligación | Módulo ConnectX | Mecanismo técnico | Estado |
| :- | :--- | :--- | :--- | :--- |
| **Art. 3, XXXIV** | Municipio como Sujeto Obligado | Nayarit ID (transversal) | ConnectX opera como infraestructura del Sujeto Obligado con trazabilidad legal completa | ✅ Operativo |
| **Art. 12** | Autoridad Municipal de Simplificación y Digitalización | Gabinete en Tiempo Real + Panel LNETB | Panel técnico listo para la Autoridad designada por Cabildo | ⚠️ Designación pendiente (Cabildo) |
| **Arts. 14–15** | Enlace de Simplificación (nivel Director General) | Inventario de Trámites + Métricas Integrales | Inventario de 12+ trámites con estado Portal Único y métricas de uso | ⚠️ Designación pendiente (Cabildo) |
| **Art. 13, XIII–XVIII** | Soluciones tecnológicas, Ventanillas Digitales, Modelo Integral Atención | Tesorería · MostradorPro · Servicios Públicos · Asistente IA | 12 tipos de pago, atención 24/7 en 3 idiomas, reportes con GPS | ✅ Operativo |
| **Arts. 51–54** | Todo trámite en el Portal Ciudadano Único; sin cobros fuera del Portal | Inventario de Trámites ConnectX | 9/12 trámites registrados (75%); 3 en proceso de registro | 🔄 En proceso |
| **Art. 74** | Integración Llave MX — inicio de sesión único nacional | LoginView + llaveMXService.ts | OAuth PKCE implementado; pendiente CLIENT_ID ante CEDN (3-5 días) | 🔄 En proceso |
| **Art. 91 + Trans. XVI** | Reporte de código fuente al Repositorio Nacional | Repositorio ConnectX (GitHub) | Propiedad intelectual 100% del municipio; sin vendor lock-in; reportable en cualquier momento | ✅ Operativo |

### Obligaciones complementarias cubiertas

| Obligación | Fundamento | Módulo | Cobertura |
| :--- | :--- | :--- | :--- |
| Datos abiertos | Ley General de Transparencia | Observatorio Digital | 100% — tableros públicos en tiempo real |
| Protección de datos | LGPDP (aplica a ConnectX como procesador) | Nayarit ID + Firestore | Cifrado, acceso por rol, anonimización automática a 90 días |
| Lenguas originarias | Derechos lingüísticos constitucionales | Asistente IA | Español, Cora y Wixárika |
| Salud pública digital | OMS 2026 / CIE-11 | Salud Inteligente | Codificación CIE-11, operación offline |
| Participación ciudadana | Art. 13, fracc. XV LNETB | Parlamento Municipal | Foros en tiempo real sobre Firebase |

### Porcentaje de cumplimiento LNETB

| Obligación | Sin ConnectX (Tepic hoy) | Con ConnectX activado |
| :--- | :--- | :--- |
| Sujeto Obligado operativo | 0% | 100% |
| Trámites en Portal Único (Arts. 51–54) | ~15% | ~75% (→100% en 30 días) |
| Llave MX integrada (Art. 74) | 0% | 90% (→100% tras registro CEDN) |
| Código fuente reportable (Art. 91) | 0% con vendors cerrados | 100% — propiedad municipal |
| Ventanilla Digital operativa (Art. 13) | 0% | 100% |
| Trazabilidad y evidencia fiduciaria | 0% | 100% |
| **Cumplimiento LNETB global estimado** | **< 5%** | **~88% en activación / 100% en 30 días** |

> Los 2 puntos de acción que no son técnicos (Art. 12 y Arts. 14–15) dependen de actos administrativos del Cabildo —designar la Autoridad y el Enlace de Simplificación. ConnectX provee el panel operativo para ambos desde el día 1. El municipio NO puede cumplir esos artículos sin la designación formal, pero ConnectX sí puede operar sin ella mientras el Cabildo actúa.

---

## 5. Qué distingue a ConnectX de cualquier otro sistema

| Característica | ConnectX | Sistemas convencionales |
| :--- | :--- | :--- |
| Identidad ciudadana única | Una sola cuenta para todos los trámites | Un sistema por dependencia |
| Multilingüe | Español, Cora, Wixárika | Solo español |
| Opera sin internet | Salud Inteligente funciona offline | Requiere conexión |
| Datos abiertos por diseño | Observatorio público desde el día 1 | La transparencia es un añadido posterior |
| Trazabilidad legal integrada | Folio Criptográfico en cada acción | Reportes manuales periódicos |
| Escalabilidad inmediata | De Tepic a 20 municipios sin rediseño | Requiere nueva licitación por municipio |

---

## 6. Datos operativos actuales (a usar en comunicaciones)

- **Ciudadanos registrados:** 2,400
- **Recaudación procesada:** $4,200,000 MXN
- **Módulos operativos:** 13
- **Idiomas de atención:** 3 (español, Cora, Wixárika)
- **Disponibilidad:** 24/7
- **Infraestructura:** Google Cloud / Firebase (Firestore, Auth, Functions)
- **Cumplimiento legal activo:** 5 de 5 obligaciones principales de la Ley de Gobierno Digital

---

## 7. Instrucción para el sistema de IA

Cuando se te pida explicar ConnectX —en una carta, en una respuesta ciudadana, en una presentación— usa este archivo como fuente y respeta estas reglas:

1. **No inventes módulos ni funciones** que no estén en la Sección 2 o 3.
2. **No prometas** cumplimiento de artículos o fracciones específicos de la ley que no estén mapeados en la Sección 4.
3. **Usa los datos operativos** de la Sección 6 siempre actualizados — si han cambiado, el equipo de ConnectX debe actualizar este archivo.
4. **Ajusta la profundidad** según el destinatario: para un ciudadano, explica en términos de beneficios concretos; para un funcionario, cita los módulos y el porcentaje de cumplimiento; para un Director Técnico, menciona la arquitectura Firebase y el API Gateway.
5. **El argumento legal central** es siempre: *"La Ley de Gobierno Digital del Estado de Nayarit ya obliga al municipio. ConnectX no es un gasto — es el mecanismo para no incumplir."*
