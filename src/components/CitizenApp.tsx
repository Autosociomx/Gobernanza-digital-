import React, { useState } from 'react';
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
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { NayaritMap } from './NayaritMap';

type TabType = 'home' | 'payments' | 'services' | 'profile';

export function CitizenApp({ onLogout }: { onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [showChat, setShowChat] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedWork, setSelectedWork] = useState<any>(null);
  const [payingItem, setPayingItem] = useState<any>(null);
  const [paymentStep, setPaymentStep] = useState<'idle' | 'processing' | 'success'>('idle');
  
  // AI Chat State
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant', content: string }>>([
    { role: 'assistant', content: '¡Hola Juan! Soy tu Asistente de Nayarit Digital. Puedo ayudarte con tus reportes, pagos o cualquier duda sobre los servicios de Tepic. ¿En qué te puedo apoyar hoy?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg = inputValue.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg })
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
        <header className="px-6 py-4 flex justify-between items-center">
          <div>
            <p className="text-[10px] uppercase tracking-widest font-black text-magenta-500" style={{color:'var(--magenta)'}}>Nayarit Digital</p>
            <h1 className="text-xl font-serif font-black text-slate-900 leading-tight">Hola, Juan Pérez</h1>
          </div>
          <div className="relative">
             <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white shadow-sm overflow-hidden flex items-center justify-center">
                <User className="w-5 h-5 text-slate-400" />
             </div>
             <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-[8px] text-white font-bold">2</div>
          </div>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto px-6 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === 'home' && <HomeView onShowMap={() => setShowMap(true)} />}
              {activeTab === 'payments' && <PaymentsView onPay={(item: any) => setPayingItem(item)} />}
              {activeTab === 'services' && <ServicesView />}
              {activeTab === 'profile' && <ProfileView onLogout={onLogout} />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Navigation Bar */}
        <nav className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-slate-100 px-6 py-3 pb-8 flex justify-between items-center z-40">
           <TabButton icon={Home} label="Inicio" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
           <TabButton icon={CreditCard} label="Pagos" active={activeTab === 'payments'} onClick={() => setActiveTab('payments')} />
           <div className="relative -mt-10">
              <button 
                onClick={() => setShowChat(true)}
                className="w-14 h-14 bg-black rounded-full flex items-center justify-center shadow-xl shadow-black/20 text-white transform hover:scale-110 transition-transform active:scale-95"
              >
                <Plus className="w-6 h-6" />
              </button>
           </div>
           <TabButton icon={FileText} label="Trámites" active={activeTab === 'services'} onClick={() => setActiveTab('services')} />
           <TabButton icon={User} label="Perfil" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
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
               <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white">🌽</div>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Nayarit IA Assistant</p>
                      <p className="text-[10px] text-emerald-500 font-bold uppercase">Online · Wixárika Support</p>
                    </div>
                  </div>
                  <button onClick={() => setShowChat(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                     <ChevronRight className="w-5 h-5 text-slate-400 rotate-90" />
                  </button>
               </div>
               <div className="flex-1 p-6 overflow-y-auto space-y-4">
                  {messages.map((msg, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "p-4 text-sm max-w-[85%] transition-all",
                        msg.role === 'assistant' 
                          ? "bg-slate-100 rounded-2xl rounded-tl-none text-slate-700" 
                          : "bg-magenta-500 text-white rounded-2xl rounded-tr-none ml-auto"
                      )}
                      style={msg.role === 'user' ? {backgroundColor:'var(--magenta)'} : {}}
                    >
                       {msg.content}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="bg-slate-100 rounded-2xl rounded-tl-none p-4 w-12 flex justify-center">
                       <Loader2 className="w-5 h-5 animate-spin text-slate-400" />
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2 pt-2">
                     {['Pagar Predial', 'Reportar bache', 'Consulta SIAPA', 'Agendar Cita'].map(q => (
                       <button 
                         key={q} 
                         onClick={() => { setInputValue(q); }}
                         className="px-3 py-1.5 rounded-full border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 transition-colors"
                       >
                         {q}
                       </button>
                     ))}
                  </div>
               </div>
               <div className="p-6 pb-10 border-t border-slate-100 flex gap-2">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe tu mensaje..." 
                    className="flex-1 bg-slate-100 border-none rounded-full px-5 py-3 text-sm focus:ring-2 focus:ring-slate-200 outline-none" 
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isTyping}
                    className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center text-white disabled:opacity-50"
                  >
                     <Send className="w-5 h-5" />
                  </button>
               </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trazabilida Map Overlay */}
        <AnimatePresence>
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
                            <button className="w-full p-4 bg-white border-2 border-magenta-500 rounded-2xl flex items-center justify-between">
                               <div className="flex items-center gap-4">
                                  <div className="w-8 h-5 bg-slate-100 rounded"></div>
                                  <span className="font-bold text-sm">VISA •••• 4412</span>
                               </div>
                               <div className="w-4 h-4 border-4 border-magenta-500 rounded-full"></div>
                            </button>
                            <button className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center gap-4 opacity-50 grayscale">
                               <div className="w-8 h-5 bg-slate-100 rounded"></div>
                               <span className="font-bold text-sm">Tarjeta Mercado Pago</span>
                            </button>
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
                        onClick={() => {
                          setPaymentStep('processing');
                          setTimeout(() => setPaymentStep('success'), 2000);
                        }}
                        className="w-full py-4 bg-slate-900 text-white rounded-full font-black shadow-xl transition-transform active:scale-95"
                      >
                         Pagar $204.00 MNX
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

function HomeView({ onShowMap }: { onShowMap: () => void }) {
  return (
    <div className="space-y-6 pt-2">
      {/* RUTA Digitial Card */}
      <div className="bg-gradient-to-br from-slate-900 to-indigo-900 rounded-[2rem] p-6 text-white relative overflow-hidden shadow-xl shadow-indigo-900/20">
         <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-10 -mt-10 blur-2xl"></div>
         <p className="text-[10px] font-mono text-white/50 uppercase tracking-widest mb-4">RUTA Digital NAY</p>
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

      {/* Quick Actions */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Servicios Frecuentes</h2>
        <div className="grid grid-cols-2 gap-4">
           <QuickAction icon={Droplets} label="Pago de Agua" color="bg-blue-50 text-blue-600" />
           <QuickAction icon={CreditCard} label="Predial 2026" color="bg-emerald-50 text-emerald-600" />
           <QuickAction icon={Stethoscope} label="Triaje Médico" color="bg-rose-50 text-rose-600" />
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
           onClick={() => onShowMap()}
           className="mt-4 text-xs font-bold text-magenta-500 flex items-center gap-1" style={{color:'var(--magenta)'}}
         >
           Ver Trazabilidad <ChevronRight className="w-3 h-3" />
         </button>
      </div>
    </div>
  );
}

function QuickAction({ icon: Icon, label, color }: { icon: any, label: string, color: string }) {
  return (
    <div className={cn("p-4 rounded-2xl flex flex-col gap-3 transition-transform active:scale-95 cursor-pointer", color)}>
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

function ServicesView() {
  return (
    <div className="pt-2 space-y-6">
      <h2 className="text-xl font-serif font-black text-slate-900">Trámites y Reportes</h2>
      <div className="relative">
         <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
         <input type="text" placeholder="Buscar trámite o reporte..." className="w-full bg-slate-100 border-none rounded-2xl pl-12 pr-4 py-4 text-sm outline-none" />
      </div>
      <div className="space-y-3">
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
