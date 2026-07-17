# Open Ledger — Modelo de Datos (Postgres / Supabase)

Especificación de las tablas del módulo Pulso Nayarit. Estado: **implementado** — el SQL fuente de verdad está en [`../supabase/migrations/`](../supabase/migrations/) y este documento lo explica.

Todas las tablas y funciones llevan el prefijo `pulso_` para aislarlas de cualquier otra cosa en el proyecto que las hospeda.

---

## `pulso_polls`

Define cada consulta (la *pregunta*). Separar la pregunta de los votos permite reutilizar la infraestructura para cualquier ejercicio de opinión (presupuestos participativos, consultas municipales, etc.).

| Campo | Tipo | Descripción |
|---|---|---|
| `id` | uuid PK | Identificador de la consulta |
| `title` | text | P. ej. "Preferencia a Gubernatura 2027 (Demo)" |
| `options` | jsonb | Opciones neutras `["Candidato / Perfil A", …]` |
| `region` | text | Ámbito geográfico (`NAY`, `NAY-TEPIC`, …) |
| `opens_at` / `closes_at` | timestamptz | Ventana de participación |
| `status` | text | `draft` \| `open` \| `closed` (con `CHECK`) |

RLS: lectura pública; sin políticas de escritura para `anon` — las consultas solo se administran por migraciones o rol de servicio.

## `pulso_votes`

Un registro por dispositivo verificado por consulta. **La clave primaria es `(poll_id, device_hash)`** — la unicidad "un dispositivo = un voto" la impone la base de datos, no la aplicación: la segunda inserción viola la PK y falla.

| Campo | Tipo | Descripción |
|---|---|---|
| `poll_id` | uuid FK | Referencia a la consulta |
| `device_hash` | text | SHA-256 de la huella del dispositivo (`CHECK` de formato hex-64) |
| `choice` | text | Opción elegida (validada contra `options` por la RPC) |
| `cp` | text | Código postal — única señal geográfica que sube el cliente (`CHECK` de 5 dígitos) |
| `ts_bucket` | timestamptz | Momento de emisión **redondeado a la hora** para dificultar correlación |

Privacidad: la tabla **no tiene política de SELECT** — los votos individuales no son consultables por el público. Lo público es el ledger anonimizado y los agregados. La única vía de escritura es la RPC `pulso_cast_vote` (`SECURITY DEFINER`), que valida consulta abierta, opción válida y formato de huella.

## `pulso_ledger`

Log *append-only* encadenado, escrito únicamente por el trigger `pulso_chain` **en la misma transacción que el voto** — la propiedad "todo voto está en el ledger" es un invariante transaccional, no una promesa. Es el artefacto que descargan los auditores (lectura pública vía REST o el botón "Ver Datos Crudos").

| Campo | Tipo | Descripción |
|---|---|---|
| `seq` | bigint identity PK | Posición en la cadena (monotónica) |
| `poll_id`, `choice`, `cp`, `ts_bucket` | — | Copia anonimizada del voto (sin `device_hash`) |
| `prev_hash` | text | `vote_hash` del registro anterior (génesis: 64 ceros) |
| `vote_hash` | text | `sha256(poll_id \| choice \| cp \| ts_bucket_utc \| prev_hash)` |

**El preimage no incluye `device_hash`:** el ledger público no puede vincularse a dispositivos. Los appends se serializan con `pg_advisory_xact_lock` para que `prev_hash` nunca sufra condiciones de carrera.

**Verificación externa:** recomputar `vote_hash` de cada registro y comprobar `prev_hash[n] == vote_hash[n-1]`. Un solo registro alterado rompe la cadena hacia adelante. Consulta lista para usar en [`../supabase/README.md`](../supabase/README.md).

## Vistas públicas (lo único que consume el dashboard)

| Vista | Contenido |
|---|---|
| `pulso_results` | Votos y porcentaje por opción y consulta — incluye opciones con 0 votos |
| `pulso_heatmap` | Votos por código postal **con k-anonimato (k = 5)**: un CP con menos de 5 votos totales no se publica |

---

## Invariantes del sistema

1. **Append-only real:** triggers `pulso_*_immutable` rechazan `UPDATE`/`DELETE` sobre `votes` y `ledger` para **todos** los roles, incluido `service_role`. Verificado en despliegue: el intento administrativo falla con `registro append-only — UPDATE no permitido`.
2. **Unicidad estructural:** un `(poll_id, device_hash)` = una fila = un voto. La segunda escritura falla en la capa de PK, antes de cualquier lógica.
3. **Privacidad por diseño:** el cliente nunca transmite coordenadas, nombre, teléfono ni CURP; el ledger público solo contiene `choice`, `cp` y cubetas de tiempo por hora.
4. **Todo lo público es recomputable:** cualquier total del dashboard se deriva del ledger descargable. Si no se puede recomputar, no se publica.

## Límite conocido del prototipo

La huella de dispositivo actual es SHA-256 de un identificador persistido en `localStorage` — suficiente para el prototipo, trivial de evadir borrando el almacenamiento local. El diseño lo contempla: la huella es un módulo intercambiable y el roadmap añade el reto OTP por SMS (Supabase Auth) como atestación fuerte, sin cambiar ni el esquema ni el ledger.
