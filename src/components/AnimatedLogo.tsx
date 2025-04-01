
import React from 'react';

interface AnimatedLogoProps {
  className?: string;
}

const AnimatedLogo = ({ className = "" }: AnimatedLogoProps) => {
  return (
    <div className={`${className}`}>
      {/* Logo has been removed as requested */}
    </div>
  );
};

export default AnimatedLogo;
