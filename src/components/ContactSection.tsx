
import React from "react";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import { obfuscateEmail } from "@/utils/security";

const ContactSection = () => {
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "mailto:" + "sales@uin.tech";
  };

  return (
    <section id="contact" className="py-20 md:py-32">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4">
            Want to <span className="gradient-text">know more?</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Get in touch with our team and discover how UIN can help you engage with gamers.
          </p>
          
          <Button 
            size="lg"
            onClick={handleEmailClick}
            data-email-protection={obfuscateEmail("sales@uin.tech")}
          >
            <Mail size={18} />
            <span>Contact Us</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
