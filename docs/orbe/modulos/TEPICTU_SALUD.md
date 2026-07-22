# 🩺 TEPICTU Salud — triaje con IA sin internet

## Qué es

Chat de orientación médica que funciona **sin conexión** (colonias y sierra
con mala señal): síntomas → nivel de urgencia → recomendación (casa, centro
de salud u hospital). Diseñado para DIF y escuelas.

## Estado

**Diseñado** — definido en el ecosistema Nayarit Digital; pendiente de
implementación como módulo propio.

## Conexiones

| Con | Qué fluye |
|---|---|
| Expediente Digital Familiar | El triaje deriva a cita; la consulta queda en el perfil CURP |
| Bienestar Social | Brotes, desnutrición y casos vulnerables generan alertas |
| Orbe Central (Aura) | El triaje es una conversación de Aura en modo offline |

## Dónde vive

- Visión: `docs/interno/NAYARIT_DIGITAL_V2.md` (§4 TEPICTU Salud)
- Contexto: `docs/interno/CONTEXTO_MASTER_CLAUDE.md` (Fase 3)

## Cómo editarlo

- Cambiar el alcance del triaje o su público → este archivo + `NAYARIT_DIGITAL_V2.md` §4.
- Al implementar: crear el componente en `src/components/` y actualizar Estado aquí y en `../modulos.json`.

## Pendientes

- [ ] Elegir el modelo de IA offline (Edge AI) y su empaquetado.
- [ ] Protocolo de derivación triaje → cita en el hospital central.
- [ ] Versión para menores: el triaje de un niño notifica al tutor vía su llave.
