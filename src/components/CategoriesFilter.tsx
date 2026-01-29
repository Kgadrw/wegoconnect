import { Filter } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { api } from "@/lib/api";
import { useCurrency } from "@/contexts/CurrencyContext";

interface CategoriesFilterProps {
  isOpen: boolean;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  priceRange?: { min: number | null; max: number | null };
  onPriceRangeChange?: (range: { min: number | null; max: number | null }) => void;
  setIsOpen?: (isOpen: boolean) => void;
}

const CategoriesFilter = ({ isOpen, selectedCategories, onCategoryToggle, priceRange, onPriceRangeChange }: CategoriesFilterProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const { currency, setCurrency } = useCurrency();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [hasMoved, setHasMoved] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await api.getCategories() as string[];
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  // Global mouse move and up handlers for dragging
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!isDragging || !scrollContainerRef.current) return;
      const rect = scrollContainerRef.current.getBoundingClientRect();
      const currentX = e.pageX - rect.left;
      const walk = currentX - startX;
      
      // Check if mouse moved significantly (more than 5px)
      if (Math.abs(walk) > 5) {
        setHasMoved(true);
        e.preventDefault();
        const scrollWalk = walk * 2; // Scroll speed multiplier
        scrollContainerRef.current.scrollLeft = scrollLeft - scrollWalk;
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      setTimeout(() => setHasMoved(false), 100);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [isDragging, startX, scrollLeft]);

  // Mouse drag handlers for desktop swipe
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    
    // Check if clicking on the "All" button - prevent dragging
    const target = e.target as HTMLElement;
    const button = target.closest('button[data-fixed-button="true"]');
    if (button) {
      return;
    }
    
    setIsDragging(true);
    setHasMoved(false);
    // Calculate start position relative to the container
    const rect = scrollContainerRef.current.getBoundingClientRect();
    setStartX(e.pageX - rect.left);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };


  // Prevent button clicks when dragging
  const handleButtonClick = (e: React.MouseEvent, callback: () => void) => {
    if (hasMoved || isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    callback();
  };

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto px-4 py-3">
        {/* Filter button is now in Header, this component only renders the dropdown */}
        {isOpen && (
          <div className="mt-3 flex flex-col md:flex-row gap-3 items-start md:items-center">
            {/* Categories - Horizontal Scrollable */}
            <div 
              ref={scrollContainerRef}
              className={`flex-1 w-full overflow-x-auto scrollbar-hide ${isDragging ? 'select-none' : ''}`}
              onMouseDown={handleMouseDown}
            >
              <div className="flex gap-2 items-center pb-2 md:pb-0" style={{ minWidth: 'max-content' }}>
                {categories.length === 0 ? (
                  <p className="text-sm text-gray-500 whitespace-nowrap">- - - - - - - -</p>
                ) : (
                  <>
                    {/* All filter button - Fixed, not draggable */}
                    <button
                      onClick={(e) => handleButtonClick(e, () => onCategoryToggle("__all__"))}
                      onMouseDown={(e) => e.stopPropagation()}
                      data-fixed-button="true"
                      className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 whitespace-nowrap flex-shrink-0 ${
                        selectedCategories.length === 0
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted text-foreground hover:bg-accent'
                      }`}
                    >
                      All
                    </button>
                    {/* Category buttons */}
                    {categories.map((category, index) => {
                      const isSelected = selectedCategories.includes(category);
                      return (
                        <button
                          key={category}
                          onClick={(e) => handleButtonClick(e, () => onCategoryToggle(category))}
                          onMouseDown={handleMouseDown}
                          className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 stagger-item whitespace-nowrap flex-shrink-0 ${
                            isSelected
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted text-foreground hover:bg-accent'
                          }`}
                          style={{ animationDelay: `${index * 0.05}s` }}
                        >
                          {category}
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
            {/* Price Range Filter and Currency Toggle */}
            {onPriceRangeChange && (
              <div className="flex items-center gap-2 flex-shrink-0 md:ml-auto">
                {/* Currency Toggle */}
                <div className="flex items-center gap-1 px-2 py-1 border border-gray-300 rounded">
                  <button
                    onClick={() => setCurrency('RWF')}
                    className={`px-2 py-1 text-xs font-medium transition-colors ${
                      currency === 'RWF'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent'
                    }`}
                  >
                    RWF
                  </button>
                  <span className="text-xs text-foreground">|</span>
                  <button
                    onClick={() => setCurrency('USD')}
                    className={`px-2 py-1 text-xs font-medium transition-colors ${
                      currency === 'USD'
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-accent'
                    }`}
                  >
                    USD
                  </button>
                </div>
                {/* Price Range Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground whitespace-nowrap">Price:</span>
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange?.min || ''}
                    onChange={(e) => {
                      const min = e.target.value === '' ? null : parseFloat(e.target.value);
                      onPriceRangeChange({ 
                        min: isNaN(min as number) ? null : min, 
                        max: priceRange?.max || null 
                      });
                    }}
                    className="w-24 px-3 py-2 text-sm border border-gray-300 outline-none transition-all duration-300 focus:border-primary"
                    min="0"
                  />
                  <span className="text-sm text-foreground">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange?.max || ''}
                    onChange={(e) => {
                      const max = e.target.value === '' ? null : parseFloat(e.target.value);
                      onPriceRangeChange({ 
                        min: priceRange?.min || null, 
                        max: isNaN(max as number) ? null : max 
                      });
                    }}
                    className="w-24 px-3 py-2 text-sm border border-gray-300 outline-none transition-all duration-300 focus:border-primary"
                    min="0"
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesFilter;
