# ORBE P0 v0.2 — reporte de implementación

**Rama:** `codex/orbe-p0-v0.2`  
**Base auditada:** `afb75910bc631d9714fd797cc950550f45f8c7b9`  
**Alcance:** P0.1, P0.2, P0.3.

## Estado

Este documento separa explícitamente implementación de verificación.

### Construido

- Canon v0.1 congelado bajo `docs/orbe/canon/v0.1/` con `MANIFEST.yaml` y hashes SHA-256.
- Auditorías del 14-ago-2026 marcadas como snapshot histórico.
- Runtime Context.OS LAB adaptado a Netlify Function en `netlify/functions/contextos-lab.mts`.
- CORS por allowlist y rate limit básico.
- `LAB_MOCK` y `authority: NONE` conservados.
- Suite `npm run test:orbe-p0-e2e` con ocho casos y reporte generado.
- CI ejecuta la suite y conserva el reporte como artifact.
- UI ORBE diferencia Aura/orientación de ORBE/acción y declara de manera permanente el carácter de laboratorio.
- UI expone recibo de laboratorio con folio, `evidenceId`, SHA-256 y policy version cuando Context.OS devuelve evidencia.
- `AURA_VS_ORBE.md` y `DESPLIEGUE_LAB.md` incorporados.

### Pendiente de prueba antes de declarar cierre

- Resultado verde de la suite completa en GitHub Actions sobre el HEAD final de la rama.
- Despliegue efectivo del commit aprobado en Netlify.
- Configuración explícita de variables de entorno de la demo.
- Verificación desde la URL pública de health y de una solicitud bache/luminaria.
- Confirmación de que el frontend público muestra el recibo `evidenceId`.

## Criterio de cierre

P0 no se declara terminado hasta que los puntos pendientes anteriores estén verificados. La existencia del código o de este reporte no sustituye esas comprobaciones.
