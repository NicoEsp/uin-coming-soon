
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
  const [animationPosition, setAnimationPosition] = useState({ x: 0, y: 0 });
  
  // Animation effect for the background element
  useEffect(() => {
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
  }, []);
  
  return (
    <div className="bg-uin-black text-white min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-uin-black bg-uin-grid opacity-20"></div>
      
      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-uin-purple/10 to-transparent"></div>
      
      {/* Animated background elements */}
      <div 
        className="absolute opacity-10 animate-float" 
        style={{ 
          transform: `translate(${animationPosition.x}px, ${animationPosition.y}px)`,
          top: '10%',
          left: '10%',
        }}
      >
        <img 
          src="/lovable-uploads/eae58b10-e8bc-4a1a-9297-f650a719c7d8.png" 
          alt="Gaming Element" 
          className="w-64 h-64 object-contain"
        />
      </div>
      
      <div 
        className="absolute opacity-10 animate-float" 
        style={{ 
          transform: `translate(${-animationPosition.x}px, ${-animationPosition.y}px)`,
          bottom: '15%',
          left: '60%',
        }}
      >
        <img 
          src="/lovable-uploads/7612a97b-ff25-46a8-9525-b2277af6b9b4.png" 
          alt="Gaming Element" 
          className="w-64 h-64 object-contain"
        />
      </div>
      
      <div className="container mx-auto px-4 py-8 sm:py-16 relative z-10 max-w-4xl text-center">
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-tight">
            <span className="gradient-text">Level Up</span> Your 
            <br className="hidden xs:block" />Financial Apps with
            <br className="hidden xs:block" /><span className="gradient-text">Gaming</span> Power
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8 text-gray-300 max-w-2xl mx-auto px-4">
            UIN serves as a gateway to gamers, providing tools designed to attract, retain, and engage the Gen-Z community with powerful gaming solutions.
          </p>
        </div>
        
        <div className="my-8 sm:my-16 glow-effect">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 animate-pulse">
            <span className="gradient-text">Coming Soon</span>
          </h2>
          <div className="relative my-6">
            <div className="h-1 bg-gradient-to-r from-uin-purple to-uin-magenta rounded-full w-48 mx-auto">
              <div className="h-1 bg-white rounded-full animate-pulse" style={{width: '30%'}}></div>
            </div>
          </div>
        </div>
        
        {/* Centered button container */}
        <div className="mt-8 sm:mt-16 flex justify-center">
          <Button 
            variant="outline" 
            className="border-uin-purple text-white hover:bg-uin-purple/20 flex items-center gap-2"
            onClick={() => window.location.href = "mailto:sales@uin.tech"}
          >
            <Mail size={18} />
            <span>sales@uin.tech</span>
          </Button>
        </div>
      </div>
      
      {/* Game controller graphic */}
      <div className="absolute -right-16 -bottom-16 w-48 sm:w-64 md:w-72 opacity-20 animate-float">
        <img 
          src="/lovable-uploads/b4133dbc-50d3-4685-a170-fe5fcb20dd2e.png" 
          alt="Controller" 
          className="w-full h-auto drop-shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Index;
