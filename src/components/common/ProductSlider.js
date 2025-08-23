// src/components/common/ProductSlider.js
"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

export default function ProductSlider({ currentProduct, title = "Related Products" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        // Fetch all products
        const response = await axios.get("https://sweekarme.in/shree/api/products/all/");
        const allProducts = response.data;

        // Filter products with similar applications
        const currentApplications = currentProduct.applications || [];
        const relatedProducts = allProducts.filter(product => {
          // Exclude the current product
          if (product.id === currentProduct.id) return false;
          
          // Check if product has any similar applications
          const productApplications = product.applications || [];
          return currentApplications.some(currentApp => {
            const currentAppName = typeof currentApp === 'string' ? currentApp : currentApp.app || currentApp.name;
            return productApplications.some(prodApp => {
              const prodAppName = typeof prodApp === 'string' ? prodApp : prodApp.app || prodApp.name;
              return prodAppName && currentAppName && 
                     prodAppName.toLowerCase().includes(currentAppName.toLowerCase()) ||
                     currentAppName.toLowerCase().includes(prodAppName.toLowerCase());
            });
          });
        });

        // If no products with similar applications, show products from same category
        let finalProducts = relatedProducts;
        if (finalProducts.length === 0) {
          finalProducts = allProducts.filter(product => 
            product.id !== currentProduct.id && 
            product.category_name === currentProduct.category_name
          );
        }

        // If still no products, show random products (excluding current)
        if (finalProducts.length === 0) {
          finalProducts = allProducts.filter(product => product.id !== currentProduct.id);
        }

        // Limit to 8 products for performance
        setProducts(finalProducts.slice(0, 8));
      } catch (err) {
        setError("Failed to load related products");
        console.error("Error fetching related products:", err);
      } finally {
        setLoading(false);
      }
    };

    if (currentProduct) {
      fetchRelatedProducts();
    }
  }, [currentProduct]);

  const scrollToSlide = (index) => {
    setCurrentSlide(index);
    if (sliderRef.current) {
      const slideWidth = sliderRef.current.children[0]?.offsetWidth || 0;
      const gap = 24; // 1.5rem gap
      sliderRef.current.scrollTo({
        left: index * (slideWidth + gap),
        behavior: 'smooth'
      });
    }
  };

  const nextSlide = () => {
    const nextIndex = currentSlide + 1 >= products.length ? 0 : currentSlide + 1;
    scrollToSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = currentSlide - 1 < 0 ? products.length - 1 : currentSlide - 1;
    scrollToSlide(prevIndex);
  };

  if (loading) {
    return (
      <div 
        className="p-8 rounded-3xl shadow-sm mb-8"
        style={{ 
          backgroundColor: "rgba(255, 255, 255, 0.9)", 
          border: "1px solid rgba(183, 136, 82, 0.15)" 
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold" style={{ color: "#8b6a3f" }}>
            {title}
          </h2>
        </div>
        <div className="flex gap-6 overflow-hidden">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex-shrink-0 w-72 animate-pulse">
              <div className="bg-gray-300 h-48 rounded-xl mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return null; // Don't show the slider if there are no related products
  }

  return (
    <div 
      className="p-8 rounded-3xl shadow-sm mb-8"
      style={{ 
        backgroundColor: "rgba(255, 255, 255, 0.9)", 
        border: "1px solid rgba(183, 136, 82, 0.15)" 
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ color: "#8b6a3f" }}>
          {title}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: "rgba(183, 136, 82, 0.1)", color: "#b78852" }}
            aria-label="Previous products"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full transition-all duration-300 hover:scale-110"
            style={{ backgroundColor: "rgba(183, 136, 82, 0.1)", color: "#b78852" }}
            aria-label="Next products"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Slider Container */}
      <div className="relative overflow-hidden">
        <div 
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product, index) => (
            <Link
              href={`/products/${product.slug}`}
              key={product.id}
              className="flex-shrink-0 w-72 group"
            >
              <div
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 active:scale-95"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(183, 136, 82, 0.15)",
                  backdropFilter: "blur(10px)"
                }}
              >
                {/* Product Image */}
                <div className="relative overflow-hidden">
                  <Image
                    src={product.main_image || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"}
                    alt={product.name}
                    width={288}
                    height={192}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white shadow-lg backdrop-blur-sm"
                      style={{ backgroundColor: "rgba(183, 136, 82, 0.9)" }}
                    >
                      {product.category_name}
                    </span>
                  </div>

                  {/* Star Icon */}
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div
                      className="p-2 rounded-full backdrop-blur-sm"
                      style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}
                    >
                      <Star size={14} style={{ color: "#b78852" }} />
                    </div>
                  </div>
                </div>

                {/* Product Content */}
                <div className="p-6">
                  <h3
                    className="text-lg font-bold mb-3 group-hover:opacity-80 transition-all duration-300 line-clamp-2 leading-tight"
                    style={{ color: "#8b6a3f" }}
                  >
                    {product.name}
                  </h3>

                  <div
                    className="mb-4 line-clamp-2 leading-relaxed text-sm"
                    style={{ color: "#9c7649" }}
                    dangerouslySetInnerHTML={{ __html: product.short_description }}
                  />

                  {/* Brand Badge */}
                  {product.brand && (
                    <div className="mb-4">
                      <span
                        className="text-xs font-medium px-3 py-1 rounded-full"
                        style={{
                          backgroundColor: "rgba(183, 136, 82, 0.1)",
                          color: "#8b6a3f"
                        }}
                      >
                        {product.brand.name || product.brand}
                      </span>
                    </div>
                  )}

                  {/* Action Button */}
                  <div
                    className="w-full py-3 text-center rounded-xl font-semibold shadow-md group-hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 text-white text-sm"
                    style={{
                      background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)"
                    }}
                  >
                    <span>View Details</span>
                    <ArrowRight
                      size={14}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div
                  className="h-1 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
                  style={{
                    background: "linear-gradient(90deg, #b78852 0%, #c9955f 100%)"
                  }}
                ></div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      {products.length > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          {products.slice(0, Math.ceil(products.length / 4)).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToSlide(index * 4)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(currentSlide / 4) === index
                  ? "w-8 scale-125"
                  : "hover:scale-110"
              }`}
              style={{
                backgroundColor: Math.floor(currentSlide / 4) === index
                  ? "#b78852"
                  : "rgba(183, 136, 82, 0.3)"
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* View All Products Link */}
      <div className="text-center mt-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
          style={{
            backgroundColor: "rgba(183, 136, 82, 0.1)",
            color: "#8b6a3f",
            border: "1px solid rgba(183, 136, 82, 0.3)"
          }}
        >
          View All Products
          <ArrowRight size={16} />
        </Link>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}