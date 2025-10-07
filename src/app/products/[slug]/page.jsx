import ProductDetailPage from "../../../components/pages/ProductDetailPage";
import { apiService, getImageUrl } from "../../../lib/api"; // Import getImageUrl

// Pre-generate static pages for all products at build time
// This ensures metadata is available immediately for social media crawlers
export async function generateStaticParams() {
  try {
    console.log('🔨 Generating static params for product pages...');
    
    const response = await apiService.getAllProducts();
    const products = response?.data || response || [];
    
    console.log(`✅ Found ${products.length} products to pre-render`);
    
    // Return array of slugs for static generation
    return products.map((product) => ({
      slug: product.slug,
    }));
  } catch (error) {
    console.error('❌ Error generating static params:', error);
    // Return empty array to allow ISR fallback
    return [];
  }
}

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }) {
  try {
    // Await params as required by Next.js
    const { slug } = await params;
    
    // Fetch product data
    const response = await apiService.getProductBySlug(slug);
    const product = response?.data || response;

    if (!product) {
      return {
        title: 'Product Not Found | Shreedhar Instruments',
        description: 'The requested product could not be found.',
      };
    }

    // Extract description from HTML (remove tags for meta description)
    const plainDescription = (
      product.short_description ||
      product.description ||
      'High-quality pharmaceutical laboratory instruments and equipment.'
    ).replace(/<[^>]*>/g, '').substring(0, 160).trim();

    // Use getImageUrl and provide a reliable fallback
    const imageUrl = getImageUrl(product.main_image) || 'https://shreedhargroup.com/wp-content/uploads/2014/12/logo02.png';

    // Brand and category info
    const brandName = product.brand?.name || product.brand || 'Shreedhar Instruments';
    const categoryName = product.category_name || 'Laboratory Equipment';
    const pageTitle = `${product.name} | ${brandName}`;

    return {
      title: pageTitle,
      description: plainDescription,
      keywords: [
        product.name,
        brandName,
        categoryName,
        'pharmaceutical instruments',
        'laboratory equipment',
        'India',
        ...(product.tags_list || [])
      ].join(', '),
      
      // Open Graph metadata for Facebook, WhatsApp, LinkedIn
      openGraph: {
        title: pageTitle,
        description: plainDescription,
        url: `https://shreedharinstruments.com/products/${slug}`,
        siteName: 'Shreedhar Instruments',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
        locale: 'en_IN',
        type: 'article', // THIS LINE IS CORRECTED
      },
      
      // Twitter Card metadata
      twitter: {
        card: 'summary_large_image',
        title: pageTitle,
        description: plainDescription,
        images: [imageUrl],
        creator: '@ShreedharInst',
      },

      // Additional metadata
      alternates: {
        canonical: `https://shreedharinstruments.com/products/${slug}`,
      },
      
      // Product-specific metadata (using 'other' for custom tags)
      other: {
        'product:brand': brandName,
        'product:category': categoryName,
        'product:availability': 'in stock',
        'product:condition': 'new',
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Product | Shreedhar Instruments',
      description: 'Pharmaceutical laboratory instruments and equipment.',
    };
  }
}

export default function Page() {
  return <ProductDetailPage />;
}