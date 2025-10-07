// src/components/pages/NewsPage.js

"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, User, Search, Globe, ChevronDown, Award } from "lucide-react";
import { apiService, getImageUrl } from "../../lib/api";

export default function NewsPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("blogs");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await apiService.getAllBlogPosts();
        setBlogPosts(response.data);
      } catch (err) {
        setError("Failed to load news and insights. Please try again later.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = blogPosts.filter(
    (post) => {
      const matchesSearch = post?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          post?.excerpt?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const isEvent = post.tags?.some(tag => tag.name.toLowerCase() === 'event');
      
      const matchesTab = (activeTab === "blogs" && !isEvent) || (activeTab === "events" && isEvent);
      
      return matchesSearch && matchesTab;
    }
  );

  const featuredPost = blogPosts.find((post) => post.is_featured);

  return (
    <div 
      className='pt-32 pb-20'
      style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6' style={{ color: "#8b6a3f" }}>
            News & Industry Insights
          </h1>
          <p className='text-xl max-w-3xl mx-auto' style={{ color: "#9c7649" }}>
            Stay updated with the latest pharmaceutical industry trends,
            regulatory changes, and company news.
          </p>
        </div>

        {/* Search Bar */}
        <div className='relative mb-8'>
          <Search
            className='absolute left-3 top-1/2 transform -translate-y-1/2'
            style={{ color: "#b78852" }}
            size={20}
          />
          <input
            type='text'
            placeholder='Search articles...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full pl-10 pr-4 py-3 rounded-xl border-0 focus:outline-none focus:ring-2 transition-all duration-300'
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 2px 8px rgba(183, 136, 82, 0.1)",
              focusRingColor: "#b78852"
            }}
          />
        </div>

        {/* Tab Navigation */}
        <div className='flex justify-center mb-12 border-b' style={{ borderColor: "rgba(183, 136, 82, 0.2)" }}>
          <button
            onClick={() => setActiveTab("blogs")}
            className={`py-3 px-6 text-lg font-semibold transition-colors duration-300 ${
              activeTab === "blogs" ? "border-b-2" : "text-gray-500 hover:text-gray-800"
            }`}
            style={{
              borderBottomColor: activeTab === "blogs" ? "#b78852" : "transparent",
              color: activeTab === "blogs" ? "#b78852" : "#9c7649"
            }}
          >
            Blogs
          </button>
          <button
            onClick={() => setActiveTab("events")}
            className={`py-3 px-6 text-lg font-semibold transition-colors duration-300 ${
              activeTab === "events" ? "border-b-2" : "text-gray-500 hover:text-gray-800"
            }`}
            style={{
              borderBottomColor: activeTab === "events" ? "#b78852" : "transparent",
              color: activeTab === "events" ? "#b78852" : "#9c7649"
            }}
          >
            Events
          </button>
        </div>

        {featuredPost && !searchTerm && activeTab === "blogs" && (
          <div 
            className='p-8 rounded-3xl mb-12'
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(183, 136, 82, 0.15)",
              backdropFilter: "blur(10px)"
            }}
          >
            <div className='grid lg:grid-cols-2 gap-8 items-center'>
              <div className="order-2 lg:order-1">
                <span className='px-4 py-2 rounded-full text-sm font-medium text-white shadow-lg' style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}>
                  Featured
                </span>
                <h2 className='text-3xl font-bold mt-4 mb-4' style={{ color: "#8b6a3f" }}>
                  {featuredPost.title}
                </h2>
                <div
                  className='mb-6 prose leading-relaxed'
                  style={{ color: "#9c7649" }}
                  dangerouslySetInnerHTML={{ __html: featuredPost?.excerpt }}
                />
                <Link
                  href={`/news/${featuredPost.slug}`}
                  className='font-semibold flex items-center gap-2 group'
                  style={{ color: "#b78852" }}
                >
                  Read Full Article{" "}
                  <ArrowRight
                    size={16}
                    className='group-hover:translate-x-1 transition-transform'
                  />
                </Link>
              </div>
              <div className="order-1 lg:order-2">
                <Image
                  src={getImageUrl(featuredPost.featured_image) || '/android-chrome-512x512.png'}
                  alt={featuredPost.title}
                  width={600}
                  height={400}
                  className='w-full h-64 object-cover rounded-2xl shadow-lg'
                  priority
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <h2 className='text-2xl font-bold mb-8' style={{ color: "#8b6a3f" }}>
            {activeTab === "blogs" ? "Latest Articles" : "Upcoming & Past Events"}
          </h2>
          {loading && <p className='text-center' style={{ color: "#9c7649" }}>Loading articles...</p>}
          {error && <p className='text-center text-red-500'>{error}</p>}

          {filteredPosts.length > 0 ? (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredPosts.map((post) => (
                <Link
                  href={`/news/${post.slug}`}
                  key={post.id}
                  className='bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden group'
                  style={{ border: "1px solid rgba(183, 136, 82, 0.15)" }}
                >
                  <article>
                    <div className='relative overflow-hidden'>
                      <Image
                        src={getImageUrl(post.featured_image) || '/android-chrome-512x512.png'}
                        alt={post.title}
                        width={400}
                        height={300}
                        className='w-full h-48 object-cover group-hover:scale-105 transition-transform'
                        loading="lazy"
                      />
                      <div className="absolute top-3 left-3">
                        <span className='px-3 py-1 rounded-full text-xs font-semibold text-white backdrop-blur-sm' style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}>
                          {post.category && post.category.name ? post.category.name : (post.tags?.some(tag => tag.name.toLowerCase() === 'event') ? 'Event' : 'Blog')}
                        </span>
                      </div>
                    </div>
                    <div className='p-6'>
                      <div className='flex items-center gap-4 mb-3 text-sm' style={{ color: "#9c7649" }}>
                        <span className='flex items-center gap-1'>
                          <Calendar size={14} />{" "}
                          {new Date(post.published_date).toLocaleDateString()}
                        </span>
                        <span className='flex items-center gap-1'>
                          <User size={14} /> {post.author_name || "Admin"}
                        </span>
                      </div>
                      <h3 className='text-xl font-bold mb-3 group-hover:opacity-80 line-clamp-2' style={{ color: "#8b6a3f" }}>
                        {post.title}
                      </h3>
                      <div
                        className='mb-4 line-clamp-3 text-sm prose'
                        style={{ color: "#9c7649" }}
                        dangerouslySetInnerHTML={{ __html: post?.excerpt }}
                      />
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            !loading && (
              <div className='text-center py-16'>
                <Globe className='mx-auto text-gray-400 mb-4' size={64} />
                <h3 className='text-xl font-semibold mb-2' style={{ color: "#8b6a3f" }}>
                  No articles found
                </h3>
                <p className='text-gray-600'>
                  {searchTerm ? `No articles match your search.` : `There are no articles in the '${activeTab}' category at the moment.`}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}