'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Hero from '../components/sections/Hero';
import PartnersSection from '../components/sections/Partners';
import ProductCard from '../components/common/ProductCard';
import AboutPage from '../components/pages/AboutPage';
import ProductsPage from '../components/pages/ProductsPage';
import ServicesPage from '../components/pages/ServicesPage';
import CareersPage from '../components/pages/CareersPage';
import NewsPage from '../components/pages/NewsPage';
import ContactPage from '../components/pages/ContactPage';
import ProductDetailPage from '../components/pages/ProductDetailPage';
import BlogDetailPage from '../components/pages/BlogDetailPage';
import FaqsPage from '../components/pages/FaqsPage';
import QuotePage from '../components/pages/QuotePage';
import { Eye, Heart, Target, TrendingUp, Users, Award, Shield, CheckCircle, Star } from 'lucide-react';

const StatsSection = () => (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "28+", label: "Years Experience", icon: <Award className="text-brand-gold-dark" size={32} /> },
            { number: "800+", label: "Happy Clients", icon: <Users className="text-green-600" size={32} /> },
            { number: "10,000+", label: "Installations", icon: <CheckCircle className="text-blue-600" size={32} /> },
            { number: "24/7", label: "Support Available", icon: <Shield className="text-purple-600" size={32} /> }
          ].map((stat, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-brand-brown mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
);

const WhyChooseUsSection = () => (
    <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">Why Choose Shreedhar Instruments?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Your most trusted, reliable and ethical partner for analytical instruments in pharmaceutical industry</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center"><Eye className="text-brand-gold mx-auto" size={48} /><h3 className="text-xl font-bold text-brand-brown my-4">Precision & Quality</h3><p className="text-gray-600">We commit to delivering highly accurate and reliable instruments that exceed industry standards.</p></div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center"><Heart className="text-red-500 mx-auto" size={48} /><h3 className="text-xl font-bold text-brand-brown my-4">Integrity</h3><p className="text-gray-600">We uphold the highest ethical standards in every interaction.</p></div>
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center"><Target className="text-blue-600 mx-auto" size={48} /><h3 className="text-xl font-bold text-brand-brown my-4">Customer-Centricity</h3><p className="text-gray-600">We listen to our customers and shape our solutions to meet their needs.</p></div>
        </div>
      </div>
    </section>
);

const FeaturedProductsSection = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products/all/?is_featured=true');
                setFeaturedProducts(response.data.slice(0, 3)); // Show max 3
            } catch (error) {
                console.error("Failed to fetch featured products:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    return (
        <section className="py-20 bg-brand-off-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">Featured Analytical Instruments</h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">Discover our regulatory-compliant instruments trusted by leading pharmaceutical companies</p>
                </div>
                {loading ? (
                    <p className="text-center">Loading featured products...</p>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

const TestimonialsSection = () => {
    const [testimonials, setTestimonials] = useState([]);

    useEffect(() => {
        const fetchTestimonials = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/testimonials/?is_featured=true');
                setTestimonials(response.data);
            } catch (error) {
                console.error("Failed to fetch testimonials:", error);
            }
        };
        fetchTestimonials();
    }, []);

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-brand-brown mb-4">Trusted by Leading Pharma Companies</h2>
                    <p className="text-xl text-gray-600">Our customer-centric approach has earned us loyalty across the industry</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-amber-50 p-6 rounded-2xl border-l-4 border-brand-gold">
                            <div className="flex text-yellow-400 mb-4"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /></div>
                            <p className="text-gray-700 mb-4 italic">"{testimonial.testimonial_text}"</p>
                            <div>
                                <div className="font-semibold text-brand-brown">{testimonial.client_name}</div>
                                <div className="text-sm text-brand-brown-light">{testimonial.company}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const HomePageContent = () => (
  <>
    <Hero />
    <StatsSection />
    <PartnersSection />
    <WhyChooseUsSection />
    <FeaturedProductsSection />
    <TestimonialsSection />
  </>
);

export default function MainApp() {
  return (
    <Router>
      <div className="min-h-screen bg-brand-off-white flex flex-col">
        <Header />
        <main className="flex-grow">
            <Routes>
                <Route path="/" element={<HomePageContent />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/careers" element={<CareersPage />} />
                <Route path="/news" element={<NewsPage />} />
                <Route path="/news/:slug" element={<BlogDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/faqs" element={<FaqsPage />} />
                <Route path="/quote" element={<QuotePage />} />
            </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}