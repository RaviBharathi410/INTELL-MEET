import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Video, 
  MessagesSquare, 
  LineChart, 
  Layout, 
  ShieldCheck 
} from 'lucide-react';
import { useState } from 'react';

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Meeting Intelligence',
    desc: 'Real-time transcription, summary, action items',
  },
  {
    icon: Video,
    title: 'Video Conferencing',
    desc: 'HD video, screen sharing, 50+ participants',
  },
  {
    icon: MessagesSquare,
    title: 'Smart Collaboration',
    desc: 'Live notes, task creation, @mentions',
  },
  {
    icon: LineChart,
    title: 'Analytics Dashboard',
    desc: 'Meeting metrics, productivity insights',
  },
  {
    icon: Layout,
    title: 'Team Workspaces',
    desc: 'Kanban boards, project management',
  },
  {
    icon: ShieldCheck,
    title: 'Security First',
    desc: 'E2E encryption, OWASP compliance',
  },
];

const FeatureCard = ({ feature }: { feature: typeof features[0] }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div
      className="relative flex-none w-[320px] h-[280px] p-1 rounded-3xl overflow-hidden group perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500 rounded-3xl" />
      <motion.div 
        className="relative flex flex-col items-center text-center justify-center p-8 h-full bg-[#050505] backdrop-blur-2xl rounded-[23px] border border-white/5 group-hover:border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.5)] transition-all overflow-hidden"
        animate={{
          rotateX: isHovered ? 5 : 0,
          rotateY: isHovered ? 5 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.div 
          className="p-4 rounded-full bg-white/5 text-white mb-6 group-hover:bg-white/10 transition-colors"
          animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 10 : 0 }}
        >
          <feature.icon size={36} strokeWidth={1.5} />
        </motion.div>
        <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-2">{feature.title}</h3>
        <p className="text-white/30 text-xs font-bold uppercase tracking-widest leading-relaxed">{feature.desc}</p>
      </motion.div>
    </motion.div>
  );
};

export function Features() {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-white mb-6"
        >
          Supercharge Your Workflow
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-white/50 text-lg max-w-2xl mx-auto"
        >
          Everything you need to transform your meetings into actionable intelligence, all in one platform.
        </motion.p>
      </div>

      <div className="relative w-full flex overflow-hidden">
        {/* We double the features to create a seamless infinite scroll loop */}
        <motion.div
          className="flex space-x-8 px-4"
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{ 
            repeat: Infinity, 
            ease: "linear", 
            duration: 30 
          }}
          style={{ width: "fit-content" }}
        >
          {[...features, ...features].map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
