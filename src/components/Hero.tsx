"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  // Preload background image for faster loading
  useEffect(() => {
    const img = new Image();
    img.src = '/bg.png';
  }, []);

  return (
    <main
      className="h-screen bg-[url('/bg.png')] bg-cover bg-center text-white overflow-hidden relative"
      style={{
        backgroundImage: 'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Hero + Customers in one section */}
      <section
        id="home"
        className="flex flex-col h-full px-4 sm:px-6 md:px-12 lg:px-20 pt-16 sm:pt-20 pb-4"
      >
        {/* Hero Content */}
        <div className="flex flex-col lg:flex-row justify-center lg:justify-between items-center flex-1">
          {/* Left Content */}
          <div className="max-w-4xl space-y-4 sm:space-y-6 lg:space-y-8 px-2 md:px-8 lg:px-16 text-center lg:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-regular leading-tight animate-fade-in">
              Powering your world with reliable{" "}
              <span className="text-pink-500 font-bold bg-gradient-to-r from-pink-500 to-pink-600 bg-clip-text text-transparent">Networking</span> &{" "}
              <span className="text-yellow-400 font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Smart IT</span> solutions
            </h1>
            <p className="text-gray-300 max-w-lg text-sm sm:text-base lg:text-lg xl:text-xl leading-relaxed mx-auto lg:mx-0 animate-fade-in-up">
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
          <div className="hidden sm:block mt-6 sm:mt-8 lg:mt-0 flex-shrink-0">
            <img
              src="/right.png"
              alt="Networking & Smart IT"
              className="w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] object-contain drop-shadow-2xl opacity-100"
              loading="eager"
            />
          </div>
        </div>

        {/* Customers */}
        <div className="text-center mt-6 lg:mt-8 px-4 sm:px-6 md:px-12 lg:px-20 animate-fade-in">
          {/* Short top border */}
          <div className="mx-auto w-full max-w-[1280px] border-t border-gray-700/50 mb-4"></div>

          <h2 className="text-gray-400 uppercase tracking-widest mb-3 py-1 text-xs sm:text-sm lg:text-base font-semibold">
            HAPPY CUSTOMERS
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 lg:gap-8 text-gray-400 pb-4">
            <div className="p-2 sm:p-3  rounded-lg  transition-all duration-300">
              <img 
                src="/luna.png" 
                alt="LuNa Smelter" 
                className="h-6 sm:h-8 lg:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" 
                loading="lazy"
              />
            </div>
            <div className="p-2 sm:p-3  rounded-lg  transition-all duration-300">
              <img 
                src="/giz.png" 
                alt="GIZ" 
                className="h-6 sm:h-8 lg:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" 
                loading="lazy"
              />
            </div>
            <div className="p-2 sm:p-3  rounded-lg  transition-all duration-300">
              <img 
                src="/king.png" 
                alt="Kingfisher Resort" 
                className="h-6 sm:h-8 lg:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" 
                loading="lazy"
              />
            </div>
            <div className="p-2 sm:p-3  rounded-lg  transition-all duration-300">
              <img 
                src="/canada.png" 
                alt="Kingfisher Resort" 
                className="h-6 sm:h-8 lg:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" 
                loading="lazy"
              />
            </div>
            <div className="p-2 sm:p-3  rounded-lg  transition-all duration-300">
              <img 
                src="/gasmeth.png" 
                alt="Kingfisher Resort" 
                className="h-6 sm:h-8 lg:h-10 object-contain opacity-80 hover:opacity-100 transition-opacity" 
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
