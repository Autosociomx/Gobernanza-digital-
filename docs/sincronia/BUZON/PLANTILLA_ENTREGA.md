# Plantilla de entrega al Buzón de Sincronía

Copiar este esqueleto y llenarlo. Toda entrega de los carriles B (ChatGPT) y C
(Gemini / AI Studio) hacia el repositorio usa este formato. Sin él, la entrega
no se integra.

Nombre del archivo: `AAAAMMDD-<carril>-<tema>.md`
(ejemplo: `20260905-chatgpt-expediente-regulatorio.md`)

---

```markdown
# <Título de la entrega>

- **CONTEXTO_ID:** CTX-AAAAMMDD-xxxxxxx-xxxxxxxx   ← el que traía el contexto con el que trabajaste
- **Carril:** B (ChatGPT) | C (Gemini / AI Studio)
- **Fecha:** AAAA-MM-DD
- **Pedido original:** una frase con lo que se pidió

## 1. Qué se entrega

<Descripción breve. Si es código, en qué archivo va; si es documento, en qué
ruta de docs/ debería vivir.>

## 2. Archivos del repositorio que propone tocar

| Ruta exacta | Qué cambia | ¿Protegido? |
|---|---|---|
| `src/components/...` | ... | no |
| `docs/marco/...` | ... | sí — exige mención en el PR |

## 3. Reglas duras que roza y cómo las respeta

<Lista de las reglas de CLAUDE.md §3 que este cambio toca. Si no roza ninguna,
decirlo explícitamente. Las más frecuentes: llaves de API fuera del navegador,
nada de clientes de IA en src/, lazy loading de App.tsx, montos validados en el
servidor.>

## 4. Semáforo aplicado a esta entrega

- 🟢 Verificable: <lo que se sostiene con ley citada, código existente o bitácora>
- 🟡 A etiquetar: <cifras o funciones que van con SIMULADO / PROYECCIÓN / META>
- 🔴 Descartado: <lo que se propuso y no pasa el filtro, y por qué>

## 5. Citas legales usadas

<Solo de docs/marco/BIBLIOTECA_LEGAL.md y solo en estatus VERIFICADO. Si se usó
una cita que no está en la Biblioteca, marcarla aquí como POR VERIFICAR — no se
afirma en público hasta confirmarla.>

## 6. Cómo se comprueba

<Pasos concretos: qué correr, qué pantalla abrir, qué debería verse. Si es
código: qué pruebas pasan.>

## 7. Lo que NO se hizo

<Alcance que quedó fuera, y por qué. Un hueco declarado vale más que un hueco
descubierto después.>
```

---

**Qué pasa después.** El carril de ingeniería (Claude Code) verifica la entrega
contra el estado actual del repositorio, la integra vía rama + PR, corre la
Guardia + `npm run lint` + `npx vite build`, y anota el resultado en
`../BITACORA_SINCRONIA.md`. Si el `CONTEXTO_ID` de la entrega quedó desfasado,
se reevalúa primero y se hace constar.
