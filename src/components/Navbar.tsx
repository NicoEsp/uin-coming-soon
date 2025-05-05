
import { useState, memo } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

// Memoize the logo to prevent re-renders
const NavLogo = memo(() => (
  <Link to="/" className="flex items-center">
    <img 
      src="/lovable-uploads/d2d2157f-75e8-4cd9-b5aa-4c2d0fa9b026.png" 
      alt="UIN Logo" 
      className="h-10 w-auto" 
      width="40"
      height="40"
      loading="eager"
      fetchPriority="high"
    />
    <span className="ml-2 text-xl font-bold gradient-text">UIN</span>
  </Link>
));

// Memoize nav links to prevent re-renders
const DesktopNavLinks = memo(() => (
  <div className="ml-10 flex items-center space-x-4">
    <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Home</Link>
    <a href="#solutions" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Solutions</a>
    <a href="#features" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Features</a>
    <a href="#contact" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Contact</a>
  </div>
));

// Memoize mobile nav links
const MobileNavLinks = memo(() => (
  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-uin-black/90 backdrop-blur-md">
    <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
    <a href="#solutions" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Solutions</a>
    <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Features</a>
    <a href="#contact" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Contact</a>
    <div className="pt-2">
      <Button className="w-full bg-gradient-to-r from-uin-purple to-uin-magenta hover:opacity-90">
        Get Started
      </Button>
    </div>
  </div>
));

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-uin-black/90 backdrop-blur-md border-b border-uin-purple/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <NavLogo />
          </div>
          
          <div className="hidden md:block">
            <DesktopNavLinks />
          </div>
          
          <div className="hidden md:block">
            <Button className="bg-gradient-to-r from-uin-purple to-uin-magenta hover:opacity-90">
              Get Started
            </Button>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
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
