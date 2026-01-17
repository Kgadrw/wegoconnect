import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, GripVertical } from "lucide-react";
import { api } from "@/lib/api";
import AlertModal from "@/components/admin/AlertModal";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { SkeletonTable } from "@/components/admin/SkeletonLoader";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  sortOrder?: number;
}

interface SortableRowProps {
  product: Product;
  formatPrice: (price: number) => string;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const SortableRow = ({ product, formatPrice, onEdit, onDelete }: SortableRowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: product._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      className={`hover:bg-gray-50 ${isDragging ? "bg-gray-100" : ""}`}
    >
      <td className="px-6 py-4 whitespace-nowrap cursor-grab active:cursor-grabbing" {...attributes} {...listeners}>
        <GripVertical className="h-5 w-5 text-gray-400 hover:text-gray-600" />
      </td>
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
            onClick={() => onEdit(product)}
            className="text-blue-600 hover:text-blue-900 transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(product._id)}
            className="text-red-600 hover:text-red-900 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </td>
    </tr>
  );
};

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

  // Sortable sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end - update sort order
  // Note: Drag-and-drop only works when there's no search filter for clarity
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    // Skip if search filter is active
    if (searchQuery.trim()) {
      return;
    }

    if (over && active.id !== over.id) {
      const oldIndex = products.findIndex((p) => p._id === active.id);
      const newIndex = products.findIndex((p) => p._id === over.id);

      if (oldIndex === -1 || newIndex === -1) return;

      // Update local state immediately for better UX
      const reorderedProducts = arrayMove(products, oldIndex, newIndex);
      
      // Update sort order for all products
      const updatedProducts = reorderedProducts.map((product, index) => ({
        ...product,
        sortOrder: index,
      }));

      setProducts(updatedProducts);

      // Update sort order in backend
      try {
        const productIds = reorderedProducts.map((p) => p._id);
        await api.updateProductSortOrder(productIds);
        // Reload to ensure consistency
        await loadProducts();
      } catch (error: any) {
        // Revert on error
        await loadProducts();
        setAlert({
          type: "error",
          title: "Error Updating Sort Order",
          message: error.message || "Failed to update product sort order. Please try again.",
        });
      }
    }
  };

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
      setConfirmDelete({ isOpen: false, productId: null });
      await loadProducts();
      setAlert({
        type: "success",
        title: "Product Deleted",
        message: "The product has been deleted successfully.",
      });
    } catch (error: any) {
      setConfirmDelete({ isOpen: false, productId: null });
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
        {searchQuery.trim() && (
          <p className="text-xs text-gray-500 mt-2">
            Note: Drag-and-drop sorting is disabled while searching. Clear the search to sort products.
          </p>
        )}
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                    Drag
                  </th>
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
                    <td colSpan={8} className="px-6 py-4 text-center text-sm text-gray-500">
                    No products found
                  </td>
                </tr>
              ) : (
                  <SortableContext
                    items={filteredProducts.map((p) => p._id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {filteredProducts.map((product) => (
                      <SortableRow
                        key={product._id}
                        product={product}
                        formatPrice={formatPrice}
                        onEdit={handleEditProduct}
                        onDelete={handleDeleteProduct}
                      />
                    ))}
                  </SortableContext>
              )}
            </tbody>
          </table>
          </DndContext>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white shadow-xl max-w-6xl w-full p-6 my-8 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>
            <form onSubmit={handleSubmit}>
              {/* First Row - Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="md:col-span-2">
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
                    className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                  />
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
                    className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                    placeholder="Uncategorized"
                  />
                </div>
              </div>

              {/* Second Row - Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                    className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
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
                    className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                    placeholder="Cost price"
                  />
                  {formData.price && formData.purchasingPrice && (
                    <p className="text-xs text-emerald-600 mt-1">
                      Profit: RWF {(
                        parseFloat(formData.price) - parseFloat(formData.purchasingPrice || "0")
                      ).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount Price (RWF) <span className="text-xs text-gray-500">(Optional)</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.discountPrice}
                    onChange={(e) =>
                      setFormData({ ...formData, discountPrice: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                    placeholder="Leave empty for no discount"
                  />
                  {formData.price && formData.discountPrice && formData.discountPrice.trim() !== "" && 
                   !isNaN(parseFloat(formData.discountPrice)) && parseFloat(formData.discountPrice) < parseFloat(formData.price) && (
                    <p className="text-xs text-green-600 mt-1">
                      {((1 - parseFloat(formData.discountPrice) / parseFloat(formData.price)) * 100).toFixed(0)}% off
                    </p>
                  )}
                  {formData.price && formData.discountPrice && formData.discountPrice.trim() !== "" && 
                   !isNaN(parseFloat(formData.discountPrice)) && parseFloat(formData.discountPrice) >= parseFloat(formData.price) && (
                    <p className="text-xs text-red-600 mt-1">
                      ⚠️ Must be less than regular price
                    </p>
                  )}
                </div>
              </div>

              {/* Third Row - Stock and Description */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
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
                    className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Available quantity
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    required
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none resize-none"
                  />
                </div>
              </div>

              {/* Image Upload Section */}
              <div className="mb-4">
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
                  className="w-full px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none disabled:opacity-50"
                />
                {uploading && (
                  <p className="text-sm text-gray-500 mt-2">Uploading image(s)...</p>
                )}
                <p className="text-xs text-gray-500 mt-1">
                  First image will be used as the primary image.
                </p>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image Previews <span className="text-xs text-gray-500">({imagePreviews.length} image{imagePreviews.length > 1 ? 's' : ''})</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {imagePreviews.map((imageUrl, index) => (
                      <div key={index} className="relative border border-gray-300 overflow-hidden group">
                        {index === 0 && (
                          <div className="absolute top-1 left-1 bg-red-600 text-white text-xs px-1.5 py-0.5 z-10">
                            Primary
                          </div>
                        )}
                        <img
                          src={imageUrl}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover bg-gray-50"
                        />
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-1 right-1 bg-red-600 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                          title="Remove image"
                        >
                          <Trash2 className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete({ isOpen: false, productId: null })}
        onConfirm={confirmDeleteProduct}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* Alert Modal */}
      {alert && (
        <AlertModal
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
};

export default AdminProductsPage;
