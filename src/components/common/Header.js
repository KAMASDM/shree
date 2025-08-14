'use client';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ChevronDown, Building, Briefcase, Newspaper, HelpCircle } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();

  const mainNav = [
    { name: 'Home', path: '/' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
  ];

  const companyLinks = [
    { name: 'About Us', path: '/about', icon: <Building size={16} /> },
    { name: 'Careers', path: '/careers', icon: <Briefcase size={16} /> },
    { name: 'News', path: '/news', icon: <Newspaper size={16} /> },
    { name: 'FAQs', path: '/faqs', icon: <HelpCircle size={16} /> },
  ];

  const contactNav = { name: 'Contact', path: '/contact' };

  const handleDropdownMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleDropdownMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  return (
    <header 
      className="fixed top-0 w-full z-50 border-b transition-all duration-300"
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(-20px)',
        WebkitBackdropFilter: 'blur(-20px)',
        borderColor: 'rgba(183, 136, 82, 0.1)',
        boxShadow: '0 1px 30px rgba(183, 136, 82, 0.1)'
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link 
              to="/"
              className="hover:scale-105 transition-transform duration-300"
            >
              <img 
                src="https://shreedhargroup.com/wp-content/uploads/2014/12/logo02.png" 
                alt="Shreedhar Instruments"
                className="h-16 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {mainNav.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative ${
                    location.pathname === item.path
                      ? 'border-b-2'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    color: location.pathname === item.path ? '#b78852' : '#4a4a4a',
                    borderColor: location.pathname === item.path ? '#b78852' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.path) {
                      e.target.style.color = '#b78852';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.path) {
                      e.target.style.color = '#4a4a4a';
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Company Dropdown - Fixed version */}
              <div 
                className="relative"
                onMouseEnter={handleDropdownMouseEnter}
                onMouseLeave={handleDropdownMouseLeave}
              >
                <button
                  className={`px-3 py-2 text-sm font-medium transition-all duration-300 flex items-center gap-1 relative ${
                    companyLinks.some(l => location.pathname.startsWith(l.path))
                      ? 'border-b-2'
                      : 'hover:scale-105'
                  }`}
                  style={{
                    color: companyLinks.some(l => location.pathname.startsWith(l.path)) ? '#b78852' : '#4a4a4a',
                    borderColor: companyLinks.some(l => location.pathname.startsWith(l.path)) ? '#b78852' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (!companyLinks.some(l => location.pathname.startsWith(l.path))) {
                      e.target.style.color = '#b78852';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!companyLinks.some(l => location.pathname.startsWith(l.path))) {
                      e.target.style.color = '#4a4a4a';
                    }
                  }}
                >
                  Company
                  <ChevronDown 
                    size={16} 
                    className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                
                {/* Dropdown Menu - Fixed positioning and glass effect */}
                <div 
                  className={`absolute top-full left-0 mt-1 w-48 py-2 z-20 transition-all duration-300 transform ${
                    isDropdownOpen 
                      ? 'opacity-100 translate-y-0 pointer-events-auto' 
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    borderRadius: '12px',
                    border: '1px solid rgba(183, 136, 82, 0.15)',
                    boxShadow: '0 10px 40px rgba(183, 136, 82, 0.15)'
                  }}
                >
                  {companyLinks.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setIsDropdownOpen(false)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm transition-all duration-200 hover:scale-105"
                      style={{
                        color: location.pathname === item.path ? '#b78852' : '#4a4a4a'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.backgroundColor = 'rgba(183, 136, 82, 0.08)';
                        e.target.style.color = '#b78852';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.backgroundColor = 'transparent';
                        if (location.pathname !== item.path) {
                          e.target.style.color = '#4a4a4a';
                        }
                      }}
                    >
                      <span style={{color: '#9c7649'}}>{item.icon}</span>
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              
              <Link
                to={contactNav.path}
                className={`px-3 py-2 text-sm font-medium transition-all duration-300 relative ${
                  location.pathname === contactNav.path
                    ? 'border-b-2'
                    : 'hover:scale-105'
                }`}
                style={{
                  color: location.pathname === contactNav.path ? '#b78852' : '#4a4a4a',
                  borderColor: location.pathname === contactNav.path ? '#b78852' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== contactNav.path) {
                    e.target.style.color = '#b78852';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== contactNav.path) {
                    e.target.style.color = '#4a4a4a';
                  }
                }}
              >
                {contactNav.name}
              </Link>
            </div>
          </div>

          {/* CTA Section */}
          <div className="hidden lg:flex items-center gap-4">
            <a 
              href="tel:+917096033001"
              className="flex items-center gap-2 font-medium transition-all duration-300 hover:scale-105"
              style={{color: '#b78852'}}
              onMouseEnter={(e) => {
                e.target.style.color = '#8b6a3f';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#b78852';
              }}
            >
              <Phone size={16} />
              <span className="text-sm">+91 7096033001</span>
            </a>
            <Link 
              to="/quote"
              className="text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #b78852 0%, #c9955f 100%)'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #a0784a 0%, #b78852 100%)';
                e.target.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'linear-gradient(135deg, #b78852 0%, #c9955f 100%)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              Get Quote
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md transition-all duration-300"
              style={{color: '#4a4a4a'}}
              onMouseEnter={(e) => {
                e.target.style.color = '#b78852';
                e.target.style.backgroundColor = 'rgba(183, 136, 82, 0.08)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = '#4a4a4a';
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div 
            className="lg:hidden border-t mt-4 pt-4 pb-6"
            style={{
              borderColor: 'rgba(183, 136, 82, 0.1)',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              margin: '-1rem',
              marginTop: '1rem',
              padding: '1rem',
              borderRadius: '0 0 12px 12px'
            }}
          >
            <div className="space-y-2">
              {mainNav.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block w-full text-left px-3 py-2 text-base font-medium rounded-lg transition-all duration-300 ${
                    location.pathname === item.path ? 'font-semibold' : ''
                  }`}
                  style={{
                    color: location.pathname === item.path ? '#b78852' : '#4a4a4a',
                    backgroundColor: location.pathname === item.path ? 'rgba(183, 136, 82, 0.08)' : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (location.pathname !== item.path) {
                      e.target.style.backgroundColor = 'rgba(183, 136, 82, 0.05)';
                      e.target.style.color = '#b78852';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (location.pathname !== item.path) {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = '#4a4a4a';
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
              
              {/* Company links in mobile */}
              <div className="border-t pt-2 mt-2" style={{borderColor: 'rgba(183, 136, 82, 0.1)'}}>
                <div className="px-3 py-2 text-sm font-semibold" style={{color: '#9c7649'}}>
                  Company
                </div>
                {companyLinks.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`w-full flex items-center gap-3 px-6 py-2 text-sm rounded-lg transition-all duration-300 ${
                      location.pathname === item.path ? 'font-semibold' : ''
                    }`}
                    style={{
                      color: location.pathname === item.path ? '#b78852' : '#4a4a4a',
                      backgroundColor: location.pathname === item.path ? 'rgba(183, 136, 82, 0.08)' : 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      if (location.pathname !== item.path) {
                        e.target.style.backgroundColor = 'rgba(183, 136, 82, 0.05)';
                        e.target.style.color = '#b78852';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (location.pathname !== item.path) {
                        e.target.style.backgroundColor = 'transparent';
                        e.target.style.color = '#4a4a4a';
                      }
                    }}
                  >
                    <span style={{color: '#9c7649'}}>{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
              
              <Link
                to={contactNav.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block w-full text-left px-3 py-2 text-base font-medium rounded-lg transition-all duration-300 ${
                  location.pathname === contactNav.path ? 'font-semibold' : ''
                }`}
                style={{
                  color: location.pathname === contactNav.path ? '#b78852' : '#4a4a4a',
                  backgroundColor: location.pathname === contactNav.path ? 'rgba(183, 136, 82, 0.08)' : 'transparent'
                }}
                onMouseEnter={(e) => {
                  if (location.pathname !== contactNav.path) {
                    e.target.style.backgroundColor = 'rgba(183, 136, 82, 0.05)';
                    e.target.style.color = '#b78852';
                  }
                }}
                onMouseLeave={(e) => {
                  if (location.pathname !== contactNav.path) {
                    e.target.style.backgroundColor = 'transparent';
                    e.target.style.color = '#4a4a4a';
                  }
                }}
              >
                {contactNav.name}
              </Link>
              
              {/* Mobile CTA */}
              <div className="border-t pt-4 mt-4 space-y-3" style={{borderColor: 'rgba(183, 136, 82, 0.1)'}}>
                <a 
                  href="tel:+917096033001"
                  className="flex items-center gap-2 font-medium"
                  style={{color: '#b78852'}}
                >
                  <Phone size={16} />
                  <span className="text-sm">+91 7096033001</span>
                </a>
                <button 
                  onClick={() => handleNavClick('/quote')}
                  className="w-full text-white px-6 py-3 rounded-full text-sm font-semibold shadow-lg transition-all duration-300"
                  style={{
                    background: 'linear-gradient(135deg, #b78852 0%, #c9955f 100%)'
                  }}
                >
                  Get Quote
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}