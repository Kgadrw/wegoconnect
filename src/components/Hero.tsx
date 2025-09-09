import { Button } from "@/components/ui/button";
import { ArrowRight, Wifi, Zap, Globe } from "lucide-react";
import heroBg from "@/assets/bg.jpg";

const Hero = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-20 md:pt-24"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-70 pointer-events-none"></div>
      </div>

      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-8 md:py-12">
        <div className="animate-fade-in relative z-30">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Connect Rwanda to the
            <span className="text-white"> Future</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            High-speed satellite internet powered by Starlink. Bringing
            world-class connectivity to every corner of Rwanda with professional
            installation and ongoing support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="animate-scale-in">
              Get Connected Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="animate-scale-in bg-white/10 text-white border-white/30 hover:bg-white/20"
            >
              View Products
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mx-auto mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">100+ Mbps</h3>
              <p className="text-white/80">High-speed internet</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mx-auto mb-4">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">99.9%</h3>
              <p className="text-white/80">Network uptime</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mx-auto mb-4">
                <Wifi className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">24/7</h3>
              <p className="text-white/80">Expert support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
