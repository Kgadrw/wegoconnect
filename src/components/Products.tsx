import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Star, Wifi, Home, Building2, Car } from "lucide-react";
import starlinkDish from "@/assets/starlink-dish.jpg";

const Products = () => {
  const products = [
    {
      id: 1,
      name: "Starlink Residential",
      description: "Perfect for homes and small offices. High-speed internet for the whole family.",
      price: "$599",
      monthlyPrice: "$110/month",
      features: ["100+ Mbps download", "Unlimited data", "Easy self-installation", "24/7 support"],
      icon: <Home className="w-6 h-6" />,
      badge: "Most Popular",
      rating: 4.8
    },
    {
      id: 2,
      name: "Starlink Business",
      description: "Enterprise-grade connectivity for businesses and organizations.",
      price: "$2,500",
      monthlyPrice: "$500/month",
      features: ["Priority network access", "99.9% uptime SLA", "Professional installation", "Dedicated support"],
      icon: <Building2 className="w-6 h-6" />,
      badge: "Enterprise",
      rating: 4.9
    },
    {
      id: 3,
      name: "Starlink Roam",
      description: "Stay connected on the move. Perfect for travelers and mobile professionals.",
      price: "$599",
      monthlyPrice: "$200/month",
      features: ["Global coverage", "Portable design", "Pause/resume service", "Regional roaming"],
      icon: <Car className="w-6 h-6" />,
      badge: "Mobile",
      rating: 4.7
    }
  ];

  return (
    <section id="products" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Choose Your <span className="text-primary">Starlink Package</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From residential homes to enterprise businesses, we have the perfect Starlink solution 
            to keep you connected to what matters most.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card 
              key={product.id} 
              className={`relative overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300 transform hover:scale-[1.02] animate-scale-in ${
                product.badge === "Most Popular" ? "ring-2 ring-primary" : ""
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {product.badge && (
                <div className="absolute top-4 right-4 z-10">
                  <Badge variant="default" className="bg-primary text-primary-foreground">
                    {product.badge}
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  {product.icon}
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">{product.name}</CardTitle>
                <CardDescription className="text-muted-foreground">{product.description}</CardDescription>
                
                <div className="flex items-center justify-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">({product.rating})</span>
                </div>
              </CardHeader>

              <CardContent className="text-center pb-6">
                <div className="mb-6">
                  <img 
                    src={starlinkDish} 
                    alt="Starlink Dish" 
                    className="w-full h-40 object-cover rounded-lg mb-4"
                  />
                </div>
                
                <div className="mb-6">
                  <div className="text-4xl font-bold text-foreground">{product.price}</div>
                  <div className="text-lg text-primary font-semibold">{product.monthlyPrice}</div>
                </div>

                <ul className="space-y-3 text-left">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-3">
                      <Wifi className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>

              <CardFooter className="pt-0">
                <Button variant="cta" className="w-full">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Order Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12 animate-fade-in">
          <p className="text-muted-foreground mb-6">Need help choosing the right package?</p>
          <Button variant="outline" size="lg">
            Compare All Plans
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Products;