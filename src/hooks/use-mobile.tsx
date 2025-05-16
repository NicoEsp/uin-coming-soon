
import { useState, useEffect, useCallback } from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    // Default to undefined during SSR
    if (typeof window === 'undefined') return undefined;
    // Initial detection based on window width
    return window.innerWidth < MOBILE_BREAKPOINT;
  });

  // Memoized handler to prevent recreation on each render
  const handleResize = useCallback(() => {
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    // Modern approach using matchMedia for better performance
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Set initial state
    setIsMobile(mql.matches);
    
    // Use modern event listener pattern
    const handleChange = () => setIsMobile(mql.matches);
    mql.addEventListener("change", handleChange);
    
    // Clean up listener
    return () => mql.removeEventListener("change", handleChange);
  }, []);

  return isMobile;
}
