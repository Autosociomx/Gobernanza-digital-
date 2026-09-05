# Contexto Nayarit Digital · ConnectX · SOATM — CTX-20260905-d5a78aa-fc13ed81

Cita el CONTEXTO_ID `CTX-20260905-d5a78aa-fc13ed81` al inicio de cada entrega sobre este
proyecto. Si algo no está aquí, pregunta; no lo inventes.

**Proyecto.** SOATM (Sistema Operativo de Atención y Tramitación Municipal) de
Tepic, Nayarit: gobierno digital municipal de código abierto. React 19 + TS +
Vite 6 + Tailwind 4 + Firebase + Express + Netlify. Tesis no negociable: el SOATM
no es invención — la LNETB federal (Arts. 2, 3, 66-76) y la Ley de Gobierno
Digital de Nayarit (Arts. 2, 5, 6) ya lo ordenan.

**Estado (2026-09-05).**
- Rama del contexto: `claude/unify-claude-chatgpt-google-q19n5s` · commit `d5a78aa` (2026-09-04)
- Guardia de regresiones: verde
- Módulos reales del código (docs/marco/modulos/INDICE.json): 29 → 15 maqueta · 8 real · 4 parcial · 2 riesgo · por superficie: 16 citizen_app · 13 c5
- Módulos conceptuales del Orbe (docs/orbe/modulos.json): 9 → 5 disenado · 2 propuesta · 1 piloto · 1 desplegado
- Biblioteca Legal: 35 citas VERIFICADO (4 con reserva parcial) · 5 POR VERIFICAR — lo POR VERIFICAR no se afirma en público

**Reglas duras (romperlas es regresión conocida).**
1. Ninguna llave de API viaja al navegador (GEMINI_API_KEY y STRIPE_SECRET_KEY viven solo en server.ts; prohibido el bloque `define` de vite.config.ts — la llave se filtró así cuatro veces desde pushes de AI Studio).
2. Nada bajo src/ crea un cliente de IA. El navegador llama a /api/ai/chat o /api/ai/risk-analysis.
3. src/App.tsx mantiene React.lazy + Suspense para las vistas pesadas.
4. No se borran archivos de despliegue: netlify.toml, public/robots.txt.
5. index.html conserva sus metadatos reales (lang="es", meta description, título institucional).
6. Sin @import de Google Fonts en src/index.css.
7. En public/ solo pueden vivir robots.txt y CONNECTX_SYSTEM_PROMPT.md. Lo interno va en docs/interno/.
8. Los montos de pago se validan en el servidor (entero positivo). El navegador nunca decide cuánto se cobra.
9. Ningún dato personal real en el repositorio, ni en semillas de demo, ni en actas.

**Semáforo de honestidad.**
🔴 Se elimina: nombres de políticos en componentes públicos, promesas electorales, cifras sin fuente.
🟡 Se etiqueta: lo legítimo pero aún no real → SIMULADO, PROYECCIÓN, META, banda DEMO. Ninguna cifra simulada sin etiqueta.
🟢 Se exhibe: lo verificable (código abierto, ley citada, bitácora).
Las citas legales solo salen de docs/marco/BIBLIOTECA_LEGAL.md y solo en estatus VERIFICADO.

**Carriles.** Claude Code = ingeniería, repo, PRs, la Guardia. ChatGPT =
estrategia, redacción, análisis normativo. Gemini/AI Studio = prototipado y UI.
Ninguna entrega llega a `main` sin pasar por el carril de ingeniería y la
Guardia: los pushes directos desde AI Studio causaron cuatro fugas de llave.

**Tu entrega.** Plantilla `docs/sincronia/BUZON/PLANTILLA_ENTREGA.md`:
CONTEXTO_ID + rutas exactas de archivos + reglas duras que roza + qué es
verificable y qué es propuesta + cómo se comprueba.

**Idioma.** Español en todo. Directo, jerga de gobierno digital mexicano.
