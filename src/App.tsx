import React, { useState } from 'react';
import { PlatformLanding } from './components/PlatformLanding';
import { C5Dashboard } from './components/C5Dashboard';
import { CitizenApp } from './components/CitizenApp';
import { DeveloperChecklist } from './components/DeveloperChecklist';
import { ExecutiveFolder } from './components/ExecutiveFolder';

type CitizenTab    = 'home' | 'services' | 'profile' | 'reports' | 'notifications';
type CitizenAction = 'triage' | 'expediente' | 'tramites' | null;

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'c5' | 'citizen' | 'dev' | 'executive'>('landing');
  const [citizenTab, setCitizenTab]       = useState<CitizenTab>('home');
  const [citizenAction, setCitizenAction] = useState<CitizenAction>(null);

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

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      <PlatformLanding onNavigate={(view, subView, action) => {
        if (view === 'citizen') {
          setCitizenTab((subView as CitizenTab) || 'home');
          setCitizenAction((action as CitizenAction) || null);
        }
        setCurrentView(view);
      }} />
    </div>
  );
}

export default App;
