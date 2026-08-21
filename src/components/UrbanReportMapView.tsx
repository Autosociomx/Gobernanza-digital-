import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { ExternalLink, Loader2, MapPin, ShieldCheck } from 'lucide-react';
import { resolveLightingReport } from '../services/federatedIntentService';
import type { FederatedResolutionResponse } from '../../shared/federation/types';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

export function UrbanReportMapView({ onBack }: { onBack: () => void }) {
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState<{ lat: number; lng: number } | null>(null);
  const [result, setResult] = useState<FederatedResolutionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      setError('Este dispositivo no permite obtener ubicación. Puedes continuar sin ella.');
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setPosition({ lat: coords.latitude, lng: coords.longitude });
        setLocating(false);
      },
      () => {
        setError('No se pudo obtener la ubicación. Puedes continuar sin compartirla.');
        setLocating(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const submitReport = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const resolved = await resolveLightingReport({
        description: description.trim() || 'Luminaria con falla reportada por ciudadano',
        lat: position?.lat,
        lng: position?.lng,
      });
      setResult(resolved);
    } catch (err: any) {
      setError(err?.message || 'No fue posible resolver el reporte.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.25em] text-emerald-600">Enrutamiento municipal · v0.1</p>
          <h3 className="mt-1 text-xl font-black text-slate-900">Reportar una luminaria</h3>
          <p className="mt-1 max-w-2xl text-xs leading-relaxed text-slate-500">
            Esta vista resuelve la autoridad desde el catálogo municipal y conserva evidencia del enrutamiento. El folio oficial sólo existe cuando el canal institucional lo emite.
          </p>
        </div>
        <button onClick={onBack} className="rounded-full border border-slate-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-600">
          Regresar
        </button>
      </div>

      <form onSubmit={submitReport} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto]">
        <div>
          <label className="mb-2 block text-[10px] font-black uppercase tracking-widest text-slate-500">Descripción</label>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Ej. La luminaria frente al parque lleva tres noches apagada."
            className="min-h-24 w-full rounded-2xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-800 outline-none focus:border-emerald-400"
          />
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={requestLocation}
              disabled={locating}
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-slate-700 disabled:opacity-50"
            >
              {locating ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <MapPin className="h-3.5 w-3.5" />}
              {position ? 'Ubicación capturada' : 'Compartir ubicación'}
            </button>
            {position && <span className="text-[10px] font-mono text-slate-400">{position.lat.toFixed(5)}, {position.lng.toFixed(5)}</span>}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="self-end rounded-2xl bg-slate-900 px-6 py-3 text-xs font-black uppercase tracking-widest text-white disabled:opacity-50"
        >
          {loading ? 'Resolviendo…' : 'Resolver y continuar'}
        </button>
      </form>

      {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-700">{error}</div>}

      {result && (
        <div className="rounded-3xl border border-emerald-200 bg-emerald-50/60 p-5">
          <div className="flex items-center gap-2 text-emerald-700">
            <ShieldCheck className="h-5 w-5" />
            <span className="text-xs font-black uppercase tracking-widest">{result.resolution.status}</span>
          </div>
          <dl className="mt-4 grid gap-3 text-xs md:grid-cols-2">
            <div><dt className="text-slate-400">Autoridad declarada</dt><dd className="font-bold text-slate-800">{result.resolution.authority || 'Sin ruta'}</dd></div>
            <div><dt className="text-slate-400">Servicio</dt><dd className="font-mono text-slate-700">{result.resolution.service_id || '—'}</dd></div>
            <div><dt className="text-slate-400">Estado siguiente</dt><dd className="font-bold text-slate-800">{result.resolution.next_state}</dd></div>
            <div><dt className="text-slate-400">Recibo de evidencia</dt><dd className="font-mono text-slate-700">{result.receipt.payload_hash.slice(0, 18)}…</dd></div>
          </dl>

          {result.resolution.integration?.url && (
            <a
              href={result.resolution.integration.url}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-emerald-700 px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-white"
            >
              Continuar en canal oficial <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
          <p className="mt-3 text-[10px] leading-relaxed text-slate-500">
            El recibo anterior acredita lo que hizo este runtime: resolver y preparar el handoff. No representa un folio ni una recepción oficial del Ayuntamiento.
          </p>
        </div>
      )}

      {hasValidKey && position ? (
        <div className="h-[320px] w-full overflow-hidden rounded-[2.5rem] border border-slate-200 shadow-sm">
          <APIProvider apiKey={API_KEY} version="weekly">
            <Map
              defaultCenter={position}
              defaultZoom={17}
              mapId="DEMO_MAP_ID_URBAN"
              style={{ width: '100%', height: '100%' }}
              disableDefaultUI
            >
              <AdvancedMarker position={position}>
                <Pin background="#047857" borderColor="#064e3b" glyphColor="#fff" />
              </AdvancedMarker>
            </Map>
          </APIProvider>
        </div>
      ) : (
        <div className="flex min-h-32 items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-6 text-center">
          <div>
            <MapPin className="mx-auto mb-2 h-7 w-7 text-slate-300" />
            <p className="text-xs font-bold text-slate-600">El reporte funciona sin Google Maps.</p>
            <p className="mt-1 text-[10px] text-slate-400">El mapa se activa sólo si existe clave y la persona comparte ubicación.</p>
          </div>
        </div>
      )}
    </div>
  );
}
