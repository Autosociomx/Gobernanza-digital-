# Océanos Azules — Oportunidades que Estamos Dejando Pasar

**Nayarit Digital · ConnectX** · Sesión del Parlamento, 2026-08-01
Método: un océano azul = demanda real + obligación legal vigente + **cero competidores** + capacidad nuestra ya construida o cercana. Cada uno se evalúa con esos cuatro filtros y con la Biblioteca Legal. No son ideas bonitas: son mercados institucionales vacíos.

---

## 🌊 1. Módulo Ganado — la ventanilla digital del Padrón Ganadero Nacional (el más grande)

- **Demanda:** todo productor pecuario de Nayarit debe tener Clave UPP, inventario y guías de movilización; hoy es papel y oficina.
- **Ley:** Ley Federal de Sanidad Animal Arts. 56 y 58 (PGN/UPP, obligatorio desde 2007) + SINIIGA + NOMs de rastro. Verificado en Biblioteca Legal §3.
- **Competencia:** cero. Ningún municipio de México ofrece la ventanilla digital del PGN.
- **Capacidad nuestra:** el patrón ya existe — identidad única + folio sellado + bitácora (mismo diseño que Nayarit ID y el Nodo de Transparencia). El rastro municipal es CPEUM 115 fr. III: competencia directa del Ayuntamiento.
- **Por qué lo dejábamos pasar:** Agrovisión se pensó solo como cultivo (NDVI); la ganadería es el sector con trazabilidad **obligatoria por ley** — el cliente ya está obligado a venir.
- **Primer paso:** ficha en `docs/marco/modulos/ganado.md` + mock de alta UPP con folio sellado. Conseguir la Ley Ganadera de Nayarit (pendiente de la biblioteca).

## 🌊 2. Llave Infantil — identidad digital de menores como producto propio

- **Demanda:** actas, salud infantil, escuela, programas de bienestar — todo trámite de un menor lo hace su tutor, sin identidad digital del menor.
- **Ley:** LGDNNA Arts. 101 Bis y 101 Bis 3 + Convención sobre los Derechos del Niño Art. 7. La LNETB ordena la Llave MX; la versión infantil municipal está vacía.
- **Competencia:** cero a nivel municipal. (SINISI, PR #29, ya lo conceptualizó — falta productizarlo.)
- **Capacidad nuestra:** el patrón consentimiento-del-tutor + bitácora ya está implementado en el módulo Salud (perfiles_salud). Es el mismo código, otro dominio.
- **Primer paso:** la infografía ya existe (`llave-infantil-nayarit-id.png`); falta la ficha de módulo y el flujo de autorización de tutores.

## 🌊 3. Rastro municipal digital — donde convergen ganadería, salud y comercio

- **Demanda:** todo rastro municipal opera con bitácora de papel; COFEPRIS y SENASICA exigen registros.
- **Ley:** CPEUM 115 fr. III + NOM-009-ZOO-1994, NOM-033-ZOO-1995, NOM-194-SSA1-2004. Verificado.
- **Competencia:** cero. Es el servicio municipal menos digitalizado del país.
- **Conexión:** es el punto de cobro (derechos de rastro = Tesorería) + sanidad (módulo Salud) + trazabilidad cárnica (Módulo Ganado). Un solo módulo alimenta tres.

## 🌊 4. Agrovisión REAL — con datos satelitales gratuitos (Sentinel-2)

- **El error actual:** Agrovisión 3D es maqueta ("Octane 3D Engine" decorativo — ya etiquetado honestamente).
- **El océano:** la ESA publica imágenes Sentinel-2 **gratuitas** cada 5 días a 10 m de resolución — con eso se calcula NDVI real por parcela sin pagar un satélite. La LDRS Art. 138 declara la información rural de interés público y Art. 140 amarra el padrón a CURP.
- **Competencia:** las plataformas de ag-tech cobran por productor; ninguna lo hace como servicio municipal gratuito amarrado a la CURP.
- **Primer paso:** piloto con una sola capa NDVI real sobre el mapa de Nayarit (Copernicus Open Access Hub / Google Earth Engine, ambos gratuitos para esto).

## 🌊 5. Bienestar animal doméstico — el tema constitucional más nuevo y sin dueño

- **Demanda:** censo de mascotas, clínicas veterinarias municipales, denuncia de maltrato.
- **Ley:** reforma CPEUM dic-2024 (Arts. 3, 4, 73) — el bienestar animal acaba de entrar a la Constitución; la ley general está por expedirse. Quien tenga el módulo listo cuando salga la ley, se vuelve el estándar.
- **Competencia:** cero municipal. Y es un tema con enorme capital político ciudadano transversal.
- **Primer paso:** ficha de módulo + censo piloto en una colonia (con folio y georreferencia — el patrón de siempre).

## 🌊 6. Registro Civil digital — el trámite más frecuente de todos

- **Demanda:** actas de nacimiento/matrimonio/defunción — el trámite #1 del ciudadano común.
- **Ley:** Ley General de Población + Código Civil de Nayarit (Registro Civil). La LNETB ordena el expediente único.
- **Conexión:** es la entrada natural a Nayarit ID y a la Llave Infantil (el acta del menor → su llave).

## 🌊 7. "Municipio as a Service" — el océano de los otros 19 municipios

- **La ley ya creó el mercado:** la LGD Nayarit Art. 2 obliga a **los 20 Ayuntamientos**. Tepic es el piloto; los otros 19 son clientes cautivos por ley, sin ningún proveedor.
- **Capacidad nuestra:** el SOATM es código abierto — se franquicia con manual de implementación (Tesorería → Obras → Servicios → Salud).
- **Por qué lo dejábamos pasar:** estaba en la pestaña "(uso interno)" del Observatorio, tratado como idea de negocio lejana, cuando es la consecuencia directa de la ley.

## 🌊 8. Bitácora cívica como infraestructura (Nodo de Transparencia + Pulso Nayarit)

- **Demanda:** toda dependencia necesita comprobar entregas con evidencia sellada (obras, apoyos, folios).
- **Capacidad nuestra:** el patrón de hashes TPC-2026 ya está diseñado; PR #34 (Obras Nayarit) es la primera aplicación — por eso el Parlamento votó conservarla.

---

### Priorización del Parlamento (impacto × cercanía)

| Orden | Océano | Por qué primero |
|---|---|---|
| 1 | Ganado (UPP/PGN) | Cliente obligado por ley + patrón técnico ya construido |
| 2 | Llave Infantil | Mismo código que Salud + narrativa imparable (derechos de la infancia) |
| 3 | Agrovisión real (Sentinel-2) | Convierte una maqueta honesta en un hecho — gratis |
| 4 | Rastro digital | Alimenta Ganado + Salud + Tesorería a la vez |
| 5 | Bienestar animal | Ventana constitucional abierta, se cierra cuando salga la ley general |
| 6–8 | Registro Civil, MaaS, Bitácora cívica | Secuencia natural tras el piloto Tepic |

*Regla del Parlamento: ningún océano se anuncia públicamente hasta tener ficha en `docs/marco/modulos/`, ley VERIFICADA en la Biblioteca Legal, y etiqueta honesta de su estado.*
