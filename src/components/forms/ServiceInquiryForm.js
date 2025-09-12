"use client";
import { useState } from "react";
import axios from "axios"; // Import axios for API calls
import {
  Send,
  User,
  Building,
  Mail,
  Phone,
  Settings,
  CheckCircle,
  Wrench,
} from "lucide-react";

export default function ServiceInquiryForm({ selectedService, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    serviceType: selectedService || "",
    urgency: "",
    instrumentBrand: "",
    instrumentModel: "",
    requirements: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const serviceTypes = [
    { value: "iq-oq-pq", label: "IQ/OQ/PQ Qualification Services" },
    { value: "calibration", label: "Spare Enquiry" },
    { value: "maintenance", label: "Preventive Maintenance" },
    { value: "repair", label: "Breakdown Repair Support" },
    { value: "training", label: "Technical Training Programs" },
    { value: "consultation", label: "Compliance Consultation" },
    { value: "amc", label: "Annual Maintenance Contract" },
    { value: "relocation", label: "Instrument Relocation" },
    { value: "general-inquiry", label: "General Inquiry" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Prepare the payload with only the fields the backend expects
    const payload = {
      name: formData.name,
      title: formData.title,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      service_type: formData.serviceType,
      urgency: formData.urgency,
      instrument_brand: formData.instrumentBrand,
      instrument_model: formData.instrumentModel,
      requirements: formData.requirements,
    };

    try {
      const response = await axios.post(
        "https://sweekarme.in/shree/api/inquiries/service/",
        payload
      );

      if (response.status === 201) {
        setIsSubmitted(true);
        setTimeout(() => {
          onClose && onClose();
        }, 4000);
      }
    } catch (err) {
      setError(
        "An error occurred while submitting your inquiry. Please try again."
      );
      console.error("Submission Error:", err);
    }
  };

  if (isSubmitted) {
    return (
      <div className='bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-2xl mx-auto'>
        <div className='text-center'>
          <CheckCircle className='mx-auto text-green-600 mb-4' size={64} />
          <h3 className='text-2xl font-bold text-gray-900 mb-4'>
            Service Request Received!
          </h3>
          <p className='text-gray-600'>
            Your request has been received. Our technical support team will
            contact you shortly to coordinate the service.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-4xl mx-auto'>
      <div className='mb-6'>
        <h3 className='text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2'>
          <Wrench className='text-amber-600' size={28} />
          Service Request Form
        </h3>
        <p className='text-gray-600'>
          Request technical support, calibration, or maintenance for your
          analytical instruments.
        </p>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Contact Information */}
        <div className='bg-gray-50 p-6 rounded-lg'>
          <h4 className='font-semibold text-gray-900 mb-4'>
            Contact Information
          </h4>
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <User size={16} className='inline mr-2' /> Contact Person *
              </label>
              <input
                type='text'
                name='name'
                onChange={handleInputChange}
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Designation *
              </label>
              <input
                type='text'
                name='title'
                onChange={handleInputChange}
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              />
            </div>
          </div>
          <div className='mt-4'>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <Building size={16} className='inline mr-2' /> Company/Facility *
            </label>
            <input
              type='text'
              name='company'
              onChange={handleInputChange}
              required
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
            />
          </div>
          <div className='grid md:grid-cols-2 gap-6 mt-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Mail size={16} className='inline mr-2' /> Email *
              </label>
              <input
                type='email'
                name='email'
                onChange={handleInputChange}
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                <Phone size={16} className='inline mr-2' /> Phone *
              </label>
              <input
                type='tel'
                name='phone'
                onChange={handleInputChange}
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              />
            </div>
          </div>
        </div>

        {/* Service Details */}
        <div className='bg-blue-50 p-6 rounded-lg'>
          <h4 className='font-semibold text-gray-900 mb-4 flex items-center gap-2'>
            <Settings size={20} className='text-blue-600' /> Service
            Requirements
          </h4>
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Service Type *
              </label>
              <select
                name='serviceType'
                value={formData.serviceType}
                onChange={handleInputChange}
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              >
                <option value=''>Select service type</option>
                {serviceTypes.map((service) => (
                  <option key={service.value} value={service.value}>
                    {service.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Urgency Level *
              </label>
              <select
                name='urgency'
                value={formData.urgency}
                onChange={handleInputChange}
                required
                className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              >
                <option value=''>Select urgency</option>
                <option value='emergency'>Emergency (Production Impact)</option>
                <option value='urgent'>Urgent (Within 24 hours)</option>
                <option value='normal'>Normal (2-3 days)</option>
                <option value='planned'>Planned (1-2 weeks)</option>
              </select>
            </div>
          </div>
          <div className='grid md:grid-cols-2 gap-6 mt-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Instrument Brand
              </label>
              <input
                type='text'
                name='instrumentBrand'
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Model Number
              </label>
              <input
                type='text'
                name='instrumentModel'
                onChange={handleInputChange}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              />
            </div>
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Current Issue / Service Requirements *
          </label>
          <textarea
            rows={4}
            name='requirements'
            onChange={handleInputChange}
            required
            className='w-full px-4 py-3 border border-gray-300 rounded-lg'
          />
        </div>

        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

        <div className='flex gap-4 pt-4 border-t'>
          <button
            type='submit'
            className='flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2'
          >
            <Send size={20} />
            Submit Service Request
          </button>
          {onClose && (
            <button
              type='button'
              onClick={onClose}
              className='px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold'
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
