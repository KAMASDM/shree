"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import axios from "axios";
import {
  Search,
  Filter,
  Microscope,
  FlaskConical,
  Globe,
  Zap,
  XCircle,
  Package,
  Grid3X3,
  Layers,
  ChevronDown,
  SlidersHorizontal,
  Target,
  CheckCircle,
} from "lucide-react";
import ProductCard from "../common/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // ✨ CHANGED: Default category is now "Pharmaceutical"
  const [selectedCategory, setSelectedCategory] = useState("Pharmaceutical");
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  // ✨ CHANGED: Show applications by default since a category is pre-selected
  const [showApplications, setShowApplications] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://sweekarme.in/shree/api/products/all/"
        );
        let productsData = response?.data;

        // ✨ NEW: Sort products to show new items first
        if (Array.isArray(productsData)) {
          productsData.sort((a, b) => {
            // Primary sort: `is_new: true` comes before `is_new: false`
            if (a.is_new && !b.is_new) return -1;
            if (!a.is_new && b.is_new) return 1;
            
            // Secondary sort (optional but good practice): newest items first
            return new Date(b.created_at) - new Date(a.created_at);
          });
        }
        
        setProducts(productsData);

        // Extract unique categories
        const uniqueCategories = [
          ...new Set(productsData.map((product) => product.category_name)),
        ];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(
          "Failed to load products. Please make sure the backend server is running."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get available applications for the selected category
  const availableApplications = useMemo(() => {
    if (selectedCategory === "All") return [];
    
    const categoryProducts = products.filter(
      (product) => product.category_name === selectedCategory
    );
    
    const applications = new Set();
    categoryProducts.forEach((product) => {
      if (product.applications && Array.isArray(product.applications)) {
        product.applications.forEach((app) => {
          // Handle both string and object formats
          const appName = typeof app === 'string' ? app : app.app || app.name;
          if (appName) applications.add(appName);
        });
      }
    });
    
    return Array.from(applications).sort();
  }, [products, selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedApplications([]); // Clear applications when category changes
    setSearchTerm("");
    setShowMobileFilters(false);
    setShowApplications(category !== "All");
  };

  const handleApplicationToggle = (application) => {
    setSelectedApplications(prev => {
      if (prev.includes(application)) {
        return prev.filter(app => app !== application);
      } else {
        return [...prev, application];
      }
    });
  };

  const clearFilter = () => {
    setSelectedCategory("All");
    setSelectedApplications([]);
    setSearchTerm("");
    setShowMobileFilters(false);
    setShowApplications(false);
  };

  const filteredProducts = products.filter((product) => {
    // Category filter
    const matchesCategory =
      selectedCategory === "All" || product.category_name === selectedCategory;
    
    // Application filter
    const matchesApplication = selectedApplications.length === 0 || 
      (product.applications && Array.isArray(product.applications) &&
       selectedApplications.some(selectedApp => 
         product.applications.some(app => {
           const appName = typeof app === 'string' ? app : app.app || app.name;
           return appName && appName.toLowerCase().includes(selectedApp.toLowerCase());
         })
       ));
    
    // Search filter
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.short_description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (product.brand &&
        product.brand.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesApplication && matchesSearch;
  });

  const getCategoryCount = (categoryName) => {
    if (categoryName === "All") return products.length;
    return products.filter((product) => product.category_name === categoryName)
      .length;
  };

  const getApplicationCount = (application) => {
    const categoryProducts = products.filter(
      (product) => product.category_name === selectedCategory
    );
    
    return categoryProducts.filter(product => 
      product.applications && Array.isArray(product.applications) &&
      product.applications.some(app => {
        const appName = typeof app === 'string' ? app : app.app || app.name;
        return appName && appName.toLowerCase().includes(application.toLowerCase());
      })
    ).length;
  };

  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      "Analytical Instruments": <Microscope size={20} />,
      "Laboratory Equipment": <FlaskConical size={20} />,
      "Testing Solutions": <Zap size={20} />,
      "Quality Control": <Package size={20} />,
      "Research Tools": <Globe size={20} />,
      // Added Pharmaceutical icon
      "Pharmaceutical": <FlaskConical size={20} />,
      default: <Grid3X3 size={20} />,
    };
    return iconMap[categoryName] || iconMap["default"];
  };

  if (loading) {
    return (
      <div
        className='pt-20 pb-20 text-center min-h-screen flex items-center justify-center px-4'
        style={{
          background:
            "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)",
        }}
      >
        <div>
          <div
            className='inline-block animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 mb-4'
            style={{ borderColor: "#b78852" }}
          ></div>
          <p
            className='text-base md:text-lg font-semibold'
            style={{ color: "#8b6a3f" }}
          >
            Loading Products...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className='pt-20 pb-20 text-center min-h-screen px-4'
        style={{
          background:
            "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)",
        }}
      >
        <div className='text-red-600 max-w-md mx-auto'>
          <p className='text-lg font-semibold mb-4'>
            Oops! Something went wrong
          </p>
          <p className='text-sm'>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className='min-h-screen'
      style={{
        background:
          "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)",
      }}
    >
      {/* Header Section */}
      <div className='pt-20 md:pt-32 pb-6 md:pb-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center mb-6 md:mb-8'>
            <h1
              className='text-3xl md:text-5xl font-bold mb-3 md:mb-6'
              style={{ color: "#8b6a3f" }}
            >
              Our Products
            </h1>
            <p
              className='text-base md:text-xl max-w-3xl mx-auto leading-relaxed'
              style={{ color: "#9c7649" }}
            >
              Discover FDA compliant analytical instruments designed for
              pharmaceutical excellence
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Search & Filter Bar */}
      <div
        className='sticky top-0 z-40 py-4 backdrop-blur-md border-b'
        style={{
          backgroundColor: "rgba(254, 252, 248, 0.95)",
          borderColor: "rgba(183, 136, 82, 0.1)",
        }}
      >
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex gap-3'>
            {/* Search Bar */}
            <div className='flex-1 relative'>
              <Search
                className='absolute left-3 top-1/2 transform -translate-y-1/2'
                style={{ color: "#b78852" }}
                size={18}
              />
              <input
                type='text'
                placeholder='Search products...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 transition-all duration-300 text-sm md:text-base'
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                  boxShadow: "0 2px 8px rgba(183, 136, 82, 0.1)",
                  focusRingColor: "#b78852",
                }}
              />
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className='md:hidden flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300'
              style={{
                backgroundColor:
                  selectedCategory !== "All" || selectedApplications.length > 0
                    ? "#b78852"
                    : "rgba(255, 255, 255, 0.9)",
                color: selectedCategory !== "All" || selectedApplications.length > 0 ? "white" : "#b78852",
                boxShadow: "0 2px 8px rgba(183, 136, 82, 0.1)",
              }}
            >
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Category Pills */}
      <div className='hidden md:block py-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex flex-wrap justify-center gap-3'>
            <button
              onClick={() => handleCategoryClick("All")}
              className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                selectedCategory === "All"
                  ? "shadow-lg transform scale-105"
                  : "shadow-sm hover:shadow-md hover:scale-105"
              }`}
              style={{
                backgroundColor:
                  selectedCategory === "All"
                    ? "#b78852"
                    : "rgba(255, 255, 255, 0.9)",
                color: selectedCategory === "All" ? "white" : "#8b6a3f",
                border:
                  selectedCategory === "All"
                    ? "none"
                    : "1px solid rgba(183, 136, 82, 0.2)",
              }}
            >
              <div className='flex items-center gap-2'>
                <Layers size={18} />
                All Products ({getCategoryCount("All")})
              </div>
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 font-medium ${
                  selectedCategory === category
                    ? "shadow-lg transform scale-105"
                    : "shadow-sm hover:shadow-md hover:scale-105"
                }`}
                style={{
                  backgroundColor:
                    selectedCategory === category
                      ? "#b78852"
                      : "rgba(255, 255, 255, 0.9)",
                  color: selectedCategory === category ? "white" : "#8b6a3f",
                  border:
                    selectedCategory === category
                      ? "none"
                      : "1px solid rgba(183, 136, 82, 0.2)",
                }}
              >
                <div className='flex items-center gap-2'>
                  {getCategoryIcon(category)}
                  {category} ({getCategoryCount(category)})
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Applications Filter */}
      {showApplications && availableApplications.length > 0 && (
        <div className='hidden md:block py-4 border-b' style={{ borderColor: "rgba(183, 136, 82, 0.1)" }}>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='mb-3'>
              <h3 className='text-sm font-semibold flex items-center gap-2' style={{ color: "#8b6a3f" }}>
                <Target size={16} />
                Filter by Application:
              </h3>
            </div>
            <div className='flex flex-wrap gap-2'>
              {availableApplications.map((application) => (
                <button
                  key={application}
                  onClick={() => handleApplicationToggle(application)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                    selectedApplications.includes(application)
                      ? "shadow-md transform scale-105"
                      : "shadow-sm hover:shadow-md hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: selectedApplications.includes(application)
                      ? "#c9955f"
                      : "rgba(255, 255, 255, 0.9)",
                    color: selectedApplications.includes(application) ? "white" : "#8b6a3f",
                    border: selectedApplications.includes(application)
                      ? "none"
                      : "1px solid rgba(183, 136, 82, 0.2)",
                  }}
                >
                  {selectedApplications.includes(application) && (
                    <CheckCircle size={14} />
                  )}
                  {application} ({getApplicationCount(application)})
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Category & Application Dropdown */}
      {showMobileFilters && (
        <div
          className='md:hidden border-b'
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            borderColor: "rgba(183, 136, 82, 0.1)",
          }}
        >
          <div className='max-w-7xl mx-auto px-4 py-4'>
            {/* Categories */}
            <div className='space-y-2 mb-4'>
              <h4 className='text-sm font-semibold' style={{ color: "#8b6a3f" }}>Categories:</h4>
              <button
                onClick={() => handleCategoryClick("All")}
                className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                  selectedCategory === "All" ? "ring-2" : ""
                }`}
                style={{
                  backgroundColor:
                    selectedCategory === "All"
                      ? "rgba(183, 136, 82, 0.1)"
                      : "rgba(249, 250, 251, 0.8)",
                  ringColor:
                    selectedCategory === "All" ? "#b78852" : "transparent",
                }}
              >
                <div className='flex items-center gap-3'>
                  <Layers size={20} style={{ color: "#b78852" }} />
                  <span className='font-medium' style={{ color: "#8b6a3f" }}>
                    All Products
                  </span>
                </div>
                <span
                  className='text-sm px-2 py-1 rounded-full'
                  style={{
                    backgroundColor: "rgba(183, 136, 82, 0.1)",
                    color: "#9c7649",
                  }}
                >
                  {getCategoryCount("All")}
                </span>
              </button>

              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${
                    selectedCategory === category ? "ring-2" : ""
                  }`}
                  style={{
                    backgroundColor:
                      selectedCategory === category
                        ? "rgba(183, 136, 82, 0.1)"
                        : "rgba(249, 250, 251, 0.8)",
                    ringColor:
                      selectedCategory === category ? "#b78852" : "transparent",
                  }}
                >
                  <div className='flex items-center gap-3'>
                    <div style={{ color: "#b78852" }}>
                      {getCategoryIcon(category)}
                    </div>
                    <span
                      className='font-medium text-left'
                      style={{ color: "#8b6a3f" }}
                    >
                      {category}
                    </span>
                  </div>
                  <span
                    className='text-sm px-2 py-1 rounded-full'
                    style={{
                      backgroundColor: "rgba(183, 136, 82, 0.1)",
                      color: "#9c7649",
                    }}
                  >
                    {getCategoryCount(category)}
                  </span>
                </button>
              ))}
            </div>

            {/* Applications */}
            {showApplications && availableApplications.length > 0 && (
              <div className='space-y-2 border-t pt-4' style={{ borderColor: "rgba(183, 136, 82, 0.1)" }}>
                <h4 className='text-sm font-semibold flex items-center gap-2' style={{ color: "#8b6a3f" }}>
                  <Target size={16} />
                  Applications:
                </h4>
                <div className='space-y-2'>
                  {availableApplications.map((application) => (
                    <button
                      key={application}
                      onClick={() => handleApplicationToggle(application)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                        selectedApplications.includes(application) ? "ring-2" : ""
                      }`}
                      style={{
                        backgroundColor: selectedApplications.includes(application)
                          ? "rgba(201, 149, 95, 0.1)"
                          : "rgba(249, 250, 251, 0.8)",
                        ringColor: selectedApplications.includes(application) ? "#c9955f" : "transparent",
                      }}
                    >
                      <div className='flex items-center gap-3'>
                        <div style={{ color: "#c9955f" }}>
                          {selectedApplications.includes(application) ? (
                            <CheckCircle size={16} />
                          ) : (
                            <Target size={16} />
                          )}
                        </div>
                        <span
                          className='font-medium text-left text-sm'
                          style={{ color: "#8b6a3f" }}
                        >
                          {application}
                        </span>
                      </div>
                      <span
                        className='text-xs px-2 py-1 rounded-full'
                        style={{
                          backgroundColor: "rgba(183, 136, 82, 0.1)",
                          color: "#9c7649",
                        }}
                      >
                        {getApplicationCount(application)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Active Filters */}
      {(selectedCategory !== "All" || selectedApplications.length > 0 || searchTerm) && (
        <div className='py-4'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 flex-wrap'>
                <span
                  className='text-sm font-medium'
                  style={{ color: "#9c7649" }}
                >
                  Active filters:
                </span>
                {selectedCategory !== "All" && (
                  <span
                    className='px-3 py-1 rounded-full text-sm font-medium'
                    style={{
                      backgroundColor: "#b78852",
                      color: "white",
                    }}
                  >
                    {selectedCategory}
                  </span>
                )}
                {selectedApplications.map((app) => (
                  <span
                    key={app}
                    className='px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1'
                    style={{
                      backgroundColor: "#c9955f",
                      color: "white",
                    }}
                  >
                    <Target size={12} />
                    {app}
                  </span>
                ))}
                {searchTerm && (
                  <span
                    className='px-3 py-1 rounded-full text-sm font-medium'
                    style={{
                      backgroundColor: "#8b6a3f",
                      color: "white",
                    }}
                  >
                    {`"${searchTerm}"`}
                  </span>
                )}
              </div>
              <button
                onClick={clearFilter}
                className='flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium transition-colors'
                style={{
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  color: "#dc2626",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                }}
              >
                <XCircle size={14} />
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Results Summary */}
      <div className='pb-6'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center md:text-left'>
            <p className='text-sm md:text-base' style={{ color: "#9c7649" }}>
              <span className='font-semibold' style={{ color: "#8b6a3f" }}>
                {filteredProducts.length}
              </span>{" "}
              products found
              {selectedCategory !== "All" && (
                <span>
                  {" "}
                  in{" "}
                  <span className='font-semibold' style={{ color: "#8b6a3f" }}>
                    {selectedCategory}
                  </span>
                </span>
              )}
              {selectedApplications.length > 0 && (
                <span>
                  {" "}
                  for{" "}
                  <span className='font-semibold' style={{ color: "#8b6a3f" }}>
                    {selectedApplications.join(", ")}
                  </span>
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className='pb-20'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {filteredProducts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8'>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className='text-center py-12 md:py-20'>
              <div
                className='mb-6 p-4 md:p-6 rounded-full mx-auto w-fit'
                style={{ backgroundColor: "rgba(183, 136, 82, 0.1)" }}
              >
                <FlaskConical
                  size={48}
                  className='md:hidden'
                  style={{ color: "#b78852" }}
                />
                <FlaskConical
                  size={64}
                  className='hidden md:block'
                  style={{ color: "#b78852" }}
                />
              </div>
              <h3
                className='text-lg md:text-xl font-semibold mb-3'
                style={{ color: "#8b6a3f" }}
              >
                No products found
              </h3>
              <p
                className='mb-6 text-sm md:text-base max-w-md mx-auto'
                style={{ color: "#9c7649" }}
              >
                {searchTerm
                  ? `No products match your search criteria.`
                  : selectedApplications.length > 0
                  ? `No products found for the selected applications in ${selectedCategory}.`
                  : `No products found in ${
                      selectedCategory === "All"
                        ? "any category"
                        : selectedCategory
                    }.`}
              </p>
              <button
                onClick={clearFilter}
                className='px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-sm md:text-base'
                style={{
                  background:
                    "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
                  color: "white",
                  boxShadow: "0 4px 15px rgba(183, 136, 82, 0.3)",
                }}
              >
                View All Products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}