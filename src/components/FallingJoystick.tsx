
import React from 'react';
import { Joystick } from 'lucide-react';

interface FallingJoystickProps {
  x: number;
  rotation: number;
}

const FallingJoystick: React.FC<FallingJoystickProps> = ({ x, rotation }) => {
  return (
    <div 
      className="absolute top-0 z-20 text-uin-purple/70 animate-fall"
      style={{ 
        left: `${x}px`, 
        transform: `rotate(${rotation}deg)`,
        animation: 'fall 3s linear forwards'
      }}
    >
      <Joystick size={32} />
    </div>
  );
};

export default FallingJoystick;
