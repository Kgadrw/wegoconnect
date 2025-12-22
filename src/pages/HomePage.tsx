import { useState } from "react";
import Header from "@/components/Header";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoriesFilter from "@/components/CategoriesFilter";

const HomePage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        onFilterClick={() => setIsFilterOpen(!isFilterOpen)} 
        onSearchChange={handleSearchChange}
      />
      <div className={`fixed top-16 left-0 right-0 z-40 transition-all duration-300 ${isFilterOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <CategoriesFilter 
          isOpen={isFilterOpen}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
        />
      </div>
      <main className="flex-1 pt-16">
        <div className={isFilterOpen ? 'pt-[73px]' : 'pt-0'}>
          <FeaturedProducts 
            selectedCategories={selectedCategories} 
            searchQuery={searchQuery}
          />
        </div>
      </main>
    </div>
  );
};

export default HomePage;

