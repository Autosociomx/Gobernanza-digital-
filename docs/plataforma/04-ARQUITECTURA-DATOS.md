# 04 · Arquitectura de datos

**Nayarit Digital / ConnectX / SOATM** · Documento de datos · v1.0

Dos bases de datos reales conviven hoy, deliberadamente separadas: **Firebase
Firestore** (identidad, salud, obras, foros, departamentos) y
**Supabase/Postgres** (Pulso Nayarit, aislado a propósito — sin identidad
compartida con el resto). No hay una base de datos unificada; el "catálogo"
de este documento es la unión de ambas, no un esquema físico único.

## Entidades — Firestore (`firebase-blueprint.json`)

Este archivo en la raíz del repo es el modelo de entidades declarado para
Firestore. Entidades y su colección:

| Entidad | Colección | Campos clave |
|---|---|---|
| `Department` | `departments` | `name`, `description`, `contact_email` |
| `AuditLog` | `audit_logs` | `action` (CREATE/UPDATE/DELETE), `userId`, `targetId`, `targetType`, `timestamp` |
| `User` | `users` | `role` (admin/editor/viewer/citizen), `documentId` (INE o CURP), `registrationVerified` |
| `InfrastructureAsset` | `infrastructure` | `iun` (Identificador Único Nayarit), `type` (ROAD/BRIDGE/SCHOOL/HEALTH_CENTER/WATER_INFRA/ENERGY/SECURITY), `status` (OPTIMAL/RISK/CRITICAL/UNDER_MAINTENANCE/PLANNED), `metrics.integrityScore` |
| `NeighborhoodNetwork` | `neighborhood_networks` | `colony`, `leaderId`, `memberCount` |
| `Payment` | `users/{userId}/payments` | `concept`, `amount`, `status` (pending/completed/failed) |
| `Notification` | `users/{userId}/notifications` | `title`, `message`, `isRead` |
| `ForumThread` / `ForumComment` | `forum_threads` / `forum_threads/{threadId}/comments` | `category` (PROBLEMAS_TECNICOS/CONSEJOS_OPERACION/DISCUSION_OBRAS/GENERAL) |

## Colecciones vivas en `firestore.rules` no listadas en `firebase-blueprint.json`

`firestore.rules` (378 líneas) gobierna más colecciones de las que
`firebase-blueprint.json` documenta — el blueprint quedó desactualizado
respecto a las reglas reales:

| Colección | Propósito | Módulo / componente SOATM |
|---|---|---|
| `perfiles_salud/{curp}` | Perfil de salud ligado a CURP, no a cuenta | Expediente Familiar / SOATM Identity |
| `perfiles_salud/{curp}/documentos` | Archivos clínicos (rayos X, laboratorio) | Expediente Familiar |
| `perfiles_salud/{curp}/consultas` | Historial de triaje/consulta | TEPICTU (dentro de Expediente Familiar) |
| `perfiles_salud/{curp}/accesos` | Bitácora inmutable de quién consultó el expediente | Expediente Familiar / SOATM Security |
| `citas_salud/{citaId}` | Cola de citas del hospital central | Expediente Familiar |
| `personal_salud/{codigo}` | Códigos vigentes de personal de salud (practicante/trabajadora social/promotor) | Expediente Familiar / SOATM Security |
| `tramites/{tramiteId}` | Trámites ciudadanos | SOATM Citizen |
| `expediente_unico/{userId}` | Expediente único ciudadano | SOATM Citizen |
| `puntos/{userId}`, `canjes/{userId}/lista/{canjeId}` | Programa de puntos/recompensas | SOATM Citizen |
| `auditorias_ciudadanas/{auditId}` | Auditorías ciudadanas (mystery shopper) | SOATM Citizen |

Recomendación de seguimiento (no ejecutada en esta entrega, es cambio de
código): sincronizar `firebase-blueprint.json` para que incluya estas
colecciones, o declarar explícitamente que el blueprint es solo el
subconjunto original y las reglas son la fuente de verdad completa.

## Identidad y consentimiento (SOATM Identity)

El diseño real, verificable en `firestore.rules` y en
`docs/marco/MODULO_SALUD_CURP.md`:

- `consentimientoActivo` (booleano, default `true`): el único campo del
  perfil de salud que **solo el paciente vinculado o un admin** pueden
  modificar — ni el familiar ni el practicante que registró el perfil.
- Escribir en `accesos` es obligatorio para el personal con cuenta al
  consultar un perfil: `autorizado: true/false` + `motivo` si fue acceso de
  emergencia sin consentimiento.
- Principio de necesidad de saber aplicado dos veces: quien sube un
  documento no conserva lectura después; quien registra un acceso tampoco
  puede releer esa entrada — solo el paciente vinculado o un admin.

**Limitación conocida y declarada** (no oculta, ya documentada en
`MODULO_SALUD_CURP.md`): la lectura básica de `perfiles_salud/{curp}` (`get`)
solo exige sesión iniciada + conocer el CURP exacto — no hay forma de
condicionar esa lectura a un código de personal efímero sin claims
personalizados, fuera de alcance de esta v1.

## Eventos y auditoría

- `audit_logs` (Firestore): registro de acciones CREATE/UPDATE/DELETE sobre
  `departments` — trazabilidad para fiscalización (ver
  `MARCO_CUMPLIMIENTO_LNETB.md` #6).
- `perfiles_salud/{curp}/accesos` (Firestore): bitácora inmutable de acceso a
  expedientes de salud — ver arriba.
- `pulso_ledger` (Supabase/Postgres): el evento de auditoría más riguroso del
  ecosistema, ver siguiente sección.
- **No existe** un bus de eventos formal entre estas tres fuentes — cada una
  vive en su propio módulo, sin un canal común (ver "SOATM Data Bus: Hoja de
  ruta" en `02-ARQUITECTURA-SISTEMA.md`).

## Pulso Nayarit — el backend más maduro (Supabase/Postgres)

Documentado en detalle en `pulso-nayarit/ledger/SCHEMA.md`; resumen de las
garantías reales, verificables en `pulso-nayarit/supabase/migrations/`:

- `pulso_polls` / `pulso_votes` / `pulso_ledger`, todas con prefijo `pulso_`
  para aislarse del resto del proyecto.
- **Unicidad estructural**: la clave primaria `(poll_id, device_hash)` en
  `pulso_votes` impide un segundo voto del mismo dispositivo a nivel de base
  de datos, no de lógica de aplicación.
- **Append-only real**: triggers `pulso_*_immutable` rechazan `UPDATE`/
  `DELETE` sobre `votes` y `ledger` para **todos** los roles, incluido
  `service_role`.
- **Ledger encadenado verificable**: cada fila incluye `prev_hash` y
  `vote_hash = sha256(poll_id | choice | cp | ts_bucket_utc | prev_hash)` —
  cualquiera puede recomputar la cadena y detectar alteración.
- **Privacidad por diseño**: el preimage del hash no incluye `device_hash`;
  `pulso_heatmap` aplica k-anonimato (k=5): un código postal con menos de 5
  votos no se publica.
- **Límite conocido, declarado por el propio esquema**: la huella de
  dispositivo es SHA-256 de un valor en `localStorage` — suficiente para
  prototipo, trivial de evadir borrando almacenamiento local. El roadmap
  documentado añade OTP por SMS sin cambiar el esquema.

## Qué no existe todavía

- Un modelo de datos unificado entre Firestore y Supabase (son y seguirán
  siendo, por diseño de privacidad, bases separadas).
- El archivo de pruebas de reglas de Firestore que `MODULO_SALUD_CURP.md`
  da por hecho (ver `02-ARQUITECTURA-SISTEMA.md`, sección SOATM Security).
- Cualquier esquema de datos para Tesorería u Obras más allá de lo declarado
  como pendiente en sus respectivos módulos (`TESORERIA.md`, `OBRAS.md`).
