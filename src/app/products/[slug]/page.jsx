import ProductDetailPage from "../../../components/pages/ProductDetailPage";
import { apiService } from "../../../lib/api";

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }) {
  try {
    // Await params as required by Next.js 15
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
    const plainDescription = product.short_description
      ? product.short_description.replace(/<[^>]*>/g, '').trim()
      : product.description
      ? product.description.replace(/<[^>]*>/g, '').substring(0, 160).trim()
      : 'High-quality pharmaceutical laboratory instruments and equipment.';

    // Get the product image URL
    const imageUrl = product.main_image || 'https://sweekarme.in/shree/media/default-product.jpg';
    const fullImageUrl = imageUrl.startsWith('http') ? imageUrl : `https://sweekarme.in/shree${imageUrl}`;

    // Brand and category info
    const brandName = product.brand?.name || product.brand || 'Shreedhar Instruments';
    const categoryName = product.category_name || 'Laboratory Equipment';

    return {
      title: `${product.name} | ${brandName} | Shreedhar Instruments`,
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
        title: product.name,
        description: plainDescription,
        url: `https://shreedharinstruments.com/products/${slug}`,
        siteName: 'Shreedhar Instruments',
        images: [
          {
            url: fullImageUrl,
            width: 1200,
            height: 630,
            alt: product.name,
          },
        ],
        locale: 'en_IN',
        type: 'product',
      },
      
      // Twitter Card metadata
      twitter: {
        card: 'summary_large_image',
        title: product.name,
        description: plainDescription,
        images: [fullImageUrl],
        creator: '@ShreedharInst',
      },

      // Additional metadata
      alternates: {
        canonical: `https://shreedharinstruments.com/products/${slug}`,
      },
      
      // Product-specific metadata
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
