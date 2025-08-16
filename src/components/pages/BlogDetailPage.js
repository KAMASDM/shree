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
  Facebook,
  Twitter,
  Linkedin,
  Mail,
  MessageSquare,
} from "lucide-react";

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch the main post
        const postResponse = await axios.get(
          `http://localhost:8000/api/blogs/posts/${slug}/`
        );
        setPost(postResponse.data);

        // Fetch related posts (all posts except the current one)
        const relatedResponse = await axios.get(
          "http://localhost:8000/api/blogs/posts/"
        );
        setRelatedPosts(
          relatedResponse.data.filter((p) => p.slug !== slug).slice(0, 3) // Get up to 3 related posts
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

  if (loading) {
    return (
      <div className='pt-40 pb-20 text-center text-lg font-semibold'>
        Loading Post...
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className='pt-40 pb-20 text-center'>
        <h1 className='text-3xl font-bold text-gray-800 mb-4'>
          Post Not Found
        </h1>
        <p className='text-gray-600 mb-8'>
          {error || "Sorry, we couldn't find the post you're looking for."}
        </p>
        <Link
          href='/news'
          className='bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-amber-700 transition-colors'
        >
          Return to News & Insights
        </Link>
      </div>
    );
  }

  return (
    <div className='pt-32 pb-20'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <nav className='mb-8'>
          <Link
            to='/news'
            className='flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors'
          >
            <ChevronLeft size={20} />
            Back to News & Insights
          </Link>
        </nav>

        <header className='mb-8'>
          <span className='bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium'>
            {post.category.name}
          </span>
          <h1 className='text-3xl md:text-4xl font-bold text-gray-900 my-4 leading-tight'>
            {post.title}
          </h1>
          <div className='flex flex-wrap items-center gap-6 text-gray-600 text-sm'>
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

        <div className='mb-8'>
          <img
            src={post.featured_image}
            alt={post.title}
            className='w-full h-auto max-h-[400px] object-cover rounded-2xl shadow-lg'
          />
        </div>

        <article
          className='prose prose-lg max-w-none mb-12'
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className='bg-gradient-to-r from-amber-600 to-orange-600 text-white p-8 rounded-2xl mb-12 text-center'>
          <h3 className='text-2xl font-bold mb-4'>Need Expert Consultation?</h3>
          <p className='mb-6 opacity-90'>
            Our experts can help you navigate regulatory requirements and select
            the right analytical solutions.
          </p>
          <Link
            to='/contact'
            className='bg-white text-amber-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors'
          >
            Contact Our Experts
          </Link>
        </div>

        {relatedPosts.length > 0 && (
          <div>
            <h3 className='text-2xl font-bold text-gray-900 mb-8'>
              Related Articles
            </h3>
            <div className='grid md:grid-cols-3 gap-6'>
              {relatedPosts.map((relatedPost) => (
                <Link
                  to={`/news/${relatedPost.slug}`}
                  key={relatedPost.id}
                  className='bg-white rounded-lg border overflow-hidden hover:shadow-lg transition-shadow'
                >
                  <img
                    src={relatedPost.featured_image}
                    alt={relatedPost.title}
                    className='h-40 w-full object-cover'
                  />
                  <div className='p-4'>
                    <span className='text-amber-600 text-xs font-semibold'>
                      {relatedPost.category.name}
                    </span>
                    <h4 className='font-bold text-gray-900 mt-1 mb-2 line-clamp-2'>
                      {relatedPost.title}
                    </h4>
                    <div className='flex justify-between items-center'>
                      <span className='text-gray-500 text-xs'>
                        {new Date(
                          relatedPost.published_date
                        ).toLocaleDateString()}
                      </span>
                      <span className='text-amber-600 text-sm font-medium flex items-center gap-1'>
                        Read More <ArrowRight size={12} />
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
  );
}
