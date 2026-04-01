import { useEffect } from 'react';
import Lenis from 'lenis';
import HeroSection from '../components/HeroSection';
import { MarqueeBridge } from '../components/MarqueeBridge';
import { MissionControl } from '../components/MissionControl';
import { Features } from '../components/Features';
import { Demo } from '../components/Demo';
import { TechStack } from '../components/TechStack';
import { SocialProof } from '../components/SocialProof';
import { Pricing } from '../components/Pricing';
import { Footer } from '../components/Footer';
import { CinematicBackground } from '../components/CinematicBackground';

function App() {
  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
    });
    return () => lenis.destroy();
  }, []);

  return (
    <div className="bg-black text-white selection:bg-white selection:text-black min-h-screen relative font-sans no-scrollbar">
      <CinematicBackground />
      
      <HeroSection />
      
      <main className="relative z-10 w-full overflow-hidden bg-black">
        <MarqueeBridge />
        <MissionControl />

        <Features />
        <Demo />
        <TechStack />
        <SocialProof />
        <Pricing />
      </main>

      <Footer />
    </div>
  );
}

export default App;
