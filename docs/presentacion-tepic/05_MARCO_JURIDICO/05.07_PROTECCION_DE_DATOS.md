# CARPETA 09 — PROTECCIÓN DE DATOS PERSONALES

## Laboratorio Piloto Tepic

### AVISO DE PRIVACIDAD (Modelo para el Ayuntamiento de Tepic)

---

## 1. Identidad del Responsable

**Responsable del tratamiento de datos personales:**
H. Ayuntamiento de Tepic, Nayarit

**Domicilio:**
Palacio Municipal de Tepic, [dirección oficial]
CP 63000, Tepic, Nayarit

**Unidad de Transparencia:**
[Por determinar — datos de contacto de la Unidad de Transparencia municipal]

**Encargado del sistema (operador tecnológico):**
[Por determinar — puede ser la Dirección de Sistemas/Innovación municipal]

---

## 2. Datos Personales Tratados

### 2.1 Datos recabados para la Constancia de Residencia

| Dato | Categoría | Finalidad | Base jurídica |
|---|---|---|---|
| CURP | Identificación | Verificar identidad del solicitante | LNETB Art. 66; [fundamento municipal por determinar] |
| Nombre completo | Identificación | Emitir la constancia a nombre del titular | [Fundamento del trámite] |
| Domicilio (calle, colonia, CP) | Contacto/Ubicación | Acreditar residencia en el municipio | [Fundamento del trámite] |
| Número de celular | Contacto | Enviar OTP de verificación y notificaciones | Consentimiento del titular |
| Fecha de nacimiento | Identificación | Derivada de la CURP | LNETB Art. 66 |
| Sexo | Identificación | Derivado de la CURP | LNETB Art. 66 |

### 2.2 Datos que NO se recaban

- No se recaban datos biométricos (huellas, rostro, iris, voz)
- No se recaban datos de geolocalización (salvo para RutaViva, con consentimiento)
- No se recaban datos sensibles (salud, ideología, religión, origen étnico, vida sexual)
- No se recaban datos de menores de edad sin consentimiento parental verificable
- No se recaban datos patrimoniales ni financieros

### 2.3 Principio de minimización

El sistema SOLO recaba los datos estrictamente necesarios para:
1. Verificar la identidad del solicitante (CURP)
2. Acreditar el domicilio en el municipio (validación contra catastro/SIAPA)
3. Contactar al ciudadano para verificación (OTP) y notificación (celular)

---

## 3. Finalidades del Tratamiento

### 3.1 Finalidades primarias (necesarias para el trámite)

- Verificar la identidad del solicitante mediante CURP
- Validar el domicilio en el municipio de Tepic
- Generar y emitir la Constancia de Residencia
- Notificar al ciudadano sobre el estado de su trámite
- Mantener el expediente digital del trámite

### 3.2 Finalidades secundarias (requieren consentimiento)

- Mejora del servicio y estadísticas anonimizadas
- El ciudadano puede negar el consentimiento para finalidades secundarias sin que ello afecte el trámite

---

## 4. Transferencias de Datos

| Destinatario | Datos transferidos | Finalidad | ¿Requiere consentimiento? |
|---|---|---|---|
| RENAPO | CURP | Verificación de identidad | No — es una consulta requerida por ley (Art. 66 LNETB) |
| Catastro Municipal | Domicilio | Verificación de residencia | No — es un sistema del mismo sujeto obligado |
| SIAPA | Domicilio | Verificación de residencia | No — es un sistema del mismo sujeto obligado |

**No se transfieren datos a terceros no autorizados. No se comercializan datos personales.**

---

## 5. Derechos ARCO

El titular de los datos personales puede ejercer sus derechos de:

- **Acceso** — Conocer qué datos se tienen
- **Rectificación** — Corregir datos inexactos
- **Cancelación** — Solicitar la eliminación de datos (cuando proceda legalmente)
- **Oposición** — Oponerse al tratamiento para finalidades secundarias

**Procedimiento:**
Presentar solicitud ante la Unidad de Transparencia del H. Ayuntamiento de Tepic, con:
- Nombre del titular
- CURP (para acreditar identidad)
- Descripción clara del derecho que desea ejercer
- Domicilio o medio para recibir notificaciones

**Plazo de respuesta:** 20 días hábiles (prorrogables según LGPDPPSO)

---

## 6. Medidas de Seguridad

| Medida | Descripción |
|---|---|
| **Cifrado en tránsito** | TLS 1.3 para todas las comunicaciones |
| **Cifrado en reposo** | Datos sensibles cifrados a nivel de columna en base de datos |
| **CURP** | Se almacena únicamente el hash SHA256 — nunca en texto plano |
| **Control de acceso** | Autenticación multifactor + roles (RBAC) + Row-Level Security |
| **Registro de accesos** | Cada consulta, modificación o acceso queda registrado con timestamp, usuario, IP y acción |
| **Respaldo** | Backups automáticos diarios con retención de 30 días |
| **Borrado seguro** | Los datos eliminados se destruyen criptográficamente, no solo se marcan como borrados |

---

## 7. Conservación y Eliminación

| Dato | Plazo de conservación | Fundamento |
|---|---|---|
| Datos del trámite activo | Hasta la resolución + 30 días | Necesario para el trámite |
| Expediente cerrado | 5 años (archivo administrativo) | Ley de Archivos / normativa municipal |
| Datos de contacto (celular) | Hasta que el titular solicite su eliminación | Consentimiento |
| Logs de acceso y auditoría | 1 año | Seguridad y cumplimiento |

---

## 8. Aviso de Privacidad Simplificado (Corto)

> **AVISO DE PRIVACIDAD — Constancia de Residencia Digital**
>
> El H. Ayuntamiento de Tepic es responsable del tratamiento de tus datos personales.
> Los datos que nos proporcionas (CURP, domicilio y número de celular) serán utilizados exclusivamente para verificar tu identidad, acreditar tu residencia en Tepic y emitir tu constancia.
> Tu CURP se verifica contra RENAPO y NO se almacena en texto plano.
> Puedes ejercer tus derechos ARCO ante la Unidad de Transparencia del Ayuntamiento.
> [Enlace al aviso de privacidad completo]

---

## 9. Estado del Cumplimiento

| Requisito LGPDPPSO | Estado | Evidencia |
|---|---|---|
| Aviso de privacidad | 🟡 Minuta elaborada | Este documento |
| Identificación del responsable | 🟡 Identificado | H. Ayuntamiento de Tepic |
| Finalidades claras | ✅ Documentadas | Sección 3 |
| Base jurídica | 🟡 Pendiente verificación | Requiere confirmación del área jurídica municipal |
| Minimización | ✅ Demostrada | Solo 4 datos recabados |
| Medidas de seguridad | 🟡 Diseñadas, pendientes de implementar | Sección 6 |
| Derechos ARCO | ✅ Procedimiento documentado | Sección 5 |
| Transferencias | ✅ Identificadas y justificadas | Sección 4 |
| Conservación | ✅ Plazos definidos | Sección 7 |

---

*Documento elaborado como parte del Laboratorio Piloto Tepic — Nayarit Digital · ConnectX*
*Agosto 2026*

⚠️ **Este es un modelo de aviso de privacidad preparado por el proponente tecnológico. El Ayuntamiento de Tepic debe revisarlo, ajustarlo y aprobarlo formalmente antes de recabar datos personales reales.**
