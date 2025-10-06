"use client";
import { useState } from "react";
import { apiService } from "../../lib/api";
import {
  Send,
  User,
  Building,
  Mail,
  Phone,
  MessageSquare,
  CheckCircle,
} from "lucide-react";

export default function ProductInquiryForm({ product, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    inquiryType: "",
    quantity: "1",
    timeframe: "",
    specificRequirements: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // FIX: Create a payload with only the fields the backend expects.
    const payload = {
      name: formData.name,
      title: formData.title,
      company: formData.company,
      email: formData.email,
      phone: formData.phone,
      product_name: product.name, // Add the product name
      inquiry_type: formData.inquiryType,
      quantity: formData.quantity,
      timeframe: formData.timeframe,
      specific_requirements: formData.specificRequirements,
    };

    try {
      console.log('📤 Submitting product inquiry via API service...');
      const response = await apiService.submitProductInquiry(payload);
      console.log('✅ Product inquiry submitted successfully:', response);

      setIsSubmitted(true);
      setTimeout(() => {
        onClose && onClose();
      }, 4000);
    } catch (err) {
      setError("An error occurred. Please check the form and try again.");
      console.error("💥 Product inquiry submission error:", err);
    }
  };

  if (isSubmitted) {
    return (
      <div className='bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-2xl mx-auto'>
        <div className='text-center'>
          <CheckCircle className='mx-auto text-green-600 mb-4' size={64} />
          <h3 className='text-2xl font-bold text-gray-900 mb-4'>Thank You!</h3>
          <p className='text-gray-600 mb-6'>
            Your inquiry for <strong>{product.name}</strong> has been received.
            Our experts will contact you within 24 hours.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-white p-8 rounded-2xl shadow-xl border border-gray-200 max-w-4xl mx-auto'>
      <div className='mb-6'>
        <h3 className='text-2xl font-bold text-gray-900 mb-2'>
          Product Inquiry
        </h3>
        <div className='flex items-center gap-3 text-amber-600'>
          <img
            src={product.main_image}
            alt={product.name}
            className='w-12 h-12 object-cover rounded-lg'
          />
          <div>
            <p className='font-semibold'>{product.name}</p>
            <p className='text-sm text-gray-600'>{product.category_name}</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <User size={16} className='inline mr-2' /> Full Name *
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Job Title *
            </label>
            <input
              type='text'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              required
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            <Building size={16} className='inline mr-2' /> Company/Organization
            *
          </label>
          <input
            type='text'
            name='company'
            value={formData.company}
            onChange={handleInputChange}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg'
            required
          />
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <Mail size={16} className='inline mr-2' /> Business Email *
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              required
            />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              <Phone size={16} className='inline mr-2' /> Phone Number *
            </label>
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              required
            />
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Inquiry Type *
            </label>
            <select
              name='inquiryType'
              value={formData.inquiryType}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              required
            >
              <option value=''>Select inquiry type</option>
              <option value='price-quote'>Price Quotation</option>
              <option value='technical-specs'>Technical Specifications</option>
              <option value='demo-request'>Product Demonstration</option>
            </select>
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Estimated Quantity
            </label>
            <input
              type='number'
              name='quantity'
              value={formData.quantity}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg'
              min='1'
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            <MessageSquare size={16} className='inline mr-2' /> Specific
            Requirements & Applications
          </label>
          <textarea
            rows={4}
            name='specificRequirements'
            value={formData.specificRequirements}
            onChange={handleInputChange}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg'
            placeholder='Please describe your specific application, compliance needs, etc...'
          ></textarea>
        </div>

        {error && <p className='text-red-500 text-sm text-center'>{error}</p>}

        <div className='flex gap-4 pt-4 border-t'>
          <button
            type='submit'
            className='flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2'
          >
            <Send size={20} />
            Send Inquiry
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
