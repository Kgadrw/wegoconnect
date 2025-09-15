"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ShoppingCart } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: "Home", href: "#home" },
    { label: "Services", href: "/services" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#contact" },
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
      className={`relative transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-border shadow-md"
          : "bg-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src="/images.jpeg" alt="WEGO Logo" className="h-16 w-auto" />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-32">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setActiveSection(item.href.substring(1))}
                className={`transition-colors duration-300 font-medium relative ${
                  activeSection === item.href.substring(1)
                    ? "text-primary"
                    : scrolled
                    ? "text-black hover:text-primary"
                    : "text-white hover:text-pink-500"
                }`}
              >
                {item.label}
                {activeSection === item.href.substring(1) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"></span>
                )}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="bg-gray-900 text-white hover:bg-gray-700 px-8 py-2">
              Contact
            </Button>
          </div>

          {/* Mobile Toggle (hidden on desktop) */}
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

      {/* Mobile Drawer (absolute so it scrolls with page) */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden z-40">
          <div className="flex flex-col p-6 space-y-6">
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

            {/* CTA */}
            <div className="pt-6 space-y-3">
              <Button className="bg-gray-900 text-white hover:bg-gray-700 w-full">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
