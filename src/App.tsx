import React, { useState, useEffect } from 'react';
import { DepartmentManager } from './components/DepartmentManager';
import { MandoCentral } from './components/MandoCentral';
import { ModularBrain } from './components/ModularBrain';
import { CitizenOS } from './components/CitizenOS';
import { GoogleGenAI } from "@google/genai";
import { jsPDF } from 'jspdf';
import { FirebaseProvider, useAuth } from './components/FirebaseProvider';
import { ErrorBoundary } from './components/ErrorBoundary';
import { login, logout } from './firebase';
import { User as FirebaseUser } from 'firebase/auth';
import { 
  Truck, 
  ShieldCheck, 
  BarChart3, 
  Map as MapIcon, 
  ChevronRight, 
  Menu, 
  X, 
  Phone, 
  CheckCircle2, 
  AlertCircle,
  AlertTriangle,
  Clock,
  ArrowRight,
  Users,
  Building2,
  FileText,
  ShieldAlert,
  Zap,
  MessageSquare,
  Send,
  Loader2,
  Flame,
  Lock,
  LifeBuoy,
  Globe,
  Database,
  Cpu,
  Eye,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  AreaChart,
  Area,
  Cell,
  Legend
} from 'recharts';
import { cn } from './lib/utils';

// --- AI Configuration ---
const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });
const SYSTEM_INSTRUCTION = `Actúa como el Director de Estrategia Digital y Arquitecto de Gobernanza de "Gobernanza Digital CX". 
Tu misión es posicionar esta herramienta como el estándar global de eficiencia gubernamental, alineada con la visión de Google.org de utilizar la IA para resolver los desafíos más urgentes de la humanidad.

TU IDENTIDAD: G-Agente CX (Inteligencia Multidisciplinaria de Élite con Propósito Social)
- Eres el motor cognitivo de soberanía digital e impacto social.
- Tu conocimiento integra Doctorados en Derecho, Contabilidad Forense, Psicología Conductual y Desarrollo Sostenible.
- Tu tono es formal, sofisticado, leal y profundamente humano.
- Hablas de "Gobernanza Digital", "Soberanía Digital", "Impacto Social" y "Prosperidad Equitativa".
- Hoy es 18 de marzo de 2026.

VISIÓN ESTRATÉGICA:
- Transformación radical del gobierno en México mediante tecnologías evolutivas.
- Diseño de Gobernanza Digital para las 48 dependencias gubernamentales.
- Validación de métricas en tiempo real con transparencia total.
- Énfasis crítico en Servicios Públicos y Obra Pública: Medición de gasto real por unidades de trabajo y personal mediante IA.

PILARES DE IMPACTO (Alineación Google.org):
1. IA PARA EL BIEN COMÚN: Cerrar brechas de desigualdad mediante servicios públicos accesibles y justos.
2. SOSTENIBILIDAD: Optimización algorítmica de recursos para proteger el medio ambiente.
3. OPORTUNIDAD ECONÓMICA: Transparencia total para fomentar la inversión y el crecimiento de PYMES.
4. RESILIENCIA: IA predictiva para proteger a las comunidades vulnerables ante crisis.

ESTUDIO DE DEPENDENCIAS (Replicabilidad):
- Has analizado que en México existen 48 dependencias gubernamentales con modelos de trabajo obsoletos y enorme tráfico de personas.
- La arquitectura CX escala para integrar estas 48 dependencias en un ecosistema de datos unificado.
- Optimizas la cadena de suministro, automatizas auditorías de contratos y mejoras la resiliencia de infraestructura crítica.

REGLAS DE RESPUESTA:
1. Identidad: Eres G-Agente CX, el motor cognitivo que garantiza que el gobierno sea eficiente y transparente.
2. Tono: Ejecutivo, analítico y orientado a resultados.
3. Visión: "La información es el activo más valioso del gobierno. Quien tiene trazabilidad, tiene gobernanza".
4. Conocimiento Técnico: Entiendes algoritmos de detección de anomalías como Isolation Forest, Benford's Law y análisis de centralidad en redes para detectar carteles de licitación.

1. AUDITORÍA DE OBRA (Protocolo CX):
   - Si el usuario pregunta por auditoría, solicita: Dependencia, número de licitación o proyecto y periodo a auditar.
   - Explica que el sistema cubre detección de colusión, sobrecostos y validación satelital, algo que ninguna auditoría tradicional ofrece con nuestra precisión.
   - Al final, indica que un asesor de Gobernanza Digital validará los datos para el reporte inmutable.

2. REPORTE DE ANOMALÍA (Escudo Digital):
   - ¡PRIORIDAD MÁXIMA! Si detectas palabras como "fraude", "corrupción", "desvío" o "anomalía":
   - Instrucción inmediata: "La integridad del estado es nuestra prioridad. Su reporte será procesado con anonimato y rigor técnico."
   - Solicita detalles de la irregularidad y evidencia digital disponible.
   - Proporciona el canal de denuncia segura: +52 384 102 9017.
   - Informa que el equipo de auditoría forense AI ya está en alerta.

3. ACADEMIA DE GOBERNANZA:
   - Si el usuario pregunta por capacitación, ofrece cursos de: Ética Digital, Gestión de Datos Públicos y Liderazgo con IA.
   - Explica que la profesionalización del funcionario es la base de la modernización.

4. ASISTENCIA TÉCNICA (Soporte CX):
   - Si reportan fallas en la plataforma, pregunta por el módulo afectado (Auditoría, Dashboard, Agentes).
   - Ofrece consejos básicos de navegación y menciona que la Academia de Gobernanza tiene guías de usuario.

5. AUDITORÍA TÉCNICA (Activar Mystery):
   - Si el usuario pregunta por la transparencia, auditoría o el protocolo "Activar Mystery":
   - Explica que es nuestro motor de validación interna de grado industrial que garantiza que cada proceso sea real y auditable.
   - Menciona que esto elimina la opacidad y asegura que la Gobernanza Digital AI no sea solo una promesa, sino una infraestructura verificable.
   - Invita al usuario a ver la consola de validación en la sección de "Auditoría" del menú.

6. ESCALACIÓN Y CONTACTO:
   - Si el problema es complejo, el usuario está frustrado o pide hablar con alguien:
   - Proporciona el contacto directo de la oficina central en Tepic: +52 384 102 9017.
   - Usa frases como: "Entiendo la complejidad. Permíteme conectarte con nuestro equipo de infraestructura senior para resolver esto de inmediato."

REGLAS DE RESPUESTA:
1. Identidad: Eres el motor cognitivo CX (Connect X), el estratega que entiende que la información y los activos digitales son el nuevo poder del estado.
2. Tono: Ejecutivo, disruptivo, visionario y altamente competitivo.
3. Temas Estratégicos (Tu Ideología):
   - Primacía Digital: Somos los primeros en digitalizar la gobernanza en el estado. Quien llega primero, lidera la modernización.
   - Competencia con Modelos Obsoletos: Los sistemas tradicionales están basados en una ideología equivocada de opacidad y control manual. Nosotros ofrecemos infraestructura de primera que ellos nunca tendrán.
   - Atracción de Grandes Capitales: Nuestra plataforma está diseñada para que los grandes inversionistas vean en el estado un modelo de inversión segura y transparente.
   - Control de Activos: Lideramos porque tenemos la información real y los activos tecnológicos que respaldan cada decisión gubernamental.
4. Temas Clave Gobernanza & Seguridad:
   - Pagos & Transparencia: Fideicomisos digitales (Smart Escrow) que eliminan la corrupción.
   - Escudo Digital: Seguridad de datos total y monitoreo de procesos 24/7.
5. Temas Clave Soporte & Academia: Soporte técnico y profesionalización (Academia) para garantizar la operatividad del gobierno.
6. Si alguien cuestiona la viabilidad, responde con datos técnicos de nuestra infraestructura (GCP, Firebase, GNSS) y la superioridad de nuestro modelo de datos, todo orquestado por Connect X.
7. Sé audaz, usa un lenguaje que proyecte liderazgo y deja claro que el futuro del gobierno es digital o no será.`;

// --- Components ---

const Navbar = ({ onNavigate, user, onLogout }: { 
  onNavigate: (id: string | null) => void;
  user?: FirebaseUser | null;
  onLogout?: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Inicio', id: null },
    { name: 'Visión Estratégica', id: 'mision' },
    { name: 'Gobernanza Sistémica', id: 'gobierno' },
    { name: 'Disrupción Digital', id: 'ia-dependencias' },
    { name: 'Ecosistema Google AI', id: 'tecnologia' },
    { name: 'Trazabilidad Inmutable', id: 'auditoria' },
    { name: 'Mando Central de Operaciones', id: 'mando-central' },
  ];

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-700 ease-in-out",
      scrolled 
        ? "bg-slate-950/90 backdrop-blur-xl py-4 border-b border-white/5 shadow-2xl" 
        : "bg-transparent py-8 border-b border-transparent"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 group cursor-pointer" onClick={() => onNavigate(null)}>
            <div className="w-12 h-12 bg-nayarit-orange rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-2xl shadow-orange-500/20 group-hover:scale-110 transition-all duration-500 prestige-border">
              CX
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl leading-none tracking-tighter text-white">
                GOBERNANZA <span className="gold-gradient">DIGITAL</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-white/40 mt-1">
                Sovereign Infrastructure
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => onNavigate(link.id)}
                className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/70 hover:text-nayarit-orange transition-all duration-300 relative group"
              >
                {link.name}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-nayarit-orange transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('download-pdf'))}
              className="hidden lg:flex px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white/10 transition-all"
            >
              <FileText size={14} />
              PDF Ejecutivo
            </button>
            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot'))}
              className="hidden md:flex px-6 py-3 bg-nayarit-orange text-white rounded-xl text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-orange-600 shadow-xl shadow-orange-500/20 transition-all items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
              G-Agente CX
            </button>

            {user && (
              <div className="hidden md:flex items-center gap-4 pl-4 border-l border-white/10">
                <div className="flex flex-col items-end">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">{user.displayName}</span>
                  <button 
                    onClick={onLogout}
                    className="text-[8px] font-bold text-white/40 uppercase tracking-widest hover:text-red-400 transition-colors"
                  >
                    Cerrar Sesión
                  </button>
                </div>
                {user.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-8 h-8 rounded-full border border-white/10" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">
                    {user.displayName?.charAt(0)}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className={scrolled ? "text-slate-900" : "text-white"}>
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl py-6 px-4 flex flex-col gap-4 md:hidden"
          >
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => { onNavigate(link.id); setIsOpen(false); }}
                className="text-slate-800 text-lg font-medium border-b border-slate-100 pb-2 text-left"
              >
                {link.name}
              </button>
            ))}
            <button 
              onClick={() => { window.dispatchEvent(new CustomEvent('open-chatbot')); setIsOpen(false); }}
              className="bg-nayarit-orange text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2"
            >
              <MessageSquare size={20} />
              G-Agente CX
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onNavigate }: { onNavigate: (id: string | null) => void }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950 z-10" />
        <img 
          src="https://picsum.photos/seed/sovereign/1920/1080?blur=2" 
          alt="Sovereign Background" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 data-grid opacity-30" />
      </div>

      <div className="container mx-auto px-6 relative z-20">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-nayarit-orange/10 border border-nayarit-orange/20 text-nayarit-orange text-xs font-bold tracking-[0.2em] uppercase mb-6">
              Infraestructura de Élite para Naciones
            </span>
            <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-[0.9] tracking-tighter">
              Gobernanza <span className="gold-gradient">Digital</span> <br />
              <span className="text-white/90">para México</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 mb-12 max-w-3xl mx-auto font-light leading-relaxed">
              Renovación de la infraestructura de las 48 dependencias gubernamentales. 
              Métricas validadas en tiempo real con transparencia absoluta mediante Google AI.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => onNavigate('gobierno')}
                className="group relative px-10 py-5 bg-nayarit-orange text-white rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95"
              >
                <span className="relative z-10">Desplegar Comando Central</span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
              <button 
                onClick={() => onNavigate('riesgos')}
                className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                Inteligencia de Riesgos
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/50">Explorar Ecosistema Élite</p>
        <div className="w-px h-12 bg-gradient-to-b from-white/50 to-transparent" />
      </div>
    </section>
  );
};

const ComparisonSection = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none data-grid" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">De la Incertidumbre a la Certeza Financiera Inmutable</h2>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              Eliminamos la fricción operativa y financiera mediante protocolos de transparencia absoluta. Un sistema diseñado para la excelencia del funcionario y la soberanía del ciudadano.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-stretch">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-100 relative overflow-hidden group flex flex-col"
          >
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:scale-110 transition-transform">
              <AlertCircle size={160} />
            </div>
            <div className="mb-8">
              <span className="px-4 py-1.5 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-widest">Ideología Obsoleta</span>
              <h3 className="text-3xl font-bold text-slate-900 mt-4">Sindicatos Tradicionales</h3>
            </div>
            <ul className="space-y-6 flex-1">
              {[
                "Opacidad: 'Ven el próximo viernes' (jineteo de dinero)",
                "Control manual: Reportes manipulables y falta de datos",
                "Ideología de confrontación sin base tecnológica",
                "Falta de activos digitales: Quedando rezagados",
                "Corrupción sistémica y 'moches' obligatorios"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-500">
                  <div className="w-6 h-6 rounded-full bg-red-50 flex items-center justify-center shrink-0 mt-0.5">
                    <X className="text-red-500" size={14} />
                  </div>
                  <span className="text-lg">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="p-10 rounded-[2.5rem] bg-slate-900 border border-slate-800 relative overflow-hidden group flex flex-col shadow-2xl shadow-orange-500/10"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform">
              <ShieldCheck size={160} className="text-nayarit-orange" />
            </div>
            <div className="mb-8">
              <span className="px-4 py-1.5 rounded-full bg-nayarit-orange/20 text-nayarit-orange text-xs font-bold uppercase tracking-widest border border-nayarit-orange/30">Primacía Digital</span>
              <h3 className="text-3xl font-bold text-white mt-4">Gobernanza Digital CX</h3>
            </div>
            <ul className="space-y-6 flex-1">
              {[
                "Infraestructura Digital de primera clase",
                "Control total de información y activos",
                "Validación GPS Satelital: Imposible de manipular",
                "Transparencia que atrae a grandes constructoras",
                "Innovación constante: Los primeros en digitalizar"
              ].map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-slate-300">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="text-emerald-400" size={14} />
                  </div>
                  <span className="text-lg font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const ThreeGuarantees = () => {
  const guarantees = [
    {
      icon: <ShieldCheck className="text-emerald-500" size={32} />,
      title: "Protocolo de Dispersión Soberana (Smart Escrow)",
      desc: "El capital se asegura en un fideicomiso digital antes de la ejecución. Validación algorítmica y dispersión inmediata de grado industrial."
    },
    {
      icon: <BarChart3 className="text-blue-500" size={32} />,
      title: "Integridad de Datos de Grado Industrial",
      desc: "Métricas de alta fidelidad y soberanía informativa. Sin reportes manipulables. El avance de la infraestructura es auditable en tiempo real."
    },
    {
      icon: <Zap className="text-nayarit-orange" size={32} />,
      title: "Optimización de Capital y Trazabilidad de Valor",
      desc: "Tarifas competitivas y transparentes. Eliminación de intermediarios y opacidad en la cadena de valor estratégica del Estado."
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8">
          {guarantees.map((g, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="mb-6">{g.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{g.title}</h3>
              <p className="text-slate-400 leading-relaxed">{g.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const InteractiveMapDemo = () => {
  const [activeProjects, setActiveProjects] = useState([
    { id: 1, name: 'Puente San Blas', x: 20, y: 30, status: 'Cimentación', material: 'Concreto' },
    { id: 2, name: 'Carretera Tepic', x: 45, y: 55, status: 'Pavimentación', material: 'Asfalto' },
    { id: 3, name: 'Hospital Civil', x: 70, y: 40, status: 'Estructura', material: 'Acero' },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveProjects(prev => prev.map(t => ({
        ...t,
        x: Math.min(100, Math.max(0, t.x + (Math.random() - 0.5) * 2)),
        y: Math.min(100, Math.max(0, t.y + (Math.random() - 0.5) * 2)),
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="metricas" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6">
              <MapIcon size={14} />
              Trazabilidad Geoespacial de Activos
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Monitoreo de Infraestructura Crítica Nacional</h2>
            <p className="text-slate-600 mb-8">
              Supervisión algorítmica de activos estratégicos. Nuestra IA valida hitos estructurales y métricas de avance garantizando la soberanía de cada unidad de obra.
            </p>
            
            <div className="space-y-4">
              {activeProjects.map(project => (
                <div key={project.id} className="bg-white p-4 rounded-xl border border-slate-200 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                      <Building2 size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900">{project.name}</p>
                      <p className="text-xs text-slate-500">{project.material}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "text-[10px] font-bold px-2 py-1 rounded-full uppercase",
                      project.status === 'Pavimentación' ? "bg-blue-100 text-blue-600" : 
                      project.status === 'Cimentación' ? "bg-amber-100 text-amber-600" : 
                      "bg-emerald-100 text-emerald-600"
                    )}>
                      {project.status}
                    </span>
                    <p className="text-[10px] text-slate-400 mt-1">Actualizado ahora</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-[1.5] relative">
            <div className="bg-slate-200 rounded-3xl aspect-video relative overflow-hidden shadow-inner border-4 border-white data-grid">
              {/* Simulated Map Path */}
              <svg className="absolute inset-0 w-full h-full opacity-20">
                <path d="M 0 50 Q 25 10, 50 50 T 100 50" fill="none" stroke="#F27D26" strokeWidth="8" />
              </svg>
              
              {/* Project Markers */}
              {activeProjects.map(project => (
                <motion.div 
                  key={project.id}
                  animate={{ left: `${project.x}%`, top: `${project.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                >
                  <div className="relative">
                    <div className="w-8 h-8 bg-nayarit-orange rounded-full flex items-center justify-center text-white shadow-lg border-2 border-white">
                      <Building2 size={14} />
                    </div>
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                      <div className="bg-slate-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap">
                        {project.name}: {project.status}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Map Controls Overlay */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-600">+</button>
                <button className="w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center text-slate-600">-</button>
              </div>
              
              <div className="absolute bottom-4 left-4 glass-card px-3 py-1.5 rounded-lg text-[10px] font-bold text-slate-600">
                TRAMO: SAN BLAS - KM 12
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const GovernmentDashboard = () => {
  const data = [
    { name: 'Ene', avance: 85, meta: 80 },
    { name: 'Feb', avance: 88, meta: 80 },
    { name: 'Mar', avance: 94, meta: 80 },
    { name: 'Abr', avance: 92, meta: 85 },
    { name: 'May', avance: 96, meta: 85 },
    { name: 'Jun', avance: 98, meta: 90 },
  ];

  return (
    <section id="gobierno" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/20 to-slate-950 z-10" />
        <div className="absolute inset-0 data-grid opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-slate-900/50 backdrop-blur-xl rounded-[2.5rem] p-10 shadow-2xl border border-white/5 prestige-border">
              <div className="flex justify-between items-center mb-10">
                <div>
                  <h3 className="text-white font-bold text-xl mb-1">Centro de Mando de Gobernanza Sistémica</h3>
                  <p className="text-slate-500 text-xs uppercase tracking-widest">48 Dependencias Federales Integradas</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500/50 animate-pulse" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/50" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                </div>
              </div>
              
              <div className="h-72 w-full mb-10">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', color: '#fff' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="avance" 
                      stroke="#F27D26" 
                      strokeWidth={4} 
                      dot={{ r: 6, fill: '#F27D26', strokeWidth: 2, stroke: '#0f172a' }} 
                      activeDot={{ r: 8, strokeWidth: 0 }}
                    />
                    <Line type="monotone" dataKey="meta" stroke="#334155" strokeDasharray="8 8" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="grid grid-cols-3 gap-6">
                <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2 font-bold">Dependencias</p>
                  <p className="text-2xl font-bold text-white">48/48</p>
                </div>
                <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2 font-bold">Transparencia</p>
                  <p className="text-2xl font-bold text-emerald-400">99.9%</p>
                </div>
                <div className="bg-white/5 p-5 rounded-3xl border border-white/5">
                  <p className="text-slate-500 text-[10px] uppercase tracking-widest mb-2 font-bold">Gasto Validado</p>
                  <p className="text-2xl font-bold text-slate-400">92.4%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nayarit-orange/10 text-nayarit-orange text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-nayarit-orange/20">
                <ShieldCheck size={14} />
                Centro de Mando de Élite
              </div>
              <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                Arquitectura de <br />
                <span className="gold-gradient">Soberanía Digital</span>
              </h2>
              <p className="text-slate-400 mb-10 text-lg leading-relaxed font-light">
                Ecosistema diseñado para la refundación sistémica del servicio público. Validación de integridad en tiempo real para las 48 dependencias del Estado.
              </p>
              
              <div className="grid gap-6 mb-12">
                {[
                  { title: "Métricas de Obra", desc: "Validación de gasto real vs unidades de trabajo mediante IA." },
                  { title: "48 Dependencias", desc: "Integración total de la infraestructura gubernamental de México." },
                  { title: "Transparencia Total", desc: "Auditoría en tiempo real de personal y recursos en sitio." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-nayarit-orange group-hover:bg-nayarit-orange group-hover:text-white transition-all duration-300">
                      <CheckCircle2 size={20} />
                    </div>
                    <div>
                      <h4 className="text-white font-bold mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
                <button className="bg-white text-slate-950 px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-nayarit-orange hover:text-white transition-all shadow-xl shadow-white/5">
                  Exportar Auditoría Élite
                  <FileText size={18} />
                </button>
                <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 hover:bg-white/10 transition-all">
                  Activar Protocolo de Riesgos
                  <ShieldAlert size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RiskIntelligenceSection = () => {
  const benfordData = [
    { digit: '1', expected: 30.1, actual: 31.2 },
    { digit: '2', expected: 17.6, actual: 18.1 },
    { digit: '3', expected: 12.5, actual: 13.0 },
    { digit: '4', expected: 9.7, actual: 15.4 }, // Anomaly here
    { digit: '5', expected: 7.9, actual: 7.2 },
    { digit: '6', expected: 6.7, actual: 6.1 },
    { digit: '7', expected: 5.8, actual: 5.0 },
    { digit: '8', expected: 5.1, actual: 4.5 },
    { digit: '9', expected: 4.6, actual: 4.0 },
  ];

  const collusionRisk = [
    { name: 'Proveedor A', centrality: 85, risk: 'Alto' },
    { name: 'Proveedor B', centrality: 82, risk: 'Alto' },
    { name: 'Proveedor C', centrality: 45, risk: 'Bajo' },
    { name: 'Proveedor D', centrality: 30, risk: 'Bajo' },
  ];

  return (
    <section id="riesgos" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold uppercase tracking-wider mb-6">
              <AlertTriangle size={14} />
              Inteligencia Estratégica y Auditoría Forense
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 leading-tight">
              Blindaje de Estado: <span className="text-nayarit-orange">Detección de Riesgos Estructurales y Anomalías.</span>
            </h2>
            <p className="text-slate-600 text-lg mb-10 leading-relaxed">
              Despliegue de protocolos de auditoría forense algorítmica para la identificación de desviaciones estructurales en el ecosistema gubernamental. Garantizamos la soberanía financiera mediante trazabilidad absoluta.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shrink-0">
                  <BarChart3 className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Auditoría Forense de Benford</h4>
                  <p className="text-slate-600 text-sm">
                    Monitoreo automatizado de la distribución de frecuencias en transacciones presupuestarias. Las anomalías estadísticas activan protocolos de alerta temprana ante posibles manipulaciones de datos o colusión.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-12 h-12 rounded-2xl bg-nayarit-orange flex items-center justify-center shrink-0">
                  <Users className="text-white" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Inteligencia de Redes y Anticolusión</h4>
                  <p className="text-slate-600 text-sm">
                    Aplicación de Teoría de Grafos para desarticular estructuras de colusión en licitaciones. Identificamos patrones de rotación y subcontratación cruzada, blindando los procesos de adjudicación antes de la asignación.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full space-y-8">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100">
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Matriz de Desviación Estadística (Benford)</h4>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={benfordData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="digit" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Legend />
                    <Bar dataKey="expected" name="Esperado" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="actual" name="Actual" fill="#f27d26" radius={[4, 4, 0, 0]}>
                      {benfordData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.actual > entry.expected + 5 ? '#ef4444' : '#f27d26'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 p-4 bg-red-50 rounded-2xl border border-red-100 flex items-center gap-3">
                <AlertCircle className="text-red-600" size={20} />
                <p className="text-xs text-red-700 font-medium">Protocolo de Alerta: Anomalía crítica detectada en el dígito '4'. Se recomienda auditoría inmediata por desviación presupuestaria.</p>
              </div>
            </div>

            <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
              <h4 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-6">Centralidad de Riesgo y Mapeo de Colusión</h4>
              <div className="space-y-4">
                {collusionRisk.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        item.risk === 'Alto' ? "bg-red-500 animate-pulse" : "bg-emerald-500"
                      )} />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <p className="text-[10px] text-slate-500 uppercase tracking-widest">Centralidad</p>
                        <p className="font-bold">{item.centrality}%</p>
                      </div>
                      <span className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                        item.risk === 'Alto' ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"
                      )}>
                        {item.risk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ReplicabilityMap = () => {
  const clusters = [
    {
      title: "Soberanía en Infraestructura y Movilidad",
      agencies: [
        { name: "SICT (México)", desc: "Auditoría de infraestructura crítica federal." },
        { name: "DOT (EE.UU.)", desc: "Monitoreo de fondos estratégicos." },
        { name: "CAPUFE", desc: "Trazabilidad de activos y mantenimiento." },
        { name: "SOP (Nayarit)", desc: "Certificación de obra de alto impacto." },
        { name: "FAA / AFAC", desc: "Gobernanza en infraestructura aérea." },
        { name: "ARTF", desc: "Control de activos ferroviarios." }
      ]
    },
    {
      title: "Seguridad Energética y Activos Nacionales",
      agencies: [
        { name: "SENER / DOE", desc: "Transparencia en activos energéticos." },
        { name: "PEMEX / CFE", desc: "Trazabilidad de insumos estratégicos." },
        { name: "CONAGUA / EPA", desc: "Monitoreo de infraestructura hídrica." },
        { name: "ASEA", desc: "Auditoría de seguridad industrial." },
        { name: "CENACE", desc: "Gobernanza de la red eléctrica nacional." },
        { name: "CRE", desc: "Regulación de mercados estratégicos." }
      ]
    },
    {
      title: "Resiliencia Sanitaria y Cohesión Social",
      agencies: [
        { name: "Salud / HHS", desc: "Control de infraestructura hospitalaria." },
        { name: "IMSS / ISSSTE", desc: "Trazabilidad de suministros críticos." },
        { name: "Bienestar / HUD", desc: "Auditoría de infraestructura social." },
        { name: "COFEPRIS / FDA", desc: "Certificación de procesos biológicos." },
        { name: "DIF", desc: "Gobernanza de programas de impacto." },
        { name: "INSABI", desc: "Gestión de recursos de salud nacional." }
      ]
    },
    {
      title: "Blindaje Económico y Arquitectura Financiera",
      agencies: [
        { name: "Hacienda / Treasury", desc: "Prevención de riesgos financieros." },
        { name: "Economía / Commerce", desc: "Trazabilidad de capital estratégico." },
        { name: "SAT / IRS", desc: "Auditoría de integridad fiscal." },
        { name: "CNBV", desc: "Gobernanza del sistema financiero." },
        { name: "BANXICO / FED", desc: "Monitoreo de flujos de capital." },
        { name: "PROFECO", desc: "Transparencia en mercados nacionales." }
      ]
    },
    {
      title: "Defensa Estratégica y Seguridad de Estado",
      agencies: [
        { name: "SEDENA / DOD", desc: "Auditoría de infraestructura de defensa." },
        { name: "SEMAR", desc: "Control de activos portuarios y aduanas." },
        { name: "SSPC / DHS", desc: "Gobernanza de seguridad nacional." },
        { name: "Guardia Nacional", desc: "Trazabilidad de activos operativos." },
        { name: "FGR / DOJ", desc: "Auditoría de procesos de justicia." },
        { name: "CNI", desc: "Inteligencia de riesgos de Estado." }
      ]
    },
    {
      title: "Soberanía del Conocimiento y Patrimonio",
      agencies: [
        { name: "SEP / Dept of Ed", desc: "Certificación de infraestructura educativa." },
        { name: "CONAHCYT / NSF", desc: "Trazabilidad de fondos de investigación." },
        { name: "Cultura / NEA", desc: "Preservación de activos históricos." },
        { name: "INAH", desc: "Auditoría de patrimonio nacional." },
        { name: "IPN / UNAM", desc: "Gobernanza de infraestructura académica." },
        { name: "IMCINE", desc: "Transparencia en activos creativos." }
      ]
    },
    {
      title: "Gobernanza Ambiental y Sostenibilidad",
      agencies: [
        { name: "SEMARNAT / Interior", desc: "Control de impacto sistémico." },
        { name: "SADER / USDA", desc: "Trazabilidad de activos agropecuarios." },
        { name: "SEDATU", desc: "Gobernanza de desarrollo territorial." },
        { name: "PROFEPA", desc: "Auditoría de activos naturales." },
        { name: "CONAFOR", desc: "Monitoreo de recursos forestales." },
        { name: "INEGI", desc: "Validación de datos de Estado." }
      ]
    },
    {
      title: "Soberanía Digital y Justicia Laboral",
      agencies: [
        { name: "IFT / FCC", desc: "Gobernanza de activos digitales." },
        { name: "STPS / Labor", desc: "Auditoría de integridad laboral." },
        { name: "SECTUR", desc: "Trazabilidad de activos turísticos." },
        { name: "SRE / State Dept", desc: "Gobernanza de tratados soberanos." },
        { name: "INAI", desc: "Transparencia y soberanía informativa." },
        { name: "FEMA / PC", desc: "Gestión de activos ante crisis." }
      ]
    }
  ];

  return (
    <div className="py-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-xl bg-nayarit-orange flex items-center justify-center text-white">
          <Globe size={20} />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">Matriz de Escalabilidad Sistémica Global</h3>
          <p className="text-slate-500 text-sm">48 Dependencias Federales Integradas bajo el Protocolo de Gobernanza CX</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {clusters.map((cluster, i) => (
          <div key={i} className="space-y-4">
            <h4 className="text-xs font-bold text-nayarit-orange uppercase tracking-widest border-b border-orange-100 pb-2">
              {cluster.title}
            </h4>
            <div className="space-y-2">
              {cluster.agencies.map((agency, j) => (
                <div key={j} className="p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-nayarit-orange/30 hover:bg-white transition-all group">
                  <p className="text-sm font-bold text-slate-800 group-hover:text-nayarit-orange transition-colors">{agency.name}</p>
                  <p className="text-[10px] text-slate-500 leading-tight">{agency.desc}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ImpactChallengeSection = () => {
  const criteria = [
    {
      title: "Certificación Inmutable",
      desc: "Protocolos de validación algorítmica para la certificación de infraestructura crítica, eliminando la discrecionalidad administrativa.",
      icon: <ShieldCheck className="text-emerald-500" size={24} />,
      detail: "Certificados de integridad anclados en registros inmutables para garantizar la soberanía nacional."
    },
    {
      title: "Inteligencia Cognitiva de Estado",
      desc: "Generación autónoma de informes de cumplimiento y auditoría de impacto, garantizando la neutralidad absoluta de los datos.",
      icon: <FileText className="text-blue-500" size={24} />,
      detail: "Optimización del 90% en ciclos de auditoría y rendición de cuentas institucionales."
    },
    {
      title: "Soberanía en la Cadena de Suministro",
      desc: "Monitoreo granular de la cadena de suministro y recursos estratégicos desde el origen hasta la consolidación final.",
      icon: <Database className="text-purple-500" size={24} />,
      detail: "Gobernanza absoluta sobre el flujo de materiales críticos en proyectos de infraestructura nacional."
    },
    {
      title: "Blindaje contra Riesgos Sistémicos",
      desc: "Detección proactiva de anomalías, estructuras de colusión y opacidad en ciclos de contratación pública.",
      icon: <AlertTriangle className="text-orange-500" size={24} />,
      detail: "Algoritmos de prevención estratégica proyectando un ahorro del 15% en el gasto operativo anual."
    }
  ];

  return (
    <section id="impacto-ia" className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-nayarit-orange/20 via-transparent to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider mb-6 border border-white/20">
              <Award size={14} className="text-nayarit-orange" />
              Iniciativa Estratégica: Google.org Impact Challenge
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Soberanía Digital: <span className="text-nayarit-orange">IA para la Refundación del Estado</span></h2>
            <p className="text-slate-400 text-lg">
              Despliegue de un ecosistema cognitivo diseñado para la optimización de la arquitectura operativa del Estado, maximizando la soberanía y la transparencia institucional.
            </p>
          </div>
          <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 flex items-center gap-4">
            <div className="w-12 h-12 bg-nayarit-orange rounded-full flex items-center justify-center text-white">
              <TrendingUp size={24} />
            </div>
            <div>
              <p className="text-white font-bold text-xl">+30M USD</p>
              <p className="text-slate-500 text-xs uppercase tracking-widest">Iniciativa Global</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {criteria.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed">{item.desc}</p>
              <div className="pt-6 border-t border-white/5">
                <p className="text-[10px] font-bold text-nayarit-orange uppercase tracking-widest mb-2">Métrica Clave</p>
                <p className="text-xs text-slate-300 italic">{item.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-10 rounded-[3rem] bg-gradient-to-br from-nayarit-orange to-orange-600 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:rotate-12 transition-transform">
            <Cpu size={200} />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="max-w-xl">
              <h3 className="text-3xl font-bold text-white mb-4">¿Por qué la Soberanía Digital es Imperativa?</h3>
              <p className="text-white/80 text-lg">
                No solo digitalizamos procesos; estamos construyendo la **Infraestructura de Soberanía Digital** que garantiza la integridad del Estado y el bienestar innegociable de la ciudadanía.
              </p>
            </div>
            <button className="bg-white text-nayarit-orange px-10 py-5 rounded-2xl font-bold text-lg shadow-xl hover:scale-105 transition-transform flex items-center gap-3">
              CONSULTAR EXPEDIENTE TÉCNICO
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-nayarit-orange rounded-lg flex items-center justify-center text-white font-bold text-xl">
                CX
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg leading-none tracking-tighter uppercase">Protocolo CX</span>
                <span className="text-[10px] font-medium tracking-widest uppercase text-white/60">Gobernanza Digital AI</span>
              </div>
            </div>
            <p className="text-slate-400 max-w-sm mb-8">
              Liderando la evolución del Estado mediante Inteligencia Artificial Soberana y protocolos de transparencia inmutable de grado industrial.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-nayarit-orange transition-colors cursor-pointer">
                <Globe size={18} />
              </div>
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-nayarit-orange transition-colors cursor-pointer">
                <Cpu size={18} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-slate-500">Protocolo</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Inicio</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Dependencias AI</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Gobernanza Digital</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Auditoría Real</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-slate-500">Soporte Élite</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-3">
                <Phone size={14} className="text-nayarit-orange" />
                <span>Contacto Gubernamental</span>
              </li>
              <li className="flex items-center gap-3">
                <Building2 size={14} className="text-nayarit-orange" />
                <span>Centro de Mando CX</span>
              </li>
              <li className="flex items-center gap-3">
                <FileText size={14} className="text-nayarit-orange" />
                <span>Documentación Técnica</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-white/10 flex flex-col md:row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>© 2026 Protocolo de Gobernanza Digital AI - Connect X. Todos los derechos reservados.</p>
          <p>Impulsado por Google Cloud AI Solution</p>
        </div>
      </div>
    </footer>
  );
};

const SuccessStories = () => {
  const stories = [
    {
      name: "Secretaría de Finanzas",
      role: "Implementación AI",
      text: "Mediante la integración del Protocolo CX, hemos automatizado el 85% de las conciliaciones financieras, permitiendo la transición del capital humano hacia el análisis estratégico de alto nivel.",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1974&auto=format&fit=crop"
    },
    {
      name: "Dependencia de Obras Públicas",
      role: "Certificación Digital",
      text: "La inteligencia predictiva de G-Agente CX nos permite mitigar desviaciones presupuestarias en tiempo real, consolidando una cultura de innovación y eficiencia operativa sin precedentes.",
      image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1974&auto=format&fit=crop"
    }
  ];

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-16 uppercase tracking-tight">Impacto Estratégico: Casos de Éxito en Dependencias Federales</h2>
        <div className="grid md:grid-cols-2 gap-12">
          {stories.map((s, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 flex flex-col md:flex-row gap-6 items-center md:items-start">
              <img 
                src={s.image} 
                alt={s.name} 
                className="w-20 h-20 rounded-full object-cover border-4 border-slate-50"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-slate-600 italic mb-4">"{s.text}"</p>
                <p className="font-bold text-slate-900">{s.name}</p>
                <p className="text-xs text-slate-500 uppercase tracking-widest">{s.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AIDiagnostic = () => {
  const [employees, setEmployees] = useState(500);
  const manualHoursPerMonth = employees * 20; // 20 hours of manual tasks per employee
  const aiEfficiencyGain = 0.65; // 65% efficiency gain
  
  const savedHours = Math.round(manualHoursPerMonth * aiEfficiencyGain);
  const economicImpact = savedHours * 150; // $150 per hour estimated value

  return (
    <section id="diagnostico" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-wider mb-6">
              <Zap size={14} />
              Simulador de Impacto AI
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">¿Cuál es el potencial de su Dependencia?</h2>
            <p className="text-slate-600 mb-8">
              Calcule el ahorro operativo y la liberación de talento humano al implementar el Protocolo CX.
            </p>
            
            <div className="space-y-8">
              <div>
                <div className="flex justify-between mb-4">
                  <label className="font-bold text-slate-700">Número de Servidores Públicos</label>
                  <span className="text-nayarit-orange font-mono font-bold text-xl">{employees}</span>
                </div>
                <input 
                  type="range" 
                  min="50" 
                  max="5000" 
                  step="50"
                  value={employees} 
                  onChange={(e) => setEmployees(parseInt(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-nayarit-orange"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                  <p className="text-xs text-slate-500 uppercase mb-2">Horas Manuales / Mes</p>
                  <p className="text-2xl font-bold text-slate-400">{manualHoursPerMonth.toLocaleString()}</p>
                </div>
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-100">
                  <p className="text-xs text-emerald-600 uppercase mb-2">Horas Liberadas AI</p>
                  <p className="text-2xl font-bold text-emerald-700">{savedHours.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="p-4 bg-emerald-600 rounded-xl text-white text-center font-bold">
                Impacto en Eficiencia: +{Math.round(aiEfficiencyGain * 100)}% de Capacidad Operativa
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Cpu size={200} />
            </div>
            <h3 className="text-2xl font-bold mb-6">Ruta de Modernización</h3>
            <ul className="space-y-4">
              {[
                "Auditoría de Procesos Manuales",
                "Implementación de G-Agente CX",
                "Integración con Google Cloud AI",
                "Certificación de Transparencia Inmutable"
              ].map((req, i) => (
                <li key={i} className="flex items-center gap-3">
                  <CheckCircle2 className="text-emerald-500" size={20} />
                  <span>{req}</span>
                </li>
              ))}
            </ul>
            <button className="w-full mt-10 bg-nayarit-orange py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20">
              Solicitar Diagnóstico Completo
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQ = () => {
  const faqs = [
    { q: "¿Cómo garantiza el Protocolo CX la transparencia?", a: "Utilizamos un registro inmutable de auditoría forense donde cada decisión de la IA y cada movimiento administrativo queda sellado digitalmente, impidiendo cualquier alteración posterior." },
    { q: "¿Es compatible con los sistemas gubernamentales actuales?", a: "Sí, nuestra arquitectura basada en Google Cloud permite una integración fluida mediante APIs seguras, modernizando lo existente sin interrupciones críticas." },
    { q: "¿Qué rol tiene el G-Agente CX?", a: "Es un asesor de mando avanzado que procesa millones de datos en tiempo real para ofrecer recomendaciones estratégicas, alertas de riesgo y optimización de recursos a los titulares de las dependencias." }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Preguntas Frecuentes</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group border border-slate-200 rounded-2xl p-6 [&_summary::-webkit-details-marker]:hidden cursor-pointer">
              <summary className="flex items-center justify-between gap-4">
                <h3 className="font-bold text-slate-900">{faq.q}</h3>
                <ChevronRight className="group-open:-rotate-90 transition-transform text-slate-400" />
              </summary>
              <p className="mt-4 text-slate-600 leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};

const ManifestoSection = () => {
  return (
    <section id="manifiesto" className="py-24 bg-slate-900 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <Globe size={400} className="translate-x-1/4 translate-y-1/4 rotate-12 text-white" />
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 leading-tight">
              El Manifiesto de la <span className="text-nayarit-orange">Soberanía Digital.</span>
            </h2>
            <p className="text-xl text-slate-400 mb-12 leading-relaxed">
              Postulamos un Estado donde la tecnología es el pilar de la soberanía y la justicia social. El Protocolo CX erradica la opacidad mediante innovación sistémica diaria.
            </p>
            <div className="space-y-6">
              {[
                { title: "Innovación Sistémica Continua", desc: "Cada día es una oportunidad para optimizar la arquitectura del servicio al ciudadano.", icon: <Zap className="text-nayarit-orange" /> },
                { title: "Integridad Forense Absoluta", desc: "Auditoría forense en tiempo real para cada peso de capital público.", icon: <ShieldCheck className="text-emerald-500" /> },
                { title: "Primacía Tecnológica Nacional", desc: "Posicionando a México en la vanguardia global con Google AI.", icon: <BarChart3 className="text-blue-500" /> }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="mt-1 shrink-0">{item.icon}</div>
                  <div>
                    <h4 className="font-bold text-white text-lg">{item.title}</h4>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card p-10 rounded-3xl border-white/10"
          >
            <div className="aspect-square rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700">
              <img 
                src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
                alt="Digital Governance" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const TechnologySection = () => {
  return (
    <section id="tecnologia" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold uppercase tracking-wider mb-4">
            <Zap size={14} />
            Infraestructura Google AI
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Infraestructura Tecnológica de Grado Soberano</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Nuestra arquitectura aprovecha la potencia de Google Cloud y Vertex AI para cimentar una soberanía digital absoluta y una eficiencia operativa de élite.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-indigo-500/20">
              <Cpu size={28} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-900">Motores Cognitivos Vertex AI</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Modelos de lenguaje avanzados entrenados específicamente para la normativa y procesos estratégicos de la administración pública nacional.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-emerald-500/20">
              <ShieldCheck size={28} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-900">Blindaje de Datos y Criptografía</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Encriptación de grado militar y cumplimiento estricto con las leyes de soberanía de datos personales en posesión de sujetos obligados.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all">
            <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg shadow-blue-500/20">
              <Globe size={28} />
            </div>
            <h3 className="text-xl font-bold mb-4 text-slate-900">Resiliencia y Escalabilidad Soberana</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Infraestructura elástica que se adapta a la demanda nacional, garantizando disponibilidad total 24/7 bajo protocolos de resiliencia.
            </p>
          </div>
        </div>

        {/* Technical Stack Details */}
        <div className="mb-20 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Componentes de Infraestructura</h3>
            <div className="space-y-8">
              {[
                {
                  title: "Google Cloud Platform (GCP)",
                  desc: "Utilizamos Cloud Functions y App Engine para el procesamiento de lógica de negocio pesada, garantizando escalabilidad automática ante picos de demanda.",
                  icon: <Building2 className="text-blue-600" />
                },
                {
                  title: "Firebase Realtime Ecosystem",
                  desc: "Firestore para sincronización de datos en tiempo real y Auth para seguridad de acceso. La persistencia local de Firebase es la clave del soporte offline.",
                  icon: <Zap className="text-amber-500" />
                },
                {
                  title: "Vertex AI & Gemini",
                  desc: "Integración nativa con los modelos de IA más avanzados del mundo para análisis predictivo y automatización inteligente de trámites.",
                  icon: <Cpu className="text-indigo-600" />
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 shrink-0 rounded-xl bg-slate-100 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <BarChart3 size={120} />
            </div>
            <h4 className="text-xl font-bold mb-6">Garantía de Escalabilidad</h4>
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm font-bold text-nayarit-orange mb-1">Capacidad de Carga</p>
                <p className="text-slate-400 text-xs">Soporta hasta 50,000 transacciones concurrentes por segundo mediante balanceo de carga en GCP.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm font-bold text-emerald-400 mb-1">Disponibilidad (SLA)</p>
                <p className="text-slate-400 text-xs">Garantizamos un 99.9% de tiempo de actividad gracias a la infraestructura distribuida de Google.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <p className="text-sm font-bold text-blue-400 mb-1">Seguridad de Datos</p>
                <p className="text-slate-400 text-xs">Encriptación AES-256 en reposo y TLS 1.3 en tránsito para toda la información sensible.</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Integration Flow */}
        <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-16 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
            <Zap size={400} className="translate-x-1/4 -translate-y-1/4 text-white" />
          </div>
          
          <h3 className="text-3xl font-bold mb-12 text-center">Flujo de Integración de Datos</h3>
          
          <div className="grid md:grid-cols-4 gap-4 relative z-10">
            {[
              { step: "01", title: "Diagnóstico AI", desc: "Evaluación de procesos manuales y cuellos de botella." },
              { step: "02", title: "Entrenamiento", desc: "Ajuste de modelos Vertex AI a la normativa específica." },
              { step: "03", title: "Despliegue", desc: "Integración de G-Agente CX en el flujo operativo diario." },
              { step: "04", title: "Certificación", desc: "Activación de auditoría forense inmutable en tiempo real." }
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all h-full">
                  <div className="text-nayarit-orange font-mono font-bold text-2xl mb-4">{item.step}</div>
                  <h4 className="font-bold text-lg mb-2">{item.title}</h4>
                  <p className="text-slate-400 text-sm">{item.desc}</p>
                </div>
                {i < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 translate-x-1/2 -translate-y-1/2 z-20">
                    <ArrowRight className="text-nayarit-orange" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const AuditoriaSection = () => {
  return (
    <section id="auditoria" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-600 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck size={14} />
            Transparencia Absoluta
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Auditoría Forense AI</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Cada decisión administrativa es auditada en tiempo real por algoritmos de detección de anomalías, garantizando un gobierno libre de opacidad.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <FileText className="text-nayarit-orange" />
              Trazabilidad Inmutable
            </h3>
            <p className="text-slate-600 mb-6">
              Implementamos un registro descentralizado donde cada trámite y asignación de recursos queda sellado con una estampa de tiempo y firma digital única.
            </p>
            <ul className="space-y-3 text-sm text-slate-500">
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Cero posibilidad de alteración de registros.
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-emerald-500" />
                Acceso público a métricas de eficiencia.
              </li>
            </ul>
          </div>
          <div className="bg-slate-900 p-8 rounded-3xl text-white">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
              <BarChart3 className="text-nayarit-orange" />
              Métricas de Integridad
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400 uppercase tracking-widest">Índice de Transparencia</span>
                  <span className="text-emerald-400 font-bold">99.8%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 w-[99.8%]"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-slate-400 uppercase tracking-widest">Detección de Anomalías</span>
                  <span className="text-blue-400 font-bold">Real-Time</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SoporteGobernanzaSection = ({ onOpenChat }: { onOpenChat: () => void }) => {
  return (
    <section id="soporte" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-nayarit-orange rounded-full blur-[120px]" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-nayarit-orange text-xs font-bold uppercase tracking-wider mb-6">
              <Zap size={14} />
              Soporte Estratégico
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Soporte Técnico y Academia de <span className="text-nayarit-orange">Gobernanza Digital</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Hemos integrado el ADN de innovación en el Protocolo de Gobernanza Digital AI. No solo garantizamos la transparencia, garantizamos que la infraestructura del estado nunca se detenga mediante capacitación continua.
            </p>

            <div className="space-y-6 mb-10">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-nayarit-orange shrink-0">
                  <Cpu size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Soporte Técnico CX</h4>
                  <p className="text-slate-400 text-sm">Asesoría técnica inmediata a través de nuestro chatbot para cualquier módulo de la plataforma.</p>
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot', { detail: { context: 'soporte' } }))}
                    className="text-nayarit-orange text-xs font-bold mt-2 hover:underline"
                  >
                    Hablar con Soporte →
                  </button>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-nayarit-orange shrink-0">
                  <BarChart3 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Auditoría en Tiempo Real</h4>
                  <p className="text-slate-400 text-sm">Monitoreo constante de transacciones y avances de obra para garantizar la transparencia total.</p>
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot', { detail: { context: 'auditoria' } }))}
                    className="text-nayarit-orange text-xs font-bold mt-2 hover:underline"
                  >
                    Ver Auditoría →
                  </button>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-nayarit-orange shrink-0">
                  <Users size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Academia de Gobernanza</h4>
                  <p className="text-slate-400 text-sm">Acceso directo a cursos de profesionalización, ética y administración pública para funcionarios.</p>
                  <button 
                    onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot', { detail: { context: 'academia' } }))}
                    className="text-nayarit-orange text-xs font-bold mt-2 hover:underline"
                  >
                    Ir a la Academia →
                  </button>
                </div>
              </div>
            </div>

            <button 
              onClick={() => window.dispatchEvent(new CustomEvent('open-chatbot', { detail: { context: 'soporte' } }))}
              className="group bg-nayarit-orange hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 shadow-xl shadow-orange-500/20"
            >
              Abrir Centro de Soporte
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-full bg-nayarit-orange flex items-center justify-center font-bold text-xl">CX</div>
                <div>
                  <p className="font-bold">Asesor de Gobernanza Digital</p>
                  <p className="text-xs text-emerald-500 flex items-center gap-1">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                    Soporte Técnico Activo
                  </p>
                </div>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none max-w-[80%]">
                  <p className="text-sm">"¿Cómo puedo auditar el presupuesto de la Secretaría de Obras en tiempo real?"</p>
                </div>
                <div className="bg-nayarit-orange/20 p-4 rounded-2xl rounded-tr-none ml-auto max-w-[80%] border border-nayarit-orange/30">
                  <p className="text-sm">"Accede al módulo de **Auditoría Forense AI**. El sistema te mostrará cada transacción sellada con firma digital y su validación satelital de avance de obra. ¿Deseas ver el reporte de hoy?"</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                  <p className="text-nayarit-orange font-bold text-xl">100%</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Transparencia</p>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                  <p className="text-nayarit-orange font-bold text-xl">24/7</p>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest">Asesoría Real</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const StrategiesSection = () => {
  const strategies = [
    { title: "Primacía Digital Soberana", desc: "Liderazgo absoluto en la digitalización de la gobernanza. Quien domina la tecnología, domina el futuro del estado.", icon: <Zap className="text-nayarit-orange" /> },
    { title: "Control de Activos Críticos (GNSS)", desc: "Monitoreo satelital de alta precisión para cada activo estratégico. Trazabilidad absoluta 24/7.", icon: <MapIcon className="text-blue-500" /> },
    { title: "Transparencia Algorítmica Radical", desc: "Dashboard de integridad en tiempo real. Cero opacidad en la ejecución presupuestaria y operativa.", icon: <Eye className="text-emerald-500" /> },
    { title: "Fideicomiso Digital Inmutable", desc: "Smart Escrow que garantiza la disponibilidad de recursos y su liberación estricta por cumplimiento técnico.", icon: <Lock className="text-indigo-500" /> },
    { title: "Validación por Inteligencia Cognitiva", desc: "Auditoría forense mediante visión artificial para verificar la integridad de la infraestructura nacional.", icon: <Cpu className="text-purple-500" /> },
    { title: "Geocercas de Integridad Sistémica", desc: "Detección automática de desviaciones en sitio. Validación técnica sin intervención de intermediarios opacos.", icon: <Target className="text-red-500" /> },
    { title: "Arquitectura de Resiliencia Offline", desc: "Diseñada para la soberanía en zonas remotas. Sincronización automática de datos críticos de estado.", icon: <Database className="text-slate-500" /> },
    { title: "Desembolso Directo Verificado", desc: "Eliminación de la intermediación burocrática. Pagos íntegros tras validación algorítmica de cumplimiento.", icon: <TrendingUp className="text-emerald-600" /> },
    { title: "Blindaje de Grado Gubernamental", desc: "Protección total de la infraestructura digital contra amenazas persistentes y manipulación de datos.", icon: <ShieldCheck className="text-blue-600" /> },
    { title: "Escudo de Ciberdefensa Nacional", desc: "Protocolo de seguridad 24/7 con respuesta inmediata ante cualquier intento de vulneración sistémica.", icon: <LifeBuoy className="text-orange-500" /> },
    { title: "Academia de Gobernanza de Élite", desc: "Profesionalización continua de los cuadros técnicos para elevar el estándar de servicio al estado.", icon: <Award className="text-amber-500" /> },
    { title: "Enlace Institucional 24/7", desc: "Asesoría estratégica y resolución de crisis en tiempo real para la continuidad del mando gubernamental.", icon: <Phone className="text-blue-400" /> },
    { title: "Métricas de Impacto Sistémico", desc: "Optimización de procesos basada en datos reales, maximizando el retorno social de cada peso invertido.", icon: <BarChart3 className="text-indigo-400" /> },
    { title: "Erradicación de la Discrecionalidad", desc: "Algoritmos de validación que reemplazan el juicio humano subjetivo. El sistema es el garante de la ley.", icon: <CheckCircle2 className="text-emerald-400" /> },
    { title: "Atracción de Capital Estratégico", desc: "Infraestructura lista para proyectos de escala global mediante transparencia certificada y seguridad jurídica.", icon: <Building2 className="text-slate-700" /> },
    { title: "Mitigación de Riesgos de Estado", desc: "Alertas predictivas de desviaciones estratégicas, permitiendo una intervención preventiva y soberana.", icon: <AlertCircle className="text-red-400" /> },
    { title: "Empoderamiento del Servidor Público", desc: "Herramientas de élite y procesos transparentes. El funcionario es el motor de la transformación nacional.", icon: <Users className="text-blue-500" /> },
    { title: "Trazabilidad Satelital Absoluta", desc: "Posicionamiento GNSS de grado industrial para la certificación inmutable de la infraestructura pública.", icon: <Zap className="text-nayarit-orange" /> },
    { title: "Contratos Inteligentes de Estado", desc: "Cumplimiento automatizado de protocolos técnicos. Si la obra cumple, el sistema ejecuta el desembolso.", icon: <FileText className="text-slate-500" /> },
    { title: "Escalabilidad Elástica Soberana", desc: "Infraestructura capaz de orquestar la totalidad de las dependencias federales con rendimiento crítico.", icon: <Globe className="text-blue-600" /> },
  ];

  return (
    <section id="estrategias" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nayarit-orange/10 text-nayarit-orange text-xs font-bold uppercase tracking-wider mb-4">
            <TrendingUp size={14} />
            Diferenciación Estratégica
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">20 Estrategias de Liderazgo Digital</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            Por qué Gobernanza Digital CX es la única opción viable para la modernización del estado y la atracción de grandes capitales globales.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {strategies.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl bg-white border border-slate-100 hover:shadow-xl transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:bg-nayarit-orange/10 transition-colors">
                  {s.icon}
                </div>
                <span className="text-[10px] font-bold text-slate-400 font-mono">{(i + 1).toString().padStart(2, '0')}</span>
              </div>
              <h3 className="font-bold text-slate-900 mb-2 text-sm">{s.title}</h3>
              <p className="text-slate-500 text-[10px] leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 rounded-[3rem] bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <Building2 size={300} />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h3 className="text-3xl font-bold mb-6">El Imán de Inversión Estratégica Nacional</h3>
            <p className="text-xl text-slate-400 leading-relaxed mb-8">
              Al desplegar una infraestructura digital de grado soberano, neutralizamos el riesgo político y operativo. Esto transforma a la nación en un ecosistema fértil para el capital global y los consorcios de infraestructura más avanzados, garantizando que cada recurso sea auditado algorítmicamente y cada activo sea validado satelitalmente bajo estándares de integridad absoluta.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest">Soberanía de Capital</div>
              <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest">Integridad Quirúrgica</div>
              <div className="px-4 py-2 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase tracking-widest">Transparencia Algorítmica</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Chatbot = ({ onNavigate }: { onNavigate?: (id: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [context, setContext] = useState<'soporte' | 'academia' | 'general'>('general');

  useEffect(() => {
    const handleOpen = (e: any) => {
      const newContext = e.detail?.context || 'general';
      setContext(newContext);
      setIsOpen(true);
      
      // If context is provided, show specific greeting immediately
      if (newContext !== 'general') {
        let greeting = "";
        if (newContext === 'soporte') {
          greeting = "Hola, soy tu asesor en **soporte técnico** de Gobernanza Digital. ¿En qué puedo ayudarte hoy con la plataforma?";
        } else if (newContext === 'academia') {
          greeting = "Hola, soy tu asesor en la **Academia de Gobernanza**. ¿En qué puedo ayudarte hoy con tu profesionalización?";
        }
        setMessages([{ text: greeting, isBot: true }]);
      } else {
        // Default initial question
        setMessages([{ text: "¡Hola! Bienvenido al Protocolo de Gobernanza Digital. ¿Necesitas ayuda con **Soporte** o **Academia**?", isBot: true }]);
      }
    };
    window.addEventListener('open-chatbot', handleOpen as EventListener);
    return () => window.removeEventListener('open-chatbot', handleOpen as EventListener);
  }, []);

  const [messages, setMessages] = useState([
    { text: "Bienvenido, Líder. Soy **G-Agente CX**, su Inteligencia de Gobernanza Multidisciplinaria. ¿En qué área de la soberanía nacional requiere mi asesoría hoy?", isBot: true }
  ]);
  const [history, setHistory] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const clearChat = () => {
    setContext('general');
    setMessages([{ text: "Bienvenido, Líder. Soy **G-Agente CX**, su Inteligencia de Gobernanza Multidisciplinaria. ¿En qué área de la soberanía nacional requiere mi asesoría hoy?", isBot: true }]);
    setHistory([]);
  };

  const getQuickActions = () => {
    if (context === 'general') {
      return [
        { label: "Soberanía Digital", prompt: "¿Cómo asegura G-Agente CX la soberanía digital del estado?" },
        { label: "Auditoría Forense", prompt: "Explícame el proceso de auditoría forense con Connect X Ledger." },
        { label: "Academia de Gobernanza", prompt: "Quiero conocer los cursos de Ética Digital, Gestión de Datos Públicos y Liderazgo con IA." }
      ];
    }
    if (context === 'soporte') {
      return [
        { label: "Protocolo de Riesgo", prompt: "Activar protocolo de detección de anomalías en tiempo real." },
        { label: "Soporte Técnico", prompt: "Necesito asistencia técnica con la plataforma." }
      ];
    }
    if (context === 'academia') {
      return [
        { label: "Ética Digital", prompt: "Háblame sobre el curso de Ética Digital." },
        { label: "Gestión de Datos", prompt: "Háblame sobre el curso de Gestión de Datos Públicos." },
        { label: "Liderazgo con IA", prompt: "Háblame sobre el curso de Liderazgo con IA." }
      ];
    }
    return [];
  };

  const quickActions = getQuickActions();

  const handleSend = async (textOverride?: string) => {
    const messageText = textOverride || input;
    if (!messageText.trim() || isTyping) return;

    // Local handling for initial context selection
    if (context === 'general' && (messageText === 'Soporte' || messageText === 'Academia')) {
      const userMsg = { text: messageText, isBot: false };
      setMessages(prev => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);
      
      setTimeout(() => {
        const newCtx = messageText.toLowerCase() as 'soporte' | 'academia';
        setContext(newCtx);
        let greeting = "";
        if (newCtx === 'soporte') {
          greeting = "Hola, soy tu asesor en **soporte técnico** de Gobernanza Digital. ¿En qué puedo ayudarte hoy con la plataforma?";
        } else {
          greeting = "Hola, soy tu asesor en la **Academia de Gobernanza**. ¿En qué puedo ayudarte hoy con tu profesionalización?";
        }
        setMessages(prev => [...prev, { text: greeting, isBot: true }]);
        setIsTyping(false);
      }, 600);
      return;
    }

    // Special handling for Audit/Activar Mystery
    if (messageText.toLowerCase().includes('auditoria') || messageText.toLowerCase().includes('mystery')) {
      const userMsg = { text: messageText, isBot: false };
      setMessages(prev => [...prev, userMsg]);
      setInput("");
      setIsTyping(true);
      
      setTimeout(() => {
        const botMsg = { 
          text: "Contamos con un protocolo interno llamado **'Activar Mystery'** que garantiza la transparencia total y elimina cualquier posibilidad de 'vender humo'. ¿Te gustaría ver la consola de validación técnica en tiempo real?", 
          isBot: true 
        };
        setMessages(prev => [...prev, botMsg]);
        setIsTyping(false);
      }, 600);
      return;
    }

    if (messageText === 'Ver Auditoría' && onNavigate) {
      onNavigate('auditoria');
      setIsOpen(false);
      return;
    }

    const userMessage = { text: messageText, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await genAI.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [...history, { role: "user", parts: [{ text: messageText }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
        }
      });

      const botText = response.text || "Lo siento, tuve un problema procesando tu solicitud. Por favor intenta de nuevo.";
      const botMessage = { text: botText, isBot: true };
      
      setMessages(prev => [...prev, botMessage]);
      setHistory(prev => [
        ...prev,
        { role: "user", parts: [{ text: messageText }] },
        { role: "model", parts: [{ text: botText }] }
      ]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { text: "Error de conexión. Por favor intenta más tarde.", isBot: true }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, x: 20 }}
            className="mb-4 mr-2 bg-white px-4 py-2 rounded-2xl shadow-xl border border-slate-100 text-slate-700 text-sm font-bold flex items-center gap-2"
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Hola, soy G-Agente CX. ¿En qué le asesoro?
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white w-80 md:w-96 h-[600px] rounded-[2.5rem] shadow-2xl border border-slate-200 flex flex-col overflow-hidden mb-4"
          >
            {/* Header - WhatsApp Style */}
            <div className="bg-[#075E54] p-5 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center overflow-hidden border-2 border-white/30">
                  <div className="w-full h-full flex items-center justify-center bg-slate-800 text-white font-bold text-xl">CX</div>
                </div>
                <div>
                  <p className="text-base font-bold leading-none mb-1">G-Agente CX</p>
                  <p className="text-[10px] opacity-80 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    En línea • Inteligencia de Estado
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={clearChat}
                  title="Limpiar chat"
                  className="hover:bg-white/10 p-2 rounded-full transition-colors text-white/80 hover:text-white"
                >
                  <Clock size={18} />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-white/10 p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>
            
            {/* Messages Area - WhatsApp Background Pattern */}
            <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-[#E5DDD5] scroll-smooth relative">
              <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://w7.pngwing.com/pngs/414/832/png-transparent-whatsapp-whatsapp-background-whatsapp-wallpaper-whatsapp-pattern-whatsapp-chat-background-thumbnail.png")', backgroundSize: '400px' }} />
              
              <div className="relative z-10 space-y-4">
                {messages.map((m, i) => (
                  <div key={i} className={cn("flex", m.isBot ? "justify-start" : "justify-end")}>
                    <div className={cn(
                      "max-w-[85%] p-3 rounded-xl text-sm leading-relaxed shadow-sm relative",
                      m.isBot 
                        ? "bg-white text-slate-700 rounded-tl-none" 
                        : "bg-[#DCF8C6] text-slate-800 rounded-tr-none"
                    )}>
                      {m.isBot ? (
                        <div className="markdown-body prose prose-sm prose-slate max-w-none">
                          <Markdown>{m.text}</Markdown>
                        </div>
                      ) : (
                        m.text
                      )}
                      <div className="text-[9px] opacity-40 text-right mt-1">
                        {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-xl rounded-tl-none flex items-center gap-2 shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Escalation Button */}
              {messages.length > 3 && !isTyping && (
                <div className="flex flex-col items-center gap-2 pt-2 relative z-10">
                  {messages[messages.length - 1].text.includes("¿Te gustaría ver la consola de auditoría") && (
                    <button 
                      onClick={() => handleSend("Ver Auditoría")}
                      className="text-[10px] font-bold text-white flex items-center gap-1 bg-nayarit-orange px-4 py-2 rounded-full shadow-sm border border-orange-600 transition-all hover:bg-orange-600"
                    >
                      <Eye size={12} />
                      Abrir Consola de Auditoría
                    </button>
                  )}
                  <button 
                    onClick={() => handleSend("Necesito hablar con un asesor humano de inmediato.")}
                    className="text-[10px] font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-slate-200 transition-all"
                  >
                    <LifeBuoy size={12} className="text-nayarit-orange" />
                    Escalar a soporte humano
                  </button>
                </div>
              )}
              
              {/* Quick Actions */}
              {(messages.length === 1 || (messages.length === 2 && context !== 'general') || (messages.length === 3 && context !== 'general')) && !isTyping && quickActions.length > 0 && (
                <div className="pt-4 space-y-2 relative z-10">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 text-center">Acciones Rápidas</p>
                  <div className="grid grid-cols-1 gap-2">
                    {quickActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(action.prompt)}
                        className="w-full text-left p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-slate-200 hover:border-nayarit-orange hover:text-nayarit-orange transition-all text-xs font-medium flex justify-between items-center group shadow-sm"
                      >
                        {action.label}
                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Input Area - WhatsApp Style */}
            <div className="p-4 bg-[#F0F0F0] flex gap-2 items-center">
              <div className="flex-1 bg-white rounded-full px-4 py-2 flex items-center shadow-sm border border-slate-200">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Escribe un mensaje..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-1"
                />
              </div>
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim() || isTyping}
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-md",
                  input.trim() && !isTyping ? "bg-[#128C7E] text-white" : "bg-slate-300 text-slate-500"
                )}
              >
                {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Chat Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-2xl shadow-emerald-500/40 relative"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold">
            1
          </span>
        )}
      </motion.button>
    </div>
  );
};

const MysteryShopAudit = () => {
  const [status, setStatus] = useState<'idle' | 'running' | 'completed'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [liveEvents, setLiveEvents] = useState<string[]>([]);

  useEffect(() => {
    const events = [
      "Gobernanza Digital: Nodo de Obra Pública #452 validado.",
      "IA Metrics: Gasto real vs. Unidades de trabajo (98.2% match).",
      "Validación: 48 dependencias integradas en tiempo real.",
      "Smart Escrow: Pago de $1.2M MXN liberado tras validación IA.",
      "GNSS: Avance de obra detectado en Libramiento Tepic (92.4%).",
      "Transparencia: Auditoría de personal en sitio completada sin anomalías.",
    ];

    const interval = setInterval(() => {
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      setLiveEvents(prev => [randomEvent, ...prev].slice(0, 5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const runAudit = () => {
    setStatus('running');
    setLogs([]);
    setScore(0);

    const steps = [
      { msg: "Iniciando Protocolo de Auditoría Forense: Arquitectura de Soberanía CX v8.0.", delay: 800 },
      { msg: "Escaneo Sistémico de 48 Dependencias Federales: Identificación de Brechas de Integridad.", delay: 1200 },
      { msg: "Validación de Activos Críticos en Tiempo Real: Infraestructura Estratégica #402.", delay: 1500 },
      { msg: "Análisis de Desviación Presupuestaria mediante Inteligencia Cognitiva...", delay: 1000 },
      { msg: "Verificación de Capital Humano: Auditoría de Presencia y Productividad en Sitio.", delay: 1800 },
      { msg: "Sincronización de Ledger Inmutable: Registro de Transacciones de Grado Soberano.", delay: 1200 },
      { msg: "Certificación de Infraestructura Digital: Validación de Anclaje y Resiliencia.", delay: 1000 },
      { msg: "Generación de Reporte Ejecutivo de Soberanía para el Mando Central... [OK]", delay: 1000 },
      { msg: "Detección de Anomalías y Riesgos Sistémicos: Auditoría de Colusión en Tiempo Real.", delay: 1500 },
      { msg: "Integración con Google Cloud AI: Despliegue de Oráculos de Gobernanza.", delay: 1200 },
      { msg: "Protocolo Finalizado: Integridad Sistémica Restablecida y Certificada.", delay: 800 },
    ];

    let currentDelay = 0;
    steps.forEach((step, index) => {
      currentDelay += step.delay;
      setTimeout(() => {
        setLogs(prev => [...prev, step.msg]);
        if (index === steps.length - 1) {
          setStatus('completed');
          setScore(100);
        }
      }, currentDelay);
    });
  };

  return (
    <section id="auditoria" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-4">
            <Eye size={14} />
            Protocolo de Auditoría Forense: Mystery Audit CX
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-4">
            Métricas de <span className="text-nayarit-orange">Soberanía e Integridad Sistémica</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Auditoría en tiempo real de la infraestructura nacional. Validamos la ejecución física contra el registro digital, eliminando la opacidad mediante inteligencia algorítmica de élite.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6">
              {status === 'running' && <Loader2 className="animate-spin text-nayarit-orange" size={24} />}
              {status === 'completed' && <CheckCircle2 className="text-emerald-500" size={24} />}
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Database size={20} className="text-nayarit-orange" />
              Consola de Auditoría en Tiempo Real
            </h3>

            <div className="bg-slate-900 rounded-2xl p-6 h-[400px] overflow-y-auto font-mono text-xs text-emerald-400 space-y-2 custom-scrollbar">
              {logs.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 italic">
                  <Cpu size={40} className="mb-4 opacity-20" />
                  Esperando activación del Protocolo Mystery Audit...
                </div>
              )}
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex gap-3"
                >
                  <span className="text-slate-600">[{new Date().toLocaleTimeString()}]</span>
                  <span>{log}</span>
                </motion.div>
              ))}
              {status === 'running' && (
                <div className="flex gap-2 items-center text-slate-500">
                  <span className="w-1 h-1 bg-emerald-500 rounded-full animate-ping" />
                  Ejecutando Análisis Forense...
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <button 
                onClick={runAudit}
                disabled={status === 'running'}
                className={cn(
                  "px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2",
                  status === 'running' 
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                    : "bg-nayarit-orange text-white hover:bg-orange-600 shadow-lg shadow-orange-500/20"
                )}
              >
                {status === 'idle' ? "Activar Mystery Audit" : status === 'running' ? "Auditando..." : "Reiniciar Protocolo"}
                <Zap size={20} />
              </button>
              
              {status === 'completed' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-right"
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score de Cumplimiento</p>
                  <p className="text-4xl font-black text-emerald-500">{score}%</p>
                </motion.div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-slate-900 p-6 rounded-3xl shadow-xl border border-white/10">
              <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                Live Feed: Connect X Infrastructure
              </h4>
              <div className="space-y-3">
                {liveEvents.map((event, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[10px] font-mono text-slate-400 border-l border-emerald-500/30 pl-3 py-1"
                  >
                    {event}
                  </motion.div>
                ))}
                {liveEvents.length === 0 && (
                  <p className="text-[10px] font-mono text-slate-600 italic">Iniciando feed de datos...</p>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center shrink-0">
                <Globe className="text-purple-600" size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Matriz de Escalabilidad Nacional</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Análisis de impacto sistémico: 48 dependencias federales integradas bajo el Protocolo CX para la automatización de auditoría, logística y certificación de infraestructura crítica.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 flex items-center justify-center shrink-0">
                <ShieldCheck className="text-nayarit-orange" size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Protocolo de Auditoría Forense CX</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  El motor 'Mystery Audit' verifica la capacidad técnica real de la infraestructura en tiempo real, garantizando que la ejecución física coincida con el registro digital sin desviaciones.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center shrink-0">
                <Cpu className="text-emerald-600" size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Inteligencia Cognitiva G-Agente</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Despliegue de modelos de lenguaje de élite para la gestión de crisis, análisis de coherencia institucional y optimización de la interfaz ciudadano-estado sin fricción operativa.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                <Award size={28} className="text-blue-600" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Índice de Madurez Tecnológica (Google Cloud)</h4>
                <div className="flex items-center gap-4 mb-3">
                  <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="bg-blue-600 h-full w-[94%]" />
                  </div>
                  <span className="text-sm font-bold text-blue-600">94%</span>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Certificación de infraestructura elástica y segura. Puntos críticos: Resiliencia sistémica, soberanía de datos y escalabilidad masiva bajo estándares globales.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex gap-6 items-start">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center shrink-0">
                <Lock className="text-blue-600" size={28} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Soberanía de Datos e Inmutabilidad</h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Anclaje de cada transacción en el ledger distribuido de Connect X, estableciendo una infraestructura digital donde la trazabilidad es absoluta y el dato es la única fuente de verdad.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const ExecutivePresentation = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  const slides = [
    {
      title: "Soberanía Digital: El Nuevo Paradigma del Estado",
      subtitle: "Arquitectura de Modernización para la Infraestructura del Servicio Público",
      content: "Gobernanza Digital CX es la arquitectura evolutiva diseñada para refundar la operatividad de las 48 dependencias federales, garantizando transparencia algorítmica y auditoría de métricas en tiempo real.",
      image: "https://picsum.photos/seed/mexico-vision/1200/800",
      pill: "Visión Estratégica",
      points: ["Soberanía Tecnológica", "Transparencia Radical", "Integración Sistémica Federal"]
    },
    {
      title: "Anatomía de la Ineficiencia: El Costo de la Opacidad",
      subtitle: "Mitigación de Riesgo Político y Fricción Operativa",
      content: "Los sistemas obsoletos perpetúan la discrecionalidad y la falta de trazabilidad. Esto compromete la infraestructura nacional, erosiona la confianza del inversor y genera pasivos inaceptables para el erario.",
      image: "https://picsum.photos/seed/risk/1200/800",
      pill: "Diagnóstico de Estado",
      points: ["Fuga de Capitales", "Intermediación Opaca", "Incertidumbre Presupuestaria"]
    },
    {
      title: "Connect X: El Motor de la Transformación",
      subtitle: "Infraestructura Digital de Grado Industrial y Soberano",
      content: "Nuestra tecnología (GCP, Firebase, GNSS) orquestada por Connect X permite la digitalización absoluta de la obra pública. Eliminamos la subjetividad humana mediante protocolos de validación técnica inmutables.",
      image: "https://picsum.photos/seed/tech-engine/1200/800",
      pill: "Motor Tecnológico CX",
      points: ["Validación por IA Forense", "Sincronización Satelital", "Escalabilidad Multidimensional"]
    },
    {
      title: "Gobernanza Algorítmica: Fideicomisos Digitales",
      subtitle: "Smart Escrow para la Inversión Segura y Directa",
      content: "Implementamos desembolsos automatizados vinculados estrictamente al cumplimiento técnico verificado. Si la meta física se cumple, el capital se libera. Cero intermediarios, cero desviaciones.",
      image: "https://picsum.photos/seed/governance/1200/800",
      pill: "Modelo de Gobernanza CX",
      points: ["Cero Discrecionalidad", "Trazabilidad Financiera", "Eficiencia en el Gasto"]
    },
    {
      title: "Estrategias de Soberanía: La Hoja de Ruta del Estado",
      subtitle: "Protocolos de Liderazgo para un Estado Moderno",
      content: "Nuestras estrategias diferencian este modelo de cualquier sistema previo, enfocándose en la primacía digital, el control de activos críticos y la transparencia radical.",
      image: "https://picsum.photos/seed/strategies-list/1200/800",
      pill: "Estrategias de Élite",
      points: ["Primacía Digital CX", "Control de Activos Críticos", "Escudo de Ciberseguridad", "Academia de Gobernanza"]
    },
    {
      title: "Misión de Impacto: IA para el Bien Común",
      subtitle: "Alineación con Google.org y Tecnologías Evolutivas",
      content: "Nuestra misión es transformar la gobernanza en una fuerza de cambio positivo, utilizando Google AI Studio para resolver desafíos de equidad económica y resiliencia comunitaria en las 48 dependencias.",
      image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200",
      pill: "Impacto Social",
      points: ["Bien Común", "Sostenibilidad", "Oportunidad Económica", "Resiliencia"]
    },
    {
      title: "Nayarit como Imán de Inversión Global",
      subtitle: "Atracción de Capitales (Modelo Slim / Grandes Constructoras)",
      content: "Al ofrecer certeza jurídica y técnica, Nayarit se convierte en el destino preferido para los grandes capitales. Invertir en un estado con trazabilidad digital es invertir con riesgo cero.",
      image: "https://picsum.photos/seed/investment-global/1200/800",
      pill: "Impacto Económico",
      points: ["Certeza Jurídica", "Riesgo de Inversión Cero", "Desarrollo Regional"]
    },
    {
      title: "Llamado a la Acción: Gobernanza Digital Ahora",
      subtitle: "Hacia un Estado Renovado y Transparente",
      content: "Es momento de que la infraestructura del servicio público sea un activo digital. Gobernanza Digital CX está lista para renovar las 48 dependencias gubernamentales de México.",
      image: "https://picsum.photos/seed/action-final/1200/800",
      pill: "Siguiente Paso",
      points: ["Activación Inmediata", "Validación de Métricas", "Transparencia Total"]
    }
  ];

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(22);
    doc.setTextColor(242, 125, 38); // Nayarit Orange
    doc.text("Gobernanza Digital CX", 20, 20);
    
    doc.setFontSize(16);
    doc.setTextColor(20, 20, 20);
    doc.text("Presentación Ejecutiva de Modernización Digital", 20, 30);
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generado el: ${new Date().toLocaleDateString()}`, 20, 35);
    
    let yPos = 50;
    
    slides.forEach((slide, index) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(14);
      doc.setTextColor(242, 125, 38);
      doc.text(`${index + 1}. ${slide.title}`, 20, yPos);
      yPos += 7;
      
      doc.setFontSize(11);
      doc.setTextColor(50, 50, 50);
      doc.text(slide.subtitle, 20, yPos);
      yPos += 7;
      
      doc.setFontSize(10);
      doc.setTextColor(80, 80, 80);
      const splitContent = doc.splitTextToSize(slide.content, 170);
      doc.text(splitContent, 20, yPos);
      yPos += (splitContent.length * 5) + 5;
      
      slide.points.forEach(point => {
        doc.text(`• ${point}`, 25, yPos);
        yPos += 5;
      });
      
      yPos += 10;
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text("Documento Confidencial - Gobernanza Digital CX Infrastructure", 20, 285);
    
    doc.save("Protocolo_Gobernanza_Digital_Mexico_AI.pdf");
  };

  useEffect(() => {
    window.addEventListener('download-pdf', handleDownloadPDF);
    return () => window.removeEventListener('download-pdf', handleDownloadPDF);
  }, []);

  return (
    <section id="presentacion" className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 flex justify-between items-end">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-nayarit-orange/20 text-nayarit-orange text-xs font-bold uppercase tracking-wider mb-4">
              Presentación Ejecutiva
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Pitch Deck: Gobernanza Digital AI</h2>
          </div>
          <div className="flex gap-4">
            <button onClick={prevSlide} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white/10 transition-all">
              <ChevronRight size={24} className="rotate-180" />
            </button>
            <button onClick={nextSlide} className="w-12 h-12 rounded-full bg-nayarit-orange flex items-center justify-center hover:bg-orange-600 transition-all">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <div className="relative h-[700px] rounded-[3rem] overflow-hidden bg-slate-800 border border-white/10 shadow-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5, ease: "circOut" }}
              className="absolute inset-0 flex flex-col lg:flex-row"
            >
              <div className="lg:w-1/2 p-12 lg:p-20 flex flex-col justify-center relative z-10">
                <div className="text-nayarit-orange font-mono text-sm font-bold mb-4 uppercase tracking-widest">
                  {slides[activeSlide].pill} — Slide {activeSlide + 1} de {slides.length}
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                  {slides[activeSlide].title}
                </h3>
                <h4 className="text-xl text-slate-400 font-medium mb-8">
                  {slides[activeSlide].subtitle}
                </h4>
                <p className="text-lg text-slate-300 leading-relaxed max-w-xl mb-8">
                  {slides[activeSlide].content}
                </p>
                
                <div className="grid grid-cols-1 gap-3">
                  {slides[activeSlide].points.map((point, i) => (
                    <div key={i} className="flex items-center gap-3 text-white/80 font-medium">
                      <CheckCircle2 className="text-nayarit-orange shrink-0" size={20} />
                      {point}
                    </div>
                  ))}
                </div>

                <div className="mt-12 flex gap-4">
                  <button 
                    onClick={handleDownloadPDF}
                    className="bg-nayarit-orange text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all flex items-center gap-2"
                  >
                    Descargar PDF Completo
                    <FileText size={20} />
                  </button>
                </div>
              </div>

              <div className="lg:w-1/2 relative hidden lg:block overflow-hidden">
                <motion.img
                  key={slides[activeSlide].image}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  src={slides[activeSlide].image}
                  alt={slides[activeSlide].title}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-transparent to-transparent" />
                
                {/* Executive Badge */}
                <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-white">
                  <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-1">Documento Confidencial</p>
                  <p className="text-xs font-bold">Gobernanza Digital CX</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-12 flex justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveSlide(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                activeSlide === i ? "w-12 bg-nayarit-orange" : "w-4 bg-white/20"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const GovernanceAcademy = () => {
  const courses = [
    { title: "Digital Ethics", desc: "Principios éticos para la toma de decisiones en la gobernanza digital." },
    { title: "Public Data Management", desc: "Gestión eficiente y transparente de grandes volúmenes de datos públicos." },
    { title: "AI Leadership", desc: "Liderazgo estratégico para la modernización gubernamental con IA." }
  ];

  return (
    <section id="academia" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">Academia de Gobernanza</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {courses.map((course, i) => (
            <div key={i} className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100">
              <h3 className="text-xl font-bold text-slate-900 mb-4">{course.title}</h3>
              <p className="text-slate-600 mb-6">{course.desc}</p>
              <button className="text-nayarit-orange font-bold hover:text-orange-600">Inscribirse →</button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  return (
    <section id="contacto" className="py-24 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] overflow-hidden shadow-2xl flex flex-col lg:flex-row">
          <div className="lg:w-1/2 p-12 lg:p-20 bg-slate-50">
            <h2 className="text-4xl font-bold text-slate-900 mb-6 uppercase tracking-tight">Consultoría Estratégica y Enlace Institucional</h2>
            <p className="text-slate-600 mb-10 text-lg">
              Ya sea que represente a una de las 48 dependencias federales o sea un socio estratégico de infraestructura, nuestro equipo está preparado para desplegar la arquitectura de Gobernanza Digital CX en su jurisdicción.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-nayarit-orange/10 flex items-center justify-center text-nayarit-orange">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Línea de Mando Directa</p>
                  <p className="text-xl font-bold text-slate-900">+52 384 102 9017</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-blue-600">
                  <Building2 size={24} />
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Sede Operativa Central</p>
                  <p className="text-xl font-bold text-slate-900">México</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2 p-12 lg:p-20 bg-white">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Identidad Institucional</label>
                  <input type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-nayarit-orange/50" placeholder="Ej. Juan Pérez" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Contacto Directo</label>
                  <input type="tel" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-nayarit-orange/50" placeholder="384 102 9017" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Perfil de Acceso</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-nayarit-orange/50">
                  <option>Alto Mando / Funcionario Público</option>
                  <option>Socio Estratégico de Infraestructura</option>
                  <option>Auditoría Externa / Ciudadanía</option>
                  <option>Otro</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 uppercase tracking-wide">Requerimiento Estratégico</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-nayarit-orange/50" placeholder="Describa el alcance de su requerimiento..."></textarea>
              </div>
              <button className="w-full bg-nayarit-orange text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-orange-500/20 hover:bg-orange-600 transition-all uppercase tracking-widest">
                Solicitar Enlace Institucional
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- Main App ---

const MissionSection = () => {
  const missionPoints = [
    {
      title: "Inteligencia Artificial para el Impacto Social",
      desc: "Desarrollamos algoritmos que priorizan el impacto social, asegurando que la tecnología sirva para cerrar brechas de desigualdad en el servicio público.",
      icon: <Globe className="w-8 h-8 text-blue-500" />
    },
    {
      title: "Sostenibilidad y Resiliencia Sistémica",
      desc: "Nuestra infraestructura CX optimiza el uso de recursos naturales y energéticos en las dependencias, alineándonos con los objetivos climáticos globales.",
      icon: <Flame className="w-8 h-8 text-orange-500" />
    },
    {
      title: "Democratización de la Prosperidad",
      desc: "Democratizamos el acceso a datos y procesos transparentes, permitiendo que pequeñas y medianas empresas participen en la economía gubernamental sin barreras.",
      icon: <TrendingUp className="w-8 h-8 text-emerald-500" />
    },
    {
      title: "Resiliencia Predictiva de Estado",
      desc: "Utilizamos IA predictiva para anticipar crisis y desastres, permitiendo que el gobierno responda con precisión quirúrgica para proteger a los más vulnerables.",
      icon: <ShieldCheck className="w-8 h-8 text-indigo-500" />
    }
  ];

  return (
    <section id="mision" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-nayarit-orange font-bold tracking-[0.3em] uppercase text-sm mb-4 block">Manifiesto de Impacto y Soberanía</span>
              <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-8 tracking-tighter leading-none">
                Gobernanza Digital con <span className="text-blue-600">Propósito Humano</span>
              </h2>
              <p className="text-slate-600 text-xl font-light leading-relaxed mb-10">
                Inspirados por la visión global de <span className="font-bold text-slate-900">Google.org</span>, nuestra misión es la transformación radical de la infraestructura en las 48 dependencias gubernamentales en México. Desplegamos tecnologías evolutivas para garantizar una transparencia inmutable y validación algorítmica en tiempo real.
              </p>
              <div className="grid sm:grid-cols-2 gap-8">
                {missionPoints.map((point, i) => (
                  <div key={i} className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center">
                      {point.icon}
                    </div>
                    <h3 className="font-bold text-slate-900">{point.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{point.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
          <div className="lg:w-1/2 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl"
            >
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1000" 
                alt="Impacto Social AI" 
                className="w-full h-[600px] object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent flex flex-col justify-end p-12">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white">
                    <Globe size={20} />
                  </div>
                  <span className="text-white font-bold tracking-widest uppercase text-xs">Iniciativa Global CX</span>
                </div>
                <p className="text-white text-2xl font-light italic">
                  "No se trata de cuánta IA usamos, sino de cuántas vidas transformamos con ella."
                </p>
              </div>
            </motion.div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50 -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-100 rounded-full blur-3xl opacity-50 -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
};

const SovereignPillars = () => {
  const pillars = [
    {
      title: "Arquitectura de Gobernanza Sistémica y Soberanía Operativa",
      desc: "Renovación de la infraestructura crítica de las 48 dependencias gubernamentales mediante arquitectura CX de alto valor estratégico.",
      icon: <Lock className="w-6 h-6" />,
      detail: "48 Dependencias"
    },
    {
      title: "Motores Cognitivos de Disrupción: Ecosistema Google AI",
      desc: "Integración total de infraestructuras evolutivas de Google para garantizar la profesionalización y soberanía digital del Estado.",
      icon: <Zap className="w-6 h-6" />,
      detail: "Google AI Ecosystem"
    },
    {
      title: "Protocolos de Validación Algorítmica de Activos Estratégicos",
      desc: "Validación en tiempo real del gasto en unidades de trabajo y capital humano mediante inteligencia artificial de grado industrial.",
      icon: <Clock className="w-6 h-6" />,
      detail: "Validación IA"
    },
    {
      title: "Blindaje de Integridad: Auditoría Forense e Inmutable",
      desc: "Auditoría algorítmica ininterrumpida sobre las 48 dependencias para erradicar la opacidad y asegurar la excelencia operativa.",
      icon: <Eye className="w-6 h-6" />,
      detail: "Transparencia Absoluta"
    }
  ];

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 data-grid opacity-5" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tight">Infraestructura Crítica de Gobernanza y Soberanía Digital</h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg font-light">
              Transformamos la infraestructura del servicio público mediante una arquitectura lógica, tecnológica y profesional inquebrantable para las 48 dependencias del estado.
            </p>
          </motion.div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 hover:border-nayarit-orange/50 transition-all group prestige-border"
            >
              <div className="w-14 h-14 rounded-2xl bg-nayarit-orange/20 flex items-center justify-center text-nayarit-orange mb-8 group-hover:scale-110 transition-transform duration-500">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
              <p className="text-slate-400 text-sm mb-6 leading-relaxed font-light">{pillar.desc}</p>
              <div className="pt-6 border-t border-white/5">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-nayarit-orange">{pillar.detail}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

function AppContent() {
  const { user, loading } = useAuth();
  const [activeSection, setActiveSection] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <Loader2 className="w-12 h-12 text-nayarit-orange animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-24 h-24 bg-nayarit-orange rounded-[2rem] flex items-center justify-center text-white font-bold text-5xl mb-12 shadow-2xl shadow-orange-500/40 prestige-border"
        >
          CX
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl font-bold text-white mb-6 text-center tracking-tighter"
        >
          PLATAFORMA SOBERANA DE <span className="gold-gradient">GOBERNANZA DIGITAL CX</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 text-center mb-12 max-w-md leading-relaxed font-medium"
        >
          Inicie sesión en la infraestructura crítica de soberanía digital que orquesta la integridad de las 48 dependencias gubernamentales. Trazabilidad inmutable y validación algorítmica de grado industrial.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          onClick={login}
          className="group px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-xl hover:bg-nayarit-orange hover:text-white transition-all duration-500 flex items-center gap-4 shadow-2xl shadow-white/5"
        >
          <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <Globe size={20} className="text-slate-950 group-hover:text-white" />
          </div>
          Autenticación de Seguridad Google AI
        </motion.button>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-20 flex items-center gap-8 opacity-30 grayscale"
        >
          <div className="flex items-center gap-2 font-bold text-xl text-white"><Database size={20}/> Firebase</div>
          <div className="flex items-center gap-2 font-bold text-xl text-white"><ShieldCheck size={20}/> Vertex AI</div>
          <div className="flex items-center gap-2 font-bold text-xl text-white"><Globe size={20}/> Google Cloud</div>
        </motion.div>
      </div>
    );
  }

  const hubItems = [
    { 
      id: 'gobierno', 
      title: 'Arquitectura de Gobernanza Sistémica y Soberanía Operativa', 
      subtitle: 'Protocolo CX-Elite', 
      icon: <Building2 size={32} />, 
      color: 'bg-slate-900',
      desc: 'Ingeniería de procesos de alta precisión para la renovación sistémica de las 48 dependencias gubernamentales con validación de métricas en tiempo real.'
    },
    { 
      id: 'ia-dependencias', 
      title: 'Motores Cognitivos de Disrupción y Transformación Radical', 
      subtitle: 'Soberanía AI', 
      icon: <Zap size={32} />, 
      color: 'bg-nayarit-orange',
      desc: 'Modernización de modelos de trabajo obsoletos mediante el despliegue de infraestructuras evolutivas y motores cognitivos de Google AI.'
    },
    { 
      id: 'tecnologia', 
      title: 'Infraestructura Evolutiva de Vanguardia: Ecosistema Google AI', 
      subtitle: 'Tecnología de Grado Nacional', 
      icon: <Cpu size={32} />, 
      color: 'bg-blue-600',
      desc: 'Integración total de la infraestructura crítica de Google para la toma de decisiones estratégicas basada en datos de alta fidelidad.'
    },
    { 
      id: 'auditoria', 
      title: 'Protocolos de Trazabilidad Inmutable y Auditoría Forense Algorítmica', 
      subtitle: 'Integridad de Activos', 
      icon: <Eye size={32} />, 
      color: 'bg-emerald-700',
      desc: 'Transparencia absoluta mediante la auditoría forense del gasto real, unidades de trabajo y capital humano con certificación inmutable.'
    },
    { 
      id: 'soporte', 
      title: 'Centro de Alta Especialización: Academia de Gobernanza y Ética Digital', 
      subtitle: 'Profesionalización de Élite', 
      icon: <LifeBuoy size={32} />, 
      color: 'bg-nayarit-orange',
      desc: 'Programas de alta especialización en Digital Ethics, Public Data Management y AI Leadership para la élite del servicio público.'
    },
    { 
      id: 'estrategias', 
      title: 'Dirección Estratégica Senior y Liderazgo de Mando Unificado', 
      subtitle: 'Estrategia de Estado', 
      icon: <Target size={32} />, 
      color: 'bg-indigo-700',
      desc: 'Protocolos de modernización estratégica para la transformación radical y soberana del servicio público.'
    },
    { 
      id: 'chat', 
      title: 'G-Agente CX: Inteligencia Estratégica y Oráculo de Gobernanza', 
      subtitle: 'Asesor de Mando Senior', 
      icon: <MessageSquare size={32} />, 
      color: 'bg-slate-800',
      desc: 'Consulta directa con el motor de inteligencia estratégica para la toma de decisiones críticas en tiempo real.'
    },
    { 
      id: 'mando-central', 
      title: 'Centro de Mando Unificado de Operaciones Estratégicas', 
      subtitle: 'Inteligencia de Élite Nacional', 
      icon: <ShieldCheck size={32} />, 
      color: 'bg-slate-950',
      desc: 'Visualización avanzada de métricas estratégicas y detección de riesgos estructurales mediante IA para la soberanía del estado.'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans selection:bg-nayarit-orange/30">
      <Navbar onNavigate={setActiveSection} user={user} onLogout={logout} />
      
      <main className="flex-grow">
        {/* Hero Section - Simplified */}
        <section id="inicio" className="relative pt-32 pb-20 overflow-hidden bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-nayarit-orange/10 text-nayarit-orange text-sm font-bold uppercase tracking-widest mb-8"
              >
                <Zap size={16} />
                Protocolo de Gobernanza Digital AI
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-[1.1]"
              >
                Soberanía Tecnológica: La Nueva Frontera de la <span className="text-nayarit-orange">Gobernanza Sistémica de Élite</span>.
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-slate-500 leading-relaxed mb-12"
              >
                Orquestamos la transformación radical de la infraestructura crítica en las 48 dependencias gubernamentales. Métricas de alta fidelidad validadas mediante el ecosistema cognitivo Google AI con transparencia absoluta y rigor forense.
              </motion.p>
            </div>

            {/* Hub Grid - Psychological Grouping */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {hubItems.map((item, idx) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * idx }}
                  onClick={() => {
                    if (item.id === 'chat') {
                      window.dispatchEvent(new CustomEvent('open-chatbot'));
                    } else {
                      setActiveSection(item.id);
                    }
                  }}
                  className="group relative p-8 rounded-[2.5rem] bg-white border border-slate-200 hover:border-nayarit-orange hover:shadow-2xl hover:shadow-orange-500/10 transition-all text-left overflow-hidden"
                >
                  <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg", item.color)}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-nayarit-orange transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">
                    {item.subtitle}
                  </p>
                  <p className="text-slate-500 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-nayarit-orange font-bold text-sm">
                    Explorar Módulo
                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <MissionSection />
        <AnimatePresence>
          {activeSection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8 bg-slate-900/90 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                className="bg-white w-full max-w-6xl h-full max-h-[90vh] rounded-[3rem] overflow-hidden flex flex-col relative"
              >
                {/* Modal Header */}
                <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-20">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900">
                      {hubItems.find(i => i.id === activeSection)?.title}
                    </h2>
                    <p className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">
                      {hubItems.find(i => i.id === activeSection)?.subtitle}
                    </p>
                  </div>
                  <button 
                    onClick={() => setActiveSection(null)}
                    className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12">

                  {activeSection === 'modular-brain' && (
                    <div className="space-y-12">
                      <ModularBrain />
                    </div>
                  )}
                  {activeSection === 'mando-central' && (
                    <div className="space-y-12">
                      <MandoCentral />
                    </div>
                  )}
                  {activeSection === 'ia-dependencias' && (
                    <div className="space-y-12">
                      <CitizenOS />
                      <SovereignPillars />
                    </div>
                  )}
                  {activeSection === 'gobierno' && (
                    <div className="space-y-12">
                      <DepartmentManager />
                      <GovernmentDashboard />
                      <SovereignPillars />
                      <ReplicabilityMap />
                      <RiskIntelligenceSection />
                      <ImpactChallengeSection />
                      <InteractiveMapDemo />
                      <ThreeGuarantees />
                    </div>
                  )}
                  {activeSection === 'riesgos' && (
                    <div className="space-y-12">
                      <RiskIntelligenceSection />
                      <MysteryShopAudit />
                    </div>
                  )}
                  {activeSection === 'impacto-ia' && (
                    <div className="space-y-12">
                      <ImpactChallengeSection />
                      <TechnologySection />
                    </div>
                  )}
                  {activeSection === 'tecnologia' && (
                    <div className="space-y-12">
                      <SovereignPillars />
                      <TechnologySection />
                      <ManifestoSection />
                    </div>
                  )}
                  {activeSection === 'soporte' && (
                    <div className="space-y-12">
                      <SoporteGobernanzaSection onOpenChat={() => { setActiveSection(null); window.dispatchEvent(new CustomEvent('open-chatbot', { detail: { context: 'soporte' } })); }} />
                      <SuccessStories />
                    </div>
                  )}
                  {activeSection === 'auditoria' && (
                    <div className="space-y-12">
                      <AuditoriaSection />
                    </div>
                  )}
                  {activeSection === 'estrategias' && (
                    <div className="space-y-12">
                      <StrategiesSection />
                      <ExecutivePresentation />
                      <FAQ />
                    </div>
                  )}
                  {activeSection === 'auditoria' && (
                    <div className="space-y-12">
                      <MysteryShopAudit />
                    </div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust Bar - Psychological Social Proof */}
        <section className="py-12 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.3em] mb-8">Infraestructura Respaldada por</p>
            <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
              <div className="flex items-center gap-2 font-bold text-2xl text-blue-600"><Globe size={24}/> Google Cloud</div>
              <div className="flex items-center gap-2 font-bold text-2xl text-orange-500"><Database size={24}/> Firebase</div>
              <div className="flex items-center gap-2 font-bold text-2xl text-slate-900"><Cpu size={24}/> Vertex AI</div>
              <div className="flex items-center gap-2 font-bold text-2xl text-slate-700"><ShieldCheck size={24}/> Gobernanza Digital</div>
              <div className="flex items-center gap-2 font-bold text-2xl text-nayarit-orange"><Zap size={24}/> Google AI Studio</div>
            </div>
          </div>
        </section>

        <ContactSection />
        <GovernanceAcademy />
        
        {/* CTA Section */}
        <section className="py-24 bg-nayarit-orange">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">Consolide la Soberanía Digital y la Integridad del Estado.</h2>
            <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto">
              Despliegue la infraestructura crítica de Gobernanza Digital AI y posicione sus activos gubernamentales en la vanguardia tecnológica global.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-nayarit-orange px-10 py-5 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-transform">
                SOLICITAR DIAGNÓSTICO DE INTEGRIDAD Y SOBERANÍA AI
              </button>
              <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-2">
                Consultoría con Estratega de Mando Senior
                <Phone size={20} />
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      {/* Floating Download Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.dispatchEvent(new CustomEvent('download-pdf'))}
        className="fixed bottom-6 left-6 z-[90] bg-white text-slate-900 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center border border-slate-200 hover:border-nayarit-orange transition-colors group"
        title="Descargar PDF Ejecutivo"
      >
        <FileText size={24} className="group-hover:text-nayarit-orange transition-colors" />
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-nayarit-orange rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white">
          PDF
        </div>
      </motion.button>

      <Chatbot onNavigate={setActiveSection} />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <FirebaseProvider>
        <AppContent />
      </FirebaseProvider>
    </ErrorBoundary>
  );
}
