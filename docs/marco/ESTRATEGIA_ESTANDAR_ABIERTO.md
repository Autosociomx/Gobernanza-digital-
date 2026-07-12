# Estrategia de Estándar Abierto

**Nayarit Digital / ConnectX** · Documento estratégico-normativo · v1.0

## 1. El objetivo, dicho con honestidad

El objetivo de negocio es que cualquier actor — de cualquier partido, en
cualquier trienio — que quiera digitalizar gobierno en la región termine
usando este sistema. **Ninguna ley puede otorgarle eso a un privado**: un
"por ley deben usar nuestro software" sería inconstitucional (libre
concurrencia, Art. 28 CPEUM), atacable ante COFECE y, sobre todo, un regalo
retórico para cualquier opositor ("quieren legislarse un monopolio").

Lo que sí existe — y es más fuerte que una ley, porque sobrevive a los cambios
de gobierno — es convertirse en **el estándar técnico de facto y la
implementación de referencia**. Así se construye:

## 2. Los cuatro candados legítimos

### Candado 1 · Licencia copyleft (AGPL-3.0)

Publicar el código bajo AGPL-3.0 significa:
- Cualquiera puede usarlo, auditarlo y desplegarlo — eso **es** la narrativa
  de soberanía y software público, ahora verificable.
- **Quien lo modifique o construya sobre él está obligado por la licencia a
  liberar su código con la misma licencia.** Nadie puede tomar el trabajo,
  privatizarlo y venderlo cerrado. El competidor que "se inspire" trabaja
  gratis para el ecosistema.
- La titularidad de la marca (Nayarit Digital, ConnectX) y del sello de
  certificación **no** se licencia: código abierto ≠ marca libre.

### Candado 2 · Estándares abiertos adoptados por acuerdo de cabildo

El ayuntamiento no puede decretar "usen ConnectX", pero **sí puede** aprobar
por acuerdo de cabildo sus **estándares de interoperabilidad**: formato del
expediente ciudadano, estructura de folios verificables, API de pagos,
esquema de consentimiento LGPDPPSO. Es exactamente lo que la LNETB promueve.

Efecto práctico: ConnectX es la implementación de referencia de esos
estándares. Cualquier proveedor que llegue después **debe ser interoperable
con el estándar que tú escribiste** — compite en tu cancha, con tus reglas,
contra un sistema ya desplegado y con costo cero de licencia.

### Candado 3 · Certificación de personas (Academia ConnectX)

Los cientos de servidores públicos certificados como operadores del sistema
son el candado humano: reemplazar la plataforma significa recapacitar a toda
la plantilla y renegociar con el sindicato coautor de la certificación.
Ningún cabildo paga ese costo político por cambiar de proveedor.

### Candado 4 · El costo de duplicar la autopista

Con el sistema en producción, auditado (Lighthouse 100, ASF-trazable) y
gratuito en licencia, cualquier propuesta de reemplazo debe justificar ante
el cabildo y la prensa por qué gastar millones en duplicar una autopista
pública que ya funciona. Esa pregunta no la sobrevive ningún proveedor.

## 3. Publicación en repositorios nacionales

Ruta recomendada para el reconocimiento federal:

1. Cumplir el checklist de apertura (`PROTOCOLO_SEGURIDAD.md` §7)
2. Publicar el repositorio como código abierto con AGPL-3.0 y README institucional
3. Presentarlo ante la ATDT como **software público municipal reutilizable**
   por los 2,457 municipios — con el caso Bahía/Xalisco/Tepic como evidencia
4. Registrar la marca y el sello de certificación ante el IMPI (eso sí es
   propiedad exclusiva y nadie lo hereda con el código)

## 4. Lo que este documento prohíbe

- Prometer o insinuar exclusividad "por ley" en cualquier material público
- Publicar en el repositorio abierto material de estrategia interna
  (ver clasificación en `GOBERNANZA_REPOSITORIO.md` §5)
- Declarar cumplimientos que no pasen la regla de honestidad de estados
  (`MARCO_CUMPLIMIENTO_LNETB.md`)

La ventaja competitiva de este proyecto es que **todo lo que afirma es
verificable**. Ese es el activo que ningún competidor puede copiar con dinero.
