import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { MapPin, AlertTriangle, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export function UrbanReportMapView({ onBack }: { onBack: () => void }) {
  const [reports, setReports] = useState([
    { id: 1, lat: 21.5039, lng: -104.8947, type: 'BACHE', status: 'PENDING' },
    { id: 2, lat: 21.5080, lng: -104.8990, type: 'LUMINARIA', status: 'RESOLVED' },
    { id: 3, lat: 21.4990, lng: -104.8900, type: 'AGUA', status: 'IN_PROGRESS' },
  ]);

  if (!hasValidKey) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-slate-50 rounded-3xl text-center border border-slate-200">
        <MapPin className="w-12 h-12 text-slate-300 mb-4" />
        <h3 className="text-sm font-bold text-slate-800 mb-2">Google Maps No Configurado</h3>
        <p className="text-[10px] text-slate-500 mb-4 max-w-xs">
          Para activar el mapa de reportes urbanos (C5) con tecnología de Google Maps, ingresa tu GOOGLE_MAPS_PLATFORM_KEY en la configuración de la aplicación (Menú Configuración {'>'} Secrets).
        </p>
        <button onClick={onBack} className="px-6 py-2 bg-slate-900 text-white rounded-full text-[10px] uppercase font-bold tracking-widest">Regresar</button>
      </div>
    );
  }

  return (
    <div className="h-[400px] w-full rounded-[2.5rem] overflow-hidden border border-slate-200 relative shadow-sm">
      <div className="absolute top-4 left-4 z-10 flex gap-2">
         <div className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-[10px] font-bold text-slate-700 flex items-center gap-2 border border-slate-100">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            C5 Activo
         </div>
         <div className="px-3 py-1.5 bg-slate-900/90 backdrop-blur-md rounded-full shadow-sm text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1 border border-slate-800">
            <ShieldCheck className="w-3 h-3" /> Geo-Radar
         </div>
      </div>
      
      <APIProvider apiKey={API_KEY} version="weekly">
        <Map
          defaultCenter={{lat: 21.5039, lng: -104.8947}}
          defaultZoom={13}
          mapId={process.env.GOOGLE_MAPS_ID || 'DEMO_MAP_ID_URBAN'}
          style={{width: '100%', height: '100%'}}
          disableDefaultUI={true}
        >
          {reports.map((report) => (
            <AdvancedMarker key={report.id} position={{lat: report.lat, lng: report.lng}}>
              <Pin 
                 background={report.status === 'PENDING' ? '#ef4444' : report.status === 'RESOLVED' ? '#10b981' : '#f59e0b'} 
                 borderColor={report.status === 'PENDING' ? '#991b1b' : report.status === 'RESOLVED' ? '#047857' : '#b45309'}
                 glyphColor="#fff" 
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
}
