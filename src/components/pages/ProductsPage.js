"use client";
import { useState, useEffect } from "react";
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
} from "lucide-react";
import ProductCard from "../common/ProductCard";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChip, setActiveChip] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/products/all/"
        );
        setProducts(response?.data);
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

  const handleChipClick = (productName) => {
    setSearchTerm(productName);
    setActiveChip(productName);
  };

  const clearFilter = () => {
    setSearchTerm("");
    setActiveChip(null);
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category_name === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.short_description
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (product.brand &&
        product.brand.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  if (loading) {
    return <div className='pt-40 pb-20 text-center'>Loading Products...</div>;
  }

  if (error) {
    return <div className='pt-40 pb-20 text-center text-red-600'>{error}</div>;
  }

  return (
    <div className='pt-32 pb-20 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Our Products
          </h1>
          <p className='text-xl text-gray-600 max-w-4xl mx-auto'>
            Explore our comprehensive range of FDA compliant analytical
            instruments, designed to meet the stringent requirements of the
            pharmaceutical industry.
          </p>
        </div>

        {/* Product Chips Filter Section */}
        <div className='mb-12'>
          <div className='flex flex-wrap justify-center gap-2'>
            {products?.map((product) => (
              <button
                key={product.id}
                onClick={() => handleChipClick(product.name)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                  activeChip === product.name
                    ? "bg-amber-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-amber-50 hover:text-amber-700 border border-gray-200"
                }`}
              >
                {product.name}
              </button>
            ))}
            {activeChip && (
              <button
                onClick={clearFilter}
                className='flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold bg-red-100 text-red-700 hover:bg-red-200 transition-colors'
              >
                <XCircle size={16} />
                Clear Filter
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className='text-center py-16'>
            <FlaskConical className='mx-auto text-gray-400 mb-4' size={64} />
            <h3 className='text-xl font-semibold text-gray-900 mb-2'>
              No products found
            </h3>
            <p className='text-gray-600'>
              Please try a different search or clear the filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
