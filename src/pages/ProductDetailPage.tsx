import { useState, useEffect, useRef } from "react";
import { ShoppingCart, Plus, Minus, ChevronLeft, ChevronRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useCurrency } from "@/contexts/CurrencyContext";
import { useSEO } from "@/hooks/useSEO";
import { StructuredData } from "@/components/StructuredData";
import ShareButton from "@/components/ShareButton";
import { api } from "@/lib/api";
import { useCart } from "@/context/CartContext";

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  monthlyPrice?: number;
  image: string;
  images?: string[];
  category?: string;
  stock?: number;
}

const ProductDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isZooming, setIsZooming] = useState(false);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { formatPrice } = useCurrency();

  // Get all product images (combine image and images array)
  const getAllImages = (product: Product): string[] => {
    if (product.images && product.images.length > 0) {
      return [product.image, ...product.images];
    }
    return [product.image];
  };

  // Auto-play carousel
  useEffect(() => {
    if (!product) return;
    
    const allImages = getAllImages(product);
    if (allImages.length <= 1) return;

    if (isAutoPlaying) {
      autoPlayIntervalRef.current = setInterval(() => {
        setSelectedImageIndex((prevIndex) => 
          (prevIndex + 1) % allImages.length
        );
      }, 3000); // Change image every 3 seconds
    }

    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [product, isAutoPlaying]);

  const handlePreviousImage = () => {
    if (!product) return;
    const allImages = getAllImages(product);
    setSelectedImageIndex((prevIndex) => 
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
    setIsAutoPlaying(false); // Pause auto-play when manually navigating
  };

  const handleNextImage = () => {
    if (!product) return;
    const allImages = getAllImages(product);
    setSelectedImageIndex((prevIndex) => 
      (prevIndex + 1) % allImages.length
    );
    setIsAutoPlaying(false); // Pause auto-play when manually navigating
  };

  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    setIsAutoPlaying(false); // Pause auto-play when clicking thumbnail
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) {
        navigate("/");
        return;
      }

      try {
        setLoading(true);
        const productData = await api.getProduct(id) as Product;
        setProduct(productData);

        // Fetch related products (same category, excluding current product)
        const allProducts = await api.getProducts({ category: productData.category || "" }) as Product[];
        const related = allProducts
          .filter((p: Product) => p._id !== id && (p as any).isActive !== false)
          .slice(0, 5);
        setRelatedProducts(related);
      } catch (error) {
        console.error("Error fetching product:", error);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // SEO Optimization
  useSEO({
    title: product?.name,
    description: product?.description || `${product?.name} - Available at WegoConnect. ${product?.category ? `Browse ${product.category} products.` : ''}`,
    keywords: `${product?.name}, ${product?.category || 'products'}, Starlink, internet, Rwanda, WegoConnect`,
    image: product?.image,
    url: `${window.location.origin}/product/${product?._id}`,
    type: 'product',
    product: product ? {
      name: product.name,
      description: product.description,
      price: product.discountPrice && product.discountPrice < product.price ? product.discountPrice : product.price,
      currency: 'RWF',
      availability: (product.stock || 0) > 0 ? 'InStock' : 'OutOfStock',
      image: product.image,
      category: product.category || 'Uncategorized',
    } : undefined,
  });

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header onFilterClick={() => {}} />
        <main className="flex-1 pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center py-12">
              <img src="/load.gif" alt="Loading..." className="w-16 h-16" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header onFilterClick={() => {}} />
        <main className="flex-1 pt-16">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center py-12">
              <p className="text-gray-500">Product not found</p>
              <Link to="/" className="text-red-600 hover:underline mt-4 inline-block">
                Go back to home
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Breadcrumbs for SEO
  const breadcrumbs = [
    { name: 'Home', url: window.location.origin },
    ...(product.category ? [{ name: product.category, url: `${window.location.origin}/?category=${encodeURIComponent(product.category)}` }] : []),
    { name: product.name, url: window.location.href },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background animate-fade-in">
      {/* Structured Data for SEO */}
      {product && (
        <>
          <StructuredData
            type="product"
            data={{
              name: product.name,
              description: product.description,
              image: product.image,
              price: product.discountPrice && product.discountPrice < product.price ? product.discountPrice : product.price,
              currency: 'RWF',
              availability: (product.stock || 0) > 0 ? 'InStock' : 'OutOfStock',
              category: product.category || 'Uncategorized',
              sku: product._id,
              brand: 'WegoConnect',
            }}
          />
          <StructuredData type="breadcrumb" data={{}} breadcrumbs={breadcrumbs} />
        </>
      )}
      <Header onFilterClick={() => {}} />
      <main className="flex-1 pt-16">
        <div className="container mx-auto px-4 py-8">
          {/* Product Detail */}
          <div className="grid gap-4 lg:grid-cols-2 mb-16 items-start">
            {/* Product Images Gallery */}
            <div className="w-full max-w-md mx-auto lg:mx-0 animate-slide-in-left">
              {(() => {
                const allImages = getAllImages(product);
                return (
                  <>
                    {/* Main Image with Carousel */}
                    <div 
                      ref={imageContainerRef}
                      className="aspect-square overflow-hidden bg-transparent flex items-center justify-center mb-4 border border-gray-200 rounded-lg relative group cursor-zoom-in"
                      onMouseEnter={() => {
                        setIsAutoPlaying(false);
                        setIsZooming(true);
                      }}
                      onMouseLeave={() => {
                        setIsAutoPlaying(true);
                        setIsZooming(false);
                      }}
                      onMouseMove={handleMouseMove}
                    >
                      {/* Image with zoom effect */}
                      <div className="w-full h-full overflow-hidden">
                        <img
                          key={selectedImageIndex}
                          src={allImages[selectedImageIndex]}
                          alt={`${product.name} - Image ${selectedImageIndex + 1}`}
                          className={`w-full h-full object-contain transition-all duration-300 ${
                            isZooming ? 'scale-150' : 'scale-100'
                          }`}
                          style={{
                            transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                          }}
                        />
                      </div>
                      
                      {/* Navigation Arrows */}
                      {allImages.length > 1 && (
                        <>
                          <button
                            onClick={handlePreviousImage}
                            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Previous image"
                          >
                            <ChevronLeft className="h-6 w-6" />
                          </button>
                          <button
                            onClick={handleNextImage}
                            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Next image"
                          >
                            <ChevronRight className="h-6 w-6" />
                          </button>
                          
                          {/* Image Indicators */}
                          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                            {allImages.map((_, index) => (
                              <button
                                key={index}
                                onClick={() => handleThumbnailClick(index)}
                                className={`h-2 transition-all ${
                                  selectedImageIndex === index
                                    ? 'w-8 bg-white'
                                    : 'w-2 bg-white/50 hover:bg-white/75'
                                }`}
                                aria-label={`Go to image ${index + 1}`}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    
                    {/* Thumbnail Gallery */}
                    {allImages.length > 1 && (
                      <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                        {allImages.map((imageUrl, index) => (
                          <button
                            key={index}
                            onClick={() => handleThumbnailClick(index)}
                            className={`aspect-square overflow-hidden border-2 transition-all ${
                              selectedImageIndex === index
                                ? 'border-red-600 ring-2 ring-red-200'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <img
                              src={imageUrl}
                              alt={`${product.name} thumbnail ${index + 1}`}
                              className="w-full h-full object-contain bg-gray-50"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Product Details */}
            <div className="flex flex-col justify-center space-y-6">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <p className="text-muted-foreground">{product.description}</p>
              <div className="flex items-center gap-3 flex-wrap">
                {product.discountPrice && product.discountPrice < product.price ? (
                  <>
                    <p className="text-2xl font-bold line-through text-gray-400">
                      {formatPrice(product.price)}
                    </p>
                    <p className="text-2xl font-bold text-red-600">
                      {formatPrice(product.discountPrice)}
                    </p>
                    {product.monthlyPrice && (
                      <p className="text-xl text-muted-foreground">
                        or {formatPrice(product.monthlyPrice)}/month
                      </p>
                    )}
                  </>
                ) : (
                  <p className="text-2xl font-bold">
                    {formatPrice(product.price)}
                    {product.monthlyPrice && ` or ${formatPrice(product.monthlyPrice)}/month`}
                  </p>
                )}
              </div>
              
              {/* Quantity Controls */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 border rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-accent transition-colors"
                    disabled={(product.stock || 0) === 0}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="px-4 py-2 min-w-[3rem] text-center font-semibold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min((product.stock || 0), quantity + 1))}
                    className="p-2 hover:bg-accent transition-colors"
                    disabled={(product.stock || 0) === 0 || quantity >= (product.stock || 0)}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                {(product.stock || 0) > 0 && (
                  <span className="text-sm text-muted-foreground">
                    ({product.stock} in stock)
                  </span>
                )}
              </div>

              <div className="flex gap-3 items-center">
                {(product.stock || 0) === 0 ? (
                  <img
                    src="/soldout.png"
                    alt="Sold Out"
                    className="h-12 w-auto object-contain"
                  />
                ) : (
                  <button
                    onClick={async () => {
                      if (!product) return;
                      setAddingToCart(true);
                      try {
                        const finalPrice = (product.discountPrice && product.discountPrice < product.price) 
                          ? product.discountPrice 
                          : product.price;
                        addToCart(
                          {
                            _id: product._id,
                            name: product.name,
                            price: finalPrice,
                            image: product.image,
                          },
                          quantity
                        );
                        // Show success feedback (you can add a toast notification here)
                        setTimeout(() => setAddingToCart(false), 500);
                      } catch (error) {
                        console.error("Error adding to cart:", error);
                        setAddingToCart(false);
                      }
                    }}
                    disabled={addingToCart || (product.stock || 0) < quantity}
                    className="bg-red-600 px-6 py-1 text-base font-semibold text-white transition-all duration-300 hover:bg-red-700 hover:scale-105 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {addingToCart ? "Adding..." : "Add to Cart"}
                  </button>
                )}
                <ShareButton
                  productName={product.name}
                  productUrl={`/product/${id || product._id}`}
                  productPrice={formatPrice(product.price)}
                />
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 animate-slide-in-up">Related Products</h2>
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {relatedProducts.map((relatedProduct, index) => (
                <Link
                  key={relatedProduct._id}
                  to={`/product/${relatedProduct._id}`}
                  className="group block stagger-item hover-lift"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-transparent aspect-square overflow-hidden mb-2 flex items-center justify-center">
                    <img
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-semibold text-foreground mb-1">{relatedProduct.name}</p>
                    <div className="flex items-center justify-center gap-2">
                      {relatedProduct.discountPrice && relatedProduct.discountPrice < relatedProduct.price ? (
                        <>
                          <p className="text-base font-bold text-foreground line-through text-gray-400">
                            {formatPrice(relatedProduct.price)}
                          </p>
                          <p className="text-base font-bold text-red-600">
                            {formatPrice(relatedProduct.discountPrice)}
                          </p>
                        </>
                      ) : (
                        <p className="text-base font-bold text-foreground">{formatPrice(relatedProduct.price)}</p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;

