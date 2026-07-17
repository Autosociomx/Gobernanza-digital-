# Backend Supabase — Pulso Nayarit

Todo el backend del módulo vive en estas migraciones SQL. No hay lógica de negocio fuera de Postgres: la unicidad, el append-only y la cadena de hashes son propiedades de la base de datos, verificables leyendo este directorio.

## Estado del despliegue

| | |
|---|---|
| **Proyecto** | `Rutepro` (`gizfikiwsjylemdrpvkx`, org ConectaX) |
| **URL** | `https://gizfikiwsjylemdrpvkx.supabase.co` |
| **Aislamiento** | Todas las tablas/funciones llevan prefijo `pulso_`; no tocan nada del proyecto anfitrión |

> ⚠️ **Hospedaje temporal:** el plan gratuito permite 2 proyectos activos y ambos están ocupados. El módulo se desplegó en `Rutepro` con aislamiento por prefijo. Para moverlo a un proyecto dedicado basta aplicar estas mismas migraciones al proyecto nuevo y actualizar `SUPABASE_URL`/`SUPABASE_KEY` en `frontend/index.html`.

## Migraciones

| Archivo | Contenido |
|---|---|
| `0001_pulso_ledger.sql` | Tablas (`polls`, `votes`, `ledger`), RLS, triggers de encadenado y de inmutabilidad, RPC `pulso_cast_vote`, vistas públicas (`results`, `heatmap` con k-anonimato), Realtime |
| `0002_seed_demo.sql` | Consulta de demostración + votos de prueba emitidos vía la RPC real. **No usar en producción.** |
| `0003_hardening.sql` | Funciones internas sin `EXECUTE` público, `search_path` fijo (hallazgos de los security advisors) |
| `0004_review_fixes.sql` | Ventana `opens_at`/`closes_at` aplicada en la RPC, guardias `TRUNCATE`, revocación de escritura directa a `service_role`, k-anonimato por celda, `seq` reportado por el trigger, duplicado con SQLSTATE 23505 |

> Nota: el historial aplicado en el proyecto vivo tiene una migración adicional (`pulso_nayarit_fix_search_path`) que aquí está consolidada dentro de `0001`. Aplicar estos archivos en orden sobre una base limpia produce el mismo esquema final.

## Verificación de la cadena (auditoría externa)

Cualquiera puede recomputar el ledger con esta consulta — es la misma que se ejecutó al desplegar (resultado: 42/42 hashes válidos, 42/42 encadenado válido):

```sql
with check_chain as (
  select
    seq, vote_hash, prev_hash,
    lag(vote_hash) over (order by seq) as expected_prev,
    encode(extensions.digest(
      poll_id::text || '|' || choice || '|' || cp || '|'
      || to_char(ts_bucket at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
      || '|' || prev_hash, 'sha256'), 'hex') as recomputed
  from public.pulso_ledger
)
select
  count(*)                                                            as total_registros,
  count(*) filter (where vote_hash = recomputed)                      as hashes_validos,
  count(*) filter (where prev_hash = coalesce(expected_prev, repeat('0',64))) as encadenado_valido
from check_chain;
```

Sin acceso SQL, el ledger completo se descarga como JSON desde el botón "Ver Datos Crudos" del dashboard (o vía la API REST pública de la tabla `pulso_ledger`) y la cadena se recomputa con cualquier implementación de SHA-256.

## Pruebas negativas ejecutadas en el despliegue

Todas fallaron como se diseñó:

- **Voto duplicado** (mismo `device_hash`, misma consulta) → `este dispositivo ya emitió su voto en esta consulta` (SQLSTATE 23505)
- **`UPDATE` sobre el ledger** con conexión administrativa → `pulso: registro append-only — UPDATE no permitido`
- **`TRUNCATE` sobre el ledger** con conexión administrativa → `pulso: registro append-only — TRUNCATE no permitido`
- **Voto fuera de ventana** (consulta con `closes_at` en el pasado y `status='open'`) → `la consulta ya cerró`
- **Escritura directa** de `service_role` en `votes`/`ledger` → sin privilegio (`has_table_privilege = false`)

## Roadmap del backend

- [ ] Proyecto Supabase dedicado (al liberar un slot del plan o subir de plan)
- [ ] Edge Function `verify-device`: reto OTP por SMS (Supabase Auth) antes de aceptar la huella
- [ ] Export batch periódico del ledger a Storage (JSON/CSV firmados)
- [ ] Espejos externos del ledger para descentralizar la auditoría
