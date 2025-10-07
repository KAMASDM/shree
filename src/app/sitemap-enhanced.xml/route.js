// src/app/sitemap-enhanced.xml/route.js
// Enhanced XML Sitemap with Images, Titles, and Descriptions
import axios from "axios";

const BASE_URL = "https://shreedharinstruments.com";
const API_URL = "https://sweekarme.in/shree/api";

// Helper to escape XML special characters
function escapeXml(unsafe) {
  if (!unsafe) return '';
  return unsafe
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Helper to strip HTML tags
function stripHtml(html) {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

// Helper to get valid date
function getValidDate(dateString) {
  if (!dateString) return new Date().toISOString();
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? new Date().toISOString() : date.toISOString();
}

// Fetch functions
async function fetchAllProducts() {
  try {
    const response = await axios.get(`${API_URL}/products/all/`, { timeout: 10000 });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching products:", error.message);
    return [];
  }
}

async function fetchAllBlogPosts() {
  try {
    const response = await axios.get(`${API_URL}/blogs/posts/`, { timeout: 10000 });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching blog posts:", error.message);
    return [];
  }
}

export async function GET() {
  try {
    const [products, blogPosts] = await Promise.all([
      fetchAllProducts(),
      fetchAllBlogPosts(),
    ]);

    const currentDate = new Date().toISOString();

    // Build XML sitemap
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
`;

    // ========================================
    // STATIC PAGES
    // ========================================
    const staticPages = [
      {
        loc: BASE_URL,
        title: "Shreedhar Instruments - FDA Compliant Analytical Solutions",
        desc: "Leading provider of FDA compliant analytical instruments for pharmaceutical industry. 28+ years experience, 800+ customers, 10,000+ installations.",
        priority: "1.0",
        changefreq: "daily",
      },
      {
        loc: `${BASE_URL}/products`,
        title: "Products - Pharmaceutical Laboratory Instruments",
        desc: "Comprehensive range of FDA compliant analytical instruments for pharmaceutical industry including particle counters, environmental monitoring systems.",
        priority: "0.95",
        changefreq: "daily",
      },
      {
        loc: `${BASE_URL}/services`,
        title: "Services - Installation, Validation & Support",
        desc: "Complete IQ OQ PQ validation, installation, calibration, and maintenance services for pharmaceutical laboratory instruments.",
        priority: "0.9",
        changefreq: "weekly",
      },
      {
        loc: `${BASE_URL}/about`,
        title: "About Us - 28+ Years in Pharmaceutical Instruments",
        desc: "Established in 1996, Shreedhar Instruments is India's leading provider of FDA compliant analytical solutions with 800+ satisfied customers.",
        priority: "0.8",
        changefreq: "monthly",
      },
      {
        loc: `${BASE_URL}/contact`,
        title: "Contact Us - Get in Touch for Expert Solutions",
        desc: "Contact Shreedhar Instruments for pharmaceutical laboratory instruments, validation services, and technical support across India.",
        priority: "0.8",
        changefreq: "monthly",
      },
      {
        loc: `${BASE_URL}/quote`,
        title: "Request a Quote - Custom Pharmaceutical Solutions",
        desc: "Get a customized quote for pharmaceutical analytical instruments, validation services, and complete laboratory solutions.",
        priority: "0.85",
        changefreq: "monthly",
      },
      {
        loc: `${BASE_URL}/careers`,
        title: "Careers - Join Our Expert Team",
        desc: "Explore career opportunities at Shreedhar Instruments. Join India's leading pharmaceutical instruments company.",
        priority: "0.7",
        changefreq: "weekly",
      },
      {
        loc: `${BASE_URL}/news`,
        title: "News & Events - Latest Updates",
        desc: "Stay updated with latest news, events, and developments in pharmaceutical analytical instrumentation industry.",
        priority: "0.75",
        changefreq: "daily",
      },
      {
        loc: `${BASE_URL}/faqs`,
        title: "FAQs - Frequently Asked Questions",
        desc: "Find answers to common questions about pharmaceutical instruments, validation, compliance, and our services.",
        priority: "0.65",
        changefreq: "monthly",
      },
      {
        loc: `${BASE_URL}/quality`,
        title: "Quality & Compliance - FDA & ISO Standards",
        desc: "Our commitment to quality, FDA compliance, ISO certifications, and pharmaceutical industry standards.",
        priority: "0.7",
        changefreq: "monthly",
      },
    ];

    staticPages.forEach(page => {
      xml += `  <url>
    <loc>${escapeXml(page.loc)}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });

    // ========================================
    // PRODUCT PAGES
    // ========================================
    products.forEach(product => {
      const productUrl = `${BASE_URL}/products/${product.slug}`;
      const lastMod = getValidDate(product.updated_at || product.created_at);
      const brandName = product.brand?.name || product.brand || 'Shreedhar Instruments';
      const title = `${escapeXml(product.name)} | ${escapeXml(brandName)}`;
      const description = escapeXml(stripHtml(product.short_description || product.description || '').substring(0, 160));
      const priority = product.is_featured ? '0.9' : '0.8';
      
      xml += `  <url>
    <loc>${escapeXml(productUrl)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>`;

      // Add product image if available
      if (product.main_image) {
        const imageUrl = product.main_image.startsWith('http') 
          ? product.main_image 
          : `https://sweekarme.in/shree${product.main_image}`;
        
        xml += `
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${description}</image:caption>
    </image:image>`;
      }

      xml += `
  </url>
`;
    });

    // ========================================
    // BLOG/NEWS PAGES
    // ========================================
    blogPosts.forEach(post => {
      const postUrl = `${BASE_URL}/news/${post.slug}`;
      const lastMod = getValidDate(post.updated_at || post.created_at);
      const pubDate = getValidDate(post.created_at);
      const title = escapeXml(post.title || '');
      const description = escapeXml(stripHtml(post.excerpt || post.content || '').substring(0, 160));
      
      // Recent posts get higher priority
      const daysSinceCreation = (new Date() - new Date(pubDate)) / (1000 * 60 * 60 * 24);
      const priority = daysSinceCreation < 30 ? '0.75' : '0.6';

      xml += `  <url>
    <loc>${escapeXml(postUrl)}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>`;

      // Add news metadata
      xml += `
    <news:news>
      <news:publication>
        <news:name>Shreedhar Instruments</news:name>
        <news:language>en</news:language>
      </news:publication>
      <news:publication_date>${pubDate}</news:publication_date>
      <news:title>${title}</news:title>
    </news:news>`;

      // Add featured image if available
      if (post.featured_image) {
        const imageUrl = post.featured_image.startsWith('http')
          ? post.featured_image
          : `https://sweekarme.in/shree${post.featured_image}`;
        
        xml += `
    <image:image>
      <image:loc>${escapeXml(imageUrl)}</image:loc>
      <image:title>${title}</image:title>
      <image:caption>${description}</image:caption>
    </image:image>`;
      }

      xml += `
  </url>
`;
    });

    // Close urlset
    xml += `</urlset>`;

    // Return XML response
    return new Response(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400',
      },
    });

  } catch (error) {
    console.error('Error generating enhanced sitemap:', error);
    
    // Return minimal sitemap on error
    const fallbackXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${BASE_URL}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`;

    return new Response(fallbackXml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml',
      },
    });
  }
}
