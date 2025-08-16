"use client";
import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import axios from "axios";
import {
  ChevronDown,
  HelpCircle,
  Search,
  LifeBuoy,
  Shield,
  Wrench,
} from "lucide-react";

const FaqItem = ({ faq, isOpen, onToggle }) => (
  <div className='border-b border-gray-200 py-6'>
    <button
      onClick={onToggle}
      className='w-full flex justify-between items-center text-left text-lg font-semibold text-gray-800 hover:text-amber-600 focus:outline-none'
    >
      <span className='pr-4'>{faq.question}</span>
      <ChevronDown
        className={`flex-shrink-0 transform transition-transform duration-300 ${
          isOpen ? "rotate-180" : ""
        }`}
        size={24}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-screen mt-4" : "max-h-0"
      }`}
    >
      <p className='text-gray-600 leading-relaxed pr-8'>{faq.answer}</p>
    </div>
  </div>
);

export default function FaqsPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openIndex, setOpenIndex] = useState("0-0"); // Format "categoryIndex-faqIndex"
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/faqs/categories/"
        );
        setCategories(response.data);
      } catch (err) {
        setError("Failed to load FAQs. Please try again later.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  const handleToggle = (catIndex, faqIndex) => {
    const newIndex = `${catIndex}-${faqIndex}`;
    setOpenIndex(openIndex === newIndex ? null : newIndex);
  };

  const filteredCategories = useMemo(() => {
    if (!categories) return [];

    let allFaqs = categories.flatMap((cat) =>
      cat.faqs.map((faq) => ({ ...faq, categoryName: cat.name }))
    );

    if (searchTerm) {
      allFaqs = allFaqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (activeCategory !== "All") {
      return [
        {
          name: activeCategory,
          faqs: allFaqs.filter((faq) => faq.categoryName === activeCategory),
        },
      ];
    }

    // Regroup filtered FAQs by category if search is active and category is 'All'
    if (searchTerm && activeCategory === "All") {
      const grouped = allFaqs.reduce((acc, faq) => {
        if (!acc[faq.categoryName]) {
          acc[faq.categoryName] = { name: faq.categoryName, faqs: [] };
        }
        acc[faq.categoryName].faqs.push(faq);
        return acc;
      }, {});
      return Object.values(grouped);
    }

    return categories;
  }, [searchTerm, activeCategory, categories]);

  const categoryIcons = {
    General: <HelpCircle size={20} />,
    "Technical & Compliance": <Shield size={20} />,
    "Service & Support": <Wrench size={20} />,
  };

  return (
    <div className='pt-32 pb-20 bg-gray-50'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <HelpCircle className='mx-auto text-amber-600 mb-4' size={48} />
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            Frequently Asked Questions
          </h1>
        </div>

        <div className='mb-12'>
          <div className='relative mb-6'>
            <Search
              className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Search questions or keywords...'
              className='w-full pl-12 pr-4 py-4 border rounded-full'
            />
          </div>

          <div className='flex flex-wrap justify-center gap-3'>
            <button
              onClick={() => setActiveCategory("All")}
              className={`px-6 py-2 rounded-full font-semibold text-sm ${
                activeCategory === "All"
                  ? "bg-amber-600 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-6 py-2 rounded-full font-semibold text-sm flex items-center gap-2 ${
                  activeCategory === cat.name
                    ? "bg-amber-600 text-white"
                    : "bg-white text-gray-700"
                }`}
              >
                {categoryIcons[cat.name]} {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className='bg-white p-8 md:p-12 rounded-2xl shadow-lg'>
          {loading && <p>Loading...</p>}
          {error && <p className='text-red-500'>{error}</p>}
          {filteredCategories.map((cat, catIndex) => (
            <div key={cat.id}>
              {activeCategory === "All" && (
                <h2 className='text-2xl font-bold text-gray-800 mt-8 first:mt-0 mb-4'>
                  {cat.name}
                </h2>
              )}
              {cat.faqs.length > 0 ? (
                cat.faqs.map((faq, faqIndex) => (
                  <FaqItem
                    key={faq.id}
                    faq={faq}
                    isOpen={openIndex === `${catIndex}-${faqIndex}`}
                    onToggle={() => handleToggle(catIndex, faqIndex)}
                  />
                ))
              ) : (
                <p className='text-gray-500'>
                  No questions found in this category.
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
