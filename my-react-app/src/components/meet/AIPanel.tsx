import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import { Brain, ChevronRight, CheckCircle2, Terminal } from 'lucide-react';
import { clsx } from 'clsx';

gsap.registerPlugin(TextPlugin);

const AIPanel: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLParagraphElement>(null);

  useGSAP(() => {
    if (isCollapsed) {
       gsap.to(panelRef.current, {
           x: 340,
           duration: 0.8,
           ease: 'expo.inOut'
       });
    } else {
       gsap.to(panelRef.current, {
           x: 0,
           duration: 1,
           ease: 'expo.out'
       });
    }
  }, [isCollapsed]);

  // Mock Summary Generation
  useEffect(() => {
     const timeout = setTimeout(() => {
        if (summaryRef.current) {
            gsap.to(summaryRef.current, {
                text: { value: "Project Nexus deployment moved to Q3 to accommodate global scaling architecture. High-performance auth nodes prioritization established." },
                duration: 2,
                ease: "none"
            });
        }
     }, 3000);
     return () => clearTimeout(timeout);
  }, []);

  return (
    <aside 
      ref={panelRef}
      className="w-[340px] h-full bg-[#030303] border-l border-white/5 flex flex-col pt-8 relative z-50 backdrop-blur-3xl"
    >
      {/* Collapse Toggle */}
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-16 bg-[#030303] border-y border-l border-white/5 rounded-l-xl flex items-center justify-center text-white/30 hover:text-accent transition-all group"
      >
         <ChevronRight className={clsx('transition-transform duration-500', isCollapsed ? 'rotate-180' : 'rotate-0')} />
      </button>

      {/* Header */}
      <div className="px-8 mb-12 flex items-center justify-between">
         <div className="flex items-center space-x-3">
             <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <Brain size={18} />
             </div>
             <div>
                <h3 className="text-[11px] font-black uppercase tracking-[0.4em] text-white/90">Neural Core</h3>
                <div className="flex items-center space-x-1.5 mt-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_#4fffff]" />
                   <span className="text-[8px] font-black uppercase tracking-widest text-accent/60">LIVE ANALYZING</span>
                </div>
             </div>
         </div>
      </div>

      <div className="flex-1 overflow-y-auto px-8 space-y-12 pb-12">
         {/* Live Transcript Section */}
         <section>
            <div className="flex items-center justify-between mb-6 opacity-30 text-[9px] font-black uppercase tracking-[0.2em]">
               <span>Spectral Integrity</span>
               <Terminal size={12} />
            </div>
            <div className="space-y-4 max-h-40 overflow-hidden relative">
               <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#030303] to-transparent pointer-events-none" />
               <p className="text-[11px] text-white/60 leading-relaxed italic border-l-2 border-white/5 pl-4 py-1">"We need to prioritize node scalability..."</p>
               <p className="text-[11px] text-white/40 leading-relaxed italic border-l-2 border-white/5 pl-4 py-1">"Agreed. Let's aim for late August."</p>
               <p className="text-[11px] text-accent font-bold leading-relaxed italic border-l-2 border-accent/40 pl-4 py-1 animate-pulse">"Analyzing strategic decisions..."</p>
            </div>
         </section>

         {/* AI Summary Section */}
         <section>
            <div className="flex items-center space-x-2 mb-6">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent/40">AI Summary</span>
            </div>
            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
               <p ref={summaryRef} className="text-[12px] text-white/80 leading-relaxed font-medium italic min-h-[40px]">
                  Generating neural summary nodes...
               </p>
            </div>
         </section>

         {/* Action Items Section */}
         <section>
            <div className="flex items-center space-x-2 mb-6">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-accent-2/40">Action Items</span>
            </div>
            <div className="space-y-4">
               {[
                 { task: 'Draft Migration Epic', user: 'SJ', color: 'bg-accent/20' },
                 { task: 'Scale Auth Cluster', user: 'MC', color: 'bg-accent-2/20' },
               ].map((item, i) => (
                 <div key={i} className="flex items-center space-x-4 p-4 bg-white/[0.01] border border-white/5 rounded-xl hover:bg-white/[0.03] transition-all cursor-pointer group">
                    <CheckCircle2 size={16} className="text-white/10 group-hover:text-accent transition-colors" />
                    <div className="flex-1">
                       <p className="text-[11px] font-bold text-white/80">{item.task}</p>
                    </div>
                    <div className={clsx('w-6 h-6 rounded-full flex items-center justify-center text-[8px] font-black text-white/40', item.color)}>
                       {item.user}
                    </div>
                 </div>
               ))}
            </div>
         </section>
      </div>
    </aside>
  );
};

export default AIPanel;
