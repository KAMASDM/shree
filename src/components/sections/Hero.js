"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function SimpleHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hero images from API
  useEffect(() => {
    const fetchHeroImages = async () => {
      try {
        setLoading(true);
        
        // Fetch hero sections from the correct endpoint
        const response = await axios.get("https://sweekarme.in/shree/api/core/hero-sections/");
        
        if (response?.data && Array.isArray(response.data) && response.data.length > 0) {
          // Find the first active hero section
          const activeHeroSection = response.data.find(section => section.is_active);
          
          if (activeHeroSection && activeHeroSection.slider_images && activeHeroSection.slider_images.length > 0) {
            // Sort slider images by order and format them
            const sortedImages = activeHeroSection.slider_images
              .sort((a, b) => a.order - b.order)
              .map(slide => ({
                id: slide.id,
                image: slide.image,
                alt: slide.alt_text || `Slide ${slide.order + 1}`,
                caption: slide.caption,
                displayDuration: slide.display_duration * 1000 // Convert to milliseconds
              }));
            
            setHeroImages(sortedImages);
          } else {
            // Fallback: use featured products' images if no slider images available
            const productsResponse = await axios.get("https://sweekarme.in/shree/api/products/all/?is_featured=true");
            const featuredProducts = productsResponse.data.slice(0, 5);
            
            const fallbackImages = featuredProducts.map((product, index) => ({
              id: product.id,
              image: product.main_image,
              alt: `${product.name} - Featured Product`,
              caption: product.name,
              displayDuration: 5000 // Default 5 seconds
            }));
            
            setHeroImages(fallbackImages);
          }
        } else {
          throw new Error("No hero sections found");
        }
      } catch (err) {
        console.error("Failed to fetch hero images:", err);
        setError("Failed to load hero images");
        
        // Set a minimal fallback if everything fails
        setHeroImages([{
          id: 1,
          image: "/images/default-hero.jpg",
          alt: "Shreedhar Instruments",
          caption: "Pharmaceutical Analytical Solutions",
          displayDuration: 5000
        }]);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroImages();
  }, []);

  // Auto-play functionality with dynamic timing
  useEffect(() => {
    if (heroImages.length <= 1) return; // Don't auto-play if only one image

    const currentImage = heroImages[currentSlide];
    const duration = currentImage?.displayDuration || 5000; // Fallback to 5 seconds

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, duration);

    return () => clearInterval(interval);
  }, [heroImages.length, currentSlide, heroImages]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length);
  };

  // Loading state
  if (loading) {
    return (
      <div 
        className="relative h-[60vh] md:h-[70vh] flex items-center justify-center mt-20 md:mt-24"
        style={{
          background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)"
        }}
      >
        <div className="text-center">
          <div 
            className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
            style={{ borderColor: "#b78852" }}
          ></div>
          <p className="text-lg font-semibold" style={{ color: "#8b6a3f" }}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div 
        className="relative h-[60vh] md:h-[70vh] flex items-center justify-center mt-20 md:mt-24"
        style={{
          background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)"
        }}
      >
        <div className="text-center">
          <p className="text-lg font-semibold text-red-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: "#b78852" }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[60vh] md:h-[70vh] overflow-hidden mt-20 md:mt-24">
      {/* Image Slider */}
      <div className="relative h-full">
        {heroImages.map((image, index) => (
          <div
            key={image.id || index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={image.image}
              alt={image.alt || `Hero Image ${index + 1}`}
              className="w-full h-full object-cover"
              loading={index === 0 ? "eager" : "lazy"}
            />
            {/* Optional overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
            {image.caption && (
              <div className="absolute bottom-16 md:bottom-24 left-1/2 -translate-x-1/2 text-center text-white p-4">
                <h2 className="text-3xl md:text-5xl font-bold">{image.caption}</h2>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Only show if more than 1 image */}
      {heroImages.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
            aria-label="Previous image"
          >
            <ChevronLeft 
              size={24} 
              className="text-white group-hover:scale-110 transition-transform" 
            />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group"
            aria-label="Next image"
          >
            <ChevronRight 
              size={24} 
              className="text-white group-hover:scale-110 transition-transform" 
            />
          </button>
        </>
      )}

      {/* Dot Indicators - Only show if more than 1 image */}
      {heroImages.length > 1 && (
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Optional: Image counter */}
      {heroImages.length > 1 && (
        <div className="absolute top-6 right-6 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-sm font-medium">
          {currentSlide + 1} / {heroImages.length}
        </div>
      )}
    </div>
  );
}