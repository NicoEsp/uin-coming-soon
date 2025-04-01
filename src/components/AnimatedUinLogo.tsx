
import React, { useEffect, useState } from 'react';

interface AnimatedUinLogoProps {
  className?: string;
  onAnimationComplete?: () => void;
}

const AnimatedUinLogo: React.FC<AnimatedUinLogoProps> = ({ 
  className = "",
  onAnimationComplete
}) => {
  const [animationState, setAnimationState] = useState({
    uComplete: false,
    iComplete: false,
    nComplete: false
  });
  
  // Check if all letters have completed their animation
  useEffect(() => {
    if (animationState.uComplete && animationState.iComplete && animationState.nComplete) {
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }
  }, [animationState, onAnimationComplete]);

  return (
    <div className={`relative w-48 sm:w-64 md:w-72 h-auto ${className}`}>
      {/* Base image with full logo (initially hidden) */}
      <img 
        src="/lovable-uploads/47f345e2-aea8-4e20-b3ec-af9eacae0232.png"
        alt="UIN Logo"
        className="w-full h-auto opacity-0 transition-opacity duration-500"
        style={{
          opacity: animationState.uComplete && animationState.iComplete && animationState.nComplete ? 1 : 0
        }}
      />
      
      {/* Individual letters */}
      <div className="absolute inset-0 w-full h-full">
        {/* U letter */}
        <div 
          className="absolute transition-all duration-1000 ease-out"
          style={{
            width: '33%',
            left: animationState.uComplete ? '0%' : '-100%',
            top: '0',
            opacity: animationState.uComplete ? 0 : 1,
            transform: `rotate(${animationState.uComplete ? 0 : -45}deg)`
          }}
          onTransitionEnd={() => setAnimationState(prev => ({ ...prev, uComplete: true }))}
        >
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-uin-purple">U</div>
        </div>
        
        {/* I letter */}
        <div 
          className="absolute transition-all duration-1000 ease-out delay-200"
          style={{
            width: '33%',
            left: animationState.iComplete ? '33%' : '100%',
            top: animationState.iComplete ? '0' : '-100%',
            opacity: animationState.iComplete ? 0 : 1,
            transform: `rotate(${animationState.iComplete ? 0 : 45}deg)`
          }}
          onTransitionEnd={() => setAnimationState(prev => ({ ...prev, iComplete: true }))}
        >
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-uin-purple">I</div>
        </div>
        
        {/* N letter */}
        <div 
          className="absolute transition-all duration-1000 ease-out delay-400"
          style={{
            width: '33%',
            right: animationState.nComplete ? '0%' : '-100%',
            bottom: animationState.nComplete ? '0' : '100%',
            opacity: animationState.nComplete ? 0 : 1,
            transform: `rotate(${animationState.nComplete ? 0 : 90}deg)`
          }}
          onTransitionEnd={() => setAnimationState(prev => ({ ...prev, nComplete: true }))}
        >
          <div className="text-5xl sm:text-6xl md:text-7xl font-bold text-uin-purple">N</div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedUinLogo;
