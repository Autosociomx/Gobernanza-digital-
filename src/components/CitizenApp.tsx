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
  Stethoscope,
  Lightbulb,
  Droplets,
  Send,
  Loader2,
  Barcode,
  QrCode,
  Heart,
  X,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { NayaritMap } from './NayaritMap';
import { TepictuSalud } from './TepictuSalud';
import { ForumView } from './ForumView';
import { QRCodeSVG } from 'qrcode.react';
import JsBarcode from 'jsbarcode';

type TabType = 'home' | 'forum' | 'payments' | 'services' | 'profile';
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
  const [showChat, setShowChat] = useState(initialAction === 'chat');
  const [showMap, setShowMap] = useState(initialAction === 'map');
  const [showTriage, setShowTriage] = useState(initialAction === 'triage');
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [payingItem, setPayingItem] = useState<any>(null);
  const [paymentStep, setPaymentStep] = useState<'idle' | 'processing' | 'success' | 'cash_instructions'>('idle');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [paymentRef, setPaymentRef] = useState<string>('');
  const [lang, setLang] = useState<Language>('es');
  
  const translations = {
    es: {
      welcome: "Hola, Juan Pérez",
      ai_greet: "¡Hola Juan! Soy tu Asistente de Nayarit Digital. Puedo ayudarte con tus reportes, pagos o cualquier duda sobre los servicios de Tepic. ¿En qué te puedo apoyar hoy?",
      home: "Inicio",
      forum: "Foro",
      payments: "Pagos",
      services: "Trámites",
      profile: "Perfil",
      assistant_online: "Online · Wixárika Support",
    },
    cora: {
      welcome: "Tyu'un, Juan Pérez",
      ai_greet: "Pue'en Juan! Ne'ij tyu'iti'in Nayarit Digital. Ne'ij amu'u ne'itye tyu'uti'in...",
      home: "Tyu'un",
      forum: "Tyu'uchal",
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
             <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                <User className="w-5 h-5 text-slate-400" />
             </div>
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
                  onShowMap={() => setShowMap(true)} 
                  onShowTriage={() => setShowTriage(true)}
                  onGoToForum={() => setActiveTab('forum')}
                />
              )}
              {activeTab === 'forum' && <ForumView />}
              {activeTab === 'payments' && <PaymentsView onPay={(item: any) => setPayingItem(item)} />}
              {activeTab === 'services' && <ServicesView onShowTriage={() => setShowTriage(true)} />}
              {activeTab === 'profile' && <ProfileView onLogout={onLogout} />}
            </motion.div>
          </AnimatePresence>

          {/* Floating AI Assistant Button */}
          <button 
            onClick={() => setShowChat(true)}
            className="fixed bottom-24 right-8 w-14 h-14 bg-magenta-500 rounded-full flex items-center justify-center text-2xl shadow-xl shadow-magenta-500/30 transform hover:scale-110 transition-transform active:scale-95 z-40"
            style={{backgroundColor:'var(--magenta)'}}
          >
            🌽
          </button>
        </main>

        {/* Navigation Bar */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-2 py-3 pb-8 flex justify-around items-center z-40">
           <TabButton icon={Home} label={translations[lang].home} active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
           <TabButton icon={Users} label={translations[lang].forum} active={activeTab === 'forum'} onClick={() => setActiveTab('forum')} />
           <TabButton icon={CreditCard} label={translations[lang].payments} active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
           <TabButton icon={FileText} label={translations[lang].services} active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
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
                    <div className="w-12 h-12 rounded-full bg-magenta-500 flex items-center justify-center text-xl shadow-lg ring-2 ring-white/20">🌽</div>
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
  );
}

function TabButton({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 group">
      <Icon className={cn("w-5 h-5 transition-colors", active ? "text-magenta-500" : "text-slate-400 group-hover:text-slate-600")} style={active ? {color:'var(--magenta)'} : {}} />
      <span className={cn("text-[9px] font-bold uppercase tracking-wider transition-colors", active ? "text-magenta-500" : "text-slate-400")} style={active ? {color:'var(--magenta)'} : {}}>{label}</span>
    </button>
  );
}

function HomeView({ onShowMap, onShowTriage, onGoToForum }: { onShowMap: () => void, onShowTriage: () => void, onGoToForum: () => void }) {
  return (
    <div className="space-y-6 pt-2">
      {/* RUTA Digitial Card */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-900/20">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
         <div className="flex justify-between items-start">
            <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-4">RUTA Digital Ciudadana</p>
            <span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-[8px] font-black tracking-widest uppercase border border-blue-500/30">Transportista Acceso</span>
         </div>
         <div className="flex justify-between items-end">
            <div>
              <p className="text-2xl font-serif font-bold">JUAN PÉREZ G.</p>
              <p className="text-xs font-mono text-white/60 mt-1">CURP: PEGJ900101HNT...</p>
            </div>
            <div className="w-12 h-12 bg-white rounded-lg p-1.5">
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=JuanPerez" alt="QR" className="w-full h-full" />
            </div>
         </div>
      </div>

      {/* Forum CTA for Transportistas */}
      <button 
        onClick={onGoToForum}
        className="w-full bg-[var(--verde)] rounded-2xl p-5 flex items-center justify-between text-white shadow-lg overflow-hidden relative group"
        style={{backgroundColor: 'var(--verde)'}}
      >
        <div className="absolute right-0 top-0 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
           <Users className="w-24 h-24" />
        </div>
        <div className="flex items-center gap-4 relative z-10">
           <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl">🚛</div>
           <div className="text-left">
              <p className="font-serif font-black text-lg leading-tight">Foro Comunitario Alianza</p>
              <p className="text-[10px] text-white/70 font-bold uppercase tracking-widest">Panel de Transportistas</p>
           </div>
        </div>
        <ChevronRight className="w-5 h-5 relative z-10" />
      </button>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Servicios Frecuentes</h2>
        <div className="grid grid-cols-2 gap-4">
           <QuickAction icon={Droplets} label="Pago de Agua" color="bg-blue-50 text-blue-600" />
           <QuickAction icon={CreditCard} label="Predial 2026" color="bg-emerald-50 text-emerald-600" />
           <QuickAction icon={Stethoscope} label="Triaje Médico" color="bg-rose-50 text-rose-600" onClick={onShowTriage} />
           <QuickAction icon={Lightbulb} label="Luminarias" color="bg-amber-50 text-amber-600" />
        </div>
      </div>

      {/* News / Notifications */}
      <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
         <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Novedades Tepic</span>
            <Bell className="w-4 h-4 text-slate-400" />
         </div>
         <p className="text-sm font-bold text-slate-900 leading-tight">Nueva obra de reencarpetamiento en tu colonia (San Juan).</p>
         <p className="text-xs text-slate-500 mt-2">Inversión: $1.2M. Haz clic para ver el avance en vivo.</p>
         <button 
           onClick={onShowMap}
           className="mt-4 text-xs font-bold text-magenta-500 flex items-center gap-1" style={{color:'var(--magenta)'}}
         >
           Ver Trazabilidad <ChevronRight className="w-3 h-3" />
         </button>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, color, onClick }: { icon: any, label: string, color: string, onClick?: () => void }) {
  return (
    <div 
      onClick={onClick}
      className={cn("p-4 rounded-2xl flex flex-col gap-3 transition-transform active:scale-95 cursor-pointer", color)}
    >
       <Icon className="w-6 h-6" />
       <span className="text-xs font-bold leading-tight">{label}</span>
    </div>
  );
}

function PaymentsView({ onPay }: { onPay: (item: any) => void }) {
  return (
    <div className="pt-2 space-y-6">
      <h2 className="text-xl font-serif font-black text-slate-900">Pagos y Facturas</h2>
      <div className="space-y-4">
        {[
          { icon: Droplets, title: 'Servicio de Agua', val: '$240.00', status: 'Pendiente', color: 'text-blue-500' },
          { icon: CreditCard, title: 'Predial Anual', val: '$1,850.00', status: 'Pagado', color: 'text-emerald-500' },
        ].map((item, i) => (
          <div key={i} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
             <div className="flex items-center gap-4">
                <div className={cn("p-2 rounded-xl bg-slate-50", item.color)}>
                   <item.icon className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-sm font-bold text-slate-900">{item.title}</p>
                   <p className="text-[10px] text-slate-400 uppercase font-bold">{item.status}</p>
                </div>
             </div>
             <div className="text-right">
                <p className="text-sm font-black text-slate-900">{item.val}</p>
                {item.status === 'Pendiente' && (
                  <button 
                    onClick={() => onPay(item)}
                    className="text-[10px] font-bold text-magenta-500 uppercase mt-1" 
                    style={{color:'var(--magenta)'}}
                  >
                    Pagar Ahora
                  </button>
                )}
             </div>
          </div>
        ))}
      </div>
      <div className="p-6 bg-slate-900 rounded-[2rem] text-center text-white">
         <p className="text-xs font-mono text-white/50 uppercase tracking-widest mb-2">Descuento Pronto Pago</p>
         <p className="text-2xl font-black text-solar-500" style={{color:'var(--solar)'}}>-15% EXTRA</p>
         <p className="text-[10px] text-white/70 mt-2">Válido hasta el 31 de Marzo de 2026</p>
      </div>
    </div>
  );
}

function ServicesView({ onShowTriage }: { onShowTriage: () => void }) {
  return (
    <div className="pt-2 space-y-6">
      <h2 className="text-xl font-serif font-black text-slate-900">Trámites y Reportes</h2>
      <div className="relative">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
         <input type="text" placeholder="Buscar trámite o reporte..." className="w-full bg-slate-100 border-none rounded-2xl pl-12 pr-4 py-4 text-sm outline-none" />
      </div>
      <div className="space-y-3">
         <div 
            onClick={onShowTriage}
            className="flex justify-between items-center p-4 bg-rose-50 border border-rose-100 rounded-2xl cursor-pointer"
         >
            <div className="flex items-center gap-3">
              <Stethoscope className="w-4 h-4 text-rose-600" />
              <span className="text-sm font-bold text-rose-700">Triaje Médico TepictuSalud</span>
            </div>
            <ChevronRight className="w-4 h-4 text-rose-300" />
         </div>
         {['Licencia de Funcionamiento', 'Permiso de Construcción', 'Uso de Suelo', 'Reporte de Bache', 'Falla de Alumbrado'].map(s => (
           <div key={s} className="flex justify-between items-center p-4 bg-white border border-slate-100 rounded-2xl">
              <span className="text-sm font-medium text-slate-700">{s}</span>
              <ChevronRight className="w-4 h-4 text-slate-300" />
           </div>
         ))}
      </div>
    </div>
  );
}

function ProfileView({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="pt-2 space-y-6">
      <div className="flex flex-col items-center gap-3 py-6">
         <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-xl overflow-hidden">
            <img src="https://images.unsplash.com/photo-1541614101331-1a5a3a194e92?w=300&h=300" alt="Avatar" className="w-full h-full object-cover" />
         </div>
         <div className="text-center">
            <h2 className="text-xl font-black text-slate-900">Juan Pérez González</h2>
            <p className="text-xs font-mono text-slate-500 mt-1 uppercase tracking-widest">Nivel de Ciudadanía: Oro</p>
         </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
         <div className="p-4 bg-slate-50 rounded-2xl text-center">
           <p className="text-xl font-black text-slate-900">12</p>
           <p className="text-[10px] text-slate-400 uppercase font-bold">Reportes Resueltos</p>
         </div>
         <div className="p-4 bg-slate-50 rounded-2xl text-center">
           <p className="text-xl font-black text-slate-900">450</p>
           <p className="text-[10px] text-slate-400 uppercase font-bold">Conecta Puntos</p>
         </div>
      </div>
      <div className="space-y-2">
         <button className="w-full p-4 bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl text-left text-sm font-medium text-slate-700">Configuración de Seguridad</button>
         <button className="w-full p-4 bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl text-left text-sm font-medium text-slate-700">Mis Notificaciones</button>
         <button onClick={onLogout} className="w-full p-4 bg-red-50 text-red-600 rounded-2xl text-left text-sm font-bold mt-4">Cerrar Sesión</button>
      </div>
    </div>
  );
}
