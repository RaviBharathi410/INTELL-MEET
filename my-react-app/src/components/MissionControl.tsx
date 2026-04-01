import React from 'react';
import { motion } from 'framer-motion';
import { Globe, BarChart3, Users, Zap } from 'lucide-react';

const stats = [
  { icon: Globe, label: 'Global Nodes', value: '450+' },
  { icon: Zap, label: 'Latency', value: '< 1.2s' },
  { icon: Users, label: 'Active Sync', value: '24k' },
  { icon: BarChart3, label: 'Data Processed', value: '1.2PB' }
];

/**
 * MISSION CONTROL SECTION
 * Bridges the gap between Hero and Features
 */
export const MissionControl: React.FC = () => {
  return (
    <section className="relative bg-black py-60 -mt-[30vh] border-t border-white/5 overflow-hidden z-20">
      {/* Soft White Atmosphere */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.03),transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 1.2, ease: "easeOut" }}
                    className="flex flex-col items-center text-center group"
                >
                    <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 group-hover:border-white/20 group-hover:bg-white/10 transition-all duration-700 shadow-xl">
                        <stat.icon className="text-white/40 group-hover:text-white transition-colors" size={32} />
                    </div>
                    <span className="text-5xl md:text-6xl font-[1000] text-white italic uppercase tracking-tighter mb-6">{stat.value}</span>
                    <span className="text-[11px] text-white/30 font-black uppercase tracking-[0.4em] italic">{stat.label}</span>
                </motion.div>
            ))}
        </div>
        
        {/* Dynamic Connective Line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mt-60" />
      </div>
    </section>
  );
};
