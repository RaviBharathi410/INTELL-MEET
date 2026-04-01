import React from 'react';
import Hero from '../components/landing/Hero';
import StatsBar from '../components/landing/StatsBar';
import Features from '../components/landing/Features';
import HorizontalScroll from '../components/landing/HorizontalScroll';
import AIShowcase from '../components/landing/AIShowcase';
import TechMarquee from '../components/landing/TechMarquee';
import CTABanner from '../components/landing/CTABanner';
import FloatingMockup from '../components/FloatingMockup';
import Footer from '../components/layout/Footer';

const Landing: React.FC = () => {
  return (
    // scroll-container gives GSAP correct offset + position: relative from CSS
    <div className="scroll-container bg-white">
      <Hero />
      <HorizontalScroll />
      <FloatingMockup />
      <StatsBar />
      <Features />
      <AIShowcase />
      <TechMarquee />
      <CTABanner />
      <Footer />
    </div>
  );
};

export default Landing;
