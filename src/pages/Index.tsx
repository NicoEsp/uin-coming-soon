
import { Button } from "@/components/ui/button";
import { Mail, ArrowRight } from "lucide-react";
import { useEffect, useState, lazy, Suspense, memo } from "react";
import { obfuscateEmail } from "@/utils/security";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

// Lazy load components that aren't needed immediately
const FallingJoystick = lazy(() => import("@/components/FallingJoystick"));

// Memoize static components to prevent unnecessary re-renders
const MainLogo = memo(() => (
  <img 
    src="/lovable-uploads/47f345e2-aea8-4e20-b3ec-af9eacae0232.png" 
    alt="UIN Logo" 
    className="w-36 sm:w-44 md:w-48 h-auto mb-8 animate-pulse-glow"
    width="192" 
    height="192"
    loading="eager"
    fetchPriority="high"
  />
));

// Background image component
const BackgroundPattern = memo(() => (
  <div className="absolute inset-0 z-0 opacity-5 overflow-hidden">
    <div className="absolute inset-0 bg-[url('/lovable-uploads/f927405f-2320-42d4-a8f4-e0f0cdcf7f70.png')] bg-repeat opacity-10"></div>
  </div>
));

// Memoized controller image to prevent re-renders
const ControllerImage = memo(() => (
  <img 
    src="/lovable-uploads/b4133dbc-50d3-4685-a170-fe5fcb20dd2e.png" 
    alt="Controller" 
    className="w-full max-w-xs h-auto drop-shadow-xl" 
    loading="lazy"
    width="288"
    height="288"
  />
));

// Game mockup image
const GameMockup = memo(() => (
  <img 
    src="/lovable-uploads/c8097de3-74f0-4192-97ea-8d9b2611ef7d.png" 
    alt="Gaming App Mockup" 
    className="w-auto h-[85vh] max-h-[800px] img-shadow" 
    loading="lazy"
    width="375"
    height="800"
  />
));

// Features section component
const FeatureCard = memo(({ icon, title, description }: { icon: string, title: string, description: string }) => (
  <div className="bg-muted/30 p-6 rounded-lg card-hover animate-fade-in-up">
    <img src={icon} alt={title} className="h-12 w-12 mb-4" />
    <h3 className="text-lg font-heading font-medium mb-2">{title}</h3>
    <p className="text-sm">{description}</p>
  </div>
));

// Stats component
const Stat = memo(({ number, label }: { number: string, label: string }) => (
  <div className="text-center">
    <p className="text-3xl sm:text-4xl font-heading font-medium text-primary mb-1">{number}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
));

const Index = () => {
  // Animation state
  const [fallingJoysticks, setFallingJoysticks] = useState<Array<{
    id: number;
    x: number;
    rotation: number;
  }>>([]);
  const [nextJoystickId, setNextJoystickId] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Optimize loading sequence
  useEffect(() => {
    if (document.readyState === 'complete') {
      setIsLoaded(true);
    } else {
      window.addEventListener('load', () => setIsLoaded(true));
      return () => window.removeEventListener('load', () => setIsLoaded(true));
    }
  }, []);

  // Progress animation
  useEffect(() => {
    if (!isLoaded) return;
    
    let start: number | null = null;
    let animationFrameId: number;
    
    const animateProgress = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      
      const newProgress = Math.floor((elapsed / 7250) * 100) % 100;
      setProgress(newProgress);
      
      animationFrameId = requestAnimationFrame(animateProgress);
    };
    
    animationFrameId = requestAnimationFrame(animateProgress);
    
    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoaded]);

  // Joystick falling animation
  const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (fallingJoysticks.length >= 3) return;

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
  };

  // Email click handler
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.location.href = "mailto:" + "sales@uin.tech";
  };

  // Features data
  const features = [
    {
      icon: "/lovable-uploads/227adb21-ee17-4187-ba33-88184e60e7aa.png",
      title: "Gamified Rewards",
      description: "Engage users with achievement-based rewards that make financial tasks fun and addictive."
    },
    {
      icon: "/lovable-uploads/7612a97b-ff25-46a8-9525-b2277af6b9b4.png",
      title: "Gaming Integrations",
      description: "Seamlessly connect with popular gaming platforms to attract the gaming community."
    },
    {
      icon: "/lovable-uploads/342cd0d0-8503-4c22-94f2-8c85464528b4.png",
      title: "Community Building",
      description: "Foster a vibrant community of gamers interested in financial growth and education."
    },
    {
      icon: "/lovable-uploads/1776dc15-5666-497c-905b-2b584eabb022.png",
      title: "Data Analytics",
      description: "Powerful insights into user behavior and preferences within the gaming demographic."
    }
  ];

  return (
    <>
      <Navbar />
      
      <div className="bg-background text-foreground min-h-screen relative" onClick={handleBackgroundClick}>
        {/* Background pattern */}
        <BackgroundPattern />
        
        {/* Falling joysticks */}
        <Suspense fallback={null}>
          {fallingJoysticks.map(joystick => (
            <FallingJoystick key={joystick.id} x={joystick.x} rotation={joystick.rotation} />
          ))}
        </Suspense>
        
        {/* Hero Section */}
        <section className="pt-32 pb-24 md:pt-40 md:pb-32 relative">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto text-center">
              <MainLogo />
              
              <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium mb-6 leading-tight">
                Level Up Your <span className="gradient-text">Gaming</span> Experience
              </h1>
              
              <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10">
                UIN serves as a gateway to gamers, providing tools designed to attract, 
                retain, and engage the Gen-Z community with powerful gaming solutions.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Button size="lg" className="group">
                  Get Started <ArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <Button size="lg" variant="outline" onClick={handleEmailClick}>
                  <Mail size={18} className="mr-1" />
                  Contact Us
                </Button>
              </div>
              
              <div className="mt-16 relative">
                <div className="text-center">
                  <div className="inline-block mx-auto">
                    <h2 className="text-xl sm:text-2xl font-heading font-medium mb-3">
                      <span className="gradient-text">Coming Soon</span>
                    </h2>
                    
                    <div className="w-48 sm:w-64 md:w-80 h-1 bg-muted/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-300" 
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 md:py-32 bg-muted/5 border-t border-muted/20">
          <div className="container-custom">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-medium mb-4">
                Powerful <span className="gradient-text">Features</span>
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our platform provides everything you need to engage with the gaming community
                and create meaningful financial experiences.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index}
                  icon={feature.icon} 
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className="py-16 md:py-24 bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="container-custom">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <Stat number="10K+" label="Active Users" />
              <Stat number="50+" label="Game Integrations" />
              <Stat number="98%" label="Satisfaction Rate" />
              <Stat number="24/7" label="Support Available" />
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
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
        
        {/* Game controller graphic */}
        {isLoaded && (
          <div className="absolute -right-16 -bottom-16 w-36 sm:w-48 md:w-56 opacity-20 animate-float">
            <ControllerImage />
          </div>
        )}
      </div>
      
      <Footer />
    </>
  );
};

export default Index;
