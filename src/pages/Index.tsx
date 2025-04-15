
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Mail, Joystick } from "lucide-react";
import { useEffect, useState, lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

// Lazy load components that aren't needed immediately
const FallingJoystick = lazy(() => import("@/components/FallingJoystick"));
const AnimatedLogo = lazy(() => import("@/components/AnimatedLogo"));

const Index = () => {
  // Animation state is kept for the controller at the bottom
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

  // Set loaded state after initial render
  useEffect(() => {
    // Small delay to ensure main content is loaded first
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Progress bar animation - reduced speed by 45% (from 50ms to 72.5ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(oldProgress => {
        if (oldProgress >= 100) {
          return 0;
        }
        return oldProgress + 1;
      });
    }, 72.5); // Changed from 50ms to 72.5ms (45% slower)

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Animation effect for the controller element - only run when visible
  useEffect(() => {
    if (!isLoaded) return;

    const moveAnimation = () => {
      const maxX = window.innerWidth * 0.05;
      const maxY = window.innerHeight * 0.05;
      const interval = setInterval(() => {
        setAnimationPosition({
          x: Math.sin(Date.now() / 2000) * maxX,
          y: Math.cos(Date.now() / 2000) * maxY
        });
      }, 50);
      return () => clearInterval(interval);
    };
    const cleanup = moveAnimation();
    return cleanup;
  }, [isLoaded]);

  // Handle background click to add falling joysticks - limit number to reduce CPU usage
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (fallingJoysticks.length >= 5) return; // Limit maximum number of joysticks

    // Create a new joystick at random X position
    const newJoystick = {
      id: nextJoystickId,
      x: e.clientX || Math.random() * window.innerWidth,
      rotation: Math.random() * 360
    };
    setFallingJoysticks(prev => [...prev, newJoystick]);
    setNextJoystickId(prev => prev + 1);

    // Remove joystick after animation completes
    setTimeout(() => {
      setFallingJoysticks(prev => prev.filter(joystick => joystick.id !== newJoystick.id));
    }, 3000);
  };

  return (
    <div className="bg-uin-black text-white min-h-screen flex flex-col justify-between relative overflow-hidden" onClick={handleBackgroundClick}>
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-uin-black bg-uin-grid opacity-20"></div>
      
      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-uin-purple/10 to-transparent"></div>
      
      {/* Background logo - only render when main content is loaded */}
      {isLoaded && (
        <div className="absolute opacity-5 pointer-events-none">
          <div className="fixed right-0 bottom-0 w-full h-full flex items-center justify-center">
            <img 
              src="/lovable-uploads/d53541aa-2de5-4e66-9d1f-5e932f682cb6.png" 
              alt="Background UIN Logo" 
              className="w-full max-w-[150vw] h-auto opacity-10" 
              loading="lazy"
              style={{
                transform: 'translate(25%, 25%) scale(2)'
              }} 
            />
          </div>
        </div>
      )}
      
      {/* Smartphone mockup image - only load on larger screens */}
      {isLoaded && (
        <div className="absolute top-[50%] right-0 transform translate-y-[-50%] translate-x-[30%] z-10 opacity-70 pointer-events-none hidden lg:block">
          <img 
            src="/lovable-uploads/c8097de3-74f0-4192-97ea-8d9b2611ef7d.png" 
            alt="Gaming App Mockup" 
            className="w-auto h-[85vh] max-h-[800px]" 
            loading="lazy"
            style={{
              filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))"
            }} 
          />
        </div>
      )}
      
      {/* Falling joysticks - only render when needed */}
      <Suspense fallback={null}>
        {fallingJoysticks.map(joystick => (
          <FallingJoystick key={joystick.id} x={joystick.x} rotation={joystick.rotation} />
        ))}
      </Suspense>
      
      {/* Main content */}
      <div className="container mx-auto px-4 py-8 sm:py-16 relative z-20 max-w-4xl text-center flex-grow flex flex-col justify-center">
        {/* Logo above title */}
        <div className="mb-8 flex justify-center">
          <img 
            src="/lovable-uploads/47f345e2-aea8-4e20-b3ec-af9eacae0232.png" 
            alt="UIN Logo" 
            className="w-48 sm:w-64 md:w-72 h-auto mb-6 logo-pulse animate-pulse-glow" 
          />
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
        
        {/* Updated Contact Us text */}
        <div className="mt-4 mb-2">
          <h3 className="text-xl sm:text-2xl font-bold">
            <span className="gradient-text">Want to know more?
Get in touch</span>
          </h3>
        </div>
        
        {/* Email button */}
        <div className="flex justify-center">
          <Button variant="outline" className="border-uin-purple text-white hover:bg-uin-purple/20 flex items-center gap-2" onClick={() => window.location.href = "mailto:sales@uin.tech"}>
            <Mail size={18} />
            <span>sales@uin.tech</span>
          </Button>
        </div>
      </div>
      
      {/* Game controller graphic - only render when all content is loaded */}
      {isLoaded && (
        <div className="absolute -right-16 -bottom-16 w-48 sm:w-64 md:w-72 opacity-20 animate-float">
          <img 
            src="/lovable-uploads/b4133dbc-50d3-4685-a170-fe5fcb20dd2e.png" 
            alt="Controller" 
            className="w-full h-auto drop-shadow-2xl" 
            loading="lazy"
          />
        </div>
      )}
    </div>
  );
};

export default Index;
