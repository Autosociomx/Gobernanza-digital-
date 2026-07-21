# Arquitectura de Repositorios — SOATM / ConnectX

**Documento normativo del repositorio** · v1.0 · 18-jul-2026

Define cómo se organiza el ecosistema de repositorios en GitHub: qué vive aquí,
qué vivirá en la organización, y cuál es la ruta de publicación. Complementa a
`GOBERNANZA_REPOSITORIO.md` y `PROTOCOLO_SEGURIDAD.md` §7 — no los sustituye.

## 1. El modelo de dos repositorios (por qué no basta con renombrar éste)

La recomendación de "renombrar el repositorio actual y conservar el historial"
es correcta para el **repositorio de trabajo** — y es exactamente lo que no
puede hacerse con el **repositorio público**. La razón ya está escrita en
`PROTOCOLO_SEGURIDAD.md` §7 y en `docs/interno/README.md`: el historial de git
de este repositorio contiene material clasificado Interno (estrategia,
documentos de trabajo, llaves que tocaron commits antiguos). El historial que
esa recomendación valora conservar es, para efectos de publicación, el
pasivo que obliga a no publicarlo.

Por eso el modelo es de dos niveles, y ambos consejos son ciertos a la vez:

| Repositorio | Naturaleza | Historial | Contenido |
|---|---|---|---|
| Éste (`Gobernanza-digital-`, renombrable a `nayarit-digital-lab`) | **Privado — laboratorio de trabajo** | Se conserva íntegro (la narrativa de evolución vive aquí) | Todo: código, docs/marco, docs/interno, tesis |
| `soatm` (en la organización, nuevo) | **Público — el estándar** | Nace limpio, como *snapshot* auditado | Solo lo clasificado Público: código, COMPLIANCE.md, ARCHITECTURE.md, docs/marco |

No es "empezar otro GitHub": es el paso de publicación que el propio protocolo
del proyecto exige desde antes de esta decisión. El laboratorio conserva la
historia; el estándar publica el estado auditado.

## 2. La organización

Crear una **organización** de GitHub (no otra cuenta de usuario):
`github.com/connectx-mx` — o el nombre disponible más cercano. ConnectX es la
organización (el laboratorio); SOATM es su producto principal, no al revés.

Estructura objetivo de repositorios dentro de la organización:

```
connectx-mx/
├── soatm              ← el estándar (público, AGPL-3.0, snapshot limpio de aquí)
├── nayarit-digital    ← primera implementación (configuración de Tepic/Nayarit)
├── rutepro            ← logística municipal (ya existe como repo separado)
├── tepic-tu-salud     ← triage (si se decide separar del monolito)
├── docs               ← documentación institucional pública
└── research           ← investigación pública (no la tesis interna)
```

Regla de crecimiento: **un repositorio nuevo solo cuando hay código real que
separar.** Hoy `soatm` y `nayarit-digital` pueden nacer del snapshot; `rutepro`
ya existe; el resto se crea cuando exista el módulo que lo justifique — no
antes, para no administrar cascarones vacíos.

## 3. Qué NO se reorganiza (y la razón técnica)

La estructura interna del código (`src/`, `server.ts`, configuración en la
raíz) **no se reacomoda** en carpetas tipo `frontend/`, `backend/`,
`database/`, `07-Código/`: el build (Vite), el despliegue (Netlify), la Guardia
de regresiones y todas las rutas del proyecto dependen de la estructura
estándar — y el Art. 91 de la LNETB pide código fuente utilizable, que es lo
que los repositorios de software público serios (incluida la propia Fábrica de
Software de la ATDT) publican con estructura estándar. La navegación
institucional del repositorio (marcos → arquitectura → módulos → código →
evidencia) ya existe como índice en `COMPLIANCE.md`.

La carpeta `implementations/` por municipio se adopta **el día que exista la
segunda implementación firmada** — la preparación técnica real para eso no es
mover carpetas, sino lo que ya está hecho: configuración por instancia
(`firebase-applet-config.json.example`) y catálogos por municipio separados
del núcleo.

## 4. Pasos operativos (acciones del propietario, en GitHub)

Estas acciones se hacen en la interfaz de GitHub con la cuenta propietaria —
ningún agente ni sesión de trabajo puede (ni debe) hacerlas:

1. **Crear la organización**: github.com → ⊕ → *New organization* → plan Free →
   nombre (`connectx-mx` o disponible). Gratis, ilimitada para repos públicos.
2. **Transferir este repositorio a la organización**: Settings → General →
   Danger Zone → *Transfer ownership*. Conserva historial, issues y PRs; los
   enlaces viejos redirigen automáticamente.
3. **Renombrarlo** (opcional, recomendado): Settings → General → *Rename* →
   `nayarit-digital-lab`. GitHub redirige el nombre anterior.
4. **Mantenerlo privado** mientras contenga `docs/interno/` e historial mixto.
5. **Cuando toque publicar** (checklist de `PROTOCOLO_SEGURIDAD.md` §7
   completo): crear `connectx-mx/soatm` vacío y subir el snapshot limpio —
   código + docs públicos + COMPLIANCE.md, sin historial y sin `docs/interno/`.
   Ese es el repositorio que se reporta a la Autoridad Local para el
   Repositorio Nacional de Tecnología Pública (Art. 91 LNETB).

## 5. Nota sobre el nombre visible

El nombre "connectx-municipal-letters" que aparece en la rama de trabajo actual
es un identificador autogenerado de la sesión de desarrollo — no es el nombre
del proyecto ni aparece en el README. La identidad pública ya es: **SOATM**
(estándar) / **Nayarit Digital** (primera implementación) / **ConnectX**
(organización que lo desarrolla).
