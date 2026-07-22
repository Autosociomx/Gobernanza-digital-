# 🏗️ Trazabilidad de Obras

## Qué es

Cada obra pública con su ficha (contrato, empresa, monto, fechas), avance
semanal con fotos y porcentaje real, y alertas automáticas por retraso o
sobrecosto. El ciudadano ve las obras cercanas a su domicilio.

## Estado

**Diseñado** — definido en el ecosistema Nayarit Digital ("Obras Trazables en Vivo").

## Conexiones

| Con | Qué fluye |
|---|---|
| Servicios Públicos | Reportes que requieren obra mayor se elevan a solicitud de intervención |
| Tesorería Digital | Pagado a contratistas vs. avance real |
| Orbe Central (Aura) | "¿En qué va la obra del puente?" |

## Dónde vive

- Visión: `docs/interno/NAYARIT_DIGITAL_V2.md` (§2 Trazabilidad de Obras)
- Referencias de UI: `src/components/UrbanReportMapView.tsx`, `src/components/NayaritMap.tsx`

## Cómo editarlo

- Cambiar alcance o integraciones → este archivo + `NAYARIT_DIGITAL_V2.md` §2.
- Al implementar: actualizar Estado aquí y en `../modulos.json`.

## Pendientes

- [ ] Esquema de datos de la ficha de obra (PublicWorks).
