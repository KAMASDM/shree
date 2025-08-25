"use client";
import { useState } from "react";
import { Send, CheckCircle, MessageSquare } from "lucide-react";
import { apiService } from "../../lib/api";

export default function FeedbackForm({ onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    phone: "",
    subject: "Service Feedback", // Default subject
    message: "",
    agreeToPrivacy: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

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
    setIsSubmitting(true);
    
    if (!formData.agreeToPrivacy) {
      setError("You must agree to the privacy policy.");
      setIsSubmitting(false);
      return;
    }

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.message) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    const payload = {
      name: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
      company: formData.company.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      message: `Subject: ${formData.subject}\n\nFeedback: ${formData.message.trim()}`,
      source: "contact_us", // Changed from "feedback_form" to "website" which is likely a valid choice
      related_product: null
    };

    console.log("Submitting payload:", payload); // Debug log

    try {
      const response = await apiService.submitLead(payload);
      console.log("Submission successful:", response); // Debug log
      setIsSubmitted(true);
    } catch (err) {
      console.error("Submission Error:", err);
      
      // More detailed error handling
      if (err.response && err.response.data) {
        const errorData = err.response.data;
        if (typeof errorData === 'object') {
          // Extract specific field errors
          const errorMessages = Object.entries(errorData)
            .map(([field, messages]) => `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`)
            .join('\n');
          setError(`Validation errors:\n${errorMessages}`);
        } else {
          setError("An error occurred. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div
        className='bg-white p-12 rounded-3xl shadow-2xl text-center max-w-md w-full transform'
        style={{ border: "1px solid rgba(183, 136, 82, 0.2)" }}
      >
        <div className='w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6'>
          <CheckCircle className='text-green-600' size={40} />
        </div>
        <h2 className='text-3xl font-bold text-gray-900 mb-4'>Thank You!</h2>
        <p className='text-gray-600 text-lg mb-6'>
          Your feedback has been received. We appreciate you taking the time to help us improve.
        </p>
        <button
          onClick={onClose}
          className="mt-4 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300"
          style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div
      className='p-8 rounded-3xl shadow-xl transition-all duration-300 bg-white'
      style={{
        border: "1px solid rgba(183, 136, 82, 0.15)",
      }}
    >
      <div className='flex items-center gap-3 mb-8'>
        <div
          className='w-12 h-12 rounded-xl flex items-center justify-center'
          style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}
        >
          <MessageSquare className='text-white' size={24} />
        </div>
        <h3 className='text-2xl font-bold' style={{ color: "#8b6a3f" }}>
          Share Your Feedback
        </h3>
      </div>

      <form onSubmit={handleSubmit} className='space-y-6'>
        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-semibold mb-2' style={{ color: "#9c7649" }}>
              First Name *
            </label>
            <input
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='John'
              style={{ borderColor: "rgba(183, 136, 82, 0.3)" }}
            />
          </div>
          <div>
            <label className='block text-sm font-semibold mb-2' style={{ color: "#9c7649" }}>
              Last Name *
            </label>
            <input
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Doe'
              style={{ borderColor: "rgba(183, 136, 82, 0.3)" }}
            />
          </div>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          <div>
            <label className='block text-sm font-semibold mb-2' style={{ color: "#9c7649" }}>
              Email *
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              required
              className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='john.doe@company.com'
              style={{ borderColor: "rgba(183, 136, 82, 0.3)" }}
            />
          </div>
          <div>
            <label className='block text-sm font-semibold mb-2' style={{ color: "#9c7649" }}>
              Phone
            </label>
            <input
              type='tel'
              name='phone'
              value={formData.phone}
              onChange={handleInputChange}
              className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='+91 98765 43210'
              style={{ borderColor: "rgba(183, 136, 82, 0.3)" }}
            />
          </div>
        </div>

        <div>
          <label className='block text-sm font-semibold mb-2' style={{ color: "#9c7649" }}>
            Company
          </label>
          <input
            type='text'
            name='company'
            value={formData.company}
            onChange={handleInputChange}
            className='w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Your Company Name'
            style={{ borderColor: "rgba(183, 136, 82, 0.3)" }}
          />
        </div>

        <div>
          <label className='block text-sm font-semibold mb-2' style={{ color: "#9c7649" }}>
            Feedback / Message *
          </label>
          <textarea
            rows={5}
            name='message'
            value={formData.message}
            onChange={handleInputChange}
            required
            className='w-full px-4 py-3 border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Tell us about your experience or suggestions...'
            style={{ borderColor: "rgba(183, 136, 82, 0.3)" }}
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
            id='privacy-feedback'
            name='agreeToPrivacy'
            checked={formData.agreeToPrivacy}
            onChange={handleInputChange}
            required
            className='rounded mt-1 text-amber-600 focus:ring-amber-500'
            style={{ color: "#b78852" }}
          />
          <label htmlFor='privacy-feedback' className='text-sm font-medium' style={{ color: "#9c7649" }}>
            I agree to the privacy policy and consent to be contacted regarding my feedback. *
          </label>
        </div>

        {error && (
          <div className='p-3 bg-red-50 border border-red-200 rounded-xl'>
            <p className='text-red-600 text-sm font-medium text-center whitespace-pre-line'>
              {error}
            </p>
          </div>
        )}
        
        <div className="flex gap-4">
          <button
            type='submit'
            disabled={isSubmitting}
            className='flex-1 text-white py-3 rounded-xl text-lg font-semibold transform hover:scale-105 transition-all duration-200 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100'
            style={{ background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" }}
          >
            {isSubmitting ? (
              <>
                <div className="inline-block animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send size={20} className='inline mr-2' />
                Submit Feedback
              </>
            )}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}