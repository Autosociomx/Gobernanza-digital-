# MANUAL DE INSTRUCCIONES DIGITAL & MARCO DE CUMPLIMIENTO LEGAL
## Plataforma de Gobernanza Digital ConnectX y G-Agente CX

---

## INTRODUCCIÓN

Este documento constituye el **Manual de Instrucciones Digital** para el uso, administración y auditoría de la plataforma ConnectX y el asistente G-Agente CX en el contexto de la administración pública mexicana. Asimismo, establece los **Protocolos de Aseguramiento de Cumplimiento Legal (PACL)** que los ingenieros, desarrolladores y administradores de sistemas deben seguir rigurosamente para garantizar que la base de código cumpla de forma continua con el marco jurídico vigente de los Estados Unidos Mexicanos.

---

## SECCIÓN 1: Manual de Operación Digital para el Servidor Público

El sistema operativo ConnectX está diseñado para capacitar y dar trazabilidad a las labores diarias de los funcionarios de las dependencias públicas.

### 1.1 Acceso e Identificación Digital Institucional (Autenticación e.firma)
1. **Paso 1:** Ingrese a la URL del portal ConnectX desde la red segura gubernamental (intranet o VPN cifrada).
2. **Paso 2:** En la pantalla de inicio de sesión, seleccione **"Autenticación de Seguridad Google AI / e.firma"**.
3. **Paso 3:** Cargue sus archivos de certificado digital de firma electrónica activa emitidos por el SAT (`.cer` y `.key`) e introduzca su contraseña de clave privada.
   - *Alternativa de Pensamiento:* **¿Es mejor otra alternativa para la autenticación diaria?** Pensando críticamente, la validación directa con la e.firma del SAT para cada login del día puede resultar lenta y generar latencia debido a los tiempos de respuesta del validador del SAT. Sería mejor implementar un sistema de **Single Sign-On (SSO) Federado** nacional utilizando tokens de sesión firmados (JWT) válidos por 8-12 horas, respaldados por autenticación biométrica (facial/dactilar) en dispositivos móviles del gobierno, requiriendo la e.firma únicamente para trámites transaccionales y autorizaciones de gasto de capital de alto impacto.

### 1.2 Interacción con el G-Agente CX (Exoesqueleto Cognitivo)
El chatbot G-Agente CX actúa como su copiloto jurídico y operativo.
1. **Para Consultas Jurídicas o Presupuestales:**
   - Abra el chat flotante en la esquina inferior derecha.
   - Ingrese una consulta en lenguaje natural: *"¿Qué requisitos exige la Ley de Adquisiciones federal para una licitación simplificada en infraestructura de salud?"*
   - El sistema le devolverá el artículo exacto, la recomendación de cumplimiento y un machote/plantilla de contrato pre-validado por la Consejería Jurídica.
2. **Para Auditoría Forense y Alertas:**
   - El G-Agente CX le notificará proactivamente si detecta anomalías estadísticas en las propuestas económicas de los licitantes.
   - *Alternativa de Pensamiento:* **¿Es mejor que la IA recomiende de forma autónoma?** No. Para evitar "alucinaciones" de los modelos masivos de lenguaje (LLMs) que podrían provocar responsabilidades administrativas para el funcionario, la mejor alternativa es implementar una arquitectura de **RAG (Retrieval-Augmented Generation)** con un control rígido de "Source-Grounding" (Anclaje a Fuentes Oficiales), donde la IA tenga prohibido inferir o crear leyes. Además, se debe mantener siempre el principio de **"Human-in-the-Loop" (El Humano en el Ciclo de Decisión)**: la IA solo propone y audita; la firma electrónica del funcionario humano es la única que tiene valor legal final.

---

## SECCIÓN 2: Manual Técnico para Desarrolladores y Administradores de ConnectX

Para expandir la base de código de ConnectX de manera segura y escalable, los equipos de desarrollo deben apegarse a los siguientes estándares.

### 2.1 Conexión al Registro Maestro de Infraestructura
- El catálogo de activos nacionales debe ser consultado y actualizado de forma asíncrona a través de la capa de servicios en `src/services/infrastructureService.ts`.
- **Estructura del IUN (Identificador Único Nacional):**
  Cada activo físico escolar, de salud o de comunicaciones debe registrarse bajo la nomenclatura:
  `NAY-SEC-YYYY-NNN` (Ej: `NAY-HEALTH-2026-042`).
- *Alternativa de Pensamiento:* **¿Es mejor almacenar los assets en Firestore/Firebase como en la versión actual?** Aunque Firebase es excelente para prototipado rápido y sincronización en tiempo real de paneles de control simples, es **mejor buscar otra alternativa** para el almacenamiento nacional de alta fidelidad. Un sistema de archivos georreferenciados gubernamental de escala federal requiere bases de datos relacionales robustas que soporten búsquedas georreferenciadas complejas en tiempo récord. Lo óptimo es migrar a **PostgreSQL con la extensión PostGIS** operando en clústeres redundantes dentro del territorio mexicano.

---

## SECCIÓN 3: Aseguramiento de Cumplimiento Legal Continuo (Compliance Codebase)

Asegurarse de que el software gubernamental cumple con la ley no es una tarea de auditoría manual de fin de año; debe estar integrado directamente en la tubería de desarrollo y despliegue continuo (CI/CD).

```
                      [ PIPELINE DE CI/CD CON CUMPLIMIENTO LEGAL ]
                                           │
                                           ▼
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ Fase 1: Pruebas de Software tradicionales (Unit Tests, TypeScript Type-Checking)       │
└──────────────────────────────────────────┬────────────────────────────────────────────┘
                                           │
                                           ▼
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ Fase 2: Análisis Estático de Cumplimiento de Datos Personales (LGPDPPSO - LSSI)      │
│ - Escaneo automático para evitar la presencia de CURPs, RFCs o nombres en logs puros. │
└──────────────────────────────────────────┬────────────────────────────────────────────┘
                                           │
                                           ▼
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ Fase 3: Pruebas de Despliegue Soberano (Sovereign Cloud Check)                         │
│ - Validación de que la IP del servidor de producción está ubicada físicamente en MX. │
└──────────────────────────────────────────┬────────────────────────────────────────────┘
                                           │
                                           ▼
                                 [ DEPLOY DE PRODUCCIÓN ]
```

### 3.1 Las 3 Leyes Críticas a Cumplir en la Base de Código

1. **Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados (LGPDPPSO):**
   - **Regla de Código:** Está estrictamente prohibido persistir datos sensibles (nombres, historiales clínicos, CURPs, números telefónicos) en texto plano dentro de Firestore, bases de datos SQL o archivos de registro (logs).
   - **Protocolo de Aseguramiento:**
     - Utilizar el cifrado a nivel de columna (Column-Level Encryption) con algoritmos AES-256.
     - Implementar políticas automáticas de **anonimización de datos** mediante el servicio de Cloud Data Loss Prevention (DLP) de Google Cloud antes de transferir datos a los almacenes de analítica (BigQuery).

2. **Ley General de Transparencia y Acceso a la Información Pública (LGTAIP):**
   - **Regla de Código:** Toda asignación de contratos, presupuestos y auditorías de obra física debe ser exportable en formatos abiertos y accesibles (JSON, CSV, PDF inmutable) mediante el módulo de transparencia activa de `CitizenOS` y el sistema de generación de PDF en `ExecutivePresentation`.
   - **Protocolo de Aseguramiento:** Integrar firmas criptográficas (SHA-256 Hash) para cada documento PDF ejecutivo generado, de manera que la ciudadanía pueda validar la autenticidad del reporte oficial de forma directa y descentralizada.

3. **Ley Federal de Presupuesto y Responsabilidad Hacendaria (LFPRH):**
   - **Regla de Código:** Los sistemas de pago del estado y fideicomisos digitales deben validar algorítmicamente la disponibilidad de suficiencia presupuestal emitida por la Secretaría de Hacienda antes de autorizar cualquier pre-compromiso económico.
   - **Protocolo de Aseguramiento:** Codificar oráculos presupuestales en `aiRiskService` que bloqueen las operaciones transaccionales si el saldo de la cuenta liquidadora es menor al monto de adjudicación proyectado.

---

## SECCIÓN 4: Protocolos Operativos para Asegurar el Cumplimiento Legal de la Base de Código

Para garantizar que el software nunca viole la legislación del país a medida que el sistema escala o recibe actualizaciones diarias de múltiples desarrolladores, se deben implementar los siguientes cuatro mecanismos técnicos:

### A. Pruebas de Cumplimiento Automatizadas en CI/CD (Legal Linting)
Así como se corre `tsc --noEmit` o `npm run lint` para validar la sintaxis, se deben programar **scripts de análisis estático de código** (utilizando herramientas como SonarQube, Semgrep o reglas personalizadas de ESLint) que busquen patrones que violen la privacidad.
* *Ejemplo:* Si un desarrollador escribe `console.log(patient.curp)`, la prueba en GitHub Actions o GitLab CI debe fallar automáticamente y detener la fusión del código a la rama de producción (`main`).

### B. Auditoría Inmutable de Cambios de Código (Git & Commits Firmados)
Toda modificación a las reglas de negocio, lógica financiera u orquestación de IA dentro de ConnectX debe realizarse mediante commits firmados criptográficamente con llaves GPG de los ingenieros autorizados por el gobierno. Esto previene que código malicioso o "puertas traseras" sean inyectados sin trazabilidad y atribución legal directa.

### C. Almacenamiento Estricto de Datos dentro de la Jurisdicción Nacional
Para dar cumplimiento a los mandatos de soberanía de la información nacional, se debe configurar una restricción de política organizativa (Organization Policy) en la consola de la nube que **bloquee la creación de recursos de bases de datos o cómputo fuera de la región geográfica de México (Querétaro)**.

### D. Certificaciones de Seguridad y Pruebas de Penetración de Grado Militar (Pentesting)
Contratar anualmente servicios de auditoría externa y hacking ético con laboratorios certificados por la Guardia Nacional o el Centro Nacional de Inteligencia (CNI), garantizando que la infraestructura crítica no sea vulnerable a exploits de inyección de código SQL, ataques de denegación de servicio (DDoS) o robo de credenciales.

---

## CONCLUSIÓN

El manual digital y la propuesta de infraestructura de ConnectX representan el modelo ideal de gobernanza sistémica para México. Sin embargo, el éxito del despliegue masivo radica en mantener un **pensamiento crítico proactivo sobre las tecnologías que implementamos**, siempre buscando la alternativa más robusta, resiliente y compatible con el marco legal soberano del país.
