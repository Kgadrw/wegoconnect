import { Button } from "@/components/ui/button";
import { ArrowRight, Wifi, Zap, Globe } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Connect Rwanda to the
            <span className="bg-gradient-to-r from-primary-light to-primary bg-clip-text text-transparent"> Future</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed">
            High-speed satellite internet powered by Starlink. Bringing world-class connectivity 
            to every corner of Rwanda with professional installation and ongoing support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="animate-scale-in">
              Get Connected Today
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button variant="outline" size="lg" className="animate-scale-in bg-background/10 text-primary-foreground border-primary-foreground/30 hover:bg-background/20">
              View Products
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-slide-up">
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mx-auto mb-4">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">100+ Mbps</h3>
              <p className="text-primary-foreground/80">High-speed internet</p>
            </div>
            
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mx-auto mb-4">
                <Globe className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">99.9%</h3>
              <p className="text-primary-foreground/80">Network uptime</p>
            </div>
            
            <div className="bg-background/10 backdrop-blur-sm rounded-lg p-6 border border-primary-foreground/20">
              <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-lg mx-auto mb-4">
                <Wifi className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-bold text-primary-foreground mb-2">24/7</h3>
              <p className="text-primary-foreground/80">Expert support</p>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary-foreground/70 rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;