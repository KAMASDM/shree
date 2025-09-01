"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";

// ✨ Reusable Product Card Component
function ProductCard({ product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="relative block w-full h-full group"
    >
      <div className="relative z-10 w-full h-full overflow-hidden transition-all duration-500 bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1">
        {/* Product Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <Image
            src={product.main_image || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop"}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent"></div>
          <span
            className="absolute px-3 py-1 text-xs font-semibold text-white shadow-lg top-3 left-3 rounded-full backdrop-blur-sm"
            style={{ backgroundColor: "rgba(183, 136, 82, 0.8)" }}
          >
            {product.category_name}
          </span>
        </div>

        {/* Product Content */}
        <div className="p-4">
          <h3
            className="mb-2 text-base font-bold leading-tight line-clamp-2"
            style={{ color: "#8b6a3f" }}
          >
            {product.name}
          </h3>
          {product.brand && (
            <span
              className="inline-block px-2 py-0.5 mb-3 text-xs font-medium rounded-full"
              style={{ backgroundColor: "rgba(183, 136, 82, 0.1)", color: "#8b6a3f" }}
            >
              {product.brand.name || product.brand}
            </span>
          )}
          <div
            className="w-full py-2 mt-auto text-sm font-semibold text-center text-white transition-all duration-300 rounded-lg shadow-md group-hover:shadow-lg flex items-center justify-center gap-1.5"
            style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
          >
            <span>View Details</span>
            <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function ProductSlider({ currentProduct, title = "Related Products" }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const sliderRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://sweekarme.in/shree/api/products/all/");
        const allProducts = response.data;
        const currentApplications = currentProduct.applications || [];
        
        let relatedProducts = allProducts.filter(p => {
          if (p.id === currentProduct.id) return false;
          const productApplications = p.applications || [];
          return currentApplications.some(currentApp => {
            const currentAppName = typeof currentApp === 'string' ? currentApp : currentApp.app || currentApp.name;
            return productApplications.some(prodApp => {
              const prodAppName = typeof prodApp === 'string' ? prodApp : prodApp.app || prodApp.name;
              return prodAppName?.toLowerCase().includes(currentAppName?.toLowerCase()) || currentAppName?.toLowerCase().includes(prodAppName?.toLowerCase());
            });
          });
        });
        
        if (relatedProducts.length < 4) {
          const categoryProducts = allProducts.filter(p => p.id !== currentProduct.id && p.category_name === currentProduct.category_name && !relatedProducts.find(rp => rp.id === p.id));
          relatedProducts = [...relatedProducts, ...categoryProducts];
        }

        if (relatedProducts.length < 4) {
          const randomProducts = allProducts.filter(p => p.id !== currentProduct.id && !relatedProducts.find(rp => rp.id === p.id));
          relatedProducts = [...relatedProducts, ...randomProducts];
        }
        
        setProducts(relatedProducts.slice(0, 12));
      } catch (err) {
        setError("Failed to load related products");
        console.error("Error fetching related products:", err);
      } finally {
        setLoading(false);
      }
    };
    if (currentProduct) fetchRelatedProducts();
  }, [currentProduct]);

  const scrollToSlide = useCallback((index) => {
    const slider = sliderRef.current;
    if (!slider) return;
    const slide = slider.children[index];
    if (slide) {
      const sliderRect = slider.getBoundingClientRect();
      const slideRect = slide.getBoundingClientRect();
      const scrollLeft = slideRect.left - sliderRect.left + slider.scrollLeft - (sliderRect.width - slideRect.width) / 2;
      
      slider.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => (prev + 1) % products.length);
  }, [products.length]);

  useEffect(() => {
    if (!isHovering && products.length > 0) {
      intervalRef.current = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isHovering, products, nextSlide]);

  useEffect(() => {
    scrollToSlide(currentSlide);
  }, [currentSlide, scrollToSlide]);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || products.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.dataset.index, 10);
            if (!isNaN(index)) {
              setCurrentSlide(index);
            }
          }
        });
      },
      { root: slider, threshold: 0.5 }
    );

    Array.from(slider.children).forEach((child, index) => {
      child.dataset.index = index;
      observer.observe(child);
    });

    return () => observer.disconnect();
  }, [loading, products.length]);

  if (loading) {
    return <div className="py-12"><div className="w-24 h-4 mx-auto mb-4 bg-gray-200 rounded-lg animate-pulse"></div><div className="h-72 bg-gray-200 rounded-lg animate-pulse"></div></div>;
  }

  if (error || products.length === 0) return null;

  return (
    <div className="py-12 my-8" onMouseEnter={() => setIsHovering(true)} onMouseLeave={() => setIsHovering(false)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight" style={{ color: "#8b6a3f" }}>
            {title}
          </h2>
          <p className="mt-2 text-lg" style={{ color: "#9c7649" }}>
            Discover instruments with similar applications and capabilities.
          </p>
        </div>

        {/* The slider container now has the 'slider-container' class */}
        <div className="relative group slider-container">
          <div
            ref={sliderRef}
            className="flex gap-6 p-4 -m-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
          >
            {products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-[85%] sm:w-[45%] md:w-1/3 lg:w-1/4 snap-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide(prev => (prev - 1 + products.length) % products.length)}
            className="absolute top-1/2 left-0 -translate-y-1/2 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110 disabled:opacity-30"
            aria-label="Previous"
            disabled={currentSlide === 0}
          >
            <ChevronLeft style={{ color: "#b78852" }} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-0 -translate-y-1/2 z-20 p-2 bg-white/80 backdrop-blur-sm rounded-full shadow-lg transition-all opacity-0 group-hover:opacity-100 hover:scale-110 disabled:opacity-30"
            aria-label="Next"
            disabled={currentSlide === products.length - 1}
          >
            <ChevronRight style={{ color: "#b78852" }} />
          </button>
        </div>

        <div className="flex justify-center mt-8 gap-2">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${currentSlide === index ? 'scale-125' : 'hover:scale-110'}`}
              style={{ backgroundColor: currentSlide === index ? "#b78852" : "rgba(183, 136, 82, 0.3)" }}
              aria-label={`Go to product ${index + 1}`}
            />
          ))}
        </div>
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

        /* ✨ NEW CSS FOR FADE EFFECT ✨ */
        .slider-container {
            position: relative;
        }
        .slider-container::before,
        .slider-container::after {
            content: '';
            position: absolute;
            top: 0;
            bottom: 0;
            width: 10%; /* Adjust width of the fade */
            z-index: 10; /* Ensures the fade is above the slider cards */
            pointer-events: none; /* Allows clicks to pass through the fade */
        }
        .slider-container::before {
            left: 0;
            background: linear-gradient(to right, white, transparent);
        }
        .slider-container::after {
            right: 0;
            background: linear-gradient(to left, white, transparent);
        }
      `}</style>
    </div>
  );
}