import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Contact Section */}
      <section className="px-6 md:px-16 py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in{" "}
              <span className="bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                Touch
              </span>
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
              Ready to transform your IT infrastructure? Contact us today for a consultation 
              and discover how we can help you stay connected, secure, and efficient.
            </p>
          </div>

          {/* Contact Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-purple-800/30 border border-purple-700 rounded-xl p-6 text-center">
              <Mail className="w-8 h-8 text-pink-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <p className="text-gray-300 text-sm">info@wegoconnect.com</p>
            </div>
            
            <div className="bg-purple-800/30 border border-purple-700 rounded-xl p-6 text-center">
              <Phone className="w-8 h-8 text-pink-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <p className="text-gray-300 text-sm">+250 123 456 789</p>
            </div>
            
            <div className="bg-purple-800/30 border border-purple-700 rounded-xl p-6 text-center">
              <MapPin className="w-8 h-8 text-pink-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-gray-300 text-sm">Kigali, Rwanda</p>
            </div>
            
            <div className="bg-purple-800/30 border border-purple-700 rounded-xl p-6 text-center">
              <Clock className="w-8 h-8 text-pink-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Hours</h3>
              <p className="text-gray-300 text-sm">Mon-Fri: 8AM-6PM</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-purple-800/30 border border-purple-700 rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-center">Send us a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-black border border-purple-700 rounded-lg text-white focus:outline-none focus:border-pink-400"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-black border border-purple-700 rounded-lg text-white focus:outline-none focus:border-pink-400"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-black border border-purple-700 rounded-lg text-white focus:outline-none focus:border-pink-400"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-black border border-purple-700 rounded-lg text-white focus:outline-none focus:border-pink-400"
                    placeholder="+250 123 456 789"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Service of Interest</label>
                  <select className="w-full px-4 py-3 bg-black border border-purple-700 rounded-lg text-white focus:outline-none focus:border-pink-400">
                    <option value="">Select a service</option>
                    <option value="satellite">Satellite Networking</option>
                    <option value="lan">Local Area Networking (LAN)</option>
                    <option value="cctv">CCTV & Security Camera System</option>
                    <option value="access">Access Control Systems</option>
                    <option value="support">IT Support & Maintenance</option>
                    <option value="custom">Customized Solutions</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-black border border-purple-700 rounded-lg text-white focus:outline-none focus:border-pink-400"
                    placeholder="Tell us about your project requirements..."
                  ></textarea>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-pink-500 via-orange-500 to-yellow-400 text-white font-semibold py-3 rounded-lg hover:opacity-90 transition-opacity">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ContactPage;
