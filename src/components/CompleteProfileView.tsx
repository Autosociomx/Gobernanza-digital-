import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Camera, MapPin, User, Loader2, Check } from 'lucide-react';
import { cn } from '../lib/utils';

export function CompleteProfileView({ profile, onUpdate }: { profile: any, onUpdate: (data: any) => void }) {
  const [data, setData] = useState({ 
    name: profile.name || '', 
    address: profile.address || '',
    documentId: profile.documentId || ''
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCameraClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
      setData({...data, documentId: 'uploaded_photo'});
    }
  };

  const getUserLocation = () => {
    setLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setData({...data, address: `${position.coords.latitude}, ${position.coords.longitude}`});
          setLoadingLocation(false);
        },
        () => {
          alert('No se pudo obtener la ubicación.');
          setLoadingLocation(false);
        }
      );
    } else {
      alert('Geolocalización no soportada.');
      setLoadingLocation(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="w-full max-w-sm bg-white rounded-3xl p-8 shadow-xl"
      >
        <h2 className="text-2xl font-serif font-black mb-8 text-slate-900">Completa tu perfil</h2>
        <div className="space-y-6">
            <div className="relative">
                <User className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input 
                  className="w-full border-2 border-slate-100 p-4 pl-12 rounded-2xl focus:border-magenta-500 focus:outline-none transition-colors" 
                  placeholder="Nombre completo" 
                  value={data.name} 
                  onChange={(e) => setData({...data, name: e.target.value})} 
                />
            </div>
            <div className="relative">
                <MapPin className="absolute left-4 top-4 w-5 h-5 text-slate-400" />
                <input 
                  className="w-full border-2 border-slate-100 p-4 pl-12 pr-12 rounded-2xl focus:border-magenta-500 focus:outline-none transition-colors" 
                  placeholder="Dirección o coordenadas" 
                  value={data.address} 
                  onChange={(e) => setData({...data, address: e.target.value})} 
                />
                <button 
                  onClick={getUserLocation}
                  className="absolute right-2 top-2 p-2 bg-slate-100 rounded-xl hover:bg-slate-200 transition-colors"
                >
                  {loadingLocation ? <Loader2 className="w-5 h-5 animate-spin"/> : <MapPin className="w-5 h-5 text-slate-600" />}
                </button>
            </div>
            
            <div className="text-center">
              <input type="file" ref={fileInputRef} onChange={handleImageChange} accept="image/*" capture="environment" className="hidden" />
              <button 
                  onClick={handleCameraClick}
                  className={cn(
                    "w-full py-6 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center gap-2 transition-all",
                    imagePreview ? "border-magenta-500 bg-magenta-50" : "border-slate-200 hover:border-slate-400"
                  )}
              >
                  {imagePreview ? (
                    <Check className="w-10 h-10 text-magenta-500" />
                  ) : (
                    <>
                      <Camera className="w-8 h-8 text-slate-400" />
                      <span className="text-slate-500 font-bold">Foto de Credencial</span>
                    </>
                  )}
              </button>
            </div>
            
            <button 
                onClick={() => onUpdate(data)}
                className="w-full py-4 bg-slate-900 text-white rounded-full font-black shadow-xl hover:scale-[1.02] transition-transform"
            >
                Guardar y continuar
            </button>
        </div>
      </motion.div>
    </div>
  );
}
