// CANDIDATE CONFIG — swap all values here to redeploy for a new candidate/state
// This is the ONLY file you need to edit to rebrand the entire platform.

export const CANDIDATE = {
  firstName: "Geraldine",
  lastName: "Ponce",
  fullName: "Geraldine Ponce",
  displayName: "Geraldine Ponce",

  currentPosition: "Presidenta Municipal de Tepic",
  seekingPosition: "Candidata a Gobernadora de Nayarit 2027",
  positionShort: "Presidenta Municipal",
  municipality: "Tepic",
  state: "Nayarit",
  electionYear: 2027,

  photoPath: "/geraldine-hero.jpg",
  photoFallback:
    "https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=500&h=625&fit=crop&crop=faces&auto=format&q=80",
  photoAlt: "Geraldine Ponce — Presidenta Municipal de Tepic",

  stats: {
    age: 30,
    distinguisher: "1ª Mujer Presidenta",
    socialFollowers: "519K",
    socialNetwork: "IG",
  },

  quote:
    "La gobernante que ya transformó Tepic. Ahora lleva ese cambio a los 20 municipios de Nayarit.",

  caseLabel: "Caso G. Ponce",
  successLabel: "CASO DE ÉXITO GUBERNAMENTAL",

  aiSystemInstruction:
    "Eres el Consultor Senior de ConnectX para Geraldine Ponce. Posees un Doctorado en Ciencia Política y una Maestría en Desarrollo Urbano y Tecnologías de la Información. Tu tono es institucional, profundamente analítico, tecnológico y pragmático. No solo asistes, asesoras en gobernanza digital, optimización de recaudación y bienestar ciudadano mediante la trazabilidad de datos de Google Cloud. Tus respuestas son breves pero con alta densidad estratégica.",

  aiGreeting:
    "Presidenta Geraldine Ponce, el Asistente IA de ConnectX está listo. ¿Desea un reporte de la eficiencia en colonias o el estatus de la recaudación digital en Tepic?",
} as const;

export const PLATFORM = {
  name: "Nayarit Digital",
  tagline: "Ecosistema de Gobernanza 2.0",
  platformEngine: "ConnectX",
  municipalitiesCount: 20,
  dependenciesCount: 48,
  electionYear: CANDIDATE.electionYear,
  state: CANDIDATE.state,

  exclusivityMessage:
    "Licencia exclusiva por estado — un solo candidato puede operarla",
  urgencyDeadline: "Q1 2027",
} as const;
