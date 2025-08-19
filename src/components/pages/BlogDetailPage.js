"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import {
  ChevronLeft,
  Calendar,
  User,
  ArrowRight,
  MessageSquare,
  Clock,
  Tag,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Copy,
} from "lucide-react";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch the main post
        const postResponse = await axios.get(
          `https://sweekarme.in/shree/api/blogs/posts/${slug}/`
        );
        setPost(postResponse.data);

        // Fetch related posts (all posts except the current one)
        const relatedResponse = await axios.get(
          "https://sweekarme.in/shree/api/blogs/posts/"
        );
        setRelatedPosts(
          relatedResponse.data.filter((p) => p.slug !== slug).slice(0, 3)
        );
      } catch (err) {
        setError(
          "Failed to load the blog post. It may not exist or the server may be down."
        );
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post?.title || "";
    
    const shareUrls = {
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (loading) {
    return (
      <div
        className='pt-20 pb-20 text-center min-h-screen flex items-center justify-center px-4'
        style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
      >
        <div>
          <div className='inline-block animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 mb-4' style={{ borderColor: "#b78852" }}></div>
          <p className='text-base md:text-lg font-semibold' style={{ color: "#8b6a3f" }}>Loading Article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div
        className='pt-20 pb-20 text-center min-h-screen px-4'
        style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
      >
        <div
          className='max-w-md mx-auto p-6 md:p-8 rounded-2xl md:rounded-3xl shadow-lg'
          style={{ backgroundColor: "rgba(255, 255, 255, 0.9)", border: "1px solid rgba(183, 136, 82, 0.2)" }}
        >
          <h1 className='text-2xl md:text-3xl font-bold mb-4' style={{ color: "#8b6a3f" }}>Article Not Found</h1>
          <p className='mb-6 text-sm md:text-base' style={{ color: "#9c7649" }}>
            {error || "Sorry, we couldn't find the article you're looking for."}
          </p>
          <Link
            href='/news'
            className='inline-block text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 text-sm md:text-base'
            style={{ 
              background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
              boxShadow: "0 4px 15px rgba(183, 136, 82, 0.3)"
            }}
          >
            Return to News & Insights
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className='min-h-screen'
      style={{ background: "linear-gradient(135deg, #fefcf8 0%, #fdf8f0 50%, #fcf4e8 100%)" }}
    >
      <div className='pt-20 md:pt-32 pb-12 md:pb-20'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Navigation */}
          <nav className='mb-6 md:mb-8'>
            <Link
              href='/news'
              className='flex items-center gap-2 font-medium transition-all duration-300 hover:scale-105 text-sm md:text-base'
              style={{ color: "#b78852" }}
            >
              <ChevronLeft size={18} />
              Back to News & Insights
            </Link>
          </nav>

          {/* Article Header */}
          <header className='mb-6 md:mb-8'>
            <div className='flex flex-wrap items-center gap-3 mb-4 md:mb-6'>
              <span 
                className='px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold text-white'
                style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
              >
                {post.category.name}
              </span>
              <div className='flex items-center gap-3 md:gap-4 text-xs md:text-sm' style={{ color: "#9c7649" }}>
                <div className='flex items-center gap-1'>
                  <Clock size={14} />
                  <span>5 min read</span>
                </div>
                <div className='relative'>
                  <button 
                    onClick={() => setShowShareMenu(!showShareMenu)}
                    className='flex items-center gap-1 hover:scale-105 transition-transform'
                  >
                    <Share2 size={14} />
                    <span>Share</span>
                  </button>
                  
                  {/* Share Menu */}
                  {showShareMenu && (
                    <div 
                      className='absolute top-8 right-0 z-10 p-3 rounded-xl shadow-lg border min-w-[200px]'
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.95)",
                        border: "1px solid rgba(183, 136, 82, 0.2)",
                        backdropFilter: "blur(10px)"
                      }}
                    >
                      <div className='space-y-2'>
                        <button
                          onClick={() => handleShare('twitter')}
                          className='flex items-center gap-2 w-full p-2 rounded-lg hover:bg-blue-50 transition-colors text-sm'
                          style={{ color: "#1da1f2" }}
                        >
                          <Twitter size={16} />
                          Share on Twitter
                        </button>
                        <button
                          onClick={() => handleShare('facebook')}
                          className='flex items-center gap-2 w-full p-2 rounded-lg hover:bg-blue-50 transition-colors text-sm'
                          style={{ color: "#1877f2" }}
                        >
                          <Facebook size={16} />
                          Share on Facebook
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className='flex items-center gap-2 w-full p-2 rounded-lg hover:bg-blue-50 transition-colors text-sm'
                          style={{ color: "#0077b5" }}
                        >
                          <Linkedin size={16} />
                          Share on LinkedIn
                        </button>
                        <button
                          onClick={copyToClipboard}
                          className='flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm'
                          style={{ color: "#9c7649" }}
                        >
                          <Copy size={16} />
                          {copied ? 'Copied!' : 'Copy Link'}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <h1 className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 md:mb-6 leading-tight' style={{ color: "#8b6a3f" }}>
              {post.title}
            </h1>
            
            <div className='flex flex-wrap items-center gap-4 md:gap-6 text-sm' style={{ color: "#9c7649" }}>
              <div className='flex items-center gap-2'>
                <Calendar size={16} />
                <span>
                  {new Date(post.published_date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className='flex items-center gap-2'>
                <User size={16} />
                <span>By {post.author_name}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className='mb-8 md:mb-12'>
            <div
              className='relative rounded-2xl md:rounded-3xl overflow-hidden shadow-lg'
              style={{ border: "1px solid rgba(183, 136, 82, 0.15)" }}
            >
              <img
                src={post.featured_image}
                alt={post.title}
                className='w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover'
                loading="lazy"
              />
            </div>
          </div>

          {/* Article Content */}
          <div 
            className='mb-12 md:mb-16 rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-10 shadow-sm'
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              border: "1px solid rgba(183, 136, 82, 0.15)",
              backdropFilter: "blur(10px)"
            }}
          >
            <article 
              className='prose prose-sm sm:prose-base md:prose-lg lg:prose-xl max-w-none'
              style={{ 
                "--tw-prose-body": "#9c7649",
                "--tw-prose-headings": "#8b6a3f",
                "--tw-prose-links": "#b78852",
                "--tw-prose-quotes": "#8b6a3f",
                "--tw-prose-quote-borders": "#b78852",
                "--tw-prose-code": "#8b6a3f",
                "--tw-prose-pre-code": "#9c7649",
                "--tw-prose-pre-bg": "rgba(183, 136, 82, 0.05)",
                "--tw-prose-th-borders": "rgba(183, 136, 82, 0.2)",
                "--tw-prose-td-borders": "rgba(183, 136, 82, 0.1)"
              }}
            >
              <div 
                className='content-formatting'
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  lineHeight: '1.7',
                  fontSize: 'clamp(0.875rem, 2.5vw, 1.125rem)'
                }}
              />
            </article>
          </div>

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className='mb-8 md:mb-12'>
              <div className='flex flex-wrap items-center gap-2'>
                <Tag size={16} style={{ color: "#b78852" }} />
                <span className='text-sm font-medium mr-2' style={{ color: "#8b6a3f" }}>Tags:</span>
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className='px-3 py-1 rounded-full text-xs font-medium'
                    style={{
                      backgroundColor: "rgba(183, 136, 82, 0.1)",
                      color: "#8b6a3f",
                      border: "1px solid rgba(183, 136, 82, 0.2)"
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div 
            className='p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl mb-12 md:mb-16 text-center shadow-lg'
            style={{
              background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)",
              color: "white"
            }}
          >
            <MessageSquare className='mx-auto mb-4' size={32} />
            <h3 className='text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4'>Need Expert Consultation?</h3>
            <p className='mb-6 md:mb-8 opacity-90 text-sm md:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed'>
              Our experts can help you navigate regulatory requirements and select
              the right analytical solutions for your pharmaceutical needs.
            </p>
            <Link
              href='/contact'
              className='inline-block bg-white px-6 py-3 md:px-8 md:py-4 rounded-xl font-semibold transition-all duration-300 hover:scale-105 shadow-lg text-sm md:text-base'
              style={{ color: "#8b6a3f" }}
            >
              Contact Our Experts
            </Link>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div>
              <h3 className='text-xl md:text-2xl lg:text-3xl font-bold mb-6 md:mb-8' style={{ color: "#8b6a3f" }}>
                Related Articles
              </h3>
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6'>
                {relatedPosts.map((relatedPost) => (
                  <Link
                    href={`/news/${relatedPost.slug}`}
                    key={relatedPost.id}
                    className='group rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 active:scale-95'
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid rgba(183, 136, 82, 0.15)",
                      backdropFilter: "blur(10px)"
                    }}
                  >
                    <div className='relative overflow-hidden'>
                      <img
                        src={relatedPost.featured_image}
                        alt={relatedPost.title}
                        className='h-32 sm:h-40 md:h-48 w-full object-cover group-hover:scale-110 transition-transform duration-500'
                        loading="lazy"
                      />
                      <div className='absolute top-3 left-3'>
                        <span 
                          className='px-2 py-1 md:px-3 md:py-1 rounded-full text-xs font-semibold text-white'
                          style={{ background: "linear-gradient(135deg, #b78852 0%, #c9955f 100%)" }}
                        >
                          {relatedPost.category.name}
                        </span>
                      </div>
                    </div>
                    <div className='p-4 md:p-6'>
                      <h4 className='font-bold mb-2 md:mb-3 line-clamp-2 text-sm md:text-base leading-tight' style={{ color: "#8b6a3f" }}>
                        {relatedPost.title}
                      </h4>
                      <div className='flex justify-between items-center'>
                        <span className='text-xs' style={{ color: "#9c7649" }}>
                          {new Date(relatedPost.published_date).toLocaleDateString()}
                        </span>
                        <span 
                          className='text-xs md:text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all duration-300'
                          style={{ color: "#b78852" }}
                        >
                          Read More <ArrowRight size={12} className='group-hover:translate-x-1 transition-transform' />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx global>{`
        .content-formatting h1,
        .content-formatting h2,
        .content-formatting h3,
        .content-formatting h4,
        .content-formatting h5,
        .content-formatting h6 {
          color: #8b6a3f !important;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          line-height: 1.3;
        }

        .content-formatting h1 { font-size: clamp(1.5rem, 4vw, 2.25rem); }
        .content-formatting h2 { font-size: clamp(1.25rem, 3.5vw, 1.875rem); }
        .content-formatting h3 { font-size: clamp(1.125rem, 3vw, 1.5rem); }
        .content-formatting h4 { font-size: clamp(1rem, 2.5vw, 1.25rem); }
        .content-formatting h5 { font-size: clamp(0.875rem, 2vw, 1.125rem); }
        .content-formatting h6 { font-size: clamp(0.875rem, 2vw, 1rem); }

        .content-formatting p {
          margin-bottom: 1.5rem;
          line-height: 1.7;
          color: #9c7649;
        }

        .content-formatting ul,
        .content-formatting ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }

        .content-formatting li {
          margin-bottom: 0.5rem;
          line-height: 1.6;
          color: #9c7649;
        }

        .content-formatting blockquote {
          border-left: 4px solid #b78852;
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: #8b6a3f;
          background: rgba(183, 136, 82, 0.05);
          padding: 1rem 1.5rem;
          border-radius: 0.5rem;
        }

        .content-formatting a {
          color: #b78852;
          text-decoration: underline;
          text-decoration-color: rgba(183, 136, 82, 0.3);
          transition: all 0.2s ease;
        }

        .content-formatting a:hover {
          text-decoration-color: #b78852;
          color: #8b6a3f;
        }

        .content-formatting img {
          max-width: 100%;
          height: auto;
          border-radius: 0.75rem;
          margin: 2rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .content-formatting table {
          width: 100%;
          border-collapse: collapse;
          margin: 2rem 0;
          font-size: 0.875rem;
        }

        .content-formatting th,
        .content-formatting td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid rgba(183, 136, 82, 0.2);
        }

        .content-formatting th {
          background: rgba(183, 136, 82, 0.1);
          font-weight: 600;
          color: #8b6a3f;
        }

        .content-formatting code:not(pre code) {
          background: rgba(183, 136, 82, 0.1);
          color: #8b6a3f;
          padding: 0.25rem 0.5rem;
          border-radius: 0.25rem;
          font-size: 0.875em;
        }

        .content-formatting pre {
          background: rgba(183, 136, 82, 0.05);
          border: 1px solid rgba(183, 136, 82, 0.2);
          border-radius: 0.5rem;
          padding: 1rem;
          overflow-x: auto;
          margin: 1.5rem 0;
        }

        .content-formatting pre code {
          background: transparent;
          color: #9c7649;
          padding: 0;
        }

        @media (max-width: 768px) {
          .content-formatting {
            font-size: 0.875rem;
          }
          
          .content-formatting h1,
          .content-formatting h2,
          .content-formatting h3,
          .content-formatting h4,
          .content-formatting h5,
          .content-formatting h6 {
            margin-top: 1.5rem;
            margin-bottom: 0.75rem;
          }

          .content-formatting p {
            margin-bottom: 1.25rem;
          }

          .content-formatting ul,
          .content-formatting ol {
            padding-left: 1.25rem;
          }

          .content-formatting blockquote {
            padding: 0.75rem 1rem;
            margin: 1.5rem 0;
          }

          .content-formatting table {
            font-size: 0.75rem;
          }

          .content-formatting th,
          .content-formatting td {
            padding: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}