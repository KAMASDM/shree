// src/components/pages/BlogDetailPage.js
"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  User,
  ArrowLeft,
  Tag,
  Share2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
} from "lucide-react";
import { apiService } from "../../lib/api";

export default function BlogDetailPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
  const [expandedFAQ, setExpandedFAQ] = useState({});
  const params = useParams();
  const { slug } = params;

  useEffect(() => {
    if (slug) {
      const fetchPost = async () => {
        setLoading(true);
        setError(null);
        try {
          const { data } = await apiService.getBlogPostBySlug(slug);
          setPost(data);
        } catch (err) {
          setError("Failed to load the blog post. It might not exist or there was a server issue.");
          console.error("API Error:", err);
        } finally {
          setLoading(false);
        }
      };
      fetchPost();
    }
  }, [slug]);

  const toggleFAQ = (index) => {
    setExpandedFAQ(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Enhanced content processing
  const processContentForDisplay = (content) => {
    if (!content) return '';
    
    // Check if content has FAQ section
    const hasFAQSection = content.includes('Frequently Asked Questions') || 
                         content.includes('<strong>Q:') || 
                         content.includes('**Q:');
    
    if (!hasFAQSection) {
      return content;
    }

    // Split content at FAQ section
    const faqStartPatterns = [
      /(<p><strong>Frequently Asked Questions<\/strong><\/p>)/i,
      /(<p>Frequently Asked Questions<\/p>)/i,
      /(Frequently Asked Questions)/i,
      /(<p><strong>Q:\s*.*?<\/strong>)/i
    ];

    let splitIndex = -1;
    let matchedPattern = '';

    for (const pattern of faqStartPatterns) {
      const match = content.match(pattern);
      if (match) {
        splitIndex = content.indexOf(match[0]);
        matchedPattern = match[0];
        break;
      }
    }

    if (splitIndex === -1) {
      return content;
    }

    const regularContent = content.substring(0, splitIndex);
    const faqContent = content.substring(splitIndex);

    return { regularContent, faqContent, splitIndex };
  };

  const renderFAQSection = (faqContent) => {
    if (!faqContent) return null;
    
    // Extract FAQ items
    const faqItems = [];
    
    // Pattern for Q: A: format
    const qaPairs = faqContent.split(/(?=<p><strong>Q:)|(?=<strong>Q:)|(?=Q:)/i);
    
    for (const pair of qaPairs) {
      if (!pair.includes('Q:')) continue;
      
      const qMatch = pair.match(/Q:\s*(.*?)(?:<\/strong>|$)/i);
      const aMatch = pair.match(/A:\s*(.*?)(?:<\/p>|$)/is);
      
      if (qMatch && aMatch) {
        const question = qMatch[1].replace(/<[^>]*>/g, '').trim();
        const answer = aMatch[1].replace(/<[^>]*>/g, '').trim();
        
        if (question && answer) {
          faqItems.push({ question, answer });
        }
      }
    }

    if (faqItems.length === 0) return null;

    return (
      <div className="mt-8 mb-8">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-amber-100 rounded-xl">
              <HelpCircle className="h-6 w-6 text-amber-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-4">
            {faqItems.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-100 shadow-sm">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 rounded-xl transition-colors"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                  {expandedFAQ[index] ? (
                    <ChevronUp className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {expandedFAQ[index] && (
                  <div className="px-6 pb-4 pt-0">
                    <div className="border-t border-gray-100 pt-4">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const isEvent = post?.tags?.some(tag => tag.name.toLowerCase() === 'event');

  const handleShare = async () => {
    if (isSharing) return;

    const shareData = {
      title: post.title,
      text: post.meta_description || `Check out this event from Shreedhar Instruments!`,
      url: window.location.href,
    };
    
    if (navigator.share) {
      setIsSharing(true);
      try {
        await navigator.share(shareData);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error sharing:', error);
        }
      } finally {
        setIsSharing(false);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Event link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className='pt-20 pb-20 text-center min-h-screen flex items-center justify-center'>
        <div>
          <div className='inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mb-4'></div>
          <p className='text-lg font-semibold text-amber-800'>Loading Post...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className='pt-20 pb-20 text-center min-h-screen'>
        <div className='max-w-md mx-auto p-8 rounded-2xl shadow-lg bg-white'>
          <h1 className='text-3xl font-bold mb-4 text-amber-800'>Post Not Found</h1>
          <p className='mb-6 text-gray-600'>
            {error}
          </p>
          <Link href="/blog" className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold bg-amber-600 hover:bg-amber-700">
             <ArrowLeft size={18} />
             Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Process the content
  const processedContent = processContentForDisplay(post.content);
  const isContentSplit = typeof processedContent === 'object';

  return (
    <>
      {/* Enhanced CSS Styles */}
      <style jsx global>{`
        .enhanced-content {
          line-height: 1.8;
          color: #374151;
        }
        
        .enhanced-content p {
          margin-bottom: 2rem;
          line-height: 1.8;
          font-size: 1.1rem;
        }
        
        .enhanced-content p:last-child {
          margin-bottom: 0;
        }
        
        .enhanced-content strong {
          color: #1f2937;
          font-weight: 700;
          font-size: 1.125rem;
        }
        
        .enhanced-content h1,
        .enhanced-content h2,
        .enhanced-content h3,
        .enhanced-content h4,
        .enhanced-content h5,
        .enhanced-content h6 {
          margin-top: 3rem;
          margin-bottom: 1.5rem;
          color: #1f2937;
          font-weight: 700;
          line-height: 1.3;
        }
        
        .enhanced-content h1 {
          font-size: 2.5rem;
          border-bottom: 4px solid #f59e0b;
          padding-bottom: 1rem;
        }
        
        .enhanced-content h2 {
          font-size: 2rem;
          color: #d97706;
          border-bottom: 2px solid #fbbf24;
          padding-bottom: 0.75rem;
        }
        
        .enhanced-content h3 {
          font-size: 1.75rem;
          color: #b45309;
        }
        
        .enhanced-content h4 {
          font-size: 1.5rem;
          color: #92400e;
        }
        
        .enhanced-content ul, 
        .enhanced-content ol {
          margin: 2rem 0;
          padding-left: 2rem;
        }
        
        .enhanced-content li {
          margin-bottom: 1rem;
          line-height: 1.7;
          color: #4b5563;
          font-size: 1.05rem;
        }
        
        .enhanced-content li::marker {
          color: #f59e0b;
          font-weight: bold;
        }
        
        .enhanced-content ul li {
          position: relative;
          padding-left: 0.5rem;
        }
        
        .enhanced-content blockquote {
          border-left: 5px solid #f59e0b;
          margin: 2.5rem 0;
          padding: 1.5rem 2rem;
          background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
          border-radius: 1rem;
          font-style: italic;
          color: #92400e;
          position: relative;
        }
        
        .enhanced-content code {
          background-color: #f3f4f6;
          padding: 0.375rem 0.75rem;
          border-radius: 0.5rem;
          font-family: 'Monaco', 'Consolas', 'Courier New', monospace;
          font-size: 0.9rem;
          color: #dc2626;
          border: 1px solid #e5e7eb;
        }
        
        .enhanced-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 2.5rem 0;
          background-color: #ffffff;
          border-radius: 1rem;
          overflow: hidden;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
          border: 1px solid #e5e7eb;
        }
        
        .enhanced-content th,
        .enhanced-content td {
          padding: 1.25rem 1.5rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }
        
        .enhanced-content th {
          background: linear-gradient(135deg, #fef3c7 0%, #fbbf24 100%);
          font-weight: 700;
          color: #92400e;
          font-size: 1.05rem;
        }
        
        .enhanced-content tr:nth-child(even) {
          background-color: #fffbeb;
        }
        
        .enhanced-content tr:hover {
          background-color: #fef3c7;
          transition: background-color 0.2s ease;
        }
        
        .enhanced-content img {
          max-width: 100%;
          height: auto;
          border-radius: 1rem;
          margin: 2rem 0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        
        /* Hide FAQ content that will be rendered specially */
        .enhanced-content p:has-text("Frequently Asked Questions"),
        .enhanced-content p:has-text("Q:") {
          display: none;
        }
        
        /* Responsive typography */
        @media (max-width: 768px) {
          .enhanced-content h1 {
            font-size: 2rem;
          }
          
          .enhanced-content h2 {
            font-size: 1.75rem;
          }
          
          .enhanced-content h3 {
            font-size: 1.5rem;
          }
          
          .enhanced-content p {
            font-size: 1rem;
          }
        }
      `}</style>
      
      <div className='min-h-screen bg-gray-50'>
        <div className='pt-24 md:pt-32 pb-12 md:pb-20'>
          <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className="mb-8">
              <Link href="/news" className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-800 font-semibold">
                <ArrowLeft size={18} />
                Back to All Posts
              </Link>
            </div>

            <article className="bg-white p-6 md:p-10 rounded-2xl shadow-lg">
              <header className="mb-8">
                <div className="text-sm font-semibold text-amber-600 mb-2">{isEvent ? 'Event' : (post.category?.name || 'Blog')}</div>
                <h1 className='text-3xl md:text-4xl font-bold mb-4 text-gray-900'>
                  {post.title}
                </h1>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} />
                      <span>{new Date(post.published_date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    {post.author_name && (
                       <div className="flex items-center gap-2">
                        <User size={14} />
                        <span>By {post.author_name}</span>
                      </div>
                    )}
                  </div>
                  {isEvent && (
                    <button
                      onClick={handleShare}
                      disabled={isSharing}
                      className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-amber-100 text-amber-800 hover:bg-amber-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Share2 size={16} />
                      {isSharing ? 'Sharing...' : 'Share Event'}
                    </button>
                  )}
                </div>
              </header>
              
              {post.featured_image && (
                  <div className="mb-8 rounded-2xl overflow-hidden shadow-md">
                      <Image
                          src={post.featured_image}
                          alt={post.title}
                          width={800}
                          height={450}
                          className="w-full h-auto object-cover"
                          priority
                      />
                  </div>
              )}

              {/* Render content */}
              {isContentSplit ? (
                <>
                  {/* Regular content */}
                  <div 
                    className="enhanced-content prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: processedContent.regularContent }}
                  />
                  {/* FAQ section */}
                  {renderFAQSection(processedContent.faqContent)}
                </>
              ) : (
                /* All content as regular content */
                <div 
                  className="enhanced-content prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: processedContent }}
                />
              )}

              {post.tags && post.tags.length > 0 && (
                <footer className="mt-10 pt-6 border-t">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-semibold">Tags:</span>
                      {post.tags.map((tag, index) => (
                        <span key={index} className="flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-700">
                           <Tag size={12} />
                           {tag.name}
                        </span>
                      ))}
                    </div>
                </footer>
              )}
            </article>
          </div>
        </div>
      </div>
    </>
  );
}