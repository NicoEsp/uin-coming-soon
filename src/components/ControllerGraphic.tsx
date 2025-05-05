
import React, { memo } from "react";

// Memoized controller image to prevent re-renders
const ControllerImage = memo(() => (
  <img 
    src="/lovable-uploads/b4133dbc-50d3-4685-a170-fe5fcb20dd2e.png" 
    alt="Controller" 
    className="w-full max-w-xs h-auto drop-shadow-xl" 
    loading="lazy"
    width="288"
    height="288"
  />
));

interface ControllerGraphicProps {
  isLoaded: boolean;
}

const ControllerGraphic: React.FC<ControllerGraphicProps> = ({ isLoaded }) => {
  if (!isLoaded) return null;
  
  return (
    <div className="absolute -right-16 -bottom-16 w-36 sm:w-48 md:w-56 opacity-20 animate-float">
      <ControllerImage />
    </div>
  );
};

export default ControllerGraphic;
