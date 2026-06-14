import React from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export function NayaritMap({ 
  center = { lat: 21.5090, lng: -104.8947 }, 
  zoom = 13,
  markers = [] 
}: { 
  center?: { lat: number, lng: number }, 
  zoom?: number,
  markers?: Array<{ lat: number, lng: number, title: string, color?: string }>
}) {
  if (!hasValidKey) {
    return (
      <div className="flex items-center justify-center h-full bg-slate-900 rounded-xl border border-white/10 p-6 text-center">
        <div className="max-w-md">
          <h2 className="text-xl font-bold text-white mb-4">Google Maps API Key Required</h2>
          <p className="text-slate-400 text-sm mb-6">
            Para ver la trazabilidad real de Nayarit Digital, por favor añade tu API Key de Google Maps en 
            <strong> Settings {'->'} Secrets</strong> con el nombre <code>GOOGLE_MAPS_PLATFORM_KEY</code>.
          </p>
          <div className="text-xs text-slate-500 bg-black/40 p-3 rounded text-left font-mono">
            1. Consigue tu clave en Google Cloud Console.<br/>
            2. Ve a Settings (⚙️) {'->'} Secrets.<br/>
            3. Añade GOOGLE_MAPS_PLATFORM_KEY.<br/>
            4. La app se reiniciará automáticamente.
          </div>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <Map
        defaultCenter={center}
        defaultZoom={zoom}
        mapId="NAYARIT_DIGITAL_MAP"
        className="w-full h-full rounded-xl"
        gestureHandling={'greedy'}
        disableDefaultUI={false}
      >
        {markers.map((marker, i) => (
          <AdvancedMarker key={i} position={{ lat: marker.lat, lng: marker.lng }} title={marker.title}>
            <Pin background={marker.color || "#E5007A"} glyphColor="#fff" borderColor="#fff" />
          </AdvancedMarker>
        ))}
      </Map>
    </APIProvider>
  );
}
