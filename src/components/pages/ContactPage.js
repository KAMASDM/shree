'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Phone, Mail, MapPin, Send, Building, Award, CheckCircle, MessageSquare,Clock } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    agreeToPrivacy: false
  });

  const [officeLocations, setOfficeLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOffices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/core/office-locations/');
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
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
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
      source: 'contact_us'
    };
    try {
      const response = await axios.post('http://localhost:8000/api/leads/submit/', payload);
      if (response.status === 201) setIsSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error("Submission Error:", err);
    }
  };

  const headOffice = officeLocations.find(office => office.office_type === 'HO');
  const regionalOffices = officeLocations.filter(office => office.office_type === 'RO');

  const contactReasons = [
    { value: 'product-inquiry', label: 'Product Information' },
    { value: 'service-support', label: 'Service & Technical Support' },
    { value: 'quote-request', label: 'Request Quotation' },
    { value: 'careers', label: 'Career Opportunities' },
    { value: 'other', label: 'Other Inquiry' }
  ];

  if (isSubmitted) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
            <div className="bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md w-full transform">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="text-green-600" size={40} />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h2>
                <p className="text-gray-600 text-lg mb-6">Your message has been received. Our team will get back to you shortly.</p>
                <div className="w-full h-1 bg-amber-200 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-600 rounded-full w-full"></div>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <div className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16 relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-amber-200/20 to-orange-200/20 blur-3xl rounded-full"></div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-6">
              Get Expert Consultation
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Connect with our specialists and discover how we can help transform your business
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-16 mb-20">
            {/* Contact Form */}
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/50 hover:shadow-2xl transition-all duration-300">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="text-white" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Send Your Requirements</h3>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">First Name *</label>
                    <input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 group-hover:border-amber-300"
                      placeholder="John"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Last Name *</label>
                    <input 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 group-hover:border-amber-300"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Company/Organization *</label>
                  <input 
                    type="text" 
                    name="company" 
                    value={formData.company}
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 group-hover:border-amber-300"
                    placeholder="Your Company Name"
                  />
                </div>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Business Email *</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 group-hover:border-amber-300"
                      placeholder="john.doe@company.com"
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleInputChange} 
                      required 
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 group-hover:border-amber-300"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject *</label>
                  <select 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 group-hover:border-amber-300 bg-white"
                  >
                    <option value="">Select Subject</option>
                    {contactReasons.map(reason => (
                      <option key={reason.value} value={reason.label}>{reason.label}</option>
                    ))}
                  </select>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Message *</label>
                  <textarea 
                    rows={5} 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange} 
                    required 
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 group-hover:border-amber-300 resize-none"
                    placeholder="Tell us about your requirements..."
                  />
                </div>
                
                <div className="flex items-start gap-3 p-4 bg-amber-50/50 rounded-xl border border-amber-200/50">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    name="agreeToPrivacy" 
                    checked={formData.agreeToPrivacy}
                    onChange={handleInputChange} 
                    required 
                    className="rounded mt-1 text-amber-600 focus:ring-amber-500" 
                  />
                  <label htmlFor="privacy" className="text-sm text-gray-700 font-medium">
                    I agree to the privacy policy and consent to be contacted. *
                  </label>
                </div>
                
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm font-medium text-center">{error}</p>
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-amber-600 hover:to-orange-600 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <Send size={20} className="inline mr-2" />
                  Send Requirements
                </button>
              </form>
            </div>

            {/* Head Office Info */}
            <div className="space-y-8">
              {headOffice && (
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6">
                    <div className="flex items-center gap-3 text-white">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <Building size={24} />
                      </div>
                      <h2 className="text-2xl font-bold">Head Office</h2>
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="font-bold text-xl text-gray-900 mb-3">{headOffice.name}</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <MapPin className="text-amber-600 mt-1 flex-shrink-0" size={20} />
                        <p className="text-gray-700">{headOffice.address}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="text-amber-600 flex-shrink-0" size={20} />
                        <p className="text-gray-900 font-semibold">{headOffice.contact_number}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Contact Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Clock className="text-white" size={24} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">24/7 Support</h4>
                  <p className="text-sm text-gray-600">Round the clock assistance</p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Award className="text-white" size={24} />
                  </div>
                  <h4 className="font-bold text-gray-900 mb-1">Expert Team</h4>
                  <p className="text-sm text-gray-600">Industry professionals</p>
                </div>
              </div>
            </div>
          </div>

          {/* Regional Offices */}
          <div className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent mb-4">
                Regional Offices & Service Centers
              </h2>
              <p className="text-gray-600 text-lg">Our nationwide network ensures local support everywhere</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regionalOffices.map((office) => (
                <div 
                  key={office.id} 
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-white/50 hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                      <MapPin className="text-white" size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">{office.name}</h4>
                      <p className="text-gray-600 text-sm leading-relaxed">{office.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}