import React, { useState } from 'react';
import { 
  Mic, MicOff, 
  Video, VideoOff, 
  MonitorUp, 
  CircleDot, 
  Smile, 
  MoreVertical, 
  LogOut,
  Brain
} from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { useMeetingStore } from '../../store/useMeetingStore';

const Controls: React.FC<{ onExit?: () => void }> = ({ onExit }) => {
  const { 
    micOn, toggleMic, 
    camOn, toggleCam, 
    isRecording, toggleRecording,
    isAIPanelOpen, toggleAIPanel
  } = useMeetingStore();
  
  const [emojis, setEmojis] = useState<{ id: number, emoji: string }[]>([]);

  const triggerEmoji = (emoji: string) => {
    const id = Date.now();
    setEmojis(prev => [...prev, { id, emoji }]);
    setTimeout(() => {
        setEmojis(prev => prev.filter(e => e.id !== id));
    }, 4000);
  };

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1002] flex justify-center pointer-events-none">
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

       <div className="relative rounded-full bg-[#FFFFFF]/90 border border-[#FFFFFF]/20 shadow-[0_12px_30px_rgba(0,0,0,0.04)] backdrop-blur-xl p-3 flex items-center space-x-4 pointer-events-auto transition-all">
          {/* Controls Group */}
          <div className="flex items-center space-x-3 px-3 border-r border-[#E4E4E7]">
             <button 
               onClick={toggleMic}
               className={clsx(
                 'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group active:scale-95 shadow-sm',
                 micOn ? 'bg-[#F8F8FC] hover:bg-[#EEF2FF] text-[#111111] hover:text-[#5850EC]' : 'bg-[#EF4444] text-[#FFFFFF]'
               )}
             >
                {micOn ? <Mic size={20} /> : <MicOff size={20} />}
             </button>
             <button 
               onClick={toggleCam}
               className={clsx(
                 'w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group active:scale-95 shadow-sm',
                 camOn ? 'bg-[#F8F8FC] hover:bg-[#EEF2FF] text-[#111111] hover:text-[#5850EC]' : 'bg-[#EF4444] text-[#FFFFFF]'
               )}
             >
                {camOn ? <Video size={20} /> : <VideoOff size={20} />}
             </button>
          </div>

          <div className="flex items-center space-x-3 px-3">
             <button className="w-12 h-12 rounded-full bg-[#F8F8FC] hover:bg-[#EEF2FF] text-[#111111] hover:text-[#5850EC] flex items-center justify-center transition-all active:scale-95 shadow-sm group">
                <MonitorUp size={20} className="group-hover:-translate-y-0.5 transition-transform" />
             </button>
             <button 
               onClick={toggleRecording}
               className={clsx(
                 'w-12 h-12 rounded-full bg-[#F8F8FC] hover:bg-[#EEF2FF] flex items-center justify-center transition-all active:scale-95 shadow-sm group hover:text-[#EF4444]',
                 isRecording ? 'text-[#EF4444] ring-2 ring-[#EF4444]/30' : 'text-[#111111]'
               )}
             >
                <CircleDot size={20} className={clsx(isRecording && 'animate-pulse')} />
             </button>
             <button 
                onClick={toggleAIPanel}
                className={clsx(
                  'w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-95 shadow-sm group',
                  isAIPanelOpen ? 'bg-[#5850EC] text-[#FFFFFF] shadow-[0_4px_15px_rgba(88,80,236,0.3)]' : 'bg-[#F8F8FC] hover:bg-[#EEF2FF] text-[#111111] hover:text-[#5850EC]'
                )}
             >
                <Brain size={20} className={clsx(isAIPanelOpen && 'animate-pulse')} />
             </button>
             <button 
                className="w-12 h-12 rounded-full bg-[#F8F8FC] hover:bg-[#EEF2FF] text-[#111111] hover:text-[#5850EC] flex items-center justify-center transition-all active:scale-95 shadow-sm group relative"
                onClick={() => triggerEmoji('🔥')}
             >
                <Smile size={20} className="group-hover:scale-110 transition-transform" />
             </button>
             <button className="w-12 h-12 rounded-full bg-[#F8F8FC] hover:bg-[#EEF2FF] text-[#111111] hover:text-[#6B6B78] flex items-center justify-center transition-all active:scale-95 shadow-sm group">
                <MoreVertical size={20} />
             </button>
          </div>

          {/* End Call Separator */}
          <div className="pl-3">
             <button 
               className="h-12 px-6 bg-[#EF4444] hover:bg-red-600 text-[#FFFFFF] rounded-full flex items-center space-x-3 transition-colors active:scale-95 shadow-[0_4px_15px_rgba(239,68,68,0.2)] group"
               onClick={() => onExit ? onExit() : window.location.href = '/'}
             >
                <LogOut size={18} className="group-hover:translate-x-1 transition-transform" />
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Exit Session</span>
             </button>
          </div>
       </div>

       {/* Floating REC tag */}
        {isRecording && (
           <div className="absolute top-[-50px] px-4 py-2 bg-[#FFFFFF]/90 backdrop-blur-md border border-[#EF4444]/30 rounded-full flex items-center space-x-2 shadow-xl animate-float">
                <div className="w-2 h-2 rounded-full bg-[#EF4444] animate-pulse" />
                <span className="text-[9px] font-mono font-black text-[#EF4444] tracking-[0.2em] uppercase">Recording Node Status</span>
           </div>
       )}
    </div>
  );
};

export default Controls;
