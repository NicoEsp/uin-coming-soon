
import { memo, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Memoized Background Logo component with loading optimization
const BackgroundLogo = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      {isLoaded && (
        <img 
          src="/lovable-uploads/d53541aa-2de5-4e66-9d1f-5e932f682cb6.png" 
          alt="Background UIN Logo" 
          className="w-full max-w-[150vw] h-auto opacity-10" 
          style={{
            transform: 'translate(25%, 25%) scale(2)'
          }} 
        />
      )}
      <img 
        src="/lovable-uploads/d53541aa-2de5-4e66-9d1f-5e932f682cb6.png" 
        alt=""
        className="hidden"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
});
BackgroundLogo.displayName = 'BackgroundLogo';

// Memoized Game Mockup component with loading optimization
const GameMockup = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      {isLoaded && (
        <img 
          src="/lovable-uploads/c8097de3-74f0-4192-97ea-8d9b2611ef7d.png" 
          alt="Gaming App Mockup" 
          className="w-auto h-[85vh] max-h-[800px]" 
          width="375"
          height="800"
          style={{
            filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))"
          }} 
        />
      )}
      <img 
        src="/lovable-uploads/c8097de3-74f0-4192-97ea-8d9b2611ef7d.png" 
        alt=""
        className="hidden"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
});
GameMockup.displayName = 'GameMockup';

// Memoized Controller Image component with loading optimization
const ControllerImage = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <>
      {isLoaded && (
        <img 
          src="/lovable-uploads/b4133dbc-50d3-4685-a170-fe5fcb20dd2e.png" 
          alt="Controller" 
          className="w-full h-auto drop-shadow-2xl" 
          width="288"
          height="288"
        />
      )}
      <img 
        src="/lovable-uploads/b4133dbc-50d3-4685-a170-fe5fcb20dd2e.png" 
        alt=""
        className="hidden"
        loading="lazy"
        onLoad={() => setIsLoaded(true)}
      />
    </>
  );
});
ControllerImage.displayName = 'ControllerImage';

interface BackgroundElementsProps {
  isLoaded: boolean;
}

// Optimized component with conditional rendering based on device
const BackgroundElements = ({ isLoaded }: BackgroundElementsProps) => {
  const isMobile = useIsMobile();
  
  if (!isLoaded) return null;
  
  return (
    <>
      {/* Background with subtle pattern - optimized for performance */}
      <div className="absolute inset-0 bg-uin-black bg-uin-grid opacity-20"></div>
      
      {/* Purple gradient overlay - simplified for better performance */}
      <div className="absolute inset-0 bg-gradient-to-b from-uin-purple/10 to-transparent"></div>
      
      {/* Background logo - only when loaded and not on lower-end mobile devices */}
      {!isMobile && (
        <div className="absolute opacity-5 pointer-events-none">
          <div className="fixed right-0 bottom-0 w-full h-full flex items-center justify-center">
            <BackgroundLogo />
          </div>
        </div>
      )}
      
      {/* Smartphone mockup image - only on desktop */}
      {!isMobile && (
        <div className="absolute top-[50%] right-0 transform translate-y-[-50%] translate-x-[30%] z-10 opacity-70 pointer-events-none hidden lg:block">
          <GameMockup />
        </div>
      )}
      
      {/* Game controller graphic - simplified for mobile */}
      <div className={`absolute -right-16 -bottom-16 ${isMobile ? 'w-32 sm:w-48' : 'w-48 sm:w-64 md:w-72'} opacity-20 animate-float`}>
        <ControllerImage />
      </div>
    </>
  );
};

export default memo(BackgroundElements);
