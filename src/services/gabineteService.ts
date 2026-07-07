// Cliente del Gabinete Digital de Especialistas.
// Toda la inteligencia (prompts, keys, ruteo de proveedores) vive en el
// servidor; este servicio solo consume los endpoints.

export interface EspecialistaInfo {
  id: string;
  nombre: string;
  area: string;
  proveedor: 'groq' | 'gemini' | 'anthropic';
  vigila: string[];
  disponible: boolean;
}

export interface Intervencion {
  id: string;
  nombre: string;
  proveedor: string;
  intervencion: string;
}

export interface SesionPlenaria {
  tema: string;
  fecha: string;
  intervenciones: Intervencion[];
  ausentes: { id: string; nombre: string; proveedor: string; motivo: string }[];
}

export const obtenerRoster = async (): Promise<EspecialistaInfo[]> => {
  const res = await fetch('/api/gabinete');
  if (!res.ok) throw new Error(`Error ${res.status} obteniendo el roster del Gabinete`);
  return res.json();
};

export const consultarEspecialista = async (id: string, tema: string): Promise<Intervencion> => {
  const res = await fetch(`/api/gabinete/${id}/consulta`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tema }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Error ${res.status} consultando a ${id}`);
  return data;
};

export const sesionPlenaria = async (tema: string): Promise<SesionPlenaria> => {
  const res = await fetch('/api/gabinete/plenaria', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tema }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || `Error ${res.status} en la sesión plenaria`);
  return data;
};
