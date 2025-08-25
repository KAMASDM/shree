// src/app/quality/page.jsx
import React from 'react';
import { Award, Target, Users, Cog, TrendingUp, Shield, CheckCircle, Star, Zap, Heart, Globe, Wrench } from 'lucide-react';

export default function QualityPolicyPage() {
  return (
    <div 
      className="min-h-screen pt-32 pb-20"
      style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6" style={{ backgroundColor: "rgba(183, 136, 82, 0.1)", color: "#8b6a3f" }}>
            <Award size={16} />
            Excellence in Quality
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: "#8b6a3f" }}>
            Quality Policy
          </h1>
          <p className="text-lg max-w-3xl mx-auto leading-relaxed" style={{ color: "#9c7649" }}>
            Our commitment to delivering exceptional products and services that exceed customer expectations and regulatory requirements
          </p>
        </div>

        {/* Quality Statement */}
        <div 
          className="mb-16 p-8 md:p-12 rounded-3xl shadow-lg text-center"
          style={{ 
            background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
            color: "white"
          }}
        >
          <Award size={48} className="mx-auto mb-6 opacity-90" />
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Quality Commitment</h2>
          <p className="text-lg md:text-xl leading-relaxed max-w-4xl mx-auto opacity-95">
            "At Shreedhar Instruments, quality is not just a goal—it's our foundation. We are committed to providing analytical instruments and services that enable our customers to maintain the highest standards of pharmaceutical manufacturing and compliance."
          </p>
          <div className="mt-6 text-sm opacity-90">
            — Management Team, Shreedhar Instruments
          </div>
        </div>

        {/* Core Quality Principles */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#8b6a3f" }}>
              Core Quality Principles
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#9c7649" }}>
              The fundamental principles that guide every aspect of our operations
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Target size={32} style={{ color: "#059669" }} />,
                title: "Customer Focus",
                description: "We understand and consistently meet customer requirements while striving to exceed their expectations through superior products and services."
              },
              {
                icon: <Users size={32} style={{ color: "#dc2626" }} />,
                title: "Leadership",
                description: "Our management creates unity of purpose and provides direction that enables people to achieve quality objectives."
              },
              {
                icon: <Heart size={32} style={{ color: "#7c3aed" }} />,
                title: "Engagement of People",
                description: "We recognize that competent, empowered, and engaged people at all levels are essential for enhancing quality capability."
              },
              {
                icon: <Cog size={32} style={{ color: "#ea580c" }} />,
                title: "Process Approach",
                description: "We manage activities as interrelated processes that function as a coherent system to achieve consistent and predictable results."
              },
              {
                icon: <TrendingUp size={32} style={{ color: "#0369a1" }} />,
                title: "Improvement",
                description: "We maintain focus on continual improvement as a permanent objective to enhance customer satisfaction and organizational performance."
              },
              {
                icon: <Shield size={32} style={{ color: "#16a34a" }} />,
                title: "Evidence-Based Decision Making",
                description: "We base decisions on analysis and evaluation of data and information to achieve desired results with greater likelihood."
              }
            ].map((principle, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  border: "1px solid rgba(183, 136, 82, 0.15)"
                }}
              >
                <div className="flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {principle.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-center" style={{ color: "#8b6a3f" }}>
                  {principle.title}
                </h3>
                <p className="text-sm leading-relaxed text-center" style={{ color: "#9c7649" }}>
                  {principle.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Quality Objectives */}
        <div className="mb-16">
          <div 
            className="p-8 md:p-12 rounded-3xl shadow-lg"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(183, 136, 82, 0.15)"
            }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#8b6a3f" }}>
                Quality Objectives
              </h2>
              <p className="text-lg" style={{ color: "#9c7649" }}>
                Measurable goals that drive our continuous improvement
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                {[
                  {
                    title: "Customer Satisfaction",
                    target: "≥95%",
                    description: "Maintain customer satisfaction rating above 95% through service excellence"
                  },
                  {
                    title: "Regulatory Compliance",
                    target: "100%",
                    description: "Achieve complete compliance with FDA, GMP, and ISO standards"
                  },
                  {
                    title: "Service Response Time",
                    target: "≤24 hours",
                    description: "Respond to customer service requests within 24 hours"
                  },
                  {
                    title: "Product Quality",
                    target: "99.9%",
                    description: "Maintain product quality standards with <0.1% defect rate"
                  }
                ].map((objective, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "rgba(34, 197, 94, 0.1)" }}
                    >
                      <CheckCircle size={24} className="text-green-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold" style={{ color: "#8b6a3f" }}>{objective.title}</h4>
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-semibold"
                          style={{ backgroundColor: "#059669", color: "white" }}
                        >
                          {objective.target}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: "#9c7649" }}>{objective.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-6">
                {[
                  {
                    title: "Employee Competency",
                    target: "100%",
                    description: "Ensure all technical staff are certified and regularly trained"
                  },
                  {
                    title: "Process Improvement",
                    target: "Quarterly",
                    description: "Implement continuous improvement initiatives every quarter"
                  },
                  {
                    title: "Supplier Quality",
                    target: "≥98%",
                    description: "Maintain supplier performance rating above 98%"
                  },
                  {
                    title: "Documentation Accuracy",
                    target: "99.8%",
                    description: "Achieve documentation accuracy with minimal errors"
                  }
                ].map((objective, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div 
                      className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                    >
                      <Star size={24} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-bold" style={{ color: "#8b6a3f" }}>{objective.title}</h4>
                        <span 
                          className="px-3 py-1 rounded-full text-sm font-semibold"
                          style={{ backgroundColor: "#2563eb", color: "white" }}
                        >
                          {objective.target}
                        </span>
                      </div>
                      <p className="text-sm" style={{ color: "#9c7649" }}>{objective.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Quality Management System */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#8b6a3f" }}>
              Quality Management System
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#9c7649" }}>
              Our systematic approach to quality management
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {[
                {
                  icon: <Globe size={24} style={{ color: "#b78852" }} />,
                  title: "ISO 9001:2015 Framework",
                  description: "Our quality management system is based on ISO 9001:2015 principles, ensuring systematic approach to quality management."
                },
                {
                  icon: <Wrench size={24} style={{ color: "#b78852" }} />,
                  title: "Process-Based Approach",
                  description: "We manage all activities as interconnected processes, from customer inquiry to after-sales support."
                },
                {
                  icon: <TrendingUp size={24} style={{ color: "#b78852" }} />,
                  title: "Continuous Monitoring",
                  description: "Regular monitoring and measurement of processes, products, and customer satisfaction to drive improvement."
                },
                {
                  icon: <Shield size={24} style={{ color: "#b78852" }} />,
                  title: "Risk Management",
                  description: "Systematic identification, assessment, and mitigation of risks that could impact quality delivery."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div 
                    className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "rgba(183, 136, 82, 0.1)" }}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="font-bold mb-2" style={{ color: "#8b6a3f" }}>{item.title}</h4>
                    <p className="text-sm" style={{ color: "#9c7649" }}>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div 
              className="p-8 rounded-2xl"
              style={{ backgroundColor: "rgba(183, 136, 82, 0.05)", border: "1px solid rgba(183, 136, 82, 0.2)" }}
            >
              <h3 className="text-xl font-bold mb-6 text-center" style={{ color: "#8b6a3f" }}>
                Quality Performance Metrics
              </h3>
              <div className="space-y-4">
                {[
                  { metric: "Customer Retention Rate", value: "98.5%", trend: "↗" },
                  { metric: "First Call Resolution", value: "92%", trend: "↗" },
                  { metric: "On-Time Delivery", value: "96%", trend: "↗" },
                  { metric: "Service Quality Rating", value: "4.8/5.0", trend: "↗" },
                  { metric: "Compliance Audit Score", value: "99.2%", trend: "↗" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 rounded-lg bg-white">
                    <span className="text-sm font-medium" style={{ color: "#8b6a3f" }}>
                      {item.metric}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold" style={{ color: "#059669" }}>{item.value}</span>
                      <span className="text-green-600 font-bold">{item.trend}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Regulatory Compliance */}
        <div className="mb-16">
          <div 
            className="p-8 md:p-12 rounded-3xl shadow-lg"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(183, 136, 82, 0.15)"
            }}
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#8b6a3f" }}>
                Regulatory Compliance
              </h2>
              <p className="text-lg" style={{ color: "#9c7649" }}>
                Meeting and exceeding industry standards and regulations
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  standard: "FDA 21 CFR Part 11",
                  description: "Electronic records and signatures compliance",
                  status: "Fully Compliant"
                },
                {
                  standard: "ISO 9001:2015",
                  description: "Quality management systems standard",
                  status: "Certified"
                },
                {
                  standard: "USP Standards",
                  description: "United States Pharmacopeia compliance",
                  status: "Validated"
                },
                {
                  standard: "EU GMP",
                  description: "European Good Manufacturing Practice",
                  status: "Compliant"
                }
              ].map((item, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl text-center"
                  style={{ backgroundColor: "rgba(34, 197, 94, 0.05)", border: "1px solid rgba(34, 197, 94, 0.2)" }}
                >
                  <Shield size={32} className="mx-auto mb-4 text-green-600" />
                  <h4 className="font-bold mb-2" style={{ color: "#8b6a3f" }}>
                    {item.standard}
                  </h4>
                  <p className="text-sm mb-3" style={{ color: "#9c7649" }}>
                    {item.description}
                  </p>
                  <span 
                    className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                    style={{ backgroundColor: "#059669" }}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Continuous Improvement */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ color: "#8b6a3f" }}>
              Continuous Improvement Culture
            </h2>
            <p className="text-lg max-w-2xl mx-auto" style={{ color: "#9c7649" }}>
              Our commitment to never-ending improvement in all aspects of our operations
            </p>
          </div>

          <div 
            className="p-8 rounded-2xl"
            style={{ backgroundColor: "rgba(59, 130, 246, 0.05)", border: "1px solid rgba(59, 130, 246, 0.2)" }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Customer Feedback Integration",
                  description: "Regular collection and analysis of customer feedback to drive service improvements",
                  action: "Monthly customer surveys and quarterly review meetings"
                },
                {
                  title: "Employee Suggestion Program",
                  description: "Encouraging and implementing employee suggestions for process improvements",
                  action: "Quarterly improvement initiatives and recognition programs"
                },
                {
                  title: "Technology Advancement",
                  description: "Continuous adoption of new technologies to enhance service delivery",
                  action: "Annual technology roadmap reviews and implementation"
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                  >
                    <Zap size={24} className="text-blue-600" />
                  </div>
                  <h4 className="font-bold mb-3" style={{ color: "#8b6a3f" }}>{item.title}</h4>
                  <p className="text-sm mb-4" style={{ color: "#9c7649" }}>{item.description}</p>
                  <p className="text-xs font-medium" style={{ color: "#2563eb" }}>{item.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quality Commitment Statement */}
        <div className="text-center">
          <div 
            className="p-8 md:p-12 rounded-3xl shadow-lg"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(183, 136, 82, 0.15)"
            }}
          >
            <Award size={48} className="mx-auto mb-6" style={{ color: "#b78852" }} />
            <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "#8b6a3f" }}>
              Our Quality Promise
            </h2>
            <div className="max-w-4xl mx-auto space-y-4 text-lg" style={{ color: "#9c7649" }}>
              <p>
                We pledge to maintain the highest standards of quality in everything we do. From the moment you contact us to long after your instruments are installed and operational, we are committed to exceeding your expectations.
              </p>
              <p>
                Our quality management system is continuously evolving, incorporating best practices, customer feedback, and technological advancements to ensure we remain your most trusted partner in analytical instrumentation.
              </p>
            </div>
            <div className="mt-8">
              <div className="text-sm font-medium" style={{ color: "#8b6a3f" }}>
                This Quality Policy is reviewed annually and communicated to all stakeholders.
              </div>
              <div className="text-sm mt-2" style={{ color: "#9c7649" }}>
                Document Version: 2025.1 | Effective Date: January 1, 2025
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}