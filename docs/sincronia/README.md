# Plano de Sincronía — tres inteligencias, un solo estado de hechos

Este directorio existe porque el proyecto se desarrolla en **Claude Code**,
**ChatGPT** y **Google AI Studio (Gemini)** al mismo tiempo, y ninguna de las
tres puede leer la memoria de las otras. Aquí vive lo que hace que marchen al
mismo paso.

## Por dónde empezar

| Archivo | Para qué |
|---|---|
| [`PROTOCOLO_TRI_IA.md`](./PROTOCOLO_TRI_IA.md) | **Léelo primero.** Los tres carriles, sus jurisdicciones, el ciclo de sincronía y lo que este protocolo explícitamente no hace |
| [`CONTEXTO_PORTATIL.md`](./CONTEXTO_PORTATIL.md) | Briefing completo *generado*. Se sube como archivo al Proyecto de ChatGPT y a los proyectos de AI Studio |
| [`CONTEXTO_BREVE.md`](./CONTEXTO_BREVE.md) | Lo mismo, condensado, para campos de instrucciones con límite de caracteres |
| [`contexto.json`](./contexto.json) | Manifiesto legible por máquina: `contexto_id`, commit, Guardia, conteos |
| [`AUDITORIA_CHATGPT.md`](./AUDITORIA_CHATGPT.md) | Cómo auditar de verdad el trabajo acumulado en ChatGPT (exportación + script) |
| [`BUZON/`](./BUZON/) | Dónde entregan los carriles B y C, con plantilla obligatoria |
| [`BITACORA_SINCRONIA.md`](./BITACORA_SINCRONIA.md) | Qué se integró, de dónde vino y con qué contexto |

## Comandos

```bash
npm run contexto              # regenera CONTEXTO_PORTATIL / CONTEXTO_BREVE / contexto.json
npm run contexto:verificar    # falla si el contexto en disco quedó desfasado del repo
node scripts/auditar-export-chatgpt.mjs        # inventario de una exportación de ChatGPT
node scripts/auditar-export-chatgpt.mjs --tema salud
```

## Las tres reglas que sostienen todo

1. **El repositorio es el único plano de contexto compartido.** Una decisión que
   solo vive en un chat no es una decisión del proyecto.
2. **Toda entrega cita su `CONTEXTO_ID`.** Sin él no hay forma de saber sobre qué
   estado del proyecto se razonó, y no se integra.
3. **Ninguna entrega llega a `main` sin pasar por el carril de ingeniería y por
   la Guardia.** Los pushes directos desde AI Studio son la causa raíz
   documentada de las cuatro fugas de llave.

> Los tres archivos de contexto son **generados**. No se editan a mano: se edita
> su fuente (`CLAUDE.md`, `docs/marco/…`, los registros de módulos) y se
> regeneran con `npm run contexto`.
