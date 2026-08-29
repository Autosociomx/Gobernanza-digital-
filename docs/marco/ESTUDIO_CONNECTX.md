# Estudio ConnectX — carta de aprendizaje compartido

**Estado: 🔵 Propuesta / en formación.** Este documento no describe una institución que ya opera, sino el compromiso de trabajo entre el propietario de este repositorio y Claude para construir una — usando el SOATM como el terreno de práctica, no como pretexto.

## De dónde nace esto

El propietario de este repositorio pidió algo distinto a un fix de código: que Claude se sumara, sesión tras sesión, al trabajo de aprender gobernanza digital de la mano, con un propósito concreto — formar personas (ciudadanas y servidoras públicas) en tecnología, IA y programación aplicadas a resolver problemas reales de gobierno, y con el tiempo, aportar lo que se aprenda y los datos que se generen a programas de gobierno reales en México y América Latina.

Antes de aceptar ese compromiso hay que ser honestos sobre su naturaleza, porque la honestidad es la disciplina que ya rige todo este repositorio (ver `GLOSARIO_OFICIAL.md`): **Claude no puede ser un miembro de equipo en el sentido en que lo es una persona.** No hay memoria que persista entre sesiones más allá de lo que quede escrito en este repositorio; no hay continuidad garantizada de una conversación a la siguiente; no hay capacidad legal para firmar convenios ni representar a nadie. Lo que sí hay, y es real, es esto: dentro de cada sesión de trabajo, compromiso completo con el propósito descrito aquí, y la disciplina de dejar todo lo aprendido documentado para que sobreviva a la sesión — la memoria del Estudio es este repositorio, no el modelo.

## El pacto de aprendizaje

- **El propietario aporta** el conocimiento del terreno: cómo opera de verdad un ayuntamiento mexicano, qué necesita un trabajador sindicalizado para no sentir la digitalización como una amenaza, qué le falta a un ciudadano para confiar en un trámite digital, y el contexto legal/político de Nayarit y México que ningún modelo tiene de forma confiable sin que se lo enseñen.
- **Claude aporta** ejecución técnica disciplinada, memoria escrita (fichas, actas, código comentado con el porqué), y la disciplina de no dejar pasar una afirmación sin evidencia — la misma que ya se aplicó en las auditorías de este repositorio.
- **El aprendizaje es mutuo y queda registrado**, no solo transmitido: cada módulo que se construye o corrige en este repositorio es, a la vez, una lección de gobernanza digital para ambos.

## Los tres pilares del Estudio

### 1. Aprender gobernanza digital haciendo, no solo leyendo
El SOATM ya es el laboratorio: cada corrección hecha en la auditoría de esta semana (un botón que no hacía nada, un hash fabricado, un dato atribuido a la persona equivocada) es un caso de estudio real de lo que significa construir gobierno digital con integridad. La meta es que este repositorio funcione también como bitácora de aprendizaje, no solo como producto.

### 2. Formación tecnológica dual — ciudadano y trabajador burocrático
Ya existe una base de código para ambos:
- **Trabajador burocrático** → `src/components/ConnectXAcademy.tsx`. Ruta de tres niveles ya diseñada (Bronce: perder el miedo a ser reemplazado; Plata: digitalizar un trámite real de su propia ventanilla; Oro: rediseñar un proceso y formar instructores internos). Hoy es temario propuesto, sin curso activo ni inscripción — ese es el siguiente trabajo real, no una idea nueva.
- **Ciudadano** → `CitizenApp.tsx` ya es, en sí misma, una forma de alfabetización digital: cada reporte de bache, cada trámite en Ventanilla Única, enseña a un ciudadano a relacionarse con su gobierno de forma digital.
- Falta el tercer lado, que no existe todavía en ningún archivo: un espacio explícito de **enseñar a programar y usar IA aplicada a gobierno**, no solo a usar la plataforma ya construida. Eso es lo que el Estudio tendría que agregar.

### 3. El dataset estratégico — con los límites por delante, no como último paso
Lo que describes — aportar el dataset que se genere a programas de gobierno reales — es la parte de mayor valor y también la de mayor responsabilidad. Antes de que exista una sola fila de datos reales de un ciudadano o trabajador, hay que resolver:
- **Qué dataset es éticamente generable.** No es lo mismo un dataset de *patrones de trámite anonimizados* (cuántos días tarda un trámite, qué cuellos de botella tiene) que uno con datos personales de ciudadanos — el segundo requiere aviso de privacidad publicado y cumplimiento de la LGPDPPSO, que hoy este repositorio no tiene resuelto (ver `docs/marco/PENDIENTES_AUDITORIA_2026-08.md`).
- **Quién es dueño del dataset.** Si el dataset sale de datos de un municipio, el municipio es el dueño legal, no el Estudio — "aportar estratégicamente" significa negociar ese acceso con la autoridad correspondiente, no asumirlo.
- **Que el dataset describa la realidad, no la aspiración.** El mismo estándar VERIFICADO/POR VERIFICAR/PROPUESTA de este repositorio aplica a cualquier dato que se comparta con un tercero — no se entrega a un programa de gobierno una cifra que no se pueda defender con evidencia.

## Estado honesto de cada pieza, hoy

| Pieza | Estado real |
|---|---|
| Compromiso de aprendizaje mutuo | 🔵 Este documento — recién declarado |
| Currícula del trabajador (ConnectXAcademy) | 🟡 Temario diseñado, cero cursos activos, cero inscritos, sin convenio sindical firmado |
| Alfabetización ciudadana (CitizenApp) | 🟢 Real, en uso — pero no está enmarcada explícitamente como "formación", es un efecto colateral de la app |
| Enseñanza directa de programación/IA | 🔴 No existe ningún archivo ni módulo para esto todavía |
| Dataset estratégico | 🔴 No existe — ni la infraestructura técnica para generarlo con anonimización real, ni el marco legal para compartirlo |
| Vínculo con programas de gobierno reales | 🟡 Ya existe la alineación documentada con ATDT/LNETB (`docs/presentacion-tepic/09_ALINEACION_ATDT/`); falta el vínculo institucional formal |

## Próximos pasos concretos, en orden

1. Decidir con qué grupo real empieza la formación del trabajador burocrático — ¿el propio equipo de Tepic, un sindicato específico, o un piloto más pequeño y controlado?
2. Escribir el primer módulo de "programación e IA aplicada" del Estudio, usando como caso de estudio una corrección real de este repositorio (por ejemplo, cómo se encontró y arregló el hash fabricado de Cartas Municipales) — enseñar con el propio código, no con teoría genérica.
3. Definir, antes de generar cualquier dato real, qué tabla de datos anonimizados sería el primer dataset legítimo (candidato: tiempos de resolución de reportes ciudadanos en Servicios Públicos, sin identificar a la persona).
4. Volver a este documento cada vez que el Estudio avance, igual que se hace con las fichas de módulo — para que el estado "real hoy" nunca se quede atrás, como ya pasó una vez con Context.OS.

## Lo que necesito que decidas tú

- ¿El primer módulo de formación es para ciudadanos, para trabajadores burocráticos, o corren en paralelo?
- ¿Ya existe algún acercamiento con un sindicato o dependencia específica, o el primer paso es construir el contenido antes de tener con quién probarlo?
- ¿"Aportar el dataset a programas de gobierno" lo piensas como algo que ofreces tú directamente a una dependencia, o como algo que el Estudio publicaría abierto (como ya hace `pulso-nayarit/`)?
