
import { memo } from "react";

const MainLogo = memo(() => (
  <img 
    src="/lovable-uploads/47f345e2-aea8-4e20-b3ec-af9eacae0232.png" 
    alt="UIN Logo" 
    className="w-48 sm:w-64 md:w-72 h-auto mb-6 logo-pulse"
    width="288" 
    height="288"
    loading="eager"
    fetchPriority="high"
  />
));

MainLogo.displayName = 'MainLogo';

export default MainLogo;
