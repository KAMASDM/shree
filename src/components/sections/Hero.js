"use client";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { apiService } from "../../lib/api";
import Image from "next/image";

export default function SimpleHeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroData, setHeroData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint in Tailwind
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Filter images based on device type
  const getFilteredImages = () => {
    if (!heroData?.slider_images) return [];
    
    if (isMobile) {
      // On mobile: show only images with alt_text "mobile"
      return heroData.slider_images.filter(image => 
        image.alt_text?.toLowerCase() === 'mobile'
      );
    } else {
      // On desktop/tablet: show images that are NOT mobile-specific
      return heroData.slider_images.filter(image => 
        image.alt_text?.toLowerCase() !== 'mobile'
      );
    }
  };

  const filteredImages = getFilteredImages();
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

  // Auto-play functionality
  useEffect(() => {
    if (filteredImages.length > 1 && isAutoPlaying) {
      const duration = filteredImages[currentSlide]?.display_duration * 1000 || 5000;
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % filteredImages.length);
      }, duration);

      return () => clearInterval(interval);
    }
  }, [filteredImages, currentSlide, isAutoPlaying]);

  // Reset current slide when filtered images change (mobile/desktop switch)
  useEffect(() => {
    setCurrentSlide(0);
  }, [isMobile]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    if (filteredImages.length > 0) {
      setCurrentSlide((prev) =>
        prev === 0 ? filteredImages.length - 1 : prev - 1
      );
    }
  };

  const goToNext = () => {
    if (filteredImages.length > 0) {
      setCurrentSlide((prev) => (prev + 1) % filteredImages.length);
    }
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  if (loading) {
    return (
      <div className='w-full'>
        {/* Consistent aspect ratio for loading state */}
        <div className='relative w-full h-[70vh] sm:h-[65vh] md:h-[70vh] lg:h-[80vh] max-h-[800px] min-h-[500px] sm:min-h-[450px] md:min-h-[400px]'>
          <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'>
            <div className='text-center space-y-4'>
              <div className='relative'>
                <div className='w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto'></div>
                <div className='w-12 h-12 border-4 border-transparent border-t-blue-500 rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2'></div>
              </div>
              <div className='space-y-2'>
                <h2 className='text-xl font-bold text-white'>Loading Experience</h2>
                <p className='text-gray-300'>Preparing your visual journey...</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='w-full'>
        {/* Consistent aspect ratio for error state */}
        <div className='relative w-full h-[70vh] sm:h-[65vh] md:h-[70vh] lg:h-[80vh] max-h-[800px] min-h-[500px] sm:min-h-[450px] md:min-h-[400px]'>
          <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-gray-900'>
            <div className='text-center space-y-6 p-8'>
              <div className='w-20 h-20 mx-auto bg-red-500/20 rounded-full flex items-center justify-center'>
                <div className='w-8 h-8 bg-red-500 rounded-full'></div>
              </div>
              <div className='space-y-4'>
                <h2 className='text-2xl font-bold text-white'>Oops! Something went wrong</h2>
                <p className='text-red-200 max-w-md mx-auto'>{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className='px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-red-500/25'
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
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
          className='absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full object-cover transform -translate-x-1/2 -translate-y-1/2 scale-105'
        ></iframe>
        <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent'></div>
      </div>
    );
  };

  const renderImageSlider = () => (
    <div className='absolute inset-0'>
      {/* Images */}
      {heroData.slider_images.map((image, index) => (
        <div
          key={image.id || index}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? "opacity-100" 
              : "opacity-0"
          }`}
        >
          {/* Responsive Image Container */}
          <div className='relative w-full h-full overflow-hidden'>
            <Image
              src={image.image}
              alt={image.alt_text || `Slide ${index + 1}`}
              fill
              priority={index === 0} 
              className='
                object-cover
                w-full 
                h-full
                transition-transform 
                duration-1000 
                ease-out
                scale-100
                hover:scale-105
              '
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 768px) 100vw,
                (max-width: 1024px) 100vw,
                100vw
              "
              style={{
                objectPosition: 'center center',
                objectFit: 'cover'
              }}
            />
          </div>
          
          {/* Responsive Gradient Overlays */}
          <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent'></div>
          <div className='absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30 hidden sm:block'></div>
        </div>
      ))}

      {heroData.slider_images.length > 1 && (
        <>
          {/* Navigation Controls - Better mobile positioning */}
          <button
            onClick={goToPrevious}
            className='absolute left-3 sm:left-4 lg:left-8 top-1/2 transform -translate-y-1/2 z-10 group'
            aria-label='Previous image'
          >
            <div className='relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/40 hover:bg-black/60 transition-all duration-300'>
              <ChevronLeft className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform duration-300' />
            </div>
          </button>

          <button
            onClick={goToNext}
            className='absolute right-3 sm:right-4 lg:right-8 top-1/2 transform -translate-y-1/2 z-10 group'
            aria-label='Next image'
          >
            <div className='relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-sm border border-white/40 hover:bg-black/60 transition-all duration-300'>
              <ChevronRight className='w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white group-hover:scale-110 transition-transform duration-300' />
            </div>
          </button>

          {/* Bottom Controls - Better mobile positioning */}
          <div className='absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 z-10 px-4'>
            <div className='flex items-center space-x-3 sm:space-x-4 md:space-x-6 px-3 sm:px-4 md:px-6 py-2.5 sm:py-3 md:py-4 bg-black/30 backdrop-blur-md rounded-full border border-white/30'>
              {/* Dot Indicators */}
              <div className='flex space-x-2 sm:space-x-2 md:space-x-2'>
                {heroData.slider_images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className='group relative p-1.5 sm:p-1'
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <div className={`rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-white scale-125 w-2.5 h-2.5 sm:w-3 sm:h-3"
                        : "bg-white/50 hover:bg-white/70 group-hover:scale-110 w-2 h-2 sm:w-2.5 sm:h-2.5"
                    }`}></div>
                  </button>
                ))}
              </div>

              {/* Auto-play Toggle */}
              <button
                onClick={toggleAutoPlay}
                className='p-2 sm:p-1.5 md:p-2 rounded-full hover:bg-white/20 transition-all duration-300 group'
                aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
              >
                {isAutoPlaying ? (
                  <Pause className='w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white group-hover:scale-110 transition-transform duration-300' />
                ) : (
                  <Play className='w-4 h-4 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white group-hover:scale-110 transition-transform duration-300' />
                )}
              </button>

              {/* Counter */}
              <div className='text-white/90 text-sm sm:text-sm md:text-base font-medium whitespace-nowrap'>
                {currentSlide + 1}/{heroData.slider_images.length}
              </div>
            </div>
          </div>

          {/* Progress Bar - More visible on mobile */}
          <div className='absolute top-0 left-0 w-full h-1 sm:h-1 bg-white/20 z-10'>
            <div
              className='h-full bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-1000 ease-linear'
              style={{
                width: `${((currentSlide + 1) / heroData.slider_images.length) * 100}%`
              }}
            ></div>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className='w-full mt-12 sm:mt-16 md:mt-20 lg:mt-24'>
      {/* RESPONSIVE CONTAINER - Better mobile approach */}
      <div className='relative w-full h-[70vh] sm:h-[65vh] md:h-[70vh] lg:h-[80vh] max-h-[800px] min-h-[500px] sm:min-h-[450px] md:min-h-[400px] overflow-hidden'>
        
        {/* Background Pattern */}
        <div className='absolute inset-0 opacity-5 z-0'>
          <div className='absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500'></div>
          <div 
            className='absolute inset-0 opacity-30'
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '30px 30px sm:40px sm:40px md:50px md:50px'
            }}
          ></div>
        </div>

        {/* Main Content */}
        {heroData?.background_video_url
          ? renderVideoBackground()
          : renderImageSlider()}
      </div>
    </div>
  );
}