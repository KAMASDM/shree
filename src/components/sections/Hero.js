"use client";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  Phone,
  Award,
  FlaskConical,
  Shield,
  Users,
  Star,
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { apiService } from "../../lib/api";

export default function Hero() {
  const [latestEvent, setLatestEvent] = useState(null);
  const [eventLoading, setEventLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      console.log('🚀 Starting to fetch events...');
      setEventLoading(true);
      try {
        console.log('📡 Calling getAllBlogPosts API...');
        const response = await apiService.getAllBlogPosts();
        console.log('📝 Raw API response:', response);
        
        // Extract the data from the API service response
        const posts = response?.data || response;
        console.log('📊 Extracted posts:', posts);
        console.log('📊 Number of posts received:', posts?.length || 0);
        
        // Log each post's details for debugging
        if (posts && posts.length > 0) {
          posts.forEach((post, index) => {
            console.log(`📄 Post ${index + 1}:`, {
              title: post.title,
              tags: post.tags,
              published_date: post.published_date,
              event_date: post.event_date,
              full_post: post
            });
          });
          
          // Show all events, not just upcoming ones for debugging
          const eventPosts = posts.filter(post => {
            // Handle tags as array of objects with 'name' property
            const hasEventTag = post.tags && Array.isArray(post.tags) && post.tags.some(tag => {
              const tagName = typeof tag === 'object' ? tag.name : tag;
              return tagName && (
                tagName.toLowerCase() === 'event' ||
                tagName.toLowerCase() === 'events'
              );
            });
            console.log(`📋 Post "${post.title}" - Event tag: ${hasEventTag}`, {
              tags: post.tags,
              hasEventTag
            });
            return hasEventTag;
          });
          
          console.log('🎯 Filtered event posts:', eventPosts);
          
          if (eventPosts.length > 0) {
            // Sort by date and get the most recent
            const sortedEvents = eventPosts.sort((a, b) => {
              const dateA = new Date(a.event_date || a.published_date || a.created_at);
              const dateB = new Date(b.event_date || b.published_date || b.created_at);
              return dateB - dateA; // Most recent first
            });
            
            console.log('🔄 Sorted events:', sortedEvents);
            setLatestEvent(sortedEvents[0]);
            console.log('✅ Latest event set:', sortedEvents[0]);
          } else {
            console.log('❌ No events found in posts');
            setLatestEvent(null);
          }
        } else {
          console.log('❌ No posts received from API');
          setLatestEvent(null);
        }
      } catch (error) {
        console.error('💥 Error fetching events:', error);
        setLatestEvent(null);
      } finally {
        setEventLoading(false);
        console.log('🏁 Event loading completed');
      }
    };

    fetchEvents();
  }, []);

  return (
    <section className='relative min-h-screen flex items-center overflow-hidden'>
      {/* Background YouTube Video */}
      <div className='absolute inset-0 z-0'>
        <iframe
          className='w-full h-full object-cover'
          src="https://youtu.be/jeVjfNQ_pAI?si=MMVJ8ap95-upXLak"
          title="Pharmaceutical Laboratory Background"
          allow="autoplay; encrypted-media"
          style={{
            minWidth: '100vw',
            minHeight: '100vh',
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}
        ></iframe>
        {/* Gradient Overlay */}
        <div className='absolute inset-0 bg-gradient-to-r from-slate-900/85 via-slate-800/75 to-slate-900/85'></div>
        <div className='absolute inset-0 bg-gradient-to-b from-transparent via-amber-900/10 to-amber-900/20'></div>
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full'>
        <div className='grid lg:grid-cols-12 gap-8 lg:gap-12 items-center py-20 min-h-screen'>
          {/* Left Content */}
          <div className='lg:col-span-8 space-y-6 md:space-y-8'>
            {/* Trust Badge */}
            <div 
              className='inline-flex items-center gap-2 md:gap-3 rounded-full px-4 py-2 md:px-6 md:py-3 shadow-sm'
              style={{
                backgroundColor: "rgba(255, 200, 87, 0.1)",
                border: "1px solid rgba(255, 200, 87, 0.3)",
                backdropFilter: "blur(10px)"
              }}
            >
              <Award size={18} style={{ color: "#fbbf24" }} />
              <span className='font-medium text-sm md:text-base text-amber-100'>
                Trusted by 800+ Pharmaceutical Companies
              </span>
            </div>

            {/* Main Headline */}
            <div className='space-y-4 md:space-y-6'>
              <h1 className='text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white'>
                {`India's Leading`}
                <span 
                  className='block bg-gradient-to-r bg-clip-text text-transparent'
                  style={{ backgroundImage: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)" }}
                >
                  FDA Compliant
                </span>
                <span className='block'>Instrument Partner</span>
              </h1>

              <p className='text-lg md:text-xl lg:text-2xl leading-relaxed max-w-2xl text-slate-300'>
                27+ years of excellence in delivering cutting-edge analytical
                instruments and comprehensive validation services for
                pharmaceutical manufacturing.
              </p>
            </div>

            {/* Key Value Props */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4'>
              {[
                { icon: <Shield size={16} />, text: "21 CFR Part 11 Ready" },
                { icon: <CheckCircle size={16} />, text: "Complete IQ/OQ/PQ" },
                { icon: <Star size={16} />, text: "24/7 Expert Support" },
              ].map((prop, index) => (
                <div
                  key={index}
                  className='flex items-center gap-2 md:gap-3 rounded-lg px-3 py-2 md:px-4 md:py-3 shadow-sm'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <div style={{ color: "#b78852" }}>{prop.icon}</div>
                  <span className='font-medium text-sm md:text-base' style={{ color: "#8b6a3f" }}>
                    {prop.text}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 md:gap-4'>
              <Link
                href='/products'
                className='group px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 md:gap-3 text-white'
                style={{
                  background: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)"
                }}
              >
                <FlaskConical size={18} />
                <span>Explore Our Solutions</span>
                <ArrowRight
                  size={18}
                  className='group-hover:translate-x-1 transition-transform'
                />
              </Link>

              <Link
                href='/contact'
                className='group px-6 py-3 md:px-8 md:py-4 rounded-xl text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 md:gap-3 text-white'
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  border: "2px solid rgba(255, 255, 255, 0.3)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <Phone size={18} />
                Schedule Consultation
              </Link>
            </div>

            {/* Client Logos */}
            {/* <div className='pt-6 md:pt-8'>
              <p className='text-sm mb-3 md:mb-4 text-slate-400'>
                Trusted by industry leaders
              </p>
              <div className='flex flex-wrap items-center gap-4 md:gap-8'>
                {[
                  "Beckman Coulter",
                  "Met One",
                  "Tailin SciTech", 
                  "Eurping"
                ].map((partner, index) => (
                  <div key={index} className='font-semibold text-sm opacity-80 text-white/80'>
                    {partner}
                  </div>
                ))}
              </div>
            </div> */}
          </div>

          {/* Right Content - Stats & Compliance */}
          <div className='lg:col-span-4 space-y-6 md:space-y-8'>
            {/* Stats Grid */}
            <div className='grid grid-cols-2 gap-3 md:gap-4'>
              {[
                {
                  number: "10K+",
                  label: "Installations",
                  sublabel: "Across India",
                },
                {
                  number: "800+",
                  label: "Customers",
                  sublabel: "Pharma Companies",
                },
                { number: "27+", label: "Years", sublabel: "Experience" },
                { number: "13", label: "Offices", sublabel: "Pan-India" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className='rounded-xl md:rounded-2xl p-4 md:p-6 text-center hover:scale-105 transition-all duration-300 shadow-sm'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(183, 136, 82, 0.15)",
                    backdropFilter: "blur(10px)"
                  }}
                >
                  <div className='text-2xl md:text-3xl font-bold mb-1 md:mb-2' style={{ color: "#b78852" }}>
                    {stat.number}
                  </div>
                  <div className='font-semibold text-sm' style={{ color: "#8b6a3f" }}>
                    {stat.label}
                  </div>
                  <div className='text-xs' style={{ color: "#9c7649" }}>{stat.sublabel}</div>
                </div>
              ))}
            </div>

            {/* Latest Upcoming Event Card */}
            {(() => {
              console.log('🎨 Rendering event card - Loading:', eventLoading, 'Event:', latestEvent);
              return null;
            })()}
            {eventLoading ? (
              <div 
                className='rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm animate-pulse'
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(183, 136, 82, 0.15)",
                  backdropFilter: "blur(10px)"
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  <div className="w-24 h-4 bg-gray-300 rounded"></div>
                </div>
                <div className="space-y-3">
                  <div className="w-full h-4 bg-gray-300 rounded"></div>
                  <div className="w-3/4 h-3 bg-gray-300 rounded"></div>
                  <div className="w-1/2 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
            ) : latestEvent ? (
              <div 
                className='rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300'
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid rgba(183, 136, 82, 0.2)",
                  backdropFilter: "blur(15px)"
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={18} style={{ color: "#b78852" }} />
                  <h3 className='font-semibold text-sm' style={{ color: "#8b6a3f" }}>
                    Latest Event
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {/* Event Image */}
                  {latestEvent.featured_image && (
                    <div className="w-full h-32 md:h-40 rounded-lg overflow-hidden">
                      <img
                        src={latestEvent.featured_image}
                        alt={latestEvent.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  
                  <h4 className="font-bold text-sm md:text-base leading-tight" style={{ color: "#8b6a3f" }}>
                    {latestEvent.title}
                  </h4>
                  
                  {(latestEvent.excerpt || latestEvent.meta_description) && (
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {(() => {
                        const text = latestEvent.excerpt || latestEvent.meta_description || '';
                        return text.length > 80 ? `${text.substring(0, 80)}...` : text;
                      })()}
                    </p>
                  )}
                  
                  <div className="space-y-2">
                    {(latestEvent.event_date || latestEvent.published_date) && (
                      <div className="flex items-center gap-2">
                        <Clock size={12} style={{ color: "#b78852" }} />
                        <span className="text-xs" style={{ color: "#9c7649" }}>
                          {new Date(latestEvent.event_date || latestEvent.published_date).toLocaleDateString('en-IN', {
                            weekday: 'short',
                            year: 'numeric', 
                            month: 'short',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                    
                    {latestEvent.event_location && (
                      <div className="flex items-center gap-2">
                        <MapPin size={12} style={{ color: "#b78852" }} />
                        <span className="text-xs" style={{ color: "#9c7649" }}>
                          {latestEvent.event_location}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <Link
                    href={`/news/${latestEvent.slug || latestEvent.id}`}
                    className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: "#b78852",
                      color: "white"
                    }}
                  >
                    Learn More
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            ) : (
              // Fallback card for testing visibility
              <div 
                className='rounded-xl md:rounded-2xl p-4 md:p-6 shadow-lg'
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.95)",
                  border: "1px solid rgba(183, 136, 82, 0.2)",
                  backdropFilter: "blur(15px)"
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Calendar size={18} style={{ color: "#b78852" }} />
                  <h3 className='font-semibold text-sm' style={{ color: "#8b6a3f" }}>
                    Events
                  </h3>
                </div>
                <div className="space-y-3">
                  <h4 className="font-bold text-sm md:text-base leading-tight" style={{ color: "#8b6a3f" }}>
                    No upcoming events
                  </h4>
                  <p className="text-xs md:text-sm text-gray-600">
                    Check back soon for exciting industry events and webinars.
                  </p>
                  <Link
                    href="/news"
                    className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105"
                    style={{
                      backgroundColor: "#b78852",
                      color: "white"
                    }}
                  >
                    View All News
                    <ArrowRight size={12} />
                  </Link>
                </div>
              </div>
            )}

            {/* Compliance Certifications */}
            {/* <div 
              className='rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm'
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(183, 136, 82, 0.15)",
                backdropFilter: "blur(10px)"
              }}
            >
              <h3 className='font-semibold mb-3 md:mb-4 flex items-center gap-2' style={{ color: "#8b6a3f" }}>
                <Shield size={18} style={{ color: "#b78852" }} />
                Regulatory Compliance
              </h3>
              <div className='grid grid-cols-1 gap-2 md:gap-3'>
                {[
                  "21 CFR Part 11 Electronic Records",
                  "USP <788> Particulate Matter",
                  "EU GMP Annex 1 Compliance",
                  "ISO 9001:2015 Certified",
                ].map((cert, index) => (
                  <div key={index} className='flex items-center gap-2 md:gap-3'>
                    <CheckCircle size={14} className='flex-shrink-0' style={{ color: "#22c55e" }} />
                    <span className='text-xs md:text-sm' style={{ color: "#9c7649" }}>{cert}</span>
                  </div>
                ))}
              </div>
            </div> */}
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className='absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent'></div>
    </section>
  );
}