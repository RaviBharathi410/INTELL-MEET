import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { MOTION } from '../../utils/motion';

const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Letter-by-letter entrance
    const chars = textRef.current?.innerText.split('') || [];
    if (textRef.current) {
      textRef.current.innerHTML = chars
        .map(char => `<span class="inline-block opacity-0 translate-y-20">${char}</span>`)
        .join('');
        
      gsap.to(textRef.current.children, {
        opacity: 1,
        y: 0,
        stagger: 0.04,
        duration: MOTION.duration.xl,
        ease: MOTION.ease.smooth,
      });
    }

    // Progress proxy for reactive state + width updates
    const progressObj = { val: 0 };
    
    // 1. Start a slow "fake" load up to 85% while we wait
    const fakeLoader = gsap.to(progressObj, {
      val: 85,
      duration: MOTION.duration.xl * 1.5,
      ease: 'power1.out',
      onUpdate: () => {
        setProgress(Math.round(progressObj.val));
        if (barRef.current) barRef.current.style.width = `${progressObj.val}%`;
      }
    });

    // 2. Real asset readiness check
    const preloadAssets = async () => {
       const fontPromise = document.fonts ? document.fonts.ready : Promise.resolve();
       
       const images = Array.from(document.images);
       const imagePromises = images.map(img => {
         if (img.complete) return Promise.resolve();
         return new Promise((resolve) => {
           img.addEventListener('load', resolve);
           img.addEventListener('error', resolve);
         });
       });

       // Enforce a small minimum display time just so the initial animation plays
       const minDisplayTime = new Promise(resolve => setTimeout(resolve, 800));

       await Promise.all([fontPromise, minDisplayTime, ...imagePromises]);
       
       // 3. Assets ready! Kill fake loader and rush to 100%
       fakeLoader.kill();
       
       gsap.to(progressObj, {
          val: 100,
          duration: MOTION.duration.medium,
          ease: MOTION.ease.standard,
          onUpdate: () => {
            setProgress(Math.round(progressObj.val));
            if (barRef.current) barRef.current.style.width = `${progressObj.val}%`;
          },
          onComplete: () => {
            gsap.to(containerRef.current, {
              clipPath: 'inset(0 0 100% 0)',
              duration: MOTION.duration.slow,
              ease: MOTION.ease.smooth,
              delay: 0.1,
              onComplete
            });
          }
       });
    };

    preloadAssets();
  }, { scope: containerRef });

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-[#000] z-[99999] flex flex-col items-center justify-center pointer-events-none"
      style={{ clipPath: 'inset(0 0 0 0)' }}
    >
      <div className="relative overflow-hidden mb-8">
        <h1 
          ref={textRef}
          className="font-display text-8xl font-black text-white tracking-[0.2em]"
        >
          INTELLMEET
        </h1>
      </div>
      
      <div className="w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
        <div 
          ref={barRef}
          className="absolute top-0 left-0 h-full bg-accent shadow-[0_0_15px_#4fffff]"
          style={{ width: '0%' }}
        />
      </div>
      
      <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.4em] text-white/40">
        {progress}% Initializing Neural Core
      </div>
    </div>
  );
};

export default LoadingScreen;
