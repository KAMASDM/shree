"use client";
import { useState, useEffect } from "react";
import Hero from "../components/sections/Hero";
import ProductCard from "../components/common/ProductCard";
import { apiService } from "../lib/api"; // Use the apiService
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

// API-Integrated Partners Section with detailed cards
const PartnersSection = () => {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        setLoading(true);
        const { data, error } = await apiService.getPartners();
        
        if (Array.isArray(data)) {
          const activePartners = data.filter(partner => partner.is_active_partnership);
          setPartners(activePartners);
        } else {
          setPartners([]);
        }
        
        if (error) {
          console.warn('Partners API warning:', error);
        }
      } catch (err) {
        console.error("Failed to fetch partners:", err);
        setError(err.message || "Failed to load partner information");
        setPartners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  if (loading) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600"></div>
          <p className="mt-4 text-base font-semibold text-gray-600">Loading Our Valued Partners...</p>
        </div>
      </section>
    );
  }

  if (error || partners.length === 0) {
    return (
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800">
              Our Global Technology Partners
            </h2>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
              Bringing cutting-edge pharmaceutical solutions to India through trusted partnerships with world-leading manufacturers.
            </p>
          </div>
          <div className="text-center text-gray-500">
            <p>Partner information will be displayed here once loaded.</p>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-6 py-2 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
            >
              Retry Loading
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Create duplicated partners for smooth infinite scrolling
  const partnersToDisplay = partners.length > 0 ? Array(5).fill([...partners]).flat() : [];


  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800">
            Our Global Technology Partners
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
            Bringing cutting-edge pharmaceutical solutions to India through trusted partnerships with world-leading manufacturers.
          </p>
        </div>
        
        {partners.length <= 3 ? (
          // Static grid for 3 or fewer partners
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center mb-16">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl hover:border-amber-300 transition-all duration-300">
                <div className="flex items-center justify-center h-20 mb-6">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="max-w-full max-h-full object-contain"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                </div>
                <div className="text-center space-y-3">
                  <h3 className="text-lg font-bold text-amber-800">{partner.name}</h3>
                  <div className="flex items-center justify-center gap-2">
                    <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                      {partner.partner_type_display}
                    </span>
                    <span className="text-xs text-gray-500">{partner.country}</span>
                  </div>
                  {partner.recognition_level && (
                    <div className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                      {partner.recognition_level}
                    </div>
                  )}
                  <div className="text-xs text-gray-600">
                    <div>Partnership: {partner.partnership_duration_years} years</div>
                    <div>Since {new Date(partner.partnership_since).getFullYear()}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Horizontal scroller for more than 3 partners
          <div className="relative mb-16">
            <div className="relative w-full overflow-hidden py-4"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
              }}
            >
              <style jsx>{`
                @keyframes partner-scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-partner-scroll {
                  animation: partner-scroll 120s linear infinite;
                }
                .animate-partner-scroll:hover {
                  animation-play-state: paused;
                }
              `}</style>
              <div className="flex w-fit animate-partner-scroll">
                {partnersToDisplay.map((partner, index) => (
                  <div key={`${partner.id}-${index}`} className="flex-shrink-0 w-80 mx-4">
                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl hover:border-amber-300 transition-all duration-300 h-full">
                      <div className="flex items-center justify-center h-20 mb-6">
                        <img
                          src={partner.logo}
                          alt={`${partner.name} logo`}
                          className="max-w-full max-h-full object-contain"
                          loading="lazy"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                      <div className="text-center space-y-3">
                        <h3 className="text-lg font-bold text-amber-800">{partner.name}</h3>
                        <div className="flex items-center justify-center gap-2">
                          <span className="px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-medium">
                            {partner.partner_type_display}
                          </span>
                          <span className="text-xs text-gray-500">{partner.country}</span>
                        </div>
                        {partner.recognition_level && (
                          <div className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded">
                            {partner.recognition_level}
                          </div>
                        )}
                        <div className="text-xs text-gray-600 space-y-1">
                          <div className="flex items-center justify-center gap-1">
                            <Calendar size={12} />
                            <span>{partner.partnership_duration_years} years partnership</span>
                          </div>
                          <div>Since {new Date(partner.partnership_since).getFullYear()}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Partnership Benefits Section */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-amber-800">
              Why Leading Manufacturers Partner With Us
            </h3>
            <p className="text-base max-w-2xl mx-auto text-gray-600">
              Our proven track record and commitment to excellence make us the preferred choice for global partnerships
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <TrendingUp size={20} />, title: "Market Leadership", stat: "27+ Years", description: "Industry experience" },
              { icon: <Shield size={20} />, title: "Service Excellence", stat: "24/7 Support", description: "Always available" },
              { icon: <CheckCircle size={20} />, title: "Regulatory Knowledge", stat: "100% Compliant", description: "FDA standards" },
              { icon: <Users size={20} />, title: "Customer Relations", stat: "800+ Customers", description: "Trusted nationwide" }
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl mb-4 bg-amber-100 text-amber-600">
                  {benefit.icon}
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-amber-800">
                    {benefit.stat}
                  </div>
                  <h4 className="text-lg font-semibold text-amber-800">
                    {benefit.title}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Fixed Why Choose Us Section - converted to explicit return function
const WhyChooseUsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            Why Choose Shreedhar Instruments?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your most trusted, reliable and ethical partner for analytical
            instruments in pharmaceutical industry
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center transition-transform hover:scale-105 hover:shadow-xl">
            <div className="text-amber-600 mx-auto mb-4 flex justify-center">
              <Eye size={48} />
            </div>
            <h3 className="text-xl font-bold text-amber-800 mb-4">
              Precision & Quality
            </h3>
            <p className="text-gray-600">
              We commit to delivering highly accurate and reliable instruments
              that exceed industry standards.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center transition-transform hover:scale-105 hover:shadow-xl">
            <div className="text-red-500 mx-auto mb-4 flex justify-center">
              <Heart size={48} />
            </div>
            <h3 className="text-xl font-bold text-amber-800 mb-4">
              Integrity
            </h3>
            <p className="text-gray-600">
              We uphold the highest ethical standards in every interaction.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center transition-transform hover:scale-105 hover:shadow-xl">
            <div className="text-blue-600 mx-auto mb-4 flex justify-center">
              <Target size={48} />
            </div>
            <h3 className="text-xl font-bold text-amber-800 mb-4">
              Customer-Centricity
            </h3>
            <p className="text-gray-600">
              We listen to our customers and shape our solutions to meet their
              needs.
            </p>
          </div>
        </div>
      </div>
    </section>
    
  );
};

// Target Markets Section
const TargetMarketsSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            Our Target Markets
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specialized solutions for pharmaceutical industry leaders across India
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Injectable/Formulation Pharmaceuticals",
              description: "Primary focus on sterile drug manufacturing with stringent particle testing requirements",
              icon: <Building className="text-amber-600" size={32} />,
              customers: [
                "Large pharma companies",
                "CDMO organizations", 
                "Generic manufacturers",
              ],
              compliance: ["USP <788>", "21 CFR Part 11", "EU GMP Annex 1"],
            },
            {
              title: "OSD (Oral Solid Dosage) API",
              description: "Expanding into API manufacturing segment with specialized analytical requirements",
              icon: <TrendingUp className="text-green-600" size={32} />,
              customers: [
                "API manufacturers",
                "Contract manufacturers",
                "R&D facilities",
              ],
              compliance: ["ICH Q7", "WHO Technical Standards", "cGMP Guidelines"],
            },
            {
              title: "Government & Private Institutions", 
              description: "Laboratory and analytical testing facilities requiring certified instruments",
              icon: <Users className="text-purple-600" size={32} />,
              customers: [
                "Government labs",
                "Research institutions",
                "CROs",
                "Testing laboratories",
              ],
              compliance: ["NABL Standards", "ISO 17025", "Regulatory Guidelines"],
            },
          ].map((market, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl shadow-lg border border-amber-100 hover:shadow-xl hover:border-amber-300 transition-all duration-300"
            >
              <div className="mb-4">{market.icon}</div>
              <h3 className="text-xl font-bold text-amber-800 mb-3">
                {market.title}
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                {market.description}
              </p>

              <div className="space-y-3">
                <div>
                  <h4 className="text-sm font-semibold text-amber-700 mb-2">
                    Key Customers:
                  </h4>
                  <div className="space-y-1">
                    {market.customers.map((customer, i) => (
                      <span key={i} className="block text-xs text-gray-600">
                        • {customer}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-amber-700 mb-2">
                    Compliance Focus:
                  </h4>
                  <div className="flex flex-wrap gap-1">
                    {market.compliance.map((comp, i) => (
                      <span
                        key={i}
                        className="bg-amber-50 text-amber-700 px-2 py-1 rounded text-xs"
                      >
                        {comp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Unique Value Proposition Section
const UniqueValuePropositionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-600 mb-6">
              <Award size={32} />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-6">
              Our Unique Value Proposition
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-lg md:text-xl text-gray-700 mb-8 italic leading-relaxed">
              &quot;We commit to deliver the technically best solution complemented by after-sales service. From IQ/OQ qualification and calibration to preventive maintenance and rapid breakdown support, we ensure maximum uptime and process reliability.&quot;
            </blockquote>
            
            <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
              This level of all-India leadership and unmatched service quality has earned us a loyal brand reputation with our esteemed Principals, making us the most preferred partner in the pharmaceutical analytical instruments sector.
            </p>

            {/* Service Highlights */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { icon: <CheckCircle size={20} />, title: "IQ/OQ Qualification", description: "Complete validation" },
                { icon: <Shield size={20} />, title: "24/7 Support", description: "Rapid response" },
                { icon: <TrendingUp size={20} />, title: "Maximum Uptime", description: "Process reliability" },
                { icon: <Star size={20} />, title: "All-India Presence", description: "Nationwide service" }
              ].map((service, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 bg-amber-100 text-amber-600">
                    {service.icon}
                  </div>
                  <h4 className="text-sm font-semibold text-amber-800 mb-1">
                    {service.title}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const FeaturedProductsSection = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const { data } = await apiService.getFeaturedProducts();
        setFeaturedProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch featured products:", err);
        setError(err.message || "Failed to load featured products");
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mb-4"></div>
            <p className="text-center text-gray-600">Loading featured products...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error || !featuredProducts || featuredProducts.length === 0) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
              Featured Analytical Instruments
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our regulatory-compliant instruments trusted by leading
              pharmaceutical companies
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-600">No featured products available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  const productsToDisplay = featuredProducts.length > 0 ? Array(5).fill([...featuredProducts]).flat() : [];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            Featured Analytical Instruments
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our regulatory-compliant instruments trusted by leading
            pharmaceutical companies
          </p>
        </div>
        
        {featuredProducts.length <= 3 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="relative">
            <div className="relative w-full overflow-hidden py-4"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
              }}
            >
              <style jsx>{`
                @keyframes product-scroll {
                  0% { transform: translateX(0); }
                  100% { transform: translateX(-50%); }
                }
                .animate-product-scroll {
                  animation: product-scroll 120s linear infinite;
                }
                .animate-product-scroll:hover {
                  animation-play-state: paused;
                }
              `}</style>
              <div className="flex w-fit animate-product-scroll">
                {productsToDisplay.map((product, index) => (
                  <div key={`${product.id}-${index}`} className="flex-shrink-0 w-80 mx-4">
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-sm">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-amber-800">
              Analytical Excellence
            </h3>
            <p className="text-base max-w-2xl mx-auto text-gray-600">
              Regulatory-compliant instruments for pharmaceutical manufacturing
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { stat: "100%", title: "Compliance", description: "FDA & EU standards", icon: <CheckCircle size={20} /> },
              { stat: "24/7", title: "Support", description: "Technical assistance", icon: <Shield size={20} /> },
              { stat: "IQ/OQ", title: "Qualification", description: "Complete validation", icon: <Award size={20} /> },
              { stat: "Pan-India", title: "Service", description: "Nationwide coverage", icon: <Globe size={20} /> }
            ].map((metric, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3 bg-amber-100 text-amber-600">
                  {metric.icon}
                </div>
                <div className="text-2xl font-bold text-amber-800 mb-1">
                  {metric.stat}
                </div>
                <h4 className="text-sm font-semibold text-amber-800 mb-1">
                  {metric.title}
                </h4>
                <p className="text-xs text-gray-600">
                  {metric.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ClientsSection = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const { data, error: apiError } = await apiService.getClients();
        if (apiError) {
            console.warn('Clients API warning:', apiError);
        }
        setClients(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch clients:", err);
        setError(err.message || "Failed to load clients");
        setClients([]);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600 mb-4"></div>
          <p className="text-lg font-semibold text-gray-600">Loading Our Esteemed Clients...</p>
        </div>
      </section>
    );
  }

  if (error || clients.length === 0) {
    return null; 
  }

  const clientsToDisplay = clients.length > 0 ? Array(5).fill([...clients]).flat() : [];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-800 mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="text-xl text-gray-600">
            We are proud to partner with leading companies in the pharmaceutical sector.
          </p>
        </div>
        
        <div className="relative w-full overflow-hidden py-4"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
          }}
        >
          <style jsx>{`
            @keyframes client-scroll {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-client-scroll {
              animation: client-scroll 80s linear infinite;
            }
            .animate-client-scroll:hover {
              animation-play-state: paused;
            }
          `}</style>
          <div className="flex w-fit animate-client-scroll">
            {clientsToDisplay.map((client, index) => (
              <div
                key={`${client.id}-${index}`}
                className="flex-shrink-0 w-48 h-24 flex items-center justify-center mx-6"
              >
                <img
                  src={client.logo}
                  alt={`${client.name} logo`}
                  className="max-h-16 max-w-full object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  loading="lazy"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
            ))}
          </div>
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
      <TargetMarketsSection />
      <UniqueValuePropositionSection />
      <FeaturedProductsSection />
      <ClientsSection />
    </>
  );
}

