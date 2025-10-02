"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Preload background image for faster loading
  useEffect(() => {
    // Check if image is already cached
    const img = new Image();
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    img.onerror = () => {
      console.warn('Failed to load hero background image, using fallback');
      setImageError(true);
      setImageLoaded(true); // Show content even if image fails
    };
    
    // Add cache-busting parameter for development, remove in production
    const timestamp = process.env.NODE_ENV === 'development' ? `?t=${Date.now()}` : '';
    img.src = `/bg.png${timestamp}`;
    
    // Fallback: set loaded after 2 seconds to prevent infinite loading
    const fallbackTimer = setTimeout(() => {
      if (!imageLoaded) {
        console.warn('Hero image loading timeout, showing fallback');
        setImageLoaded(true);
      }
    }, 2000);
    
    return () => clearTimeout(fallbackTimer);
  }, [imageLoaded]);

  return (
    <main
      className="h-screen bg-cover bg-center text-white overflow-hidden relative"
      style={{
        backgroundImage: imageLoaded ? 'url(/bg.png)' : 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        transition: 'background-image 0.5s ease-in-out'
      }}
    >
      {/* Loading overlay */}
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black flex items-center justify-center z-10">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white text-sm">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Hero + Customers in one section */}
      <section
        id="home"
        className="flex flex-col h-full px-6 sm:px-6 md:px-12 lg:px-20 pt-20 sm:pt-20 pb-6"
      >
        {/* Hero Content */}
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center flex-1">
          {/* Left Content */}
          <div className="max-w-4xl space-y-3 sm:space-y-6 lg:space-y-8 px-4 md:px-8 lg:px-16 text-center lg:text-left">
            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-regular leading-tight animate-fade-in">
              Powering your world with reliable{" "}
              <span className="text-pink-500 font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">Networking</span> &{" "}
              <span className="text-yellow-400 font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Smart IT</span> solutions
            </h1>
            <p className="text-gray-300 max-w-lg text-base sm:text-base lg:text-lg xl:text-xl leading-relaxed mx-auto lg:mx-0 animate-fade-in-up">
              From satellite connectivity to secure systems that keep you
              connected, protected, and in control.
            </p>
            <div className="flex justify-center lg:justify-start">
              <Link to="/about">
              <Button className="px-8 py-2 bg-black border-l border-white hover:bg-gray-800 relative ">
                <span>Learn more</span>
              </Button>
              </Link>
            </div>
          </div>

          {/* Right Image - Hidden on mobile */}
          <div className="hidden md:block mt-6 sm:mt-8 lg:mt-0 flex-shrink-0">
            <img
              src="/right.png"
              alt="Networking & Smart IT"
              className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] object-contain drop-shadow-2xl opacity-100"
              loading="eager"
            />
          </div>
        </div>

        {/* Customers */}
        <div className="text-center mt-4 lg:mt-8 px-4 sm:px-6 md:px-12 lg:px-20 animate-fade-in">
          {/* Short top border */}
          <div className="mx-auto w-full max-w-[1280px] border-t border-gray-700/50 mb-4"></div>

          <h2 className="text-gray-400 uppercase tracking-widest mb-2 py-1 text-xs sm:text-sm lg:text-base font-semibold">
            HAPPY CUSTOMERS
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-6 lg:gap-8 text-gray-400 pb-2">
            <div className="p-1 sm:p-3  rounded-lg  transition-all duration-300">
              <img 
                src="/luna.png" 
                alt="LuNa Smelter" 
                className="h-5 sm:h-8 lg:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" 
                loading="lazy"
              />
            </div>
            <div className="p-1 sm:p-3  rounded-lg  transition-all duration-300">
              <img 
                src="/giz.png" 
                alt="GIZ" 
                className="h-5 sm:h-8 lg:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" 
                loading="lazy"
              />
            </div>
            <div className="p-1 sm:p-3  rounded-lg  transition-all duration-300">
              <img 
                src="/king.png" 
                alt="Kingfisher Resort" 
                className="h-5 sm:h-8 lg:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" 
                loading="lazy"
              />
            </div>
            <div className="p-1 sm:p-3  rounded-lg  transition-all duration-300">
              <img 
                src="/canada.png" 
                alt="Kingfisher Resort" 
                className="h-5 sm:h-8 lg:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" 
                loading="lazy"
              />
            </div>
            <div className="p-1 sm:p-3  rounded-lg  transition-all duration-300">
              <img 
                src="/gasmeth.png" 
                alt="Kingfisher Resort" 
                className="h-5 sm:h-8 lg:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
