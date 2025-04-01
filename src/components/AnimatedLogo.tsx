
import { useState, useEffect } from 'react';

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo = ({ className = "" }: AnimatedLogoProps) => {
  const [isLit, setIsLit] = useState(true);
  
  useEffect(() => {
    // Toggle the logo state every 3 seconds
    const interval = setInterval(() => {
      setIsLit(prevState => !prevState);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <div className="transition-opacity duration-1000 ease-in-out absolute inset-0">
        <img 
          src={isLit ? "/lovable-uploads/227adb21-ee17-4187-ba33-88184e60e7aa.png" : "/lovable-uploads/342cd0d0-8503-4c22-94f2-8c85464528b4.png"}
          alt="UIN Logo" 
          className={`w-full h-auto transition-all duration-1000 ${isLit ? 'opacity-100 scale-100' : 'opacity-100 scale-100'}`}
        />
      </div>
    </div>
  );
};

export default AnimatedLogo;
