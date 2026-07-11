import React, { useState, lazy, Suspense } from 'react';
import { PlatformLanding } from './components/PlatformLanding';

// Las vistas pesadas se cargan bajo demanda: el visitante de la landing
// no descarga el dashboard, la app ciudadana ni sus librerías (recharts,
// tesseract, jspdf…) hasta que navega a ellas.
const C5Dashboard = lazy(() =>
  import('./components/C5Dashboard').then((m) => ({ default: m.C5Dashboard }))
);
const CitizenApp = lazy(() =>
  import('./components/CitizenApp').then((m) => ({ default: m.CitizenApp }))
);
const DeveloperChecklist = lazy(() =>
  import('./components/DeveloperChecklist').then((m) => ({ default: m.DeveloperChecklist }))
);
const ExecutiveFolder = lazy(() =>
  import('./components/ExecutiveFolder').then((m) => ({ default: m.ExecutiveFolder }))
);
const BahiaDigital = lazy(() =>
  import('./components/BahiaDigital').then((m) => ({ default: m.BahiaDigital }))
);

function ViewFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F1]" role="status" aria-live="polite">
      <span className="text-[#5A6478] text-sm tracking-widest uppercase">Cargando módulo…</span>
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'c5' | 'citizen' | 'dev' | 'executive' | 'bahia'>('landing');
  const [citizenTab, setCitizenTab] = useState<any>('home');
  const [citizenAction, setCitizenAction] = useState<any>(null);

  if (currentView === 'c5') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <C5Dashboard onLogout={() => setCurrentView('landing')} />
      </Suspense>
    );
  }

  if (currentView === 'citizen') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <CitizenApp onLogout={() => setCurrentView('landing')} initialTab={citizenTab} initialAction={citizenAction} />
      </Suspense>
    );
  }

  if (currentView === 'dev') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <DeveloperChecklist onLogout={() => setCurrentView('landing')} />
      </Suspense>
    );
  }

  if (currentView === 'bahia') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <BahiaDigital onNavigate={(view, subView, action) => {
          if (view === 'citizen') {
            setCitizenTab(subView || 'home');
            setCitizenAction(action || null);
          }
          setCurrentView(view);
        }} />
      </Suspense>
    );
  }

  if (currentView === 'executive') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <ExecutiveFolder onBack={() => setCurrentView('landing')} />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <PlatformLanding onNavigate={(view, subView, action) => {
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
