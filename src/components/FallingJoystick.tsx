
import React, { memo } from 'react';
import { Joystick } from 'lucide-react';

interface FallingJoystickProps {
  x: number;
  rotation: number;
}

// Memoize the component to prevent unnecessary re-renders
const FallingJoystick: React.FC<FallingJoystickProps> = memo(({ x, rotation }) => {
  return (
    <div 
      className="absolute top-0 z-20 text-uin-purple/70 animate-fall"
      style={{ 
        left: `${x}px`, 
        '--rotation': `${rotation}deg` as any,
        willChange: 'transform'
      }}
    >
      <Joystick size={32} />
    </div>
  );
});

FallingJoystick.displayName = 'FallingJoystick';

export default FallingJoystick;
