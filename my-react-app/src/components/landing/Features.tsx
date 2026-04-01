import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION } from '../../utils/motion';
import { 
  Video, 
  BrainCircuit, 
  ClipboardCheck, 
  LayoutDashboard, 
  BarChart3, 
  ShieldCheck 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { 
    title: 'Real-Time Video', 
    desc: 'Ultra-low latency streaming with peer-to-peer optimization for up to 50 participants.',
    icon: Video,
    color: 'from-cyan-500/20 to-blue-500/20'
  },
  { 
    title: 'AI Transcription', 
    desc: 'Neural-powered live speech-to-text with 99.8% spectral integrity across 40+ languages.',
    icon: BrainCircuit,
    color: 'from-accent-2/20 to-violet-500/20'
  },
  { 
    title: 'Smart Action Items', 
    desc: 'Auto-detect decisions and assign tasks to team members directly from the conversation.',
    icon: ClipboardCheck,
    color: 'from-accent-3/20 to-magenta-500/20'
  },
  { 
    title: 'Team Kanban', 
    desc: 'Sync meeting outcomes to your existing workflow tools with one-click enterprise integration.',
    icon: LayoutDashboard,
    color: 'from-emerald-500/20 to-teal-500/20'
  },
  { 
    title: 'Analytics Dashboard', 
    desc: 'Deep insights into team engagement, meeting efficiency, and conversational sentiment.',
    icon: BarChart3,
    color: 'from-amber-500/20 to-orange-500/20'
  },
  { 
    title: 'End-to-End Encrypted', 
    desc: 'Production-grade security protocols ensuring your data never leaves your private cloud.',
    icon: ShieldCheck,
    color: 'from-red-500/20 to-rose-500/20'
  },
];

const Features: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    // SplitText char stagger for title
    if (titleRef.current) {
        const text = titleRef.current.innerText;
        titleRef.current.innerHTML = text.split('').map(char => {
            if (char === ' ') return `<span class="inline-block">&nbsp;</span>`;
            return `<span class="inline-block opacity-0 translate-y-10">${char}</span>`;
        }).join('');
        gsap.to(titleRef.current.children, {
            opacity: 1,
            y: 0,
            stagger: 0.03,
            duration: MOTION.duration.slow,
            ease: MOTION.ease.smooth,
            scrollTrigger: {
                trigger: titleRef.current,
                start: 'top 90%',
                end: 'bottom 70%',
                scrub: true,
            }
        });
    }

    const cards = gsap.utils.toArray<HTMLElement>('.feature-card');
    const cleanupFns: (() => void)[] = [];

    // Orbital Entrance (borrowed from FloatingMockup)
    gsap.fromTo(cards, 
      {
        rotationX: -15,
        rotationY: 25,
        rotateZ: -5,
        y: 100,
        opacity: 0,
        scale: 0.9
      },
      {
        rotationX: 0,
        rotationY: 0,
        rotateZ: 0,
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.1,
        duration: MOTION.duration.xl,
        ease: MOTION.ease.standard,
        scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            once: true
        }
      }
    );

    // Smooth 3D tilt on hover
    cards.forEach((card) => {
        const onMouseEnter = () => {
          gsap.to(card, {
            scale: 1.05,
            duration: 0.4,
            ease: "power2.out",
          });
        };

        const onMouseMove = (e: MouseEvent) => {
          const { left, top, width, height } = card.getBoundingClientRect();
          const x = (e.clientX - left) / width; // 0 to 1
          const y = (e.clientY - top) / height; // 0 to 1

          // Calculate tilt (max 15 degrees)
          const tiltX = (y - 0.5) * -30;
          const tiltY = (x - 0.5) * 30;

          gsap.to(card, {
            rotationX: tiltX,
            rotationY: tiltY,
            duration: 0.5,
            ease: "power3.out",
            overwrite: "auto"
          });
        };

        const onMouseLeave = () => {
          gsap.to(card, {
            scale: 1,
            rotationX: 0,
            rotationY: 0,
            duration: 0.8,
            ease: "power3.out",
            overwrite: "auto"
          });
        };

        card.addEventListener('mouseenter', onMouseEnter);
        card.addEventListener('mousemove', onMouseMove as EventListener);
        card.addEventListener('mouseleave', onMouseLeave);

        cleanupFns.push(() => {
          card.removeEventListener('mouseenter', onMouseEnter);
          card.removeEventListener('mousemove', onMouseMove as EventListener);
          card.removeEventListener('mouseleave', onMouseLeave);
        });
    });

    return () => {
      cleanupFns.forEach(fn => fn());
    };
  }, { scope: containerRef });



  return (
    <section 
      ref={containerRef}
      className="py-24 md:py-32 px-6 md:px-10 bg-white relative overflow-visible select-none"
      style={{ perspective: '2000px' }}
    >
      {/* Floating Background Blooms */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[150px] -translate-y-1/2 translate-x-1/2 pointer-events-none opacity-30" />

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10 w-full">
        <h2 
          ref={titleRef}
          className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[100px] font-black text-zinc-950 text-center mb-16 md:mb-24 tracking-[-0.05em] leading-none"
        >
          Built for spectral scale.
        </h2>

        <div className="features-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 lg:gap-16 w-full relative transform-gpu will-change-transform">
            {features.map((f, i) => (
              <div 
                key={i}
                className="feature-card group relative p-16 bg-white border border-zinc-100 rounded-[3rem] transition-all duration-700 overflow-hidden shadow-2xl shadow-zinc-200/50 backdrop-blur-3xl transform-gpu will-change-transform"
                style={{ transformStyle: 'preserve-3d' }}
              >
                 <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${f.color} flex items-center justify-center mb-12 border border-white/20 shadow-xl transition-transform duration-700 group-hover:scale-110 shadow-accent/20 translate-z-[50px] transform-gpu`}>
                    <f.icon className="text-white w-10 h-10" />
                 </div>
                 
                 <h3 className="text-3xl font-bold text-zinc-950 mb-6 tracking-tight group-hover:text-accent transition-colors translate-z-[30px] transform-gpu">
                    {f.title}
                 </h3>
                 <p className="text-zinc-600 text-xl leading-relaxed font-medium font-body border-t border-zinc-50 pt-8 translate-z-[20px] transform-gpu">
                    {f.desc}
                 </p>
                 
                 {/* Subtle Corner Bloom */}
                 <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -z-10" />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
