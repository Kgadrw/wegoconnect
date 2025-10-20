import { useLocation } from "react-router-dom";
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
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with bg2.png and gradients */}
      <div className="absolute inset-0 bg-black">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/bg2.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        {/* Top gradient */}
        <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-black/95 to-transparent" />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-t from-black/95 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-white">404</h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-6">Oops! Page not found</p>
          <p className="text-sm sm:text-base text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <a 
            href="/" 
            className="inline-block bg-gray-800 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors text-sm sm:text-base border border-white/20"
          >
            Return to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
