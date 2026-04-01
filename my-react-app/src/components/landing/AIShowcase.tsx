import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import { MOTION } from '../../utils/motion';

gsap.registerPlugin(TextPlugin);

const AIShowcase: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Entrance animations
    gsap.fromTo('.scroll-reveal', 
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: MOTION.duration.xl,
        ease: MOTION.ease.emphasize,
        scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true
        }
      }
    );

    let currentTl: gsap.core.Timeline | null = null;

    const playAnimation = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Only loop if still visible
                gsap.delayedCall(2, playAnimation);
            }
        });
        currentTl = tl;

        // 1. Typewriter transcript
        tl.to('.transcript-line-1', {
            text: { value: "Alex: We need to scale the auth service by Q3." },
            duration: 0.8,
            ease: MOTION.ease.linear
        });
        
        tl.to('.transcript-line-2', {
            text: { value: "Chen: Agreed. Let's aim for late August." },
            duration: 0.8,
            ease: MOTION.ease.linear,
            delay: 0.2
        });

        // 2. AI Processing
        tl.set('.processing-indicator', { opacity: 1, display: 'flex' }, '+=0.2');
        tl.to('.processing-text', {
            text: { value: "Analyzing strategic decisions..." },
            duration: 0.5
        });

        // 3. Summary & Action Items reveal
        tl.to('.processing-indicator', { opacity: 0, display: 'none' }, '+=0.4');
        tl.fromTo('.summary-card', 
            { x: 100, opacity: 0 },
            { x: 0, opacity: 1, duration: 0.4, ease: MOTION.ease.emphasize }
        );

        tl.fromTo('.action-item-1',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: MOTION.ease.emphasize }
        );
        tl.fromTo('.action-item-2',
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.3, ease: MOTION.ease.emphasize },
            "+=0.1"
        );

        // Reset for loop
        tl.to(['.summary-card', '.action-item-1', '.action-item-2', '.transcript-line-1', '.transcript-line-2'], {
            opacity: 0,
            duration: 0.4,
            delay: 2
        });
        tl.set(['.transcript-line-1', '.transcript-line-2'], { text: "" });
        tl.set(['.transcript-line-1', '.transcript-line-2'], { opacity: 1 });
    };

    // IntersectionObserver — start/pause looping timeline based on visibility
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (!currentTl || currentTl.progress() === 1) {
            playAnimation();
          } else {
            currentTl.resume();
          }
        } else {
          currentTl?.pause();
        }
      },
      { threshold: 0.2 }
    );
    if (containerRef.current) observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, { scope: containerRef });

  return (
    <section 
      ref={containerRef}
      className="py-20 md:py-40 lg:py-60 px-6 sm:px-10 bg-white flex flex-col items-center relative overflow-hidden"
    >
      {/* Floating Background Blooms */}
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl w-full relative z-10">
         <div className="text-center mb-16 md:mb-28 lg:mb-40 scroll-reveal">
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[100px] font-black text-zinc-950 mb-10 tracking-[-0.05em] leading-none">
               Core Intelligence.
            </h2>
            <p className="text-zinc-600 text-xl font-medium font-body max-w-3xl mx-auto border-l-4 border-accent pl-12 text-left md:text-center">
               Automated spectral processing that transforms every conversation into structured, high-value decision nodes.
            </p>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 lg:h-[650px]">
             {/* Terminal View - LIGHT MODE */}
             <div 
               ref={terminalRef}
               className="bg-zinc-50 border border-zinc-200 rounded-[2rem] lg:rounded-[3.5rem] p-8 md:p-12 lg:p-16 font-mono text-base relative overflow-hidden flex flex-col shadow-2xl min-h-[300px] lg:min-h-0 scroll-reveal transform-gpu transition-all duration-1000 hover:scale-[1.02] hover:-translate-y-2 hover:shadow-indigo-500/10"
             >
                <div className="flex items-center space-x-4 mb-12 opacity-60">
                   <div className="w-4 h-4 rounded-full bg-red-400" />
                   <div className="w-4 h-4 rounded-full bg-amber-400" />
                   <div className="w-4 h-4 rounded-full bg-emerald-400" />
                   <span className="ml-8 text-[12px] uppercase tracking-[0.4em] font-black text-zinc-950">LIVE_SPECTRAL_FEED</span>
                </div>
                
                <div className="flex-1 space-y-6">
                   <p className="transcript-line-1 text-zinc-900 font-bold h-8 text-lg"></p>
                   <p className="transcript-line-2 text-zinc-600 h-8 text-lg"></p>
                </div>

                <div className="processing-indicator absolute inset-0 bg-white/95 backdrop-blur-xl flex flex-col items-center justify-center space-y-6 hidden z-20">
                    <div className="flex space-x-3">
                        <div className="w-2.5 h-2.5 rounded-full bg-accent animate-bounce shadow-[0_0_15px_rgba(79,70,229,0.5)]" style={{ animationDelay: '0s' }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-accent animate-bounce shadow-[0_0_15px_rgba(79,70,229,0.4)]" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2.5 h-2.5 rounded-full bg-accent animate-bounce shadow-[0_0_15px_rgba(79,70,229,0.3)]" style={{ animationDelay: '0.4s' }} />
                    </div>
                    <span className="processing-text text-accent text-[12px] font-black uppercase tracking-[0.5em] animate-pulse"></span>
                </div>
             </div>

             {/* Output View */}
             <div className="flex flex-col space-y-8 scroll-reveal">
                <div className="summary-card bg-indigo-50 border-2 border-indigo-100 rounded-[3rem] p-12 opacity-0 shadow-xl">
                   <span className="text-accent text-[12px] font-black uppercase tracking-[0.3em] block mb-4 underline decoration-accent/20 underline-offset-8">AI Neural Summary</span>
                   <p className="text-zinc-950 font-bold text-2xl italic leading-tight">
                      "System-wide auth cluster scaling initiated for Q3 end (August peak)."
                   </p>
                </div>
                
                <div className="action-item-1 bg-white border border-zinc-100 rounded-[3rem] p-10 flex items-center space-x-8 opacity-0 scale-90 shadow-2xl shadow-zinc-200/50">
                   <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/40">
                      ✓
                   </div>
                   <div className="flex-1">
                      <span className="text-zinc-950 font-black text-xl block mb-1">Draft Migration Epic</span>
                      <span className="text-zinc-400 text-xs tracking-widest font-black uppercase">Assignee: Sarah Jameson • Priority: High</span>
                   </div>
                </div>

                <div className="action-item-2 bg-white border border-zinc-100 rounded-[3rem] p-10 flex items-center space-x-8 opacity-0 scale-90 shadow-2xl shadow-zinc-200/50">
                   <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/40">
                      ✓
                   </div>
                   <div className="flex-1">
                      <span className="text-zinc-950 font-black text-xl block mb-1">Auth Node Scaling Proof</span>
                      <span className="text-zinc-400 text-xs tracking-widest font-black uppercase">Assignee: Alex M. • Priority: Critical</span>
                   </div>
                </div>
             </div>
         </div>
      </div>
    </section>
  );
};

export default AIShowcase;
