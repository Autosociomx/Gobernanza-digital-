# LIMITACIONES CONOCIDAS DEL PROTOTIPO

> **Regla:** Este documento enumera honestamente lo que el sistema NO tiene, NO hace o NO puede hacer. Es el complemento necesario de cualquier afirmación técnica. Debe leerse junto con `04_SOLUCION_DIGITAL/`.

---

## Lo que el prototipo NO es

| Afirmación falsa (no decir) | Realidad |
|---|---|
| "Sistema de gobierno digital certificado" | Es un prototipo de laboratorio sin autorización institucional |
| "Conectado a RENAPO" | Cero conexiones a fuentes gubernamentales. Solo validación sintáctica de CURP |
| "Firma electrónica avanzada" | OTP demostrativo. No cumple requisitos LFEA (PKI, certificados, HSM) |
| "Interoperable con catastro/SIAPA" | Arquitectura diseñada. Cero endpoints implementados |
| "WCAG 2.1 AA verificado" | Nunca se realizó auditoría de accesibilidad. Solo atributos aria mínimos |
| "Cumple LNETB" | Alineado con LNETB. Cumplimiento solo puede declararlo la autoridad |
| "Sello criptográfico" | `AuraCertificationSeal.tsx` es un componente decorativo (gradiente CSS + estrellas) |
| "100% seguro" | Seguridad documentada, no auditada externamente |

---

## Limitaciones técnicas

| Componente | Limitación |
|---|---|
| **CURP** | Validación solo sintáctica (longitud, dígito verificador RENAPO). No consulta la base RENAPO |
| **Firma** | OTP de 6 dígitos + hash SHA-256. NO constituye firma electrónica avanzada conforme a LFEA |
| **Identidad** | Sin verificación biométrica. Sin conexión a INE o RENAPO |
| **Domicilio** | Captura manual. Sin validación catastral o contra SIAPA |
| **Pagos** | Stripe en modo sandbox/test. Nunca procesó un pago real |
| **Expediente** | Firestore configurado. Esquema de expediente diseñado. No implementado en producción |
| **QR de verificación** | QR estático en prototipo. Sin endpoint público de verificación |
| **Notificaciones** | Simuladas. Sin integración SMS/email/whatsapp |
| **Accesibilidad** | Atributos aria básicos. Sin auditoría WCAG. Sin contraste verificado. Sin navegación por teclado completa |
| **Lenguas originarias** | `useAuraVoice.ts` documenta explícitamente: "cora y wixárika no tienen voz nativa". Sin traducción de interfaz |
| **Pruebas** | Sin tests unitarios. Sin tests de integración. Sin pentest |
| **Escalabilidad** | Sin pruebas de carga. Sin límites de concurrencia probados |
| **Monitoreo** | Sin dashboard de operaciones. Sin alertas |
| **Backup** | Sin política de respaldos. Firestore sin exportación automática |

---

## Limitaciones institucionales

| Componente | Limitación |
|---|---|
| **Autorización** | Sin Acuerdo de Ayuntamiento. Sin designación de enlace |
| **Firmante** | Sin designación de funcionario autorizado para firma |
| **Convenios** | Sin convenio RENAPO. Sin convenio SAT (e.firma). Sin convenio SIAPA |
| **AIR** | Sin determinación de si requiere AIR o exención |
| **Aviso de privacidad** | Minuta preparada. No publicado por la Unidad de Transparencia |
| **Datos reales** | Sin acceso a datos de ciudadanos reales. Sin integración a sistemas municipales |
| **Capacitación** | Sin plan ejecutado con funcionarios |
| **Soporte** | Sin mesa de ayuda. Sin procedimiento de escalamiento |

---

## Limitaciones jurídicas

| Componente | Limitación |
|---|---|
| **Bando de Policía** | Texto no localizado. Sin verificar si regula la constancia |
| **Reglamento Interior** | Texto no localizado. Sin verificar la dependencia responsable |
| **Ley de Ingresos** | Texto no verificado para costo del trámite |
| **LNETB completo** | 5 artículos con texto exacto por verificar (3, 19, 34, 35, 36) |
| **Lineamientos Modelo Nacional** | Sin verificación artículo por artículo |

---

## Lo que SÍ podemos afirmar honestamente

- ✅ Existe un prototipo funcional de demostración del flujo digital
- ✅ La validación sintáctica de CURP está implementada
- ✅ El flujo OTP + hash demuestra el concepto técnico de firma
- ✅ La arquitectura de conectores está diseñada y documentada
- ✅ El código es verificable directamente en GitHub
- ✅ La documentación jurídica identifica 19 obligaciones normativas
- ✅ Las limitaciones aquí listadas son completas y honestas
- ✅ La contra-auditoría corrigió 25 afirmaciones inexactas de documentación anterior

---

*Documento elaborado como parte del expediente de presentación institucional — Agosto 2026*
