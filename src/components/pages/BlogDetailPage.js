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
} from "lucide-react";
import { apiService } from "../../lib/api";

export default function BlogDetailPage() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSharing, setIsSharing] = useState(false);
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
          <Link href="/news" className="inline-flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold bg-amber-600 hover:bg-amber-700">
             <ArrowLeft size={18} />
             Back to News
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='pt-24 md:pt-32 pb-12 md:pb-20'>
        {/* MODIFICATION: Increased width from max-w-4xl to max-w-5xl */}
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

            {/* MODIFICATION: Added a custom class "prose-custom" for styling */}
            <div
              className="prose prose-lg max-w-none prose-custom"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

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
  );
}