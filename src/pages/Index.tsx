
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import StatsSection from "@/components/StatsSection";
import ContactSection from "@/components/ContactSection";
import ControllerGraphic from "@/components/ControllerGraphic";

const Index = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Optimize loading sequence
  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.addEventListener('load', () => setIsLoaded(true));
      return () => window.removeEventListener('load', () => setIsLoaded(true));
    }
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="bg-background text-foreground min-h-screen relative">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
        <ContactSection />
        <ControllerGraphic isLoaded={isLoaded} />
      </div>
      
      <Footer />
    </>
  );
};

export default Index;
