# ARCHITECTURE.md — Pulso Nayarit

Justificación técnica del diseño: por qué el sistema es confiable a escala estatal, por qué se eligió Supabase/Postgres sobre Firebase, y cómo se expande.

> **Estado:** el backend descrito aquí está **implementado y desplegado** (migraciones en [`supabase/migrations/`](./supabase/migrations/), verificación en [`supabase/README.md`](./supabase/README.md)). La consulta activa es una demo con datos de prueba; la atestación fuerte de dispositivo (OTP/biometría) está en roadmap.

---

## 1. El problema técnico

Una encuesta ciudadana digital solo vale lo que vale su credibilidad. Los tres vectores de ataque que destruyen esa credibilidad son:

1. **Inflación de votos** — granjas de bots o una persona votando muchas veces.
2. **Manipulación de resultados** — el operador de la plataforma altera los totales.
3. **Desanonimización** — cruzar geolocalización con horarios para identificar personas.

La arquitectura ataca los tres de forma estructural, no con promesas.

## 2. Decisión de stack: por qué Supabase/Postgres y no Firebase

El monorepo Gobernanza Digital usa Firebase; este módulo usa Supabase deliberadamente. La razón: las tres garantías centrales del sistema se pueden imponer **dentro de Postgres** con SQL declarativo y verificable, en vez de repartirse entre reglas de Firestore y código de Cloud Functions.

| Garantía | Con Firebase | Con Supabase/Postgres | Por qué gana Postgres |
|---|---|---|---|
| Un dispositivo = un voto | ID de documento = hash + reglas | `PRIMARY KEY (poll_id, device_hash)` | La unicidad es una propiedad física de la tabla; no hay código que saltarse |
| Append-only | Reglas `allow update, delete: if false` | `REVOKE` + triggers que rechazan mutaciones **para todos los roles, incluido `service_role`** | En Firestore el Admin SDK ignora las reglas; aquí ni la conexión administrativa puede editar (verificado en despliegue) |
| Ledger encadenado | Cloud Function *después* del voto | Trigger en la **misma transacción** del voto | "Todo voto está en el ledger" pasa de promesa a invariante transaccional |
| Agregados con k-anonimato | Código de agregación a mano | Vista SQL con `HAVING count(*) >= k` | Una consulta de 10 líneas, auditable leyendo el repo |
| Datos crudos para auditores | Export batch programado | PostgREST expone `pulso_ledger` como API REST de solo lectura | El botón "Ver Datos Crudos" es literalmente un `SELECT` |
| Auditoría del esquema | Reglas + funciones en archivos separados | Migraciones SQL versionadas en el repo | Un auditor lee un solo lenguaje declarativo y sabe qué puede y no puede pasar |
| Verificación externa | Requiere tooling propio | `supabase start` + importar ledger + una consulta SQL | Recomputar los totales cabe en un tutorial de 10 líneas |

**Beneficios en paralelo obtenidos:** Realtime nativo para el dashboard, OTP por SMS integrado en Supabase Auth para el roadmap de atestación, y costo cero en el plan actual.

**Convivencia:** el módulo es híbrido a propósito — el resto del monorepo sigue en Firebase; Pulso Nayarit valida el stack Supabase con riesgo cero para lo existente.

## 3. Decisiones de diseño

### 3.1 Unicidad de voto: la clave primaria como garantía

La unicidad no se verifica en código de aplicación: **es** la clave primaria de la tabla. La segunda inserción del mismo `(poll_id, device_hash)` viola la PK y falla en la capa de almacenamiento:

```sql
create table public.pulso_votes (
  poll_id     uuid not null references public.pulso_polls(id),
  device_hash text not null check (device_hash ~ '^[0-9a-f]{64}$'),
  ...
  primary key (poll_id, device_hash)   -- la 2ª inserción falla en la BD
);
```

La única vía de escritura es la RPC `pulso_cast_vote` (`SECURITY DEFINER`), que valida que la consulta esté abierta y la opción exista antes de insertar.

### 3.2 Auditabilidad: ledger encadenado en la misma transacción

Cada voto dispara el trigger `pulso_chain`, que anexa al ledger un registro con `vote_hash = sha256(contenido | prev_hash)` — **dentro de la transacción del voto**. Si el append fallara, el voto no existiría: es imposible que un voto quede fuera de la cadena. Los appends se serializan con `pg_advisory_xact_lock` para eliminar carreras sobre `prev_hash`.

Alterar un registro histórico rompe la cadena hacia adelante y es detectable por **cualquier** auditor que recompute los hashes — la consulta exacta está en [`supabase/README.md`](./supabase/README.md). Además, los triggers `pulso_*_immutable` rechazan `UPDATE`/`DELETE` para todos los roles: en el despliegue se verificó que incluso la conexión administrativa recibe `registro append-only — UPDATE no permitido`.

### 3.3 Privacidad: anonimización en tres capas

1. El cliente solo transmite código postal — nunca coordenadas, nombre, teléfono ni CURP.
2. El ledger público no contiene `device_hash` (no está en el preimage del hash) y el timestamp se redondea a la hora.
3. La vista `pulso_heatmap` aplica k-anonimato (k = 5): un código postal con menos de 5 votos totales no se publica.

La tabla de votos individuales no tiene política de SELECT: no es consultable por el público.

### 3.4 Frontend estático: superficie de ataque mínima

El dashboard es HTML estático servido por CDN que se conecta con la clave publicable (`anon`). No hay servidor de aplicación que comprometer: toda la seguridad la imponen RLS, la PK y los triggers en Postgres. El costo de servir 100,000 lectores la noche de un corte es el de servir archivos estáticos.

## 4. Por qué soporta la escala actual

| Dimensión | Carga esperada (estatal) | Capacidad del diseño |
|---|---|---|
| Lecturas del dashboard | Picos de ~50k usuarios simultáneos en cortes | CDN estático + vistas agregadas: las lecturas nunca tocan la tabla de votos fila por fila |
| Escrituras de voto | ~1.3M electores en Nayarit, distribuidos en semanas | Un voto = 1 INSERT + 1 append serializado; Postgres sostiene miles de transacciones/s, órdenes de magnitud sobre el pico realista |
| Verificación OTP (roadmap) | Ráfagas en horas pico | Supabase Auth escala el envío; el reto es idempotente por huella de dispositivo |
| Auditoría externa | Descargas del ledger completo | API REST pública de `pulso_ledger` + descarga JSON desde el dashboard; los auditores no compiten con los votantes |

El principio rector: **la ruta caliente (lecturas públicas) está desacoplada de la ruta crítica (escrituras de voto)**. Si el volumen creciera hasta que las vistas en vivo pesen, el paso siguiente es materializarlas (`materialized view` + `refresh` por trigger o cron) sin tocar nada más.

> Nota de capacidad del despliegue actual: el `pg_advisory_xact_lock` serializa los appends del ledger (~cientos de votos/s de techo). Para una consulta estatal real conviene particionar el lock por consulta (`hashtext('pulso_ledger' || poll_id)`) — un cambio de una línea ya contemplado.

## 5. Cómo se expande

- **Otros estados:** replicar "Pulso Jalisco" es aplicar las mismas migraciones con otro prefijo o en otro proyecto Supabase. El esquema no cambia.
- **Otras consultas:** `pulso_polls` separa la *pregunta* de los *votos*; presupuestos participativos o consultas municipales son un `INSERT` en `polls`, no un desarrollo.
- **Verificación más fuerte:** la huella es un módulo intercambiable — hoy `localStorage` + SHA-256 (prototipo); siguiente paso OTP por SMS con Supabase Auth; después credencial verificable (W3C VC) — sin tocar el ledger ni el esquema.
- **Descentralización del ledger:** el formato encadenado permite espejar el log en réplicas externas (universidades, IPFS) sin cambiar el formato de los registros; el export batch firmado está en el roadmap.
- **Proyecto dedicado:** hoy el módulo vive aislado por prefijo en un proyecto compartido (límite del plan gratuito); moverlo es re-aplicar las migraciones y cambiar dos constantes en el frontend.

## 6. Límites explícitos

Ser open source obliga a ser honestos sobre lo que el sistema **no** garantiza:

- La huella actual (`localStorage`) se evade borrando el almacenamiento del navegador; mitiga duplicados casuales, no ataques deliberados. El OTP por SMS eleva el costo; no lo elimina (una persona con varios teléfonos sigue pudiendo votar varias veces).
- El superusuario de la base podría, en teoría, eliminar los triggers de inmutabilidad — pero no podría reescribir la historia sin romper la cadena de hashes que los auditores externos ya descargaron. La defensa final es la replicación externa del ledger, no la confianza en el operador.
- Es un **ejercicio de opinión ciudadana**: no tiene, ni pretende tener, validez electoral oficial. La autoridad electoral es el INE / IEEN.
- La representatividad depende de la penetración de smartphones; los resultados deben leerse como tendencia digital, no como proyección del padrón.

Documentar los límites es parte del contrato de transparencia con el ciudadano.
