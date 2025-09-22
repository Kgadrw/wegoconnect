"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "Home", href: "/", isRoute: true },
    { label: "Services", href: "/services", isRoute: true },
    { label: "About", href: "/about", isRoute: true },
    { label: "Blog", href: "/blog", isRoute: true },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`absolute top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? " backdrop-blur-md  shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 py-2 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/images.jpeg" alt="WEGO Logo" className="h-16 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-36">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`transition-all duration-300 font-medium relative ${
                  location.pathname === item.href
                    ? "text-white scale-110"
                    : scrolled
                    ? "text-black hover:text-white hover:scale-105 hover:drop-shadow-lg"
                    : "text-white hover:scale-105 hover:drop-shadow-lg"
                }`}
              >
                <span className={location.pathname === item.href ? "text-shadow-lg drop-shadow-lg" : ""}>{item.label}</span>
                {/* Light stroke effect for active nav items */}
                {location.pathname === item.href && (
                  <div className="absolute inset-0 text-transparent" style={{
                    WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
                    textShadow: '0 0 8px rgba(255, 255, 255, 0.2)'
                  }}>
                    {item.label}
                  </div>
                )}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          {location.pathname !== '/contact' && (
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/contact">
                <Button className="px-8 py-2 bg-black border-l border-white hover:bg-gray-800 relative">
                  <span>Contact</span>
                  {/* Growing light effect on left, top, and bottom borders */}
                  <div className="absolute -left-px -top-px w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                  <div className="absolute -left-px -top-px w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                  <div className="absolute -left-px -bottom-px w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                </Button>
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X
                  className={`w-6 h-6 ${
                    scrolled
                      ? "text-black hover:text-primary"
                      : "text-white hover:text-pink-500"
                  }`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${
                    scrolled
                      ? "text-black hover:text-primary"
                      : "text-white hover:text-pink-500"
                  }`}
                />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-40">
          <div className="flex flex-col p-6 space-y-6">
            {/* Nav Links */}
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className={`font-medium py-2 transition-all duration-300 relative ${
                    location.pathname === item.href
                      ? "text-white scale-105"
                      : "text-gray-800 hover:text-white hover:scale-105 hover:drop-shadow-lg"
                  }`}
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  <span className={location.pathname === item.href ? "text-shadow-lg drop-shadow-lg" : ""}>{item.label}</span>
                  {/* Light stroke effect for active nav items */}
                  {location.pathname === item.href && (
                    <div className="absolute inset-0 text-transparent" style={{
                      WebkitTextStroke: '1px rgba(255, 255, 255, 0.3)',
                      textShadow: '0 0 8px rgba(255, 255, 255, 0.2)'
                    }}>
                      {item.label}
                    </div>
                  )}
                </Link>
              ))}
            </div>

            {/* CTA */}
            {location.pathname !== '/contact' && (
              <div className="pt-6 space-y-3">
                <Link to="/contact" className="block">
                  <Button variant="gradient" className="w-full" onClick={() => setIsOpen(false)}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Contact
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
