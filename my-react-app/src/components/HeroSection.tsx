import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Sparkles, MessageSquare, Mic } from 'lucide-react';
import VariableProximity from './ui/VariableProximity';
import LogoReveal from './LogoReveal';
import '../styles/hero.css';

/**
 * PRODUCTION-GRADE CONTINUOUS HERO NARRATIVE (NO BLACK SCREENS)
 * Fixes: Smoother Intro Transitions + Brightened Assets + Gapless Scroll Overlaps
 */
const HeroSection: React.FC = () => {
  const [revealComplete, setRevealComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Fast but dampened spring for premium "weight" while avoiding any 'stuck' feeling
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 40,
    mass: 1,
    restDelta: 0.001
  });

  // --- NARRATIVE TIMELINE ---
  
  // Scene 1: Headline
  const headlineOpacity = useTransform(smoothScroll, [0, 0.3], [1, 0]);
  const headlineScale = useTransform(smoothScroll, [0, 0.3], [1, 0.85]);
  const contentY = useTransform(smoothScroll, [0, 0.3], [0, -100]);

  // Scene 2: Neural Grid
  const systemOpacity = useTransform(smoothScroll, [0.15, 0.4, 0.7, 0.95], [0, 1, 1, 0]);
  const systemScale = useTransform(smoothScroll, [0.15, 0.45], [0.8, 1]);
  const systemRotate = useTransform(smoothScroll, [0.15, 0.95], [0, 20]);

  // Content Items
  const item1Opacity = useTransform(smoothScroll, [0.4, 0.55], [0, 1]);
  const item1X = useTransform(smoothScroll, [0.4, 0.55], [-50, 0]);
  
  const item2Opacity = useTransform(smoothScroll, [0.55, 0.7], [0, 1]);
  const item2X = useTransform(smoothScroll, [0.55, 0.7], [50, 0]);

  const item3Opacity = useTransform(smoothScroll, [0.7, 0.85], [0, 1]);
  const item3Y = useTransform(smoothScroll, [0.7, 0.85], [50, 0]);

  // SCENE 3: Final Synergy Core Dashboard
  const coreOpacity = useTransform(smoothScroll, [0.85, 0.95, 1], [0, 1, 1]);
  const coreScale = useTransform(smoothScroll, [0.85, 0.95], [0.95, 1]);
  const coreY = useTransform(smoothScroll, [0.85, 0.95], [100, 0]);

  const scrollHintOpacity = useTransform(smoothScroll, [0, 0.1], [1, 0]);

  return (
    <div ref={containerRef} className="relative h-[220vh] bg-black font-sans selection:bg-white selection:text-black overflow-x-hidden no-scrollbar">
      
      <LogoReveal onComplete={() => setRevealComplete(true)} />

      {/* Brighter & Smoother Navigation Overlay */}
      <nav className={`fixed top-0 w-full z-[101] flex items-center justify-between px-12 h-24 border-b border-white/10 backdrop-blur-3xl bg-black/60 transition-all duration-1000 ease-out ${revealComplete ? 'translate-y-0 opacity-100 shadow-[0_0_50px_rgba(255,255,255,0.05)]' : '-translate-y-10 opacity-0'}`}>
            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-10 h-10 bg-cyan-400 flex items-center justify-center rounded-xl shadow-[0_0_30px_rgba(0,255,255,0.4)] rotate-45">
                <div className="w-1.5 h-6 bg-black rounded-full -rotate-45" />
                <div className="w-1.5 h-6 bg-black rounded-full ml-1 -rotate-45" />
              </div>
              <span className="text-2xl font-black tracking-widest text-white uppercase font-mono">INTELLMEET</span>
            </div>

            <div className="hidden md:flex space-x-12">
                {['Intelligence', 'Systems', 'Protocol', 'Access'].map(link => (
                    <a key={link} href="#" className="text-[10px] font-black text-white/40 hover:text-white transition-colors uppercase tracking-[0.3em]">{link}</a>
                ))}
            </div>

            <button className="bg-white text-black px-10 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-[0_10px_30px_rgba(255,255,255,0.2)]">
                Launch Space
            </button>
      </nav>

      {/* STICKY CONTENT STAGE */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Layer 0: Brighter Continuous Atmosphere (Prevents Black Screens) */}
        <div className="absolute inset-0 pointer-events-none z-0">
             <div className="absolute inset-0 hero-noise opacity-20" />
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,255,255,0.08),transparent_75%)]" />
        </div>

        <motion.div 
            style={{ opacity: headlineOpacity, scale: headlineScale, y: contentY }}
            className="absolute inset-x-0 bottom-1/2 translate-y-1/2 z-10 flex flex-col items-center justify-center w-full px-6"
        >
            <AnimatePresence mode="wait">
                {revealComplete && (
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Quintic easeOut
                        className="flex flex-col items-center justify-center w-full max-w-7xl mx-auto"
                    >
                        <h1 className="text-[clamp(3.5rem,14vw,9.5rem)] font-[1000] leading-[0.9] tracking-tighter text-center text-white mb-20 italic uppercase drop-shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                            <VariableProximity label="Action" radius={300} falloff="gaussian" className="block" />
                            <VariableProximity label="Over" radius={300} falloff="gaussian" className="block text-white/10" />
                            <VariableProximity label="Noise" radius={300} falloff="gaussian" className="block" />
                        </h1>

                        <button className="flex items-center space-x-8 bg-white text-black px-12 py-7 rounded-[2rem] font-black text-xl hover:scale-105 active:scale-95 transition-all group shadow-[0_20px_50px_rgba(255,255,255,0.2)]">
                            <span>Initialize Node</span>
                            <ArrowRight className="group-hover:translate-x-3 transition-transform" size={24} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>

        {/* --- SCENE 2 (THE NEURAL GRID SYSTEM) --- */}
        <motion.div 
            style={{ 
                opacity: systemOpacity, 
                scale: systemScale, 
                rotate: systemRotate,
                willChange: 'transform, opacity'
            }}
            className="absolute inset-0 z-20 flex items-center justify-center p-12 pointer-events-none"
        >
             <div className="relative w-full max-w-7xl h-full flex items-center justify-center">
                {/* Visual Anchor: Brighter Orbital Mechanics */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 25, repeat: Infinity, ease: "linear" }} className="absolute w-[45rem] h-[45rem] border border-white/10 rounded-full blur-[1px]" />
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }} className="absolute w-[35rem] h-[35rem] border border-dashed border-white/20 rounded-full" />

                {/* ITEM 1: VOCAL CORE (SMOOTH TOP REVEAL) */}
                <motion.div style={{ opacity: item1Opacity, x: item1X }} className="absolute -translate-y-56 w-[28rem] p-10 bg-white/[0.05] border border-white/20 backdrop-blur-3xl rounded-[3.5rem] shadow-2xl">
                    <div className="flex items-center space-x-6 mb-6">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
                            <Mic size={30} className="text-white" />
                        </div>
                        <h3 className="text-white text-3xl font-[1000] italic uppercase">Vocal Core</h3>
                    </div>
                    <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.25em] leading-relaxed">Multichannel acoustic processing with zero-latency transcription units.</p>
                </motion.div>

                {/* ITEM 2: SYNTHESIS (SMOOTH RIGHT REVEAL) */}
                <motion.div style={{ opacity: item2Opacity, x: item2X }} className="absolute translate-x-[28rem] translate-y-10 w-[28rem] p-10 bg-white/[0.05] border border-white/20 backdrop-blur-3xl rounded-[3.5rem] shadow-2xl">
                    <div className="flex items-center space-x-6 mb-6">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
                            <MessageSquare size={30} className="text-white" />
                        </div>
                        <h3 className="text-white text-3xl font-[1000] italic uppercase">Synthesis</h3>
                    </div>
                    <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.25em] leading-relaxed">Autonomous intent extraction from unstructured conversational data streams.</p>
                </motion.div>

                {/* ITEM 3: SECURITY LAYER (SMOOTH BOTTOM REVEAL) */}
                <motion.div style={{ opacity: item3Opacity, y: item3Y }} className="absolute translate-y-64 w-[28rem] p-10 bg-white/[0.05] border border-white/20 backdrop-blur-3xl rounded-[3.5rem] shadow-2xl">
                    <div className="flex items-center space-x-6 mb-6">
                        <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center shadow-inner">
                            <Shield size={30} className="text-white" />
                        </div>
                        <h3 className="text-white text-3xl font-[1000] italic uppercase">Protocol</h3>
                    </div>
                    <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.25em] leading-relaxed">Enterprise-grade AES-256 encryption. Sovereign ISO-compliant security access.</p>
                </motion.div>

                {/* Intensity Anchor */}
                <div className="w-6 h-6 bg-white rounded-full shadow-[0_0_80px_30px_rgba(255,255,255,0.15)] animate-pulse" />
             </div>
        </motion.div>

        {/* --- SCENE 3 (THE FINAL SYNERGY CORE) --- */}
        {/* ENHANCED: Overlaps Scene 2 early for zero black screen gap */}
        <motion.div 
            style={{ opacity: coreOpacity, scale: coreScale, y: coreY }} 
            className="absolute z-40 flex flex-col items-center justify-center p-12 w-full h-full pointer-events-none"
        >
             <div className="bg-[#050505]/40 border border-white/10 rounded-[6rem] w-full max-w-7xl h-3/4 flex flex-col items-center justify-center backdrop-blur-3xl shadow-[0_120px_250px_rgba(0,0,0,1)] relative overflow-hidden">
                <Sparkles size={70} className="text-white/30 mb-14" />
                <h2 className="text-[clamp(5rem,14vw,14rem)] font-[1000] text-white italic uppercase tracking-tighter mix-blend-difference drop-shadow-2xl">SYNERGY</h2>
                <div className="w-64 h-[2px] bg-white/20 mt-16" />
                <p className="text-white/20 text-3xl mt-16 uppercase font-black tracking-[1em]">Autonomous Protocol Active</p>
             </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div style={{ opacity: scrollHintOpacity }} className="absolute bottom-12 z-[102] flex flex-col items-center transition-all">
             <div className="w-[1.5px] h-24 bg-gradient-to-b from-transparent via-white/50 to-transparent relative overflow-hidden">
                <motion.div animate={{ y: [0, 96] }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }} className="absolute top-0 w-full h-[60%] bg-white shadow-[0_0_20px_white]" />
             </div>
        </motion.div>

      </div>
    </div>
  );
};

export default HeroSection;
