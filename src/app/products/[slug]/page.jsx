import ProductDetailPage from "../../../components/pages/ProductDetailPage";
import { apiService, getImageUrl } from "../../../lib/api"; // Import getImageUrl

export const dynamic = "force-dynamic";

const SEO_OVERRIDES = {
  "portable-air-particle-counter": {
    title: "Portable Air Particle Counter 3400+ for Cleanroom Monitoring System | Shreedhar Group",
    description: "Discover the Portable Air Particle Counter 3400+ for accurate cleanroom and pharmaceutical air quality monitoring. Ideal for GMP compliance and contamination control applications.",
  },
  "online-air-particle-counter": {
    title: "Online Air Particle Counter 6000P for Real-Time Cleanroom Monitoring | Shreedhar Group",
    description: "Monitor airborne particles with the Online Air Particle Counter 6015P for cleanrooms, pharmaceutical, and GMP environments. Reliable real-time contamination monitoring solutions.",
  },
  "microbial-active-air-sampler": {
    title: "Portable Air Sampler AAS100 for Microbial Active Air Sampler | Shreedhar Group",
    description: "Explore the Portable Air Sampler AAS100 for accurate microbial air monitoring in cleanrooms, pharmaceutical, and GMP environments. Reliable active air sampling solution by Shreedhar Group.",
  },
  "container-closure-integrity-tester": {
    title: "Container Closure Integrity Tester (CCIT) | Leak Detection System By Shreedhar Group",
    description: "Discover the Container Closure Integrity Tester (CCIT) for accurate leak detection and package integrity testing in pharmaceutical and GMP environments. Reliable contamination control solutions by Shreedhar Group.",
  },
  "liquid-particle-counter": {
    title: "Liquid Particle Counter | Pharmaceutical Fluid Monitoring System By Shreedhar Group",
    description: "Discover advanced Liquid Particle Counter solutions for accurate particle monitoring in pharmaceutical, laboratory, and GMP applications. Ensure product quality and contamination control with Shreedhar Group.",
  },
  "filter-integrity-tester": {
    title: "Filter Integrity Tester | GMP Filter Testing Equipment By Shreedhar Group",
    description: "Discover advanced Filter Integrity Tester solutions for reliable filter validation and integrity testing in pharmaceutical, biotech, and GMP manufacturing environments.",
  },
  "tailin-glove-integrity-tester-git-wlan": {
    title: "Glove Integrity Tester | Isolator Glove Leak Testing System By Shreedhar Group",
    description: "Explore the Glove Integrity Tester for accurate glove leak detection in isolators and cleanrooms. Ideal for GMP compliance and contamination control applications.",
  },
  "rtp-integrity-tester": {
    title: "Rapid Transfer Port Tester | RTP Integrity Testing Solution By Shreedhar Group",
    description: "Ensure contamination-free material transfer with the Rapid Transfer Port Tester for RTP integrity testing in pharmaceutical and aseptic manufacturing facilities.",
  },
  "real-time-air-microbial-detector": {
    title: "Real Time Microbial Detector | Instant Air Monitoring System By Shreedhar Group",
    description: "Discover the Real Time Microbial Detector for continuous airborne microbial monitoring in cleanrooms and pharmaceutical environments. Advanced real-time contamination detection solution.",
  },
  "sterility-test-isolator": {
    title: "Pharmaceutical Isolator India | Sterility Test Isolator Manufacturer By Shreedhar Group",
    description: "Explore high-quality Pharmaceutical Isolator solutions in India for sterility testing, contamination control, and aseptic processing. Trusted GMP-compliant systems by Shreedhar Group.",
  },
  "labware-washer": {
    title: "GMP Glassware Washer for Pharma & Lab Cleaning | Shreedhar Group",
    description: "Discover GMP Glassware Washer systems for efficient, validated, and contamination-free labware cleaning in pharmaceutical and laboratory environments. Explore Shreedhar Group solutions.",
  },
  "automatic-polarimeter-for-pharmaceutical": {
    title: "Automatic Polarimeter for Pharmaceutical Testing | Shreedhar Group",
    description: "Ensure precise optical rotation measurements with advanced automatic polarimeters designed for pharmaceutical quality control and laboratory compliance.",
  },
  "automatic-digital-refractometers-for-pharmaceutical": {
    title: "Automatic Digital Refractometer for Pharma Labs | Shreedhar Group",
    description: "High-accuracy digital refractometers for pharmaceutical applications, delivering reliable concentration and purity analysis with GMP compliance.",
  },
  "apas-independence-automated-plate-assessment-system": {
    title: "Automated Colony Counter System for Microbiology Labs | Shreedhar Group",
    description: "Streamline microbial testing with an automated colony counter system that improves accuracy, efficiency, and laboratory productivity.",
  },
  "pharmaceutical-water-purification-system": {
    title: "Pharmaceutical Water Purification System in India | Shreedhar Group",
    description: "Advanced pharmaceutical water purification systems for PW, HPW, and WFI production, ensuring regulatory compliance and consistent water quality.",
  },
};

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

    // Return override immediately — no API call needed for known products
    const seoOverride = SEO_OVERRIDES[slug.toLowerCase()];
    if (seoOverride) {
      return {
        title: seoOverride.title,
        description: seoOverride.description,
        openGraph: {
          title: seoOverride.title,
          description: seoOverride.description,
          url: `https://shreedhargroup.com/products/${slug}`,
          siteName: 'Shreedhar Group',
          locale: 'en_IN',
          type: 'website',
        },
        twitter: {
          card: 'summary_large_image',
          title: seoOverride.title,
          description: seoOverride.description,
        },
        alternates: {
          canonical: `https://shreedhargroup.com/products/${slug}`,
        },
      };
    }

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
    const defaultTitle = `${product.name} | ${brandName}`;

    const pageTitle = defaultTitle;
    const pageDescription = plainDescription;

    return {
      title: pageTitle,
      description: pageDescription,
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
        description: pageDescription,
        url: `https://shreedhargroup.com/products/${slug}`,
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
        description: pageDescription,
        images: [imageUrl],
        creator: '@ShreedharInst',
      },

      // Additional metadata
      alternates: {
        canonical: `https://shreedhargroup.com/products/${slug}`,
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

export default async function Page({ params }) {
  const { slug } = await params;
  let initialProduct = null;

  try {
    const response = await apiService.getProductBySlug(slug);
    if (response?.data && typeof response.data === "object") {
      initialProduct = response.data;
    }
  } catch (error) {
    console.error("Failed to render product on the server:", error);
  }

  return <ProductDetailPage initialProduct={initialProduct} />;
}
