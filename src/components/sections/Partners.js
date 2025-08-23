"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Building, Award, Globe, TrendingUp, CheckCircle, Star, Users, Shield, Calendar } from 'lucide-react';

export default function PartnersSection() {
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
        
        // Fallback to show at least some content
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
}