"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { ArrowRight, Calendar, User, Search, Globe } from "lucide-react";

export default function NewsPage() {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/blogs/posts/"
        );
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
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const featuredPost = blogPosts.find((post) => post.is_featured);

  return (
    <div className='pt-32 pb-20'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <h1 className='text-4xl md:text-5xl font-bold text-gray-900 mb-6'>
            News & Industry Insights
          </h1>
          <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
            Stay updated with the latest pharmaceutical industry trends,
            regulatory changes, and company news.
          </p>
        </div>

        <div className='flex flex-col md:flex-row gap-4 mb-12'>
          <div className='flex-1 relative'>
            <Search
              className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'
              size={20}
            />
            <input
              type='text'
              placeholder='Search articles...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-600'
            />
          </div>
        </div>

        {featuredPost && !searchTerm && (
          <div className='bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 mb-12'>
            <div className='grid lg:grid-cols-2 gap-8 items-center'>
              <div>
                <span className='bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium'>
                  Featured
                </span>
                <h2 className='text-3xl font-bold text-gray-900 mt-4 mb-4'>
                  {featuredPost.title}
                </h2>
                <div
                  className='text-gray-600 mb-6 prose'
                  dangerouslySetInnerHTML={{ __html: featuredPost.excerpt }}
                />
                <Link
                  to={`/news/${featuredPost.slug}`}
                  className='text-amber-600 font-semibold hover:text-amber-700 flex items-center gap-2 group'
                >
                  Read Full Article{" "}
                  <ArrowRight
                    size={16}
                    className='group-hover:translate-x-1 transition-transform'
                  />
                </Link>
              </div>
              <div>
                <img
                  src={featuredPost.featured_image}
                  alt={featuredPost.title}
                  className='w-full h-64 object-cover rounded-xl shadow-lg'
                />
              </div>
            </div>
          </div>
        )}

        <div>
          <h2 className='text-2xl font-bold text-gray-900 mb-8'>
            Latest Articles
          </h2>
          {loading && <p className='text-center'>Loading articles...</p>}
          {error && <p className='text-center text-red-500'>{error}</p>}

          {filteredPosts.length > 0 ? (
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {filteredPosts.map((post) => (
                <Link
                  to={`/news/${post.slug}`}
                  key={post.id}
                  className='bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden border group'
                >
                  <article>
                    <div className='relative'>
                      <img
                        src={post.featured_image}
                        alt={post.title}
                        className='w-full h-48 object-cover group-hover:scale-105 transition-transform'
                      />
                    </div>
                    <div className='p-6'>
                      <div className='flex items-center gap-4 mb-3 text-sm text-gray-500'>
                        <span className='flex items-center gap-1'>
                          <Calendar size={14} />{" "}
                          {new Date(post.published_date).toLocaleDateString()}
                        </span>
                        <span className='flex items-center gap-1'>
                          <User size={14} /> {post.author_name}
                        </span>
                      </div>
                      <h3 className='text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 line-clamp-2'>
                        {post.title}
                      </h3>
                      <div
                        className='text-gray-600 mb-4 line-clamp-3 text-sm prose'
                        dangerouslySetInnerHTML={{ __html: post.excerpt }}
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
                <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                  No articles found
                </h3>
                <p className='text-gray-600'>
                  Try adjusting your search terms.
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
