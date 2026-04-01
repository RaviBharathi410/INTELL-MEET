import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MOTION } from './utils/motion';

gsap.registerPlugin(ScrollTrigger);

// Layout
import LoadingScreen from './components/layout/LoadingScreen';
import GhostCursor from './components/cursor/GhostCursor';
import Navbar from './components/layout/Navbar';

// Pages
import Landing from './pages/Landing';
import MeetRoom from './pages/MeetRoom';

// Styles
import './styles/globals.css';

const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
     <motion.div
       initial={{ clipPath: 'inset(0 0 0 100%)' }}
       animate={{ clipPath: 'inset(0 0 0 0)' }}
       exit={{ clipPath: 'inset(0 100% 0 0)' }}
       transition={{ duration: MOTION.duration.slow, ease: MOTION.ease.framerSmooth }}
     >
       {children}
     </motion.div>
  );
};

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Landing /></PageTransition>} />
                <Route path="/room/:id" element={<PageTransition><MeetRoom /></PageTransition>} />
                <Route path="*" element={null} />
            </Routes>
        </AnimatePresence>
    );
};

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0); // Prevents GSAP from skipping frames trying to catch up
    
    // 🛑 Pause Lenis + ALL GSAP animations when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        lenis.stop();
        gsap.globalTimeline.pause();
      } else {
        lenis.start();
        gsap.globalTimeline.resume();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      lenis.destroy();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      gsap.ticker.remove(updateLenis);
    };
  }, []);

  return (
    <Router>
      <AnimatePresence>
        {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>
      
      {!loading && (
        <div className="relative">
          <GhostCursor />
          <Navbar />
          <AnimatedRoutes />
        </div>
      )}
    </Router>
  );
};

export default App;
