// src/components/common/Footer.js
"use client";

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
import SHREELogo from "../../../src/img/SHREE-LOGO.webp"; // Import the new logo


export default function Footer({ setCurrentPage, setSelectedProduct }) {
  const navigation = [
    { name: "Home", key: "home", path: "/" },
    { name: "About Us", key: "about", path: "/about" },
    { name: "Products", key: "products", path: "/products" },
    { name: "Services", key: "services", path: "/services" },
    { name: "Careers", key: "careers", path: "/careers" },
    { name: "News", key: "news", path: "/news" },
    { name: "Contact", key: "contact", path: "/contact" },
  ];

  const productCategories = [
    { name: "Particle Counters", path: "/products" },
    { name: "Environmental Monitors", path: "/products" },
    { name: "Analytical Balances", path: "/products" },
    { name: "Airborne Monitors", path: "/products" },
    { name: "Cleanroom Systems", path: "/products" },
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
    { name: "Sitemap", path: "/sitemap.xml" }, // Fixed sitemap link
  ];

  return (
    <footer className='bg-gray-900 text-white'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
        {/* Main footer content */}
        <div className='grid md:grid-cols-5 gap-8'>
          {/* Company Info */}
          <div className='md:col-span-2 space-y-4'>
            <div className='flex items-center gap-3'>
              <Image
                src={SHREELogo}
                alt='Shreedhar Instruments'
                width={200}
                height={48}
                className='h-22 w-65'
                priority
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.style.display = 'none';
                }}
              />
            </div>
            <p className='text-gray-400 leading-relaxed max-w-md'>
              Most trusted, reliable and ethical partner for FDA compliant
              analytical instruments in pharmaceutical industry since 1998.
              Serving 800+ customers with 10,000+ installations across India.
            </p>

            {/* Key certifications */}
            <div className='space-y-2'>
              <p className='text-sm font-semibold' style={{ color: "#c4955e" }}>
                Key Certifications:
              </p>
              <div className='flex flex-wrap gap-2'>
                {complianceStandards?.map((standard, index) => (
                  <span
                    key={index}
                    className='bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs'
                  >
                    {standard}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className='flex gap-4 pt-4'>
              {[
                {
                  icon: <Facebook size={20} />,
                  color: "hover:text-blue-400",
                  name: "Facebook",
                  url: "https://www.facebook.com/shreedharinstruments"
                },
                {
                  icon: <Twitter size={20} />,
                  color: "hover:text-sky-400",
                  name: "Twitter",
                  url: "https://twitter.com/shreedhargroup"
                },
                {
                  icon: <Linkedin size={20} />,
                  color: "hover:text-blue-400",
                  name: "LinkedIn",
                  url: "https://www.linkedin.com/company/shreedhar-instruments"
                },
                {
                  icon: <Instagram size={20} />,
                  color: "hover:text-pink-400",
                  name: "Instagram", 
                  url: "https://www.instagram.com/shreedharinstruments"
                },
              ]?.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition-colors p-2 hover:bg-gray-800 rounded`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className='text-lg font-semibold mb-4'
              style={{ color: "#c4955e" }}
            >
              Quick Links
            </h4>
            <div className='space-y-2'>
              {navigation.map((item) => (
                <Link
                  key={item.key}
                  href={item.path}
                  className='block text-gray-400 hover:text-white transition-colors text-sm hover:text-golden-brown-light'
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <h4
              className='text-lg font-semibold mb-4'
              style={{ color: "#c4955e" }}
            >
              Products
            </h4>
            <div className='space-y-2'>
              {productCategories.map((category, index) => (
                <Link
                  key={index}
                  href={category.path}
                  className='block text-gray-400 hover:text-white transition-colors text-sm hover:text-golden-brown-light'
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4
              className='text-lg font-semibold mb-4'
              style={{ color: "#c4955e" }}
            >
              Head Office
            </h4>
            <div className='space-y-3 text-sm'>
              <div className='flex items-start gap-2'>
                <MapPin
                  className='flex-shrink-0 mt-0.5'
                  style={{ color: "#c4955e" }}
                  size={16}
                />
                <div className='text-gray-400'>
                  <p>15, Shreejikrupa Society</p>
                  <p>Vadodara, Gujarat 390023</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Phone
                  className='flex-shrink-0'
                  style={{ color: "#c4955e" }}
                  size={16}
                />
                <div className='text-gray-400'>
                  <p>(0265) 2313041</p>
                  <p>+91 7096033001</p>
                </div>
              </div>
              <div className='flex items-center gap-2'>
                <Mail
                  className='flex-shrink-0'
                  style={{ color: "#c4955e" }}
                  size={16}
                />
                <div className='text-gray-400'>
                  
                  <p>sales@shreedhargroup.com</p>
                </div>
              </div>
            </div>

            {/* Awards badge */}
            <div className='mt-4 p-3 bg-gray-800 rounded-lg'>
              <div className='flex items-center gap-2 mb-1'>
                <Award style={{ color: "#c4955e" }} size={16} />
                <span
                  className='font-semibold text-sm'
                  style={{ color: "#c4955e" }}
                >
                  Latest Award
                </span>
              </div>
              <p className='text-gray-300 text-xs'>Circle of Excellence 2024</p>
              <p className='text-gray-400 text-xs'>Beckman Coulter</p>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className='border-t border-gray-800 mt-12 pt-8'>
          <div className='flex flex-col md:flex-row justify-between items-center text-gray-400'>
            <div className='flex items-center gap-4 text-sm'>
              <p>&copy; 2025 Shreedhar Instruments. All rights reserved.</p>
              <span className='hidden md:block'>|</span>
              <p className='hidden md:block'>
                Established 1998 | 28+ Years of Excellence
              </p>
            </div>
            <div className='flex flex-wrap gap-4 md:gap-6 mt-4 md:mt-0 text-sm justify-center'>
              {legalLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.path}
                  className='hover:text-white transition-colors hover:text-golden-brown-light'
                  target={link.name === "Sitemap" ? "_blank" : "_self"}
                  rel={link.name === "Sitemap" ? "noopener noreferrer" : ""}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Compliance statement */}
          <div className='mt-4 p-3 bg-gray-800 rounded-lg text-center'>
            <p className='text-gray-400 text-xs'>
              All products meet FDA, USP, EP, and WHO regulatory requirements.
              21 CFR Part 11 compliant systems available for pharmaceutical
              applications.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}