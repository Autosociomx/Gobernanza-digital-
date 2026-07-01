import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Truck, MapPin, Clock, CheckCircle2, AlertCircle, Radio } from 'lucide-react';

interface TruckUnit {
  id: string;
  name: string;
  sector: string;
  color: string;
  bgColor: string;
  route: Array<{ x: number; y: number }>;
  progress: number;
  speed: number;
  status: 'active' | 'idle' | 'returning';
  completedStops: number;
  totalStops: number;
  lastUpdate: string;
  driver: string;
}

const ROUTES: Array<Array<{ x: number; y: number }>> = [
  // Ruta Norte — Colonia Las Flores / Moctezuma
  [
    { x: 120, y: 60 }, { x: 180, y: 60 }, { x: 240, y: 80 },
    { x: 280, y: 120 }, { x: 260, y: 160 }, { x: 200, y: 170 },
    { x: 160, y: 150 }, { x: 120, y: 130 }, { x: 100, y: 100 }, { x: 120, y: 60 },
  ],
  // Ruta Centro — Insurgentes / Centro Histórico
  [
    { x: 220, y: 200 }, { x: 270, y: 210 }, { x: 300, y: 240 },
    { x: 290, y: 280 }, { x: 250, y: 290 }, { x: 210, y: 275 },
    { x: 180, y: 250 }, { x: 185, y: 220 }, { x: 220, y: 200 },
  ],
  // Ruta Sur — Av. de la Cultura / Los Sauces
  [
    { x: 140, y: 300 }, { x: 190, y: 310 }, { x: 240, y: 330 },
    { x: 270, y: 360 }, { x: 240, y: 390 }, { x: 190, y: 380 },
    { x: 150, y: 360 }, { x: 130, y: 330 }, { x: 140, y: 300 },
  ],
  // Ruta Oriente — Libramiento Tepic / Industrial
  [
    { x: 330, y: 150 }, { x: 360, y: 180 }, { x: 370, y: 220 },
    { x: 350, y: 260 }, { x: 320, y: 280 }, { x: 300, y: 260 },
    { x: 310, y: 220 }, { x: 320, y: 180 }, { x: 330, y: 150 },
  ],
];

const INITIAL_TRUCKS: TruckUnit[] = [
  {
    id: 'U-01', name: 'Unidad 01', sector: 'Norte · Col. Las Flores',
    color: '#10b981', bgColor: 'bg-emerald-500',
    route: ROUTES[0], progress: 0, speed: 0.4,
    status: 'active', completedStops: 7, totalStops: 12,
    lastUpdate: 'hace 0 min', driver: 'Jorge R.',
  },
  {
    id: 'U-02', name: 'Unidad 02', sector: 'Centro · Insurgentes',
    color: '#3b82f6', bgColor: 'bg-blue-500',
    route: ROUTES[1], progress: 0.3, speed: 0.35,
    status: 'active', completedStops: 4, totalStops: 9,
    lastUpdate: 'hace 0 min', driver: 'María L.',
  },
  {
    id: 'U-03', name: 'Unidad 03', sector: 'Sur · Los Sauces',
    color: '#f59e0b', bgColor: 'bg-amber-500',
    route: ROUTES[2], progress: 0.6, speed: 0.3,
    status: 'active', completedStops: 10, totalStops: 14,
    lastUpdate: 'hace 0 min', driver: 'Carlos M.',
  },
  {
    id: 'U-04', name: 'Unidad 04', sector: 'Oriente · Industrial',
    color: '#e879f9', bgColor: 'bg-fuchsia-500',
    route: ROUTES[3], progress: 0.15, speed: 0.5,
    status: 'idle', completedStops: 2, totalStops: 8,
    lastUpdate: 'hace 2 min', driver: 'Sofía T.',
  },
];

function lerp(a: { x: number; y: number }, b: { x: number; y: number }, t: number) {
  return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
}

function getTruckPos(route: Array<{ x: number; y: number }>, progress: number) {
  const total = route.length - 1;
  const idx = Math.min(Math.floor(progress * total), total - 1);
  const local = (progress * total) - idx;
  return lerp(route[idx], route[idx + 1] || route[0], local);
}

export function RouteProView({ onBack }: { onBack: () => void }) {
  const [trucks, setTrucks] = useState<TruckUnit[]>(INITIAL_TRUCKS);
  const [selected, setSelected] = useState<string | null>('U-01');
  const [tick, setTick] = useState(0);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    let raf: number;
    const animate = (time: number) => {
      if (time - lastTimeRef.current > 80) {
        lastTimeRef.current = time;
        setTrucks(prev => prev.map(truck => {
          if (truck.status === 'idle') return truck;
          const next = (truck.progress + truck.speed * 0.01) % 1;
          const newStops = Math.floor(next * truck.totalStops);
          return { ...truck, progress: next, completedStops: Math.min(newStops, truck.totalStops - 1) };
        }));
        setTick(t => t + 1);
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  const now = new Date();
  const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;

  const selectedTruck = trucks.find(t => t.id === selected);

  return (
    <div className="flex flex-col h-full bg-[#0a0f1a] text-white min-h-screen">
      {/* Header */}
      <div className="px-4 pt-5 pb-3 flex items-center gap-3 border-b border-white/5">
        <button onClick={onBack} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors">
          <ChevronLeft className="w-4 h-4 text-white/70" />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">RoutePro · En Vivo</span>
          </div>
          <p className="text-sm font-black">Recolección de Residuos · Tepic</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-white/40 font-mono">{timeStr}</p>
          <p className="text-[9px] text-white/30 font-bold uppercase">GPS ACTIVO</p>
        </div>
      </div>

      {/* Stats strip */}
      <div className="grid grid-cols-3 gap-px bg-white/5 border-b border-white/5">
        {[
          { label: 'Unidades activas', value: '3 / 4' },
          { label: 'Cobertura hoy', value: '68%' },
          { label: 'Paradas completadas', value: `${trucks.reduce((s, t) => s + t.completedStops, 0)}` },
        ].map(s => (
          <div key={s.label} className="bg-[#0d1424] px-3 py-2.5 text-center">
            <p className="text-[9px] text-white/40 font-bold uppercase tracking-wider">{s.label}</p>
            <p className="text-sm font-black text-white mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Map SVG */}
      <div className="relative bg-[#0d1424] border-b border-white/5">
        <svg viewBox="0 0 480 460" className="w-full h-[240px]">
          {/* Grid background */}
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff08" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="480" height="460" fill="url(#grid)" />

          {/* Main avenues */}
          <g stroke="#ffffff12" strokeWidth="6" strokeLinecap="round">
            {/* E-W avenues */}
            <line x1="40" y1="90" x2="420" y2="90" />
            <line x1="40" y1="180" x2="420" y2="180" />
            <line x1="40" y1="270" x2="420" y2="270" />
            <line x1="40" y1="360" x2="420" y2="360" />
            {/* N-S streets */}
            <line x1="100" y1="30" x2="100" y2="430" />
            <line x1="200" y1="30" x2="200" y2="430" />
            <line x1="300" y1="30" x2="300" y2="430" />
            <line x1="380" y1="30" x2="380" y2="430" />
          </g>

          {/* Secondary streets */}
          <g stroke="#ffffff07" strokeWidth="2">
            <line x1="40" y1="135" x2="420" y2="135" />
            <line x1="40" y1="225" x2="420" y2="225" />
            <line x1="40" y1="315" x2="420" y2="315" />
            <line x1="150" y1="30" x2="150" y2="430" />
            <line x1="250" y1="30" x2="250" y2="430" />
            <line x1="340" y1="30" x2="340" y2="430" />
          </g>

          {/* Street labels */}
          <g fill="#ffffff20" fontSize="7" fontFamily="monospace">
            <text x="42" y="87">AV. INSURGENTES</text>
            <text x="42" y="177">AV. ALLENDE</text>
            <text x="42" y="267">AV. MEXICO</text>
            <text x="42" y="357">AV. DE LA CULTURA</text>
          </g>

          {/* Route paths */}
          {trucks.map(truck => (
            <polyline
              key={truck.id}
              points={truck.route.map(p => `${p.x},${p.y}`).join(' ')}
              fill="none"
              stroke={truck.color}
              strokeWidth={truck.id === selected ? 2.5 : 1.5}
              strokeOpacity={truck.id === selected ? 0.8 : 0.3}
              strokeDasharray="4 3"
            />
          ))}

          {/* Truck markers */}
          {trucks.map(truck => {
            const pos = getTruckPos(truck.route, truck.progress);
            const isSelected = truck.id === selected;
            const isIdle = truck.status === 'idle';
            return (
              <g key={truck.id} onClick={() => setSelected(truck.id)} style={{ cursor: 'pointer' }}>
                {isSelected && (
                  <circle cx={pos.x} cy={pos.y} r="14" fill={truck.color} fillOpacity="0.15" />
                )}
                <circle
                  cx={pos.x} cy={pos.y} r={isSelected ? 9 : 7}
                  fill={isIdle ? '#374151' : truck.color}
                  stroke={isSelected ? '#fff' : truck.color}
                  strokeWidth={isSelected ? 1.5 : 0.5}
                  strokeOpacity="0.6"
                />
                <text x={pos.x} y={pos.y + 3} textAnchor="middle" fontSize="8" fill="white" fontWeight="bold">
                  {truck.id.replace('U-', '')}
                </text>
              </g>
            );
          })}

          {/* Center marker (base) */}
          <g>
            <circle cx="235" cy="225" r="5" fill="#ffffff20" stroke="#ffffff40" strokeWidth="1" />
            <text x="242" y="229" fontSize="7" fill="#ffffff40">BASE</text>
          </g>
        </svg>

        {/* Legend */}
        <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm rounded-xl px-2.5 py-2 flex flex-col gap-1">
          {trucks.map(t => (
            <button
              key={t.id}
              onClick={() => setSelected(t.id)}
              className="flex items-center gap-1.5 text-[9px] font-bold"
            >
              <div className="w-2 h-2 rounded-full" style={{ background: t.status === 'idle' ? '#374151' : t.color }} />
              <span className={selected === t.id ? 'text-white' : 'text-white/40'}>{t.id}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Truck cards */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2.5">
        <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest px-1">Unidades en campo</p>
        {trucks.map(truck => {
          const pct = Math.round((truck.completedStops / truck.totalStops) * 100);
          const isSelected = truck.id === selected;
          return (
            <button
              key={truck.id}
              onClick={() => setSelected(truck.id)}
              className={`w-full text-left rounded-2xl p-3.5 border transition-all ${
                isSelected
                  ? 'bg-white/8 border-white/20'
                  : 'bg-white/3 border-white/5 hover:bg-white/5'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ background: truck.status === 'idle' ? '#374151' : truck.color }}
                  >
                    <Truck className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-white">{truck.name}</p>
                    <p className="text-[9px] text-white/40 font-medium">{truck.sector}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {truck.status === 'active' ? (
                    <span className="flex items-center gap-1 text-[8px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      EN RUTA
                    </span>
                  ) : (
                    <span className="text-[8px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">EN PAUSA</span>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-2">
                <div className="flex justify-between text-[9px] mb-1">
                  <span className="text-white/40 font-medium">{truck.completedStops} de {truck.totalStops} paradas</span>
                  <span className="font-black" style={{ color: truck.color }}>{pct}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background: truck.color }}
                    animate={{ width: `${pct}%` }}
                    transition={{ type: 'spring', stiffness: 60 }}
                  />
                </div>
              </div>

              <div className="flex justify-between text-[8px] text-white/30 font-medium">
                <span className="flex items-center gap-1"><Clock className="w-2.5 h-2.5" /> {truck.lastUpdate}</span>
                <span>Chofer: {truck.driver}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
