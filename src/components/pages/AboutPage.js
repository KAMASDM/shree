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
  Heart,
  ChevronRight,
  Quote
} from "lucide-react";
import { apiService } from '../../lib/api';
import Decade from '../../img/shree-decade.jpeg';

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
    { number: "27+", label: "Years", description: "Industry Leadership" },
    { number: "800+", label: "Customers", description: "Trusted Partners" },
    { number: "10,000+", label: "Installations", description: "Successful Projects" },
    { number: `${officeLocations.length > 0 ? officeLocations.length : '5'}+`, label: "Offices", description: "Pan-India Presence" }
  ];

  // Extract text from HTML content
  const stripHtml = (html) => {
    if (!html) return '';
    if (typeof document === 'undefined') return html; // Return as-is in SSR
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <div className="pt-16 pb-20 bg-gradient-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. Hero Section */}
        <section className="relative py-16 md:py-24 mb-16 md:mb-24">
          <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-orange-100/20 rounded-3xl"></div>
          <div className="relative z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-amber-100 text-amber-800">
              <Star size={16} />
              Trusted Since 1998
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-amber-900">
              Shreedhar<br />
              <span className="text-3xl md:text-5xl text-amber-700">Instruments</span>
            </h1>
            
            <p className="text-lg md:text-xl max-w-4xl mx-auto mb-8 leading-relaxed text-amber-800">
              The <span className="font-bold text-amber-900">most trusted, reliable and ethical</span> organization 
              in analytical instruments for pharmaceutical industry. 
              <span className="block mt-2 text-base md:text-lg">27+ years of excellence serving pharmaceutical and biopharma sectors</span>
            </p>
          </div>
        </section>

        {/* 2. Statistics (Impact Numbers) */}
        <section className="relative mb-16 md:mb-24 overflow-hidden rounded-3xl bg-gradient-to-r from-amber-700 to-amber-900 text-white p-8 md:p-12">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{ backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 2px, transparent 2px)`, backgroundSize: '60px 60px' }}></div>
          </div>
          <div className="relative z-10">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Impact in Numbers</h2>
              <p className="text-amber-100">Serving To Leading Pharma Companies across India and Globally</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-3xl md:text-5xl font-bold mb-3 group-hover:scale-110 transition-transform duration-300 text-amber-100">
                    {stat.number}
                  </div>
                  <div className="font-semibold mb-1">{stat.label}</div>
                  <div className="text-sm text-amber-200">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* 3. Three Decades of Innovation (Company Story) */}
        <section className="grid lg:grid-cols-2 gap-12 items-center mb-16 md:mb-24">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6 bg-amber-100 text-amber-800">
              <Microscope size={16} />
              Our Journey
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-amber-900">
              Three Decades of <span className="text-amber-700"> Innovation</span>
            </h2>
            <div className="space-y-6 leading-relaxed text-amber-800">
              {loadingCompanyInfo ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="p-6 rounded-2xl animate-pulse bg-amber-50">
                      <div className="h-4 rounded mb-2 bg-amber-100"></div>
                      <div className="h-3 rounded bg-amber-100"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <>
                  <div className="p-6 rounded-2xl shadow-sm bg-white border border-amber-100">
                    <h4 className="font-bold mb-2 flex items-center gap-2 text-amber-900">
                      <CheckCircle className="text-green-500" size={20} />
                      Founded by Visionary Leadership
                    </h4>
                    <p>{companyInfo?.history ? stripHtml(companyInfo.history) : "Started in 1998 by Mr. Jayant Joshi, partnering with global technology leaders to deliver cutting-edge solutions for pharmaceutical and biopharma manufacturing."}</p>
                  </div>
                  <div className="p-6 rounded-2xl shadow-sm bg-white border border-amber-100">
                    <h4 className="font-bold mb-2 flex items-center gap-2 text-amber-900">
                      <Shield size={20} className="text-amber-600" />
                      Regulatory Excellence
                    </h4>
                    <p>27+ years of expertise serving the most stringent regulatory environments across India, establishing ourselves as the leading distributor of analytical instruments.</p>
                  </div>
                  <div className="p-6 rounded-2xl shadow-sm bg-white border border-amber-100">
                    <h4 className="font-bold mb-2 flex items-center gap-2 text-amber-900">
                      <Zap size={20} className="text-amber-500" />
                      Customer-Centric Innovation
                    </h4>
                    <p>{companyInfo?.usp ? stripHtml(companyInfo.usp) : "Our approach ensures technically superior solutions with comprehensive after-sales service, from IQ/OQ qualification to preventive maintenance and rapid breakdown support."}</p>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="order-1 lg:order-2 relative">
            <div className="absolute inset-0 rounded-3xl transform rotate-3 opacity-20 bg-amber-600"></div>
            <div className="relative p-2 rounded-3xl shadow-xl bg-white">
              <Image
                src={Decade}
                alt="Shreedhar Instruments Facilities"
                width={600}
                height={400}
                className="w-full h-64 md:h-80 object-cover rounded-2xl"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-2xl"></div>
            </div>
          </div>
        </section>

        {/* 4. Mission, Vision, Goal */}
        <section className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-16 md:mb-24">
          {loadingCompanyInfo ? (
            // Loading skeleton
            [...Array(3)].map((_, i) => (
              <div key={i} className="p-6 md:p-8 rounded-3xl shadow-lg animate-pulse bg-white">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl mb-6 bg-amber-100"></div>
                <div className="h-6 rounded mb-4 bg-amber-100"></div>
                <div className="space-y-2">
                  <div className="h-4 rounded bg-amber-50"></div>
                  <div className="h-4 rounded w-3/4 bg-amber-50"></div>
                </div>
              </div>
            ))
          ) : (
            [
              { 
                icon: Eye, 
                title: "Our Vision", 
                content: companyInfo?.vision ? stripHtml(companyInfo.vision) : "To become and remain as the most preferred partner to our customers and principals.", 
                gradient: "from-amber-600 to-amber-800",
              },
              { 
                icon: Target, 
                title: "Our Mission", 
                content: companyInfo?.mission ? stripHtml(companyInfo.mission) : "We aim to excel and to be the leading player for our chosen markets.", 
                gradient: "from-amber-700 to-amber-900",
              },
              { 
                icon: Award, 
                title: "Our Goal", 
                content: companyInfo?.goal ? stripHtml(companyInfo.goal) : "To be recognized as the MOST TRUSTED, RELIABLE AND ETHICAL organization in our business sector.", 
                gradient: "from-amber-800 to-amber-950",
              }
            ].map((item, i) => (
              <div key={i} className="group relative p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-amber-100">
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-amber-50/30 to-orange-50/30"></div>
                <div className="relative z-10">
                  <div className={`inline-flex p-3 md:p-4 rounded-2xl mb-6 shadow-lg bg-gradient-to-r ${item.gradient}`}>
                    <item.icon className="text-white" size={24} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-amber-900">{item.title}</h3>
                  <p className="italic text-amber-800 leading-relaxed">&ldquo;{item.content}&rdquo;</p>
                </div>
              </div>
            ))
          )}
        </section>

        {/* 5. Core Values */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-900">Our Core Values</h2>
            <p className="text-lg text-amber-800">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <div key={index} className="group p-6 md:p-8 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-amber-100">
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-amber-900">{value.title}</h3>
                <p className="leading-relaxed text-amber-800">{value.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Our Growth Journey (Milestones) */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-900">Our Growth Journey</h2>
            <p className="text-lg text-amber-800">Key milestones that shaped our success</p>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-8 top-0 bottom-0 w-1 rounded-full hidden md:block bg-gradient-to-b from-amber-600 to-amber-800"></div>
            {loadingMilestones ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                <p className="mt-4 text-lg text-amber-800">Loading Journey...</p>
              </div>
            ) : milestones.length > 0 ? (
              <div className="space-y-8">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id || index} className="relative flex items-center gap-6 group">
                    <div className="hidden md:flex absolute left-3 w-4 h-4 rounded-full border-4 transition-colors duration-300 z-10 bg-white border-amber-600"></div>
                    <div className="md:ml-12 p-6 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300 w-full bg-white border border-amber-100">
                      <div className="flex items-start justify-between mb-4">
                        <div className="text-white px-4 py-2 rounded-xl font-bold text-base bg-gradient-to-r from-amber-600 to-amber-800">
                          {milestone.year}
                        </div>
                        <Calendar className="text-amber-600 transition-colors duration-300" size={20} />
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-amber-900">{milestone.description}</h3>
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
        </section>
        
        {/* 7. Award Recognition - With Horizontal Scroller */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-900">Recognition & Awards</h2>
            <p className="text-lg text-amber-800">Industry acknowledgment of our excellence</p>
          </div>
          
          {loadingAwards ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
              <p className="mt-4 text-lg text-amber-800">Loading Awards...</p>
            </div>
          ) : awards.length > 0 ? (
            <div className="relative">
              <div className="relative w-full overflow-hidden py-4"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
                }}
              >
                <style jsx>{`
                  @keyframes awards-scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                  }
                  .animate-awards-scroll {
                    animation: awards-scroll 60s linear infinite;
                  }
                  .animate-awards-scroll:hover {
                    animation-play-state: paused;
                  }
                `}</style>
                <div className="flex w-fit animate-awards-scroll">
                  {/* Duplicate awards 3 times for smooth scrolling effect */}
                  {Array(3).fill(awards.sort((a, b) => b.year - a.year)).flat().map((award, index) => (
                    <div 
                      key={`${award.id}-${Math.floor(index / awards.length)}-${index}`} 
                      className="group flex-shrink-0 w-72 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-amber-100 mx-4"
                    >
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
                                      <div class="w-12 h-12 mx-auto mb-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-400 flex items-center justify-center">
                                        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                      </div>
                                      <p class="text-xs font-medium text-amber-700">Award Certificate</p>
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
                      
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-2xl shadow-sm bg-gradient-to-r from-amber-600 to-amber-800">
                            <Award className="text-white" size={16} />
                          </div>
                          <div className="font-bold text-base text-amber-700">{award.year}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <h3 className="font-bold text-base leading-tight line-clamp-2 text-amber-900">
                            {award.award_name}
                          </h3>
                          <p className="font-semibold text-sm text-amber-700">
                            Awarded by: {award.awarded_by}
                          </p>
                        </div>

                        <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
                          Excellence Award
                        </div>
                      </div>
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
        </section>

        {/* 9. Our Commitment to Excellence (CTA Section) */}
        <section className="relative overflow-hidden rounded-3xl p-8 md:p-12 text-center text-white bg-gradient-to-r from-amber-700 to-amber-900 mb-16 md:mb-24">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '50px 50px' }}></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Commitment to Excellence</h2>
            <p className="text-lg mb-6 leading-relaxed italic text-amber-100">
              {companyInfo?.usp ? `"${stripHtml(companyInfo.usp)}"` : '"We commit to deliver the technically best solution complemented by after-sales service. From IQ/OQ qualification and calibration to preventive maintenance and rapid breakdown support, we ensure maximum uptime and process reliability."'}
            </p>
            <p className="mb-8 text-amber-200">
              This level of all-India leadership and unmatched service quality has earned us a loyal brand reputation, making us the most preferred partner in the pharmaceutical analytical instruments sector.
            </p>
            <button className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-2xl font-semibold hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800">
              Partner With Us
              <ArrowRight size={18} />
            </button>
          </div>
        </section>

        {/* 10. Testimonials - Horizontal Scroller */}
        {testimonials.length > 0 && (
          <section className="mb-16 md:mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-amber-900">What Our Clients Say</h2>
              <p className="text-lg text-amber-800">Trusted testimonials from pharmaceutical industry leaders</p>
            </div>
            
            {loadingTestimonials ? (
              <div className="text-center py-10">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600"></div>
                <p className="mt-4 text-lg text-amber-800">Loading Testimonials...</p>
              </div>
            ) : (
              <div className="relative">
                <div className="relative w-full overflow-hidden py-4"
                  style={{
                    maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)'
                  }}
                >
                  <style jsx>{`
                    @keyframes testimonials-scroll {
                      0% { transform: translateX(0); }
                      100% { transform: translateX(-50%); }
                    }
                    .animate-testimonials-scroll {
                      animation: testimonials-scroll 50s linear infinite;
                    }
                    .animate-testimonials-scroll:hover {
                      animation-play-state: paused;
                    }
                  `}</style>
                  <div className="flex w-fit animate-testimonials-scroll">
                    {/* Duplicate testimonials for smooth scrolling effect */}
                    {Array(3).fill(testimonials).flat().map((testimonial, index) => (
                      <div 
                        key={`${testimonial.id}-${Math.floor(index / testimonials.length)}-${index}`} 
                        className="group flex-shrink-0 w-80 p-6 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 bg-white border border-amber-100 mx-4"
                      >
                        <div className="flex text-amber-400 mb-6">
                          {[...Array(5)].map((_, i) => ( 
                            <Star key={i} size={16} fill="currentColor" /> 
                          ))}
                        </div>
                        <p className="text-base mb-6 italic leading-relaxed text-amber-800 line-clamp-4">
                          "{testimonial.testimonial_text}"
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg bg-gradient-to-r from-amber-600 to-amber-800">
                            {testimonial.client_name.charAt(0)}
                          </div>
                          <div>
                            <div className="font-bold text-amber-900">{testimonial.client_name}</div>
                            <div className="text-sm text-amber-700">{testimonial.company}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

      </div>
    </div>
  );
}