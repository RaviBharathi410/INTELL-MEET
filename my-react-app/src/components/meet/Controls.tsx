import React, { useState } from 'react';
import { 
  Mic, MicOff, 
  Video, VideoOff, 
  MonitorUp, 
  CircleDot, 
  Smile, 
  MoreVertical, 
  LogOut 
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';

const Controls: React.FC = () => {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [emojis, setEmojis] = useState<{ id: number, emoji: string }[]>([]);

  const triggerEmoji = (emoji: string) => {
    const id = Date.now();
    setEmojis(prev => [...prev, { id, emoji }]);
    setTimeout(() => {
        setEmojis(prev => prev.filter(e => e.id !== id));
    }, 4000);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-[1002] flex justify-center pb-10 pointer-events-none">
       {/* Emoji Float Layer */}
       <div className="absolute inset-x-0 bottom-full pointer-events-none h-[400px]">
          <AnimatePresence>
             {emojis.map(e => (
               <motion.span 
                 key={e.id}
                 initial={{ y: 0, opacity: 0, scale: 0.5, x: (Math.random() - 0.5) * 100 }}
                 animate={{ y: -300, opacity: [0, 1, 1, 0], scale: [0.5, 1.5, 1.5, 0.5] }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 3, ease: 'easeOut' }}
                 className="absolute left-1/2 -translate-x-1/2 text-4xl"
               >
                 {e.emoji}
               </motion.span>
             ))}
          </AnimatePresence>
       </div>

       <div className="relative rounded-full bg-white border border-zinc-200 shadow-xl backdrop-blur-xl p-3 flex items-center space-x-4 pointer-events-auto">
          {/* Controls Group */}
          <div className="flex items-center space-x-3 px-3 border-r border-zinc-200">
             <button 
               onClick={() => setMicOn(!micOn)}
               className={clsx(
                 'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group active:scale-90',
                 micOn ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-950' : 'bg-red-500 text-white'
               )}
             >
                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
             </button>
             <button 
               onClick={() => setCamOn(!camOn)}
               className={clsx(
                 'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group active:scale-90',
                 camOn ? 'bg-zinc-100 hover:bg-zinc-200 text-zinc-950' : 'bg-red-500 text-white'
               )}
             >
                {camOn ? <Video size={20} /> : <VideoOff size={20} />}
             </button>
          </div>

          <div className="flex items-center space-x-3 px-3">
             <button className="w-12 h-12 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-950 flex items-center justify-center transition-all active:scale-90 shadow-sm group">
                <MonitorUp size={20} className="group-hover:translate-y-[-2px] transition-transform" />
             </button>
             <button 
               onClick={() => setIsRecording(!isRecording)}
               className={clsx(
                 'w-12 h-12 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-all active:scale-90 shadow-sm group',
                 isRecording ? 'text-red-500' : 'text-zinc-950'
               )}
             >
                <CircleDot size={20} className={clsx(isRecording && 'animate-pulse')} />
             </button>
             <button 
                className="w-12 h-12 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-950 flex items-center justify-center transition-all active:scale-90 shadow-sm group relative"
                onClick={() => triggerEmoji('🔥')}
             >
                <Smile size={20} className="group-hover:scale-110 transition-transform" />
             </button>
             <button className="w-12 h-12 rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-950 flex items-center justify-center transition-all active:scale-90 shadow-sm group">
                <MoreVertical size={20} />
             </button>
          </div>

          {/* End Call Separator */}
          <div className="pl-3">
             <button 
               className="h-12 px-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center space-x-3 transition-colors active:scale-95 shadow-xl shadow-red-500/10 group"
               onClick={() => window.location.href = '/'}
             >
                <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Exit Session</span>
             </button>
          </div>
       </div>

       {/* Floating REC tag */}
        {isRecording && (
           <div className="absolute top-[-80px] px-4 py-2 bg-[#FFFFFF] border border-red-500/30 rounded-full flex items-center space-x-2 shadow-xl animate-float">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[9px] font-mono font-black text-red-500 tracking-[0.2em] uppercase">Recording Node Status</span>
           </div>
       )}
    </div>
  );
};

export default Controls;
