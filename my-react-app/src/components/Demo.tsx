import { motion, AnimatePresence } from 'framer-motion';
import { Play, Maximize, X } from 'lucide-react';
import { useState } from 'react';

const hotspots = [
  { id: 1, x: '20%', y: '30%', label: 'Live Transcript', desc: 'Real-time AI-powered speech-to-text with syntax highlighting.' },
  { id: 2, x: '60%', y: '15%', label: 'Active Speaker', desc: 'HD video feed with auto-focus on active participants.' },
  { id: 3, x: '80%', y: '70%', label: 'Action Items', desc: 'Auto-extracted tasks and assignees.' },
];

export function Demo() {
  const [activeHotspot, setActiveHotspot] = useState<number | null>(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="py-32 bg-black relative" id="demo">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-white mb-6"
          >
            Experience IntellMeet
          </motion.h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">
            Interactive preview of our next-gen dashboard. Hover over hotspots to see features in action.
          </p>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-5xl mx-auto"
        >
          {/* Mockup Frame */}
          <div className="rounded-3xl border border-white/10 bg-black/50 backdrop-blur-xl p-4 shadow-2xl relative overflow-hidden group">
            
            {/* Top Bar Mock */}
            <div className="flex items-center space-x-2 mb-4 px-2">
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="w-3 h-3 rounded-full bg-white/20" />
              <div className="flex-1 ml-4 bg-white/5 rounded-md h-6" />
            </div>

            {/* Simulated UI Area */}
            <div className="relative aspect-video rounded-2xl bg-[#0a0a0a] border border-white/5 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-30 mix-blend-luminosity grayscale" />
              
              {/* Fake UI Elements */}
              <div className="absolute top-4 left-4 right-4 bottom-24 flex gap-4">
                <div className="flex-[3] bg-black/40 rounded-xl backdrop-blur-md border border-white/10 p-4">
                  <div className="w-32 h-4 bg-white/20 rounded mb-4" />
                  <div className="w-full h-2 bg-white/10 rounded mb-2" />
                  <div className="w-3/4 h-2 bg-white/10 rounded mb-2" />
                  <div className="w-5/6 h-2 bg-white/10 rounded" />
                </div>
                <div className="flex-1 bg-black/40 rounded-xl backdrop-blur-md border border-white/10" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 h-16 bg-black/40 rounded-xl backdrop-blur-md flex items-center justify-center space-x-4">
                <div className="w-10 h-10 rounded-full bg-white/20" />
                <div className="w-10 h-10 rounded-full bg-white/20" />
                <div className="w-16 h-10 rounded-full bg-white/40" />
              </div>

              {/* Play Button Overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/60 transition-colors">
                <button 
                  onClick={() => setIsVideoOpen(true)}
                  className="w-20 h-20 rounded-full bg-white/10 border-2 border-white text-white flex items-center justify-center hover:bg-white hover:text-black transition-all hover:scale-110"
                >
                  <Play size={32} className="ml-2" />
                </button>
              </div>

              {/* Hotspots */}
              {hotspots.map((spot) => (
                <div 
                  key={spot.id}
                  className="absolute z-20"
                  style={{ left: spot.x, top: spot.y }}
                  onMouseEnter={() => setActiveHotspot(spot.id)}
                  onMouseLeave={() => setActiveHotspot(null)}
                >
                  <div className="relative">
                    <motion.div 
                      className="w-4 h-4 rounded-full bg-accent relative z-10 cursor-pointer"
                      whileHover={{ scale: 1.5 }}
                    />
                    <div className="absolute inset-0 bg-accent rounded-full animate-ping opacity-75" />
                    
                    <AnimatePresence>
                      {activeHotspot === spot.id && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 5, scale: 0.9 }}
                          className="absolute top-6 -left-20 w-48 bg-slate-900/90 backdrop-blur-md border border-accent/30 p-4 rounded-xl shadow-xl pointer-events-none"
                        >
                          <h4 className="text-accent font-semibold mb-1">{spot.label}</h4>
                          <p className="text-xs text-slate-300">{spot.desc}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ))}

            </div>
          </div>
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-12"
          >
            <button 
              className="absolute top-6 right-6 text-white/50 hover:text-white"
              onClick={() => setIsVideoOpen(false)}
            >
              <X size={32} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden border border-white/10"
            >
              {/* Fake Video Player Placeholder */}
              <div className="w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400">
                <Maximize size={48} className="mb-4 opacity-50" />
                <p>Interactive Demo Video Placeholder</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
