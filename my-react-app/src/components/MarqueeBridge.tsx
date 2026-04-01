import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const words = ["AUTONOMOUS", "SYNTHETIC", "INSTANT", "SOVEREIGN", "SECURE"];

/**
 * CINEMATIC TEXT MARQUEE BRIDGE
 * Fills any gap with high-impact, scroll-synced typography
 */
export const MarqueeBridge: React.FC = () => {
    const containerRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const xLeft = useTransform(scrollYProgress, [0, 1], [-100, 100]);
    const xRight = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const rotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

    return (
        <section ref={containerRef} className="bg-black overflow-hidden border-y border-cyan-500/10 relative z-20 py-0 -mt-80 perspective-2000">
            {/* Top Row - Deep Cyan Grid */}
            <motion.div style={{ x: xLeft, rotateX: rotate }} className="flex whitespace-nowrap mb-12 opacity-20">
                {words.map((word, i) => (
                    <span key={i} className="text-[5rem] font-black text-cyan-400 drop-shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all uppercase tracking-[0.2em] px-12 outline-text-cyan">
                        {word} ARCHITECTURE
                    </span>
                ))}
            </motion.div>

            {/* Middle Row - Primary 3D Glow */}
            <motion.div style={{ x: xRight, scale: 1.1 }} className="flex whitespace-nowrap mb-12">
                {words.map((word, i) => (
                    <span key={i} className="text-[5rem] md:text-[6rem] font-black text-white drop-shadow-[0_0_40px_rgba(0,255,255,0.6)] transition-all uppercase tracking-tighter px-12">
                        {word} INTERFACE SYSTEM
                    </span>
                ))}
            </motion.div>

             {/* Bottom Row - Data Stream */}
             <motion.div style={{ x: xLeft, rotateX: -rotate }} className="flex whitespace-nowrap opacity-20">
                {words.map((word, i) => (
                    <span key={i} className="text-[5rem] font-black text-cyan-500 transition-all uppercase tracking-[0.2em] px-12 outline-text-cyan">
                        {word} NEURAL ACCESS
                    </span>
                ))}
            </motion.div>
            
            <style>{`
                .outline-text-cyan {
                    -webkit-text-stroke: 1px rgba(0,255,255,0.5);
                    color: transparent;
                }
            `}</style>
        </section>
    );
};
