
import { useCallback, useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface KonamiCodeInputProps {
  onKonamiCodeSuccess: () => void;
}

const KonamiCodeInput = ({ onKonamiCodeSuccess }: KonamiCodeInputProps) => {
  const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
  const KONAMI_CODE_DISPLAY = "↑↑↓↓←→←→BA";
  const [codeInput, setCodeInput] = useState("");
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Handle Konami code input validation
  const validateKonamiCode = useCallback((input: string) => {
    if (input === KONAMI_CODE_DISPLAY) {
      // Store konami found in localStorage
      localStorage.setItem('konami_found', 'true');
      onKonamiCodeSuccess();
      
      // Track successful konami code entry
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'konami_code_success',
          timestamp: new Date().toISOString(),
        });
      }
      
      // Reset the key sequence
      setKeySequence([]);
      
      return true;
    }
    
    // If entered full sequence but incorrect
    if (input.length === KONAMI_CODE_DISPLAY.length && input !== KONAMI_CODE_DISPLAY) {
      // Show error toast
      toast({
        title: "Invalid Code",
        description: "That's not the secret code. Try again!",
        variant: "destructive",
      });
      
      // Track error
      if (typeof window !== 'undefined' && window.dataLayer) {
        window.dataLayer.push({
          event: 'konami_code_error',
          input: input,
          timestamp: new Date().toISOString(),
        });
      }
      
      // Clear input after error
      setCodeInput("");
      setKeySequence([]);
    }
    
    return false;
  }, [KONAMI_CODE_DISPLAY, onKonamiCodeSuccess, toast]);

  // Add keyboard event listener for Konami code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Focus the input when any key is pressed
      if (inputRef.current && document.activeElement !== inputRef.current) {
        inputRef.current.focus();
      }
      
      // Handle backspace and delete keys
      if (e.key === "Backspace" || e.key === "Delete") {
        // Track deletion event
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'konami_key_delete',
            timestamp: new Date().toISOString(),
          });
        }
        
        // Remove the last character from the sequence
        const newSequence = [...keySequence];
        if (newSequence.length > 0) {
          newSequence.pop();
          setKeySequence(newSequence);
          
          // Update the display text
          let displayText = "";
          newSequence.forEach(k => {
            if (k === "ArrowUp") displayText += "↑";
            else if (k === "ArrowDown") displayText += "↓";
            else if (k === "ArrowLeft") displayText += "←";
            else if (k === "ArrowRight") displayText += "→";
            else displayText += k.toUpperCase();
          });
          setCodeInput(displayText);
        }
        
        return;
      }
      
      // Handle Enter key for validation
      if (e.key === "Enter") {
        e.preventDefault();
        validateKonamiCode(codeInput);
        
        // Track Enter key event
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'konami_code_validate',
            input: codeInput,
            timestamp: new Date().toISOString(),
          });
        }
        
        return;
      }
      
      // Track the key sequence
      const key = e.key.toLowerCase();
      const isArrowKey = key === "arrowup" || key === "arrowdown" || key === "arrowleft" || key === "arrowright";
      const isValidKey = isArrowKey || key === "a" || key === "b";
      
      if (isValidKey) {
        // Track attempt with the actual key pressed
        if (typeof window !== 'undefined' && window.dataLayer) {
          window.dataLayer.push({
            event: 'konami_key_press',
            key: e.key,
            timestamp: new Date().toISOString(),
          });
        }
        
        // Update the key sequence
        const newSequence = [...keySequence, e.key];
        if (newSequence.length > KONAMI_CODE.length) {
          newSequence.shift(); // Keep only the last N keys
        }
        setKeySequence(newSequence);
        
        // Update the display text in the input field
        let displayText = "";
        newSequence.forEach(k => {
          if (k === "ArrowUp") displayText += "↑";
          else if (k === "ArrowDown") displayText += "↓";
          else if (k === "ArrowLeft") displayText += "←";
          else if (k === "ArrowRight") displayText += "→";
          else displayText += k.toUpperCase();
        });
        setCodeInput(displayText);
        
        // Check if the sequence matches the Konami code
        if (newSequence.length === KONAMI_CODE.length) {
          const isMatch = newSequence.every((k, i) => k === KONAMI_CODE[i]);
          if (isMatch) {
            validateKonamiCode(displayText);
          }
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keySequence, codeInput, validateKonamiCode, KONAMI_CODE]);

  return (
    <div className="mt-6 flex justify-center">
      <div className="relative w-48 sm:w-64 transition-opacity duration-300 opacity-60 hover:opacity-100 focus-within:opacity-100">
        <Input
          ref={inputRef}
          type="text"
          placeholder="Use arrow keys..."
          value={codeInput}
          className="bg-uin-black/60 border-uin-purple/30 text-sm text-white placeholder-gray-500 focus:border-uin-purple/50"
          aria-label="Secret code input"
          readOnly
          onKeyDown={(e) => {
            // Prevent default behavior for arrow keys to avoid cursor movement
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
              e.preventDefault();
            }
          }}
        />
        <div className="mt-1 text-xs text-gray-400">
          Press Enter to validate code
        </div>
      </div>
    </div>
  );
};

export default KonamiCodeInput;
