# CARPETA 10 — INTEROPERABILIDAD

## Diseño de Conectores — Constancia de Residencia Tepic

---

## 1. Principio Rector

> **"No conectar porque podemos. Conectar porque existe fundamento, autorización, fuente oficial y necesidad."**

El prototipo actual NO tiene conexiones reales a fuentes oficiales. Esta carpeta documenta la **arquitectura de interoperabilidad que se activará cuando el Ayuntamiento autorice y gestione los convenios correspondientes.**

---

## 2. Matriz de Conexiones Diseñadas

### 2.1 Identidad — Consulta CURP a RENAPO

| Atributo | Valor |
|---|---|
| **Sistema origen** | RENAPO (Registro Nacional de Población) |
| **Dato consultado** | CURP + datos de identidad asociados |
| **Fundamento** | LNETB Art. 66; Art. 3 fracc. ? (CURP como elemento central del modelo) |
| **Responsable de la autorización** | SEGOB / RENAPO — vía convenio con el Ayuntamiento |
| **Método de conexión** | Servicio web (API REST SOAP definida por RENAPO) |
| **Autenticación** | Certificado digital del Ayuntamiento |
| **Estado actual** | 🔴 No conectado — diseñado, pendiente de convenio |
| **Simulación en laboratorio** | Validación sintáctica (algoritmo RENAPO sin consulta real) |

**Cuando se active:**
- El ciudadano ingresa CURP → el sistema consulta RENAPO → obtiene nombre, fecha de nacimiento, sexo
- NO se almacena la CURP en texto plano (solo hash SHA256)
- La consulta queda registrada en el expediente (evento de auditoría)

### 2.2 Domicilio — Consulta a Catastro Municipal

| Atributo | Valor |
|---|---|
| **Sistema origen** | Catastro Municipal de Tepic |
| **Dato consultado** | Domicilio registrado + estatus de la cuenta catastral |
| **Fundamento** | Facultades municipales de verificación de residencia |
| **Responsable de la autorización** | Dirección de Catastro Municipal |
| **Método de conexión** | API REST o consulta directa a base de datos (según infraestructura municipal) |
| **Autenticación** | API key o token JWT del sistema municipal |
| **Estado actual** | 🔴 No conectado — diseñado, pendiente de autorización |
| **Simulación en laboratorio** | Validación de CP en rango Tepic (63000–63519) + captura manual |

### 2.3 Domicilio — Consulta a SIAPA

| Atributo | Valor |
|---|---|
| **Sistema origen** | SIAPA Tepic (Sistema de Agua Potable y Alcantarillado) |
| **Dato consultado** | Domicilio asociado a cuenta de agua |
| **Fundamento** | Complementa verificación de residencia |
| **Responsable de la autorización** | SIAPA — vía convenio con el Ayuntamiento |
| **Método de conexión** | API REST o consulta a base de datos |
| **Estado actual** | 🔴 No conectado — diseñado, pendiente de autorización |

### 2.4 Firma Electrónica — e.firma (SAT)

| Atributo | Valor |
|---|---|
| **Sistema origen** | SAT (Servicio de Administración Tributaria) |
| **Uso** | Firma de resoluciones por funcionario autorizado |
| **Fundamento** | LNETB Art. 67; Ley de Firma Electrónica Avanzada |
| **Responsable de la autorización** | SAT — vía convenio con el Ayuntamiento |
| **Estado actual** | 🔴 No conectado — diseñado, pendiente de autorización |
| **Simulación en laboratorio** | OTP + hash SHA256 + timestamp (demostración de concepto) |

**Nota importante:** El OTP utilizado en el laboratorio demuestra el concepto de "consentimiento verificable del ciudadano" pero NO constituye una firma electrónica avanzada con validez jurídica plena. Es un mecanismo de demostración mientras se obtiene la conexión oficial.

---

## 3. Protocolo de Integración (Estándar para todas las conexiones)

Cada conexión a fuente oficial seguirá este protocolo:

```
PASO 1 — CONVENIO/AUTORIZACIÓN
  ↓
  • Firma de convenio de interoperabilidad
  • Designación de responsables técnicos
  • Acuerdo de niveles de servicio (SLA)

PASO 2 — SEGURIDAD
  ↓
  • Autenticación mutua (mTLS o API keys)
  • Cifrado de datos en tránsito (TLS 1.3)
  • Registro de cada consulta en bitácora inmutable
  • Rate limiting por fuente

PASO 3 — API/SERVICIO
  ↓
  • Endpoint documentado (OpenAPI/Swagger)
  • Timeout configurado (máx. 5 segundos)
  • Manejo de errores y reintentos
  • Circuit breaker para evitar cascadas de fallos

PASO 4 — TRAZABILIDAD
  ↓
  • Cada consulta genera un evento en `eventos_expediente`
  • Se registra: timestamp, fuente, dato consultado, resultado, usuario
  • Los eventos son inmutables (append-only)

PASO 5 — PRUEBAS
  ↓
  • Pruebas en ambiente de desarrollo (sandbox)
  • Pruebas de carga y estrés
  • Pruebas de seguridad (pentest del conector)
  • Validación del Ayuntamiento
```

---

## 4. Fuente Única de Verdad

| Dato | Fuente primaria | Fuente secundaria (respaldo) |
|---|---|---|
| Identidad | RENAPO (CURP) | INE (cuando RENAPO no esté disponible) |
| Domicilio | Catastro Municipal | SIAPA / CFE (verificación cruzada) |
| Nombre | RENAPO (derivado de CURP) | Captura del ciudadano (solo si RENAPO no disponible) |

---

## 5. Estrategia Offline / Degradación

Si una fuente oficial no está disponible:

1. **Identidad:** El sistema puede operar con validación sintáctica de CURP + notificar al funcionario para verificación manual
2. **Domicilio:** El ciudadano proporciona el dato; el sistema lo marca como "pendiente de verificación" y programa reintento cuando la fuente esté disponible
3. **Firma:** Si el servicio de firma no está disponible, el trámite se pone en cola — no se rechaza

---

*Documento elaborado como parte del Laboratorio Piloto Tepic — Nayarit Digital · ConnectX*
*Agosto 2026*
