"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Hero from "../components/sections/Hero";
import ProductCard from "../components/common/ProductCard";
import {
  Eye,
  Heart,
  Target,
  TrendingUp,
  Users,
  Award,
  Shield,
  CheckCircle,
  Star,
  Building,
  Globe,
  Calendar,
} from "lucide-react";

// API-Integrated Partners Section
const PartnersSection = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const response = await axios.get("https://sweekarme.in/shree/api/core/partners/");
        
        if (response?.data && Array.isArray(response.data)) {
          // Filter only active partnerships and sort by display order, then by featured status
          const activePartners = response.data
            .filter(partner => partner.is_active_partnership)
            .sort((a, b) => {
              // First sort by display_order, then by is_featured (featured first)
              if (a.display_order !== b.display_order) {
                return a.display_order - b.display_order;
              }
              return b.is_featured - a.is_featured;
            });
          
          setPartners(activePartners);
        } else {
          setPartners([]);
        }
      } catch (err) {
        console.error("Failed to fetch partners:", err);
        setError("Failed to load partner information");
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const getPartnerIcon = (partnerType) => {
    const iconMap = {
      'technology': <Building size={24} />,
      'distributor': <Globe size={24} />,
      'service': <TrendingUp size={24} />,
      'strategic': <Award size={24} />,
      'supplier': <Users size={24} />,
      default: <Building size={24} />
    };
    return iconMap[partnerType] || iconMap['default'];
  };

  const getPartnershipYears = (partnershipSince) => {
    if (!partnershipSince) return 0;
    const startYear = new Date(partnershipSince).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - startYear;
  };

  const formatPartnershipSince = (partnershipSince) => {
    if (!partnershipSince) return 'Recent';
    return new Date(partnershipSince).getFullYear();
  };

  if (loading) {
    return (
      <section 
        className="py-12 md:py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div 
              className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4"
              style={{ borderColor: "#b78852" }}
            ></div>
            <p className="text-lg font-semibold" style={{ color: "#8b6a3f" }}>
              Loading Partners...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section 
        className="py-12 md:py-20 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
      </section>
    );
  }

  return (
    <section 
      className="py-12 md:py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6" style={{ color: "#8b6a3f" }}>
            Our Global Technology Partners
          </h2>
          <p className="text-base md:text-xl max-w-3xl mx-auto leading-relaxed" style={{ color: "#9c7649" }}>
            Trusted partnerships with world-leading instrument manufacturers, bringing cutting-edge pharmaceutical solutions to India.
          </p>
        </div>

        {/* Partners Grid */}
        {partners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-20">
            {partners.map((partner, index) => {
              const partnershipYears = getPartnershipYears(partner.partnership_since);
              const sinceYear = formatPartnershipSince(partner.partnership_since);
              
              return (
                <div 
                  key={partner.id} 
                  className={`group rounded-2xl md:rounded-3xl p-6 md:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 active:scale-95 relative ${
                    partner.is_featured ? 'ring-2 ring-offset-2' : ''
                  }`}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(183, 136, 82, 0.15)",
                    backdropFilter: "blur(10px)",
                    ringColor: partner.is_featured ? "#b78852" : "transparent"
                  }}
                >
                  {/* Featured Badge */}
                  {partner.is_featured && (
                    <div 
                      className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: "#b78852" }}
                    >
                      Featured
                    </div>
                  )}

                  {/* Partner Logo */}
                  <div 
                    className="relative mx-auto w-20 h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 flex items-center justify-center mb-4 md:mb-6 rounded-xl md:rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110 overflow-hidden"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.8)" }}
                  >
                    {partner.logo ? (
                      <img
                        src={partner.logo}
                        alt={`${partner.name} logo`}
                        className="max-w-full max-h-full object-contain p-2"
                        loading="lazy"
                      />
                    ) : (
                      <div style={{ color: "#b78852" }}>
                        {getPartnerIcon(partner.partner_type)}
                      </div>
                    )}
                  </div>

                  {/* Partner Info */}
                  <h3 className="text-lg md:text-xl font-bold mb-2 capitalize" style={{ color: "#8b6a3f" }}>
                    {partner.name}
                  </h3>
                  
                  <p className="text-sm mb-3" style={{ color: "#9c7649" }}>
                    {partner.country} • Since {sinceYear}
                    {partnershipYears > 0 && (
                      <span className="block text-xs mt-1">
                        {partnershipYears} year{partnershipYears !== 1 ? 's' : ''} partnership
                      </span>
                    )}
                  </p>

                  {/* Partner Type Badge */}
                  <span 
                    className="inline-block px-3 py-1 md:px-4 md:py-1 rounded-full text-xs md:text-sm font-semibold"
                    style={{
                      background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
                      color: "white"
                    }}
                  >
                    {partner.partner_type_display || partner.partner_type}
                  </span>

                  {/* Recognition Level */}
                  {partner.recognition_level && (
                    <div className="mt-3">
                      <span 
                        className="inline-block px-2 py-1 rounded-full text-xs font-medium"
                        style={{
                          backgroundColor: "rgba(34, 197, 94, 0.1)",
                          color: "#059669"
                        }}
                      >
                        {partner.recognition_level}
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg" style={{ color: "#9c7649" }}>
              No active partnerships to display at this time.
            </p>
          </div>
        )}

        {/* Partnership Benefits Section */}
        <div 
          className="rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-sm"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(183, 136, 82, 0.15)",
            backdropFilter: "blur(10px)"
          }}
        >
          <div className="text-center mb-8 md:mb-12">
            <h3 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4" style={{ color: "#8b6a3f" }}>
              Why Leading Manufacturers Partner With Us
            </h3>
            <p className="text-sm md:text-base max-w-2xl mx-auto" style={{ color: "#9c7649" }}>
              Our proven track record and commitment to excellence make us the preferred choice for global partnerships
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { icon: <TrendingUp size={20} />, title: "Market Leadership", stat: "28+ Years", description: "Industry experience" },
              { icon: <Shield size={20} />, title: "Service Excellence", stat: "24/7 Support", description: "Always available" },
              { icon: <CheckCircle size={20} />, title: "Regulatory Knowledge", stat: "100% Compliant", description: "FDA standards" },
              { icon: <Users size={20} />, title: "Customer Relations", stat: "800+ Customers", description: "Trusted nationwide" }
            ].map((benefit, index) => (
              <div key={index} className="group text-center">
                <div 
                  className="inline-flex items-center justify-center w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl mb-4 group-hover:scale-110 transition-all duration-300 shadow-sm"
                  style={{ backgroundColor: "rgba(183, 136, 82, 0.1)" }}
                >
                  <div style={{ color: "#b78852" }}>
                    {benefit.icon}
                  </div>
                </div>
                <div className="space-y-1 md:space-y-2">
                  <div className="text-xl md:text-2xl font-bold" style={{ color: "#8b6a3f" }}>
                    {benefit.stat}
                  </div>
                  <h4 className="text-sm md:text-lg font-semibold" style={{ color: "#8b6a3f" }}>
                    {benefit.title}
                  </h4>
                  <p className="text-xs md:text-sm" style={{ color: "#9c7649" }}>
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 md:mt-16">
          <div 
            className="inline-block rounded-2xl md:rounded-3xl p-6 md:p-8 shadow-sm"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(183, 136, 82, 0.15)",
              backdropFilter: "blur(10px)"
            }}
          >
            <h4 className="text-xl md:text-2xl font-bold mb-3 md:mb-4" style={{ color: "#8b6a3f" }}>
              Interested in Partnership?
            </h4>
            <p className="text-sm md:text-base mb-4 md:mb-6 max-w-md mx-auto" style={{ color: "#9c7649" }}>
              Join our network of trusted partners and expand your reach in the Indian pharmaceutical market
            </p>
            <button 
              className="px-6 py-3 md:px-8 md:py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-white text-sm md:text-base shadow-lg hover:shadow-xl"
              style={{
                background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)"
              }}
            >
              Contact Partnership Team
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};


const WhyChooseUsSection = () => (
  <section className='py-20 bg-gradient-to-r from-amber-50 to-orange-50'>
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='text-center mb-16'>
        <h2 className='text-3xl md:text-4xl font-bold text-brand-brown mb-4'>
          Why Choose Shreedhar Instruments?
        </h2>
        <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
          Your most trusted, reliable and ethical partner for analytical
          instruments in pharmaceutical industry
        </p>
      </div>
      <div className='grid md:grid-cols-3 gap-8'>
        <div className='bg-white p-8 rounded-2xl shadow-lg text-center'>
          <Eye className='text-brand-gold mx-auto' size={48} />
          <h3 className='text-xl font-bold text-brand-brown my-4'>
            Precision & Quality
          </h3>
          <p className='text-gray-600'>
            We commit to delivering highly accurate and reliable instruments
            that exceed industry standards.
          </p>
        </div>
        <div className='bg-white p-8 rounded-2xl shadow-lg text-center'>
          <Heart className='text-red-500 mx-auto' size={48} />
          <h3 className='text-xl font-bold text-brand-brown my-4'>Integrity</h3>
          <p className='text-gray-600'>
            We uphold the highest ethical standards in every interaction.
          </p>
        </div>
        <div className='bg-white p-8 rounded-2xl shadow-lg text-center'>
          <Target className='text-blue-600 mx-auto' size={48} />
          <h3 className='text-xl font-bold text-brand-brown my-4'>
            Customer-Centricity
          </h3>
          <p className='text-gray-600'>
            We listen to our customers and shape our solutions to meet their
            needs.
          </p>
        </div>
      </div>
    </div>
  </section>
);

const FeaturedProductsSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await axios.get(
          "https://sweekarme.in/shree/api/products/all/?is_featured=true"
        );
        setFeaturedProducts(response?.data?.slice(0, 3)); // Show max 3
      } catch (error) {
        console.log("Failed to fetch featured products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <section className='py-20 bg-brand-off-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-brand-brown mb-4'>
            Featured Analytical Instruments
          </h2>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Discover our regulatory-compliant instruments trusted by leading
            pharmaceutical companies
          </p>
        </div>
        {loading ? (
          <p className='text-center'>Loading featured products...</p>
        ) : (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {featuredProducts?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get(
          "https://sweekarme.in/shree/api/testimonials/?is_featured=true"
        );
        setTestimonials(response?.data);
      } catch (error) {
        console.log("Failed to fetch testimonials:", error);
      }
    };
    fetchTestimonials();
  }, []);

  return (
    <section className='py-20 bg-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-bold text-brand-brown mb-4'>
            Trusted by Leading Pharma Companies
          </h2>
          <p className='text-xl text-gray-600'>
            Our customer-centric approach has earned us loyalty across the
            industry
          </p>
        </div>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {testimonials?.map((testimonial) => (
            <div
              key={testimonial.id}
              className='bg-amber-50 p-6 rounded-2xl border-l-4 border-brand-gold'
            >
              <div className='flex text-yellow-400 mb-4'>
                <Star size={16} fill='currentColor' />
                <Star size={16} fill='currentColor' />
                <Star size={16} fill='currentColor' />
                <Star size={16} fill='currentColor' />
                <Star size={16} fill='currentColor' />
              </div>
              <p className='text-gray-700 mb-4 italic'>{`"${testimonial.testimonial_text}"`}</p>
              <div>
                <div className='font-semibold text-brand-brown'>
                  {testimonial.client_name}
                </div>
                <div className='text-sm text-brand-brown-light'>
                  {testimonial.company}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default function Page() {
  return (
    <>
      <Hero />
     
      <PartnersSection />
      <WhyChooseUsSection />
      <FeaturedProductsSection />
      <TestimonialsSection />
    </>
  );
}