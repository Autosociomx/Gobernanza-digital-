# Estructura del Repositorio — Estándar Vigente

**Nayarit Digital · ConnectX** · Adoptado en Acta 005 (2026-08-01)

## Árbol canónico

```
/
├── index.html                  # Meta tags institucionales Tepic/LNETB
├── package.json / vite.config / tailwind / tsconfig / netlify.toml
├── public/                     # Assets públicos (perfil-institucional.jpg, íconos)
├── src/
│   ├── App.tsx                 # Router de vistas + enlaces profundos ?view=&modulo=&tab=
│   ├── components/             # Vistas de plataforma (PlatformLanding, CitizenApp, C5Dashboard…)
│   ├── components/dashboard/   # Sub-vistas del C5 (ParlamentoView, AnalisisPoliticoView…)
│   ├── hooks/                  # useAuraChat, useAuraVoice…
│   ├── services/               # citasSaludService, saludPerfilService (Firestore real)…
│   └── lib/                    # Utilidades
├── scripts/
│   ├── verificar-regresiones.mjs   # La Guardia — se corre antes de cada entrega
│   ├── generar-contexto.mjs        # Contexto Portátil para ChatGPT y AI Studio
│   └── auditar-export-chatgpt.mjs  # Inventario de una exportación de ChatGPT
└── docs/
    ├── marco/                  # GOBERNANZA (pública, parte del producto)
    │   ├── GLOSARIO_OFICIAL.md         # Vocabulario, etiquetas, regla de citación
    │   ├── BIBLIOTECA_LEGAL.md         # Base normativa por módulo, con estatus
    │   ├── ACTA_005_SANEAMIENTO_REPOSITORIO.md
    │   ├── ESTRUCTURA_REPOSITORIO.md   # Este documento
    │   ├── NOTA_DE_CONTEXTO_PARA_CLAUDE.md
    │   └── modulos/            # Una ficha técnica por módulo (estado, ley, datos reales/simulados)
    ├── sincronia/              # Plano de sincronía Claude · ChatGPT · AI Studio
    │   ├── PROTOCOLO_TRI_IA.md         # Carriles, ciclo y CONTEXTO_ID
    │   ├── CONTEXTO_PORTATIL.md        # Briefing generado (no se edita a mano)
    │   ├── BUZON/                      # Entregas de ChatGPT y AI Studio
    │   └── BITACORA_SINCRONIA.md       # Qué se integró y con qué contexto
    ├── plataforma/             # Visión de producto
    └── orbe/                   # Herramientas del grafo de módulos (orbe.html, cop.html, orbe-3d.html)
```

## Reglas

1. **Todo documento de gobernanza vive en `docs/marco/`** — actas, glosario, biblioteca, fichas. La gobernanza es pública y forma parte del producto.
2. **Cada módulo tiene ficha en `docs/marco/modulos/`** con: estado (META/SIMULADO/PROYECCIÓN/VERIFICADO), ley que lo sustenta (de la Biblioteca Legal), y qué parte ya opera con datos reales.
3. **Convención de ramas:** `feat/<módulo>`, `fix/<ámbito>`, `docs/<tema>`, `chore/<tarea>`. Sin nombres de personas ni de sesiones de IA.
4. **Conventional Commits:** `fix(oficios): …`, `docs(marco): …`, `feat(salud): …`.
5. **`main` protegido:** toda fusión vía PR con la lista de honestidad de la plantilla (cifras etiquetadas, citas verificadas, sin nombres de políticos, Guardia+tsc+build en verde).
6. **Nada de estrategia interna en el sitio público** (lección del PR #26). Lo interno se marca "(uso interno)" y vive fuera del build público.
