"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  Award,
  Clock,
  Shield,
  Users,
  Wrench,
  BookOpen,
  Phone,
  MessageCircle,
  Star,
  Heart,
  Zap,
  Target,
  ThumbsUp,
  Settings,
  FileText,
  HelpCircle,
  Package,
  MessageSquare,
  Hammer,
} from "lucide-react";
import ServiceInquiryForm from "../forms/ServiceInquiryForm";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showServiceForm, setShowServiceForm] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://sweekarme.in/shree/api/services/"
        );
        setServices(response.data);
      } catch (err) {
        setError(
          "Failed to load services. Please ensure the backend server is running."
        );
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const serviceProcess = [
    {
      step: "1",
      title: "Consultation & Assessment",
      description:
        "Understanding your regulatory requirements, applications, and compliance needs",
      icon: <Users style={{ color: "#8b6a3f" }} size={24} />,
    },
    {
      step: "2",
      title: "Solution Design",
      description:
        "Customizing instrument configuration and validation approach for your specific needs",
      icon: <Award style={{ color: "#9c7649" }} size={24} />,
    },
    {
      step: "3",
      title: "Installation & Qualification",
      description:
        "Professional IQ/OQ/PQ with complete documentation package and regulatory compliance",
      icon: <Wrench style={{ color: "#8b6a3f" }} size={24} />,
    },
    {
      step: "4",
      title: "Training & Support",
      description:
        "Comprehensive operator training and ongoing technical support for optimal performance",
      icon: <BookOpen style={{ color: "#9c7649" }} size={24} />,
    },
  ];

  const serviceHighlights = [
    {
      title: "NABL Certified Calibration",
      description: "Traceable to national standards with uncertainty analysis",
      icon: <Shield className='text-green-400' size={28} />,
    },
    {
      title: "24/7 Emergency Support",
      description: "Rapid response for critical pharmaceutical operations",
      icon: <Clock className='text-red-300' size={28} />,
    },
    {
      title: "Regulatory Compliance",
      description: "FDA, USP, GMP, and ICH guideline adherence",
      icon: <Award className='text-blue-400' size={28} />,
    },
    {
      title: "Pan-India Coverage",
      description: "Service support across 13+ locations nationwide",
      icon: <Users className='text-purple-400' size={28} />,
    },
  ];

  // Service Philosophy data
  const servicePhilosophy = [
    {
      title: "Reliability",
      description: "We deliver consistent, dependable service so your instruments perform optimally day after day.",
      icon: <Shield size={32} style={{ color: "#059669" }} />,
    },
    {
      title: "Responsiveness", 
      description: "We act quickly to address issues, minimising downtime and ensuring smooth operations.",
      icon: <Zap size={32} style={{ color: "#dc2626" }} />,
    },
    {
      title: "Assurance",
      description: "Our trained experts provide the confidence that your equipment meets the highest quality and compliance standards.",
      icon: <Award size={32} style={{ color: "#2563eb" }} />,
    },
    {
      title: "Empathy",
      description: "We understand the challenges you face and tailor our support to your specific needs.",
      icon: <Heart size={32} style={{ color: "#7c3aed" }} />,
    },
  ];

  // Why Choose Us data
  const whyChooseUs = [
    "Proven expertise in servicing analytical instruments across industries",
    "Fast and responsive customer support team", 
    "Commitment to data security during remote troubleshooting",
    "Focus on building trust through quality service delivery"
  ];

  // Comprehensive Services data
  const comprehensiveServices = [
    { name: "Instrument Installation Services", icon: <Settings size={20} /> },
    { name: "Annual Maintenance Contract (AMC) for Instruments", icon: <Hammer size={20} /> },
    { name: "Instrument Calibration Services", icon: <Target size={20} /> },
    { name: "Breakdown Repair Services", icon: <Wrench size={20} /> },
    { name: "Remote & Online Technical Support", icon: <MessageSquare size={20} /> },
    { name: "Audit Support for Instruments", icon: <FileText size={20} /> },
    { name: "Customer Training Programs", icon: <BookOpen size={20} /> },
    { name: "Genuine Spares Supply", icon: <Package size={20} /> },
  ];

  const handleServiceRequest = (serviceType) => {
    setSelectedService(serviceType);
    setShowServiceForm(true);
  };

  if (showServiceForm) {
    return (
      <div
        className='pt-32 pb-20 min-h-screen'
        style={{
          background:
            "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)",
        }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <ServiceInquiryForm
            selectedService={selectedService}
            onClose={() => setShowServiceForm(false)}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className='bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 min-h-screen'
      style={{
        background:
          "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)",
      }}
    >
      {/* Floating Action Button */}
      <button
        onClick={() => handleServiceRequest("general-inquiry")}
        className='fixed bottom-8 right-8 z-50 text-white px-6 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 transition-all duration-300 flex items-center gap-3 group'
        style={{
          background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
          boxShadow: "0 10px 25px rgba(183, 136, 82, 0.3)",
        }}
        aria-label='Request Service'
      >
        <MessageCircle
          size={24}
          className='group-hover:rotate-12 transition-transform'
        />
        <span className='hidden lg:inline font-semibold'>
          Get Service Quote
        </span>
      </button>

      <div className='pt-32 pb-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Hero Section */}
          <div className='text-center mb-20'>
            <div
              className='inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6'
              style={{
                backgroundColor: "rgba(183, 136, 82, 0.1)",
                color: "#8b6a3f",
              }}
            >
              <Star size={16} />
              28+ Years of Service Excellence
            </div>
            <h1
              className='text-4xl md:text-6xl font-bold mb-6'
              style={{
                background:
                  "linear-gradient(135deg, #8b6a3f 0%, #b78852 50%, #9c7649 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Comprehensive Service Excellence
            </h1>
            <p
              className='text-xl max-w-4xl mx-auto mb-6 leading-relaxed'
              style={{ color: "#8b6a3f" }}
            >
              At <strong>Shreedhar Instruments</strong>, we deliver more than just high-quality analytical instruments — we provide <strong>reliable technical support, maintenance, and calibration services</strong> to ensure your equipment performs at its best.
            </p>
            <p
              className='text-lg max-w-4xl mx-auto mb-10 leading-relaxed'
              style={{ color: "#9c7649" }}
            >
              We aim to provide <strong>end-to-end technical support and post-sales service</strong> that helps our customers achieve operational efficiency and compliance.
            </p>
            <div className='flex flex-col sm:flex-row gap-4 justify-center'>
              <button
                onClick={() => handleServiceRequest("consultation")}
                className='text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
                style={{
                  background:
                    "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
                  boxShadow: "0 4px 15px rgba(183, 136, 82, 0.3)",
                }}
              >
                Schedule Free Consultation
              </button>
              <a
                href='tel:+917096033001'
                className='px-8 py-4 rounded-xl font-semibold hover:bg-white transition-all duration-300 flex items-center gap-2 justify-center'
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  color: "#8b6a3f",
                  border: "1px solid rgba(183, 136, 82, 0.2)",
                }}
              >
                <Phone size={20} />
                Call Now
              </a>
            </div>
          </div>

          {/* Service Philosophy Section */}
          <div className='mb-20'>
            <div className='text-center mb-12'>
              <h2
                className='text-3xl md:text-4xl font-bold mb-4'
                style={{ color: "#8b6a3f" }}
              >
                Our Service Philosophy
              </h2>
              <p className='max-w-3xl mx-auto text-lg' style={{ color: "#9c7649" }}>
                This philosophy is the backbone of our technical support, post-sales service, and maintenance solutions
              </p>
            </div>
            
            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12'>
              {servicePhilosophy.map((item, index) => (
                <div
                  key={index}
                  className='group text-center p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(183, 136, 82, 0.15)",
                  }}
                >
                  <div className='flex justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                    {item.icon}
                  </div>
                  <h3 className='text-xl font-bold mb-4' style={{ color: "#8b6a3f" }}>
                    {item.title}
                  </h3>
                  <p className='text-sm leading-relaxed' style={{ color: "#9c7649" }}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div
              className='text-center p-6 rounded-2xl'
              style={{
                backgroundColor: "rgba(183, 136, 82, 0.1)",
                border: "1px solid rgba(183, 136, 82, 0.2)",
              }}
            >
              <p className='text-lg font-medium' style={{ color: "#8b6a3f" }}>
                We also believe in <strong>customised service solutions</strong> that adapt to your unique requirements, creating a truly personalised service experience.
              </p>
            </div>
          </div>

          {/* Why Choose Us Section */}
          <div className='mb-20'>
            <div
              className='p-8 md:p-12 rounded-3xl shadow-lg'
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(183, 136, 82, 0.15)",
              }}
            >
              <div className='text-center mb-8'>
                <h2
                  className='text-3xl md:text-4xl font-bold mb-4'
                  style={{ color: "#8b6a3f" }}
                >
                  Why Choose Us?
                </h2>
              </div>
              
              <div className='grid md:grid-cols-2 gap-6'>
                {whyChooseUs.map((item, index) => (
                  <div key={index} className='flex items-start gap-4'>
                    <div
                      className='flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1'
                      style={{ backgroundColor: "#059669" }}
                    >
                      <CheckCircle size={16} className='text-white' />
                    </div>
                    <p className='text-lg' style={{ color: "#8b6a3f" }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Service Highlights */}
          <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20'>
            {serviceHighlights.map((highlight, index) => (
              <div key={index} className='group'>
                <div
                  className='p-8 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(183, 136, 82, 0.1)",
                  }}
                >
                  <div className='flex justify-center mb-4 group-hover:scale-110 transition-transform duration-300'>
                    {highlight.icon}
                  </div>
                  <h3
                    className='font-bold mb-3 text-center'
                    style={{ color: "#8b6a3f" }}
                  >
                    {highlight.title}
                  </h3>
                  <p
                    className='text-sm text-center leading-relaxed'
                    style={{ color: "#9c7649" }}
                  >
                    {highlight.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Comprehensive Instrument Services */}
          <div className='mb-20'>
            <div className='text-center mb-12'>
              <h2
                className='text-3xl md:text-4xl font-bold mb-4'
                style={{ color: "#8b6a3f" }}
              >
                Comprehensive Instrument Services
              </h2>
              <p className='max-w-2xl mx-auto text-lg' style={{ color: "#9c7649" }}>
                Our wide range of services covers the full lifecycle of your instruments
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-4'>
              {comprehensiveServices.map((service, index) => (
                <button
                  key={index}
                  onClick={() => handleServiceRequest(service.name.toLowerCase().replace(/\s+/g, '-'))}
                  className='group p-6 rounded-2xl text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1'
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid rgba(183, 136, 82, 0.15)",
                  }}
                >
                  <div className='flex items-center gap-3 mb-3'>
                    <div
                      className='flex-shrink-0 p-2 rounded-lg group-hover:scale-110 transition-transform duration-300'
                      style={{ backgroundColor: "rgba(183, 136, 82, 0.1)" }}
                    >
                      <div style={{ color: "#b78852" }}>
                        {service.icon}
                      </div>
                    </div>
                  </div>
                  <h3 className='font-bold text-sm md:text-base leading-tight' style={{ color: "#8b6a3f" }}>
                    {service.name}
                  </h3>
                  <div className='mt-3 flex items-center gap-2'>
                    <span className='text-xs font-medium' style={{ color: "#b78852" }}>
                      Request Service
                    </span>
                    <ArrowRight size={12} className='group-hover:translate-x-1 transition-transform' style={{ color: "#b78852" }} />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Services Section */}
          <div className='mb-20'>
            <div className='text-center mb-12'>
              <h2
                className='text-3xl md:text-4xl font-bold mb-4'
                style={{ color: "#8b6a3f" }}
              >
                Our Core Services
              </h2>
              <p className='max-w-2xl mx-auto' style={{ color: "#9c7649" }}>
                Comprehensive solutions tailored to meet your analytical
                instrument needs
              </p>
            </div>

            {loading && (
              <div className='text-center py-20'>
                <div
                  className='inline-block animate-spin rounded-full h-12 w-12 border-b-2'
                  style={{ borderColor: "#b78852" }}
                ></div>
                <p className='mt-4' style={{ color: "#8b6a3f" }}>
                  Loading services...
                </p>
              </div>
            )}

            {error && (
              <div className='bg-red-50 border border-red-200 text-red-600 px-6 py-4 rounded-xl text-center'>
                {error}
              </div>
            )}

            <div className='grid lg:grid-cols-2 gap-8'>
              {services.map((service, index) => (
                <div key={service.id} className='group'>
                  <div
                    className='p-8 rounded-3xl shadow-sm hover:shadow-lg transition-all duration-500 hover:-translate-y-1'
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.85)",
                      border: "1px solid rgba(183, 136, 82, 0.15)",
                    }}
                  >
                    <div className='flex items-start gap-6 mb-6'>
                      <div className='flex-shrink-0'>
                        <img
                          src={service.image}
                          alt={service.title}
                          className='w-20 h-20 object-cover rounded-2xl shadow-md group-hover:shadow-lg transition-shadow duration-300'
                        />
                      </div>
                      <div className='flex-1'>
                        <h3
                          className='text-2xl font-bold mb-3 group-hover:opacity-80 transition-opacity'
                          style={{ color: "#8b6a3f" }}
                        >
                          {service.title}
                        </h3>
                        <div
                          className='leading-relaxed prose prose-sm'
                          style={{ color: "#9c7649" }}
                          dangerouslySetInnerHTML={{
                            __html: service.short_description,
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className='prose max-w-none mb-8'
                      style={{ color: "#8b6a3f" }}
                      dangerouslySetInnerHTML={{
                        __html: service.long_description,
                      }}
                    />

                    <div className='flex gap-3'>
                      <button
                        onClick={() => handleServiceRequest(service.slug)}
                        className='flex-1 text-white py-3 px-6 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300'
                        style={{
                          background:
                            "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
                        }}
                      >
                        Request This Service
                      </button>
                      <Link
                        href='/contact'
                        className='font-semibold flex items-center gap-2 px-6 py-3 rounded-xl transition-all duration-300'
                        style={{
                          color: "#8b6a3f",
                          border: "2px solid rgba(183, 136, 82, 0.3)",
                          backgroundColor: "rgba(183, 136, 82, 0.05)",
                        }}
                      >
                        Learn More
                        <ArrowRight
                          size={16}
                          className='group-hover:translate-x-1 transition-transform'
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Support Section */}
          <div className='mb-20'>
            <div
              className='p-10 rounded-3xl shadow-lg relative overflow-hidden'
              style={{
                background:
                  "linear-gradient(135deg, #d4b896 0%, #b78852 50%, #a0784a 100%)",
                color: "white",
              }}
            >
              <div
                className='absolute inset-0'
                style={{ backgroundColor: "rgba(255, 255, 255, 0.1)" }}
              ></div>
              <div className='relative z-10'>
                <div className='text-center mb-8'>
                  <h2 className='text-3xl font-bold mb-4'>
                    Need Emergency Service Support?
                  </h2>
                  <p className='max-w-2xl mx-auto text-lg leading-relaxed opacity-90'>
                    Critical equipment down? Our emergency response team is
                    available 24/7 to minimize downtime and get your operations
                    back on track.
                  </p>
                </div>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <button
                    onClick={() => handleServiceRequest("emergency-support")}
                    className='bg-red-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-red-600 shadow-lg hover:shadow-xl transition-all duration-300'
                  >
                    Emergency Service Request
                  </button>
                  <a
                    href='tel:+917096033001'
                    className='bg-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 justify-center'
                    style={{
                      color: "#8b6a3f",
                      backgroundColor: "rgba(255, 255, 255, 0.95)",
                    }}
                  >
                    <Phone size={20} />
                    Call Emergency: +91 7096033001
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Service Process */}
          <div className='mb-20'>
            <div className='text-center mb-12'>
              <h2
                className='text-3xl md:text-4xl font-bold mb-4'
                style={{ color: "#8b6a3f" }}
              >
                Our Service Process
              </h2>
              <p className='max-w-2xl mx-auto' style={{ color: "#9c7649" }}>
                A streamlined approach to ensure quality service delivery at
                every step
              </p>
            </div>

            <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {serviceProcess.map((item, index) => (
                <div key={index} className='group text-center relative'>
                  {index < serviceProcess.length - 1 && (
                    <div
                      className='hidden lg:block absolute top-8 left-1/2 w-full h-0.5 z-0'
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(183, 136, 82, 0.3) 0%, rgba(183, 136, 82, 0.6) 100%)",
                      }}
                    ></div>
                  )}
                  <div className='relative z-10'>
                    <div
                      className='text-white w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-6 shadow-md group-hover:scale-110 transition-transform duration-300'
                      style={{
                        background:
                          "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
                      }}
                    >
                      {item.step}
                    </div>
                    <div className='mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300'>
                      {item.icon}
                    </div>
                    <h3 className='font-bold mb-3' style={{ color: "#8b6a3f" }}>
                      {item.title}
                    </h3>
                    <p
                      className='text-sm leading-relaxed'
                      style={{ color: "#9c7649" }}
                    >
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continuous Service Improvement Section */}
          <div className='mb-20'>
            <div
              className='p-8 md:p-12 rounded-3xl shadow-lg text-center'
              style={{
                backgroundColor: "rgba(59, 130, 246, 0.05)",
                border: "1px solid rgba(59, 130, 246, 0.2)",
              }}
            >
              <div className='flex justify-center mb-6'>
                <div
                  className='p-4 rounded-full'
                  style={{ backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                >
                  <ThumbsUp size={32} className='text-blue-600' />
                </div>
              </div>
              <h2
                className='text-3xl md:text-4xl font-bold mb-4'
                style={{ color: "#8b6a3f" }}
              >
                Continuous Service Improvement (CSAT)
              </h2>
              <p className='text-lg mb-8 max-w-3xl mx-auto' style={{ color: "#9c7649" }}>
                We actively <strong>seek customer feedback</strong> to enhance our services and maintain our position as a trusted service partner. Every suggestion helps us improve turnaround time, service quality, and customer satisfaction.
              </p>
              <button
                onClick={() => setShowFeedbackForm(true)}
                className='text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
                style={{
                  background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
                }}
              >
                Share Your Feedback
              </button>
            </div>
          </div>

          {/* Call to Action */}
          <div className='text-center'>
            <div
              className='p-12 rounded-3xl shadow-lg'
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(183, 136, 82, 0.2)",
              }}
            >
              <h2
                className='text-3xl font-bold mb-4'
                style={{ color: "#8b6a3f" }}
              >
                Ready to Get Started?
              </h2>
              <p
                className='text-lg mb-8 max-w-2xl mx-auto'
                style={{ color: "#9c7649" }}
              >
                Let's discuss how our services can help optimize your analytical instrument operations
              </p>
              <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                <button
                  onClick={() => handleServiceRequest("consultation")}
                  className='text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300'
                  style={{
                    background:
                      "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
                  }}
                >
                  Schedule Consultation
                </button>
                <Link
                  href='/contact'
                  className='px-8 py-4 rounded-xl font-semibold transition-all duration-300'
                  style={{
                    backgroundColor: "rgba(183, 136, 82, 0.1)",
                    color: "#8b6a3f",
                    border: "1px solid rgba(183, 136, 82, 0.3)",
                  }}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}