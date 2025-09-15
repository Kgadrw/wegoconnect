"use client";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main
      className="h-screen bg-[url('/bg.png')] bg-cover bg-center text-white overflow-hidden"
    >
      {/* Hero + Customers in one section */}
      <section
        id="home"
        className="flex flex-col h-full px-10 md:px-20 pt-32 pb-6"
      >
        {/* Hero Content */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* Left Content */}
          <div className="max-w-4xl space-y-8 px-6 md:px-16">
            <h1 className="text-4xl md:text-5xl font-regular leading-snug">
              Powering your world with reliable{" "}
              <span className="text-pink-500 font-bold">Networking</span> &{" "}
              <span className="text-yellow-400 font-bold">Smart IT</span> solutions
            </h1>
            <p className="text-gray-300 max-w-lg text-xl leading-relaxed">
              From satellite connectivity to secure systems that keep you
              connected, protected, and in control.
            </p>
            <Button className="bg-gray-800 hover:bg-gray-700 px-8 py-2">
              Learn more
            </Button>
          </div>

          {/* Right Image */}
          <div className="mt-12 md:mt-0">
            <img
              src="/right.png"
              alt="Networking & Smart IT"
              className="w-[400px] h-[400px] object-contain drop-shadow-2xl opacity-100"
            />
          </div>
        </div>

        {/* Customers */}
        <div className="text-center mt-10"> {/* ⬅ increased from mt-8 to mt-10 */}
          {/* Short top border */}
          <div className="mx-auto w-full max-w-[1280px] border-t border-gray-700 mb-6"></div>

          <h2 className="text-gray-400 uppercase tracking-widest mb-4">
            Happy Customers
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-10 text-gray-400">
            <img src="/luna.png" alt="LuNa Smelter" className="h-12 object-contain" />
            <img src="/giz.png" alt="GIZ" className="h-12 object-contain" />
            <img src="/king.png" alt="Kingfisher Resort" className="h-12 object-contain" />
          </div>
        </div>
      </section>
    </main>
  );
}
