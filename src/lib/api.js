// src/lib/api.js
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sweekarme.in/shree/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging and auth
apiClient.interceptors.request.use(
  (config) => {
    // Log requests in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('API Error:', error.response?.data || error.message);
    }
    
    // Handle different error types
    if (error.code === 'ECONNABORTED') {
      error.message = 'Request timeout - please try again';
    } else if (error.response?.status === 404) {
      error.message = 'Resource not found';
    } else if (error.response?.status >= 500) {
      error.message = 'Server error - please try again later';
    } else if (!error.response) {
      error.message = 'Network error - please check your connection';
    }
    
    return Promise.reject(error);
  }
);

// Cache implementation
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

function getCacheKey(url, params = {}) {
  return `${url}?${new URLSearchParams(params).toString()}`;
}

function isValidCacheEntry(entry) {
  return entry && (Date.now() - entry.timestamp) < CACHE_DURATION;
}

async function getCachedData(key) {
  const entry = cache.get(key);
  return isValidCacheEntry(entry) ? entry.data : null;
}

function setCachedData(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

// API service methods
export const apiService = {
  // Products API
  async getAllProducts(params = {}) {
    const cacheKey = getCacheKey('/products/all/', params);
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await apiClient.get('/products/all/', { params });
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch products:', error);
      throw new Error(error.message || 'Failed to fetch products');
    }
  },

  async getProductBySlug(slug) {
    if (!slug) {
      throw new Error('Product slug is required');
    }
    
    const cacheKey = getCacheKey(`/products/all/${slug}/`);
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await apiClient.get(`/products/all/${slug}/`);
      const data = response.data;
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Product not found');
      }
      console.error('Failed to fetch product:', error);
      throw new Error(error.message || 'Failed to fetch product');
    }
  },

  async getFeaturedProducts() {
    return this.getAllProducts({ is_featured: true });
  },

  async getProductsByCategory(category) {
    return this.getAllProducts({ category });
  },

  // Blog/News API
  async getAllBlogPosts(params = {}) {
    const cacheKey = getCacheKey('/blogs/posts/', params);
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await apiClient.get('/blogs/posts/', { params });
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch blog posts:', error);
      throw new Error(error.message || 'Failed to fetch blog posts');
    }
  },

  async getBlogPostBySlug(slug) {
    if (!slug) {
      throw new Error('Blog post slug is required');
    }
    
    const cacheKey = getCacheKey(`/blogs/posts/${slug}/`);
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await apiClient.get(`/blogs/posts/${slug}/`);
      const data = response.data;
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      if (error.response?.status === 404) {
        throw new Error('Blog post not found');
      }
      console.error('Failed to fetch blog post:', error);
      throw new Error(error.message || 'Failed to fetch blog post');
    }
  },

  // Services API
  async getAllServices() {
    const cacheKey = getCacheKey('/services/');
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await apiClient.get('/services/');
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch services:', error);
      throw new Error(error.message || 'Failed to fetch services');
    }
  },

  // Partners API
  async getPartners() {
    const cacheKey = getCacheKey('/core/partners/');
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await apiClient.get('/core/partners/');
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch partners:', error);
      throw new Error(error.message || 'Failed to fetch partners');
    }
  },

  // Office Locations API
  async getOfficeLocations() {
    const cacheKey = getCacheKey('/core/office-locations/');
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await apiClient.get('/core/office-locations/');
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch office locations:', error);
      throw new Error(error.message || 'Failed to fetch office locations');
    }
  },
  
  // Milestones API - ADDED
  async getMilestones() {
    const cacheKey = getCacheKey('/core/milestones/');
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await apiClient.get('/core/milestones/');
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch milestones:', error);
      throw new Error(error.message || 'Failed to fetch milestones');
    }
  },

  // FAQ API
  async getFAQCategories() {
    const cacheKey = getCacheKey('/faqs/categories/');
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await apiClient.get('/faqs/categories/');
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch FAQ categories:', error);
      throw new Error(error.message || 'Failed to fetch FAQ categories');
    }
  },

  async getProductFAQs(productSlug) {
    if (!productSlug) {
      throw new Error('Product slug is required');
    }
    
    const cacheKey = getCacheKey(`/products/faqs/product/${productSlug}/`);
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await apiClient.get(`/products/faqs/product/${productSlug}/`);
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch product FAQs:', error);
      throw new Error(error.message || 'Failed to fetch product FAQs');
    }
  },

  // Testimonials API
  async getTestimonials(params = {}) {
    const cacheKey = getCacheKey('/testimonials/', params);
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await apiClient.get('/testimonials/', { params });
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      throw new Error(error.message || 'Failed to fetch testimonials');
    }
  },

  // Submission APIs (no caching for these)
  async submitProductInquiry(data) {
    try {
      const response = await apiClient.post('/inquiries/product/', data);
      return response.data;
    } catch (error) {
      console.error('Failed to submit product inquiry:', error);
      throw new Error(error.message || 'Failed to submit inquiry');
    }
  },

  async submitServiceInquiry(data) {
    try {
      const response = await apiClient.post('/inquiries/service/', data);
      return response.data;
    } catch (error) {
      console.error('Failed to submit service inquiry:', error);
      throw new Error(error.message || 'Failed to submit inquiry');
    }
  },

  async submitJobApplication(data) {
    try {
      const response = await apiClient.post('/hr/applications/', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Failed to submit job application:', error);
      throw new Error(error.message || 'Failed to submit application');
    }
  },

  async submitLead(data) {
    try {
      const response = await apiClient.post('/leads/submit/', data);
      return response.data;
    } catch (error) {
      console.error('Failed to submit lead:', error);
      throw new Error(error.message || 'Failed to submit lead');
    }
  },

  // Hero sections API
  async getHeroSections() {
    const cacheKey = getCacheKey('/core/hero-sections/');
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await apiClient.get('/core/hero-sections/');
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch hero sections:', error);
      throw new Error(error.message || 'Failed to fetch hero sections');
    }
  },

  // Career/Jobs API
  async getJobs() {
    const cacheKey = getCacheKey('/hr/jobs/');
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await apiClient.get('/hr/jobs/');
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
      throw new Error(error.message || 'Failed to fetch jobs');
    }
  },

  // Cache management
  clearCache(pattern = null) {
    if (pattern) {
      // Clear specific cache entries matching pattern
      for (const key of cache.keys()) {
        if (key.includes(pattern)) {
          cache.delete(key);
        }
      }
    } else {
      // Clear all cache
      cache.clear();
    }
  },

  getCacheStats() {
    return {
      size: cache.size,
      keys: Array.from(cache.keys()),
    };
  }
};

export default apiService;