"use client";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

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
        className="flex flex-col h-full px-6 md:px-12 lg:px-20 pt-20 pb-4"
      >
        {/* Hero Content */}
        <div className="flex flex-col lg:flex-row justify-between items-center flex-1">
          {/* Left Content */}
          <div className="max-w-4xl space-y-6 lg:space-y-8 px-2 md:px-8 lg:px-16">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-regular leading-tight">
              Powering your world with reliable{" "}
              <span className="text-pink-500 font-bold">Networking</span> &{" "}
              <span className="text-yellow-400 font-bold">Smart IT</span> solutions
            </h1>
            <p className="text-gray-300 max-w-lg text-lg lg:text-xl leading-relaxed">
              From satellite connectivity to secure systems that keep you
              connected, protected, and in control.
            </p>
            <Button className="bg-black hover:bg-gray-700 px-8 py-3 border-b border-white relative">
              <span>Learn more</span>
              {/* Growing light effect on left, top, and bottom borders */}
              <div className="absolute -left-px -top-px w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
              <div className="absolute -left-px -top-px w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
              <div className="absolute -left-px -bottom-px w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
            </Button>
          </div>

          {/* Right Image */}
          <div className="mt-8 lg:mt-0 flex-shrink-0">
            <img
              src="/right.png"
              alt="Networking & Smart IT"
              className="w-[300px] h-[300px] lg:w-[350px] lg:h-[350px] xl:w-[400px] xl:h-[400px] object-contain drop-shadow-2xl opacity-100"
              loading="eager"
            />
          </div>
        </div>

        {/* Customers */}
        <div className="text-center mt-4 lg:mt-6 px-6 md:px-12 lg:px-20">
          {/* Short top border */}
          <div className="mx-auto w-full max-w-[1280px] border-t border-gray-700 mb-3"></div>

          <h2 className="text-gray-400 uppercase tracking-widest mb-2 py-1 text-sm lg:text-base">
            Happy Customers
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8 text-gray-400 pb-2">
            <img 
              src="/luna.png" 
              alt="LuNa Smelter" 
              className="h-6 lg:h-10 object-contain" 
              loading="lazy"
            />
            <img 
              src="/giz.png" 
              alt="GIZ" 
              className="h-6 lg:h-10 object-contain" 
              loading="lazy"
            />
            <img 
              src="/king.png" 
              alt="Kingfisher Resort" 
              className="h-6 lg:h-10 object-contain" 
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
