import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, FileText, Share2, CheckCircle2, Download, BarChart2, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';
import { useMeetingStore } from '../../store/useMeetingStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const PostMeetingModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { aiSummary, actionItems, timeline } = useMeetingStore();

  const mockAnalytics = {
    talkRatio: {
        'Dr. Sarah Jameson': 45,
        'Michael Chen': 25,
        'Alex Thompson': 20,
        'Elena Rodriguez': 10
    },
    engagementScore: 94,
    decisionsMade: timeline.filter(t => t.type === 'decision').length,
    confidence: {
        summary: 91,
        sentiment: 88,
        tasks: 95
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#111111]/40 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl bg-[#FFFFFF] rounded-3xl shadow-2xl z-[101] overflow-hidden flex flex-col max-h-[90vh]"
          >
             {/* Header */}
             <div className="px-8 py-6 border-b border-[#E4E4E7] flex items-center justify-between bg-[#F8F8FC]">
                <div className="flex items-center space-x-3">
                   <div className="w-10 h-10 rounded-xl bg-[#5850EC] text-white flex items-center justify-center shadow-lg shadow-[#5850EC]/30">
                      <FileText size={20} />
                   </div>
                   <div>
                       <h2 className="text-xl font-bold text-[#111111]">Meeting Report Generated</h2>
                       <p className="text-xs text-[#6B6B78] font-medium mt-1">Project Nexus Planning • 4 Participants • {mockAnalytics.engagementScore}% Engagement</p>
                   </div>
                </div>
                <div className="flex items-center space-x-3">
                   <button className="btn-typography flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#111111] text-white hover:bg-[#111111]/80 transition-all">
                      <Share2 size={16} />
                      <span>Export Hub</span>
                   </button>
                   <button onClick={onClose} className="w-12 h-12 rounded-xl bg-[#FFFFFF] border border-[#E4E4E7] flex items-center justify-center text-[#6B6B78] hover:text-[#111111] hover:bg-[#F8F8FC] transition-all">
                      <X size={20} />
                   </button>
                </div>
             </div>

             {/* Content Scroll Area */}
             <div className="p-8 overflow-y-auto custom-scrollbar flex-1 flex gap-8">
                
                {/* Left Column: AI Trust & Analytics */}
                <div className="w-1/3 flex flex-col space-y-6 flex-shrink-0">
                    <section>
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#9A9AA5] mb-4 flex items-center"><ShieldCheck size={12} className="mr-2"/> AI Confidence</h3>
                        <div className="space-y-3">
                           <div className="flex items-center justify-between text-sm">
                               <span className="text-[#6B6B78] font-medium">Summary Accuracy</span>
                               <span className="text-[#111111] font-bold">{mockAnalytics.confidence.summary}%</span>
                           </div>
                           <div className="w-full h-1.5 bg-[#F8F8FC] rounded-full overflow-hidden border border-[#E4E4E7]">
                               <div className="h-full bg-[#10B981] rounded-full" style={{ width: `${mockAnalytics.confidence.summary}%` }} />
                           </div>

                           <div className="flex items-center justify-between text-sm mt-4">
                               <span className="text-[#6B6B78] font-medium">Task Extraction</span>
                               <span className="text-[#111111] font-bold">{mockAnalytics.confidence.tasks}%</span>
                           </div>
                           <div className="w-full h-1.5 bg-[#F8F8FC] rounded-full overflow-hidden border border-[#E4E4E7]">
                               <div className="h-full bg-[#10B981] rounded-full" style={{ width: `${mockAnalytics.confidence.tasks}%` }} />
                           </div>
                        </div>
                    </section>

                    <section className="pt-4 border-t border-[#E4E4E7]">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-[#9A9AA5] mb-4 flex items-center"><BarChart2 size={12} className="mr-2"/> Speaker Dominance</h3>
                        <div className="space-y-4">
                            {Object.entries(mockAnalytics.talkRatio).map(([name, ratio]) => (
                                <div key={name}>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-[#111111] font-medium">{name}</span>
                                        <span className="text-[#6B6B78]">{ratio}%</span>
                                    </div>
                                    <div className="w-full h-1 bg-[#F8F8FC] rounded-full overflow-hidden">
                                        <div className="h-full bg-[#5850EC]" style={{ width: `${ratio}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Summaries & Exports */}
                <div className="w-2/3 flex flex-col space-y-6">
                    <section className="p-5 bg-[#F8F8FC] border border-[#E4E4E7] rounded-2xl relative overflow-hidden group hover:border-[#5850EC]/30 transition-colors">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#5850EC]/5 rounded-bl-full -mr-16 -mt-16 pointer-events-none" />
                        <h3 className="text-sm font-bold text-[#111111] mb-3">Executive Summary</h3>
                        <p className="text-sm text-[#6B6B78] leading-relaxed italic">"{aiSummary}"</p>
                    </section>
                    
                    <section>
                         <h3 className="text-sm font-bold text-[#111111] mb-3">Action Items Extracted ({actionItems.length})</h3>
                         <div className="grid grid-cols-2 gap-3">
                            {actionItems.map(item => (
                                <div key={item.id} className={clsx("p-3 rounded-xl border flex items-start space-x-3", item.completed ? 'bg-[#10B981]/5 border-[#10B981]/30' : 'bg-[#FFFFFF] border-[#E4E4E7]')}>
                                   <CheckCircle2 size={16} className={item.completed ? "text-[#10B981] flex-shrink-0" : "text-[#E4E4E7] flex-shrink-0"} />
                                   <div>
                                       <p className="text-xs font-bold text-[#111111] mb-1 leading-snug">{item.task}</p>
                                       <span className="text-[10px] text-[#6B6B78] font-medium flex items-center"><div className="w-4 h-4 rounded-full bg-[#F8F8FC] border border-[#E4E4E7] flex items-center justify-center mr-1 text-[8px] text-[#5850EC]">{item.assignee}</div> Assignee</span>
                                   </div>
                                </div>
                            ))}
                         </div>
                    </section>
                </div>
             </div>

             <div className="px-8 py-4 bg-[#FFFFFF] border-t border-[#E4E4E7] flex items-center justify-between text-xs font-medium text-[#6B6B78]">
                 <span className="flex items-center"><Download size={14} className="mr-2"/> Download available formats: PDF, DOCX, CSV</span>
                 <div className="flex space-x-4">
                     <span className="cursor-pointer hover:text-[#5850EC]">Sync to Notion</span>
                     <span className="cursor-pointer hover:text-[#5850EC]">Sync to Jira</span>
                     <span className="cursor-pointer hover:text-[#5850EC]">Send via Slack</span>
                 </div>
             </div>
          </motion.div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
};

export default PostMeetingModal;
