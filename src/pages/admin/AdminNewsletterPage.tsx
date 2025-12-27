import { useState, useEffect } from "react";
import { Mail, Plus, Save, Edit, Trash2, Send, X, Check, Package, Eye, Type, Bold, Italic, Search, Users, Calendar } from "lucide-react";
import { api } from "@/lib/api";
import { formatPrice } from "@/lib/priceFormatter";
import AlertModal from "@/components/admin/AlertModal";
import ConfirmModal from "@/components/admin/ConfirmModal";
import { SkeletonTable, SkeletonForm } from "@/components/admin/SkeletonLoader";

interface Product {
  _id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
}

interface Template {
  _id: string;
  name: string;
  subject: string;
  content: string;
  productIds: string[];
  includeLatestProducts: boolean;
  latestProductsCount: number;
  isDefault: boolean;
}

const AdminNewsletterPage = () => {
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error" | "warning" | "info"; title: string; message: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ isOpen: boolean; templateId: string | null }>({ isOpen: false, templateId: null });
  
  // Newsletter form state
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [includeLatestProducts, setIncludeLatestProducts] = useState(false);
  const [latestProductsCount, setLatestProductsCount] = useState(10);
  const [sendToAll, setSendToAll] = useState(true);
  const [showPreview, setShowPreview] = useState(false);
  const [showSubscribers, setShowSubscribers] = useState(false);
  const [subscriberSearch, setSubscriberSearch] = useState("");
  const [subscriberStatusFilter, setSubscriberStatusFilter] = useState<string>("All");

  // Template form state
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<Template | null>(null);
  const [templateName, setTemplateName] = useState("");
  const [templateSubject, setTemplateSubject] = useState("");
  const [templateContent, setTemplateContent] = useState("");
  const [templateProductIds, setTemplateProductIds] = useState<string[]>([]);
  const [templateIncludeLatest, setTemplateIncludeLatest] = useState(false);
  const [templateLatestCount, setTemplateLatestCount] = useState(10);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [subsData, prodsData, templatesData] = await Promise.all([
        api.getNewsletterSubscribers(),
        api.getRecentProductsForNewsletter(50),
        api.getNewsletterTemplates(),
      ]);
      setSubscribers(subsData.subscribers || []);
      setProducts(prodsData || []);
      setTemplates(templatesData || []);
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleProductToggle = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
    const template = templates.find((t) => t._id === templateId);
    if (template) {
      setSubject(template.subject);
      setContent(template.content);
      setSelectedProducts(template.productIds || []);
      setIncludeLatestProducts(template.includeLatestProducts);
      setLatestProductsCount(template.latestProductsCount);
    }
  };

  const handleSendNewsletter = async () => {
    if (!subject.trim()) {
      setAlert({
        type: "warning",
        title: "Missing Subject",
        message: "Please enter a subject for your newsletter.",
      });
      return;
    }

    try {
      setSending(true);
      await api.sendNewsletter({
        subject,
        content,
        productIds: selectedProducts.length > 0 ? selectedProducts : undefined,
        templateId: selectedTemplate || undefined,
        sendToAll,
        includeLatestProducts,
        latestProductsCount,
      });
      setAlert({
        type: "success",
        title: "Newsletter Sent",
        message: "Your newsletter is being sent to subscribers.",
      });
      // Reset form
      setSubject("");
      setContent("");
      setSelectedProducts([]);
      setSelectedTemplate("");
      setIncludeLatestProducts(false);
    } catch (error: any) {
      setAlert({
        type: "error",
        title: "Error Sending Newsletter",
        message: error.message || "Failed to send newsletter. Please try again.",
      });
    } finally {
      setSending(false);
    }
  };

  const handleSaveTemplate = async () => {
    if (!templateName.trim() || !templateSubject.trim()) {
      setAlert({
        type: "warning",
        title: "Missing Information",
        message: "Please enter template name and subject.",
      });
      return;
    }

    try {
      if (editingTemplate) {
        await api.updateNewsletterTemplate(editingTemplate._id, {
          name: templateName,
          subject: templateSubject,
          content: templateContent,
          productIds: templateProductIds,
          includeLatestProducts: templateIncludeLatest,
          latestProductsCount: templateLatestCount,
        });
      } else {
        await api.createNewsletterTemplate({
          name: templateName,
          subject: templateSubject,
          content: templateContent,
          productIds: templateProductIds,
          includeLatestProducts: templateIncludeLatest,
          latestProductsCount: templateLatestCount,
        });
      }
      await loadData();
      setShowTemplateModal(false);
      resetTemplateForm();
      setAlert({
        type: "success",
        title: "Template Saved",
        message: editingTemplate ? "Template updated successfully." : "Template created successfully.",
      });
    } catch (error: any) {
      setAlert({
        type: "error",
        title: "Error Saving Template",
        message: error.message || "Failed to save template. Please try again.",
      });
    }
  };

  const handleEditTemplate = (template: Template) => {
    setEditingTemplate(template);
    setTemplateName(template.name);
    setTemplateSubject(template.subject);
    setTemplateContent(template.content);
    setTemplateProductIds(template.productIds || []);
    setTemplateIncludeLatest(template.includeLatestProducts);
    setTemplateLatestCount(template.latestProductsCount);
    setShowTemplateModal(true);
  };

  const handleDeleteTemplate = (id: string) => {
    setConfirmDelete({ isOpen: true, templateId: id });
  };

  const confirmDeleteTemplate = async () => {
    if (!confirmDelete.templateId) return;
    try {
      await api.deleteNewsletterTemplate(confirmDelete.templateId);
      await loadData();
      setAlert({
        type: "success",
        title: "Template Deleted",
        message: "The template has been deleted successfully.",
      });
    } catch (error: any) {
      setAlert({
        type: "error",
        title: "Error Deleting Template",
        message: error.message || "Failed to delete template. Please try again.",
      });
    }
  };

  const resetTemplateForm = () => {
    setEditingTemplate(null);
    setTemplateName("");
    setTemplateSubject("");
    setTemplateContent("");
    setTemplateProductIds([]);
    setTemplateIncludeLatest(false);
    setTemplateLatestCount(10);
  };

  if (loading) {
    return (
      <div className="space-y-6">
        {/* Page Header Skeleton */}
        <div className="flex items-center justify-between">
          <div>
            <div className="h-9 bg-gray-200 rounded w-40 mb-2 animate-pulse"></div>
            <div className="h-5 bg-gray-200 rounded w-64 animate-pulse"></div>
          </div>
          <div className="h-10 bg-gray-200 rounded w-40 animate-pulse"></div>
        </div>

        {/* Templates Section Skeleton */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="h-6 bg-gray-200 rounded w-48 mb-4 animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
                <div className="h-5 bg-gray-200 rounded w-32 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-48 mb-3"></div>
                <div className="h-6 bg-gray-200 rounded w-16"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Form Skeleton */}
        <SkeletonForm />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alert Modal */}
      {alert && (
        <AlertModal
          isOpen={!!alert}
          onClose={() => setAlert(null)}
          type={alert.type}
          title={alert.title}
          message={alert.message}
        />
      )}

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={confirmDelete.isOpen}
        onClose={() => setConfirmDelete({ isOpen: false, templateId: null })}
        onConfirm={confirmDeleteTemplate}
        title="Delete Template"
        message="Are you sure you want to delete this template? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Newsletter</h1>
          <p className="text-gray-600 mt-1">
            Manage subscribers and send newsletters • {subscribers.filter((s) => s.isActive).length} active subscribers
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSubscribers(!showSubscribers)}
            className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${
              showSubscribers
                ? "bg-red-600 text-white border-red-600"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
          >
            <Users className="h-5 w-5" />
            {showSubscribers ? "Hide Subscribers" : "View Subscribers"}
          </button>
          <button
            onClick={() => {
              resetTemplateForm();
              setShowTemplateModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Create Template
          </button>
        </div>
      </div>

      {/* Subscribers Section */}
      {showSubscribers && (
        <div className="bg-white border border-gray-200">
          <div className="border-b border-gray-200 p-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Subscribers ({subscribers.length})
              </h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  Active: {subscribers.filter((s) => s.isActive).length} | 
                  Inactive: {subscribers.filter((s) => !s.isActive).length}
                </span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by email or name..."
                  value={subscriberSearch}
                  onChange={(e) => setSubscriberSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                />
              </div>
              <select
                value={subscriberStatusFilter}
                onChange={(e) => setSubscriberStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
              >
                <option value="All">All Status</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Source
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subscribed
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Emails Sent
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {subscribers
                  .filter((sub) => {
                    const matchesSearch =
                      !subscriberSearch ||
                      sub.email.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
                      (sub.name && sub.name.toLowerCase().includes(subscriberSearch.toLowerCase()));
                    const matchesStatus =
                      subscriberStatusFilter === "All" ||
                      (subscriberStatusFilter === "active" && sub.isActive) ||
                      (subscriberStatusFilter === "inactive" && !sub.isActive);
                    return matchesSearch && matchesStatus;
                  })
                  .map((subscriber) => (
                    <tr key={subscriber._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-gray-900">{subscriber.email}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">{subscriber.name || "—"}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded">
                          {subscriber.source || "order"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            subscriber.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {subscriber.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-4 w-4" />
                          {subscriber.subscribedAt
                            ? new Date(subscriber.subscribedAt).toLocaleDateString()
                            : "—"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {subscriber.totalEmailsSent || 0}
                      </td>
                    </tr>
                  ))}
                {subscribers.filter((sub) => {
                  const matchesSearch =
                    !subscriberSearch ||
                    sub.email.toLowerCase().includes(subscriberSearch.toLowerCase()) ||
                    (sub.name && sub.name.toLowerCase().includes(subscriberSearch.toLowerCase()));
                  const matchesStatus =
                    subscriberStatusFilter === "All" ||
                    (subscriberStatusFilter === "active" && sub.isActive) ||
                    (subscriberStatusFilter === "inactive" && !sub.isActive);
                  return matchesSearch && matchesStatus;
                }).length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                      No subscribers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Templates Section */}
      {templates.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Saved Templates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map((template) => (
              <div
                key={template._id}
                className="border border-gray-200 rounded-lg p-4 hover:border-red-300 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{template.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{template.subject}</p>
                    {template.isDefault && (
                      <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-red-100 text-red-700 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => handleTemplateSelect(template._id)}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      title="Use Template"
                    >
                      <Check className="h-4 w-4 text-green-600" />
                    </button>
                    <button
                      onClick={() => handleEditTemplate(template)}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      title="Edit Template"
                    >
                      <Edit className="h-4 w-4 text-blue-600" />
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(template._id)}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      title="Delete Template"
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Newsletter Editor */}
      <div className="bg-white border border-gray-200">
        {/* Editor Header */}
        <div className="border-b border-gray-200 p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-gray-900">Newsletter Editor</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className={`flex items-center gap-2 px-3 py-1.5 border rounded-lg transition-colors ${
                  showPreview
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
              >
                <Eye className="h-4 w-4" />
                {showPreview ? "Edit Mode" : "Preview"}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {subscribers.filter((s) => s.isActive).length} active subscribers
            </span>
          </div>
        </div>

        {/* Editor Content */}
        <div className={`grid ${showPreview ? "grid-cols-2" : "grid-cols-1"}`}>
          {/* Editor Panel */}
          <div className={`${showPreview ? "border-r border-gray-200" : ""} p-6`}>
            <div className="space-y-6">
              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Email Subject *
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter newsletter subject..."
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none font-medium"
                />
              </div>

              {/* Content Editor */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                    <Type className="h-4 w-4" />
                    Message Content
                  </label>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => {
                        const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const selectedText = content.substring(start, end);
                          const newText = content.substring(0, start) + `**${selectedText || 'bold text'}**` + content.substring(end);
                          setContent(newText);
                        }
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      title="Bold"
                    >
                      <Bold className="h-4 w-4 text-gray-600" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const textarea = document.querySelector('textarea[name="content"]') as HTMLTextAreaElement;
                        if (textarea) {
                          const start = textarea.selectionStart;
                          const end = textarea.selectionEnd;
                          const selectedText = content.substring(start, end);
                          const newText = content.substring(0, start) + `*${selectedText || 'italic text'}*` + content.substring(end);
                          setContent(newText);
                        }
                      }}
                      className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                      title="Italic"
                    >
                      <Italic className="h-4 w-4 text-gray-600" />
                    </button>
                  </div>
                </div>
                <textarea
                  name="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your newsletter message here...&#10;&#10;You can use:&#10;* Bold text: **text**&#10;* Italic text: *text*&#10;* Lists: - item"
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none resize-none font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-2">
                  Use **text** for bold, *text* for italic
                </p>
              </div>

              {/* Product Selection */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Select Products to Include
                </label>
                <div className="border border-gray-300 p-4 max-h-64 overflow-y-auto">
                  {products.length === 0 ? (
                    <p className="text-gray-500 text-sm">No products available</p>
                  ) : (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {products.map((product) => {
                        const isSelected = selectedProducts.includes(product._id);
                        return (
                          <div
                            key={product._id}
                            onClick={() => handleProductToggle(product._id)}
                            className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
                              isSelected
                                ? "border-red-600 bg-red-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="aspect-square bg-gray-100 rounded mb-1.5 overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="text-xs font-medium text-gray-900 truncate">{product.name}</p>
                            {isSelected && (
                              <div className="flex items-center justify-center mt-1">
                                <Check className="h-3 w-3 text-red-600" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  {selectedProducts.length} product{selectedProducts.length !== 1 ? "s" : ""} selected
                </p>
              </div>

              {/* Options Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Latest Products Option */}
                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Include Latest Products
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-include latest products
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={latestProductsCount}
                      onChange={(e) => setLatestProductsCount(parseInt(e.target.value) || 0)}
                      min="0"
                      max="20"
                      disabled={!includeLatestProducts}
                      className="w-16 px-2 py-1 border border-gray-300 focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none disabled:bg-gray-200 text-sm"
                    />
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={includeLatestProducts}
                        onChange={(e) => setIncludeLatestProducts(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                    </label>
                  </div>
                </div>

                {/* Send Options */}
                <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700">
                      Send to All Subscribers
                    </label>
                    <p className="text-xs text-gray-500 mt-1">
                      {subscribers.filter((s) => s.isActive).length} active
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sendToAll}
                      onChange={(e) => setSendToAll(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                  </label>
                </div>
              </div>

              {/* Send Button */}
              <button
                onClick={handleSendNewsletter}
                disabled={sending || !subject.trim()}
                className="w-full bg-red-600 text-white px-6 py-4 font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
                {sending ? "Sending Newsletter..." : "Send Newsletter"}
              </button>
            </div>
          </div>

          {/* Preview Panel */}
          {showPreview && (
            <div className="p-6 bg-gray-50">
              <div className="bg-white border border-gray-200 p-6 max-w-lg mx-auto">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{subject || "Newsletter Subject"}</h3>
                <div className="prose prose-sm max-w-none">
                  <div className="whitespace-pre-wrap text-gray-700">
                    {content.split('\n').map((line, i) => {
                      // Simple markdown-like rendering
                      let processedLine = line;
                      processedLine = processedLine.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                      processedLine = processedLine.replace(/\*(.*?)\*/g, '<em>$1</em>');
                      return <p key={i} dangerouslySetInnerHTML={{ __html: processedLine || '&nbsp;' }} />;
                    })}
                  </div>
                  {selectedProducts.length > 0 && (
                    <div className="mt-6 border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Featured Products</h4>
                      <div className="grid grid-cols-2 gap-3">
                        {products
                          .filter((p) => selectedProducts.includes(p._id))
                          .slice(0, 4)
                          .map((product) => (
                            <div key={product._id} className="border border-gray-200 rounded-lg p-2">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-24 object-contain bg-gray-50 rounded mb-2"
                              />
                              <p className="text-xs font-medium text-gray-900 truncate">{product.name}</p>
                              <p className="text-xs text-red-600 font-semibold">
                                {formatPrice(product.discountPrice || product.price)}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Template Modal */}
      {showTemplateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingTemplate ? "Edit Template" : "Create Template"}
              </h2>
              <button
                onClick={() => {
                  setShowTemplateModal(false);
                  resetTemplateForm();
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Template Name *
                </label>
                <input
                  type="text"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Weekly Newsletter"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={templateSubject}
                  onChange={(e) => setTemplateSubject(e.target.value)}
                  placeholder="New Products Available!"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content
                </label>
                <textarea
                  value={templateContent}
                  onChange={(e) => setTemplateContent(e.target.value)}
                  placeholder="Write your template message..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 focus:border-red-600 outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Products
                </label>
                <div className="border border-gray-300 rounded-lg p-4 max-h-48 overflow-y-auto">
                  <div className="grid grid-cols-3 gap-3">
                    {products.map((product) => {
                      const isSelected = templateProductIds.includes(product._id);
                      return (
                        <div
                          key={product._id}
                          onClick={() => {
                            setTemplateProductIds((prev) =>
                              prev.includes(product._id)
                                ? prev.filter((id) => id !== product._id)
                                : [...prev, product._id]
                            );
                          }}
                          className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${
                            isSelected
                              ? "border-red-600 bg-red-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                        >
                          <div className="aspect-square bg-gray-100 rounded mb-1 overflow-hidden">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <p className="text-xs text-gray-900 truncate">{product.name}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Include Latest Products
                  </label>
                  <p className="text-xs text-gray-500 mt-1">
                    Count: <input
                      type="number"
                      value={templateLatestCount}
                      onChange={(e) => setTemplateLatestCount(parseInt(e.target.value) || 0)}
                      min="0"
                      max="20"
                      disabled={!templateIncludeLatest}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-xs disabled:bg-gray-200"
                    />
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={templateIncludeLatest}
                    onChange={(e) => setTemplateIncludeLatest(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => {
                    setShowTemplateModal(false);
                    resetTemplateForm();
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveTemplate}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminNewsletterPage;

