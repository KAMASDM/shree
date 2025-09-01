// src/components/pages/AboutPage.js
"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Eye,
  Target,
  Award,
  TrendingUp,
  Users,
  Globe,
  Calendar,
  Building,
  CheckCircle,
  ArrowRight,
  Microscope,
  Shield,
  Zap,
  Star,
  MapPin,
  Heart
} from "lucide-react";
import { apiService } from '../../lib/api';

export default function AboutPage() {
  // State for API data
  const [companyInfo, setCompanyInfo] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [awards, setAwards] = useState([]);
  const [officeLocations, setOfficeLocations] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [clients, setClients] = useState([]);
  
  // Loading states
  const [loadingCompanyInfo, setLoadingCompanyInfo] = useState(true);
  const [loadingMilestones, setLoadingMilestones] = useState(true);
  const [loadingAwards, setLoadingAwards] = useState(true);
  const [loadingOffices, setLoadingOffices] = useState(true);
  const [loadingTestimonials, setLoadingTestimonials] = useState(true);
  const [loadingClients, setLoadingClients] = useState(true);

  // Static core values (these don't change often, so can remain static)
  const coreValues = [
    {
      icon: "🎯",
      title: "Precision Excellence",
      description: "Every instrument we deliver meets the highest standards of accuracy and reliability for critical pharmaceutical applications."
    },
    {
      icon: "🤝",
      title: "Trust & Integrity", 
      description: "Building long-term partnerships through transparent communication and unwavering commitment to our promises."
    },
    {
      icon: "⚡",
      title: "Innovation First",
      description: "Continuously adopting cutting-edge technologies to stay ahead of evolving pharmaceutical industry needs."
    }
  ];

  useEffect(() => {
    const fetchAllData = async () => {
      // Fetch Company Info
      try {
        setLoadingCompanyInfo(true);
        const response = await apiService.getCompanyInfo();
        if (response.data && response.data.length > 0) {
          setCompanyInfo(response.data[0]); // Get first company info record
        }
      } catch (error) {
        console.error("Failed to fetch company info:", error);
      } finally {
        setLoadingCompanyInfo(false);
      }

      // Fetch Milestones
      try {
        setLoadingMilestones(true);
        const response = await apiService.getMilestones();
        setMilestones(response.data);
      } catch (error) {
        console.error("Failed to fetch milestones:", error);
      } finally {
        setLoadingMilestones(false);
      }

      // Fetch Awards
      try {
        setLoadingAwards(true);
        const response = await apiService.getAwards();
        setAwards(response.data);
      } catch (error) {
        console.error("Failed to fetch awards:", error);
      } finally {
        setLoadingAwards(false);
      }

      // Fetch Office Locations
      try {
        setLoadingOffices(true);
        const response = await apiService.getOfficeLocations();
        setOfficeLocations(response.data);
      } catch (error) {
        console.error("Failed to fetch office locations:", error);
      } finally {
        setLoadingOffices(false);
      }

      // Fetch Featured Testimonials
      try {
        setLoadingTestimonials(true);
        const response = await apiService.getTestimonials({ is_featured: true });
        setTestimonials(response.data);
      } catch (error) {
        console.error("Failed to fetch testimonials:", error);
      } finally {
        setLoadingTestimonials(false);
      }

      // Fetch Clients
      try {
        setLoadingClients(true);
        const response = await apiService.getClients();
        setClients(response.data || []);
      } catch (error) {
        console.error("Failed to fetch clients:", error);
      } finally {
        setLoadingClients(false);
      }
    };
    
    fetchAllData();
  }, []);

  // Calculate dynamic statistics
  const statistics = [
    { number: "28+", label: "Years", description: "Industry Leadership" },
    { number: "800+", label: "Customers", description: "Trusted Partners" },
    { number: "10,000+", label: "Installations", description: "Successful Projects" },
    { number: `${officeLocations.length}+`, label: "Offices", description: "Pan-India Presence" }
  ];

  // Extract text from HTML content
  const stripHtml = (html) => {
    if (!html) return '';
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="pt-16 pb-20" style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="relative text-center mb-24 overflow-hidden">
          <div className="absolute inset-0 rounded-3xl" style={{ backgroundColor: "rgba(183, 136, 82, 0.03)" }}></div>
          <div className="relative z-10 py-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: "rgba(183, 136, 82, 0.1)", color: "#8b6a3f" }}>
              <Star size={16} />
              Trusted Since 1998
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight" style={{ color: "#8b6a3f" }}>
              Shreedhar<br />
              <span className="text-4xl md:text-6xl" style={{ color: "#b78852" }}>Instruments</span>
            </h1>
            
            <p className="text-xl md:text-2xl max-w-4xl mx-auto mb-8 leading-relaxed" style={{ color: "#9c7649" }}>
              The <span className="font-bold" style={{ color: "#8b6a3f" }}>most trusted, reliable and ethical</span> organization 
              in analytical instruments for pharmaceutical industry. 
              <span className="block mt-2 text-lg">28+ years of excellence serving pharmaceutical and biopharma sectors</span>
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { label: "Since 1998", icon: Calendar, bgColor: "rgba(183, 136, 82, 0.1)", textColor: "#8b6a3f" },
                { label: "800+ Customers", icon: Users, bgColor: "rgba(34, 197, 94, 0.1)", textColor: "#166534" },
                { label: "10,000+ Installations", icon: CheckCircle, bgColor: "rgba(59, 130, 246, 0.1)", textColor: "#1e40af" }
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105" style={{ backgroundColor: badge.bgColor, color: badge.textColor }}>
                  <badge.icon size={18} />
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission, Vision, Goal - Now Dynamic */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {loadingCompanyInfo ? (
            // Loading skeleton
            [...Array(3)].map((_, i) => (
              <div key={i} className="p-8 rounded-3xl shadow-lg animate-pulse" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
                <div className="w-16 h-16 rounded-2xl mb-6" style={{ backgroundColor: "rgba(183, 136, 82, 0.2)" }}></div>
                <div className="h-6 rounded mb-4" style={{ backgroundColor: "rgba(183, 136, 82, 0.2)" }}></div>
                <div className="space-y-2">
                  <div className="h-4 rounded" style={{ backgroundColor: "rgba(183, 136, 82, 0.1)" }}></div>
                  <div className="h-4 rounded w-3/4" style={{ backgroundColor: "rgba(183, 136, 82, 0.1)" }}></div>
                </div>
              </div>
            ))
          ) : (
            [
              { 
                icon: Eye, 
                title: "Our Vision", 
                content: companyInfo?.vision ? stripHtml(companyInfo.vision) : "To become and remain as the most preferred partner to our customers and principals.", 
                iconBg: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
              },
              { 
                icon: Target, 
                title: "Our Mission", 
                content: companyInfo?.mission ? stripHtml(companyInfo.mission) : "We aim to excel and to be the leading player for our chosen markets.", 
                iconBg: "linear-gradient(135deg, #c9955f 0%, #d4a06a 100%)",
              },
              { 
                icon: Award, 
                title: "Our Goal", 
                content: companyInfo?.goal ? stripHtml(companyInfo.goal) : "To be recognized as the MOST TRUSTED, RELIABLE AND ETHICAL organization in our business sector.", 
                iconBg: "linear-gradient(135deg, #d4a06a 0%, #dfa975 100%)",
              }
            ].map((item, i) => (
              <div key={i} className="group relative p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ backgroundColor: "rgba(255, 255, 255, 0.4)" }}></div>
                <div className="relative z-10">
                  <div className="inline-flex p-4 rounded-2xl mb-6 shadow-lg" style={{ background: item.iconBg }}>
                    <item.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4" style={{ color: "#8b6a3f" }}>{item.title}</h3>
                  <p className="italic text-lg leading-relaxed" style={{ color: "#9c7649" }}>&ldquo;{item.content}&rdquo;</p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Company Story with Dynamic Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: "rgba(183, 136, 82, 0.1)", color: "#8b6a3f" }}>
              <Microscope size={16} />
              Our Journey
            </div>
            <h2 className="text-4xl font-bold mb-6 leading-tight" style={{ color: "#8b6a3f" }}>
              Three Decades of <span style={{ color: "#b78852" }}> Innovation</span>
            </h2>
            <div className="space-y-6 leading-relaxed" style={{ color: "#9c7649" }}>
              {loadingCompanyInfo ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-6 rounded-2xl animate-pulse" style={{ backgroundColor: "rgba(183, 136, 82, 0.1)" }}>
                      <div className="h-4 rounded mb-2" style={{ backgroundColor: "rgba(183, 136, 82, 0.2)" }}></div>
                      <div className="h-3 rounded" style={{ backgroundColor: "rgba(183, 136, 82, 0.15)" }}></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="p-6 rounded-2xl shadow-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                    <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: "#8b6a3f" }}>
                      <CheckCircle className="text-green-500" size={20} />
                      Founded by Visionary Leadership
                    </h4>
                    <p>{companyInfo?.history ? stripHtml(companyInfo.history) : "Started in 1998 by Mr. Jayant Joshi, partnering with global technology leaders to deliver cutting-edge solutions for pharmaceutical and biopharma manufacturing."}</p>
                  </div>
                  <div className="p-6 rounded-2xl shadow-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                    <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: "#8b6a3f" }}>
                      <Shield size={20} style={{ color: "#b78852" }} />
                      Regulatory Excellence
                    </h4>
                    <p>28+ years of expertise serving the most stringent regulatory environments across India, establishing ourselves as the leading distributor of analytical instruments.</p>
                  </div>
                  <div className="p-6 rounded-2xl shadow-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                    <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: "#8b6a3f" }}>
                      <Zap size={20} style={{ color: "#c9955f" }} />
                      Customer-Centric Innovation
                    </h4>
                    <p>{companyInfo?.usp ? stripHtml(companyInfo.usp) : "Our approach ensures technically superior solutions with comprehensive after-sales service, from IQ/OQ qualification to preventive maintenance and rapid breakdown support."}</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="absolute inset-0 rounded-3xl transform rotate-3 opacity-20" style={{ backgroundColor: "#b78852" }}></div>
            <div className="relative p-2 rounded-3xl shadow-2xl" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)" }}>
              <Image
                src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop"
                alt="Shreedhar Instruments Facilities"
                width={600}
                height={400}
                className="w-full h-80 object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <div className="backdrop-blur-md p-6 rounded-2xl shadow-lg" style={{ backgroundColor: "rgba(255, 255, 255, 0.95)" }}>
                  <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: "#8b6a3f" }}>
                    <Globe size={20} style={{ color: "#b78852" }} />
                    Pan-India Excellence
                  </h4>
                  <p className="text-sm" style={{ color: "#9c7649" }}>{officeLocations.length}+ offices serving pharmaceutical companies nationwide with unmatched service quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics - Now Dynamic */}
        <div className="relative mb-24 overflow-hidden">
          <div className="absolute inset-0 rounded-3xl" style={{ background: "linear-gradient(135deg, #8b6a3f 0%, #b78852 50%, #c9955f 100%)" }}></div>
          <div className="absolute inset-0 opacity-30">
            <div className="w-full h-full" style={{ backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)`, backgroundSize: '60px 60px' }}></div>
          </div>
          <div className="relative z-10 p-12 text-white">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Our Impact in Numbers</h2>
              <p className="text-lg" style={{ color: "rgba(255, 255, 255, 0.8)" }}>Trusted by the pharmaceutical industry across India and beyond</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300" style={{ color: "#fef3c7" }}>
                    {stat.number}
                  </div>
                  <div className="font-semibold mb-1" style={{ color: "rgba(255, 255, 255, 0.9)" }}>{stat.label}</div>
                  <div className="text-sm" style={{ color: "rgba(255, 255, 255, 0.7)" }}>{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#8b6a3f" }}>Our Core Values</h2>
            <p className="text-xl" style={{ color: "#9c7649" }}>The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {coreValues.map((value, index) => (
              <div key={index} className="group p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#8b6a3f" }}>{value.title}</h3>
                <p className="leading-relaxed" style={{ color: "#9c7649" }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Client Showcase */}
        {clients.length > 0 && (
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: "#8b6a3f" }}>Trusted by Leading Companies</h2>
              <p className="text-xl" style={{ color: "#9c7649" }}>Our valued clients across pharmaceutical and biopharma industry</p>
            </div>
            {loadingClients ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: "#b78852" }}></div>
                <p className="mt-4 text-lg" style={{ color: "#8b6a3f" }}>Loading Clients...</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
                {clients.map((client, index) => (
                  <div key={client.id} className="group p-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                    <div className="aspect-square flex items-center justify-center">
                      <img
                        src={client.logo}
                        alt={`${client.name} logo`}
                        className="max-w-full max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
                        style={{ filter: 'grayscale(100%)', transition: 'filter 0.3s' }}
                        onMouseEnter={(e) => e.target.style.filter = 'grayscale(0%)'}
                        onMouseLeave={(e) => e.target.style.filter = 'grayscale(100%)'}
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                    <h4 className="text-center text-sm font-medium mt-3 group-hover:text-amber-700 transition-colors" style={{ color: "#8b6a3f" }}>
                      {client.name}
                    </h4>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Milestones - Already Integrated */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#8b6a3f" }}>Our Growth Journey</h2>
            <p className="text-xl" style={{ color: "#9c7649" }}>Key milestones that shaped our success</p>
          </div>
          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-1 rounded-full hidden md:block" style={{ background: "linear-gradient(to bottom, #b78852 0%, #c9955f 50%, #d4a06a 100%)" }}></div>
            {loadingMilestones ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: "#b78852" }}></div>
                <p className="mt-4 text-lg" style={{ color: "#8b6a3f" }}>Loading Journey...</p>
              </div>
            ) : milestones.length > 0 ? (
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id || index} className="relative flex items-center gap-8 group">
                    <div className="hidden md:flex absolute left-6 w-5 h-5 rounded-full border-4 transition-colors duration-300 z-10" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", borderColor: "#b78852" }}></div>
                    <div className="md:ml-20 p-8 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 w-full" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-white px-6 py-3 rounded-xl font-bold text-lg" style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}>
                          {milestone.year}
                        </div>
                        <Calendar className="transition-colors duration-300" style={{ color: "#b78852" }} size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-2" style={{ color: "#8b6a3f" }}>{milestone.description}</h3>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-600">No milestones found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Awards - Auto-Scrolling with Improved Visibility */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#8b6a3f" }}>Recognition & Awards</h2>
            <p className="text-xl" style={{ color: "#9c7649" }}>Industry acknowledgment of our excellence</p>
          </div>
          
          {loadingAwards ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: "#b78852" }}></div>
              <p className="mt-4 text-lg" style={{ color: "#8b6a3f" }}>Loading Awards...</p>
            </div>
          ) : awards.length > 0 ? (
            <div className="relative">
              {/* Auto-Scrolling Container */}
              <div className="relative w-full overflow-hidden py-4">
                <style jsx>{`
                  @keyframes awards-scroll {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(-50%);
                    }
                  }
                  .animate-awards-scroll {
                    animation: awards-scroll 40s linear infinite;
                  }
                  .animate-awards-scroll:hover {
                    animation-play-state: paused;
                  }
                `}</style>
                
                <div 
                  className={`flex space-x-6 ${awards.length > 3 ? 'animate-awards-scroll' : 'justify-center'}`}
                  style={{
                    maskImage: awards.length > 3 
                      ? 'linear-gradient(to right, transparent 0, #000 128px, #000 calc(100% - 128px), transparent 100%)'
                      : 'none'
                  }}
                >
                  {/* Duplicate awards for smooth infinite scroll if more than 3 */}
                  {(awards.length > 3 ? [...awards, ...awards] : awards)
                    .sort((a, b) => b.year - a.year)
                    .map((award, index) => (
                    <div 
                      key={`${award.id}-${index}`} 
                      className={`group flex-shrink-0 w-80 p-6 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative ${
                        awards.length <= 3 && index === 0 ? 'ring-2 ring-amber-400 shadow-xl scale-105' : ''
                      }`}
                      style={{ 
                        backgroundColor: awards.length <= 3 && index === 0 ? "rgba(183, 136, 82, 0.08)" : "rgba(255, 255, 255, 0.95)", 
                        border: awards.length <= 3 && index === 0 ? "2px solid #b78852" : "1px solid rgba(183, 136, 82, 0.2)",
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                      }}
                    >
                      {/* Latest Award Badge - only show on first award when not scrolling */}
                      {awards.length <= 3 && index === 0 && (
                        <div className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-orange-400 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg z-10">
                          Latest Award
                        </div>
                      )}
                      
                      {/* Award Image with better styling */}
                      {award.image && (
                        <div className="relative mb-6 rounded-2xl overflow-hidden shadow-lg group-hover:shadow-xl transition-all duration-300 bg-white">
                          <div className="aspect-[4/3] flex items-center justify-center p-4">
                            <img
                              src={award.image}
                              alt={`${award.award_name} Award`}
                              className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                              onError={(e) => {
                                e.target.parentElement.innerHTML = `
                                  <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg">
                                    <div class="text-center">
                                      <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center">
                                        <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                      </div>
                                      <p class="text-sm font-medium text-amber-700">Award Certificate</p>
                                    </div>
                                  </div>
                                `;
                              }}
                              loading="lazy"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent"></div>
                        </div>
                      )}
                      
                      {/* Award Details */}
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <div className="p-3 rounded-2xl shadow-sm" style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}>
                            <Award className="text-white" size={20} />
                          </div>
                          <div className="font-bold text-xl" style={{ color: "#b78852" }}>{award.year}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-bold text-lg leading-tight line-clamp-2" style={{ color: "#8b6a3f" }}>
                            {award.award_name}
                          </h3>
                          <p className="font-semibold text-sm" style={{ color: "#b78852" }}>
                            Awarded by: {award.awarded_by}
                          </p>
                        </div>

                        {/* Award Category Badge */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "rgba(183, 136, 82, 0.1)", color: "#8b6a3f" }}>
                          Excellence Award
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Enhanced Scroll Indicators */}
              <div className="text-center mt-8 space-y-4">
                <div className="flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <Award size={16} className="text-amber-600" />
                    <span className="text-sm font-medium" style={{ color: "#8b6a3f" }}>
                      {awards.length} Awards Earned
                    </span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs bg-amber-100 px-3 py-1 rounded-full text-amber-800 font-medium">
                      {awards.length > 3 ? 'Auto-scrolling' : 'Static Display'}
                    </span>
                  </div>
                </div>
                
                {awards.length > 3 && (
                  <p className="text-xs" style={{ color: "#9c7649" }}>
                    Hover to pause • Showcasing our commitment to excellence
                  </p>
                )}
              </div>

              {/* Awards Stats */}
              <div className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold mb-2" style={{ color: "#8b6a3f" }}>
                    Award Statistics
                  </h3>
                  <p className="text-sm" style={{ color: "#9c7649" }}>
                    Recognition across the years
                  </p>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { 
                      stat: awards.length.toString(), 
                      title: "Total Awards", 
                      description: "Industry recognition",
                      icon: Award
                    },
                    { 
                      stat: new Set(awards.map(a => a.awarded_by)).size.toString(), 
                      title: "Award Bodies", 
                      description: "Different organizations",
                      icon: Building
                    },
                    { 
                      stat: awards.length > 0 ? Math.max(...awards.map(a => a.year)) - Math.min(...awards.map(a => a.year)) + 1 : "0", 
                      title: "Years Span", 
                      description: "Consistent excellence",
                      icon: Calendar
                    },
                    { 
                      stat: awards.length > 0 ? new Date().getFullYear() - Math.min(...awards.map(a => a.year)) : "0", 
                      title: "Legacy Years", 
                      description: "Since first award",
                      icon: Star
                    }
                  ].map((metric, index) => (
                    <div key={index} className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3" style={{ backgroundColor: "rgba(183, 136, 82, 0.1)" }}>
                        <metric.icon size={20} style={{ color: "#b78852" }} />
                      </div>
                      <div className="text-2xl font-bold mb-1" style={{ color: "#8b6a3f" }}>
                        {metric.stat}
                      </div>
                      <h4 className="text-sm font-semibold mb-1" style={{ color: "#b78852" }}>
                        {metric.title}
                      </h4>
                      <p className="text-xs" style={{ color: "#9c7649" }}>
                        {metric.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-600">No awards found.</p>
            </div>
          )}
        </div>

        {/* Testimonials Section */}
        {testimonials.length > 0 && (
          <div className="mb-24">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4" style={{ color: "#8b6a3f" }}>What Our Clients Say</h2>
              <p className="text-xl" style={{ color: "#9c7649" }}>Trusted testimonials from pharmaceutical industry leaders</p>
            </div>
            
            {loadingTestimonials ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: "#b78852" }}></div>
                <p className="mt-4 text-lg" style={{ color: "#8b6a3f" }}>Loading Testimonials...</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <div key={testimonial.id} className="group p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                    <div className="flex text-yellow-400 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={18} fill="currentColor" />
                      ))}
                    </div>
                    <p className="text-lg mb-6 italic leading-relaxed" style={{ color: "#9c7649" }}>
                      {testimonial.testimonial_text}
                    </p>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold" style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}>
                        {testimonial.client_name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold" style={{ color: "#8b6a3f" }}>{testimonial.client_name}</div>
                        <div className="text-sm" style={{ color: "#b78852" }}>{testimonial.company}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CTA Section - With Dynamic USP */}
        <div className="relative overflow-hidden rounded-3xl p-12 text-center text-white" style={{ background: "linear-gradient(135deg, #8b6a3f 0%, #b78852 50%, #c9955f 100%)" }}>
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '50px 50px' }}></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Our Commitment to Excellence</h2>
            <p className="text-xl mb-8 leading-relaxed italic" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
              {companyInfo?.usp ? `"${stripHtml(companyInfo.usp)}"` : '"We commit to deliver the technically best solution complemented by after-sales service. From IQ/OQ qualification and calibration to preventive maintenance and rapid breakdown support, we ensure maximum uptime and process reliability."'}
            </p>
            <p className="mb-8" style={{ color: "rgba(255, 255, 255, 0.8)" }}>
              This level of all-India leadership and unmatched service quality has earned us a loyal brand reputation, making us the most preferred partner in the pharmaceutical analytical instruments sector.
            </p>
            <div className="inline-flex items-center gap-3 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer" style={{ background: "linear-gradient(135deg, #d4a06a 0%, #dfa975 100%)" }}>
              Partner With Us
              <ArrowRight size={20} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}