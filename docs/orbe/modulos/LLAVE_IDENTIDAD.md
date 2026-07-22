# 🔑 Llave e Identidad — Llave MX + Llave Infantil

## Qué es

El círculo de identidad del ecosistema: la **Llave MX** (identidad federal
CURP del adulto/tutor) y la **Llave Infantil** (Llave Digital de Protección a
la Niñez / SINISI) forman un solo círculo — el tutor se autentica con su
identidad federal y de ella cuelga la identidad protegida de sus hijos, con
doble anonimato frente a plataformas.

## Estado

**Propuesta aterrizada** — ficha legislativa, arquitectura y discursos listos
(PR #29); sin código propio aún. La autenticación de adultos hoy usa Firebase
(`ID Ciudadana`) como puente hasta la integración con Llave MX.

## Conexiones

| Con | Qué fluye |
|---|---|
| Expediente Digital Familiar | La llave del tutor abre/cierra el expediente del menor (consentimiento, no datos) |
| Protección Digital | La revocación del tutor dispara suspensión de cuenta en plataformas (plazo 24 h) |
| Orbe Central (Aura) | Autenticación única: la misma sesión del tutor opera todos los círculos |
| Plataformas externas | Solo tokens anónimos firmados: "menor de 16 sí/no" + "autorizado sí/no" |

## Dónde vive

- Propuesta completa: `docs/marco/soberania-digital-infantil/README.md`
- Articulado legal: `docs/marco/soberania-digital-infantil/FICHA_LEGISLATIVA.md`
- Flujos: `docs/marco/soberania-digital-infantil/DIAGRAMA_VERIFICACION.md`
- Estrategia: `docs/marco/soberania-digital-infantil/ESCENARIOS_ESTRATEGICOS.md`
- Código puente actual (login ciudadano): `src/components/LoginView.tsx`, `src/firebase.ts`

## Cómo editarlo

- Cambiar el diseño de verificación/doble anonimato → editar `DIAGRAMA_VERIFICACION.md` y la §3 del README del módulo de soberanía.
- Cambiar el articulado o transitorio → `FICHA_LEGISLATIVA.md`.
- Cambiar la estrategia de integración con Llave MX → `ESCENARIOS_ESTRATEGICOS.md` (escenario C).
- Cambiar conexiones con otros círculos → este archivo + `../modulos.json` + diagrama del `../README.md`.

## Pendientes

- [ ] Definir el protocolo técnico del token (formato de firma, rotación, no correlación).
- [ ] Diseñar la integración real con Llave MX (sandbox de la ATDT cuando esté disponible).
- [ ] Prototipo de la app del tutor (puede nacer como vista dentro de CitizenApp).
