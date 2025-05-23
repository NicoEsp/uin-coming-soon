
import { memo, useState } from "react";

const MainLogo = memo(() => {
  // Track image loading state for better UX
  const [isLoaded, setIsLoaded] = useState(false);
  
  return (
    <>
      {isLoaded && (
        <img 
          src="/lovable-uploads/47f345e2-aea8-4e20-b3ec-af9eacae0232.png" 
          alt="UIN Logo - Gaming-Powered Fintech Solutions for Gen-Z Users and Financial Applications"
          className="w-48 sm:w-64 md:w-72 h-auto mb-6 logo-pulse"
          width="288" 
          height="288"
          loading="eager"
          fetchPriority="high"
        />
      )}
      {/* Hidden image to preload */}
      <img 
        src="/lovable-uploads/47f345e2-aea8-4e20-b3ec-af9eacae0232.png" 
        alt=""
        className={`w-48 sm:w-64 md:w-72 h-auto mb-6 ${isLoaded ? 'hidden' : 'opacity-0'}`}
        width="288" 
        height="288"
        onLoad={() => setIsLoaded(true)}
        fetchPriority="high"
        loading="eager"
      />
    </>
  );
});

MainLogo.displayName = 'MainLogo';

export default MainLogo;
