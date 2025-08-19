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
} from "lucide-react";
import ProductInquiryForm from "../forms/ProductInquiryForm";

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

        // Define all possible tabs
        const allPossibleTabs = [
          { key: "overview", label: "Overview", icon: <Star size={18} />, data: productData.full_description || productData.features },
          { key: "applications", label: "Applications", icon: <Package size={18} />, data: productData.applications },
          { key: "specifications", label: "Technical Specs", icon: <Settings size={18} />, data: productData.specifications },
          { key: "compliance", label: "Regulatory", icon: <Shield size={18} />, data: productData.compliance },
          { key: "documentation", label: "Documentation", icon: <FileText size={18} />, data: productData.documentation },
        ];

        // Filter tabs to only include those with data
        const currentAvailableTabs = allPossibleTabs.filter(tab => tab.data && tab.data.length > 0);
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}