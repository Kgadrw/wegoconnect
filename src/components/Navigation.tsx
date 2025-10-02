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

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <nav
      className={`absolute top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? " backdrop-blur-md  shadow-md"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/wego.png" alt="WEGO Logo" className="h-16 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <div className={`hidden md:flex items-center space-x-36 ${isOpen ? "md:hidden" : ""}`}>
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
            <div className={`hidden md:flex items-center space-x-4 ${isOpen ? "md:hidden" : ""}`}>
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

      {/* Mobile Drawer - Slides from right */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm md:hidden z-[60]"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Slide-out panel from right */}
          <div className="fixed top-0 right-0 h-full w-3/4 sm:w-1/2 bg-black/95 backdrop-blur-md shadow-2xl md:hidden z-[70] transform transition-transform duration-300 ease-in-out border-l border-white/10">
            <div className="flex flex-col h-full p-4 sm:p-6 space-y-4 sm:space-y-6">
              {/* Close button */}
              <div className="flex justify-end">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-pink-500"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Nav Links */}
              <div className="flex flex-col space-y-3 flex-1">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`font-medium py-2.5 sm:py-3 px-3 sm:px-4 transition-all duration-300 relative rounded-lg text-sm sm:text-base ${
                      location.pathname === item.href
                        ? "text-white bg-white/10 border border-white/20"
                        : "text-gray-300 hover:text-white hover:bg-white/5 active:scale-95"
                    }`}
                    onClick={() => {
                      setIsOpen(false);
                    }}
                  >
                    <span className="flex items-center gap-2">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>

              {/* CTA */}
              {location.pathname !== '/contact' && (
                <div className="pt-4 sm:pt-6 space-y-3 border-t border-white/10">
                  <Link to="/contact" className="block">
                    <Button className="w-full px-8 py-2 bg-black border-l border-white hover:bg-gray-800 relative text-white font-semibold text-sm sm:text-base" onClick={() => setIsOpen(false)}>
                      <span>Contact</span>
                      {/* Growing light effect on left, top, and bottom borders */}
                      <div className="absolute -left-px -top-px w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                      <div className="absolute -left-px -top-px w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>
                      <div className="absolute -left-px -bottom-px w-full h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navigation;
