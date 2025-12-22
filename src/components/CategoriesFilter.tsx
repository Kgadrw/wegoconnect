import { Filter } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";

interface CategoriesFilterProps {
  isOpen: boolean;
  selectedCategories: string[];
  onCategoryToggle: (category: string) => void;
  setIsOpen?: (isOpen: boolean) => void;
}

const CategoriesFilter = ({ isOpen, selectedCategories, onCategoryToggle }: CategoriesFilterProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await api.getCategories() as string[];
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="w-full bg-background">
      <div className="container mx-auto px-4 py-3">
        {/* Filter button is now in Header, this component only renders the dropdown */}
        {isOpen && (
          <div className="mt-3 flex flex-wrap gap-2">
            {loading ? (
              <div className="flex items-center justify-center w-full py-4">
                <img src="/load.gif" alt="Loading..." className="w-12 h-12" />
              </div>
            ) : categories.length === 0 ? (
              <p className="text-sm text-gray-500">No categories available</p>
            ) : (
              categories.map((category) => {
                const isSelected = selectedCategories.includes(category);
                return (
                  <button
                    key={category}
                    onClick={() => onCategoryToggle(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-accent'
                    }`}
                  >
                    {category}
                  </button>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesFilter;
