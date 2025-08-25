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
  Star
} from "lucide-react";
import { apiService } from '../../lib/api';

// Static data that remains unchanged
const companyInfo = {
  vision: "To be the most trusted partner for pharmaceutical analytical solutions across India",
  mission: "Deliver cutting-edge analytical instruments with unmatched service excellence",
  goal: "Empower pharmaceutical innovation through reliable, precision analytical technology",
  coreValues: [
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
  ],
  statistics: [
    { number: "28+", label: "Years", description: "Industry Leadership" },
    { number: "800+", label: "Customers", description: "Trusted Partners" },
    { number: "10,000+", label: "Installations", description: "Successful Projects" },
    { number: "13+", label: "Offices", description: "Pan-India Presence" }
  ]
};

const awards = [
  {
    award: "Excellence in Distribution",
    awardedBy: "Pharmaceutical Industry Association",
    year: "2023",
    description: "Outstanding performance in analytical instrument distribution"
  },
  {
    award: "Service Excellence Award",
    awardedBy: "Indian Pharma Awards",
    year: "2022",
    description: "Recognition for exceptional after-sales service and support"
  },
  {
    award: "Trusted Partner Award",
    awardedBy: "Leading Pharmaceutical Companies",
    year: "2021",
    description: "Consistent delivery of quality solutions and services"
  }
];

export default function AboutPage() {
  const [milestones, setMilestones] = useState([]);
  const [loadingMilestones, setLoadingMilestones] = useState(true);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        setLoadingMilestones(true);
        const response = await apiService.getMilestones(); // Correctly call the new method
        setMilestones(response.data);
      } catch (error) {
        console.error("Failed to fetch milestones:", error);
      } finally {
        setLoadingMilestones(false);
      }
    };
    fetchMilestones();
  }, []);

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

        {/* Mission, Vision, Goal */}
        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          {[
            { 
              icon: Eye, 
              title: "Our Vision", 
              content: companyInfo.vision, 
              iconBg: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
            },
            { 
              icon: Target, 
              title: "Our Mission", 
              content: companyInfo.mission, 
              iconBg: "linear-gradient(135deg, #c9955f 0%, #d4a06a 100%)",
            },
            { 
              icon: Award, 
              title: "Our Goal", 
              content: companyInfo.goal, 
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
          ))}
        </div>

        {/* Company Story */}
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
              <div className="p-6 rounded-2xl shadow-sm" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                <h4 className="font-bold mb-2 flex items-center gap-2" style={{ color: "#8b6a3f" }}>
                  <CheckCircle className="text-green-500" size={20} />
                  Founded by Visionary Leadership
                </h4>
                <p>Started in 1998 by Mr. Jayant Joshi, partnering with global technology leaders to deliver cutting-edge solutions for pharmaceutical and biopharma manufacturing.</p>
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
                <p>Our approach ensures technically superior solutions with comprehensive after-sales service, from IQ/OQ qualification to preventive maintenance and rapid breakdown support.</p>
              </div>
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
                  <p className="text-sm" style={{ color: "#9c7649" }}>13+ offices serving pharmaceutical companies nationwide with unmatched service quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics */}
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
              {companyInfo.statistics.map((stat, index) => (
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
            {companyInfo.coreValues.map((value, index) => (
              <div key={index} className="group p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1" style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.15)" }}>
                <div className="text-6xl mb-6 group-hover:scale-110 transition-transform duration-300">{value.icon}</div>
                <h3 className="text-2xl font-bold mb-4" style={{ color: "#8b6a3f" }}>{value.title}</h3>
                <p className="leading-relaxed" style={{ color: "#9c7649" }}>{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Milestones */}
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
            ) : (
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
            )}
          </div>
        </div>

        {/* Awards */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4" style={{ color: "#8b6a3f" }}>Recognition & Awards</h2>
            <p className="text-xl" style={{ color: "#9c7649" }}>Industry acknowledgment of our excellence</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {awards.map((award, index) => (
              <div key={index} className="group p-8 rounded-3xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2" style={{ backgroundColor: "rgba(183, 136, 82, 0.05)", border: "1px solid rgba(183, 136, 82, 0.2)" }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-2xl" style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}>
                    <Award className="text-white" size={24} />
                  </div>
                  <div className="font-bold text-sm" style={{ color: "#b78852" }}>{award.year}</div>
                </div>
                <h3 className="font-bold mb-2 text-lg" style={{ color: "#8b6a3f" }}>{award.award}</h3>
                <p className="font-semibold text-sm mb-3" style={{ color: "#b78852" }}>{award.awardedBy}</p>
                <p className="text-sm leading-relaxed" style={{ color: "#9c7649" }}>{award.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="relative overflow-hidden rounded-3xl p-12 text-center text-white" style={{ background: "linear-gradient(135deg, #8b6a3f 0%, #b78852 50%, #c9955f 100%)" }}>
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)`, backgroundSize: '50px 50px' }}></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">Our Commitment to Excellence</h2>
            <p className="text-xl mb-8 leading-relaxed italic" style={{ color: "rgba(255, 255, 255, 0.9)" }}>
              &ldquo;We commit to deliver the technically best solution complemented by after-sales service. From IQ/OQ qualification and calibration to preventive maintenance and rapid breakdown support, we ensure maximum uptime and process reliability.&rdquo;
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