import React, { useState } from 'react';
import { GeraldineLanding } from './components/GeraldineLanding';
import { C5Dashboard } from './components/C5Dashboard';
import { CitizenApp } from './components/CitizenApp';
import { DeveloperChecklist } from './components/DeveloperChecklist';
import { ExecutiveFolder } from './components/ExecutiveFolder';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, LayoutDashboard, UserCircle2, FileText, Settings2 } from 'lucide-react';

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'c5' | 'citizen' | 'dev' | 'executive'>('landing');
  const [citizenTab, setCitizenTab] = useState<any>('home');
  const [citizenAction, setCitizenAction] = useState<any>(null);

  if (currentView === 'c5') {
    return <C5Dashboard onLogout={() => setCurrentView('landing')} />;
  }

  if (currentView === 'citizen') {
    return <CitizenApp onLogout={() => setCurrentView('landing')} initialTab={citizenTab} initialAction={citizenAction} />;
  }

  if (currentView === 'dev') {
    return <DeveloperChecklist onLogout={() => setCurrentView('landing')} />;
  }

  if (currentView === 'executive') {
    return <ExecutiveFolder onBack={() => setCurrentView('landing')} />;
  }

  const menuItems = [
    { 
      id: 'c5', 
      label: 'C5 HUB GOBIERNO', 
      sub: 'Centro de Inteligencia', 
      color: 'bg-emerald-500', 
      icon: LayoutDashboard 
    },
    { 
      id: 'citizen', 
      label: 'DEMO CIUDADANA', 
      sub: 'Experiencia Ciudadana RUTA', 
      color: 'bg-cyan-500', 
      icon: UserCircle2 
    },
    { 
      id: 'executive', 
      label: 'CARPETA EJECUTIVA', 
      sub: 'Estrategia de Gobernanza AI', 
      color: 'bg-magenta-500', 
      icon: FileText 
    },
    { 
      id: 'dev', 
      label: 'ROADMAP TÉCNICO', 
      sub: 'Estado de Implementación', 
      color: 'bg-purple-500', 
      icon: Settings2 
    },
  ];

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <GeraldineLanding onNavigate={(view, subView, action) => {
        if (view === 'citizen') {
          setCitizenTab(subView || 'home');
          setCitizenAction(action || null);
        }
        setCurrentView(view);
      }} />
    </div>
  );
}

export default App;
