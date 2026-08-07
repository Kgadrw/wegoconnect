import { useState, useEffect } from "react";
import Header from "@/components/Header";
import FeaturedProducts from "@/components/FeaturedProducts";
import CategoriesFilter from "@/components/CategoriesFilter";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";
import { StructuredData } from "@/components/StructuredData";
import { api } from "@/lib/api";

const HomePage = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<{ min: number | null; max: number | null }>({ min: null, max: null });
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories for SEO
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

  // SEO Optimization
  const categoryName = selectedCategories.length > 0 ? selectedCategories[0] : null;
  useSEO({
    title: categoryName ? `${categoryName} Products` : undefined,
    description: categoryName 
      ? `Browse ${categoryName} products at WegoConnect. High-quality Starlink internet products and services in Rwanda.`
      : 'Browse our wide selection of Starlink internet products and services. Professional installation and 24/7 support across Rwanda.',
    keywords: categoryName 
      ? `${categoryName}, products, Starlink, internet, Rwanda, WegoConnect`
      : 'Starlink, internet products, Rwanda, WegoConnect, satellite internet, high-speed internet',
    url: window.location.href,
    type: 'website',
    category: categoryName ? { name: categoryName } : undefined,
  });

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
      {/* Structured Data for SEO */}
      <StructuredData type="website" data={{}} />
      {categoryName && (
        <StructuredData
          type="category"
          data={{
            name: categoryName,
            description: `Browse ${categoryName} products at WegoConnect`,
            url: window.location.href,
          }}
        />
      )}
      <Header 
        onFilterClick={() => setIsFilterOpen(!isFilterOpen)} 
        onSearchChange={handleSearchChange}
      />
      <div className={`fixed left-0 right-0 z-40 transition-all duration-500 ${isFilterOpen ? 'opacity-100 animate-slide-in-down' : 'opacity-0 pointer-events-none'}`} style={{ top: '64px' }}>
        <CategoriesFilter 
          isOpen={isFilterOpen}
          selectedCategories={selectedCategories}
          onCategoryToggle={handleCategoryToggle}
          priceRange={priceRange}
          onPriceRangeChange={setPriceRange}
        />
      </div>
      <main className="flex-1 animate-fade-in" style={{ paddingTop: '64px' }}>
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

