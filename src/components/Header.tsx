import { Search, Filter, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import TopBanner from "./TopBanner";

interface HeaderProps {
  onFilterClick: () => void;
  onSearchChange?: (searchQuery: string) => void;
}

const Header = ({ onFilterClick, onSearchChange }: HeaderProps) => {
  const { getTotalItems } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+K (Windows/Linux) or Cmd+K (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // Close search with Escape key
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
        setSearchQuery("");
        if (onSearchChange) {
          onSearchChange("");
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, onSearchChange]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearchChange) {
      onSearchChange(value);
    }
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchQuery("");
      if (onSearchChange) {
        onSearchChange("");
      }
    }
  };

  return (
    <div className="sticky top-0 z-50 w-full">
      <TopBanner />
      <header className="w-full bg-background animate-slide-in-down">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img 
              src="/wego.png" 
              alt="Wego Logo" 
              className="h-10 w-auto"
            />
          </Link>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={onFilterClick}
              className="p-2 text-foreground"
            >
              <Filter className="h-5 w-5" />
            </button>
            {isSearchOpen ? (
              <div className="flex items-center gap-2 animate-scale-in">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="Search products..."
                    className="pl-10 pr-4 py-2 border border-gray-300 outline-none w-64 transition-all duration-300 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleSearchToggle}
                  className="p-2 text-foreground"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <button 
                onClick={handleSearchToggle}
                className="p-2 text-foreground"
              >
                <Search className="h-5 w-5" />
              </button>
            )}
            <Link 
              to="/cart"
              className="relative p-2 text-foreground transition-all duration-300 hover:text-primary hover:scale-110"
            >
              <img 
                src="/cart.png" 
                alt="Cart" 
                className="h-5 w-5"
              />
              {getTotalItems() > 0 && (
                <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground animate-bounce-slow">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;

