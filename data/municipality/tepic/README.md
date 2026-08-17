# Catálogo municipal para el ORBE — Tepic

Este directorio es la primera base de conocimiento estructurada del ORBE ciudadano.

## Regla de verdad

El ORBE no debe inventar requisitos, costos, plazos, dependencias, autoridades, efectos jurídicos ni integraciones. Cuando exista una fuente oficial vigente, prevalece sobre documentación interna o conocimiento general del modelo.

Estados usados:

- `verificado`: respaldado por fuente oficial vigente identificada.
- `por_verificar`: dato plausible o existente en materiales previos, pero sin cierre de fuente vigente.
- `demo`: funcionalidad demostrativa sin efectos jurídicos.
- `propuesto`: capacidad futura o diseño que requiere autorización/integración.

## Archivos

- `services.json`: catálogo inicial de servicios y capacidades de alto impacto.
- `intents.json`: maneras naturales en que una persona puede expresar su necesidad.

## Política de acciones

El ORBE puede informar, orientar, explicar y navegar a superficies existentes. Ninguna operación sensible debe ejecutarse solo porque un LLM la sugiera.

Las acciones que afecten identidad, patrimonio, pagos, expedientes, licencias, beneficios, catastro o actos de autoridad deberán pasar por una capa explícita de autoridad, política y evidencia (Context.OS/COP cuando esa capa esté implementada y auditada).

## Human-in-the-loop

Para Catastro Inteligente y Tesorería de Campo, cualquier anomalía o discrepancia detectada por IA se considera únicamente una señal para revisión. No crea adeudos, no modifica padrones, no determina sanciones y no produce efectos jurídicos por sí sola.

## Siguiente cierre

1. Vincular cada servicio a fuentes oficiales ATDT/federales/estatales/municipales.
2. Registrar fecha de consulta, autoridad emisora y alcance de cada fuente.
3. Validar dependencia, requisitos, costo, plazo y fundamento de cada servicio.
4. Conectar el catálogo al resolvedor de intención del ORBE.
5. Mantener trazabilidad de cada respuesta hacia su fuente.
