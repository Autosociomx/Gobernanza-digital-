import React, { useState, useEffect, lazy, Suspense } from 'react';
import { PlatformLanding } from './components/PlatformLanding';
import { MUNICIPIOS, type AppView, type MunicipioId } from './data/municipios';

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
const MunicipioDigital = lazy(() =>
  import('./components/MunicipioDigital').then((m) => ({ default: m.MunicipioDigital }))
);
const AutopistaDigital = lazy(() =>
  import('./components/AutopistaDigital').then((m) => ({ default: m.AutopistaDigital }))
);

function ViewFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F6F1]" role="status" aria-live="polite">
      <span className="text-[#5A6478] text-sm tracking-widest uppercase">Cargando módulo…</span>
    </div>
  );
}

function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [citizenTab, setCitizenTab] = useState<any>('home');
  const [citizenAction, setCitizenAction] = useState<any>(null);

  // Cada vista es una pantalla completa: al cambiar de vista el scroll
  // heredado de la anterior dejaría al usuario a media página.
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

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

  if (currentView === 'autopista') {
    return (
      <Suspense fallback={<ViewFallback />}>
        <AutopistaDigital onNavigate={(view, subView, action) => {
          if (view === 'citizen') {
            setCitizenTab(subView || 'home');
            setCitizenAction(action || null);
          }
          setCurrentView(view);
        }} />
      </Suspense>
    );
  }

  if (currentView in MUNICIPIOS) {
    return (
      <Suspense fallback={<ViewFallback />}>
        <MunicipioDigital municipioId={currentView as MunicipioId} onNavigate={(view, subView, action) => {
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
