# 🔧 Servicios Públicos Inteligente

## Qué es

Reporte ciudadano por WhatsApp, chat web o app; la IA clasifica (bache,
luminaria, basura, fuga, poda) y da seguimiento en tiempo real:
Recibido → Asignado → En proceso → Resuelto, con notificaciones automáticas.

## Estado

**Diseñado** — definido en el ecosistema Nayarit Digital ("Bot Tepic", Fase 2 del contexto maestro).

## Conexiones

| Con | Qué fluye |
|---|---|
| Trazabilidad de Obras | Reporte que requiere obra mayor → solicitud de intervención |
| Tesorería Digital | Reporte con costo para el ciudadano → pago |
| TEPICTU Salud | Reportes médicos por síntomas se derivan al triaje |
| Orbe Central (Aura) | "Reporta un bache en mi calle" |

## Dónde vive

- Visión: `docs/interno/NAYARIT_DIGITAL_V2.md` (§3 Servicios Públicos Inteligente)
- Referencias de UI: `src/components/UrbanReportMapView.tsx`

## Cómo editarlo

- Cambiar categorías de reporte o el flujo de estados → este archivo + `NAYARIT_DIGITAL_V2.md` §3.
- Al implementar: actualizar Estado aquí y en `../modulos.json`.

## Pendientes

- [ ] Canal de WhatsApp (Bot Tepic) y clasificador de urgencia/área/sentimiento.
