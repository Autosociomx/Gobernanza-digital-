import React, { useState } from 'react';
import { GeraldineLanding } from './components/GeraldineLanding';
import { MandoCentral } from './components/MandoCentral';
import { C5Dashboard } from './components/C5Dashboard';

type TabId = 'inicio' | 'c5' | 'mando';

interface Tab {
  id: TabId;
  label: string;
  emoji: string;
}

const TABS: Tab[] = [
  { id: 'inicio', label: 'Inicio', emoji: '🏠' },
  { id: 'c5', label: 'C5 Digital', emoji: '⚡' },
  { id: 'mando', label: 'Mando Central', emoji: '🗺️' },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('c5');

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Top nav bar */}
      <nav className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-1 h-12">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer
                  ${activeTab === tab.id
                    ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }
                `}
              >
                <span>{tab.emoji}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Tab content */}
      <div>
        {activeTab === 'inicio' && <GeraldineLanding />}
        {activeTab === 'c5' && <C5Dashboard />}
        {activeTab === 'mando' && <MandoCentral />}
      </div>
    </div>
  );
}

export default App;
