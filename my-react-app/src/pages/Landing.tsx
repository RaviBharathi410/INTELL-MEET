import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import Hero from '../components/landing/Hero';
import StatsBar from '../components/landing/StatsBar';
import Features from '../components/landing/Features';
import HorizontalScroll from '../components/landing/HorizontalScroll';
import AIShowcase from '../components/landing/AIShowcase';
import TechMarquee from '../components/landing/TechMarquee';
import CTABanner from '../components/landing/CTABanner';
import FloatingMockup from '../components/FloatingMockup';
import Footer from '../components/layout/Footer';
import LogoReveal from '../components/LogoReveal';

const Landing: React.FC = () => {
  const location = useLocation();
  const [revealComplete, setRevealComplete] = React.useState(sessionStorage.getItem('logoRevealed') === 'true');

  useEffect(() => {
    if (location.hash && revealComplete) {
      const id = location.hash.substring(1);
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 100;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location, revealComplete]);

  return (
    // scroll-container gives GSAP correct offset + position: relative from CSS
    <div className={clsx(
        "scroll-container bg-white transition-opacity duration-1000",
        revealComplete ? "opacity-100" : "opacity-0"
    )}>
      <LogoReveal onComplete={() => setRevealComplete(true)} />
      <Hero />
      <div id="ecosystem"><HorizontalScroll /></div>
      <div id="security"><FloatingMockup /></div>
      <StatsBar />
      <div id="strategic"><Features /></div>
      <AIShowcase />
      <div id="enterprise"><TechMarquee /><CTABanner /></div>
      <Footer />
    </div>
  );
};

export default Landing;
