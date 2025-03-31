
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const Index = () => {
  return (
    <div className="bg-uin-black text-white min-h-screen flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-uin-black bg-uin-grid opacity-20"></div>
      
      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-uin-purple/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10 max-w-4xl text-center">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="gradient-text">Level Up</span> Your 
            <br />Financial Apps with
            <br /><span className="gradient-text">Gaming</span> Power
          </h1>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            UIN serves as a gateway to gamers, providing tools designed to attract, retain, and engage the Gen-Z community with powerful gaming solutions.
          </p>
        </div>
        
        <div className="my-16 glow-effect">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-pulse">
            <span className="gradient-text">Coming Soon</span>
          </h2>
          <div className="relative my-6">
            <div className="h-1 bg-gradient-to-r from-uin-purple to-uin-magenta rounded-full w-48 mx-auto">
              <div className="h-1 bg-white rounded-full animate-pulse" style={{width: '30%'}}></div>
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <Button 
            variant="outline" 
            className="border-uin-purple text-white hover:bg-uin-purple/20 flex items-center gap-2"
            onClick={() => window.location.href = "mailto:sales@uin.tech"}
          >
            <Mail size={18} />
            <span>sales@uin.tech</span>
          </Button>
        </div>
      </div>
      
      {/* Game controller graphic */}
      <div className="absolute -right-16 -bottom-16 w-64 h-64 opacity-20 animate-float">
        <img 
          src="/lovable-uploads/b4133dbc-50d3-4685-a170-fe5fcb20dd2e.png" 
          alt="Controller" 
          className="w-full h-auto drop-shadow-2xl"
        />
      </div>
    </div>
  );
};

export default Index;
