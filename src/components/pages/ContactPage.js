"use client";
import { useState, useEffect } from "react";
import Image from "next/image"; // ✨ NEW: Import the Next.js Image component
import {
  Phone,
  Mail,
  MapPin,
  Send,
  Building,
  Award,
  CheckCircle,
  MessageSquare,
  Clock,
  ExternalLink,
  ImageIcon,
} from "lucide-react";
import { apiService } from "../../lib/api";
import mapImage from "../../img/shree-map.png"; // ✨ NEW: Import your map image

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    agreeToPrivacy: false,
  });

  const [officeLocations, setOfficeLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await apiService.getOfficeLocations();
        setOfficeLocations(response.data);
      } catch (err) {
        console.error("Failed to fetch office locations", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOffices();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.agreeToPrivacy) {
      setError("You must agree to the privacy policy.");
      return;
    }
    const payload = {
      name: `${formData.firstName} ${formData.lastName}`,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      message: `Subject: ${formData.subject}\n\nMessage: ${formData.message}`,
      source: "contact_us",
    };
    try {
      await apiService.submitLead(payload);
      setIsSubmitted(true)
    } catch (err)
{
      setError("An error occurred. Please try again.");
      console.error("Submission Error:", err);
    }
  };

  // Helper function to clean phone numbers
  const cleanPhoneNumber = (phoneStr) => {
    if (!phoneStr) return "";
    return phoneStr.replace(/^(Mobile\s*:\s*|Tele\s*:\s*|\|\s*Mobile\s*:\s*)/i, "").trim();
  };

  // Office type configurations
  const officeTypeConfig = {
    'HO': { 
      label: 'Head Office', 
      icon: Building, 
      color: '#8b6a3f',
      bgGradient: 'linear-gradient(135deg, #b78852 0%, #c9955f 100%)',
      description: 'Corporate headquarters and main operations center'
    },
    'RO': { 
      label: 'Regional Office', 
      icon: Building, 
      color: '#c9955f',
      bgGradient: 'linear-gradient(135deg, #c9955f 0%, #d4a76a 100%)',
      description: 'Regional business centers with full services'
    },
    'BO': { 
      label: 'Branch Office', 
      icon: Building, 
      color: '#d4a76a',
      bgGradient: 'linear-gradient(135deg, #d4a76a 0%, #e0b975 100%)',
      description: 'Local branch offices for customer support'
    },
    'GO': { 
      label: 'Our Local Service Locations', 
      icon: MapPin, 
      color: '#e0b975',
      bgGradient: 'linear-gradient(135deg, #e0b975 0%, #eccc80 100%)',
      description: 'Service Locations for local assistance'
    }
  };

  const headOffice = officeLocations.find(
    (office) => office.office_type === "HO"
  );
  
  // Group offices by type
  const groupedOffices = {
    'RO': officeLocations.filter(office => office.office_type === "RO"),
    'BO': officeLocations.filter(office => office.office_type === "BO"),  
    'GO': officeLocations.filter(office => office.office_type === "GO")
  };

  const contactReasons = [
    { value: "product-inquiry", label: "Product Information" },
    { value: "service-support", label: "Service & Technical Support" },
    { value: "quote-request", label: "Request Quotation" },
    { value: "careers", label: "Career Opportunities" },
    { value: "other", label: "Other Inquiry" },
  ];

  if (isSubmitted) {
    return (
      <div
        className='min-h-screen flex items-center justify-center p-4'
        style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
      >
        <div
          className='bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md w-full transform'
          style={{ border: "1px solid rgba(183, 136, 82, 0.2)" }}
        >
          <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
            <CheckCircle className='text-green-600' size={40} />
          </div>
          <h2 className='text-3xl font-bold text-gray-900 mb-4'>Thank You!</h2>
          <p className='text-gray-600 text-lg mb-6'>
            Your message has been received. Our team will get back to you
            shortly.
          </p>
          <div className='w-full h-1 bg-amber-200 rounded-full overflow-hidden'>
            <div className='h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full w-full'></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className='min-h-screen'
      style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
    >
      <div className='pt-24 pb-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Hero Section */}
          <div className='text-center mb-16 relative'>
            <div className='absolute inset-0 -z-10 bg-gradient-to-r from-amber-200/20 to-orange-200/20 blur-3xl rounded-full'></div>
            <h1
              className='text-4xl md:text-5xl lg:text-6xl font-bold mb-6'
              style={{
                background: "linear-gradient(135deg, #8b6a3f 0%, #b78852 50%, #9c7649 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Get Expert Consultation
            </h1>
            <p className='text-lg md:text-xl max-w-2xl mx-auto' style={{ color: "#9c7649" }}>
              Connect with our specialists and discover how we can help
              transform your business
            </p>
          </div>

          <div className='grid xl:grid-cols-2 gap-12 lg:gap-16 mb-20'>
            {/* Contact Form */}
            <div
              className='p-6 md:p-8 rounded-3xl shadow-xl transition-all duration-300 hover:shadow-2xl'
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(183, 136, 82, 0.15)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className='flex items-center gap-3 mb-8'>
                <div
                  className='w-12 h-12 rounded-xl flex items-center justify-center'
                  style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
                >
                  <MessageSquare className='text-white' size={24} />
                </div>
                <h3 className='text-xl md:text-2xl font-bold' style={{ color: "#8b6a3f" }}>
                  Send Your Requirements
                </h3>
              </div>

              <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='group'>
                    <label className='block text-sm font-semibold mb-2' style={{ color: "#9c7649" }}>
                      First Name *
                    </label>
                    <input
                      type='text'
                      name='firstName'
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200'
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderColor: "rgba(183, 136, 82, 0.2)"
                      }}
                      placeholder='John'
                    />
                  </div>
                  <div className='group'>
                    <label className='block text-sm font-semibold mb-2' style={{ color: "#9c7649" }}>
                      Last Name *
                    </label>
                    <input
                      type='text'
                      name='lastName'
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200'
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderColor: "rgba(183, 136, 82, 0.2)"
                      }}
                      placeholder='Doe'
                    />
                  </div>
                </div>

                <div className='group'>
                  <label className='block text-sm font-semibold mb-2' style={{ color: "#9c7649" }}>
                    Company/Organization *
                  </label>
                  <input
                    type='text'
                    name='company'
                    value={formData.company}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200'
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      borderColor: "rgba(183, 136, 82, 0.2)"
                    }}
                    placeholder='Your Company Name'
                  />
                </div>

                <div className='grid md:grid-cols-2 gap-6'>
                  <div className='group'>
                    <label className='block text-sm font-semibold mb-2' style={{ color: "#9c7649" }}>
                      Business Email *
                    </label>
                    <input
                      type='email'
                      name='email'
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200'
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderColor: "rgba(183, 136, 82, 0.2)"
                      }}
                      placeholder='john.doe@company.com'
                    />
                  </div>
                  <div className='group'>
                    <label className='block text-sm font-semibold mb-2' style={{ color: "#9c7649" }}>
                      Phone Number *
                    </label>
                    <input
                      type='tel'
                      name='phone'
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className='w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200'
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        borderColor: "rgba(183, 136, 82, 0.2)"
                      }}
                      placeholder='+91 98765 43210'
                    />
                  </div>
                </div>

                <div className='group'>
                  <label className='block text-sm font-semibold mb-2' style={{ color: "#9c7649" }}>
                    Subject *
                  </label>
                  <select
                    name='subject'
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200'
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      borderColor: "rgba(183, 136, 82, 0.2)"
                    }}
                  >
                    <option value=''>Select Subject</option>
                    {contactReasons.map((reason) => (
                      <option key={reason.value} value={reason.label}>
                        {reason.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className='group'>
                  <label className='block text-sm font-semibold mb-2' style={{ color: "#9c7649" }}>
                    Message *
                  </label>
                  <textarea
                    rows={5}
                    name='message'
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className='w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 resize-none'
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.7)",
                      borderColor: "rgba(183, 136, 82, 0.2)"
                    }}
                    placeholder='Tell us about your requirements...'
                  />
                </div>

                <div
                  className='flex items-start gap-3 p-4 rounded-xl border'
                  style={{
                    backgroundColor: "rgba(183, 136, 82, 0.05)",
                    borderColor: "rgba(183, 136, 82, 0.2)",
                  }}
                >
                  <input
                    type='checkbox'
                    id='privacy'
                    name='agreeToPrivacy'
                    checked={formData.agreeToPrivacy}
                    onChange={handleInputChange}
                    required
                    className='rounded mt-1 text-amber-600 focus:ring-amber-500'
                    style={{ color: "#b78852" }}
                  />
                  <label htmlFor='privacy' className='text-sm font-medium' style={{ color: "#9c7649" }}>
                    I agree to the privacy policy and consent to be contacted. *
                  </label>
                </div>

                {error && (
                  <div className='p-3 bg-red-50 border border-red-200 rounded-xl'>
                    <p className='text-red-600 text-sm font-medium text-center'>
                      {error}
                    </p>
                  </div>
                )}

                <button
                  type='submit'
                  className='w-full text-white py-4 rounded-xl text-lg font-semibold hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl'
                  style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
                >
                  <Send size={20} className='inline mr-2' />
                  Send Requirements
                </button>
              </form>
            </div>
            
            {/* ✨ MODIFIED: Right column now contains the map, head office, and stats */}
            <div className='space-y-8'>
              {/* ✨ NEW: Added map image here */}
              <div
                className='rounded-3xl shadow-xl overflow-hidden'
                style={{
                  border: "1px solid rgba(183, 136, 82, 0.15)",
                }}
              >
                <Image
                  src={mapImage}
                  alt='Shreedhar Instruments office locations map across India'
                  className='w-full h-auto'
                  priority
                />
              </div>

              {/* Head Office Info */}
              {headOffice && (
                <div
                  className='rounded-3xl shadow-xl overflow-hidden'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(183, 136, 82, 0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  {/* Head Office Image */}
                  {headOffice.office_image && (
                    <div className="relative h-48 md:h-56 overflow-hidden">
                      <img
                        src={headOffice.office_image}
                        alt={`${headOffice.name} building`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 left-4">
                        <div
                          className='px-3 py-1 rounded-full text-sm font-medium text-white'
                          style={{ backgroundColor: "rgba(183, 136, 82, 0.9)" }}
                        >
                          Head Office
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div
                    className={`p-6 ${!headOffice.office_image ? 'rounded-t-3xl' : ''}`}
                    style={!headOffice.office_image ? { background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" } : {}}
                  >
                    {!headOffice.office_image && (
                      <div className='flex items-center gap-3 text-white mb-6'>
                        <div
                          className='w-12 h-12 rounded-xl flex items-center justify-center'
                          style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }}
                        >
                          <Building size={24} />
                        </div>
                        <h2 className='text-2xl font-bold'>Head Office</h2>
                      </div>
                    )}
                    <div className={`${!headOffice.office_image ? 'p-0' : 'p-6'}`}>
                      <h3 className={`font-bold text-xl mb-4 ${!headOffice.office_image ? 'text-white' : ''}`} style={headOffice.office_image ? { color: "#8b6a3f" } : {}}>
                        {headOffice.name}
                      </h3>
                      <div className='space-y-4'>
                        <div className='flex items-start gap-3'>
                          <MapPin
                            className={`mt-1 flex-shrink-0 ${!headOffice.office_image ? 'text-white' : ''}`}
                            size={20}
                            style={headOffice.office_image ? { color: "#b78852" } : {}}
                          />
                          <p className={`${!headOffice.office_image ? 'text-white' : 'text-gray-700'}`}>{headOffice.address}</p>
                        </div>
                        <div className='flex items-start gap-3'>
                          <Phone
                            className={`mt-1 flex-shrink-0 ${!headOffice.office_image ? 'text-white' : ''}`}
                            size={20}
                            style={headOffice.office_image ? { color: "#b78852" } : {}}
                          />
                          <div>
                            <p className={`font-semibold ${!headOffice.office_image ? 'text-white' : ''}`} style={headOffice.office_image ? { color: "#8b6a3f" } : {}}>
                              {cleanPhoneNumber(headOffice.contact_number)}
                            </p>
                          </div>
                        </div>
                        {headOffice.google_maps_link && (
                          <div className='pt-2'>
                            <a
                              href={headOffice.google_maps_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 ${
                                headOffice.office_image 
                                  ? 'text-white' 
                                  : 'text-amber-800 bg-white/20 hover:bg-white/30'
                              }`}
                              style={headOffice.office_image ? { background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" } : {}}
                            >
                              <MapPin size={16} />
                              View on Google Maps
                              <ExternalLink size={14} />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Contact Stats */}
              <div className='grid grid-cols-2 gap-4'>
                <div
                  className='p-6 rounded-2xl shadow-lg text-center'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(183, 136, 82, 0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    className='w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3'
                    style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
                  >
                    <Clock className='text-white' size={24} />
                  </div>
                  <h4 className='font-bold mb-1' style={{ color: "#8b6a3f" }}>24/7 Support</h4>
                  <p className='text-sm' style={{ color: "#9c7649" }}>
                    Round the clock assistance
                  </p>
                </div>
                <div
                  className='p-6 rounded-2xl shadow-lg text-center'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(183, 136, 82, 0.15)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <div
                    className='w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3'
                    style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
                  >
                    <Award className='text-white' size={24} />
                  </div>
                  <h4 className='font-bold mb-1' style={{ color: "#8b6a3f" }}>Expert Team</h4>
                  <p className='text-sm' style={{ color: "#9c7649" }}>
                    Industry professionals
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Office Locations by Type with Images */}
          <div className='mt-20'>
            <div className='text-center mb-16'>
              <h2
                className='text-3xl md:text-4xl font-bold mb-4'
                style={{
                  background: "linear-gradient(135deg, #8b6a3f 0%, #b78852 50%, #9c7649 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Our Office Network
              </h2>
              <p className='text-base md:text-lg' style={{ color: "#9c7649" }}>
                Comprehensive coverage with specialized locations nationwide
              </p>
            </div>

            {loading ? (
              <div className='text-center py-12'>
                <div className='inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600'></div>
                <p className='mt-4 text-gray-600'>Loading offices...</p>
              </div>
            ) : (
              <div className='space-y-16'>
                {/* Render each office type section */}
                {Object.entries(groupedOffices).map(([officeType, offices]) => {
                  if (offices.length === 0) return null;
                  
                  const config = officeTypeConfig[officeType];
                  const IconComponent = config.icon;
                  
                  return (
                    <div key={officeType} className=''>
                      {/* Section Header */}
                      <div className='text-center mb-8'>
                        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mb-4'>
                          <div
                            className='w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg'
                            style={{ background: config.bgGradient }}
                          >
                            <IconComponent className='text-white' size={28} />
                          </div>
                          <div className='text-center sm:text-left'>
                            <h3
                              className='text-xl md:text-2xl font-bold mb-1'
                              style={{ color: config.color }}
                            >
                              {config.label}
                            </h3>
                            <p className='text-sm' style={{ color: "#9c7649" }}>
                              {config.description}
                            </p>
                          </div>
                        </div>
                        <div className='w-24 h-1 mx-auto rounded-full' style={{ background: config.bgGradient }}></div>
                      </div>

                      {/* Office Cards Grid with Images */}
                      <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {offices.map((office) => (
                          <div
                            key={office.id}
                            className='rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group overflow-hidden'
                            style={{
                              backgroundColor: "rgba(255, 255, 255, 0.9)",
                              border: `1px solid ${config.color}30`,
                              backdropFilter: "blur(10px)",
                            }}
                          >
                            {/* Office Image */}
                            {office.office_image ? (
                              <div className="relative h-48 overflow-hidden">
                                <img
                                  src={office.office_image}
                                  alt={`${office.name} building`}
                                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                  onError={(e) => {
                                    e.target.parentElement.innerHTML = `
                                      <div class="w-full h-full flex items-center justify-center" style="background: ${config.bgGradient}">
                                        <div class="text-center">
                                          <div class="w-16 h-16 mx-auto mb-3 rounded-xl bg-white/20 flex items-center justify-center">
                                            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                                            </svg>
                                          </div>
                                          <p class="text-white text-sm font-medium">${office.name}</p>
                                        </div>
                                      </div>
                                    `;
                                  }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent"></div>
                                <div className="absolute top-4 left-4">
                                  <div
                                    className='px-3 py-1 rounded-full text-xs font-medium text-white'
                                    style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
                                  >
                                    {config.label}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div 
                                className="h-24 flex items-center justify-center"
                                style={{ background: config.bgGradient }}
                              >
                                <div className="flex items-center gap-3 text-white">
                                  <IconComponent size={24} />
                                  <span className="font-semibold text-sm">{config.label}</span>
                                </div>
                              </div>
                            )}

                            {/* Office Details */}
                            <div className='p-6'>
                              <div className='space-y-4'>
                                {/* Office Name */}
                                <div className='space-y-2'>
                                  <h4 className='font-bold text-lg leading-tight' style={{ color: config.color }}>
                                    {office.name}
                                  </h4>
                                </div>

                                {/* Address */}
                                <div className='flex items-start gap-3'>
                                  <MapPin
                                    className='mt-1 flex-shrink-0'
                                    size={18}
                                    style={{ color: config.color }}
                                  />
                                  <p className='text-sm leading-relaxed' style={{ color: "#6b7280" }}>
                                    {office.address}
                                  </p>
                                </div>

                                {/* Phone Number */}
                                {office.contact_number && (
                                  <div className='flex items-center gap-3'>
                                    <Phone
                                      className='flex-shrink-0'
                                      size={18}
                                      style={{ color: config.color }}
                                    />
                                    <p className='text-sm font-semibold' style={{ color: config.color }}>
                                      {cleanPhoneNumber(office.contact_number)}
                                    </p>
                                  </div>
                                )}

                                {/* Google Maps Link */}
                                {office.google_maps_link && (
                                  <div className='pt-2'>
                                    <a
                                      href={office.google_maps_link}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className='inline-flex items-center gap-2 px-3 py-2 rounded-lg text-white text-xs font-medium hover:shadow-lg transition-all duration-200 transform hover:scale-105'
                                      style={{ background: config.bgGradient }}
                                    >
                                      <MapPin size={14} />
                                      View Location
                                      <ExternalLink size={12} />
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}