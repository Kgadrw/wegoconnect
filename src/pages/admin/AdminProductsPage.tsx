import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search } from "lucide-react";
import { api } from "@/lib/api";
import AlertModal from "@/components/admin/AlertModal";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { SkeletonTable } from "@/components/admin/SkeletonLoader";

interface Product {
  _id: string;
  name: string;
  price: number;
  purchasingPrice?: number;
  discountPrice?: number | null;
  image: string;
  images?: string[];
  description: string;
  category?: string;
  stock?: number;
  isActive?: boolean;
}

const AdminProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    purchasingPrice: "",
    discountPrice: "",
    image: "",
    description: "",
    category: "",
    stock: "",
  });
  const [uploading, setUploading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [alert, setAlert] = useState<{ type: "success" | "error" | "warning" | "info"; title: string; message: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean; productId: string | null }>({ isOpen: false, productId: null });

  // Load products
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const data = await api.getProducts({ search: searchQuery });
      setProducts(data);
    } catch (error: any) {
      setAlert({
        type: "error",
        title: "Error Loading Products",
        message: error.message || "Failed to load products. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddProduct = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      price: "",
      purchasingPrice: "",
      discountPrice: "",
      image: "",
      description: "",
      category: "",
      stock: "",
    });
    setImagePreviews([]);
    setShowModal(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    // Combine image and images array, removing duplicates
    const allImages = product.images && product.images.length > 0 
      ? [product.image, ...product.images].filter((img, index, arr) => arr.indexOf(img) === index)
      : [product.image];
    
    setFormData({
      name: product.name,
      price: product.price.toString(),
      purchasingPrice: (product as any).purchasingPrice?.toString() || "0",
      discountPrice: product.discountPrice?.toString() || "",
      image: product.image,
      description: product.description,
      category: product.category || "",
      stock: product.stock?.toString() || "0",
    });
    setImagePreviews(allImages);
    setShowModal(true);
  };

  const handleDeleteProduct = (id: string) => {
    setConfirmDelete({ isOpen: true, productId: id });
  };

  const confirmDeleteProduct = async () => {
    if (!confirmDelete.productId) return;
    try {
      await api.deleteProduct(confirmDelete.productId);
      await loadProducts();
      setAlert({
        type: "success",
        title: "Product Deleted",
        message: "The product has been deleted successfully.",
      });
    } catch (error: any) {
      setAlert({
        type: "error",
        title: "Error Deleting Product",
        message: error.message || "Failed to delete product. Please try again.",
      });
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setUploading(true);
      const uploadPromises = Array.from(files).map(file => api.uploadImage(file));
      const results = await Promise.all(uploadPromises);
      const newImageUrls = results.map(result => result.secure_url);
      
      // Update images array (first image is also the primary image)
      const updatedImages = [...imagePreviews, ...newImageUrls];
      setImagePreviews(updatedImages);
      setFormData({ ...formData, image: updatedImages[0] || formData.image });
    } catch (error: any) {
      setAlert({
        type: "error",
        title: "Upload Failed",
        message: error.message || "Failed to upload image(s). Please try again.",
      });
    } finally {
      setUploading(false);
      // Reset input so same file can be selected again
      e.target.value = '';
    }
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const updatedImages = imagePreviews.filter((_, index) => index !== indexToRemove);
    setImagePreviews(updatedImages);
    // Update primary image if we removed the first one
    if (indexToRemove === 0 && updatedImages.length > 0) {
      setFormData({ ...formData, image: updatedImages[0] });
    } else if (updatedImages.length === 0) {
      setFormData({ ...formData, image: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Parse discount price - convert empty string to null
      let discountPriceValue: number | null = null;
      if (formData.discountPrice && formData.discountPrice.trim() !== "") {
        const parsed = parseFloat(formData.discountPrice);
        if (!isNaN(parsed) && parsed >= 0) {
          discountPriceValue = parsed;
        }
      }

      // Prepare images array (exclude the primary image from the array)
      const imagesArray = imagePreviews.length > 1 
        ? imagePreviews.slice(1) // All images except the first one
        : [];

      const productData: any = {
        name: formData.name,
        price: parseFloat(formData.price),
        purchasingPrice: formData.purchasingPrice ? parseFloat(formData.purchasingPrice) : 0,
        image: imagePreviews[0] || formData.image, // Primary image (first in array)
        images: imagesArray, // Additional images
        description: formData.description,
        category: formData.category || "Uncategorized",
        stock: formData.stock ? parseInt(formData.stock) : 0,
      };

      // Always include discountPrice in the update (even if null)
      productData.discountPrice = discountPriceValue;

      if (editingProduct) {
        await api.updateProduct(editingProduct._id, productData);
      } else {
        await api.createProduct(productData);
      }

      setShowModal(false);
      await loadProducts();
      setFormData({
        name: "",
        price: "",
        purchasingPrice: "",
        discountPrice: "",
        image: "",
        description: "",
        category: "",
        stock: "",
      });
      setImagePreviews([]);
      setAlert({
        type: "success",
        title: "Product Saved",
        message: editingProduct ? "Product updated successfully." : "Product created successfully.",
      });
    } catch (error: any) {
      setAlert({
        type: "error",
        title: "Error Saving Product",
        message: error.message || "Failed to save product. Please try again.",
      });
    }
  };

  const formatPrice = (price: number) => {
    return `RWF ${price.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
  };

  if (loading && products.length === 0) {
    return (
      <div className="space-y-6">
        {/* Page Header Skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-9 bg-gray-200 rounded w-48 mb-2 animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse"></div>
        </div>

        {/* Search Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
          <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Table Skeleton */}
        <SkeletonTable />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product inventory</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center gap-2"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
          />
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Image
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-4 text-center text-sm text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="w-16 h-16 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-sm text-gray-500 truncate max-w-xs">
                          {product.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {product.category || "Uncategorized"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`font-medium ${
                        (product.stock || 0) === 0 
                          ? "text-red-600 font-bold" 
                          : "text-gray-700"
                      }`}>
                        {product.stock ?? "N/A"}
                        {(product.stock || 0) === 0 && (
                          <span className="ml-2 text-xs text-red-600 font-bold">(Out of Stock)</span>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          product.isActive !== false
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product.isActive !== false ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          className="text-red-600 hover:text-red-900 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full p-6 my-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Selling Price (RWF)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) =>
                        setFormData({ ...formData, price: e.target.value })
                      }
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                      placeholder="Price shown to customers"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Purchasing Price (RWF)
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.purchasingPrice}
                      onChange={(e) =>
                        setFormData({ ...formData, purchasingPrice: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                      placeholder="Cost price for profit calculation"
                    />
                    {formData.price && formData.purchasingPrice && (
                      <p className="text-sm text-emerald-600 mt-1 font-medium">
                        Profit: RWF {(
                          parseFloat(formData.price) - parseFloat(formData.purchasingPrice || "0")
                        ).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount Price (RWF) <span className="text-xs text-gray-500">(Optional - Promotion)</span>
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.discountPrice}
                      onChange={(e) =>
                        setFormData({ ...formData, discountPrice: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                      placeholder="Leave empty for no discount"
                    />
                    {formData.price && formData.discountPrice && formData.discountPrice.trim() !== "" && 
                     !isNaN(parseFloat(formData.discountPrice)) && parseFloat(formData.discountPrice) < parseFloat(formData.price) && (
                      <p className="text-sm text-green-600 mt-1 font-medium">
                        Discount: {((1 - parseFloat(formData.discountPrice) / parseFloat(formData.price)) * 100).toFixed(0)}% off
                        <span className="ml-2 text-gray-600">
                          (Original: {formatPrice(parseFloat(formData.price))} → Discounted: {formatPrice(parseFloat(formData.discountPrice))})
                        </span>
                      </p>
                    )}
                    {formData.price && formData.discountPrice && formData.discountPrice.trim() !== "" && 
                     !isNaN(parseFloat(formData.discountPrice)) && parseFloat(formData.discountPrice) >= parseFloat(formData.price) && (
                      <p className="text-sm text-red-600 mt-1 font-medium">
                        ⚠️ Discount price must be less than regular price
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                      placeholder="Uncategorized"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={formData.stock}
                      onChange={(e) =>
                        setFormData({ ...formData, stock: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                      placeholder="0"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Enter the available quantity. Product will be marked as sold out when stock reaches 0.
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none resize-none"
                    />
                  </div>
                </div>

                {/* Right Column - Image Upload */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Product Images <span className="text-xs text-gray-500">(Multiple images allowed)</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageChange}
                      disabled={uploading}
                      required={!editingProduct && imagePreviews.length === 0}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none disabled:opacity-50"
                    />
                    {uploading && (
                      <p className="text-sm text-gray-500 mt-2">Uploading image(s)...</p>
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      You can select multiple images at once. The first image will be used as the primary image.
                    </p>
                  </div>
                  {imagePreviews.length > 0 && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image Previews {imagePreviews.length > 0 && <span className="text-xs text-gray-500">({imagePreviews.length} image{imagePreviews.length > 1 ? 's' : ''})</span>}
                      </label>
                      <div className="grid grid-cols-2 gap-4">
                        {imagePreviews.map((imageUrl, index) => (
                          <div key={index} className="relative border border-gray-300 rounded-lg overflow-hidden group">
                            {index === 0 && (
                              <div className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded z-10">
                                Primary
                              </div>
                            )}
                            <img
                              src={imageUrl}
                              alt={`Preview ${index + 1}`}
                              className="w-full h-auto max-h-48 object-contain bg-gray-50"
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
                              title="Remove image"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-6 mt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors"
                >
                  {editingProduct ? "Update" : "Add"} Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductsPage;
