
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { obfuscateEmail } from "@/utils/security";

const ContactButton = () => {
  // Secure email click handler with minimal overhead
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "mailto:" + "sales@uin.tech";
  };
  
  return (
    <>
      {/* Contact Us text */}
      <div className="mt-4 mb-2">
        <h3 className="text-xl sm:text-2xl font-bold">
          <span className="gradient-text">Want to know more?
Get in touch</span>
        </h3>
      </div>
      
      {/* Email button with enhanced security */}
      <div className="flex justify-center">
        <Button 
          variant="outline" 
          className="border-uin-purple text-white bg-uin-purple/30 hover:bg-uin-purple/50" 
          onClick={handleEmailClick}
          data-email-protection={obfuscateEmail("sales@uin.tech")}
        >
          <Mail size={18} />
          <span>Contact Us</span>
        </Button>
      </div>
    </>
  );
};

export default ContactButton;
