
import { lazy, Suspense, useState, useEffect, useCallback, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import MainContent from "@/components/MainContent";
import KonamiCodeInput from "@/components/KonamiCodeInput";
import BackgroundElements from "@/components/BackgroundElements";
import CreditsEasterEgg from "@/components/CreditsEasterEgg";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load components that aren't needed immediately
const FallingJoystick = lazy(() => import("@/components/FallingJoystick"));

const Index = () => {
  // Page loading state
  const [isLoaded, setIsLoaded] = useState(false);
  const [showCreditsEasterEgg, setShowCreditsEasterEgg] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  // Falling joysticks management - optimized with useMemo
  const [fallingJoysticks, setFallingJoysticks] = useState<Array<{
    id: number;
    x: number;
    rotation: number;
  }>>([]);
  const [nextJoystickId, setNextJoystickId] = useState(0);
  
  // Optimization: Limit joystick count based on device
  const maxJoysticks = useMemo(() => isMobile ? 2 : 5, [isMobile]);
  
  // Handle background click to create falling joysticks - memoized with useCallback
  const handleBackgroundClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (fallingJoysticks.length >= maxJoysticks) return;

    const newJoystick = {
      id: nextJoystickId,
      x: e.clientX || Math.random() * window.innerWidth,
      rotation: Math.random() * 360
    };
    
    setFallingJoysticks(prev => [...prev, newJoystick]);
    setNextJoystickId(prev => prev + 1);

    // Clean up joystick after animation
    const removalTime = isMobile ? 2000 : 3000; // Shorter animation on mobile
    setTimeout(() => {
      setFallingJoysticks(prev => prev.filter(joystick => joystick.id !== newJoystick.id));
    }, removalTime);
  }, [fallingJoysticks.length, nextJoystickId, maxJoysticks, isMobile]);

  // Handle successful Konami code entry - memoized
  const handleKonamiSuccess = useCallback(() => {
    setKonamiActive(true);
    setShowCreditsEasterEgg(true);
    
    // Store in localStorage to persist between page reloads
    localStorage.setItem('konami_found', 'true');
    
    // Create a celebratory animation with joysticks - reduced count for mobile
    const celebrationCount = isMobile ? 8 : 15;
    const celebrationJoysticks = Array.from({ length: celebrationCount }, (_, i) => ({
      id: nextJoystickId + i,
      x: Math.random() * window.innerWidth,
      rotation: Math.random() * 360
    }));
    
    setFallingJoysticks(prev => [...prev, ...celebrationJoysticks]);
    setNextJoystickId(prev => prev + celebrationCount);
    
    // Clean up celebration joysticks after animation - shorter time for mobile
    const removalTime = isMobile ? 4000 : 5000;
    setTimeout(() => {
      setFallingJoysticks(prev => 
        prev.filter(joystick => !celebrationJoysticks.some(cj => cj.id === joystick.id))
      );
    }, removalTime);
  }, [nextJoystickId, isMobile]);
  
  // Optimize loading sequence - defer non-critical operations
  useEffect(() => {
    // Use requestIdleCallback for non-critical initialization
    const handleLoad = () => {
      // Use requestAnimationFrame to avoid blocking the main thread
      requestAnimationFrame(() => {
        setIsLoaded(true);
      });
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  // Check if user already found the konami code - optimized localStorage reading
  useEffect(() => {
    // Only run once on component mount
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

  // Handle closing the credits easter egg - memoized
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

  // Update localStorage when credits visibility changes - optimized with dependencies
  useEffect(() => {
    if (showCreditsEasterEgg) {
      localStorage.setItem('show_credits', 'true');
    } else if (konamiActive) { // Only remove if konami was activated
      localStorage.removeItem('show_credits');
    }
  }, [showCreditsEasterEgg, konamiActive]);

  return (
    <div className="bg-uin-black text-white min-h-screen flex flex-col justify-between relative overflow-hidden" onClick={handleBackgroundClick}>
      {/* Background elements - only render when needed */}
      {isLoaded && <BackgroundElements isLoaded={isLoaded} />}
      
      {/* Falling joysticks - optimized with Suspense and conditional rendering */}
      {fallingJoysticks.length > 0 && (
        <Suspense fallback={null}>
          {fallingJoysticks.map(joystick => (
            <FallingJoystick key={joystick.id} x={joystick.x} rotation={joystick.rotation} />
          ))}
        </Suspense>
      )}
      
      {/* Main content */}
      <MainContent isLoaded={isLoaded} />
      
      {/* Konami code input - always included for accessibility */}
      <KonamiCodeInput onKonamiCodeSuccess={handleKonamiSuccess} />
      
      {/* Credits Easter Egg - only render when needed */}
      {showCreditsEasterEgg && (
        <CreditsEasterEgg open={showCreditsEasterEgg} onClose={handleCloseCredits} />
      )}
    </div>
  );
};

export default Index;
