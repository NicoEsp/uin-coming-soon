
import React, { useRef, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, Joystick } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface KonamiModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const KonamiModal = ({ open, onOpenChange }: KonamiModalProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const discountCode = "SOLID10%";
  const codeRef = useRef<HTMLDivElement>(null);

  // Reset copied state when modal opens
  useEffect(() => {
    if (open) setCopied(false);
  }, [open]);

  const handleCopy = () => {
    navigator.clipboard.writeText(discountCode);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Discount code copied to clipboard",
    });
    
    // Track copy event
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'konami_code_copy',
        timestamp: new Date().toISOString(),
      });
    }

    // Reset copied state after 2 seconds
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-uin-dark-purple border border-uin-purple/30 text-white max-w-md">
        <DialogHeader>
          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
            <div className="bg-uin-purple rounded-full p-3 animate-bounce">
              <Joystick size={32} className="text-white" />
            </div>
          </div>
          <DialogTitle className="text-center text-2xl font-bold gradient-text pt-6">
            UNLOCKED: SECRET DISCOUNT!
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-4 my-4">
          <p className="text-center text-gray-300">
            Awesome gaming skills! You've unlocked a special discount on your next purchase.
          </p>
          
          <div className="relative">
            <div 
              ref={codeRef}
              className="bg-black/40 py-3 px-6 rounded-lg border-2 border-uin-purple text-center text-3xl font-bold tracking-widest animate-pulse-glow"
            >
              {discountCode}
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-uin-purple/0 via-uin-purple/30 to-uin-purple/0 rounded-lg opacity-30 animate-slide bg-[length:200%_100%]" />
          </div>
          
          <Button 
            onClick={handleCopy} 
            className="bg-uin-purple hover:bg-uin-purple/80 text-white"
            disabled={copied}
          >
            {copied ? (
              <>
                <CheckCircle className="mr-2" size={18} />
                Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2" size={18} />
                Copy Code
              </>
            )}
          </Button>
          
          <p className="text-sm text-gray-400 text-center mt-4">
            Use this code at checkout to receive 10% off your next purchase.
            <br />
            <span className="text-xs">This code is valid for 7 days.</span>
          </p>
          
          <p className="text-sm text-uin-purple font-medium text-center">
            Send this code to sales@uin.tech for a discount in Gaming Hub product Set Up Fee
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default KonamiModal;
