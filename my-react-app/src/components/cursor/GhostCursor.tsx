import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MOTION } from '../../utils/motion';

const GhostCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      
      // Dot moves instantly
      if (dotRef.current) {
        gsap.to(dotRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: MOTION.duration.fast,
          ease: MOTION.ease.standard
        });
      }
    };
    
    const updateRing = () => {
      // Lerp for the ring (0.12 lag)
      pos.current.x += (mouse.current.x - pos.current.x) * 0.12;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.12;
      
      if (ringRef.current) {
        gsap.set(ringRef.current, {
          x: pos.current.x,
          y: pos.current.y
        });
      }
      
      requestAnimationFrame(updateRing);
    };
    
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest('button, a, input, [role="button"], .interactive');
      const isText = target.tagName === 'P' || target.tagName === 'SPAN' || target.tagName === 'H1' || target.tagName === 'H2' || target.tagName === 'H3';
      
      if (isInteractive && ringRef.current) {
        gsap.to(ringRef.current, {
          width: 48,
          height: 48,
          backgroundColor: 'rgba(79, 255, 255, 0.12)',
          borderColor: 'rgba(79, 255, 255, 0.4)',
          duration: MOTION.duration.medium
        });
      } else if (isText && ringRef.current) {
        gsap.to(ringRef.current, {
           width: 2,
           height: 24,
           borderRadius: 0,
           backgroundColor: '#fff',
           borderColor: 'transparent',
           duration: MOTION.duration.medium
        });
      } else if (ringRef.current) {
        gsap.to(ringRef.current, {
          width: 32,
          height: 32,
          borderRadius: '50%',
          backgroundColor: 'transparent',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          duration: MOTION.duration.medium
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    const animId = requestAnimationFrame(updateRing);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animId);
    };
  }, []);
  
  return (
    <>
      <div 
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
      <div 
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-white/30 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
      />
    </>
  );
};

export default GhostCursor;
