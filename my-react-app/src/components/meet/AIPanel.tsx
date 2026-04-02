import React, { useEffect, useRef } from 'react';
import { Brain, ChevronRight, Terminal, CircleCheck, Clock, Zap, FileText, Sparkles, MessageSquare } from 'lucide-react';
import { clsx } from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
// @ts-ignore
import { List } from 'react-window';
import { useMeetingStore } from '../../store/useMeetingStore';

const AIPanel: React.FC = () => {
  const { 
    isAIPanelOpen, toggleAIPanel,
    transcript, aiSummary, actionItems, timeline, sentiment, toggleActionItem, participants
  } = useMeetingStore();

  const isHostOnly = participants.length === 1;

  const listRef = useRef<any>(null);

  useEffect(() => {
    if (listRef.current && transcript.length > 0) {
        listRef.current.scrollToRow({ index: transcript.length - 1 });
    }
  }, [transcript]);

  const decisions = timeline.filter(t => t.type === 'decision');

  return (
    <AnimatePresence>
      {isAIPanelOpen && (
        <motion.aside 
          initial={{ x: 340, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 340, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="w-[340px] h-full bg-[#FFFFFF] border-l border-[#E4E4E7] flex flex-col pt-8 relative z-50 shadow-[-10px_0_30px_rgba(0,0,0,0.03)]"
        >
          {/* Header */}
          <div className="px-8 mb-8 flex items-center justify-between">
             <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 rounded-lg bg-[#F8F8FC] border border-[#E4E4E7] flex items-center justify-center text-[#5850EC] shadow-sm">
                    <Brain size={18} />
                 </div>
                 <div>
                    <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-[#111111]">Neurometric</h3>
                    <div className="flex items-center space-x-1.5 mt-1">
                       <div className="w-1.5 h-1.5 rounded-full bg-[#10B981] animate-pulse shadow-[0_0_10px_#10B981]" />
                       <span className="text-[8px] font-black uppercase tracking-widest text-[#10B981]">LIVE ANALYZING</span>
                    </div>
                 </div>
             </div>
             
             <button 
                 onClick={toggleAIPanel}
                 className="w-8 h-8 rounded-lg bg-[#F8F8FC] border border-[#E4E4E7] flex items-center justify-center text-[#6B6B78] hover:text-[#111111] hover:border-[#5850EC] transition-all"
             >
                 <ChevronRight size={16} />
             </button>
          </div>

          <div className="flex-1 overflow-y-auto px-8 space-y-10 pb-20 custom-scrollbar">
             
             {/* Meeting Sentiment */}
             <section>
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#6B6B78]">Sentiment Analysis</span>
                </div>
                <div className="flex space-x-2">
                   <div className={clsx("flex-1 h-1.5 rounded-full", sentiment === 'positive' ? 'bg-[#10B981] shadow-[0_0_10px_#10B981]' : 'bg-[#E4E4E7]')} />
                   <div className={clsx("flex-1 h-1.5 rounded-full", sentiment === 'neutral' ? 'bg-[#F59E0B] shadow-[0_0_10px_#F59E0B]' : 'bg-[#E4E4E7]')} />
                   <div className={clsx("flex-1 h-1.5 rounded-full", sentiment === 'negative' ? 'bg-[#EF4444] shadow-[0_0_10px_#EF4444]' : 'bg-[#E4E4E7]')} />
                </div>
             </section>

             {/* Live Transcript Section */}
             <section aria-live="polite">
                <div className="flex items-center justify-between mb-4">
                   <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#5850EC]">Live Transcript</span>
                   <Terminal size={12} className="text-[#5850EC]" />
                </div>
                {isHostOnly ? (
                    <div className="h-48 shadow-inner p-6 bg-[#F8F8FC] border border-[#E4E4E7] rounded-xl flex flex-col items-center justify-center text-center">
                        <Terminal size={24} className="text-[#9A9AA5] mb-3 opacity-50" />
                        <p className="text-xs font-bold text-[#111111] mb-1">Meeting ready</p>
                        <p className="text-[10px] text-[#6B6B78] leading-tight">AI waiting for transcript.<br/>Live intelligence activates once meeting starts.</p>
                    </div>
                ) : (
                    <div className="h-48 relative shadow-inner p-2 bg-[#F8F8FC] border border-[#E4E4E7] rounded-xl flex flex-col">
                       <List
                         listRef={listRef}
                         rowCount={transcript.length}
                         rowHeight={(index: number) => 45 + Math.ceil(transcript[index].text.length / 45) * 16}
                         rowProps={{ transcript }}
                         rowComponent={({ index, style, transcript }: any) => {
                           const line = transcript[index];
                           const timeString = new Date(line.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
                           return (
                             <div style={{...style, paddingBottom: 12, paddingRight: 8}}>
                               <motion.div 
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 className="text-[11px] leading-relaxed italic border-l-2 border-[#5850EC]/30 pl-3 py-0.5 h-full"
                               >
                                  <span className="font-bold text-[#5850EC] block text-[9px] mb-0.5 uppercase tracking-widest">{line.speakerName} <span className="opacity-50 lowercase float-right">{timeString}</span></span>
                                  <span className="text-[#111111]">{line.text}</span>
                               </motion.div>
                             </div>
                           );
                         }}
                         className="custom-scrollbar"
                         style={{ height: 175, width: '100%' }}
                       />
                       {transcript.length === 0 && <p className="text-[10px] text-[#9A9AA5] italic absolute top-4 left-4">Waiting for speakers...</p>}
                    </div>
                )}
             </section>

             {/* AI Summary Section */}
             <section aria-live="polite">
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#111111]">AI Summary</span>
                    <Sparkles size={12} className="text-[#F59E0B]" />
                </div>
                <div className="min-h-[72px] p-4 bg-[#FFFFFF] border border-[#E4E4E7] rounded-xl shadow-sm transition-all hover:shadow-md hover:border-[#5850EC]/50 flex items-center justify-center">
                   {isHostOnly ? (
                       <p className="text-[10px] text-[#9A9AA5] italic text-center w-full">Invite participants to begin gathering intelligence.</p>
                   ) : (
                       <p className="text-[12px] text-[#111111] leading-relaxed font-medium italic w-full text-left">
                          {aiSummary}
                       </p>
                   )}
                </div>
             </section>
             
             {/* Actions & Decisions Row */}
             <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#F8F8FC] border border-[#E4E4E7] rounded-xl">
                   <h4 className="text-[20px] font-black text-[#5850EC] mb-1">{actionItems.filter(i => !i.completed).length}</h4>
                   <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B6B78]">Open Actions</span>
                </div>
                <div className="p-4 bg-[#F8F8FC] border border-[#E4E4E7] rounded-xl">
                   <h4 className="text-[20px] font-black text-[#F59E0B] mb-1">{decisions.length}</h4>
                   <span className="text-[9px] font-bold uppercase tracking-wider text-[#6B6B78]">Decisions</span>
                </div>
             </div>

             {/* Smart Action Items Section */}
             <section aria-live="polite">
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#111111]">Smart Actions</span>
                </div>
                <div className="space-y-3">
                   <AnimatePresence>
                      {actionItems.map((item) => (
                        <motion.div 
                           key={item.id} 
                           initial={{ opacity: 0, scale: 0.95 }}
                           animate={{ opacity: 1, scale: 1 }}
                           className={clsx(
                             "flex items-center space-x-3 p-3 bg-[#FFFFFF] border rounded-xl shadow-sm transition-all cursor-pointer group",
                             item.completed ? 'border-[#10B981]/50 bg-[#10B981]/5' : 'border-[#E4E4E7] hover:border-[#5850EC]'
                           )}
                           onClick={() => toggleActionItem(item.id)}
                        >
                           {item.completed ? (
                              <CircleCheck size={16} className="text-[#10B981]" />
                           ) : (
                              <CircleCheck size={16} className="text-[#E4E4E7] group-hover:text-[#5850EC] transition-colors" />
                           )}
                           <div className="flex-1 min-w-0">
                              <p className={clsx("text-[11px] font-bold truncate", item.completed ? 'text-[#6B6B78] line-through' : 'text-[#111111]')}>
                                 {item.task}
                              </p>
                           </div>
                           <div className="w-6 h-6 rounded-full bg-[#F8F8FC] flex items-center justify-center text-[8px] font-black text-[#5850EC] border border-[#E4E4E7]">
                              {item.assignee}
                           </div>
                        </motion.div>
                      ))}
                   </AnimatePresence>
                   {actionItems.length === 0 && <p className="text-[10px] text-[#9A9AA5] italic">No actions extracted yet.</p>}
                </div>
             </section>

             {/* Timeline Highlights */}
             <section aria-live="polite">
                <div className="flex items-center space-x-2 mb-4">
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#6B6B78]">Timeline</span>
                    <Clock size={12} className="text-[#6B6B78]" />
                </div>
                <div className="relative pl-3 space-y-4 before:absolute before:inset-y-0 before:left-[3px] before:w-px before:bg-[#E4E4E7]">
                   {timeline.map((event) => (
                      <div key={event.id} className="relative pl-4">
                         <div className={clsx(
                             "absolute left-[-4px] top-1 w-2 h-2 rounded-full ring-4 ring-[#FFFFFF]",
                             event.type === 'decision' ? 'bg-[#F59E0B]' : event.type === 'task' ? 'bg-[#5850EC]' : 'bg-[#10B981]'
                         )} />
                         <span className="block text-[8px] font-bold text-[#9A9AA5] mb-0.5">
                            {new Date(event.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                         </span>
                         <p className="text-[11px] text-[#111111] font-medium">{event.label}</p>
                      </div>
                   ))}
                </div>
             </section>

          </div>

          {/* AI Copilot Quick Actions */}
          <div className="absolute bottom-0 left-0 w-full bg-[#FFFFFF]/90 backdrop-blur-xl border-t border-[#E4E4E7] p-4 flex flex-wrap gap-2">
             <button className="btn-typography flex items-center space-x-1.5 px-3 py-2 bg-[#F8F8FC] border border-[#E4E4E7] rounded-lg text-[#111111] hover:border-[#5850EC] hover:text-[#5850EC] transition-all shadow-sm">
                <FileText size={14} />
                <span>Gen Minutes</span>
             </button>
             <button className="btn-typography flex items-center space-x-1.5 px-3 py-2 bg-[#F8F8FC] border border-[#E4E4E7] rounded-lg text-[#111111] hover:border-[#5850EC] hover:text-[#5850EC] transition-all shadow-sm">
                <Zap size={14} />
                <span>Extract Tasks</span>
             </button>
             <button className="btn-typography flex items-center space-x-1.5 px-3 py-2 bg-[#F8F8FC] border border-[#E4E4E7] rounded-lg text-[#111111] hover:border-[#5850EC] hover:text-[#5850EC] transition-all shadow-sm">
                <MessageSquare size={14} />
                <span>Ask AI</span>
             </button>
          </div>

        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default AIPanel;
