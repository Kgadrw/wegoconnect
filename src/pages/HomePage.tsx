import { useState } from "react";
import Header from "@/components/Header";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoriesFilter from "@/components/CategoriesFilter";
import Footer from "@/components/Footer";

const HomePage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<{ min: number | null; max: number | null }>({ min: null, max: null });

  const handleCategoryToggle = (category: string) => {
    if (category === "__all__") {
      // "All" filter - clear selection to show all products
      setSelectedCategories([]);
    } else {
      setSelectedCategories((prev) =>
        prev.includes(category)
          ? [] // Deselect if clicking the same category
          : [category] // Replace with new category (only one active at a time)
      );
    }
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Header 
        onFilterClick={() => setIsFilterOpen(!isFilterOpen)} 
        onSearchChange={handleSearchChange}
      />
      <div className={`fixed top-16 left-0 right-0 z-40 transition-all duration-500 ${isFilterOpen ? 'opacity-100 animate-slide-in-down' : 'opacity-0 pointer-events-none'}`}>
        <CategoriesFilter 
          isOpen={isFilterOpen}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />
      </div>
      <main className="flex-1 pt-16 animate-fade-in">
        <div className={isFilterOpen ? 'pt-[73px]' : 'pt-0'}>
          <FeaturedProducts 
            selectedCategories={selectedCategories} 
            searchQuery={searchQuery}
            priceRange={priceRange}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;

