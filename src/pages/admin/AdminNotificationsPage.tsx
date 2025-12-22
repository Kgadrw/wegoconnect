import { useState, useEffect } from "react";
import { Bell, X, RefreshCw, Package, ExternalLink } from "lucide-react";
import { api } from "@/lib/api";
import { Link } from "react-router-dom";
import { SkeletonList } from "@/components/admin/SkeletonLoader";

interface OutOfStockProduct {
  _id: string;
  name: string;
  category?: string;
  price: number;
  image?: string;
}

const AdminNotificationsPage = () => {
  const [outOfStockProducts, setOutOfStockProducts] = useState<OutOfStockProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [dismissedProducts, setDismissedProducts] = useState<Set<string>>(
    new Set(JSON.parse(localStorage.getItem("dismissedStockAlerts") || "[]"))
  );

  useEffect(() => {
    fetchOutOfStockProducts();
  }, []);

  const fetchOutOfStockProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getDashboardStats();
      const products = (data as any).outOfStockProducts || [];
      setOutOfStockProducts(products);
    } catch (error) {
      console.error("Error fetching out of stock products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = (productId: string) => {
    const newDismissed = new Set(dismissedProducts);
    newDismissed.add(productId);
    setDismissedProducts(newDismissed);
    localStorage.setItem("dismissedStockAlerts", JSON.stringify(Array.from(newDismissed)));
  };

  const handleDismissAll = () => {
    const allIds = new Set(outOfStockProducts.map((p) => p._id));
    setDismissedProducts(allIds);
    localStorage.setItem("dismissedStockAlerts", JSON.stringify(Array.from(allIds)));
  };

  const visibleProducts = outOfStockProducts.filter(
    (product) => !dismissedProducts.has(product._id)
  );

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Page Header Skeleton */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 bg-gray-200 rounded-lg animate-pulse"></div>
            <div>
              <div className="h-9 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
              <div className="h-5 bg-gray-200 rounded w-64 animate-pulse"></div>
            </div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>

        {/* List Skeleton */}
        <SkeletonList count={5} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="p-3 bg-red-600 rounded-xl shadow-sm">
              <Bell className="h-6 w-6 text-white" />
            </div>
            {visibleProducts.length > 0 && (
              <span className="absolute -top-1 -right-1 flex items-center justify-center w-6 h-6 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white">
                {visibleProducts.length}
              </span>
            )}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
            <p className="text-gray-500 mt-1">
              {visibleProducts.length > 0
                ? `${visibleProducts.length} ${visibleProducts.length === 1 ? "notification" : "notifications"} require your attention`
                : "All caught up! No new notifications"}
            </p>
          </div>
        </div>
        <button
          onClick={fetchOutOfStockProducts}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        >
          <RefreshCw className="h-4 w-4" />
          Refresh
        </button>
      </div>

      {/* Notifications List */}
      {visibleProducts.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 rounded-full mb-6">
              <Bell className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">All caught up!</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              You have no active notifications. All products are in stock and everything is running smoothly.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {visibleProducts.length > 1 && (
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm text-gray-600">
                {visibleProducts.length} out of stock {visibleProducts.length === 1 ? "product" : "products"}
              </p>
              <button
                onClick={handleDismissAll}
                className="text-sm text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Dismiss All
              </button>
            </div>
          )}

          {visibleProducts.map((product, index) => (
            <div
              key={product._id}
              className="bg-white rounded-xl border border-gray-200 hover:border-red-300 hover:shadow-md transition-all duration-200"
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  {/* Bell Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <div className="p-2 bg-red-50 rounded-lg">
                      <Bell className="h-5 w-5 text-red-600" />
                    </div>
                  </div>

                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    {product.image ? (
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                      />
                    ) : (
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
                        <Package className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-base font-semibold text-gray-900">{product.name}</h3>
                          <span className="px-2 py-0.5 text-xs font-bold text-red-700 bg-red-100 rounded-md">
                            Out of Stock
                          </span>
                        </div>
                        {product.category && (
                          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                        )}
                        <p className="text-sm font-medium text-gray-700">
                          RWF {product.price.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <Link
                          to="/admin/products"
                          className="flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                          <span>Manage</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                        <button
                          onClick={() => handleDismiss(product._id)}
                          className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-gray-600"
                          title="Dismiss notification"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminNotificationsPage;

