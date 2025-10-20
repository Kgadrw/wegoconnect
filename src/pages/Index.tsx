import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Products from "@/components/contact";
import Services from "@/components/Services";
import Subscriptions from "@/components/Subscriptions";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
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
      <div className="relative z-10">
        <Navigation />
        <Hero />
      </div>
    </div>
  );
};

export default Index;
