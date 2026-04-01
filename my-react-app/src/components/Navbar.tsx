import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun } from 'lucide-react';
import { MagneticButton } from './ui/MagneticButton';

const links = ['Features', 'Demo', 'Tech Stack', 'Pricing', 'Login'];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(true); // Default dark

  return (
    <nav className="fixed top-0 inset-x-0 z-50 transition-all bg-[#0Aa628]/0 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="text-2xl font-black text-white relative group z-[60] cursor-pointer">
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
            IntellMeet
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          {links.slice(0, -1).map((link, i) => (
            <a key={i} href={`#${link.toLowerCase().replace(' ', '-')}`} className="text-sm font-medium text-white/50 hover:text-white transition-colors relative group">
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white transition-all group-hover:w-full" />
            </a>
          ))}
          
          <button 
            onClick={() => setIsDark(!isDark)}
            className="text-white/50 hover:text-white transition-colors"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <MagneticButton>
            <button className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 text-white text-sm font-semibold transition-colors backdrop-blur-sm">
              Login
            </button>
          </MagneticButton>
          
          <MagneticButton>
            <button className="px-5 py-2.5 rounded-full bg-white hover:bg-white/90 text-black text-sm font-semibold transition-colors shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              Start Free
            </button>
          </MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden z-[60]">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="text-white p-2"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-50 bg-[#0A1628]/95 backdrop-blur-3xl flex flex-col items-center justify-center space-y-8 h-screen w-screen"
          >
            {links.map((link, i) => (
              <motion.a
                key={i}
                href={`#${link.toLowerCase().replace(' ', '-')}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.2 }}
                onClick={() => setIsOpen(false)}
                className="text-3xl font-bold text-slate-300 hover:text-accent transition-colors"
              >
                {link}
              </motion.a>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: links.length * 0.1 + 0.3 }}
            >
              <button 
                onClick={() => setIsDark(!isDark)}
                className="text-slate-400 hover:text-accent transition-colors mt-8 p-4 bg-white/5 rounded-full"
              >
                {isDark ? <Sun size={24} /> : <Moon size={24} />}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
