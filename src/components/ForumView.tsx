import React, { useState, useEffect } from 'react';
import { 
  MessageSquare, 
  Plus, 
  ChevronLeft, 
  Send, 
  Trash2, 
  Clock, 
  User as UserIcon,
  Filter,
  ShieldCheck,
  HardHat,
  Construction,
  AlertCircle
} from 'lucide-react';
import { 
  collection, 
  query, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  serverTimestamp, 
  doc, 
  updateDoc, 
  increment,
  deleteDoc
} from 'firebase/firestore';
import { db, auth, handleFirestoreError, OperationType } from '../firebase';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

type Category = 'SEGURIDAD_VECINAL' | 'REDES_APOYO' | 'PROPUESTAS_COLONIA' | 'GENERAL';

interface Thread {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  category: Category;
  createdAt: any;
  commentCount?: number;
  isVerified?: boolean;
}

interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: any;
}

export function ForumView({ onBack }: { onBack?: () => void }) {
  const [view, setView] = useState<'list' | 'create' | 'detail'>('list');
  const [selectedThread, setSelectedThread] = useState<Thread | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Category | 'ALL'>('ALL');

  // Form states
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<Category>('GENERAL');

  useEffect(() => {
    const q = query(collection(db, 'forum_threads'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const threadData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Thread[];
      setThreads(threadData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'forum_threads');
    });

    return () => unsubscribe();
  }, []);

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    try {
      await addDoc(collection(db, 'forum_threads'), {
        title: newTitle,
        content: newContent,
        category: newCategory,
        authorId: auth.currentUser?.uid || 'anonymous',
        authorName: auth.currentUser?.displayName || 'Juan Pérez',
        createdAt: serverTimestamp(),
        commentCount: 0
      });
      setNewTitle('');
      setNewContent('');
      setView('list');
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'forum_threads');
    }
  };

  const filteredThreads = filter === 'ALL' 
    ? threads 
    : threads.filter(t => t.category === filter);

  return (
    <div className="flex flex-col h-full bg-slate-50">
      <AnimatePresence mode="wait">
        {view === 'list' && (
          <motion.div 
            key="list"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col h-full"
          >
            <div className="px-6 py-4 bg-white border-b border-slate-100 flex justify-between items-center sticky top-0 z-10">
               <div className="flex items-center gap-4">
                  {onBack && (
                     <button onClick={onBack} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                        <ChevronLeft className="w-5 h-5 text-slate-600" />
                     </button>
                   )}
                  <div className="flex flex-col">
                     <h2 className="text-xl font-serif font-black text-slate-900 tracking-tight">Foro Ciudadano</h2>
                     <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Nayarit ID · Comunidad</p>
                  </div>
               </div>
               <button 
                 onClick={() => setView('create')}
                 className="w-10 h-10 bg-magenta-500 text-white rounded-2xl shadow-lg flex items-center justify-center transition-transform active:scale-90"
                 style={{backgroundColor:'var(--magenta)'}}
               >
                 <Plus className="w-6 h-6" />
               </button>
            </div>

            {/* Filter Chips */}
            <div className="px-6 py-3 flex gap-2 overflow-x-auto no-scrollbar bg-white">
              {(['ALL', 'SEGURIDAD_VECINAL', 'REDES_APOYO', 'PROPUESTAS_COLONIA', 'GENERAL'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={cn(
                    "px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border whitespace-nowrap",
                    filter === cat 
                      ? "bg-slate-900 text-white border-slate-900" 
                      : "bg-slate-50 text-slate-400 border-slate-200"
                  )}
                >
                  {cat === 'ALL' ? 'Todos' : cat.replace(/_/g, ' ')}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {loading ? (
                <div className="flex justify-center py-12">
                   <div className="w-8 h-8 border-4 border-magenta-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : filteredThreads.length === 0 ? (
                <div className="text-center py-20 text-slate-400">
                   <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-20" />
                   <p className="font-bold text-sm">No hay discusiones aún</p>
                   <p className="text-xs">Sé el primero en iniciar una charla.</p>
                </div>
              ) : (
                filteredThreads.map(thread => (
                  <ThreadCard 
                    key={thread.id} 
                    thread={thread} 
                    onClick={() => {
                      setSelectedThread(thread);
                      setView('detail');
                    }} 
                  />
                ))
              )}
            </div>
          </motion.div>
        )}

        {view === 'create' && (
          <motion.div 
            key="create"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="flex flex-col h-full bg-white"
          >
            <div className="px-6 py-4 border-b border-slate-100 flex items-center gap-4">
              <button onClick={() => setView('list')} className="p-2 bg-slate-100 rounded-full">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-lg font-black font-serif">Nueva Discusión</h2>
            </div>

            <form onSubmit={handleCreateThread} className="p-6 space-y-6">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Categoría</label>
                <div className="grid grid-cols-1 gap-2">
                  {(['SEGURIDAD_VECINAL', 'REDES_APOYO', 'PROPUESTAS_COLONIA', 'GENERAL'] as Category[]).map(cat => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setNewCategory(cat)}
                      className={cn(
                        "py-3 px-4 rounded-xl text-xs font-bold border transition-all flex items-center gap-2",
                        newCategory === cat 
                          ? "bg-slate-900 text-white border-slate-900" 
                          : "bg-slate-50 text-slate-500 border-slate-100"
                      )}
                    >
                      {getCategoryIcon(cat)}
                      {cat.replace(/_/g, ' ')}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Título</label>
                <input 
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  placeholder="Ej: Problemas con luminarias en Av. Insurgentes"
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm font-bold"
                />
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">Tu mensaje</label>
                <textarea 
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  placeholder="Describe la situación o comparte tu información..."
                  rows={6}
                  className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-sm leading-relaxed"
                />
              </div>

              <div className="bg-amber-50 rounded-xl p-4 flex gap-3 border border-amber-100 mb-4">
                 <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
                 <p className="text-[10px] text-amber-700 leading-tight">
                    Recuerda mantener un ambiente constructivo y respetuoso. Este foro es moderado por la Alianza Nayarit.
                 </p>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-magenta-500 text-white rounded-full font-black shadow-xl shadow-magenta-500/20"
                style={{backgroundColor:'var(--magenta)'}}
              >
                Publicar Hilo
              </button>
            </form>
          </motion.div>
        )}

        {view === 'detail' && selectedThread && (
          <ThreadDetail 
            thread={selectedThread} 
            onBack={() => setView('list')} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ThreadCard({ thread, onClick }: { thread: Thread, onClick: () => void }) {
  const isStamnay = thread.authorId === 'MODERATOR' || thread.authorName.includes('STAMNAY') || thread.isVerified;

  return (
    <div 
      onClick={onClick}
      className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative overflow-hidden"
    >
      {isStamnay && (
        <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[7px] font-black uppercase px-3 py-1 rounded-bl-xl tracking-tighter flex items-center gap-1">
          <ShieldCheck className="w-2 h-2" />
          STAMNAY MODERADO
        </div>
      )}
      <div className="flex justify-between items-start mb-3">
        <span className={cn(
          "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
          getCategoryColor(thread.category)
        )}>
          {thread.category.replace(/_/g, ' ')}
        </span>
        <div className="flex items-center gap-1.5 text-slate-400">
           <Clock className="w-3 h-3" />
           <span className="text-[10px] font-medium">{formatDate(thread.createdAt)}</span>
        </div>
      </div>
      <h3 className="text-base font-black text-slate-900 mb-2 leading-tight">{thread.title}</h3>
      <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">{thread.content}</p>
      <div className="flex justify-between items-center pt-4 border-t border-slate-50">
         <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center">
               <UserIcon className="w-3 h-3 text-slate-400" />
            </div>
            <span className="text-[10px] font-bold text-slate-700">{thread.authorName}</span>
         </div>
         <div className="flex items-center gap-1.5 text-magenta-500">
            <MessageSquare className="w-3.5 h-3.5" />
            <span className="text-xs font-black">{thread.commentCount || 0}</span>
         </div>
      </div>
    </div>
  );
}

function ThreadDetail({ thread, onBack }: { thread: Thread, onBack: () => void }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, `forum_threads/${thread.id}/comments`), 
      orderBy('createdAt', 'asc')
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Comment[];
      setComments(commentData);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, `forum_threads/${thread.id}/comments`);
    });

    return () => unsubscribe();
  }, [thread.id]);

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    setSubmitting(true);
    try {
      const commentPath = `forum_threads/${thread.id}/comments`;
      await addDoc(collection(db, commentPath), {
        threadId: thread.id,
        content: newComment,
        authorId: auth.currentUser?.uid || 'anonymous',
        authorName: auth.currentUser?.displayName || 'Juan Pérez',
        createdAt: serverTimestamp()
      });
      
      // Update comment count on thread
      await updateDoc(doc(db, 'forum_threads', thread.id), {
        commentCount: increment(1)
      });

      setNewComment('');
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `forum_threads/${thread.id}/comments`);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteThread = async () => {
    if (!confirm('¿Estás seguro de eliminar este hilo?')) return;
    try {
      await deleteDoc(doc(db, 'forum_threads', thread.id));
      onBack();
    } catch (error) {
      handleFirestoreError(error, OperationType.DELETE, 'forum_threads');
    }
  };

  const isAuthor = auth.currentUser?.uid === thread.authorId || thread.authorId === 'anonymous'; // anonymous for demo

  return (
    <motion.div 
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      className="flex flex-col h-full bg-white relative z-50"
    >
      <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 bg-slate-100 rounded-full">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Detalles del Hilo</span>
        </div>
        {isAuthor && (
           <button onClick={handleDeleteThread} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
              <Trash2 className="w-5 h-5" />
           </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Original Post */}
        <div className="p-6 border-b border-slate-50">
          <div className="flex justify-between items-start mb-4">
            <div className="flex gap-2">
              <span className={cn(
                "px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
                getCategoryColor(thread.category)
              )}>
                {thread.category.replace(/_/g, ' ')}
              </span>
            </div>
            {thread.isVerified && (
               <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-100 shadow-sm">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span className="text-[9px] font-bold uppercase tracking-wider">Moderación STAMNAY</span>
               </div>
            )}
          </div>
          <h2 className="text-xl font-black text-slate-900 mb-4 leading-tight">{thread.title}</h2>
          <div className="flex items-center gap-2 mb-6">
             <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                <UserIcon className="w-4 h-4 text-slate-400" />
             </div>
             <div>
                <p className="text-[11px] font-black text-slate-900">{thread.authorName}</p>
                <p className="text-[9px] text-slate-400 font-medium uppercase tracking-tight">{formatDate(thread.createdAt)}</p>
             </div>
          </div>
          <ThreadContent content={thread.content} />
        </div>

        {/* Comments Section */}
        <div className="bg-slate-50 p-6 min-h-full">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Respuestas ({comments.length})</h3>
           <div className="space-y-6">
              {comments.map(comment => (
                <div key={comment.id} className="flex gap-3">
                   <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                      <UserIcon className="w-4 h-4 text-slate-400" />
                   </div>
                   <div className="flex-1">
                      <div className="bg-white p-4 rounded-2xl rounded-tl-none shadow-sm border border-slate-100">
                         <div className="flex justify-between items-center mb-1">
                            <span className="text-[11px] font-black text-slate-900">{comment.authorName}</span>
                            <span className="text-[9px] text-slate-400">{formatDate(comment.createdAt)}</span>
                         </div>
                         <ThreadContent content={comment.content} />
                      </div>
                   </div>
                </div>
              ))}
           </div>
           
           {/* Spacer for input fixed area */}
           <div className="h-32"></div>
        </div>
      </div>

      {/* Reply Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 absolute bottom-0 left-0 right-0">
         <form onSubmit={handlePostComment} className="relative">
            <input 
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Escribe una respuesta..."
              className="w-full bg-slate-50 border-none rounded-2xl pl-6 pr-14 py-4 text-sm focus:ring-2 focus:ring-magenta-500/20"
            />
            <button 
              type="submit"
              disabled={!newComment.trim() || submitting}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-magenta-500 text-white rounded-xl shadow-lg disabled:opacity-50"
              style={{backgroundColor:'var(--magenta)'}}
            >
              <Send className="w-5 h-5" />
            </button>
         </form>
      </div>
    </motion.div>
  );
}

// Utils
function getCategoryIcon(cat: Category) {
  switch(cat) {
    case 'PROPUESTAS_COLONIA': return <Construction className="w-4 h-4" />;
    case 'REDES_APOYO': return <HardHat className="w-4 h-4" />;
    case 'SEGURIDAD_VECINAL': return <AlertCircle className="w-4 h-4" />;
    case 'GENERAL': return <MessageSquare className="w-4 h-4" />;
  }
}

function getCategoryColor(cat: Category) {
  switch(cat) {
    case 'PROPUESTAS_COLONIA': return 'bg-blue-50 text-blue-600';
    case 'REDES_APOYO': return 'bg-amber-50 text-amber-600';
    case 'SEGURIDAD_VECINAL': return 'bg-red-50 text-red-600';
    case 'GENERAL': return 'bg-slate-50 text-slate-600';
  }
}

function ThreadContent({ content }: { content: string }) {
  // Simple regex to match mentions like @username
  const parts = content.split(/(@\w+)/g);
  return (
    <div className="text-sm text-slate-600 leading-relaxed font-normal whitespace-pre-wrap">
      {parts.map((part, i) => (
        part.startsWith('@') ? (
          <span key={i} className="text-magenta-500 font-bold bg-magenta-50 px-1 rounded">
            {part}
          </span>
        ) : part
      ))}
    </div>
  );
}

function formatDate(timestamp: any) {
  if (!timestamp) return 'Hace un momento';
  const date = timestamp.toDate();
  return date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit'
  });
}
