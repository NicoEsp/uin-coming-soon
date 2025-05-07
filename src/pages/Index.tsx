import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Mail, Joystick, AlertTriangle } from "lucide-react";
import { useEffect, useState, lazy, Suspense, memo, useCallback } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { obfuscateEmail } from "@/utils/security";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

// Lazy load components that aren't needed immediately
const FallingJoystick = lazy(() => import("@/components/FallingJoystick"));
const KonamiModal = lazy(() => import("@/components/KonamiModal"));

// Memoize static components to prevent unnecessary re-renders
const MainLogo = memo(() => (
  <img 
    src="/lovable-uploads/47f345e2-aea8-4e20-b3ec-af9eacae0232.png" 
    alt="UIN Logo" 
    className="w-48 sm:w-64 md:w-72 h-auto mb-6 logo-pulse"
    width="288" 
    height="288"
    loading="eager"
    fetchPriority="high"
  />
));

// Background image preload component
const BackgroundImage = memo(() => (
  <img 
    src="/lovable-uploads/d53541aa-2de5-4e66-9d1f-5e932f682cb6.png" 
    alt="Background UIN Logo" 
    className="w-full max-w-[150vw] h-auto opacity-10" 
    loading="lazy"
    style={{
      transform: 'translate(25%, 25%) scale(2)'
    }} 
  />
));

// Memoized controller image to prevent re-renders
const ControllerImage = memo(() => (
  <img 
    src="/lovable-uploads/b4133dbc-50d3-4685-a170-fe5fcb20dd2e.png" 
    alt="Controller" 
    className="w-full h-auto drop-shadow-2xl" 
    loading="lazy"
    width="288"
    height="288"
  />
));

// Optimized main content to reduce re-renders
const GameMockup = memo(() => (
  <img 
    src="/lovable-uploads/c8097de3-74f0-4192-97ea-8d9b2611ef7d.png" 
    alt="Gaming App Mockup" 
    className="w-auto h-[85vh] max-h-[800px]" 
    loading="lazy"
    width="375"
    height="800"
    style={{
      filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))"
    }} 
  />
));

const Index = () => {
  // Konami code related state and constants
  const KONAMI_CODE = "↑↑↓↓←→←→BA";
  const [codeInput, setCodeInput] = useState("");
  const [showKonamiModal, setShowKonamiModal] = useState(false);
  const [konamiActive, setKonamiActive] = useState(false);
  const { toast } = useToast();

  // Reduce animation complexity to improve performance
  const [animationPosition, setAnimationPosition] = useState({
    x: 0,
    y: 0
  });
  const [fallingJoysticks, setFallingJoysticks] = useState<Array<{
    id: number;
    x: number;
    rotation: number;
  }>>([]);
  const [nextJoystickId, setNextJoystickId] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

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
    }
  }, []);

  // Optimize progress bar animation with requestAnimationFrame instead of setInterval
  useEffect(() => {
    if (!isLoaded) return;
    
    let start: number | null = null;
    let animationFrameId: number;
    
    const animateProgress = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      
      // Update progress every 72.5ms equivalent
      const newProgress = Math.floor((elapsed / 7250) * 100) % 100;
      setProgress(newProgress);
      
      animationFrameId = requestAnimationFrame(animateProgress);
    };
    
    animationFrameId = requestAnimationFrame(animateProgress);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded]);

  // Optimize controller animation - only run when visible and throttle updates
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

  // Handle Konami code input validation
  const validateKonamiCode = useCallback((input: string) => {
    if (input === KONAMI_CODE) {
      // Store konami found in localStorage
      localStorage.setItem('konami_found', 'true');
      setKonamiActive(true);
      setShowKonamiModal(true);
      
      // Track successful konami code entry
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'konami_code_success',
          timestamp: new Date().toISOString(),
        });
      }
      
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
      
      return true;
    }
    return false;
  }, [KONAMI_CODE, nextJoystickId]);

  // Handle Konami code input change
  const handleKonamiInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setCodeInput(input);
    
    // Track attempt
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'konami_code_attempt',
        input: input,
        timestamp: new Date().toISOString(),
      });
    }
  }, []);

  // Handle Konami code input submission
  const handleKonamiSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateKonamiCode(codeInput);
    
    if (!isValid) {
      // Show error toast and track error
      toast({
        title: "Invalid Code",
        description: "That's not the secret code. Try again!",
        variant: "destructive",
      });
      
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'konami_code_error',
          input: codeInput,
          timestamp: new Date().toISOString(),
        });
      }
      
      // Clear input after error
      setCodeInput("");
    }
  }, [codeInput, validateKonamiCode, toast]);

  // Limit joystick animations to reduce CPU usage
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (fallingJoysticks.length >= 3) return; // Reduced from 5 to 3 for better performance

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

  // Secure email click handler with minimal overhead
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "mailto:" + "sales@uin.tech";
  };

  return (
    <div className="bg-uin-black text-white min-h-screen flex flex-col justify-between relative overflow-hidden" onClick={handleBackgroundClick}>
      {/* Background with subtle pattern - optimized to reduce rendering cost */}
      <div className="absolute inset-0 bg-uin-black bg-uin-grid opacity-20"></div>
      
      {/* Purple gradient overlay - simplified */}
      <div className="absolute inset-0 bg-gradient-to-b from-uin-purple/10 to-transparent"></div>
      
      {/* Background logo - only render when main content is loaded and using memoized component */}
      {isLoaded && (
        <div className="absolute opacity-5 pointer-events-none">
          <div className="fixed right-0 bottom-0 w-full h-full flex items-center justify-center">
            <BackgroundImage />
          </div>
        </div>
      )}
      
      {/* Smartphone mockup image - only load on larger screens and when main content is loaded */}
      {isLoaded && (
        <div className="absolute top-[50%] right-0 transform translate-y-[-50%] translate-x-[30%] z-10 opacity-70 pointer-events-none hidden lg:block">
          <GameMockup />
        </div>
      )}
      
      {/* Falling joysticks - reduced and optimized */}
      <Suspense fallback={null}>
        {fallingJoysticks.map(joystick => (
          <FallingJoystick key={joystick.id} x={joystick.x} rotation={joystick.rotation} />
        ))}
      </Suspense>
      
      {/* Main content - optimized with memoized components */}
      <div className="container mx-auto px-4 py-8 sm:py-16 relative z-20 max-w-4xl text-center flex-grow flex flex-col justify-center">
        {/* Logo above title - memoized to prevent re-renders */}
        <div className="mb-8 flex justify-center">
          <MainLogo />
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
            <span className="gradient-text">Level Up</span> Your{" "}
            <br className="hidden xs:block" />Apps{" "}
            <br className="hidden xs:block" />with{" "}
            <br className="hidden xs:block" /><span className="gradient-text">Gaming</span> Power
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto px-4">
            UIN serves as a gateway to gamers, providing tools designed to attract, retain, and engage the Gen-Z community with powerful gaming solutions.
          </p>
        </div>
        
        <div className="my-6 sm:my-8 glow-effect">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 animate-pulse">
            <span className="gradient-text">Coming Soon</span>
          </h2>
          
          <div className="relative mt-4 mb-6 w-48 sm:w-64 md:w-80 mx-auto">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
        
        {/* Contact Us text */}
        <div className="mt-4 mb-2">
          <h3 className="text-xl sm:text-2xl font-bold">
            <span className="gradient-text">Want to know more?
Get in touch</span>
          </h3>
        </div>
        
        {/* Email button with enhanced security */}
        <div className="flex justify-center">
          <Button 
            variant="outline" 
            className="border-uin-purple text-white hover:bg-uin-purple/20 flex items-center gap-2" 
            onClick={handleEmailClick}
            data-email-protection={obfuscateEmail("sales@uin.tech")}
          >
            <Mail size={18} />
            <span>Contact Us</span>
          </Button>
        </div>
        
        {/* Secret Konami code input */}
        <div className="mt-6 flex justify-center">
          <form onSubmit={handleKonamiSubmit} className="relative w-48 sm:w-64 transition-opacity duration-300 opacity-60 hover:opacity-100 focus-within:opacity-100">
            <Input
              type="text"
              placeholder="Enter secret code..."
              value={codeInput}
              onChange={handleKonamiInputChange}
              className="bg-uin-black/60 border-uin-purple/30 text-sm text-white placeholder-gray-500 focus:border-uin-purple/50"
              aria-label="Secret code input"
            />
            {konamiActive && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-uin-purple">
                <Joystick size={16} className="animate-pulse" />
              </div>
            )}
          </form>
        </div>
        
        {/* Konami Modal */}
        <Suspense fallback={null}>
          <KonamiModal open={showKonamiModal} onOpenChange={setShowKonamiModal} />
        </Suspense>
      </div>
      
      {/* Game controller graphic - only render when loaded and using memoized component */}
      {isLoaded && (
        <div className="absolute -right-16 -bottom-16 w-48 sm:w-64 md:w-72 opacity-20 animate-float">
          <ControllerImage />
        </div>
      )}
    </div>
  );
};

export default Index;
