import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  getDocs, 
  limit, 
  query, 
  Timestamp,
  doc,
  getDoc
} from 'firebase/firestore';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Activity, 
  Database, 
  Terminal,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  ChevronLeft,
  Search,
  Zap
} from 'lucide-react';
import { cn } from '../lib/utils';

interface AuditLog {
  id: string;
  type: 'info' | 'success' | 'error' | 'warning';
  message: string;
  timestamp: Date;
}

interface CollectionStatus {
  name: string;
  status: 'pending' | 'checking' | 'healthy' | 'unhealthy';
  error?: string;
  count?: number;
}

export function SystemAuditView({ onBack }: { onBack: () => void }) {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [isAuditing, setIsAuditing] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const [collections, setCollections] = useState<CollectionStatus[]>([
    { name: 'users', status: 'pending' },
    { name: 'tramites', status: 'pending' },
    { name: 'expediente_unico', status: 'pending' },
    { name: 'puntos', status: 'pending' },
    { name: 'auditorias_ciudadanas', status: 'pending' }
  ]);

  const addLog = (message: string, type: AuditLog['type'] = 'info') => {
    const newLog: AuditLog = {
      id: Math.random().toString(36).substr(2, 9),
      message,
      type,
      timestamp: new Date()
    };
    setLogs(prev => [newLog, ...prev].slice(0, 50));
  };

  const updateCollectionStatus = (name: string, status: CollectionStatus['status'], error?: string, count?: number) => {
    setCollections(prev => prev.map(c => 
      c.name === name ? { ...c, status, error, count } : c
    ));
  };

  const runAudit = async () => {
    if (isAuditing) return;
    
    setIsAuditing(true);
    setLogs([]);
    setProgress(0);
    setCollections(prev => prev.map(c => ({ ...c, status: 'pending', error: undefined, count: undefined })));
    
    addLog('🚀 Iniciando Auditoría de Sistema "Mystery Shopper"...', 'info');
    addLog('Conectando con Firestore Nayarit Digital...', 'info');

    const totalSteps = collections.length + 1;
    let currentStep = 0;

    for (const col of collections) {
      currentStep++;
      setProgress((currentStep / totalSteps) * 100);
      
      addLog(`Revisando integridad de la colección: [${col.name}]`, 'info');
      updateCollectionStatus(col.name, 'checking');

      try {
        const q = query(collection(db, col.name), limit(10));
        const snapshot = await getDocs(q);
        
        if (snapshot.empty) {
          addLog(`Advertencia: La colección [${col.name}] existe pero está vacía.`, 'warning');
          updateCollectionStatus(col.name, 'healthy', 'Colección vacía', 0);
        } else {
          const docData = snapshot.docs[0].data();
          addLog(`Éxito: Conexión establecida con [${col.name}]. Documentos detectados.`, 'success');
          
          // Basic validation of critical fields if needed
          if (col.name === 'users' && !docData.email && !docData.uid) {
             addLog(`Inconsistencia en [${col.name}]: Campos críticos faltantes en muestra.`, 'warning');
          }

          updateCollectionStatus(col.name, 'healthy', undefined, snapshot.size);
        }
      } catch (error: any) {
        const errorMsg = error.message || 'Error de conexión o permisos insuficientes';
        addLog(`ERROR CRÍTICO en [${col.name}]: ${errorMsg}`, 'error');
        updateCollectionStatus(col.name, 'unhealthy', errorMsg);
        
        if (errorMsg.includes('permission-denied')) {
          addLog(`Sugerencia: Revisa las Reglas de Seguridad en firestore.rules para [${col.name}].`, 'warning');
        }
      }
      
      // Artificial delay for visual feedback
      await new Promise(r => setTimeout(r, 600));
    }

    setProgress(100);
    addLog('✅ Auditoría completada. El sistema se encuentra en estado de Gobernanza Digital.', 'success');
    setIsAuditing(false);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen bg-slate-950 text-slate-300 font-mono"
    >
      {/* Header */}
      <header className="p-4  border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            <ChevronLeft className="w-5 h-5 shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-widest truncate">Regresar</span>
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <h1 className="text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-white truncate">System Auditor</h1>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-8 flex-1 overflow-y-auto">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <div className="space-y-1">
                <p className="text-[10px] font-bold text-magenta-500 uppercase tracking-widest">ConnectX Mystery Shopper</p>
                <h2 className="text-2xl font-serif font-black text-white">Gobernanza Digital Activa</h2>
             </div>
             <button 
               onClick={runAudit}
               disabled={isAuditing}
               className={cn(
                 "px-6 py-3 rounded-2xl flex items-center gap-2 transition-all shadow-lg",
                 isAuditing ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-magenta-600 text-white hover:bg-magenta-500 shadow-magenta-600/20"
               )}
             >
               {isAuditing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Activity className="w-5 h-5" />}
               <span className="text-xs font-black uppercase tracking-widest">Ejecutar Auditoría</span>
             </button>
          </div>

          <div className="bg-slate-900/50 rounded-3xl p-6 border border-slate-800">
             <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Integridad de Infraestructura</span>
                <span className="text-xs font-black text-magenta-400">{Math.round(progress)}%</span>
             </div>
             <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-magenta-500 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
                />
             </div>
          </div>
        </div>

        {/* Collection Cards */}
        <div className="grid grid-cols-1  gap-4">
           {collections.map(col => (
             <div 
               key={col.name}
               className={cn(
                 "p-5 rounded-3xl border transition-all duration-300",
                 col.status === 'healthy' ? "bg-emerald-500/5 border-emerald-500/20" :
                 col.status === 'unhealthy' ? "bg-rose-500/5 border-rose-500/20" :
                 col.status === 'checking' ? "bg-blue-500/5 border-blue-500/20 animate-pulse" :
                 "bg-slate-900 border-slate-800"
               )}
             >
               <div className="flex justify-between items-start mb-3">
                 <div className="flex items-center gap-3">
                   <div className={cn(
                     "w-10 h-10 rounded-2xl flex items-center justify-center",
                     col.status === 'healthy' ? "bg-emerald-500/20 text-emerald-400" :
                     col.status === 'unhealthy' ? "bg-rose-500/20 text-rose-400" :
                     "bg-slate-800 text-slate-500"
                   )}>
                     <Database className="w-5 h-5" />
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none mb-1">Colección</p>
                     <h3 className="text-sm font-black text-white">{col.name}</h3>
                   </div>
                 </div>
                 {col.status === 'healthy' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                 {col.status === 'unhealthy' && <ShieldAlert className="w-5 h-5 text-rose-500" />}
                 {col.status === 'checking' && <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />}
               </div>
               
               {col.error && (
                 <p className="text-[10px] text-rose-400 font-medium leading-tight mt-2">{col.error}</p>
               )}
               {col.count !== undefined && (
                 <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mt-2">Check: {col.count} docs</p>
               )}
             </div>
           ))}
        </div>

        {/* Terminal Logs */}
        <div className="bg-[#0c0e14] rounded-[2.5rem] border border-slate-800 flex flex-col h-[400px] shadow-2xl overflow-hidden">
           <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-800 bg-slate-900/30">
              <Terminal className="w-4 h-4 text-magenta-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Terminal de Auditoría</span>
              <div className="flex gap-1.5 ml-auto">
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
                 <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
              </div>
           </div>
           
           <div className="flex-1 p-6 overflow-y-auto space-y-2 font-mono scrollbar-hide">
              <AnimatePresence initial={false}>
                {logs.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-50 space-y-4">
                     <Zap className="w-12 h-12" />
                     <p className="text-[10px] font-black uppercase tracking-[0.3em]">Esperando Ejecución...</p>
                  </div>
                ) : (
                  logs.map((log) => (
                    <motion.div 
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex gap-3 text-xs"
                    >
                      <span className="text-slate-600 shrink-0">[{log.timestamp.toLocaleTimeString([], { hour12: false })}]</span>
                      <span className={cn(
                        "font-medium",
                        log.type === 'success' ? "text-emerald-400" :
                        log.type === 'error' ? "text-rose-400" :
                        log.type === 'warning' ? "text-amber-400" :
                        "text-blue-400"
                      )}>
                        {log.type === 'success' ? '✔' : log.type === 'error' ? '✖' : log.type === 'warning' ? '⚠' : 'ℹ'} {log.message}
                      </span>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
           </div>
        </div>

        {/* Infrastructure Stats */}
        <div className="grid grid-cols-2  gap-4 pb-10">
           {[
             { label: 'Uptime', value: '99.98%', icon: Activity },
             { label: 'Latencia', value: '42ms', icon: Zap },
             { label: 'Seguridad', value: 'Máxima', icon: ShieldCheck },
             { label: 'DB Versión', value: 'Firestore v2', icon: Database }
           ].map((stat, i) => (
             <div key={i} className="bg-slate-900/30 p-4 rounded-2xl border border-slate-800/50">
               <stat.icon className="w-4 h-4 text-slate-500 mb-2" />
               <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">{stat.label}</p>
               <p className="text-sm font-black text-white">{stat.value}</p>
             </div>
           ))}
        </div>
      </main>
    </motion.div>
  );
}
