// src/lib/api.js
import axios from 'axios';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://sweekarme.in/shree/api';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 60000, // Increased to 60 seconds
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
const CACHE_DURATION = 10 * 60 * 1000; // Increased to 10 minutes

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

// Retry logic with exponential backoff
async function withRetry(apiCall, maxRetries = 2, baseDelay = 1000) {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await apiCall();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      
      // Only retry on timeout or network errors
      if (error.code === 'ECONNABORTED' || !error.response || error.response?.status >= 500) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`API call failed, retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries + 1})`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error; // Don't retry on client errors (4xx)
      }
    }
  }
}

// API service methods
export const apiService = {
  // Products API with optimization
  async getAllProducts(params = {}) {
    const cacheKey = getCacheKey('/products/all/', params);
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await withRetry(() => 
        apiClient.get('/products/all/', { 
          params,
          timeout: 45000 // Shorter timeout for products
        })
      );
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
      const response = await withRetry(() => 
        apiClient.get(`/products/all/${slug}/`)
      );
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

  // Optimized featured products - try cache first, then limited fetch
  async getFeaturedProducts() {
    const cacheKey = getCacheKey('/products/featured/');
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }

    try {
      // First try to get all products and filter
      const response = await withRetry(() => 
        apiClient.get('/products/all/', { 
          params: { is_featured: true },
          timeout: 45000
        })
      );
      
      const featuredProducts = response.data?.filter(product => product.is_featured) || [];
      setCachedData(cacheKey, featuredProducts);
      return { data: featuredProducts, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch featured products:', error);
      // Return empty array instead of throwing to prevent homepage crash
      return { data: [], fromCache: false, error: error.message };
    }
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
      const response = await withRetry(() => 
        apiClient.get('/blogs/posts/', { params })
      );
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
      const response = await withRetry(() => 
        apiClient.get(`/blogs/posts/${slug}/`)
      );
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
      const response = await withRetry(() => 
        apiClient.get('/services/')
      );
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch services:', error);
      throw new Error(error.message || 'Failed to fetch services');
    }
  },

  // Partners API with better error handling
  async getPartners() {
    const cacheKey = getCacheKey('/core/partners/');
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await withRetry(() => 
        apiClient.get('/core/partners/', {
          timeout: 30000 // Shorter timeout for partners
        })
      );
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch partners:', error);
      // Return empty array to prevent homepage crash
      return { data: [], fromCache: false, error: error.message };
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
      const response = await withRetry(() => 
        apiClient.get('/core/office-locations/')
      );
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch office locations:', error);
      throw new Error(error.message || 'Failed to fetch office locations');
    }
  },
  
  // Milestones API
  async getMilestones() {
    const cacheKey = getCacheKey('/core/milestones/');
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await withRetry(() => 
        apiClient.get('/core/milestones/')
      );
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch milestones:', error);
      throw new Error(error.message || 'Failed to fetch milestones');
    }
  },

  // Awards API
  async getAwards() {
    const cacheKey = getCacheKey('/core/awards/');
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await withRetry(() => 
        apiClient.get('/core/awards/')
      );
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch awards:', error);
      throw new Error(error.message || 'Failed to fetch awards');
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
      const response = await withRetry(() => 
        apiClient.get('/faqs/categories/')
      );
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
      const response = await withRetry(() => 
        apiClient.get(`/products/faqs/product/${productSlug}/`)
      );
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch product FAQs:', error);
      throw new Error(error.message || 'Failed to fetch product FAQs');
    }
  },

  // FIXED: Testimonials API - now calls the correct core endpoint
  async getTestimonials(params = {}) {
    const cacheKey = getCacheKey('/core/testimonials/', params);
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await withRetry(() => 
        apiClient.get('/core/testimonials/', { params })
      );
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
      // Return empty array to prevent homepage crash
      return { data: [], fromCache: false, error: error.message };
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
      const response = await withRetry(() => 
        apiClient.get('/core/hero-sections/')
      );
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch hero sections:', error);
      throw new Error(error.message || 'Failed to fetch hero sections');
    }
  },

  // ✨ NEW: Clients API Method
  async getClients() {
    const cacheKey = getCacheKey('/core/clients/');
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await withRetry(() => 
        apiClient.get('/core/clients/')
      );
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch clients:', error);
      return { data: [], fromCache: false, error: error.message };
    }
  },

  async getCompanyInfo() {
    const cacheKey = getCacheKey('/core/company-info/');
    const cachedData = await getCachedData(cacheKey);
    
    if (cachedData) {
      return { data: cachedData, fromCache: true };
    }
    
    try {
      const response = await withRetry(() => 
        apiClient.get('/core/company-info/')
      );
      const data = response.data || [];
      setCachedData(cacheKey, data);
      return { data, fromCache: false };
    } catch (error) {
      console.error('Failed to fetch company info:', error);
      return { data: [], fromCache: false, error: error.message };
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
      const response = await withRetry(() => 
        apiClient.get('/hr/jobs/')
      );
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
