import React, { useState } from 'react';
import { Users, MessageSquare, ShieldCheck, MoreHorizontal, FileText, Folder, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = "participants" | "chat" | "notes" | "files";

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('participants');

  return (
    <aside className="w-[280px] h-full bg-white border-r border-zinc-200 flex flex-col pt-4">
      {/* Tab Switcher */}
      <div className="px-4 mb-8">
        <div className="flex p-1 bg-zinc-50 border border-zinc-200 rounded-xl shadow-sm">
           <button onClick={() => setActiveTab('participants')} className={clsx('flex-1 flex items-center justify-center py-2 rounded-lg transition-all', activeTab === 'participants' ? 'bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-950')}>
              <Users size={14} />
           </button>
           <button onClick={() => setActiveTab('chat')} className={clsx('flex-1 flex items-center justify-center py-2 rounded-lg transition-all', activeTab === 'chat' ? 'bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-950')}>
              <MessageSquare size={14} />
           </button>
           <button onClick={() => setActiveTab('notes')} className={clsx('flex-1 flex items-center justify-center py-2 rounded-lg transition-all', activeTab === 'notes' ? 'bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-950')}>
              <FileText size={14} />
           </button>
           <button onClick={() => setActiveTab('files')} className={clsx('flex-1 flex items-center justify-center py-2 rounded-lg transition-all', activeTab === 'files' ? 'bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm' : 'text-zinc-500 hover:text-zinc-950')}>
              <Folder size={14} />
           </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4">
        <AnimatePresence mode="wait">
          {activeTab === 'participants' ? (
             <motion.div 
               key="participants"
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: -20, opacity: 0 }}
               className="space-y-6"
             >
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4 px-2">
                   <span>Platform Core</span>
                   <ShieldCheck size={12} />
                </div>
                {[
                  { name: 'Dr. Sarah Jameson', status: 'Host', online: true, isSpeaking: true, micOn: true, camOn: true },
                  { name: 'Michael Chen', status: 'Core', online: true, isSpeaking: false, micOn: true, camOn: true },
                  { name: 'Elena Rodriguez', status: 'Guest', online: false, isSpeaking: false, micOn: false, camOn: false },
                  { name: 'Alex Thompson', status: 'Core', online: true, isSpeaking: false, micOn: true, camOn: false },
                ].map((item, i) => (
                  <div key={i} className={clsx("flex items-center space-x-3 p-2 bg-white hover:bg-zinc-50 rounded-2xl border border-zinc-200 group transition-all mb-2 relative overflow-hidden", item.isSpeaking && 'ring-1 ring-indigo-500')}>
                     {item.isSpeaking && <div className="absolute inset-0 bg-indigo-500/5 animate-pulse pointer-events-none" />}
                     <div className="relative">
                        <div className={clsx("w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold z-10 relative text-indigo-600 bg-indigo-50 border", item.isSpeaking ? 'border-indigo-500 shadow-[0_0_15px_rgba(79,70,229,0.2)]' : 'border-indigo-200')}>
                           {item.name.charAt(0)}
                        </div>
                        <div className={clsx(
                            'absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-white z-20',
                            item.online ? 'bg-emerald-500' : 'bg-zinc-300'
                        )} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                           <p className="text-[11px] font-bold text-zinc-950 truncate pr-2">{item.name}</p>
                           <div className="flex space-x-1.5 opacity-50 flex-shrink-0">
                             {item.micOn ? <Mic size={10} className="text-zinc-600" /> : <MicOff size={10} className="text-red-500" />}
                             {item.camOn ? <Video size={10} className="text-zinc-600" /> : <VideoOff size={10} className="text-red-500" />}
                           </div>
                        </div>
                        <div className="flex justify-between items-center mt-0.5">
                           <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">{item.status}</span>
                        </div>
                     </div>
                  </div>
                ))}
             </motion.div>
          ) : (
             <motion.div 
               key="chat"
               initial={{ x: 20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: 20, opacity: 0 }}
               className="h-full flex flex-col"
             >
                <div className="flex-1 space-y-4">
                   <div className="p-3 bg-zinc-50 border border-zinc-200 rounded-2xl relative overflow-hidden group">
                      <p className="text-[11px] text-zinc-950 leading-relaxed">
                        "The neural sync is stabilized. All nodes reporting 100% integrity."
                      </p>
                      <span className="text-[8px] text-zinc-500 mt-2 block font-mono">14:02:12 • Sarah J.</span>
                   </div>
                </div>
                
                {/* Input Area */}
                <div className="pb-6 pt-4">
                   <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Broadcast message..."
                        className="w-full bg-white border border-zinc-200 rounded-xl px-4 py-3 text-[10px] text-zinc-950 placeholder:text-zinc-500 focus:border-indigo-600 focus:outline-none transition-all shadow-sm"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 hover:bg-indigo-600 hover:text-white active:scale-95 transition-all">
                         <MoreHorizontal size={14} />
                      </button>
                   </div>
                </div>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};

export default Sidebar;
