
import React from 'react';

const Header = () => {
  return (
    <header className="bg-uin-black w-full py-4 px-6 sm:py-6 sm:px-8 relative z-20 border-b border-uin-purple/20">
      <div className="container mx-auto">
        <div className="flex justify-center sm:justify-start">
          <img 
            src="/lovable-uploads/582d5702-4a92-4d40-bd61-f3225f9956a6.png" 
            alt="UIN Logo" 
            className="h-8 sm:h-10 md:h-12"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
