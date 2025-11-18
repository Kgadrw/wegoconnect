"use client";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Plasma from "./Plasma";
import SplitText from "./SplitText";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  useEffect(() => {
    // Check if the image is already cached
    const img = new Image();
    
    // If image is already loaded (cached), set state immediately
    if (img.complete) {
      setBackgroundLoaded(true);
      return;
    }
    
    // Otherwise, load the image
    img.onload = () => setBackgroundLoaded(true);
    img.onerror = () => {
      console.warn('Background image failed to load');
      setBackgroundLoaded(false);
    };
    
    // Use a small delay to prevent blocking the main thread
    const timeoutId = setTimeout(() => {
      img.src = '/bg.png';
    }, 100);
    
    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      img.onload = null;
      img.onerror = null;
    };
  }, []);

  return (
    <main className="h-auto min-h-[60vh] md:h-screen text-white overflow-hidden relative bg-black">
      {/* Background Image - Lazy loaded and optimized for larger screens */}
      {backgroundLoaded && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-20 sm:opacity-30 transition-opacity duration-1000 hidden sm:block"
          style={{
            backgroundImage: 'url(/bg.png)',
            backgroundAttachment: 'fixed'
          }}
        />
      )}
      
      {/* Loading placeholder for background */}
      {!backgroundLoaded && (
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 to-black opacity-50" />
      )}
      
      {/* Plasma Background */}
      <div className="absolute inset-0 z-0">
        <Plasma 
          color="#ff6b35"
          speed={0.6}
          direction="forward"
          scale={0.9}
          opacity={0.8}
          mouseInteractive={true}
        />
      </div>
      
      {/* Hero + Customers in one section */}
      <section
        id="home"
        className="relative z-10 flex flex-col min-h-[60vh] md:h-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-24 pt-20 sm:pt-24 md:pt-32 lg:pt-36 xl:pt-40 pb-8 sm:pb-12 md:pb-0"
      >
        {/* Hero Content */}
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center flex-1 max-w-7xl mx-auto w-full">
          {/* Left Content */}
          <div className="max-w-5xl space-y-3 sm:space-y-6 lg:space-y-8 text-center lg:text-left lg:flex-1">
            <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight font-heading">
              <SplitText
                text="Powering your world with reliable "
                tag="h1"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight inline-block font-heading"
                delay={30}
                duration={0.8}
                ease="power3.out"
                splitType="chars"
                from={{ opacity: 0, y: 50, rotateX: -90 }}
                to={{ opacity: 1, y: 0, rotateX: 0 }}
                threshold={0.1}
                rootMargin="0px"
                textAlign="left"
              />
              <span className="text-pink-500 font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">Networking</span>
              <span> & </span>
              <span className="text-yellow-400 font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Smart IT</span>
              <span> solutions</span>
            </div>
            <SplitText
              text="From satellite connectivity to secure systems that keep you connected, protected, and in control."
              tag="p"
              className="text-gray-300 max-w-lg text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed mx-auto lg:mx-0 font-sans"
              delay={20}
              duration={0.6}
              ease="power2.out"
              splitType="words"
              from={{ opacity: 0, y: 20 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="0px"
              textAlign="left"
            />
            <div className="flex justify-center lg:justify-start gap-4">
              <Link to="/about">
              <Button className="px-6 sm:px-8 py-2 bg-black border-l border-white hover:bg-gray-800 relative text-sm sm:text-base">
                <span>Learn more</span>
              </Button>
              </Link>
            </div>
          </div>

          {/* Right Image - Hidden on mobile */}
          <div className="hidden md:block mt-6 sm:mt-8 lg:mt-0 flex-shrink-0 lg:flex lg:items-center lg:justify-center">
            <img
              src="/right.png"
              alt="Networking & Smart IT"
              className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] object-contain drop-shadow-2xl opacity-100"
              style={{
                animation: 'floatMotion 6s ease-in-out infinite',
              }}
              loading="eager"
            />
          </div>
          <style>{`
            @keyframes floatMotion {
              0%, 100% {
                transform: translateY(0px) rotate(0deg) scale(1);
              }
              25% {
                transform: translateY(-20px) rotate(-3deg) scale(1.05);
              }
              50% {
                transform: translateY(-10px) rotate(0deg) scale(1);
              }
              75% {
                transform: translateY(-20px) rotate(3deg) scale(1.05);
              }
            }
          `}</style>
        </div>

        {/* Customers */}
        <div className="text-center mt-4 lg:mt-8 animate-fade-in">
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
