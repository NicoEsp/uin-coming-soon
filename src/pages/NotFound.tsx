
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-uin-black text-white">
      <div className="text-center max-w-md mx-auto px-4">
        <h1 className="text-6xl font-bold mb-4 gradient-text">404</h1>
        <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
        <p className="text-lg text-gray-300 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <nav aria-label="Error page navigation">
          <Link 
            to="/" 
            className="inline-block bg-gradient-to-r from-uin-purple to-uin-magenta hover:opacity-90 text-white font-medium px-6 py-3 rounded-lg transition-opacity"
          >
            Return to Home
          </Link>
        </nav>
        
        {/* SEO structured data for 404 page */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Page Not Found - UIN Tech",
            "description": "The requested page could not be found on UIN Tech website.",
            "url": `https://uin.tech${location.pathname}`,
            "mainEntity": {
              "@type": "Thing",
              "name": "404 Error"
            }
          })}
        </script>
      </div>
    </div>
  );
};

export default NotFound;
