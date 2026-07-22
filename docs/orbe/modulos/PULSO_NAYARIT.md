# 📊 Pulso Nayarit — auditoría cívica

## Qué es

Auditoría cívica open source: preferencia electoral ciudadana en tiempo real
con **libro mayor encadenado y auditable** (ledger), RLS en Postgres y
dashboard en vivo.

## Estado

**Backend desplegado** — Supabase/Postgres con ledger encadenado, RLS y
dashboard; consulta demo activa.

## Conexiones

| Con | Qué fluye |
|---|---|
| Orbe Central (Aura) | Consulta conversacional de resultados agregados |
| (Aislamiento deliberado) | No comparte identidad con otros círculos: la participación es anónima por diseño |

## Dónde vive

- Módulo completo: `pulso-nayarit/` (README, arquitectura, esquema del ledger)
- Backend: Supabase/Postgres (ver `pulso-nayarit/README.md`)

## Cómo editarlo

- Cambios de dashboard/esquema → dentro de `pulso-nayarit/`, siguiendo su propio README.
- Cambiar su relación con el Orbe → este archivo + `../modulos.json`.

## Pendientes

- [ ] Documentar aquí el enlace público del dashboard demo.
