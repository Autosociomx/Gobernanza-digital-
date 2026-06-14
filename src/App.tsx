import React, { useState } from 'react';
import { GeraldineLanding } from './components/GeraldineLanding';
import { C5Dashboard } from './components/C5Dashboard';
import { CitizenApp } from './components/CitizenApp';
import { DeveloperChecklist } from './components/DeveloperChecklist';
import { ExecutiveFolder } from './components/ExecutiveFolder';
import { MeetingBrief } from './components/MeetingBrief';
import { DiagnosticoDependencias } from './components/DiagnosticoDependencias';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'c5' | 'citizen' | 'dev' | 'executive' | 'meeting' | 'diagnostico'>('landing');

  if (currentView === 'c5') {
    return <C5Dashboard onLogout={() => setCurrentView('landing')} />;
  }

  if (currentView === 'citizen') {
    return <CitizenApp onLogout={() => setCurrentView('landing')} />;
  }

  if (currentView === 'dev') {
    return <DeveloperChecklist onLogout={() => setCurrentView('landing')} />;
  }

  if (currentView === 'executive') {
    return <ExecutiveFolder onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'meeting') {
    return <MeetingBrief onBack={() => setCurrentView('landing')} />;
  }

  if (currentView === 'diagnostico') {
    return <DiagnosticoDependencias onBack={() => setCurrentView('landing')} />;
  }

  return (
    <div className="min-h-screen relative">
      {/* Centro de Control de Gobernanza (Consolidado) */}
      <div className="fixed top-6 right-6 z-[950] flex flex-col items-end gap-3">
        <div className="group relative">
          <button 
            className="bg-black/90 hover:bg-black backdrop-blur-xl border border-white/20 text-white px-6 py-3 rounded-full text-[0.7rem] font-mono tracking-[0.15em] font-bold transition-all shadow-2xl flex items-center gap-3"
          >
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-magenta-500"></span>
            </div>
            TERMINAL DE ACCESO
          </button>
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 mt-3 w-64 bg-black/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 shadow-2xl opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300">
            <p className="px-4 py-2 text-[10px] font-mono text-slate-500 uppercase tracking-widest border-b border-white/5 mb-2">Ecosistema ConnectX</p>
            
            <button 
              onClick={() => setCurrentView('c5')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-left"
            >
              <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
              <div>
                <p className="text-[11px] font-bold text-white uppercase tracking-tight">C5 Hub Gobierno</p>
                <p className="text-[9px] text-slate-500 uppercase">Dashboard Centralizado</p>
              </div>
            </button>

            <button 
              onClick={() => setCurrentView('citizen')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-left"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
              <div>
                <p className="text-[11px] font-bold text-white uppercase tracking-tight">Citizen App (RUTA)</p>
                <p className="text-[9px] text-slate-500 uppercase">Interfaz Ciudadana</p>
              </div>
            </button>

            <button 
              onClick={() => setCurrentView('executive')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-left"
            >
              <div className="w-2 h-2 rounded-full bg-magenta-500"></div>
              <div>
                <p className="text-[11px] font-bold text-white uppercase tracking-tight">Carpeta Ejecutiva</p>
                <p className="text-[9px] text-slate-500 uppercase">PDF Estratégico AI</p>
              </div>
            </button>

            <button
              onClick={() => setCurrentView('dev')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-left mt-2 border-t border-white/5"
            >
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <div>
                <p className="text-[11px] font-bold text-white uppercase tracking-tight">Roadmap Técnico</p>
                <p className="text-[9px] text-slate-500 uppercase">Estado de Implementación</p>
              </div>
            </button>

            <button
              onClick={() => setCurrentView('meeting')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-left border-t border-white/5 mt-1"
            >
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></div>
              <div>
                <p className="text-[11px] font-bold text-white uppercase tracking-tight">Reunión Galván</p>
                <p className="text-[9px] text-slate-500 uppercase">Guión + Brief Ejecutivo</p>
              </div>
            </button>

            <button
              onClick={() => setCurrentView('diagnostico')}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/5 rounded-xl transition-colors text-left border-t border-white/5 mt-1"
            >
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              <div>
                <p className="text-[11px] font-bold text-white uppercase tracking-tight">Océanos Azules</p>
                <p className="text-[9px] text-slate-500 uppercase">Diagnóstico de Dependencias</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <GeraldineLanding onNavigate={(view) => setCurrentView(view)} />
    </div>
  );
}

export default App;
