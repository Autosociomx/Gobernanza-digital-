-- ============================================================
-- Correcciones de revisión de código
-- ============================================================

-- ------------------------------------------------------------
-- 1. El trigger reporta su propio seq (transaction-local) en vez
--    de que la RPC dependa de max(seq) + la casualidad del lock.
-- ------------------------------------------------------------
create or replace function public.pulso_append_ledger()
returns trigger
language plpgsql
security definer
set search_path = public, extensions
as $$
declare
  v_prev text;
  v_hash text;
  v_seq  bigint;
begin
  -- Serializa los appends: la cadena es GLOBAL, así que el lock
  -- también debe serlo (particionarlo exige cadenas por consulta).
  perform pg_advisory_xact_lock(hashtext('pulso_ledger'));

  select vote_hash into v_prev
  from public.pulso_ledger
  order by seq desc
  limit 1;

  if v_prev is null then
    v_prev := repeat('0', 64);   -- génesis
  end if;

  v_hash := encode(digest(
      new.poll_id::text || '|' || new.choice || '|' || new.cp || '|'
      || to_char(new.ts_bucket at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
      || '|' || v_prev,
      'sha256'), 'hex');

  insert into public.pulso_ledger (poll_id, choice, cp, ts_bucket, prev_hash, vote_hash)
  values (new.poll_id, new.choice, new.cp, new.ts_bucket, v_prev, v_hash)
  returning seq into v_seq;

  perform set_config('pulso.last_seq', v_seq::text, true);
  return new;
end
$$;

-- ------------------------------------------------------------
-- 2. RPC: aplica la ventana opens_at/closes_at (antes eran
--    columnas muertas), devuelve el seq real del trigger, y el
--    duplicado sale con SQLSTATE estable (23505) para que la UI
--    no dependa del texto del mensaje.
-- ------------------------------------------------------------
create or replace function public.pulso_cast_vote(
  p_poll_id     uuid,
  p_device_hash text,
  p_choice      text,
  p_cp          text
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_poll public.pulso_polls;
begin
  select * into v_poll from public.pulso_polls where id = p_poll_id;
  if not found then
    raise exception 'consulta inexistente';
  end if;
  if v_poll.status <> 'open' then
    raise exception 'la consulta no está abierta';
  end if;
  if v_poll.opens_at is not null and now() < v_poll.opens_at then
    raise exception 'la consulta aún no abre';
  end if;
  if v_poll.closes_at is not null and now() > v_poll.closes_at then
    raise exception 'la consulta ya cerró';
  end if;
  if not (v_poll.options ? p_choice) then
    raise exception 'opción inválida';
  end if;

  insert into public.pulso_votes (poll_id, device_hash, choice, cp)
  values (p_poll_id, lower(p_device_hash), p_choice, p_cp);

  return current_setting('pulso.last_seq', true)::bigint;
exception
  when unique_violation then
    raise exception 'este dispositivo ya emitió su voto en esta consulta'
      using errcode = '23505';
end
$$;

-- ------------------------------------------------------------
-- 3. TRUNCATE no dispara triggers de fila: guardias explícitas
--    a nivel de sentencia.
-- ------------------------------------------------------------
create trigger pulso_votes_no_truncate
  before truncate on public.pulso_votes
  for each statement execute function public.pulso_block_mutation();

create trigger pulso_ledger_no_truncate
  before truncate on public.pulso_ledger
  for each statement execute function public.pulso_block_mutation();

-- ------------------------------------------------------------
-- 4. Cierra los privilegios residuales que Supabase concede por
--    defecto (incluidos TRUNCATE/REFERENCES y el service_role):
--    la única vía de escritura queda siendo la RPC.
-- ------------------------------------------------------------
revoke all on table public.pulso_votes, public.pulso_ledger, public.pulso_polls
  from anon, authenticated, service_role;

grant select on public.pulso_polls  to anon, authenticated, service_role;
grant select on public.pulso_ledger to anon, authenticated, service_role;
grant select on public.pulso_votes  to service_role;   -- solo lectura administrativa

-- ------------------------------------------------------------
-- 5. k-anonimato también por celda: además del total >= 5 por CP,
--    ninguna celda (CP, opción) con menos de 5 votos se publica.
--    Antes una celda de 1 voto en un CP con total 5 era visible.
-- ------------------------------------------------------------
create or replace view public.pulso_heatmap as
with totals as (
  select poll_id, cp, count(*) as total
  from public.pulso_votes
  group by poll_id, cp
)
select v.poll_id, v.cp, v.choice, count(*)::int as votes
from public.pulso_votes v
join totals t on t.poll_id = v.poll_id and t.cp = v.cp
where t.total >= 5
group by v.poll_id, v.cp, v.choice
having count(*) >= 5;
