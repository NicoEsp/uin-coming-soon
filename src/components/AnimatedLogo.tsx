
import React from 'react';

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo = ({ className = "" }: AnimatedLogoProps) => {
  return (
    <div className={`relative ${className}`}>
      <img 
        src="/lovable-uploads/227adb21-ee17-4187-ba33-88184e60e7aa.png"
        alt="UIN Logo" 
        className="w-full h-auto"
      />
    </div>
  );
};

export default AnimatedLogo;
