import axios from "axios";

const BASE_URL = "https://shreedhargroup.com"; // Frontend URL
const API_URL = "https://sweekarme.in/shree/api"; // Backend API URL

async function fetchAllProducts() {
  try {
    const response = await axios.get(`${API_URL}/products/all/`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

async function fetchAllBlogPosts() {
  try {
    const response = await axios.get(`${API_URL}/blogs/posts/`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export default async function sitemap() {
  // Fetch dynamic data
  const [products, blogPosts] = await Promise.all([
    fetchAllProducts(),
    fetchAllBlogPosts(),
  ]);

  // Static routes
  const staticRoutes = [
    {
      url: `${BASE_URL}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/careers`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/faqs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/quote`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic product routes
  const productRoutes = products.map((product) => ({
    url: `${BASE_URL}/products/${product.slug}`,
    lastModified: new Date(
      product.updated_at || product.created_at || new Date()
    ),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic blog post routes
  const blogRoutes = blogPosts.map((post) => ({
    url: `${BASE_URL}/news/${post.slug}`,
    lastModified: new Date(post.updated_at || post.created_at || new Date()),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  // Combine all routes
  return [...staticRoutes, ...productRoutes, ...blogRoutes];
}
