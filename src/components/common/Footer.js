// src/components/common/Footer.js
"use client";

import { useState, useEffect } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Phone,
  Mail,
  MapPin,
  Award,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import SHREELogo from "../../../src/img/shree-logo-new.png";
import { apiService } from "../../lib/api";

export default function Footer({ setCurrentPage, setSelectedProduct }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiService.getAllProducts();
        // Get first 8 products for footer display
        setProducts(response.data.slice(0, 8));
      } catch (error) {
        console.error("Failed to fetch products for footer:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const navigation = [
    { name: "Home", key: "home", path: "/" },
    { name: "About Us", key: "about", path: "/about" },
    { name: "Products", key: "products", path: "/products" },
    { name: "Services", key: "services", path: "/services" },
    { name: "Careers", key: "careers", path: "/careers" },
    { name: "News", key: "news", path: "/news" },
    { name: "Contact", key: "contact", path: "/contact" },
  ];

  const complianceStandards = [
    "21 CFR Part 11",
    "USP <788> Testing",
    "EU GMP Annex 1",
    "ISO 14644 Standards",
  ];

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Quality Policy", path: "/quality" },
    { name: "Sitemap", path: "/sitemap.xml" },
  ];

  const socialLinks = [
    {
      icon: <Facebook size={18} />,
      color: "hover:text-blue-400",
      name: "Facebook",
      url: "https://www.facebook.com/shreedharinstruments",
    },
    {
      icon: <Twitter size={18} />,
      color: "hover:text-sky-400",
      name: "Twitter",
      url: "https://twitter.com/shreedhargroup",
    },
    {
      icon: <Linkedin size={18} />,
      color: "hover:text-blue-400",
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/shreedhar-instruments",
    },
    {
      icon: <Instagram size={18} />,
      color: "hover:text-pink-400",
      name: "Instagram",
      url: "https://www.instagram.com/shreedharinstruments",
    },
  ];

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Top Section: Centered Logo */}
        {/* ✅ Increased bottom padding (pb-12) to give scaled logo space */}
        <div className='flex justify-center pt-8 pb-12 border-b border-gray-800'>
          <Link href="/" aria-label="Go to Homepage">
            <Image
              src={SHREELogo}
              alt='Shreedhar Instruments Logo'
              // ✅ Set a base size for layout spacing
              width={350}
              height={150}
              // ✅ Scale the logo visually without affecting layout
              className='h-35 w-75 scale-150'
              priority
            />
          </Link>
        </div>

        {/* Bottom Section: Main Content */}
        <div className="py-8">
          {/* Main footer content - Compact Grid Layout */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8'>
            
            {/* Company Info - Logo is removed from here */}
            <div className='lg:col-span-2 space-y-4'>
              <p className='text-gray-400 text-sm leading-relaxed max-w-md'>
                Most trusted, reliable and ethical partner for FDA compliant
                analytical instruments in pharmaceutical industry since 1998.
                Serving 800+ customers with 10,000+ installations across India.
              </p>

              {/* Compliance badges in compact format */}
              {/* <div className='space-y-2'>
                <p className='text-xs font-semibold' style={{ color: "#c4955e" }}>
                  Key Certifications:
                </p>
                <div className='flex flex-wrap gap-1'>
                  {complianceStandards?.map((standard, index) => (
                    <span
                      key={index}
                      className='bg-gray-800 text-gray-300 px-2 py-0.5 rounded text-xs'
                    >
                      {standard}
                    </span>
                  ))}
                </div>
              </div> */}

              {/* Contact Info Inline */}
              <div className='grid sm:grid-cols-2 gap-3 text-xs'>
                <div className='space-y-1'>
                  <div className='flex items-start gap-2'>
                    <MapPin className='flex-shrink-0 mt-0.5' style={{ color: "#c4955e" }} size={14} />
                    <div className='text-gray-400'>
                      <p>15, Shreejikrupa Society, Gotri,</p>
                      <p>Vadodara, Gujarat 390023</p>
                    </div>
                  </div>
                </div>
                <div className='space-y-1'>
                  <div className='flex items-center gap-2'>
                    <Phone className='flex-shrink-0' style={{ color: "#c4955e" }} size={14} />
                    <p className='text-gray-400'>(0265) 2323041</p>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Mail className='flex-shrink-0' style={{ color: "#c4955e" }} size={14} />
                    <p className='text-gray-400'>sales@shreedhargroup.com</p>
                  </div>
                </div>
              </div>

              {/* Social Media Inline */}
              <div className='flex items-center gap-3 pt-2'>
                <span className='text-xs font-semibold' style={{ color: "#c4955e" }}>Follow Us:</span>
                <div className='flex gap-2'>
                  {socialLinks?.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.color} transition-colors p-1 hover:bg-gray-800 rounded`}
                      aria-label={`Follow us on ${social.name}`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Links - Compact */}
            <div>
              <h4 className='text-base font-semibold mb-3' style={{ color: "#c4955e" }}>
                Quick Links
              </h4>
              <div className='space-y-1'>
                {navigation.map((item) => (
                  <Link
                    key={item.key}
                    href={item.path}
                    className='block text-gray-400 hover:text-white transition-colors text-xs hover:text-golden-brown-light'
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              
              {/* Awards badge compact */}
             
            </div>

            {/* Products - Dynamic List */}
            <div>
              <h4 className='text-base font-semibold mb-3' style={{ color: "#c4955e" }}>
                Our Products
              </h4>
              <div className='space-y-1'>
                {loading ? (
                  <div className='space-y-1'>
                    {[...Array(6)].map((_, i) => (
                      <div key={i} className='h-4 bg-gray-800 rounded animate-pulse'></div>
                    ))}
                  </div>
                ) : products.length > 0 ? (
                  <>
                    {products.map((product) => (
                      <Link
                        key={product.id}
                        href={`/products/${product.slug}`}
                        className='block text-gray-400 hover:text-white transition-colors text-xs hover:text-golden-brown-light line-clamp-1'
                        title={product.name}
                      >
                        {product.name}
                      </Link>
                    ))}
                    <Link
                      href="/products"
                      className='block text-xs font-medium mt-2 hover:text-white transition-colors'
                      style={{ color: "#c4955e" }}
                    >
                      View All Products →
                    </Link>
                  </>
                ) : (
                  <div className='space-y-1 text-gray-500 text-xs'>
                    <p>Particle Counters</p>
                    <p>Environmental Monitors</p>
                    <p>Analytical Balances</p>
                    <p>Airborne Monitors</p>
                    <p>Cleanroom Systems</p>
                    <Link href="/products" className='block mt-2 hover:text-white transition-colors' style={{ color: "#c4955e" }}>
                      View All Products →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom section - No longer needs a top border */}
          <div className='mt-8'>
            <div className='flex flex-col lg:flex-row justify-between items-center gap-3'>
              {/* Copyright and establishment info */}
              <div className='flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-gray-400 text-xs text-center sm:text-left'>
                <p>&copy; 2025 Shreedhar Instruments. All rights reserved.</p>
                <span className='hidden sm:block text-gray-600'>|</span>
                <p>Established 1998 | 27+ Years of Excellence</p>
              </div>
              
              {/* Legal links */}
              <div className='flex flex-wrap gap-3 lg:gap-4 text-xs justify-center'>
                {legalLinks.map((link, index) => (
                  <Link
                    key={index}
                    href={link.path}
                    className='text-gray-400 hover:text-white transition-colors hover:text-golden-brown-light'
                    target={link.name === "Sitemap" ? "_blank" : "_self"}
                    rel={link.name === "Sitemap" ? "noopener noreferrer" : ""}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Compliance statement - More compact */}
            {/* <div className='mt-3 p-2 bg-gray-800 rounded text-center'>
              <p className='text-gray-400 text-xs'>
                All products meet FDA, USP, EP, and WHO regulatory requirements.
                21 CFR Part 11 compliant systems available for pharmaceutical applications.
              </p>
            </div> */}
          </div>
        </div>
      </div>
      
      {/* Add line-clamp utility */}
      <style jsx>{`
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </footer>
  );
}