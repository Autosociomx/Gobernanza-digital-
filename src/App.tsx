import React, { useState, Suspense } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ConsentGate } from './components/ConsentGate';

const PlatformLanding  = React.lazy(() => import('./components/PlatformLanding').then(m => ({ default: m.PlatformLanding })));
const C5Dashboard      = React.lazy(() => import('./components/C5Dashboard').then(m => ({ default: m.C5Dashboard })));
const CitizenApp       = React.lazy(() => import('./components/CitizenApp').then(m => ({ default: m.CitizenApp })));
const DeveloperChecklist = React.lazy(() => import('./components/DeveloperChecklist').then(m => ({ default: m.DeveloperChecklist })));
const ExecutiveFolder  = React.lazy(() => import('./components/ExecutiveFolder').then(m => ({ default: m.ExecutiveFolder })));

function PageLoader() {
  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-gray-500 text-xs font-mono tracking-widest uppercase">Cargando</span>
      </div>
    </div>
  );
}
import { ChevronDown, LayoutDashboard, UserCircle2, FileText, Settings2 } from 'lucide-react';

const CONSENT_KEY = 'nyd-legal-v1';

function App() {
  const [consentGiven, setConsentGiven] = useState(() =>
    typeof window !== 'undefined' && localStorage.getItem(CONSENT_KEY) === 'accepted'
  );
  const [currentView, setCurrentView] = useState<'landing' | 'c5' | 'citizen' | 'dev' | 'executive'>('landing');
  const [citizenTab, setCitizenTab] = useState<any>('home');
  const [citizenAction, setCitizenAction] = useState<any>(null);

  if (!consentGiven) {
    return (
      <ConsentGate
        onAccept={() => {
          localStorage.setItem(CONSENT_KEY, 'accepted');
          setConsentGiven(true);
        }}
      />
    );
  }

  if (currentView === 'c5') {
    return <Suspense fallback={<PageLoader />}><C5Dashboard onLogout={() => setCurrentView('landing')} /></Suspense>;
  }

  if (currentView === 'citizen') {
    return <Suspense fallback={<PageLoader />}><CitizenApp onLogout={() => setCurrentView('landing')} initialTab={citizenTab} initialAction={citizenAction} /></Suspense>;
  }

  if (currentView === 'dev') {
    return <Suspense fallback={<PageLoader />}><DeveloperChecklist onLogout={() => setCurrentView('landing')} /></Suspense>;
  }

  if (currentView === 'executive') {
    return <Suspense fallback={<PageLoader />}><ExecutiveFolder onBack={() => setCurrentView('landing')} /></Suspense>;
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
    <Suspense fallback={<PageLoader />}>
      <main id="main-content" className="min-h-screen relative overflow-x-hidden">
        <PlatformLanding onNavigate={(view, subView, action) => {
          if (view === 'citizen') {
            setCitizenTab(subView || 'home');
            setCitizenAction(action || null);
          }
          setCurrentView(view);
        }} />
      </main>
    </Suspense>
  );
}

export default App;
