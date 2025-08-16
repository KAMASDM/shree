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
  Play,
  Phone,
  Send,
  Zap,
  Shield,
  Users,
  Award,
  FileText,
  Calendar,
  Settings,
  AlertTriangle,
  Heart,
  Share2,
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

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://sweekarme.in/shree/api/products/all/${slug}/`
        );
        const productData = response.data;

        const parseJsonField = (field) => {
          try {
            return JSON.parse(field) || [];
          } catch (e) {
            return [];
          }
        };

        productData.features = parseJsonField(productData.features);
        productData.specifications = parseJsonField(productData.specifications);
        productData.applications = parseJsonField(productData.applications);
        productData.compliance = parseJsonField(productData.compliance);
        productData.documentation = parseJsonField(productData.documentation);

        setProduct(productData);
      } catch (err) {
        setError("Failed to load product details.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div
        className='pt-40 pb-20 text-center min-h-screen flex items-center justify-center'
        style={{
          background:
            "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)",
        }}
      >
        <div>
          <div
            className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4'
            style={{ borderColor: "#b78852" }}
          ></div>
          <p className='text-lg font-semibold' style={{ color: "#8b6a3f" }}>
            Loading Product Details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div
        className='pt-40 pb-20 text-center min-h-screen'
        style={{
          background:
            "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)",
        }}
      >
        <div
          className='max-w-md mx-auto p-8 rounded-3xl shadow-lg'
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(183, 136, 82, 0.2)",
          }}
        >
          <h1 className='text-3xl font-bold mb-4' style={{ color: "#8b6a3f" }}>
            Product Not Found
          </h1>
          <p className='mb-8' style={{ color: "#9c7649" }}>
            {error || "Sorry, we couldn't find the product you're looking for."}
          </p>
          <Link
            href='/products'
            className='text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 inline-block'
            style={{
              background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
              boxShadow: "0 4px 15px rgba(183, 136, 82, 0.3)",
            }}
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

  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "specifications", label: "Technical Specs" },
    { key: "compliance", label: "Regulatory" },
  ];

  if (showContactForm) {
    return (
      <div
        className='pt-32 pb-20 min-h-screen'
        style={{
          background:
            "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)",
        }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <ProductInquiryForm
            product={product}
            onClose={() => setShowContactForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className='min-h-screen'
      style={{
        background:
          "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)",
      }}
    >
      <div className='pt-32 pb-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <nav className='mb-8'>
            <Link
              href='/products'
              className='flex items-center gap-2 font-medium transition-all duration-300 mb-4 hover:scale-105'
              style={{ color: "#b78852" }}
              onMouseEnter={(e) => {
                e.target.style.color = "#8b6a3f";
              }}
              onMouseLeave={(e) => {
                e.target.style.color = "#b78852";
              }}
            >
              <ChevronLeft size={20} />
              Back to Products
            </Link>
          </nav>

          <div className='grid lg:grid-cols-2 gap-12'>
            {/* Product Images */}
            <div className='space-y-4'>
              <div
                className='relative rounded-3xl overflow-hidden shadow-lg'
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(183, 136, 82, 0.15)",
                }}
              >
                <img
                  src={galleryImages[currentImageIndex]}
                  alt={`${product.name} - Image ${currentImageIndex + 1}`}
                  className='w-full h-96 object-contain'
                />
              </div>
              {galleryImages.length > 1 && (
                <div className='grid grid-cols-5 gap-4'>
                  {galleryImages.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative rounded-xl overflow-hidden transition-all duration-300 ${
                        index === currentImageIndex
                          ? "ring-2 ring-offset-2 scale-105"
                          : "hover:opacity-75 hover:scale-105"
                      }`}
                      style={{
                        ringColor:
                          index === currentImageIndex
                            ? "#b78852"
                            : "transparent",
                      }}
                    >
                      <img
                        src={img}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className='w-full h-20 object-cover'
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className='space-y-6 flex flex-col'>
              <div className='flex-grow'>
                <span
                  className='px-4 py-2 rounded-full text-sm font-semibold'
                  style={{
                    backgroundColor: "rgba(183, 136, 82, 0.1)",
                    color: "#8b6a3f",
                  }}
                >
                  {product.category_name}
                </span>
                <h1
                  className='text-3xl md:text-4xl font-bold my-4'
                  style={{ color: "#8b6a3f" }}
                >
                  {product.name}
                </h1>
                <div
                  className='prose prose-lg mb-6'
                  style={{ color: "#9c7649" }}
                  dangerouslySetInnerHTML={{
                    __html: product.short_description,
                  }}
                />

                {/* Quick Info Cards - RESTORED */}
                <div className='grid grid-cols-2 gap-4 mb-6'>
                  <div
                    className='flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105'
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid rgba(183, 136, 82, 0.15)",
                    }}
                  >
                    <Zap className='text-yellow-500' size={20} />
                    <div>
                      <div
                        className='font-semibold text-sm'
                        style={{ color: "#8b6a3f" }}
                      >
                        High Performance
                      </div>
                      <div className='text-xs' style={{ color: "#9c7649" }}>
                        Industry leading accuracy
                      </div>
                    </div>
                  </div>
                  <div
                    className='flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105'
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid rgba(183, 136, 82, 0.15)",
                    }}
                  >
                    <Shield className='text-green-500' size={20} />
                    <div>
                      <div
                        className='font-semibold text-sm'
                        style={{ color: "#8b6a3f" }}
                      >
                        FDA Compliant
                      </div>
                      <div className='text-xs' style={{ color: "#9c7649" }}>
                        21 CFR Part 11 ready
                      </div>
                    </div>
                  </div>
                  <div
                    className='flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105'
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid rgba(183, 136, 82, 0.15)",
                    }}
                  >
                    <Users className='text-blue-500' size={20} />
                    <div>
                      <div
                        className='font-semibold text-sm'
                        style={{ color: "#8b6a3f" }}
                      >
                        Expert Support
                      </div>
                      <div className='text-xs' style={{ color: "#9c7649" }}>
                        24/7 technical assistance
                      </div>
                    </div>
                  </div>
                  <div
                    className='flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105'
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      border: "1px solid rgba(183, 136, 82, 0.15)",
                    }}
                  >
                    <Award className='text-purple-500' size={20} />
                    <div>
                      <div
                        className='font-semibold text-sm'
                        style={{ color: "#8b6a3f" }}
                      >
                        Quality Assured
                      </div>
                      <div className='text-xs' style={{ color: "#9c7649" }}>
                        2-year comprehensive warranty
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Buttons - RESTORED */}
              <div
                className='mt-auto pt-6 space-y-4'
                style={{
                  borderTop: "1px solid rgba(183, 136, 82, 0.2)",
                }}
              >
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <button
                    onClick={() => setShowContactForm(true)}
                    className='text-white py-4 px-6 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105'
                    style={{
                      background:
                        "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
                    }}
                  >
                    <Send size={20} /> Request Detailed Quote
                  </button>
                  <a
                    href='tel:+917096033001'
                    className='py-4 px-6 rounded-xl text-lg font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105'
                    style={{
                      border: "2px solid #b78852",
                      color: "#8b6a3f",
                      backgroundColor: "rgba(183, 136, 82, 0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor =
                        "rgba(183, 136, 82, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor =
                        "rgba(183, 136, 82, 0.05)";
                    }}
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
                      style={{
                        border: "2px solid rgba(183, 136, 82, 0.3)",
                        color: "#8b6a3f",
                        backgroundColor: "rgba(183, 136, 82, 0.05)",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor =
                          "rgba(183, 136, 82, 0.1)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor =
                          "rgba(183, 136, 82, 0.05)";
                      }}
                    >
                      <Download size={20} /> Download Brochure
                    </a>
                  )}
                  <button
                    onClick={() => setShowContactForm(true)}
                    className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 hover:scale-105 ${
                      !product.brochure ? "md:col-span-2" : ""
                    }`}
                    style={{
                      border: "2px solid rgba(183, 136, 82, 0.3)",
                      color: "#8b6a3f",
                      backgroundColor: "rgba(183, 136, 82, 0.05)",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.backgroundColor =
                        "rgba(183, 136, 82, 0.1)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.backgroundColor =
                        "rgba(183, 136, 82, 0.05)";
                    }}
                  >
                    <Calendar size={20} /> Schedule Demo
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information Tabs */}
          <div className='mt-16'>
            <div
              className='mb-8'
              style={{ borderBottom: "1px solid rgba(183, 136, 82, 0.2)" }}
            >
              <nav className='flex space-x-8'>
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-semibold transition-all duration-300 ${
                      activeTab === tab.key
                        ? "border-b-2"
                        : "border-transparent hover:scale-105"
                    }`}
                    style={{
                      borderBottomColor:
                        activeTab === tab.key ? "#b78852" : "transparent",
                      color: activeTab === tab.key ? "#b78852" : "#9c7649",
                    }}
                    onMouseEnter={(e) => {
                      if (activeTab !== tab.key) {
                        e.target.style.color = "#8b6a3f";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (activeTab !== tab.key) {
                        e.target.style.color = "#9c7649";
                      }
                    }}
                  >
                    {tab.icon} {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div>
              {activeTab === "overview" && (
                <div
                  className='p-8 rounded-3xl shadow-sm'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(183, 136, 82, 0.15)",
                  }}
                >
                  <h2
                    className='text-2xl font-bold mb-4'
                    style={{ color: "#8b6a3f" }}
                  >
                    Product Overview
                  </h2>
                  <div
                    className='prose max-w-none mb-8'
                    style={{ color: "#9c7649" }}
                    dangerouslySetInnerHTML={{
                      __html: product.full_description,
                    }}
                  />
                  <h3
                    className='text-xl font-bold mb-6'
                    style={{ color: "#8b6a3f" }}
                  >
                    Key Features
                  </h3>
                  <div className='grid md:grid-cols-2 gap-4'>
                    {product.features?.map((item, index) => (
                      <div
                        key={index}
                        className='flex items-center gap-3 p-4 rounded-xl transition-all duration-300 hover:scale-105'
                        style={{
                          backgroundColor: "rgba(34, 197, 94, 0.08)",
                          border: "1px solid rgba(34, 197, 94, 0.2)",
                        }}
                      >
                        <CheckCircle
                          size={20}
                          className='text-green-600 flex-shrink-0'
                        />
                        <span style={{ color: "#8b6a3f" }}>{item.feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "specifications" && (
                <div
                  className='p-8 rounded-3xl shadow-sm'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(183, 136, 82, 0.15)",
                  }}
                >
                  <h2
                    className='text-2xl font-bold mb-6'
                    style={{ color: "#8b6a3f" }}
                  >
                    Technical Specifications
                  </h2>
                  <div
                    className='rounded-2xl p-6'
                    style={{
                      backgroundColor: "rgba(183, 136, 82, 0.05)",
                      border: "1px solid rgba(183, 136, 82, 0.1)",
                    }}
                  >
                    {product.specifications?.map((item, index) => (
                      <div
                        key={index}
                        className='flex justify-between items-center py-4 last:border-b-0'
                        style={{
                          borderBottom: "1px solid rgba(183, 136, 82, 0.1)",
                        }}
                      >
                        <span
                          className='font-medium'
                          style={{ color: "#9c7649" }}
                        >
                          {item.spec}:
                        </span>
                        <span
                          className='font-semibold'
                          style={{ color: "#8b6a3f" }}
                        >
                          {item.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeTab === "compliance" && (
                <div
                  className='p-8 rounded-3xl shadow-sm'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(183, 136, 82, 0.15)",
                  }}
                >
                  <h2
                    className='text-2xl font-bold mb-6'
                    style={{ color: "#8b6a3f" }}
                  >
                    Regulatory Compliance
                  </h2>
                  <h3
                    className='text-lg font-semibold mb-4'
                    style={{ color: "#8b6a3f" }}
                  >
                    Compliance Standards
                  </h3>
                  <div className='grid md:grid-cols-2 gap-4 mb-8'>
                    {product.compliance?.map((item, index) => (
                      <div
                        key={index}
                        className='p-4 rounded-xl transition-all duration-300 hover:scale-105'
                        style={{
                          backgroundColor: "rgba(59, 130, 246, 0.08)",
                          border: "1px solid rgba(59, 130, 246, 0.2)",
                        }}
                      >
                        <h5
                          className='font-semibold mb-2'
                          style={{ color: "#1e40af" }}
                        >
                          {item.standard}
                        </h5>
                        <p className='text-sm' style={{ color: "#3730a3" }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div
                    className='p-6 rounded-xl'
                    style={{
                      backgroundColor: "rgba(183, 136, 82, 0.1)",
                      border: "1px solid #b78852",
                    }}
                  >
                    <div className='flex items-start gap-3'>
                      <AlertTriangle
                        style={{ color: "#b78852" }}
                        className='mt-1'
                        size={20}
                      />
                      <div>
                        <h4
                          className='font-semibold mb-2'
                          style={{ color: "#8b6a3f" }}
                        >
                          Validation Support
                        </h4>
                        <ul
                          className='text-sm space-y-1 list-disc list-inside'
                          style={{ color: "#9c7649" }}
                        >
                          {product.documentation?.map((item, index) => (
                            <li key={index}>{item.doc}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
