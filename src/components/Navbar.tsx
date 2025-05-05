
import { useState, memo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Memoize the logo to prevent re-renders
const NavLogo = memo(() => (
  <Link to="/" className="flex items-center">
    <img 
      src="/lovable-uploads/d2d2157f-75e8-4cd9-b5aa-4c2d0fa9b026.png" 
      alt="UIN Logo" 
      className="h-8 w-auto" 
      width="32"
      height="32"
      loading="eager"
      fetchPriority="high"
    />
    <span className="ml-2 text-xl font-heading font-semibold">UIN</span>
  </Link>
));

// Memoize nav links to prevent re-renders
const DesktopNavLinks = memo(() => (
  <div className="ml-10 flex items-center space-x-8">
    <Link to="/" className="text-foreground hover:text-primary font-medium text-sm tracking-wide transition-colors">Home</Link>
    <a href="#solutions" className="text-foreground hover:text-primary font-medium text-sm tracking-wide transition-colors">Solutions</a>
    <a href="#features" className="text-foreground hover:text-primary font-medium text-sm tracking-wide transition-colors">Features</a>
    <a href="#contact" className="text-foreground hover:text-primary font-medium text-sm tracking-wide transition-colors">Contact</a>
  </div>
));

// Memoize mobile nav links
const MobileNavLinks = memo(() => (
  <div className="px-5 pt-5 pb-6 space-y-6 bg-background border-t">
    <div className="flex flex-col space-y-5">
      <Link to="/" className="text-foreground hover:text-primary font-medium text-lg transition-colors">Home</Link>
      <a href="#solutions" className="text-foreground hover:text-primary font-medium text-lg transition-colors">Solutions</a>
      <a href="#features" className="text-foreground hover:text-primary font-medium text-lg transition-colors">Features</a>
      <a href="#contact" className="text-foreground hover:text-primary font-medium text-lg transition-colors">Contact</a>
    </div>
    <div className="pt-4">
      <Button className="w-full">
        Get Started
      </Button>
    </div>
  </div>
));

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container-custom">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <NavLogo />
          </div>
          
          <div className="hidden md:block">
            <DesktopNavLinks />
          </div>
          
          <div className="hidden md:block">
            <Button size="sm" variant="outline" className="mr-3 border-primary text-primary hover:bg-primary/5">
              Log In
            </Button>
            <Button size="sm">
              Get Started
            </Button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - only render when open */}
      {isOpen && <MobileNavLinks />}
    </nav>
  );
};

export default Navbar;
