import React, { useState, useEffect } from 'react';
import {
  Home,
  CreditCard,
  FileText,
  User,
  MessageSquare,
  Plus,
  Bell,
  Search,
  ChevronRight,
  ChevronLeft,
  Stethoscope,
  Lightbulb,
  Droplets,
  Send,
  Loader2,
  Barcode,
  QrCode,
  Heart,
  X,
  Users,
  ShieldCheck,
  LayoutGrid,
  Bot,
  Sparkles,
  FolderOpen,
  ScrollText
} from 'lucide-react';
  import { motion, AnimatePresence } from 'motion/react';
  import { cn } from '../lib/utils';
  import { NayaritMap } from './NayaritMap';
import { TepictuSalud } from './TepictuSalud';
import { ParlamentoView } from './dashboard/ParlamentoView';
import { NotificationView } from './NotificationView';
import { LoginView } from './LoginView';
import { CompleteProfileView } from './CompleteProfileView';
import { CredentialScannerView } from './CredentialScannerView';
import { ExpedienteUnicoView } from './ExpedienteUnicoView';
import { TramiteTracker } from './TramiteTracker';
import { ReporteCiudadanoView } from './ReporteCiudadanoView';
import { NayaChat } from './NayaChat';
import { QRCodeSVG } from 'qrcode.react';
import JsBarcode from 'jsbarcode';
import { TabButton, QuickAction, ViewHeader } from '../blocks/ruta/shared';
import { HomeView } from '../blocks/ruta/HomeView';
import { RedesCiudadanasView } from '../blocks/ruta/RedesCiudadanasView';
import { PaymentsView } from '../blocks/ruta/PaymentsView';
import { ServicesView } from '../blocks/ruta/ServicesView';
import { ProfileView } from '../blocks/ruta/ProfileView';
import { SecurityCenterView } from '../blocks/ruta/SecurityCenterView';

import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { doc, getDoc, setDoc, onSnapshot, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';

type TabType = 'home' | 'forum' | 'networks' | 'payments' | 'services' | 'profile' | 'security' | 'notifications';
type Language = 'es' | 'cora' | 'wixarika';

export function CitizenApp({ 
  onLogout, 
  initialTab = 'home',
  initialAction = null 
}: { 
  onLogout: () => void,
  initialTab?: TabType,
  initialAction?: 'chat' | 'triage' | 'map' | null
}) {
  const [activeTab, setActiveTab] = useState<TabType>(initialTab);
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [profile, setProfile] = useState({
    name: "",
    documentId: "",
    phone: "",
    email: "",
    address: "",
    neighborhood: "",
    registrationVerified: false
  });
  const [loadingProfile, setLoadingProfile] = useState(true);
  const isProfileComplete = profile.name && profile.address && profile.documentId;

  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      if (u) {
        // Fetch real profile
        const userDoc = doc(db, 'users', u.uid);
        const unsubDoc = onSnapshot(userDoc, (docSnap) => {
          if (docSnap.exists()) {
            setProfile(docSnap.data() as any);
          } else {
            // Initial profile if not exists
            const initial = {
              name: u.displayName || "Usuario Nayarit",
              email: u.email || "",
              role: 'citizen',
              documentId: "",
              phone: u.phoneNumber || "",
              address: "",
              neighborhood: "",
              registrationVerified: false,
              createdAt: new Date().toISOString()
            };
            setProfile(initial as any);
            setDoc(userDoc, initial).catch(err => handleFirestoreError(err, OperationType.UPDATE, `users/${u.uid}`));
          }
          setLoadingProfile(false);
          setIsLoggingIn(false);
        }, (err) => {
          console.error("Firestore snapshot error:", err);
          setLoadingProfile(false);
          setIsLoggingIn(false);
        });
        return () => unsubDoc();
      } else {
        setLoadingProfile(false);
        setIsLoggingIn(false);
      }
    });

    // Fallback security timeout for profile loading
    const timer = setTimeout(() => {
        if (loadingProfile) {
            console.warn("Profile loading timed out.");
            setLoadingProfile(false);
            setIsLoggingIn(false);
        }
    }, 8000);

    return () => {
        unsubscribe();
        clearTimeout(timer);
    };
  }, []);

  const [showChat, setShowChat] = useState(initialAction === 'chat');
  const [showMap, setShowMap] = useState(initialAction === 'map');
  const [showTriage, setShowTriage] = useState(initialAction === 'triage');
  const [showExpediente, setShowExpediente] = useState(false);
  const [showTramites, setShowTramites] = useState(false);
  const [showReporte, setShowReporte] = useState(false);
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [payingItem, setPayingItem] = useState<any>(null);
  const [paymentStep, setPaymentStep] = useState<'idle' | 'processing' | 'success' | 'cash_instructions'>('idle');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [paymentRef, setPaymentRef] = useState<string>('');
  const [lang, setLang] = useState<Language>('es');
  
  const translations = {
    es: {
      welcome: `Hola, ${profile.name.split(' ')[0]}`,
      ai_greet: `¡Hola ${profile.name.split(' ')[0]}! Soy tu Asistente de Nayarit Digital Certificado. Puedo ayudarte con tus reportes técnicos, salud preventiva o cualquier duda sobre los Comités Ciudadanos. ¿En qué te puedo apoyar hoy?`,
      home: "Inicio",
      forum: "Campaña",
      networks: "Redes",
      payments: "Tesorería",
      services: "Gobierno",
      profile: "Mi NayaritID",
      assistant_online: "Online · Soporte Regional",
    },
    cora: {
      welcome: "Tyu'un, Juan Pérez",
      ai_greet: "Pue'en Juan! Ne'ij tyu'iti'in Nayarit Digital. Ne'ij amu'u ne'itye tyu'uti'in...",
      home: "Tyu'un",
      forum: "Tyu'uchal",
      networks: "Tyu'uredes",
      payments: "Tyu'upay",
      services: "Tyu'useve",
      profile: "Pēfi'i",
      assistant_online: "Online · Cora Support",
    },
    wixarika: {
      welcome: "Haux Juan Pérez",
      ai_greet: "¡Ke tsi' kaniu Juan! Ne keniu Asistente Nayarit Digital. ¿Kewa pikanetsi'iwau?",
      home: "Haux",
      forum: "Chime",
      networks: "Tyu'uredes",
      payments: "Paka",
      services: "Yereta",
      profile: "Kewita",
      assistant_online: "Online · Wixárika Support",
    }
  };

  // AI Chat State
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: translations[lang].ai_greet }
  ]);

  useEffect(() => {
    setMessages([{ role: 'assistant', content: translations[lang].ai_greet }]);
  }, [lang]);

  const updateProfile = async (updatedData: any) => {
    if (!user) return;
    try {
      const userDoc = doc(db, 'users', user.uid);
      await setDoc(userDoc, { ...updatedData, updatedAt: new Date().toISOString() }, { merge: true });
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const quickActions = {
    es: ["Pagar Predial", "Reportar Bache", "Mapa de Obras", "Ayuda"],
    cora: ["Tyu'upay", "Reportar", "Mapa", "Ayuda"],
    wixarika: ["Paka", "Reportar", "Mapa", "Ayuda"]
  };

  const handleSendMessage = async (text?: string) => {
    const userMsg = text || inputValue.trim();
    if (!userMsg) return;
    
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    if (!text) setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: `${userMsg} (Language selected: ${lang})` })
      });
      const data = await response.json();
      
      if (data.error) throw new Error(data.error);
      
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (err: any) {
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${err.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  const generatePaymentRef = async () => {
    const curp = "PEGJ900101HNT";
    const servicio = payingItem?.title || "SERVICIO";
    const seed = `${curp}|${servicio}|${Date.now()}|${Math.random()}`;
    const encoder = new TextEncoder();
    const data = encoder.encode(seed);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const idPago = hashHex.substring(0, 16);
    const ref = (parseInt(idPago.slice(0, 14), 16) % 100000000000000).toString().padStart(14, '0');
    setPaymentRef(ref);
    return ref;
  };

  const barcodeRef = React.useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (paymentStep === 'cash_instructions' && paymentRef && barcodeRef.current) {
      JsBarcode(barcodeRef.current, paymentRef, {
        format: "CODE128",
        lineColor: "#000",
        width: 2,
        height: 60,
        displayValue: true,
        fontSize: 12,
        margin: 10
      });
    }
  }, [paymentStep, paymentRef]);

  return (
    <>
      {loadingProfile ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
          <Loader2 className="w-8 h-8 animate-spin text-magenta-500" />
          <p className="mt-4 font-bold text-slate-400">Verificando sesión...</p>
        </div>
      ) : !user ? (
        <LoginView onLogin={() => setIsLoggingIn(true)} />
      ) : !isProfileComplete ? (
        <CompleteProfileView profile={profile} onUpdate={updateProfile} />
      ) : isLoggingIn ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
          <Loader2 className="w-8 h-8 animate-spin text-magenta-500" />
          <p className="mt-4 font-bold text-slate-400">Autenticando...</p>
        </div>
      ) : (
        <div className="flex justify-center bg-slate-100 min-h-screen">
          {/* Mobile Frame Simulation */}
          <div className="w-full max-w-[430px] bg-white min-h-screen shadow-2xl relative flex flex-col overflow-hidden border-x border-slate-200">
            
            {/* StatusBar Mock */}
        <div className="px-6 pt-4 pb-2 flex justify-between items-center text-[10px] font-bold text-slate-800">
          <span>9:41</span>
          <div className="flex gap-1.5 items-center">
            <span className="w-4 h-3 border border-slate-800 rounded-[2px] relative after:content-[''] after:absolute after:-right-1 after:top-0.5 after:w-0.5 after:h-2 after:bg-slate-800"></span>
            <span className="w-3 h-3 bg-slate-800 rounded-full"></span>
          </div>
        </div>

        {/* Header */}
        <header className="px-6 py-4 flex justify-between items-start">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-magenta-500" style={{color:'var(--magenta)'}}>Nayarit Digital</p>
            <h1 className="text-xl font-serif font-black text-slate-900 leading-tight">{translations[lang].welcome}</h1>
            <div className="flex gap-2 mt-2">
               {['es', 'cora', 'wixarika'].map(l => (
                 <button 
                   key={l}
                   onClick={() => setLang(l as Language)}
                   className={cn(
                     "text-[8px] font-bold uppercase px-2 py-0.5 rounded transition-all",
                     lang === l ? "bg-magenta-500 text-white" : "bg-slate-100 text-slate-400"
                   )}
                   style={lang === l ? {backgroundColor:'var(--magenta)'} : {}}
                 >
                   {l}
                 </button>
               ))}
            </div>
          </div>
          <div className="relative">
             <button onClick={() => setActiveTab('notifications')} className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center cursor-pointer transition-colors hover:bg-slate-200">
                <Bell className="w-5 h-5 text-slate-400" />
             </button>
             <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">2</div>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto px-6 pb-24 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'home' && (
                <HomeView 
                  profile={profile}
                  onShowMap={() => setShowMap(true)} 
                  onShowTriage={() => setShowTriage(true)}
                  onGoToForum={() => setActiveTab('forum')}
                  onGoToProfile={() => setActiveTab('profile')}
                  onGoToPayments={() => setActiveTab('payments')}
                  onGoToServices={() => setActiveTab('services')}
                />
              )}
              {activeTab === 'networks' && <RedesCiudadanasView profile={profile} onBack={() => setActiveTab('home')} />}
              {activeTab === 'forum' && <ParlamentoView onBack={() => setActiveTab('home')} />}
              {activeTab === 'payments' && <PaymentsView onPay={(item: any) => setPayingItem(item)} onBack={() => setActiveTab('home')} />}
              {activeTab === 'services' && <ServicesView onShowTriage={() => setShowTriage(true)} onBack={() => setActiveTab('home')} onShowTramites={() => setShowTramites(true)} onShowReporte={() => setShowReporte(true)} />}
              {activeTab === 'profile' && <ProfileView profile={profile} onUpdate={updateProfile} onLogout={onLogout} onBack={() => setActiveTab('home')} onGoToSecurity={() => setActiveTab('security')} onShowExpediente={() => setShowExpediente(true)} />}
              {activeTab === 'security' && <SecurityCenterView onBack={() => setActiveTab('profile')} />}
              {activeTab === 'notifications' && <NotificationView onBack={() => setActiveTab('home')} />}

            </motion.div>
          </AnimatePresence>

          {/* Floating AI Assistant Button */}
          <button 
            onClick={() => setShowChat(true)}
            className="fixed bottom-24 right-8 w-14 h-14 bg-magenta-500 rounded-full flex items-center justify-center text-white shadow-xl shadow-magenta-500/30 transform hover:scale-110 transition-transform active:scale-95 z-40"
            style={{backgroundColor:'var(--magenta)'}}
          >
            <Bot className="w-6 h-6" />
          </button>
        </main>

        {/* Navigation Bar */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-2 py-3 pb-8 flex justify-around items-center z-40">
           <TabButton icon={Home} label={translations[lang].home} active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
           <TabButton icon={Users} label={translations[lang].networks} active={activeTab === 'networks'} onClick={() => setActiveTab('networks')} />
           <TabButton icon={MessageSquare} label={translations[lang].forum} active={activeTab === 'forum'} onClick={() => setActiveTab('forum')} />
           <TabButton icon={CreditCard} label={translations[lang].payments} active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
           <TabButton icon={User} label={translations[lang].profile} active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </nav>


        {/* AI Chat Overlay */}
        <AnimatePresence>
          {showChat && (
            <motion.div 
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="absolute inset-0 z-50 bg-white flex flex-col"
            >
               {/* Chat Header */}
               <div className="px-6 py-8 border-b border-slate-100 flex justify-between items-center bg-slate-900 text-white">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-magenta-500 flex items-center justify-center text-white shadow-lg ring-2 ring-white/20"><Bot className="w-6 h-6" /></div>
                    <div>
                      <p className="text-[1.1rem] font-black uppercase tracking-tight leading-none mb-1">Nayarit IA Assistant</p>
                      <p className="text-[10px] text-emerald-400 font-bold uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                        {translations[lang].assistant_online}
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setShowChat(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors">
                    <X className="w-8 h-8" />
                  </button>
               </div>

               {/* Messages Console */}
               <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#f0f2f5] custom-scrollbar">
                  {messages.map((msg, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className={cn(
                        "max-w-[85%] p-4 rounded-3xl text-[1rem] shadow-sm font-medium leading-relaxed",
                        msg.role === 'assistant' 
                          ? "bg-white text-slate-800 rounded-tl-none border border-slate-100" 
                          : "bg-magenta-500 text-white ml-auto rounded-tr-none shadow-magenta-500/20"
                      )}
                      style={msg.role === 'user' ? {backgroundColor: 'var(--magenta)'} : {}}
                    >
                      {msg.content}
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex gap-2 p-4 bg-white rounded-3xl rounded-tl-none border border-slate-200 w-20 shadow-sm">
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  )}
               </div>

               {/* Quick Actions (WhatsApp Style Chips) */}
               <div className="px-4 py-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto custom-scrollbar no-scrollbar scroll-smooth">
                  {quickActions[lang].map((action) => (
                    <button 
                      key={action}
                      onClick={() => handleSendMessage(action)}
                      className="px-5 py-2.5 bg-slate-100 hover:bg-magenta-500 hover:text-white rounded-full text-xs font-black transition-all border border-slate-200 uppercase tracking-widest whitespace-nowrap active:scale-95 shadow-sm"
                    >
                      {action}
                    </button>
                  ))}
               </div>

               {/* Input Area */}
               <div className="p-6 pb-12 bg-white border-t border-slate-100 flex items-center gap-3">
                  <div className="flex-1 relative">
                    <input 
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Escribe tu mensaje..."
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-5 text-[1.1rem] focus:outline-none focus:border-magenta-500 transition-colors pr-14 font-medium"
                    />
                    <button 
                      onClick={() => handleSendMessage()}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-magenta-500 text-white rounded-xl shadow-lg hover:shadow-magenta-500/40 transition-all active:scale-90"
                      style={{backgroundColor:'var(--magenta)'}}
                    >
                      <Send className="w-6 h-6" />
                    </button>
                  </div>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trazabilida Map Overlay */}
        <AnimatePresence>
          {showTriage && (
            <TepictuSalud onClose={() => setShowTriage(false)} />
          )}
          {showMap && (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="absolute inset-0 z-[60] bg-white flex flex-col"
             >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                   <h3 className="font-serif font-black text-lg">Avance de Obra en Vivo</h3>
                   <button onClick={() => { setShowMap(false); setSelectedWork(null); }} className="p-2 bg-slate-100 rounded-full">
                      <ChevronRight className="w-5 h-5 rotate-90" />
                   </button>
                </div>
                <div className="flex-1 relative">
                   <NayaritMap 
                     center={{ lat: 21.5090, lng: -104.8947 }}
                     zoom={15}
                     markers={[
                       { lat: 21.5090, lng: -104.8947, title: "Obra Reencarpetamiento San Juan", color: "#E5007A" },
                       { lat: 21.5120, lng: -104.8970, title: "Luminaria Reportada", color: "#FACC15" }
                     ]}
                   />
                   
                   {/* Floating Project Info */}
                   {!selectedWork && (
                     <motion.button 
                       initial={{ y: 20, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       onClick={() => setSelectedWork({ 
                         title: 'Reencarpetamiento San Juan', 
                         progress: 65, 
                         image: 'https://images.unsplash.com/photo-1541888946425-d81bb19480c5?w=800&q=80',
                         desc: 'Renovación total de 2,400m2 de carpeta asfáltica. Instalación de nueva señalética vertical.'
                       })}
                       className="absolute bottom-6 left-6 right-6 bg-slate-900 p-4 rounded-2xl flex items-center justify-between group"
                     >
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-lg bg-magenta-500 flex items-center justify-center text-white">🏗️</div>
                           <div className="text-left">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Obra en proceso</p>
                              <p className="text-xs font-bold text-white">Ver Detalles del Proyecto</p>
                           </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white" />
                     </motion.button>
                   )}
                </div>

                {selectedWork && (
                   <motion.div 
                     initial={{ y: '100%' }}
                     animate={{ y: 0 }}
                     className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] shadow-2xl p-8 z-50 overflow-y-auto max-h-[80%]"
                   >
                      <button 
                        onClick={() => setSelectedWork(null)}
                        className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-6"
                      ></button>
                      <div className="flex justify-between items-start mb-4">
                         <h2 className="text-2xl font-serif font-black text-slate-900 leading-tight">{selectedWork.title}</h2>
                         <span className="bg-emerald-100 text-emerald-600 px-3 py-1 rounded-full text-[10px] font-black uppercase">Activo</span>
                      </div>
                      <div className="aspect-video w-full rounded-2xl overflow-hidden mb-6 border border-slate-100 shadow-lg">
                         <img src={selectedWork.image} alt="Public Work" className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-4 mb-8">
                         <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Avance Real</p>
                            <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
                               <div className="bg-magenta-500 h-full transition-all duration-1000" style={{ width: `${selectedWork.progress}%`, backgroundColor:'var(--magenta)' }}></div>
                            </div>
                            <p className="text-right text-[10px] font-bold text-magenta-500 mt-2" style={{color:'var(--magenta)'}}>{selectedWork.progress}% Completado</p>
                         </div>
                         <p className="text-sm text-slate-600 leading-relaxed">{selectedWork.desc}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 bg-slate-50 rounded-2xl">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Presupuesto</p>
                            <p className="text-lg font-black text-slate-900">$1,450,200</p>
                         </div>
                         <div className="p-4 bg-slate-50 rounded-2xl">
                            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Finalización</p>
                            <p className="text-lg font-black text-slate-900">14 AGO 2026</p>
                         </div>
                      </div>
                   </motion.div>
                )}
             </motion.div>
          )}
        </AnimatePresence>

        {/* Expediente Único Overlay */}
        <AnimatePresence>
          {showExpediente && (
            <ExpedienteUnicoView onClose={() => setShowExpediente(false)} />
          )}
        </AnimatePresence>

        {/* Trámites Overlay */}
        <AnimatePresence>
          {showTramites && (
            <TramiteTracker onClose={() => setShowTramites(false)} />
          )}
        </AnimatePresence>

        {/* Reportes Ciudadanos Overlay */}
        <AnimatePresence>
          {showReporte && (
            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 35 }}
              className="fixed inset-0 z-50 overflow-y-auto bg-[var(--crema)]"
            >
              <ReporteCiudadanoView onClose={() => setShowReporte(false)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Naya Floating Chat */}
        {!showReporte && !showTramites && !showExpediente && !showChat && !showTriage && (
          <NayaChat />
        )}

        {/* Payment Flow Overlay */}
        <AnimatePresence>
          {payingItem && (
             <motion.div 
               initial={{ y: '100%' }}
               animate={{ y: 0 }}
               exit={{ y: '100%' }}
               className="absolute inset-x-0 bottom-0 top-0 z-[100] bg-white flex flex-col"
             >
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                   <h3 className="font-serif font-black text-lg">Finalizar Pago</h3>
                   <button onClick={() => { setPayingItem(null); setPaymentStep('idle'); }} className="p-2 bg-slate-100 rounded-full">
                      <ChevronRight className="w-5 h-5 rotate-90" />
                   </button>
                </div>

                <div className="flex-1 p-8 overflow-y-auto">
                   {paymentStep === 'idle' && (
                      <div className="space-y-8">
                         <div className="text-center">
                            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white">
                               <CreditCard className="w-8 h-8" />
                            </div>
                            <h4 className="text-xl font-bold">{payingItem.title}</h4>
                            <p className="text-slate-500 text-sm">{payingItem.status}</p>
                         </div>
                         <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                            <div className="flex justify-between items-center mb-4">
                               <span className="text-slate-500 text-sm">Subtotal</span>
                               <span className="font-bold">{payingItem.val}</span>
                            </div>
                            <div className="flex justify-between items-center text-magenta-500 font-bold text-sm mb-6">
                               <span>Descuento "Pronto Pago"</span>
                               <span>-15%</span>
                            </div>
                            <div className="h-px bg-slate-200 mb-6"></div>
                            <div className="flex justify-between items-center">
                               <span className="font-black text-lg">Total a Pagar</span>
                               <span className="font-black text-3xl text-slate-900">$204.00</span>
                            </div>
                         </div>
                         <div className="space-y-3">
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-4">Método de Pago</p>
                            <button 
                              onClick={() => setPaymentMethod('card')}
                              className={cn(
                                "w-full p-4 border rounded-2xl flex items-center justify-between transition-all",
                                paymentMethod === 'card' ? "bg-white border-magenta-500 ring-2 ring-magenta-500/10 shadow-lg" : "bg-white border-slate-100"
                              )}
                            >
                               <div className="flex items-center gap-4">
                                  <div className="w-8 h-5 bg-slate-100 rounded"></div>
                                  <span className="font-bold text-sm">VISA •••• 4412</span>
                               </div>
                               <div className={cn(
                                 "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                 paymentMethod === 'card' ? "border-magenta-500 bg-white" : "border-slate-200"
                               )}>
                                 {paymentMethod === 'card' && <div className="w-2.5 h-2.5 rounded-full bg-magenta-500"></div>}
                               </div>
                            </button>
                            
                            <button 
                              onClick={() => setPaymentMethod('cash')}
                              className={cn(
                                "w-full p-4 border rounded-2xl flex items-center justify-between transition-all",
                                paymentMethod === 'cash' ? "bg-white border-magenta-500 ring-2 ring-magenta-500/10 shadow-lg" : "bg-white border-slate-100"
                              )}
                            >
                               <div className="flex items-center gap-4">
                                  <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                                     <Barcode className="w-5 h-5" />
                                  </div>
                                  <div>
                                     <span className="font-bold text-sm block">Pago en Efectivo</span>
                                     <span className="text-[10px] text-slate-400 uppercase block">OXXO / CASINO / TELECOMM</span>
                                  </div>
                               </div>
                               <div className={cn(
                                 "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all",
                                 paymentMethod === 'cash' ? "border-magenta-500 bg-white" : "border-slate-200"
                               )}>
                                 {paymentMethod === 'cash' && <div className="w-2.5 h-2.5 rounded-full bg-magenta-500"></div>}
                               </div>
                            </button>
                         </div>
                      </div>
                   )}

                   {paymentStep === 'cash_instructions' && (
                      <div className="flex flex-col items-center">
                         <div className="bg-slate-50 w-full rounded-3xl p-6 border border-slate-100 shadow-sm space-y-6">
                            <div className="text-center space-y-1">
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Referencia de Pago</p>
                               <h1 className="text-xl font-mono font-black text-slate-900 tracking-tighter">{paymentRef}</h1>
                            </div>
                            
                            <div className="bg-white p-4 rounded-xl flex items-center justify-center border border-slate-100 shadow-sm overflow-hidden">
                               <svg ref={barcodeRef} className="w-full h-auto"></svg>
                            </div>

                            <div className="flex justify-center py-2">
                               <div className="p-4 bg-white rounded-2xl shadow-lg border border-slate-100">
                                  <QRCodeSVG 
                                    value={`https://gobernanza.digital/pago?ref=${paymentRef}&monto=204&curp=PEGJ900101HNT`}
                                    size={140}
                                    level="H"
                                    includeMargin={true}
                                  />
                               </div>
                            </div>

                            <div className="space-y-3">
                               <div className="flex justify-between items-center text-sm">
                                  <span className="text-slate-500">Monto:</span>
                                  <span className="font-bold text-slate-900">$204.00 MXN</span>
                               </div>
                               <div className="flex justify-between items-center text-sm">
                                  <span className="text-slate-500">Vence:</span>
                                  <span className="font-bold text-slate-900">15 JUN 2026</span>
                               </div>
                            </div>
                         </div>
                         
                         <div className="mt-8 text-center space-y-4">
                            <div className="flex items-center justify-center gap-2 text-magenta-500 font-bold text-xs" style={{color:'var(--magenta)'}}>
                               <div className="w-2 h-2 rounded-full bg-magenta-500 animate-pulse"></div>
                               ESPERANDO PAGO EN CAJA
                            </div>
                            <p className="text-xs text-slate-400 italic px-4 leading-relaxed">
                               Muestra este código en cualquier OXXO, Casino o Telecomm. El cajero escaneará el código de barras y recibirás tu ticket de confirmación.
                            </p>
                         </div>
                      </div>
                   )}

                   {paymentStep === 'processing' && (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                         <div className="relative">
                            <div className="w-24 h-24 border-4 border-slate-100 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-magenta-500 border-t-transparent rounded-full animate-spin"></div>
                         </div>
                         <p className="mt-8 font-serif font-black text-2xl">Procesando Pago...</p>
                         <p className="text-slate-500 text-sm mt-2">Seguridad Bancaria ConnectX</p>
                      </div>
                   )}

                   {paymentStep === 'success' && (
                      <div className="h-full flex flex-col items-center justify-center text-center">
                         <motion.div 
                           initial={{ scale: 0.5, opacity: 0 }}
                           animate={{ scale: 1, opacity: 1 }}
                           className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center text-white mb-8"
                         >
                            <Plus className="w-12 h-12 rotate-45 scale-125" />
                         </motion.div>
                         <h4 className="font-serif font-black text-3xl mb-2">¡Pago Exitoso!</h4>
                         <p className="text-slate-500 text-sm mb-8">El comprobante ha sido enviado a tu correo y guardado en tu perfil.</p>
                         <div className="w-full bg-slate-50 p-6 rounded-2xl border border-dashed border-slate-300 text-left font-mono">
                            <p className="text-[10px] text-slate-400 flex justify-between">AUT: <span>889210-XC</span></p>
                            <p className="text-[10px] text-slate-400 flex justify-between">FECHA: <span>13 JUN 2026</span></p>
                            <p className="text-sm font-bold mt-4 flex justify-between font-sans">TOTAL: <span>$204.00 MXN</span></p>
                         </div>
                      </div>
                   )}
                </div>

                <div className="p-8 pb-12">
                   {paymentStep === 'idle' && (
                      <button 
                        onClick={async () => {
                          if (paymentMethod === 'card') {
                            setPaymentStep('processing');
                            setTimeout(() => setPaymentStep('success'), 2000);
                          } else {
                            await generatePaymentRef();
                            setPaymentStep('cash_instructions');
                          }
                        }}
                        className="w-full py-4 bg-slate-900 text-white rounded-full font-black shadow-xl transition-transform active:scale-95"
                      >
                         {paymentMethod === 'card' ? 'Pagar $204.00 MNX' : 'Generar Código de Pago'}
                      </button>
                   )}
                   {paymentStep === 'cash_instructions' && (
                      <button 
                        onClick={() => { setPayingItem(null); setPaymentStep('idle'); setActiveTab('home'); }}
                        className="w-full py-4 bg-slate-900 text-white rounded-full font-black shadow-xl"
                      >
                         Volver al Inicio
                      </button>
                   )}
                   {paymentStep === 'success' && (
                      <button 
                        onClick={() => { setPayingItem(null); setPaymentStep('idle'); setActiveTab('home'); }}
                        className="w-full py-4 bg-slate-900 text-white rounded-full font-black shadow-xl"
                      >
                         Entendido
                      </button>
                   )}
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
    )}
    </>
  );
}
