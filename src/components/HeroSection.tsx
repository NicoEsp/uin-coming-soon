
import React, { useState, useEffect, lazy, Suspense, memo } from "react";
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";

// Lazy load components that aren't needed immediately
const FallingJoystick = lazy(() => import("@/components/FallingJoystick"));

// Memoize static components to prevent unnecessary re-renders
const MainLogo = memo(() => (
  <img 
    src="/lovable-uploads/47f345e2-aea8-4e20-b3ec-af9eacae0232.png" 
    alt="UIN Logo" 
    className="w-36 sm:w-44 md:w-48 h-auto mb-8 animate-pulse-glow"
    width="192" 
    height="192"
    loading="eager"
    fetchPriority="high"
  />
));

// Background image component
const BackgroundPattern = memo(() => (
  <div className="absolute inset-0 z-0 opacity-5 overflow-hidden">
    <div className="absolute inset-0 bg-[url('/lovable-uploads/f927405f-2320-42d4-a8f4-e0f0cdcf7f70.png')] bg-repeat opacity-10"></div>
  </div>
));

const HeroSection = () => {
  // Animation state
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fallingJoysticks, setFallingJoysticks] = useState<Array<{
    id: number;
    x: number;
    rotation: number;
  }>>([]);
  const [nextJoystickId, setNextJoystickId] = useState(0);

  // Optimize loading sequence
  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.addEventListener('load', () => setIsLoaded(true));
      return () => window.removeEventListener('load', () => setIsLoaded(true));
    }
  }, []);

  // Progress animation
  useEffect(() => {
    if (!isLoaded) return;
    
    let start: number | null = null;
    let animationFrameId: number;
    
    const animateProgress = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      
      const newProgress = Math.floor((elapsed / 7250) * 100) % 100;
      setProgress(newProgress);
      
      animationFrameId = requestAnimationFrame(animateProgress);
    };
    
    animationFrameId = requestAnimationFrame(animateProgress);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded]);

  // Joystick falling animation
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (fallingJoysticks.length >= 3) return;

    const newJoystick = {
      id: nextJoystickId,
      x: e.clientX || Math.random() * window.innerWidth,
      rotation: Math.random() * 360
    };
    setFallingJoysticks(prev => [...prev, newJoystick]);
    setNextJoystickId(prev => prev + 1);

    setTimeout(() => {
      setFallingJoysticks(prev => prev.filter(joystick => joystick.id !== newJoystick.id));
    }, 3000);
  };

  // Email click handler
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "mailto:" + "sales@uin.tech";
  };

  return (
    <section className="pt-32 pb-24 md:pt-40 md:pb-32 relative" onClick={handleBackgroundClick}>
      <BackgroundPattern />
      
      {/* Falling joysticks */}
      <Suspense fallback={null}>
        {fallingJoysticks.map(joystick => (
          <FallingJoystick key={joystick.id} x={joystick.x} rotation={joystick.rotation} />
        ))}
      </Suspense>
      
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <MainLogo />
          
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 leading-tight">
            Level Up Your <span className="gradient-text">Gaming</span> Experience
          </h1>
          
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
            UIN serves as a gateway to gamers, providing tools designed to attract, 
            retain, and engage the Gen-Z community with powerful gaming solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Button size="lg" className="group">
              Get Started <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button size="lg" variant="outline" onClick={handleEmailClick}>
              <Mail size={18} className="mr-1" />
              Contact Us
            </Button>
          </div>
          
          <div className="mt-16 relative">
            <div className="text-center">
              <div className="inline-block mx-auto">
                <h2 className="text-xl sm:text-2xl font-heading font-medium mb-3">
                  <span className="gradient-text">Coming Soon</span>
                </h2>
                
                <div className="w-48 sm:w-64 md:w-80 h-1 bg-muted/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-300" 
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
