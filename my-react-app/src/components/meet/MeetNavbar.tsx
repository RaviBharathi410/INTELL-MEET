import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, LogOut } from 'lucide-react';

const MeetNavbar: React.FC = () => {
  const [time, setTime] = useState('00:42:17');
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
        const [h, m, s] = time.split(':').map(Number);
        let ns = s + 1;
        let nm = m;
        let nh = h;
        if (ns === 60) { ns = 0; nm++; }
        if (nm === 60) { nm = 0; nh++; }
        setTime(`${nh.toString().padStart(2, '0')}:${nm.toString().padStart(2, '0')}:${ns.toString().padStart(2, '0')}`);
    }, 1000);
    return () => clearInterval(interval);
  }, [time]);

  return (
    <nav className="h-16 bg-black border-b border-white/5 flex items-center justify-between px-6 z-[1001]">
       {/* Left: Logo + ID */}
       <div className="flex items-center space-x-6">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-black group-hover:rotate-12 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-4 h-4"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 px-3 py-1.5 bg-white/[0.03] border border-white/5 rounded-lg group cursor-pointer hover:border-accent transition-colors">
             <span className="font-mono text-[10px] uppercase tracking-widest text-white/40 group-hover:text-accent">ID: ALPHA-V8-77B</span>
             <Copy size={12} className="text-white/20 group-hover:text-accent" />
          </div>
       </div>

       {/* Center: Timer */}
       <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
             <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
             <span className="font-mono text-[18px] font-bold text-accent tracking-tighter">
                {time}
             </span>
          </div>
       </div>

       {/* Right: Signal + End */}
       <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
             <div className="flex items-end space-x-0.5 h-3">
                <div className="w-1 bg-accent h-full rounded-sm" />
                <div className="w-1 bg-accent h-2/3 rounded-sm" />
                <div className="w-1 bg-accent-2 h-1/2 rounded-sm animate-pulse" />
             </div>
             <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 hidden md:inline">Neural Link Stable</span>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 group"
          >
             <span className="text-[10px] font-black uppercase tracking-widest hidden md:inline">Terminate Session</span>
             <LogOut size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
       </div>
    </nav>
  );
};

export default MeetNavbar;
