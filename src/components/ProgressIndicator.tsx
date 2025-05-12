
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

interface ProgressIndicatorProps {
  isLoaded: boolean;
}

const ProgressIndicator = ({ isLoaded }: ProgressIndicatorProps) => {
  const [progress, setProgress] = useState(0);
  
  // Optimize progress bar animation with requestAnimationFrame instead of setInterval
  useEffect(() => {
    if (!isLoaded) return;
    
    let start: number | null = null;
    let animationFrameId: number;
    
    const animateProgress = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      
      // Update progress every 72.5ms equivalent
      const newProgress = Math.floor((elapsed / 7250) * 100) % 100;
      setProgress(newProgress);
      
      animationFrameId = requestAnimationFrame(animateProgress);
    };
    
    animationFrameId = requestAnimationFrame(animateProgress);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded]);
  
  return (
    <div className="my-6 sm:my-8 glow-effect">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 animate-pulse">
        <span className="gradient-text">Coming Soon</span>
      </h2>
      
      <div className="relative mt-4 mb-6 w-48 sm:w-64 md:w-80 mx-auto">
        <Progress value={progress} className="h-2" />
      </div>
    </div>
  );
};

export default ProgressIndicator;
