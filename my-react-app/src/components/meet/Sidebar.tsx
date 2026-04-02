import React from 'react';
import { Users, MessageSquare, ShieldCheck, MoreHorizontal, FileText, Folder, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeetingStore } from '../../store/useMeetingStore';

const Sidebar: React.FC = () => {
  const { sidebarTab, setSidebarTab, participants } = useMeetingStore();

  return (
    <aside className="w-[300px] h-full bg-[#FFFFFF] border-r border-[#E4E4E7] flex flex-col pt-6 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20">
      {/* Tab Switcher */}
      <nav className="px-6 mb-8" aria-label="Sidebar navigation">
        <div className="flex p-1 bg-[#F8F8FC] border border-[#E4E4E7] rounded-xl shadow-inner">
           <button 
              aria-label="Participants"
              aria-pressed={sidebarTab === 'participants'}
              onClick={() => setSidebarTab('participants')} 
              className={clsx('flex-1 flex items-center justify-center py-2.5 rounded-lg transition-all', sidebarTab === 'participants' ? 'bg-[#FFFFFF] shadow-sm text-[#5850EC]' : 'text-[#6B6B78] hover:text-[#111111]')}
           >
              <Users size={16} />
           </button>
           <button 
              aria-label="Chat"
              aria-pressed={sidebarTab === 'chat'}
              onClick={() => setSidebarTab('chat')} 
              className={clsx('flex-1 flex items-center justify-center py-2.5 rounded-lg transition-all', sidebarTab === 'chat' ? 'bg-[#FFFFFF] shadow-sm text-[#5850EC]' : 'text-[#6B6B78] hover:text-[#111111]')}
           >
              <MessageSquare size={16} />
           </button>
           <button 
              aria-label="Notes"
              aria-pressed={sidebarTab === 'notes'}
              onClick={() => setSidebarTab('notes')} 
              className={clsx('flex-1 flex items-center justify-center py-2.5 rounded-lg transition-all', sidebarTab === 'notes' ? 'bg-[#FFFFFF] shadow-sm text-[#5850EC]' : 'text-[#6B6B78] hover:text-[#111111]')}
           >
              <FileText size={16} />
           </button>
           <button 
              aria-label="Files"
              aria-pressed={sidebarTab === 'files'}
              onClick={() => setSidebarTab('files')} 
              className={clsx('flex-1 flex items-center justify-center py-2.5 rounded-lg transition-all', sidebarTab === 'files' ? 'bg-[#FFFFFF] shadow-sm text-[#5850EC]' : 'text-[#6B6B78] hover:text-[#111111]')}
           >
              <Folder size={16} />
           </button>
        </div>
      </nav>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <AnimatePresence mode="wait">
          {sidebarTab === 'participants' ? (
             <motion.div 
               key="participants"
               initial={{ x: -20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: -20, opacity: 0 }}
               className="space-y-6"
             >
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-[#9A9AA5] mb-4">
                   <span>Platform Core</span>
                   <ShieldCheck size={14} />
                </div>
                {participants.map((item) => (
                  <div key={item.id} className={clsx("flex items-center space-x-3 p-3 bg-[#FFFFFF] hover:bg-[#F8F8FC] rounded-[20px] border border-[#E4E4E7] transition-all relative overflow-hidden group", item.isSpeaking ? 'border-[#5850EC] shadow-[0_4px_20px_rgba(88,80,236,0.15)] ring-1 ring-[#5850EC]/30' : 'shadow-sm')}>
                     {item.isSpeaking && <div className="absolute inset-0 bg-[#5850EC]/5 animate-pulse pointer-events-none" />}
                     <div className="relative">
                        <div className={clsx("w-10 h-10 rounded-full flex items-center justify-center text-[12px] font-bold z-10 relative", item.isSpeaking ? 'text-[#FFFFFF] bg-[#5850EC] shadow-[0_0_15px_rgba(88,80,236,0.4)]' : 'text-[#5850EC] bg-[#F8F8FC] border border-[#E4E4E7]')}>
                           {item.avatar || item.name.charAt(0)}
                        </div>
                        <div className={clsx(
                            'absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#FFFFFF] z-20',
                            item.connectionQuality !== 'poor' ? 'bg-[#10B981]' : 'bg-[#9A9AA5]'
                        )} />
                     </div>
                     <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                           <p className="text-[13px] font-bold text-[#111111] truncate">{item.name}</p>
                           <div className="flex space-x-2 flex-shrink-0">
                             {!item.isMuted ? <Mic size={12} className="text-[#6B6B78]" /> : <MicOff size={12} className="text-red-500" />}
                             {item.isVideoOn ? <Video size={12} className="text-[#6B6B78]" /> : <VideoOff size={12} className="text-red-500" />}
                           </div>
                        </div>
                        <div className="flex justify-between items-center mt-1">
                           <span className="text-[9px] font-black uppercase tracking-widest text-[#9A9AA5]">{item.role}</span>
                        </div>
                     </div>
                  </div>
                ))}
             </motion.div>
          ) : sidebarTab === 'chat' ? (
             <motion.div 
               key="chat"
               initial={{ x: 20, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               exit={{ x: 20, opacity: 0 }}
               className="h-full flex flex-col"
             >
                <div className="flex-1 space-y-4">
                   <div className="p-4 bg-[#F8F8FC] border border-[#E4E4E7] rounded-[20px] relative overflow-hidden group shadow-sm">
                      <p className="text-[12px] text-[#111111] leading-relaxed">
                        "The neural sync is stabilized. All nodes reporting 100% integrity."
                      </p>
                      <span className="text-[9px] text-[#6B6B78] mt-3 block font-mono">14:02:12 • Sarah J.</span>
                   </div>
                </div>
                
                {/* Input Area */}
                <div className="pb-2 pt-4">
                   <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Broadcast message..."
                        className="w-full bg-[#FFFFFF] border border-[#E4E4E7] rounded-2xl px-5 py-4 text-[12px] text-[#111111] placeholder:text-[#9A9AA5] focus:border-[#5850EC] focus:ring-1 focus:ring-[#5850EC]/30 focus:outline-none transition-all shadow-sm"
                      />
                      <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl bg-[#F8F8FC] flex items-center justify-center text-[#5850EC] hover:bg-[#5850EC] hover:text-[#FFFFFF] active:scale-95 transition-all shadow-sm border border-[#E4E4E7] hover:border-[#5850EC]">
                         <MoreHorizontal size={16} />
                      </button>
                   </div>
                </div>
             </motion.div>
          ) : (
             <motion.div
               key="other"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               className="flex h-full items-center justify-center"
             >
               <p className="text-[12px] text-[#9A9AA5] font-medium tracking-wide">Select a document or integration.</p>
             </motion.div>
          )}
        </AnimatePresence>
      </div>
    </aside>
  );
};

export default Sidebar;
