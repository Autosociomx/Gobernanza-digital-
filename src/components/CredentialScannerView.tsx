import React, { useState, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import Tesseract from 'tesseract.js';
import { Camera, QrCode, Loader2, ArrowLeft } from 'lucide-react';

export function CredentialScannerView({ onScanComplete, onBack }: { onScanComplete: (data: any) => void, onBack: () => void }) {
  const [stage, setStage] = useState<'front' | 'back' | 'ocr'>('front');
  const [images, setImages] = useState({ front: null as string | null, back: null as string | null });
  const [ocrResult, setOcrResult] = useState('');
  const [scanning, setScanning] = useState(false);

  const handleImageCapture = (side: 'front' | 'back', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => ({ ...prev, [side]: reader.result as string }));
        if (side === 'front') {
            setStage('back');
        } else {
            setStage('ocr');
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const runOCR = async () => {
    setScanning(true);
    try {
        const result = await Tesseract.recognize(images.front!, 'spa');
        setOcrResult(result.data.text);
        onScanComplete({ front: images.front, back: images.back, ocr: result.data.text });
    } catch(err) {
        console.error(err);
    }
    setScanning(false);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-white p-6 pt-12 flex flex-col items-center">
        <button onClick={onBack} className="self-start mb-4"><ArrowLeft /></button>
        {stage === 'front' && (
            <div className="text-center">
                <h2 className="text-xl font-black mb-4">Captura frente de INE</h2>
                <input type="file" accept="image/*" capture="environment" onChange={(e) => handleImageCapture('front', e)} />
            </div>
        )}
        {stage === 'back' && (
            <div className="text-center">
                <h2 className="text-xl font-black mb-4">Captura reverso de INE</h2>
                <input type="file" accept="image/*" capture="environment" onChange={(e) => handleImageCapture('back', e)} />
            </div>
        )}
        {stage === 'ocr' && (
            <div className="text-center">
                <h2 className="text-xl font-black mb-4">Procesando...</h2>
                {scanning ? <Loader2 className="animate-spin mb-4" /> : <button onClick={runOCR} className="bg-magenta-500 text-white p-4 rounded-full">Validar</button>}
            </div>
        )}
    </div>
  );
}
