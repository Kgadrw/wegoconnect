import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar, MapPin, Phone, CheckCircle, Wrench, Users, Clock } from "lucide-react";
import installationImg from "@/assets/installation-service.jpg";

const Services = () => {
  const services = [
    {
      icon: <Wrench className="w-8 h-8 text-primary" />,
      title: "Professional Installation",
      description: "Expert technicians ensure perfect setup and optimal signal strength for your Starlink system."
    },
    {
      icon: <Users className="w-8 h-8 text-primary" />,
      title: "Technical Support",
      description: "24/7 dedicated support team ready to help with any technical issues or questions."
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Maintenance Service",
      description: "Regular maintenance checks and updates to keep your connection running at peak performance."
    }
  ];

  return (
    <section id="services" className="py-20 bg-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Professional <span className="text-primary">Installation & Support</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our certified technicians provide complete installation and ongoing support 
            to ensure you get the best possible Starlink experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Services List */}
          <div className="space-y-8 animate-slide-up">
            {services.map((service, index) => (
              <Card key={index} className="bg-background shadow-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary-light rounded-lg">
                      {service.icon}
                    </div>
                    <CardTitle className="text-xl text-foreground">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-muted-foreground text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Installation Image & Booking Form */}
          <div className="space-y-8 animate-scale-in">
            <div className="relative">
              <img 
                src={installationImg} 
                alt="Professional Starlink Installation" 
                className="w-full h-80 object-cover rounded-lg shadow-card"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </div>

            {/* Booking Form */}
            <Card className="bg-background shadow-elegant">
              <CardHeader>
                <CardTitle className="text-2xl text-foreground flex items-center gap-2">
                  <Calendar className="w-6 h-6 text-primary" />
                  Book Installation
                </CardTitle>
                <CardDescription>
                  Schedule your professional Starlink installation today
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Enter your full name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" placeholder="+250 XXX XXX XXX" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Installation Address</Label>
                  <Input id="address" placeholder="Enter complete address in Rwanda" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date</Label>
                    <Input id="date" type="date" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time</Label>
                    <Input id="time" type="time" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea 
                    id="notes" 
                    placeholder="Any special requirements or notes for our technicians..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Free site survey and installation quote
                </div>

                <Button variant="cta" className="w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Schedule Installation
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-16 text-center animate-fade-in">
          <div className="bg-background rounded-lg p-8 shadow-card">
            <h3 className="text-2xl font-bold text-foreground mb-4">Need Immediate Assistance?</h3>
            <p className="text-muted-foreground mb-6">Our support team is standing by to help with your Starlink needs</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="cta">
                <Phone className="w-4 h-4 mr-2" />
                Call: +250 XXX XXX XXX
              </Button>
              <Button variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Visit Our Office
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;