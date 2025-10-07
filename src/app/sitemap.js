import axios from "axios";

const BASE_URL = "https://shreedharinstruments.com"; // Frontend URL (updated to correct domain)
const API_URL = "https://sweekarme.in/shree/api"; // Backend API URL

// Helper function to get valid date
function getValidDate(dateString) {
  if (!dateString) return new Date();
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date() : date;
}

// Fetch all products with full details
async function fetchAllProducts() {
  try {
    const response = await axios.get(`${API_URL}/products/all/`, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
      },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching products for sitemap:", error.message);
    return [];
  }
}

// Fetch all blog posts
async function fetchAllBlogPosts() {
  try {
    const response = await axios.get(`${API_URL}/blogs/posts/`, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
      },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching blog posts for sitemap:", error.message);
    return [];
  }
}

// Fetch product categories
async function fetchProductCategories() {
  try {
    const response = await axios.get(`${API_URL}/products/categories/`, {
      timeout: 10000,
      headers: {
        'Accept': 'application/json',
      },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching categories for sitemap:", error.message);
    return [];
  }
}

export default async function sitemap() {
  try {
    // Fetch all dynamic data in parallel
    const [products, blogPosts, categories] = await Promise.all([
      fetchAllProducts(),
      fetchAllBlogPosts(),
      fetchProductCategories(),
    ]);

    const currentDate = new Date().toISOString();

    // ========================================
    // STATIC ROUTES - High Priority Pages
    // ========================================
    const staticRoutes = [
      {
        url: `${BASE_URL}`,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 1.0, // Homepage - highest priority
      },
      {
        url: `${BASE_URL}/products`,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 0.95, // Products listing - very high priority
      },
      {
        url: `${BASE_URL}/services`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.9, // Services - high priority
      },
      {
        url: `${BASE_URL}/about`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8, // About page
      },
      {
        url: `${BASE_URL}/contact`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.8, // Contact - important for conversion
      },
      {
        url: `${BASE_URL}/quote`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.85, // Quote request - conversion page
      },
      {
        url: `${BASE_URL}/careers`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.7, // Careers
      },
      {
        url: `${BASE_URL}/news`,
        lastModified: currentDate,
        changeFrequency: "daily",
        priority: 0.75, // News/Blog listing
      },
      {
        url: `${BASE_URL}/faqs`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.65, // FAQs
      },
      {
        url: `${BASE_URL}/quality`,
        lastModified: currentDate,
        changeFrequency: "monthly",
        priority: 0.7, // Quality page
      },
      {
        url: `${BASE_URL}/privacy`,
        lastModified: currentDate,
        changeFrequency: "yearly",
        priority: 0.3, // Privacy policy
      },
      {
        url: `${BASE_URL}/terms`,
        lastModified: currentDate,
        changeFrequency: "yearly",
        priority: 0.3, // Terms of service
      },
    ];

    // ========================================
    // DYNAMIC PRODUCT ROUTES
    // ========================================
    const productRoutes = products.map((product) => {
      // Determine priority based on product characteristics
      let priority = 0.8; // Base priority for products
      
      // Boost priority for featured or popular products
      if (product.is_featured) priority = 0.9;
      if (product.view_count > 1000) priority = 0.85;
      
      // Get last modified date
      const lastModified = getValidDate(product.updated_at || product.created_at);

      return {
        url: `${BASE_URL}/products/${product.slug}`,
        lastModified: lastModified.toISOString(),
        changeFrequency: "weekly",
        priority: priority,
        // Note: Next.js sitemap doesn't support images natively in sitemap.js
        // But we'll create an enhanced XML sitemap separately
      };
    });

    // ========================================
    // DYNAMIC BLOG/NEWS ROUTES
    // ========================================
    const blogRoutes = blogPosts.map((post) => {
      const lastModified = getValidDate(post.updated_at || post.created_at);
      const createdDate = getValidDate(post.created_at);
      
      // Recent posts get higher priority
      const daysSinceCreation = (new Date() - createdDate) / (1000 * 60 * 60 * 24);
      let priority = 0.6;
      if (daysSinceCreation < 30) priority = 0.75; // Recent posts within 30 days
      if (daysSinceCreation < 7) priority = 0.8; // Very recent posts

      return {
        url: `${BASE_URL}/news/${post.slug}`,
        lastModified: lastModified.toISOString(),
        changeFrequency: "monthly",
        priority: priority,
      };
    });

    // ========================================
    // CATEGORY ROUTES (if categories have pages)
    // ========================================
    const categoryRoutes = categories.map((category) => {
      // Clean up category name - fix typos and formatting
      let categoryName = category.name || category;
      
      // Fix known typos
      categoryName = categoryName
        .replace(/Enviromental/gi, 'Environmental') // Fix spelling
        .replace(/\s+/g, ' ') // Replace multiple spaces with single space
        .trim(); // Remove leading/trailing spaces
      
      return {
        url: `${BASE_URL}/products?category=${encodeURIComponent(categoryName)}`,
        lastModified: currentDate,
        changeFrequency: "weekly",
        priority: 0.7,
      };
    });

    // ========================================
    // COMBINE ALL ROUTES
    // ========================================
    const allRoutes = [
      ...staticRoutes,
      ...productRoutes,
      ...blogRoutes,
      ...categoryRoutes,
    ];

    console.log(`✅ Sitemap generated: ${allRoutes.length} URLs`);
    console.log(`   - Static pages: ${staticRoutes.length}`);
    console.log(`   - Products: ${productRoutes.length}`);
    console.log(`   - Blog posts: ${blogRoutes.length}`);
    console.log(`   - Categories: ${categoryRoutes.length}`);

    return allRoutes;
  } catch (error) {
    console.error("❌ Error generating sitemap:", error);
    // Return at least static routes if dynamic fetch fails
    return [
      {
        url: `${BASE_URL}`,
        lastModified: new Date().toISOString(),
        changeFrequency: "daily",
        priority: 1.0,
      },
    ];
  }
}
