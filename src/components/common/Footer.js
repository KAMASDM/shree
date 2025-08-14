import { Facebook, Twitter, Linkedin, Instagram, Phone, Mail, MapPin, Award } from 'lucide-react';

export default function Footer({ setCurrentPage, setSelectedProduct }) {
  const navigation = [
    { name: 'Home', key: 'home' },
    { name: 'About Us', key: 'about' },
    { name: 'Products', key: 'products' },
    { name: 'Services', key: 'services' },
    { name: 'Careers', key: 'careers' },
    { name: 'News', key: 'news' },
    { name: 'Contact', key: 'contact' }
  ];

  const productCategories = [
    "Particle Counters",
    "Environmental Monitors", 
    "Analytical Balances",
    "Airborne Monitors",
    "Cleanroom Systems"
  ];

  const complianceStandards = [
    "21 CFR Part 11",
    "USP <788> Testing",
    "EU GMP Annex 1", 
    "ISO 14644 Standards"
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid md:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img 
                src="https://shreedhargroup.com/wp-content/uploads/2014/12/logo02.png" 
                alt="Shreedhar Instruments"
                className="h-12 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 leading-relaxed max-w-md">
              Most trusted, reliable and ethical partner for FDA compliant analytical instruments in pharmaceutical industry since 1998. Serving 800+ customers with 10,000+ installations across India.
            </p>
            
            {/* Key certifications */}
            <div className="space-y-2">
              <p className="text-sm font-semibold" style={{color: '#c4955e'}}>Key Certifications:</p>
              <div className="flex flex-wrap gap-2">
                {complianceStandards.map((standard, index) => (
                  <span key={index} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                    {standard}
                  </span>
                ))}
              </div>
            </div>
            
            {/* Social Media */}
            <div className="flex gap-4 pt-4">
              {[
                { icon: <Facebook size={20} />, color: "hover:text-blue-400", name: "Facebook" },
                { icon: <Twitter size={20} />, color: "hover:text-sky-400", name: "Twitter" },
                { icon: <Linkedin size={20} />, color: "hover:text-blue-400", name: "LinkedIn" },
                { icon: <Instagram size={20} />, color: "hover:text-pink-400", name: "Instagram" }
              ].map((social, index) => (
                <button 
                  key={index}
                  className={`text-gray-400 ${social.color} transition-colors p-2 hover:bg-gray-800 rounded`}
                  aria-label={`Follow us on ${social.name}`}
                >
                  {social.icon}
                </button>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{color: '#c4955e'}}>Quick Links</h4>
            <div className="space-y-2">
              {navigation.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    setCurrentPage(item.key);
                    setSelectedProduct && setSelectedProduct(null);
                  }}
                  className="block text-gray-400 hover:text-white transition-colors text-sm hover:text-golden-brown-light"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
          
          {/* Products */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{color: '#c4955e'}}>Products</h4>
            <div className="space-y-2">
              {productCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentPage('products')}
                  className="block text-gray-400 hover:text-white transition-colors text-sm hover:text-golden-brown-light"
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{color: '#c4955e'}}>Head Office</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="flex-shrink-0 mt-0.5" style={{color: '#c4955e'}} size={16} />
                <div className="text-gray-400">
                  <p>15, Shreejikrupa Society</p>
                  <p>Vadodara, Gujarat 390023</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="flex-shrink-0" style={{color: '#c4955e'}} size={16} />
                <div className="text-gray-400">
                  <p>(0265) 2313041</p>
                  <p>+91 7096033001</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="flex-shrink-0" style={{color: '#c4955e'}} size={16} />
                <div className="text-gray-400">
                  <p>info@shreedhargroup.com</p>
                  <p>sales@shreedhargroup.com</p>
                </div>
              </div>
            </div>

            {/* Awards badge */}
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Award style={{color: '#c4955e'}} size={16} />
                <span className="font-semibold text-sm" style={{color: '#c4955e'}}>Latest Award</span>
              </div>
              <p className="text-gray-300 text-xs">Circle of Excellence 2024</p>
              <p className="text-gray-400 text-xs">Beckman Coulter</p>
            </div>
          </div>
        </div>
        
        {/* Bottom section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <div className="flex items-center gap-4 text-sm">
              <p>&copy; 2025 Shreedhar Instruments. All rights reserved.</p>
              <span className="hidden md:block">|</span>
              <p className="hidden md:block">Established 1998 | 28+ Years of Excellence</p>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0 text-sm">
              <button className="hover:text-white transition-colors hover:text-golden-brown-light">Privacy Policy</button>
              <button className="hover:text-white transition-colors hover:text-golden-brown-light">Terms of Service</button>
              <button className="hover:text-white transition-colors hover:text-golden-brown-light">Quality Policy</button>
              <button className="hover:text-white transition-colors hover:text-golden-brown-light">Sitemap</button>
            </div>
          </div>
          
          {/* Compliance statement */}
          <div className="mt-4 p-3 bg-gray-800 rounded-lg text-center">
            <p className="text-gray-400 text-xs">
              All products meet FDA, USP, EP, and WHO regulatory requirements. 
              21 CFR Part 11 compliant systems available for pharmaceutical applications.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
