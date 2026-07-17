-- ============================================================
-- Semilla DEMO — Pulso Nayarit
-- Consulta de demostración con votos simulados, emitidos vía la
-- RPC pulso_cast_vote para ejercitar el flujo completo
-- (unicidad -> trigger -> cadena de hashes).
--
-- NO aplicar en un despliegue real: eliminar esta migración o
-- cerrar la consulta demo antes de una consulta genuina.
-- ============================================================

insert into public.pulso_polls (id, title, options, region, status, opens_at)
values (
  'a11ce000-2027-4000-8000-000000000001',
  'Preferencia a Gubernatura 2027 (Demo)',
  '["Candidato / Perfil A", "Candidato / Perfil B", "Indecisos / Otro"]'::jsonb,
  'NAY-TEPIC',
  'open',
  now()
);

do $$
declare
  v_poll  uuid := 'a11ce000-2027-4000-8000-000000000001';
  v_cps   text[] := array['63000','63020','63175'];
  v_cp    text;
  i       int;
  v_hash  text;
begin
  foreach v_cp in array v_cps loop
    -- ~42% Perfil A
    for i in 1..6 loop
      v_hash := encode(extensions.digest('demo-seed-A-' || v_cp || '-' || i, 'sha256'), 'hex');
      perform public.pulso_cast_vote(v_poll, v_hash, 'Candidato / Perfil A', v_cp);
    end loop;
    -- ~38% Perfil B
    for i in 1..5 loop
      v_hash := encode(extensions.digest('demo-seed-B-' || v_cp || '-' || i, 'sha256'), 'hex');
      perform public.pulso_cast_vote(v_poll, v_hash, 'Candidato / Perfil B', v_cp);
    end loop;
    -- ~20% Indecisos
    for i in 1..3 loop
      v_hash := encode(extensions.digest('demo-seed-O-' || v_cp || '-' || i, 'sha256'), 'hex');
      perform public.pulso_cast_vote(v_poll, v_hash, 'Indecisos / Otro', v_cp);
    end loop;
  end loop;
end
$$;
