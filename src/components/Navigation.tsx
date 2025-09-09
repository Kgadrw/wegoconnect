import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ShoppingCart } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Products", href: "#products" },
    { label: "Services", href: "#services" },
    { label: "Subscriptions", href: "#subscriptions" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img
              src="/images.jpeg"
              alt="WegoConnect Logo"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h1
                className={`text-xl font-bold transition-colors duration-300 ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                WegoConnect
              </h1>
              <p
                className={`text-xs transition-colors duration-300 ${
                  scrolled ? "text-gray-600" : "text-white"
                }`}
              >
                Starlink Rwanda
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveSection(item.href.substring(1))}
                className={`transition-colors duration-300 font-medium relative ${
                  activeSection === item.href.substring(1)
                    ? "text-primary"
                    : scrolled
                    ? "text-black hover:text-white"
                    : "text-white hover:text-red-600"
                }`}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
                )}
              </a>
            ))}
          </div>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className={`transition-colors duration-300 ${
                scrolled ? "text-black hover:text-white" : "text-white hover:text-red-600"
              }`}
            >
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </Button>
            <Button variant="cta" size="sm">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Shop Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className={`w-6 h-6 ${scrolled ? "text-black hover:text-white" : "text-white hover:text-red-600"}`} />
            ) : (
              <Menu className={`w-6 h-6 ${scrolled ? "text-black hover:text-white" : "text-white hover:text-red-600"}`} />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation Overlay + Drawer */}
      <div
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-screen w-1/2 bg-white shadow-lg z-50 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-6 space-y-6">
          {/* Close Button */}
          <button
            className="self-end text-gray-700"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>

          {/* Nav Links */}
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-800 hover:text-primary font-medium py-2 transition-colors duration-300"
                onClick={() => {
                  setActiveSection(item.href.substring(1));
                  setIsOpen(false);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="pt-6 space-y-3">
            <Button variant="ghost" size="sm" className="w-full justify-start">
              <Phone className="w-4 h-4 mr-2" />
              Call Us
            </Button>
            <Button variant="cta" size="sm" className="w-full">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Shop Now
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
