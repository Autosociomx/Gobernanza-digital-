-- ============================================================
-- Pulso Nayarit — Open Ledger auditable
-- Módulo aislado con prefijo pulso_. No interactúa con otras
-- tablas del proyecto que lo hospeda.
-- ============================================================

create extension if not exists pgcrypto;

-- ------------------------------------------------------------
-- 1. Consultas (la "pregunta")
-- ------------------------------------------------------------
create table public.pulso_polls (
  id         uuid primary key default gen_random_uuid(),
  title      text not null,
  options    jsonb not null,                 -- ["Candidato / Perfil A", ...]
  region     text not null default 'NAY',
  opens_at   timestamptz,
  closes_at  timestamptz,
  status     text not null default 'draft' check (status in ('draft','open','closed')),
  created_at timestamptz not null default now()
);

alter table public.pulso_polls enable row level security;

create policy "polls: lectura pública"
  on public.pulso_polls for select using (true);
-- Sin políticas de insert/update para anon: las consultas solo se
-- administran desde migraciones o el rol de servicio.

-- ------------------------------------------------------------
-- 2. Votos: un dispositivo = un voto (unicidad estructural)
-- ------------------------------------------------------------
create table public.pulso_votes (
  poll_id     uuid not null references public.pulso_polls(id),
  device_hash text not null check (device_hash ~ '^[0-9a-f]{64}$'),
  choice      text not null,
  cp          text not null check (cp ~ '^[0-9]{5}$'),
  ts_bucket   timestamptz not null default date_trunc('hour', now()),
  primary key (poll_id, device_hash)          -- la 2ª inserción falla en la BD
);

alter table public.pulso_votes enable row level security;
-- Sin política de SELECT: los votos individuales NO son consultables
-- por el público (privacidad). Lo público es el ledger y los agregados.
revoke insert, update, delete on public.pulso_votes from anon, authenticated;

-- ------------------------------------------------------------
-- 3. Ledger encadenado (append-only, lectura pública)
-- ------------------------------------------------------------
create table public.pulso_ledger (
  seq       bigint generated always as identity primary key,
  poll_id   uuid not null,
  choice    text not null,
  cp        text not null,
  ts_bucket timestamptz not null,
  prev_hash text not null,
  vote_hash text not null
);

alter table public.pulso_ledger enable row level security;

create policy "ledger: lectura pública"
  on public.pulso_ledger for select using (true);

revoke insert, update, delete on public.pulso_ledger from anon, authenticated;

-- ------------------------------------------------------------
-- 4. Encadenado de hashes: en la MISMA transacción del voto
--    (pgcrypto vive en el esquema `extensions` en Supabase)
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
begin
  -- Serializa los appends para que prev_hash nunca sufra carreras
  perform pg_advisory_xact_lock(hashtext('pulso_ledger'));

  select vote_hash into v_prev
  from public.pulso_ledger
  order by seq desc
  limit 1;

  if v_prev is null then
    v_prev := repeat('0', 64);   -- génesis
  end if;

  -- El preimage NO incluye device_hash: el ledger público no
  -- puede vincularse a dispositivos.
  v_hash := encode(digest(
      new.poll_id::text || '|' || new.choice || '|' || new.cp || '|'
      || to_char(new.ts_bucket at time zone 'UTC', 'YYYY-MM-DD"T"HH24:MI:SS"Z"')
      || '|' || v_prev,
      'sha256'), 'hex');

  insert into public.pulso_ledger (poll_id, choice, cp, ts_bucket, prev_hash, vote_hash)
  values (new.poll_id, new.choice, new.cp, new.ts_bucket, v_prev, v_hash);

  return new;
end
$$;

create trigger pulso_chain
  after insert on public.pulso_votes
  for each row execute function public.pulso_append_ledger();

-- ------------------------------------------------------------
-- 5. Guardia append-only: bloquea UPDATE/DELETE para TODOS los
--    roles, incluido service_role (solo el superusuario podría
--    quitar el trigger, y eso queda registrado en migraciones).
-- ------------------------------------------------------------
create or replace function public.pulso_block_mutation()
returns trigger
language plpgsql
as $$
begin
  raise exception 'pulso: registro append-only — % no permitido', tg_op;
end
$$;

create trigger pulso_votes_immutable
  before update or delete on public.pulso_votes
  for each row execute function public.pulso_block_mutation();

create trigger pulso_ledger_immutable
  before update or delete on public.pulso_ledger
  for each row execute function public.pulso_block_mutation();

-- ------------------------------------------------------------
-- 6. RPC pública para emitir voto (única vía de escritura)
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
  v_seq  bigint;
begin
  select * into v_poll from public.pulso_polls where id = p_poll_id;
  if not found then
    raise exception 'consulta inexistente';
  end if;
  if v_poll.status <> 'open' then
    raise exception 'la consulta no está abierta';
  end if;
  if not (v_poll.options ? p_choice) then
    raise exception 'opción inválida';
  end if;

  insert into public.pulso_votes (poll_id, device_hash, choice, cp)
  values (p_poll_id, lower(p_device_hash), p_choice, p_cp);

  select max(seq) into v_seq from public.pulso_ledger;
  return v_seq;
exception
  when unique_violation then
    raise exception 'este dispositivo ya emitió su voto en esta consulta';
end
$$;

grant execute on function public.pulso_cast_vote to anon, authenticated;

-- ------------------------------------------------------------
-- 7. Vistas públicas: lo ÚNICO que consume el dashboard
-- ------------------------------------------------------------
-- Resultados por consulta (siempre recomputables desde el ledger)
create view public.pulso_results as
select
  p.id as poll_id,
  o.choice,
  count(v.device_hash)::int as votes,
  round(
    100.0 * count(v.device_hash)
    / greatest(sum(count(v.device_hash)) over (partition by p.id), 1),
    1
  ) as pct
from public.pulso_polls p
cross join lateral jsonb_array_elements_text(p.options) as o(choice)
left join public.pulso_votes v
  on v.poll_id = p.id and v.choice = o.choice
group by p.id, o.choice;

-- Mapa de calor por código postal con k-anonimato (k = 5):
-- un CP con menos de 5 votos totales NO se publica.
create view public.pulso_heatmap as
with totals as (
  select poll_id, cp, count(*) as total
  from public.pulso_votes
  group by poll_id, cp
)
select v.poll_id, v.cp, v.choice, count(*)::int as votes
from public.pulso_votes v
join totals t on t.poll_id = v.poll_id and t.cp = v.cp
where t.total >= 5
group by v.poll_id, v.cp, v.choice;

grant select on public.pulso_results, public.pulso_heatmap to anon, authenticated;

-- ------------------------------------------------------------
-- 8. Realtime: el dashboard se suscribe a inserts del ledger
-- ------------------------------------------------------------
alter publication supabase_realtime add table public.pulso_ledger;
