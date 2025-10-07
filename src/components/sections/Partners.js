import { Building, Award, Globe, TrendingUp, CheckCircle, Star, Users, Shield } from 'lucide-react';

export default function PartnersSection() {
  const partners = [
    {
      name: "Beckman Coulter",
      country: "USA",
      since: "2011",
      status: "Excellence Partner",
      icon: <Building size={24} />
    },
    {
      name: "Tailin SciTech",
      country: "China",
      since: "2014",
      status: "Gold Distributor",
      icon: <Globe size={24} />
    },
    {
      name: "Met One Instruments",
      country: "USA",
      since: "2015",
      status: "Authorized Partner",
      icon: <TrendingUp size={24} />
    },
    {
      name: "Eurping",
      country: "Europe",
      since: "2023",
      status: "Latest Partner",
      icon: <Award size={24} />
    }
  ];

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 mb-12 md:mb-20">
          {partners.map((partner, index) => (
            <div 
              key={index} 
              className="group rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-5 md:p-6 lg:p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 active:scale-95"
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(183, 136, 82, 0.15)",
                backdropFilter: "blur(10px)"
              }}
            >
              <div 
                className="relative mx-auto w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 flex items-center justify-center mb-3 sm:mb-4 md:mb-6 rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: "rgba(183, 136, 82, 0.1)" }}
              >
                <div style={{ color: "#b78852" }}>
                  {partner.icon}
                </div>
              </div>
              <h3 className="text-base sm:text-lg md:text-xl font-bold mb-1.5 sm:mb-2" style={{ color: "#8b6a3f" }}>
                {partner.name}
              </h3>
              <p className="text-xs sm:text-sm mb-3 sm:mb-4" style={{ color: "#9c7649" }}>
                {partner.country} • Since {partner.since}
              </p>
              <span 
                className="inline-block px-3 py-1 md:px-4 md:py-1 rounded-full text-xs md:text-sm font-semibold"
                style={{
                  background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
                  color: "white"
                }}
              >
                {partner.status}
              </span>
            </div>
          ))}
        </div>

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