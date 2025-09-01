"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { apiService } from "../../lib/api"; // Import the apiService

export default function SimpleHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hero data using apiService
  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);

        const response = await apiService.getHeroSections();
        const activeHeroSection = response.data.find(
          (section) => section.is_active
        );

        if (activeHeroSection) {
          setHeroData(activeHeroSection);
        } else {
          throw new Error("No active hero section found");
        }
      } catch (err) {
        console.error("Failed to fetch hero data:", err);
        setError("Failed to load hero content");
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
  }, []);

  // Auto-play functionality for the slider
  useEffect(() => {
    if (heroData?.slider_images && heroData.slider_images.length > 1) {
      const duration =
        heroData.slider_images[currentSlide]?.displayDuration * 1000 || 5000;
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroData.slider_images.length);
      }, duration);

      return () => clearInterval(interval);
    }
  }, [heroData, currentSlide]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    if (heroData?.slider_images) {
      setCurrentSlide((prev) =>
        prev === 0 ? heroData.slider_images.length - 1 : prev - 1
      );
    }
  };

  const goToNext = () => {
    if (heroData?.slider_images) {
      setCurrentSlide((prev) => (prev + 1) % heroData.slider_images.length);
    }
  };

  if (loading) {
    return (
      <div className='relative h-[60vh] md:h-[70vh] flex items-center justify-center mt-20 md:mt-24 bg-gray-100'>
        <div className='text-center'>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mb-4'></div>
          <p className='text-lg font-semibold text-gray-700'>Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='relative h-[60vh] md:h-[70vh] flex items-center justify-center mt-20 md:mt-24 bg-red-50'>
        <div className='text-center'>
          <p className='text-lg font-semibold text-red-600 mb-4'>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className='px-6 py-3 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600'
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const renderVideoBackground = () => {
    const videoId = heroData.background_video_url.split("v=")[1];
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&autohide=1&modestbranding=1&iv_load_policy=3&rel=0`;

    return (
      <div className='absolute inset-0 overflow-hidden'>
        <iframe
          src={embedUrl}
          frameBorder='0'
          allow='autoplay; encrypted-media'
          allowFullScreen
          className='w-full h-full'
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            width: "100%",
            height: "100%",
            transform: "translate(-50%, -50%) scale(1.5)",
          }}
        ></iframe>
      </div>
    );
  };

  const renderImageSlider = () => (
    <>
      {heroData.slider_images.map((image, index) => (
        <div
          key={image.id || index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* MODIFICATION START: Replaced <img> with <picture> for responsive images */}
          <picture className='w-full h-full'>
            {/* This source tag tells the browser: "If the screen width is 768px or less,
              use the mobile_image URL." 
              This will only render if `image.mobile_image` exists in your data.
            */}
            {image.mobile_image && (
              <source media='(max-width: 768px)' srcSet={image.mobile_image} />
            )}
            {/* This is the default image. It will be used on screens wider than 768px
              or if the mobile_image is not provided. It also serves as a fallback.
            */}
            <img
              src={image.image}
              alt={image.alt_text || `Slide ${index + 1}`}
              className='w-full h-full object-cover'
              loading={index === 0 ? "eager" : "lazy"}
            />
          </picture>
          {/* MODIFICATION END */}
          <div className='absolute inset-0 bg-black/20'></div>
        </div>
      ))}

      {heroData.slider_images.length > 1 && (
        <>
          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className='absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group'
            aria-label='Previous image'
          >
            <ChevronLeft
              size={24}
              className='text-white group-hover:scale-110 transition-transform'
            />
          </button>
          <button
            onClick={goToNext}
            className='absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 group'
            aria-label='Next image'
          >
            <ChevronRight
              size={24}
              className='text-white group-hover:scale-110 transition-transform'
            />
          </button>

          {/* Dot Indicators */}
          <div className='absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3'>
            {heroData.slider_images.map((_, index) => (
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

          {/* Image counter */}
          <div className='absolute top-6 right-6 px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-sm font-medium'>
            {currentSlide + 1} / {heroData.slider_images.length}
          </div>
        </>
      )}
    </>
  );

  return (
    <div className='relative h-[60vh] md:h-[70vh] overflow-hidden mt-20 md:mt-24'>
      <div className='relative h-full'>
        {heroData?.background_video_url
          ? renderVideoBackground()
          : renderImageSlider()}
      </div>
    </div>
  );
}