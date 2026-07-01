import React from 'react';
import { motion } from 'motion/react';
import { 
  Network, 
  ChevronRight, 
  BarChart3, 
  ShieldCheck, 
  Coins, 
  Users2, 
  Trophy, 
  Target,
  ArrowRight,
  ChevronLeft,
  Briefcase,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

const FlowStep = ({ title, subtitle, icon: Icon, color }: { title: string, subtitle: string, icon: any, color: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="flex flex-col items-center text-center p-6 bg-slate-900/40 border border-white/5 rounded-3xl relative"
  >
    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 shadow-lg", color)}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h4 className="text-white font-serif font-black text-lg leading-tight mb-1">{title}</h4>
    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{subtitle}</p>
  </motion.div>
);

const MonetizationCard = ({ title, desc, benefit }: { title: string, desc: string, benefit: string }) => (
  <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 hover:bg-white/10 transition-colors">
    <div className="flex items-center gap-3">
       <div className="w-8 h-8 rounded-xl bg-magenta-500/20 flex items-center justify-center">
          <Coins className="w-4 h-4 text-magenta-500" />
       </div>
       <h4 className="text-white font-bold text-sm">{title}</h4>
    </div>
    <p className="text-xs text-slate-400 leading-relaxed">{desc}</p>
    <div className="pt-4 border-t border-white/5">
       <p className="text-[10px] text-emerald-400 font-black uppercase tracking-widest">Impacto Sindical</p>
       <p className="text-[11px] text-slate-300 font-medium">{benefit}</p>
    </div>
  </div>
);

export function StrategicAcademyView({ onBack }: { onBack: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen bg-[#05060a] text-slate-300 font-sans pb-20"
    >
      <header className="p-8 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-20">
         <div className="flex items-center justify-between">
            <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-white transition-colors">
               <ChevronLeft className="w-5 h-5" />
               <span className="text-[10px] font-black uppercase tracking-widest">Regresar</span>
            </button>
            <div className="flex items-center gap-3">
               <Network className="w-5 h-5 text-magenta-500" />
               <h1 className="text-sm font-black uppercase tracking-[0.3em] text-white">Blueprint Estratégico</h1>
            </div>
         </div>
      </header>

      <main className="p-8 space-y-16 max-w-5xl mx-auto w-full">
         {/* Hero Title */}
         <div className="space-y-4 text-center">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] font-black text-magenta-500 uppercase tracking-[0.5em]"
            >
              Academia ConnectX 2026
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-serif font-black text-white tracking-tighter leading-[0.85]"
            >
              Construyendo<br/>
              <span className="text-slate-500">Poder Real</span>
            </motion.h2>
         </div>

         {/* Interactive Strategic Diagram */}
         <div className="space-y-8">
            <div className="flex items-center gap-3">
               <Target className="w-5 h-5 text-emerald-500" />
               <h3 className="text-xs font-black text-white uppercase tracking-widest">Mapa de Valor Sistémico</h3>
            </div>
            
            <div className="relative grid grid-cols-1 md:grid-cols-4 gap-8">
               {/* Sindicato Node */}
               <div className="md:col-span-4 flex justify-center mb-8">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="px-12 py-8 bg-magenta-600 rounded-[3rem] text-center shadow-2xl shadow-magenta-600/30 border border-white/20 relative"
                  >
                     <Users2 className="w-10 h-10 text-white mx-auto mb-4" />
                     <h4 className="text-2xl font-serif font-black text-white">Sindicato SUTSEM</h4>
                     <p className="text-[10px] text-magenta-100 font-bold uppercase tracking-widest">Liderazgo Histórico</p>
                     
                     <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[1px] h-8 bg-magenta-500"></div>
                  </motion.div>
               </div>

               <FlowStep 
                 title="Nivel Bronce" 
                 subtitle="Soberanía de Identidad" 
                 icon={ShieldCheck} 
                 color="bg-orange-500" 
               />
               <FlowStep 
                 title="Nivel Plata" 
                 subtitle="Dominio Operativo" 
                 icon={Zap} 
                 color="bg-slate-500" 
               />
               <FlowStep 
                 title="Nivel Oro" 
                 subtitle="Estratega Digital" 
                 icon={Trophy} 
                 color="bg-yellow-500" 
               />
               <FlowStep 
                 title="Impacto" 
                 subtitle="Gobernanza Real" 
                 icon={BarChart3} 
                 color="bg-emerald-500" 
               />
            </div>
         </div>

         {/* Monetization Engine */}
         <div className="space-y-8">
            <div className="flex items-center gap-3">
               <Coins className="w-5 h-5 text-yellow-500" />
               <h3 className="text-xs font-black text-white uppercase tracking-widest">Ingeniería de Sostenibilidad</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <MonetizationCard 
                 title="Contratos Municipales"
                 desc="El ayuntamiento financia la capacitación para cumplir con la LNETB. Facturación directa por servicios de formación masiva."
                 benefit="Fuerza laboral altamente calificada sin costo directo para el sindicato."
               />
               <MonetizationCard 
                 title="Comisiones por Eficiencia"
                 desc="Incentivos por cada proceso burocrático digitalizado y optimizado por trabajadores certificados."
                 benefit="Posibilidad de bonos por productividad vinculados al ahorro gubernamental."
               />
               <MonetizationCard 
                 title="Promotores Internos"
                 desc="Graduados nivel Oro actúan como instructores locales, monetizando su conocimiento dentro de la red."
                 benefit="Fortalecimiento de la estructura orgánica y técnica del sindicato."
               />
               <MonetizationCard 
                 title="Gestión Federal"
                 desc="Captación de recursos federales (FAISPIAM) mediante consultoría técnica ConnectX para modernización."
                 benefit="Demostración de gestión inteligente y proactiva de recursos públicos."
               />
            </div>
         </div>

         {/* Empowerment Message */}
         <div className="bg-gradient-to-br from-magenta-600 to-indigo-900 rounded-[3rem] p-12 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>
            
            <div className="relative z-10 space-y-8">
               <div className="space-y-4">
                  <Briefcase className="w-12 h-12 text-white/40" />
                  <h3 className="text-4xl font-serif font-black tracking-tighter leading-none">Empoderamiento Sindical<br/>de Nueva Generación</h3>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-magenta-200 uppercase tracking-widest">Transformación de Rol</p>
                     <p className="text-sm text-white/80 leading-relaxed">
                        El sindicato deja de ser reactivo para liderar la vanguardia. Los trabajadores certificados se vuelven activos estratégicos irreemplazables.
                     </p>
                  </div>
                  <div className="space-y-2">
                     <p className="text-[10px] font-black text-magenta-200 uppercase tracking-widest">Legitimidad Social</p>
                     <p className="text-sm text-white/80 leading-relaxed">
                        Se consolida una imagen de eficiencia pública. El sindicato se convierte en el garante de un gobierno digital moderno y honesto.
                     </p>
                  </div>
               </div>

               <div className="pt-8 border-t border-white/10">
                  <p className="text-xl font-serif italic text-magenta-100 font-medium">
                     "No estamos vendiendo software. Estamos construyendo poder."
                  </p>
               </div>
            </div>
         </div>

         {/* CTA Section */}
         <div className="flex flex-col items-center space-y-6">
            <button className="bg-white text-black px-12 py-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.3em] shadow-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4">
               Iniciar Alianza Estratégica
               <ArrowRight className="w-4 h-4" />
            </button>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Protocolo ConnectX v2.6.0</p>
         </div>
      </main>
    </motion.div>
  );
}
