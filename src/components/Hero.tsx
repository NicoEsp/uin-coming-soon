
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with subtle pattern */}
      <div className="absolute inset-0 bg-uin-black bg-uin-grid opacity-20"></div>
      
      {/* Purple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-uin-purple/10 to-transparent"></div>
      
      <div className="container mx-auto px-4 py-32 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
              <span className="gradient-text">Level Up</span> Your 
              <br />Financial Apps with
              <br /><span className="gradient-text">Gaming</span> Power
            </h1>
            <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto lg:mx-0">
              UIN serves as a gateway to gamers, providing tools designed to attract, retain, and engage the Gen-Z community with powerful gaming solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button size="lg" className="bg-gradient-to-r from-uin-purple to-uin-magenta hover:opacity-90 text-white">
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="border-uin-purple text-white hover:bg-uin-purple/20">
                Learn More
              </Button>
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="relative w-full max-w-md mx-auto">
              <div className="animate-pulse-glow rounded-3xl overflow-hidden">
                <img 
                  src="/lovable-uploads/edef73a3-9ad7-424b-9143-650089785374.png" 
                  alt="UIN Mobile App" 
                  className="w-full h-auto rounded-3xl animate-float drop-shadow-2xl"
                />
              </div>
              
              <div className="absolute -right-8 -bottom-8 w-32 h-32 animate-float" style={{animationDelay: '1s'}}>
                <img 
                  src="/lovable-uploads/b4133dbc-50d3-4685-a170-fe5fcb20dd2e.png" 
                  alt="Controller" 
                  className="w-full h-auto drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
