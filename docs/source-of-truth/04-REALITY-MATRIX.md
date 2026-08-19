# Matriz de Realidad — Gobernanza Digital

**Versión:** 0.1  
**Fecha de corte:** 2026-08-19  
**Objetivo:** separar concepto, documentación, código, integración y producción.

## 1. Reglas

### Madurez

- `CONCEPTO`
- `ESPECIFICACIÓN`
- `PROTOTIPO`
- `IMPLEMENTADO`
- `INTEGRADO`
- `PRODUCCIÓN`
- `DEPRECADO`
- `DESCARTADO`

### Tipo de evidencia

- `CODE`
- `DEPLOYMENT`
- `DOC`
- `DECISION`
- `RESEARCH`
- `CHAT`
- `INFERENCE`

### Confianza

- `CONFIRMADO`
- `ALTA_CONFIANZA`
- `PROBABLE`
- `NO_VERIFICADO`
- `CONTRADICTORIO`

## 2. Matriz inicial

| Capacidad | Madurez | Evidencia | Confianza | Qué sí podemos afirmar | Qué NO debemos afirmar todavía | Próxima prueba |
|---|---|---|---|---|---|---|
| ORBE ciudadano | PROTOTIPO / IMPLEMENTADO parcial | CODE, PR #44 | ALTA_CONFIANZA | existe interfaz/intents y trabajo de catálogo ciudadano | asistente de voz gubernamental plenamente integrado y productivo | verificar `main`, integración con CitizenApp, voz y flujo completo |
| Intents ciudadanos | IMPLEMENTADO | CODE, PR #44 | ALTA_CONFIANZA | existen intents estructurados para casos municipales | cobertura completa de servicios municipales | inventario de intents y tests de resolución |
| Catálogo municipal | IMPLEMENTADO | CODE, PR #44 | ALTA_CONFIANZA | existe conocimiento estructurado con estados de evidencia | catálogo oficial exhaustivo | reconciliar contra fuentes municipales oficiales |
| Human handoff | ESPECIFICACIÓN / parcial | DOC, CODE parcial | PROBABLE | existe como principio y flujo esperado | operación institucional con SLA real | demostrar handoff a canal humano real |
| Context.OS | ESPECIFICACIÓN / IMPLEMENTACIÓN parcial | DOC, CODE parcial | PROBABLE | existe como arquitectura/plano contextual en evolución | runtime completo, estable y productivo | localizar módulos actuales y ejecutar casos sin LLM específico |
| Policy Engine | ESPECIFICACIÓN | DECISION, DOC | ALTA_CONFIANZA | está definido como requisito arquitectónico | autorización determinista completa | implementar primer `ALLOW/DENY/REQUIRE_*` versionado |
| Consent Engine | ESPECIFICACIÓN / parcial | DOC, CODE parcial | PROBABLE | consentimiento es requisito constitucional | gestión completa revocable y auditable | consentimiento persistente con propósito/TTL/revocación |
| Evidence/Audit | ESPECIFICACIÓN / parcial | DOC, CODE parcial | PROBABLE | trazabilidad/evidencia están definidas | evidencia criptográficamente verificable end-to-end | emitir evidence record en primer flujo real |
| ID.mx | CONCEPTO / ESPECIFICACIÓN | DOC, DECISION | ALTA_CONFIANZA | capa propuesta de expediente/contexto autorizado | identidad oficial o expediente productivo interoperable | definir esquema mínimo y data ownership |
| Llave MX | NO INTEGRADO | auditoría previa | ALTA_CONFIANZA | no existe integración oficial confirmada | login/identidad oficial funcionando | implementar OIDC/integración cuando exista acceso institucional |
| SOATM | ESPECIFICACIÓN / implementación parcial | DOC, CODE parcial | ALTA_CONFIANZA | existe como concepto operativo/interoperable | bus municipal productivo completo | identificar Service Catalog, adapters y contratos reales |
| Service Catalog | PROTOTIPO / IMPLEMENTADO parcial | CODE, DOC | PROBABLE | existe catálogo/intents que puede evolucionar a registro canónico | registry institucional completo | normalizar `Service` schema/versiones |
| Government Service Graph | CONCEPTO / ESPECIFICACIÓN | DOC, DECISION | PROBABLE | está definido como componente objetivo | grafo ejecutable en producción | modelo mínimo de nodos/edges y resolver un caso |
| Institutional Connectors | PROTOTIPO / parcial | CODE | PROBABLE | existen integraciones y mocks en el repositorio | conectores certificados a sistemas gubernamentales reales | inventario y clasificación mock/sandbox/real |
| Tesorería | PROTOTIPO | CODE, DOC | ALTA_CONFIANZA | existe experiencia/dominio de tesorería | conexión productiva a recaudación municipal | demostrar lectura/escritura real con sandbox institucional |
| Pagos | PROTOTIPO / SANDBOX | CODE, auditoría previa | ALTA_CONFIANZA | existen flujos de pago de demostración | cobro municipal productivo | separar provider sandbox y gateway institucional |
| Catastro | PROTOTIPO / dominio | CODE, DOC | PROBABLE | existen casos/experiencia de catastro | interoperabilidad con padrón catastral real | primer connector read-only |
| Registro Civil | PROTOTIPO / dominio | CODE, DOC | PROBABLE | existe orientación/intents del dominio | emisión oficial de actas | enlace/verificación con fuente oficial |
| Servicios Públicos | PROTOTIPO / dominio | CODE, DOC | PROBABLE | existen casos como baches/luminarias | creación real de órdenes municipales | ticket institucional end-to-end |
| Salud | PROTOTIPO / dominio | CODE, DOC | PROBABLE | existe orientación/funcionalidad de demostración | diagnóstico médico o expediente clínico interoperable productivo | delimitar alcance clínico y compliance |
| Backend | IMPLEMENTADO parcial | CODE, auditoría previa | ALTA_CONFIANZA | hay servicios backend | plataforma gubernamental completa y robusta | inventario de endpoints, auth, persistence, contract tests |
| Persistencia | IMPLEMENTADO parcial | CODE | PROBABLE | hay mecanismos de persistencia en partes del sistema | repositorio ciudadano/institucional unificado de producción | mapa de databases/collections y ownership |
| Firebase/Firestore | IMPLEMENTADO / CONFIGURADO parcial | CODE | ALTA_CONFIANZA | hay configuración y reglas en repo | arquitectura soberana definitiva | aislar data layer y documentar estrategia de sustitución |
| Gemini | IMPLEMENTADO como proveedor parcial | CODE | ALTA_CONFIANZA | existen llamadas/configuración a Gemini | dependencia necesaria del sistema | crear interfaz AIProvider y fallback |
| OpenAI/otros modelos | CONCEPTO / posible proveedor | DOC/DECISION | PROBABLE | arquitectura debe admitir proveedores alternativos | integración actual confirmada | adapter de segundo proveedor o modelo local |
| Tests unitarios | DEUDA / NO VERIFICADO ACTUAL | auditoría previa | PROBABLE | auditoría anterior detectó carencia | cero tests hoy sin revalidar | contar suite actual y cobertura |
| Contract tests | NO CONFIRMADO | INFERENCE | PROBABLE | son necesarios | que ya existan | implementar primer contract test de Service/Policy |
| Observabilidad | PARCIAL / NO VERIFICADO | CODE, DOC | PROBABLE | existen piezas de logging/configuración | tracing end-to-end productivo | correlation ID + structured logs en un flujo |
| Producción gubernamental | NO CONFIRMADO | ninguna evidencia suficiente | ALTA_CONFIANZA | existe demo/despliegue tecnológico | operación institucional oficial | piloto formal con dependencia y métricas |
| Nayarit Digital | IMPLEMENTACIÓN TERRITORIAL EN DESARROLLO | CODE, DOC, DECISION | ALTA_CONFIANZA | es instancia territorial del ecosistema | plataforma estatal oficial desplegada | definir piloto, alcance y autoridad institucional |

## 3. Claims externos permitidos hoy

Con la evidencia actual, son razonables formulaciones como:

- “Tenemos un prototipo funcional y una arquitectura en evolución para interacción ciudadana e interoperabilidad.”
- “ORBE ya cuenta con intents y catálogo estructurado para varios casos municipales.”
- “Estamos separando experiencia, políticas, identidad, interoperabilidad y sistemas institucionales para evitar dependencia de un proveedor.”
- “El proyecto está diseñado para integrarse con infraestructura existente, no para reemplazarla indiscriminadamente.”

## 4. Claims bloqueados hasta nueva evidencia

No afirmar todavía, salvo evidencia posterior explícita:

- “Estamos integrados con Llave MX.”
- “Tenemos pagos municipales reales en producción.”
- “Context.OS ya es un control plane productivo completo.”
- “SOATM ya conecta todos los sistemas municipales.”
- “ID.mx es un expediente único oficial.”
- “Cumplimos totalmente la normativa aplicable.”
- “La plataforma está lista para millones de usuarios.”
- “Operamos oficialmente para un gobierno.”

## 5. Criterio de ascenso de madurez

### CONCEPTO -> ESPECIFICACIÓN
Responsabilidad, contratos, límites, riesgos y criterios de aceptación documentados.

### ESPECIFICACIÓN -> PROTOTIPO
Existe comportamiento demostrable, aunque use mocks/sandbox.

### PROTOTIPO -> IMPLEMENTADO
Código reproducible, persistencia/configuración definida y pruebas mínimas.

### IMPLEMENTADO -> INTEGRADO
Dependencia real conectada mediante contrato y autenticación válida.

### INTEGRADO -> PRODUCCIÓN
Despliegue operado, monitoreado, con seguridad, observabilidad, recuperación, evidencia y responsable institucional.

## 6. Backlog de verificación inmediato

1. Recontar tests en `main` actual.
2. Inventariar endpoints backend reales.
3. Clasificar todas las integraciones como mock, sandbox, demo o real.
4. Verificar estado de voz ORBE en `main`.
5. Mapear persistencia y datos personales.
6. Localizar toda implementación vinculada a Context.OS/SOATM/ID.mx.
7. Identificar dependencias directas de Gemini/Firebase/Stripe.
8. Revisar CI/CD y evidencia de builds verdes.
9. Definir el primer flujo end-to-end institucional.
10. Actualizar esta matriz sólo con evidencia nueva.
