import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/priceFormatter";
import { api } from "@/lib/api";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number | null;
  image: string;
  isActive?: boolean;
  category?: string;
  stock?: number;
}

interface FeaturedProductsProps {
  selectedCategories?: string[];
  searchQuery?: string;
}

const ProductCard = ({ product }: { product: Product }) => {
  const isOutOfStock = (product.stock || 0) === 0;
  
  return (
    <Link to={`/product/${product._id}`} className="group block relative">
      <div className="bg-transparent aspect-square overflow-hidden mb-2 flex items-center justify-center relative">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 ${isOutOfStock ? 'opacity-50' : ''}`}
        />
        {isOutOfStock && (
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="/soldout.png"
              alt="Sold Out"
              className="w-full h-full object-contain"
            />
          </div>
        )}
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold text-foreground mb-1">{product.name}</p>
        <div className="flex items-center justify-center gap-2">
          {product.discountPrice && product.discountPrice < product.price ? (
            <>
              <p className="text-base font-bold text-foreground line-through text-gray-400">
                {formatPrice(product.price)}
              </p>
              <p className="text-base font-bold text-red-600">
                {formatPrice(product.discountPrice)}
              </p>
            </>
          ) : (
            <p className="text-base font-bold text-foreground">{formatPrice(product.price)}</p>
          )}
        </div>
      </div>
    </Link>
  );
};

const FeaturedProducts = ({ selectedCategories = [], searchQuery = "" }: FeaturedProductsProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set loading immediately and clear products
    setLoading(true);
    setProducts([]);

    const fetchProducts = async () => {
      try {
        // Use search query in API call if provided
        const apiParams: { isActive: string; search?: string } = { isActive: "true" };
        if (searchQuery.trim()) {
          apiParams.search = searchQuery.trim();
        }
        
        let data = await api.getProducts(apiParams) as Product[];
        
        // Filter by selected categories if any are selected (only if not searching)
        if (selectedCategories.length > 0 && !searchQuery.trim()) {
          data = data.filter((product) =>
            product.category && selectedCategories.includes(product.category)
          );
        }
        
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategories, searchQuery]);

  if (loading) {
    return (
      <section id="products" className="bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center py-12">
            <img src="/load.gif" alt="Loading..." className="w-16 h-16" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="bg-background">
      <div className="container mx-auto px-4 py-6">
        {products.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No products available</p>
          </div>
        ) : (
          <div className="grid gap-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;

