import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Database, 
  Server, 
  MonitorPlay, 
  Cpu, 
  Globe, 
  CloudCog 
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const techStack = [
  { name: 'React 19', icon: MonitorPlay, reason: 'Next-gen concurrent rendering and seamless UI flow.' },
  { name: 'Node.js', icon: Server, reason: 'High-performance event-driven backend for real-time networking.' },
  { name: 'MongoDB', icon: Database, reason: 'Flexible document store for complex meeting transcripts.' },
  { name: 'WebRTC', icon: Globe, reason: 'Ultra-low latency peer-to-peer video streaming.' },
  { name: 'OpenAI', icon: Cpu, reason: 'State-of-the-art LLMs for intelligent meeting summaries.' },
  { name: 'AWS', icon: CloudCog, reason: 'Scalable infrastructure for 99.95% uptime SLA.' },
];

export function TechStack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(() => {
    // 1. Orbital Entrance of the whole grid
    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse"
      }
    });

    mainTl.from(".tech-heading", {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power4.out"
    });

    // 2. Individual Card 3D Pathing
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      gsap.fromTo(card, 
        { 
          opacity: 0, 
          y: 60,
          rotationX: -40,
          rotationY: (i % 3 - 1) * 20,
          scale: 0.9,
          skewY: 5
        },
        { 
          opacity: 1, 
          y: 0, 
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          skewY: 0,
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: {
            trigger: card,
            start: "top 95%",
          },
          delay: i * 0.1
        }
      );
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-40 bg-[#000000] relative overflow-hidden">
      {/* Cinematic Pulse Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-radial-gradient from-cyan-500/5 to-transparent blur-[150px] opacity-30 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-32 tech-heading">
          <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8">
             <span className="text-[10px] text-cyan-400 font-black uppercase tracking-[0.4em]">Core Infrastructure</span>
          </div>
          <h2 className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter">
            Elite <span className="text-cyan-500">Foundation</span>
          </h2>
          <p className="text-white/30 text-xl max-w-2xl mx-auto font-medium leading-relaxed italic">
            Engineered for global scalability and zero-latency performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-20">
          {techStack.map((tech, idx) => (
            <div 
              key={idx} 
              ref={el => { cardsRef.current[idx] = el; }}
              className="perspective-2000"
            >
              <TechCard tech={tech} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TechCard({ tech }: { tech: typeof techStack[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isFlipped, setIsFlipped] = React.useState(false);

  // High-performance magnetic hover
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isFlipped) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    gsap.to(cardRef.current, {
      rotationX: (y - 0.5) * -30,
      rotationY: (x - 0.5) * 30,
      duration: 0.4,
      ease: "power2.out"
    });
  };

  const onMouseLeave = () => {
    if (isFlipped) return;
    gsap.to(cardRef.current, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.8,
      ease: "elastic.out(1, 0.5)"
    });
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    gsap.to(cardRef.current, {
      rotationY: isFlipped ? 0 : 180,
      rotationX: 0,
      duration: 1,
      ease: "back.out(1.4)"
    });
  };

  return (
    <div 
      ref={cardRef}
      className="relative h-64 w-full cursor-none group preserve-3d transform-gpu"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={handleFlip}
    >
      {/* Front Face: Minimalist Black */}
      <div className="absolute inset-0 backface-hidden bg-[#000000] border border-white/5 group-hover:border-white/20 rounded-[2.5rem] flex flex-col items-center justify-center p-8 transition-colors duration-700 shadow-2xl">
        <div className="relative mb-8">
           <div className="absolute inset-0 bg-cyan-500/10 blur-2xl opacity-0 group-hover:opacity-100 scale-150 transition-opacity duration-700" />
           <tech.icon size={64} className="text-white/20 group-hover:text-cyan-400 transition-all duration-700 relative z-10" />
        </div>
        <h3 className="text-2xl font-black text-white/90 tracking-tight group-hover:tracking-widest transition-all duration-700">{tech.name}</h3>
        
        {/* Dynamic Scanline */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white/10 group-hover:w-20 group-hover:bg-cyan-500 transition-all duration-700" />
      </div>

      {/* Back Face: Data Overlay */}
      <div 
        className="absolute inset-0 backface-hidden bg-white text-black p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center rotate-y-180 shadow-[0_0_100px_rgba(255,255,255,0.2)]"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 opacity-40">Insight</span>
        <p className="text-lg font-bold leading-snug italic">
          "{tech.reason}"
        </p>
        <div className="mt-8 px-4 py-1.5 rounded-full bg-black text-white text-[9px] font-black uppercase tracking-widest">
           Status: Optimized
        </div>
      </div>
    </div>
  );
}




