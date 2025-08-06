import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users, Award, Target, Heart, Zap, Quote } from "lucide-react";
import familyImg from "@/assets/family-connected.jpg";

const About = () => {
  const stats = [
    { number: "5000+", label: "Happy Customers", icon: <Users className="w-6 h-6" /> },
    { number: "99.9%", label: "Network Uptime", icon: <Zap className="w-6 h-6" /> },
    { number: "50+", label: "Locations Served", icon: <MapPin className="w-6 h-6" /> },
    { number: "24/7", label: "Support Available", icon: <Award className="w-6 h-6" /> }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8 text-primary" />,
      title: "Innovation",
      description: "Bringing cutting-edge satellite technology to every corner of Rwanda"
    },
    {
      icon: <Heart className="w-8 h-8 text-primary" />,
      title: "Community",
      description: "Connecting communities and enabling digital transformation across the nation"
    },
    {
      icon: <Award className="w-8 h-8 text-primary" />,
      title: "Excellence",
      description: "Committed to providing the highest quality service and customer satisfaction"
    }
  ];

  return (
    <section id="about" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="animate-fade-in">
            <Badge variant="outline" className="mb-4">About WegoConnect</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
              Connecting Rwanda to the 
              <span className="text-primary"> Digital Future</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              WegoConnect is Rwanda's premier Starlink service provider, dedicated to bringing 
              high-speed satellite internet to homes, businesses, and communities across the nation. 
              We believe that reliable internet connectivity is not a luxury—it's a necessity for 
              education, business, and social connection.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Since our founding, we've been committed to bridging the digital divide and ensuring 
              that every Rwandan has access to world-class internet connectivity, regardless of 
              their location.
            </p>
            <Button variant="cta" size="lg">
              Learn More About Our Mission
            </Button>
          </div>
          
          <div className="animate-scale-in">
            <div className="relative">
              <img 
                src={familyImg} 
                alt="Connected Rwandan Family" 
                className="w-full h-96 object-cover rounded-lg shadow-elegant"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-background/90 backdrop-blur-sm p-4 rounded-lg">
                  <p className="text-sm font-medium text-foreground">
                    "WegoConnect transformed our family's digital life. Now our children can learn online, 
                    and we can stay connected with family abroad."
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">- Happy Customer, Kigali</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <Card key={index} className="text-center bg-background shadow-card hover:shadow-elegant transition-all duration-300 animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                <div className="flex items-center justify-center w-12 h-12 bg-primary-light rounded-lg mx-auto mb-4">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Values Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Our Values</h3>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The principles that guide everything we do at WegoConnect
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {values.map((value, index) => (
            <Card key={index} className="text-center bg-background shadow-card hover:shadow-elegant transition-all duration-300 animate-scale-in" style={{ animationDelay: `${index * 0.2}s` }}>
              <CardContent className="p-8">
                <div className="flex items-center justify-center w-16 h-16 bg-primary-light rounded-lg mx-auto mb-6">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-foreground mb-4">{value.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonial Section */}
        <div className="bg-background rounded-lg p-8 md:p-12 shadow-elegant text-center animate-fade-in">
          <Quote className="w-12 h-12 text-primary mx-auto mb-6" />
          <blockquote className="text-2xl md:text-3xl font-medium text-foreground mb-6 leading-relaxed">
            "WegoConnect doesn't just provide internet service—they connect dreams to reality. 
            Their Starlink installation allowed our rural school to access online education resources 
            for the first time."
          </blockquote>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div className="text-left">
              <div className="font-semibold text-foreground">Rural School Principal</div>
              <div className="text-sm text-muted-foreground">Eastern Province, Rwanda</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;