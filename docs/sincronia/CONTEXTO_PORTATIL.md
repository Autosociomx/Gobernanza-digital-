# Contexto Portátil — Nayarit Digital · ConnectX · SOATM

**CONTEXTO_ID: `CTX-20260905-d5a78aa-fc13ed81`** · generado el 2026-09-05

> Documento **generado** por `node scripts/generar-contexto.mjs`. No se edita a mano:
> se edita su fuente (9 archivos del repositorio) y se regenera.
> Se entrega a ChatGPT y al Gemini de Google AI Studio para que trabajen sobre el
> mismo estado de hechos que Claude Code. Protocolo: `docs/sincronia/PROTOCOLO_TRI_IA.md`.

## 0. Regla de entrada (obligatoria para la IA que lee esto)

Cita el `CONTEXTO_ID` de arriba al inicio de **cada** entrega que produzcas sobre
este proyecto. Sin ese identificador tu trabajo no se integra: no hay forma de
saber sobre qué estado del repositorio razonaste. Si no sabes algo, **pregunta**;
no lo inventes. Este documento es el límite de lo que puedes dar por cierto.

## 1. Qué es el proyecto

**Nayarit Digital · ConnectX · SOATM** (Sistema Operativo de Atención y Tramitación
Municipal) de Tepic, Nayarit: plataforma de gobierno digital municipal de código
abierto. Stack: React 19 + TypeScript + Vite 6 + Tailwind 4 + Firebase
(Firestore/Auth) + Express + Netlify. Un repositorio contiene tres cosas distintas:
la aplicación (`src/`, `server.ts`), el Context.OS Runtime (`contextos/`,
`shared/semantic/` — laboratorio, apagado por defecto, `executionMode: 'LAB_MOCK'`)
y el marco normativo y documental (`docs/`), que **es parte del producto**.

**Tesis central, no negociable:** el SOATM no es una invención. La LNETB federal
(Arts. 2, 3, 66–76) y la Ley de Gobierno Digital de Nayarit (Arts. 2, 5, 6) ya lo
ordenan. *"La ley ya lo mandaba; nosotros lo descubrimos y lo convertimos en
software abierto."*

## 2. Estado de hechos al momento de generar este contexto

- Rama del contexto: `claude/unify-claude-chatgpt-google-q19n5s` · commit `d5a78aa` (2026-09-04)
- Guardia de regresiones: verde
- Módulos reales del código (docs/marco/modulos/INDICE.json): 29 → 15 maqueta · 8 real · 4 parcial · 2 riesgo · por superficie: 16 citizen_app · 13 c5
- Módulos conceptuales del Orbe (docs/orbe/modulos.json): 9 → 5 disenado · 2 propuesta · 1 piloto · 1 desplegado
- Biblioteca Legal: 35 citas VERIFICADO (4 con reserva parcial) · 5 POR VERIFICAR — lo POR VERIFICAR no se afirma en público

Dos registros de módulos que **no se confunden**: `docs/marco/modulos/INDICE.json`
mide completitud de código (real / parcial / maqueta / riesgo);
`docs/orbe/modulos.json` mide madurez conceptual (propuesta / disenado /
en_construccion / piloto / desplegado / produccion). Si se contradicen, se señala
la contradicción — no se elige una en silencio.

## 3. Reglas duras (violarlas es una regresión conocida, la Guardia falla el build)

1. Ninguna llave de API viaja al navegador (GEMINI_API_KEY y STRIPE_SECRET_KEY viven solo en server.ts; prohibido el bloque `define` de vite.config.ts — la llave se filtró así cuatro veces desde pushes de AI Studio).
2. Nada bajo src/ crea un cliente de IA. El navegador llama a /api/ai/chat o /api/ai/risk-analysis.
3. src/App.tsx mantiene React.lazy + Suspense para las vistas pesadas.
4. No se borran archivos de despliegue: netlify.toml, public/robots.txt.
5. index.html conserva sus metadatos reales (lang="es", meta description, título institucional).
6. Sin @import de Google Fonts en src/index.css.
7. En public/ solo pueden vivir robots.txt y CONNECTX_SYSTEM_PROMPT.md. Lo interno va en docs/interno/.
8. Los montos de pago se validan en el servidor (entero positivo). El navegador nunca decide cuánto se cobra.
9. Ningún dato personal real en el repositorio, ni en semillas de demo, ni en actas.

Archivos protegidos (tocarlos exige mención explícita en la descripción del PR):
`index.html`, `vite.config.ts`, `netlify.toml`, `public/robots.txt`,
`src/App.tsx`, `server.ts`, `docs/` completo, `scripts/verificar-regresiones.mjs`,
`.github/workflows/`.

## 4. Semáforo de honestidad de datos (regla cultural mayor)

🔴 Se elimina: nombres de políticos en componentes públicos, promesas electorales, cifras sin fuente.
🟡 Se etiqueta: lo legítimo pero aún no real → SIMULADO, PROYECCIÓN, META, banda DEMO. Ninguna cifra simulada sin etiqueta.
🟢 Se exhibe: lo verificable (código abierto, ley citada, bitácora).
Las citas legales solo salen de docs/marco/BIBLIOTECA_LEGAL.md y solo en estatus VERIFICADO.

## 5. Los tres carriles

| Carril | Inteligencia | Jurisdicción | Cómo entrega |
|---|---|---|---|
| Ingeniería y gobernanza | **Claude Code** | Repositorio, PRs, la Guardia, `docs/marco/`, `contextos/` | Commit + PR a `main` |
| Estrategia, redacción y análisis | **ChatGPT** | Narrativa, expediente regulatorio, análisis normativo, borradores | Paquete de entrega al Buzón |
| Prototipado y UI | **Gemini / Google AI Studio** | Los proyectos "Build", experimentos visuales, iteración rápida | Paquete de entrega al Buzón |

Ninguna de las tres puede leer la memoria de las otras. **Ninguna entrega llega a
`main` sin pasar por el carril de ingeniería y por la Guardia.** Esa regla existe
porque los pushes directos desde AI Studio son la causa raíz documentada de las
cuatro fugas de llave y de varios borrados de archivos de despliegue.

## 6. Qué debe contener tu entrega

Todo trabajo devuelto por ChatGPT o AI Studio usa la plantilla de
`docs/sincronia/BUZON/PLANTILLA_ENTREGA.md` y contiene, mínimo:

1. `CONTEXTO_ID` sobre el que trabajaste (el de este documento).
2. Qué archivos del repositorio propone tocar, por ruta exacta.
3. Qué reglas duras roza y cómo las respeta.
4. Qué es verificable y qué es propuesta (semáforo aplicado a tu propia entrega).
5. Cómo se comprueba que funciona.

## 7. Comandos de verificación (los tres en verde antes de dar algo por terminado)

```bash
node scripts/verificar-regresiones.mjs   # la Guardia
npm run lint                             # tsc --noEmit (npx tsc instala un paquete falso)
npx vite build
npm run test:orbe-contextos              # si se tocó contextos/, shared/semantic/ o src/orbe/
```

## 8. Idioma y registro

Español en todo: código, comentarios, commits, documentación y conversación.
Directo, con jerga correcta de gobierno digital mexicano. Si una propuesta no se
sostiene con la ley, el código o la bitácora, no se propone.

---

*Fuentes de este contexto: `CLAUDE.md`, `docs/marco/GLOSARIO_OFICIAL.md`, `docs/marco/NOTA_DE_CONTEXTO_PARA_CLAUDE.md`, `docs/marco/PROTOCOLO_SEGURIDAD.md`, `docs/marco/GOBERNANZA_REPOSITORIO.md`, `docs/marco/BIBLIOTECA_LEGAL.md`, `docs/marco/modulos/INDICE.json`, `docs/orbe/modulos.json`, `docs/sincronia/PROTOCOLO_TRI_IA.md`.*
