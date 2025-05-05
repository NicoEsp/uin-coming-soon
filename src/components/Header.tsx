
import React from 'react';

const Header = () => {
  return (
    <header className="bg-background w-full py-4 px-5 sm:py-5 sm:px-6 relative z-20 border-b border-muted/20">
      <div className="container-custom">
        <div className="flex justify-between items-center">
          <div className="flex justify-start">
            {/* Logo removed from here as it's already in Navbar */}
          </div>
          
          <nav className="hidden md:flex space-x-6 text-sm font-medium">
            <a href="/" className="text-foreground hover:text-primary transition-colors">Home</a>
            <a href="#solutions" className="text-foreground hover:text-primary transition-colors">Solutions</a>
            <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
