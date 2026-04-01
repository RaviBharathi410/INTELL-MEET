import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const CinematicBackground: React.FC = () => {
    const { scrollYProgress } = useScroll();
    
    // Generate static noise/stars pattern
    const particles = useMemo(() => {
        return Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            size: Math.random() * 2 + 1,
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 5
        }));
    }, []);

    const rotateX = useTransform(scrollYProgress, [0, 1], [0, 20]);
    const rotateY = useTransform(scrollYProgress, [0, 1], [0, -20]);
    const zTranslate = useTransform(scrollYProgress, [0, 1], [0, -500]);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden perspective-2000">
            <motion.div 
                style={{ rotateX, rotateY, translateZ: zTranslate }}
                className="absolute inset-[-50%] w-[200%] h-[200%] opacity-20"
            >
                {/* Orbital Rings */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full animate-slow-spin" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1600px] h-[1600px] border border-white/5 rounded-full animate-slow-reverse-spin" />

                {/* Particles/Stars */}
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        initial={{ opacity: 0 }}
                        animate={{ 
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ 
                            duration: p.duration, 
                            repeat: Infinity, 
                            delay: p.delay 
                        }}
                        className="absolute bg-white rounded-full"
                        style={{
                            top: p.top,
                            left: p.left,
                            width: p.size,
                            height: p.size,
                            filter: 'blur(1px)'
                        }}
                    />
                ))}
            </motion.div>

            {/* Cyan Glow Vibe */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.02),transparent_70%)]" />
        </div>
    );
};
