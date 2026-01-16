import { Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

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

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto px-4 py-3">
        {/* Filter button is now in Header, this component only renders the dropdown */}
        {isOpen && (
          <div className="mt-3 flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.length === 0 ? (
                <p className="text-sm text-gray-500">No categories available</p>
              ) : (
                <>
                  {/* All filter button */}
                  <button
                    onClick={() => onCategoryToggle("__all__")}
                    className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 ${
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
                        onClick={() => onCategoryToggle(category)}
                        className={`px-4 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 stagger-item ${
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
            {/* Price Range Filter */}
            {onPriceRangeChange && (
              <div className="flex items-center gap-2 ml-auto">
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
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesFilter;
