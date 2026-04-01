import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isMeetRoom = location.pathname.startsWith('/room');
  if (isMeetRoom) return null;

  return (
    <nav className={clsx(
      'fixed top-0 left-0 w-full z-[1000] transition-all duration-700 border-b',
      scrolled ? 'bg-white/80 backdrop-blur-3xl border-zinc-200 py-5 shadow-sm' : 'bg-transparent border-transparent py-10'
    )}>
      <div className="max-w-[1400px] mx-auto px-10 flex items-center justify-between">
        {/* Logo */}
        <div 
          className="flex items-center space-x-4 cursor-pointer group"
          onClick={() => navigate('/')}
        >
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-white shadow-[0_20px_40px_-10px_rgba(79,70,229,0.3)] group-hover:rotate-12 transition-transform">
             <div className="w-6 h-6 border-4 border-white rounded-full border-t-transparent animate-spin-slow" />
          </div>
          <span className="font-display text-2xl font-black text-zinc-950 tracking-[-0.05em]">intellmeet</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center space-x-16">
          {['Ecosystem', 'Strategic', 'Security', 'Enterprise'].map((link) => (
            <a 
              key={link} 
              href="#" 
              className="text-[12px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-zinc-950 transition-colors"
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA */}
        <button 
          className="px-10 py-3.5 bg-accent text-white font-black text-[12px] uppercase tracking-widest rounded-full shadow-[0_15px_30px_-5px_rgba(79,70,229,0.3)] hover:scale-105 active:scale-95 transition-all duration-500"
          onClick={() => navigate('/room/alpha-v8')}
        >
          Access Space
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
