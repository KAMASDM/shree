'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Send, User, Building, Mail, Phone, ShoppingCart, Wrench, CheckCircle } from 'lucide-react';

export default function QuotePage() {
  const [quoteType, setQuoteType] = useState('product');
  const [products, setProducts] = useState([]);
  const [services, setServices] = useState([]);
  
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    selectedItem: '',
    quantity: '1',
    message: ''
  });
  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, serviceRes] = await Promise.all([
          axios.get('http://localhost:8000/api/products/all/'),
          axios.get('http://localhost:8000/api/services/')
        ]);
        setProducts(productRes.data);
        setServices(serviceRes.data);
      } catch (err) {
        console.error("Failed to fetch data for quote form", err);
        setError("Could not load products and services list.");
      }
    };
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuoteTypeChange = (type) => {
    setQuoteType(type);
    setFormData(prev => ({ ...prev, selectedItem: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    let endpoint = '';
    let payload = {};

    if (quoteType === 'product') {
      endpoint = 'http://localhost:8000/api/inquiries/product/';
      payload = {
        name: formData.name,
        title: "Quote Inquiry", // Defaulting a title as the model requires it
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        product_name: formData.selectedItem,
        inquiry_type: 'price-quote',
        quantity: formData.quantity,
        specific_requirements: formData.message
      };
    } else { // Service Inquiry
      endpoint = 'http://localhost:8000/api/inquiries/service/';
      payload = {
        name: formData.name,
        title: "Quote Inquiry",
        company: formData.company,
        email: formData.email,
        phone: formData.phone,
        service_type: formData.selectedItem,
        urgency: 'normal', // Defaulting urgency
        requirements: formData.message
      };
    }

    try {
      const response = await axios.post(endpoint, payload);
      if (response.status === 201) {
        setIsSubmitted(true);
      }
    } catch (err) {
      setError('An error occurred. Please ensure all required fields are filled and try again.');
      console.error("Submission Error:", err.response ? err.response.data : err);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className="pt-32 pb-20">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
          <div className="text-center">
            <CheckCircle className="mx-auto text-green-600 mb-4" size={64} />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h3>
            <p className="text-gray-600">Your quote request for <strong>{formData.selectedItem}</strong> has been received. Our experts will contact you shortly.</p>
          </div>
        </div>
      </div>
    );
  }

  const itemList = quoteType === 'product' ? products : services;

  return (
    <div className="pt-32 pb-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-200">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Request a Quote</h1>
            <p className="text-lg text-gray-600">Let us know what you're interested in, and we'll get back to you with a detailed quote.</p>
          </div>

          <div className="flex justify-center border border-gray-200 rounded-full p-1 mb-8 bg-gray-100">
            <button
              onClick={() => handleQuoteTypeChange('product')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-lg font-semibold transition-all ${quoteType === 'product' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-600'}`}>
              <ShoppingCart size={20} /> Product Quote
            </button>
            <button
              onClick={() => handleQuoteTypeChange('service')}
              className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full text-lg font-semibold transition-all ${quoteType === 'service' ? 'bg-amber-600 text-white shadow-md' : 'text-gray-600'}`}>
              <Wrench size={20} /> Service Quote
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><User size={16} className="inline mr-2" /> Full Name *</label>
                <input type="text" name="name" onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2"><Building size={16} className="inline mr-2" /> Company/Organization *</label>
                <input type="text" name="company" onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>
              </div>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><Mail size={16} className="inline mr-2" /> Business Email *</label>
                    <input type="email" name="email" onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2"><Phone size={16} className="inline mr-2" /> Phone Number *</label>
                    <input type="tel" name="phone" onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg"/>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select {quoteType === 'product' ? 'Product' : 'Service'} *</label>
                <select name="selectedItem" value={formData.selectedItem} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg">
                <option value="">Choose an option...</option>
                {itemList.map(item => <option key={item.id} value={item.name || item.title}>{item.name || item.title}</option>)}
                </select>
            </div>
             {quoteType === 'product' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Quantity
                </label>
                <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} min="1" className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
            )}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Message</label>
                <textarea rows={4} name="message" onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg"></textarea>
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button type="submit" className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2">
              <Send size={20} />
              Submit Quote Request
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}