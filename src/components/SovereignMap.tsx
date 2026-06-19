import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow, Polyline } from '@react-google-maps/api';
import { 
  Loader2, ShieldCheck, Filter, Building2, Zap, 
  Map as MapIcon, Activity, AlertTriangle, PenTool, 
  Navigation, Save, Trash2, Layers, Smartphone,
  ChevronUp, User, HardHat
} from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { 
  InfrastructureAsset, 
  getMasterRegistry, 
  saveAsset, 
  AssetType, 
  AssetStatus,
  seedInfrastructure
} from '../services/infrastructureService';

const containerStyle = {
  width: '100%',
  height: '100%',
  minHeight: '500px',
};

const center = {
  lat: 21.5039, // Tepic, Nayarit
  lng: -104.8947
};

const MAP_ID = "a2PKf000003itlMMAQ";

type MapMode = 'ENGINEER' | 'DRIVER';

export const SovereignMap: React.FC = () => {
  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    mapIds: [MAP_ID]
  });

  const [assets, setAssets] = useState<InfrastructureAsset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<InfrastructureAsset | null>(null);
  const [filter, setFilter] = useState<'ALL' | AssetType>('ALL');
  const [mode, setMode] = useState<MapMode>('DRIVER');
  const [isDrawing, setIsDrawing] = useState(false);
  const [newPath, setNewPath] = useState<{ lat: number; lng: number }[]>([]);
  const [saving, setSaving] = useState(false);
  const [showMobilePanel, setShowMobilePanel] = useState(false);

  const mapRef = useRef<google.maps.Map | null>(null);

  const loadAssets = useCallback(async () => {
    const data = await getMasterRegistry();
    setAssets(data);
  }, []);

  useEffect(() => {
    const init = async () => {
      await seedInfrastructure();
      await loadAssets();
    };
    init();
  }, [loadAssets]);

  const filteredAssets = useMemo(() => {
    if (filter === 'ALL') return assets;
    return assets.filter(a => a.type === filter);
  }, [assets, filter]);

  const onMapClick = useCallback((e: google.maps.MapMouseEvent) => {
    if (mode === 'ENGINEER' && isDrawing && e.latLng) {
      setNewPath(prev => [...prev, { lat: e.latLng!.lat(), lng: e.latLng!.lng() }]);
    }
  }, [mode, isDrawing]);

  const handleSavePath = async () => {
    if (newPath.length < 2) return;
    setSaving(true);
    try {
      const newAsset: Omit<InfrastructureAsset, 'id'> = {
        iun: `NAY-ROA-${new Date().getFullYear()}-${Math.floor(Math.random() * 900 + 100)}`,
        name: 'Nuevo Tramo Vial Estratégico',
        type: 'ROAD',
        status: 'OPTIMAL',
        departmentId: 'sec-infra',
        location: { 
          ...newPath[0], 
          address: 'Trazo Manual (Consola de Ingeniería)',
          municipality: 'Tepic'
        },
        path: newPath,
        metrics: {
          integrityScore: 100,
          physicalCondition: 100,
          socialImpact: 50,
          lastAuditDate: new Date().toISOString().split('T')[0],
          investmentAmount: 0,
          beneficiaries: 0
        },
        description: 'Trazo de ingeniería realizado desde la Consola de Élite.',
        responsible: 'Ingeniería de Caminos Nayarit',
        tags: ['PROYECTO', 'NUEVA_RUTA'],
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1,
          source: 'MANUAL'
        }
      };
      await saveAsset(newAsset);
      setNewPath([]);
      setIsDrawing(false);
      await loadAssets();
    } catch (error) {
      console.error("Error saving path:", error);
    } finally {
      setSaving(false);
    }
  };

  const mapOptions = useMemo(() => ({
    mapId: MAP_ID,
    disableDefaultUI: true,
    zoomControl: false,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    gestureHandling: 'greedy' as const,
    styles: [
      {
        featureType: "all",
        elementType: "labels.text.fill",
        stylers: [{ color: "#ffffff" }]
      }
    ] as google.maps.MapTypeStyle[]
  }), []);

  if (loadError) {
    return (
      <div className="w-full h-[500px] rounded-[2.5rem] bg-slate-900 border border-white/10 flex flex-col items-center justify-center p-8 text-center">
        <ShieldCheck className="text-nayarit-orange mb-4" size={48} />
        <h3 className="text-xl font-bold text-white mb-2">Protocolo de Enlace Geoespacial</h3>
        <p className="text-slate-400 text-sm max-w-md mb-6">Error de conexión con el satélite de Google Maps.</p>
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="w-full h-[500px] rounded-[2.5rem] bg-slate-950 border border-white/10 flex flex-col items-center justify-center">
        <Loader2 className="w-12 h-12 text-nayarit-orange animate-spin mb-4" />
        <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] animate-pulse">Sincronizando Registro Maestro...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[600px] md:h-[700px] rounded-[2.5rem] overflow-hidden border border-white/5 shadow-2xl bg-slate-950">
      {/* Top Bar - Mode Selector */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 w-[90%] md:w-auto">
        <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 p-1.5 rounded-2xl flex items-center gap-1 shadow-2xl">
          <button
            onClick={() => setMode('DRIVER')}
            className={cn(
              "flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              mode === 'DRIVER' ? "bg-nayarit-orange text-white shadow-lg shadow-orange-500/20" : "text-white/40 hover:text-white"
            )}
          >
            <Navigation size={14} />
            <span className="hidden md:inline">Modo Chofer</span>
            <span className="md:hidden">Chofer</span>
          </button>
          <button
            onClick={() => setMode('ENGINEER')}
            className={cn(
              "flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
              mode === 'ENGINEER' ? "bg-slate-700 text-white shadow-lg" : "text-white/40 hover:text-white"
            )}
          >
            <HardHat size={14} />
            <span className="hidden md:inline">Consola Ingeniería</span>
            <span className="md:hidden">Ingeniero</span>
          </button>
        </div>
      </div>

      {/* Engineer Tools Sidebar */}
      <AnimatePresence>
        {mode === 'ENGINEER' && (
          <motion.div 
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            className="absolute left-4 top-24 z-10 flex flex-col gap-3"
          >
            <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl flex flex-col gap-4">
              <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Herramientas</p>
              
              <button
                onClick={() => {
                  setIsDrawing(!isDrawing);
                  if (!isDrawing) setNewPath([]);
                }}
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center transition-all border",
                  isDrawing ? "bg-nayarit-orange border-orange-400 text-white" : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                )}
                title="Trazar Nueva Ruta"
              >
                <PenTool size={20} />
              </button>

              {newPath.length > 0 && (
                <>
                  <button
                    onClick={handleSavePath}
                    disabled={saving}
                    className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-500 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all"
                    title="Guardar Trazo"
                  >
                    {saving ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
                  </button>
                  <button
                    onClick={() => setNewPath([])}
                    className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-500/30 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                    title="Descartar"
                  >
                    <Trash2 size={20} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Layer/Filter Controls (Right Sidebar) */}
      <div className="absolute right-4 top-24 z-10 flex flex-col gap-3">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-white/10 p-4 rounded-3xl shadow-2xl flex flex-col gap-4">
          <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mb-1">Capas</p>
          {[
            { id: 'ALL', icon: <Layers size={18} />, label: 'Todo' },
            { id: 'ROAD', icon: <Zap size={18} />, label: 'Vías' },
            { id: 'SCHOOL', icon: <Building2 size={18} />, label: 'Edu' },
            { id: 'HEALTH_CENTER', icon: <Activity size={18} />, label: 'Salud' },
          ].map(l => (
            <button
              key={l.id}
              onClick={() => setFilter(l.id as any)}
              className={cn(
                "w-12 h-12 rounded-2xl flex flex-col items-center justify-center gap-1 transition-all border",
                filter === l.id ? "bg-white/10 border-white/20 text-nayarit-orange" : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10"
              )}
            >
              {l.icon}
              <span className="text-[7px] font-black uppercase">{l.label}</span>
            </button>
          ))}
        </div>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={mapOptions}
        onLoad={map => { mapRef.current = map; }}
        onClick={onMapClick}
      >
        {/* Existing Assets */}
        {filteredAssets.map(asset => (
          <React.Fragment key={asset.id}>
            <Marker
              position={asset.location}
              onClick={() => {
                setSelectedAsset(asset);
                setShowMobilePanel(true);
              }}
              icon={{
                path: asset.type === 'ROAD' ? "M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" : google.maps.SymbolPath.CIRCLE,
                fillColor: asset.status === 'CRITICAL' ? '#ef4444' : asset.status === 'RISK' ? '#f59e0b' : '#F27D26',
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#ffffff',
                scale: asset.type === 'ROAD' ? 2 : 10,
              }}
            />
            {asset.path && (
              <Polyline
                path={asset.path}
                options={{
                  strokeColor: asset.status === 'CRITICAL' ? '#ef4444' : '#F27D26',
                  strokeOpacity: 0.8,
                  strokeWeight: 6,
                }}
              />
            )}
          </React.Fragment>
        ))}

        {/* New Path being drawn */}
        {newPath.length > 0 && (
          <Polyline
            path={newPath}
            options={{
              strokeColor: '#F27D26',
              strokeOpacity: 0.6,
              strokeWeight: 4,
            }}
          />
        )}

        {/* InfoWindow for Desktop */}
        {selectedAsset && !showMobilePanel && (
          <InfoWindow
            position={selectedAsset.location}
            onCloseClick={() => setSelectedAsset(null)}
          >
            <div className="p-4 min-w-[200px] bg-white text-slate-900">
              <h4 className="font-black uppercase text-xs mb-1">{selectedAsset.name}</h4>
              <p className="text-[9px] font-bold text-slate-400 mb-2">{selectedAsset.iun}</p>
              <div className="flex items-center gap-2 mb-3">
                <div className={cn("w-2 h-2 rounded-full", selectedAsset.status === 'CRITICAL' ? 'bg-red-500' : 'bg-emerald-500')} />
                <span className="text-[10px] font-black uppercase">{selectedAsset.status}</span>
              </div>
              <button className="w-full py-2 bg-slate-900 text-white rounded-lg text-[9px] font-black uppercase tracking-widest">
                Ver Auditoría Completa
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Mobile Asset Panel (Bottom Sheet) */}
      <AnimatePresence>
        {selectedAsset && showMobilePanel && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="absolute bottom-0 left-0 right-0 z-20 bg-slate-900/95 backdrop-blur-3xl border-t border-white/10 rounded-t-[3rem] p-8 shadow-[0_-20px_50px_rgba(0,0,0,0.5)]"
          >
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" onClick={() => setShowMobilePanel(false)} />
            
            <div className="flex items-start justify-between mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={cn(
                    "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                    selectedAsset.status === 'CRITICAL' ? "bg-red-500/20 text-red-500" : "bg-emerald-500/20 text-emerald-500"
                  )}>
                    {selectedAsset.status}
                  </div>
                  <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{selectedAsset.iun}</span>
                </div>
                <h3 className="text-2xl font-black text-white leading-tight">{selectedAsset.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedAsset(null)}
                className="p-3 bg-white/5 rounded-2xl text-white/40 hover:text-white"
              >
                <ChevronUp className="rotate-180" />
              </button>
            </div>

            <p className="text-white/60 text-sm leading-relaxed mb-8">{selectedAsset.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-5 rounded-[2rem] bg-white/5 border border-white/10">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Integridad</p>
                <p className="text-2xl font-black text-nayarit-orange">{selectedAsset.metrics.integrityScore}%</p>
              </div>
              <div className="p-5 rounded-[2rem] bg-white/5 border border-white/10">
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-1">Inversión</p>
                <p className="text-2xl font-black text-white">${(selectedAsset.metrics.investmentAmount / 1000000).toFixed(1)}M</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button className="flex-1 py-4 bg-nayarit-orange text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-orange-500/20">
                Protocolo de Auditoría
              </button>
              <button className="p-4 bg-white/5 text-white/60 rounded-2xl border border-white/10">
                <AlertTriangle size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Overlay (Bottom Left) */}
      <div className="absolute bottom-6 left-6 z-10 hidden md:block">
        <div className="px-5 py-3 bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[8px] font-bold text-white">
                <User size={10} />
              </div>
            ))}
          </div>
          <p className="text-[10px] font-bold text-white/60 uppercase tracking-widest">
            <span className="text-emerald-500">12 Ingenieros</span> en Zona
          </p>
        </div>
      </div>
    </div>
  );
};

