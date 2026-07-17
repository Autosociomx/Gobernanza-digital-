# Arquitectura

Este documento explica las decisiones de diseño detrás de Nayarit Digital y
por qué el sistema sostiene la escala operativa de un municipio sin
infraestructura propia de servidores con estado.

## El reto real: tres poblaciones, un solo modelo de datos

Un sistema de gobierno digital municipal tiene que servir a la vez a:

1. **Ciudadanos con smartphone y cuenta** — el caso fácil.
2. **Ciudadanos sin cuenta ni smartphone** — el adulto mayor que un
   familiar o una trabajadora social registra en su nombre. Este caso es
   la mayoría real en un Centro de Salud gratuito, y la mayoría de los
   sistemas de gobierno digital lo ignoran por diseño.
3. **Personal municipal** — que necesita ver y actuar sobre datos de
   ciudadanos de los dos grupos anteriores, con límites estrictos.

La respuesta de diseño es que **la identidad no depende de una cuenta**.
El CURP es la clave del documento (`perfiles_salud/{curp}` en Firestore),
y quién puede escribir en ese documento depende del **rol de quien registra**
(`paciente`, `familiar`, `practicante`, `trabajadora_social`, `promotor`),
no de si esa persona tiene o no una cuenta de Firebase Auth. Un familiar sin
código puede registrar a alguien con fricción mínima; personal de salud
necesita un código vigente sembrado en `personal_salud` (una colección que
el cliente nunca puede leer directamente, solo usar para validar un código
dentro de otra regla).

## Seguridad declarativa, no un backend a medida

No hay un servidor de aplicación con lógica de autorización propia. Toda la
autorización vive en `firestore.rules`, evaluada por Firestore mismo en
cada lectura y escritura. Eso tiene una consecuencia de diseño importante:
**las reglas se prueban como código**, no se auditan solo por inspección.
Cada módulo nuevo (perfil de salud, portal de citas, consentimiento y
bitácora de acceso, reportes ciudadanos) se acompaña de un archivo de
pruebas contra `@firebase/rules-unit-testing` y el emulador real de
Firestore, con casos explícitos de "esto debe permitirse" y "esto debe
rechazarse" — por ejemplo: que un ciudadano no pueda crear un perfil
haciéndose pasar por personal sin un código válido, que el personal que
sube un documento no conserve acceso de lectura después (necesidad de
saber), o que solo el paciente vinculado pueda activar o desactivar su
propio consentimiento.

Esto importa para la escala: agregar un municipio nuevo, o un módulo
nuevo, no significa auditar a mano un backend cada vez más grande — significa
escribir reglas declarativas y verificarlas con el mismo arnés de pruebas.

## IA con acciones reales, sin ampliar la superficie de confianza

Aura (el asistente conversacional) puede ejecutar una acción real —hoy,
registrar un reporte ciudadano— usando function calling de Gemini. La
decisión de arquitectura deliberada es que **el servidor que habla con
Gemini no tiene credenciales de Firebase Admin**. Cuando el modelo decide
invocar una función, el servidor no escribe a la base de datos: regresa la
acción propuesta al cliente, que ya tiene una sesión de Firebase Auth
autenticada (Google o anónima) y hace la escritura real bajo las mismas
`firestore.rules` que usaría un formulario normal.

La ventaja: el punto donde vive la llave de la API de Gemini (el servidor)
nunca gana la capacidad de saltarse las reglas de seguridad. Si la escritura
del cliente falla, la confirmación optimista del modelo se descarta y se
muestra un aviso honesto — el sistema nunca le confirma al ciudadano una
acción que en realidad no se completó.

## Identidad de sesión sin fricción

Registrar una cuenta es la primera razón por la que la gente abandona un
trámite digital. La app abre una sesión anónima de Firebase Auth de forma
transparente cuando no hay una cuenta de Google — eso ya satisface
`request.auth != null` en las reglas de Firestore sin pedirle nada al
ciudadano. Completar el perfil (nombre, dirección) es opcional y puede
posponerse; vincular una cuenta de Google sigue disponible para quien
quiera conservar su información entre dispositivos.

## Voz sin costo marginal

La respuesta y captura de voz usan la Web Speech API nativa del navegador,
no un servicio de síntesis de pago por caracter. Para un piloto que puede
escalar a cientos de miles de interacciones, esa decisión evita que el
costo de operar crezca con cada conversación.

## Frontend: cargar solo lo que se usa

Vite + `React.lazy` separan cada vista pesada (panel municipal, app
ciudadana, carpeta ejecutiva) en su propio chunk, para que quien solo entra
a la landing pública no descargue el dashboard completo ni sus
dependencias (gráficas, lectura de PDF, generación de código de barras).

## Despliegue y calidad como puerta, no como buena intención

Cada Pull Request pasa por una Guardia de regresiones propia (script de
Node, no solo la suite de pruebas por defecto) que verifica invariantes
específicas del proyecto, y por un despliegue de vista previa en Netlify
que corre Lighthouse automáticamente. La meta declarada del proyecto es
97+ / 100 / 100 / 100 (rendimiento / accesibilidad / buenas prácticas /
SEO) — no aspiracional, verificado en cada cambio antes de fusionar.

## Cómo escala a otro municipio

El Artículo 91 de la LNETB obliga a que el municipio reciba la propiedad
del código fuente de las soluciones que adquiere — este proyecto está
diseñado para que esa entrega sea real, no retórica: el modelo de datos
(CURP como identidad, roles declarativos, reglas verificables) no asume
nada específico de Tepic. Adaptar el despliegue a otro municipio es
configurar un proyecto de Firebase propio y sembrar sus propios catálogos
(especialidades médicas, trámites, personal autorizado) — no reescribir el
modelo de seguridad.

## Qué no resuelve todavía (honestidad, no venta)

- No hay panel de administración para sembrar códigos de `personal_salud`
  — se hace manualmente desde la consola de Firebase.
- El catálogo de especialidades y trámites es genérico, no el catálogo
  real de un centro de salud específico — ver `docs/marco/MODULO_SALUD_CURP.md`.
- La lectura básica de un perfil de salud (`get` en `perfiles_salud/{curp}`)
  solo exige sesión iniciada y conocer el CURP exacto — una limitación
  conocida y documentada, no oculta, que refleja el mismo riesgo que ya
  existe hoy con el CURP como identificador semi-público en México.
