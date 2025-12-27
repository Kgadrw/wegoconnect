const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://wego-backend-taw5.onrender.com/api';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
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

    return response.json();
  }

  // Products
  async getProducts(params?: { category?: string; search?: string; isActive?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.category) queryParams.append('category', params.category);
    if (params?.search) queryParams.append('search', params.search);
    if (params?.isActive !== undefined) queryParams.append('isActive', params.isActive);
    
    const queryString = queryParams.toString();
    return this.request(`/products${queryString ? `?${queryString}` : ''}`);
  }

  async getProduct(id: string) {
    return this.request(`/products/${id}`);
  }

  async createProduct(data: any) {
    return this.request('/products', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateProduct(id: string, data: any) {
    return this.request(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteProduct(id: string) {
    return this.request(`/products/${id}`, {
      method: 'DELETE',
    });
  }

  // Orders
  async getOrders(params?: { status?: string; search?: string }) {
    const queryParams = new URLSearchParams();
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    return this.request(`/orders${queryString ? `?${queryString}` : ''}`);
  }

  async getOrder(id: string) {
    return this.request(`/orders/${id}`);
  }

  async createOrder(data: any) {
    return this.request('/orders', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateOrderStatus(id: string, status: string) {
    return this.request(`/orders/${id}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteOrder(id: string) {
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
    return this.request('/dashboard/stats');
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
    return this.request('/categories');
  }

  // Invoice Settings
  async getInvoiceSettings() {
    return this.request('/invoices/settings');
  }

  async updateInvoiceSettings(data: any) {
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
    return this.request<{ total: number; subscribers: any[] }>(`/newsletter/subscribers${queryString ? `?${queryString}` : ''}`);
  }

  async addNewsletterSubscriber(email: string, name?: string, source?: string) {
    return this.request<{ subscriber: any; message: string }>('/newsletter/subscribers', {
      method: 'POST',
      body: JSON.stringify({ email, name, source }),
    });
  }

  async updateNewsletterSubscriber(id: string, isActive: boolean) {
    return this.request<{ subscriber: any; message: string }>(`/newsletter/subscribers/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isActive }),
    });
  }

  async deleteNewsletterSubscriber(id: string) {
    return this.request<{ message: string }>(`/newsletter/subscribers/${id}`, {
      method: 'DELETE',
    });
  }

  // Newsletter - Newsletters
  async getNewsletters() {
    return this.request<any[]>('/newsletter/newsletters');
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
    return this.request<any[]>(`/newsletter/products/recent${queryString ? `?${queryString}` : ''}`);
  }

  // Newsletter - Templates
  async getNewsletterTemplates() {
    return this.request<any[]>('/newsletter/templates');
  }

  async getNewsletterTemplate(id: string) {
    return this.request<any>(`/newsletter/templates/${id}`);
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
    return this.request<any>(`/newsletter/templates/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteNewsletterTemplate(id: string) {
    return this.request<{ message: string }>(`/newsletter/templates/${id}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient(API_BASE_URL);

