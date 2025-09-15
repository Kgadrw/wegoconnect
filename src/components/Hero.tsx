"use client";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <main className=" bg-black text-white h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section
        id="home"
        className="flex flex-col md:flex-row justify-between items-center px-10 md:px-20 pt-12 pb-0"
      >
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
          <Button className="bg-gray-800 hover:bg-gray-700 px-8 py">Learn more</Button>
        </div>

        {/* Right Image */}
        <div className="mt-12 md:mt-0">
        <img
          src="/right.png"
          alt="Networking & Smart IT"
          className="w-[400px] h-[400px] object-contain drop-shadow-2xl rotate-[360deg] opacity-100"
        />
      </div>

      </section>

      {/* Customers */}
            <section className="px-10 md:px-20 py-0 text-center">
        {/* Short top border */}
        <div className="mx-auto w-[1280px] border-t border-gray-700 mb-6"></div>

        <h2 className="text-gray-400 uppercase tracking-widest mb-12">
          Happy Customers
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-10 text-gray-400">
          <img src="/luna.png" alt="LuNa Smelter" className="h-12 object-contain" />
          <img src="/giz.png" alt="GIZ" className="h-12 object-contain" />
          <img src="/king.png" alt="Kingfisher Resort" className="h-12 object-contain" />
        </div>
      </section>

    </main>
  );
}
