# 06 — EVIDENCIA TÉCNICA

## Ficha estándar

| Campo | Respuesta |
|---|---|
| **Problema** | Es necesario distinguir entre lo que el repositorio realmente contiene y lo que se ha afirmado que contiene |
| **Afectados** | Revisores técnicos del Ayuntamiento (Tecnologías, C5, Sistemas) |
| **Obligación/Necesidad** | Demostrar con evidencia reproducible cada afirmación técnica |
| **Propuesta** | Inventario real del repositorio con matriz código-funcionalidad, capturas, limitaciones conocidas |
| **Evidencia** | 50 componentes React, `server.ts`, `demo/constancia-residencia/index.html`, `package.json` |
| **Brecha** | Sin auditoría WCAG, sin pentest, sin pruebas de carga |
| **Responsable** | Proponente tecnológico (evidencia) + Ayuntamiento (verificación independiente si lo desea) |
| **Fundamento** | Código fuente verificable en `github.com/Autosociomx/Gobernanza-digital-` |
| **Estado** | 🟢 Evidencia disponible — verificable contra repositorio |
| **Evidencia física** | `src/App.tsx`, `server.ts`, `demo/constancia-residencia/index.html`, `package.json`, `netlify.toml` |

## Contenido

| Archivo | Contenido |
|---|---|
| `INVENTARIO_REAL_DEL_REPOSITORIO.md` | Lista completa de archivos, componentes, endpoints y su estado |
| `MATRIZ_CODIGO_FUNCIONALIDAD.md` | Cada archivo → funcionalidad → estado real |
| `EVIDENCIA_DEMO.md` | El prototipo: qué hace, capturas, flujo paso a paso |
| `SEGURIDAD.md` | Medidas de seguridad documentadas e implementadas |
| `ACCESIBILIDAD.md` | Estado real de accesibilidad (no verificado) |
| `INFRAESTRUCTURA.md` | Netlify, Firebase, SQLite, Stripe sandbox |
| `LIMITACIONES_CONOCIDAS.md` | Lo que el sistema honestamente NO tiene |
