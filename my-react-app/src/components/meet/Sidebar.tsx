import React, { useState } from 'react';
import { Users, MessageSquare, ShieldCheck, MoreHorizontal } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'participants' | 'chat'>('participants');

  return (
    <aside className="w-[280px] h-full bg-[#050505] border-r border-white/5 flex flex-col pt-4">
      {/* Tab Switcher */}
      <div className="px-4 mb-8">
        <div className="flex p-1 bg-white/5 rounded-xl">
           <button 
             onClick={() => setActiveTab('participants')}
             className={clsx(
               'flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all',
               activeTab === 'participants' ? 'bg-bg-1 text-accent shadow-xl' : 'text-white/30 hover:text-white/60'
             )}
           >
              <Users size={14} />
              <span>Users</span>
           </button>
           <button 
             onClick={() => setActiveTab('chat')}
             className={clsx(
               'flex-1 flex items-center justify-center space-x-2 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all',
               activeTab === 'chat' ? 'bg-bg-1 text-accent shadow-xl' : 'text-white/30 hover:text-white/60'
             )}
           >
              <MessageSquare size={14} />
              <span>Chat</span>
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
                <div className="flex items-center justify-between text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-4 px-2">
                   <span>Platform Core</span>
                   <ShieldCheck size={12} />
                </div>
                {[
                  { name: 'Dr. Sarah Jameson', status: 'Host', online: true },
                  { name: 'Michael Chen', status: 'Core', online: true },
                  { name: 'Elena Rodriguez', status: 'Guest', online: false },
                  { name: 'Alex Thompson', status: 'Core', online: true },
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 p-2 hover:bg-white/[0.02] rounded-xl group transition-all">
                     <div className="relative">
                        <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-white/30">
                           {item.name.charAt(0)}
                        </div>
                        <div className={clsx(
                            'absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-black',
                            item.online ? 'bg-accent' : 'bg-white/10'
                        )} />
                     </div>
                     <div className="flex-1">
                        <p className="text-[11px] font-bold text-white/90">{item.name}</p>
                        <span className="text-[8px] font-black uppercase tracking-widest text-white/20">{item.status}</span>
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
                   <div className="p-3 bg-white/[0.03] border border-white/5 rounded-2xl relative overflow-hidden group">
                      <p className="text-[11px] text-white/80 leading-relaxed">
                        "The neural sync is stabilized. All nodes reporting 100% integrity."
                      </p>
                      <span className="text-[8px] text-white/20 mt-2 block font-mono">14:02:12 • Sarah J.</span>
                   </div>
                </div>
                
                {/* Input Area */}
                <div className="pb-6 pt-4">
                   <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Broadcast message..."
                        className="w-full bg-bg-1 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-white placeholder:text-white/10 focus:border-accent/40 focus:outline-none transition-all"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-all">
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
