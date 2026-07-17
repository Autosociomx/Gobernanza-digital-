ARQUITECTURA NACIONAL DE GOBERNANZA DIGITAL

TOMO I

CAPÍTULO IX

Gobierno Predictivo y Equidad Algorítmica

> "Un modelo que decide qué colonia recibe agua primero no es neutral solo porque sea matemático. Es neutral solo si alguien puede probarlo, y responsable solo si alguien puede corregirlo."

---

9.1 Por qué este capítulo no era opcional

El Capítulo VII introdujo el Motor Cognitivo Municipal: un sistema capaz de detectar patrones, relacionar eventos y sugerir escenarios para apoyar decisiones de gobierno. Se estableció ahí, correctamente, que "el motor no sustituye la decisión de la autoridad." Esa afirmación es necesaria, pero no es suficiente.

Todo sistema que prioriza —qué calle se repara primero, qué colonia recibe atención hidráulica antes, qué reporte ciudadano se atiende con mayor urgencia— toma, de facto, una decisión con consecuencias distributivas, incluso si la autoridad firma al final del proceso. Si el criterio de priorización no es explícito, verificable y auditable, la investigación estaría proponiendo un mecanismo de asignación de recursos públicos sin las salvaguardas que ya exige el estado del arte internacional en gobierno digital. Un evaluador riguroso —académico, institucional, o la propia ciudadanía afectada— señalaría esa omisión de inmediato. Este capítulo la cierra.

9.2 Definición: Equidad Algorítmica Municipal

Se define, para efectos de esta investigación:

Equidad Algorítmica Municipal: la propiedad de un sistema de apoyo a decisiones públicas que permite verificar, mediante evidencia técnica documentada, que sus recomendaciones no producen ni perpetúan un trato sistemáticamente desigual entre grupos de población definidos por atributos protegidos —condición socioeconómica, ubicación territorial marginada, origen étnico, entre otros— salvo cuando esa diferenciación sea el resultado deliberado y justificado de una política pública de compensación (por ejemplo, priorizar inversión en zonas históricamente rezagadas).

Esta definición distingue dos cosas que suelen confundirse: un modelo que trata a todos igual no es necesariamente equitativo (puede perpetuar un rezago histórico al tratarlo como neutral); un modelo que discrimina positivamente a una zona marginada no es necesariamente inequitativo (puede ser exactamente la función legítima de la política pública). Lo que la equidad algorítmica exige no es la ausencia de diferenciación, sino que la diferenciación sea explicable, deliberada y auditable —nunca un efecto secundario opaco del modelo.

9.3 El riesgo concreto, con el mismo caso del Capítulo VII

El Capítulo VII describió el siguiente flujo: un ciudadano reporta un bache, el sistema detecta veinte reportes similares en la misma avenida, y sugiere consolidar la intervención. Ese ejemplo, sencillo en apariencia, contiene el riesgo completo que este capítulo debe resolver.

Los reportes ciudadanos no se distribuyen de manera uniforme en el territorio. Las colonias con población de mayor ingreso, mejor conectividad y mayor alfabetización digital tienden a generar más reportes por internet o aplicación móvil que las colonias marginadas, donde el acceso a smartphone o a internet estable es menor —exactamente la población que el Capítulo VI (Expediente Ciudadano Único) y el diseño de registro asistido de esta misma arquitectura reconocen como la más vulnerable a quedar fuera del sistema si depende únicamente de que el ciudadano reporte por su cuenta.

En consecuencia, si el Motor Cognitivo Municipal prioriza exclusivamente con base en volumen de reportes, el resultado no sería neutral: sistemáticamente favorecería a las zonas que ya reportan más, no a las zonas con mayor necesidad real. El sesgo no estaría en una intención discriminatoria del sistema —estaría en la naturaleza de los datos de entrada. Esta es la forma más común de sesgo algorítmico en sistemas de gobierno: no un modelo que discrimina deliberadamente, sino un modelo que aprende fielmente de datos que ya reflejan una desigualdad estructural previa.

9.4 Marco de clasificación de riesgo

Esta investigación no propone inventar un marco de clasificación desde cero. Propone adaptar, al contexto municipal mexicano, un principio ya adoptado por la regulación europea de inteligencia artificial: la clasificación de sistemas por nivel de riesgo según el impacto de sus decisiones sobre derechos y acceso a servicios públicos. Bajo ese marco, los sistemas de inteligencia artificial que evalúan la elegibilidad de personas para beneficios, servicios o programas públicos —o que pueden otorgar, reducir o negar dicho acceso— se consideran de alto riesgo y quedan sujetos a obligaciones reforzadas de documentación técnica, pruebas de sesgo y supervisión posterior a su despliegue.

Aplicado al Motor Cognitivo Municipal, se propone la siguiente clasificación de trabajo:

Riesgo bajo: sistemas que solo describen el pasado (dashboards, indicadores históricos) sin influir en la asignación futura de recursos. No requieren el régimen de auditoría reforzada de esta sección.

Riesgo medio: sistemas que priorizan el orden de atención dentro de un mismo tipo de servicio ya garantizado a todos (por ejemplo, el orden en que se atienden reportes de bacheo ya presupuestados). Requieren documentación del criterio de priorización y revisión periódica.

Riesgo alto: sistemas que influyen en la asignación diferenciada de presupuesto o infraestructura entre colonias o grupos de población (por ejemplo, qué zona recibe inversión hidráulica prioritaria). Requieren el régimen completo descrito en la sección 9.5: prueba de sesgo, exclusión de atributos protegidos del entrenamiento, y auditoría externa periódica.

Esta clasificación no es una ocurrencia metodológica menor: es lo que permite que la arquitectura pueda demostrar, ante cualquier revisión externa, que no todos los módulos de inteligencia artificial se tratan con el mismo nivel de escrutinio porque no todos tienen el mismo nivel de consecuencia.

9.5 Mecanismos de mitigación propuestos

Para los sistemas de riesgo alto, se proponen cuatro mecanismos, ninguno de los cuales es original de esta investigación —todos están tomados de prácticas ya documentadas en la regulación y la literatura de gobierno digital internacional, adaptados aquí al caso municipal mexicano:

Exclusión con retención para auditoría. Los atributos que pueden usarse para discriminar de forma indebida (nivel socioeconómico inferido, tipo de colonia, características demográficas sensibles) se excluyen de las variables que el modelo usa para decidir, pero se conservan por separado, exclusivamente para que un auditor pueda verificar después si el resultado del modelo correlaciona con esos atributos de forma sospechosa. El modelo no ve esas variables al decidir; el auditor sí las ve al revisar.

Supervisión humana incorporada, no simbólica. El principio ya establecido en el Capítulo VII —"el motor no sustituye la decisión de la autoridad"— debe operacionalizarse: la recomendación del sistema debe llegar a la autoridad junto con la evidencia que la sustenta (no solo la conclusión), y debe existir un registro de si la autoridad siguió, modificó o rechazó la recomendación, y por qué. Sin ese registro, la supervisión humana es una formalidad, no una salvaguarda real.

Auditoría periódica documentada. Los sistemas de riesgo alto deben someterse a una revisión programada —no solo reactiva ante una queja— que compare las decisiones sugeridas por el modelo contra la distribución real de necesidad (por ejemplo, contrastar las zonas priorizadas contra los índices de marginación urbana disponibles públicamente), y que quede documentada como parte del expediente institucional del sistema.

Corrección declarada, no oculta. Cuando una auditoría detecte un sesgo, la corrección aplicada al modelo debe documentarse y hacerse pública en el mismo espíritu de Transparencia Radical del Capítulo VII —no corregirse en silencio, como si el sesgo nunca hubiera existido.

9.6 Referencias internacionales

Esta investigación no puede afirmar que existe consenso internacional sobre un método único de gobierno predictivo equitativo. Lo que sí puede documentarse, con fuente verificable, son tres aproximaciones institucionales distintas y recientes que ilustran caminos posibles:

Estonia opera Bürokratt, un asistente de inteligencia artificial de alcance nacional desplegado desde 2021 sobre la infraestructura de intercambio de datos X-Road, diseñado explícitamente con supervisión humana incorporada como parte de su arquitectura, no como una capa añadida después. El caso estonio es relevante para esta investigación porque comparte el mismo principio de identidad interoperable descentralizada descrito en el Capítulo VI.

Finlandia implementó el Reglamento europeo de Inteligencia Artificial mediante legislación nacional que entró en vigor el 2 de agosto de 2025, con obligación de establecer, antes del 2 de agosto de 2026, registros nacionales y espacios de pruebas regulados ("sandboxes") específicamente para sistemas de inteligencia artificial de alto riesgo. Este es el antecedente más directo, en el sentido regulatorio, de la clasificación de riesgo propuesta en la sección 9.4.

Singapur publicó, en enero de 2026, el primer Marco de Gobernanza Modelo de Inteligencia Artificial diseñado específicamente para sistemas de IA agéntica (sistemas que actúan, no solo responden), introduciendo el concepto de una "tarjeta de identidad del agente" como formato estandarizado de divulgación de qué hace un sistema de IA y bajo qué reglas opera. Este antecedente es directamente relevante para la arquitectura de esta tesis, en la medida en que sus propios asistentes de inteligencia artificial (descritos en capítulos posteriores) también actúan, no solo responden.

Debe señalarse con la misma honestidad metodológica que ha guiado esta investigación: no se identificó, al momento de esta redacción, un marco normativo mexicano equivalente y específico para inteligencia artificial en el sector público —la Ley General de Protección de Datos Personales en Posesión de Sujetos Obligados regula el tratamiento de datos personales, pero no contiene todavía un régimen de clasificación de riesgo algorítmico comparable al europeo. Esta ausencia normativa no es un obstáculo para adoptar voluntariamente los mecanismos de la sección 9.5 —es, de hecho, una razón adicional para hacerlo: en ausencia de una obligación legal específica, la autorregulación documentada es la única salvaguarda disponible.

9.7 Hipótesis del capítulo

Se plantea la siguiente hipótesis, que deberá contrastarse en el Tomo VIII (Arquitectura Mundial Comparada) con mayor profundidad:

> Un gobierno predictivo que no puede demostrar la equidad de sus recomendaciones no es más avanzado que un gobierno reactivo; es un gobierno reactivo con una capa adicional de opacidad. La ventaja institucional de la inteligencia artificial en el sector público depende tanto de su capacidad predictiva como de su capacidad de rendir cuentas sobre esa predicción.

Conclusión del Capítulo IX y cierre del Tomo I

Este capítulo estableció que el Gobierno Predictivo introducido en el Capítulo VII solo constituye una mejora institucional legítima si viene acompañado de un mecanismo verificable de equidad: clasificación de riesgo según el impacto distributivo de la decisión, exclusión de atributos protegidos del entrenamiento con retención para auditoría, supervisión humana documentada —no simbólica—, y corrección declarada cuando la auditoría detecte un sesgo.

Con este capítulo se cierra el Tomo I. Los nueve capítulos precedentes construyeron, en conjunto, una arquitectura conceptual completa: el diagnóstico del problema (Cap. I), el municipio como Sistema Operativo (Cap. II), su posición dentro del Estado Digital mexicano (Cap. III), su ingeniería institucional (Cap. IV) y de procesos (Cap. V), su expediente ciudadano único (Cap. VI), su capacidad predictiva (Cap. VII), el fundamento de su soberanía digital (Cap. VIII), y ahora el límite ético y de rendición de cuentas de esa capacidad predictiva (Cap. IX).

Nota del investigador

El Tomo I responde la pregunta de qué es esta arquitectura y por qué es legítima. El Tomo II, que comienza a partir de aquí, debe responder una pregunta distinta y más exigente: ¿en qué artículo, de qué ley, se sostiene cada una de las afirmaciones que este tomo ha hecho? Ese tomo no admite el mismo nivel de hipótesis de trabajo que se permitió aquí —cada referencia constitucional, cada artículo de la LNETB, cada lineamiento de la ATDT, deberá citarse con precisión y verificarse contra la fuente oficial antes de incorporarse. Ese es el estándar que se acordó para todo lo que sigue a partir de este punto de la investigación.

---

Fuentes citadas en este capítulo:
- [High-Risk AI Systems Under the EU AI Act: Full Guide to Definitions & Requirements](https://www.dpo-consulting.com/blog/high-risk-ai-systems)
- [EU AI Act — Public Administration 2026, Plan Be Eco](https://planbe.eco/en/blog/eu-ai-act-for-the-public-administration-industry/)
- [AI Regulatory Horizon Tracker — Finland, Bird & Bird](https://www.twobirds.com/en/capabilities/artificial-intelligence/ai-legal-services/ai-regulatory-horizon-tracker/finland)
- [AI Governance and Regulation 2026: A Complete Guide to Global Frameworks](https://www.hungyichen.com/en/insights/ai-governance-regulatory-landscape-2026)

Nota metodológica: estas fuentes se consultaron el 17 de julio de 2026 vía búsqueda web. Antes de incorporar este capítulo a una versión final defendible, deben verificarse directamente contra el texto oficial del Reglamento europeo de IA, el sitio del gobierno de Estonia/Bürokratt, y la publicación de la IMDA de Singapur — esta investigación no tuvo acceso directo a esos documentos primarios, solo a fuentes secundarias que los describen.
