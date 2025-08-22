"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  ChevronLeft,
  Star,
  CheckCircle,
  Download,
  Phone,
  Send,
  Zap,
  Shield,
  Users,
  Award,
  FileText,
  Calendar,
  Settings,
  Package,
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircle,
} from "lucide-react";
import ProductInquiryForm from "../forms/ProductInquiryForm";

// FAQ Component for Product Detail Page
const ProductFAQItem = ({ faq, isOpen, onToggle }) => (
  <div className='border-b py-4' style={{ borderColor: "rgba(183, 136, 82, 0.2)" }}>
    <button
      onClick={onToggle}
      className='w-full flex justify-between items-start text-left hover:opacity-80 transition-opacity duration-200'
    >
      <div className='flex-1 pr-4'>
        <h4 className='font-semibold mb-1' style={{ color: "#8b6a3f" }}>
          {faq.question}
        </h4>
        {faq.category_name && (
          <span 
            className='text-xs px-2 py-1 rounded-full'
            style={{ 
              backgroundColor: "rgba(183, 136, 82, 0.1)", 
              color: "#9c7649" 
            }}
          >
            {faq.category_name}
          </span>
        )}
      </div>
      <ChevronDown
        size={20}
        className={`flex-shrink-0 transform transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
        style={{ color: "#b78852" }}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-screen mt-3" : "max-h-0"
      }`}
    >
      <div 
        className='prose prose-sm max-w-none'
        style={{ color: "#9c7649" }}
        dangerouslySetInnerHTML={{ __html: faq.answer }}
      />
      {faq.tags_list && faq.tags_list.length > 0 && (
        <div className='flex flex-wrap gap-1 mt-3'>
          {faq.tags_list.map((tag, index) => (
            <span
              key={index}
              className='text-xs px-2 py-1 rounded-full'
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.1)",
                color: "#3730a3"
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  </div>
);

const ProductFAQSection = ({ product }) => {
  const [productFaqs, setProductFaqs] = useState([]);
  const [globalFaqs, setGlobalFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [openFaqId, setOpenFaqId] = useState(null);
  const [showGlobalFaqs, setShowGlobalFaqs] = useState(false);

  useEffect(() => {
    const fetchFAQs = async () => {
      setLoading(true);
      try {
        // Fetch product-specific FAQs
        const productFaqResponse = await axios.get(
          `https://sweekarme.in/shree/api/products/faqs/product/${product.slug}/`
        );
        setProductFaqs(productFaqResponse.data || []);

        // Fetch relevant global FAQs (limit to a few relevant categories)
        const globalFaqResponse = await axios.get(
          "https://sweekarme.in/shree/api/products/faqs/global_faqs/?category=general"
        );
        setGlobalFaqs(globalFaqResponse.data.slice(0, 5) || []); // Limit to 5 most relevant

      } catch (err) {
        setError("Failed to load FAQs");
        console.error("FAQ fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    if (product) {
      fetchFAQs();
    }
  }, [product]);

  const handleFaqToggle = (faqId) => {
    setOpenFaqId(openFaqId === faqId ? null : faqId);
  };

  const filteredProductFaqs = productFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredGlobalFaqs = globalFaqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className='text-center py-12'>
        <div 
          className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 mb-4'
          style={{ borderColor: "#b78852" }}
        ></div>
        <p style={{ color: "#9c7649" }}>Loading FAQs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className='text-center py-12 p-6 rounded-xl'
        style={{ backgroundColor: "rgba(239, 68, 68, 0.1)" }}
      >
        <HelpCircle size={48} className='mx-auto mb-4 text-red-500' />
        <p className='text-red-600 mb-4'>{error}</p>
        <Link
          href='/faqs'
          className='text-white px-6 py-2 rounded-xl font-semibold transition-all duration-300 hover:scale-105'
          style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
        >
          Visit General FAQ Page
        </Link>
      </div>
    );
  }

  const totalFaqs = filteredProductFaqs.length + (showGlobalFaqs ? filteredGlobalFaqs.length : 0);

  return (
    <div 
      className='p-8 rounded-3xl shadow-sm'
      style={{ 
        backgroundColor: "rgba(255, 255, 255, 0.9)", 
        border: "1px solid rgba(183, 136, 82, 0.15)" 
      }}
    >
      {/* Header */}
      <div className='flex items-center gap-3 mb-6'>
        <HelpCircle size={28} style={{ color: "#b78852" }} />
        <div>
          <h2 className='text-2xl font-bold' style={{ color: "#8b6a3f" }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: "#9c7649" }}>
            Product-specific questions and answers about {product.name}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      {(productFaqs.length > 0 || globalFaqs.length > 0) && (
        <div className='relative mb-6'>
          <Search 
            className='absolute left-3 top-1/2 transform -translate-y-1/2'
            style={{ color: "#b78852" }}
            size={20}
          />
          <input
            type='text'
            placeholder='Search FAQs...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 transition-all duration-300'
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 2px 8px rgba(183, 136, 82, 0.1)",
              focusRingColor: "#b78852"
            }}
          />
        </div>
      )}

      {/* Results Summary */}
      {searchTerm && (
        <div className='mb-4'>
          <p className='text-sm' style={{ color: "#9c7649" }}>
            Found <span className='font-semibold' style={{ color: "#8b6a3f" }}>{totalFaqs}</span> FAQ{totalFaqs !== 1 ? 's' : ''} 
            {searchTerm && <span> matching "{searchTerm}"</span>}
          </p>
        </div>
      )}

      {/* Product-Specific FAQs */}
      {filteredProductFaqs.length > 0 ? (
        <div className='mb-8'>
          <div className='flex items-center gap-2 mb-4'>
            <Package size={20} style={{ color: "#b78852" }} />
            <h3 className='text-lg font-semibold' style={{ color: "#8b6a3f" }}>
              Product-Specific Questions ({filteredProductFaqs.length})
            </h3>
          </div>
          <div className='space-y-0'>
            {filteredProductFaqs.map((faq) => (
              <ProductFAQItem
                key={`product-${faq.id}`}
                faq={faq}
                isOpen={openFaqId === `product-${faq.id}`}
                onToggle={() => handleFaqToggle(`product-${faq.id}`)}
              />
            ))}
          </div>
        </div>
      ) : productFaqs.length === 0 && !searchTerm && (
        <div className='text-center py-8 mb-8'>
          <MessageCircle size={48} className='mx-auto mb-4' style={{ color: "#b78852" }} />
          <h3 className='text-lg font-semibold mb-2' style={{ color: "#8b6a3f" }}>
            No Product-Specific FAQs Yet
          </h3>
          <p className='mb-4' style={{ color: "#9c7649" }}>
            We haven't added FAQs for this specific product yet, but you can ask us anything!
          </p>
        </div>
      )}

      {/* Global FAQs Toggle */}
      {globalFaqs.length > 0 && (
        <div className='mb-6'>
          <button
            onClick={() => setShowGlobalFaqs(!showGlobalFaqs)}
            className='flex items-center gap-2 text-sm font-medium hover:opacity-80 transition-opacity'
            style={{ color: "#b78852" }}
          >
            <ChevronDown 
              size={16} 
              className={`transform transition-transform ${showGlobalFaqs ? 'rotate-180' : ''}`}
            />
            {showGlobalFaqs ? 'Hide' : 'Show'} General FAQs ({globalFaqs.length})
          </button>
        </div>
      )}

      {/* Global FAQs */}
      {showGlobalFaqs && filteredGlobalFaqs.length > 0 && (
        <div className='mb-8'>
          <div className='flex items-center gap-2 mb-4'>
            <HelpCircle size={20} style={{ color: "#059669" }} />
            <h3 className='text-lg font-semibold' style={{ color: "#8b6a3f" }}>
              General Questions ({filteredGlobalFaqs.length})
            </h3>
          </div>
          <div className='space-y-0'>
            {filteredGlobalFaqs.map((faq) => (
              <ProductFAQItem
                key={`global-${faq.id}`}
                faq={faq}
                isOpen={openFaqId === `global-${faq.id}`}
                onToggle={() => handleFaqToggle(`global-${faq.id}`)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {totalFaqs === 0 && searchTerm && (
        <div className='text-center py-12'>
          <Search size={48} className='mx-auto mb-4' style={{ color: "#b78852" }} />
          <h3 className='text-lg font-semibold mb-2' style={{ color: "#8b6a3f" }}>
            No FAQs Found
          </h3>
          <p className='mb-6' style={{ color: "#9c7649" }}>
            No FAQs match your search "{searchTerm}". Try different keywords or contact us directly.
          </p>
          <button
            onClick={() => setSearchTerm("")}
            className='px-4 py-2 rounded-lg font-medium transition-colors'
            style={{
              backgroundColor: "rgba(183, 136, 82, 0.1)",
              color: "#8b6a3f",
              border: "1px solid rgba(183, 136, 82, 0.3)"
            }}
          >
            Clear Search
          </button>
        </div>
      )}

      {/* Call to Action */}
      {(productFaqs.length > 0 || globalFaqs.length > 0) && (
        <div 
          className='mt-8 p-6 rounded-xl text-center'
          style={{ 
            backgroundColor: "rgba(183, 136, 82, 0.05)",
            border: "1px solid rgba(183, 136, 82, 0.2)"
          }}
        >
          <h4 className='font-semibold mb-2' style={{ color: "#8b6a3f" }}>
            Still Have Questions?
          </h4>
          <p className='text-sm mb-4' style={{ color: "#9c7649" }}>
            Can't find what you're looking for? Our experts are here to help with personalized answers.
          </p>
          <div className='flex flex-col sm:flex-row gap-3 justify-center'>
            <Link
              href='/contact'
              className='px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105'
              style={{
                backgroundColor: "#b78852",
                color: "white"
              }}
            >
              Contact Our Experts
            </Link>
            <Link
              href='/faqs'
              className='px-6 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105'
              style={{
                backgroundColor: "rgba(183, 136, 82, 0.1)",
                color: "#8b6a3f",
                border: "1px solid rgba(183, 136, 82, 0.3)"
              }}
            >
              View All FAQs
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [showContactForm, setShowContactForm] = useState(false);
  const [availableTabs, setAvailableTabs] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `https://sweekarme.in/shree/api/products/all/${slug}/`
        );
        const productData = response.data;
        setProduct(productData);

        // Define all possible tabs including FAQs
        const allPossibleTabs = [
          { key: "overview", label: "Overview", icon: <Star size={18} />, data: productData.full_description || productData.features },
          { key: "applications", label: "Applications", icon: <Package size={18} />, data: productData.applications },
          { key: "specifications", label: "Technical Specs", icon: <Settings size={18} />, data: productData.specifications },
          { key: "compliance", label: "Regulatory", icon: <Shield size={18} />, data: productData.compliance },
          { key: "documentation", label: "Documentation", icon: <FileText size={18} />, data: productData.documentation },
          { key: "faqs", label: "FAQs", icon: <HelpCircle size={18} />, data: true }, // Always show FAQs tab
        ];

        // Filter tabs to only include those with data (except FAQs which we always show)
        const currentAvailableTabs = allPossibleTabs.filter(tab => 
          tab.key === "faqs" || (tab.data && tab.data.length > 0)
        );
        setAvailableTabs(currentAvailableTabs);
        
        // Check if the current active tab is still valid, if not, reset to 'overview'
        const availableKeys = currentAvailableTabs.map(tab => tab.key);
        if (!availableKeys.includes(activeTab)) {
            setActiveTab("overview");
        }

      } catch (err) {
        setError("Failed to load product details.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [slug]); // Dependency array only includes slug

  if (loading) {
    return (
      <div
        className='pt-40 pb-20 text-center min-h-screen flex items-center justify-center'
        style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
      >
        <div>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4' style={{ borderColor: "#b78852" }}></div>
          <p className='text-lg font-semibold' style={{ color: "#8b6a3f" }}>Loading Product Details...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        className='pt-40 pb-20 text-center min-h-screen'
        style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
      >
        <div
          className='max-w-md mx-auto p-8 rounded-3xl shadow-lg'
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.2)" }}
        >
          <h1 className='text-3xl font-bold mb-4' style={{ color: "#8b6a3f" }}>Product Not Found</h1>
          <p className='mb-8' style={{ color: "#9c7649" }}>{error || "Sorry, we couldn't find the product you're looking for."}</p>
          <Link
            href='/products'
            className='text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-block'
            style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)", boxShadow: "0 4px 15px rgba(183, 136, 82, 0.3)" }}
          >
            Return to Products Page
          </Link>
        </div>
      </div>
    );
  }

  const galleryImages = [
    product.main_image,
    ...(product.images || []).map((img) => img.image),
  ];

  if (showContactForm) {
    return (
      <div
        className='pt-32 pb-20 min-h-screen'
        style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <ProductInquiryForm product={product} onClose={() => setShowContactForm(false)} />
        </div>
      </div>
    );
  }

  return (
    <div
      className='min-h-screen'
      style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
    >
      <div className='pt-32 pb-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <nav className='mb-8'>
            <Link href='/products' className='flex items-center gap-2 font-medium transition-all duration-300 mb-4 hover:scale-105' style={{ color: "#b78852" }}>
              <ChevronLeft size={20} />
              Back to Products
            </Link>
          </nav>

          <div className='grid lg:grid-cols-2 gap-12'>
            {/* Product Images */}
            <div className='space-y-4'>
              <div className='relative rounded-3xl overflow-hidden shadow-lg' style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                <img src={galleryImages[currentImageIndex]} alt={`${product.name} - Image ${currentImageIndex + 1}`} className='w-full h-96 object-contain' />
              </div>
              {galleryImages.length > 1 && (
                <div className='grid grid-cols-5 gap-4'>
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative rounded-xl overflow-hidden transition-all duration-300 ${index === currentImageIndex ? "ring-2 ring-offset-2 scale-105" : "hover:opacity-75 hover:scale-105"}`}
                      style={{ ringColor: "#b78852" }}
                    >
                      <img src={img} alt={`${product.name} thumbnail ${index + 1}`} className='w-full h-20 object-cover' />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className='space-y-6 flex flex-col'>
              <div className='flex-grow'>
                <span className='px-4 py-2 rounded-full text-sm font-semibold' style={{ backgroundColor: "rgba(183, 136, 82, 0.1)", color: "#8b6a3f" }}>
                  {product.category_name}
                </span>
                <h1 className='text-3xl md:text-4xl font-bold my-4' style={{ color: "#8b6a3f" }}>
                  {product.name}
                </h1>
                <div className='prose prose-lg mb-6' style={{ color: "#9c7649" }} dangerouslySetInnerHTML={{ __html: product.short_description }} />

                <div className='grid grid-cols-2 gap-4 mb-6'>
                  <div className='flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105' style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                    <Zap className='text-yellow-500' size={20} />
                    <div>
                      <div className='font-semibold text-sm' style={{ color: "#8b6a3f" }}>High Performance</div>
                      <div className='text-xs' style={{ color: "#9c7649" }}>Industry leading accuracy</div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105' style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                    <Shield className='text-green-500' size={20} />
                    <div>
                      <div className='font-semibold text-sm' style={{ color: "#8b6a3f" }}>FDA Compliant</div>
                      <div className='text-xs' style={{ color: "#9c7649" }}>21 CFR Part 11 ready</div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105' style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                    <Users className='text-blue-500' size={20} />
                    <div>
                      <div className='font-semibold text-sm' style={{ color: "#8b6a3f" }}>Expert Support</div>
                      <div className='text-xs' style={{ color: "#9c7649" }}>24/7 technical assistance</div>
                    </div>
                  </div>
                  <div className='flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105' style={{ backgroundColor: "rgba(255, 255, 255, 0.8)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                    <Award className='text-purple-500' size={20} />
                    <div>
                      <div className='font-semibold text-sm' style={{ color: "#8b6a3f" }}>Quality Assured</div>
                      <div className='text-xs' style={{ color: "#9c7649" }}>2-year comprehensive warranty</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-auto pt-6 space-y-4' style={{ borderTop: "1px solid rgba(183, 136, 82, 0.2)" }}>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className='text-white py-4 px-6 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
                    style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
                  >
                    <Send size={20} /> Request Detailed Quote
                  </button>
                  <a
                    href='tel:+917096033001'
                    className='py-4 px-6 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105'
                    style={{ border: "2px solid #b78852", color: "#8b6a3f", backgroundColor: "rgba(183, 136, 82, 0.05)" }}
                  >
                    <Phone size={20} /> Call Expert Now
                  </a>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  {product.brochure && (
                    <a
                      href={product.brochure}
                      target='_blank'
                      rel='noopener noreferrer'
                      className='py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105'
                      style={{ border: "2px solid rgba(183, 136, 82, 0.3)", color: "#8b6a3f", backgroundColor: "rgba(183, 136, 82, 0.05)" }}
                    >
                      <Download size={20} /> Download Brochure
                    </a>
                  )}
                  <button
                    onClick={() => setShowContactForm(true)}
                    className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 ${!product.brochure ? "md:col-span-2" : ""}`}
                    style={{ border: "2px solid rgba(183, 136, 82, 0.3)", color: "#8b6a3f", backgroundColor: "rgba(183, 136, 82, 0.05)" }}
                  >
                    <Calendar size={20} /> Schedule Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {availableTabs.length > 1 && (
            <div className='mt-16'>
              <div className='mb-8' style={{ borderBottom: "1px solid rgba(183, 136, 82, 0.2)" }}>
                <nav className='-mb-px flex space-x-8 overflow-x-auto'>
                  {availableTabs.map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`whitespace-nowrap flex items-center gap-2 py-4 px-1 border-b-2 font-semibold transition-colors duration-300`}
                      style={{ borderBottomColor: activeTab === tab.key ? "#b78852" : "transparent", color: activeTab === tab.key ? "#b78852" : "#9c7649" }}
                    >
                      {tab.icon} {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className='transition-opacity duration-500'>
                {activeTab === "overview" && (
                  <div
                    className='p-8 rounded-3xl shadow-sm'
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}
                  >
                    <h2 className='text-2xl font-bold mb-4' style={{ color: "#8b6a3f" }}>Product Overview</h2>
                    <div className='prose max-w-none mb-8' style={{ color: "#9c7649" }} dangerouslySetInnerHTML={{ __html: product.full_description }} />
                    {product.features && product.features.length > 0 && (
                      <>
                        <h3 className='text-xl font-bold mb-6' style={{ color: "#8b6a3f" }}>Key Features</h3>
                        <div className='grid md:grid-cols-2 gap-4'>
                          {product.features.map((item, index) => (
                            <div key={index} className='flex items-start gap-3 p-4 rounded-xl' style={{ backgroundColor: "rgba(34, 197, 94, 0.08)", border: "1px solid rgba(34, 197, 94, 0.2)" }}>
                              <CheckCircle size={24} className='text-green-600 flex-shrink-0 mt-1' />
                              <span style={{ color: "#8b6a3f" }}>{item.feature}</span>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                )}
                {activeTab === "applications" && (
                  <div className='p-8 rounded-3xl shadow-sm' style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                    <h2 className='text-2xl font-bold mb-6' style={{ color: "#8b6a3f" }}>Common Applications</h2>
                    <div className='grid md:grid-cols-2 gap-4'>
                      {product.applications.map((item, index) => (
                        <div key={index} className='flex items-start gap-3 p-4 rounded-xl' style={{ backgroundColor: "rgba(183, 136, 82, 0.08)", border: "1px solid rgba(183, 136, 82, 0.2)" }}>
                          <Package size={24} className='flex-shrink-0 mt-1' style={{ color: "#b78852" }} />
                          <span style={{ color: "#8b6a3f" }}>{item.app}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "specifications" && (
                  <div className='p-8 rounded-3xl shadow-sm' style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                    <h2 className='text-2xl font-bold mb-6' style={{ color: "#8b6a3f" }}>Technical Specifications</h2>
                    <div className='rounded-2xl overflow-hidden' style={{ border: "1px solid rgba(183, 136, 82, 0.1)" }}>
                      {product.specifications.map((item, index) => (
                        <div
                          key={index}
                          className='flex justify-between items-center p-4'
                          style={{
                            backgroundColor: index % 2 === 0 ? "rgba(183, 136, 82, 0.05)" : "transparent",
                            borderBottom: index < product.specifications.length - 1 ? "1px solid rgba(183, 136, 82, 0.1)" : "none",
                          }}
                        >
                          <span className='font-medium w-1/2' style={{ color: "#9c7649" }}>{item.spec}</span>
                          <span className='font-semibold text-right w-1/2' style={{ color: "#8b6a3f" }}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "compliance" && (
                  <div className='p-8 rounded-3xl shadow-sm' style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                    <h2 className='text-2xl font-bold mb-6' style={{ color: "#8b6a3f" }}>Regulatory Compliance</h2>
                    <div className='grid md:grid-cols-2 gap-6'>
                      {product.compliance.map((item, index) => (
                        <div key={index} className='p-4 rounded-xl' style={{ backgroundColor: "rgba(59, 130, 246, 0.08)", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
                          <h5 className='font-semibold mb-2' style={{ color: "#1e40af" }}>{item.standard}</h5>
                          <p className='text-sm' style={{ color: "#3730a3" }}>{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "documentation" && (
                  <div className='p-8 rounded-3xl shadow-sm' style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                    <h2 className='text-2xl font-bold mb-6' style={{ color: "#8b6a3f" }}>Support & Documentation</h2>
                    <div className='grid md:grid-cols-2 gap-4'>
                      {product.documentation.map((item, index) => (
                        <div key={index} className='flex items-start gap-3 p-4 rounded-xl' style={{ backgroundColor: "rgba(14, 165, 233, 0.08)", border: "1px solid rgba(14, 165, 233, 0.2)" }}>
                          <FileText size={24} className='text-sky-600 flex-shrink-0 mt-1' />
                          <span className="text-sky-800">{item.doc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeTab === "faqs" && (
                  <ProductFAQSection product={product} />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}