# ARCHITECTURE.md — Pulso Nayarit

Justificación técnica del diseño: por qué el sistema es confiable a escala estatal y cómo se expande.

> **Alcance:** este documento describe la arquitectura objetivo del módulo. El estado de implementación de cada componente está en el [README](./README.md#-estado-del-proyecto). El prototipo actual (`frontend/index.html`) opera con datos simulados.

---

## 1. El problema técnico

Una encuesta ciudadana digital solo vale lo que vale su credibilidad. Los tres vectores de ataque que destruyen esa credibilidad son:

1. **Inflación de votos** — granjas de bots o una persona votando muchas veces.
2. **Manipulación de resultados** — el operador de la plataforma altera los totales.
3. **Desanonimización** — cruzar geolocalización con horarios para identificar personas.

La arquitectura ataca los tres de forma estructural, no con promesas.

## 2. Decisiones de diseño

### 2.1 Unicidad de voto: el hash de dispositivo como clave primaria

En lugar de deduplicar votos *después* de escribirlos, la unicidad se impone en la capa de datos: el identificador del documento de voto **es** el hash SHA-256 de la huella del dispositivo (más un desafío SMS/biométrico resuelto). En Firestore, dos escrituras al mismo ID de documento con reglas `create`-only son físicamente imposibles:

```
// firestore.rules (extracto conceptual)
match /pulso/votes/{deviceHash} {
  allow create: if request.auth != null
                && request.resource.data.keys().hasOnly(['choice', 'cp', 'ts', 'challenge'])
                && isValidChallenge(request.resource.data.challenge);
  allow update, delete: if false;   // append-only: nadie edita, ni el admin
  allow read: if true;              // el ledger es público
}
```

**Por qué importa:** la garantía "un dispositivo = un voto" no depende de código de aplicación que alguien pueda saltarse, sino de una regla declarativa verificable en este mismo repositorio.

### 2.2 Auditabilidad: ledger encadenado por hashes

Cada voto aceptado dispara una Cloud Function que lo anexa al *Open Ledger*: una secuencia donde cada registro incluye el hash del registro anterior (`prevHash`). Alterar un voto histórico rompe la cadena y es detectable por **cualquier** auditor externo que recompute los hashes — sin necesidad de confiar en el operador.

El esquema completo está en [`ledger/SCHEMA.md`](./ledger/SCHEMA.md).

### 2.3 Privacidad: agregación por código postal en el servidor

El cliente nunca sube coordenadas GPS. Sube únicamente el código postal, y los agregados públicos (`aggregates/{cp}`) se calculan en el servidor con un umbral mínimo de k-anonimato: un código postal con menos de *k* votos se agrupa con sus vecinos antes de publicarse. El mapa de calor del dashboard consume solo estos agregados.

### 2.4 Frontend estático: superficie de ataque mínima

El dashboard es HTML estático servido por CDN (Netlify). No hay servidor de aplicación que comprometer, no hay sesiones que robar, y el costo de servir 100,000 lectores simultáneos la noche de un corte es el de servir archivos estáticos: cercano a cero.

## 3. Por qué soporta la escala actual

| Dimensión | Carga esperada (estatal) | Capacidad del diseño |
|---|---|---|
| Lecturas del dashboard | Picos de ~50k usuarios simultáneos en cortes | CDN estático + agregados precalculados: las lecturas nunca tocan las colecciones de votos |
| Escrituras de voto | ~1.3M electores en Nayarit, distribuidos en semanas | Firestore sostiene 10k escrituras/s por base; el voto es 1 escritura + 1 trigger |
| Verificación SMS | Ráfagas en horas pico | Cloud Functions escalan horizontalmente; la cola de retos es idempotente por hash de dispositivo |
| Auditoría externa | Descargas del ledger completo | Export batch a JSON/CSV en Cloud Storage; los auditores no consultan la base en vivo |

El principio rector: **la ruta caliente (lecturas públicas) está desacoplada de la ruta crítica (escrituras de voto)**. Los agregados se actualizan por triggers, así que un millón de lectores no compite jamás con los votantes por capacidad de la base.

## 4. Cómo se expande

- **Otros estados:** el módulo es autocontenido; replicar "Pulso Jalisco" es clonar la carpeta y apuntar a colecciones con otro prefijo. El esquema del ledger no cambia.
- **Otras consultas:** el modelo de datos separa la *pregunta* (colección `polls`) de los *votos*, de modo que presupuestos participativos, consultas municipales o revocaciones usan la misma infraestructura.
- **Verificación más fuerte:** el desafío de unicidad es un módulo intercambiable — SMS hoy; credencial verificable (W3C VC) o firma con e.firma mañana — sin tocar el ledger ni el frontend.
- **Descentralización del ledger:** el diseño encadenado permite migrar de Firestore a un log replicado públicamente (p. ej. espejos en IPFS o múltiples universidades sosteniendo réplicas) sin cambiar el formato de los registros.

## 5. Límites explícitos

Ser open source obliga a ser honestos sobre lo que el sistema **no** garantiza:

- La huella de dispositivo mitiga bots masivos pero no impide que una persona con varios teléfonos vote varias veces; el desafío SMS eleva el costo, no lo elimina.
- Es un **ejercicio de opinión ciudadana**: no tiene, ni pretende tener, validez electoral oficial. La autoridad electoral es el INE / IEEN.
- La representatividad de la muestra depende de la penetración de smartphones; los resultados deben leerse como tendencia digital, no como proyección del padrón.

Documentar los límites es parte del contrato de transparencia con el ciudadano.
