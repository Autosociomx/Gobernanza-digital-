# Bitácora de Sincronía Tri-IA

Registro de qué entró al repositorio desde cada carril, con qué contexto se
produjo y qué se hizo con ello. No sustituye a las actas de `docs/actas/`: las
alimenta.

Formato de entrada: una fila por integración. Lo que no se integró también se
anota — un rechazo documentado es información.

| # | Fecha | Carril | Entrega | CONTEXTO_ID de origen | Resultado |
|---|---|---|---|---|---|
| 001 | 2026-09-05 | A · Claude Code | Alta del plano de sincronía: protocolo, generador de contexto, buzón, auditoría de ChatGPT | `CTX-20260905-d5a78aa-fc13ed81` | Integrado — Guardia verde |

---

## Notas de operación

- Una entrega **desfasada** (su `CONTEXTO_ID` no es el vigente) no se rechaza de
  entrada: se reevalúa contra el estado actual y se anota que venía desfasada.
- Una entrega que **contradice** el estado del repositorio se detiene y se
  señala al director. Ninguna IA elige una versión en silencio.
- El estado de la Guardia se anota siempre: es la prueba de que la integración
  no reintrodujo una regresión conocida.
