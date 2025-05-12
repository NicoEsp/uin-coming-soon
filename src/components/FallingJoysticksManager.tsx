
import { Suspense, lazy, useState, useCallback } from "react";

// Lazy load the FallingJoystick component
const FallingJoystick = lazy(() => import("@/components/FallingJoystick"));

interface FallingJoysticksManagerProps {
  konamiActive: boolean;
}

const FallingJoysticksManager = ({ konamiActive }: FallingJoysticksManagerProps) => {
  const [fallingJoysticks, setFallingJoysticks] = useState<Array<{
    id: number;
    x: number;
    rotation: number;
  }>>([]);
  const [nextJoystickId, setNextJoystickId] = useState(0);
  
  const handleBackgroundClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (fallingJoysticks.length >= 3) return; // Reduced for better performance

    const newJoystick = {
      id: nextJoystickId,
      x: e.clientX || Math.random() * window.innerWidth,
      rotation: Math.random() * 360
    };
    setFallingJoysticks(prev => [...prev, newJoystick]);
    setNextJoystickId(prev => prev + 1);

    setTimeout(() => {
      setFallingJoysticks(prev => prev.filter(joystick => joystick.id !== newJoystick.id));
    }, 3000);
  }, [fallingJoysticks.length, nextJoystickId]);

  // Method to create celebration joysticks (called from outside)
  const createCelebrationJoysticks = useCallback(() => {
    // Create a celebratory animation with more joysticks
    const celebrationJoysticks = Array.from({ length: 20 }, (_, i) => ({
      id: nextJoystickId + i,
      x: Math.random() * window.innerWidth,
      rotation: Math.random() * 360
    }));
    
    setFallingJoysticks(prev => [...prev, ...celebrationJoysticks]);
    setNextJoystickId(prev => prev + 20);
    
    // Clean up celebration joysticks after animation
    setTimeout(() => {
      setFallingJoysticks(prev => 
        prev.filter(joystick => !celebrationJoysticks.some(cj => cj.id === joystick.id))
      );
    }, 5000);
  }, [nextJoystickId]);

  return {
    handleBackgroundClick,
    createCelebrationJoysticks,
    renderJoysticks: () => (
      <Suspense fallback={null}>
        {fallingJoysticks.map(joystick => (
          <FallingJoystick key={joystick.id} x={joystick.x} rotation={joystick.rotation} />
        ))}
      </Suspense>
    )
  };
};

export default FallingJoysticksManager;
