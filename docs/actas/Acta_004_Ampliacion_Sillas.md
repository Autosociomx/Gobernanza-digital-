# Acta 004 — Ampliación de sillas: incorporación de Kimi y Jules
**Tema:** Expansión del sistema de gobernanza IA de 3 a 5 proveedores.
**Fecha:** 2026-07-31 · **Marco:** `docs/agentes/GABINETE_ESPECIALISTAS.md` · **Antecedentes:** Actas 001–003.

---

## Decisión

Por **voto humano decisivo único** (Regla 4 — Miguel Alexis), se aprueba la ampliación del sistema de gobernanza IA:

1. **Parlamento de las Sillas:** de 3 a **5 sillas** (GROQ, Gemini, Claude, **Kimi**, **Jules**). El número impar elimina empates en la cámara de decisión.
2. **Gabinete de Especialistas:** redistribución de las 15 sillas entre **5 proveedores × 3 sillas** (patrón E# mod 5). Antes: 3 proveedores × 5 sillas.
3. **Modo de intervención de Jules:** agente asíncrono de Google que trabaja sobre el repositorio y entrega sus dictámenes como **Pull Request** — cumple de forma nativa el flujo rama + PR de `docs/marco/GOBERNANZA_REPOSITORIO.md`.
4. **Nueva credencial de servidor:** `KIMI_API_KEY` en variables de entorno. Se mantiene la lección del Acta 002: **nada de keys en el cliente**.

## Nueva asignación de sillas

| Proveedor | Sillas | Modo |
|-----------|--------|------|
| Groq | E1, E6, E11 | API servidor |
| Google Gemini | E2, E7, E12 | API servidor |
| Anthropic | E3, E8, E13 | API servidor |
| **Kimi (Moonshot AI)** | E4, E9, E14 | API servidor (`kimi-k2`) |
| **Jules (Google)** | E5, E10, E15 | Pull Request en GitHub |

## Fundamento

- **Resiliencia (Regla 6):** con 5 proveedores, la caída de uno deja el **80% de las sillas activas** (antes 66% con 3 proveedores).
- **Soberanía tecnológica (E13, Acta 003):** reduce la dependencia concentrada en un solo grupo proveedor (Firebase + Gemini + AI Studio) señalada como riesgo con ruta de salida pendiente.
- **Continuidad normativa:** las 6 reglas del Gabinete quedan intactas. Las sillas nuevas heredan la neutralización del ego algorítmico, el anclaje al código y el formato `[HALLAZGO]+[RECOMENDACIÓN]+[MÓDULO]`.

## Pendientes

- [ ] Configurar `KIMI_API_KEY` en las variables de entorno del servidor.
- [ ] Verificar la primera intervención de Jules vía Pull Request antes de la próxima plenaria.
- [ ] Redactar `docs/PARLAMENTO_PROMPT.md` (documento referenciado por este marco pero **aún inexistente**) con la composición de 5 sillas y su reglamento de votación.
- [ ] Definir el protocolo de mensajes entre sillas (lenguaje común: tipos, referencias y anclajes) para que las intervenciones sean legibles por cualquier proveedor.

---

**Estado:** Decisión humana registrada — no requiere votación de sillas.
**Archivo:** `docs/actas/Acta_004_Ampliacion_Sillas.md`
