
import { lazy, Suspense, useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import MainContent from "@/components/MainContent";
import KonamiCodeInput from "@/components/KonamiCodeInput";
import BackgroundElements from "@/components/BackgroundElements";
import CreditsEasterEgg from "@/components/CreditsEasterEgg";

// Lazy load components that aren't needed immediately
const FallingJoystick = lazy(() => import("@/components/FallingJoystick"));

// Custom hook to manage animations
const useAnimationPosition = (isLoaded: boolean) => {
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isLoaded) return;

    let animationFrameId: number;
    const maxX = window.innerWidth * 0.05;
    const maxY = window.innerHeight * 0.05;
    
    const moveAnimation = (timestamp: number) => {
      setAnimationPosition({
        x: Math.sin(timestamp / 2000) * maxX,
        y: Math.cos(timestamp / 2000) * maxY
      });
      animationFrameId = requestAnimationFrame(moveAnimation);
    };
    
    animationFrameId = requestAnimationFrame(moveAnimation);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isLoaded]);

  return animationPosition;
};

const Index = () => {
  // Page loading state
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCreditsEasterEgg, setShowCreditsEasterEgg] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const { toast } = useToast();

  // Falling joysticks management
  const [fallingJoysticks, setFallingJoysticks] = useState<Array<{
    id: number;
    x: number;
    rotation: number;
  }>>([]);
  const [nextJoystickId, setNextJoystickId] = useState(0);
  
  // Get animated position (now unused but kept for future expansion)
  const animationPosition = useAnimationPosition(isLoaded);

  // Handle background click to create falling joysticks
  const handleBackgroundClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (fallingJoysticks.length >= 3) return; // Reduced for better performance

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
  }, [fallingJoysticks.length, nextJoystickId]);

  // Handle successful Konami code entry
  const handleKonamiSuccess = useCallback(() => {
    setKonamiActive(true);
    setShowCreditsEasterEgg(true);
    
    // Store in localStorage to persist between page reloads if needed
    localStorage.setItem('konami_found', 'true');
    
    // Create a celebratory animation with more joysticks
    const celebrationJoysticks = Array.from({ length: 20 }, (_, i) => ({
      id: nextJoystickId + i,
      x: Math.random() * window.innerWidth,
      rotation: Math.random() * 360
    }));
    
    setFallingJoysticks(prev => [...prev, ...celebrationJoysticks]);
    setNextJoystickId(prev => prev + 20);
    
    // Clean up celebration joysticks after animation
    setTimeout(() => {
      setFallingJoysticks(prev => 
        prev.filter(joystick => !celebrationJoysticks.some(cj => cj.id === joystick.id))
      );
    }, 5000);
  }, [nextJoystickId]);
  
  // Optimize loading sequence - defer non-critical operations
  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.addEventListener('load', () => setIsLoaded(true));
      return () => window.removeEventListener('load', () => setIsLoaded(true));
    }
  }, []);

  // Check if user already found the konami code
  useEffect(() => {
    const foundKonami = localStorage.getItem('konami_found');
    if (foundKonami) {
      setKonamiActive(true);
      // Check if we should show the credits (if it was open when page was refreshed)
      const showCredits = localStorage.getItem('show_credits');
      if (showCredits === 'true') {
        setShowCreditsEasterEgg(true);
      }
    }
  }, []);

  // Handle closing the credits easter egg
  const handleCloseCredits = useCallback(() => {
    setShowCreditsEasterEgg(false);
    localStorage.removeItem('show_credits');
    
    // Track close event
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'konami_credits_closed',
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  // Update localStorage when credits visibility changes
  useEffect(() => {
    if (showCreditsEasterEgg) {
      localStorage.setItem('show_credits', 'true');
    } else {
      localStorage.removeItem('show_credits');
    }
  }, [showCreditsEasterEgg]);

  return (
    <div className="bg-uin-black text-white min-h-screen flex flex-col justify-between relative overflow-hidden" onClick={handleBackgroundClick}>
      {/* Background elements */}
      <BackgroundElements isLoaded={isLoaded} />
      
      {/* Falling joysticks */}
      <Suspense fallback={null}>
        {fallingJoysticks.map(joystick => (
          <FallingJoystick key={joystick.id} x={joystick.x} rotation={joystick.rotation} />
        ))}
      </Suspense>
      
      {/* Main content */}
      <MainContent isLoaded={isLoaded} />
      
      {/* Konami code input */}
      <KonamiCodeInput onKonamiCodeSuccess={handleKonamiSuccess} />
      
      {/* Credits Easter Egg - moved outside of Suspense */}
      <CreditsEasterEgg open={showCreditsEasterEgg} onClose={handleCloseCredits} />
    </div>
  );
};

export default Index;
