import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
import Subscriptions from "@/components/Subscriptions";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Products />
      <Services />
      <Subscriptions />
      <About />
      <Footer />
    </div>
  );
};

export default Index;
