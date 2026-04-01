const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://wego-backend-2ir0.onrender.com/api';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number; // Time to live in milliseconds
}

class ApiClient {
  private baseUrl: string;
  private cache: Map<string, CacheEntry<any>>;
  private defaultTTL: number = 5 * 60 * 1000; // 5 minutes default

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.cache = new Map();
  }

  private getCacheKey(endpoint: string, options?: RequestInit): string {
    // Create a unique cache key based on endpoint and method
    const method = options?.method || 'GET';
    let body = '';
    if (options?.body) {
      try {
        // Try to parse and stringify to normalize the body
        body = typeof options.body === 'string' 
          ? options.body 
          : JSON.stringify(options.body);
      } catch {
        body = String(options.body);
      }
    }
    return `${method}:${endpoint}:${body}`;
  }

  private getCached<T>(key: string): T | null {
    const entry = this.cache.get(key);
    if (!entry) return null;

    const now = Date.now();
    if (now - entry.timestamp > entry.ttl) {
      // Cache expired
      this.cache.delete(key);
      return null;
    }

    return entry.data as T;
  }

  private setCache<T>(key: string, data: T, ttl?: number): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl: ttl || this.defaultTTL,
    });
  }

  // Clear cache for a specific endpoint or all cache
  clearCache(endpoint?: string): void {
    if (endpoint) {
      // Clear all cache entries matching the endpoint pattern
      const keysToDelete: string[] = [];
      this.cache.forEach((_, key) => {
        if (key.includes(endpoint)) {
          keysToDelete.push(key);
        }
      });
      keysToDelete.forEach(key => this.cache.delete(key));
    } else {
      // Clear all cache
      this.cache.clear();
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {},
    cacheTTL?: number
  ): Promise<T> {
    // Only cache GET requests
    const isGetRequest = !options.method || options.method === 'GET';
    const cacheKey = this.getCacheKey(endpoint, options);

    // Check cache for GET requests
    if (isGetRequest) {
      const cached = this.getCached<T>(cacheKey);
      if (cached !== null) {
        return cached;
      }
    }

    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }));
      throw new Error(error.error || 'Request failed');
    }

    const data = await response.json();

    // Cache GET requests
    if (isGetRequest) {
      this.setCache(cacheKey, data, cacheTTL);
    }

    return data;
  }

  // Products
  async getProducts(params?: { category?: string; search?: string; isActive?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive);
    
    const queryString = queryParams.toString();
    // Cache products for 5 minutes, but shorter for search queries (1 minute)
    const ttl = params?.search ? 1 * 60 * 1000 : 5 * 60 * 1000;
    return this.request(`/products${queryString ? `?${queryString}` : ''}`, {}, ttl);
  }

  async getProduct(id: string) {
    // Cache individual products for 5 minutes
    return this.request(`/products/${id}`, {}, 5 * 60 * 1000);
  }

  async createProduct(data: any) {
    // Clear products cache when creating a new product
    this.clearCache('/products');
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: string, data: any) {
    // Clear cache for this product and products list
    this.clearCache('/products');
    this.clearCache(`/products/${id}`);
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string) {
    // Clear cache for this product and products list
    this.clearCache('/products');
    this.clearCache(`/products/${id}`);
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  async updateProductSortOrder(productIds: string[]) {
    // Clear products cache when updating sort order
    this.clearCache('/products');
    return this.request('/products/sort/update', {
      method: 'PUT',
      body: JSON.stringify({ productIds }),
    });
  }

  // Orders
  async getOrders(params?: { status?: string; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    // Cache orders for 1 minute (they change frequently)
    return this.request(`/orders${queryString ? `?${queryString}` : ''}`, {}, 1 * 60 * 1000);
  }

  async getOrder(id: string) {
    // Cache individual orders for 1 minute
    return this.request(`/orders/${id}`, {}, 1 * 60 * 1000);
  }

  async createOrder(data: any) {
    // Clear orders cache when creating a new order
    this.clearCache('/orders');
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateOrderStatus(id: string, status: string) {
    // Clear orders cache when updating order status
    this.clearCache('/orders');
    this.clearCache(`/orders/${id}`);
    return this.request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteOrder(id: string) {
    // Clear orders cache when deleting an order
    this.clearCache('/orders');
    this.clearCache(`/orders/${id}`);
    return this.request(`/orders/${id}`, {
      method: 'DELETE',
    });
  }

  // Admin
  async adminLogin(email: string, password: string) {
    return this.request('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }


  // Dashboard
  async getDashboardStats() {
    // Cache dashboard stats for 2 minutes
    return this.request('/dashboard/stats', {}, 2 * 60 * 1000);
  }

  // Upload
  async uploadImage(file: File): Promise<{ url: string; secure_url: string; public_id: string }> {
    const formData = new FormData();
    formData.append('image', file);

    const url = `${this.baseUrl}/upload/image`;
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(error.error || 'Upload failed');
    }

    return response.json();
  }

  async deleteImage(publicId: string) {
    return this.request(`/upload/image/${publicId}`, {
      method: 'DELETE',
    });
  }

  // Categories
  async getCategories() {
    // Cache categories for 10 minutes (they don't change often)
    return this.request('/categories', {}, 10 * 60 * 1000);
  }

  // Invoice Settings
  async getInvoiceSettings() {
    // Cache invoice settings for 5 minutes
    return this.request('/invoices/settings', {}, 5 * 60 * 1000);
  }

  async updateInvoiceSettings(data: any) {
    // Clear cache when updating settings
    this.clearCache('/invoices/settings');
    return this.request('/invoices/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Newsletter - Subscribers
  async getNewsletterSubscribers(params?: { status?: string; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    // Cache subscribers for 2 minutes
    return this.request<{ total: number; subscribers: any[] }>(`/newsletter/subscribers${queryString ? `?${queryString}` : ''}`, {}, 2 * 60 * 1000);
  }

  async addNewsletterSubscriber(email: string, name?: string, source?: string) {
    // Clear subscribers cache when adding
    this.clearCache('/newsletter/subscribers');
    return this.request<{ subscriber: any; message: string }>('/newsletter/subscribers', {
      method: 'POST',
      body: JSON.stringify({ email, name, source }),
    });
  }

  async updateNewsletterSubscriber(id: string, isActive: boolean) {
    // Clear subscribers cache when updating
    this.clearCache('/newsletter/subscribers');
    return this.request<{ subscriber: any; message: string }>(`/newsletter/subscribers/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isActive }),
    });
  }

  async deleteNewsletterSubscriber(id: string) {
    // Clear subscribers cache when deleting
    this.clearCache('/newsletter/subscribers');
    return this.request<{ message: string }>(`/newsletter/subscribers/${id}`, {
      method: 'DELETE',
    });
  }

  // Newsletter - Newsletters
  async getNewsletters() {
    // Cache newsletters for 5 minutes
    return this.request<any[]>('/newsletter/newsletters', {}, 5 * 60 * 1000);
  }

  async sendNewsletter(data: {
    subject: string;
    content?: string;
    productIds?: string[];
    sendToAll?: boolean;
    customEmails?: string[];
  }) {
    return this.request<{ success: boolean; message: string; newsletterId: string; totalSubscribers: number }>('/newsletter/newsletters/send', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getRecentProductsForNewsletter(limit?: number) {
    const queryParams = new URLSearchParams();
    if (limit) queryParams.append('limit', limit.toString());
    
    const queryString = queryParams.toString();
    // Cache recent products for 5 minutes
    return this.request<any[]>(`/newsletter/products/recent${queryString ? `?${queryString}` : ''}`, {}, 5 * 60 * 1000);
  }

  // Newsletter - Templates
  async getNewsletterTemplates() {
    // Cache templates for 5 minutes
    return this.request<any[]>('/newsletter/templates', {}, 5 * 60 * 1000);
  }

  async getNewsletterTemplate(id: string) {
    // Cache template for 5 minutes
    return this.request<any>(`/newsletter/templates/${id}`, {}, 5 * 60 * 1000);
  }

  async createNewsletterTemplate(data: {
    name: string;
    subject: string;
    content?: string;
    productIds?: string[];
    includeLatestProducts?: boolean;
    latestProductsCount?: number;
    isDefault?: boolean;
  }) {
    // Clear templates cache when creating
    this.clearCache('/newsletter/templates');
    return this.request<any>('/newsletter/templates', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateNewsletterTemplate(id: string, data: {
    name?: string;
    subject?: string;
    content?: string;
    productIds?: string[];
    includeLatestProducts?: boolean;
    latestProductsCount?: number;
    isDefault?: boolean;
  }) {
    // Clear templates cache when updating
    this.clearCache('/newsletter/templates');
    this.clearCache(`/newsletter/templates/${id}`);
    return this.request<any>(`/newsletter/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteNewsletterTemplate(id: string) {
    // Clear templates cache when deleting
    this.clearCache('/newsletter/templates');
    this.clearCache(`/newsletter/templates/${id}`);
    return this.request<{ message: string }>(`/newsletter/templates/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient(API_BASE_URL);

