# Open Ledger — Modelo de Datos

Especificación de las colecciones de Firestore del módulo Pulso Nayarit. Estado: **especificado, no implementado** (ver [README → Estado del Proyecto](../README.md#-estado-del-proyecto)).

Todas las colecciones viven bajo el prefijo `pulso/` para aislarlas del resto del monorepo Gobernanza Digital.

---

## `pulso/polls/{pollId}`

Define cada consulta (la *pregunta*). Separar la pregunta de los votos permite reutilizar la infraestructura para cualquier ejercicio de opinión.

| Campo | Tipo | Descripción |
|---|---|---|
| `title` | string | P. ej. "Preferencia a Gubernatura 2027" |
| `options` | array<string> | Opciones neutras ("Candidato / Perfil A", …) |
| `region` | string | Ámbito geográfico (`NAY`, `NAY-TEPIC`, …) |
| `opensAt` / `closesAt` | timestamp | Ventana de participación |
| `status` | string | `draft` \| `open` \| `closed` |

## `pulso/votes/{deviceHash}`

Un documento por dispositivo verificado. **El ID del documento es el hash SHA-256 de la huella del dispositivo** — la unicidad la impone la base de datos, no la aplicación. Reglas: `create`-only, lectura pública, sin `update`/`delete` para nadie.

| Campo | Tipo | Descripción |
|---|---|---|
| `pollId` | string | Referencia a la consulta |
| `choice` | string | Opción elegida |
| `cp` | string | Código postal (única señal geográfica que sube el cliente) |
| `ts` | timestamp | Momento de emisión (redondeado a 15 min en el ledger público para dificultar correlación) |
| `challenge` | map | Prueba del reto SMS/biométrico resuelto (verificada por reglas + Cloud Function) |

## `pulso/ledger/{seq}`

Log *append-only* encadenado, escrito únicamente por la Cloud Function de registro. Es el artefacto que descargan los auditores.

| Campo | Tipo | Descripción |
|---|---|---|
| `seq` | number | Posición en la cadena (ID del documento, monotónico) |
| `voteHash` | string | SHA-256 del contenido canónico del voto |
| `prevHash` | string | `voteHash` encadenado del registro anterior (génesis: `0x0`) |
| `pollId`, `choice`, `cp`, `tsBucket` | — | Copia anonimizada del voto (timestamp en cubetas de 15 min) |

**Verificación externa:** recomputar `voteHash` de cada registro y comprobar que `prevHash[n] == voteHash[n-1]` para todo `n`. Un solo registro alterado rompe la cadena hacia adelante.

## `pulso/aggregates/{pollId}_{cp}`

Totales precalculados por código postal — lo único que consume el dashboard público. Se actualizan por trigger al escribirse cada voto.

| Campo | Tipo | Descripción |
|---|---|---|
| `counts` | map<string, number> | Votos por opción |
| `total` | number | Suma de votos del CP |
| `kAnonSafe` | boolean | `false` mientras `total < k` (el frontend agrupa CPs vecinos antes de pintar) |
| `updatedAt` | timestamp | Última agregación |

---

## Invariantes del sistema

1. **Append-only:** ningún actor — incluido el administrador del proyecto — tiene permiso de `update`/`delete` sobre `votes` ni `ledger`.
2. **Unicidad estructural:** un `deviceHash` = un documento = un voto. La segunda escritura falla en la capa de reglas.
3. **Privacidad por diseño:** el cliente nunca transmite coordenadas, nombre, teléfono ni CURP; el ledger público solo contiene `choice`, `cp` y cubetas de tiempo.
4. **Todo lo público es recomputable:** cualquier total mostrado en el dashboard debe poder derivarse del ledger descargable. Si no se puede recomputar, no se publica.
