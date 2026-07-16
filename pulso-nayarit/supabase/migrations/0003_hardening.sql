-- ============================================================
-- Endurecimiento tras revisión de security advisors
-- ============================================================

-- Las funciones internas (trigger) no deben ser invocables vía la
-- API REST. Solo pulso_cast_vote permanece pública: es la boleta.
revoke execute on function public.pulso_append_ledger() from public, anon, authenticated;
revoke execute on function public.pulso_block_mutation() from public, anon, authenticated;

-- search_path fijo en la guardia de inmutabilidad (no referencia
-- objetos, pero un search_path mutable es superficie innecesaria).
alter function public.pulso_block_mutation() set search_path = '';
